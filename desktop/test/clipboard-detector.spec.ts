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
  waitForComponentTitle,
  findButtonByText
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page

// Tool name constants
const TOOL_BUTTON_NAME = 'Clipboard Detector';
const COMPONENT_TITLE = 'Clipboard Detector';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('Clipboard Detector tests', async () => {
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

  test('should load the clipboard detector component by default', async () => {
    expect(page).not.toBeNull();
    
    // Take screenshot of initial state
    await takeScreenshot(page, 'clipboard-detector', 'initial-view');
    
    // Wait for the sidebar to be visible
    await page.waitForSelector('div.w-64', { state: 'visible' });

    // Verify the clipboard detector is the first tool and selected by default
    const firstTool = await page.locator('button:has-text("Clipboard Detector")').first();
    expect(await firstTool.isVisible()).toBe(true);
    
    const className = await firstTool.getAttribute('class');
    expect(className).toContain('bg-primary/10');

    // Verify the component title is visible
    await waitForComponentTitle(page, COMPONENT_TITLE);
    
    // Take screenshot of loaded component
    await takeScreenshot(page, 'clipboard-detector', 'component-loaded');
  });

  test('should refresh clipboard when clicking the refresh button', async () => {
    expect(page).not.toBeNull();
    
    // Wait for the component to load
    await waitForComponentTitle(page, COMPONENT_TITLE);

    // Find and click the refresh button
    const refreshButton = await findButtonByText(page, 'Refresh');
    expect(refreshButton).not.toBeNull();
    if (!refreshButton) throw new Error('Refresh button not found');
    await refreshButton.click();

    // Take screenshot after refresh
    await takeScreenshot(page, 'clipboard-detector', 'after-refresh');
    
    // The test passes if we've reached this point without errors
  });
});                