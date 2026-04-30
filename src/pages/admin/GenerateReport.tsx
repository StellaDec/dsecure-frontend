import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from "@/auth/AuthContext";

import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { isDemoMode } from "@/data/demoData";

interface ReportFormData {
  reportTitle: string;
  headerText: string;
  headerLeftLogo: File | null;
  headerRightLogo: File | null;
  watermarkImage: File | null;
  technicianName: string;
  technicianDept: string;
  validatorName: string;
  validatorDept: string;
  technicianSignature: File | null;
  validatorSignature: File | null;
}

export default function GenerateReport() {
  useAuth();
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId?: string }>();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError, showInfo } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  // Bulk report IDs URL parameters se nikalte hain
  const bulkParam = searchParams.get("bulk");
  const bulkReportIds = bulkParam
    ? bulkParam.split(",").filter((id) => id.trim())
    : [];
  const isBulkMode = bulkReportIds.length > 0;

  const [formData, setFormData] = useState<ReportFormData>({
    reportTitle: "",
    headerText: "",
    headerLeftLogo: null,
    headerRightLogo: null,
    watermarkImage: null,
    technicianName: "",
    technicianDept: "",
    validatorName: "",
    validatorDept: "",
    technicianSignature: null,
    validatorSignature: null,
  });

  // File input references for custom triggering
  const headerLeftLogoRef = React.useRef<HTMLInputElement>(null);
  const headerRightLogoRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      const file = files ? files[0] : null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileSelect = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field validation logic
    if (!formData.reportTitle.trim()) {
      showError("Validation Error", "Please enter a report title");
      return;
    }

    if (isDemoMode()) {
      showInfo("You are in Demo Mode. Action is not permitted.");
      return;
    }

    setIsLoading(true);

    try {
      if (reportId) {
        // Single report generation API logic
        const submitData = new FormData();
        submitData.append("reportTitle", formData.reportTitle);
        submitData.append("headerText", formData.headerText);
        
        // Simulating API call for single PDF export
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showSuccess(
          "Report Generated Successfully",
          `Custom report for ID ${reportId} has been generated.`
        );
      } else if (isBulkMode) {
        // Bulk generation logic (Simulated)
        await new Promise(resolve => setTimeout(resolve, 2000));
        showSuccess(`Successfully customized ${bulkReportIds.length} reports.`);
      }

      navigate("/admin/reports");
    } catch {
      showError("Report Generation Failed", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* SEO Head component */}
      <SEOHead seo={getSEOForPage("generate-report")} />

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin/reports")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Back to reports list"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {isBulkMode ? "Bulk Customize Reports" : "Generate Custom Report"}
              </h1>
            </div>
            <p className="text-slate-600">
              Configure branding and validation details for your reports
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="font-bold text-slate-900">Report Metadata</h2>
              <p className="text-sm text-slate-600">Enter title and header information</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Title */}
              <div>
                <label htmlFor="report-title-input" className="block text-sm font-semibold text-slate-700 mb-2">
                  Report Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="report-title-input"
                  type="text"
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Annual Compliance Report"
                />
              </div>

              {/* Header Text */}
              <div>
                <label htmlFor="header-text-input" className="block text-sm font-semibold text-slate-700 mb-2">
                  Header Text <span className="text-red-500">*</span>
                </label>
                <input
                  id="header-text-input"
                  type="text"
                  name="headerText"
                  value={formData.headerText}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Company name or department"
                />
              </div>

              {/* Branding Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Left Logo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={formData.headerLeftLogo?.name || "No file selected"}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm truncate"
                    />
                    <button
                      type="button"
                      onClick={() => handleFileSelect(headerLeftLogoRef)}
                      className="btn-secondary text-sm px-3"
                    >
                      Browse
                    </button>
                  </div>
                  <input ref={headerLeftLogoRef} type="file" name="headerLeftLogo" onChange={handleInputChange} accept="image/*" className="hidden" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Right Logo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={formData.headerRightLogo?.name || "No file selected"}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm truncate"
                    />
                    <button
                      type="button"
                      onClick={() => handleFileSelect(headerRightLogoRef)}
                      className="btn-secondary text-sm px-3"
                    >
                      Browse
                    </button>
                  </div>
                  <input ref={headerRightLogoRef} type="file" name="headerRightLogo" onChange={handleInputChange} accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Validation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label htmlFor="tech-name" className="block text-sm font-semibold text-slate-700 mb-2">Technician Name</label>
                  <input id="tech-name" type="text" name="technicianName" value={formData.technicianName} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Name" />
                </div>
                <div>
                  <label htmlFor="validator-name" className="block text-sm font-semibold text-slate-700 mb-2">Validator Name</label>
                  <input id="validator-name" type="text" name="validatorName" value={formData.validatorName} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Name" />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/reports")}
                className="btn-secondary px-6"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-8 flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  "Generate PDF"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
