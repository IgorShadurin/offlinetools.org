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
    // Make sure the page and app are initialized
    expect(page).not.toBeNull();
    
    try {
      // Take a screenshot of the initial state
      await takeScreenshot(page, 'url-encoder', 'initial-state');
      
      // Find and click on the URL Encoder button by its text content
      const urlEncoderButton = await findButtonByText(page, 'URL Encoder');
      expect(urlEncoderButton).not.toBeNull();
      
      await urlEncoderButton.click();
      
      // Wait for the component to load with longer timeout in CI
      const waitTime = isCI ? 5000 : 1500;
      await page.waitForTimeout(waitTime);
      
      // Take a screenshot to verify we're on the URL Encoder page
      await takeScreenshot(page, 'url-encoder', 'url-encoder-page');
      
      // Verify component renders correctly
      const cardTitle = await page.$('h3');
      expect(await cardTitle.textContent()).toBe('URL Encoder/Decoder');
      
      // Test basic functionality - find textareas
      await page.waitForSelector('textarea', { timeout: isCI ? 15000 : 5000 });
      const textareas = await page.$$('textarea');
      expect(textareas.length).toBeGreaterThan(0);
      
      // Take an additional screenshot after finding UI elements (after decoding completed)
      await takeScreenshot(page, 'url-encoder', 'after-component-loaded', true);
      
    } catch (error) {
      console.error('Test failure details:', error);
      
      // Take a screenshot to help debug failures
      if (page) {
        await takeScreenshot(page, 'url-encoder', 'url-encoder-failure');
      }
      
      throw error;
    }
  });
}); 