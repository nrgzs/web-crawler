const { normalizeUrl, getUrlFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test(' normalizeUrl strip', () => {
  const input = 'https://nrgzs.dev/project';
  const actual = normalizeUrl(input);
  const expected = 'nrgzs.dev/project';
  expect(actual).toEqual(expected);
});

test(' normalizeUrl strip slash', () => {
  const input = 'https://nrgzs.dev/project/';
  const actual = normalizeUrl(input);
  const expected = 'nrgzs.dev/project';
  expect(actual).toEqual(expected);
});

test(' normalizeUrl capital', () => {
  const input = 'https://NRGZS.dev/project';
  const actual = normalizeUrl(input);
  const expected = 'nrgzs.dev/project';
  expect(actual).toEqual(expected);
});

test(' normalizeUrl http', () => {
  const input = 'http://nrgzs.dev/project';
  const actual = normalizeUrl(input);
  const expected = 'nrgzs.dev/project';
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml absolute', () => {
  let htmlBody = `
<html>
<body>
<a href='http://nrgzs.dev/'>
NRGZ PAGE
</a>
</body>
</html>
`;

  const URL = 'http://nrgzs.dev';
  const actual = getUrlFromHtml(htmlBody, URL);
  const expected = ['http://nrgzs.dev/'];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml relative', () => {
  let htmlBody = `
<html>
<body>
<a href='/project/'>
NRGZ PAGE
</a>
</body>
</html>
`;

  const URL = 'http://nrgzs.dev';
  const actual = getUrlFromHtml(htmlBody, URL);
  const expected = ['http://nrgzs.dev/project/'];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml both', () => {
  let htmlBody = `
<html>
<body>
<a href='http://nrgzs.dev/project/'>
NRGZ PAGE
</a>
<a href='/project2/'>
NRGZ PAGE
</a>

</body>
</html>
`;

  const URL = 'http://nrgzs.dev';
  const actual = getUrlFromHtml(htmlBody, URL);
  const expected = ['http://nrgzs.dev/project/', 'http://nrgzs.dev/project2/'];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml undefined', () => {
  let htmlBody = `
<html>
<body>
<a href='nrgz'>
NRGZ PAGE
</a>
</body>
</html>
`;

  const URL = 'http://nrgzs.dev';
  const actual = getUrlFromHtml(htmlBody, URL);
  const expected = [];
  expect(actual).toEqual(expected);
});
