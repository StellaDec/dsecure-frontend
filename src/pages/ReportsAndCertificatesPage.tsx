import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  File, 
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
import { 
  ThemeSection, 
  ThemeSectionHeading, 
  ThemeCard, 
  ThemeIconContainer, 
  ThemeButton,
  themeClasses
} from '../components/ui/Theme';

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
      icon: <File className="w-6 h-6 text-emerald-600" />,
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
      <ThemeSection className="relative min-h-[65vh] flex items-center py-6 overflow-hidden bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Side */}
            <Reveal>
              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0a2e1e] mb-6 leading-tight whitespace-nowrap">
                  Reports & <span className="text-[#0e7c66]">Certificates</span>
                </h1>
                <p className="text-xl text-[#5a6672] leading-relaxed mb-8">
                  Explore our comprehensive, tamper-proof audit trails. Download sample reports and certificates for our data erasure, diagnostics, and verification solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <ThemeButton onClick={() => { document.getElementById('reports')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    View Samples
                  </ThemeButton>
                </div>
              </div>
            </Reveal>

            {/* Illustration Side */}
            <Reveal delayMs={200}>
              <div className="relative w-full aspect-square md:aspect-[4/3] max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  
                  {/* Static Icons Background */}
                  <div className="absolute top-0 left-0 md:top-10 md:-left-4 text-[#0e7c66] bg-white p-3 rounded-none shadow-sm border border-[#0e7c66] hidden md:block z-30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="absolute bottom-10 left-0 md:bottom-20 md:-left-6 text-[#5a6672] bg-white p-3 rounded-none shadow-sm border border-[#d0d5dc] z-30">
                    <Eraser className="w-8 h-8" />
                  </div>
                  <div className="absolute top-4 right-0 md:top-16 md:-right-8 text-[#0a2e1e] bg-white p-3 rounded-none shadow-sm border border-[#0a2e1e] hidden sm:block z-30">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div className="absolute bottom-20 right-0 md:bottom-32 md:-right-4 text-rose-600 bg-white p-3 rounded-none shadow-sm border border-rose-200 z-30">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="absolute top-32 right-2 md:top-40 md:-right-12 text-[#0e7c66] bg-white p-3 rounded-none shadow-sm border border-[#0e7c66] z-30">
                    <Search className="w-8 h-8" />
                  </div>

                  {/* Clipboard Container */}
                  <div className="relative z-10 w-[240px] md:w-[280px] bg-slate-100/50 rounded-none border-4 border-[#0a2e1e] shadow-lg overflow-hidden">
                    
                    {/* Clip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0a2e1e] rounded-none z-20 flex justify-center items-end pb-1 shadow-sm">
                      <div className="w-12 h-1.5 bg-[#0e7c66] rounded-none"></div>
                    </div>
                    
                    {/* Paper */}
                    <div className="m-2 mt-8 bg-white h-[300px] md:h-[340px] rounded-none border border-[#d0d5dc] shadow-sm p-4 relative">
                      <h3 className="text-xl font-black text-center text-[#0a2e1e] mb-4 uppercase tracking-widest border-b-2 border-[#d0d5dc] pb-3">Report</h3>
                      
                      {/* Section 1 */}
                      <div className="mb-4">
                        <div className="text-[8px] font-bold text-[#5a6672] uppercase tracking-widest mb-2 text-center">Device Information</div>
                        <div className="space-y-2">
                          <div className="h-1.5 bg-[#d0d5dc] rounded-none w-full"></div>
                          <div className="h-1.5 bg-[#d0d5dc] rounded-none w-11/12"></div>
                          <div className="h-1.5 bg-[#d0d5dc] rounded-none w-4/5"></div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-none border border-[#0e7c66] flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-[#0e7c66]" /></div>
                            <div className="h-1.5 bg-[#0e7c66]/30 rounded-none w-2/3"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-none border border-[#0e7c66] flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-[#0e7c66]" /></div>
                            <div className="h-1.5 bg-[#0e7c66]/30 rounded-none w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <div className="text-[8px] font-bold text-[#5a6672] uppercase tracking-widest mb-2 text-center border-t border-[#d0d5dc] pt-3">Other Information</div>
                        <div className="space-y-2">
                          <div className="h-1.5 bg-[#d0d5dc] rounded-none w-full"></div>
                          <div className="h-1.5 bg-[#d0d5dc] rounded-none w-5/6"></div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-none border border-[#0e7c66] flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-[#0e7c66]" /></div>
                            <div className="h-1.5 bg-[#0e7c66]/30 rounded-none w-3/4"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-none border border-[#0e7c66] flex items-center justify-center"><CheckCircle2 className="w-2 h-2 text-[#0e7c66]" /></div>
                            <div className="h-1.5 bg-[#0e7c66]/30 rounded-none w-2/5"></div>
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
      </ThemeSection>

      {/* Main Content */}
      <section id="reports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal delayMs={100}>
          {/* Tabs */}
          <div className="flex justify-center mb-12 px-2 xs:px-4">
            <div className="border-b border-[#d0d5dc]/80 overflow-x-auto w-full max-w-lg flex justify-center">
              <div 
                role="tablist"
                className="flex space-x-6 sm:space-x-10 min-w-max px-2"
              >
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap ${
                      activeCategory === tab.id
                        ? 'border-[#0e7c66] text-[#0e7c66]'
                        : 'border-transparent text-[#2d3748] hover:text-[#0e7c66]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
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
                  <ThemeCard 
                    key={idx}
                    interactive={true}
                    className="border border-[#d0d5dc]/50 group"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="p-3 bg-[#f4fbf8] rounded-none group-hover:scale-110 transition-transform duration-300">
                        {doc.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#0a2e1e]">{doc.title}</h3>
                    </div>

                    <div 
                      className="mb-6 rounded-none overflow-hidden border border-[#d0d5dc] shadow-sm aspect-[3/4] relative group-hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => handleOpenModal(doc.thumbnailUrl, doc.reportUrl)}
                    >
                      <img src={doc.thumbnailUrl} alt={`${doc.title} Sample`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {/* Centered Zoom Icon - hamesha dikhega */}
                      <div className="absolute inset-0 flex items-center justify-center hover:bg-[#0a2e1e]/10 transition-colors duration-300 pointer-events-none">
                        <div className="pointer-events-auto p-4 bg-[#0e7c66] hover:bg-[#0a2e1e] rounded-none shadow-2xl hover:shadow-[#0e7c66]/50 hover:scale-110 transition-all duration-300">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a 
                        href={doc.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full p-3 rounded-none border border-[#d0d5dc] hover:border-[#0e7c66] hover:bg-[#f4fbf8] transition-colors group/link"
                      >
                        <span className="font-medium text-[#5a6672] group-hover/link:text-[#0e7c66]">Sample Report</span>
                        <Download className="w-5 h-5 text-[#5a6672] group-hover/link:text-[#0e7c66]" />
                      </a>
                    </div>
                  </ThemeCard>
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
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-none shadow-2xl flex flex-col overflow-hidden border border-[#d0d5dc]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-[#0a2e1e] text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  {showFullPdf ? "Full Erasure Report" : "Erasure Certificate Preview"}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Zoom controls - sirf certificate view mein dikhenge */}
                  {!showFullPdf && (
                    <div className="flex items-center gap-1 bg-white/10 rounded-none px-2 py-1">
                      <button
                        onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.25))}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-none transition-colors"
                        aria-label="Zoom out"
                        type="button"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold text-white min-w-[3rem] text-center">
                        {Math.round(zoomScale * 100)}%
                      </span>
                      <button
                        onClick={() => setZoomScale((z) => Math.min(3, z + 0.25))}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-none transition-colors"
                        aria-label="Zoom in"
                        type="button"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-none transition-colors ml-2"
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
                  <div className="p-4 border-t border-[#d0d5dc] bg-white flex items-center justify-center">
                    <ThemeButton
                      onClick={() => setShowFullPdf(true)}
                      type="button"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      View Full Report
                    </ThemeButton>
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
