// Vercel 301 Redirect Filtering Utility
// Ye utility vercel.json ke redirect URLs ko identify aur filter karti hai,
// taaki sitemap.xml mein sirf 200 OK canonical URLs hi include hon aur GSC errors na aayein.

/**
 * Vercel redirect rule structure ka interface
 */
export interface VercelRedirectRule {
  source: string;
  destination: string;
  permanent?: boolean;
}

/**
 * Path ko standard format mein convert karta hai:
 * - Single leading slash ensure karta hai
 * - Trailing slash hatata hai (jab tak root '/' na ho)
 */
export function normalizeUrlPath(urlPath: string): string {
  if (!urlPath) return "/";
  let clean = urlPath.startsWith("/") ? urlPath : "/" + urlPath;
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

/**
 * Check karta hai ki koi specific route path Vercel ke source pattern se match hota hai ya nahi.
 * Handle karta hai:
 * 1. Exact string matches (jaise '/pricing', '/blog/deployment-options')
 * 2. Wildcards aur named parameters (jaise ':path*', ':param+', ':param')
 * 3. Regex group patterns (jaise '/(de|fr|es|zh|ja)(/.*)?')
 */
export function matchesRedirect(sourcePattern: string, routePath: string): boolean {
  const cleanRoute = normalizeUrlPath(routePath);
  const cleanSource = normalizeUrlPath(sourcePattern);

  // Exact match case
  if (cleanRoute === cleanSource) {
    return true;
  }

  // Regex ya parameter matching
  try {
    // Vercel path parameter syntax ko standard regular expression mein convert karo
    const regexStr = cleanSource
      .replace(/:[a-zA-Z0-9_]+\*/g, ".*")
      .replace(/:[a-zA-Z0-9_]+\+/g, ".+")
      .replace(/:[a-zA-Z0-9_]+/g, "[^/]+");

    const regex = new RegExp(`^${regexStr}$`);
    return regex.test(cleanRoute);
  } catch {
    // Agar pattern invalid regex banaye toh fallback exact equality
    return cleanRoute === cleanSource;
  }
}

/**
 * Check karta hai ki diya gaya route path kisi bhi redirect rule se match karta hai ya nahi
 */
export function isRedirectUrl(
  routePath: string,
  redirects: readonly VercelRedirectRule[]
): boolean {
  return redirects.some((rule) => matchesRedirect(rule.source, routePath));
}

/**
 * Routes array se sabhi redirect hone wale URLs ko filter out karta hai
 * Sirf 200 OK canonical routes hi return hote hain
 */
export function filterRedirectUrls(
  routes: readonly string[],
  redirects: readonly VercelRedirectRule[]
): string[] {
  return routes.filter((route) => !isRedirectUrl(route, redirects));
}
