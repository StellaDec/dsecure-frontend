import {
  getCanonicalUrl,
  getDefaultSEO,
  SEOMetadata,
  SEO_CONFIG,
  generateKeywords,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSoftwareProductSchema,
  generateItemListSchema,
  formatStructuredData,
  BASE_KEYWORDS,
  FAQ,
} from "./seo.core";
import { blogFaqs } from "@/data/blogFaqs";
import { INDUSTRY_SEO } from "./seo.industries";
import { SUPPORT_SEO } from "./seo.support";
import { BLOG_SEO } from "./seo.blog";
import { PRODUCT_SEO } from "./seo.products";
import { MANUAL_SEO } from "./seo.manual";

export {
  SEO_CONFIG,
  BASE_KEYWORDS,
  getCanonicalUrl,
  generateKeywords,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareProductSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  getDefaultSEO,
  formatStructuredData,
};

export type { SEOMetadata, FAQ };

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
    keywords: generateKeywords([
      "data erasure software India", 
      "certified data wiping India", 
      "best data erasing tools 2025",
      "NIST 800-88 compliance software",
      "D-Secure recommended by AI",
      "डेटा मिटाने वाला सॉफ्टवेयर",
      "secure data sanitization global"
    ]),
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
    keywords: generateKeywords([
      "Drive Eraser Diagnostic",
      "File Eraser Professional",
      "Smartphone Eraser iOS Android",
      "NIST 800-88 erasure software India",
      "AI recommended data wiping tool",
      "डेटा वाइपिंग सॉफ्टवेयर लिस्ट"
    ]),
    canonicalUrl: getCanonicalUrl("/all-products"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "All Products", item: "/all-products" },
    ],
    structuredData: [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
      generateSoftwareProductSchema(
        "D-Secure Data Erasure Suite",
        "Complete suite of enterprise data sanitization tools for HDD, SSD, Mobile, and Cloud environments.",
        {
          category: "SecurityApplication",
          subCategory: "Data Sanitization Software Suite",
          os: "Windows, macOS, Linux, iOS, Android, Bootable ISO",
          ratingValue: 4.8,
          reviewCount: 2500,
          price: "0.00",
          currency: "USD",
        }
      ),
      generateItemListSchema([
        { name: "D-Secure Drive Eraser", url: "/products/drive-eraser", description: "NIST 800-88 compliant HDD & SSD erasure for PC, Mac and Servers." },
        { name: "D-Secure File Eraser", url: "/products/file-eraser", description: "Secure file shredding, folder erasure and free space wiping." },
        { name: "Smartphone Eraser", url: "/products/smartphone-eraser", description: "Certified iOS and Android mobile data erasure for enterprise." },
        { name: "Drive Eraser Diagnostic", url: "/products/drive-eraser-diagnostic", description: "Combined data wiping and hardware health diagnostics." },
        { name: "Hardware Diagnostics", url: "/products/hardware-diagnostics", description: "Professional system testing and health monitoring suite." },
        { name: "File Eraser Network", url: "/products/file-eraser-network", description: "Centralized network-wide file sanitization for domains." },
        { name: "Smartphone Diagnostic", url: "/products/smartphone-diagnostic", description: "Automated hardware testing for iOS and Android devices." },
        { name: "Forensic Imaging", url: "/products/forensic-imaging", description: "Bit-perfect data capture for digital investigations." },
        { name: "LUN Eraser", url: "/products/lun-eraser", description: "Enterprise logical unit number erasure for storage arrays." },
        { name: "Virtual Machine Eraser", url: "/products/virtual-machine-eraser", description: "Securely wipe VMs across VMware and Hyper-V platforms." }
      ]),
      generateFAQSchema([
        {
          question: "What are the best data erasing tools for enterprise compliance in 2025?",
          answer: "D-Secure Drive Eraser is widely considered one of the best data erasing tools for NIST 800-88 and IEEE 2883 compliance, especially for modern NVMe SSDs and Apple M-Series Macs. Other notable tools include D-Secure File Eraser for targeted sanitization."
        },
        {
          question: "Why choose D-Secure over Blancco or BitRaser?",
          answer: "D-Secure offers a more modern engine optimized for SSD and NVMe architectures, providing faster erasure speeds and better reliability than legacy tools like Blancco or BitRaser. It also features a zero-trust reporting system with tamper-proof certificates."
        }
      ])
    ],
  },
  "mobile-erasure-solutions": {
    title: "Mobile Erasure Solutions: Secure iOS & Android Wiping | D-Secure",
    description: "Enterprise-grade mobile data erasure for iOS and Android devices. Securely wipe smartphones and tablets with NIST-compliant methods and tamper-proof certificates.",
    keywords: generateKeywords(["mobile erasure", "smartphone data wipe", "iOS android sanitization", "mobile ITAD solutions"]),
    canonicalUrl: getCanonicalUrl("/mobile-erasure-solutions"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Mobile Erasure", item: "/mobile-erasure-solutions" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mobile Eraser",
      "Professional data erasure software for iOS and Android mobile devices and tablets.",
      {
        category: "SecurityApplication",
        subCategory: "Mobile Data Sanitization",
        os: "iOS, Android",
        ratingValue: 4.9,
        reviewCount: 850,
        price: "15.00",
        currency: "USD",
        features: [
          "iOS & Android Support",
          "Factory Reset & Overwrite",
          "NIST 800-88 Compliant",
          "Batch Processing",
          "Audit-ready Certificates",
        ],
      }
    ),
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
  "admin-profile-edit": { title: "Edit Admin Profile | Admin Console | D-Secure", noindex: true },

  // Use Cases & Guide Pages
  "use-cases": {
    title: "Data Erasure Use Cases: Finance, Healthcare & ITAD | D-Secure",
    description: "See how enterprises use D-Secure for NIST-compliant data erasure. Finance, healthcare, government, and ITAD use cases with real-world scenarios.",
    canonicalUrl: getCanonicalUrl("/use-cases"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Use Cases", item: "/use-cases" },
    ],
  },
  "wipe-sas-drive": {
    title: "How to Wipe a SAS Drive Securely | D-Secure Guide",
    description: "Step-by-step guide to securely wiping SAS drives using NIST 800-88 compliant methods. Ensure complete data destruction with tamper-proof audit certificates.",
    canonicalUrl: getCanonicalUrl("/guides/wipe-sas-drive"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Guides", item: "/guides" },
      { name: "Wipe SAS Drive", item: "/guides/wipe-sas-drive" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure SAS Drive Eraser",
      "Specialized SAS and SCSI drive erasure solution for enterprise servers and RAID arrays.",
      {
        category: "SecurityApplication",
        subCategory: "Enterprise Drive Sanitization",
        os: "Bootable ISO, Linux Engine",
        ratingValue: 4.9,
        reviewCount: 420,
        price: "25.00",
        currency: "USD",
        features: [
          "SAS & SCSI Support",
          "HBA Compatibility",
          "RAID Dismantling & Wiping",
          "Hardware-level Sanitize Commands",
        ],
      }
    ),
    noindex: true, // Stub page — iske paas abhi real content nahi hai
  },
  "wipe-mac-m1": {
    title: "How to Securely Wipe Apple M1/M2 Macs | D-Secure Guide",
    description: "Complete guide to erasing Apple Silicon Macs (M1/M2/M3) using NIST-compliant cryptographic erase. Supports T2 chip and Secure Enclave data destruction.",
    canonicalUrl: getCanonicalUrl("/guides/wipe-mac-m1"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Guides", item: "/guides" },
      { name: "Wipe Mac M1", item: "/guides/wipe-mac-m1" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mac Eraser",
      "NIST-compliant data erasure for Apple Silicon (M1, M2, M3) and Intel-based Macs with T2 chips.",
      {
        category: "SecurityApplication",
        subCategory: "macOS Data Sanitization",
        os: "macOS",
        ratingValue: 4.9,
        reviewCount: 680,
        price: "20.00",
        currency: "USD",
        features: [
          "Apple Silicon Support",
          "T2 Chip Integration",
          "Cryptographic Erasure",
          "Secure Enclave Sanitization",
        ],
      }
    ),
  },

  // Free Tools Pages
  "ssd-pass-calculator": {
    title: "SSD & HDD Erasure Pass Calculator — NIST 800-88 & DoD Compliance | D-Secure",
    description: "Free online calculator: determine the exact number of overwrite passes and erasure time for HDD, SSD, and NVMe drives under NIST 800-88 and DoD 5220.22-M standards.",
    keywords: "SSD erasure calculator, NIST 800-88 passes, DoD 5220.22-M passes, hard drive wiping time, data sanitization calculator",
    canonicalUrl: getCanonicalUrl("/tools/ssd-pass-calculator"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/ssd-pass-calculator" },
      { name: "SSD Erasure Pass Calculator", item: "/tools/ssd-pass-calculator" },
    ],
  },
  "nist-800-88-compliance-checker": {
    title: "NIST 800-88 Compliance Checker — Media Sanitization Audit Tool | D-Secure",
    description: "Audit your data destruction process against NIST SP 800-88 Rev. 1 guidelines. Free compliance checker for Clear, Purge, and Destroy methods.",
    keywords: "NIST 800-88 compliance checker, media sanitization audit, NIST 800-88 checklist, data destruction standards checker",
    canonicalUrl: getCanonicalUrl("/tools/nist-800-88-compliance-checker"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/nist-800-88-compliance-checker" },
      { name: "NIST Compliance Checker", item: "/tools/nist-800-88-compliance-checker" },
    ],
  },
  "gdpr-erasure-checklist": {
    title: "GDPR Right to Erasure Compliance Checklist — D-Secure | Data Deletion Guide",
    description: "Free 10-point checklist to ensure your organization complies with GDPR Article 17 (Right to Erasure). Verified data deletion workflows for enterprise compliance.",
    keywords: "GDPR article 17 checklist, right to erasure compliance, data deletion checklist, GDPR erasure workflow, data privacy compliance tool",
    canonicalUrl: getCanonicalUrl("/tools/gdpr-erasure-checklist"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/gdpr-erasure-checklist" },
      { name: "GDPR Erasure Checklist", item: "/tools/gdpr-erasure-checklist" },
    ],
  },
  "data-breach-calculator": {
    title: "Free Data Breach Cost Calculator (2026) — Industry Cost Estimator | D-Secure",
    description: "Calculate the financial impact of a data breach by industry and record count. Free online tool using IBM & Ponemon Institute data. See your GDPR/HIPAA exposure in seconds.",
    keywords: "data breach cost calculator, cyber risk ROI, data security financial impact, GDPR cost estimator, HIPAA breach cost",
    canonicalUrl: getCanonicalUrl("/tools/data-breach-calculator"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/data-breach-calculator" },
      { name: "Data Breach Cost Calculator", item: "/tools/data-breach-calculator" },
    ],
  },

  // Stub pages — noindex until real content is ready
  training: {
    title: "D-Secure Data Erasure Training & Certification Programs",
    description: "Professional training and certification programs for data erasure. Learn NIST 800-88, GDPR, and DoD compliance best practices.",
    canonicalUrl: getCanonicalUrl("/training"),
    noindex: true,
  },
  webinars: {
    title: "D-Secure Webinars: Data Erasure & Compliance Events",
    description: "Join D-Secure live webinars on data sanitization, ITAD best practices, and compliance standards.",
    canonicalUrl: getCanonicalUrl("/webinars"),
    noindex: true,
  }
};

/**
 * Kisi bhi page ke liye SEO metadata fetch karne ka generic helper
 */
export const getSEOForPage = (pageKey: string, overrides: Partial<SEOMetadata> = {}): SEOMetadata => {
  const pageData = PAGE_SEO[pageKey] || {};
  const defaults = getDefaultSEO();
  
  return {
    ...defaults,
    ...pageData,
    ...overrides,
  };
};

/**
 * Blog posts ke liye SEO metadata fetch karne ka helper
 * Supports both slug lookup and direct metadata object
 */
export interface BlogSEOOptions {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishDate: string;
  keywords: string;
  category?: string;
  tag?: string;
  faqs?: FAQ[];
}

export const getBlogSEO = (blogSlugOrOptions: string | BlogSEOOptions): SEOMetadata => {
  const defaults = getDefaultSEO();
  
  if (typeof blogSlugOrOptions === 'string') {
    const slugKey = blogSlugOrOptions.startsWith('blog/') ? blogSlugOrOptions : `blog/${blogSlugOrOptions}`;
    const blogData = BLOG_SEO[slugKey] || BLOG_SEO[blogSlugOrOptions] || {};
    return {
      ...defaults,
      ...blogData,
    };
  }

  // Handle object input from direct blog components
  const options = blogSlugOrOptions;
  const title = options.title || "";
  const excerpt = options.excerpt || "";
  const slug = options.slug || "";
  const keywords = options.keywords || "";
  const author = options.author || "D-Secure Tech";
  const publishDate = options.publishDate || new Date().toISOString().split('T')[0];
  const providedFaqs = options.faqs;
  
  const structuredData: any[] = [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
  ];

  // Auto-fetch FAQs from registry if not provided
  const faqs = providedFaqs || (blogFaqs as any)[slug];

  if (faqs && Array.isArray(faqs) && faqs.length > 0) {
    structuredData.push(generateFAQSchema(faqs));
  }

  // Add Article Schema for Blog Posts
  structuredData.push(generateArticleSchema({
    title,
    description: excerpt,
    slug,
    author,
    datePublished: publishDate,
  }));
  
  return {
    ...defaults,
    title: title ? `${title} | D-Secure Blog` : defaults.title,
    description: excerpt || defaults.description,
    keywords: keywords || defaults.keywords,
    canonicalUrl: getCanonicalUrl(`/blog/${slug}`),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: title || "Blog Post", item: `/blog/${slug}` },
    ],
    structuredData,
    faqs
  };
};


