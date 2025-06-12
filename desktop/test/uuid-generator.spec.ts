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

  test('should generate a UUID', async () => {
    expect(page).not.toBeNull()

    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE)

    await takeScreenshot(page, 'uuid-generator', 'initial')

    const generateButton = await findButtonByText(page, 'Generate UUID')
    expect(generateButton).not.toBeNull()
    await generateButton!.click()

    await page.waitForSelector('textarea', { timeout: isCI ? 10000 : 2000 })
    const textareas = await page.$$('textarea')
    expect(textareas.length).toBeGreaterThan(0)
    const output = await textareas[textareas.length - 1].inputValue()
    expect(output).not.toBe('')
    await takeScreenshot(page, 'uuid-generator', 'generated', true)
  })

  test('should validate UUID correctly', async () => {
    expect(page).not.toBeNull()

    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE)

    const validateTab = await findButtonByText(page, 'Validate UUID')
    if (validateTab) await validateTab.click()

    await page.waitForSelector('textarea', { timeout: isCI ? 10000 : 2000 })
    await fillTextareaInput(page, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')

    const validateButton = await findButtonByText(page, 'Validate UUID')
    expect(validateButton).not.toBeNull()
    await validateButton!.click()

    await page.waitForSelector('text/Valid UUID', { timeout: isCI ? 10000 : 2000 })

    await takeScreenshot(page, 'uuid-generator', 'validated', true)
  })
})
