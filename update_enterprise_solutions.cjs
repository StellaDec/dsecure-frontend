const fs = require('fs');
let code = fs.readFileSync('src/pages/solutions/EnterpriseSolutionsPage.tsx', 'utf8');

// Add imports
if (!code.includes('ThemeSection')) {
  code = code.replace(
    'import SolutionContactSection from "@/components/SolutionContactSection";',
    `import SolutionContactSection from "@/components/SolutionContactSection";
import {
  themeClasses,
  ThemeButton,
  ThemeCard,
  ThemeIconContainer,
  ThemeSection,
  ThemeSectionHeading
} from "@/components/ui/Theme";`
  );
}

// 1. Overview Section
code = code.replace(
  /<section\s+id="overview"\s+className="([^"]+)"\s*>/g,
  '<ThemeSection id="overview" className="$1" noBg>'
);
code = code.replace(
  /<\/section>\s*\{\/\* Features Section \*\/\}/,
  '</ThemeSection>\n\n        {/* Features Section */}'
);

// Buttons in overview
code = code.replace(
  /<button\s+onClick=\{\(\) => setShowLicenseModal\(true\)\}\s+className="[^"]+"\s*>\s*(.*?)\s*<\/button>/s,
  `<ThemeButton onClick={() => setShowLicenseModal(true)} variant="primary">\n                    $1\n                  </ThemeButton>`
);

code = code.replace(
  /<a\s+href="https:\/\/assets\.dsecuretech\.com\/pdf\/DSECUR_enterprise\.pdf"\s+target="_blank"\s+rel="noopener noreferrer"\s+className="[^"]+"\s*>\s*(.*?)\s*<\/a>/s,
  `<a\n                    href="https://assets.dsecuretech.com/pdf/DSECUR_enterprise.pdf"\n                    target="_blank"\n                    rel="noopener noreferrer"\n                    className={\`\${themeClasses.button.base} \${themeClasses.button.outline} bg-white shadow-lg\`}\n                  >\n                    $1\n                  </a>`
);

// 2. Capabilities Section
code = code.replace(
  /<section\s+id="capabilities"\s+className="py-20"\s+style=\{\{ backgroundColor: "#ffffff" \}\}\s*>\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/g,
  '<ThemeSection id="capabilities">\n          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
);
code = code.replace(
  /<div className="text-center mb-16">.*?<h2[^>]*>.*?Scalable Enterprise Erasure.*?<\/h2>.*?<p[^>]*>.*?Data erasure software built for large-scale operations across\s*physical and online networks.*?<\/p>\s*<\/div>/s,
  '<ThemeSectionHeading subtitle="Data erasure software built for large-scale operations across physical and online networks" centered>Scalable Enterprise Erasure</ThemeSectionHeading>'
);

// Capabilities Grid Items
code = code.replace(
  /<div\s+key=\{idx\}\s+className="group p-6 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-emerald-100"\s+style=\{\{ backgroundColor: "#f9fafb" \}\}\s*>/g,
  '<ThemeCard key={idx} className="group bg-[#f4fbf8]">'
);
code = code.replace(
  /<h3\s+className="text-lg font-bold mb-2"\s+style=\{\{ color: "#1f2937" \}\}\s*>/g,
  '<h3 className="text-lg font-bold mb-2 text-[#0a2e1e]">'
);
code = code.replace(
  /<p\s+className="text-sm leading-relaxed"\s+style=\{\{ color: "#6b7280" \}\}\s*>/g,
  '<p className="text-sm leading-relaxed text-[#5a6672]">'
);

// End capabilities section
code = code.replace(
  /<\/section>\s*\{\/\* Device Support Section \*\/\}/,
  '</ThemeSection>\n\n        {/* Device Support Section */}'
);

// 3. Assets Section
code = code.replace(
  /<section\s+id="assets"\s+className="py-20 bg-gradient-to-b"\s+style=\{\{ background: "linear-gradient\(to bottom, #f9fafb, #ffffff\)" \}\}\s*>\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/g,
  '<ThemeSection id="assets" alternate>\n          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
);
code = code.replace(
  /<div className="text-center mb-16">.*?<h2[^>]*>.*?Erase Any Storage IT Asset.*?<\/h2>.*?<p[^>]*>.*?Achieve complete sanitization across your entire hardware fleet.*?<\/p>\s*<\/div>/s,
  '<ThemeSectionHeading subtitle="Achieve complete sanitization across your entire hardware fleet" centered>Erase Any Storage IT Asset</ThemeSectionHeading>'
);

// Assets Grid Items
code = code.replace(
  /<div\s+key=\{idx\}\s+className="text-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"\s+style=\{\{ backgroundColor: "#ffffff" \}\}\s*>/g,
  '<ThemeCard key={idx} className="text-center">'
);
code = code.replace(
  /<h3\s+className="text-xl font-bold mb-2"\s+style=\{\{ color: "#1f2937" \}\}\s*>/g,
  '<h3 className="text-xl font-bold mb-2 text-[#0a2e1e]">'
);
code = code.replace(
  /<p className="text-sm" style=\{\{ color: "#6b7280" \}\}>/g,
  '<p className="text-sm text-[#5a6672]">'
);

// End assets section
code = code.replace(
  /<\/section>\s*\{\/\* Industry Solutions/g,
  '</ThemeSection>\n\n        {/* Industry Solutions'
);

// 4. Compliance Section
code = code.replace(
  /<section\s+id="compliance"\s+className="py-20"\s+style=\{\{ backgroundColor: "#ffffff" \}\}\s*>\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/g,
  '<ThemeSection id="compliance">\n          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
);
code = code.replace(
  /<div className="text-center mb-16">.*?<h2[^>]*>.*?Global Compliance Standards.*?<\/h2>.*?<p[^>]*>.*?Approved by global bodies for safe and permanent data\s*sanitization.*?<\/p>\s*<\/div>/s,
  '<ThemeSectionHeading subtitle="Approved by global bodies for safe and permanent data sanitization" centered>Global Compliance Standards</ThemeSectionHeading>'
);

// Compliance Grid Items
code = code.replace(
  /<div\s+key=\{idx\}\s+className="p-8 rounded-2xl hover:shadow-lg transition-all border"\s+style=\{\{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" \}\}\s*>/g,
  '<ThemeCard key={idx} className="bg-[#f4fbf8]">'
);
code = code.replace(
  /<h3\s+className="text-2xl font-bold mb-3"\s+style=\{\{ color: "#1f2937" \}\}\s*>/g,
  '<h3 className="text-2xl font-bold mb-3 text-[#0a2e1e]">'
);
code = code.replace(
  /<p className="mb-6" style=\{\{ color: "#6b7280" \}\}>/g,
  '<p className="mb-6 text-[#5a6672]">'
);
code = code.replace(
  /<li\s+key=\{fidx\}\s+className="flex items-center text-sm"\s+style=\{\{ color: "#4b5563" \}\}\s*>/g,
  '<li key={fidx} className="flex items-center text-sm text-[#5a6672]">'
);
code = code.replace(
  /<svg\s+className="w-5 h-5 mr-2 flex-shrink-0"\s+style=\{\{ color: "#059669" \}\}/g,
  '<svg className="w-5 h-5 mr-2 flex-shrink-0 text-[#0e7c66]"'
);

// End compliance section
code = code.replace(
  /<\/section>\s*\{\/\* FAQ Section \*\/\}/,
  '</ThemeSection>\n\n        {/* FAQ Section */}'
);

// 5. FAQ Section
code = code.replace(
  /<section\s+id="faq"\s+className="py-20 bg-gradient-to-b"\s+style=\{\{ background: "linear-gradient\(to bottom, #f9fafb, #ffffff\)" \}\}\s*>\s*<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">/g,
  '<ThemeSection id="faq" alternate>\n          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">'
);
code = code.replace(
  /<div className="text-center mb-16">.*?<h2[^>]*>.*?Enterprise Solutions Questions.*?<\/h2>.*?<p[^>]*>.*?Frequently asked questions regarding our enterprise erasure\s*platform.*?<\/p>\s*<\/div>/s,
  '<ThemeSectionHeading subtitle="Frequently asked questions regarding our enterprise erasure platform" centered>Enterprise Solutions Questions</ThemeSectionHeading>'
);

// FAQ Details tags
code = code.replace(
  /<details\s+key=\{idx\}\s+className="group rounded-xl p-6 shadow-sm hover:shadow-md transition-all border"\s+style=\{\{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" \}\}\s*>/g,
  '<details key={idx} className="group rounded-none p-6 shadow-sm hover:shadow-md transition-all border bg-white border-[#d0d5dc]/60">'
);
code = code.replace(
  /<span\s+className="text-lg font-semibold"\s+style=\{\{ color: "#1f2937" \}\}\s*>/g,
  '<span className="text-lg font-semibold text-[#0a2e1e]">'
);
code = code.replace(
  /<svg\s+className="w-5 h-5 group-open:rotate-180 transition-transform"\s+style=\{\{ color: "#059669" \}\}/g,
  '<svg className="w-5 h-5 group-open:rotate-180 transition-transform text-[#0e7c66]"'
);
code = code.replace(
  /<p\s+className="mt-4 leading-relaxed"\s+style=\{\{ color: "#6b7280" \}\}\s*>/g,
  '<p className="mt-4 leading-relaxed text-[#5a6672]">'
);

// End FAQ section
code = code.replace(
  /<\/section>\s*\{\/\* ================= CONTACT SECTION/g,
  '</ThemeSection>\n\n        {/* ================= CONTACT SECTION'
);

fs.writeFileSync('src/pages/solutions/EnterpriseSolutionsPage.tsx', code);
console.log("Done");
