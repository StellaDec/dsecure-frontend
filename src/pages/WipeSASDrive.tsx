import React, { useState, useEffect } from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowUp, Home, Book, Shield, HardDrive, Zap, Info, Layers, Server, Activity, AlertTriangle } from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const CheckCircle = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const navigationTree: NavItem[] = [
  {
    id: "sas-overview",
    title: "SAS Drive Architecture",
    icon: <Server className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed">
          Serial Attached SCSI (SAS) drives are the backbone of enterprise data centers. Unlike consumer SATA drives, 
          SAS drives feature <strong>dual-port full-duplex communication</strong>, higher rotational speeds, and advanced error reporting. 
          Sanitizing these enterprise-grade assets requires specialized commands that go beyond simple overwriting.
        </p>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-amber-900">Adapter Limitation</h4>
          </div>
          <p className="text-sm text-amber-800">
            Standard SATA-to-USB adapters <strong>cannot</strong> read SAS drives. You must use a dedicated SAS HBA 
            (Host Bus Adapter) or a SAS-enabled hardware eraser to communicate with these drives.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "erasure-methods",
    title: "SAS Erasure Methods",
    icon: <Shield className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-xl p-5 hover:border-emerald-200 transition-colors">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-emerald-500" />
            SCSI Block Erase
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            The hardware-level "Block Erase" command instructs the drive controller to reset all physical blocks 
            on the platters or NAND chips.
          </p>
          <ul className="text-xs text-slate-500 space-y-1">
            <li>• NIST 800-88 PURGE equivalent</li>
            <li>• Faster than software overwriting</li>
            <li>• Reaches G-list (reallocated) sectors</li>
          </ul>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 hover:border-teal-200 transition-colors">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-teal-500" />
            Crypto Scramble
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            For Self-Encrypting SAS Drives (SED), this command destroys the internal encryption key, 
            rendering all data unreadable in milliseconds.
          </p>
          <ul className="text-xs text-slate-500 space-y-1">
            <li>• Instantaneous sanitization</li>
            <li>• Recommended for SSD-based SAS</li>
            <li>• <Link to="/support/ssd-cryptographic-erasure-guide" className="underline">Crypto Guide</Link></li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-by-step",
    title: "Wiping Procedure",
    icon: <Activity className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
          <div>
            <h5 className="font-bold text-slate-900">Check Freeze State</h5>
            <p className="text-sm text-slate-600">Enterprise SAS drives often ship with security features enabled. Ensure the drive is not in a 'Frozen' state before starting.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
          <div>
            <h5 className="font-bold text-slate-900">Select NIST PURGE</h5>
            <p className="text-sm text-slate-600">For SAS HDDs, use a 3-pass overwrite or the SCSI Sanitize command. For SAS SSDs, always prioritize Block Erase.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
          <div>
            <h5 className="font-bold text-slate-900">Verification (Mandatory)</h5>
            <p className="text-sm text-slate-600">Scan at least 10% of the drive surface to verify that no data patterns remain. D-Secure handles this automatically.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "compliance",
    title: "Compliance & Reporting",
    icon: <Book className="w-5 h-5" />,
    content: (
      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <h4 className="font-bold mb-4 text-emerald-400">Audit Trail Essentials</h4>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Record Drive Serial Number (SCSI Inquiry)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Log Start/End Timestamps
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Capture SCSI Status Return Codes
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Tamper-proof Digitally Signed Report
          </li>
        </ul>
      </div>
    )
  }
];


const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const WipeSASDrive: React.FC = () => {
  const [activeSection, setActiveSection] = useState("sas-overview");
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
      <SEOHead seo={getSEOForPage('wipe-sas-drive')} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support" className="hover:text-emerald-600 transition-colors">Support</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/support/knowledge-base" className="hover:text-emerald-600 transition-colors">Knowledge Base</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">SAS Wipe Guide</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4">TABLE OF CONTENTS</h3>
              <nav className="space-y-1">
                {navigationTree.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onJump(item.id)}
                    className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? "bg-emerald-50 text-emerald-700 font-bold"
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
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 lg:p-12 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                    Enterprise Guide
                  </span>
                  <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
                    Wiping <span className="text-emerald-400">SAS Drives</span> Securely
                  </h1>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Learn the technical requirements and standard procedures for sanitizing high-performance 
                    Serial Attached SCSI drives for enterprise compliance.
                  </p>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="prose prose-slate max-w-none">
                  {navigationTree.map((item) => (
                    <section key={item.id} className="mb-16 last:mb-0">
                      <Anchor id={item.id} />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                          {item.icon}
                        </div>
                        <h2 className="text-2xl font-bold m-0">{item.title}</h2>
                      </div>
                      <div>{item.content}</div>
                    </section>
                  ))}
                </div>
                
                {/* Related Links */}
                <div className="mt-16 pt-12 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-6">Related Enterprise Guides</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/support/manual/enterprise-servers" className="p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                        <span className="text-sm font-medium text-slate-700">Server Sanitization</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                    </Link>
                    <Link to="/support/manual/compliance-standards" className="p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                        <span className="text-sm font-medium text-slate-700">Global Compliance Standards</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
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

export default WipeSASDrive;
