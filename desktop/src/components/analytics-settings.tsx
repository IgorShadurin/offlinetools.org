import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

interface AnalyticsSettingsProps {
  className?: string
}

export function AnalyticsSettings({ className = "" }: AnalyticsSettingsProps) {
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadSetting = async () => {
      try {
        const result = await window.electron.ipcRenderer.invoke("analytics:get-enabled")
        if (isMounted) {
          setEnabled(!!result)
        }
      } catch (loadError) {
        if (isMounted) {
          setError("Failed to load analytics setting.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSetting()

    return () => {
      isMounted = false
    }
  }, [])

  const onToggle = async (checked: boolean) => {
    setError(null)
    const previous = enabled
    setEnabled(checked)

    try {
      const persisted = await window.electron.ipcRenderer.invoke("analytics:set-enabled", checked)
      setEnabled(!!persisted)
    } catch (toggleError) {
      setEnabled(previous)
      setError("Could not save analytics setting.")
    }
  }

  return (
    <div className={`p-4 ${className}`}>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="analytics-enabled"
              checked={enabled}
              disabled={loading}
              onCheckedChange={onToggle}
            />
            <div className="space-y-2">
              <Label htmlFor="analytics-enabled" className="text-sm font-medium">
                Enable analytics
              </Label>
              <p className="text-sm text-muted-foreground">
                Helps improve OfflineTools by collecting anonymous usage events like app opens and tool selections.
              </p>
              <p className="text-xs text-muted-foreground">
                This setting is saved locally and persists across app restarts.
              </p>
            </div>
          </div>
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Settings error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
