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
  fillTextareaInput,
  waitForTextareaOutput,
  waitForText,
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'UUID Generator'
const COMPONENT_TITLE = 'UUID Generator'
const isCI = process.env.CI === 'true'

describe('UUID Generator tests', async () => {
  beforeAll(async () => {
    try {
      electronApp = await launchElectronWithRetry()
      page = await electronApp.firstWindow()
      const loadTimeout = isCI ? 30000 : 10000
      await page.waitForLoadState('domcontentloaded', { timeout: loadTimeout })
      const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page)
      await mainWin.evaluate(async (win) => {
        win.webContents.executeJavaScript('// Test initialization complete')
      })
    } catch (error) {
      console.error('Setup failed:', error)
      throw error
    }
  })

  afterAll(async () => {
    if (page) {
      await page.close().catch(err => console.error('Error closing page:', err))
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err))
    }
  })

  test('should generate a v4 UUID', async () => {
    expect(page).not.toBeNull()
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE)
    await takeScreenshot(page, 'uuid-generator', 'initial')
    await (await findButtonByText(page, 'Generate UUID')).click()
    const output = await page.$('textarea');
    await page.waitForFunction(el => (el as HTMLTextAreaElement).value.length > 0, output)
    await takeScreenshot(page, 'uuid-generator', 'generated', true)
  })

  test('should validate UUID correctly', async () => {
    expect(page).not.toBeNull()
    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE)
    await (await findButtonByText(page, 'Validate')).click()
    const validUuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    await fillTextareaInput(page, validUuid)
    await (await findButtonByText(page, 'Validate UUID')).click()
    await waitForText(page, 'Valid UUID')
    await takeScreenshot(page, 'uuid-generator', 'validate', true)
  })
})
