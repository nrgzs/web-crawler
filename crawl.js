function normalizeUrl(input) {
  const urlInpt = new URL(input);
  const path = urlInpt.hostname + urlInpt.pathname || '';
  if (path.slice(-1) == '/') {
    return path.slice(0, -1);
  } else {
    return path;
  }
}

module.exports = {
  normalizeUrl,
};
