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

    // Fix invisible text in Hero (white text on white background)
    content = content.replace(/<span className="bg-white bg-clip-text text-transparent">(.*?)<\/span>/g, '$1');

    // Fix boxy white wrappers (using Regex to catch any class string with bg-white and p-8)
    // Be careful not to replace the main page wrapper 'min-h-screen bg-white' or 'py-16 bg-white shadow-none'
    // We target wrappers that have p-8 or p-12 and border
    content = content.replace(/className="[^"]*bg-white[^"]*p-8[^"]*"/g, `className="${proseClass}"`);

    // Fix bg-[#f4fbf8] wrappers
    content = content.replace(/className="[^"]*bg-\[#f4fbf8\][^"]*p-8[^"]*"/g, `className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] ${proseClass}"`);

    // Fix bg-purple-50 wrappers
    content = content.replace(/className="[^"]*bg-purple-50[^"]*p-8[^"]*"/g, `className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] ${proseClass}"`);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Modified ${modifiedCount} blog files.`);
