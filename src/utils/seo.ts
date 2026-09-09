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

  // Remote Erasure Landing Page
  "remote-erasure": {
    title: "Remote Data Wiping Services | Enterprise Endpoint Erasure | D-Secure",
    description: "Securely wipe endpoints, servers, and cloud instances remotely. Ensure NIST 800-88 compliance without physical access. Zero-touch data sanitization.",
    keywords: generateKeywords([
      "remote data wiping services",
      "remote data erasure",
      "remote device wipe",
      "endpoint data sanitization",
      "remote hard drive wipe",
      "remote computer wipe",
      "remote SSD erasure",
      "zero-touch data wiping"
    ]),
    canonicalUrl: getCanonicalUrl("/remote-erasure"),
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Remote Erasure", item: "/remote-erasure" }],
    structuredData: [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
      generateFAQSchema([
        {
          question: "What is remote data wiping?",
          answer: "Remote data wiping allows IT administrators to securely and permanently erase data on distributed endpoints (laptops, servers, VMs) without needing physical access to the device. D-Secure's remote erasure tool executes NIST 800-88 compliant wiping commands over the network or internet."
        },
        {
          question: "Can I remotely wipe an SSD from the BIOS?",
          answer: "Yes. Modern remote erasure solutions like D-Secure can trigger native firmware-based erasure commands (like Secure Erase or Cryptographic Erase for NVMe) directly via MDM payloads or a lightweight agent, ensuring the entire drive is sanitized."
        },
        {
          question: "Does remote wiping generate an audit certificate?",
          answer: "Absolutely. Once the remote erasure process successfully completes, a tamper-evident PDF certificate is automatically generated and synced back to your centralized management console or ITAM system (like ServiceNow) for compliance auditing."
        }
      ])
    ]
  },

  // Home page SEO — GSC data: 26 clicks, 1,231 impr, CTR 2.1%, Pos 21.8
  home: {
    title: "D-Secure — Enterprise Data Erasure Software | NIST 800-88 Aligned",
    description:
      "D-Secure Technologies provides enterprise data erasure software for HDDs, SSDs, NVMe & mobile devices. NIST 800-88 aligned, GDPR & HIPAA compliant with tamper-evident audit certificates. Free trial available.",
    keywords: generateKeywords([
      // Brand queries jo GSC mein rank kar rahe hain
      "D-Secure",
      "D-Secure Technologies",
      "dsecure",
      "d-secure",
      "d secure",
      // Core business keywords (GSC data se)
      "data erasure software",
      "enterprise data erasure",
      "secure data erasure software",
      "data sanitization software",
      "NIST 800-88 compliant software",
      "file eraser software",
      "drive eraser software",
      // Transactional keywords
      "best data erasure software 2026",
      "certified data erasure",
      "data erasure solutions",
      // Compliance keywords
      "GDPR data erasure",
      "HIPAA data destruction",
      "ADISA certified erasure",
    ]),
    canonicalUrl: getCanonicalUrl("/"),
    breadcrumbs: [{ name: "Home", item: "/" }],
    structuredData: [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
      // Homepage FAQ — AI Overview citation ke liye
      generateFAQSchema([
        {
          question: "What is D-Secure Technologies?",
          answer: "D-Secure Technologies is an enterprise data erasure software company that provides NIST 800-88 aligned solutions for permanently wiping data from HDDs, SSDs, NVMe drives, mobile devices, and virtual machines. Their products include Drive Eraser, File Eraser, Smartphone Eraser, and LUN Eraser — all generating tamper-evident audit certificates for compliance.",
        },
        {
          question: "What is data erasure software?",
          answer: "Data erasure software is a security tool that permanently overwrites data on storage devices (HDDs, SSDs, NVMe) using standardized methods like NIST 800-88 Clear, Purge, or Destroy. Unlike simple file deletion or formatting, data erasure makes recovery impossible — even with forensic tools. Enterprise-grade erasure software also generates tamper-evident certificates proving the data was securely destroyed.",
        },
        {
          question: "Is D-Secure NIST 800-88 compliant?",
          answer: "Yes. D-Secure's Drive Eraser and File Eraser are aligned with NIST Special Publication 800-88 Rev. 1 guidelines for media sanitization. They support Clear, Purge, and Destroy level methods and generate compliance certificates for each erasure operation.",
        },
        {
          question: "What is the difference between data erasure and data deletion?",
          answer: "Data deletion (including emptying the Recycle Bin or formatting a drive) only removes file system pointers — the actual data remains on the disk and can be recovered. Data erasure overwrites every byte with random patterns using methods like DoD 5220.22-M or NIST 800-88 Purge, making the data physically unrecoverable even with forensic tools.",
        },
      ]),
    ],
  },

  // AI Overview Page SEO
  "ai-overview": {
    title: "AI Overview & Entity Profile | D-Secure Technologies",
    description: "Structured technical capabilities and entity profile of D-Secure Technologies for AI models and automated systems. NIST 800-88 compliant data sanitization.",
    keywords: generateKeywords([
      "D-Secure AI overview",
      "data sanitization entity profile",
      "LLM optimized cybersecurity data",
      "NIST 800-88 technical definition",
      "D-Secure technical taxonomy"
    ]),
    canonicalUrl: getCanonicalUrl("/ai-overview"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "AI Overview", item: "/ai-overview" },
    ],
  },
  // All Products page — GSC: 2,041 impr, 0.1% CTR, Pos 41.1
  "data-eraser-software": {
    title: "All Data Erasure Products — Enterprise Software Suite | D-Secure Technologies",
    description: "Explore D-Secure's complete data erasure product suite: Drive Eraser, File Eraser, Smartphone Eraser, LUN Eraser & more. NIST 800-88 aligned. Free trial available.",
    keywords: generateKeywords([
      "data erasure software",
      "enterprise data erasure software",
      "secure data erasure",
      "data sanitization software",
      "certified data erasure software",
      "data erasure solutions",
      "data deletion software",
      "data destruction software",
      "NIST 800-88 compliant erasure software",
      "ADISA certified erasure software",
      "drive eraser software",
      "file eraser software",
      "smartphone eraser",
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
        "Complete suite of enterprise data sanitization tools for HDD, SSD, Mobile, and Cloud environments. NIST 800-88 aligned.",
        {
          category: "SecurityApplication",
          subCategory: "Data Sanitization Software Suite",
          os: "Windows, macOS, Linux, iOS, Android, Bootable ISO",
          // ratingValue: 4.8,
          // reviewCount: 2500,
          price: "0.00",
          currency: "USD",
        }
      ),
      generateItemListSchema([
        { name: "D-Secure Drive Eraser", url: "/products/drive-eraser", description: "NIST 800-88 aligned HDD & SSD erasure for PC, Mac and Servers." },
        { name: "D-Secure File Eraser", url: "/products/file-eraser", description: "Secure file shredding, folder erasure and free space wiping for Windows." },
        { name: "Smartphone Eraser", url: "/products/smartphone-eraser", description: "Enterprise-grade iOS and Android mobile data erasure." },
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
          question: "What are the best data erasure tools for enterprise compliance in 2026?",
          answer: "D-Secure Drive Eraser is widely considered one of the best data erasure tools for NIST 800-88 and IEEE 2883 compliance, especially for modern NVMe SSDs and Apple M-Series Macs. D-Secure File Eraser provides targeted file-level sanitization for active systems.",
        },
        {
          question: "Does D-Secure support remote data erasure?",
          answer: "Yes. D-Secure supports remote data erasure for laptops, desktops, and mobile devices across enterprise networks. IT administrators can initiate erasure operations from a centralized console.",
        },
      ]),
    ],
  },
  "mobile-erasure-solutions": {
    title: "Mobile Erasure Solutions: Secure iOS & Android Wiping | D-Secure",
    description: "Enterprise mobile data erasure for iOS and Android. Securely wipe smartphones and tablets with NIST-compliant methods and tamper-evident audit certificates.",
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
        // ratingValue: 4.9,
        // reviewCount: 850,
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
    // Pricing page ke custom plans aur general queries ke liye structured schemas inject karo
    structuredData: [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
      generateFAQSchema([
        {
          question: "What licensing options does D-Secure offer?",
          answer: "D-Secure offers flexible enterprise licensing including volume-based per-device licenses, site licenses, and unlimited usage subscriptions tailored for ITADs and large enterprises."
        },
        {
          question: "Do I get free support and updates?",
          answer: "Yes, all active licenses include 24/7 technical support and free software updates to ensure compliance with the latest data sanitization standards."
        },
        {
          question: "Can I try D-Secure before purchasing?",
          answer: "Absolutely! D-Secure offers a 14-day free trial with fully functional features for up to 3 devices so you can verify our compliance and speed."
        }
      ])
    ]
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
  // Request Demo Page - Live Enterprise Consultation
  "request-demo": {
    title: "Schedule Live Demo | Enterprise Data Erasure Software | D-Secure",
    description: "Request a personalized live demo of D-Secure Enterprise Data Erasure Software. See how our automated NIST 800-88 sanitization, PXE boot & reporting works.",
    keywords: generateKeywords([
      "request demo data erasure",
      "live demo drive eraser",
      "enterprise data wiping demo",
      "NIST 800-88 software demo",
      "D-Secure live demonstration",
    ]),
    canonicalUrl: getCanonicalUrl("/request-demo"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Request Demo", item: "/request-demo" },
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
    // Data Erasure solutions aur methods se related basic user queries ka FAQ schema
    structuredData: [
      generateFAQSchema([
        {
          question: "What is data erasure?",
          answer: "Data erasure is a software-based method of overwriting data that completely destroys all electronic data on a hard disk or other digital media, ensuring the data is unrecoverable."
        },
        {
          question: "Is data erasure the same as formatting?",
          answer: "No. Formatting only removes the file system pointers, leaving the actual data intact and recoverable with forensic tools. Data erasure permanently overwrites every sector of the storage media."
        }
      ])
    ]
  },
  "it-asset-disposition": {
    title: "IT Asset Disposition (ITAD): Secure NIST Disposal | D-Secure",
    description: "The complete ITAD software solution for secure asset disposal. Automate your erasure process with tamper-evident audit reports with certificate.",
    // Redirect path ke bajaye actual canonical pathway /solutions/itad use karein
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD Solution", item: "/solutions/itad" },
    ],
    // ITAD compliance verification metrics aur secure disposal guidelines ka FAQ schema
    structuredData: [
      generateFAQSchema([
        {
          question: "What is ITAD (IT Asset Disposition)?",
          answer: "IT Asset Disposition (ITAD) is the process of safe, secure, and environmentally responsible disposal of obsolete or unwanted IT hardware, where compliant data destruction is a critical compliance requirement."
        },
        {
          question: "Why is verifiable data erasure critical in ITAD?",
          answer: "verifiable data erasure guarantees that sensitive corporate information on assets slated for disposal is completely destroyed. This protects enterprises from data breaches, legal penalties, and ensures GDPR/HIPAA compliance."
        }
      ])
    ]
  },
  // ITAD solution page alias fallback support ke liye
  "itadsolution": {
    title: "IT Asset Disposition (ITAD): Secure NIST Disposal | D-Secure",
    description: "The complete ITAD software solution for secure asset disposal. Automate your erasure process with tamper-evident audit reports with certificate.",
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD Solution", item: "/solutions/itad" },
    ],
    structuredData: [
      generateFAQSchema([
        {
          question: "What is ITAD (IT Asset Disposition)?",
          answer: "IT Asset Disposition (ITAD) is the process of safe, secure, and environmentally responsible disposal of obsolete or unwanted IT hardware, where compliant data destruction is a critical compliance requirement."
        },
        {
          question: "Why is verifiable data erasure critical in ITAD?",
          answer: "verifiable data erasure guarantees that sensitive corporate information on assets slated for disposal is completely destroyed. This protects enterprises from data breaches, legal penalties, and ensures GDPR/HIPAA compliance."
        }
      ])
    ]
  },
  compliance: {
    title: "Data Sanitization Compliance: GDPR, HIPAA & NIST | D-Secure",
    description: "D-Secure meets global data sanitization standards including NIST 800-88, GDPR, HIPAA, and DoD. View our compliance alignments.",
    canonicalUrl: getCanonicalUrl("/compliance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
    ],
  },
  // अंतर्राष्ट्रीय कानून और नियम page का SEO
  "international-laws": {
    title: "Global Data Protection Laws & Regulations | D-Secure",
    description: "D-Secure helps comply with 25+ global data protection laws including GDPR, CCPA, HIPAA, DPDP Act, LGPD, and more. Explore international regulations by region.",
    keywords: generateKeywords([
      "data protection laws",
      "international privacy regulations",
      "GDPR compliance software",
      "global data erasure compliance",
      "data privacy laws by country",
    ]),
    canonicalUrl: getCanonicalUrl("/international-laws-and-regulations"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "International Laws & Regulations", item: "/international-laws-and-regulations" },
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
    description: "Find answers to common questions about D-Secure data erasure software and compliant wiping standards.",
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
    description: "Step-by-step guide to securely wiping SAS drives using NIST 800-88 compliant methods. Ensure complete data destruction with tamper-evident audit certificates.",
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
        // ratingValue: 4.9,
        // reviewCount: 420,
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
        // ratingValue: 4.9,
        // reviewCount: 680,
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
    description: "Determine exact overwrite passes and erasure time for HDD, SSD & NVMe under NIST and DoD standards.",
    keywords: "SSD erasure calculator, NIST 800-88 passes, DoD 5220.22-M passes, hard drive wiping time, data sanitization calculator",
    canonicalUrl: getCanonicalUrl("/tools/ssd-pass-calculator"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/ssd-pass-calculator" },
      { name: "SSD Erasure Pass Calculator", item: "/tools/ssd-pass-calculator" },
    ],
  },
  "roi-calculator": {
    title: "Data Erasure ROI Calculator — Estimate Enterprise Cost Savings | D-Secure",
    description: "Calculate your return on investment and cost savings with D-Secure automated data erasure software vs hardware destruction and physical shredding.",
    keywords: "data erasure ROI calculator, data destruction cost savings, IT asset disposition ROI, software wiping vs shredding cost, enterprise sanitization ROI",
    canonicalUrl: getCanonicalUrl("/tools/roi-calculator"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Free Tools", item: "/tools/roi-calculator" },
      { name: "ROI Calculator", item: "/tools/roi-calculator" },
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
    description: "Free checklist for GDPR Article 17 (Right to Erasure) compliance. Verified data deletion workflows to ensure enterprise regulatory and privacy standards.",
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
    description: "Calculate the financial impact of a data breach. Free tool using IBM data to see GDPR/HIPAA exposure instantly.",
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
    title: "D-Secure Data Erasure Training & Qualification Programs",
    description: "Professional training and qualification programs for data erasure. Learn NIST 800-88, GDPR, and DoD compliance best practices.",
    canonicalUrl: getCanonicalUrl("/training"),
  },
  webinars: {
    title: "D-Secure Webinars: Data Erasure & Compliance Events",
    description: "Join D-Secure live webinars on data sanitization, ITAD best practices, and compliance standards.",
    canonicalUrl: getCanonicalUrl("/webinars"),
  },

  // ─── STATIC PAGES KE LIYE NAYE UNIQUE SEO KEYS ───
  // Sub-keys aur values clean format mein define kiye gaye hain rules ke mutabik

  // Forum ya community page ka unique SEO configuration
  forum: {
    title: "Enterprise Data Sanitization & ITAD Forum | D-Secure Community",
    description: "Connect with data destruction experts, ITAD professionals, and compliance managers in the D-Secure community. Discuss NIST 800-88, GDPR, and sanitization best practices.",
    canonicalUrl: getCanonicalUrl("/community"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Community", item: "/community" },
    ],
  },
  // Feature and product comparison page ka unique SEO configuration
  comparison: {
    title: "Data Erasure Software Comparison & Feature Matrix | D-Secure",
    description: "Compare enterprise data erasure software features, wiping speeds, and compliance standards. See why D-Secure is the leading choice for secure sanitization.",
    canonicalUrl: getCanonicalUrl("/comparison"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Comparison", item: "/comparison" },
    ],
  },
  // GDPR compliance detail page ka custom SEO metadata
  gdpr: {
    title: "GDPR Data Erasure Compliance Software Solutions | D-Secure",
    description: "Achieve bulletproof GDPR Article 17 (Right to Erasure) compliance. Securely sanitize customer & employee data with compliant, tamper-evident reporting.",
    canonicalUrl: getCanonicalUrl("/compliance/gdpr"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
      { name: "GDPR", item: "/compliance/gdpr" },
    ],
  },
  // HIPAA compliance detail page ka custom SEO metadata
  hipaa: {
    title: "HIPAA Compliant Data Destruction Software | D-Secure",
    description: "Achieve HIPAA compliant data destruction for PHI/ePHI. Securely sanitize healthcare storage media with tamper-evident audit reports and 100% compliance.",
    keywords: generateKeywords(["HIPAA compliant data destruction", "healthcare data sanitization", "PHI ePHI secure deletion", "medical records erasure software"]),
    canonicalUrl: getCanonicalUrl("/compliance/hipaa"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
      { name: "HIPAA", item: "/compliance/hipaa" },
    ],
  },
  // DoD 5220.22-M compliance detail page ka custom SEO metadata
  dod: {
    title: "DoD 5220.22-M Compliant Data Wiping Software | D-Secure",
    description: "Execute DoD 5220.22-M standard data wiping with D-Secure. Enterprise-grade secure sanitization with tamper-evident audit reports.",
    keywords: generateKeywords(["DoD 5220.22-M data wiping", "Department of Defense data destruction", "3-pass wipe standard", "government data sanitization software"]),
    canonicalUrl: getCanonicalUrl("/compliance/dod-5220-22-m"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
      { name: "DoD 5220.22-M", item: "/compliance/dod-5220-22-m" },
    ],
  },
  // Cookie policy page ka custom SEO metadata
  "cookie-policy": {
    title: "Cookie Policy | D-Secure Technologies",
    description: "Review D-Secure's cookie policy. Learn how we use cookies and tracking technologies to improve our site security and user experience.",
    canonicalUrl: getCanonicalUrl("/cookie-policy"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Cookie Policy", item: "/cookie-policy" },
    ],
  },
  // Data Guardian Award page ka custom SEO metadata
  "data-guardian-award": {
    title: "D-Secure Data Guardian Award | Enterprise Security Excellence",
    description: "The D-Secure Data Guardian Award recognizes enterprises and ITAD partners who achieve exceptional standards in data protection and sustainable sanitization.",
    canonicalUrl: getCanonicalUrl("/data-guardian-award"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Data Guardian Award", item: "/data-guardian-award" },
    ],
  },
  // Data Hygiene Framework page ka custom SEO metadata
  "data-hygiene-framework": {
    title: "Enterprise Data Hygiene Framework & Sanitization Policy | D-Secure",
    description: "Implement a modern enterprise data hygiene framework. Define data sanitization policies across servers, SSDs, and remote laptops to minimize breach risk.",
    canonicalUrl: getCanonicalUrl("/data-hygiene-framework"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Data Hygiene Framework", item: "/data-hygiene-framework" },
    ],
  },
  // Hardware Diagnostics page ka custom SEO metadata
  diagnostics: {
    title: "Enterprise System Diagnostics & Hardware Health Checks | D-Secure",
    description: "Run comprehensive system hardware diagnostics before erasure. Verify storage health, SSD lifespans, RAM, and CPU performance with tamper-evident reports.",
    canonicalUrl: getCanonicalUrl("/diagnostics"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Diagnostics", item: "/diagnostics" },
    ],
  },
  // Founder details page ka custom SEO metadata
  founder: {
    title: "Leadership & Vision: Meet the Founder of D-Secure",
    description: "Learn about the mission, values, and technology vision behind D-Secure, the industry-leading NIST-compliant data sanitization software suite.",
    canonicalUrl: getCanonicalUrl("/founder"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Founder", item: "/founder" },
    ],
  },
  // Glossary page ka custom SEO metadata
  glossary: {
    title: "Data Sanitization & ITAD Glossary: Terminology & Standards | D-Secure",
    description: "A comprehensive glossary of data sanitization, cybersecurity, and IT asset disposition (ITAD) terminology. Definitions for NIST 800-88, purge, clear, and destroy.",
    canonicalUrl: getCanonicalUrl("/glossary"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Glossary", item: "/glossary" },
    ],
  },
  // Legal policy page ka custom SEO metadata
  "legal-policy": {
    title: "Legal & Corporate Compliance Policies | D-Secure Technologies",
    description: "Read the legal policy and corporate compliance guidelines for D-Secure Technologies' software products and enterprise sanitization services.",
    canonicalUrl: getCanonicalUrl("/legal-policy"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Legal Policy", item: "/legal-policy" },
    ],
  },
  // Partners page ka custom SEO metadata
  partners: {
    title: "Enterprise Partner Program: ITADs, MSPs & Resellers | D-Secure",
    description: "Join the D-Secure Partner Network. Drive revenue and deliver NIST-aligned data sanitization solutions to your enterprise and government clients.",
    canonicalUrl: getCanonicalUrl("/partners"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Partners", item: "/partners" },
    ],
  },
  // Privacy policy page ka custom SEO metadata
  "privacy-policy": {
    title: "Privacy Policy | D-Secure Technologies",
    description: "Review our comprehensive privacy policy. Learn how D-Secure complies with global data protection standards (GDPR, DPDP Act, CCPA/CPRA) while collecting, processing, and protecting your data.",
    keywords: generateKeywords(["privacy policy", "GDPR compliance", "DPDP Act", "CCPA CPRA", "data protection", "D-Secure privacy", "data processor exclusion"]),
    canonicalUrl: getCanonicalUrl("/privacy-policy"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Privacy Policy", item: "/privacy-policy" },
    ],
  },
  // Resources page ka custom SEO metadata
  resources: {
    title: "Resource Hub: Enterprise Data Sanitization & Compliance Guide | D-Secure",
    description: "Explore the D-Secure resource center for the latest technical case studies, compliance whitepapers, software documentation, and sanitization guides.",
    canonicalUrl: getCanonicalUrl("/resources"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
    ],
  },
  // Case studies page ka custom SEO metadata
  "case-studies": {
    title: "Data Erasure Case Studies: Enterprise, ITAD & Data Centers | D-Secure",
    description: "Read how global organizations, top ITADs, and government agencies use D-Secure's software to slash erasure times and guarantee complete NIST compliance.",
    canonicalUrl: getCanonicalUrl("/resources/case-studies"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
      { name: "Case Studies", item: "/resources/case-studies" },
    ],
  },
  // Compliance resources page ka custom SEO metadata
  "compliance-resources": {
    title: "Regulatory Compliance Library: NIST, GDPR & HIPAA | D-Secure",
    description: "Access our collection of compliance briefs, regulations guides, and legal frameworks for compliant enterprise data sanitization.",
    canonicalUrl: getCanonicalUrl("/resources/compliance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
      { name: "Compliance", item: "/resources/compliance" },
    ],
  },
  // Documentation page ka custom SEO metadata
  documentation: {
    title: "Technical Resource Documentation & Setup Guides | D-Secure",
    description: "Explore our resources library including developer integration guides, administrative configuration manuals, and API reference sheets.",
    canonicalUrl: getCanonicalUrl("/resources/documentation"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
      { name: "Documentation", item: "/resources/documentation" },
    ],
  },
  // Whitepapers page ka custom SEO metadata
  whitepapers: {
    title: "Data Sanitization Whitepapers & Technical Studies | D-Secure",
    description: "Download in-depth whitepapers on SSD sanitization, secure data erasure economics, zero-trust media disposition, and advanced cryptographic erase.",
    canonicalUrl: getCanonicalUrl("/resources/whitepapers"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Resources", item: "/resources" },
      { name: "Whitepapers", item: "/resources/whitepapers" },
    ],
  },
  // Services page ka custom SEO metadata
  services: {
    title: "Enterprise Data Erasure & Compliant Wiping Services | D-Secure",
    description: "D-Secure provides enterprise data sanitization services for PCs, servers, mobile devices, virtual machines, and cloud environments. NIST 800-88 aligned.",
    canonicalUrl: getCanonicalUrl("/services"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Services", item: "/services" },
    ],
  },
  // Cloud erasure service page ka custom SEO metadata
  "cloud-erasure": {
    title: "Cloud Data Erasure: Secure AWS, Azure & GCP Sanitization | D-Secure",
    description: "Perform verifiable data erasure across public and private cloud storage buckets, logical unit numbers (LUNs), and hosted databases.",
    canonicalUrl: getCanonicalUrl("/services/cloud-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Services", item: "/services" },
      { name: "Cloud Erasure", item: "/services/cloud-erasure" },
    ],
  },
  // Solutions page ka custom SEO metadata
  solutions: {
    title: "Data Sanitization Solutions: Enterprise, ITAD & Government | D-Secure",
    description: "D-Secure provides tailored data destruction and sanitization software solutions for ITAD companies, data centers, government agencies, and global enterprises.",
    canonicalUrl: getCanonicalUrl("/solutions"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
    ],
  },
  // Blancco alternative solution page ka custom SEO metadata
  alternative: {
    title: "The Leading Blancco Alternative: verifiable data erasure | D-Secure",
    description: "Discover why enterprises are choosing D-Secure as their Blancco alternative. Experience up to 2x faster NVMe erasures, better pricing, and a zero-trust model.",
    canonicalUrl: getCanonicalUrl("/solutions/blancco-alternative"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Blancco Alternative", item: "/solutions/blancco-alternative" },
    ],
  },
  // Mac erasure solution page ka custom SEO metadata
  mac: {
    title: "Enterprise Apple Silicon & Intel Mac Erasure Software | D-Secure",
    description: "NIST 800-88 compliant data erasure for Apple M1/M2/M3 and Intel-based Macs. Features cryptographic erase, secure enclave wiping, and tamper-evident certificates.",
    canonicalUrl: getCanonicalUrl("/solutions/mac-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Mac Erasure", item: "/solutions/mac-erasure" },
    ],
  },
  // Status page ka custom SEO metadata
  status: {
    title: "D-Secure System Status & API Services Monitoring",
    description: "Check the live operational status of D-Secure cloud consoles, API endpoints, reporting servers, and license activation portals.",
    canonicalUrl: getCanonicalUrl("/status"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Status", item: "/status" },
    ],
  },
  // Technical documentation page ka custom SEO metadata
  "technical-documentation": {
    title: "Technical Documentation & Developer Integration Guides | D-Secure",
    description: "Deep-dive into D-Secure's technical manuals. Detailed guides for network PXE booting, automated API integrations, and command-line execution parameters.",
    canonicalUrl: getCanonicalUrl("/technical-documentation"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Technical Documentation", item: "/technical-documentation" },
    ],
  },
  // Terms of service page ka custom SEO metadata
  "terms-of-service": {
    title: "Terms of Service | D-Secure Technologies",
    description: "Read the terms of service governing the purchase, download, installation, and deployment of D-Secure Technologies' software products.",
    canonicalUrl: getCanonicalUrl("/terms-of-service"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Terms of Service", item: "/terms-of-service" },
    ],
  },
  // End User License Agreement page
  "eula": {
    title: "End User License Agreement (EULA) | D-Secure Technologies",
    description: "Read the End User License Agreement (EULA) for the use and licensing of BitRaser software from D-Secure Technologies.",
    canonicalUrl: getCanonicalUrl("/eula"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "EULA", item: "/eula" },
    ],
  },
  // Trust center page ka custom SEO metadata
  "trust-center": {
    title: "Trust Center: Security, Compliance & Data Privacy | D-Secure",
    description: "Access real-time security postures, SOC2 compliance reports, penetration testing certificates, and privacy practices at the D-Secure Trust Center.",
    canonicalUrl: getCanonicalUrl("/trust-center"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Trust Center", item: "/trust-center" },
    ],
  },
  // Verification portal page ka custom SEO metadata
  verify: {
    title: "Universal Report Verification Portal | D-Secure Technologies",
    description: "Verify the authenticity of any D-Secure data erasure report or certificate using our secure cryptographic verification portal.",
    canonicalUrl: getCanonicalUrl("/verify-report"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Verify Report", item: "/verify-report" },
    ],
  },
  // What is D-Secure page ka custom SEO metadata
  "what-is-d-secure": {
    title: "What is D-Secure? Enterprise Sanitization Explained",
    description: "Learn how D-Secure's industry-leading software permanently overwrites data on storage devices to eliminate data leak risks and ensure compliant ITAD.",
    canonicalUrl: getCanonicalUrl("/what-is-d-secure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "What is D-Secure", item: "/what-is-d-secure" },
    ],
  },
  // What is ITAD page ka custom SEO metadata
  "what-is-itad": {
    title: "What is ITAD (IT Asset Disposition)? A Complete Enterprise Guide",
    description: "Understand the core processes of IT Asset Disposition (ITAD), security regulations, environmental sustainability, and why compliant data wiping is vital.",
    canonicalUrl: getCanonicalUrl("/what-is-itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "What is ITAD", item: "/what-is-itad" },
    ],
  },
  // What is NIST page ka custom SEO metadata
  "what-is-nist-800-88": {
    title: "What is NIST SP 800-88 Rev 1? Media Sanitization Guidelines",
    description: "A comprehensive guide to NIST SP 800-88 Rev 1 guidelines. Learn the differences between Clear, Purge, and Destroy methods for secure sanitization.",
    canonicalUrl: getCanonicalUrl("/what-is-nist-800-88"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "What is NIST 800-88", item: "/what-is-nist-800-88" },
    ],
  },
  // Why D-Secure page ka custom SEO metadata
  "why-d-secure": {
    title: "Why Choose D-Secure: High-Performance Enterprise Sanitization",
    description: "Explore the technology advantages of D-Secure: rapid multi-threaded erasing, zero-trust cryptographic verification, and modern SSD/NVMe architecture support.",
    canonicalUrl: getCanonicalUrl("/why-d-secure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Why D-Secure", item: "/why-d-secure" },
    ],
  },
  // WhiteCanyon comparison page ka custom SEO metadata
  "vs-whitecanyon": {
    title: "D-Secure vs WhiteCanyon: Modern Enterprise Erasure Comparison",
    description: "Compare D-Secure vs WhiteCanyon WipeDrive. Discover the advantages of D-Secure's modern cloud reporting and multi-platform PXE network deployment.",
    canonicalUrl: getCanonicalUrl("/vs/whitecanyon"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Comparison", item: "/compare" },
      { name: "Vs WhiteCanyon", item: "/vs/whitecanyon" },
    ],
  }
};

/**
 * Kisi bhi page ke liye SEO metadata fetch karne ka generic helper
 */
export const getSEOForPage = (pageKey: string, overrides: Partial<SEOMetadata> = {}): SEOMetadata => {
  const pageData = PAGE_SEO[pageKey] || {};
  const defaults = getDefaultSEO();
  
  // Automate noindex directives for thin manual hubs, legal policy pages, and utility routes
  const noindexKeywords = [
    'manual', 'setup', 'settings', 'support', 'installation', 'faq', 
    'overview', 'licensing', 'integration', 'domain', 'traces', 'report',
    'privacy', 'policy', 'terms', 'cancellation', 'cookie', 'legal', 'gdpr'
  ];
  
  const isThinPage = noindexKeywords.some(keyword => pageKey.toLowerCase().includes(keyword));
  
  return {
    ...defaults,
    ...pageData,
    ...(isThinPage && { noindex: true }),
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
  /** Featured image URL — social share cards ke liye */
  image?: string;
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
  /** Blog post ki featured image — social share card mein dikhegi */
  const featuredImage = options.image || "";
  
  const structuredData: any[] = [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
  ];

  // Auto-fetch FAQs from registry if not provided
  const faqs = providedFaqs || (blogFaqs as any)[slug];

  if (faqs && Array.isArray(faqs) && faqs.length > 0) {
    structuredData.push(generateFAQSchema(faqs));
  }

  // Add Article Schema for Blog Posts — featured image bhi pass karo
  structuredData.push(generateArticleSchema({
    title,
    description: excerpt,
    slug,
    author,
    datePublished: publishDate,
    ...(featuredImage && { image: featuredImage }),
  }));
  
  return {
    ...defaults,
    title: title ? `${title} | D-Secure Blog` : defaults.title,
    description: excerpt || defaults.description,
    keywords: keywords || defaults.keywords,
    /** OG tags — per-post dynamic values, site-wide default se override */
    ogTitle: title || defaults.ogTitle,
    ogDescription: excerpt || defaults.ogDescription,
    ogType: 'article',
    ogImage: featuredImage || defaults.ogImage,
    /** Twitter tags — per-post dynamic values */
    twitterTitle: title || defaults.twitterTitle,
    twitterDescription: excerpt || defaults.twitterDescription,
    twitterImage: featuredImage || defaults.twitterImage,
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


