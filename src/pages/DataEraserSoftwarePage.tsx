import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import { themeClasses, ThemeSection, ThemeSectionHeading, ThemeCard, ThemeIconContainer, ThemeButton } from "@/components/ui/Theme";
import SEOHeadNative from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { generateFAQSchema } from "@/utils/seo.core";
import { FAQSection } from "@/components/FAQSection";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import type { FAQItem, KeyTakeawayItem } from "@/types/seo";
import { Activity, Cpu, HardDrive, Zap, Smartphone, Database, Server, Monitor, ShieldCheck, Trash2, FileText, File, MonitorSmartphone, Cloud, Headset, Check, ChevronDown, Usb, Network, Eraser, SearchCheck, ArrowRightLeft, Disc, Fingerprint, Snowflake, Bot, ArrowRight, Globe, Settings, Award } from "lucide-react";

/* ───────────── data ───────────── */

const eraserSolutions = [
  {
    title: "D-Secure Drive Eraser",
    desc: "Permanently erase data from HDD, SSD, NVMe drives on PC, Mac, Servers, RAID arrays & Chromebooks.",
    features: [
      "26+ Global Erasure Standards",
      "Cloud Console Integration",
      "USB, PXE & MSI Deployment",
      "Tamper-proof Certificates",
    ],
    icon: HardDrive,
    color: "emerald",
    link: "/products/drive-eraser",
    isUpcoming: false,
  },
  {
    title: "D-Secure File Eraser",
    desc: "Selectively erase files, folders, free space, and system traces on Windows, macOS & Linux.",
    features: [
      "30+ International Algorithms",
      "Scheduled Erasure Tasks",
      "Detailed PDF/XML Reports",
      "Cloud Storage Support",
    ],
    icon: File,
    color: "teal",
    link: "/products/file-eraser",
    isUpcoming: false,
  },
  {
    title: "Smartphone Eraser",
    desc: "Securely erase all data from iOS and Android smartphones and tablets for resale or recycling.",
    features: [
      "iOS & Android Support",
      "Factory Reset & Overwrite",
      "Batch Processing Support",
      "Erasure Certificates",
    ],
    icon: Smartphone,
    color: "emerald",
    link: "/products/smartphone-eraser",
    isUpcoming: true,
  },
  {
    title: "Removable Media Eraser",
    desc: "Securely erase data from USB sticks, SD cards, and other removable flash storage devices.",
    features: [
      "USB & SD Card Support",
      "20+ Global Standards",
      "Simple Plug-and-Wipe",
      "Compliance Reporting",
    ],
    icon: Usb,
    color: "emerald",
    link: "/products/removable-media-eraser",
    isUpcoming: true,
  },
  {
    title: "LUN Eraser",
    desc: "Securely erase logical unit numbers (LUNs) in complex enterprise storage environments.",
    features: [
      "Enterprise Storage Support",
      "Hot-swap Capability",
      "Zero Downtime Erasure",
      "Centralized Reporting",
    ],
    icon: Server,
    color: "cyan",
    link: "/products/lun-eraser",
    isUpcoming: true,
  },
  {
    title: "Virtual Machine Eraser",
    desc: "Securely wipe virtual machines across leading platforms like VMware and Hyper-V.",
    features: [
      "VMware & Hyper-V Support",
      "Automatic VM Discovery",
      "Audit Trail Generation",
      "Scalable Deployment",
    ],
    icon: Monitor,
    color: "teal",
    link: "/products/virtual-machine-eraser",
    isUpcoming: true,
  },
  {
    title: "D-Secure File Eraser Network",
    desc: "Enterprise network-wide file sanitization and management across your domain.",
    features: [
      "Network-wide File Wiping",
      "Centralized Admin Control",
      "Domain Network Support",
      "Compliance Reporting",
    ],
    icon: Network,
    color: "emerald",
    link: "/products/file-eraser-network",
    isUpcoming: true,
  },
  {
    title: "System Cleaner",
    desc: "A secure data erasure solution built to permanently remove every trace of data from your devices — safely, thoroughly, and beyond recovery.",
    features: [
      "Protected OS Processing",
      "Secure Wipe Cache & Junk",
      "App Trace Removal",
      "Registry Cleaning",
    ],
    icon: Eraser,
    color: "teal",
    link: "/products/system-cleaner",
    isUpcoming: false,
  },
];

const diagnosticSolutions = [
  {
    title: "Data Migration",
    desc: "Fast and secure data migration between devices with minimal downtime and 100% integrity.",
    features: [
      "High-speed Data Transfer",
      "OS & App Migration",
      "User Profile Sync",
      "Minimal System Downtime",
    ],
    icon: ArrowRightLeft,
    color: "emerald",
    link: "/products/data-migration",
    isUpcoming: true,
  },
  {
    title: "Asset Reimaging",
    desc: "High-speed automated system deployment and reimaging for large-scale IT asset management.",
    features: [
      "Zero-Touch Deployment",
      "Custom Image Support",
      "Automated Provisioning",
      "Centralized Fleet Control",
    ],
    icon: Disc,
    color: "blue",
    link: "/products/asset-reimaging",
    isUpcoming: true,
  },
  {
    title: "Drive Verifier",
    desc: "Verify drives locally or via PXE to confirm complete data erasure and audit compliance.",
    features: [
      "Confirm Zero Data Remanence",
      "R2v3 & NAID AAA Compliant",
      "Tamper-proof Digital Reports",
      "Scalable PXE Verification",
    ],
    icon: SearchCheck,
    color: "emerald",
    link: "/products/drive-verifier",
    isUpcoming: true,
  },
  {
    title: "Drive Eraser Diagnostic",
    desc: "Combines secure data wiping with comprehensive hardware health and SMART diagnostics.",
    features: [
      "Integrated Health Check",
      "SMART Data Analysis",
      "Surface Scan Testing",
      "Health-Aware Erasure",
    ],
    icon: HardDrive,
    color: "cyan",
    link: "/products/drive-eraser-diagnostic",
    isUpcoming: true,
  },
  {
    title: "Smartphone Diagnostics",
    desc: "Comprehensive diagnostic tests for mobile devices to verify hardware and battery health.",
    features: [
      "Automated Hardware Tests",
      "Battery Health Analysis",
      "Screen & Touch Testing",
      "Value Appraisal Tools",
    ],
    icon: Smartphone,
    color: "teal",
    link: "/products/smartphone-diagnostic",
    isUpcoming: true,
  },
  {
    title: "Hardware Diagnostics",
    desc: "Professional-grade diagnostic tools for broad hardware health and integrity checking.",
    features: [
      "Multi-Component Testing",
      "Stress Testing Tools",
      "Detailed Error Logs",
      "System Stability Verification",
    ],
    icon: Cpu,
    color: "blue",
    link: "/products/hardware-diagnostics",
    isUpcoming: true,
  },
  {
    title: "SMART Diagnostics",
    desc: "Real-time health monitoring, S.M.A.R.T tracking & disk cloning for your storage drives.",
    features: [
      "Real-time Monitoring",
      "Predictive Failure Alerts",
      "Disk Cloning Utility",
      "Temperature Tracking",
    ],
    icon: HardDrive,
    color: "indigo",
    link: "/products/hard-drive-monitor",
    isUpcoming: true,
  },
  {
    title: "Forensic Imaging",
    desc: "Professional data acquisition tool producing bit-for-bit replicas of media for forensic analysis.",
    features: [
      "Bit-Perfect Duplication",
      "MD5/SHA-1 Hashing",
      "E01/Ex01 Evidence Format",
      "Comprehensive Metadata",
    ],
    icon: Fingerprint,
    color: "cyan",
    link: "/products/forensic-imaging",
    isUpcoming: true,
  },
  {
    title: "FreezeState",
    desc: "Protect system configurations by freezing the state of your drive for public kiosks and labs.",
    features: [
      "Instant Restore on Reboot",
      "Config Tamper Protection",
      "Ideal for Public Access",
      "Zero Maintenance Overhead",
    ],
    icon: Snowflake,
    color: "blue",
    link: "/products/freeze-state",
    isUpcoming: true,
  },
  {
    title: "FreezeState Smart Diagnostic",
    desc: "Intelligent real-time monitoring and predictive health analysis for frozen system states.",
    features: [
      "Real-time Monitoring",
      "S.M.A.R.T. Integration",
      "Health Analytics",
      "Alert System",
    ],
    icon: Snowflake,
    color: "emerald",
    link: "/products/freeze-state-smart",
    isUpcoming: true,
  },
  {
    title: "FreezeState Advanced Eraser",
    desc: "Deep-level sector destruction and military-grade erasure for sensitive frozen environments.",
    features: [
      "Advanced Algorithms",
      "Deep Freeze Wiping",
      "Sector Level Control",
      "Compliance Proof",
    ],
    icon: Zap,
    color: "teal",
    link: "/products/freeze-state-advanced",
    isUpcoming: true,
  },
  {
    title: "Autopilot Detection",
    desc: "Automated hardware detection and tracking for seamless Microsoft Autopilot deployment.",
    features: [
      "Microsoft Intune Sync",
      "Hardware ID Harvesting",
      "Deployment Readiness Check",
      "Automated Enrollment",
    ],
    icon: Bot,
    color: "teal",
    link: "/products/autopilot-detection",
    isUpcoming: true,
  },
];


const capabilities = [
  {
    title: "Reliable Data Erasure",
    desc: "100% guaranteed erasure of sensitive data from HDDs & SSDs across PCs, laptops, Macs, and servers, & mobile devices beyond recovery.",
    icon: ShieldCheck,
  },
  {
    title: "Cloud Console",
    desc: "Secure cloud dashboard that provides flexibility to create users, manage license distribution & maintain a central repository of reports & certificates.",
    icon: Cloud,
  },
  {
    title: "Global Wiping Standards",
    desc: "Supports an extensive list of up to 26 global data erasure standards including NIST 800-88 Purge, NIST 800-88 Clear, IEEE 2883-2022, DoD 3 Pass, HMG, etc.",
    icon: Globe,
  },
  {
    title: "Reports for Audit Trails",
    desc: "Generates data erasure reports for audit trails with the option to customize and save reports in various formats like PDF, and XML.",
    icon: FileText,
  },
  {
    title: "Data Erasure Certificate",
    desc: "Generates 100% tamper-proof data erasure certificate that ensures compliance with EU-GDPR, SOX, GLBA, HIPAA & other international data protection regulations.",
    icon: Award,
  },
  {
    title: "Automate Data Erasure",
    desc: "Automate media sanitization with D-Secure ISO customization to standardize data wiping, eliminate human errors, and ensure consistency across sites.",
    icon: Zap,
  },
  {
    title: "Accurate Diagnostics",
    desc: "Device diagnostics are integrated into the data erasure software, helping assess device health and confirm functionality through a series of automated and manual tests.",
    icon: Settings,
  },
  {
    title: "Centrally Managed Bulk Erasure",
    desc: "Use the network cloud variant to wipe multiple devices or drives over a local network through PXE boot, while managing, monitoring, and reporting through the cloud console.",
    icon: Database,
  },
  {
    title: "API & ERP Integration",
    desc: "D-Secure Drive & Mobile Eraser/Diagnostics software integrates with ERP systems. Cloud API is available to feed data into asset-management tools for seamless data transfer.",
    icon: Server,
  },
];

const useCases = [
  {
    title: "Disposing End-Of-Life IT Assets",
    content:
      "Disposal of old IT assets through physical destruction methods does not guarantee 100% safe media sanitization. For example, shredding can pose a threat of data leakage while the media is 'in transit' to the shredding facility. Likewise, degaussing cannot sanitize flash storage as per NIST SP 800-88 Guideline. Data erasure technology can neutralize all the data threats on end-of-life devices by overwriting the media.",
  },
  {
    title: "Returning Leased IT Assets",
    content:
      "When returning leased IT assets, organizations must ensure all sensitive data is permanently removed. D-Secure data erasure provides verifiable proof of data sanitization through tamper-proof certificates, ensuring compliance with leasing agreements and data protection regulations. This protects both the lessee and lessor from potential data breaches.",
  },
  {
    title: "Reselling IT Assets or Personal Devices",
    content:
      "Before reselling used IT equipment or personal devices, it's critical to permanently erase all data. Simple formatting or factory reset is not sufficient — data can be recovered using forensic tools. D-Secure's compliance-ready data erasure ensures complete data removal beyond recovery, maximizing resale value while protecting sensitive information.",
  },
];

const dataEraserFaqs: FAQItem[] = [
  {
    question: "What types of storage media can D-Secure erase?",
    answer: "D-Secure can erase HDDs, SSDs, NVMe drives, USB drives, memory cards, and more across PCs, Macs, servers, laptops, Chromebooks, and mobile devices (iOS & Android).",
  },
  {
    question: "Do I need separate licenses for different types of drives (HDD, SSD, NVMe, etc.)?",
    answer: "No, a single D-Secure Drive Eraser license covers all types of drives connected to a machine. Whether it's HDD, SSD, NVMe, or any other storage media, one license handles them all.",
  },
  {
    question: "Can I diagnose the essential components of the drive?",
    answer: "Yes, D-Secure includes integrated hardware diagnostics that assess the health of storage drives. This includes SMART data analysis, surface scan testing, and comprehensive health reporting before or after erasure.",
  },
  {
    question: "What erasure standards does D-Secure support?",
    answer: "D-Secure supports 26+ global erasure standards including NIST 800-88 (Clear & Purge), DoD 5220.22-M, IEEE 2883-2022, HMG Infosec Standard 5, RCMP TSSIT OPS-II, and many more.",
  },
  {
    question: "Can D-Secure wipe multiple iOS and Android devices simultaneously?",
    answer: "Yes, D-Secure Mobile Eraser supports batch processing of multiple iOS and Android devices simultaneously, making it ideal for enterprise environments with large device fleets.",
  },
  {
    question: "What are the features of D-Secure File Eraser software?",
    answer: "D-Secure File Eraser provides selective file and folder erasure, scheduled erasure, cloud storage erasure (Google Drive, OneDrive), browser trace cleaning, and tamper-proof erasure certificates with full audit trails.",
  },
];

const dataEraserTakeaways: KeyTakeawayItem[] = [
  { text: "100% Guaranteed Erasure: Permanently erase data from HDDs, SSDs, Macs, Servers, and Mobile Devices beyond recovery." },
  { text: "Global Standards Support: Compliant with 26+ global erasure standards, including NIST 800-88 and DoD 5220.22-M." },
  { text: "Tamper-Proof Certification: Generate digitally signed erasure certificates that meet GDPR, HIPAA, and ISO 27001 requirements." },
  { text: "Centralized Cloud Console: Manage licenses, deploy network wipes via PXE, and track comprehensive erasure reports centrally." }
];

/* ─────────── helpers ─────────── */
const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: {
    bg: "from-emerald-50 to-emerald-100/50",
    border: "border-emerald-200/60 hover:border-emerald-400",
    text: "text-emerald-800",
    iconBg: "from-emerald-500 to-emerald-600",
  },
  teal: {
    bg: "from-teal-50 to-teal-100/50",
    border: "border-teal-200/60 hover:border-teal-400",
    text: "text-teal-600",
    iconBg: "from-teal-500 to-teal-600",
  },
  cyan: {
    bg: "from-cyan-50 to-cyan-100/50",
    border: "border-cyan-200/60 hover:border-cyan-400",
    text: "text-cyan-600",
    iconBg: "from-cyan-500 to-cyan-600",
  },
  blue: {
    bg: "from-blue-50 to-blue-100/50",
    border: "border-blue-200/60 hover:border-blue-400",
    text: "text-blue-600",
    iconBg: "from-blue-500 to-blue-600",
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100/50",
    border: "border-indigo-200/60 hover:border-indigo-400",
    text: "text-indigo-600",
    iconBg: "from-indigo-500 to-indigo-600",
  },
  purple: {
    bg: "from-purple-50 to-purple-100/50",
    border: "border-purple-200/60 hover:border-purple-400",
    text: "text-purple-600",
    iconBg: "from-purple-500 to-purple-600",
  },
};

/* ═══════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════ */
const DataEraserSoftwarePage: React.FC = memo(function DataEraserSoftwarePage() {
  const [openUseCase, setOpenUseCase] = useState<number>(0);
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "products", label: "Products" },
    { id: "use-cases", label: "Use Cases" },
    { id: "capabilities", label: "Capabilities" },
    { id: "why-dsecure", label: "Why D-Secure" },
    { id: "faq", label: "FAQ" },
    { id: "cta", label: "Get Started" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage("data-eraser-software")} 
        structuredData={generateFAQSchema(dataEraserFaqs)}
      />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        {/* ═══════════ HERO ═══════════ */}
        <ThemeSection noBg>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    D-Secure Data Eraser Software
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    All Data Erasure &{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Diagnostic Products
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Erase data from HDD, SSD, PC, Mac, Server & Mobile devices
                    onsite, offsite & remotely. Helps meet compliance with laws
                    and regulations.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "ISO 27001"].map(
                      (badge) => (
                        <div
                          key={badge}
                          className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-700">
                            {badge}
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Submit Enquiry
                    </Link>
                    {/*
                    <Link
                      to="/pricing-and-plan"
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 px-8 py-4 rounded-none font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13v5a2 2 0 002 2h6.5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Buy Now
                    </Link>
                    */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 px-8 py-4 rounded-none font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Right: Floating Monitor with D-Secure Dashboard */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[340px] sm:min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl"></div>

                  {/* Orbiting Device Icons */}
                  <div className="absolute inset-0 hidden sm:block">
                    {[
                      {
                        top: "5%",
                        left: "10%",
                        label: "HDD",
                        icon: HardDrive,
                        delay: "0s",
                      },
                      {
                        top: "8%",
                        right: "5%",
                        label: "SSD",
                        icon: Database,
                        delay: "0.6s",
                      },
                      {
                        bottom: "25%",
                        left: "2%",
                        label: "Mobile",
                        icon: Smartphone,
                        delay: "1.2s",
                      },
                      {
                        bottom: "15%",
                        right: "3%",
                        label: "Cloud",
                        icon: Cloud,
                        delay: "0.3s",
                      },
                      {
                        top: "45%",
                        left: "0%",
                        label: "Server",
                        icon: Server,
                        delay: "0.9s",
                      },
                      {
                        bottom: "5%",
                        left: "35%",
                        label: "Mac",
                        icon: Monitor,
                        delay: "1.5s",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="absolute group"
                        style={{
                          top: item.top,
                          left: item.left,
                          right: item.right,
                          bottom: item.bottom,
                        }}
                      >
                        <div
                          className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-none shadow-lg border border-emerald-100 flex items-center justify-center transition-all hover:shadow-xl hover:border-emerald-400"
                          style={{
                            animation: `deviceBob 3s ease-in-out infinite ${item.delay}`,
                          }}
                        >
                          <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-800" strokeWidth={1.8} />
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-500 whitespace-nowrap">
                          {item.label}
                        </span>
                        {/* Connection line to center */}
                        <div
                          className="absolute top-1/2 left-1/2 w-8 lg:w-12 h-px bg-gradient-to-r from-emerald-300/40 to-transparent origin-left"
                          style={{
                            transform: `rotate(${item.right ? "180deg" : "0deg"})`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Main Monitor */}
                  <div
                    className="relative z-10"
                    style={{
                      animation: "monitorFloat 6s ease-in-out infinite",
                    }}
                  >
                    {/* Glow behind monitor */}
                    <div className="absolute -inset-6 lg:-inset-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full"></div>

                    {/* Monitor frame */}
                    <div className="relative w-[260px] sm:w-[300px] lg:w-[380px]">
                      {/* Screen bezel */}
                      <div
                        className="bg-slate-900 rounded-t-xl sm:rounded-t-2xl p-1.5 sm:p-2 lg:p-2.5 shadow-2xl border border-slate-700/50"
                        style={{
                          boxShadow:
                            "0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.15)",
                        }}
                      >
                        {/* Screen content */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-none sm:rounded-none overflow-hidden">
                          {/* Title bar */}
                          <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-slate-800/80 border-b border-slate-700/50">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-slate-500 font-medium">
                              D-Secure Console
                            </span>
                            <div className="w-6"></div>
                          </div>

                          {/* Dashboard content */}
                          <div className="p-2.5 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
                            {/* Top stats row */}
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-none p-1.5 sm:p-2 text-center">
                                <div className="text-emerald-400 font-bold text-xs sm:text-sm lg:text-lg">
                                  847
                                </div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">
                                  Devices Wiped
                                </div>
                              </div>
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-none p-1.5 sm:p-2 text-center">
                                <div className="text-teal-400 font-bold text-xs sm:text-sm lg:text-lg">
                                  100%
                                </div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">
                                  Success Rate
                                </div>
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-none p-1.5 sm:p-2 text-center">
                                <div className="text-cyan-400 font-bold text-xs sm:text-sm lg:text-lg">
                                  26+
                                </div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">
                                  Standards
                                </div>
                              </div>
                            </div>

                            {/* Active erasure task */}
                            <div className="bg-slate-800/60 rounded-none p-2 sm:p-2.5 border border-slate-700/40">
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                  </div>
                                  <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-white font-medium">
                                    Batch Erasure — NIST 800-88
                                  </span>
                                </div>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="h-1 sm:h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  style={{
                                    width: "72%",
                                    animation:
                                      "progressGrow 3s ease-in-out infinite",
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-[6px] sm:text-[7px] text-slate-500">
                                  12 of 16 devices
                                </span>
                                <span className="text-[6px] sm:text-[7px] text-emerald-400 font-bold">
                                  72%
                                </span>
                              </div>
                            </div>

                            {/* Recent reports mini list */}
                            <div className="space-y-1">
                              {[
                                {
                                  name: "WD Blue 2TB",
                                  status: "verified",
                                  time: "2m ago",
                                },
                                {
                                  name: "Samsung 870 EVO",
                                  status: "verified",
                                  time: "5m ago",
                                },
                                {
                                  name: "iPhone 14 Pro",
                                  status: "in-progress",
                                  time: "now",
                                },
                              ].map((item) => (
                                <div
                                  key={item.name}
                                  className="flex items-center justify-between px-2 py-1 rounded bg-slate-800/40"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <div
                                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${item.status === "verified" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
                                    ></div>
                                    <span className="text-[7px] sm:text-[8px] text-slate-400">
                                      {item.name}
                                    </span>
                                  </div>
                                  <span className="text-[6px] sm:text-[7px] text-slate-600">
                                    {item.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monitor stand */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-20 lg:w-24 h-4 sm:h-5 lg:h-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-sm"></div>
                        <div className="w-24 sm:w-28 lg:w-36 h-1.5 sm:h-2 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes monitorFloat {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                    }
                    @keyframes deviceBob {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-6px); }
                    }
                    @keyframes progressGrow {
                      0%, 100% { width: 72%; }
                      50% { width: 78%; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= KEY TAKEAWAYS ================= */}
        
        {/* ================= KEY TAKEAWAYS ================= */}
        <ThemeSection alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <KeyTakeaways 
              title="Key Features & Takeaways" 
              items={dataEraserTakeaways} 
            />
          </div>
        </ThemeSection>



        {/* ═══════════ OUR PRODUCTS ═══════════ */}
        <ThemeSection id="products">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading 
                centered 
                subtitle="Powerful software products designed for complete data sanitization and comprehensive hardware diagnostics."
              >
                Our Comprehensive <span className="text-[#0e7c66]">Solutions</span>
              </ThemeSectionHeading>
            </Reveal>

            {/* ERASERS SECTION */}
            <div className="mb-20">
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-grow bg-emerald-100"></div>
                  <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                    Erasers
                  </h3>
                  <div className="h-px flex-grow bg-emerald-100"></div>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {eraserSolutions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Reveal key={s.title} delayMs={i * 80} className="h-full">
                      <ThemeCard className="h-full flex flex-col group relative transition-all duration-300 block">
                        <div className="flex items-start justify-between mb-5">
                          <ThemeIconContainer icon={Icon} size="lg" />
                          {s.isUpcoming && (
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 rounded-none border border-amber-200 shadow-sm">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <h4 className={`${themeClasses.typography.cardTitle} mb-3`}>
                          {s.title}
                        </h4>
                        <p className={`${themeClasses.typography.cardBody} mb-6`}>
                          {s.desc}
                        </p>
                        
                        {/* Feature Points for Height Consistency */}
                        <div className="space-y-3 mb-8 flex-grow">
                          {s.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-[#d4ede4] flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Check className="w-3.5 h-3.5 text-[#0e7c66]" strokeWidth={3} />
                              </div>
                              <span className="text-xs text-[#5a6672] font-medium leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          to={s.link}
                          className={`inline-flex items-center text-sm font-bold text-[#0e7c66] mt-auto pt-4 border-t border-slate-200/50 group-hover:gap-2 transition-all after:absolute after:inset-0`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </ThemeCard>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* MIGRATION & DIAGNOSTICS SECTION */}
            <div>
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-grow bg-emerald-100"></div>
                  <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                    Migration & Diagnostics
                  </h3>
                  <div className="h-px flex-grow bg-emerald-100"></div>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {diagnosticSolutions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Reveal key={s.title} delayMs={i * 80} className="h-full">
                      <ThemeCard className="h-full flex flex-col group relative transition-all duration-300 block">
                        <div className="flex items-start justify-between mb-5">
                          <ThemeIconContainer icon={Icon} size="lg" />
                          {s.isUpcoming && (
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 rounded-none border border-amber-200 shadow-sm">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <h4 className={`${themeClasses.typography.cardTitle} mb-3`}>
                          {s.title}
                        </h4>
                        <p className={`${themeClasses.typography.cardBody} mb-6`}>
                          {s.desc}
                        </p>

                        {/* Feature Points for Height Consistency */}
                        <div className="space-y-3 mb-8 flex-grow">
                          {s.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-[#d4ede4] flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Check className="w-3.5 h-3.5 text-[#0e7c66]" strokeWidth={3} />
                              </div>
                              <span className="text-xs text-[#5a6672] font-medium leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          to={s.link}
                          className={`inline-flex items-center text-sm font-bold text-[#0e7c66] mt-auto pt-4 border-t border-slate-200/50 group-hover:gap-2 transition-all after:absolute after:inset-0`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </ThemeCard>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* ═══════════ USE CASES ═══════════ */}
        <ThemeSection id="use-cases" alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left — illustration placeholder */}
              <Reveal>
                <div className="bg-[#0e7c66] rounded-none p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-[#0a2e1e] rounded-none flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      D-Secure Use Cases
                    </div>
                    <p className="text-sm text-emerald-50 max-w-xs">
                      When to use D-Secure Data Eraser Software
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right — accordion */}
              <div className="space-y-4">
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0a2e1e] mb-2">
                    D-Secure <span className="text-[#0e7c66]">Use Cases</span>
                  </h2>
                  <p className="text-[#5a6672] mb-6">
                    When to use D-Secure Data Eraser Software
                  </p>
                </Reveal>

                {useCases.map((uc, i) => (
                  <Reveal key={uc.title} delayMs={i * 80}>
                    <div className="bg-white rounded-none border border-slate-200/60 shadow-sm overflow-hidden">
                      <button
                        id={`use-case-trigger-${i}`}
                        onClick={() =>
                          setOpenUseCase(openUseCase === i ? -1 : i)
                        }
                        aria-expanded={openUseCase === i}
                        aria-controls={`use-case-content-${i}`}
                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900">
                          {uc.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                            openUseCase === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <section
                        id={`use-case-content-${i}`}
                        aria-labelledby={`use-case-trigger-${i}`}
                        className={`overflow-hidden transition-all duration-300 ${
                          openUseCase === i
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {uc.content}
                        </div>
                      </section>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* ═══════════ CAPABILITIES 3×3 ═══════════ */}
        <ThemeSection alternate id="capabilities">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <ThemeSectionHeading 
                centered 
                subtitle="Scalable, manageable & cost-effective solution"
                className="mb-14"
              >
                D-Secure Software With <span className="text-[#0e7c66]">Excellent Capabilities</span>
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <Reveal key={cap.title} delayMs={i * 60}>
                    <ThemeCard className="h-full">
                      <ThemeIconContainer icon={Icon} size="lg" className="mb-5" />
                      <h3 className={themeClasses.typography.cardTitle}>
                        {cap.title}
                      </h3>
                      <p className={themeClasses.typography.cardBody}>
                        {cap.desc}
                      </p>
                    </ThemeCard>
                  </Reveal>
                );
              })}
            </div>

            {/* CTAs */}
            <Reveal delayMs={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
                <Link to="/contact">
                  <ThemeButton variant="primary">
                    Submit Enquiry
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </ThemeButton>
                </Link>
                <Link to="/contact">
                  <ThemeButton variant="outline">
                    Contact Sales
                  </ThemeButton>
                </Link>
              </div>
            </Reveal>
          </div>
        </ThemeSection>



        {/* ═══════════ WHY D-SECURE ═══════════ */}
        <ThemeSection id="why-dsecure">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <ThemeSectionHeading 
                centered 
                subtitle="Purpose-built for organizations that take data privacy seriously"
                className="mb-12"
              >
                Why Choose D-Secure?
              </ThemeSectionHeading>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "26+ Erasure Standards",
                  desc: "Aligned with NIST 800-88, DoD 5220.22-M, IEEE 2883, HMG & more international standards",
                },
                {
                  icon: Trash2,
                  title: "100% Data Removal",
                  desc: "Overwrites every sector on HDD, SSD, NVMe — data becomes irrecoverable by any forensic tool",
                },
                {
                  icon: FileText,
                  title: "Tamper-Proof Reports",
                  desc: "Auto-generated erasure certificates in PDF & XML — ready for audits and regulatory reviews",
                },
                {
                  icon: MonitorSmartphone,
                  title: "Multi-Platform Support",
                  desc: "Works across Windows, macOS, Linux, Chromebook, iOS & Android — one tool for all devices",
                },
                {
                  icon: Cloud,
                  title: "Cloud Console",
                  desc: "Centralized dashboard to manage licenses, users, and store all erasure reports securely",
                },
                {
                  icon: Headset,
                  title: "Dedicated Support",
                  desc: "Direct access to our engineering team for onboarding, deployment help & technical queries",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delayMs={i * 80}>
                  <ThemeCard className="h-full">
                    <div className="flex items-center gap-4">
                      <ThemeIconContainer icon={item.icon} size="md" />
                      <div>
                        <h3 className="font-bold text-[#0a2e1e] mb-1 leading-tight group-hover:text-[#0e7c66] transition-colors duration-150">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#5a6672] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ═══════════ FAQ ═══════════ */}
        <FAQSection faqs={dataEraserFaqs} id="faq" />

        {/* ═══════════ FINAL CTA ═══════════ */}
        <ThemeSection id="cta" noBg className="bg-[#0e7c66]">
          <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
            <Reveal>
              <div className="text-center mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to Secure Your Data?
                </h2>
                <p className="text-lg text-emerald-50 max-w-3xl mx-auto">
                  Get started with D-Secure's compliance-ready data erasure software. Protect your organization from data breaches and ensure regulatory compliance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center group/cta">
                <Link to="/contact">
                  <button className="inline-flex items-center justify-center font-bold text-lg min-h-[44px] px-8 py-3 rounded-none transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none cursor-pointer bg-white text-[#0e7c66] hover:bg-emerald-50 group/btn gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Submit Enquiry
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center justify-center font-bold text-lg min-h-[44px] px-8 py-3 rounded-none transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none cursor-pointer bg-transparent text-white border-2 border-white hover:bg-white/10">
                    Contact Sales
                  </button>
                </Link>
              </div>
            </Reveal>
          </div>
        </ThemeSection>
      </div>
    </>
  );
});

export default DataEraserSoftwarePage;
