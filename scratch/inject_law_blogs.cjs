const fs = require('fs');
const path = require('path');

// Run this in the project root
const lawsDataPath = path.join(__dirname, '../src/data/internationalLawsData.ts');
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const lawsContentPath = path.join(__dirname, '../src/data/lawsContent.ts');

const lawsDataContent = fs.readFileSync(lawsDataPath, 'utf8');

// We need to parse internationalLaws from internationalLawsData.ts
// It's a TS file, so let's extract it with regex or eval
let internationalLaws = [];
try {
    // A simple regex approach to grab id, name, fullName, etc. is risky.
    // Let's use TS-Node to evaluate it or just parse the blocks.
    const blockRegex = /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?fullName:\s*['"]([^'"]+)['"][\s\S]*?learnMoreUrl:\s*['"]\/blog\/([^'"]+)['"][\s\S]*?}/g;
    let match;
    while ((match = blockRegex.exec(lawsDataContent)) !== null) {
        internationalLaws.push({
            id: match[1],
            name: match[2],
            fullName: match[3],
            slug: match[4]
        });
    }
} catch (e) {
    console.error(e);
}

// Read blogPosts.ts
let blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');

let newBlogsString = "";

for (const law of internationalLaws) {
    const { slug, name, fullName } = law;
    // Check if it already exists in blogPosts.ts
    if (blogPostsContent.includes(`slug: "${slug}"`) || blogPostsContent.includes(`slug: '${slug}'`)) {
        console.log(`Skipping ${slug}, already exists.`);
        continue;
    }

    // Generate the BlogPost object
    const newBlog = `
  {
    id: "${slug}",
    slug: "${slug}",
    title: "${fullName} Compliance Guide",
    excerpt: "Everything you need to know about ${name} compliance, data security requirements, and secure data disposal.",
    link: "/blog/${slug}",
    tag: "Compliance",
    category: "Compliance",
    keywords: "${name} compliance, ${fullName} data protection, secure data erasure, privacy laws, data destruction requirements",
    publishDate: "August 13, 2026",
    author: "D-Secure Editorial Team",
    readTime: "8 min read"
  }`;
    newBlogsString += newBlog + ",";
}

if (newBlogsString) {
    // Insert into blogPosts.ts right before the closing bracket of _blogPosts or blogPosts array
    // Find the end of the array. The array is usually `export const blogPosts: BlogPost[] = [ ... ];`
    // or `const _blogPosts: BlogPost[] = [ ... ];`
    
    // We can replace the last `];` or `]\n;` with our new blogs + `];`
    // Find the last index of `];`
    const lastBracketIndex = blogPostsContent.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        const before = blogPostsContent.substring(0, lastBracketIndex);
        const after = blogPostsContent.substring(lastBracketIndex);
        blogPostsContent = before + (before.endsWith(',') ? '' : ',') + newBlogsString + '\n' + after;
        fs.writeFileSync(blogPostsPath, blogPostsContent, 'utf8');
        console.log("Injected new compliance blogs!");
    } else {
        console.log("Could not find end of blogPosts array.");
    }
} else {
    console.log("No new blogs to inject.");
}
