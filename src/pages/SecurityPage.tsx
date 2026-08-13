import React, { useEffect } from 'react';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import { getSEOForPage } from '../utils/seo';
import {
  Shield,
  ShieldCheck,
  Award,
  FileText,
  Globe,
  Database,
  Lock,
  Activity,
  Key,
  Trash2,
  FileCheck,
  Users,
  Search,
  AlertOctagon,
  Microscope,
  RefreshCw,
  Mail,
  Clock
} from 'lucide-react';

const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHeadNative seo={getSEOForPage('security')} />

      <div className="min-h-screen bg-white pt-24 pb-12 text-left">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            
            {/* ── Header ── */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Enterprise-Grade Security Practices
              </h1>
              <p className="text-sm font-semibold text-[#0e7c66] tracking-wider uppercase mb-6">
                Data Protection & Compliance
              </p>
              <p className="text-lg text-slate-800 leading-relaxed max-w-3xl">
                At D-Secure, security isn't an afterthought—it's the foundation of everything we do. Our comprehensive security framework ensures your data is protected at every stage and complies with global standards.
              </p>
            </div>

            {/* ── Content ── */}
            <div className="py-4">

              {/* 1. Security Overview */}
              <section className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                      Security-First Approach
                    </h2>
                    <p className="text-slate-800 leading-relaxed mb-6">
                      Our architecture is designed with the assumption of a hostile environment. We employ defense-in-depth strategies to isolate systems, verify all access requests, and enforce strict cryptographic boundaries.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-[#d0d5dc] bg-slate-50 p-6 text-center">
                        <div className="text-3xl font-bold text-[#0e7c66] mb-2">99.9%</div>
                        <div className="text-sm text-slate-700 font-semibold uppercase tracking-wider">Uptime SLA</div>
                      </div>
                      <div className="border border-[#d0d5dc] bg-slate-50 p-6 text-center">
                        <div className="text-3xl font-bold text-[#0e7c66] mb-2">256-bit</div>
                        <div className="text-sm text-slate-700 font-semibold uppercase tracking-wider">Encryption</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[#d0d5dc] bg-[#0e7c66] p-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white flex items-center justify-center rounded-none mb-6">
                      <ShieldCheck className="w-8 h-8 text-[#0e7c66]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Zero Trust Architecture
                    </h3>
                    <p className="text-emerald-50 text-lg leading-relaxed">
                      Every access request is verified cryptographically, regardless of location, network, or user credentials. We never trust, always verify.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Certifications & Regulations */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-[#d0d5dc]">
                  Security Regulations & Compliance
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Award, title: 'ISO 27001', desc: 'Information Security Management System regulation' },
                    { icon: FileText, title: 'SOC 2 Type II', desc: 'Service Organization Control compliance verification' },
                    { icon: Globe, title: 'GDPR Compliant', desc: 'European data protection regulation strict compliance' },
                    { icon: Database, title: 'NIST 800-88', desc: 'Media sanitization and data destruction standards' },
                  ].map((cert, i) => (
                    <div key={i} className="border border-[#d0d5dc] bg-slate-50 p-6 text-center">
                      <div className="w-12 h-12 bg-[#0e7c66] flex items-center justify-center mx-auto mb-4 rounded-none">
                        <cert.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{cert.title}</h3>
                      <p className="text-sm text-slate-700 leading-relaxed">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Comprehensive Measures */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-[#d0d5dc]">
                  Comprehensive Security Measures
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Lock, title: 'End-to-End Encryption', desc: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit, ensuring maximum protection.' },
                    { icon: Activity, title: 'Real-time Monitoring', desc: '24/7 security monitoring with automated threat detection and instant incident response logging.' },
                    { icon: Key, title: 'Multi-Factor Authentication', desc: 'Advanced MFA with cryptographic hardware security keys support for strict access control.' },
                    { icon: Trash2, title: 'Secure Data Destruction', desc: 'Compliant data erasure ensuring complete data destruction with verifiable regulatory documents.' },
                    { icon: FileCheck, title: 'Audit & Compliance', desc: 'Regular security audits and compliance reporting to meet and exceed regulatory requirements.' },
                    { icon: Users, title: 'Expert Team', desc: 'Dedicated security professionals with advanced regulatory credentials and years of experience.' },
                  ].map((measure, i) => (
                    <div key={i} className="border border-[#d0d5dc] p-6 bg-white">
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-none mb-4 border border-[#d0d5dc]">
                        <measure.icon className="w-5 h-5 text-[#0e7c66]" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{measure.title}</h3>
                      <p className="text-sm text-slate-700 leading-relaxed">{measure.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Incident Response */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-[#d0d5dc]">
                  Incident Response Protocol
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: '1', icon: Search, title: 'Detection', desc: 'Automated systems detect threats in real-time' },
                    { step: '2', icon: AlertOctagon, title: 'Containment', desc: 'Immediate isolation and threat neutralization' },
                    { step: '3', icon: Microscope, title: 'Investigation', desc: 'Forensic analysis and impact assessment' },
                    { step: '4', icon: RefreshCw, title: 'Recovery', desc: 'System restoration and preventive measures' },
                  ].map((phase, i) => (
                    <div key={i} className="border border-[#d0d5dc] bg-slate-50 p-6 text-center flex flex-col items-center">
                      <div className="w-10 h-10 bg-[#0e7c66] flex items-center justify-center text-white font-bold text-lg rounded-none mb-4">
                        {phase.step}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Deep Dive Architecture */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-[#d0d5dc]">
                  Security Architecture & Data Protection Philosophy
                </h2>
                
                <div className="space-y-8 text-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Cryptographic Standards</h3>
                    <p className="leading-relaxed mb-4">
                      D-Secure leverages industry-leading cryptographic primitives to ensure that your data is not only erased but protected throughout its lifecycle. For data in transit, we enforce <strong>TLS 1.3</strong> with Perfect Forward Secrecy (PFS), preventing any retroactive decryption of traffic even in the event of a long-term key compromise.
                    </p>
                    <p className="leading-relaxed">
                      Our reporting engine utilizes <strong>ECDSA (Elliptic Curve Digital Signature Algorithm)</strong> with P-384 curves to sign every erasure certificate. This ensures that the PDF reports you receive are mathematically tamper-proof. Any modification to a single character in a D-Secure report will invalidate its digital signature, which can be verified using our public portal.
                    </p>
                  </div>

                  <div className="border border-[#d0d5dc] bg-slate-50 p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Bypassing the OS: Hardware-Level Verification</h3>
                    <p className="leading-relaxed mb-6">
                      A common failure in consumer-grade erasure tools is their reliance on the Operating System's file system drivers. Modern OSs use complex caching mechanisms (like Write-Back caching) that can report a write operation as "complete" before the data actually hits the physical NAND or magnetic platter.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-[#d0d5dc] bg-white p-5">
                        <h4 className="font-bold text-[#0e7c66] mb-2">Direct Drive Access</h4>
                        <p className="text-sm leading-relaxed">
                          D-Secure communicates directly with the storage controller via specialized low-level APIs (NVMe, SATA/SAS passthrough), bypassing the file system layer entirely.
                        </p>
                      </div>
                      <div className="border border-[#d0d5dc] bg-white p-5">
                        <h4 className="font-bold text-[#0e7c66] mb-2">Post-Erase Sampling</h4>
                        <p className="text-sm leading-relaxed">
                          After every erasure pass, we perform a deterministic bit-level verification of random sectors to ensure the physical state of the drive matches the expected sanitization pattern.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Security-by-Design: Our Manifesto</h3>
                    <p className="leading-relaxed mb-4">
                      We believe that security is not a feature; it is a fundamental property of a system. This belief manifests in our "Security-by-Design" approach:
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <span className="text-[#0e7c66] font-bold">01.</span>
                        <p className="leading-relaxed">
                          <strong>Zero Knowledge Principles:</strong> D-Secure never sees your actual raw data. Our software runs locally on your infrastructure (or in a stateless RAM-disk environment), ensuring that sensitive data never leaves your premises.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[#0e7c66] font-bold">02.</span>
                        <p className="leading-relaxed">
                          <strong>Minimal Surface Area:</strong> Our erasure environment (D-Secure ISO) is a hardened Linux kernel with 90% of standard services disabled. This eliminates potential attack vectors during the sensitive erasure process.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[#0e7c66] font-bold">03.</span>
                        <p className="leading-relaxed">
                          <strong>Independent Validation:</strong> We don't just ask you to trust us. Our algorithms are regularly audited by third-party forensics labs to ensure they meet the rigorous standards of NIST 800-88 and IEEE 2883.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#0e7c66] bg-slate-50 p-6 italic text-slate-700">
                    <p className="mb-2">
                      "In the world of data sanitization, 'Good Enough' is an invitation for disaster. We build for the 0.001% edge case, because that is where the breaches happen."
                    </p>
                    <p className="font-bold not-italic text-slate-900">— D-Secure Security Architecture Team</p>
                  </div>
                </div>
              </section>

              {/* 6. Contact */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  Security Questions?
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    Our security team is available to answer your questions and provide additional information about our security practices. We also welcome responsible disclosure of potential vulnerabilities.
                  </p>
                  <div className="border border-[#d0d5dc] bg-slate-50 p-6 inline-block mt-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#0e7c66]" />
                        <span className="font-semibold text-slate-900">Security Team:</span>
                        <a href="mailto:security@dsecuretech.com" className="text-[#0e7c66] hover:underline">
                          security@dsecuretech.com
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#0e7c66]" />
                        <span className="font-semibold text-slate-900">Response Time:</span>
                        <span>24 hours SLA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecurityPage;
