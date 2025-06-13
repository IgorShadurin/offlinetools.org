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
  waitForComponentTitle
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Password Strength Meter';
const COMPONENT_TITLE = 'Password Strength Meter';

const isCI = process.env.CI === 'true';

describe('Password Strength Meter tests', async () => {
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

  test('should navigate to Password Strength Meter', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'password-strength-meter', 'initial-view');
    
    await waitForComponentTitle(page!, COMPONENT_TITLE);
    
    await takeScreenshot(page!, 'password-strength-meter', 'component-loaded');
  });

  test('should display password strength meter interface', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const passwordInput = page!.locator('input[type="password"]');
    await expect(passwordInput.isVisible()).resolves.toBe(true);
    
    await takeScreenshot(page!, 'password-strength-meter', 'interface-elements');
  });

  test('should analyze weak password', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const passwordInput = page!.locator('input[type="password"]');
    await passwordInput.fill('123');
    
    await page!.waitForSelector('text=Very Weak', { timeout: 5000 });
    
    const weakText = page!.locator('text=Very Weak');
    await expect(weakText.isVisible()).resolves.toBe(true);
    
    await takeScreenshot(page!, 'password-strength-meter', 'weak-password-analysis');
  });

  test('should analyze strong password', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const passwordInput = page!.locator('input[type="password"]');
    await passwordInput.fill('MyStr0ng!P@ssw0rd');
    
    await page!.waitForSelector('text=Strong', { timeout: 5000 });
    
    const strongText = page!.locator('text=Strong');
    await expect(strongText.isVisible()).resolves.toBe(true);
    
    await takeScreenshot(page!, 'password-strength-meter', 'strong-password-analysis');
  });

  test('should toggle password visibility', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const passwordInput = page!.locator('input[type="password"]');
    await passwordInput.fill('testpassword');
    
    const toggleButton = await findButtonByText(page!, 'Show');
    if (toggleButton) {
      await toggleButton.click();
      
      const textInput = page!.locator('input[type="text"]');
      await expect(textInput.isVisible()).resolves.toBe(true);
    }
    
    await takeScreenshot(page!, 'password-strength-meter', 'password-visibility-toggle');
  });

  test('should show security criteria checklist', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    const passwordInput = page!.locator('input[type="password"]');
    await passwordInput.fill('MyPassword123!');
    
    await page!.waitForSelector('text=Security Criteria', { timeout: 5000 });
    
    const criteriaText = page!.locator('text=Security Criteria');
    await expect(criteriaText.isVisible()).resolves.toBe(true);
    
    await takeScreenshot(page!, 'password-strength-meter', 'security-criteria-checklist');
  });
});
