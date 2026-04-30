import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\src\\utils\\seo.manual.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /description:\s*"(.*?)",/g;
let match;
const longDescriptions = [];

while ((match = regex.exec(content)) !== null) {
    if (match[1].length > 160) {
        longDescriptions.push({
            line: content.substring(0, match.index).split('\n').length,
            length: match[1].length,
            text: match[1]
        });
    }
}

console.log(`Found ${longDescriptions.length} descriptions over 160 characters.`);
if (longDescriptions.length > 0) {
    console.log('Sample:', longDescriptions[0]);
}
