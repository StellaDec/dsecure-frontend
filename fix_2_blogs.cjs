const fs = require('fs');

const files = [
  'src/components/blog/DataErasureForNonProfits.tsx',
  'src/components/blog/MacM1ErasureKnownIssues.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix root wrapper
  content = content.replace(/min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/g, 'min-h-screen bg-white');

  // Fix Hero Section
  content = content.replace(/<section className="py-16 bg-white shadow-lg">/g, '<section className="py-16 bg-white shadow-none">');

  // Fix tags
  content = content.replace(/text-green-700 bg-green-100 rounded-full/g, 'text-[#0e7c66] bg-[#d4ede4] rounded-full');
  content = content.replace(/text-slate-700 bg-slate-100 rounded-full/g, 'text-[#0e7c66] bg-[#d4ede4] rounded-full');

  // Fix Heading texts
  content = content.replace(/<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">/g, '<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">');
  content = content.replace(/<span className="bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">/g, '<span className="text-[#0e7c66]">');
  content = content.replace(/<span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">/g, '<span className="text-[#0e7c66]">');

  // Fix link inside hero
  content = content.replace(/<Link to="\/products\/drive-eraser" className="text-indigo-600 hover:underline font-medium">/g, '<Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">');
  content = content.replace(/<Link to="\/products\/drive-eraser" className="text-amber-600 hover:underline font-medium">/g, '<Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">');


  // Fix Hero Description
  content = content.replace(/<p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">/g, '<p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">');

  // Fix Main Content Wrapper
  content = content.replace(/<section className="w-full px-4 md:px-8 lg:px-16 py-12">/g, '<section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">');
  content = content.replace(/<div className="bg-white rounded-xl shadow-md border border-slate-200\/50 p-8 space-y-12">/g, '<div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">');
  content = content.replace(/<div className="bg-white rounded-none border-b border-amber-200 shadow-none p-8 md:p-12 space-y-10 text-justify">/g, '<div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">');


  // Fix Subheadings in main content
  content = content.replace(/<h2 className="text-2xl font-bold text-slate-900">/g, '<h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">');
  content = content.replace(/<h2 className="text-2xl font-bold text-slate-900 mb-6">/g, '<h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">');


  // Fix Paragraphs in main content
  content = content.replace(/<p className="text-slate-700 leading-relaxed text-lg">/g, '<p className="text-[#5a6672] leading-loose text-lg mb-6">');
  content = content.replace(/<p className="text-slate-700 leading-relaxed">/g, '<p className="text-[#5a6672] leading-loose text-lg mb-6">');

  // Fix UL/LI
  content = content.replace(/<ul className="space-y-4 text-slate-700">/g, '<ul className="space-y-4 text-[#5a6672] text-lg">');
  content = content.replace(/<ul className="space-y-4 text-slate-700 list-disc pl-5">/g, '<ul className="space-y-4 text-[#5a6672] text-lg list-disc pl-5">');
  content = content.replace(/<ul className="space-y-4 text-\[#5a6672\]">/g, '<ul className="space-y-4 text-[#5a6672] text-lg mb-6">');
  content = content.replace(/<ul className="space-y-2 text-slate-700">/g, '<ul className="space-y-4 text-[#5a6672] text-lg mb-6">');


  // Highlighted Box in NonProfits
  content = content.replace(/<div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 md:p-8 rounded-xl border border-green-100">/g, '<div className="bg-[#f4fbf8] p-8 md:p-12 space-y-6 border-l-4 border-[#0e7c66] prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">');
  content = content.replace(/<h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">/g, '<h3 className="font-bold text-[#0a2e1e] text-xl mb-4">');

  // Conclusion box in NonProfits
  content = content.replace(/<div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-xl shadow-lg p-8 mt-8 text-white">/g, '<div className="bg-[#0e7c66] p-8 md:p-12 mt-12 text-white">');
  content = content.replace(/<div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-8 mt-8 text-white">/g, '<div className="bg-[#0e7c66] p-8 md:p-12 mt-12 text-white">');

  content = content.replace(/<div className="bg-white\/10 p-4 rounded-lg mt-6 border border-white\/20">/g, '<div className="bg-white/10 p-6 mt-6 border border-white/20">');

  content = content.replace(/<p className="text-green-50 mb-6 max-w-2xl text-lg">/g, '<p className="text-white/90 mb-6 max-w-2xl text-lg leading-loose">');
  content = content.replace(/<p className="text-slate-300 mb-6 max-w-2xl text-lg">/g, '<p className="text-white/90 mb-6 max-w-2xl text-lg leading-loose">');
  
  content = content.replace(/<h3 className="font-bold text-white mb-2">/g, '<h3 className="font-bold text-white text-xl mb-2">');

  // Fix Grid in NonProfits (How D-Secure Enables...)
  content = content.replace(/<div className="bg-gradient-to-br from-green-50 to-indigo-50 p-6 rounded-xl border">/g, '<div className="bg-white p-6 border border-[#d4ede4]">');
  content = content.replace(/<ShieldIcon className="w-5 h-5 text-green-800" filled \/>/g, '<ShieldIcon className="w-5 h-5 text-[#0e7c66]" filled />');
  content = content.replace(/<ClipboardIcon className="w-5 h-5 text-green-800" filled \/>/g, '<ClipboardIcon className="w-5 h-5 text-[#0e7c66]" filled />');

  // Fix D-Secure Section container
  content = content.replace(/<div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 mt-12">/g, '<div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-8 mt-12">');
  content = content.replace(/<h2 className="text-2xl font-bold text-emerald-900 mb-6">/g, '<h2 className="text-2xl font-bold text-[#0e7c66] mb-6">');
  content = content.replace(/<p className="text-slate-700 leading-relaxed mb-6">/g, '<p className="text-[#5a6672] leading-relaxed mb-6">');
  
  
  // Specific NonProfit box texts
  content = content.replace(/<h3 className="font-bold">/g, '<h3 className="font-bold text-[#0e7c66]">');
  content = content.replace(/<p className="text-sm">/g, '<p className="text-sm text-[#5a6672]">');


  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
