const fs = require('fs');
const file = 'src/pages/HomePage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<HoverIcon>\s*\{\(filled\) => \(\s*/g, '');
content = content.replace(/\s*fill=\{filled \? "currentColor" : \n?"none"\}\s*/g, ' ');
content = content.replace(/\s*\)\}\s*<\/HoverIcon>/g, '');
content = content.replace(/import HoverIcon from '\.\.\/components\/HoverIcon';\n/g, '');

fs.writeFileSync(file, content);
console.log("Cleanup complete");
