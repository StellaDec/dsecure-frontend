import React, { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { FAQSection } from "@/components/FAQSection";
import SolutionContactSection from "@/components/SolutionContactSection";
import ProductInternalLinks from "@/components/ProductInternalLinks";
import { blogPosts } from "@/data/blogPosts";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Cloud,
  Cpu,
  FileText,
  Globe,
  HardDrive,
  Monitor,
  RefreshCw,
  Server,
  Server as LucideServer,
  Settings,
  Shield,
  Smartphone,
  Star
} from 'lucide-react';

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const relatedBlogs = blogPosts.slice(0, 4);

// Assuming we have basic SEO setup. Fallback provided.
const getSEOForPage = (id: string) => ({
  title: "Zero Trace | D-Secure",
  description: "Secure data erasure solution built to permanently remove every trace of data from your devices.",
  keywords: "system cleaner, data erasure, wipe data, secure delete",
});

const generateFAQSchema = (faqs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    }
  }))
});

const zeroTraceFaqs = [
  {
    question: "Once Zero Trace erases my data, is there any way to get it back?",
    answer: "No. Zero Trace overwrites your data using industry-standard methods, well beyond what simple deletion or formatting provides. Once the process completes, the data cannot be recovered — not through recovery software, and not through professional data-recovery services."
  },
  {
    question: "Does Zero Trace work on SSDs as well as traditional hard drives?",
    answer: "Yes. Zero Trace is built to handle both HDDs and SSDs, applying the right erasure approach for each drive type to ensure a complete, secure wipe."
  },
  {
    question: "What makes Zero Trace different from just deleting files or formatting my drive?",
    answer: "Deleting files or formatting a drive only removes the 'pointer' to your data — the actual files usually remain recoverable. Zero Trace physically overwrites the data itself, following industry-leading sanitization standards, so there's nothing left to recover."
  },
  {
    question: "Is Zero Trace meant for personal use, or is it built for businesses?",
    answer: "Both. Zero Trace is simple enough for individuals wiping a personal device before resale or donation, while also offering the depth and reliability businesses need for IT asset disposal at scale."
  },
  {
    question: "Does Zero Trace remove my installed programs too, or just my files?",
    answer: "Yes. Before the deep erase begins, Zero Trace automatically clears out third-party software and leftover files from your system, so nothing is left behind once the drive is wiped."
  }
];

const ZeroTracePage: React.FC = memo(function ZeroTracePage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const demoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } else if (demoContainerRef.current?.requestFullscreen) {
        await demoContainerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "how-it-works", label: "How It Works" },
    { id: "demo", label: "Demo" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Who Uses It" },
    { id: "faq", label: "FAQ" },
    { id: "blogs", label: "Blogs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
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
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
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
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      title: "System Cleanup",
      desc: "Zero Trace scans your device and removes third-party applications, leftover installers, and background processes, clearing the way for an unobstructed wipe.",
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Deep Drive Erasure",
      desc: "Zero Trace then runs a thorough, multi-pass overwrite across the entire drive, following industry-leading data sanitization practices.",
      icon: <Settings className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Irrecoverable Results",
      desc: "Once complete, your data isn't just 'deleted' — it's structurally destroyed. No software, service, or specialist can bring it back.",
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    },
  ];

  const features = [
    {
      title: "Full Third-Party Software Removal",
      desc: "Clears installed programs before the wipe begins.",
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Industry-Standard Data Sanitization",
      desc: "Follows recognized, thorough erasure methods.",
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Truly Irrecoverable Erasure",
      desc: "Goes far beyond what delete, format, or factory reset can do.",
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Works Across Drive Types",
      desc: "Built to handle both HDDs and SSDs.",
      icon: <Server className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "One-Click Simplicity",
      desc: "Designed for everyday users, no technical background needed.",
      icon: <Monitor className="w-6 h-6 text-cyan-500" />,
    },
    {
      title: "Enterprise & Compliance Ready",
      desc: "Suited for organizations that need to prove secure data destruction.",
      icon: <Globe className="w-6 h-6 text-emerald-600" />,
    },
  ];

  const whoUsesIt = [
    {
      title: "Individuals",
      desc: "Selling, donating, or recycling a personal laptop or PC.",
    },
    {
      title: "Small Businesses",
      desc: "Retiring old office computers without risking data leaks.",
    },
    {
      title: "IT Teams",
      desc: "Managing secure disposal across fleets of company devices.",
    },
    {
      title: "Regulated Organizations",
      desc: "Needing auditable, compliant data-destruction records.",
    },
  ];

  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage("zero-trace")} 
        structuredData={generateFAQSchema(zeroTraceFaqs)} 
      />

      <div className="container mx-auto px-4 pt-4 pb-1">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'Zero Trace', path: '/products/zero-trace' },
          ]}
        />
      </div>

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

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 overflow-hidden">
        {/* HERO SECTION */}
        <section className="py-8 lg:py-12 xl:py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <Shield className="w-6 h-6 text-emerald-600" />
                      Erase Completely. Protect Permanently.
                    </div>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Zero Trace
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    A secure data erasure solution featuring Protected OS™ technology, built to permanently remove every trace of data from your devices — safely, thoroughly, and beyond recovery.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-700 rounded-none font-semibold transition-all border-2 border-emerald-200 hover:border-emerald-300"
                    >
                      Talk to Sales
                    </Link>
                  </div>
                </div>
              </Reveal>
              
              {/* Feature Image */}
              <Reveal delayMs={200} className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative group w-full max-w-xl mx-auto mt-8 lg:mt-0">
                  
                  {/* Floating Badges Removed */}


                  {/* Main Monitor Base Shadow */}
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-none blur-2xl transform translate-y-4 group-hover:translate-y-6 transition-all duration-500" />
                  
                  {/* Monitor Hardware */}
                  <div className="relative flex flex-col items-center z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                    {/* Monitor Screen */}
                    <div className="bg-[#1a202c] w-full rounded-none overflow-hidden shadow-2xl border border-slate-700/50 flex flex-col relative">
                      {/* Top Bar macOS style */}
                      <div className="bg-[#2d3748]/50 border-b border-slate-700/50 px-4 py-2.5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-slate-400 text-xs font-medium tracking-wide">D-Secure Console</span>
                        <div className="w-10" /> {/* Spacer for balance */}
                      </div>
                      
                      {/* Screen Content */}
                      <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5">
                        {/* Top Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <div className="bg-[#2d3748]/40 border border-emerald-500/20 rounded-none p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden group/stat hover:bg-[#2d3748]/60 transition-colors">
                            <div className="absolute inset-0 bg-emerald-500/5" />
                            <span className="text-lg sm:text-2xl font-bold text-emerald-400 mb-0.5 sm:mb-1">14.2<span className="text-sm">GB</span></span>
                            <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">Space Freed</span>
                          </div>
                          <div className="bg-[#2d3748]/40 border border-emerald-500/20 rounded-none p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden group/stat hover:bg-[#2d3748]/60 transition-colors">
                            <div className="absolute inset-0 bg-emerald-500/5" />
                            <span className="text-lg sm:text-2xl font-bold text-emerald-400 mb-0.5 sm:mb-1">100%</span>
                            <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">Secure Clean</span>
                          </div>
                          <div className="bg-[#2d3748]/40 border border-slate-600/30 rounded-none p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden group/stat hover:bg-[#2d3748]/60 transition-colors">
                            <span className="text-lg sm:text-2xl font-bold text-cyan-400 mb-0.5 sm:mb-1">50+</span>
                            <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">Apps Cleaned</span>
                          </div>
                        </div>

                        {/* Progress Bar Area */}
                        <div className="bg-[#2d3748]/30 border border-slate-600/30 rounded-none p-3 sm:p-4">
                           <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-2">
                               <div className="bg-emerald-500/20 p-1 sm:p-1.5 rounded-md text-emerald-400">
                                 <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                               </div>
                               <span className="text-slate-200 text-xs sm:text-sm font-semibold">Deep System Clean — In Progress</span>
                             </div>
                             <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 animate-[spin_3s_linear_infinite]" />
                           </div>
                           <div className="w-full h-1.5 sm:h-2 bg-slate-700/50 rounded-full overflow-hidden mb-2">
                             <div className="h-full bg-emerald-400 rounded-full w-[72%] relative">
                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                             </div>
                           </div>
                           <div className="flex justify-between items-center text-[9px] sm:text-xs text-slate-400 font-medium">
                             <span>Scanning Registry & App Data...</span>
                             <span className="text-emerald-400 font-bold">72%</span>
                           </div>
                        </div>

                        {/* Device List */}
                        <div className="flex flex-col gap-1 sm:gap-2">
                          <div className="flex items-center justify-between text-[10px] sm:text-sm py-1.5 border-b border-slate-700/50">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="text-slate-300">Browser Cache & Cookies</span>
                            </div>
                            <span className="text-emerald-500 text-[9px] sm:text-xs font-medium">Cleaned</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] sm:text-sm py-1.5 border-b border-slate-700/50">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="text-slate-300">Leftover Installers & Temp Files</span>
                            </div>
                            <span className="text-emerald-500 text-[9px] sm:text-xs font-medium">Cleaned</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] sm:text-sm py-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                              <span className="text-slate-300">Third-Party App Data</span>
                            </div>
                            <span className="text-amber-500 text-[9px] sm:text-xs font-medium">Scanning...</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* Stand */}
                    <div className="w-20 sm:w-24 h-5 sm:h-6 bg-gradient-to-b from-[#2d3748] to-[#1a202c] border-x border-slate-700/50 relative z-0" />
                    <div className="w-28 sm:w-32 h-1.5 sm:h-2 bg-[#1a202c] rounded-none border border-t-0 border-slate-700/50 shadow-xl relative z-0" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* OVERVIEW & WHY DELETE ISN'T ENOUGH */}
        <section id="overview" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Why "Delete" Isn't Enough
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Most people assume that deleting a file, emptying the recycle bin, or formatting a drive removes their data for good. It doesn't. These actions only remove the *pointer* to your files — the actual data usually stays fully intact on the drive and can be pulled back using freely available recovery software.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mt-4">
                  This gap is a real risk. Old laptops, discarded hard drives, and recycled company devices are a common source of data leaks, identity theft, and compliance failures. Zero Trace closes that gap by physically overwriting your data so it can never be reconstructed.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  How Zero Trace Works
                </h2>
                <p className="text-xl text-slate-600">
                  A simple, two-stage process for total peace of mind.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Reveal key={`step-${index}`} delayMs={index * 100}>
                  <div className="bg-white rounded-none p-8 shadow-lg border border-slate-100 h-full flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Step {index + 1} — {step.title}
                    </h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VIDEO SECTION ================= */}
        <section
          id="demo"
          className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  See Zero Trace in Action
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch how D-Secure Zero Trace permanently destroys sensitive
                  data with audit-ready documentation
                </p>
              </div>
            </Reveal>

            {/* Media Grid - 1 Video */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Main Video Card */}
              {/* Embedded Product Demo - Sandbox Style */}
              <Reveal delayMs={100}>
                <div
                  ref={demoContainerRef}
                  className={`relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-emerald-200/30 transition-shadow duration-500 flex flex-col group ${
                    isFullscreen
                      ? "w-full h-full rounded-none"
                      : "rounded-none h-full min-h-[800px]"
                  }`}
                >
                  {/* Fullscreen Toggle Button (visible only when demo is active) */}
                  {isDemoActive && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-12 right-4 z-50 p-2.5 bg-slate-900/80 hover:bg-emerald-600 text-white rounded-none shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
                      title={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      )}
                      <span className="text-sm font-medium pr-1 hidden sm:block">
                        {isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                      </span>
                    </button>
                  )}

                  {!isDemoActive ? (
                    /* Demo Placeholder - Screenshot Thumbnail */
                  <button
                    onClick={() => setIsDemoActive(true)}
                    className="group relative w-full h-full min-h-[400px] flex-1 cursor-pointer overflow-hidden border-none p-0 m-0 bg-transparent text-left"
                    aria-label="Start interactive demo"
                  >
                      {/* Screenshot Background (using a generic background or placeholder) */}
                      <div className="w-full h-full min-h-[600px] bg-slate-900 flex items-center justify-center">
                         <Monitor className="w-48 h-48 text-emerald-500/20" />
                      </div>
                      {/* Subtle overlay for play button visibility */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
                      {/* Centered Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-emerald-200 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-7 h-7 text-white ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-slate-200/80">
                            Click to start interactive demo
                          </span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    /* Iframe Container */
                    <iframe
                      src="https://system-cleaner-dsecure-web.vercel.app/"
                      className="w-full h-full flex-1 border-0"
                      title="D-Secure Zero Trace Demo"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                      allow="clipboard-read; clipboard-write; fullscreen"
                      allowFullScreen
                    />
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Key Features
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Reveal key={`feature-${index}`} delayMs={index * 100}>
                  <div className="p-6 rounded-none bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="bg-white w-12 h-12 rounded-none flex items-center justify-center shadow-sm mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO USES IT */}
        <section id="use-cases" className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Who Uses Zero Trace
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Simple enough for anyone to use, thorough enough for the world's strictest data-destruction requirements.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoUsesIt.map((useCase, index) => (
                <Reveal key={`usecase-${index}`} delayMs={index * 100}>
                  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-none hover:bg-slate-800 transition-colors h-full">
                    <h3 className="text-xl font-bold text-emerald-400 mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-300">{useCase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ProductInternalLinks currentProduct="zero-trace" />

        {/* FAQ */}
        <FAQSection id="faq" faqs={zeroTraceFaqs} />

        {/* ================= LATEST INSIGHTS & UPDATES ================= */}
        <section id="blogs" className="py-16 lg:py-24 bg-emerald-950">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Technical Blogs
                  </h2>
                  <p className="text-lg text-emerald-50 max-w-2xl">
                    Expert insights on data security, erasure standards, and
                    best practices
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors group"
                >
                  View More
                  <ArrowRight className="w-6 h-6 text-emerald-400" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedBlogs.map((blog, i) => (
                <Reveal key={blog.id} delayMs={i * 60}>
                  <div className="relative bg-white rounded-none sm:rounded-none p-4 sm:p-6 border border-emerald-900 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
                      <Link to={blog.link} className="after:absolute after:inset-0">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-emerald-800 font-semibold text-sm mb-4 group-hover:gap-2 gap-1 transition-all">
                      Read Article <ArrowRight className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                      <span>{blog.publishDate}</span>
                      <span>
                        {blog.readTime || getReadTime(blog.excerpt)}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <SolutionContactSection source="Zero Trace Page" subjectPrefix="Zero Trace Enquiry" />

        {/* CTA */}
        <section className="py-20 bg-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to make your data disappear for good?
                </h2>
                <p className="text-xl text-emerald-100 mb-10">
                  D-Secure builds security-first tools with one goal: keeping your data in your control, even after you've stopped using the device that holds it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-none font-semibold transition-all hover:bg-emerald-700"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default ZeroTracePage;
