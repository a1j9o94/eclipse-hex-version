const parseXML = require("./parseXML");

function tiledLoader(source) {
  return parseXML(source);
}

module.exports = tiledLoader;
