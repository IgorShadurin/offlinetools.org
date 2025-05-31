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

const TOOL_BUTTON_NAME = 'Ethereum Converter';
const COMPONENT_TITLE = 'Ethereum Unit Converter';

const isCI = process.env.CI === 'true';

describe('Ethereum Unit Converter tests', async () => {
  beforeAll(async () => {
    try {
      electronApp = await launchElectronWithRetry();
      page = await electronApp.firstWindow();
      
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

  test('should navigate to Ethereum Converter tool', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await waitForComponentTitle(page, COMPONENT_TITLE);
    
    await takeScreenshot(page, 'ethereum-converter', 'initial-state');
  });

  test('should convert 1 Ether to Wei correctly', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const etherInput = await page.locator('textarea[data-unit="Ether"]');
    await etherInput.fill('1');
    
    await page.waitForSelector('textarea[data-unit="Wei"]', { timeout: 5000 });
    const weiValue = await page.locator('textarea[data-unit="Wei"]').inputValue();
    expect(weiValue).toBe('1000000000000000000');
    
    await takeScreenshot(page, 'ethereum-converter', 'ether-to-wei-conversion');
  });

  test('should convert 1 Gwei to Ether correctly', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const gweiInput = await page.locator('textarea[data-unit="Gwei"]');
    await gweiInput.fill('1');
    
    await page.waitForSelector('textarea[data-unit="Ether"]', { timeout: 5000 });
    const etherValue = await page.locator('textarea[data-unit="Ether"]').inputValue();
    expect(etherValue).toBe('0.000000001');
    
    await takeScreenshot(page, 'ethereum-converter', 'gwei-to-ether-conversion');
  });

  test('should handle invalid input correctly', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const etherInput = await page.locator('textarea[data-unit="Ether"]');
    await etherInput.fill('invalid');
    
    await page.waitForSelector('.text-destructive', { timeout: 2000 });
    
    await takeScreenshot(page, 'ethereum-converter', 'invalid-input-error');
  });
});
