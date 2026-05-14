import fs from 'fs';
import path from 'path';

const searchDirs = ['src'];
const issues = [];

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = searchDirs.flatMap(walkDir);

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all <a> and <Link> tags
  // This regex grabs <a ...>...</a> and <Link ...>...</Link>
  const linkRegex = /<(a|Link)([\s\S]*?)>([\s\S]*?)<\/\1>/g;
  let match;
  
  const fileIssues = [];
  
  while ((match = linkRegex.exec(content)) !== null) {
    const tag = match[1];
    const attrs = match[2];
    const innerHtml = match[3];
    
    // Check for accessible attributes
    const hasAriaLabel = /aria-label=["']([^"']+)["']/.test(attrs);
    const hasTitle = /title=["']([^"']+)["']/.test(attrs);
    
    // Check for dynamic attributes like aria-label={something}
    const hasDynamicAriaLabel = /aria-label=\{.*?\}/.test(attrs);
    const hasDynamicTitle = /title=\{.*?\}/.test(attrs);
    
    // Remove all html tags (like <svg>, <span>) to check if there is plain text inside
    const noComments = innerHtml.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // Strip JSX comments
    const textContent = noComments.replace(/<[^>]*>/g, '').trim();
    
    // Sometimes text is dynamic like {title} or {"something"}. We consider any non-empty {} as potential text
    const hasDynamicText = /\{[^}]+\}/.test(noComments);
    
    // Check if there's an image with an alt tag that isn't empty
    const imgAltMatch = /<img[^>]+alt=["']([^"']*)["']/.exec(innerHtml);
    const hasValidImgAlt = imgAltMatch ? imgAltMatch[1].trim() !== '' : false;

    // We consider it missing if it has NO text content, NO dynamic text, NO aria-label, NO title, and NO valid img alt.
    if (!textContent && !hasDynamicText && !hasAriaLabel && !hasTitle && !hasDynamicAriaLabel && !hasDynamicTitle && !hasValidImgAlt) {
      
      const linesUntilMatch = content.substring(0, match.index).split('\n');
      const lineNumber = linesUntilMatch.length;
      
      // Basic context of the tag
      const snippet = match[0].substring(0, 80).replace(/\n/g, ' ') + '...';
      
      fileIssues.push(`Line ${lineNumber}: Missing anchor text -> ${snippet}`);
    }
  }
  
  if (fileIssues.length > 0) {
    issues.push({
      file: filePath,
      issues: fileIssues
    });
  }
}

fs.writeFileSync('missing-anchor-text.json', JSON.stringify(issues, null, 2));
console.log(`Scanned files. Found missing anchor text issues in ${issues.length} files. Report saved to missing-anchor-text.json`);
