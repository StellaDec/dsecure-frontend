/**
 * Section 6.3: Protected Assets Check
 * Ye 4 assets MUST be live, indexable, and NOT redirect sources
 */
const fs = require('fs');

const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const registryContent = fs.readFileSync('src/components/blog/BlogRegistry.ts', 'utf8');
const faqContent = fs.readFileSync('src/data/blogFaqs.ts', 'utf8');

const protectedAssets = [
  { slug: 'ssd-wipe-bios', component: 'SSDWipeBIOSBlog' },
  { slug: 'nist-clear-purge', component: 'NISTClearPurgeBlog' },
  { slug: 'dod-wiping-standard', component: 'DoDWipingStandardBlog' },
  { slug: 'ieee-2883-2022-data-sanitization', component: 'IEEE2883ComplianceBlog' },
];

console.log('=== SECTION 6.3: PROTECTED ASSETS CHECK ===\n');

const redirectSources = new Set(
  (vercelConfig.redirects || []).map(r => r.source)
);

protectedAssets.forEach(asset => {
  const fileExists = fs.existsSync(`src/components/blog/${asset.component}.tsx`);
  const inRegistry = registryContent.includes(`'${asset.slug}'`);
  const isRedirectSource = redirectSources.has(`/blog/${asset.slug}`);
  const hasFaq = faqContent.includes(`"${asset.slug.replace('ieee-2883-2022-data-sanitization', 'ieee-2883')}"`);
  
  const status = fileExists && inRegistry && !isRedirectSource ? '✅' : '❌';
  console.log(`${status} ${asset.slug}`);
  console.log(`   File: ${fileExists ? '✅' : '❌'} | Registry: ${inRegistry ? '✅' : '❌'} | NOT redirect source: ${!isRedirectSource ? '✅' : '❌'}`);
});

console.log('\n=== DONE ===');
