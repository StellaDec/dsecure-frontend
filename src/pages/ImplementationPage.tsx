import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  ServerIcon,
  CheckIcon,
  GearIcon,
  ActivityIcon,
  ShieldIcon,
  ClipboardIcon,
  BuildingIcon
} from '@/components/FlatIcons';

export default function ImplementationPage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage('implementation')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                <ServerIcon className="w-12 h-12 text-white" filled={true} />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Enterprise <span className="text-emerald-400">Implementation</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Precision deployment frameworks designed for high-assurance environments. From air-gapped data centers to global cloud-managed fleets, D-Secure ensures seamless integration.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3"
                >
                  Start Your Implementation
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/resources/case-studies"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  View Deployment Stories
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5-Phase Deployment Framework */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The 5-Phase Deployment Framework</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Our systematic approach ensures that every D-Secure implementation is optimized for speed, security, and long-term governance.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  phase: "01",
                  title: "Discovery",
                  desc: "Baseline hardware profiling, network topology mapping, and regulatory requirement alignment (NIST, HIPAA, GDPR).",
                  color: "bg-emerald-50"
                },
                {
                  phase: "02",
                  title: "Architecture",
                  desc: "Configuration of PXE boot environments, Cloud Console synchronization, and API integration design.",
                  color: "bg-teal-50"
                },
                {
                  phase: "03",
                  title: "Pilot",
                  desc: "Isolated proof-of-concept (PoC) on a subset of assets to validate erasure speed and report integrity.",
                  color: "bg-cyan-50"
                },
                {
                  phase: "04",
                  title: "Scale",
                  desc: "Global rollout across multiple sites using localized distribution servers and automated workflows.",
                  color: "bg-blue-50"
                },
                {
                  phase: "05",
                  title: "Governance",
                  desc: "Final audit log integration, certificate automation, and team proficiency training.",
                  color: "bg-indigo-50"
                }
              ].map((item, index) => (
                <Reveal key={item.phase} delayMs={index * 100}>
                  <div className={`${item.color} p-8 rounded-3xl h-full flex flex-col border border-slate-100`}>
                    <span className="text-4xl font-black text-slate-200 mb-6">{item.phase}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Matrix */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container-responsive">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Universal <span className="text-emerald-400">Integration</span> Matrix</h2>
                  <p className="text-xl text-slate-300 mb-10">
                    D-Secure isn't just software; it's a connected ecosystem. Our implementation services focus on weaving data sanitization into your existing IT stack.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BuildingIcon className="w-6 h-6 text-emerald-400" filled={true} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Active Directory & SSO</h4>
                        <p className="text-slate-400 text-sm">Seamless user provisioning and RBAC enforcement through your existing identity providers.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ActivityIcon className="w-6 h-6 text-blue-400" filled={true} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">SIEM & Audit Integration</h4>
                        <p className="text-slate-400 text-sm">Real-time forwarding of erasure logs to Splunk, Sentinel, or ELK stacks for unified compliance monitoring.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ClipboardIcon className="w-6 h-6 text-purple-400" filled={true} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">CMDB Synchronization</h4>
                        <p className="text-slate-400 text-sm">Automatic updating of asset status in ServiceNow, Jira Service Management, or custom ERPs.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:w-1/2">
                <Reveal delayMs={200}>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 p-1 rounded-3xl border border-white/10">
                    <div className="bg-slate-800 rounded-3xl p-8 md:p-12">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <ShieldIcon className="w-6 h-6 text-emerald-400" filled={true} />
                        Implementation Standards
                      </h3>
                      <table className="w-full text-sm">
                        <thead className="text-slate-400 text-left border-b border-white/10">
                          <tr>
                            <th className="pb-4 font-medium">Standard</th>
                            <th className="pb-4 font-medium">D-Secure Support</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          <tr className="border-b border-white/5">
                            <td className="py-4">Network Protocols</td>
                            <td className="py-4">PXE, iPXE, DHCP, TFTP, HTTP(S)</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">Cloud Architecture</td>
                            <td className="py-4">AWS, Azure, GCP, On-Prem Air-Gapped</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">Reporting Engine</td>
                            <td className="py-4">XML, JSON, CSV, API, Signed PDF</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">Hardware Profile</td>
                            <td className="py-4">UEFI, BIOS, ARM, NVMe, SAS, SATA</td>
                          </tr>
                          <tr>
                            <td className="py-4">Auth Methods</td>
                            <td className="py-4">OAuth2, SAML 2.0, API Key, LDAP</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Services */}
        <section className="py-24 bg-white">
          <div className="container-responsive max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Professional Services Tiers</h2>
                <p className="text-lg text-slate-600">Choose the level of engagement that fits your organizational complexity.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delayMs={100}>
                <div className="p-8 rounded-3xl border border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Self-Service</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1">
                    Perfect for smaller IT teams. Includes comprehensive documentation, video guides, and standard email support for initial setup.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-3 mb-8">
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Standard Knowledge Base
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Email Support (24h SLA)
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Select Tier</button>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="p-8 rounded-3xl border-2 border-emerald-500 bg-emerald-50/30 shadow-xl shadow-emerald-500/10 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">Recommended</div>
                  <h3 className="text-xl font-bold mb-4">Assisted Deployment</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1">
                    Direct access to implementation engineers who will guide your team through PXE setup, CMDB integration, and policy creation.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-3 mb-8">
                    <li className="flex gap-2 font-semibold text-slate-900">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Dedicated Project Lead
                    </li>
                    <li className="flex gap-2 font-semibold text-slate-900">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Live Architecture Workshops
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Phone Support (4h SLA)
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all">Select Tier</button>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="p-8 rounded-3xl border border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Enterprise White-Glove</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1">
                    End-to-end managed implementation. We handle the entire architecture, scripting, and post-rollout validation for global fleets.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-3 mb-8">
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      On-Site Audit Support
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      Custom API Development
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                      24/7 Priority Hotline
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Select Tier</button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready for a Secure Rollout?</h2>
              <p className="text-xl mb-12 opacity-90 text-white">
                Our implementation experts are standing by to help you design a sanitization infrastructure that scales with your growth.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Schedule Technical Call
                </Link>
                <Link
                  to="/solutions"
                  className="px-10 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all border border-emerald-500/50"
                >
                  Explore Solutions
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
