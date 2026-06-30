import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEOMetadata, formatStructuredData, generateBreadcrumbSchema } from '@/utils/seo';

/**
 * SEOHeadNative — POC variant of SEOHead that uses React 19 native document
 * metadata instead of react-helmet-async.
 *
 * Difference from SEOHead:
 *  - No <Helmet> wrapper — tags are rendered as plain React 19 elements that
 *    React hoists (client) / emits (SSR) natively.
 *  - No data-seo-bridge hidden div.
 *  - JSON-LD is rendered inline as <script type="application/ld+json">; the SSG
 *    prerender step already scans the body for these and lifts them to <head>.
 *
 * Logic (canonical/hreflang/og/FAQ-merge) is intentionally identical to SEOHead
 * so the only variable under test is the helmet-vs-native rendering mechanism.
 */

const SUPPORTED_LANGUAGES = ['en', 'hi', 'es', 'fr', 'de', 'ja', 'zh'] as const;

const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const BING_SITE_VERIFICATION = import.meta.env.VITE_BING_SITE_VERIFICATION || '';

interface HreflangEntry {
  lang: string;
  url: string;
}

interface SEOHeadProps {
  seo?: SEOMetadata;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  alternateLanguages?: HreflangEntry[];
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

/** FAQPage schemas ko merge + dedupe karta hai — ek hi FAQPage block emit ho. */
function mergeAndDeduplicateSchemas(
  schemas: Record<string, unknown>[]
): Record<string, unknown>[] {
  const faqSchemas = schemas.filter(s => s['@type'] === 'FAQPage');
  const otherSchemas = schemas.filter(s => s['@type'] !== 'FAQPage');

  if (faqSchemas.length === 0) return otherSchemas;

  const seenQuestions = new Set<string>();
  const mergedEntities: Record<string, unknown>[] = [];

  for (const faqSchema of faqSchemas) {
    const entities = faqSchema['mainEntity'];
    if (!Array.isArray(entities)) continue;
    for (const entity of entities) {
      const q = entity as Record<string, unknown>;
      const questionName = (q['name'] as string) || '';
      if (seenQuestions.has(questionName)) continue;
      seenQuestions.add(questionName);
      mergedEntities.push(q);
    }
  }

  const singleFAQSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mergedEntities,
  };

  return [...otherSchemas, singleFAQSchema];
}

/** seo.structuredData + directStructuredData ko ek flat array mein normalize karta hai. */
function collectAllSchemas(
  effectiveSeoSchemas: Record<string, unknown> | Record<string, unknown>[] | undefined,
  directSchemas: Record<string, unknown> | Record<string, unknown>[] | undefined
): Record<string, unknown>[] {
  const all: Record<string, unknown>[] = [];
  if (effectiveSeoSchemas) {
    if (Array.isArray(effectiveSeoSchemas)) all.push(...effectiveSeoSchemas);
    else all.push(effectiveSeoSchemas);
  }
  if (directSchemas) {
    if (Array.isArray(directSchemas)) all.push(...directSchemas);
    else all.push(directSchemas);
  }
  return all;
}

export const SEOHeadNative: React.FC<SEOHeadProps> = ({
  seo,
  title,
  description,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author,
  alternateLanguages,
  noindex,
  structuredData: directStructuredData,
}) => {
  const location = useLocation();
  const effectiveSeo: SEOMetadata = seo || {
    title: title || '',
    description: description || '',
    canonicalUrl: canonicalUrl || `https://dsecuretech.com${location.pathname}`,
    keywords: '',
  };

  const isNoindex = noindex ?? effectiveSeo.noindex ?? false;

  const effectiveAuthor = author || 'D-Secure Tech';
  const effectivePublishedTime = publishedTime || '';
  const effectiveModifiedTime = modifiedTime || '';

  const generateHreflangUrls = (canonical: string): HreflangEntry[] => {
    if (alternateLanguages && alternateLanguages.length > 0) {
      return alternateLanguages;
    }
    const baseUrl = 'https://dsecuretech.com';
    const path = canonical.replace(baseUrl, '') || '/';
    return SUPPORTED_LANGUAGES.map(lang => ({
      lang,
      url: lang === 'en' ? canonical : `${baseUrl}/${lang}${path}`,
    }));
  };

  const normalizeCanonical = (rawUrl: string): string => {
    let url = rawUrl.trim();
    if (url && !url.startsWith('http')) {
      const prefix = url.startsWith('/') ? '' : '/';
      url = `https://dsecuretech.com${prefix}${url}`;
    }
    if (!url) return 'https://dsecuretech.com/';
    url = url.toLowerCase();
    url = url.replace('://www.dsecuretech.com', '://dsecuretech.com');
    url = url.replace(/(https?:\/\/)|(\/\/{2,})/g, (match, protocol) => protocol || '/');
    const queryIndex = url.indexOf('?');
    if (queryIndex !== -1) url = url.substring(0, queryIndex);
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) url = url.substring(0, hashIndex);
    const stripped = url.replace(/\/$/, '');
    if (stripped === 'https://dsecuretech.com') {
      return stripped + '/';
    }
    return stripped;
  };

  const finalCanonical = normalizeCanonical(effectiveSeo.canonicalUrl || `https://dsecuretech.com${location.pathname}`);

  const ensureAbsoluteUrl = (url?: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const prefix = url.startsWith('/') ? '' : '/';
    return `https://dsecuretech.com${prefix}${url}`;
  };

  const finalOgImage = ensureAbsoluteUrl(effectiveSeo.ogImage || 'https://dsecuretech.com/og-default.png');
  const finalTwitterImage = ensureAbsoluteUrl(effectiveSeo.twitterImage || effectiveSeo.ogImage || 'https://dsecuretech.com/og-default.png');

  const hreflangUrls = generateHreflangUrls(finalCanonical);

  const rawSchemas = collectAllSchemas(
    effectiveSeo.structuredData as Record<string, unknown> | Record<string, unknown>[] | undefined,
    directStructuredData as Record<string, unknown> | Record<string, unknown>[] | undefined
  );
  const finalSchemas = mergeAndDeduplicateSchemas(rawSchemas);

  // React 19 native: koi <Helmet> wrapper nahi — tags direct Fragment mein.
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{effectiveSeo.title}</title>
      <meta name="description" content={effectiveSeo.description} />
      {effectiveSeo.keywords && (
        <meta name="keywords" content={effectiveSeo.keywords} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Hreflang — 7 languages */}
      {hreflangUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={effectiveSeo.ogType || 'website'} />
      <meta property="og:title" content={effectiveSeo.ogTitle || effectiveSeo.title} />
      <meta property="og:description" content={effectiveSeo.ogDescription || effectiveSeo.description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={effectiveSeo.title} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content="D-Secure Tech" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG tags */}
      {effectiveSeo.ogType === 'article' && effectivePublishedTime && (
        <meta property="article:published_time" content={effectivePublishedTime} />
      )}
      {effectiveSeo.ogType === 'article' && effectiveModifiedTime && (
        <meta property="article:modified_time" content={effectiveModifiedTime} />
      )}
      {effectiveSeo.ogType === 'article' && (
        <meta property="article:author" content={effectiveAuthor} />
      )}
      {effectiveSeo.ogType === 'article' && (
        <meta property="article:section" content="Data Security" />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={effectiveSeo.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={effectiveSeo.twitterTitle || effectiveSeo.title} />
      <meta name="twitter:description" content={effectiveSeo.twitterDescription || effectiveSeo.description} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:image:alt" content={effectiveSeo.title} />
      <meta name="twitter:creator" content="@D_SecureTech" />
      <meta name="twitter:site" content="@D_SecureTech" />

      {/* Robots */}
      <meta
        name="robots"
        content={
          isNoindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="googlebot" content={isNoindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={isNoindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* AI Crawler Directives */}
      <meta name="GPTBot" content="noindex, nofollow" />
      <meta name="ClaudeBot" content="noindex, nofollow" />
      <meta name="Google-Extended" content="noindex, nofollow" />
      <meta name="anthropic-ai" content="noindex, nofollow" />
      <meta name="cohere-ai" content="noindex, nofollow" />
      <meta name="OAI-SearchBot" content={isNoindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="PerplexityBot" content={isNoindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="YouBot" content={isNoindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Author & Publication */}
      <meta name="author" content={effectiveAuthor} />
      {effectivePublishedTime && (
        <meta name="article:published_time" content={effectivePublishedTime} />
      )}
      {effectiveModifiedTime && (
        <meta name="dcterms.modified" content={effectiveModifiedTime} />
      )}

      {/* Site Verification */}
      {GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      )}
      {BING_SITE_VERIFICATION && (
        <meta name="msvalidate.01" content={BING_SITE_VERIFICATION} />
      )}

      {/* Additional SEO signals */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="category" content="Data Security Software" />

      {/* Structured Data — deduped/merged single pass */}
      {finalSchemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {formatStructuredData(schema)}
        </script>
      ))}

      {/* BreadcrumbList Schema */}
      {effectiveSeo.breadcrumbs && effectiveSeo.breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {formatStructuredData(generateBreadcrumbSchema(effectiveSeo.breadcrumbs))}
        </script>
      )}

      {/* Performance & compatibility */}
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </>
  );
};

export default SEOHeadNative;
