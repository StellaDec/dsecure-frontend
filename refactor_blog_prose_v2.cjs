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

  // Change prose-p:mb-6 to prose-p:mb-10 and add prose-li:mb-4 for more professional breathing room
  c = c.replace(/prose-p:mb-6/g, 'prose-p:mb-10 prose-li:mb-4');

  fs.writeFileSync(p, c);
  console.log('Professionally spaced paragraphs in', f);
});
