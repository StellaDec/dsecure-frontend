import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Globe,
  Cpu,
  FileSignature,
  LayoutDashboard,
  HardDrive,
  Database,
  Server,
  Layers,
  Zap,
  WifiOff,
  Workflow,
} from "lucide-react";
import {
  ThemeCard,
  ThemeIconContainer,
  ThemeSection,
  ThemeSectionHeading,
  themeClasses,
} from "@/components/ui/Theme";

/**
 * TechnicalDocumentation Component
 * 
 * D-Secure Design System (Theme.tsx) ke dwara nirdeshit sabhi rules ko follow karta hai:
 * 1. Cards -> Flat borders (rounded-none, border-[#d0d5dc]/60).
 * 2. Icon Containers -> Circular containers (rounded-full bg-[#d4ede4] with text-[#0e7c66]).
 * 3. Color Palette -> Primary #0e7c66, Dark #0a2e1e, Muted #5a6672, Alternate BG #f4fbf8.
 * 4. Icons -> Shuddh roop se Lucide React icons ka upayog.
 */
const TechnicalDocumentation: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("technical-documentation")} />

      <div className="min-h-screen bg-white text-[#0a2e1e]">
        {/* 1. Hero Section - Design System White Background */}
        <ThemeSection alternate={false} className="pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                {/* Circular Icon Container */}
                <div className="flex justify-center mb-6">
                  <ThemeIconContainer icon={ShieldCheck} size="lg" />
                </div>

                {/* Section Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
                  D-Secure <span className="text-[#0e7c66]">Technical Documentation</span>
                </h1>
                
                {/* Subtitle Text */}
                <p className="text-lg sm:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
                  Comprehensive Implementation & Optimization Guide for Secure Data Erasure Solutions
                </p>
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 2. Regulated Data Erasure Section (Alternate Light Background #f4fbf8) */}
        <ThemeSection alternate={true}>
          <div className="container-responsive">
            <Reveal>
              <ThemeSectionHeading
                subtitle="In today's digital world, standard deletion leaves residual data. Regulated data erasure ensures verifiable sanitization meeting global compliance standards."
              >
                The Need for Regulated Data Erasure
              </ThemeSectionHeading>

              {/* Grid of Flat Theme Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: ShieldAlert,
                    title: "Risk Mitigation",
                    desc: "Prevent data breaches and unauthorized access to residual data on retired assets.",
                  },
                  {
                    icon: FileCheck,
                    title: "Regulatory Compliance",
                    desc: "Meet strict requirements from GDPR, HIPAA, NIST 800-88, and global protection acts.",
                  },
                  {
                    icon: Globe,
                    title: "Environmental Responsibility",
                    desc: "Enable secure IT asset disposition (ITAD) and support sustainable circular economy practices.",
                  },
                ].map((item, index) => (
                  <ThemeCard key={index} interactive={true}>
                    <div className="mb-4">
                      <ThemeIconContainer icon={item.icon} size="md" />
                    </div>
                    <h3 className={themeClasses.typography.cardTitle}>{item.title}</h3>
                    <p className={themeClasses.typography.cardBody}>{item.desc}</p>
                  </ThemeCard>
                ))}
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 3. Core Components Section (White Background) */}
        <ThemeSection alternate={false}>
          <div className="container-responsive">
            <Reveal>
              <ThemeSectionHeading
                subtitle="D-Secure is built on a modular architecture ensuring seamless flexibility and enterprise scalability across diverse hardware environments."
              >
                Core Components of D-Secure Solution
              </ThemeSectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: Cpu,
                    title: "Erasure Engine",
                    desc: "Proprietary algorithm for complete, verifiable data destruction across all storage media types.",
                  },
                  {
                    icon: FileSignature,
                    title: "Verification Module",
                    desc: "Generates tamper-proof, cryptographically signed auditable reports for every erasure operation.",
                  },
                  {
                    icon: LayoutDashboard,
                    title: "Central Management Console",
                    desc: "Unified dashboard for deploying, monitoring, and managing erasure tasks remotely.",
                  },
                ].map((item, index) => (
                  <ThemeCard key={index} interactive={true}>
                    <div className="mb-4">
                      <ThemeIconContainer icon={item.icon} size="md" />
                    </div>
                    <h3 className={themeClasses.typography.cardTitle}>{item.title}</h3>
                    <p className={themeClasses.typography.cardBody}>{item.desc}</p>
                  </ThemeCard>
                ))}
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 4. Implementation Roadmap (Alternate Light Background #f4fbf8) */}
        <ThemeSection alternate={true}>
          <div className="container-responsive">
            <Reveal>
              <ThemeSectionHeading
                subtitle="The D-Secure implementation process follows a structured four-phase roadmap for efficient deployment."
              >
                Implementation Roadmap: Phased Approach
              </ThemeSectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    phase: "Assessment",
                    desc: "Identify target assets, storage types, and erasure standards (DoD, NIST 800-88, IEEE 2883).",
                  },
                  {
                    step: "02",
                    phase: "Setup & Configuration",
                    desc: "Configure Central Management Console, define RBAC user roles, and setup network policies.",
                  },
                  {
                    step: "03",
                    phase: "Pilot Deployment",
                    desc: "Execute erasure on a controlled batch of assets to validate processes and report generation.",
                  },
                  {
                    step: "04",
                    phase: "Full Rollout",
                    desc: "Scale across enterprise infrastructure and integrate with active ITAD workflows.",
                  },
                ].map((item, index) => (
                  <ThemeCard key={index} interactive={true}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-full bg-[#d4ede4] text-[#0e7c66] font-bold flex items-center justify-center text-base">
                        {item.step}
                      </span>
                    </div>
                    <h3 className={themeClasses.typography.cardTitle}>{item.phase}</h3>
                    <p className={themeClasses.typography.cardBody}>{item.desc}</p>
                  </ThemeCard>
                ))}
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 5. Supported Storage Media (White Background) */}
        <ThemeSection alternate={false}>
          <div className="container-responsive">
            <Reveal>
              <ThemeSectionHeading
                subtitle="Comprehensive support for standard and legacy enterprise storage media interfaces."
              >
                Supported Storage Media
              </ThemeSectionHeading>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: HardDrive,
                    title: "HDDs",
                    desc: "Full support for SATA, SAS, IDE, and SCSI mechanical drives with multi-pass overwriting.",
                  },
                  {
                    icon: Database,
                    title: "SSDs",
                    desc: "Native commands for NAND flash erasure including ATA Secure Erase, TRIM, and Sanitize.",
                  },
                  {
                    icon: Server,
                    title: "NVMe Drives",
                    desc: "High-speed NVMe controller command execution for PCIe enterprise solid state storage.",
                  },
                  {
                    icon: Layers,
                    title: "LUNs & Virtual Storage",
                    desc: "Targeted logical unit number erasure for active SAN/NAS and virtualized environments.",
                  },
                ].map((item, index) => (
                  <ThemeCard key={index} interactive={true}>
                    <div className="mb-4">
                      <ThemeIconContainer icon={item.icon} size="md" />
                    </div>
                    <h3 className={themeClasses.typography.cardTitle}>{item.title}</h3>
                    <p className={themeClasses.typography.cardBody}>{item.desc}</p>
                  </ThemeCard>
                ))}
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 6. Optimization & Compliance (Alternate Light Background #f4fbf8) */}
        <ThemeSection alternate={true}>
          <div className="container-responsive">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Performance Optimization Card */}
                <ThemeCard interactive={false}>
                  <div className="mb-4">
                    <ThemeIconContainer icon={Zap} size="md" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">
                    Optimizing Performance & Throughput
                  </h3>
                  <ul className="space-y-3 text-[#5a6672]">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66] mt-2 flex-shrink-0" />
                      <span>Group identical media types for batch erasure tasks to maximize hardware utilization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66] mt-2 flex-shrink-0" />
                      <span>Deploy dedicated gigabit network links for uninterrupted audit log synchronization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66] mt-2 flex-shrink-0" />
                      <span>Ensure erasure host systems maintain sufficient multi-core CPU and RAM allocations.</span>
                    </li>
                  </ul>
                </ThemeCard>

                {/* Audit & Compliance Reporting Card */}
                <ThemeCard interactive={false}>
                  <div className="mb-4">
                    <ThemeIconContainer icon={FileCheck} size="md" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">
                    Audit & Compliance Certification
                  </h3>
                  <p className="text-[#5a6672] leading-relaxed mb-4">
                    D-Secure's Verification Module generates tamper-proof PDF & XML reports embedded with:
                  </p>
                  <ul className="space-y-2 text-[#5a6672]">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66]" />
                      <span>Hardware Serial Numbers & Drive Metadata</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66]" />
                      <span>Erasure Standard Used (NIST 800-88 / DoD 5220.22-M)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0e7c66]" />
                      <span>Operator ID, Timestamps & Cryptographic Hash</span>
                    </li>
                  </ul>
                </ThemeCard>
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 7. Troubleshooting & ITAD Integration (White Background) */}
        <ThemeSection alternate={false}>
          <div className="container-responsive">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Troubleshooting Card */}
                <ThemeCard interactive={false}>
                  <div className="mb-4">
                    <ThemeIconContainer icon={WifiOff} size="md" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">
                    Troubleshooting Common Issues
                  </h3>
                  <div className="space-y-4 text-[#5a6672]">
                    <div>
                      <h4 className="font-bold text-[#0a2e1e]">Connectivity Errors</h4>
                      <p className="text-sm">Verify firewall rules and active port communications with the Central Console.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0a2e1e]">Media Detection Failures</h4>
                      <p className="text-sm">Inspect UEFI/BIOS SATA modes (AHCI vs RAID) and update D-Secure boot ISO media.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0a2e1e]">Slow Erasure Speeds</h4>
                      <p className="text-sm">Ensure controller bandwidth is unthrottled and check drive S.M.A.R.T. health status.</p>
                    </div>
                  </div>
                </ThemeCard>

                {/* Workflow Integration Card */}
                <ThemeCard interactive={false}>
                  <div className="mb-4">
                    <ThemeIconContainer icon={Workflow} size="md" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2e1e] mb-4">
                    ITAD & ERP Workflow Integration
                  </h3>
                  <p className="text-[#5a6672] leading-relaxed mb-4">
                    D-Secure offers RESTful APIs and webhook integrations for IT Asset Disposition (ITAD) platforms, enabling automatic serial number matching and automated certificate uploads to ServiceNow or custom asset systems.
                  </p>
                </ThemeCard>
              </div>
            </Reveal>
          </div>
        </ThemeSection>

        {/* 8. Call To Action Section (Dark Primary Background #0a2e1e) */}
        <ThemeSection alternate={false} className="bg-[#0e7c66] text-white py-16">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Implement Enterprise Data Erasure?
                </h2>
                <p className="text-lg text-[#d4ede4] mb-8 max-w-2xl mx-auto">
                  Access our technical documentation, download deployment guides, or connect with our specialized support engineers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/support" className={themeClasses.button.primary}>
                    Contact Support
                  </a>
                  <a href="/resources" className={`${themeClasses.button.outline} text-white border-white hover:bg-white/10`}>
                    View Resources
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </ThemeSection>
      </div>
    </>
  );
};

export default TechnicalDocumentation;
