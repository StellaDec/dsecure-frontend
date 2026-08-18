import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm, PartnershipForm } from "@/components/forms";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeIconContainer, ThemeButton, themeClasses } from "@/components/ui/Theme";
import { Monitor, Server, Smartphone, Cloud, Calendar, MapPin, FolderOpen, FileText, CheckCircle, Eraser, Network } from "lucide-react";

/**
 * ServiceProvidersSolutionsPage Component
 * MSP aur System Integrators ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme aur structure par based hai.
 */
const ServiceProvidersSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  // Secondary navbar items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "assets", label: "Assets" },
    { id: "compliance", label: "Compliance" },
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
      <SEOHeadNative seo={getSEOForPage("solutions/service-providers")} />

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
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936v4.444c0 4.635-3.044 8.718-7.5 10.12-4.456-1.402-7.5-5.485-7.5-10.12V5.836a1 1 0 01.666-.936zM10 3.3L3.5 6.1v3.9c0 3.654 2.308 6.942 6.5 8.2 4.192-1.258 6.5-4.546 6.5-8.2V6.1L10 3.3z" clipRule="evenodd" />
                    </svg>
                    <span>Empowering MSPs with Scalable Security</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                    Managed Service Providers
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Securely erase clients' data across every endpoint. D-Secure provides MSPs and System Integrators with 
                  enterprise-grade sanitization tools and centralized audit trails to ensure compliance and risk-free disposal.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ThemeButton onClick={() => setShowLicenseModal(true)}>
                    Request Free License
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </ThemeButton>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${themeClasses.button.base} ${themeClasses.button.outline} w-full sm:w-auto gap-2 pointer-events-none opacity-50 cursor-not-allowed`}
                  >
                    <FileText className="w-5 h-5" />
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["NIST 800-88", "PCI-DSS", "HIPAA", "GDPR"].map((badge) => (
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

              {/* Right Column: Interactive MSP Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <circle cx="36" cy="36" r="28" fill="#10b981" />
                    <circle cx="36" cy="36" r="22" fill="#059669" />
                    <path d="M24 30 L36 22 L48 30 L48 42 L36 50 L24 42 Z" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.5" />
                    <circle cx="36" cy="36" r="6" fill="#047857" />
                    <circle cx="36" cy="36" r="3" fill="#10b981" />
                  </svg>
                }
                centerLabel="MSP HUB"
                devices={[
                  {
                    label: "ENDPOINT",
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
                    label: "CLOUD",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>,
                  },
                ]}
              />
            </div>
          </div>
        </ThemeSection>


        {/* Capabilities Section */}
        <ThemeSection id="capabilities" alternate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:md:mb-16">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
                Comprehensive Capabilities
              </span>
              <ThemeSectionHeading centered>
                Profit from Professional Sanitization
              </ThemeSectionHeading>
              <p className="text-lg max-w-3xl mx-auto text-slate-600 mt-4">
                D-Secure provides the flexibility to offer data erasure as a managed service, onsite or remotely, 
                with full audit readiness for every client project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Scheduled Sanitization",
                  desc: "Configure recurring erasure tasks to prevent sensitive data accumulation on client workstations & servers.",
                  icon: Calendar,
                },
                {
                  title: "Onsite & Offsite Erasure",
                  desc: "Flexible deployment via USB boot or PXE network to handle client relocations or data center decommissioning.",
                  icon: Network,
                },
                {
                  title: "Mobile Force Diagnostics",
                  desc: "Unified interface for rapid diagnosis and secure wiping of Android and iOS fleets with automated reporting.",
                  icon: Smartphone,
                },
                {
                  title: "Cloud Admin Console",
                  desc: "Global visibility of erasure records and centralized license management through a tamper-evident repository.",
                  icon: Cloud,
                },
              ].map((item) => (
                <ThemeCard key={item.title} className="p-8">
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

        <ThemeSection id="assets" noBg className="overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <ThemeSectionHeading centered>
                One Solution for All Client Media
              </ThemeSectionHeading>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12 md:mb-16">
              {[
                {
                  title: "Endpoints & Portables",
                  desc: "PC, Laptop, Mac® & Chromebooks",
                  icon: Monitor,
                },
                {
                  title: "Data Centers",
                  desc: "Rackmount Servers & RAID Storage",
                  icon: Server,
                },
                {
                  title: "Specific Files",
                  desc: "Folders, Volumes & Network Shared Drives",
                  icon: FolderOpen,
                },
              ].map((item) => (
                <ThemeCard key={item.title} className="p-8">
                  <div className="mb-6">
                    <ThemeIconContainer icon={item.icon} size="lg" />
                  </div>
                  <h3 className={`${themeClasses.typography.cardTitle}`}>{item.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{item.desc}</p>
                </ThemeCard>
              ))}
            </div>

            <div className="max-w-3xl">
              <div className="flex flex-col gap-5">
                {[
                  "Erase loose drives in bulk at high-speed",
                  "Handle Apple M1/M2/M3 chips and T2 security Macs effortlessly",
                  "Support for 14+ international erasure standards",
                  "Customizable reports with company logo & watermarking",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-lg font-medium text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* Compliance Section */}
        <ThemeSection id="compliance" noBg className="bg-[#0a2e1e] [&_h2]:!text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <ThemeSectionHeading centered>
                Regulatory & Audit Readiness
              </ThemeSectionHeading>
              <p className="text-lg max-w-2xl mx-auto text-emerald-100 mt-4">
                Generate verifiable, tamper-evident audit trails for every sanitized asset to meet your client's compliance needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "NIST 800-88", desc: "Adherence to Clear and Purge methods for all modern media types." },
                { title: "PCI-DSS", desc: "Secure disposal of cardholder data rendering it completely unrecoverable." },
                { title: "HIPAA", desc: "Maintain patient privacy through secure media sanitization protocols." },
                { title: "EU-GDPR", desc: "Enable the 'Right to Erasure' as a service for your global clients." },
              ].map((item) => (
                <ThemeCard key={item.title} className="p-8">
                  <h3 className={`${themeClasses.typography.cardTitle} mb-3`}>{item.title}</h3>
                  <p className={`${themeClasses.typography.cardBody}`}>{item.desc}</p>
                </ThemeCard>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* FAQ Section */}
        <ThemeSection id="faq" alternate>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThemeSectionHeading centered>
              MSP Partner FAQs
            </ThemeSectionHeading>
            <p className="text-lg text-center text-slate-600 mt-4 mb-8">
              Frequently asked questions regarding our service providers data erasure platform
            </p>
            <div className="space-y-6">
              {[
                {
                  q: "How many drives can we wipe simultaneously as an MSP?",
                  a: "Administrators can perform centralized network wiping on up to 65,000 drives simultaneously using PXE boot, targeting servers across global branch networks or data centers.",
                },
                {
                  q: "Do the data erasure licenses expire?",
                  a: "No, D-Secure licenses do not expire over time. You have the freedom to use your purchased licenses whenever required for your client projects without worrying about a deadline.",
                },
                {
                  q: "Can we use the solution in zero-internet environments?",
                  a: "Yes, our standalone USB boot solution allows for onsite machine erasure where internet connectivity is prohibited or unavailable, with reports saved locally.",
                },
                {
                  q: "Is it possible to customize the reports for our clients?",
                  a: "Absolutely. You can customize the erasure reports with your company logo and watermarking through the cloud console to provide a branded experience for your clients.",
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
        <SolutionContactSection source="Service Providers Solutions Page" subjectPrefix="New Inquiry - Service Providers Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - MSP Solution"
        />
      )}

      {showPartnerModal && (
        <PartnershipForm
          onClose={() => setShowPartnerModal(false)}
          title="Register as a D-Secure Partner"
          preSelectedPartnerType="Consulting Partner"
        />
      )}
    </>
  );
};

export default ServiceProvidersSolutionsPage;
