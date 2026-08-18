import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ClipboardIcon,
  ArrowRightIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import BlogFooterStandard from "./BlogFooterStandard";

const WipeSSDFromBIOSGuide: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it safe to wipe an SSD from the BIOS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While BIOS Secure Erase can quickly remove data, it is not recommended for enterprise use because it doesn't generate verifiable erasure reports and may miss hidden areas like HPA or DCO."
        }
      },
      {
        "@type": "Question",
        "name": "Does BIOS Secure Erase guarantee NIST 800-88 compliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Without a tamper-evident certificate of erasure, BIOS Secure Erase cannot satisfy audit requirements for NIST 800-88, HIPAA, or GDPR."
        }
      },
      {
        "@type": "Question",
        "name": "What is the alternative to BIOS SSD wiping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional data erasure software like D-Secure should be used. It leverages native firmware commands while producing the mandatory cryptographic certificates required for compliance."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Wipe an SSD from BIOS",
    "description": "A step-by-step technical guide to using the Secure Erase feature found in most UEFI BIOS systems.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Access the BIOS/UEFI",
        "text": "Restart your computer and repeatedly press the designated BIOS key (typically F2, F12, DEL, or ESC) during the boot logo screen."
      },
      {
        "@type": "HowToStep",
        "name": "Locate the Security or Tool Menu",
        "text": "Navigate through the BIOS interface to find the Security, Advanced, or Tools tab depending on your motherboard manufacturer."
      },
      {
        "@type": "HowToStep",
        "name": "Select Secure Erase",
        "text": "Find the option labeled 'Secure Erase', 'Data Wipe', or 'Disk Sanitizer' and select the target SSD you wish to wipe."
      },
      {
        "@type": "HowToStep",
        "name": "Confirm and Erase",
        "text": "Acknowledge the warning prompts that all data will be permanently destroyed. The process usually takes a few seconds for modern SSDs."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        seo={getSEOForPage("blog-wipe-ssd-from-bios")} 
        structuredData={[faqSchema, howToSchema]}
      />

      {/* Hero */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Technical Guide
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              <span className="text-[#0e7c66]">
                How to Wipe SSD from BIOS
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
              Learn how Secure Erase works in BIOS, its limitations, and when
              organizations should use professional data erasure software for
              compliance and audit readiness.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            {/* Intro */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                1. Why SSD Data Erasure Requires Special Attention
              </h2>

              <p className="text-[#5a6672] leading-relaxed text-lg">
                Solid State Drives (SSDs) are widely used in laptops, desktops,
                servers, and Mac devices due to their speed, durability, and
                reliability. As a result, SSDs often store large volumes of
                sensitive and confidential data.
              </p>

              <p className="text-[#5a6672] leading-relaxed">
                Before reallocating, reselling, donating, or recycling devices,
                organizations commonly rely on the Secure Erase feature
                available in the system BIOS. While convenient, this approach
                has important limitations that businesses must understand.
              </p>
            </div>

            {/* Secure Erase BIOS */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                2. Using the Secure Erase Feature in BIOS
              </h2>

              <p className="text-[#5a6672] leading-relaxed">
                Secure Erase is an inbuilt functionality available in UEFI BIOS
                that allows users to erase internal storage devices. Depending
                on the system manufacturer, the feature may appear under
                different names and menu locations.
              </p>

              <p className="text-[#5a6672] leading-relaxed">
                Although Secure Erase can remove user data from SSDs, it does
                not generate erasure reports and may not address hidden areas
                such as HPA (Host Protected Area) and DCO (Device Configuration
                Overlay).
              </p>
            </div>

            {/* BIOS Vendor Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0a2e1e]">
                Secure Erase Options by Manufacturer (BIOS)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#f4fbf8]">
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        Manufacturer
                      </th>
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        BIOS Menu Name
                      </th>
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        Notes / Limitations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3">Lenovo</td>
                      <td className="border border-slate-300 p-3">
                        Security Erase HDD Data
                      </td>
                      <td className="border border-slate-300 p-3">
                        SSD password must be set to enable Secure Erase
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-slate-300 p-3">HP</td>
                      <td className="border border-slate-300 p-3">
                        Secure Erase / Disk Sanitizer
                      </td>
                      <td className="border border-slate-300 p-3">
                        Limited reporting, internal drives only
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Dell</td>
                      <td className="border border-slate-300 p-3">
                        Data Wipe / Secure Erase
                      </td>
                      <td className="border border-slate-300 p-3">
                        No audit proof generated
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-slate-300 p-3">ASUS</td>
                      <td className="border border-slate-300 p-3">
                        Secure Erase Tool
                      </td>
                      <td className="border border-slate-300 p-3">
                        Feature availability varies by model
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Acer</td>
                      <td className="border border-slate-300 p-3">
                        HDD/SSD Secure Erase
                      </td>
                      <td className="border border-slate-300 p-3">
                        Not suitable for bulk erasure
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Limitations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                3. Limitations of BIOS-Based Secure Erase
              </h2>

              <ul className="space-y-3 text-[#5a6672]">
                <li>• No erasure reports or certificates are generated</li>
                <li>• Hidden SSD areas may not be wiped</li>
                <li>• Cannot wipe multiple drives simultaneously</li>
                <li>• Suitable mainly for individual or personal use</li>
              </ul>
            </div>

            {/* Professional Erasure */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                4. Erasing SSDs Using Professional <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Data Wiping</Link> Software
              </h2>

              <p className="text-[#5a6672] leading-relaxed">
                Professional data erasure software like D-Secure provides a
                scalable and compliant alternative to BIOS-based Secure Erase.
                It supports a wide range of SSD types, including NVMe, SAS, SED,
                and enterprise-grade drives.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0a2e1e]">
                Secure Erase (BIOS) vs D-Secure Data Erasure
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#f4fbf8]">
                      <th className="border border-slate-300 p-3">Parameter</th>
                      <th className="border border-slate-300 p-3">
                        Secure Erase (BIOS)
                      </th>
                      <th className="border border-slate-300 p-3">
                        D-Secure Data Erasure
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Hidden Areas (HPA/DCO)</td>
                      <td className="border p-3">Not Guaranteed</td>
                      <td className="border p-3">Fully Erased</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border p-3">Erasure Standards</td>
                      <td className="border p-3">Limited</td>
                      <td className="border p-3"><Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium"><Link to="/compliance/nist-800-88" className="text-[#0e7c66] hover:underline font-medium">NIST 800-88</Link></Link>, DoD, and more</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Erasure Reports</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Tamper-evident certificates</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border p-3">Scalability</td>
                      <td className="border p-3">Single device</td>
                      <td className="border p-3">
                        Bulk & network-based wiping
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-3">Compliance</td>
                      <td className="border p-3">Not audit-ready</td>
                      <td className="border p-3">Audit & compliance ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

      </section>

      <BlogFooterStandard 
        blogId="wipe-ssd-from-bios" 
        blogTitle="How to Wipe SSD from BIOS: A Step-by-Step Guide" 
      />
    </div>
  );
};

export default WipeSSDFromBIOSGuide;
