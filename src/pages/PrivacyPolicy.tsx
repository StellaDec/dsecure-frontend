import React from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '../utils/seo';
import { Shield, MapPin, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage("privacy-policy")} />

      <div className="min-h-screen bg-white pt-24 pb-12 text-left">
        <div className="container-responsive">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-sm font-semibold text-[#0e7c66] tracking-wider uppercase mb-6">
                Last updated: August 2026
              </p>
              <p className="text-lg text-slate-800 leading-relaxed">
                Our Privacy Policy informs you on how your personal information is collected, used, and protected by <strong className="text-slate-900">D-Secure Technologies Pvt. Ltd.</strong>
              </p>
              <p className="text-base text-slate-800 leading-relaxed mt-4">
                This Privacy Notice for D-Secure Technologies Pvt. Ltd, with registered office at Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005 ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4 text-slate-800">
                <li>Visit any of our websites that links to this Privacy Notice</li>
                <li>Download, install, access or use any of our software products</li>
                <li>Provide information directly to us, such as when you contact our support teams, submit queries, or fill out forms.</li>
                <li>Engage with us during the course of a commercial relationship, including when you purchase our software, subscribe to our services, or avail our Data Erasure Services.</li>
                <li>Communicate with us through any channel, including email, phone, chat, or in person</li>
              </ul>
              <p className="text-base text-slate-800 leading-relaxed mt-4">
                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at privacy@dsecuretech.com.
              </p>
            </div>

            <div className="bg-slate-50 p-6 border-l-4 border-slate-400 mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Scope of this Notice</h3>
              <p className="leading-relaxed text-slate-800">
                This Privacy Notice explains how D-Secure and its group companies collect, use, and protect your personal data. It applies to our clients, prospective clients, suppliers, partners, website visitors, and job applicants.
              </p>
            </div>

            <div className="bg-slate-50 p-6 border-l-4 border-slate-400 mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Data Processor Exclusion</h3>
              <p className="leading-relaxed text-slate-800">
                This policy <strong>does not apply</strong> where D-Secure acts as a Data Processor on behalf of our enterprise customers. When enterprise customers use D-Secure's software within their own environments to erase data, the privacy notice and data handling practices of that respective customer apply.
              </p>
            </div>

            <div className="bg-white p-6 border-l-4 border-[#0e7c66] mb-12 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0e7c66]" />
                Important Note on Telemetry & Data Erasure
              </h3>
              <p className="leading-relaxed text-slate-800">
                Our software is designed to securely overwrite storage media locally. <strong>We do not access, view, extract, or upload the sensitive personal user files residing on your physical devices.</strong> Any telemetry data collected is strictly related to hardware identification and diagnostics necessary for generating compliance audit reports and ensuring software functionality.
              </p>
            </div>

            {/* Content */}
            <div className="py-4">
              <div className="text-left">
                
                {/* 1. WHAT INFORMATION DO WE COLLECT? */}
                <section className="mb-10" id="section-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    1. What Information Do We Collect?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Personal Information Provided by You</h3>
                    <p className="leading-relaxed">The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Names, Phone Numbers, Email Addresses, Mailing Addresses, Usernames, and Contact Preferences</li>
                      <li>Authentication data</li>
                      <li>Billing Addresses and Job Titles</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1.1 Sensitive Information</h3>
                    <p className="leading-relaxed">
                      D-Secure doesn't collect sensitive personal information as part of our Services. However, certain information, such as IP address or approximate location data, may be collected automatically through cookies and similar technologies, which may be considered sensitive personal information under applicable laws. We do not seek to collect sensitive personal information unless it is voluntarily provided by you. Where such information is provided, we will process it only for the purposes specified in this Privacy Notice.
                    </p>

                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1.2 Payment Data</h3>
                    <p className="leading-relaxed">
                      We may collect data necessary to process your payment if you choose to make purchases. All payment data is handled and stored securely by our trusted payment processors.
                    </p>

                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1.3 Social Media Login Data</h3>
                    <p className="leading-relaxed">
                      We may provide you with the option to register or sign in using your existing account with social media logins. If you choose to do so, we will receive certain profile information about you from that provider (such as name and email). All personal information that you provide to us must be true, complete, and accurate.
                    </p>

                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1.4 Information Automatically Collected</h3>
                    <p className="leading-relaxed">
                      We automatically collect certain information when you visit, use, or navigate our Services. This information does not reveal your specific identity but may include device and usage information such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, approximate location, and timestamps.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1.5 Information Collected By Us</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Log, Device, and Usage Data:</strong> Collected through server logs and similar technologies for security, troubleshooting, and improving our Services.</li>
                      <li><strong>Location Data:</strong> Approximate location information based on your IP address or device settings.</li>
                    </ul>
                  </div>
                </section>

                {/* 2. HOW DO WE PROCESS YOUR INFORMATION? */}
                <section className="mb-10" id="section-2">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    2. How Do We Process Your Information?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
                      <li>To deliver and facilitate delivery of services to the user.</li>
                      <li>To respond to user inquiries and offer support to users.</li>
                      <li>To send administrative information to you (details about products, changes to terms).</li>
                      <li>To fulfill and manage your orders, payments, returns, and exchanges.</li>
                      <li>To request feedback about your use of our Services.</li>
                      <li>To send you marketing and promotional communications (with your consent).</li>
                      <li>To deliver targeted advertising to you (based on preferences).</li>
                      <li>To protect our Services (including fraud monitoring and prevention).</li>
                      <li>To identify usage trends and determine the effectiveness of our campaigns.</li>
                      <li>To save or protect an individual's vital interest.</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">2.1 Artificial Intelligence and Automated Decision-Making</h3>
                    <p className="leading-relaxed">
                      We may use automated tools, including artificial intelligence (AI), to support diagnostic activities, analyze usage trends, and improve our data sanitization solutions. We do not make decisions that produce legal or similarly significant effects on you based solely on automated processing without meaningful human involvement.
                    </p>
                  </div>
                </section>

                {/* 3. WHAT LEGAL BASES DO WE RELY ON? */}
                <section className="mb-10" id="section-3">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    3. What Legal Bases Do We Rely On To Process Your Personal Information?
                  </h2>
                  <div className="space-y-6 text-slate-800">
                    <p className="leading-relaxed">
                      <em>In Short:</em> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.
                    </p>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">If you are located in the EU or UK:</h3>
                      <p className="leading-relaxed mb-2">The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Consent:</strong> Where you have given permission for a specific purpose. You can withdraw your consent at any time.</li>
                        <li><strong>Performance of a Contract:</strong> To fulfill our contractual obligations to you.</li>
                        <li><strong>Legitimate Interests:</strong> To achieve our legitimate business interests that do not outweigh your fundamental rights and freedoms (e.g., analyzing service usage, supporting marketing, diagnosing problems).</li>
                        <li><strong>Legal Obligations:</strong> To comply with our legal obligations or cooperate with law enforcement.</li>
                        <li><strong>Vital Interests:</strong> To protect your vital interests or those of a third party.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">If you are located in India:</h3>
                      <p className="leading-relaxed mb-2">Under the Digital Personal Data Protection Act, 2023 (DPDP Act):</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Consent:</strong> Given for a specific purpose.</li>
                        <li><strong>Performance of a Contract or Service:</strong> Necessary to provide Services requested by you.</li>
                        <li><strong>Legal Obligations:</strong> Necessary to comply with any law or governmental request in India.</li>
                        <li><strong>Vital Interests:</strong> Necessary to protect life, health, or safety.</li>
                        <li><strong>Legitimate Uses:</strong> Permitted uses including employment, fraud prevention, and network security.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">If you are located in Canada:</h3>
                      <p className="leading-relaxed">
                        We may process your information if you have given us specific permission (express consent) or inferred permission (implied consent). In exceptional cases legally permitted without consent (e.g., fraud detection, subpoena compliance), we will process data in accordance with Canadian laws.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">If you are located in the United States (including California):</h3>
                      <p className="leading-relaxed">
                        Under the CCPA and CPRA, we collect and process personal information for business and commercial purposes, including operating our Services, fulfilling requests, maintaining security, complying with obligations, and marketing (subject to opt-out). We do not sell or share personal information with data brokers.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 4. WHEN AND WITH WHOM DO WE SHARE? */}
                <section className="mb-10" id="section-4">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    4. When and With Whom Do We Share Your Personal Information?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We may need to share your personal information in the following situations:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Service Providers:</strong> Trusted third-party vendors for website hosting, customer service, analytics, email delivery, marketing, and payment processing.</li>
                      <li><strong>Business Transfers:</strong> During negotiations of any merger, sale of company assets, financing, or acquisition.</li>
                      <li><strong>Affiliates:</strong> Our parent company, subsidiaries, or joint venture partners (who are required to honor this Privacy Notice).</li>
                      <li><strong>Legal Obligations:</strong> Where required by law, regulation, or legal process.</li>
                      <li><strong>Protection of Rights:</strong> To protect our rights, prevent fraud, and ensure the safety of our users.</li>
                      <li><strong>Business Partners:</strong> To offer certain products or promotions, only where permitted by law or with consent.</li>
                    </ul>
                  </div>
                </section>

                {/* 5. COOKIES AND TRACKING */}
                <section className="mb-10" id="section-5">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    5. Do We Use Cookies and Other Tracking Technologies?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      <em>In Short:</em> We may use cookies and other tracking technologies to collect and store your information.
                    </p>
                    <p className="leading-relaxed">
                      We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. They help us maintain security, save preferences, and assist with basic site functions. We also permit service providers to use these technologies for analytics and advertising.
                    </p>
                    <p className="leading-relaxed">
                      Where required by applicable law (e.g., GDPR, DPDP Act), we will obtain your consent before using non-essential cookies. You can opt out of targeted advertising where applicable.
                    </p>
                    <p className="leading-relaxed font-semibold">
                      Google Analytics: We may use Google Analytics to track and analyze the use of the Services. You can opt out of being tracked by Google Analytics across all websites by visiting tools.google.com/dlpage/gaoptout.
                    </p>
                  </div>
                </section>

                {/* 6. SOCIAL LOGINS */}
                <section className="mb-10" id="section-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    6. How Do We Handle Your Social Logins?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      If you choose to register or log in to our Services using a social media account (e.g., Google, Apple), we will receive certain profile information from your provider (like name and email). We use this information only for the purposes described in this Privacy Notice. We do not control, and are not responsible for, other uses of your personal information by your third-party provider.
                    </p>
                  </div>
                </section>

                {/* 7. INTERNATIONAL TRANSFERS */}
                <section className="mb-10" id="section-7">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    7. Is Your Information Transferred Internationally?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We operate globally and may transfer your Personal Data to countries other than your country of residence (such as the US, EEA, UK, and India). We do so in accordance with applicable data protection laws.
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Legal Safeguards for International Transfers:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Data Processing Agreements (DPAs):</strong> With all vendors who process data on our behalf.</li>
                      <li><strong>Standard Contractual Clauses (SCCs):</strong> For transfers from the EEA, supplemented by TIAs and encryption.</li>
                      <li><strong>UK Addendum & Swiss Safeguards:</strong> For transfers originating from the UK and Switzerland.</li>
                      <li><strong>Adequacy Decisions:</strong> Relying on decisions issued by the European Commission or UK Government.</li>
                      <li><strong>India DPDP Act Compliance:</strong> Execution of DPAs and ensuring transfers are to permitted jurisdictions.</li>
                      <li><strong>US CCPA/CPRA Compliance:</strong> Providing opt-out mechanisms and honoring GPC signals.</li>
                    </ul>
                  </div>
                </section>

                {/* 8. DATA RETENTION */}
                <section className="mb-10" id="section-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    8. How Long Do We Keep Your Information?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We retain your Personal Data only for as long as necessary to fulfill the purposes for which it was collected, including to comply with legal, regulatory, accounting, tax, fraud-prevention, and reporting obligations. When no longer required, we will securely delete, anonymize, or isolate your Personal Data.
                    </p>
                    
                    <div className="overflow-x-auto mt-4 border border-[#d0d5dc]">
                      <table className="min-w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-[#d0d5dc]">
                            <th className="px-4 py-3 font-semibold text-slate-900 border-r border-[#d0d5dc]">Category of Data</th>
                            <th className="px-4 py-3 font-semibold text-slate-900 border-r border-[#d0d5dc]">Typical Retention Period</th>
                            <th className="px-4 py-3 font-semibold text-slate-900">Purpose / Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d0d5dc]">
                          <tr>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Account Information</td>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Active + up to 3 years after closure</td>
                            <td className="px-4 py-3">Account management, legal compliance</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Transactional & Billing Data</td>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Up to 10 years</td>
                            <td className="px-4 py-3">Tax, accounting, audit</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Customer Support Records</td>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Up to 3 years</td>
                            <td className="px-4 py-3">Service quality and issue resolution</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Marketing Preferences</td>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Until consent is withdrawn</td>
                            <td className="px-4 py-3">Marketing compliance</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Usage Data & Logs</td>
                            <td className="px-4 py-3 border-r border-[#d0d5dc]">Up to 2 years</td>
                            <td className="px-4 py-3">Security monitoring and analytics</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* 9. KEEPING INFORMATION SAFE */}
                <section className="mb-10" id="section-9">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    9. How Do We Keep Your Information Safe?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We have adequate organizational and technical processes and procedures in place to protect your personal information, including encryption in transit and at rest, role-based access controls, and network security. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure. We cannot guarantee that unauthorized third parties will not be able to defeat our security.
                    </p>
                  </div>
                </section>

                {/* 10. MINORS */}
                <section className="mb-10" id="section-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    10. Do We Collect Information From Minors?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      <em>In Short:</em> We do not knowingly collect data from or market to children under 18 years of age.
                    </p>
                    <p className="leading-relaxed">
                      By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction. If we learn that personal information from users under 18 has been collected, we will deactivate the account and promptly delete such data from our records.
                    </p>
                  </div>
                </section>

                {/* 11. PRIVACY RIGHTS */}
                <section className="mb-10" id="section-11">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    11. What Are Your Privacy Rights?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Depending on your location (EEA, UK, Switzerland, Canada, India, or certain US states), you may have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Request access to your personal information and obtain a copy.</li>
                      <li>Request correction or updating of inaccurate information.</li>
                      <li>Request deletion (erasure) of your personal information.</li>
                      <li>Request restriction of processing or object to processing.</li>
                      <li>Request data portability.</li>
                      <li>Withdraw consent at any time.</li>
                      <li>Opt out of the sale or sharing of personal info for targeted advertising.</li>
                      <li>Register a grievance or complaint.</li>
                    </ul>
                    <p className="leading-relaxed">
                      To exercise these rights, contact us at privacy@dsecuretech.com. You can also unsubscribe from our marketing emails at any time.
                    </p>
                  </div>
                </section>

                {/* 12. DO NOT TRACK */}
                <section className="mb-10" id="section-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    12. Controls For Do-Not-Track Features
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Most web browsers include a Do-Not-Track ("DNT") feature. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
                    </p>
                  </div>
                </section>

                {/* 13. US RIGHTS */}
                <section className="mb-10" id="section-13">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    13. Do United States Residents Have Specific Privacy Rights?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access, correction, and deletion of your personal data.
                    </p>
                    <p className="leading-relaxed">
                      <strong>California CCPA/CPRA:</strong> You have the right to know what personal info is collected, request its deletion, opt out of its sale/sharing, and not be discriminated against. We do not sell or share personal information with data brokers.
                    </p>
                  </div>
                </section>

                {/* 14. OTHER REGIONS */}
                <section className="mb-10" id="section-14">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    14. Do Other Regions Have Specific Privacy Rights?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">India (DPDP Act, 2023)</h3>
                      <p className="leading-relaxed">
                        You have the right to know what data we collect, request access, correction, erasure, withdraw consent, nominate a representative in case of incapacity, and raise grievances.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Australia (Privacy Act 1988)</h3>
                      <p className="leading-relaxed">
                        You have the right to request access to or correction of your personal information. Complaints can be directed to the Office of the Australian Information Commissioner.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">South Africa (POPIA)</h3>
                      <p className="leading-relaxed">
                        You can request access or correction. Unresolved complaints can be directed to The Information Regulator (South Africa).
                      </p>
                    </div>
                  </div>
                </section>

                {/* 15. HANDLING DATA SUBJECT REQUESTS */}
                <section className="mb-10" id="section-15">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    15. How Do We Handle Your Data Subject Requests?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      When we receive a request to exercise your data subject rights, we will verify your identity, acknowledge your request promptly, and respond within one calendar month of receipt.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Verification:</strong> We may request sufficient information to confirm your identity before processing the request.</li>
                      <li><strong>Extension:</strong> Where your request is complex or you have made multiple requests, we may extend this period by a further two months and will notify you within the first month.</li>
                      <li><strong>Fees:</strong> We will not charge a fee for handling your request unless the request is manifestly unfounded or excessive.</li>
                    </ul>
                  </div>
                </section>

                {/* 16. UPDATES TO THIS NOTICE */}
                <section className="mb-10" id="section-16">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    16. Do We Make Updates To This Notice?
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      We review and update this Privacy Notice periodically to reflect changes in our data processing practices, applicable law, or regulatory guidance. The updated version will be indicated by an updated "Last updated" date at the top of this document.
                    </p>
                  </div>
                </section>

                {/* 17. CONTACT & COMPLAINTS */}
                <section className="mb-10" id="section-17">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    17. Questions, Concerns, and Complaints
                  </h2>
                  <div className="bg-white border border-[#d0d5dc] rounded-none p-6 md:p-8">
                    <p className="text-slate-800 leading-relaxed mb-6">
                      Based on applicable laws, you may have the right to request access to the personal information we collect, correct inaccuracies, or delete it. To request to review, update, or delete your data, or if you have questions about this notice, please contact our Grievance / Data Protection Officer at:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center bg-white border border-[#d0d5dc] rounded-none shrink-0">
                          <Mail className="w-5 h-5 text-[#0e7c66]" />
                        </span>
                        <div>
                          <p className="text-sm text-slate-500 mb-0.5">Email (Privacy & Data Protection)</p>
                          <a href="mailto:privacy@dsecuretech.com" className="text-[#0e7c66] hover:underline font-medium">
                            privacy@dsecuretech.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center bg-white border border-[#d0d5dc] rounded-none shrink-0">
                          <MapPin className="w-5 h-5 text-[#0e7c66]" />
                        </span>
                        <div>
                          <p className="text-sm text-slate-500 mb-0.5">Corporate Headquarters</p>
                          <span className="text-slate-800 font-medium block">
                            D-Secure Technologies Pvt. Ltd.<br/>
                            Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005
                          </span>
                        </div>
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

export default PrivacyPolicy;