const fs = require('fs');

const content = fs.readFileSync('src/components/blog/BlogRegistry.ts', 'utf8');
const lines = content.split('\n');

const outLines = [];
let inRegistry = false;
const seenKeys = new Set();

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('export const BlogRegistry')) {
        inRegistry = true;
        outLines.push(line);
        continue;
    }
    
    if (inRegistry) {
        if (line.trim() === '};') {
            inRegistry = false;
            outLines.push(line);
            continue;
        }
        
        const match = line.match(/^\s*'([^']+)':\s*(.*)$/);
        if (match) {
            const key = match[1];
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                outLines.push(line);
            }
        } else {
            outLines.push(line);
        }
    } else {
        outLines.push(line);
    }
}

fs.writeFileSync('src/components/blog/BlogRegistry.ts', outLines.join('\n'));
console.log('Deduplicated BlogRegistry.ts');
