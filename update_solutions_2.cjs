const fs = require('fs');
let code = fs.readFileSync('src/pages/SolutionsPage.tsx', 'utf8');

// Add imports
if (!code.includes('themeClasses')) {
  code = code.replace(
    'import { HoverIcon',
    'import {\n  themeClasses,\n  ThemeButton,\n  ThemeCard,\n  ThemeIconContainer,\n  ThemeSection,\n  ThemeSectionHeading\n} from "@/components/ui/Theme";\nimport { HoverIcon'
  );
}

// 1. Replace Hero buttons
code = code.replace(
  'className="btn-primary group"',
  'className={`${themeClasses.button.base} ${themeClasses.button.primary} group`}'
);
code = code.replace(
  '<button onClick={() => scrollToSection("solutions")} className="btn-secondary group">',
  '<button onClick={() => scrollToSection("solutions")} className={`${themeClasses.button.base} ${themeClasses.button.outline} group`}>'
);

// 2. Fix central server/device icon rounded-2xl/rounded-lg -> rounded-full
code = code.replace(/rounded-2xl flex items-center justify-center/g, 'rounded-full flex items-center justify-center');
code = code.replace(/rounded-lg flex items-center justify-center/g, 'rounded-full flex items-center justify-center');

// 3. Floating Stats Cards rounded-xl -> rounded-none
code = code.replace(/p-4 rounded-xl shadow-lg/g, 'p-4 rounded-none shadow-lg border border-[#d0d5dc]/60');

// 4. Industry Selector buttons rounded-xl -> rounded-none
code = code.replace(
  'px-3 md:px-6 py-3 md:py-4 rounded-xl text-sm md:text-base',
  'px-3 md:px-6 py-3 md:py-4 rounded-none text-sm md:text-base'
);

// 5. Active Solution Details card rounded-2xl -> ThemeCard structure or rounded-none
code = code.replace(
  'className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden"',
  'className="bg-white rounded-none shadow-xl border border-[#d0d5dc]/60 overflow-hidden"'
);

// 6. Active Solution Details icon container rounded-2xl -> rounded-full
code = code.replace(
  'bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white mb-4 lg:mb-6',
  'bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full text-white mb-4 lg:mb-6'
);

// 7. Use cases rounded-lg -> rounded-none
code = code.replace(
  'border border-slate-200 rounded-lg p-3 hover:border-emerald-200',
  'border border-[#d0d5dc]/60 rounded-none p-3 hover:border-emerald-200'
);

// 8. Next/Prev Solution buttons rounded-lg -> rounded-none
code = code.replace(/rounded-lg hover:bg-white\/80/g, 'rounded-none hover:bg-white/80');

// 9. Case Studies cards rounded-xl -> ThemeCard
code = code.replace(
  /className="bg-white rounded-xl p-6 shadow-lg border border-slate-200\/60 hover:shadow-xl transition-all duration-300 h-full flex flex-col group\/card"/g,
  'className={`${themeClasses.card.base} p-6 h-full flex flex-col group/card hover:shadow-xl hover:-translate-y-1`}'
);

// 10. Challenge container rounded-lg -> rounded-none
code = code.replace(
  'bg-slate-50 p-3 rounded-lg border border-slate-100',
  'bg-[#f4fbf8] p-3 rounded-none border border-[#d0d5dc]/60'
);

// 11. Results container rounded-lg -> rounded-none
code = code.replace(
  'text-emerald-700 font-bold text-base bg-emerald-50 px-3 py-2 rounded-lg inline-block w-full text-center',
  'text-[#0e7c66] font-bold text-base bg-[#d4ede4] px-3 py-2 rounded-none inline-block w-full text-center'
);

// 12. CTA Section rounded-2xl -> rounded-none
code = code.replace(
  'bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8',
  'bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-none p-8 border border-[#d0d5dc]/60'
);

// 13. CTA Section buttons rounded-xl -> rounded-none, also use themeClasses if possible
code = code.replace(
  /className="bg-white text-emerald-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0\.5"/,
  'className={`${themeClasses.button.base} bg-white text-[#0e7c66] hover:bg-slate-50 border-2 border-white`}'
);
code = code.replace(
  /className="border-2 border-white\/40 text-white px-8 py-3 rounded-xl font-bold hover:bg-white\/10 transition-all"/,
  'className={`${themeClasses.button.base} border-2 border-white text-white hover:bg-white/10`}'
);

// 14. Section Headings mapping
// 'Solutions by Industry'
code = code.replace(
  /<div className="text-center mb-12">\s*<h2 className="text-3xl font-bold text-slate-900 mb-4">\s*Solutions by Industry\s*<\/h2>\s*<p className="text-lg text-slate-600 max-w-2xl mx-auto">\s*Choose your industry to see specialized workflows and compliance\s*features\.\s*<\/p>\s*<\/div>/,
  '<ThemeSectionHeading subtitle="Choose your industry to see specialized workflows and compliance features." centered>Solutions by Industry</ThemeSectionHeading>'
);

// 'Case Studies'
code = code.replace(
  /<div className="text-center mb-12">\s*<h2 className="text-3xl font-bold text-slate-900 mb-4">\s*Case Studies\s*<\/h2>\s*<p className="text-lg text-slate-600 max-w-2xl mx-auto">\s*See how organizations across industries have transformed their\s*data erasure processes with D-Secure\.\s*<\/p>\s*<\/div>/,
  '<ThemeSectionHeading subtitle="See how organizations across industries have transformed their data erasure processes with D-Secure." centered>Case Studies</ThemeSectionHeading>'
);

// 15. Learn More & Request Demo buttons in Active Solution Details
code = code.replace(
  /className="btn-primary"/g,
  'className={`${themeClasses.button.base} ${themeClasses.button.primary}`}'
);
code = code.replace(
  /className="btn-secondary"/g,
  'className={`${themeClasses.button.base} ${themeClasses.button.outline}`}'
);

fs.writeFileSync('src/pages/SolutionsPage.tsx', code);
console.log("Done");
