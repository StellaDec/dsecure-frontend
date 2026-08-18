import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeIconContainer, ThemeButton, themeClasses } from "@/components/ui/Theme";
import { FileText, ShieldCheck, Globe, Lock, Monitor, HardDrive, Smartphone, File, Server, CheckCircle, Network, Usb, Cloud, Shield } from "lucide-react";

/**
 * HealthcareSolutionsPage Component
 * Is page mein Healthcare aur Insurance sector ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const HealthcareSolutionsPage: React.FC = () => {
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

  // Smooth scroll function
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

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("solutions/healthcare")} />

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
        <ThemeSection
          id="overview"
          className="min-h-[600px] flex items-start pt-8 lg:pt-12 pb-8 lg:pb-12 relative overflow-hidden"
          noBg
        >
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

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
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure HIPAA Compliant Healthcare</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Healthcare & Insurance Sector
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Securely erase PHI and ePHI permanently from drives, PCs,
                  laptops, Macs, servers, and mobile devices. Ensure 100%
                  compliance with HIPAA, GDPR, and NIST 800-88 standards for
                  data sanitization.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton onClick={() => setShowLicenseModal(true)}>
                    Request Free License
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </ThemeButton>
                  <a
                    href="https://assets.dsecuretech.com/pdf/DSECURE_HEALTH.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto gap-2`}
                  >
                    <FileText className="w-5 h-5" />
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["HIPAA", "GDPR", "HITECH", "NIST 800-88"].map((badge) => (
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

              {/* Right Column: Interactive Healthcare Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <rect x="18" y="14" width="36" height="42" fill="#10b981" rx="3" />
                    <rect x="20" y="16" width="32" height="38" fill="#059669" rx="2" />
                    <rect x="32" y="22" width="8" height="20" fill="#d1fae5" rx="1" />
                    <rect x="26" y="28" width="20" height="8" fill="#d1fae5" rx="1" />
                    <rect x="22" y="44" width="6" height="4" fill="#d1fae5" rx="0.5" />
                    <rect x="44" y="44" width="6" height="4" fill="#d1fae5" rx="0.5" />
                    <rect x="31" y="46" width="10" height="10" fill="#047857" rx="1.5" />
                    <rect x="14" y="56" width="44" height="4" fill="#10b981" rx="1" />
                    <rect x="12" y="60" width="48" height="3" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="HEALTH"
                devices={[
                  {
                    label: "PC/MAC",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
                  },
                  {
                    label: "LAPTOP",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M2 19h20" /></svg>,
                  },
                  {
                    label: "SERVER",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" /><circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" /><line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" /></svg>,
                  },
                  {
                    label: "MOBILE",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" /></svg>,
                  },
                  {
                    label: "STORAGE",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" /><circle cx="17" cy="12" r="1.5" fill="#16a34a" stroke="none" /><line x1="5" y1="10" x2="12" y2="10" /><line x1="5" y1="14" x2="9" y2="14" /></svg>,
                  },
                ]}
              />
            </div>
          </div>
        </ThemeSection>

        {/* Compliance Section */}
        <ThemeSection id="compliance" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
                Regulation & Standards
              </span>
              <ThemeSectionHeading centered>
                Stay Compliant with D-Secure
              </ThemeSectionHeading>
              <p className="text-lg max-w-2xl mx-auto text-slate-600 mt-4">
                Meet the most stringent healthcare data protection laws globally
                with our auditable sanitization solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "HIPAA Security Rule",
                  desc: "Safeguard PHI and ePHI with US DoD 5220.22 or NIST 800-88 wiping methods to render data unrecoverable.",
                  icon: ShieldCheck,
                },
                {
                  title: "EU-GDPR Readiness",
                  desc: "Comply with Article 17 (Right to Erasure) and Article 32 (Security of Processing) with permanent data deletion.",
                  icon: Globe,
                },
                {
                  title: "HITECH Act",
                  desc: "Maintain detailed audit trails and tamper-evident certificates to reduce data breach risks and meet HITECH requirements.",
                  icon: Lock,
                },
              ].map((comp, idx) => (
                <ThemeCard key={idx} className="flex flex-col items-start p-6">
                  <div className="mb-6">
                    <ThemeIconContainer icon={comp.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{comp.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{comp.desc}</p>
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
                Device Support
              </span>
              <ThemeSectionHeading centered>
                Sanitize Every Asset
              </ThemeSectionHeading>
              <p className="text-lg max-w-2xl mx-auto text-emerald-100 mt-4">
                Wipe patient records from any device, anywhere, with D-Secure tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Monitor,
                  title: "PCs & Laptops",
                  desc: "Securely wipe Windows, Mac, and Chromebooks.",
                },
                {
                  icon: HardDrive,
                  title: "Drives & Servers",
                  desc: "Sanitize HDD, SSD, and large-scale server racks.",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Devices",
                  desc: "Regulatory erasure for iOS and Android tablets/phones.",
                },
                {
                  icon: File,
                  title: "Files & Folders",
                  desc: "Remote wiping of specific records without losing the OS.",
                },
              ].map((asset, idx) => (
                <ThemeCard key={idx} className="flex flex-col items-center text-center p-8">
                  <div className="mb-6">
                    <ThemeIconContainer icon={asset.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{asset.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{asset.desc}</p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* Industry Solutions Section */}
        <ThemeSection id="solutions" noBg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ThemeSectionHeading>
                  Ideal for Healthcare & Insurance Providers
                </ThemeSectionHeading>
                <p className="text-lg mb-8 text-slate-600 mt-4">
                  Whether you are retiring legacy systems, repurposing
                  equipment, or fulfilling "Right to be Forgotten" requests,
                  D-Secure provides the tools to ensure patient privacy remains
                  intact.
                </p>
                <ul className="space-y-4">
                  {[
                    "PXE Boot solution for mass wiping of network servers",
                    "USB Boot solution for on-site standalone machine erasure",
                    "MSI Package for remote Windows endpoint wiping",
                    "Centralized Cloud Console for license & report management",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ThemeCard className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                  Why Choose D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Audit-Ready Reporting
                    </h3>
                    <p className="text-sm text-slate-600">
                      Generate tamper-evident audit trails for every erasure task
                      instantly.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Global Standards
                    </h3>
                    <p className="text-sm text-slate-600">
                      Support for NIST, DoD, and other major international
                      standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Scalable Architecture
                    </h3>
                    <p className="text-sm text-slate-600">
                      Erase one file or 65,000 servers. D-Secure scales with your
                      organization.
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
            <ThemeSectionHeading centered>
              Healthcare Solutions FAQs
            </ThemeSectionHeading>
            <div className="space-y-6 mt-8">
              {[
                {
                  q: "How does D-Secure help with HIPAA compliance?",
                  a: "D-Secure uses industry-standard wiping methods (NIST 800-88, DoD) to permanently erase PHI from medical devices and drives, providing a tamper-evident certificate as proof of compliance for audits.",
                },
                {
                  q: "Can I erase medical devices remotely?",
                  a: "Yes, our MSI package and remote console allow you to target endpoint devices and computers over your network without physical presence, provided they are connected.",
                },
                {
                  q: "What types of health records can be erased?",
                  a: "You can erase entire drives (HDD/SSD), individual files/folders containing EMR/EHR, or even clear free space where deleted files might still reside.",
                },
                {
                  q: "Do you support offline wiping for high-security labs?",
                  a: "Yes, our USB Boot solution is perfect for isolated environments. Reports can be saved locally and synced later to the cloud console.",
                },
              ].map((faq, idx) => (
                <details key={idx} className="group bg-white border border-[#d0d5dc]/60 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <span className="text-lg font-bold pr-6 text-[#151e29] group-open:text-[#0a2e1e] transition-colors">{faq.q}</span>
                    <span className="transition-transform group-open:rotate-180 text-emerald-600 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-base leading-relaxed text-[#5a6672] border-t border-[#d0d5dc]/30 pt-4 mt-2 hidden group-open:block">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Healthcare Solutions Page" subjectPrefix="New Inquiry - Healthcare Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Healthcare"
        />
      )}
    </>
  );
};

export default HealthcareSolutionsPage;
