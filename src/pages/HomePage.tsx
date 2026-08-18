import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import DSecureIconOnly from "@/assets/dsecure-icon-only.svg"; // Assuming vite-plugin-svgr or similar, but wait, typical vite import provides url by default.
import OptimizedImage from "@/components/OptimizedImage";
import UpcomingBadge from "@/components/ui/UpcomingBadge";
import { Search, Monitor, Terminal, Database, FileCheck, CheckCircle2, X, ZoomIn, ZoomOut, ShieldCheck, Download, Mail, Check, Trash2, Cloud, Folder, HardDrive, Phone, Coins, DollarSign, ShoppingCart, Lock, Server, Zap, Globe, ArrowRight, ArrowLeft, Shield, Building2, Star, Settings, ClipboardCheck, Heart, Smartphone, Activity, Cpu, File, Usb, Network, Eraser, SearchCheck, ArrowRightLeft, Disc, Snowflake, Bot, Landmark, HeartPulse, RefreshCcw, CreditCard, Award, Headphones, Gauge, Building, Layers, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, memo, useMemo, useCallback, useState } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { usePerformanceMonitor } from "@/utils/performanceUtils";
import { useTranslation } from "react-i18next";
import { FAQSection } from "@/components/FAQSection";
import { ThemeButton, ThemeCard, ThemeIconContainer, ThemeSectionHeading, ThemeSection, themeClasses, themeTokens } from "@/components/ui/Theme";
import { homeFAQs } from "@/data/seoFaqs";
const HomePage = memo(function HomePage() {
  usePerformanceMonitor("HomePage");
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReportUrl, setSelectedReportUrl] = useState<string>('');
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const [copied, setCopied] = useState(false);

  const handleOpenModal = useCallback((reportUrl: string, thumbnailUrl: string) => {
    setSelectedReportUrl(reportUrl);
    setSelectedImage(thumbnailUrl);
    setShowFullPdf(false);
    setZoomScale(1);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedReportUrl('');
    setSelectedImage(null);
    setShowFullPdf(false);
    setZoomScale(1);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = useMemo(
    () => [
      {
        id: "drive-eraser",
        title: t("home.driveEraserTitle"),
        desc: t("home.driveEraserDesc"),
        price: t("home.driveEraserPrice"),
        note: t("home.driveEraserPriceNote"),
        link: "/products/drive-eraser",
        icon: HardDrive,
        color: "emerald",
        isUpcoming: false,
        features: [
          t("home.driveEraserFeature1"),
          t("home.driveEraserFeature2"),
          t("home.driveEraserFeature3"),
          t("home.driveEraserFeature4"),
        ],
      },
      {
        id: "file-eraser",
        title: t("home.fileEraserTitle"),
        desc: t("home.fileEraserDesc"),
        price: t("home.fileEraserPrice"),
        note: t("home.fileEraserPriceNote"),
        link: "/products/file-eraser",
        icon: File,
        color: "blue",
        isUpcoming: false,
        features: [
          t("home.fileEraserFeature1"),
          t("home.fileEraserFeature2"),
          t("home.fileEraserFeature3"),
          t("home.fileEraserFeature4"),
        ],
      },
      {
        id: "file-eraser-network",
        title: t("home.fileEraserNetworkTitle"),
        desc: t("home.fileEraserNetworkDesc"),
        price: t("home.fileEraserNetworkPrice"),
        note: t("home.fileEraserNetworkPriceNote"),
        link: "/products/file-eraser-network",
        icon: Network,
        color: "teal",
        isUpcoming: true,
        features: [
          t("home.fileEraserNetworkFeature1"),
          t("home.fileEraserNetworkFeature2"),
          t("home.fileEraserNetworkFeature3"),
          t("home.fileEraserNetworkFeature4"),
        ],
      },
      {
        id: "zero-trace",
        title: "Zero Trace",
        desc: "A secure data erasure solution built to permanently remove every trace of data from your devices — safely, thoroughly, and beyond recovery.",
        price: "TBA",
        note: "Standard model",
        link: "/products/zero-trace",
        icon: Eraser,
        color: "teal",
        isUpcoming: false,
        features: [
          "Protected OS Cleaning",
          "Secure Wipe Cache & Junk",
          "App Trace Removal",
          "Registry Cleaning",
        ],
      },
      {
        id: "smartphone-eraser",
        title: t("home.smartphoneEraserTitle"),
        desc: "Bulk iOS & Android wiping with audit reports.",
        price: "starting at $1",
        note: "pay per use",
        link: "/products/smartphone-eraser",
        icon: Smartphone,
        color: "emerald",
        isUpcoming: true,
        features: [
          "Bulk processing",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "Support iOS & Android",
          "Full Factory Reset",
        ],
      },
      {
        id: "smartphone-diagnostic",
        title: t("home.smartphoneDiagnosticTitle"),
        desc: "50+ automated tests for mobile health.",
        price: "starting at $10",
        note: "pay per use",
        link: "/products/smartphone-diagnostic",
        icon: Smartphone,
        color: "teal",
        isUpcoming: true,
        features: [
          "50+ Automated Tests",
          "Quick Diagnosis",
          "Battery Health check",
          "Hardware verification",
        ],
      },
      {
        id: "hardware-diagnostics",
        title: t("home.hardwareDiagnosticTitle"),
        desc: "Enterprise-grade diagnostic tools.",
        price: "starting at $10",
        note: "pay per use",
        link: "/products/hardware-diagnostics",
        icon: Cpu,
        color: "emerald",
        isUpcoming: true,
        features: [
          "System-wide testing",
          "Hardware health checks",
          "Component stress test",
          "Burn-in testing",
        ],
      },
      {
        id: "drive-eraser-diagnostic",
        title: t("home.driveEraserDiagnosticTitle"),
        desc: "Disk health monitoring and diagnostic.",
        price: "starting at $30",
        note: "pay per use",
        link: "/products/drive-eraser-diagnostic",
        icon: HardDrive,
        color: "blue",
        isUpcoming: true,
        features: [
          "Health monitoring",
          "S.M.A.R.T analytics",
          "Performance testing",
          "Bad sector check",
        ],
      },
      {
        id: "drive-verifier",
        title: "Drive Verifier",
        desc: "Verify erased drives for data traces & audit compliance.",
        price: "TBA",
        note: "Standard model",
        link: "/products/drive-verifier",
        icon: SearchCheck,
        color: "emerald",
        isUpcoming: true,
        features: [
          "Erasure Verification",
          "Compliance Auditing",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "USB & PXE Support",
        ],
      },
      {
        id: "virtual-machine-eraser",
        title: t("home.virtualMachineEraserTitle"),
        desc: "Securely wipe VMs on ESXi & Hyper-V hosts.",
        price: "starting at $20",
        note: "pay per use",
        link: "/products/virtual-machine-eraser",
        icon: Monitor,
        color: "emerald",
        isUpcoming: true,
        features: [
          "ESXi & Hyper-V support",
          "Secure VM removal",
          "Centralized management",
          "Automated workflows",
        ],
      },
      {
        id: "removable-media-eraser",
        title: t("home.removableMediaEraserTitle"),
        desc: "Securely erase USB & flash storage devices.",
        price: "TBA",
        note: "Standard model",
        link: "/products/removable-media-eraser",
        icon: Usb,
        color: "emerald",
        isUpcoming: true,
        features: [
          "USB & SSD erasure",
          "Quick Wipe tools",
          "SD & Flash support",
          "Compact form factor",
        ],
      },
      {
        id: "lun-eraser",
        title: t("home.lunEraserTitle"),
        desc: "Sanitize Logical Unit Numbers in active storage.",
        price: "TBA",
        note: "Standard model",
        link: "/products/lun-eraser",
        icon: Server,
        color: "emerald",
        isUpcoming: true,
        features: [
          "Storage Array support",
          "LUN level sanitation",
          "Fiber Channel support",
          "Remote erasure",
        ],
      },
      {
        id: "forensic-imaging",
        title: t("home.forensicImagingTitle"),
        desc: "Evidence-grade disk imaging and collection.",
        price: "starting at $1053",
        note: "pay per license",
        link: "/products/forensic-imaging",
        icon: Disc,
        color: "blue",
        isUpcoming: true, // Already true, confirmed
        features: [
          "Bit-for-bit imaging",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "E01 & Raw formats",
          "Hashing verification",
        ],
      },
      {
        id: "freeze-state",
        title: t("home.freezeStateTitle"),
        desc: "System preservation and rollback solutions.",
        price: "starting at $80",
        note: "pay per license",
        link: "/products/freeze-state",
        icon: Snowflake,
        color: "teal",
        isUpcoming: true,
        features: [
          "State preservation",
          "One-click rollback",
          "Anti-tamper protection",
          "Policy management",
        ],
      },
      {
        id: "data-migration",
        title: t("home.dataMigrationTitle"),
        desc: "Seamless data transfer between platforms.",
        price: "starting at $5",
        note: "pay per use",
        link: "/products/data-migration",
        icon: ArrowRightLeft,
        color: "emerald",
        isUpcoming: true,
        features: [
          "Cross-platform transfer",
          "Verified migration",
          "Zero downtime",
          "File-level granularity",
        ],
      },
      {
        id: "asset-reimaging",
        title: t("home.assetReimagingTitle"),
        desc: "Automated OS deployment and reimaging.",
        price: "TBA",
        note: "Standard model",
        link: "/products/asset-reimaging",
        icon: Disc,
        color: "blue",
        isUpcoming: true,
        features: [
          "Zero-touch deployment",
          "Custom image support",
          "Pre-configured templates",
          "Network booting",
        ],
      },
      {
        id: "freeze-state-smart",
        title: "FreezeState Smart Diagnostic",
        desc: "Intelligent real-time monitoring and predictive health analysis.",
        price: "starting at $85",
        note: "pay per license",
        link: "/products/freeze-state-smart",
        icon: Snowflake,
        color: "emerald",
        isUpcoming: true,
        features: [
          "Real-time Monitoring",
          "S.M.A.R.T. Integration",
          "Health Analytics",
          "Alert System",
        ],
      },
      {
        id: "freeze-state-advanced",
        title: "FreezeState Advanced Eraser",
        desc: "Deep-level sector destruction and military-grade erasure.",
        price: "starting at $90",
        note: "pay per license",
        link: "/products/freeze-state-advanced",
        icon: Snowflake,
        color: "teal",
        isUpcoming: true,
        features: [
          "Advanced Algorithms",
          "Deep Freeze Wiping",
          "Sector Level Control",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
        ],
      },
      {
        id: "autopilot-detection",
        title: t("home.autopilotDetectionTitle"),
        desc: "Automated hardware detection and tracking.",
        price: "starting at $5",
        note: "pay per use",
        link: "/products/autopilot-detection",
        icon: Bot,
        color: "teal",
        isUpcoming: true,
        features: [
          "Auto-detection",
          "Asset tracking",
          "Intune integration",
          "Compliance check",
        ],
      },
    ],
    [
      t,
      HardDrive,
      File,
      Network,
      Eraser,
      Smartphone,
      Cpu,
      Activity,
      SearchCheck,
      Monitor,
      Usb,
      Server,
      Disc,
      Snowflake,
      ArrowRightLeft,
      Bot,
    ],
  );

  const scrollToHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage("home")} 
        structuredData={{ 
          '@context': 'https://schema.org', 
          '@type': 'FAQPage', 
          mainEntity: homeFAQs.map(faq => ({ 
            '@type': 'Question', 
            name: faq.question, 
            acceptedAnswer: { '@type': 'Answer', text: faq.answer } 
          })) 
        }} 
      />



      {/* Independence Day Banner Strip - Always Visible Until Expiration */}
      {new Date().getTime() <= new Date('2026-08-15T23:59:59').getTime() && (
        <div className="w-full bg-[#f4fcf8] border-b border-[#0e7c66]/20">
          <div className="relative w-full flex justify-center">
            <Link to="/pricing-and-plan?product=file-eraser" className="block w-full transition-opacity hover:opacity-95 duration-300">
              <img 
                src="/banner-strip.jpeg" 
                alt="Independence Day Offer - Click for Pricing and Plans" 
                className="w-full h-auto rounded-none shadow-md block"
              />
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText("IND15");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute left-[41.7%] sm:left-[42.2%] md:left-[42.7%] top-[60%] -translate-y-1/2 flex items-center justify-center p-0.5 sm:p-1 md:p-1.5 text-white bg-transparent hover:bg-white/20 transition-colors z-10"
              title="Copy Code IND15"
            >
              {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section: Yahan par primary Call to Action (CTA) aur background animations hain */}
      <ThemeSection id="hero" className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 xxl:py-18 relative overflow-hidden" >
        <div className="container-responsive relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16 xxl:gap-20 items-center">
            <div className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-8 lg:space-y-8 xl:space-y-10 xxl:space-y-12 lg:pr-6 xl:pr-8 xxl:pr-12">
              <Reveal>
                <div className="space-y-6">
                  <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl xxl:text-6xl font-bold tracking-tight text-[#0a2e1e] leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight xxl:leading-tight">
                    {t("hero.title")}{" "}
                    <span className="text-[#0e7c66]">
                      {t("hero.titleHighlight")}
                    </span>
                  </h1>
                  <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-black leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed xxl:leading-relaxed">
                    {t("hero.subtitle")}
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={20}>
                <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row items-start xs:items-start sm:items-center md:items-center lg:items-center xl:items-center xxl:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 xxl:gap-6">
                  <Link
                    to="/all-products"
                    className={`${themeClasses.button.base} ${themeClasses.button.primary} w-full sm:w-auto`}
                    aria-label="Explore D-Secure Software"
                  >
                    <ShieldCheck
                          className="w-5 h-5 mr-2"
                          stroke="currentColor"
                        />
                    {t("home.exploreDataEraserSoftware", "Explore D-Secure")}
                  </Link>
                  {/* 
                  <Link
                    to="/pricing-and-plan"
                    className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none min-h-[44px]"
                  >
                    <ShoppingCart
                          className="w-5 h-5 mr-2"
                          stroke="currentColor"
                        />
                    Buy Now
                  </Link>
                  */}
                  <Link
                    to="/contact"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto`}
                  >
                    <Mail
                          className="w-5 h-5 mr-2"
                          stroke="currentColor"
                        />
                    Contact Sales
                  </Link>
                </div>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-wrap items-center gap-4 text-sm text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>ISO 27001</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>NIST 800-88</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>GDPR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>SOC 2</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="relative lg:order-last -mt-14 lg:-mt-20">
              <Reveal delayMs={0}>
                <div className="relative flex items-center justify-center min-h-[340px] lg:min-h-[460px]">
                  {/* Hero Illustration Container - Professional Design */}
                  <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] scale-90 sm:scale-100">
                    {/* Outer Glow Ring - White glow */}
                    <div className="absolute inset-0 rounded-full bg-white/40 blur-md"></div>

                    {/* Outer Dashed Circle */}
                    <svg
                      className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                      viewBox="0 0 480 480"
                    >
                      <circle
                        cx="240"
                        cy="240"
                        r="225"
                        fill="none"
                        stroke="url(#gradientOuter)"
                        strokeWidth="1.5"
                        strokeDasharray="12 8"
                        opacity="0.5"
                      />
                      <defs>
                        <linearGradient
                          id="gradientOuter"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Inner Dashed Circle */}
                    <svg
                      className="absolute inset-0 w-full h-full animate-[spin_45s_linear_infinite_reverse]"
                      viewBox="0 0 480 480"
                    >
                      <circle
                        cx="240"
                        cy="240"
                        r="145"
                        fill="none"
                        stroke="url(#gradientInner)"
                        strokeWidth="1.5"
                        strokeDasharray="8 6"
                        opacity="0.6"
                      />
                      <defs>
                        <linearGradient
                          id="gradientInner"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#0e7c66" />
                          <stop offset="100%" stopColor="#0e7c66" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Central Element - Shield with Data Protection Theme */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        {/* Shield Background */}
                        <div className="w-[140px] h-[160px] lg:w-[180px] lg:h-[200px] relative">
                          {/* Shield Shape */}
                          <svg
                            viewBox="0 0 100 120"
                            className="w-full h-full drop-shadow-xl"
                          >
                            <defs>
                              <linearGradient
                                id="shieldGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#0e7c66" />
                                <stop offset="50%" stopColor="#0e7c66" />
                                <stop offset="100%" stopColor="#1c2530" />
                              </linearGradient>
                              <filter
                                id="shieldShadow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                              >
                                <feDropShadow
                                  dx="0"
                                  dy="4"
                                  stdDeviation="6"
                                  floodColor="#0e7c66"
                                  floodOpacity="0.3"
                                />
                              </filter>
                            </defs>
                            <path
                              d="M50 5 L95 25 L95 55 C95 85 75 105 50 115 C25 105 5 85 5 55 L5 25 Z"
                              fill="url(#shieldGradient)"
                              filter="url(#shieldShadow)"
                            />
                            {/* Shield Inner Border */}
                            <path
                              d="M50 12 L88 29 L88 55 C88 80 71 97 50 106 C29 97 12 80 12 55 L12 29 Z"
                              fill="none"
                              stroke="white"
                              strokeWidth="1"
                              opacity="0.3"
                            />
                          </svg>

                          {/* Shield Content - Checkmark + Data Icon */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            {/* Checkmark Circle */}
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                              <Check
                                className="w-7 h-7 lg:w-10 lg:h-10 text-white"
                                strokeWidth={3}
                              />
                            </div>
                            {/* Text */}
                            <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider mt-2 uppercase">
                              Secured
                            </span>
                          </div>
                        </div>

                        {/* Floating Badge - Removed NIST Aligned */}
                      </div>
                    </div>

                    {/* Product Icons - 6 icons evenly around the Shield */}
                    {/* Top - Data Erasure (Main Product) */}
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2">
                      <div className="group relative">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* Trash/Delete Icon - Clear Data Erasure Symbol */}
                          <Trash2
                            className="w-7 h-7 lg:w-8 lg:h-8 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          Data Erasure
                        </span>
                      </div>
                    </div>

                    {/* Top Left - Desktop/Laptop */}
                    <div className="absolute top-[90px] left-[12px] lg:top-[110px] lg:left-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* Desktop/Monitor Icon */}
                          <Monitor
                            className="w-6 h-6 lg:w-7 lg:h-7 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          Personal Computers
                        </span>
                      </div>
                    </div>

                    {/* Top Right - Cloud */}
                    <div className="absolute top-[90px] right-[12px] lg:top-[110px] lg:right-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* Cloud Icon */}
                          <Cloud
                            className="w-6 h-6 lg:w-7 lg:h-7 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          Cloud
                        </span>
                      </div>
                    </div>

                    {/* Bottom Left - Files/Folders */}
                    <div className="absolute bottom-[80px] left-[12px] lg:bottom-[95px] lg:left-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* Folder Icon */}
                          <Folder
                            className="w-6 h-6 lg:w-7 lg:h-7 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          Files/Folder
                        </span>
                      </div>
                    </div>

                    {/* Bottom Right - HDD/SSD Drives */}
                    <div className="absolute bottom-[80px] right-[12px] lg:bottom-[95px] lg:right-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* HDD/Drive Icon - Disk with center */}
                          <HardDrive
                            className="w-6 h-6 lg:w-7 lg:h-7 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          HDD/SSD
                        </span>
                      </div>
                    </div>

                    {/* Bottom - Compliance/Certification */}
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                      <div className="group relative">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full border-2 border-[#d0d5dc]/60 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#0e7c66]">
                          {/* Shield with Checkmark - Compliance */}
                          <ShieldCheck
                            className="w-7 h-7 lg:w-8 lg:h-8 text-[#0e7c66]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold text-[#0a2e1e] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#d0d5dc]/50">
                          Compliance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Key Features Overlapping Hero */}
      {(() => {
        const features = [
          {
            id: "verifiableErasure",
            icon: (filled: boolean) => <ShieldCheck className="w-8 h-8 text-current" stroke="currentColor" />,
            title: t("home.verifiableErasure"),
            desc: t("home.verifiableErasureDesc"),
          },
          {
            id: "auditReady",
            icon: (filled: boolean) => <ClipboardCheck className="w-8 h-8 text-current" stroke="currentColor" />,
            title: t("home.auditReadyReports"),
            desc: t("home.auditReadyReportsDesc"),
          },
          {
            id: "globalStds",
            icon: (filled: boolean) => <Globe className="w-8 h-8 text-current" stroke="currentColor" />,
            title: t("home.globalStandards"),
            desc: t("home.globalStandardsDesc"),
          }
        ];
        return (
          <ThemeSection alternate className="relative w-full pt-1 pb-24">
            <div className="relative z-20 -mt-12 container-responsive px-4">
              <Reveal delayMs={700}>
                <div className={`${themeClasses.card.base} ${themeClasses.card.padding}`}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feat, idx) => (
                      <div key={feat.id} className="text-center group">
                        <div className={`${themeClasses.icon.wrapper} ${themeClasses.icon.wrapperSize.lg} mx-auto mb-4 text-[#0e7c66] group-hover:text-white`}>
                          {feat.icon(false)}
                        </div>
                        <h3 className="text-lg font-bold text-[#1c2530] mb-2 group-hover:text-[#0e7c66] transition-colors">
                          {feat.title}
                        </h3>
                        <p className="text-[#5a6672] text-sm">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </ThemeSection>
        );
      })()}

      {/* Reports and Certificates High-Impact Section */}
      <ThemeSection className="py-16 md:py-24 border-y border-[#d0d5dc]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
        <div className="container-responsive relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-[#e6f4ef] rounded-none mb-6 border border-[#0e7c66]/20">
                <FileCheck className="w-8 h-8 text-[#0e7c66]" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1c2530]">
                Verifiable & Tamper-Evident Reports
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[#5a6672]">
                Every erasure and diagnostic process is backed by digitally signed, compliance-ready certificates and comprehensive reports.
              </p>
              <Link
                to="/reports-and-certificates"
                className="bg-[#0e7c66] text-white border border-[#0e7c66] px-8 py-4 rounded-none font-bold text-lg hover:bg-[#1c2530] hover:text-white hover:border-[#1c2530] transition-all duration-150 inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none min-h-[44px] group"
              >
                View All Certificates
                <ArrowRight className="w-5 h-5 ml-2 group-hover:text-white text-white" />
              </Link>
            </div>
          </Reveal>

          {(() => {
            // Hindi comment: Certificates ka array taaki easily naye certificates add kiye ja sakein
            const certificates = [
              {
                id: "file-eraser",
                title: "File Eraser Certificate",
                desc: "Digitally signed proof of secure file and folder deletion.",
                pdfUrl: "https://assets.dsecuretech.com/Reports/file%20eraser/2160001.pdf",
                thumbUrl: "/images/reports/fileeraser_thumb.png",
                imgSrc: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1784544510/tamc6g4n1igi46qmqdwp.png",
                tags: ["GDPR", "HIPAA", "ISO 27001", "PCI DSS"]
              },
              {
                id: "autopilot",
                title: "Autopilot / MDM Certificate",
                desc: "Verifiable verification of device enrollment status.",
                pdfUrl: "https://assets.dsecuretech.com/Reports/Autopilot/DSecureAutopilotReport_1.pdf",
                thumbUrl: "/images/reports/autopilot_thumb.png",
                imgSrc: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1784545652/f7bfazl9lgawdsitaqys.png",
                tags: []
              }
            ];

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {certificates.map((cert, idx) => (
                  <Reveal delayMs={100 + (idx * 100)} key={cert.id} className="h-full">
                    <div 
                      onClick={() => handleOpenModal(cert.pdfUrl, cert.thumbUrl)}
                      className="cursor-pointer block bg-[#0e7c66] border border-[#0e7c66]/50 rounded-none p-6 h-full hover:border-[#0e7c66]/30 hover:bg-[#083d28] transition-all duration-150 group"
                    >
                      <div className="aspect-[3/4] rounded-none overflow-hidden mb-6 border border-[#0a2e1e] relative bg-[#0a2e1e]">
                        <div className="absolute inset-0 bg-[#0a2e1e]/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[2px]">
                          <div className="bg-[#0e7c66] p-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                            <Search className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <img 
                          src={cert.imgSrc} 
                          alt={cert.title} 
                          className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-bold text-xl text-white mb-2 text-center group-hover:text-white transition-colors">{cert.title}</h3>
                      <p className="text-[#F4F6F8] text-sm text-center mb-4">{cert.desc}</p>
                      {cert.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-[#0a2e1e]">
                          {cert.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[#0a2e1e] text-white rounded-none border border-white/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            );
          })()}
        </div>
      </ThemeSection>

      {/* Report Modal - Certificate Image or Full PDF */}
      <AnimatePresence>
        {selectedReportUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-none flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#e9edf1] bg-white">
                <h3 className="text-lg font-bold text-[#1c2530] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0e7c66]" />
                  {showFullPdf ? "Full Erasure Report" : "Erasure Certificate Preview"}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Zoom controls - sirf certificate view mein dikhenge */}
                  {!showFullPdf && (
                    <div className="flex items-center gap-1 bg-[#d4ede4] rounded-none px-2 py-1">
                      <button
                        onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.25))}
                        className="p-1.5 text-[#5a6672] hover:text-[#1c2530] hover:bg-[#d8dee5] rounded-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:outline-none"
                        aria-label="Zoom out"
                        type="button"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold text-[#5a6672] min-w-[3rem] text-center">
                        {Math.round(zoomScale * 100)}%
                      </span>
                      <button
                        onClick={() => setZoomScale((z) => Math.min(3, z + 0.25))}
                        className="p-1.5 text-[#5a6672] hover:text-[#1c2530] hover:bg-[#d8dee5] rounded-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:outline-none"
                        aria-label="Zoom in"
                        type="button"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-[#5a6672] hover:text-[#1c2530] hover:bg-[#d8dee5] rounded-none-full transition-colors focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none min-h-[44px]"
                    aria-label="Close report modal"
                    type="button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              {showFullPdf ? (
                /* Full PDF view */
                <div className="flex-1 w-full bg-[#d8dee5]">
                  <iframe 
                    src={selectedReportUrl}
                    className="w-full h-full border-none"
                    title="Full Report Document"
                  />
                </div>
              ) : (
                /* Certificate image preview - sirf first page, ultra crisp */
                <>
                  <div className="flex-1 w-full bg-[#d4ede4] overflow-auto flex items-start justify-center p-6">
                    <img
                      src={selectedImage || ''}
                      alt="Erasure Certificate Preview"
                      className="max-w-full h-auto rounded-none transition-transform duration-150 pointer-events-none"
                      style={{ 
                        transform: `scale(${zoomScale})`, 
                        transformOrigin: 'top center',
                        width: 'min(90vw, 800px)',
                        aspectRatio: '210/297' // Standard A4 ratio
                      }}
                      draggable={false}
                    />
                  </div>
                  {/* View Full Report button */}
                  <div className="p-4 border-t border-[#e9edf1] bg-white flex items-center justify-center">
                    <button
                      onClick={() => setShowFullPdf(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#0e7c66] to-[#19a684] hover:from-[#0e7c66] hover:to-[#0e7c66] text-white font-bold px-8 py-3 rounded-none-full hover:shadow-[#0e7c66]/40 hover:scale-105 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none"
                      type="button"
                    >
                      <Download className="w-5 h-5" />
                      View Full Report
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Enterprise Trial Promotion Section */}
      <ThemeSection noBg className="py-16 md:py-20 lg:py-24 bg-[#0e7c66] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
        <div className="container-responsive relative z-10">
          <Reveal>
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="text-4xl md:text-6xl mb-6 animate-bounce">
                <Star
                  className="w-16 h-16 text-[#e9edf1] mx-auto"
                  fill="currentColor"
                />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("home.enterpriseTrialTitle")}
              </h2>
              <p className="text-xl md:text-2xl mb-2 opacity-90">
                {t("home.enterpriseTrialSubtitle")}
              </p>
              <p className="text-lg mb-8 opacity-80">
                {t("home.enterpriseTrialNote")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/contact"
                  className="bg-white text-[#0e7c66] px-8 py-4 rounded-none font-bold text-lg hover:bg-[#d4ede4] transition-all duration-150 inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7c66] focus-visible:outline-none min-h-[44px]"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  {t("home.enterpriseTrialButton")}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-none font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-150 backdrop-blur-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7c66] focus-visible:outline-none min-h-[44px]"
                >
                  <Phone
                    className="w-5 h-5 mr-2"
                  />
                  {t("home.enterpriseTrialContact")}
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Reveal delayMs={100} className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-none p-6 backdrop-blur h-full text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl mb-4 text-[#e9edf1]">
                      <ShieldCheck className="w-8 h-8 mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature1")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature1Desc")}
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={200} className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-none p-6 backdrop-blur h-full text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl mb-4 text-[#e9edf1]">
                      <Cpu
                        className="w-8 h-8 mx-auto"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature2")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature2Desc")}
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={300} className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-none p-6 backdrop-blur h-full text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl mb-4 text-[#e9edf1]">
                      <Award className="w-8 h-8 mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature3")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature3Desc")}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </ThemeSection>

      {/* Compliance Standards Section - Refactored to Ehasiru Style */}
      <ThemeSection className="py-16 md:py-24 relative overflow-hidden">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c2530] mb-6">
                {t("home.featuresTitle")}{" "}
                <span className="text-[#0e7c66]">
                  {t("home.standards")}
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-[#5a6672] max-w-3xl mx-auto">
                {t("home.featuresSubtitle")}
              </p>
            </Reveal>
          </div>

          {(() => {
            // Hindi comment: Relevant Lucide React icons ke saath standards aur certifications update kiye gaye hain
            const standards = [
              {
                id: "nist",
                icon: <ShieldCheck className="w-6 h-6" />,
                title: t("home.nist80088"),
                desc: t("home.nist80088Desc"),
              },
              {
                id: "gdpr",
                icon: <FileCheck className="w-6 h-6" />,
                title: t("home.gdpr"),
                desc: t("home.gdprDesc"),
              },
              {
                id: "hipaa",
                icon: <HeartPulse className="w-6 h-6" />,
                title: t("home.hipaa"),
                desc: t("home.hipaaDesc"),
              },
              {
                id: "sox",
                icon: (
                  <Landmark className="w-6 h-6" />
                ),
                title: t("home.sox"),
                desc: t("home.soxDesc"),
              },
              {
                id: "iso",
                icon: <Award className="w-6 h-6" />,
                title: t("home.iso27001"),
                desc: t("home.iso27001Desc"),
              },
              {
                id: "pci",
                icon: (
                  <CreditCard className="w-6 h-6" />
                ),
                title: t("home.pciDss"),
                desc: t("home.pciDssDesc"),
              }
            ];

            const certifications = [
              {
                id: "cc",
                icon: <Award className="w-6 h-6" />,
                title: t("home.commonCriteria"),
                level: t("home.commonCriteriaLevel"),
                desc: t("home.commonCriteriaDesc"),
              },
              {
                id: "fips",
                icon: (
                  <Lock className="w-6 h-6" />
                ),
                title: t("home.fips1402"),
                level: t("home.fips1402Level"),
                desc: t("home.fips1402Desc"),
              },
              {
                id: "nsa",
                icon: <Landmark className="w-6 h-6" />,
                title: "NSA/CSS",
                level: "Approved",
                desc: "Evaluated Products List",
              },
              {
                id: "csa",
                icon: <Cloud className="w-6 h-6" />,
                title: "CSA STAR",
                level: "Gold",
                desc: "Cloud Security Alliance",
              }
            ];

            return (
              <>
                {/* Key Features (Moved to Hero Section) */}

                <Reveal delayMs={750}>
                  <div className="text-center mt-12">
                    <Link
                      to="/compliance"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-none bg-[#0e7c66] text-white font-medium hover:bg-[#083d28] transition-colors focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none min-h-[44px]"
                    >
                      <span>{t("home.exploreComplianceStandards")}</span>
                      <ArrowRight className="w-5 h-5 ml-2" stroke="currentColor" />
                    </Link>
                  </div>
                </Reveal>
              </>
            );
          })()}
        </div>
      </ThemeSection>

      {/* Remaining sections unchanged — they don’t contain emojis */}
      {/* Why Choose, Features, Industries, Services, Testimonials, etc. remain as-is */}

      {/* Why Choose Section */}
      <ThemeSection alternate id="why-choose" className="py-16 md:py-20 lg:py-24 " >
        <div className="container-responsive">
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6">
                {t("home.whyChooseTitle")}
              </h2>
              <p className="text-lg md:text-xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                {t("home.whyChooseSubtitle")}
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {[
              {
                titleKey: "home.reason1Title",
                descKey: "home.reason1Desc",
                icon: (
                  <Shield
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-[#0e7c66]",
              },
              {
                titleKey: "home.reason3Title",
                descKey: "home.reason3Desc",
                icon: (
                  <Building2
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-[#0e7c66]",
              },
              {
                titleKey: "home.feature3Title",
                descKey: "home.feature3Desc",
                icon: (
                  <ClipboardCheck
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-teal-900",
              },
              {
                titleKey: "home.reason2Title",
                descKey: "home.reason2Desc",
                icon: (
                  <Globe
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-orange-900",
              },
              {
                titleKey: "home.feature5Title",
                descKey: "home.feature5Desc",
                icon: (
                  <Gauge
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-teal-900",
              },
              {
                titleKey: "home.feature6Title",
                descKey: "home.feature6Desc",
                icon: (
                  <Headphones
                        className="w-full h-full text-current"
                        stroke="currentColor"
                      />
                ),
                colorTheme: "text-rose-900",
              },
            ].map((feature, i) => (
              <Reveal key={feature.titleKey} delayMs={i * 100} className="h-full">
                {/* Ehasiru-style Light Card with Visible Top-Left Icon */}
                <div className={`${themeClasses.card.base} ${themeClasses.card.padding} ${themeClasses.card.hoverable}`}>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className={`${themeClasses.icon.wrapper} ${themeClasses.icon.wrapperSize.md} mb-6`}>
                      <div className="w-5 h-5 text-[#0e7c66] group-hover:text-white transition-colors duration-150">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 group-hover:text-[#0e7c66] transition-colors duration-150">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-[#5a6672] leading-relaxed flex-grow">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={60}>
            <div className={`${themeClasses.card.base} ${themeClasses.card.padding}`}>
              <div className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
                  <Reveal delayMs={20}>
                    <div className="group">
                      <div className="min-h-[40px] sm:min-h-[48px] lg:min-h-[60px] flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e7c66] mb-2 group-hover:scale-105 transition-transform duration-150">
                        {t("home.devicesCount")}
                      </div>
                      <div className="text-[#5a6672] text-sm sm:text-base font-medium">
                        {t("home.devices")}
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={30}>
                    <div className="group">
                      <div className="min-h-[40px] sm:min-h-[48px] lg:min-h-[60px] flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e7c66] mb-2 group-hover:scale-105 transition-transform duration-150">
                        {t("home.complianceRate")}
                      </div>
                      <div className="text-[#5a6672] text-sm sm:text-base font-medium">
                        {t("home.compliance")}
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={40}>
                    <div className="group">
                      <div className="min-h-[40px] sm:min-h-[48px] lg:min-h-[60px] flex items-center justify-center text-2xl sm:text-3xl lg:text-[28px] xl:text-[34px] font-bold text-[#0e7c66] mb-2 group-hover:scale-105 transition-transform duration-150">
                        {t("home.encryptionStrength")}
                      </div>
                      <div className="text-[#5a6672] text-sm sm:text-base font-medium">
                        {t("home.encryption")}
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={50}>
                    <div className="group">
                      <div className="min-h-[40px] sm:min-h-[48px] lg:min-h-[60px] flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e7c66] mb-2 group-hover:scale-105 transition-transform duration-150">
                        {t("home.supportAvailability")}
                      </div>
                      <div className="text-[#5a6672] text-sm sm:text-base font-medium">
                        {t("home.support")}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </ThemeSection>



      {/* Industry Solutions Section */}
      <ThemeSection id="industries" className="py-16 md:py-24 border-y border-[#d0d5dc]/50 relative overflow-hidden" >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2e1e] mb-6">
                {t("home.industriesTitle").split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-[#0e7c66]">
                  {t("home.industriesTitle").split(" ").slice(2).join(" ")}
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-[#5a6672] max-w-3xl mx-auto">
                {t("home.industriesSubtitle")}
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                titleKey: "home.healthcare",
                subtitleKey: "home.healthcareCompliance",
                descKey: "home.healthcareDesc",
                tags: ["Medical Devices", "PHI Protection"],
                icon: (
                  <HeartPulse
                        className="w-5 h-5 text-current"
                        stroke="currentColor"
                      />
                ),
              },
              {
                titleKey: "home.financial",
                subtitleKey: "home.financialCompliance",
                descKey: "home.financialDesc",
                tags: ["Trading Systems", "Customer Data"],
                icon: (
                  <DollarSign className="w-5 h-5 text-current" stroke="currentColor" />
                ),
              },
              {
                titleKey: "home.government",
                subtitleKey: "home.governmentCompliance",
                descKey: "home.governmentDesc",
                tags: ["home.dodStandards", "home.federalAgencies"],
                isTagKey: true,
                icon: (
                  <Landmark
                        className="w-5 h-5 text-current"
                        stroke="currentColor"
                      />
                ),
              },
              {
                titleKey: "home.enterprise",
                subtitleKey: "home.enterpriseCompliance",
                descKey: "home.enterpriseDesc",
                tags: ["Data Centers", "Cloud Migration"],
                icon: (
                  <Building2
                        className="w-5 h-5 text-current"
                        stroke="currentColor"
                      />
                ),
              },
              {
                titleKey: "home.itadServices",
                subtitleKey: "home.itadCompliance",
                descKey: "home.itadDesc",
                tags: ["Asset Recovery", "Multi-Client"],
                icon: (
                  <RefreshCcw
                        className="w-5 h-5 text-current"
                        stroke="currentColor"
                      />
                ),
              },
              {
                titleKey: "home.serviceProviders",
                subtitleKey: "home.serviceProvidersCompliance",
                descKey: "home.serviceProvidersDesc",
                tags: ["MSP Solutions", "Revenue Share"],
                icon: (
                  <Server className="w-5 h-5 text-current" />
                ),
              }
            ].map((industry, i) => (
              <Reveal key={industry.titleKey} delayMs={200 + (i * 50)} className="h-full">
                {/* Ehasiru-style Clean Square Icon Card */}
                <div className={`${themeClasses.card.base} ${themeClasses.card.padding} ${themeClasses.card.hoverable} hover:border-[#0e7c66]/20`}>
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Small square icon top left */}
                    <div className="mb-6">
                      <div className={`${themeClasses.icon.wrapper} ${themeClasses.icon.wrapperSize.md} text-[#0e7c66] group-hover:text-white`}>
                        {industry.icon}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors mb-1">
                        {t(industry.titleKey)}
                      </h3>
                      <p className="text-sm text-[#5a6672] font-medium">
                        {t(industry.subtitleKey)}
                      </p>
                    </div>
                    <p className="text-[#5a6672] mb-6 flex-grow leading-relaxed">
                      {t(industry.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {industry.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1 bg-white text-[#5a6672] border border-[#d0d5dc]/80 rounded-none">
                          {industry.isTagKey ? t(tag) : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={500}>
            <div className="text-center mt-12">
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center bg-[#0e7c66] text-white border-2 border-[#0e7c66] hover:bg-[#0a2e1e] focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none min-h-[44px] px-8 py-3 rounded-none font-bold text-lg transition-all duration-150"
              >
                <span>{t("home.exploreAllIndustrySolutions")}</span>
                <ArrowRight className="w-5 h-5 ml-2" stroke="currentColor" />
              </Link>
            </div>
          </Reveal>
        </div>
      </ThemeSection>

      {/* Services Overview Section */}
      <ThemeSection alternate id="services" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c2530] mb-6">
                {t("home.servicesTitle").split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-[#0e7c66]">
                  {t("home.servicesTitle").split(" ").slice(2).join(" ")}
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-[#5a6672] max-w-3xl mx-auto">
                {t("home.servicesSubtitle")}
              </p>
            </Reveal>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 md:-left-12 z-30">
              <button 
                onClick={() => setCurrentSlide((prev: number) => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#e9edf1] flex items-center justify-center transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:outline-none ${
                  currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#d4ede4] hover:scale-110 active:scale-95 text-[#0e7c66]'
                }`}
                aria-label="Previous product"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 md:-right-12 z-30">
              <button 
                onClick={() => setCurrentSlide((prev: number) => Math.min(products.length - visibleCount, prev + 1))}
                disabled={currentSlide >= products.length - visibleCount}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#e9edf1] flex items-center justify-center transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:outline-none ${
                  currentSlide >= products.length - visibleCount 
                    ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#d4ede4] hover:scale-110 active:scale-95 text-[#0e7c66]'
                }`}
                aria-label="Next product"
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="overflow-hidden px-2">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` 
                }}
              >
                {products.map((product, idx) => (
                  <div key={product.id} className="w-full md:w-1/2 flex-shrink-0 px-3 py-4">
                    <Reveal delayMs={idx * 50} className="h-full">
                      <div className="h-full">
                        <Link 
                          to={product.link}
                          className="group relative h-full bg-white rounded-none p-6 md:p-8 border border-[#d0d5dc]/60 hover:border-[#0e7c66]/30 transition-all duration-150 block cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <CardContent product={product} t={t} isLink={true} />
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: products.length - (visibleCount - 1) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2 focus-visible:outline-none ${
                    currentSlide === i ? 'bg-[#0e7c66] w-6' : 'bg-[#d8dee5] hover:bg-[#d4ede4]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Key Statistics Section */}
      <ThemeSection className="py-16 md:py-24 text-[#1c2530] border-y border-[#d0d5dc]/50 relative overflow-hidden">
        <div className="container-app relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a2e1e]">
                {t("home.trustedTitle").split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-[#0e7c66]">
                  {t("home.trustedTitle").split(" ").slice(3).join(" ")}
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-[#5a6672] max-w-3xl mx-auto">
                {t("home.trustedSubtitle")}
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Reveal delayMs={400} className="h-full">
              <div className="group bg-white rounded-none p-6 md:p-8 border border-[#d0d5dc]/60 hover:border-[#0e7c66]/30 transition-all duration-150 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-[#d4ede4] rounded-full flex items-center justify-center group-hover:bg-[#0e7c66] transition-colors duration-150">
                    <ShieldCheck className="w-6 h-6 text-[#0e7c66] group-hover:text-white transition-colors duration-150" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors">
                    {t("home.militaryGradeSecurity")}
                  </h3>
                </div>
                <p className="text-[#5a6672]">{t("home.militaryGradeDesc")}</p>
              </div>
            </Reveal>
            <Reveal delayMs={450} className="h-full">
              <div className="group bg-white rounded-none p-6 md:p-8 border border-[#d0d5dc]/60 hover:border-[#0e7c66]/30 transition-all duration-150 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-[#d4ede4] rounded-full flex items-center justify-center group-hover:bg-[#0e7c66] transition-colors duration-150">
                    <Layers className="w-6 h-6 text-[#0e7c66] group-hover:text-white transition-colors duration-150" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors">
                    {t("home.enterpriseScale")}
                  </h3>
                </div>
                <p className="text-[#5a6672]">{t("home.enterpriseScaleDesc")}</p>
              </div>
            </Reveal>
            <Reveal delayMs={500} className="h-full">
              <div className="group bg-white rounded-none p-6 md:p-8 border border-[#d0d5dc]/60 md:col-span-2 lg:col-span-1 hover:border-[#0e7c66]/30 transition-all duration-150 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-[#d4ede4] rounded-full flex items-center justify-center group-hover:bg-[#0e7c66] transition-colors duration-150">
                    <FileCheck className="w-6 h-6 text-[#0e7c66] group-hover:text-white transition-colors duration-150" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors">
                    {t("home.globalCompliance")}
                  </h3>
                </div>
                <p className="text-[#5a6672]">
                  {t("home.globalComplianceDesc")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection>

      {/* Testimonials Section */}
      {/* <ThemeSection noBg className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container-app">
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1c2530] mb-6">
                Trusted by Clients
              </h2>
              <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
                See what our customers say about our data erasure solutions
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            <Reveal delayMs={10}>
              <div className="card transition-all duration-150 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Marcus Schmidt"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c2530] text-lg">
                      Marcus Schmidt
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">
                      Enterprise Client
                    </p>
                  </div>
                </div>
                <blockquote className="text-[#5a6672] italic leading-relaxed flex-1">
                  "{t('home.testimonial1')}"
                </blockquote>
              </div>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="bg-white rounded-none p-8 transition-all duration-150 will-change-transform">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0e7c66] to-[#0e7c66] flex items-center justify-center flex-shrink-0">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
                      alt="Elena Rodriguez"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1c2530] text-lg">
                      Elena Rodriguez
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">{t('home.client')}</p>
                  </div>
                </div>
                <blockquote className="text-[#5a6672] italic leading-relaxed">
                  "{t('home.testimonial2')}"
                </blockquote>
              </div>
            </Reveal>
            <Reveal delayMs={30}>
              <div className="bg-white rounded-none p-8 transition-all duration-150 will-change-transform">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                      alt="James Thompson"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1c2530] text-lg">
                      James Thompson
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">{t('home.client')}</p>
                  </div>
                </div>
                <blockquote className="text-[#5a6672] italic leading-relaxed">
                  "{t('home.testimonial3')}"
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection> */}
      <FAQSection faqs={homeFAQs} />
    </>
  );
});

// Helper component for card content to share logic
function CardContent({ product, t, isLink = false }: { product: any, t: any, isLink?: boolean }) {
  return (
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 text-center md:text-left">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 flex-shrink-0 bg-[#d4ede4] rounded-full flex items-center justify-center group-hover:bg-[#0e7c66] transition-colors duration-150">
            <product.icon className="w-6 h-6 text-[#0e7c66] group-hover:text-white transition-colors duration-150" />
          </div>
          {product.isUpcoming && (
            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 rounded-full border border-amber-200">
              Upcoming
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-[#0a2e1e] mb-3 group-hover:text-[#0e7c66] transition-colors group-hover:underline">
          {String(product.title)}
        </h3>
        <p className="text-sm text-[#5a6672] line-clamp-2 h-10 mb-6 relative z-20 pointer-events-none">
          {product.desc}
        </p>
      </div>

      <div className="space-y-3 mb-6 flex-grow relative z-20 pointer-events-none">
        {product.features.map((feature: string, fIdx: number) => (
          <div key={fIdx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#d4ede4] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0e7c66] transition-colors duration-150">
              <Check className="w-3.5 h-3.5 text-[#0e7c66] group-hover:text-white transition-colors duration-150" strokeWidth={2.5} />
            </div>
            <span className="text-xs text-[#0a2e1e] font-medium leading-tight">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-[#e9edf1] flex items-center justify-between relative z-20 pointer-events-none">
        <div className="flex-grow">
          <div className="text-lg font-bold text-[#0a2e1e]">
            {product.price}
          </div>
          <div className="text-[10px] text-[#0e7c66] font-medium uppercase tracking-wide">
            {product.note}
          </div>
        </div>
        {isLink && (
          <div className="flex items-center gap-2 text-sm font-bold text-[#0e7c66] group-hover:translate-x-1 transition-transform">
            {t("home.viewDetails", { defaultValue: "Learn More" })}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
