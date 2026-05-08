import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ErasureVerificationBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
        <SEOHead seo={getSEOForPage("blog-erasure-verification-process")} />

        {/* Hero Section */}
        <section className="py-16 bg-white shadow-lg">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                Data Erasure
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                NIST-Compliant Erasure Verification Process Explained
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Understand how D-Secure performs NIST-compliant erasure
                verification to ensure complete data sanitization and regulatory
                compliance.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Main Content */}
        <section className="w-full px-4 md:px-8 lg:px-16 py-12">
          <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-slate-700 leading-loose text-xl">
                  D-Secure <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">Drive Eraser</Link> software helps organizations comply with
                  data privacy regulations such as{" "}
                  <strong className="text-emerald-800">
                    EU-GDPR, CCPA, SOX, and HIPAA
                  </strong>{" "}
                  by permanently wiping data when it is no longer required or
                  when storage devices are upgraded, repurposed, or
                  decommissioned.
                </p>
                <p className="text-slate-700 leading-loose text-lg">
                  After data erasure, the software performs verification to
                  ensure complete data sanitization, including from hidden areas
                  such as the Host Protected Area (HPA), Device Configuration
                  Overlay (DCO), and remapped sectors.
                </p>
              </div>

              {/* NIST Guidelines */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                <h3 className="font-bold text-slate-900 text-xl mb-4">
                  <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link> Requirements
                </h3>
                <p className="text-slate-700 leading-loose text-lg">
                  According to <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link> Guidelines for Media Sanitization,
                  verification must be performed on the device to ensure that
                  target data was effectively removed. Verifying sanitized
                  information is an essential component of the data disposal
                  process for maintaining confidentiality.
                </p>
              </div>
            </div>
          </Reveal>

          {/* NIST Verification Methods */}
          <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                NIST-Prescribed Verification Methods
              </h2>
              <p className="text-slate-700 leading-loose text-lg">
                NIST Section 4.7 prescribes two methods to verify media
                sanitization:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-3">Full Verification</h4>
                  <p className="text-white/90 leading-relaxed">
                    Requires reading all values in user-accessible areas and
                    ensuring they match the expected results. This provides
                    complete assurance of thorough data sanitization.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-3">
                    Representative Sampling
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Requires verifying a subset of the media device by selecting
                    pseudorandom locations. Suitable for faster verification
                    when handling large volumes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl p-8 mt-8">
                <h3 className="font-bold text-slate-900 text-xl mb-4">
                  Secondary Verification Requirement
                </h3>
                <p className="text-slate-700 leading-loose text-lg">
                  NIST Section 4.7.3 states that in addition to verifying each
                  media device individually, a randomly selected subset of
                  sanitized media must undergo secondary verification using a
                  different tool like D-Secure Drive Verifier. Organizations
                  handling large-scale data destruction must incorporate
                  secondary verification to mitigate potential data security
                  risks.
                </p>
              </div>
            </div>
          </Reveal>

          {/* D-Secure Verification Options */}
          <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                D-Secure Verification Options
              </h2>

              <p className="text-slate-700 leading-loose text-lg">
                D-Secure <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">Drive Eraser</Link> is NIST-tested software under the Computer
                Forensics Tool Testing (CFTT) Federated Testing program, which
                verifies its overwriting capabilities. The software provides
                three verification options that must be selected prior to the
                data wiping process:
              </p>

              <div className="space-y-8 mt-8">
                <div className="border-l-4 border-emerald-500 pl-8 py-2">
                  <h3 className="font-bold text-slate-900 text-xl mb-3">
                    Total Verification (100%)
                  </h3>
                  <p className="text-slate-700 text-lg leading-loose">
                    This method verifies 100% of the drive and aligns with the
                    Full Verification approach specified in <Link to="/compliance/nist-800-88" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link>
                    guidelines. This is the default verification method for NIST
                    Clear and Purge standards.
                  </p>
                </div>

                <div className="border-l-4 border-emerald-500 pl-8 py-2">
                  <h3 className="font-bold text-slate-900 text-xl mb-3">
                    Random Verification (20%)
                  </h3>
                  <p className="text-slate-700 text-lg leading-loose">
                    This method verifies 20% of the drive and meets the
                    requirements of Representative Sampling. While faster, this
                    verification is advisable primarily for drives containing
                    low-risk data.
                  </p>
                </div>

                <div className="border-l-4 border-emerald-500 pl-8 py-2">
                  <h3 className="font-bold text-slate-900 text-xl mb-3">
                    Minimal Verification (1%)
                  </h3>
                  <p className="text-slate-700 text-lg leading-loose">
                    When No Verification option is selected, only 1% of the
                    drive is verified. This option is not recommended for
                    sensitive data but may be suitable for specific use cases.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                <h3 className="font-bold text-slate-900 text-xl mb-4">
                  Recommendation
                </h3>
                <p className="text-slate-700 leading-loose text-lg">
                  We highly recommend choosing Total Verification even when
                  using standards other than NIST for wiping drives. While
                  businesses may choose random verification to speed up the
                  process, such verification is advisable only for drives
                  containing low-risk data.
                </p>
              </div>
            </div>
          </Reveal>

          {/* How Verification Works */}
          <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                How the Verification Process Works
              </h2>

              <p className="text-slate-700 leading-loose text-lg">
                The verification process involves re-reading data after it has
                been overwritten and comparing results with the overwriting
                pattern used to confirm successful erasure. The software
                performs Block by Block and Sector by Sector comparison.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">
                      Data Overwriting
                    </h4>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Data erasure begins using the chosen algorithm and drive
                      type. For example, NIST Clear recommends overwriting SCSI
                      HDD using a single pass overwrite method with a fixed
                      value such as zeros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">
                      Data Re-Reading
                    </h4>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Once the drive has been overwritten, the software scans
                      the drive again to compare the overwritten data with the
                      expected pattern.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">
                      Block & Sector Verification
                    </h4>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      The software checks each block and sector on the drive to
                      ensure complete data is replaced by the overwriting
                      pattern. If discrepancies are found between expected and
                      actual data, the erasure process is marked as 'FAILED.'
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-loose text-lg mt-8">
                This systematic approach ensures no data remnants are left
                behind, providing businesses with confidence in the data erasure
                process and fulfilling algorithm verification requirements.
              </p>
            </div>
          </Reveal>{/* Final Thoughts */}
          <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Key Takeaways
              </h2>
              <p className="text-slate-700 leading-loose text-lg">
                Erasure verification is a vital component of the data
                sanitization process, ensuring sensitive information is
                permanently removed and irrecoverable. D-Secure incorporates
                NIST-recommended verification methods that empower organizations
                to meet regulatory compliance, mitigate risks, establish trust
                in data disposal processes, and achieve absolute data security.
              </p>
              <p className="text-slate-700 leading-loose text-lg">
                As data privacy regulations continue to evolve, implementing a
                thorough erasure verification strategy will be essential for
                organizations looking to maintain compliance and protect their
                digital assets.
              </p>
            </div>
          </Reveal>
        </section>
        <BlogFooterStandard 
          blogId="erasure-verification-process" 
          blogTitle="The Critical Importance of Data Erasure Verification" 
        />
    </div>
  );
};

export default ErasureVerificationBlog;
