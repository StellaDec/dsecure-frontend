import React, { useEffect, useState } from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ChevronRight, X, ExternalLink, Check } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { blogFaqs } from "@/data/blogFaqs";

const IEEE2883ComplianceBlog: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // गैलरी इमेजेज - रिपोर्ट्स के लिए
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1778239910/dwzvvyiiyhlntaw9cheh.png",
      alt: "Drive Eraser Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1778233927/r3mpk0vohwxanxppbchv.png",
      alt: "File Eraser Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1778242571/fjqwejrbgdzvvetpj7dy.png",
      alt: "Hardware Diagnostic Report",
    },
  ];

  // पिछली इमेज पर जाएं
  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  };

  // अगली इमेज पर जाएं
  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  };

  // कीबोर्ड नेविगेशन - Arrow keys और Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    // पेज माउंट होने पर स्क्रॉल enable करें
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  return (
    <div className="min-h-screen w-full relative z-10 overflow-y-visible bg-white">
      <SEOHead
        seo={getBlogSEO({
          title: "IEEE 2883-2022 Data Sanitization: How D-Secure Ensures Full Compliance",
          excerpt: "Learn how IEEE 2883-2022 defines data sanitization standards and how D-Secure's erasure tools ensure full compliance for enterprises and ITADs in India.",
          slug: "ieee-2883-2022-data-sanitization",
          author: "D-Secure Editorial Team",
          publishDate: "May 08, 2026",
          keywords: "IEEE 2883-2022 Data Sanitization standard overview, IEEE 2883-2022 NVMe Erasure, IEEE 2883-2022 Clear Purge Destruct, IEEE 2883-2022 DPDP Compliance India, IEEE 2883-2022 ITAD India, IEEE 2883-2022 key features and requirements",
          category: "Technical Guide",
          tag: "Standards",
        })}
      />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Data Sanitization Standards
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
              How D-Secure Ensures{" "}
              <span className="text-[#0e7c66]">IEEE 2883-2022</span>{" "}
              Compliant Data Sanitization
            </h1>
            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
              IEEE 2883-2022 is the global benchmark for storage sanitization — covering HDDs, SSDs, NVMe, flash, and mobile devices. D-Secure implements every technique the standard requires.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Intro Summary */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
              Understanding IEEE 2883-2022
            </h2>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              <a
                href="https://standards.ieee.org/ieee/2883/10581/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0a2e1e] hover:text-[#0e7c66] transition-colors"
              >
                IEEE 2883-2022
              </a>{" "}
              — formally titled <em>"Standard for Sanitizing Storage"</em> — was published by the Institute of Electrical and Electronics Engineers in 2022. It defines data sanitization as{" "}
              <strong>"rendering access to target data on storage media infeasible for a given level of effort."</strong>
            </p>
            <p className="text-[#5a6672] leading-loose text-lg mb-6">
              The standard was created as a direct evolution of{" "}
              <Link to="/blog/nist-800-88-media-sanitization-guide" className="text-[#0e7c66] hover:underline font-medium">
                NIST SP 800-88
              </Link>
              , but goes further: it provides precise, media-specific technical guidance for HDDs, SSDs, NVMe drives, flash storage, optical media, and smartphones. The latest revision of NIST 800-88 (2025) now explicitly references IEEE 2883-2022 for technique-level guidance — making it the de facto global authority on storage sanitization.
            </p>
            <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
              <h3 className="font-bold text-[#0a2e1e] text-xl mb-3">Why IEEE 2883-2022 Matters</h3>
              <p className="text-[#5a6672] text-lg leading-loose">
                Your organisation retired 200 laptops last quarter. The IT team ran a quick format, handed them to a recycler, and considered the job done. But were those drives actually sanitised to a defensible standard — one that would hold up under a{" "}
                <Link to="/blog/nist-800-88-compliance-india" className="text-[#0a2e1e] hover:underline font-medium">
                  DPDP audit
                </Link>
                , a healthcare compliance check, or an ITAD client's due diligence? IEEE 2883-2022 answers that question definitively. Tools like{" "}
                <Link to="/products/drive-eraser" className="text-[#0a2e1e] hover:underline font-bold">D-Secure Drive Eraser</Link> and {" "}
                <Link to="/products/file-eraser" className="text-[#0a2e1e] hover:underline font-bold">File Eraser</Link> are built from the ground up to ensure 100% compliance with these standards.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Main Content Grid */}
      <section className="container-app py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article */}
          <div className="lg:col-span-8 space-y-12">

            {/* Three Methods */}
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  The Three Sanitization Methods: Clear, Purge, and Destruct
                </h2>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  IEEE 2883-2022 organises all sanitization into three progressive methods. Understanding them is essential to selecting the right approach for your data sensitivity level.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: "Clear",
                      color: "bg-[#f4fbf8] border-[#d0d5dc]",
                      badge: "bg-[#d4ede4] text-[#0e7c66]",
                      desc: "Logical erasure using overwriting and block erase on all addressable storage locations. Suitable for low-sensitivity data and internal asset redeployment.",
                    },
                    {
                      title: "Purge",
                      color: "bg-[#f4fbf8] border-[#d0d5dc]",
                      badge: "bg-[#d4ede4] text-[#0e7c66]",
                      desc: "Targets both addressable and non-addressable storage — including reallocated sectors. Recommended for enterprise PII, financial records, and ITAD workflows.",
                    },
                    {
                      title: "Destruct",
                      color: "bg-[#f4fbf8] border-[#d0d5dc]",
                      badge: "bg-[#d4ede4] text-[#0e7c66]",
                      desc: "Physical destruction via melting or incineration. IEEE 2883-2022 removed shredding as an approved technique. Reserved for physically damaged media only.",
                    },
                  ].map((m) => (
                    <div key={m.title} className={`rounded-none border p-6 ${m.color}`}>
                      <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-4 ${m.badge}`}>
                        {m.title}
                      </span>
                      <p className="text-[#5a6672] text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Why IEEE > Older Standards */}
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  Why IEEE 2883-2022 Supersedes Older Standards
                </h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                  Many organisations still cite{" "}
                  <Link to="/blog/nist-800-88-media-sanitization-guide" className="text-[#0e7c66] hover:underline font-medium">
                    NIST 800-88
                  </Link>{" "}
                  or DoD 5220.22-M as their compliance benchmark. Here is why IEEE 2883-2022 supersedes them for modern storage:
                </p>
                <div className="bg-white rounded-none border border-[#d0d5dc] p-6 shadow-none mb-6">
                  <ul className="space-y-4">
                    {[
                      { title: "NVMe and SSD coverage", desc: "Older standards were written for magnetic HDDs. IEEE 2883-2022 explicitly covers NVMe, SATA SSD, flash, and hybrid devices with device-specific commands." },
                      { title: "Binding technical requirements", desc: "NIST provides guidance; IEEE 2883 sets binding technical requirements, making it stronger for audit purposes." },
                      { title: "Global applicability", desc: "IEEE is a worldwide organisation. Its standards carry weight across India, the EU, the US, and APAC — critical for multinational compliance." },
                      { title: "DPDP alignment", desc: "India's Digital Personal Data Protection Act requires data to be deleted when no longer needed. IEEE 2883-level erasure provides the technical backbone for that obligation." },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-4 p-4 bg-[#f4fbf8] rounded-none border border-slate-100">
                        <span className="text-[#0a2e1e] mt-1 flex-shrink-0 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-[#0a2e1e] mb-1">{item.title}</p>
                          <p className="text-[#5a6672] text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* D-Secure Implementation */}
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  How D-Secure Implements IEEE 2883-2022
                </h2>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  D-Secure Technologies designs its erasure software to execute the specific techniques mandated by IEEE 2883-2022 — and to generate tamper-evident audit reports that prove it.
                </p>

                {/* Drive Eraser */}
                <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-4">
                    D-Secure Drive Eraser — Purge-Level Erasure for HDDs, SSDs, and NVMe
                  </h3>
                  <p className="text-[#5a6672] leading-relaxed mb-6">
                    D-Secure Drive Eraser supports the full spectrum of IEEE 2883-2022 Purge techniques:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "ATA Secure Erase (Enhanced) for SATA HDDs and SSDs — wipes all addressable and non-addressable sectors including reallocated blocks",
                      "NVMe Sanitize command — executes the native hardware-level sanitise function for NVMe drives, as specified by IEEE 2883-2022",
                      "Cryptographic Erase — for self-encrypting drives (SEDs), invalidates the media encryption key",
                      "Block Erase — supported for flash-based media via FORMAT UNIT or SANITIZE host interface commands",
                      "Post-erasure verification pass — mandatory as required by IEEE 2883-2022 for Purge operations",
                    ].map((feat) => (
                      <li key={feat} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-[#0e7c66]/20 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-[#0e7c66] rounded-full" />
                        </div>
                        <span className="text-[#5a6672] text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      to="/products/drive-eraser"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e7c66] text-white rounded-none font-semibold hover:bg-[#0e7c66] transition-colors text-sm"
                    >
                      Explore Drive Eraser <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* File Eraser */}
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6 mb-6">
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-3">
                    D-Secure File Eraser — Targeted File-Level Sanitization
                  </h3>
                  <p className="text-[#5a6672] leading-relaxed mb-4">
                    Not every data sanitization scenario involves wiping an entire drive. D-Secure File Eraser applies IEEE 2883-2022-aligned overwrite patterns to the precise storage locations occupied by selected files and their metadata — eliminating residual data risk while keeping the device fully operational.
                  </p>
                  <Link
                    to="/products/file-eraser"
                    className="inline-flex items-center gap-2 text-[#0a2e1e] font-semibold hover:underline text-sm"
                  >
                    Learn about File Eraser <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Smartphone Eraser */}
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-3">
                    D-Secure Smartphone Eraser — Mobile Sanitization for BYOD and ITAD
                  </h3>
                  <p className="text-[#5a6672] leading-relaxed mb-4">
                    IEEE 2883-2022 explicitly covers flash and mobile storage media. D-Secure Smartphone Eraser executes manufacturer-supported factory reset commands combined with cryptographic erase techniques to sanitise Android and iOS devices to IEEE 2883-2022 Purge-equivalent levels. Essential for mobile ITAD operators and corporate BYOD refresh programmes.
                  </p>
                  <Link
                    to="/products/smartphone-eraser"
                    className="inline-flex items-center gap-2 text-[#0a2e1e] font-semibold hover:underline text-sm"
                  >
                    Learn about Smartphone Eraser <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Audit Trail */}
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                  The Compliance Audit Trail: Why Signed Erasure Reports Matter
                </h2>
                <p className="text-[#5a6672] leading-relaxed mb-6">
                  IEEE 2883-2022 does not just specify <em>how</em> to erase data — it requires organisations to demonstrate <em>that</em> they did. Verification is a formal step in the standard, not optional.
                </p>
                <div className="bg-white rounded-none border border-[#d0d5dc] p-6 shadow-none mb-6">
                  <p className="text-[#5a6672] font-medium mb-4">Every D-Secure erasure operation produces a signed erasure report that captures:</p>
                  <ul className="space-y-3">
                    {[
                      "Device identifiers — serial number, model, capacity",
                      "Erasure method and technique used",
                      "IEEE 2883-2022 compliance level achieved (Clear or Purge)",
                      "Timestamp and operator details",
                      "Verification result — confirmation that sanitization was successful",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#0e7c66] mt-1 flex-shrink-0">✓</span>
                        <span className="text-[#5a6672]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[#5a6672] leading-relaxed mb-8">
                  This audit trail is the difference between saying your organisation is compliant and being able to <strong>prove it</strong> to a regulator, client, or internal auditor.
                </p>

                {/* Sample Reports */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-bold text-[#0a2e1e] mb-6">Sample Compliance Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Drive Eraser */}
                    <button onClick={() => setSelectedImageIndex(0)} className="bg-white border border-[#d0d5dc] rounded-none overflow-hidden shadow-none hover:shadow-none transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-[#f4fbf8] w-full">
                        <span className="font-semibold text-[#0a2e1e] text-sm">Drive Eraser Report</span>
                        <span className="text-xs px-2 py-0.5 bg-[#d4ede4] text-[#0a2e1e] rounded-full font-medium">IEEE Purge</span>
                      </div>
                      <div className="p-4 flex justify-center bg-[#f4fbf8] overflow-hidden relative w-full">
                        <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778239910/dwzvvyiiyhlntaw9cheh.png" alt="Drive Eraser Report" className="h-64 object-contain rounded border border-[#d0d5dc] shadow-none group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-[#0e7c66]/0 group-hover:bg-[#0e7c66]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-none">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </button>
                    {/* File Eraser */}
                    <button onClick={() => setSelectedImageIndex(1)} className="bg-white border border-[#d0d5dc] rounded-none overflow-hidden shadow-none hover:shadow-none transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-[#f4fbf8] w-full">
                        <span className="font-semibold text-[#0a2e1e] text-sm">File Eraser Report</span>
                        <span className="text-xs px-2 py-0.5 bg-[#d4ede4] text-[#0a2e1e] rounded-full font-medium">Targeted</span>
                      </div>
                      <div className="p-4 flex justify-center bg-[#f4fbf8] overflow-hidden relative w-full">
                        <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778233927/r3mpk0vohwxanxppbchv.png" alt="File Eraser Report" className="h-64 object-contain rounded border border-[#d0d5dc] shadow-none group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-[#0e7c66]/0 group-hover:bg-[#0e7c66]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-none">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </button>
                    {/* Diagnostic */}
                    <button onClick={() => setSelectedImageIndex(2)} className="bg-white border border-[#d0d5dc] rounded-none overflow-hidden shadow-none hover:shadow-none transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-[#f4fbf8] w-full">
                        <span className="font-semibold text-[#0a2e1e] text-sm">Diagnostic Report</span>
                        <span className="text-xs px-2 py-0.5 bg-[#d4ede4] text-[#0a2e1e] rounded-full font-medium">Verified</span>
                      </div>
                      <div className="p-4 flex justify-center bg-[#f4fbf8] overflow-hidden relative w-full">
                        <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778242571/fjqwejrbgdzvvetpj7dy.png" alt="Hardware Diagnostic Report" className="h-64 object-contain rounded border border-[#d0d5dc] shadow-none group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-[#0e7c66]/0 group-hover:bg-[#0e7c66]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-none">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-[#5a6672] mt-4 text-center italic">Tamper-evident reports proving successful erasure and device health.</p>
                </div>
              </div>
            </Reveal>



            {/* Conclusion + Related */}
            <Reveal>
              <div className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="text-2xl font-bold text-[#0a2e1e] mb-6">Conclusion</h3>
                <p className="text-[#5a6672] mb-8 leading-relaxed">
                  Data erasure is no longer a checkbox — it is a technical and legal obligation that demands a defensible method and documented proof. IEEE 2883-2022 defines that method. D-Secure Drive Eraser, File Eraser, and Smartphone Eraser implement it.
                </p>
                <h3 className="font-bold text-[#0a2e1e] mb-6">Related Reading:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/blog/nist-800-88-media-sanitization-guide"
                    className="group p-6 bg-white border border-[#d0d5dc] rounded-none hover:border-[#0e7c66] transition-all shadow-none"
                  >
                    <h4 className="font-bold text-[#0a2e1e] group-hover:text-[#0a2e1e] mb-2 flex items-center justify-between">
                      NIST 800-88 Complete Guide
                      <ChevronRight className="w-4 h-4" />
                    </h4>
                    <p className="text-xs text-[#5a6672]">The predecessor standard — and how IEEE 2883 supersedes it.</p>
                  </Link>
                  <Link
                    to="/blog/dod-vs-ieee"
                    className="group p-6 bg-white border border-[#d0d5dc] rounded-none hover:border-[#0e7c66] transition-all shadow-none"
                  >
                    <h4 className="font-bold text-[#0a2e1e] group-hover:text-[#0a2e1e] mb-2 flex items-center justify-between">
                      DoD vs IEEE Comparison
                      <ChevronRight className="w-4 h-4" />
                    </h4>
                    <p className="text-xs text-[#5a6672]">Which standard applies to your organisation.</p>
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Drive Eraser CTA */}
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-6 flex items-center">
                  <span className="w-8 h-8 bg-[#d4ede4] text-[#0e7c66] rounded-none flex items-center justify-center mr-3 text-sm">✓</span>
                  Drive Eraser
                </h3>
                <p className="text-[#5a6672] text-sm mb-6">
                  IEEE 2883-2022 Purge-level erasure for HDDs, SSDs, and NVMe with signed audit reports.
                </p>
                <Link
                  to="/products/drive-eraser"
                  className="block w-full py-3 px-4 bg-[#0e7c66] text-white text-center rounded-none font-semibold hover:bg-[#0e7c66] transition-colors"
                >
                  Explore Drive Eraser
                </Link>
              </div>

              {/* Quick Reference */}
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-6">Quick Reference</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                    <p className="text-xs font-bold text-[#0a2e1e] uppercase mb-1">Standard</p>
                    <a
                      href="https://standards.ieee.org/ieee/2883/10581/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0a2e1e] font-medium hover:underline flex items-center gap-1"
                    >
                      IEEE 2883-2022
                      <ExternalLink className="w-4 h-4 ml-2 inline" />
                    </a>
                  </div>
                  <div className="p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                    <p className="text-xs font-bold text-[#0a2e1e] uppercase mb-1">Published</p>
                    <p className="text-sm text-[#5a6672] font-medium">2022 — IEEE</p>
                  </div>
                  <div className="p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                    <p className="text-xs font-bold text-[#0a2e1e] uppercase mb-1">Coverage</p>
                    <p className="text-sm text-[#5a6672] font-medium">HDD, SSD, NVMe, Flash, Mobile</p>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-8">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-6">D-Secure Tools</h3>
                <div className="space-y-4">
                  <Link to="/products/drive-eraser" className="group block">
                    <p className="text-[#5a6672] text-sm mb-1 group-hover:text-[#0a2e1e] transition-colors">Purge-Level</p>
                    <p className="font-semibold text-[#0a2e1e] group-hover:text-[#0a2e1e] transition-colors">Drive Eraser</p>
                  </Link>
                  <Link to="/products/file-eraser" className="group block">
                    <p className="text-[#5a6672] text-sm mb-1 group-hover:text-[#0a2e1e] transition-colors">File-Level</p>
                    <p className="font-semibold text-[#0a2e1e] group-hover:text-[#0a2e1e] transition-colors">File Eraser</p>
                  </Link>
                  <Link to="/products/smartphone-eraser" className="group block">
                    <p className="text-[#5a6672] text-sm mb-1 group-hover:text-[#0a2e1e] transition-colors">Mobile ITAD</p>
                    <p className="font-semibold text-[#0a2e1e] group-hover:text-[#0a2e1e] transition-colors">Smartphone Eraser</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0e7c66]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Make Your Erasure{" "}
              <Link to="/compliance/ieee-2883" className="text-[#0e7c66] hover:underline font-medium">
                IEEE 2883-2022
              </Link>{" "}
              Compliant
            </h2>
            <p className="text-xl text-white/80 mb-12">
              D-Secure provides enterprise tools to implement Clear and Purge methods across your entire IT infrastructure — with full audit trails and compliant reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#0e7c66] text-white rounded-none font-bold text-lg hover:bg-[#0e7c66] transition-all shadow-none shadow-none-500/25"
              >
                Request a Free Demo
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 border-2 border-white/20 text-white rounded-none font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Enterprise Plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Reveal>
            <FAQSection faqs={blogFaqs["ieee-2883-compliance"]} title="Frequently Asked Questions" />
          </Reveal>
        </div>
      </section>

      <BlogFooterStandard
        blogId="ieee-2883-2022-data-sanitization"
        blogTitle="IEEE 2883-2022 Data Sanitization: How D-Secure Ensures Full Compliance"
        category="Technical Guide"
        tag="Standards"
      />

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setSelectedImageIndex(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSelectedImageIndex(null);
            }
          }}
          aria-label="Close gallery"
        >
          {/* बंद करने का बटन */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* बायाँ तीर */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <Check className="w-6 h-6" />
          </button>

          {/* दायाँ तीर */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <Check className="w-6 h-6" />
          </button>

          {/* इमेज कंटेनर */}
          <div
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img loading="lazy" decoding="async"
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-none shadow-none animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* इमेज काउंटर */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default IEEE2883ComplianceBlog;
