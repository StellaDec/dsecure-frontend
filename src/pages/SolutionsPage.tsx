import Reveal from "@/components/Reveal";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { 
  Building, 
  Shield, 
  Heart, 
  DollarSign, 
  Globe, 
  Briefcase, 
  MessageCircle, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Server,
  Smartphone,
  Monitor,
  Cloud,
  Database,
  ShieldCheck,
  Activity,
  Clock,
  CheckCircle
} from "lucide-react";
import { 
  ThemeSection, 
  ThemeSectionHeading, 
  ThemeCard, 
  ThemeIconContainer, 
  themeClasses 
} from "@/components/ui/Theme";

export default function SolutionsPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHeadNative seo={getSEOForPage("solutions")} />

      {/* Breadcrumb Navigation — SEO ke liye */}
      <div className="container mx-auto px-4 pt-4 pb-1">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
          ]}
        />
      </div>

      <SolutionsPageContent />
    </>
  );
}

function SolutionsPageContent() {
  const { t } = useTranslation();
  type IndustryKey = keyof typeof solutions;
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>(
    "enterprise"
  );
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    {
      id: "overview",
      label: t("solutions.overview", { defaultValue: "Overview" }),
    },
    {
      id: "solutions",
      label: t("solutions.solutions", { defaultValue: "Solutions" }),
    },
    // { id: "case-studies", label: t('solutions.caseStudies', { defaultValue: "Case Studies" }) },
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, [t]);

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

  // Handle URL parameters to auto-select solutions
  useEffect(() => {
    const urlType = searchParams.get("type")?.toLowerCase();
    if (urlType) {
      if (urlType === "enterprise" || urlType.includes("business")) {
        setActiveIndustry("enterprise");
      } else if (urlType === "itad" || urlType.includes("asset")) {
        setActiveIndustry("itad");
      } else if (
        urlType === "healthcare" ||
        urlType.includes("medical") ||
        urlType.includes("hipaa")
      ) {
        setActiveIndustry("healthcare");
      } else if (
        urlType === "financial" ||
        urlType.includes("banking") ||
        urlType.includes("finance")
      ) {
        setActiveIndustry("financial");
      } else if (urlType === "government" || urlType.includes("public")) {
        setActiveIndustry("government");
      } else if (
        urlType === "service-providers" ||
        urlType.includes("provider")
      ) {
        setActiveIndustry("serviceProviders");
      }
    }
  }, [searchParams]);

  const solutions = {
    enterprise: {
      title: t("solutions.enterprise"),
      subtitle: t("solutions.enterpriseSubtitle"),
      description: t("solutions.enterpriseDesc"),
      icon: <Building className="w-8 h-8" />,
      benefits: [
        t("solutions.enterpriseBenefit1"),
        t("solutions.enterpriseBenefit2"),
        t("solutions.enterpriseBenefit3"),
        t("solutions.enterpriseBenefit4"),
        t("solutions.enterpriseBenefit5"),
        t("solutions.enterpriseBenefit6"),
      ],
      useCases: [
        {
          title: t("solutions.enterpriseUseCase1Title"),
          description: t("solutions.enterpriseUseCase1Desc"),
        },
        {
          title: t("solutions.enterpriseUseCase2Title"),
          description: t("solutions.enterpriseUseCase2Desc"),
        },
        {
          title: t("solutions.enterpriseUseCase3Title"),
          description: t("solutions.enterpriseUseCase3Desc"),
        },
        {
          title: t("solutions.enterpriseUseCase4Title"),
          description: t("solutions.enterpriseUseCase4Desc"),
        },
        {
          title: t("solutions.enterpriseUseCase5Title"),
          description: t("solutions.enterpriseUseCase5Desc"),
        },
        {
          title: t("solutions.enterpriseUseCase6Title"),
          description: t("solutions.enterpriseUseCase6Desc"),
        },
      ],
    },
    itad: {
      title: t("solutions.itad"),
      subtitle: t("solutions.itadSubtitle"),
      description: t("solutions.itadDesc"),
      icon: <Shield className="w-8 h-8" />,
      benefits: [
        t("solutions.itadBenefit1"),
        t("solutions.itadBenefit2"),
        t("solutions.itadBenefit3"),
        t("solutions.itadBenefit4"),
        t("solutions.itadBenefit5"),
        t("solutions.itadBenefit6"),
      ],
      useCases: [
        {
          title: t("solutions.itadUseCase1Title"),
          description: t("solutions.itadUseCase1Desc"),
        },
        {
          title: t("solutions.itadUseCase2Title"),
          description: t("solutions.itadUseCase2Desc"),
        },
        {
          title: t("solutions.itadUseCase3Title"),
          description: t("solutions.itadUseCase3Desc"),
        },
        {
          title: t("solutions.itadUseCase4Title"),
          description: t("solutions.itadUseCase4Desc"),
        },
        {
          title: t("solutions.itadUseCase5Title"),
          description: t("solutions.itadUseCase5Desc"),
        },
        {
          title: t("solutions.itadUseCase6Title"),
          description: t("solutions.itadUseCase6Desc"),
        },
      ],
    },
    healthcare: {
      title: t("solutions.healthcare"),
      subtitle: t("solutions.healthcareSubtitle"),
      description: t("solutions.healthcareDesc"),
      icon: <Heart className="w-8 h-8" />,
      benefits: [
        t("solutions.healthcareBenefit1"),
        t("solutions.healthcareBenefit2"),
        t("solutions.healthcareBenefit3"),
        t("solutions.healthcareBenefit4"),
      ],
      useCases: [
        {
          title: t("solutions.healthcareUseCase1Title"),
          description: t("solutions.healthcareUseCase1Desc"),
        },
        {
          title: t("solutions.healthcareUseCase2Title"),
          description: t("solutions.healthcareUseCase2Desc"),
        },
        {
          title: t("solutions.healthcareUseCase3Title"),
          description: t("solutions.healthcareUseCase3Desc"),
        },
        {
          title: t("solutions.healthcareUseCase4Title"),
          description: t("solutions.healthcareUseCase4Desc"),
        },
      ],
    },
    financial: {
      title: t("solutions.financial"),
      subtitle: t("solutions.financialSubtitle"),
      description: t("solutions.financialDesc"),
      icon: <DollarSign className="w-8 h-8" />,
      benefits: [
        t("solutions.financialBenefit1"),
        t("solutions.financialBenefit2"),
        t("solutions.financialBenefit3"),
        t("solutions.financialBenefit4"),
      ],
      useCases: [
        {
          title: t("solutions.financialUseCase1Title"),
          description: t("solutions.financialUseCase1Desc"),
        },
        {
          title: t("solutions.financialUseCase2Title"),
          description: t("solutions.financialUseCase2Desc"),
        },
        {
          title: t("solutions.financialUseCase3Title"),
          description: t("solutions.financialUseCase3Desc"),
        },
        {
          title: t("solutions.financialUseCase4Title"),
          description: t("solutions.financialUseCase4Desc"),
        },
      ],
    },
    government: {
      title: t("solutions.government"),
      subtitle: t("solutions.governmentSubtitle"),
      description: t("solutions.governmentDesc"),
      icon: <Globe className="w-8 h-8" />,
      benefits: [
        t("solutions.governmentBenefit1"),
        t("solutions.governmentBenefit2"),
        t("solutions.governmentBenefit3"),
        t("solutions.governmentBenefit4"),
        t("solutions.governmentBenefit5"),
        t("solutions.governmentBenefit6"),
        t("solutions.governmentBenefit7"),
      ],
      useCases: [
        {
          title: t("solutions.governmentUseCase1Title"),
          description: t("solutions.governmentUseCase1Desc"),
        },
        {
          title: t("solutions.governmentUseCase2Title"),
          description: t("solutions.governmentUseCase2Desc"),
        },
        {
          title: t("solutions.governmentUseCase3Title"),
          description: t("solutions.governmentUseCase3Desc"),
        },
        {
          title: t("solutions.governmentUseCase4Title"),
          description: t("solutions.governmentUseCase4Desc"),
        },
        {
          title: t("solutions.governmentUseCase5Title"),
          description: t("solutions.governmentUseCase5Desc"),
        },
        {
          title: t("solutions.governmentUseCase6Title"),
          description: t("solutions.governmentUseCase6Desc"),
        },
      ],
    },
    serviceProviders: {
      title: t("solutions.serviceProviders"),
      subtitle: t("solutions.serviceProvidersSubtitle"),
      description: t("solutions.serviceProvidersDesc"),
      icon: <Briefcase className="w-8 h-8" />,
      benefits: [
        t("solutions.serviceProvidersBenefit1"),
        t("solutions.serviceProvidersBenefit2"),
        t("solutions.serviceProvidersBenefit3"),
        t("solutions.serviceProvidersBenefit4"),
      ],
      useCases: [
        {
          title: t("solutions.serviceProvidersUseCase1Title"),
          description: t("solutions.serviceProvidersUseCase1Desc"),
        },
        {
          title: t("solutions.serviceProvidersUseCase2Title"),
          description: t("solutions.serviceProvidersUseCase2Desc"),
        },
        {
          title: t("solutions.serviceProvidersUseCase3Title"),
          description: t("solutions.serviceProvidersUseCase3Desc"),
        },
      ],
    },
  };

  const caseStudies = [
    {
      company: t("solutions.caseStudy1Company"),
      industry: t("solutions.caseStudy1Industry"),
      challenge: t("solutions.caseStudy1Challenge"),
      solution: t("solutions.caseStudy1Solution"),
      results: t("solutions.caseStudy1Results"),
      logoIcon: Heart,
    },
    {
      company: t("solutions.caseStudy2Company"),
      industry: t("solutions.caseStudy2Industry"),
      challenge: t("solutions.caseStudy2Challenge"),
      solution: t("solutions.caseStudy2Solution"),
      results: t("solutions.caseStudy2Results"),
      logoIcon: DollarSign,
    },
    {
      company: t("solutions.caseStudy3Company"),
      industry: t("solutions.caseStudy3Industry"),
      challenge: t("solutions.caseStudy3Challenge"),
      solution: t("solutions.caseStudy3Solution"),
      results: t("solutions.caseStudy3Results"),
      logoIcon: CheckCircle,
    },
  ];

  // Helper function to get the sub-page link for each industry
  const getIndustryLink = (industry: IndustryKey): string => {
    switch (industry) {
      case "enterprise":
        return "/solutions/enterprise";
      case "healthcare":
        return "/solutions/healthcare";
      case "financial":
        return "/solutions/data-erasure-banking-finance";
      case "itad":
        return "/solutions/itad";
      case "government":
        return "/solutions/government";
      default:
        return "/solutions/service-providers"; // For industries without dedicated sub-pages yet
    }
  };

  return (
    <>
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

      {/* Hero Section */}
      <section id="overview" className="relative overflow-hidden bg-white">
        <div className="container-responsive relative py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 xxl:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("solutions.heroTag")}
                </div>
              </Reveal>
              <Reveal delayMs={10}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                  {t("solutions.heroTitle")}{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {t("solutions.heroTitleHighlight")}
                  </span>
                </h1>
              </Reveal>
              <Reveal delayMs={20}>
                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                  {t("solutions.heroSubtitle")}
                </p>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                  <Link
                    to="/contact"
                    className={`${themeClasses.button.base} ${themeClasses.button.primary} group`}
                  >
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t("solutions.discussNeeds")}
                  </Link>
                  <button
                    onClick={() => scrollToSection("solutions")}
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} group`}
                  >
                    <ArrowDown className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                    {t("solutions.exploreSolutions")}
                  </button>
                </div>
              </Reveal>
              <Reveal delayMs={40}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{t("solutions.industriesServed")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{t("solutions.complianceRate")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{t("solutions.expertSupport")}</span>
                  </div>
                </div>
              </Reveal>
            </div>
            {/* Right Content - Visual Elements */}
            <div className="relative">
              <Reveal delayMs={50}>
                <div className="relative mx-auto max-w-lg">
                  {/* Main Image Container */}
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
                    {/* Data Security Illustration */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Central Server/Database Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="w-20 h-20 bg-[#0e7c66] rounded-full flex items-center justify-center shadow-lg">
                            <Server className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        {/* Surrounding Device Icons - Positioned in a circle */}
                        {/* Top Left - Mobile Device */}
                        <div className="absolute top-6 left-12 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                            <Smartphone className="w-6 h-6 text-[#0e7c66]" />
                          </div>
                        </div>
                        {/* Top Right - Desktop Computer */}
                        <div className="absolute top-6 right-12 transform translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                            <Monitor className="w-6 h-6 text-[#0e7c66]" />
                          </div>
                        </div>
                        {/* Bottom Left - Cloud Storage */}
                        <div className="absolute bottom-6 left-12 transform -translate-x-1/2 translate-y-1/2">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                            <Cloud className="w-6 h-6 text-[#0e7c66]" />
                          </div>
                        </div>
                        {/* Bottom Right - Database */}
                        <div className="absolute bottom-6 right-12 transform translate-x-1/2 translate-y-1/2">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                            <Database className="w-6 h-6 text-[#0e7c66]" />
                          </div>
                        </div>
                        {/* Security Shield Overlay */}
                        <div className="absolute top-2 right-2">
                          <div className="w-8 h-8 bg-[#0a2e1e] rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-[#6ee7b7]" />
                          </div>
                        </div>
                        {/* Connection Lines */}
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 300 240"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#10b981"
                                stopOpacity="0.4"
                              />
                              <stop
                                offset="100%"
                                stopColor="#06b6d4"
                                stopOpacity="0.4"
                              />
                            </linearGradient>
                          </defs>
                          {/* Top Left to Center */}
                          <path
                            d="M 48 48 L 140 110"
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="4,4"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;8"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </path>
                          {/* Top Right to Center */}
                          <path
                            d="M 252 48 L 160 110"
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="4,4"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;8"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </path>
                          {/* Bottom Left to Center */}
                          <path
                            d="M 48 192 L 140 130"
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="4,4"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;8"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                          </path>
                          {/* Bottom Right to Center */}
                          <path
                            d="M 252 192 L 160 130"
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="4,4"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;8"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    </div>
                    {/* Bottom Info Bar */}
                    <div className="p-6 bg-white/90 backdrop-blur-sm">
                      <div className="text-center">
                        <h2 className="text-lg font-semibold text-slate-900 mb-2">
                          Secure Data Ecosystem
                        </h2>
                        <p className="text-slate-600 text-sm">
                          Complete erasure across all device types and platforms
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Floating Stats Cards */}
                  <Reveal delayMs={70}>
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-none shadow-lg border border-[#d0d5dc]/60">
                      <div className="text-2xl font-bold">10k+</div>
                      <div className="text-xs opacity-90">Devices Secured</div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={80}>
                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white p-4 rounded-none shadow-lg border border-[#d0d5dc]/60">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-xs opacity-90">Success Rate</div>
                    </div>
                  </Reveal>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <ThemeSection
        alternate
        id="solutions"
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container-responsive">
          <ThemeSectionHeading
            subtitle="Choose your industry to see specialized workflows and compliance features."
            centered
          >
            Solutions by Industry
          </ThemeSectionHeading>
          {/* Industry Selector (Tab Format) */}
          <div className="max-w-6xl mx-auto">
            <div className="border-b border-[#d0d5dc]/80 mb-10 overflow-x-auto">
              <div className="flex space-x-6 sm:space-x-10 min-w-max px-2 justify-center">
                {Object.entries(solutions).map(([key, solution]) => {
                  const isActive = activeIndustry === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveIndustry(key as IndustryKey)}
                      className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap flex items-center gap-2 ${
                        isActive
                          ? "border-[#0e7c66] text-[#0e7c66]"
                          : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                      }`}
                    >
                      <span className="w-5 h-5 flex items-center justify-center">
                        {solution.icon}
                      </span>
                      {solution.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Active Solution Details */}
          <Reveal key={activeIndustry}>
            <div className="bg-white rounded-none shadow-xl border border-[#d0d5dc]/60 overflow-hidden">
              {/* Solution Header */}
              <div className="text-center p-4 md:p-6 border-b border-slate-200/60 bg-slate-50/50">
                <div className="text-sm text-slate-500 mb-1">Solution</div>
                <div className="text-lg font-semibold text-slate-900">
                  {solutions[activeIndustry].title}
                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Solution Overview */}
                <div className="xl:col-span-2 p-6 md:p-8 lg:p-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 lg:w-18 lg:h-18 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full text-white mb-4 lg:mb-6 shadow-lg">
                    <span className="text-2xl lg:text-3xl leading-none flex items-center justify-center">
                      {solutions[activeIndustry].icon}
                    </span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                    {solutions[activeIndustry].title}
                  </h2>
                  <p className="text-base lg:text-lg text-emerald-800 font-medium mb-4">
                    {solutions[activeIndustry].subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6 lg:mb-8">
                    {solutions[activeIndustry].description}
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">
                        {t("solutions.keyBenefits")}
                      </h3>
                      <div className="space-y-3">
                        {solutions[activeIndustry].benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-center gap-3 group/benefit"
                          >
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                              <Check className="w-5 h-5 text-[#0e7c66] group-hover/benefit:scale-110 transition-transform" />
                            </div>
                            <span className="text-slate-700 text-sm leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">
                        {t("solutions.useCases")}
                      </h3>
                      <div className="space-y-3">
                        {solutions[activeIndustry].useCases.map((useCase) => (
                          <div
                            key={useCase.title}
                            className="border border-[#d0d5dc]/60 rounded-none p-3 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
                          >
                            <div className="font-medium text-slate-900 text-sm">
                              {useCase.title}
                            </div>
                            <div className="text-slate-600 text-xs mt-1">
                              {useCase.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {(activeIndustry === "enterprise" ||
                      activeIndustry === "healthcare" ||
                      activeIndustry === "government" ||
                      activeIndustry === "itad" ||
                      activeIndustry === "serviceProviders" ||
                      activeIndustry === "financial") && (
                      <Link
                        to={getIndustryLink(activeIndustry)}
                        className={`${themeClasses.button.base} ${themeClasses.button.primary}`}
                      >
                        Learn More About {solutions[activeIndustry].title}
                      </Link>
                    )}

                    <Link
                      to="/contact"
                      className={`${themeClasses.button.base} ${themeClasses.button.outline}`}
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="bg-slate-50 p-8">
                  <h3 className="font-semibold text-slate-900 mb-6">
                    Why Choose D-Secure?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <ThemeIconContainer icon={Activity} size="md" />
                      <div>
                        <div className="font-medium text-slate-900 text-sm">
                          Proven Track Record
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          under decade serving enterprises worldwide
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ThemeIconContainer icon={Clock} size="md" />
                      <div>
                        <div className="font-medium text-slate-900 text-sm">
                          Lightning Fast
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          Process thousands of devices daily
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ThemeIconContainer icon={Heart} size="md" />
                      <div>
                        <div className="font-medium text-slate-900 text-sm">
                          24/7 Support
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          Expert technical support around the clock
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ThemeIconContainer icon={CheckCircle} size="md" />
                      <div>
                        <div className="font-medium text-slate-900 text-sm">
                          100% Compliant
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          Meet all regulatory requirements
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        10k+
                      </div>
                      <div className="text-sm text-slate-600">
                        Devices Processed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Navigation Footer */}
              <div className="flex items-center justify-between p-4 md:p-6 border-t border-slate-200/60 bg-slate-50/50">
                <button
                  onClick={() => {
                    const industries = Object.keys(solutions) as IndustryKey[];
                    const currentIndex = industries.indexOf(activeIndustry);
                    const prevIndex =
                      currentIndex === 0
                        ? industries.length - 1
                        : currentIndex - 1;
                    setActiveIndustry(industries[prevIndex]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[#0e7c66] transition-colors rounded-none hover:bg-white/80"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Previous Solution</span>
                </button>
                <div className="text-center">
                  <div className="text-xs text-slate-400">
                    {Object.keys(solutions).indexOf(activeIndustry) + 1} of{" "}
                    {Object.keys(solutions).length}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const industries = Object.keys(solutions) as IndustryKey[];
                    const currentIndex = industries.indexOf(activeIndustry);
                    const nextIndex =
                      currentIndex === industries.length - 1
                        ? 0
                        : currentIndex + 1;
                    setActiveIndustry(industries[nextIndex]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[#0e7c66] transition-colors rounded-none hover:bg-white/80"
                >
                  <span className="text-sm font-medium">Next Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </ThemeSection>

      {/* Case Studies — EMOJIS REPLACED */}
      {/* Case Studies */}
      <ThemeSection id="case-studies" className="py-16 md:py-24">
        <div className="container-responsive">
          <ThemeSectionHeading subtitle="See how organizations across industries have transformed their data erasure processes with D-Secure." centered>Case Studies</ThemeSectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((study) => (
              <Reveal key={study.company} delayMs={100} className="h-full">
                <ThemeCard className="h-full flex flex-col group/card hover:shadow-xl hover:-translate-y-1">
                  <div className="mb-6 flex justify-center transform group-hover/card:scale-110 transition-transform duration-300">
                    <ThemeIconContainer icon={study.logoIcon} size="lg" />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h2 className="font-bold text-slate-900 text-lg mb-2 text-center">
                      {study.company}
                    </h2>
                    <div className="text-sm text-brand font-semibold mb-6 text-center uppercase tracking-wider">
                      {study.industry}
                    </div>
                    <div className="space-y-5 text-sm">
                      <div className="bg-[#f4fbf8] p-3 rounded-none border border-[#d0d5dc]/60">
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0e7c66]"></span>
                          {t('solutions.challenge')}:
                        </div>
                        <div className="text-slate-600 leading-relaxed italic">"{study.challenge}"</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 mb-1">
                          {t('solutions.solution')}:
                        </div>
                        <div className="text-slate-600 leading-relaxed">{study.solution}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="font-bold text-slate-900 mb-1 uppercase text-xs tracking-widest opacity-50">
                      {t('solutions.results')}:
                    </div>
                    <div className="text-[#0e7c66] font-bold text-base bg-[#d4ede4] px-3 py-2 rounded-none inline-block w-full text-center">
                      {study.results}
                    </div>
                  </div>
                </ThemeCard>
              </Reveal>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <Reveal>
            <div className="bg-[#0a2e1e] rounded-none p-8 border border-[#d0d5dc]/60 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Data Erasure Process?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let's discuss your specific requirements and design a solution
                that fits your industry and compliance needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className={`${themeClasses.button.base} bg-white text-[#0e7c66] hover:bg-slate-50 border-2 border-white`}
                >
                  Schedule Consultation
                </Link>
                <Link
                  to="/resources"
                  className={`${themeClasses.button.base} border-2 border-white text-white hover:bg-white/10`}
                >
                  Download Resources
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
