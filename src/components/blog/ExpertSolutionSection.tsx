import React from 'react';

import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Briefcase } from 'lucide-react';

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
            Enterprise-grade data sanitization requires more than just standard deletion. Experts use professional software like <Link to={productLink} className="text-emerald-600 font-bold hover:underline">{productLabel}</Link> to ensure 100% data destruction across all media types.
        </>
    );

    const displayDescription = description || defaultDescription;
    return (
        <div className="mt-16 bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
            <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        Expert Solution
                    </div>
                    
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                        {title}
                    </h2>
                    
                    <div className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {displayDescription}
                    </div>
                    
                    <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Standard Compliance</h4>
                                <p className="text-sm text-slate-500">Meeting <Link to="/products/drive-eraser" className="text-emerald-600 hover:underline font-medium">NIST 800-88</Link> and GDPR standards with full audit trails.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Enterprise Ready</h4>
                                <p className="text-sm text-slate-500">Scalable solutions for ITAD partners and large organizations.</p>
                            </div>
                        </div>
                    </div>
                    
                    <Link 
                        to={ctaLink}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all hover:gap-3 group shadow-lg shadow-emerald-200/50"
                    >
                        {ctaText}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
                
                <div className="relative bg-emerald-600 hidden lg:block overflow-hidden">
                    {/* Decorative Background Patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white rounded-full -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 border-4 border-white rounded-full -ml-48 -mb-48" />
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center">
                            <div className="inline-block p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                                <ShieldCheck className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Securing Data Everywhere</h3>
                            <p className="text-emerald-50 mb-8">Trusted by global enterprises for zero-leakage data sanitization.</p>
                            
                            <div className="flex items-center justify-center gap-4 text-white/60">
                                <div className="text-center px-4">
                                    <div className="text-2xl font-bold text-white">100%</div>
                                    <div className="text-[10px] uppercase font-bold tracking-tighter">Verified</div>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <div className="text-center px-4">
                                    <div className="text-2xl font-bold text-white">0</div>
                                    <div className="text-[10px] uppercase font-bold tracking-tighter">Leaks</div>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <div className="text-center px-4">
                                    <div className="text-2xl font-bold text-white">24/7</div>
                                    <div className="text-[10px] uppercase font-bold tracking-tighter">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
  );
};

export default ExpertSolutionSection;
