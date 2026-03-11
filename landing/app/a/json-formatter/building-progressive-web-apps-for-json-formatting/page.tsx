import type { Metadata } from "next";
import { Rocket, Cloud, FileJson, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Progressive Web Apps for JSON Formatting | Offline Tools",
  description:
    "A practical guide to building a JSON formatter PWA with offline support, installability, manifest design, service worker caching, and privacy-first defaults.",
};

export default function PwaJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Rocket className="w-8 h-8 text-blue-600" /> Building Progressive Web Apps for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          A JSON formatter is one of the best candidates for a Progressive Web App. The interface is small, the core
          transformation runs entirely in the browser, and users often need it in low-connectivity or high-privacy
          situations. If the tool is built well, it should feel like a tiny local utility that happens to run on the
          web.
        </p>
        <p>
          The product goal is straightforward: cache the app shell, keep formatting local, and make installation a
          helpful bonus instead of the only way the tool works. A user should be able to open the formatter in a normal
          tab, install it on supported browsers, and still keep working when the network disappears.
        </p>
        <p>
          That is where many PWA articles get fuzzy. Current browsers still expect a valid manifest and HTTPS for
          installation, but install UI is browser-specific, and a service worker matters primarily because it keeps the
          formatter available offline. Designing around those realities produces a much better JSON tool than simply
          chasing an install badge.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <FileJson className="w-7 h-7 text-green-600" /> Why JSON Formatting Is a Strong PWA Use Case
        </h2>
        <p>
          Utility apps do well as PWAs when their value is immediate and their data can stay on-device. A JSON
          formatter checks both boxes.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Privacy is easy to preserve:</strong> parsing and pretty-printing can stay entirely in the browser
            with <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.parse()</code> and{" "}
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.stringify()</code>, so
            sensitive payloads do not need to hit a server.
          </li>
          <li>
            <strong>Offline behavior can be almost complete:</strong> unlike tools that depend on remote APIs, a JSON
            formatter can still validate, prettify, minify, copy, and download files without a network connection.
          </li>
          <li>
            <strong>The app shell is small:</strong> caching a single route, the JavaScript bundle, styles, manifest,
            and icons is usually enough to make repeat launches feel instant.
          </li>
          <li>
            <strong>Installability makes sense:</strong> developers often reuse a formatter many times a day, so a home
            screen or desktop shortcut is genuinely useful instead of decorative.
          </li>
          <li>
            <strong>File-based workflows fit well:</strong> drag and drop, paste from clipboard, and local file open
            all work naturally inside a browser-based utility.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Cloud className="w-7 h-7 text-blue-600" /> What Installable Means in Current Browsers
        </h2>
        <p>
          Installation is still useful, but it is not uniform. Treat it as progressive enhancement and keep the normal
          browser experience first-class.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use HTTPS in production:</strong> service workers and install-related features require a secure
            context, with <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">localhost</code>{" "}
            as the usual development exception.
          </li>
          <li>
            <strong>Ship a real manifest:</strong> browsers expect a manifest with app identity, icons, a{" "}
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">start_url</code>, and a display
            mode such as <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">standalone</code>.
          </li>
          <li>
            <strong>Add a stable manifest </strong>
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">id</code>
            <strong>:</strong> this keeps the installed app identity stable even if you later add query parameters to{" "}
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">start_url</code> for analytics
            or onboarding.
          </li>
          <li>
            <strong>Do not over-promise the prompt:</strong> Chromium browsers expose install affordances in the URL
            bar or menu, Safari uses Add to Dock on macOS and Add to Home Screen on iOS and iPadOS, and Firefox should
            not be treated as having the same install flow.
          </li>
          <li>
            <strong>A service worker is about reliability:</strong> it is still the right way to make the formatter
            launch and keep working offline, but the user benefit is availability, not the existence of a prompt.
          </li>
        </ul>
        <p>
          In other words, avoid copy that says users &quot;will be prompted to install.&quot; Say the tool is
          installable on supported browsers and remains usable in a regular tab when installation UI is absent.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          A Manifest That Avoids Identity Problems
        </h3>
        <p>
          Many examples stop at the minimum manifest fields, but a JSON formatter benefits from being explicit. A
          stable app identity and properly sized icons reduce edge cases later.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">manifest.webmanifest</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json">
              {`{
  "id": "/json-formatter",
  "name": "Offline JSON Formatter",
  "short_name": "JSON Formatter",
  "description": "Validate, prettify, and minify JSON locally in your browser.",
  "start_url": "/json-formatter",
  "scope": "/json-formatter",
  "display": "standalone",
  "display_override": ["window-controls-overlay", "standalone"],
  "background_color": "#0f172a",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}`}
            </code>
          </pre>
          <p className="mt-4">What matters here:</p>
          <ul className="list-disc pl-6 space-y-1 my-4">
            <li>
              <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;id&quot;</code> keeps
              the app identity stable across future URL changes.
            </li>
            <li>
              <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;scope&quot;</code>{" "}
              prevents installed-app navigation from unexpectedly escaping the tool area.
            </li>
            <li>
              <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">
                &quot;display_override&quot;
              </code>{" "}
              lets capable browsers use richer window chrome while falling back to{" "}
              <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;display&quot;</code>.
            </li>
            <li>
              Maskable icons help prevent awkward icon cropping on Android launchers and similar surfaces.
            </li>
          </ul>
        </div>
        <p>
          You still need to link the manifest in the document head:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-html">{`<link rel="manifest" href="/manifest.webmanifest">`}</code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Lock className="w-7 h-7 text-red-600" /> Service Worker Rules for a JSON Formatter
        </h2>
        <p>
          The biggest design rule is simple: cache the application shell, not the user&apos;s JSON. Your service worker
          should make the interface load offline, but it should not quietly persist sensitive documents unless the user
          explicitly asks for that behavior.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Cache your tool route, manifest, icons, and static assets.
          </li>
          <li>
            Avoid caching pasted payloads, uploaded files, or authenticated API responses by default.
          </li>
          <li>
            Version the cache and delete older versions during activation.
          </li>
          <li>
            Test a true offline reload, not just a warm tab that still has everything in memory.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          Register the Service Worker Early
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", {
    scope: "/json-formatter/",
  }).catch((error) => {
    console.error("Service worker registration failed", error);
  });
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Cache the Shell, Not the Data
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`const CACHE_NAME = "json-formatter-shell-v3";
const APP_SHELL = [
  "/json-formatter",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/json-formatter"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse ?? fetch(request);
    })
  );
});`}
            </code>
          </pre>
        </div>
        <p>
          That strategy keeps the formatter usable offline without treating user content as cacheable application data.
          If your build emits hashed asset names, generate the shell list at build time instead of hard-coding every
          filename by hand.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON-Specific UX Decisions That Matter</h2>
        <p>
          The formatter logic itself should stay boring. That is a good thing. Reliability, error handling, and privacy
          are more important than clever transformations.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keep formatting local:</strong> parse and re-stringify in the browser, and do not send user JSON to
            a backend unless the product clearly requires it.
          </li>
          <li>
            <strong>Protect responsiveness for large payloads:</strong> if users may paste multi-megabyte documents,
            move validation and formatting into a Web Worker so the main thread does not lock up.
          </li>
          <li>
            <strong>Make persistence opt-in:</strong> restoring the last draft can be useful, but it should be an
            explicit local feature with a visible &quot;Clear local data&quot; action.
          </li>
          <li>
            <strong>Preserve the original input on failure:</strong> when parsing fails, show the error and keep the
            user&apos;s raw text untouched so they can fix the syntax.
          </li>
          <li>
            <strong>Support real tool workflows:</strong> paste, drag and drop, open local file, copy result, and
            download output all add more value than a flashy install prompt.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Minimal Client-Side Formatter Logic:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`export function formatJson(input, indent = 2) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}`}
            </code>
          </pre>
          <p className="mt-4">
            Start here, then move the same logic into a worker if your performance testing shows the UI freezing on
            larger payloads.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Using an invalid manifest example with comments or trailing commas. The manifest is JSON, so keep it valid.
          </li>
          <li>
            Assuming every supported browser will show the same install prompt or menu item.
          </li>
          <li>
            Hard-coding a cache list that goes stale every time your build fingerprint changes.
          </li>
          <li>
            Caching or auto-saving sensitive JSON without telling the user where that data lives.
          </li>
          <li>
            Verifying only the first visit instead of testing offline reloads, updates, and cache cleanup.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Practical Launch Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>The formatter works completely client-side for its core parse, validate, prettify, and minify actions.</li>
          <li>The manifest includes a stable <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">id</code>, proper icons, a <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">start_url</code>, and a matching <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">scope</code>.</li>
          <li>HTTPS is enabled in production.</li>
          <li>The service worker caches the shell, removes outdated caches, and does not retain user JSON by default.</li>
          <li>You have tested the tool after disconnecting the network and reloading the page.</li>
          <li>You have tested at least one large JSON file so you know whether a Web Worker is necessary.</li>
          <li>Your UI text says the app is installable on supported browsers instead of promising a universal prompt.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a JSON formatter as a PWA is less about chasing native-app aesthetics and more about delivering a
          dependable local tool. Get the manifest right, use the service worker to keep the shell available offline,
          avoid storing sensitive payloads by default, and treat installation as an enhancement layered on top of a
          solid browser experience. That combination is what makes a JSON formatter genuinely useful as a Progressive Web
          App.
        </p>
      </div>
    </>
  );
}
