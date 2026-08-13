const fs = require('fs');
let content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
content = content.replace(/}\s*\n\s*{\s*id: "gdpr-compliance"/, '},\n\n  {\n    id: "gdpr-compliance"');
fs.writeFileSync('src/data/blogPosts.ts', content);
console.log('Fixed missing comma in blogPosts.ts');
