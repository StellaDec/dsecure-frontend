const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Replace ### Header with <h3>Header</h3>
tsContent = tsContent.replace(/^### (.*)$/gm, '<h3>$1</h3>');

// Replace ## Header with <h2>Header</h2>
tsContent = tsContent.replace(/^## (.*)$/gm, '<h2>$1</h2>');

// Convert hyphen lists to ul/li
// This regex looks for paragraphs that contain hyphens and wraps them if needed. 
// However, the previous script might have wrapped "- item" inside <p>.
// Let's replace <p>- (.*?)</p> with <li>$1</li>
// And wrap consecutive <li>s in <ul>.

tsContent = tsContent.replace(/<p>- (.*?)<br>- (.*?)<\/p>/g, (match, p1, p2) => {
    // Some were split by <br>- 
    let items = match.replace(/<p>- /, '').replace(/<\/p>/, '').split(/<br>- /);
    let ul = '<ul>\n' + items.map(i => `  <li>${i}</li>`).join('\n') + '\n</ul>';
    return ul;
});

// Single bullet points might be like <p>- Item</p>
tsContent = tsContent.replace(/<p>- (.*?)<\/p>/g, '<ul><li>$1</li></ul>');
// Merge consecutive uls
tsContent = tsContent.replace(/<\/ul>\n<ul>/g, '\n');

fs.writeFileSync(tsPath, tsContent, 'utf8');
console.log('Markdown headers and lists converted to HTML tags.');
