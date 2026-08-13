const fs = require('fs');

const path = 'src/data/blogPosts.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Delete the 3 bad duplicate entries at the end of the file
const regexDelete = /\{\s*id:\s*"(?:everything-you-need-to-know-to-ensure-GDPR-EU-Compliance|new-york-data-privacy-law|deciphered-the-basics-of-CCPA)"[^}]+\}(?:,\s*)?(?=\s*\];)/g;
content = content.replace(regexDelete, '');
// Clean up any trailing commas before the ];
content = content.replace(/,\s*\];/, '\n];');

// 2. Update the original entries
// For GDPR
content = content.replace(
  /id:\s*"gdpr-eu-compliance-guide"[\s\S]*?slug:\s*"gdpr-eu-compliance-guide"[\s\S]*?title:\s*"Everything You Need To Know To Ensure GDPR \(EU\) Compliance"[\s\S]*?link:\s*"\/blog\/gdpr-eu-compliance-guide"/,
  `id: "everything-you-need-to-know-to-ensure-GDPR-EU-Compliance",
    slug: "everything-you-need-to-know-to-ensure-GDPR-EU-Compliance",
    title: "GDPR (EU) Compliance",
    excerpt: "Gain understanding of GDPR, its objectives, scope, and key principles, while learning how to protect customer data and avoid costly non-compliance fines.",
    link: "/blog/everything-you-need-to-know-to-ensure-GDPR-EU-Compliance"`
);

// For NYPA
content = content.replace(
  /id:\s*"new-york-data-privacy-law"[\s\S]*?slug:\s*"new-york-data-privacy-law"[\s\S]*?title:\s*"New York Privacy Act: An Insight"[\s\S]*?link:\s*"\/blog\/new-york-data-privacy-law"/,
  `id: "new-york-data-privacy-law",
    slug: "new-york-data-privacy-law",
    title: "New York Privacy Act 2021",
    excerpt: "New York lawmakers have proposed several consumer privacy protection bills. The New York Privacy Act focuses on protecting consumers' personal data and privacy.",
    link: "/blog/new-york-data-privacy-law"`
);

// For CCPA
content = content.replace(
  /id:\s*"deciphered-basics-of-ccpa"[\s\S]*?slug:\s*"deciphered-basics-of-ccpa"[\s\S]*?title:\s*"Deciphered - The Basics of CCPA"[\s\S]*?link:\s*"\/blog\/deciphered-basics-of-ccpa"/,
  `id: "deciphered-the-basics-of-CCPA",
    slug: "deciphered-the-basics-of-CCPA",
    title: "Basics of CCPA",
    excerpt: "You finally managed to get a handle on the whole GDPR business. Now you must contend with the California Consumer Privacy Act (CCPA).",
    link: "/blog/deciphered-the-basics-of-CCPA"`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed blogPosts.ts');
