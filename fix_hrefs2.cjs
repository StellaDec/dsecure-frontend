// Fix remaining href patterns where closing } is missing
const fs = require('fs');
const files = [
  'src/pages/support/manual/WindowsBootableUsbPage.tsx',
  'src/pages/manual/CompleteDSecureDriveManual.tsx',
  'src/pages/manual/CompleteDSecureDaignosticManual.tsx'
];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf-8');
  // Pattern: href={`...exe` target= should be href={`...exe`} target=
  const re = /href=\{\`([^`]+)\`(\s+target=)/g;
  const fixed = c.replace(re, 'href={`$1`}$2');
  if (fixed !== c) {
    fs.writeFileSync(f, fixed, 'utf-8');
    console.log('Fixed:', f);
  } else {
    console.log('Skip:', f);
  }
}
