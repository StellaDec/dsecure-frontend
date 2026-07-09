const fs = require('fs');
const path = require('path');

const redirectMap = {
  'mac-m1-erasure-known-issues': 'm1-mac-erasure-issues',
  'msp-erasure-as-a-service': 'msp-data-erasure',
  'msp-erasure-service': 'msp-data-erasure',
  'data-deletion-myths': 'data-erasure-myths',
  'deleted-files-truth': 'data-erasure-myths',
  'deletion-vs-erasure': 'data-erasure-myths',
  'future-data-destruction': 'future-of-data-destruction',
  'shadow-data-risks': 'shadow-data',
  'data-hoarding-risks': 'data-hoarding',
  'legal-ethical-data-erasure': 'legal-ethical-erasure',
  'cryptographic-erase-nist': 'cryptographic-erase',
  'secure-phi-erasure': 'phi-erasure',
  'secure-phi-ephi-erasure': 'phi-erasure',
  'morgan-stanley-fine': 'morgan-stanley-data-breach',
  'caption-call-settlement': 'caption-call-fcc-settlement',
  'common-criteria-certified-data-wiping': 'common-criteria',
  'dell-data-wipe-vs-dsecure': 'dell-data-wipe-alternative',
  'esg-report': 'esg-data-erasure',
  'brand-reputation-esg': 'esg-data-erasure',
  'statutory-regulatory-compliance-data-erasure': 'statutory-compliance',
  'ncua-third-party-data-disposal': 'ncua-guidelines',
  'data-destruction-best-practices': 'erasure-best-practices',
  'government-device-theft-case-study': 'government-device-theft',
  'gov-device-theft': 'government-device-theft',
  '/support/manual/installation-guide': '/support/manual/installation',
  'erasure-vs-destruction': 'physical-destruction-vs-data-wiping',
  'dod-vs-ieee-data-sanitization': 'dod-vs-ieee',
  'wipe-ssd-from-bios-guide': 'ssd-wipe-bios'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [losing, canonical] of Object.entries(redirectMap)) {
    // Replace slugs with bounds. This prevents matching partial slugs.
    // E.g., "/blog/losing" or href="losing"
    const regex1 = new RegExp(`(['"\`/])${losing}(['"\`/?#])`, 'g');
    const regex2 = new RegExp(`(['"\`/])${losing}$`, 'gm'); // End of line matches

    if (regex1.test(content) || regex2.test(content)) {
      content = content.replace(regex1, `$1${canonical}$2`);
      content = content.replace(regex2, `$1${canonical}`);
      changed = true;
      console.log(`Replaced ${losing} -> ${canonical} in ${filePath}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.html') || filePath.endsWith('.json')) {
      processFile(filePath);
    }
  }
}

const targetDir = path.join(__dirname, '..', 'src');
console.log('Scanning ' + targetDir + ' for losing slugs...');
walkSync(targetDir);
console.log('Link cleanup complete.');
