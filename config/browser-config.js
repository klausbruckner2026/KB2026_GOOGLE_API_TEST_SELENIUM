const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

class BrowserConfig {
  static getChromeOptions(headless = false) {
    const options = new chrome.Options();
    options.addArguments(
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--window-size=1920,1080'
    );
    
    if (headless) {
      options.addArguments('--headless');
    }
    
    return options;
  }

  static getFirefoxOptions(headless = false) {
    const options = new firefox.Options();
    options.addArguments('--width=1920', '--height=1080');
    
    if (headless) {
      options.addArguments('--headless');
    }
    
    return options;
  }

  static async createDriver(browser = 'chrome', headless = false) {
    let driver;
    
    switch(browser.toLowerCase()) {
      case 'chrome':
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(this.getChromeOptions(headless))
          .build();
        break;
      case 'firefox':
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(this.getFirefoxOptions(headless))
          .build();
        break;
      default:
        throw new Error(`Unsupported browser: ${browser}`);
    }
    
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
    
    return driver;
  }
}

module.exports = BrowserConfig;
