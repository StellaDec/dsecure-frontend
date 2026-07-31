import React, { useState, useCallback, useMemo, memo } from "react";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm, type LicenseFormData } from "@/components/forms";
import { PartnershipForm, type PartnershipFormData } from "@/components/forms";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import {
  File,
  HardDrive,
  Activity,
  Search,
  X,
  HelpCircle,
  BookOpen,
  Mail,
  Ticket,
  Phone,
  ArrowRight,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import {
  ThemeButton,
  ThemeCard,
  ThemeIconContainer,
  ThemeSection,
  ThemeSectionHeading,
  themeClasses,
  themeTokens,
} from "@/components/ui/Theme";

// ============================================================================
// FORM INPUT COMPONENTS (D-Secure Theme tokens ke anusaar flat border & colors)
// ============================================================================
const FormInput: React.FC<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder: string;
  label: string;
}> = ({ type, name, value, onChange, required, placeholder, label }) => (
  <div>
    <label className="block text-sm font-bold text-[#0a2e1e] mb-2">
      {label} {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-[#d0d5dc] rounded-none px-4 py-3 text-[#0a2e1e] placeholder-[#5a6672] focus:ring-2 focus:ring-[#0e7c66] focus:border-[#0e7c66] focus:outline-none transition-colors"
      placeholder={placeholder}
    />
  </div>
);

const FormTextarea: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder: string;
  label: string;
  rows: number;
}> = ({ name, value, onChange, required, placeholder, label, rows }) => (
  <div>
    <label className="block text-sm font-bold text-[#0a2e1e] mb-2">
      {label} {required && "*"}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className="w-full border border-[#d0d5dc] rounded-none px-4 py-3 text-[#0a2e1e] placeholder-[#5a6672] focus:ring-2 focus:ring-[#0e7c66] focus:border-[#0e7c66] focus:outline-none transition-colors resize-none"
      placeholder={placeholder}
    />
  </div>
);

const FormSelect: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}> = ({ name, value, onChange, label, options }) => (
  <div>
    <label className="block text-sm font-bold text-[#0a2e1e] mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-[#d0d5dc] rounded-none px-4 py-3 text-[#0a2e1e] focus:ring-2 focus:ring-[#0e7c66] focus:border-[#0e7c66] focus:outline-none transition-colors bg-white cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// ============================================================================
// SUPPORT TICKET MODAL COMPONENT (D-Secure Flat Modal & Primary Colors)
// ============================================================================
const SupportTicketModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ticketForm: {
    name: string;
    email: string;
    phone: string;
    country: string;
    businessType: string;
    subject: string;
    priority: string;
    category: string;
    description: string;
  };
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  priorityOptions: { value: string; label: string }[];
  categoryOptions: { value: string; label: string }[];
  isSubmitting?: boolean;
}> = ({
  isOpen,
  onClose,
  ticketForm,
  onInputChange,
  onSubmit,
  priorityOptions,
  categoryOptions,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-none border border-[#d0d5dc]/60 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="bg-[#0e7c66] text-white p-6 rounded-none flex-shrink-0 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Submit Support Ticket</h2>
            <p className="mt-1 text-[#d4ede4] text-sm">
              We'll get back to you as soon as possible!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#d4ede4] transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto modal-scroll-container">
          <form onSubmit={onSubmit} className="p-6 space-y-6 modal-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                name="name"
                value={ticketForm.name}
                onChange={onInputChange}
                required
                placeholder="Enter your full name"
                label="Full Name"
              />

              <FormInput
                type="email"
                name="email"
                value={ticketForm.email}
                onChange={onInputChange}
                required
                placeholder="Enter your email address"
                label="Email Address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="tel"
                name="phone"
                value={ticketForm.phone}
                onChange={onInputChange}
                placeholder="Enter your phone number"
                label="Phone"
              />
              <FormInput
                type="text"
                name="country"
                value={ticketForm.country}
                onChange={onInputChange}
                placeholder="Enter your country"
                label="Country"
              />
            </div>

            <FormSelect
              name="businessType"
              value={ticketForm.businessType}
              onChange={onInputChange}
              label="Business Type"
              options={[
                { value: "", label: "Select Business Type" },
                { value: "Enterprise", label: "Enterprise" },
                { value: "SMB", label: "SMB" },
                { value: "ITAD/Recycler", label: "ITAD / Recycler" },
                { value: "Government/Public Sector", label: "Government / Public Sector" },
                { value: "Individual/Home", label: "Individual / Home" },
                { value: "Other", label: "Other" }
              ]}
            />

            <FormInput
              type="text"
              name="subject"
              value={ticketForm.subject}
              onChange={onInputChange}
              required
              placeholder="Brief description of your issue"
              label="Subject"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                name="priority"
                value={ticketForm.priority}
                onChange={onInputChange}
                label="Priority"
                options={priorityOptions}
              />

              <FormSelect
                name="category"
                value={ticketForm.category}
                onChange={onInputChange}
                label="Category"
                options={categoryOptions}
              />
            </div>

            <FormTextarea
              name="description"
              value={ticketForm.description}
              onChange={onInputChange}
              required
              rows={3}
              placeholder="Please provide detailed information about your issue or question..."
              label="Description"
            />

            <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
              <ThemeButton
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </ThemeButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN SUPPORT PAGE COMPONENT
// ============================================================================
const SupportPage: React.FC = () => {
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTicketForm, setActiveTicketForm] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    businessType: "",
    subject: "",
    priority: "medium",
    category: "general",
    description: "",
  });

  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "trending", label: "Trending" },
    { id: "self-help", label: "Self Help" },
    { id: "assisted-support", label: "Assisted Support" },
    { id: "get-started", label: "Get Started" },
  ];

  // Scroll listener sticky nav ke liye
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Form options memoize karein
  const priorityOptions = useMemo(
    () => [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" },
    ],
    [],
  );

  const categoryOptions = useMemo(
    () => [
      { value: "general", label: "General Support" },
      { value: "technical", label: "Technical Issue" },
      { value: "billing", label: "Billing & Licensing" },
      { value: "feature", label: "Feature Request" },
      { value: "bug", label: "Bug Report" },
    ],
    [],
  );

  // Searchable content database
  const searchableContent = useMemo(
    () => [
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        description:
          "Common questions and answers about D-Secure data erasure solutions",
        url: "/support/faqs",
        category: "Support",
        keywords: [
          "faq",
          "questions",
          "answers",
          "help",
          "common",
          "issues",
          "problems",
        ],
      },
      {
        id: "knowledge-base",
        title: "Knowledge Base",
        description:
          "Step by step guides for secure data wiping on different devices",
        url: "/support/knowledge-base",
        category: "Documentation",
        keywords: [
          "guide",
          "tutorial",
          "documentation",
          "steps",
          "how-to",
          "manual",
        ],
      },
      {
        id: "get-started",
        title: "Get Started Guide",
        description: "Learn how to wipe PC, Mac, Server & Mobile devices",
        url: "/support/get-started",
        category: "Getting Started",
        keywords: [
          "getting started",
          "beginner",
          "setup",
          "installation",
          "first time",
        ],
      },
      {
        id: "help-manual",
        title: "Help Manual",
        description: "Comprehensive user manual for D-Secure products",
        url: "/support/help-manual",
        category: "Documentation",
        keywords: ["manual", "documentation", "user guide", "reference"],
      },
      {
        id: "product-videos",
        title: "Product Videos",
        description: "Video tutorials and product demonstrations",
        url: "/support/product-videos",
        category: "Videos",
        keywords: [
          "video",
          "tutorial",
          "demo",
          "demonstration",
          "visual",
          "watch",
        ],
      },
      {
        id: "overwrite-guide",
        title: "Hard Drive Overwrite Guide",
        description: "How many overwrites should I do on a Hard Drive?",
        url: "/support/overwrite-guide",
        category: "Guides",
        keywords: [
          "overwrite",
          "hard drive",
          "hdd",
          "passes",
          "multiple",
          "secure",
        ],
      },
      {
        id: "wipe-guide",
        title: "HDD & SSD Wipe Guide",
        description: "How to securely wipe Hard Drives and SSDs",
        url: "/support/secure-erase-hddssd",
        category: "Guides",
        keywords: [
          "wipe",
          "erase",
          "delete",
          "hdd",
          "ssd",
          "hard drive",
          "solid state",
        ],
      },
      {
        id: "mac-wipe-guide",
        title: "Mac Machine Wipe Guide",
        description: "How to wipe 12 board Mac machines",
        url: "/support/mac-eraser-guide",
        category: "Guides",
        keywords: ["mac", "apple", "macbook", "imac", "board", "wipe"],
      },
      {
        id: "m1-mac-wipe-guide",
        title: "M1 Mac Wipe Guide",
        description: "How to wipe MacOS with M1 chip",
        url: "/support/mac-wipe-guide",
        category: "Guides",
        keywords: ["m1", "mac", "chip", "apple silicon", "new mac", "arm"],
      },
      {
        id: "cloud-console-guide",
        title: "Cloud Console Guide",
        description: "How to use D-Secure Cloud Console",
        url: "/support/cloud-console-guide",
        category: "Cloud",
        keywords: ["cloud", "console", "remote", "management", "web interface"],
      },
      {
        id: "ssd-cryptographic-erasure",
        title: "SSD Cryptographic Erasure",
        description: "How to perform cryptographic erasure on SSD",
        url: "/support/ssd-cryptographic-erasure-guide",
        category: "Advanced",
        keywords: [
          "ssd",
          "cryptographic",
          "encryption",
          "secure erase",
          "crypto",
        ],
      },
      {
        id: "retain-os-guide",
        title: "Retain OS Wipe Guide",
        description: "How to wipe everything and retain your operating system",
        url: "/support/retain-os-guide",
        category: "Guides",
        keywords: [
          "retain",
          "os",
          "operating system",
          "keep",
          "preserve",
          "selective wipe",
        ],
      },
      {
        id: "diagnostic-manual",
        title: "Diagnostic Manual",
        description: "Comprehensive guide for system hardware diagnostics",
        url: "/support/manual/diagnostic-manual",
        category: "Manual",
        keywords: [
          "diagnostic",
          "health",
          "check",
          "hardware",
          "test",
          "manual",
          "system",
        ],
      },
    ],
    [],
  );

  // Trending searches dataset
  const trendingSearches = useMemo(
    () => ({
      "How many overwrites should I do on a Hard Drive?":
        "/support/overwrite-guide",
      "How can I Wipe Hard Drives and SSDs?": "/support/secure-erase-hddssd",
      "How can I wipe 12 board Mac Machines?": "/support/mac-eraser-guide",
      "How do I wipe everything and retain my OS?": "/support/retain-os-guide",
      "How can I Wipe a MacOS with M1 Chip?": "/support/mac-eraser-guide",
      "How to use D-Secure Cloud Console?": "/support/cloud-console-guide",
      "How do I Perform Cryptographic Erasure on SSD?":
        "/support/ssd-cryptographic-erasure-guide",
    }),
    [],
  );

  // Search logic execution
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    const contentResults = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.some((keyword) => keyword.includes(query)),
    );

    const trendingResults = Object.entries(trendingSearches)
      .filter(([searchText]) => {
        const searchTextLower = searchText.toLowerCase();
        return (
          searchTextLower.includes(query) ||
          query
            .split(" ")
            .some((word) => word.length > 2 && searchTextLower.includes(word))
        );
      })
      .map(([searchText, url]) => ({
        title: searchText,
        description: "Popular support question",
        category: "Trending",
        url: url,
        keywords: searchText.toLowerCase().split(" "),
      }));

    const combinedResults = [...trendingResults, ...contentResults];

    const uniqueResults = combinedResults.filter(
      (item, index, arr) =>
        arr.findIndex(
          (t) => t.title.toLowerCase() === item.title.toLowerCase(),
        ) === index,
    );

    return uniqueResults.slice(0, 8);
  }, [searchQuery, searchableContent, trendingSearches]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        setShowSearchResults(true);
      }
    },
    [searchQuery],
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      const shouldShow = value.trim().length > 0;
      setShowSearchResults(shouldShow);
      setSelectedResultIndex(-1);

      if (shouldShow) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    [],
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setShowSearchResults(false);
    setSelectedResultIndex(-1);
    document.body.style.overflow = "";
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSearchResults || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedResultIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedResultIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (
            selectedResultIndex >= 0 &&
            selectedResultIndex < searchResults.length
          ) {
            window.location.href = searchResults[selectedResultIndex].url;
          } else {
            handleSearch(e as unknown as React.FormEvent);
          }
          break;
        case "Escape":
          e.preventDefault();
          clearSearch();
          break;
      }
    },
    [
      showSearchResults,
      searchResults,
      selectedResultIndex,
      handleSearch,
      clearSearch,
    ],
  );

  const handleTrendingSearchClick = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ticket submission handler
  const handleTicketSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

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

        const formSubmitData = new FormData();
        formSubmitData.append(
          "_webhook",
          `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
        );
        formSubmitData.append("_webhookContentType", "application/json");
        formSubmitData.append("_webhookExtraData", "true");
        formSubmitData.append("_captcha", "false");
        formSubmitData.append("_template", "table");
        formSubmitData.append("_next", window.location.href);
        formSubmitData.append("name", ticketForm.name.trim());
        formSubmitData.append("email", ticketForm.email.trim());
        formSubmitData.append("phone", ticketForm.phone?.trim() || "");
        formSubmitData.append("country", ticketForm.country?.trim() || "");
        formSubmitData.append("businessType", ticketForm.businessType?.trim() || "");
        formSubmitData.append("subject", ticketForm.subject.trim());
        formSubmitData.append("priority", ticketForm.priority.trim());
        formSubmitData.append("category", ticketForm.category.trim());
        formSubmitData.append("description", ticketForm.description.trim());
        formSubmitData.append("_replyto", ticketForm.email.trim());
        formSubmitData.append("sendAutoReply", "true");
        formSubmitData.append("customer_email", ticketForm.email.trim());
        formSubmitData.append("timestamp", timestampLocal);
        formSubmitData.append("source", "Support Page - Ticket Form");
        formSubmitData.append(
          "_subject",
          `Support Ticket: ${ticketForm.subject} - D-Secure Tech`,
        );
        formSubmitData.append(
          "_cc",
          import.meta.env.VITE_FORM_CC_EMAILS,
        );

        const submissionData = {
          name: ticketForm.name.trim(),
          email: ticketForm.email.trim(),
          company: "",
          phone: ticketForm.phone?.trim() || "",
          country: ticketForm.country?.trim() || "",
          businessType: ticketForm.businessType?.trim() || "",
          solutionType: ticketForm.category.trim(),
          complianceRequirements: "",
          message: `[${ticketForm.priority.toUpperCase()}] ${ticketForm.subject.trim()}: ${ticketForm.description.trim()}`,
          usageType: "",
          source: "Support Page - Ticket Form",
          timestamp: timestampISO,
        };

        setActiveTicketForm(false);
        setTicketForm({
          name: "",
          email: "",
          phone: "",
          country: "",
          businessType: "",
          subject: "",
          priority: "medium",
          category: "general",
          description: "",
        });
        setIsSubmitting(false);
        showToast(
          "Support ticket submitted successfully! We will get back to you soon.",
          "success",
        );

        try {
          const API_BASE = import.meta.env.VITE_API_BASE_URL;
          const apiResponse = await fetch(
            `${API_BASE}/api/ContactFormSubmissions`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(submissionData),
            },
          );

          await fetch(import.meta.env.VITE_FORMSUBMIT_ENDPOINT, {
            method: "POST",
            body: formSubmitData,
            headers: { Accept: "application/json" },
          });

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
            console.error("Backend submission failed:", errorData);
          }
        } catch (error: unknown) {
          console.error("Form error:", error);
        }
      } catch (error: unknown) {
        console.error("FormSubmit error:", error);
        showToast(
          "Failed to submit support ticket. Please try again.",
          "error",
        );
        setIsSubmitting(false);
      }
    },
    [ticketForm, showToast],
  );

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setTicketForm((prev) => {
        if (prev[name as keyof typeof prev] === value) {
          return prev;
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [],
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHeadNative seo={getSEOForPage("support")} />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-[#d0d5dc]/60 shadow-sm">
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
              <nav className="flex items-center gap-2 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                      activeSection === item.id
                        ? "bg-[#0e7c66] text-white border-[#0e7c66]"
                        : "bg-white text-[#5a6672] border-[#d0d5dc]/60 hover:bg-[#d4ede4] hover:text-[#0e7c66]"
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
        {/* ================= HERO / OVERVIEW SECTION ================= */}
        <ThemeSection id="overview" className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a2e1e] mb-4">
                    <span className="text-[#0e7c66]">D-Secure</span> Customer Support
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#5a6672] mb-8">
                    How can we help you today?
                  </h2>

                  {/* Search Bar Container */}
                  <div className="max-w-2xl mx-auto relative">
                    <form onSubmit={handleSearch}>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder="Search documents and help resources..."
                          className="w-full py-4 pl-12 pr-24 rounded-none border border-[#d0d5dc] bg-white text-[#0a2e1e] placeholder-[#5a6672] focus:ring-2 focus:ring-[#0e7c66] focus:border-[#0e7c66] transition-all text-base shadow-sm hover:shadow-md focus:outline-none"
                          autoComplete="off"
                        />
                        <Search className="w-5 h-5 text-[#5a6672] absolute left-4 pointer-events-none" />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-16 text-[#5a6672] hover:text-[#0a2e1e] transition-colors p-1"
                            aria-label="Clear search query"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <ThemeButton
                          type="submit"
                          className="absolute right-2 px-4 py-1.5 min-h-[36px] text-sm font-bold"
                        >
                          Go
                        </ThemeButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* ================= SEARCH RESULTS OVERLAY & MODAL ================= */}
        {showSearchResults && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
              onClick={clearSearch}
            />

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 z-[10000]">
              {searchResults.length > 0 ? (
                <div className="bg-white rounded-none border border-[#d0d5dc]/60 shadow-2xl max-h-[70vh] overflow-hidden">
                  <div className="p-4 border-b border-[#d0d5dc]/60 bg-[#f4fbf8] flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0a2e1e]">
                      {searchResults.length} result
                      {searchResults.length !== 1 ? "s" : ""} found for "
                      {searchQuery}"
                    </span>
                    <button
                      onClick={clearSearch}
                      className="text-[#5a6672] hover:text-[#0e7c66] transition-colors p-1 hover:bg-[#d4ede4] rounded-full"
                      aria-label="Close search results"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <Link
                        key={`${result.title}-${index}`}
                        to={result.url}
                        className={`block p-4 hover:bg-[#f4fbf8] transition-all border-b border-[#d0d5dc]/40 last:border-b-0 ${
                          index === selectedResultIndex
                            ? "bg-[#f4fbf8] border-l-4 border-l-[#0e7c66]"
                            : ""
                        }`}
                        onClick={clearSearch}
                        onMouseEnter={() => setSelectedResultIndex(index)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-[#0a2e1e] mb-1 group-hover:text-[#0e7c66]">
                              {result.title}
                            </h3>
                            <p className="text-sm text-[#5a6672] mb-2">
                              {result.description}
                            </p>
                            <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-[#0e7c66] bg-[#d4ede4] rounded-none">
                              {result.category}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#0e7c66] mt-1 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                searchQuery && (
                  <div className="bg-white rounded-none border border-[#d0d5dc]/60 shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-[#d4ede4] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-[#0e7c66]" />
                    </div>
                    <p className="text-[#0a2e1e] font-bold mb-2">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-sm text-[#5a6672] mb-6">
                      Try searching with different keywords or browse our support sections below.
                    </p>
                    <ThemeButton onClick={clearSearch}>
                      Clear search
                    </ThemeButton>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* ================= TRENDING SEARCHES SECTION ================= */}
        <ThemeSection
          index={1}
          id="trending"
          className={`py-8 border-b border-[#d0d5dc]/60 ${showSearchResults ? "hidden" : ""}`}
        >
          <div className="container mx-auto px-4">
            <Reveal>
              <div>
                <h3 className="text-sm font-bold text-[#0e7c66] uppercase tracking-wider mb-4">
                  TRENDING SEARCHES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(trendingSearches).map(
                    ([search, url], index) => (
                      <div key={index} className="flex gap-2">
                        <button
                          className="flex-1 text-left text-[#0a2e1e] hover:text-[#0e7c66] font-medium transition-colors p-2 rounded-none hover:bg-[#d4ede4]/40 flex items-center justify-between group"
                          onClick={() => handleTrendingSearchClick(url)}
                        >
                          <span>{search}</span>
                          <ArrowRight className="w-4 h-4 text-[#0e7c66] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* ================= SELF HELP & SUPPORT SECTION ================= */}
        <ThemeSection id="self-help" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Reveal>
              <ThemeSectionHeading
                subtitle="Access Support Information For Your D-Secure Products"
                centered
              >
                Self Help & Support
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* FAQs */}
              <Reveal delayMs={100}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={HelpCircle}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Frequently Asked Questions
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Frequently Asked Questions By Our Customers That Might Help You.
                    </p>
                  </div>
                  <Link
                    to="/support/faqs"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>

              {/* Knowledge Base */}
              <Reveal delayMs={200}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={BookOpen}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Knowledge Base
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Step By Step Guide To Securely Wipe Data On Different Devices.
                    </p>
                  </div>
                  <Link
                    to="/support/knowledge-base"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>

              {/* Technical Blog */}
              <Reveal delayMs={300}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={Newspaper}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Technical Blog
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Insights and practical guides on data erasure, cybersecurity, and IT asset lifecycle management.
                    </p>
                  </div>
                  <Link
                    to="/blog"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>

              {/* File Eraser Manual */}
              <Reveal delayMs={400}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={File}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      D-Secure File Eraser Manual
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Step-by-step instructions to install, configure, and set up D-Secure File Eraser for seamless sanitization.
                    </p>
                  </div>
                  <Link
                    to="/support/help-manual/complete-manual"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    View File Eraser Manual <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>

              {/* Drive Eraser Manual */}
              <Reveal delayMs={500}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={HardDrive}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Drive Eraser Manual
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Complete setup guide for Drive Eraser, covering bootable media creation and software configuration.
                    </p>
                  </div>
                  <Link
                    to="/support/help-manual/complete-drive-manual"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    View Drive Eraser Manual <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>

              {/* Drive Diagnostics Manual */}
              <Reveal delayMs={600}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={Activity}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Drive Diagnostics Manual
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Detailed manual on how to set up diagnostic tools, run your first scan, and monitor drive health effectively.
                    </p>
                  </div>
                  <Link
                    to="/support/help-manual/complete-diagnostic-manual"
                    className="text-[#0e7c66] group-hover:text-[#0a2e1e] font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    View Diagnostics Manual <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ThemeCard>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= ASSISTED SUPPORT SECTION ================= */}
        <ThemeSection index={1} id="assisted-support" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Reveal>
              <ThemeSectionHeading
                subtitle="Raise a Ticket or Call us for support queries"
                centered
              >
                Assisted Support
              </ThemeSectionHeading>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Write to Us */}
              <Reveal delayMs={100}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={Mail}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Write to Us
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      Get quick resolution to your query by writing to us on email.
                    </p>
                  </div>
                  <ThemeButton
                    variant="outline"
                    onClick={() =>
                      (window.location.href = "mailto:support@dsecuretech.com")
                    }
                    className="w-full"
                    icon={<Mail className="w-4 h-4 ml-1" />}
                  >
                    Send Email
                  </ThemeButton>
                </ThemeCard>
              </Reveal>

              {/* Raise a Ticket */}
              <Reveal delayMs={200}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={Ticket}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Raise a Ticket
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      If you have queries and need help? Please submit a ticket.
                    </p>
                  </div>
                  <ThemeButton
                    variant="primary"
                    onClick={() => setActiveTicketForm(true)}
                    className="w-full"
                    icon={<Ticket className="w-4 h-4 ml-1" />}
                  >
                    Submit Ticket
                  </ThemeButton>
                </ThemeCard>
              </Reveal>

              {/* Call Us */}
              <Reveal delayMs={300}>
                <ThemeCard className="text-center group h-full flex flex-col justify-between">
                  <div>
                    <ThemeIconContainer
                      icon={Phone}
                      size="lg"
                      className="mx-auto mb-6"
                    />
                    <h3 className={themeClasses.typography.cardTitle}>
                      Call Us
                    </h3>
                    <p className={`${themeClasses.typography.cardBody} mb-6`}>
                      We will be happy to assist you. Technical Support in English only.
                    </p>
                  </div>
                  <ThemeButton
                    variant="outline"
                    onClick={() => (window.location.href = "tel:+918447750101")}
                    className="w-full"
                    icon={<Phone className="w-4 h-4 ml-1" />}
                  >
                    +91-844-775-0101
                  </ThemeButton>
                </ThemeCard>
              </Reveal>
            </div>
          </div>
        </ThemeSection>

        {/* ================= LET'S GET STARTED BANNER ================= */}
        <ThemeSection
          noBg={true}
          id="get-started"
          className="py-16 md:py-24 bg-[#0a2e1e] text-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Let's get started
                </h2>
                <p className="text-xl text-[#d4ede4] mb-8">
                  Interested in finding out more about our solutions?
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <ThemeButton
                    onClick={() => setShowLicenseModal(true)}
                    variant="primary"
                  >
                    Request Free License →
                  </ThemeButton>
                  <ThemeButton
                    onClick={() =>
                      (window.location.href = "tel:+918447750101")
                    }
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Need help: +91-844-775-0101
                  </ThemeButton>
                </div>
              </div>
            </Reveal>
          </div>
        </ThemeSection>
      </div>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={activeTicketForm}
        onClose={() => setActiveTicketForm(false)}
        ticketForm={ticketForm}
        onInputChange={handleInputChange}
        onSubmit={handleTicketSubmit}
        priorityOptions={priorityOptions}
        categoryOptions={categoryOptions}
      />

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          customConfig={{
            endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
            requiredFields: {
              fullName: "Full Name",
              email: "Email",
              company: "Company",
              usage: "Usage Type",
            },
            successMessage:
              "Free license request submitted successfully! We will send you the license details within 12 hours.",
          }}
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Support"
        />
      )}

      {/* Partnership Request Modal */}
      {showPartnershipModal && (
        <PartnershipForm
          customConfig={{
            endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT,
            requiredFields: {
              fullName: "Full Name",
              businessEmail: "Business Email",
              companyName: "Company Name",
              partnerType: "Partnership Type",
            },
            successMessage:
              "Partnership request submitted successfully! We will review your application and get back to you soon.",
          }}
          onClose={() => setShowPartnershipModal(false)}
          title="Partnership Request - Support"
        />
      )}

      {/* Toast Notification */}
      {toast && <Toast toast={toast} onClose={hideToast} />}
    </>
  );
};

export default SupportPage;
