import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { AlertTriangle } from 'lucide-react';
import {
  ShieldIcon,
  ClipboardIcon,
  ArrowRightIcon,
  HoverIcon,
} from "@/components/FlatIcons";

const MacM1ErasureKnownIssues: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("blog-mac-m1-erasure-known-issues")} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Technical Support Guide
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
              <span className="text-[#0e7c66]">
                Known Issues While Erasing
              </span>
              <br />
              Apple MacBooks with M-Series Chips
            </h1>

            <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
              A practical guide to common challenges faced during data erasure
              on Apple MacBooks with M1, M2, and M3 chips and how to resolve
              them effectively.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                1. Why Erasing M-Series MacBooks Is Different
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Apple MacBooks powered by M-series chips are built with advanced
                security protections similar to those found in mobile devices.
                These systems include features such as Secure Enclave, full-disk
                encryption, secure boot, runtime protections, and activation
                safeguards.
              </p>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Another important difference is that storage in these MacBooks
                is soldered directly onto the motherboard. This means the drive
                cannot be physically removed and erased separately, making
                certified, Mac-compatible data erasure software essential for
                businesses.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                2. Preparing a Mac-Compatible Erasure Environment
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                D-Secure supports <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">secure erasure</Link> of Apple Mac devices running on
                M1, M2, and M3 chips, as well as older systems based on T2, T1,
                and Intel processors.
              </p>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                To erase a Mac device, users must create a bootable USB using
                the D-Secure USB Creator utility available from the cloud
                console. While creating the boot media, selecting the correct
                Mac hardware type is critical.
              </p>

              <ul className="space-y-4 text-[#5a6672] text-lg mb-6">
                <li>
                  <strong>T2 & Above:</strong> For M3, M2, M1, and T2-based Macs
                </li>
                <li>
                  <strong>Other:</strong> For T1 chip or Intel-based Macs only
                </li>
              </ul>
            </div>

            {/* Issue 1 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                3. Issue: “No Such File or Directory” Error
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Some users encounter an error message stating that the
                application cannot be found when attempting to run the erasure
                command from the Terminal.
              </p>

              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#0a2e1e]" />
                  Root Cause
                </h3>
                <p className="text-[#5a6672]">
                  This typically happens when an incompatible bootable USB is
                  created by selecting the option meant for older Mac hardware
                  instead of M-series devices.
                </p>
              </div>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                <strong>Resolution:</strong> Recreate the bootable USB by
                selecting the <em>T2 & Above</em> option to ensure compatibility
                with M-series MacBooks.
              </p>
            </div>

            {/* Issue 2 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                4. Issue: Application Does Not Launch After Boot
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                In some cases, even after using the correct USB, the application
                may fail to identify the Mac hardware type when launched using
                the standard command.
              </p>

              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#0a2e1e]" />
                  Recommended Fix
                </h3>
                <p className="text-[#5a6672]">
                  Use the full executable path specific to M-series Macs when
                  running the command from the Terminal. This ensures proper
                  hardware detection and application launch.
                </p>
              </div>
            </div>

            {/* Issue 3 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                5. Issue: macOS Reinstallation Failure After Erasure
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                After a successful erasure, macOS must be reinstalled before the
                device can be reused. Occasionally, the reinstallation process
                fails with an error indicating that the erase operation could
                not be completed.
              </p>

              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <h3 className="font-bold text-[#0a2e1e] text-xl mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#0a2e1e]" />
                  Why This Happens
                </h3>
                <p className="text-[#5a6672]">
                  Some portions of the storage may still be in use by low-level
                  system processes, preventing the installer from completing the
                  operation.
                </p>
              </div>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                <strong>Resolution:</strong> Restore the operating system using
                Apple’s official device restoration utility. This method
                performs a deeper system recovery and allows macOS to be
                installed cleanly.
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                6. Final Notes for IT Teams and Businesses
              </h2>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                These issues are common when erasing Apple MacBooks with modern
                security architecture. Most problems can be resolved by using
                the correct boot media, commands, and recovery procedures.
              </p>

              <p className="text-[#5a6672] leading-loose text-lg mb-6">
                Following the recommended steps ensures that data is securely
                erased and devices are safely prepared for reuse, resale, or
                redeployment.
              </p>
            </div>
          </div>
        </Reveal>

        {/* D-Secure Section */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
              Secure Apple Device Erasure with D-Secure
            </h2>

            <p className="text-[#5a6672] leading-relaxed mb-6">
              D-Secure provides certified, Mac-compatible data erasure that
              aligns with modern Apple security requirements while delivering
              audit-ready documentation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-none border">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldIcon className="w-5 h-5 text-slate-700" filled />
                  <h3 className="font-bold text-[#0e7c66]">Apple-Compatible Erasure</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Designed to work with M-series, T-series, and Intel-based Mac
                  devices.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-none border">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardIcon className="w-5 h-5 text-slate-700" filled />
                  <h3 className="font-bold text-[#0e7c66]">Compliance Documentation</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Generates <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">secure erasure</Link> reports for <Link to="/solutions/itad" className="text-[#0a2e1e] hover:underline font-medium">ITAD</Link>, audit, and internal
                  compliance needs.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="bg-[#0e7c66] p-8 md:p-12 mt-12 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Simplify Apple Device <Link to="/products/drive-eraser" className="text-white hover:underline font-medium">Data Erasure</Link>
            </h2>
            <p className="leading-relaxed mb-6">
              Use the right tools and procedures to avoid delays, errors, and
              compliance risks when erasing modern Mac devices.
            </p>

            <Link
              to="/all-products"
              className="inline-flex items-center bg-white text-slate-800 px-6 py-3 rounded-none font-semibold hover:bg-gray-50 transition shadow-lg"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Explore D-Secure Solutions
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
        blogId="m1-mac-erasure-issues" 
        blogTitle="D-Secure Blog" 
      />
    </div>
  );
};

export default MacM1ErasureKnownIssues;
