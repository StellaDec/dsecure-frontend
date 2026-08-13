const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.bitraser.com/article/the-basics-of-gramm-leach-bliley-act-worth-knowing.php')
  .then(res => {
    const $ = cheerio.load(res.data);
    // Find candidate containers for the blog content
    console.log("Candidate containers:");
    $('div').each((i, el) => {
        const className = $(el).attr('class') || '';
        const id = $(el).attr('id') || '';
        const textLen = $(el).text().length;
        if(textLen > 1000 && textLen < 20000 && className) {
            console.log(`- Div id: ${id}, class: ${className}, len: ${textLen}`);
        }
    });
  })
  .catch(err => console.error(err));
