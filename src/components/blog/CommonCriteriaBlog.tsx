import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const CommonCriteriaBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead
          seo={getBlogSEO({
            title: "Common Criteria Aligned Data Wiping: Why It Matters",
            excerpt: "Understand the importance of Common Criteria (ISO/IEC 15408) alignment for data erasure software and how D-Secure builds compliant solutions.",
            slug: "common-criteria",
            author: "D-Secure Editorial Team",
            publishDate: "February 10, 2025",
            keywords: "Common Criteria, EAL compliance, security standards",
            category: "Compliance",
            tag: "compliance",
          })}
        />

        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Standards & Compliance
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                Common Criteria Compliant <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Data Wiping</Link> Software
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> is built in alignment with the rigorous
                Evaluation Assurance Level 2 (EAL2) guidelines of the Common Criteria standard.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                What is the Common Criteria Standard?
              </h2>
              <p className="text-lg text-[#5a6672] leading-loose mb-6">
                The Common Criteria for Information Technology Security Evaluation (referred to as Common Criteria or CC) is an international standard (ISO/IEC 15408) for computer security certification. While official certification requires testing by a competent Common Criteria Test Laboratory (CCTL), many software vendors align their development practices with CC guidelines to ensure robust security postures.
              </p>
              <div className="bg-white border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                  About CCRA
                </h3>
                <p className="text-lg text-[#5a6672] leading-loose">
                  The <strong>Common Criteria Recognition Arrangement (CCRA)</strong> is a multiparty international agreement to mutually recognize and accept the evaluation of IT products based on the Common Criteria methodology. There are 18 member countries including Australia, Canada, France, Germany, India, Japan, Netherlands, and more.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                D-Secure's Alignment with EAL2 Principles
              </h2>
              <p className="text-lg leading-loose mb-8">
                At D-Secure, we develop our <Link to="/products/drive-eraser" className="text-white hover:underline font-medium">Drive Eraser</Link> solution utilizing the Common
                Criteria Evaluation Assurance Level 2 (EAL2) guidelines as a foundational security framework:
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Development Framework
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    <li>
                      • Software architecture designed following Common Criteria Standard Version 3.1 Revision 5 guidelines.
                    </li>
                    <li>
                      • Comprehensive documentation of functional specifications and design architectures.
                    </li>
                    <li>
                      • Strict configuration management and secure delivery procedures.
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Internal Verification Practices
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Developer Testing</h4>
                      <p className="text-sm text-white/80">
                        Comprehensive test coverage analysis in-house.
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Algorithm Verification</h4>
                      <p className="text-sm text-white/80">
                        Ensuring erasure protocols meet NIST and DoD standards.
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Vulnerability Assessment</h4>
                      <p className="text-sm text-white/80">
                        Continuous internal security and penetration testing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8 mt-12">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Why Standard Alignment Matters
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For Enterprises
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Confidence that your data erasure solution is built on internationally recognized security frameworks. Meets stringent security requirements for government and regulated industries.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For <Link to="/solutions/itad" className="text-[#0a2e1e] hover:underline font-medium">ITAD</Link> Providers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Offer your clients proven, compliant data destruction services. Differentiate your business by utilizing software developed under strict security methodologies.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For Compliance Officers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Demonstrate due diligence with compliant tools. Simplify audit processes with software that generates tamper-evident Certificates of Destruction.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For EaaS Providers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    If you're offering Erasure as a Service (EaaS), use software that aligns with the highest international security standards to build client trust.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      <BlogFooterStandard 
        blogId="common-criteria" 
        blogTitle="Common Criteria (ISO/IEC 15408) for Data Erasure" category="Compliance" tag="compliance" 
      />
      </div>
    );

};

export default CommonCriteriaBlog;
