import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Apple, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  Cpu, 
  AlertCircle,
  Keyboard,
  Power,
  RefreshCw,
  FileText,
  ExternalLink,
  BookOpen
} from "lucide-react";

// Navigation tree for sidebar
const navigationTree = [
  {
    id: "introduction",
    label: "Introduction",
    icon: <Apple className="w-4 h-4" />,
  },
  {
    id: "compatibility",
    label: "Compatibility",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "accessing-terminal",
    label: "Accessing Terminal",
    icon: <Terminal className="w-4 h-4" />,
    children: [
      { id: "apple-silicon", label: "Apple Silicon (M1/M2/M3/M4)" },
      { id: "intel-macs", label: "Intel-based Macs" },
    ],
  },
  {
    id: "erasure-steps",
    label: "Step-by-Step Guide",
    icon: <RefreshCw className="w-4 h-4" />,
  },
  {
    id: "post-erasure",
    label: "Post-Erasure Setup",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    id: "compliance",
    label: "Compliance & Reporting",
    icon: <FileText className="w-4 h-4" />,
  },
];

const Anchor: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <section id={id} className="scroll-mt-32 mb-16">
    {children}
  </section>
);

const MacEraseGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

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
      <SEOHead seo={getSEOForPage("mac-erase-guide")} />

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
              <span className="text-slate-900">Mac Erase Guide</span>
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
                    On This Page
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
                    Related Guides
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/support/secure-erase-hddssd"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        HDD & SSD Wipe Guide
                      </Link>
                    </li>
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
                        to="/support/sas-wipe-guide"
                        className="text-slate-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Enterprise SAS Wiping
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
                        to="/support/manual/diagnostic-manual"
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
                    Professional Guide
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Mac Erase{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      Guide
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                    Comprehensive technical procedure for securely sanitizing
                    Apple Silicon and Intel-based Mac devices using D-Secure
                    Drive Eraser Terminal commands. For individual file deletion
                    on Mac, see our{" "}
                    <Link
                      to="/support/help-manual/complete-manual"
                      className="text-emerald-600 hover:underline"
                    >
                      File Eraser Guide
                    </Link>
                    .
                  </p>
                </header>
              </Reveal>

              <Anchor id="introduction">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Introduction
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Erasing data from Mac devices requires specific procedures
                    due to Apple's secure enclave and unified storage
                    architecture. Whether you are dealing with{" "}
                    <strong>Apple Silicon (M1, M2, M3, M4)</strong> or older{" "}
                    <strong>Intel-based Macs</strong> with T1/T2 security chips,
                    standard formatting is often insufficient for
                    enterprise-grade compliance. For traditional drives, check
                    our{" "}
                    <Link
                      to="/support/secure-erase-hddssd"
                      className="text-emerald-600 hover:underline"
                    >
                      HDD/SSD Wipe Guide
                    </Link>
                    .
                  </p>
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
                    <div className="flex">
                      <ShieldCheck className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-emerald-900 font-bold mb-1">
                          Secure Sanitization
                        </h3>
                        <p className="text-emerald-800 text-sm">
                          D-Secure Drive Eraser for Mac leverages native
                          hardware-level commands to ensure data is
                          unrecoverable, fulfilling{" "}
                          <Link
                            to="/compliance/nist-800-88"
                            className="font-semibold hover:underline"
                          >
                            NIST 800-88 standards
                          </Link>{" "}
                          for media sanitization. For system diagnostics before
                          erasure, refer to our{" "}
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

              <Anchor id="compatibility">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 px-4 border-l-4 border-emerald-500">
                  Device Compatibility
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Apple Silicon
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Full support for M1, M2, M3, and M4 series chips. Uses
                      hardware-accelerated cryptographic erasure for instant
                      sanitization.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Intel Macs
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Comprehensive support for Intel-based Macs with T1 and T2
                      Security Chips, as well as older non-T2 systems.
                    </p>
                  </div>
                </div>
              </Anchor>

              <Anchor id="accessing-terminal">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Accessing Terminal
                </h2>
                <p className="text-slate-700 mb-8">
                  To run D-Secure commands, you must first access the Terminal
                  within the macOS Recovery environment.
                </p>

                <div className="space-y-8">
                  <div
                    id="apple-silicon"
                    className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
                  >
                    <div className="flex items-center mb-6">
                      <Power className="w-6 h-6 text-emerald-600 mr-3" />
                      <h3 className="text-2xl font-bold text-slate-900">
                        Apple Silicon Macs (M-Series)
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          1
                        </span>
                        <p className="text-slate-700">
                          Completely <strong>Shut down</strong> the Mac.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          2
                        </span>
                        <p className="text-slate-700">
                          Press and <strong>hold the Power button</strong> until
                          you see "Loading startup options".
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          3
                        </span>
                        <p className="text-slate-700">
                          Select <strong>Options</strong>, then click{" "}
                          <strong>Continue</strong>.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          4
                        </span>
                        <p className="text-slate-700">
                          In the top menu bar, navigate to{" "}
                          <strong>Utilities Terminal</strong>.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div
                    id="intel-macs"
                    className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
                  >
                    <div className="flex items-center mb-6">
                      <Keyboard className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-slate-900">
                        Intel-based Macs
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          1
                        </span>
                        <p className="text-slate-700">
                          Restart the Mac and immediately hold{" "}
                          <strong>Command (⌘) + R</strong>.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          2
                        </span>
                        <p className="text-slate-700">
                          Release the keys when you see the Apple logo or a
                          spinning globe.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                          3
                        </span>
                        <p className="text-slate-700">
                          From the <strong>Utilities</strong> menu in the menu
                          bar, choose <strong>Terminal</strong>.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Anchor>

              <Anchor id="erasure-steps">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Step-by-Step Erasure Guide
                </h2>
                <div className="space-y-8">
                  <div className="relative pl-12 pb-12 border-l-2 border-slate-200">
                    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Execute Terminal Command
                    </h3>
                    <p className="text-slate-700 mb-4">
                      In the Terminal window, type the following command
                      precisely:
                    </p>
                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-emerald-400 overflow-x-auto shadow-2xl relative group">
                      <code>sh &lt;(curl https://dssecure.co/m.xml)</code>
                      <div className="absolute right-4 top-4 text-slate-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tighter">
                        Remote Script
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 text-amber-500" />
                      Important: Ensure there is a space between{" "}
                      <strong>sh</strong> and <strong>&lt;</strong>.
                    </p>
                  </div>

                  <div className="relative pl-12 pb-12 border-l-2 border-slate-200">
                    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Launch D-Secure Interface
                    </h3>
                    <p className="text-slate-700">
                      The command will fetch and launch the{" "}
                      <strong>D-Secure Drive Eraser (Mac)</strong> application
                      interface within your recovery environment.
                    </p>
                  </div>

                  <div className="relative pl-12 pb-12 border-l-2 border-slate-200">
                    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Fetch Cloud Licenses
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Click the <strong>Cloud Icon</strong> in the interface to
                      authenticate.
                    </p>
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                      <p className="text-emerald-800 text-sm">
                        Log in with your <strong>D-Secure Cloud</strong>{" "}
                        credentials to authorize the erasure. This ensures all
                        reports are automatically synced to your central{" "}
                        <Link
                          to="/support/cloud-console-guide"
                          className="font-semibold hover:underline"
                        >
                          Cloud Console
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-12 border-l-2 border-slate-200">
                    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Start Erasure
                    </h3>
                    <p className="text-slate-700">
                      Select the target drive, choose your preferred erasure
                      method (e.g., <strong>NIST Clear</strong>), and click{" "}
                      <strong>Erase</strong>. Monitor the real-time progress
                      indicator. For SSD-specific methods, refer to our{" "}
                      <Link
                        to="/support/ssd-cryptographic-erasure-guide"
                        className="text-emerald-600 hover:underline"
                      >
                        Cryptographic Erasure Guide
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </Anchor>

              <Anchor id="post-erasure">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Post-Erasure Setup
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
                  <div className="flex">
                    <AlertCircle className="w-8 h-8 text-amber-600 mr-5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-amber-900 mb-3">
                        Operating System Reinstallation
                      </h3>
                      <p className="text-amber-800 leading-relaxed mb-4">
                        The erasure process completely sanitizes the internal
                        storage, including the OS. To make the Mac functional
                        again for its next user:
                      </p>
                      <ul className="space-y-2 text-sm text-amber-800 font-medium">
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 opacity-50" />
                          Use <strong>Internet Recovery</strong> (Option +
                          Command + R)
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 opacity-50" />
                          Or use a <strong>Bootable USB Installer</strong> for
                          macOS.
                        </li>
                        <li className="mt-4 pt-4 border-t border-amber-200">
                          <p className="text-xs">
                            Want to erase data without deleting the OS? Check
                            our{" "}
                            <Link
                              to="/support/retain-os-guide"
                              className="font-bold underline"
                            >
                              Retain OS Guide
                            </Link>{" "}
                            for alternative methods.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Anchor>

              <Anchor id="compliance">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Compliance & Reporting
                </h2>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Regulatory Documentation
                    </h3>
                    <p className="text-slate-700 mb-6">
                      Once the erasure is successful, click the{" "}
                      <strong>Report</strong> button to generate your
                      audit-ready documents.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl text-center">
                        <FileText className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 uppercase">
                          Certificate
                        </span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-center">
                        <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 uppercase">
                          Verification
                        </span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-center">
                        <ExternalLink className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 uppercase">
                          Cloud Sync
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-6 text-slate-300 text-sm">
                    All reports are digitally signed and contain detailed
                    metadata, including hardware serial numbers and timestamps
                    for absolute audit integrity.
                  </div>
                </div>
              </Anchor>

              {/* Bottom CTA */}
              <Reveal>
                <div className="mt-16 p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">
                      Ready to automate your Mac lifecycle?
                    </h3>
                    <p className="text-emerald-50 mb-8 text-lg max-w-2xl">
                      Contact our enterprise team for large-scale deployment
                      strategies and volume licensing.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/contact"
                        className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20"
                      >
                        Get Enterprise Quote
                      </Link>
                      <Link
                        to="/support"
                        className="px-8 py-4 bg-emerald-500 text-white border border-emerald-400 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
                      >
                        Explore Support
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

export default MacEraseGuide;
