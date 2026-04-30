import * as fs from 'fs';
import * as path from 'path';

const dir = 'src/utils';
const files = fs.readdirSync(dir).filter(f => f.startsWith('seo') && f.endsWith('.ts'));

const descriptions: Record<string, {file: string, key: string}[]> = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  
  // Try to find the key and its description
  const lines = content.split('\n');
  let currentKey = '';
  
  lines.forEach(line => {
    // Match key like "key": { or key: {
    const keyMatch = line.match(/^\s*["']?([\w-/]+)["']?:\s*{/);
    if (keyMatch) {
      currentKey = keyMatch[1];
    }
    
    const descMatch = line.match(/description:\s*["'`](.*?)["'`],?/);
    if (descMatch && currentKey) {
      const desc = descMatch[1].trim();
      if (!descriptions[desc]) {
        descriptions[desc] = [];
      }
      descriptions[desc].push({file, key: currentKey});
    }
  });
});

console.log("Duplicate Meta Descriptions Found:");
let found = false;
for (const [desc, sources] of Object.entries(descriptions)) {
  if (sources.length > 1) {
    // Check if they are actually different pages
    const uniqueKeys = new Set(sources.map(s => `${s.file}:${s.key}`));
    if (uniqueKeys.size > 1) {
      console.log(`- Description: "${desc}"`);
      sources.forEach(s => {
        console.log(`  Source: ${s.file} | Key: ${s.key}`);
      });
      console.log('---');
      found = true;
    }
  }
}

if (!found) {
  console.log("No duplicate meta descriptions found across different pages.");
}
