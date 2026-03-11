import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Worker Implementation for Offline JSON Processing | Offline Tools",
  description:
    "Build a service worker that caches JSON API responses for offline use, handles updates safely, and avoids common stale-data bugs.",
};

export default function ServiceWorkerOfflineJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Service Worker Implementation for Offline JSON Processing</h1>

      <div className="space-y-6">
        <p>
          If your app depends on JSON responses, a service worker can keep read operations working when the network
          drops. The practical pattern in 2026 is still the same: cache JSON `GET` responses, return cached data when
          fetches fail, and keep user-created offline changes in IndexedDB instead of trying to treat the Cache API as a
          database.
        </p>

        <p>
          The important constraint is architectural, not syntactic. Service workers run in a secure context, have no
          access to the DOM or `localStorage`, and may be stopped and restarted between events. That means your offline
          JSON workflow should be stateless, explicit about which requests are cacheable, and deliberate about cache
          invalidation.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What A Service Worker Should Handle</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Cache `GET` requests for JSON endpoints that users need when offline.</li>
            <li>Serve cached JSON immediately when the network is unavailable.</li>
            <li>Refresh cached responses when the network succeeds.</li>
            <li>Version caches so schema changes do not leave stale payloads behind.</li>
            <li>Leave `POST`, `PUT`, and `DELETE` flows to IndexedDB-backed queues or explicit retry UI.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pick The Right Caching Strategy</h2>
        <p>
          For JSON APIs, the best default is usually <span className="font-medium">network first, cache fallback</span>.
          Users get fresh data when online, but previously seen responses still work offline. Use other strategies only
          when the data shape and freshness requirements justify them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Network first:</span> best for profiles, dashboards, recent activity, or
              anything that should be current when a connection exists.
            </li>
            <li>
              <span className="font-medium">Cache first:</span> best for versioned reference data such as schemas,
              locale bundles, or static configuration JSON.
            </li>
            <li>
              <span className="font-medium">Stale while revalidate:</span> useful when instant rendering matters more
              than absolute freshness, such as read-heavy lists or search suggestions.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Minimal Production-Safe Implementation</h2>
        <p>
          The example below keeps the scope tight. It only intercepts `GET` requests, only caches responses that are
          actually JSON, and returns a predictable offline payload when there is no cached copy yet.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Register The Worker</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      console.log("Service worker registered", registration.scope);
    } catch (error) {
      console.error("Service worker registration failed", error);
    }
  });
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Registration must happen on HTTPS in production. `localhost` is allowed for local development.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Cache JSON With Network-First Logic</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const APP_CACHE = "app-shell-v3";
const JSON_CACHE = "json-data-v3";
const APP_SHELL = ["/", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE);
      await cache.addAll(APP_SHELL);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([APP_CACHE, JSON_CACHE]);
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map((cacheName) => {
          if (!keep.has(cacheName)) {
            return caches.delete(cacheName);
          }

          return Promise.resolve(false);
        })
      );

      await self.clients.claim();
    })()
  );
});

function isOfflineJsonRequest(request) {
  if (request.method !== "GET") {
    return false;
  }

  const url = new URL(request.url);

  return url.origin === self.location.origin && url.pathname.startsWith("/api/");
}

async function networkFirstJson(request) {
  const cache = await caches.open(JSON_CACHE);

  try {
    const response = await fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (response.ok && contentType.includes("application/json")) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    return new Response(
      JSON.stringify({
        offline: true,
        message: "No cached JSON is available for this request yet.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Offline-Fallback": "true",
        },
      }
    );
  }
}

self.addEventListener("fetch", (event) => {
  if (isOfflineJsonRequest(event.request)) {
    event.respondWith(networkFirstJson(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(APP_CACHE);
        return cache.match("/offline.html");
      })
    );
  }
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This avoids a common mistake in older snippets: rejecting valid JSON responses just because they are CORS
            responses instead of `basic` same-origin responses.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why This Pattern Holds Up Better</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">It only caches `GET` requests.</span> Cache Storage is a good fit for
            response reuse, not for mutating request workflows.
          </li>
          <li>
            <span className="font-medium">It verifies content type.</span> A path like `/api/` is not enough if the
            backend can also return HTML error pages or redirects.
          </li>
          <li>
            <span className="font-medium">It versions caches explicitly.</span> When your JSON schema changes, bump the
            cache name and remove the old entries in `activate`.
          </li>
          <li>
            <span className="font-medium">It gives clients a predictable fallback.</span> Returning a defined offline
            JSON object is easier to handle than throwing an opaque network error.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Offline Writes Need A Different Design</h2>
        <p>
          Service workers are excellent for cached reads, but they are not enough for durable offline writes. If users
          can edit JSON, create records, or submit forms while offline, store those pending actions in IndexedDB and
          replay them when connectivity returns. Background Sync can help in some browsers, but it is not universal
          enough to be your only retry path, so a visible retry state in the app is still the safer choice.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Failure Modes</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">The worker registers, but fetches are not intercepted:</span> the first page
              load is often not controlled yet. Reload once, or use `skipWaiting()` and `clients.claim()` carefully.
            </li>
            <li>
              <span className="font-medium">The worker never controls the target route:</span> scope is path-based. A
              worker at `/app/sw.js` will not control `/`.
            </li>
            <li>
              <span className="font-medium">Offline responses never match:</span> cache keys are exact. Query strings,
              auth tokens in URLs, and locale parameters create different entries.
            </li>
            <li>
              <span className="font-medium">Data stays stale after deploy:</span> browsers update service workers on
              navigation and other lifecycle checks, but old clients can keep the previous worker alive. Bump cache
              names when response formats change.
            </li>
            <li>
              <span className="font-medium">Critical data disappears:</span> cached responses are storage-managed by the
              browser and can be evicted under pressure. Keep essential offline state in IndexedDB as well.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Debugging Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Check the browser&apos;s Application panel for the active worker, scope, and cache contents.</li>
          <li>Test with offline mode enabled in DevTools instead of only disconnecting Wi-Fi.</li>
          <li>Log cache hits, network hits, and fallback responses so stale-data bugs are obvious.</li>
          <li>Verify that your API returns proper CORS headers if the JSON comes from a different origin.</li>
          <li>Keep offline responses structurally close to live responses so UI code does not fork unnecessarily.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          A good service worker implementation for offline JSON processing is intentionally narrow: cache the read
          requests that matter, choose a freshness strategy per endpoint, and treat offline writes as a separate storage
          problem. If you do that, users can keep reading and processing JSON even when the connection disappears,
          without turning your cache layer into an unpredictable source of stale data.
        </p>
      </div>
    </>
  );
}
