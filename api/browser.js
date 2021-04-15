const puppeteer = require('puppeteer');

const createBrowser = async (browserConfig) => {
  const { headless } = browserConfig;
  return puppeteer.launch({
    headless,
    defaultViewport: null,
  });
};

const overridePermissionsForUrl = (browser, url, overridedPermissions) => {
  const context = browser.defaultBrowserContext();
  context.overridePermissions(url, overridedPermissions);
  return browser;
};

const closeBrowser = async (browser) => {
  await browser.close();
};

module.exports = {
  createBrowser,
  closeBrowser,
  overridePermissionsForUrl,
};
