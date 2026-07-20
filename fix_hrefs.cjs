// Saare files mein href=`...` ko href={`...`} mein fix karne ka script
const fs = require('fs');
const files = [
  'src/pages/support/manual/WindowsBootableUsbPage.tsx',
  'src/pages/support/manual/WindowsSystemsPage.tsx',
  'src/pages/manual/CompleteDSecureDriveManual.tsx',
  'src/pages/manual/CompleteDSecureDaignosticManual.tsx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  // Match href=`...` pattern and wrap with curly braces
  // Handle both multiline and inline patterns
  const result = content.replace(/href=`([^`]+)`/g, 'href={`$1`}');
  if (result !== content) {
    const count = (content.match(/href=`/g) || []).length;
    fs.writeFileSync(f, result, 'utf-8');
    console.log(`Fixed ${count} occurrences in ${f}`);
  } else {
    console.log(`No changes in ${f}`);
  }
}
