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
  'automate-data-erasure': getBlogComponent('AutomatedErasureBlog'),
  'ccpa-violation': getBlogComponent('CCPAViolationBlog'),
  'chromebook-data-risks': getBlogComponent('ChromebookDataRisksBlog'),
  'common-criteria': getBlogComponent('CommonCriteriaBlog'),
  'cryptographic-erase': getBlogComponent('CryptographicEraseBlog'),
  'dban-alternative-ssd-nvme-data-erasure': getBlogComponent('DBANAlternativeBlog'),
  'ai-data-center-decommissioning': getBlogComponent('AIDataCenterDecommissioningBlog'),
  'local-llm-data-erasure': getBlogComponent('LocalLLMErasureBlog'),
  'servicenow-data-erasure-itam-workflow': getBlogComponent('ServiceNowDataErasureBlog'),
  'data-erasure-disaster-recovery': getBlogComponent('DataErasureDisasterRecoveryBlog'),
  'data-erasure-for-non-profits': getBlogComponent('DataErasureForNonProfits'),
  'data-erasure-myths': getBlogComponent('DataErasureMythsBlog'),
  'data-hoarding': getBlogComponent('DataHoardingBlog'),
  'data-minimization': getBlogComponent('DataMinimizationBlog'),
  'data-remanence': getBlogComponent('DataRemanenceBlog'),
  'data-remediation-erasure': getBlogComponent('DataRemediationErasureBlog'),
  'data-sanitization-compliance': getBlogComponent('DataSanitizationComplianceBlog'),
  'degaussing-risks': getBlogComponent('DegaussingRisksBlog'),
  'deployment-options': getBlogComponent('DeploymentOptionsBlog'),
  'dod-vs-ieee': getBlogComponent('DoDVsIEEEBlog'),
  'dod-wiping-standard': getBlogComponent('DoDWipingStandardBlog'),
  'dsecure-operations': getBlogComponent('DSecureOperationsBlog'),
  'dumpster-diving-data-breach': getBlogComponent('DumpsterDivingDataBreachBlog'),
  'education-data-destruction': getBlogComponent('EducationDataDestructionBlog'),
  'end-of-life-data-security': getBlogComponent('EndOfLifeDataSecurityBlog'),
  'erase-data-pc-laptop-desktop': getBlogComponent('EraseDataPcLaptopDesktopBlog'),
  'erasure-as-a-service-dsecure': getBlogComponent('ErasureAsAServiceDSecureBlog'),
  'enterprise-data-erasure-compliance-guide': getBlogComponent('EnterpriseDataErasureComplianceGuideBlog'),
  'erasure-best-practices': getBlogComponent('ErasureBestPracticesBlog'),
  'erasure-verification-process': getBlogComponent('ErasureVerificationBlog'),
  'eu-csrd': getBlogComponent('EUCSRDBlog'),
  'financial-data-breach-case-study': getBlogComponent('FinancialDataBreachCaseStudyBlog'),
  'free-vs-pro-eraser': getBlogComponent('FreeVsProEraserBlog'),
  'gdpr-seven-years': getBlogComponent('GDPRSevenYearsBlog'),
  'government-device-theft': getBlogComponent('GovDeviceTheftBlog'),
  'government-it-disposal': getBlogComponent('GovernmentITDisposalBlog'),
  'hardware-diagnostics-itad-compliance': getBlogComponent('HardwareDiagnosticsITADComplianceBlog'),
  'healthcare-data-breach-case-study': getBlogComponent('HealthcareDataBreachCaseStudyBlog'),
  'healthcare-ransomware-lessons': getBlogComponent('HealthcareRansomwareLessonsBlog'),
  'hex-viewer': getBlogComponent('HexViewerBlog'),
  'hidden-disk-areas': getBlogComponent('HiddenDiskAreasBlog'),
  'hipaa-compliance-erasure': getBlogComponent('HIPAAComplianceErasureBlog'),
  'how-to-erasure-mac': getBlogComponent('HowToEraseMacBlog'),
  'ieee-2883-2022-data-sanitization': getBlogComponent('IEEE2883ComplianceBlog'),
  'it-asset-lifecycle': getBlogComponent('ITAssetLifecycleBlog'),
  'it-asset-reuse': getBlogComponent('ITAssetReuseBlog'),
  'itad-market-growth': getBlogComponent('ITADMarketGrowthBlog'),
  'itad-selection-guide': getBlogComponent('ITADSelectionGuideBlog'),
  'itam-disposal-guide': getBlogComponent('ITAMDisposalGuideBlog'),
  'legal-ethical-erasure': getBlogComponent('LegalEthicalErasureBlog'),
  'loose-drives-erasure-guide': getBlogComponent('LooseDrivesErasureGuideBlog'),
  'm1-mac-erasure-issues': getBlogComponent('M1MacErasureIssuesBlog'),
  'mdm-detection': getBlogComponent('MDMDetectionBlog'),
  'mobile-diagnostics-revolution': getBlogComponent('MobileDiagnosticsRevolutionBlog'),
  'mobile-erasure-guide': getBlogComponent('MobileErasureGuideBlog'),
  'ncua-guidelines': getBlogComponent('NCUAGuidelinesBlog'),
  'nist-clear-purge': getBlogComponent('NISTClearPurgeBlog'),
  'nist-tested-erasure-software': getBlogComponent('NISTTestedErasureSoftwareBlog'),
  'nist-vs-ieee': getBlogComponent('NISTVsIEEEBlog'),
  'onsite-vs-offsite-destruction': getBlogComponent('OnsiteVsOffsiteDestructionBlog'),
  'pii-disposal-breach': getBlogComponent('PIIDisposalBreachBlog'),
  'private-cloud': getBlogComponent('PrivateCloudBlog'),
  'remote-work-data-erasure': getBlogComponent('RemoteWorkDataErasureBlog'),
  'returning-leased-it-hardware-dos-and-donts': getBlogComponent('ReturningLeasedITHardwareDosAndDonts'),
  'sec-compliance': getBlogComponent('SECComplianceBlog'),
  'secure-file-erase': getBlogComponent('SecureFileEraseBlog'),
  'secure-it-asset-disposal': getBlogComponent('SecureITAssetDisposalBlog'),
  'server-erasure': getBlogComponent('ServerErasureBlog'),
  'ssd-wipe-bios': getBlogComponent('SSDWipeBIOSBlog'),
  'ultratest-comparison': getBlogComponent('UltratestComparisonBlog'),
  'vm-erasure': getBlogComponent('VMErasureBlog'),
  'windows-10-eos': getBlogComponent('Windows10EOSBlog'),
  'wipe-computer-donating': getBlogComponent('WipeComputerDonatingBlog'),
  'world-class-nps': getBlogComponent('WorldClassNPSBlog'),
  'zero-trust-disposal': getBlogComponent('ZeroTrustDisposalBlog'),
  'physical-destruction-vs-data-wiping': getBlogComponent('PhysicalDestructionVsWipingBlog'),
  'chain-of-custody': getBlogComponent('ChainOfCustodyBlog'),
  'nist-800-88-rev2-update-2026': getBlogComponent('NIST80088Rev2UpdateBlog'),
  'adisa-alignment-itad-data-erasure': getBlogComponent('ADISACertificationBlog'),
};
