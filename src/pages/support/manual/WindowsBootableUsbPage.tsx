import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsBootableUsbPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead 
        seo={getSEOForPage("support-manual-windows-bootable-usb", { 
          title: "Windows Bootable Usb | D-Secure Manual", 
          canonicalUrl: "/support/manual/windows-bootable-usb" 
        })} 
      />
      
      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/manual/windows" className="inline-flex items-center text-emerald-800 hover:text-emerald-700 font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Windows Bootable Usb
              </h1>
            </Reveal>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-800 mr-2">✓</span> Comprehensive Windows Bootable Usb guide</li>
                  <li className="flex items-start"><span className="text-emerald-800 mr-2">✓</span> Step-by-step instructions</li>
                  <li className="flex items-start"><span className="text-emerald-800 mr-2">✓</span> Best practices and recommendations</li>
                </ul>

                <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Required Tools: UNetbootin</h2>
                <p className="text-slate-700 mb-4">
                  To create a bootable USB, we recommend using UNetbootin. Please download the appropriate version for your operating system:
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6 mb-12">
                  <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-windows-702.exe" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-emerald-50 border border-emerald-100 rounded-xl hover:shadow-md hover:border-emerald-300 transition-all no-underline">
                    <span className="text-4xl mb-3">🪟</span>
                    <span className="font-semibold text-slate-900">Windows Utility</span>
                    <span className="text-sm text-emerald-600 mt-1">Download .exe</span>
                  </a>
                  <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-linux64-702.bin" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-emerald-50 border border-emerald-100 rounded-xl hover:shadow-md hover:border-emerald-300 transition-all no-underline">
                    <span className="text-4xl mb-3">🐧</span>
                    <span className="font-semibold text-slate-900">Linux Utility</span>
                    <span className="text-sm text-emerald-600 mt-1">Download .bin</span>
                  </a>
                  <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-mac-702.dmg" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-emerald-50 border border-emerald-100 rounded-xl hover:shadow-md hover:border-emerald-300 transition-all no-underline">
                    <span className="text-4xl mb-3">🍎</span>
                    <span className="font-semibold text-slate-900">Mac Utility</span>
                    <span className="text-sm text-emerald-600 mt-1">Download .dmg</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default WindowsBootableUsbPage;
