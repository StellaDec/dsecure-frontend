import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '../utils/seo';

// TypeScript Types
interface SummaryData {
  label: string;
  value: string;
}

interface VerificationResult {
  isValid: boolean;
  productName?: string;
  reportId?: string;
  summaryData?: SummaryData[];
  message?: string;
}

// Mock API function
const mockVerifyReport = async (method: string, payload: any): Promise<VerificationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulation: if ID starts with 'INVALID', fail it.
      if (payload.reportId === 'INVALID' || payload.code === 'INVALID') {
        resolve({
          isValid: false,
          message: 'The provided report does not match our secure records. It may be invalid or modified.'
        });
        return;
      }

      // Default Success
      resolve({
        isValid: true,
        productName: 'File Eraser',
        reportId: payload.reportId || 'DS-FE-20260511-XYZ',
        summaryData: [
          { label: 'Target', value: 'C:/Confidential_Folder' },
          { label: 'Erasure Standard', value: 'DoD 5220.22-M' },
          { label: 'Status', value: 'Successfully Erased' },
          { label: 'Date', value: 'May 11, 2026' }
        ]
      });
    }, 1500); // 1.5s delay
  });
};

export default function ReportVerificationPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'reportId' | 'offlineCode' | 'pdf'>('reportId');
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [reportIdInput, setReportIdInput] = useState('');
  const [offlineCodeInput, setOfflineCodeInput] = useState('');

  // Auto-verify from URL params
  useEffect(() => {
    const urlReportId = searchParams.get('reportId');
    const urlCode = searchParams.get('code');

    if (urlReportId) {
      setActiveTab('reportId');
      setReportIdInput(urlReportId);
      handleVerification('reportId', { reportId: urlReportId });
    } else if (urlCode) {
      setActiveTab('offlineCode');
      setOfflineCodeInput(urlCode);
      handleVerification('offlineCode', { code: urlCode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleVerification = async (method: string, payload: any) => {
    setIsLoading(true);
    setResultData(null);
    setError(null);
    
    try {
      const result = await mockVerifyReport(method, payload);
      setResultData(result);
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleVerification('pdf', { fileName: file.name });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  return (
    <>
      <SEOHeadNative seo={getSEOForPage('verify')} />
      <div className="min-h-screen bg-slate-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              D-Secure Universal Report Verification
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Securely verify the authenticity and tamper-proof status of any D-Secure generated report.
            </p>
          </div>

          {/* Verification Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200">
              {(['reportId', 'offlineCode', 'pdf'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-brand border-b-2 border-brand bg-brand/5'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab === 'reportId' && 'Verify via Report ID'}
                  {tab === 'offlineCode' && 'Verify via Offline Code'}
                  {tab === 'pdf' && 'Upload PDF'}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Tab Content */}
              {activeTab === 'reportId' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="reportId" className="block text-sm font-medium text-slate-700 mb-2">Report ID</label>
                    <input
                      id="reportId"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                      placeholder="e.g. DS-FE-20260511-XYZ"
                      value={reportIdInput}
                      onChange={(e) => setReportIdInput(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleVerification('reportId', { reportId: reportIdInput })}
                    disabled={!reportIdInput || isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Report'}
                  </button>
                </div>
              )}

              {activeTab === 'offlineCode' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="offlineCode" className="block text-sm font-medium text-slate-700 mb-2">Offline Code</label>
                    <input
                      id="offlineCode"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                      placeholder="Enter 16-digit offline verification code"
                      value={offlineCodeInput}
                      onChange={(e) => setOfflineCodeInput(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleVerification('offlineCode', { code: offlineCodeInput })}
                    disabled={!offlineCodeInput || isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Offline Code'}
                  </button>
                </div>
              )}

              {activeTab === 'pdf' && (
                <div className="space-y-6">
                  <div 
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-brand bg-brand/5' : 'border-slate-300 hover:border-brand hover:bg-slate-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="mx-auto w-12 h-12 mb-4 text-slate-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    {isDragActive ? (
                      <p className="text-brand font-medium">Drop the PDF here ...</p>
                    ) : (
                      <p className="text-slate-600">Drag & drop a report PDF here, or click to select file</p>
                    )}
                    {acceptedFiles.length > 0 && (
                      <p className="mt-4 text-sm text-emerald-600 font-medium">
                        Selected: {acceptedFiles[0].name}
                      </p>
                    )}
                  </div>
                  {acceptedFiles.length > 0 && !isLoading && (
                     <button 
                      onClick={() => handleVerification('pdf', { fileName: acceptedFiles[0].name })}
                      className="w-full btn-primary"
                    >
                      Verify File
                    </button>
                  )}
                  {isLoading && (
                    <div className="text-center text-slate-500 font-medium py-3">
                      Analyzing PDF signature...
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Results Section */}
            {error && (
              <div className="p-6 m-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {resultData && (
              <div className="p-8 border-t border-slate-200 bg-slate-50 animate-fade-in">
                {resultData.isValid ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-emerald-700 mb-1">Authentic Report Verified</h2>
                      {resultData.productName && (
                        <p className="text-slate-600 font-medium">Generated by {resultData.productName}</p>
                      )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-6">
                      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="font-semibold text-slate-800">Verification Summary</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x sm:divide-y-reverse divide-slate-200">
                        {resultData.summaryData?.map((item, idx) => (
                          <div key={idx} className={`p-6 ${idx % 2 === 0 ? '' : 'sm:border-t-0'} ${idx > 1 ? 'border-t border-slate-200' : ''}`}>
                            <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                            <p className="font-medium text-slate-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-red-700">WARNING: Invalid or Modified Report</h2>
                    <p className="text-slate-700 max-w-lg">
                      {resultData.message || 'This report failed cryptographic verification. It may have been tampered with or generated by an unauthorized source.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
