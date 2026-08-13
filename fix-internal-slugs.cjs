const fs = require('fs');

// GDPR
let gdpr = fs.readFileSync('src/components/blog/GDPREUComplianceGuideBlog.tsx', 'utf8');
gdpr = gdpr.replace(/slug:\s*"gdpr-eu-compliance-guide"/, 'slug: "everything-you-need-to-know-to-ensure-GDPR-EU-Compliance"');
gdpr = gdpr.replace(/blogId="gdpr-eu-compliance-guide"/, 'blogId="everything-you-need-to-know-to-ensure-GDPR-EU-Compliance"');
gdpr = gdpr.replace(/title:\s*"Everything You Need To Know To Ensure GDPR \(EU\) Compliance"/, 'title: "GDPR (EU) Compliance"');
gdpr = gdpr.replace(/blogTitle="Everything You Need To Know To Ensure GDPR \(EU\) Compliance"/, 'blogTitle="GDPR (EU) Compliance"');
fs.writeFileSync('src/components/blog/GDPREUComplianceGuideBlog.tsx', gdpr);

// CCPA
let ccpa = fs.readFileSync('src/components/blog/CCPABasicsBlog.tsx', 'utf8');
ccpa = ccpa.replace(/slug:\s*"deciphered-basics-of-ccpa"/, 'slug: "deciphered-the-basics-of-CCPA"');
ccpa = ccpa.replace(/blogId="deciphered-basics-of-ccpa"/, 'blogId="deciphered-the-basics-of-CCPA"');
ccpa = ccpa.replace(/title:\s*"Deciphered - The Basics of CCPA"/, 'title: "Basics of CCPA"');
ccpa = ccpa.replace(/blogTitle="Deciphered - The Basics of CCPA"/, 'blogTitle="Basics of CCPA"');
fs.writeFileSync('src/components/blog/CCPABasicsBlog.tsx', ccpa);

// NYPA
let nypa = fs.readFileSync('src/components/blog/NewYorkPrivacyActBlog.tsx', 'utf8');
nypa = nypa.replace(/title:\s*"New York Privacy Act: An Insight"/, 'title: "New York Privacy Act 2021"');
nypa = nypa.replace(/blogTitle="New York Privacy Act: An Insight"/, 'blogTitle="New York Privacy Act 2021"');
fs.writeFileSync('src/components/blog/NewYorkPrivacyActBlog.tsx', nypa);

console.log("Internal component slugs and titles updated");
