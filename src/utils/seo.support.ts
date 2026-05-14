import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const SUPPORT_SEO: Record<string, Partial<SEOMetadata>> = {
  "support/knowledge-base": {
    title: "Knowledge Base | Technical Support | D-Secure Tech",
    description:
      "Access technical documentation, setup guides, and advanced troubleshooting for D-Secure data erasure software.",
    keywords: generateKeywords([
      "knowledge base",
      "technical support",
      "erasure documentation",
    ]),
    canonicalUrl: getCanonicalUrl("/support/knowledge-base"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Knowledge Base", item: "/support/knowledge-base" },
    ],
  },
  "support/faqs": {
    title: "Frequently Asked Questions | D-Secure Data Erasure",
    description:
      "Find answers to common questions about data sanitization, compliance, and enterprise deployment.",
    keywords: generateKeywords([
      "data erasure FAQ",
      "sanitization help",
      "compliance questions",
    ]),
    canonicalUrl: getCanonicalUrl("/support/faqs"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "FAQs", item: "/support/faqs" },
    ],
  },
  "support/manual/installation": {
    title: "Installation Guide | D-Secure Tech Manual",
    description:
      "Step-by-step installation instructions for D-Secure enterprise datasets and agents.",
    keywords: generateKeywords([
      "software installation",
      "setup guide",
      "deployment instructions",
    ]),
    canonicalUrl: getCanonicalUrl("/support/manual/installation"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Installation Guide", item: "/support/manual/installation" },
    ],
  },
  "support/manual/complete-manual": {
    title: "D-Secure File Eraser Complete Manual",
    description:
      "Comprehensive user guide and documentation for D-Secure File Eraser. Learn how to securely wipe files, free space, and manage erasure reports.",
    keywords: generateKeywords([
      "file eraser manual",
      "d-secure documentation",
      "how to erase files",
      "file shredding guide",
    ]),
    canonicalUrl: getCanonicalUrl("/support/manual/complete-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
      { name: "File Eraser Manual", item: "/support/manual/complete-manual" },
    ],
  },
  "support/manual/complete-drive-manual": {
    title: "D-Secure Drive Eraser Complete Manual",
    description:
      "User manual for D-Secure Drive Eraser. Step-by-step instructions for booting, hardware detection, volume wiping, and compliance reporting.",
    keywords: generateKeywords([
      "drive eraser manual",
      "boot drive wipe guide",
      "volume sanitization manual",
      "d-secure drive documentation",
    ]),
    canonicalUrl: getCanonicalUrl("/support/manual/complete-drive-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
      { name: "Drive Eraser Manual", item: "/support/manual/complete-drive-manual" },
    ],
  },
  "support/get-started": {
    title: "Get Started with D-Secure | Setup & Configuration Guide",
    description: "New to D-Secure? Follow our quick start guide to set up your data erasure console and start wiping your first devices.",
    keywords: generateKeywords(["get started", "quick start guide", "setup tutorial"]),
    canonicalUrl: getCanonicalUrl("/support/get-started"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Get Started", item: "/support/get-started" },
    ],
  },
  "support/product-videos": {
    title: "D-Secure Product Videos & Video Tutorials",
    description: "Watch step-by-step video tutorials on how to use D-Secure Drive Eraser, File Eraser, and Mobile Eraser solutions.",
    keywords: generateKeywords(["video tutorials", "product demos", "how-to videos"]),
    canonicalUrl: getCanonicalUrl("/support/product-videos"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Product Videos", item: "/support/product-videos" },
    ],
  },
  "support/manual": {
    title: "D-Secure Help Center & User Documentation",
    description: "Browse our comprehensive help manual for all D-Secure products. Detailed guides for installation, usage, and troubleshooting.",
    keywords: generateKeywords(["help manual", "user guide", "product documentation"]),
    canonicalUrl: getCanonicalUrl("/support/manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
    ],
  },
  "support/manual/cryptographic-erasure": {
    title: "Cryptographic Erasure Guide | NIST 800-88 Purge | D-Secure",
    description: "Learn how to perform cryptographic erasure (CE) on SSDs and SEDs according to NIST 800-88 'Purge' standards.",
    keywords: generateKeywords(["cryptographic erasure", "CE guide", "NIST 800-88 purge", "SSD crypto erase"]),
    canonicalUrl: getCanonicalUrl("/support/manual/cryptographic-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Cryptographic Erasure", item: "/support/manual/cryptographic-erasure" },
    ],
  },
  "support/manual/performance-optimization": {
    title: "Performance Optimization | D-Secure Speed & Efficiency Guide",
    description: "Comprehensive guide to optimizing D-Secure performance. Maximize erasure speed, system efficiency, and throughput with expert techniques.",
    keywords: generateKeywords(["D-Secure performance", "erasure speed", "system tuning", "hardware acceleration"]),
    canonicalUrl: getCanonicalUrl("/support/manual/performance-optimization"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Performance Optimization", item: "/support/manual/performance-optimization" },
    ],
  },
  "support/manual/user-interface": {
    title: "User Interface Guide | D-Secure Interface Masterclass",
    description: "Complete guide to D-Secure's user interface. Learn to navigate dashboards, manage operations, and generate reports efficiently.",
    keywords: generateKeywords(["D-Secure interface", "UI guide", "dashboard navigation", "erasure operations"]),
    canonicalUrl: getCanonicalUrl("/support/manual/user-interface"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "User Interface", item: "/support/manual/user-interface" },
    ],
  },
  "support/manual/quickstart": {
    title: "Quick Start Guide | Start Data Erasure in 10 Minutes",
    description: "Get up and running with D-Secure quickly. Your first data erasure operation explained step-by-step for rapid deployment.",
    keywords: generateKeywords(["quick start", "D-Secure setup", "fast track erasure", "getting started"]),
    canonicalUrl: getCanonicalUrl("/support/manual/quickstart"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Quick Start", item: "/support/manual/quickstart" },
    ],
  },
  "support/manual/complete-freeze-state-manual": {
    title: "Freeze State Complete Manual | D-Secure Reboot-to-Restore",
    description: "Full guide to configuring and managing D-Secure Freeze State. Learn how to protect system configurations and restore them on reboot.",
    keywords: generateKeywords(["freeze state manual", "reboot to restore guide", "system protection documentation"]),
    canonicalUrl: getCanonicalUrl("/support/manual/complete-freeze-state-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
      { name: "Freeze State Manual", item: "/support/manual/complete-freeze-state-manual" },
    ],
  },
  "support/manual/complete-diagnostic-manual": {
    title: "D-Secure Diagnostic Complete Manual | Hardware Testing Guide",
    description: "Detailed documentation for D-Secure Diagnostic. instructions for hardware health checks, benchmarking, and component testing.",
    keywords: generateKeywords(["diagnostic manual", "hardware test guide", "system benchmark documentation"]),
    canonicalUrl: getCanonicalUrl("/support/manual/complete-diagnostic-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
      { name: "Diagnostic Manual", item: "/support/manual/complete-diagnostic-manual" },
    ],
  },
  "support/manual/network-file": {
    title: "D-Secure Network File Eraser Complete Manual",
    description: "Comprehensive technical documentation for D-Secure Network File Eraser. Enterprise deployment, domain integration, and bulk erasure guides.",
    keywords: generateKeywords(["network file eraser", "enterprise erasure manual", "domain data wiping"]),
    canonicalUrl: getCanonicalUrl("/support/manual/network-file"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/manual" },
      { name: "Network File Manual", item: "/support/manual/network-file" },
    ],
  },
  "support/manual/system-setup": {
    title: "System Setup & Configuration | D-Secure Manual",
    description: "Technical guide for setting up and configuring D-Secure systems for optimal performance and compliance.",
    keywords: generateKeywords(["system setup", "configuration guide", "D-Secure technical manual"]),
    canonicalUrl: getCanonicalUrl("/support/manual/system-setup"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "System Setup", item: "/support/manual/system-setup" },
    ],
  },
  "support/manual/working-with-dsecure": {
    title: "Working with D-Secure | User Operations & Workflow Guide",
    description: "Learn how to use D-Secure effectively for day-to-day data erasure operations and workflow management.",
    keywords: generateKeywords(["user operations", "workflow guide", "D-Secure usage"]),
    canonicalUrl: getCanonicalUrl("/support/manual/working-with-dsecure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Working Guide", item: "/support/manual/working-with-dsecure" },
    ],
  },
};
