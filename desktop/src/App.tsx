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
  FileText,
  Settings2,
  Crown,
  Coffee,
  ArrowUpRight
} from 'lucide-react'
import { Sidebar, Tool, ThemeMode } from './components/sidebar'
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
import { Button } from './components/ui/button'
import { AnalyticsSettings } from './components/analytics-settings'

// List of tools
const tools: Tool[] = [
  { id: 'clipboard-detector', name: 'Clipboard Detector', icon: <ClipboardIcon size={16} />, tier: 'free' },
  { id: 'json-formatter', name: 'JSON Format/Validate', icon: <BracketsIcon size={16} />, tier: 'free' },
  { id: 'base64-string', name: 'Base64 String', icon: <Hash size={16} />, tier: 'free' },
  { id: 'binary-base64-codec', name: 'Base64 Binary', icon: <FileText size={16} />, tier: 'free' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', icon: <Link2Icon size={16} />, tier: 'free' },
  { id: 'html-text-extractor', name: 'HTML Text Extractor', icon: <FileText size={16} />, tier: 'free' },
  { id: 'uuid-generator', name: 'UUID Generator', icon: <Fingerprint size={16} />, tier: 'free' },
  { id: 'person-generator', name: 'Person Generator', icon: <Users size={16} />, tier: 'premium' },
  { id: 'speech-length-estimator', name: 'Speech Length Estimator', icon: <Clock size={16} />, tier: 'premium' },
  { id: 'timezone-converter', name: 'Timezone Converter', icon: <Clock size={16} />, tier: 'premium' },
  { id: 'ethereum-converter', name: 'Ethereum Converter', icon: <Hash size={16} />, tier: 'premium' },
  { id: 'unit-converter', name: 'Unit Converter', icon: <Hash size={16} />, tier: 'premium' },
  { id: 'text-utility', name: 'Text Utility', icon: <Type size={16} />, tier: 'premium' },
  { id: 'text-to-slug', name: 'Text to Slug', icon: <Hash size={16} />, tier: 'premium' },
  { id: 'qr-code', name: 'QR Code Tool', icon: <QrCode size={16} />, tier: 'premium' },
  { id: 'password-strength-meter', name: 'Password Strength Meter', icon: <ShieldCheck size={16} />, tier: 'premium' },
  { id: 'watermark-tool', name: 'Watermark Tool', icon: <Image size={16} />, tier: 'premium' },
  { id: 'image-resizer', name: 'Image Resizer', icon: <Image size={16} />, tier: 'premium' },
  { id: 'steganography', name: 'Steganography', icon: <Lock size={16} />, tier: 'premium' },
  { id: 'data-encryptor', name: 'Data Encryptor', icon: <Lock size={16} />, tier: 'premium' },
  { id: 'file-generator', name: 'File Generator', icon: <FileText size={16} />, tier: 'premium' },
  { id: 'updates', name: 'Updates', icon: <RefreshCw size={16} />, tier: 'internal' },
  { id: 'settings', name: 'Settings', icon: <Settings2 size={16} />, tier: 'internal' },
]

const THEME_STORAGE_KEY = 'offlinetools.desktop.theme'

/**
 * App component
 * @returns App component
 */
function App() {
  const [selectedTool, setSelectedTool] = useState<string>('clipboard-detector')
  const [isDebugVisible, setIsDebugVisible] = useState<boolean>(false)
  const [premiumAlertTool, setPremiumAlertTool] = useState<string | null>(null)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const selectedToolMeta = tools.find(tool => tool.id === selectedTool)

  const captureAnalyticsEvent = (event: string, properties: Record<string, unknown>) => {
    if (!window.electron?.ipcRenderer) {
      return
    }

    void window.electron.ipcRenderer
      .invoke('analytics:capture', { event, properties })
      .catch((error) => {
        console.warn('Failed to capture analytics event:', error)
      })
  }

  const openPricingPage = () => {
    if (!window.electron?.ipcRenderer) {
      return
    }

    void window.electron.ipcRenderer.invoke('open-external-url', 'https://offlinetools.org/pricing')
      .catch((error) => {
        console.warn('Failed to open pricing page:', error)
      })
  }

  const captureSidebarToolClick = (toolId: string, isBlocked: boolean) => {
    const clickedTool = tools.find((tool) => tool.id === toolId)
    captureAnalyticsEvent('desktop_tool_clicked', {
      tool_id: toolId,
      tool_tier: clickedTool?.tier ?? 'unknown',
      is_blocked: isBlocked,
    })
  }

  const handleSidebarToolClick = (toolId: string) => {
    setPremiumAlertTool(null)
    setSelectedTool(toolId)
    captureSidebarToolClick(toolId, false)
  }

  const handleLockedSidebarToolClick = (toolId: string) => {
    const blockedTool = tools.find((tool) => tool.id === toolId)
    setPremiumAlertTool(blockedTool?.name ?? 'This tool')
    captureSidebarToolClick(toolId, true)
  }

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode((previousMode) => {
      if (previousMode !== mode) {
        captureAnalyticsEvent('theme_mode_changed', {
          previous_mode: previousMode,
          new_mode: mode,
        })
      }
      return mode
    })
  }

  /**
   * Handle selecting a tool from clipboard detector suggestions
   * @param toolId - The ID of the tool to select
   */
  const handleSelectTool = (toolId: string) => {
    if (tools.some(tool => tool.id === toolId)) {
      setSelectedTool(toolId)
    }
  }

  /**
   * Toggle the debug panel visibility
   */
  const toggleDebugPanel = () => {
    setIsDebugVisible(prev => !prev)
  }

  /**
   * Handle keyboard shortcuts and IPC messages
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle debug panel with Ctrl+Shift+D or Cmd+Shift+D
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'd') {
        e.preventDefault()
        toggleDebugPanel()
      }
    }

    // Set up IPC listener for debug toggle
    const setupIpcListener = () => {
      // Check if we're in Electron environment
      if (window.electron?.ipcRenderer) {
        // Listener for toggle debug message
        const removeDebugListener = window.electron.ipcRenderer.on('toggle-debug-panel', () => {
          toggleDebugPanel()
        })

        // Listener for showing the update dialog/page
        const removeShowUpdateListener = window.electron.ipcRenderer.on('show-update-dialog', () => {
          setSelectedTool('updates')
        })
        
        // Clean up listeners when component unmounts
        return () => {
          removeDebugListener?.()
          removeShowUpdateListener?.()
        }
      }
      return undefined
    }

    // Register keyboard listener
    window.addEventListener('keydown', handleKeyDown)
    
    // Register IPC listeners
    const cleanupIpcListeners = setupIpcListener()

    // Clean up event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (cleanupIpcListeners) cleanupIpcListeners()
    }
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') {
        setThemeMode(saved)
      }
    } catch (error) {
      console.warn('Failed to read saved theme mode:', error)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode)
    } catch (error) {
      console.warn('Failed to save theme mode:', error)
    }
  }, [themeMode])

  return (
    <main className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        tools={tools} 
        selectedTool={selectedTool} 
        onSelectTool={handleSidebarToolClick}
        onLockedToolClick={handleLockedSidebarToolClick}
        themeMode={themeMode}
        onThemeModeChange={handleThemeModeChange}
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
        ) : selectedTool === 'settings' ? (
          <AnalyticsSettings className="min-h-full" />
        ) : (
          <ToolPlaceholder 
            title={selectedToolMeta?.name || ''}
            className="min-h-full"
          />
        )}
      </div>

      {premiumAlertTool ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4" onClick={() => setPremiumAlertTool(null)}>
          <div
            className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
              <Crown className="h-6 w-6 text-primary" />
              Premium feature
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground">
              <strong>{premiumAlertTool}</strong> is available in Premium. Upgrade to unlock this tool.
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Coffee className="h-4 w-4" />
              Upgrade helps fund several cups of coffee and AI agents for development.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPremiumAlertTool(null)}
              >
                Dismiss
              </Button>
              <Button size="sm" onClick={openPricingPage}>
                Upgrade
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      

      
      {/* Debug panel - toggle with Ctrl+Shift+D or Cmd+Shift+D or from menu */}
      <ClipboardDebug isVisible={isDebugVisible} />
    </main>
  )
}

export default App
