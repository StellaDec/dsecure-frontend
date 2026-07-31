const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'blog', 'HowToEraseMacBlog.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the first box
content = content.replace(
  /<div className="bg-white border border-\[#d0d5dc\] rounded-none p-6">\s*<div className="flex items-center mb-4">\s*<div className="w-12 h-12 bg-white rounded-none flex items-center justify-center mr-4">\s*<Check className="w-6 h-6" \/>/g,
  `<div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 shrink-0 bg-[#0e7c66] rounded-none flex items-center justify-center mr-4">
                      <X className="w-6 h-6 text-white" />`
);

// Replace the second box
content = content.replace(
  /<div className="bg-\[#f4fbf8\] border border-\[#d0d5dc\] rounded-none p-6">\s*<div className="flex items-center mb-4">\s*<div className="w-12 h-12 bg-\[#0e7c66\] rounded-none flex items-center justify-center mr-4">\s*<AlertTriangle className="w-6 h-6 inline mr-2 text-amber-500" \/>/g,
  `<div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 shrink-0 bg-[#0e7c66] rounded-none flex items-center justify-center mr-4">
                      <X className="w-6 h-6 text-white" />`
);

// Replace the third box
content = content.replace(
  /<div className="bg-purple-50 border border-\[#d0d5dc\] rounded-none p-6">\s*<div className="flex items-center mb-4">\s*<div className="w-12 h-12 bg-\[#0e7c66\] rounded-none flex items-center justify-center mr-4">\s*<Check className="w-6 h-6" \/>/g,
  `<div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 shrink-0 bg-[#0e7c66] rounded-none flex items-center justify-center mr-4">
                      <X className="w-6 h-6 text-white" />`
);

// Replace the fourth box
content = content.replace(
  /<div className="bg-sky-50 border border-\[#d0d5dc\] rounded-none p-6">\s*<div className="flex items-center mb-4">\s*<div className="w-12 h-12 bg-\[#0e7c66\] rounded-none flex items-center justify-center mr-4">\s*<Check className="w-6 h-6" \/>/g,
  `<div className="bg-[#f4fbf8] border border-[#d0d5dc] rounded-none p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 shrink-0 bg-[#0e7c66] rounded-none flex items-center justify-center mr-4">
                      <X className="w-6 h-6 text-white" />`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed HowToEraseMacBlog.tsx');
