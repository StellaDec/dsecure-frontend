const fs = require('fs');
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Build a map of source -> destination
const redirectMap = new Map();
vercel.redirects.forEach(r => {
  if (r.source && r.destination && r.source.startsWith('/blog/') && r.destination.startsWith('/blog/')) {
    redirectMap.set(r.source, r.destination);
  }
});

let updatedCount = 0;
// Resolve chains
vercel.redirects.forEach(r => {
  if (r.source && r.destination && r.source.startsWith('/blog/') && r.destination.startsWith('/blog/')) {
    let currentDest = r.destination;
    let chainLength = 0;
    while (redirectMap.has(currentDest) && chainLength < 10) {
      currentDest = redirectMap.get(currentDest);
      chainLength++;
    }
    if (r.destination !== currentDest) {
      console.log(`Flattening: ${r.source} -> ${r.destination} now points to ${currentDest}`);
      r.destination = currentDest;
      updatedCount++;
    }
  }
});

// Add the new soft-404 redirect the user mentioned: /blog/future-of-data-destruction -> /blog/end-of-life-data-security
const hasFuture = vercel.redirects.find(r => r.source === '/blog/future-of-data-destruction');
if (!hasFuture) {
    vercel.redirects.push({
        source: '/blog/future-of-data-destruction',
        destination: '/blog/end-of-life-data-security',
        permanent: true
    });
    console.log("Added new redirect for future-of-data-destruction -> end-of-life-data-security");
}

fs.writeFileSync('vercel.json', JSON.stringify(vercel, null, 2));
console.log(`Flattened ${updatedCount} redirects.`);
