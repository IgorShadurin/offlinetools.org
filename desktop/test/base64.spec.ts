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
const TOOL_BUTTON_NAME = 'Base64 String Encode/Decode';
const COMPONENT_TITLE = 'Base64 Encoder/Decoder';

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

  test('should switch to Base64 Encoder when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'base64-encode', 'base64-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Input test data
    await fillTextareaInput(page, 'hello world');
    await takeScreenshot(page, 'base64-encode', 'after-input');
    
    // Encode the input and wait for result
    await (await findButtonByText(page, 'Encode to Base64')).click();
    
    // Wait for content to update
    await waitForTextareaOutput(page, { notEmpty: true });
    
    // Capture final state
    await takeScreenshot(page, 'base64-encode', 'after-encoding', true);
  });

  test('should switch to Base64 Decoder when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'base64-decode', 'base64-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Switch to decode mode
    await (await findButtonByText(page, 'Decode')).click();
    
    // Input test data
    await fillTextareaInput(page, 'SGVsbG8gV29ybGQh');
    await takeScreenshot(page, 'base64-decode', 'after-input');
    await (await findButtonByText(page, 'Decode from Base64')).click();
    await waitForTextareaOutput(page, { notEmpty: true });
    // Capture final state
    await takeScreenshot(page, 'base64-decode', 'after-decoding', true);
  });
}); 