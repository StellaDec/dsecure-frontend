const fs = require('fs');
const c = fs.readFileSync('src/components/blog/GDPREUComplianceGuideBlog.tsx', 'utf8');
const lines = c.split('\n');

const tagStack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Find opening tags (not self-closing)
  const openMatches = line.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?(?<!\/)\s*>/g);
  for (const m of openMatches) {
    // Skip self-closing tags
    if (m[0].endsWith('/>')) continue;
    tagStack.push({ tag: m[1], line: i + 1 });
  }
  
  // Find closing tags
  const closeMatches = line.matchAll(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g);
  for (const m of closeMatches) {
    if (tagStack.length > 0 && tagStack[tagStack.length - 1].tag === m[1]) {
      tagStack.pop();
    } else {
      console.log(`MISMATCH at line ${i+1}: closing </${m[1]}> but expected closing </${tagStack.length > 0 ? tagStack[tagStack.length-1].tag : 'EMPTY'}>`);
      // Pop anyway to continue
      if (tagStack.length > 0) tagStack.pop();
    }
  }
}

if (tagStack.length > 0) {
  console.log('\nUnclosed tags:');
  tagStack.forEach(t => console.log(`  <${t.tag}> opened at line ${t.line}`));
}
