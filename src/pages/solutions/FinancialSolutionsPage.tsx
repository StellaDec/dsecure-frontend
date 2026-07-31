import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import {
  themeClasses,
  ThemeButton,
  ThemeCard,
  ThemeIconContainer,
  ThemeSection,
  ThemeSectionHeading,
} from "@/components/ui/Theme";
import {
  Server,
  FolderMinus,
  MonitorSmartphone,
  Cloud,
  HardDrive,
  ShieldCheck,
  Scale,
  BarChart,
  Globe,
  FileText,
  Activity,
  CreditCard,
  File
} from "lucide-react";

/**
 * FinancialSolutionsPage Component
 * Is page mein Banking aur Financial institutions ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const FinancialSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Secondary navbar items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "compliance", label: "Compliance" },
    { id: "assets", label: "Assets" },
    { id: "solutions", label: "Solutions" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll handle karne ke liye useEffect
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

  // Smooth scroll function
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
      <SEOHeadNative seo={getSEOForPage("solutions/data-erasure-banking-finance")} />

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
                        ? "bg-emerald-600 text-white shadow-md"
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
        {/* ================= HERO SECTION ================= */}
        <ThemeSection
          id="overview"
          className="min-h-[600px] flex items-start pt-8 lg:pt-12 pb-8 lg:pb-12 relative overflow-hidden"
          noBg
        >
          {/* Background pattern matching FileEraserNetwork */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure Scalable Compliant</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0a2e1e] leading-[1.15] tracking-tight">
                    Solutions for{" "}
                    <span className="block text-emerald-600 pb-1">
                      Banking & Finance
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Empower your banking operations with D-Secure's
                  military-grade data erasure. Permanently sanitize
                  end-of-life IT assets, servers, and devices to guarantee
                  100% compliance with PCI-DSS, SOX, and global financial data
                  standards.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton
                    onClick={() => setShowLicenseModal(true)}
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    Request Free License
                  </ThemeButton>
                  <a
                    href="https://assets.dsecuretech.com/pdf/DSECURE_F%26B%20SOLN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto gap-2`}
                  >
                    <FileText className="w-5 h-5" />
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges at bottom of left content */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["PCI-DSS", "SOX", "NIST 800-88", "GDPR"].map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Banking Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <polygon points="36,7 62,24 10,24" fill="#10b981" />
                    <polygon points="36,7 62,24 10,24" fill="none" stroke="#047857" strokeWidth="1.2" />
                    <text x="36" y="21" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="900" letterSpacing="1.2" fontFamily="sans-serif">BANK</text>
                    <rect x="10" y="24" width="52" height="3" fill="#6ee7b7" rx="1" />
                    {[13,23,33,43,53].map(x => (
                      <rect key={x} x={x} y="27" width="6" height="24" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" rx="1" />
                    ))}
                    <rect x="31" y="39" width="10" height="13" fill="#047857" rx="1.5" />
                    <rect x="8" y="51" width="56" height="5" fill="#10b981" rx="1" />
                    <rect x="6" y="56" width="60" height="4" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="BANKING"
                devices={[
                  {
                    label: "SMARTPHONE",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#16a34a" stroke="none" /></svg>,
                  },
                  {
                    label: "LAPTOP",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M2 19h20" /></svg>,
                  },
                  {
                    label: "SERVER RACK",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" /><circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" /><line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" /></svg>,
                  },
                  {
                    label: "STORAGE/HDD",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" /><circle cx="17" cy="12" r="1.5" fill="#0d9488" stroke="none" /><line x1="5" y1="10" x2="12" y2="10" /><line x1="5" y1="14" x2="9" y2="14" /></svg>,
                  },
                  {
                    label: "RAID/NAS",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 5v5c0 1.66-4.03 3-9 3S3 11.66 3 10V5" /><path d="M21 10v5c0 1.66-4.03 3-9 3S3 16.66 3 15v-5" /></svg>,
                  },
                ]}
              />
            </div>
          </div>
        </ThemeSection>

        {/* Compliance Section */}
        <ThemeSection id="compliance" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                Regulation & Compliance
              </span>
            </div>
            <ThemeSectionHeading centered subtitle="Secure & Reliable Data Wiping Solution">
              Ideal for Banks & Financial Institutions to Meet Compliances
            </ThemeSectionHeading>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PCI-DSS Compliance",
                  desc: "Achieve strict PCI DSS compliance by rendering cardholder data irreversible and unrecoverable before disposal or reallocation.",
                  icon: CreditCard,
                },
                {
                  title: "FACTA Disposal Rule",
                  desc: "Comply with FACTA requirements by taking reasonable measures to destroy consumer personal information.",
                  icon: Scale,
                },
                {
                  title: "SOX Auditor Readiness",
                  desc: "Meet Sarbanes-Oxley requirements for the secure destruction of sensitive corporate financial data.",
                  icon: BarChart,
                },
                {
                  title: "GLBA Protection",
                  desc: "Ensure non-public personal information (NPI) is properly destroyed according to Gramm-Leach-Bliley Act guidelines.",
                  icon: ShieldCheck,
                },
                {
                  title: "EU-GDPR Article 17",
                  desc: "Implement 'Right to Erasure' for financial records across all your global operations.",
                  icon: Globe,
                },
                {
                  title: "NIST 800-88 Standards",
                  desc: "Adhere to specific media sanitization procedures recommended by NIST for the financial sector.",
                  icon: FileText,
                },
              ].map((comp) => (
                <ThemeCard key={comp.title} className="group">
                  <ThemeIconContainer icon={comp.icon} className="mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-[#0a2e1e]">
                    {comp.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {comp.desc}
                  </p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* Supported Assets Section */}
        <ThemeSection id="assets" noBg className="overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Supported Assets
                </div>
                <h2 className="text-4xl font-extrabold mb-6 text-[#0a2e1e]">
                  Sanitize Every Storage Media
                </h2>
                <p className="text-lg mb-8 text-slate-600">
                  Financial institutions handle data across a variety of
                  hardware. D-Secure ensures all cardholder and consumer data is
                  permanently removed across your entire fleet.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "PC & Laptop Wiping",
                    "Server & RAID Wiping",
                    "Mac & iMac Wiping",
                    "Chromebook Erasure",
                    "Mobile Phone Wiping",
                    "Remote Endpoint Wiping",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative lg:order-last w-full max-w-lg mx-auto">
                  <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                    {/* Hero Illustration Container - Professional Design */}
                    <div className="relative w-[400px] h-[400px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] scale-[0.8] sm:scale-120 lg:scale-100 transition-transform origin-center">
                      {/* Outer Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100/40 via-transparent to-teal-100/40 blur-xl"></div>

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
                          stroke="url(#gradientOuterAsset)"
                          strokeWidth="1.5"
                          strokeDasharray="12 8"
                          opacity="0.5"
                        />
                        <defs>
                          <linearGradient
                            id="gradientOuterAsset"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#14b8a6" />
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
                          stroke="url(#gradientInnerAsset)"
                          strokeWidth="1.5"
                          strokeDasharray="8 6"
                          opacity="0.6"
                        />
                        <defs>
                          <linearGradient
                            id="gradientInnerAsset"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#10b981" />
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
                              className="w-full h-full drop-shadow-xl overflow-visible"
                            >
                              <defs>
                                <linearGradient
                                  id="shieldGradientAsset"
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="100%"
                                >
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="50%" stopColor="#059669" />
                                  <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M50 5 L95 25 L95 55 C95 85 75 105 50 115 C25 105 5 85 5 55 L5 25 Z"
                                fill="url(#shieldGradientAsset)"
                                className="filter drop-shadow-[0_4px_6px_rgba(16,185,129,0.3)]"
                              />
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
                                <svg
                                  className="w-7 h-7 lg:w-10 lg:h-10 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider mt-2 uppercase">
                                Secured
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Icons - 6 icons evenly around the Shield */}
                      {/* Top - Server & RAID */}
                      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2">
                        <div className="group relative">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Server Icon */}
                            <svg className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">Server & RAID</span>
                        </div>
                      </div>

                      {/* Top Left - PC & Laptop */}
                      <div className="absolute top-[90px] left-[12px] lg:top-[110px] lg:left-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Laptop Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M20 16V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0H4M8 21h8" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">PC & Laptop</span>
                        </div>
                      </div>

                      {/* Top Right - Mac & iMac */}
                      <div className="absolute top-[90px] right-[12px] lg:top-[110px] lg:right-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* iMac/Mac Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="12" rx="2" /><path d="M12 15v3m-4 3h8" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Mac & iMac</span>
                        </div>
                      </div>

                      {/* Bottom Left - Chromebook */}
                      <div className="absolute bottom-[80px] left-[12px] lg:bottom-[95px] lg:left-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Chromebook (Chrome Logo style) */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 8l8.5 5m-15.5 0L12 16" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Chromebook</span>
                        </div>
                      </div>

                      {/* Bottom Right - Mobile Phone */}
                      <div className="absolute bottom-[80px] right-[12px] lg:bottom-[95px] lg:right-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Smartphone Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Mobile Phone</span>
                        </div>
                      </div>

                      {/* Bottom - Remote Endpoint */}
                      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                        <div className="group relative">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Signal/Wifi Icon - Remote Endpoint */}
                            <svg className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.59 16.11a6 6 0 016.82 0M12 20h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">Remote Endpoint</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </ThemeSection>

        {/* Industry Solutions Section */}
        <ThemeSection id="solutions" noBg className="bg-[#0a2e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-900/50 text-emerald-100 border border-emerald-800">
                Flexible Solutions
              </span>
            </div>
            <div className="[&_h2]:!text-white">
              <ThemeSectionHeading centered>
                Our Solutions for Banks & Financial Institutions
              </ThemeSectionHeading>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PXE Boot Solution",
                  desc: "Erase up to 65,000 drives simultaneously over a network. Ideal for data center decommissioning in large banks.",
                  icon: Server,
                },
                {
                  title: "USB Boot Solution",
                  desc: "On-site standalone machine erasure for remote branches and office relocations. No internet required.",
                  icon: HardDrive,
                },
                {
                  title: "MSI Remote Wiping",
                  desc: "Target Windows endpoint devices remotely via MSI package deployment. Perfect for hybrid workforce security.",
                  icon: MonitorSmartphone,
                  upcoming: true,
                },
                {
                  title: "File Eraser Tool",
                  desc: "Permanently wipe specific sensitive files and folders without affecting the OS or other applications.",
                  icon: File,
                },
                {
                  title: "Cloud Console Admin",
                  desc: "Manage users, licenses, and maintain a centralized repository of all erasure reports for global audits.",
                  icon: Cloud,
                },
                {
                  title: "Hardware Diagnostics",
                  desc: "Perform health checks and hardware profiling on machines before or after the erasure process.",
                  icon: Activity,
                },
              ].map((solution) => (
                <ThemeCard key={solution.title} className={`group relative ${solution.upcoming ? 'opacity-90' : ''}`}>
                  {/* Upcoming Badge */}
                  {solution.upcoming && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-200 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                      {" "}Coming Soon
                    </div>
                  )}
                  <ThemeIconContainer icon={solution.icon} className="mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-[#0a2e1e]">
                    {solution.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {solution.desc}
                  </p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* FAQ Section */}
        {/* FAQ Section */}
        <ThemeSection id="faq" alternate>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThemeSectionHeading
              subtitle="Frequently asked questions regarding our banking and financial data erasure platform"
              centered
            >
              Banking & Financial Solutions Questions
            </ThemeSectionHeading>

            <div className="space-y-4">
              {[
                {
                  q: "Does D-Secure help meet PCI-DSS and GDPR compliances?",
                  a: "Yes, D-Secure ensures permanent data destruction and generates tamper-proof certificates that serve as verifiable proof of compliance for PCI-DSS, GDPR, GLBA, and other strict financial regulations.",
                },
                {
                  q: "Can we erase endpoint devices at remote bank branches?",
                  a: "Absolutely. D-Secure supports MSI Remote Wiping and standalone USB boot solutions, making it easy to sanitize employee laptops, desktops, and ATMs securely without shipping devices.",
                },
                {
                  q: "How secure are the generated erasure reports?",
                  a: "Our erasure reports are digitally signed and completely tamper-proof. They can be centrally managed in our Cloud Console or saved locally for seamless integration with your bank's audit systems.",
                },
                {
                  q: "Can we erase specific sensitive financial files instead of the whole drive?",
                  a: "Yes, our File Eraser Tool allows you to target and permanently destroy specific files, folders, or email traces containing sensitive customer financial data without affecting the operating system.",
                },
                {
                  q: "Does D-Secure support enterprise servers and data center decommissioning?",
                  a: "Yes, using our PXE Boot Solution, IT administrators can wipe up to 65,000 drives simultaneously over a secure network, making it highly scalable for large financial institution data centers.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-none p-6 shadow-sm hover:shadow-md transition-all border bg-white border-[#d0d5dc]/60"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg font-semibold text-[#0a2e1e]">
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 group-open:rotate-180 transition-transform text-[#0e7c66]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-4 leading-relaxed text-[#5a6672]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Financial Solutions Page" subjectPrefix="New Inquiry - Financial Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Financial"
        />
      )}
    </>
  );
};

export default FinancialSolutionsPage;
