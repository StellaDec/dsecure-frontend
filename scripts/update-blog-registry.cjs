const fs = require('fs');
const path = require('path');

const registrySnippet = fs.readFileSync(path.join(__dirname, 'blog-registry-snippet.txt'), 'utf8');

const registryFile = path.join(__dirname, '..', 'src', 'components', 'blog', 'BlogRegistry.ts');
let registryContent = fs.readFileSync(registryFile, 'utf8');

// Find the last occurrence of }; in BlogRegistry.ts
const lastBraceIndex = registryContent.lastIndexOf('};');
if (lastBraceIndex !== -1) {
  registryContent = registryContent.slice(0, lastBraceIndex) + registrySnippet + registryContent.slice(lastBraceIndex);
  fs.writeFileSync(registryFile, registryContent);
  console.log('BlogRegistry.ts updated successfully!');
} else {
  console.error('Could not find closing brace in BlogRegistry.ts');
}
