const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

const links = [
  { term: 'Drive Eraser', url: '/products/drive-eraser' },
  { term: 'Mobile Diagnostics', url: '/products/mobile-diagnostics' },
  { term: 'Smartphone Eraser', url: '/products/smartphone-eraser' },
  { term: 'NIST 800-88', url: '/compliance/nist' },
  { term: 'GDPR', url: '/compliance/gdpr' },
  { term: 'Common Criteria EAL 4\\+', url: '/about' },
  { term: 'D-Secure', url: '/' }
];

// We need to parse each blog object in blogPosts.ts and replace only the first occurrence in the content field.
// But doing it via pure regex on the whole file is easier:
// For each link, we can do a replace, but we only want to do it once per blog.
// Since the file is just a giant string, we can split it by `slug: ` to process each blog individually.

let blogs = tsContent.split('slug: ');
for (let i = 1; i < blogs.length; i++) { // Skip the first part which is imports
  let blogText = blogs[i];
  
  for (const { term, url } of links) {
    // Avoid replacing inside existing <a> tags or if already linked
    // We use a regex that matches the term if it's NOT inside an <a> tag.
    // A simple negative lookbehind/lookahead might be risky with HTML.
    // Alternatively, we just replace the first occurrence that doesn't have `<a ` before it.
    
    // Check if the term exists and is not already linked
    const linkedTerm = `<a href="${url}" class="text-emerald-600 hover:underline font-medium">${term.replace('\\+', '+')}</a>`;
    
    // Only replace first occurrence
    const regex = new RegExp(`\\b${term}\\b(?!([^<]*>)|([^<]*<\\/a>))`, 'i');
    
    // But since it's a simple script, let's just do a basic replace if it doesn't already have an anchor
    if (!blogText.includes(linkedTerm) && blogText.match(regex)) {
      blogText = blogText.replace(regex, linkedTerm);
    }
  }
  blogs[i] = blogText;
}

tsContent = blogs.join('slug: ');
fs.writeFileSync(tsPath, tsContent, 'utf8');
console.log('Internal links injected.');
