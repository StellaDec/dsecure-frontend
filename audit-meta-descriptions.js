import fs from 'fs';
import path from 'path';

const searchDirs = ['src'];
const MAX_LENGTH = 160;
const results = [];

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = searchDirs.flatMap(walkDir);

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to find description matches in various formats:
  // 1. description="long text"
  // 2. description: "long text"
  // 3. <SEOHead ... description={"long text"} />
  
  const regexes = [
    /description=["']([^"']{161,})["']/g,
    /description:\s*["']([^"']{161,})["']/g,
    /description:\s*`([^`]{161,})`/g,
    /description=\{["']([^"']{161,})["']\}/g
  ];

  regexes.forEach(regex => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const desc = match[1];
      const linesUntilMatch = content.substring(0, match.index).split('\n');
      const lineNumber = linesUntilMatch.length;
      
      results.push({
        file: filePath,
        line: lineNumber,
        length: desc.length,
        description: desc.substring(0, 100) + '...'
      });
    }
  });
}

fs.writeFileSync('meta-description-audit.json', JSON.stringify(results, null, 2));
console.log(`Audit complete. Found ${results.length} descriptions exceeding ${MAX_LENGTH} characters.`);
console.log('Results saved to meta-description-audit.json');
