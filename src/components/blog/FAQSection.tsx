import React, { useState } from "react";

import { FAQ } from "@/utils/seo.core";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQSectionProps {
  faqs: FAQ[];
}

/**
 * FAQSection Component — SSR-friendly FAQ accordion
 * Answer text hamesha DOM mein present rehta hai (SEO crawlers ke liye),
 * lekin visually collapsed rehta hai CSS max-height:0 se.
 * AnimatePresence hata diya kyunki wo conditional rendering karta tha
 * jisse server HTML mein answers missing ho jaate the.
 */
const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-12 mb-8 px-4 md:px-0">
      <div className="bg-white rounded-none shadow-md border border-[#d0d5dc] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#f4fbf8] border border-[#d0d5dc] flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-[#0a2e1e]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0a2e1e]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-none transition-all duration-300 ${
                  isOpen ? "border-[#0e7c66] bg-[#f4fbf8]" : "border-[#d0d5dc] hover:border-[#0e7c66] hover:bg-[#f4fbf8]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold transition-colors ${isOpen ? "text-[#0a2e1e]" : "text-[#0a2e1e]"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0a2e1e]" : "text-[#5a6672]"}`} 
                  />
                </button>
                
                {/* Answer hamesha DOM mein rehta hai — SSR/SEO ke liye zaroori.
                    CSS max-height se visually collapse/expand hota hai. */}
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                    isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="p-4 pt-0 text-[#5a6672] leading-relaxed prose prose-sm max-w-none">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
