import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Blog Pages
const BlogPage = lazy(() => import("../components/blog/BlogPage"));
const BestDataErasureSoftware2026Blog = lazy(() => import("../components/blog/BestDataErasureSoftware2026Blog"));
const IEEE2883GuideBlog = lazy(() => import("../components/blog/IEEE2883GuideBlog"));
const AIDataCenterDecommissioningBlog = lazy(() => import("../components/blog/AIDataCenterDecommissioningBlog"));
const DBANAlternativeBlog = lazy(() => import("../components/blog/DBANAlternativeBlog"));
const ServiceNowDataErasureBlog = lazy(() => import("../components/blog/ServiceNowDataErasureBlog"));
const LocalLLMErasureBlog = lazy(() => import("../components/blog/LocalLLMErasureBlog"));
const DataErasure250TBBlog = lazy(() => import("../components/blog/DataErasure250TBBlog"));
const DataSanitizationComplianceBlog = lazy(() => import("../components/blog/DataSanitizationComplianceBlog"));
const DataSanitizationRisk2026Blog = lazy(() => import("../components/blog/DataSanitizationRisk2026Blog"));
const ForensicPreservationBlog = lazy(() => import("../components/blog/ForensicPreservationBlog"));

const ErasureBestPracticesBlog = lazy(() => import("../components/blog/ErasureBestPracticesBlog"));
const AutomatedErasureBlog = lazy(() => import("../components/blog/AutomatedErasureBlog"));
const MobileErasureGuideBlog = lazy(() => import("../components/blog/MobileErasureGuideBlog"));
const ZeroTrustDisposalBlog = lazy(() => import("../components/blog/ZeroTrustDisposalBlog"));

const SECComplianceBlog = lazy(() => import("../components/blog/SECComplianceBlog"));
const ITAMDisposalGuideBlog = lazy(() => import("../components/blog/ITAMDisposalGuideBlog"));

const ErasureVerificationBlog = lazy(() => import("../components/blog/ErasureVerificationBlog"));

const DataMinimizationBlog = lazy(() => import("../components/blog/DataMinimizationBlog"));
const GovDeviceTheftBlog = lazy(() => import("../components/blog/GovDeviceTheftBlog"));
const ITADSelectionGuideBlog = lazy(() => import("../components/blog/ITADSelectionGuideBlog"));

const HardwareDiagnosticsITADComplianceBlog = lazy(() => import("../components/blog/HardwareDiagnosticsITADComplianceBlog"));

const ErasureAsAServiceDSecureBlog = lazy(() => import("../components/blog/ErasureAsAServiceDSecureBlog"));
const ReturningLeasedITHardwareDosAndDontsBlog = lazy(() => import("../components/blog/ReturningLeasedITHardwareDosAndDonts"));
const HealthcareRansomwareLessonsBlog = lazy(() => import("../components/blog/HealthcareRansomwareLessonsBlog"));
const DataErasureForNonProfitsBlog = lazy(() => import("../components/blog/DataErasureForNonProfits"));

const EraseDataPcLaptopDesktopBlog = lazy(() => import("../components/blog/EraseDataPcLaptopDesktopBlog"));
const PhysicalDestructionVsWipingBlog = lazy(() => import("../components/blog/PhysicalDestructionVsWipingBlog"));

const CCPAViolationBlog = lazy(() => import("../components/blog/CCPAViolationBlog"));

const ChainOfCustodyBlog = lazy(() => import("../components/blog/ChainOfCustodyBlog"));

const ChromebookDataRisksBlog = lazy(() => import("../components/blog/ChromebookDataRisksBlog"));

const CommonCriteriaBlog = lazy(() => import("../components/blog/CommonCriteriaBlog"));

const CryptographicEraseBlog = lazy(() => import("../components/blog/CryptographicEraseBlog"));

const DSecureOperationsBlog = lazy(() => import("../components/blog/DSecureOperationsBlog"));

const DataErasureDisasterRecoveryBlog = lazy(() => import("../components/blog/DataErasureDisasterRecoveryBlog"));
const DataErasureMythsBlog = lazy(() => import("../components/blog/DataErasureMythsBlog"));
const DataHoardingBlog = lazy(() => import("../components/blog/DataHoardingBlog"));

const DataRemanenceBlog = lazy(() => import("../components/blog/DataRemanenceBlog"));
const DataRemediationErasureBlog = lazy(() => import("../components/blog/DataRemediationErasureBlog"));

const DegaussingRisksBlog = lazy(() => import("../components/blog/DegaussingRisksBlog"));

const DeploymentOptionsBlog = lazy(() => import("../components/blog/DeploymentOptionsBlog"));

const DoDVsIEEEBlog = lazy(() => import("../components/blog/DoDVsIEEEBlog"));
const DoDWipingStandardBlog = lazy(() => import("../components/blog/DoDWipingStandardBlog"));
const DumpsterDivingDataBreachBlog = lazy(() => import("../components/blog/DumpsterDivingDataBreachBlog"));
const EUCSRDBlog = lazy(() => import("../components/blog/EUCSRDBlog"));
const EducationDataDestructionBlog = lazy(() => import("../components/blog/EducationDataDestructionBlog"));
const EndOfLifeDataSecurityBlog = lazy(() => import("../components/blog/EndOfLifeDataSecurityBlog"));
const FinancialDataBreachCaseStudyBlog = lazy(() => import("../components/blog/FinancialDataBreachCaseStudyBlog"));
const FreeVsProEraserBlog = lazy(() => import("../components/blog/FreeVsProEraserBlog"));
const GDPRSevenYearsBlog = lazy(() => import("../components/blog/GDPRSevenYearsBlog"));
const GovernmentITDisposalBlog = lazy(() => import("../components/blog/GovernmentITDisposalBlog"));

const HIPAAComplianceErasureBlog = lazy(() => import("../components/blog/HIPAAComplianceErasureBlog"));
const HealthcareDataBreachCaseStudyBlog = lazy(() => import("../components/blog/HealthcareDataBreachCaseStudyBlog"));
const HexViewerBlog = lazy(() => import("../components/blog/HexViewerBlog"));
const HiddenDiskAreasBlog = lazy(() => import("../components/blog/HiddenDiskAreasBlog"));
const HowToEraseMacBlog = lazy(() => import("../components/blog/HowToEraseMacBlog"));

const ITADMarketGrowthBlog = lazy(() => import("../components/blog/ITADMarketGrowthBlog"));

const ITAssetLifecycleBlog = lazy(() => import("../components/blog/ITAssetLifecycleBlog"));
const ITAssetReuseBlog = lazy(() => import("../components/blog/ITAssetReuseBlog"));
const LegalEthicalErasureBlog = lazy(() => import("../components/blog/LegalEthicalErasureBlog"));
const LooseDrivesErasureGuideBlog = lazy(() => import("../components/blog/LooseDrivesErasureGuideBlog"));
const M1MacErasureIssuesBlog = lazy(() => import("../components/blog/M1MacErasureIssuesBlog"));
const MDMDetectionBlog = lazy(() => import("../components/blog/MDMDetectionBlog"));

const MobileDiagnosticsRevolutionBlog = lazy(() => import("../components/blog/MobileDiagnosticsRevolutionBlog"));

const NCUAGuidelinesBlog = lazy(() => import("../components/blog/NCUAGuidelinesBlog"));
const NISTClearPurgeBlog = lazy(() => import("../components/blog/NISTClearPurgeBlog"));
const NISTTestedErasureSoftwareBlog = lazy(() => import("../components/blog/NISTTestedErasureSoftwareBlog"));

const OnsiteVsOffsiteDestructionBlog = lazy(() => import("../components/blog/OnsiteVsOffsiteDestructionBlog"));

const PIIDisposalBreachBlog = lazy(() => import("../components/blog/PIIDisposalBreachBlog"));

const PrivateCloudBlog = lazy(() => import("../components/blog/PrivateCloudBlog"));

const RemoteWorkDataErasureBlog = lazy(() => import("../components/blog/RemoteWorkDataErasureBlog"));

const SSDWipeBIOSBlog = lazy(() => import("../components/blog/SSDWipeBIOSBlog"));
const SecureFileEraseBlog = lazy(() => import("../components/blog/SecureFileEraseBlog"));

const SecureITAssetDisposalBlog = lazy(() => import("../components/blog/SecureITAssetDisposalBlog"));

const ServerErasureBlog = lazy(() => import("../components/blog/ServerErasureBlog"));

const UltratestComparisonBlog = lazy(() => import("../components/blog/UltratestComparisonBlog"));
const VMErasureBlog = lazy(() => import("../components/blog/VMErasureBlog"));
const Windows10EOSBlog = lazy(() => import("../components/blog/Windows10EOSBlog"));
const WipeComputerDonatingBlog = lazy(() => import("../components/blog/WipeComputerDonatingBlog"));
const WorldClassNPSBlog = lazy(() => import("../components/blog/WorldClassNPSBlog"));
const WindowsFileDeletionVsFormattingBlog = lazy(() => import("../components/blog/WindowsFileDeletionVsFormattingBlog"));

export const BlogRoutes = () => (
  <Route element={<MainLayout />}>
    <Route path="blog" element={<BlogPage />} />
    <Route path="blog/best-data-erasure-software-2026" element={<BestDataErasureSoftware2026Blog />} />
    <Route path="blog/ieee-2883-complete-guide" element={<IEEE2883GuideBlog />} />
    <Route path="blog/ai-data-center-decommissioning" element={<AIDataCenterDecommissioningBlog />} />
    <Route path="blog/dban-alternative-ssd-nvme-data-erasure" element={<DBANAlternativeBlog />} />
    <Route path="blog/servicenow-data-erasure-itam-workflow" element={<ServiceNowDataErasureBlog />} />
    <Route path="blog/local-llm-data-erasure" element={<LocalLLMErasureBlog />} />

    <Route path="blog/data-sanitization-compliance" element={<DataSanitizationComplianceBlog />} />
    <Route path="blog/data-sanitization-risk-2026-india-itad" element={<DataSanitizationRisk2026Blog />} />
    <Route path="blog/250tb-data-erasure-results" element={<DataErasure250TBBlog />} />
    <Route path="blog/forensic-preservation-vs-secure-erasure-data-breach" element={<ForensicPreservationBlog />} />

    <Route path="blog/erasure-best-practices" element={<ErasureBestPracticesBlog />} />
    <Route path="blog/automate-data-erasure" element={<AutomatedErasureBlog />} />
    <Route path="blog/mobile-erasure-guide" element={<MobileErasureGuideBlog />} />
    <Route path="blog/zero-trust-disposal" element={<ZeroTrustDisposalBlog />} />

    <Route path="blog/sec-compliance" element={<SECComplianceBlog />} />
    <Route path="blog/itam-disposal-guide" element={<ITAMDisposalGuideBlog />} />

    <Route path="blog/erasure-verification-process" element={<ErasureVerificationBlog />} />

    <Route path="blog/data-minimization" element={<DataMinimizationBlog />} />
    <Route path="blog/government-device-theft" element={<GovDeviceTheftBlog />} />
    <Route path="blog/itad-selection-guide" element={<ITADSelectionGuideBlog />} />

    <Route path="blog/hardware-diagnostics-itad-compliance" element={<HardwareDiagnosticsITADComplianceBlog />} />

    <Route path="blog/erasure-as-a-service-dsecure" element={<ErasureAsAServiceDSecureBlog />} />
    <Route path="blog/returning-leased-it-hardware-dos-and-donts" element={<ReturningLeasedITHardwareDosAndDontsBlog />} />
    <Route path="blog/healthcare-ransomware-lessons" element={<HealthcareRansomwareLessonsBlog />} />
    <Route path="blog/data-erasure-for-non-profits" element={<DataErasureForNonProfitsBlog />} />

    <Route path="blog/erase-data-pc-laptop-desktop" element={<EraseDataPcLaptopDesktopBlog />} />
    <Route path="blog/physical-destruction-vs-data-wiping" element={<PhysicalDestructionVsWipingBlog />} />

    <Route path="blog/ccpa-violation" element={<CCPAViolationBlog />} />

    <Route path="blog/chain-of-custody" element={<ChainOfCustodyBlog />} />

    <Route path="blog/chromebook-data-risks" element={<ChromebookDataRisksBlog />} />

    <Route path="blog/common-criteria" element={<CommonCriteriaBlog />} />

    <Route path="blog/cryptographic-erase" element={<CryptographicEraseBlog />} />

    <Route path="blog/dsecure-operations" element={<DSecureOperationsBlog />} />

    <Route path="blog/data-erasure-disaster-recovery" element={<DataErasureDisasterRecoveryBlog />} />
    <Route path="blog/data-erasure-myths" element={<DataErasureMythsBlog />} />
    <Route path="blog/data-hoarding" element={<DataHoardingBlog />} />

    <Route path="blog/data-remanence" element={<DataRemanenceBlog />} />
    <Route path="blog/data-remediation-erasure" element={<DataRemediationErasureBlog />} />

    <Route path="blog/degaussing-risks" element={<DegaussingRisksBlog />} />

    <Route path="blog/deployment-options" element={<DeploymentOptionsBlog />} />

    <Route path="blog/dod-vs-ieee" element={<DoDVsIEEEBlog />} />
    <Route path="blog/dod-wiping-standard" element={<DoDWipingStandardBlog />} />
    <Route path="blog/dumpster-diving-data-breach" element={<DumpsterDivingDataBreachBlog />} />
    <Route path="blog/eu-csrd" element={<EUCSRDBlog />} />
    <Route path="blog/education-data-destruction" element={<EducationDataDestructionBlog />} />
    <Route path="blog/end-of-life-data-security" element={<EndOfLifeDataSecurityBlog />} />
    <Route path="blog/financial-data-breach-case-study" element={<FinancialDataBreachCaseStudyBlog />} />
    <Route path="blog/free-vs-pro-eraser" element={<FreeVsProEraserBlog />} />
    <Route path="blog/gdpr-seven-years" element={<GDPRSevenYearsBlog />} />
    <Route path="blog/government-it-disposal" element={<GovernmentITDisposalBlog />} />

    <Route path="blog/hipaa-compliance-erasure" element={<HIPAAComplianceErasureBlog />} />
    <Route path="blog/healthcare-data-breach-case-study" element={<HealthcareDataBreachCaseStudyBlog />} />
    <Route path="blog/hex-viewer" element={<HexViewerBlog />} />
    <Route path="blog/hidden-disk-areas" element={<HiddenDiskAreasBlog />} />
    <Route path="blog/how-to-erasure-mac" element={<HowToEraseMacBlog />} />

    <Route path="blog/itad-market-growth" element={<ITADMarketGrowthBlog />} />

    <Route path="blog/it-asset-lifecycle" element={<ITAssetLifecycleBlog />} />
    <Route path="blog/it-asset-reuse" element={<ITAssetReuseBlog />} />
    <Route path="blog/legal-ethical-erasure" element={<LegalEthicalErasureBlog />} />
    <Route path="blog/loose-drives-erasure-guide" element={<LooseDrivesErasureGuideBlog />} />
    <Route path="blog/m1-mac-erasure-issues" element={<M1MacErasureIssuesBlog />} />
    <Route path="blog/mdm-detection" element={<MDMDetectionBlog />} />

    <Route path="blog/mobile-diagnostics-revolution" element={<MobileDiagnosticsRevolutionBlog />} />

    <Route path="blog/ncua-guidelines" element={<NCUAGuidelinesBlog />} />
    <Route path="blog/nist-clear-purge" element={<NISTClearPurgeBlog />} />
    <Route path="blog/nist-tested-erasure-software" element={<NISTTestedErasureSoftwareBlog />} />

    <Route path="blog/onsite-vs-offsite-destruction" element={<OnsiteVsOffsiteDestructionBlog />} />

    <Route path="blog/pii-disposal-breach" element={<PIIDisposalBreachBlog />} />

    <Route path="blog/private-cloud" element={<PrivateCloudBlog />} />

    <Route path="blog/remote-work-data-erasure" element={<RemoteWorkDataErasureBlog />} />

    <Route path="blog/ssd-wipe-guide" element={<SSDWipeBIOSBlog />} />
    <Route path="blog/secure-file-erase" element={<SecureFileEraseBlog />} />

    <Route path="blog/secure-it-asset-disposal" element={<SecureITAssetDisposalBlog />} />

    <Route path="blog/server-erasure" element={<ServerErasureBlog />} />

    <Route path="blog/ultratest-comparison" element={<UltratestComparisonBlog />} />
    <Route path="blog/vm-erasure" element={<VMErasureBlog />} />
    <Route path="blog/windows-10-eos" element={<Windows10EOSBlog />} />
    <Route path="blog/wipe-computer-donating" element={<WipeComputerDonatingBlog />} />
    <Route path="blog/world-class-nps" element={<WorldClassNPSBlog />} />
    <Route path="blog/windows-file-deletion-vs-formatting" element={<WindowsFileDeletionVsFormattingBlog />} />
  </Route>
);
