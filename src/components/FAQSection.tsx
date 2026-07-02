import React, { useState } from 'react';
import { FAQItem } from '@/types/seo';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
  id?: string;
}

const FAQAccordionItem: React.FC<{ faq: FAQItem, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-slate-800 pr-4">
          {faq.question || faq.q}
        </h3>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5">
          <p className="text-slate-600 leading-relaxed">
            {faq.answer || faq.a}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  className = "",
  id
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b pb-4">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
