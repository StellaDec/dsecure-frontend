import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "../components/Reveal";

export default function UseCasesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useCases = [
    {
      title: "Finance & Banking",
      sector: "FinTech",
      challenge:
        "Protecting highly sensitive PII and financial records during workstation upgrades.",
      solution:
        "D-Secure's automated Purge protocol with auditable JSON-LD certificates for SOX compliance.",
      icon: "🏦",
    },
    {
      title: "Healthcare",
      sector: "Healthcare IT",
      challenge:
        "Handling PHI on medical devices and servers while meeting HIPAA/HITECH disposal requirements.",
      solution:
        "Device-agnostic sanitization that handles legacy proprietary firmware correctly.",
      icon: "🏥",
    },
    {
      title: "Government & Defense",
      sector: "Public Sector",
      challenge:
        "Ensuring no data leaks during wide-scale hardware decommissioning across multiple agencies.",
      solution:
        "Centralized governance console with tamper-proof audit trails for cross-agency verification.",
      icon: "🏛️",
    },
    {
      title: "ITAD & Recyclers",
      sector: "Eco-Tech",
      challenge:
        "Processing thousands of drives daily with high throughput and 100% verification.",
      solution:
        "Parallel execution engine capable of sanitizing 100+ drives simultaneously.",
      icon: "♻️",
    },
    {
      title: "Cloud Service Providers",
      sector: "Data Centers",
      challenge:
        "Secure decommissioning of faulty SSDs in high-density storage arrays.",
      solution:
        "Remote-triggered cryptographic erase that integrates with existing maintenance workflows.",
      icon: "☁️",
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("use-cases")} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-emerald-900 py-20 lg:py-32 text-white">
          <div className="container-responsive">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                Enterprise <span className="text-brand">Use Cases</span>
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl">
                See how industry leaders across the globe leverage D-Secure to
                eliminate data liabilities and streamline compliance operations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Use Case Grid */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="container-responsive">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 group hover:border-brand/40 transition-all"
                >
                  <div className="text-5xl mb-6">{useCase.icon}</div>
                  <div className="text-brand font-bold text-xs uppercase tracking-widest mb-2">
                    {useCase.sector}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-brand transition-colors">
                    {useCase.title}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-2">
                        The Challenge
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {useCase.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-2">
                        The D-Secure Solution
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {useCase.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-50">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-brand font-bold hover:gap-2 transition-all"
                    >
                      Learn more about {useCase.title}{" "}
                      <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Integration Section */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="container-responsive relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Deploy Anywhere, Sanitize Everywhere
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
              Our platform is designed for versatility. Whether it's an
              on-premise data center or a remote field office, D-Secure provides
              consistent, structural governance.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">On-Prem</div>
                <div className="text-xs text-slate-500">Enterprise Servers</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">Remote</div>
                <div className="text-xs text-slate-500">Corporate Laptops</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">
                  Industrial
                </div>
                <div className="text-xs text-slate-500">Medical Hardware</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">ITAD</div>
                <div className="text-xs text-slate-500">
                  High Volume Erasure
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Strategic Deep Dive: Sustainability & ROI */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Strategic Impact: Beyond the Erase Button</h2>
                <p className="text-slate-600 text-xl max-w-3xl mx-auto">
                  Data sanitization is no longer just a security checkbox; it is a strategic pillar for corporate sustainability and financial optimization.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <Reveal>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Environmental Sustainability & Circular Economy</h3>
                    <div className="prose prose-slate prose-lg text-slate-600">
                      <p>
                        The traditional "Shred-First" approach to data security is one of the leading contributors to global electronic waste. When a functional 2TB Enterprise SSD is physically crushed, it represents a loss of critical rare-earth minerals and the carbon footprint associated with its original manufacturing.
                      </p>
                      <p>
                        D-Secure enables the **Circular Economy** by allowing organizations to safely repurpose or resell their hardware without any residual data risk. By choosing software-based sanitization over physical destruction, D-Secure clients have collectively diverted thousands of tons of functional hardware from landfills, significantly lowering their scope 3 carbon emissions.
                      </p>
                    </div>
                    <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <h4 className="text-emerald-800 font-bold mb-2">The Sustainability Dividend</h4>
                      <p className="text-sm text-emerald-700">Every 1,000 drives sanitized instead of shredded saves approximately 15 metric tons of CO2 equivalent emissions.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Total Cost of Ownership (TCO) vs. Shredding</h3>
                    <div className="prose prose-slate prose-lg text-slate-600">
                      <p>
                        Physical destruction is often perceived as "cheap," but a hidden cost analysis reveals a different story. The labor for drive removal, secure transport to shredding facilities, and the 100% loss of asset residual value makes shredding an expensive liability.
                      </p>
                      <p>
                        D-Secure's ROI model focuses on **Asset Value Recovery**. A sanitized laptop or server retains 30-50% of its value on the secondary market. For an enterprise with 5,000 assets, this represents millions of dollars in recovered capital—funding the entire security budget for the following year.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-slate-900 rounded-[3rem] p-12 text-white sticky top-24">
                  <h3 className="text-3xl font-bold mb-8 text-brand">Sector Governance Frameworks</h3>
                  <div className="space-y-8">
                    <div className="border-b border-white/10 pb-8">
                      <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center text-brand text-sm">FI</span>
                        Financial Governance
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        In the banking sector, data retention periods are strictly mandated. D-Secure integrates with ITAM (IT Asset Management) systems to trigger automated erasure exactly when a record's legal hold expires, ensuring compliance with the 'Principle of Least Privilege'.
                      </p>
                    </div>
                    <div className="border-b border-white/10 pb-8">
                      <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center text-brand text-sm">HC</span>
                        Healthcare Data Integrity
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        Hospitals utilize a wide array of proprietary storage devices in MRI and CT scanners. D-Secure's hardware-agnostic kernel ensures these specialized drives are sanitized without damaging the underlying medical firmware, preserving the device's resale value for the medical equipment market.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center text-brand text-sm">IT</span>
                        ITAD High-Volume Logistics
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        For large-scale recyclers, speed is profit. D-Secure's parallel processing engine eliminates bottlenecks, allowing a single technician to manage hundreds of simultaneous erasures from a central dashboard, maximizing throughput while maintaining 100% audit accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-32 max-w-4xl mx-auto text-center">
              <Reveal>
                <div className="inline-block p-1 px-3 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6">
                  Future-Ready
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-8">The Evolution of Data Sanitization Use Cases</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-12">
                  As we move toward a world of ephemeral cloud instances and decentralized edge computing, the "Use Case" for D-Secure continues to expand. We are currently piloting solutions for **Remote Work Recovery**—enabling IT teams to securely wipe a lost or stolen laptop anywhere in the world with a single click, immediately generating a compliance certificate for the insurance carrier.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-brand text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-brand/20"
                >
                  Discuss Your Unique Use Case
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

