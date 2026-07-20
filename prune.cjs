const fs = require('fs');
const path = require('path');

const prunedSlugs = require('./pruned_slugs.json');

// 1. Process blogPosts.ts
const blogPostsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
let blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');

// Parse blogPosts objects and filter
const regex = /\{\s*id:[\s\S]*?\}(?=(?:,[\s]*\{|\]))/g;
let match;
let newContent = blogPostsContent;

while ((match = regex.exec(blogPostsContent)) !== null) {
  const block = match[0];
  const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (slugMatch) {
    const slug = slugMatch[1];
    if (prunedSlugs.includes(slug)) {
      newContent = newContent.replace(block + ',', ''); // Try removing with trailing comma
      newContent = newContent.replace(block, ''); // Try removing without trailing comma
    }
  }
}
// Fix malformed slugs
newContent = newContent.replace(/slug:\s*['"]-seven-years['"]/g, "slug: 'gdpr-article-17-right-to-erasure'");

fs.writeFileSync(blogPostsPath, newContent);
console.log('Cleaned blogPosts.ts');

// 2. Process BlogRoutes.tsx
const blogRoutesPath = path.join(__dirname, 'src', 'routes', 'BlogRoutes.tsx');
let blogRoutesContent = fs.readFileSync(blogRoutesPath, 'utf-8');

const routeLines = blogRoutesContent.split('\n');
const newRouteLines = [];
let deletedComponents = [];

for (let line of routeLines) {
  let keep = true;
  for (let slug of prunedSlugs) {
    if (line.includes(`path="blog/${slug}"`) || line.includes(`path="${slug}"`)) {
      keep = false;
      // Extract component name
      const compMatch = line.match(/element=\{<([A-Za-z0-9_]+)/);
      if (compMatch) {
        deletedComponents.push(compMatch[1]);
      }
      break;
    }
  }
  if (keep) newRouteLines.push(line);
}

let cleanedRoutes = newRouteLines.join('\n');
// Also remove lazy imports for the deleted components
for (let comp of deletedComponents) {
  const lazyRegex = new RegExp(`const\\s+${comp}\\s*=\\s*lazy\\([^\\)]+\\);?\\n?`, 'g');
  cleanedRoutes = cleanedRoutes.replace(lazyRegex, '');
}

fs.writeFileSync(blogRoutesPath, cleanedRoutes);
console.log('Cleaned BlogRoutes.tsx. Identified components to delete:', deletedComponents.length);
fs.writeFileSync('deleted_components.json', JSON.stringify(deletedComponents));

// 3. Delete components
let deletedCount = 0;
for (let comp of deletedComponents) {
  const compPath = path.join(__dirname, 'src', 'components', 'blog', `${comp}.tsx`);
  if (fs.existsSync(compPath)) {
    fs.unlinkSync(compPath);
    deletedCount++;
  }
}
console.log(`Deleted ${deletedCount} component files`);
