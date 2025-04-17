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
import { launchElectronWithRetry, findButtonByText } from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

describe('[electron-vite-react] e2e tests', async () => {
  beforeAll(async () => {
    try {
      // Launch Electron with retry logic
      electronApp = await launchElectronWithRetry();
      
      // Get the first window
      page = await electronApp.firstWindow();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      
      const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
      await mainWin.evaluate(async (win) => {
        win.webContents.executeJavaScript('console.log("Execute JavaScript with e2e testing.")')
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

  test('startup', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    const title = await page.title();
    expect(title).toBe('Offline Tools');
  });

  test('should load the tools sidebar correctly', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    await page.waitForLoadState('domcontentloaded');
    
    // Find JSON Format button in sidebar
    const jsonFormatButton = await findButtonByText(page, 'JSON Format/Validate');
    expect(jsonFormatButton).not.toBeNull();
    const sidebarText = await jsonFormatButton.textContent();
    expect(sidebarText.trim()).toContain('JSON Format/Validate');
  });

  test('should display JSON formatter by default', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    const cardTitle = await page.$('h3');
    const titleText = await cardTitle.textContent();
    expect(titleText).toBe('JSON Format/Validate');
  });

  test('should switch to Base64 Encoder/Decoder when clicked', async () => {
    // Make sure the page is initialized
    expect(page).not.toBeNull();
    
    // Find Base64 Encoder button by text
    const base64Button = await findButtonByText(page, 'Base64');
    expect(base64Button).not.toBeNull();
    
    // Click the Base64 button
    await base64Button.click();
    
    // Wait for the component to load with a longer timeout
    await page.waitForTimeout(1000);
    
    // Check if the card title is correct
    const cardTitle = await page.$('h3');
    const titleText = await cardTitle.textContent();
    expect(titleText).toBe('Base64 Encoder/Decoder');
  });
});
