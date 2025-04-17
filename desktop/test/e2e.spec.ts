import * as path from 'node:path'
import {
  type ElectronApplication,
  type Page,
  type JSHandle,
  _electron as electron,
} from 'playwright'
import type { BrowserWindow } from 'electron'
import {
  beforeAll,
  afterAll,
  describe,
  expect,
  test,
} from 'vitest'

const root = path.join(__dirname, '..')
let electronApp: ElectronApplication
let page: Page

if (process.platform === 'linux') {
  // pass ubuntu
  test(() => expect(true).true)
} else {
  beforeAll(async () => {
    electronApp = await electron.launch({
      args: ['.', '--no-sandbox'],
      cwd: root,
      env: { ...process.env, NODE_ENV: 'development' },
    })
    page = await electronApp.firstWindow()

    const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page)
    await mainWin.evaluate(async (win) => {
      win.webContents.executeJavaScript('console.log("Execute JavaScript with e2e testing.")')
    })
  })

  afterAll(async () => {
    // console.log('Working directory:', process.cwd())
    // await page.screenshot({ path: './test/screenshots/e2e.png' })
    await page.close()
    await electronApp.close()
  })

  describe('[electron-vite-react] e2e tests', async () => {
    test('startup', async () => {
      const title = await page.title()
      expect(title).eq('Offline Developer Tools')
    })

    test('should load the tools sidebar correctly', async () => {
      await page.waitForLoadState('domcontentloaded')
      const firstToolItem = await page.$('.tool-item')
      const toolName = await firstToolItem?.$('.tool-name')
      const toolText = await toolName?.textContent()
      expect(toolText).eq('JSON Format/Validate')
    })

    test('should display JSON formatter by default', async () => {
      const formatButton = await page.$('button')
      const buttonText = await formatButton?.textContent()
      expect(buttonText).eq('Format JSON')
    })
  })
}
