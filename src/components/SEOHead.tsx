import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEOMetadata, formatStructuredData, generateBreadcrumbSchema } from '@/utils/seo';

/** SEOHead component ke liye supported languages */
const SUPPORTED_LANGUAGES = ['en', 'hi', 'es', 'fr', 'de', 'ja', 'zh'] as const;

/** Google/Bing verification codes — environment variables se aate hain */
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
  /** Article publish date — blog pages ke liye */
  publishedTime?: string;
  /** Article last modified date */
  modifiedTime?: string;
  /** Article author */
  author?: string;
  /** Custom hreflang entries — auto-generated honge agar nahi diye */
  alternateLanguages?: HreflangEntry[];
  /** Noindex override — private/auth pages ke liye */
  noindex?: boolean;
}

/**
 * SEOHead Component - Production-ready SEO meta tags for all pages
 * Hreflang (7 languages), Open Graph, Twitter Card, JSON-LD, Article dates
 * Uses react-helmet-async for efficient meta tag management
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  title,
  description,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author,
  alternateLanguages,
  noindex,
}) => {
  const location = useLocation();
  const effectiveSeo: SEOMetadata = seo || {
    title: title || '',
    description: description || '',
    canonicalUrl: canonicalUrl || `https://dsecuretech.com${location.pathname}`,
    keywords: '',
  };

  // Props se noindex override karo agar provide kiya hai
  const isNoindex = noindex ?? effectiveSeo.noindex ?? false;

  // Article metadata — blog posts ke liye
  const effectiveAuthor = author || 'D-Secure Tech';
  const effectivePublishedTime = publishedTime || '';
  const effectiveModifiedTime = modifiedTime || '';

  /**
   * Hreflang URLs auto-generate karo — SEO duplicate content penalty se bachne ke liye
   * Format: https://dsecuretech.com/{lang}/path ya x-default ke liye without lang prefix
   */
  const generateHreflangUrls = (canonical: string): HreflangEntry[] => {
    if (alternateLanguages && alternateLanguages.length > 0) {
      return alternateLanguages;
    }
    // Auto-generate karo canonical URL se path extract karke
    const baseUrl = 'https://dsecuretech.com';
    const path = canonical.replace(baseUrl, '') || '/';
    return SUPPORTED_LANGUAGES.map(lang => ({
      lang,
      url: lang === 'en' ? canonical : `${baseUrl}/${lang}${path}`,
    }));
  };

  // Strict canonical URL normalization — duplicate page errors rokne ke liye
  const normalizeCanonical = (rawUrl: string): string => {
    let url = rawUrl.trim();

    // Agar relative path hai to absolute banao
    if (url && !url.startsWith('http')) {
      const prefix = url.startsWith('/') ? '' : '/';
      url = `https://dsecuretech.com${prefix}${url}`;
    }

    // Agar koi URL nahi mila to homepage default do
    if (!url) return 'https://dsecuretech.com/';

    // Lowercase karo (domain + path dono)
    url = url.toLowerCase();

    // www hata do — hamesha non-www canonical use karo
    url = url.replace('://www.dsecuretech.com', '://dsecuretech.com');

    // Double slashes hatao (protocol ke baad waali chhod ke)
    url = url.replace(/(https?:\/\/)|(\/{2,})/g, (match, protocol) => protocol || '/');

    // Query params aur hash hatao — canonical mein nahi chahiye
    const queryIndex = url.indexOf('?');
    if (queryIndex !== -1) url = url.substring(0, queryIndex);
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) url = url.substring(0, hashIndex);

    // Homepage ke liye trailing slash force karo, baaki sabse hatao
    const stripped = url.replace(/\/$/, '');
    if (stripped === 'https://dsecuretech.com') {
      return stripped + '/';
    }
    return stripped;
  };

  const finalCanonical = normalizeCanonical(effectiveSeo.canonicalUrl || '');

  // Helper to ensure URLs are absolute for social media crawlers
  const ensureAbsoluteUrl = (url?: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const prefix = url.startsWith('/') ? '' : '/';
    return `https://dsecuretech.com${prefix}${url}`;
  };

  const finalOgImage = ensureAbsoluteUrl(effectiveSeo.ogImage || 'https://dsecuretech.com/logo-white.svg');
  const finalTwitterImage = ensureAbsoluteUrl(effectiveSeo.twitterImage || effectiveSeo.ogImage || 'https://dsecuretech.com/logo-white.svg');

  const hreflangUrls = generateHreflangUrls(finalCanonical);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{effectiveSeo.title}</title>
        <meta name="description" content={effectiveSeo.description} />
        {effectiveSeo.keywords && (
          <meta name="keywords" content={effectiveSeo.keywords} />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonical} />

        {/* Hreflang — 7 languages ke liye international SEO */}
        {hreflangUrls.map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        {/* x-default — language-neutral canonical */}
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

        {/* Article-specific Open Graph tags — blog posts ke liye */}
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

        {/* Robots — noindex support with enhanced directives */}
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

        {/* AI Crawler Directives — Generative Engine Optimization (GEO) */}
        <meta name="GPTBot" content="index, follow" />
        <meta name="ClaudeBot" content="index, follow" />
        <meta name="PerplexityBot" content="index, follow" />
        <meta name="Google-Extended" content="index, follow" />

        {/* Author & Publication */}
        <meta name="author" content={effectiveAuthor} />
        {effectivePublishedTime && (
          <meta name="article:published_time" content={effectivePublishedTime} />
        )}
        {effectiveModifiedTime && (
          <meta name="dcterms.modified" content={effectiveModifiedTime} />
        )}

        {/* Site Verification — .env mein set karo */}
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

        {/* Structured Data — JSON-LD schemas */}
        {effectiveSeo.structuredData && (
          Array.isArray(effectiveSeo.structuredData)
            ? effectiveSeo.structuredData.map((schema, index) => (
                <script key={`schema-${index}`} type="application/ld+json">
                  {formatStructuredData(schema)}
                </script>
              ))
            : (
              <script type="application/ld+json">
                {formatStructuredData(effectiveSeo.structuredData)}
              </script>
            )
        )}

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
      </Helmet>
      {/* SSR SEO Data Bridge — React 19 streaming mein Helmet context populate nahi hota,
          isliye ye hidden div prerender.js ko page-specific SEO data deta hai.
          JSON-LD bhi data attribute mein serialize karo taaki prerender.js inhe <head> mein inject kare
          aur body mein duplicate <script> tags na rahe */}
      <div
        data-seo-bridge=""
        data-seo-title={effectiveSeo.title}
        data-seo-description={effectiveSeo.description}
        data-seo-canonical={finalCanonical}
        data-seo-og-title={effectiveSeo.ogTitle || effectiveSeo.title}
        data-seo-og-description={effectiveSeo.ogDescription || effectiveSeo.description}
        data-seo-og-image={finalOgImage}
        data-seo-og-type={effectiveSeo.ogType || 'website'}
        data-seo-twitter-image={finalTwitterImage}
        data-seo-keywords={effectiveSeo.keywords || ''}
        data-seo-schemas={effectiveSeo.structuredData ? JSON.stringify(
          Array.isArray(effectiveSeo.structuredData)
            ? effectiveSeo.structuredData
            : [effectiveSeo.structuredData]
        ) : ''}
        data-seo-breadcrumbs={effectiveSeo.breadcrumbs && effectiveSeo.breadcrumbs.length > 0
          ? JSON.stringify(generateBreadcrumbSchema(effectiveSeo.breadcrumbs))
          : ''}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </>
  );
};

export default SEOHead;
