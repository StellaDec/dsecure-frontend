import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '@/utils/seo';
// FlatIcons se zaroori icons ko import kiya gaya hai
import { ShieldIcon, ClipboardIcon, LockIcon, CheckIcon, GlobeIcon, DatabaseIcon, GearIcon } from '@/components/FlatIcons';

export default function DoDCompliancePage() {
  const dodSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "DoD 5220.22-M Compliant Data Wiping Software Guide",
    "description": "Execute DoD 5220.22-M 3-pass standard data wiping with D-Secure. Enterprise-grade secure sanitization with tamper-proof audit reports.",
    "publisher": {
      "@type": "Organization",
      "name": "D-Secure",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dsecuretech.com/logo.png"
      }
    }
  };

  const requirements = [
    {
      title: "The 3-Pass Wipe Method",
      description: "The DoD 5220.22-M standard originally required a 3-pass overwrite process: writing zeros, writing ones, and writing pseudo-random data to prevent data recovery.",
      solution: "D-Secure provides native support for the DoD 3-pass and 7-pass wiping standards, ensuring full compliance for legacy and specialized government IT assets."
    },
    {
      title: "Verification Pass",
      description: "After overwriting the storage media, the DoD standard mandates a final verification pass to confirm that the overwrite was successful.",
      solution: "D-Secure automatically verifies every erased sector at a granular level. If verification fails, the drive is flagged for physical destruction."
    },
    {
      title: "Audit Certification",
      description: "Defense contractors and government agencies must maintain an audit trail proving that data destruction was executed according to Department of Defense regulations.",
      solution: "D-Secure generates tamper-proof certificates detailing the algorithm used (DoD 5220.22-M), hardware specs, and digital signatures for compliance audits."
    }
  ];

  // DoD algorithm ke steps ke liye data setup kiya hai
  const algorithmSteps = [
    {
      icon: <DatabaseIcon className="w-6 h-6" filled />, // DataIcon ki jagah DatabaseIcon ka use kiya hai
      title: "Pass 1: Zeros",
      desc: "All addressable locations are overwritten with a character (typically 0x00)."
    },
    {
      icon: <GearIcon className="w-6 h-6" filled />, // SettingsIcon ki jagah GearIcon ka use kiya hai
      title: "Pass 2: Ones",
      desc: "All addressable locations are overwritten with its complement (typically 0xFF)."
    },
    {
      icon: <ShieldIcon className="w-6 h-6" filled />,
      title: "Pass 3: Random Data",
      desc: "All addressable locations are overwritten with a pseudo-random character."
    }
  ];

  const faqs = [
    {
      q: "Is DoD 5220.22-M still relevant today?",
      a: "Yes, but with caveats. While NIST 800-88 is the modern gold standard for newer technologies like SSDs and NVMe drives, many legacy government contracts, defense policies, and internal compliance frameworks still explicitly require the DoD 3-pass or 7-pass method, particularly for magnetic Hard Disk Drives (HDDs)."
    },
    {
      q: "Does DoD 5220.22-M work on Solid State Drives (SSDs)?",
      a: "The traditional DoD 3-pass method was designed for HDDs. Applying it to modern SSDs is not recommended because wear-leveling algorithms prevent all sectors from being addressed by standard overwrites. For SSDs, D-Secure automatically recommends and executes NIST-compliant Secure Erase or Cryptographic Erase commands."
    },
    {
      q: "Does D-Secure support the 7-pass DoD method (DoD 5220.22-M ECE)?",
      a: "Yes. D-Secure includes both the standard 3-pass DoD method and the extended 7-pass DoD 5220.22-M ECE method, which involves two 3-pass wipes and a final random overwrite pass. Both methods generate fully compliant, tamper-proof certificates."
    }
  ];

  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage('dod')}
        structuredData={dodSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-20 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container-app relative z-10">
          <Reveal>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-medium text-sm mb-6 border border-blue-500/30">
                <GlobeIcon className="w-4 h-4" filled={true} />
                <span>Defense & Government Grade Wiping</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Secure Data Wiping to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">DoD 5220.22-M</span> Standards
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Meet the Department of Defense requirements for data sanitization. D-Secure empowers defense contractors and federal agencies to wipe storage media with 3-pass precision and tamper-proof reporting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing-and-plan" className="btn bg-blue-600 hover:bg-blue-500 text-white border-transparent px-6 py-3 rounded-lg font-medium transition-colors">
                  Get Compliant Software
                </Link>
                <Link to="/contact" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Speak to an Expert
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Requirements Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900">Executing the DoD 5220.22-M Framework</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">D-Secure automates the rigorous overwrite sequences required by the Department of Defense standard.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <Reveal key={req.title} delayMs={index * 150}>
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <ClipboardIcon className="w-6 h-6" filled={true} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 block">{req.title}</h2>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{req.description}</p>
                  <div className="pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2 block">D-Secure Capability</span>
                    <p className="text-slate-800 text-sm font-medium">{req.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Breakdown Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-app">
          <Reveal>
            <div className="mb-16 md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Inside the DoD 3-Pass Algorithm</h2>
              <p className="text-slate-600 text-lg">Understanding the exact methodology executed by D-Secure to prevent magnetic force microscopy data recovery.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -z-0"></div>
            
            {algorithmSteps.map((step, i) => (
              /* Array index key ki jagah unique step.title key ka upyog kiya hai */
              <Reveal key={step.title} delayMs={i * 100}>
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-4 border-blue-50 text-blue-600 mx-auto mb-6 relative z-10">
                  {step.icon}
                </div>
                <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal delayMs={300}>
            <div className="mt-12 max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-xl p-6 text-center flex items-center justify-center gap-4">
              <CheckIcon className="w-8 h-8 text-green-600 flex-shrink-0" filled />
              <div className="text-left">
                <h4 className="font-bold text-green-900">Final Verification</h4>
                <p className="text-green-800 text-sm">Followed by a complete sector-by-sector verification pass to confirm the overwrite.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why DoD Standard Matters */}
      <section className="py-20 bg-white">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal animation="slide-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Navigating DoD & Modern NIST Standards</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <LockIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">DoD vs NIST 800-88</h3>
                      <p className="text-slate-600">While NIST SP 800-88 is the modern standard for SSDs (using Secure Erase), many legacy government contracts and defense organizations still mandate the classic DoD 5220.22-M 3-pass overwrite.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Legacy Drive Support</h3>
                      <p className="text-slate-600">The DoD standard is highly effective for older magnetic Hard Disk Drives (HDDs). D-Secure automatically identifies the drive type and can apply the DoD standard when required by your compliance policies.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                      <CheckIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Immutable Audit Trail</h3>
                      <p className="text-slate-600">No matter if you choose DoD or NIST algorithms, D-Secure maintains a secure, centralized cloud log of all erasure activities across your network.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-left">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ClipboardIcon className="w-48 h-48" filled={true} />
                </div>
                <h2 className="text-2xl font-bold mb-6 relative z-10">Tamper-proof audit reports for Government IT</h2>
                <p className="text-slate-300 mb-6 relative z-10">Defense auditors expect documented proof. D-Secure provides:</p>
                <ul className="space-y-4 mb-8 relative z-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Hardware identification (Serial, MAC, Model)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Algorithm validation (DoD 3-pass/7-pass)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Operator identity logging
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Erasure algorithm execution results
                  </li>
                </ul>
                <Link to="/products/drive-eraser" className="text-blue-400 font-medium hover:text-blue-300 inline-flex items-center transition-colors relative z-10">
                  Explore D-Secure Drive Eraser
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50">
        <div className="container-app">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            </Reveal>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                /* Array index key ki jagah unique faq.q key ka upyog kiya hai */
                <Reveal key={faq.q} delayMs={index * 100}>
                  <div className="border border-slate-200 rounded-xl p-6 bg-white hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supplementary Resources */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container-app">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Supplementary Resources</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Explore technical guides and comparisons to strengthen your data destruction strategy.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/blog/dod-vs-ieee" className="group block bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">Standards Comparison</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">DoD 5220.22-M vs. IEEE 2883</h3>
                <p className="text-slate-600 text-sm">Understand the differences between legacy 3-pass wiping and modern IEEE sanitization protocols.</p>
              </Link>
              <Link to="/blog/nist-clear-purge" className="group block bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">Compliance Frameworks</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">NIST Clear vs. Purge</h3>
                <p className="text-slate-600 text-sm">See how the federal NIST 800-88 framework compares to DoD standards for modern IT assets.</p>
              </Link>
              <Link to="/blog/ssd-wipe-guide" className="group block bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">Hardware Guide</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">The 2026 SSD Wipe Guide</h3>
                <p className="text-slate-600 text-sm">Why the traditional DoD 3-pass method is not recommended for SSDs, and what to use instead.</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="container-app">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Execute Defense-Grade Wiping</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Implement a defensible data wiping policy today to protect sensitive government data and meet stringent DoD 5220.22-M regulations.
            </p>
            <Link to="/pricing-and-plan" className="btn bg-white text-blue-700 hover:bg-slate-50 border-transparent shadow-lg hover:shadow-xl px-8 py-4 font-bold rounded-xl text-lg transition-all hover:scale-105">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
