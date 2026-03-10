const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class GoogleHomePage extends BasePage {
  constructor(driver) {
    super(driver);
    
    // Element locators
    this.searchBox = By.name('q');
    this.searchButton = By.name('btnK');
    this.feelingLuckyButton = By.name('btnI');
    this.googleLogo = By.css('img[alt="Google"]');
  }

  async open() {
    await this.navigate('https://www.google.com');
    await this.waitForElement(this.googleLogo);
  }

  async search(searchTerm) {
    await this.type(this.searchBox, searchTerm);
    await this.click(this.searchButton);
  }

  async getSearchBoxValue() {
    const element = await this.findElement(this.searchBox);
    return await element.getAttribute('value');
  }

  async isLogoDisplayed() {
    const logo = await this.findElement(this.googleLogo);
    return await logo.isDisplayed();
  }
}

module.exports = GoogleHomePage;
