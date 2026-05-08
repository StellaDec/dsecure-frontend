import React, { useState, useEffect } from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowUp, Home, Book, Shield, HardDrive, Zap, Info, Lock, CheckCircle, Clock, FileText } from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const navigationTree: NavItem[] = [
  {
    id: "overview",
    title: "HDD vs SSD Overview",
    icon: <Info className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <p className="text-slate-600 text-lg leading-relaxed">
          Different storage technologies require different erasure approaches. Understanding the fundamental differences 
          between HDDs and SSDs is crucial for selecting the appropriate secure erasure method.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <HardDrive className="w-6 h-6 mr-2" />
              Hard Disk Drives (HDD)
            </h3>
            <ul className="text-blue-700 space-y-2 text-sm">
              <li>• <strong>Technology:</strong> Magnetic storage on spinning platters</li>
              <li>• <strong>Erasure:</strong> Multiple overwrite passes effective</li>
              <li>• <strong>Challenges:</strong> Magnetic remanence, bad sectors</li>
              <li>• <strong>Best Method:</strong> Multi-pass overwriting + physical destruction</li>
              <li>• <strong>Standards:</strong> DoD 5220.22-M, <Link to="/compliance/nist-800-88" className="underline">NIST 800-88</Link></li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Solid State Drives (SSD)
            </h3>
            <ul className="text-purple-700 space-y-2 text-sm">
              <li>• <strong>Technology:</strong> NAND flash memory cells</li>
              <li>• <strong>Erasure:</strong> Crypto-erase, ATA Secure Erase</li>
              <li>• <strong>Challenges:</strong> Wear leveling, over-provisioning</li>
              <li>• <strong>Best Method:</strong> ATA Secure Erase + encryption key destruction</li>
              <li>• <strong>Standards:</strong> IEEE 2883, NIST 800-88</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "hdd-methods",
    title: "HDD Erasure Methods",
    icon: <HardDrive className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">1. Multi-Pass Overwriting</h4>
          <p className="text-emerald-700 text-sm mb-3">Writing random or specific patterns multiple times across entire drive surface.</p>
          <ul className="text-emerald-800 text-xs space-y-1 opacity-80">
            <li>• 3-pass: Random, complement, random</li>
            <li>• 7-pass: DoD 5220.22-M standard</li>
            <li>• 35-pass: Gutmann method (legacy)</li>
          </ul>
        </div>
        <div className="bg-teal-50 p-5 rounded-xl border border-teal-100">
          <h4 className="font-bold text-teal-900 mb-2">2. ATA Secure Erase</h4>
          <p className="text-teal-700 text-sm mb-3">Hardware-level command to erase all data including remapped sectors.</p>
          <ul className="text-teal-600 text-xs space-y-1 opacity-80">
            <li>• Uses drive's built-in erase function</li>
            <li>• Faster than software overwriting</li>
            <li>• Handles bad sectors automatically</li>
          </ul>
        </div>
        <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100">
          <h4 className="font-bold text-cyan-900 mb-2">3. Degaussing</h4>
          <p className="text-cyan-700 text-sm mb-3">Apply strong magnetic field to disrupt magnetic domains on platters.</p>
          <ul className="text-cyan-600 text-xs space-y-1 opacity-80">
            <li>• Renders drive permanently unusable</li>
            <li>• Effective for classified data</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
          <h4 className="font-bold text-purple-900 mb-2">4. Physical Destruction</h4>
          <p className="text-purple-700 text-sm mb-3">Physical destruction of platters through shredding or incineration.</p>
          <ul className="text-purple-600 text-xs space-y-1 opacity-80">
            <li>• Ultimate security assurance</li>
            <li>• Required for highest classifications</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "ssd-methods",
    title: "SSD Erasure Methods",
    icon: <Zap className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">1. ATA Secure Erase</h4>
          <p className="text-emerald-700 text-sm mb-3">Hardware-level secure erase for SATA SSDs, erases all cells.</p>
          <ul className="text-emerald-800 text-xs space-y-1 opacity-80">
            <li>• Most effective for SSDs</li>
            <li>• Handles wear leveling natively</li>
          </ul>
        </div>
        <div className="bg-teal-50 p-5 rounded-xl border border-teal-100">
          <h4 className="font-bold text-teal-900 mb-2">2. Crypto-Erase</h4>
          <p className="text-teal-700 text-sm mb-3">Destroy encryption keys rendering all data unreadable.</p>
          <ul className="text-teal-600 text-xs space-y-1 opacity-80">
            <li>• Instantaneous erasure</li>
            <li>• <Link to="/support/ssd-cryptographic-erasure-guide" className="underline">View Crypto Guide</Link></li>
          </ul>
        </div>
        <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100">
          <h4 className="font-bold text-cyan-900 mb-2">3. NVMe Format</h4>
          <p className="text-cyan-700 text-sm mb-3">NVMe-specific secure format command for modern M.2 SSDs.</p>
          <ul className="text-cyan-600 text-xs space-y-1 opacity-80">
            <li>• Protocol-specific command</li>
            <li>• Enterprise-grade security</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
          <h4 className="font-bold text-purple-900 mb-2">4. Physical Destruction</h4>
          <p className="text-purple-700 text-sm mb-3">Shredding NAND flash memory chips into 2mm or smaller particles.</p>
          <ul className="text-purple-600 text-xs space-y-1 opacity-80">
            <li>• Required for TOP SECRET data</li>
            <li>• Specialized SSD shredders needed</li>
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
          { step: "01", title: "Assessment", text: "Identify drive type (HDD/SSD), interface, and health status." },
          { step: "02", title: "Backup", text: "Verified backup of any data that needs preservation." },
          { step: "03", title: "Unlock", text: "Remove ATA passwords or frozen states preventing erasure." },
          { step: "04", title: "Erase", text: "Execute selected method (e.g., NIST 800-88 Purge)." },
          { step: "05", title: "Verify", text: "Post-erasure verification scan (10-100% of drive)." },
          { step: "06", title: "Certify", text: "Generate tamper-proof erasure certificate for compliance." }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-black text-emerald-200">{item.step}</span>
            <div>
              <h5 className="font-bold text-slate-900">{item.title}</h5>
              <p className="text-sm text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "compliance",
    title: "Compliance Standards",
    icon: <Shield className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-slate-900">Government & Military</h4>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100 flex items-center justify-between">
              <span>NIST 800-88 Rev. 1</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">GOLD STANDARD</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">DoD 5220.22-M</div>
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">BSI-VSITR</div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-slate-900">Industry Regulations</h4>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">GDPR (Right to Erasure)</div>
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">HIPAA (Health Data)</div>
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">PCI-DSS (Payment Cards)</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "performance",
    title: "Performance Estimates",
    icon: <Clock className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Drive Type</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Estimate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium">500GB HDD</td>
                <td className="px-4 py-3 text-slate-500">1 Pass</td>
                <td className="px-4 py-3 text-emerald-600 font-bold">2-3 Hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">1TB HDD</td>
                <td className="px-4 py-3 text-slate-500">3 Pass</td>
                <td className="px-4 py-3 text-emerald-600 font-bold">12-18 Hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">512GB SSD</td>
                <td className="px-4 py-3 text-slate-500">Secure Erase</td>
                <td className="px-4 py-3 text-emerald-600 font-bold">2-10 Minutes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">1TB NVMe</td>
                <td className="px-4 py-3 text-slate-500">Crypto Erase</td>
                <td className="px-4 py-3 text-emerald-600 font-bold">Instant</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 italic">* Times vary based on drive health, interface (USB vs SATA), and system performance.</p>
      </div>
    )
  }
];

const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const SecureEraseHDDSDD: React.FC = () => {
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
    <div className="min-h-screen bg-slate-50 font-inter">
      <SEOHead seo={getSEOForPage('help-manual')} />

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}</style>

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
            <span className="text-slate-900 font-medium">Secure Erase HDD/SSD</span>
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
                  <Link to="/support/overwrite-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Overwrite Patterns Guide</Link>
                  <Link to="/support/ssd-cryptographic-erasure-guide" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">Crypto Erasure Guide</Link>
                  <Link to="/compliance/nist-800-88" className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors">NIST 800-88 Compliance</Link>
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
                  <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
                    Secure Erase <span className="text-emerald-400">HDD & SSD</span>
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                    Complete drive sanitization guide covering hardware-level commands, overwrite patterns, 
                    and cryptographic erasure for modern <Link to="/products/drive-eraser" className="text-emerald-400 hover:underline">Hard Drives</Link> and <Link to="/products/file-eraser" className="text-emerald-400 hover:underline">Solid State Drives</Link>.
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

                {/* Internal Links Footer */}
                <div className="mt-16 pt-12 border-t border-slate-100 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">Overwrite Guide</h4>
                    <p className="text-sm text-slate-500 mb-4">Deep dive into overwrite patterns and <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline">NIST compliance</Link>.</p>
                    <Link to="/support/overwrite-guide" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
                      Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">Retain OS Guide</h4>
                    <p className="text-sm text-slate-500 mb-4">Wipe user data while keeping the <Link to="/support/retain-os-guide" className="text-emerald-600 hover:underline">OS intact</Link>.</p>
                    <Link to="/support/retain-os-guide" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
                      Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">Product: Drive Eraser</h4>
                    <p className="text-sm text-slate-500 mb-4">Enterprise software implementing these <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline">erasure methods</Link>.</p>
                    <Link to="/products/drive-eraser" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
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

export default SecureEraseHDDSDD;
