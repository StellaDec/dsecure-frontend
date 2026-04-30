import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\src\\data\\blogPosts.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const titleRegex = /title:\s*["'](.*?)["']/g;
let match;

while ((match = titleRegex.exec(content)) !== null) {
    if (match[1].length + 17 > 60) {
        console.log(`Title: "${match[1]}" (${match[1].length + 17} chars)`);
    }
}
