/**
 * SEO Utility Module — Barrel Export
 * Saare SEO utilities ek jagah se import karo:
 *
 * import { DSecureProductSchema, validateSEO } from '@/utils/seo';
 *
 * NOTE: Yeh existing seo.core.ts, seo.products.ts etc. se ALAG hai.
 * Yeh new modular directory hai advanced schema builders ke liye.
 */

export * from './seoConfig';
export * from './generateMetaTags';
export * from './generateSchema';
export * from './validateSEO';
