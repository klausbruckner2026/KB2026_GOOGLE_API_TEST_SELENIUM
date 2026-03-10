const fs = require('fs');
const path = require('path');

class TestHelpers {
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static generateTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  static ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static readJsonFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  static writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}

module.exports = TestHelpers;
