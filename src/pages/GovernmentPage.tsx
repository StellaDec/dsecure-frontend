import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import {
  themeClasses,
  ThemeButton,
  ThemeCard,
  ThemeIconContainer,
  ThemeSection,
  ThemeSectionHeading,
} from "@/components/ui/Theme";
import {
  CheckCircle,
  Laptop,
  HardDrive,
  Smartphone,
  Network,
  Usb,
  Shield,
  Disc,
  File,
  FileText,
  Cloud
} from "lucide-react";

/**
 * GovernmentPage Component
 * Is page mein Government aur Defense bodies ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const GovernmentPage: React.FC = () => {
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

  // Smooth scroll function
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

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("solutions/government")} />

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
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936v4.444c0 4.635-3.044 8.718-7.5 10.12-4.456-1.402-7.5-5.485-7.5-10.12V5.836a1 1 0 01.666-.936z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Scalable Compliant</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Government
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  D-Secure helps government bodies and authorized vendors securely erase sensitive data from drives & devices.
                  Meeting NIST 800-88, DoD, and CMMC standards with automated audit trails.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton onClick={() => setShowLicenseModal(true)}>
                    Request Free License
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </ThemeButton>
                  <a
                    href="#"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto gap-2`}
                  >
                    <FileText className="w-5 h-5" />
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["NIST 800-88", "DoD 5220.22-M", "CMMC 2.0", "SOX"].map((badge) => (
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

              {/* Right Column: Interactive Government Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <ellipse cx="36" cy="16" rx="14" ry="8" fill="#10b981" />
                    <rect x="34" y="8" width="4" height="6" fill="#059669" rx="1" />
                    <rect x="12" y="22" width="48" height="4" fill="#6ee7b7" rx="1" />
                    {[16, 26, 36, 46].map(x => (
                      <rect key={x} x={x} y="26" width="5" height="24" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.7" rx="1" />
                    ))}
                    <rect x="31" y="38" width="10" height="13" fill="#047857" rx="1.5" />
                    <rect x="8" y="50" width="56" height="4" fill="#10b981" rx="1" />
                    <rect x="6" y="54" width="60" height="3" fill="#059669" rx="1" />
                    <rect x="4" y="57" width="64" height="3" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="GOVERNMENT"
                devices={[
                  {
                    label: "WORKSTATION",
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

        <ThemeSection id="compliance" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Regulation & Compliance
              </span>
            </div>
            <ThemeSectionHeading 
              centered
              subtitle="DSecure enables government organizations to completely sanitize media before it is transferred, disposed of, or reused according to global guidelines."
            >
              Meet Federal & State Regulations
            </ThemeSectionHeading>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "NIST 800-88", desc: "Adherence to Clear and Purge methods for all media types." },
                { title: "DoD 5220.22-M", desc: "Support for 3-pass and 7-pass military overwriting standards." },
                { title: "CMMC 2.0", desc: "Maintain cybersecurity maturity for defense contractual obligations." },
                { title: "SOX & HIPAA", desc: "Compliance for financial and health data held by public bodies." },
              ].map((item) => (
                <ThemeCard key={item.title}>
                  <div className="mb-6">
                    <ThemeIconContainer icon={CheckCircle} />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{item.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{item.desc}</p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* Assets Section */}
        <ThemeSection id="assets">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-600/5 blur-3xl rounded-full"></div>
                <div className="relative space-y-4">
                  <ThemeCard className="flex items-center gap-6 p-6">
                    <ThemeIconContainer icon={Laptop} size="lg" />
                    <div>
                      <h4 className="font-bold text-lg text-[#0a2e1e]">PC/Laptop/Mac</h4>
                      <p className="text-sm text-[#5a6672]">Sanitize workstations & endpoints</p>
                    </div>
                  </ThemeCard>
                  <ThemeCard className="flex items-center gap-6 p-6 ml-8">
                    <ThemeIconContainer icon={HardDrive} size="lg" />
                    <div>
                      <h4 className="font-bold text-lg text-[#0a2e1e]">Loose Drives</h4>
                      <p className="text-sm text-[#5a6672]">HDD, SSD, NVMe, SAS, etc.</p>
                    </div>
                  </ThemeCard>
                  <ThemeCard className="flex items-center gap-6 p-6">
                    <ThemeIconContainer icon={Smartphone} size="lg" />
                    <div>
                      <h4 className="font-bold text-lg text-[#0a2e1e]">Mobile Devices</h4>
                      <p className="text-sm text-[#5a6672]">iOS & Android Diagnostics & Erasure</p>
                    </div>
                  </ThemeCard>
                </div>
              </div>

              <div>
                <ThemeSectionHeading>
                  Secure Media Sanitization for the Entire Agency
                </ThemeSectionHeading>
                <div className="space-y-6 mt-8">
                  {[
                    "Wipe data at facilities with or without internet",
                    "Bulk erasure of drives at high-security defense establishments",
                    "Target loose drives in a rack or chassis with PXE boot (Coming Soon)",
                    "Generate tamper-evident audit trails for every sanitized asset",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-4">
                      <div className="mt-1">
                        <ThemeIconContainer icon={CheckCircle} size="md" />
                      </div>
                      <p className="text-lg font-medium text-[#334155] mt-2">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* Industry Solutions Section */}
        <ThemeSection id="solutions" noBg className="bg-[#0a2e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-900/50 text-emerald-100 border border-emerald-800">
                Flexible Solutions
              </span>
            </div>
            <div className="[&_h2]:!text-white">
              <ThemeSectionHeading centered>
                Erasure Solutions for Govt. Bodies
              </ThemeSectionHeading>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
              {[
                { 
                  title: "Network & PXE Wiping (Coming Soon)", 
                  desc: "Sanitize up to 65,000 devices simultaneously over a network using our scalable PXE boot (Coming Soon) variant.",
                  icon: Network
                },
                { 
                  title: "USB Boot (Offline)", 
                  desc: "Ideal for defense & research labs without internet. Perform erasure via bootable USB and save reports locally.",
                  icon: Usb
                },
                { 
                  title: "Cloud Admin Console", 
                  desc: "Centralized management of users, licenses, and repositories. Get global visibility of data destruction trails.",
                  icon: Cloud
                },
                { 
                  title: "Mobile Force Diagnostics", 
                  desc: "Minimize operational risk by diagnosing and erasing iOS and Android devices at high speed.",
                  icon: Shield
                },
                { 
                  title: "ISO Customization", 
                  desc: "Standardize the erasure process across all locations through cloud-hosted customized ISO files.",
                  icon: Disc
                },
                { 
                  title: "File Eraser Tool", 
                  desc: "Maintain data privacy by erasing unwanted files and traces regularly from Windows, Mac, or Linux systems.",
                  icon: File
                },
              ].map((card) => (
                <ThemeCard key={card.title} className="flex flex-col items-start p-6">
                  <div className="mb-6">
                    <ThemeIconContainer icon={card.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{card.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{card.desc}</p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* FAQ Section */}
        <ThemeSection id="faq" alternate>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThemeSectionHeading centered>
              Government Solutions FAQs
            </ThemeSectionHeading>
            <div className="space-y-6 mt-8">
              {[
                {
                  q: "Does D-Secure comply with NIST 800-88 and DoD data wiping standards?",
                  a: "Yes, D-Secure strictly adheres to global and federal data sanitization guidelines, including NIST 800-88 (Clear and Purge) and DoD 5220.22-M standards, ensuring compliance for all government agencies.",
                },
                {
                  q: "Can we use D-Secure in classified or zero-internet federal facilities?",
                  a: "Absolutely. Our 'Physically delivered' (Offline) variant is specifically designed for high-security establishments, military bases, and defense labs where internet connectivity is prohibited.",
                },
                {
                  q: "How are erasure reports managed for large government agencies and audits?",
                  a: "Digitally signed, tamper-evident Certificates of Erasure can be stored locally on encrypted USB sticks for offline use, or centrally aggregated in a secure repository for federal audit readiness.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white border border-[#d0d5dc]/60 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <span className="text-xl font-bold pr-6 text-[#151e29] group-open:text-[#0a2e1e] transition-colors">{faq.q}</span>
                    <span className="transition-transform group-open:rotate-180 text-emerald-600 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-lg leading-relaxed text-[#5a6672] border-t border-[#d0d5dc]/30 pt-4 mt-2 hidden group-open:block">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Government Solutions Page" subjectPrefix="New Inquiry - Government Solutions" />

      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Government"
        />
      )}
    </>
  );
};

export default GovernmentPage;
