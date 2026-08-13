const fs = require('fs');

function repairFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (filePath.includes('PrivacyActAUBlog')) {
    content = content.replace(/maximum of \\\/>\.1 million to \\[\s\S]*?maximum of \\\$2\.1 million to \\\$10/, 'maximum of $2.1 million to $10');
    content = content.replace(/maximum of \\[\s\S]*?maximum of \\\$10/, 'maximum of $10');
  }

  if (filePath.includes('HIPAABlog')) {
    content = content.replace(/up to \\\/>0,000[\s\S]*?up to \\\$50,000/, 'up to $50,000');
    content = content.replace(/up to \\[\s\S]*?up to \\\$1\.5/, 'up to $1.5');
  }

  if (filePath.includes('PIPEDABlog')) {
    content = content.replace(/fine of up to \\\/>00,000[\s\S]*?fine of up to \\\$100,000/, 'fine of up to $100,000');
    content = content.replace(/can reach up to \\[\s\S]*?can reach up to \\\$100,000/, 'can reach up to $100,000');
  }

  if (filePath.includes('DPDPBlog')) {
    // Let's first check what DPDPBlog has
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

repairFile('src/components/blog/PrivacyActAUBlog.tsx');
repairFile('src/components/blog/HIPAABlog.tsx');
repairFile('src/components/blog/PIPEDABlog.tsx');
console.log('Repaired files');
