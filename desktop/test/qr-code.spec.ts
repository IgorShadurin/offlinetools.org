import * as path from 'node:path'
import * as fs from 'node:fs'
import { type ElectronApplication, type Page, type JSHandle } from 'playwright'
import type { BrowserWindow } from 'electron'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import {
  launchElectronWithRetry,
  findButtonByText,
  takeScreenshot,
  navigateToTool,
  waitForComponentTitle
} from './utils'
import { generateQrCode } from '../../shared/src/qr-code'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication | null = null
let page: Page | null = null

const TOOL_BUTTON_NAME = 'QR Code Tool'
const COMPONENT_TITLE = 'QR Code Tool'
const isCI = process.env.CI === 'true'

async function createTempQrFile(text: string): Promise<string> {
  const dataUrl = await generateQrCode(text)
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '')
  const buffer = Buffer.from(base64, 'base64')
  const tmpPath = path.join(root, 'test-qr.png')
  fs.writeFileSync(tmpPath, buffer)
  return tmpPath
}

describe('QR Code Tool tests', async () => {
  beforeAll(async () => {
    electronApp = await launchElectronWithRetry()
    page = await electronApp.firstWindow()
    const loadTimeout = isCI ? 30000 : 10000
    await page!.waitForLoadState('domcontentloaded', { timeout: loadTimeout })
    const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page)
    await mainWin.evaluate(async (win) => {
      win.webContents.executeJavaScript('// Test initialization complete')
    })
  })

  afterAll(async () => {
    if (page) {
      await page!.close().catch(err => console.error('Error closing page:', err))
    }
    if (electronApp) {
      await electronApp.close().catch(err => console.error('Error closing app:', err))
    }
    const tmp = path.join(root, 'test-qr.png')
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }, process.env.CI === 'true' ? 120000 : 60000)

  test('should generate QR code from text', async () => {
    expect(page).not.toBeNull()

    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE)

    await takeScreenshot(page!, 'qr-code', 'initial-view')

    await page!.fill('textarea', 'Hello QR')

    await (await findButtonByText(page!, 'Generate QR Code'))!.click()

    await page!.waitForSelector('img', { state: 'visible', timeout: isCI ? 10000 : 3000 })

    await takeScreenshot(page!, 'qr-code', 'after-generate', true)
  })

  test('should decode QR code image', async () => {
    expect(page).not.toBeNull()

    await navigateToTool(page!, TOOL_BUTTON_NAME, COMPONENT_TITLE)

    await (await findButtonByText(page!, 'Decode'))!.click()

    const tmpFile = await createTempQrFile('Decode Test')
    const fileInput = await page!.$('input[type="file"]')
    await fileInput!.setInputFiles(tmpFile)

    await page!.waitForSelector('textarea#decode-output', { state: 'visible', timeout: isCI ? 10000 : 3000 })

    await expect(page!.$eval('#decode-output', el => (el as HTMLTextAreaElement).value)).resolves.toContain('Decode Test')

    await takeScreenshot(page!, 'qr-code', 'after-decode', true)
  })
})
