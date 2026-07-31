const fs = require('fs');
const path = require('path');

const files = [
  'src/components/blog/MacM1ErasureKnownIssues.tsx',
  'src/components/blog/DataErasureForNonProfits.tsx',
  'src/components/blog/WipeSSDFromBIOSGuide.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix root container
  content = content.replace(/min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/g, 'min-h-screen bg-white');

  // Fix prose container
  content = content.replace(/className="prose prose-emerald prose-lg md:prose-xl max-w-none text-justify"/g, 'className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8"');
  content = content.replace(/className="prose prose-emerald prose-lg md:prose-xl max-w-none text-justify mb-8"/g, 'className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8"');

  // Hero section badge
  content = content.replace(/text-slate-700 bg-slate-100/g, 'text-[#0e7c66] bg-[#d4ede4]');
  content = content.replace(/text-green-700 bg-green-100/g, 'text-[#0e7c66] bg-[#d4ede4]');

  // Text colors
  content = content.replace(/text-slate-900/g, 'text-[#0a2e1e]');
  content = content.replace(/text-slate-700/g, 'text-[#5a6672]');
  content = content.replace(/text-slate-600/g, 'text-[#5a6672]');
  content = content.replace(/text-amber-600/g, 'text-[#0e7c66]');
  content = content.replace(/border-amber-200/g, 'border-[#d0d5dc]');

  // Table header backgrounds in WipeSSDFromBIOSGuide
  content = content.replace(/bg-slate-100/g, 'bg-[#f4fbf8]');
  content = content.replace(/bg-slate-50/g, 'bg-white');

  fs.writeFileSync(file, content);
});

console.log('Fixed 3 legacy blogs styling to match the rest of the consistent theme');
