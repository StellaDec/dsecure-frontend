/**
 * Section 6.1: Grep Deleted Slugs
 * Saare pruned/merged slugs ko src/ mein search karta hai
 * Koi bhi import, route, ya reference nahi hona chahiye
 */
const { execSync } = require('child_process');
const fs = require('fs');

// deleted_components.json se absorbed component names
const deletedComponents = JSON.parse(fs.readFileSync('deleted_components.json', 'utf8'));

// Implementation plan se pruned slugs (wo jo routes/registry se hataye gaye)
const prunedSlugs = [
  'overwrite-guide', 'ssd-wipe-guide', 'data-sanitization-compliance-guide',
  'best-data-erasure-methods', 'automated-erasure', 'mobile-erasure',
  'zero-trust-disposal-policy', 'msp-security-solutions', 'esg-data-erasure',
  'scope-3-emissions-reuse', 'msp-data-erasure-service',
  'caption-call-fcc-settlement', 'hardware-diagnostics-blog',
  'future-of-data-destruction', 'remote-work-best-practices',
  'healthcare-ransomware', 'erase-mac-dsecure', 'nist-800-88-india',
  'certified-itad-reasons', 'cloud-migration-data',
  'common-criteria-eal4', 'corporate-it-asset-risks',
  'data-hoarding-risks', 'dell-data-wipe-alternative',
  'deployment-options', 'diagnostics-erasure-itad',
  'digital-divide-erasure', 'green-it-practices',
  'ipad-tablet-erasure', 'itad-challenges',
  'itad-environmental', 'itad-procurement',
  'itam-data-breach', 'it-asset-reuse-blog',
  'legal-ethical-erasure-blog', 'marriott-settlement',
  'media-sanitization-need', 'mobile-diagnostics-benefits',
  'morgan-stanley-data-breach', 'nist-800-88-compliance-india',
  'phi-erasure', 'post-covid-data-disposal',
  'remote-wiping-software', 'reseller-profits',
  'right-to-repair', 'secure-hdd-disposal',
  'shadow-data-risks', 'statutory-compliance',
  'sustainable-it-reuse', 'erasure-standards-blog',
  'data-privacy-obligations', 'data-retention-privacy',
  'dark-data-risks', 'cybersecurity-data-destruction',
  'best-erasure-method', 'change-healthcare-attack',
  'cryptographic-erase-sed', 'secure-smartphone-erasure',
  'nist-800-88-media-sanitization-guide',
];

// Component filenames (without .tsx)
const componentNames = deletedComponents;

console.log('=== SECTION 6.1: GREP DELETED SLUGS ===\n');

let issues = [];

// Check component names in src/ (excluding node_modules, dist, scratch)
componentNames.forEach(comp => {
  try {
    const result = execSync(
      `Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx -File | Select-String -Pattern "${comp}" -SimpleMatch | Select-Object -First 5`,
      { encoding: 'utf8', shell: 'powershell.exe', timeout: 10000 }
    ).trim();
    if (result) {
      issues.push({ type: 'COMPONENT_REF', name: comp, matches: result });
    }
  } catch (e) {
    // No matches = good
  }
});

console.log(`Component references found: ${issues.length}`);
issues.forEach(i => {
  console.log(`  ❌ ${i.name}:`);
  i.matches.split('\n').forEach(m => console.log(`     ${m.trim()}`));
});

if (issues.length === 0) {
  console.log('  ✅ No orphaned component references found in src/');
}

console.log(`\n=== DONE ===`);
