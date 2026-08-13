// Duplicate entries hataane ka script - yeh entries mein slug/link/tag missing hai
const fs = require('fs');
let content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');

// Last "readTime: \"9 min read\"" ke baad sab kuch replace karna hai (except the closing bracket)
const lastReadTimeIdx = content.lastIndexOf('readTime: "9 min read"');
if (lastReadTimeIdx === -1) {
  console.log('ERROR: Could not find last readTime entry');
  process.exit(1);
}

// Is line ke end tak jaana hai
const lineEnd = content.indexOf('\n', lastReadTimeIdx);

// Check karna hai ki yeh line 2643 wali hai (the mac erasure one, not a duplicate)
const before = content.substring(lastReadTimeIdx - 200, lastReadTimeIdx);
console.log('Context before last readTime:', before.substring(before.length - 80));

// Ab iske baad dekhte hain kya hai
const afterContent = content.substring(lineEnd + 1);
console.log('Content after last readTime (first 100 chars):', JSON.stringify(afterContent.substring(0, 100)));

// Find the "];" that closes the array
const closingBracket = afterContent.indexOf('];');
const stuffBetween = afterContent.substring(0, closingBracket);
console.log('Stuff between last readTime and ];:', JSON.stringify(stuffBetween.substring(0, 100)));

// Replace everything from after line 2644 to end with just the closing
const cutPoint = lineEnd + 1;
const newContent = content.substring(0, cutPoint) + '  }\r\n];\r\n';
fs.writeFileSync('src/data/blogPosts.ts', newContent, 'utf8');
console.log('Duplicates removed! New file length:', newContent.length, '(was:', content.length, ')');
