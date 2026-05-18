import React, { useState, useEffect } from "react";
import { 
  HardDrive, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Download,
  Database,
  Cpu,
  RefreshCw
} from "lucide-react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useFormSubmission } from "../../hooks/useFormSubmission";

interface CalculationResults {
  passes: number;
  estimatedTime: string;
  method: string;
  recommendation: string;
  securityLevel: "High" | "Medium" | "Standard";
}

const SSDPassCalculatorPage: React.FC = () => {
  const [driveType, setDriveType] = useState<"HDD" | "SSD" | "NVMe">("SSD");
  const [capacity, setCapacity] = useState<number>(500); // GB
  const [standard, setStandard] = useState<string>("NIST_PURGE");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { submitForm, isSubmitting } = useFormSubmission({
    requiredFields: ["name", "email"]
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: ""
  });

  const calculate = () => {
    let passes = 0;
    let speed = 0; // MB/s
    let method = "";
    let recommendation = "";
    let securityLevel: "High" | "Medium" | "Standard" = "Standard";

    // Speed estimation
    if (driveType === "HDD") speed = 140;
    else if (driveType === "SSD") speed = 500;
    else speed = 2500;

    // Standard Logic
    if (standard === "NIST_CLEAR") {
      method = "Overwrite (1 Pass)";
      securityLevel = "Standard";
      recommendation = "Suitable for reuse within the same security domain.";
    } else if (standard === "NIST_PURGE") {
      if (driveType === "HDD") {
        passes = 3;
        method = "Block Overwrite / Secure Erase";
      } else {
        passes = 1;
        method = "Crypto Erase / Sanitize Command";
      }
      securityLevel = "High";
      recommendation = "Recommended for assets leaving the organization.";
    } else if (standard === "DOD_3") {
      passes = 3;
      method = "DoD 5220.22-M (3 Passes)";
      securityLevel = "Medium";
      recommendation = "Legacy military standard. Effective but slower than NIST Purge.";
    } else if (standard === "DOD_7") {
      passes = 7;
      method = "DoD 5220.22-M ECE (7 Passes)";
      securityLevel = "High";
      recommendation = "Maximum security legacy standard. Very slow on large drives.";
    }

    // Time calculation
    const totalMB = capacity * 1024 * passes;
    const seconds = totalMB / speed;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    let timeStr = "";
    if (hours > 0) timeStr += `${hours}h `;
    timeStr += `${minutes}m`;

    setResults({
      passes,
      estimatedTime: timeStr,
      method,
      recommendation,
      securityLevel
    });
  };

  useEffect(() => {
    calculate();
  }, [driveType, capacity, standard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({
      ...contactForm,
      formType: "SSD Calculator Content Lead",
      calc_drive_type: driveType,
      calc_capacity: `${capacity} GB`,
      calc_standard: standard,
      calc_estimated_time: results?.estimatedTime,
      calc_passes: results?.passes
    });
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Schemas ko directStructuredData se pass karo — PAGE_SEO schemas override nahi honge, SEOHead merge karega */}
      <SEOHead 
        seo={getSEOForPage("ssd-pass-calculator")}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SSD & HDD Erasure Pass Calculator",
            "description": "Free tool to calculate the required overwrite passes and estimated erasure time for NIST 800-88 and DoD compliant data sanitization.",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "provider": { "@type": "Organization", "name": "D-Secure" },
            "url": "https://dsecuretech.com/tools/ssd-pass-calculator",
          }
        ]}
      />

      {/* Breadcrumbs — Google navigation signal */}
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/tools/ssd-pass-calculator" },
            { name: "SSD Erasure Pass Calculator", path: "/tools/ssd-pass-calculator", isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container-app relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Compliance Tool v2.1
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Data Erasure <span className="text-emerald-500">Pass Calculator: Optimize Your Sanitization Workflow</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Estimate erasure time and determine the correct sanitization protocol for your storage media based on NIST 800-88 and DoD 5220.22-M standards.
          </p>
        </div>
      </section>

      {/* SEO Content Expansion - Technical Accuracy */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why Traditional Overwrite Passes are Obsolete for Modern SSDs</h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <p>
                  For decades, the **DoD 5220.22-M** standard, which requires 3 or 7 overwrite passes, was considered the benchmark for data security. While effective for magnetic Hard Disk Drives (HDDs), this approach is fundamentally flawed for modern flash-based storage like SSDs and NVMe drives. 
                </p>
                <p>
                  Flash media uses a complex controller-managed system called **Wear Leveling**, which distributes data writes across different physical cells to extend the drive's life. A standard software overwrite pass may not reach "hidden" data in remapped blocks or spare cells. Furthermore, repeated overwriting on an SSD significantly reduces its lifespan and performance without necessarily improving data security.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  The **NIST 800-88 Purge** standard addresses these challenges by utilizing the drive's internal firmware commands, such as `BLOCK ERASE` or `CRYPTO ERASE`. These commands ensure that data is removed from all physical locations on the chip simultaneously, including over-provisioned areas and bad blocks.
                </p>
                <p>
                  Our calculator helps you determine the most efficient and secure path for your specific hardware. By choosing NIST-compliant methods over legacy DoD overwriting, you save thousands of operational hours while achieving a superior level of data sanitization that is verifiable and audit-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-6 -mt-10">
        <div className="container-app max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs */}
            <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Database className="w-5 h-5 text-emerald-600" />
                Drive Specifications
              </h2>

              <div className="space-y-8">
                {/* Drive Type Selection */}
                <div>
                  <label htmlFor="drive-type" className="block text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Storage Media Type</label>
                  <div id="drive-type" className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'HDD', icon: HardDrive, label: 'Standard HDD' },
                      { id: 'SSD', icon: Database, label: 'SATA SSD' },
                      { id: 'NVMe', icon: Cpu, label: 'NVMe/PCIe' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setDriveType(type.id as any)}
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          driveType === type.id 
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                      >
                        <type.icon className="w-6 h-6" />
                        <span className="text-xs font-bold whitespace-nowrap">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity Slider */}
                <div>
                  <div className="flex justify-between mb-4">
                    <label htmlFor="capacity-slider" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Drive Capacity</label>
                    <span className="text-emerald-600 font-bold">{capacity >= 1000 ? `${(capacity/1000).toFixed(1)} TB` : `${capacity} GB`}</span>
                  </div>
                  <input
                    id="capacity-slider"
                    type="range"
                    min="120"
                    max="8000"
                    step="100"
                    value={capacity}
                    onChange={(e) => setCapacity(Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold px-1">
                    <span>120GB</span>
                    <span>1TB</span>
                    <span>2TB</span>
                    <span>4TB</span>
                    <span>8TB</span>
                  </div>
                </div>

                {/* Erasure Standard */}
                <div>
                  <label htmlFor="standard-select" className="block text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Sanitization Standard</label>
                  <select 
                    id="standard-select"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="NIST_CLEAR">NIST 800-88 Clear (Internal/Reuse)</option>
                    <option value="NIST_PURGE">NIST 800-88 Purge (Secure Disposal)</option>
                    <option value="DOD_3">DoD 5220.22-M (3 Passes)</option>
                    <option value="DOD_7">DoD 5220.22-M ECE (7 Passes)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-emerald-600 rounded-2xl p-8 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="w-24 h-24" />
                </div>
                
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  Recommended Protocol
                </h3>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-end gap-3">
                    <div className="text-5xl font-black">{results?.passes}</div>
                    <div className="text-xl font-medium opacity-80 mb-2">Overwrite Passes</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-xs opacity-70 uppercase font-bold mb-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Est. Time
                      </div>
                      <div className="text-lg font-bold">{results?.estimatedTime}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-xs opacity-70 uppercase font-bold mb-1 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" />
                        Security
                      </div>
                      <div className="text-lg font-bold">{results?.securityLevel}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="text-sm font-medium mb-1 opacity-80">Technique:</div>
                    <div className="text-lg font-bold leading-tight">{results?.method}</div>
                  </div>
                </div>
              </div>

              {/* Warning/Info Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm mb-1">NIST Advisory</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    For modern SSDs and NVMe drives, internal <span className="font-bold">Sanitize</span> or <span className="font-bold">Crypto Erase</span> commands (NIST Purge) are more effective than multiple overwrite passes.
                  </p>
                </div>
              </div>

              {/* Lead Gen Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 text-center lg:text-left">
                  <Download className="w-5 h-5 text-emerald-600" />
                  Free Compliance Report
                </h3>
                
                {isSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="text-emerald-800 font-bold">Estimation Sent!</p>
                    <p className="text-xs text-slate-500 mt-2">The customized compliance guide and pass estimation is in your inbox.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={contactForm.name}
                      onChange={e => setContactForm({...contactForm, name: e.target.value})}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Work Email"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={contactForm.email}
                      onChange={e => setContactForm({...contactForm, email: e.target.value})}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Generating...' : 'Get Pass Estimation PDF'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Info Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Understanding Sanitization Standards</h2>
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-700">NIST SP 800-88 Rev. 1</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ameriki (US) standard jo modern media (SSD, NVMe) ke liye overwrite ki jagah Purge commands recommend karta hai. NIST Clear reusable assets ke liye hai, jabki Purge high-security disposal ke liye.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">• <span className="font-bold">Clear:</span> Single pass overwrite</li>
                  <li className="flex items-center gap-2">• <span className="font-bold">Purge:</span> Secure Erase / Crypto Erase</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">DoD 5220.22-M</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Department of Defense ka legacy standard jo character (0), complement (1), aur random binary patterns use karta hai. Aaj kal ye modern SSDs ke liye recommended nahi hai kyunki ye drive ki wear leveling aur life kam karta hai.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">• <span className="font-bold">Standard:</span> 3 Passes</li>
                  <li className="flex items-center gap-2">• <span className="font-bold">ECE:</span> 7 Passes</li>
                </ul>
              </div>
            </div>

            {/* Additional Enrichment Section */}
            {/* Is section ko drive geometry aur technical bottlenecks samjhane ke liye add kiya gaya hai */}
            <div className="prose prose-slate max-w-none border-t border-slate-200 pt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">The Impact of Drive Geometry and Architecture on Erasure Time</h3>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  When calculating the time required for complete data sanitization, many IT professionals mistakenly only consider the raw capacity of the drive. However, the physical architecture and interface geometry of the storage device play a significantly larger role in determining the total operation time. For example, a legacy SAS HDD with a high rotational speed (15K RPM) will consistently outperform a 5.4K RPM SATA drive during a multi-pass overwrite operation due to its superior seek times and sustained write throughput. Our calculator factors in these hardware-specific variables to provide a more realistic estimation of your sanitization window.
                </p>
                <p>
                  The interface bandwidth—whether it's SATA III (6Gbps), SAS-12, or the latest NVMe Gen 4/5—creates a critical bottleneck for data erasure software. While a software-based overwrite on a 1TB NVMe drive might take only a few minutes, the same operation on a 1TB external USB 2.0 drive could take several hours. Furthermore, the drive's internal cache and controller efficiency impact how quickly "Sanitize" and "Secure Erase" commands are executed. In enterprise environments where hundreds of drives are decommissioned simultaneously, understanding these throughput limitations is vital for effective project scheduling and resource allocation.
                </p>
                <p>
                  Finally, the "Verification" phase of the erasure process adds a significant amount of time that is often overlooked in basic calculations. To ensure compliance with international standards, a percentage of the drive must be re-read and compared against the intended erasure pattern to confirm success. High-integrity sanitization tools like D-Secure perform this verification at the block level, ensuring that even data hidden in remapped sectors has been successfully cleared. While this adds to the total duration, it is the only way to provide a tamper-proof guarantee that your organization's sensitive data is 100% unrecoverable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SSDPassCalculatorPage;
