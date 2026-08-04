import React from "react";
import { ArrowRight, HardDrive, FileJson, ShieldAlert, CheckCircle } from "lucide-react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { blogFaqs } from "@/data/blogFaqs";

const LocalLLMErasureBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead
          seo={getBlogSEO({
            title: "How to Erase Local LLM Data from AI PCs | D-Secure",
            excerpt:
              "Learn where Ollama, LM Studio, GPT4All and Jan store models, chats and vector data—and how enterprises can securely sanitize AI PCs.",
            slug: "local-llm-data-erasure",
            author: "Prashant Saini",
            publishDate: "August 15, 2026",
            keywords:
              "local LLM data erasure, erase local LLM data, AI PC data erasure software, where are local LLM models stored in Windows 11, how to delete Ollama models permanently, LM Studio conversation storage location, how to delete a vector database from a laptop, secure erasure of GGUF model files, AI PC decommissioning, local AI data sanitization",
            category: "Enterprise Security",
            tag: "Data Sanitization",
          })}
        />

        {/* Hero Section */}
        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6 max-w-5xl mx-auto">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Endpoint Security
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                How to Securely Erase Local LLM Data from Enterprise AI PCs
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                A practical enterprise guide to discovering and securely removing local AI models, conversations, document indexes, caches and vector data.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Main Content Section */}
        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">The New Local AI Data Footprint</h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                Artificial intelligence is moving from centralized cloud platforms onto employee laptops, engineering workstations and other enterprise endpoints.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg">
                Windows AI APIs can process supported workloads locally using a device's NPU, while Microsoft Foundry Local can download models into an on-device cache and run inference without sending input or output to Microsoft's cloud. This can reduce external data transmission, but it also means the organization becomes responsible for model files, prompts, responses, document indexes, caches and other AI-related artefacts retained on the endpoint.
              </p>

              <div className="bg-[#f4fbf8] p-6 rounded border-l-4 border-[#0e7c66] my-8">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">Featured Insight</h3>
                <p className="text-[#0a2e1e] font-medium m-0">
                  Local LLM data can include downloaded model weights, chat histories, prompts, generated responses, uploaded documents, embeddings, vector indexes, logs and temporary files stored on an endpoint. Secure removal requires identifying every relevant application location, erasing the approved data scope, verifying the outcome and using full-drive sanitization when the device leaves organizational control.
                </p>
              </div>

              <p className="text-[#5a6672] leading-loose text-lg">
                An NPU is primarily a processing component; it should not be described as the main persistent storage location for AI data. The artefacts of concern generally reside on the laptop's SSD or NVMe storage, in application folders, user profiles, model caches, document indexes, databases and synchronized locations.
              </p>
              
              <p className="text-[#5a6672] leading-loose text-lg">
                This creates a new endpoint-security problem. An employee can download a multi-gigabyte model, attach confidential documents, create an internal knowledge collection, discuss sensitive projects in saved conversations, and then uninstall the visible application. Some or all of the associated data may remain elsewhere in the user profile or in a custom model directory.
              </p>

              <h2 className="text-2xl font-bold text-[#0a2e1e] mt-12 mb-6">Why this matters during the device lifecycle</h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                The local AI footprint should be reviewed when a device is:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#5a6672] text-lg">
                <li>reassigned to another employee;</li>
                <li>returned after offboarding;</li>
                <li>sent to a third-party repair provider;</li>
                <li>returned to a leasing company;</li>
                <li>transferred to another department;</li>
                <li>sold through an ITAD provider;</li>
                <li>recycled or donated;</li>
                <li>involved in a privacy, legal or security investigation.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
             <div className="my-12">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">Where Local LLM Tools Store Data</h2>
              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                IT administrators rarely search only for “local AI applications.” They search for the product name, operating system and specific residue they need to remove. Here are commonly encountered tools and what each one may retain:
              </p>
              <div className="overflow-x-auto border border-[#d0d5dc] rounded">
                <table className="min-w-full divide-y divide-[#d0d5dc] text-left border-collapse">
                  <thead className="bg-[#f4fbf8]">
                    <tr>
                      <th className="px-6 py-4 font-bold text-[#0a2e1e] border-r border-[#d0d5dc]">Tool</th>
                      <th className="px-6 py-4 font-bold text-[#0a2e1e] border-r border-[#d0d5dc]">Verified local location or behaviour</th>
                      <th className="px-6 py-4 font-bold text-[#0a2e1e]">Data that IT teams should inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d0d5dc]">
                    <tr>
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">Ollama</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]"><code>%HOMEPATH%\.ollama</code> contains models and configuration. Uses <code>%LOCALAPPDATA%</code> for application files/logs, and <code>%TEMP%</code>.</td>
                      <td className="px-6 py-4 text-[#5a6672]">Model blobs, manifests, configuration, logs, temporary files and any custom model directory.</td>
                    </tr>
                    <tr className="bg-[#f9fafb]">
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">LM Studio</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]">Saved conversations stored as JSON under <code>%USERPROFILE%\.lmstudio\conversations</code>.</td>
                      <td className="px-6 py-4 text-[#5a6672]">Conversation JSON files, attached or duplicated documents, configured model directories.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">GPT4All</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]">Default path: <code>C:\Users\&#123;username&#125;\AppData\Local\nomic.ai\GPT4All</code>.</td>
                      <td className="px-6 py-4 text-[#5a6672]">Models, saved chats, LocalDocs collections, text snippets, embeddings, source-document references.</td>
                    </tr>
                    <tr className="bg-[#f9fafb]">
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">Jan</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]">Default path: <code>%APPDATA%\Jan\data</code>. Stores models, threads, settings and logs locally.</td>
                      <td className="px-6 py-4 text-[#5a6672]">GGUF models, thread data, application logs, attached files, RAG/vector data.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">NVIDIA ChatRTX</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]">(Deprecated project) Ran locally and supported RAG against documents/notes.</td>
                      <td className="px-6 py-4 text-[#5a6672]">Legacy model files, indexed content, RAG data, FAISS-style vector indexes.</td>
                    </tr>
                    <tr className="bg-[#f9fafb]">
                      <td className="px-6 py-4 font-bold border-r border-[#d0d5dc]">Microsoft Foundry Local</td>
                      <td className="px-6 py-4 text-[#5a6672] border-r border-[#d0d5dc]">Models downloaded into a local cache. Can be inspected via CLI.</td>
                      <td className="px-6 py-4 text-[#5a6672]">Model cache, customized cache directories, local service configuration, databases.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">Why uninstalling is not enough</h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                An uninstaller normally removes files that the installer manages. It may not know about custom model directories, downloaded models stored outside the application directory, saved conversations, manually imported models, document collections, embeddings and vector indexes, developer projects, container volumes, browser front-end storage, temporary exports, files synchronized to another device, or data already deleted through the operating system and left in unallocated space.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg">
                Ollama explicitly warns that downloaded models in a changed <code>OLLAMA_MODELS</code> location are not removed by its Windows installer. Jan separately documents a user data folder containing models, threads, settings and logs. These examples demonstrate why "application uninstalled" and "data sanitized" must be treated as different lifecycle states.
              </p>
            </div>
          </Reveal>

          <Reveal>
             <div className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">Secure Local LLM Data Erasure Workflow</h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                Start by defining the lifecycle event and required assurance level. For an internally reassigned laptop, the goal may be to remove one employee's conversations, unapproved models and confidential document collection while retaining Windows and approved corporate applications. For a leased, sold, donated or recycled device, selective deletion may be too narrow, and full-drive sanitization is generally more defensible.
              </p>

              <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">1. Inventory local AI runtimes and front-ends</h3>
              <p className="text-[#5a6672] leading-loose text-lg">
                Review more than the Windows installed-applications list. An effective inspection should cover Ollama and its connected front-ends, LM Studio, GPT4All, Jan, legacy NVIDIA ChatRTX deployments, Microsoft Foundry Local, browser-based interfaces, Python virtual environments, Docker/WSL, custom model directories, and synchronized folders.
              </p>

              <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">2. Use vendor's inventory and removal functions</h3>
              <p className="text-[#5a6672] leading-loose text-lg">
                Before applying an enterprise erasure tool, use application-native controls to determine what is present. Stop the application and its background services first, as active local-LLM services may lock model files. This step improves scope accuracy but does not replace sanitization verification.
              </p>

              <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">3. Configure D-Secure File Eraser for validated targets</h3>
              <p className="text-[#5a6672] leading-loose text-lg">
                D-Secure File Eraser can be configured to erase known local-AI files and folders included in an approved erasure policy. IT teams should first identify and validate the paths used by each application, because model locations and conversation stores can change by version, operating system and user configuration. Target specific files like <code>.gguf</code>, <code>.onnx</code>, LM Studio JSON files, Jan thread logs, and relevant unallocated space.
              </p>

              <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">4. Apply an approved method rather than generic "NIST overwrite"</h3>
              <p className="text-[#5a6672] leading-loose text-lg">
                Apply the sanitization method approved by the organization's data-classification and media-sanitization policy. Record the target, method, result and verification evidence in a process aligned with NIST SP 800-88 Rev. 2 and the applicable media-specific standard. For SSD or NVMe devices, a full-device firmware or cryptographic sanitization operation using D-Secure Drive Eraser is more appropriate for end-of-life media.
              </p>
              
              <h3 className="text-2xl font-bold text-[#0a2e1e] mt-8 mb-4">5. Retain defensible audit evidence</h3>
              <p className="text-[#5a6672] leading-loose text-lg">
                The erasure record should identify asset details (hostname, serial), the user scope, the AI applications found (Ollama, LM Studio), target locations, the method used, start/completion time, verification evidence, and final disposition. D-Secure File Eraser and Drive Eraser provide digitally signed, tamper-proof certificates that capture this information.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">Selective Erasure vs Full-Drive Sanitization</h2>
              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                The correct technique depends on whether the device will remain under organizational control and whether the local AI footprint can be completely identified.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-[#5a6672] text-lg">
                <li><strong>Remove one unauthorized model:</strong> Selective file and folder erasure. The operating system and unrelated business data must remain.</li>
                <li><strong>Remove LM Studio conversations before internal reassignment:</strong> Selective erasure plus verification. Conversation JSON files can be scoped, but attached documents and copies must also be checked.</li>
                <li><strong>Reassign an endpoint internally:</strong> Selective erasure plus appropriate free-space handling and verification. The OS may need to remain, but prior user data must not transfer.</li>
                <li><strong>Return a leased AI PC or ITAD transfer:</strong> Validated full-drive sanitization. Administrators cannot safely assume every local AI location was found.</li>
                <li><strong>Local AI footprint is unknown:</strong> Full-drive sanitization. Selective erasure cannot provide assurance over unidentified data.</li>
              </ul>
              
              <div className="bg-[#fcf8e3] p-6 rounded border-l-4 border-[#f0ad4e] my-8">
                <h3 className="text-xl font-bold text-[#8a6d3b] mb-2">Important SSD and NVMe Limitation</h3>
                <p className="text-[#8a6d3b] font-medium m-0">
                  Do not describe free-space wiping as universally sufficient for an SSD or NVMe AI PC that is leaving the organization. Flash storage controllers may remap blocks and manage wear independently of the operating system. A file-level operation can be useful for removing active logical content on a retained endpoint, but external disposition normally requires a validated, media-appropriate full-drive method under the organization's sanitization policy.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Call to Action Section */}
          <Reveal>
            <div className="bg-[#0a2e1e] text-white p-8 md:p-12 text-center rounded my-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Secure the complete lifecycle of local AI data
              </h2>
              <p className="text-lg md:text-xl text-[#d4ede4] max-w-3xl mx-auto mb-8">
                Local AI keeps inference closer to the user, but it also distributes sensitive models, conversations and document indexes across enterprise endpoints. D-Secure helps organizations address both sides of the problem: targeted erasure for known local-AI artefacts on active systems and full-drive sanitization for devices being retired, returned or transferred.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/products/file-eraser"
                  className="bg-white text-[#0a2e1e] px-8 py-4 font-bold rounded hover:bg-[#d4ede4] transition-colors inline-block"
                >
                  Evaluate D-Secure File Eraser
                </Link>
                <Link
                  to="/products/drive-eraser"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 font-bold rounded hover:bg-white/10 transition-colors inline-block"
                >
                  Explore Drive Eraser
                </Link>
              </div>
            </div>
          </Reveal>

          {/* FAQs */}
          {/* <Reveal>
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {blogFaqs["local-llm-data-erasure"]?.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#d0d5dc] p-6 rounded"
                  >
                    <h3 className="text-xl font-bold text-[#0a2e1e] mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-[#5a6672] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal> */}
        </section>

        <BlogFooterStandard 
          blogId="local-llm-data-erasure" 
          blogTitle="How to Securely Erase Local LLM Data from Enterprise AI PCs" 
        />
      </div>
    );
};

export default LocalLLMErasureBlog;
