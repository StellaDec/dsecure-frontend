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

seoFiles.forEach(file => {
    const filePath = path.join(basePath, file);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /title:\s*"(.*?)",/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        const title = match[1];
        if (title.length < 30 || title.length > 60) {
            console.log(`[${file}] Line ${content.substring(0, match.index).split('\n').length} (${title.length} chars): ${title}`);
        }
    }
});
