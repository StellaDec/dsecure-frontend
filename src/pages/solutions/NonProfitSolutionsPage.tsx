import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeIconContainer, ThemeButton, themeClasses } from "@/components/ui/Theme";
import { Gift, Globe, FileText, Smartphone, Cloud, LinkIcon, Monitor, HardDrive, Server, CheckCircle, File } from "lucide-react";

/**
 * NonProfitSolutionsPage Component
 * Non-Profit Organizations (NGOs/Charities) ke liye modern data security aur sanitization solutions prashast karta hai.
 * Yeh page robust lifecycle standardizations aur secure reporting features par aadharit hai.
 */
const NonProfitSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Secondary navbar ke items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "use-cases", label: "Use Cases" },
    { id: "assets", label: "Assets" },
    { id: "compliance", label: "Compliance" },
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
      <SEOHeadNative seo={getSEOForPage("solutions/non-profit")} />

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
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure Data Disposal for Social Impact</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Non-Profit Organizations
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Comply with data privacy laws by securely erasing sensitive
                  donor, beneficiary, and financial records from drives and
                  devices before reuse, donation, or disposal. D-Secure helps
                  NGOs and charities protect community trust through
                  cost-effective, audit-ready data sanitization.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton onClick={() => setShowLicenseModal(true)}>
                    Request Free License
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </ThemeButton>
                  <a
                    href="https://assets.dsecuretech.com/pdf/DSECURE_NPO%20SOLN.pdf"
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
                  {["NIST 800-88", "GDPR", "HIPAA", "ISO 27001"].map(
                    (badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                          {badge}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Non-Profit Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <path d="M36 6 L58 16 L58 38 C58 50 48 60 36 66 C24 60 14 50 14 38 L14 16 Z" fill="#10b981" />
                    <path d="M36 10 L54 18 L54 38 C54 48 46 56 36 62 C26 56 18 48 18 38 L18 18 Z" fill="#059669" />
                    <path d="M36 28 C36 24 30 20 26 24 C22 28 26 34 36 42 C46 34 50 28 46 24 C42 20 36 24 36 28Z" fill="#d1fae5" />
                  </svg>
                }
                centerLabel="NON-PROFIT"
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


        {/* ================= USE CASES SECTION ================= */}
        <ThemeSection id="use-cases" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
                Use Cases
              </span>
              <ThemeSectionHeading centered>
                Reliable, Efficient & Cost-Effective Data Wiping
              </ThemeSectionHeading>
              <p className="text-lg max-w-3xl mx-auto text-slate-600 mt-4">
                Whether you are donating devices, retiring legacy systems, or
                managing beneficiary records, D-Secure ensures your
                organization's data never falls into the wrong hands.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Device Donation & Reuse",
                  desc: "Securely wipe drives and devices using globally recognized erasure standards before donating them for a noble cause. Permanently remove donor, beneficiary, and financial records before reuse.",
                  icon: Gift,
                },
                {
                  title: "Bulk Erasure at Remote Locations",
                  desc: "Wipe 100 drives in a chassis or up to 65,000 over a network using PXE boot (Coming Soon). Deploy erasure at facilities without internet through offline USB boot.",
                  icon: Globe,
                },
                {
                  title: "Automated File-Level Erasure",
                  desc: "Schedule erasure of sensitive files, funding details, and PII at regular intervals. Erase specific records without affecting the operating system or other applications.",
                  icon: File,
                },
                {
                  title: "Mobile Device Management",
                  desc: "Simultaneously erase and diagnose up to 40 iOS and Android devices. Safely reuse donated phones for field staff and volunteers after Enterprise-grade data erasure.",
                  icon: Smartphone,
                },
                {
                  title: "Cloud Console Management",
                  desc: "Centralized admin console for managing users, licenses, and reports. Customize ISO to standardize erasure across all branch locations worldwide.",
                  icon: Cloud,
                },
                {
                  title: "Remote Endpoint Wiping",
                  desc: "Remotely wipe data from Windows endpoint devices via MSI package. Deploy locally or through management tools without physical access to computers.",
                  icon: LinkIcon,
                },
              ].map((item) => (
                <ThemeCard key={item.title} className="flex flex-col items-start p-6">
                  <div className="mb-6">
                    <ThemeIconContainer icon={item.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{item.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{item.desc}</p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= SUPPORTED ASSETS SECTION ================= */}
        <ThemeSection id="assets" noBg className="bg-[#0a2e1e] [&_h2]:!text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-900/50 text-emerald-100 mb-4 border border-emerald-500/30">
                Device Support
              </span>
              <ThemeSectionHeading centered>
                One Solution for All Device Types
              </ThemeSectionHeading>
              <p className="text-lg max-w-2xl mx-auto text-emerald-100 mt-4">
                Sanitize donor records and beneficiary data from any device —
                whether at your main office or remote field locations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Monitor,
                  title: "PCs, Laptops & Macs",
                  desc: "Securely wipe Windows, Mac, and Chromebooks. Support for Apple Silicon (M1–M4) and Intel-based Macs.",
                },
                {
                  icon: HardDrive,
                  title: "Drives of All Types",
                  desc: "Erase SATA, PATA, HDD, SSD, NVMe, and M.2 drives. Wipes user-inaccessible areas like HPA & DCO.",
                },
                {
                  icon: Server,
                  title: "Servers & Data Centers",
                  desc: "Centralized wiping of up to 65,000 server drives simultaneously over a network using PXE boot (Coming Soon).",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Devices",
                  desc: "compliant erasure for iOS and Android phones and tablets. 50+ diagnostic tests for device health assessment.",
                },
              ].map((asset) => (
                <ThemeCard key={asset.title} className="flex flex-col items-center text-center p-8">
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

        {/* ================= COMPLIANCE SECTION ================= */}
        <ThemeSection id="compliance" noBg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ThemeSectionHeading>
                  Audit-Ready Compliance for Non-Profits
                </ThemeSectionHeading>
                <p className="text-lg mb-8 text-slate-600 mt-4">
                  Generate verifiable, tamper-evident audit trails for every
                  sanitized asset. Meet data privacy laws that mandate secure
                  disposal — whether for funding organizations, board reporting,
                  or partner transparency requirements.
                </p>
                <ul className="space-y-4">
                  {[
                    "Tamper-evident erasure certificates for audit purposes",
                    "Compliance with EU-GDPR, HIPAA, PCI-DSS, CCPA & DPDPA",
                    "Software-based certificates as proof of secure sanitization",
                    "Centralized cloud repository for all reports & certificates",
                    "ISO customization to standardize erasure across locations",
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
                  Why Choose D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Sustainable Data Disposal
                    </h3>
                    <p className="text-sm text-slate-600">
                      Securely sanitize devices for donation and reuse instead of
                      physical destruction — reducing e-waste and extending
                      device lifecycles.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Cost-Effective for NGOs
                    </h3>
                    <p className="text-sm text-slate-600">
                      Licenses never expire. Use them whenever required for
                      projects without worrying about deadlines or recurring
                      costs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Global Scalability
                    </h3>
                    <p className="text-sm text-slate-600">
                      From a single office workstation to 65,000 distributed
                      servers — D-Secure scales with your organization's mission.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-1">
                      Offline & Remote Support
                    </h3>
                    <p className="text-sm text-slate-600">
                      Perform erasure at facilities without internet using USB
                      boot. Reports are saved locally and can be synced later.
                    </p>
                  </div>
                </div>
              </ThemeCard>
            </div>
          </div>
        </ThemeSection>

        {/* ================= FAQ SECTION ================= */}
        <ThemeSection id="faq" alternate>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThemeSectionHeading centered>
              Non-Profit Solutions FAQs
            </ThemeSectionHeading>
            <div className="space-y-6 mt-8">
              {[
                {
                  q: "How many drives can we wipe simultaneously?",
                  a: "You can wipe up to 100 drives at a time on a single machine using USB boot. For network-based erasure, you can simultaneously wipe up to 65,000 drives over PXE boot (Coming Soon), making it ideal for large-scale operations across multiple offices.",
                },
                {
                  q: "Do D-Secure licenses expire?",
                  a: "No, D-Secure licenses do not expire. You have the freedom to use purchased licenses whenever required for your projects without worrying about a deadline or recurring subscription costs.",
                },
                {
                  q: "Can we perform erasure at locations without internet access?",
                  a: "Yes, our standalone USB boot solution enables secure drive wiping at facilities without internet connectivity. Reports are saved locally and can be synced to the cloud console when connectivity is available.",
                },
                {
                  q: "Does D-Secure help with regulatory compliance?",
                  a: "Yes. D-Secure performs secure erasure on devices and generates verifiable audit trails that help comply with global data protection laws like EU-GDPR, HIPAA, CCPA, GLBA, and DPDPA. Every erasure produces a tamper-evident certificate.",
                },
                {
                  q: "Can we customize the erasure reports with our organization's branding?",
                  a: "Yes, you can customize the ISO and erasure reports through the cloud console. This standardizes erasure at all locations, and you can add your organization's logo and watermarking to the generated reports.",
                },
                {
                  q: "Is there support for mobile device erasure and diagnostics?",
                  a: "Yes, D-Secure supports simultaneous erasure and diagnostics of up to 40 iOS and Android devices. You can run 50+ health-check tests to assess device condition before deciding on reuse or disposal.",
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
                  <div className="px-6 pb-6 text-base leading-relaxed text-[#5a6672] border-t border-[#d0d5dc]/30 pt-4 mt-2 hidden group-open:block">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Non-Profit Solutions Page" subjectPrefix="New Inquiry - Non-Profit Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Non-Profit"
        />
      )}
    </>
  );
};

export default NonProfitSolutionsPage;
