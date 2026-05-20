import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const BLOG_SEO: Record<string, Partial<SEOMetadata>> = {
  "blog/overwrite-guide": {
    title: "Data Overwriting Guide: Secure ITAD Solutions | D-Secure",
    description: "Learn how data overwriting works and why it's the gold standard for secure data sanitization in enterprise data erasure workflows.",
    keywords: generateKeywords(["overwriting guide", "data sanitization methods", "secure wiping", "enterprise data erasure"]),
    canonicalUrl: getCanonicalUrl("/blog/overwrite-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Overwrite Guide", item: "/blog/overwrite-guide" },
    ],
  },
  "blog/ssd-wipe-guide": {
    title: "How to Securely Wipe SSDs & NVMe Drives (2026 Guide)",
    description: "SSD data erasure is different from HDD. Discover the specific techniques required for permanent SSD data destruction.",
    keywords: generateKeywords(["SSD wipe guide", "solid state drive erasure", "SSD security"]),
    canonicalUrl: getCanonicalUrl("/blog/ssd-wipe-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "SSD Wipe Guide", item: "/blog/ssd-wipe-guide" },
    ],
  },
  "blog/nist-800-88-compliance-india": {
    title: "NIST 800-88 Data Erasure Software India | D-Secure",
    description: "NIST 800-88 is the gold standard for data erasure solutions in India. Learn about secure data sanitization for ITAD and government sectors.",
    keywords: generateKeywords(["NIST 800-88 compliant data erasure software India", "DPDP Act 2023 compliance", "secure data destruction India", "data sanitization software"]),
    canonicalUrl: getCanonicalUrl("/blog/nist-800-88-compliance-india"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "NIST 800-88 Compliance", item: "/blog/nist-800-88-compliance-india" },
    ],
  },
  // ... (In a real scenario, all 300+ blog entries would go here)
  "blog-erase-data-pc-laptop-desktop": {
    title: "How to Erase Data from PC, Laptop & Desktop Safely",
    description: "Factory reset doesn't delete data permanently. Learn the certified steps to erase your PC, laptop or desktop using NIST-compliant software.",
    keywords: generateKeywords(["erase data from PC", "wipe laptop before selling", "delete data desktop permanently", "NIST data erasure software"]),
    canonicalUrl: getCanonicalUrl("/blog/erase-data-pc-laptop-desktop"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Erase Data from PC Laptop Desktop", item: "/blog/erase-data-pc-laptop-desktop" },
    ],
  },
  // Page 6: Data Sanitization Compliance
  "blog-data-sanitization-compliance": {
    title: "2026 Data Sanitization Compliance: NIST, GDPR & HIPAA Checklist",
    description: "Don't risk hefty fines. Master data sanitization compliance with our complete guide to NIST 800-88, GDPR, and HIPAA data destruction requirements.",
    keywords: generateKeywords(["data sanitization compliance", "GDPR data erasure requirements", "HIPAA data destruction compliance", "NIST 800-88 compliance", "PCI-DSS data erasure", "ISO 27001 media disposal"]),
    canonicalUrl: getCanonicalUrl("/blog/data-sanitization-compliance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Data Sanitization Compliance Guide", item: "/blog/data-sanitization-compliance" },
    ],
  },
  // Page 8: Erase Mac Data Safely Using D-Secure
  "blog-erase-mac-data-safely": {
    title: "How to Erase Mac Data Safely: NIST Compliant | D-Secure",
    description: "Securely erase MacBook, iMac, and Mac Pro using D-Secure's NIST 800-88 compliant software with tamper-proof certificates.",
    keywords: generateKeywords(["erase Mac data safely", "secure Mac data erasure enterprise", "MacBook wipe NIST compliant", "Mac data destruction certificate", "GDPR HIPAA Mac erasure compliance"]),
    canonicalUrl: getCanonicalUrl("/blog/erase-mac-data-safely-using-dsecure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Erase Mac Data Safely Using D-Secure", item: "/blog/erase-mac-data-safely-using-dsecure" },
    ],
  },
  // Page 11: Erasure Verification Process
  "blog-erasure-verification-process": {
    title: "NIST Erasure Verification Process Explained | D-Secure",
    description: "Understand how D-Secure performs NIST 800-88 erasure verification to guarantee complete data sanitization and compliance.",
    keywords: generateKeywords(["erasure verification process", "NIST 800-88 data verification", "data sanitization verification", "post-erasure verification compliance", "drive eraser verification methods"]),
    canonicalUrl: getCanonicalUrl("/blog/erasure-verification-process"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Erasure Verification Process", item: "/blog/erasure-verification-process" },
    ],
  },

  // ─── CUSTOM BLOG PAGES KE UNIQUE KEYS ───
  // Comments Hindi mein likhe gaye hain rules ke mutabik

  // Data Minimization principle blog ka custom SEO metadata
  "blog/data-minimization": {
    title: "Data Minimization Principle: A Key Part of Data Privacy | D-Secure",
    description: "Understand the data minimization principle in data protection laws. Learn how to implement secure data sanitization to comply with GDPR, CCPA, and DPDP Act.",
    keywords: generateKeywords(["data minimization principle", "data privacy laws GDPR", "secure data sanitization compliance"]),
    canonicalUrl: getCanonicalUrl("/blog/data-minimization"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Data Minimization", item: "/blog/data-minimization" },
    ],
  },
  // Erasure vs physical destruction blog ka custom SEO metadata
  "blog/erasure-vs-destruction": {
    title: "Data Erasure vs Physical Destruction: Complete Guide | D-Secure",
    description: "Compare software-based data erasure vs physical drive shredding. Learn the security, cost, compliance, and environmental ESG impact of both methods.",
    keywords: generateKeywords(["data erasure vs physical destruction", "hard drive shredding comparison", "secure software data wiping"]),
    canonicalUrl: getCanonicalUrl("/blog/erasure-vs-destruction"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Erasure vs Destruction", item: "/blog/erasure-vs-destruction" },
    ],
  },
  // Hardware diagnostics importance blog ka custom SEO metadata
  "blog/hardware-diagnostics": {
    title: "Hardware Diagnostics in ITAD & Certified Wiping | D-Secure",
    description: "Learn why comprehensive hardware diagnostics are crucial before data erasure. Verify storage, RAM, and CPU health to compile unified certificates.",
    keywords: generateKeywords(["hardware diagnostics ITAD", "hard drive health check before wipe", "diagnostics data sanitization software"]),
    canonicalUrl: getCanonicalUrl("/blog/hardware-diagnostics"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Hardware Diagnostics", item: "/blog/hardware-diagnostics" },
    ],
  },
  // ITAD vendor selection guide blog ka custom SEO metadata
  "blog/itad-selection-guide": {
    title: "Enterprise ITAD Vendor Selection Guide & Best Practices | D-Secure",
    description: "How to select the right IT Asset Disposition (ITAD) vendor. Enterprise checklist covering security compliance, certified sanitization, and ESG recycling standards.",
    keywords: generateKeywords(["ITAD vendor selection guide", "IT asset disposition best practices", "enterprise certified computer wiping"]),
    canonicalUrl: getCanonicalUrl("/blog/itad-selection-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "ITAD Selection Guide", item: "/blog/itad-selection-guide" },
    ],
  },
  // MSP Security and Wiping blog ka custom SEO metadata
  "blog/msp-data-erasure": {
    title: "MSPs and the Cybersecurity Imperative: Secure Data Sanitization | D-Secure",
    description: "Why MSPs must integrate certified data sanitization and NIST 800-88 wiping into their cybersecurity portfolios to protect client networks.",
    keywords: generateKeywords(["MSP cybersecurity data destruction", "managed service providers drive wiping", "NIST 800-88 compliance for MSPs"]),
    canonicalUrl: getCanonicalUrl("/blog/msp-data-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "MSP Cybersecurity Wiping", item: "/blog/msp-data-erasure" },
    ],
  },
  // Returning leased IT hardware dos and donts blog ka custom SEO metadata
  "blog/returning-leased-it-hardware-dos-and-donts": {
    title: "Returning Leased IT Hardware: Do's & Don'ts for Enterprises | D-Secure",
    description: "Avoid massive penalties and data breaches when returning leased IT assets. Step-by-step compliance guide for certified drive wiping and asset recovery.",
    keywords: generateKeywords(["returning leased computer hardware", "leased computer wipe compliance", "avoid leased hardware data leakage penalties"]),
    canonicalUrl: getCanonicalUrl("/blog/returning-leased-it-hardware-dos-and-donts"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Returning Leased IT Assets", item: "/blog/returning-leased-it-hardware-dos-and-donts" },
    ],
  },
  // Sustainable IT Reuse & circular economy blog ka custom SEO metadata
  "blog/sustainable-it-reuse": {
    title: "Sustainable IT Reuse: Safe circular economy through Wiping | D-Secure",
    description: "Unlock sustainable IT reuse. Discover how NIST-compliant software data erasure enables safe hardware circularity and reduces enterprise Scope 3 emissions.",
    keywords: generateKeywords(["sustainable IT reuse circular economy", "reduce scope 3 carbon emissions hard drive wipe", "green IT asset disposition software"]),
    canonicalUrl: getCanonicalUrl("/blog/sustainable-it-reuse"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Sustainable IT Reuse", item: "/blog/sustainable-it-reuse" },
    ],
  },
};
