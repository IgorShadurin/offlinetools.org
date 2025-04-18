import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface TrayNotificationProps {
  className?: string
}

/**
 * Component to display notifications from tray actions
 * @param props - Component properties
 * @returns Tray notification component
 */
export function TrayNotification({ className }: TrayNotificationProps) {
  const [message, setMessage] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // Set up the IPC listener for tray actions
    const handleTrayAction = (_: unknown, action: string) => {
      if (action === 'test-button-1') {
        setMessage('Test Button 1 was clicked')
        setVisible(true)
      } else if (action === 'test-button-2') {
        setMessage('Test Button 2 was clicked')
        setVisible(true)
      }
    }

    // Add the event listener
    window.ipcRenderer.on('tray-action', handleTrayAction)

    // Clean up the event listener when the component unmounts
    return () => {
      window.ipcRenderer.off('tray-action', handleTrayAction)
    }
  }, [])

  // Auto-hide the notification after 3 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [visible])

  if (!visible) return null

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 p-4 bg-card text-card-foreground rounded-lg shadow-lg border border-border w-80 z-50 animate-in fade-in slide-in-from-bottom-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Tray Action</h3>
        <button 
          className="text-muted-foreground hover:text-foreground" 
          onClick={() => setVisible(false)}
        >
          <X size={16} />
        </button>
      </div>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  )
} 