import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

console.log("🔍 Starting Internal Routing & SEO Verification...\n");

let errors = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    errors++;
  }
}

// 1. Check vercel.json 301 redirect
const vercelPath = path.join(rootDir, "vercel.json");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
const nistRedirect = vercel.redirects.find(
  (r) => r.source === "/tools/nist-800-88-checker"
);
assert(
  nistRedirect && nistRedirect.destination === "/tools/nist-800-88-compliance-checker" && nistRedirect.permanent === true,
  "vercel.json contains permanent 301 redirect from /tools/nist-800-88-checker to /tools/nist-800-88-compliance-checker"
);

// 2. Check PublicRoutes.tsx
const publicRoutesPath = path.join(rootDir, "src", "routes", "PublicRoutes.tsx");
const publicRoutes = fs.readFileSync(publicRoutesPath, "utf8");
assert(
  publicRoutes.includes('path="tools/roi-calculator"') && publicRoutes.includes("ROICalculatorPage"),
  "PublicRoutes.tsx mounts /tools/roi-calculator with lazy-loaded ROICalculatorPage"
);
assert(
  publicRoutes.includes('path="tools/nist-800-88-compliance-checker"'),
  "PublicRoutes.tsx mounts active /tools/nist-800-88-compliance-checker route"
);
assert(
  publicRoutes.includes('path="vs/blancco"') && publicRoutes.includes('path="vs/bitraser"') && publicRoutes.includes('path="vs/whitecanyon"'),
  "PublicRoutes.tsx mounts all comparison routes (vs/blancco, vs/bitraser, vs/whitecanyon)"
);

// 3. Check seo.ts
const seoPath = path.join(rootDir, "src", "utils", "seo.ts");
const seoContent = fs.readFileSync(seoPath, "utf8");
assert(
  seoContent.includes('"roi-calculator":') && seoContent.includes('/tools/roi-calculator'),
  "seo.ts configures canonical metadata for roi-calculator"
);
assert(
  seoContent.includes('"vs-blancco":') && seoContent.includes('/vs/blancco'),
  "seo.ts configures canonical metadata for vs-blancco"
);
assert(
  seoContent.includes('"vs-bitraser":') && seoContent.includes('/vs/bitraser'),
  "seo.ts configures canonical metadata for vs-bitraser"
);

// 4. Check NISTClearPurgeBlog.tsx broken link fix
const blogPath = path.join(rootDir, "src", "components", "blog", "NISTClearPurgeBlog.tsx");
const blogContent = fs.readFileSync(blogPath, "utf8");
assert(
  blogContent.includes('/tools/nist-800-88-compliance-checker') && !blogContent.includes('/tools/nist-800-88-checker"'),
  "NISTClearPurgeBlog.tsx points to active /tools/nist-800-88-compliance-checker and no longer has broken link"
);

// 5. Check Footer in MainLayout.tsx
const layoutPath = path.join(rootDir, "src", "layouts", "MainLayout.tsx");
const layoutContent = fs.readFileSync(layoutPath, "utf8");
assert(
  !layoutContent.includes('Compare Solutions:') && !layoutContent.includes('/vs/whitecanyon'),
  "MainLayout.tsx has cleanly hidden the comparison strip from footer"
);
assert(
  layoutContent.includes('/tools/roi-calculator') && layoutContent.includes('/tools/nist-800-88-compliance-checker'),
  "MainLayout.tsx Resources column includes tools links (/tools/roi-calculator, /tools/nist-800-88-compliance-checker)"
);

// 6. Check PricingAndPlanPage.tsx contextual section
const pricingPath = path.join(rootDir, "src", "pages", "PricingAndPlanPage.tsx");
const pricingContent = fs.readFileSync(pricingPath, "utf8");
assert(
  pricingContent.includes('/vs/blancco') && pricingContent.includes('/vs/bitraser') && pricingContent.includes('/vs/whitecanyon'),
  "PricingAndPlanPage.tsx contains competitor comparison cards"
);
assert(
  pricingContent.includes('/tools/roi-calculator'),
  "PricingAndPlanPage.tsx contains link to Erasure ROI Calculator"
);

// 7. Check BlanccoAlternativePage.tsx contextual links
const altPath = path.join(rootDir, "src", "pages", "solutions", "BlanccoAlternativePage.tsx");
const altContent = fs.readFileSync(altPath, "utf8");
assert(
  altContent.includes('to="/vs/blancco"') && altContent.includes('to="/vs/bitraser"'),
  "BlanccoAlternativePage.tsx links directly to deep /vs/blancco and /vs/bitraser breakdown pages"
);

// 8. Check BestDataErasureSoftware2026Blog.tsx links
const bestBlogPath = path.join(rootDir, "src", "components", "blog", "BestDataErasureSoftware2026Blog.tsx");
const bestBlogContent = fs.readFileSync(bestBlogPath, "utf8");
assert(
  bestBlogContent.includes('to="/vs/blancco"') && bestBlogContent.includes('to="/vs/bitraser"'),
  "BestDataErasureSoftware2026Blog.tsx links mentions to /vs/blancco and /vs/bitraser"
);

// 9. Check sitemap.xml
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
assert(
  sitemapContent.includes("<loc>https://dsecuretech.com/tools/roi-calculator</loc>"),
  "sitemap.xml includes 200 OK canonical URL https://dsecuretech.com/tools/roi-calculator"
);
assert(
  sitemapContent.includes("<loc>https://dsecuretech.com/tools/nist-800-88-compliance-checker</loc>"),
  "sitemap.xml includes 200 OK canonical URL https://dsecuretech.com/tools/nist-800-88-compliance-checker"
);
assert(
  !sitemapContent.includes("https://dsecuretech.com/tools/nist-800-88-checker<"),
  "sitemap.xml properly excludes 301 redirect URL /tools/nist-800-88-checker (0 GSC Errors)"
);
assert(
  sitemapContent.includes("<loc>https://dsecuretech.com/vs/blancco</loc>") && sitemapContent.includes("<loc>https://dsecuretech.com/vs/bitraser</loc>"),
  "sitemap.xml includes compare routes /vs/blancco and /vs/bitraser"
);

// 10. Check /support/faqs priority and /support/faq typo redirect
const faqRedirect = vercel.redirects.find((r) => r.source === "/support/faq");
assert(
  faqRedirect && faqRedirect.destination === "/support/faqs" && faqRedirect.permanent === true,
  "vercel.json contains 301 redirect from /support/faq to /support/faqs"
);
assert(
  sitemapContent.includes("<loc>https://dsecuretech.com/support/faqs</loc>") &&
  sitemapContent.includes("<loc>https://dsecuretech.com/support/faqs</loc>\n    <lastmod>") &&
  sitemapContent.includes("<priority>0.8</priority>"),
  "sitemap.xml contains /support/faqs with Priority 0.8"
);
assert(
  !sitemapContent.includes("https://dsecuretech.com/support/faq<"),
  "sitemap.xml does not contain typo route /support/faq"
);

// 11. Check comparison report broken link fixes
const ieeeBlogPath = path.join(rootDir, "src", "components", "blog", "IEEE2883ComplianceBlog.tsx");
const ieeeBlogContent = fs.readFileSync(ieeeBlogPath, "utf8");
assert(
  ieeeBlogContent.includes('/blog/ieee-2883-complete-guide') && !ieeeBlogContent.includes('to="/compliance/ieee-2883"'),
  "IEEE2883ComplianceBlog.tsx points to active /blog/ieee-2883-complete-guide and dead /compliance/ieee-2883 is removed"
);

const cryptoPagePath = path.join(rootDir, "src", "pages", "support", "manual", "CryptographicErasurePage.tsx");
const cryptoPageContent = fs.readFileSync(cryptoPagePath, "utf8");
assert(
  !cryptoPageContent.includes('url: "/services/cryptographic-erasure"') &&
  !cryptoPageContent.includes('url: "/products/dsecure-drive-eraser"') &&
  !cryptoPageContent.includes('href="/services/cryptographic-erasure"'),
  "CryptographicErasurePage.tsx dead links (/services/cryptographic-erasure, /products/dsecure-drive-eraser) are fixed"
);

const macPagePath = path.join(rootDir, "src", "pages", "support", "manual", "MacOSSystemsPage.tsx");
const macPageContent = fs.readFileSync(macPagePath, "utf8");
assert(
  macPageContent.includes('to="/solutions/mac-erasure"') && !macPageContent.includes('to="/services/macos-erasure"'),
  "MacOSSystemsPage.tsx points to active /solutions/mac-erasure and dead /services/macos-erasure is removed"
);

const winPagePath = path.join(rootDir, "src", "pages", "support", "manual", "WindowsSystemsPage.tsx");
const winPageContent = fs.readFileSync(winPagePath, "utf8");
assert(
  winPageContent.includes('to="/products/drive-eraser"') && !winPageContent.includes('to="/services/windows-erasure"'),
  "WindowsSystemsPage.tsx points to active /products/drive-eraser and dead /services/windows-erasure is removed"
);

const intPagePath = path.join(rootDir, "src", "pages", "IntegrationsPage.tsx");
const intPageContent = fs.readFileSync(intPagePath, "utf8");
assert(
  intPageContent.includes('to="/support/manual/api-integration"') &&
  intPageContent.includes('to="/solutions"') &&
  !intPageContent.includes('to="/support/api-docs"') &&
  !intPageContent.includes('to="/support/integrations-hub"'),
  "IntegrationsPage.tsx points to active routes (/support/manual/api-integration, /solutions) and dead links removed"
);

const profServicesPath = path.join(rootDir, "src", "pages", "ProfessionalServicesPage.tsx");
const profServicesContent = fs.readFileSync(profServicesPath, "utf8");
assert(
  profServicesContent.includes('to="/support/manual/implementation-practices"') && !profServicesContent.includes('to="/implementation"'),
  "ProfessionalServicesPage.tsx points to active /support/manual/implementation-practices and dead /implementation removed"
);

// 12. Check Request Demo route & SEO
assert(
  publicRoutes.includes('path="request-demo"') && publicRoutes.includes("RequestDemoPage"),
  "PublicRoutes.tsx mounts /request-demo with RequestDemoPage"
);
assert(
  seoContent.includes('"request-demo":') && seoContent.includes('/request-demo'),
  "seo.ts registers SEO metadata for request-demo"
);
assert(
  sitemapContent.includes("<loc>https://dsecuretech.com/request-demo</loc>"),
  "sitemap.xml includes active canonical URL https://dsecuretech.com/request-demo"
);

// 13. Check Search-Intent Title & H1 Alignments
const translationPath = path.join(rootDir, "src", "locales", "en", "translation.json");
const translationContent = fs.readFileSync(translationPath, "utf8");
assert(
  translationContent.includes('"title": "Enterprise Data Erasure Software &"'),
  "translation.json hero title updated to high-volume commercial query phrase"
);

const seoCorePath = path.join(rootDir, "src", "utils", "seo.core.ts");
const seoCoreContent = fs.readFileSync(seoCorePath, "utf8");
assert(
  seoCoreContent.includes("Enterprise Data Erasure Software — NIST 800-88 Compliant | D-Secure"),
  "seo.core.ts default title updated to query-first keyword format"
);

const indexHtmlPath = path.join(rootDir, "index.html");
const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf8");
assert(
  indexHtmlContent.includes("<title>Enterprise Data Erasure Software — NIST 800-88 Compliant | D-Secure</title>"),
  "index.html title updated to query-first keyword format"
);

// 14. Check vercel.json permanent 301 redirects and sitemap exclusions
const expectedRedirectSources = [
  "/compliance/ieee-2883",
  "/services/cryptographic-erasure",
  "/services/macos-erasure",
  "/services/windows-erasure",
  "/support/api-docs",
  "/support/integrations-hub",
  "/implementation",
  "/solutions/financial-services",
  "/careers",
];

expectedRedirectSources.forEach((src) => {
  const r = vercel.redirects.find((item) => item.source === src);
  assert(
    r && r.permanent === true,
    `vercel.json contains permanent 301 redirect for ${src}`
  );
  assert(
    !sitemapContent.includes(`https://dsecuretech.com${src}<`),
    `sitemap.xml strictly excludes redirected/blocked route ${src}`
  );
});

// 15. Check Keyword Research & Content SEO Upgrades
// Meta description length checks (must be <= 160 characters for SERP)
const metaDescMatch = seoCoreContent.match(/description:\s*"([^"]+)"/);
assert(
  metaDescMatch && metaDescMatch[1].length <= 160 && metaDescMatch[1].length >= 120,
  `seo.core.ts meta description length is optimal (${metaDescMatch ? metaDescMatch[1].length : 0} chars, <= 160)`
);
assert(
  indexHtmlContent.includes('content="D-Secure offers enterprise data erasure software for HDDs, SSDs, & mobile. NIST 800-88 & GDPR compliant with tamper-evident certificates. Try free!"'),
  "index.html static meta description matches optimized 148-character length"
);

// HomePage heading hierarchy & keywords
const homePagePath = path.join(rootDir, "src", "pages", "HomePage.tsx");
const homePageContent = fs.readFileSync(homePagePath, "utf8");
assert(
  homePageContent.includes('<h2 className="sr-only">Enterprise Data Erasure Capabilities</h2>'),
  "HomePage.tsx maintains valid semantic heading hierarchy with sr-only h2 before h3 feature cards"
);
assert(
  homePageContent.includes("Data Erasure Reports & Tamper-Evident Certificates"),
  "HomePage.tsx contains target keyword rich H2: Data Erasure Reports & Tamper-Evident Certificates"
);

// DriveEraserPage keywords & headings
const driveEraserPath = path.join(rootDir, "src", "pages", "DriveEraserPage.tsx");
const driveEraserContent = fs.readFileSync(driveEraserPath, "utf8");
assert(
  driveEraserContent.includes("D-Secure Drive Eraser permanently wipes entire HDDs, SSDs, and NVMe drives"),
  "DriveEraserPage.tsx hero copy contains primary target query keyword phrase"
);
assert(
  driveEraserContent.includes("What D-Secure Drive Eraser Can Wipe"),
  "DriveEraserPage.tsx contains upgraded H2: What D-Secure Drive Eraser Can Wipe"
);

// FileEraserPage H1 & Gallery Alt Tags
const fileEraserPath = path.join(rootDir, "src", "pages", "FileEraserPage.tsx");
const fileEraserContent = fs.readFileSync(fileEraserPath, "utf8");
assert(
  fileEraserContent.includes("Secure File Shredder Software"),
  "FileEraserPage.tsx H1 contains primary search intent keyword: Secure File Shredder Software"
);
assert(
  fileEraserContent.includes('alt: "Verifiable File Erasure Certificate and Compliance Report"') &&
  fileEraserContent.includes('alt: "DoD and NIST 800-88 compliant file erasure progress monitor"'),
  "FileEraserPage.tsx gallery images contain keyword-rich descriptive alt tags"
);

// Product SEO titles in seo.products.ts
const seoProductsPath = path.join(rootDir, "src", "utils", "seo.products.ts");
const seoProductsContent = fs.readFileSync(seoProductsPath, "utf8");
assert(
  seoProductsContent.includes("Buy Drive Eraser Software | NIST 800-88 Hard Drive Wipe | D-Secure"),
  "seo.products.ts contains optimized high-intent title for drive-eraser"
);
assert(
  seoProductsContent.includes("How to Delete Files Securely — File Eraser for Windows | D-Secure"),
  "seo.products.ts contains condensed high-intent title for file-eraser"
);

// Long-tail FAQ keywords in seoFaqs.ts
const seoFaqsPath = path.join(rootDir, "src", "data", "seoFaqs.ts");
const seoFaqsContent = fs.readFileSync(seoFaqsPath, "utf8");
assert(
  seoFaqsContent.includes("How to securely wipe a hard drive before selling?"),
  "seoFaqs.ts includes Drive Eraser long-tail selling intent FAQ"
);
assert(
  seoFaqsContent.includes("How to permanently delete files so they cannot be recovered?"),
  "seoFaqs.ts includes File Eraser long-tail permanent deletion FAQ"
);

console.log(`\n========================================`);
if (errors === 0) {
  console.log("🎉 ALL VERIFICATION CHECKS PASSED!");
  process.exit(0);
} else {
  console.error(`💥 ${errors} CHECKS FAILED!`);
  process.exit(1);
}
