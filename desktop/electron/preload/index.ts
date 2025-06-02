import { contextBridge, ipcRenderer } from 'electron'

// Create IPC-based clipboard API for the renderer
const ipcClipboard = {
  readText: async () => {
    try {
      return await ipcRenderer.invoke('clipboard:readText')
    } catch (error) {
      console.error('Preload: Error in clipboard.readText:', error)
      return ''
    }
  },
  
  writeText: async (text: string) => {
    try {
      return await ipcRenderer.invoke('clipboard:writeText', text)
    } catch (error) {
      console.error('Preload: Error in clipboard.writeText:', error)
      return false
    }
  },
  
  availableFormats: async () => {
    try {
      return await ipcRenderer.invoke('clipboard:availableFormats')
    } catch (error) {
      console.error('Preload: Error in clipboard.availableFormats:', error)
      return []
    }
  },
  
  hasImage: async () => {
    try {
      return await ipcRenderer.invoke('clipboard:hasImage')
    } catch (error) {
      console.error('Preload: Error in clipboard.hasImage:', error)
      return false
    }
  },
  
  hasContent: async () => {
    try {
      return await ipcRenderer.invoke('clipboard:hasContent')
    } catch (error) {
      console.error('Preload: Error in clipboard.hasContent:', error)
      return { hasText: false, hasHtml: false, hasImage: false, formats: [] }
    }
  }
}

// Create safe IPC wrapper for renderer with listener tracking
const safeIpcRenderer = {
  // Map to track event listeners for proper removal
  listeners: new Map<string, Map<Function, Function>>(),
  
  // Standard IPC methods
  send: (channel: string, ...args: unknown[]) => {
    if (validateChannel(channel)) {
      ipcRenderer.send(channel, ...args)
    }
  },
  invoke: (channel: string, ...args: unknown[]) => {
    if (validateChannel(channel)) {
      return ipcRenderer.invoke(channel, ...args)
    }
    return Promise.reject(new Error(`Invalid channel: ${channel}`))
  },
  on: (channel: string, func: (...args: unknown[]) => void) => {
    if (validateChannel(channel)) {
      // Create a wrapper to handle event objects
      const subscription = (_event: Electron.IpcRendererEvent, ...args: unknown[]) => func(...args)
      
      // Store the mapping between original and wrapped function
      if (!safeIpcRenderer.listeners.has(channel)) {
        safeIpcRenderer.listeners.set(channel, new Map())
      }
      safeIpcRenderer.listeners.get(channel)?.set(func, subscription)
      
      // Add the actual listener
      ipcRenderer.on(channel, subscription)
      
      return () => {
        // Remove listener when the returned function is called
        ipcRenderer.removeListener(channel, subscription)
        safeIpcRenderer.listeners.get(channel)?.delete(func)
      }
    }
    return () => {}
  },
  once: (channel: string, func: (...args: unknown[]) => void) => {
    if (validateChannel(channel)) {
      // For once, we don't need to track since it auto-removes
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    }
  },
  // Proper 'off' method that retrieves the wrapped function
  off: (channel: string, func: (...args: unknown[]) => void) => {
    if (validateChannel(channel)) {
      // Get the original wrapper function
      const wrappedFunc = safeIpcRenderer.listeners.get(channel)?.get(func)
      if (wrappedFunc) {
        // Remove the actual listener using the stored wrapper
        ipcRenderer.removeListener(channel, wrappedFunc as any)
        // Clean up our tracking map
        safeIpcRenderer.listeners.get(channel)?.delete(func)
      }
    }
  },
  removeAllListeners: (channel: string) => {
    if (validateChannel(channel)) {
      ipcRenderer.removeAllListeners(channel)
      // Clean up our tracking map for this channel
      safeIpcRenderer.listeners.delete(channel)
    }
  },
  // Additional methods if needed
}

// Validate IPC channel names for security
function validateChannel(channel: string): boolean {
  // Restrict channels to alphanumeric, underscore, dash and period
  const validChannelRegex = /^[a-z0-9_\-\.:]+$/i
  return validChannelRegex.test(channel)
}

// Log that the preload script is running
console.log('Preload script is running - initializing clipboard API via IPC')
console.log('Preload: Context isolation enabled:', process.contextIsolated)
console.log('Preload: Setting up IPC communication channels...')

// Define our electron API with clipboard support
const electronAPIForRenderer = {
  // Expose ipcRenderer directly to match expected structure
  ipcRenderer: safeIpcRenderer,
  clipboard: ipcClipboard
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPIForRenderer)
    // Also expose ipcRenderer directly for compatibility
    contextBridge.exposeInMainWorld('ipcRenderer', safeIpcRenderer)
    // Expose api for backward compatibility
    contextBridge.exposeInMainWorld('api', safeIpcRenderer)
    console.log('Preload script loaded successfully (context isolated)')
    console.log('Preload: Exposed electron API to main world')
  } catch (error) {
    console.error('Error exposing APIs:', error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPIForRenderer
  // @ts-ignore (define in dts)
  window.ipcRenderer = safeIpcRenderer
  // @ts-ignore (define in dts)
  window.api = safeIpcRenderer
  console.log('Preload script loaded successfully (no context isolation)')
  console.log('Preload: Attached electron API to window object')
}

// Log that the clipboard API has been exposed
console.log('IPC-based clipboard API exposed to renderer process')
console.log('Preload: All APIs successfully initialized')

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)

// Log that the preload script has been loaded
console.log("Electron preload script loaded");
