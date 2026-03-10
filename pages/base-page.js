const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 10000;
  }

  async navigate(url) {
    await this.driver.get(url);
  }

  async findElement(locator) {
    return await this.driver.findElement(locator);
  }

  async findElements(locator) {
    return await this.driver.findElements(locator);
  }

  async click(locator) {
    const element = await this.findElement(locator);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.findElement(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async waitForElement(locator, timeout = this.timeout) {
    return await this.driver.wait(
      until.elementLocated(locator),
      timeout
    );
  }

  async getTitle() {
    return await this.driver.getTitle();
  }

  async takeScreenshot(fileName) {
    const screenshot = await this.driver.takeScreenshot();
    require('fs').writeFileSync(
      `reports/screenshots/${fileName}.png`,
      screenshot,
      'base64'
    );
  }
}

module.exports = BasePage;
