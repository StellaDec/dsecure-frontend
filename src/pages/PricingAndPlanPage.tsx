import React, { useState, memo, useEffect } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ARIA_LABELS } from "@/utils/aria-labels";
import CustomLicenseModal, {
  CustomLicenseData,
} from "../components/CustomLicenseModal";
import SpecialPricingModal from "../components/SpecialPricingModal";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import { ProductImage } from "@/components/ProductImage";
import { getProductIcon } from "@/utils/productIcons";
import {
  useFormSubmission,
  formDataTransformers,
} from "@/hooks/useFormSubmission";
// Dodo Payments Overlay Checkout SDK
import { initDodoCheckout, openOverlayCheckout, openPaymentLinkCheckout } from "@/utils/dodoCheckout";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";
import { Check, ChevronDown, CheckCircle, Shield, Server, Settings, Zap, Monitor, Code, Tag, Copy } from "lucide-react";

const PricingAndPlanPage: React.FC = memo(() => {
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("drive-eraser");
  // Har product ke liye alag quantity maintain karne ke liye state object
  const [licenseQuantities, setLicenseQuantities] = useState<Record<string, string>>({
    "drive-eraser": "1",
    "file-eraser": "1",
    "hardware-diagnostics": "100",
    "smart-diagnostic": "1"
  });
  // Current selected category ki quantity nikalna
  const selectedLicenses = licenseQuantities[selectedCategory] || "1";
  // Quantity update karne wala helper function
  const setSelectedLicenses = (val: string) => {
    setLicenseQuantities(prev => ({ ...prev, [selectedCategory]: val }));
  };


  const [selectedYears, setSelectedYears] = useState("1");
  const [selectedOS, setSelectedOS] = useState("Select");
  const [deliveryMethod, setDeliveryMethod] = useState("electronic");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showSpecialPricingModal, setShowSpecialPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("eraser"); // "eraser" or "diagnostics"
  const [driveEraserVariant, setDriveEraserVariant] = useState("standard"); // "standard" or "diagnostics"
  const [fileEraserVariant, setFileEraserVariant] = useState("standard"); // "standard" or "network"
  const [freezeStateVariant, setFreezeStateVariant] = useState("standard"); // "standard", "smart", or "advanced"
  const [forensicImagingVariant, setForensicImagingVariant] = useState("basic"); // "basic", "advanced", or "hardware"
  const [autopilotCreditType, setAutopilotCreditType] = useState<"standard" | "advanced" | "combo">("standard");
  const [isTestsExpanded, setIsTestsExpanded] = useState(false); // Hardware diagnostics tests accordion state

  // Navigate ref — useEffect dependency se hataane ke liye
  const navigateRef = React.useRef(navigate);
  navigateRef.current = navigate;

  // SDK init sirf ek baar karo — StrictMode double-fire prevent
  const sdkInitialized = React.useRef(false);

  // Reset loading state when component mounts (handles back navigation)
  useEffect(() => {
    setIsBuyNowLoading(false);
  }, []);

  //  Dodo Payments SDK initialize on mount — sirf ek baar
  useEffect(() => {
    if (sdkInitialized.current) return;
    sdkInitialized.current = true;

    initDodoCheckout({
      onComplete: () => {
        console.log(' Payment complete — redirecting to success page');
        setIsBuyNowLoading(false);
        navigateRef.current('/order-success');
      },
      onClose: () => {
        console.log(' User ne checkout band kiya');
        setIsBuyNowLoading(false);
      },
    });
  }, []);

  // Read URL parameters and set initial state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Read plan parameter from URL
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl) {
      // Map plan names from URL to plan IDs (supports both old names and new IDs)
      const planMapping: { [key: string]: string } = {
        base: "basic",
        basic: "basic", // Direct ID support
        standard: "standard",
        cloud: "cloud",
        network: "network",
        pro: "pro",
        enterprise: "enterprise",
      };

      const mappedPlan = planMapping[planFromUrl.toLowerCase()];
      if (mappedPlan) {
        setSelectedPlan(mappedPlan);
      }

    }

    const productFromUrl = searchParams.get("product");
    if (productFromUrl) {
      setSelectedCategory(productFromUrl);
    }


    // Read section parameter to expand File Eraser section if needed
    const sectionFromUrl = searchParams.get("section");
    if (sectionFromUrl === "file-eraser") {
      setSelectedCategory("file-eraser");
      setActiveTab("eraser");
    }

    // Read variant parameter for Drive Eraser
    const variantFromUrl = searchParams.get("variant");
    if (variantFromUrl === "diagnostics") {
      setDriveEraserVariant("diagnostics");
    } else {
      setDriveEraserVariant("standard");
    }

    // Set active tab based on selected category
    if (productFromUrl === "autopilot-mdm") {
      setActiveTab("tools");
      setSelectedCategory("autopilot-mdm");
    } else if (
      productFromUrl === "hardware-diagnostics" ||
      productFromUrl === "smart-diagnostic" ||
      productFromUrl === "smartphone-diagnostic"
    ) {
      // Diagnostic is now hidden, defaulting to Drive Eraser (Eraser Tab)
      setSelectedCategory("drive-eraser");
      setActiveTab("eraser");
    } else if (
      productFromUrl === "data-migration" ||
      productFromUrl === "freeze-state" ||
      productFromUrl === "forensic-imaging"
    ) {
      // DEFAULT: Agar data-migration ya forensic-imaging (hidden) URL mein ho toh Freeze State dikhao
      if (productFromUrl === "data-migration" || productFromUrl === "forensic-imaging") {
        setSelectedCategory("freeze-state");
      }
      setActiveTab("migration");
    } else if (
      productFromUrl === "drive-eraser" ||
      productFromUrl === "file-eraser" ||
      productFromUrl === "virtual-machine-eraser" ||
      productFromUrl === "smartphone-eraser"
    ) {
      setActiveTab("eraser");
    }
  }, [location.search]);

  // FIXED: Custom License Form Submission Configuration
  const customLicenseFormConfig = {
    endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT, // FIXED: Correct endpoint
    requiredFields: ["contactName", "email", "numberOfLicenses", "companyName"],
    successMessage:
      "Thank you! Your custom license request has been submitted successfully. Our sales team will contact you within 24 hours with a personalized quote.",
    errorMessage:
      "Failed to send your custom license request. Please try again or contact our sales team directly.",
    resetFormAfterSubmit: false,
    transformData: (data: Record<string, any>) => {
      // Transform and enrich the form data with context
      const enrichedData = {
        // Form submission identification
        _subject: `Custom License Request - ${getCurrentProduct().title}`,
        formType: "Custom License Request",
        submissionDate: new Date().toLocaleString(),
        timestamp: new Date().toISOString(),

        // Customer Information
        customerName: data.contactName,
        customerEmail: data.email,
        company: data.companyName || "Not provided",
        phone: data.phone || "Not provided",

        // License Requirements
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        selectedPlan: getCurrentPlan().name,
        planDescription: getCurrentPlan().description,
        requestedLicenses: data.numberOfLicenses,
        licenseDuration: data.duration || "Not specified",
        budgetRange: data.budget || "Not specified",
        additionalRequirements: data.requirements || "None",

        // Current Product Configuration Context
        currentBasePrice: `$${getCurrentPlan().basePrice}/license`,
        currentSelectedPlan: getCurrentPlan().name,
        currentSelectedLicenses: selectedLicenses,
        currentSelectedYears: selectedYears,
        currentDeliveryMethod: deliveryMethod,

        // Marketing/Analytics Data
        pageUrl: window.location.href,
        referrer: document.referrer || "Direct",
        userAgent: navigator.userAgent,
      };

      return formDataTransformers.removeEmptyFields(enrichedData);
    },
    onSuccess: (data: Record<string, any>) => {
      // Close modal on success
      setShowCustomModal(false);

      // Optional: Track in analytics
      if (typeof (window as any).gtag !== "undefined") {
        (window as any).gtag("event", "custom_license_request", {
          event_category: "sales",
          event_label: selectedCategory,
          value: Number.parseInt(data.numberOfLicenses || "0"),
        });
      }

      // Store locally for user reference
      const enquiryRecord = {
        id: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
        customerName: data.contactName,
        customerEmail: data.email,
        productName: getCurrentProduct().title,
        licenseQuantity: data.numberOfLicenses,
        status: "submitted",
      };

      const existingEnquiries = JSON.parse(
        localStorage.getItem("customLicenseEnquiries") || "[]",
      );
      existingEnquiries.push(enquiryRecord);
      localStorage.setItem(
        "customLicenseEnquiries",
        JSON.stringify(existingEnquiries),
      );
    },
    onError: (error: Error) => {
      console.error("Custom license form submission error:", error);
    },
  };

  // Initialize form submission hook
  const { isSubmitting, submitForm } = useFormSubmission(
    customLicenseFormConfig,
  );

  // FIXED: Special Pricing Form Configuration
  const specialPricingFormConfig = {
    endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT, // FIXED: Correct endpoint
    requiredFields: [
      "contactName",
      "email",
      "organizationType",
      "organizationName",
    ],
    successMessage:
      "Thank you! Your special pricing request has been submitted successfully. Our team will contact you within 24 hours with customized pricing for your organization.",
    errorMessage:
      "Failed to send your special pricing request. Please try again or contact our sales team directly.",
    resetFormAfterSubmit: false,
    transformData: (data: Record<string, any>) => {
      const enrichedData = {
        _subject: `Special Pricing Request - ${data.organizationType} - ${getCurrentProduct().title}`,
        formType: "Special Pricing Request",
        submissionDate: new Date().toLocaleString(),
        timestamp: new Date().toISOString(),

        // Contact Information
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || "Not provided",

        // Organization Information
        organizationType: data.organizationType,
        organizationName: data.organizationName,
        numberOfLicenses: data.numberOfLicenses || "Not specified",
        additionalInfo: data.additionalInfo || "None",

        // Product Context
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        currentSelectedPlan: getCurrentPlan().name,

        // Marketing Data
        pageUrl: window.location.href,
        referrer: document.referrer || "Direct",
        userAgent: navigator.userAgent,
      };

      return formDataTransformers.removeEmptyFields(enrichedData);
    },
    onSuccess: (data: Record<string, any>) => {
      setShowSpecialPricingModal(false);

      if (typeof (window as any).gtag !== "undefined") {
        (window as any).gtag("event", "special_pricing_request", {
          event_category: "sales",
          event_label: data.organizationType,
          value: Number.parseInt(data.numberOfLicenses || "0"),
        });
      }
    },
    onError: (error: Error) => {
      console.error("Special pricing form submission error:", error);
    },
  };

  const {
    isSubmitting: isSpecialPricingSubmitting,
    submitForm: submitSpecialPricingForm,
  } = useFormSubmission(specialPricingFormConfig);

  const categories = [
    {
      id: "drive-eraser",
      name: "Drive Eraser",
      subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
    },
    {
      id: "hardware-diagnostics",
      name: "Hardware",
      subtitle: "Test Device Hardware Health & Performance",
    },
    {
      id: "smart-diagnostic",
      name: "Smart",
      subtitle: "Professional Hard Drive Health Monitoring",
    },
    {
      id: "file-eraser",
      name: "File Eraser",
      subtitle: "Erase Files, Folders & Volumes",
    },
    // {
    //   id: "virtual-machine-eraser",
    //   name: "VM Eraser",
    //   subtitle: "Erase Virtual Machines in VMware & Hyper-V",
    // },
    // {
    //   id: "smartphone-eraser",
    //   name: "Smartphone Eraser",
    //   subtitle: "Erase iOS & Android Devices",
    // },
    // {
    //   id: "smartphone-diagnostic",
    //   name: "Smartphone",
    //   subtitle: "iOS & Android Diagnostics",
    // },
    {
      id: "autopilot-mdm",
      name: "Autopilot Detector",
      subtitle: "Autopilot & MDM Enrollment Detection",
    },
    // {
    //   id: "data-migration",
    //   name: "Data Migration",
    //   subtitle: "Fast & Secure Data Migration Solution",
    // },
    {
      id: "freeze-state",
      name: "Freeze State",
      subtitle: "System restore and protection solution",
    },
    // {
    //   id: "forensic-imaging",
    //   name: "Forensic Imaging",
    //   subtitle: "Professional data acquisition and analysis",
    // },
  ];

  // Tab categorization
    const filteredCategories = categories.filter((cat) => {
      if (activeTab === "eraser") {
        return (
          cat.id === "drive-eraser" ||
          cat.id === "file-eraser"
          // cat.id === "virtual-machine-eraser" ||
          // cat.id === "smartphone-eraser"
        );
      }
      if (activeTab === "migration") {
        return (
          cat.id === "freeze-state"
          // cat.id === "data-migration" ||
          // cat.id === "forensic-imaging"
        );
      }
      if (activeTab === "tools") {
        return cat.id === "autopilot-mdm";
      }
      // Diagnostic is now hidden
      return false;
      /* 
      return (
        cat.id === "hardware-diagnostics" ||
        cat.id === "smart-diagnostic"
        // cat.id === "smartphone-diagnostic"
      );
      */
    });

  // Plans configuration with their features and pricing based on D-Secure feature matrix
  const planOptions = [
    {
      id: "basic",
      name: "Standard",
      basePrice: 80,
      description:
        "Essential data erasure features for individuals and small teams",
      category: "Platform & OS Support",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "NOT INCLUDED: macOS Support",
        "NOT INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "NOT INCLUDED: Erase Tracks (Browser, System, App data)",
        "NOT INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "NOT INCLUDED: Erase Volume",
        "NOT INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "NOT INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "NOT INCLUDED: Local PDF Reports",
        "NOT INCLUDED: White Label Reports",
        "NOT INCLUDED: Compliance Email Report Format",
        "NOT INCLUDED: XML Report Format",
        "NOT INCLUDED: Audit Grade Regulatory Documents",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    {
      id: "standard",
      name: "Corporate",
      basePrice: 150,
      description:
        "Enhanced features with broader OS support and core capabilities",
      category: "Standard Business Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "NOT INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "NOT INCLUDED: Erase Volume",
        "NOT INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "NOT INCLUDED: White Label Reports",
        "NOT INCLUDED: Compliance Email Report Format",
        "NOT INCLUDED: XML Report Format",
        "NOT INCLUDED: Audit Grade Regulatory Documents",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    // Hidden: Cloud and Network plans
    // {
    //   id: "cloud",
    //   name: "Cloud",
    //   basePrice: 150,
    //   description:
    //     "Cloud-integrated solution with advanced reporting capabilities",
    //   category: "Cloud-Enhanced Solution",
    //   features: [
    //     "INCLUDED: Windows Support",
    //     "INCLUDED: Linux Support",
    //     "INCLUDED: macOS Support",
    //     "INCLUDED: Multi-Bootable OS Support (3+)",
    //     "INCLUDED: Core Erasure Capabilities",
    //     "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
    //     "INCLUDED: File & Folder Erase",
    //     "INCLUDED: Erase Tracks (Browser, System, App data)",
    //     "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
    //     "INCLUDED: Erase Volume",
    //     "INCLUDED: Erase Disk (Full Devices)",
    //     "INCLUDED: Schedule Erase",
    //     "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
    //     "INCLUDED: Local PDF Reports",
    //     "NOT INCLUDED: White Label Reports",
    //     "INCLUDED: Compliance Email Report Format",
    //     "INCLUDED: XML Report Format",
    //     "INCLUDED: Audit Grade Compliance Certificates",
    //     "INCLUDED: Inspection Logs",
    //   ],
    // },
    // {
    //   id: "network",
    //   name: "Network",
    //   basePrice: 250,
    //   description: "Network-wide deployment with centralized management",
    //   category: "Network & Management Solution",
    //   features: [
    //     "INCLUDED: Windows Support",
    //     "INCLUDED: Linux Support",
    //     "INCLUDED: macOS Support",
    //     "INCLUDED: Multi-Bootable OS Support (3+)",
    //     "INCLUDED: Core Erasure Capabilities",
    //     "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
    //     "INCLUDED: File & Folder Erase",
    //     "INCLUDED: Erase Tracks (Browser, System, App data)",
    //     "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
    //     "INCLUDED: Erase Volume",
    //     "INCLUDED: Erase Disk (Full Devices)",
    //     "INCLUDED: Schedule Erase",
    //     "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
    //     "INCLUDED: Local PDF Reports",
    //     "INCLUDED: White Label Reports",
    //     "INCLUDED: Compliance Email Report Format",
    //     "INCLUDED: XML Report Format",
    //     "INCLUDED: Audit Grade Compliance Certificates",
    //     "INCLUDED: Inspection Logs",
    //     "INCLUDED: Web Dashboard",
    //     "INCLUDED: Cloud Commands (Remote Jobs)",
    //     "INCLUDED: Custom Installer (Auto-register functions)",
    //     "INCLUDED: Private Cloud Support",
    //     "INCLUDED: Multi-Level User Logic",
    //   ],
    // },
    {
      id: "pro",
      name: "Professional",
      basePrice: 250,
      description:
        "Professional solution with premium add-ons and customization",
      category: "Professional Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Regulatory Documents",
        "INCLUDED: Inspection Logs",
        "INCLUDED: Web Dashboard",
        "INCLUDED: Cloud Commands (Remote Jobs)",
        "INCLUDED: Custom Installer (Auto-register functions)",
        "ADD-ON: Free + add-on Private Cloud Support",
        "INCLUDED: Multi-Level User Logic",
        "ADD-ON: Free + add-on Additional USB Erasure Licenses",
        "ADD-ON: Free + add-on Additional Volume Erasure Licenses",
        "ADD-ON: Free + add-on Data Connection Manager",
        "ADD-ON: Free + add-on Extra Sub Users",
        "ADD-ON: Free + add-on Extra Private Clouds",
        "ADD-ON: Free + add-on Bootable Integration (MLO & Quick Tools)",
        "ADD-ON: Free + add-on Dedicated SLA/Support Manager",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      basePrice: 500,
      description:
        "Complete enterprise solution with all features and dedicated support",
      category: "Complete Enterprise Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Regulatory Documents",
        "INCLUDED: Inspection Logs",
        "INCLUDED: Web Dashboard",
        "INCLUDED: Cloud Commands (Remote Jobs)",
        "INCLUDED: Custom Installer (Auto-register functions)",
        "INCLUDED: Private Cloud Support (Included)",
        "INCLUDED: Multi-Level User Logic",
        "INCLUDED: Additional USB Erasure Licenses (Included)",
        "INCLUDED: Additional Volume Erasure Licenses (Included)",
        "INCLUDED: Data Connection Manager (Included)",
        "INCLUDED: Extra Sub Users (Included)",
        "INCLUDED: Extra Private Clouds (Included)",
        "INCLUDED: Bootable Integration (MLO & Quick Tools) (Included)",
        "INCLUDED: Dedicated SLA/Support Manager (Included)",
      ],
    },
    {
      id: "custom",
      name: "Custom",
      basePrice: 0,
      description:
        "Tailored solution designed specifically for your organization's needs",
      category: "Custom Enterprise Solution",
      features: [
        "CUSTOM: Fully Customized Feature Set",
        "CUSTOM: Bespoke Integration & Development",
        "CUSTOM: Personalized Training & Onboarding",
        "CUSTOM: Custom Compliance Requirements",
        "CUSTOM: Flexible Licensing Model",
        "CUSTOM: White-label Solutions Available",
        "CUSTOM: Custom SLA & Support Terms",
        "CUSTOM: Dedicated Development Team",
        "CUSTOM: Priority Feature Requests",
      ],
    },
  ];

  // Get current plan details
  const getCurrentPlan = () => {
    return (
      planOptions.find((plan) => plan.id === selectedPlan) || planOptions[0]
    );
  };

  // ── PRODUCT CONFIGURATION ──
  const productData = {
    "drive-eraser": {
      title:
        driveEraserVariant === "diagnostics"
          ? "Drive Eraser + Diagnostics"
          : "D-Secure Drive Eraser",
      subtitle:
        driveEraserVariant === "diagnostics"
          ? "Professional Data Erasure with Integrated Hardware Diagnostics & SMART Health Analysis."
          : "Secure Data Erasure Software for HDD, SSD, PC, Laptop, Mac, Chromebook & Server. (Available for Intel x64 and x86)",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "drive-eraser",
      version: "V1.0.0.0 Enterprise",
      basePrice: driveEraserVariant === "diagnostics" ? 30 : 25,
      originalPrice: driveEraserVariant === "diagnostics" ? 30 : 25,
      discountPercentage: "Volume Discount",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "5",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "1500",
        "custom",
      ],
      showDeliveryOptions: true,
    },
    "file-eraser": {
      title:
        fileEraserVariant === "network"
          ? "D-Secure File Eraser Network"
          : "D-Secure File Eraser Professional",
      subtitle:
        fileEraserVariant === "network"
          ? <>Enterprise network-wide file sanitization and management across your domain. (Available for Windows 10/11 <strong>x64</strong> operating system)</>
          : <>Complete File, Folder &amp; Application Trace Elimination. (Available for Windows 10/11 <strong>x64</strong> operating system)</>,
      image: getProductIcon("file-eraser", 64),
      imageCategory: "file-eraser",
      version: fileEraserVariant === "network" ? "Network Edition" : "Professional",
      basePrice: fileEraserVariant === "network" ? 50 : 39.99,
      originalPrice: fileEraserVariant === "network" ? 50 : 39.99,
      discountPercentage: "Volume Discount",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
      options: [
        "1",
        "10",
        "50",
        "100",
        "250",
        "500",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "hardware-diagnostics": {
      title: "D-Secure Hardware Diagnostics",
      subtitle:
        "Hardware Health Testing for Laptops, PCs, Desktops & Servers.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "hardware-diagnostics",
      version: "V1.0.0.0",
      basePrice: 10,
      originalPrice: 20,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "smart-diagnostic": {
      title: "D-Secure Smart Diagnostic",
      subtitle:
        "Real-time Disk Health & Performance Monitoring.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smart-diagnostic",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "virtual-machine-eraser": {
      title: "D-Secure VM Eraser",
      subtitle: "Erase Virtual Hard Disks and Virtual Machines securely.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "virtual-machine-eraser",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "smartphone-eraser": {
      title: "D-Secure Smartphone Eraser",
      subtitle: "Erase Android & iOS Mobile Devices & Tablets.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smartphone-eraser",
      version: "V1.0.0.0",
      basePrice: 1,
      originalPrice: 2,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "smartphone-diagnostic": {
      title: "Smartphone Diagnostic",
      subtitle:
        "Comprehensive hardware & software diagnostics for mobile devices.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smartphone-diagnostic",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "autopilot-mdm": {
      title: 
        autopilotCreditType === "combo" 
          ? "Autopilot Detector (Combo Credit)" 
          : autopilotCreditType === "advanced" 
            ? "Autopilot Detector (Advanced Credit)" 
            : "Autopilot Detector (Standard Credit)",
      subtitle: "Instantly detect Autopilot & MDM status on devices. (Available for Windows)",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "autopilot-mdm",
      version: "V1.0.0.0",
      basePrice: 
        autopilotCreditType === "combo" 
          ? 1.5 
          : autopilotCreditType === "advanced" 
            ? 2 
            : 1,
      originalPrice: 
        autopilotCreditType === "combo" 
          ? 3 
          : autopilotCreditType === "advanced" 
            ? 4 
            : 2,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "10",
        "50",
        "100",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "data-migration": {
      title: "Data Migration",
      subtitle: "Secure and high-speed data migration between devices.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "data-migration",
      version: "V1.0.0.0",
      basePrice: 5,
      originalPrice: 10,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "freeze-state": {
      title:
        freezeStateVariant === "smart"
          ? "Smart Diagnostic (Freeze State)"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser (Freeze State)"
            : "Freeze State Standard",
      subtitle:
        freezeStateVariant === "smart"
          ? "Advanced hardware health monitoring for critical systems."
          : freezeStateVariant === "advanced"
            ? "Government-grade data sanitization for high-security areas."
            : "Protect system configuration and restore on reboot.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "freeze-state",
      version: "V1.0.0.0",
      basePrice:
        freezeStateVariant === "smart"
          ? 85
          : freezeStateVariant === "advanced"
            ? 90
            : 80,
      originalPrice:
        freezeStateVariant === "smart"
          ? 170
          : freezeStateVariant === "advanced"
            ? 180
            : 160,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: `(Starting from $${freezeStateVariant === "smart" ? 85 : freezeStateVariant === "advanced" ? 90 : 80})`,
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "forensic-imaging": {
      title:
        forensicImagingVariant === "advanced"
          ? "Forensic Imaging Advanced"
          : forensicImagingVariant === "hardware"
            ? "Forensic Imaging Hardware"
            : "Forensic Imaging Basic",
      subtitle:
        forensicImagingVariant === "hardware"
          ? "Professional hardware acquisition station for forensic labs."
          : "Complete bit-stream data acquisition and forensic analysis.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "forensic-imaging",
      version: "V1.0.0.0",
      basePrice:
        forensicImagingVariant === "advanced"
          ? 10526
          : forensicImagingVariant === "hardware"
            ? 31579
            : 1053,
      originalPrice:
        forensicImagingVariant === "advanced"
          ? 21052
          : forensicImagingVariant === "hardware"
            ? 63158
            : 2106,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Units:",
      selectionNote: `(Starting from $${forensicImagingVariant === "advanced" ? "10,526" : forensicImagingVariant === "hardware" ? "31,579" : "1,053"})`,
      options: [
        "1",
        "5",
        "10",
        "25",
        "custom",
      ],
      showDeliveryOptions: forensicImagingVariant === "hardware",
    },
  };

  const getCurrentProduct = () =>
    productData[selectedCategory as keyof typeof productData];

  // Dynamic pricing calculation based on selected configuration
  const calculatePrice = (
    category: string,
    licenses: string,
    years: string,
    plan: string,
  ) => {
    const licenseCount = licenses === "custom" ? 0 : Number.parseInt(licenses);
    const product = productData[category as keyof typeof productData];

    if (!product) return 0;

    // One-time purchase products (Drive Eraser, Hardware Diagnostics, VM Eraser, Smartphone Eraser, Autopilot+MDM)
    if (
      category === "drive-eraser" ||
      category === "hardware-diagnostics" ||
      category === "virtual-machine-eraser" ||
      category === "smartphone-eraser" ||
      category === "autopilot-mdm" ||
      category === "data-migration" ||
      category === "freeze-state" ||
      category === "forensic-imaging"
    ) {
      let price = product.basePrice * licenseCount;

      if (category === "drive-eraser" && licenseCount > 0) {
        let discount = 0;
        if (licenseCount >= 1000) discount = 0.80; // 80%
        else if (licenseCount >= 100) discount = 0.75; // 75%
        else if (licenseCount >= 50) discount = 0.70; // 70%
        else if (licenseCount >= 25) discount = 0.65; // 65%
        else if (licenseCount >= 10) discount = 0.55; // 55%
        else if (licenseCount >= 5) discount = 0.30; // 30%

        price = price * (1 - discount);
        // Explicitly handle Qty 5 to match 87.75 if basePrice is 25
        if (licenseCount === 5 && product.basePrice === 25) price = 87.75;
      }

      if (category === "autopilot-mdm" && licenseCount > 0) {
        let discount = 0;
        if (licenseCount >= 1000) discount = 0.70;
        else if (licenseCount >= 500) discount = 0.60;
        else if (licenseCount >= 250) discount = 0.50;
        else if (licenseCount >= 100) discount = 0.40;
        else if (licenseCount >= 50) discount = 0.35;
        else if (licenseCount >= 25) discount = 0.32;
        else if (licenseCount >= 10) discount = 0.30;
        
        price = price * (1 - discount);
      }

      return Math.round(price * 100) / 100;
    }

    // Subscription based products (Smart Diagnostic, File Eraser, Smartphone Diagnostic)
    if (
      category === "smart-diagnostic" ||
      category === "file-eraser" ||
      category === "smartphone-diagnostic"
    ) {
      const yearCount = Number.parseInt(years);
      let price = product.basePrice * licenseCount * yearCount;
      
      if (category === "file-eraser" && licenseCount > 0) {
        let discount = 0;
        if (licenseCount >= 500) discount = 0.60;
        else if (licenseCount >= 250) discount = 0.50;
        else if (licenseCount >= 100) discount = 0.40;
        else if (licenseCount >= 50) discount = 0.35;
        else if (licenseCount >= 10) discount = 0.30;
        
        price = price * (1 - discount);
      }
      
      return Math.round(price * 100) / 100;
    }

    return 0;
  };

  // Get plan-specific features for each product
  const getProductFeatures = (category: string, plan: string) => {
    const currentPlan = planOptions.find((p) => p.id === plan);
    if (!currentPlan) return [];

    if (category === "drive-eraser") {
      const baseFeatures = [
        "Complete Hard Drive & SSD Erasure",
        "Enterprise-Grade Security Standards",
        "Multi-Platform Device Support",
        "Compliance Reporting & Regulatory Documents",
        "Real-time Progress Monitoring",
        "Batch Processing Capabilities",
      ];

      if (driveEraserVariant === "diagnostics") {
        return [
          ...baseFeatures,
          "AUTOMATIC TESTS (Self-checking results)",
          "1. CPU (Processor) Health Check",
          "2. Memory (RAM) Stress Test",
          "3. Battery Health (Laptops only)",
          "4. Storage (HDD/SSD) Performance",
          "5. Ethernet (LAN Cable) Connectivity",
          "6. GPU (Graphics Card) Diagnosis",
          "7. Monitor (Display Output) Signal",
          "8. CMOS / Motherboard Battery",
          "9. System Board (Motherboard) Logic",
          "MANUAL / INTERACTIVE TESTS",
          "10. Keyboard (Key-press verification)",
          "11. Mouse / TouchPad (Click & Move)",
          "12. Microphone (Voice Recording)",
          "13. Audio (Speaker Beep/Tone Test)",
          "14. Display (Color & Dead Pixel Check)",
          "15. Touch Screen (Response Test)",
          "16. Webcam (Frame Capture Test)",
          "17. WiFi (Wireless Connectivity)",
          "18. Bluetooth (Pairing Test)",
          "19. USB Port (Device Detection)",
          "20. Fingerprint (Scanner Test)",
          "21. Accessories & Grading (Physical Inspection)",
        ];
      }
      return baseFeatures;
    } else if (category === "hardware-diagnostics") {
      return [
        "PC, Laptops & Mac (Intel & Silicon M1-M4)",
        "PXE Mass Diagnostics (up to 255 Machines)",
        "10+ Automated Component Health Tests",
        "12+ Manual Assessment & Interaction Tests",
        "MDM Enrollment Detection (Mac)",
        "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
        "Centralized Cloud Management Console",
        "Customizable ISO Standardization",
      ];
    } else if (category === "smart-diagnostic") {
      return [
        "Real-time Hard Drive Health Watch",
        "Monitor S.M.A.R.T. Status & Temperature",
        "Scan Disk for Damaged/Bad Sectors",
        "Create Sector-by-Sector Drive Clones",
        "Predictive Drive Failure Alerts",
        "Comprehensive SMART Attribute Reporting",
      ];
    } else if (category === "file-eraser") {
      const baseFeatures = [
        "Secure File & Folder Deletion",
        "30+ International Erasure Algorithms",
        "Real-time Progress Monitoring",
        "Windows Support Only",
        "Free Space Cleaning",
        "Local PDF Reports",
      ];

      if (fileEraserVariant === "network") {
        return [
          ...baseFeatures,
          "Network-wide File Wiping",
          "Centralized Admin Control",
          "Domain Network Support",
          "Compliance Reporting",
          "Web Dashboard Access",
          "Cloud Commands (Remote Jobs)",
          "Multi-Level User Logs",
        ];
      }

      return [
        ...baseFeatures,
        "Enhanced Erasure Features",
        "Cloud Report Upload/Sync",
        "White-Label Reports",
        "XML Report Format",
        "Volume & Disk Erasure",
      ];
    } else if (category === "virtual-machine-eraser") {
      return [
        "Erase VHD/VHDX/VMDK Files",
        "Supports VMware, Hyper-V, VirtualBox",
        "Multiple Erasure Algorithms",
        "Secure Report Generation",
        "Parallel VM Erasure",
        "Command Line Support",
      ];
    } else if (category === "smartphone-eraser") {
      return [
        "Android & iOS Device Wiping",
        "MDM Removal Capability",
        "Diagnostic Health Check",
        "Full Device Factory Reset",
        "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
        "Auto-Detection & Batch Wiping",
      ];
    } else if (category === "smartphone-diagnostic") {
      return [
        "iOS & Android Support",
        "Battery Health Analysis",
        "Hardware Component Test",
        "Screen & Touch Calibration",
        "Network & Connectivity Check",
        "Automated PDF Reports",
      ];
    } else if (category === "autopilot-mdm") {
      return [
        "Autopilot Status Detection",
        "MDM Enrollment Check",
        "Hardware ID Retrieval",
        "Provisioning Status Audit",
        "Deployment Readiness Test",
        "Instant Verification",
      ];
    } else if (category === "data-migration") {
      return [
        "High-Speed Data Transfer",
        "Secure End-to-End Encryption",
        "Selective File Migration",
        "Drive-to-Drive Cloning",
        "Post-Migration Integrity Check",
        "Detailed Transfer Logs",
      ];
    } else if (category === "freeze-state") {
      if (freezeStateVariant === "smart") {
        return [
          "Deep System Health Audit",
          "Real-time Hardware Monitoring",
          "Predictive Failure Analysis",
          "Freeze Protection Integrity Check",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "Auto-Alerting System",
        ];
      }
      if (freezeStateVariant === "advanced") {
        return [
          "Government-Grade Sanitization",
          "30+ International Standards",
          "High-Volume Throughput",
          "Tamper-evident audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "Hardware-Level Integration",
          "Secure Asset Disposal Chain",
        ];
      }
      return [
        "System Configuration Protection",
        "Instant Restore on Reboot",
        "Unrestricted User Access",
        "Centralized Management Console",
        "Deploy Stealth Mode",
        "Automated Maintenance Windows",
      ];
    } else if (category === "forensic-imaging") {
      if (forensicImagingVariant === "advanced") {
        return [
          "Multi-pass Imaging Techniques",
          "Parallel Data Acquisition",
          "Live RAM Capture & Analysis",
          "Universal File System Support",
          "Encrypted Volume Decryption",
          "Advanced Forensic Reporting",
        ];
      }
      if (forensicImagingVariant === "hardware") {
        return [
          "Stationary Lab-Grade Machine",
          "Integrated Hardware Write-Blocker",
          "High-Speed NVMe/SAS Channels",
          "Touchscreen Control Interface",
          "Built-in Cooling & Power",
          "Enterprise Lifecycle Support",
        ];
      }
      return [
        "Professional Bit-Stream Imaging",
        "MD5/SHA-256 Verification Hash",
        "Basic Disk Topology Analysis",
        "Standard Case Reports",
        "USB 3.0/SATA Support",
        "Portable Field Edition",
      ];
    }
    return [];
  };


  const getDisplayPrice = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Custom Quote";

    const totalPrice = calculatePrice(
      selectedCategory,
      selectedLicenses,
      selectedYears,
      selectedPlan,
    );
    return `$${totalPrice.toFixed(2)}`;
  };

  const getPriceSubtitle = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Get Personalized Quote";

    if (selectedCategory === "drive-eraser") {
      return `Drive Eraser - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "hardware-diagnostics") {
      return `Hardware Diagnostics - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "smart-diagnostic") {
      return `Smart Diagnostic - ${selectedLicenses} licenses × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;
    }

    if (selectedCategory === "smartphone-diagnostic") {
      return `Smartphone Diagnostic - ${selectedLicenses} licenses × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;
    }

    if (selectedCategory === "autopilot-mdm") {
      return `Autopilot Detector - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "data-migration") {
      return `Data Migration - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "freeze-state") {
      const variantLabel =
        freezeStateVariant === "smart"
          ? "Smart Diagnostic"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser"
            : "Standard";
      return `Freeze State ${variantLabel} - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "forensic-imaging") {
      const variantLabel =
        forensicImagingVariant === "advanced"
          ? "Advanced"
          : forensicImagingVariant === "hardware"
            ? "Hardware"
            : "Basic";
      return `Forensic Imaging ${variantLabel} - ${selectedLicenses} ${selectedLicenses === "1" ? "unit" : "units"} (one-time purchase)`;
    }
    let subtitle = `File Eraser Professional - ${selectedLicenses} licenses`;
    subtitle += ` × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;

    return subtitle;
  };

  const getPriceNote = () => {
    // Agar custom quantity ya plan hai to message dikhao
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Tailored to your needs";

    const currentProduct = getCurrentProduct();

    if (selectedCategory === "drive-eraser") {
      // Drive Eraser ke liye dynamic price note ($25 standard, $30 diagnostics)
      return `Drive Eraser @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "hardware-diagnostics") {
      // Hardware Diagnostic ka price note ($10)
      return `Hardware Diagnostic @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "smart-diagnostic") {
      // Smart Diagnostic ka price note ($20)
      const yearCount = Number.parseInt(selectedYears);
      return `Smart Diagnostic @ $${currentProduct.basePrice.toFixed(2)}/license/year ${yearCount > 1 ? `× ${yearCount} years` : ""}`;
    }

    if (selectedCategory === "autopilot-mdm") {
      // Autopilot Detector price note ($1)
      return `Autopilot Detector @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "data-migration") {
      // Data Migration का price note ($5)
      return `Data Migration @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "freeze-state") {
      const variantLabel =
        freezeStateVariant === "smart"
          ? "Smart Diagnostic"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser"
            : "Standard";
      return `Freeze State ${variantLabel} @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "forensic-imaging") {
      const variantLabel =
        forensicImagingVariant === "advanced"
          ? "Advanced"
          : forensicImagingVariant === "hardware"
            ? "Hardware"
            : "Basic";
      return `Forensic Imaging ${variantLabel} @ $${currentProduct.basePrice.toLocaleString()}/unit (One-time purchase)`;
    }
    let note = `Professional @ $${currentProduct.basePrice.toFixed(2)}/license/year`;

    const yearCount = Number.parseInt(selectedYears);
    if (yearCount > 1) {
      note += ` × ${yearCount} years`;
    }

    return note;
  };

  const handleCustomLicenseSubmit = async (data: CustomLicenseData) => {
    // console.log("handleCustomLicenseSubmit called with data:", data);

    try {
      // Use the useFormSubmission hook to handle the form submission
      await submitForm(data);

      // Show success toast
      showToast(
        "Thank you! Your custom license request has been submitted successfully. Our sales team will contact you within 24 hours.",
        "success",
      );

      // Close modal after successful submission
      setShowCustomModal(false);
    } catch (error) {
      console.error("Custom license submission error:", error);

      // Show error toast
      showToast(
        "Failed to send your custom license request. Please try again or contact our sales team directly.",
        "error",
      );
    }
  };

  // ... inside PricingAndPlanPage component ...

  const handleBuyNow = async () => {
    // 1. Prevent double clicks — timestamp-based guard (React StrictMode safe)
    if (isBuyNowLoading) return;
    const now = Date.now();
    if ((window as any).__lastCheckoutTime && now - (window as any).__lastCheckoutTime < 3000) {
      console.warn('⚠️ Checkout debounce — 3 second cooldown active');
      return;
    }
    (window as any).__lastCheckoutTime = now;

    setIsBuyNowLoading(true);

    // 2. Custom Quote logic (Same as before)
    if (selectedLicenses === "custom" || selectedPlan === "custom") {
      setShowCustomModal(true);
      setIsBuyNowLoading(false);
      return;
    }

    // Product ID mapping - Dodo Payment Product IDs
    const PRODUCT_IDS = {
      "drive-eraser": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER,
      "file-eraser": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER,
      "smart-diagnostic": import.meta.env.VITE_DODO_PRODUCT_SMART_DIAGNOSTIC,
      "autopilot-mdm": import.meta.env.VITE_DODO_PRODUCT_AUTOPILOT,
    };

    const productId = PRODUCT_IDS[selectedCategory as keyof typeof PRODUCT_IDS];

    if (!productId) {
      // Agar direct checkout ke liye product ID nahi hai (jaise Freeze State),
      // toh automatically Custom Quote form open kar do
      setShowCustomModal(true);
      setIsBuyNowLoading(false);
      return;
    }
    // =========================================================
    // CONFIGURATION: Sirf yahan apne 2 Main Product Links dalein
    // =========================================================
    const BASE_LINKS: Record<string, string> = {
      "drive-eraser": `${import.meta.env.VITE_DRIVE_ERASER}`, // Yahan apna Drive Eraser ka link dalein
      "file-eraser": `${import.meta.env.VITE_FILE_ERASER}`, // Yahan apna File Eraser ka link dalein
      "smart-diagnostic": `${import.meta.env.VITE_DODOPAYMENTS_BASE_URL}/buy/${import.meta.env.VITE_DODO_PRODUCT_SMART_DIAGNOSTIC}?quantity=`,
    };

    try {
      const quantity = Number.parseInt(selectedLicenses) || 1;

      //  Reference ID generate karo
      const clientRef = crypto.randomUUID();
      localStorage.setItem("pending_client_ref", clientRef);

      // Drive Eraser Diagnostics variant ke liye alag product ID
      let checkoutProductId = productId;
      if (
        selectedCategory === "drive-eraser" &&
        driveEraserVariant === "diagnostics"
      ) {
        checkoutProductId = import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_1;
      }

      // ── OLD REDIRECT CODE (commented out) ──
      // const baseLink = BASE_LINKS[selectedCategory];
      // const finalUrl = `${baseLink}${quantity}&client_ref=${clientRef}&redirect_url=${redirectUrl}&cancel_url=${failureUrl}`;
      // window.location.href = finalUrl;

      // ── File Eraser ke liye Product-based Overlay Checkout ──
      if (selectedCategory === "file-eraser") {
        const FILE_ERASER_PRODUCT_IDS: Record<string, string> = {
          "1": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER,
          "10": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_10,
          "25": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_10,
          "50": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_50,
          "100": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_100,
          "250": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_250,
          "500": import.meta.env.VITE_DODO_PRODUCT_FILE_ERASER_500,
        };

        const pid = FILE_ERASER_PRODUCT_IDS[selectedLicenses];
        if (pid) {
          await openOverlayCheckout(pid, 1);
          return;
        }
        setShowCustomModal(true);
        setIsBuyNowLoading(false);
        return;
      }

      // ── Drive Eraser (Standard) ke liye Product-based Overlay Checkout ──
      if (selectedCategory === "drive-eraser" && driveEraserVariant === "standard") {
        const DRIVE_ERASER_PRODUCT_IDS: Record<string, string> = {
          "1": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER,
          "5": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_5,
          "10": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_10,
          "25": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_25,
          "50": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_50,
          "100": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_100,
          "250": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_250,
          "500": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_500,
          "1000": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_1000,
          "1500": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_1500,
        };

        const pid = DRIVE_ERASER_PRODUCT_IDS[selectedLicenses];
        if (pid) {
          await openOverlayCheckout(pid, 1);
          return;
        }
        setShowCustomModal(true);
        setIsBuyNowLoading(false);
        return;
      }

      // ── Drive Eraser Diagnostic ke liye Product-based Overlay Checkout ──
      if (selectedCategory === "drive-eraser" && driveEraserVariant === "diagnostics") {
        const DIAGNOSTIC_PRODUCT_IDS: Record<string, string> = {
          "1": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_1,
          "5": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_5,
          "10": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_10,
          "25": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_25,
          "50": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_50,
          "100": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_100,
          "250": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_250,
          "500": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_500,
          "1000": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_1000,
          "1500": import.meta.env.VITE_DODO_PRODUCT_DRIVE_ERASER_DIAG_1500,
        };

        const pid = DIAGNOSTIC_PRODUCT_IDS[selectedLicenses];
        if (pid) {
          await openOverlayCheckout(pid, 1);
          return;
        }
        setShowCustomModal(true);
        setIsBuyNowLoading(false);
        return;
      }

      // ── Autopilot MDM Advanced & Combo ke liye Payment Link Checkout ──
      if (selectedCategory === "autopilot-mdm") {
        if (autopilotCreditType === "advanced") {
          await openPaymentLinkCheckout(`${import.meta.env.VITE_DODOPAYMENTS_BASE_URL}/session/cks_0Nj4TS4xCTnavVJs9SDUg`);
          return;
        } else if (autopilotCreditType === "combo") {
          await openPaymentLinkCheckout(`${import.meta.env.VITE_DODOPAYMENTS_BASE_URL}/session/cks_0Nj4TmltwSMpAOZgqlpcp`);
          return;
        }
      }

      // ── Default: Overlay Checkout — SDK apna full-screen overlay dikhayega ──
      await openOverlayCheckout(
        checkoutProductId,
        quantity
      );
      return;

    } catch (error) {
      console.error("Checkout error:", error);
      showToast("Something went wrong. Please try again.", "error");
      setIsBuyNowLoading(false);
    }
  };
  const faqs = [
    {
      question: "How do I get my License?",
      answer:
        "Each product license is assigned based on the number of devices you choose. You will receive login credentials to access D-Secure Cloud and the necessary installation files after your order is confirmed. The total number of licenses will correspond to the number of devices selected during purchase. Once the order is confirmed, your product access details will be delivered instantly.",
    },
    {
      question: "If I order 1000 licenses, how many drives can I wipe?",
      answer:
        "Each license allows you to wipe one drive. So with 1000 licenses, you can wipe 1000 drives.",
    },
    {
      question: "Are there any shipping charges?",
      answer:
        "We offer FREE shipping for all physical deliveries worldwide. For digital delivery, you receive instant access via email.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and purchase orders for enterprise customers.",
    },
    {
      question: "Do you offer Volume discounts?",
      answer:
        "Yes! We offer discounts for bulk orders. Please submit a request via our Custom License form to receive a personalized quote with discounted pricing.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All licenses include lifetime technical support via email, phone, and live chat. Enterprise customers receive priority support with dedicated account managers.",
    },
    {
      question: "What ongoing support is provided?",
      answer:
        "We provide continuous support including regular software updates, technical assistance, compliance monitoring, and renewal coordination. Think of us as your ongoing partner in data hygiene.",
    },
  ];

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "D-Secure Data Erasure Software",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Windows, macOS, Linux",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "10.00",
      "highPrice": "500.00",
      "offerCount": "10",
      // Google Search Console 'Missing field' warnings fix karne ke liye
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          }
        }
      }
    }
  };

  // getSEOForPage ek baar hi call karo — double call se schema duplication hoti thi
  const pageSEO = getSEOForPage("pricing-and-plan");

  return (
    <>
      <SEOHeadNative seo={pageSEO} structuredData={pricingSchema} />

      {/* Independence Day Banner Strip - Always Visible Until Expiration */}
      {new Date().getTime() <= new Date('2026-08-15T23:59:59').getTime() && (
        <div className="w-full bg-[#f4fcf8] border-b border-[#0e7c66]/20">
          <div className="relative w-full flex justify-center">
            <Link to="/pricing-and-plan?product=file-eraser" className="block w-full transition-opacity hover:opacity-95 duration-300">
              <img 
                src="/banner-strip.jpeg" 
                alt="Independence Day Offer - Click for Pricing and Plans" 
                className="w-full h-auto rounded-none shadow-md block"
              />
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText("IND15");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute left-[41.7%] sm:left-[42.2%] md:left-[42.7%] top-[60%] -translate-y-1/2 flex items-center justify-center p-0.5 sm:p-1 md:p-1.5 text-white bg-transparent hover:bg-white/20 transition-colors z-10"
              title="Copy Code IND15"
            >
              {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      )}


      <ThemeSection className="min-h-screen">
        <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 max-w-7xl">
          {/* Header */}
          <ThemeSectionHeading
            centered
            subtitle="Professional data erasure solutions trusted by enterprises worldwide. NIST & DoD compliant with lifetime support and instant deployment."
          >
            Choose Your D-Secure License
          </ThemeSectionHeading>

          <div className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-16">
            {/* Tab Switcher (Sub-header position) */}
            <div className="flex justify-center mb-8">
              <div className="border-b border-[#d0d5dc]/80 overflow-x-auto w-full max-w-lg">
                <div
                  role="tablist"
                  aria-label="Product Category Switcher"
                  className="flex space-x-6 sm:space-x-10 min-w-max px-2 justify-center"
                >
                  <button
                    onClick={() => {
                      setActiveTab("eraser");
                      setSelectedCategory("drive-eraser");
                      navigate(`/pricing-and-plan?product=drive-eraser`, {
                        replace: true,
                      });
                    }}
                    role="tab"
                    aria-selected={activeTab === "eraser"}
                    title={`${ARIA_LABELS.SWITCH_TAB} Eraser`}
                    className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap ${
                      activeTab === "eraser"
                        ? "border-[#0e7c66] text-[#0e7c66]"
                        : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                    }`}
                  >
                    Eraser
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("tools");
                      setSelectedCategory("autopilot-mdm");
                      navigate(`/pricing-and-plan?product=autopilot-mdm`, {
                        replace: true,
                      });
                    }}
                    role="tab"
                    aria-selected={activeTab === "tools"}
                    title={`${ARIA_LABELS.SWITCH_TAB} Tools`}
                    className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap ${
                      activeTab === "tools"
                        ? "border-[#0e7c66] text-[#0e7c66]"
                        : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                    }`}
                  >
                    Tools
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("migration");
                      setSelectedCategory("freeze-state");
                      navigate(`/pricing-and-plan?product=freeze-state`, {
                        replace: true,
                      });
                    }}
                    role="tab"
                    aria-selected={activeTab === "migration"}
                    title={`${ARIA_LABELS.SWITCH_TAB} Migration`}
                    className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap ${
                      activeTab === "migration"
                        ? "border-[#0e7c66] text-[#0e7c66]"
                        : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                    }`}
                  >
                    Migration
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category Selection (Tab Switcher) */}
          <div className="flex justify-center mb-10 xs:mb-12 sm:mb-12 md:mb-12 px-2 xs:px-4">
            <div className="border-b border-[#d0d5dc]/80 overflow-x-auto w-full max-w-5xl flex justify-center">
              <div
                role="tablist"
                aria-label="Product Sub-category"
                className="flex space-x-6 sm:space-x-10 min-w-max px-2"
              >
                {filteredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      // Explicitly set activeTab based on selected category type
                      if (category.id === "freeze-state") {
                        setActiveTab("migration");
                      } else if (category.id === "autopilot-mdm") {
                        setActiveTab("tools");
                      } else {
                        setActiveTab("eraser");
                      }
                      // Update URL with product parameter
                      navigate(`/pricing-and-plan?product=${category.id}`, {
                        replace: true,
                      });
                    }}
                    role="tab"
                    aria-selected={selectedCategory === category.id}
                    className={`pb-3 font-bold text-sm sm:text-base transition-all duration-200 border-b-4 whitespace-nowrap flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "border-[#0e7c66] text-[#0e7c66]"
                        : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${selectedCategory === category.id ? "bg-[#0e7c66] animate-pulse" : "bg-[#0a2e1e]/40"}`}
                    ></div>
                    <span className="uppercase tracking-wider">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-8 mb-8 xs:mb-10 sm:mb-12 md:mb-12">
            {/* Product Image and Info */}
            <div className="lg:col-span-2">
              <ThemeCard interactive={false} className="h-full">
                <div className="flex flex-col xs:flex-row sm:flex-row items-start space-y-4 xs:space-y-0 xs:space-x-6 sm:space-x-6">
                  {/* Enhanced Product Image */}
                  <ProductImage
                    category={selectedCategory}
                    productName={getCurrentProduct().title}
                    version={getCurrentProduct().version}
                    size="large"
                    className="flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 w-full xs:w-auto sm:w-auto">
                    <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                      {getCurrentProduct().title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {getCurrentProduct().subtitle}
                    </p>

                    {/* Dynamic Product Features */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">
                        {selectedCategory === "drive-eraser"
                          ? "Drive Eraser - Key Features:"
                          : `${getCurrentProduct().title} - Key Features:`}
                      </h3>

                      {/* Standard Features (always visible) */}
                      {getProductFeatures(selectedCategory, selectedPlan)
                        .filter(
                          (f) =>
                            !f.startsWith("AUTOMATIC TESTS") &&
                            !f.startsWith("MANUAL / INTERACTIVE TESTS") &&
                            !/^\d+\./.test(f),
                        )
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 rounded-none"
                          >
                            <Check
                              className="w-4 h-4 text-[#0e7c66] flex-shrink-0"
                              strokeWidth={3}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}

                      {/* Advanced Diagnostics Accordion (if applicable) */}
                      {selectedCategory === "drive-eraser" &&
                        driveEraserVariant === "diagnostics" && (
                          <div className="mt-4 border border-teal-100 rounded-2xl overflow-hidden bg-teal-50/30">
                            <button
                              onClick={() =>
                                setIsTestsExpanded(!isTestsExpanded)
                              }
                              className="w-full flex items-center justify-between p-4 bg-teal-50/50 hover:bg-teal-100/50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Settings className="w-5 h-5 text-teal-900" />
                                <span className="text-sm font-bold text-teal-900">
                                  Advanced Hardware Diagnostics (21 Tests)
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-[#0e7c66] transition-transform duration-300 ${isTestsExpanded ? "rotate-180" : ""}`}
                              />
                            </button>

                            <div
                              className={`transition-all duration-300 ease-in-out ${isTestsExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                            >
                              <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                {getProductFeatures(
                                  selectedCategory,
                                  selectedPlan,
                                )
                                  .filter(
                                    (f) =>
                                      f.startsWith("AUTOMATIC TESTS") ||
                                      f.startsWith(
                                        "MANUAL / INTERACTIVE TESTS",
                                      ) ||
                                      /^\d+\./.test(f),
                                  )
                                  .map((feature, index) => {
                                    const isHeader =
                                      feature.startsWith("AUTOMATIC TESTS") ||
                                      feature.startsWith(
                                        "MANUAL / INTERACTIVE TESTS",
                                      );
                                    return (
                                      <div
                                        key={index}
                                        className={`p-2 rounded-lg ${isHeader ? "col-span-full mt-4 mb-2 bg-white/60 shadow-sm border border-teal-100" : "flex items-center space-x-2"}`}
                                      >
                                        {isHeader ? (
                                          <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                                            {feature}
                                          </span>
                                        ) : (
                                          <>
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                            <span className="text-xs font-medium text-gray-600">
                                              {feature}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Drive Eraser Variant Selection */}
                    {selectedCategory === "drive-eraser" && (
                      <div className="mb-6 p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                        <label
                          id="drive-eraser-variant-label"
                          className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3"
                        >
                          Product Variant:
                        </label>
                        <div
                          role="radiogroup"
                          aria-labelledby="drive-eraser-variant-label"
                          className="grid grid-cols-1 gap-2"
                        >
                          <button
                            onClick={() => setDriveEraserVariant("standard")}
                            role="radio"
                            aria-checked={driveEraserVariant === "standard"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              driveEraserVariant === "standard"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${driveEraserVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Standard Erasure
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Pure data destruction only
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $25.00
                            </span>
                            {driveEraserVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setDriveEraserVariant("diagnostics")}
                            role="radio"
                            aria-checked={driveEraserVariant === "diagnostics"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              driveEraserVariant === "diagnostics"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${driveEraserVariant === "diagnostics" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Erasure + Diagnostics
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Smart Health Analysis
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $30.00
                              </span>
                            </div>
                            {driveEraserVariant === "diagnostics" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* File Eraser Variant Selection */}
                    {selectedCategory === "file-eraser" && (
                      <div className="mb-6 p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setFileEraserVariant("standard")}
                            role="radio"
                            aria-checked={fileEraserVariant === "standard"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              fileEraserVariant === "standard"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${fileEraserVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Professional Edition
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Standard file wiping solution
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $39.99
                            </span>
                            {fileEraserVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFileEraserVariant("network")}
                            role="radio"
                            aria-checked={fileEraserVariant === "network"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              fileEraserVariant === "network"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${fileEraserVariant === "network" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Network Edition
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Centralized domain management
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $50.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">
                                Upcoming
                              </span>
                            </div>
                            {fileEraserVariant === "network" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Freeze State Variant Selection */}
                    {selectedCategory === "freeze-state" && (
                      <div className="mb-6 p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setFreezeStateVariant("standard")}
                            role="radio"
                            aria-checked={freezeStateVariant === "standard"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              freezeStateVariant === "standard"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Freeze State Standard
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Core Protection & Restore
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $80.00
                            </span>
                            {freezeStateVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFreezeStateVariant("smart")}
                            role="radio"
                            aria-checked={freezeStateVariant === "smart"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              freezeStateVariant === "smart"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "smart" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Smart Diagnostic
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Health Monitoring
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $85.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">
                                Upcoming
                              </span>
                            </div>
                            {freezeStateVariant === "smart" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFreezeStateVariant("advanced")}
                            role="radio"
                            aria-checked={freezeStateVariant === "advanced"}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              freezeStateVariant === "advanced"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "advanced" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Advanced Eraser
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + High-Level Sanitization
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $90.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">
                                Upcoming
                              </span>
                            </div>
                            {freezeStateVariant === "advanced" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Forensic Imaging Variant Selection */}
                    {selectedCategory === "forensic-imaging" && (
                      <div className="mb-6 p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setForensicImagingVariant("basic")}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              forensicImagingVariant === "basic"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "basic" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Forensic Imaging Basic
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Professional field imaging
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $1,053
                            </span>
                            {forensicImagingVariant === "basic" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              setForensicImagingVariant("advanced")
                            }
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              forensicImagingVariant === "advanced"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "advanced" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Advanced
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Live capture & Decryption
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $10,526
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">
                                Upcoming
                              </span>
                            </div>
                            {forensicImagingVariant === "advanced" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              setForensicImagingVariant("hardware")
                            }
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              forensicImagingVariant === "hardware"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "hardware" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Hardware
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Stationary Lab Station
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $31,579
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">
                                Upcoming
                              </span>
                            </div>
                            {forensicImagingVariant === "hardware" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Autopilot MDM Credit Variant Selection */}
                    {selectedCategory === "autopilot-mdm" && (
                      <div className="mb-6 p-4 bg-[#f4fbf8] rounded-none border border-[#d0d5dc]">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Credit Type:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setAutopilotCreditType("standard")}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              autopilotCreditType === "standard"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${autopilotCreditType === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Standard Credit
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Basic MDM Detection
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              Base Price
                            </span>
                            {autopilotCreditType === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setAutopilotCreditType("advanced")}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              autopilotCreditType === "advanced"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${autopilotCreditType === "advanced" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Advanced Credit
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Detailed Device Insights + Bootable
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              Premium
                            </span>
                            {autopilotCreditType === "advanced" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setAutopilotCreditType("combo")}
                            className={`flex items-center justify-between p-3 rounded-none border-2 transition-colors ${
                              autopilotCreditType === "combo"
                                ? "bg-white border-[#0e7c66]"
                                : "bg-white/50 border-[#d0d5dc] hover:border-[#0e7c66]"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${autopilotCreditType === "combo" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Combo Credit
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {selectedLicenses !== "custom" &&
                                !isNaN(Number(selectedLicenses))
                                  ? `${Number(selectedLicenses) * 0.8} Standard & ${Number(selectedLicenses) * 0.2} Advanced`
                                  : "80% Standard & 20% Advanced"}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              Best Value
                            </span>
                            {autopilotCreditType === "combo" && (
                              <div className="w-4 h-4 rounded-full bg-[#0e7c66] flex items-center justify-center">
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Selection Criteria */}
                    <div className="mb-4 xs:mb-6 sm:mb-6">
                      <h3 className="text-base xs:text-lg sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                        Configure Your License
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {/* License Quantity */}
                        <div className="space-y-2">
                          <label className="block text-xs xs:text-sm font-semibold text-gray-700">
                            {getCurrentProduct().selectionLabel}
                          </label>
                          {getCurrentProduct().selectionNote && (
                            <p className="text-xs text-gray-500">
                              {getCurrentProduct().selectionNote}
                            </p>
                          )}
                          {selectedCategory === "hardware-diagnostics" ? (
                            /* Numeric Counter for Diagnostics */
                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border-2 border-gray-200">
                              <button
                                onClick={() => {
                                  const current =
                                    Number.parseInt(selectedLicenses) || 100;
                                  if (current > 100) {
                                    setSelectedLicenses(
                                      (current - 100).toString(),
                                    );
                                  } else if (current === 100) {
                                    setSelectedLicenses("1");
                                  }
                                }}
                                aria-label={ARIA_LABELS.DECREASE_QUANTITY}
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm active:scale-95"
                              >
                                −
                              </button>
                              <div className="flex-1 text-center">
                                <div className="text-xl font-bold text-gray-900">
                                  {selectedLicenses}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                  Licenses
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  const current =
                                    Number.parseInt(selectedLicenses) || 100;
                                  if (current === 1) {
                                    setSelectedLicenses("100");
                                  } else {
                                    setSelectedLicenses(
                                      (current + 100).toString(),
                                    );
                                  }
                                }}
                                aria-label={ARIA_LABELS.INCREASE_QUANTITY}
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            /* Standard Dropdown for other products */
                            <select
                              value={selectedLicenses}
                              onChange={(e) =>
                                setSelectedLicenses(e.target.value)
                              }
                              className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 text-sm xs:text-base font-medium shadow-sm hover:border-gray-400"
                            >
                              {getCurrentProduct().options.map((option) => (
                                <option key={option} value={option}>
                                  {option === "custom"
                                    ? " Custom Quantity"
                                    : `${option} licenses`}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Special Pricing Section */}
                <div className="mt-6 p-4 bg-[#f4fbf8] border border-[#d0d5dc] rounded-none">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-[#0a2e1e] mb-2">
                      Are You An MSP, Academic Institute or Non-Profit
                      Organization?
                    </h3>
                    <button
                      onClick={() => setShowSpecialPricingModal(true)}
                      className="text-[#0e7c66] hover:text-[#0a2e1e] font-bold underline transition-colors"
                    >
                      Contact Us For Special Pricing
                    </button>
                  </div>
                </div>
              </ThemeCard>
            </div>

            {/* Enhanced Pricing Card */}
            <div className="lg:col-span-1">
              <ThemeCard
                interactive={false}
                className="lg:sticky lg:top-8 border-2 border-[#d0d5dc]"
              >
                {/* Price Display */}
                <div className="text-center mb-6 xs:mb-8 sm:mb-8 relative">
                  {/* Discount Label */}
                  {/* Discount label hidden as per request */}

                  <div className="flex flex-col items-center justify-center mb-2">
                    {/* Strike-through price hidden as per request */}

                    <div className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                      {getDisplayPrice()}
                    </div>
                  </div>
                  <div className="text-sm text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block mb-2">
                    {getPriceSubtitle()}
                  </div>
                  <div className="text-xs text-gray-500">{getPriceNote()}</div>
                </div>

                {/* Action Button */}
                {selectedCategory === "drive-eraser" ? (
                  <>
                    {/*
                    <button
                      onClick={handleBuyNow}
                      disabled={
                        (!((selectedCategory === "drive-eraser" && (driveEraserVariant === "standard" || driveEraserVariant === "diagnostics")) || 
                           (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                         selectedLicenses !== "custom" && 
                         selectedPlan !== "custom") ||
                        isBuyNowLoading
                      }
                      onMouseEnter={() => {
                        //  Prefetch on hover for even faster response
                        if (
                          selectedLicenses !== "custom" &&
                          selectedPlan !== "custom" &&
                          !isBuyNowLoading
                        ) {
                          // Prefetch checkout domain connection
                          const img = new Image();
                          img.src = `${import.meta.env.VITE_DODOPAYMENTS_BASE_URL}/favicon.ico`;
                        }
                      }}
                      className={`w-full font-bold py-3 xs:py-4 px-4 xs:px-5 sm:px-6 rounded-xl mb-4 xs:mb-5 sm:mb-6 text-base xs:text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                        !((selectedCategory === "drive-eraser" && (driveEraserVariant === "standard" || driveEraserVariant === "diagnostics")) || 
                          (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                        selectedLicenses !== "custom" && 
                        selectedPlan !== "custom"
                          ? "bg-gradient-to-r from-slate-300 to-slate-400 text-white cursor-not-allowed opacity-70"
                          : `bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 ${isBuyNowLoading ? "cursor-wait" : "cursor-pointer"}`
                      }`}
                    >
                      {!((selectedCategory === "drive-eraser" && (driveEraserVariant === "standard" || driveEraserVariant === "diagnostics")) || 
                         (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                       selectedLicenses !== "custom" && 
                       selectedPlan !== "custom"
                        ? "Coming Soon"
                        : selectedLicenses === "custom" || selectedPlan === "custom"
                          ? "Request Custom Quote"
                          : "Buy Now"}
                    </button>
                    */}
                    <ThemeButton
                      onClick={() => navigate("/contact")}
                      variant="primary"
                      className="w-full mb-4 xs:mb-5 sm:mb-6 flex justify-center py-3 xs:py-4 text-base xs:text-lg"
                    >
                      Contact Sales
                    </ThemeButton>
                  </>
                ) : (
                  <ThemeButton
                    onClick={handleBuyNow}
                    disabled={
                      (!(
                        (selectedCategory === "drive-eraser" &&
                          (driveEraserVariant === "standard" ||
                            driveEraserVariant === "diagnostics")) ||
                        (selectedCategory === "file-eraser" &&
                          fileEraserVariant === "standard")
                      ) &&
                        selectedLicenses !== "custom" &&
                        selectedPlan !== "custom") ||
                      isBuyNowLoading
                    }
                    onMouseEnter={() => {
                      //  Prefetch on hover for even faster response
                      if (
                        selectedLicenses !== "custom" &&
                        selectedPlan !== "custom" &&
                        !isBuyNowLoading
                      ) {
                        // Prefetch checkout domain connection
                        const img = new Image();
                        img.src = `${import.meta.env.VITE_DODOPAYMENTS_BASE_URL}/favicon.ico`;
                      }
                    }}
                    variant="primary"
                    className="w-full mb-4 xs:mb-5 sm:mb-6 flex justify-center py-3 xs:py-4 text-base xs:text-lg"
                  >
                    {isBuyNowLoading ? (
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : !(
                      (selectedCategory === "drive-eraser" &&
                        (driveEraserVariant === "standard" ||
                          driveEraserVariant === "diagnostics")) ||
                      (selectedCategory === "file-eraser" &&
                        fileEraserVariant === "standard")
                    ) &&
                    selectedLicenses !== "custom" &&
                    selectedPlan !== "custom"
                      ? "Coming Soon"
                      : selectedLicenses === "custom" ||
                          selectedPlan === "custom"
                        ? "Request Custom Quote"
                        : "Buy Now"}
                  </ThemeButton>
                )}

                {/* Trust Indicators */}
                <div className="flex flex-col items-center">
                  <div className="space-y-3 inline-flex flex-col items-start">
                    {(selectedCategory === "drive-eraser"
                      ? [
                          "Instant License Delivery",
                          "Free Setup Assistance",
                          "Offline Operation",
                          "Digital Report Signing"
                        ]
                      : [
                          "Instant License Delivery",
                          "Free Setup Assistance",
                          "Free Technical Support",
                          "Free Software Updates",
                          "Offline Operation",
                          "Digital Report Signing",
                          "Crash-resistant report storage",
                          "Instant report search, filtering & sorting"
                        ]
                    ).map((text, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ThemeCard>
            </div>
          </div>

          {/* OS Compatibility */}
          {/* 
          <div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-4 mb-8">
            <div className="text-center">
              <span className="text-[#0e7c66] font-bold">
                OS Compatibility: Windows | regulated: NIST SP 800-88, DoD 5220.22-M, HIPAA etc |
                Instant Delivery Available
              </span>
            </div>
          </div>
          */}
        </div>
      </ThemeSection>

      {/* FAQ Section */}
      <ThemeSection alternate>
        <div className="container mx-auto px-4 max-w-4xl">
          <ThemeSectionHeading centered>
            Frequently Asked Questions
          </ThemeSectionHeading>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-4 xs:px-5 sm:px-6 py-3 xs:py-4 text-left text-sm xs:text-base font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 xs:px-5 sm:px-6 py-3 xs:py-4 text-sm xs:text-base text-gray-700 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Toast Component */}
      {toast && <Toast toast={toast} onClose={hideToast} />}

      {/* Custom License Modal */}
      {showCustomModal && (
        <CustomLicenseModal
          onSubmit={handleCustomLicenseSubmit}
          onClose={() => setShowCustomModal(false)}
          isOpen={showCustomModal}
          productName={getCurrentProduct().title}
          isLoading={isSubmitting}
        />
      )}

      {/* Enterprise Pricing Deep Dive & ROI Analysis */}
      <ThemeSection>
        <Reveal>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <ThemeSectionHeading centered>
                Strategic Licensing & ROI Framework
              </ThemeSectionHeading>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
                Understanding the total cost of ownership (TCO) and the
                long-term value of data sanitization is critical for IT leaders
                and security officers. D-Secure offers a transparent, scalable
                pricing architecture designed for global enterprises.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-2xl font-bold text-[#0a2e1e] mb-6">
                  Choosing Your Licensing Model
                </h3>
                <div className="space-y-8 text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="text-lg font-bold text-[#0a2e1e] mb-2">
                      1. Pay-Per-Use (The Consumption Model)
                    </h4>
                    <p className="text-sm">
                      Ideal for ITAD (IT Asset Disposition) centers and service
                      providers with fluctuating volumes. This model ensures you
                      only pay for what you erase. Every successful erasure
                      consumes one 'credit', which includes a cryptographically
                      signed certificate. This eliminates high upfront costs and
                      aligns spending directly with revenue-generating
                      activities.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0a2e1e] mb-2">
                      2. Annual Subscription (The Continuity Model)
                    </h4>
                    <p className="text-sm">
                      Best for corporate environments with consistent
                      decommissioning needs. An annual subscription provides
                      unlimited erasures for a fixed number of workstations or
                      servers. This model simplifies budgeting and ensures that
                      your team never hesitates to sanitize a drive due to
                      credit constraints, fostering a stronger security culture.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0a2e1e] mb-2">
                      3. Site Licensing (The Enterprise Standard)
                    </h4>
                    <p className="text-sm">
                      For large-scale data centers and government entities, we
                      offer site-wide or global licenses. This provides the
                      ultimate flexibility, allowing you to deploy D-Secure
                      across your entire infrastructure without tracking
                      individual disk counts, essential for rapid response
                      scenarios and mass hardware refreshes.
                    </p>
                  </div>
                </div>
              </div>

              <ThemeCard
                interactive={false}
                className="border border-slate-200 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-[#0a2e1e] mb-6">
                  ROI Analysis: Secure Erasure vs. Shredding
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end pb-4 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-[#0a2e1e]">
                        Hardware Resale Recovery
                      </p>
                      <p className="text-xs text-slate-500">
                        Erasure keeps hardware functional for resale.
                      </p>
                    </div>
                    <p className="text-[#0e7c66] font-bold">+45% Value</p>
                  </div>
                  <div className="flex justify-between items-end pb-4 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-[#0a2e1e]">
                        Logistics & Handling Costs
                      </p>
                      <p className="text-xs text-slate-500">
                        Eliminate secure transport of physical media.
                      </p>
                    </div>
                    <p className="text-[#0e7c66] font-bold">-60% Cost</p>
                  </div>
                  <div className="flex justify-between items-end pb-4 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-[#0a2e1e]">
                        E-Waste Compliance Fines
                      </p>
                      <p className="text-xs text-slate-500">
                        Avoid environmental penalties from shredding.
                      </p>
                    </div>
                    <p className="text-[#0e7c66] font-bold">-100% Risk</p>
                  </div>
                  <div className="mt-8 p-4 bg-slate-50 rounded-none border-l-4 border-[#0e7c66]">
                    <p className="text-sm text-[#0a2e1e] leading-relaxed italic">
                      "Organizations typically realize a full ROI on D-Secure
                      within the first 6 months by reclaiming the residual value
                      of their decommissioned laptops and server drives, while
                      simultaneously meeting stringent ESG (Environmental,
                      Social, and Governance) targets."
                    </p>
                  </div>
                </div>
              </ThemeCard>
            </div>

            <div className="mt-24 bg-[#f4fbf8] p-8 xs:p-10 sm:p-12 border border-[#d0d5dc]/50">
              <h3 className="text-3xl font-bold text-[#0a2e1e] mb-12 text-center">
                Enterprise Feature Deep Dive
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <ThemeCard
                  interactive={false}
                  className="border border-slate-200"
                >
                  <div className="mb-6">
                    <ThemeIconContainer icon={Monitor} color="primary" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0a2e1e] mb-4">
                    Central Management Console
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Manage 10,000+ assets from a single pane of glass. Push
                    erasure tasks over the network, monitor progress in
                    real-time, and aggregate reports into a unified dashboard
                    for global compliance audits.
                  </p>
                </ThemeCard>
                <ThemeCard
                  interactive={false}
                  className="border border-slate-200"
                >
                  <div className="mb-6">
                    <ThemeIconContainer icon={Code} color="primary" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0a2e1e] mb-4">
                    RESTful API Integration
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Seamlessly integrate data erasure into your existing ITAM
                    (IT Asset Management) or ServiceNow workflows. Automate the
                    generation of tickets and certificates without manual
                    intervention.
                  </p>
                </ThemeCard>
                <ThemeCard
                  interactive={false}
                  className="border border-slate-200"
                >
                  <div className="mb-6">
                    <ThemeIconContainer icon={Tag} color="primary" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0a2e1e] mb-4">
                    Hardware White-Labeling
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    For service providers and hardware resellers, we offer fully
                    white-labeled software and certificates. Maintain your brand
                    identity while providing world-class, NIST-compliant data
                    sanitization services.
                  </p>
                </ThemeCard>
              </div>
            </div>

            <div className="mt-20 p-10 bg-[#0a2e1e] text-white">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Custom Enterprise Licensing
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Need a global agreement or specialized deployment terms? Our
                    sales team can design a bespoke licensing structure that
                    fits your unique infrastructure and compliance roadmap.
                  </p>
                  <ThemeButton
                    onClick={() => setShowCustomModal(true)}
                    variant="primary"
                  >
                    Talk to Enterprise Sales
                  </ThemeButton>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-[#0e7c66]" />
                    <p className="text-sm font-medium">
                      Bulk License Discounts (1,000+ units)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-[#0e7c66]" />
                    <p className="text-sm font-medium">
                      Non-Profit & Educational Pricing Available
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-[#0e7c66]" />
                    <p className="text-sm font-medium">
                      Government & Defense Procurement Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </ThemeSection>

      {/* Special Pricing Modal */}
      {showSpecialPricingModal && (
        <SpecialPricingModal
          onSubmit={submitSpecialPricingForm}
          onClose={() => setShowSpecialPricingModal(false)}
          isOpen={showSpecialPricingModal}
          productName={getCurrentProduct().title}
          isLoading={isSpecialPricingSubmitting}
        />
      )}
    </>
  );
});

export default PricingAndPlanPage;
