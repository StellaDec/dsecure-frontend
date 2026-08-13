const fs = require('fs');
const path = require('path');

const maps = [
  { old: 'gdpr-compliance', new: 'everything-you-need-to-know-to-ensure-GDPR-EU-Compliance' },
  { old: 'nypa-compliance', new: 'new-york-data-privacy-law' },
  { old: 'ccpa-compliance', new: 'deciphered-the-basics-of-CCPA' }
];

const filesToUpdate = [
  'src/data/internationalLawsData.ts',
  'src/components/blog/BlogRegistry.ts',
  'src/data/blogPosts.ts',
  'src/components/blog/GDPRBlog.tsx',
  'src/components/blog/NYPABlog.tsx',
  'src/components/blog/CCPABlog.tsx',
];

filesToUpdate.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    let changed = false;
    maps.forEach(map => {
      if (content.includes(map.old)) {
        content = content.split(map.old).join(map.new);
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(absolutePath, content, 'utf8');
      console.log('Updated slugs in', filePath);
    }
  }
});
