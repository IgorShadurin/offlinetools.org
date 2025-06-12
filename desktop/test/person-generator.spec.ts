import * as path from 'node:path'
import {
  type ElectronApplication,
  type Page,
  type JSHandle,
} from 'playwright'
import type { BrowserWindow } from 'electron'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import {
  launchElectronWithRetry,
  navigateToTool,
  waitForTextareaOutput,
  findButtonByText,
  takeScreenshot,
  fillTextareaInput,
} from './utils'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'Person Generator'
const COMPONENT_TITLE = 'Person Generator'
const isCI = process.env.CI === 'true'

describe('Person Generator tests', async () => {
  beforeAll(async () => {
    electronApp = await launchElectronWithRetry()
    page = await electronApp.firstWindow()
    const loadTimeout = isCI ? 30000 : 10000
    await page.waitForLoadState('domcontentloaded', { timeout: loadTimeout })
    const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page)
    await mainWin.evaluate(async win => {
      win.webContents.executeJavaScript('// Test initialization complete')
    })
  })

  afterAll(async () => {
    if (page) await page.close()
    if (electronApp) await electronApp.close()
  })

  test('generate persons', async () => {
    expect(page).not.toBeNull()
    if (!page) return

    await navigateToTool(page, TOOL_BUTTON_NAME, COMPONENT_TITLE)
    await page.fill('input#count', '2')
    await (await findButtonByText(page, 'Generate')).click()
    await waitForTextareaOutput(page, { notEmpty: true })
    await takeScreenshot(page, 'person-generator', 'generated')
  })
})
