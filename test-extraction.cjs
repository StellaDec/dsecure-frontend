const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('test.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

let content = doc.querySelector('.left_side');
if (content) {
  // Remove author details and other unwanted parts
  const author = content.querySelector('.author_details');
  if (author) author.remove();
  
  const photo = content.querySelector('.photo-panel');
  if (photo) photo.remove();
  
  const summary = content.querySelector('.summry');
  if (summary) summary.remove();

  console.log('Found content length:', content.innerHTML.length);
  console.log('Sample text:', content.textContent.replace(/\s+/g, ' ').substring(0, 200));
} else {
  console.log('left_side not found');
}
