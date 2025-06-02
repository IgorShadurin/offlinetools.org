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
  navigateToTool, 
  waitForComponentTitle
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Unit Converter';
const COMPONENT_TITLE = 'Unit Converter';

const isCI = process.env.CI === 'true';

describe('Unit Converter tests', async () => {
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

  test('should navigate to Unit Converter tool', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    await waitForComponentTitle(page, COMPONENT_TITLE);
    await takeScreenshot(page, 'unit-converter', 'navigation');
  });

  test('should convert length units', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);

    const categorySelect = page.locator('select#category');
    const categoryValue = await categorySelect.inputValue();
    expect(categoryValue).toBe('Length');

    const meterInput = page.locator('textarea[data-unit="m"]');
    await meterInput.fill('1');

    const cmInput = page.locator('textarea[data-unit="cm"]');
    const cmValue = await cmInput.inputValue();
    expect(cmValue).toBe('100');

    const inchInput = page.locator('textarea[data-unit="in"]');
    const inchValue = await inchInput.inputValue();
    expect(parseFloat(inchValue)).toBeCloseTo(39.37, 1);

    await takeScreenshot(page, 'unit-converter', 'length-conversion');
  });

  test('should convert temperature units', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);

    const categorySelect = page.locator('select#category');
    await categorySelect.selectOption('Temperature');

    const celsiusInput = page.locator('textarea[data-unit="°C"]');
    await celsiusInput.fill('0');

    const fahrenheitInput = page.locator('textarea[data-unit="°F"]');
    const fahrenheitValue = await fahrenheitInput.inputValue();
    expect(fahrenheitValue).toBe('32');

    const kelvinInput = page.locator('textarea[data-unit="K"]');
    const kelvinValue = await kelvinInput.inputValue();
    expect(parseFloat(kelvinValue)).toBeCloseTo(273.15, 2);

    await takeScreenshot(page, 'unit-converter', 'temperature-conversion');
  });

  test('should handle copy functionality', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);

    const meterInput = page.locator('textarea[data-unit="m"]');
    await meterInput.fill('1');

    const copyButton = page.locator('button:has-text("Copy")').first();
    await copyButton.click();

    const buttonText = await copyButton.textContent();
    expect(buttonText).toMatch(/Copied!/);

    await takeScreenshot(page, 'unit-converter', 'copy-functionality');
  });

  test('should handle invalid input', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);

    const meterInput = page.locator('textarea[data-unit="m"]');
    await meterInput.fill('invalid');

    const errorAlert = page.locator('[role="alert"]');
    await page.waitForSelector('[role="alert"]', { state: 'visible', timeout: 5000 });
    const alertText = await errorAlert.textContent();
    expect(alertText).toContain('Invalid number');

    await takeScreenshot(page, 'unit-converter', 'invalid-input');
  });

  test('should switch between categories', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);

    const categorySelect = page.locator('select#category');
    const categoryValue = await categorySelect.inputValue();
    expect(categoryValue).toBe('Length');

    await categorySelect.selectOption('Weight');

    const gramInput = page.locator('textarea[data-unit="g"]');
    await page.waitForSelector('textarea[data-unit="g"]', { state: 'visible', timeout: 5000 });
    const gramVisible = await gramInput.isVisible();
    expect(gramVisible).toBe(true);

    const kgInput = page.locator('textarea[data-unit="kg"]');
    const kgVisible = await kgInput.isVisible();
    expect(kgVisible).toBe(true);

    await takeScreenshot(page, 'unit-converter', 'category-switch');
  });
});
