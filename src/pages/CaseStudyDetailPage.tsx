import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import Reveal from '@/components/Reveal';
import {
  ThemeButton,
  ThemeSection,
  ThemeSectionHeading,
  ThemeIconContainer,
  themeClasses,
} from '@/components/ui/Theme';
import { getCaseStudyBySlug, getFeaturedCaseStudies } from '@/data/caseStudiesData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
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
  Quote,
  Settings,
  Target,
  Lightbulb,
  FolderMinus,
  HardDrive,
  Trash2,
  CloudOff,
  CalendarClock,
  ShieldCheck,
  Sliders,
  ShieldAlert,
  Globe,
} from 'lucide-react';

// ─── Icon mapper ───
const iconMap: Record<string, React.ElementType> = {
  Landmark, HeartPulse, Building2, Recycle, Factory,
  GraduationCap, Smartphone, Server, Heart, Briefcase, FileSearch,
};
const getIcon = (name: string): React.ElementType => iconMap[name] || Shield;

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  // Agar case study nahi mili ya detailContent nahi hai toh listing page pe bhejo
  if (!study || !study.detailContent) {
    return <Navigate to="/case-studies" replace />;
  }

  const detail = study.detailContent;
  const Icon = getIcon(study.iconName);

  return (
    <>
      <SEOHeadNative
        seo={{
          title: `${study.title} | D-Secure Case Study`,
          description: study.summary,
          canonicalUrl: `/case-studies/${study.slug}`,
          ogType: 'article',
          keywords: `${study.industry}, ${study.product}, data erasure, case study, D-Secure, compliance`,
          breadcrumbs: [
            { name: 'Home', item: '/' },
            { name: 'Case Studies', item: '/case-studies' },
            { name: study.company, item: `/case-studies/${study.slug}` },
          ],
        }}
      />

      <div className="bg-white w-full overflow-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO — Dark header with case study title
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden border-b border-[#d0d5dc]/40">
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.4]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #0e7c66 0.5px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0e7c66]/5 rounded-full blur-3xl" />

          <div className="container-app relative z-10 py-12 md:py-20 lg:py-24">
            {/* Back link */}
            <Reveal>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-[#5a6672] hover:text-[#0a2e1e] text-sm font-medium mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Case Studies
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
              {/* Left — Text content */}
              <div className="max-w-3xl">
                {/* Industry tag */}
                <Reveal delayMs={5}>
                  <span className="text-[10px] font-bold text-[#0e7c66] bg-[#0e7c66]/15 px-2.5 py-1 uppercase tracking-widest">
                    {study.industry}
                  </span>
                </Reveal>

                {/* Company naam */}
                <Reveal delayMs={10}>
                  <p className="text-[#5a6672] text-sm font-bold uppercase tracking-widest mb-3 mt-5">
                    {study.company}
                  </p>
                </Reveal>

                {/* Title */}
                <Reveal delayMs={15}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] leading-[1.15] mb-6">
                    {study.title}
                  </h1>
                </Reveal>

                {/* Summary */}
                <Reveal delayMs={20}>
                  <p className="text-lg text-[#5a6672] leading-relaxed max-w-3xl">
                    {study.summary}
                  </p>
                </Reveal>
              </div>

              {/* Right — Bada emerald industry icon */}
              <div className="hidden lg:flex items-center justify-center">
                <Reveal delayMs={25}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#0e7c66]/5 rounded-full scale-125 blur-2xl" />
                    <div className="relative w-72 h-72 xl:w-80 xl:h-80 border-2 border-[#0e7c66]/10 rounded-full flex items-center justify-center">
                      <div className="w-60 h-60 xl:w-68 xl:h-68 bg-[#0e7c66]/[0.04] border border-[#0e7c66]/8 rounded-full flex items-center justify-center">
                        <Icon className="w-36 h-36 xl:w-40 xl:h-40 text-[#0e7c66]/40" strokeWidth={0.8} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTENT — Two-Column Layout (Main + Sidebar)
           ═══════════════════════════════════════════════════════════════════ */}
        <ThemeSection className="!py-16 md:!py-24">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* ─── LEFT COLUMN: Main Content ─── */}
              <div className="lg:col-span-8 space-y-16 md:space-y-24">
                
                {/* Challenge Section */}
                <div>
                  <Reveal>
                    <div className="flex items-start gap-4 mb-6">
                      <ThemeIconContainer icon={Target} size="lg" />
                      <div>
                        <h2 className={`${themeClasses.typography.sectionHeading} !text-2xl md:!text-3xl !mb-2`}>
                          Business Need & Challenge
                        </h2>
                        <p className="text-sm text-[#5a6672]">What the organization was facing</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={10}>
                    <p className={`${themeClasses.typography.cardBody} text-base md:text-lg leading-relaxed`}>
                      {detail.challenge}
                    </p>
                  </Reveal>
                </div>

                {/* Solution Section */}
                <div>
                  <Reveal>
                    <div className="flex items-start gap-4 mb-6">
                      <ThemeIconContainer icon={Lightbulb} size="lg" />
                      <div>
                        <h2 className={`${themeClasses.typography.sectionHeading} !text-2xl md:!text-3xl !mb-2`}>
                          The D-Secure Solution
                        </h2>
                        <p className="text-sm text-[#5a6672]">How D-Secure addressed the challenge</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={10}>
                    <p className={`${themeClasses.typography.cardBody} text-base md:text-lg leading-relaxed`}>
                      {detail.solution}
                    </p>
                  </Reveal>
                </div>

                {/* Implementation Section */}
                <div>
                  <Reveal>
                    <div className="flex items-start gap-4 mb-8">
                      <ThemeIconContainer icon={Settings} size="lg" />
                      <div>
                        <h2 className={`${themeClasses.typography.sectionHeading} !text-2xl md:!text-3xl !mb-2`}>
                          Implementation
                        </h2>
                        <p className="text-sm text-[#5a6672]">Technical steps and deployment details</p>
                      </div>
                    </div>
                  </Reveal>
                  <div className="space-y-4">
                    {detail.implementation.map((step, idx) => (
                      <Reveal key={idx} delayMs={idx * 5}>
                        <div className="flex items-start gap-4 p-5 bg-[#f4fbf8] border border-[#d0d5dc]/30 hover:border-[#0e7c66]/30 transition-colors">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#0e7c66] text-white flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <p className={`${themeClasses.typography.cardBody} text-base`}>
                            {step}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>

                {/* ─── PRODUCT REFERENCE BLOCK ─── */}
                <Reveal>
                  <div className="bg-white p-8 md:p-10 border border-[#d0d5dc]/50 relative overflow-hidden mt-8 shadow-sm group">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FolderMinus className="w-64 h-64 text-[#0e7c66]" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <FolderMinus className="w-5 h-5 text-[#0e7c66]" />
                        <h3 className="text-xs font-bold text-[#0e7c66] uppercase tracking-widest">
                          Technology Used
                        </h3>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold text-[#0a2e1e] mb-4">
                        D-Secure File Eraser
                      </h4>
                      <p className="text-base text-[#5a6672] leading-relaxed mb-6">
                        This client successfully leveraged <strong>D-Secure File Eraser</strong> to achieve secure and permanent data destruction. The solution provided a professional, structured way to wipe 250+ TB of sensitive business data without having to wipe entire drives.
                      </p>
                      <ul className="text-sm text-[#5a6672] space-y-3 mb-8">
                        <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0e7c66] mt-1.5 shrink-0" /> Verified compliance with 27+ data erasure standards</li>
                        <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0e7c66] mt-1.5 shrink-0" /> Automated policies via built-in Task Scheduler</li>
                        <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0e7c66] mt-1.5 shrink-0" /> Tamper-proof erasure reports generated for every job</li>
                      </ul>
                      <Link to="/products/file-eraser" className="inline-flex items-center gap-2 text-sm font-bold text-[#0e7c66] hover:gap-3 transition-all">
                        Explore File Eraser Capabilities <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>


              </div>

              {/* ─── RIGHT COLUMN: Sticky Sidebar ─── */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-10">
                  
                  {/* Key Metrics / Results */}
                  {study.results && study.results.length > 0 && (
                    <Reveal>
                      <div className="bg-[#f4fbf8] border border-[#d0d5dc]/50 p-6 lg:p-8">
                        <h3 className="text-sm font-bold text-[#0a2e1e] uppercase tracking-widest mb-6 pb-4 border-b border-[#d0d5dc]/60">
                          Key Results
                        </h3>
                        <div className="space-y-6">
                          {study.results.map((result, idx) => (
                            <div key={idx}>
                              <p className="text-[#0e7c66] text-2xl md:text-3xl font-bold mb-1">{result.value}</p>
                              <p className="text-[#5a6672] text-sm font-medium">{result.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {/* Quick Facts (Products & Compliance) */}
                  <Reveal delayMs={10}>
                    <div className="bg-white border border-[#d0d5dc]/50 p-6 lg:p-8 shadow-sm">
                      <h3 className="text-sm font-bold text-[#0a2e1e] uppercase tracking-widest mb-6 pb-4 border-b border-[#d0d5dc]/60">
                        Quick Facts
                      </h3>
                      
                      <div className="mb-6">
                        <p className="text-xs font-bold text-[#5a6672] uppercase tracking-wider mb-3">Products Used</p>
                        <div className="flex flex-wrap gap-2">
                          {detail.productsUsed.map((p) => (
                            <span key={p} className="text-xs font-semibold text-[#0a2e1e] bg-[#f4fbf8] px-3 py-1.5 border border-[#d4ede4]">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#5a6672] uppercase tracking-wider mb-3">Compliance Met</p>
                        <div className="flex flex-wrap gap-2">
                          {detail.complianceStandards.map((s) => (
                            <span key={s} className="text-xs font-semibold text-[#0e7c66] bg-[#0e7c66]/5 px-3 py-1.5 border border-[#0e7c66]/15">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>

                </div>
              </div>

            </div>
          </div>
        </ThemeSection>

        {/* Outcome / Quote Section */}
        <section className="bg-[#0a2e1e] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0e7c66]/8 rounded-full blur-3xl" />
          <div className="container-app relative z-10 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#0e7c66]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-8 h-8 text-[#0e7c66]" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      The Outcome
                    </h2>
                    <p className="text-sm text-white/40">Client perspective</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={10}>
                <blockquote className="text-xl md:text-2xl text-white/70 leading-relaxed italic border-l-4 border-[#0e7c66] pl-6 md:pl-8">
                  {detail.outcome}
                </blockquote>
              </Reveal>
              <Reveal delayMs={15}>
                <p className="text-white/30 text-sm mt-6 pl-6 md:pl-8">
                  — {study.industry} Executive, {study.company}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            RELATED CASE STUDIES
           ═══════════════════════════════════════════════════════════════════ */}
        {(() => {
          const relatedStudies = getFeaturedCaseStudies()
            .filter(cs => cs.slug !== study.slug && cs.detailContent)
            .slice(0, 3);
            
          if (relatedStudies.length === 0) return null;

          return (
            <ThemeSection className="bg-[#f4fbf8] border-t border-[#d0d5dc]/40">
              <div className="container-app">
                <Reveal>
                  <ThemeSectionHeading
                    subtitle="Explore more real-world examples of secure data sanitization across industries."
                  >
                    Related Case Studies
                  </ThemeSectionHeading>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {relatedStudies.map((relatedStudy, idx) => {
                    const RelatedIcon = getIcon(relatedStudy.iconName);
                    return (
                      <Reveal key={relatedStudy.id} delayMs={idx * 5}>
                        <Link to={`/case-studies/${relatedStudy.slug}`} className="block h-full group">
                          <div className="bg-white border border-[#d0d5dc]/50 p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all hover:border-[#0e7c66]/30">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <RelatedIcon className="w-8 h-8 text-[#0e7c66]" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold text-[#0e7c66] bg-[#d4ede4] px-2.5 py-1 uppercase tracking-widest">
                                  {relatedStudy.industry}
                                </span>
                              </div>
                              <h3 className={`${themeClasses.typography.cardTitle} !text-lg !mb-2 line-clamp-2 group-hover:text-[#0e7c66] transition-colors`}>
                                {relatedStudy.title}
                              </h3>
                              <p className="text-sm text-[#5a6672] line-clamp-2">
                                {relatedStudy.summary}
                              </p>
                            </div>
                            <div className="flex items-center text-[#0e7c66] text-sm font-bold gap-1 mt-6 group-hover:gap-2 transition-all">
                              Read Case Study
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </ThemeSection>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════════
            CTA — Contact Sales
           ═══════════════════════════════════════════════════════════════════ */}
        <ThemeSection>
          <div className="container-app">
            <div className="max-w-3xl mx-auto text-center">
              <Reveal>
                <ThemeSectionHeading
                  centered
                  subtitle="See how D-Secure can solve similar data sanitization and compliance challenges for your organization."
                >
                  Facing a Similar Challenge?
                </ThemeSectionHeading>
              </Reveal>
              <Reveal delayMs={10}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <ThemeButton variant="primary" className="w-full sm:w-auto">
                      Contact Sales
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </ThemeButton>
                  </Link>
                  <Link to="/case-studies">
                    <ThemeButton variant="outline" className="w-full sm:w-auto">
                      View All Case Studies
                    </ThemeButton>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>
      </div>
    </>
  );
}
