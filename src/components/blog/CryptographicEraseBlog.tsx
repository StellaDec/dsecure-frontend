import React from "react";
import { Link } from "react-router-dom";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { FAQSection } from "@/components/FAQSection";

const CryptographicEraseBlog: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is cryptographic erase under NIST SP 800-88?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's a Purge-level sanitization method, defined in Section 3.2 of NIST SP 800-88 Rev. 2, that destroys the encryption key protecting a drive's data rather than overwriting the data itself. Once the key is gone, the remaining ciphertext is permanently unreadable."
        }
      },
      {
        "@type": "Question",
        "name": "Is cryptographic erase as secure as overwriting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For properly encrypted drives without escrowed keys, CE meets Purge-level assurance under NIST guidance. It's classified as Purge rather than Destroy because future advances in computing — including quantum computing — could theoretically weaken the encryption it depends on."
        }
      },
      {
        "@type": "Question",
        "name": "Can cryptographic erase be used on any drive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. CE only works on self-encrypting drives (SEDs) with active, hardware-level encryption — typically implementing TCG Opal, TCG Enterprise, or IEEE 1667. Standard, non-encrypted HDDs and SSDs need overwrite-based sanitization instead."
        }
      },
      {
        "@type": "Question",
        "name": "Does cryptographic erase remove data from the drive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, and this trips people up. CE leaves the encrypted data physically in place — it only destroys the key needed to decrypt it. The data becomes unreadable, but it isn't erased in the traditional sense."
        }
      },
      {
        "@type": "Question",
        "name": "When should I combine cryptographic erase with an overwrite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NIST recommends CE plus a follow-up overwrite for the highest assurance cases — classified data, long confidentiality windows, or any scenario where key escrow can't be ruled out."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "What is cryptographic erase under NIST SP 800-88?",
      answer: "It's a Purge-level sanitization method, defined in Section 3.2 of NIST SP 800-88 Rev. 2, that destroys the encryption key protecting a drive's data rather than overwriting the data itself. Once the key is gone, the remaining ciphertext is permanently unreadable."
    },
    {
      question: "Is cryptographic erase as secure as overwriting?",
      answer: "For properly encrypted drives without escrowed keys, CE meets Purge-level assurance under NIST guidance. It's classified as Purge rather than Destroy because future advances in computing — including quantum computing — could theoretically weaken the encryption it depends on."
    },
    {
      question: "Can cryptographic erase be used on any drive?",
      answer: "No. CE only works on self-encrypting drives (SEDs) with active, hardware-level encryption — typically implementing TCG Opal, TCG Enterprise, or IEEE 1667. Standard, non-encrypted HDDs and SSDs need overwrite-based sanitization instead."
    },
    {
      question: "Does cryptographic erase remove data from the drive?",
      answer: "No, and this trips people up. CE leaves the encrypted data physically in place — it only destroys the key needed to decrypt it. The data becomes unreadable, but it isn't erased in the traditional sense."
    },
    {
      question: "When should I combine cryptographic erase with an overwrite?",
      answer: "NIST recommends CE plus a follow-up overwrite for the highest assurance cases — classified data, long confidentiality windows, or any scenario where key escrow can't be ruled out."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        seo={getBlogSEO({
          title: "Cryptographic Erase Explained: What NIST SP 800-88 Requires",
          excerpt: "Cryptographic Erase (CE) under NIST SP 800-88 Rev. 2: how it works, when it's Purge-level, and when overwrite is the safer call.",
          slug: "cryptographic-erase",
          author: "Prashant Saini",
          publishDate: "August 2026",
          keywords: "nist sp 800-88 cryptographic erase, cryptographic erasure, encryption, key destruction, purge sanitization, SED, self-encrypting drive, CE vs overwrite",
          category: "Technical Guide",
          tag: "Technical",
        })}
      />

      {/* Hero */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              NIST SP 800-88 Rev.2
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              Cryptographic erase, explained: what NIST SP 800-88 actually requires
            </h1>
            <p className="text-lg md:text-xl text-[#5a6672] mb-4">
              By Prashant Saini, D-Secure Technologies | Last updated: August 2026
            </p>
            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
              A client once asked me why their SSD erasure job finished in eight seconds when their old HDD wipe used to run overnight. The honest answer: we weren't overwriting anything. We were destroying a key.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <p className="text-[#5a6672] leading-loose text-lg font-medium">
              <strong>Cryptographic Erase (CE) is a Purge-level sanitization technique, defined under Section 3.2 of NIST SP 800-88 Rev. 2, that destroys the encryption key protecting a drive's data instead of overwriting the data itself.</strong> Once the key is gone, the ciphertext left behind on the drive is permanently unreadable — no decryption key, no recovery path. It's the fastest sanitization method NIST recognizes, and it's quietly become the default for enterprise SSDs and NVMe drives. But it comes with real conditions attached, and knowing when <em>not</em> to rely on it matters just as much as knowing how it works.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              What cryptographic erase actually does
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg">
              CE doesn't touch your data. It sanitizes the key used to encrypt it. Since the drive's stored data — the ciphertext — stays exactly where it is, CE isn't "deleting" anything in the traditional sense. It's cutting the one thread that makes that ciphertext meaningful.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg">
              That's also why it's fast. Overwriting a multi-terabyte drive means physically rewriting every addressable sector — hours, sometimes most of a day. Destroying a 256-bit key takes seconds, regardless of how large the drive is. Same security outcome, radically different time cost, which is exactly why CE has become the go-to method for high-volume SSD and NVMe environments.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg">
              CE only works on <strong>self-encrypting drives (SEDs)</strong> — drives with integrated, always-on symmetric-key encryption. Most enterprise SSDs and NVMe drives ship this way now, typically implementing TCG Opal or IEEE 1667.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              How it actually runs, step by step
            </h2>
            <div className="space-y-6">
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">1. Authentication</h3>
                <p className="text-[#0a2e1e] leading-relaxed">
                  The erasure software authenticates against the drive's security subsystem using administrative credentials — the SID or PSID on TCG Opal drives. This is what unlocks access to the drive's key management functions in the first place.
                </p>
              </div>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">2. Key regeneration or destruction</h3>
                <p className="text-[#0a2e1e] leading-relaxed">
                  The software tells the drive's crypto controller to either destroy the current Media Encryption Key (MEK) outright or regenerate it with a fresh random key. Either way, the link between the ciphertext sitting on the platters or NAND and the key that could decrypt it is permanently severed.
                </p>
              </div>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">3. Verification</h3>
                <p className="text-[#0a2e1e] leading-relaxed">
                  This step confirms the drive's encryption state actually reset and the old MEK is genuinely gone — not just marked for deletion. Some tools also read-verify the drive to confirm the data now reads as random, unreadable ciphertext.
                </p>
              </div>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">4. Certificate generation</h3>
                <p className="text-[#0a2e1e] leading-relaxed">
                  A tamper-evident certificate gets generated: drive serial number, model, capacity, the CE method used, verification result, operator identity, timestamp. This is your audit evidence, and it's the piece regulators actually ask for.
                </p>
              </div>
            </div>

            <div className="my-8">
              <Link to="/compliance/nist-800-88" className="inline-flex items-center font-semibold text-[#0e7c66] hover:text-[#0a2e1e] transition-colors border-b-2 border-[#0e7c66] hover:border-[#0a2e1e] pb-1">
                Read: NIST 800-88 Rev. 2 explained
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              What NIST actually requires for CE to count
            </h2>
            <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">
              The cryptography has to be strong enough
            </h3>
            <p className="text-[#5a6672] leading-loose text-lg">
              NIST SP 800-88 Rev. 2 leans on ISO/IEC 27040 here, and it's specific: the encryption algorithm needs at least 128-bit security strength, and the entropy behind the random number source has to match or exceed the key length. In practice, AES-256 or AES-128 in XTS mode is what you'll see in most modern SEDs, and that's the bar to check for.
            </p>

            <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">
              CE only sanitizes what was encrypted from the start
            </h3>
            <p className="text-[#5a6672] leading-loose text-lg">
              This is the part people miss. CE erases keys — it has no effect on sensitive data that was ever stored in plaintext on the same media. If plaintext data touched that drive at any point, CE alone doesn't sanitize it. You'd need overwriting for that portion, full stop.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Where CE runs into real limits
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-4">
              A few conditions genuinely undercut CE's assurance, and NIST is direct about naming them:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg">
              <li>
                <strong>Escrowed or backed-up keys.</strong> If the encryption key exists somewhere outside the drive — a key management system, a backup — destroying the on-drive copy doesn't stop someone from recovering data through that other copy. CE only protects what it can actually reach.
              </li>
              <li>
                <strong>Long-horizon confidentiality.</strong> For data that needs to stay confidential for decades, CE gets shakier. Future computing advances — quantum computing specifically — could eventually weaken the cryptographic assumptions CE relies on today. That's a real enough concern that NIST classifies CE as Purge, not Destroy.
              </li>
              <li>
                <strong>The Purge-not-Destroy distinction exists for a reason.</strong> Given enough future computational power or an undiscovered cryptographic weakness, key recovery isn't theoretically impossible. That's the honest caveat, and it's why CE alone doesn't clear the bar for the highest security tier.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              Cryptographic erase vs. overwrite
            </h2>
            <div className="overflow-hidden rounded-none border border-[#d0d5dc] mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4fbf8]">
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Criteria</th>
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Cryptographic erase</th>
                    <th className="px-6 py-4 font-semibold text-[#0a2e1e] border-b border-[#d0d5dc]">Overwrite (Clear/Purge)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Speed</td>
                    <td className="px-6 py-4 text-[#5a6672]">Seconds — key destruction only</td>
                    <td className="px-6 py-4 text-[#5a6672]">Hours — full drive surface</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">NIST classification</td>
                    <td className="px-6 py-4 text-[#5a6672]">Purge</td>
                    <td className="px-6 py-4 text-[#5a6672]">Clear (1-pass) or Purge (multi-pass)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Device requirement</td>
                    <td className="px-6 py-4 text-[#5a6672]">Self-encrypting drive (SED) required</td>
                    <td className="px-6 py-4 text-[#5a6672]">Works on any storage device</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Data residue</td>
                    <td className="px-6 py-4 text-[#5a6672]">Ciphertext remains, unreadable</td>
                    <td className="px-6 py-4 text-[#5a6672]">All data replaced with pattern</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Quantum risk</td>
                    <td className="px-6 py-4 text-[#5a6672]">Future quantum attacks may eventually break the encryption</td>
                    <td className="px-6 py-4 text-[#5a6672]">None — data is physically overwritten</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#0a2e1e]">Best for</td>
                    <td className="px-6 py-4 text-[#5a6672]">High-volume SSD environments, time-critical jobs</td>
                    <td className="px-6 py-4 text-[#5a6672]">Mixed media, cases needing highest assurance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[#5a6672] leading-loose text-lg">
              <strong>Where I land on this:</strong> if the drive is genuinely encrypted from day one and you're not dealing with escrow or a 25-year confidentiality window, CE is a perfectly legitimate Purge method — fast, verifiable, NIST-recognized. The moment either of those conditions shows up, the calculus changes.
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mt-4">
              For the highest assurance tier, NIST recommends combining CE with a follow-up overwrite pass. D-Secure supports this "CE + Overwrite" combined workflow for organizations handling classified or heavily regulated data where a single method isn't enough.
            </p>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              When CE is not the right call
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg">
              <li>
                <strong>Non-encrypted drives.</strong> Standard HDDs and SSDs without hardware encryption simply can't use CE — there's no key to destroy. Overwrite is your only option here.
              </li>
              <li>
                <strong>Key escrow scenarios.</strong> If keys were ever backed up or escrowed externally, killing the on-drive key doesn't guarantee the data can't be recovered from that backup.
              </li>
              <li>
                <strong>Classified data.</strong> SECRET and TOP SECRET material typically needs physical destruction, or at minimum a CE + overwrite combination, for the assurance level required.
              </li>
              <li>
                <strong>Post-quantum concerns.</strong> For data with a 25-plus year confidentiality requirement, overwrite is genuinely the safer default given where quantum computing is headed.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              How D-Secure implements this
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg">
              <li><strong>NIST-compliant CE</strong> — implemented per NIST SP 800-88 Rev. 2, with full Purge-level classification for self-encrypting drives</li>
              <li><strong>Multi-level post-CE verification</strong> — confirms keys are gone, the drive's crypto state has reset, and data reads back as random ciphertext</li>
              <li><strong>Broad SED/NVMe coverage</strong> — TCG Opal, TCG Enterprise, IEEE 1667, and NVMe-native self-encrypting drives</li>
              <li><strong>Audit-ready certificates</strong> — drive serial, method, verification result, operator, and timestamp, generated automatically for every CE operation</li>
            </ul>

            <div className="my-8">
              <Link to="/products/drive-eraser" className="inline-flex items-center font-semibold text-[#0e7c66] hover:text-[#0a2e1e] transition-colors border-b-2 border-[#0e7c66] hover:border-[#0a2e1e] pb-1">
                Read: D-Secure Drive Eraser overview
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-[#0a2e1e] mt-12 mb-6">
              The takeaway
            </h2>
            <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-10 space-y-6">
              <p className="text-[#5a6672] leading-loose text-lg">
                CE is fast, it's NIST-recognized, and for most enterprise SSD and NVMe workloads it's genuinely the right call — seconds instead of hours, with a defensible audit trail behind it. But it's a Purge method, not a Destroy method, for a specific reason: it depends entirely on the key actually being gone and unrecoverable elsewhere. Know your device (is it really an SED?), know your data history (was anything ever stored in plaintext?), and know your confidentiality horizon before you rely on CE alone.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg font-medium">
                Not sure whether your fleet is ready for CE, or whether you need CE + overwrite? <Link to="/contact" className="text-[#0e7c66] hover:underline">Talk to D-Secure's team</Link> — we'll help you map the right method to the right drives.
              </p>
            </div>

            <div className="mt-12">
              <FAQSection faqs={faqs} className="px-0 py-0 bg-transparent" title="Frequently Asked Questions" />
            </div>

            <div className="border-t border-[#d0d5dc] pt-8 mt-12 text-[#5a6672]">
              <p className="mb-4">
                <strong>About the author:</strong> Prashant Saini writes on data sanitization compliance and ITAD standards for D-Secure Technologies, covering NIST 800-88, IEEE 2883, and global data privacy regulation.
              </p>
              <p className="font-bold text-[#0a2e1e] mb-2">Related reading:</p>
              <ul className="space-y-2">
                <li><Link to="/blog/nist-800-88-rev2-update-2026" className="text-[#0e7c66] hover:underline">NIST 800-88 Rev. 2 explained — what changed and how to stay compliant</Link></li>
                <li><Link to="/blog/dod-vs-ieee" className="text-[#0e7c66] hover:underline">DoD 5220.22-M vs. IEEE 2883-2022 — which standard should you use</Link></li>
                <li><Link to="/blog/cryptographic-erase" className="text-[#0e7c66] hover:underline">Self-encrypting drives and TCG Opal — a practical overview</Link></li>
              </ul>
            </div>

            {/* Add schema to head dynamically */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026') }}
            />
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard
        blogId="cryptographic-erase"
        blogTitle="Cryptographic erase, explained: what NIST SP 800-88 actually requires"
        category="Technical Guide"
        tag="Technical"
        faqs={[]}
      />
    </div>
  );
};

export default CryptographicEraseBlog;

