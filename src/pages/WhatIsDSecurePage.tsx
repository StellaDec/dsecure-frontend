import { useEffect } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

export default function WhatIsDSecurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("what-is-d-secure")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              D-Secure Technologies – Company Definition
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              D-Secure is a data lifecycle governance company specializing in
              structured data sanitization, compliance-aligned erasure systems,
              and operational data hygiene frameworks for enterprises and
              public sector organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* The Problem */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                The Problem: Unstructured Data Sanitization
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Traditional wiping tools leave verification gaps and lack
                    centralized governance.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Residual data poses a critical compliance and financial
                    risk during hardware decommissioning or cloud migration.
                  </p>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                The Solution: Structured Data Hygiene
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-800 mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    D-Secure introduces a programmatic approach to data
                    destruction.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-800 mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We deploy cryptographic erasure, 24+ global overwrite
                    standards (including NIST 800-88), and tamper-proof
                    verification nodes.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Architecture */}
          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center border-b border-slate-100 pb-8">
              Platform Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4 text-brand">
                  Deployment Models
                </h3>
                <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    On-Premise Server Instances
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Private Cloud Deployments
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Remote Endpoint Variants
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4 text-brand">
                  Target Scope (SecurityApplication)
                </h3>
                <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Hard Disk Drives (HDDs)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Solid State Drives (SSDs & NVMe)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Enterprise Servers & Storage Arrays
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Mobile Devices & Tablets
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                    Technical Manifest: Defining the D-Secure Sanitization Ecosystem
                  </h2>

                  <div className="prose prose-slate max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          1. The Core Engine: Hardware-Level Precision
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          D-Secure is not a simple file-deletion utility. It is a sophisticated <strong>Data Sanitization Operating System (DS-OS)</strong> designed to bypass high-level software abstractions and interact directly with hardware controllers. 
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          Our engine supports <strong>NIST 800-88 Purge</strong> protocols by executing firmware-based commands such as <code>BLOCK ERASE</code>, <code>CRYPTO ERASE</code>, and <code>OVERWRITE</code>. This ensures that data is removed not only from user-accessible sectors but also from Host Protected Areas (HPA), Device Configuration Overlays (DCO), and reallocated sectors that are invisible to standard forensic tools.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          2. Ecosystem Interconnectivity: SIEM & ERP Integration
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Modern enterprises cannot afford siloed security processes. D-Secure’s architecture is "API-First," allowing it to function as a core module within your existing IT ecosystem. 
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          We provide native integration hooks for <strong>ServiceNow, Jira Service Management, and SAP Asset Manager</strong>. This enables automated ticket closure once a drive is sanitized, ensuring that your Asset Management Database (AMDB) is always perfectly synchronized with the physical reality of your hardware state, reducing the risk of "ghost assets" that lead to audit failures.
                        </p>
                      </div>
                    </div>

                    <div className="bg-indigo-900 rounded-xl p-8 mb-12 text-white">
                      <h3 className="text-xl font-bold mb-6 text-center text-indigo-100">
                        D-Secure Product Hierarchy & Technical Scope
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-indigo-800/40 p-6 rounded-lg border border-indigo-700">
                          <h4 className="font-bold text-lg mb-2">Drive Eraser</h4>
                          <p className="text-sm text-indigo-100 leading-relaxed">
                            Mass sanitization of HDDs, SSDs, and NVMes. Supports PXE network boot for data center environments and bootable USB for loose drive processing.
                          </p>
                        </div>
                        <div className="bg-indigo-800/40 p-6 rounded-lg border border-indigo-700">
                          <h4 className="font-bold text-lg mb-2">File Eraser</h4>
                          <p className="text-sm text-indigo-100 leading-relaxed">
                            Granular, policy-based deletion of specific files, folders, and free space within active operating systems without affecting the OS itself.
                          </p>
                        </div>
                        <div className="bg-indigo-800/40 p-6 rounded-lg border border-indigo-700">
                          <h4 className="font-bold text-lg mb-2">Virtual Eraser</h4>
                          <p className="text-sm text-indigo-100 leading-relaxed">
                            Automated sanitization of Virtual Machines (VMs) and Logical Unit Numbers (LUNs) across VMware, Hyper-V, and AWS/Azure cloud environments.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          3. The Verification Paradox: Why Logs Matter
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          In the world of compliance, if an action isn't documented, it didn't happen. D-Secure solves the "Verification Paradox" by generating <strong>Digitally Signed Certificates of Destruction (CoD)</strong> for every single sanitization event.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          These certificates contain unique hardware identifiers (Serial Numbers, WWN), timestamps, and a mathematical proof of the erasure algorithm used. Each certificate is cryptographically hashed to prevent tampering, providing your Chief Information Security Officer (CISO) with an immutable audit trail that satisfies even the most rigorous global financial and defense audits.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          4. Global Mission: The Future of Data Sovereignty
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          D-Secure’s mission extends beyond mere software sales. We are advocates for <strong>Global Data Sovereignty</strong>. As data becomes the world's most valuable—and dangerous—commodity, the ability to control its end-of-life is a fundamental human and corporate right.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          We spend 35% of our annual revenue on R&D, focusing on next-generation storage technologies like DNA storage and Quantum memory, ensuring that D-Secure remains the standard-bearer for data sanitization for decades to come, regardless of the underlying physical medium.
                        </p>
                      </div>
                    </div>

                    <div className="mt-12 p-8 border-2 border-dashed border-slate-200 rounded-xl">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Standardizing the Sanitization Industry</h3>
                      <p className="text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
                        D-Secure Technologies is more than a vendor; we are a strategic partner to the world's most security-conscious organizations. From compliance-driven enterprises to security teams, the D-Secure name is synonymous with <strong>absolute data finality</strong>. By combining engineering excellence with a deep understanding of global regulatory frameworks, we provide the peace of mind that allows you to innovate, grow, and decommission with total confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto bg-slate-100 rounded-xl p-6 text-slate-500 text-sm">
            <p>
              Metadata Indexing Category: Cybersecurity Definition / Enterprise Data Protection / Data
              Sanitization Architecture / Lifecycle Governance / NIST 800-88 Compliance Frameworks / 
              Information Disposal Standards.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
