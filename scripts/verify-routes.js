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

console.log(`\n========================================`);
if (errors === 0) {
  console.log("🎉 ALL VERIFICATION CHECKS PASSED!");
  process.exit(0);
} else {
  console.error(`💥 ${errors} CHECKS FAILED!`);
  process.exit(1);
}
