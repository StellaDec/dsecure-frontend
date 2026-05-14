import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx') || name.endsWith('.jsx')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('src/pages');
files.push(...getFiles('src/components/blog'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1Match) {
    let h1Text = h1Match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (h1Text.length < 30 || h1Text.includes('{')) {
      console.log(`FILE: ${file}`);
      console.log(`H1: ${h1Text}`);
      console.log('---');
    }
  } else {
    console.log(`FILE: ${file}`);
    console.log(`H1: MISSING`);
    console.log('---');
  }
}
