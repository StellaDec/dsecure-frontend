import React, { useEffect, useState } from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/FlatIcons";
import { ChevronRight, X } from "lucide-react";

const NIST80088MediaSanitizationBlog: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  };

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
    // Ensure scroll is enabled when this page mounts
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    
    return () => {
      // Cleanup if needed, though usually auto is safe
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative z-10 overflow-y-visible bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
      <SEOHead
        seo={getBlogSEO({
          title:
            "NIST 800-88 Media Sanitization: What It Is and Why Your Organization Needs It",
          excerpt:
            "Understand NIST SP 800-88 Rev. 1 — the gold standard for data sanitization. Learn how Clear, Purge, and Destroy protect your organization from residual data exposure.",
          slug: "nist-800-88-media-sanitization-guide",
          author: "D-Secure Editorial Team",
          publishDate: "May 08, 2026",
          keywords:
            "NIST 800-88, Data Sanitization, Compliance, Clear Purge Destroy, Drive Erasure, D-Secure",
          category: "Technical Guide",
          tag: "Standards",
        })}
      />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              Data Sanitization Standards
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              <Link
                to="/compliance/nist-800-88"
                className="text-emerald-600 hover:underline font-medium"
              >
                NIST 800-88
              </Link>{" "}
              Media Sanitization: Complete Guide for Your Organization
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Understand{" "}
              <a
                href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                NIST SP 800-88 Rev. 1
              </a>{" "}
              — the gold standard for data sanitization. Learn how Clear, Purge,
              and Destroy protect your organization from residual data exposure.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Intro Summary Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Understanding NIST SP 800-88
            </h2>
            <p className="text-slate-700 leading-loose text-lg mb-6">
              <a
                href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                NIST Special Publication 800-88
              </a>{" "}
              — formally titled{" "}
              <em>"Guidelines for Media Sanitization"</em> — is the U.S.
              government's definitive framework for data disposal. Originally
              released in 2006 and updated in December 2014 as{" "}
              <a
                href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 hover:underline"
              >
                NIST SP 800-88 Rev. 1
              </a>
              , it has become the most widely referenced data sanitization
              standard in both the public and private sectors worldwide.
            </p>
            <p className="text-slate-700 leading-loose text-lg mb-6">
              Unlike older wiping methods, NIST 800-88 is explicitly designed
              to be <strong>media-agnostic and future-ready</strong> — covering
              magnetic drives, SSDs, NVMe, USB drives, smartphones, and any
              storage technology yet to emerge.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 text-xl mb-3">
                {" "}
                Why NIST 800-88 Matters
              </h4>
              <p className="text-slate-700 text-lg leading-loose">
                <Link
                  to="/products/drive-eraser"
                  className="text-emerald-600 hover:underline font-bold"
                >
                  NIST 800-88
                </Link>{" "}
                is the data sanitization standard now referenced by the{" "}
                <strong>US Department of Defense</strong> in the NISPOM
                official document. Using a certified tool like{" "}
                <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">D-Secure Drive Eraser</Link> helps organizations
                meet requirements for HIPAA, GDPR, PCI-DSS, and other
                regulatory frameworks.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Main Content Grid */}
      {/* Main Content Section */}
      <section className="container-app py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* What is NIST 800-88 */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    What Is NIST 800-88?
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    NIST 800-88 is a document published by the National
                    Institute of Standards and Technology (NIST) that provides
                    guidance for making decisions regarding media sanitization.
                    The standard's own words capture the problem it solves:
                  </p>

                  {/* Original NIST dumpster-diving quote */}
                  <blockquote className="bg-slate-50 border-l-4 border-emerald-500 p-6 italic text-slate-700 my-6 rounded-r-xl">
                    "An often rich source of illicit information collection is
                    either through dumpster diving for improperly disposed hard
                    copy media, acquisition of improperly sanitized electronic
                    media, or through keyboard and laboratory reconstruction of
                    media sanitized in a manner not commensurate with the
                    confidentiality of its information."
                    <footer className="text-sm mt-2 text-slate-500 font-bold not-italic">
                      —{" "}
                      <a
                        href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-600 underline transition-colors"
                      >
                        NIST Special Publication 800-88
                      </a>
                    </footer>
                  </blockquote>

                  <p className="text-slate-700 leading-relaxed mt-4 mb-4">
                    The standard formally defines sanitization as:
                  </p>
                  <blockquote className="bg-slate-50 border-l-4 border-emerald-500 p-6 italic text-slate-700 my-6 rounded-r-xl">
                    "A process that renders access to target data on the media
                    infeasible for a given level of effort."
                    <footer className="text-sm mt-2 text-slate-500 font-bold not-italic">
                      —{" "}
                      <a
                        href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-600 underline transition-colors"
                      >
                        NIST Special Publication 800-88
                      </a>
                    </footer>
                  </blockquote>
                  <p className="text-slate-700 leading-relaxed mt-4">
                    The framework helps organizations choose a sanitization
                    method based on the sensitivity of the data and the
                    intended disposition of the storage media.
                  </p>

                  {/* Three Tiers */}
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
                      <h4 className="font-bold text-emerald-700 text-xl mb-3 text-center">
                        CLEAR
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed text-center">
                        Logical techniques to sanitize data in all
                        user-addressable storage locations.
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                      <h4 className="font-bold text-amber-700 text-xl mb-3 text-center">
                        PURGE
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed text-center">
                        Techniques that render data recovery infeasible even
                        with laboratory equipment.
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                      <h4 className="font-bold text-slate-700 text-xl mb-3 text-center">
                        DESTROY
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed text-center">
                        Physical destruction making data recovery permanently
                        impossible.
                      </p>
                    </div>
                  </div>

                  {/* Tool Injection - Smart Link */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                        <ShieldIcon className="w-8 h-8 text-emerald-600" filled />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Check Your Compliance Instantly</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Not sure if your storage media needs Clear, Purge, or Destroy treatment? Use our interactive NIST 800-88 Compliance Checker to get a certified recommendation in seconds.
                        </p>
                      </div>
                      <Link 
                        to="/tools/nist-800-88-compliance-checker" 
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-200 flex items-center gap-2 whitespace-nowrap"
                      >
                        Run Free Audit
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
              </div>
            </Reveal>

            {/* What Does Media Sanitization Actually Mean */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  What Does "Media Sanitization" Actually Mean?
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Every IT security team locks down networks, hardens
                  endpoints, and monitors threats in real time. But there's
                  one vulnerability that's easy to overlook: data left behind
                  on storage media that has reached end-of-life.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  "Infeasible" doesn't mean difficult — it means effectively
                  impossible given the resources and techniques an adversary
                  might realistically deploy. The standard of infeasibility is
                  set by the{" "}
                  <strong>
                    confidentiality level of the data itself
                  </strong>
                  , not the device type.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Unlike the older{" "}
                  <strong>DoD 5220.22-M</strong> three-pass wiping method —
                  which hasn't been updated in years and doesn't adequately
                  address modern flash-based storage —{" "}
                  <a
                    href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    NIST 800-88
                  </a>{" "}
                  is explicitly designed to be{" "}
                  <strong>media-agnostic and future-ready</strong>. Its
                  principles apply to magnetic drives, SSDs, NVMe, USB flash
                  drives, smartphones, removable media, servers, and any
                  storage technology that doesn't yet exist.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Its influence has also crossed borders. Key principles from
                  NIST 800-88 have been incorporated into major international
                  frameworks such as <strong>ISO/IEC 27040:2015</strong>,
                  making it a truly global reference document for information
                  security teams.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  NIST also takes a <strong>lifecycle view</strong> of
                  sanitization. It's not a last-minute concern when a hard
                  drive gets retired — it must be factored into information
                  system design from day one. Organizations need to understand,
                  at the point of purchasing and deploying storage
                  infrastructure, what sanitization methods will be available
                  to them when that media eventually needs to be
                  decommissioned, transferred, or retired.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  This lifecycle planning also accounts for the many in-between
                  moments where data can be exposed: during infrastructure
                  upgrades, third-party maintenance windows, device transfers
                  between departments, or any time media moves from a higher
                  security environment to a lower one.
                </p>

              </div>
            </Reveal>

            {/* Problem it Solves */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  What Problem Does NIST 800-88 Actually Solve?
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The single greatest data security vulnerability in most
                  organizations isn't a network breach — it's the assumption
                  that data has been erased.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  NIST 800-88 addresses this directly by demanding{" "}
                  <strong>verification and documentation</strong>. A device
                  that has been "wiped" but not verified and certified is{" "}
                  <em>not compliant</em>, regardless of how thorough the
                  intent was.
                </p>

                {/* NIST Decision Framework */}
                <div className="bg-slate-900 text-white rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-6">
                    NIST Structured Decision-Making
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Categorize the data",
                        desc: "What is its confidentiality classification?",
                      },
                      {
                        step: "2",
                        title: "Assess the storage medium",
                        desc: "What type of technology stores this data?",
                      },
                      {
                        step: "3",
                        title: "Evaluate the risk",
                        desc: "What happens if this data is recovered?",
                      },
                      {
                        step: "4",
                        title: "Determine future use",
                        desc: "Will the device be reused, donated, sold, or destroyed?",
                      },
                    ].map((item) => (
                      <li key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-bold mb-1 text-white">
                            {item.title}
                          </p>
                          <p className="text-slate-400 text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Why Common Methods Fall Short */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Why Common Data Removal Methods Often Fall Short
                </h2>
                <p className="text-slate-700 leading-relaxed mb-8">
                  Before NIST 800-88, organizations relied on a handful of
                  conventional methods to remove data from decommissioned
                  devices. Each of these has significant limitations:
                </p>

                <div className="space-y-6 mb-12">
                  {/* Degaussing */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Degaussing
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Degaussing uses a powerful magnetic field to destroy data
                      on magnetic media. However, it is{" "}
                      <strong>
                        completely ineffective on solid-state drives, NVMe, and
                        other flash-based storage
                      </strong>
                      , which now constitute the majority of enterprise and
                      consumer devices. NIST 800-88 explicitly states:{" "}
                      <em>
                        "Degaussing, a fundamental way to sanitize magnetic
                        media, no longer applies in most cases for flash
                        memory-based devices."
                      </em>{" "}
                      Even for magnetic drives, evolving high-coercivity
                      recording technologies are making older degaussers
                      increasingly inadequate.
                    </p>
                  </div>

                  {/* Overwriting */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Overwriting
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Single-pass overwriting is actually highly effective on
                      magnetic hard drives — NIST confirms that one pass is
                      generally sufficient. The problem lies in{" "}
                      <strong>coverage gaps</strong>: overwriting through
                      standard Read/Write commands only addresses
                      user-accessible Logical Block Addresses (LBAs). Defective
                      sectors, reallocated blocks, and unaddressed areas of
                      flash-based storage may remain untouched, preserving
                      recoverable data.
                    </p>
                  </div>

                  {/* Physical Destruction */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Physical Destruction (Shredding, Incineration, Pulverizing)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Physical destruction is sometimes necessary — especially
                      for media that is damaged beyond all other sanitization
                      options. But as storage density increases, data can survive
                      on surprisingly small chip fragments, meaning effective
                      destruction requires increasingly fine shred sizes.
                      Furthermore, physical destruction permanently removes the
                      asset from any possibility of reuse, donation, or resale
                      — carrying both{" "}
                      <strong>economic and environmental costs</strong>.
                    </p>
                  </div>

                  {/* Cryptographic Erasure */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Encryption and Cryptographic Erasure
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Encryption protects data in use, and cryptographic erasure
                      (destroying the encryption key) can be an effective
                      sanitization method when properly implemented. However,{" "}
                      <strong>
                        there is no reliable way to externally verify that all
                        encryption keys have been completely and permanently
                        destroyed
                      </strong>
                      . Without verification, cryptographic erasure cannot be
                      treated as guaranteed.
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* When to Use Each */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  NIST 800-88's Three-Tier Framework: Clear, Purge &amp; Destroy
                </h2>
                <p className="text-slate-700 leading-relaxed mb-8">
                  NIST 800-88 establishes three distinct methods of
                  sanitization, each calibrated to different levels of data
                  sensitivity and intended future use of the media.
                </p>

                <div className="bg-blue-50 rounded-xl p-8 mb-8 border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-lg mb-4">
                    When to Use NIST Clear
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Media will be reused within the organization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Data is of lower sensitivity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Quick sanitization is needed for routine refreshes
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-50 rounded-xl p-8 mb-12 border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 text-lg mb-4">
                    When to Use NIST Purge
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Media will leave organizational control (resale,
                        donation)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Data is moderately to highly sensitive (PII, Financial,
                        PHI)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3">✓</span>
                      <span className="text-slate-700">
                        Compliance with HIPAA, GDPR, PCI-DSS is required
                      </span>
                    </li>
                  </ul>
                </div>

              </div>
            </Reveal>

            {/* Verification - full */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Why Verification Is the Cornerstone of NIST Compliance
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Completing the erasure process is necessary — but it is not
                  sufficient.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  NIST 800-88 is explicit:{" "}
                  <strong>verification is mandatory</strong>.
                </p>
                <blockquote className="bg-slate-50 border-l-4 border-emerald-500 p-6 italic text-slate-700 my-6 rounded-r-xl">
                  "Verifying the selected information sanitization and disposal
                  process is an essential step in maintaining confidentiality.
                  Two types of verification should be considered."
                  <footer className="text-sm mt-2 text-slate-500 font-bold not-italic">
                    —{" "}
                    <a
                      href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-600 underline transition-colors"
                    >
                      NIST Special Publication 800-88
                    </a>
                  </footer>
                </blockquote>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Those two types are:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">1.</span>
                    <span className="text-slate-700">
                      <strong>Full verification</strong> — Confirming that
                      sanitization was applied to every piece of media in the
                      sanitization batch
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">2.</span>
                    <span className="text-slate-700">
                      <strong>Sample verification</strong> — Selecting a
                      representative subset of sanitized media and confirming
                      that no data is recoverable, ideally conducted by
                      personnel who were not part of the original sanitization
                      process
                    </span>
                  </li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Validation should extend to:
                </p>
                <ul className="space-y-2 mb-12">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mr-1">✓</span>
                    <span className="text-slate-700">
                      The <strong>equipment</strong> used — does it operate
                      correctly and produce accurate results?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mr-1">✓</span>
                    <span className="text-slate-700">
                      <strong>Staff competencies</strong> — are operators
                      trained to use the tools and evaluate the outputs?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mr-1">✓</span>
                    <span className="text-slate-700">
                      The <strong>results themselves</strong> — is data
                      confirmed as irrecoverable?
                    </span>
                  </li>
                </ul>

              </div>
            </Reveal>

            {/* Erasure Certificate */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  The Erasure Certificate: Your Proof of Compliance
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  No NIST 800-88-compliant sanitization process is complete
                  without a <strong>tamper-proof erasure certificate</strong>{" "}
                  for each device processed. This certificate functions as the
                  legal and audit-ready evidence that data has been permanently
                  and irreversibly removed. A proper certificate documents:
                </p>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-12">
                  <ul className="space-y-3">
                    {[
                      "Device identification — serial number, make, model, capacity",
                      "Sanitization method — Clear, Purge, or Destroy",
                      "Technique used — overwrite pattern, Secure Erase command, block erase, cryptographic erasure",
                      "Verification result — confirmation that the sanitization was successful",
                      "Operator and tool information — who performed the erasure and with what software",
                      "Timestamp — date and time of sanitization",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-600 mt-6 pt-6 border-t border-slate-100 italic text-sm">
                    For organizations in regulated industries — healthcare
                    (HIPAA), financial services, government, or any sector
                    subject to data protection requirements —{" "}
                    <strong>
                      an auditable certificate isn't optional. It's the
                      evidence that closes the compliance loop.
                    </strong>
                  </p>
                </div>

                {/* Sample Reports */}
                <div className="mt-8 mb-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Sample Compliance Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Drive Eraser */}
                    <button onClick={() => setSelectedImageIndex(0)} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 w-full">
                        <span className="font-semibold text-slate-800 text-sm">Drive Eraser Report</span>
                        <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">NIST Purge</span>
                      </div>
                      <div className="p-4 flex justify-center bg-slate-100 overflow-hidden relative w-full">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778239910/dwzvvyiiyhlntaw9cheh.png" alt="Drive Eraser Report" className="h-64 object-contain rounded border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                    {/* File Eraser */}
                    <button onClick={() => setSelectedImageIndex(1)} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 w-full">
                        <span className="font-semibold text-slate-800 text-sm">File Eraser Report</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">Targeted</span>
                      </div>
                      <div className="p-4 flex justify-center bg-slate-100 overflow-hidden relative w-full">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778233927/r3mpk0vohwxanxppbchv.png" alt="File Eraser Report" className="h-64 object-contain rounded border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                    {/* Diagnostic */}
                    <button onClick={() => setSelectedImageIndex(2)} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group text-left cursor-pointer p-0">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 w-full">
                        <span className="font-semibold text-slate-800 text-sm">Diagnostic Report</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">Verified</span>
                      </div>
                      <div className="p-4 flex justify-center bg-slate-100 overflow-hidden relative w-full">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778242571/fjqwejrbgdzvvetpj7dy.png" alt="Hardware Diagnostic Report" className="h-64 object-contain rounded border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 text-center italic">These tamper-proof reports provide irrefutable evidence of data sanitization and hardware health.</p>
                </div>

              </div>
            </Reveal>

            {/* D-Secure Practice */}
            <Reveal>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white">
                  <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                    Putting NIST 800-88 Into Practice with D-Secure
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    D-Secure Drive Eraser is built to deliver full{" "}
                    <a
                      href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      NIST SP 800-88 Rev. 1
                    </a>{" "}
                    compliance across your entire device lifecycle — whether
                    you're decommissioning laptops, retiring data center
                    servers, processing ITAD returns, or managing end-of-life
                    mobile devices.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "NIST 800-88 Clear and Purge support for HDD, SSD, NVMe, and removable media",
                      "Automated post-erasure verification with drive-level reporting",
                      "Tamper-proof, digitally signed erasure certificates for every processed device",
                      "Simultaneous erasure across up to 32 drives per machine",
                      "Cloud console for centralized audit trail management across multiple sites",
                      "Support for Windows, macOS, and Linux across x64, ARM64, and x86 architectures",
                    ].map((feat) => (
                      <li key={feat} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                        </div>
                        <span className="text-slate-200">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </Reveal>

            {/* Key Takeaways Table */}
            <Reveal>
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Key Takeaways
                </h2>
                <div className="overflow-x-auto mb-12">
                  <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="px-6 py-4 text-left font-semibold">Topic</th>
                        <th className="px-6 py-4 text-left font-semibold">What NIST 800-88 Says</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {[
                        ["Sanitization definition", "Rendering data access infeasible for a given threat level"],
                        ["Standard categories", "Clear (logical), Purge (firmware/physical), Destroy (physical)"],
                        ["Degaussing on SSDs", "Ineffective — explicitly excluded by NIST"],
                        ["Overwriting", "Effective on HDD; must address hidden areas; single pass usually sufficient"],
                        ["Verification", "Mandatory — full verification or representative sampling"],
                        ["Certificate", "Required for audit-ready, legally defensible compliance"],
                        ["DoD 5220.22-M", "Outdated; NIST 800-88 is the recognized successor"],
                      ].map(([topic, detail]) => (
                        <tr key={topic} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900">{topic}</td>
                          <td className="px-6 py-4 text-slate-600">{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Executive Summary */}
            <Reveal>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Executive Summary &amp; Next Steps
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Choosing between Clear, Purge, and Destroy depends on your
                    data's sensitivity and the hardware's next destination. For
                    most enterprise use cases,{" "}
                    <strong>Purge</strong> is the recommended standard as it
                    addresses internal drive sectors and provides a high level
                    of security without destroying the hardware's value.
                  </p>
                  <h4 className="font-bold text-slate-900 mb-6">
                    Recommended Reading:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Link
                      to="/tools/data-breach-calculator"
                      className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 transition-all shadow-sm"
                    >
                      <h5 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2 flex items-center justify-between">
                        Data Breach Calculator
                        <ChevronRight className="w-4 h-4" />
                      </h5>
                      <p className="text-xs text-slate-500">
                        Estimate your financial exposure from data leaks.
                      </p>
                    </Link>
                    <Link
                      to="/tools/gdpr-erasure-checklist"
                      className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 transition-all shadow-sm"
                    >
                      <h5 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2 flex items-center justify-between">
                        GDPR Checklist
                        <ChevronRight className="w-4 h-4" />
                      </h5>
                      <p className="text-xs text-slate-500">
                        Ensure Article 17 compliance for your business.
                      </p>
                    </Link>
                  </div>
                </div>
              </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Compliance Checker Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3 text-sm">
                    ✓
                  </span>
                  Compliance Checker
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Not sure which method your hardware needs? Use our NIST
                  800-88 compliance tool.
                </p>
                <Link
                  to="/tools/nist-800-88-compliance-checker"
                  className="block w-full py-3 px-4 bg-slate-900 text-white text-center rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Start Compliance Check
                </Link>
              </div>

              {/* Quick-Reference Info */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Quick Reference
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                      Standard
                    </p>
                    <a
                      href="https://csrc.nist.gov/pubs/sp/800/88/r1/final"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 font-medium hover:underline flex items-center gap-1"
                    >
                      NIST SP 800-88 Rev. 1
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                      Focus
                    </p>
                    <p className="text-sm text-slate-700 font-medium">
                      Media-agnostic data sanitization
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                      Status
                    </p>
                    <p className="text-sm text-slate-700 font-medium">
                      Global benchmark for compliance
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Security Tools</h3>
                <div className="space-y-4">
                  <Link
                    to="/tools/data-breach-calculator"
                    className="group block"
                  >
                    <p className="text-slate-400 text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                      Risk Assessment
                    </p>
                    <p className="font-semibold">Data Breach Cost Calculator</p>
                  </Link>
                  <Link to="/tools/ssd-pass-calculator" className="group block">
                    <p className="text-slate-400 text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                      Flash Storage
                    </p>
                    <p className="font-semibold">SSD Pass Calculator</p>
                  </Link>
                  <Link to="/tools/roi-calculator" className="group block">
                    <p className="text-slate-400 text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                      Financial Analysis
                    </p>
                    <p className="font-semibold">Erasure ROI Calculator</p>
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              {/* <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Security Newsletter
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Stay updated with latest NIST guidelines and security best
                  practices.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Certified{" "}
              <Link
                to="/compliance/nist-800-88"
                className="text-emerald-400 hover:underline font-medium"
              >
                NIST 800-88
              </Link>{" "}
              Media Sanitization
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              D-Secure provides enterprise tools needed to implement Clear,
              Purge, and Destroy methods across your entire IT infrastructure —
              with full audit trails and certified reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                Schedule a Demo
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Enterprise Plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogFooterStandard
        blogId="nist-800-88-media-sanitization-guide"
        blogTitle="NIST 800-88 Media Sanitization: What It Is and Why Your Organization Needs It"
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
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default NIST80088MediaSanitizationBlog;
