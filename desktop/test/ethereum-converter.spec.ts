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
    
    const etherTextareas = await page.locator('textarea').all();
    const etherInput = etherTextareas[4]; // Ether is the 5th input (0-indexed)
    await etherInput.fill('1');
    
    await page.waitForFunction(() => {
      const textareas = document.querySelectorAll('textarea');
      return textareas.length >= 5 && 
             textareas[0].value === '1000000000000000000'; // Wei is the 1st input (0-indexed)
    }, { timeout: 2000 });
    
    await takeScreenshot(page, 'ethereum-converter', 'ether-to-wei-conversion');
  });

  test('should convert 1 Gwei to Ether correctly', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const gweiTextareas = await page.locator('textarea').all();
    const gweiInput = gweiTextareas[1]; // Gwei is the 2nd input (0-indexed)
    await gweiInput.fill('1');
    
    await page.waitForFunction(() => {
      const textareas = document.querySelectorAll('textarea');
      return textareas.length >= 5 && 
             textareas[4].value === '0.000000001'; // Ether is the 5th input (0-indexed)
    }, { timeout: 2000 });
    
    await takeScreenshot(page, 'ethereum-converter', 'gwei-to-ether-conversion');
  });

  test('should handle invalid input correctly', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const etherTextareas = await page.locator('textarea').all();
    const etherInput = etherTextareas[4]; // Ether is the 5th input (0-indexed)
    await etherInput.fill('invalid');
    
    await page.waitForSelector('.text-destructive', { timeout: 2000 });
    
    await takeScreenshot(page, 'ethereum-converter', 'invalid-input-error');
  });
});
