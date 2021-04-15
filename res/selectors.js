const path = require('path');
const { getFileContent } = require('../utils');

module.exports = JSON.parse(
  getFileContent(
    require.resolve(path.join(__dirname, 'selectors.json')),
  ),
);
