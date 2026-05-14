import fs from 'fs';
import path from 'path';

const blogDir = 'src/components/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('Blog.tsx') || f.endsWith('Guide.tsx') || f.endsWith('Issues.tsx'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let changed = false;

  // Replace section
  const sectionRegex = /<section className="w-full px-4 md:px-8 lg:px-16 py-12">/g;
  if (sectionRegex.test(content)) {
    content = content.replace(sectionRegex, '<section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">');
    changed = true;
  }
  
  // Try replacing the inner div containing bg-white, rounded-something
  // There are variations, let's catch the most common ones that immediately follow <Reveal> after the section.
  // Actually, we can just replace any div that starts with "bg-white rounded-xl shadow-" and ends with "p-8..."
  const divRegex1 = /<div className="bg-white rounded-xl shadow-md border border-slate-200\/50 p-8(?: md:p-12)? space-y-8">/g;
  if (divRegex1.test(content)) {
    content = content.replace(divRegex1, '<div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">');
    changed = true;
  }
  
  const divRegex2 = /<div className="bg-white rounded-xl shadow-xl border border-slate-200\/50 p-8 md:p-12 space-y-10">/g;
  if (divRegex2.test(content)) {
    content = content.replace(divRegex2, '<div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">');
    changed = true;
  }

  // Handle any generic bg-white rounded-xl
  const divRegexGeneric = /<div className="bg-white rounded-xl shadow-[a-z]+ border border-slate-200\/50 p-[^"]+">/g;
  if (divRegexGeneric.test(content)) {
    content = content.replace(divRegexGeneric, '<div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} blog files.`);
