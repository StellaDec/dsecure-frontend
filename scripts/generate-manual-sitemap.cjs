const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://dsecuretech.com';
const MANUAL_URL_PREFIX = '/support/manual/';
const REGISTRY_PATH = path.join(__dirname, '../src/routes/manualRegistry.ts');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

function generateSitemap() {
  console.log('🚀 Generating Manual Page sitemap entries...');

  // 1. Read the manual registry to get all slugs
  const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  
  // Extract slugs using regex
  // Pattern matches: 'slug-name': lazy(() => ...
  const slugRegex = /'([^']+)': lazy/g;
  const slugs = [];
  let match;
  
  while ((match = slugRegex.exec(registryContent)) !== null) {
    slugs.push(match[1]);
  }

  console.log(`✅ Found ${slugs.length} manual page slugs.`);

  if (slugs.length === 0) {
    console.error('❌ No slugs found in registry. Check the regex or registry file.');
    return;
  }

  // 2. Read the existing sitemap
  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');

  // 3. Remove existing manual entries to avoid duplicates
  // This assumes manual entries are in the format: <url><loc>.../support/manual/...</loc>...</url>
  const manualEntryRegex = /<url>\s*<loc>https:\/\/dsecuretech\.com\/support\/manual\/[^<]+<\/loc>[\s\S]*?<\/url>/g;
  const originalLength = sitemapContent.length;
  sitemapContent = sitemapContent.replace(manualEntryRegex, '');
  
  const removedCount = (originalLength - sitemapContent.length) > 0 ? 'some' : '0';
  console.log(`🧹 Cleaned existing manual entries (if any).`);

  // 4. Generate new entries
  const newEntries = slugs.map(slug => {
    return `  <url>
    <loc>${BASE_URL}${MANUAL_URL_PREFIX}${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('\n');

  // 5. Inject new entries before the closing </urlset> tag
  if (sitemapContent.includes('</urlset>')) {
    sitemapContent = sitemapContent.replace('</urlset>', `${newEntries}\n</urlset>`);
  } else {
    // If no /urlset, just append (shouldn't happen with valid sitemap)
    sitemapContent += `\n${newEntries}`;
  }

  // 6. Write back to sitemap.xml
  fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf-8');
  console.log(`✨ Successfully added ${slugs.length} manual pages to sitemap.xml`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
