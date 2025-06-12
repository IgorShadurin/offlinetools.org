import { useState, useEffect, useCallback } from "react";
import Update from "./update";
import Progress from "./update/Progress";
import { Button } from "./ui/button";
import type { ProgressInfo } from "electron-updater";

interface UpdatesPageProps {
  className?: string;
}

function compareVersions(a: string, b: string): number {
  const pa = a.replace(/^v/, '').split('.').map(Number);
  const pb = b.replace(/^v/, '').split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function UpdatesPage({ className = "" }: UpdatesPageProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<{ current: string; latest: string } | null>(null);
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  const log = useCallback((msg: string) => {
    setLogs(prev => [...prev, msg]);
    console.log("UpdatesPage:", msg);
  }, []);

  const checkForUpdates = async () => {
    const url = "https://api.github.com/repos/IgorShadurin/offlinetools.org/releases/latest";
    setChecking(true);
    setUpdateInfo(null);
    setLogs([]);
    log(`Fetching ${url}`);
    try {
      const current: string = await window.ipcRenderer.invoke('get-app-version');
      log(`Current version: ${current}`);
      const resp = await fetch(url);
      log(`Status: ${resp.status}`);
      const data = await resp.json();
      log(`Response: ${JSON.stringify(data)}`);
      const latest = (data.tag_name || data.name || '').replace(/^v/, '');
      if (latest && compareVersions(latest, current) > 0) {
        setUpdateInfo({ current, latest });
        log(`Update available: v${latest}`);
      } else {
        log('No update available');
      }
    } catch (e: any) {
      log(`Error: ${e.message}`);
    } finally {
      setChecking(false);
    }
  };

  const startUpdate = async () => {
    log('Starting update via autoUpdater');
    setUpdating(true);
    setProgress(null);
    const result = await window.ipcRenderer.invoke('check-update');
    if (result?.updateInfo) {
      log(`Update ${result.updateInfo.version} found, downloading...`);
      await window.ipcRenderer.invoke('start-download');
    } else if (result?.error) {
      log(`Error: ${result.error.message || result.error}`);
      setUpdating(false);
    } else {
      log('No update available');
      setUpdating(false);
    }
  };

  useEffect(() => {
    const handleProgress = (_: any, info: ProgressInfo) => {
      setProgress(info);
      const transferred = (info.transferred / 1048576).toFixed(2);
      const total = (info.total / 1048576).toFixed(2);
      log(`Downloading ${transferred}/${total} MB (${info.percent.toFixed(1)}%)`);
    };
    const handleDownloaded = () => {
      log('Download complete');
      setUpdating(false);
    };
    const handleError = (_: any, err: { message: string }) => {
      log(`Update error: ${err.message}`);
      setUpdating(false);
    };
    window.ipcRenderer.on('download-progress', handleProgress);
    window.ipcRenderer.on('update-downloaded', handleDownloaded);
    window.ipcRenderer.on('update-error', handleError);
    return () => {
      window.ipcRenderer.off('download-progress', handleProgress);
      window.ipcRenderer.off('update-downloaded', handleDownloaded);
      window.ipcRenderer.off('update-error', handleError);
    };
  }, [log]);

  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Button onClick={checkForUpdates} disabled={checking || updating}>
          {checking ? 'Checking...' : 'Check for Updates'}
        </Button>
        {updateInfo && (
          <Button onClick={startUpdate} variant="secondary" disabled={updating}>
            {updating && progress
              ? `Downloading ${progress.percent.toFixed(1)}%`
              : `Update to v${updateInfo.latest}`}
          </Button>
        )}
        <span className="ml-auto text-sm">{logs[logs.length - 1] ?? 'Idle'}</span>
        <Button variant="ghost" size="sm" onClick={() => setShowLogs(v => !v)}>
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </Button>
      </div>
      {updating && progress && (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <Progress percent={progress.percent} />
          <span>
            {(progress.transferred / 1048576).toFixed(2)} /{' '}
            {(progress.total / 1048576).toFixed(2)} MB
          </span>
        </div>
      )}
      {showLogs && (
        <pre className="flex-1 overflow-auto rounded bg-muted/50 p-2 text-xs whitespace-pre-wrap">
          {logs.join('\n')}
        </pre>
      )}
      {/* Hidden Update component for progress modal */}
      <Update showCheckButton={false} />
    </div>
  );
}

export default UpdatesPage;
