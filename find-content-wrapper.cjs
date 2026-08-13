const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('test.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const paragraphs = doc.querySelectorAll('p');
const longParagraphs = Array.from(paragraphs).filter(p => p.textContent.length > 200);

if (longParagraphs.length > 0) {
  const p = longParagraphs[0];
  console.log('Sample text:', p.textContent.substring(0, 100));
  let parent = p.parentElement;
  while(parent && parent.tagName !== 'BODY') {
    console.log('Class:', parent.className, 'Id:', parent.id, 'Tag:', parent.tagName);
    parent = parent.parentElement;
  }
} else {
  console.log('No long paragraphs found');
}
