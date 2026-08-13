const fs = require('fs');

const slugsToRemove = [
  'glba-compliance', 'hipaa-compliance', 'uk-dpa-compliance', 'bdsg-compliance',
  'philippines-dpa-compliance', 'fdpa-compliance', 'pdpl-sa-compliance',
  'sox-compliance', 'appi-compliance', 'pipl-compliance', 'fadp-compliance',
  'lgpd-compliance', 'privacy-act-au-compliance', 'popia-compliance',
  'pipeda-compliance', 'lfpdppp-compliance', 'dpdp-compliance',
  'us-privacy-act-compliance', 'nz-privacy-act-compliance', 'mhmda-compliance',
  'ley-25326-compliance', 'tdpsa-compliance', 'peru-pdp-compliance', 'vcdpa-compliance',
  'everything-you-need-to-know-to-ensure-GDPR-EU-Compliance', 'new-york-data-privacy-law',
  'deciphered-the-basics-of-CCPA', 'sustainable-it-reuse', 'reduce-carbon-footprint',
  'hardware-diagnostics', 'change-healthcare-attack', 'cybersecurity-data-destruction',
  'dark-data-risks', 'data-disposal-guidelines', 'data-privacy-obligations',
  'data-retention-privacy', 'secure-smartphone-erasure'
];

let content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');

let removedCount = 0;
for (const slug of slugsToRemove) {
    const regex = new RegExp(`\\{[^{]*?slug:\\s*['"]${slug}['"][\\s\\S]*?\\},?\\s*`, 'g');
    if (regex.test(content)) {
        content = content.replace(regex, '');
        removedCount++;
    }
}

fs.writeFileSync('src/data/blogPosts.ts', content, 'utf8');
console.log(`Removed ${removedCount} placeholder blogs.`);
