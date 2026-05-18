import React, { useState } from "react";
import { 
  ClipboardCheck, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Circle,
  Download,
  Scale,
  AlertCircle
} from "lucide-react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useFormSubmission } from "../../hooks/useFormSubmission";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

const GDPRErasureChecklistPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "policy",
      title: "Data Erasure Policy",
      description: "Do you have a clear internal policy for processing 'Right to Erasure' requests?",
      checked: false
    },
    {
      id: "media",
      title: "Certified Sanitization",
      description: "Are you using software that provides tamper-proof certificates of erasure for each device?",
      checked: false
    },
    {
      id: "backup",
      title: "Backup & Archive Purge",
      description: "Can you verify that data is also removed from secondary backups and archive storage?",
      checked: false
    },
    {
      id: "thirdparty",
      title: "Third-Party Notification",
      description: "Is there a process to notify downstream processors to erase shared data?",
      checked: false
    },
    {
      id: "log",
      title: "Audit Log & Record Keeping",
      description: "Do you maintain a centralized audit log of all erasure outcomes for DPO review?",
      checked: false
    }
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);
  const [isSuccess, setIsSuccess] = useState(false);

  const { submitForm, isSubmitting } = useFormSubmission({
    requiredFields: ["email"]
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({
      ...contactForm,
      formType: "GDPR Checklist Content Lead",
      calc_gdpr_progress: `${progress}%`,
      calc_missing_points: items.filter(i => !i.checked).map(i => i.title).join(", ")
    });
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Schemas ko directStructuredData se pass karo — PAGE_SEO schemas override nahi honge, SEOHead merge karega */}
      <SEOHead 
        seo={getSEOForPage("gdpr-erasure-checklist")}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GDPR Right to Erasure Compliance Checklist",
            "description": "Interactive audit checklist for GDPR Article 17 'Right to Erasure' compliance readiness.",
            "applicationCategory": "LegalApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "provider": { "@type": "Organization", "name": "D-Secure" },
            "url": "https://dsecuretech.com/tools/gdpr-erasure-checklist",
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Audit GDPR Right to Erasure Compliance",
            "step": [
              { "@type": "HowToStep", "position": 1, "name": "Review Policy", "text": "Check whether your organization has a documented data erasure policy for handling Right to Erasure requests." },
              { "@type": "HowToStep", "position": 2, "name": "Verify Sanitization Method", "text": "Confirm you use certified software that provides tamper-proof erasure certificates." },
              { "@type": "HowToStep", "position": 3, "name": "Check Third Parties", "text": "Ensure downstream processors are notified and can verify data deletion." }
            ]
          }
        ]}
      />

      {/* Breadcrumbs — Google navigation signal */}
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/tools/gdpr-erasure-checklist" },
            { name: "GDPR Erasure Checklist", path: "/tools/gdpr-erasure-checklist", isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        
        <div className="container-app relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Scale className="w-4 h-4" />
              Article 17 Compliance Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Right to Erasure <span className="text-emerald-500">Compliance Audit: Standardize Your GDPR Data Sanitization</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              GDPR Article 17 mandates that organizations must erase personal data upon request. Use this interactive checklist to audit your technical readiness for 'The Right to be Forgotten'.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Expansion - Technical Depth */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Technical Requirements for GDPR Article 17 Compliance</h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <p>
                  Compliance with the **Right to Erasure (Article 17)** is not merely a legal procedure; it is a technical challenge that requires precision in data sanitization. Under GDPR, simply deleting a file or reformatting a drive is insufficient. These methods only remove the pointers to the data, leaving the actual binary information intact and recoverable by specialized software.
                </p>
                <p>
                  To achieve "irreversible erasure" as expected by Supervisory Authorities, organizations must use certified data erasure software that overwrites data across all sectors of the storage media. This includes hidden areas such as the Host Protected Area (HPA) and Device Configuration Overlay (DCO) which often harbor sensitive residual data.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  A critical pillar of GDPR compliance is the **Principle of Accountability**. This means that when a data subject requests erasure, the Data Controller must be able to prove that the erasure occurred. D-Secure facilitates this by generating automated, tamper-proof certificates of erasure. These certificates contain detailed hardware information, timestamps, and the specific sanitization method used (e.g., NIST 800-88 Purge).
                </p>
                <p>
                  Failing to provide this level of technical verification can lead to severe penalties. By integrating D-Secure into your decommissioning workflow, you ensure that every asset—from servers to mobile devices—meets the highest global standards for data destruction, protecting both your customers' privacy and your organization's reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Content */}
      <section className="py-16 px-6 -mt-12">
        <div className="container-app max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Checklist */}
            <div className="lg:col-span-12">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                {/* Progress Header */}
                <div className="bg-slate-50 p-8 border-b border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                        Audit Progress
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">Check the items that your organization currently has in place.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-600">{progress}%</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Compliance Score</div>
                      </div>
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full p-8 text-left transition-all hover:bg-slate-50/80 flex items-start gap-6 group ${
                        item.checked ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <div className={`shrink-0 mt-1 ${item.checked ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'}`}>
                        {item.checked ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold mb-2 transition-colors ${
                          item.checked ? 'text-emerald-900' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm leading-relaxed transition-colors ${
                          item.checked ? 'text-emerald-700/80' : 'text-slate-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="p-10 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Get Your Audit Report</h4>
                      <p className="text-slate-400 text-sm">Download the full technical requirements for GDPR sanitization.</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    {isSuccess ? (
                      <div className="flex items-center gap-3 text-emerald-400 font-bold bg-emerald-400/10 px-6 py-3 rounded-xl border border-emerald-400/20">
                        <CheckCircle2 className="w-5 h-5" />
                        Checklist Sent to Email
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                          required
                          type="email"
                          placeholder="Email address"
                          className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
                          value={contactForm.email}
                          onChange={e => setContactForm({...contactForm, email: e.target.value})}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-emerald-500 text-slate-900 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Sending...' : 'Get PDF'}
                          <Download className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Tips */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Penalties</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Non-compliance with 'Right to Erasure' can lead to fines up to 4% of annual global turnover or €20 million.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Verifiability</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Simply deleting file pointers is not enough. GDPR mandates verifiable data sanitization that is permanent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Requirement</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Controllers must be able to prove erasure occurred to satisfy audit requests from Supervisory Authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Commentary */}
      <section className="py-20 px-6 bg-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-emerald-500 pl-6 uppercase tracking-tighter">Expert Insights</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <p className="text-slate-600 leading-relaxed italic">
                \"Article 17 compliance is more than just a legal requirement; it's a technical demonstration of respect for data privacy. Organizations that automate their data erasure lifecycle don't just avoid fines—they build consumer trust through verifiable transparency.\"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center text-slate-500 font-bold">DS</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">D-Secure Compliance Team</div>
                  <div className="text-xs text-slate-400">Governance, Risk & Compliance Division</div>
                </div>
              </div>
            </div>

            {/* Additional Enrichment Section */}
            {/* Is section ko GDPR ke 'Accountability Principle' ko samjhane ke liye add kiya gaya hai */}
            <div className="prose prose-slate max-w-none mt-16 border-t border-slate-100 pt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">The Role of Data Sanitization in the GDPR Accountability Framework</h3>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  At the heart of the GDPR lies the Principle of Accountability (Article 5(2)), which requires organizations to not only comply with data protection principles but also to be able to demonstrate that compliance at any time. When it comes to the "Right to Erasure," the ability to prove that data has been permanently and irreversibly destroyed is paramount. A simple verbal confirmation or an unverified internal log is often insufficient to satisfy a Supervisory Authority's audit. Organizations must implement technical measures that provide deterministic proof of sanitization, ensuring that the lifecycle of personal data is closed with the same level of security with which it was opened.
                </p>
                <p>
                  This accountability extends to the management of third-party data processors. Under Article 28, Data Controllers are responsible for ensuring that their processors also adhere to strict data protection standards, including secure disposal. By utilizing a standardized erasure protocol and requiring tamper-proof certificates of erasure from all partners in the supply chain, organizations can mitigate the risk of "downstream" data leaks. D-Secure's centralized reporting platform allows for the seamless aggregation of these certificates, providing a unified view of an organization's compliance posture across all physical and virtual storage assets, regardless of their location.
                </p>
                <p>
                  Furthermore, a risk-based approach to sanitization allows organizations to tailor their disposal methods to the sensitivity of the data and the type of media involved. While "Clear" level sanitization might be appropriate for low-risk data on internal assets, high-sensitivity records on mobile devices or cloud-based LUNs demand "Purge" or "Cryptographic Erasure" to ensure absolute security. Documenting these decision-making processes is a key part of the Accountability Framework. By following the steps in this checklist and utilizing D-Secure's professional tools, your organization can move from a reactive "hope-for-the-best" strategy to a proactive, audit-ready compliance model that stands up to the most rigorous legal scrutiny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPRErasureChecklistPage;
