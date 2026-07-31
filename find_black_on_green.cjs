const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const filePath = path.join(blogDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find bg-[#0e7c66] and check for text-[#0a2e1e] nearby
  const regex = /bg-\[#0e7c66\][\s\S]{0,300}text-\[#0a2e1e\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${f}:`);
    const start = Math.max(0, match.index - 50);
    const end = Math.min(content.length, match.index + match[0].length + 50);
    console.log(content.substring(start, end));
    console.log('--------------------------------------------------');
  }
});
