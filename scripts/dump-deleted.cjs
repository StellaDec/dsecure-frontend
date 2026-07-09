const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const deletedFiles = [
  'src/components/blog/BrandReputationESGBlog.tsx',
  'src/components/blog/CaptionCallSettlementBlog.tsx',
  'src/components/blog/CommonCriteriaComplianceVerifiedDataWipingBlog.tsx',
  'src/components/blog/CryptographicEraseNISTBlog.tsx',
  'src/components/blog/DataDeletionMythsBlog.tsx',
  'src/components/blog/DataDestructionBestPracticesBlog.tsx',
  'src/components/blog/DataHoardingRisksBlog.tsx',
  'src/components/blog/DeletedFilesTruthBlog.tsx',
  'src/components/blog/DeletionVsErasureBlog.tsx',
  'src/components/blog/DellDataWipeVsDSecureBlog.tsx',
  'src/components/blog/DoDVsIEEEDataSanitizationBlog.tsx',
  'src/components/blog/ESGReportBlog.tsx',
  'src/components/blog/ErasureVsDestructionBlog.tsx',
  'src/components/blog/FutureDataDestructionBlog.tsx',
  'src/components/blog/GovernmentDeviceTheftBlog.tsx',
  'src/components/blog/LegalEthicalDataErasureBlog.tsx',
  'src/components/blog/MSPErasureAsAServiceBlog.tsx',
  'src/components/blog/MSPErasureServiceBlog.tsx',
  'src/components/blog/MorganStanleyFineBlog.tsx',
  'src/components/blog/NCUAThirdPartyDataDisposalBlog.tsx',
  'src/components/blog/SecurePHIePHIErasureBlog.tsx',
  'src/components/blog/ShadowDataRisksBlog.tsx',
  'src/components/blog/StatutoryRegulatoryComplianceDataErasureBlog.tsx',
  'src/pages/manual/InstallationGuideDetailed.tsx'
];

const outDir = path.join(__dirname, '..', 'temp_deleted');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

for (const file of deletedFiles) {
  try {
    const content = execSync(`git show HEAD~1:${file}`, { encoding: 'utf-8' });
    const filename = path.basename(file);
    fs.writeFileSync(path.join(outDir, filename), content);
    console.log(`Dumped ${filename}`);
  } catch (err) {
    console.error(`Failed to dump ${file}`);
  }
}
