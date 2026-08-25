import React from 'react';
import { Link } from 'react-router-dom';
import { X, Building2, Building, GraduationCap, Heart, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SolutionsMegaMenu({ setSolutionsDropdownOpen }) {
    const { t } = useTranslation();
    return (
        <>                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
                    {/* Close Button — top right */}
                    <button
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
                      aria-label="Close solutions menu"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                      {/* ── LEFT SIDEBAR ── */}
                      <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto custom-scrollbar">
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            solutionsDropdownTab === "industry"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setSolutionsDropdownTab("industry")}
                        >
                          Industries
                          {solutionsDropdownTab === "industry" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-[#0e7c66]"
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
                            solutionsDropdownTab === "specialized"
                              ? "text-[#0e7c66] bg-white border-r-2 border-[#0e7c66] font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setSolutionsDropdownTab("specialized")}
                        >
                          Specialized
                          {solutionsDropdownTab === "specialized" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-[#0e7c66]"
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

                        <div className="mt-6 px-5 text-center">
                          <Link
                            to="/solutions"
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-block w-full"
                            onClick={() => setSolutionsDropdownOpen(false)}
                          >
                            All Solutions
                          </Link>
                        </div>
                      </div>

                      {/* ── RIGHT CONTENT ── */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white px-6 pb-6">
                        <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
                          <h3 className="text-lg font-bold text-slate-800">
                            {solutionsDropdownTab === "industry"
                              ? "By Industry"
                              : "Specialized Segments"}
                          </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                          {solutionsDropdownTab === "industry" && (
                            <>
                              {/* Enterprise */}
                              <Link
                                to="/solutions/enterprise"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Building2 className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Enterprise
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Data security and sanitization for global
                                  corporations.
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

                              {/* Banking & Finance */}
                              <Link
                                to="/solutions/data-erasure-banking-finance"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <DollarSign className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Banking & Finance
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Compliance-driven erasure for financial
                                  institutions.
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

                              {/* Government */}
                              <Link
                                to="/solutions/government"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Building className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Government
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Secure sanitization for public sector &
                                  defense.
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

                              {/* Healthcare */}
                              <Link
                                to="/solutions/healthcare"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <HeartPulse className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Healthcare
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Privacy-first data disposal for healthcare
                                  providers.
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

                              {/* Education */}
                              <Link
                                to="/solutions/education"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <GraduationCap className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Education
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Managing data privacy across academic
                                  institutions.
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

                              {/* Non-Profit Organizations */}
                              <Link
                                to="/solutions/non-profit"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Heart className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Non-Profit
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Secure data disposal for NGOs & charities.
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

                          {solutionsDropdownTab === "specialized" && (
                            <>
                              {/* Service Providers */}
                              <Link
                                to="/solutions/service-providers"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <Server className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    Service Providers
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Scaleable erasure services for MSPs and MSSPs.
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

                              {/* ITAD */}
                              <Link
                                to="/solutions/itad"
                                className={`group/card ${themeClasses.card.base} p-5 hover:bg-[#f4fbf8] hover:-translate-y-1 hover:shadow-md cursor-pointer h-full`}
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#d4ede4] rounded-full transition-colors duration-150 group-hover/card:bg-[#0e7c66]">
                                    <RefreshCcw className="w-5 h-5 text-[#0e7c66] group-hover/card:text-white transition-colors duration-150" />
                                  </div>
                                  <h4 className="font-bold text-[#0a2e1e] group-hover/card:text-[#0e7c66] transition-colors duration-150">
                                    ITAD
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Maximize asset value with secure disposal
                                  workflows.
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
