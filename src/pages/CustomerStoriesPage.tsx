import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  BuildingIcon,
  ClipboardIcon,
  ShieldIcon,
  ActivityIcon,
  TrendingUpIcon
} from '@/components/FlatIcons';

export default function CustomerStoriesPage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage('customer-stories')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                Global Success <span className="text-emerald-400">Narratives</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Discover how world-leading enterprises leverage D-Secure's high-assurance data sanitization ecosystem to mitigate risk, ensure compliance, and optimize hardware lifecycles.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/resources/case-studies"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3"
                >
                  Explore Full Case Studies
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  Request Proof of Concept
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical Validation Metrics */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Reveal delayMs={100}>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ActivityIcon className="w-8 h-8 text-emerald-600" filled={true} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">99.999%</h3>
                  <p className="text-lg font-semibold text-emerald-600 mb-4">Erasure Verification Rate</p>
                  <p className="text-slate-600 leading-relaxed">
                    Across 10M+ sanitized nodes, our clients report a near-perfect verification success rate against forensic-level bit-by-bit audits.
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUpIcon className="w-8 h-8 text-blue-600" filled={true} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">65%</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-4">Operational Efficiency Gain</p>
                  <p className="text-slate-600 leading-relaxed">
                    Enterprises using our automated mass-erasure cloud console reduce manual labor hours by over 60% compared to traditional wiping methods.
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ShieldIcon className="w-8 h-8 text-purple-600" filled={true} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">Zero</h3>
                  <p className="text-lg font-semibold text-purple-600 mb-4">Compliance Breach Incidents</p>
                  <p className="text-slate-600 leading-relaxed">
                    In over a decade of operation, zero D-Secure certified clients have faced data leak penalties or audit failures related to hardware disposal.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Industry-Specific Narratives */}
        <section className="py-24 bg-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Industry Impact Deep Dives</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Technical summaries of how D-Secure solves complex sanitization challenges across high-stakes vertical markets.
                </p>
              </div>
            </Reveal>

            <div className="space-y-12">
              {/* Financial Services */}
              <Reveal>
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-slate-900 p-12 text-white flex flex-col justify-center">
                    <BuildingIcon className="w-12 h-12 text-emerald-400 mb-6" filled={true} />
                    <h3 className="text-3xl font-bold mb-4">Financial Services</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      Wiping 50,000+ hybrid storage nodes across global data centers for a Top-5 Global Investment Bank.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                        <span>NIST 800-88 Purge Validation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                        <span>SIEM/Splunk Integration</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-12">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">The Technical Challenge</h4>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      The client required a solution capable of handling massive scale while providing cryptographic proof of erasure for self-encrypting drives (SEDs) and legacy spinning media. Manual intervention had to be minimized to reduce human error and insider threat risks during the decommissioning phase.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-bold text-slate-900 mb-3">Implementation Architecture</h5>
                        <ul className="text-slate-600 space-y-2">
                          <li>• PXE-based network boot for mass parallelization.</li>
                          <li>• Automated asset discovery and hardware profiling.</li>
                          <li>• Real-time progress monitoring via Cloud Console.</li>
                          <li>• Tamper-proof XML report generation.</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 mb-3">The D-Secure Outcome</h5>
                        <p className="text-slate-600 italic">
                          "D-Secure's ability to integrate directly with our existing CMDB and SIEM platforms transformed our hardware retirement process from a liability into a streamlined, audited workflow."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Healthcare */}
              <Reveal>
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row-reverse">
                  <div className="lg:w-1/3 bg-emerald-900 p-12 text-white flex flex-col justify-center">
                    <ActivityIcon className="w-12 h-12 text-emerald-400 mb-6" filled={true} />
                    <h3 className="text-3xl font-bold mb-4">Healthcare Systems</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      Ensuring HIPAA/HITECH compliance for a multi-state hospital network during a total hardware refresh.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                        <span>PHI Data Shielding</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                        <span>Certificate Lifecycle Mgmt</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-12">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">The Technical Challenge</h4>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      A major healthcare provider needed to decommission 15,000 workstations and mobile medical carts containing sensitive Patient Health Information (PHI). The solution had to work in an air-gapped environment while maintaining a centralized audit log for regulatory inspections.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-bold text-slate-900 mb-3">Implementation Architecture</h5>
                        <ul className="text-slate-600 space-y-2">
                          <li>• Offline license activation for air-gapped sites.</li>
                          <li>• Custom ISO creation for medical proprietary hardware.</li>
                          <li>• Digitally signed PDF certificates for each device.</li>
                          <li>• Automatic PHI field scrubbing in audit logs.</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 mb-3">The D-Secure Outcome</h5>
                        <p className="text-slate-600 italic">
                          "Compliance is non-negotiable in healthcare. D-Secure provided the forensic-grade assurance we needed to satisfy auditors while maintaining operational speed."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Methodology Deep Dive */}
        <section className="py-24 bg-white">
          <div className="container-responsive max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-10">The Methodology of <span className="text-emerald-400">Certainty</span></h2>
                
                <div className="prose prose-invert prose-lg max-w-none">
                  <p>
                    At D-Secure, a "Customer Story" isn't just about a sale; it's about the technical validation of our **5-Phase Sanitization Lifecycle**. This methodology ensures that every success narrative is backed by empirical data and forensic-grade verification.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-emerald-400 font-bold text-xl mb-2">Phase 1: Hardware Profiling</h4>
                        <p className="text-slate-400 text-base">
                          Our engine performs a low-level query of the storage controller to identify hidden sectors, HPA/DCO areas, and firmware capabilities (Crypto Erase vs. Block Erase).
                        </p>
                      </div>
                      <div>
                        <h4 className="text-emerald-400 font-bold text-xl mb-2">Phase 2: Protocol Selection</h4>
                        <p className="text-slate-400 text-base">
                          Based on the hardware profile and regulatory requirements (NIST 800-88, IEEE 2883-2022), the optimal erasure algorithm is dynamically selected or manually enforced.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-emerald-400 font-bold text-xl mb-2">Phase 3: Execution & Monitoring</h4>
                        <p className="text-slate-400 text-base">
                          Erasure is executed with real-time sector-level tracking. If a single bad block or firmware-level error occurs, the process is flagged for manual override or physical destruction.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-emerald-400 font-bold text-xl mb-2">Phase 4: Multi-Layer Verification</h4>
                        <p className="text-slate-400 text-base">
                          Following erasure, a bit-by-bit comparison across 10% to 100% of the drive surface is performed to confirm the absence of residual magnetic or electrical signatures.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <StarIcon className="w-6 h-6 text-emerald-400" filled={true} />
                      The "Gold Standard" Audit
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Every customer story conclude with a **Final Proof of Sanitization (FPS)** report. These reports are cryptographically hashed and stored in our tamper-proof ledger, ensuring that five years from now, our clients can prove with 100% certainty that a specific serial number was sanitized according to global standards.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-emerald-600 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Build Your Own Success Story</h2>
              <p className="text-xl mb-12 opacity-90">
                Join thousands of global organizations that trust D-Secure for their most critical data sanitization needs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Contact Sales
                </Link>
                <Link
                  to="/pricing"
                  className="px-10 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-all border border-emerald-500/50"
                >
                  View Licensing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
