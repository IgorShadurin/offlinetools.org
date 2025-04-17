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
import { launchElectronWithRetry, findButtonByText } from './utils'

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
      console.log('Starting URL Encoder test setup');
      
      // Launch Electron with retry logic
      electronApp = await launchElectronWithRetry();
      
      // Get the first window
      console.log('Getting first window');
      page = await electronApp.firstWindow();
      
      // Use longer timeout in CI
      const loadTimeout = isCI ? 30000 : 10000;
      console.log(`Waiting for page load with timeout: ${loadTimeout}ms`);
      await page.waitForLoadState('domcontentloaded', { timeout: loadTimeout });
      
      const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
      await mainWin.evaluate(async (win) => {
        win.webContents.executeJavaScript('console.log("Execute JavaScript with URL Encoder test.")')
      });
      
      console.log('URL Encoder test setup complete');
    } catch (error) {
      console.error('Setup failed:', error);
      throw error; // Make sure the test fails properly if setup fails
    }
  });

  afterAll(async () => {
    console.log('Running afterAll cleanup');
    if (page) {
      await page.close().catch(err => console.error('Error closing page:', err));
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err));
    }
    console.log('Cleanup complete');
  });

  testMethod('should properly render URL Encoder/Decoder', async () => {
    // Make sure the page and app are initialized
    expect(page).not.toBeNull();
    
    try {
      console.log('Starting URL Encoder/Decoder test');
      
      // Create screenshots directory if it doesn't exist
      try {
        // Create directory to store screenshots
        const screenshotsDir = path.join(__dirname, 'screenshots');
        const fs = require('fs');
        if (!fs.existsSync(screenshotsDir)) {
          fs.mkdirSync(screenshotsDir, { recursive: true });
        }
      } catch (error) {
        console.error('Error creating screenshots directory:', error);
      }
      
      // Take a screenshot of the initial state
      console.log('Taking initial screenshot');
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'initial-state.png') });
      
      // Find and click on the URL Encoder button by its text content
      console.log('Finding URL Encoder button');
      const urlEncoderButton = await findButtonByText(page, 'URL Encoder');
      expect(urlEncoderButton).not.toBeNull();
      
      console.log('Clicking URL Encoder button');
      await urlEncoderButton.click();
      
      // Wait for the component to load with longer timeout in CI
      const waitTime = isCI ? 5000 : 1500;
      console.log(`Waiting for component to load: ${waitTime}ms`);
      await page.waitForTimeout(waitTime);
      
      // Take a screenshot to verify we're on the URL Encoder page
      console.log('Taking URL Encoder page screenshot');
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'url-encoder-page.png') });
      
      // Verify component renders correctly
      console.log('Verifying component title');
      const cardTitle = await page.$('h3');
      expect(await cardTitle.textContent()).toBe('URL Encoder/Decoder');
      
      // Test basic functionality - find textareas
      console.log('Finding textareas');
      await page.waitForSelector('textarea', { timeout: isCI ? 15000 : 5000 });
      const textareas = await page.$$('textarea');
      expect(textareas.length).toBeGreaterThan(0);
      
      // Success if we've made it this far
      console.log('URL Encoder/Decoder test passed - component renders correctly');
    } catch (error) {
      console.error('Test failure details:', error);
      
      // Take a screenshot to help debug failures
      if (page) {
        await page.screenshot({ path: path.join(__dirname, 'screenshots', 'url-encoder-failure.png') });
      }
      
      throw error;
    }
  });
}); 