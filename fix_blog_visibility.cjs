/**
 * Blog Visibility Fix Script
 * Saare blog files mein white-on-white text, non-theme backgrounds,
 * aur CTA button visibility issues fix karta hai.
 */

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'components', 'blog');

// Blog files jo fix karne hain (BlogPostTemplate, BlogFooterStandard, etc. ko skip karo)
const skipFiles = [
  'BlogPostTemplate.tsx',
  'BlogFooterStandard.tsx',
  'BlogPage.tsx',
  'BlogRegistry.ts',
  'EngagementSection.tsx',
  'blogPosts.ts',
  'blogFaqs.ts',
  'BlogRoutes.tsx',
  'FreeVsProEraserBlog.tsx',    // Yeh pehle fix ho chuka
  'SSDWipeBIOSBlog.tsx',        // Yeh pehle fix ho chuka
  'DataErasureForNonProfits.tsx', // Yeh pehle fix ho chuka
  'MacM1ErasureKnownIssues.tsx',  // Yeh pehle fix ho chuka
];

let totalChanges = 0;
let filesChanged = 0;

const files = fs.readdirSync(blogDir).filter(f => 
  f.endsWith('.tsx') && !skipFiles.includes(f)
);

console.log(`\n🔍 ${files.length} blog files scan ho rahe hain...\n`);

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let changeCount = 0;

  // === FIX 1: bg-white ... text-white containers → bg-[#0e7c66] ... text-white ===
  // Yeh containers white bg par white text daal rahe the — invisible text
  const whiteOnWhiteRegex = /className="bg-white rounded-none shadow-none p-10 mt-10 text-white"/g;
  const whiteOnWhiteMatches = content.match(whiteOnWhiteRegex);
  if (whiteOnWhiteMatches) {
    content = content.replace(whiteOnWhiteRegex, 'className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white"');
    changeCount += whiteOnWhiteMatches.length;
  }

  // === FIX 1b: bg-white rounded-none p-6 text-white → bg-[#0e7c66] rounded-none p-6 text-white ===
  const whiteOnWhite2 = /className="bg-white rounded-none p-6 text-white"/g;
  const whiteOnWhite2Matches = content.match(whiteOnWhite2);
  if (whiteOnWhite2Matches) {
    content = content.replace(whiteOnWhite2, 'className="bg-[#0e7c66] rounded-none p-6 text-white"');
    changeCount += whiteOnWhite2Matches.length;
  }

  // === FIX 1c: bg-white rounded-none p-6 text-white md:col-span-2 ===
  const whiteOnWhite3 = /className="bg-white rounded-none p-6 text-white md:col-span-2"/g;
  const whiteOnWhite3Matches = content.match(whiteOnWhite3);
  if (whiteOnWhite3Matches) {
    content = content.replace(whiteOnWhite3, 'className="bg-[#0e7c66] rounded-none p-6 text-white md:col-span-2"');
    changeCount += whiteOnWhite3Matches.length;
  }

  // === FIX 2: CTA button bg-white text-white → bg-white text-[#0e7c66] ===
  const ctaButtonRegex = /className="inline-block bg-white text-white px-8 py-4 rounded-none font-semibold hover:from-\[#0e7c66\] hover:to-\[#0b6251\] transition-all text-lg"/g;
  const ctaMatches = content.match(ctaButtonRegex);
  if (ctaMatches) {
    content = content.replace(ctaButtonRegex, 'className="inline-block bg-white text-[#0e7c66] px-8 py-4 rounded-none font-semibold hover:bg-slate-100 transition-all text-lg"');
    changeCount += ctaMatches.length;
  }

  // === FIX 3: bg-amber-50 → bg-[#f4fbf8] (Note/warning sections) ===
  const amberRegex = /bg-amber-50/g;
  const amberMatches = content.match(amberRegex);
  if (amberMatches) {
    content = content.replace(amberRegex, 'bg-[#f4fbf8]');
    changeCount += amberMatches.length;
  }

  // === FIX 4: bg-red-50 → bg-[#f4fbf8] ===
  const redRegex = /bg-red-50/g;
  const redMatches = content.match(redRegex);
  if (redMatches) {
    content = content.replace(redRegex, 'bg-[#f4fbf8]');
    changeCount += redMatches.length;
  }

  // === FIX 5: bg-rose-50 → bg-[#f4fbf8] ===
  const roseRegex = /bg-rose-50/g;
  const roseMatches = content.match(roseRegex);
  if (roseMatches) {
    content = content.replace(roseRegex, 'bg-[#f4fbf8]');
    changeCount += roseMatches.length;
  }

  // === FIX 6: bg-yellow-50 → bg-[#f4fbf8] ===
  const yellowRegex = /bg-yellow-50/g;
  const yellowMatches = content.match(yellowRegex);
  if (yellowMatches) {
    content = content.replace(yellowRegex, 'bg-[#f4fbf8]');
    changeCount += yellowMatches.length;
  }

  // === FIX 7: bg-orange-50 → bg-[#f4fbf8] ===
  const orangeRegex = /bg-orange-50/g;
  const orangeMatches = content.match(orangeRegex);
  if (orangeMatches) {
    content = content.replace(orangeRegex, 'bg-[#f4fbf8]');
    changeCount += orangeMatches.length;
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    filesChanged++;
    totalChanges += changeCount;
    console.log(`✅ ${file} — ${changeCount} fix(es) applied`);
  }
}

console.log(`\n🎯 Total: ${filesChanged} files mein ${totalChanges} fixes apply huye.\n`);
