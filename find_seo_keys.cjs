const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const keys = {};

walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to find getSEOForPage('some-key') or getSEOForPage("some-key")
  const regex = /getSEOForPage\(\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    if (!keys[key]) {
      keys[key] = [];
    }
    keys[key].push(path.relative(__dirname, filePath));
  }
});

fs.writeFileSync(path.join(__dirname, 'find_seo_keys_output.json'), JSON.stringify(keys, null, 2));
console.log("Done writing find_seo_keys_output.json");
