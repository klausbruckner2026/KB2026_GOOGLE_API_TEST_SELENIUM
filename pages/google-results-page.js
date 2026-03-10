const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class GoogleResultsPage extends BasePage {
  constructor(driver) {
    super(driver);
    
    // Element locators
    this.resultStats = By.id('result-stats');
    this.searchResults = By.css('div.g');
    this.resultLinks = By.css('div.g a');
    this.nextButton = By.id('pnnext');
  }

  async waitForResults() {
    await this.waitForElement(this.resultStats);
  }

  async getResultCount() {
    const results = await this.findElements(this.searchResults);
    return results.length;
  }

  async getResultTitles() {
    const titles = await this.findElements(By.css('div.g h3'));
    return Promise.all(titles.map(async title => await title.getText()));
  }

  async clickFirstResult() {
    const firstLink = await this.findElement(By.css('div.g a'));
    await firstLink.click();
  }

  async isNextButtonDisplayed() {
    const buttons = await this.findElements(this.nextButton);
    return buttons.length > 0;
  }
}

module.exports = GoogleResultsPage;
