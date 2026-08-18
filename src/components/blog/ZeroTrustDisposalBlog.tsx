import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, LockIcon, UsersIcon } from "@/components/FlatIcons";
import BlogFooterStandard from "./BlogFooterStandard";

const ZeroTrustDisposalBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("blog-zero-trust-disposal")} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Security Framework
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              <span className="bg-white bg-clip-text text-transparent">
                Zero Trust Data Disposal: A Modern Strategy for Secure ITAD
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
              Applying Zero Trust principles to IT asset disposition: Never
              trust, always verify—even during data destruction.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            {/* Intro */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                1. What is Zero Trust?
              </h2>
              <p className="text-[#5a6672] leading-relaxed text-lg">
                Zero Trust is a security framework that assumes no user, device,
                or process should be trusted by default—even if they're inside
                the network perimeter. Every access request must be verified.
              </p>
              <p className="text-[#5a6672] leading-relaxed">
                When applied to data disposal, Zero Trust means verifying every
                step of the erasure process, never assuming data is destroyed
                simply because a process was initiated.
              </p>
              <div className="p-6 bg-[#f4fbf8] border-l-4 border-[#0e7c66] rounded-none my-4">
                <strong className="text-[#0a2e1e] block mb-2">
                  Core Principle
                </strong>
                <p className="text-sm text-[#0a2e1e]">
                  <strong>"Never trust, always verify."</strong> In data
                  disposal, this means: verify erasure success, verify operator
                  authorization, verify chain of custody, and verify
                  documentation integrity.
                </p>
              </div>
            </div>

            {/* Zero Trust Pillars */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                2. Zero Trust Pillars for Data Disposal
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">🔐 Identity</h3>
                  <ul className="text-sm text-[#0a2e1e] space-y-1">
                    <li>• Verify operator authorization</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based access controls</li>
                    <li>• Audit trail of actions</li>
                  </ul>
                </div>
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">📱 Device</h3>
                  <ul className="text-sm text-[#0a2e1e] space-y-1">
                    <li>• Identify device type precisely</li>
                    <li>• Verify serial number accuracy</li>
                    <li>• Confirm ownership/custody</li>
                    <li>• Check for hidden storage</li>
                  </ul>
                </div>
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">
                    ✅ Verification
                  </h3>
                  <ul className="text-sm text-[#0a2e1e] space-y-1">
                    <li>• Post-erasure read verification</li>
                    <li>• Sampling-based confirmation</li>
                    <li>• Independent forensic checks</li>
                    <li>• Compliance report authenticity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trust But Verify */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                3. Why "Trust" Fails in Data Disposal
              </h2>
              <p className="text-[#5a6672] leading-relaxed">
                Organizations often trust that data is destroyed based on
                assertions rather than verification. This creates security gaps:
              </p>
              <div className="bg-[#0e7c66] border-b border-slate-800 text-slate-100 p-6 rounded-none font-mono text-sm leading-relaxed">
                <p className="text-[#0e7c66] font-bold mb-2">
                  // Common Trust Failures
                </p>
                <p className="mb-2">❌ "IT said they formatted the drives"</p>
                <p className="mb-2">❌ "The vendor gave us an audit report"</p>
                <p className="mb-2">❌ "We've always used this process"</p>
                <p>❌ "The software said it completed"</p>
              </div>
              <p className="text-[#5a6672] leading-relaxed">
                Without independent verification, these statements provide false
                assurance. Zero Trust demands evidence at every step.
              </p>
            </div>

            {/* Implementation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                4. Implementing Zero Trust Disposal
              </h2>
              <ul className="space-y-3 text-[#5a6672]">
                <li className="flex gap-3 items-start">
                  <span className="text-[#0e7c66] font-bold text-xl">1.</span>
                  <span>
                    <strong>Verify Identity:</strong> Require MFA for operators.
                    Log every action with user ID, timestamp, and IP.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#0e7c66] font-bold text-xl">2.</span>
                  <span>
                    <strong>Verify Device:</strong> Independently confirm serial
                    numbers. Check for hidden partitions and secondary storage.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#0e7c66] font-bold text-xl">3.</span>
                  <span>
                    <strong>Verify Process:</strong> Use automated verification
                    that reads sectors post-erasure. Never rely on software
                    reports alone.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#0e7c66] font-bold text-xl">4.</span>
                  <span>
                    <strong>Verify Documentation:</strong> Use Tamper-evident
                    audit reports with certificate including digital signatures.
                    Validate against central records.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#0e7c66] font-bold text-xl">5.</span>
                  <span>
                    <strong>Verify Vendors:</strong> Audit <Link to="/solutions/itad" className="text-[#0e7c66] hover:underline font-medium">ITAD</Link> partners
                    regularly. Don't accept reports at face value.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">
              D-Secure Zero Trust Features
            </h2>

            <p className="text-[#5a6672] leading-relaxed mb-6">
              D-Secure is built on Zero Trust principles, providing
              compliance-verified media sanitization at every stage of the data
              disposal process.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                <div className="flex items-center gap-2 mb-3">
                  <LockIcon className="w-5 h-5 text-[#0e7c66]" filled={true} />
                  <h3 className="font-bold text-[#0a2e1e]">
                    Identity Verification
                  </h3>
                </div>
                <p className="text-sm text-[#5a6672]">
                  Multi-factor authentication, role-based access, and complete
                  audit logs ensure only authorized operators can perform
                  erasure.
                </p>
              </div>
              <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldIcon className="w-5 h-5 text-[#0e7c66]" filled={true} />
                  <h3 className="font-bold text-[#0a2e1e]">
                    Automated Verification
                  </h3>
                </div>
                <p className="text-sm text-[#5a6672]">
                  Post-erasure verification reads sectors to confirm
                  destruction. Failed verifications trigger alerts and prevent
                  reporting.
                </p>
              </div>
              <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                <div className="flex items-center gap-2 mb-3">
                  <GlobeIcon className="w-5 h-5 text-[#0e7c66]" filled={true} />
                  <h3 className="font-bold text-[#0a2e1e]">
                    Tamper-Evident Audit Reports
                  </h3>
                </div>
                <p className="text-sm text-[#5a6672]">
                  Digitally signed compliance reports with certificate stored in
                  immutable cloud storage. Any modification attempt is detected
                  and blocked.
                </p>
              </div>
              <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                <div className="flex items-center gap-2 mb-3">
                  <UsersIcon className="w-5 h-5 text-[#0e7c66]" filled={true} />
                  <h3 className="font-bold text-[#0a2e1e]">Vendor Oversight</h3>
                </div>
                <p className="text-sm text-[#5a6672]">
                  Real-time visibility into <Link to="/solutions/itad" className="text-[#0e7c66] hover:underline font-medium">ITAD</Link> partner operations. Verify
                  their erasure claims with independent evidence.
                </p>
              </div>
            </div>

            <div className="bg-[#0e7c66] rounded-none p-6 text-white">
              <h3 className="font-bold mb-4 text-[#0e7c66]">
                Zero Trust Controls in D-Secure
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>MFA required for all erasure operations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>Independent serial number verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>Post-erasure read-back verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>Cryptographically signed compliance reports</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>Immutable audit log storage</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon
                    className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0"
                    filled={true}
                  />
                  <span>Real-time <Link to="/solutions/itad" className="text-[#0e7c66] hover:underline font-medium">ITAD</Link> partner monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
            <p className="leading-relaxed mb-6">
              In a Zero Trust world, assumptions are vulnerabilities. Apply the
              same rigor to data disposal that you apply to network security.
              Verify every identity, every device, every process, and every
              document. Trust is earned through evidence, not assertions.
            </p>
            <Link
              to="/all-products"
              className="inline-flex items-center bg-white text-[#0e7c66] px-6 py-3 rounded-none font-semibold hover:bg-gray-50 transition-colors shadow-none"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Explore Zero Trust Solutions
              <HoverIcon>
                {(filled) => (
                  <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                )}
              </HoverIcon>
            </Link>
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard 
        blogId="zero-trust-disposal" 
        blogTitle="Zero Trust IT Asset Disposal: A Modern Security Strategy" 
      />

    </div>
  );
};

export default ZeroTrustDisposalBlog;
