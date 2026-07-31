const fs = require('fs');
const path = require('path');
const dir = 'src/components/blog';
const files = ['BlogPage.tsx', 'EngagementSection.tsx', 'EnquiryForm.tsx', 'HowToEraseMacBlog.tsx', 'IEEE2883ComplianceBlog.tsx'];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<svg')) {
      content = content.replace(/<svg[^>]*>[\s\S]*?<\/svg>/g, '<Check className=\"w-6 h-6\" />');
      
      let hasLucideImport = content.includes('from \"lucide-react\"') || content.includes("from 'lucide-react'");
      if (hasLucideImport) {
          if (!content.includes('Check')) {
              content = content.replace(/import\s+{([^}]+)}\s+from\s+["']lucide-react["'];?/, 'import { $1, Check } from \"lucide-react\";');
          }
      } else {
          content = content.replace(/(import React[^;]*;)/, '$1\nimport { Check } from \"lucide-react\";');
      }

      fs.writeFileSync(filePath, content);
  }
});
console.log('Force replaced all remaining SVGs with Check icon.');
