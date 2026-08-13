const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const registryPath = path.join(__dirname, '../src/components/blog/BlogRegistry.ts');
const lawsContentPath = path.join(__dirname, '../src/data/lawsContent.ts');

const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');
const registryContent = fs.readFileSync(registryPath, 'utf8');
const lawsContentSource = fs.readFileSync(lawsContentPath, 'utf8');

// Get all slugs from blogPosts.ts
const slugRegex = /slug:\s*["']([^"']+)["']/g;
const allSlugs = [];
let match;
while ((match = slugRegex.exec(blogPostsContent)) !== null) {
    allSlugs.push(match[1]);
}

// Get all keys from lawsContent.ts
// Just grab the keys of the exported object manually
const lawsContentMatch = lawsContentSource.match(/export const lawsContent: Record<string, LawContent> = (\{[\s\S]+\});/);
let lawsContentKeys = [];
if (lawsContentMatch) {
    try {
        const fakeParse = new Function(`return ${lawsContentMatch[1]}`);
        lawsContentKeys = Object.keys(fakeParse());
    } catch (e) {
        console.error("Failed to parse lawsContent statically", e);
    }
}

const trulyEmptySlugs = [];
for (const slug of allSlugs) {
    // 1. Check if it is in BlogRegistry (using a simple include check)
    // BlogRegistry has something like: 'slug-name': () => import(...)
    const inRegistry = registryContent.includes(`'${slug}'`) || registryContent.includes(`"${slug}"`);
    
    // 2. Check if it is in lawsContent
    const inLawsContent = lawsContentKeys.includes(slug);
    
    // 3. Check if it has 'content:' in blogPosts.ts
    // We can extract the block for this slug
    const blockStartRegex = new RegExp(`{\\s*id:\\s*["']${slug}["'][\\s\\S]*?}`, 'g');
    const blockMatch = blockStartRegex.exec(blogPostsContent);
    const hasContentProp = blockMatch && blockMatch[0].includes('content:');
    
    if (!inRegistry && !inLawsContent && !hasContentProp) {
        trulyEmptySlugs.push(slug);
    }
}

console.log("Truly empty slugs to remove:", trulyEmptySlugs);

let updatedContent = blogPostsContent;
for (const slug of trulyEmptySlugs) {
    const blockRegex = new RegExp(`\\s*{\\s*id:\\s*["']${slug}["'][\\s\\S]*?},?`, 'g');
    updatedContent = updatedContent.replace(blockRegex, '');
}

fs.writeFileSync(blogPostsPath, updatedContent, 'utf8');
console.log("Removed truly empty blogs.");
