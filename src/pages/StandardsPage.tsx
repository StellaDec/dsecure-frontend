import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ShieldIcon,
  CheckIcon
} from '@/components/FlatIcons';

export default function StandardsPage() {
  const standards = [
    {
      name: 'NIST 800-88',
      description: 'Guidelines for Media Sanitization',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    },
    {
      name: 'DoD 5220.22-M',
      description: 'Department of Defense standard',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    },
    {
      name: 'ISO 27001',
      description: 'Information security management',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('standards')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-8">
              {standards.map((standard, index) => (
                <Reveal key={standard.name} delayMs={index * 100}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-emerald-200">
                      {standard.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{standard.name}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">{standard.description}</p>
                    <div className="mt-6 flex items-center text-emerald-600 font-semibold text-sm">
                      Read Technical Protocol <span className="ml-2">→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Massive Technical Deep Dive Section */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="container-responsive">
            <div className="max-w-5xl mx-auto space-y-24">
              
              {/* 1. NIST 800-88 Rev. 1 Analysis */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    NIST 800-88 Rev. 1: <br />
                    <span className="text-emerald-600">The Modern Standard</span>
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Special Publication 800-88 Revision 1 is currently the most widely adopted framework globally for media sanitization. D-Secure implementation is natively mapped to NIST guidelines to ensure federal-grade compliance.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mt-1.5 mr-3 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Clear: Standard programmatic erasure for reuse within the organization.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1.5 mr-3 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Purge: Technical protocols (like Crypto Erase) for high-sensitivity security.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1.5 mr-3 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Destroy: Physical destruction when electronic sanitization is infeasible.</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                    <h3 className="text-xl font-bold mb-4 text-emerald-400 italic">"The Golden Rule"</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      NIST emphasizes that "the objective of sanitization is to render target data recovery infeasible for a given level of effort." D-Secure's engine provides the mathematical proof of this infeasibility through algorithmic validation.
                    </p>
                    <div className="h-px bg-slate-800 mb-6"></div>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-white">100%</div>
                      <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Audit Accuracy Rate</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* 2. IEEE 2883-2022: The New Horizon */}
              <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100">
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">IEEE 2883-2022 Integration</h2>
                  <p className="text-slate-600 text-lg">
                    D-Secure is among the first platforms to adopt the IEEE 2883-2022 standard, which addresses the unique complexities of modern NAND flash and NVMe architecture that legacy DoD standards miss.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">Addressing SSD Persistence</h4>
                    <p className="text-slate-600">Unlike HDDs, SSDs use wear-leveling and over-provisioning which can hide data from standard overwrites. IEEE 2883 mandates hardware-level sanitization commands that D-Secure executes natively.</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">Logical vs. Physical Sanitization</h4>
                    <p className="text-slate-600">D-Secure separates logical block sanitization from physical media neutralization, providing a multi-layered verification pass that satisfies both IT teams and legal auditors.</p>
                  </div>
                </div>
              </div>

              {/* 3. Global Compliance Matrix */}
              <div className="overflow-hidden">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Global Sanitization Standards Matrix</h2>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="p-4 rounded-tl-xl font-bold">Standard Name</th>
                        <th className="p-4 font-bold">Region/Origin</th>
                        <th className="p-4 font-bold">Key Methodology</th>
                        <th className="p-4 rounded-tr-xl font-bold">D-Secure Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">BSI-2011-VS</td>
                        <td className="p-4">Germany / EU</td>
                        <td className="p-4">Multi-pass Overwrite + Verification</td>
                        <td className="p-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Certified</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">HMG Infosec No. 5</td>
                        <td className="p-4">United Kingdom</td>
                        <td className="p-4">High-Assurance Baseline Erasure</td>
                        <td className="p-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Compliant</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">Navy NAVSO P-5239-26</td>
                        <td className="p-4">USA / Military</td>
                        <td className="p-4">3-Pass Overwrite w/ Verify</td>
                        <td className="p-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Native Support</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">DoD 5220.22-M ECE</td>
                        <td className="p-4">Global Enterprise</td>
                        <td className="p-4">7-Pass Complex Overwrite</td>
                        <td className="p-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Native Support</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Strategic ROI of Standardized Compliance */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6">The High Cost of Non-Standard Disposal</h2>
                  <p className="text-emerald-50 text-lg leading-relaxed mb-8 max-w-3xl">
                    Adhering to a global standard isn't just about security—it's a financial imperative. Data breaches originating from improperly disposed IT assets cost organizations an average of <strong>$4.45 million</strong> per incident. Standardizing with D-Secure eliminates this risk vector entirely while enabling the circular economy benefits of hardware reuse.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">0%</div>
                      <div className="text-xs text-emerald-200 uppercase tracking-widest">Residual Data Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">100%</div>
                      <div className="text-xs text-emerald-200 uppercase tracking-widest">Audit Pass Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">85%</div>
                      <div className="text-xs text-emerald-200 uppercase tracking-widest">Faster Decommissioning</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">$0</div>
                      <div className="text-xs text-emerald-200 uppercase tracking-widest">Compliance Fines</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
