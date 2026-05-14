import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  ActivityIcon,
  StarIcon,
  BuildingIcon,
  ClipboardIcon,
  TrendingUpIcon,
  ServerIcon
} from '@/components/FlatIcons';

export default function ComparisonPage() {
  const comparisonData = [
    {
      feature: "Firmware-Level Commands",
      dsecure: "Automatic execution of Crypto Scramble, Block Erase, and Sanitize commands (NVMe/SAS).",
      legacy: "Often limited to simple LBA zero-fill or pattern overwriting.",
      impact: "High-security 'Purge' vs. basic 'Clear'."
    },
    {
      feature: "Reporting Integrity",
      dsecure: "Cryptographically hashed, digitally signed XML/PDF reports stored in immutable ledgers.",
      legacy: "Simple text/CSV logs vulnerable to manual editing and unauthorized modification.",
      impact: "Audit-ready proof vs. disputed evidence."
    },
    {
      feature: "Deployment Scale",
      dsecure: "Concurrent erasure of 1000+ nodes via 10Gbps iPXE network boot environments.",
      legacy: "Sequential processing via manual USB boot drives (Sneakernet).",
      impact: "Days of work vs. Weeks of manual labor."
    },
    {
      feature: "Regulatory Mapping",
      dsecure: "Built-in enforcement for NIST 800-88 R1, IEEE 2883-2022, and HMG IS5.",
      legacy: "Generic patterns (DoD 5220) often deprecated for modern SSD/Flash media.",
      impact: "Legal compliance vs. high liability risk."
    },
    {
      feature: "Hardware Profiling",
      dsecure: "Low-level controller interrogation to detect HPA, DCO, and remapped sectors.",
      legacy: "Standard OS-level drive recognition; ignores hidden data areas.",
      impact: "100% data destruction vs. potential remanence."
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('comparison')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-widest uppercase">
                Architecture vs. Utility
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                The <span className="text-blue-400">Comparison</span> Report
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Discover why leading enterprises are moving away from legacy wiping utilities toward D-Secure’s high-assurance lifecycle governance ecosystem.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-3"
                >
                  Request Technical Whitepaper
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  View Enterprise Licensing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical Comparison Matrix */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Technical Execution Matrix</h2>
                <p className="text-lg text-slate-600">A granular breakdown of architectural capabilities between D-Secure and legacy software.</p>
              </div>
            </Reveal>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-6 px-4 font-bold text-slate-900 w-1/4">Feature / Capability</th>
                    <th className="py-6 px-4 font-bold text-blue-600 w-1/3 bg-blue-50 rounded-t-2xl">D-Secure Tech</th>
                    <th className="py-6 px-4 font-bold text-slate-400 w-1/3">Legacy Wiping Tools</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-6 px-4 align-top">
                        <div className="font-bold text-slate-900 mb-1">{row.feature}</div>
                        <div className="text-xs text-slate-400 font-semibold uppercase">Impact: {row.impact}</div>
                      </td>
                      <td className="py-6 px-4 bg-blue-50/50 align-top">
                        <div className="flex gap-3">
                          <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" filled={true} />
                          <span className="font-medium text-slate-800">{row.dsecure}</span>
                        </div>
                      </td>
                      <td className="py-6 px-4 align-top text-slate-500 italic">
                        {row.legacy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Legacy Fails Section */}
        <section className="py-24 bg-slate-50">
          <div className="container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <Reveal>
                  <h2 className="text-4xl font-bold text-slate-900 mb-8">The Critical Failure of <span className="text-red-500">Legacy Utilities</span></h2>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                    Most legacy tools still rely on **Block-Level Overwriting**, a method designed for magnetic spinning platters. In the modern era of SSDs, NVMe, and virtualized storage, this approach leaves significant amounts of data recoverable through wear-leveling and remapped sectors.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Inability to Interrogate Controllers",
                        desc: "Legacy tools see the 'logical' drive, not the 'physical' NAND, missing data hidden in reserved pools."
                      },
                      {
                        title: "Lack of Cryptographic Assurance",
                        desc: "Legacy tools cannot verify if an SED (Self-Encrypting Drive) has successfully rotated its internal keys."
                      },
                      {
                        title: "Manual Dependency",
                        desc: "Reliance on human intervention increases the 'Insider Threat' surface area significantly."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div className="relative">
                <Reveal delayMs={200}>
                  <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-2xl font-bold mb-8">D-Secure's Architectural Answer</h3>
                    <ul className="space-y-8">
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ShieldIcon className="w-5 h-5 text-emerald-400" filled={true} />
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">Deep Hardware Profiling</h5>
                          <p className="text-slate-400 text-sm">Automated interrogation of drive firmware to identify the most secure sanitization command available.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ActivityIcon className="w-5 h-5 text-blue-400" filled={true} />
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">Forensic Verification</h5>
                          <p className="text-slate-400 text-sm">Post-erasure sampling that queries the storage media at the electrical level to confirm zero remanence.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ClipboardIcon className="w-5 h-5 text-purple-400" filled={true} />
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">API-First Reporting</h5>
                          <p className="text-slate-400 text-sm">Removing the human from the loop by automating the delivery of certificates directly to your CMDB.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* TCO Comparison */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Total Cost of Ownership (TCO)</h2>
                <p className="text-lg text-slate-600">While legacy tools may seem cheaper upfront, their operational inefficiencies and liability risks make them far more expensive over time.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal delayMs={100}>
                <div className="p-10 rounded-[3rem] bg-slate-900 text-white h-full">
                  <h3 className="text-2xl font-bold mb-8 text-emerald-400">D-Secure: The Strategic Asset</h3>
                  <div className="space-y-6 text-slate-400">
                    <p>• **Efficiency:** 1 operator can manage 500+ wipes simultaneously.</p>
                    <p>• **Compliance:** Automated logs reduce audit preparation time by 90%.</p>
                    <p>• **Risk:** Near-zero liability for data leaks due to 'Purge-level' sanitization.</p>
                    <p>• **Lifecycle:** Maximizes hardware resale value through certified, clean data states.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="p-10 rounded-[3rem] border-2 border-dashed border-slate-200 h-full">
                  <h3 className="text-2xl font-bold mb-8 text-slate-400">Legacy Tools: The Hidden Liability</h3>
                  <div className="space-y-6 text-slate-500">
                    <p>• **Labor:** Requires high-touch, one-by-one disk management.</p>
                    <p>• **Audit:** Manual report consolidation prone to errors and missing data.</p>
                    <p>• **Risk:** High potential for bit remanence in modern NAND/SSD storage.</p>
                    <p>• **Value:** Devalued hardware due to lack of verifiable sanitization certificates.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Modernize Your Strategy?</h2>
              <p className="text-xl mb-12 opacity-90">
                Join thousands of global enterprises that have transitioned to D-Secure's high-assurance ecosystem.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Schedule Architecture Review
                </Link>
                <Link
                  to="/all-products"
                  className="px-10 py-4 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-all border border-blue-500/50"
                >
                  Explore Product Suite
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
