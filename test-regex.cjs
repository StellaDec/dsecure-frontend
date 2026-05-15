const fs = require('fs');
const src = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');
const slug = 'automate-data-erasure';
const titleMatch = src.match(new RegExp(`slug:\\s*['"\`]${slug}['"\`][\\s\\S]*?title:\\s*['"\`](.*?)['"\`]`));
console.log(titleMatch ? titleMatch[1] : 'fail');
