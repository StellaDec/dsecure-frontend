import React, { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
// import UpcomingBadge from "../components/ui/UpcomingBadge";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { getSEOForPage } from "@/utils/seo";
import { getReadTime } from "@/utils/readTime";
import { ProductContactForm } from "@/components/forms";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { FAQSection } from "@/components/FAQSection";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  FileText,
  Globe,
  Maximize,
  Monitor,
  RefreshCw,
  ScanSearch,
  Search,
  Server,
  Settings,
  Shield,
  Star,
  X,
  Zap
} from 'lucide-react';

const galleryImages = [
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900829/gxf91pw0zskqpenqmcyh.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900829/xgs5jrdap2wsigl6qojv.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900829/wivbftt6fvj3e0immtxc.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/fkjqw32dvfo2qoyvbjt6.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/rfrisa46sw3vtwq6h0mf.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900829/wkpyjljk8preij7lwvk1.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/voqh2eka0js4w4yarvfw.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/piw7h3rpxcqxgakzvwsl.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/moxtoxzqtmwpdixles6g.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900828/bog9kdzcyxxowsbciqtp.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/jtgchvtpyh6l0tn4ghve.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/eerupedbpykv6i6gdmzg.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/b2tukty3rf019qfbcgom.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/fxudhnk0epcuvdymmexz.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/cpgikzcbf6fduwquvc7n.png", alt: "Autopilot Detection in Action" },
  { url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1782901753/lteeyrwnw9udzt9ikiub.png", alt: "Autopilot Detection in Action" },
];

const AutopilotDetectionPage: React.FC = memo(
  function AutopilotDetectionPage() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("");
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
    
    const iframeContainerRef = React.useRef<HTMLDivElement>(null);
    
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        iframeContainerRef.current?.requestFullscreen?.().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen?.();
      }
    };

    const sectionNavItems = [
      { id: "overview", label: "Overview" },
      { id: "how-it-works", label: "How It Works" },
      { id: "demo", label: "Demo" },
      { id: "risks", label: "The Hidden Risk" },
      { id: "features", label: "Key Features" },
      { id: "compliance", label: "Compliance" },
      { id: "platforms", label: "Deployment" },
      { id: "use-cases", label: "Use Cases" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
      const handleScroll = () => {
        // Scroll position ke hisaab se active section aur sticky nav update karein
        const scrollPosition = window.scrollY;
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
      // Smooth scroll functionality specific section ke liye
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

    const autopilotTakeaways = [
      {
        title: "Automated Identification",
        desc: "Detect Autopilot and Intune enrollments automatically during device processing.",
      },
      {
        title: "Re-Enrollment Prevention",
        desc: "Verify unenrollment from Microsoft Cloud directly, avoiding return loops.",
      },
      {
        title: "Scale Processing",
        desc: "Deploy via USB or PXE to process multiple assets simultaneously.",
      }
    ];

    const autopilotFaqs = [
      {
        q: "What is Windows Autopilot Detection?",
        a: "It's a specialized feature that identifies if a device is still linked to a Microsoft Cloud (Autopilot/Intune) tenant. It prevents the major security risk of assets re-locking to previous owners after resale.",
      },
      {
        q: "How does the detection logic work?",
        a: "The tool generates a unique Hardware ID (HWID) during boot and queries the Microsoft cloud directly to verify the enrollment status of the specific device.",
      },
      {
        q: "Why is data erasure alone not enough?",
        a: "Data erasure wipes the locally stored data, but Windows Autopilot is a cloud-side lock. Even a 'clean' drive will automatically re-apply enterprise policies as soon as it connects to the internet.",
      },
      {
        q: "What is the benefit for ITAD vendors?",
        a: "It helps ITADs avoid costly RMAs and returns. By identifying locked devices early, you can coordinate unenrollment with the client and ensure every asset is truly ready for the circular economy.",
      },
      {
        q: "Can this be run at scale over a network?",
        a: "Yes. Using PXE (Network) Boot, you can process high volumes of assets simultaneously, with results automatically synced to your cloud dashboard or ERP system.",
      },
      {
        q: "Which compliance standards does it support?",
        a: "It directly assists with R2v3 (Appendix B) compliance, which requires clear proof that enterprise controls, locks, and connectivity have been removed from repurposed IT assets.",
      },
      {
        q: "Do I need separate licenses for detection?",
        a: "Yes, Autopilot Detection is an add-on capability and usually requires separate cloud verification licenses from the standard erasure tokens.",
      },
    ];

    // Risk cards — Lucide component references (JSX literal nahi)
    const risks: { title: string; desc: string; icon: React.ElementType }[] = [
      {
        title: "The Re-Enrollment Loop",
        desc: "Even after a full data wipe, Autopilot enrollment remains intact. Resold devices will automatically re-lock to the previous owner's tenant upon internet connection.",
        icon: X,
      },
      {
        title: "R2v3 Compliance Risk",
        desc: "Failing to deregister retired IT assets violates R2v3 (Appendix B) and ISO 27001 standards, which require removal of all enterprise locks and policies.",
        icon: Shield,
      },
      {
        title: "Unusable Liabilities",
        desc: "Locked devices are effectively bricks for the new owner, leading to high return rates, warranty disputes, and damage to your brand reputation.",
        icon: Zap,
      },
    ];

    // Feature cards — Lucide component references
    const features: { title: string; desc: string; icon: React.ElementType }[] = [
      {
        title: "Automatic UEM Detection",
        desc: "Identify Unified Endpoint Management (UEM) enrollments during the device processing phase without manual intervention.",
        icon: Search,
      },
      {
        title: "Cloud Verification",
        desc: "Verify device unenrollment directly from the cloud, ensuring assets are truly 'clean' before redistribution.",
        icon: Cloud,
      },
      {
        title: "Compliance Verification",
        desc: "Generate tamper-evident reports that certify the successful unenrollment of assets from enterprise UEMs.",
        icon: FileText,
      },
      {
        title: "Enterprise Automation",
        desc: "Scale your processing facility with fully automated workflows that flag 'stuck' devices instantly.",
        icon: Server,
      },
      {
        title: "ERP/API Connectivity",
        desc: "Seamlessly integrate with ITAD management platforms like Makor and RazorERP for centralized asset flagging.",
        icon: Settings,
      },
      {
        title: "Parallel Processing",
        desc: "Check multiple devices simultaneously via PXE boot, significantly increasing your facility's daily throughput.",
        icon: Zap,
      },
    ];

    const complianceStandards = [
      {
        name: "R2v3 Appendix B",
        desc: "Meets SERI requirements for logical data sanitization and lock removal.",
      },
      {
        name: "NIST 800-88",
        desc: "Ensures media sanitization aligns with federal data destruction standards.",
      },
      {
        name: "ISO 27001",
        desc: "Supports global information security management systems (ISMS).",
      },
      {
        name: "GDPR",
        desc: "Complies with 'Right to Erasure' and data privacy regulations.",
      },
      {
        name: "HIPAA",
        desc: "Protects PHI during the decommissioning of healthcare IT assets.",
      },
      {
        name: "ITAD Regulatory",
        desc: "Designed for high-volume asset disposition (ITAD) workflows.",
      },
    ];

    // Deployment platforms — Lucide component references
    const platforms: { name: string; desc: string; icon: React.ElementType }[] = [
      {
        name: "USB Boot Mode",
        desc: "Ideal for manual processing. Boot from a specialized D-Secure Detection USB to fetch cloud status instantly.",
        icon: Download,
      },
      {
        name: "PXE Network Boot",
        desc: "Recommended for bulk volume. Deploy detection across your local network for automated, high-speed auditing.",
        icon: Server,
      },
    ];

    // Use-case cards — Lucide component references
    const useCases: { title: string; desc: string; icon: React.ElementType }[] = [
      {
        title: "ITAD Vendors",
        desc: "Centrally flag locked devices and coordinate deregistration with clients before resale to maintain margins.",
        icon: Shield,
      },
      {
        title: "Enterprise IT",
        desc: "Ensure 100% of retired assets are removed from Intune/Azure AD before they leave organizational control.",
        icon: Globe,
      },
      {
        title: "Refurbishers",
        desc: "Prevent 'failed provisioning' loops for end-users and minimize RMA rates for refurbished inventory.",
        icon: Monitor,
      },
    ];

    return (
      <>
        <SEOHeadNative seo={getSEOForPage("autopilot-detection")} />

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
                  <ThemeAwareLogo
                    className="h-7 sm:h-8 w-auto"
                    responsive={true}
                  />
                </Link>
                <nav className="flex items-center gap-1">
                  {sectionNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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
          <section id="overview" className="py-12 lg:py-20 xl:py-24 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                <Reveal>
                  <div className="space-y-8">
                    {/* <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal> */}

                    <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0a2e1e] px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                      <Shield className="w-4 h-4 text-[#0e7c66]" />
                      Secure Re-Enrollment Prevention
                    </div>

                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0a2e1e] leading-tight">
                      D-Secure{" "}
                      <span className="text-[#0e7c66]">
                        Autopilot Detection Tool
                      </span>
                      : Touchless Recheck
                    </h1>

                    <p className="text-lg lg:text-xl text-[#5a6672] leading-relaxed max-w-xl">
                      Identify Windows Autopilot and Intune enrolled devices
                      automatically. Ensure assets are fully unenrolled from
                      UEMs before they leave your facility.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* <button
                        onClick={() =>
                          navigate("/pricing-and-plan?product=autopilot-mdm")
                        }
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-8 py-4 rounded-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        Buy Now
                        <ArrowRight className="w-6 h-6 text-emerald-600" />
                      </button> */}
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="inline-flex items-center justify-center gap-2 bg-[#0e7c66] text-white font-bold px-8 py-4 rounded-none hover:bg-[#0a2e1e] transition-colors"
                      >
                        Contact Sales
                      </button>
                    </div>

                    
                  </div>
                </Reveal>

                {/* Right: Hero Illustration - Dashboard, Product Box, Report */}
                <Reveal delayMs={100}>
                  <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[480px]" style={{ perspective: '1200px' }}>
                    
                    {/* Left: Dashboard Screenshot — hover par zoom in/out */}
                    <div 
                      className="absolute w-[220px] sm:w-[280px] lg:w-[360px] cursor-pointer" 
                      style={{ 
                        zIndex: 10,
                        top: '50%', left: '50%',
                        transform: 'translate(-85%, -50%) rotate(-8deg)',
                        transition: 'transform 0.5s ease, z-index 0s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-88%, -53%) rotate(-8deg) scale(1.08)'; e.currentTarget.style.zIndex = '30'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-85%, -50%) rotate(-8deg) scale(1)'; e.currentTarget.style.zIndex = '10'; }}
                    >
                      <div className="border border-[#d0d5dc]/80 rounded-lg overflow-hidden shadow-2xl bg-white">
                        <img 
                          loading="lazy" 
                          decoding="async"
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1782900827/cpgikzcbf6fduwquvc7n.png"
                          alt="D-Secure Autopilot Detection Software Interface"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    {/* Right: Erasure Report — hover par zoom in/out */}
                    <div 
                      className="absolute w-[160px] sm:w-[200px] lg:w-[240px] cursor-pointer" 
                      style={{ 
                        zIndex: 10,
                        top: '50%', left: '50%',
                        transform: 'translate(-15%, -50%) rotate(8deg)',
                        transition: 'transform 0.5s ease, z-index 0s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-12%, -53%) rotate(8deg) scale(1.08)'; e.currentTarget.style.zIndex = '30'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-15%, -50%) rotate(8deg) scale(1)'; e.currentTarget.style.zIndex = '10'; }}
                    >
                      <div className="relative border border-[#d0d5dc]/80 rounded-lg shadow-xl overflow-hidden bg-white">
                        <img 
                          loading="lazy" 
                          decoding="async"
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1782904367/q70fjrmxun0kstjanwsp.png"
                          alt="Autopilot Detection Tamper-evident Report"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    {/* Center: 3D Product Box — hover par zoom in/out */}
                    <div 
                      className="absolute w-[130px] sm:w-[160px] lg:w-[190px] cursor-pointer drop-shadow-2xl" 
                      style={{ 
                        zIndex: 20,
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -45%)',
                        transition: 'transform 0.5s ease, z-index 0s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.12)'; e.currentTarget.style.zIndex = '30'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-50%, -45%) scale(1)'; e.currentTarget.style.zIndex = '20'; }}
                    >
                      <div
                        className="relative"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'rotateY(-12deg) rotateX(2deg) rotate(3deg)',
                        }}
                      >
                        {/* Main Box - Front Face */}
                        <div
                          className="relative bg-gradient-to-br from-[#0a2e1e] via-[#0e7c66] to-[#0a2e1e] rounded-lg shadow-2xl overflow-hidden"
                          style={{
                            aspectRatio: '3/4',
                            boxShadow: '20px 20px 50px rgba(0,0,0,0.35), -3px -3px 10px rgba(255,255,255,0.05), inset 0 0 60px rgba(255,255,255,0.03)',
                          }}
                        >
                          {/* Top Shine Effect */}
                          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/15 to-transparent"></div>

                          {/* Side Shadow (3D depth) */}
                          <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent"></div>

                          {/* Product Box Content */}
                          <div className="relative h-full flex flex-col items-center justify-center p-3 lg:p-4">
                            {/* D-Secure Brand - top left */}
                            <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                              <span className="text-white/80 text-[7px] lg:text-[9px] font-semibold tracking-widest uppercase">
                                D-Secure
                              </span>
                            </div>

                            {/* Main Icon */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 lg:mb-3 border border-white/20 shadow-inner">
                              <ScanSearch className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
                            </div>

                            {/* Product Name */}
                            <h2 className="text-white text-xs sm:text-[13px] lg:text-sm font-bold tracking-tight text-center mb-0.5 leading-tight">
                              Autopilot
                              <br />
                              <span className="text-[10px] sm:text-[11px] lg:text-[12px] text-emerald-300">Detection</span>
                            </h2>

                            {/* Tagline */}
                            <p className="text-white/70 text-[6px] sm:text-[7px] lg:text-[9px] text-center tracking-wide uppercase mt-1">
                              Touchless Recheck
                            </p>

                            {/* Bottom Badge */}
                            <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 w-full px-2">
                              <div className="flex items-center justify-center gap-1 bg-white/10 backdrop-blur-sm px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full border border-white/20 mx-auto w-fit">
                                <CheckCircle className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-emerald-300" strokeWidth={2} />
                                <span className="text-white/90 text-[5px] sm:text-[6px] lg:text-[7px] font-semibold whitespace-nowrap">
                                  Cloud Verified
                                </span>
                              </div>
                            </div>

                            {/* Decorative Lines */}
                            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          </div>

                          {/* Pulse border */}
                          <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                        </div>

                        {/* Right Side Face (3D spine) */}
                        <div
                          className="absolute top-0 right-0 w-[20px] lg:w-[28px] h-full bg-gradient-to-l from-[#063d2e] to-[#0a5c48]"
                          style={{
                            transform: 'rotateY(90deg) translateZ(0px) translateX(10px)',
                            transformOrigin: 'left center',
                            borderRadius: '0 4px 4px 0',
                          }}
                        ></div>
                      </div>

                      {/* Bottom Reflection */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-gradient-to-t from-emerald-600/15 to-transparent blur-xl rounded-full"></div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          
        {/* ================= KEY TAKEAWAYS ================= */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <KeyTakeaways items={autopilotTakeaways} />
          </div>
        </section>

        <ThemeSection id="how-it-works">
            <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                <ThemeSectionHeading centered subtitle="Complete automation from detection to certification without manual intervention.">
                  Touchless Recheck Workflow
                </ThemeSectionHeading>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                {/* Connector lines (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-[#d4ede4] -z-0"></div>

                {[
                  { step: "01", title: "Detect", desc: "Flags devices still enrolled in Autopilot or Intune during processing.", icon: Search },
                  { step: "02", title: "Verify", desc: "Cloud-based recheck confirms unenrolment status automatically.", icon: Cloud },
                  { step: "03", title: "Certify", desc: "Tamper-evident report confirms the complete unenrollment status.", icon: FileText },
                ].map((item, idx) => (
                  <Reveal key={idx} delayMs={idx * 100}>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <ThemeIconContainer icon={item.icon} size="lg" />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#0e7c66] text-white flex items-center justify-center font-bold text-xs">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#5a6672] leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </ThemeSection>

          {/* ================= SEE IN ACTION / DEMO SECTION ================= */}
          <section
            id="demo"
            className="py-16 lg:py-20 bg-[#f4fbf8]"
          >
            <div className="container mx-auto px-4 max-w-6xl">
              <Reveal>
                <div className="text-center mb-10">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                    See D-Secure Autopilot Detection in Action
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Watch how the Autopilot Detection tool identifies enrolled
                    devices in real-time — from boot to cloud verification
                  </p>
                </div>
              </Reveal>

              {/* Demo Video / Screenshot Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Main Demo Card */}
                <Reveal delayMs={100}>
                  <div className="relative bg-white rounded-none overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-emerald-200/30 transition-shadow duration-500 flex flex-col group p-1">
                    {/* Interactive Sandbox iframe */}
                    <div ref={iframeContainerRef} className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-none bg-slate-900 group/iframe">
                      <button 
                        onClick={toggleFullScreen}
                        className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-emerald-600 text-white rounded-none opacity-0 group-hover/iframe:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                        title="Toggle Fullscreen"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                      <iframe 
                        src="https://mdm-dashboard-demo.vercel.app/"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        title="D-Secure MDM Dashboard Sandbox"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                          INTERACTIVE DEMO
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Live Sandbox
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">
                        Autopilot Detection Dashboard
                      </h3>
                      <p className="text-sm text-slate-500">
                        Explore the interactive MDM dashboard environment. View mock device data, review generated reports, and experience the UI in real-time.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot Gallery Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryImages.slice(0, 4).map((img, index) => {
                    const isLastVisible = index === 3;
                    const remainingCount = galleryImages.length - 4;
                    
                    return (
                      <Reveal key={index} delayMs={150 + index * 50}>
                        <button
                          onClick={() => setSelectedGalleryIndex(index)}
                          className="group relative bg-white rounded-none overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 w-full aspect-[4/3] flex items-center justify-center cursor-zoom-in"
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Hover Overlay for first 3 images */}
                          {!isLastVisible && (
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                              <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                            </div>
                          )}

                          {/* '+X More' Overlay for the last visible image */}
                          {isLastVisible && (
                            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center group-hover:bg-slate-900/70 transition-colors">
                              <span className="text-white font-bold text-2xl drop-shadow-md">
                                +{remainingCount} More
                              </span>
                            </div>
                          )}
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ================= THE HIDDEN RISK ================= */}
          <ThemeSection id="risks" noBg className="py-12 md:py-16 lg:py-20" style={{ background: '#0a2e1e' }}>
            <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                <div className="mb-12 md:mb-16 text-center mx-auto">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    The Hidden Risk
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Why simple data erasure isn't enough for enterprise-enrolled assets.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {risks.map((risk, i) => (
                  <Reveal key={i} delayMs={i * 80}>
                    <div className="bg-white/10 border border-white/20 border-l-4 border-l-[#0e7c66] p-6 sm:p-8 h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-150">
                      <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mb-6">
                        <risk.icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{risk.title}</h3>
                      <p className="text-white/70 leading-relaxed text-sm">{risk.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </ThemeSection>

          {/* ================= KEY FEATURES ================= */}
          <ThemeSection id="features">
            <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                <ThemeSectionHeading centered subtitle="Advanced automated auditing for high-volume ITAD and enterprise environments.">
                  Key Features
                </ThemeSectionHeading>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <Reveal key={i} delayMs={i * 50}>
                    <ThemeCard className="h-full">
                      <ThemeIconContainer icon={feature.icon} size="md" className="mb-6" />
                      <h3 className="text-xl font-bold text-[#0a2e1e] mb-3 group-hover:text-[#0e7c66] transition-colors">{feature.title}</h3>
                      <p className="text-[#5a6672] text-sm leading-relaxed">{feature.desc}</p>
                    </ThemeCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </ThemeSection>

          {/* ================= REPORT SECTION ================= */}
          <ThemeSection alternate>
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <Reveal>
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0a2e1e] px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                      <Shield className="w-4 h-4 text-[#0e7c66]" />
                      Audit-Ready Documentation
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2e1e]">
                      Comprehensive Detection Report
                    </h2>
                    <p className="text-lg text-[#5a6672] leading-relaxed">
                      After every Autopilot scan, a digitally signed PDF report is generated
                      containing hardware IDs, device specifications, BIOS details,
                      and final enrollment status — ready to present during compliance audits.
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={200}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    <button
                      onClick={() => setSelectedImage("https://res.cloudinary.com/dhwi5wevf/image/upload/v1782904367/q70fjrmxun0kstjanwsp.png")}
                      className="relative rounded-none overflow-hidden shadow-xl border border-slate-200 group cursor-pointer w-full text-left p-0 bg-white block aspect-[3/4] hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
                      aria-label="View Autopilot Detection Report Page 1 fullscreen"
                    >
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1782904367/q70fjrmxun0kstjanwsp.png"
                        alt="Autopilot Detection Report Page 1"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Search className="w-6 h-6 text-emerald-800" />
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedImage("https://res.cloudinary.com/dhwi5wevf/image/upload/v1782904366/vwil0boyhukg6zscxeug.png")}
                      className="relative rounded-none overflow-hidden shadow-xl border border-slate-200 group cursor-pointer w-full text-left p-0 bg-white block aspect-[3/4] hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl sm:mt-12"
                      aria-label="View Autopilot Detection Report Page 2 fullscreen"
                    >
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1782904366/vwil0boyhukg6zscxeug.png"
                        alt="Autopilot Detection Report Page 2"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Search className="w-6 h-6 text-emerald-800" />
                        </div>
                      </div>
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </ThemeSection>

          {/* ================= COMPLIANCE (Dark Section) ================= */}
          <section
            id="compliance"
            className="py-20 lg:py-28 text-white overflow-hidden relative"
            style={{ background: '#0a2e1e' }}
          >
            <div className="container mx-auto px-4 relative z-10">
              <Reveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                    Fully Audit-Ready Certification
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Our solution provides verifiable proof that asset control
                    has been completely severed from enterprise systems.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {complianceStandards.map((std) => (
                  <Reveal key={std.name}>
                    <div className="border border-white/20 p-6 hover:bg-white/10 transition-colors h-full flex flex-col items-center text-center">
                      <CheckCircle className="w-6 h-6 text-[#0e7c66] mb-3" />
                      <h4 className="font-bold text-base mb-2">{std.name}</h4>
                      <p className="text-xs text-white/60">{std.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ================= PLATFORMS & DEPLOYMENT ================= */}
          <ThemeSection id="platforms">
            <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                <ThemeSectionHeading centered subtitle="Flexible deployment options to fit any processing scale — from single devices to entire server racks.">
                  Deployment Modes
                </ThemeSectionHeading>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {platforms.map((platform, i) => (
                  <Reveal key={i} delayMs={i * 100}>
                    <ThemeCard className="h-full">
                      <ThemeIconContainer icon={platform.icon} size="lg" className="mb-6" />
                      <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">{platform.name}</h3>
                      <p className="text-[#5a6672] leading-relaxed">{platform.desc}</p>
                    </ThemeCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </ThemeSection>

          {/* ================= USE CASES ================= */}
          <ThemeSection id="use-cases" alternate>
            <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                <ThemeSectionHeading centered subtitle="D-Secure Autopilot Detection streamlines asset disposition for professional electronics recyclers and corporate IT teams.">
                  Who Is It For?
                </ThemeSectionHeading>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {useCases.map((useCase, i) => (
                  <Reveal key={i} delayMs={i * 80}>
                    <ThemeCard className="h-full">
                      <ThemeIconContainer icon={useCase.icon} size="md" className="mb-6" />
                      <h3 className="text-xl font-bold text-[#0a2e1e] mb-3">{useCase.title}</h3>
                      <p className="text-[#5a6672] text-sm leading-relaxed">{useCase.desc}</p>
                    </ThemeCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </ThemeSection>

          {/* ================= TECHNICAL SPECIFICATIONS ================= */}
          <ThemeSection id="tech-specs">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2e1e] mb-8">
                      Technical Specifications
                    </h2>
                    <div className="space-y-6">
                      {[
                        {
                          label: "Identification Type",
                          value:
                            "Hardware ID (HWID) & Serial Number Verification",
                        },
                        {
                          label: "Cloud Integration",
                          value: "Direct Azure/Intune API Connectivity",
                        },
                        /* {
                          label: "Response Time",
                          value: "< 2 Seconds for Cloud Status Retrieval",
                        }, */
                        {
                          label: "Deployment",
                          value: "x86/x64 Bootable ISO (USB 3.0 / PXE)",
                        },
                        /* {
                          label: "Report Format",
                          value:
                            "Tamper-evident PDF / CSV / JSON (Makor/Razor Ready)",
                        },
                        {
                          label: "Minimum Specs",
                          value:
                            "2GB RAM, Intel/AMD Processor, Internet Access",
                        }, */
                      ].map((spec, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100 last:border-0"
                        >
                          <span className="font-semibold text-slate-900 w-full sm:w-1/3 mb-1 sm:mb-0">
                            {spec.label}
                          </span>
                          <span className="text-slate-600 w-full sm:w-2/3">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal delayMs={200}>
                  <div
                    className="p-8 lg:p-12 text-white relative border border-[#0e7c66]/30 shadow-2xl"
                    style={{ background: '#0a2e1e' }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#0e7c66] flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Smart Audit Logic</h3>
                    </div>
                      <ul className="space-y-4">
                        {[
                          "Automatic HWID generation during boot",
                          "End-to-end encrypted cloud communication",
                          "Timestamped verification with digital signature",
                          "Auto-retry logic for unstable connections",
                          "Detailed tenant ID and enrollment profiles",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                            <span className="text-slate-300 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </ThemeSection>

          {/* ================= FAQ SECTION ================= */}
          <FAQSection faqs={autopilotFaqs} id="faq" />

          {/* ================= CONTACT / CTA ================= */}
          <section
            id="contact"
            className="py-24 lg:py-40 bg-white border-t"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              {/* <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-[3rem] p-8 lg:p-16 text-center text-white mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 blur-3xl rounded-full"></div>

                <h2 className="text-3xl lg:text-5xl font-bold mb-6 relative z-10">
                  Ready to secure your assets?
                </h2>
                <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto relative z-10">
                  Get instant access to the Autopilot Detector for just $1 per
                  use. Detect locks before they become a liability.
                </p>
                <button
                  onClick={() =>
                    navigate("/pricing-and-plan?product=autopilot-mdm")
                  }
                  className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-emerald-900 font-bold px-10 py-5 rounded-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg"
                >
                  Buy Now - $1
                  <ArrowRight className="w-6 h-6 text-emerald-600" />
                </button>
              </div> */}

              <ProductContactForm
                source="Autopilot Detection Page Contact"
                solutionType="autopilot-detection"
                title="Need Bulk Processing or Custom Integration?"
                subtitle="Talk to our experts to see how D-Secure Autopilot Detection can scale your ITAD or enterprise operations."
              />
            </div>
          </section>

          {/* Fullscreen Image Modal */}
          {(selectedImage !== null || selectedGalleryIndex !== null) && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm cursor-zoom-out"
              onClick={() => {
                setSelectedImage(null);
                setSelectedGalleryIndex(null);
              }}
            >
              <div
                className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedGalleryIndex(null);
                  }}
                  className="absolute -top-12 right-0 lg:-right-12 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                
                {selectedGalleryIndex !== null && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGalleryIndex(
                          selectedGalleryIndex === 0
                            ? galleryImages.length - 1
                            : selectedGalleryIndex - 1
                        );
                      }}
                      className="absolute left-2 lg:-left-16 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                      <ChevronLeft className="w-10 h-10" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGalleryIndex(
                          selectedGalleryIndex === galleryImages.length - 1
                            ? 0
                            : selectedGalleryIndex + 1
                        );
                      }}
                      className="absolute right-2 lg:-right-16 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                      <ChevronRight className="w-10 h-10" />
                    </button>
                  </>
                )}

                <img
                  src={selectedGalleryIndex !== null ? galleryImages[selectedGalleryIndex].url : selectedImage!}
                  alt={selectedGalleryIndex !== null ? galleryImages[selectedGalleryIndex].alt : "Report Fullscreen"}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-none shadow-2xl cursor-default"
                />

                {selectedGalleryIndex !== null && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm z-10">
                    {selectedGalleryIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  },
);

export default AutopilotDetectionPage;
