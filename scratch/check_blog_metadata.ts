import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\src\\data\\blogPosts.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Regex to find titles and descriptions in the blogPosts array
const titleRegex = /title:\s*["'](.*?)["']/g;
const descRegex = /description:\s*["'](.*?)["']/g;

let match;
const longTitles = [];
const longDescs = [];

while ((match = titleRegex.exec(content)) !== null) {
    if (match[1].length + " | D-Secure Blog".length > 60) {
        longTitles.push({ length: match[1].length + 17, text: match[1] });
    }
}

while ((match = descRegex.exec(content)) !== null) {
    if (match[1].length > 155) {
        longDescs.push({ length: match[1].length, text: match[1] });
    }
}

console.log(`Found ${longTitles.length} blog titles that will be too long (>60).`);
console.log(`Found ${longDescs.length} blog descriptions that are too long (>155).`);

if (longTitles.length > 0) console.log('Sample Long Title:', longTitles[0]);
if (longDescs.length > 0) console.log('Sample Long Desc:', longDescs[0]);
