# Playwright Assessment - Automation Framework

A comprehensive end-to-end testing framework built with Playwright, featuring UI and API tests with Monocart Reporter integration.

## Prerequisites

* Node.js (latest LTS version recommended)
  * Download from: https://nodejs.org/en/download
* Visual Studio Code
  * Download from: https://code.visualstudio.com/
* Git (for version control)
  * Download from: https://git-scm.com/downloads

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/marcelp/PlaywrightAssessment.git
cd PlaywrightAssessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## Project Structure

```
PlaywrightAssessment/
├── API/                  # API testing related files
│   ├── data/             # API request data
│   └── helpers/          # API helper functions
├── Pages/                # Page Object Models
│   └── data/             # Test data for UI tests
├── tests/                # Test files
│   ├── APITests/         # API test specs
│   └── UITests/          # UI test specs
├── monocart-report/      # Monocart Reporter output
├── playwright-report/    # Default Playwright report
├── test-results/         # Test artifacts (screenshots, videos, traces)
└── playwright.config.js  # Playwright configuration
```

## Test Execution

### Running All Tests

To execute all tests across all configured browsers:

```bash
npm run test
```

### Running UI Tests Only

To run all UI tests:

```bash
npm run test:ui
```

### Running API Tests Only

To run all API tests:

```bash
npm run test:api
```

### Running Tests in Headed Mode

To run tests with browser UI visible:

```bash
npm run test:headed
```

### Running Tests in Debug Mode

For step-by-step debugging:

```bash
npm run test:debug
```

### Run Tests and View Report

To run tests and automatically open the Monocart report:

```bash
npm run test:report
```

## Viewing Test Reports

### Monocart Reporter

The project is configured with Monocart Reporter, a feature-rich reporting tool that provides enhanced visualization of test results.

To view the latest report:

```bash
npm run show-report
```

The report will be available at: http://localhost:8090/index.html

### Report Features

* Enhanced UI with dark/light theme
* Test statistics and timing data
* Screenshot and video attachments for failures
* Coverage reporting
* Trend analysis (historical data)

## Configuration

The project uses the following configurations:

* **Browser Support**: Chrome, Firefox, Safari (WebKit)
* **Parallelization**: Tests run in parallel for faster execution
* **Retries**: Failed tests are retried automatically on CI
* **Screenshots**: Captured on test failure
* **Videos**: Retained for failed tests
* **Traces**: Collected on first retry

## Continuous Integration/Continuous Deployment

This project includes a complete CI/CD pipeline using GitHub Actions for test automation:

### CI Pipeline Features

* **Automated Test Execution**:
  * Runs on every push to the main branch
  * Runs on every pull request
  * Scheduled runs on weeknights
  * Manual triggering available
* **Environment Optimizations**:
  * Reduced parallelism to avoid resource contention
  * Automatic retries for flaky tests
  * Headless browser execution
  * Docker containerization available

### CD Pipeline Features

* **Automated Report Deployment**:
  * Monocart HTML reports published to GitHub Pages
  * Test artifacts preserved for analysis
  * Historical test trends accessible online

### Docker Support

The project includes Docker Compose configuration for containerized testing:

```bash
# Run all tests in a container
docker-compose up
```

### Documentation

For detailed information about the CI/CD implementation:
* [CI/CD Implementation Guide](./CI_CD_GUIDE.md) - Complete CI/CD setup details

## Additional Information

For more detailed information about the Monocart Reporter implementation, see the [MONOCART_REPORTER_GUIDE.md](./MONOCART_REPORTER_GUIDE.md) file.
