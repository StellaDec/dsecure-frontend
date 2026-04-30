import { SEOMetadata, generateKeywords, getCanonicalUrl, generateSoftwareProductSchema } from "./seo.core";

export const PRODUCT_SEO: Record<string, Partial<SEOMetadata>> = {
  "drive-eraser": {
    title: "Drive Eraser: NIST 800-88 HDD & SSD Erasure | D-Secure",
    description: "Permanently erase HDDs, SSDs & NVMe with D-Secure. NIST 800-88 & DoD certified — tamper-proof audit certificates for GDPR & HIPAA compliance.",
    keywords: generateKeywords(["drive eraser software", "NIST 800-88 compliant HDD SSD eraser", "secure hard drive wipe", "enterprise data erasure software", "hard drive data destruction software", "DoD 5220.22-M wipe tool"]),
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
          price: "25.00",
          currency: "USD",
          features: [
            "NIST 800-88 Purge & Clear",
            "Department of Defense (DoD) Wiping",
            "Tamper-proof audit reports with certificate",
            "Native Apple Silicon Support",
            "Industrial Parallel Engine (100+ Drives)"
          ]
        }
      ),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many drives can I erase at a time on one machine?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "D-Secure Drive Eraser supports simultaneous erasure of up to 32 drives per machine, depending on your hardware configuration. For bulk operations, you can use our cloud console to manage multiple machines."
            }
          },
          {
            "@type": "Question",
            "name": "Does the software support NIST 800-88 compliance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, D-Secure is fully compliant with NIST 800-88 Rev. 1 standards, providing Clear, Purge, and Destroy level erasure methods for both HDD and SSD media."
            }
          }
        ]
      }
    ],
  },
  "drive-eraser-diagnostic": {
    title: "Drive Eraser Diagnostic: Wiping & Hardware Testing",
    description: "Combine secure data erasure with comprehensive hardware diagnostics. Ensure drive health and data security in one seamless process.",
    keywords: generateKeywords(["drive diagnostics", "hard drive testing", "secure wiping diagnostic", "health checkup"]),
    canonicalUrl: getCanonicalUrl("/products/drive-eraser-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Eraser Diagnostic", item: "/products/drive-eraser-diagnostic" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Eraser Diagnostic",
      "Combined data erasure and hardware diagnostic tool for enterprises.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 320, price: "30.00", currency: "USD" }
    ),
  },
  "file-eraser": {
    title: "Secure File Eraser: Permanent File Deletion Tool | D-Secure",
    description: "Securely shred files, folders & free space. D-Secure File Eraser provides NIST-compliant deletion with tamper-proof certificates for GDPR compliance.",
    keywords: generateKeywords(["file eraser software", "secure file deletion enterprise", "file shredder GDPR compliant", "permanent file delete tool", "free space wipe software", "data sanitization windows"]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser", item: "/products/file-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure File Eraser",
      "Securely erase individual files and folders with audit-proof reporting.",
      { 
        category: "SecurityApplication", 
        subCategory: "Data Privacy & Security",
        os: "Windows, Windows Server",
        ratingValue: 4.8, 
        reviewCount: 512,
        price: "40.00",
        currency: "USD",
        features: [
          "Secure File Shredding",
          "Free Space Wiping",
          "Recycle Bin Sanitization",
          "Automated Scheduler",
          "Centralized Network Support"
        ]
      }
    ),
  },
  "file-eraser-network": {
    title: "File Eraser Network: Enterprise Data Wiping | D-Secure",
    description: "Securely erase files and folders across your entire network with D-Secure File Eraser Network. Centralized management for enterprise data destruction.",
    keywords: generateKeywords(["file eraser network", "network data wiping", "remote file deletion", "enterprise network security", "centralized data erasure"]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser-network"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser Network", item: "/products/file-eraser-network" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure File Eraser Network",
      "Centralized network file erasure for large enterprise environments.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 156, price: "50.00", currency: "USD" }
    ),
  },
  "hardware-diagnostics": {
    title: "Hardware Diagnostics: PC & Server Health Tool | D-Secure",
    description: "Identify drive & memory errors before data loss. D-Secure Hardware Diagnostics runs 50+ tests on PCs & servers — ideal for ITADs before secure erasure.",
    keywords: generateKeywords(["hardware diagnostics software", "PC diagnostic tool enterprise", "server health test", "ITAD hardware testing", "hard drive health check", "pre-erasure diagnostics"]),
    canonicalUrl: getCanonicalUrl("/products/hardware-diagnostics"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hardware Diagnostics", item: "/products/hardware-diagnostics" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Hardware Diagnostics",
      "Comprehensive hardware testing and system health diagnostic suite.",
      { category: "UtilitiesApplication", ratingValue: 4.6, reviewCount: 220, price: "10.00", currency: "USD" }
    ),
  },
  "hard-drive-monitor": {
    title: "Hard Drive Monitor: S.M.A.R.T Health Tracking | D-Secure",
    description: "Monitor hard drive health, temperature, and performance in real-time with D-Secure Hard Drive Monitor. S.M.A.R.T. tracking and disk cloning support.",
    keywords: generateKeywords(["hard drive monitor", "disk health", "SMART status", "disk cloning", "bad sector scan"]),
    canonicalUrl: getCanonicalUrl("/products/hard-drive-monitor"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hard Drive Monitor", item: "/products/hard-drive-monitor" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Hard Drive Monitor",
      "Real-time S.M.A.R.T monitoring and health tracking for storage drives.",
      { category: "UtilitiesApplication", ratingValue: 4.7, reviewCount: 185, price: "20.00", currency: "USD" }
    ),
  },
  "autopilot-detection": {
    title: "Autopilot Detection: Automated Provisioning | D-Secure",
    description: "Detect and manage Windows Autopilot devices with ease. Ideal for ITADs and refurbishers to ensure secure device lifecycle management.",
    keywords: generateKeywords(["autopilot detection", "Windows Autopilot", "device provisioning", "ITAD tools"]),
    canonicalUrl: getCanonicalUrl("/products/autopilot-detection"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Autopilot Detection", item: "/products/autopilot-detection" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Autopilot Detection",
      "Automated detection tool for Windows Autopilot deployment status.",
      { category: "BusinessApplication", os: "Windows", ratingValue: 4.8, reviewCount: 94 }
    ),
  },
  "smartphone-eraser": {
    title: "Smartphone Eraser: Certified iOS/Android Wipe | D-Secure",
    description: "Permanently wipe data from iPhones & Android devices. D-Secure Smartphone Eraser is R2v3, GDPR & HIPAA compliant with tamper-proof audit certificates.",
    keywords: generateKeywords(["smartphone eraser software", "iPhone data wipe certified", "Android factory reset secure", "mobile ITAD erasure", "R2v3 mobile data destruction", "bulk smartphone wipe tool"]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Smartphone Eraser", item: "/products/smartphone-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Smartphone Eraser",
      "Secure mobile data wiping for iPhones, iPads, and Android devices.",
      { 
        category: "SecurityApplication", 
        subCategory: "Mobile Device Sanitization",
        os: "Android, iOS",
        ratingValue: 4.9, 
        reviewCount: 840,
        price: "1.00",
        currency: "USD",
        features: [
          "iOS & Android Support",
          "Factory Reset Integrated",
          "Diagnostics + Wiping",
          "R2v3 Compliance Ready",
          "Automated PDF Reporting"
        ]
      }
    ),
  },
  "smartphone-diagnostic": {
    title: "Smartphone Diagnostic: Pro Mobile Testing | D-Secure",
    description: "Over 60+ automated hardware tests for mobile devices. Verify screen, battery, camera, and sensor health for better resale value.",
    keywords: generateKeywords(["smartphone diagnostic", "mobile health check", "iPhone testing", "Android diagnostic"]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Smartphone Diagnostic", item: "/products/smartphone-diagnostic" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Smartphone Diagnostic",
      "Automated hardware diagnostic suite for mobile devices.",
      { category: "UtilitiesApplication", os: "Android, iOS", ratingValue: 4.7, reviewCount: 305 }
    ),
  },
  "forensic-imaging": {
    title: "Forensic Imaging & Data Recovery Tool | D-Secure",
    description: "Court-admissible forensic imaging for HDDs, SSDs & NVMe. Bit-perfect evidence capture for digital investigations & legal hold workflows.",
    keywords: generateKeywords(["forensic imaging software", "bit-for-bit drive clone", "digital forensics evidence capture", "forensic disk image tool", "legal hold data preservation", "incident response forensics"]),
    canonicalUrl: getCanonicalUrl("/products/forensic-imaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Forensic Imaging", item: "/products/forensic-imaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Forensic Imaging",
      "Bit-for-bit data capture and imaging for digital forensic investigations.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 112 }
    ),
  },
  "freeze-state": {
    title: "Freeze State: Deep Freeze Alternative | D-Secure",
    description: "Modern Deep Freeze alternative for Windows. Revert to a clean state on every reboot. Ideal for school labs, public kiosks & enterprise workstations.",
    keywords: generateKeywords(["freeze state software", "Deep Freeze alternative", "system configuration lock Windows", "kiosk mode software", "school lab PC protection", "revert on reboot software"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State", item: "/products/freeze-state" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State",
      "System state locking and configuration protection for workstations.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.7, reviewCount: 284 }
    ),
  },
  "freeze-state-smart": {
    title: "Freeze State Smart: Intelligent Management | D-Secure",
    description: "Advanced system protection with automated updates and maintenance windows. Secure your devices without sacrificing performance.",
    keywords: generateKeywords(["smart freeze", "automated system protection", "maintenance mode", "secure workstations"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-smart"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State Smart", item: "/products/freeze-state-smart" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Smart",
      "Intelligent system protection with automated maintenance features.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.8, reviewCount: 142 }
    ),
  },
  "freeze-state-advanced": {
    title: "Freeze State Advanced: Enterprise Locking | D-Secure",
    description: "The ultimate solution for large-scale device security. Centralized management for frozen states across your entire network.",
    keywords: generateKeywords(["advanced freeze state", "enterprise system locking", "centralized management", "node security"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-advanced"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State Advanced", item: "/products/freeze-state-advanced" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Advanced",
      "Enterprise-grade system locking with centralized network management.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.9, reviewCount: 88 }
    ),
  },
  "data-migration": {
    title: "Data Migration: Secure File Transfer & Sync | D-Secure",
    description: "Transfer data seamlessly across devices and platforms. Bit-perfect migration ensures your data arrives exactly as it should.",
    keywords: generateKeywords(["data migration", "file transfer", "secure sync", "system migration"]),
    canonicalUrl: getCanonicalUrl("/products/data-migration"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Data Migration", item: "/products/data-migration" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Data Migration",
      "Secure and bit-perfect data migration across heterogeneous systems.",
      { category: "UtilitiesApplication", ratingValue: 4.5, reviewCount: 124 }
    ),
  },
  "asset-reimaging": {
    title: "Asset Reimaging: Zero-Touch OS Deployment | D-Secure",
    description: "Deploy custom OS images to hundreds of devices simultaneously. Streamline your IT operations with automated reimaging.",
    keywords: generateKeywords(["asset reimaging", "OS deployment", "zero-touch deployment", "IT automation"]),
    canonicalUrl: getCanonicalUrl("/products/asset-reimaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Asset Reimaging", item: "/products/asset-reimaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Asset Reimaging",
      "Zero-touch automated OS deployment and asset reimaging tool.",
      { category: "BusinessApplication", os: "Windows", ratingValue: 4.7, reviewCount: 65 }
    ),
  },
  "virtual-machine-eraser": {
    title: "VM Eraser: Secure Cloud & Hypervisor Wipe | D-Secure",
    description: "Certified data erasure for VMware, Hyper-V, AWS & Azure. Permanently sanitize virtual disks — NIST compliant with tamper-proof audit reports.",
    keywords: generateKeywords(["virtual machine eraser", "VM data erasure software", "VMware disk wipe", "Hyper-V data sanitization", "cloud VM secure delete", "AWS Azure data erasure compliance"]),
    canonicalUrl: getCanonicalUrl("/products/virtual-machine-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Virtual Machine Eraser", item: "/products/virtual-machine-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Virtual Machine Eraser",
      "Secure data destruction for virtual disks and cloud environments.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 77 }
    ),
  },
  "removable-media-eraser": {
    title: "Removable Media Eraser: USB & SD Wipe | D-Secure",
    description: "Compliance-grade erasure for USBs, SD cards & external disks. D-Secure provides tamper-proof audit reports and certificates for secure data sanitization.",
    keywords: generateKeywords(["USB eraser", "SD card wiping", "removable media destruction", "portable drive eraser"]),
    canonicalUrl: getCanonicalUrl("/products/removable-media-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Removable Media Eraser", item: "/products/removable-media-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Removable Media Eraser",
      "Secure data wiping for USB drives, SD cards, and portable media.",
      { category: "SecurityApplication", ratingValue: 4.7, reviewCount: 142 }
    ),
  },
  "lun-eraser": {
    title: "LUN Eraser: SAN & NAS Storage Sanitization | D-Secure",
    description: "Erase active LUNs in SAN & NAS storage without disrupting data. NIST 800-88 compliant — tamper-proof certificates for secure enterprise decommissioning.",
    keywords: generateKeywords(["LUN eraser software", "SAN data erasure", "NAS LUN sanitization", "active storage array wipe", "enterprise storage decommission", "NIST LUN erasure"]),
    canonicalUrl: getCanonicalUrl("/products/lun-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "LUN Eraser", item: "/products/lun-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure LUN Eraser",
      "High-performance LUN erasure for enterprise storage systems.",
      { category: "SecurityApplication", ratingValue: 4.9, reviewCount: 56 }
    ),
  },
  "drive-verifier": {
    title: "Drive Verifier: Secure Data Erasure Verification | D-Secure",
    description: "Verify 100% data erasure with block-by-block scans. Mandatory for R2v3, NAID AAA & e-Stewards compliance. Ensure zero data traces after sanitization.",
    keywords: generateKeywords(["drive verifier software", "post-erasure verification NIST", "R2v3 data verification", "NAID AAA audit verification", "data erasure verification tool", "e-Stewards compliance verifier"]),
    canonicalUrl: getCanonicalUrl("/products/drive-verifier"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Verifier", item: "/products/drive-verifier" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Verifier",
      "Compliance verification tool for data erasure validation.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 128 }
    ),
  },
  "data-eraser-software": {
    title: "Data Erasure Software: Secure Multi-Device Wipe | D-Secure",
    description: "The ultimate suite for secure data destruction. Erase files, drives, smartphones, and servers with enterprise-grade security and compliance.",
    keywords: generateKeywords(["data erasure software", "secure wiping", "data destruction", "compliance software"]),
    canonicalUrl: getCanonicalUrl("/products/data-eraser-software"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Data Erasure Software", item: "/products/data-eraser-software" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Data Erasure Suite",
      "Complete suite for secure data sanitization across all device types.",
      { category: "SecurityApplication", ratingValue: 4.9, reviewCount: 1250 }
    ),
  },
  "mobile-erasure-solutions": {
    title: "Mobile Erasure Solutions: Enterprise Mobile Wipe | D-Secure",
    description: "Professional solutions for large-scale mobile device erasure. Securely wipe iPhones, iPads, and Android devices for ITAD and resale.",
    keywords: generateKeywords(["mobile erasure", "smartphone wiping", "secure mobile disposal", "ITAD mobile solutions"]),
    canonicalUrl: getCanonicalUrl("/products/mobile-erasure-solutions"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Mobile Erasure Solutions", item: "/products/mobile-erasure-solutions" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mobile Erasure Solutions",
      "High-volume mobile device sanitization for iOS and Android.",
      { category: "SecurityApplication", os: "Android, iOS", ratingValue: 4.8, reviewCount: 432 }
    ),
  },
  "wipe-mac-m1": {
    title: "Wipe M1 Mac: Secure Apple Silicon Data Erasure | D-Secure",
    description: "Learn how to securely erase your Apple Silicon (M1/M2/M3) Mac. Professional guide for data destruction on modern macOS hardware.",
    keywords: generateKeywords(["wipe M1 Mac", "Apple Silicon erasure", "macOS secure wipe", "Mac data destruction"]),
    canonicalUrl: getCanonicalUrl("/products/wipe-mac-m1"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Wipe M1 Mac", item: "/products/wipe-mac-m1" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mac Eraser Guide",
      "Professional guide and tool for erasing Apple Silicon Macs.",
      { category: "SecurityApplication", os: "macOS", ratingValue: 4.9, reviewCount: 224 }
    ),
  },
  "wipe-sas-drive": {
    title: "Wipe SAS Drives: Enterprise SAS Data Security | D-Secure",
    description: "Professional guide for securely erasing enterprise SAS and hardware RAID drives. Ensure data security in your data center environments.",
    keywords: generateKeywords(["wipe SAS drive", "enterprise data erasure", "RAID wiping", "SAS disk destruction"]),
    canonicalUrl: getCanonicalUrl("/products/wipe-sas-drive"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Wipe SAS Drive", item: "/products/wipe-sas-drive" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure SAS Drive Eraser Guide",
      "Enterprise guide and tool for secure SAS drive destruction.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 110 }
    ),
  },
};
