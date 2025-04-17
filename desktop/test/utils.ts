import * as path from 'node:path'
import { type ElectronApplication, _electron as electron, type Page } from 'playwright'

const root = path.join(__dirname, '..')

/**
 * Attempts to launch Electron with retries
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} retryDelay - Delay between retries in milliseconds
 * @returns {Promise<ElectronApplication>} The launched Electron application
 */
export async function launchElectronWithRetry(maxRetries = 6, retryDelay = 2000): Promise<ElectronApplication> {
  let lastError: Error | null = null;
  
  // Check if running in CI
  const isCI = process.env.CI === 'true';
  
  // Increase retries and timeout in CI environment
  if (isCI) {
    maxRetries = 10;
    retryDelay = 3000;
  }
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add some delay between retries
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
      // Launch with more generous timeout in CI
      const launchTimeout = isCI ? 30000 : 15000;
      
      const app = await electron.launch({
        args: ['.', '--no-sandbox'],
        cwd: root,
        env: { 
          ...process.env, 
          NODE_ENV: 'test',
          ELECTRON_ENABLE_LOGGING: '1',
        },
        timeout: launchTimeout,
      });
      
      return app;
    } catch (error) {
      lastError = error as Error;
      console.error(`Electron launch attempt ${attempt + 1} failed:`, error);
    }
  }
  
  console.error('All Electron launch attempts failed');
  throw new Error(`Failed to launch Electron after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Find a button element by its text content
 * @param {Page} page - Playwright page object
 * @param {string} text - Text to search for
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<any>} - Button element or null if not found
 */
export async function findButtonByText(page: Page, text: string, timeout = 5000) {
  // Adjust timeout for CI
  if (process.env.CI === 'true') {
    timeout = 15000;
  }
  
  try {
    // Wait for any buttons to appear
    await page.waitForSelector('button', { timeout });
    
    // Find buttons containing the specified text
    const buttons = await page.$$('button');
    
    for (const button of buttons) {
      const buttonText = await button.textContent();
      if (buttonText && buttonText.includes(text)) {
        return button;
      }
    }
    
    // If no exact match, try a more flexible search
    for (const button of buttons) {
      const buttonText = await button.textContent();
      if (buttonText && buttonText.toLowerCase().includes(text.toLowerCase())) {
        return button;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding button with text "${text}":`, error);
    return null;
  }
}

/**
 * Takes a screenshot and saves it to a specific test folder
 * @param {Page} page - Playwright page object
 * @param {string} testName - Name of the test for grouping screenshots
 * @param {string} screenshotName - Name for the screenshot file
 * @param {boolean} afterDecoding - Whether this screenshot is taken after decoding information
 * @returns {Promise<string>} - Path to the saved screenshot
 */
export async function takeScreenshot(
  page: Page, 
  testName: string, 
  screenshotName: string,
  afterDecoding = false
): Promise<string> {
  const fs = require('fs');
  const screenshotsDir = path.join(__dirname, 'screenshots');
  
  // Create main screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  // Create a directory for this specific test
  const testDir = path.join(screenshotsDir, testName);
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // If this is after decoding, create a special subdirectory
  let targetDir = testDir;
  if (afterDecoding) {
    const decodingDir = path.join(testDir, 'after-decoding');
    if (!fs.existsSync(decodingDir)) {
      fs.mkdirSync(decodingDir, { recursive: true });
    }
    targetDir = decodingDir;
  }
  
  const fileName = `${screenshotName}.png`;
  const filePath = path.join(targetDir, fileName);
  
  await page.screenshot({ path: filePath });
  
  return filePath;
} 