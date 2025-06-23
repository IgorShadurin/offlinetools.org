import * as path from 'node:path'
import { type ElectronApplication, type Page, type JSHandle } from 'playwright'
import type { BrowserWindow } from 'electron'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import {
  launchElectronWithRetry,
  findButtonByText,
  takeScreenshot,
  navigateToTool,
  waitForTextareaOutput,
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Person Generator'
const COMPONENT_TITLE = 'Person Generator'
const isCI = process.env.CI === 'true'

describe('Person Generator tests', async () => {
  beforeAll(async () => {
    try {
      electronApp = await launchElectronWithRetry()
      page = await electronApp.firstWindow()
      const loadTimeout = isCI ? 30000 : 10000
      await page!.waitForLoadState('domcontentloaded', { timeout: loadTimeout })
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
      await page!.close().catch(err => console.error('Error closing page:', err))
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err))
    }
  })

  test('should generate people data', async () => {
    expect(page).not.toBeNull()
    if (!page) return

    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE)

    const countInput = page!.locator('input#count')
    await countInput.fill('2')

    await (await findButtonByText(page!, 'Generate'))?.click()

    await waitForTextareaOutput(page!, { notEmpty: true, index: 0 })

    await takeScreenshot(page!, 'person-generator', 'generated', true)
  })
})
