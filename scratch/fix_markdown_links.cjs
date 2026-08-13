const fs = require('fs');
const path = require('path');

const lawsDir = path.join(__dirname, '../laws');
const files = fs.readdirSync(lawsDir);

const oldTextRegex = /## Official Regulatory Reference[\s\S]*?- \[Visit our Trust Center\]\(\/trust-center\)/;

const newText = `## Official Regulatory Reference

For the most accurate, authentic, and up-to-date legal text, we highly recommend consulting the official legislative documentation provided by the respective regional government or data protection authority. Relying on the official source of truth is the best way to ensure full compliance.

## Streamlining Compliance with D-Secure Solutions

Meeting strict data sanitization requirements doesn't have to be a manual, error-prone process. Our [enterprise data sanitization solutions](/solutions) are purpose-built to help organizations seamlessly meet these strict regulatory mandates. 

By utilizing [D-Secure Drive Eraser](/products/drive-eraser), your organization can permanently wipe sensitive data and automatically generate tamper-proof erasure certificates. This creates a rigorous, verifiable audit trail that satisfies regulatory bodies and eliminates the risk of data leaks.`;

let modifiedCount = 0;

for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(lawsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (oldTextRegex.test(content)) {
        content = content.replace(oldTextRegex, newText);
        fs.writeFileSync(filePath, content, 'utf-8');
        modifiedCount++;
        console.log(`Replaced links in ${file}`);
    } else {
        console.log(`Skipping ${file}, old text not found.`);
    }
}

console.log(`Successfully modified ${modifiedCount} files.`);
