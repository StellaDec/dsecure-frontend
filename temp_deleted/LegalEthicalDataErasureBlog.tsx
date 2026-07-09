// File: LegalEthicalDataErasureBlog.tsx

import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const LegalEthicalDataErasureBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-cyan-50">
      <SEOHead seo={getSEOForPage("blog-legal-ethical-data-erasure")} />

      {/* Hero */}
      <section className="py-16 bg-white shadow">
        <Reveal>
          <div className="text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              Data Protection & Governance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Legal and Ethical Dimensions of <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">Data Erasure</Link>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Why secure data erasure is not only a regulatory obligation, but
              also an ethical responsibility for organizations handling
              personal, sensitive, and confidential information across the
              entire IT asset lifecycle.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 lg:px-16 py-12">
        {/* Context */}
        <Reveal>
          <div className="bg-white rounded-xl shadow border p-10 space-y-6">
            <p className="text-lg text-slate-700 leading-loose">
              In modern organizations, IT assets are continuously reassigned,
              upgraded, retired, or recycled due to role changes, infrastructure
              modernization, or end-of-life decisions. Regardless of whether a
              device is reused internally, sold, donated, or dismantled, it
              inevitably contains residual information that may include
              Personally Identifiable Information (PII), Protected Health
              Information (PHI), financial records, or intellectual property.
            </p>
            <p className="text-lg text-slate-700 leading-loose">
              Industry studies indicate that a significant percentage of
              decommissioned or retained devices still carry recoverable
              sensitive data. Such exposure creates legal liability and ethical
              risk, especially when devices leave organizational control. Secure
              data erasure therefore becomes essential to uphold
              confidentiality, comply with law, and maintain trust.
            </p>
          </div>
        </Reveal>

        {/* Legal Rights Cards */}
        <Reveal>
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Legal Rights to Data Deletion Across Jurisdictions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "EU-GDPR",
                  desc: "Right to be Forgotten (Article 17)",
                },
                { title: "UK Data Protection Act", desc: "Right to Erasure" },
                {
                  title: "CCPA (USA)",
                  desc: "Right to Delete (Section 1798.105)",
                },
                {
                  title: "Saudi PDPL",
                  desc: "Right to Destruction (Article 4)",
                },
                {
                  title: "Peru Law 29733",
                  desc: "Right to Deletion / Cancellation",
                },
              ].map((law, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    {law.title}
                  </h3>
                  <p className="text-slate-700">{law.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Penalty Cards */}
        <Reveal>
          <div className="mt-10 bg-slate-100 rounded-xl p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Financial and Legal Consequences of Non-Compliance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "EU-GDPR: Up to €20M or 4% of global turnover",
                "UK-GDPR: Up to £17.5M or 4% of global turnover",
                "CCPA: $7,500 per intentional violation",
                "Saudi PDPL: Up to 5M SAR per violation",
              ].map((penalty, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-5 border text-slate-700"
                >
                  {penalty}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Ethical Pillars */}
        <Reveal>
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Ethical Foundations of Secure Data Erasure
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Privacy & Fairness",
                  desc: "Ensuring confidentiality and unbiased handling of personal data.",
                },
                {
                  title: "Stakeholder Trust",
                  desc: "Maintaining transparency and confidence among customers, partners, and employees.",
                },
                {
                  title: "Sustainability",
                  desc: "Reducing e-waste and carbon footprint through secure reuse instead of destruction.",
                },
                {
                  title: "Brand Reputation",
                  desc: "Preventing misuse of retained data beyond its lawful retention period.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Best Practices Cards */}
        <Reveal>
          <div className="mt-10 bg-white rounded-xl shadow border p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Building a Legally Compliant and Ethical Erasure Program
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Defined data retention and destruction policies",
                "Alignment with ISO 27001:2022 Annex A 8.10",
                "R2v3-compliant IT asset disposition",
                "Certified erasure tools and audit trails",
                "Employee awareness and training",
                "Periodic compliance and security audits",
              ].map((practice, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border rounded-lg p-5 text-slate-700"
                >
                  {practice}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Conclusion */}
        <Reveal>
          <div className="mt-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
            <p className="text-lg leading-loose mb-4">
              Legal obligations define what organizations are required to do,
              while ethical responsibility defines what they ought to do.
              Together, these dimensions establish the foundation for secure,
              transparent, and sustainable data lifecycle management.
            </p>
            <p className="text-lg leading-loose mb-6">
              By adopting certified data erasure technologies, complying with
              international regulations, and embedding ethical principles into
              operational culture, organizations can protect individual privacy,
              reduce regulatory exposure, strengthen brand trust, and contribute
              to environmental sustainability.
            </p>
            <Link
              to="/all-products"
              className="inline-block bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Compliance-Ready Erasure Solutions
            </Link>
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard 
        blogId="legal-ethical-data-erasure" 
        blogTitle="EU-GDPR" 
      />
    </div>
  );
};

export default LegalEthicalDataErasureBlog;
