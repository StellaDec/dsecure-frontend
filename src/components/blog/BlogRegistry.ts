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
  '250tb-data-erasure-results': lazy(() => import('./DataErasure250TBBlog')),
  'automate-data-erasure': lazy(() => import('./AutomatedErasureBlog')),
  'ccpa-violation': lazy(() => import('./CCPAViolationBlog')),
  'chromebook-data-risks': lazy(() => import('./ChromebookDataRisksBlog')),
  'common-criteria': lazy(() => import('./CommonCriteriaBlog')),
  'cryptographic-erase': lazy(() => import('./CryptographicEraseBlog')),
  'dban-alternative-ssd-nvme-data-erasure': lazy(() => import('./DBANAlternativeBlog')),
  'ai-data-center-decommissioning': lazy(() => import('./AIDataCenterDecommissioningBlog')),
  'local-llm-data-erasure': lazy(() => import('./LocalLLMErasureBlog')),
  'servicenow-data-erasure-itam-workflow': lazy(() => import('./ServiceNowDataErasureBlog')),
  'data-erasure-disaster-recovery': lazy(() => import('./DataErasureDisasterRecoveryBlog')),
  'data-erasure-for-non-profits': lazy(() => import('./DataErasureForNonProfits')),
  'data-erasure-myths': lazy(() => import('./DataErasureMythsBlog')),
  'data-hoarding': lazy(() => import('./DataHoardingBlog')),
  'data-minimization': lazy(() => import('./DataMinimizationBlog')),
  'data-remanence': lazy(() => import('./DataRemanenceBlog')),
  'data-remediation-erasure': lazy(() => import('./DataRemediationErasureBlog')),
  'data-sanitization-compliance': lazy(() => import('./DataSanitizationComplianceBlog')),
  'degaussing-risks': lazy(() => import('./DegaussingRisksBlog')),
  'deployment-options': lazy(() => import('./DeploymentOptionsBlog')),
  'dod-vs-ieee': lazy(() => import('./DoDVsIEEEBlog')),
  'dod-wiping-standard': lazy(() => import('./DoDWipingStandardBlog')),
  'dsecure-operations': lazy(() => import('./DSecureOperationsBlog')),
  'dumpster-diving-data-breach': lazy(() => import('./DumpsterDivingDataBreachBlog')),
  'education-data-destruction': lazy(() => import('./EducationDataDestructionBlog')),
  'end-of-life-data-security': lazy(() => import('./EndOfLifeDataSecurityBlog')),
  'erase-data-pc-laptop-desktop': lazy(() => import('./EraseDataPcLaptopDesktopBlog')),
  'erasure-as-a-service-dsecure': lazy(() => import('./ErasureAsAServiceDSecureBlog')),
  'enterprise-data-erasure-compliance-guide': lazy(() => import('./EnterpriseDataErasureComplianceGuideBlog')),
  'erasure-best-practices': lazy(() => import('./ErasureBestPracticesBlog')),
  'erasure-verification-process': lazy(() => import('./ErasureVerificationBlog')),
  'eu-csrd': lazy(() => import('./EUCSRDBlog')),
  'financial-data-breach-case-study': lazy(() => import('./FinancialDataBreachCaseStudyBlog')),
  'forensic-preservation-vs-secure-erasure-data-breach': lazy(() => import('./ForensicPreservationBlog')),
  'free-vs-pro-eraser': lazy(() => import('./FreeVsProEraserBlog')),
  'gdpr-seven-years': lazy(() => import('./GDPRSevenYearsBlog')),
  'government-device-theft': lazy(() => import('./GovDeviceTheftBlog')),
  'government-it-disposal': lazy(() => import('./GovernmentITDisposalBlog')),
  'hardware-diagnostics-itad-compliance': lazy(() => import('./HardwareDiagnosticsITADComplianceBlog')),
  'healthcare-data-breach-case-study': lazy(() => import('./HealthcareDataBreachCaseStudyBlog')),
  'healthcare-ransomware-lessons': lazy(() => import('./HealthcareRansomwareLessonsBlog')),
  'hex-viewer': lazy(() => import('./HexViewerBlog')),
  'hidden-disk-areas': lazy(() => import('./HiddenDiskAreasBlog')),
  'hipaa-compliance-erasure': lazy(() => import('./HIPAAComplianceErasureBlog')),
  'how-to-erasure-mac': lazy(() => import('./HowToEraseMacBlog')),
  'ieee-2883-2022-data-sanitization': lazy(() => import('./IEEE2883ComplianceBlog')),
  'it-asset-lifecycle': lazy(() => import('./ITAssetLifecycleBlog')),
  'it-asset-reuse': lazy(() => import('./ITAssetReuseBlog')),
  'itad-market-growth': lazy(() => import('./ITADMarketGrowthBlog')),
  'itad-selection-guide': lazy(() => import('./ITADSelectionGuideBlog')),
  'itam-disposal-guide': lazy(() => import('./ITAMDisposalGuideBlog')),
  'legal-ethical-erasure': lazy(() => import('./LegalEthicalErasureBlog')),
  'loose-drives-erasure-guide': lazy(() => import('./LooseDrivesErasureGuideBlog')),
  'm1-mac-erasure-issues': lazy(() => import('./M1MacErasureIssuesBlog')),
  'mdm-detection': lazy(() => import('./MDMDetectionBlog')),
  'mobile-diagnostics-revolution': lazy(() => import('./MobileDiagnosticsRevolutionBlog')),
  'mobile-erasure-guide': lazy(() => import('./MobileErasureGuideBlog')),
  'ncua-guidelines': lazy(() => import('./NCUAGuidelinesBlog')),
  'nist-clear-purge': lazy(() => import('./NISTClearPurgeBlog')),
  'nist-tested-erasure-software': lazy(() => import('./NISTTestedErasureSoftwareBlog')),
  'nist-vs-ieee': lazy(() => import('./NISTVsIEEEBlog')),
  'onsite-vs-offsite-destruction': lazy(() => import('./OnsiteVsOffsiteDestructionBlog')),
  'pii-disposal-breach': lazy(() => import('./PIIDisposalBreachBlog')),
  'private-cloud': lazy(() => import('./PrivateCloudBlog')),
  'remote-work-data-erasure': lazy(() => import('./RemoteWorkDataErasureBlog')),
  'returning-leased-it-hardware-dos-and-donts': lazy(() => import('./ReturningLeasedITHardwareDosAndDonts')),
  'sec-compliance': lazy(() => import('./SECComplianceBlog')),
  'secure-file-erase': lazy(() => import('./SecureFileEraseBlog')),
  'secure-it-asset-disposal': lazy(() => import('./SecureITAssetDisposalBlog')),
  'server-erasure': lazy(() => import('./ServerErasureBlog')),
  'ssd-wipe-bios': lazy(() => import('./SSDWipeBIOSBlog')),
  'ultratest-comparison': lazy(() => import('./UltratestComparisonBlog')),
  'vm-erasure': lazy(() => import('./VMErasureBlog')),
  'windows-10-eos': lazy(() => import('./Windows10EOSBlog')),
  'wipe-computer-donating': lazy(() => import('./WipeComputerDonatingBlog')),
  'world-class-nps': lazy(() => import('./WorldClassNPSBlog')),
  'zero-trust-disposal': lazy(() => import('./ZeroTrustDisposalBlog')),
  'physical-destruction-vs-data-wiping': lazy(() => import('./PhysicalDestructionVsWipingBlog')),
  'chain-of-custody': lazy(() => import('./ChainOfCustodyBlog')),
  'nist-800-88-rev2-update-2026': lazy(() => import('./NIST80088Rev2UpdateBlog')),
  'adisa-alignment-itad-data-erasure': lazy(() => import('./ADISACertificationBlog')),
};

