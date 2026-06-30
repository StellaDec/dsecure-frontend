import React from 'react';
import { FAQItem } from '@/types/seo';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
  id?: string;
}

/**
 * FAQSection component - Renders FAQs using a simple semantic list (H2 for title, H3 for questions, p for answers)
 * This structure is highly optimized for AI Engines (AEO/GEO) and traditional SEO.
 * It avoids using display:none or unsemantic accordions.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  className = "",
  id
}) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b pb-4">
          {title}
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {faq.question || faq.q}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {faq.answer || faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
