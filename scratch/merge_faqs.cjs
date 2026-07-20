/**
 * Section 5 FAQ Merge Script
 * blogFaqs.ts mein absorbed slug ke FAQs ko canonical survivor key mein merge karta hai
 * aur absorbed key ko delete karta hai.
 */
const fs = require('fs');

const content = fs.readFileSync('src/data/blogFaqs.ts', 'utf8');

// Step 1: Parse the file into a map of key -> FAQ[]
let lines = content.split('\n');
let i = 0;
let before = [];
while (i < lines.length && !lines[i].includes('export const blogFaqs')) {
    before.push(lines[i]);
    i++;
}
before.push(lines[i]); // export line
i++;

let inArray = false;
let arrayContent = '';
let key = null;
let parsedObj = {};
let keyOrder = [];

for (; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = line.match(/^\s*"([^"]+)":\s*\[\s*$/);
    if (keyMatch) {
        key = keyMatch[1];
        inArray = true;
        arrayContent = '[\n';
    } else if (inArray && line.match(/^\s*\],?\s*$/)) {
        arrayContent += ']';
        inArray = false;
        try {
            let arr = eval('(' + arrayContent + ')');
            if (!parsedObj[key]) {
                parsedObj[key] = [];
                keyOrder.push(key);
            }
            parsedObj[key] = parsedObj[key].concat(arr);
        } catch (e) {
            console.error('Failed to parse key:', key, e.message);
        }
    } else if (inArray) {
        arrayContent += line + '\n';
    } else if (line.trim() === '};' || line.trim() === '}') {
        break;
    }
}

// Step 2: Define merge map — absorbed -> canonical survivor
const mergeMap = {
  // dod-vs-ieee <- erasure-standards
  'erasure-standards': 'dod-vs-ieee',
  // nist-clear-purge <- nist-800-88-media-sanitization-guide (already done but ensure)
  // ssd-wipe-bios <- ssd-wipe-guide (already done)
  // legal-ethical-erasure <- statutory-regulatory-compliance, data-privacy-obligations, marriott-settlement, data-retention-privacy
  'statutory-regulatory-compliance': 'legal-ethical-erasure',
  'data-privacy-obligations': 'legal-ethical-erasure',
  'marriott-settlement': 'legal-ethical-erasure',
  'data-retention-privacy': 'legal-ethical-erasure',
  // it-asset-reuse <- sustainable-it-reuse, right-to-repair, green-it-practices, digital-divide, itad-environmental
  'sustainable-it-reuse': 'it-asset-reuse',
  'right-to-repair': 'it-asset-reuse',
  'green-it-practices': 'it-asset-reuse',
  'digital-divide': 'it-asset-reuse',
  'itad-environmental': 'it-asset-reuse',
  // eu-csrd <- esg-data-erasure
  'esg-data-erasure': 'eu-csrd',
  // hipaa-compliance-erasure <- phi-erasure
  'phi-erasure': 'hipaa-compliance-erasure',
  // itad-selection-guide <- itad-challenges, certified-itad-reasons, itad-procurement
  'itad-challenges': 'itad-selection-guide',
  'certified-itad-reasons': 'itad-selection-guide',
  'itad-procurement': 'itad-selection-guide',
  // dsecure-vs-manufacturer-tools-comparison <- dell-data-wipe-alternative
  'dell-data-wipe-alternative': 'data-erasure-myths', // no dsecure-vs-manufacturer slug, put under erasure-myths or skip
  // education-data-destruction (no absorbed FAQs to merge, content only)
  // remote-work-data-erasure <- remote-work-data-erasure-best-practices, post-covid-data-disposal, remote-wiping-software
  'remote-work-data-erasure-best-practices': 'remote-work-data-erasure',
  'post-covid-data-disposal': 'remote-work-data-erasure',
  'remote-wiping-software': 'remote-work-data-erasure',
  // data-hoarding <- dark-data-risks, shadow-data
  'dark-data-risks': 'data-hoarding',
  'shadow-data': 'data-hoarding',
  // erasure-best-practices <- best-data-erasure-methods, cybersecurity-data-destruction
  'best-data-erasure-methods': 'erasure-best-practices',
  'cybersecurity-data-destruction': 'erasure-best-practices',
  // msp-multi-tenant-data-erasure-enterprise-scale <- msp-security, msp-data-erasure
  'msp-security': 'msp-data-erasure', // keep msp-data-erasure as canonical for now
  // reduce-carbon-footprint <- carbon-footprint-erasure, scope3-emissions
  'scope3-emissions': 'carbon-footprint-erasure', // keep carbon-footprint-erasure
  // hardware-diagnostics-itad-compliance <- hardware-diagnostics, diagnostics-erasure-itad
  'hardware-diagnostics': 'hardware-diagnostics-itad-compliance',
  'diagnostics-erasure-itad': 'hardware-diagnostics-itad-compliance',
  // mobile-erasure-guide <- secure-smartphone-erasure, ipad-tablet-erasure
  'secure-smartphone-erasure': 'mobile-erasure-guide',
  'ipad-tablet-erasure': 'mobile-erasure-guide',
  // healthcare-ransomware-lessons <- change-healthcare-attack
  'change-healthcare-attack': 'healthcare-ransomware-lessons',
  // end-of-life-data-security <- future-of-data-destruction
  'future-of-data-destruction': 'end-of-life-data-security',
  // itam-disposal-guide <- itam-data-breach
  'itam-data-breach': 'itam-disposal-guide',
  // cryptographic-erase <- cryptographic-erase-n-i-s-t
  'cryptographic-erase-n-i-s-t': 'cryptographic-erase',
  // sec-compliance <- morgan-stanley-data-breach
  'morgan-stanley-data-breach': 'sec-compliance',
  // dod-wiping-standard <- overwrite-guide
  'overwrite-guide': 'dod-wiping-standard',
  // how-to-erase-mac <- erase-mac-data-safely-using-dsecure
  'erase-mac-data-safely-using-dsecure': 'how-to-erase-mac',
  // india-dpdp-act <- nist-800-88-india, nist-800-88-compliance-india
  'nist-800-88-india': 'nist-clear-purge', // India NIST -> nist-clear-purge (closest canonical)
  'nist-800-88-compliance-india': 'nist-clear-purge',
  // physical-destruction-vs-data-wiping <- secure-hdd-disposal
  'secure-hdd-disposal': 'physical-destruction-vs-data-wiping',
  // free-vs-pro-eraser (no absorbed FAQs to merge)
  // pii-disposal-breach <- caption-call-fcc-settlement
  'caption-call-fcc-settlement': 'pii-disposal-breach',
  // itad-market-growth <- reseller-profits
  'reseller-profits': 'itad-market-growth',
  // mobile-diagnostics-revolution <- mobile-diagnostics-benefits
  'mobile-diagnostics-benefits': 'mobile-diagnostics-revolution',
  // private-cloud <- cloud-migration
  'cloud-migration': 'private-cloud',
  // common-criteria (no absorbed FAQs to merge - content only)
  // gdpr-article-17-right-to-erasure <- -seven-years (malformed, already handled as gdpr-seven-years)
  // secure-it-asset-disposal <- corporate-it-asset-risks
  'corporate-it-asset-risks': 'secure-it-asset-disposal',
  // data-sanitization-compliance <- data-disposal-guidelines
  'data-disposal-guidelines': 'data-sanitization-compliance',
};

// Step 3: Execute merges
let mergedCount = 0;
let deletedKeys = [];

for (const [absorbed, canonical] of Object.entries(mergeMap)) {
  if (!parsedObj[absorbed]) {
    console.log(`  ⏭️  Skip: "${absorbed}" not found in blogFaqs`);
    continue;
  }
  if (!parsedObj[canonical]) {
    console.log(`  ⚠️  Canonical "${canonical}" not found — creating it`);
    parsedObj[canonical] = [];
    keyOrder.push(canonical);
  }

  // Deduplicate by question text
  const existingQuestions = new Set(parsedObj[canonical].map(f => f.question));
  let added = 0;
  for (const faq of parsedObj[absorbed]) {
    if (!existingQuestions.has(faq.question)) {
      parsedObj[canonical].push(faq);
      existingQuestions.add(faq.question);
      added++;
    }
  }

  // Delete absorbed key
  delete parsedObj[absorbed];
  keyOrder = keyOrder.filter(k => k !== absorbed);
  deletedKeys.push(absorbed);
  mergedCount++;
  console.log(`  ✅ Merged "${absorbed}" → "${canonical}" (+${added} unique FAQs)`);
}

// Step 4: Rebuild file
let outLines = [...before];
const keys = keyOrder.filter(k => parsedObj[k]); // only existing keys
for (let j = 0; j < keys.length; j++) {
    const k = keys[j];
    outLines.push(`  "${k}": [`);

    const faqs = parsedObj[k];
    for (let x = 0; x < faqs.length; x++) {
        const item = faqs[x];
        outLines.push(`    {`);
        outLines.push(`      question: ${JSON.stringify(item.question)},`);
        outLines.push(`      answer: ${JSON.stringify(item.answer)}`);
        outLines.push(`    }${x === faqs.length - 1 ? '' : ','}`);
    }
    outLines.push(`  ]${j === keys.length - 1 ? '' : ','}`);
}
outLines.push('};');
outLines.push('');

fs.writeFileSync('src/data/blogFaqs.ts', outLines.join('\n'));

console.log(`\n=== SUMMARY ===`);
console.log(`  Merges executed: ${mergedCount}`);
console.log(`  Keys deleted: ${deletedKeys.length}`);
console.log(`  Remaining keys: ${keys.length}`);
