import React, { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import { Link } from "react-router-dom";
import { 
  Cloud, 
  Shield, 
  Zap, 
  Key, 
  Activity, 
  FileText, 
  ChevronRight, 
  BookOpen,
  CheckCircle,
  Settings,
  Search,
  Lock
} from "lucide-react";

// Navigation tree for sidebar
const navigationTree = [
  {
    id: "security-management",
    label: "Security Management",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "core-features",
    label: "Core Features",
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: "data-discovery", label: "Data Discovery" },
      { id: "access-control", label: "Access Control" },
      { id: "compliance-monitoring", label: "Compliance Monitoring" },
    ],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    icon: <Cloud className="w-4 h-4" />,
  },
  {
    id: "best-practices",
    label: "Best Practices",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    id: "compliance",
    label: "Compliance Standards",
    icon: <FileText className="w-4 h-4" />,
  },
];

const Anchor: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <section id={id} className="scroll-mt-32 mb-16">
    {children}
  </section>
);

const CloudConsoleGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("security-management");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0% -70% 0%" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("cloud-console-guide")} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex text-sm font-medium text-slate-500">
              <Link
                to="/support"
                className="hover:text-emerald-600 transition-colors"
              >
                Support
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 mt-0.5" />
              <Link
                to="/support/knowledge-base"
                className="hover:text-emerald-600 transition-colors"
              >
                Knowledge Base
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 mt-0.5" />
              <span className="text-slate-900">Cloud Console Guide</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
                    Guide Navigation
                  </h3>
                  <nav className="space-y-1">
                    {navigationTree.map((item) => (
                      <div key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeSection === item.id ||
                            item.children?.some((c) => c.id === activeSection)
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="mr-3 text-slate-400">
                            {item.icon}
                          </span>
                          {item.label}
                        </button>
                        {item.children && (
                          <div className="ml-9 mt-1 space-y-1 border-l border-slate-200">
                            {item.children.map((child) => (
                              <button
                                key={child.id}
                                onClick={() => scrollToSection(child.id)}
                                className={`w-full text-left px-4 py-1.5 text-xs font-medium transition-all duration-200 border-l-2 -ml-[2px] ${
                                  activeSection === child.id
                                    ? "border-emerald-500 text-emerald-700 bg-emerald-50/50"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                {child.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Internal Links Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
                  <h3 className="font-bold mb-3 flex items-center text-emerald-400">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Deep Dive
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/support/ssd-cryptographic-erasure-guide"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        SSD Crypto Erasure
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/mac-eraser-guide"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Mac Sanitization
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/help-manual/complete-manual"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        File & Folder Erasure
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/retain-os-guide"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Retain OS Guide
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/help-manual/complete-diagnostic-manual"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Diagnostic Manual
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Reveal>
                <header className="mb-12">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                    Cloud Management
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Cloud Console{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      Guide
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                    Centralized platform for managing enterprise data security,
                    compliance reporting, and access control across hybrid cloud
                    environments.
                  </p>
                </header>
              </Reveal>

              <Anchor id="security-management">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Security Management Overview
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    The D-Secure Cloud Console acts as the central brain for
                    your data sanitization operations. It integrates seamlessly
                    with our{" "}
                    <Link
                      to="/support/mac-eraser-guide"
                      className="text-emerald-600 hover:underline"
                    >
                      Mac Erase
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/support/secure-erase-hddssd"
                      className="text-emerald-600 hover:underline"
                    >
                      HDD/SSD Wipe
                    </Link>{" "}
                    tools to provide real-time visibility into every erasure
                    task performed within your organization.
                  </p>
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
                    <div className="flex">
                      <Shield className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-emerald-900 font-bold mb-1">
                          Unified Protection
                        </h3>
                        <p className="text-emerald-800 text-sm">
                          Our console ensures that whether data is on a physical
                          disk or in a cloud instance, it is managed under a
                          single, audit-ready security policy fulfilling{" "}
                          <Link
                            to="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                            className="font-semibold hover:underline"
                          >
                            NIST 800-88 standards
                          </Link>
                          . For comprehensive system reporting, see our{" "}
                          <Link
                            to="/support/manual/diagnostic-manual"
                            className="font-semibold hover:underline text-emerald-900"
                          >
                            Diagnostic Manual
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Anchor>

              <Anchor id="core-features">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 px-4 border-l-4 border-emerald-500">
                  Core Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div
                    id="data-discovery"
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Data Discovery
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Automatically identify sensitive data across all
                      endpoints. Integrated with our{" "}
                      <Link
                        to="/products/file-eraser"
                        className="text-emerald-600 hover:underline"
                      >
                        File Eraser
                      </Link>{" "}
                      for targeted sanitization of discovered PII.
                    </p>
                  </div>
                  <div
                    id="access-control"
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Access Control
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Role-based access management (RBAC) ensures only
                      authorized technicians can initiate high-level{" "}
                      <Link
                        to="/support/ssd-cryptographic-erasure-guide"
                        className="text-emerald-600 hover:underline"
                      >
                        Cryptographic Erasure
                      </Link>{" "}
                      commands.
                    </p>
                  </div>
                </div>
              </Anchor>

              <Anchor id="getting-started">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Getting Started
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Account Activation",
                      content:
                        "Register your organization and activate your Cloud Console instance. Link your licensing to enable remote execution capabilities for our support guides.",
                    },
                    {
                      step: 2,
                      title: "License Allocation",
                      content:
                        "Allocate erasure licenses to specific technicians or site locations. Use these licenses to perform <Link to='/support/sas-wipe-guide' class='text-emerald-600 hover:underline'>Enterprise SAS Wiping</Link> on remote servers.",
                    },
                    {
                      step: 3,
                      title: "Policy Deployment",
                      content:
                        "Define your global sanitization standards. Choose between single-pass overwriting or advanced <Link to='/support/ssd-cryptographic-erasure-guide' class='text-emerald-600 hover:underline'>SSD Crypto Erase</Link> methods.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-6 bg-slate-50 rounded-2xl border border-slate-200"
                    >
                      <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p
                          className="text-slate-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Anchor>

              <Anchor id="best-practices">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Best Practices
                </h2>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-emerald-400 font-bold flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Operational Efficiency
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Enable automated report generation for every task.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Use batch processing for large-scale deployments.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-emerald-400 font-bold flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Audit Readiness
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Keep historical logs for minimum 7 years.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Verify cloud sync after each{" "}
                          <Link
                            to="/support/mac-eraser-guide"
                            className="text-emerald-400 hover:underline"
                          >
                            Mac Sanitization
                          </Link>{" "}
                          task.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Cross-reference results with the{" "}
                          <Link
                            to="/support/help-manual/complete-diagnostic-manual"
                            className="text-emerald-400 hover:underline"
                          >
                            Diagnostic Manual
                          </Link>{" "}
                          for hardware health.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Anchor>

              <Anchor id="compliance">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Compliance Standards
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "GDPR",
                    "HIPAA",
                    "SOX",
                    "PCI-DSS",
                    "ISO 27001",
                    "NIST 800-88",
                    "SOC 2",
                    "CCPA",
                  ].map((standard) => (
                    <div
                      key={standard}
                      className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center hover:bg-emerald-100 transition-colors"
                    >
                      <span className="text-sm font-bold text-emerald-900">
                        {standard}
                      </span>
                    </div>
                  ))}
                </div>
              </Anchor>

              {/* Bottom CTA */}
              <Reveal>
                <div className="mt-16 p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">
                      Enterprise Cloud Integration
                    </h3>
                    <p className="text-emerald-50 mb-8 text-lg max-w-2xl">
                      Scale your security operations with our API-first Cloud
                      Console.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/contact"
                        className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                      >
                        Get Console Access
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default CloudConsoleGuide;
