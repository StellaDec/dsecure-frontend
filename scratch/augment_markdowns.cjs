const fs = require('fs');
const path = require('path');

const lawsDir = path.join(__dirname, '../laws');
const files = fs.readdirSync(lawsDir);

const injectionText = `
## Official Regulatory Reference

For the most accurate, authentic, and up-to-date legal text, we highly recommend consulting the official legislative documentation provided by the respective regional government or data protection authority. Relying on the official source of truth is the best way to ensure full compliance.

## Streamlining Compliance with D-Secure Solutions

Meeting strict data sanitization requirements doesn't have to be a manual, error-prone process. **D-Secure Drive Eraser** and our suite of enterprise data sanitization tools are purpose-built to help organizations seamlessly meet these strict regulatory mandates. 

By utilizing our certified software, your organization can permanently wipe sensitive data and automatically generate tamper-proof erasure certificates. This creates a rigorous, verifiable audit trail that satisfies regulatory bodies and eliminates the risk of data leaks.

- [Explore D-Secure Solutions](/solutions)
- [Visit our Trust Center](/trust-center)
`;

let modifiedCount = 0;

for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(lawsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Make sure we don't inject multiple times
    if (content.includes('## Official Regulatory Reference')) {
        console.log(`Skipping ${file}, already injected.`);
        continue;
    }

    // Insert before ## Conclusion or ## Frequently Asked Questions
    // We will find the index of ## Conclusion, if not found, find ## Frequently Asked Questions
    let insertIndex = content.indexOf('\n## Conclusion');
    if (insertIndex === -1) {
        insertIndex = content.indexOf('\n## Frequently Asked Questions');
    }

    if (insertIndex !== -1) {
        content = content.slice(0, insertIndex) + '\n' + injectionText + '\n' + content.slice(insertIndex);
        fs.writeFileSync(filePath, content, 'utf-8');
        modifiedCount++;
        console.log(`Injected into ${file}`);
    } else {
        // If neither is found, append to the end
        content += '\n' + injectionText + '\n';
        fs.writeFileSync(filePath, content, 'utf-8');
        modifiedCount++;
        console.log(`Appended to end of ${file}`);
    }
}

console.log(`Successfully modified ${modifiedCount} files.`);
