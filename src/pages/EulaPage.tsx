import React, { useEffect } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";
import { ScrollText, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function EulaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("eula")} />

      <div className="min-h-screen bg-white pt-24 pb-12 text-left">
        <div className="container-responsive">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <ScrollText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                End User License Agreement (EULA)
              </h1>
              <p className="text-sm font-semibold text-[#0e7c66] tracking-wider uppercase mb-6">
                Effective from August 2026
              </p>
              <p className="text-lg text-slate-800 leading-relaxed max-w-2xl">
                End-user terms and conditions for the use of D-Secure software.
              </p>
            </div>

            {/* Content */}
            <div className="py-4">
              <div className="text-left space-y-12">
                
                <section>
                  <p className="text-slate-800 leading-relaxed mb-4">
                    This End User License Agreement (hereinafter called “EULA” or “AGREEMENT”) contains important terms and conditions governing the use and licensing of the D-Secure software.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-4">
                    This EULA is a legal and binding agreement between YOU (“CUSTOMER”, or “LICENSEE”, or “YOU”) and D-Secure Technologies Pvt. Ltd., (“D-Secure” or “We” or “Licensor”), having its registered address at Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005.
                  </p>
                  <p className="text-slate-800 leading-relaxed font-semibold mb-4">
                    PLEASE READ THIS EULA CAREFULLY.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-4">
                    BY DOWNLOADING, INSTALLING, COPYING, ACCESSING OR USING THIS SOFTWARE, IN WHOLE OR IN PART, YOU ACKNOWLEDGE AND AGREE TO BE BOUND BY ALL TERMS AND CONDITIONS OF THIS EULA, INCLUDING THE LIMITATIONS OF LIABILITY AND WARRANTY CLAUSE.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-4">
                    IF YOU DO NOT AGREE TO THE TERMS OF THIS LICENSE, D-SECURE DOES NOT GRANT TO YOU ANY RIGHTS TO THE SOFTWARE. YOU MUST IMMEDIATELY DISCONTINUE THE INSTALLATION OR USE OF THE SOFTWARE AND PROMPTLY RETURN THE SOFTWARE AND PROOF OF ENTITLEMENT TO THE PARTY FROM WHOM YOU ACQUIRED THE SOFTWARE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    1. Definitions
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>“Computer”</strong> means any physical or virtual device capable of processing information including without limitation PCs, laptops, smartphones, tablets, embedded systems & hardware products on which the software is installed or accessed.</li>
                      <li><strong>“Compatible Computer”</strong> means a computer with the recommended operating system and hardware configuration set out in the documentation contained in the Software.</li>
                      <li><strong>“Customer”, “You”, or “Licensee”</strong> means any individual, body, corporate or legal entity that has been granted rights to use the Software for its own internal purposes in accordance with the terms and conditions contained in this EULA.</li>
                      <li><strong>“License”</strong> means the limited non‑exclusive right granted by D-Secure to use the Software for specific purpose and in the manner permitted under this EULA.</li>
                      <li><strong>“Permitted Number”</strong> means one (1), unless a different quantity is expressly authorized under a valid license (e.g., volume license) granted by D-Secure.</li>
                      <li><strong>“Software”</strong> means all of the information provided with this agreement, including but not limited to:
                        <ul className="list-disc list-outside space-y-1 ml-6 mt-2">
                          <li>all software files, programs, executables, and other computer information;</li>
                          <li>any proprietary scripting logic embedded within exported file formats;</li>
                          <li>images, sounds, clip art, video and other works included with D-Secure software or made available by D-Secure on its website for use with the D-Secure software and not obtained from D-Secure through a separate service or from another party (“Content Files”);</li>
                          <li>related explanatory written materials, help manuals and files (“Documentation”); and</li>
                          <li>any modified versions, copies, upgrades, updates, patches, enhancements, and additions to the foregoing provided by D-Secure at any time, unless supplied under separate terms (collectively, “Updates”).</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    2. License Grant Terms
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Right to use the Software:</strong> Subject to the terms and conditions of this Agreement, D-Secure grants Customer a non-exclusive, non-transferable, non-perpetual, revocable and limited right to use the Software on a ‘Permitted Number' of computers solely for internal purposes in accordance with the license type.</li>
                      <li><strong>Scope:</strong> D-Secure provides license for usage of the Software only. The Software runs locally on Customer‑controlled devices to perform media‑sanitization, diagnostics or other related functions.</li>
                      <li><strong>No Services:</strong> D-Secure does not provide media sanitization services, managed services, data‑center services, operational services, or any other services under this EULA.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    3. License Types
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Pay Per Use License:</strong> License is consumed each time the Software performs a task (including drive erasure, mobile erasure, or diagnostics). One license is deducted per use from the Customer’s available pool.</li>
                      <li><strong>Subscription License:</strong> Subscription License permits the Customer to use the Software during the active subscription term on Permitted Number of Computers. Software may require periodic Internet-based license validation unless deployed in approved offline modes. Failure to complete required validation or failure to pay applicable subscription fees may result in suspension or inactivation of the Software. Subscription license will renew automatically unless cancelled by the Customer in accordance with the applicable renewal terms. D-Secure may modify, replace, or update Software components included in a subscription, provided such changes do not materially reduce the core functionality of the Software.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    4. Technical Support
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Free Technical Support is provided for one (1) year from the date of purchase. Support beyond one year requires additional fees. D-Secure will not provide Support after three (3) years from the date of purchase.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    5. Intellectual Property Ownership
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      D-Secure owns and retains all rights, title, and interest in and to the Software, its source code, the Documentation, and all related intellectual property, whether registered or unregistered, and whether existing now or in the future; and are protected by the copyright and intellectual property laws of India, and other applicable jurisdictions, as well as by international treaties. Customer acknowledges that all intellectual property rights in the Software and Documentation belong to, and/or are licensed to D-Secure. The License granted under this EULA provides only a limited right to use the Software; it does not constitute a sale or transfer of any ownership rights. Except for the limited rights expressly granted in this EULA, no other rights are conveyed, and all rights not expressly granted are reserved by D-Secure.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    6. Licensee Restrictions & Requirements
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Use Obligations:</strong> Customer shall use the Software solely as permitted under this EULA and strictly in accordance with the Software’s intended design, and Documentation.</li>
                      <li><strong>No Modifications or Derivative Works:</strong> Customer shall not, and shall not permit any third party to:
                        <ul className="list-disc list-outside space-y-1 ml-6 mt-2">
                          <li>modify, adapt, translate, tamper with, or create derivative works of the Software or Documentation;</li>
                          <li>combine or merge any part of the Software or Documentation with or into any other software or Documentation;</li>
                          <li>use the Software in any manner to develop, train, or improve competing software, scripts, routines, or programs (including any routine, script, code, or program) having any functional attributes, visual expressions or other features similar to those of the Software to compete with D-Secure;</li>
                          <li>publish or disclose performance results, benchmark tests, or comparative analysis of the Software without D-Secure’s prior written consent.</li>
                        </ul>
                      </li>
                      <li><strong>No Reverse Engineering:</strong> Customer shall not reverse engineer, decompile, disassemble, or otherwise attempt to derive or access the source code, underlying algorithms, or structural design of the Software.</li>
                      <li><strong>No Unbundling:</strong> The Software is licensed and provided as a single integrated product. Although Customer is not required to install all components, Customer shall not unbundle, separate, or use individual components on different Computers unless expressly permitted in the Documentation.</li>
                      <li><strong>Prohibited Cloud or On‑Demand Use:</strong> Customer shall not run, host, or operate the Software in any cloud, Internet‑based, virtualized, or on‑demand computing environment unless the Documentation expressly permits such deployment.</li>
                      <li><strong>No Transfer or Unauthorized Distribution:</strong> Customer shall not rent, lease, sell, sublicense, assign, transfer, distribute, or otherwise convey any rights in the Software, nor authorize any portion of the Software to be copied or installed on another individual’s or entity’s computer, except as expressly permitted under this EULA.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    7. Warranties
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Except as expressly stated in this Section 7, the Software (excluding the physical media on which it may be delivered), and all D-Secure‑related websites, content, and services, are provided to Customer “AS IS” and “AS AVAILABLE.” D-Secure and its licensors and suppliers make NO WARRANTIES OR REPRESENTATIONS of any kind, whether express, implied, statutory, or otherwise, including without limitation any warranties of merchantability, satisfactory quality, fitness for a particular purpose, accuracy, availability, performance, non‑infringement, interoperability, or that the Software or related websites or services will operate uninterrupted, error‑free, free of viruses, securely, or in combination with any particular hardware, software, platform, or environment. These disclaimers apply to the maximum extent permitted by applicable law. Nothing herein limits any warranty that cannot be excluded under applicable law.
                    </p>
                    <p className="leading-relaxed">
                      Customer’s sole and exclusive remedy for breach of any warranty is repair, replacement, or re‑delivery of the Software at D-Secure’s option.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    8. Indemnification
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Intellectual Property (IP) Infringement Indemnity:</strong> Subject to Customer’s proper use of the Software strictly in accordance with this Agreement and the Documentation, D-Secure warrants that the unmodified Software, as provided by D-Secure, does not infringe any third party’s intellectual property rights.</li>
                      <li><strong>Conditions:</strong> Customer must notify D-Secure of any IP infringement claim within five (5) business days of becoming aware of it. Any delay relieves D-Secure of its obligations to the extent it is prejudiced. Customer must provide full cooperation and grant D-Secure exclusive control over the defense and settlement. Customer may participate with its own counsel at its own expense but will not settle any claim or make any statement inconsistent with D-Secure’s interests without D-Secure’s prior written consent.</li>
                      <li><strong>Exclusions:</strong> D-Secure has no obligation for claims arising from: (a) use of the Software in violation of this Agreement or the Documentation; (b) use with hardware, software, not approved by D-Secure; (c) modifications or alterations not made by D-Secure; (d) use of outdated, unsupported, or non-current versions of the Software; or (e) Customer’s environment, systems, configurations, or Customer-provided content or materials.</li>
                      <li><strong>Remedies:</strong> If an infringement claim arises, D-Secure may, at its discretion: (a) secure the right for Customer to continue using the Software; (b) modify or replace the Software; or (c) terminate the affected license and refund the unused portion of fees.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    9. Limitations & Liability
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Excluded Damages:</strong> To the fullest extent permitted by law, D-Secure is not liable for indirect, incidental, special, punitive, or consequential damages; loss of profits, revenue, business, or data; business interruption; or costs of replacement services, even if advised of the possibility.</li>
                      <li><strong>Maximum Liability:</strong> D-Secure’s total aggregate liability for all claims under this Agreement, including indemnity claims, will not exceed the License fees Customer paid in the 12 months before the event giving rise to the claim.</li>
                      <li><strong>No Liability for Customer Environment:</strong> D-Secure is not responsible for issues caused by Customer’s systems, data, configurations, third‑party software, or use outside a Supported Environment.</li>
                      <li><strong>Mandatory Carve‑Out:</strong> Nothing in this Section limits liability that cannot be excluded under applicable law.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    10. Data Collection, Privacy & Confidentiality
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Consent to Data Collection and Use:</strong> By using the Licensed Software, Customer agrees that D-Secure may collect, use, process, transmit, and store information relating to Customer’s Account, devices, system interactions, and use of the Software, in accordance with D-Secure’s Privacy Policy available at https://www.dsecuretech.com/privacy-policy. Such information may include technical, diagnostic, and usage data used to provide, maintain, support, improve, and enhance the Software. Customer further agrees that such information may be transferred to and processed in any other jurisdiction by D-Secure, its affiliates, and service providers.</li>
                      <li><strong>No Storage of Customer Confidential or Personal Data (Except as Stated):</strong> The Software does not access, store, save, or transmit Customer confidential information or personal data, except as expressly described in this Agreement or the Privacy Policy. Customer is solely responsible for ensuring that no sensitive or regulated data is introduced into the Software except as permitted.</li>
                      <li><strong>Data Security:</strong> D-Secure will maintain administrative, physical, and technical safeguards designed to protect the confidentiality, integrity, and availability of Customer data processed by D-Secure, to the extent within D-Secure’s control and only as required for D-Secure’s performance under this Agreement.</li>
                      <li><strong>Data Storage & Handling on D-Secure Cloud Console:</strong> If Customer uses the D-Secure Cloud Console, the Cloud Console stores and processes only system-generated outputs and metadata (e.g., device identifiers, erasure reports, certificates, logs, and license usage data) and does not store Customer business data or end-user content. Such outputs may constitute Customer-provided Confidential Information to the extent they contain information supplied by the Customer. Authentication credentials (e.g., username and email address), usage records, and reports may be stored and processed on D-Secure Cloud, which is hosted on D-Secure’s approved cloud infrastructure providers.</li>
                      <li><strong>Liability Alignment:</strong> All obligations under this Section 10 are subject to the limitations, exclusions, and maximum liability set out in Section 9 (Limitation of Liability).</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    11. Connectivity
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Internet Connectivity:</strong> The Software may cause Customer’s computer, without additional notice, to automatically connect to the Internet and communicate with D-Secure Cloud Console, D-Secure websites or server for purposes including license validation, activation, registration, updates, security checks, feature delivery. When the Software connects to D-Secure website whether automatically or by user action; D-Secure’s Privacy Policy applies. Such connections may transmit technical, diagnostic, usage, and system‑related information, and, where applicable, Customer credentials used for activation or access to D-Secure Cloud Console. Unless prohibited by applicable law, D-Secure may send transactional messages or in‑product information related to the Software or other D-Secure Software.</li>
                      <li><strong>Updates:</strong> The Software may automatically connect to the Internet, intermittently or regularly, to check for, download, install, and report on Updates.</li>
                      <li><strong>Activation and License Validation:</strong> The Software may require Customer to obtain an activation key, activate or reactivate the Software, register the Software, or validate a subscription or license. These processes may trigger automatic Internet connections on installation, launch, or periodically thereafter. Information transmitted may be used to detect or prevent unauthorized or fraudulent use. Failure to activate or validate may result in reduced functionality, inoperability, or suspension of the license or subscription.</li>
                      <li><strong>Digital Certificates:</strong> The Software may use digital certificates to identify downloaded files and their publishers. Validation of such certificates may require Internet connectivity.</li>
                      <li><strong>Offline Variant:</strong> The Offline variant of the Software is delivered on a USB drive along with a USB port accessible License ‘Lock key’. This variant does not require any Internet connection for core functionality and does not access D-Secure Cloud Console.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    12. Termination
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Termination for Cause:</strong> If Customer breaches this EULA and fails to cure such breach within thirty (30) calendar days after receiving written notice from D-Secure, D-Secure may terminate this EULA. Upon termination, all rights granted to Customer immediately cease, including the license to use the Software, which shall stand revoked without further action.</li>
                      <li><strong>Return or Destruction of Software:</strong> Upon termination, Customer shall return or destroy all copies of the Licensed Software and, upon D-Secure’s request, provide written certification confirming such destruction. Failure to return or destroy the Software, or failure to provide certification, entitles D-Secure to pursue equitable relief and damages.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    13. Jurisdiction and Law
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Governing Law and Forum:</strong> This EULA is governed by, and will be construed in accordance with, the substantive laws applicable in the State of Delhi, India. The courts at Delhi, India, shall have exclusive jurisdiction over any dispute arising out of or relating to this EULA, the Software, or the license granted hereunder. Customer irrevocably consents to the jurisdiction of the courts at Delhi, India.</li>
                      <li><strong>Exclusions:</strong> This EULA will not be governed by any conflict‑of‑law principles or by the United Nations Convention on Contracts for the International Sale of Goods, the application of which is expressly excluded.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    14. General
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <ul className="list-disc list-outside space-y-2 ml-4">
                      <li><strong>Entire Agreement:</strong> This EULA constitutes the entire agreement between the parties with respect to the Licensed Software and supersedes all prior or contemporaneous understandings, purchase orders, agreements, communications, or arrangements relating to its subject matter.</li>
                      <li><strong>Survival:</strong> The exclusions of warranties, limitations of liability, and any provisions that by their nature should survive, shall continue in effect after termination of this EULA. Such survival does not grant Customer any continued right to use the Licensed Software after termination.</li>
                      <li><strong>Export Compliance:</strong> Customer shall not ship, transfer, export, or use the Licensed Software in any manner prohibited by applicable export control laws, including, where applicable, the United States Export Administration Act and related regulations (“Export Laws”). All rights granted under this EULA are conditioned upon Customer’s compliance with the Export Laws, and such rights are automatically forfeited upon any non‑compliance.</li>
                      <li><strong>Reservation of Rights:</strong> All rights not expressly granted to Customer under this EULA are reserved by D-Secure. The Licensed Software is protected by the copyright laws of India and other applicable jurisdictions. All ownership rights belong to D-Secure Technologies Pvt. Ltd., Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005.</li>
                      <li><strong>No Third‑Party Beneficiaries:</strong> This EULA does not create any rights for, or confer any benefits upon, any third party.</li>
                      <li><strong>No Waiver:</strong> Any waiver by D-Secure of a breach of this EULA shall not constitute a waiver of any other or future breach of the same or any other provision.</li>
                      <li><strong>Binding Effect:</strong> This EULA is binding upon, and inures to the benefit of, the parties and their respective successors and permitted assigns. It supersedes all prior or contemporaneous representations, discussions, undertakings, communications, agreements, advertisements, and understandings relating to the Licensed Software.</li>
                      <li><strong>Amendments:</strong> This EULA may be modified, supplemented, or amended only by a written instrument signed by an authorized officer of D-Secure.</li>
                    </ul>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
