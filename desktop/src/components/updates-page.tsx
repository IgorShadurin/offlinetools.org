import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
// import type { ProgressInfo } from "electron-updater"; // No longer needed

// const BYTES_IN_MEGABYTE = 1024 * 1024; // Removed as it's no longer used

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
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  const log = useCallback((msg: string) => {
    setLogs(prev => [...prev, msg]);
    console.log("UpdatesPage:", msg);
  }, []);

  const checkForUpdates = async () => {
    const url = "https://api.github.com/repos/IgorShadurin/offlinetools.org/releases/latest";
    setChecking(true);
    setUpdateInfo(null);
    setDownloadUrl(null); // Reset download URL
    setLogs([]);
    log('Starting update check...');
    try {
      log('Getting OS information...');
      const osInfo: { platform: string, arch: string } | null = await window.ipcRenderer.invoke('get-os-arch');
      if (!osInfo || !osInfo.platform || !osInfo.arch) {
        log('Error: Could not get OS information.');
        setChecking(false);
        return;
      }
      const { platform, arch } = osInfo;
      log(`OS Info: Platform: ${platform}, Arch: ${arch}`);

      const current: string = await window.ipcRenderer.invoke('get-app-version');
      log(`Current version: ${current}`);
      log(`Fetching release information from ${url}`);
      const resp = await fetch(url);
      log(`Status: ${resp.status}`);
      const data = await resp.json();
      // log(`Response: ${JSON.stringify(data)}`); // Can be very verbose
      const latest = (data.tag_name || data.name || '').replace(/^v/, '');

      if (latest && compareVersions(latest, current) > 0) {
        log(`Update available: v${latest}`);
        let foundAsset = null;
        if (data.assets && Array.isArray(data.assets)) {
          for (const asset of data.assets) {
            const assetName = asset.name.toLowerCase();
            // More robust checking for platform and arch within asset names
            if (platform === 'darwin') { // macOS
              if (arch === 'arm64' && (assetName.includes('arm64') || assetName.includes('aarch64')) && (assetName.endsWith('.dmg') || assetName.endsWith('.zip'))) {
                foundAsset = asset;
                break;
              } else if ((arch === 'x64' || arch === 'x86_64') && (assetName.includes('x64') || assetName.includes('intel') || assetName.includes('amd64')) && !assetName.includes('arm64') && (assetName.endsWith('.dmg') || assetName.endsWith('.zip'))) {
                foundAsset = asset;
                break;
              }
            } else if (platform === 'win32' && (arch === 'x64' || arch === 'x86_64')) { // Windows 64-bit
              if ((assetName.includes('win') || assetName.includes('windows')) && (assetName.includes('x64') || assetName.includes('amd64')) && (assetName.endsWith('.exe') || assetName.endsWith('.msi') || assetName.endsWith('.zip'))) {
                foundAsset = asset;
                break;
              }
            } else if (platform === 'linux' && (arch === 'x64' || arch === 'x86_64')) { // Linux 64-bit
              if ((assetName.includes('linux')) && (assetName.includes('x64') || assetName.includes('amd64')) && (assetName.endsWith('.appimage') || assetName.endsWith('.deb') || assetName.endsWith('.tar.gz') || assetName.endsWith('.zip'))) {
                foundAsset = asset;
                break;
              }
            }
            // Add more platform/arch combinations as needed
          }
        }

        if (foundAsset) {
          setDownloadUrl(foundAsset.browser_download_url);
          setUpdateInfo({ current, latest });
          log(`Found download URL for v${latest}: ${foundAsset.browser_download_url}`);
        } else {
          log(`Update v${latest} is available, but no suitable download found for your platform (${platform}) and architecture (${arch}).`);
        }
      } else {
        log(`Current version v${current} is up-to-date or newer than latest release (${latest}).`);
      }
    } catch (e: any) {
      log(`Error: ${e.message}`);
    } finally {
      setChecking(false);
    }
  };

  const openDownloadLink = async () => {
    if (downloadUrl) {
      log(`Opening download link: ${downloadUrl}`);
      try {
        const result = await window.ipcRenderer.invoke('open-external-url', downloadUrl);
        if (result && result.success) {
          log('Download link opened successfully.');
        } else {
          log(`Failed to open download link: ${result?.error || 'Unknown error'}`);
        }
      } catch (error: any) {
        log(`Error opening download link via IPC: ${error.message || error}`);
      }
    } else {
      log('No download URL available to open.');
    }
  };

  useEffect(() => {
    // Cleaned up IPC listeners
    return () => {
      // Ensure any remaining listeners are cleaned up if necessary in the future
    };
  }, [log]);

  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Button onClick={checkForUpdates} disabled={checking}>
          {checking ? 'Checking...' : 'Check for Updates'}
        </Button>
        {updateInfo && downloadUrl && (
          <Button onClick={openDownloadLink} variant="secondary" disabled={checking || !downloadUrl}>
            {`Update to v${updateInfo.latest}`}
          </Button>
        )}
        <span className="ml-auto text-sm">{logs[logs.length - 1] ?? 'Idle'}</span>
        <Button variant="ghost" size="sm" onClick={() => setShowLogs(v => !v)}>
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </Button>
      </div>
      {/* Removed progress bar related to old electron-updater */}
      {showLogs && (
        <pre className="flex-1 overflow-auto rounded bg-muted/50 p-2 text-xs whitespace-pre-wrap">
          {logs.join('\n')}
        </pre>
      )}
    </div>
  );
}

export default UpdatesPage;
