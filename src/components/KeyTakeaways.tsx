import React from 'react';
import { KeyTakeawayItem } from '@/types/seo';

interface KeyTakeawaysProps {
  items: KeyTakeawayItem[] | string[];
  title?: string;
  className?: string;
}

/**
 * KeyTakeaways component - Renders an inverted pyramid summary at the top of the page.
 * Uses bullet points and semantic HTML (but avoids H1) for optimal AI parsing.
 */
export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ 
  items, 
  title = "Key Takeaways",
  className = "" 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 my-8 ${className}`}>
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <li key={index} className="flex items-start gap-3 text-slate-700">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                <span className="leading-relaxed">{item}</span>
              </li>
            );
          }
          
          const text = item.text || item.description || item.desc;
          const title = item.title;
          
          return (
            <li key={index} className="flex items-start gap-3 text-slate-700">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
              <span className="leading-relaxed">
                {title ? (
                  <>
                    <strong className="text-slate-900">{title}:</strong> {text}
                  </>
                ) : (
                  text
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
