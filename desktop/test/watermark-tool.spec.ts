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
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Watermark Tool';
const COMPONENT_TITLE = 'Watermark Tool';

const isCI = process.env.CI === 'true';

describe('Watermark Tool tests', async () => {
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

  test('should switch to Watermark Tool when clicked', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page, 'watermark-tool', 'watermark-view');
    
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    const batchTab = page.locator('button:has-text("Batch Processing")').first();
    await expect(batchTab.isVisible()).resolves.toBe(true);
  });

  test('should switch between batch and single image modes', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const singleTab = await findButtonByText(page, 'Single Image');
    if (singleTab) await singleTab.click();
    
    await takeScreenshot(page, 'watermark-tool', 'single-mode');
    
    const activeTab = page.locator('button:has-text("Single Image")').first();
    await expect(activeTab.isVisible()).resolves.toBe(true);
    
    const batchTab = await findButtonByText(page, 'Batch Processing');
    if (batchTab) await batchTab.click();
    
    const activeBatchTab = page.locator('button:has-text("Batch Processing")').first();
    await expect(activeBatchTab.isVisible()).resolves.toBe(true);
  });

  test('should show watermark upload area', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const watermarkUploadLabel = page.locator('label[for="watermark-upload"]');
    expect(await watermarkUploadLabel.count()).toBeGreaterThan(0);
    
    const uploadText = watermarkUploadLabel.locator('span').first();
    await expect(uploadText.textContent()).resolves.toBe('Choose watermark image');
    
    await takeScreenshot(page, 'watermark-tool', 'upload-areas');
  });

  test('should show position controls', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const positionLabel = page.locator('text=Position').first();
    expect(await positionLabel.count()).toBeGreaterThan(0);
    
    const topLeftRadio = page.locator('input[value="top-left"]');
    expect(await topLeftRadio.count()).toBeGreaterThan(0);
    
    const bottomRightRadio = page.locator('input[value="bottom-right"]');
    await expect(bottomRightRadio.isChecked()).resolves.toBe(true);
    
    await takeScreenshot(page, 'watermark-tool', 'position-controls');
  });

  test('should show opacity, scale, and margin sliders', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const opacityLabel = page.locator('text=Opacity: 70%');
    expect(await opacityLabel.count()).toBeGreaterThan(0);
    
    const scaleLabel = page.locator('text=Scale: 20%');
    expect(await scaleLabel.count()).toBeGreaterThan(0);
    
    const marginLabel = page.locator('text=Margin: 20px');
    expect(await marginLabel.count()).toBeGreaterThan(0);
    
    await takeScreenshot(page, 'watermark-tool', 'slider-controls');
  });

  test('should show batch processing button in disabled state', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const processButton = await findButtonByText(page, 'Apply Watermark to All Images');
    if (processButton) {
      expect(processButton).toBeTruthy();
      await expect(processButton.isDisabled()).resolves.toBe(true);
    }
    
    await takeScreenshot(page, 'watermark-tool', 'batch-button-disabled');
  });

  test('should show single image processing in single mode', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const singleTab = await findButtonByText(page, 'Single Image');
    if (singleTab) await singleTab.click();
    
    const singleUploadLabel = page.locator('label[for="single-target-upload"]');
    expect(await singleUploadLabel.count()).toBeGreaterThan(0);
    
    const singleProcessButton = await findButtonByText(page, 'Apply Watermark');
    if (singleProcessButton) {
      expect(singleProcessButton).toBeTruthy();
      await expect(singleProcessButton.isDisabled()).resolves.toBe(true);
    }
    
    await takeScreenshot(page, 'watermark-tool', 'single-mode-complete');
  });
});
