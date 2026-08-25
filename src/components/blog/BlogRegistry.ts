import { lazy } from 'react';

// Vite trick: Load all components synchronously ONLY during Server-Side Rendering (SSG build)
// This prevents <Suspense> fallbacks in the generated static HTML.
// For the browser, it remains fully lazy loaded for optimal Core Web Vitals.
const blogModules = import.meta.glob('./*.tsx');
const eagerModules = import.meta.env.SSR 
  ? import.meta.glob('./*.tsx', { eager: true, import: 'default' }) 
  : {} as Record<string, any>;

const getBlogComponent = (filename: string) => {
  const path = `./${filename}.tsx`;
  if (import.meta.env.SSR) {
    return eagerModules[path] || (() => null);
  }
  const importFn = blogModules[path];
  if (!importFn) return (() => null) as any;
  return lazy(importFn as any);
};

export const BlogRegistry: Record<string, any> = {
  'automate-data-erasure': lazy(() => import('./AutomatedErasureBlog.tsx')),
  'ccpa-violation': lazy(() => import('./CCPAViolationBlog.tsx')),
  'chromebook-data-risks': lazy(() => import('./ChromebookDataRisksBlog.tsx')),
  'common-criteria': lazy(() => import('./CommonCriteriaBlog.tsx')),
  'cryptographic-erase': lazy(() => import('./CryptographicEraseBlog.tsx')),
  'dban-alternative-ssd-nvme-data-erasure': lazy(() => import('./DBANAlternativeBlog.tsx')),
  'ai-data-center-decommissioning': lazy(() => import('./AIDataCenterDecommissioningBlog.tsx')),
  'local-llm-data-erasure': lazy(() => import('./LocalLLMErasureBlog.tsx')),
  'servicenow-data-erasure-itam-workflow': lazy(() => import('./ServiceNowDataErasureBlog.tsx')),
  'data-erasure-disaster-recovery': lazy(() => import('./DataErasureDisasterRecoveryBlog.tsx')),
  'data-erasure-for-non-profits': lazy(() => import('./DataErasureForNonProfits.tsx')),
  'data-erasure-myths': lazy(() => import('./DataErasureMythsBlog.tsx')),
  'data-hoarding': lazy(() => import('./DataHoardingBlog.tsx')),
  'data-minimization': lazy(() => import('./DataMinimizationBlog.tsx')),
  'data-remanence': lazy(() => import('./DataRemanenceBlog.tsx')),
  'data-remediation-erasure': lazy(() => import('./DataRemediationErasureBlog.tsx')),
  'data-sanitization-compliance': lazy(() => import('./DataSanitizationComplianceBlog.tsx')),
  'degaussing-risks': lazy(() => import('./DegaussingRisksBlog.tsx')),
  'deployment-options': lazy(() => import('./DeploymentOptionsBlog.tsx')),
  'dod-vs-ieee': lazy(() => import('./DoDVsIEEEBlog.tsx')),
  'dod-wiping-standard': lazy(() => import('./DoDWipingStandardBlog.tsx')),
  'dsecure-operations': lazy(() => import('./DSecureOperationsBlog.tsx')),
  'dumpster-diving-data-breach': lazy(() => import('./DumpsterDivingDataBreachBlog.tsx')),
  'education-data-destruction': lazy(() => import('./EducationDataDestructionBlog.tsx')),
  'end-of-life-data-security': lazy(() => import('./EndOfLifeDataSecurityBlog.tsx')),
  'erase-data-pc-laptop-desktop': lazy(() => import('./EraseDataPcLaptopDesktopBlog.tsx')),
  'erasure-as-a-service-dsecure': lazy(() => import('./ErasureAsAServiceDSecureBlog.tsx')),
  'enterprise-data-erasure-compliance-guide': lazy(() => import('./EnterpriseDataErasureComplianceGuideBlog.tsx')),
  'erasure-best-practices': lazy(() => import('./ErasureBestPracticesBlog.tsx')),
  'erasure-verification-process': lazy(() => import('./ErasureVerificationBlog.tsx')),
  'eu-csrd': lazy(() => import('./EUCSRDBlog.tsx')),
  'financial-data-breach-case-study': lazy(() => import('./FinancialDataBreachCaseStudyBlog.tsx')),
  'free-vs-pro-eraser': lazy(() => import('./FreeVsProEraserBlog.tsx')),
  'gdpr-seven-years': lazy(() => import('./GDPRSevenYearsBlog.tsx')),
  'government-device-theft': lazy(() => import('./GovDeviceTheftBlog.tsx')),
  'government-it-disposal': lazy(() => import('./GovernmentITDisposalBlog.tsx')),
  'hardware-diagnostics-itad-compliance': lazy(() => import('./HardwareDiagnosticsITADComplianceBlog.tsx')),
  'healthcare-data-breach-case-study': lazy(() => import('./HealthcareDataBreachCaseStudyBlog.tsx')),
  'healthcare-ransomware-lessons': lazy(() => import('./HealthcareRansomwareLessonsBlog.tsx')),
  'hex-viewer': lazy(() => import('./HexViewerBlog.tsx')),
  'hidden-disk-areas': lazy(() => import('./HiddenDiskAreasBlog.tsx')),
  'hipaa-compliance-erasure': lazy(() => import('./HIPAAComplianceErasureBlog.tsx')),
  'how-to-erasure-mac': lazy(() => import('./HowToEraseMacBlog.tsx')),
  'ieee-2883-2022-data-sanitization': lazy(() => import('./IEEE2883ComplianceBlog.tsx')),
  'it-asset-lifecycle': lazy(() => import('./ITAssetLifecycleBlog.tsx')),
  'it-asset-reuse': lazy(() => import('./ITAssetReuseBlog.tsx')),
  'itad-market-growth': lazy(() => import('./ITADMarketGrowthBlog.tsx')),
  'itad-selection-guide': lazy(() => import('./ITADSelectionGuideBlog.tsx')),
  'itam-disposal-guide': lazy(() => import('./ITAMDisposalGuideBlog.tsx')),
  'legal-ethical-erasure': lazy(() => import('./LegalEthicalErasureBlog.tsx')),
  'loose-drives-erasure-guide': lazy(() => import('./LooseDrivesErasureGuideBlog.tsx')),
  'm1-mac-erasure-issues': lazy(() => import('./M1MacErasureIssuesBlog.tsx')),
  'mdm-detection': lazy(() => import('./MDMDetectionBlog.tsx')),
  'mobile-diagnostics-revolution': lazy(() => import('./MobileDiagnosticsRevolutionBlog.tsx')),
  'mobile-erasure-guide': lazy(() => import('./MobileErasureGuideBlog.tsx')),
  'ncua-guidelines': lazy(() => import('./NCUAGuidelinesBlog.tsx')),
  'nist-clear-purge': lazy(() => import('./NISTClearPurgeBlog.tsx')),
  'nist-tested-erasure-software': lazy(() => import('./NISTTestedErasureSoftwareBlog.tsx')),
  'nist-vs-ieee': lazy(() => import('./NISTVsIEEEBlog.tsx')),
  'onsite-vs-offsite-destruction': lazy(() => import('./OnsiteVsOffsiteDestructionBlog.tsx')),
  'pii-disposal-breach': lazy(() => import('./PIIDisposalBreachBlog.tsx')),
  'private-cloud': lazy(() => import('./PrivateCloudBlog.tsx')),
  'remote-work-data-erasure': lazy(() => import('./RemoteWorkDataErasureBlog.tsx')),
  'returning-leased-it-hardware-dos-and-donts': lazy(() => import('./ReturningLeasedITHardwareDosAndDonts.tsx')),
  'sec-compliance': lazy(() => import('./SECComplianceBlog.tsx')),
  'secure-file-erase': lazy(() => import('./SecureFileEraseBlog.tsx')),
  'secure-it-asset-disposal': lazy(() => import('./SecureITAssetDisposalBlog.tsx')),
  'server-erasure': lazy(() => import('./ServerErasureBlog.tsx')),
  'ssd-wipe-bios': lazy(() => import('./SSDWipeBIOSBlog.tsx')),
  'ultratest-comparison': lazy(() => import('./UltratestComparisonBlog.tsx')),
  'vm-erasure': lazy(() => import('./VMErasureBlog.tsx')),
  'windows-10-eos': lazy(() => import('./Windows10EOSBlog.tsx')),
  'wipe-computer-donating': lazy(() => import('./WipeComputerDonatingBlog.tsx')),
  'world-class-nps': lazy(() => import('./WorldClassNPSBlog.tsx')),
  'zero-trust-disposal': lazy(() => import('./ZeroTrustDisposalBlog.tsx')),
  'physical-destruction-vs-data-wiping': lazy(() => import('./PhysicalDestructionVsWipingBlog.tsx')),
  'chain-of-custody': lazy(() => import('./ChainOfCustodyBlog.tsx')),
  'nist-800-88-rev2-update-2026': lazy(() => import('./NIST80088Rev2UpdateBlog.tsx')),
  'adisa-alignment-itad-data-erasure': lazy(() => import('./ADISACertificationBlog.tsx')),
};

