import fs from 'fs';
import { marked } from 'marked';

async function updateBlog() {
    const mdContent = fs.readFileSync('NIST_800-88_Rev_2_vs_IEEE_2883_SEO_Guide.md', 'utf-8');
    
    // Extract metadata manually
    const title = "NIST SP 800-88 Rev. 2 vs IEEE 2883-2022: What Data Sanitization Teams Need to Know";
    const excerpt = "Understand NIST SP 800-88 Rev. 2 vs IEEE 2883-2022, including Clear, Purge, Destroy, verification, validation and media selection.";
    const keywords = "NIST SP 800-88 Rev. 2 vs IEEE 2883, NIST 800-88 Rev. 2, IEEE 2883-2022, NIST media sanitization guidelines, Clear Purge Destroy, data sanitization standards, SSD data sanitization, NVMe secure erase";
    
    // Extract the actual blog body
    const bodyStartIndex = mdContent.indexOf('# NIST SP 800-88 Rev.');
    if (bodyStartIndex === -1) {
        console.error("Could not find the start of the blog content");
        process.exit(1);
    }
    
    let bodyMarkdown = mdContent.substring(bodyStartIndex);
    
    // Strip out the SEO schema and everything else starting from the CTA section
    const schemaIndex = bodyMarkdown.indexOf('# Recommended CTA Section');
    if (schemaIndex !== -1) {
        bodyMarkdown = bodyMarkdown.substring(0, schemaIndex);
    }
    
    const htmlContent = marked.parse(bodyMarkdown);
    
    // Escape quotes, backticks, and template literal dollars for inclusion in TS file
    const escapedHtml = htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    const blogFile = 'src/data/blogPosts.ts';
    let blogContent = fs.readFileSync(blogFile, 'utf-8');

    // Find the NIST vs IEEE blog block
    const idRegex = /id:\s*"nist-vs-ieee",[\s\S]*?(?=\n\s*{|\n\];)/;
    
    const match = blogContent.match(idRegex);
    if (!match) {
        console.error("Could not find nist-vs-ieee block");
        process.exit(1);
    }

    const newBlock = `id: "nist-vs-ieee",
    slug: "nist-vs-ieee",
    title: "${title}",
    excerpt: "${excerpt}",
    link: "/blog/nist-vs-ieee",
    author: "D-Secure Data Sanitization Team",
    publishDate: "August 04, 2026",
    keywords: "${keywords}",
    tag: "Data Sanitization Standards",
    content: \`${escapedHtml}\`,
    readTime: "12 min read"
  },`;

    const newBlogContent = blogContent.replace(idRegex, newBlock);
    
    fs.writeFileSync(blogFile, newBlogContent);
    console.log("Successfully updated the nist-vs-ieee blog post with clean content");
}

updateBlog().catch(console.error);
