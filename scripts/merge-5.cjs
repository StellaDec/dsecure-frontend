const fs = require('fs');
const path = require('path');

const updates = [
  {
    file: 'DataSanitizationComplianceBlog.tsx',
    newTitle: 'Statutory and Regulatory Compliance in Data Erasure',
    newDesc: 'Data erasure is governed by strict statutory and regulatory frameworks globally. Learn how to map your ITAD process to GDPR, CCPA, and HIPAA compliance mandates.',
    article: `
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              Non-compliance is no longer just a slap on the wrist; it's an existential threat to the business. Global regulatory frameworks have standardized on one absolute truth: when data reaches its end of life, it must be demonstrably and irreversibly destroyed.
            </p>

            <div className="text-slate-700 leading-relaxed space-y-8">
              <p>
                Navigating the complex web of international data privacy laws can be daunting for IT and compliance officers. However, regardless of the specific acronym (GDPR, CCPA, HIPAA, PIPEDA), the core requirement for IT Asset Disposition (ITAD) remains remarkably consistent across all jurisdictions: <strong>Defensible Destruction.</strong>
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Mapping Erasure to Regulatory Mandates</h2>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8">
                <h3 className="font-bold text-slate-900 mb-4">Key Compliance Frameworks:</h3>
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>GDPR (Europe):</strong> Article 17 (Right to Erasure) demands that organizations not only delete personal data upon request but possess the technical capability to prove that the data cannot be recovered by forensic means.</li>
                  <li><strong>CCPA / CPRA (California):</strong> Imposes strict penalties for data breaches resulting from a failure to maintain reasonable security procedures, which explicitly includes the secure disposal of customer records.</li>
                  <li><strong>HIPAA (Healthcare):</strong> The Security Rule mandates implementing physical and technical safeguards for the final disposition of electronic protected health information (ePHI).</li>
                  <li><strong>PCI-DSS (Financial):</strong> Requirement 9.8 dictates that all media must be destroyed when it is no longer needed for business or legal reasons to prevent cardholder data from being compromised.</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The "Proof" Problem</h2>
              <p>
                The most common point of failure during a regulatory audit is not that the organization failed to wipe the drives, but that they failed to document it. In the eyes of a regulator, an undocumented wipe never happened.
              </p>

              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 my-12">
                <h3 className="text-xl font-bold mb-4 text-emerald-900">
                  Automating Compliance with D-Secure
                </h3>
                <p className="text-emerald-800 mb-0">
                  D-Secure bridges the gap between IT operations and legal compliance. Our platform enforces NIST 800-88 standards programmatically, ensuring that every erasure event automatically generates a cryptographically signed, tamper-proof certificate that satisfies even the most rigorous regulatory audits.
                </p>
              </div>
            </div>`
  }
];

for (const update of updates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', 'blog', update.file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/title:\s*["'].*?["']/, 'title: "' + update.newTitle + '"');
  content = content.replace(/excerpt:\s*["'].*?["']/, 'excerpt: "' + update.newDesc + '"');

  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  content = content.replace(articleRegex, '<article className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">\\n' + update.article + '\\n            </article>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + update.file);
}
