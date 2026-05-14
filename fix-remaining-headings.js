import fs from 'fs';

const issuesFile = 'html-structure-issues.json';
const results = JSON.parse(fs.readFileSync(issuesFile, 'utf8'));

let fixedCount = 0;

for (const result of results) {
  const filePath = result.file;
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const issue of result.issues) {
    if (issue.includes('jumped from h1 to h4')) {
      content = content.replace(/<h4/g, '<h2')
                       .replace(/<\/h4>/g, '</h2>')
                       .replace(/<h5/g, '<h3')
                       .replace(/<\/h5>/g, '</h3>')
                       .replace(/<h6/g, '<h4')
                       .replace(/<\/h6>/g, '</h4>');
      changed = true;
    } else if (issue.includes('jumped from h2 to h5')) {
      content = content.replace(/<h5/g, '<h3')
                       .replace(/<\/h5>/g, '</h3>')
                       .replace(/<h6/g, '<h4')
                       .replace(/<\/h6>/g, '</h4>');
      changed = true;
    } else if (issue.includes('jumped from h3 to h5')) {
      content = content.replace(/<h5/g, '<h4')
                       .replace(/<\/h5>/g, '</h4>')
                       .replace(/<h6/g, '<h5')
                       .replace(/<\/h6>/g, '</h5>');
      changed = true;
    } else if (issue.includes('jumped from h1 to h5')) {
      content = content.replace(/<h5/g, '<h2')
                       .replace(/<\/h5>/g, '</h2>')
                       .replace(/<h6/g, '<h3')
                       .replace(/<\/h6>/g, '</h3>');
      changed = true;
    } else if (issue.includes('jumped from h2 to h4') || issue.includes('jumped from h1 to h3')) {
      // Re-run the fix logic from before just in case
      if (issue.includes('jumped from h2 to h4')) {
        content = content.replace(/<h4/g, '<h3')
                         .replace(/<\/h4>/g, '</h3>')
                         .replace(/<h5/g, '<h4')
                         .replace(/<\/h5>/g, '</h4>')
                         .replace(/<h6/g, '<h5')
                         .replace(/<\/h6>/g, '</h5>');
        changed = true;
      }
      if (issue.includes('jumped from h1 to h3')) {
        content = content.replace(/<h3/g, '<h2')
                         .replace(/<\/h3>/g, '</h2>')
                         .replace(/<h4/g, '<h3')
                         .replace(/<\/h4>/g, '</h3>')
                         .replace(/<h5/g, '<h4')
                         .replace(/<\/h5>/g, '</h4>')
                         .replace(/<h6/g, '<h5')
                         .replace(/<\/h6>/g, '</h5>');
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
}

console.log(`Successfully fixed heading hierarchies in ${fixedCount} more files.`);
