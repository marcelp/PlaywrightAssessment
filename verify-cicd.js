// verify-cicd.js
// Script to verify CI/CD configuration

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);
const existsPromise = util.promisify(fs.exists);

async function verifyCICDSetup() {
  console.log('🔍 Verifying CI/CD configuration...\n');
  
  // Check for GitHub workflow files
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
  const playwrightYml = path.join(workflowsDir, 'playwright.yml');
  const deployReportsYml = path.join(workflowsDir, 'deploy-reports.yml');
  
  console.log('Checking workflow files:');
  
  if (await existsPromise(playwrightYml)) {
    console.log('✅ playwright.yml found');
  } else {
    console.log('❌ playwright.yml not found');
  }
  
  if (await existsPromise(deployReportsYml)) {
    console.log('✅ deploy-reports.yml found');
  } else {
    console.log('❌ deploy-reports.yml not found');
  }
  
  // Check Docker configuration
  const dockerComposeYml = path.join(process.cwd(), 'docker-compose.yml');
  
  console.log('\nChecking Docker configuration:');
  
  if (await existsPromise(dockerComposeYml)) {
    console.log('✅ docker-compose.yml found');
  } else {
    console.log('❌ docker-compose.yml not found');
  }
  
  // Check npm scripts
  console.log('\nChecking npm scripts:');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    const scripts = packageJson.scripts || {};
    
    const requiredScripts = ['test', 'test:ui', 'test:api'];
    for (const script of requiredScripts) {
      if (scripts[script]) {
        console.log(`✅ npm script '${script}' found: ${scripts[script]}`);
      } else {
        console.log(`❌ npm script '${script}' not found`);
      }
    }
  } catch (error) {
    console.log('❌ Error reading package.json:', error.message);
  }
  
  // Verify git setup
  console.log('\nVerifying Git configuration:');
  
  try {
    const { stdout: remoteOutput } = await execPromise('git remote -v');
    if (remoteOutput.includes('github.com')) {
      console.log('✅ GitHub remote configured');
    } else {
      console.log('⚠️ No GitHub remote found. Add a remote with: git remote add origin https://github.com/username/repo.git');
    }
  } catch (error) {
    console.log('❌ Git not configured or not a git repository');
  }
  
  // Check Playwright installation
  console.log('\nChecking Playwright installation:');
  
  try {
    const { stdout: playwrightVersion } = await execPromise('npx playwright --version');
    console.log(`✅ Playwright installed: ${playwrightVersion.trim()}`);
  } catch (error) {
    console.log('❌ Playwright not installed or error running Playwright');
  }
  
  console.log('\n🎯 CI/CD Verification Summary:');
  console.log('1. Ensure you have a GitHub repository set up');
  console.log('2. Push these configuration files to your repository');
  console.log('3. Go to GitHub repository Settings > Pages and set source to "GitHub Actions"');
  console.log('4. Make a small change, commit, and push to trigger the workflow');
  console.log('5. Check the Actions tab in your GitHub repository to see the workflow running');
}

verifyCICDSetup().catch(console.error);
