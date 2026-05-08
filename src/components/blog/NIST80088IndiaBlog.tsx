import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  GlobeIcon,
  ShieldIcon,
  DatabaseIcon,
  CheckIcon,
} from "@/components/FlatIcons";
import { ChevronRight } from "lucide-react";

const NIST80088IndiaBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEOHead
        seo={getBlogSEO({
          title: "NIST 800-88 Compliance in India: A Guide for DPDP Act",
          excerpt:
            "Deep dive into how NIST 800-88 standards help Indian enterprises achieve DPDP Act 2023 compliance through verified media sanitization.",
          slug: "nist-800-88-compliance-india",
          author: "D-Secure Editorial Team",
          publishDate: "January 12, 2026",
          keywords:
            "NIST 800-88 India, DPDP Act 2023, RBI data disposal guidelines, CERT-In erasure standards, India data privacy law",
          category: "Compliance",
          tag: "India",
        })}
      />

      {/* Hero Section */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wider">
                <GlobeIcon className="w-4 h-4" />
                <span>Regulatory Insight: India</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                NIST 800-88 Compliance in the{" "}
                <span className="text-emerald-600">Indian Regulatory</span>{" "}
                Landscape
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl">
                With the implementation of the Digital Personal Data Protection
                (DPDP) Act 2023, Indian enterprises are now legally obligated to
                ensure "Verified Erasure." Discover why <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link> has become
                the blueprint for compliance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <div className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <ShieldIcon className="w-8 h-8 text-emerald-600" />
                  The <Link to="/blog/nist-800-88-compliance-india" className="text-emerald-600 hover:underline font-medium">DPDP Act</Link> 2023 & "Duty to Erase"
                </h2>
                <p className="text-slate-700 leading-loose text-lg">
                  The **Digital Personal Data Protection (DPDP) Act 2023** has
                  fundamentally changed how Indian businesses handle data.
                  Section 8 of the Act mandates that a Data Fiduciary must erase
                  personal data as soon as the purpose of its collection is
                  served or if the user withdraws consent.
                </p>
                <p className="text-slate-700 leading-loose text-lg">
                  However, "erasure" in the eyes of Indian regulators isn't just
                  about hitting 'Delete'. It requires **Defensible Deletion**—a
                  process that is documented, verified, and permanent. NIST
                  800-88 provides the technical framework to achieve this
                  legally defensible state.
                </p>

                <div className="my-10 bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <DatabaseIcon className="w-48 h-48" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckIcon className="w-6 h-6 text-emerald-400" />
                    Key Regulatory Drivers in India
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-6 mt-6">
                    <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                      <h4 className="font-bold text-emerald-300">
                        RBI Master Directions
                      </h4>
                      <p className="text-sm mt-1 text-emerald-50">
                        Requires secure media disposal for BFSI sector to
                        prevent financial data leaks.
                      </p>
                    </li>
                    <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                      <h4 className="font-bold text-emerald-300">
                        CERT-In Advisories
                      </h4>
                      <p className="text-sm mt-1 text-emerald-50">
                        Guidelines on secure data sanitization to prevent
                        unauthorized access to sensitive IP.
                      </p>
                    </li>
                    <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                      <h4 className="font-bold text-emerald-300">
                        MeitY Guidelines
                      </h4>
                      <p className="text-sm mt-1 text-emerald-50">
                        Specific data disposal protocols for Government Data
                        Fiduciaries and contractors.
                      </p>
                    </li>
                    <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                      <h4 className="font-bold text-emerald-300">
                        ISO/IEC 27001
                      </h4>
                      <p className="text-sm mt-1 text-emerald-50">
                        Global security standard widely adopted by Indian IT
                        services for information destruction.
                      </p>
                    </li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
                  NIST Sanitization Methods for Indian Enterprises
                </h2>
                <p className="text-slate-700 leading-loose text-lg mb-8">
                  In the Indian context, where hardware reuse is common for
                  sustainability and cost-efficiency, choosing the right NIST
                  method is critical:
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-bold text-xl">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      NIST Clear
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Software-based overwriting using standard commands. Ideal
                      for non-sensitive data or secondary systems where the
                      media will stay within the organization.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 font-bold text-xl">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      NIST Purge
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Uses specialized firmware commands (like Secure Erase) to
                      reach hidden areas. Mandatory for sensitive data and
                      before selling assets to third parties in India.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
                  Implementing NIST Standards: 4 Steps for Indian CXOs
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Media Inventory
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Audit all storage devices including HDDs, SSDs, Mobile
                        devices, and Tape drives across your Indian data
                        centers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Standard Selection
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Adopt <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link> Rev 1 as your internal baseline for
                        all media sanitization policies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Software Automation
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Use professional tools like{" "}
                        <Link
                          to="/products/drive-eraser"
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          D-Secure <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">Drive Eraser</Link>
                        </Link>{" "}
                        to automate sanitization and generate certificates.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Regulatory Audit Trail
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Maintain centralized, tamper-proof reports for at least
                        7 years to comply with Indian data retention and audit
                        laws.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar / Quick Stats Column */}
          <div className="space-y-8">
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sticky top-24 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Quick Stats: India
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="text-2xl font-bold text-orange-700">
                      ₹250 Cr
                    </div>
                    <div className="text-xs text-orange-600 font-bold uppercase mt-1">
                      Max Penalty for DPDP Non-compliance
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-700">
                      100%
                    </div>
                    <div className="text-xs text-emerald-600 font-bold uppercase mt-1">
                      Audit Trail with D-Secure
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">
                      CERT-In
                    </div>
                    <div className="text-xs text-blue-600 font-bold uppercase mt-1">
                      Aligned with Govt Advisories
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="font-bold text-slate-900 mb-4">
                    India Compliance Suite
                  </h4>
                  <div className="space-y-3">
                    <Link
                      to="/products/drive-eraser"
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm font-medium"><Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">Drive Eraser</Link></span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </Link>
                    <Link
                      to="/products/smartphone-eraser"
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm font-medium">Mobile Eraser</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </Link>
                    <Link
                      to="/solutions/itad"
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm font-medium">
                        <Link to="/solutions/itad" className="text-emerald-600 hover:underline font-medium">ITAD</Link> Solutions
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready for India's DPDP Audit?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Don't wait for the regulator to knock. Ensure your data
              sanitization is NIST-compliant and legally defensible today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl hover:scale-105"
              >
                Book a Compliance Demo
              </Link>
              <Link
                to="/solutions/enterprise"
                className="inline-flex items-center justify-center bg-white/10 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20"
              >
                View Enterprise Solutions
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard
        blogId="nist-800-88-compliance-india"
        blogTitle="NIST 800-88 Compliance in India" category="Compliance" tag="India"
      />
    </div>
  );
};

export default NIST80088IndiaBlog;
