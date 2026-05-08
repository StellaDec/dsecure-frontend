const fs = require('fs');
const path = 'c:/Users/nishu/Downloads/dsecure-frontend/src/pages/FreezeStatePage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Identify the markers
const markerStart = '{isDemoActive ? null : (';
const markerMiddle = ') : (';
const markerEnd = ')}';

const startIdx = content.indexOf(markerStart);
if (startIdx === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

// Find the middle marker after start
const middleIdx = content.indexOf(markerMiddle, startIdx);
if (middleIdx === -1) {
    console.error('Middle marker not found');
    process.exit(1);
}

// The preview block is between startIdx + markerStart.length and middleIdx
const previewBlock = content.substring(startIdx + markerStart.length, middleIdx).trim();

// Now find the end of the div block. 
// It starts at middleIdx + markerMiddle.length and ends at markerEnd.
// But there are many )} in the file. We want the one that balances the opening brace.
let endIdx = -1;
let openBraces = 1;
for (let i = startIdx + 1; i < content.length; i++) {
    if (content[i] === '{') openBraces++;
    if (content[i] === '}') openBraces--;
    if (openBraces === 0) {
        endIdx = i + 1;
        break;
    }
}

if (endIdx === -1) {
    console.error('End marker not found');
    process.exit(1);
}

// The demo block is between middleIdx + markerMiddle.length and endIdx - 2 (for the }) )
const demoBlock = content.substring(middleIdx + markerMiddle.length, endIdx - 2).trim();

const newContent = content.substring(0, startIdx) + 
    `{isDemoActive ? (
                ${demoBlock}
              ) : (
                ${previewBlock}
              )}` + 
    content.substring(endIdx);

fs.writeFileSync(path, newContent);
console.log('Fixed JSX structure successfully');
