import React from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '../utils/seo';
import { useNavigate } from "react-router-dom";
import { Scale, Mail, MapPin } from "lucide-react";

const LegalPolicy: React.FC = () => {
  const navigate = useNavigate?.();

  const handleBack = () => {
    if (navigate) navigate("/");
    else window.location.href = "/";
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHeadNative seo={getSEOForPage("legal-policy")} />

      <div className="min-h-screen bg-white pt-24 pb-12 text-left">
        <div className="container-responsive">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Legal Policy
              </h1>
              <p className="text-lg text-slate-800 leading-relaxed max-w-2xl">
                Our legal framework and compliance requirements
              </p>
            </div>

            {/* Content */}
            <div className="py-4">
              <div className="text-left">
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  1. Legal Framework
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    D-Secure Technologies Pvt. Ltd. operates under the legal
                    framework established by Indian law and international data
                    protection standards. Our services comply with applicable
                    regulations and industry best practices for data erasure and
                    security.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  2. Service Agreement
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    By using D-Secure services, you agree to our terms of
                    service and acknowledge that you have read and understood
                    our legal obligations and your rights as a user.
                  </p>
                  <p className="leading-relaxed">
                    Our software solutions are provided "as is" with appropriate
                    warranties and limitations as outlined in our complete terms
                    of service.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  3. Compliance Standards
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    D-Secure follows international standards including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>NIST 800-88 Guidelines for Media Sanitization</li>
                    <li>
                      Common Criteria for Information Technology Security
                      Evaluation
                    </li>
                    <li>GDPR compliance for data protection</li>
                    <li>ISO/IEC standards for information security</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  4. Liability and Limitations
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    D-Secure's liability is limited to the extent permitted by
                    applicable law. Users are responsible for ensuring proper
                    backup and testing before using our data erasure solutions.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  5. Applicable Law & Jurisdiction
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    By visiting www.dsecuretech.com, you agree that the laws of India, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and D-Secure Technologies Pvt. Ltd. must be settled in the courts of Delhi, INDIA; and you agree to jurisdiction in such courts.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  6. Copyright & Trademarks
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    <strong>Copyright: D-Secure Technologies Pvt. Ltd. All Rights Reserved.</strong>
                  </p>
                  <p className="leading-relaxed">
                    The information contained in this site is copyrighted and may not be distributed, modified, reproduced in whole or in part without the prior written permission of D-Secure Technologies Pvt. Ltd. The images from this site may not be reproduced in any form without the prior advanced written consent of D-Secure Technologies Pvt. Ltd.
                  </p>
                  <p className="leading-relaxed">
                    D-Secure, Drive Eraser, and File Eraser are trademarks or registered trademarks of D-Secure Technologies Pvt. Ltd. in India and/or other countries. All other D-Secure Technologies Pvt. Ltd. brand or product names or logos referenced on this web site are either trademarks or registered trademarks of D-Secure Technologies Pvt. Ltd. The absence of a brand or product name or logo from this list does not constitute a waiver of any D-Secure Technologies Pvt. Ltd. or other intellectual property right concerning that name or logo.
                  </p>
                  <p className="leading-relaxed">
                    All other brands and product names are trademarks or registered trademarks of their respective owners.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  7. Content Copyright
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    The entire content of this website is copyrighted to D-Secure Technologies Pvt. Ltd., Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005 and should never be reproduced/copied to another website without written authorization from the owners of D-Secure Technologies Pvt. Ltd. "Websites that are scraping content in the form of RSS feeds, bots, or manual methods will be reported to their web host with a DMCA take down notice."
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  8. Electronic Communication
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    When you visit our website or send e-mails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on this site. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  9. Contact Information
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    For legal inquiries or concerns, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#0e7c66]" />
                      <a
                        href="mailto:legal@dsecuretech.com"
                        className="text-[#0e7c66] hover:underline font-semibold"
                      >
                        legal@dsecuretech.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-[#0e7c66] mt-1" />
                      <span>
                        Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default LegalPolicy;