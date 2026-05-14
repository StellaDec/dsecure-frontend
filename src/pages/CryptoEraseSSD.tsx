import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  ChevronRight, 
  Cpu, 
  Lock, 
  Zap, 
  AlertCircle,
  FileText,
  Search,
  Settings,
  HardDrive,
  Activity,
  BookOpen,
  Info,
  Home,
  ArrowUp
} from "lucide-react";

// Navigation tree for sidebar
const navigationTree = [
  {
    id: "introduction",
    label: "Introduction",
    icon: <Info className="w-4 h-4" />,
  },
  {
    id: "technology",
    label: "SSD Technology",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "what-is-crypto-erase",
    label: "What is CryptoErase?",
    icon: <Lock className="w-4 h-4" />,
  },
  {
    id: "procedure",
    label: "Erasure Procedure",
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: "requirements", label: "Requirements" },
      { id: "step-by-step", label: "Step-by-Step" },
    ],
  },
  {
    id: "best-practices",
    label: "Best Practices",
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

const CryptoEraseSSDGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);

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

    const handleScroll = () => {
      setShouldShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
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
      <SEOHead seo={getSEOForPage("crypto-erase-ssd")} />

      <div className="min-h-screen bg-slate-50 font-inter">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
              <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center shrink-0">
                <Home className="w-4 h-4 mr-1" /> Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
              <Link to="/support" className="hover:text-emerald-600 transition-colors shrink-0">Support</Link>
              <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
              <Link to="/support/knowledge-base" className="hover:text-emerald-600 transition-colors shrink-0">Knowledge Base</Link>
              <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
              <span className="text-slate-900 shrink-0">SSD Crypto Erase Guide</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-emerald-500" />
                    Guide Sections
                  </h3>
                  <nav className="space-y-1">
                    {navigationTree.map((item) => (
                      <div key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeSection === item.id || item.children?.some(c => c.id === activeSection)
                              ? "bg-emerald-50 text-emerald-700 shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                          }`}
                        >
                          <span className={`mr-3 ${activeSection === item.id || item.children?.some(c => c.id === activeSection) ? "text-emerald-600" : "text-slate-400"}`}>
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
                                    : "border-transparent text-slate-500 hover:text-emerald-700 hover:bg-slate-50"
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

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Related Resources</h3>
                    <nav className="space-y-3 px-3">
                      <Link to="/support/secure-erase-hddssd" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">HDD & SSD Wipe Guide</Link>
                      <Link to="/support/mac-eraser-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Mac Terminal Erase</Link>
                      <Link to="/support/overwrite-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Overwrite Patterns</Link>
                      <Link to="/support/retain-os-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Retain OS Guide</Link>
                    </nav>
                  </div>
                </div>

                {/* Internal Links Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl border border-slate-700">
                  <h3 className="font-bold mb-3 flex items-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Secure Solutions
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link to="/products/drive-eraser" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        Drive Eraser Enterprise
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/file-eraser" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        File Eraser Software
                      </Link>
                    </li>
                    <li>
                      <Link to="/solutions/itad" className="text-slate-300 hover:text-white transition-colors flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-emerald-500" />
                        ITAD Sanitization
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Reveal>
                <header className="mb-12 bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                      Technical Specification
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                      SSD <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Cryptographic Erasure</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                      A deep dive into Instant Secure Erase (ISE) and Cryptographic Sanitization for modern solid-state storage architecture.
                    </p>
                  </div>
                  <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                </header>
              </Reveal>

              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-slate-200">
                <Anchor id="introduction">
                  <div className="prose prose-emerald max-w-none">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction</h2>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Traditional data erasure methods designed for magnetic media (HDDs) are often ineffective and even detrimental when applied to Solid State Drives (SSDs). Modern SSDs require <strong>Cryptographic Erasure (CE)</strong> — a method that focuses on the destruction of encryption keys rather than overwriting individual flash cells.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-emerald-200 transition-colors">
                        <Zap className="w-8 h-8 text-emerald-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-2">Near-Instant</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">Completes in seconds regardless of drive capacity.</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-emerald-200 transition-colors">
                        <ShieldCheck className="w-8 h-8 text-teal-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-2">Safe for Media</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">Preserves flash endurance by avoiding massive write cycles.</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-emerald-200 transition-colors">
                        <Activity className="w-8 h-8 text-cyan-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-2">NIST Compliant</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">Meets <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline">NIST 800-88</Link> standards for SSDs.</p>
                      </div>
                    </div>
                  </div>
                </Anchor>

                <Anchor id="technology">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 px-4 border-l-4 border-emerald-500">Understanding SSD Architecture</h2>
                  <div className="bg-emerald-50 rounded-2xl p-8 mb-12 border border-emerald-100">
                    <p className="text-emerald-900 leading-relaxed mb-6 font-medium">
                      Unlike hard drives, SSDs use complex firmware logic to manage data distribution. This makes traditional "wiping" unreliable due to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-emerald-800"><strong>Wear-Leveling:</strong> Moves data around to prolong cell life, making specific physical addresses hard to target.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-emerald-800"><strong>Over-Provisioning:</strong> Reserves hidden capacity that standard OS commands cannot reach.</p>
                        </li>
                      </ul>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-emerald-800"><strong>Write Amplification:</strong> Causes unnecessary wear when using multi-pass <Link to="/support/overwrite-guide" className="text-emerald-700 underline font-bold">overwrite patterns</Link>.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-emerald-800"><strong>Bad Block Management:</strong> Retires failed cells that may still contain readable residual data.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Anchor>

                <Anchor id="what-is-crypto-erase">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">What is Cryptographic Erasure?</h2>
                  <div className="prose prose-slate max-w-none mb-12">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      Cryptographic Erasure (also known as Crypto-Erase or ISE) is a sanitization process applied to <strong>Self-Encrypting Drives (SEDs)</strong>. In this architecture, all data written to the media is automatically encrypted by the drive controller using a Media Encryption Key (MEK).
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-8 my-10 bg-slate-50 rounded-3xl p-8 border border-slate-200">
                      <div className="w-full md:w-1/3 flex justify-center">
                        <div className="relative">
                          <HardDrive className="w-24 h-24 text-slate-300" />
                          <Lock className="w-10 h-10 text-emerald-600 absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-slate-100" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">The "Safe Key" Analogy</h3>
                        <p className="text-slate-600 italic">
                          "Imagine a safe full of documents. Instead of burning every single page (Overwriting), you simply destroy the only physical key that can open the safe. Even if someone has the safe, the contents are mathematically unreadable forever."
                        </p>
                      </div>
                    </div>
                  </div>
                </Anchor>

                <Anchor id="procedure">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Sanitization Procedure</h2>
                  
                  <div id="requirements" className="mb-12 scroll-mt-32">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                      <AlertCircle className="w-5 h-5 text-emerald-600 mr-2" />
                      Technical Requirements
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Requirement</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">SED Compatibility</td>
                            <td className="px-6 py-4 text-sm text-slate-600">The drive must be a Self-Encrypting Drive (SED) with active hardware encryption.</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">ATA/NVMe Command</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Support for "Crypto Scramble Ext" (NVMe) or "Sanitize Crypto Erase" (ATA).</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">D-Secure License</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Active enterprise license for generating tamper-proof <Link to="/support/help-manual/complete-manual" className="text-emerald-600 hover:underline">compliance reports</Link>.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="step-by-step" className="scroll-mt-32">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Step-by-Step with D-Secure</h3>
                    <div className="space-y-6">
                      {[
                        {
                          step: "01",
                          title: "Initialization",
                          text: "Boot the target machine from the <Link to='/support/help-manual/complete-manual' class='text-emerald-600 hover:underline font-medium'>D-Secure Enterprise ISO</Link> or USB Media."
                        },
                        {
                          step: "02",
                          title: "Identification",
                          text: "Select the target SSD from the hardware inventory list. D-Secure will automatically identify if the drive supports ISE/Crypto-Erase."
                        },
                        {
                          step: "03",
                          title: "Method Selection",
                          text: "Choose 'Cryptographic Erasure' from the sanitization methods. If not supported, the tool will recommend 'Sanitize Block Erase'."
                        },
                        {
                          step: "04",
                          title: "Key Destruction",
                          text: "Initiate the process. The drive controller instantly generates a new internal encryption key, rendering all previous data unreadable."
                        }
                      ].map((item) => (
                        <div key={item.step} className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-200 transition-colors group">
                          <span className="text-2xl font-black text-emerald-200 group-hover:text-emerald-400 transition-colors">{item.step}</span>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Anchor>

                <Anchor id="best-practices">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Best Practices</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-200 transition-colors">
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
                        DO
                      </h3>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Verify drive encryption status before deployment.</li>
                        <li>• Use <Link to="/support/cloud-console-guide" className="text-emerald-600 hover:underline">D-Secure Cloud</Link> for centralized audit logs.</li>
                        <li>• Perform hardware diagnostics before erasure.</li>
                        <li>• Follow <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline">NIST 800-88</Link> verification steps.</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-red-200 transition-colors">
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        DON'T
                      </h3>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Use <Link to="/support/overwrite-guide" className="text-red-600 hover:underline font-medium">DoD 5220.22-M</Link> (3-pass) on SSDs.</li>
                        <li>• Attempt software-level encryption for sanitization.</li>
                        <li>• Bypass the verification step after erasure.</li>
                        <li>• Ignore hardware "Freeze" states reported by the tool.</li>
                      </ul>
                    </div>
                  </div>
                </Anchor>

                <Anchor id="compliance">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Compliance Reporting</h2>
                  <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-emerald-900/50">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">Audit-Ready Documentation</h3>
                        <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                          Every Cryptographic Erasure performed via D-Secure generates a cryptographically signed report, proving that the Media Encryption Keys were successfully destroyed.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10">GDPR Ready</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10">NIST 800-88</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10">HIPAA Compliant</span>
                        </div>
                      </div>
                      <div className="w-48 h-48 bg-emerald-500/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm shrink-0">
                        <FileText className="w-20 h-20 text-emerald-400" />
                      </div>
                    </div>
                    <div className="absolute left-0 bottom-0 w-full h-1 bg-emerald-500/30" />
                  </div>
                </Anchor>

                {/* Bottom CTA */}
                <Reveal>
                  <div className="mt-16 text-center border-t border-slate-100 pt-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Master Enterprise Data Sanitization</h3>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Download our comprehensive whitepaper on SSD sanitization strategies or contact our technical engineers for a custom deployment strategy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/contact" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                        Request Technical Demo
                      </Link>
                      <Link to="/support/knowledge-base" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
                        Browse Knowledge Base
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </main>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-emerald-600 text-white shadow-lg transition-all transform hover:scale-110 z-50 ${
          shouldShowScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default CryptoEraseSSDGuide;

