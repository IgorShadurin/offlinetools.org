import { useState, useEffect } from 'react'
import {
  BracketsIcon,
  Hash,
  Link2Icon,
  ClipboardIcon,
  Clock,
  Fingerprint,
  Users,
  RefreshCw,
  ShieldCheck,
  Type,
  QrCode,
  Image,
  Lock,
  FileText
} from 'lucide-react'
import { Sidebar, Tool } from './components/sidebar'
import { JsonFormatter } from './components/json-formatter'
import { ToolPlaceholder } from './components/tool-placeholder'
import { Base64Codec } from './components/base64-codec'
import { UrlEncoder } from './components/url-encoder'
import { UuidGenerator } from './components/uuid-generator'

import { ClipboardDetector } from './components/clipboard-detector'
import { ClipboardDebug } from './components/clipboard-debug'
import { EthereumConverter } from './components/ethereum-converter'
import { UnitConverter } from './components/unit-converter'
import { SpeechLengthEstimator } from './components/speech-length-estimator'
import UpdatesPage from './components/updates-page'
import { PersonGenerator } from './components/person-generator'
import { PasswordStrengthMeter } from './components/password-strength-meter'
import { TextUtility } from './components/text-utility'
import { WatermarkTool } from './components/watermark-tool'
import { QrCodeTool } from './components/qr-code'
import { ImageResizer } from './components/image-resizer'
import { TimezoneConverter } from './components/timezone-converter'
import { Steganography } from './components/steganography'
import { DataEncryptor } from './components/data-encryptor'
import { HtmlTextExtractor } from './components/html-text-extractor'
import { BinaryBase64Codec } from './components/binary-base64-codec'
import { TextToSlug } from './components/text-to-slug'
import { FileGenerator } from './components/file-generator'

// List of tools
const tools: Tool[] = [
  { id: 'clipboard-detector', name: 'Clipboard Detector', icon: <ClipboardIcon size={16} /> },
  { id: 'json-formatter', name: 'JSON Format/Validate', icon: <BracketsIcon size={16} /> },
  { id: 'base64-string', name: 'Base64 String', icon: <Hash size={16} /> },
  { id: 'binary-base64-codec', name: 'Base64 Binary', icon: <FileText size={16} /> },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', icon: <Link2Icon size={16} /> },
  { id: 'html-text-extractor', name: 'HTML Text Extractor', icon: <FileText size={16} /> },
  { id: 'uuid-generator', name: 'UUID Generator', icon: <Fingerprint size={16} /> },
  { id: 'person-generator', name: 'Person Generator', icon: <Users size={16} /> },
  { id: 'speech-length-estimator', name: 'Speech Length Estimator', icon: <Clock size={16} /> },
  { id: 'timezone-converter', name: 'Timezone Converter', icon: <Clock size={16} /> },
  { id: 'ethereum-converter', name: 'Ethereum Converter', icon: <Hash size={16} /> },
  { id: 'unit-converter', name: 'Unit Converter', icon: <Hash size={16} /> },
  { id: 'text-utility', name: 'Text Utility', icon: <Type size={16} /> },
  { id: 'text-to-slug', name: 'Text to Slug', icon: <Hash size={16} /> },
  { id: 'qr-code', name: 'QR Code Tool', icon: <QrCode size={16} /> },
  { id: 'password-strength-meter', name: 'Password Strength Meter', icon: <ShieldCheck size={16} /> },
  { id: 'watermark-tool', name: 'Watermark Tool', icon: <Image size={16} /> },
  { id: 'image-resizer', name: 'Image Resizer', icon: <Image size={16} /> },
  { id: 'steganography', name: 'Steganography', icon: <Lock size={16} /> },
  { id: 'data-encryptor', name: 'Data Encryptor', icon: <Lock size={16} /> },
  { id: 'file-generator', name: 'File Generator', icon: <FileText size={16} /> },
  { id: 'updates', name: 'Updates', icon: <RefreshCw size={16} /> },
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
        // Listener for toggle debug message
        const removeDebugListener = window.electron.ipcRenderer.on('toggle-debug-panel', () => {
          toggleDebugPanel();
        });

        // Listener for showing the update dialog/page
        const removeShowUpdateListener = window.electron.ipcRenderer.on('show-update-dialog', () => {
          setSelectedTool('updates');
        });
        
        // Clean up listeners when component unmounts
        return () => {
          removeDebugListener?.();
          removeShowUpdateListener?.();
        };
      }
      return undefined;
    };

    // Register keyboard listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Register IPC listeners
    const cleanupIpcListeners = setupIpcListener();

    // Clean up event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (cleanupIpcListeners) cleanupIpcListeners();
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
        ) : selectedTool === 'html-text-extractor' ? (
          <HtmlTextExtractor className="min-h-full" />
        ) : selectedTool === 'uuid-generator' ? (
          <UuidGenerator className="min-h-full" />
        ) : selectedTool === 'person-generator' ? (
          <PersonGenerator className="min-h-full" />
        ) : selectedTool === 'speech-length-estimator' ? (
          <SpeechLengthEstimator className="min-h-full" />
        ) : selectedTool === 'ethereum-converter' ? (
          <EthereumConverter className="min-h-full" />
        ) : selectedTool === 'unit-converter' ? (
          <UnitConverter className="min-h-full" />
        ) : selectedTool === 'text-utility' ? (
          <TextUtility className="min-h-full" />
        ) : selectedTool === 'qr-code' ? (
          <QrCodeTool className="min-h-full" />
        ) : selectedTool === 'password-strength-meter' ? (
          <PasswordStrengthMeter className="min-h-full" />
        ) : selectedTool === 'watermark-tool' ? (
          <WatermarkTool className="min-h-full" />
        ) : selectedTool === 'image-resizer' ? (
          <ImageResizer className="min-h-full" />
        ) : selectedTool === 'timezone-converter' ? (
          <TimezoneConverter className="min-h-full" />
        ) : selectedTool === 'steganography' ? (
          <Steganography className="min-h-full" />
        ) : selectedTool === 'data-encryptor' ? (
          <DataEncryptor className="min-h-full" />
        ) : selectedTool === 'binary-base64-codec' ? (
          <BinaryBase64Codec className="min-h-full" />
        ) : selectedTool === 'text-to-slug' ? (
          <TextToSlug className="min-h-full" />
        ) : selectedTool === 'file-generator' ? (
          <FileGenerator className="min-h-full" />
        ) : selectedTool === 'updates' ? (
          <UpdatesPage className="min-h-full" />
        ) : (
          <ToolPlaceholder 
            title={tools.find(t => t.id === selectedTool)?.name || ''}
            className="min-h-full"
          />
        )}
      </div>
      

      
      {/* Debug panel - toggle with Ctrl+Shift+D or Cmd+Shift+D or from menu */}
      <ClipboardDebug isVisible={isDebugVisible} />
    </main>
  )
}

export default App
