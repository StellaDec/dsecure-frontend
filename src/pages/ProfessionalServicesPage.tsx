import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  GearIcon,
  ShieldIcon,
  ActivityIcon,
  CheckIcon,
  StarIcon,
  BuildingIcon,
  ClipboardIcon,
  TrendingUpIcon
} from '@/components/FlatIcons';

export default function ProfessionalServicesPage() {
  const services = [
    {
      title: "Strategic Advisory",
      description: "Policy alignment and data governance consulting for global enterprises navigating NIST 800-88 and IEEE 2883-2022 standards.",
      icon: <ShieldIcon className="w-8 h-8 text-blue-600" filled={true} />,
      details: ["Policy Gap Analysis", "Global Regulatory Mapping", "Risk Mitigation Frameworks"]
    },
    {
      title: "Custom Engineering",
      description: "Bespoke development for complex environments, including air-gapped facility setups and custom firmware-level integrations.",
      icon: <GearIcon className="w-8 h-8 text-emerald-600" filled={true} />,
      details: ["Air-Gapped PXE Infrastructure", "Custom API Connectors", "Firmware-Level Debugging"]
    },
    {
      title: "Managed Rollouts",
      description: "End-to-end management of hardware refresh cycles, ensuring zero-touch sanitization across distributed global fleets.",
      icon: <ActivityIcon className="w-8 h-8 text-purple-600" filled={true} />,
      details: ["Global Site Orchestration", "Automated Asset Verification", "Post-Decommissioning Audits"]
    },
    {
      title: "Technical Training",
      description: "Certified proficiency programs for internal IT teams to master high-assurance sanitization and audit protocols.",
      icon: <StarIcon className="w-8 h-8 text-orange-600" filled={true} />,
      details: ["On-Site Workshops", "Virtual Sandbox Labs", "Certification Cohorts"]
    }
  ];

  return (
    <>
      <SEOHeadNative seo={getSEOForPage('professional-services')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Professional <span className="text-emerald-400">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Unlock the full potential of your data sanitization strategy with D-Secure's elite engineering and advisory teams. We bridge the gap between software and high-assurance governance.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3"
                >
                  Consult an Expert
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/implementation"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  View Deployment Framework
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">High-Assurance Service Portfolio</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Precision-engineered services designed to mitigate technical risk and ensure absolute compliance throughout the asset lifecycle.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <Reveal key={service.title} delayMs={index * 100}>
                  <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 h-full">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <CheckIcon className="w-4 h-4 text-emerald-500" filled={true} />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
          <div className="container-responsive relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">The <span className="text-emerald-400">Zero-Risk</span> Advisory Methodology</h2>
                  <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    Our professional services aren't just about installation; they're about establishing a perpetual state of compliance through rigorous methodology.
                  </p>
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="text-emerald-400 font-black text-3xl opacity-50">01</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Requirement Synthesis</h4>
                        <p className="text-slate-400">We analyze your internal security mandates against global regulations to create a unified 'Gold Standard' for your organization.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-emerald-400 font-black text-3xl opacity-50">02</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Technical Archeology</h4>
                        <p className="text-slate-400">Our engineers deep-dive into your legacy hardware stack to identify edge cases, non-standard controllers, and potential firmware blockers.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-emerald-400 font-black text-3xl opacity-50">03</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Automated Governance</h4>
                        <p className="text-slate-400">We implement the software architecture and reporting APIs that turn your manual disposal tasks into a self-auditing machine.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:w-1/2">
                <Reveal delayMs={200}>
                  <div className="p-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 relative">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <TrendingUpIcon className="w-6 h-6 text-emerald-400" filled={true} />
                      Measurable ROI of Services
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-black text-emerald-400 mb-2">40%</div>
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">Reduction in Labor Costs</p>
                        <p className="text-slate-400 text-xs mt-2">Through automated PXE workflows and custom API-based reporting.</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-black text-blue-400 mb-2">100%</div>
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">Audit Readiness</p>
                        <p className="text-slate-400 text-xs mt-2">Guaranteed cryptographic proof of erasure for every serial number in the fleet.</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-black text-purple-400 mb-2">Zero</div>
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">Non-Compliance Fines</p>
                        <p className="text-slate-400 text-xs mt-2">Absolute protection against regulatory penalties related to hardware disposal.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Sector Deep Dives */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Cross-Sector Expertise</h2>
                <p className="text-lg text-slate-600">Tailored service engagements for high-security vertical markets.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delayMs={100}>
                <div className="p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <BuildingIcon className="w-8 h-8 text-blue-600" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900">Financial Data Centers</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Mass decommissioning of hybrid-storage arrays with cryptographically-signed audit logs for SEC compliance.</p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="p-8 rounded-3xl border border-slate-200 hover:border-emerald-500 transition-all flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                    <ActivityIcon className="w-8 h-8 text-emerald-600" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900">Healthcare Networks</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">PHI-aware sanitization services across multi-site hospital ecosystems with HIPAA-validated certification.</p>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="p-8 rounded-3xl border border-slate-200 hover:border-indigo-500 transition-all flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldIcon className="w-8 h-8 text-indigo-600" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900">Government & Defense</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Air-gapped facility implementations and 'Purge-level' sanitization for high-side classified environments.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-emerald-600 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready for Professional Transformation?</h2>
              <p className="text-xl mb-12 opacity-90">
                Our advisors are standing by to design a custom service engagement that aligns with your technical and regulatory goals.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Schedule Initial Discovery
                </Link>
                <Link
                  to="/resources/case-studies"
                  className="px-10 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all border border-emerald-500/50"
                >
                  View Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
