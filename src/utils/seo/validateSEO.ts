/**
 * SEO Validator — Pre-render checks for SEO compliance
 * Development mein use karo — production build pe run nahi hoga
 * Console mein warnings aayenge agar kuch missing hai
 */

/** SEO metadata minimum requirements */
interface SEOCheckInput {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string;
}

interface SEOValidationResult {
  passed: boolean;
  warnings: string[];
  errors: string[];
  score: number; // 0-100
}

const MAX_TITLE = 60;
const MIN_TITLE = 30;
const MAX_DESC = 160;
const MIN_DESC = 120;

/**
 * SEO metadata validate karo aur report do
 * Only development mein active hota hai
 */
export function validateSEO(input: SEOCheckInput): SEOValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  let score = 100;

  // ── Title checks ──────────────────────────────────
  if (!input.title) {
    errors.push('❌ Title missing — required for SEO');
    score -= 25;
  } else {
    if (input.title.length > MAX_TITLE) {
      warnings.push(
        `⚠️ Title too long: ${input.title.length} chars (max ${MAX_TITLE})`
      );
      score -= 5;
    }
    if (input.title.length < MIN_TITLE) {
      warnings.push(
        `⚠️ Title too short: ${input.title.length} chars (min ${MIN_TITLE})`
      );
      score -= 5;
    }
    if (!input.title.includes('D-Secure') && !input.title.includes('dsecure')) {
      warnings.push('⚠️ Title does not contain brand name "D-Secure"');
      score -= 3;
    }
  }

  // ── Description checks ────────────────────────────
  if (!input.description) {
    errors.push('❌ Meta description missing — required for SEO');
    score -= 25;
  } else {
    if (input.description.length > MAX_DESC) {
      warnings.push(
        `⚠️ Description too long: ${input.description.length} chars (max ${MAX_DESC})`
      );
      score -= 5;
    }
    if (input.description.length < MIN_DESC) {
      warnings.push(
        `⚠️ Description too short: ${input.description.length} chars (recommended ${MIN_DESC}+)`
      );
      score -= 3;
    }
  }

  // ── Canonical URL checks ──────────────────────────
  if (!input.canonicalUrl) {
    errors.push('❌ Canonical URL missing — duplicate content risk');
    score -= 15;
  } else {
    if (!input.canonicalUrl.startsWith('https://dsecuretech.com')) {
      warnings.push('⚠️ Canonical URL should start with https://dsecuretech.com');
      score -= 5;
    }
    if (input.canonicalUrl.includes('?') || input.canonicalUrl.includes('#')) {
      warnings.push('⚠️ Canonical URL should not contain query params or hash');
      score -= 5;
    }
  }

  // ── OG Image check ───────────────────────────────
  if (!input.ogImage) {
    warnings.push('⚠️ OG image missing — social shares will use default');
    score -= 5;
  }

  // ── Keywords check ───────────────────────────────
  if (!input.keywords || input.keywords.trim() === '') {
    warnings.push('⚠️ Keywords missing — recommended for older crawlers');
    score -= 2;
  }

  const passed = errors.length === 0;

  // Only development mein log karo
  if (import.meta.env.DEV) {
    if (errors.length > 0 || warnings.length > 0) {
      const label = `[SEO Validator] ${input.title?.slice(0, 30) || 'Unknown Page'}`;
      if (errors.length > 0) {
        console.group(`%c${label} — ERRORS`, 'color: #ef4444; font-weight: bold');
        errors.forEach(e => console.error(e));
        console.groupEnd();
      }
      if (warnings.length > 0) {
        console.group(`%c${label} — Warnings`, 'color: #f59e0b');
        warnings.forEach(w => console.warn(w));
        console.groupEnd();
      }
    }
  }

  return { passed, warnings, errors, score: Math.max(0, score) };
}

/**
 * Schema.org JSON-LD validate karo (basic check)
 * Full validation ke liye: https://validator.schema.org
 */
export function validateSchema(schema: Record<string, unknown>): boolean {
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    if (import.meta.env.DEV) {
      console.warn('[Schema Validator] Missing or invalid @context');
    }
    return false;
  }
  if (!schema['@type']) {
    if (import.meta.env.DEV) {
      console.warn('[Schema Validator] Missing @type');
    }
    return false;
  }
  return true;
}
