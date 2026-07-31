const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');
let totalFixed = 0;
let filesFixed = 0;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // We are looking for lines that have both a green bg (like bg-[#f4fbf8] or bg-emerald-50) 
  // AND green text (text-[#0e7c66] or text-emerald-).
  // Wait, sometimes they are on the same line, sometimes they are nested.
  // Let's replace text-[#0e7c66] and text-emerald-\d+ with text-[#5a6672] or text-[#0a2e1e]
  // if they are inside a block with green bg.
  
  // A simple way to do this for the same line cases (like the tables in OnsiteVsOffsiteDestructionBlog.tsx):
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if ((line.includes('bg-[#f4fbf8]') || line.includes('bg-emerald-50') || line.includes('bg-[#0e7c66]')) && 
        (line.includes('text-[#0e7c66]') || line.match(/text-emerald-\d+/))) {
      
      // If it's a Link, it might be text-[#0e7c66]. We can change it to text-[#0a2e1e]
      let newLine = line.replace(/text-\[#0e7c66\]/g, 'text-[#0a2e1e]');
      newLine = newLine.replace(/text-emerald-\d+/g, 'text-[#0a2e1e]');
      
      if (newLine !== line) {
        changed = true;
        totalFixed++;
      }
      return newLine;
    }
    return line;
  });

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    filesFixed++;
    console.log(`Fixed: ${path.basename(filePath)}`);
  }
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.tsx'));
files.forEach(f => fixFile(path.join(blogDir, f)));

console.log(`\nFixed ${totalFixed} instances across ${filesFixed} files.`);
