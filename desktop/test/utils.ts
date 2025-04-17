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
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add some delay between retries
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
      const app = await electron.launch({
        args: ['.', '--no-sandbox'],
        cwd: root,
        env: { ...process.env, NODE_ENV: 'development' },
        timeout: 10000, // Increase timeout for launch
      });
      
      return app;
    } catch (error) {
      lastError = error as Error;
    }
  }
  
  throw new Error(`Failed to launch Electron after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Finds a button by text content
 * @param {Page} page - The playwright page
 * @param {string} text - Text content to search for
 * @returns {Promise<any | null>} - The found button or null
 */
export async function findButtonByText(page: Page, text: string) {
  const buttons = await page.$$('button');
  for (const button of buttons) {
    const buttonText = await button.textContent();
    if (buttonText && buttonText.includes(text)) {
      return button;
    }
  }
  return null;
} 