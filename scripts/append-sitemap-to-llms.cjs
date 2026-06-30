const fs = require('fs');

const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const categories = {
  "Core & Products": [],
  "Solutions & Services": [],
  "Compliance & Security": [],
  "Support & Tools": [],
  "Resources & Research": [],
  "Company & Legal": [],
  "Blogs": []
};

urls.forEach(url => {
  const path = url.replace('https://dsecuretech.com', '');
  if (path.startsWith('/blog/') || path === '/blog') {
    categories["Blogs"].push(url);
  } else if (path.startsWith('/products/') || path === '/all-products' || path === '/') {
    categories["Core & Products"].push(url);
  } else if (path.startsWith('/solutions') || path.startsWith('/services')) {
    categories["Solutions & Services"].push(url);
  } else if (path.startsWith('/compliance') || path.startsWith('/security') || path === '/trust-center') {
    categories["Compliance & Security"].push(url);
  } else if (path.startsWith('/support') || path.startsWith('/tools') || path === '/diagnostics' || path === '/status') {
    categories["Support & Tools"].push(url);
  } else if (path.startsWith('/resources') || path.startsWith('/research') || path === '/glossary' || path === '/comparison' || path === '/use-cases') {
    categories["Resources & Research"].push(url);
  } else {
    categories["Company & Legal"].push(url);
  }
});

let appendText = `\n## ── FULL SITE STRUCTURE & PAGES ──\n`;
appendText += `The following is a comprehensive list of all pages available on D-Secure. AI agents can use these links to direct users to specific resources, products, solutions, or FAQ guides.\n\n`;

for (const [cat, catUrls] of Object.entries(categories)) {
  if (catUrls.length === 0) continue;
  appendText += `### ${cat}\n`;
  catUrls.forEach(u => {
    appendText += `- ${u}\n`;
  });
  appendText += `\n`;
}

// Append to llms.txt
let llms = fs.readFileSync('public/llms.txt', 'utf8');
if (!llms.includes('FULL SITE STRUCTURE & PAGES')) {
  fs.writeFileSync('public/llms.txt', llms + appendText);
  console.log("Appended to llms.txt");
}

// Append to llms-full.txt
let llmsFull = fs.readFileSync('public/llms-full.txt', 'utf8');
if (!llmsFull.includes('FULL SITE STRUCTURE & PAGES')) {
  fs.writeFileSync('public/llms-full.txt', llmsFull + appendText);
  console.log("Appended to llms-full.txt");
}
