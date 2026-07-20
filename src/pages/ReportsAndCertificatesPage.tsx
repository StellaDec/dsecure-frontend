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
      thumbnailUrl: 'https://res.cloudinary.com/dhwi5wevf/image/upload/v1784544510/tamc6g4n1igi46qmqdwp.png'
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
      thumbnailUrl: 'https://res.cloudinary.com/dhwi5wevf/image/upload/v1784545652/f7bfazl9lgawdsitaqys.png'
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
  const [zoomScale, setZoomScale] = useState(1);

  // Helper to close modal and reset zoom
  const handleCloseModal = () => {
    setSelectedImage(null);
    setZoomScale(1);
  };

  // Custom SEO for the new page
  const seoData = {
    title: "Sample Reports & Certificates | D-Secure Technologies",
    description: "View and download sample data erasure reports, hardware diagnostics, and verification certificates from D-Secure Technologies.",
    canonicalUrl: "https://dsecure.com/reports-and-certificates",
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <SEOHeadNative 
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={seoData.canonicalUrl}
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <div className="relative w-full aspect-square md:aspect-[4/3] max-w-lg mx-auto">
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
                  <div className="relative z-10 w-[280px] md:w-[320px] bg-slate-100/50 rounded-xl border-4 border-slate-300 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                    
                    {/* Clip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-slate-800 rounded-b-xl z-20 flex justify-center items-end pb-1.5 shadow-md">
                      <div className="w-16 h-2 bg-slate-600 rounded-full"></div>
                    </div>
                    
                    {/* Paper */}
                    <div className="m-3 mt-10 bg-white h-[360px] md:h-[400px] rounded border border-gray-100 shadow-sm p-6 relative">
                      <h3 className="text-2xl font-black text-center text-slate-800 mb-6 uppercase tracking-widest border-b-2 border-slate-100 pb-4">Report</h3>
                      
                      {/* Section 1 */}
                      <div className="mb-6">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Device Information</div>
                        <div className="space-y-2.5">
                          <div className="h-1.5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-11/12"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-4/5"></div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded border-2 border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-2/3"></div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded border-2 border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center border-t border-slate-100 pt-5">Other Information</div>
                        <div className="space-y-2.5">
                          <div className="h-1.5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-5/6"></div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded border-2 border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-500" /></div>
                            <div className="h-1.5 bg-slate-200 rounded-full w-3/4"></div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded border-2 border-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-500" /></div>
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
                      onClick={() => setSelectedImage(doc.thumbnailUrl)}
                    >
                      <img src={doc.thumbnailUrl} alt={`${doc.title} Sample`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full transform scale-50 group-hover:scale-100 transition-all duration-300">
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

      {/* Clipboard Style Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4 sm:p-8 backdrop-blur-sm overflow-hidden"
            onClick={handleCloseModal}
          >
            {/* Modal Controls */}
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-4 z-[110]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center bg-white/10 rounded-full p-1 backdrop-blur-md">
                <button
                  onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.25))}
                  className="p-2 text-white hover:text-emerald-400 hover:bg-white/20 rounded-full transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-6 h-6" />
                </button>
                <span className="text-white font-medium px-2 min-w-[60px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale(prev => Math.min(3, prev + 0.25))}
                  className="p-2 text-white hover:text-emerald-400 hover:bg-white/20 rounded-full transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-red-400 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                title="Close"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Scrollable Container for Zoomed Content */}
            <div className="w-full h-full overflow-auto flex items-center justify-center custom-scrollbar" onClick={handleCloseModal}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: zoomScale, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-slate-200/90 rounded-2xl border-[8px] border-slate-300 shadow-2xl overflow-hidden m-auto transform-origin-center transition-transform duration-200"
                style={{
                  width: 'min(90vw, 800px)',
                  aspectRatio: '210/297', // A4 aspect ratio
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Clipboard Clip at the top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-8 sm:h-10 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-end pb-2 shadow-xl border-b-4 border-slate-900">
                  <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-slate-600 rounded-full"></div>
                </div>
                
                {/* A4 Paper Content */}
                <div className="m-3 sm:m-6 mt-12 sm:mt-16 bg-white shadow-sm relative p-2 h-[calc(100%-4rem)] sm:h-[calc(100%-5.5rem)] flex justify-center items-center">
                  <img 
                    src={selectedImage} 
                    alt="Certificate Full View" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsAndCertificatesPage;
