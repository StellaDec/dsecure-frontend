const fs = require('fs');
const path = require('path');

const updates = [
  {
    file: 'CryptographicEraseBlog.tsx',
    newTitle: 'Cryptographic Erasure & NIST 800-88: The Complete Guide',
    newDesc: 'Learn how cryptographic erasure (Crypto Erase) meets NIST 800-88 Purge standards, providing the fastest and most secure method for sanitizing self-encrypting drives (SEDs).',
    article: `
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              As self-encrypting drives (SEDs) and NVMe SSDs become the enterprise standard, traditional overwriting is obsolete. Cryptographic Erasure (CE) offers a nearly instantaneous, NIST-compliant method for data sanitization by securely destroying the media encryption key (MEK).
            </p>

            <div className="text-slate-700 leading-relaxed space-y-8">
              <p>
                Modern enterprise storage relies heavily on solid-state media. However, the wear-leveling algorithms that extend SSD lifespans make traditional data overwriting (like the DoD 5220.22-M 3-pass wipe) ineffective and potentially damaging. <strong>Cryptographic Erasure (CE)</strong> solves this by targeting the encryption key rather than the encrypted data itself.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How Cryptographic Erasure Works</h2>
              <p>
                In a Self-Encrypting Drive (SED), all data is encrypted at rest using a Media Encryption Key (MEK). When a CE command is issued, the drive generates a new, randomized MEK, permanently discarding the old one. 
              </p>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8">
                <h3 className="font-bold text-slate-900 mb-4">The 3-Step CE Process:</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>Command Initiation:</strong> D-Secure software issues a secure crypto-erase command via the ATA/NVMe interface.</li>
                  <li><strong>Key Destruction:</strong> The storage controller deletes the current Media Encryption Key (MEK).</li>
                  <li><strong>Verification & Reporting:</strong> D-Secure validates the key deletion and generates a tamper-proof, cryptographically signed certificate of erasure.</li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">NIST 800-88 Compliance (Clear vs. Purge)</h2>
              <p>
                The National Institute of Standards and Technology (NIST) Special Publication 800-88 Revision 1 is the gold standard for data sanitization. It defines three levels: Clear, Purge, and Destroy.
              </p>
              
              <div className="overflow-x-auto my-8">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-900">
                      <th className="p-4 border-b border-emerald-200 font-bold">Sanitization Level</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">Methodology</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-4 font-semibold">Clear</td>
                      <td className="p-4">Standard logical overwriting (1-pass)</td>
                      <td className="p-4">Low-security data, older HDDs</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="p-4 font-semibold text-emerald-700">Purge (Crypto Erase)</td>
                      <td className="p-4">Destruction of the encryption key</td>
                      <td className="p-4">High-security data, SSDs, SEDs, NVMe</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Destroy</td>
                      <td className="p-4">Physical shredding/pulverizing</td>
                      <td className="p-4">End-of-life drives failing CE protocols</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Why Overwriting Fails on SSDs</h2>
              <p>
                Due to over-provisioning and wear-leveling, up to 20% of an SSD's capacity may be hidden from the operating system at any given time. A standard overwrite command cannot reach these hidden blocks, leaving fragmented data accessible to forensic recovery tools. CE bypasses this limitation because the MEK encrypts <em>all</em> blocks, visible or hidden.
              </p>

              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 my-12">
                <h3 className="text-xl font-bold mb-4 text-emerald-900">
                  The D-Secure Advantage
                </h3>
                <p className="text-emerald-800 mb-0">
                  D-Secure System Cleaner automatically detects SED capabilities and applies the optimal NIST Purge standard. If a drive does not support CE, our software dynamically fails over to a block-level secure erase (SE) or multi-pass overwrite, ensuring 100% data destruction with comprehensive audit trails.
                </p>
              </div>
            </div>`
  },
  {
    file: 'M1MacErasureIssuesBlog.tsx',
    newTitle: 'M1/M2 Mac Data Erasure: Overcoming Apple Silicon Reset Challenges',
    newDesc: 'Discover the known issues with wiping Apple Silicon (M1/M2/M3) Macs, why standard Erase All Content and Settings (EACAS) falls short for enterprise compliance, and how D-Secure bridges the gap.',
    article: `
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              Apple's transition to Apple Silicon (M1, M2, M3) introduced the T2 security chip architecture directly into the SoC. While this enhances hardware security, it has completely broken traditional IT asset disposition (ITAD) workflows, making standard USB-bootable erasure tools obsolete.
            </p>

            <div className="text-slate-700 leading-relaxed space-y-8">
              <p>
                For decades, IT administrators relied on bootable USB drives (like DBAN or custom Linux environments) to wipe Mac hard drives before redeployment or disposal. With Apple Silicon, the Secure Enclave explicitly blocks booting from external, unsigned operating systems, rendering legacy data erasure tools completely useless.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The "Erase All Content and Settings" Myth</h2>
              <p>
                macOS Monterey introduced "Erase All Content and Settings" (EACAS). This built-in feature cryptographically destroys the user data keys, effectively rendering the data inaccessible. However, for enterprise compliance (NIST 800-88, GDPR, HIPAA), EACAS presents a critical flaw: <strong>It does not generate an independent, verifiable audit trail.</strong>
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8">
                <h3 className="font-bold text-slate-900 mb-4">Known Erasure Issues with Apple Silicon:</h3>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>External Boot Restrictions:</strong> Default Startup Security Utility settings prevent booting from external media.</li>
                  <li><strong>Activation Lock (Find My Mac):</strong> If an employee leaves without signing out of iCloud, the device is bricked for the next user.</li>
                  <li><strong>Lack of Certification:</strong> Built-in macOS wiping cannot produce the digitally signed PDF certificates required by external auditors.</li>
                  <li><strong>MDM Entanglement:</strong> Automated Device Enrollment (ADE/DEP) can force the device back into management after a wipe if not properly released.</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">D-Secure's Native Apple Silicon Workflow</h2>
              <p>
                D-Secure circumvents these hardware restrictions by operating at the MDM API level and via native macOS agents, rather than relying on external boot environments.
              </p>

              <div className="overflow-x-auto my-8">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-900">
                      <th className="p-4 border-b border-emerald-200 font-bold">Requirement</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">Standard macOS Wipe</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">D-Secure Workflow</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-4 font-semibold">Sanitization Method</td>
                      <td className="p-4">Cryptographic (EACAS)</td>
                      <td className="p-4">Cryptographic + API Verification</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="p-4 font-semibold">Audit Certificate</td>
                      <td className="p-4 text-red-600">None</td>
                      <td className="p-4 text-emerald-600">Digitally Signed PDF/XML</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scale</td>
                      <td className="p-4">Manual, one-by-one</td>
                      <td className="p-4">Mass execution via Dashboard</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 my-12">
                <h3 className="text-xl font-bold mb-4 text-emerald-900">
                  Step-by-Step Enterprise Mac Erasure
                </h3>
                <ol className="list-decimal pl-6 space-y-3 text-emerald-800">
                  <li><strong>Identify & Unbind:</strong> D-Secure verifies Activation Lock status and removes MDM bindings.</li>
                  <li><strong>Initiate Crypto-Erase:</strong> The D-Secure agent triggers the secure enclave to destroy the volume keys.</li>
                  <li><strong>Audit Generation:</strong> Before final reboot, the agent offloads hardware serials, timestamps, and success metrics to the CYVRA dashboard.</li>
                </ol>
              </div>
            </div>`
  },
  {
    file: 'MSPDataErasureBlog.tsx',
    newTitle: 'Erasure as a Service (EaaS): The New Revenue Stream for MSPs',
    newDesc: 'Managed Service Providers (MSPs) can unlock new recurring revenue and enhance client security by offering certified Data Erasure as a Service (EaaS) using D-Secure.',
    article: `
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              For Managed Service Providers (MSPs), end-of-life hardware management has traditionally been a cost center. By transforming asset decommissioning into "Erasure as a Service" (EaaS), MSPs can generate new recurring revenue while solving a major compliance headache for their clients.
            </p>

            <div className="text-slate-700 leading-relaxed space-y-8">
              <p>
                When a client refreshes their hardware, laptops and servers often sit in a storage closet for months because the client lacks a secure way to wipe the data. This "shadow data" poses a massive security risk. MSPs are uniquely positioned to solve this by integrating automated, certified data erasure directly into their offboarding workflows.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The Business Case for EaaS</h2>
              <p>
                Rather than outsourcing IT Asset Disposition (ITAD) to third parties—and losing control of the chain of custody—MSPs can use D-Secure to perform NIST-compliant erasure remotely or in-house. 
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Cost Center (Status Quo)</h4>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li>Paying 3rd-party ITADs for pickup</li>
                    <li>Unbillable hours spent destroying drives</li>
                    <li>Zero recurring revenue</li>
                    <li>Client assumes chain-of-custody risk</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-2">Profit Center (EaaS)</h4>
                  <ul className="text-sm space-y-2 text-emerald-800">
                    <li>Bill per device or via monthly retainer</li>
                    <li>Automated remote wipes via RMM integration</li>
                    <li>Provide branded compliance certificates</li>
                    <li>Retain full hardware value for resale</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How D-Secure Empowers MSPs</h2>
              <p>
                D-Secure is built with multi-tenancy in mind, allowing MSPs to manage hundreds of clients from a single pane of glass.
              </p>
              
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Multi-Tenant Dashboard (CYVRA):</strong> Segment erasure reports, licenses, and users by client organization.</li>
                <li><strong>White-Labeled Certificates:</strong> Generate compliance reports featuring your MSP's logo, reinforcing your brand value with every decommissioned asset.</li>
                <li><strong>Remote Execution:</strong> Deploy the D-Secure System Cleaner via your existing RMM (ConnectWise, NinjaOne, Datto) to execute silent, secure wipes on remote endpoints before they are shipped back.</li>
                <li><strong>Flexible Licensing:</strong> Purchase volume credits and allocate them dynamically across your client base.</li>
              </ul>

              <div className="bg-slate-900 text-white rounded-2xl p-8 my-12">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">
                  Sample EaaS Pricing Model
                </h3>
                <p className="mb-4">MSPs typically package EaaS in two ways:</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>A La Carte:</strong> $25 - $40 per endpoint wiped, providing the client with the certified report.</li>
                  <li><strong>Included in Premium Managed Services:</strong> Bundled into a top-tier security package, guaranteeing that all offboarded devices are sanitized to NIST 800-88 standards.</li>
                </ol>
              </div>
            </div>`
  },
  {
    file: 'DataErasureMythsBlog.tsx',
    newTitle: 'Data Deletion vs. Data Erasure: Busting the 5 Biggest Myths',
    newDesc: 'Deleting a file does not erase it. Uncover the truth behind data deletion myths, formatting, factory resets, and why only certified data erasure guarantees permanent destruction.',
    article: `
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              "I emptied the recycle bin, so the data is gone." This is the most dangerous misconception in IT security. The difference between data deletion and data erasure is the difference between a compliant enterprise and a multi-million dollar data breach.
            </p>

            <div className="text-slate-700 leading-relaxed space-y-8">
              <p>
                When dealing with sensitive corporate data, Protected Health Information (PHI), or financial records, standard operating system deletion commands are entirely insufficient. Let's debunk the most pervasive myths surrounding data destruction.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Myth 1: Deleting a file removes it from the drive</h2>
              <p>
                <strong>The Reality:</strong> When you delete a file and empty the Recycle Bin (or Trash), the OS simply removes the file pointer from the master file table. The actual binary data (the 1s and 0s) remains completely intact on the physical storage media until it is overwritten by new data. Anyone with free forensic software can recover these files in minutes.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Myth 2: Formatting a drive permanently erases data</h2>
              <p>
                <strong>The Reality:</strong> A "Quick Format" merely replaces the file system table, leaving the underlying data perfectly readable to data recovery experts. Even a "Full Format" only checks for bad sectors and writes zeroes, but it does not generate a verification log or audit trail to prove to regulators that the wipe occurred successfully.
              </p>

              <div className="overflow-x-auto my-8">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-900">
                      <th className="p-4 border-b border-emerald-200 font-bold">Action</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">What it Actually Does</th>
                      <th className="p-4 border-b border-emerald-200 font-bold">Data Recoverable?</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-4 font-semibold">Delete / Empty Trash</td>
                      <td className="p-4">Removes file pointer only</td>
                      <td className="p-4 text-red-600 font-bold">Yes (Extremely Easy)</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="p-4 font-semibold">Quick Format</td>
                      <td className="p-4">Resets file system table</td>
                      <td className="p-4 text-red-600 font-bold">Yes (Moderate)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-4 font-semibold">Factory Reset</td>
                      <td className="p-4">Restores OS to default state</td>
                      <td className="p-4 text-orange-500 font-bold">Often Yes (Depends on OS)</td>
                    </tr>
                    <tr className="bg-emerald-50/50">
                      <td className="p-4 font-semibold text-emerald-800">D-Secure Erasure</td>
                      <td className="p-4">Cryptographic destroy + verification</td>
                      <td className="p-4 text-emerald-600 font-bold">No (Impossible)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Myth 3: Physical destruction is the only secure method</h2>
              <p>
                <strong>The Reality:</strong> While shredding a hard drive is effective, it is environmentally devastating (creating e-waste) and financially irresponsible. Shredded drives cannot be resold or donated. Certified data erasure (like NIST 800-88 Purge) achieves the exact same level of data security while preserving the hardware's residual value, supporting ESG initiatives and circular economy goals.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Myth 4: We don't need a certificate of erasure</h2>
              <p>
                <strong>The Reality:</strong> If it isn't documented, it didn't happen. Under GDPR, HIPAA, and CCPA, if a breach occurs and you cannot produce a digitally signed, tamper-proof certificate proving that a specific serial number was sanitized, regulators will assume negligence. D-Secure automatically generates these required audit trails.
              </p>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 my-12">
                <h3 className="text-xl font-bold mb-4 text-slate-900">
                  The Bottom Line
                </h3>
                <p className="text-slate-700 mb-0">
                  Data <strong>deletion</strong> is for managing storage space. Data <strong>erasure</strong> is for mitigating legal and financial risk. Enterprise environments must standardize on certified erasure tools to ensure data cannot be recovered once an asset reaches end-of-life.
                </p>
              </div>
            </div>`
  }
];

for (const update of updates) {
  const filePath = path.join(__dirname, '..', 'src', 'components', 'blog', update.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Title
  content = content.replace(/title:\s*["'].*?["']/, 'title: "' + update.newTitle + '"');
  
  // Replace Excerpt
  content = content.replace(/excerpt:\s*["'].*?["']/, 'excerpt: "' + update.newDesc + '"');

  // Replace Article body
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  content = content.replace(articleRegex, '<article className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-10 text-justify">\n' + update.article + '\n            </article>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + update.file);
}
