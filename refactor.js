const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/ResourcesPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace imports
content = content.replace(
  /import \{ useToast \} from "@\/components\/Toast";/,
  import { useToast } from "@/components/Toast";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer, themeClasses } from "@/components/ui/Theme";
import { ShieldCheck, Building2, Recycle, Terminal, Briefcase, FileText, BookOpen, BarChart, Wrench, FileEdit, BookMarked, Search, ArrowRight } from "lucide-react";
);

// Replace getIcon
const getIconRegex = /const getIcon = \(type: string\) => \{[\s\S]*?\};\s*const resources =/m;
const newGetIcon = const getIcon = (type: string) => {
    switch (type) {
      case "compliance": return <ThemeIconContainer><ShieldCheck className={themeClasses.icon} /></ThemeIconContainer>;
      case "enterprise": return <ThemeIconContainer><Building2 className={themeClasses.icon} /></ThemeIconContainer>;
      case "itad": return <ThemeIconContainer><Recycle className={themeClasses.icon} /></ThemeIconContainer>;
      case "technical": return <ThemeIconContainer><Terminal className={themeClasses.icon} /></ThemeIconContainer>;
      case "business": return <ThemeIconContainer><Briefcase className={themeClasses.icon} /></ThemeIconContainer>;
      case "whitepaper": return <ThemeIconContainer><FileText className={themeClasses.icon} /></ThemeIconContainer>;
      case "case-study": return <ThemeIconContainer><BookOpen className={themeClasses.icon} /></ThemeIconContainer>;
      case "report": return <ThemeIconContainer><BarChart className={themeClasses.icon} /></ThemeIconContainer>;
      case "tool": return <ThemeIconContainer><Wrench className={themeClasses.icon} /></ThemeIconContainer>;
      case "blog": return <ThemeIconContainer><FileEdit className={themeClasses.icon} /></ThemeIconContainer>;
      default: return <ThemeIconContainer><BookMarked className={themeClasses.icon} /></ThemeIconContainer>;
    }
  };

  const resources =;
content = content.replace(getIconRegex, newGetIcon);

// Replace overview section
content = content.replace(
  /<section id="overview" className="bg-gradient-to-br from-emerald-50 via-teal-50\/30 to-cyan-50">/,
  <ThemeSection id="overview" className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
);
content = content.replace(/<\/section>\s*\{\/\* Resource Categories \*\/\}/, </ThemeSection>\n\n      {/* Resource Categories */});

// Replace categories section
content = content.replace(
  /<section id="categories" className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">/g,
  <ThemeSection id="categories" className="relative overflow-hidden" alternate>
);
// Make sure to close ThemeSection
content = content.replace(/<\/section>\s*\{\/\* Featured Resources \*\/\}/g, </ThemeSection>\n\n      {/* Featured Resources */});

// Replace featured section
content = content.replace(
  /<section id="featured" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50\/50">/g,
  <ThemeSection id="featured">
);
content = content.replace(/<\/section>\s*\{\/\* All Resources \*\/\}/g, </ThemeSection>\n\n      {/* All Resources */});

// Replace All Resources section
content = content.replace(
  /<section id="all-articles" className="py-16 md:py-24 bg-slate-50">/g,
  <ThemeSection id="all-articles" alternate>
);
// Close it at the end
content = content.replace(/<\/section>\s*<\/>/g, </ThemeSection>\n    </>);

// Replace category headers
content = content.replace(
  /<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">\s*Comprehensive Knowledge\s*<span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">\s*Resource Library\s*<\/span>\s*<\/h2>/g,
  <ThemeSectionHeading title="Comprehensive Knowledge" highlight="Resource Library" />
);

content = content.replace(
  /<div className="text-center mb-12">\s*<h2 className="text-3xl font-bold text-slate-900 mb-4">\s*Featured Blog Articles\s*<\/h2>\s*<p className="text-lg text-slate-600 max-w-2xl mx-auto">\s*Our most popular and insightful blog articles to keep you informed.\s*<\/p>\s*<\/div>/g,
  <ThemeSectionHeading title="Featured" highlight="Blog Articles" subtitle="Our most popular and insightful blog articles to keep you informed." />
);

content = content.replace(
  /<div className="text-center mb-12">\s*<h2 className="text-3xl font-bold text-slate-900 mb-4">\s*All Blog Articles\s*<\/h2>\s*<p className="text-lg text-slate-600 max-w-2xl mx-auto">\s*Browse our complete library of blog articles and insights.\s*<\/p>\s*<\/div>/g,
  <ThemeSectionHeading title="All" highlight="Blog Articles" subtitle="Browse our complete library of blog articles and insights." />
);


// Replace Cards
// The big manual cards
content = content.replace(
  /<div\s+className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200\/60 hover:border-blue-300\/50 hover:-translate-y-2 overflow-hidden"\s*>/g,
  <ThemeCard className="group p-8 hover:-translate-y-2">
);
content = content.replace(
  /<div\s+className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200\/60 hover:border-rose-300\/50 hover:-translate-y-2 overflow-hidden"\s*>/g,
  <ThemeCard className="group p-8 hover:-translate-y-2">
);

// Map over resources cards
content = content.replace(
  /<div className="group relative bg-white rounded-xl shadow-lg border border-slate-200\/60 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">/g,
  <ThemeCard className="group h-full flex flex-col hover:-translate-y-1">
);

content = content.replace(
  /<div className="group relative bg-white rounded-xl p-6 shadow-lg border border-slate-200\/60 hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">/g,
  <ThemeCard className="group p-6 h-full flex flex-col hover:-translate-y-1">
);


// Save
fs.writeFileSync(filePath, content);
console.log("Refactoring applied");
