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
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Timezone Converter';
const COMPONENT_TITLE = 'Timezone Converter';

const isCI = process.env.CI === 'true';

describe('Timezone Converter tests', async () => {
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

  test('should navigate to timezone converter', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'timezone-converter', 'initial-view');
    
    await waitForComponentTitle(page!, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'timezone-converter', 'component-loaded');
  });

  test('should convert time between timezones', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const dateTimeInput = await page!.waitForSelector('input[type="datetime-local"]');
    await dateTimeInput.fill('2024-01-01T12:00');
    
    const fromSelect = await page!.waitForSelector('select >> nth=0');
    await fromSelect.selectOption('America/New_York');
    
    const toSelect = await page!.waitForSelector('select >> nth=1');
    await toSelect.selectOption('Europe/London');
    
    const resultElement = await page!.waitForSelector('[data-testid="conversion-result"]');
    expect(await resultElement.isVisible()).toBe(true);
    
    const copyButton = await page!.waitForSelector('button:has-text("Copy Result")');
    expect(await copyButton.isVisible()).toBe(true);
    
    await takeScreenshot(page!, 'timezone-converter', 'conversion-result');
  });

  test('should search timezones', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const searchInput = await page!.waitForSelector('input[placeholder*="Search timezones"]');
    await searchInput.fill('New York');
    
    const select = await page!.waitForSelector('select >> nth=0');
    const options = await page!.$$eval('select >> nth=0 option', elements => 
      elements.map(el => el.textContent || '')
    );
    expect(options.some(option => option.includes('Eastern Time'))).toBe(true);
    
    await takeScreenshot(page!, 'timezone-converter', 'timezone-search');
  });

  test('should swap timezones', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const fromSelect = await page!.waitForSelector('select >> nth=0');
    await fromSelect.selectOption('America/New_York');
    
    const toSelect = await page!.waitForSelector('select >> nth=1');
    await toSelect.selectOption('Europe/London');
    
    const swapButton = await page!.waitForSelector('button:has-text("Swap")');
    await swapButton.click();
    
    expect(await fromSelect.inputValue()).toBe('Europe/London');
    expect(await toSelect.inputValue()).toBe('America/New_York');
    
    await takeScreenshot(page!, 'timezone-converter', 'timezone-swap');
  });

  test('should display popular timezones', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const popularSection = await page!.waitForSelector('text=Popular Timezones');
    expect(await popularSection.isVisible()).toBe(true);
    
    const timezoneCards = await page!.locator('[data-testid="popular-timezone"]').count();
    expect(timezoneCards).toBeGreaterThan(0);
    
    await takeScreenshot(page!, 'timezone-converter', 'popular-timezones');
  });
});
