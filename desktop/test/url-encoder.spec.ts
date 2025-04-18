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
import { 
  launchElectronWithRetry, 
  findButtonByText, 
  takeScreenshot, 
  navigateToTool,
  fillTextareaInput,
  waitForTextareaOutput,
  getTextareaOutput
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Tool name constants
const TOOL_BUTTON_NAME = 'URL Encoder/Decoder';
const COMPONENT_TITLE = 'URL Encoder/Decoder';

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
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take a screenshot to verify we're on the URL Encoder page
    await takeScreenshot(page, 'url-encoder', 'url-encoder-page');
    
    // Verify component title
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Input test data with spaces and special characters
    const testData = 'https://example.com/path with spaces?query=special chars!@#$%^&*()';
    await fillTextareaInput(page, testData);
    
    // Click the Encode URL button
    await (await findButtonByText(page, 'Encode URL')).click();
    
    // Wait for result containing encoded spaces (the contains option confirms %20 is present)
    await waitForTextareaOutput(page, { contains: '%20' });
    
    // Take a screenshot of the encoded result
    await takeScreenshot(page, 'url-encoder', 'after-component-loaded', true);
  });

  testMethod('should decode URL encoded text', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to URL Encoder/Decoder
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Switch to Decode tab
    await (await findButtonByText(page, 'Decode')).click();
    
    // Take a screenshot of the decode tab
    await takeScreenshot(page, 'url-decoder', 'decode-tab-view');
    
    // Input encoded test data
    const encodedData = 'https%3A%2F%2Fexample.com%2Fpath%20with%20spaces%3Fquery%3Dspecial%20chars%21%40%23%24%25%5E%26%2A%28%29';
    await fillTextareaInput(page, encodedData);
    await takeScreenshot(page, 'url-decoder', 'after-input');
    
    // Click the Decode URL button
    await (await findButtonByText(page, 'Decode URL')).click();
    
    // Wait for result containing decoded content (the contains option confirms example.com is present)
    await waitForTextareaOutput(page, { contains: 'example.com' });
    
    // Take a screenshot of the decoded result
    await takeScreenshot(page, 'url-decoder', 'after-decoding', true);
  });
}); 