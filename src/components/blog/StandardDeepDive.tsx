import React from "react";
import Reveal from "@/components/Reveal";
import { ShieldIcon, CheckIcon, GlobeIcon, DatabaseIcon } from "@/components/FlatIcons";
import { Link } from "react-router-dom";

interface StandardDeepDiveProps {
  category?: string;
  blogTitle: string;
  blogId?: string;
}

const StandardDeepDive: React.FC<StandardDeepDiveProps> = ({ category, blogTitle, blogId = "" }) => {
  const isMobile = category?.toLowerCase().includes("mobile") || category?.toLowerCase().includes("smartphone");
  const isCompliance = category?.toLowerCase().includes("compliance") || category?.toLowerCase().includes("regulatory") || category?.toLowerCase().includes("nist");
  const isITAD = category?.toLowerCase().includes("itad") || category?.toLowerCase().includes("disposal");
  const isSSD = blogTitle.toLowerCase().includes("ssd") || blogTitle.toLowerCase().includes("nvme");

  // Determine variation based on blogId to avoid site-wide duplicate content
  const variation = blogId ? (blogId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3) : 0;

  const getIntroduction = () => {
    if (isMobile) {
      return "The mobile lifecycle is fraught with data risks. From corporate smartphones to consumer trade-ins, the sheer volume of PII stored on flash memory requires a rigorous, software-based approach to sanitization that goes beyond simple factory resets.";
    }
    if (isCompliance) {
      return "Regulatory landscapes are shifting globally. With the enforcement of strict data sovereignty laws, enterprises must move from 'deleting data' to 'verifiable sanitization' to maintain audit readiness and avoid catastrophic fines.";
    }
    if (variation === 1) {
      return "In an era of hyper-digitization, data is an asset during its use and a massive liability at its end-of-life. Protecting this lifecycle requires more than just encryption—it requires a documented, irreversible erasure process.";
    }
    return "The security of enterprise data at its end-of-life is no longer a choice—it is a legal mandate. Whether it is the GDPR, CCPA, or regional acts like India's DPDP Act 2023, the principle remains: data must be irrecoverably destroyed.";
  };

  const getTechnicalContext = () => {
    if (isSSD) {
      return "Modern SSDs and NVMe drives pose unique challenges. Traditional overwriting doesn't always reach data hidden in 'over-provisioned' areas. Our Purge level sanitization utilizes cryptographic erase and block-level commands to ensure 100% data destruction.";
    }
    if (variation === 2) {
      return "Enterprise storage arrays often contain complex logical structures. Simple formatting only removes the pointers. Our advanced algorithms overwrite every sector with NIST-compliant patterns, ensuring that even laboratory-grade recovery is impossible.";
    }
    return "Professional-grade sanitization ensures that PII (Personally Identifiable Information) is rendered unreadable. This is critical for organizations handling medical records, financial data, or intellectual property.";
  };

  return (
    <div className="space-y-16 mt-20">
      {/* Section 1: The Global Landscape */}
      <Reveal>
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <GlobeIcon className="w-8 h-8 text-emerald-600" />
            Global Protection Standards: {blogTitle}
          </h2>
          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              {getIntroduction()}
            </p>
            <p>
              {getTechnicalContext()} Modern architectures like **SSDs, NVMe, and Mobile Flash** use wear-leveling that leaves traces in hidden blocks. Professional <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline">Data Erasure Software</Link> and <Link to="/products/smartphone-eraser" className="text-emerald-600 hover:underline">Mobile Tools</Link> are essential to bridge this gap.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Section 2: Technical Deep Dive */}
      <Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldIcon className="w-6 h-6 text-emerald-400" />
              Sanitization Hierarchy
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-emerald-400">Clear (Logical)</h4>
                  <p className="text-slate-400 text-sm">Protects against keyboard recovery. Standard overwrite of all addressable locations.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-emerald-400">Purge (Physical/Crypto)</h4>
                  <p className="text-slate-400 text-sm">Renders recovery infeasible even with laboratory tools. Includes Cryptographic Erase.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-emerald-400">Destroy (Physical)</h4>
                  <p className="text-slate-400 text-sm">Melting, shredding, or incinerating the media. Final state for end-of-life assets.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <CheckIcon className="w-6 h-6 text-emerald-600" />
              The Audit Advantage
            </h3>
            <div className="space-y-4 text-emerald-800/80">
              <p>
                D-Secure provides a **Tamper-Proof Audit Trail**. Every process generates a 100% verifiable certificate of destruction, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Detailed Metadata (Serial, Model, Size)</li>
                <li>Method Used (NIST 800-88 / DoD 5220.22-M)</li>
                <li>Verification Success Log (Read-back test)</li>
                <li>Digitally Signed PDF for Compliance Audits</li>
              </ul>
              <p className="pt-4 font-bold text-emerald-900">
                Essential for ISO 27001, HIPAA, SOX, and PCI-DSS 4.0 audits.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 3: Industry Specific Insights */}
      <Reveal>
        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Professional Sanitization Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <DatabaseIcon className="w-10 h-10 text-emerald-600" />
              <h4 className="text-xl font-bold text-slate-900">Circular Economy</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Shredding drives is wasteful. Software erasure enables safe resale and reuse, reducing Scope 3 carbon emissions and supporting ESG goals.
              </p>
            </div>
            <div className="space-y-4">
              <ShieldIcon className="w-10 h-10 text-emerald-600" />
              <h4 className="text-xl font-bold text-slate-900">Zero-Trust Disposal</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                A single lost SSD can cost millions. Implementing a **Zero-Trust** hardware disposal policy ensures data never leaves your premises.
              </p>
            </div>
            <div className="space-y-4">
              <GlobeIcon className="w-10 h-10 text-emerald-600" />
              <h4 className="text-xl font-bold text-slate-900">Legal Immunity</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                With a verifiable certificate of destruction, your organization is legally protected against claims of data negligence during asset disposal.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 4: Detailed Regulatory Table */}
      <Reveal>
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Compliance Framework Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
                  <th className="py-4 px-2">Framework</th>
                  <th className="py-4 px-2">Region</th>
                  <th className="py-4 px-2">Key Requirement</th>
                  <th className="py-4 px-2">D-Secure Solution</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-4 px-2 font-bold text-slate-900">GDPR</td>
                  <td className="py-4 px-2">EU</td>
                  <td className="py-4 px-2">Right to Erasure</td>
                  <td className="py-4 px-2 text-emerald-600 font-medium">Standard Compliance</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-4 px-2 font-bold text-slate-900">DPDP 2023</td>
                  <td className="py-4 px-2">India</td>
                  <td className="py-4 px-2">Mandatory Deletion</td>
                  <td className="py-4 px-2 text-emerald-600 font-medium">Local Compliance</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-4 px-2 font-bold text-slate-900">NIST 800-88</td>
                  <td className="py-4 px-2">Global</td>
                  <td className="py-4 px-2">Purge/Clear Standards</td>
                  <td className="py-4 px-2 text-emerald-600 font-medium">Native Algorithms</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-4 px-2 font-bold text-slate-900">PCI DSS 4.0</td>
                  <td className="py-4 px-2">Global</td>
                  <td className="py-4 px-2">Card Data Destruction</td>
                  <td className="py-4 px-2 text-emerald-600 font-medium">Automated Shredding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Section 6: The D-Secure Ecosystem */}
      <Reveal>
        <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldIcon className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8">Unified Data Sanitization Suite</h3>
            <p className="text-slate-300 text-lg mb-10 max-w-3xl">
              Achieve complete security with our integrated ecosystem tailored for every stage of the hardware lifecycle.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <Link to="/products/drive-eraser" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-emerald-400 mb-2">Drive Eraser</h4>
                <p className="text-xs text-slate-400 leading-relaxed">High-volume HDD/SSD sanitization for enterprise data centers.</p>
              </Link>
              <Link to="/products/drive-eraser-diagnostic" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-emerald-400 mb-2">Drive Diagnostic</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Hardware health auditing before the sanitization process begins.</p>
              </Link>
              <Link to="/products/file-eraser" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-emerald-400 mb-2">File Eraser</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Securely shred individual files on active Windows/Server OS.</p>
              </Link>
              <Link to="/products/freeze-state" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-emerald-400 mb-2">Freeze State</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Handle hardware-level frozen locks to enable NIST Purge commands.</p>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 7: Final CTA */}
      <Reveal>
        <div className="max-w-4xl mx-auto text-center py-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Protect Your Future Today</h3>
          <p className="text-lg text-slate-600 leading-relaxed italic mb-8">
            "By choosing verifiable software-based erasure, you protect your brand reputation and contribute to a sustainable, circular economy."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
              Get an Audit Report
            </Link>
            <Link to="/products" className="px-8 py-3 border border-slate-300 text-slate-900 rounded-full font-bold hover:bg-slate-50 transition-all">
              See All Products
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default StandardDeepDive;
