import React from "react";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, LightningIcon } from "@/components/FlatIcons";
import BlogFooterStandard from "./BlogFooterStandard";

const AutomatedErasureBlog: React.FC = () => {
  const blogId = "automate-data-erasure";
  const blogTitle = "Automated Data Erasure Workflows";

  const seo = getBlogSEO({
    title: "Automated data erasure: scheduled wipe workflows for IT and ITAD",
    excerpt: "Wiping drives one by one doesn't scale. Here's how IT teams automate bulk erasure, schedule wipes, and generate audit certificates across endpoints.",
    keywords: "automate data erasure, scheduled wipe workflows, bulk data erasure, rmm data wipe, mdm erase automation, it asset disposition automation",
    slug: blogId,
    author: "D-Secure Tech",
    publishDate: "2026-05-19",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={seo} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
                    Automation & Efficiency
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Automate Data Erasure</span> at Scale
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Wiping drives one by one doesn't scale. Discover how enterprise IT teams and ITADs automate bulk erasure, schedule wipes remotely, and generate tamper-proof audit certificates automatically.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
             <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/50 p-8 md:p-12 space-y-12 text-justify">
                
                {/* Introduction & The Problem */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Why Manual Data Erasure Fails at Scale</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        As organizations grow, the volume of decommissioned hardware and offboarded employees scales exponentially. Relying on manual, drive-by-drive wiping methods creates a massive bottleneck. When you <Link to="/products/drive-eraser" className="text-purple-600 hover:underline font-medium">automate data erasure</Link>, you eliminate human error, drastically reduce labor costs, and ensure consistent compliance across your entire fleet.
                    </p>
                </div>

                {/* Workflow Diagram Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">The Automated Erasure Workflow</h2>
                    <p className="text-slate-700 mb-4">
                        A modern IT or ITAD facility relies on a streamlined, hands-off pipeline. Here is how the end-to-end automated erasure process works:
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 gap-4">
                        {/* Step 1 */}
                        <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 relative w-full">
                            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                            <h3 className="font-bold text-slate-900 text-sm">Intake & Connect</h3>
                            <p className="text-xs text-slate-500 mt-2">PXE boot or network connect multiple devices to the central server.</p>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-indigo-400 hidden md:block" />
                        
                        {/* Step 2 */}
                        <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 relative w-full">
                            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                            <h3 className="font-bold text-slate-900 text-sm">Policy & Queue</h3>
                            <p className="text-xs text-slate-500 mt-2">System auto-assigns erasure standards (e.g., NIST 800-88) based on device type.</p>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-indigo-400 hidden md:block" />

                        {/* Step 3 */}
                        <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 relative w-full">
                            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                            <h3 className="font-bold text-slate-900 text-sm">Bulk Erase</h3>
                            <p className="text-xs text-slate-500 mt-2">Simultaneous, high-speed erasure executes across all queued endpoints.</p>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-indigo-400 hidden md:block" />

                        {/* Step 4 */}
                        <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 relative w-full">
                            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">4</div>
                            <h3 className="font-bold text-slate-900 text-sm">Certificate Export</h3>
                            <p className="text-xs text-slate-500 mt-2">Tamper-proof audit logs and PDFs are auto-generated and synced.</p>
                        </div>
                    </div>
                </div>

                {/* RMM Integrations */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Seamless RMM & MDM Integrations</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        To truly automate data erasure, the process must live inside the tools your IT team already uses. Modern <Link to="/products/file-eraser" className="text-purple-600 hover:underline font-medium">file erasure</Link> and <Link to="/products/drive-eraser" className="text-purple-600 hover:underline font-medium">drive erasure</Link> solutions integrate directly with leading Remote Monitoring and Management (RMM) platforms.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-white border-2 border-slate-100 p-6 rounded-xl hover:border-purple-300 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-2">NinjaRMM</h3>
                            <p className="text-sm text-slate-600">Deploy erasure scripts silently to offline or remote endpoints directly through the Ninja console.</p>
                        </div>
                        <div className="bg-white border-2 border-slate-100 p-6 rounded-xl hover:border-purple-300 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-2">ConnectWise</h3>
                            <p className="text-sm text-slate-600">Map erasure jobs to ConnectWise Automate tickets and automatically attach compliance certificates upon completion.</p>
                        </div>
                        <div className="bg-white border-2 border-slate-100 p-6 rounded-xl hover:border-purple-300 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-2">Datto RMM</h3>
                            <p className="text-sm text-slate-600">Use pre-built Datto components to schedule routine free-space wipes or full disk sanitization for decommissioned assets.</p>
                        </div>
                    </div>
                </div>

                {/* API & CLI Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">API & CLI: Built for Developers</h2>
                    <p className="text-slate-700 leading-relaxed">
                        For custom ITAD workflows and enterprise ERP integrations, GUI-based tools aren't enough. D-Secure provides robust CLI tools and REST APIs that allow developers to trigger, monitor, and log erasure events programmatically.
                    </p>
                    <div className="bg-slate-900 text-slate-300 p-5 rounded-lg font-mono text-sm shadow-inner mt-4 overflow-x-auto">
                        <p className="text-slate-500 mb-2"># Trigger an automated erasure via CLI</p>
                        <p className="text-green-400">dsecure-cli <span className="text-white">erase --target</span> /dev/nvme0n1 <span className="text-white">--standard</span> NIST_800_88 <span className="text-white">--auto-verify</span></p>
                        <br/>
                        <p className="text-slate-500 mb-2"># Fetch compliance certificate via API</p>
                        <p className="text-blue-400">curl <span className="text-white">-X GET</span> https://api.dsecure.com/v1/certificates/7A9F3 <span className="text-white">-H</span> "Authorization: Bearer $TOKEN"</p>
                    </div>
                    <p className="text-slate-700 mt-4">
                        With these tools, you can build proprietary asset tracking pipelines where erasure happens completely headlessly, generating XML/JSON reports that ingest directly into systems like ServiceNow or Jira.
                    </p>
                </div>

                {/* Real-World Use Case: Employee Offboarding */}
                <div className="space-y-4 bg-purple-50 p-8 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldIcon className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-slate-900">Use Case: Automated Employee Offboarding</h2>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        When an employee leaves an organization, securing their device data immediately is a critical compliance requirement. Instead of waiting for a laptop or <Link to="/products/smartphone-eraser" className="text-purple-600 hover:underline font-medium">smartphone</Link> to be shipped back to HQ, IT teams can automate data erasure remotely.
                    </p>
                    <ul className="space-y-3 mt-4 text-slate-700">
                        <li className="flex items-start gap-2">
                            <CheckIcon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span><strong>Trigger:</strong> HR updates status to "Terminated" in Workday/Active Directory.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckIcon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span><strong>Action:</strong> MDM/RMM pushes a D-Secure zero-touch erasure payload to the remote laptop.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckIcon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span><strong>Execution:</strong> The laptop automatically boots into the secure erase environment and wipes the NVMe drive to NIST standards.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckIcon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                            <span><strong>Audit:</strong> A digitally signed certificate is instantly generated and uploaded to the IT compliance dashboard.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* Strong CTA Section */}
        <Reveal>
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] shadow-2xl border border-slate-700 p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Erasure Workflows?</h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
                    Stop wasting hours on manual drive wiping. Whether you need to wipe thousands of data center servers or automate employee offboarding, D-Secure has the tools you need.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/products/drive-eraser" 
                        className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
                    >
                        Explore Drive Eraser <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                    <Link 
                        to="/products/file-eraser" 
                        className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-slate-400 hover:border-white text-white px-8 py-4 rounded-full font-bold transition-all"
                    >
                        Automate File Shredding
                    </Link>
                </div>
            </div>
        </Reveal>
      </section>

      {/* Standardized Blog Footer */}
      <BlogFooterStandard 
        blogId={blogId} 
        blogTitle={blogTitle} 
      />
    </div>
  );
};

export default AutomatedErasureBlog;
