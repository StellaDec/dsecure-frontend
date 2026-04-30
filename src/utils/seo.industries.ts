import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const INDUSTRY_SEO: Record<string, Partial<SEOMetadata>> = {
  "solutions/data-erasure-banking-finance": {
    title: "Banking & Financial Data Erasure: PCI-DSS & SOX | D-Secure",
    description:
      "Secure data erasure solutions for banks & financial firms. Achieve 100% compliance with PCI-DSS, SOX, and GLBA with tamper-proof audit trails.",
    keywords: generateKeywords([
      "banking data erasure",
      "financial data destruction",
      "best data erasure software for banks",
      "PCI-DSS compliance",
      "SOX data erasure",
      "GLBA compliance",
      "FACTA disposal rule",
      "banking ITAD solutions",
      "certified financial data wiping",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/data-erasure-banking-finance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Financial Services", item: "/solutions/data-erasure-banking-finance" },
    ],
  },
  "solutions/healthcare": {
    title: "Healthcare Data Sanitization | HIPAA Compliance | D-Secure",
    description:
      "Secure medical record sanitization and PHI erasure. HIPAA-compliant data sanitization for hospitals and clinics.",
    keywords: generateKeywords([
      "healthcare data privacy",
      "HIPAA compliant data sanitization",
      "best medical data erasure software",
      "PHI erasure",
      "HITECH compliance",
      "secure medical record disposal",
      "hospital data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/healthcare"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Healthcare", item: "/solutions/healthcare" },
    ],
  },
  "solutions/government": {
    title: "Government Data Erasure: NIST 800-88 & DoD | D-Secure",
    description:
      "Secure data destruction for government and defense. Meet NIST 800-88, DoD 5220.22-M, and CMMC standards with tamper-proof audit trails.",
    keywords: generateKeywords([
      "government data security",
      "NIST 800-88 certified wiping",
      "military data erasure software",
      "DoD 5220.22-M standard",
      "CMMC compliance data sanitization",
      "classified data destruction",
      "government ITAD",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/government"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Government", item: "/solutions/government" },
    ],
  },
  "solutions/itad": {
    title: "ITAD Data Erasure Solutions | Asset Disposal | D-Secure",
    description: "Secure data wiping for ITAD and recyclers. Ensure compliance with tamper-proof audit reports and certificates during hardware retirement.",
    keywords: generateKeywords([
      "ITAD data erasure",
      "asset disposal",
      "compliance wiping",
      "R2v3 compliance",
      "e-Stewards data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD", item: "/solutions/itad" },
    ],
  },
  "solutions/education": {
    title: "Education Data Erasure: FERPA & COPPA Privacy | D-Secure",
    description: "Secure data erasure for schools and universities. Ensure FERPA and COPPA compliance with verified student data sanitization solutions.",
    keywords: generateKeywords([
      "education data erasure",
      "FERPA compliance software",
      "COPPA data privacy",
      "student data privacy",
      "university IT asset disposal",
      "school computer wiping",
      "educational data sanitization",
      "NIST 800-88 education",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/education"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Education", item: "/solutions/education" },
    ],
  },
  "solutions/non-profit": {
    title: "Non-Profit Data Erasure: Secure Donation & Reuse | D-Secure",
    description:
      "Securely erase donor and beneficiary records from drives. Cost-effective, audit-ready data sanitization for NGOs and charities.",
    keywords: generateKeywords([
      "non-profit data erasure",
      "NGO data security",
      "charity device donation",
      "secure data disposal for NGOs",
      "NIST 800-88 non-profit",
      "sustainable IT asset disposal",
      "non-profit GDPR compliance",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/non-profit"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Non-Profit Organizations", item: "/solutions/non-profit" },
    ],
  },
  // Enterprise Solutions Page — SEO key "enterprise-solutions" se match hota hai
  "enterprise-solutions": {
    title: "Enterprise Data Erasure: Scalable Secure Wiping | D-Secure",
    description:
      "Enterprise-grade data erasure for large organizations. Wipe servers and drives with PXE boot and tamper-proof audit trails. NIST 800-88 & GDPR compliant.",
    keywords: generateKeywords([
      "enterprise data erasure software",
      "best enterprise data sanitization",
      "large scale data wiping solutions",
      "PXE boot erasure for servers",
      "network server wiping",
      "NIST 800-88 enterprise software",
      "corporate data destruction solutions",
      "scalable data sanitization",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/enterprise"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Enterprise", item: "/solutions/enterprise" },
    ],
  },
  // Service Providers Page — SEO key "solutions/service-providers" se match hota hai
  "solutions/service-providers": {
    title: "MSP & Service Provider Data Erasure Solutions | D-Secure",
    description:
      "Data erasure for MSPs. Offer certified sanitization as a service with centralized audit trails, white-label reporting, and scalable licensing.",
    keywords: generateKeywords([
      "MSP data erasure",
      "service provider data wiping",
      "managed service provider security",
      "erasure as a service",
      "ITAD service provider",
      "white label data erasure",
      "MSP compliance tools",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/service-providers"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Service Providers", item: "/solutions/service-providers" },
    ],
  },
};
