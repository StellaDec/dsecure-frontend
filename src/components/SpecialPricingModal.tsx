import React, { useState, memo, useEffect, useRef } from 'react';
import { ARIA_LABELS } from '@/utils/aria-labels';

interface SpecialPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SpecialPricingData) => void;
  productName: string;
  isLoading?: boolean;
}

export interface SpecialPricingData {
  organizationType: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  numberOfLicenses: string;
  additionalInfo: string;
}

const FormInput = memo<{
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  hasError?: boolean;
  required?: boolean;
}>(({ type, name, id, value, onChange, className, placeholder, hasError, required }) => (
  <input
    type={type}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    className={hasError ? className.replace('border-gray-300', 'border-red-500') : className}
    placeholder={placeholder}
    aria-invalid={hasError}
    aria-describedby={hasError ? `${id}-error` : undefined}
    aria-required={required}
  />
));

const FormSelect = memo<{
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  children: React.ReactNode;
  hasError?: boolean;
  required?: boolean;
}>(({ name, id, value, onChange, className, children, hasError, required }) => (
  <select
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    className={hasError ? className.replace('border-gray-300', 'border-red-500') : className}
    aria-invalid={hasError}
    aria-describedby={hasError ? `${id}-error` : undefined}
    aria-required={required}
  >
    {children}
  </select>
));

const FormTextarea = memo<{
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
  placeholder: string;
  rows: number;
}>(({ name, id, value, onChange, className, placeholder, rows }) => (
  <textarea
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    rows={rows}
  />
));

const SpecialPricingModal: React.FC<SpecialPricingModalProps> = memo(({
  isOpen,
  onClose,
  onSubmit,
  productName,
  isLoading = false
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Accessibility: Focus title when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const [formData, setFormData] = useState<SpecialPricingData>({
    organizationType: '',
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    numberOfLicenses: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Partial<SpecialPricingData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SpecialPricingData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SpecialPricingData> = {};
    
    if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactName) newErrors.contactName = 'Contact name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      organizationType: '',
      organizationName: '',
      contactName: '',
      email: '',
      phone: '',
      numberOfLicenses: '',
      additionalInfo: ''
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="special-pricing-title"
      aria-describedby="special-pricing-desc"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 
                id="special-pricing-title"
                ref={titleRef}
                tabIndex={-1}
                className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 focus:outline-none"
              >
                Special Pricing Request
              </h2>
              <p id="special-pricing-desc" className="text-blue-100 text-sm sm:text-base">MSP, Academic Institute & Non-Profit Pricing</p>
            </div>
            <button
              onClick={handleClose}
              aria-label={ARIA_LABELS.CLOSE_MODAL}
              className="text-white hover:text-gray-200 transition-colors p-2"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Special Pricing Available For:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Managed Service Providers (MSPs)</li>
              <li>• Academic Institutions & Educational Organizations</li>
              <li>• Non-Profit Organizations & Charities</li>
              <li>• Government Agencies</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Organization Type */}
            <div>
              <label htmlFor="organizationType" className={labelClass}>
                Organization Type <span className="text-red-500">*</span>
              </label>
              <FormSelect
                name="organizationType"
                id="organizationType"
                value={formData.organizationType}
                onChange={handleInputChange}
                className={inputClass}
                hasError={!!errors.organizationType}
                required={true}
              >
                <option value="">Select Organization Type</option>
                <option value="MSP">Managed Service Provider (MSP)</option>
                <option value="Academic">Academic Institution</option>
                <option value="Non-Profit">Non-Profit Organization</option>
                <option value="Government">Government Agency</option>
                <option value="Other">Other</option>
              </FormSelect>
              {errors.organizationType && (
                <p id="organizationType-error" className="text-red-500 text-sm mt-1">{errors.organizationType}</p>
              )}
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="organizationName" className={labelClass}>
                Organization Name <span className="text-red-500">*</span>
              </label>
              <FormInput
                type="text"
                name="organizationName"
                id="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Enter your organization name"
                hasError={!!errors.organizationName}
                required={true}
              />
              {errors.organizationName && (
                <p id="organizationName-error" className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="contactName" className={labelClass}>
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <FormInput
                  type="text"
                  name="contactName"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your full name"
                  hasError={!!errors.contactName}
                  required={true}
                />
                {errors.contactName && (
                  <p id="contactName-error" className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <FormInput
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="your.email@organization.com"
                  hasError={!!errors.email}
                  required={true}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone and Number of Licenses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <FormInput
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="numberOfLicenses" className={labelClass}>Estimated Number of Licenses</label>
                <FormInput
                  type="text"
                  name="numberOfLicenses"
                  id="numberOfLicenses"
                  value={formData.numberOfLicenses}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., 100, 500, 1000+"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label htmlFor="additionalInfo" className={labelClass}>Additional Information</label>
              <FormTextarea
                name="additionalInfo"
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Please provide any additional details about your requirements, timeline, or specific needs..."
                rows={4}
              />
            </div>

            {/* Product Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Product Interest:</h4>
              <p className="text-gray-700">{productName}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6">
              {/* <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Cancel
              </button> */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default SpecialPricingModal;