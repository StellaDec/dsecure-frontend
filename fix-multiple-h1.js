import fs from 'fs';

const filesToFix = [
  'src/pages/dashboards/AdminPerformance.tsx',
  'src/pages/dashboards/AdminReports.tsx',
  'src/pages/dashboards/AdminSubusers.tsx',
  'src/pages/HealthcareServices.tsx',
  'src/pages/ITADSolution.tsx'
];

for (const filePath of filesToFix) {
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let h1Count = 0;

  // Replace <h1 and </h1> safely
  // We'll use a replacer function with string.replace
  content = content.replace(/<h1([\s>])/g, (match, p1) => {
    h1Count++;
    if (h1Count > 1) {
      return `<h2${p1}`;
    }
    return match;
  });

  // Reset count for closing tags
  h1Count = 0;
  content = content.replace(/<\/h1>/g, (match) => {
    h1Count++;
    if (h1Count > 1) {
      return `</h2>`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed multiple h1s in ${filePath}`);
}
