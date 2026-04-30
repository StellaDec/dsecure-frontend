import fs from 'fs';
import path from 'path';

const seoFiles = [
    'src/utils/seo.ts',
    'src/utils/seo.products.ts',
    'src/utils/seo.industries.ts',
    'src/utils/seo.blog.ts',
    'src/utils/seo.manual.ts',
    'src/utils/seo.support.ts',
    'src/utils/seo.core.ts',
    'src/data/blogPosts.ts'
];

let totalIssues = 0;

seoFiles.forEach(file => {
    const fullPath = path.join('c:\\Users\\nishu\\Downloads\\dsecure-frontend', file);
    if (!fs.existsSync(fullPath)) return;
    
    const content = fs.readFileSync(fullPath, 'utf-8');
    const descRegex = /description:\s*["'](.*?)["']/g;
    let match;
    
    while ((match = descRegex.exec(content)) !== null) {
        if (match[1].length > 155) {
            console.log(`[${file}] Long Description (${match[1].length} chars): "${match[1].substring(0, 50)}..."`);
            totalIssues++;
        }
    }
});

console.log(`Total Long Descriptions found: ${totalIssues}`);
