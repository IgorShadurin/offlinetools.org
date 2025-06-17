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
    console.log('Running in CI environment with increased retries and timeouts');
  }
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add some delay between retries
      if (attempt > 0) {
        console.log(`Electron launch attempt ${attempt + 1}/${maxRetries} after ${retryDelay}ms delay`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
      // Launch with more generous timeout in CI
      const launchTimeout = isCI ? 60000 : 15000;
      
      const app = await electron.launch({
        args: ['.', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
        cwd: root,
        env: { 
          ...process.env, 
          NODE_ENV: 'test',
          ELECTRON_ENABLE_LOGGING: '1',
          ...(isCI ? { 
            ELECTRON_ENABLE_SECURITY_WARNINGS: 'false', 
            DISPLAY: ':99',
            ELECTRON_DISABLE_SANDBOX: '1'
          } : {}),
        },
        timeout: launchTimeout,
      });
      
      console.log(`Electron launched successfully on attempt ${attempt + 1}`);
      return app;
    } catch (error) {
      lastError = error as Error;
      console.error(`Electron launch attempt ${attempt + 1} failed:`, error.message);
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
      if (buttonText && buttonText === text) {
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
    const decodingDir = path.join(testDir, 'after');
    if (!fs.existsSync(decodingDir)) {
      fs.mkdirSync(decodingDir, { recursive: true });
    }
    targetDir = decodingDir;
  }
  
  const fileName = `${screenshotName}.png`;
  const filePath = path.join(targetDir, fileName);
  
  // Check if running in CI environment
  const isCI = process.env.CI === 'true';
  
  if (isCI) {
    // In CI, create an empty file instead of taking an actual screenshot
    fs.writeFileSync(filePath, '');
    console.log(`[CI] Mock screenshot created: ${filePath}`);
  } else {
    // In local development, take an actual screenshot
    try {
      // Ensure window has dimensions before screenshot
      await page.evaluate(() => {
        if (window.innerWidth === 0) window.resizeTo(1280, 800);
      });
      await page.screenshot({ path: filePath });
    } catch (error) {
      console.warn(`Screenshot failed: ${error.message}`);
      // Create empty file as fallback
      fs.writeFileSync(filePath, '');
    }
  }
  
  return filePath;
}

/**
 * Navigates to a specific tool by clicking on its sidebar button
 * @param {Page} page - Playwright page object
 * @param {string} toolName - The exact name of the tool as it appears in the sidebar
 * @param {string} componentTitle - Optional component title to wait for (if different from toolName)
 * @returns {Promise<void>} Promise that resolves when navigation is complete and component is visible
 */
export async function navigateToTool(page: Page, toolName: string, componentTitle?: string): Promise<void> {
  if (!page) {
    throw new Error('Page object is null or undefined');
  }
  
  // Find and click the tool button in the sidebar
  const button = await findButtonByText(page, toolName);
  if (!button) {
    throw new Error(`Tool button "${toolName}" not found in sidebar`);
  }
  
  await button.click();
  
  // Use provided componentTitle or fallback to toolName
  const titleToWaitFor = componentTitle || toolName;
  
  // Wait for the component title to appear
  await waitForComponentTitle(page, titleToWaitFor);
}

/**
 * Waits for a component to be fully loaded by its title
 * @param {Page} page - Playwright page object
 * @param {string} title - The title text to wait for (exact match)
 * @param {number} timeout - Timeout in milliseconds (default: adjusted based on CI environment)
 * @returns {Promise<void>} Promise that resolves when component is visible
 */
export async function waitForComponentTitle(page: Page, title: string, timeout?: number): Promise<void> {
  if (!page) {
    throw new Error('Page object is null or undefined');
  }
  
  // Adjust timeout for CI environment if not specified
  if (!timeout) {
    timeout = process.env.CI === 'true' ? 5000 : 1500;
  }
  
  try {
    // Wait for h1, h2, or h3 with exact text content (flexible title selector)
    await page.waitForSelector(`h1:has-text("${title}"), h2:has-text("${title}"), h3:has-text("${title}")`, {
      state: 'visible',
      timeout
    });
  } catch (error) {
    console.error(`Error waiting for component title "${title}":`, error);
    throw new Error(`Component with title "${title}" did not appear within timeout`);
  }
}

/**
 * Interface for wait options when waiting for textarea output
 */
export interface WaitForOutputOptions {
  /** Text content that must be included in the output */
  contains?: string;
  /** Check if output is not empty */
  notEmpty?: boolean;
  /** Check if output includes a specific error message */
  hasError?: boolean;
  /** Check if output includes line breaks (for formatting) */
  hasLineBreaks?: boolean;
  /** Maximum time to wait in milliseconds */
  timeout?: number;
  /** Index of the textarea to check (default: 1 for output) */
  index?: number;
}

/**
 * Fills the input textarea with test data
 * @param {Page} page - Playwright page object
 * @param {string} text - The text to input
 * @param {number} index - Optional index of the textarea (default: 0 for input)
 * @returns {Promise<any>} Promise resolving to the filled textarea element
 */
export async function fillTextareaInput(page: Page, text: string, index = 0): Promise<any> {
  if (!page) {
    throw new Error('Page object is null or undefined');
  }
  
  // Wait for textareas to be available
  await page.waitForSelector('textarea', { 
    state: 'visible',
    timeout: process.env.CI === 'true' ? 10000 : 5000
  });
  
  // Get all textareas and select the one at the specified index
  const textareas = await page.$$('textarea');
  
  if (!textareas || textareas.length <= index) {
    throw new Error(`No textarea found at index ${index}`);
  }
  
  // Fill the textarea with the provided text
  await textareas[index].fill(text);
  
  return textareas[index];
}

/**
 * Gets the value from a textarea
 * @param {Page} page - Playwright page object
 * @param {number} index - Index of the textarea (default: 1 for output)
 * @returns {Promise<string>} Promise resolving to the textarea content
 */
export async function getTextareaOutput(page: Page, index = 1): Promise<string> {
  if (!page) {
    throw new Error('Page object is null or undefined');
  }
  
  // Wait for textareas to be available
  await page.waitForSelector('textarea', { 
    state: 'visible',
    timeout: process.env.CI === 'true' ? 10000 : 5000
  });
  
  // Get all textareas and select the one at the specified index
  const textareas = await page.$$('textarea');
  
  if (!textareas || textareas.length <= index) {
    throw new Error(`No textarea found at index ${index}`);
  }
  
  // Get the content of the textarea
  return textareas[index].inputValue();
}

/**
 * Waits for output to appear in a textarea with various conditions
 * @param {Page} page - Playwright page object
 * @param {WaitForOutputOptions} options - Options for what to wait for
 * @returns {Promise<string>} Promise that resolves to the output text when the condition is met
 */
export async function waitForTextareaOutput(page: Page, options: WaitForOutputOptions = {}): Promise<string> {
  if (!page) {
    throw new Error('Page object is null or undefined');
  }
  
  // Set default timeout based on CI environment
  const timeout = options.timeout || (process.env.CI === 'true' ? 10000 : 2000);
  const index = options.index ?? 1;
  
  try {
    // Create a condition function based on the provided options
    await page.waitForFunction((opts) => {
      const textareas = document.querySelectorAll('textarea');

      if (textareas.length === 0) return false;

      // Determine which textarea to use as output
      const outIdx = opts.index ?? textareas.length - 1;
      const outputTextarea = textareas[outIdx];
      const outputValue = outputTextarea.value;
      
      // If no output yet, condition is not met
      if (!outputValue) return false;
      
      // Check specific conditions
      if (opts.contains && !outputValue.includes(opts.contains)) return false;
      if (opts.notEmpty && outputValue.trim() === '') return false;
      if (opts.hasError && !outputValue.includes('Error')) return false;
      if (opts.hasLineBreaks && !outputValue.includes('\n')) return false;
      
      // All checks passed
      return true;
    }, { ...options, index }, { timeout });

    // Return the output text
    return await getTextareaOutput(page, index);
  } catch (error) {
    console.error('Error waiting for textarea output:', error);
    throw new Error(`Timed out waiting for textarea output: ${JSON.stringify(options)}`);
  }
}

/**
 * Waits for text content to appear on the page
 * @param {Page} page - Playwright page object
 * @param {string} text - The text to wait for
 * @param {number} timeout - Timeout in milliseconds
 */
export async function waitForText(page: Page, text: string, timeout = 5000): Promise<void> {
  await page.waitForSelector(`text=${text}`, { timeout });
}
