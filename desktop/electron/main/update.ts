import { app, ipcMain, type BrowserWindow } from 'electron'
import { createRequire } from 'node:module'
import type {
  AppUpdater,
  ProgressInfo,
  UpdateDownloadedEvent,
  UpdateInfo,
} from 'electron-updater'

const { autoUpdater } = createRequire(import.meta.url)('electron-updater') as {
  autoUpdater: AppUpdater
}

export type UpdaterStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error'

export interface UpdaterState {
  status: UpdaterStatus
  currentVersion: string
  availableVersion?: string
  downloadedVersion?: string
  message?: string
  error?: string
  progress?: {
    percent: number
    transferred: number
    total: number
    bytesPerSecond: number
  }
  lastCheckedAt?: number
}

const browserWindows = new Set<BrowserWindow>()

let updaterListenersBound = false
let updaterIpcBound = false
let autoCheckStarted = false
let initialAutoCheckTimeout: NodeJS.Timeout | null = null
let periodicAutoCheckInterval: NodeJS.Timeout | null = null
let autoInstallTimeout: NodeJS.Timeout | null = null
let checkInFlight = false
let downloadInFlight = false
let quitAndInstallRequested = false

let onTrayStateChange: ((state: UpdaterState) => void) | null = null

let state: UpdaterState = {
  status: 'idle',
  currentVersion: app.getVersion(),
  message: 'Click "Check for Updates" to check for a newer version.',
}

function logUpdate(event: string, payload: Record<string, unknown> = {}) {
  console.log(
    '[updater]',
    JSON.stringify({
      ts: new Date().toISOString(),
      event,
      ...payload,
    }),
  )
}

function setState(next: Partial<UpdaterState>) {
  state = {
    ...state,
    ...next,
    currentVersion: app.getVersion(),
  }

  for (const win of browserWindows) {
    if (!win.isDestroyed()) {
      win.webContents.send('updater:state', state)
    }
  }

  onTrayStateChange?.(state)
}

function sendStateToWindow(win: BrowserWindow) {
  if (win.isDestroyed()) {
    return
  }

  if (win.webContents.isLoading()) {
    const onFinishLoad = () => {
      if (!win.isDestroyed()) {
        win.webContents.send('updater:state', state)
      }
      win.webContents.off('did-finish-load', onFinishLoad)
    }
    win.webContents.on('did-finish-load', onFinishLoad)
    return
  }

  win.webContents.send('updater:state', state)
}

function failInDevMode(context: string) {
  const message = 'Auto updates only work in packaged builds. This will not run in `pnpm dev`.'
  logUpdate('dev-mode-blocked', { context, message })
  setState({
    status: 'error',
    error: message,
    message,
  })
  return { ok: false, message }
}

function bindUpdaterEvents() {
  if (updaterListenersBound) {
    return
  }

  updaterListenersBound = true

  autoUpdater.autoDownload = false
  autoUpdater.disableWebInstaller = false
  autoUpdater.allowDowngrade = false

  autoUpdater.on('checking-for-update', () => {
    logUpdate('checking-for-update', { currentVersion: app.getVersion() })
    setState({
      status: 'checking',
      error: undefined,
      progress: undefined,
      message: 'Checking for updates...',
      lastCheckedAt: Date.now(),
    })
  })

  autoUpdater.on('update-available', (info: UpdateInfo) => {
    checkInFlight = false
    logUpdate('update-available', { version: info.version })
    setState({
      status: 'available',
      availableVersion: info.version,
      downloadedVersion: undefined,
      error: undefined,
      progress: undefined,
      message: `Update ${info.version} is available. Click Install Update to download.`,
    })
  })

  autoUpdater.on('update-not-available', (info: UpdateInfo) => {
    checkInFlight = false
    logUpdate('update-not-available', { version: info.version })
    setState({
      status: 'not-available',
      availableVersion: undefined,
      downloadedVersion: undefined,
      error: undefined,
      progress: undefined,
      message: 'You are already on the latest version.',
    })
  })

  autoUpdater.on('download-progress', (info: ProgressInfo) => {
    logUpdate('download-progress', {
      percent: Number(info.percent.toFixed(2)),
      transferred: info.transferred,
      total: info.total,
      bytesPerSecond: info.bytesPerSecond,
    })
    setState({
      status: 'downloading',
      progress: {
        percent: info.percent,
        transferred: info.transferred,
        total: info.total,
        bytesPerSecond: info.bytesPerSecond,
      },
      message: `Downloading update... ${info.percent.toFixed(1)}%`,
    })
  })

  autoUpdater.on('update-downloaded', (info: UpdateDownloadedEvent) => {
    downloadInFlight = false
    const version = info.version || state.availableVersion

    logUpdate('update-downloaded', { version })
    setState({
      status: 'downloaded',
      downloadedVersion: version,
      progress: {
        percent: 100,
        transferred: state.progress?.total ?? 0,
        total: state.progress?.total ?? 0,
        bytesPerSecond: 0,
      },
      message: 'Update downloaded. Restarting app to install...',
    })

    if (autoInstallTimeout) {
      clearTimeout(autoInstallTimeout)
    }

    autoInstallTimeout = setTimeout(() => {
      logUpdate('quit-and-install-auto', { version })
      quitAndInstallRequested = true
      autoUpdater.quitAndInstall(false, true)
    }, 1200)
  })

  autoUpdater.on('error', (error: Error) => {
    checkInFlight = false
    downloadInFlight = false

    logUpdate('error', {
      name: error.name,
      message: error.message,
    })

    setState({
      status: 'error',
      error: error.message,
      message: error.message,
    })
  })
}

async function runCheckForUpdates(source: 'manual' | 'auto' | 'tray') {
  if (!app.isPackaged) {
    return failInDevMode(`check:${source}`)
  }

  if (checkInFlight) {
    logUpdate('check-skipped-in-flight', { source })
    return { ok: true, inFlight: true }
  }

  if (downloadInFlight) {
    logUpdate('check-skipped-downloading', { source })
    return { ok: true, downloading: true }
  }

  checkInFlight = true
  logUpdate('check-start', {
    source,
    currentVersion: app.getVersion(),
  })

  try {
    await autoUpdater.checkForUpdates()
    logUpdate('check-dispatched', { source })
    return { ok: true }
  } catch (error) {
    checkInFlight = false
    const message = error instanceof Error ? error.message : String(error)
    logUpdate('check-failed', { source, message })
    setState({ status: 'error', error: message, message })
    return { ok: false, message }
  }
}

async function runDownloadUpdate(source: 'manual' | 'tray') {
  if (!app.isPackaged) {
    return failInDevMode(`download:${source}`)
  }

  if (downloadInFlight) {
    logUpdate('download-skipped-in-flight', { source })
    return { ok: true, inFlight: true }
  }

  if (state.status !== 'available') {
    const message = 'No update is available to download yet.'
    logUpdate('download-skipped-no-available-update', { source, status: state.status })
    return { ok: false, message }
  }

  downloadInFlight = true
  logUpdate('download-start', {
    source,
    targetVersion: state.availableVersion,
  })

  setState({
    status: 'downloading',
    progress: {
      percent: 0,
      transferred: 0,
      total: 0,
      bytesPerSecond: 0,
    },
    message: `Downloading update ${state.availableVersion ?? ''}...`,
  })

  try {
    await autoUpdater.downloadUpdate()
    return { ok: true }
  } catch (error) {
    downloadInFlight = false
    const message = error instanceof Error ? error.message : String(error)
    logUpdate('download-failed', { source, message })
    setState({ status: 'error', error: message, message })
    return { ok: false, message }
  }
}

function runQuitAndInstall(source: 'manual' | 'tray') {
  if (!app.isPackaged) {
    return failInDevMode(`quit-and-install:${source}`)
  }

  logUpdate('quit-and-install-manual', { source })
  quitAndInstallRequested = true
  autoUpdater.quitAndInstall(false, true)
  return { ok: true }
}

function bindUpdaterIpcHandlers() {
  if (updaterIpcBound) {
    return
  }

  updaterIpcBound = true

  ipcMain.handle('updater:get-state', () => state)
  ipcMain.handle('check-update', () => runCheckForUpdates('manual'))
  ipcMain.handle('start-download', () => runDownloadUpdate('manual'))
  ipcMain.handle('quit-and-install', () => runQuitAndInstall('manual'))
}

export function setUpdateTrayStateHandler(handler: (state: UpdaterState) => void) {
  onTrayStateChange = handler
  onTrayStateChange(state)
}

export function update(win: BrowserWindow) {
  browserWindows.add(win)
  win.on('closed', () => {
    browserWindows.delete(win)
  })

  bindUpdaterEvents()
  bindUpdaterIpcHandlers()
  sendStateToWindow(win)
}

export function startAutoUpdateChecker() {
  if (autoCheckStarted) {
    return
  }

  autoCheckStarted = true

  if (!app.isPackaged) {
    logUpdate('auto-check-skip-dev-mode')
    return
  }

  logUpdate('auto-check-started', {
    initialDelayMs: 5000,
    intervalMs: 2 * 60 * 60 * 1000,
  })

  initialAutoCheckTimeout = setTimeout(() => {
    void runCheckForUpdates('auto')
  }, 5000)

  periodicAutoCheckInterval = setInterval(() => {
    void runCheckForUpdates('auto')
  }, 2 * 60 * 60 * 1000)
}

export function stopAutoUpdateChecker() {
  if (initialAutoCheckTimeout) {
    clearTimeout(initialAutoCheckTimeout)
    initialAutoCheckTimeout = null
  }

  if (periodicAutoCheckInterval) {
    clearInterval(periodicAutoCheckInterval)
    periodicAutoCheckInterval = null
  }

  autoCheckStarted = false
}

export function triggerUpdateCheckFromTray() {
  for (const win of browserWindows) {
    if (!win.isDestroyed()) {
      win.webContents.send('show-update-dialog')
    }
  }

  void runCheckForUpdates('tray')
}

export function isQuitAndInstallRequested() {
  return quitAndInstallRequested
}
