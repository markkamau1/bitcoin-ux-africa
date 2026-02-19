#!/bin/bash

# Bitcoin UX Africa - Build Script
# Copies site to _site/, stripping YAML frontmatter from HTML files before serving.
# Source files keep frontmatter so Netlify CMS can read them.

set -e

echo "🔨 Starting build..."

# Clean and recreate output directory
rm -rf _site
mkdir -p _site

# Copy everything except _site itself and node_modules
rsync -av --exclude='_site' --exclude='node_modules' --exclude='.git' . _site/

echo "✂️  Stripping frontmatter from HTML files..."

# Find all HTML files in _site and strip frontmatter blocks
find _site -name "*.html" | while read file; do
  # Check if file starts with --- (frontmatter marker)
  if head -1 "$file" | grep -q "^---"; then
    echo "  Processing: $file"

    # Use awk to strip the frontmatter block (between first and second ---)
    awk '
      BEGIN { in_front = 1; found_open = 0; }
      in_front && /^---/ && !found_open { found_open = 1; next; }
      in_front && /^---/ && found_open  { in_front = 0; next; }
      in_front { next; }
      { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi
done

echo "✅ Build complete. Output in _site/"
