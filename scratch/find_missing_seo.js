import fs from 'fs';
import path from 'path';

const PAGE_SEO_PATHS = [
  'src/utils/seo.support.ts',
  'src/utils/seo.blog.ts',
  'src/utils/seo.products.ts',
  'src/utils/seo.manual.ts',
  'src/utils/seo.industries.ts',
  'src/utils/seo.ts'
];

function getAllSeoKeys() {
  const keys = new Set();
  PAGE_SEO_PATHS.forEach(p => {
    const fullPath = path.resolve(p);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/"([^"]+)": {/g);
      for (const match of matches) {
        keys.add(match[1]);
      }
      const singleQuoteMatches = content.matchAll(/'([^']+)': {/g);
      for (const match of singleQuoteMatches) {
        keys.add(match[1]);
      }
    }
  });
  return keys;
}

function findMissingSeoKeys(dir) {
  const seoKeys = getAllSeoKeys();
  const results = [];

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const matches = content.matchAll(/getSEOForPage\(["']([^"']+)["']\)/g);
        for (const match of matches) {
          const key = match[1];
          if (!seoKeys.has(key)) {
            results.push({ file: fullPath, key });
          }
        }
      }
    });
  }

  walk(dir);
  return results;
}

const missing = findMissingSeoKeys('src');
console.log(JSON.stringify(missing, null, 2));
