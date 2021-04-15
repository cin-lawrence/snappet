const { config, selectors, credentials } = require('./res');
const {
  createBrowser,
  closeBrowser,
  getFirstPage,
  overridePermissionsForUrl,
  changePage,
  login,
  scrollScreen,
} = require('./api');
const { scrapeElementsBySelector } = require('./scrapers/elements');
const { save } = require('./utils');

const scrape = async (browser, page, _selectors = selectors) => {
  const postSelector = _selectors.post;
  const posts = await scrapeElementsBySelector(browser, page, postSelector);
  await Promise.all(
    posts.map((post, index) => save(`output/output_${index}.html`, post)),
  );
};

module.exports = async () => {
  const browser = await createBrowser(config);
  const page = await getFirstPage(browser);
  await overridePermissionsForUrl(browser, config.origin, config.overridedPermissions);
  await changePage(page, config.origin);
  await login(page, selectors, credentials);
  await changePage(page, 'https://www.facebook.com/groups/1988191741413952/?sorting_setting=CHRONOLOGICAL');
  for (let i = 0; i <= 20; i += 1) {
    await scrollScreen(browser, page);
  }
  await scrape(browser, page);
  await closeBrowser(browser);
};
