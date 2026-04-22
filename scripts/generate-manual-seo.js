import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manualDir = path.resolve(__dirname, '../src/pages/support/manual');
const seoFilePath = path.resolve(__dirname, '../src/utils/seo.manual.ts');

/**
 * Format component name to a readable title
 * e.g., "InstallationPage" -> "Installation Guide"
 * e.g., "Nist80088ManualPage" -> "NIST 800-88 Manual"
 */
function formatTitle(fileName) {
  let name = fileName.replace('Page.tsx', '').replace('.tsx', '');
  
  // Handle some common abbreviations
  name = name.replace('Nist', 'NIST');
  name = name.replace('Gdpr', 'GDPR');
  name = name.replace('Hipaa', 'HIPAA');
  name = name.replace('Sox', 'SOX');
  name = name.replace('PciDss', 'PCI DSS');
  name = name.replace('Hdd', 'HDD');
  name = name.replace('Ssd', 'SSD');
  name = name.replace('Vpn', 'VPN');
  name = name.replace('Itad', 'ITAD');
  name = name.replace('Macos', 'macOS');
  
  // Split camel case
  const words = name.replace(/([A-Z])/g, ' $1').trim().split(' ');
  
  // Add "Guide" or "Manual" if not present
  if (!words.includes('Guide') && !words.includes('Manual') && !words.includes('Tutorial')) {
    words.push('Guide');
  }
  
  return words.join(' ');
}

/**
 * Generate a slug from the file name
 * e.g., "InstallationPage.tsx" -> "installation"
 */
function getSlug(fileName) {
  let name = fileName.replace('Page.tsx', '').replace('.tsx', '');
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate a semantic description
 */
function generateDescription(title) {
  return `Comprehensive ${title} for D-Secure data erasure software. Learn step-by-step procedures, compliance requirements, and best practices for enterprise data sanitization.`;
}

function run() {
  if (!fs.existsSync(manualDir)) {
    console.error(`Directory not found: ${manualDir}`);
    return;
  }

  const files = fs.readdirSync(manualDir).filter(f => f.endsWith('.tsx'));
  console.log(`🔍 Found ${files.length} manual pages.`);

  let manualSeoContent = `import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";\n\n`;
  manualSeoContent += `/**\n * AUTOMATED MANUAL SEO REGISTRY\n * This file is managed by scripts/generate-manual-seo.js\n */\n`;
  manualSeoContent += `export const MANUAL_SEO: Record<string, Partial<SEOMetadata>> = {\n`;

  files.forEach(file => {
    const slug = getSlug(file);
    const title = formatTitle(file);
    const desc = generateDescription(title);
    const keywords = title.toLowerCase().split(' ').filter(w => w.length > 3);
    
    manualSeoContent += `  "${slug}": {\n`;
    manualSeoContent += `    title: "${title} | D-Secure Tech Manual",\n`;
    manualSeoContent += `    description: "${desc}",\n`;
    manualSeoContent += `    keywords: generateKeywords([${keywords.map(k => `"${k}"`).join(', ')}, "manual", "guide", "d-secure"]),\n`;
    manualSeoContent += `    canonicalUrl: getCanonicalUrl("/support/manual/${slug}"),\n`;
    manualSeoContent += `    breadcrumbs: [\n`;
    manualSeoContent += `      { name: "Home", item: "/" },\n`;
    manualSeoContent += `      { name: "Support", item: "/support" },\n`;
    manualSeoContent += `      { name: "Manual", item: "/support/help-manual" },\n`;
    manualSeoContent += `      { name: "${title}", item: "/support/manual/${slug}" },\n`;
    manualSeoContent += `    ],\n`;
    manualSeoContent += `  },\n`;
  });

  manualSeoContent += `};\n`;

  fs.writeFileSync(seoFilePath, manualSeoContent);
  console.log(`✅ Updated ${seoFilePath} with ${files.length} entries.`);
}

run();
