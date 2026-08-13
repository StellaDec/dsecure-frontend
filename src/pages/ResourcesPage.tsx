import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import { useState, useEffect } from "react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { Link, useSearchParams } from "react-router-dom";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { ShieldCheck, Building2, Recycle, Terminal, Briefcase, FileText, BookOpen, BarChart, Wrench, FileEdit, BookMarked, ArrowRight, Newspaper, File, HardDrive, Database, Search, Grid } from "lucide-react";

export default function ResourcesPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHeadNative seo={getSEOForPage("resources")} />
      <ResourcesPageContent />
    </>
  );
}

function ResourcesPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();

  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "featured", label: "Featured" },
    { id: "all-articles", label: "All Articles" },
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  // Handle URL parameters to auto-select category
  useEffect(() => {
    const urlType = searchParams.get("type")?.toLowerCase();
    if (urlType) {
      if (urlType === "documentation" || urlType === "docs") {
        setActiveCategory("technical");
      } else if (urlType === "case-studies" || urlType === "cases") {
        setActiveCategory("enterprise");
      } else if (urlType === "compliance") {
        setActiveCategory("compliance");
      } else if (urlType === "whitepapers" || urlType === "papers") {
        setActiveCategory("whitepaper");
      } else if (urlType === "guides") {
        setActiveCategory("itad");
      }
    }
  }, [searchParams]);

  // Helper: Theme Icon Containers for Resources & Blogs
  const getIcon = (item: any) => {
    if (typeof item === "object" && item?.icon) {
      const IconComp = item.icon;
      return <ThemeIconContainer icon={IconComp} />;
    }
    const type = typeof item === "string" ? item : item?.category;
    switch (type) {
      case "compliance": return <ThemeIconContainer icon={ShieldCheck} />;
      case "enterprise": return <ThemeIconContainer icon={Building2} />;
      case "itad": return <ThemeIconContainer icon={Recycle} />;
      case "technical": return <ThemeIconContainer icon={Terminal} />;
      case "business": return <ThemeIconContainer icon={Briefcase} />;
      case "whitepaper": return <ThemeIconContainer icon={FileText} />;
      case "case-study": return <ThemeIconContainer icon={BookOpen} />;
      case "report": return <ThemeIconContainer icon={BarChart} />;
      case "tool": return <ThemeIconContainer icon={Wrench} />;
      case "blog": return <ThemeIconContainer icon={Newspaper} />;
      default: return <ThemeIconContainer icon={BookMarked} />;
    }
  };

  const resources = [
    {
      id: 1,
      title: "NIST 800-88 Compliance Guide",
      type: "whitepaper",
      category: "compliance",
      description:
        "Comprehensive guide to implementing NIST 800-88 Rev. 1 standards with D-Secure solutions.",
      downloadSize: "2.4 MB",
      pages: 28,
      featured: true,
      referenceUrl:
        "https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final",
    },
    {
      id: 2,
      title: "Enterprise Data Sanitization Case Study",
      type: "case-study",
      category: "enterprise",
      description:
        "How a leading technology enterprise reduced IT refresh cycle time by 60% while maintaining 100% compliance.",
      downloadSize: "1.8 MB",
      pages: 12,
      featured: true,
      referenceUrl: "https://www.sans.org/white-papers/1907/",
    },
    {
      id: 4,
      title: "HIPAA Compliance in Healthcare",
      type: "whitepaper",
      category: "compliance",
      description:
        "Best practices for healthcare organizations to maintain HIPAA compliance during device disposal.",
      downloadSize: "2.1 MB",
      pages: 22,
      featured: false,
      referenceUrl:
        "https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity/index.html",
    },
    {
      id: 5,
      title: "ITAD Workflow Optimization",
      type: "guide",
      category: "itad",
      description:
        "Step-by-step guide to optimizing IT Asset Disposition workflows for maximum efficiency.",
      downloadSize: "1.9 MB",
      pages: 18,
      featured: false,
      referenceUrl: "https://www.itassetmanagement.net/best-practices/",
    },
    {
      id: 6,
      title: "Cloud Data Erasure Best Practices",
      type: "whitepaper",
      category: "technical",
      description:
        "Advanced techniques for secure data sanitization in multi-cloud environments.",
      downloadSize: "2.7 MB",
      pages: 31,
      featured: true,
      referenceUrl:
        "https://aws.amazon.com/blogs/security/how-to-securely-destroy-data-stored-on-aws/",
    },
    {
      id: 7,
      title: "Financial Services Compliance Report",
      type: "report",
      category: "compliance",
      description:
        "Industry analysis of data protection requirements for financial institutions.",
      downloadSize: "1.5 MB",
      pages: 15,
      featured: false,
      referenceUrl:
        "https://www.finra.org/rules-guidance/guidance/reports/2022-report-examination-findings",
    },
    {
      id: 8,
      title: "ROI Calculator & Business Case",
      type: "tool",
      category: "business",
      description:
        "Interactive tool to calculate ROI and build business case for data sanitization projects.",
      downloadSize: "0.8 MB",
      pages: 8,
      featured: false,
      referenceUrl:
        "https://www.gartner.com/en/information-technology/insights/it-asset-disposition",
    },
    {
      id: 9,
      title: "Security Architecture Whitepaper",
      type: "whitepaper",
      category: "technical",
      description:
        "Deep dive into D-Secure's security architecture and cryptographic implementations.",
      downloadSize: "3.5 MB",
      pages: 38,
      featured: false,
      referenceUrl:
        "https://owasp.org/www-project-application-security-architecture/",
    },
    {
      id: 99,
      title: "D-Secure Company Profile",
      type: "whitepaper",
      category: "business",
      description:
        "Comprehensive overview of D-Secure Technologies, our mission, vision, and enterprise data erasure solutions.",
      downloadSize: "1.2 MB",
      pages: 15,
      featured: true,
      referenceUrl:
        "https://assets.dsecuretech.com/pdf/D-Secure%20Technologies%20Pvt.%20Ltd..pdf",
    },
    // Blog Posts & Product User Manual Guides
    {
      id: 10,
      title: "D-Secure File Eraser Manual",
      type: "blog",
      category: "blog",
      icon: File,
      description:
        "Complete user manual for D-Secure File Eraser. Installation, configuration, and operational instructions for secure file deletion.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/support/help-manual/complete-manual",
      author: "D-Secure Editorial Team",
      date: "October 15, 2024"
    },
    {
      id: 11,
      title: "Securely Erasing SSDs & NVMe Drives",
      type: "blog",
      category: "blog",
      icon: HardDrive,
      description:
        "Why traditional wiping methods fail on SSDs. Exploring command-based erasure, cryptographic sanitization, and handling wear leveling.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/blog/ssd-wipe-guide",
      author: "Nitish",
      date: "October 22, 2024"
    },
    {
      id: 12,
      title: "Erasure vs. Physical Destruction: ROI Analysis",
      type: "blog",
      category: "blog",
      icon: Newspaper,
      description:
        "Analysis of value retention: how secure erasure enables asset remarketing and ESG compliance, avoiding the total loss seen with physical destruction.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/blog/physical-destruction-vs-data-wiping",
      author: "D-Secure Editorial Team",
      date: "November 5, 2024"
    },
    {
      id: 13,
      title: "Debunking 5 Critical Data Deletion Myths",
      type: "blog",
      category: "blog",
      icon: Newspaper,
      description:
        "Formatting is not erasure. We expose common misconceptions that leave organizations vulnerable to data breaches and regulatory fines.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/data-erasure-myths",
      author: "Nitish",
      date: "November 12, 2024"
    },
    {
      id: 14,
      title: "Navigating Global Data Compliance Standards",
      type: "blog",
      category: "blog",
      icon: ShieldCheck,
      description:
        "Essential guide to matching your sanitization protocols with GDPR, HIPAA, SOX, and ISO/IEC 27001 requirements for audit-proof security.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/data-sanitization-compliance",
      author: "Nitish",
      date: "November 19, 2024"
    },
    {
      id: 15,
      title: "Best Data Erasure Method for Any Storage Media Type",
      type: "blog",
      category: "blog",
      icon: Database,
      description:
        "One size does not fit all. Learn the correct erasure standard for HDDs, SSDs, and Mobile devices to ensure compliance.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/erasure-best-practices",
      author: "D-Secure Editorial Team",
      date: "December 03, 2024"
    },
  ];

  const categories = [
    { id: "all", name: "All Blog Articles", count: resources.filter((r) => r.type === "blog").length },
    {
      id: "blog",
      name: "Blog Articles",
      count: resources.filter((r) => r.category === "blog").length,
    },
  ];

  // Enhanced search functionality for entire page content
  const pageContentKeywords = [
    "knowledge center",
    "resources",
    "comprehensive guides",
    "whitepapers",
    "case studies",
    "webinars",
    "technical documentation",
    "data sanitization",
    "compliance",
    "security",
    "enterprise",
    "business intelligence",
    "ITAD",
    "asset management",
    "featured resources",
    "resource library",
    "documentation hub",
    "implementation stories",
    "best practices",
    "industry trends",
    "market analysis",
    "audit guides",
    "API documentation",
    "developer resources",
    "success metrics",
    "ROI analysis",
    "deployment strategies",
  ];

  // Check if search term matches page content
  const searchMatchesPageContent = (searchTerm: string) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      pageContentKeywords.some((keyword) => keyword.includes(term)) ||
      term === "all" ||
      term === "everything" ||
      term === "content"
    );
  };

  // Enhanced resource filtering - only show blogs
  const filteredResources = resources.filter((resource) => {
    const isBlogs = resource.type === "blog";
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.referenceUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchMatchesPageContent(searchTerm);
    return isBlogs && matchesCategory && matchesSearch;
  });

  // Filter featured resources based on search - only show blogs
  const featuredResources = resources.filter((r) => r.featured && r.type === "blog");
  const filteredFeaturedResources = featuredResources.filter((resource) => {
    if (searchTerm === "") return true;
    const term = searchTerm.toLowerCase();
    return (
      resource.title.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term) ||
      resource.category.toLowerCase().includes(term) ||
      resource.type.toLowerCase().includes(term) ||
      searchMatchesPageContent(searchTerm)
    );
  });

  // Show/hide sections based on search relevance
  const shouldShowSection = (sectionType: string) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    switch (sectionType) {
      case "categories":
        return (
          term.includes("categor") ||
          term.includes("browse") ||
          term.includes("compliance") ||
          term.includes("technical") ||
          term.includes("enterprise") ||
          term.includes("business") ||
          term.includes("itad") ||
          searchMatchesPageContent(searchTerm)
        );

      case "featured":
        return (
          term.includes("featured") ||
          term.includes("popular") ||
          term.includes("comprehensive") ||
          filteredFeaturedResources.length > 0 ||
          searchMatchesPageContent(searchTerm)
        );

      case "resources":
        return (
          filteredResources.length > 0 || searchMatchesPageContent(searchTerm)
        );

      default:
        return searchMatchesPageContent(searchTerm);
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
      <ThemeSection id="overview" className="bg-white" noBg>
        <div className="container-responsive py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 xxl:py-18">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Data Security Blog & Insights Hub
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Explore our latest insights, expert perspectives, and industry
                trends through our comprehensive blog articles. Stay updated with
                data security best practices and emerging technologies.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resources, webinars, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection>

      {/* Resource Categories */}
      {shouldShowSection("categories") && (
        <ThemeSection id="categories" className="relative overflow-hidden" alternate>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-teal-50/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="container-responsive relative z-10">
            <div className="text-center mb-16">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Grid className="w-4 h-4" />
                  Resource Categories
                </div>
                <ThemeSectionHeading centered>
                  Comprehensive Knowledge{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                    Resource Library
                  </span>
                </ThemeSectionHeading>
              </Reveal>
              <Reveal delayMs={10}>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Access our expertly curated collection of resources, designed
                  to help you navigate data security challenges with confidence
                  and expertise.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delayMs={10}>
                <Link to="/resources/documentation" className="block h-full">
                  <ThemeCard className="group p-8 flex flex-col hover:-translate-y-2 relative overflow-hidden h-full">
                    <div className="flex items-center justify-between mb-4">
                      <ThemeIconContainer icon={BookOpen} size="lg" />
                    </div>
                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                        Technical Documentation
                      </h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                        Comprehensive user guides, implementation documentation,
                        and quick-start resources for administrators.
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-teal-600 text-sm font-semibold group-hover:text-teal-700 transition-colors">
                          Explore Documentation
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                        <div className="text-xs text-slate-400 font-medium relative z-10">
                          15+ Guides
                        </div>
                      </div>
                    </div>
                  </ThemeCard>
                </Link>
              </Reveal>
              <Reveal delayMs={15}>
                <Link to="/blog" className="block h-full">
                  <ThemeCard className="group p-8 flex flex-col hover:-translate-y-2 relative overflow-hidden h-full">
                    <div className="flex items-center justify-between mb-4">
                      <ThemeIconContainer icon={Newspaper} size="lg" />
                    </div>
                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                        Industry Insights & Blog
                      </h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                        Stay updated with the latest trends, expert insights, and
                        best practices in data sanitization and security.
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-teal-600 text-sm font-semibold group-hover:text-teal-700 transition-colors">
                          Read Latest Articles
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                        <div className="text-xs text-slate-400 font-medium relative z-10">
                          Weekly Updates
                        </div>
                      </div>
                    </div>
                  </ThemeCard>
                </Link>
              </Reveal>
              <Reveal delayMs={20}>
                <Link to="/international-laws-and-regulations" className="block h-full">
                  <ThemeCard className="group p-8 flex flex-col hover:-translate-y-2 relative overflow-hidden h-full">
                    <div className="flex items-center justify-between mb-4">
                      <ThemeIconContainer icon={ShieldCheck} size="lg" />
                    </div>
                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                        International Data Privacy Laws
                      </h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                        Comprehensive overview of global data protection laws, including GDPR, HIPAA, and regional privacy regulations.
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-teal-600 text-sm font-semibold group-hover:text-teal-700 transition-colors">
                          Explore Laws
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                        <div className="text-xs text-slate-400 font-medium relative z-10">
                          27+ Laws
                        </div>
                      </div>
                    </div>
                  </ThemeCard>
                </Link>
              </Reveal>
            </div>
            {/* <Reveal delayMs={50}>
              <div className="mt-16 pt-12 border-t border-slate-200/60">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">
                      500+
                    </div>
                    <div className="text-sm text-slate-600">
                      Total Resources
                    </div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-emerald-800 mb-2 group-hover:scale-110 transition-transform">
                      50k+
                    </div>
                    <div className="text-sm text-slate-600">Downloads</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                      98%
                    </div>
                    <div className="text-sm text-slate-600">
                      Satisfaction Rate
                    </div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                      24/7
                    </div>
                    <div className="text-sm text-slate-600">
                      Access Available
                    </div>
                  </div>
                </div>
              </div>
            </Reveal> */}
          </div>
        </ThemeSection>
      )}

      {/* Featured Resources */}
      {shouldShowSection("featured") && (
        <ThemeSection id="featured">
          <div className="container-responsive">
            <ThemeSectionHeading centered subtitle="Our most popular and insightful blog articles to keep you informed.">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Blog Articles</span>
              </ThemeSectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredFeaturedResources.map((resource, i) => (
                <Reveal key={resource.id} delayMs={i * 100}>
                  <Link to={resource.referenceUrl} className="block h-full">
                    <ThemeCard className="group h-full flex flex-col hover:-translate-y-1 relative">
                      <div className="p-6 flex-1 flex flex-col relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div>{getIcon(resource)}</div>
                          <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                          {resource.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 flex-grow">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <span>{resource.pages}</span>
                          <span className="capitalize">{resource.type}</span>
                        </div>
                        <div className="mt-auto">
                          <div className="block w-full">
                            <ThemeButton className="w-full text-sm inline-flex items-center justify-center rounded-none relative z-20 pointer-events-none">
                              <BookOpen className="w-4 h-4 mr-1" />
                              Read Article
                            </ThemeButton>
                          </div>
                        </div>
                      </div>
                    </ThemeCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>
      )}

      {/* All Resources */}
      {shouldShowSection("resources") && (
        <ThemeSection id="all-articles" alternate>
          <div className="container-responsive">
            <ThemeSectionHeading centered subtitle="Browse our complete library of blog articles and insights.">
                All <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Blog Articles</span>
              </ThemeSectionHeading>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {category.name}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === category.id
                        ? "bg-teal-400 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, i) => (
                <Reveal key={resource.id} delayMs={i * 50}>
                  <Link to={resource.referenceUrl} className="block h-full">
                    <ThemeCard className="group p-6 h-full flex flex-col hover:-translate-y-1 relative">
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div>{getIcon(resource)}</div>
                        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {resource.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-sm group-hover:text-teal-600 transition-colors duration-300 relative z-10">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-xs mb-4 leading-relaxed flex-grow relative z-10">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 relative z-10">
                        <span>{resource.pages}</span>
                      </div>
                      <div className="mt-auto relative z-10">
                        <div className="block w-full">
                          <ThemeButton className="w-full text-xs inline-flex items-center justify-center rounded-none relative z-20 pointer-events-none">
                            <BookOpen className="w-3 h-3 mr-1" />
                            Read Article
                          </ThemeButton>
                        </div>
                      </div>
                    </ThemeCard>
                  </Link>
                </Reveal>
              ))}
            </div>
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 text-slate-400 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No resources found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </ThemeSection>
      )}
      
    </>
  );
}
