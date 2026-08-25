import React from 'react';
import { Link } from 'react-router-dom';
import { X, HardDrive, Smartphone, Server, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProductsMegaMenu({ setProductsDropdownOpen, productsDropdownTab, setProductsDropdownTab }) {
    const { t } = useTranslation();
    return (
        <>                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
                    {/* Close Button — top right */}
                    <button
                      onClick={() => setProductsDropdownOpen(false)}
                      className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
                      aria-label="Close products menu"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                      {/* ── LEFT SIDEBAR — vertical category tabs ── */}
                      <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto custom-scrollbar">
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            !productsDropdownTab ||
                            productsDropdownTab === "eraser"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("eraser")}
                        >
                          Eraser
                          {(!productsDropdownTab ||
                            productsDropdownTab === "eraser") && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "migration"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("migration")}
                        >
                          Migration
                          {productsDropdownTab === "migration" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "diagnostics"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("diagnostics")}
                        >
                          Diagnostics
                          {productsDropdownTab === "diagnostics" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "verification"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("verification")}
                        >
                          Verification
                          {productsDropdownTab === "verification" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>

                        {/* "Explore all" link at bottom */}
                        <div className="mt-6 px-5">
                          <Link
                            to="/all-products"
                            className="text-xs font-semibold text-[#0e7c66] hover:text-[#0a2e1e] uppercase tracking-wide flex items-center gap-1"
                            onClick={() => setProductsDropdownOpen(false)}
                          >
                            Explore All Products
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      {/* ── RIGHT CONTENT — 3-colum                      {/* ── RIGHT CONTENT — 3-column product grid ── */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white px-6 pb-6">
                        {/* Category heading - Sticky at top of the scrollable area */}
                        <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
                          <div className="text-lg font-bold text-slate-800">
                            {(!productsDropdownTab ||
                              productsDropdownTab === "eraser") &&
                              "Eraser"}
                            {productsDropdownTab === "migration" && "Migration"}
                            {productsDropdownTab === "diagnostics" &&
                              "Diagnostics"}
                            {productsDropdownTab === "verification" &&
                              "Verification"}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                          {/* ═══ ERASER TAB ═══ */}
                          {(!productsDropdownTab ||
                            productsDropdownTab === "eraser") && (
                            <>
                              {/* Drive Eraser — with 2 variants */}
                              <div
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => {
                                  navigate("/products/drive-eraser");
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <HardDrive className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Drive Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Erase HDD, SSD, PC, Mac & Server data
                                  permanently.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/drive-eraser"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    Drive Eraser
                                  </Link>
                                  <Link
                                    to="/products/drive-eraser-diagnostic"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Diagnostic & Health</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e7c66] animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* File Eraser — with 2 variants */}
                              <div
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => {
                                  navigate("/products/file-eraser");
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <File className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    File Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Wipe files, folders, traces & browser history.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/file-eraser"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    Standard
                                  </Link>
                                  <Link
                                    to="/products/file-eraser-network"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Network Edition</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* Smartphone Eraser */}
                              <Link
                                to="/products/smartphone-eraser"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Smartphone className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Smartphone Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Bulk iOS & Android wiping with audit reports.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Virtual Machine Eraser */}
                              <Link
                                to="/products/virtual-machine-eraser"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Monitor className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Virtual Machine Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Securely wipe VMs on ESXi & Hyper-V hosts.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Zero Trace */}
                              <Link
                                to="/products/zero-trace"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Eraser className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Zero Trace
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  A secure data erasure solution to permanently remove every trace of data.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Removable Media Eraser */}
                              <Link
                                to="/products/removable-media-eraser"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Usb className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Removable Media Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Securely erase USB & flash storage devices.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* LUN Eraser */}
                              <Link
                                to="/products/lun-eraser"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Server className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    LUN Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Sanitize Logical Unit Numbers in active
                                  storage.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ MIGRATION TAB ═══ */}
                          {productsDropdownTab === "migration" && (
                            <>
                              {/* Data Migration */}
                              <Link
                                to="/products/data-migration"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <ArrowRightLeft className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Data Migration
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Secure transfer across Cloud & Infrastructure.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Forensic Imaging */}
                              <Link
                                to="/products/forensic-imaging"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <FileText className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Forensic Imaging
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Bit-for-bit acquisition & cryptographic
                                  hashing.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* FreezeState — with 2 variants */}
                              <div
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => {
                                  navigate("/products/freeze-state");
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <RefreshCcw className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    FreezeState
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Reboot-to-restore system protection.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/freeze-state-smart"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Smart Diagnostic</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  </Link>
                                  <Link
                                    to="/products/freeze-state-advanced"
                                    className="px-3 py-1.5 rounded-full border bg-[#d4ede4] hover:bg-[#c0e4d7] border-[#0e7c66]/20 text-[#0e7c66] text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Advanced Eraser</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e7c66] animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* Asset Reimaging */}
                              <Link
                                to="/products/asset-reimaging"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Disc className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Asset Reimaging
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">
                                  Automated OS deployment & imaging solution.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ DIAGNOSTICS TAB ═══ */}
                          {productsDropdownTab === "diagnostics" && (
                            <>
                              {/* Hardware Diagnostics */}
                              <Link
                                to="/products/hardware-diagnostics"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Cpu className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Hardware Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Enterprise-grade diagnostic tools.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Smartphone Diagnostics */}
                              <Link
                                to="/products/smartphone-diagnostic"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Smartphone className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Smartphone Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  50+ automated tests for mobile health.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* SMART Diagnostics */}
                              <Link
                                to="/products/hard-drive-monitor"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <HardDrive className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    SMART Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Health monitoring & disk cloning.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Autopilot Detection */}
                              <Link
                                to="/products/autopilot-detection"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Bot className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Autopilot Detection
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Windows Autopilot identification.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ VERIFICATION TAB ═══ */}
                          {productsDropdownTab === "verification" && (
                            <>
                              {/* Drive Verifier */}
                              <Link
                                to="/products/drive-verifier"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <SearchCheck className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                      Erasure Verification
                                    </h4>
                                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">
                                      New
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Forensic verification & post-erasure audit
                                  tools.
                                </p>
                                <span className="text-xs font-semibold text-[#0e7c66] group-hover/card:text-[#083d28] uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div></>
    );
}
