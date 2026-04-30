import {
  getCanonicalUrl,
  getDefaultSEO,
  SEOMetadata,
  SEO_CONFIG,
  generateKeywords,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQSchema,
} from "./seo.core";

export {
  SEO_CONFIG,
  BASE_KEYWORDS,
  getCanonicalUrl,
  generateKeywords,
  generateOrganizationSchema,
  generateSoftwareProductSchema,
  generateBreadcrumbSchema,
  getDefaultSEO,
  formatStructuredData,
} from "./seo.core";

export type { SEOMetadata } from "./seo.core";

import { INDUSTRY_SEO } from "./seo.industries";
import { SUPPORT_SEO } from "./seo.support";
import { BLOG_SEO } from "./seo.blog";
import { PRODUCT_SEO } from "./seo.products";
import { MANUAL_SEO } from "./seo.manual";

// Saare SEO modules ko ek jagah combine karo
export const PAGE_SEO: Record<string, Partial<SEOMetadata>> = {
  ...INDUSTRY_SEO,
  ...SUPPORT_SEO,
  ...BLOG_SEO,
  ...PRODUCT_SEO,
  ...MANUAL_SEO,
  // Home page SEO
  home: {
    title: "D-Secure | #1 Data Erasure Software | NIST 800-88 Compliant",
    description:
      "D-Secure is #1 data erasure software for NIST 800-88 & GDPR compliance. Securely wipe HDDs, SSDs & mobile devices with tamper-proof audit certificates.",
    canonicalUrl: getCanonicalUrl("/"),
    breadcrumbs: [{ name: "Home", item: "/" }],
    structuredData: [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
    ]
  },
  // Main Pages
  "data-eraser-software": {
    title: "All Products: Enterprise Data Erasure Software | D-Secure",
    description: "Discover D-Secure's NIST-compliant data erasure software — from Drive and File Eraser to Smartphone and LUN Eraser. Complete sanitization for every device.",
    canonicalUrl: getCanonicalUrl("/all-products"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "All Products", item: "/all-products" },
    ],
  },
  about: {
    title: "About D-Secure: Leading Data Sanitization Provider",
    description: "D-Secure is the best data erasure software trusted globally. Secure data sanitization for enterprises, ITADs, and government organizations.",
    canonicalUrl: getCanonicalUrl("/about"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "About", item: "/about" },
    ],
  },
  contact: {
    title: "Contact D-Secure: Data Sanitization Support & Sales",
    description: "Contact D-Secure for enterprise data erasure. Get pricing quotes, technical support, and deployment assistance for NIST 800-88 compliant data sanitization.",
    canonicalUrl: getCanonicalUrl("/contact"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Contact", item: "/contact" },
    ],
  },
  "pricing-and-plan": {
    title: "D-Secure Pricing & Plans | Enterprise Data Erasure",
    description: "View D-Secure pricing and plans for data erasure software. Flexible licensing for Drive Eraser, File Eraser, and Smartphone Eraser with volume discounts.",
    canonicalUrl: getCanonicalUrl("/pricing-and-plan"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Pricing", item: "/pricing-and-plan" },
    ],
  },
  download: {
    title: "Download Data Erasure Software & Trial | D-Secure Tech",
    description: "Download D-Secure data erasure software for HDD, SSD, and mobile devices. Get your 14-day free trial and start secure wiping today.",
    canonicalUrl: getCanonicalUrl("/download"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Download", item: "/download" },
    ],
  },
  // Solutions & Compliance
  "data-erasure": {
    title: "Data Erasure Guide: Secure Sanitization | D-Secure",
    description: "What is data erasure? Learn about secure sanitization methods and how to permanently destroy data on all storage media.",
    canonicalUrl: getCanonicalUrl("/solutions/data-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Data Erasure", item: "/solutions/data-erasure" },
    ],
  },
  "it-asset-disposition": {
    title: "IT Asset Disposition (ITAD): Secure NIST Disposal | D-Secure",
    description: "The complete ITAD software solution for secure asset disposal. Automate your erasure process with tamper-proof audit reports with certificate.",
    canonicalUrl: getCanonicalUrl("/itad-solution"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "ITAD Solution", item: "/itad-solution" },
    ],
  },
  compliance: {
    title: "Data Sanitization Compliance: GDPR, HIPAA & NIST | D-Secure",
    description: "D-Secure meets global data sanitization standards including NIST 800-88, GDPR, HIPAA, and DoD. View our compliance certifications.",
    canonicalUrl: getCanonicalUrl("/compliance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
    ],
  },
  "request-quote": {
    title: "Request a Quote: Enterprise Erasure Licensing | D-Secure",
    description: "Request a custom quote for enterprise-grade data erasure licensing. Volume discounts available for ITADs, data centers, and global organizations.",
    canonicalUrl: getCanonicalUrl("/request-quote"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Request Quote", item: "/request-quote" },
    ],
  },
  // Support & Resources
  support: {
    title: "D-Secure Support: Updates, Manuals & Tech Help | D-Secure",
    description: "Get technical support and product manuals for D-Secure data erasure software. Find solutions to common problems and learn how to use our platform.",
    canonicalUrl: getCanonicalUrl("/support"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
    ],
  },
  "help-manual": {
    title: "D-Secure Help Manual: Documentation & Guides | D-Secure",
    description: "Comprehensive documentation and integration guides for D-Secure data erasure software products.",
    canonicalUrl: getCanonicalUrl("/support/help-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/help-manual" },
    ],
  },
  faq: {
    title: "Data Erasure FAQ: Secure Wiping Questions | D-Secure",
    description: "Find answers to common questions about D-Secure data erasure software and certified wiping standards.",
    canonicalUrl: getCanonicalUrl("/faq"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "FAQ", item: "/faq" },
    ],
  },
  blog: {
    title: "D-Secure Blog: Data Sanitization & ITAD Insights",
    description: "Read the latest news, research, and insights on data sanitization, compliance, and IT asset disposition.",
    canonicalUrl: getCanonicalUrl("/blog"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
    ],
  },
  whitepaper: {
    title: "Technical Whitepapers: Data Sanitization Research | D-Secure",
    description: "Download technical whitepapers on NIST 800-88 compliance, SSD sanitization, and enterprise data security.",
    canonicalUrl: getCanonicalUrl("/whitepaper"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
      { name: "Whitepapers", item: "/whitepaper" },
    ],
  },
  // Comparisons
  compare: {
    title: "Compare Data Erasure Software | D-Secure vs Competitors",
    description: "See how D-Secure compares against other data erasure solutions. Technical breakdowns of features, speed, and reporting.",
    canonicalUrl: getCanonicalUrl("/compare"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compare", item: "/compare" },
    ],
  },
  "vs-blancco": {
    title: "D-Secure vs Blancco: Modern Data Erasure Comparison",
    description: "Compare D-Secure vs Blancco. See why enterprises choose D-Secure for faster deployment and better cost-effectiveness.",
    canonicalUrl: getCanonicalUrl("/vs/blancco"),
  },
  "vs-bitraser": {
    title: "D-Secure vs BitRaser: Industrial Erasure Comparison",
    description: "D-Secure vs BitRaser comparison. Industrial engine supports 100+ parallel erasures with superior reporting.",
    canonicalUrl: getCanonicalUrl("/vs/bitraser"),
  },
  // Other Utility Pages
  security: {
    title: "Security & Privacy Policy: Data Protection | D-Secure",
    description: "Review our security operations, compliance practices, and commitment to data privacy and protection.",
    canonicalUrl: getCanonicalUrl("/security"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Security", item: "/security" },
    ],
  },
  "get-started": {
    title: "Get Started with D-Secure: Setup & Deployment Guide",
    description: "Initial setup and deployment guide for new D-Secure users. Start erasing data securely in minutes.",
    canonicalUrl: getCanonicalUrl("/get-started"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Get Started", item: "/get-started" },
    ],
  },
  "book-demo": {
    title: "Book a Free Demo: D-Secure Data Erasure Solutions",
    description: "Experience D-Secure data erasure in action. Book a personalized demo with our technical experts.",
    canonicalUrl: getCanonicalUrl("/book-demo"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Book Demo", item: "/book-demo" },
    ],
  },
  "thank-you": {
    title: "Thank You for Contacting D-Secure | D-Secure",
    description: "Thank you for reaching out. Our team will contact you shortly regarding your data erasure inquiry.",
    canonicalUrl: getCanonicalUrl("/thank-you"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Thank You", item: "/thank-you" },
    ],
  },
  // Admin & User Dashboards (noindex)
  "admin-dashboard": { title: "Admin Dashboard | Enterprise Data Management | D-Secure", noindex: true },
  "user-dashboard": { title: "User Dashboard | Personal Data Management | D-Secure", noindex: true },
  "enhanced-user-dashboard": { title: "User Dashboard | Personal Data Management | D-Secure", noindex: true },
  "generate-report": { title: "Generate Compliance Report | D-Secure", noindex: true },
  "add-user": {
    title: "Add New User | Admin Console | D-Secure",
    description: "Create new user accounts and manage permissions in the D-Secure admin console.",
    noindex: true
  },
  "admin-users": { title: "User Management | Admin Console | D-Secure", noindex: true },
  "admin-reports": { title: "Reports Management | Admin Console | D-Secure", noindex: true },
  "admin-settings": { title: "Admin Settings | Admin Console | D-Secure", noindex: true },
  "add-group": { title: "Add New Group | Admin Console | D-Secure", noindex: true },
  "edit-user": { title: "Edit User Profile | Admin Console | D-Secure", noindex: true },
  "edit-group": { title: "Edit Group Settings | Admin Console | D-Secure", noindex: true },
  "admin-groups": { title: "Group Management | Admin Console | D-Secure", noindex: true },
  "admin-profile-edit": { title: "Edit Admin Profile | Admin Console | D-Secure", noindex: true }
};

/**
 * Kisi bhi page ke liye SEO metadata fetch karne ka generic helper
 */
export const getSEOForPage = (pageKey: string): SEOMetadata => {
  const pageData = PAGE_SEO[pageKey] || {};
  const defaults = getDefaultSEO();
  
  return {
    ...defaults,
    ...pageData,
  };
};

/**
 * Blog posts ke liye SEO metadata fetch karne ka helper
 */
export const getBlogSEO = (blogSlug: string): SEOMetadata => {
  const blogData = BLOG_SEO[blogSlug] || {};
  const defaults = getDefaultSEO();
  
  return {
    ...defaults,
    ...blogData,
  };
};

