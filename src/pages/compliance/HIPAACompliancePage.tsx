import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
// FlatIcons se zaroori icons ko import kiya gaya hai
import { ShieldIcon, ClipboardIcon, LockIcon, CheckIcon, GlobeIcon, ServerIcon, MobileIcon, MonitorIcon } from '@/components/FlatIcons';

export default function HIPAACompliancePage() {
  const hipaaSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "HIPAA Compliant Data Destruction Software Guide",
    "description": "Ensure HIPAA compliance for PHI and ePHI with D-Secure. Securely sanitize healthcare storage media with tamper-proof audit reports.",
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
      title: "Device and Media Controls",
      description: "HIPAA Security Rule 45 CFR § 164.310(d)(1) requires covered entities to implement policies and procedures that govern the receipt and removal of hardware and electronic media.",
      solution: "D-Secure enforces secure data erasure policies across all hospital workstations, servers, and mobile devices before they leave your facility."
    },
    {
      title: "Data Disposal Standard",
      description: "45 CFR § 164.310(d)(2)(i) mandates the final disposition of ePHI and the hardware or electronic media on which it is stored must be permanently destroyed.",
      solution: "D-Secure performs cryptographic erasure and multi-pass overwrites that make ePHI completely unrecoverable, exceeding standard formatting methods."
    },
    {
      title: "Audit & Accountability",
      description: "Covered entities must be able to demonstrate that ePHI was properly disposed of to HHS Office for Civil Rights (OCR) auditors.",
      solution: "D-Secure auto-generates tamper-proof audit reports detailing exactly when, how, and what data was erased to prove compliance to OCR auditors."
    }
  ];

  // Healthcare use cases ke liye icons aur descriptions set kiye hain
  const useCases = [
    {
      icon: <ServerIcon className="w-6 h-6" filled />,
      title: "Data Center Decommissioning",
      desc: "Securely erase massive LUNs, VMs, and physical servers containing terabytes of patient records during data center migrations or hardware refresh cycles."
    },
    {
      icon: <MonitorIcon className="w-6 h-6" filled />, // LaptopIcon ki jagah MonitorIcon ka use kiya hai
      title: "Employee Offboarding",
      desc: "Instantly wipe local drives on clinician laptops and administrative workstations to ensure no ePHI leaves the organization when an employee departs."
    },
    {
      icon: <MobileIcon className="w-6 h-6" filled />, // SmartphoneIcon ki jagah MobileIcon ka use kiya hai
      title: "Mobile Device Repurposing",
      desc: "Perform factory resets and deep secure erasure on hospital-issued tablets and smartphones before assigning them to new staff members."
    }
  ];

  const faqs = [
    {
      q: "Is formatting a hard drive enough for HIPAA compliance?",
      a: "No. Standard OS formatting only removes the file system pointers, leaving the actual ePHI data intact and easily recoverable. HIPAA requires data to be rendered unrecoverable, which requires secure overwriting or cryptographic erasure."
    },
    {
      q: "How does D-Secure prove compliance during an OCR audit?",
      a: "D-Secure generates a digitally signed, tamper-proof Certificate of Erasure for every single drive or device wiped. This report includes the hardware serial number, the exact algorithm used, the timestamp, and the operator's identity."
    },
    {
      q: "Do you support solid-state drives (SSDs) and NVMe storage commonly used in modern medical equipment?",
      a: "Yes. D-Secure uses modern NIST 800-88 Purge methods (such as Secure Erase and Cryptographic Erase) specifically designed to securely bypass the wear-leveling controllers in SSDs and NVMe drives."
    }
  ];

  return (
    <>
      <SEOHead 
        seo={getSEOForPage('hipaa')}
        structuredData={hipaaSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-20 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container-app relative z-10">
          <Reveal>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-medium text-sm mb-6 border border-blue-500/30">
                <GlobeIcon className="w-4 h-4" filled={true} />
                <span>HIPAA & HITECH Ready Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Guarantee <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">HIPAA Compliance</span> in ePHI Disposal
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Protect your healthcare organization from OCR fines and data breaches. D-Secure empowers hospitals and clinics to sanitize end-of-life IT assets with 100% verified, audit-friendly documentation.
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
              <h2 className="text-3xl font-bold text-slate-900">Meeting HIPAA Security Rule Requirements</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">D-Secure directly addresses the core tenets of the HIPAA Security Rule regarding media sanitization and ePHI disposal.</p>
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

      {/* Healthcare Use Cases */}
      <section className="py-20 bg-white">
        <div className="container-app">
          <Reveal>
            <div className="mb-16 md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive ePHI Protection Across All Vectors</h2>
              <p className="text-slate-600 text-lg">Healthcare environments are diverse. We provide tools to sanitize every endpoint that might contain sensitive patient data.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, i) => (
              /* Array index key ki jagah unique useCase.title key ka upyog kiya hai */
              <Reveal key={useCase.title} delayMs={i * 100}>
                <div className="group border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                  <p className="text-slate-600">{useCase.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why HIPAA Matters & Audit Trail */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal animation="slide-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Mitigating HIPAA Liability in Healthcare IT</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                      <LockIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Preventing ePHI Leaks</h3>
                      <p className="text-slate-600">Disposing of medical hardware without tamper-proof audit reports is a direct violation of HIPAA. Formatting drives is not enough to stop data recovery of patient records.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">End-of-Life Security</h3>
                      <p className="text-slate-600">When devices reach end-of-life, you must prove the data destruction occurred. Our Drive Eraser provides the exact audit trail needed for servers and workstations.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                      <CheckIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Immutable Audit Trail</h3>
                      <p className="text-slate-600">To comply with OCR guidelines, D-Secure maintains a secure, centralized cloud log of all erasure activities across your healthcare network.</p>
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
                <h2 className="text-2xl font-bold mb-6 relative z-10">Tamper-proof audit reports for HHS OCR</h2>
                <p className="text-slate-300 mb-6 relative z-10">HHS OCR auditors expect documented proof. D-Secure provides:</p>
                <ul className="space-y-4 mb-8 relative z-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Hardware identification (Serial, MAC, Model)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Cryptographic signature validation
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
      <section className="py-20 bg-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            </Reveal>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                /* Array index key ki jagah unique faq.q key ka upyog kiya hai */
                <Reveal key={faq.q} delayMs={index * 100}>
                  <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="container-app">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Take Control of Your HIPAA Compliance</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Implement a defensible data wiping policy today to protect your patients and avoid severe OCR regulatory fines.
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
