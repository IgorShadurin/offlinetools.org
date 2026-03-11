import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Using JSON for Feature Flags and Toggles | Offline Tools",
  description:
    "A practical guide to JSON feature flags: schema design, typed payloads, sticky rollouts, validation, safe client exposure, and when to move beyond a plain JSON file.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Using JSON for Feature Flags and Toggles</h1>

      <div className="space-y-6">
        <p>
          JSON is a strong fit for feature flags when you want readable configuration, version control, and a simple
          way to change behavior without redeploying logic. The important caveat is that JSON is only the storage
          format. You still need defaults, targeting rules, rollout stickiness, validation, and a cleanup process.
        </p>

        <p>
          If you are landing here from search, the short answer is: use JSON when your flags change at engineering
          speed and are managed close to the codebase; move to a dedicated flag service when you need instant updates,
          audit history, approvals, non-engineer editing, or cross-app coordination.
        </p>

        <div className="my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">Quick Decision Guide</h2>
          <table className="mt-3 min-w-full text-sm">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/40">
                <th className="px-4 py-2 text-left">JSON file is enough when...</th>
                <th className="px-4 py-2 text-left">Use a managed flag platform when...</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-blue-200 dark:border-blue-800">
                <td className="px-4 py-2">One service or a small set of apps share the same flags</td>
                <td className="px-4 py-2">Many apps, services, or teams need the same flag state</td>
              </tr>
              <tr className="border-t border-blue-200 dark:border-blue-800">
                <td className="px-4 py-2">Changes can go through pull requests or a config deploy</td>
                <td className="px-4 py-2">You need instant flips, scheduled changes, or emergency kill switches</td>
              </tr>
              <tr className="border-t border-blue-200 dark:border-blue-800">
                <td className="px-4 py-2">Engineering owns the full lifecycle of every flag</td>
                <td className="px-4 py-2">Product, support, or operations also need to change flags safely</td>
              </tr>
              <tr className="border-t border-blue-200 dark:border-blue-800">
                <td className="px-4 py-2">PR history is enough for auditability</td>
                <td className="px-4 py-2">You need approvals, change history, metrics, or stale-flag reporting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Model flags as typed configuration, not loose booleans</h2>
        <p>
          A flat list of <code>true</code> and <code>false</code> values works for the first few toggles, but it
          breaks down quickly. Modern flag systems increasingly treat flags as typed values: boolean, string, number,
          and structured JSON objects. That makes the same system useful for release toggles, UI copy experiments,
          thresholds, and feature-specific config payloads.
        </p>
        <p>
          Even if you are keeping everything in a single JSON file, define a schema up front and include owner,
          lifetime, and default information. That makes the file safer to validate and easier to clean up later.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Example of a production-friendly JSON manifest</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "$schema": "https://example.com/schemas/feature-flags.schema.json",
  "flags": {
    "checkout_redesign": {
      "description": "Release the new checkout flow",
      "flagType": "boolean",
      "defaultValue": false,
      "kind": "release",
      "owner": "payments",
      "expiresAt": "2026-05-01",
      "clientSafe": true,
      "environments": {
        "production": {
          "enabled": true,
          "allowUserIds": ["emp_17", "emp_42"],
          "rolloutPercentage": 25,
          "stickiness": "userId"
        }
      }
    },
    "search_ranking": {
      "description": "Tune ranking without code changes",
      "flagType": "object",
      "defaultValue": {
        "algorithm": "bm25",
        "maxResults": 20,
        "minScore": 0.35
      },
      "kind": "operational",
      "owner": "search",
      "clientSafe": false
    }
  }
}`}
            </pre>
          </div>
        </div>

        <div className="my-6 rounded-lg border-l-4 border-emerald-400 bg-emerald-50 p-4 dark:bg-emerald-950/30">
          <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-200">Why this shape works</h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-emerald-900 dark:text-emerald-100">
            <li>
              <strong>Default values</strong> make evaluation safe even if parsing fails or no provider is loaded.
            </li>
            <li>
              <strong>Typed values</strong> let one flag system power both on/off switches and structured config.
            </li>
            <li>
              <strong>Owner and expiry metadata</strong> create an obvious cleanup path for temporary flags.
            </li>
            <li>
              <strong>Client-safe markers</strong> stop you from leaking internal rules or admin-only toggles.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Make percentage rollouts deterministic</h2>
        <p>
          Sticky rollout is where many homegrown JSON implementations fail. If you use <code>Math.random()</code> on
          every request, the same user can bounce in and out of the feature. Instead, hash a stable identifier such as
          <code>userId</code>, <code>sessionId</code>, or another consistent context key.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">JavaScript example: stable rollout bucketing</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`import crypto from "node:crypto";

function bucketFor(key) {
  const hex = crypto.createHash("sha256").update(key).digest("hex").slice(0, 8);
  return parseInt(hex, 16) % 100;
}

export function isFlagEnabled(flagKey, flag, context = {}) {
  const envName = context.environment ?? "production";
  const envConfig = flag.environments?.[envName];

  if (!envConfig?.enabled) {
    return flag.defaultValue;
  }

  if (envConfig.allowUserIds?.includes(context.userId)) {
    return true;
  }

  if (envConfig.rolloutPercentage == null) {
    return true;
  }

  if (!context.userId) {
    return flag.defaultValue;
  }

  const rolloutKey = \`\${flagKey}:\${context.userId}\`;
  return bucketFor(rolloutKey) < envConfig.rolloutPercentage;
}`}
            </pre>
          </div>
        </div>

        <p>
          Keep the bucketing key explicit. If you change from <code>userId</code> to <code>email</code> later, the
          rollout population changes too. That can invalidate an experiment or make a gradual rollout look unstable.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Load raw JSON on the server, not directly in the browser</h2>
        <p>
          Store the full manifest server-side, evaluate flags there when possible, and send the browser only what it
          needs. That protects internal targeting rules, keeps entitlement logic out of public JavaScript, and reduces
          the chance of leaking future features.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Server-side loading with validation and a safe fallback</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`import fs from "node:fs/promises";

let cachedFlags = null;

function assertValidManifest(value) {
  if (!value || typeof value !== "object" || !value.flags || typeof value.flags !== "object") {
    throw new Error("Invalid feature flag manifest");
  }
}

export async function loadFlags() {
  if (cachedFlags) return cachedFlags;

  const raw = await fs.readFile("./config/flags.json", "utf8");
  const parsed = JSON.parse(raw);
  assertValidManifest(parsed);

  cachedFlags = parsed.flags;
  return cachedFlags;
}

export function fallbackFlags() {
  return {
    checkout_redesign: { defaultValue: false, environments: {} }
  };
}`}
            </pre>
          </div>
        </div>

        <p>
          If you go beyond a static file, keep the same contract: validate before promoting a new version, cache
          aggressively, and refresh on explicit change events instead of fetching on every request.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">What to put in the JSON, and what not to</h2>
        <div className="my-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Good fit for JSON flags</th>
                <th className="px-4 py-2 text-left">Poor fit for JSON flags</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Release toggles and kill switches</td>
                <td className="px-4 py-2">Secrets, API keys, or anything security-sensitive</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Experiment variants and copy or layout choices</td>
                <td className="px-4 py-2">Authorization logic that only exists client-side</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Thresholds, limits, and small config payloads</td>
                <td className="px-4 py-2">Large documents or frequently changing operational data</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Per-environment differences and allowlists</td>
                <td className="px-4 py-2">Business rules that require heavy joins or complex workflow logic</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Treat flags as temporary assets with a lifecycle</h2>
        <p>
          One of the most useful ideas in current flag tooling is separating flags by purpose. Release and experiment
          flags are usually temporary and should be removed once the result is known. Operational kill switches may
          stay longer. Permission flags sometimes become permanent because they model product tiers.
        </p>
        <p>
          Your JSON should reflect that reality. Add a <code>kind</code> field, give temporary flags an
          <code>expiresAt</code> date, and review stale entries every sprint. If a flag has been permanently on for a
          month or two, the better fix is normally to delete the branching code.
        </p>

        <div className="my-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/30">
          <h3 className="text-lg font-medium text-yellow-900 dark:text-yellow-200">Default-first rule</h3>
          <p className="mt-2 text-yellow-900 dark:text-yellow-100">
            Every flag evaluation should have a hardcoded fallback value in application code. If parsing fails, the
            file is missing, the cache is stale, or a provider is unavailable, the app should still choose a known
            behavior.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Common mistakes when using JSON for feature toggles</h2>
        <div className="my-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Mistake</th>
                <th className="px-4 py-2 text-left">Better approach</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Random rollout on each request</td>
                <td className="px-4 py-2">Use deterministic hashing with a stable stickiness key</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Only storing booleans</td>
                <td className="px-4 py-2">Support string, number, and object payloads where they reduce redeploys</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Sending the full flag file to the browser</td>
                <td className="px-4 py-2">Expose only evaluated or client-safe values</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">No owner, no expiry, no cleanup</td>
                <td className="px-4 py-2">Track purpose, owner, and removal date in the JSON itself</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Treating feature flags like permanent architecture</td>
                <td className="px-4 py-2">Delete temporary branches once the rollout is complete</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">When to move beyond a plain JSON file</h2>
        <p>
          A plain JSON file stops being the right answer when the missing features start outweighing the simplicity.
          The most common triggers are real-time updates, advanced targeting, audit logs, stale-flag detection,
          experimentation metrics, or the need for multiple teams to edit flags without touching the codebase.
        </p>
        <p>
          Until then, JSON is still a very solid foundation. Keep the schema explicit, make rollout decisions sticky,
          validate the document before use, expose only safe values to clients, and remove temporary flags quickly.
          That gets you most of the value of feature toggles without turning configuration into a second application.
        </p>
      </div>
    </>
  );
}
