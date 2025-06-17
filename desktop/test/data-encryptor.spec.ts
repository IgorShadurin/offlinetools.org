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
  navigateToTool
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Tool name constants
const TOOL_BUTTON_NAME = 'Data Encryptor';
const COMPONENT_TITLE = 'Data Encryptor';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

/**
 * Helper function to fill password input
 * @param page - Playwright page object
 * @param password - Password to fill
 */
async function fillPasswordInput(page: Page, password: string): Promise<void> {
  const passwordInput = await page.waitForSelector('input[type="password"], input[type="text"]');
  await passwordInput.fill(password);
}

describe('Data Encryptor tests', async () => {
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

  test('should navigate to Data Encryptor tool', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Data Encryptor tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'data-encryptor', 'navigation-success');
    
    // Verify correct component loaded
    await expect(page.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
  });

  test('should display basic UI elements', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Data Encryptor tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Wait for basic elements to be present
    const passwordInput = await page.$('input[type="password"], input[type="text"]');
    expect(passwordInput).not.toBeNull();
    
    const textareas = await page.$$('textarea');
    expect(textareas.length).toBeGreaterThan(0);
    
    // Take screenshot showing the UI
    await takeScreenshot(page, 'data-encryptor', 'ui-elements');
  });
}); 