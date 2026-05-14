import fs from 'fs';
import path from 'path';

const directoriesToScan = ['src/components/blog', 'src/pages'];

function scanDirectory(dir, results) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (fullPath.endsWith('.tsx')) {
      // Exclude components that are clearly not standalone pages
      const lower = fullPath.toLowerCase();
      if (lower.includes('components') && !lower.includes('blog\\') && !lower.includes('blog/')) {
        continue;
      }
      if (item === 'SEOHead.tsx' || item === 'Reveal.tsx' || item === 'FlatIcons.tsx' || item.includes('Section') || item.includes('Footer') || item.includes('Header')) {
        continue;
      }
      
      analyzeFile(fullPath, results);
    }
  }
}

function analyzeFile(filePath, results) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Exclude files that are too small or just export a small component
  if (content.length < 500) return;

  const h1Match = content.match(/<h1[\s>]/g);
  const h1Count = h1Match ? h1Match.length : 0;
  
  const pMatch = content.match(/<p[\s>]/g);
  const pCount = pMatch ? pMatch.length : 0;
  
  const issues = [];
  
  if (h1Count === 0) {
    issues.push('Missing <h1> tag');
  } else if (h1Count > 1) {
    issues.push(`Multiple <h1> tags (${h1Count} found)`);
  }
  
  if (pCount === 0) {
    issues.push('Missing <p> tags (Content might be using divs instead of paragraphs)');
  }

  // Extract all headings in order to check for skipping
  const headingRegex = /<h([1-6])[\s>]/g;
  let match;
  const headings = [];
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(parseInt(match[1]));
  }
  
  let skippedHeading = false;
  let prevHeading = 0; // 0 means no heading yet
  
  for (const h of headings) {
    if (prevHeading !== 0 && h > prevHeading + 1) {
      skippedHeading = true;
      issues.push(`Skipped heading level (jumped from h${prevHeading} to h${h})`);
      break; // Only report once per file to avoid noise
    }
    prevHeading = h;
  }

  if (issues.length > 0) {
    results.push({ file: filePath, issues });
  }
}

const results = [];
for (const dir of directoriesToScan) {
  scanDirectory(dir, results);
}

// Write results to a JSON file for easy reading
fs.writeFileSync('html-structure-issues.json', JSON.stringify(results, null, 2));
console.log(`Scanned files. Found issues in ${results.length} files.`);
