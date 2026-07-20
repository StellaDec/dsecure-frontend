/**
 * Section 5 Status Audit Script
 * 39 survivors ka complete status check — file exists + FAQ exists + content merged
 */
const fs = require('fs');

// Implementation plan se 39 survivors
const survivors = [
  { slug: 'dod-vs-ieee', component: 'DoDVsIEEEBlog', absorbed: ['erasure-standards'] },
  { slug: 'nist-clear-purge', component: 'NISTClearPurgeBlog', absorbed: ['nist-800-88-media-sanitization-guide', 'media-sanitization-need'] },
  { slug: 'ssd-wipe-bios', component: 'SSDWipeBIOSBlog', absorbed: ['ssd-wipe-guide'] },
  { slug: 'legal-ethical-erasure', component: 'LegalEthicalErasureBlog', absorbed: ['statutory-compliance', 'data-privacy-obligations', 'marriott-settlement', 'data-retention-privacy'] },
  { slug: 'it-asset-reuse', component: 'ITAssetReuseBlog', absorbed: ['sustainable-it-reuse', 'right-to-repair', 'green-it-practices', 'digital-divide', 'itad-environmental'] },
  { slug: 'eu-csrd', component: 'EUCSRDBlog', absorbed: ['esg-data-erasure'] },
  { slug: 'hipaa-compliance-erasure', component: 'HIPAAComplianceErasureBlog', absorbed: ['phi-erasure'] },
  { slug: 'itad-selection-guide', component: 'ITADSelectionGuideBlog', absorbed: ['itad-challenges', 'certified-itad-reasons', 'itad-procurement'] },
  { slug: 'education-data-destruction', component: 'EducationDataDestructionBlog', absorbed: ['data-erasure-education-sector'] },
  { slug: 'remote-work-data-erasure', component: 'RemoteWorkDataErasureBlog', absorbed: ['remote-work-data-erasure-best-practices', 'post-covid-data-disposal', 'remote-wiping-software'] },
  { slug: 'data-hoarding', component: 'DataHoardingBlog', absorbed: ['dark-data-risks', 'shadow-data'] },
  { slug: 'erasure-best-practices', component: 'ErasureBestPracticesBlog', absorbed: ['best-data-erasure-methods', 'cybersecurity-data-destruction'] },
  { slug: 'hardware-diagnostics-itad-compliance', component: 'HardwareDiagnosticsITADComplianceBlog', absorbed: ['hardware-diagnostics', 'diagnostics-erasure-itad'] },
  { slug: 'mobile-erasure-guide', component: 'MobileErasureGuideBlog', absorbed: ['secure-smartphone-erasure', 'ipad-tablet-erasure'] },
  { slug: 'healthcare-ransomware-lessons', component: 'HealthcareRansomwareLessonsBlog', absorbed: ['change-healthcare-attack'] },
  { slug: 'end-of-life-data-security', component: 'EndOfLifeDataSecurityBlog', absorbed: ['future-of-data-destruction'] },
  { slug: 'itam-disposal-guide', component: 'ITAMDisposalGuideBlog', absorbed: ['itam-data-breach'] },
  { slug: 'cryptographic-erase', component: 'CryptographicEraseBlog', absorbed: ['cryptographic-erase-self-encrypting-ssd-guide'] },
  { slug: 'sec-compliance', component: 'SECComplianceBlog', absorbed: ['morgan-stanley-data-breach'] },
  { slug: 'dod-wiping-standard', component: 'DoDWipingStandardBlog', absorbed: ['overwrite-guide'] },
  { slug: 'vm-erasure', component: 'VMErasureBlog', absorbed: ['vm-erasure-vmware'] },
  { slug: 'server-erasure', component: 'ServerErasureBlog', absorbed: ['lun-eraser'] },
  { slug: 'automate-data-erasure', component: 'AutomatedErasureBlog', absorbed: ['api-driven-data-erasure'] },
  { slug: 'how-to-erase-mac', component: 'HowToEraseMacBlog', absorbed: ['erase-mac-data-safely-using-dsecure'] },
  { slug: 'erasure-verification-process', component: 'ErasureVerificationBlog', absorbed: ['certificate-of-erasure'] },
  { slug: 'physical-destruction-vs-data-wiping', component: 'PhysicalDestructionVsWipingBlog', absorbed: ['secure-hdd-disposal'] },
  { slug: 'free-vs-pro-eraser', component: 'FreeVsProEraserBlog', absorbed: ['dsecure-vs-free-tools'] },
  { slug: 'pii-disposal-breach', component: 'PIIDisposalBreachBlog', absorbed: ['caption-call-fcc-settlement'] },
  { slug: 'itad-market-growth', component: 'ITADMarketGrowthBlog', absorbed: ['reseller-profits'] },
  { slug: 'mobile-diagnostics-revolution', component: 'MobileDiagnosticsRevolutionBlog', absorbed: ['mobile-diagnostics-benefits'] },
  { slug: 'private-cloud', component: 'PrivateCloudBlog', absorbed: ['cloud-migration'] },
  { slug: 'common-criteria', component: 'CommonCriteriaBlog', absorbed: ['common-criteria-eal4'] },
  { slug: 'gdpr-seven-years', component: 'GDPRSevenYearsBlog', absorbed: ['-seven-years'] },
  { slug: 'secure-it-asset-disposal', component: 'SecureITAssetDisposalBlog', absorbed: ['corporate-it-asset-risks'] },
  { slug: 'data-sanitization-compliance', component: 'DataSanitizationComplianceBlog', absorbed: ['data-disposal-guidelines'] },
  // Extra survivors from registry that are standalone (no absorbed posts)
  { slug: 'ccpa-violation', component: 'CCPAViolationBlog', absorbed: [] },
  { slug: 'data-erasure-disaster-recovery', component: 'DataErasureDisasterRecoveryBlog', absorbed: [] },
  { slug: 'data-remanence', component: 'DataRemanenceBlog', absorbed: [] },
  { slug: 'chromebook-data-risks', component: 'ChromebookDataRisksBlog', absorbed: [] },
];

const blogDir = 'src/components/blog';
const faqContent = fs.readFileSync('src/data/blogFaqs.ts', 'utf8');
const registryContent = fs.readFileSync('src/components/blog/BlogRegistry.ts', 'utf8');

let done = 0;
let partial = 0;
let pending = 0;

console.log('| # | Slug | File? | Registry? | FAQ Key? | Status |');
console.log('|---|------|-------|-----------|----------|--------|');

survivors.forEach((s, idx) => {
  const fileExists = fs.existsSync(`${blogDir}/${s.component}.tsx`);
  const inRegistry = registryContent.includes(`'${s.slug}'`);
  const hasFaq = faqContent.includes(`"${s.slug}"`);

  let status = '';
  if (!fileExists) {
    status = '❌ FILE MISSING';
    pending++;
  } else if (!inRegistry) {
    status = '⚠️ NOT IN REGISTRY';
    partial++;
  } else if (!hasFaq && s.absorbed.length > 0) {
    status = '⚠️ FAQ MISSING';
    partial++;
  } else if (fileExists && inRegistry && (hasFaq || s.absorbed.length === 0)) {
    status = '✅ COMPLETE';
    done++;
  } else {
    status = '🔍 NEEDS REVIEW';
    partial++;
  }

  console.log(`| ${idx+1} | ${s.slug} | ${fileExists ? '✅' : '❌'} | ${inRegistry ? '✅' : '❌'} | ${hasFaq ? '✅' : (s.absorbed.length === 0 ? '—' : '❌')} | ${status} |`);
});

console.log(`\n=== SUMMARY ===`);
console.log(`  ✅ Complete: ${done}/39`);
console.log(`  ⚠️ Partial: ${partial}/39`);
console.log(`  ❌ Missing: ${pending}/39`);
