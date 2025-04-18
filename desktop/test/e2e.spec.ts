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
let page: Page | null = null

// Skip all tests if running in GitHub Actions for now
// until we properly fix the CI environment
const isCI = process.env.CI === 'true';
const testMethod = isCI ? test.skip : test;

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

  testMethod('startup', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Take initial screenshot
    await takeScreenshot(page, 'e2e-startup', 'initial-view');
    
    const title = await page.title();
    expect(title).toBe('Offline Tools');
  });

  testMethod('should load the tools sidebar correctly', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Use longer timeout in CI
    const waitTimeout = isCI ? 15000 : 5000;
    await page.waitForLoadState('domcontentloaded', { timeout: waitTimeout });
    
    // Take screenshot of sidebar
    await takeScreenshot(page, 'e2e-sidebar', 'sidebar-view');
    
    // Find JSON Format button in sidebar
    const jsonFormatButton = await findButtonByText(page, 'JSON Format/Validate');
    expect(jsonFormatButton).not.toBeNull();
    const sidebarText = await jsonFormatButton.textContent();
    expect(sidebarText.trim()).toContain('JSON Format/Validate');
  });

  testMethod('should display JSON formatter by default', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Take screenshot of default view
    await takeScreenshot(page, 'e2e-json-formatter', 'default-view');
    
    const cardTitle = await page.$('h3');
    const titleText = await cardTitle.textContent();
    expect(titleText).toBe('JSON Format/Validate');
  });

  testMethod('should switch to Base64 Encoder when clicked', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    const base64Button = await findButtonByText(page, 'Base64 String Encode/Decode');
    expect(base64Button).not.toBeNull();
    // Click the Base64 button
    await base64Button.click();
    // Wait for the component to load with a longer timeout
    const waitTime = isCI ? 3000 : 1000;
    await page.waitForTimeout(waitTime);
    // Take screenshot after navigation
    await takeScreenshot(page, 'e2e-base64-encode', 'base64-view');
    // Check if the card title is correct
    const cardTitle = await page.$('h3');
    const titleText = await cardTitle.textContent();
    expect(titleText).toBe('Base64 Encoder/Decoder');
    // Find textareas for additional screenshots
    const textareas = await page.$$('textarea');
    expect(textareas.length).toBeGreaterThan(0);
    // Enter an encoded value
    const inputTextarea = textareas[0];
    await inputTextarea.fill('hello world');
    await takeScreenshot(page, 'e2e-base64-encode', 'after-input');
    const decodeButton = await findButtonByText(page, 'Encode to Base64');
    expect(decodeButton).not.toBeNull()
    await decodeButton.click();
    // Wait for UI to update
    await page.waitForTimeout(500);
    // Take screenshot after decoding
    await takeScreenshot(page, 'e2e-base64-encode', 'after-encoding', true);
  });

  testMethod('should switch to Base64 Decoder when clicked', async () => {
    expect(page).not.toBeNull();
    
    // Navigate to Base64 tool
    await (await findButtonByText(page, 'Base64 String Encode/Decode')).click();
    
    // Wait for component to be visible instead of using timeout
    await page.waitForSelector('h3:has-text("Base64 Encoder/Decoder")', { 
      state: 'visible',
      timeout: isCI ? 3000 : 1000 
    });
    
    // Take screenshot after navigation
    await takeScreenshot(page, 'e2e-base64-decode', 'base64-view');
    
    // Verify correct component loaded
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe('Base64 Encoder/Decoder');
    
    // Switch to decode mode
    await (await findButtonByText(page, 'Decode')).click();
    
    // Input test data
    const inputTextarea = (await page.$$('textarea'))[0];
    await inputTextarea.fill('SGVsbG8gV29ybGQh');
    await takeScreenshot(page, 'e2e-base64-decode', 'after-input');
    
    await (await findButtonByText(page, 'Decode from Base64')).click();
    
    // Capture final state
    await takeScreenshot(page, 'e2e-base64-decode', 'after-decoding', true);
  });
});
