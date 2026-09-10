import React, { useState, useEffect, memo } from "react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { Link } from "react-router-dom";
import {
  PartnershipForm,
  LicenseForm,
  type PartnershipFormData,
  type LicenseFormData,
} from "@/components/forms";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import {
  useEnhancedForm,
  formConfigurations,
} from "@/utils/enhancedFormSystem";
import { useToast } from "@/hooks";
// Lucide React se standard icons import kar rahe hain (FlatIcons legacy imports ki jagah)
import {
  Briefcase,
  MessageSquare,
  ChevronDown,
  Building,
  User,
  X,
  Star,
  Globe,
  Shield,
  Cloud,
  Settings,
  Server,
  Zap,
  Check,
  ArrowRight,
  Activity,
  Phone,
  Mail,
  FileText,
  ClipboardList,
} from "lucide-react";
import { Toast } from "@/components/ui";
import { ThemeButton, ThemeCard, ThemeIconContainer, ThemeSection, ThemeSectionHeading, themeClasses, themeTokens } from "@/components/ui/Theme";

// Partner types definition - moved to top to avoid temporal dead zone
const partnerTypes = {
  "ITAD Partner": {
    title: "ITAD Partner Program",
    description: "Join the D-Secure ITAD Partner Program to offer secure, globally tested data erasure solutions and help customers meet global data privacy compliance.",
    benefits: [
      "Scalable & Automated Data Erasure & Diagnostics Software",
      "Free Assisted Remote Deployment & Training",
      "FREE Product Updates",
      "Price Lock in During Contract Term",
      "FREE Premium Technical Support - 24*5",
      "Customized Solution For ITADs",
    ],
    detailedBenefits: [
      {
        title: "Scalable & Automated Data Erasure & Diagnostics Software",
        description: "D-Secure software allows you to start wiping up to 64 drives simultaneously across HDDs, SSDs, PCs, Macs, and mobile devices.",
      },
      {
        title: "Price Lock in During Contract Term",
        description:
          "Special bulk license pricing locked in for the term of your contract ensures consistent costs as your data erasure volume grows.",
      },
      {
        title: "FREE Premium Technical Support - 24*5",
        description: "Access our dedicated technical experts for assistance with deployment, integration, and troubleshooting at no extra cost.",
      },
      {
        title: "Customized Solution For ITADs",
        description:
          "We offer customized automation for large ITAD partners to minimize human intervention and improve operational efficiency.",
      },
    ],
  },
  "MSP Partner": {
    title: "MSP Partner Program",
    description: "The D-Secure MSP Partner Program helps providers offer data erasure services, reducing data breach risks and ensuring CCPA, HIPAA, and ISO 27001 compliance.",
    benefits: [
      "Expand Your Portfolio",
      "Comprehensive Training",
      "Access Marketing Collaterals",
      "Free Product Updates",
      "Special MSP Pricing",
      "Effortless Data Erasure Software",
      "Get Listed On D-Secure Partner Section",
      "Free Technical Support",
    ],
    detailedBenefits: [
      {
        title: "Expand Your Portfolio",
        description:
          "Offer data erasure as a service to attract organizations requiring comprehensive data security and position yourself as a trusted partner.",
      },
      {
        title: "Special MSP Pricing",
        description:
          "Purchase licenses at special partner rates only available to MSPs, allowing you to offer cost-effective sanitization services to your clients.",
      },
      {
        title: "Effortless Data Erasure Software",
        description:
          "Enable fast, automated data erasure across over 65,000 drive types with a user-friendly interface designed for seamless operations.",
      },
      {
        title: "Get Listed On D-Secure Partner Section",
        description:
          "Get listed in our partner directory to gain visibility with B2B customers looking for authorized data security experts in their region.",
      },
    ],
  },
  "Distributor Partner": {
    title: "Distributor Partner Program",
    description: "The D-Secure Distributor Program is for global software distributors selling data erasure products for HDDs, SSDs, mobile devices, and servers.",
    benefits: [
      "Go-To-Market Support",
      "Free 24*7 Technical Support",
      "Regular Updates",
      "Product Sales Training",
      "Trusted Brand",
      "Deal Registration Benefits",
    ],
    detailedBenefits: [
      {
        title: "Go-To-Market Support",
        description:
          "Access brochures, technical fact sheets, and demo materials to support your business and expand the reach of D-Secure products.",
      },
      {
        title: "Product Sales Training",
        description:
          "Receive training on D-Secure features, functionality, and compliance standards along with necessary sales documentation.",
      },
      {
        title: "Trusted Brand",
        description: "D-Secure is a recognized leader in data sanitization, trusted by government agencies and global enterprises for technical excellence.",
      },
      {
        title: "Deal Registration Benefits",
        description:
          "Protect your leads and access better pricing for registered projects, along with dedicated support and service deployment assistance.",
      },
    ],
  },
  "Reseller Partner": {
    title: "Reseller Partner Program",
    description: "Become a D-Secure Reseller to deliver reliable data erasure software to enterprise customers and help them meet compliance with special partner discounts.",
    benefits: [
      "Product Sales Training",
      "Free Assisted Technology Support",
      "Regular Updates And Communication",
      "Co-To-Market Enablement",
      "Deal Registration Benefits",
      "Quality Solutions",
    ],
    detailedBenefits: [
      {
        title: "Product Sales Training",
        description: "Comprehensive training on the D-Secure product lineup ensures your team is ready to market the best security solutions.",
      },
      {
        title: "Co-To-Market Enablement",
        description:
          "Join the program to receive campaign brochures, product one-pagers, and technical data sheets to support your regional marketing strategy.",
      },
      {
        title: "Deal Registration Benefits",
        description: "Register deals to ensure lead protection and prevent direct approach from sales teams, ensuring your efforts are rewarded.",
      },
      {
        title: "Quality Supplier",
        description: "D-Secure is renowned for innovative software and high-quality services, satisfying customers across 190 countries.",
      },
    ],
  },
  "OEM Partner": {
    title: "OEM Partner Program",
    description: "The D-Secure OEM Program helps you integrate data erasure solutions into your product portfolio to safeguard customers from data liability.",
    benefits: [
      "Best-Selling Software",
      "High Conversion Rate",
      "Strong Technical Support",
      "Comprehensive Solution",
      "Standards Compliant",
      "Trusted Brand Quality",
    ],
    detailedBenefits: [
      {
        title: "Best-Selling Software",
        description: "Bundle our reliable and easy-to-use data erasure software with your hardware to provide unparalleled security value to your users.",
      },
      {
        title: "Comprehensive Solution",
        description:
          "D-Secure OEM partnerships cover drive hardware, Mac, computers, and mobile devices, providing innovative sanitization across all segments.",
      },
      {
        title: "Standards Compliant",
        description:
          "Our software aligns with international standards like NIST and ADISA to ensure the highest level of data erasure compliance.",
      },
      {
        title: "Trusted Brand Quality",
        description:
          "Leverage D-Secure's global reputation and quality-focused R&D to ensure the success and reliability of your partner business.",
      },
    ],
  },
} as const;

interface PartnerContact {
  email: string;
  phone: string;
  website: string;
  name?: string;
}

interface Partner {
  id: string;
  company: string;
  name?: string; // Adding name for compatibility
  type: string;
  location: string;
  description: string;
  logo?: string;
  rating: number;
  projects: number;
  verified: boolean;
  contact: PartnerContact;
}

const PartnersPage: React.FC = memo(function PartnersPage() {
  const { toast, showToast, hideToast } = useToast();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showFindPartnerModal, setShowFindPartnerModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPartnerForContact, setSelectedPartnerForContact] =
    useState<Partner | null>(null);
  const [selectedPartnerForDetails, setSelectedPartnerForDetails] =
    useState<Partner | null>(null);
  const [activePartnerType, setActivePartnerType] =
    useState<keyof typeof partnerTypes>("ITAD Partner");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedPartnerType, setSelectedPartnerType] =
    useState("All Partner Types");
  const [contactPartnerForm, setContactPartnerForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    businessType: "",
    subject: "",
    message: "",
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "partner-types", label: "Partner Programs" },
    { id: "benefits", label: "Key Benefits" },
    { id: "process", label: "Join Process" },
    // { id: "find-partner", label: "Find Partners" },
    { id: "contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
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
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Mock partner data based on attachment
  const partnersList: Partner[] = [
    {
      id: "1",
      company: "ABC International Trading Services",
      name: "ABC International Trading Services",
      type: "Reseller",
      location: "Vietnam",
      description: "Premier reseller specializing in enterprise-grade secure data destruction solutions for the SE Asia market.",
      rating: 4.8,
      projects: 120,
      verified: true,
      contact: {
        email: "nguyen.duc@international.com.vn",
        phone: "+84 903 447 799",
        website: "https://international.vn",
      },
    },
    {
      id: "2",
      company: "Advantage Industries",
      name: "Advantage Industries",
      type: "Distributor",
      location: "United States",
      description: "Strategic distributor providing advanced IT asset management and secure erasure technology nationwide.",
      rating: 4.9,
      projects: 250,
      verified: true,
      contact: {
        email: "michael.johnson@advantage-corp.com",
        phone: "+1 763 423 5338",
        website: "https://www.advantagecorp.com",
      },
    },
    {
      id: "3",
      company: "SafeData Europe SAC",
      name: "SafeData Europe SAC",
      type: "MSP Partner",
      location: "Italy",
      description: "Managed security services provider focusing on GDPR compliance and immutable audit trails.",
      rating: 4.7,
      projects: 95,
      verified: true,
      contact: {
        email: "marco.rossi@activelink.it",
        phone: "+39 0544 236841",
        website: "https://www.activelink.it",
      },
    }
  ];
  const countries = [
    "All Countries",
    "United States",
    "India",
    "Vietnam",
    "Peru",
    "Mexico",
    "Italy",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "Brazil",
  ];
  const partnerTypesFilter = [
    "All Partner Types",
    "ITAD Partner",
    "MSP Partner",
    "Distributor",
    "Reseller",
    "OEM Partner",
  ];
  // eslint-disable-next-line -- partnersList temporarily empty, filter logic needed for future data
  const filteredPartners = partnersList.filter((partner) => {
    const countryMatch =
      selectedCountry === "All Countries" ||
      partner.location === selectedCountry;
    const typeMatch =
      selectedPartnerType === "All Partner Types" ||
      partner.type === selectedPartnerType;
    return countryMatch && typeMatch;
  });

  /*
  const downloadPDF = (filename: string, displayName: string) => {
    const link = document.createElement("a");
    link.href = `/downloads/${filename}`;
    link.download = displayName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  */
  const handlePartnerSubmit = async (formData: PartnershipFormData) => {
    // This is now just for backward compatibility
    // The actual submission is handled by the form component itself
  };
  const handleLicenseSubmit = async (formData: LicenseFormData) => {
    // This is now just for backward compatibility
    // The actual submission is handled by the form component itself
  };
  const handleContactRedirect = () => {
    // Redirect to contact page
    globalThis.location.href = "/contact";
  };
  // Handle contact partner click
  const handleContactPartner = (partner: Partner) => {
    setSelectedPartnerForContact(partner);
    setShowContactModal(true);
  };
  // Handle view details click
  const handleViewDetails = (partner: Partner) => {
    setSelectedPartnerForDetails(partner);
    setShowDetailsModal(true);
  };
  // Function to open partner modal with pre-selected type
  const openPartnerModal = (partnerType?: string) => {
    const typeToSet = partnerType || activePartnerType;
    setActivePartnerType(typeToSet as keyof typeof partnerTypes);
    setShowPartnerModal(true);
  };

  // openLicenseModal handled directly via setShowLicenseModal
  return (
    <>
      <SEOHeadNative
        seo={{
          title: "D-Secure Partner Network | Join Our Global Data Erasure Program",
          description: "Join the D-Secure Partner Program to offer globally recognized data erasure solutions. Empower your business with ITAD, MSP, OEM, and Reseller opportunities.",
          keywords: "partnership, data erasure, ITAD partner, MSP partner, OEM partner, reseller program, d-secure tech",
          canonicalUrl: "https://dsecuretech.com/partners",
        }}
      />
      <SEOHeadNative seo={getSEOForPage("partners")} />

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
                        : "text-[#5a6672] hover:bg-emerald-50 hover:text-emerald-800"
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

      <div className="min-h-screen">
        {/* ================= HERO SECTION ================= */}
        <ThemeSection className="py-8 lg:py-12 xl:py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0e7c66] px-4 py-2 rounded-full text-sm font-bold border border-[#0e7c66]/20">
                    <Globe className="w-4 h-4" />
                    Global Partner Network
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0a2e1e] leading-tight">
                    Grow Your Business with{" "}
                    <span className="text-[#0e7c66]">
                      D-Secure Partnership
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-[#5a6672] leading-relaxed max-w-xl">
                    Join our ecosystem of ITADs, MSPs, and Distributors. Deliver
                    world-class data erasure solutions while advancing
                    sustainability and global privacy standards.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <ThemeButton
                      onClick={() => openPartnerModal()}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Join Program
                    </ThemeButton>
                    <button
                      disabled
                      className={`${themeClasses.button.base} bg-slate-400 text-white cursor-not-allowed opacity-80`}
                    >
                      <ChevronDown className="w-5 h-5 mr-2" />
                      Upcoming
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - Static Network with Shield Hub */}
              <Reveal delayMs={100}>
                <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px] overflow-visible">
                  <img 
                    src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225788/ik0kdoezrtxy313cdhg6.png" 
                    alt="D-Secure Partner Network" 
                    className="relative z-10 w-full max-w-[650px] lg:max-w-[720px] h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= PARTNER PROGRAMS SECTION ================= */}
        <ThemeSection alternate id="partner-types" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal>
              <ThemeSectionHeading subtitle="We offer tailored collaboration models designed to fit your
                  business structure and growth objectives." centered>
  Specialized Partner Programs
</ThemeSectionHeading>
            </Reveal>

            {/* Program Tabs */}
            <div className="max-w-6xl mx-auto">
              {/* Horizontal Line Tab Bar */}
              <div className="border-b border-[#d0d5dc]/80 mb-10 overflow-x-auto">
                <div className="flex space-x-6 sm:space-x-10 min-w-max px-2">
                  {(
                    Object.keys(partnerTypes) as Array<keyof typeof partnerTypes>
                  ).map((type) => {
                    const isActive = activePartnerType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setActivePartnerType(type)}
                        className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap ${
                          isActive
                            ? "border-[#0e7c66] text-[#0e7c66]"
                            : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Program Details */}
              <Reveal key={activePartnerType}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4ede4] text-[#0e7c66] rounded-full text-sm font-bold border border-[#0e7c66]/20">
                      {activePartnerType === "ITAD Partner" && (
                        <Server className="w-4 h-4" />
                      )}
                      {activePartnerType === "MSP Partner" && (
                        <Cloud className="w-4 h-4" />
                      )}
                      {activePartnerType === "OEM Partner" && (
                        <Settings className="w-4 h-4" />
                      )}
                      {activePartnerType === "Distributor Partner" && (
                        <Globe className="w-4 h-4" />
                      )}
                      {activePartnerType === "Reseller Partner" && (
                        <Briefcase className="w-4 h-4" />
                      )}
                      Program Overview
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2e1e] tracking-tight">
                      {partnerTypes[activePartnerType].title}
                    </h3>
                    <p className="text-[#5a6672] text-base sm:text-lg leading-relaxed">
                      {partnerTypes[activePartnerType].description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-bold text-[#0a2e1e] flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#0e7c66]" />
                        Key Program Highlights:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {partnerTypes[activePartnerType].benefits.map(
                          (benefit) => (
                            <div
                              key={`benefit-${benefit}`}
                              className="flex items-center gap-2 text-[#5a6672]"
                            >
                              <div className="w-2 h-2 bg-[#0e7c66] rounded-full"></div>
                              <span className="text-sm font-medium">
                                {benefit}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <ThemeButton
                        onClick={() => openPartnerModal(activePartnerType)}
                      >
                        Apply for {activePartnerType}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </ThemeButton>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex items-center justify-center">
                    {activePartnerType === "ITAD Partner" ? (
                      <img 
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225788/rfshyjq0tqtfzamubhxb.png" 
                        alt="ITAD Partner Program" 
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    ) : activePartnerType === "MSP Partner" ? (
                      <img 
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225788/wetapnpwv725b2w6ivky.png" 
                        alt="MSP Partner Program" 
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    ) : activePartnerType === "Distributor Partner" ? (
                      <img 
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225788/uuwydxswtl7cjxwh944p.png" 
                        alt="Distributor Partner Program" 
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    ) : activePartnerType === "Reseller Partner" ? (
                      <img 
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225787/k1hpsrytnfg3d0r8xhgx.png" 
                        alt="Reseller Partner Program" 
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    ) : (
                      <img 
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1785225788/rc8kueffim6sbapsy6yn.png" 
                        alt="OEM Partner Program" 
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= BENEFITS GRID ================= */}
        <ThemeSection id="benefits" className="py-24 relative overflow-hidden" >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0e7c66]/20 rounded-none blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-[#0e7c66]/10 rounded-none blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <ThemeSectionHeading subtitle="Access enterprise-grade tools, expert support, and global
                  market reach." centered>
  Why Partner with D-Secure?
</ThemeSectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Regulatory Compliance",
                  desc: "Comprehensive software for HDD, SSD, and NVMe erasure. Complies with 20+ international standards including NIST 800-88 and DoD 5220.22-M.",
                  icon: Shield,
                },
                {
                  title: "Scalable Growth",
                  desc: "Flexible licensing and special pricing to maximize your ROI.",
                  icon: Zap,
                },
                {
                  title: "Global Reach",
                  desc: "Operate in 190+ countries with localized expertise.",
                  icon: Globe,
                },
                {
                  title: "Premium Support",
                  desc: "24x5 dedicated technical and marketing assistance.",
                  icon: MessageSquare,
                },
              ].map((benefit, idx) => (
                <Reveal
                  key={`partner-benefit-${benefit.title}`}
                  delayMs={idx * 100}
                >
                  <div className={`${themeClasses.card.base} p-8 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="mb-6">
                      <ThemeIconContainer icon={benefit.icon} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0a2e1e]">{benefit.title}</h3>
                    <p className="text-[#5a6672] text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Technical Partnership Infrastructure Deep Dive */}
            <div className="mt-24 pt-24 border-t border-[#d0d5dc]/60">
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2e1e]">
                      Technical Partnership Infrastructure
                    </h2>
                    <p className="text-[#5a6672] text-lg leading-relaxed">
                      D-Secure provides a robust, developer-centric infrastructure for our partners. Whether you are an ITAD automating high-volume wiping or an MSP integrating sanitization into a management portal, our stack is built for modularity and scale.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-[#d4ede4]/50 p-6 rounded-none border border-[#0e7c66]/20">
                        <h4 className="text-[#0e7c66] font-bold mb-2">API-First Integration</h4>
                        <p className="text-sm text-[#5a6672] leading-relaxed">
                          Our RESTful API endpoints allow partners to programmatically trigger erasures, retrieve audit logs in JSON format, and generate digitally signed PDF certificates. We support OAuth 2.0 authentication and provide comprehensive Swagger documentation for rapid development.
                        </p>
                      </div>
                      <div className="bg-[#d4ede4]/50 p-6 rounded-none border border-[#0e7c66]/20">
                        <h4 className="text-[#0e7c66] font-bold mb-2">White-Label Customization</h4>
                        <p className="text-sm text-[#5a6672] leading-relaxed">
                          OEM and MSP partners can leverage our white-label engine to maintain brand consistency. This includes custom CSS injection for the user interface, branded PDF certificate templates, and SMTP configuration for automated report delivery under your own domain.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`${themeClasses.card.base} p-8 lg:p-12`}>
                    <h3 className="text-2xl font-bold mb-8 text-[#0e7c66]">Technical Prerequisites</h3>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#0e7c66] flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <strong className="block text-[#0a2e1e] mb-1">Hardware Compatibility</strong>
                          <p className="text-sm text-[#5a6672]">Support for x86_64 and ARM64 architectures. Minimum 2GB RAM required for standard operations; 4GB+ recommended for high-concurrency 64-drive parallel wiping.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#0e7c66] flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <strong className="block text-[#0a2e1e] mb-1">Network Architecture</strong>
                          <p className="text-sm text-[#5a6672]">Support for PXE (Preboot Execution Environment) for network-scale deployment. Local license server options available for air-gapped secure facility requirements.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#0e7c66] flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <strong className="block text-[#0a2e1e] mb-1">Audit Trail Finality</strong>
                          <p className="text-sm text-[#5a6672]">Integration with blockchain-based immutable ledgers for high-security environments. Every certificate contains a unique cryptographic hash verifiable against our global audit registry.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= JOIN PROCESS SECTION ================= */}
        <ThemeSection alternate id="process" className="py-24">
          <div className="container mx-auto px-4">
            <Reveal>
              <ThemeSectionHeading subtitle="Get started in four easy steps and join our network within
                  days." centered>
  Simple Onboarding Process
</ThemeSectionHeading>
            </Reveal>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Apply",
                  desc: "Fill out the partnership form",
                },
                {
                  step: "02",
                  title: "Review",
                  desc: "Our team validates your request",
                },
                {
                  step: "03",
                  title: "Onboarding",
                  desc: "Access the partner portal & training",
                },
                {
                  step: "04",
                  title: "Launch",
                  desc: "Start delivering D-Secure solutions",
                },
              ].map((item, idx) => (
                <Reveal key={`step-${item.step}`} delayMs={idx * 100}>
                  <div className="relative group text-center md:text-left p-6">
                    <div className="text-5xl font-black text-[#0e7c66]/10 absolute top-0 left-0 md:-left-4 group-hover:text-[#0e7c66]/20 transition-colors font-sans">
                      {item.step}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-[#0a2e1e] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#5a6672] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-[#0e7c66]/30"></div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </ThemeSection>
        {/* ================= FIND A PARTNER SECTION ================= */}
        <ThemeSection id="contact" className="py-24 relative overflow-hidden" >
          <div className="container mx-auto px-4">
            <div className="bg-[#0e7c66] rounded-none overflow-hidden shadow-2xl relative border border-[#d0d5dc]/60">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform translate-x-1/2"></div>

              <div className="relative z-10 p-12 lg:p-20 flex flex-col items-center text-center">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-[#d4ede4] text-[#0e7c66] px-4 py-2 rounded-full text-sm font-bold border border-[#d0d5dc]/60 mb-8">
                    <Globe className="w-4 h-4" />
                    Global Network
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
                    Looking for a Compliance Partner?
                  </h2>
                  <p className="text-[#d4ede4]/90 text-lg max-w-3xl mb-12">
                    Connect with our global network of experts across 190+
                    countries for localized implementation and support.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6">
                    {/* <button
                      onClick={() => setShowFindPartnerModal(true)}
                      className={`${themeClasses.button.base} bg-[#d4ede4] text-[#0e7c66] hover:bg-white`}
                    >
                      Find Local Partner
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button> */}

                    <button
                      onClick={handleContactRedirect}
                      className={`${themeClasses.button.base} text-white border-2 border-white hover:bg-white hover:text-[#0e7c66]`}
                    >
                      Contact D-Secure
                      <MessageSquare className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </ThemeSection>

        {/* ================= REDUNDANT SECTIONS (COMMENTED OUT) =================
             <ThemeSection noBg className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10">
                 <div
                   className="absolute top-0 left-0 w-full h-full"
                   style={{
                     backgroundImage: `url("data:image/svg+%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
                   }}
                 ></div>
               </div>
               <div className="container-responsive relative z-10 px-4 sm:px-6">
                 <Reveal>
                   <div className="text-center">
                     <div className="mb-8 sm:mb-12">
                       <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-none text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-4 h-4"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                         </svg>
                         Partner Discovery
                       </div>
                       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                         Find A{" "}
                         <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                           Partner
                         </span>
                       </h2>
                       <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                         Get to know about our global partners and easily locate
                         them. Connect with qualified D-Secure partners in your
                         region for seamless collaboration.
                       </p>
                       <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 max-w-lg sm:max-w-none mx-auto">
                         {[
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <GlobeIcon className="w-4 h-4" filled={filled} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Global Network",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <Building
                                     className="w-4 h-4"
                                     fill={filled ? "currentColor" : "none"}
                                   />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Location-Based",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <CheckIcon className="w-4 h-4" filled={filled} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Qualified Partners",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <MessageSquare className="w-4 h-4" fill={filled ? "currentColor" : "none"} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Direct Contact",
                           },
                         ].map((feature, index) => (
                           <div
                             key={index}
                             className="bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-none text-xs sm:text-sm font-medium border border-white/20 text-center flex items-center justify-center gap-1 sm:gap-2"
                           >
                             <span className="flex items-center justify-center">
                               {feature.icon}
                             </span>
                             <span className="hidden sm:inline">{feature.text}</span>
                             <span className="sm:hidden">
                               {feature.text.split(" ")[0]}
                             </span>
                           </div>
                         ))}
                       </div>
                       <button
                         onClick={() => setShowFindPartnerModal(true)}
                         className="w-full sm:w-auto group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 text-white font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-5 rounded-none sm:rounded-none transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center gap-3 sm:gap-4 mx-auto text-base sm:text-lg"
                       >
                         <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 rounded-none sm:rounded-none flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                           <svg
                             className="w-4 sm:w-5 h-4 sm:h-5"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                           </svg>
                         </div>
                         <span>Find Partners Near You</span>
                         <svg
                           className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path d="M13 7l5 5-5 5M6 12h12" />
                         </svg>
                       </button>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </ThemeSection>

             <ThemeSection className="py-20 md:py-28 >
               <div className="container-responsive">
                 <Reveal>
                   <div className="bg-white rounded-none shadow-xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                     <div className="bg-gradient-to-r from-green-500 via-green-500 to-green-600 p-8 text-center">
                       <h2 className="text-4xl font-bold text-white mb-4">
                         Let's Get Started
                       </h2>
                       <p className="text-lg text-white/90 max-w-2xl mx-auto">
                         Have a question or want to know more about our solutions?
                       </p>
                     </div>
                     <div className="p-8 text-center">
                       <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <button
                           onClick={() => openLicenseModal()}
                           className="group bg-white border-2 border-green-200 hover:border-green-400 text-green-800 hover:bg-green-50 font-semibold px-8 py-3 rounded-none transition-all duration-300 shadow-lg hover:shadow-xl"
                         >
                           <span>Request Free License</span>
                         </button>
                         <button
                           onClick={handleContactRedirect}
                           className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-none transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                         >
                           <span className="flex items-center gap-1">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               className="w-4 h-4"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke="currentColor"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                               />
                             </svg>
                             +91 11 4152 5085
                           </span>
                         </button>
                       </div>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </ThemeSection>
             ================= */}
      </div>
      {/* Partner Application Modal */}
      {showPartnerModal && (
        <PartnershipForm
          onSubmit={handlePartnerSubmit}
          onClose={() => setShowPartnerModal(false)}
          preSelectedPartnerType={activePartnerType}
          customConfig={{
            endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
            requiredFields: [
              "fullName",
              "businessEmail",
              "companyName",
              "partnerType",
            ],
            successMessage:
              "Partnership application submitted successfully! We will contact you soon.",
            onSuccess: () => {
              setShowPartnerModal(false);
              showToast(
                "Partnership application submitted successfully! We'll contact you soon.",
                "success",
              );
            },
          }}
        />
      )}
      {/* Find Partner Modal */}
      {showFindPartnerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden animate-in fade-in duration-300">
          <div className="bg-white rounded-none max-w-6xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-[#d0d5dc]/60">
            {/* Premium Header */}
            <div className="bg-[#0e7c66] text-white p-8 rounded-none relative flex-shrink-0">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Search Our Partner Network
                </h2>
                <p className="text-[#d4ede4]/80 mt-2 text-sm font-medium">
                  Connect with compliance security experts worldwide
                </p>
              </div>
              <button
                onClick={() => setShowFindPartnerModal(false)}
                className="absolute top-6 right-6 z-20 cursor-pointer text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-none hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 pointer-events-none" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>
                {`.find-partner-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <div className="p-8 find-partner-scroll space-y-8">
                {/* Refined Filter Section */}
                <div className={`${themeClasses.card.base} grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ede4]/20 blur-3xl -mr-16 -mt-16 group-hover:bg-[#d4ede4]/40 transition-colors duration-500"></div>
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-3">
                      <Globe className="w-3.5 h-3.5" />
                      Select Region
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-4 bg-white border border-[#d0d5dc]/60 rounded-none focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50 appearance-none cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-3">
                      <Shield className="w-3.5 h-3.5" />
                      Partner Type
                    </label>
                    <select
                      value={selectedPartnerType}
                      onChange={(e) => setSelectedPartnerType(e.target.value)}
                      className="w-full p-4 bg-white border border-[#d0d5dc]/60 rounded-none focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50 appearance-none cursor-pointer"
                    >
                      {partnerTypesFilter.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Partners Result List */}
                <div className="text-center py-24 bg-[#f4fbf8]/40 rounded-none border border-[#d0d5dc]/60">
                  <div className="w-24 h-24 bg-[#d4ede4] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#0e7c66]/20">
                    <Globe className="w-12 h-12 text-[#0e7c66]" />
                  </div>
                  <h3 className="text-3xl font-black text-[#0a2e1e] mb-4 tracking-tight">
                    No Partner available yet
                  </h3>
                  <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                    We are currently building our global network. Please check back later.
                  </p>
                </div>

                {false && (
                  <>
                <div className="space-y-6">
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner, index) => (
                      <div
                        key={`partner-${partner.company}-${partner.location}`}
                        className={`${themeClasses.card.base} p-8 hover:shadow-xl transition-all duration-500 relative overflow-hidden`}>
                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-[#0e7c66] transition-all duration-500"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4ede4]/30 blur-3xl rounded-none translate-x-32 -translate-y-32 group-hover:bg-[#d4ede4]/50 transition-colors"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
                          {/* Company Identity */}
                          <div className="lg:col-span-1 border-r border-[#d0d5dc]/30 pr-4">
                            <div className="flex items-center gap-4 mb-5">
                              <ThemeIconContainer icon={Building} className="group-transition-transform duration-500" />
                              <div>
                                <h3 className="font-black text-[#0a2e1e] text-2xl tracking-tight leading-tight group-hover:text-[#0e7c66] transition-colors">
                                  {partner.company}
                                </h3>
                                <div className="flex gap-2 mt-2">
                                  <span className="bg-[#0e7c66] text-white px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase tracking-widest">
                                    {partner.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-[#5a6672] text-sm font-bold bg-[#d4ede4]/30 px-3 py-1.5 rounded-none w-fit border border-[#d0d5dc]/30">
                              <Globe className="w-4 h-4 text-[#0e7c66]" />
                              {partner.location}
                            </div>
                          </div>

                          {/* Professional Details */}
                          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:px-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-none bg-[#f4fbf8] border border-slate-100 flex items-center justify-center text-[#0e7c66]">
                                  <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] text-[#0e7c66] uppercase font-black tracking-widest mb-1">
                                    Primary Contact
                                  </p>
                                  <p className="font-bold text-[#5a6672] text-lg">
                                    {partner.contact.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#d4ede4] border border-[#0e7c66]/20 flex items-center justify-center text-[#0e7c66]">
                                  <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="flex-1 max-w-full overflow-hidden">
                                  <p className="text-[10px] text-[#0e7c66] uppercase font-black tracking-widest mb-1">
                                    Direct Inquiry
                                  </p>
                                  <a
                                    href={`mailto:${partner.contact.email}`}
                                    className="font-bold text-[#0e7c66] hover:text-[#065F4C] transition-all truncate block text-lg underline decoration-[#0e7c66]/30 underline-offset-4 hover:decoration-[#0e7c66]"
                                  >
                                    {partner.contact.email}
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#d4ede4] border border-[#0e7c66]/20 flex items-center justify-center text-[#0e7c66]">
                                  <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-[#0e7c66] uppercase font-black tracking-widest mb-1">
                                    Mobile
                                  </p>
                                  <p className="font-bold text-[#5a6672] text-lg">
                                    {partner.contact.phone}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#d4ede4] border border-[#0e7c66]/20 flex items-center justify-center text-[#0e7c66]">
                                  <Check className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-[#0e7c66] uppercase font-black tracking-widest mb-1">
                                    Status
                                  </p>
                                  <p className="font-bold text-[#0e7c66] text-lg flex items-center gap-1.5">
                                    Verified Compliance
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="lg:col-span-1 flex flex-col gap-3">
                            <ThemeButton
                              onClick={() => handleContactPartner(partner)}
                              className="w-full justify-center group/btn"
                            >
                              Connect
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </ThemeButton>
                            <button
                              onClick={() => handleViewDetails(partner)}
                              className={`${themeClasses.button.outline} w-full justify-center group/btn2`}
                            >
                              Read Insights
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-24 bg-[#f4fbf8]/40 rounded-none border border-[#d0d5dc]/60">
                      <div className="w-24 h-24 bg-[#d4ede4] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#0e7c66]/20">
                        <Globe className="w-12 h-12 text-[#0e7c66] animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-black text-[#0a2e1e] mb-4 tracking-tight">
                        No Partners Available
                      </h3>
                      <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                        We currently have no active partners matching these
                        specific filters. Try expanding your search area or
                        selecting competitive partner types.
                      </p>
                    </div>
                  )}
                </div>

                {/* Refined Pagination */}
                <div className="flex justify-center items-center gap-3 mt-10 pt-8 border-t border-[#d0d5dc]/60">
                  <button className="w-10 h-10 rounded-none bg-[#0e7c66] text-white flex items-center justify-center text-sm font-bold transition-all hover:bg-[#065F4C]">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-none border border-[#d0d5dc]/60 bg-white text-slate-400 flex items-center justify-center text-sm font-bold hover:border-[#0e7c66] hover:text-[#0e7c66] transition-all">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-none border border-[#d0d5dc]/60 bg-white text-slate-400 flex items-center justify-center text-sm font-bold hover:border-[#0e7c66] hover:text-[#0e7c66] transition-all">
                    3
                  </button>
                  <span className="px-2 text-slate-300 font-black tracking-widest">
                    ...
                  </span>
                  <button className="px-5 h-10 rounded-none border border-[#d0d5dc]/60 bg-white text-slate-400 flex items-center justify-center text-xs font-bold uppercase tracking-widest hover:border-[#0e7c66] hover:text-[#0e7c66] transition-all">
                    Next Page
                  </button>
                </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onSubmit={handleLicenseSubmit}
          onClose={() => setShowLicenseModal(false)}
          customConfig={{
            ...formConfigurations.license,
            endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
            onSuccess: () => {
              setShowLicenseModal(false);
              showToast(
                "License request submitted successfully! Check your email for details.",
                "success",
              );
            },
          }}
        />
      )}
      {/* Contact Partner Modal - Premium Redesign */}
      {showContactModal && selectedPartnerForContact && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-none max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-[#d0d5dc]/60">
            {/* Premium Header */}
            <div className="bg-[#0e7c66] text-white p-8 rounded-none relative flex-shrink-0">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Contact Partner
                </h2>
                <p className="text-[#d4ede4]/80 mt-1 text-sm font-medium">
                  Send a direct inquiry to this partner
                </p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 z-20 cursor-pointer text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-none hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 pointer-events-none" />
              </button>
            </div>
            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="p-8 space-y-6">
                {/* Partner Info Card - Premium */}
                <div className={`${themeClasses.card.base} p-6 relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ede4]/20 blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <ThemeIconContainer icon={Building} />
                      <div>
                        <h3 className="text-xl font-black text-[#0a2e1e] tracking-tight">
                          {selectedPartnerForContact.company}
                        </h3>
                        <span className="bg-[#0e7c66] text-white px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase tracking-widest">
                          {selectedPartnerForContact.type}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Contact
                        </p>
                        <p className="font-bold text-[#0a2e1e] text-sm">
                          {selectedPartnerForContact.contact.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Location
                        </p>
                        <p className="font-bold text-[#0a2e1e] text-sm flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#0e7c66]" />
                          {selectedPartnerForContact.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Phone
                        </p>
                        <p className="font-bold text-[#0e7c66] text-sm">
                          {selectedPartnerForContact.contact.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form - Premium */}
                <form
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      !contactPartnerForm.name.trim() ||
                      !contactPartnerForm.email.trim() ||
                      !contactPartnerForm.subject.trim() ||
                      !contactPartnerForm.message.trim()
                    ) {
                      showToast("Please fill in all required fields.", "error");
                      return;
                    }
                    setIsContactSubmitting(true);
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

                      const partnerInfo = selectedPartnerForContact;

                      // === Prepare FormData for FormSubmit ===
                      const formSubmitData = new FormData();
                      // Webhook to notify backend - backend will send auto-response email
                      formSubmitData.append(
                        "_webhook",
                        `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
                      );
                      formSubmitData.append(
                        "_webhookContentType",
                        "application/json",
                      );
                      formSubmitData.append("_webhookExtraData", "true");
                      formSubmitData.append("_captcha", "false");
                      formSubmitData.append("_template", "table");
                      formSubmitData.append("_next", window.location.href);
                      formSubmitData.append(
                        "name",
                        contactPartnerForm.name.trim(),
                      );
                      formSubmitData.append(
                        "email",
                        contactPartnerForm.email.trim(),
                      );
                      formSubmitData.append(
                        "company",
                        contactPartnerForm.company.trim(),
                      );
                      formSubmitData.append(
                        "phone",
                        contactPartnerForm.phone.trim(),
                      );
                      formSubmitData.append(
                        "country",
                        contactPartnerForm.country.trim(),
                      );
                      formSubmitData.append(
                        "businessType",
                        contactPartnerForm.businessType.trim(),
                      );
                      formSubmitData.append(
                        "subject",
                        contactPartnerForm.subject.trim(),
                      );
                      formSubmitData.append(
                        "message",
                        contactPartnerForm.message.trim(),
                      );
                      formSubmitData.append(
                        "_replyto",
                        contactPartnerForm.email.trim(),
                      );
                      formSubmitData.append("timestamp", timestampLocal);
                      formSubmitData.append(
                        "partnerCompany",
                        partnerInfo?.company || "",
                      );
                      formSubmitData.append(
                        "partnerType",
                        partnerInfo?.type || "",
                      );
                      formSubmitData.append(
                        "partnerLocation",
                        partnerInfo?.location || "",
                      );
                      formSubmitData.append(
                        "source",
                        "Partners Page - Contact Partner Form",
                      );
                      formSubmitData.append(
                        "_subject",
                        `Partner Contact Inquiry: ${contactPartnerForm.subject.trim()} - D-Secure Tech`,
                      );
                      formSubmitData.append(
                        "_cc",
                        import.meta.env.VITE_FORM_CC_EMAILS,
                      );

                      // Auto-response configuration for backend
                      formSubmitData.append("sendAutoReply", "true");
                      formSubmitData.append(
                        "customer_email",
                        contactPartnerForm.email.trim(),
                      );
                      formSubmitData.append(
                        "_replyto",
                        contactPartnerForm.email.trim(),
                      );

                      // === Prepare submission data for Backend API ===
                      const submissionData = {
                        name: contactPartnerForm.name.trim(),
                        email: contactPartnerForm.email.trim(),
                        company: contactPartnerForm.company.trim(),
                        phone: contactPartnerForm.phone.trim(),
                        country: contactPartnerForm.country.trim() || partnerInfo?.location || "",
                        businessType: contactPartnerForm.businessType.trim() || partnerInfo?.type || "",
                        solutionType: "partner-contact",
                        complianceRequirements: "",
                        message: `[Partner: ${partnerInfo?.company || "N/A"}] ${contactPartnerForm.subject.trim()}: ${contactPartnerForm.message.trim()}`,
                        usageType: "",
                        source: "Partners Page - Contact Partner Form",
                        timestamp: timestampISO,
                      };

                      // Reset form and show success immediately
                      setContactPartnerForm({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        country: "",
                        businessType: "",
                        subject: "",
                        message: "",
                      });
                      setIsContactSubmitting(false);
                      setShowContactModal(false);
                      showToast(
                        "Message sent successfully! The partner will contact you soon.",
                        "success",
                      );

                      try {
                        // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                        const API_BASE =
                          import.meta.env.VITE_API_BASE_URL;
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
                        fetch(
                          import.meta.env.VITE_POWER_AUTOMATE_HTTP_URL || "",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "x-api-key": import.meta.env.VITE_POWER_AUTOMATE_API_KEY,
                            },
                            body: JSON.stringify(submissionData),
                          },
                        ).catch(() => {});

                        if (!apiResponse.ok) {
                          const errorData = await apiResponse.json();
                          console.error(
                            "Backend submission failed:",
                            errorData,
                          );
                        }
                      } catch (error: any) {
                        console.error("Form error:", error);
                      }
                    } catch (error) {
                      console.error("FormSubmit error:", error);
                      showToast(
                        "Failed to send message. Please try again.",
                        "error",
                      );
                      setIsContactSubmitting(false);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2">
                        <User className="w-3.5 h-3.5" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPartnerForm.name}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2">
                        <Mail className="w-3.5 h-3.5" />
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactPartnerForm.email}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2">
                        <Building className="w-3.5 h-3.5" />
                        Company
                      </label>
                      <input
                        type="text"
                        value={contactPartnerForm.company}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={contactPartnerForm.phone}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2">
                        <Globe className="w-3.5 h-3.5" />
                        Country
                      </label>
                      <select
                        value={contactPartnerForm.country}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            country: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50 appearance-none [&>option]:text-[#0a2e1e]"
                      >
                        <option value="" disabled hidden>Select Country</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2">
                        <Building className="w-3.5 h-3.5" />
                        Business Type
                      </label>
                      <select
                        value={contactPartnerForm.businessType}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            businessType: e.target.value,
                          }))
                        }
                        className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50 appearance-none [&>option]:text-[#0a2e1e]"
                      >
                        <option value="" disabled hidden>Business Type</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="SMB">SMB</option>
                        <option value="ITAD / Recycler">ITAD / Recycler</option>
                        <option value="Government / Public Sector">Government / Public Sector</option>
                        <option value="Individual / Home">Individual / Home</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={contactPartnerForm.subject}
                      onChange={(e) =>
                        setContactPartnerForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#0e7c66]/60 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={contactPartnerForm.message}
                      onChange={(e) =>
                        setContactPartnerForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full border border-[#d0d5dc]/60 rounded-none px-4 py-3 focus:ring-2 focus:ring-[#0e7c66]/10 focus:border-[#0e7c66] transition-all duration-300 outline-none text-[#5a6672] font-bold shadow-sm hover:border-[#0e7c66]/50 resize-none"
                      placeholder="Describe your requirements or questions..."
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <ThemeButton
                      type="submit"
                      disabled={isContactSubmitting}
                      className="flex-1 justify-center py-4 text-base"
                    >
                      {isContactSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </ThemeButton>
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className={`${themeClasses.button.outline} px-6 py-4`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Quick Contact Options - Premium */}
                <div className="pt-6 border-t border-[#d0d5dc]/60">
                  <p className="text-xs uppercase tracking-widest font-black text-[#0e7c66]/50 mb-4">
                    Or contact directly
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedPartnerForContact.contact.email}`}
                      className="bg-[#d4ede4]/30 text-[#0e7c66] px-5 py-2.5 rounded-none hover:bg-[#d4ede4] transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-[#d0d5dc]/60 hover:border-[#0e7c66]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Email
                    </a>
                    <a
                      href={`tel:${selectedPartnerForContact.contact.phone}`}
                      className="bg-[#d4ede4]/30 text-[#0e7c66] px-5 py-2.5 rounded-none hover:bg-[#d4ede4] transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-[#d0d5dc]/60 hover:border-[#0e7c66]"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                    <a
                      href={selectedPartnerForContact.contact.website}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="bg-[#f4fbf8] text-[#5a6672] px-5 py-2.5 rounded-none hover:bg-slate-100 transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-slate-100 hover:border-[#0e7c66]"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* View Details Modal - Premium Redesign */}
      {showDetailsModal && selectedPartnerForDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-[#d0d5dc]/60">
            {/* Premium Header */}
            <div className="bg-[#0e7c66] text-white p-8 rounded-none relative flex-shrink-0">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Partner Details
                </h2>
                <p className="text-[#d4ede4]/80 mt-1 text-sm font-medium">
                  Comprehensive partner information
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-6 right-6 z-20 cursor-pointer text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-none hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 pointer-events-none" />
              </button>
            </div>
            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="p-8 space-y-8">
                {/* Company Header Card - Premium */}
                <div className={`${themeClasses.card.base} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ede4]/20 blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <ThemeIconContainer icon={Building} />
                      <div>
                        <h3 className="text-2xl font-black text-[#0a2e1e] tracking-tight">
                          {selectedPartnerForDetails.company}
                        </h3>
                        <span className="bg-[#0e7c66] text-white px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase tracking-widest">
                          {selectedPartnerForDetails.type}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-none p-3 border border-[#d0d5dc]/60 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Location
                        </p>
                        <p className="font-bold text-[#0a2e1e] text-sm flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#0e7c66]" />
                          {selectedPartnerForDetails.location}
                        </p>
                      </div>
                      <div className="bg-white rounded-none p-3 border border-[#d0d5dc]/60 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Established
                        </p>
                        <p className="font-bold text-[#0a2e1e] text-sm">2015</p>
                      </div>
                      <div className="bg-white rounded-none p-3 border border-[#d0d5dc]/60 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Team Size
                        </p>
                        <p className="font-bold text-[#0a2e1e] text-sm">
                          50-200
                        </p>
                      </div>
                      <div className="bg-white rounded-none p-3 border border-[#d0d5dc]/60 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-1">
                          Compliance
                        </p>
                        <p className="font-bold text-[#0e7c66] text-sm">
                          ISO 27001, NIST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Overview - Partner ka vivaran */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-[#0a2e1e] mb-4">
                    <ClipboardList className="w-5 h-5 text-[#0e7c66]" />
                    Company Overview
                  </h4>
                  <div className="bg-white border border-[#d0d5dc]/60 rounded-none p-6 shadow-sm">
                    <p className="text-[#5a6672] leading-relaxed mb-4">
                      {selectedPartnerForDetails.company} is a leading{" "}
                      {selectedPartnerForDetails.type.toLowerCase()}{" "}
                      specializing in secure data erasure and IT asset
                      disposition services. With over 8 years of experience in
                      the industry, we have successfully served over 500+
                      clients across various sectors including healthcare,
                      finance, and government organizations.
                    </p>
                    <p className="text-[#5a6672] leading-relaxed">
                      Our team of Compliant professionals ensures complete data
                      destruction compliance with international standards
                      including NIST 800-88 and DOD 5220.22-M.
                      We provide comprehensive regulatory documents of
                      destruction for audit purposes and maintain the highest
                      levels of security throughout the data erasure process.
                    </p>
                  </div>
                </div>

                {/* Services Offered */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-[#0a2e1e] mb-4">
                    <Settings className="w-5 h-5 text-[#0e7c66]" />
                    Services Offered
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Secure Data Erasure",
                      "IT Asset Disposition",
                      "Hard Drive Destruction",
                      "Mobile Device Wiping",
                      "Server Decommissioning",
                      "Compliance Consulting",
                      "Regulatory Document Generation",
                      "On-site Services",
                    ].map((service, index) => (
                      <div
                        key={`service-${service}`}
                        className="group bg-white border border-[#d0d5dc]/60 rounded-none p-4 hover:border-[#0e7c66] hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#d4ede4]/30 rounded-none flex items-center justify-center group-hover:bg-[#0e7c66] transition-colors duration-300">
                            <Check className="w-4 h-4 text-[#0e7c66] group-hover:text-white transition-colors duration-300" />
                          </div>
                          <span className="font-bold text-[#0a2e1e] text-sm">
                            {service}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-[#0a2e1e] mb-4">
                    <MessageSquare className="w-5 h-5 text-[#0e7c66]" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Contact */}
                    <div className="bg-white border border-[#d0d5dc]/60 rounded-none p-6 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-4">
                        Primary Contact
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-[#f4fbf8] border border-[#d0d5dc]/30 flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                              Name
                            </p>
                            <p className="font-bold text-[#0a2e1e] text-sm">
                              {selectedPartnerForDetails.contact.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#d4ede4]/30 border border-[#d0d5dc]/30 flex items-center justify-center text-[#0e7c66]">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                              Email
                            </p>
                            <a
                              href={`mailto:${selectedPartnerForDetails.contact.email}`}
                              className="font-bold text-[#0e7c66] hover:text-[#0e7c66] text-sm underline decoration-[#d4ede4] underline-offset-2 hover:decoration-[#0e7c66] transition-all"
                            >
                              {selectedPartnerForDetails.contact.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#d4ede4]/30 border border-[#d0d5dc]/30 flex items-center justify-center text-[#0e7c66]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                              Phone
                            </p>
                            <a
                              href={`tel:${selectedPartnerForDetails.contact.phone}`}
                              className="font-bold text-[#0e7c66] hover:text-[#0e7c66] text-sm transition-all"
                            >
                              {selectedPartnerForDetails.contact.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-[#f4fbf8] border border-[#d0d5dc]/30 flex items-center justify-center text-[#5a6672]">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                              Website
                            </p>
                            <a
                              href={selectedPartnerForDetails.contact.website}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="font-bold text-[#0e7c66] hover:text-[#0e7c66] text-sm underline decoration-[#d4ede4] underline-offset-2 hover:decoration-[#0e7c66] transition-all"
                            >
                              {selectedPartnerForDetails.contact.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Business Hours */}
                    <div className="bg-white border border-[#d0d5dc]/60 rounded-none p-6 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]/50 mb-4">
                        Business Hours
                      </p>
                      <div className="space-y-3">
                        {[
                          {
                            day: "Monday - Friday",
                            time: "9:00 AM - 6:00 PM",
                            active: true,
                          },
                          {
                            day: "Saturday",
                            time: "9:00 AM - 2:00 PM",
                            active: true,
                          },
                          { day: "Sunday", time: "Closed", active: false },
                        ].map((schedule, idx) => (
                          <div
                            key={`schedule-${schedule.day}`}
                            className="flex items-center justify-between py-2 border-b border-[#d0d5dc]/30 last:border-0"
                          >
                            <span className="text-[#5a6672] font-medium text-sm">
                              {schedule.day}
                            </span>
                            <span
                              className={`font-bold text-sm ${schedule.active ? "text-[#0a2e1e]" : "text-slate-400"}`}
                            >
                              {schedule.time}
                            </span>
                          </div>
                        ))}
                        <div className="bg-[#d4ede4]/30 rounded-none p-3 mt-2 border border-[#d0d5dc]/60">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#0e7c66] rounded-none animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-widest font-black text-[#0e7c66]">
                              Emergency: 24/7 Available
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-[#d0d5dc]/60">
                  <ThemeButton
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleContactPartner(selectedPartnerForDetails);
                    }}
                    className="flex-1 justify-center py-4 text-base"
                  >
                    Contact This Partner
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ThemeButton>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className={`${themeClasses.button.outline} px-6 py-4`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && <Toast toast={toast} onClose={hideToast} />}
    </>
  );
});

export default PartnersPage;
