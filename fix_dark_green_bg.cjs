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
  
  let i = 0;
  let depth = 0;
  let darkGreenBgDepths = []; // stack of depths where a dark green bg started
  
  let newContent = '';
  
  while (i < content.length) {
    if (content[i] === '<' && content[i+1] && content[i+1].match(/[a-zA-Z]/)) {
      depth++;
      let tagEnd = content.indexOf('>', i);
      if (tagEnd === -1) tagEnd = content.length;
      let tagDef = content.substring(i, tagEnd + 1);
      
      let selfClosing = tagDef.endsWith('/>');
      
      // Check for dark green bg specifically
      if (tagDef.includes('bg-[#0e7c66]')) {
        if (!selfClosing) {
          darkGreenBgDepths.push(depth);
        }
      }
      
      if (darkGreenBgDepths.length > 0) {
        // We are inside a dark green bg
        // If there is text-[#0a2e1e] (which looks black), change it to text-white
        if (tagDef.includes('text-[#0a2e1e]')) {
          let oldTagDef = tagDef;
          tagDef = tagDef.replace(/text-\[#0a2e1e\]/g, 'text-white');
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
    else if (content[i] === '<' && content[i+1] === '/') {
      if (darkGreenBgDepths.length > 0 && darkGreenBgDepths[darkGreenBgDepths.length - 1] === depth) {
        darkGreenBgDepths.pop();
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
