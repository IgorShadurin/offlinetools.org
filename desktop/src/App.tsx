import { useState, useEffect } from 'react'
import { 
  BracketsIcon, 
  Hash,
  Link2Icon,
  ClipboardIcon,
  KeyIcon
} from 'lucide-react'
import { Sidebar, Tool } from './components/sidebar'
import { JsonFormatter } from './components/json-formatter'
import { ToolPlaceholder } from './components/tool-placeholder'
import { Base64Codec } from './components/base64-codec'
import { UrlEncoder } from './components/url-encoder'
import { TrayNotification } from './components/ui/tray-notification'
import { ClipboardDetector } from './components/clipboard-detector'
import { ClipboardDebug } from './components/clipboard-debug'
import { PasswordGenerator } from './components/password-generator'

// List of tools
const tools: Tool[] = [
  { id: 'clipboard-detector', name: 'Clipboard Detector', icon: <ClipboardIcon size={16} /> },
  { id: 'json-formatter', name: 'JSON Format/Validate', icon: <BracketsIcon size={16} /> },
  { id: 'base64-string', name: 'Base64 String Encode/Decode', icon: <Hash size={16} /> },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', icon: <Link2Icon size={16} /> },
  { id: 'password-generator', name: 'Password Generator', icon: <KeyIcon size={16} /> },
]

/**
 * App component
 * @returns App component
 */
function App() {
  const [selectedTool, setSelectedTool] = useState<string>('clipboard-detector')
  const [isDebugVisible, setIsDebugVisible] = useState<boolean>(false)

  /**
   * Handle selecting a tool from clipboard detector suggestions
   * @param toolId - The ID of the tool to select
   */
  const handleSelectTool = (toolId: string) => {
    if (tools.some(tool => tool.id === toolId)) {
      setSelectedTool(toolId);
    }
  };

  /**
   * Toggle the debug panel visibility
   */
  const toggleDebugPanel = () => {
    setIsDebugVisible(prev => !prev);
  };

  /**
   * Handle keyboard shortcuts and IPC messages
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle debug panel with Ctrl+Shift+D or Cmd+Shift+D
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'd') {
        e.preventDefault();
        toggleDebugPanel();
      }
    };

    // Set up IPC listener for debug toggle
    const setupIpcListener = () => {
      // Check if we're in Electron environment
      if (window.electron?.ipcRenderer) {
        // Listen for toggle debug message from main process
        const removeListener = window.electron.ipcRenderer.on('toggle-debug-panel', () => {
          toggleDebugPanel();
        });
        
        // Clean up listener when component unmounts
        return removeListener;
      }
      return undefined;
    };

    // Register keyboard listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Register IPC listener
    const removeIpcListener = setupIpcListener();

    // Clean up event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (removeIpcListener) removeIpcListener();
    };
  }, []);

  return (
    <main className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        tools={tools} 
        selectedTool={selectedTool} 
        onSelectTool={setSelectedTool} 
      />
      
      <div className="flex-1 overflow-auto">
        {selectedTool === 'clipboard-detector' ? (
          <ClipboardDetector className="min-h-full" onSelectTool={handleSelectTool} />
        ) : selectedTool === 'json-formatter' ? (
          <JsonFormatter className="min-h-full" />
        ) : selectedTool === 'base64-string' ? (
          <Base64Codec className="min-h-full" />
        ) : selectedTool === 'url-encoder' ? (
          <UrlEncoder className="min-h-full" />
        ) : selectedTool === 'password-generator' ? (
          <PasswordGenerator className="min-h-full" />
        ) : (
          <ToolPlaceholder 
            title={tools.find(t => t.id === selectedTool)?.name || ''}
            className="min-h-full"
          />
        )}
      </div>
      
      {/* Tray notification component */}
      <TrayNotification />
      
      {/* Debug panel - toggle with Ctrl+Shift+D or Cmd+Shift+D or from menu */}
      <ClipboardDebug isVisible={isDebugVisible} />
    </main>
  )
}

export default App
