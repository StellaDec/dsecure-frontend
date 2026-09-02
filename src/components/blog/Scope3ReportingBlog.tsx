import React from "react";
import { Link } from "react-router-dom";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from '@/components/Reveal';

const Scope3ReportingBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        seo={getBlogSEO({
          title: "ITAD, Secure Data Erasure, and the Growing Importance of Scope 3 Reporting",
          excerpt: "The CSRD and ESRS put IT Asset Disposition (ITAD) and secure data erasure in a more important position for Scope 3 emissions reporting.",
          slug: "itad-scope-3-reporting",
          author: "D-Secure Editorial Team",
          publishDate: "September 02, 2026",
          keywords: "ITAD, Secure Data Erasure, Scope 3 Reporting, CSRD, ESRS, GHG Protocol, Circularity, Asset Recovery, Enterprise Data Erasure, certified data erasure software",
          category: "Compliance",
          tag: "Sustainability",
        })}
      />

      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Sustainability & Compliance
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              ITAD, Secure Data Erasure, and the Growing Importance of Scope 3 Reporting
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm text-[#5a6672] mb-8 font-medium">
              <span>By D-Secure Editorial Team</span>
              <span className="w-1 h-1 rounded-full bg-[#d0d5dc]"></span>
              <span>September 02, 2026</span>
            </div>
            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed mb-8">
              The March 18, 2026 Omnibus I amendment to the CSRD reduces the number of companies that fall within its reporting scope. However, organizations that remain subject to the requirements still need to address sustainability reporting under the ESRS, including relevant Scope 3 emissions. This puts IT Asset Disposition (ITAD) and secure data erasure in a more important position within the technology lifecycle.
            </p>
            
            <div className="max-w-5xl mx-auto mt-10">
              <img 
                src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1788348487/ti93pafyd0i3jtvmwxpv.jpg" 
                alt="Enterprise ITAD and Secure Data Erasure Software for Scope 3 CSRD Reporting - D-Secure vs Competitor Alternatives" 
                width={1983}
                height={793}
                fetchPriority="high"
                className="w-full h-auto rounded-none shadow-md border border-[#d0d5dc]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-[95%] lg:max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="lg:w-2/3 w-full">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  Why Is ITAD Becoming a Board-Level Priority?
                </h2>
                <p className="mb-6">
                  The <strong>EU Corporate Sustainability Reporting Directive (CSRD)</strong>, amended through the <strong>Omnibus I Directive</strong>, came into force on March 18, 2026. The amendment narrowed the number of organizations required to report, with the revised scope generally covering undertakings and groups with more than 1,000 employees and more than €450 million in net annual turnover.
                </p>
                <p className="mb-6">
                  For organizations that remain within scope, sustainability reporting and limited assurance requirements continue to matter. The focus is not simply on whether a company has sustainability initiatives in place. Organizations increasingly need reliable and verifiable information about their environmental impact, including material Scope 3 emissions.
                </p>
                <p className="mb-6">
                  Scope 3 is particularly important because it extends beyond a company's direct operations and includes emissions throughout its wider value chain. For organizations with significant technology inventories, this can bring areas such as purchased capital goods and the treatment of operational waste into the conversation.
                </p>
                <p className="mb-6">
                  CSRD non-compliance penalties are determined under the applicable national rules of each EU Member State and are required to be effective, proportionate, and dissuasive. However, financial penalties are only part of the risk. A mismatch between an organization's sustainability claims and the evidence supporting those claims can also affect stakeholder confidence and corporate reputation.
                </p>
                <p className="mb-6">
                  This is where <strong>IT Asset Disposition (ITAD)</strong> becomes increasingly relevant.
                </p>
                <p className="mb-6">
                  For organizations managing large technology estates, ITAD can provide a structured way to manage retired devices while considering security, recovery, reuse, recycling, and end-of-life treatment. Secure data erasure is particularly important because it can determine whether a functional device can safely move toward another lifecycle—or whether physical destruction becomes the only practical option.
                </p>
                <p className="mb-6">
                  When an ITAD provider securely erases, verifies, tests, and prepares an asset for reuse, the device may be transferred to another organization instead of being immediately discarded or replaced with newly manufactured hardware.
                </p>
                <p className="mb-6">
                  That creates a connection between <strong>data security, asset recovery, circularity, and sustainability</strong>.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none mb-10">
                <h2 className="text-2xl font-bold text-[#0a2e1e] mb-3">Why Is ITAD Becoming More Important in the ESG Conversation?</h2>
                <p className="text-[#5a6672] text-lg leading-loose mb-6">
                  For organizations with substantial IT estates, two Scope 3 categories are especially relevant when considering the lifecycle of technology assets:
                </p>
                
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-2 mt-4">1. Category 5 — Waste Generated in Operations</h3>
                <p className="mb-4">
                  Category 5 covers emissions associated with the disposal and treatment of waste generated through an organization's operations. This can include solid waste such as electronic waste, as well as wastewater.
                </p>
                <p className="mb-6">
                  For IT-heavy organizations, the way retired computers, servers, storage devices, and other electronics are handled can therefore become an important part of the broader environmental impact discussion.
                </p>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-2 mt-4">2. Category 2 — Capital Goods</h3>
                <p className="mb-4">
                  Category 2 covers upstream emissions associated with capital goods purchased or acquired during the reporting year.
                </p>
                <p className="mb-6">
                  Technology hardware can fall within this broader capital-goods conversation. The question then becomes how organizations can make better lifecycle decisions around technology rather than treating every retired device as a one-time purchase-and-disposal cycle.
                </p>

                <div className="bg-white border border-[#d0d5dc] p-6 relative shadow-sm mt-6">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#0e7c66]"></div>
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">The Common Link: Reuse</h3>
                  <p className="text-[#5a6672] leading-relaxed mb-4">
                    The connection between these two areas is <strong>asset reuse</strong>. But before a device can be safely reused, one issue has to be addressed first: <strong>The data stored on that device must be securely removed.</strong>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  Data Erasure: The Critical Step Behind IT Asset Reuse
                </h2>
                
                <img 
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1788348487/sr7gihzvdfhfy6q9weyl.jpg" 
                  alt="Certified Data Erasure Software for IT Asset Disposition - Secure Drive Wipe Process and Asset Recovery" 
                  className="w-full h-auto rounded-none shadow-md border border-[#d0d5dc] mb-8"
                />

                <p className="mb-6">
                  Imagine two organizations: <strong>Company 1</strong> and <strong>Company 2</strong>.
                </p>
                <p className="mb-6">
                  Company 1 is retiring a fleet of laptops and servers. Many of the devices are still fully functional and could potentially serve for several more years. However, those devices contain business information, user data, credentials, application data, and other sensitive information.
                </p>
                <p className="mb-6">
                  Simply deleting files or performing a standard factory reset may not provide the level of assurance required for secure disposition. Physical destruction removes the data-security concern, but it also removes the possibility of recovering the device for another useful lifecycle.
                </p>
                <p className="mb-6">
                  Secure data erasure provides another option.
                </p>
                <p className="mb-6">
                  An ITAD provider can use a solution such as <Link to="/products/drive-eraser" className="text-[#0e7c66] font-semibold hover:text-[#0a2e1e] transition-colors">D-Secure Drive Eraser</Link> to securely erase data from eligible storage devices, verify the erasure process, and generate detailed documentation. <Link to="/products/hardware-diagnostics" className="text-[#0e7c66] font-semibold hover:text-[#0a2e1e] transition-colors">Hardware diagnostics</Link> can then help determine the condition of the device and whether it is suitable for reuse, refurbishment, recycling, or another disposition route.
                </p>
                <div className="bg-[#f4fbf8] p-6 text-center font-bold text-[#0a2e1e] text-xl border border-[#d0d5dc] mb-6 shadow-sm">
                  Retire → Securely Erase → Verify → Diagnose → Recover → Reuse
                </div>
                <p className="mb-6">
                  The result is more than simply a wiped device. It creates an evidence trail showing how the asset was handled after retirement. For Company 1, that documented process can help demonstrate that suitable assets were evaluated for reuse instead of automatically being sent for destruction or waste treatment.
                </p>
                <p className="mb-6">
                  Where an asset is genuinely diverted from a waste-treatment pathway toward legitimate reuse, there may be an environmental benefit. However, any resulting emissions impact must be calculated according to the organization's applicable Scope 3 methodology and supported by appropriate evidence.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  How Can ITAD Support Lower-Impact Technology Procurement?
                </h2>
                <p className="mb-6">
                  Now consider what happens to the device after Company 1's ITAD process.
                </p>
                <p className="mb-6">
                  A securely erased and tested laptop may be refurbished and subsequently acquired by <strong>Company 2</strong>. Instead of purchasing an entirely new device, Company 2 gains access to equipment that has already completed one useful lifecycle and has been prepared for another.
                </p>
                <p className="mb-6">
                  Extending the useful life of existing technology can help reduce the need for additional newly manufactured hardware. Manufacturing new electronic equipment involves raw materials, energy, transportation, and other upstream environmental impacts. This makes professionally refurbished and reused equipment relevant to organizations developing a <strong>circular procurement strategy</strong>.
                </p>
                <div className="border-l-4 border-[#0e7c66] pl-6 italic text-[#0a2e1e] mb-6">
                  The exact Scope 3 accounting treatment for second-hand or reused capital goods will depend on the organization's accounting policies and the applicable GHG accounting methodology. Nevertheless, the operational principle remains important: Keeping functional technology in productive use for longer can support a more circular approach to IT asset management.
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  The Changing Role of ITAD: From Disposal Partner to Circularity Enabler
                </h2>
                <p className="mb-6">
                  Traditionally, ITAD was often viewed primarily as the final step in the technology lifecycle—something that happened after an organization had finished using its equipment. That role is changing.
                </p>
                <p className="mb-6">
                  An effective ITAD process can connect <strong>data security, asset recovery, reuse, recycling, compliance, and sustainability</strong> within a single lifecycle.
                </p>
                <p className="mb-6">
                  One ITAD transaction can potentially create value for two organizations:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li className="mb-2"><strong>Company 1</strong> receives a secure and documented path for retiring its technology while identifying assets that may still have recovery value.</li>
                  <li className="mb-2"><strong>Company 2</strong> gains access to equipment that can support another useful lifecycle without necessarily requiring the manufacture of an entirely new device.</li>
                </ul>
                <p className="mb-6">
                  This makes ITAD increasingly relevant to broader ESG and sustainability strategies. The process can also provide organizations with the documentation needed to understand what happened to individual assets after retirement.
                </p>
                
                <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">Why Data Erasure Matters</h3>
                <p className="mb-6">
                  Secure data erasure is the critical enabler because data-security concerns can otherwise make physical destruction the default choice for retired technology.
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li className="mb-2"><strong><Link to="/products/hardware-diagnostics" className="text-[#0e7c66] hover:text-[#0a2e1e] transition-colors">Diagnostics</Link></strong> help identify assets that are technically suitable for recovery.</li>
                  <li className="mb-2"><strong><Link to="/products/drive-eraser" className="text-[#0e7c66] hover:text-[#0a2e1e] transition-colors">Secure erasure</Link></strong> removes the data barrier that prevents those assets from being reused.</li>
                  <li className="mb-2"><strong>Reporting and documentation</strong> create an evidence trail for the asset's disposition.</li>
                  <li className="mb-2">And <strong>reuse</strong> helps keep functional hardware in circulation for longer.</li>
                </ul>
                <p className="mb-6">
                  Together, these steps turn ITAD from a simple disposal activity into a more structured part of responsible technology lifecycle management.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-8 mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-4">What Does This Mean for Organizations?</h2>
                <p className="text-[#5a6672] leading-relaxed mb-6 text-lg">
                  As CSRD and ESRS reporting requirements continue to evolve, organizations need to look beyond simply retiring technology securely. They also need to understand what happens to those assets afterward. A documented, audit-ready sanitization process can help connect secure IT asset retirement with broader ESG and sustainability processes.
                </p>
                <p className="mb-4 font-semibold text-[#0a2e1e]">For organizations with large technology estates, this means being able to demonstrate:</p>
                <ul className="list-disc pl-6 mb-6 text-[#5a6672]">
                  <li>Which assets were retired</li>
                  <li>How and when data was securely erased</li>
                  <li>Whether erasure was successfully verified</li>
                  <li>Which devices were suitable for reuse or refurbishment</li>
                  <li>What happened to each asset afterward</li>
                  <li>Whether the asset was reused, recycled, or otherwise disposed of</li>
                  <li>What documentation supports the final disposition</li>
                </ul>
                <p className="mb-6 text-[#5a6672]">
                  <strong>D-Secure</strong> helps enterprises and ITAD providers build this evidence trail through secure data erasure, verification, asset-level reporting, and supporting capabilities for responsible IT asset disposition.
                </p>
                <div className="text-center font-bold text-xl italic text-[#0a2e1e] mb-6">
                  "How much value, useful life, and environmental responsibility can we preserve before that technology reaches the end of its lifecycle?"
                </div>
              </div>
            </Reveal>

          </div>

          <aside className="lg:w-1/3 w-full">
            <div className="sticky top-32">
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-6 rounded-none shadow-sm">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-6">Further Reading & Related Guides</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <Link to="/blog/itam-disposal-guide" className="text-[#0a2e1e] hover:text-[#0e7c66] transition-colors text-base font-medium leading-snug">
                      Secure IT Asset Disposal for ITAMs
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <Link to="/blog/eu-csrd" className="text-[#0a2e1e] hover:text-[#0e7c66] transition-colors text-base font-medium leading-snug">
                      EU CSRD and Data Disposal Implications
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <Link to="/blog/physical-destruction-vs-data-wiping" className="text-[#0a2e1e] hover:text-[#0e7c66] transition-colors text-base font-medium leading-snug">
                      Physical Destruction vs Data Wiping
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

        </div>
      </section>

      <section className="py-20 bg-[#0e7c66] text-center">
        <Reveal>
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Align ITAD with Scope 3?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              With D-Secure, enterprises and ITAD providers can securely erase sensitive information while maintaining detailed records of the sanitization process—helping create a stronger foundation for secure asset reuse and responsible disposition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-[#0a2e1e] px-8 py-4 rounded-none font-semibold hover:bg-gray-100 transition-all text-lg"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Note: FAQs are handled entirely by BlogFooterStandard based on the blogId. We don't render them directly here. */}
      <BlogFooterStandard
        blogId="itad-scope-3-reporting"
        blogTitle="ITAD, Secure Data Erasure, and the Growing Importance of Scope 3 Reporting"
        category="Compliance"
        tag="Sustainability"
      />
    </div>
  );
};

export default Scope3ReportingBlog;
