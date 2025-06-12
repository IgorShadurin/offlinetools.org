import { useState } from "react";
import Update from "./update";
import { Button } from "./ui/button";

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
  const [updateInfo, setUpdateInfo] = useState<{current: string; latest: string} | null>(null);

  const log = (msg: string) => {
    setLogs(prev => [...prev, msg]);
    console.log("UpdatesPage:", msg);
  };

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
    await window.ipcRenderer.invoke('check-update');
  };

  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <Button onClick={checkForUpdates} disabled={checking}>
          {checking ? 'Checking...' : 'Check for Updates'}
        </Button>
        {updateInfo && (
          <Button onClick={startUpdate} variant="secondary">
            Update to v{updateInfo.latest}
          </Button>
        )}
      </div>
      <pre className="flex-1 overflow-auto rounded bg-muted/50 p-2 text-xs whitespace-pre-wrap">
        {logs.join('\n')}
      </pre>
      {/* Hidden Update component for progress modal */}
      <Update showCheckButton={false} />
    </div>
  );
}

export default UpdatesPage;
