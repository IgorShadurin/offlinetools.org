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
const TOOL_BUTTON_NAME = 'Text to Slug';
const COMPONENT_TITLE = 'Text to Slug';

// Configure timeout based on CI environment
const isCI = process.env.CI === 'true';

describe('Text to Slug Tool', async () => {
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

  test('should navigate to Text to Slug tool and display main interface', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Text to Slug tool
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Take screenshot
    await takeScreenshot(page, 'text-to-slug', 'text-to-slug-main-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    // Check input and output areas
    const inputText = await page.$('#input-text');
    const outputSlug = await page.$('#output-slug');
    expect(inputText).not.toBeNull();
    expect(outputSlug).not.toBeNull();
    
    // Check generate button
    const generateButton = await page.$('button:has-text("Generate Slug")');
    expect(generateButton).not.toBeNull();
  });

  test('should generate basic slug with default settings', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to tool first
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input some text
    await page.fill('#input-text', 'Hello World Test');
    
    // Click generate button
    await page.click('button:has-text("Generate Slug")');
    
    // Check output
    const outputValue = await page.inputValue('#output-slug');
    expect(outputValue).toBe('hello-world-test');
    
    // Take screenshot
    await takeScreenshot(page, 'text-to-slug', 'basic-slug-generation');
  });

  test('should handle text with special characters', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to tool first
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input text with special characters
    await page.fill('#input-text', 'Hello, World! How are you?');
    
    // Click generate button
    await page.click('button:has-text("Generate Slug")');
    
    // Check output
    const outputValue = await page.inputValue('#output-slug');
    expect(outputValue).toBe('hello-world-how-are-you');
  });

  test('should use underscore separator when selected', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to tool first
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Input some text
    await page.fill('#input-text', 'Hello World Test');
    
    // Select underscore separator
    await page.click('#underscore');
    
    // Click generate button
    await page.click('button:has-text("Generate Slug")');
    
    // Check output uses underscores
    const outputValue = await page.inputValue('#output-slug');
    expect(outputValue).toBe('hello_world_test');
    
    // Take screenshot
    await takeScreenshot(page, 'text-to-slug', 'underscore-separator');
  });

  test('should handle real-world blog title example', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to tool first
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Ensure dash separator is selected (reset from previous test)
    await page.click('#dash');
    
    // Input real blog title
    await page.fill('#input-text', 'How to Build a Modern Web Application with React & TypeScript');
    
    // Click generate button
    await page.click('button:has-text("Generate Slug")');
    
    // Check realistic output
    const outputValue = await page.inputValue('#output-slug');
    expect(outputValue).toBe('how-to-build-a-modern-web-application-with-react-typescript');
    
    // Take screenshot
    await takeScreenshot(page, 'text-to-slug', 'real-world-example');
  });
}); 