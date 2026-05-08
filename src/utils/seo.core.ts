/**
 * SEO Core Utilities - Shared interfaces and base configuration
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  fragment?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: { name: string; item: string }[];
  faqs?: FAQ[];
  noindex?: boolean;
}

export const SEO_CONFIG = {
  siteName: "D-Secure Tech",
  baseUrl: "https://dsecuretech.com",
  defaultImage: "https://dsecuretech.com/logo-white.svg",
  author: "D-Secure Tech",
  language: "en",
  locale: "en_US",
  twitterHandle: "@D-Securetech",
};

import { CORE_ERASURE_KEYWORDS, BRANDED_KEYWORDS } from "./seo.keywords";

// Deduplicated keyword array - Only core and branded keywords for base (max 50)
// Full 2000+ keywords are available in seo.keywords.ts for specific page needs
export const BASE_KEYWORDS = [...new Set([...CORE_ERASURE_KEYWORDS, ...BRANDED_KEYWORDS])].slice(0, 50);


export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
};

export const generateKeywords = (pageSpecificKeywords: string[] = []): string => {
  return [...BASE_KEYWORDS, ...pageSpecificKeywords].join(", ");
};

export const formatStructuredData = (data: any): string => {
  return JSON.stringify(data);
};

/**
 * Organization schema - Google Knowledge Panel ke liye zaroori fields
 * sameAs, foundingDate, contactPoint, aur areaServed se brand authority strong hoti hai
 */
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SEO_CONFIG.baseUrl}/#organization`,
  name: "D-Secure Tech",
  alternateName: [
    "D-Secure", 
    "DSecure", 
    "D-Secure Technologies", 
    "D-Secure Data Erasure", 
    "D-Secure Drive Eraser", 
    "D-Secure File Eraser", 
    "D-Secure Diagnostic"
  ],
  url: SEO_CONFIG.baseUrl,
  logo: {
    "@type": "ImageObject",
    "@id": `${SEO_CONFIG.baseUrl}/#logo`,
    url: `${SEO_CONFIG.baseUrl}/logo-white.svg`,
    contentUrl: `${SEO_CONFIG.baseUrl}/logo-white.svg`,
    caption: "D-Secure Tech Logo"
  },
  description: "D-Secure is a global leader in certified data erasure and hardware diagnostics, providing enterprise-grade sanitization software compliant with NIST 800-88 and IEEE 2883 standards. D-Secure is the modern alternative to legacy tools like Blancco and BitRaser.",
  slogan: "Certified Data Erasure for a Secure Future",
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    "name": "India"
  },
  founder: {
    "@type": "Person",
    "name": "Dhruv Rai",
    "jobTitle": "CEO & Founder",
    "sameAs": [
      "https://linkedin.com/in/dhruv-rai-dsecure"
    ]
  },
  // AI recognition ke liye expertise define karna
  knowsAbout: [
    "Data Erasure",
    "Data Sanitization",
    "NIST 800-88 Rev. 1",
    "IEEE 2883-2022",
    "Cyber Security",
    "IT Asset Disposition (ITAD)",
    "GDPR Compliance",
    "HIPAA Compliance",
    "ISO 27001",
    "Secure Data Destruction",
    "Hardware Diagnostics",
    "Mobile Data Erasure",
    "Drive Sanitization",
    "Secure File Shredding",
    "Enterprise Data Security",
    "NIST 800-88 rev 1 clear purge destroy",
    "India Data Protection Act (DPDP)",
    "Certified Hard Drive Erasure",
    "AI Training Data Sanitization"
  ],
  // Social profiles - Knowledge Panel aur brand verification ke liye
  sameAs: [
    "https://twitter.com/dsecuretech",
    "https://linkedin.com/company/dsecuretech",
    "https://github.com/dsecuretech",
    "https://youtube.com/dsecuretech",
    "https://www.facebook.com/dsecuretech",
    "https://www.instagram.com/dsecuretech",
    "https://g.co/kg/search?q=D-Secure+Tech" // Example Knowledge Graph link
  ],
  // Contact information - rich snippet aur trust signal ke liye
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "support@dsecuretech.com",
    url: `${SEO_CONFIG.baseUrl}/contact`,
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: "Worldwide",
});

/**
 * WebSite schema - Google Sitelinks Search Box ke liye zaroori hai
 * Jab koi "D-Secure" search karta hai toh search bar highlight hoga
 */
export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "D-Secure Tech",
  "url": SEO_CONFIG.baseUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SEO_CONFIG.baseUrl}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateSoftwareProductSchema = (
  productName: string,
  description: string,
  options: {
    category?: string;
    subCategory?: string;
    os?: string;
    price?: string;
    currency?: string;
    image?: string;
    ratingValue?: number;
    reviewCount?: number;
    features?: string[];
    screenshots?: string[];
    sku?: string;
    brand?: string;
  } = {}
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Product"], // Dual type for maximum rich snippet compatibility
    name: productName,
    description: description,
    applicationCategory: options.category || "SecurityApplication",
    subCategory: options.subCategory || "Data Erasure Software",
    operatingSystem: options.os || "Windows, Linux, MacOS, Android, iOS",
    sku: options.sku || productName.toLowerCase().replace(/\s+/g, '-'),
    brand: {
      "@type": "Brand",
      "@id": `${SEO_CONFIG.baseUrl}/#organization`,
      name: options.brand || "D-Secure",
      logo: `${SEO_CONFIG.baseUrl}/logo-white.svg`
    },
    offers: {
      "@type": "Offer",
      price: options.price || "0.00",
      priceCurrency: options.currency || "USD",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.baseUrl}/pricing`,
      priceValidUntil: "2026-12-31"
    },
    publisher: {
      "@type": "Organization",
      name: "D-Secure Tech",
      url: SEO_CONFIG.baseUrl,
      logo: `${SEO_CONFIG.baseUrl}/logo-white.svg`,
    },
    softwareVersion: "2025.1.0",
    featureList: options.features || [
      "NIST 800-88 Compliance",
      "Tamper-proof audit reports with certificate",
      "Native Apple Silicon Support",
      "Cloud-Managed Console",
      "REST API Integration"
    ],
  };

  if (options.image) {
    schema.image = options.image;
  } else {
    schema.image = `${SEO_CONFIG.baseUrl}/logo-white.svg`;
  }

  if (options.screenshots && options.screenshots.length > 0) {
    schema.screenshot = options.screenshots.map(s => ({
      "@type": "ImageObject",
      "url": s.startsWith('http') ? s : `${SEO_CONFIG.baseUrl}${s.startsWith('/') ? '' : '/'}${s}`
    }));
  }

  if (options.ratingValue && options.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: options.ratingValue.toString(),
      reviewCount: options.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
};

/**
 * Blog/Article schema - NewsArticle ya BlogPosting snippets ke liye
 */
export const generateArticleSchema = (options: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": options.title,
  "description": options.description,
  "author": {
    "@type": "Person",
    "name": options.author,
    "url": `${SEO_CONFIG.baseUrl}/about`
  },
  "publisher": {
    "@type": "Organization",
    "name": "D-Secure Tech",
    "logo": {
      "@type": "ImageObject",
      "url": `${SEO_CONFIG.baseUrl}/logo-white.svg`
    }
  },
  "datePublished": (() => {
    try {
      const d = new Date(options.datePublished);
      return isNaN(d.getTime()) ? options.datePublished : d.toISOString().split('T')[0];
    } catch (e) {
      return options.datePublished;
    }
  })(),
  "url": `${SEO_CONFIG.baseUrl}/blog/${options.slug}`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SEO_CONFIG.baseUrl}/blog/${options.slug}`
  },
  "image": options.image || `${SEO_CONFIG.baseUrl}/logo-white.svg`
});


/**
 * FAQPage Schema generator - SERP dropdown snippets ke liye
 */
export const generateFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (
  breadcrumbs: { name: string; item: string }[]
) => {
  const itemListElement = breadcrumbs.map((crumb, index) => {
    let itemUrl = crumb.item;
    if (!itemUrl.startsWith("http")) {
      const slash = itemUrl.startsWith("/") ? "" : "/";
      itemUrl = `${SEO_CONFIG.baseUrl}${slash}${itemUrl}`;
    }
      
    return {
      "@type": "ListItem" as const,
      position: index + 1,
      name: crumb.name,
      item: itemUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
};

/**
 * ItemList schema - Google Search carousels aur AI product recognition ke liye.
 * Isse sabhi products ek saath 'list' view mein dikhte hain.
 */
export const generateItemListSchema = (items: { name: string; url: string; description?: string; image?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": items.length,
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": item.url.startsWith("http") ? item.url : `${SEO_CONFIG.baseUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    "name": item.name,
    ...(item.description && { "description": item.description }),
    "image": item.image || `${SEO_CONFIG.baseUrl}/logo-white.svg`
  }))
});

export const getDefaultSEO = (): SEOMetadata => ({
  title:
    "D-Secure | #1 Data Erasure Software | NIST 800-88 Compliant",
  description:
    "D-Secure is #1 data erasure software for NIST 800-88 & GDPR compliance. Securely wipe HDDs, SSDs & mobile devices with tamper-proof audit certificates.",
  keywords: generateKeywords(),
  canonicalUrl: SEO_CONFIG.baseUrl,
  ogTitle: "D-Secure Tech - #1 Data Erasure Software",
  ogDescription:
    "D-Secure is #1 data erasure software — NIST 800-88, GDPR & HIPAA compliant. Securely wipe HDDs, SSDs and mobile devices with tamper-proof audit certificates.",
  ogImage: SEO_CONFIG.defaultImage,
  ogType: "website",
  fragment: "!",
  twitterCard: "summary_large_image",
  twitterTitle: "D-Secure Tech - #1 Data Erasure Software",
  twitterDescription:
    "Best Data Erasure Software for enterprise compliance and security.",
  twitterImage: SEO_CONFIG.defaultImage,
  structuredData: generateOrganizationSchema(),
});
