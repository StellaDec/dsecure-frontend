import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { ShieldIcon, CheckIcon, GlobeIcon, ArrowRightIcon, HoverIcon, ClipboardIcon } from "@/components/FlatIcons";
import { Link } from "react-router-dom";
import BlogFooterStandard from "./BlogFooterStandard";

const SECComplianceBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage('blog-sec-compliance')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                    Financial Compliance
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
                    SEC Compliance & Data Disposal
                </h1>
                <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
                    Meeting SEC Regulation S-P requirements for secure disposal of customer information in broker-dealer and investment advisory firms.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
             <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                
                {/* Introduction */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">Understanding SEC Regulation S-P</h2>
                    <p className="text-[#5a6672] leading-relaxed text-lg">
                        The Securities and Exchange Commission's Regulation S-P (Privacy of Consumer Financial Information) requires financial institutions to implement safeguards to protect customer information—including during disposal.
                    </p>
                    <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                        <strong className="text-[#0a2e1e] block mb-2">📋 Regulation S-P: Safeguards Rule</strong>
                        <p className="text-sm text-[#0a2e1e]">
                            Section 248.30(b) requires firms to "properly dispose of consumer information" by implementing policies and procedures to protect against unauthorized access to or use of customer information in connection with its disposal.
                        </p>
                    </div>
                </div>

                {/* Expert Solution Section Integration */}
                

                {/* Who Must Comply */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">Who Must Comply?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-5 rounded-none">
                            <h3 className="font-bold text-[#0a2e1e] mb-3">Covered Entities</h3>
                            <ul className="text-sm text-[#0a2e1e] space-y-2">
                                <li>✓ Broker-dealers</li>
                                <li>✓ Investment companies</li>
                                <li>✓ Investment advisers (SEC-registered)</li>
                                <li>✓ Transfer agents</li>
                            </ul>
                        </div>
                        <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-5 rounded-none">
                            <h3 className="font-bold text-[#0a2e1e] mb-3">Protected Information</h3>
                            <ul className="text-sm text-[#0a2e1e] space-y-2">
                                <li>✓ Social Security numbers</li>
                                <li>✓ Account numbers</li>
                                <li>✓ Transaction histories</li>
                                <li>✓ Any personally identifiable financial information</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Disposal Requirements */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">SEC Data Disposal Requirements</h2>
                    <p className="text-[#5a6672] leading-relaxed">
                        The SEC's Disposal Rule works in conjunction with Regulation S-P to mandate specific data destruction practices:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                            <h3 className="font-semibold text-[#0a2e1e] mb-1">1. Written Policies & Procedures</h3>
                            <p className="text-sm text-[#5a6672]">Documented disposal procedures that address the proper disposal of consumer information.</p>
                        </div>
                        <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                            <h3 className="font-semibold text-[#0a2e1e] mb-1">2. Appropriate Disposal Methods</h3>
                            <p className="text-sm text-[#5a6672]">Use methods that render information unreadable or undecipherable (shredding, burning, pulverizing for paper; wiping, degaussing, or destruction for electronic media).</p>
                        </div>
                        <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                            <h3 className="font-semibold text-[#0a2e1e] mb-1">3. Third-Party Vendor Oversight</h3>
                            <p className="text-sm text-[#5a6672]">Exercise due diligence in selecting service providers and require contractual commitments to proper disposal.</p>
                        </div>
                        <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                            <h3 className="font-semibold text-[#0a2e1e] mb-1">4. Employee Training</h3>
                            <p className="text-sm text-[#5a6672]">Train staff on disposal procedures and the importance of protecting customer information.</p>
                        </div>
                        <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                            <h3 className="font-semibold text-[#0a2e1e] mb-1">5. Periodic Review</h3>
                            <p className="text-sm text-[#5a6672]">Regularly review and update disposal policies to address evolving threats and technologies.</p>
                        </div>
                    </div>
                </div>

                {/* Electronic Media Disposal */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">Electronic Media Disposal Standards</h2>
                    <p className="text-[#5a6672] leading-relaxed">
                        For electronic storage media containing customer information, the SEC expects firms to use industry-recognized data sanitization standards:
                    </p>
                    <div className="bg-[#0e7c66] text-slate-100 p-6 rounded-none font-mono text-sm leading-relaxed">
                        <p className="text-[#d4ede4] font-bold mb-3">{'// Acceptable Disposal Methods'}</p>
                        <p className="mb-2">✓ DoD 5220.22-M (3 or 7-pass overwrite)</p>
                        <p className="mb-2">✓ <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">NIST 800-88</Link> compliant sanitization</p>
                        <p className="mb-2">✓ Cryptographic erasure (SEDs)</p>
                        <p className="mb-3">✓ Physical destruction (shredding, degaussing)</p>
                        <p className="text-[#0e7c66]">✗ Standard delete or format (INSUFFICIENT)</p>
                    </div>
                </div>

                {/* Vendor Management */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">Third-Party Vendor Due Diligence</h2>
                    <p className="text-[#5a6672] leading-relaxed">
                        If using <Link to="/solutions/itad" className="text-[#0e7c66] hover:underline font-medium">ITAD</Link> vendors or disposal services, SEC requires firms to:
                    </p>
                    <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                        <h3 className="font-bold text-[#0a2e1e] mb-4">Vendor Evaluation Checklist</h3>
                        <div className="space-y-2 text-sm text-[#5a6672]">
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0" filled={true} />
                                <span>Verify vendor's data destruction alignments (R2, e-Stewards, NAID AAA)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0" filled={true} />
                                <span>Require contractual commitments to SEC-compliant disposal methods</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0" filled={true} />
                                <span>Obtain certificates of destruction with device-level detail</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0" filled={true} />
                                <span>Conduct periodic audits of vendor facilities and processes</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-[#0e7c66] mt-0.5 flex-shrink-0" filled={true} />
                                <span>Verify vendor has adequate insurance and indemnification clauses</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examination Preparedness */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">SEC Examination Preparedness</h2>
                    <p className="text-[#5a6672] leading-relaxed">
                        During examinations, the SEC will look for evidence of compliance with disposal requirements. Be prepared to demonstrate:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[#d4ede4] border border-[#d0d5dc] p-4 rounded-none">
                            <h3 className="font-bold text-[#0a2e1e] mb-2">📄 Documentation</h3>
                            <ul className="text-sm text-[#0a2e1e] space-y-1">
                                <li>• Written disposal policies</li>
                                <li>• Vendor contracts and SOC reports</li>
                                <li>• Certificates of destruction</li>
                                <li>• Training records</li>
                            </ul>
                        </div>
                        <div className="bg-[#d4ede4] border border-[#d0d5dc] p-4 rounded-none">
                            <h3 className="font-bold text-[#0a2e1e] mb-2">🔍 Evidence of Implementation</h3>
                            <ul className="text-sm text-[#0a2e1e] space-y-1">
                                <li>• Audit trails of disposal events</li>
                                <li>• Annual policy reviews</li>
                                <li>• Regular vendor assessments</li>
                                <li>• Incident response procedures</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Penalties */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">Penalties for Non-Compliance</h2>
                    <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                        <strong className="text-[#0a2e1e] block mb-2">⚠️ Consequences of Violations</strong>
                        <ul className="text-sm text-[#0a2e1e] space-y-2">
                            <li>• Civil monetary penalties up to $92,000 per violation</li>
                            <li>• Censure or suspension of firm operations</li>
                            <li>• Reputational damage and loss of client trust</li>
                            <li>• Potential individual liability for executives</li>
                            <li>• Class action lawsuits from affected customers</li>
                        </ul>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure SEC Solution */}
        <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">D-Secure SEC Compliance Package</h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                    D-Secure provides turnkey SEC Regulation S-P compliance with automated documentation, audit trails, and examination-ready reporting.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                        <ClipboardIcon className="w-6 h-6 text-[#0a2e1e] mb-2" filled={true} />
                        <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">Automated Certificates</h3>
                        <p className="text-xs text-[#5a6672]">Device-level destruction verification for SEC exams</p>
                    </div>
                    <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                        <ShieldIcon className="w-6 h-6 text-[#0a2e1e] mb-2" filled={true} />
                        <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">Compliant Methods</h3>
                        <p className="text-xs text-[#5a6672]">DoD 5220.22-M and <Link to="/compliance/nist-800-88" className="text-[#0e7c66] hover:underline font-medium">NIST 800-88</Link> as standard</p>
                    </div>
                    <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                        <GlobeIcon className="w-6 h-6 text-[#0a2e1e] mb-2" filled={true} />
                        <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">Cloud Audit Trail</h3>
                        <p className="text-xs text-[#5a6672]">Immutable records for regulatory review</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-2xl font-bold mb-4">Ensure SEC Compliance</h2>
                <p className="leading-relaxed mb-6">
                    Get expert guidance on meeting SEC Regulation S-P requirements and preparing for examinations.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-[#0a2e1e] px-6 py-3 rounded-none font-semibold hover:bg-gray-50 transition-colors shadow-none"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Schedule Compliance Review
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      <BlogFooterStandard 
        blogId="sec-compliance-guide" 
        blogTitle="SEC Rule 17a-4 and Data Erasure: A Compliance Guide" 
      />
    </div>
  );
};

export default SECComplianceBlog;
