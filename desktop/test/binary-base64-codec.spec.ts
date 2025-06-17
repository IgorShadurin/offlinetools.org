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
const TOOL_BUTTON_NAME = 'Base64 Binary';
const COMPONENT_TITLE = 'Base64 Binary';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';



/**
 * Helper function to switch between encode/decode modes
 * @param page - Playwright page object
 * @param mode - Mode to switch to ('encode' or 'decode')
 */
async function switchMode(page: Page, mode: 'encode' | 'decode'): Promise<void> {
  const tabText = mode === 'encode' ? 'File to Base64' : 'Base64 to File';
  const tab = await page.waitForSelector(`button:has-text("${tabText}")`);
  await tab.click();
  
  // Wait a moment for the UI to update
  await page.waitForTimeout(100);
}

describe('Base64 Binary tests', async () => {
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

  test('should navigate to Base64 Binary tool', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'binary-base64-codec', 'navigation-success');
    
    // Verify correct component loaded
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
  });

  test('should display basic UI elements', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Wait for file input to exist (even if hidden)
    const fileInput = await page.waitForSelector('input[type="file"]', { timeout: 10000, state: 'attached' });
    expect(fileInput).not.toBeNull();
    
    // Check for mode tabs with timeout
    const encoderTab = await page.waitForSelector('button:has-text("File to Base64")', { timeout: 5000 });
    const decoderTab = await page.waitForSelector('button:has-text("Base64 to File")', { timeout: 5000 });
    expect(encoderTab).not.toBeNull();
    expect(decoderTab).not.toBeNull();
    
    // Check for URL-safe checkbox (not switch since we changed it)
    const urlSafeCheckbox = await page.waitForSelector('input[type="checkbox"]#url-safe', { timeout: 5000 });
    expect(urlSafeCheckbox).not.toBeNull();
    
    // Take screenshot showing the UI
    await takeScreenshot(page, 'binary-base64-codec', 'ui-elements');
  });

  test('should switch between encode and decode modes', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Default should be encode mode - look for file upload text
    const fileUploadArea = await page.waitForSelector('text=Choose a file', { timeout: 10000 });
    expect(fileUploadArea).not.toBeNull();
    
    // Switch to decode mode
    await switchMode(page, 'decode');
    
    // Should now show Base64 input textarea with timeout
    const base64Input = await page.waitForSelector('textarea[placeholder*="Base64"]', { timeout: 10000 });
    expect(base64Input).not.toBeNull();
    
    // Switch back to encode mode
    await switchMode(page, 'encode');
    
    // Should show file upload area again
    const fileUploadAreaAgain = await page.waitForSelector('text=Choose a file', { timeout: 10000 });
    expect(fileUploadAreaAgain).not.toBeNull();
    
    // Take screenshot showing mode switching
    await takeScreenshot(page, 'binary-base64-codec', 'mode-switching');
  });

  test('should handle URL-safe toggle', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Find URL-safe checkbox (updated to use checkbox instead of switch)
    const urlSafeCheckbox = await page.waitForSelector('input[type="checkbox"]#url-safe', { timeout: 10000 });
    
    // Check initial state (should be unchecked)
    const initialState = await urlSafeCheckbox.isChecked();
    expect(initialState).toBe(false);
    
    // Click to enable URL-safe mode
    await urlSafeCheckbox.click();
    
    // Verify state changed
    const newState = await urlSafeCheckbox.isChecked();
    expect(newState).toBe(true);
    
    // Take screenshot showing URL-safe mode enabled
    await takeScreenshot(page, 'binary-base64-codec', 'url-safe-enabled');
  });

  test('should show appropriate buttons for each mode', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // In encode mode, should show "Convert to Base64" button
    const encodeButton = await page.waitForSelector('button:has-text("Convert to Base64")', { timeout: 10000 });
    expect(encodeButton).not.toBeNull();
    
    // Button should be disabled initially (no file selected)
    const isDisabled = await encodeButton.isDisabled();
    expect(isDisabled).toBe(true);
    
    // Switch to decode mode
    await switchMode(page, 'decode');
    
    // Should show "Convert to File" button
    const decodeButton = await page.waitForSelector('button:has-text("Convert to File")', { timeout: 10000 });
    expect(decodeButton).not.toBeNull();
    
    // Button should be disabled initially (no Base64 input)
    const isDecodeDisabled = await decodeButton.isDisabled();
    expect(isDecodeDisabled).toBe(true);
    
    // Take screenshot showing buttons
    await takeScreenshot(page, 'binary-base64-codec', 'mode-buttons');
  });

  test('should enable decode button when Base64 input is provided', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Switch to decode mode
    await switchMode(page, 'decode');
    
    // Find Base64 input textarea
    const base64Input = await page.waitForSelector('textarea[placeholder*="Base64"]', { timeout: 10000 });
    
    // Add some Base64 content
    await base64Input.fill('SGVsbG8gV29ybGQ='); // "Hello World" in Base64
    
    // Wait a moment for the state to update
    await page.waitForTimeout(500);
    
    // Convert button should now be enabled
    const convertButton = await page.waitForSelector('button:has-text("Convert to File")', { timeout: 10000 });
    const isEnabled = await convertButton.isEnabled();
    expect(isEnabled).toBe(true);
    
    // Take screenshot showing enabled state
    await takeScreenshot(page, 'binary-base64-codec', 'decode-button-enabled');
  });

  test('should display error for invalid Base64 input', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Switch to decode mode
    await switchMode(page, 'decode');
    
    // Find Base64 input textarea and add invalid content
    const base64Input = await page.waitForSelector('textarea[placeholder*="Base64"]', { timeout: 10000 });
    await base64Input.fill('InvalidBase64!@#$%');
    
    // Wait for button to be enabled
    await page.waitForTimeout(500);
    
    // Click convert button
    const convertButton = await page.waitForSelector('button:has-text("Convert to File")', { timeout: 10000 });
    await convertButton.click();
    
    // Should show error message - look for error text
    const errorMessage = await page.waitForSelector('.text-red-700, .text-red-600, .text-red-300', { timeout: 10000 });
    expect(errorMessage).not.toBeNull();
    
    // Take screenshot showing error state
    await takeScreenshot(page, 'binary-base64-codec', 'decode-error');
  });

  test('should show file information when valid Base64 is decoded', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 Binary tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Switch to decode mode
    await switchMode(page, 'decode');
    
    // Find Base64 input textarea and add valid Base64
    const base64Input = await page.waitForSelector('textarea[placeholder*="Base64"]', { timeout: 10000 });
    await base64Input.fill('SGVsbG8gV29ybGQ='); // "Hello World" in Base64
    
    // Wait for button to be enabled
    await page.waitForTimeout(500);
    
    // Click convert button
    const convertButton = await page.waitForSelector('button:has-text("Convert to File")', { timeout: 10000 });
    await convertButton.click();
    
    // Should show decoded file information - wait for processing
    const fileInfo = await page.waitForSelector('text=decoded-file.bin', { timeout: 10000 });
    expect(fileInfo).not.toBeNull();
    
    // Should show download button
    const downloadButton = await page.waitForSelector('button:has-text("Download File")', { timeout: 10000 });
    expect(downloadButton).not.toBeNull();
    
    // Take screenshot showing successful decode
    await takeScreenshot(page, 'binary-base64-codec', 'decode-success');
  });
}); 