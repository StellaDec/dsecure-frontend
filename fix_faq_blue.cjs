const fs = require('fs');
const path = require('path');

const dir = 'src/components/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (file !== 'FAQSection.tsx' && file !== 'BlogFooterStandard.tsx') {
    content = content.replace(/import\s+FAQSection\s+from\s+['"]\.\/FAQSection['"];?\n?/g, '');
    content = content.replace(/<FAQSection[^>]*\/>/g, '');
  }

  content = content.replace(/bg-blue-50\/?3?0?/g, 'bg-[#f4fbf8]');
  content = content.replace(/bg-blue-100/g, 'bg-[#d4ede4]');
  content = content.replace(/text-blue-[5-7]00/g, 'text-[#0e7c66]');
  content = content.replace(/border-blue-[2-6]00/g, 'border-[#0e7c66]');
  content = content.replace(/ring-blue-[5-7]00/g, 'ring-[#0e7c66]');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
}
