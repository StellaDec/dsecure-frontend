import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  HardDrive, 
  Smartphone, 
  Laptop, 
  Server,
  Download,
  FileCheck2,
  Cpu,
  MonitorSmartphone,
  CheckCircle2,
  Activity,
  Search,
  AlertTriangle,
  Eraser,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';
import SEOHeadNative from '../components/SEOHeadNative';
import Reveal from '../components/Reveal';

// Types
type CategoryType = 'erasure' | 'diagnostics' | 'verification';

interface DocumentLink {
  title: string;
  reportUrl: string;
  certificateUrl?: string;
  icon: React.ReactNode;
  thumbnailUrl: string;
}

// Data
const documentData: Record<CategoryType, DocumentLink[]> = {
  erasure: [
    /*
    {
      title: 'Drive Eraser - Cloud',
      reportUrl: '#',
      certificateUrl: '#',
      icon: <Server className="w-6 h-6 text-teal-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    {
      title: 'Drive Eraser - Network',
      reportUrl: '#',
      certificateUrl: '#',
      icon: <HardDrive className="w-6 h-6 text-emerald-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    {
      title: 'Mac Eraser',
      reportUrl: '#',
      certificateUrl: '#',
      icon: <Laptop className="w-6 h-6 text-cyan-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    {
      title: 'Mobile Eraser',
      reportUrl: '#',
      certificateUrl: '#',
      icon: <Smartphone className="w-6 h-6 text-teal-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    */
    {
      title: 'File Eraser',
      reportUrl: 'https://assets.dsecuretech.com/Reports/file%20eraser/2160001.pdf',
      certificateUrl: '#',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      thumbnailUrl: '/images/reports/fileeraser_thumb.png'
    }
  ],
  diagnostics: [
    /*
    {
      title: 'Hardware Diagnostics',
      reportUrl: '#',
      icon: <Cpu className="w-6 h-6 text-teal-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    {
      title: 'Mobile Diagnostics',
      reportUrl: '#',
      icon: <MonitorSmartphone className="w-6 h-6 text-emerald-600" />,
      thumbnailUrl: '/images/sample-report.png'
    },
    {
      title: 'Mac Diagnostics',
      reportUrl: '#',
      icon: <Laptop className="w-6 h-6 text-cyan-600" />,
      thumbnailUrl: '/images/sample-report.png'
    }
    */
  ],
  verification: [
    /*
    {
      title: 'Drive Verifier',
      reportUrl: '#',
      certificateUrl: '#',
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      thumbnailUrl: '/images/sample-certificate.png'
    },
    */
    {
      title: 'Autopilot/MDM Detection',
      reportUrl: 'https://assets.dsecuretech.com/Reports/Autopilot/DSecureAutopilotReport_1.pdf',
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600" />,
      thumbnailUrl: '/images/reports/autopilot_thumb.png'
    }
  ]
};

const categoryTabs: { id: CategoryType; label: string }[] = [
  { id: 'erasure', label: 'Erasure' },
  // { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'verification', label: 'Verification' }
];

const ReportsAndCertificatesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('erasure');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReportUrl, setSelectedReportUrl] = useState<string>('');
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Modal kholne ka handler - certificate image aur PDF URL dono track karo
  const handleOpenModal = (thumbnailUrl: string, reportUrl: string) => {
    setSelectedImage(thumbnailUrl);
    setSelectedReportUrl(reportUrl);
    setShowFullPdf(false);
    setZoomScale(1);
  };

  // Modal band karne ka handler
  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedReportUrl('');
    setShowFullPdf(false);
    setZoomScale(1);
  };

  // Custom SEO for the new page
  const seoData = {
    title: "Sample Reports & Certificates | D-Secure Technologies",
    description: "View and download sample data erasure reports, hardware diagnostics, and verification certificates from D-Secure Technologies.",
    canonicalUrl: "https://dsecure.com/reports-and-certificates",
  };

  return (
    <div className="bg-white min-h-screen pt-16 pb-12">
      <SEOHeadNative 
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={seoData.canonicalUrl}
      />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 -z-10" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Side */}
            <Reveal>
              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Sample Reports & <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Certificates</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Explore our comprehensive, tamper-proof audit trails. Download sample reports and certificates for our data erasure, diagnostics, and verification solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#reports" className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl shadow-teal-500/30">
                    View Samples
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Illustration Side */}
            <Reveal delayMs={200}>
              <div className="relative w-full aspect-square md:aspect-[4/3] max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  
                  {/* Floating Icons Background */}
                  {/* Floating Icons Background */}
                  <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-0 left-0 md:top-10 md:-left-4 text-emerald-500 bg-white p-3 rounded-full shadow-lg border border-emerald-100 hidden md:block z-30">
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-10 left-0 md:bottom-20 md:-left-6 text-slate-500 bg-white p-3 rounded-full shadow-lg border border-slate-100 z-30">
                    <Eraser className="w-8 h-8" />
                  </motion.div>
                  <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-4 right-0 md:top-16 md:-right-8 text-slate-700 bg-white p-3 rounded-full shadow-lg border border-slate-100 hidden sm:block z-30">
                    <Activity className="w-8 h-8" />
                  </motion.div>
                  <motion.div animate={{ y: [15, -15, 15] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute bottom-20 right-0 md:bottom-32 md:-right-4 text-rose-500 bg-white p-3 rounded-full shadow-lg border border-rose-100 z-30">
                    <AlertTriangle className="w-8 h-8" />
                  </motion.div>
                  <motion.div animate={{ y: [-5, 15, -5] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }} className="absolute top-32 right-2 md:top-40 md:-right-12 text-teal-600 bg-white p-3 rounded-full shadow-lg border border-teal-100 z-30">
                    <Search className="w-8 h-8" />
                  </motion.div>

                  {/* Clipboard Container */}
                  <div className="relative z-10 w-[240px] md:w-[280px] bg-slate-100/50 rounded-xl border-4 border-slate-300 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    
                    {/* Clip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20 flex justify-center items-end pb-1 shadow-md">
                      <div className="w-12 h-1.5 bg-slate-600 rounded-full"></div>
                    </div>
                    
                    {/* Paper */}
                    <div className="m-2 mt-8 bg-white h-[300px] md:h-[340px] rounded border border-gray-100 shadow-sm p-4 relative">
                      <h3 className="text-xl font-black text-center text-slate-800 mb-4 uppercase tracking-widest border-b-2 border-slate-100 pb-3">Report</h3>
                      
                      {/* Section 1 */}
                      <div className="mb-4">
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Device Information</div>
                        <div className="space-y-2">
                          <div className="h-1.5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-11/12"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-4/5"></div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded border border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-2/3"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded border border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center border-t border-slate-100 pt-3">Other Information</div>
                        <div className="space-y-2">
                          <div className="h-1.5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-5/6"></div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded border border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-3/4"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded border border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-2/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="reports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal delayMs={100}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25'
                    : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 hover:text-teal-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {documentData[activeCategory].map((doc, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="p-3 bg-teal-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        {doc.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{doc.title}</h3>
                    </div>

                    <div 
                      className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-sm aspect-[3/4] relative group-hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => handleOpenModal(doc.thumbnailUrl, doc.reportUrl)}
                    >
                      <img src={doc.thumbnailUrl} alt={`${doc.title} Sample`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {/* Centered Zoom Icon - hamesha dikhega */}
                      <div className="absolute inset-0 flex items-center justify-center hover:bg-slate-900/10 transition-colors duration-300 pointer-events-none">
                        <div className="pointer-events-auto p-4 bg-teal-600 hover:bg-teal-700 rounded-full shadow-2xl hover:shadow-teal-500/50 hover:scale-110 transition-all duration-300">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a 
                        href={doc.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-colors group/link"
                      >
                        <span className="font-medium text-gray-700 group-hover/link:text-teal-700">Sample Report</span>
                        <Download className="w-5 h-5 text-gray-400 group-hover/link:text-teal-600" />
                      </a>
                      
                      {/* doc.certificateUrl && (
                        <a 
                          href={doc.certificateUrl}
                          className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors group/link"
                        >
                          <span className="font-medium text-gray-700 group-hover/link:text-emerald-700">Sample Certificate</span>
                          <Download className="w-5 h-5 text-gray-400 group-hover/link:text-emerald-600" />
                        </a>
                      ) */}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      {/* Report Modal - Certificate Image or Full PDF */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  {showFullPdf ? "Full Erasure Report" : "Erasure Certificate Preview"}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Zoom controls - sirf certificate view mein dikhenge */}
                  {!showFullPdf && (
                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1">
                      <button
                        onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.25))}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors"
                        aria-label="Zoom out"
                        type="button"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold text-slate-600 min-w-[3rem] text-center">
                        {Math.round(zoomScale * 100)}%
                      </span>
                      <button
                        onClick={() => setZoomScale((z) => Math.min(3, z + 0.25))}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors"
                        aria-label="Zoom in"
                        type="button"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
                    aria-label="Close report modal"
                    type="button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              {showFullPdf ? (
                /* Full PDF view */
                <div className="flex-1 w-full bg-slate-200">
                  <iframe 
                    src={selectedReportUrl}
                    className="w-full h-full border-none"
                    title="Full Report Document"
                  />
                </div>
              ) : (
                /* Certificate image preview - sirf first page, ultra crisp */
                <>
                  <div className="flex-1 w-full bg-slate-100 overflow-auto flex items-start justify-center p-6">
                    <img
                      src={selectedImage || ''}
                      alt="Erasure Certificate Preview"
                      className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-300 pointer-events-none"
                      style={{ 
                        transform: `scale(${zoomScale})`, 
                        transformOrigin: 'top center',
                        width: 'min(90vw, 800px)',
                        aspectRatio: '210/297' // Standard A4 ratio
                      }}
                      draggable={false}
                    />
                  </div>
                  {/* View Full Report button */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-center">
                    <button
                      onClick={() => setShowFullPdf(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                      type="button"
                    >
                      <Download className="w-5 h-5" />
                      View Full Report
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsAndCertificatesPage;
