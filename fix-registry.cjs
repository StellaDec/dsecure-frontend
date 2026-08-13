const fs = require('fs');

const registryPath = 'src/components/blog/BlogRegistry.ts';
let content = fs.readFileSync(registryPath, 'utf8');

// Replace the old bad ones with the correct mapping to the original components
content = content.replace(
  /'everything-you-need-to-know-to-ensure-GDPR-EU-Compliance': getBlogComponent\('GDPRBlog'\),/g,
  "'everything-you-need-to-know-to-ensure-GDPR-EU-Compliance': getBlogComponent('GDPREUComplianceGuideBlog'),"
);
content = content.replace(
  /'new-york-data-privacy-law': getBlogComponent\('NYPABlog'\),/g,
  "'new-york-data-privacy-law': getBlogComponent('NewYorkPrivacyActBlog'),"
);
content = content.replace(
  /'deciphered-the-basics-of-CCPA': getBlogComponent\('CCPABlog'\),/g,
  "'deciphered-the-basics-of-CCPA': getBlogComponent('CCPABasicsBlog'),"
);

// We should also ensure the old slugs from the original components are still mapped or removed.
// The original components were not in the registry? Wait, let's check if 'gdpr-eu-compliance-guide' is in BlogRegistry.ts
// If it wasn't, then we just added them!

fs.writeFileSync(registryPath, content, 'utf8');
console.log('Fixed BlogRegistry.ts');
