import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import SEOHead from "../SEOHead";
import SEOHeadNative from "../SEOHeadNative";
import { describe, it, expect } from "vitest";
import React from "react";

// SEOHead FAQPage deduplication ke tests
describe("SEOHead FAQPage Deduplication", () => {
  // Test case check karta hai ki multiple FAQPage schemas ko merge kiya jata hai ya nahi
  it("should merge multiple FAQPage schemas into a single schema block", () => {
    const faqSchema1 = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Question 1?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Answer 1"
          }
        }
      ]
    };

    const faqSchema2 = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Question 2?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Answer 2"
          }
        },
        // Duplicate question check
        {
          "@type": "Question",
          name: "Question 1?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Answer 1 duplicate"
          }
        }
      ]
    };

    const { container } = render(
      <BrowserRouter>
        <HelmetProvider>
          <SEOHead
            seo={{
              title: "Test Page",
              description: "Test Description",
              keywords: "test",
              canonicalUrl: "https://dsecuretech.com/test",
              structuredData: [faqSchema1]
            }}
            structuredData={[faqSchema2]}
          />
        </HelmetProvider>
      </BrowserRouter>
    );

    // DOM se SEO bridge element extract karna
    const bridgeEl = container.querySelector("[data-seo-bridge]");
    expect(bridgeEl).not.toBeNull();

    const schemasAttr = bridgeEl?.getAttribute("data-seo-schemas");
    expect(schemasAttr).toBeTruthy();

    const schemas = JSON.parse(schemasAttr || "[]");
    
    // Yeh check karna ki list mein sirf ek hi FAQPage schema bacha ho
    const faqPages = schemas.filter((s: any) => s["@type"] === "FAQPage");
    expect(faqPages.length).toBe(1);

    // Yeh check karna ki questions merge aur deduplicate ho chuke hain
    const mainEntity = faqPages[0].mainEntity;
    expect(mainEntity.length).toBe(2);
    expect(mainEntity[0].name).toBe("Question 1?");
    expect(mainEntity[1].name).toBe("Question 2?");
  });

  // Worldwide hreflang tags (en aur x-default) ke tests - SEOHead
  it("should render worldwide hreflangs in SEOHead (hrefLang='en' aur hrefLang='x-default')", () => {
    // canUseDOM = false se Helmet context mein links synchronously populate karta hai
    HelmetProvider.canUseDOM = false;

    // HelmetServerState ke anusaar context banayein
    const helmetContext: { helmet?: import("react-helmet-async").HelmetServerState } = {};
    render(
      <BrowserRouter>
        <HelmetProvider context={helmetContext}>
          <SEOHead
            title="Enterprise Data Erasure"
            description="Enterprise solution"
            canonicalUrl="https://dsecuretech.com/solutions/enterprise"
          />
        </HelmetProvider>
      </BrowserRouter>
    );

    const linkElements = (helmetContext.helmet?.link?.toComponent() || []) as React.ReactElement<{ rel: string; hrefLang?: string; href?: string }>[];
    const alternateLinks = linkElements.filter(
      (el) => el.props.rel === "alternate" && el.props.hrefLang
    );

    // Sirf 2 worldwide hreflangs hone chahiye: en aur x-default
    expect(alternateLinks.length).toBe(2);

    const enLink = alternateLinks.find((el) => el.props.hrefLang === "en");
    const xDefaultLink = alternateLinks.find((el) => el.props.hrefLang === "x-default");

    expect(enLink).toBeDefined();
    expect(enLink?.props.href).toBe("https://dsecuretech.com/solutions/enterprise");

    expect(xDefaultLink).toBeDefined();
    expect(xDefaultLink?.props.href).toBe("https://dsecuretech.com/solutions/enterprise");

    // Fake 404 hreflangs (hi, fr, de, es, ja, zh) nahi hone chahiye
    const fakeLinks = alternateLinks.filter((el) =>
      ["hi", "fr", "de", "es", "ja", "zh"].includes(el.props.hrefLang || "")
    );
    expect(fakeLinks.length).toBe(0);
  });

  // Worldwide hreflang tags ke tests - SEOHeadNative
  it("should render worldwide hreflangs in SEOHeadNative and eliminate fake 404 hreflangs", () => {
    // Purane links clean karo taaki clean state mile
    document.head.querySelectorAll("link[rel='alternate']").forEach((el) => el.remove());

    render(
      <BrowserRouter>
        <SEOHeadNative
          title="Enterprise Data Erasure"
          description="Enterprise solution"
          canonicalUrl="https://dsecuretech.com/solutions/enterprise"
        />
      </BrowserRouter>
    );

    // React 19 link tags ko automatically document.head mein hoist karta hai
    const alternateLinks = Array.from(document.head.querySelectorAll("link[rel='alternate']"));
    expect(alternateLinks.length).toBe(2);

    const hreflangs = alternateLinks.map((link) => link.getAttribute("hreflang"));
    expect(hreflangs).toContain("en");
    expect(hreflangs).toContain("x-default");

    // Fake languages check (hi, es, fr, de, ja, zh nahi hone chahiye)
    const hasFakeLanguages = hreflangs.some((lang) =>
      ["hi", "es", "fr", "de", "ja", "zh"].includes(lang || "")
    );
    expect(hasFakeLanguages).toBe(false);

    // Canonical link match check
    alternateLinks.forEach((link) => {
      expect(link.getAttribute("href")).toBe("https://dsecuretech.com/solutions/enterprise");
    });
  });
});

