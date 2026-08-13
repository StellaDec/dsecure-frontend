const fs = require('fs');

const path = 'src/data/blogPosts.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'title: "GDPR EU Compliance Guide: Requirements, Rights & Best Practices"',
  'title: "GDPR (EU) Compliance"'
);

content = content.replace(
  'title: "New York Privacy Act 2021: An Insight"',
  'title: "New York Privacy Act 2021"'
);

content = content.replace(
  'title: "CCPA Explained: Understanding the California Consumer Privacy Act"',
  'title: "Basics of CCPA"'
);

fs.writeFileSync(path, content, 'utf8');

// Now update the components
const components = [
  { 
    file: 'src/components/blog/GDPRBlog.tsx', 
    oldTitle: 'GDPR EU Compliance Guide: Requirements, Rights & Best Practices', 
    newTitle: 'GDPR (EU) Compliance' 
  },
  { 
    file: 'src/components/blog/NYPABlog.tsx', 
    oldTitle: 'New York Privacy Act 2021: An Insight', 
    newTitle: 'New York Privacy Act 2021' 
  },
  { 
    file: 'src/components/blog/CCPABlog.tsx', 
    oldTitle: 'CCPA Explained: Understanding the California Consumer Privacy Act', 
    newTitle: 'Basics of CCPA' 
  },
];

components.forEach(comp => {
  let compContent = fs.readFileSync(comp.file, 'utf8');
  compContent = compContent.replace(comp.oldTitle, comp.newTitle);
  fs.writeFileSync(comp.file, compContent, 'utf8');
});

console.log('Fixed titles');
