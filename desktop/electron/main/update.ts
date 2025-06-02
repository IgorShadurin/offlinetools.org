import { app, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import type {
  ProgressInfo,
  UpdateDownloadedEvent,
  UpdateInfo,
} from 'electron-updater'

const { autoUpdater } = createRequire(import.meta.url)('electron-updater');

export function update(win: Electron.BrowserWindow) {

  // When set to false, the update download will be triggered through the API
  autoUpdater.autoDownload = false
  autoUpdater.disableWebInstaller = false
  autoUpdater.allowDowngrade = false

  // start check
  autoUpdater.on('checking-for-update', function () { 
    console.log('Update: autoUpdater event - checking-for-update')
  })
  // update available
  autoUpdater.on('update-available', (arg: UpdateInfo) => {
    console.log('Update: autoUpdater event - update-available:', JSON.stringify(arg, null, 2))
    win.webContents.send('update-can-available', { update: true, version: app.getVersion(), newVersion: arg?.version })
    win.webContents.send('update-tray-notification', { hasUpdate: true, version: arg?.version })
  })
  // update not available
  autoUpdater.on('update-not-available', (arg: UpdateInfo) => {
    console.log('Update: autoUpdater event - update-not-available:', JSON.stringify(arg, null, 2))
    win.webContents.send('update-can-available', { update: false, version: app.getVersion(), newVersion: arg?.version })
    win.webContents.send('update-tray-notification', { hasUpdate: false })
  })
  autoUpdater.on('error', (error: Error) => {
    console.error('Update: autoUpdater error event:', error)
  })

  // Checking for updates
  ipcMain.handle('check-update', async () => {
    console.log('Update: Manual update check requested via IPC')
    if (!app.isPackaged) {
      const error = new Error('The update feature is only available after the package.')
      console.log('Update: Skipping check - app is not packaged (development mode)')
      return { message: error.message, error }
    }

    try {
      console.log('Update: Calling autoUpdater.checkForUpdatesAndNotify()...')
      const result = await autoUpdater.checkForUpdatesAndNotify()
      console.log('Update: checkForUpdatesAndNotify result:', JSON.stringify(result, null, 2))
      return result
    } catch (error) {
      console.error('Update: Error during manual update check:', error)
      return { message: 'Network error', error }
    }
  })

  // Start downloading and feedback on progress
  ipcMain.handle('start-download', (event: Electron.IpcMainInvokeEvent) => {
    startDownload(
      (error, progressInfo) => {
        if (error) {
          // feedback download error message
          event.sender.send('update-error', { message: error.message, error })
        } else {
          // feedback update progress message
          event.sender.send('download-progress', progressInfo)
        }
      },
      () => {
        // feedback update downloaded message
        event.sender.send('update-downloaded')
      }
    )
  })

  // Install now
  ipcMain.handle('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true)
  })
}

function startDownload(
  callback: (error: Error | null, info: ProgressInfo | null) => void,
  complete: (event: UpdateDownloadedEvent) => void,
) {
  autoUpdater.on('download-progress', (info: ProgressInfo) => callback(null, info))
  autoUpdater.on('error', (error: Error) => callback(error, null))
  autoUpdater.on('update-downloaded', complete)
  autoUpdater.downloadUpdate()
}

let updateCheckInterval: NodeJS.Timeout | null = null

export function startAutoUpdateChecker(win: Electron.BrowserWindow) {
  console.log('Update: Starting auto-update checker with 5-second delay')
  setTimeout(() => {
    console.log('Update: Initial auto-update check triggered')
    checkForUpdatesAutomatically(win)
  }, 5000)

  console.log('Update: Setting up periodic update checks (every 2 hours)')
  updateCheckInterval = setInterval(() => {
    console.log('Update: Periodic auto-update check triggered')
    checkForUpdatesAutomatically(win)
  }, 2 * 60 * 60 * 1000)
}

export function stopAutoUpdateChecker() {
  if (updateCheckInterval) {
    clearInterval(updateCheckInterval)
    updateCheckInterval = null
  }
}

async function checkForUpdatesAutomatically(win: Electron.BrowserWindow) {
  if (!app.isPackaged) {
    console.log('Auto-update: Skipping check in development mode (app.isPackaged = false)')
    return
  }

  try {
    console.log('Auto-update: Starting automatic update check...')
    console.log('Auto-update: Current app version:', app.getVersion())
    console.log('Auto-update: Update server configured for GitHub releases')
    const result = await autoUpdater.checkForUpdatesAndNotify()
    
    console.log('Auto-update: checkForUpdatesAndNotify completed')
    console.log('Auto-update: Result:', JSON.stringify(result, null, 2))
    
    if (result?.updateInfo) {
      console.log('Auto-update: Update available:', result.updateInfo.version)
    } else {
      console.log('Auto-update: No updates available or result was null/undefined')
    }
  } catch (error) {
    console.error('Auto-update: Error checking for updates:', error)
    console.error('Auto-update: Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    })
  }
}
