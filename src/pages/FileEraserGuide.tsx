import React, { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Shield, 
  Zap, 
  Lock, 
  Activity, 
  Search, 
  ChevronRight, 
  BookOpen,
  CheckCircle,
  Settings,
  Trash2,
  Database,
  Layers
} from "lucide-react";

// Navigation tree for sidebar
const navigationTree = [
  {
    id: "importance",
    label: "Why It Matters",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "features",
    label: "Key Features",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "usage",
    label: "Step-by-Step Guide",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: "use-cases",
    label: "Common Use Cases",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: "best-practices",
    label: "Best Practices",
    icon: <CheckCircle className="w-4 h-4" />,
  },
];

const Anchor: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <section id={id} className="scroll-mt-32 mb-16">
    {children}
  </section>
);

const FileEraserGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("importance");

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
      <SEOHeadNative seo={getSEOForPage("file-eraser-guide")} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex text-sm font-medium text-slate-500">
              <Link to="/support" className="hover:text-emerald-600 transition-colors">Support</Link>
              <ChevronRight className="w-4 h-4 mx-2 mt-0.5" />
              <Link to="/support/knowledge-base" className="hover:text-emerald-600 transition-colors">Knowledge Base</Link>
              <ChevronRight className="w-4 h-4 mx-2 mt-0.5" />
              <span className="text-slate-900">File Eraser Guide</span>
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
                            activeSection === item.id
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="mr-3 text-slate-400">{item.icon}</span>
                          {item.label}
                        </button>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Related Resources Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
                  <h3 className="font-bold mb-3 flex items-center text-emerald-400">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Deep Dive
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link to="/support/mac-eraser-guide" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Mac File Erasure
                      </Link>
                    </li>
                    <li>
                      <Link to="/support/cloud-console-guide" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Centralized Reporting
                      </Link>
                    </li>
                     <li>
                       <Link to="/compliance/nist-800-88" className="text-slate-300 hover:text-white transition-colors flex items-center">
                         <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                         NIST Standards
                       </Link>
                     </li>
                    <li>
                      <Link to="/support/retain-os-guide" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Retain OS Guide
                      </Link>
                    </li>
                    <li>
                      <Link to="/support/manual/diagnostic-manual" className="text-slate-300 hover:text-white transition-colors flex items-center">
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
                    Privacy Solution
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    File Eraser <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Guide</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                    Securely delete sensitive files and folders beyond recovery. Ensure your personal and corporate data remains private even after deletion.
                  </p>
                </header>
              </Reveal>

              <Anchor id="importance">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 px-4 border-l-4 border-emerald-500">Why File Erasing Matters</h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Standard deletion doesn't actually remove data from your drive; it just hides it. For permanent sanitization of entire drives, see our <Link to="/support/secure-erase-hddssd" className="text-emerald-600 hover:underline">HDD/SSD Wipe Guide</Link>. However, for targeted file deletion, D-Secure File Eraser ensures that specific items are gone for good.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                      <h3 className="text-red-900 font-bold mb-3 flex items-center">
                        <Trash2 className="w-5 h-5 mr-2" />
                        Traditional Delete
                      </h3>
                      <p className="text-red-800 text-sm">
                        OS only marks the space as "available". Data remains on disk and can be recovered easily with forensic tools.
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                      <h3 className="text-emerald-900 font-bold mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Secure Erasure
                      </h3>
                      <p className="text-emerald-800 text-sm">
                        Overwrites data patterns multiple times according to <Link to="/compliance/nist-800-88" className="font-semibold hover:underline">NIST 800-88</Link> standards, making recovery impossible.
                      </p>
                    </div>
                  </div>
                </div>
              </Anchor>

              <Anchor id="features">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      icon: <Lock className="w-6 h-6 text-slate-900" />,
                      title: "Military Grade",
                      desc: "Supports 1, 3, 7, and 35-pass (Gutmann) erasure methods."
                    },
                    {
                      icon: <Database className="w-6 h-6 text-slate-900" />,
                      title: "Batch Processing",
                      desc: "Select and erase thousands of files simultaneously with high speed."
                    },
                    {
                      icon: <Search className="w-6 h-6 text-slate-900" />,
                      title: "Context Menu",
                      desc: "Right-click integration for instant secure deletion from Windows Explorer."
                    }
                  ].map((feature, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </Anchor>

              <Anchor id="usage">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Step-by-Step Guide</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Selection",
                      content: "Launch D-Secure File Eraser and browse to the target files or use the right-click context menu on any file/folder."
                    },
                    {
                      step: 2,
                      title: "Erasure Method",
                      content: "Select the sanitization algorithm. We recommend <strong>3-pass US DoD 5220.22-M</strong> for high-sensitivity data."
                    },
                    {
                      step: 3,
                      title: "Execution",
                      content: "Confirm the selection and click 'Secure Delete'. For Mac users, ensure you follow the <Link to='/support/mac-eraser-guide' class='text-emerald-600 hover:underline'>Terminal-based procedure</Link>."
                    },
                    {
                      step: 4,
                      title: "Reporting",
                      content: "Once complete, generate an erasure report. All reports can be automatically uploaded to your <Link to='/support/cloud-console-guide' class='text-emerald-600 hover:underline'>Cloud Console</Link>."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Anchor>

              <Anchor id="use-cases">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 px-4 border-l-4 border-emerald-500">Common Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Personal Privacy</h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Tax documents and financial records</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Personal photos and videos</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Browser cache and cookies</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Corporate Compliance</h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Customer PII (Personally Identifiable Information)</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Proprietary code and internal documents</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500" /> Employee records and payroll data</li>
                    </ul>
                  </div>
                </div>
              </Anchor>

              <Anchor id="best-practices">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Best Practices</h2>
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
                          Regularly wipe "Free Disk Space" to remove traces of previously deleted files.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Use the "Scheduler" to automate sanitization of temporary folders.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-emerald-400 font-bold flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Security Tips
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Enable "Verification" to double-check that erasure was successful.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Integrate with <Link to="/support/cloud-console-guide" className="text-emerald-400 hover:underline">Cloud Console</Link> for audit-ready certification.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                          Use the <Link to="/support/manual/diagnostic-manual" className="text-emerald-400 hover:underline">Diagnostic Manual</Link> to identify high-risk hardware areas.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Anchor>

              {/* Bottom CTA */}
              <Reveal>
                <div className="mt-16 p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">Complete Your Privacy Shield</h3>
                    <p className="text-emerald-50 mb-8 text-lg max-w-2xl">
                      Pair File Eraser with our <Link to="/support/secure-erase-hddssd" className="font-bold underline">Drive Eraser</Link> for total endpoint security.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/contact" className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                        Upgrade to Enterprise
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

export default FileEraserGuide;
