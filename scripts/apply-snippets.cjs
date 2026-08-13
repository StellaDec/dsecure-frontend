const fs = require('fs');
const path = require('path');

const dataSnippet = fs.readFileSync(path.join(__dirname, 'blog-data-snippet.txt'), 'utf8');
const registrySnippet = fs.readFileSync(path.join(__dirname, 'blog-registry-snippet.txt'), 'utf8');

const postsFile = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
let postsContent = fs.readFileSync(postsFile, 'utf8');
postsContent = postsContent.replace('export const blogPosts: BlogPost[] = [', 'export const blogPosts: BlogPost[] = [\n' + dataSnippet + '\n');
fs.writeFileSync(postsFile, postsContent);

const registryFile = path.join(__dirname, '..', 'src', 'components', 'blog', 'BlogRegistry.ts');
let registryContent = fs.readFileSync(registryFile, 'utf8');
registryContent = registryContent.replace('};\n', registrySnippet + '};\n');
fs.writeFileSync(registryFile, registryContent);
console.log('Snippets applied!');
