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
import { launchElectronWithRetry, findButtonByText, takeScreenshot, navigateToTool, waitForComponentTitle } from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

// Tool name constants
const TOOL_BUTTON_NAME = 'JSON Format/Validate';
const COMPONENT_TITLE = 'JSON Format/Validate';

// Skip all tests if running in GitHub Actions for now
// until we properly fix the CI environment
const isCI = process.env.CI === 'true';
const testMethod = isCI ? test.skip : test;

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

  testMethod('should load JSON formatter by default', async () => {
    expect(page).not.toBeNull();
    
    // Take screenshot of initial state
    await takeScreenshot(page, 'json-formatter', 'initial-view');
    
    // Verify correct component is loaded by default
    await waitForComponentTitle(page, COMPONENT_TITLE);
    
    // Verify component title
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Take screenshot of loaded component
    await takeScreenshot(page, 'json-formatter', 'component-loaded');
  });

  testMethod('should format valid JSON correctly', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate (or ensure we're there)
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input unformatted JSON
    const textareas = await page.$$('textarea');
    const unformattedJson = '{"name":"John","age":30,"city":"New York","skills":["JavaScript","HTML","CSS"],"address":{"street":"123 Main St","zip":"10001","country":"USA"}}';
    await textareas[0].fill(unformattedJson);
    await takeScreenshot(page, 'json-formatter', 'unformatted-input');
    
    // Click format button
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update with formatted content (contains line breaks and indentation)
    await page.waitForFunction(() => {
      const outputTextarea = document.querySelectorAll('textarea')[1];
      return outputTextarea && outputTextarea.value && outputTextarea.value.includes('\n');
    }, { timeout: 2000 });
    
    // Take screenshot of formatted result
    await takeScreenshot(page, 'json-formatter', 'formatted-output', true);
    
    // Verify formatting worked (checking for line breaks and proper spacing)
    const formattedText = await textareas[1].inputValue();
    expect(formattedText).toContain('\n');
    expect(formattedText).toContain('  ');
  });

  testMethod('should show error for invalid JSON', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input invalid JSON
    const textareas = await page.$$('textarea');
    const invalidJson = '{"name":"John","age":30,city:"New York"}'; // Missing quotes around city
    await textareas[0].fill(invalidJson);
    await takeScreenshot(page, 'json-formatter', 'invalid-json-input');
    
    // Click format button
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update with error message
    await page.waitForFunction(() => {
      const outputTextarea = document.querySelectorAll('textarea')[1];
      return outputTextarea && outputTextarea.value && outputTextarea.value.includes('Error:');
    }, { timeout: 2000 });
    
    // Take screenshot of validation error
    await takeScreenshot(page, 'json-formatter', 'validation-error', true);
    
    // Verify error message is shown
    const outputText = await textareas[1].inputValue();
    expect(outputText).toContain('Error:');
  });

  testMethod('should clear input and output when Clear button is clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to JSON Format/Validate
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input some JSON
    const textareas = await page.$$('textarea');
    await textareas[0].fill('{"test": "data"}');
    
    // Format to get output
    await (await findButtonByText(page, 'Format JSON')).click();
    
    // Wait for output textarea to update
    await page.waitForFunction(() => {
      const outputTextarea = document.querySelectorAll('textarea')[1];
      return outputTextarea && outputTextarea.value && outputTextarea.value.length > 0;
    }, { timeout: 2000 });
    
    // Verify both textareas have content
    expect(await textareas[0].inputValue()).not.toBe('');
    expect(await textareas[1].inputValue()).not.toBe('');
    
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
    expect(await textareas[0].inputValue()).toBe('');
    expect(await textareas[1].inputValue()).toBe('');
  });
}); 