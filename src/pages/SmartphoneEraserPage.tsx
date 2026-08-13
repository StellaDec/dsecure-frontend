import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import ProductInternalLinks from "../components/ProductInternalLinks";
import { Activity, AppWindow, ArrowLeft, ArrowRight, BadgeCheck, CheckCircle, Cloud, Cpu, Database, Eraser, FileCheck, FileText, Globe, History, ImageOff, Layers, Layout, Lock, LockKeyhole, MessageSquare, PhoneCall, RefreshCcw, RefreshCw, Server, Settings, Shield, ShieldCheck, Signal, Smartphone, Star, Tag, Workflow, Zap } from "lucide-react";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { getSEOForPage } from "@/utils/seo";
import { ProductContactForm } from "@/components/forms";
import Reveal from "../components/Reveal";
import { SEOHeadNative } from "../components/SEOHeadNative";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import { generateFAQSchema } from "@/utils/seo.core";
import { FAQSection } from "@/components/FAQSection";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import type { FAQItem, KeyTakeawayItem } from "@/types/seo";
import { smartphoneEraserFAQs as importedSmartphoneEraserFAQs } from "@/data/seoFaqs";
const smartphoneEraserFaqs = importedSmartphoneEraserFAQs;

const smartphoneEraserTakeaways: KeyTakeawayItem[] = [
  {
    title: "High-Volume Processing",
    description: "Process up to 40 iOS and Android devices simultaneously on a single workstation.",
  },
  {
    title: "100% Data Security",
    description: "Permanently wipe sensitive data beyond forensic recovery, compliant with global standards.",
  },
  {
    title: "Automated Diagnostics",
    description: "Detect hardware locks (FMIP, FRP, MDM) and retrieve core hardware identifiers (IMEI, ESN) automatically.",
  },
  {
    title: "Verifiable Audit Trail",
    description: "Generate tamper-proof erasure certificates for every device to ensure regulatory compliance.",
  }
];

// Reusing Icons from the theme
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SmartphoneEraserPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = globalThis.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "erase-types", "compliance", "platforms", "features", "use-cases", "faq", "contact"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 100;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          setActiveSection(section);
        }
      }
    }
  }, []);

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Sync with MainLayout header visibility
  useEffect(() => {
    const event = new CustomEvent("stickyNavVisible", {
      detail: { visible: isNavVisible },
    });
    globalThis.dispatchEvent(event);

    return () => {
      // Ensure header is restored when leaving the page
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: false },
        }),
      );
    };
  }, [isNavVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      globalThis.scrollTo({
        top: id === "overview" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DSec-Mobile-Eraser-Datasheet.pdf";
    link.download = "DSec-Mobile-Eraser-Datasheet.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "erase-types", label: "Erase Types" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const eraseTypes = [
    {
      title: "eSIM Erasure",
      desc: "Securely remove eSIM profiles and associated sensitive carrier data without affecting physical hardware.",
      icon: Signal,
    },
    {
      title: "App Data & Cache",
      desc: "Wipe sensitive application data, chat histories, and cached credentials that standard factory resets often miss.",
      icon: AppWindow,
    },
    {
      title: "Call Logs & Messages",
      desc: "Permanent destruction of private communication logs, SMS, and multimedia messages.",
      icon: PhoneCall,
    },
    {
      title: "Internet History",
      desc: "Clean browser history, cookies, and saved login data to prevent identity theft.",
      icon: History,
    },
    {
      title: "Media & Cloud Traces",
      desc: "Erase locally stored media and clear traces of connected cloud storage services.",
      icon: ImageOff,
    },
    {
      title: "Locked Device Reset",
      desc: "Bypass and reset locked iOS/Android devices for secure data disposal (available on Linux edition).",
      icon: LockKeyhole,
    },
  ];

  const useCases = [
    {
      title: "Mobile Trade-in & Buyback",
      desc: "Guarantee 100% data sanitization for used devices before they are resold or refurbished in secondary markets.",
      icon: RefreshCcw,
    },
    {
      title: "Corporate Device Exit",
      desc: "Securely wipe employee devices when they leave the organization or when hardware is being reallocated.",
      icon: Server,
    },
    {
      title: "ITAD & Recycling",
      desc: "Compliant erasure for large volumes of retired mobile assets in bulk-processing environments.",
      icon: Database,
    },
    {
      title: "Individual Privacy",
      desc: "Personal users can safeguard their identity and banking data before selling heart-to-heart devices.",
      icon: ShieldCheck,
    },
  ];

  const platforms = [
    {
      name: "iOS",
      versions: "iOS v7 & above (Eraser)",
      icon: Smartphone,
    },
    {
      name: "Android",
      versions: "Android OS v5 & above",
      icon: Smartphone,
    },
    {
      name: "Deployment",
      versions: "Windows Edition & Barebone (Linux)",
      icon: Server,
    },
  ];

  const moreFeatures = [
    {
      title: "Unified iOS & Android",
      desc: "Single application to securely erase data from both iOS and Android devices, including tablets and eSIM profiles.",
      icon: Layout,
    },
    {
      title: "Cloud Console Control",
      desc: "Centralized dashboard for user management, license distribution, and audit-ready report storage.",
      icon: Cloud,
    },
    {
      title: "ERP/API Connectivity",
      desc: "Integrated with industry-leading ERPs (Macro/Razor) and a cloud API for seamless data flow into your ITAM system.",
      icon: Workflow,
    },
    {
      title: "Automatic Verification",
      desc: "Every erasure is automatically verified and generates a tamper-proof certificate beyond the scope of recovery.",
      icon: ShieldCheck,
    },
    {
      title: "Batch Processing",
      desc: "Process up to 40 mobile devices simultaneously on a single workstation to maximize productivity.",
      icon: Zap,
    },
    {
      title: "IMEI 1 & 2 Retrieval",
      desc: "Automatically fetch core hardware identifiers including IMEI 1, IMEI 2, ESN, and Serial Numbers.",
      icon: Tag,
    },
    {
      title: "Label Printing",
      desc: "Automated label generation with device details for effortless tracking in large-scale warehouses.",
      icon: FileCheck,
    },
    {
      title: "Customizable Reports",
      desc: "Add your company logo and watermark to tamper-proof PDF, CSV, and XML reports.",
      icon: FileText,
    }
  ];


  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage("smartphone-eraser")} 
        structuredData={generateFAQSchema(smartphoneEraserFaqs)}
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
              <Link to="/" className="flex items-center">
                <ThemeAwareLogo className="h-7 sm:h-8 w-auto" responsive={true} />
              </Link>
              <nav className="flex items-center gap-1">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
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
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <UpcomingBadge className="mb-4" />

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Enterprise Smartphone &{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Mobile Device Erasure
                    </span>: High-Volume Sanitization
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    The enterprise standard for high-volume mobile device sanitization.
                    Permanently wipe iOS & Android devices beyond forensic recovery.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={downloadCatalog}
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Datasheet
                    </button>
                  </div>

                  
                </div>
              </Reveal>

              {/* Right: Monitor + Hub + 5 Phones Visual */}
              <Reveal delayMs={100}>
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-10 bg-white rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative flex flex-col items-center scale-[0.8] lg:scale-90 origin-top">

                    {/* ── MONITOR ── */}
                    <div className="w-[340px] h-[220px] bg-slate-800 rounded-none p-2.5 border-4 border-slate-700 shadow-2xl relative z-20">
                      <div className="w-full h-full bg-white rounded-none overflow-hidden relative flex flex-col items-center justify-center border border-slate-200">
                        {/* Binary Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-mono text-[8px] leading-[10px] break-all overflow-hidden p-1">
                          {new Array(10).fill("101010101010101010101010101010101010101010101010101010").join("\n")}
                        </div>

                        {/* Heartbeat Line (Animates across) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
                          <svg className="w-full h-24 text-emerald-600" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path
                              d="M0 50 L150 50 L160 20 L175 80 L190 20 L200 80 L210 50 L400 50"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="animate-pulse"
                              strokeDasharray="400"
                              strokeDashoffset="400"
                              style={{ animation: 'dash 3s linear infinite' }}
                            />
                          </svg>
                        </div>

                        {/* Central Shield + Eraser */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="relative w-20 h-24 flex items-center justify-center">
                            <Shield className="w-full h-full text-emerald-600 fill-emerald-50/10" strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center pt-2">
                              <Eraser className="w-10 h-10 text-emerald-600" />
                            </div>
                          </div>
                          <div className="mt-4 font-black text-[14px] text-slate-800 tracking-wider">
                            Smartphone Eraser
                          </div>
                        </div>
                      </div>

                      {/* Monitor Stand */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-8 h-12 bg-slate-700"></div>
                        <div className="w-32 h-3 bg-slate-800 rounded-full border-t border-slate-600"></div>
                      </div>
                    </div>

                    {/* ── CABLE FROM MONITOR TO HUB ── */}
                    <div className="w-0.5 h-10 bg-slate-400 mt-12 relative z-10 box-border border-r-2 border-slate-300"></div>

                    {/* ── HUB ── */}
                    <div className="w-32 h-10 bg-white border-2 border-slate-300 rounded-none shadow-md flex items-center justify-around px-2 relative z-20">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3 h-1.5 bg-slate-200 rounded-sm border border-slate-300"></div>
                      ))}
                    </div>

                    {/* ── CABLES FROM HUB TO PHONES (SVG) ── */}
                    <div className="relative w-full h-12 -mt-2">
                      <svg className="w-full h-full stroke-slate-400 fill-none" preserveAspectRatio="none">
                        <path d="M260 0 C 260 20, 60 20, 60 40" />
                        <path d="M260 0 C 260 20, 160 20, 160 40" />
                        <path d="M260 0 C 260 20, 260 20, 260 40" />
                        <path d="M260 0 C 260 20, 360 20, 360 40" />
                        <path d="M260 0 C 260 20, 460 20, 460 40" />
                      </svg>
                    </div>

                    {/* ── FIVE PHONES ── */}
                    <div className="flex justify-between w-[520px] px-2 -mt-4">
                      {[
                        { type: 'erase', fill: 85 },
                        { type: 'diag', fill: 40 },
                        { type: 'erase', fill: 100 },
                        { type: 'diag', fill: 65 },
                        { type: 'erase', fill: 20 }
                      ].map((phone, i) => (
                        <div key={`${phone.type}-${i}`} className="flex flex-col items-center">
                          <div className="w-20 h-32 bg-white rounded-none border-2 border-slate-300 p-1.5 shadow-lg relative overflow-hidden group/phone hover:border-emerald-400 transition-colors">
                            {/* Filling animation */}
                            <div
                              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500/40 to-emerald-400/10 rounded-none transition-all duration-1000`}
                              style={{ height: `${phone.fill}%` }}
                            ></div>

                            <div className="relative h-full flex flex-col items-center justify-center">
                              {phone.type === 'erase' ? (
                                <div className="relative w-10 h-12 flex items-center justify-center">
                                  <Shield className="w-full h-full text-emerald-600 opacity-80" strokeWidth={1} />
                                  <div className="absolute inset-0 flex items-center justify-center pt-1">
                                    <Eraser className="w-4 h-4 text-emerald-600" />
                                  </div>
                                </div>
                              ) : (
                                <Activity className="w-8 h-8 text-emerald-600 opacity-80 animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CSS for dash animation */}
                  <style>{`
                    @keyframes dash {
                      from { stroke-dashoffset: 400; }
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        
        {/* ================= KEY TAKEAWAYS ================= */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <KeyTakeaways items={smartphoneEraserTakeaways} />
          </div>
        </section>

        <section id="how-it-works" className="py-20 lg:py-32 bg-[#f4fbf8]">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Efficiency At Scale</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  A high-speed, automated workflow designed for ITADs, refurbishers, and retailers processing 1000s of devices daily.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-4 lg:gap-8">
              {[
                { step: "01", title: "Connect", desc: "Plug in up to 40 devices per workstation using standard USB hubs.", icon: <Smartphone className="w-6 h-6" /> },
                { step: "02", title: "Config", desc: "Software auto-detects model, OS, and IMEI metadata instantly.", icon: <Cpu className="w-6 h-6" /> },
                { step: "03", title: "Erase", desc: "Run regulatory erasure in parallel across all connected devices.", icon: <Eraser className="w-6 h-6" /> },
                { step: "04", title: "Verify", desc: "Generate tamper-proof reports and print identification labels.", icon: <FileCheck className="w-6 h-6" /> },
              ].map((item) => (
                <Reveal key={item.title} delayMs={Number.parseInt(item.step) * 100} className="h-full">
                  <div className="relative p-10 rounded-none bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all group h-full flex flex-col">
                    <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-none bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ERASE TYPES ================= */}
        <ThemeSection id="erase-types" className="bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading 
                centered
                light
                subtitle="Go beyond standard factory resets. Our solution wipes every trace of sensitive data to ensure absolute privacy."
              >
                Complete Sanitization
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eraseTypes.map((type, i) => (
                <Reveal key={type.title} delayMs={i * 100}>
                  <ThemeCard className="h-full p-8" interactive={true}>
                    <ThemeIconContainer icon={type.icon} size="lg" className="mb-6" />
                    <h3 className="text-xl font-bold text-[#0a2e1e] mb-4">{type.title}</h3>
                    <p className="text-[#5a6672] text-sm leading-relaxed">{type.desc}</p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= COMPLIANCE (was STANDARDS) ================= */}
        <section id="compliance" className="py-20 lg:py-32 bg-[#0a2e1e] overflow-hidden relative">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-white/5 text-white px-4 py-2 border border-white/20 text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Audit-Ready Implementation
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                    Global Certification <br />
                    <span className="text-[#0e7c66]">& Compliance</span>
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Our methods are regulatory and tested by global bodies to meet the most stringent data sanitization requirements across all industries.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "NIST 800-88 Clear",
                      "NIST 800-88 Purge",
                      "IEEE 2883:2022 Clear",
                      "IEEE 2883:2022 Purge",
                      "US DoD 5220.22-M (3 Pass)",
                      "US DoD 5220.22-M ECE (7 Pass)",
                      "Peter Gutmann (35 Pass)",
                      "B. Schneier's Algorithm (7 Pass)",
                      "British HMG IS5 (3 Pass)",
                      "US Army AR 380-19",
                      "US Air Force AFSSI-5020",
                      "Common Criteria (EAL 2)",
                      "ISO 27001 Compliant",
                    ].map((std) => (
                      <div key={std} className="flex items-center gap-3 text-white/80 font-medium text-sm">
                        <BadgeCheck className="w-5 h-5 text-[#0e7c66]" />
                        {std}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-[#062115] border border-white/10 p-8 lg:p-12 shadow-2xl">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-[#0a2e1e] border border-[#0e7c66]/30 text-[#0e7c66] flex items-center justify-center mb-4">
                      <FileCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Tamper-Proof Certificates</h3>
                    <p className="text-white/60 max-w-sm">
                      Each erasure generates a verifiable JSON or PDF certificate signed with a cryptographical hash for complete audit readiness.
                    </p>
                    <div className="pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-8 text-left">
                       <div>
                          <p className="text-xs text-white/50 font-bold mb-2 tracking-widest">OUTPUT FORMATS</p>
                          <p className="text-sm text-white/90">PDF, CSV, XML, JSON</p>
                       </div>
                       <div>
                          <p className="text-xs text-white/50 font-bold mb-2 tracking-widest">VALIDITY</p>
                          <p className="text-sm text-[#0e7c66] font-semibold">Global Legal Compliance</p>
                       </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PLATFORMS ================= */}
        <ThemeSection id="platforms">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading 
                centered
                subtitle="Cross-platform compatibility ensuring no device is left vulnerable."
              >
                Platform Support
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 100} className="h-full">
                  <ThemeCard className="text-center flex flex-col h-full border border-slate-200 shadow-none hover:border-[#0e7c66]/30 hover:shadow-md transition-all">
                    <ThemeIconContainer icon={p.icon} className="mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                    <p className="text-[#0e7c66] font-semibold text-sm mb-4 flex-grow">{p.versions}</p>
                    <div className="h-1 w-12 bg-[#0e7c66] mx-auto rounded-none"></div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= FEATURES ================= */}
        <ThemeSection id="features" noBg={true} className="bg-emerald-50/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading 
                centered
                subtitle="Powered by next-gen technology to automate your mobile asset circular economy."
              >
                Advanced Capabilities
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {moreFeatures.map((feat, i) => (
                <Reveal key={feat.title} delayMs={i * 100} className="h-full">
                  <ThemeCard className="flex flex-col h-full border border-slate-200 shadow-none hover:border-[#0e7c66]/30 hover:shadow-md transition-all">
                    <ThemeIconContainer icon={feat.icon} className="mb-6" />
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow">{feat.desc}</p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= USE CASES ================= */}
        <ThemeSection id="use-cases" className="bg-[#0a2e1e]" noBg={true}>
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading 
                centered
                light
                subtitle="From single devices to warehouse-level processing, we provide the backbone for secure mobile recycling."
              >
                Circular Economy Enabler
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {useCases.map((use, i) => (
                <Reveal key={use.title} delayMs={i * 100}>
                  <div className="flex items-start gap-6 p-8 bg-[#062115] border border-white/10 hover:border-[#0e7c66]/30 hover:bg-[#062115]/80 transition-all h-full">
                    <ThemeIconContainer icon={use.icon} className="flex-shrink-0" />
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{use.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{use.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        <ProductInternalLinks currentProduct="smartphone-eraser" />

        <FAQSection faqs={smartphoneEraserFaqs} id="faq" />

        {/* ================= CONTACT / CTA ================= */}
        <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
           {/* Subtle background patterns */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
              source="Smartphone Eraser Page Contact"
              solutionType="mobile-erasure"
              title="Scale Your Mobile Disposal Business Today"
              subtitle="Join leading ITADs and mobile retailers using D-Secure to process thousands of devices with 100% data security guarantee."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default SmartphoneEraserPage;
