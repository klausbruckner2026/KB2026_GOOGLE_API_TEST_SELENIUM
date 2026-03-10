const { expect, assert } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const BrowserConfig = require('../config/browser-config');
const GoogleHomePage = require('../pages/google-home-page');
const GoogleResultsPage = require('../pages/google-results-page');
const testConfig = require('../config/test-config');

describe('Google Search Functionality Tests', function() {
  this.timeout(60000);
  
  let driver;
  let googleHome;
  let googleResults;
  
  // Setup - runs before each test
  beforeEach(async function() {
    driver = await BrowserConfig.createDriver(
      process.env.BROWSER || 'chrome',
      process.env.HEADLESS === 'true'
    );
    googleHome = new GoogleHomePage(driver);
    googleResults = new GoogleResultsPage(driver);
  });
  
  // Cleanup - runs after each test
  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await googleHome.takeScreenshot(`failure-${Date.now()}`);
    }
    await driver.quit();
  });
  
  /**
   * Test Case: TC-GOOGLE-SEARCH-001
   * Description: Verify that Google homepage loads successfully
   * Priority: P1
   */
  it('TC-GOOGLE-SEARCH-001 - Should load Google homepage successfully', async function() {
    // Arrange
    const expectedTitle = 'Google';
    
    // Act
    await googleHome.open();
    const actualTitle = await googleHome.getTitle();
    const isLogoDisplayed = await googleHome.isLogoDisplayed();
    
    // Assert
    expect(actualTitle).to.equal(expectedTitle);
    expect(isLogoDisplayed).to.be.true;
  });
  
  /**
   * Test Case: TC-GOOGLE-SEARCH-002
   * Description: Verify basic search functionality with valid keyword
   * Priority: P1
   */
  testConfig.testData.searchTerms.forEach(searchTerm => {
    it(`TC-GOOGLE-SEARCH-002 - Should search for "${searchTerm}" successfully`, async function() {
      // Arrange
      await googleHome.open();
      
      // Act
      await googleHome.search(searchTerm);
      await googleResults.waitForResults();
      
      // Assert
      const resultCount = await googleResults.getResultCount();
      const pageTitle = await googleResults.getTitle();
      
      expect(resultCount).to.be.greaterThan(0);
      expect(pageTitle).to.include(searchTerm);
    });
  });
  
  /**
   * Test Case: TC-GOOGLE-SEARCH-003
   * Description: Verify search with empty string
   * Priority: P2
   */
  it('TC-GOOGLE-SEARCH-003 - Should handle empty search gracefully', async function() {
    // Arrange
    await googleHome.open();
    
    // Act
    await googleHome.search('');
    
    // Assert
    const searchBoxValue = await googleHome.getSearchBoxValue();
    expect(searchBoxValue).to.equal('');
  });
  
  /**
   * Test Case: TC-GOOGLE-SEARCH-004
   * Description: Verify special characters handling in search
   * Priority: P2
   */
  testConfig.testData.negativeTests.specialChars.split(' ').forEach(charTest => {
    it(`TC-GOOGLE-SEARCH-004 - Should handle special characters: "${charTest}"`, async function() {
      // Arrange
      await googleHome.open();
      
      // Act
      await googleHome.search(charTest);
      await googleResults.waitForResults();
      
      // Assert
      const resultCount = await googleResults.getResultCount();
      expect(resultCount).to.be.greaterThan(0);
    });
  });
  
  /**
   * Test Case: TC-GOOGLE-SEARCH-005
   * Description: Verify navigation to next page of results
   * Priority: P3
   */
  it('TC-GOOGLE-SEARCH-005 - Should navigate to next page of results', async function() {
    // Arrange
    await googleHome.open();
    await googleHome.search('Bosch');
    await googleResults.waitForResults();
    
    // Act & Assert
    const hasNextButton = await googleResults.isNextButtonDisplayed();
    expect(hasNextButton).to.be.true;
  });
});
