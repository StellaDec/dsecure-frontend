import { useEffect } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

export default function WhyDSecurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("why-d-secure")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Why Choose D-Secure for Data Lifecycle Governance?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We move organizations beyond basic data wiping utilities into
              structured, highly governed data sanitization frameworks—proactively
              eliminating residual data risks and ensuring absolute compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Imperative Area */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The Imperative for Structured Sanitization
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Legacy wiping tools lack verifiable audit trails, leaving enterprises
                exposed to data breaches during hardware decommissioning, lease
                returns, or cloud migrations. Ad-hoc processes escalate non-compliance risks under strict frameworks like GDPR and NIST 800-88.
              </p>
            </div>

            {/* Verification Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-emerald-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Unmatched Verification & Auditability
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                D-Secure provides cryptographic erasure coupled with tamper-proof
                logs. Every sanitization action generates a digitally signed
                Certificate of Destruction, ensuring your internal teams and
                external auditors have absolute, verifiable proof of data removal.
              </p>
            </div>

            {/* Integration Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Seamless Workflow Integration
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether deploying across isolated local networks, complex multi-cloud
                environments, or remote endpoints, D-Secure integrates directly
                into your existing IT asset disposition (ITAD) and lifecycle
                management pipelines with robust API support.
              </p>
            </div>

            {/* Compliance Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The Ultimate Compliance Advantage
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Achieve strict alignment with over 24 global security standards,
                including NIST 800-88 Purge parameters, ISO 27001 data disposal
                clauses, and SOC 2 asset management frameworks. D-Secure turns
                data erasure from a tactical chore into a strategic compliance asset.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                    The Strategic Imperative: Why Global Enterprises Standardize on D-Secure
                  </h2>

                  <div className="prose prose-slate max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          1. Beyond Bit-Level Wiping: The Architectural Difference
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Traditional data wiping utilities often operate at the OS level, which is insufficient for modern storage architectures like NVMe, SSD, and hybrid arrays. These legacy tools fail to address hidden sectors, remapped blocks, and over-provisioned space where sensitive data fragments often reside.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          D-Secure’s engine interacts directly with the storage controller via low-level firmware commands. Our <strong>"Deep Purge"</strong> technology triggers internal hardware-level sanitization protocols (such as Sanitize Device or Crypto Erase) that ensure every nanometer of the storage medium is neutralized, not just the logical address space visible to the operating system.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          2. Economic Rationalization: ROI of Erasure vs. Destruction
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Physical shredding is an archaic "scorched earth" policy that destroys millions of dollars in residual hardware value every year. For a mid-sized enterprise decommissioning 1,000 laptops, physical destruction results in zero recovery value and high disposal fees.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          By standardizing on D-Secure, organizations can securely repurpose or resell assets, capturing up to <strong>40% higher residual value</strong>. Our software-defined sanitization pays for itself through asset recovery alone, while simultaneously eliminating the logistical costs of secure shredding transportation and the environmental liability of electronic waste.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-8 mb-12 border border-slate-100">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                        D-Secure Global Compliance & Regulatory Alignment Matrix
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-slate-600">
                          <thead className="text-slate-900 font-bold border-b border-slate-200">
                            <tr>
                              <th className="pb-4 pr-4">Framework / Standard</th>
                              <th className="pb-4 px-4">D-Secure Capability</th>
                              <th className="pb-4 pl-4">Enterprise Outcome</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            <tr>
                              <td className="py-4 pr-4 font-semibold">NIST 800-88 Rev. 1</td>
                              <td className="py-4 px-4">Full implementation of "Purge" and "Clear" parameters across all media types.</td>
                              <td className="py-4 pl-4 text-emerald-700">Highest level of U.S. Federal compliance.</td>
                            </tr>
                            <tr>
                              <td className="py-4 pr-4 font-semibold">GDPR (Article 17)</td>
                              <td className="py-4 px-4">Automated "Right to Erasure" fulfillment with verifiable audit trails.</td>
                              <td className="py-4 pl-4 text-emerald-700">Mitigation of multi-million Euro non-compliance fines.</td>
                            </tr>
                            <tr>
                              <td className="py-4 pr-4 font-semibold">PCI DSS 4.0</td>
                              <td className="py-4 px-4">Secure destruction of cardholder data on decommissioned storage systems.</td>
                              <td className="py-4 pl-4 text-emerald-700">Seamless passage of QSA audits for financial entities.</td>
                            </tr>
                            <tr>
                              <td className="py-4 pr-4 font-semibold">ISO/IEC 27001</td>
                              <td className="py-4 px-4">Evidence-based asset disposal controls (A.8.3.2) and information labeling.</td>
                              <td className="py-4 pl-4 text-emerald-700">Unified global security posture and certification.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          3. Environmental, Social, and Governance (ESG) Impact
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          The "Shred-First" mentality is a major contributor to the global e-waste crisis, which now exceeds 50 million metric tons annually. D-Secure enables the <strong>Circular Economy</strong> by certifying hardware for safe second-life usage.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          For every 1,000 hard drives sanitized with D-Secure instead of shredded, an enterprise prevents approximately 2.5 metric tons of CO2 emissions associated with new manufacturing. We provide "Green Certificates" that your CSR teams can use to quantify scope 3 emissions reductions.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          4. Scalability: From Endpoints to Hyperscale Data Centers
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Unlike manual wiping tools that require one-by-one technician intervention, D-Secure is built for mass automation. Our PXE network boot and API-driven workflows allow a single operator to sanitize thousands of server nodes simultaneously.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          Whether it's a remote employee's laptop in London or a 10,000-node rack in a Singapore data center, D-Secure provides a unified management console to execute, track, and verify sanitization across the entire global footprint of your IT estate.
                        </p>
                      </div>
                    </div>

                    <div className="mt-12 p-8 bg-emerald-900 rounded-xl text-white">
                      <h3 className="text-2xl font-bold mb-4">The D-Secure Philosophy: Immutable Trust</h3>
                      <p className="text-emerald-100 leading-relaxed mb-6">
                        In an era where "deleted" rarely means "gone," D-Secure exists to restore certainty. We believe that data sanitization is not a technical byproduct, but a fundamental pillar of modern cybersecurity. Our engineers work at the intersection of hardware physics and cryptographic theory to ensure that when you choose D-Secure, you aren't just buying software—you are acquiring an insurance policy for your most valuable digital assets.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-emerald-800/50 px-4 py-2 rounded-lg border border-emerald-700 text-sm font-mono">
                          24+ Erasure Algorithms
                        </div>
                        <div className="bg-emerald-800/50 px-4 py-2 rounded-lg border border-emerald-700 text-sm font-mono">
                          NIST 800-88 Certified
                        </div>
                        <div className="bg-emerald-800/50 px-4 py-2 rounded-lg border border-emerald-700 text-sm font-mono">
                          Tamper-Proof Logs
                        </div>
                        <div className="bg-emerald-800/50 px-4 py-2 rounded-lg border border-emerald-700 text-sm font-mono">
                          API-First Integration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto bg-slate-100 rounded-xl p-6 text-slate-500 text-sm">
            <p>
              Metadata Category Alignment: Enterprise Compliance Strategy / Data
              Hygiene / Lifecycle Governance Risk Management / ESG Sustainability
              Reporting / Cybersecurity Audit Readiness / NIST 800-88 Purge
              Protocols.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
