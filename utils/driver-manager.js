const BrowserConfig = require('../config/browser-config');

class DriverManager {
  static instance = null;
  static driver = null;

  static async getDriver() {
    if (!this.driver) {
      this.driver = await BrowserConfig.createDriver();
    }
    return this.driver;
  }

  static async quitDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  static async restartDriver() {
    await this.quitDriver();
    return await this.getDriver();
  }
}

module.exports = DriverManager;
