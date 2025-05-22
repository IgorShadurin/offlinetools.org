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
let page: Page

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('[electron-vite-react] e2e tests', async () => {
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

  test('startup', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Take initial screenshot
    await takeScreenshot(page, 'e2e-startup', 'initial-view');
    
    const title = await page.title();
    expect(title).toBe('Offline Tools');
  });

  test('should load the tools sidebar correctly', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Use longer timeout in CI
    const waitTimeout = isCI ? 15000 : 5000;
    await page.waitForLoadState('domcontentloaded', { timeout: waitTimeout });
    
    // Take screenshot of sidebar
    await takeScreenshot(page, 'e2e-sidebar', 'sidebar-view');
    
    // Look for any interactive element that should be present in the sidebar
    // This ensures the sidebar content has loaded before we check for specific buttons
    await page.waitForFunction(() => {
      // Check if there are any buttons rendered on the page
      return document.querySelectorAll('button').length > 0;
    }, { timeout: waitTimeout });
    
    // Now check for specific tool buttons - these should be available now
    const jsonFormatButton = await findButtonByText(page, 'JSON Format/Validate');
    expect(jsonFormatButton).not.toBeNull();
    
    const base64Button = await findButtonByText(page, 'Base64 String Encode/Decode');
    expect(base64Button).not.toBeNull();
    
    const urlEncoderButton = await findButtonByText(page, 'URL Encoder/Decoder');
    expect(urlEncoderButton).not.toBeNull();
  });
});
