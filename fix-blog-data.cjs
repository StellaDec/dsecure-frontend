const fs = require('fs');

const path = 'src/data/blogPosts.ts';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{\s*id:\s*"gdpr-compliance"[\s\S]*?\}\s*\];\s*$/m;

const replacement = `{
    id: "gdpr-compliance",
    slug: "gdpr-compliance",
    title: "GDPR EU Compliance Guide: Requirements, Rights & Best Practices",
    excerpt: "Gain understanding of GDPR, its objectives, scope, and key principles, while learning how to protect customer data and avoid costly non-compliance fines.",
    category: "Compliance",
    link: "/blog/gdpr-compliance",
    tag: "Data Privacy Law",
    keywords: "compliance, regulations, GDPR",
    publishDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: "5 min read",
    author: "D-Secure Data Privacy Team",
    image: "https://images.unsplash.com/photo-1505664159856-f5605d3bdfdb?auto=format&fit=crop&q=80"
  },
  {
    id: "nypa-compliance",
    slug: "nypa-compliance",
    title: "New York Privacy Act 2021: An Insight",
    excerpt: "An insight into the proposed New York Privacy law- it's purpose, key provisions & penalties that safeguard consumer data privacy and data protection in New York.",
    category: "Compliance",
    link: "/blog/nypa-compliance",
    tag: "Data Privacy Law",
    keywords: "compliance, regulations, NYPA",
    publishDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: "5 min read",
    author: "D-Secure Data Privacy Team",
    image: "https://images.unsplash.com/photo-1505664159856-f5605d3bdfdb?auto=format&fit=crop&q=80"
  },
  {
    id: "ccpa-compliance",
    slug: "ccpa-compliance",
    title: "CCPA Explained: Understanding the California Consumer Privacy Act",
    excerpt: "Read about California Consumer Privacy Act (CCPA), which took effect on January 1 2020, and comes with its own set of rules and headaches.",
    category: "Compliance",
    link: "/blog/ccpa-compliance",
    tag: "Data Privacy Law",
    keywords: "compliance, regulations, CCPA",
    publishDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: "5 min read",
    author: "D-Secure Data Privacy Team",
    image: "https://images.unsplash.com/photo-1505664159856-f5605d3bdfdb?auto=format&fit=crop&q=80"
  }
];
`;

content = content.replace(regex, replacement);
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed missing fields in blogPosts.ts');
