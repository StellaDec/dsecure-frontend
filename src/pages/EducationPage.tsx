import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import { 
  ThemeSection, 
  ThemeSectionHeading, 
  ThemeCard, 
  ThemeIconContainer, 
  ThemeButton,
  themeClasses
} from "@/components/ui/Theme";
import {
  GraduationCap,
  ShieldCheck,
  FileText,
  CheckCircle,
  Monitor,
  Server,
  Smartphone,
  HardDrive,
  Laptop,
  ChevronRight
} from "lucide-react";

/**
 * EducationPage Component
 * Is page mein Educational Institutions (Schools, Universities) ke liye data security aur device diagnostics solutions pradarshit kiye gaye hain.
 * Yeh page modern green layout aur advanced lifecycle safety parameters par aadharit hai.
 */
const EducationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Secondary navbar items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "compliance", label: "Compliance" },
    { id: "assets", label: "Assets" },
    { id: "solutions", label: "Solutions" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll handle karne ke liye useEffect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = typeof window !== "undefined" ? window.scrollY : 0;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
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
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + (typeof window !== "undefined" ? window.scrollY : 0);
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("solutions/education")} />

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

      <div className="min-h-screen bg-white">
        {/* ================= HERO SECTION ================= */}
        <section
          id="overview"
          className="min-h-[600px] flex items-start pt-8 lg:pt-12 pb-8 lg:pb-12 relative overflow-hidden bg-white"
        >

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left Column: Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-emerald-200">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-6.75 3.524z" />
                    </svg>
                    <span>Secure Privacy-Compliant Education</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Educational Institutions
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Securely erase student and staff sensitive data permanently
                  from Chromebooks, PCs, laptops, and lab servers. Ensure 100%
                  compliance with FERPA and COPPA standards for student data
                  privacy while decommissioning old IT assets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton
                    onClick={() => setShowLicenseModal(true)}
                    variant="primary"
                    icon={<ChevronRight className="w-4 h-4" />}
                  >
                    Get Free Campus License
                  </ThemeButton>
                  <a
                    href="https://assets.dsecuretech.com/pdf/DSECURE_EDUCATION.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline}`}
                  >
                    Solution Overview
                    <span className="ml-2"><FileText className="w-5 h-5" /></span>
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["FERPA", "COPPA", "NIST 800-88", "GDPR"].map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Education Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <rect x="16" y="18" width="40" height="38" fill="#10b981" rx="3" />
                    <rect x="18" y="20" width="36" height="34" fill="#059669" rx="2" />
                    <rect x="33" y="8" width="6" height="12" fill="#059669" rx="1" />
                    <polygon points="36,5 42,11 36,11" fill="#10b981" />
                    {[22, 32, 42].map(x =>
                      [24, 34].map(y => (
                        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" fill="#d1fae5" rx="0.5" />
                      ))
                    )}
                    <rect x="30" y="42" width="12" height="14" fill="#047857" rx="2" />
                    <circle cx="39" cy="50" r="1" fill="#6ee7b7" />
                    <rect x="12" y="56" width="48" height="4" fill="#10b981" rx="1" />
                    <rect x="10" y="60" width="52" height="3" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="CAMPUS"
                devices={[
                  {
                    label: "CHROMEBOOK",
                    icon: <Laptop className="w-6 h-6 text-emerald-600" />,
                  },
                  {
                    label: "LAB PC",
                    icon: <Monitor className="w-6 h-6 text-teal-600" />,
                  },
                  {
                    label: "SERVER",
                    icon: <Server className="w-6 h-6 text-emerald-600" />,
                  },
                  {
                    label: "TABLET",
                    icon: <Smartphone className="w-6 h-6 text-teal-600" />,
                  },
                  {
                    label: "STORAGE",
                    icon: <HardDrive className="w-6 h-6 text-emerald-600" />,
                  },
                ]}/>
            </div>
          </div>
        </section>


        {/* Compliance Section */}
        <ThemeSection id="compliance" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
                Education Privacy & Standards
              </span>
              <ThemeSectionHeading centered>
                Strict Compliance for Institutions
              </ThemeSectionHeading>
              <p className="text-lg max-w-2xl mx-auto text-slate-600 mt-4">
                Meet student data protection laws with our auditable
                sanitization solutions for schools and universities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "FERPA Compliance",
                  desc: "Protect student educational records during equipment disposal to ensure Family Educational Rights and Privacy Act adherence.",
                  icon: GraduationCap,
                },
                {
                  title: "COPPA Readiness",
                  desc: "Comply with Children's Online Privacy Protection Act by permanently deleting kids' personal data from school-issued devices.",
                  icon: ShieldCheck,
                },
                {
                  title: "NIST 800-88",
                  desc: "Follow the latest U.S. federal media sanitization guidelines to render data completely unrecoverable by forensic tools.",
                  icon: FileText,
                },
                {
                  title: "Tamper-evident Reports",
                  desc: "Automated compliance-verified certificates generated for every asset wiped, providing a clear audit trail for regulators.",
                  icon: CheckCircle,
                },
              ].map((comp) => (
                <ThemeCard key={comp.title} className="p-8">
                  <div className="mb-6">
                    <ThemeIconContainer icon={comp.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>
                    {comp.title}
                  </h3>
                  <p className={`${themeClasses.typography.cardBody}`}>
                    {comp.desc}
                  </p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* Supported Assets Section */}
        <ThemeSection id="assets" noBg className="bg-[#0a2e1e] [&_h2]:!text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-900/50 text-emerald-100 mb-4 border border-emerald-500/30">
                Hardware Support
              </span>
              <ThemeSectionHeading centered>
                Erase Campus IT Assets
              </ThemeSectionHeading>
              <p className="text-lg max-w-none mx-auto text-emerald-100 mt-4 whitespace-nowrap">
                Supporting a wide range of devices found in modern educational environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Laptop,
                  title: "Chromebooks",
                  desc: "Bulk wiping for student laptops and education-grade devices.",
                },
                {
                  icon: Monitor,
                  title: "Lab PCs & Macs",
                  desc: "Sanitize high-performance workstations in research and computer labs.",
                },
                {
                  icon: Server,
                  title: "School Servers",
                  desc: "Securely erase server-side student information and admin records.",
                },
                {
                  icon: Smartphone,
                  title: "Staff Tablets",
                  desc: "Sanitize iOS and Android devices used by faculty and staff.",
                },
              ].map((asset) => (
                <ThemeCard key={asset.title} className="flex flex-col items-center text-center p-8">
                  <div className="mb-6">
                    <ThemeIconContainer icon={asset.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>
                    {asset.title}
                  </h3>
                  <p className={`${themeClasses.typography.cardBody}`}>
                    {asset.desc}
                  </p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* School Solutions Section */}
        <ThemeSection id="solutions" noBg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ThemeSectionHeading>
                  Institutional Grade Data Disposal
                </ThemeSectionHeading>
                <p className="text-lg mb-8 text-slate-600 mt-4">
                  Educational institutions frequently upgrade technology. We
                  help IT departments manage large-scale data destruction
                  efficiently without physical disk destruction, promoting green
                  campus initiatives.
                </p>
                <ul className="space-y-4">
                  {[
                    "Network PXE booting (Coming Soon) for mass wiping of entire computer labs",
                    "USB sanitization for hybrid work laptops and off-site staff",
                    "Cloud-based management for central tracking across multiple campuses",
                    "Sustainability-focused disposal through high-grade reusable wiping",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ThemeCard className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                  Why Education Leaders Trust D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Compliance Verification
                    </h3>
                    <p className="text-sm text-slate-600">
                      Generate auditable proofs for State and Federal privacy
                      auditors.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Asset Lifetime Value
                    </h3>
                    <p className="text-sm text-slate-600">
                      Erase data while keeping the hardware intact for resale or
                      donations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Campus-Wide Centralization
                    </h3>
                    <p className="text-sm text-slate-600">
                      Manage all student data sanitization from a single web
                      dashboard.
                    </p>
                  </div>
                </div>
              </ThemeCard>
            </div>
          </div>
        </ThemeSection>

        {/* FAQ Section */}
        <ThemeSection id="faq" alternate>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThemeSectionHeading centered subtitle="Common queries for institutional IT teams">
              Frequently Asked Questions
            </ThemeSectionHeading>
            <div className="space-y-6 mt-8">
              {[
                {
                  q: "How does D-Secure ensure FERPA compliance?",
                  a: "D-Secure uses NIST-level wiping to ensure all personally identifiable information (PII) of students is non-recoverable, and then creates a compliance-verified audit report as proof for regulators.",
                },
                {
                  q: "Can we wipe devices across different campus buildings?",
                  a: "Yes, our cloud console allows you to manage erasure tasks across geographically dispersed campus sites, providing real-time visibility into every asset being sanitized.",
                },
                {
                  q: "Is it possible to donate old school computers securely?",
                  a: "Absolutely. D-Secure wipes the storage data but keeps the device working perfectly. You can donate sanitized PCs with a Compliance Certificate to ensure the school's data never leaves the campus.",
                },
                {
                  q: "What standards are used for institutional wiping?",
                  a: "We support NIST 800-88, US Department of Defense (DoD), and other international sanitization standards to ensure the highest level of information security.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white border border-[#d0d5dc]/60 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <span className="text-lg font-bold pr-6 text-[#151e29] group-open:text-[#0a2e1e] transition-colors">{faq.q}</span>
                    <span className="transition-transform group-open:rotate-180 text-emerald-600 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection
          source="Education Solutions Page"
          subjectPrefix="New Inquiry - Education Solutions"
        />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free Campus License - Education"
        />
      )}
    </>
  );
};

export default EducationPage;
