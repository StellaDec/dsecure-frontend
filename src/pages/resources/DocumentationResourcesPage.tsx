import React from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import {
  FileText,
  File,
  HardDrive,
  Activity,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  Video,
  MessageSquare,
  Headphones,
} from "lucide-react";
import {
  ThemeSection,
  ThemeSectionHeading,
  ThemeCard,
  ThemeIconContainer,
  themeClasses,
} from "@/components/ui/Theme";

interface QuickStartGuide {
  title: string;
  description: string;
  steps: string[];
  time: string;
  link: string;
  icon: React.ElementType;
}

interface SupportResource {
  resource: string;
  description: string;
  link: string;
  available: string;
  icon: React.ElementType;
}

export default function DocumentationResourcesPage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage("documentation")} />
      <DocumentationResourcesContent />
    </>
  );
}

function DocumentationResourcesContent() {
  // Product Quick Start Guides configuration
  const quickStartGuides: QuickStartGuide[] = [
    {
      title: "D-Secure File Eraser Setup",
      description: "Quick setup guide for D-Secure File Eraser",
      steps: [
        "Download software",
        "Install and configure",
        "Run first erasure",
        "Generate report",
      ],
      time: "5 min",
      link: "/support/help-manual/complete-manual",
      icon: File,
    },
    {
      title: "D-Secure Drive Eraser Setup",
      description: "Quick setup guide for D-Secure Drive Eraser",
      steps: [
        "Download software",
        "Install and configure",
        "Run first erasure",
        "Generate report",
      ],
      time: "5 min",
      link: "/support/help-manual/complete-drive-manual",
      icon: HardDrive,
    },
    {
      title: "D-Secure Drive Diagnostic Setup",
      description: "Quick setup guide for D-Secure Drive Diagnostic",
      steps: [
        "Download software",
        "Install and configure",
        "Run first diagnostic",
        "Generate report",
      ],
      time: "5 min",
      link: "/support/help-manual/complete-diagnostic-manual",
      icon: Activity,
    },
  ];

  // Additional Support Channels configuration
  const supportResources: SupportResource[] = [
    {
      resource: "Knowledge Base",
      description: "Searchable database of common questions and solutions",
      link: "/support",
      available: "24/7",
      icon: HelpCircle,
    },
    {
      resource: "Video Tutorials",
      description: "Step-by-step video guides for common operations",
      link: "/resources/videos",
      available: "On-demand",
      icon: Video,
    },
    {
      resource: "Community Forum",
      description: "Connect with other users and share experiences",
      link: "/community",
      available: "24/7",
      icon: MessageSquare,
    },
    {
      resource: "Technical Support",
      description: "Direct access to our technical support team",
      link: "/contact",
      available: "Business hours",
      icon: Headphones,
    },
  ];

  const primaryBtnClass = `${themeClasses.button.base} ${themeClasses.button.primary}`;
  const outlineBtnClass = `${themeClasses.button.base} ${themeClasses.button.outline}`;

  return (
    <div className="w-full bg-white text-[#0a2e1e] font-sans antialiased">
      {/* 1. Hero Section */}
      <ThemeSection alternate={false} className="pt-12 md:pt-16 pb-12">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="flex justify-center mb-6">
                <ThemeIconContainer icon={BookOpen} size="lg" />
              </div>
            </Reveal>

            <Reveal delayMs={10}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a2e1e] mb-6">
                Technical Documentation
              </h1>
            </Reveal>

            <Reveal delayMs={20}>
              <p className="text-lg md:text-xl text-[#5a6672] mb-8 leading-relaxed max-w-3xl mx-auto">
                Comprehensive technical documentation and user guides to help
                you implement and optimize D-Secure data erasure solutions.
              </p>
            </Reveal>

            <Reveal delayMs={30}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/technical-documentation" className={primaryBtnClass}>
                  Browse Full Specs
                </Link>
                <Link to="/support" className={outlineBtnClass}>
                  Help Center
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection>

      {/* 2. Product Guides Section (Alternate Light Background #f4fbf8) */}
      <ThemeSection alternate={true}>
        <div className="container-responsive">
          <Reveal>
            <ThemeSectionHeading 
              centered={true}
              subtitle="Get up and running quickly with step-by-step product guides and complete manuals."
            >
              Products Guides
            </ThemeSectionHeading>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
            {quickStartGuides.map((guide, idx) => (
              <Reveal key={guide.title} delayMs={idx * 10}>
                <ThemeCard 
                  interactive={true} 
                  className="h-full flex flex-col justify-between p-6 bg-white border border-[#d0d5dc]/60 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <ThemeIconContainer icon={guide.icon} size="md" />
                        <h3 className="text-xl font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors duration-150">
                          {guide.title}
                        </h3>
                      </div>
                      <span className="bg-[#d4ede4] text-[#0e7c66] px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full shrink-0 border border-[#0e7c66]/20">
                        <Clock className="w-3 h-3 inline-block mr-1" />
                        {guide.time}
                      </span>
                    </div>

                    <p className="text-sm text-[#5a6672] mb-6">
                      {guide.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {guide.steps.map((step, stepIndex) => (
                        <div key={`${guide.title}-step-${stepIndex}`} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#0e7c66] mt-0.5 shrink-0" />
                          <span className="text-sm text-[#0a2e1e]">
                            <strong className="font-semibold text-[#0e7c66]">
                              Step {stepIndex + 1}:
                            </strong>{" "}
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={guide.link}
                    className="inline-flex items-center justify-center font-bold text-base min-h-[44px] px-6 py-2.5 rounded-none border-2 border-[#0e7c66] text-[#0e7c66] bg-transparent hover:bg-[#0e7c66] hover:text-white group-hover:bg-[#0e7c66] group-hover:text-white transition-all duration-200 w-full text-center mt-4 justify-center"
                  >
                    Start Guide <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </ThemeCard>
              </Reveal>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* 3. Support Resources Section (Commented Out) */}
      {/* <ThemeSection alternate={false}>
        <div className="container-responsive">
          <Reveal>
            <ThemeSectionHeading subtitle="Access additional resources and support channels to ensure seamless implementation.">
              Additional Support Resources
            </ThemeSectionHeading>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {supportResources.map((item, idx) => (
              <Reveal key={item.resource} delayMs={idx * 10}>
                <ThemeCard className="p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <ThemeIconContainer icon={item.icon} size="lg" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-[#0a2e1e]">
                          {item.resource}
                        </h3>
                        <span className="text-xs font-semibold text-[#0e7c66] bg-[#d4ede4] px-2.5 py-0.5 rounded-none">
                          {item.available}
                        </span>
                      </div>
                      <p className="text-sm text-[#5a6672] mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#d0d5dc]/40 flex justify-end">
                    <Link
                      to={item.link}
                      className="inline-flex items-center text-sm font-bold text-[#0e7c66] hover:text-[#0a6c58] transition-colors"
                    >
                      Access Resource <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </ThemeCard>
              </Reveal>
            ))}
          </div>
        </div>
      </ThemeSection> */}

      {/* 4. CTA Section */}
      <ThemeSection alternate={true} className="py-16">
        <div className="container-responsive max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-[#0a2e1e] text-white p-8 md:p-12 text-center rounded-none border border-[#0e7c66]">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Need Technical Assistance?
              </h2>
              <p className="text-base md:text-lg mb-8 text-[#d0d5dc] max-w-2xl mx-auto">
                Our certified security engineers are available to assist with custom deployment architecture and regulatory compliance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#0e7c66] hover:bg-[#0a6c58] text-white font-semibold rounded-none transition-colors inline-flex items-center"
                >
                  Contact Technical Support <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/resources"
                  className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-none hover:bg-white/10 transition-colors"
                >
                  View All Resources
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </ThemeSection>
    </div>
  );
}
