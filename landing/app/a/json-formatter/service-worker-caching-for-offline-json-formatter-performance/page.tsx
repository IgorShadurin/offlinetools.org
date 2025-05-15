import type { Metadata } from "next";
import {
  CloudOff,
  Zap,
  Rocket,
  Box,
  Network,
  RefreshCcw,
  BatteryFull,
  CheckCheck,
  ShieldCheck,
  Code,
  FolderOpen,
  Waves
} from "lucide-react";

export const metadata: Metadata = {
  title: "Service Worker Caching for Offline JSON Formatter Performance | Offline Tools",
  description:
    "Discover how Service Workers and strategic caching can dramatically improve the performance and offline capability of client-side web tools like JSON formatters.",
};

export default function ServiceWorkerCachingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Rocket className="mr-3 h-8 w-8 text-blue-600" /> Service Worker Caching for Offline JSON Formatter Performance
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          Client-side web tools, such as online JSON formatters, are invaluable for developers. They allow complex operations directly in the browser without sending sensitive data to a server. However, their performance and availability can be impacted by network conditions. This is where <strong>Service Workers</strong> come into play, offering powerful capabilities for caching assets and enabling offline experiences.
        </p>
        <p>
          For a tool like a JSON formatter, while the actual formatting performance depends heavily on the client-side JavaScript engine and algorithm handling the input, the <em>loading performance</em> and <em>availability</em> of the tool itself are significantly enhanced by Service Workers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CloudOff className="mr-2 h-6 w-6 text-gray-600" /> What are Service Workers?
        </h2>
        <p>
          Service Workers are specialized JavaScript files that act as a programmable proxy between the browser and the network. They run in the background, separate from the main browser thread, and can intercept network requests, manage a cache of responses, and deliver assets even when the user is offline.
        </p>
        <p>
          They are a core technology behind Progressive Web Apps (PWAs) and enable features like offline support, push notifications, and background synchronization. For a client-side tool, their primary benefit is caching the application shell.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Box className="mr-2 h-6 w-6 text-green-600" /> Caching Strategies for Performance
        </h2>
        <p>
          Strategic caching is the key to leveraging Service Workers effectively. Different assets (HTML, CSS, JS, images, fonts, API responses) benefit from different strategies:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Box className="mr-2 h-5 w-5" /> Cache Only
        </h3>
        <p>
          Serve the response directly from the cache. Never go to the network. Fastest for cached items but doesn&apos;t allow updates.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Service Worker Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// sw.js (Simplified Example)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If response is in cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch from network (fallback, though 'Cache Only' typically wouldn't)
        // A pure Cache Only strategy would likely throw an error here if not found.
        return fetch(event.request);
      })
  );
});`}
            </pre>
          </div>
        </div>
        <p>
          *Use Case:* Very static assets like third-party library files from a CDN that rarely change, or application icons.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Network className="mr-2 h-5 w-5" /> Network Only
        </h3>
        <p>
          Always fetch from the network. No caching involved. Not useful for offline or performance benefits related to caching.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Service Worker Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// sw.js (Simplified Example)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // Always go to the network
  );
});`}
            </pre>
          </div>
        </div>
        <p>
          *Use Case:* Non-GET requests (POST, PUT, DELETE) or resources that absolutely must be the freshest version and offline availability is not a concern (e.g., API calls for user-specific dynamic data - though a formatter is usually client-side).
        </p>


        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Box className="mr-2 h-5 w-5" /> Cache, falling back to Network
        </h3>
        <p>
          Try to get the resource from the cache first. If it's not in the cache, then go to the network. This provides offline support and faster loads for cached items.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Service Worker Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// sw.js (Simplified Example)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cache match if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});`}
            </pre>
          </div>
        </div>
        <p>
          *Use Case:* Application shell assets (HTML, main CSS/JS) for basic offline access and fast initial loads.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Network className="mr-2 h-5 w-5" /> Network, falling back to Cache
        </h3>
        <p>
          Attempt to fetch the resource from the network first. If the network request fails (e.g., offline), fall back to the cache. Ensures users get the latest version when online but provides offline access.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Service Worker Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// sw.js (Simplified Example)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // If network fails, try the cache
        return caches.match(event.request);
      })
  );
});`}
            </pre>
          </div>
        </div>
        <p>
          *Use Case:* Resources that should be fresh when possible, but where an older cached version is acceptable if offline. Less common for the main app shell compared to the previous strategy.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <RefreshCcw className="mr-2 h-5 w-5" /> Cache then Network (Stale-While-Revalidate)
        </h3>
        <p>
          Immediately respond with the cached version if available ("stale"), while simultaneously fetching the latest version from the network in the background ("revalidate") to update the cache for the next request. Provides excellent performance and keeps content relatively fresh over time.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Service Worker Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// sw.js (Simplified Example)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('my-app-cache-v1').then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      const networkPromise = fetch(event.request).then((networkResponse) => {
        // Try to cache the new response
        if (networkResponse.ok) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, return cached if available, otherwise undefined
        return cachedResponse; // This relies on the initial check below
      });

      // Return cached response immediately if available
      if (cachedResponse) {
        return cachedResponse;
      } else {
        // If not in cache, wait for the network response
        return networkPromise;
      }
    })
  );
});`}
            </pre>
          </div>
        </div>
        <p>
          *Use Case:* The ideal strategy for the core "application shell" (HTML, main CSS/JS, dependencies). It provides the fastest possible user experience on subsequent visits (from cache) while ensuring updates are eventually loaded and cached for future use.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Waves className="mr-2 h-6 w-6 text-blue-600" /> The Service Worker Lifecycle
        </h2>
        <p>
          Understanding the lifecycle is crucial for managing updates and cache versions:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Registration:</strong> The main page registers the service worker using `navigator.serviceWorker.register(&apos;/sw.js&apos;)`.
          </li>
          <li>
            <strong>Installation (`install` event):</strong> The browser downloads and parses the `sw.js` file. Inside the `install` event listener, you typically pre-cache essential assets (the app shell) using `event.waitUntil(cache.addAll([...]))`. A new version of the service worker will install alongside the old one.
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium">Install Event Example:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre className="whitespace-pre-wrap">
                  {`// sw.js (Simplified Example)
const CACHE_NAME = 'json-formatter-cache-v1';
const urlsToCache = [
  '/', // The root page
  '/index.html', // Or the main entry point
  '/styles/main.css',
  '/scripts/app.js',
  '/scripts/formatter-library.js',
  // Add other static assets like fonts, icons, etc.
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Waiting:</strong> The new service worker enters a waiting state until all tabs/clients controlled by the old service worker are closed.
          </li>
          <li>
            <strong>Activation (`activate` event):</strong> The old service worker is terminated, and the new one takes control. This is the ideal place to clean up old caches (e.g., delete caches from previous versions).
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium">Activate Event Example:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre className="whitespace-pre-wrap">
                  {`// sw.js (Simplified Example)
const CACHE_NAME = 'json-formatter-cache-v1'; // Make sure this matches the install event

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
  // Take control of clients immediately (optional but common)
  return self.clients.claim();
});`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Fetch (`fetch` event):</strong> Once activated, the service worker intercepts network requests from clients it controls. This is where you implement the chosen caching strategies using `event.respondWith()`.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 h-6 w-6 text-purple-600" /> Registering the Service Worker
        </h2>
        <p>
          You register the service worker in your main application&apos;s JavaScript code, typically after the page has loaded.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Main Application Script (e.g., `app.js`):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`// app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}`}
            </pre>
          </div>
        </div>
        <p>
          The Service Worker file (`sw.js`) must be hosted at the root of your application or in a directory that defines its scope. A service worker at `/sw.js` has a scope covering the entire origin (e.g., `https://your-app.com/`). A service worker at `/tools/sw.js` would typically only control pages within the `/tools/` directory.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="mr-2 h-6 w-6 text-yellow-600" /> Impact on JSON Formatter Performance & Availability
        </h2>
        <p>
          While the Service Worker doesn&apos;t speed up the act of parsing and formatting JSON itself (that&apos;s CPU-bound client-side JS), it drastically improves:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center">
            <Rocket className="mr-2 h-5 w-5 text-blue-500" /> <strong>Loading Speed:</strong> Subsequent visits can load the entire application shell directly from the cache, bypassing the network. This makes the tool appear almost instantly available.
          </li>
          <li className="flex items-center">
            <CloudOff className="mr-2 h-5 w-5 text-gray-500" /> <strong>Offline Availability:</strong> By caching the necessary HTML, CSS, and JavaScript files (including the formatting library), the tool remains fully functional even when the user has no internet connection. The user can load the page and format JSON offline.
          </li>
          <li className="flex items-center">
            <BatteryFull className="mr-2 h-5 w-5 text-green-500" /> <strong>Reduced Bandwidth:</strong> Less data is transferred over the network on subsequent loads, saving bandwidth for both the user and the server.
          </li>
          <li className="flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-teal-500" /> <strong>Resilience:</strong> The tool is less susceptible to flaky network conditions or server outages once the service worker and app shell are cached.
          </li>
        </ul>
        <p>
          It&apos;s important to note that the Service Worker won&apos;t cache the user&apos;s input JSON or the formatted output. That data lives in the browser&apos;s memory or potentially local storage, which is separate from the Service Worker cache API.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-2 h-6 w-6 text-green-600" /> Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Cache Versioning:</strong> Always use a cache name with a version number (`my-app-cache-v1`, `my-app-cache-v2`). Increment this version number whenever you update your app shell assets (HTML, CSS, JS). This triggers the Service Worker update process and allows the `activate` event to clean up old caches.
          </li>
          <li>
            <strong>Clean Up Old Caches:</strong> Implement cache cleanup in the `activate` event listener to prevent users&apos; browsers from storing multiple versions of your app&apos;s assets unnecessarily.
          </li>
          <li>
            <strong>Scope:</strong> Be mindful of the service worker&apos;s scope. Place `sw.js` at the highest level directory from which it needs to intercept requests.
          </li>
          <li>
            <strong>HTTPS:</strong> Service workers only work over HTTPS (or localhost) for security reasons.
          </li>
          <li>
            <strong>Avoid Caching User Data:</strong> Do not use the Service Worker cache for sensitive user data or dynamic content that isn&apos;t part of the application shell.
          </li>
          <li>
            <strong>Development vs. Production:</strong> Be aware that caching can make local development tricky as changes might not appear immediately. Browser developer tools offer ways to bypass service workers for debugging.
          </li>
          <li>
            <strong>Error Handling:</strong> Include error handling in your fetch listeners (as shown in "Network, falling back to Cache") to gracefully handle network failures.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FolderOpen className="mr-2 h-6 w-6 text-yellow-600" /> Conclusion
        </h2>
        <p>
          Integrating Service Workers with a client-side JSON formatter significantly elevates the user experience. While it doesn&apos;t change the speed of the formatting algorithm itself, it ensures the tool loads rapidly and is accessible even in offline scenarios, making it a reliable utility regardless of network conditions. By implementing strategic caching, particularly the Stale-While-Revalidate strategy for the application shell, developers can build performant and resilient web tools.
        </p>
      </div>
    </>
  );
}
