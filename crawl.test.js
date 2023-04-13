const { normalizeUrl } = require('./crawl.js');
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
