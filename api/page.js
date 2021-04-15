const getFirstPage = async (browser) => (await browser.pages())[0];

const createNewPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  return page;
};

const changePage = async (page, newUrl) => {
  await page.goto(newUrl, { waitUntil: 'networkidle2' });
};

const clickAndType = async (page, selector, value) => {
  await page.click(selector);
  await page.keyboard.type(value);
};

const getEndValues = async (page, args) => Promise.all(
  args.map(
    (arg) => (
      typeof arg === 'function'
        ? page.evaluateHandle(`(${arg.toString()})`)
        : arg
    ),
  ),
);

const evaluateFunction = async (page, fn, ...rawArgs) => {
  const args = getEndValues(page, rawArgs);
  return page.evaluate(fn, ...args);
};

const scrollScreen = async (browser, page) => {
  const previousHeight = await page.evaluate(() => (
    document.body.scrollHeight
  ));
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForFunction((_previousHeight) => (
    document.body.scrollHeight > _previousHeight
  ), {}, previousHeight);
};

const scrollScreenLegacy = async (browser, page) => {
  const previousHeight = await page.evaluate('document.body.scrollHeight');
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
};

module.exports = {
  getFirstPage,
  changePage,
  clickAndType,
  createNewPage,
  evaluateFunction,
  scrollScreen,
  scrollScreenLegacy,
};
