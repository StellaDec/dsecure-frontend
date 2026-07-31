const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.tsx'));

let totalFound = 0;

files.forEach(f => {
  const filePath = path.join(blogDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to find green bg followed by green text within 500 characters
  const regex = /(bg-\[#f4fbf8\]|bg-emerald-50|bg-\[#0e7c66\])[\s\S]{0,500}?(text-\[#0e7c66\]|text-emerald-\d+)/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${f}:`);
    // Print the context
    const start = Math.max(0, match.index - 50);
    const end = Math.min(content.length, match.index + match[0].length + 50);
    console.log(content.substring(start, end));
    console.log('--------------------------------------------------');
    totalFound++;
  }
});

console.log(`Total occurrences found: ${totalFound}`);
