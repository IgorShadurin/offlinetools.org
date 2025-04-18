import * as path from 'node:path'
import {
  type ElectronApplication,
  type Page,
  type JSHandle,
} from 'playwright'
import type { BrowserWindow } from 'electron'
import {
  beforeAll,
  afterAll,
  describe,
  expect,
  test,
} from 'vitest'
import { launchElectronWithRetry, findButtonByText, takeScreenshot } from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Skip all tests if running in GitHub Actions for now
// until we properly fix the CI environment
const isCI = process.env.CI === 'true';
const testMethod = isCI ? test.skip : test;

describe('URL Encoder/Decoder tests', async () => {
  beforeAll(async () => {
    try {
      // Launch Electron with retry logic
      electronApp = await launchElectronWithRetry();
      
      // Get the first window
      page = await electronApp.firstWindow();
      
      // Use longer timeout in CI
      const loadTimeout = isCI ? 30000 : 10000;
      await page.waitForLoadState('domcontentloaded', { timeout: loadTimeout });
      
      const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
      await mainWin.evaluate(async (win) => {
        win.webContents.executeJavaScript('// Test initialization complete')
      });
    } catch (error) {
      console.error('Setup failed:', error);
      throw error; // Make sure the test fails properly if setup fails
    }
  });

  afterAll(async () => {
    if (page) {
      await page.close().catch(err => console.error('Error closing page:', err));
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err));
    }
  });

  testMethod('should properly render URL Encoder/Decoder', async () => {
    expect(page).not.toBeNull();
    
    // Take a screenshot of the initial state
    await takeScreenshot(page, 'url-encoder', 'initial-state');
    
    // Navigate to URL Encoder/Decoder
    await (await findButtonByText(page, 'URL Encoder/Decoder')).click();
    
    // Wait for component to be visible instead of using timeout
    await page.waitForSelector('h3:has-text("URL Encoder/Decoder")', { 
      state: 'visible',
      timeout: isCI ? 5000 : 1500 
    });
    
    // Take a screenshot to verify we're on the URL Encoder page
    await takeScreenshot(page, 'url-encoder', 'url-encoder-page');
    
    // Verify component title
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe('URL Encoder/Decoder');
    
    // Verify textarea components are present
    await page.waitForSelector('textarea', { timeout: isCI ? 15000 : 5000 });
    
    // Input test data with spaces and special characters
    const textareas = await page.$$('textarea');
    await textareas[0].fill('https://example.com/path with spaces?query=special chars!@#$%^&*()');
    
    // Click the Encode URL button
    await (await findButtonByText(page, 'Encode URL')).click();
    
    // Wait for result to appear
    await page.waitForFunction(() => {
      const textareas = document.querySelectorAll('textarea');
      return textareas.length > 1 && textareas[1].value.includes('%20');
    }, { timeout: 2000 });
    
    // Take a screenshot of the encoded result
    await takeScreenshot(page, 'url-encoder', 'after-component-loaded', true);
  });
}); 