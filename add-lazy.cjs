const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/manual/CompleteFreezeStateManual.tsx',
  'src/pages/manual/CompleteDSecureManual.tsx',
  'src/pages/manual/CompleteDSecureDriveManual.tsx',
  'src/pages/manual/CompleteDSecureDaignosticManual.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match <img tags that don't already have loading="lazy"
  // It replaces `<img ` with `<img loading="lazy" decoding="async" `
  // If it already has loading= or decoding= it might create duplicates if we aren't careful, 
  // but it's simpler to just do a smart regex or just replace all `<img src=` with `<img loading="lazy" decoding="async" src=`
  // First, check if any have loading="lazy".
  
  content = content.replace(/<img\s+(?!.*?loading=)/g, '<img loading="lazy" decoding="async" ');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});
