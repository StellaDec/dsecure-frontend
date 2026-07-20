// Blog template diversification script
// 6 archetypes ke hisaab se color + container replacements

const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'src', 'components', 'blog');

// Archetype assignments
const assignments = {
  magazine: [
    'GDPRSevenYearsBlog','FinancialDataBreachCaseStudyBlog','HealthcareDataBreachCaseStudyBlog',
    'DumpsterDivingDataBreachBlog','GovDeviceTheftBlog','EndOfLifeDataSecurityBlog',
    'CCPAViolationBlog','SECComplianceBlog','PIIDisposalBreachBlog',
    'WorldClassNPSBlog','DataErasureMythsBlog','DataErasureForNonProfits'
  ],
  technical: [
    'NIST80088Rev2UpdateBlog','NISTClearPurgeBlog','NISTVsIEEEBlog',
    'DoDVsIEEEBlog','IEEE2883ComplianceBlog','DoDWipingStandardBlog',
    'CryptographicEraseBlog','StandardDeepDive','LooseDrivesErasureGuideBlog',
    'SSDWipeBIOSBlog','WipeSSDFromBIOSGuide','NCUAGuidelinesBlog'
  ],
  product: [
    'HexViewerBlog','HardwareDiagnosticsITADComplianceBlog','DeploymentOptionsBlog',
    'AutomatedErasureBlog','MobileErasureGuideBlog','MobileDiagnosticsRevolutionBlog',
    'ServerErasureBlog','VMErasureBlog','SecureFileEraseBlog',
    'HowToEraseMacBlog','M1MacErasureIssuesBlog','MDMDetectionBlog'
  ],
  narrative: [
    'DataHoardingBlog','LegalEthicalErasureBlog','ITADMarketGrowthBlog',
    'ITAssetReuseBlog','ITAssetLifecycleBlog','RemoteWorkDataErasureBlog',
    'DataRemanenceBlog','DataRemediationErasureBlog','MacM1ErasureKnownIssues',
    'HealthcareRansomwareLessonsBlog','EUCSRDBlog','NISTTestedErasureSoftwareBlog'
  ],
  compliance: [
    'ReturningLeasedITHardwareDosAndDonts','ErasureBestPracticesBlog','ITAMDisposalGuideBlog',
    'ITADSelectionGuideBlog','ChainOfCustodyBlog','DataSanitizationComplianceBlog',
    'HIPAAComplianceErasureBlog','GovernmentITDisposalBlog','OnsiteVsOffsiteDestructionBlog',
    'ErasureVerificationBlog','DataMinimizationBlog','SecureITAssetDisposalBlog'
  ],
  industry: [
    'ErasureAsAServiceDSecureBlog','PrivateCloudBlog','FreeVsProEraserBlog',
    'ChromebookDataRisksBlog','Windows10EOSBlog','PhysicalDestructionVsWipingBlog',
    'DegaussingRisksBlog','EraseDataPcLaptopDesktopBlog','WipeComputerDonatingBlog',
    'EducationDataDestructionBlog','DataErasureDisasterRecoveryBlog'
  ]
};

// Color swap maps — emerald/teal/cyan → archetype colors
const colorSwaps = {
  magazine:  { emerald: 'indigo',  teal: 'purple',  cyan: 'violet' },
  technical: { emerald: 'blue',    teal: 'slate',   cyan: 'sky' },
  product:   { emerald: 'cyan',    teal: 'blue',    cyan: 'sky' },
  narrative: { emerald: 'amber',   teal: 'orange',  cyan: 'yellow' },
  compliance: null, // Container changes only — colors rehne do
  industry:  { emerald: 'rose',    teal: 'pink',    cyan: 'fuchsia' },
};

// Container shape replacements per archetype
const containerSwaps = {
  magazine: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-xl shadow-sm border-t-2 border-indigo-100'],
    ['rounded-[2rem] shadow-xl', 'rounded-xl shadow-sm border-t-2 border-indigo-100'],
  ],
  technical: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-lg border border-blue-200 shadow-sm'],
    ['rounded-[2rem] shadow-xl', 'rounded-lg border border-slate-300 shadow-sm'],
  ],
  product: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-2xl shadow-lg border border-cyan-100'],
    ['rounded-[2rem] shadow-xl', 'rounded-2xl shadow-lg border border-cyan-100'],
  ],
  narrative: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-none border-b border-amber-200 shadow-none'],
    ['rounded-[2rem] shadow-xl', 'rounded-none border-b border-amber-200 shadow-none'],
  ],
  compliance: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-xl border-2 border-teal-200 shadow-sm'],
    ['rounded-[2rem] shadow-xl', 'rounded-xl border-2 border-teal-200 shadow-sm'],
  ],
  industry: [
    ['rounded-[2rem] shadow-xl border border-slate-200/50', 'rounded-xl shadow-md border-b-4 border-rose-400'],
    ['rounded-[2rem] shadow-xl', 'rounded-xl shadow-md border-b-4 border-rose-400'],
  ],
};

// Page background replacements
const bgSwaps = {
  magazine: 'from-slate-50 via-white to-indigo-50/20',
  technical: 'from-slate-100 via-slate-50 to-blue-50/20',
  product: 'from-cyan-50/30 via-sky-50/20 to-white',
  narrative: 'from-amber-50/30 via-orange-50/10 to-white',
  compliance: 'from-teal-50/20 via-emerald-50/10 to-slate-50',
  industry: 'from-rose-50/20 via-pink-50/10 to-white',
};

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
}

function applyColorSwaps(content, swapMap) {
  if (!swapMap) return content;
  let result = content;
  
  // Emerald → primary color (most specific patterns first)
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  
  for (const shade of shades) {
    // Replace emerald-{shade} with primary-{shade}
    // Match in CSS class contexts only (prefixed by bg-, text-, border-, from-, via-, to-, hover:bg-, etc.)
    const emeraldPattern = new RegExp(`emerald-${shade}`, 'g');
    result = result.replace(emeraldPattern, `${swapMap.emerald}-${shade}`);
    
    // Replace teal-{shade} with secondary-{shade}
    const tealPattern = new RegExp(`teal-${shade}`, 'g');
    result = result.replace(tealPattern, `${swapMap.teal}-${shade}`);
    
    // Replace cyan-{shade} with tertiary-{shade} (only in gradient contexts)
    const cyanPattern = new RegExp(`cyan-${shade}`, 'g');
    result = result.replace(cyanPattern, `${swapMap.cyan}-${shade}`);
  }
  
  return result;
}

function applyContainerSwaps(content, swaps) {
  let result = content;
  for (const [from, to] of swaps) {
    result = result.split(from).join(to);
  }
  return result;
}

function applyBgSwap(content, newBg) {
  let result = content;
  // Replace common page background patterns
  const bgPatterns = [
    'from-emerald-50 via-teal-50/30 to-teal-50',
    'from-emerald-50 via-teal-50/30 to-cyan-50',
    'from-emerald-50 via-teal-50 to-teal-50',
  ];
  for (const pat of bgPatterns) {
    result = result.split(pat).join(newBg);
  }
  return result;
}

// Main execution
let totalChanged = 0;
let totalSkipped = 0;
const report = [];

for (const [archetype, blogs] of Object.entries(assignments)) {
  for (const blogName of blogs) {
    const filePath = path.join(blogDir, `${blogName}.tsx`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  SKIP: ${blogName}.tsx not found`);
      totalSkipped++;
      continue;
    }
    
    const original = fs.readFileSync(filePath, 'utf-8');
    let modified = original;
    
    // 1. Page background swap (do BEFORE color swaps!)
    modified = applyBgSwap(modified, bgSwaps[archetype]);
    
    // 2. Container shape swaps (do BEFORE color swaps!)
    modified = applyContainerSwaps(modified, containerSwaps[archetype]);
    
    // 3. Color accent swaps
    modified = applyColorSwaps(modified, colorSwaps[archetype]);
    
    if (modified !== original) {
      fs.writeFileSync(filePath, modified, 'utf-8');
      totalChanged++;
      const changes = [];
      if (original.includes('emerald') && !modified.includes('emerald') && archetype !== 'compliance') changes.push('colors');
      if (original.includes('rounded-[2rem]') && !modified.includes('rounded-[2rem]')) changes.push('containers');
      report.push(`✅ ${archetype.padEnd(12)} ${blogName}.tsx [${changes.join(', ')}]`);
    } else {
      report.push(`⏭️  ${archetype.padEnd(12)} ${blogName}.tsx [no changes needed]`);
    }
  }
}

console.log('\n=== Blog Template Diversification Report ===\n');
report.forEach(r => console.log(r));
console.log(`\n📊 Total: ${totalChanged} modified, ${totalSkipped} skipped\n`);
