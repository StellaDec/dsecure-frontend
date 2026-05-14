import React from "react";
import Reveal from "@/components/Reveal";
import { ShieldIcon, CheckIcon, GlobeIcon, DatabaseIcon, ArrowRightIcon } from "@/components/FlatIcons";
import { Link } from "react-router-dom";

interface StandardDeepDiveProps {
  category?: string;
  blogTitle: string;
  blogId?: string;
}

const StandardDeepDive: React.FC<StandardDeepDiveProps> = ({ category, blogTitle, blogId = "" }) => {
  const isMobile = category?.toLowerCase().includes("mobile") || category?.toLowerCase().includes("smartphone");
  const isCompliance = category?.toLowerCase().includes("compliance") || category?.toLowerCase().includes("regulatory") || category?.toLowerCase().includes("nist") || category?.toLowerCase().includes("standard");
  const isITAD = category?.toLowerCase().includes("itad") || category?.toLowerCase().includes("disposal") || category?.toLowerCase().includes("reuse");
  const isSSD = blogTitle.toLowerCase().includes("ssd") || blogTitle.toLowerCase().includes("nvme") || blogTitle.toLowerCase().includes("flash");
  const isESG = category?.toLowerCase().includes("esg") || category?.toLowerCase().includes("sustainability") || category?.toLowerCase().includes("carbon");

  // Determine variation based on blogId to avoid site-wide duplicate content
  const variation = blogId ? (blogId.split('').reduce((acc, char) => acc + (char.codePointAt(0) || 0), 0) % 4) : 0;

  const getIntroduction = () => {
    if (isMobile) {
      return "The mobile device lifecycle is fraught with hidden data risks that traditional security protocols often overlook. From corporate smartphones containing sensitive emails to consumer trade-ins with personal PII, the sheer volume of data stored on high-density flash memory requires a rigorous, software-based approach to sanitization. Simple factory resets are no longer sufficient in an era where data recovery tools are becoming increasingly sophisticated and accessible to malicious actors.";
    }
    if (isCompliance) {
      return "The global regulatory landscape is shifting at an unprecedented pace, driven by concerns over data privacy and corporate accountability. With the enforcement of strict data sovereignty laws like GDPR, CCPA, and India's DPDP Act, enterprises must transition from 'best effort deletion' to 'certified, verifiable sanitization.' This shift is essential not only for maintaining audit readiness but also for mitigating the catastrophic financial and reputational risks associated with data breaches.";
    }
    if (isESG) {
      return "Sustainability in IT is no longer a peripheral concern—it is a core business strategy. The 'linear' model of IT asset disposal, which often involves physical shredding and waste, is being replaced by the 'circular' economy. Secure data erasure is the key enabler of this transition, allowing organizations to extend the life of their hardware, reduce Scope 3 carbon emissions, and contribute to a more sustainable technological future.";
    }
    if (variation === 1) {
      return "In today's era of hyper-digitization, data represents a dual-edged sword: it is a high-value asset during its operational life and a massive liability at its end-of-life. Protecting this lifecycle requires a paradigm shift in how we handle hardware retirement. It is not just about deleting files; it is about implementing a documented, irreversible process that ensures zero data remanence across all storage tiers.";
    }
    return "The security of enterprise data at its end-of-life has evolved from a technical recommendation to a strict legal mandate. Whether it is international frameworks like NIST 800-88 or regional legislations such as the Digital Personal Data Protection Act, the core principle remains consistent: data must be irrecoverably destroyed through verifiable means to prevent unauthorized access and ensure total privacy.";
  };

  const getTechnicalContext = () => {
    if (isSSD) {
      return "Modern SSDs and NVMe drives pose unique sanitization challenges that traditional mechanical hard drives do not. Traditional overwriting techniques often fail to reach data hidden in 'over-provisioned' areas, wear-leveling blocks, or bad sectors that the SSD controller has removed from the logical address space. Our Purge-level sanitization protocol utilizes native firmware commands, including Cryptographic Erase and block-level 'SANITIZE' commands, to ensure 100% data destruction without degrading the physical lifespan of the flash media.";
    }
    if (variation === 2) {
      return "Enterprise-grade storage arrays often utilize complex logical structures and proprietary controllers that make simple formatting operations virtually useless for security. These methods only remove the file pointers, leaving the actual binary data intact on the magnetic or flash surface. Our advanced erasure algorithms are designed to interface directly with these hardware layers, overwriting every sector with NIST-compliant patterns and performing multi-pass verifications to ensure that even laboratory-grade forensic recovery is impossible.";
    }
    if (isITAD) {
      return "The IT Asset Disposition (ITAD) process is the final and most critical stage of the hardware lifecycle. Relying on physical destruction as a default strategy is not only environmentally damaging but also economically wasteful. By implementing high-assurance software erasure, ITAD managers can unlock the remarketing value of retired assets while maintaining a 100% secure chain of custody. This dual benefit of security and value recovery is what defines a modern, mature ITAD program.";
    }
    return "Professional-grade data sanitization ensures that every bit of Personally Identifiable Information (PII) is rendered completely unreadable. This is a critical requirement for organizations operating in highly regulated sectors such as healthcare, finance, and government, where the exposure of even a single record can trigger massive legal penalties and a permanent loss of customer trust. Our tools are built to provide this level of assurance with every single operation.";
  };

  const getIndustryInsight = () => {
    if (isCompliance) return "Financial institutions are now required to maintain detailed logs of data destruction for up to seven years under various banking regulations. D-Secure's automated reporting simplifies this by generating audit-ready PDF certificates that integrate directly with enterprise ERP and ITAM systems.";
    if (isMobile) return "In the telecommunications sector, the 'Right to Erasure' is a primary consumer right. Automated mobile diagnostics and erasure tools allow service providers to process thousands of devices daily with minimal manual intervention, ensuring each one is cleared of previous user data.";
    if (isSSD) return "Data centers are increasingly transitioning to All-Flash Arrays (AFA). The density of these drives means that a single drive can contain petabytes of sensitive information. Cryptographic Erase is the only viable method for sanitizing these massive datasets within reasonable timeframes.";
    return "Across all industries, the cost of a data breach is at an all-time high, averaging over $4.45 million per incident. Implementing a standardized, software-driven erasure policy across all branch offices and remote workers is the single most effective way to close the 'disposal gap' in your security perimeter.";
  };

  return (
    <div className="space-y-16 mt-20">
      {/* Section 1: The Global Landscape */}
      <Reveal>
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
            <GlobeIcon className="w-8 h-8 text-emerald-600" />
            Global Protection Standards: {blogTitle}
          </h2>
          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed relative z-10">
            <p className="font-medium text-slate-900 text-xl mb-4">
              {getIntroduction()} When discussing <strong>{blogTitle}</strong>, establishing a verifiable and compliant security baseline is absolutely paramount.
            </p>
            <p className="mb-4">
              {getTechnicalContext()} Modern architectures like **SSDs, NVMe, and Mobile Flash** use wear-leveling that leaves traces in hidden blocks. Professional <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline">Data Erasure Software</Link> and <Link to="/products/smartphone-eraser" className="text-emerald-600 hover:underline">Mobile Tools</Link> are essential to bridge this gap. Without these specialized tools, your organization remains vulnerable to data remanence attacks.
            </p>
            <p className="bg-slate-50 p-6 rounded-xl border-l-4 border-emerald-500 italic">
               "The difference between 'deletion' and 'sanitization' is the difference between hiding a secret and destroying it forever. In the world of enterprise security, only the latter provides true peace of mind."
            </p>
          </div>
        </div>
      </Reveal>

      {/* Section 2: Technical Deep Dive */}
      <Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <ShieldIcon className="w-6 h-6 text-emerald-400" />
              The NIST 800-88 Sanitization Hierarchy
            </h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              The National Institute of Standards and Technology (NIST) provides the gold standard for media sanitization. Understanding these levels is vital for any security professional.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold border border-emerald-500/30">1</div>
                <div>
                  <h3 className="font-bold text-emerald-400 text-lg">Clear (Logical Sanitization)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Protects against simple, non-invasive data recovery techniques (keyboard recovery). This involves a standard overwrite of all addressable locations on the storage media with non-sensitive data.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold border border-emerald-500/30">2</div>
                <div>
                  <h3 className="font-bold text-emerald-400 text-lg">Purge (Physical/Cryptographic)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Renders data recovery infeasible even with specialized laboratory tools. This level includes **Cryptographic Erase (CE)** and firmware-level commands that address physical blocks hidden from the OS.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold border border-emerald-500/30">3</div>
                <div>
                  <h3 className="font-bold text-emerald-400 text-lg">Destroy (Physical Destruction)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">The final state for media that has reached its absolute end-of-life or is physically damaged. Methods include melting, shredding, incinerating, or pulverizing the media into tiny fragments.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100 shadow-sm">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <CheckIcon className="w-6 h-6 text-emerald-600" />
              The D-Secure Audit Advantage
            </h3>
            <div className="space-y-6 text-emerald-800/80 leading-relaxed">
              <p>
                Standard wiping tools often leave you in the dark. D-Secure provides a **Tamper-Proof Audit Trail** that acts as your legal shield. Every sanitization process generates a 100% verifiable certificate of destruction.
              </p>
              <div className="space-y-4">
                <div className="bg-white/60 p-4 rounded-xl border border-emerald-200/50">
                   <h4 className="font-bold text-emerald-900 mb-1">Comprehensive Metadata</h4>
                   <p className="text-sm">Capture every detail: Drive Serial Number, Model, Capacity, Interface Type, and Physical Health metrics.</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-emerald-200/50">
                   <h4 className="font-bold text-emerald-900 mb-1">Method Verification</h4>
                   <p className="text-sm">Documentation of the exact algorithm used (NIST 800-88, DoD 5220.22-M, HMG IS5) and the number of passes completed.</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-emerald-200/50">
                   <h4 className="font-bold text-emerald-900 mb-1">Post-Erasure Readback</h4>
                   <p className="text-sm">Automated sampling of the entire drive surface to verify that the pattern was written correctly and no original data remains.</p>
                </div>
              </div>
              <p className="pt-4 font-bold text-emerald-900 border-t border-emerald-200">
                This level of documentation is essential for passing rigorous ISO 27001, HIPAA, SOX, GDPR, and PCI-DSS 4.0 audits.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 3: Industry Specific Insights */}
      <Reveal>
        <div className="bg-slate-50 rounded-3xl p-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
          <h2 className="text-3xl font-bold text-slate-900 mb-10 relative z-10">Why Professional Sanitization Matters Across Industries</h2>
          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div className="space-y-5 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DatabaseIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">The Circular Economy</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Shredding functional drives is an environmental and economic waste. Secure software-based erasure enables safe resale and reuse of hardware, significantly reducing Scope 3 carbon emissions and supporting your organization's ESG and sustainability goals.
              </p>
            </div>
            <div className="space-y-5 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShieldIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Zero-Trust Disposal</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In a Zero-Trust environment, the security perimeter extends to the very end of the hardware lifecycle. A single lost SSD or improperly wiped laptop can cost millions in fines. Implementing a strictly enforced disposal policy ensures that sensitive data never leaves your controlled premises.
              </p>
            </div>
            <div className="space-y-5 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GlobeIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Legal Immunity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Relying on "we think we wiped it" is not a legal defense. With a digitally signed, tamper-proof certificate of destruction, your organization is legally protected against claims of data negligence. This is the ultimate insurance policy for your corporate data assets.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200">
             <p className="text-slate-500 text-sm text-center italic">
               **Industry Expert Insight:** {getIndustryInsight()}
             </p>
          </div>
        </div>
      </Reveal>

      {/* Section 4: Detailed Regulatory Table */}
      <Reveal>
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
             <div>
                <h3 className="text-2xl font-bold text-slate-900">Compliance Framework Comparison</h3>
                <p className="text-slate-500 text-sm">How D-Secure maps to global data protection requirements.</p>
             </div>
             <Link to="/compliance" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-sm">
                View Full Compliance Matrix <ArrowRightIcon className="w-4 h-4" />
             </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider font-bold">
                  <th className="py-5 px-4">Framework / Law</th>
                  <th className="py-5 px-4">Primary Region</th>
                  <th className="py-5 px-4">Core Erasure Requirement</th>
                  <th className="py-5 px-4">D-Secure Capability</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-slate-900 block">GDPR</span>
                    <span className="text-[10px] text-slate-400">General Data Protection Regulation</span>
                  </td>
                  <td className="py-5 px-4">European Union</td>
                  <td className="py-5 px-4 text-sm">Article 17: Right to Erasure (Be Forgotten)</td>
                  <td className="py-5 px-4 text-emerald-600 font-bold text-sm">Automated Compliance</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-slate-900 block">DPDP Act 2023</span>
                    <span className="text-[10px] text-slate-400">Digital Personal Data Protection</span>
                  </td>
                  <td className="py-5 px-4">India</td>
                  <td className="py-5 px-4 text-sm">Mandatory deletion once purpose is served</td>
                  <td className="py-5 px-4 text-emerald-600 font-bold text-sm">Localized Compliance</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-slate-900 block">NIST 800-88 R1</span>
                    <span className="text-[10px] text-slate-400">Media Sanitization Guidelines</span>
                  </td>
                  <td className="py-5 px-4">Global Standard</td>
                  <td className="py-5 px-4 text-sm">Purge and Clear Verification Standards</td>
                  <td className="py-5 px-4 text-emerald-600 font-bold text-sm">Certified Native Support</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-slate-900 block">PCI DSS 4.0</span>
                    <span className="text-[10px] text-slate-400">Payment Card Industry Standard</span>
                  </td>
                  <td className="py-5 px-4">Global Finance</td>
                  <td className="py-5 px-4 text-sm">Secure destruction of cardholder data</td>
                  <td className="py-5 px-4 text-emerald-600 font-bold text-sm">Military-Grade Shredding</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-slate-900 block">HIPAA</span>
                    <span className="text-[10px] text-slate-400">Health Insurance Portability</span>
                  </td>
                  <td className="py-5 px-4">United States</td>
                  <td className="py-5 px-4 text-sm">Safe disposal of PHI and ePHI records</td>
                  <td className="py-5 px-4 text-emerald-600 font-bold text-sm">Audit-Ready Reporting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Section 6: The D-Secure Ecosystem */}
      <Reveal>
        <div className="bg-slate-900 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <ShieldIcon className="w-96 h-96" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">A Unified Data Sanitization Suite</h3>
            <p className="text-slate-300 text-lg mb-10 max-w-4xl leading-relaxed">
              True security isn't achieved with a single tool—it requires an integrated ecosystem that covers every stage of the hardware lifecycle. From the initial diagnostic check to the final certificate of erasure, D-Secure provides the end-to-end visibility your enterprise demands.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <Link to="/products/drive-eraser" className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all group">
                <h3 className="font-bold text-emerald-400 mb-3 text-lg group-hover:translate-x-1 transition-transform">Drive Eraser</h3>
                <p className="text-xs text-slate-400 leading-relaxed">High-volume HDD/SSD sanitization for enterprise data centers and ITAD environments. Support for 100+ simultaneous erasures.</p>
              </Link>
              <Link to="/products/drive-eraser-diagnostic" className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all group">
                <h3 className="font-bold text-emerald-400 mb-3 text-lg group-hover:translate-x-1 transition-transform">Drive Diagnostic</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Perform 60+ hardware health checks before sanitization. Identify failed drives and maximize the resale value of healthy assets.</p>
              </Link>
              <Link to="/products/file-eraser" className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all group">
                <h3 className="font-bold text-emerald-400 mb-3 text-lg group-hover:translate-x-1 transition-transform">File Eraser</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Targeted secure shredding for individual files and folders on active Windows and Server environments. Ideal for daily compliance.</p>
              </Link>
              <Link to="/products/virtual-machine-eraser" className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all group">
                <h3 className="font-bold text-emerald-400 mb-3 text-lg group-hover:translate-x-1 transition-transform">VM Eraser</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Sanitize individual virtual disks and snapshots without affecting the host environment. Support for VMware, Hyper-V, and Azure.</p>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 7: Final CTA */}
      <Reveal>
        <div className="max-w-4xl mx-auto text-center py-10 bg-gradient-to-b from-transparent to-slate-50 rounded-3xl">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">Protect Your Future & Reputation</h3>
          <p className="text-xl text-slate-600 leading-relaxed italic mb-10 max-w-2xl mx-auto">
            "By choosing verifiable, software-based erasure over primitive physical destruction, you are protecting your brand reputation and leading the charge toward a sustainable, carbon-neutral IT future."
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-10 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 hover:-translate-y-1">
              Request a Security Audit
            </Link>
            <Link to="/products" className="px-10 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all hover:-translate-y-1">
              Explore Our Solutions
            </Link>
          </div>
          <p className="mt-8 text-slate-400 text-sm">
            Trusted by Fortune 500 companies and government agencies globally. 100% Audit-Ready.
          </p>
        </div>
      </Reveal>
    </div>
  );
};

export default StandardDeepDive;
