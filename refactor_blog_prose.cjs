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

  // 1. Ensure HelpCircle is imported from lucide-react
  if (!c.includes('HelpCircle')) {
    c = c.replace(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
      return `import { ${p1}, HelpCircle } from 'lucide-react';`;
    });
  }

  // 2. Refactor H2 to have a professional left vertical bar
  // Match <h2>Title</h2>
  c = c.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
    return `<h2 className="flex items-center gap-3 text-brand-700">
                  <span className="w-1.5 h-8 bg-brand-600 rounded-none inline-block flex-shrink-0"></span>
                  <span>${p1}</span>
                </h2>`;
  });

  // 3. Refactor H3 (Questions) to have a HelpCircle icon
  // Match <h3>Title</h3>
  c = c.replace(/<h3>(.*?)<\/h3>/g, (match, p1) => {
    return `<h3 className="flex items-start gap-3 border-b border-slate-100 pb-3 text-brand-700">
                  <HelpCircle className="w-7 h-7 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>${p1}</span>
                </h3>`;
  });

  fs.writeFileSync(p, c);
  console.log('Professionally formatted headings in', f);
});
