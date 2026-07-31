/**
 * Blog Visibility Fix Script v2
 * Pehle script ne miss kiye patterns ko fix karta hai:
 * 1. bg-white ... text-white (different class ordering)
 * 2. text-slate-200 on white/light backgrounds
 * 3. text-white/80 on white backgrounds
 * 4. CTA button variant with hover:to-slate-600
 * 5. CTA text-[#5a6672] on dark bg-[#0a2e1e]
 * 6. Broken class like bg-[#f4fbf8]0
 */

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');

const skipFiles = [
  'BlogPostTemplate.tsx',
  'BlogFooterStandard.tsx',
  'BlogPage.tsx',
  'BlogRegistry.ts',
  'EngagementSection.tsx',
  'blogPosts.ts',
  'blogFaqs.ts',
  'BlogRoutes.tsx',
];

let totalChanges = 0;
let filesChanged = 0;

const files = fs.readdirSync(blogDir).filter(f => 
  f.endsWith('.tsx') && !skipFiles.includes(f)
);

console.log(`\n🔍 ${files.length} blog files scan ho rahe hain (v2)...\n`);

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let changeCount = 0;

  // === FIX 1: bg-white rounded-none p-6 text-white text-center → bg-[#0e7c66] ===
  const fix1 = /className="bg-white rounded-none p-6 text-white text-center"/g;
  const fix1m = content.match(fix1);
  if (fix1m) {
    content = content.replace(fix1, 'className="bg-[#0e7c66] rounded-none p-6 text-white text-center"');
    changeCount += fix1m.length;
  }

  // === FIX 2: bg-white rounded-none p-10 text-white (without shadow-none) ===
  const fix2 = /className="bg-white rounded-none p-10 text-white(?! text-center)([^"]*)"/g;
  const fix2m = content.match(fix2);
  if (fix2m) {
    content = content.replace(fix2, 'className="bg-[#0e7c66] rounded-none p-10 text-white$1"');
    changeCount += fix2m.length;
  }

  // === FIX 3: CTA button bg-white text-white with hover:to-slate-600 ===
  const fix3 = /className="inline-block bg-white text-white px-8 py-4 rounded-none font-semibold hover:from-\[#0e7c66\] hover:to-slate-600 transition-all text-lg"/g;
  const fix3m = content.match(fix3);
  if (fix3m) {
    content = content.replace(fix3, 'className="inline-block bg-white text-[#0e7c66] px-8 py-4 rounded-none font-semibold hover:bg-slate-100 transition-all text-lg"');
    changeCount += fix3m.length;
  }

  // === FIX 4: Broken class bg-[#f4fbf8]0 → bg-[#0e7c66] ===
  const fix4 = /bg-\[#f4fbf8\]0/g;
  const fix4m = content.match(fix4);
  if (fix4m) {
    content = content.replace(fix4, 'bg-[#0e7c66]');
    changeCount += fix4m.length;
  }

  // === FIX 5: CTA subtitle text-[#5a6672] inside dark bg-[#0a2e1e] sections ===
  // Yeh tricky hai — hum pattern match karenge jahan line 395 jaisi pattern ho
  // bg-[#0a2e1e] ke andar text-[#5a6672] mb-12 → text-white/80 mb-12
  // Manual approach: find `text-[#5a6672] mb-12` (CTA subtitle specific)
  // This is CTA-specific: text-xl text-[#5a6672] mb-12 → only in CTA sections
  const fix5 = /className="text-xl text-\[#5a6672\] mb-12"/g;
  const fix5m = content.match(fix5);
  if (fix5m) {
    content = content.replace(fix5, 'className="text-xl text-white/80 mb-12"');
    changeCount += fix5m.length;
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    filesChanged++;
    totalChanges += changeCount;
    console.log(`✅ ${file} — ${changeCount} fix(es) applied`);
  }
}

console.log(`\n🎯 Total: ${filesChanged} files mein ${totalChanges} fixes apply huye.\n`);
