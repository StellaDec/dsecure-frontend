const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/blog/GDPRBlog.tsx',
  'src/components/blog/CCPABlog.tsx',
  'src/components/blog/NYPABlog.tsx'
];

filesToFix.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  let content = fs.readFileSync(absolutePath, 'utf8');

  // Fix imports
  content = content.replace(
    'import { ThemeSection, Reveal } from "@/components/ui/Theme";',
    'import Reveal from "@/components/Reveal";\nimport { Link } from "react-router-dom";'
  );

  // Replace ThemeSection block with proper header block
  content = content.replace(
    /<ThemeSection\s+title="([^"]+)"\s+subtitle="([^"]+)"\s+align="center"\s+className="pb-0"\s*\/>/,
    `<section className="py-16 bg-white shadow-none border-b border-[#d0d5dc]/40">
          <Reveal>
            <div className="text-center px-6 max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1 text-sm font-bold text-[#0e7c66] bg-[#d4ede4] rounded-none mb-6">
                Compliance
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
                $1
              </h1>
              <p className="text-xl text-[#5a6672] leading-relaxed">
                $2
              </p>
            </div>
          </Reveal>
        </section>`
  );

  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log('Fixed', filePath);
});
