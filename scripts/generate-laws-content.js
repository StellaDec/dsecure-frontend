import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lawsDir = path.join(__dirname, '../laws');
const outputFile = path.join(__dirname, '../src/data/lawsContent.ts');

const fileToSlug = {
  "01-gdpr-eu-compliance-guide.md": "everything-you-need-to-know-to-ensure-GDPR-EU-Compliance",
  "02-new-york-privacy-act.md": "new-york-data-privacy-law",
  "03-ccpa-basics.md": "deciphered-the-basics-of-CCPA",
  "04-glba-basics.md": "glba-compliance",
  "05-hipaa-security-rule.md": "hipaa-compliance",
  "06-uk-dpa-gdpr.md": "uk-dpa-compliance",
  "07-germany-bdsg.md": "bdsg-compliance",
  "08-philippines-data-privacy-act.md": "philippines-dpa-compliance",
  "09-french-data-protection-act.md": "fdpa-compliance",
  "10-saudi-arabia-pdpl.md": "pdpl-sa-compliance",
  "11-sox-compliance.md": "sox-compliance",
  "12-japan-appi.md": "appi-compliance",
  "13-china-pipl.md": "pipl-compliance",
  "14-switzerland-fadp.md": "fadp-compliance",
  "15-brazil-lgpd.md": "lgpd-compliance",
  "16-australia-privacy-act-1988.md": "privacy-act-au-compliance",
  "17-south-africa-popia.md": "popia-compliance",
  "18-canada-pipeda.md": "pipeda-compliance",
  "19-mexico-lfpdppp.md": "lfpdppp-compliance",
  "20-india-dpdp-act-2023.md": "dpdp-compliance",
  "21-us-privacy-act-1974.md": "us-privacy-act-compliance",
  "22-new-zealand-privacy-act-2020.md": "nz-privacy-act-compliance",
  "23-washington-mhmda.md": "mhmda-compliance",
  "24-argentina-data-protection-law.md": "ley-25326-compliance",
  "25-texas-tdpsa.md": "tdpsa-compliance",
  "26-peru-data-protection-law.md": "peru-pdp-compliance",
  "27-virginia-vcdpa.md": "vcdpa-compliance"
};

const result = {};

const files = fs.readdirSync(lawsDir);

for (const file of files) {
  if (!file.endsWith('.md')) continue;
  
  const slug = fileToSlug[file];
  if (!slug) {
    console.warn(`No slug mapping for ${file}`);
    continue;
  }
  
  const filePath = path.join(lawsDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  
  // Split content and FAQs
  const faqSplit = rawContent.split(/##\s*Frequently Asked Questions/i);
  let mainMarkdown = faqSplit[0];
  let faqMarkdown = faqSplit[1] || "";
  
  // If there is another ## heading after FAQs (like Conclusion), move it to mainMarkdown
  const afterFaqMatch = faqMarkdown.match(/\n##\s+[\s\S]+/);
  if (afterFaqMatch) {
    mainMarkdown += "\n" + afterFaqMatch[0];
    faqMarkdown = faqMarkdown.substring(0, afterFaqMatch.index);
  }
  
  // Remove the top H1 title
  mainMarkdown = mainMarkdown.replace(/^#\s+.*\n+/m, '');
  
  // Convert main markdown to HTML
  const mainHtml = marked.parse(mainMarkdown);
  
  // Parse FAQs
  const faqs = [];
  if (faqMarkdown) {
    // Regex to match **Question** \n Answer OR ### Q: Question \n Answer
    const faqRegex = /(?:\*\*(.+?)\*\*|###\s*(?:Q:\s*)?([^\n]+))\s*\n+([\s\S]+?)(?=(?:\*\*.+?\*\*|###\s*(?:Q:\s*)?[^\n]+)|$)/g;
    let match;
    while ((match = faqRegex.exec(faqMarkdown)) !== null) {
      const question = (match[1] || match[2]).trim();
      const answer = match[3].trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }
  
  result[slug] = {
    content: mainHtml,
    faqs: faqs
  };
}

let fileContent = `// Auto-generated from laws/ MD files\n\n`;
fileContent += `export interface FAQ {\n  question: string;\n  answer: string;\n}\n\n`;
fileContent += `export interface LawContent {\n  content: string;\n  faqs: FAQ[];\n}\n\n`;
fileContent += `export const lawsContent: Record<string, LawContent> = ${JSON.stringify(result, null, 2)};\n`;

fs.writeFileSync(outputFile, fileContent, 'utf-8');
console.log(`Generated lawsContent.ts at ${outputFile}`);
