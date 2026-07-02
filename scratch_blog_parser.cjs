const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = path.join(__dirname, '30 full Blog Sheet.xlsx - blog.csv');
const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');

const csvData = fs.readFileSync(csvPath, 'utf8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

const tsContent = fs.readFileSync(tsPath, 'utf8');

let newBlogsString = '';
let addedCount = 0;

records.forEach(record => {
  let slug = record['URL Slug'].replace('/blog/', '').trim();
  let title = record['Blog Title'].trim();
  let content = record['Blog Content'].trim();
  
  // Replacements for competitors
  if (slug.includes('dban')) {
    slug = slug.replace('dban', 'free-tools');
    title = title.replace(/DBAN/ig, 'Free Erasure Software');
    content = content.replace(/DBAN/ig, 'Free Erasure Software');
    content = content.replace(/Darik's Boot and Nuke/ig, 'Free Wiping Tools');
  }
  if (slug.includes('dell')) {
    slug = slug.replace('dell-data-wipe', 'manufacturer-tools');
    title = title.replace(/Dell Data Wipe/ig, 'Manufacturer Erasure Tools');
    title = title.replace(/Dell/ig, 'Manufacturer');
    content = content.replace(/Dell SupportAssist OS Recovery/ig, 'Manufacturer OS Recovery');
    content = content.replace(/Dell SupportAssist/ig, 'Manufacturer Tools');
    content = content.replace(/Dell Data Sanitize/ig, 'Manufacturer Data Sanitize');
    content = content.replace(/Dell BIOS-Level Secure Erase/ig, 'Manufacturer BIOS-Level Secure Erase');
    content = content.replace(/Dell Technologies/ig, 'Leading Manufacturers');
    content = content.replace(/Dell/ig, 'Manufacturer');
  }
  if (slug.includes('white-canyon') || slug.includes('wipedrive')) {
    slug = slug.replace('white-canyon-wipedrive', 'legacy-erasure');
    title = title.replace(/White Canyon WipeDrive/ig, 'Legacy Erasure Tools');
    content = content.replace(/White Canyon WipeDrive/ig, 'Legacy Erasure Tools');
    content = content.replace(/WipeDrive/ig, 'Legacy Erasure Tools');
  }
  
  // Check if duplicate
  if (tsContent.includes(`slug: "${slug}"`) || tsContent.includes(`id: "${slug}"`)) {
    console.log(`Skipping duplicate: ${slug}`);
    return;
  }
  
  if (!content) return; // skip empty blogs
  
  // Extract excerpt (first paragraph roughly)
  let excerptMatch = content.match(/^(.*?)<br>/);
  let excerpt = excerptMatch ? excerptMatch[1] : content.substring(0, 150) + '...';
  
  // Formatting content for TS template literal
  // Escape backticks and ${}
  let safeContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  
  newBlogsString += `
  {
    id: "${slug}",
    slug: "${slug}",
    title: "${title}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    content: \`
      <div class="blog-formatted-content">
        ${safeContent.split('<br><br>').map(p => p.startsWith('#') ? p : `<p>${p}</p>`).join('\\n')}
      </div>
    \`,
    link: "/blog/${slug}",
    tag: "${record['Related Compliance'] ? record['Related Compliance'].split(';')[0].trim() : 'Compliance'}",
    category: "Technical Guide",
    keywords: "${record['Primary Keyword']}, ${record['Secondary Keywords']}",
    publishDate: "July 10, 2026",
    author: "Prashant Saini"
  },`;
  addedCount++;
});

if (addedCount > 0) {
  // Find the closing array bracket
  const lastBracketIndex = tsContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const newTsContent = tsContent.substring(0, lastBracketIndex) + newBlogsString + '\\n];';
    fs.writeFileSync(tsPath, newTsContent, 'utf8');
    console.log(`Added ${addedCount} new blogs.`);
  } else {
    console.error("Could not find the end of the blogPosts array.");
  }
} else {
  console.log("No new blogs to add.");
}
