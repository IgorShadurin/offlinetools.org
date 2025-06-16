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

const TOOL_BUTTON_NAME = 'Text Utility';
const COMPONENT_TITLE = 'Text Utility';

const isCI = process.env.CI === 'true';

describe('Text Utility tests', async () => {
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

  test('should navigate to Text Utility', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'text-utility', 'initial-view');
    
    await waitForComponentTitle(page!, COMPONENT_TITLE);
    
    await expect(page!.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'text-utility', 'component-loaded');
  });

  test('should perform case conversion correctly', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Case'))!.click();
    
    const inputText = 'Hello World Test';
    await fillTextareaInput(page!, inputText);
    await takeScreenshot(page!, 'text-utility', 'case-input');
    
    await (await findButtonByText(page!, 'Process Text'))!.click();
    
    const output = await waitForTextareaOutput(page!, { notEmpty: true });
    
    await takeScreenshot(page!, 'text-utility', 'case-output', true);
    
    expect(output).toBe('hello world test');
  });

  test('should perform line break conversion correctly', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Line Breaks'))!.click();
    
    const inputText = 'line1\r\nline2\rline3\nline4';
    await fillTextareaInput(page!, inputText);
    await takeScreenshot(page!, 'text-utility', 'linebreak-input');
    
    await (await findButtonByText(page!, 'Process Text'))!.click();
    
    const output = await waitForTextareaOutput(page!, { notEmpty: true });
    
    await takeScreenshot(page!, 'text-utility', 'linebreak-output', true);
    
    expect(output).toBe('line1\nline2\nline3\nline4');
  });

  test('should perform line sorting correctly', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Sort Lines'))!.click();
    
    const inputText = 'zebra\napple\nbanana\ncherry';
    await fillTextareaInput(page!, inputText);
    await takeScreenshot(page!, 'text-utility', 'sort-input');
    
    await (await findButtonByText(page!, 'Process Text'))!.click();
    
    const output = await waitForTextareaOutput(page!, { notEmpty: true });
    
    await takeScreenshot(page!, 'text-utility', 'sort-output', true);
    
    expect(output).toBe('apple\nbanana\ncherry\nzebra');
  });

  test('should show error for invalid operation', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await fillTextareaInput(page!, '');
    
    const processButton = await findButtonByText(page!, 'Process Text');
    const isDisabled = await processButton!.isDisabled();
    expect(isDisabled).toBe(true);
    
    await takeScreenshot(page!, 'text-utility', 'empty-input-disabled');
  });

  test('should clear input and output when Clear button is clicked', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await fillTextareaInput(page!, 'test text');
    
    await (await findButtonByText(page!, 'Process Text'))!.click();
    
    await waitForTextareaOutput(page!, { notEmpty: true });
    
    expect(await getTextareaOutput(page!, 0)).not.toBe('');
    expect(await getTextareaOutput(page!, 1)).not.toBe('');
    
    await takeScreenshot(page!, 'text-utility', 'before-clear');
    
    await (await findButtonByText(page!, 'Clear'))!.click();
    
    await page!.waitForFunction(() => {
      const textareas = document.querySelectorAll('textarea');
      return textareas.length >= 2 && 
             textareas[0].value === '' && 
             textareas[1].value === '';
    }, { timeout: 2000 });
    
    await takeScreenshot(page!, 'text-utility', 'after-clear', true);
    
    expect(await getTextareaOutput(page!, 0)).toBe('');
    expect(await getTextareaOutput(page!, 1)).toBe('');
  });
});
