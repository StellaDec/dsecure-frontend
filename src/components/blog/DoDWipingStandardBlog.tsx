import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DoDWipingStandardBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead
          seo={getBlogSEO({
            title: "DoD Data Wiping Standard Explained",
            excerpt:
              "Complete guide to DoD 5220.22-M data wiping standard and its applications.",
            slug: "dod-wiping-standard",
            author: "D-Secure Editorial Team",
            publishDate: "March 16, 2025",
            keywords: "DoD 5220.22-M, wiping standard, military",
            category: "Technical Guide",
            tag: "Standards",
          })}
        />

        {/* Hero Section - Full Width */}
        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Data Erasure Standards
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                DoD 5220.22-M: The Secure Wiping Standard Explained
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                Master the DoD 5220.22-M algorithm — a proven, credible, and
                widely recognized secure wiping method used across industries
                for permanent data destruction from hard disk drives.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Main Content - Full Width */}
        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-[#5a6672] leading-loose text-xl">
                  Media sanitization — commonly referred to as{" "}
                  <strong className="text-[#0a2e1e]">
                    data sanitization
                  </strong>{" "}
                  — is crucial for organizations to prevent leakage of
                  confidential and sensitive data from storage media including
                  hard drives, USB flash storage, and servers. Failure to
                  properly wipe data when releasing storage hardware from
                  custody can expose company sensitive information and lead to
                  devastating data breaches with millions in penalties.
                </p>
                <p className="text-[#5a6672] leading-loose text-lg">
                  Data destruction standards like DoD 5220.22-M by NISPOM
                  outline specific processes for performing data wipes on hard
                  drives, SSDs, and other storage media. These standards define
                  the number of overwrite passes, overwriting patterns, and
                  verification methods required to erase data beyond any
                  possibility of recovery before devices are redeployed,
                  recycled, resold, or discarded.
                </p>
              </div>
            </div>
          </Reveal>

          {/* What is DoD Standard */}
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                What is the DoD 5220.22-M Standard?
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg">
                DoD 5220.22-M, also known as the National Industrial Security
                Program Operating Manual (NISPOM), is a media sanitization
                standard established by the U.S. Department of Defense. It
                outlines regulatory measures and normative practices for
                sanitizing information systems and storage media used to store
                classified information.
              </p>

              <div className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-4">
                  Core Methodology
                </h3>
                <p className="text-[#5a6672] text-lg leading-loose">
                  The standard recommends overwriting all addressable memory
                  locations with a character, its complement, then a random
                  character, followed by verification to clear and sanitize
                  information on the storage media completely.
                </p>
              </div>
            </div>
          </Reveal>

          {/* The Wiping Process */}
          <Reveal>
            <div className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                The DoD 5220.22-M <Link to="/products/drive-eraser" className="text-white hover:underline font-medium">Data Wiping</Link> Process
              </h2>

              <p className="leading-loose text-lg mb-6">
                The Department of Defense 5220.22-M uses three overwrite passes
                (0s, 1s, Random) with a 100% verification pass. In 2001, the DoD
                5220.22-M ECE method — a 7-pass version — was published, running
                the standard twice with an additional pass between. However, the
                three-pass method remains the standard implementation.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-none p-6">
                  <div className="text-3xl font-bold mb-3">Pass 1</div>
                  <h3 className="font-bold text-lg mb-2">Write Zeros</h3>
                  <p className="text-white/90 text-lg leading-loose">
                    Writes a zero to all addressable locations and verifies the
                    write was successful.
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <div className="text-3xl font-bold mb-3">Pass 2</div>
                  <h3 className="font-bold text-lg mb-2">Write Ones</h3>
                  <p className="text-white/90 text-lg leading-loose">
                    Writes a one to all addressable locations and verifies the
                    write was successful.
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <div className="text-3xl font-bold mb-3">Pass 3</div>
                  <h3 className="font-bold text-lg mb-2">Random + Verify</h3>
                  <p className="text-white/90 text-lg leading-loose">
                    Writes a random character to all locations and performs
                    final verification.
                  </p>
                </div>
              </div>

              <p className="leading-loose text-lg mt-6">
                Some variations use different characters, complements, and
                verification frequencies. For example, an altered version uses
                the number 97 instead of a random character for the final pass.
              </p>
            </div>
          </Reveal>

          {/* Clearing and Sanitization Matrix */}
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Clearing and Sanitization Matrix (CSM)
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg">
                The DoD 5220.22-M specifies different 'clear' and 'sanitize'
                methods for various types of storage media. Understanding these
                recommendations helps organizations choose the appropriate
                approach for their specific hardware.
              </p>

              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse text-lg">
                  <thead>
                    <tr className="bg-[#f4fbf8]">
                      <th className="border border-[#d0d5dc] p-4 text-left font-bold text-[#0a2e1e]">
                        Method
                      </th>
                      <th className="border border-[#d0d5dc] p-4 text-left font-bold text-[#0a2e1e]">
                        Description
                      </th>
                      <th className="border border-[#d0d5dc] p-4 text-left font-bold text-[#0a2e1e]">
                        Applicable Media
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#d0d5dc] p-4 font-medium">
                        Destroy
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        Disintegrate, incinerate, pulverize, shred, or melt
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        All media types
                      </td>
                    </tr>
                    <tr className="bg-[#f4fbf8]">
                      <td className="border border-[#d0d5dc] p-4 font-medium">
                        Overwrite
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        Overwrite all addressable locations with pattern +
                        complement + random, verify
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        Magnetic media
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#d0d5dc] p-4 font-medium">
                        Full Chip Erase
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        Execute per manufacturer's datasheets
                      </td>
                      <td className="border border-[#d0d5dc] p-4">
                        EEPROM, EAPROM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Advantages */}
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Advantages of the DoD 5220.22-M Algorithm
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg">
                The DoD 5220.22-M algorithm has long been recognized as a
                reliable and secure method for erasing data from traditional
                hard disk drives. Known for its credibility and widespread use
                across industries, it remains one of the most frequently
                referenced data-wiping standards due to its established legacy.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Efficient Processing
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    The three-pass overwrite process provides comprehensive,
                    efficient wiping compared to other methods like the 35-pass
                    Gutmann standard — particularly important when erasing large
                    inventories of drives simultaneously.
                  </p>
                </div>
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Verification Assurance
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    The final verification pass adds critical assurance to the
                    data erasure process, confirming that all storage locations
                    have been properly overwritten.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Important Considerations */}
          <Reveal>
            <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-10 mt-10 space-y-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Important Considerations Before Using DoD 5220.22-M
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Legacy Standard Limitations
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    DoD 5220.22-M is a legacy standard primarily designed for
                    magnetic drives. Multiple overwrite passes are no longer
                    recommended by <Link to="/compliance/nist-800-88" className="text-[#0a2e1e] hover:underline font-medium">NIST 800-88</Link> or IEEE 2883:2022 for modern
                    media.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Modern Storage Incompatibility
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    The standard does not support wiping of flash memory-based
                    storage such as solid-state drives (SSDs), hybrid drives, or
                    other modern storage technologies. For these devices,
                    standards such as NIST SP 800-88 and IEEE 2883:2022 are more
                    suitable.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Updated Guidance
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    Since 2014, the NISPOM guideline has recommended NIST SP
                    800-88 media sanitization guidelines as the primary guidance
                    document. The Department of Defense no longer references DoD
                    5220.22 as the sole method for secure HDD wiping.
                  </p>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-2">
                  <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">
                    Certification Clarity
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose">
                    There is no official "DoD Certificate of Destruction."
                    However, DoD-compliant <Link to="/products/drive-eraser" className="text-[#0a2e1e] hover:underline font-medium">data wiping</Link> software can generate
                    certificates of erasure serving as auditable proof of data
                    destruction.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* How to Perform */}
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                How to Perform DoD Wiping with D-Secure
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg">
                "DoD wipe" means overwriting all addressable locations on a hard
                drive as per steps specified in the DoD 5220.22-M algorithm.
                D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> performs wiping of drives using the DoD
                5220.22-M standard along with many other international
                standards.
              </p>

              <div className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-4">
                  D-Secure Capabilities
                </h3>
                <ul className="space-y-3 text-[#5a6672] text-lg">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                    Select specific algorithm to overwrite storage locations per
                    DoD 5220.22 patterns and passes
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                    Generates tamper-proof certificate and report of erasure for
                    regulatory compliance
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                    Supports both 3-pass and 7-pass DoD methods
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2.5"></span>
                    Also includes <Link to="/compliance/nist-800-88" className="text-[#0a2e1e] hover:underline font-medium">NIST 800-88</Link>, IEEE 2883, and 20+ other
                    international standards
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Compliance Usage */}
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                DoD Standard for Compliance
              </h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                For organizations handling sensitive or regulated information,
                data disposal isn't just a routine task — it's a critical step
                in protecting both the business and customers. DoD wiping
                provides a trusted and verified method for data erasure, meeting
                one of the most stringent data security standards worldwide.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg">
                Companies in sectors like healthcare, finance, and government
                rely on DoD-compliant wiping solutions to ensure retired or
                repurposed devices no longer contain recoverable data. This
                helps mitigate risks, protect brand reputation, and maintain
                regulatory compliance.
              </p>
            </div>
          </Reveal>
        </section>
      <BlogFooterStandard 
        blogId="dod-wiping-standard" 
        blogTitle="DoD Data Wiping Standard Explained" category="Technical Guide" tag="Standards" 
      />
    </div>
  );
};

export default DoDWipingStandardBlog;
