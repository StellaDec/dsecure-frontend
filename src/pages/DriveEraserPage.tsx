import React, { memo, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { generateFAQSchema } from "@/utils/seo.core";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { KeyTakeawayItem } from "@/types/seo";
import { Activity, ArrowLeft, ArrowRight, CheckCircle, Cloud, CpuIcon, FileText, FileTextIcon, Globe, LockIcon, RefreshCw, RefreshCwIcon, Server, Settings, Shield, ShieldCheck, Star, User, X, Laptop, HardDrive, Usb, Briefcase, Download, FileCheck, Eraser, Cpu, Building2, Scale, Recycle, ArrowRightLeft, Layers, Database, Zap, Key, LayoutGrid, Command, Terminal } from "lucide-react";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { useToast } from "@/components/Toast";
import { blogPosts } from "@/data/blogPosts";
import { driveEraserFAQs as importedDriveEraserFAQs } from "@/data/seoFaqs";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const DriveEraserPage: React.FC = memo(function DriveEraserPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    country: "",
    businessType: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const demoContainerRef = useRef<HTMLDivElement>(null);

  // Single Source of Truth for Key Takeaways
  const driveEraserTakeaways: KeyTakeawayItem[] = [
    { text: "NIST 800-88 & DoD 5220.22-M compliant data erasure software." },
    { text: "Securely wipes HDDs, SSDs, and NVMe drives permanently." },
    {
      text: "Generates tamper-evident audit certificates for regulatory compliance.",
    },
    {
      text: "Deployable via bootable USB, PXE network boot, or cloud console.",
    },
  ];

  // Single Source of Truth for FAQs imported from data
  const driveEraserFaqs = importedDriveEraserFAQs;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (demoContainerRef.current?.requestFullscreen) {
          await demoContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
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

  // गैलरी इमेजेज - नए Cloudinary URLs के साथ optimized (f_auto, q_auto)
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773305257/a4sgxgi17mpdrzdfb7ut.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773305257/a4sgxgi17mpdrzdfb7ut.png",
      alt: "Welcome Screen - Start Sanitization",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773305313/gaa6fv88jzmpgyyq96wg.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773305313/gaa6fv88jzmpgyyq96wg.png",
      alt: "Detecting Hardware",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773305166/ycdyjanbhcaxulah3unl.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773305166/ycdyjanbhcaxulah3unl.png",
      alt: "WiFi Connection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773305219/zrkffe7ylntxde56budn.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773305219/zrkffe7ylntxde56budn.png",
      alt: "LAN Connection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773300694/whegkqyd3tp2cg7neowp.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773300694/whegkqyd3tp2cg7neowp.png",
      alt: "Dashboard Overview",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773300653/vkuknf56igiivxb98byw.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773300653/vkuknf56igiivxb98byw.png",
      alt: "Reports & Certificates",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773300598/lye0zxxqut8o870mh98l.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773300598/lye0zxxqut8o870mh98l.png",
      alt: "About Page",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773303765/usmphwsihzdg4s5y2637.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773303765/usmphwsihzdg4s5y2637.png",
      alt: "Step 1 - Drive Detection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773303839/svli2uykco9hme2sk0oh.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773303839/svli2uykco9hme2sk0oh.png",
      alt: "Step 2 - Wipe Configuration",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773303719/vlshsgzlgnsfu1drxhvh.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773303719/vlshsgzlgnsfu1drxhvh.png",
      alt: "Step 3 - Destructive Confirmation",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773304110/zzakl8rvddzadkkpevga.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773304110/zzakl8rvddzadkkpevga.png",
      alt: "General Settings",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773304035/ctjtcp2leqj5c2rarmei.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773304035/ctjtcp2leqj5c2rarmei.png",
      alt: "Account Settings",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773303943/cvfupwsy8iejwrxi5jzj.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773303943/cvfupwsy8iejwrxi5jzj.png",
      alt: "Help Page - Top",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773303980/gemjfmgk3cw7wnvgh2z6.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1773303980/gemjfmgk3cw7wnvgh2z6.png",
      alt: "Help Page - Bottom",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1778239910/dwzvvyiiyhlntaw9cheh.png",
      alt: "Tamper-evident Erasure Report",
    },
  ];

  // Number of additional images beyond the 4th card (for "More" badge)
  const additionalImagesCount = galleryImages.length - 4;

  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  }, [selectedImageIndex, galleryImages.length]);

  const handleNextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  }, [selectedImageIndex, galleryImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

  const sectionNavItems = useMemo(() => [
    { id: "erase-types", label: "Erase Types" },
    { id: "demo", label: "Demo" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "blogs", label: "Blogs" },
    { id: "contact", label: "Contact" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;

      // Show nav after scrolling past hero section (approx 400px)
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      // Only dispatch event to hide/show main navbar on desktop (md+) screens
      // since sticky nav is hidden on mobile
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      // Find current active section
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
      // Reset main navbar visibility on unmount (only on desktop)
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, [sectionNavItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav height
      const elementPosition =
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const eraseTypes = [
    {
      name: "PC & Laptops",
      desc: "Regulatory data wiping for Windows, Mac, and Linux computers. Permanent erasure with tamper-evident certificates for audit compliance.",
      icon: Laptop,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Servers & RAID Arrays",
      desc: "Secure erasure for enterprise servers and RAID configurations. DIY solution that generates certificates meeting global standards like GDPR, HIPAA, and ISO 27001.",
      icon: Server,
      color: "from-red-500 to-red-600",
    },
    {
      name: "SSDs & NVMe Drives",
      desc: "Specialized erasure for solid-state storage ensuring complete data destruction. Deploy via bootable USB (Using UNetbootin) or PXE network boot for maximum flexibility.",
      icon: HardDrive,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "HDDs & External Drives",
      desc: "Permanent erasure for traditional hard drives and USB storage. Software supports remote deployment via MSI and provides audit trail for compliance reporting.",
      icon: Usb,
      color: "from-emerald-500 to-emerald-600",
    },
  ];



  const features = [
    {
      title: "Secure Drive Erasure",
      desc: "NIST-tested software delivers erasure with  data destruction guarantee for all storage types.",
      link: "/blog/ssd-wipe-guide",
      icon: Shield,
    },
    {
      title: "Cloud Console",
      desc: "Centralized management platform for monitoring, reporting, and managing erasure tasks across all locations.",
      icon: Cloud,
    },
    {
      title: "Supports Global Wiping Standards",
      desc: "26+ international erasure standards including NIST 800-88, DoD, HMG.",
      icon: Globe,
    },
    {
      title: "Multiple Deployment Solutions",
      desc: "Deploy via USB boot, PXE network boot, or integrate directly with IT asset management systems.",
      icon: Server,
    },
    {
      title: "ERP Integration",
      desc: "Seamlessly integrate with all enterprise systems via REST APIs.",
      icon: Database,
    },
    {
      title: "Simultaneous Data Wiping",
      desc: "enables efficient large-scale data destruction, eliminating the need for manual data wiping processes.",
      icon: Layers,
    },
    {
      title: "Automatic & MDM Detection",
      desc: "Automatically detect hardware specifications, MDM profiles, and activation locks before erasure.",
      icon: Cpu,
    },
    {
      title: "License Don't Expire",
      desc: "Pay-per-use licensing model with no expiration - use credits whenever you need them.",
      icon: Key,
    },
  ];

  const useCases = [
    {
      title: "Disposal of RAID Servers",
      desc: "Securely erase enterprise RAID arrays before disposal, and private data cannot be recovered.",
      icon: Server,
    },
    {
      title: "IT Asset Redeployment",
      desc: "Safely repurpose hardware within organization",
      icon: ArrowRightLeft,
    },
    {
      title: "Device Recycling & Resale",
      desc: "Prepare devices for resale programs",
      icon: Recycle,
    },
    {
      title: "End-of-Lease IT Hardware",
      desc: "Comply with lease return data requirements",
      icon: Building2,
    },
    {
      title: "Regulatory Compliance",
      desc: "Meet GDPR, HIPAA, PCI-DSS requirements",
      icon: Scale,
    },
    {
      title: "Cloud Migration Projects",
      desc: "Securely decommission on-premise storage",
      icon: Cloud,
    },
  ];

  const complianceStandards = [
    {
      name: "NIST 800-88",
      desc: "US National Institute of Standards",
      link: "/blog/nist-clear-purge",
    },
    {
      name: "DoD 5220.22-M",
      desc: "US Department of Defense",
      link: "/blog/dod-vs-ieee",
    },
    { name: "GDPR", desc: "EU General Data Protection" },
    { name: "HIPAA", desc: "Healthcare Information Privacy" },
    { name: "SOX", desc: "Sarbanes-Oxley Act" },
    { name: "PCI-DSS", desc: "Payment Card Industry" },
  ];

  const handleModalInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const relatedBlogs = blogPosts
    .filter((post) =>
      [
        "overwrite-guide",
        "ssd-wipe-guide",
        "data-erasure-myths",
        "local-llm-data-erasure",
      ].includes(post.id),
    )
    .slice(0, 4);

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DataSheetDriveEraser.pdf";
    link.download = "DataSheetDriveEraser.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <>
      <SEOHeadNative
        seo={getSEOForPage("drive-eraser")}
        structuredData={generateFAQSchema(driveEraserFaqs)}
      />

      {/* Breadcrumb Navigation — SEO ke liye */}
      <div className="container mx-auto px-4 pt-4 pb-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Drive Eraser", path: "/products/drive-eraser" },
          ]}
        />
      </div>

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
                    type="button"
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
        {/* ================= HERO SECTION ================= */}
        <section className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 xxl:py-18">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <HardDrive className="w-6 h-6 text-emerald-600" />
                      Enterprise-Grade Drive Erasure
                    </div>
                    {/* Reference to the new Diagnostic variant */}
                    <Link
                      to="/products/drive-eraser-diagnostic"
                      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-100 transition-colors group"
                    >
                      <Activity className="w-4 h-4 animate-pulse text-emerald-600" />
                      <span>New: Diagnostic & Health Variant</span>
                      <ArrowRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="text-emerald-600">
                      Drive Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Securely wipe entire HDDs, SSDs, and NVMe drives with
                    industry-leading data sanitization standards. NIST 800-88
                    and DoD 5220.22-M compliant erasure for enterprise data
                    security and audit-readiness.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "SOC 2"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/pricing-and-plan?product=drive-eraser"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <Zap className="w-5 h-5" />
                      Buy Now
                    </Link>
                    {/* <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <Briefcase className="w-5 h-5" />
                      Contact Sales
                    </Link> */}
                    <button
                      type="button"
                      onClick={downloadCatalog}
                      disabled={false}
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

              {/* Right: Hero Illustration - 3D Product Box */}
              {/* Right: Hero Illustration - Software Screenshot + 3D Product Box */}
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
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773300694/whegkqyd3tp2cg7neowp.png"
                        alt="D-Secure Drive Eraser Software Interface"
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
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778239910/dwzvvyiiyhlntaw9cheh.png"
                        alt="Drive Eraser Tamper-evident Report"
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

                        {/* Product Box Content — Proportionally sized for compact box */}
                        <div className="relative h-full flex flex-col items-center justify-center p-3 lg:p-4">
                          {/* D-Secure Brand - top left */}
                          <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                            <span className="text-white/80 text-[7px] lg:text-[9px] font-semibold tracking-widest uppercase">
                              D-Secure
                            </span>
                          </div>

                          {/* Main Icon — Lucide HardDrive icon */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 lg:mb-3 border border-white/20 shadow-inner">
                            <HardDrive className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
                          </div>

                          {/* Product Name */}
                          <h2 className="text-white text-xs sm:text-sm lg:text-base font-bold tracking-tight text-center mb-0.5">
                            Drive Eraser
                          </h2>

                          {/* Tagline */}
                          <p className="text-white/70 text-[6px] sm:text-[7px] lg:text-[9px] text-center tracking-wide uppercase">
                            Secure Data Destruction
                          </p>

                          {/* Bottom Badge — Regulatory Erasure */}
                          <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-1.5 py-0.5 lg:px-2.5 lg:py-1 rounded-full border border-white/20">
                              <ShieldCheck className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-emerald-300" strokeWidth={2} />
                              <span className="text-white/90 text-[5px] sm:text-[6px] lg:text-[8px] font-semibold whitespace-nowrap">
                                Regulatory Erasure
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

        {/* ================= WHAT YOU CAN ERASE ================= */}
        
        {/* ================= KEY TAKEAWAYS ================= */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <KeyTakeaways
                    items={driveEraserTakeaways}
                    title="Why Choose D-Secure Drive Eraser?"
                  />
          </div>
        </section>

        <ThemeSection id="erase-types" alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Comprehensive data destruction capabilities for all types of sensitive information">
                What You Can Erase
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eraseTypes.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 50}>
                  <ThemeCard className="h-full">
                    <ThemeIconContainer size="lg" icon={item.icon} className="mb-5" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0e7c66] transition-colors flex-shrink-0">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-1 overflow-auto">
                      {item.desc}
                    </p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= PRODUCT DEMO SECTION ================= */}
        <section
          id="demo"
          className="py-12 sm:py-16 lg:py-20 bg-white"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Try Drive Eraser{" "}
                  <span className="text-emerald-600">
                    Demo
                  </span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Experience D-Secure Drive Eraser in action — explore the
                  interface and features right here
                </p>
              </div>
            </Reveal>

            {/* Embedded Product Demo - Sandbox Style */}
            <Reveal delayMs={100}>
              <div
                ref={demoContainerRef}
                className={`relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-emerald-200/30 transition-all duration-500 flex flex-col group ${
                  isFullscreen
                    ? "w-full h-full rounded-none"
                    : "rounded-none h-[450px] sm:h-[500px] lg:h-[600px]"
                }`}
              >
                {/* Fullscreen Toggle Button (visible only when demo is active) */}
                {isDemoActive && (
                  <button
                    type="button"
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
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
                    type="button"
                    onClick={() => setIsDemoActive(true)}
                    className="group relative w-full h-full flex-1 cursor-pointer overflow-hidden border-none p-0 m-0 bg-transparent"
                    aria-label="Start interactive demo"
                  >
                    {/* Screenshot Background */}
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035728/ddzt2ghea7hotem4bvz9.png"
                      alt="D-Secure Drive Eraser Preview"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Subtle overlay for play button visibility */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-emerald-200 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
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
                    src="https://dsecure-drive-eraser.vercel.app/"
                    className="w-full h-full flex-1 border-0"
                    title="D-Secure Drive Eraser Demo"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    allow="clipboard-read; clipboard-write; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
            </Reveal>

            {/* Caption below demo */}
            <Reveal delayMs={200}>
              <p className="text-center text-sm text-slate-500 mt-4">
                Interactive product demo — explore Drive Eraser features
                directly in your browser
              </p>
            </Reveal>

            {/* Screenshot Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {/* Screenshot 1 */}
              <Reveal delayMs={150}>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(0)}
                  className="group relative w-full bg-white rounded-none overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img
                      src={galleryImages[0].thumbnail}
                      alt={galleryImages[0].alt}
                      className="w-full h-full object-contain bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>

              {/* Screenshot 2 */}
              <Reveal delayMs={200}>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(1)}
                  className="group relative w-full bg-white rounded-none overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img
                      src={galleryImages[1].thumbnail}
                      alt={galleryImages[1].alt}
                      className="w-full h-full object-contain bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>

              {/* Screenshot 3 */}
              <Reveal delayMs={250}>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(2)}
                  className="group relative w-full bg-white rounded-none overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img
                      src={galleryImages[2].thumbnail}
                      alt={galleryImages[2].alt}
                      className="w-full h-full object-contain bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>

              {/* Screenshot 4 - Shows "More" badge if additional images exist */}
              <Reveal delayMs={300}>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(3)}
                  className="group relative w-full bg-white rounded-none overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img
                      src={galleryImages[3].thumbnail}
                      alt={galleryImages[3].alt}
                      className="w-full h-full object-contain bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* More Images Badge */}
                    {additionalImagesCount > 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xl sm:text-2xl font-bold">
                          +{additionalImagesCount} More
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* [OLD VIDEO SECTION - PRESERVED AS COMMENT]
        <section
          id="demo"
          className="py-12 sm:py-16 lg:py-20 bg-slate-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  See Drive Eraser in Action
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch how D-Secure Drive Eraser permanently destroys sensitive
                  data with audit-ready documentation
                </p>
              </div>
            </Reveal>
            ... (video + screenshot cards removed) ...
          </div>
        </section>
        */}

        {/* ================= HOW IT WORKS (Help Manual) ================= */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-emerald-950">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Settings className="w-6 h-6 text-emerald-400" />
                  Simple 4-Step Process
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  How To Use <span className="text-emerald-300">D-Secure</span>{" "}
                  Drive Eraser for Secure Disk Wiping?
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Industry-leading data sanitization in 4 simple steps. Deploy
                  via USB, PXE, or MSI.
                </p>
              </div>
            </Reveal>

            {/* Enhanced 4-Step Flow */}
            <Reveal delayMs={100}>
              <div className="relative max-w-5xl mx-auto">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-emerald-200 z-0"></div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {/* Step 1: Download */}
                  <div className="group">
                    <div className="bg-white rounded-none p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        1
                      </div>
                      {/* Icon */}
                      <div className="w-16 h-16 bg-emerald-50 rounded-none shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100">
                        <Download className="w-8 h-8 text-emerald-800" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">
                        Download
                      </h3>
                      <p className="text-sm text-slate-500">
                        Get the software from our secure portal
                      </p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Step 2: Deploy */}
                  <div className="group">
                    <div className="bg-white rounded-none p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        2
                      </div>
                      {/* Icon */}
                      <div className="w-16 h-16 bg-emerald-50 rounded-none shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100">
                        <Server className="w-8 h-8 text-emerald-800" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">Deploy</h3>
                      <p className="text-sm text-slate-500 mb-2">
                        Multiple ways to deploy
                      </p>
                      <div className="text-[10px] text-emerald-800 font-semibold mb-3">
                        Download USB Tool:
                        <a
                          href={`${import.meta.env.VITE_DOWNLOADS_BASE_URL}/tools%20for%20usb%20bootable/unetbootin-windows-702.exe`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline hover:text-emerald-900 ml-1"
                        >
                          Win
                        </a>{" "}
                        |
                        <a
                          href={`${import.meta.env.VITE_DOWNLOADS_BASE_URL}/tools%20for%20usb%20bootable/unetbootin-linux64-702.bin`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline hover:text-emerald-900 ml-1"
                        >
                          Lin
                        </a>{" "}
                        |
                        <a
                          href={`${import.meta.env.VITE_DOWNLOADS_BASE_URL}/tools%20for%20usb%20bootable/unetbootin-mac-702.dmg`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline hover:text-emerald-900 ml-1"
                        >
                          Mac
                        </a>
                      </div>
                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        <span className="text-[10px] px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 font-semibold">
                          USB ISO
                        </span>
                        <span className="text-[10px] px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 font-semibold">
                          PXE Boot
                        </span>
                        <span className="text-[10px] px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 font-semibold">
                          MSI
                        </span>
                      </div>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Step 3: Erase */}
                  <div className="group">
                    <div className="bg-white rounded-none p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        3
                      </div>
                      {/* Icon with overlapping shields */}
                      <div className="w-16 h-16 bg-emerald-50 rounded-none shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100 relative">
                        <Eraser className="w-8 h-8 text-emerald-800" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">
                        Erase Devices
                      </h3>
                      <p className="text-sm text-slate-500">
                        Securely wipe multiple devices simultaneously
                      </p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Step 4: Save Reports */}
                  <div className="group">
                    <div className="bg-white rounded-none p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        4
                      </div>
                      {/* Icon with checkmark */}
                      <div className="w-16 h-16 bg-emerald-50 rounded-none shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100 relative">
                        <FileCheck className="w-8 h-8 text-emerald-800" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">
                        Save Reports
                      </h3>
                      <p className="text-sm text-slate-500">
                        Store erasure certificates on cloud
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Description Text */}
            <Reveal delayMs={200}>
              <div className="max-w-3xl mx-auto mt-12 text-center">
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">
                    D-Secure Drive Eraser
                  </strong>{" "}
                  offers the flexibility to wipe drives and devices in both
                  internet-enabled locations and offline facilities. Deploy via{" "}
                  <strong className="text-emerald-400">USB drive</strong>,{" "}
                  <strong className="text-emerald-400">PXE boot</strong> over
                  network, or{" "}
                  <strong className="text-emerald-400">MSI package</strong> for
                  remote wiping on Windows endpoints.
                </p>
                <p className="text-sm text-white mt-4">
                  *Offline variant available for Non-Internet locations
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= TAMPER PROOF REPORT ================= */}
        <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    Audit-Ready Documentation
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Tamper-evident Diagnostic Report
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Generates digitally signed reports of erasure to help meet
                    statutory & regulatory compliance. Option to save reports
                    locally or on secure cloud console in PDF format
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImageIndex(galleryImages.length - 1)
                  }
                  className="relative rounded-none overflow-hidden shadow-2xl border border-slate-200 group cursor-pointer w-full max-w-[320px] sm:max-w-[400px] mx-auto text-left p-0 border-none bg-slate-50 block"
                  aria-label="View Tamper-evident Erasure Report fullscreen"
                >
                  <img
                    src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778239910/dwzvvyiiyhlntaw9cheh.png"
                    alt="Tamper-evident Erasure Report"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none"></div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE STANDARDS ================= */}
        <section
          id="compliance"
          className="py-16 lg:py-24 bg-emerald-950"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Compliance-Ready by Design
                </h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  D-Secure Drive Eraser supports organizational compliance
                  initiatives by aligning with widely accepted data protection
                  principles and secure erasure best practices
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {complianceStandards.map((std, i) => {
                const CardContent = (
                  <div
                    className={`bg-white/10 backdrop-blur-sm rounded-none sm:rounded-none p-3 sm:p-5 text-center hover:bg-white/20 transition-colors border border-white/10 h-full flex flex-col items-center justify-start min-h-[130px] sm:min-h-[160px] group ${std.link ? "cursor-pointer" : ""}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3
                      className="font-bold mb-1 text-sm sm:text-base transition-colors text-white"
                    >
                      {std.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white line-clamp-2">
                      {std.desc}
                    </p>
                  </div>
                );

                return (
                  <Reveal key={std.name} delayMs={i * 50}>
                    {std.link ? (
                      <Link to={std.link} className="block h-full">
                        {CardContent}
                      </Link>
                    ) : (
                      CardContent
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= MULTI-ARCHITECTURE SUPPORT ================= */}
        <section
          id="platforms"
          className="py-16 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200">
                  <Cpu className="w-4 h-4" />
                  Cross-Platform Native
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Multi-Architecture Support
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
                  Native performance across all major CPU architectures and
                  operating systems
                </p>
              </div>
            </Reveal>

            {/* Architecture Cards */}
            <Reveal delayMs={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {/* x64 Architecture */}
                <div className="group relative bg-white rounded-none sm:rounded-none p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl shadow-lg">

                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-none sm:rounded-none flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">
                        x64
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                        AMD64 / Intel 64
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-800">
                        Most Common Architecture
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Standard 64-bit processors from Intel & AMD used in most
                    desktops, laptops, and servers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Intel Core
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      AMD Ryzen
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Xeon
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      EPYC
                    </span>
                  </div>
                </div>

                {/* ARM64 Architecture */}
                <div className="group relative bg-white rounded-none sm:rounded-none p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl shadow-lg">

                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-none sm:rounded-none flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">
                        ARM64
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        ARM64
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-600">
                        Growing Ecosystem
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Modern ARM-based processors for power-efficient computing on
                    mobile, Mac, and servers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Apple Silicon
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Snapdragon
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Graviton
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Ampere
                    </span>
                  </div>
                </div>

                {/* x86 Architecture */}
                <div className="group relative bg-white rounded-none sm:rounded-none p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl shadow-lg sm:col-span-2 md:col-span-1">

                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-none sm:rounded-none flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">
                        x86
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        x86 (32-bit)
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-600">
                        Legacy Support
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Legacy 32-bit processors for older systems still in
                    enterprise use requiring secure erasure.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Legacy Intel
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Pentium
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Atom
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* OS Compatibility Grid */}
            <Reveal delayMs={200}>
              <div className="bg-white rounded-none sm:rounded-none p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
                  Operating System Compatibility
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Windows */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-none sm:rounded-none p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-emerald-600 flex items-center justify-center bg-emerald-50 rounded-none sm:rounded-none border border-emerald-200">
                      <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Windows</h4>
                      <p className="text-xs text-slate-500">x64, ARM64, x86</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>

                  {/* macOS */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-none sm:rounded-none p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-emerald-600 flex items-center justify-center bg-emerald-50 rounded-none sm:rounded-none border border-emerald-200">
                      <Command className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">macOS</h4>
                      <p className="text-xs text-slate-500">
                        x64, ARM64 (Apple Silicon)
                      </p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>

                  {/* Linux */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-none sm:rounded-none p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-emerald-600 flex items-center justify-center bg-emerald-50 rounded-none sm:rounded-none border border-emerald-200">
                      <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Linux</h4>
                      <p className="text-xs text-slate-500">x64, ARM64, x86</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-600">
                    <div className="flex gap-0.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    <span>All Architectures</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="flex gap-0.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    <span>x64 & ARM64</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= KEY FEATURES ================= */}
        <ThemeSection id="features" className="bg-emerald-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Technical capabilities that differentiate D-Secure from consumer-grade deletion utilities and basic disk cleanup tools">
                Implementation-Ready Security Architecture
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => {
                const CardContent = (
                  <ThemeCard className="h-full">
                    <ThemeIconContainer icon={f.icon} className="mb-4" />
                    <h3
                      className={`text-xl font-bold text-slate-900 mb-2 ${f.link ? "group-hover:text-[#0e7c66] transition-colors" : ""}`}
                    >
                      {f.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-grow">
                      {f.desc}
                    </p>
                    {f.link && (
                      <div className="text-[#0e7c66] text-sm font-bold mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-6 h-6 text-[#0e7c66]" />
                      </div>
                    )}
                  </ThemeCard>
                );

                return (
                  <Reveal key={f.title} delayMs={i * 40}>
                    {f.link ? (
                      <Link to={f.link} className="block h-full">
                         {CardContent}
                      </Link>
                    ) : (
                       CardContent
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </ThemeSection>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-16 lg:py-24 bg-emerald-950">
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">Use Cases</h2>
                <p className="text-lg text-emerald-100 max-w-3xl mx-auto">Trusted by individuals and enterprises worldwide</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delayMs={i * 80}>
                  <ThemeCard className="h-full">
                    <div className="flex items-start gap-4">
                      <ThemeIconContainer icon={u.icon} />
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0e7c66] transition-colors">
                          {u.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed flex-1">
                          {u.desc}
                        </p>
                      </div>
                    </div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* <ProductInternalLinks currentProduct="drive-eraser" /> */}

        {/* ================= FAQ SECTION ================= */}
        <FAQSection
          id="faq"
          title="Frequently Asked Questions"
          className="!py-16 lg:!py-24"
          faqs={driveEraserFaqs}
        />

        {/* ================= RELATED FREE TOOLS (Internal Linking — Fix 4 SEO) ================= */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 rounded-full mb-3">
                Free Tools
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                Plan Your Erasure Before You Start
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Use our free compliance tools to determine the right
                sanitization method, estimate costs, and check regulatory
                requirements.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Related Free Tools Section */}
              {[
                {
                  title: "NIST 800-88 Checker",
                  desc: "Find out if your media needs Clear, Purge, or Destroy per federal NIST guidelines.",
                  href: "/tools/nist-800-88-compliance-checker",
                  badge: "Compliance",
                  color: "emerald",
                },
                {
                  title: "Data Breach Cost Calculator",
                  desc: "Estimate your financial exposure from improper disposal by industry and record count.",
                  href: "/tools/data-breach-calculator",
                  badge: "Risk & ROI",
                  color: "rose",
                },
                {
                  title: "SSD Pass Calculator",
                  desc: "Calculate exact overwrite passes and erasure time under NIST 800-88 and DoD standards.",
                  href: "/tools/ssd-pass-calculator",
                  badge: "Technical",
                  color: "blue",
                },
                {
                  title: "GDPR Erasure Checklist",
                  desc: "Audit your Article 17 'Right to Erasure' readiness with our interactive compliance checklist.",
                  href: "/tools/gdpr-erasure-checklist",
                  badge: "GDPR",
                  color: "purple",
                },
              ].map((tool) => (
                <div
                  key={tool.href}
                  className="relative group flex flex-col bg-white rounded-none border border-slate-200 hover:border-emerald-300 hover:shadow-lg p-6 transition-all duration-300"
                >
                  <span
                    className="inline-block self-start px-2.5 py-1 text-xs font-bold rounded-full mb-4 bg-emerald-50 text-emerald-700"
                  >
                    {tool.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors text-lg leading-tight">
                    <Link
                      to={tool.href}
                      className="after:absolute after:inset-0"
                    >
                      {tool.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {tool.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-emerald-700 font-bold text-sm group-hover:gap-2 transition-all">
                    Try Free Tool
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                      <Link
                        to={blog.link}
                        className="after:absolute after:inset-0"
                      >
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
                      <span>{blog.readTime || getReadTime(blog.excerpt)}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY / CTA SECTION ================= */}
        <section
          id="contact"
          className="py-12 sm:py-20 lg:py-28 bg-white border-t"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Talk to Our Data Security Experts
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get personalized guidance on deployment, licensing, and
                    audit-ready data erasure strategies tailored to your
                    organization's needs.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Enterprise & SMB licensing options",
                      "Compliance-focused implementation",
                      "White-label branding available",
                      "No-obligation consultation",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Or contact us directly
                      <ArrowRight className="w-6 h-6 text-emerald-600" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="bg-slate-900 rounded-none sm:rounded-none p-5 sm:p-8 lg:p-10 shadow-2xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Request Information
                  </h3>
                  <form
                    className="space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);

                      try {
                        const now = new Date();
                        const timestampLocal = now.toLocaleString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        });
                        const timestampISO = now.toISOString();

                        // === FormSubmit ke liye FormData taiyar karein ===
                        const formSubmitData = new FormData();
                        // Backend ko notify karne ke liye webhook - backend auto-response email bhejega
                        formSubmitData.append(
                          "_webhook",
                          `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
                        );
                        formSubmitData.append("_captcha", "false");
                        formSubmitData.append("_template", "table");
                        formSubmitData.append("sendAutoReply", "true"); // Auto-reply enable karein

                        // Form fields
                        formSubmitData.append("name", formData.name.trim());
                        formSubmitData.append("email", formData.email.trim());
                        formSubmitData.append(
                          "customer_email",
                          formData.email.trim(),
                        ); // Customer ka email auto-reply ke liye
                        formSubmitData.append(
                          "organization",
                          formData.organization.trim(),
                        );
                        formSubmitData.append("phone", formData.phone.trim());
                        formSubmitData.append(
                          "country",
                          formData.country.trim(),
                        );
                        formSubmitData.append(
                          "businessType",
                          formData.businessType.trim(),
                        );
                        formSubmitData.append(
                          "message",
                          formData.message.trim(),
                        );

                        // Autoresponse ke liye reply-to zaroori hai
                        formSubmitData.append(
                          "_replyto",
                          formData.email.trim(),
                        );
                        formSubmitData.append("timestamp", timestampLocal);
                        formSubmitData.append(
                          "source",
                          "Drive Eraser Page Contact",
                        );

                        // Subject aur CC
                        formSubmitData.append(
                          "_subject",
                          "New Inquiry - Drive Eraser Page - D-Secure Tech",
                        );
                        formSubmitData.append(
                          "_cc",
                          import.meta.env.VITE_FORM_CC_EMAILS,
                        );

                        // === Prepare submission data for Backend API ===
                        const submissionData = {
                          name: formData.name.trim(),
                          email: formData.email.trim(),
                          company: formData.organization.trim(),
                          phone: formData.phone.trim(),
                          country: formData.country.trim(),
                          businessType: formData.businessType.trim(),
                          solutionType: "drive-erasure",
                          complianceRequirements: "",
                          message: formData.message.trim(),
                          usageType: "",
                          source: "Drive Eraser Page Contact",
                          timestamp: timestampISO,
                        };

                        // Reset form and show success immediately
                        setFormData({
                          name: "",
                          email: "",
                          organization: "",
                          phone: "",
                          country: "",
                          businessType: "",
                          message: "",
                        });
                        setIsLoading(false);
                        showToast(
                          "Thank you! Your enquiry has been submitted successfully.",
                          "success",
                        );

                        try {
                          // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                          const API_BASE =
                            import.meta.env.VITE_API_BASE_URL;
                          const apiResponse = await fetch(
                            `${API_BASE}/api/ContactFormSubmissions`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(submissionData),
                            },
                          );

                          // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
                          await fetch(
                            import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
                            {
                              method: "POST",
                              body: formSubmitData,
                              headers: { Accept: "application/json" },
                            },
                          );

                          // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
                          fetch(
                            import.meta.env.VITE_POWER_AUTOMATE_HTTP_URL || "",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                "x-api-key": import.meta.env.VITE_POWER_AUTOMATE_API_KEY,
                              },
                              body: JSON.stringify(submissionData),
                            },
                          ).catch(() => {});

                          if (!apiResponse.ok) {
                            const errorData = await apiResponse.json();
                            console.error(
                              "Backend submission failed:",
                              errorData,
                            );
                          }
                        } catch (error: unknown) {
                          console.error("Form error:", error);
                          showToast(
                            error instanceof Error ? error.message : "Failed to send message. Please try again later.",
                            "error",
                          );
                        }
                      } catch (error) {
                        console.error("FormSubmit error:", error);
                        showToast(
                          "Failed to submit enquiry. Please try again.",
                          "error",
                        );
                        setIsLoading(false);
                      }
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleModalInputChange}
                          placeholder="Full Name *"
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleModalInputChange}
                          placeholder="Email *"
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleModalInputChange}
                          placeholder="Phone Number"
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleModalInputChange}
                          placeholder="Country"
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleModalInputChange}
                          placeholder="Organization"
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleModalInputChange}
                          className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors appearance-none"
                        >
                          <option value="" disabled className="text-slate-800">
                            Business Type
                          </option>
                          <option value="Enterprise" className="text-slate-800">
                            Enterprise
                          </option>
                          <option value="SMB" className="text-slate-800">
                            SMB
                          </option>
                          <option
                            value="ITAD/Recycler"
                            className="text-slate-800"
                          >
                            ITAD / Recycler
                          </option>
                          <option
                            value="Government/Public Sector"
                            className="text-slate-800"
                          >
                            Government / Public Sector
                          </option>
                          <option
                            value="Individual/Home"
                            className="text-slate-800"
                          >
                            Individual / Home
                          </option>
                          <option value="Other" className="text-slate-800">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleModalInputChange}
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full p-4 rounded-none bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-emerald-500 text-white font-bold py-4 rounded-none hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      </div>

      {/* Lightbox Modal with Gallery Navigation */}
      {selectedImageIndex !== null && (
        <div
          role="presentation"
          onKeyDown={() => {}}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            role="presentation"
            onKeyDown={() => {}}
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-none shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* Related Products — SEO internal linking */}
      {/* <ProductInternalLinks
        heading="Complete Your Data Security Workflow"
        links={[
          PRODUCT_LINKS["drive-verifier"],
          PRODUCT_LINKS["hardware-diagnostics"],
          PRODUCT_LINKS["file-eraser"],
          PRODUCT_LINKS["lun-eraser"],
          PRODUCT_LINKS["virtual-machine-eraser"],
          PRODUCT_LINKS["forensic-imaging"],
        ]}
      /> */}
    </>
  );
});

export default DriveEraserPage;
