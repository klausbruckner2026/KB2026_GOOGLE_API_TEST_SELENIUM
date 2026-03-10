const fs = require('fs');
const path = require('path');

class ReportGenerator {
  static generateSummaryReport(testResults) {
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: testResults.length,
      passed: testResults.filter(t => t.passed).length,
      failed: testResults.filter(t => t.failed).length,
      skipped: testResults.filter(t => t.skipped).length,
      duration: testResults.reduce((acc, t) => acc + t.duration, 0),
      passRate: (testResults.filter(t => t.passed).length / testResults.length * 100).toFixed(2)
    };
    
    return summary;
  }
  
  static generateHTMLReport(summary) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Execution Summary</title>
        <style>
          body { font-family: Arial; margin: 20px; }
          .summary { background: #f0f0f0; padding: 20px; }
          .passed { color: green; }
          .failed { color: red; }
        </style>
      </head>
      <body>
        <h1>Test Execution Summary</h1>
        <div class="summary">
          <p>Timestamp: ${summary.timestamp}</p>
          <p>Total Tests: ${summary.totalTests}</p>
          <p class="passed">Passed: ${summary.passed}</p>
          <p class="failed">Failed: ${summary.failed}</p>
          <p>Skipped: ${summary.skipped}</p>
          <p>Duration: ${summary.duration}ms</p>
          <p>Pass Rate: ${summary.passRate}%</p>
        </div>
      </body>
      </html>
    `;
    
    fs.writeFileSync('reports/summary.html', html);
  }
}

module.exports = ReportGenerator;
