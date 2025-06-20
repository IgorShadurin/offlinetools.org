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

const TOOL_BUTTON_NAME = 'Timer';
const COMPONENT_TITLE = 'Timer';

const isCI = process.env.CI === 'true';

describe('Online Timer tests', async () => {
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

  test('should switch to Online Timer when clicked', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'online-timer', 'online-timer-view');
    
    await expect(page!.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
  });

  test('should display timer preset buttons', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const presetButtons = await page!.$$('button:has-text("min")');
    expect(presetButtons.length).toBeGreaterThanOrEqual(4);
    
    const oneMinButton = await page!.$('button:has-text("1 min")');
    expect(oneMinButton).not.toBeNull();
    
    const tenMinButton = await page!.$('button:has-text("10 min")');
    expect(tenMinButton).not.toBeNull();
    
    const twentyFiveMinButton = await page!.$('button:has-text("25 min")');
    expect(twentyFiveMinButton).not.toBeNull();
    
    const sixtyMinButton = await page!.$('button:has-text("60 min")');
    expect(sixtyMinButton).not.toBeNull();
  });

  test('should display timer controls', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const startButton = await page!.$('button:has-text("Start")');
    expect(startButton).not.toBeNull();
    
    const timerDisplay = await page!.$('.text-6xl.font-mono');
    expect(timerDisplay).not.toBeNull();
    
    const timerInfo = await page!.$('h3:has-text("Timer Info")');
    expect(timerInfo).not.toBeNull();
  });

  test('should display sound options', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const soundOptionsLabel = await page!.$('label:has-text("Sound Options")');
    expect(soundOptionsLabel).not.toBeNull();
    
    const successSoundCheckbox = await page!.$('#success-sound');
    expect(successSoundCheckbox).not.toBeNull();
    
    const tickSoundCheckbox = await page!.$('#tick-sound');
    expect(tickSoundCheckbox).not.toBeNull();
  });

  test('should have custom time input', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const timeInput = await page!.$('#time-input');
    expect(timeInput).not.toBeNull();
    
    const inputValue = await timeInput?.inputValue();
    expect(inputValue).toBeTruthy();
  });
});
