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
    title: "How to Securely Wipe SSDs | Advanced Sanitization | D-Secure",
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
    title: "Data Sanitization Compliance Guide | D-Secure",
    description: "Navigate data sanitization compliance for GDPR, HIPAA, and NIST 800-88. Enterprise guide to building a defensible data disposition program.",
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
};
