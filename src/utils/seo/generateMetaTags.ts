/**
 * Meta Tag Generators — Consistent meta tag generation helpers
 * Har page ke liye title, description, keywords format karo
 */

/** Maximum allowed lengths — Google guidelines ke according */
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;

/**
 * Title suffix automatically add karo
 * Example: "Drive Eraser Software" → "Drive Eraser Software | D-Secure"
 */
export function formatPageTitle(
  baseTitle: string,
  suffix = '| D-Secure'
): string {
  const full = `${baseTitle} ${suffix}`;
  if (full.length > MAX_TITLE_LENGTH + 10) {
    // Truncate with ellipsis if too long
    return `${baseTitle.slice(0, MAX_TITLE_LENGTH - suffix.length - 4)}... ${suffix}`;
  }
  return full;
}

/**
 * Description length validate karo aur trim karo
 * 150-160 chars optimal hai Google ke liye
 */
export function formatMetaDescription(description: string): string {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  // Last complete word pe truncate karo
  const truncated = description.slice(0, MAX_DESCRIPTION_LENGTH - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace)}...`;
}

/**
 * Keyword string generate karo — duplicates remove karo
 * Array ya comma-separated string dono accept karo
 */
export function buildKeywordString(keywords: string | string[]): string {
  const arr = Array.isArray(keywords)
    ? keywords
    : keywords.split(',').map(k => k.trim());
  // Deduplicate (case-insensitive), empty strings hatao
  const unique = [...new Set(arr.map(k => k.toLowerCase()))].filter(Boolean);
  return unique.join(', ');
}

/**
 * Canonical URL normalize karo — trailing slash consistency ke liye
 */
export function normalizeCanonicalUrl(url: string): string {
  const BASE = 'https://dsecuretech.com';
  let result = url.trim();

  // Relative path ko absolute banao
  if (!result.startsWith('http')) {
    const slash = result.startsWith('/') ? '' : '/';
    result = `${BASE}${slash}${result}`;
  }

  // Lowercase karo
  result = result.toLowerCase();

  // www hatao
  result = result.replace('://www.dsecuretech.com', '://dsecuretech.com');

  // Query params aur hash hatao
  const qIdx = result.indexOf('?');
  if (qIdx !== -1) result = result.slice(0, qIdx);
  const hIdx = result.indexOf('#');
  if (hIdx !== -1) result = result.slice(0, hIdx);

  // Trailing slash: homepage ke liye add karo, baaki se hatao
  const stripped = result.replace(/\/$/, '');
  if (stripped === BASE) return `${stripped}/`;
  return stripped;
}

/**
 * OG image URL ensure karo ki absolute hai aur Cloudinary-optimized hai
 */
export function buildOgImageUrl(
  image?: string,
  fallback = 'https://dsecuretech.com/og-image.png'
): string {
  if (!image) return fallback;
  if (image.startsWith('http')) return image;
  const slash = image.startsWith('/') ? '' : '/';
  return `https://dsecuretech.com${slash}${image}`;
}

/**
 * JSON-LD schema safely serialize karo
 * XSS prevention ke liye `<` escape karo
 */
export function serializeSchema(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

/**
 * Article reading time estimate karo (blog posts ke liye)
 * Avg reading speed: 200 words/minute
 */
export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
