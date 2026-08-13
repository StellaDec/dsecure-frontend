import { useState, useMemo } from 'react';
import Reveal from '@/components/Reveal';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import { getSEOForPage } from '@/utils/seo';
import { Link } from 'react-router-dom';
import {
  internationalLaws,
  regions,
  getRegionCounts,
  type Region,
  type DataProtectionLaw,
} from '@/data/internationalLawsData';
import {
  Shield, Globe, ShieldCheck, ClipboardCheck, FileCheck, Zap,
  Search, ArrowRight, Check, Mail, BookOpen, Scale, Landmark
} from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import {
  ThemeSection,
  ThemeSectionHeading,
  ThemeCard,
  ThemeButton,
  ThemeIconContainer,
  themeClasses,
  themeTokens,
} from '@/components/ui/Theme';

// ─── मुख्य Page Component ───
export default function InternationalLawsPage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage('international-laws')} />
      <InternationalLawsContent />
    </>
  );
}

// ─── Page Content ───
function InternationalLawsContent() {
  const [activeRegion, setActiveRegion] = useState<Region>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const regionCounts = useMemo(() => getRegionCounts(), []);

  // Get compliance related blogs
  const complianceBlogs = useMemo(() => {
    return blogPosts.filter(post => post.category === 'Compliance').slice(0, 3);
  }, []);

  // फ़िल्टर किये हुए कानून - region और search दोनों basis पर
  const filteredLaws = useMemo(() => {
    let laws = internationalLaws;
    if (activeRegion !== 'all') {
      laws = laws.filter(law => law.region === activeRegion);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      laws = laws.filter(
        law =>
          law.name.toLowerCase().includes(q) ||
          law.fullName.toLowerCase().includes(q) ||
          law.country.toLowerCase().includes(q) ||
          law.description.toLowerCase().includes(q)
      );
    }
    return laws;
  }, [activeRegion, searchQuery]);

  return (
    <>
      {/* ─── Hero Section ─── */}
      <ThemeSection id="hero" className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 xxl:py-18 relative overflow-hidden" >
        <div className="container-responsive relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16 xxl:gap-20 items-center">
            <div className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-8 lg:space-y-8 xl:space-y-10 xxl:space-y-12 lg:pr-6 xl:pr-8 xxl:pr-12">
              <Reveal>
                <div className="space-y-6">
                  <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl xxl:text-6xl font-bold tracking-tight text-[#0a2e1e] leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight xxl:leading-tight">
                    International Laws{' '}
                    <span className="text-[#0e7c66]">
                      & Regulations
                    </span>
                  </h1>
                  <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-black leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed xxl:leading-relaxed">
                    D-Secure helps organizations comply with global data protection laws that mandate secure disposal of information. Explore {internationalLaws.length}+ international regulations across 30+ countries.
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={20}>
                <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row items-start xs:items-start sm:items-center md:items-center lg:items-center xl:items-center xxl:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 xxl:gap-6">
                  <a
                    href="#laws"
                    className={`${themeClasses.button.base} ${themeClasses.button.primary} w-full sm:w-auto`}
                  >
                    <ShieldCheck className="w-5 h-5 mr-2" strokeWidth={2} />
                    Explore Regulations
                  </a>
                  <Link
                    to="/contact"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto`}
                  >
                    <Mail className="w-5 h-5 mr-2" strokeWidth={2} />
                    Compliance Consultation
                  </Link>
                </div>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-wrap items-center gap-4 text-sm text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>{internationalLaws.length}+ Global Regulations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>30+ Countries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                    <span>Audit-Ready Reports</span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="relative lg:order-last -mt-14 lg:-mt-20">
              <Reveal delayMs={0}>
                <div className="relative flex items-center justify-center min-h-[340px] lg:min-h-[460px]">
                  {/* Custom Hero SVG Illustration */}
                  <div className="relative w-full max-w-[500px] mx-auto scale-95 sm:scale-100">
                    <svg
                      viewBox="0 0 500 400"
                      className="w-full h-auto drop-shadow-xl"
                      fill="none"
                      stroke="#0a2e1e"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Laptop */}
                      {/* Screen Outer */}
                      <rect x="100" y="140" width="260" height="170" rx="12" fill="white" />
                      {/* Screen Inner */}
                      <rect x="115" y="155" width="230" height="140" rx="4" fill="#f4fcf8" stroke="#34d399" />

                      {/* Main Law Icon (Scale) */}
                      <g transform="translate(160, 60)">
                        {/* Background for icon */}
                        <circle cx="60" cy="60" r="65" fill="white" stroke="#34d399" strokeDasharray="4 4" />
                        <Scale x="20" y="20" width="80" height="80" stroke="#0e7c66" strokeWidth={1.2} />
                      </g>

                      {/* International Icon (Globe) */}
                      <g transform="translate(260, 150)">
                        {/* Background for icon */}
                        <circle cx="40" cy="40" r="45" fill="white" stroke="#0e7c66" />
                        <Globe x="15" y="15" width="50" height="50" stroke="#34d399" strokeWidth={1.5} />
                      </g>

                      {/* Laptop Base */}
                      <rect x="70" y="310" width="320" height="10" rx="4" fill="white" />
                      <path d="M80 320 L420 320 C410 340 385 345 365 345 L135 345 C115 345 90 340 80 320 Z" fill="white" />

                    </svg>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* ─── Region Filter + Search ─── */}
      <ThemeSection id="laws" alternate className="border-b border-[#d0d5dc]/40">
        <div className="container-app">
          <Reveal>
            <ThemeSectionHeading centered subtitle="Filter data protection laws by geographic region to find regulations relevant to your operations.">
              Select Region
            </ThemeSectionHeading>
          </Reveal>

          {/* Search bar */}
          <Reveal delayMs={10}>
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search laws, countries, or keywords..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-none border border-[#d0d5dc] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e7c66]/30 focus:border-[#0e7c66] transition-all text-[#0a2e1e] placeholder:text-[#5a6672]"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a6672]" strokeWidth={2} />
              </div>
            </div>
          </Reveal>

          {/* Region tabs - flat design with Lucide icons */}
          <Reveal delayMs={20}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {regions.map(region => {
                const RegionIcon = region.icon;
                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-none text-sm font-bold transition-all duration-150 ${
                      activeRegion === region.id
                        ? 'bg-[#0e7c66] text-white border-2 border-[#0e7c66]'
                        : 'bg-white text-[#0a2e1e] border-2 border-[#d0d5dc] hover:border-[#0e7c66] hover:text-[#0e7c66]'
                    }`}
                  >
                    <RegionIcon className="w-4 h-4" strokeWidth={2} />
                    <span>{region.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-none font-bold ${
                        activeRegion === region.id
                          ? 'bg-white/20 text-white'
                          : 'bg-[#d4ede4] text-[#0e7c66]'
                      }`}
                    >
                      {regionCounts[region.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </ThemeSection>

      {/* ─── Laws Grid ─── */}
      <ThemeSection>
        <div className="container-app">
          {filteredLaws.length === 0 ? (
            <div className="text-center py-20">
              <ThemeIconContainer icon={Search} size="lg" className="mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">No regulations found</h3>
              <p className={themeClasses.typography.cardBody}>Try adjusting your search or select a different region.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaws.map((law, index) => (
                <Reveal key={law.id} delayMs={Math.min(index * 50, 300)}>
                  <LawCard law={law} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </ThemeSection>

      {/* ─── D-Secure Compliance CTA ─── */}
      <ThemeSection alternate>
        <div className="container-app">
          <Reveal>
            <div className="bg-[#0a2e1e] rounded-none p-8 md:p-14 text-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0e7c66]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0e7c66]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <ThemeIconContainer icon={Globe} size="lg" className="mx-auto mb-6 bg-[#0e7c66]/20 group" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ensure Global Compliance with D-Secure
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                  D-Secure's certified data erasure software helps you comply with all major
                  international data protection regulations. Get tamper-proof audit certificates
                  that stand up to regulatory scrutiny.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className={`${themeClasses.button.base} ${themeClasses.button.primary}`}
                  >
                    <Mail className="w-5 h-5 mr-2" strokeWidth={2} />
                    Schedule Compliance Review
                  </Link>
                  {/* <Link
                    to="/compliance"
                    className={`${themeClasses.button.base} bg-transparent text-white border-2 border-white/30 hover:bg-white/10`}
                  >
                    <ShieldCheck className="w-5 h-5 mr-2" strokeWidth={2} />
                    View Compliance Standards
                  </Link> */}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </ThemeSection>

      {/* ─── Why D-Secure for Compliance ─── */}
      <ThemeSection>
        <div className="container-app">
          <Reveal>
            <ThemeSectionHeading centered subtitle="Our enterprise data erasure platform is built from the ground up for global compliance.">
              Why Choose D-Secure for Regulatory Compliance?
            </ThemeSectionHeading>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                icon: ShieldCheck,
                title: 'Tamper-Proof Certificates',
                description: 'Cryptographically signed erasure certificates that cannot be forged or altered.',
              },
              {
                icon: ClipboardCheck,
                title: 'Audit-Ready Reports',
                description: 'Detailed PDF reports with hash verification for regulatory audits and legal proceedings.',
              },
              {
                icon: Globe,
                title: '27+ Standards Supported',
                description: 'NIST 800-88, GDPR, HIPAA, DoD 5220.22-M, IEEE 2883 and more supported out of the box.',
              },
              {
                icon: Zap,
                title: 'Automated Compliance',
                description: 'Auto-select the correct erasure standard based on your industry and geographic requirements.',
              },
            ] as const).map((feature, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <ThemeCard className="h-full text-center">
                  <ThemeIconContainer icon={feature.icon} size="lg" className="mx-auto mb-4" />
                  <h3 className={themeClasses.typography.cardTitle}>{feature.title}</h3>
                  <p className={themeClasses.typography.cardBody}>{feature.description}</p>
                </ThemeCard>
              </Reveal>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* ─── Compliance Insights (Blog) ─── */}
      {complianceBlogs.length > 0 && (
        <ThemeSection alternate className="border-t border-[#d0d5dc]/40">
          <div className="container-app">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Read our latest guides and insights on global data protection laws and compliance standards.">
                Compliance Insights
              </ThemeSectionHeading>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {complianceBlogs.map((post, index) => (
                <Reveal key={post.id} delayMs={index * 100}>
                  <ThemeCard className="h-full flex flex-col hover:border-[#0e7c66] transition-colors duration-300">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0e7c66] bg-[#d4ede4] px-2 py-1 rounded-none">
                          {post.tag}
                        </span>
                        <span className="text-xs text-[#5a6672] font-medium">
                          {post.readTime || '5 min read'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0a2e1e] mb-3 leading-tight group-hover:text-[#0e7c66] transition-colors duration-150">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#5a6672] leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="border-t border-[#d0d5dc]/60 pt-4 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-none bg-[#0a2e1e] flex items-center justify-center text-white text-[10px] font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-[#0a2e1e]">{post.author}</span>
                      </div>
                      <Link 
                        to={post.link}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0e7c66] hover:text-[#0a2e1e] transition-colors duration-150"
                      >
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </Link>
                    </div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
            
            <Reveal delayMs={300}>
              <div className="text-center mt-10">
                <Link
                  to="/blog"
                  className={`${themeClasses.button.base} ${themeClasses.button.outline}`}
                >
                  <BookOpen className="w-4 h-4 mr-2" strokeWidth={2} />
                  View All Resources
                </Link>
              </div>
            </Reveal>
          </div>
        </ThemeSection>
      )}
    </>
  );
}

// ─── Individual Law Card Component - Poora card clickable hai ───
function LawCard({ law }: { law: DataProtectionLaw }) {
  const [expanded, setExpanded] = useState(false);
  const LawIcon = law.icon;

  // Card ka inner content - reusable across Link/anchor wrapper
  const cardContent = (
    <ThemeCard className="h-full flex flex-col cursor-pointer group hover:border-[#0e7c66] hover:shadow-lg transition-all duration-200">
      {/* Card Header */}
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Circular icon container */}
            <div className={`${themeClasses.icon.wrapper} ${themeClasses.icon.wrapperSize.md} group-hover:bg-[#0e7c66] group-hover:text-white transition-colors duration-200`}>
              <LawIcon className={`${themeClasses.icon.lucide} ${themeClasses.icon.lucideSize.md}`} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-[#0a2e1e] text-lg group-hover:text-[#0e7c66] transition-colors duration-150">
                {law.name}
              </h3>
              <p className="text-xs text-[#5a6672]">{law.country} · {law.year}</p>
            </div>
          </div>
          {/* Region badge */}
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0e7c66] bg-[#d4ede4] px-2 py-1 rounded-none whitespace-nowrap">
            {law.region.replace(/-/g, ' ')}
          </span>
        </div>

        <p className="text-sm font-medium text-[#0a2e1e] mb-2 leading-snug">{law.fullName}</p>
        <p className={`text-sm ${themeClasses.typography.cardBody}`}>{law.description}</p>

        {/* Key Points - expandable */}
        {expanded && (
          <div className="mt-4 space-y-2">
            {law.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#d4ede4] text-[#0e7c66] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-[#5a6672]">{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="border-t border-[#d0d5dc]/60 pt-3 mt-4 flex items-center justify-between">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(!expanded); }}
          className="text-sm text-[#0e7c66] hover:text-[#0a2e1e] font-bold transition-colors duration-150"
        >
          {expanded ? 'Show Less' : 'Key Points'}
        </button>
        <span className="inline-flex items-center gap-1 text-sm text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors duration-150">
          Learn More
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
        </span>
      </div>
    </ThemeCard>
  );

  // External link ya internal route ke hisaab se wrapper decide karna
  if (law.learnMoreUrl.startsWith('http')) {
    return (
      <a href={law.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={law.learnMoreUrl} className="block h-full no-underline">
      {cardContent}
    </Link>
  );
}
