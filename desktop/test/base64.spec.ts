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
  takeScreenshot, 
  navigateToTool
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Tool name constants
const TOOL_BUTTON_NAME = 'Base64 String';
const COMPONENT_TITLE = 'Base64 String';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('Base64 Encoder/Decoder tests', async () => {
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
      throw error;
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

  test('should switch to Base64 Encoder when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot
    await takeScreenshot(page, 'base64-encoder', 'base64-encoder-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
  });

  test('should switch to Base64 Decoder when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot
    await takeScreenshot(page, 'base64-decoder', 'base64-decoder-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
  });
}); 