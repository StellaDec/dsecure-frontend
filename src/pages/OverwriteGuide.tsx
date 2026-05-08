import React, { useState, useEffect } from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowUp, Home, Book, Shield, HardDrive, Zap, Info, Lock } from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  children?: NavItem[];
}

const navigationTree: NavItem[] = [
  {
    id: "summary",
    title: "Summary",
    icon: <Info className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p>
          With the exponential growth of digital data and the alarming rise in
          data breaches, organizations can no longer afford to neglect data
          security—especially at the end-of-life stage of their IT assets. As
          a company founded in 2025, <Link to="/products/file-eraser" className="text-emerald-600 hover:underline font-semibold">DSecureTech</Link> recognizes that data erasure
          is not just a technical process—it's a compliance imperative and a
          sustainability strategy.
        </p>
        <p>
          The safest, most environmentally responsible method for handling
          outdated devices is to ensure permanent data erasure, such that data
          becomes irretrievable even through advanced forensic techniques.
        </p>
      </div>
    )
  },
  {
    id: "why-overwriting",
    title: "Why Overwriting Matters",
    icon: <Shield className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p>
          Overwriting replaces the actual data on a storage device with
          patterns like zeros, ones, or pseudo-random bits. This process is
          essential for:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <Shield className="w-8 h-8 text-emerald-500 mb-3" />
            <p className="font-semibold text-emerald-900">Compliance</p>
            <p className="text-sm text-emerald-700">Standards like <Link to="/compliance/nist-800-88" className="hover:underline">NIST 800-88</Link>, DoD 5220.22-M, and BSI-VSITR</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
            <Lock className="w-8 h-8 text-teal-500 mb-3" />
            <p className="font-semibold text-teal-900">Data Security</p>
            <p className="text-sm text-teal-700">Before resale, disposal, or reuse</p>
          </div>
          <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
            <Zap className="w-8 h-8 text-cyan-500 mb-3" />
            <p className="font-semibold text-cyan-900">Sustainability</p>
            <p className="text-sm text-cyan-700">Environmentally responsible device reuse</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "how-many-passes",
    title: "How Many Passes?",
    icon: <Zap className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <p>
          The answer depends on multiple factors, including device type,
          sensitivity of the data, compliance requirements, and threat model. 
          Here's what industry standards recommend:
        </p>
        
        <div className="space-y-4">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
              NIST 800-88 (Recommended)
            </h3>
            <p className="text-emerald-800">
              <strong>Single Pass:</strong> For modern drives (post-2001), NIST recommends a single overwrite pass with zeros or random data. 
              This is sufficient for most commercial applications and provides excellent security with optimal performance. 
              Read more in our <Link to="/compliance/nist-800-88" className="font-semibold hover:underline">NIST 800-88 Guide</Link>.
            </p>
          </div>

          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
            <h3 className="text-xl font-bold text-teal-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
              DoD 5220.22-M (Legacy)
            </h3>
            <p className="text-teal-800">
              <strong>Three Passes:</strong> Historical standard that overwrites with (1) zeros, (2) ones, then (3) random data. 
              Still used in some government contracts but considered overkill for modern drives.
            </p>
          </div>

          <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
            <h3 className="text-xl font-bold text-cyan-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">7+</span>
              Gutmann Method (Overkill)
            </h3>
            <p className="text-cyan-800">
              <strong>35 Passes:</strong> Designed for legacy drives with specific magnetic properties. 
              Completely unnecessary for modern drives and wastes significant time and resources.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "device-recommendations",
    title: "Device Recommendations",
    icon: <HardDrive className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4 bg-emerald-50/50 p-4 rounded-r-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">SSDs & Flash Storage</h3>
            <p className="text-slate-700 mb-2">
              <strong>Recommendation:</strong> Use ATA <Link to="/support/secure-erase-hddssd" className="text-emerald-600 hover:underline">Secure Erase</Link> or <Link to="/support/ssd-cryptographic-erasure-guide" className="text-emerald-600 hover:underline">cryptographic erasure</Link> when possible.
            </p>
            <p className="text-slate-500 text-sm italic">
              If overwriting: Single pass is sufficient. Multiple passes provide no additional security due to wear leveling.
            </p>
          </div>

          <div className="border-l-4 border-teal-500 pl-4 bg-teal-50/50 p-4 rounded-r-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Modern HDDs (2001+)</h3>
            <p className="text-slate-700 mb-2">
              <strong>Recommendation:</strong> Single pass with zeros or random data.
            </p>
            <p className="text-slate-500 text-sm italic">
              High track density makes data recovery from overwritten sectors virtually impossible.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50/50 p-4 rounded-r-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Legacy HDDs (Pre-2001)</h3>
            <p className="text-slate-700 mb-2">
              <strong>Recommendation:</strong> 3 passes (DoD standard).
            </p>
            <p className="text-slate-500 text-sm italic">
              Lower track density may leave magnetic remnants requiring multiple overwrite patterns.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 bg-purple-50/50 p-4 rounded-r-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">High-Security</h3>
            <p className="text-slate-700 mb-2">
              <strong>Recommendation:</strong> 3-7 passes + physical destruction.
            </p>
            <p className="text-slate-500 text-sm italic">
              For classified or extremely sensitive data, combine software erasure with physical destruction.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "ds-recommendations",
    title: "DSecure Recommendations",
    icon: <Shield className="w-5 h-5" />,
    content: (
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <h3 className="text-xl font-bold mb-3">Standard</h3>
            <p className="text-emerald-100 mb-2"><strong>1 Pass</strong> - Random</p>
            <p className="text-emerald-50/80 text-sm">Ideal for most commercial applications and resale.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <h3 className="text-xl font-bold mb-3">Enhanced</h3>
            <p className="text-emerald-100 mb-2"><strong>3 Passes</strong> - DoD</p>
            <p className="text-emerald-50/80 text-sm">Recommended for financial and healthcare industries.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <h3 className="text-xl font-bold mb-3">Maximum</h3>
            <p className="text-emerald-100 mb-2"><strong>7 Passes</strong> + Verify</p>
            <p className="text-emerald-50/80 text-sm">For highly classified data or strict regulatory mandates.</p>
          </div>
        </div>
      </div>
    )
  }
];

const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const OverwriteGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShouldShowScrollTop(window.scrollY > 400);
      const headingElements = document.querySelectorAll('[id]');
      let currentSection = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          currentSection = el.id;
        }
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead seo={getSEOForPage('overwrite-guide')} />

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-1 md:pb-0">
            <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support" className="hover:text-emerald-600 transition-colors">Support</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support/knowledge-base" className="hover:text-emerald-600 transition-colors">Knowledge Base</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Overwrite Guide</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center">
                <Book className="w-4 h-4 mr-2 text-emerald-500" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {navigationTree.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onJump(item.id)}
                    className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? "bg-emerald-50 text-emerald-700 font-bold shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                    }`}
                  >
                    <span className={`mr-3 ${activeSection === item.id ? "text-emerald-600" : "text-slate-400"}`}>
                      {item.icon}
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Related Resources</h4>
                <nav className="space-y-3">
                  <Link to="/support/secure-erase-hddssd" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Secure Erase Guide</Link>
                  <Link to="/support/ssd-cryptographic-erasure-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Crypto Erasure Guide</Link>
                  <Link to="/compliance/nist-800-88" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">NIST 800-88 Standard</Link>
                  <Link to="/products/drive-eraser" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Drive Eraser Software</Link>
                </nav>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link 
                  to="/support/knowledge-base"
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                  Back to Knowledge Base
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 lg:p-12 text-white relative">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                    Expert Guide
                  </span>
                  <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
                    Overwrite <span className="text-emerald-400">Guide</span>
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                    Understand data sanitization patterns and overwrite standards to ensure your <Link to="/products/drive-eraser" className="text-emerald-400 hover:underline">Hard Drives</Link> and <Link to="/products/file-eraser" className="text-emerald-400 hover:underline">Files</Link> are permanently erased.
                  </p>
                </div>
                {/* Abstract Design Elements */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="p-8 lg:p-12">
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
                  {navigationTree.map((item) => (
                    <section key={item.id} className="mb-16 last:mb-0">
                      <Anchor id={item.id} />
                      <div className="flex items-center gap-3 mb-6 group">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors text-slate-600 group-hover:text-emerald-600">
                          {item.icon}
                        </div>
                        <h2 className="text-2xl font-bold m-0">{item.title}</h2>
                      </div>
                      <div className="text-slate-600 leading-relaxed">
                        {item.content}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Bottom Line / Conclusion */}
                <div className="mt-16 bg-slate-900 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden">
                   <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                     <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                       <Shield className="w-10 h-10 text-white" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold mb-3">The Bottom Line</h3>
                       <p className="text-slate-300 text-lg leading-relaxed mb-0">
                        For 99% of use cases, <strong className="text-emerald-400">a single overwrite pass is sufficient</strong> for modern storage devices as per <Link to="/compliance/nist-800-88" className="text-emerald-400 hover:underline">NIST 800-88</Link>. 
                        Choose additional passes only when required by specific compliance mandates or for <Link to="/products/file-eraser" className="text-emerald-400 hover:underline">highly sensitive file deletion</Link>.
                        <Link to="/support/help-manual/complete-manual" className="text-emerald-400 hover:underline ml-1">View Full Manual</Link>
                       </p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Related Articles / Next Steps */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link 
                to="/support/secure-erase-hddssd"
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Secure Erase Guide</h4>
                <p className="text-sm text-slate-500">Learn about hardware-level secure erasure for SSDs and HDDs.</p>
              </Link>

              <Link 
                to="/support/ssd-cryptographic-erasure-guide"
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Crypto Erasure</h4>
                <p className="text-sm text-slate-500">How to use cryptographic keys to instantly sanitize self-encrypting drives.</p>
              </Link>

              <Link 
                to="/support/retain-os-guide"
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Retain OS Guide</h4>
                <p className="text-sm text-slate-500">Wipe all user data while keeping the operating system intact.</p>
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Footer Support Callout */}
      <div className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 mb-4">Still have questions about data erasure patterns?</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@dsecuretech.com" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Email Support
            </a>
            <Link to="/support/faqs" className="border border-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              Read FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-emerald-600 text-white shadow-lg transition-all transform hover:scale-110 z-50 ${
          shouldShowScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

    </div>
  );
};

export default OverwriteGuide;
