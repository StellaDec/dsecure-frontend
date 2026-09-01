import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";

const DoDWipingStandardBlog: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the DoD 5220.22-M data wiping standard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's a media sanitization method from the National Industrial Security Program Operating Manual, originally used by the U.S. Department of Defense, that overwrites data using a three-pass sequence — zeros, ones, then a random pattern — followed by verification."
        }
      },
      {
        "@type": "Question",
        "name": "Can DoD 5220.22-M be used to wipe SSDs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not reliably. The standard was built for magnetic media and has no defined method for flash-based storage. SSDs use wear levelling and block remapping that a sector-based overwrite can't fully address — NIST SP 800-88 and IEEE 2883:2022 are the more appropriate standards for SSDs and NVMe drives."
        }
      },
      {
        "@type": "Question",
        "name": "Is the DoD standard still recommended for government use today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not as the primary method. Since 2014, NISPOM has pointed to NIST SP 800-88 as the primary media sanitization guidance, and the DoD no longer treats 5220.22-M as the sole method for secure HDD wiping."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between DoD 5220.22-M and NIST 800-88?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DoD 5220.22-M is a fixed, pass-count-based method designed for magnetic media. NIST 800-88 is a broader, risk-based framework — Clear, Purge, Destroy — that selects a sanitization technique based on the specific media type, making it applicable to HDDs, SSDs, and NVMe drives alike."
        }
      },
      {
        "@type": "Question",
        "name": "Is 3-pass overwriting sufficient for modern drives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For HDDs, yes — the three-pass DoD method with verification is generally considered thorough. For SSDs and NVMe drives, pass count isn't the relevant factor at all; what matters is whether the sanitization technique can reach the areas where data may actually be stored, which overwriting alone often can't guarantee on flash media."
        }
      }
    ]
  };

  const faqs = faqSchema.mainEntity.map(faq => ({
    question: faq.name,
    answer: faq.acceptedAnswer.text
  }));

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        seo={getBlogSEO({
          title: "DoD 5220.22-M Wiping Standard Explained",
          excerpt: "DoD 5220.22-M wiping standard explained — the 3-pass method, its limits on SSDs, and why NIST 800-88 replaced it as the primary guidance.",
          slug: "dod-wiping-standard",
          author: "D-Secure Editorial Team",
          publishDate: "August 2026",
          keywords: "DoD 5220.22-M, dod wiping standard, 3 pass wipe, nispom, nist 800-88, hard drive erase",
          category: "Compliance",
          tag: "Standards",
        })}
      />

      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Standards Deep Dive
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
              DoD 5220.22-M wiping standard: what it is, and why it's not the last word anymore
            </h1>
            <p className="text-lg md:text-xl text-[#5a6672] mb-4">
              By D-Secure Editorial Team | Last updated: August 2026
            </p>
            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
              A procurement checklist lands on your desk with "DoD-compliant wipe" as a hard requirement. It sounds authoritative — Department of Defense, three overwrite passes, decades of use across industries. But dig one layer deeper and the picture gets more complicated: the DoD itself stopped treating this as its primary sanitization guidance back in 2014.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              That gap between reputation and current relevance causes real confusion during procurement and audits. This article covers what DoD 5220.22-M actually specifies, where it still holds up, where it falls short on modern drives, and what replaced it as the go-to standard.
            </p>
            
            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              What is the DoD 5220.22-M standard?
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              DoD 5220.22-M comes from the National Industrial Security Program Operating Manual (NISPOM), a media sanitization standard originally established by the U.S. Department of Defense for wiping storage media that held classified information.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              The core method: overwrite every addressable memory location with a character, then its complement, then a random character, followed by a verification pass to confirm the sanitization completed.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              How the DoD 5220.22-M 3-pass process works
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-4">
              The standard implementation runs three overwrite passes plus a full verification pass:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg font-medium mb-6">
              <li><strong>Pass 1 — Write zeros.</strong> Every addressable location gets overwritten with a zero, then the write is verified.</li>
              <li><strong>Pass 2 — Write ones.</strong> Every location gets overwritten with a one — the complement of pass one — and verified again.</li>
              <li><strong>Pass 3 — Random pattern and final verify.</strong> A random character overwrites every location, followed by a complete verification pass.</li>
            </ul>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              In 2001, a DoD memo introduced an extended seven-pass variant — DoD 5220.22-M (ECE) — which runs the standard three-pass sequence twice with an extra pass sandwiched in between. It still shows up in some legacy procurement language, but it's rarely used today outside narrow legacy military contexts, since it adds significant time and drive wear for minimal additional benefit on the media it was designed for.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              The Clearing and Sanitization Matrix
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              DoD 5220.22-M specifies different clear and sanitize methods depending on the storage media:
            </p>
            <div className="overflow-hidden rounded-none border border-[#d0d5dc] mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4fbf8]">
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Method</th>
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Description</th>
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Applicable media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Destroy</td>
                    <td className="px-6 py-4 text-[#5a6672]">Disintegrate, incinerate, pulverize, shred or melt</td>
                    <td className="px-6 py-4 text-[#5a6672]">All media types</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Overwrite</td>
                    <td className="px-6 py-4 text-[#5a6672]">Pattern, complement and random pass, then verify</td>
                    <td className="px-6 py-4 text-[#5a6672]">Magnetic media</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Full chip erase</td>
                    <td className="px-6 py-4 text-[#5a6672]">Per manufacturer datasheet procedure</td>
                    <td className="px-6 py-4 text-[#5a6672]">EEPROM, EAPROM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#5a6672] leading-loose text-lg mb-6 font-medium">
              Notice what's missing here: there's no dedicated method for flash-based SSDs or NVMe drives, because the standard predates their widespread enterprise use.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Where DoD 5220.22-M still holds up
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              For traditional magnetic hard disk drives, the three-pass overwrite-and-verify process is genuinely solid. It's efficient relative to older, more extreme methods like the 35-pass Gutmann standard — a meaningful factor when processing large volumes of drives — and the built-in verification pass gives real assurance that every location was actually overwritten, not just attempted.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Where it falls short on modern storage
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              DoD 5220.22-M is a legacy standard built around magnetic media assumptions. It has no defined method for flash-based storage — SSDs, hybrid drives, and other modern technologies use wear levelling and block remapping that a sector-based overwrite simply can't reach the way it can on an HDD.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              This isn't a minor caveat. Multiple overwrite passes are no longer recommended by <Link to="/blog/nist-800-88-rev2-update-2026" className="text-[#0e7c66] hover:underline">NIST SP 800-88</Link> or IEEE 2883:2022 for these media types — the sanitization technique needs to match the storage technology, not the other way around.
            </p>

            <div className="my-8">
              <Link to="/blog/ssd-wipe-bios" className="inline-flex items-center font-semibold text-[#0e7c66] hover:text-[#0a2e1e] transition-colors border-b-2 border-[#0e7c66] hover:border-[#0a2e1e] pb-1">
                Read: Why HDD-style overwriting doesn't work on SSDs
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Why NIST 800-88 replaced DoD as the primary guidance
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              Since 2014, NISPOM itself has pointed to NIST SP 800-88 as the primary media sanitization guidance document. The Department of Defense no longer treats DoD 5220.22-M as the sole method for secure HDD wiping — it's now one option among several, and not the recommended one for anything beyond magnetic media.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              This matters for procurement teams: requiring "DoD wiping" as a blanket standard for an entire mixed-media fleet — HDDs, SSDs, and NVMe drives together — misses the more current and more precise guidance that NISPOM itself now points to.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Is there such a thing as a "DoD Certificate of Destruction"?
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              No — there's no official DoD Certificate of Destruction issued by the Department of Defense. That specific document doesn't exist as an official artifact.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              What does exist: DoD-compliant data wiping software can generate its own certificate of erasure — documenting the method used, the device, and the verification result — that serves as auditable proof the wipe was performed correctly. It's a vendor-generated record referencing the standard, not a certificate issued by the DoD itself. Worth knowing before an auditor asks for one by that exact name.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              How D-Secure handles DoD wiping
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              A "DoD wipe" means overwriting all addressable locations on a drive following the steps in the DoD 5220.22-M algorithm. <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-semibold">D-Secure Drive Eraser</Link> supports this method alongside NIST SP 800-88, IEEE 2883, and 27+ other international sanitization standards, so the same platform can apply the right method per device rather than forcing one standard across an entire mixed-media fleet.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-4">
              D-Secure's DoD wiping capability includes:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg font-medium mb-6">
              <li>Selectable algorithm to overwrite storage locations per DoD 5220.22-M patterns and pass sequences</li>
              <li>Tamper-evident certificate and report generated for every erasure job</li>
              <li>Support for both the standard 3-pass and extended 7-pass DoD methods</li>
              <li>NIST SP 800-88, IEEE 2883, and 27+ additional standards available in the same workflow</li>
            </ul>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Where DoD wiping still fits into compliance
            </h2>
            <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-10 space-y-6">
              <p className="text-[#5a6672] leading-loose text-lg">
                For organizations handling sensitive or regulated data, disposal isn't a formality — it's a control that protects the business and its customers. DoD 5220.22-M remains a recognizable, well-documented method for magnetic media, and referencing it still carries weight in procurement conversations, particularly in sectors like government, defense-adjacent contracting, and legacy IT environments still running significant HDD fleets.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg">
                The practical move for most organizations today is to keep DoD 5220.22-M available for HDDs where it's genuinely appropriate, while defaulting to NIST SP 800-88 and IEEE 2883 for SSDs, NVMe drives, and any mixed-media disposal program — which is exactly what NISPOM itself now recommends.
              </p>
            </div>

            <div className="mt-12">
              <FAQSection faqs={faqs} className="px-0 py-0 bg-transparent" title="Frequently Asked Questions" />
            </div>

            <div className="bg-gray-50 border border-[#d0d5dc] rounded-none p-6 mt-12 text-center text-[#0a2e1e]">
              <p className="text-xl font-medium mb-4">Need a workflow that applies the right standard per device instead of one method across your whole fleet?</p>
              <p className="text-lg">
                <Link to="/contact" className="text-[#0e7c66] hover:underline font-bold">Talk to the D-Secure team</Link> about DoD, NIST 800-88, and IEEE 2883 support in one platform.
              </p>
            </div>

            <div className="border-t border-[#d0d5dc] pt-8 mt-12 text-[#5a6672]">
              <p className="font-bold text-[#0a2e1e] mb-2">Related reading:</p>
              <ul className="space-y-2">
                <li><Link to="/blog/nist-800-88-rev2-update-2026" className="text-[#0e7c66] hover:underline">NIST SP 800-88 Rev. 2 Explained (2026 Update)</Link></li>
                <li><Link to="/blog/ieee-2883-2022-data-sanitization" className="text-[#0e7c66] hover:underline">IEEE 2883-2022 Data Sanitization</Link></li>
                <li><Link to="/blog/erasure-verification-process" className="text-[#0e7c66] hover:underline">Erasure Verification Process Explained</Link></li>
              </ul>
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026') }}
            />
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard
        blogId="dod-wiping-standard"
        blogTitle="DoD 5220.22-M Wiping Standard"
        category="Compliance"
        tag="Standards"
        faqs={[]}
      />
    </div>
  );
};

export default DoDWipingStandardBlog;
