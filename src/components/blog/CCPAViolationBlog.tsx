import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from '@/components/Reveal';

const CCPAViolationBlog: React.FC = () => {
  const blogId = "ccpa-violation";
  const blogTitle = "CCPA Violation Case Study";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
      <SEOHead
        seo={getBlogSEO({
          title: "CCPA Violation Case Study",
          excerpt:
            "Learn from real CCPA violations and how proper data erasure can help your business stay compliant with California privacy laws.",
          slug: "ccpa-violation",
          author: "D-Secure Editorial Team",
          publishDate: "December 19, 2026",
          keywords:
            "CCPA compliance, California Consumer Privacy Act, data subject rights, privacy regulations, consumer data protection",
          category: "Regulatory",
          tag: "Compliance",
        })}
      />

      <section className="py-16 bg-white shadow-lg">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              Compliance Case Study
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Major Retailer's CCPA Violations Result in $1.2 Million Fine:
              Lessons for Every Business
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              A comprehensive analysis of how failing to honor customer privacy
              rights led to significant penalties, and critical steps businesses
              must take to ensure CCPA compliance.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Understanding CCPA and Consumer Rights
            </h2>
            <p className="text-lg text-slate-700 leading-loose mb-6">
              The California Consumer Privacy Act (CCPA) provides California
              residents with enhanced control over their personal data. This
              landmark legislation grants consumers several fundamental rights
              that businesses must honor:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Right to Know
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Customers have the right to know what data is collected, sold,
                  or disclosed and to whom that data is shared.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Right to Opt-Out
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Consumers can deny the sale of their data and request
                  businesses stop selling their personal information.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Right to Deletion
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Customers can request their data be permanently deleted from a
                  business's database.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Right to Non-Discrimination
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Businesses cannot discriminate against customers for
                  exercising their privacy rights.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
            <h2 className="text-3xl font-bold mb-6">
              The Violations: What Went Wrong
            </h2>
            <p className="text-lg leading-loose mb-8">
              The California Attorney General's office filed an official
              complaint citing several critical violations of consumer privacy
              rights:
            </p>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">
                  Failure to Disclose Data Sales
                </h3>
                <p className="text-white/90 leading-relaxed">
                  The retailer was selling personal customer data to third
                  parties but failed to disclose this practice to customers.
                  They did not inform customers about the categories of data
                  sold in the previous 12 months.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">
                  Missing "Do Not Sell" Option
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Their website and mobile app lacked a "Do Not Sell My Personal
                  Information" link and provided no visible means for customers
                  to opt out of data sales.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">
                  Ignoring Global Privacy Control (GPC)
                </h3>
                <p className="text-white/90 leading-relaxed">
                  CCPA requires that user-enabled privacy controls be treated
                  the same as clicking "do not sell." Website traffic analysis
                  revealed that despite receiving "do not sell" signals from GPC
                  browsers and extensions, data continued flowing to third-party
                  vendors and analytics providers.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">
                  Failure to Cure Within 30 Days
                </h3>
                <p className="text-white/90 leading-relaxed">
                  After violations came to light, the company was given 30 days
                  to remedy the issues. They failed to address the problems and
                  remained defiant, leading to legal liabilities.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Regulatory Implications and Industry Impact
            </h2>
            <p className="text-lg text-slate-700 leading-loose mb-6">
              CCPA has been a trailblazer for data privacy and protection laws
              in the United States. Since its enforcement, regulators have been
              closely monitoring compliance. This case opened the floodgates and
              set the pace for future settlements.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-slate-900 text-xl mb-3">
                The Attorney General's Warning
              </h3>
              <p className="text-lg text-slate-700 leading-loose italic">
                "My office is watching, and we will hold you accountable."
              </p>
              <p className="text-lg text-slate-700 leading-loose mt-4">
                This statement signals clear intent to pursue aggressive
                enforcement against violators. Businesses that fall under CCPA's
                purview need to take a hard look at their policies to avoid
                similar fates.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Essential Steps to Safeguard Against CCPA Violations
            </h2>
            <p className="text-lg text-slate-700 leading-loose mb-6">
              Companies must take concrete steps to protect themselves from CCPA
              violations. These proven strategies can help ensure compliance:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Respect Customer Rights
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Honoring customers' rights is the first step toward
                  compliance. The rights of opting out, not selling data, and
                  data deletion are clearly defined in CCPA, providing clear
                  guidelines for businesses to follow.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Practice Full Transparency
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Data collection and its intended purpose must be transparently
                  communicated. Data should only be used for stated purposes,
                  and explicit permission must be obtained if purposes change.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Review Data Monetization Processes
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Be cautious when selling or sharing customer data. Explicit
                  customer permissions are necessary before data can be sold or
                  shared with third parties.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Update Contracts and Policies
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Ensure contracts with data-sharing partners include CCPA
                  provisions. Update website privacy and cookie policies to
                  align with data privacy guidelines.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Implement Privacy Mechanisms
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Website must have visible "Do Not Sell My Personal
                  Information" links and must honor requests from Global Privacy
                  Control browsers and extensions.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h3 className="font-bold text-emerald-700 text-xl mb-2">
                  Establish Data Destruction Policy
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  A robust data destruction policy ensures that when deletion
                  requests are received, data is erased permanently. Erasure
                  certificates help satisfy the "burden of proof" required for
                  audit, compliance, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              The Role of Data Destruction in CCPA Compliance
            </h2>
            <p className="text-lg text-slate-700 leading-loose mb-6">
              When customers exercise their right to deletion, businesses must
              be able to permanently erase their data. This requires:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Permanent Erasure
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Use certified data erasure software that overwrites data
                  beyond recovery, not just simple deletion.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Proof of Destruction
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Generate erasure certificates to demonstrate compliance and
                  satisfy audit requirements.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Verified Process
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Implement verification steps to confirm data has been
                  completely removed from all systems.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 text-xl mb-3">
                  Documentation
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Maintain detailed records of deletion requests and responses
                  for regulatory review.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Expert Solution Section Integration */}
        <Reveal>
          
        </Reveal>

        <Reveal>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Key Takeaways: Time to Adopt a Data Privacy Policy
            </h2>
            <p className="text-lg text-slate-700 leading-loose">
              The initial days of CCPA were characterized by many businesses
              remaining indifferent to the regulations. This enforcement action
              has come as a wake-up call for the entire industry.
            </p>
            <ul className="space-y-4 text-slate-700 text-lg leading-loose mt-4">
              <li className="border-l-4 border-emerald-500 pl-8 py-2">
                The indications for severe penalties are clear and may prove
                detrimental to businesses that ignore customer data rights
              </li>
              <li className="border-l-4 border-emerald-500 pl-8 py-2">
                Adopting and implementing data privacy policies as part of data
                lifecycle management is an urgent need
              </li>
              <li className="border-l-4 border-emerald-500 pl-8 py-2">
                Businesses must view customer privacy rights with the highest
                regard they deserve
              </li>
              <li className="border-l-4 border-emerald-500 pl-8 py-2">
                Global Privacy Control signals must be honored just like
                explicit opt-out requests
              </li>
              <li className="border-l-4 border-emerald-500 pl-8 py-2">
                Data destruction capabilities are essential for honoring
                deletion requests
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Standardized Blog Footer */}
      <BlogFooterStandard blogId={blogId} blogTitle={blogTitle} />
    </div>
  );
};

export default CCPAViolationBlog;

