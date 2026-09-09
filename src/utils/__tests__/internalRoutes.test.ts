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

  // request-demo route ka SEO metadata check karna
  test('request-demo route ka canonical URL aur title valid hona chahiye', () => {
    const seo = getSEOForPage('request-demo');

    // Title aur canonical URL ka validation
    expect(seo.title).toContain('Schedule Live Demo');
    expect(seo.canonicalUrl).toBe('https://dsecuretech.com/request-demo');
    expect(seo.breadcrumbs).toBeDefined();
    expect(seo.breadcrumbs?.some(b => b.item === '/request-demo')).toBe(true);
  });

  // Comparison report se identify huye legacy routes ka 301 redirect validation
  test('vercel.json me report ke sabhi legacy routes ke permanent 301 redirects hone chahiye', () => {
    const redirects = (vercelConfig as { redirects?: Array<{ source: string; destination: string; permanent: boolean }> }).redirects || [];
    const expectedLegacyRedirects = [
      { source: '/compliance/ieee-2883', destination: '/blog/ieee-2883-complete-guide' },
      { source: '/services/cryptographic-erasure', destination: '/blog/cryptographic-erase' },
      { source: '/services/macos-erasure', destination: '/solutions/mac-erasure' },
      { source: '/services/windows-erasure', destination: '/products/drive-eraser' },
      { source: '/support/api-docs', destination: '/support/manual/api-integration' },
      { source: '/support/integrations-hub', destination: '/integrations' },
      { source: '/implementation', destination: '/support/manual/implementation-practices' },
      { source: '/solutions/financial-services', destination: '/solutions/data-erasure-banking-finance' },
      { source: '/careers', destination: '/about' },
    ];

    expectedLegacyRedirects.forEach(({ source, destination }) => {
      const matched = redirects.find((r) => r.source === source);
      expect(matched).toBeDefined();
      expect(matched?.destination).toBe(destination);
      expect(matched?.permanent).toBe(true);
    });
  });
});
