const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.tsx'));

let totalFixed = 0;
let filesFixed = 0;

files.forEach(f => {
  const filePath = path.join(blogDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Let's use a simpler approach:
  // Since we want to ensure no green text is inside a green bg,
  // we can use regex to find all blocks starting with <div... bg-[#f4fbf8] / bg-emerald-50 / bg-[#0e7c66]
  // However, tracking closing tags is hard.
  // Wait, what if we just change ALL text-[#0e7c66] to text-[#0a2e1e] ONLY if they are inside a green block?
  // Let's implement a simple tag depth tracker.
  
  let i = 0;
  let depth = 0;
  let greenBgDepths = []; // stack of depths where a green bg started
  
  let newContent = '';
  
  while (i < content.length) {
    // Check for tag open
    if (content[i] === '<' && content[i+1] && content[i+1].match(/[a-zA-Z]/)) {
      depth++;
      // Find the end of this tag definition (before children)
      let tagEnd = content.indexOf('>', i);
      if (tagEnd === -1) tagEnd = content.length;
      
      let tagDef = content.substring(i, tagEnd + 1);
      
      // Is it a self-closing tag?
      let selfClosing = false;
      if (tagDef.endsWith('/>')) {
        selfClosing = true;
      }
      
      // Check if this tag has a green bg
      if (tagDef.includes('bg-[#f4fbf8]') || tagDef.includes('bg-emerald-50') || tagDef.includes('bg-[#0e7c66]')) {
        if (!selfClosing) {
          greenBgDepths.push(depth);
        }
      }
      
      // If we are currently inside a green bg (stack is not empty)
      if (greenBgDepths.length > 0) {
        // Replace text-[#0e7c66] and text-emerald-\d+ with text-[#0a2e1e]
        if (tagDef.includes('text-[#0e7c66]') || tagDef.match(/text-emerald-\d+/)) {
          let oldTagDef = tagDef;
          tagDef = tagDef.replace(/text-\[#0e7c66\]/g, 'text-[#0a2e1e]');
          tagDef = tagDef.replace(/text-emerald-\d+/g, 'text-[#0a2e1e]');
          if (oldTagDef !== tagDef) {
            totalFixed++;
          }
        }
      }
      
      newContent += tagDef;
      i = tagEnd + 1;
      
      if (selfClosing) {
        depth--;
      }
      continue;
    } 
    // Check for tag close
    else if (content[i] === '<' && content[i+1] === '/') {
      if (greenBgDepths.length > 0 && greenBgDepths[greenBgDepths.length - 1] === depth) {
        greenBgDepths.pop();
      }
      depth--;
      
      let tagEnd = content.indexOf('>', i);
      if (tagEnd === -1) tagEnd = content.length;
      newContent += content.substring(i, tagEnd + 1);
      i = tagEnd + 1;
      continue;
    }
    
    newContent += content[i];
    i++;
  }
  
  if (newContent !== originalContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    filesFixed++;
    console.log(`Fixed ${f}`);
  }
});

console.log(`\nFixed ${totalFixed} instances across ${filesFixed} files.`);
