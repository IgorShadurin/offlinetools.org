import type { Metadata } from "next";

import {
  FolderCog,
  RotateCcw,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Code,
  GitCompare,
  HardDrive,
  EyeOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Zero-Downtime Updates with JSON Configuration Management | Offline Tools",
  description:
    "Learn a practical pattern for zero-downtime JSON config updates: atomic writes, runtime reloads, validation, rollback, and Kubernetes caveats.",
};

export default function ZeroDowntimeJsonConfigArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Zero-Downtime Updates with JSON Configuration Management</h1>

      <div className="space-y-6 text-lg">
        <p>
          Zero-downtime JSON configuration management means changing runtime behavior for new work without restarting
          the service or dropping traffic. For most applications, the safe pattern is: write the JSON file atomically,
          reload it into a temporary object, validate it completely, then swap one in-memory reference while keeping
          the last known good config if anything fails.
        </p>
        <p>
          That approach works well for feature flags, routing rules, logging levels, rate limits, and other operational
          settings. It is much less suitable for secrets, startup-only dependencies, or settings that require expensive
          process reinitialization.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FolderCog className="mr-2" size={24} /> What "Zero Downtime" Actually Means
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>The process stays up while configuration changes are applied.</li>
          <li>Bad config does not crash the service; it gets rejected and the old config keeps serving traffic.</li>
          <li>New requests use the new config only after a successful swap.</li>
          <li>In-flight requests or jobs typically finish on the config snapshot they started with.</li>
          <li>In a multi-instance deployment, convergence can be gradual without being user-visible downtime.</li>
        </ul>
        <p>
          That last point matters. Zero downtime does not mean every pod or VM flips at the exact same millisecond. It
          means the service remains available while instances move safely to the new configuration.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <RotateCcw className="mr-2" size={24} /> Recommended Runtime Model
        </h2>
        <ol className="my-4 list-decimal space-y-3 pl-6">
          <li>Writers create a complete new JSON file and replace the old file atomically.</li>
          <li>Readers detect changes with a watcher, polling loop, or both.</li>
          <li>The reload path parses and validates the full document before touching live state.</li>
          <li>The application swaps a single immutable config reference.</li>
          <li>Failed reloads are logged and ignored so the last valid config stays active.</li>
        </ol>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <p className="mb-2 flex items-center text-lg font-medium">
            <CheckCircle className="mr-2 text-green-500" size={20} /> Writer behavior matters as much as reader
            behavior
          </p>
          <p>
            Editors, deploy tools, and projected volumes often update config by rename or symlink swap rather than by
            editing bytes in place. If your reload logic assumes the file changes in place, it can miss updates or read
            a half-written document.
          </p>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-2" size={24} /> A Safer Reload Loop in TypeScript/Node.js
        </h2>
        <p>
          This pattern keeps configuration reads centralized and only changes active behavior after a full parse and
          validation pass.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Hot-reload example</h3>
          <pre className="text-sm">
            {`import { readFileSync, watch } from 'node:fs';
import { basename, dirname } from 'node:path';

type AppConfig = Readonly<{
  version: string;
  routing: { apiBaseUrl: string };
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  featureFlags: Record<string, boolean>;
}>;

const configPath = '/etc/myapp/config.json';
const configDir = dirname(configPath);
const configName = basename(configPath);

let activeConfig: AppConfig;
let reloadTimer: NodeJS.Timeout | undefined;

function parseAndValidateConfig(raw: string): AppConfig {
  const parsed = JSON.parse(raw) as Partial<AppConfig>;

  if (!parsed.version || typeof parsed.version !== 'string') {
    throw new Error('version is required');
  }

  if (!parsed.routing || typeof parsed.routing.apiBaseUrl !== 'string') {
    throw new Error('routing.apiBaseUrl is required');
  }

  if (!['debug', 'info', 'warn', 'error'].includes(String(parsed.logLevel))) {
    throw new Error('invalid logLevel');
  }

  return Object.freeze({
    version: parsed.version,
    routing: { apiBaseUrl: parsed.routing.apiBaseUrl },
    logLevel: parsed.logLevel as AppConfig['logLevel'],
    featureFlags: parsed.featureFlags ?? {},
  });
}

function loadCandidateConfig(): AppConfig {
  return parseAndValidateConfig(readFileSync(configPath, 'utf8'));
}

export function getConfig(): AppConfig {
  return activeConfig;
}

function activateLatestConfig() {
  const candidate = loadCandidateConfig();
  activeConfig = candidate;
  console.info('Activated config version', candidate.version);
}

export function initConfig() {
  activeConfig = loadCandidateConfig();

  watch(configDir, (_eventType, filename) => {
    if (filename?.toString() !== configName) {
      return;
    }

    if (reloadTimer) {
      clearTimeout(reloadTimer);
    }

    reloadTimer = setTimeout(() => {
      try {
        activateLatestConfig();
      } catch (error) {
        console.error(
          'Rejected config update; continuing with last known good config',
          error
        );
      }
    }, 150);
  });
}`}
          </pre>
        </div>
        <p>
          For long-running requests or jobs, capture a config snapshot at the start of the unit of work and keep using
          that snapshot until it completes. That avoids mid-request behavior changes that are hard to reason about.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Atomic write example</h3>
          <pre className="text-sm">
            {`import { renameSync, writeFileSync } from 'node:fs';

function writeConfigAtomically(path: string, nextConfig: unknown) {
  const tempPath = path + '.next';

  writeFileSync(tempPath, JSON.stringify(nextConfig, null, 2) + '\\n', 'utf8');
  renameSync(tempPath, path);
}`}
          </pre>
        </div>
        <p>
          Keep the temporary file in the same directory as the final file so the replace step stays on the same file
          system boundary.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Zap className="mr-2" size={24} /> Choosing How to Detect Changes
        </h2>
        <p>
          <strong>File watchers</strong> are best when you want low-latency updates on local disks. Current{" "}
          <a
            className="underline underline-offset-4"
            href="https://nodejs.org/api/fs.html#fswatchfilename-options-listener"
            rel="noreferrer"
            target="_blank"
          >
            Node.js file system documentation
          </a>{" "}
          still notes that <code>fs.watch()</code> is not fully consistent across platforms and can be unreliable on
          some network file systems. In practice, that means watcher-driven reloads are fast, but a low-frequency poll
          or hash check remains a sensible backstop in production.
        </p>
        <p>
          <strong>Polling</strong> is usually the most predictable option on shared volumes, NFS/SMB mounts, and
          conservative VM deployments. The tradeoff is slower pickup time and steady background I/O.
        </p>
        <p>
          <strong>Centralized configuration services</strong> are a better fit once multiple instances need coordinated
          rollout, version history, auditing, or explicit rollback APIs. At that point, JSON often becomes the payload
          format rather than the storage mechanism.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <HardDrive className="mr-2" size={24} /> Containers and Kubernetes Caveats
        </h2>
        <p>
          Current{" "}
          <a
            className="underline underline-offset-4"
            href="https://kubernetes.io/docs/tutorials/configuration/updating-configuration-via-a-configmap/"
            rel="noreferrer"
            target="_blank"
          >
            Kubernetes ConfigMap documentation
          </a>{" "}
          adds a few details that are easy to miss when JSON config is mounted into pods:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Mounted ConfigMap volumes are refreshed in running pods, but not instantaneously.</li>
          <li>Your app still has to poll or watch the mounted files; a startup-only read will never see later changes.</li>
          <li>ConfigMaps exposed as environment variables do not update automatically and require a pod restart.</li>
          <li>A ConfigMap mounted with <code>subPath</code> does not receive live updates.</li>
        </ul>
        <p>
          If you need near-immediate change propagation across many replicas, reading config via the platform API or a
          dedicated config service is usually more predictable than relying on file projection alone.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <GitCompare className="mr-2" size={24} /> Validation, Rollback, and Observability
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Validate required keys, enum values, numeric ranges, URLs, and mutually exclusive options.</li>
          <li>Stamp each config with a version, checksum, or timestamp and surface it in logs and health output.</li>
          <li>Record reload success and failure metrics so "stale but serving" is visible before users notice.</li>
          <li>Keep previous versions available so rollback is a file swap or pointer change, not a rebuild.</li>
          <li>Apply config changes to new requests first unless a component explicitly supports live mutation.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <EyeOff className="mr-2" size={24} /> What Not to Store in Plain JSON
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Secrets should live in a secret manager or secret-specific mount, not a general-purpose JSON file.</li>
          <li>
            Settings that require process reinitialization, such as some TLS assets or pool sizes, are not truly
            zero-downtime just because the file changed.
          </li>
          <li>
            Cross-service coordination data usually belongs in a configuration control plane, not in a shared JSON file
            on disk.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <AlertTriangle className="mr-2" size={24} /> Common Failure Modes
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>The writer truncates and rewrites the file in place, and readers parse partial JSON.</li>
          <li>The app watches the file path only, but the deploy process replaces the file via rename.</li>
          <li>Reload logic changes global objects in place instead of swapping one immutable config reference.</li>
          <li>A config change silently fails validation and nobody notices because there is no alerting.</li>
          <li>Teams expect env-var updates in containers to behave like file updates, but they do not.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Clock className="mr-2" size={24} /> Bottom Line
        </h2>
        <p>
          JSON files can support zero-downtime updates reliably when you combine atomic writes, full-document
          validation, immutable in-memory swaps, and explicit rollback and monitoring. That is enough for many single
          services and small clusters. Once you need coordinated cross-instance rollout, secrets-heavy configuration, or
          stronger audit guarantees, move from raw files to a configuration service or platform API.
        </p>
      </div>
    </>
  );
}
