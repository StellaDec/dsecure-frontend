import React, { memo, useState, useEffect, useRef } from "react";
import { PRODUCT_SEO } from "../utils/seo.products";
import { ProductInternalLinks } from "@/components/ProductInternalLinks";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogPosts } from "@/data/blogPosts";
import { File, Monitor, Download, X, Search, ZoomIn, Shield, ShieldCheck, CheckCircle, ArrowRight, Globe, Cloud, Settings, FileText, Server, Trash2, HardDrive, Timer, Clock, Check, UploadCloud, FolderSync, ShieldAlert, BadgeCheck } from "lucide-react";
import {
  ThemeSection,
  ThemeSectionHeading,
  ThemeCard,
  ThemeButton,
  ThemeIconContainer,
} from "@/components/ui/Theme";
import { getSEOForPage } from "@/utils/seo";
import { generateFAQSchema } from "@/utils/seo.core";
import { useToast } from "@/components/Toast";
import { FAQSection } from "@/components/FAQSection";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { FAQItem, KeyTakeawayItem } from "@/types/seo";
import { fileEraserFAQs as importedFileEraserFAQs } from "@/data/seoFaqs";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const FileEraserPage: React.FC = memo(function FileEraserPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    country: "",
    businessType: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reports section states
  const [activeReportTab, setActiveReportTab] = useState("method-volume");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [reportZoom, setReportZoom] = useState(1);

  const reportTabs = [
    { id: "method-volume", label: "Method Volume", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/1530002.pdf" },
    { id: "file-folders", label: "File and Folders", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/2160001.pdf" },
    { id: "delete-data", label: "Delete Data", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/1920007.pdf" },
    { id: "schedule", label: "Schedule", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/DSEC-SCHD-20260710-1458-7BA32E.pdf" },
    { id: "cloud-volume", label: "Cloud Volume", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/1800002.pdf" },
    { id: "cloud-deleted-data", label: "Cloud Deleted Data", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/1800003.pdf" },
    { id: "cloud-file-folders", label: "Cloud File and Folders", pdf: "https://assets.dsecuretech.com/Reports/file%20eraser/1650001.pdf" }
  ];

  // Modal mein certificate image dikhane ke liye handler
  const handleReportClick = (pdfUrl: string, tabId: string) => {
    setSelectedPdfUrl(pdfUrl);
    setSelectedReportId(tabId);
    setShowFullPdf(false);
    setReportZoom(1);
    setIsReportModalOpen(true);
  };

  const fileEraserTakeaways: KeyTakeawayItem[] = [
    { text: "Securely erase specific files and folders without wiping the entire drive." },
    { text: "Sanitize free space to permanently remove traces of previously deleted files." },
    { text: "Meets NIST 800-88 and DoD 5220.22-M data sanitization standards." },
    { text: "Automate file erasure tasks and generate compliance-ready certificates." },
  ];

  // Single Source of Truth for FAQs imported from data
  const fileEraserFaqs = importedFileEraserFAQs;

  const demoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } else if (demoContainerRef.current?.requestFullscreen) {
        await demoContainerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Gallery images array for lightbox navigation
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png",
      alt: "Dashboard View",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/ot4kpilynrfgw9vuzrbf.png",
      alt: "Erasure Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ctujrrfv3h1visi1jrvz.png",
      alt: "File Selection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ykhnzzsbwdeuncs9uvem.png",
      alt: "Erasure Progress",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/bjklx7nvvam1m2h122zo.png",
      alt: "File Eraser Screenshot 5",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/lxs0usvvneldpij0dqwo.png",
      alt: "File Eraser Screenshot 6",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/oax8dj4tw1pitsbnbr31.png",
      alt: "File Eraser Screenshot 7",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/cninfubwl4z6u9bhoi3f.png",
      alt: "File Eraser Screenshot 8",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/dns8j5kip5vxyczqoipe.png",
      alt: "File Eraser Screenshot 9",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/k6uywfbzsktkrdzmojnm.png",
      alt: "File Eraser Screenshot 10",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/lsjiymvrj0x7jmgempbe.png",
      alt: "File Eraser Screenshot 11",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/ndoby2cwwxxsngynqp5e.png",
      alt: "File Eraser Screenshot 12",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/slvfga3d5nx66jv7uxug.png",
      alt: "File Eraser Screenshot 13",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/fpnm8lqq46ftsw0ny0ca.png",
      alt: "File Eraser Screenshot 14",
    },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/vytjbf7yigyyo6nc5qhv.png",
    //   alt: "File Eraser Screenshot 15",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mu4inz3sickwxfbtduzn.png",
    //   alt: "File Eraser Screenshot 16",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/smkmqfqk7dw0xwmfl4xa.png",
    //   alt: "File Eraser Screenshot 17",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/trcabsasqpewodfyrykl.png",
    //   alt: "File Eraser Screenshot 18",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qnl0maavgwb12eyx9drx.png",
    //   alt: "File Eraser Screenshot 19",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/y20i3mvvbzzddrzjnunf.png",
    //   alt: "File Eraser Screenshot 20",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/g59dppsz6gyjm10rf5lo.png",
    //   alt: "File Eraser Screenshot 21",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mx6or4o6uenf3q42ipqg.png",
    //   alt: "File Eraser Screenshot 22",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/bj1yo6ykwgxvkp9bbmlm.png",
    //   alt: "File Eraser Screenshot 23",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/iuvskkxwxsawnvvk8i4l.png",
    //   alt: "File Eraser Screenshot 24",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/nalxxlyfrewjxtpptplf.png",
    //   alt: "File Eraser Screenshot 25",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qxrifgrivw11cqhuegx0.png",
    //   alt: "File Eraser Screenshot 26",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/pb9yo6kfjwz8z4shw2vz.png",
    //   alt: "File Eraser Screenshot 27",
    // },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1784175102/sc7uwieizwc6c4iszuib.png",
      alt: "Tamper-proof Erasure Report",
    },
  ];

  // Number of additional images beyond the 4th card (for "More" badge)
  const additionalImagesCount = galleryImages.length - 4;

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const sectionNavItems = [
    { id: "erase-types", label: "Erase Types" },
    { id: "demo", label: "Demo" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "blogs", label: "Blogs" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show nav after scrolling past hero section (approx 400px)
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      // Only dispatch event to hide/show main navbar on desktop (md+) screens
      // since sticky nav is hidden on mobile
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      // Find current active section
      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      // Reset main navbar visibility on unmount (only on desktop)
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const eraseTypes = [
    {
      name: "Files & Folders",
      desc: "Regulatory data wiping for individual files, folders, and partitions without affecting the entire drive, with multi-pass overwrite algorithms.",
      icon: FolderSync,
    },
    {
      name: "Free Space & Deleted Data",
      desc: "Permanently wipe unused disk space and previously deleted files to prevent any chance of forensic recovery.",
      icon: Trash2,
    },
    {
      name: "Cloud Storage Data",
      desc: "Remove data from connected cloud platforms like Google Drive, OneDrive, Dropbox, and iCloud.",
      icon: UploadCloud,
    },
    {
      name: "High-Speed Erasure",
      desc: "Simultaneously erase multiple files and drives with optimized algorithms for maximum efficiency.",
      icon: Timer,
    },
    {
      name: "Automate Erasure Tasks",
      desc: "Schedule automatic data destruction routines based on specific triggers or time intervals.",
      icon: Clock,
    },
    {
      name: "Volume Erase",
      desc: "Completely erase volume partitions including boot sectors, partition tables, and all data structures.",
      icon: HardDrive,
    },
  ];

  const platforms = [
    {
      name: "Windows",
      versions: "Windows 10, 11, Server 2016+ etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "macOS",
      versions: "Monterey, Ventura, Sonoma, Sequoia etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Linux",
      versions: "Ubuntu, CentOS, Debian, RHEL etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.072-.2-.052-.334.033-.466.204-.263.466-.399.795-.528.396-.2.762-.269 1.139-.268h.13zm4.006 2.933c-.009.04-.009.037-.012.071-.075.443-.134.8-.166 1.2-.028.332-.043.663-.044.998l.003.467.004.073.009.135.003.2.016.267c.09.333.15.6.313.8.082.103.17.2.27.27.136.07.272.135.41.135.074 0 .15-.015.223-.04.31-.112.48-.332.618-.59.109-.202.17-.403.217-.598.04-.195.067-.39.08-.545.031-.4.049-.664.049-.664l-.003-.402-.01-.267-.014-.202c-.012-.133-.03-.266-.053-.397v-.003L13 9.4v-.003l-.048-.2h.003l.025.003c-.038-.007-.077-.01-.116-.02-.062-.01-.124-.029-.184-.04z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "27+ Erasure Standards",
      desc: "Support for NIST 800-88, DoD 5220.22-M, Gutmann, HMG, and other internationally recognized erasure methods.",
      icon: Shield,
    },
    {
      title: "Multi-Language Support",
      desc: "User-friendly interface available in 20+ languages for global enterprise deployment.",
      icon: Globe,
    },
    {
      title: "Cloud Data Erasure",
      desc: "Securely remove files from connected cloud storage services with verifiable deletion.",
      icon: Cloud,
    },
    {
      title: "Scheduled Erasure",
      desc: "Automate data destruction with scheduled tasks for regular cleanup and compliance maintenance.",
      icon: Settings,
    },
    {
      title: "Drag & Drop Selection",
      desc: "Intuitive file selection with drag-and-drop interface for quick and easy data erasure.",
      icon: File,
    },
    {
      title: "Detailed PDF Reports",
      desc: "Generate comprehensive, tamper-proof erasure certificates for audit and compliance documentation.",
      icon: FileText,
    },
    {
      title: "Enterprise Scalability",
      desc: "Deploy across thousands of endpoints with centralized management and monitoring.",
      icon: Server,
    },
    {
      title: "Custom Branding",
      desc: "White-label solution with your organization's branding for client-facing reports.",
      icon: BadgeCheck,
    },
    {
      title: "Encryption",
      desc: "Military-grade encryption secures data before erasure, preventing unauthorized access during the process.",
      icon: ShieldAlert,
    },
    {
      title: "Centralized Logging",
      desc: "Maintain a centralized immutable log of all erasure activities for security audits.",
      icon: Server,
    },
  ];

  const useCases = [
    {
      title: "Individual Privacy Protection",
      desc: "Stop identity theft before it happens. Recovered financial records and personal photos can be used for blackmail if not permanently erased.",
      icon: Shield,
    },
    {
      title: "Enterprise Data Governance",
      desc: "Don't let your secrets become public. Deleted corporate data in the wrong hands leads to massive financial loss and reputation destruction.",
      icon: Server,
    },
    {
      title: "Cloud Data Exposure",
      desc: "Deleting files in the cloud doesn't mean they are gone. Ghost copies leave you vulnerable to breaches indefinitely without secure erasure.",
      icon: Cloud,
    },
    {
      title: "Avoid Compliance Fines",
      desc: "Regulatory fines can bankrupt a business. Failing to prove verifiable data destruction guarantees penalties under GDPR, HIPAA, and SOX.",
      icon: FileText,
    },
  ];

  const relatedBlogs = blogPosts
    .filter((post) =>
      [
        "overwrite-guide",
        "ssd-wipe-guide",
        "data-erasure-myths",
        "local-llm-data-erasure",
      ].includes(post.id),
    )
    .slice(0, 4);

  const complianceStandards = [
    {
      name: "NIST 800-88",
      desc: "Guidelines for media sanitization ensuring data is permanently irretrievable.",
    },
    {
      name: "DoD 5220.22-M",
      desc: "Standard for data erasure used by the U.S. Department of Defense.",
    },
    {
      name: "GDPR",
      desc: "Ensures 'Right to Erasure' compliance for personal data protection.",
    },
    {
      name: "HIPAA",
      desc: "Protects sensitive patient health information from unauthorized access.",
    },
    {
      name: "SOX",
      desc: "Mandates secure data lifecycle management for corporate financial records.",
    },
    {
      name: "PCI-DSS",
      desc: "Requirements for secure disposal of cardholder data and sensitive info.",
    },
  ];

  const handleModalInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DataSheetFileEraser.pdf";
    link.download = "DataSheetFileEraser.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <SEOHeadNative 
        seo={getSEOForPage("file-eraser")} 
        structuredData={generateFAQSchema(fileEraserFaqs)} 
      />

      {/* Breadcrumb Navigation — SEO ke liye */}
      <div className="container mx-auto px-4 pt-4 pb-1">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'File Eraser', path: '/products/file-eraser' },
          ]}
        />
      </div>

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        {/* ================= HERO SECTION ================= */}
        <section className="py-8 lg:py-12 xl:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0e7c66] px-4 py-2 rounded-full text-sm font-semibold">
                      <Shield className="w-4 h-4" />
                      Enterprise-Grade File Erasure
                    </div>
                    {/* Link to Network Edition */}
                    <Link 
                      to="/products/file-eraser-network"
                      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-100 transition-colors group"
                    >
                      <Monitor className="w-4 h-4 animate-pulse text-emerald-600" />
                      <span>New: Network Edition Available</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      File Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Securely shred files, folders, and free space beyond recovery. 
                    D-Secure File Eraser provides NIST-compliant data sanitization 
                    with tamper-proof certificates for GDPR & HIPAA compliance.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "SOC 2"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <ThemeButton
                      onClick={() => window.location.href = "/pricing-and-plan?product=file-eraser"}
                    >
                      Buy Now
                    </ThemeButton>
                    {/*
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Contact Sales
                    </Link>
                    */}
                    <ThemeButton
                      variant="outline"
                      onClick={downloadCatalog}
                      icon={<Download className="w-5 h-5" />}
                    >
                      Download Datasheet
                    </ThemeButton>
                  </div>
                </div>

                
              </Reveal>

              {/* Right: Hero Illustration - Software Screenshot + 3D Product Box */}
              <Reveal delayMs={100}>
                <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[480px]" style={{ perspective: '1200px' }}>
                  
                  {/* Left: Dashboard Screenshot — hover par zoom in/out */}
                  <div 
                    className="absolute w-[220px] sm:w-[280px] lg:w-[360px] cursor-pointer" 
                    style={{ 
                      zIndex: 10,
                      top: '50%', left: '50%',
                      transform: 'translate(-85%, -50%) rotate(-8deg)',
                      transition: 'transform 0.5s ease, z-index 0s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-88%, -53%) rotate(-8deg) scale(1.08)'; e.currentTarget.style.zIndex = '30'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-85%, -50%) rotate(-8deg) scale(1)'; e.currentTarget.style.zIndex = '10'; }}
                  >
                    <div className="border border-[#d0d5dc]/80 rounded-lg overflow-hidden shadow-2xl bg-white">
                      <img 
                        loading="lazy" 
                        decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                        alt="D-Secure File Eraser Software Interface"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Right: Erasure Report — hover par zoom in/out */}
                  <div 
                    className="absolute w-[160px] sm:w-[200px] lg:w-[240px] cursor-pointer" 
                    style={{ 
                      zIndex: 10,
                      top: '50%', left: '50%',
                      transform: 'translate(-15%, -50%) rotate(8deg)',
                      transition: 'transform 0.5s ease, z-index 0s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-12%, -53%) rotate(8deg) scale(1.08)'; e.currentTarget.style.zIndex = '30'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-15%, -50%) rotate(8deg) scale(1)'; e.currentTarget.style.zIndex = '10'; }}
                  >
                    <div className="relative border border-[#d0d5dc]/80 rounded-lg shadow-xl overflow-hidden bg-white">
                      <img 
                        loading="lazy" 
                        decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1784175102/sc7uwieizwc6c4iszuib.png"
                        alt="File Eraser Tamper-proof Report"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Center: 3D Product Box — hover par zoom in/out */}
                  <div 
                    className="absolute w-[130px] sm:w-[160px] lg:w-[190px] cursor-pointer drop-shadow-2xl" 
                    style={{ 
                      zIndex: 20,
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -45%)',
                      transition: 'transform 0.5s ease, z-index 0s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.12)'; e.currentTarget.style.zIndex = '30'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-50%, -45%) scale(1)'; e.currentTarget.style.zIndex = '20'; }}
                  >
                      <div
                        className="relative"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'rotateY(-12deg) rotateX(2deg) rotate(3deg)',
                        }}
                      >
                      {/* Main Box - Front Face */}
                      <div
                        className="relative bg-gradient-to-br from-[#0a2e1e] via-[#0e7c66] to-[#0a2e1e] rounded-lg shadow-2xl overflow-hidden"
                        style={{
                          aspectRatio: '3/4',
                          boxShadow: '20px 20px 50px rgba(0,0,0,0.35), -3px -3px 10px rgba(255,255,255,0.05), inset 0 0 60px rgba(255,255,255,0.03)',
                        }}
                      >
                        {/* Top Shine Effect */}
                        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/15 to-transparent"></div>

                        {/* Side Shadow (3D depth) */}
                        <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent"></div>

                        {/* Product Box Content — Proportionally sized for compact box */}
                        <div className="relative h-full flex flex-col items-center justify-center p-3 lg:p-4">
                          {/* D-Secure Brand - top left */}
                          <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                            <span className="text-white/80 text-[7px] lg:text-[9px] font-semibold tracking-widest uppercase">
                              D-Secure
                            </span>
                          </div>

                          {/* Main Icon — Lucide File icon */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 lg:mb-3 border border-white/20 shadow-inner">
                            <File className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
                          </div>

                          {/* Product Name */}
                          <h2 className="text-white text-xs sm:text-sm lg:text-base font-bold tracking-tight text-center mb-0.5">
                            File Eraser
                          </h2>

                          {/* Tagline */}
                          <p className="text-white/70 text-[6px] sm:text-[7px] lg:text-[9px] text-center tracking-wide uppercase">
                            Secure Data Destruction
                          </p>

                          {/* Bottom Badge — Regulatory Erasure */}
                          <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-1.5 py-0.5 lg:px-2.5 lg:py-1 rounded-full border border-white/20">
                              <ShieldCheck className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-emerald-300" strokeWidth={2} />
                              <span className="text-white/90 text-[5px] sm:text-[6px] lg:text-[8px] font-semibold whitespace-nowrap">
                                Regulatory Erasure
                              </span>
                            </div>
                          </div>

                          {/* Decorative Lines */}
                          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        </div>

                        {/* Pulse border */}
                        <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                      </div>

                      {/* Right Side Face (3D spine) */}
                      <div
                        className="absolute top-0 right-0 w-[20px] lg:w-[28px] h-full bg-gradient-to-l from-[#063d2e] to-[#0a5c48]"
                        style={{
                          transform: 'rotateY(90deg) translateZ(0px) translateX(10px)',
                          transformOrigin: 'left center',
                          borderRadius: '0 4px 4px 0',
                        }}
                      ></div>
                    </div>

                    {/* Bottom Reflection */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-gradient-to-t from-emerald-600/15 to-transparent blur-xl rounded-full"></div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= REPORTS SECTION ================= */}
        <ThemeSection id="reports" alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="View detailed erasure reports required for compliance and auditing purposes.">
                Erasure Reports
              </ThemeSectionHeading>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Report Tabs */}
              <div className="w-full lg:w-1/3 flex flex-col gap-2">
                {reportTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveReportTab(tab.id)}
                    className={`text-left px-6 py-4 transition-all duration-300 font-semibold border ${
                      activeReportTab === tab.id
                        ? "bg-[#0e7c66] text-white border-[#0e7c66] shadow-lg lg:scale-105"
                        : "bg-white text-[#5a6672] border-[#d0d5dc]/60 hover:bg-[#d4ede4] hover:text-[#0a2e1e]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Preview Area */}
              <div className="w-full lg:w-2/3">
                {reportTabs.map((tab) => (
                  activeReportTab === tab.id && (
                    <Reveal key={tab.id}>
                      <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9]">
                        {/* Static image thumbnail of the PDF */}
                        <img 
                          src={`/images/reports/${tab.id}.png`}
                          alt={`${tab.label} Report Preview`}
                          className="w-full h-full object-cover object-top opacity-90 transition-opacity hover:opacity-100"
                          loading="lazy"
                        />
                        
                        {/* Centered Zoom Icon */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center hover:bg-slate-900/10 transition-colors duration-300 pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleReportClick(tab.pdf, tab.id);
                            }}
                            className="pointer-events-auto flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300"
                            aria-label="Zoom Certificate"
                          >
                            <ZoomIn className="w-8 h-8" />
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  )
                ))}
              </div>
            </div>

            {/* View All Reports Button */}
            <div className="mt-12 text-center flex justify-center">
              <ThemeButton
                onClick={() => window.location.href = "/reports-and-certificates"}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                View All Reports
              </ThemeButton>
            </div>
          </div>
        </ThemeSection>

        {/* ================= WHAT YOU CAN ERASE ================= */}
        
        {/* ================= KEY TAKEAWAYS ================= */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <KeyTakeaways items={fileEraserTakeaways} title="Why Choose D-Secure File Eraser?" />
          </div>
        </section>

        <ThemeSection id="erase-types">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Comprehensive data destruction capabilities for all types of sensitive information">
                What You Can Erase
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eraseTypes.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 50}>
                  <ThemeCard className="h-full">
                    <ThemeIconContainer size="lg" icon={item.icon} className="mb-5" />
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0e7c66] transition-colors">
                      {item.name}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= VIDEO SECTION ================= */}
        <ThemeSection id="demo" alternate>
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Watch how D-Secure File Eraser permanently destroys sensitive data with audit-ready documentation">
                See File Eraser in Action
              </ThemeSectionHeading>
            </Reveal>

            {/* Media Grid - 1 Video + 2 Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Main Video Card */}
              {/* Embedded Product Demo - Sandbox Style */}
              <Reveal delayMs={100}>
                <div
                  ref={demoContainerRef}
                  className={`relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-emerald-200/30 transition-shadow duration-500 flex flex-col group ${
                    isFullscreen
                      ? "w-full h-full rounded-none"
                      : "rounded-2xl h-full min-h-[800px]"
                  }`}
                >
                  {/* Fullscreen Toggle Button (visible only when demo is active) */}
                  {isDemoActive && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-12 right-4 z-50 p-2.5 bg-slate-900/80 hover:bg-emerald-600 text-white rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
                      title={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      )}
                      <span className="text-sm font-medium pr-1 hidden sm:block">
                        {isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                      </span>
                    </button>
                  )}

                  {!isDemoActive ? (
                    /* Demo Placeholder - Screenshot Thumbnail */
                  <button
                    onClick={() => setIsDemoActive(true)}
                    className="group relative w-full h-full min-h-[400px] flex-1 cursor-pointer overflow-hidden border-none p-0 m-0 bg-transparent text-left"
                    aria-label="Start interactive demo"
                  >
                      {/* Screenshot Background */}
                      <img loading="lazy" decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                        alt="D-Secure File Eraser Preview"
                        className="w-full h-full object-contain bg-slate-50 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      {/* Subtle overlay for play button visibility */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
                      {/* Centered Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-emerald-200 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-7 h-7 text-white ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-slate-200/80">
                            Click to start interactive demo
                          </span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    /* Iframe Container */
                    <iframe
                      src="https://d-secure-file-erase-sand-box.vercel.app/"
                      className="w-full h-full flex-1 border-0"
                      title="D-Secure File Eraser Demo"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                      allow="clipboard-read; clipboard-write; fullscreen"
                      allowFullScreen
                    />
                  )}
                </div>
              </Reveal>

              {/* [OLD VIDEO CARD - PRESERVED AS COMMENT]
              <Reveal delayMs={100}>
                <div
                  onClick={() => setShowVideoModal(true)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-bold text-lg">
                            File Eraser
                          </h3>
                          <p className="text-emerald-400 text-sm font-medium">
                            Product Demo
                          </p>
                        </div>
                      </div>
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-2xl">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                          <svg
                            className="w-7 h-7 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-4 text-white/70 text-sm font-medium">
                        Click to watch demo
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-500/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        VIDEO
                      </span>
                      <span className="text-slate-400 text-xs">6:10</span>
                    </div>
                    <h2 className="font-bold text-slate-900 mb-1">
                      Product Demo
                    </h2>
                    <p className="text-sm text-slate-500">
                      Complete walkthrough of File Eraser features
                    </p>
                  </div>
                </div>
              </Reveal>
              */}

              {/* Screenshot Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Screenshot 1 */}
                <Reveal delayMs={150}>
                  <button
                    onClick={() => setSelectedImageIndex(0)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 1"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_1_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      {/* Uncomment when image ready: */}
                      <img loading="lazy" decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                        alt="Dashboard View"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 2 */}
                <Reveal delayMs={200}>
                  <button
                    onClick={() => setSelectedImageIndex(1)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 2"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_2_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      {/* Uncomment when image ready: */}
                      <img loading="lazy" decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/ot4kpilynrfgw9vuzrbf.png"
                        alt="Erasure Report"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 3 */}
                <Reveal delayMs={250}>
                  <button
                    onClick={() => setSelectedImageIndex(2)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 3"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_3_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      {/* Uncomment when image ready: */}
                      <img loading="lazy" decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ctujrrfv3h1visi1jrvz.png"
                        alt="File Selection"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 4 - Shows "More" badge if additional images exist */}
                <Reveal delayMs={300}>
                  <button
                    onClick={() => setSelectedImageIndex(3)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View more screenshots"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_4_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      {/* Uncomment when image ready: */}
                      <img loading="lazy" decoding="async"
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ykhnzzsbwdeuncs9uvem.png"
                        alt="Erasure Progress"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* More Images Badge */}
                      {additionalImagesCount > 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xl sm:text-2xl font-bold">
                            +{additionalImagesCount} More
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* ================= HOW IT WORKS (Help Manual) ================= */}
        <ThemeSection id="how-it-works">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Downloadable Software For Windows, Mac & Linux OS">
                How To Use <span className="text-[#0e7c66]">D-Secure</span> File Eraser?
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Visual Flow Diagram (7 cols) */}
              <div className="lg:col-span-7">
                <Reveal delayMs={100}>
                  <div className="relative">
                    {/* Flow Steps */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                      {/* Step 1: Download */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-[#d4ede4] rounded-2xl p-6 border border-[#a8dbc8] group-hover:border-[#0e7c66] transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <Cloud className="w-10 h-10 text-[#0e7c66]" />
                          <div className="absolute -bottom-2">
                            <Download className="w-5 h-5 text-[#0e7c66] bg-white rounded-full p-0.5 shadow-sm" />
                          </div>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Download D-Secure File Eraser Software
                        </p>
                      </div>

                      {/* Arrow 1 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>

                      {/* Step 2: Install */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-[#d4ede4] rounded-2xl p-6 border border-[#a8dbc8] group-hover:border-[#0e7c66] transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <Monitor className="w-10 h-10 text-[#0e7c66]" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Install D-Secure File Eraser
                        </p>
                      </div>

                      {/* Arrow 2 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>

                      {/* Step 3: Select */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-[#d4ede4] rounded-2xl p-6 border border-[#a8dbc8] group-hover:border-[#0e7c66] transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <FileText className="w-10 h-10 text-[#0e7c66]" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[140px]">
                          Select Files/Folders/ Volumes To Erase
                        </p>
                      </div>

                      {/* Arrow 3 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>

                      {/* Step 4: Erase */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-[#d4ede4] rounded-2xl p-6 border border-[#a8dbc8] group-hover:border-[#0e7c66] transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <File className="w-10 h-10 text-[#0e7c66]" />
                          <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <Shield className="w-4 h-4 text-[#0e7c66]" />
                          </div>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Erase & Save Report
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Text Content (5 cols) */}
              <div className="lg:col-span-5">
                <Reveal delayMs={200}>
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      <strong className="text-slate-900">
                        D-Secure File Eraser
                      </strong>{" "}
                      can be deployed across{" "}
                      <strong className="text-slate-900">
                        Windows, Mac, and Linux
                      </strong>{" "}
                      systems to permanently erase files, folders, and traces
                      beyond recovery.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Select the file/s or folders or search the name to erase.
                      The <strong className="text-emerald-700">Cloud</strong>{" "}
                      allows administrators to execute and monitor erasures
                      remotely across multiple endpoints as well.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link
                        to="/support/help-manual/complete-manual"
                        className="inline-flex items-center gap-2 text-[#0e7c66] font-bold hover:text-[#083d28] transition-colors group"
                      >
                        Help Manual
                        <FileText className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* <div className="pt-2">
                      <Link
                        to="/support/help-manual"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium"
                      >
                        <div className="p-1 border border-slate-300 rounded">
                          <FileText className="w-4 h-4" />
                        </div>
                        Help Manual
                      </Link>
                    </div> */}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </ThemeSection>

         {/* ================= TAMPER PROOF REPORT ================= */}
        {false && (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0e7c66] px-4 py-2 rounded-full text-sm font-semibold">
                    <Shield className="w-4 h-4" />
                    Audit-Ready Documentation
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Tamper-proof Erasure Report
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Generates digitally signed reports of erasure to help meet statutory & regulatory compliance. Option to save reports locally or on secure cloud console in PDF format
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <button
                  onClick={() => setSelectedImageIndex(galleryImages.length - 1)}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group cursor-pointer w-full max-w-[320px] sm:max-w-[400px] mx-auto text-left p-0 border-none bg-slate-50 block"
                  aria-label="View Tamper-proof Erasure Report fullscreen"
                >
                  <img loading="lazy" decoding="async"
                    src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1784175102/sc7uwieizwc6c4iszuib.png"
                    alt="Tamper-proof Erasure Report"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 to-transparent pointer-events-none"></div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-emerald-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>
            </div>
          </div>
        </section>
        )}

        {/* ================= COMPLIANCE STANDARDS ================= */}
        <ThemeSection id="compliance" alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="D-Secure File Eraser supports organizational compliance initiatives by aligning with widely accepted data protection principles and secure erasure best practices">
                Compliance-Ready by Design
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {complianceStandards.map((std, i) => (
                <Reveal key={std.name} delayMs={i * 50}>
                  <ThemeCard className="h-full text-center items-center">
                    <ThemeIconContainer size="md" icon={CheckCircle} className="mb-4" />
                    <h2 className="font-bold text-slate-900 mb-2">{std.name}</h2>
                    <p className="text-xs text-slate-600 leading-relaxed flex-grow">
                      {std.desc}
                    </p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= PLATFORM SUPPORT ================= */}
        <ThemeSection id="platforms">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Full support across your entire technology ecosystem">
                Multi-Platform Support
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 80}>
                  <ThemeCard className="h-full items-center text-center">
                    <div className="w-16 h-16 flex-shrink-0 text-[#0e7c66] flex items-center justify-center bg-[#d4ede4] rounded-full mb-4">
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0e7c66] transition-colors">
                        {p.name}
                      </h2>
                      <p className="text-sm text-slate-500">{p.versions}</p>
                    </div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

       

        {/* ================= KEY FEATURES ================= */}
        <ThemeSection id="features" alternate>
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Enterprise-grade capabilities designed for security professionals">
                Powerful Features
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delayMs={i * 40}>
                  <ThemeCard className="h-full">
                    <ThemeIconContainer size="md" icon={f.icon as any} className="mb-4" />
                    <h2 className="font-bold text-slate-900 mb-2 group-hover:text-[#0e7c66] transition-colors">{f.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                      {f.desc}
                    </p>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= USE CASES ================= */}
        <ThemeSection id="use-cases">
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <ThemeSectionHeading centered subtitle="Trusted by individuals and enterprises worldwide">
                Use Cases
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delayMs={i * 80}>
                  <ThemeCard className="h-full">
                    <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">
                      <ThemeIconContainer size="lg" icon={u.icon as any} />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0e7c66] transition-colors">
                          {u.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                          {u.desc}
                        </p>
                      </div>
                    </div>
                  </ThemeCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>

        {/* ================= RELATED RESOURCES (BLOG) ================= */}
        <section id="blogs" className="py-16 lg:py-24 bg-emerald-950">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Technical Blogs
                  </h2>
                  <p className="text-lg text-emerald-50 max-w-2xl">
                    Expert insights on data security, erasure standards, and
                    best practices
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors group mb-6 md:mb-0"
                >
                  View More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBlogs.map((blog, i) => (
                <Reveal key={blog.id} delayMs={i * 60}>
                  <div className="relative bg-white rounded-none sm:rounded-none p-4 sm:p-6 border border-emerald-900 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
                      <Link to={blog.link} className="after:absolute after:inset-0">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-emerald-800 font-semibold text-sm mb-4 group-hover:gap-2 gap-1 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                      <span>{blog.publishDate}</span>
                      <span>
                        {blog.readTime || getReadTime(blog.excerpt)}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ProductInternalLinks currentProduct="file-eraser" />

        {/* ================= FAQ SECTION ================= */}
        <FAQSection faqs={fileEraserFaqs} />

        {/* ================= ENQUIRY / CTA SECTION ================= */}
        <ThemeSection id="contact">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Talk to Our Data Security Experts
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get personalized guidance on deployment, licensing, and
                    audit-ready data erasure strategies tailored to your
                    organization's needs.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Enterprise & SMB licensing options",
                      "Compliance-focused implementation",
                      "White-label branding available",
                      "No-obligation consultation",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <ThemeIconContainer size="md" icon={CheckCircle as any} />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#0e7c66] font-semibold hover:text-[#083d28] transition-colors"
                    >
                      Or contact us directly
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Request Information
                  </h2>
                  <form
                    className="space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);

                      try {
                        const now = new Date();
                        const timestampLocal = now.toLocaleString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        });
                        const timestampISO = now.toISOString();

                        // === FormSubmit ke liye FormData taiyar karein ===
                        const formSubmitData = new FormData();
                        // Backend ko notify karne ke liye webhook - backend auto-response email bhejega
                        formSubmitData.append(
                          "_webhook",
                          `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
                        );
                        formSubmitData.append("_captcha", "false");
                        formSubmitData.append("_template", "table");
                        formSubmitData.append("sendAutoReply", "true"); // Auto-reply enable karein

                        // Form fields
                        formSubmitData.append("name", formData.name.trim());
                        formSubmitData.append("email", formData.email.trim());
                        formSubmitData.append("customer_email", formData.email.trim()); // Customer ka email auto-reply ke liye
                        formSubmitData.append(
                          "organization",
                          formData.organization.trim(),
                        );
                        formSubmitData.append("phone", formData.phone.trim());
                        formSubmitData.append("country", formData.country.trim());
                        formSubmitData.append("businessType", formData.businessType.trim());
                        formSubmitData.append(
                          "message",
                          formData.message.trim(),
                        );

                        // Autoresponse ke liye reply-to zaroori hai
                        formSubmitData.append(
                          "_replyto",
                          formData.email.trim(),
                        );
                        formSubmitData.append("timestamp", timestampLocal);
                        formSubmitData.append(
                          "source",
                          "File Eraser Page Contact",
                        );

                        // Subject aur CC
                        formSubmitData.append(
                          "_subject",
                          "New Inquiry - File Eraser Page - D-Secure Tech",
                        );
                        formSubmitData.append(
                          "_cc",
                          import.meta.env.VITE_FORM_CC_EMAILS,
                        );

                        // === Prepare submission data for Backend API ===
                        const submissionData = {
                          name: formData.name.trim(),
                          email: formData.email.trim(),
                          company: formData.organization.trim(),
                          phone: formData.phone.trim(),
                          country: formData.country.trim(),
                          businessType: formData.businessType.trim(),
                          solutionType: "file-erasure",
                          complianceRequirements: "",
                          message: formData.message.trim(),
                          usageType: "",
                          source: "File Eraser Page Contact",
                          timestamp: timestampISO,
                        };

                        // Reset form and show success immediately
                        setFormData({
                          name: "",
                          email: "",
                          organization: "",
                          phone: "",
                          country: "",
                          businessType: "",
                          message: "",
                        });
                        setIsLoading(false);
                        showToast(
                          "Thank you! Your enquiry has been submitted successfully.",
                          "success",
                        );

                        try {
                          // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                          const API_BASE = import.meta.env.VITE_API_BASE_URL;
                          const apiResponse = await fetch(
                            `${API_BASE}/api/ContactFormSubmissions`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(submissionData),
                            },
                          );

                          // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
                          await fetch(
                            import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
                            {
                              method: "POST",
                              body: formSubmitData,
                              headers: { Accept: "application/json" },
                            },
                          );

                          // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
                          fetch(import.meta.env.VITE_POWER_AUTOMATE_HTTP_URL || "", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "x-api-key": import.meta.env.VITE_POWER_AUTOMATE_API_KEY,
                            },
                            body: JSON.stringify(submissionData),
                          }).catch(() => {});

                          if (!apiResponse.ok) {
                            const errorData = await apiResponse.json();
                            console.error(
                              "Backend submission failed:",
                              errorData,
                            );
                          }
                        } catch (error: any) {
                          console.error("Form error:", error);
                          showToast(
                            error.message ||
                              "Failed to send message. Please try again later.",
                            "error",
                          );
                        }
                      } catch (error) {
                        console.error("FormSubmit error:", error);
                        showToast(
                          "Failed to submit enquiry. Please try again.",
                          "error",
                        );
                        setIsLoading(false);
                      }
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name *"
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleModalInputChange}
                          placeholder="Email *"
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleModalInputChange}
                          placeholder="Phone Number"
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleModalInputChange}
                          placeholder="Country"
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleModalInputChange}
                          placeholder="Organization"
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                      <div>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleModalInputChange}
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors appearance-none"
                        >
                          <option value="" disabled className="text-slate-800">Business Type</option>
                          <option value="Enterprise" className="text-slate-800">Enterprise</option>
                          <option value="SMB" className="text-slate-800">SMB</option>
                          <option value="ITAD/Recycler" className="text-slate-800">ITAD / Recycler</option>
                          <option value="Government/Public Sector" className="text-slate-800">Government / Public Sector</option>
                          <option value="Individual/Home" className="text-slate-800">Individual / Home</option>
                          <option value="Other" className="text-slate-800">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleModalInputChange}
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <ThemeButton
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </ThemeButton>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

      </div>

      {/* Lightbox Modal with Gallery Navigation */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setSelectedImageIndex(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSelectedImageIndex(null);
            }
          }}
          aria-label="Close gallery"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img loading="lazy" decoding="async"
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setShowVideoModal(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowVideoModal(false);
            }
          }}
          aria-label="Close video"
        >
          {/* Close Button */}
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="https://res.cloudinary.com/dhwi5wevf/video/upload/f_auto,q_auto/v1770725346/jqkinwc7zk4w2ak9nplw.3gp"
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            >
              <track kind="captions" />
            </video>
          </div>
        </div>
      )}

      {/* Report Modal - Certificate Image or Full PDF */}
      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => { setIsReportModalOpen(false); setShowFullPdf(false); setReportZoom(1); }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-none shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0e7c66]" />
                {showFullPdf ? "Full Erasure Report" : "Erasure Certificate Preview"}
              </h3>
              <div className="flex items-center gap-2">
                {/* Zoom controls - sirf certificate view mein dikhenge */}
                {!showFullPdf && (
                  <div className="flex items-center gap-1 bg-slate-100 rounded-none px-2 py-1">
                    <button
                      onClick={() => setReportZoom((z) => Math.max(0.5, z - 0.25))}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-none transition-colors"
                      aria-label="Zoom out"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    </button>
                    <span className="text-xs font-semibold text-slate-600 min-w-[3rem] text-center">{Math.round(reportZoom * 100)}%</span>
                    <button
                      onClick={() => setReportZoom((z) => Math.min(3, z + 0.25))}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-none transition-colors"
                      aria-label="Zoom in"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                )}
                <button
                  onClick={() => { setIsReportModalOpen(false); setShowFullPdf(false); setReportZoom(1); }}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-none transition-colors"
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
                  src={selectedPdfUrl}
                  className="w-full h-full border-none"
                  title="Full Report Document"
                />
              </div>
            ) : (
              /* Certificate image preview - sirf first page */
              <>
                <div className="flex-1 w-full bg-slate-100 overflow-auto flex items-start justify-center p-6">
                  <img
                    src={`/images/reports/${selectedReportId}.png`}
                    alt="Erasure Certificate"
                    className="max-w-full h-auto rounded-none shadow-lg transition-transform duration-300 border border-slate-200"
                    style={{ transform: `scale(${reportZoom})`, transformOrigin: 'top center' }}
                    draggable={false}
                  />
                </div>
                {/* View Full Report button */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-center">
                  <button
                    onClick={() => setShowFullPdf(true)}
                    className="flex items-center gap-2 bg-[#0e7c66] hover:bg-[#0a2e1e] text-white font-bold px-8 py-3 rounded-none shadow-none transition-colors duration-200"
                    type="button"
                  >
                    <Download className="w-5 h-5" />
                    View Full Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default FileEraserPage;
