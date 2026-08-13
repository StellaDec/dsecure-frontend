const fs = require('fs');
const path = require('path');

const filesToFix = [
  'GDPREUComplianceGuideBlog.tsx',
  'CCPABasicsBlog.tsx',
  'NewYorkPrivacyActBlog.tsx'
];

filesToFix.forEach(f => {
  const p = path.join('src/components/blog', f);
  let c = fs.readFileSync(p, 'utf8');

  // Fix H2 spacing
  c = c.replace(/<h2 className="flex items-center gap-3 text-brand-700">/g, '<h2 className="flex items-center gap-3 text-brand-700 mt-16 mb-6 text-3xl">');
  
  // Fix H3 spacing
  c = c.replace(/<h3 className="flex items-start gap-3 border-b border-slate-100 pb-3 text-brand-700">/g, '<h3 className="flex items-start gap-3 border-b border-slate-100 pb-3 text-brand-700 mt-12 mb-6 text-2xl">');

  // Fix P spacing. Note: we match <p> exactly to avoid touching already styled paragraphs (like inside callout boxes)
  // But wait, what if it's <p >? Let's just do <p>
  c = c.replace(/<p>/g, '<p className="mb-8 text-slate-600 leading-loose text-lg">');

  // Fix UL and LI spacing
  c = c.replace(/<ul>/g, '<ul className="list-disc pl-8 mb-10 space-y-4 text-slate-600 text-lg">');
  // Some lists might just have <li> without class
  // Wait, I shouldn't replace all <li> because some might be in the header/footer. 
  // No, this is only inside the blog content. Let's just rely on the space-y-4 on UL for list spacing.

  fs.writeFileSync(p, c);
  console.log('Fixed tags directly in', f);
});
