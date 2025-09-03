# CI/CD Implementation Guide

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) setup for the Playwright Automation Framework.

## CI/CD Architecture

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  Source Code  │────▶│  GitHub       │────▶│  Test         │────▶│  Report       │
│  Repository   │     │  Actions      │     │  Execution    │     │  Deployment   │
└───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
```

## Components

### 1. GitHub Actions Workflows

Two primary workflows manage the CI/CD pipeline:

#### a. Playwright Tests (`playwright.yml`)

- **Trigger Events**:
  - Push to main branch
  - Pull requests to main branch
  - Scheduled runs (weeknights at midnight)
  - Manual triggering via GitHub UI

- **Jobs**:
  - Setting up Node.js environment
  - Installing project dependencies
  - Installing Playwright browsers
  - Running UI tests
  - Running API tests
  - Generating and uploading test reports

#### b. Deploy Test Reports (`deploy-reports.yml`)

- **Trigger Events**:
  - Completion of Playwright Tests workflow
  - Manual triggering

- **Jobs**:
  - Downloading test report artifacts
  - Configuring GitHub Pages
  - Deploying Monocart reports to GitHub Pages

### 2. Docker Configuration

A Docker Compose setup (`docker-compose.yml`) provides consistent test execution across environments:

- Uses Microsoft's official Playwright Docker image
- Mounts local project files
- Installs dependencies and runs tests
- Ensures permissions are set correctly on output files

## How to Use

### Setting Up GitHub Repository

1. Push your code to GitHub including the `.github/workflows` directory
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"

### Running Tests Manually

To trigger the test workflow manually:
1. Go to your repository on GitHub
2. Navigate to Actions → Playwright Tests
3. Click "Run workflow"
4. Select the branch to run tests on

### Running Tests Locally with Docker

```bash
# Run all tests
docker-compose up

# Run tests with specific configuration
docker-compose run playwright npm run test:ui
```

## Verifying CI/CD Setup

After pushing your code to GitHub with the workflow files:

1. **Check Workflow Execution**:
   - Go to your repository's "Actions" tab
   - Verify that the "Playwright Tests" workflow runs automatically

2. **View Test Reports**:
   - After workflow completion, go to Settings → Pages to find the published URL
   - Reports will be available at `https://{your-github-username}.github.io/{repository-name}/`

3. **Monitor Test Executions**:
   - Each workflow run will have logs and artifacts
   - Download artifacts directly from the workflow summary page

## Troubleshooting

- **Missing Artifacts**: Ensure upload/download paths match in both workflows
- **Workflow Permission Issues**: Check repository settings → Actions → General
- **GitHub Pages Not Deploying**: Verify Pages source is set to GitHub Actions

## Best Practices

1. **Keep Tests Atomic**: Tests should be independent and focused
2. **Handle Environment Variables**: Use GitHub Secrets for sensitive data
3. **Optimize Test Execution**: Use parallelization and sharding for large test suites
4. **Monitor Test Trends**: Use Monocart's trending feature to track test stability over time
