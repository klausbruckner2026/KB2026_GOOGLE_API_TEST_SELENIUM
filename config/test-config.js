module.exports = {
  baseUrl: 'https://www.google.com',
  defaultTimeout: 30000,
  retries: 2,
  browsers: ['chrome', 'firefox'],
  headless: process.env.HEADLESS === 'true',
  testData: {
    searchTerms: [
      'Bosch',
      'Selenium testing',
      'Automation framework'
    ],
    negativeTests: {
      emptySearch: '',
      specialChars: '@#$%',
      longString: 'a'.repeat(1000)
    }
  }
};
