const fs = require('fs');
let code = fs.readFileSync('src/pages/solutions/EnterpriseSolutionsPage.tsx', 'utf8');

code = code.replace(
  /<ThemeCard\b([^>]*)>([\s\S]*?)<\/div>\s*\}\)\)/g,
  '<ThemeCard$1>$2</ThemeCard>\n              }))'
);

fs.writeFileSync('src/pages/solutions/EnterpriseSolutionsPage.tsx', code);
console.log("Done");
