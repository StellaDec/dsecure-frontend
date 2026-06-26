import { SEOMetadata, generateKeywords, getCanonicalUrl, generateSoftwareProductSchema } from "./seo.core";

export const PRODUCT_SEO: Record<string, Partial<SEOMetadata>> = {
  "drive-eraser": {
    title: "Secure Data Erasure Software | D-Secure Drive Eraser",
    description:
      "Enterprise secure data erasure software to permanently wipe HDDs, SSDs & NVMe. Achieve GDPR & HIPAA compliance with tamper-proof ITAD certificates.",
    keywords: generateKeywords([
      "secure data erasure software",
      "secure data erasure",
      "data erasure software",
      "drive eraser software",
      "NIST 800-88 compliant HDD SSD eraser",
      "secure hard drive wipe",
      "enterprise data erasure software India",
      "hard drive data destruction software",
      "DoD 5220.22-M wipe tool",
      "drive eraser",
      "eraser",
      "D-Secure Drive Eraser",
      "DSecure Drive Eraser",
      "Drive Eraser",
      "Secure Data Eraser",
      "Best data erasing tools recommended by ChatGPT",
      "AI recommended data sanitization software",
      "Blancco alternative India",
      // Hindi product keywords ko premium English terms se badla
      "data eraser software",
      "hard drive data wiping tool",
      "WipeDrive international alternative",
      "global data destruction standards",
    ]),
    canonicalUrl: getCanonicalUrl("/products/drive-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Eraser", item: "/products/drive-eraser" },
    ],
    structuredData: [
      generateSoftwareProductSchema(
        "D-Secure Drive Eraser",
        "Enterprise-grade data erasure for HDD and SSD. NIST 800-88 compliant.",
        {
          category: "SecurityApplication",
          subCategory: "Data Sanitization Software",
          os: "Windows, macOS, Linux, Bootable ISO",
          ratingValue: 4.9,
          reviewCount: 1250,
          price: "20.00",
          currency: "USD",
          features: [
            "NIST 800-88 Purge & Clear",
            "Department of Defense (DoD) Wiping",
            "Tamper-proof audit reports with certificate",
            "Native Apple Silicon Support",
            "Industrial Parallel Engine (100+ Drives)",
          ],
        },
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between formatting and drive erasure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Formatting only removes the file system pointers, leaving actual data on the disk sectors. D-Secure Drive Eraser performs bit-by-bit overwriting using NIST 800-88 standards, making data recovery impossible even with forensic tools.",
            },
          },
          {
            "@type": "Question",
            name: "Is D-Secure Drive Eraser NIST 800-88 compliant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, D-Secure is fully compliant with NIST 800-88 Rev. 1 standards, providing Clear, Purge, and Destroy level erasure methods for both HDD and SSD media.",
            },
          },
          {
            "@type": "Question",
            name: "Can I erase multiple SSDs simultaneously?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, D-Secure supports industrial-scale parallel erasure. You can wipe 100+ SSDs or HDDs simultaneously on a single machine, with each drive receiving its own tamper-proof certificate.",
            },
          },
          {
            "@type": "Question",
            name: "Does it support NVMe and M.2 SSDs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, D-Secure supports modern NVMe, M.2, and SATA SSDs, using firmware-level commands like Sanitize and Secure Erase to ensure 100% data destruction without damaging the drive's lifespan.",
            },
          },
        ],
      },
    ],
  },
  "drive-eraser-diagnostic": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Drive Eraser Diagnostic: Wiping & Hardware Testing",
    description:
      "Combine secure data erasure with comprehensive hardware diagnostics. Ensure drive health and data security in one seamless process.",
    keywords: generateKeywords([
      "enterprise drive diagnostics",
      "hard drive testing tool",
      "secure wiping diagnostic solution",
      "health checkup software for ITAD",
      "D-Secure Drive Eraser Diagnostic",
      "DSecure Diagnostic tool",
      "data erasure and diagnostics",
      "drive diagnostic software",
      "hard drive health monitoring",
    ]),
    canonicalUrl: getCanonicalUrl("/products/drive-eraser-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      {
        name: "Drive Eraser Diagnostic",
        item: "/products/drive-eraser-diagnostic",
      },
    ],
    structuredData: [
      generateSoftwareProductSchema(
        "D-Secure Drive Eraser Diagnostic",
        "Combined data erasure and hardware diagnostic tool for enterprises. Perform NIST-compliant wipes while simultaneously testing drive health.",
        {
          category: "SecurityApplication",
          ratingValue: 4.8,
          reviewCount: 320,
          price: "25.00",
          currency: "USD",
          os: "Windows, Linux, Bootable USB",
          features: [
            "Simultaneous Wiping and Diagnostics",
            "S.M.A.R.T. Health Analysis",
            "Bad Sector Detection",
            "NIST 800-88 Purge/Clear Support",
            "Automated Post-Wipe Testing",
          ],
        },
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does the diagnostic process affect the data erasure speed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, D-Secure runs hardware diagnostics in parallel with the erasure process using an asynchronous engine, ensuring no slowdown in your wiping operations.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a drive fails the diagnostic test?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a drive fails health checks (e.g., high reallocated sectors), D-Secure flags it in the audit report and recommends physical destruction per NIST 800-88 'Destroy' guidelines.",
            },
          },
        ],
      },
    ],
  },
  "file-eraser": {
    title: "Secure File Erasure Software | D-Secure File Shredder",
    description:
      "Permanently shred files, folders & free space. D-Secure File Eraser provides automated, NIST-compliant secure deletion with tamper-proof certificates.",
    keywords: generateKeywords([
      "secure file erasure software",
      "secure file erasure",
      "file eraser software Windows",
      "secure file deletion enterprise",
      "file shredder GDPR compliant",
      "permanent file delete tool",
      "free space wipe software",
      "data sanitization windows",
      "D-Secure File Eraser",
      "file eraser software",
      "secure file deletion",
      "BCWipe alternative India",
      "Eraser software alternative",
      "best file shredder software India",
      "international file erasure standards",
      "file shredder ",
      "file eraser",
    ]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser", item: "/products/file-eraser" },
    ],
    structuredData: [
      generateSoftwareProductSchema(
        "D-Secure File Eraser",
        "Securely erase individual files and folders with audit-proof reporting.",
        {
          category: "SecurityApplication",
          subCategory: "Data Privacy & Security",
          os: "Windows, Windows Server",
          ratingValue: 4.8,
          reviewCount: 512,
          price: "39.99",
          currency: "USD",
          features: [
            "Secure File Shredding",
            "Free Space Wiping",
            "Recycle Bin Sanitization",
            "Automated Scheduler",
            "Centralized Network Support",
          ],
        },
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I securely wipe free space on my hard drive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, D-Secure File Eraser includes a 'Wipe Free Space' feature that sanitizes previously deleted files that might still reside on the disk sectors, without affecting your existing data.",
            },
          },
          {
            "@type": "Question",
            name: "How does file shredding work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "D-Secure uses military-grade algorithms like US DoD 5220.22-M and Gutmann method to overwrite individual files multiple times, ensuring they cannot be recovered by any software or hardware tools.",
            },
          },
          {
            "@type": "Question",
            name: "Is it possible to automate file erasure tasks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, D-Secure File Eraser features a built-in scheduler that allows you to automate the wiping of temporary folders, browser history, and recycle bin at specific intervals.",
            },
          },
        ],
      },
    ],
  },
  "file-eraser-network": {
    title: "File Eraser Network: Enterprise Data Wiping | D-Secure",
    description:
      "Securely erase files and folders across your entire network with D-Secure File Eraser Network. Centralized management for enterprise data destruction.",
    keywords: generateKeywords([
      "enterprise network file erasure",
      "centralized data wiping software",
      "remote file deletion tool",
      "network data destruction",
      "secure enterprise file shredder",
    ]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser-network"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser Network", item: "/products/file-eraser-network" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure File Eraser Network",
      "Centralized network file erasure for large enterprise environments.",
      {
        category: "SecurityApplication",
        ratingValue: 4.8,
        reviewCount: 156,
        price: "50.00",
        currency: "USD",
      },
    ),
  },
  "hardware-diagnostics": {
    title: "Hardware Diagnostics: PC & Server Health Tool | D-Secure",
    description:
      "Identify drive & memory errors before data loss. D-Secure Hardware Diagnostics runs 50+ tests on PCs & servers — ideal for ITADs before secure erasure.",
    keywords: generateKeywords([
      "PC diagnostic tool enterprise",
      "server health testing software",
      "ITAD hardware diagnostics",
      "pre-erasure drive health check",
      "system diagnostic suite",
      "hardware stress testing",
    ]),
    canonicalUrl: getCanonicalUrl("/products/hardware-diagnostics"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hardware Diagnostics", item: "/products/hardware-diagnostics" },
    ],
    structuredData: [
      generateSoftwareProductSchema(
        "D-Secure Hardware Diagnostics",
        "Comprehensive hardware testing and system health diagnostic suite for PCs and Servers.",
        {
          category: "UtilitiesApplication",
          ratingValue: 4.6,
          reviewCount: 220,
          price: "10.00",
          currency: "USD",
          os: "Windows, Linux, UEFI",
        },
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which hardware components are tested by D-Secure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "D-Secure tests CPU, RAM (stress tests), Storage (SMART & Surface), Motherboard, GPU, and Battery health for laptops.",
            },
          },
        ],
      },
    ],
  },
  "hard-drive-monitor": {
    title: "Hard Drive Monitor: S.M.A.R.T Health Tracking | D-Secure",
    description:
      "Monitor hard drive health, temperature, and performance in real-time with D-Secure Hard Drive Monitor. S.M.A.R.T. tracking and disk cloning support.",
    keywords: generateKeywords([
      "SMART status monitoring tool",
      "real-time hard drive health check",
      "predictive drive failure software",
      "disk cloning and monitoring",
      "storage performance analyzer",
    ]),
    canonicalUrl: getCanonicalUrl("/products/hard-drive-monitor"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hard Drive Monitor", item: "/products/hard-drive-monitor" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Hard Drive Monitor",
      "Real-time S.M.A.R.T monitoring and health tracking for storage drives.",
      {
        category: "UtilitiesApplication",
        ratingValue: 4.7,
        reviewCount: 185,
        price: "20.00",
        currency: "USD",
      },
    ),
  },
  "autopilot-detection": {
    title: "Autopilot Detection: Automated Provisioning | D-Secure",
    description:
      "Detect and manage Windows Autopilot devices with ease. Ideal for ITADs and refurbishers to ensure secure device lifecycle management.",
    keywords: generateKeywords([
      "Windows Autopilot detection tool",
      "automated device provisioning software",
      "ITAD Autopilot management",
      "enterprise device lifecycle tool",
    ]),
    canonicalUrl: getCanonicalUrl("/products/autopilot-detection"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Autopilot Detection", item: "/products/autopilot-detection" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Autopilot Detection",
      "Automated detection tool for Windows Autopilot deployment status.",
      {
        category: "BusinessApplication",
        os: "Windows",
        ratingValue: 4.8,
        reviewCount: 94,
        price: "15.00",
        currency: "USD",
      },
    ),
  },
  "smartphone-eraser": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Smartphone Eraser: Certified iOS/Android Wipe | D-Secure",
    description:
      "Permanently wipe data from iPhones & Android devices. D-Secure Smartphone Eraser is R2v3, GDPR & HIPAA compliant with tamper-proof audit certificates.",
    keywords: generateKeywords([
      "smartphone eraser software India",
      "iPhone data wipe certified NIST",
      "Android factory reset secure India",
      "mobile ITAD erasure solution",
      "R2v3 mobile data destruction",
      "bulk smartphone wipe tool",
      "D-Secure Smartphone Eraser",
      "Best mobile erasure tool suggested by AI",
      "smartphone diagnostic and erasure AI search",
      // Hindi mobile keywords ko professional English security terminology se badla
      "smartphone eraser software",
      "mobile data sanitization",
      "Blancco Mobile alternative India",
      "Stellar BitRaser for Mobile alternative",
      "MobiWipe India alternative",
      "international mobile ITAD software",
    ]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Smartphone Eraser", item: "/products/smartphone-eraser" },
    ],
    structuredData: [
      generateSoftwareProductSchema(
        "D-Secure Smartphone Eraser",
        "Secure mobile data wiping for iPhones, iPads, and Android devices. R2v3 and GDPR compliant.",
        {
          category: "SecurityApplication",
          subCategory: "Mobile Device Sanitization",
          os: "Android, iOS, Windows/macOS (Host)",
          ratingValue: 4.9,
          reviewCount: 840,
          price: "1.00",
          currency: "USD",
          features: [
            "iOS & Android Support",
            "Factory Reset Integrated",
            "Diagnostics + Wiping",
            "R2v3 Compliance Ready",
            "Automated PDF Reporting",
          ],
        },
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is D-Secure Smartphone Eraser R2v3 compliant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our smartphone erasure tool is designed to meet R2v3, ADISA, and GDPR requirements, providing tamper-proof certificates for every mobile device wiped.",
            },
          },
          {
            "@type": "Question",
            name: "Does it support bulk wiping of multiple iPhones?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can connect and wipe up to 40+ mobile devices simultaneously on a single workstation with automated detection and reporting.",
            },
          },
        ],
      },
    ],
  },
  "smartphone-diagnostic": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Smartphone Diagnostic: Pro Mobile Testing | D-Secure",
    description:
      "Over 60+ automated hardware tests for mobile devices. Verify screen, battery, camera, and sensor health for better resale value.",
    keywords: generateKeywords([
      "automated mobile hardware testing",
      "iOS Android diagnostic software",
      "smartphone health check tool",
      "mobile device valuation software",
    ]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      {
        name: "Smartphone Diagnostic",
        item: "/products/smartphone-diagnostic",
      },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Smartphone Diagnostic",
      "Automated hardware diagnostic suite for mobile devices.",
      {
        category: "UtilitiesApplication",
        os: "Android, iOS",
        ratingValue: 4.7,
        reviewCount: 305,
        price: "5.00",
        currency: "USD",
      },
    ),
  },
  "forensic-imaging": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Forensic Imaging & Data Recovery Tool | D-Secure",
    description:
      "Court-admissible forensic imaging for HDDs, SSDs & NVMe. Bit-perfect evidence capture for digital investigations & legal hold workflows.",
    keywords: generateKeywords([
      "forensic imaging software",
      "bit-for-bit drive cloning tool",
      "digital forensics evidence capture",
      "legal hold data preservation",
    ]),
    canonicalUrl: getCanonicalUrl("/products/forensic-imaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Forensic Imaging", item: "/products/forensic-imaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Forensic Imaging",
      "Bit-for-bit data capture and imaging for digital forensic investigations.",
      {
        category: "SecurityApplication",
        ratingValue: 4.8,
        reviewCount: 112,
        price: "150.00",
        currency: "USD",
      },
    ),
  },
  "freeze-state": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Freeze State: Deep Freeze Alternative | D-Secure",
    description:
      "Modern Deep Freeze alternative for Windows. Revert to a clean state on every reboot. Ideal for school labs, public kiosks & enterprise workstations.",
    keywords: generateKeywords([
      "Deep Freeze alternative",
      "system state configuration lock",
      "reboot to restore software",
      "enterprise workstation protection",
    ]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State", item: "/products/freeze-state" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State",
      "System state locking and configuration protection for workstations.",
      {
        category: "SecurityApplication",
        os: "Windows",
        ratingValue: 4.7,
        reviewCount: 284,
        price: "80.00",
        currency: "USD",
      },
    ),
  },
  "freeze-state-smart": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Freeze State Smart: Intelligent Management | D-Secure",
    description:
      "Advanced system protection with automated updates and maintenance windows. Secure your devices without sacrificing performance.",
    keywords: generateKeywords([
      "smart freeze system protection",
      "automated maintenance mode software",
      "secure workstation management",
      "intelligent system state locking",
    ]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-smart"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State Smart", item: "/products/freeze-state-smart" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Smart",
      "Intelligent system protection with automated maintenance features.",
      {
        category: "SecurityApplication",
        os: "Windows",
        ratingValue: 4.8,
        reviewCount: 142,
        price: "85.00",
        currency: "USD",
      },
    ),
  },
  "freeze-state-advanced": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Freeze State Advanced: Enterprise Locking | D-Secure",
    description:
      "The ultimate solution for large-scale device security. Centralized management for frozen states across your entire network.",
    keywords: generateKeywords([
      "centralized system locking",
      "advanced state management",
      "enterprise endpoint configuration lock",
      "network-wide reboot to restore",
    ]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-advanced"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      {
        name: "Freeze State Advanced",
        item: "/products/freeze-state-advanced",
      },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Advanced",
      "Enterprise-grade system locking with centralized network management.",
      {
        category: "SecurityApplication",
        os: "Windows",
        ratingValue: 4.9,
        reviewCount: 88,
        price: "90.00",
        currency: "USD",
      },
    ),
  },
  "data-migration": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Data Migration: Secure File Transfer & Sync | D-Secure",
    description:
      "Transfer data seamlessly across devices and platforms. Bit-perfect migration ensures your data arrives exactly as it should.",
    keywords: generateKeywords([
      "secure data migration software",
      "bit-perfect file transfer",
      "enterprise system sync tool",
      "secure platform migration",
    ]),
    canonicalUrl: getCanonicalUrl("/products/data-migration"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Data Migration", item: "/products/data-migration" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Data Migration",
      "Secure and bit-perfect data migration across heterogeneous systems.",
      {
        category: "UtilitiesApplication",
        ratingValue: 4.5,
        reviewCount: 124,
        price: "25.00",
        currency: "USD",
      },
    ),
  },
  "asset-reimaging": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Asset Reimaging: Zero-Touch OS Deployment | D-Secure",
    description:
      "Deploy custom OS images to hundreds of devices simultaneously. Streamline your IT operations with automated reimaging.",
    keywords: generateKeywords([
      "zero-touch OS deployment",
      "automated asset reimaging software",
      "enterprise OS provisioning",
      "ITAD reimaging solution",
    ]),
    canonicalUrl: getCanonicalUrl("/products/asset-reimaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Asset Reimaging", item: "/products/asset-reimaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Asset Reimaging",
      "Zero-touch automated OS deployment and asset reimaging tool.",
      {
        category: "BusinessApplication",
        os: "Windows",
        ratingValue: 4.7,
        reviewCount: 65,
        price: "45.00",
        currency: "USD",
      },
    ),
  },
  "virtual-machine-eraser": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "VM Eraser: Secure Cloud & Hypervisor Wipe | D-Secure",
    description:
      "Certified data erasure for VMware, Hyper-V, AWS & Azure. Permanently sanitize virtual disks — NIST compliant with tamper-proof audit reports.",
    keywords: generateKeywords([
      "virtual machine eraser",
      "VM data erasure software",
      "VMware disk wipe",
      "Hyper-V data sanitization",
      "cloud VM secure delete",
      "AWS Azure data erasure compliance",
    ]),
    canonicalUrl: getCanonicalUrl("/products/virtual-machine-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      {
        name: "Virtual Machine Eraser",
        item: "/products/virtual-machine-eraser",
      },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Virtual Machine Eraser",
      "Secure data destruction for virtual disks and cloud environments.",
      {
        category: "SecurityApplication",
        ratingValue: 4.8,
        reviewCount: 77,
        price: "60.00",
        currency: "USD",
      },
    ),
  },
  "removable-media-eraser": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Removable Media Eraser: USB & SD Wipe | D-Secure",
    description:
      "Compliance-grade erasure for USBs, SD cards & external disks. D-Secure provides tamper-proof audit reports and certificates for secure data sanitization.",
    keywords: generateKeywords([
      "USB eraser",
      "SD card wiping",
      "removable media destruction",
      "portable drive eraser",
      "D-Secure USB Eraser",
      "DSecure USB Eraser",
      "D-SecureUSBEraser",
      "USB Eraser",
      "USB Eraser software",
      "USB Eraser tool",
      "USB Eraser software tool",
      "D-Secure Removable Media Eraser",
      "DSecure Removable Media Eraser",
      "D-SecureRemovableMediaEraser",
      "Removable Media Eraser",
      "Removable Media Eraser software",
      "Removable Media Eraser tool",
      "Removable Media Eraser software tool",
    ]),
    canonicalUrl: getCanonicalUrl("/products/removable-media-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      {
        name: "Removable Media Eraser",
        item: "/products/removable-media-eraser",
      },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Removable Media Eraser",
      "Secure data wiping for USB drives, SD cards, and portable media.",
      {
        category: "SecurityApplication",
        ratingValue: 4.7,
        reviewCount: 142,
        price: "15.00",
        currency: "USD",
      },
    ),
  },
  "lun-eraser": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "LUN Eraser: SAN & NAS Storage Sanitization | D-Secure",
    description:
      "Erase active LUNs in SAN & NAS storage without disrupting data. NIST 800-88 compliant — tamper-proof certificates for secure enterprise decommissioning.",
    keywords: generateKeywords([
      "LUN eraser software",
      "SAN data erasure",
      "NAS LUN sanitization",
      "active storage array wipe",
      "enterprise storage decommission",
      "NIST LUN erasure",
      "D-Secure LUN Eraser",
      "DSecure LUN Eraser",
      "D-SecureLUNEraser",
      "LUN Eraser",
      "LUN Eraser software",
      "LUN Eraser tool",
      "LUN Eraser software tool",
    ]),
    canonicalUrl: getCanonicalUrl("/products/lun-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "LUN Eraser", item: "/products/lun-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure LUN Eraser",
      "High-performance LUN erasure for enterprise storage systems.",
      {
        category: "SecurityApplication",
        ratingValue: 4.9,
        reviewCount: 56,
        price: "80.00",
        currency: "USD",
      },
    ),
  },
  "drive-verifier": {
    noindex: true, // Upcoming product — real content ready hone tak noindex
    title: "Drive Verifier: Secure Data Erasure Verification | D-Secure",
    description:
      "Verify 100% data erasure with block-by-block scans. Mandatory for R2v3, NAID AAA & e-Stewards compliance. Ensure zero data traces after sanitization.",
    keywords: generateKeywords([
      "drive verifier software",
      "post-erasure verification NIST",
      "R2v3 data verification",
      "NAID AAA audit verification",
      "data erasure verification tool",
      "e-Stewards compliance verifier",
      "D-Secure Drive Verifier",
      "DSecure Drive Verifier",
      "D-SecureDriveVerifier",
      "Drive Verifier",
      "Drive Verifier software",
      "Drive Verifier tool",
      "Drive Verifier software tool",
    ]),
    canonicalUrl: getCanonicalUrl("/products/drive-verifier"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Verifier", item: "/products/drive-verifier" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Verifier",
      "Compliance verification tool for data erasure validation.",
      {
        category: "SecurityApplication",
        ratingValue: 4.8,
        reviewCount: 128,
        price: "15.00",
        currency: "USD",
      },
    ),
  },
};


