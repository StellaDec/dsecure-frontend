import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const LegalEthicalErasureBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead
          seo={getBlogSEO({
            title: "The Legal and Ethical Imperative of Data Erasure",
            excerpt: "Data erasure is not just an IT task; it is a fundamental ethical responsibility and legal requirement. Explore the intersection of privacy laws and corporate duty.",
            slug: "legal-ethical-erasure",
            author: "D-Secure Editorial Team",
            publishDate: "June 14, 2025",
            keywords: "legal, ethical, data erasure, obligations",
            category: "Compliance",
            tag: "Legal",
          })}
        />

        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Ethics & Compliance
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                The Legal and Ethical Dimensions of <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Data Erasure</Link>
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                Explore the legal and ethical aspects of data erasure to ensure
                data confidentiality, compliance, customer trust, and
                sustainability goals.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Legal Aspects of Data Erasure
              </h2>
              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Most global data protection laws grant individuals (data
                subjects) the right to get their data deleted or erased.
                Although this right is referenced by diverse names, the core
                connotation remains the same:
              </p>
              <ul className="space-y-3 text-[#5a6672] text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                  <strong>'Right to Delete'</strong> in Section 1798.105 of CCPA
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                  <strong>'Right to Erasure'</strong> in UK Data Protection Act
                  2018
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                  <strong>'Right to Destruction'</strong> in Article 4(5) of
                  Saudi Arabia's PDPL
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                  <strong>'Right to be Forgotten'</strong> in Article 17 of
                  EU-GDPR
                </li>
              </ul>

              <div className="bg-white border-l-4 border-[#0e7c66] p-6 rounded-none mt-6">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                  Penalties for Non-Compliance
                </h3>
                <ul className="space-y-2 text-[#5a6672]">
                  <li>
                    • EU-GDPR: Up to €20 million or 4% of annual turnover,
                    whichever is higher
                  </li>
                  <li>
                    • UK-GDPR: Up to £17.5 million or 4% of total worldwide
                    annual turnover
                  </li>
                  <li>
                    • CCPA: $7,500 per intentional violation, $2,500 per
                    unintentional violation
                  </li>
                  <li>
                    • PDPL: Up to 5 million Saudi Riyals (approximately €1.2
                    million) per violation
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Ethical Aspects of Data Erasure
              </h2>
              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Organizations have a responsibility to manage data ethically
                throughout its entire lifecycle, from creation to destruction,
                regardless of whether they are governed by data protection laws.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Data Privacy and Fairness
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    Organizations must ensure that the confidentiality of data
                    is maintained to provide individuals complete privacy.
                    Methods like data anonymization can help support fair and
                    unbiased processing of data.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Stakeholder and Customer Trust
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    It is important to earn trust with stakeholders, external
                    parties, and customers by ethically handling their sensitive
                    data. A lack of transparency regarding data erasure can
                    encourage them to discontinue investing in the company.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Meet Long-term Sustainability Goals
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    Organizations have an inherent accountability to create a
                    sustainable impact. Prioritizing ethical ways to destroy IT
                    assets decreases contribution to e-waste generation,
                    reducing carbon footprint. Device reuse over device
                    destruction helps address growing e-waste challenges.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Brand Reputation
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    When an organization keeps data beyond the retention period
                    without consent or after the purpose is no longer relevant,
                    it reflects negatively on brand image and reputation.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Benefits of Adhering to Legal & Ethical Aspects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">
                    Reducing Data Breach Risk
                  </h3>
                  <p className="text-white/90 text-sm">
                    Lawful, transparent, and legitimate processing of personal
                    data reduces vulnerabilities
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">
                    Protection from Fines
                  </h3>
                  <p className="text-white/90 text-sm">
                    Avoid fines and lawsuits by implementing industry-best
                    cybersecurity policies
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">
                    Increased Business Opportunities
                  </h3>
                  <p className="text-white/90 text-sm">
                    Reputation for ethical practices brings more opportunities
                    to innovate and expand
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">Customer Trust</h3>
                  <p className="text-white/90 text-sm">
                    Earn trust of partners and stakeholders through commitment
                    to ethical data handling
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-10 mt-10 space-y-6">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Conclusion
              </h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                Organizations must adhere to both legal and ethical aspects of
                data erasure. Following ethical data erasure practices and
                complying with legal requirements benefits businesses by
                reducing data breach risks, protecting from fines, increasing
                business opportunities, and building customer trust.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-20 bg-[#0e7c66] text-center">
          <Reveal>
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Embrace Legal & Ethical Data Erasure
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Implement trusted data erasure practices with D-Secure to meet
                legal requirements and ethical standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-white text-[#0e7c66] px-8 py-4 rounded-none font-semibold hover:bg-slate-100 transition-all text-lg"
                >
                  Request Free Demo
                </Link>
                <Link
                  to="/all-products"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-none font-semibold hover:bg-white/10 transition-colors text-lg"
                >
                  View Products
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      <BlogFooterStandard 
        blogId="legal-ethical-erasure" 
        blogTitle="Legal and Ethical Data Erasure" category="Compliance" tag="Legal" 
      />
    </div>
  );
};

export default LegalEthicalErasureBlog;
