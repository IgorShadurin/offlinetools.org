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

describe('URL Encoder/Decoder tests', async () => {
  beforeAll(async () => {
    try {
      // Launch Electron with retry logic
      electronApp = await launchElectronWithRetry();
      
      // Get the first window
      page = await electronApp.firstWindow();
      await page.waitForLoadState('domcontentloaded');
      
      const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
      await mainWin.evaluate(async (win) => {
        win.webContents.executeJavaScript('console.log("Execute JavaScript with URL Encoder test.")')
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

  test('should properly render URL Encoder/Decoder', async () => {
    // Make sure the page and app are initialized
    expect(page).not.toBeNull();
    
    try {
      // Take a screenshot of the initial state
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'initial-state.png') });
      
      // Find and click on the URL Encoder button by its text content
      const urlEncoderButton = await findButtonByText(page, 'URL Encoder');
      expect(urlEncoderButton).not.toBeNull();
      await urlEncoderButton.click();
      
      // Wait for the component to load
      await page.waitForTimeout(1500);
      
      // Take a screenshot to verify we're on the URL Encoder page
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'url-encoder-page.png') });
      
      // Verify component renders correctly
      const cardTitle = await page.$('h3');
      expect(await cardTitle.textContent()).toBe('URL Encoder/Decoder');
      
      // Test basic functionality - find textareas
      await page.waitForSelector('textarea', { timeout: 5000 });
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