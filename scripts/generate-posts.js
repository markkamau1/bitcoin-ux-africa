const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const postsDirectory = path.join(process.cwd(), 'blog/posts');
const templatePath = path.join(process.cwd(), 'blog/post-template.html');
const outputFile = path.join(postsDirectory, 'posts.json');

// Enhanced markdown to HTML converter with styling support
function markdownToHtml(markdown) {
  let html = markdown;

  // Horizontal rules (---)
  html = html.replace(/^---$/gim, '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 40px 0;">');

  // Headers with styling
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold with color
  html = html.replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<span class="stat-highlight">$1</span>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #f7931a; text-decoration: none; font-weight: 600;">$1</a>');

  // Blockquotes
  html = html.replace(/^&gt; (.*$)/gim, '<blockquote style="border-left: 4px solid #f7931a; padding-left: 20px; color: #6b7280; font-style: italic; margin: 20px 0;">$1</blockquote>');

  // Unordered lists
  html = html.split('\n').map(line => {
    if (line.trim().match(/^[\*\-] (.+)$/)) {
      return line.replace(/^[\*\-] (.+)$/, '<li>$1</li>');
    }
    return line;
  }).join('\n');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, match => {
    return `<ul style="margin: 20px 0; padding-left: 30px;">${match}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, match => {
    if (!match.includes('<ul')) {
      return `<ol style="margin: 20px 0; padding-left: 30px;">${match}</ol>`;
    }
    return match;
  });

  // Paragraphs - split by double newlines
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') ||
        p.startsWith('<li') || p.startsWith('<hr') || p.startsWith('<blockquote')) {
      return p;
    }
    if (p.trim() === '') return '';
    return `<p>${p.trim()}</p>`;
  }).join('\n\n');

  html = html.replace(/\n{3,}/g, '\n\n');
  return html;
}

// Calculate read time (avg 200 words per minute)
function calculateReadTime(content) {
  // Strip HTML tags for word count
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate individual blog post pages
function generateBlogPages(posts, template) {
  console.log('📄 Generating individual blog post pages...');

  posts.forEach(post => {
    // If post has raw_html flag, it's a fully self-contained HTML file.
    // Write it directly — don't wrap in the template.
    if (post.raw_html) {
      const outputPath = path.join(postsDirectory, `${post.slug}.html`);
      fs.writeFileSync(outputPath, post.html_content);
      console.log(`   ✅ Wrote raw HTML post: ${post.slug}.html`);
      return;
    }

    // Standard markdown-sourced posts get injected into the template
    const postData = {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: formatDate(post.date),
      read_time: post.read_time,
      featured_image: post.featured_image,
      content: post.html_content
    };

    let pageHtml = template;
    pageHtml = pageHtml.replace(/\{\{TITLE\}\}/g, postData.title);
    pageHtml = pageHtml.replace(/\{\{EXCERPT\}\}/g, postData.excerpt);
    pageHtml = pageHtml.replace(/\{\{CATEGORY\}\}/g, postData.category);
    pageHtml = pageHtml.replace(/\{\{DATE\}\}/g, postData.date);
    pageHtml = pageHtml.replace(/\{\{READ_TIME\}\}/g, postData.read_time);
    pageHtml = pageHtml.replace(/\{\{FEATURED_IMAGE\}\}/g, postData.featured_image);
    pageHtml = pageHtml.replace(/\{\{CONTENT\}\}/g, postData.content);

    const outputPath = path.join(postsDirectory, `${post.slug}.html`);
    fs.writeFileSync(outputPath, pageHtml);
    console.log(`   ✅ Created ${post.slug}.html`);
  });
}

// Main function
async function generatePosts() {
  try {
    console.log('🔍 Scanning for blog posts...');

    const files = fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.md'));

    console.log(`📁 Found ${files.length} markdown files`);

    const template = fs.readFileSync(templatePath, 'utf8');

    const posts = files.map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = data.slug || filename.replace('.md', '');

      // raw_html: true means the body is already HTML — skip markdown conversion
      // and write the file directly without the template wrapper
      if (data.raw_html) {
        return {
          slug,
          title: data.title,
          date: data.date,
          author: data.author,
          category: data.category,
          featured_image: data.featured_image,
          excerpt: data.excerpt,
          tags: data.tags || [],
          published: data.published !== false,
          read_time: calculateReadTime(content),
          html_content: content.trim(),
          raw_html: true
        };
      }

      // Standard markdown post
      const htmlContent = markdownToHtml(content);
      const readTime = calculateReadTime(content);

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        category: data.category,
        featured_image: data.featured_image,
        excerpt: data.excerpt,
        tags: data.tags || [],
        published: data.published !== false,
        read_time: readTime,
        html_content: htmlContent,
        raw_html: false
      };
    });

    const publishedPosts = posts.filter(post => post.published);
    publishedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    generateBlogPages(publishedPosts, template);

    // Generate posts.json (strip html_content for lighter payload)
    const jsonPosts = publishedPosts.map(({ html_content, raw_html, ...post }) => post);
    const jsonOutput = {
      posts: jsonPosts,
      total: jsonPosts.length,
      generated: new Date().toISOString()
    };

    fs.writeFileSync(outputFile, JSON.stringify(jsonOutput, null, 2));
    console.log(`✅ Generated posts.json with ${jsonPosts.length} published posts`);

  } catch (error) {
    console.error('❌ Error generating posts:', error);
    process.exit(1);
  }
}

generatePosts();
