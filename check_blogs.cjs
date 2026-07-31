const fs = require('fs');
const path = require('path');

const dir = 'src/components/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let unhandled = [];
let totalBlogs = 0;

files.forEach(file => {
    // Ignore non-blog components
    if (file === 'BlogPage.tsx' || file === 'BlogFooterStandard.tsx' || file === 'BlogPostTemplate.tsx' || file === 'FAQSection.tsx') return;
    
    totalBlogs++;
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if it still has the boxy wrappers
    if (content.match(/className="[^"]*bg-white[^"]*p-8[^"]*"/)) {
        unhandled.push(file);
    }
});

console.log(`Total actual blog components: ${totalBlogs}`);
console.log(`Unhandled blogs still having old boxy layout: ${unhandled.length}`);
if (unhandled.length > 0) {
    console.log("Unhandled files:", unhandled);
}
