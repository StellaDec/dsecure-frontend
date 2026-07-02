const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

// 1. Get all slugs from blogPosts.ts
const tsContent = fs.readFileSync(tsPath, 'utf8');
const slugRegex = /slug:\s*"([^"]+)"/g;
let match;
const slugs = [];
while ((match = slugRegex.exec(tsContent)) !== null) {
  slugs.push(match[1]);
}

// 2. Read sitemap
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// 3. Find missing slugs and append before </urlset>
let newUrls = '';
let addedCount = 0;
for (const slug of slugs) {
  const urlPath = `https://dsecuretech.com/blog/${slug}`;
  if (!sitemapContent.includes(`<loc>${urlPath}</loc>`)) {
    newUrls += `  <url>\n    <loc>${urlPath}</loc>\n    <lastmod>2026-07-02</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    addedCount++;
  }
}

if (addedCount > 0) {
  sitemapContent = sitemapContent.replace('</urlset>', newUrls + '</urlset>');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
}

console.log(`Added ${addedCount} new URLs to sitemap.`);
