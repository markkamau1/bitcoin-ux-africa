const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const postsDirectory = path.join(process.cwd(), 'blog/posts');
const templatePath = path.join(process.cwd(), 'blog/post-template.html');
const outputFile = path.join(postsDirectory, 'posts.json');

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Lists - Unordered
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Lists - Ordered
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  
  // Paragraphs - split by double newlines
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    // Don't wrap headers, lists, or already wrapped content
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<li')) {
      return p;
    }
    // Don't wrap empty paragraphs
    if (p.trim() === '') {
      return '';
    }
    return `<p>${p.trim()}</p>`;
  }).join('\n');
  
  // Clean up extra newlines
  html = html.replace(/\n{3,}/g, '\n\n');
  
  return html;
}

// Calculate read time (avg 200 words per minute)
function calculateReadTime(content) {
  const words = content.split(/\s+/).length;
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
    const postData = {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: formatDate(post.date),
      read_time: post.read_time,
      featured_image: post.featured_image,
      content: post.html_content
    };
    
    // Replace placeholders in template
    let pageHtml = template;
    pageHtml = pageHtml.replace(/\{\{TITLE\}\}/g, postData.title);
    pageHtml = pageHtml.replace(/\{\{EXCERPT\}\}/g, postData.excerpt);
    pageHtml = pageHtml.replace(/\{\{CATEGORY\}\}/g, postData.category);
    pageHtml = pageHtml.replace(/\{\{DATE\}\}/g, postData.date);
    pageHtml = pageHtml.replace(/\{\{READ_TIME\}\}/g, postData.read_time);
    pageHtml = pageHtml.replace(/\{\{FEATURED_IMAGE\}\}/g, postData.featured_image);
    pageHtml = pageHtml.replace(/\{\{CONTENT\}\}/g, postData.content);
    
    // Write individual post page
    const outputPath = path.join(postsDirectory, `${post.slug}.html`);
    fs.writeFileSync(outputPath, pageHtml);
    console.log(`   ✅ Created ${post.slug}.html`);
  });
}

// Read all .md files from blog/posts
function generatePostsJson() {
  console.log('🔍 Scanning for blog posts...');
  
  // Get all files in the posts directory
  const files = fs.readdirSync(postsDirectory);
  
  // Filter only .md files
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  console.log(`📝 Found ${mdFiles.length} markdown files`);
  
  // Parse each .md file
  const posts = mdFiles.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContents);
    
    // Create slug from filename (remove .md extension)
    const slug = filename.replace('.md', '');
    
    // Convert markdown content to HTML
    const htmlContent = markdownToHtml(content);
    
    // Calculate read time
    const readTime = calculateReadTime(content);
    
    return {
      title: data.title || 'Untitled',
      slug: slug,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Bitcoin UX Africa Team',
      category: data.category || 'Uncategorized',
      featured_image: data.featured_image || data.image || '/images/blog/default.jpg',
      excerpt: data.excerpt || data.description || '',
      tags: data.tags || [],
      published: data.published !== false, // Default to true unless explicitly false
      read_time: readTime,
      html_content: htmlContent
    };
  });
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Filter only published posts
  const publishedPosts = posts.filter(post => post.published);
  
  // Read template file
  const template = fs.readFileSync(templatePath, 'utf8');
  
  // Generate individual blog pages
  generateBlogPages(publishedPosts, template);
  
  // Create JSON structure (without html_content for the index)
  const postsForJson = publishedPosts.map(post => {
    const { html_content, read_time, ...postWithoutHtml } = post;
    return postWithoutHtml;
  });
  
  const output = {
    posts: postsForJson
  };
  
  // Write to posts.json
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  
  console.log(`✅ Generated posts.json with ${publishedPosts.length} published posts`);
  console.log(`📄 Output: ${outputFile}`);
}

// Run the script
try {
  generatePostsJson();
} catch (error) {
  console.error('❌ Error generating posts:', error);
  process.exit(1);
}
