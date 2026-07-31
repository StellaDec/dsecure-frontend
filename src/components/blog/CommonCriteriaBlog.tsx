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
            title: "Common Criteria Certified Data Wiping: Why It Matters",
            excerpt: "Understand the importance of Common Criteria (ISO/IEC 15408) certification for data erasure software and why government agencies mandate it.",
            slug: "common-criteria",
            author: "D-Secure Editorial Team",
            publishDate: "February 10, 2025",
            keywords: "Common Criteria, EAL certification, security standards",
            category: "Compliance",
            tag: "Certification",
          })}
        />

        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Certification & Compliance
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                Common Criteria Certified <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Data Wiping</Link> Software
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> is Common Criteria certified for
                Evaluation Assurance Level 2 (EAL2), solidifying its status as a
                trusted and certified data erasure solution.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                What is Common Criteria Certification?
              </h2>
              <p className="text-lg text-[#5a6672] leading-loose mb-6">
                Common Criteria Certified software undergoes rigorous testing
                and verification by a competent Common Criteria Test Laboratory
                (CCTL). These test laboratories are spread globally across
                Certificate Authorizing Member countries that are part of the
                Common Criteria Recognition Arrangement (CCRA).
              </p>
              <div className="bg-white border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                  About CCRA
                </h3>
                <p className="text-lg text-[#5a6672] leading-loose">
                  The{" "}
                  <strong>
                    Common Criteria Recognition Arrangement (CCRA)
                  </strong>{" "}
                  is a multiparty international agreement to mutually recognize
                  and accept the evaluation of IT products based on the Common
                  Criteria Certification methodology. There are 18 member
                  countries including Australia, Canada, France, Germany, India,
                  Japan, Netherlands, and more.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Certification Authorities Worldwide
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    India - IC3S
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    The Indian CC Certification Scheme (IC3S) operates within
                    the Standardization Testing and Quality Certification
                    Directorate (STQC), part of the Ministry of Electronics &
                    Information Technology under the Government of India.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Netherlands - TrustCB
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    TrustCB B.V., accredited by the Dutch Accreditation Council,
                    certifies IT security products, processes, and services
                    according to international and industry standards.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                D-Secure <Link to="/products/drive-eraser" className="text-white hover:underline font-medium">Drive Eraser</Link> Evaluation Process
              </h2>
              <p className="text-lg leading-loose mb-8">
                D-Secure <Link to="/products/drive-eraser" className="text-white hover:underline font-medium">Drive Eraser</Link> underwent exhaustive testing for Common
                Criteria certification with the following evaluation
                methodology:
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Evaluation Framework
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    <li>
                      • Software evaluated based on Common Criteria Standard
                      Version 3.1 Revision 5
                    </li>
                    <li>
                      • Testing performed at accredited Common Criteria Test
                      Laboratory (CCTL)
                    </li>
                    <li>
                      • Compliance with EAL2 (Evaluation Assurance Level 2)
                      requirements
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Testing Components for EAL2 Compliance
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Developer Testing</h4>
                      <p className="text-sm text-white/80">
                        Comprehensive test coverage analysis
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Independent Testing</h4>
                      <p className="text-sm text-white/80">
                        Evaluation team verification
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-none p-4 text-center">
                      <h4 className="font-bold mb-2">Penetration Testing</h4>
                      <p className="text-sm text-white/80">
                        Security vulnerability assessment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Evaluation Results & Findings
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0e7c66] text-xl mb-2">
                    Developer Testing Results
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Evaluators analyzed the developer's test coverage and found
                    them complete and satisfactory. The correspondence between
                    tests identified in developer documentation and the
                    functional specification was complete.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0e7c66] text-xl mb-2">
                    Independent Testing Results
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    The evaluation team simulated the developer's tests and
                    successfully reproduced them at CCTL. They analyzed code
                    snippets to ascertain erasure algorithm implementations meet
                    requirements of standards. The product was found to comply
                    with the Security Target.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0e7c66] text-xl mb-2">
                    Vulnerability & Penetration Testing
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    No vulnerabilities were found in the public domain. The
                    application has no external interfaces with IP addresses or
                    network-level access, and no vulnerabilities have ever been
                    reported. Testing revealed the software contains no
                    exploitable vulnerability for 'Basic Attack Potential.'
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#d4ede4] border border-[#d0d5dc] rounded-none p-10 mt-10 space-y-6">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Official Validator Comments
              </h2>
              <blockquote className="text-lg text-[#5a6672] leading-loose italic border-l-4 border-[#0e7c66] pl-6 py-4 bg-white rounded-none">
                "The results of the evaluation of product and process
                documentation, testing, and vulnerability assessment confirm
                that D-Secure <Link to="/products/drive-eraser" className="text-[#0a2e1e] hover:underline font-medium">Drive Eraser</Link> satisfies all the security functional
                requirements and assurance requirements as defined. Hence, the
                TOE (Target of Evaluation) is recommended for EAL2
                Certification."
              </blockquote>
              <p className="text-lg text-[#5a6672] leading-loose mt-6">
                Following this comprehensive evaluation, D-Secure Drive Eraser
                received the prestigious{" "}
                <strong>Common Criteria EAL2 Certification</strong>,
                establishing it as a trusted, tested, and certified data erasure
                solution.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                What EAL2 Certification Means for You
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For Enterprises
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Confidence that your data erasure solution has been
                    independently verified by international authorities. Meets
                    stringent security requirements for government and regulated
                    industries.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For <Link to="/solutions/itad" className="text-[#0a2e1e] hover:underline font-medium">ITAD</Link> Providers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Offer your clients proven, certified data destruction
                    services. Differentiate your business with internationally
                    recognized credentials.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For Compliance Officers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    Demonstrate due diligence with certified tools. Simplify
                    audit processes with independent third-party validation.
                  </p>
                </div>
                <div className="bg-[#d4ede4] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    For EaaS Providers
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-relaxed">
                    If you're offering Erasure as a Service (EaaS), use
                    certified drive-wiping software that meets the highest
                    international standards.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>


      <BlogFooterStandard 
        blogId="common-criteria" 
        blogTitle="Common Criteria (ISO/IEC 15408) for Data Erasure" category="Compliance" tag="Certification" 
      />
      </div>
    );

};

export default CommonCriteriaBlog;
