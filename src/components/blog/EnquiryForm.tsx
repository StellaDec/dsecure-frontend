import React, { useState, useRef, useEffect } from 'react';
import { Check } from "lucide-react";
import './BlogComponents.css';


interface EnquiryFormProps {
  blogId: string;
  blogTitle: string;
}

const CustomSelect = ({ 
  name, 
  value, 
  onChange, 
  options, 
  placeholder, 
  error 
}: { 
  name: string, 
  value: string, 
  onChange: (e: { target: { name: string; value: string } }) => void, 
  options: {value: string, label: string}[], 
  placeholder: string, 
  error?: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={selectRef}>
      <div 
        className={`w-full p-3 bg-white border ${error ? 'border-red-500' : 'border-[#d0d5dc]'} rounded-none text-[#0a2e1e] cursor-pointer flex justify-between items-center ${isOpen ? 'border-[#0e7c66] ring-1 ring-[#0e7c66]' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-[#0a2e1e]" : "text-[#94a3b8]"}>{selectedLabel}</span>
        <Check className="w-6 h-6" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#0e7c66] shadow-lg max-h-60 overflow-y-auto rounded-none">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`p-3 cursor-pointer transition-colors ${value === opt.value ? 'bg-[#0e7c66] text-white' : 'hover:bg-[#d4ede4] hover:text-white text-white'}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EnquiryForm: React.FC<EnquiryFormProps> = ({ blogId, blogTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // FormSubmit endpoint
  const FORMSUBMIT_ENDPOINT = import.meta.env.VITE_FORMSUBMIT_ENDPOINT;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Business Type is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
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

      // FormSubmit ke liye FormData taiyar karein
      const formSubmitData = new FormData();
      formSubmitData.append(
        "_webhook",
        `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
      );
      // Auto-reply aur webhook metadata fields - backend customer ko confirmation email bhejega
      formSubmitData.append("_webhookContentType", "application/json");
      formSubmitData.append("_webhookExtraData", "true");
      formSubmitData.append("sendAutoReply", "true");
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");
      formSubmitData.append("_replyto", formData.email.trim());
      formSubmitData.append("customer_email", formData.email.trim());
      formSubmitData.append(
        "_subject",
        `Blog Enquiry: ${blogTitle} - D-Secure Tech`,
      );
      formSubmitData.append(
        "_cc",
        import.meta.env.VITE_FORM_CC_EMAILS,
      );

      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("phone", formData.phone?.trim() || "");
      formSubmitData.append("country", formData.country?.trim() || "");
      formSubmitData.append("businessType", formData.businessType?.trim() || "");
      formSubmitData.append("message", formData.message.trim());
      formSubmitData.append("blogId", blogId);
      formSubmitData.append("blogTitle", blogTitle);
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", `Blog Enquiry - ${blogTitle}`);

      // Backend Database API ke liye submission data
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: "",
        phone: formData.phone?.trim() || "",
        country: formData.country?.trim() || "",
        businessType: formData.businessType?.trim() || "",
        solutionType: "Blog Enquiry",
        complianceRequirements: "",
        message: formData.message.trim(),
        usageType: "",
        blogId: blogId,
        blogTitle: blogTitle,
        source: `Blog Enquiry - ${blogTitle}`,
        timestamp: timestampISO,
      };

      // Backend API aur FormSubmit dono par submit karein
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const [apiResponse, formSubmitResponse] = await Promise.allSettled([
        fetch(
          `${API_BASE}/api/ContactFormSubmissions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          },
        ),
        fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          body: formSubmitData,
          headers: {
            Accept: "application/json",
          },
        }),
      ]);

      // Microsoft Excel + Teams tracking (non-blocking)
      if (import.meta.env.VITE_POWER_AUTOMATE_HTTP_URL) {
        fetch(import.meta.env.VITE_POWER_AUTOMATE_HTTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_POWER_AUTOMATE_API_KEY || "",
          },
          body: JSON.stringify(submissionData),
        }).catch(() => {});
      }

      const isFormSubmitOk =
        formSubmitResponse.status === "fulfilled" && formSubmitResponse.value.ok;
      const isApiOk =
        apiResponse.status === "fulfilled" && apiResponse.value.ok;

      // Agar dono fail ho tabhi error throw karein
      if (!isFormSubmitOk && !isApiOk) {
        throw new Error("Failed to send enquiry. Please try again.");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", country: "", businessType: "", message: "" });
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      const message = error instanceof Error ? error.message : "Failed to send enquiry. Please try again.";
      setSubmitError(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#0e7c66] p-8 mt-16 mb-8 rounded-none text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <Check className="w-6 h-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-[#d4ede4] mb-8">Your enquiry has been submitted successfully. We'll get back to you soon.</p>
          <button 
            className="bg-transparent border border-[#0e7c66] text-white hover:bg-[#0e7c66]/20 font-bold py-3 px-6 rounded-none transition-colors"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e7c66] p-8 mt-16 mb-8 rounded-none">
      <h3 className="text-2xl font-bold text-white mb-2">Have Questions About This Topic?</h3>
      <p className="text-[#d4ede4] mb-6">Send us an enquiry regarding: <strong className="text-[#0e7c66]">{blogTitle}</strong></p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-[#d4ede4]">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full p-3 bg-white border ${errors.name ? 'border-red-500' : 'border-[#d0d5dc]'} rounded-none text-[#0a2e1e] focus:outline-none focus:border-[#0e7c66]`}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[#d4ede4]">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full p-3 bg-white border ${errors.email ? 'border-red-500' : 'border-[#d0d5dc]'} rounded-none text-[#0a2e1e] focus:outline-none focus:border-[#0e7c66]`}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-[#d4ede4]">Phone (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full p-3 bg-white border border-[#d0d5dc] rounded-none text-[#0a2e1e] focus:outline-none focus:border-[#0e7c66]"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country" className="text-sm font-medium text-[#d4ede4]">Country *</label>
            <CustomSelect
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Select Country"
              error={errors.country}
              options={[
                { value: "United States", label: "United States" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "Canada", label: "Canada" },
                { value: "Australia", label: "Australia" },
                { value: "India", label: "India" },
                { value: "Other", label: "Other" }
              ]}
            />
            {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="businessType" className="text-sm font-medium text-[#d4ede4]">Business Type *</label>
          <CustomSelect
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            placeholder="Select Business Type"
            error={errors.businessType}
            options={[
              { value: "Enterprise", label: "Enterprise" },
              { value: "SMB", label: "SMB" },
              { value: "ITAD / Recycler", label: "ITAD / Recycler" },
              { value: "Government / Public Sector", label: "Government / Public Sector" },
              { value: "Individual / Home", label: "Individual / Home" },
              { value: "Other", label: "Other" }
            ]}
          />
          {errors.businessType && <span className="text-xs text-red-500">{errors.businessType}</span>}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-[#d4ede4]">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your question or enquiry..."
            rows={4}
            className={`w-full p-3 bg-white border ${errors.message ? 'border-red-500' : 'border-[#d0d5dc]'} rounded-none text-[#0a2e1e] focus:outline-none focus:border-[#0e7c66] resize-y`}
          />
          {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
        </div>
        
        {submitError && (
          <div className="error-message" style={{ color: '#dc2626', padding: '12px', background: '#fef2f2', borderRadius: '8px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}
        
        <button 
          type="submit" 
          className="mt-4 bg-[#0e7c66] hover:bg-[#0b6251] text-white font-bold py-3 px-6 rounded-none transition-colors flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
