const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const merges = [
  { loser: 'mac-m1-erasure-known-issues', winner: 'm1-mac-erasure-issues' },
  { loser: 'msp-erasure-as-a-service', winner: 'msp-data-erasure' },
  { loser: 'msp-erasure-service', winner: 'msp-data-erasure' },
  { loser: 'data-deletion-myths', winner: 'data-erasure-myths' },
  { loser: 'deleted-files-truth', winner: 'data-erasure-myths' },
  { loser: 'deletion-vs-erasure', winner: 'data-erasure-myths' },
  { loser: 'future-data-destruction', winner: 'future-of-data-destruction' },
  { loser: 'shadow-data-risks', winner: 'shadow-data' },
  { loser: 'data-hoarding-risks', winner: 'data-hoarding' },
  { loser: 'legal-ethical-data-erasure', winner: 'legal-ethical-erasure' },
  { loser: 'cryptographic-erase-nist', winner: 'cryptographic-erase' },
  { loser: 'secure-phi-erasure', winner: 'phi-erasure' },
  { loser: 'secure-phi-ephi-erasure', winner: 'phi-erasure' },
  { loser: 'morgan-stanley-fine', winner: 'morgan-stanley-data-breach' },
  { loser: 'caption-call-settlement', winner: 'caption-call-fcc-settlement' },
  { loser: 'common-criteria-certified-data-wiping', winner: 'common-criteria' },
  { loser: 'dell-data-wipe-vs-dsecure', winner: 'dell-data-wipe-alternative' },
  { loser: 'esg-report', winner: 'esg-data-erasure' },
  { loser: 'brand-reputation-esg', winner: 'esg-data-erasure' },
  { loser: 'statutory-regulatory-compliance-data-erasure', winner: 'statutory-compliance' },
  { loser: 'ncua-third-party-data-disposal', winner: 'ncua-guidelines' },
  { loser: 'data-destruction-best-practices', winner: 'erasure-best-practices' },
  { loser: 'government-device-theft-case-study', winner: 'government-device-theft' },
  { loser: 'gov-device-theft', winner: 'government-device-theft' },
  { loser: 'erasure-vs-destruction', winner: 'physical-destruction-vs-data-wiping' },
  { loser: 'dod-vs-ieee-data-sanitization', winner: 'dod-vs-ieee' },
  { loser: 'wipe-ssd-from-bios-guide', winner: 'ssd-wipe-bios' },
];

const manualMerges = [
  { loser: 'installation-guide', winner: 'installation' },
  { loser: 'dod-vs-ieee-data-sanitization', winner: 'dod-vs-ieee' }, // also handle here for completeness if needed elsewhere
]

// 1. Clean BlogRoutes.tsx
const blogRoutesPath = path.join(projectRoot, 'src', 'routes', 'BlogRoutes.tsx');
let blogRoutes = fs.readFileSync(blogRoutesPath, 'utf8');
const componentsToDelete = [];
for (const merge of merges) {
  const loser = merge.loser;
  const routeRegex = new RegExp(`<Route[^>]*path="blog/${loser}"[^>]*element={<([a-zA-Z0-9_]+)[^>]*>}[^>]*/>`, 'g');
  let match;
  while ((match = routeRegex.exec(blogRoutes)) !== null) {
    const componentName = match[1];
    componentsToDelete.push(componentName);
    console.log(`Found component for blog/${loser}: ${componentName}`);
    
    // Remove the route line
    const lineRegex = new RegExp(`^[ \\t]*<Route[^>]*path="blog/${loser}".*\\r?\\n?`, 'gm');
    blogRoutes = blogRoutes.replace(lineRegex, '');
    
    // Remove the import line
    const importRegex = new RegExp(`^[ \\t]*const ${componentName} = lazy\\(\\(.*\\r?\\n?`, 'gm');
    blogRoutes = blogRoutes.replace(importRegex, '');
  }
}
fs.writeFileSync(blogRoutesPath, blogRoutes);

// 2. Delete components
for (const comp of componentsToDelete) {
  const compPath = path.join(projectRoot, 'src', 'components', 'blog', `${comp}.tsx`);
  if (fs.existsSync(compPath)) {
    fs.unlinkSync(compPath);
    console.log(`Deleted ${compPath}`);
  }
}

// 3. Clean SupportRoutes.tsx and its components
const supportRoutesPath = path.join(projectRoot, 'src', 'routes', 'SupportRoutes.tsx');
if (fs.existsSync(supportRoutesPath)) {
  let supportRoutes = fs.readFileSync(supportRoutesPath, 'utf8');
  for (const merge of manualMerges) {
    const loser = merge.loser;
    const routeRegex = new RegExp(`<Route[^>]*path="manual/${loser}"[^>]*element={<([a-zA-Z0-9_]+)[^>]*>}[^>]*/>`, 'g');
    let match;
    while ((match = routeRegex.exec(supportRoutes)) !== null) {
      const componentName = match[1];
      console.log(`Found component for manual/${loser}: ${componentName}`);
      
      const lineRegex = new RegExp(`^[ \\t]*<Route[^>]*path="manual/${loser}".*\\r?\\n?`, 'gm');
      supportRoutes = supportRoutes.replace(lineRegex, '');
      
      const importRegex = new RegExp(`^[ \\t]*const ${componentName} = lazy\\(\\(.*\\r?\\n?`, 'gm');
      supportRoutes = supportRoutes.replace(importRegex, '');
      
      const compPath = path.join(projectRoot, 'src', 'components', 'support', 'manual', `${componentName}.tsx`);
      if (fs.existsSync(compPath)) {
        fs.unlinkSync(compPath);
        console.log(`Deleted ${compPath}`);
      }
    }
  }
  fs.writeFileSync(supportRoutesPath, supportRoutes);
}

// 4. Update blogPosts.ts
const blogPostsPath = path.join(projectRoot, 'src', 'data', 'blogPosts.ts');
if (fs.existsSync(blogPostsPath)) {
  let blogPostsStr = fs.readFileSync(blogPostsPath, 'utf8');
  for (const merge of merges) {
    const loser = merge.loser;
    let idx = blogPostsStr.indexOf(`slug: "${loser}"`);
    if (idx === -1) idx = blogPostsStr.indexOf(`slug: '${loser}'`);
    
    while (idx !== -1) {
       let start = blogPostsStr.lastIndexOf('{', idx);
       let end = blogPostsStr.indexOf('},', idx);
       
       if (start !== -1 && end !== -1) {
         // handle the comma and whitespace before { if needed, but easier to just cut
         let realStart = start;
         // Try to find if there are spaces/newlines before {
         let beforeStart = blogPostsStr.substring(0, start);
         let matchSpace = beforeStart.match(/(\\s*,?\\s*)$/);
         if (matchSpace) {
           realStart -= matchSpace[1].length;
         }
         blogPostsStr = blogPostsStr.substring(0, start) + blogPostsStr.substring(end + 2);
         // if there is a trailing comma leftover we can clean it later
         console.log(`Removed ${loser} from blogPosts.ts`);
       }
       
       idx = blogPostsStr.indexOf(`slug: "${loser}"`);
       if (idx === -1) idx = blogPostsStr.indexOf(`slug: '${loser}'`);
    }
  }
  // Remove empty objects or trailing commas if any artifact left: e.g. [, { -> [ {
  blogPostsStr = blogPostsStr.replace(/,\\s*,/g, ',');
  fs.writeFileSync(blogPostsPath, blogPostsStr);
}

// 5. Update sitemap.xml
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const merge of merges) {
    const loser = merge.loser;
    const urlBlockRegex = new RegExp(`[ \\t]*<url>\\s*<loc>[^<]*/blog/${loser}</loc>[\\s\\S]*?</url>\\r?\\n?`, 'g');
    if (urlBlockRegex.test(sitemap)) {
      sitemap = sitemap.replace(urlBlockRegex, '');
      console.log(`Removed /blog/${loser} from sitemap.xml`);
    }
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

// 6. Update vercel.json
const vercelPath = path.join(projectRoot, 'vercel.json');
if (fs.existsSync(vercelPath)) {
  let vercelData = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  if (!vercelData.redirects) {
    vercelData.redirects = [];
  }
  
  // Track existing redirects to avoid duplicates
  const existingRedirects = new Set(vercelData.redirects.map(r => r.source));

  for (const merge of merges) {
    const source = `/blog/${merge.loser}`;
    if (!existingRedirects.has(source)) {
      vercelData.redirects.push({
        source,
        destination: `/blog/${merge.winner}`,
        permanent: true
      });
      existingRedirects.add(source);
    }
  }
  
  for (const merge of manualMerges) {
    let source;
    if (merge.loser === 'installation-guide') {
      source = `/support/manual/${merge.loser}`;
      if (!existingRedirects.has(source)) {
        vercelData.redirects.push({
          source,
          destination: `/support/manual/${merge.winner}`,
          permanent: true
        });
        existingRedirects.add(source);
      }
    } else if (merge.loser === 'dod-vs-ieee-data-sanitization') {
      source = `/blog/${merge.loser}`; // handled above
    }
  }
  fs.writeFileSync(vercelPath, JSON.stringify(vercelData, null, 2));
}

console.log('Cleanup script finished.');
