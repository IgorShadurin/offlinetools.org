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
let page: Page

const TOOL_BUTTON_NAME = 'Password Generator';
const COMPONENT_TITLE = 'Password Generator';

const isCI = process.env.CI === 'true';

describe('Password Generator tests', async () => {
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

  test('should navigate to Password Generator', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page, 'password-generator', 'initial-view');
    
    await waitForComponentTitle(page, COMPONENT_TITLE);
    
    await expect(page.$eval('h3', el => el.textContent)).resolves.toBe(COMPONENT_TITLE);
    
    await takeScreenshot(page, 'password-generator', 'component-loaded');
  });

  test('should generate password when clicking button', async () => {
    expect(page).not.toBeNull();
    
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE);
    
    await takeScreenshot(page, 'password-generator', 'before-generate');
    
    const generateButton = await findButtonByText(page, 'Generate Password');
    expect(generateButton).not.toBeNull();
    if (!generateButton) throw new Error('Generate Password button not found');
    await generateButton.click();
    
    await waitForTextareaOutput(page, { notEmpty: true });
    
    const generatedPassword = await getTextareaOutput(page);
    
    expect(generatedPassword).not.toBe('');
    
    await takeScreenshot(page, 'password-generator', 'after-generate', true);
  });
});
