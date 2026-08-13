const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.substring(0, css.lastIndexOf('}'));
css += `
  .blog-formatted-content h1 { @apply text-left text-3xl font-bold mt-12 mb-6 text-slate-900; }
  .blog-formatted-content table { @apply w-full border-collapse mb-8 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm; }
  .blog-formatted-content th { @apply bg-emerald-50 text-emerald-900 font-semibold p-4 text-left border-b border-slate-200; }
  .blog-formatted-content td { @apply p-4 border-b border-slate-200 text-slate-700; }
  .blog-formatted-content blockquote { @apply border-l-4 border-emerald-500 bg-emerald-50 p-4 mb-6 italic text-slate-700 rounded-r-lg; }
  .blog-formatted-content a { @apply text-emerald-600 hover:text-emerald-700 hover:underline font-medium; }
}
`;
fs.writeFileSync('src/index.css', css);
console.log("Appended CSS successfully");
