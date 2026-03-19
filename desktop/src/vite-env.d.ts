/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LICENSE_PUBLIC_KEY_HEX?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
