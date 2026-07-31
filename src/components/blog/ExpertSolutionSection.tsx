import React from 'react';

import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Briefcase } from 'lucide-react';
import { themeClasses, ThemeIconContainer } from '@/components/ui/Theme';

interface ExpertSolutionSectionProps {
    title?: string;
    description?: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
    productLink?: string;
    productLabel?: string;
}

export const ExpertSolutionSection: React.FC<ExpertSolutionSectionProps> = ({
    title = "How Do Experts Handle This?",
    description,
    ctaText = "Get Expert Consultation",
    ctaLink = "/contact",
    productLink = "/products/drive-eraser",
    productLabel = "Drive Eraser"
}) => {
    const defaultDescription = (
        <>
            Enterprise-grade data sanitization requires more than just standard deletion. Experts use professional software like <Link to={productLink} className="text-[#0e7c66] font-bold hover:underline">{productLabel}</Link> to ensure 100% data destruction across all media types.
        </>
    );

    const displayDescription = description || defaultDescription;
    return (
        <div className="mt-16 bg-white rounded-none border border-[#d0d5dc] shadow-sm flex flex-col overflow-hidden lg:flex-row">
            <div className="p-8 lg:p-12 lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4ede4] text-[#0a2e1e] border border-[#0e7c66]/20 text-xs font-bold uppercase tracking-wider mb-6">
                    <ShieldCheck className="w-4 h-4 text-[#0e7c66]" />
                    Expert Solution
                </div>
                
                <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6 leading-tight">
                    {title}
                </h2>
                
                <div className="text-lg text-[#5a6672] mb-8 leading-relaxed">
                    {displayDescription}
                </div>
                
                <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-4">
                        <ThemeIconContainer icon={Zap} size="md" className="mt-1" />
                        <div>
                            <h4 className="font-bold text-[#0a2e1e]">Standard Compliance</h4>
                            <p className="text-sm text-[#5a6672]">Meeting <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">NIST 800-88</Link> and GDPR standards with full audit trails.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <ThemeIconContainer icon={Briefcase} size="md" className="mt-1" />
                        <div>
                            <h4 className="font-bold text-[#0a2e1e]">Enterprise Ready</h4>
                            <p className="text-sm text-[#5a6672]">Scalable solutions for ITAD partners and large organizations.</p>
                        </div>
                    </div>
                </div>
                
                <Link 
                    to={ctaLink}
                    className={themeClasses.button.base + " " + themeClasses.button.primary + " gap-2"}
                >
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
            
            <div className="relative bg-[#0e7c66] p-12 flex flex-col justify-center items-center text-center lg:w-1/2 border-l border-[#0e7c66]/30">
                <div className="inline-block p-6 rounded-full bg-[#d4ede4]/10 border border-[#0e7c66] mb-6">
                    <ShieldCheck className="w-16 h-16 text-[#d4ede4]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Securing Data Everywhere</h3>
                <p className="text-[#d4ede4] mb-8 max-w-sm mx-auto">Trusted by global enterprises for zero-leakage data sanitization.</p>
                
                <div className="flex items-center justify-center gap-6 text-[#d4ede4]">
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-white">100%</div>
                        <div className="text-[10px] uppercase font-bold tracking-tighter">Verified</div>
                    </div>
                    <div className="w-px h-8 bg-[#0e7c66]" />
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-white">0</div>
                        <div className="text-[10px] uppercase font-bold tracking-tighter">Leaks</div>
                    </div>
                    <div className="w-px h-8 bg-[#0e7c66]" />
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-[10px] uppercase font-bold tracking-tighter">Support</div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ExpertSolutionSection;
