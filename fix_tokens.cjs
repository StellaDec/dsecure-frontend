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

  // Fix the broken replacements from earlier
  c = c.replace(/border-\[var\(--color-primary\)\]/g, 'border-brand-600');
  c = c.replace(/text-\[var\(--color-primary\)\]/g, 'text-brand-600');

  // Fix the standard hex codes to tailwind tokens
  c = c.replace(/bg-\[#f4fbf8\]/g, 'bg-brand-50');
  c = c.replace(/bg-\[#d4ede4\]/g, 'bg-brand-100');
  c = c.replace(/text-\[#0e7c66\]/g, 'text-brand-600');
  c = c.replace(/text-\[#0a2e1e\]/g, 'text-brand-700');
  c = c.replace(/border-\[#0e7c66\]/g, 'border-brand-600');
  c = c.replace(/border-\[#0a2e1e\]/g, 'border-brand-700');
  c = c.replace(/text-\[#5a6672\]/g, 'text-slate-600');
  c = c.replace(/border-\[#d0d5dc\]/g, 'border-slate-300');

  fs.writeFileSync(p, c);
  console.log('Fixed', f);
});
