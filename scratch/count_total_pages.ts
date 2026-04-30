import fs from 'fs';
import path from 'path';

const seoFiles = [
    'src/utils/seo.ts',
    'src/utils/seo.products.ts',
    'src/utils/seo.blog.ts',
    'src/utils/seo.manual.ts',
    'src/utils/seo.industries.ts',
    'src/utils/seo.support.ts'
];

const basePath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend';
let totalPages = 0;

seoFiles.forEach(file => {
    const filePath = path.join(basePath, file);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    // Simple regex to count keys in the exported objects
    // This is an approximation based on the pattern: "key": {
    const matches = content.match(/^\s*"(.*?)":\s*{/gm);
    if (matches) {
        console.log(`${file}: ${matches.length} pages`);
        totalPages += matches.length;
    }
});

console.log(`\nTotal pages across all SEO registries: ${totalPages}`);
