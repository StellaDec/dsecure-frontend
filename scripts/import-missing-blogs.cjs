const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');
const { JSDOM } = jsdom;

const missingUrls = [
  { id: 'gdpr', url: 'https://www.bitraser.com/article/everything-you-need-to-know-to-ensure-GDPR-EU-Compliance.php', name: 'GDPR' },
  { id: 'nypa', url: 'https://www.bitraser.com/article/new-york-data-privacy-law.php', name: 'NYPA' },
  { id: 'ccpa', url: 'https://www.bitraser.com/article/deciphered-the-basics-of-CCPA.php', name: 'CCPA' }
];

const blogComponentsDir = path.join(__dirname, '..', 'src', 'components', 'blog');
let blogPostsCode = '';
let blogRegistryCode = '';

// Clean up function to convert HTML to JSX compatible strings and remove BitRaser references
function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/BitRaser/gi, 'D-Secure')
    .replace(/Stellar Data Recovery/gi, 'D-Secure')
    .replace(/Stellar/gi, 'D-Secure')
    .replace(/<img[^>]*src="[^"]*(logo|logo-header|header-logo)[^"]*"[^>]*>/gi, '')
    // Strip trailing script tags and external links
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '')
    // Remove iframes (often used for forms or youtube)
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Replace internal links to point to our own domain (rough approximation)
    .replace(/href="https:\/\/www\.bitraser\.com\/([^"]*)"/g, 'href="/$1"')
    // Handle specific components or stylings that break React
    .replace(/style="([^"]*)"/g, (match, p1) => {
      // In a real app we'd convert inline CSS to React style objects, but for now we'll strip them or wrap them
      return '';
    })
    // Remove unnecessary comments
    .replace(/<!--[\s\S]*?-->/g, '');
}

function generateComponentName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '') + 'Blog';
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function scrapeMissing() {
  if (!fs.existsSync(blogComponentsDir)) {
    fs.mkdirSync(blogComponentsDir, { recursive: true });
  }

  for (const item of missingUrls) {
    try {
      console.log(`Fetching ${item.url}...`);
      const response = await axios.get(item.url);
      const dom = new JSDOM(response.data);
      const doc = dom.window.document;

      let title = doc.querySelector('title') ? doc.querySelector('title').textContent : `${item.name} Compliance Guide`;
      title = title.replace(/BitRaser/gi, 'D-Secure');

      const metaDesc = doc.querySelector('meta[name="description"]');
      let excerpt = metaDesc ? metaDesc.getAttribute('content') : `${title} - Learn more about compliance.`;
      
      const metaKeywords = doc.querySelector('meta[name="keywords"]');
      let keywords = metaKeywords ? metaKeywords.getAttribute('content') : 'compliance, data protection';

      let contentHtml = '';
      const articleNode = doc.querySelector('.left_side') || doc.querySelector('article') || doc.querySelector('.blog-content');
      if (articleNode) {
        // Strip out unwanted sections
        const h1 = articleNode.querySelector('h1');
        if (h1) h1.remove();
        
        const authorDetails = articleNode.querySelector('.author_details');
        if (authorDetails) authorDetails.remove();
        
        const photoPanel = articleNode.querySelector('.photo-panel');
        if (photoPanel) photoPanel.remove();
        
        const summary = articleNode.querySelector('.summry');
        if (summary) summary.remove();
        
        const certification = articleNode.querySelector('.certification');
        if (certification) certification.remove();
        
        const mediaFooter = articleNode.querySelector('.media_footer');
        if (mediaFooter) mediaFooter.remove();
        
        // Try to find the main text content, ignoring navs and sidebars
        contentHtml = articleNode.innerHTML;
      }

      contentHtml = cleanHtml(contentHtml);

      const componentName = generateComponentName(item.name);
      const slug = generateSlug(item.name) + '-compliance';

      // Create React component
      const componentCode = `import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { ThemeSection, Reveal } from "@/components/ui/Theme";
import { getBlogSEO } from "@/utils/seo-mapping";

const ${componentName} = () => {
  const seo = getBlogSEO('${slug}');

  return (
    <>
      <SEOHeadNative
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
      />
      <div className="pt-24 bg-[#f8f9fa] min-h-screen">
        <ThemeSection
          title="${title.replace(/"/g, '\\"')}"
          subtitle="Understanding regulatory requirements and ensuring compliance with D-Secure."
          align="center"
          className="pb-0"
        />
        <section className="max-w-[95%] lg:max-w-4xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8" dangerouslySetInnerHTML={{ __html: \`
${contentHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
            \` }} />
          </Reveal>
        </section>
        <BlogFooterStandard />
      </div>
    </>
  );
};

export default ${componentName};
`;

      fs.writeFileSync(path.join(blogComponentsDir, `${componentName}.tsx`), componentCode);
      console.log(`Successfully generated ${componentName}`);

      // Add to registry snippet
      blogRegistryCode += `  '${slug}': getBlogComponent('${componentName}'),\n`;

      // Add to data snippet
      blogPostsCode += `
  {
    id: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    category: "Compliance",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: "5 min read",
    author: "D-Secure Data Privacy Team",
    image: "https://images.unsplash.com/photo-1505664159856-f5605d3bdfdb?auto=format&fit=crop&q=80",
    tags: ["compliance", "regulations", "${item.name}"]
  },`;

    } catch (error) {
      console.error(`Failed to process ${item.url}:`, error.message);
    }
  }

  // Update Data and Registry
  fs.writeFileSync('scripts/missing-blog-data.txt', blogPostsCode);
  fs.writeFileSync('scripts/missing-blog-registry.txt', blogRegistryCode);
  
  console.log('Missing blogs downloaded and snippets generated!');

  // Now append to blogPosts.ts and update BlogRegistry.ts
  const blogPostsFile = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
  let blogPostsContent = fs.readFileSync(blogPostsFile, 'utf8');
  blogPostsContent = blogPostsContent.replace(/];[\s\n]*$/, blogPostsCode + '\n];\n');
  fs.writeFileSync(blogPostsFile, blogPostsContent);
  console.log('Appended to blogPosts.ts');

  // We can manually add to BlogRegistry.ts by searching for the lazy map
  const registryFile = path.join(__dirname, '..', 'src', 'components', 'blog', 'BlogRegistry.ts');
  let registryContent = fs.readFileSync(registryFile, 'utf8');
  registryContent = registryContent.replace(/};\n$/, blogRegistryCode + '};\n');
  fs.writeFileSync(registryFile, registryContent);
  console.log('Appended to BlogRegistry.ts');

  // Update internal URLs in internationalLawsData.ts
  const lawsFile = path.join(__dirname, '..', 'src', 'data', 'internationalLawsData.ts');
  let lawsContent = fs.readFileSync(lawsFile, 'utf8');
  
  const missingSlugMap = {
    'gdpr': 'gdpr-compliance',
    'ccpa': 'ccpa-compliance',
    'nypa': 'nypa-compliance'
  };

  for (const [id, missingSlug] of Object.entries(missingSlugMap)) {
    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?learnMoreUrl:\\s*)'[^']*'`, 'g');
    lawsContent = lawsContent.replace(regex, `$1'/blog/${missingSlug}'`);
  }
  
  fs.writeFileSync(lawsFile, lawsContent, 'utf8');
  console.log('URLs updated in internationalLawsData.ts');

}

scrapeMissing();
