import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  ClipboardIcon,
  ActivityIcon,
  ShieldIcon,
  TrendingUpIcon,
  BuildingIcon
} from '@/components/FlatIcons';

export default function TrainingPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('training')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Professional <span className="text-emerald-400">Certification</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Elevate your organizational proficiency with D-Secure's technical training ecosystem. Master the science of data sanitization and earn industry-recognized credentials.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3"
                >
                  Enroll in Certification
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/support/product-videos"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  Watch Free Tutorials
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Certification Roadmap */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Technical Proficiency Roadmap</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  A structured learning path designed to transition IT personnel from basic operators to high-assurance sanitization architects.
                </p>
              </div>
            </Reveal>

            <div className="space-y-12">
              {[
                {
                  level: "Level 1",
                  title: "Certified D-Secure Operator (CDSO)",
                  focus: "Day-to-day operations, asset tracking, and standard erasure workflows.",
                  curriculum: ["Basic Hardware Profiling", "NIST 800-88 Clear Concepts", "Certificate Generation", "Mobile App Operations"],
                  icon: <ActivityIcon className="w-10 h-10 text-blue-500" filled={true} />
                },
                {
                  level: "Level 2",
                  title: "Certified Sanitization Engineer (CSE)",
                  focus: "Advanced architecture, PXE deployment, and cryptographic validation.",
                  curriculum: ["Network Boot Configuration", "SSD Cryptographic Erasure", "Custom ISO Scripting", "Forensic Verification Audits"],
                  icon: <ShieldIcon className="w-10 h-10 text-emerald-500" filled={true} />
                },
                {
                  level: "Level 3",
                  title: "Data Governance Architect (DGA)",
                  focus: "Enterprise-wide policy design, compliance integration, and risk mitigation.",
                  curriculum: ["SIEM/API Integration Strategy", "Global Compliance Matrices", "Tamper-proof Ledger Mgmt", "Infrastructure Scalability"],
                  icon: <BuildingIcon className="w-10 h-10 text-purple-500" filled={true} />
                }
              ].map((item, index) => (
                <Reveal key={item.level} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-[2rem] p-10 flex flex-col lg:flex-row gap-12 border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="lg:w-1/4 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-emerald-600 font-black tracking-widest text-sm uppercase mb-2">{item.level}</span>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{item.title}</h3>
                    </div>
                    <div className="lg:w-3/4">
                      <h4 className="text-lg font-bold text-slate-900 mb-4">Core Focus Area</h4>
                      <p className="text-slate-600 mb-8 text-lg">{item.focus}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.curriculum.map((topic) => (
                          <div key={topic} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
                            <CheckIcon className="w-5 h-5 text-emerald-500" filled={true} />
                            <span className="text-slate-700 font-medium">{topic}</span>
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

        {/* Enterprise Training Framework */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container-responsive">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">The "Always-Ready" <span className="text-emerald-400">Training</span> Philosophy</h2>
                  <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    Data sanitization is a rapidly evolving field. Our training framework ensures your team stays ahead of new storage technologies and emerging global regulations.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold flex items-center gap-2">
                        <TrendingUpIcon className="w-6 h-6 text-emerald-400" filled={true} />
                        Continuous Updates
                      </h4>
                      <p className="text-slate-400 text-sm">Monthly webinars covering firmware vulnerabilities and new drive technologies like NVMe Gen5.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold flex items-center gap-2">
                        <StarIcon className="w-6 h-6 text-emerald-400" filled={true} />
                        Hands-on Labs
                      </h4>
                      <p className="text-slate-400 text-sm">Virtual sandbox environments where engineers can practice mass-erasure without risking live assets.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:w-1/2">
                <Reveal delayMs={200}>
                  <div className="p-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10">
                    <h3 className="text-2xl font-bold mb-8">Training Modules Overview</h3>
                    <div className="space-y-6">
                      {[
                        { title: "NIST 800-88 Purge vs. Clear", duration: "2 Hours" },
                        { title: "IEEE 2883-2022 Implementation", duration: "3 Hours" },
                        { title: "PXE & Network Boot Architecture", duration: "4 Hours" },
                        { title: "Compliance Audit Defense", duration: "2 Hours" }
                      ].map((mod) => (
                        <div key={mod.title} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                          <span className="font-medium">{mod.title}</span>
                          <span className="text-emerald-400 text-sm font-bold">{mod.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Invest in D-Secure Training?</h2>
                <p className="text-lg text-slate-600">The ROI of professional certification extends far beyond basic operational knowledge.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Reveal delayMs={100}>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <ShieldIcon className="w-8 h-8" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Risk Mitigation</h4>
                  <p className="text-slate-600 leading-relaxed">Eliminate "knowledge gaps" that lead to audit failures or accidental data leakage through improperly wiped hardware.</p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <TrendingUpIcon className="w-8 h-8" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Efficiency Boost</h4>
                  <p className="text-slate-600 leading-relaxed">Trained engineers can manage 3x more assets per hour by leveraging advanced automation and batch processing features.</p>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <ClipboardIcon className="w-8 h-8" filled={true} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Internal Advocacy</h4>
                  <p className="text-slate-600 leading-relaxed">Certified professionals become internal champions, ensuring data hygiene standards are maintained across the organization.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Secure Your Team's Expertise</h2>
              <p className="text-xl mb-12 opacity-90 text-white">
                Contact our education team to design a custom training roadmap for your enterprise or to enroll in our next certification cohort.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Request Training Quote
                </Link>
                <Link
                  to="/support/help-manual"
                  className="px-10 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all border border-emerald-500/50"
                >
                  Read Documentation
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
