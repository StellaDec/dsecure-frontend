import { useState } from 'react';
import { showToast } from '@/utils/toast';

// Form submission ke liye configuration interface
export interface FormSubmissionConfig {
  endpoint?: string;
  // Array ya Object dono format ko allow karein taaki runtime type crash na ho
  requiredFields?: string[] | Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
  resetFormAfterSubmit?: boolean;
  customValidation?: (data: Record<string, unknown>) => string | null;
  transformData?: (data: Record<string, unknown>) => Record<string, unknown>;
  onSuccess?: (data: Record<string, unknown>) => void;
  onError?: (error: Error) => void;
  redirectAfterSuccess?: string;
}

export interface UseFormSubmissionResult {
  isSubmitting: boolean;
  submitForm: (formData: Record<string, unknown> | object) => Promise<void>;
  resetForm: () => void;
}

// FormSubmit ka default endpoint
const DEFAULT_FORMSUBMIT_ENDPOINT =
  import.meta.env.VITE_FORMSUBMIT_ENDPOINT;

/**
 * Reusable form submission hook jo FormSubmit aur Backend API dono ko handle karta hai
 * @param config Form submission ki configuration
 * @param resetFormCallback Form reset karne ke liye optional callback
 */
export const useFormSubmission = (
  config: FormSubmissionConfig,
  resetFormCallback?: () => void,
): UseFormSubmissionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data ko validate karne ka helper function
  const validateForm = (data: Record<string, unknown>): string | null => {
    // Required fields ko normalize karein - chahe Array ho ya Object dictionary
    const requiredFieldList: string[] = Array.isArray(config.requiredFields)
      ? config.requiredFields
      : config.requiredFields && typeof config.requiredFields === "object"
        ? Object.keys(config.requiredFields)
        : [];

    for (const field of requiredFieldList) {
      const value = data[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        const fieldName =
          config.requiredFields &&
          typeof config.requiredFields === "object" &&
          !Array.isArray(config.requiredFields) &&
          config.requiredFields[field]
            ? config.requiredFields[field]
            : field.replace(/([A-Z])/g, " $1").toLowerCase();
        return `Please fill in the ${fieldName} field.`;
      }
    }

    // Email validation
    if (data.email && typeof data.email === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    // Phone validation
    if (data.phone && typeof data.phone === "string") {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
        return "Please enter a valid phone number.";
      }
    }

    // Custom validation agar provide kiya gaya ho
    if (config.customValidation) {
      return config.customValidation(data);
    }

    return null;
  };

  // FormSubmit ke liye FormData prepare karein
  const prepareFormData = (data: Record<string, unknown>): FormData => {
    const formSubmitData = new FormData();

    // Data transformer apply karein agar provide kiya gaya ho
    const transformedData = config.transformData
      ? config.transformData(data)
      : data;

    // Sabhi form fields append karein
    Object.entries(transformedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formSubmitData.append(key, String(value));
      }
    });

    // FormSubmit ki standard configuration
    formSubmitData.append("_next", window.location.href);
    formSubmitData.append("_captcha", "false");
    formSubmitData.append("_template", "table");
    if (!formSubmitData.has("_subject")) {
      formSubmitData.append(
        "_subject",
        `New Form Submission from ${document.title} - D-Secure Tech`,
      );
    }

    // Backend Webhook aur Auto-Reply flags
    formSubmitData.append(
      "_webhook",
      `${import.meta.env.VITE_API_BASE_URL}/api/formsubmit/webhook`,
    );
    formSubmitData.append("_webhookContentType", "application/json");
    formSubmitData.append("_webhookExtraData", "true");
    formSubmitData.append("sendAutoReply", "true");

    // Reply-to aur customer email set karein
    const userEmail = data.email || data.businessEmail;
    if (userEmail) {
      formSubmitData.append("_replyto", String(userEmail));
      formSubmitData.append("customer_email", String(userEmail));
    }

    formSubmitData.append(
      "_cc",
      import.meta.env.VITE_FORM_CC_EMAILS,
    );
    formSubmitData.append("_bcc", "");

    // Tracking metadata
    formSubmitData.append("timestamp", new Date().toISOString());
    formSubmitData.append("userAgent", navigator.userAgent);
    formSubmitData.append("referrer", document.referrer || "Direct");
    formSubmitData.append("currentURL", window.location.href);

    return formSubmitData;
  };

  // Form submit karne ka mukhya function
  const submitForm = async (formData: Record<string, unknown> | object): Promise<void> => {
    const data = formData as Record<string, unknown>;
    const validationError = validateForm(data);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const formSubmitData = prepareFormData(data);
      const endpoint = config.endpoint || DEFAULT_FORMSUBMIT_ENDPOINT;

      const userEmail = data.email || data.businessEmail;
      // Backend Database API ke liye structured data
      const submissionData = {
        name: String(data.fullName || data.name || data.contactName || "Anonymous Visitor"),
        email: String(userEmail || ""),
        company: String(data.company || data.companyName || data.organization || data.organizationName || ""),
        phone: String(data.phone || data.phoneNo || ""),
        country: String(data.country || ""),
        businessType: String(data.businessType || data.organizationType || ""),
        solutionType: String(data.eraseOption || data.partnerType || data.formType || "Online Form"),
        complianceRequirements: String(data.compliance || data.complianceRequirements || ""),
        message: String(
          data.requirements ||
          data.businessDescription ||
          data.additionalInfo ||
          data.message ||
          "Automated request submission"
        ),
        usageType: String(data.usage || ""),
        source: document.title,
        timestamp: new Date().toISOString(),
      };

      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      // Backend Database API aur FormSubmit dono ko parallel bhein
      const [apiResult, formSubmitResult] = await Promise.allSettled([
        fetch(`${API_BASE}/api/ContactFormSubmissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }),
        fetch(endpoint, {
          method: "POST",
          body: formSubmitData,
          headers: { Accept: "application/json" },
        }),
      ]);

      const isFormSubmitOk =
        formSubmitResult.status === "fulfilled" && formSubmitResult.value.ok;
      const isApiOk =
        apiResult.status === "fulfilled" && apiResult.value.ok;

      // Agar dono request fail ho jayein tabhi user ko error throw karein
      if (!isFormSubmitOk && !isApiOk) {
        throw new Error("Form submission failed");
      }

      // Power Automate tracking (non-blocking)
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

      const successMessage =
        config.successMessage ||
        "Your message has been sent successfully! Our team will get back to you within 24 hours.";

      showToast(successMessage, "success");

      // Agar configure ho toh form reset karein
      if (config.resetFormAfterSubmit !== false && resetFormCallback) {
        resetFormCallback();
      }

      // Agar redirect URL ho toh redirect karein
      if (config.redirectAfterSuccess) {
        setTimeout(() => {
          window.location.href = config.redirectAfterSuccess!;
        }, 2000);
      }

      // Success callback call karein
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage =
        config.errorMessage ||
        "Failed to send message. Please try again later.";

      showToast(errorMessage, "error");

      // Error callback call karein
      if (config.onError) {
        config.onError(error as Error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (resetFormCallback) {
      resetFormCallback();
    }
  };

  return {
    isSubmitting,
    submitForm,
    resetForm,
  };
};

// Utility function for common form data transformations
export const formDataTransformers = {
  // Combine country code and phone number
  combinePhoneNumber: (data: Record<string, unknown>) => ({
    ...data,
    phone: data.countryCode && data.phone ? `${data.countryCode} ${data.phone}` : data.phone
  }),

  // Add timestamp
  addTimestamp: (data: Record<string, unknown>) => ({
    ...data,
    timestamp: new Date().toISOString(),
    submissionDate: new Date().toLocaleString()
  }),

  // Clean empty fields
  removeEmptyFields: (data: Record<string, unknown>) => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });
    return cleaned;
  }
};

// Pre-configured form submission configs for common use cases
export const formConfigs = {
  // Contact form configuration
  contact: {
    requiredFields: ['name', 'email', 'message'],
    successMessage: 'Your query has been sent successfully! Our sales and tech team will resolve your query within 12 hours.',
    transformData: (data: Record<string, unknown>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.combinePhoneNumber(
          formDataTransformers.removeEmptyFields(data)
        )
      )
  },

  // Partnership form configuration
  partnership: {
    requiredFields: ['fullName', 'businessEmail', 'companyName', 'partnerType'],
    successMessage: 'Partner application submitted successfully! We will contact you soon.',
    transformData: (data: Record<string, unknown>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.removeEmptyFields(data)
      )
  },

  // License request form configuration
  license: {
    requiredFields: ['fullName', 'email', 'company', 'usage'],
    successMessage: 'Free license request submitted successfully! We will send you the license details soon.',
    transformData: (data: Record<string, unknown>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.removeEmptyFields(data)
      )
  },

  // Newsletter subscription
  newsletter: {
    requiredFields: ['email'],
    successMessage: 'Successfully subscribed to our newsletter!',
    resetFormAfterSubmit: true
  },

  // Support ticket
  support: {
    requiredFields: ['name', 'email', 'subject', 'description'],
    successMessage: 'Support ticket created successfully! We will respond within 24 hours.',
    transformData: (data: Record<string, unknown>) => ({
      ...formDataTransformers.addTimestamp(data),
      priority: data.priority || 'normal',
      category: data.category || 'general'
    })
  }
};

export default useFormSubmission;
