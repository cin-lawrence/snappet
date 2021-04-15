const scrapeElementBySelector = async (browser, page, selector) => (
  (await page.evaluateHandle((_selector) => (
    document.querySelector(_selector).innerHTML
  ), selector)).jsonValue()
);

const scrapeElementsBySelector = async (browser, page, selector) => (
  (await page.evaluateHandle((_selector) => {
    const elements = Array.from(document.querySelectorAll(_selector));
    return elements.map((element) => element.innerHTML);
  }, selector)).jsonValue()
);

const scrapeBody = async (browser, page) => scrapeElementBySelector(browser, page, 'body');

const scrapeDocument = async (browser, page) => scrapeElementBySelector(browser, page, '*');

module.exports = {
  scrapeElementBySelector,
  scrapeElementsBySelector,
  scrapeBody,
  scrapeDocument,
};
