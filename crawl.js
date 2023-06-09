const { JSDOM } = require('jsdom');

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  let htmlBody = '';
  try {
    const res = await fetch(currentUrl);

    if (res.status > 399) {
      console.log(`error : status code${res.status}`);
      return pages;
    }

    const contentType = res.headers.get('content-type');

    if (!contentType.includes('text/html')) {
      return pages;
    }

    htmlBody = await res.text();
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
  console.log(`crawling on ${currentUrl}`);
  const nexturls = getUrlFromHtml(htmlBody, baseUrl);

  for (const nexturl of nexturls) {
    pages = await crawlPage(baseUrl, nexturl, pages);
  }
  return pages;
}

function getUrlFromHtml(htmlBody, baseUrl) {
  let urlLinks = [];

  const htmlDom = new JSDOM(htmlBody);
  const links = htmlDom.window.document.querySelectorAll('a');

  for (const linkElement of links) {
    if (linkElement.href.slice(0, 1) == '/') {
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urlLinks.push(urlObj.href);
      } catch (err) {
        console.log(`Relative path error : ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urlLinks.push(urlObj.href);
      } catch (err) {
        console.log(`Relative path error : ${err.message}`);
      }
    }
  }
  return urlLinks;
}

function normalizeUrl(input) {
  const urlInpt = new URL(input);
  const path = `${urlInpt.hostname}${urlInpt.pathname}`;
  if (path.length > 0 && path.slice(-1) == '/') {
    return path.slice(0, -1);
  }
  return path;
}

module.exports = {
  normalizeUrl,
  getUrlFromHtml,
  crawlPage,
};
