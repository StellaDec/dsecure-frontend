import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\src\\utils\\seo.manual.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// The specific long template
const oldTemplateSuffix = "for D-Secure data erasure software. Learn step-by-step procedures, compliance requirements, and best practices for enterprise data sanitization.";
const newTemplateSuffix = "for D-Secure. Learn step-by-step procedures, compliance, and best practices for enterprise data sanitization.";

// Use a regex to capture the guide name and replace the description
// We look for: description: "Comprehensive [Name] [oldTemplateSuffix]"
// And replace with: description: "[Name] [newTemplateSuffix]"

const regex = /description:\s*"Comprehensive (.*?) for D-Secure data erasure software\. Learn step-by-step procedures, compliance requirements, and best practices for enterprise data sanitization\."/g;

const updatedContent = content.replace(regex, (match, name) => {
    return `description: "${name} for D-Secure. Learn step-by-step procedures, compliance, and best practices for enterprise data sanitization."`;
});

if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log("Successfully updated seo.manual.ts with shorter descriptions.");
} else {
    console.log("No matches found for the template.");
}
