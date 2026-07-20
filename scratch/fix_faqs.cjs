const fs = require('fs');
const content = fs.readFileSync('src/data/blogFaqs.ts', 'utf8');

let lines = content.split('\n');
let i = 0;

let before = [];
while (i < lines.length && !lines[i].includes('export const blogFaqs')) {
    before.push(lines[i]);
    i++;
}
before.push(lines[i]);
i++;

let inArray = false;
let arrayContent = '';
let key = null;

let parsedObj = {};

for (; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = line.match(/^\s*"([^"]+)":\s*\[\s*$/);
    
    if (keyMatch) {
        key = keyMatch[1];
        inArray = true;
        arrayContent = '[\n';
    } else if (inArray && line.match(/^\s*\],?\s*$/)) {
        arrayContent += ']';
        inArray = false;
        
        try {
            let arr = eval('(' + arrayContent + ')');
            if (!parsedObj[key]) {
                parsedObj[key] = [];
            }
            parsedObj[key] = parsedObj[key].concat(arr);
        } catch (e) {
            console.error('Failed to parse key:', key, e);
        }
    } else if (inArray) {
        arrayContent += line + '\n';
    } else if (line.trim() === '};' || line.trim() === '}') {
        break;
    }
}

let outLines = [...before];
const keys = Object.keys(parsedObj);
for (let j = 0; j < keys.length; j++) {
    const k = keys[j];
    outLines.push(`  "${k}": [`);
    
    const uniqueFaqs = [];
    const seen = new Set();
    for (const faq of parsedObj[k]) {
        if (!seen.has(faq.question)) {
            seen.add(faq.question);
            uniqueFaqs.push(faq);
        }
    }
    
    for (let x = 0; x < uniqueFaqs.length; x++) {
        const item = uniqueFaqs[x];
        outLines.push(`    {`);
        outLines.push(`      question: ${JSON.stringify(item.question)},`);
        outLines.push(`      answer: ${JSON.stringify(item.answer)}`);
        outLines.push(`    }${x === uniqueFaqs.length - 1 ? '' : ','}`);
    }
    outLines.push(`  ]${j === keys.length - 1 ? '' : ','}`);
}
outLines.push('};');
outLines.push(''); // newline at end

fs.writeFileSync('src/data/blogFaqs.ts', outLines.join('\n'));
console.log('Successfully deduplicated blogFaqs.ts');
