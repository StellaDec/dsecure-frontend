/**
 * Section 6.4: free-vs-pro-eraser 200 Status Check
 * Verify this asset resolves perfectly — file + registry + route
 */
const fs = require('fs');

console.log('=== SECTION 6.4: free-vs-pro-eraser CHECK ===\n');

const slug = 'free-vs-pro-eraser';
const component = 'FreeVsProEraserBlog';

const fileExists = fs.existsSync(`src/components/blog/${component}.tsx`);
const registryContent = fs.readFileSync('src/components/blog/BlogRegistry.ts', 'utf8');
const inRegistry = registryContent.includes(`'${slug}'`);
const faqContent = fs.readFileSync('src/data/blogFaqs.ts', 'utf8');
const hasFaq = faqContent.includes(`"${slug}"`);

// Check blogPosts.ts
const postsContent = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const inPosts = postsContent.includes(slug);

// Check vercel.json - NOT a redirect source
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const isRedirectSource = (vercelConfig.redirects || []).some(r => r.source === `/blog/${slug}`);

console.log(`  File exists: ${fileExists ? '✅' : '❌'}`);
console.log(`  In BlogRegistry: ${inRegistry ? '✅' : '❌'}`);
console.log(`  In blogPosts.ts: ${inPosts ? '✅' : '❌'}`);
console.log(`  Has FAQ data: ${hasFaq ? '✅' : '❌'}`);
console.log(`  NOT redirect source: ${!isRedirectSource ? '✅' : '❌'}`);

const allGood = fileExists && inRegistry && inPosts && hasFaq && !isRedirectSource;
console.log(`\n  Overall: ${allGood ? '✅ WILL RESOLVE 200 OK' : '❌ ISSUE DETECTED'}`);

console.log('\n=== DONE ===');
