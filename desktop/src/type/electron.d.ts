/**
 * Type definitions for Electron IPC
 */
interface IpcRenderer {
  on(channel: string, listener: (...args: any[]) => void): () => void;
  off(channel: string, listener: (...args: any[]) => void): void;
  once(channel: string, listener: (...args: any[]) => void): void;
  send(channel: string, ...args: any[]): void;
  invoke(channel: 'get-app-version'): Promise<string>;
  invoke(channel: string, ...args: any[]): Promise<any>;
  removeAllListeners(channel: string): void;
}

/**
 * Clipboard API for electron
 */
interface ElectronClipboard {
  readText(): Promise<string>;
  writeText(text: string): Promise<boolean>;
  availableFormats(): Promise<string[]>;
  hasImage(): Promise<boolean>;
  hasContent(): Promise<{
    hasText: boolean;
    hasHtml: boolean;
    hasImage: boolean;
    formats: string[];
  }>;
}

/**
 * Electron API exposed to the renderer
 */
interface ElectronAPI {
  ipcRenderer: IpcRenderer;
  clipboard: ElectronClipboard;
}

interface Window {
  ipcRenderer: IpcRenderer;
  api: IpcRenderer;
  electron: ElectronAPI;
} 