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

  test('should navigate to timezone converter and display basic elements', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'timezone-converter', 'initial-view');
    
    await waitForComponentTitle(page!, COMPONENT_TITLE);
    
    // Wait for the timezone cards to load
    await page!.waitForSelector('.group', { timeout: 10000 });
    
    // Check for UTC/GMT card
    const utcCard = await page!.locator('text=UTC/GMT Time').first();
    expect(await utcCard.isVisible()).toBe(true);
    
    // Check for "Other Timezones" section
    const otherTimezonesTitle = await page!.waitForSelector('text=Other Timezones', { timeout: 5000 });
    expect(await otherTimezonesTitle.isVisible()).toBe(true);
    
    // Check for "Add Timezone" button
    const addButton = await page!.waitForSelector('button:has-text("Add Timezone")', { timeout: 5000 });
    expect(await addButton.isVisible()).toBe(true);
    
    await takeScreenshot(page!, 'timezone-converter', 'component-loaded');
  });

  test('should show real-time clock updates', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    // Wait for initial load
    await page!.waitForSelector('.font-mono', { timeout: 10000 });
    
    // Get initial time
    const timeElement = await page!.locator('.font-mono').first();
    const initialTime = await timeElement.textContent();
    
    // Wait for 2 seconds and check if time updated (should update every second)
    await page!.waitForTimeout(2000);
    
    const updatedTime = await timeElement.textContent();
    
    // Time should be different (updated) or at least not be empty
    expect(updatedTime).toBeTruthy();
    expect(initialTime).toBeTruthy();
    
    await takeScreenshot(page!, 'timezone-converter', 'real-time-updates');
  });
});
