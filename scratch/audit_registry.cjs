const fs = require('fs');
const path = require('path');

// Registry se saare component filenames nikalo
const registryContent = fs.readFileSync('src/components/blog/BlogRegistry.ts', 'utf8');
const matches = [...registryContent.matchAll(/getBlogComponent\('([^']+)'\)/g)];
const registeredComponents = matches.map(m => m[1]);

// Actual files jo src/components/blog/ mein hain
const blogDir = 'src/components/blog';
const existingFiles = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => f.replace('.tsx', ''));

// Registry mein hai par file nahi - PHANTOM
const phantoms = registeredComponents.filter(c => !existingFiles.includes(c));
// File hai par registry mein nahi - ORPHAN
const orphans = existingFiles.filter(f => !registeredComponents.includes(f));

console.log('=== PHANTOM ENTRIES (Registry mein hai, file nahi) ===');
phantoms.forEach(p => console.log('  ❌', p));
console.log(`  Total: ${phantoms.length}`);

console.log('\n=== ORPHAN FILES (File hai, registry mein nahi) ===');
orphans.forEach(o => console.log('  ⚠️', o));
console.log(`  Total: ${orphans.length}`);

console.log('\n=== REGISTRY SIZE ===');
console.log(`  Registered slugs: ${registeredComponents.length}`);
console.log(`  Blog .tsx files: ${existingFiles.length}`);
