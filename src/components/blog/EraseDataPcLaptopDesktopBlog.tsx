import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ArrowRightIcon,
  HoverIcon,
} from "@/components/FlatIcons";

const EraseDataPcLaptopDesktopBlog: React.FC = () => {
  const seo = getBlogSEO({
    title: "Wipe a hard drive from BIOS: secure erase for PCs and laptops",
    excerpt:
      "BIOS-level erasure wipes drives before Windows loads — useful when the OS is corrupt or you're decommissioning a device. Here's the exact process.",
    keywords: "bios wipe hard drive,how to wipe hard drive from bios",
    slug: "erase-data-pc-laptop-desktop",
    author: "D-Secure Tech",
    publishDate: "2026-05-19",
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={seo} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Enterprise <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Data Erasure</Link> Guide
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              <span className="bg-white bg-clip-text text-transparent">
                Wipe a Hard Drive from BIOS
              </span>
              <br />
              Secure Erase for PCs and Laptops
            </h1>

            <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
              BIOS-level erasure wipes drives before Windows loads — useful when the OS is corrupt or you're decommissioning a device. Here's the exact process for different manufacturers.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            
            <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none mb-8">
              <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">Important Distinction: HDDs vs SSDs</h3>
              <p className="text-[#0a2e1e]">
                This guide covers wiping traditional Hard Disk Drives (HDDs) from the BIOS. If you are trying to wipe a Solid State Drive (SSD) or NVMe drive, the process is different because SSDs require specific commands to prevent wear-leveling interference. Please refer to our guide on <Link to="/blog/ssd-wipe-bios" className="font-bold underline hover:text-[#0a2e1e]">how to securely wipe an SSD from BIOS</Link>.
              </p>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Why Wipe a Hard Drive from BIOS?
              </h2>

              <p className="text-[#5a6672] leading-relaxed text-lg">
                Wiping a hard drive directly from the BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) is one of the most effective ways to completely sanitize a disk. Because the BIOS operates beneath the operating system, it has raw, unfettered access to the drive hardware.
              </p>

              <ul className="list-disc pl-6 space-y-2 text-[#5a6672]">
                <li><strong>OS Corruption:</strong> If Windows or Linux won't boot, a BIOS wipe bypasses the OS entirely.</li>
                <li><strong>Malware Removal:</strong> Deep-rooted rootkits that hide within the OS can be eradicated by wiping from the BIOS level.</li>
                <li><strong>Decommissioning:</strong> Ensures all partitions, including hidden recovery partitions, are completely destroyed before resale or recycling.</li>
              </ul>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                How to Access Your BIOS/UEFI
              </h2>

              <p className="text-[#5a6672] leading-relaxed">
                To initiate a wipe, you first need to access the BIOS menu. This is done by repeatedly pressing a specific key immediately after turning on the computer, before the Windows logo appears.
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f4fbf8]">
                      <th className="p-3 border border-[#d0d5dc] font-bold text-[#0a2e1e]">Manufacturer</th>
                      <th className="p-3 border border-[#d0d5dc] font-bold text-[#0a2e1e]">BIOS Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-[#d0d5dc] font-semibold">Dell</td>
                      <td className="p-3 border border-[#d0d5dc]">F2 or F12</td>
                    </tr>
                    <tr className="bg-[#f4fbf8]">
                      <td className="p-3 border border-[#d0d5dc] font-semibold">HP</td>
                      <td className="p-3 border border-[#d0d5dc]">F10 or ESC</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-[#d0d5dc] font-semibold">Lenovo (ThinkPad/IdeaPad)</td>
                      <td className="p-3 border border-[#d0d5dc]">F1, F2, or Enter</td>
                    </tr>
                    <tr className="bg-[#f4fbf8]">
                      <td className="p-3 border border-[#d0d5dc] font-semibold">ASUS / Acer / MSI</td>
                      <td className="p-3 border border-[#d0d5dc]">F2 or DEL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#0a2e1e] border-b pb-2">
                BIOS Variants: Navigating to the Wipe Utility
              </h2>

              <p className="text-[#5a6672] leading-relaxed">
                Once inside the BIOS, the location of the secure erase tool varies significantly depending on the manufacturer. Here is how to find it on the most common systems.
              </p>

              {/* Dell */}
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-3">Dell BIOS (Data Wipe)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-[#5a6672]">
                  <li>Enter BIOS by pressing <strong>F2</strong> during startup.</li>
                  <li>Expand the <strong>Security</strong> menu on the left pane.</li>
                  <li>Select <strong>Data Wipe</strong>.</li>
                  <li>Check the box for <strong>Wipe on Next Boot</strong>.</li>
                  <li>Click Apply, Exit, and restart. The system will prompt you to confirm the wipe.</li>
                </ol>
              </div>

              {/* HP */}
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-3">HP BIOS (Secure Erase)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-[#5a6672]">
                  <li>Enter BIOS by pressing <strong>F10</strong> during startup.</li>
                  <li>Navigate to the <strong>Security</strong> tab using the arrow keys.</li>
                  <li>Select <strong>Hard Drive Utilities</strong> or <strong>Secure Erase</strong>.</li>
                  <li>Select the drive you wish to wipe and follow the prompts to confirm.</li>
                </ol>
              </div>

              {/* Lenovo */}
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-3">Lenovo ThinkPad BIOS</h3>
                <ol className="list-decimal pl-6 space-y-2 text-[#5a6672]">
                  <li>Press <strong>F1</strong> to enter the BIOS Setup Utility.</li>
                  <li>Go to the <strong>Security</strong> menu.</li>
                  <li>Select <strong>Disk Encryption</strong> or <strong>Hard Disk Password</strong> (depending on the model, Secure Erase is often nested here).</li>
                  <li>Select <strong>Secure Erase</strong>, choose your drive, and confirm.</li>
                </ol>
              </div>

              {/* General UEFI/AMI */}
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-3">General UEFI / Legacy AMI BIOS (Custom Builds)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-[#5a6672]">
                  <li>Press <strong>DEL</strong> or <strong>F2</strong>.</li>
                  <li>Switch to <strong>Advanced Mode</strong> (usually F7).</li>
                  <li>Look for a <strong>Tool</strong> or <strong>Security</strong> tab.</li>
                  <li>Select <strong>Secure Erase</strong> or <strong>Storage Configuration</strong> to find the wipe utility.</li>
                </ol>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                What if BIOS Erase Isn't Available? (Bootable USB Alternatives)
              </h2>

              <p className="text-[#5a6672] leading-relaxed">
                Not all motherboards include a built-in Secure Erase utility in the BIOS. If your system lacks this feature, the industry-standard alternative is to use a <strong>bootable USB wipe tool</strong>.
              </p>

              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-lg mb-2">Using DBAN (Darik's Boot and Nuke) for HDDs</h3>
                <p className="text-[#0a2e1e] mb-4">
                  DBAN is a popular, free utility specifically designed for wiping traditional HDDs.
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-[#0a2e1e]">
                  <li>Download the DBAN ISO file.</li>
                  <li>Use a tool like Rufus to create a bootable USB drive from the ISO.</li>
                  <li>Reboot your PC and press the Boot Menu key (F12, F8, etc.) to boot from the USB.</li>
                  <li>Once DBAN loads, type <code>autonuke</code> to automatically wipe all connected HDDs, or press Enter to enter interactive mode and select specific drives.</li>
                </ol>
                <p className="mt-4 text-sm font-semibold text-[#0a2e1e]">
                  Note: DBAN is NOT recommended for SSDs. It cannot access over-provisioned sectors on solid-state media.
                </p>
              </div>
            </div>

          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Need Enterprise-Grade Wiping with Audit Reports?
            </h2>

            <p className="leading-relaxed mb-6 text-white/80 max-w-2xl mx-auto">
              While BIOS wipes and DBAN are fine for personal use, businesses require compliant erasure with tamper-evident audit trails for compliance (NIST, HIPAA, GDPR).
            </p>

            <Link
              to="/products/drive-eraser"
              className="inline-flex items-center bg-[#0e7c66] text-white px-8 py-3 rounded-none font-bold hover:bg-[#0e7c66] transition shadow-none"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Explore D-Secure Drive Eraser
              <HoverIcon>
                {(filled) => (
                  <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                )}
              </HoverIcon>
            </Link>
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard 
        blogId="erase-data-pc-laptop-desktop" 
        blogTitle="Wipe a hard drive from BIOS: secure erase for PCs and laptops" 
        category="Tutorials"
        tag="Data Erasure"
      />
    </div>
  );
};

export default EraseDataPcLaptopDesktopBlog;
