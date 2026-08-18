import { useEffect } from 'react';
import React from 'react';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import { getSEOForPage } from '../utils/seo';
import {
  ScrollText,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  Scale,
  FileText,
  ChevronRight,
} from 'lucide-react';

// TOC sections list
const tocSections = [
  { id: 'agreement',            title: '1. Agreement to Terms' },
  { id: 'accounts',             title: '2. User Accounts & Registration' },
  { id: 'prohibited',           title: '3. Prohibited Activities' },
  { id: 'use-license',          title: '4. Use License' },
  { id: 'intellectual-property',title: '5. Intellectual Property' },
  { id: 'privacy',              title: '6. Privacy Policy' },
  { id: 'payment',              title: '7. Payment & Refund Terms' },
  { id: 'disclaimer',           title: '8. Disclaimer' },
  { id: 'limitations',          title: '9. Limitations of Liability' },
  { id: 'indemnification',      title: '10. Indemnification' },
  { id: 'data-security',        title: '11. Data & Security' },
  { id: 'termination',          title: '12. Termination of Service' },
  { id: 'accuracy',             title: '13. Accuracy of Materials' },
  { id: 'links',                title: '14. Links' },
  { id: 'dispute',              title: '15. Dispute Resolution' },
  { id: 'modifications',        title: '16. Modifications' },
  { id: 'severability',         title: '17. Severability' },
  { id: 'governing-law',        title: '18. Governing Law' },
  { id: 'contact',              title: '19. Contact Information' },
];

// Summary cards — key points at a glance
const summaryCards = [
  {
    icon: ShieldCheck,
    title: 'Fair Use',
    desc: 'Use D-Secure services responsibly and in compliance with all applicable laws.',
  },
  {
    icon: Lock,
    title: 'Data Protection',
    desc: 'Your data is protected with industry-standard security measures at all times.',
  },
  {
    icon: Scale,
    title: 'Legal Framework',
    desc: 'These terms are governed by Indian law, jurisdiction in New Delhi.',
  },
  {
    icon: FileText,
    title: 'EULA Applies',
    desc: 'Software usage is additionally governed by our End User License Agreement.',
  },
];

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section pe smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHeadNative seo={getSEOForPage('terms-of-service')} />

      <div className="min-h-screen bg-white pt-24 pb-16 text-left">
        <div className="container-responsive">
          <div className="max-w-7xl mx-auto">

            {/* ── Header ── */}
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <ScrollText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Terms of Service
              </h1>
              <p className="text-sm font-semibold text-[#0e7c66] tracking-wider uppercase mb-4">
                Effective from August 2026
              </p>
              <p className="text-lg text-slate-800 leading-relaxed max-w-2xl mb-10">
                D-Secure Terms of Service: Legal Agreement &amp; Usage Policies
              </p>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                {summaryCards.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="border border-[#d0d5dc] p-5 bg-slate-50"
                  >
                    <div className="inline-flex items-center justify-center w-9 h-9 bg-[#0e7c66] mb-3 rounded-none">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm">{title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Two-column layout ── */}
            <div className="flex gap-10 items-start">

              {/* Sticky TOC sidebar */}
              <aside className="hidden lg:block w-60 shrink-0 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="border border-[#d0d5dc] p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Table of Contents
                  </p>
                  <nav className="space-y-0.5">
                    {tocSections.map(({ id, title }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className="w-full text-left text-xs text-slate-700 hover:text-[#0e7c66] py-1.5 px-2 hover:bg-emerald-50 transition-colors flex items-start gap-1"
                      >
                        <ChevronRight className="w-3 h-3 shrink-0 text-[#0e7c66] mt-0.5" />
                        {title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* ── Main Content ── */}
              <div className="flex-1 min-w-0 py-4">

                {/* 1. Agreement to Terms */}
                <section id="agreement" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    1. Agreement to Terms
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      By accessing or using D-Secure's website and services, you agree to be bound by
                      these Terms of Service and all applicable laws and regulations. If you do not agree
                      with any of these terms, you are prohibited from using our services.
                    </p>
                    <p className="leading-relaxed">
                      These Terms apply to all visitors, users, customers, and others who access or use
                      the D-Secure platform, software, and associated services.
                    </p>
                  </div>
                </section>

                {/* 2. User Accounts */}
                <section id="accounts" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    2. User Accounts &amp; Registration
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      To access certain features of our services, you may be required to register for an
                      account. You agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate, current, and complete information during registration.</li>
                      <li>Maintain and promptly update your account information.</li>
                      <li>Keep your password confidential and not share it with third parties.</li>
                      <li>Notify D-Secure immediately of any unauthorized use of your account.</li>
                      <li>Accept responsibility for all activities that occur under your account.</li>
                    </ul>
                    <p className="leading-relaxed">
                      D-Secure reserves the right to suspend or terminate accounts that violate these
                      Terms or are found to be providing false information.
                    </p>
                  </div>
                </section>

                {/* 3. Prohibited Activities */}
                <section id="prohibited" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    3. Prohibited Activities
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      You agree not to engage in any of the following activities:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Using the service for any unlawful purpose or in violation of any regulations.</li>
                      <li>Attempting to gain unauthorized access to any portion of D-Secure's systems or networks.</li>
                      <li>Transmitting viruses, malware, or any other malicious code.</li>
                      <li>Interfering with or disrupting the integrity or performance of the service.</li>
                      <li>Collecting or harvesting data without explicit written consent.</li>
                      <li>Using automated means (bots, scrapers) to access the platform without authorization.</li>
                      <li>Impersonating any person or entity, or misrepresenting your affiliation.</li>
                      <li>Uploading or distributing content that is unlawful, defamatory, or infringing.</li>
                    </ul>
                  </div>
                </section>

                {/* 4. Use License */}
                <section id="use-license" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    4. Use License
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Permission is granted to temporarily download one copy of D-Secure materials for
                      personal, non-commercial transitory viewing only. This is the grant of a license,
                      not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Modify or copy the materials.</li>
                      <li>Use the materials for any commercial purpose or public display.</li>
                      <li>Attempt to reverse engineer any software contained on the website.</li>
                      <li>Remove any copyright or proprietary notations from the materials.</li>
                    </ul>
                    <p className="leading-relaxed">
                      For software-specific usage rights, please refer to our{' '}
                      <a href="/eula" className="text-[#0e7c66] hover:underline font-semibold">
                        End User License Agreement (EULA)
                      </a>.
                    </p>
                  </div>
                </section>

                {/* 5. Intellectual Property */}
                <section id="intellectual-property" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    5. Intellectual Property
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      The D-Secure name, logo, software, documentation, website content, and all related
                      intellectual property rights are owned by or licensed to D-Secure Technologies
                      Pvt. Ltd. All rights are reserved.
                    </p>
                    <p className="leading-relaxed">
                      You are prohibited from using D-Secure's trademarks, trade names, service marks,
                      or logos without prior written permission. Any unauthorized use may constitute
                      trademark infringement and unfair competition under applicable law.
                    </p>
                    <p className="leading-relaxed">
                      User-submitted content (feedback, suggestions) grants D-Secure a perpetual,
                      royalty-free, worldwide license to use such content for service improvement
                      purposes.
                    </p>
                  </div>
                </section>

                {/* 6. Privacy Policy */}
                <section id="privacy" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    6. Privacy Policy
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Your use of D-Secure's services is also governed by our{' '}
                      <a href="/privacy-policy" className="text-[#0e7c66] hover:underline font-semibold">
                        Privacy Policy
                      </a>
                      , which is incorporated into these Terms by reference. By using our services, you
                      consent to the data practices described therein.
                    </p>
                    <p className="leading-relaxed">
                      D-Secure collects and processes personal data in accordance with applicable data
                      protection laws, including India's Information Technology Act, 2000 and the Digital
                      Personal Data Protection Act, 2023.
                    </p>
                  </div>
                </section>

                {/* 7. Payment & Refund Terms */}
                <section id="payment" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    7. Payment &amp; Refund Terms
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      Certain D-Secure services require payment. By purchasing a subscription or license,
                      you agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate and complete billing information.</li>
                      <li>Authorize D-Secure to charge applicable fees to your payment method.</li>
                      <li>Subscription fees are billed in advance on a recurring basis (monthly or annually).</li>
                      <li>All prices are exclusive of applicable taxes unless stated otherwise.</li>
                    </ul>
                    <p className="leading-relaxed">
                      <strong>No Refund Policy:</strong> All purchases, subscriptions, and license fees
                      paid to D-Secure are strictly non-refundable. Once a payment is made, no refunds,
                      credits, or exchanges will be issued under any circumstances, including but not
                      limited to cancellation of subscription, unused license periods, dissatisfaction
                      with the service, or accidental purchase.
                    </p>
                    <p className="leading-relaxed">
                      D-Secure reserves the right to modify pricing with 30 days' prior notice.
                      Continued use of the service after the notice period constitutes acceptance of the
                      new pricing.
                    </p>
                  </div>
                </section>

                {/* 8. Disclaimer */}
                <section id="disclaimer" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    8. Disclaimer
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      The materials on D-Secure's website are provided on an 'as is' basis. D-Secure
                      makes no warranties, expressed or implied, and hereby disclaims and negates all
                      other warranties including without limitation, implied warranties or conditions of
                      merchantability, fitness for a particular purpose, or non-infringement of
                      intellectual property or other violation of rights.
                    </p>
                  </div>
                </section>

                {/* 9. Limitations of Liability */}
                <section id="limitations" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    9. Limitations of Liability
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      In no event shall D-Secure or its suppliers be liable for any damages (including,
                      without limitation, damages for loss of data or profit, or due to business
                      interruption) arising out of the use or inability to use D-Secure's services, even
                      if D-Secure has been notified of the possibility of such damage.
                    </p>
                    <p className="leading-relaxed">
                      D-Secure's total aggregate liability for all claims under these Terms shall not
                      exceed the fees paid by you in the 12 months preceding the event giving rise to the
                      claim.
                    </p>
                  </div>
                </section>

                {/* 10. Indemnification */}
                <section id="indemnification" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    10. Indemnification
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      You agree to indemnify, defend, and hold harmless D-Secure Technologies Pvt. Ltd.,
                      its officers, directors, employees, agents, and licensors from and against any and
                      all claims, damages, obligations, losses, liabilities, costs, and expenses
                      (including attorney's fees) arising from:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Your use of and access to the D-Secure services.</li>
                      <li>Your violation of any term of these Terms of Service.</li>
                      <li>Your violation of any third-party rights, including intellectual property or privacy rights.</li>
                      <li>Any content you submit, post, or transmit through our services.</li>
                    </ul>
                  </div>
                </section>

                {/* 11. Data & Security */}
                <section id="data-security" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    11. Data &amp; Security
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      D-Secure implements industry-standard technical and organizational measures to
                      safeguard your data. However, no method of electronic transmission or storage is
                      100% secure. You acknowledge that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You are responsible for maintaining the security of your account credentials.</li>
                      <li>D-Secure will notify affected users of any data breach in accordance with applicable law.</li>
                      <li>You agree not to store sensitive or regulated data on D-Secure systems except as expressly permitted.</li>
                      <li>D-Secure reserves the right to delete inactive account data after 12 months of inactivity, with prior notice.</li>
                    </ul>
                  </div>
                </section>

                {/* 12. Termination */}
                <section id="termination" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    12. Termination of Service
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      D-Secure reserves the right to suspend or terminate your access to the service at
                      its sole discretion, with or without notice, for conduct that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Violates these Terms of Service.</li>
                      <li>Is harmful to other users, D-Secure, or third parties.</li>
                      <li>Involves fraudulent, abusive, or otherwise illegal activity.</li>
                    </ul>
                    <p className="leading-relaxed">
                      Upon termination, your right to use the service will immediately cease. You may
                      also terminate your account at any time by contacting our support team. Termination
                      does not entitle you to a refund of any prepaid fees.
                    </p>
                  </div>
                </section>

                {/* 13. Accuracy of Materials */}
                <section id="accuracy" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    13. Accuracy of Materials
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      The materials appearing on D-Secure's website could include technical,
                      typographical, or photographic errors. D-Secure does not warrant that any of the
                      materials on its website are accurate, complete, or current. D-Secure may make
                      changes to the materials contained on its website at any time without notice.
                    </p>
                  </div>
                </section>

                {/* 14. Links */}
                <section id="links" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    14. Links
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      D-Secure has not reviewed all of the sites linked to our website and is not
                      responsible for the contents of any such linked site. The inclusion of any link
                      does not imply endorsement by D-Secure of the site. Use of any such linked website
                      is at the user's own risk.
                    </p>
                  </div>
                </section>

                {/* 15. Dispute Resolution */}
                <section id="dispute" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    15. Dispute Resolution
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      In the event of any dispute, controversy, or claim arising out of or relating to
                      these Terms, the parties shall first attempt to resolve it amicably through
                      good-faith negotiations.
                    </p>
                    <p className="leading-relaxed">
                      If the dispute cannot be resolved within 30 days of written notice, the matter
                      shall be submitted to binding arbitration under the Arbitration and Conciliation
                      Act, 1996 (India). The seat of arbitration shall be New Delhi, India, and the
                      language of arbitration shall be English.
                    </p>
                    <p className="leading-relaxed">
                      Nothing herein shall prevent either party from seeking emergency injunctive relief
                      from a court of competent jurisdiction.
                    </p>
                  </div>
                </section>

                {/* 16. Modifications */}
                <section id="modifications" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    16. Modifications
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      D-Secure may revise these Terms of Service at any time without notice. By using
                      this website, you are agreeing to be bound by the then-current version of these
                      Terms of Service. We encourage you to review these Terms periodically.
                    </p>
                  </div>
                </section>

                {/* 17. Severability */}
                <section id="severability" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    17. Severability
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      If any provision of these Terms of Service is found to be unlawful, void, or
                      unenforceable, that provision shall be deemed severable and shall not affect the
                      validity and enforceability of any remaining provisions.
                    </p>
                  </div>
                </section>

                {/* 18. Governing Law */}
                <section id="governing-law" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    18. Governing Law
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      These terms and conditions are governed by and construed in accordance with the
                      laws of India and you irrevocably submit to the exclusive jurisdiction of the
                      courts in Delhi / New Delhi, India.
                    </p>
                  </div>
                </section>

                {/* 19. Contact Information */}
                <section id="contact" className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                    19. Contact Information
                  </h2>
                  <div className="space-y-4 text-slate-800">
                    <p className="leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us:
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
                        <span>Hyderabad Gate, BHU, Varanasi, Uttar Pradesh, India 221005</span>
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
}
