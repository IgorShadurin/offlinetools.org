import { app, BrowserWindow, shell, ipcMain, Tray, Menu, nativeImage, clipboard, MenuItem } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update, startAutoUpdateChecker, stopAutoUpdateChecker } from './update'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
let tray: Tray | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

/**
 * Set up IPC handlers for clipboard operations
 */
function setupClipboardHandlers() {
  // Read text from clipboard
  ipcMain.handle('clipboard:readText', () => {
    try {
      return clipboard.readText()
    } catch (error) {
      console.error('Main process: Error reading clipboard text:', error)
      return ''
    }
  })

  // Write text to clipboard
  ipcMain.handle('clipboard:writeText', (_, text) => {
    try {
      clipboard.writeText(text)
      return true
    } catch (error) {
      console.error('Main process: Error writing clipboard text:', error)
      return false
    }
  })

  // Get available formats in clipboard
  ipcMain.handle('clipboard:availableFormats', () => {
    try {
      return clipboard.availableFormats()
    } catch (error) {
      console.error('Main process: Error getting clipboard formats:', error)
      return []
    }
  })

  // Check if image is available in clipboard
  ipcMain.handle('clipboard:hasImage', () => {
    try {
      const formats = clipboard.availableFormats()
      const hasImage = formats.some(format => format.startsWith('image/'))
      return hasImage
    } catch (error) {
      console.error('Main process: Error checking for image in clipboard:', error)
      return false
    }
  })

  // Check if clipboard has content
  ipcMain.handle('clipboard:hasContent', () => {
    try {
      // Try to check for any content in the clipboard
      const hasText = clipboard.readText().length > 0
      const hasHtml = clipboard.readHTML().length > 0
      const formats = clipboard.availableFormats()
      const hasImage = formats.some(format => format.startsWith('image/'))
      
      return { hasText, hasHtml, hasImage, formats }
    } catch (error) {
      console.error('Main process: Error checking clipboard content:', error)
      return { hasText: false, hasHtml: false, hasImage: false, formats: [] }
    }
  })
}

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    width: 1270,
    height: 640,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Auto update
  update(win)
  startAutoUpdateChecker(win)
}

/**
 * Creates the system tray icon and menu
 */
function createTray() {
  // Use a fallback icon if the favicon.ico is not found
  let iconPath = path.join(process.env.VITE_PUBLIC, 'favicon.ico')
  let trayIcon;
  
  // Fallback to app.getAppPath() if the icon doesn't exist
  try {
    if (!require('fs').existsSync(iconPath)) {
      console.log(`Icon not found at ${iconPath}, using default icon`)
      iconPath = process.platform === 'win32'
        ? path.join(app.getAppPath(), 'build', 'icon.ico')
        : path.join(app.getAppPath(), 'build', 'icon.png')
    }
    
    trayIcon = nativeImage.createFromPath(iconPath)
    
    // Check if the icon was loaded successfully
    if (trayIcon.isEmpty()) {
      console.log('Icon is empty, using template icon')
      // Create a minimal template icon
      trayIcon = createTemplateIcon()
    }
  } catch (err) {
    console.error('Error loading icon:', err)
    // Create a minimal template icon as fallback
    trayIcon = createTemplateIcon()
  }
  
  tray = new Tray(trayIcon)
  tray.setToolTip('Offline Tools')
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Open App', 
      click: () => {
        if (win) {
          win.show()
          win.focus()
        } else {
          createWindow()
        }
      } 
    },
    { type: 'separator' },
    { 
      label: 'Test Button 1', 
      click: () => {
        if (win) {
          win.webContents.send('tray-action', 'test-button-1')
        }
      } 
    },
    { 
      label: 'Test Button 2', 
      click: () => {
        if (win) {
          win.webContents.send('tray-action', 'test-button-2')
        }
      } 
    },
    { type: 'separator' },
    { 
      label: 'Exit', 
      click: () => {
        app.quit()
      } 
    }
  ])
  
  tray.setContextMenu(contextMenu)
  
  // Optional: Add click handler to open app on tray icon click
  tray.on('click', () => {
    if (win) {
      if (win.isVisible()) {
        win.focus()
      } else {
        win.show()
      }
    } else {
      createWindow()
    }
  })
}

/**
 * Creates a template icon when no icon file is available
 * @returns {Electron.NativeImage} A template icon
 */
function createTemplateIcon() {
  // Create a simple 16x16 icon
  const size = 16
  const icon = nativeImage.createEmpty()
  
  // Create a simple monochrome buffer for a 16x16 icon
  // Each pixel is represented by 4 bytes (RGBA)
  const buffer = Buffer.alloc(size * size * 4)
  
  // Fill with a square pattern
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const offset = (y * size + x) * 4
      
      // Create a simple square pattern
      const isBorder = x === 0 || y === 0 || x === size - 1 || y === size - 1
      const isInnerSquare = x > 3 && x < size - 4 && y > 3 && y < size - 4
      
      if (isBorder || isInnerSquare) {
        // White pixel
        buffer[offset] = 255     // R
        buffer[offset + 1] = 255 // G
        buffer[offset + 2] = 255 // B
        buffer[offset + 3] = 255 // A
      } else {
        // Black pixel
        buffer[offset] = 0       // R
        buffer[offset + 1] = 0   // G
        buffer[offset + 2] = 0   // B
        buffer[offset + 3] = 255 // A
      }
    }
  }
  
  // Add the buffer as a representation to the icon
  icon.addRepresentation({
    scaleFactor: 1.0,
    width: size,
    height: size,
    buffer: buffer
  })
  
  return icon
}

/**
 * Creates the application menu
 */
function createApplicationMenu() {
  const isMac = process.platform === 'darwin'
  
  const debugMenuItem: Electron.MenuItemConstructorOptions = {
    label: 'Debug',
    submenu: [
      {
        label: 'Toggle Clipboard Debug',
        accelerator: isMac ? 'Cmd+Shift+D' : 'Ctrl+Shift+D',
        click: () => {
          if (win) {
            win.webContents.send('toggle-debug-panel')
          }
        }
      }
    ]
  }
  
  const template: Electron.MenuItemConstructorOptions[] = [
    // macOS app menu
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' as const },
        { type: 'separator' as const },
        { role: 'services' as const },
        { type: 'separator' as const },
        { role: 'hide' as const },
        { role: 'hideOthers' as const },
        { role: 'unhide' as const },
        { type: 'separator' as const },
        { role: 'quit' as const }
      ]
    }] : []),
    // File Menu
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' as const } : { role: 'quit' as const }
      ]
    },
    // Edit Menu
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' as const },
        { role: 'redo' as const },
        { type: 'separator' as const },
        { role: 'cut' as const },
        { role: 'copy' as const },
        { role: 'paste' as const }
      ]
    },
    // View Menu
    {
      label: 'View',
      submenu: [
        { role: 'reload' as const },
        { role: 'forceReload' as const },
        { role: 'toggleDevTools' as const },
        { type: 'separator' as const },
        { role: 'resetZoom' as const },
        { role: 'zoomIn' as const },
        { role: 'zoomOut' as const },
        { type: 'separator' as const },
        { role: 'togglefullscreen' as const }
      ]
    },
    // Debug Menu
    debugMenuItem,
    // Window Menu
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' as const },
        ...(isMac ? [
          { type: 'separator' as const },
          { role: 'front' as const },
          { type: 'separator' as const },
          { role: 'window' as const }
        ] : [
          { role: 'close' as const }
        ])
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  // Set up clipboard handlers
  setupClipboardHandlers()
  
  createWindow()
  createTray()
  createApplicationMenu()
})

app.on('window-all-closed', () => {
  win = null
  stopAutoUpdateChecker()
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// Handle window minimize to tray
ipcMain.handle('minimize-to-tray', () => {
  if (win) {
    win.hide()
  }
})

// Update tray menu dynamically
ipcMain.handle('update-tray-menu', (_, items) => {
  if (tray) {
    const template = [
      { 
        label: 'Open App', 
        click: () => {
          if (win) {
            win.show()
            win.focus()
          } else {
            createWindow()
          }
        } 
      },
      { type: 'separator' },
      ...items,
      { type: 'separator' },
      { 
        label: 'Exit', 
        click: () => {
          app.quit()
        } 
      }
    ]
    
    const contextMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
  }
})

// Handle tray update notifications
ipcMain.handle('update-tray-notification', (_, { hasUpdate, version }) => {
  updateTrayWithUpdateNotification(hasUpdate, version)
})

function updateTrayWithUpdateNotification(hasUpdate: boolean, version?: string) {
  if (!tray) return

  const updateMenuItem = hasUpdate ? {
    label: `Update Available${version ? ` (v${version})` : ''}`,
    click: () => {
      if (win) {
        win.show()
        win.focus()
        win.webContents.send('show-update-dialog')
      } else {
        createWindow()
      }
    }
  } : null

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Open App', 
      click: () => {
        if (win) {
          win.show()
          win.focus()
        } else {
          createWindow()
        }
      } 
    },
    ...(updateMenuItem ? [{ type: 'separator' as const }, updateMenuItem] : []),
    { type: 'separator' as const },
    { 
      label: 'Test Button 1', 
      click: () => {
        if (win) {
          win.webContents.send('tray-action', 'test-button-1')
        }
      } 
    },
    { 
      label: 'Test Button 2', 
      click: () => {
        if (win) {
          win.webContents.send('tray-action', 'test-button-2')
        }
      } 
    },
    { type: 'separator' as const },
    { 
      label: 'Exit', 
      click: () => {
        app.quit()
      } 
    }
  ])
  
  tray.setContextMenu(contextMenu)
}
