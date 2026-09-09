import { expect, test, describe } from 'vitest';
import { getSEOForPage } from '../seo';
import vercelConfig from '../../../vercel.json';

// Internal routes aur comparison SEO metadata ke tests
describe('Internal Routes & SEO Link Integrity', () => {
  // ROI Calculator SEO metadata check karna
  test('roi-calculator route ka canonical URL aur title sahi hona chahiye', () => {
    const seo = getSEOForPage('roi-calculator');

    // Title aur canonical URL ka validation
    expect(seo.title).toContain('ROI Calculator');
    expect(seo.canonicalUrl).toBe('https://dsecuretech.com/tools/roi-calculator');
    expect(seo.breadcrumbs).toBeDefined();
    expect(seo.breadcrumbs?.some(b => b.item === '/tools/roi-calculator')).toBe(true);
  });

  // Vs Blancco comparison SEO check karna
  test('vs-blancco comparison route ka canonical URL valid hona chahiye', () => {
    const seo = getSEOForPage('vs-blancco');

    // Canonical aur title ki jaanch
    expect(seo.title).toContain('Blancco');
    expect(seo.canonicalUrl).toBe('https://dsecuretech.com/vs/blancco');
  });

  // Vs BitRaser comparison SEO check karna
  test('vs-bitraser comparison route ka canonical URL valid hona chahiye', () => {
    const seo = getSEOForPage('vs-bitraser');

    // Canonical aur title ki jaanch
    expect(seo.title).toContain('BitRaser');
    expect(seo.canonicalUrl).toBe('https://dsecuretech.com/vs/bitraser');
  });

  // Vs WhiteCanyon comparison SEO check karna
  test('vs-whitecanyon comparison route ka canonical URL valid hona chahiye', () => {
    const seo = getSEOForPage('vs-whitecanyon');

    // Canonical aur title ki jaanch
    expect(seo.title).toContain('WhiteCanyon');
    expect(seo.canonicalUrl).toBe('https://dsecuretech.com/vs/whitecanyon');
  });

  // vercel.json 301 redirects validation
  test('vercel.json me /tools/nist-800-88-checker ka redirect present hona chahiye', () => {
    const redirects = (vercelConfig as { redirects?: Array<{ source: string; destination: string; permanent: boolean }> }).redirects || [];
    
    // Check karna ki broken path ka redirect configured hai
    const nistRedirect = redirects.find(
      (r) => r.source === '/tools/nist-800-88-checker' || r.source === '/tools/nist-800-88-checker/'
    );

    expect(nistRedirect).toBeDefined();
    expect(nistRedirect?.destination).toBe('/tools/nist-800-88-compliance-checker');
    expect(nistRedirect?.permanent).toBe(true);

    // Ye confirm karna ki destination URL redirect list me source ban kar loop create na kare
    const destinationRedirect = redirects.find(
      (r) => r.source === '/tools/nist-800-88-compliance-checker'
    );
    expect(destinationRedirect).toBeUndefined();
  });

  // /support/faq typo redirect validation
  test('vercel.json me /support/faq ka /support/faqs par 301 redirect present hona chahiye', () => {
    const redirects = (vercelConfig as { redirects?: Array<{ source: string; destination: string; permanent: boolean }> }).redirects || [];

    const faqRedirect = redirects.find((r) => r.source === '/support/faq');
    expect(faqRedirect).toBeDefined();
    expect(faqRedirect?.destination).toBe('/support/faqs');
    expect(faqRedirect?.permanent).toBe(true);
  });
});
