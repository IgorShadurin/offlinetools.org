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
  waitForComponentTitle,
  fillTextareaInput,
  waitForTextareaOutput,
  getTextareaOutput
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Tool name constants
const TOOL_BUTTON_NAME = 'JSON Format/Validate';
const COMPONENT_TITLE = 'JSON Format/Validate';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('JSON Format/Validate tests', async () => {
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

  test('should navigate to JSON formatter', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot of initial state
    await takeScreenshot(page, 'json-formatter', 'initial-view');
    
    // Verify correct component is loaded
    await waitForComponentTitle(page, COMPONENT_TITLE);
    
    // Verify component title
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Take screenshot of loaded component
    await takeScreenshot(page, 'json-formatter', 'component-loaded');
  });

  test('should format valid JSON correctly', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate (or ensure we're there)
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input unformatted JSON
    const unformattedJson = '{"name":"John","age":30,"city":"New York","skills":["JavaScript","HTML","CSS"],"address":{"street":"123 Main St","zip":"10001","country":"USA"}}';
    await fillTextareaInput(page, unformattedJson);
    await takeScreenshot(page, 'json-formatter', 'unformatted-input');
    
    // Click format button
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update with formatted content
    const formattedOutput = await waitForTextareaOutput(page, { hasLineBreaks: true });
    
    // Take screenshot of formatted result
    await takeScreenshot(page, 'json-formatter', 'formatted-output', true);
    
    // Verify spacing is correct (the line breaks were already verified by waitForTextareaOutput)
    expect(formattedOutput).toContain('  ');
  });

  test('should show error for invalid JSON', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input invalid JSON
    const invalidJson = '{"name":"John","age":30,city:"New York"}'; // Missing quotes around city
    await fillTextareaInput(page, invalidJson);
    await takeScreenshot(page, 'json-formatter', 'invalid-json-input');
    
    // Click format button
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update with error message
    await waitForTextareaOutput(page, { hasError: true });
    
    // Take screenshot of validation error
    await takeScreenshot(page, 'json-formatter', 'validation-error', true);
  });

  test('should clear input and output when Clear button is clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input some JSON
    await fillTextareaInput(page, '{"test": "data"}');
    
    // Format to get output
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update
    await waitForTextareaOutput(page, { notEmpty: true });
    
    // Verify both textareas have content
    expect(await getTextareaOutput(page, 0)).not.toBe('');
    expect(await getTextareaOutput(page, 1)).not.toBe('');
    
    // Take screenshot before clearing
    await takeScreenshot(page, 'json-formatter', 'before-clear');
    
    // Click Clear button
    await (await findButtonByText(page, 'Clear')).click();
    
    // Wait for textareas to be cleared
    await page.waitForFunction(() => {
      const textareas = document.querySelectorAll('textarea');
      return textareas.length >= 2 && 
             textareas[0].value === '' && 
             textareas[1].value === '';
    }, { timeout: 2000 });
    
    // Take screenshot after clearing
    await takeScreenshot(page, 'json-formatter', 'after-clear', true);
    
    // Verify both textareas are empty
    expect(await getTextareaOutput(page, 0)).toBe('');
    expect(await getTextareaOutput(page, 1)).toBe('');
  });
}); 