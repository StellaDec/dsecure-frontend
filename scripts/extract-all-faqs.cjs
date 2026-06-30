const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles('src');
let allFaqs = new Map(); // using Map to avoid duplicates by question

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match both 'question' and 'answer' properties within an object.
  // The regex tries to match `{ ... question: "...", ... answer: "...", ... }`
  // Because it's hard to parse JS objects perfectly with Regex, we'll try a generous approach.
  
  // Strategy 1: Match `question: "..."` and `answer: "..."` sequentially or vice-versa, or just match them globally in the file if they are in an array.
  // Let's use a regex that captures `question:\s*['"`](.*?)['"`]` and `answer:\s*['"`](.*?)['"`]` 
  // It's better to capture them if they are close.
  
  // Alternative strategy: just extract any string assigned to `question:` and `answer:`
  const questionMatches = [...content.matchAll(/(?:question|q):\s*(["'`])(.*?)\1/gi)];
  const answerMatches = [...content.matchAll(/(?:answer|a):\s*(["'`])([\s\S]*?)\1/gi)];
  
  // If a file has equal number of questions and answers, assume they match 1:1 in order
  if (questionMatches.length > 0 && questionMatches.length === answerMatches.length) {
    for (let i = 0; i < questionMatches.length; i++) {
        const q = questionMatches[i][2].trim().replace(/\n/g, ' ');
        const a = answerMatches[i][2].trim().replace(/\n/g, ' ');
        if (q && a && !allFaqs.has(q)) {
            allFaqs.set(q, a);
        }
    }
  }
});

let appendText = `\n## ── EXTENDED FREQUENTLY ASKED QUESTIONS (FAQS) ──\n`;
appendText += `Below is the complete database of ${allFaqs.size} FAQs gathered from all products, solutions, and manuals across D-Secure:\n\n`;

for (const [q, a] of allFaqs.entries()) {
    appendText += `**Q: ${q}**\n`;
    appendText += `A: ${a}\n\n`;
}

console.log(`Found a total of ${allFaqs.size} unique FAQs across the codebase.`);

// Append to llms.txt
let llms = fs.readFileSync('public/llms.txt', 'utf8');
// Remove the previous FAQ section to prevent duplication
llms = llms.replace(/\n## ── FREQUENTLY ASKED QUESTIONS \(FAQS\) ──\n[\s\S]*?(?=\n##|$)/g, '');
fs.writeFileSync('public/llms.txt', llms + appendText);

// Append to llms-full.txt
let llmsFull = fs.readFileSync('public/llms-full.txt', 'utf8');
// Remove the previous FAQ section to prevent duplication
llmsFull = llmsFull.replace(/\n## ── FREQUENTLY ASKED QUESTIONS \(FAQS\) ──\n[\s\S]*?(?=\n##|$)/g, '');
fs.writeFileSync('public/llms-full.txt', llmsFull + appendText);
