const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('./src/pages', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace the import
    content = content.replace(/import SEOHead from ["'](?:\.\.?\/)+components\/SEOHead["'];?/g, 'import { SEOHeadNative } from "@/components/SEOHeadNative";');
    content = content.replace(/import SEOHead from ["']@\/components\/SEOHead["'];?/g, 'import { SEOHeadNative } from "@/components/SEOHeadNative";');

    // Replace the component usage
    content = content.replace(/<SEOHead\b/g, '<SEOHeadNative');
    content = content.replace(/<\/SEOHead>/g, '</SEOHeadNative>');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
    }
  }
});

console.log(`Updated ${count} files.`);
