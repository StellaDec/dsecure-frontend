const fs = require('fs');

const triageLines = fs.readFileSync('PHASE-2.5-TRIAGE-AUDIT.md', 'utf-8').split('\n');
let inTable = false;
const pruneMap = {};

for (let line of triageLines) {
  if (line.includes('| Words | Slug | → 301 Target |')) {
    inTable = true;
    continue;
  }
  if (inTable && line.startsWith('|---')) continue;
  if (inTable && line.startsWith('### 2b')) break;
  
  if (inTable && line.startsWith('|')) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 4) {
      let slug = parts[2].replace(/\*|\\/g, '').split(' ')[0].trim();
      let target = parts[3].replace(/\*|\\/g, '').split(' ')[0].trim();
      
      if (slug && slug !== 'Slug' && slug !== '---') {
        if (!target.startsWith('/')) {
            target = '/blog/' + target;
        }
        pruneMap['/blog/' + slug] = target;
      }
    }
  }
}

// Special cases
pruneMap['/blog/future-of-data-destruction'] = '/blog/end-of-life-data-security';
pruneMap['/blog/-seven-years'] = '/blog/gdpr-article-17-right-to-erasure';
pruneMap['/blog/gdpr-seven-years'] = '/blog/gdpr-article-17-right-to-erasure';

const v = JSON.parse(fs.readFileSync('vercel.json'));
const redirects = v.redirects || [];

// Map to track all our redirects
const newRedirects = [];

// Process existing redirects
for (let r of redirects) {
  let finalDest = r.destination;
  if (pruneMap[r.destination]) {
    finalDest = pruneMap[r.destination];
  }
  newRedirects.push({
    source: r.source,
    destination: finalDest,
    permanent: r.permanent
  });
}

// Add the new prune redirects
for (let [source, dest] of Object.entries(pruneMap)) {
  // ensure we don't add duplicate sources
  if (!newRedirects.find(r => r.source === source)) {
    newRedirects.push({
      source: source,
      destination: dest,
      permanent: true
    });
  }
}

v.redirects = newRedirects;
fs.writeFileSync('vercel.json', JSON.stringify(v, null, 2) + '\n');
console.log('Updated vercel.json with ' + newRedirects.length + ' total redirects');
