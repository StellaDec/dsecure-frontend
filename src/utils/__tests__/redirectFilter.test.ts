import { describe, it, expect } from "vitest";
import {
  normalizeUrlPath,
  matchesRedirect,
  isRedirectUrl,
  filterRedirectUrls,
  VercelRedirectRule,
} from "../redirectFilter";

describe("redirectFilter utility", () => {
  // Mock vercel redirect rules
  const mockRedirects: VercelRedirectRule[] = [
    {
      source: "/pricing",
      destination: "/pricing-and-plan",
      permanent: true,
    },
    {
      source: "/products",
      destination: "/all-products",
      permanent: true,
    },
    {
      source: "/(de|fr|es|zh|ja)(/.*)?",
      destination: "/",
      permanent: true,
    },
    {
      source: "/support/help-manual/network-file/:path*",
      destination: "/products/file-eraser-network",
      permanent: true,
    },
    {
      source: "/blog/deployment-options",
      destination: "/support/manual/installation",
      permanent: true,
    },
    {
      source: "/blog/gdpr-seven-years",
      destination: "/blog/gdpr-article-17-right-to-erasure",
      permanent: true,
    },
    {
      source: "/blog/ssd-wipe-guide",
      destination: "/blog/ssd-wipe-bios",
      permanent: true,
    },
  ];

  describe("normalizeUrlPath", () => {
    it("trailing slash ko hata kar single leading slash ensure karta hai", () => {
      expect(normalizeUrlPath("pricing")).toBe("/pricing");
      expect(normalizeUrlPath("/pricing/")).toBe("/pricing");
      expect(normalizeUrlPath("/pricing")).toBe("/pricing");
      expect(normalizeUrlPath("/")).toBe("/");
      expect(normalizeUrlPath("")).toBe("/");
    });
  });

  describe("matchesRedirect", () => {
    it("exact redirect source paths ko accurately match karta hai", () => {
      expect(matchesRedirect("/pricing", "/pricing")).toBe(true);
      expect(matchesRedirect("/pricing", "/pricing/")).toBe(true);
      expect(matchesRedirect("/blog/deployment-options", "/blog/deployment-options")).toBe(true);
      expect(matchesRedirect("/blog/ssd-wipe-guide", "/blog/ssd-wipe-guide")).toBe(true);
    });

    it("canonical target URLs ko match NAHI karta (200 OK valid URLs safe rehte hain)", () => {
      expect(matchesRedirect("/pricing", "/pricing-and-plan")).toBe(false);
      expect(matchesRedirect("/products", "/all-products")).toBe(false);
      expect(matchesRedirect("/blog/ssd-wipe-guide", "/blog/ssd-wipe-bios")).toBe(false);
      expect(matchesRedirect("/blog/deployment-options", "/support/manual/installation")).toBe(false);
    });

    it("wildcard parameter patterns ko match karta hai (:path*)", () => {
      const pattern = "/support/help-manual/network-file/:path*";
      expect(matchesRedirect(pattern, "/support/help-manual/network-file/setup")).toBe(true);
      expect(matchesRedirect(pattern, "/support/help-manual/network-file/setup/guide")).toBe(true);
      expect(matchesRedirect(pattern, "/support/other-manual")).toBe(false);
    });

    it("regex language redirect patterns ko match karta hai", () => {
      const langPattern = "/(de|fr|es|zh|ja)(/.*)?";
      expect(matchesRedirect(langPattern, "/de")).toBe(true);
      expect(matchesRedirect(langPattern, "/fr/about")).toBe(true);
      expect(matchesRedirect(langPattern, "/es/services")).toBe(true);
      expect(matchesRedirect(langPattern, "/en/about")).toBe(false);
      expect(matchesRedirect(langPattern, "/products")).toBe(false);
    });
  });

  describe("isRedirectUrl", () => {
    it("agar URL redirect list mein hai toh true return karta hai", () => {
      expect(isRedirectUrl("/pricing", mockRedirects)).toBe(true);
      expect(isRedirectUrl("/blog/deployment-options", mockRedirects)).toBe(true);
      expect(isRedirectUrl("/blog/gdpr-seven-years", mockRedirects)).toBe(true);
      expect(isRedirectUrl("/blog/ssd-wipe-guide", mockRedirects)).toBe(true);
      expect(isRedirectUrl("/de/services", mockRedirects)).toBe(true);
    });

    it("agar URL canonical 200 OK hai toh false return karta hai", () => {
      expect(isRedirectUrl("/", mockRedirects)).toBe(false);
      expect(isRedirectUrl("/pricing-and-plan", mockRedirects)).toBe(false);
      expect(isRedirectUrl("/all-products", mockRedirects)).toBe(false);
      expect(isRedirectUrl("/blog/ssd-wipe-bios", mockRedirects)).toBe(false);
      expect(isRedirectUrl("/support/manual/installation", mockRedirects)).toBe(false);
      expect(isRedirectUrl("/contact", mockRedirects)).toBe(false);
    });
  });

  describe("filterRedirectUrls", () => {
    it("list se sabhi 301 redirect URLs ko remove karke sirf canonical URLs bachaata hai", () => {
      const candidateUrls = [
        "/",
        "/pricing", // 301 redirect
        "/pricing-and-plan", // 200 OK
        "/products", // 301 redirect
        "/all-products", // 200 OK
        "/blog/deployment-options", // 301 redirect
        "/support/manual/installation", // 200 OK
        "/blog/ssd-wipe-guide", // 301 redirect
        "/blog/ssd-wipe-bios", // 200 OK
        "/de/test", // 301 redirect
      ];

      const filtered = filterRedirectUrls(candidateUrls, mockRedirects);

      expect(filtered).toEqual([
        "/",
        "/pricing-and-plan",
        "/all-products",
        "/support/manual/installation",
        "/blog/ssd-wipe-bios",
      ]);

      // Confirm koi bhi redirect URL list mein bacha na ho
      expect(filtered.includes("/pricing")).toBe(false);
      expect(filtered.includes("/products")).toBe(false);
      expect(filtered.includes("/blog/deployment-options")).toBe(false);
      expect(filtered.includes("/blog/ssd-wipe-guide")).toBe(false);
      expect(filtered.includes("/de/test")).toBe(false);
    });
  });
});
