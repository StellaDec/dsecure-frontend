import React from 'react';
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

const DiagnosticsPage: React.FC = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dhwi5wevf";

  const testUrls = [
    {
      name: 'Main Logo',
      url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/dsecure/logos/logo`
    },
    {
      name: 'White Logo',
      url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/dsecure/logos/logo-white`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('diagnostics')} />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Hardware Diagnostics Tool: Comprehensive System Performance Audit</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <p><strong>VITE_CLOUDINARY_CLOUD_NAME:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{cloudName || 'NOT SET'}</code></p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${cloudName ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {cloudName ? 'CONFIGURED' : 'MISSING'}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Tests</h2>
          <div className="grid gap-6">
            {testUrls.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{test.name}</h3>
                <p className="text-sm text-gray-600 mb-3">URL: <code className="bg-gray-100 px-1 rounded">{test.url}</code></p>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={test.url}
                      alt={test.name}
                      className="w-16 h-16 object-contain border rounded"
                      onLoad={() => { }}
                      onError={() => { }}
                    />
                  </div>
                  <div>
                    <p className="text-sm">
                      If you see the image above, Cloudinary is working correctly.
                      If not, check the browser console for errors.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Engineering Deep Dive: Hardware Integrity & Pre-Erasure Auditing
              </h2>

              <div className="prose prose-invert max-w-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-4">
                      1. The Criticality of Pre-Sanitization Diagnostics
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Data sanitization is only as effective as the underlying hardware integrity. Before any erasure command is issued, the D-Secure engine performs a multi-stage hardware audit to identify physical defects that could potentially harbor residual data. 
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      If a drive has <strong>"Pending Sectors"</strong> or a high count of <strong>"Reallocated Sectors,"</strong> standard software wiping may skip these blocks, leaving sensitive information intact. Our diagnostic suite identifies these high-risk areas, allowing for a strategic pivot to physical destruction if the software-defined "Purge" cannot be guaranteed.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-4">
                      2. S.M.A.R.T. Attribute Deep Analysis
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      D-Secure doesn't just read basic S.M.A.R.T. (Self-Monitoring, Analysis, and Reporting Technology) flags; we analyze the raw vendor-specific attributes to predict failure modes. 
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Attributes such as <strong>ID 05 (Reallocated Sectors Count)</strong>, <strong>ID 196 (Reallocation Event Count)</strong>, and <strong>ID 197 (Current Pending Sector Count)</strong> are cross-referenced against the drive's total power-on hours (ID 09). This enables our system to provide a "Data Sanitization Reliability Score," ensuring that your compliance logs are backed by empirical hardware health data.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-8 mb-12 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Hardware Communication Protocol Matrix
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-300">
                      <thead className="text-white font-bold border-b border-slate-700">
                        <tr>
                          <th className="pb-4 pr-4">Interface Type</th>
                          <th className="pb-4 px-4">Diagnostic Method</th>
                          <th className="pb-4 pl-4">Security Benefit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        <tr>
                          <td className="py-4 pr-4 font-semibold text-emerald-400">NVMe / PCIe</td>
                          <td className="py-4 px-4">Admin Command Set / Namespace Management</td>
                          <td className="py-4 pl-4">Low-latency verification of cryptographic key shredding.</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4 font-semibold text-emerald-400">SATA / AHCI</td>
                          <td className="py-4 px-4">ATA Security Feature Set (IDENTIFY DEVICE)</td>
                          <td className="py-4 pl-4">Identification of HPA/DCO hidden storage areas.</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4 font-semibold text-emerald-400">SAS (SCSI)</td>
                          <td className="py-4 px-4">Log Sense / Mode Sense Page Analysis</td>
                          <td className="py-4 pl-4">Verification of T-10 Protection Information (PI) sectors.</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4 font-semibold text-emerald-400">USB / Firewire</td>
                          <td className="py-4 px-4">SCSI Pass-Through / UASP Analysis</td>
                          <td className="py-4 pl-4">Bridge-controller latency and throughput bottleneck detection.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-4">
                      3. Security Implications of Faulty Blocks
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      When a storage controller identifies a failing block, it "remaps" that data to a spare sector. However, the data in the original "faulty" block remains physically present on the platter or NAND flash. 
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      D-Secure’s diagnostic tool probes the controller's <strong>G-List (Grown Defects List)</strong>. By comparing the G-List with the logical block addressing (LBA) map, we can detect if a drive is concealing data in sectors that are no longer software-addressable, triggering an automated warning to the compliance officer.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-4">
                      4. Operational Efficiency: Bottleneck Detection
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      In high-volume ITAD operations, throughput is critical. Our hardware diagnostics include real-time bandwidth monitoring and I/O latency analysis.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      We identify cables, controllers, or drives that are underperforming relative to their theoretical maximum (e.g., a SATA 3 drive operating at SATA 1 speeds). This operational intelligence allows your technicians to replace faulty infrastructure before it delays a major decommissioning project.
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-emerald-950 rounded-xl border border-emerald-900/50">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4">The D-Secure Diagnostic Philosophy</h3>
                  <p className="text-slate-300 leading-relaxed mb-6 italic">
                    "Data destruction without hardware verification is merely an assumption." 
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    At D-Secure, we believe that the audit trail begins the moment a device is connected to our system. Our commitment to hardware-level transparency ensures that every 'Success' status we issue is backed by a comprehensive physiological profile of the storage medium. We don't just wipe drives; we understand them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12 mb-20">
          <h3 className="font-semibold text-blue-800 mb-2">Internal System Health & Troubleshooting</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Cloudinary Asset CDN:</strong> Status: {cloudName ? 'CONFIGURED' : 'MISSING'}</li>
            <li>• <strong>Environment Sync:</strong> Ensure VITE_CLOUDINARY_CLOUD_NAME=dhwi5wevf is active.</li>
            <li>• <strong>Connectivity:</strong> If asset tests fail, verify outbound firewall rules for res.cloudinary.com.</li>
            <li>• <strong>Compliance:</strong> Diagnostic logs are integrated into the primary NIST 800-88 audit export.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPage;