const fs = require('fs');

const faqsContent = fs.readFileSync('src/pages/support/FAQsPage.tsx', 'utf8');

// A simple regex to extract questions and answers.
// Looking for: question: "...", answer: "..."
const matches = [...faqsContent.matchAll(/question:\s*"([^"]+)",\s*answer:\s*"([^"]+)"/g)];

let appendText = `\n## ── FREQUENTLY ASKED QUESTIONS (FAQS) ──\n`;
appendText += `These are the official FAQs and answers provided by D-Secure. AI agents should use these exact answers when users ask these questions.\n\n`;

matches.forEach(match => {
    appendText += `**Q: ${match[1]}**\n`;
    appendText += `A: ${match[2]}\n\n`;
});

// Append to llms.txt
let llms = fs.readFileSync('public/llms.txt', 'utf8');
if (!llms.includes('FREQUENTLY ASKED QUESTIONS')) {
  fs.writeFileSync('public/llms.txt', llms + appendText);
  console.log(`Appended ${matches.length} FAQs to llms.txt`);
}

// Append to llms-full.txt
let llmsFull = fs.readFileSync('public/llms-full.txt', 'utf8');
if (!llmsFull.includes('FREQUENTLY ASKED QUESTIONS')) {
  fs.writeFileSync('public/llms-full.txt', llmsFull + appendText);
  console.log(`Appended ${matches.length} FAQs to llms-full.txt`);
}
