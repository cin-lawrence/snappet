const { clickAndType } = require('./page');

const login = async (page, selectors, credentials) => {
  await clickAndType(page, selectors.email, credentials.username);
  await clickAndType(page, selectors.password, credentials.password);
  await page.click(selectors.loginButton);
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  return page;
};

module.exports = {
  login,
};
