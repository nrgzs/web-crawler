const { crawlPage } = require('./crawl.js');
const fs = require('fs');

async function main() {
  if (process.argv.length < 3) {
    console.log(`undefined URL`);
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log(`to many URL inputs`);
    process.exit(1);
  }
  const inputUrl = process.argv[2];
  console.log(`starting crawl of ${inputUrl}`);

  const pages = await crawlPage(inputUrl, inputUrl, {});
  for (const page of Object.entries(pages)) {
    fs.writeFileSync(
      './data.txt',
      JSON.stringify(page, null, 4),

      { flag: 'a+' },
      'utf-8'
    );
  }
}

main();
