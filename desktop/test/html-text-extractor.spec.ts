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
const TOOL_BUTTON_NAME = 'HTML Text Extractor';
const COMPONENT_TITLE = 'HTML Text Extractor';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('HTML Text Extractor tests', async () => {
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

  test('should switch to HTML Text Extractor when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to HTML Text Extractor tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'html-text-extractor', 'html-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Input test HTML data
    await fillTextareaInput(page, '<p>Hello <strong>World</strong>!</p>');
    await takeScreenshot(page, 'html-text-extractor', 'after-input');
    
    // Extract the text and wait for result
    await (await findButtonByText(page, 'Extract Text')).click();
    
    // Wait for content to update
    await waitForTextareaOutput(page, { notEmpty: true });
    
    // Verify output contains extracted text
    const output = await getTextareaOutput(page);
    expect(output).toContain('Hello World!');
    
    // Capture final state
    await takeScreenshot(page, 'html-text-extractor', 'after-extraction', true);
  });
}) 