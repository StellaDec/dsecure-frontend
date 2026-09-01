import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ThemeCard,
  ThemeButton,
  ThemeSection,
  ThemeSectionHeading,
  ThemeIconContainer,
  themeClasses,
} from '@/components/ui/Theme';
import {
  caseStudies,
  getCaseStudiesWithDetail,
  industryFilters,
  productFilters,
} from '@/data/caseStudiesData';
import type { IndustryFilter, ProductFilter, CaseStudy } from '@/data/caseStudiesData';
import {
  Search,
  ChevronRight,
  X,
  Filter,
  Landmark,
  HeartPulse,
  Building2,
  Recycle,
  Factory,
  GraduationCap,
  Smartphone,
  Server,
  Heart,
  Briefcase,
  Shield,
  ArrowRight,
  FileSearch,
} from 'lucide-react';

// ─── Icon mapper — iconName string ko Lucide component mein convert karta hai ───
const iconMap: Record<string, React.ElementType> = {
  Landmark,
  HeartPulse,
  Building2,
  Recycle,
  Factory,
  GraduationCap,
  Smartphone,
  Server,
  Heart,
  Briefcase,
  FileSearch,
};

/**
 * getIcon — Case study ke iconName se Lucide component return karta hai.
 * Agar match nahi mila toh default Shield icon dega.
 */
const getIcon = (iconName: string): React.ElementType => {
  return iconMap[iconName] || Shield;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CaseStudyHomePage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage('case-studies')} />
      <CaseStudyHomeContent />
    </>
  );
}

function CaseStudyHomeContent() {
  // ─── State: Filters ───
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryFilter[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductFilter[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ─── Featured — sirf woh case studies jinke paas detail page hai ───
  const featuredWithDetail = getCaseStudiesWithDetail();

  // ─── Filtered results — search + industry + product filters ───
  const filteredStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry =
        selectedIndustries.length === 0 || selectedIndustries.includes(cs.industry);

      const matchesProduct =
        selectedProducts.length === 0 || selectedProducts.includes(cs.product);

      return matchesSearch && matchesIndustry && matchesProduct;
    });
  }, [searchQuery, selectedIndustries, selectedProducts]);

  // ─── Filter toggle handlers ───
  const toggleIndustry = (industry: IndustryFilter) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry]
    );
  };

  const toggleProduct = (product: ProductFilter) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustries([]);
    setSelectedProducts([]);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedIndustries.length > 0 || selectedProducts.length > 0;

  return (
    <div className="bg-white w-full overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Featured case study card with Lucide icon
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden border-b border-[#d0d5dc]/40">
        {/* Background dot pattern */}
        <div className="absolute inset-0 opacity-[0.35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #0e7c66 0.5px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Decorative icon — opacity badhaya visibility ke liye */}
        <div className="absolute right-[-10%] md:right-[5%] lg:right-[15%] top-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none">
          <FileSearch className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] text-[#0e7c66]" strokeWidth={0.7} />
        </div>

        <div className="container-app relative z-10 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[#0e7c66] font-bold text-sm tracking-widest uppercase mb-5">
                Case Studies
              </p>
            </Reveal>
            <Reveal delayMs={10}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0a2e1e] mb-6 leading-[1.1]">
                See How Organizations Secure Their Data With <span className="whitespace-nowrap">D-Secure</span>
              </h1>
            </Reveal>
            <Reveal delayMs={20}>
              <p className="text-lg text-[#5a6672] leading-relaxed mb-10 max-w-2xl">
                Explore real-world implementations across industries — from enterprise data center decommissioning to mobile device trade-in programs. Every case study features verified erasure data and documented compliance outcomes.
              </p>
            </Reveal>
            <Reveal delayMs={30}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact">
                  <ThemeButton variant="primary" className="w-full sm:w-auto">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </ThemeButton>
                </Link>
                <a href="#all-case-studies">
                  <ThemeButton variant="outline" className="w-full sm:w-auto">
                    Browse All
                  </ThemeButton>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TRUST STRIP — Compliance standards (E-E-A-T authority signals)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a2e1e] py-6">
        <div className="container-app">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {['NIST 800-88', 'HIPAA', 'GDPR', 'PCI DSS', 'SOX', 'R2v3', 'ISO 27001', 'FERPA', 'CMMC'].map((std) => (
                <span key={std} className="text-white/60 text-xs font-bold tracking-widest uppercase">
                  {std}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          VALUE PROPOSITION — Why organizations choose D-Secure (SEO content)
         ═══════════════════════════════════════════════════════════════════════ */}
      <ThemeSection>
        <div className="container-app">
          <div className="mb-10 md:mb-14">
            <ThemeSectionHeading
              centered
              subtitle="D-Secure provides enterprise-grade data erasure solutions with cryptographic proof of destruction, full audit trails, and compliance documentation across every major regulatory framework."
            >
              Why Organizations Trust D-Secure for Data Sanitization
            </ThemeSectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Reveal>
              <ThemeCard className="text-center">
                <ThemeIconContainer icon={Shield} size="lg" className="mx-auto mb-5" />
                <h3 className={`${themeClasses.typography.cardTitle} !text-lg !mb-3`}>
                  Certified Compliance
                </h3>
                <p className={`${themeClasses.typography.cardBody} text-sm`}>
                  Every erasure job produces tamper-evident certificates meeting NIST 800-88 Rev.1, IEEE 2883, and DoD 5220.22-M standards — accepted by auditors worldwide.
                </p>
              </ThemeCard>
            </Reveal>
            <Reveal delayMs={10}>
              <ThemeCard className="text-center">
                <ThemeIconContainer icon={FileSearch} size="lg" className="mx-auto mb-5" />
                <h3 className={`${themeClasses.typography.cardTitle} !text-lg !mb-3`}>
                  Full Audit Trails
                </h3>
                <p className={`${themeClasses.typography.cardBody} text-sm`}>
                  Automated logging of every file, folder, and drive erased — with timestamped records, operator identification, and erasure method documentation for regulatory reviews.
                </p>
              </ThemeCard>
            </Reveal>
            <Reveal delayMs={20}>
              <ThemeCard className="text-center">
                <ThemeIconContainer icon={ArrowRight} size="lg" className="mx-auto mb-5" />
                <h3 className={`${themeClasses.typography.cardTitle} !text-lg !mb-3`}>
                  Scalable Deployment
                </h3>
                <p className={`${themeClasses.typography.cardBody} text-sm`}>
                  From single workstations to thousands of drives across multiple data centers — D-Secure scales with PXE network boot, cloud console management, and policy-driven automation.
                </p>
              </ThemeCard>
            </Reveal>
          </div>
        </div>
      </ThemeSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT — Sidebar Filters + Case Study Grid
         ═══════════════════════════════════════════════════════════════════════ */}
      <ThemeSection id="all-case-studies" className="!py-12 md:!py-16 lg:!py-20">
        <div className="container-app">
          <div className="mb-10 md:mb-14">
            <ThemeSectionHeading
              subtitle="Filter by industry or product to find case studies relevant to your organization."
            >
              All Case Studies
            </ThemeSectionHeading>
          </div>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full text-base`}
            >
              <Filter className="w-5 h-5 mr-2" />
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              {hasActiveFilters && (
                <span className="ml-2 bg-[#0e7c66] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedIndustries.length + selectedProducts.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ─── LEFT SIDEBAR — Filters ─── */}
            <aside
              className={`lg:w-64 xl:w-72 flex-shrink-0 ${
                mobileFiltersOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a6672]" />
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-[#d0d5dc] rounded-none text-[#0a2e1e] placeholder:text-[#5a6672]/60 focus:border-[#0e7c66] focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6672] hover:text-[#0a2e1e]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Industry Filters */}
                <div>
                  <h3 className="text-xs font-bold text-[#0a2e1e] uppercase tracking-widest mb-3 pb-2 border-b border-[#d0d5dc]/60">
                    Industry
                  </h3>
                  <div className="space-y-0.5">
                    {industryFilters.map((industry) => {
                      const isActive = selectedIndustries.includes(industry);
                      const count = caseStudies.filter((cs) => cs.industry === industry).length;
                      return (
                        <button
                          key={industry}
                          onClick={() => toggleIndustry(industry)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-none transition-all text-left ${
                            isActive
                              ? 'bg-[#0e7c66] text-white font-semibold'
                              : 'text-[#5a6672] hover:bg-[#f4fbf8] hover:text-[#0a2e1e]'
                          }`}
                        >
                          <span>{industry}</span>
                          <span className={`text-xs font-medium ${isActive ? 'text-white/70' : 'text-[#5a6672]/50'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Filters */}
                <div>
                  <h3 className="text-xs font-bold text-[#0a2e1e] uppercase tracking-widest mb-3 pb-2 border-b border-[#d0d5dc]/60">
                    Products
                  </h3>
                  <div className="space-y-0.5">
                    {productFilters.map((product) => {
                      const isActive = selectedProducts.includes(product);
                      const count = caseStudies.filter((cs) => cs.product === product).length;
                      return (
                        <button
                          key={product}
                          onClick={() => toggleProduct(product)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-none transition-all text-left ${
                            isActive
                              ? 'bg-[#0e7c66] text-white font-semibold'
                              : 'text-[#5a6672] hover:bg-[#f4fbf8] hover:text-[#0a2e1e]'
                          }`}
                        >
                          <span>{product}</span>
                          <span className={`text-xs font-medium ${isActive ? 'text-white/70' : 'text-[#5a6672]/50'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0e7c66] border border-[#0e7c66] rounded-none hover:bg-[#0e7c66]/5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* ─── RIGHT CONTENT — Case Study Grid ─── */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#d0d5dc]/40">
                <p className="text-sm text-[#5a6672]">
                  Showing{' '}
                  <span className="font-bold text-[#0a2e1e]">{filteredStudies.length}</span>{' '}
                  of {caseStudies.length} case studies
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#0e7c66] font-semibold hover:underline hidden lg:inline-flex items-center gap-1"
                  >
                    Clear filters <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {filteredStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                  {filteredStudies.map((cs, idx) => (
                    <CaseStudyCard key={cs.id} study={cs} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#f4fbf8] border border-[#d0d5dc]/40 rounded-none">
                  <Search className="w-12 h-12 text-[#5a6672]/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">No Case Studies Found</h3>
                  <p className="text-[#5a6672] mb-6">Try adjusting your filters or search query.</p>
                  <button
                    onClick={clearFilters}
                    className={`${themeClasses.button.base} ${themeClasses.button.primary} text-base`}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a2e1e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0e7c66]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container-app relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <ThemeSectionHeading
                centered
                light
                subtitle="See how D-Secure can help your organization achieve compliance and secure data sanitization at scale."
              >
                Want to Be Our Next Success Story?
              </ThemeSectionHeading>
            </Reveal>
            <Reveal delayMs={15}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <ThemeButton variant="primary" className="w-full sm:w-auto">
                    Contact Sales
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </ThemeButton>
                </Link>
                <Link to="/early-access">
                  <ThemeButton variant="outline" className="w-full sm:w-auto !text-white !border-white/30 hover:!bg-white/5">
                    Request Free Trial
                  </ThemeButton>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// CASE STUDY CARD — Linking to detail page if detailContent exists, else /contact
// ============================================================================
interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const Icon = getIcon(study.iconName);
  // Agar detail page hai toh slug wali link, nahi toh /contact
  const linkTarget = study.detailContent
    ? `/case-studies/${study.slug}`
    : '/contact';

  return (
    <Reveal delayMs={index * 5}>
      <Link to={linkTarget} className="block h-full">
        <ThemeCard interactive className="h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <ThemeIconContainer icon={Icon} size="md" />
              <span className="text-[10px] font-bold text-[#0e7c66] bg-[#d4ede4] px-2.5 py-1 rounded-none uppercase tracking-widest">
                {study.industry}
              </span>
            </div>

            <p className="text-xs font-bold text-[#5a6672] uppercase tracking-wider mb-1.5">
              {study.company}
            </p>

            <h3 className={`${themeClasses.typography.cardTitle} !text-lg !mb-3 line-clamp-2`}>
              {study.title}
            </h3>

            <p className={`${themeClasses.typography.cardBody} text-sm line-clamp-3`}>
              {study.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 mt-6 border-t border-[#d0d5dc]/40">
            <span className="text-xs font-medium text-[#5a6672] bg-[#f4fbf8] px-2.5 py-1">
              {study.product}
            </span>
            <span className="text-[#0e7c66] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Full Case Study
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </ThemeCard>
      </Link>
    </Reveal>
  );
}
