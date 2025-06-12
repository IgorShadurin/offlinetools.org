import type { ProgressInfo } from 'electron-updater'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/update/Modal'
import Progress from '@/components/update/Progress'
import './update.css'

interface UpdateProps {
  showCheckButton?: boolean
}

const Update = ({ showCheckButton = true }: UpdateProps) => {
  const [checking, setChecking] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [versionInfo, setVersionInfo] = useState<VersionInfo>()
  const [updateError, setUpdateError] = useState<ErrorType>()
  const [progressInfo, setProgressInfo] = useState<Partial<ProgressInfo>>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalBtn, setModalBtn] = useState<{
    cancelText?: string
    okText?: string
    onCancel?: () => void
    onOk?: () => void
  }>({
    onCancel: () => setModalOpen(false),
    onOk: () => window.ipcRenderer.invoke('start-download'),
  })

  const checkUpdate = async () => {
    console.log('UpdateComponent: Manual update check initiated by user')
    setChecking(true)
    /**
     * @type {import('electron-updater').UpdateCheckResult | null | { message: string, error: Error }}
     */
    try {
      console.log('UpdateComponent: Calling IPC check-update...')
      const result = await window.ipcRenderer.invoke('check-update')
      console.log('UpdateComponent: IPC check-update result:', result)
      setProgressInfo({ percent: 0 })
      setChecking(false)
      setModalOpen(true)
      if (result?.error) {
        console.error('UpdateComponent: Update check returned error:', result.error)
        setUpdateAvailable(false)
        setUpdateError(result?.error)
      } else {
        console.log('UpdateComponent: Update check completed successfully')
      }
    } catch (error) {
      console.error('UpdateComponent: Error during update check:', error)
      setChecking(false)
      setUpdateError({ message: 'IPC communication error', error: error as Error })
    }
  }

  const onUpdateCanAvailable = useCallback((_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
    console.log('UpdateComponent: Received update-can-available event:', arg1)
    setVersionInfo(arg1)
    setUpdateError(undefined)
    // Can be update
    if (arg1.update) {
      console.log('UpdateComponent: Update is available, showing update dialog')
      setModalBtn(state => ({
        ...state,
        cancelText: 'Cancel',
        okText: 'Update',
        onOk: () => window.ipcRenderer.invoke('start-download'),
      }))
      setUpdateAvailable(true)
    } else {
      console.log('UpdateComponent: No update available')
      setUpdateAvailable(false)
    }
  }, [])

  const onUpdateError = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
    setUpdateAvailable(false)
    setUpdateError(arg1)
  }, [])

  const onDownloadProgress = useCallback((_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
    setProgressInfo(arg1)
  }, [])

  const onUpdateDownloaded = useCallback((_event: Electron.IpcRendererEvent, ...args: any[]) => {
    setProgressInfo({ percent: 100 })
    setModalBtn(state => ({
      ...state,
      cancelText: 'Later',
      okText: 'Install now',
      onOk: () => window.ipcRenderer.invoke('quit-and-install'),
    }))
  }, [])

  const onShowUpdateDialog = useCallback(() => {
    setModalOpen(true)
  }, [])

  const onUpdateTrayNotification = useCallback((_: Electron.IpcRendererEvent, { hasUpdate, version }: { hasUpdate: boolean, version?: string }) => {
    window.ipcRenderer.invoke('update-tray-notification', { hasUpdate, version })
  }, [])

  useEffect(() => {
    // Get version information and whether to update
    window.ipcRenderer.on('update-can-available', onUpdateCanAvailable)
    window.ipcRenderer.on('update-error', onUpdateError)
    window.ipcRenderer.on('download-progress', onDownloadProgress)
    window.ipcRenderer.on('update-downloaded', onUpdateDownloaded)
    window.ipcRenderer.on('show-update-dialog', onShowUpdateDialog)
    window.ipcRenderer.on('update-tray-notification', onUpdateTrayNotification)

    return () => {
      window.ipcRenderer.off('update-can-available', onUpdateCanAvailable)
      window.ipcRenderer.off('update-error', onUpdateError)
      window.ipcRenderer.off('download-progress', onDownloadProgress)
      window.ipcRenderer.off('update-downloaded', onUpdateDownloaded)
      window.ipcRenderer.off('show-update-dialog', onShowUpdateDialog)
      window.ipcRenderer.off('update-tray-notification', onUpdateTrayNotification)
    }
  }, [onUpdateCanAvailable, onUpdateError, onDownloadProgress, onUpdateDownloaded, onShowUpdateDialog, onUpdateTrayNotification])

  return (
    <>
      <Modal
        open={modalOpen}
        cancelText={modalBtn?.cancelText}
        okText={modalBtn?.okText}
        onCancel={modalBtn?.onCancel}
        onOk={modalBtn?.onOk}
        footer={updateAvailable ? /* hide footer */null : undefined}
      >
        <div className='modal-slot'>
          {updateError
            ? (
              <div>
                <p>Error downloading the latest version.</p>
                <p>{updateError.message}</p>
              </div>
            ) : updateAvailable
              ? (
                <div>
                  <div>The last version is: v{versionInfo?.newVersion}</div>
                  <div className='new-version__target'>v{versionInfo?.version} -&gt; v{versionInfo?.newVersion}</div>
                  <div className='update__progress'>
                    <div className='progress__title'>Update progress:</div>
                    <div className='progress__bar'>
                      <Progress percent={progressInfo?.percent} ></Progress>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className='can-not-available'>{JSON.stringify(versionInfo ?? {}, null, 2)}</div>
              )}
        </div>
      </Modal>
      {showCheckButton && (
        <button disabled={checking} onClick={checkUpdate}>
          {checking ? 'Checking...' : 'Check update'}
        </button>
      )}
    </>
  )
}

export default Update
