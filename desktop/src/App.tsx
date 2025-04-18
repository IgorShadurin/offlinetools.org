import { useState } from 'react'
import { 
  BracketsIcon, 
  Hash,
  Link2Icon
} from 'lucide-react'
import { Sidebar, Tool } from './components/sidebar'
import { JsonFormatter } from './components/json-formatter'
import { ToolPlaceholder } from './components/tool-placeholder'
import { Base64Codec } from './components/base64-codec'
import { UrlEncoder } from './components/url-encoder'
import { TrayNotification } from './components/ui/tray-notification'

// List of tools
const tools: Tool[] = [
  { id: 'json-formatter', name: 'JSON Format/Validate', icon: <BracketsIcon size={16} /> },
  { id: 'base64-string', name: 'Base64 String Encode/Decode', icon: <Hash size={16} /> },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', icon: <Link2Icon size={16} /> },
]

/**
 * App component
 * @returns App component
 */
function App() {
  const [selectedTool, setSelectedTool] = useState<string>('json-formatter')

  return (
    <main className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        tools={tools} 
        selectedTool={selectedTool} 
        onSelectTool={setSelectedTool} 
      />
      
      <div className="flex-1 overflow-auto">
        {selectedTool === 'json-formatter' ? (
          <JsonFormatter className="min-h-full" />
        ) : selectedTool === 'base64-string' ? (
          <Base64Codec className="min-h-full" />
        ) : selectedTool === 'url-encoder' ? (
          <UrlEncoder className="min-h-full" />
        ) : (
          <ToolPlaceholder 
            title={tools.find(t => t.id === selectedTool)?.name || ''}
            className="min-h-full"
          />
        )}
      </div>
      
      {/* Tray notification component */}
      <TrayNotification />
    </main>
  )
}

export default App