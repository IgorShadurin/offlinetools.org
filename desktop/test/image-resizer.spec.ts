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

const TOOL_BUTTON_NAME = 'Image Resizer';
const COMPONENT_TITLE = 'Image Resizer';

const isCI = process.env.CI === 'true';

describe('Image Resizer tests', async () => {
  beforeAll(async () => {
    try {
      electronApp = await launchElectronWithRetry();
      
      page = await electronApp.firstWindow();
      
      const loadTimeout = isCI ? 30000 : 10000;
      await page!.waitForLoadState('domcontentloaded', { timeout: loadTimeout });
      
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
      await page!.close().catch(err => console.error('Error closing page:', err));
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err));
    }
  });

  test('should switch to Image Resizer when clicked', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'image-resizer', 'image-resizer-view');
    
    await expect(page!.$eval('h1', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    const uploadLabel = page!.locator('label[for="image-upload"]');
    await expect(uploadLabel.isVisible()).resolves.toBe(true);
  });

  test('should show image upload area', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const uploadLabel = page!.locator('label[for="image-upload"]');
    expect(await uploadLabel.count()).toBeGreaterThan(0);
    
    const uploadText = uploadLabel.locator('span').first();
    await expect(uploadText.textContent()).resolves.toBe('Choose image to resize');
    
    await takeScreenshot(page!, 'image-resizer', 'upload-area');
  });

  test('should show width and height inputs', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const widthInput = page!.locator('input#width');
    expect(await widthInput.count()).toBeGreaterThan(0);
    await expect(widthInput.getAttribute('type')).resolves.toBe('number');
    
    const heightInput = page!.locator('input#height');
    expect(await heightInput.count()).toBeGreaterThan(0);
    await expect(heightInput.getAttribute('type')).resolves.toBe('number');
    
    await takeScreenshot(page!, 'image-resizer', 'dimension-inputs');
  });

  test('should show aspect ratio checkbox', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const aspectRatioCheckbox = page!.locator('input[type="checkbox"]');
    expect(await aspectRatioCheckbox.count()).toBeGreaterThan(0);
    await expect(aspectRatioCheckbox.isChecked()).resolves.toBe(true);
    
    const aspectRatioLabel = page!.locator('text=Keep aspect ratio');
    expect(await aspectRatioLabel.count()).toBeGreaterThan(0);
    
    await takeScreenshot(page!, 'image-resizer', 'aspect-ratio-option');
  });

  test('should show resize button in disabled state initially', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const resizeButton = await findButtonByText(page, 'Resize Image');
    if (resizeButton) {
      expect(resizeButton).toBeTruthy();
      await expect(resizeButton.isDisabled()).resolves.toBe(true);
    }
    
    await takeScreenshot(page!, 'image-resizer', 'resize-button-disabled');
  });

  test('should show clear button', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const clearButton = await findButtonByText(page, 'Clear');
    expect(clearButton).toBeTruthy();
    
    await takeScreenshot(page!, 'image-resizer', 'clear-button');
  });

  test('should have proper input validation', async () => {
    expect(page).not.toBeNull();
    if (!page) return;
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const widthInput = page!.locator('input#width');
    const heightInput = page!.locator('input#height');
    
    await expect(widthInput.getAttribute('min')).resolves.toBe('1');
    await expect(heightInput.getAttribute('min')).resolves.toBe('1');
    
    await takeScreenshot(page!, 'image-resizer', 'input-validation');
  });
});
