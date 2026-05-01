/**
 * SEO Configuration — Central Brand & Site Config
 * Yahan se saare SEO-related constants aate hain
 * Kabhi bhi hardcode mat karo in values ko pages mein
 */
export const SEO_SITE_CONFIG = {
  /** Company name */
  siteName: 'D-Secure Tech',
  /** Full brand name */
  brandName: 'D-Secure',
  /** Production domain — trailing slash nahi */
  baseUrl: 'https://dsecuretech.com',
  /** Default OG/Twitter share image */
  defaultOgImage: 'https://dsecuretech.com/og-image.png',
  /** Logo paths */
  logoLight: 'https://dsecuretech.com/logo-white.svg',
  logoDark: 'https://dsecuretech.com/logo-black.svg',
  /** Primary locale */
  defaultLocale: 'en_US',
  /** Twitter/X handle */
  twitterHandle: '@D_SecureTech',
  /** LinkedIn */
  linkedIn: 'https://linkedin.com/company/dsecuretech',
  /** Founding year */
  foundingYear: '2025',
  /** Support email */
  supportEmail: 'support@dsecuretech.com',
  /** Sales email */
  salesEmail: 'sales@dsecuretech.com',
} as const;

/**
 * Page type priority — sitemap generation ke liye
 */
export const SITEMAP_PRIORITIES = {
  home: 1.0,
  product: 0.9,
  solution: 0.8,
  compliance: 0.8,
  blog: 0.6,
  manual: 0.5,
  support: 0.6,
  legal: 0.3,
} as const;

/**
 * Changefreq values — sitemap mein use hote hain
 */
export const SITEMAP_CHANGEFREQ = {
  home: 'weekly',
  product: 'monthly',
  solution: 'monthly',
  blog: 'monthly',
  manual: 'yearly',
  legal: 'yearly',
} as const;

/**
 * Supported languages for hreflang tags
 * Order: default first (en), phir alphabetical
 */
export const SUPPORTED_LOCALES = [
  { lang: 'en', label: 'English', hreflang: 'en' },
  { lang: 'de', label: 'Deutsch', hreflang: 'de' },
  { lang: 'es', label: 'Español', hreflang: 'es' },
  { lang: 'fr', label: 'Français', hreflang: 'fr' },
  { lang: 'hi', label: 'हिन्दी', hreflang: 'hi' },
  { lang: 'ja', label: '日本語', hreflang: 'ja' },
  { lang: 'zh', label: '中文', hreflang: 'zh' },
] as const;

/**
 * Compliance standards — saari pages mein refer karo
 * Keyword stuffing mat karo, structured use karo
 */
export const COMPLIANCE_STANDARDS = [
  'NIST 800-88',
  'DoD 5220.22-M',
  'GDPR',
  'HIPAA',
  'SOX',
  'PCI DSS',
  'ISO 27001',
  'Common Criteria EAL 4+',
  'FIPS 140-2',
  'FedRAMP',
  'R2',
  'e-Stewards',
] as const;

/**
 * Social profile URLs — Organization schema mein use karo
 */
export const SOCIAL_PROFILES = [
  'https://twitter.com/D_SecureTech',
  'https://linkedin.com/company/dsecuretech',
  'https://github.com/dsecuretech',
  'https://youtube.com/@dsecuretech',
  'https://facebook.com/dsecuretech',
] as const;

/**
 * Product catalog — canonical slugs aur display names
 */
export const PRODUCT_CATALOG = [
  {
    slug: 'drive-eraser',
    name: 'D-Secure Drive Eraser',
    price: '25.00',
    currency: 'USD',
    path: '/products/drive-eraser',
  },
  {
    slug: 'file-eraser',
    name: 'D-Secure File Eraser',
    price: '40.00',
    currency: 'USD',
    path: '/products/file-eraser',
  },
  {
    slug: 'smartphone-eraser',
    name: 'D-Secure Smartphone Eraser',
    price: '1.00',
    currency: 'USD',
    path: '/products/smartphone-eraser',
  },
  {
    slug: 'hardware-diagnostics',
    name: 'D-Secure Hardware Diagnostics',
    price: '10.00',
    currency: 'USD',
    path: '/products/hardware-diagnostics',
  },
  {
    slug: 'hard-drive-monitor',
    name: 'D-Secure Smart Diagnostic',
    price: '20.00',
    currency: 'USD',
    path: '/products/hard-drive-monitor',
  },
  {
    slug: 'freeze-state',
    name: 'D-Secure Freeze State',
    price: '80.00',
    currency: 'USD',
    path: '/products/freeze-state',
  },
  {
    slug: 'lun-eraser',
    name: 'D-Secure LUN Eraser',
    price: '0.00',
    currency: 'USD',
    path: '/products/lun-eraser',
  },
  {
    slug: 'virtual-machine-eraser',
    name: 'D-Secure Virtual Machine Eraser',
    price: '20.00',
    currency: 'USD',
    path: '/products/virtual-machine-eraser',
  },
  {
    slug: 'forensic-imaging',
    name: 'D-Secure Forensic Imaging',
    price: '1053.00',
    currency: 'USD',
    path: '/products/forensic-imaging',
  },
  {
    slug: 'file-eraser-network',
    name: 'D-Secure File Eraser Network',
    price: '50.00',
    currency: 'USD',
    path: '/products/file-eraser-network',
  },
] as const;
