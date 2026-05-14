import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const RightToRepairBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
        <SEOHead
          seo={getBlogSEO({
            title: "Right to Repair and Data Security",
            excerpt:
              "Balancing right to repair initiatives with data security requirements.",
            slug: "right-to-repair",
            author: "D-Secure Editorial Team",
            publishDate: "April 2, 2025",
            keywords: "right to repair, data security, legislation",
            category: "Policy",
            tag: "Industry",
          })}
        />

        <section className="py-16 bg-white shadow-lg">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                <Link to="/products/hardware-diagnostics" className="text-emerald-600 hover:underline font-medium">Hardware Diagnostics</Link>
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Supporting Right to Repair with <Link to="/products/hardware-diagnostics" className="text-emerald-600 hover:underline font-medium">Hardware Diagnostics</Link>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Learn how <Link to="/products/hardware-diagnostics" className="text-emerald-600 hover:underline font-medium">hardware diagnostics</Link> tools empower the Right to Repair
                movement by providing accurate device diagnosis for efficient
                repairs.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                The Right to Repair Movement
              </h2>
              <p className="text-slate-700 leading-loose text-lg mb-6">
                The <strong>Right to Repair</strong> movement advocates for
                consumers' ability to repair their own electronic devices
                without being forced to use manufacturer-authorized services.
                This movement promotes sustainability, reduces e-waste, and
                gives consumers more control over their devices.
              </p>
              <p className="text-slate-700 leading-loose text-lg mb-6">
                <Link to="/products/hardware-diagnostics" className="text-emerald-600 hover:underline font-medium">Hardware diagnostics</Link> tools play a crucial role in this movement
                by enabling independent repair shops and consumers to accurately
                diagnose device issues without proprietary manufacturer tools.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                How <Link to="/products/hardware-diagnostics" className="text-emerald-600 hover:underline font-medium">Hardware Diagnostics</Link> Supports Right to Repair
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3">
                    {" "}
                    Accurate Diagnosis
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Identify hardware issues quickly without
                    manufacturer-specific tools or expensive diagnostic
                    equipment.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3">️ Reduces E-Waste</h3>
                  <p className="text-white/90 leading-relaxed">
                    Enable repairs that extend device life, reducing the number
                    of devices ending up in landfills.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3"> Cost Savings</h3>
                  <p className="text-white/90 leading-relaxed">
                    Independent repairs are often more affordable than
                    manufacturer services, saving consumers money.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3">
                    {" "}
                    Empowers Small Businesses
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Independent repair shops can compete fairly with
                    manufacturer-authorized service centers.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <BlogFooterStandard
          blogId="right-to-repair"
          blogTitle="Right To Repair" category="Policy" tag="Industry"
        />
      </div>
    );
};

export default RightToRepairBlog;
