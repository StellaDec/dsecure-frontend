const fs = require('fs');
const path = require('path');

const dir = 'src/components/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Blog.tsx') || f.endsWith('Guide.tsx') || f.endsWith('Donts.tsx'));

const proseClass = 'prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8';

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove the boxy structure from white sections
    content = content.replace(/className="bg-white rounded-[a-zA-Z0-9\-]+ border-[a-z] border-\[#[a-zA-Z0-9]+\] shadow-[a-zA-Z0-9\-]+ p-[0-9]+ md:p-[0-9]+ space-y-[0-9]+ text-justify( mt-[0-9]+)?"/g, `className="${proseClass}$1"`);
    
    // Sometimes text-justify is not there
    content = content.replace(/className="bg-white rounded-[a-zA-Z0-9\-]+ border-[a-z] border-\[#[a-zA-Z0-9]+\] shadow-[a-zA-Z0-9\-]+ p-[0-9]+ md:p-[0-9]+ space-y-[0-9]+( mt-[0-9]+)?"/g, `className="${proseClass}$1"`);

    // Remove the boxy structure from emerald highlight sections, replace with blockquote style
    content = content.replace(/className="bg-\[#f4fbf8\] rounded-[a-zA-Z0-9\-]+ border-[a-z] border-\[#[a-zA-Z0-9]+\] shadow-[a-zA-Z0-9\-]+ p-[0-9]+ md:p-[0-9]+ space-y-[0-9]+( mt-[0-9]+)?"/g, `className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66]$1 ${proseClass}"`);

    // Also remove the explicit text colors from paragraphs/headings if we are relying on prose
    // Actually, prose handles it, but having text-[#5a6672] doesn't hurt.

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Modified ${modifiedCount} blog files.`);
