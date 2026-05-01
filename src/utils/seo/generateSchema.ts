import { SEO_SITE_CONFIG, SOCIAL_PROFILES } from './seoConfig';

/**
 * Schema Generator Functions — Schema.org JSON-LD generators
 * Google rich results ke liye zaroori hain yeh schemas
 * Validate karo: https://validator.schema.org
 */

/** ─────────────────────────────────────────────────── */
/** 1. Organization Schema — Knowledge Panel ke liye */
/** ─────────────────────────────────────────────────── */
export function DSecureOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
    name: SEO_SITE_CONFIG.siteName,
    alternateName: SEO_SITE_CONFIG.brandName,
    url: SEO_SITE_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: SEO_SITE_CONFIG.logoLight,
      width: '250',
      height: '60',
    },
    description:
      'Leading provider of NIST 800-88 certified enterprise data erasure, sanitization, and lifecycle governance solutions trusted by 1000+ organizations worldwide.',
    foundingDate: SEO_SITE_CONFIG.foundingYear,
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SEO_SITE_CONFIG.supportEmail,
        url: `${SEO_SITE_CONFIG.baseUrl}/contact`,
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SEO_SITE_CONFIG.salesEmail,
        url: `${SEO_SITE_CONFIG.baseUrl}/contact`,
      },
    ],
    areaServed: 'Worldwide',
    knowsAbout: [
      'Data Erasure',
      'Data Sanitization',
      'NIST 800-88',
      'GDPR Compliance',
      'HIPAA Compliance',
      'IT Asset Disposition',
      'Secure Data Destruction',
    ],
  };
}

/** ─────────────────────────────────────────────────── */
/** 2. WebSite Schema — Sitelinks Search Box ke liye */
/** ─────────────────────────────────────────────────── */
export function DSecureWebsiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_SITE_CONFIG.baseUrl}/#website`,
    name: SEO_SITE_CONFIG.siteName,
    url: SEO_SITE_CONFIG.baseUrl,
    description:
      'Enterprise data erasure and lifecycle governance platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_SITE_CONFIG.baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
    },
  };
}

/** ─────────────────────────────────────────────────── */
/** 3. Product/SoftwareApplication Schema */
/** ─────────────────────────────────────────────────── */
interface ProductSchemaOptions {
  slug: string;
  name: string;
  description: string;
  price?: string;
  currency?: string;
  operatingSystem?: string;
  ratingValue?: number;
  reviewCount?: number;
  features?: string[];
  image?: string;
  category?: string;
}

export function DSecureProductSchema(
  opts: ProductSchemaOptions
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'Product'],
    '@id': `${SEO_SITE_CONFIG.baseUrl}/products/${opts.slug}/#product`,
    name: opts.name,
    description: opts.description,
    applicationCategory: opts.category || 'SecurityApplication',
    operatingSystem: opts.operatingSystem || 'Windows, macOS, Linux',
    url: `${SEO_SITE_CONFIG.baseUrl}/products/${opts.slug}`,
    image: opts.image || SEO_SITE_CONFIG.defaultOgImage,
    brand: {
      '@type': 'Brand',
      name: SEO_SITE_CONFIG.brandName,
    },
    publisher: {
      '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
    },
    softwareVersion: '2025.1',
  };

  // Price info add karo agar provided hai
  if (opts.price) {
    schema.offers = {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: opts.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SEO_SITE_CONFIG.baseUrl}/products/${opts.slug}`,
      priceValidUntil: '2026-12-31',
      seller: {
        '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
      },
    };
  }

  // Rating add karo agar provided hai
  if (opts.ratingValue && opts.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(opts.ratingValue),
      reviewCount: String(opts.reviewCount),
      bestRating: '5',
      worstRating: '1',
    };
  }

  // Features add karo
  if (opts.features && opts.features.length > 0) {
    schema.featureList = opts.features.join(', ');
  }

  return schema;
}

/** ─────────────────────────────────────────────────── */
/** 4. BreadcrumbList Schema */
/** ─────────────────────────────────────────────────── */
interface BreadcrumbItem {
  name: string;
  /** Relative ya absolute URL */
  item: string;
}

export function DSecureBreadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => {
      const url = crumb.item.startsWith('http')
        ? crumb.item
        : `${SEO_SITE_CONFIG.baseUrl}${crumb.item.startsWith('/') ? '' : '/'}${crumb.item}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: url,
      };
    }),
  };
}

/** ─────────────────────────────────────────────────── */
/** 5. FAQPage Schema — SERP dropdown snippets ke liye */
/** ─────────────────────────────────────────────────── */
interface FAQItem {
  q: string;
  a: string;
}

export function DSecureFAQSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/** ─────────────────────────────────────────────────── */
/** 6. Article Schema — Blog posts ke liye */
/** ─────────────────────────────────────────────────── */
interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}

export function DSecureArticleSchema(
  opts: ArticleSchemaOptions
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url.startsWith('http')
      ? opts.url
      : `${SEO_SITE_CONFIG.baseUrl}${opts.url}`,
    datePublished: opts.publishedTime,
    dateModified: opts.modifiedTime || opts.publishedTime,
    author: {
      '@type': 'Person',
      name: opts.author || SEO_SITE_CONFIG.siteName,
      url: SEO_SITE_CONFIG.baseUrl,
    },
    publisher: {
      '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
      '@type': 'Organization',
      name: SEO_SITE_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_SITE_CONFIG.logoLight,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: opts.image || SEO_SITE_CONFIG.defaultOgImage,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': opts.url.startsWith('http')
        ? opts.url
        : `${SEO_SITE_CONFIG.baseUrl}${opts.url}`,
    },
    keywords: opts.keywords?.join(', '),
    articleSection: 'Data Security',
    inLanguage: 'en-US',
  };
}

/** ─────────────────────────────────────────────────── */
/** 7. HowTo Schema — Guides/Tutorials ke liye */
/** ─────────────────────────────────────────────────── */
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchemaOptions {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT30M"
  steps: HowToStep[];
  image?: string;
}

export function DSecureHowToSchema(
  opts: HowToSchemaOptions
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    image: opts.image || SEO_SITE_CONFIG.defaultOgImage,
    totalTime: opts.totalTime,
    step: opts.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
    publisher: {
      '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
    },
  };
}

/** ─────────────────────────────────────────────────── */
/** 8. VideoObject Schema — Product videos ke liye */
/** ─────────────────────────────────────────────────── */
interface VideoSchemaOptions {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601
  embedUrl?: string;
  contentUrl?: string;
}

export function DSecureVideoSchema(
  opts: VideoSchemaOptions
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    duration: opts.duration,
    embedUrl: opts.embedUrl,
    contentUrl: opts.contentUrl,
    publisher: {
      '@id': `${SEO_SITE_CONFIG.baseUrl}/#organization`,
    },
  };
}

/** ─────────────────────────────────────────────────── */
/** 9. AggregateRating / Review Schema */
/** ─────────────────────────────────────────────────── */
interface ReviewItem {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
}

export function DSecureReviewSchema(
  productName: string,
  productUrl: string,
  reviews: ReviewItem[]
): Record<string, unknown> {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    url: productUrl.startsWith('http')
      ? productUrl
      : `${SEO_SITE_CONFIG.baseUrl}${productUrl}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.ratingValue),
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: r.datePublished,
    })),
  };
}

/** ─────────────────────────────────────────────────── */
/** 10. LocalBusiness Schema — Office locations ke liye */
/** ─────────────────────────────────────────────────── */
export function DSecureLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SoftwareCompany'],
    '@id': `${SEO_SITE_CONFIG.baseUrl}/#localbusiness`,
    name: SEO_SITE_CONFIG.siteName,
    url: SEO_SITE_CONFIG.baseUrl,
    email: SEO_SITE_CONFIG.supportEmail,
    description:
      'Enterprise data erasure and sanitization software company providing NIST 800-88 certified solutions globally.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.5937',
      longitude: '78.9629',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [...SOCIAL_PROFILES],
    priceRange: '$-$$$',
  };
}
