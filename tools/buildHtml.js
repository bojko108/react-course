import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  debugger;
  $('head').prepend("<link rel='stylesheet' href='styles.css'>");

  fs.writeFile('dist/index.html', $.html(), 'utf8', error => {
    if (error) {
      return console.log(error);
    }
    console.log('index.html written to /dist'.green);
  });
});
