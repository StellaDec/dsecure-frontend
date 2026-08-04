import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const NIST80088Rev2UpdateBlog: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is NIST 800-88 Rev. 1 still valid for compliance purposes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. As of September 26, 2025, Rev. 1 has been formally withdrawn and archived by NIST. Organizations citing it in policy documents or vendor requirements should update to Rev. 2 to remain aligned with the current federal standard."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to re-wipe drives that were sanitized under Rev. 1 guidance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. Rev. 2 doesn't invalidate past erasure events performed correctly under Rev. 1's Clear/Purge/Destroy framework. What needs updating is your ongoing policy and documentation process going forward, particularly around audit trails, degaussing language, and media-specific method selection."
        }
      },
      {
        "@type": "Question",
        "name": "Does Rev. 2 require multiple overwrite passes for hard drives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No — for modern magnetic HDDs, a single verified overwrite pass is now considered sufficient. Legacy multi-pass requirements (3-pass, 7-pass, Gutmann) are no longer necessary and add processing time without proportional security benefit on current hardware."
        }
      },
      {
        "@type": "Question",
        "name": "Is degaussing still an acceptable sanitization method under Rev. 2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Degaussing alone is no longer treated as sufficient for a Destroy-level outcome on much of today's magnetic media under Rev. 2. Organizations relying on degaussing as their primary destruction method should review current guidance and consider pairing it with physical destruction where required."
        }
      },
      {
        "@type": "Question",
        "name": "How does NIST 800-88 Rev. 2 relate to IEEE 2883-2022?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rev. 2 removes its own device-specific technique tables and instead defers to IEEE 2883-2022 for the technical specifics of sanitization methods across different media types, while Rev. 2 itself focuses on the organizational program, risk-based decision flow, and documentation requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Does Rev. 2 apply to cloud and virtual environments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Unlike Rev. 1, which was largely written around physical devices, Rev. 2 explicitly extends its scope to virtual machine disk images, cloud storage buckets, and shared storage infrastructure, with expectations around KMS key deletion and provider-issued Certificates of Deletion."
        }
      },
      {
        "@type": "Question",
        "name": "How does NIST 800-88 Rev. 2 relate to India's DPDP Act, 2023?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The DPDP Act mandates data erasure once its purpose is served but doesn't prescribe a technical method. NIST 800-88 Rev. 2, paired with IEEE 2883-2022, gives Indian data fiduciaries a defensible, auditable technical standard to satisfy that erasure obligation and document it for regulators or Data Principal grievances."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        seo={getBlogSEO({
          title: "NIST SP 800-88 Rev. 2 Explained (2026 Update)",
          excerpt: "NIST SP 800-88 Rev. 1 was withdrawn in September 2025. This 2026 guide covers every Rev. 2 change — validation, cryptographic erase, degaussing, cloud sanitization, IEEE 2883-2022 — plus what it means for DPDP Act compliance in India.",
          slug: "nist-800-88-rev2-update-2026",
          author: "Prashant Saini",
          publishDate: "July 17, 2026",
          keywords: "NIST 800-88 Rev 2, NIST SP 800-88 Revision 2 2026, IEEE 2883-2022 compliance, data sanitization program, Clear Purge Destroy NIST 800-88, cryptographic erase FIPS 140-3, DPDP Act data deletion compliance, cloud data sanitization certificate of deletion, media sanitization program India",
          category: "Compliance / Standards",
          tag: "Standards",
        })}
        structuredData={[faqSchema]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Compliance / Standards - 2026 Update
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight max-w-5xl mx-auto">
              NIST SP 800-88 Rev. 2 Explained: What Changed, What's Withdrawn, and How to Stay Compliant in 2026
            </h1>
            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
              If your organization's data disposal policy still references "NIST 800-88 Rev. 1," it's time for an update — that document no longer exists as an active standard.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Intro Section */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <p className="text-[#5a6672] leading-loose text-lg">
              On September 26, 2025, the National Institute of Standards and Technology officially withdrawn Special Publication 800-88 Revision 1 and replaced it with <strong>Revision 2</strong>, marking the first major overhaul of the federal media sanitization guidelines in more than a decade.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg">
              For IT directors, compliance officers, and ITAD professionals — in the U.S., in India, and everywhere in between — this isn't a minor version bump. Rev. 2 changes how sanitization decisions are made, what counts as acceptable proof, and which technologies fall under its scope. It also quietly retires a technique many organizations still rely on. Anyone still building compliance programs, RFPs, or audit checklists around the 2014 guidance is now working from an archived document.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg">
              This guide breaks down exactly what changed, why it changed, what NIST's own change log says, and what your organization needs to do about it — including how Indian enterprises operating under the DPDP Act 2023 should read this update.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none text-justify">
                
                <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">Why NIST Retired a Standard That Had Been Stable Since 2014</h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                  Rev. 1 was written in a world that looked very different from today's IT environment. Magnetic hard drives were still the dominant storage medium, SSDs were a growing but secondary concern, and the idea of sanitizing a virtual machine snapshot or a cloud storage bucket barely registered as a use case. A decade later, the storage landscape has been rebuilt from the ground up:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-8">
                  <li><strong>Flash-based storage became dominant.</strong> SSDs and NVMe drives use wear-leveling and over-provisioned memory that standard overwrite passes cannot reliably reach.</li>
                  <li><strong>Self-encrypting drives (SEDs) became common</strong>, introducing cryptographic erasure as a legitimate — and often faster — sanitization method, but only when key management can be verified.</li>
                  <li><strong>Storage moved off physical premises.</strong> Cloud buckets, virtualized infrastructure, and shared storage arrays don't fit neatly into a framework built around "a drive you can physically hold."</li>
                  <li><strong>Breach costs kept climbing</strong>, and industry research on redeployed devices still carrying live data has pushed regulators toward treating sanitization as an ongoing risk-management discipline, not a one-time technical task.</li>
                </ul>
                <p className="text-[#5a6672] leading-relaxed mb-12">
                  NIST's own change notes for Rev. 2 confirm the shift directly: the document's focus has moved from prescribing hands-on sanitization steps to establishing an organization-wide <strong>media sanitization program</strong> — one that aligns with existing frameworks like SP 800-53 and ISO/IEC 27040, rather than standing alone.
                </p>

                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-8 pb-4 border-b border-[#d0d5dc]">What NIST 800-88 Rev. 2 Actually Changes</h2>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">1. Sanitization Is Now a Program, Not a Task</h3>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  Under Rev. 1, most organizations treated media sanitization as a checkbox at the end of a device's life — wipe it, generate a report, move on. Rev. 2 restructures this entirely. Organizations are now expected to maintain a documented <strong>media sanitization policy</strong>, assign accountable personnel, and align that policy with broader security frameworks. This matters because most sanitization failures were never caused by choosing the wrong overwrite pattern. They were caused by process gaps. Rev. 2 targets that root cause directly.
                </p>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">2. The Decision Flow Now Starts With Confidentiality and Reuse — Not With Device Tables</h3>
                <p className="text-[#5a6672] leading-relaxed mb-4">
                  Rev. 1 asked a fairly simple question: which sanitization technique should be applied to this device, based on detailed device-by-device tables in its appendices? Rev. 2 removes those tables entirely and reframes the decision sequence around four factors:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-[#5a6672] mb-6">
                  <li><strong>Data confidentiality category</strong> — based on FIPS 199 (Low, Moderate, High) or an organization's own classification policy.</li>
                  <li><strong>Information Storage Media (ISM) type</strong> — Rev. 2 replaces the older term "electronic media" with the broader "Information Storage Media," a category that now explicitly includes cloud storage, virtual disks, and shared infrastructure alongside physical drives.</li>
                  <li><strong>Reuse intent</strong> — will the device be redeployed internally, transferred externally, or retired permanently? This now comes <em>before</em> method selection, not after.</li>
                  <li><strong>Encryption status</strong> — was the media encrypted from initial deployment with a verifiable, validated implementation?</li>
                </ol>
                <div className="bg-[#f4fbf8] rounded-none p-6 mb-8 border border-[#d0d5dc]">
                  <p className="text-[#5a6672] leading-relaxed italic">
                    <strong>An important correction worth flagging here:</strong> Rev. 2 does <em>not</em> add more granular device-specific tables. It does the opposite — it strips out the static, device-by-device technique tables that Rev. 1 relied on. In their place, Rev. 2 points organizations to <strong>IEEE 2883-2022</strong> for the actual technical, media-specific execution detail.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">3. Verification and Validation Are Now Two Separate Processes</h3>
                <p className="text-[#5a6672] leading-relaxed mb-4">
                  This is one of the more technical but consequential changes. Rev. 1 treated "verifying" an erasure loosely. Rev. 2 formally separates:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-8">
                  <li><strong>Verification</strong> — confirming that the sanitization technique was executed correctly on the specific device.</li>
                  <li><strong>Validation</strong> — a program-level determination that a sanitization <em>method</em> is demonstrably effective for an entire class of ISM, established through lab testing, vendor documentation, or independent attestation.</li>
                </ul>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">4. Digital Audit Trails Are No Longer Optional</h3>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  Rev. 2 formalizes the expectation that every sanitization event produces a durable, traceable record — not a paper log or a spreadsheet entry, but a structured digital record that supports audit, accountability, and long-term traceability. The updated Certificate of Sanitization now also expects a documented validation status alongside the usual manufacturer, model, serial number, and method fields.
                </p>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">5. Single-Pass Overwrite Is Now Considered Sufficient for Modern HDDs</h3>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  For years, some organizations continued specifying legacy multi-pass overwrite methods — largely out of habit. Rev. 2 confirms what data sanitization researchers have argued for years: for modern magnetic media, a single well-executed overwrite pass, properly verified, is sufficient. Multiple passes add processing time and drive wear without a meaningful security benefit on modern hardware. This doesn't apply uniformly, though — flash-based media still requires purpose-built methods.
                </p>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">6. Degaussing Is Downgraded — A Change Most Guides Are Missing</h3>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  Degaussing, long treated as an acceptable Purge or even Destroy technique for magnetic media, is explicitly walked back. Rev. 2 clarifies that degaussing on its own no longer meets the bar for a Destroy-level sanitization outcome for many modern magnetic media types. Organizations that still specify "degauss and dispose" should review that language.
                </p>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">7. Cryptographic Erase Gets Formal Treatment — and a Quantum-Era Caveat</h3>
                <p className="text-[#5a6672] leading-relaxed mb-4">
                  Cryptographic erase (CE) is one of the few techniques Rev. 2 addresses directly rather than deferring to IEEE 2883. The updated guidance:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-8">
                  <li>Recommends organizations move their encryption posture toward <strong>FIPS 140-3</strong> validated modules.</li>
                  <li>Explicitly ties CE's assurance to <strong>zeroization</strong> of the encryption keys themselves, not just deletion of the data pointer.</li>
                  <li>Adds a forward-looking caution: for data with a long confidentiality lifespan, future advances in computing — including quantum computing — could eventually weaken the cryptographic assumptions CE relies on.</li>
                </ul>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">8. Expanded Scope: Cloud, Virtual, and Shared Infrastructure</h3>
                <p className="text-[#5a6672] leading-relaxed mb-4">
                  Rev. 2 explicitly extends coverage to virtual machine disk images, cloud storage buckets, and shared storage infrastructure. Organizations decommissioning cloud services are now expected to:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-8">
                  <li>Delete encryption keys through the provider's Key Management System (KMS).</li>
                  <li>Remove all associated files, storage buckets, volumes, and snapshots — not just the primary volume.</li>
                  <li>Obtain a Certificate of Deletion from the cloud service provider as documentary evidence.</li>
                  <li>Retain that evidence for audit purposes for a meaningful retention period.</li>
                </ul>

                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 mt-8">9. Method Selection Now Points to IEEE 2883-2022</h3>
                <p className="text-[#5a6672] leading-relaxed mb-12">
                  Rather than prescribing every sanitization method itself, Rev. 2 defers to <strong>IEEE 2883-2022</strong> — a more technically detailed standard focused specifically on sanitization methods for modern storage technologies. This creates a two-layer compliance model: NIST 800-88 Rev. 2 for program structure and risk classification; IEEE 2883-2022 for the technical execution details.
                </p>

                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">Rev. 1 vs. Rev. 2 — Quick Comparison</h2>
                <div className="overflow-x-auto mb-12">
                  <table className="w-full border-collapse bg-white rounded-none shadow-none border border-[#d0d5dc] text-left">
                    <thead>
                      <tr className="bg-[#0e7c66] text-white">
                        <th className="px-6 py-4">Area</th>
                        <th className="px-6 py-4">Rev. 1 (2014, Withdrawn)</th>
                        <th className="px-6 py-4 text-[#0e7c66]">Rev. 2 (2025, Current)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 font-semibold text-[#0a2e1e]">Framing</td>
                        <td className="px-6 py-4 text-[#5a6672]">One-time technical task</td>
                        <td className="px-6 py-4 text-[#0e7c66] font-medium">Ongoing organizational program</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold text-[#0a2e1e]">Decision starting point</td>
                        <td className="px-6 py-4 text-[#5a6672]">Choose a wiping technique from device tables</td>
                        <td className="px-6 py-4 text-[#0e7c66] font-medium">Classify data confidentiality and reuse intent first</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold text-[#0a2e1e]">Device-specific tables</td>
                        <td className="px-6 py-4 text-[#5a6672]">Included directly, by device type</td>
                        <td className="px-6 py-4 text-[#0e7c66] font-medium">Removed — deferred to IEEE 2883-2022 to avoid obsolescence</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold text-[#0a2e1e]">Verification</td>
                        <td className="px-6 py-4 text-[#5a6672]">Loosely defined</td>
                        <td className="px-6 py-4 text-[#0e7c66] font-medium">Formally separated from Validation</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold text-[#0a2e1e]">Cloud / VM / shared storage</td>
                        <td className="px-6 py-4 text-[#5a6672]">Not addressed</td>
                        <td className="px-6 py-4 text-[#0e7c66] font-medium">Explicitly in scope, with KMS + Certificate of Deletion expectations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">What This Means for Indian Enterprises Under the DPDP Act</h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                  The <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> requires that personal data be erased once its stated purpose has been served, once consent is withdrawn, or once a specified retention period lapses — whichever comes first. The Act doesn't prescribe a specific technical sanitization method, which is precisely the gap NIST 800-88 Rev. 2 is well-suited to fill for Indian organizations.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-12">
                  <li><strong>DPDP's "erasure" obligation</strong> needs a defensible technical standard behind it to survive an audit or a Data Principal grievance. NIST 800-88 Rev. 2's Clear/Purge/Destroy framework is exactly that evidentiary backbone.</li>
                  <li><strong>DPDP's data fiduciary accountability model</strong> mirrors Rev. 2's shift toward a documented, owned, auditable <em>program</em> rather than an ad hoc technical action.</li>
                  <li><strong>Cross-border data processing</strong> is common for Indian ITAD operators, GCCs, and IT services firms. Aligning sanitization practice with NIST 800-88 Rev. 2 and IEEE 2883-2022 gives these organizations one technical standard that simultaneously satisfies contractual obligations under GDPR, HIPAA, PCI DSS 4.0 and supports DPDP documentation.</li>
                  <li><strong>Sector regulators in India</strong> increasingly reference international sanitization standards as evidence of "reasonable security practices" under Indian law. A Rev. 2-aligned program strengthens that position directly.</li>
                </ul>

                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">Is Your Organization Rev. 2 Ready? A Quick Self-Check</h2>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-12">
                  <li>Does your written sanitization policy still cite "NIST 800-88 Rev. 1"? If yes, it needs updating.</li>
                  <li>Does your vendor contract or SOW still specify "degauss" as a standalone Destroy method for magnetic media?</li>
                  <li>Can you produce a <em>digital</em>, tamper-evident audit trail for every sanitization event, including a documented validation status?</li>
                  <li>Does your process distinguish between verifying a specific erasure and validating that the chosen method fits the media type?</li>
                  <li>If you rely on cryptographic erase, can you demonstrate FIPS 140-3-aligned key management and key zeroization?</li>
                  <li>Are cloud storage, virtual machine images, and shared infrastructure included in your sanitization scope?</li>
                </ul>

                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">How D-Secure Supports NIST 800-88 Rev. 2</h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                  D-Secure's erasure architecture was built around the same principles Rev. 2 formalizes — sanitization as a documented, verifiable, ongoing program rather than a one-time technical action.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#5a6672] mb-12">
                  <li><strong>Clear and Purge methods mapped to IEEE 2883-2022</strong> across HDDs, SATA SSDs, NVMe drives, and RAID arrays.</li>
                  <li><strong>Cryptographic erase support built around key zeroization</strong> and validated encryption modules, directly addressing Rev. 2's tightened CE expectations.</li>
                  <li><strong>Digitally signed, tamper-proof audit trails</strong> in both PDF and XML — generated automatically for every erasure event, with verification and validation status recorded separately.</li>
                  <li><strong>Coverage beyond physical drives</strong>, including file-and-folder erasure across cloud-synced storage, virtual machine sanitization, and Certificate-of-Deletion-style documentation for logical storage.</li>
                  <li><strong>REST API, ServiceNow, and ERP integrations</strong> that let sanitization operate as part of a continuous IT asset lifecycle program.</li>
                  <li><strong>DPDP Act 2023-mapped compliance documentation</strong>, giving Indian enterprises a single workflow that satisfies both domestic erasure obligations and international audit requirements.</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Compliance Tool */}
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-6">Compliance Checker</h3>
                <p className="text-[#5a6672] text-sm mb-6">
                  Use our free NIST 800-88 Compliance Checker to evaluate your data erasure policy against Rev. 2 standards.
                </p>
                <Link
                  to="/tools/nist-800-88-checker"
                  className="block w-full py-3 px-4 bg-[#0e7c66] text-white text-center rounded-none font-semibold hover:bg-[#0e7c66] transition-colors"
                >
                  Start Assessment
                </Link>
              </div>

              <div className="bg-[#0e7c66] rounded-none p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Request Consultation</h3>
                <p className="text-[#5a6672] text-sm mb-6">
                  Need help evaluating whether your current sanitization workflow aligns with NIST 800-88 Rev. 2? Talk to our compliance experts.
                </p>
                <Link
                  to="/contact"
                  className="block w-full py-3 px-4 bg-[#0e7c66] text-white text-center rounded-none font-semibold hover:bg-[#0e7c66] transition-colors"
                >
                  Contact Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-[#0a2e1e] mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, idx) => (
                <div key={idx} className="bg-[#f4fbf8] rounded-none p-6 border border-[#d0d5dc]">
                  <h3 className="text-lg font-bold text-[#0a2e1e] mb-3">{faq.name}</h3>
                  <p className="text-[#5a6672] leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section> */}

      <BlogFooterStandard 
        blogId="nist-800-88-rev2-update-2026" 
        blogTitle="NIST SP 800-88 Rev. 2 Explained (2026 Update)" 
        category="Compliance / Standards" 
        tag="Standards" 
        faqs={faqSchema.mainEntity.map(faq => ({ question: faq.name, answer: faq.acceptedAnswer.text }))}
      />
    </div>
  );
};

export default NIST80088Rev2UpdateBlog;
