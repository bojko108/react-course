import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile(path.join(__dirname, '../src/index.html'), 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend(`<link rel='stylesheet' href='styles.css'`);

  fs.writeFile(path.join(__dirname, '../dist/index.html'), $.html(), 'utf8', error => {
    if (error) {
      return console.log(error);
    }
    console.log('index.html written to /dist'.green);
  });
});
