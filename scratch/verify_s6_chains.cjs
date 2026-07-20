/**
 * Section 6.2: Automated Redirect Chain Check
 * vercel.json mein koi redirect chain nahi hona chahiye
 * (destination khud ek redirect source nahi hona chahiye)
 */
const fs = require('fs');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

console.log('=== SECTION 6.2: REDIRECT CHAIN CHECK ===\n');

const redirects = vercelConfig.redirects || [];
console.log(`Total redirects in vercel.json: ${redirects.length}`);

// Saare source paths ka set banao
const sourceSet = new Set(redirects.map(r => r.source));

// Check: koi destination khud ek source toh nahi?
let chains = [];
redirects.forEach(r => {
  // Exact match check
  if (sourceSet.has(r.destination)) {
    chains.push({ from: r.source, to: r.destination, issue: 'Destination is also a redirect source' });
  }
  // Regex source check (basic)
  const destPath = r.destination;
  redirects.forEach(r2 => {
    if (r2.source === destPath && r2 !== r) {
      // Already caught above
    }
  });
});

if (chains.length === 0) {
  console.log('  ✅ No redirect chains detected');
} else {
  console.log(`  ❌ ${chains.length} redirect chain(s) found:`);
  chains.forEach(c => {
    console.log(`     ${c.from} → ${c.to} (${c.issue})`);
  });
}

// Check: koi destination pruned slug list mein toh nahi?
const prunedDestinations = [
  '/blog/overwrite-guide', '/blog/ssd-wipe-guide', '/blog/erasure-standards',
  '/blog/statutory-compliance', '/blog/data-privacy-obligations',
  '/blog/marriott-settlement', '/blog/data-retention-privacy',
  '/blog/sustainable-it-reuse', '/blog/right-to-repair',
  '/blog/green-it-practices', '/blog/digital-divide',
  '/blog/itad-environmental', '/blog/esg-data-erasure',
  '/blog/phi-erasure', '/blog/itad-challenges',
  '/blog/certified-itad-reasons', '/blog/itad-procurement',
  '/blog/dell-data-wipe-alternative', '/blog/remote-work-data-erasure-best-practices',
  '/blog/post-covid-data-disposal', '/blog/remote-wiping-software',
  '/blog/dark-data-risks', '/blog/shadow-data',
  '/blog/best-data-erasure-methods', '/blog/cybersecurity-data-destruction',
  '/blog/msp-security', '/blog/scope3-emissions',
  '/blog/hardware-diagnostics', '/blog/diagnostics-erasure-itad',
  '/blog/secure-smartphone-erasure', '/blog/ipad-tablet-erasure',
  '/blog/change-healthcare-attack', '/blog/future-of-data-destruction',
  '/blog/itam-data-breach', '/blog/cryptographic-erase-sed',
  '/blog/morgan-stanley-data-breach', '/blog/erase-mac-data-safely-using-dsecure',
  '/blog/nist-800-88-india', '/blog/nist-800-88-compliance-india',
  '/blog/secure-hdd-disposal', '/blog/caption-call-fcc-settlement',
  '/blog/reseller-profits', '/blog/mobile-diagnostics-benefits',
  '/blog/cloud-migration', '/blog/corporate-it-asset-risks',
  '/blog/data-disposal-guidelines', '/blog/media-sanitization-need',
];
const prunedSet = new Set(prunedDestinations);

let badDests = [];
redirects.forEach(r => {
  if (prunedSet.has(r.destination)) {
    badDests.push({ source: r.source, destination: r.destination });
  }
});

if (badDests.length === 0) {
  console.log('  ✅ No redirects pointing to pruned/deleted slugs');
} else {
  console.log(`  ❌ ${badDests.length} redirect(s) pointing to pruned slugs:`);
  badDests.forEach(b => {
    console.log(`     ${b.source} → ${b.destination}`);
  });
}

console.log('\n=== DONE ===');
