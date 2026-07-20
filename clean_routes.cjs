// BlogRoutes ko clean karne ka script — UTF-16 encoding handle karta hai
const fs = require('fs');

// Pehle file read karo as buffer aur encoding detect karo
const buf = fs.readFileSync('src/routes/BlogRoutes.tsx');
let content;
// Check for UTF-16 BOM
if (buf[0] === 0xFF && buf[1] === 0xFE) {
  content = buf.toString('utf16le');
} else if (buf[0] === 0xFE && buf[1] === 0xFF) {
  content = buf.toString('utf16le');
} else {
  content = buf.toString('utf-8');
}

// BOM remove karo
content = content.replace(/^\uFEFF/, '');

const prunedSlugs = require('./pruned_slugs.json');

const lines = content.split('\n');
const componentsToRemove = new Set();

// Pass 1: Route lines se component names collect karo
for (const line of lines) {
  for (const slug of prunedSlugs) {
    // Multiple path formats check karo
    if (line.includes(`"${slug}"`) || line.includes(`'${slug}'`)) {
      // Route line hai toh component name extract karo
      const compMatch = line.match(/<([A-Za-z0-9_]+)\s/);
      if (compMatch && line.includes('Route')) {
        componentsToRemove.add(compMatch[1]);
      }
    }
  }
}

// Manually add components we know are deleted from filesystem
const deletedComponents = [
  'OverwriteGuideBlog', 'SSDWipeGuideBlog', 'DataSanitizationComplianceBlog',
  'BestErasureMethodBlog', 'ErasureBestPracticesBlog', 'AutomatedErasureBlog',
  'MobileErasureGuideBlog', 'ZeroTrustDisposalBlog', 'MSPSecurityBlog',
  'SECComplianceBlog', 'ITAMDisposalGuideBlog', 'ESGDataErasureBlog',
  'SustainableITReuseBlog', 'CarbonFootprintErasureBlog', 'Scope3EmissionsBlog',
  'ErasureVerificationBlog', 'HardwareDiagnosticsBlog', 'MSPDataErasureBlog',
  'CaptionCallFCCSettlementBlog', 'HardwareDiagnosticsITADComplianceBlog',
  'FutureOfDataDestructionBlog', 'MorganStanleyDataBreachBlog',
  'StatutoryComplianceBlog', 'RightToRepairBlog', 'DigitalDivideBlog',
  'GreenITPracticesBlog', 'ITADChallengesBlog', 'ITADProcurementBlog',
  'ComplianceVerifiedITADReasonsBlog', 'MediaSanitizationNeedBlog',
  'DellDataWipeAlternativeBlog', 'PHIErasureBlog', 'IPadTabletErasureBlog',
  'SecureSmartphoneErasureBlog', 'PostCovidDataDisposalBlog',
  'RemoteWipingSoftwareBlog', 'RemoteWorkDataErasureBestPracticesBlog',
  'ShadowDataBlog', 'DataHoardingBlog', 'ITADEnvironmentalBlog',
  'ITAssetReuseBlog', 'LegalEthicalErasureBlog', 'MarriottSettlementBlog',
  'DeploymentOptionsBlog', 'FreeVsProEraserBlog', 'CommonCriteriaBlog',
  'CloudMigrationBlog', 'ResellerProfitsBlog', 'MobileDiagnosticsBenefitsBlog',
  'CorporateITAssetRisksBlog', 'SecureHDDDisposalBlog',
  'EraseMacDataSafelyUsingDSecureBlog', 'ITAMDataBreachBlog',
  'HealthcareRansomwareLessonsBlog', 'NIST80088IndiaBlog',
  'DiagnosticsErasureITADBlog'
];

for (const c of deletedComponents) {
  componentsToRemove.add(c);
}

console.log('Total components to remove:', componentsToRemove.size);

// Pass 2: Filter lines
const newLines = [];
for (const line of lines) {
  let shouldRemove = false;
  
  for (const comp of componentsToRemove) {
    // Match lazy import lines
    if (line.includes(`const ${comp} =`) && line.includes('lazy(')) {
      shouldRemove = true;
      break;
    }
    // Match Route lines containing the component
    if (line.includes(`<${comp}`) && line.includes('Route')) {
      shouldRemove = true;
      break;
    }
  }
  
  if (!shouldRemove) {
    newLines.push(line);
  }
}

// UTF-8 mein write karo (Vite ko UTF-8 chahiye)
fs.writeFileSync('src/routes/BlogRoutes.tsx', newLines.join('\n'), 'utf-8');
console.log(`BlogRoutes.tsx cleaned. Lines: ${lines.length} -> ${newLines.length}`);
