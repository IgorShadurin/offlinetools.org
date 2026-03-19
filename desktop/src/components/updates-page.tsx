import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Download, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

type UpdaterStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error'

interface UpdaterState {
  status: UpdaterStatus
  currentVersion: string
  availableVersion?: string
  downloadedVersion?: string
  message?: string
  error?: string
  progress?: {
    percent: number
    transferred: number
    total: number
    bytesPerSecond: number
  }
  lastCheckedAt?: number
}

interface UpdatesPageProps {
  className?: string
}

const FALLBACK_STATE: UpdaterState = {
  status: 'idle',
  currentVersion: 'unknown',
  message: 'Click "Check for Updates" to check for a newer version.',
}

export function UpdatesPage({ className = '' }: UpdatesPageProps) {
  const [updaterState, setUpdaterState] = useState<UpdaterState>(FALLBACK_STATE)
  const [actionPending, setActionPending] = useState<'check' | 'download' | null>(null)

  useEffect(() => {
    const ipc = window.electron?.ipcRenderer ?? window.ipcRenderer
    if (!ipc) {
      return
    }

    let mounted = true

    void ipc
      .invoke('updater:get-state')
      .then((result: UpdaterState) => {
        if (mounted && result) {
          setUpdaterState(result)
        }
      })
      .catch((error) => {
        console.error('Failed to get updater state:', error)
      })

    const removeListener = ipc.on('updater:state', (nextState: UpdaterState) => {
      setUpdaterState(nextState)
    })

    return () => {
      mounted = false
      removeListener?.()
    }
  }, [])

  const isChecking = updaterState.status === 'checking' || actionPending === 'check'
  const isDownloading = updaterState.status === 'downloading' || actionPending === 'download'
  const progressPercent = updaterState.progress?.percent ?? 0

  const statusText = useMemo(() => {
    if (updaterState.error) {
      return updaterState.error
    }

    return updaterState.message ?? 'Ready to check for updates.'
  }, [updaterState.error, updaterState.message])

  const handleCheckForUpdates = async () => {
    const ipc = window.electron?.ipcRenderer ?? window.ipcRenderer
    if (!ipc || isChecking || isDownloading) {
      return
    }

    setActionPending('check')
    try {
      await ipc.invoke('check-update')
    } catch (error) {
      console.error('Check for updates failed:', error)
    } finally {
      setActionPending(null)
    }
  }

  const handleInstallUpdate = async () => {
    const ipc = window.electron?.ipcRenderer ?? window.ipcRenderer
    if (!ipc || updaterState.status !== 'available' || isDownloading) {
      return
    }

    setActionPending('download')
    try {
      await ipc.invoke('start-download')
    } catch (error) {
      console.error('Install update failed:', error)
    } finally {
      setActionPending(null)
    }
  }

  return (
    <div className={`p-4 ${className}`}>
      <h1 className="mb-2 text-2xl font-semibold">Updates</h1>
      <p className="mb-4 text-sm text-muted-foreground">Current version: v{updaterState.currentVersion}</p>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          {(updaterState.status === 'idle' || updaterState.status === 'not-available' || updaterState.status === 'error') && (
            <Button onClick={handleCheckForUpdates} disabled={isChecking || isDownloading}>
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Checking...' : 'Check for Updates'}
            </Button>
          )}

          {updaterState.status === 'available' && (
            <Button onClick={handleInstallUpdate} disabled={isDownloading || isChecking}>
              <Download className="h-4 w-4" />
              {isDownloading ? 'Downloading...' : `Install Update${updaterState.availableVersion ? ` v${updaterState.availableVersion}` : ''}`}
            </Button>
          )}

          {updaterState.status === 'downloaded' && (
            <Button disabled>
              <CheckCircle2 className="h-4 w-4" />
              Restarting to Install...
            </Button>
          )}

          {updaterState.status === 'checking' && (
            <Button disabled>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Checking...
            </Button>
          )}
        </div>

        <p className={`mt-3 text-sm ${updaterState.status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
          {statusText}
        </p>

        {updaterState.status === 'downloading' && (
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${Math.max(0, Math.min(progressPercent, 100))}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{progressPercent.toFixed(1)}% downloaded</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdatesPage
