import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Worker Implementation for Offline JSON Processing | Offline Tools",
  description:
    "Learn how to use Service Workers to cache and serve JSON data offline, enabling robust web applications with offline capabilities.",
};

export default function ServiceWorkerOfflineJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Service Worker Implementation for Offline JSON Processing</h1>

      <div className="space-y-6">
        <p>
          Building web applications that work reliably even without a stable internet connection is a key goal for
          modern development. Service Workers are a powerful browser technology that makes this possible, particularly
          for handling data like JSON. By implementing Service Workers, you can cache JSON responses, ensuring your
          application can still display or process data when the user is offline.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding Service Workers</h2>
        <p>
          Service Workers are programmable proxy servers that sit between the browser and the network. They can
          intercept network requests, manage a cache of responses, and even handle push notifications. Unlike
          traditional JavaScript, they run on a separate thread, meaning they don&apos;t block the main browser process
          and can even work when the application&apos;s page is closed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key Service Worker Characteristics:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Run in the background, independent of the web page</li>
            <li>Can intercept network requests and responses</li>
            <li>Manage a cache via the Cache Storage API</li>
            <li>Enable offline functionality</li>
            <li>Must be served over HTTPS (for security)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Use Service Workers for Offline JSON?</h2>
        <p>
          For applications that heavily rely on fetching JSON data from APIs (e.g., displaying product lists, user
          profiles, configuration data), losing the network connection can render the application unusable. Service
          Workers provide a mechanism to cache previously fetched JSON responses. When the user is offline, the Service
          Worker can intercept the fetch request and return the cached JSON instead of failing.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Benefits for Offline JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Enables access to previously viewed data offline</li>
            <li>Improves performance by serving cached data instantly</li>
            <li>Reduces reliance on network availability</li>
            <li>Provides a better user experience in flaky network conditions</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation Steps</h2>

        <h3 className="text-xl font-semibold mt-6">1. Register the Service Worker</h3>
        <p>
          The first step is to register your Service Worker file (commonly named `sw.js`) from your main web page
          script. This is typically done after the page loads, checking for browser support.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This code snippet registers the service worker file located at the root of your application.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Install and Cache Initial Assets</h3>
        <p>
          Inside your `sw.js` file, the `install` event is the perfect place to open a cache and add static assets (like
          your core HTML, CSS, JS, and maybe some initial JSON data) to it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const CACHE_NAME = 'json-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html', // Or your app's entry point
  '/styles.css',
  '/script.js',
  // Add URLs of JSON data you want to pre-cache, e.g., '/api/initial-data'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The `install` event caches essential files when the service worker is first installed.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Activate and Clean Up Old Caches</h3>
        <p>
          The `activate` event is where you handle tasks like cleaning up older versions of caches, ensuring that only
          the current version&apos;s cache is used.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">This code removes any caches that don&apos;t match the current `CACHE_NAME`.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Intercept and Cache JSON Requests</h3>
        <p>
          The core logic for offline JSON handling lives in the `fetch` event listener. Here, you intercept requests,
          check the cache, and decide how to respond based on network availability and caching strategy.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`self.addEventListener('fetch', (event) => {
  // Intercept only specific JSON API requests
  const jsonUrlPattern = /\\/api\\/.*\\.json$/; // Example: matches /api/data.json

  if (jsonUrlPattern.test(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - return response
          if (response) {
            console.log('Serving from cache:', event.request.url);
            return response;
          }

          // No cache hit - fetch from network
          console.log('Fetching from network:', event.request.url);
          return fetch(event.request)
            .then((networkResponse) => {
              // Check if we received a valid response
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and can only be consumed once. We consume the clone to cache it.
              const responseToCache = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return networkResponse;
            })
            .catch(() => {
              // Network request failed (offline)
              // You could return a fallback response here if needed, e.g., a default JSON structure
              console.log('Network fetch failed for:', event.request.url, ' - trying cache again');
              // Fallback to cache (already done by initial caches.match, but good practice to handle explicitly if no initial match)
              return caches.match(event.request); // Retry cache match in catch block
            });
        })
    );
  } else {
    // For other requests (HTML, CSS, etc.), just fetch from network
    event.respondWith(fetch(event.request));
  }
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This Service Worker attempts to serve specific JSON requests from the cache first. If not found, it fetches
            from the network, caches the successful response, and then returns it. If the network fails, it falls back
            to the cache (though the initial `caches.match` handles this for already cached items). You might refine the
            `catch` block to return a custom offline JSON response for URLs that weren&apos;t cached.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Caching Strategies for JSON</h2>
        <p>The `fetch` handler logic defines your caching strategy. Common strategies suitable for JSON include:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Cache Only:</span> Always serve from cache. Only works for pre-cached data
              or data that is never updated.
            </li>
            <li>
              <span className="font-medium">Network Only:</span> Always fetch from the network. No offline support.
            </li>
            <li>
              <span className="font-medium">Cache Falling Back to Network:</span> Try cache first. If not found, fetch
              from network. (Implemented in the example above for JSON). Good for data that doesn&apos;t change
              frequently.
            </li>
            <li>
              <span className="font-medium">Network Falling Back to Cache:</span> Try network first. If network fails,
              try cache. Good for data that needs to be up-to-date when online, but needs offline access.
            </li>
            <li>
              <span className="font-medium">Cache then Network:</span> Serve from cache immediately, then fetch from the
              network and update the page or cache with the fresh data. Useful for displaying content quickly while
              updating it in the background. Requires client-side logic to handle two responses.
            </li>
          </ul>
          <p className="mt-2 text-sm">
            Choose the strategy that best fits the update frequency and criticality of your JSON data.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Challenges and Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Cache Invalidation:</span> Knowing when and how to update cached JSON data is
            crucial. Strategies include versioning caches (`json-cache-v1`, `json-cache-v2`), using
            stale-while-revalidate (cache first, then update cache from network), or sending push notifications to
            trigger updates.
          </li>
          <li>
            <span className="font-medium">Offline Data Persistence:</span> Service Worker caching is suitable for JSON
            responses. For persistent, structured offline data (like user-generated content), consider IndexedDB
            alongside Service Workers.
          </li>
          <li>
            <span className="font-medium">Request Payloads:</span> Caching `POST`, `PUT`, or `DELETE` requests (which
            often contain JSON in the body) is more complex than caching `GET` requests. Caching `GET` responses is the
            most common and straightforward use case for offline JSON.
          </li>
          <li>
            <span className="font-medium">Debugging:</span> Debugging Service Workers can be tricky. Use browser
            developer tools (Application tab &gt; Service Workers and Cache Storage) extensively.
          </li>
          <li>
            <span className="font-medium">Scope:</span> The Service Worker&apos;s scope determines what parts of your
            origin it controls. By default, it&apos;s the directory where `sw.js` is located and its subdirectories.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing Service Workers for offline JSON processing significantly enhances the resilience and performance
          of your web application. By strategically caching JSON data and handling fetch requests, you can provide a
          smoother experience for users, regardless of their network connectivity. While there are challenges like cache
          management, the benefits of offline capabilities make Service Workers an essential tool for modern web
          development. Start by implementing a basic cache-first strategy for critical read-only JSON data and expand as
          needed.
        </p>
      </div>
    </>
  );
}
