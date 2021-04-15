const browser = require('./browser');
const page = require('./page');
const auth = require('./auth');

module.exports = {
  ...auth,
  ...browser,
  ...page,
};
