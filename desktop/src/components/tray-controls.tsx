import { MinimizeIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export interface TrayControlsProps {
  className?: string
}

/**
 * Component for controlling the tray functionality
 * @param props - Component properties
 * @returns Tray controls component
 */
export function TrayControls({ className }: TrayControlsProps) {
  /**
   * Minimizes the app to the system tray
   */
  const handleMinimizeToTray = () => {
    window.ipcRenderer.invoke('minimize-to-tray')
  }

  /**
   * Adds a custom menu item to the tray
   * @param label - Label for the menu item
   */
  const addTrayMenuItem = (label: string) => {
    const customItems = [
      { 
        label: label, 
        click: () => {
          window.ipcRenderer.send('tray-action', `custom-${label.toLowerCase()}`)
        } 
      }
    ]
    
    window.ipcRenderer.invoke('update-tray-menu', customItems)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tray Controls</CardTitle>
        <CardDescription>
          Control the application's system tray functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Button 
            onClick={handleMinimizeToTray}
            className="w-full"
            variant="outline"
          >
            <MinimizeIcon size={16} className="mr-2" />
            Minimize to Tray
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Test Buttons</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => window.ipcRenderer.send('tray-action', 'test-button-1')}
              variant="secondary"
              size="sm"
            >
              Test Button 1
            </Button>
            <Button 
              onClick={() => window.ipcRenderer.send('tray-action', 'test-button-2')}
              variant="secondary"
              size="sm"
            >
              Test Button 2
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 pt-0">
        <h3 className="text-sm font-medium">Add Custom Menu Item</h3>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button 
            onClick={() => addTrayMenuItem('Custom 1')}
            variant="outline"
            size="sm"
          >
            Add Custom 1
          </Button>
          <Button 
            onClick={() => addTrayMenuItem('Custom 2')}
            variant="outline"
            size="sm"
          >
            Add Custom 2
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 