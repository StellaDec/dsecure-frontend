
import fs from 'fs';
import path from 'path';

const PAGES_DIR = 'c:/Users/nishu/Downloads/dsecure-frontend/src/pages';
const MIN_H1_LENGTH = 20;

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(PAGES_DIR, []);
const results = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const matches = [...content.matchAll(h1Regex)];

  if (matches.length === 0) {
    results.push({
      file: path.relative(PAGES_DIR, file),
      status: 'MISSING',
      h1Count: 0
    });
  } else {
    matches.forEach(match => {
      const h1Text = match[1].replace(/<[^>]*>/g, '').trim();
      // Ignore H1s that use variables like {title} as they might be dynamic
      if (h1Text.includes('{') && h1Text.includes('}')) {
        return;
      }
      
      if (h1Text.length < MIN_H1_LENGTH) {
        results.push({
          file: path.relative(PAGES_DIR, file),
          status: 'TOO_SHORT',
          h1Text: h1Text,
          length: h1Text.length
        });
      }
    });
  }
});

console.log(JSON.stringify(results, null, 2));
