import React, { useState, useEffect, useRef, useMemo } from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { Shield as ShieldIcon, Server as ServerIcon, Globe as GlobeIcon, Clipboard as ClipboardIcon, Database as DatabaseIcon, Smartphone as MobileIcon, Zap as LightningIcon, ArrowRight as ArrowRightIcon, Check as CheckIcon, Briefcase as BriefcaseIcon, DollarSign as DollarIcon, Star as StarIcon, Layers as LayersIcon, Cpu as CpuIcon, Scale as ScaleIcon, FileText as FileTextIcon, BookOpen as BookOpenIcon, AlertTriangle as AlertTriangleIcon, Laptop as LaptopIcon, HardDrive as HardDriveIcon, Activity as ActivityIcon, Building2 as BuildingIcon, Heart as HeartIcon, Search as SearchIcon, Loader2 as Loader2Icon } from "lucide-react";
import { ThemeSection, ThemeSectionHeading, ThemeIconContainer, themeClasses } from "@/components/ui/Theme";

const blogs = blogPosts;

// Category configuration (Tag styles mapped to Theme standard flat colors)
// Blog tag ke hisaab se relevant icon mapping
const categoryConfig: Record<string, { icon: React.ElementType }> = {
  "Data Erasure": { icon: HardDriveIcon },
  "Storage Security": { icon: ServerIcon },
  "Technical": { icon: CpuIcon },
  "Core Erasure": { icon: HardDriveIcon },
  "Best Practices": { icon: CheckIcon },
  "Automation": { icon: LightningIcon },
  "Mobile Security": { icon: MobileIcon },
  "Zero Trust": { icon: ShieldIcon },
  "Security Awareness": { icon: ShieldIcon },
  "Strategic Compliance": { icon: ClipboardIcon },
  "Regulatory Frameworks": { icon: ClipboardIcon },
  "Finance": { icon: DollarIcon },
  "Privacy": { icon: ShieldIcon },
  "MSP Growth": { icon: BriefcaseIcon },
  "MSP": { icon: BriefcaseIcon },
  "ITAM": { icon: DatabaseIcon },
  "Procurement": { icon: ClipboardIcon },
  "Brand": { icon: StarIcon },
  "Refurbishing": { icon: ActivityIcon },
  "GovTech": { icon: BuildingIcon },
  "ESG": { icon: GlobeIcon },
  "Circular Economy": { icon: GlobeIcon },
  "Green Tech": { icon: GlobeIcon },
  "Scope 3": { icon: GlobeIcon },
  "Risk Mgmt": { icon: AlertTriangleIcon },
  "Dark Data": { icon: DatabaseIcon },
  // Blog-specific tags jo featured articles mein aate hain
  "Integration": { icon: LayersIcon },
  "Decommissioning": { icon: ServerIcon },
  "Comparison": { icon: ScaleIcon },
  "Standards": { icon: FileTextIcon },
  "Compliance": { icon: ClipboardIcon },
  "Case Study": { icon: BookOpenIcon },
  "Education": { icon: BookOpenIcon },
  "Security": { icon: ShieldIcon },
  "Product": { icon: LightningIcon },
  "Risk Management": { icon: AlertTriangleIcon },
  "Enterprise": { icon: BuildingIcon },
  "DR/BC": { icon: ActivityIcon },
  "Government": { icon: BuildingIcon },
  "Healthcare": { icon: HeartIcon },
  "Mac": { icon: LaptopIcon },
  "Mobile": { icon: MobileIcon },
  "Financial": { icon: DollarIcon },
  "ITAD": { icon: ServerIcon },
};

const getTagConfig = (tag: string) => {
  return categoryConfig[tag] || { icon: ShieldIcon };
};

// Reading time calculate karna (Hindi comment added as per rules)
const getReadTime = (excerpt: string) => {
  const wordsPerMinute = 200;
  const wordCount = excerpt.split(/\s+/).length * 8;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Featured category cards
const featuredCategories = [
  { 
    icon: ServerIcon, 
    title: "Technical Guides", 
    description: "In-depth erasure methods, SSD wiping, and storage sanitization techniques",
    filterFn: (b: typeof blogs[0]) => ["Data Erasure", "Storage Security", "Technical", "Core Erasure", "Automation"].includes(b.tag)
  },
  { 
    icon: ClipboardIcon, 
    title: "Compliance & Regulatory", 
    description: "NIST 800-88, GDPR, SEC, HIPAA compliance insights and requirements",
    filterFn: (b: typeof blogs[0]) => ["Strategic Compliance", "Regulatory Frameworks", "Finance", "Privacy", "Best Practices"].includes(b.tag)
  },
  { 
    icon: GlobeIcon, 
    title: "Sustainability & ESG", 
    description: "Carbon footprint reduction, circular economy, and green IT practices",
    filterFn: (b: typeof blogs[0]) => ["ESG", "Circular Economy", "Green Tech", "Scope 3"].includes(b.tag)
  },
  { 
    icon: BriefcaseIcon, 
    title: "MSP & Enterprise", 
    description: "Managed services, enterprise security, and large-scale operations",
    filterFn: (b: typeof blogs[0]) => ["MSP Growth", "MSP", "ITAM", "Procurement", "Refurbishing", "Brand"].includes(b.tag)
  },
];

// Tabs setup
const filterTabs = [
  { label: "All", tags: [] as string[] },
  { label: "Technical", tags: ["Data Erasure", "Storage Security", "Technical", "Core Erasure", "Automation"] },
  { label: "Compliance", tags: ["Strategic Compliance", "Regulatory Frameworks", "Finance", "Privacy", "Best Practices"] },
  { label: "Sustainability", tags: ["ESG", "Circular Economy", "Green Tech", "Scope 3"] },
  { label: "Security", tags: ["Mobile Security", "Zero Trust", "Security Awareness", "Risk Mgmt", "Dark Data"] },
  { label: "Business", tags: ["MSP Growth", "MSP", "ITAM", "Procurement", "Refurbishing", "Brand", "GovTech"] },
];

const BlogPage: React.FC = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);

  const activeFilterConfig = filterTabs.find(f => f.label === activeFilter);

  // Blogs ko filter karna based on active tab and search query
  const filteredBlogs = useMemo(() => {
    let result = blogs;
    
    if (activeFilter !== "All" && activeFilterConfig?.tags.length) {
      result = result.filter(b => activeFilterConfig.tags.includes(b.tag));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.excerpt.toLowerCase().includes(query) ||
        b.tag.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.keywords.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeFilter, activeFilterConfig, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleBlogs < filteredBlogs.length && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleBlogs((prev) => Math.min(prev + 6, filteredBlogs.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleBlogs, isLoading, filteredBlogs.length]);

  useEffect(() => {
    setVisibleBlogs(9);
  }, [activeFilter, searchQuery]);

  const featuredBlogs = blogs.slice(0, 3);



  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("blog")} />
      
      {/* Hero Section */}
      <ThemeSection>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className={themeClasses.typography.sectionHeading}>
              <span className="text-[#0e7c66]">
                D-Secure
              </span>{" "}
              Technical Blog: Expert Insights on Data Erasure & Security
            </h1>
            <p className={`${themeClasses.typography.sectionSubtitle} mx-auto`}>
              D-Secure is a leading provider of data erasure and IT asset lifecycle management solutions. Our blog provides expert insights and practical guides on data erasure, cybersecurity, and IT asset lifecycle management from our security professionals.
            </p>
          </div>
        </Reveal>
      </ThemeSection>

      {/* Stats Section */}
      <ThemeSection alternate>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0a2e1e] mb-2">{blogs.length}+</div>
                <div className="text-sm text-[#5a6672] font-medium">Expert Articles</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0a2e1e] mb-2">15+</div>
                <div className="text-sm text-[#5a6672] font-medium">Topics Covered</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0a2e1e] mb-2">98%</div>
                <div className="text-sm text-[#5a6672] font-medium">Reader Satisfaction</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0a2e1e] mb-2">24/7</div>
                <div className="text-sm text-[#5a6672] font-medium">Access Available</div>
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection>

      {/* Featured Articles Section */}
      <ThemeSection>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#0e7c66] bg-[#d4ede4] rounded-full mb-3">
                FEATURED
              </span>
              <ThemeSectionHeading centered>Featured Articles</ThemeSectionHeading>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((blog, idx) => {
              const tagConfig = getTagConfig(blog.tag);
              const IconComponent = tagConfig.icon;
              return (
                <Reveal key={blog.link}>
                  <Link to={blog.link} className="group block h-full">
                    <article className={`${themeClasses.card.base} ${themeClasses.card.hoverable} h-full`}>
                      {/* Icon Header */}
                      <div className="p-6 border-b border-[#d0d5dc] bg-[#f4fbf8]">
                        <div className="flex items-center justify-between">
                          <ThemeIconContainer icon={IconComponent} />
                          <span className="px-3 py-1 text-xs font-semibold text-[#0a2e1e] bg-white border border-[#d0d5dc] rounded-full">
                            {blog.tag}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className={`${themeClasses.typography.cardTitle} line-clamp-2`}>
                          {blog.title}
                        </h3>
                        <p className={`${themeClasses.typography.cardBody} line-clamp-3 mb-4 flex-grow`}>
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-[#5a6672]">{getReadTime(blog.excerpt)}</span>
                          <span className="flex items-center gap-1 text-[#0e7c66] text-sm font-semibold group-hover:gap-2 transition-all">
                            Read <ArrowRightIcon className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </ThemeSection>

      {/* All Articles Section */}
      <ThemeSection alternate id="all-articles">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#0e7c66] bg-[#d4ede4] rounded-full mb-3">
                ALL ARTICLES
              </span>
              <ThemeSectionHeading subtitle="Filter by category to find exactly what you're looking for" centered>
                Browse All Resources
              </ThemeSectionHeading>
            </div>
          </Reveal>

          {/* Search and Filter Section */}
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              {/* Search Bar */}
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="w-6 h-6 text-[#0e7c66]" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-[#d0d5dc] rounded-none text-[#0a2e1e] placeholder-[#5a6672] focus:outline-none focus:ring-2 focus:ring-[#0e7c66] focus:border-[#0e7c66] transition-all"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveFilter(tab.label)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                      activeFilter === tab.label
                        ? "bg-[#0e7c66] text-white border-[#0e7c66] shadow-sm"
                        : "bg-white text-[#5a6672] hover:bg-[#d4ede4] hover:text-[#0a2e1e] border-[#d0d5dc]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Search Results Summary */}
          {searchQuery && (
            <Reveal>
              <div className="mb-8 text-center md:text-left">
                <p className="text-[#5a6672]">
                  Showing <span className="font-bold text-[#0a2e1e]">{filteredBlogs.length}</span> results for "<span className="italic">{searchQuery}</span>"{" "}
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="ml-4 text-[#0e7c66] text-sm font-semibold hover:underline"
                  >
                    Clear Search
                  </button>
                </p>
              </div>
            </Reveal>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(0, visibleBlogs).map((blog, idx) => {
              const tagConfig = getTagConfig(blog.tag);
              const IconComponent = tagConfig.icon;
              return (
                <Reveal key={blog.link}>
                  <Link to={blog.link} className="group block h-full">
                    <article className={`${themeClasses.card.base} ${themeClasses.card.hoverable} h-full p-6 flex flex-col`}>
                      {/* Header with icon and tag */}
                      <div className="flex items-center justify-between mb-4">
                        <ThemeIconContainer icon={IconComponent} />
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-medium bg-[#f4fbf8] text-[#0a2e1e] border border-[#d0d5dc] rounded-full">
                            {blog.tag}
                          </span>
                          <span className="text-xs text-[#5a6672]">
                            {getReadTime(blog.excerpt)}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`${themeClasses.typography.cardTitle} line-clamp-2 leading-snug`}>
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`${themeClasses.typography.cardBody} line-clamp-3 flex-grow mb-4`}>
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#d0d5dc]/60 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#0a2e1e]">{blog.author}</span>
                          <span className="text-xs text-[#5a6672]">{blog.publishDate}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#0e7c66] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Infinite Scroll Loader */}
          {visibleBlogs < filteredBlogs.length && (
            <div ref={loaderRef} className="flex justify-center py-12">
              {isLoading ? (
                <div className="flex items-center gap-3 text-[#0e7c66]">
                  <Loader2Icon className="w-6 h-6 animate-spin" />
                  <span className="font-medium text-sm">Loading more articles...</span>
                </div>
              ) : (
                <div className="h-8"></div>
              )}
            </div>
          )}

          {visibleBlogs >= filteredBlogs.length && filteredBlogs.length > 9 && (
            <div className="text-center py-8">
              <p className="text-[#5a6672] font-medium text-sm">You've explored all articles in this category</p>
            </div>
          )}
        </div>
      </ThemeSection>

      {/* Newsletter CTA Section */}
      <ThemeSection>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center px-4 py-12 bg-[#0e7c66] border border-[#0e7c66] rounded-none shadow-xl">
            <ThemeIconContainer icon={CheckIcon} className="mx-auto mb-6 bg-[#0e7c66] group-hover:bg-[#0e7c66]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Informed with D-Secure
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the latest insights on secure data erasure, compliance requirements,
              and IT asset lifecycle management delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className={themeClasses.button.base + " " + themeClasses.button.primary}
              >
                <ShieldIcon className="w-5 h-5 mr-2" />
                Contact Our Experts
              </Link>
              <Link
                to="/resources"
                className={themeClasses.button.base + " bg-transparent text-white border-2 border-white hover:bg-white/10"}
              >
                <ClipboardIcon className="w-5 h-5 mr-2" />
                Browse Resources
              </Link>
            </div>
          </div>
        </Reveal>
      </ThemeSection>
      
      <BlogFooterStandard 
        blogId="default-blog-id" 
        blogTitle="Technical Guides" 
      />
    </div>
  );
};

export default BlogPage;
