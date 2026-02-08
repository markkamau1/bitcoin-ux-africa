const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const postsDirectory = path.join(process.cwd(), 'blog/posts');
const outputFile = path.join(postsDirectory, 'posts.json');

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
    
    // Parse frontmatter
    const { data } = matter(fileContents);
    
    // Create slug from filename (remove .md extension)
    const slug = filename.replace('.md', '');
    
    return {
      title: data.title || 'Untitled',
      slug: slug,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Bitcoin UX Africa Team',
      category: data.category || 'Uncategorized',
      featured_image: data.featured_image || data.image || '/images/blog/default.jpg',
      excerpt: data.excerpt || data.description || '',
      tags: data.tags || [],
      published: data.published !== false // Default to true unless explicitly false
    };
  });
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Filter only published posts
  const publishedPosts = posts.filter(post => post.published);
  
  // Create JSON structure
  const output = {
    posts: publishedPosts
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
  console.error('❌ Error generating posts.json:', error);
  process.exit(1);
}
