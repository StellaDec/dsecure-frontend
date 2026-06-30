import { useEffect, useState } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";

export default function GlossaryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const terms = [
    {
      term: "Data Sanitization",
      definition: "The process of deliberately, permanently, and irreversibly removing or destroying data stored on a memory device to make it unrecoverable.",
      category: "Core"
    },
    {
      term: "NIST 800-88",
      definition: "The National Institute of Standards and Technology Guidelines for Media Sanitization. Includes techniques: Clear, Purge, and Destroy.",
      category: "Standards"
    },
    {
      term: "Lifecycle Governance",
      definition: "A programmatic approach to managing data security from asset discovery through verified destruction and auditable Reporting.",
      category: "D-Secure Proprietary"
    },
    {
      term: "Cryptographic Erase",
      definition: "A sanitization method that leverages the encryption of target data by sanitizing the target data's encryption key.",
      category: "Technical"
    },
    {
      term: "Dark Data",
      definition: "Information assets organizations collect, process, and store during regular business activities, but generally fail to use for other purposes or properly decommission.",
      category: "Security Risk"
    },
    {
      term: "ADISA",
      definition: "Asset Disposal and Information Security Alliance. An industry body that audits and certifies ITAD services and sanitization software.",
      category: "Standards"
    },
    {
      term: "Article 17 (GDPR)",
      definition: "The 'Right to Erasure' (Right to be Forgotten) requiring data controllers to erase personal data without undue delay.",
      category: "Compliance"
    },
    {
      term: "Tamper-Proof Audit Log",
      definition: "A system-generated record of sanitization events that cannot be modified or deleted, ensuring the integrity of compliance evidence.",
      category: "Technical"
    },
    {
      term: "ATA Secure Erase",
      definition: "A firmware-level command used to sanitize all user-addressable storage areas on an ATA-compatible drive (HDD or SSD).",
      category: "Technical"
    },
    {
      term: "Bad Sector",
      definition: "A section of a storage medium that has become physically damaged or is unable to store data reliably, potentially harboring residual data fragments.",
      category: "Hardware"
    },
    {
      term: "BSI (German Federal Office)",
      definition: "The German Federal Office for Information Security, which sets rigorous standards for data security and information technology within the EU.",
      category: "Standards"
    },
    {
      term: "Certificate of Destruction (CoD)",
      definition: "A formal, digitally signed document proving that data was sanitized according to specific standards on a specific device at a specific time.",
      category: "Compliance"
    },
    {
      term: "Chain of Custody",
      definition: "The chronological documentation showing the seizure, custody, control, transfer, analysis, and disposition of physical assets containing data.",
      category: "Lifecycle"
    },
    {
      term: "Circular Economy",
      definition: "An economic system aimed at eliminating waste and the continual use of resources, specifically by repurposing hardware instead of shredding it.",
      category: "ESG"
    },
    {
      term: "DCO (Device Configuration Overlay)",
      definition: "A hidden area on a drive that allows vendors to specify a drive's capacity. D-Secure identifies and sanitizes this area to ensure zero data leakage.",
      category: "Hardware"
    },
    {
      term: "De-gaussing",
      definition: "The process of reducing or eliminating a remnant magnetic field by applying an opposite magnetic field. Primarily used for magnetic tapes and older HDDs.",
      category: "Technical"
    },
    {
      term: "DoD 5220.22-M",
      definition: "A 3-pass overwrite standard originally developed by the U.S. Department of Defense for sanitizing magnetic media.",
      category: "Standards"
    },
    {
      term: "E-Waste (Electronic Waste)",
      definition: "Discarded electrical or electronic devices. D-Secure's erasure mission directly reduces e-waste by enabling the safe reuse of hardware.",
      category: "ESG"
    },
    {
      term: "ESG (Environmental, Social, and Governance)",
      definition: "A set of standards for a company's operations that socially conscious investors use to screen potential investments.",
      category: "ESG"
    },
    {
      term: "HPA (Host Protected Area)",
      definition: "An area on a hard drive that is typically not visible to an operating system. D-Secure unlocks and sanitizes the HPA to ensure complete data removal.",
      category: "Hardware"
    },
    {
      term: "IEEE 2883-2022",
      definition: "The first global standard specifically focused on the sanitization of storage media, developed by the IEEE Computer Society.",
      category: "Standards"
    },
    {
      term: "ITAD (IT Asset Disposition)",
      definition: "The practice of disposing of IT assets in a safe and ecologically responsible manner, including data destruction and hardware recycling.",
      category: "Industry"
    },
    {
      term: "LBA (Logical Block Addressing)",
      definition: "A common scheme used for specifying the location of blocks of data stored on computer storage devices.",
      category: "Technical"
    },
    {
      term: "MEK (Media Encryption Key)",
      definition: "The key used to encrypt the actual data on a Self-Encrypting Drive (SED). Sanitizing this key renders the data unrecoverable.",
      category: "Technical"
    },
    {
      term: "NVMe Sanitize",
      definition: "A specialized command set for NVMe drives that ensures all user data, including that in caches and hidden areas, is completely removed.",
      category: "Technical"
    },
    {
      term: "Overwrite",
      definition: "A sanitization method that replaces existing data with new data (typically zeros or random patterns) to prevent data recovery.",
      category: "Core"
    },
    {
      term: "P-List (Primary Defect List)",
      definition: "A list of factory-identified bad sectors on a drive. D-Secure cross-references this list during hardware auditing.",
      category: "Hardware"
    },
    {
      term: "G-List (Grown Defect List)",
      definition: "A list of sectors that have failed after the drive left the factory. D-Secure probes the G-List to identify hidden data risks.",
      category: "Hardware"
    },
    {
      term: "PCI DSS",
      definition: "Payment Card Industry Data Security Standard. A set of security standards designed to ensure all companies that process credit card information maintain a secure environment.",
      category: "Compliance"
    },
    {
      term: "PXE (Preboot eXecution Environment)",
      definition: "A protocol that allows a computer to boot from a network interface, used by D-Secure for mass data center sanitization.",
      category: "Technical"
    },
    {
      term: "SSD (Solid State Drive)",
      definition: "A storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory.",
      category: "Hardware"
    },
    {
      term: "TRIM Command",
      definition: "An ATA command that allows an operating system to inform an SSD which blocks of data are no longer considered in use.",
      category: "Technical"
    },
    {
      term: "WWN (World Wide Name)",
      definition: "A unique identifier used in storage technologies like Fibre Channel and SAS to identify a specific hardware target.",
      category: "Technical"
    },
    {
      term: "Zero-Fill",
      definition: "A simple sanitization method that replaces all addressable data on a drive with zeros.",
      category: "Technical"
    },
    {
      term: "Sanitize Device",
      definition: "An ATA/ACS command that performs a hardware-level wipe of all blocks on a drive, including those not currently mapped to LBAs.",
      category: "Technical"
    },
    {
      term: "Deduplication",
      definition: "A specialized data compression technique for eliminating duplicate copies of repeating data. D-Secure sanitizes deduplicated storage arrays at the logical level.",
      category: "Technical"
    },
    {
      term: "Forensic Recovery",
      definition: "The process of retrieving data from a storage medium using specialized software or hardware after the data has been 'deleted'.",
      category: "Security Risk"
    },
    {
      term: "HIPAA",
      definition: "Health Insurance Portability and Accountability Act. U.S. legislation that provides data privacy and security provisions for safeguarding medical information.",
      category: "Compliance"
    },
    {
      term: "LUN (Logical Unit Number)",
      definition: "A unique identifier used to designate an individual or collection of physical or virtual storage devices addressed by a network protocol.",
      category: "Enterprise"
    },
    {
      term: "NAND Flash",
      definition: "A type of non-volatile storage technology that does not require power to retain data. Used in SSDs and mobile devices.",
      category: "Hardware"
    },
    {
      term: "Over-provisioning",
      definition: "The inclusion of extra storage capacity in an SSD that is not visible to the user. D-Secure ensures data in these areas is sanitized.",
      category: "Hardware"
    },
    {
      term: "Purge",
      definition: "A sanitization action that renders data recovery infeasible even using advanced laboratory techniques. (NIST 800-88 definition).",
      category: "Core"
    },
    {
      term: "Reallocated Sector",
      definition: "A sector that has been moved by the drive controller due to a failure. These sectors are a primary target for D-Secure auditing.",
      category: "Hardware"
    },
    {
      term: "SED (Self-Encrypting Drive)",
      definition: "A hard drive or SSD with a circuit built into the controller chip that encrypts all data written to the media.",
      category: "Hardware"
    },
    {
      term: "SIEM (Security Information and Event Management)",
      definition: "A field within computer security where software products and services combine security information and event management.",
      category: "Enterprise"
    },
    {
      term: "SOC 2",
      definition: "A voluntary compliance standard for service organizations, developed by the American Institute of CPAs (AICPA).",
      category: "Compliance"
    },
    {
      term: "Write-Once Media",
      definition: "Storage media that can only be written to once and never erased. D-Secure identifies these to prevent wasted sanitization cycles.",
      category: "Technical"
    },
    {
      term: "Wear Leveling",
      definition: "A technique used by SSD controllers to prolong the life of the flash memory by distributing writes evenly across all blocks.",
      category: "Technical"
    },
    {
      term: "Gutmann Method",
      definition: "An algorithm for securely erasing the contents of magnetic media, typically using a 35-pass overwrite sequence.",
      category: "Standards"
    },
    {
      term: "HDP (Hard Disk Password)",
      definition: "A hardware-level password that locks access to a drive. D-Secure can bypass or reset these in managed enterprise environments.",
      category: "Security"
    }
  ];

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("glossary")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Data Security & Sanitization <span className="text-brand">Glossary</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              A comprehensive directory of technical terms, industry standards, and regulatory definitions 
              governing the data lifecycle.
            </p>

            {/* Search Input */}
            <div className="relative mb-12">
              <input
                type="text"
                placeholder="Search terms or definitions..."
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            {/* Glossary List */}
            <div className="space-y-6">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-brand/30 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {item.term}
                      </h2>
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.definition}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                   <p className="text-slate-400">No terms matching your search were found.</p>
                </div>
              )}
            </div>

            {/* Schema Note for AI */}
            <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white">
               <h3 className="text-xl font-bold mb-4">Technical Authority Notice</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 D-Secure maintains this glossary to ensure semantic consistency across enterprise ITAD 
                 and cybersecurity domains. These definitions are aligned with NIST SP 800-88 Rev. 1 
                 and ISO/IEC 27040:2015.
               </p>
               <div className="flex items-center text-sm text-brand font-medium">
                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                 Latest Revision: Feb 2026
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
