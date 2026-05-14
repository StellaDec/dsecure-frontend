import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  ArrowUp, 
  Home, 
  Book, 
  Shield, 
  HardDrive, 
  Zap, 
  Info, 
  Lock, 
  CheckCircle, 
  Clock, 
  FileText,
  Smartphone,
  Server,
  Activity
} from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const navigationTree: NavItem[] = [
  {
    id: "overview",
    title: "Selective Erasure Overview",
    icon: <Info className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <p className="text-slate-600 text-lg leading-relaxed">
          D-Secure's selective erasure technology allows you to permanently delete sensitive data,
          applications, and files while preserving your <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline">operating system</Link> and essential system files.
          This approach is ideal for device redeployment, selling, or transferring ownership without
          the need to reinstall the operating system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <Shield className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Preserve System Integrity</h3>
            <p className="text-sm text-slate-600">
              Keep your operating system and essential drivers intact while removing all personal and sensitive data using <Link to="/products/file-eraser" className="text-emerald-600 hover:underline">File Eraser</Link> technology.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
            <Clock className="w-8 h-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Time Efficient</h3>
            <p className="text-sm text-slate-600">
              Save hours of reinstallation time. Ideal for enterprise <Link to="/solutions/itad" className="text-emerald-600 hover:underline">ITAD workflows</Link> where speed is critical.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "erased-vs-retained",
    title: "Erased vs Retained",
    icon: <Activity className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Data to be Erased
          </h3>
          <ul className="space-y-3 text-slate-700 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              User documents, personal photos and videos
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Installed applications and software registry keys
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Browser history, cookies, and saved passwords
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              User profiles, email data, and system cache
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-600 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Data to be Retained
          </h3>
          <ul className="space-y-3 text-slate-700 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Operating system files and system kernels
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Hardware drivers and motherboard firmware
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Boot loader and recovery partitions
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              Essential system services and update frameworks
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-by-step",
    title: "Step-by-Step Process",
    icon: <CheckCircle className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        {[
          { step: "01", title: "Launch D-Secure", text: "Start the application and select \"Retain OS\" mode. For Mac users, refer to our <Link to=\"/support/mac-eraser-guide\" class=\"text-emerald-600 hover:underline\">Mac Erase Guide</Link>." },
          { step: "02", title: "Target Drive", text: "Select the primary drive. D-Secure automatically protects system partitions." },
          { step: "03", title: "Method Selection", text: "Choose an <Link to=\"/support/overwrite-guide\" class=\"text-emerald-600 hover:underline\">overwrite pattern</Link> or <Link to=\"/support/secure-erase-hddssd\" class=\"text-emerald-600 hover:underline\">Secure Erase</Link> method." },
          { step: "04", title: "Execution", text: "Begin the process. The system will securely wipe selected areas while preserving OS integrity." },
          { step: "05", title: "Verification", text: "Verify the erasure and generate a <Link to=\"/support/help-manual/complete-manual\" class=\"text-emerald-600 hover:underline\">compliance report</Link>." }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-black text-emerald-200">{item.step}</span>
            <div>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "best-practices",
    title: "Best Practices",
    icon: <Lock className="w-5 h-5" />,
    content: (
      <div className="bg-slate-900 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-emerald-400 font-bold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Pre-Erasure
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Create a system restore point</li>
              <li>• Backup essential OS configurations</li>
              <li>• Document installed drivers</li>
              <li>• Verify system partition health</li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-400 font-bold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" /> Post-Erasure
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Test system boot and functionality</li>
              <li>• Run system file integrity checks</li>
              <li>• Update security patches</li>
              <li>• Generate compliance reports</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
];

const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const RetainOSGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
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
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900">
      <SEOHead seo={getSEOForPage('retain-os-guide')} />

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
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support" className="hover:text-emerald-600 transition-colors">Support</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support/knowledge-base" className="hover:text-emerald-600 transition-colors">Knowledge Base</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Retain OS Guide</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center">
                <Book className="w-4 h-4 mr-2 text-emerald-500" /> CONTENTS
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
                  <Link to="/support/mac-eraser-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Mac Erase Guide</Link>
                  <Link to="/support/secure-erase-hddssd" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">HDD/SSD Wipe Guide</Link>
                  <Link to="/products/file-eraser" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">File Eraser Solution</Link>
                  <Link to="/support/cloud-console-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Cloud Console Guide</Link>
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
                    Technical Guide
                  </span>
                  <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
                    Retain <span className="text-emerald-400">Operating System</span>
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                    Learn how to securely wipe user data and personal files while keeping your <Link to="/products/drive-eraser" className="text-emerald-400 hover:underline">Operating System</Link> intact for redeployment.
                  </p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="p-8 lg:p-12">
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900">
                  {navigationTree.map((item) => (
                    <section key={item.id} className="mb-16 last:mb-0">
                      <Anchor id={item.id} />
                      <div className="flex items-center gap-3 mb-6 group">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors text-slate-600 group-hover:text-emerald-600">
                          {item.icon}
                        </div>
                        <h2 className="text-2xl font-bold m-0">{item.title}</h2>
                      </div>
                      <div>{item.content}</div>
                    </section>
                  ))}
                </div>

                {/* Bottom Callout */}
                <div className="mt-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden">
                   <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
                       <Shield className="w-10 h-10 text-white" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold mb-3">Enterprise Deployment</h3>
                       <p className="text-emerald-100 text-lg leading-relaxed mb-0">
                        Managing thousands of devices? <Link to="/solutions/enterprise" className="text-white underline font-semibold">D-Secure Enterprise</Link> offers centralized management for selective erasure across your entire fleet.
                       </p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Related Guides Grid */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <Link to="/support/mac-eraser-guide" className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md">
                 <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 w-fit mb-4"><Smartphone className="w-5 h-5" /></div>
                 <h4 className="font-bold text-slate-900 mb-2">Mac Erase Guide</h4>
                 <p className="text-xs text-slate-500">Specific procedures for Apple Silicon and Intel-based Mac machines.</p>
               </Link>
               <Link to="/support/overwrite-guide" className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md">
                 <div className="p-2 bg-teal-50 rounded-lg text-teal-600 w-fit mb-4"><Zap className="w-5 h-5" /></div>
                 <h4 className="font-bold text-slate-900 mb-2">Overwrite Patterns</h4>
                 <p className="text-xs text-slate-500">Understanding NIST and DoD standards for permanent data deletion.</p>
               </Link>
               <Link to="/products/file-eraser" className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all hover:shadow-md">
                 <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600 w-fit mb-4"><HardDrive className="w-5 h-5" /></div>
                 <h4 className="font-bold text-slate-900 mb-2">File Eraser</h4>
                 <p className="text-xs text-slate-500">Selective file and folder erasure for active Windows environments.</p>
               </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Footer Support */}
      <div className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 mb-4">Need help with selective erasure?</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@dsecuretech.com" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">Email Support</a>
            <Link to="/support/faqs" className="border border-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium">Read FAQs</Link>
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
    </div>
  );
};

export default RetainOSGuide;