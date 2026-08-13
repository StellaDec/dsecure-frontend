const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');
const { JSDOM } = jsdom;

const urls = [
  { id: 'glba', url: 'https://www.bitraser.com/article/the-basics-of-gramm-leach-bliley-act-worth-knowing.php', name: 'GLBA' },
  { id: 'hipaa', url: 'https://www.bitraser.com/article/everything-you-need-to-know-to-ensure-compliance-with-the-HIPAA-security-rule.php', name: 'HIPAA' },
  { id: 'uk-dpa', url: 'https://www.bitraser.com/article/uk-data-protection-act-gdpr-explained.php', name: 'UK DPA' },
  { id: 'bdsg', url: 'https://www.bitraser.com/article/decoding-germanys-federal-data-protection-act-bdsg.php', name: 'BDSG' },
  { id: 'pdp-ph', url: 'https://www.bitraser.com/article/philippines-data-privacy-act.php', name: 'Philippines DPA' },
  { id: 'fdpa', url: 'https://www.bitraser.com/article/french-data-protection-act-fdpa-explained.php', name: 'FDPA' },
  { id: 'pdpl-sa', url: 'https://www.bitraser.com/article/pdpl-saudi-arabia-personal-data-protection-law.php', name: 'PDPL SA' },
  { id: 'sox', url: 'https://www.bitraser.com/article/Sarbanes-Oxley-Act-SOX-Compliance-Requirements.php', name: 'SOX' },
  { id: 'appi', url: 'https://www.bitraser.com/article/japan-appi-data-protection-law.php', name: 'APPI' },
  { id: 'pipl', url: 'https://www.bitraser.com/article/understanding-china-personal-information-protection-law-pipl.php', name: 'PIPL' },
  { id: 'fadp', url: 'https://www.bitraser.com/article/understanding-switzerland-federal-act-data-protection-fadp.php', name: 'FADP' },
  { id: 'lgpd', url: 'https://www.bitraser.com/article/lgpd-brazils-personal-data-protection-law.php', name: 'LGPD' },
  { id: 'privacy-act-au', url: 'https://www.bitraser.com/article/privacy-act-1988.php', name: 'Privacy Act AU' },
  { id: 'popia', url: 'https://www.bitraser.com/article/popia-act.php', name: 'POPIA' },
  { id: 'pipeda', url: 'https://www.bitraser.com/article/personal-information-protection-and-electronic-documents-act-pipeda.php', name: 'PIPEDA' },
  { id: 'lfpdppp', url: 'https://www.bitraser.com/article/mexico-data-protection-law-explained.php', name: 'LFPDPPP' },
  { id: 'dpdp', url: 'https://www.bitraser.com/blog/indian-digital-personal-data-protection-bill-2023/', name: 'DPDP' },
  { id: 'us-privacy-act', url: 'https://www.bitraser.com/article/us-privacy-act-1974.php', name: 'US Privacy Act' },
  { id: 'nz-privacy', url: 'https://www.bitraser.com/article/new-zealand-privacy-act-2020.php', name: 'NZ Privacy Act' },
  { id: 'mhmda', url: 'https://www.bitraser.com/article/washington-my-health-my-data-act-mhmda.php', name: 'MHMDA' },
  { id: 'ley-25326', url: 'https://www.bitraser.com/article/ley-25.326-argentina-personal-data-protection-act.php', name: 'Ley 25326' },
  { id: 'tdpsa', url: 'https://www.bitraser.com/article/texas-data-privacy-and-security-act.php', name: 'TDPSA' },
  { id: 'peru-pdp', url: 'https://www.bitraser.com/article/peru-data-protection-law.php', name: 'Peru PDP' },
  { id: 'vcdpa', url: 'https://www.bitraser.com/article/virginia-consumer-data-protection-act.php', name: 'VCDPA' }
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
    .replace(/<img[^>]*>/g, '') // Remove images for simplicity as they might be broken or refer to bitraser domains
    .replace(/<a[^>]*>(.*?)<\/a>/gi, '$1') // Remove links
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<svg[^>]*>.*?<\/svg>/gis, '') // SVGs can have complex attributes, safer to remove
    .replace(/<!--.*?-->/g, ''); 
}

function generateComponentName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '') + 'Blog';
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function scrape() {
  for (const item of urls) {
    try {
      console.log(`Fetching ${item.url}...`);
      const response = await axios.get(item.url);
      const dom = new JSDOM(response.data);
      const doc = dom.window.document;

      // Extract details
      const titleNode = doc.querySelector('h1') || doc.querySelector('title');
      let title = titleNode ? titleNode.textContent.trim() : item.name;
      title = title.replace(/\|.*/, '').trim();

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
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ${componentName}: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHeadNative
          seo={getBlogSEO({
            title: ${JSON.stringify(title)},
            excerpt: ${JSON.stringify(excerpt)},
            slug: "${slug}",
            author: "D-Secure Legal Team",
            publishDate: "January 2026",
            keywords: ${JSON.stringify(keywords)},
            category: "Compliance",
            tag: "Data Privacy Law",
          })}
        />

        <section className="py-16 bg-white shadow-none border-b border-[#d0d5dc]/40">
          <Reveal>
            <div className="text-center px-6 max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1 text-sm font-bold text-[#0e7c66] bg-[#d4ede4] rounded-none mb-6">
                Data Privacy Law
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
                ${title}
              </h1>
              <p className="text-xl text-[#5a6672] leading-relaxed">
                ${excerpt}
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-4xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8" dangerouslySetInnerHTML={{ __html: \`${contentHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
          </Reveal>
        </section>

        <section className="w-full px-4 md:px-8 lg:px-16 py-8">
          <BlogFooterStandard 
            blogId="${slug}" 
            blogTitle=${JSON.stringify(title)} 
            category="Compliance" 
            tag="Data Privacy Law" 
            faqs={[]}
          />
        </section>
      </div>
    );
};

export default ${componentName};
`;

      fs.writeFileSync(path.join(blogComponentsDir, `${componentName}.tsx`), componentCode);

      // Add to blogPosts.ts string
      blogPostsCode += `
  {
    id: '${slug}',
    slug: '${slug}',
    title: ${JSON.stringify(title)},
    excerpt: ${JSON.stringify(excerpt)},
    link: '/blog/${slug}',
    tag: 'Data Privacy Law',
    category: 'Compliance',
    keywords: ${JSON.stringify(keywords)},
    publishDate: 'January 2026',
    author: 'D-Secure Legal Team',
    readTime: '6 min read'
  },`;

      // Add to BlogRegistry.ts string
      blogRegistryCode += `  '${slug}': getBlogComponent('${componentName}'),\n`;

      console.log(`Successfully generated ${componentName}`);

    } catch (err) {
      console.error(`Failed to process ${item.url}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'blog-data-snippet.txt'), blogPostsCode);
  fs.writeFileSync(path.join(__dirname, 'blog-registry-snippet.txt'), blogRegistryCode);
  console.log('Done! Snippets saved to blog-data-snippet.txt and blog-registry-snippet.txt');
}

scrape();
