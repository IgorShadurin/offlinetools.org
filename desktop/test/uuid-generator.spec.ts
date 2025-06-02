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
  test,
} from 'vitest'
import { expect } from '@playwright/test'
import { 
  launchElectronWithRetry, 
  findButtonByText, 
  takeScreenshot, 
  navigateToTool,
  fillTextareaInput,
  waitForTextareaOutput,
  getTextareaOutput,
  waitForComponentTitle
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'UUID Generator';
const COMPONENT_TITLE = 'UUID Generator';

const isCI = process.env.CI === 'true';

describe('UUID Generator', async () => {
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

  test('should display UUID Generator component', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'uuid-generator', 'uuid-view');
    
    await expect(page!.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    await expect(page!.locator('text=Generate UUIDs')).toBeVisible();
    await expect(page!.locator('text=Validate UUID')).toBeVisible();
  });

  test('should generate v4 UUID by default', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('should generate multiple UUIDs', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.fill('input[id="count"]', '3');
    await (await findButtonByText(page!, 'Generate UUIDs'))!.click();
    
    const output = await getTextareaOutput(page!);
    const lines = output.split('\n').filter(line => line.trim());
    expect(lines).toHaveLength(3);
    
    lines.forEach(uuid => {
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });

  test('should generate uppercase UUID when option is selected', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uppercase"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/);
  });

  test('should generate UUID without hyphens when option is unchecked', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.uncheck('input[id="hyphens"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9a-f]{32}$/i);
    expect(output).not.toContain('-');
  });

  test('should generate v1 UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-v1"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('should generate v5 UUID with name and namespace', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-v5"]');
    await page!.fill('input[id="name"]', 'test-name');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('should generate NIL UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-nil"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toBe('00000000-0000-0000-0000-000000000000');
  });

  test('should generate MAX UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-max"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toBe('ffffffff-ffff-ffff-ffff-ffffffffffff');
  });

  test('should validate valid UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Validate UUID'))!.click();
    await page!.waitForSelector('textarea[id="validateInput"]', { state: 'visible' });
    
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    await fillTextareaInput(page!, validUuid, 0);
    await (await findButtonByText(page!, 'Validate UUID'))!.click();
    
    await expect(page!.locator('text=Valid UUID')).toBeVisible();
    await expect(page!.locator('text=The string is a valid UUID.')).toBeVisible();
  });

  test('should validate invalid UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Validate UUID'))!.click();
    await page!.waitForSelector('textarea[id="validateInput"]', { state: 'visible' });
    
    const invalidUuid = 'not-a-uuid';
    await fillTextareaInput(page!, invalidUuid, 0);
    await (await findButtonByText(page!, 'Validate UUID'))!.click();
    
    await expect(page!.locator('text=Invalid UUID')).toBeVisible();
    await expect(page!.locator('text=The string is not a valid UUID.')).toBeVisible();
  });

  test('should copy generated UUID to clipboard', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    await page!.waitForSelector('button:has-text("Copy")', { state: 'visible' });
    await (await findButtonByText(page!, 'Copy'))!.click();
    
    await expect(page!.locator('text=Copied!')).toBeVisible();
  });

  test('should handle clipboard content for validation', async () => {
    expect(page).not.toBeNull();
    
    const testUuid = '550e8400-e29b-41d4-a716-446655440000';
    
    await page!.evaluate((uuid) => {
      localStorage.setItem('clipboard-content-for-tool', uuid);
    }, testUuid);
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await (await findButtonByText(page!, 'Validate UUID'))!.click();
    await waitForComponentTitle(page!, 'UUID Generator');
    
    const inputValue = await getTextareaOutput(page!, 0);
    expect(inputValue).toBe(testUuid);
    
    await expect(page!.locator('text=Valid UUID')).toBeVisible();
  });

  test('should show error for v5 UUID without name', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-v5"]');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    await expect(page!.locator('text=Error')).toBeVisible();
  });

  test('should handle custom namespace for v5 UUID', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await page!.check('input[id="uuid-v5"]');
    await page!.fill('input[id="name"]', 'test-name');
    await page!.check('input[id="namespace-custom"]');
    await page!.fill('input[id="customNamespace"]', '550e8400-e29b-41d4-a716-446655440000');
    await (await findButtonByText(page!, 'Generate UUID'))!.click();
    
    const output = await getTextareaOutput(page!);
    expect(output).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
