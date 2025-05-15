import type { Metadata } from "next";
import { Rocket, Cloud, FileJson, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Progressive Web Apps for JSON Formatting | Offline Tools",
  description:
    "Learn how to build a Progressive Web App (PWA) for client-side JSON formatting, enabling offline use, fast performance, and enhanced privacy.",
};

export default function PwaJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Rocket className="w-8 h-8 text-blue-600" /> Building Progressive Web Apps for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          In today&apos;s web development landscape, providing users with fast, reliable, and engaging experiences is paramount.
          <strong>Progressive Web Apps (PWAs)</strong> offer a way to bridge the gap between web applications and native mobile apps,
          delivering capabilities like offline access, installability, and push notifications right from the browser.
        </p>
        <p>
          While often associated with complex applications, the PWA architecture is also incredibly well-suited for simple,
          utility-focused tools. A perfect example? A client-side JSON formatter. Building a JSON formatter as a PWA
          provides significant advantages over a traditional website, especially when dealing with potentially sensitive data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <FileJson className="w-7 h-7 text-green-600" /> Why a PWA for JSON Formatting?
        </h2>
        <p>
          A web-based JSON formatter typically involves pasting or typing JSON into an input field, and then some JavaScript
          parses, validates, and formats the data, displaying the result in another area. Why enhance this with PWA features?
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Offline Access:</strong> Users can access and use the formatter even without an internet connection.
            Ideal for developers working on the go, in environments with unstable networks, or while disconnected.
          </li>
          <li>
            <strong>Speed & Performance:</strong> Assets (HTML, CSS, JavaScript) are cached via a service worker, leading to
            near-instantaneous loading times on subsequent visits.
          </li>
          <li>
              <strong>Installability:</strong> Users can &quot;install&quot; the PWA to their home screen, making it launchable
              like a native application, without the browser UI clutter.
            </li>

          <li>
            <strong>Privacy & Security:</strong> Since JSON formatting is a client-side operation (using the browser&apos;s
            built-in <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.parse()</code> and
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.stringify()</code>), the user&apos;s data
            never needs to leave their browser or be sent to a server. This is a critical feature when dealing with
            confidential or sensitive JSON data.
          </li>
          <li>
            <strong>Reliability:</strong> The service worker ensures the application is available even if the network is down,
            providing a more robust experience.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Cloud className="w-7 h-7 text-blue-600" /> Key PWA Components
        </h2>
        <p>
          Transforming a static JSON formatting page into a PWA primarily involves two core components:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Web App Manifest:</strong> A JSON file providing metadata about the application,
            used by the browser to allow the app to be installed and presented to the user.
          </li>
          <li>
            <strong>Service Worker:</strong> A JavaScript file that acts as a proxy between the browser
            and the network. It can intercept network requests, cache resources, and enable offline functionality.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">The Web App Manifest (<code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">manifest.json</code>)</h3>
        <p>
          This file tells the browser how your PWA should appear and behave when installed. It&apos;s a simple
          JSON file typically located at the root of your web application.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">manifest.json</code>:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json">
              {`{
  "name": "JSON Formatter PWA",
  "short_name": "JSONFormatter",
  "description": "Client-side JSON validator and formatter that works offline.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
    // ... other icon sizes
  ]
}`}
            </code>
          </pre>
          <p className="mt-4">
            Key fields:
          </p>
          <ul className="list-disc pl-6 space-y-1 my-4">
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;name&quot;</code>: Full name of the application.</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;short_name&quot;</code>: Short name for the home screen icon.</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;description&quot;</code>: A brief description.</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;start_url&quot;</code>: The URL loaded when the app is launched.</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;display&quot;</code>: Controls the browser UI (e.g., <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;standalone&quot;</code> hides the browser address bar).</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;icons&quot;</code>: Specifies app icons for various densities.</li>
            <li><code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;theme_color&quot;</code>, <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&quot;background_color&quot;</code>: Define colors for the browser UI and splash screen.</li>
          </ul>
        </div>
        <p>
          To make the browser aware of your manifest, link it in the <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&lt;head&gt;</code> of your HTML pages:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-html">
              {`&lt;link rel="manifest" href="/manifest.json"&gt;`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">The Service Worker (<code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">sw.js</code>)</h3>
        <p>
          The service worker is where the magic of offline capabilities happens. It&apos;s a script that runs in the background, separate from the main browser thread.
          It can intercept network requests made by the page it controls. For a JSON formatter, the primary use case is caching the application&apos;s static assets.
        </p>
        <p>
          You need to register the service worker from your main application script:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}`}
            </code>
          </pre>
        </div>
        <p>
          Inside the <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">sw.js</code> file, you&apos;ll listen for events:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">install</code>: This event is fired when the service worker is first installed.
            This is where you typically cache your application&apos;s static assets.
          </li>
          <li>
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">activate</code>: Fired when the service worker becomes active. Useful for cleaning up old caches.
          </li>
          <li>
            <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">fetch</code>: Intercepts network requests. You can check if the requested resource is in the cache and serve it from there, falling back to the network if necessary (Cache-first strategy).
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">sw.js</code> (Cache-First Strategy for Static Assets):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`const CACHE_NAME = 'json-formatter-pwa-cache-v1';
const urlsToCache = [
  '/', // Cache the main page
  '/index.html', // Or your main HTML file
  '/styles.css',
  '/script.js', // Your formatting logic script
  '/manifest.json',
  // Add paths to other critical assets like icons, fonts, etc.
];

// Install event: cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve from cache if possible, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete caches not in whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});`}
            </code>
          </pre>
          <p className="mt-4">
            This conceptual service worker caches the listed <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">urlsToCache</code> during installation.
            During fetch events, it first checks if the requested resource exists in the cache. If yes, it serves the cached version immediately.
            If not, it fetches the resource from the network. The activate event ensures that older versions of the cache are removed when a new service worker is installed and activated.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Lock className="w-7 h-7 text-red-600" /> Client-Side JSON Formatting Logic
        </h2>
        <p>
          The core formatting logic remains standard JavaScript running in the browser.
          It doesn&apos;t require PWA-specific code itself, but its client-side nature is what makes the
          PWA&apos;s privacy benefits significant.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Basic JSON Formatting (Conceptual JavaScript):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-javascript">
              {`function formatJson(jsonString) {
  try {
    // Use native JSON.parse for validation and parsing
    const parsedJson = JSON.parse(jsonString);

    // Use native JSON.stringify for formatting (with indentation)
    // The third argument (2) specifies the number of spaces for indentation
    const formattedJson = JSON.stringify(parsedJson, null, 2);

    return { success: true, data: formattedJson };
  } catch (error) {
    // Return error message if parsing fails (invalid JSON)
    return { success: false, error: error.message };
  }
}

// Example Usage (in your main script.js file):
// const inputElement = document.getElementById('jsonInput');
// const outputElement = document.getElementById('jsonOutput');
// const formatButton = document.getElementById('formatButton');
// const errorMessageElement = document.getElementById('errorMessage');

// formatButton.addEventListener('click', () => {
//   const jsonInput = inputElement.value;
//   const result = formatJson(jsonInput);

//   if (result.success) {
//     outputElement.value = result.data; // Display formatted JSON
//     errorMessageElement.textContent = ''; // Clear errors
//     // Optional: Add syntax highlighting here
//   } else {
//     outputElement.value = ''; // Clear output
//     errorMessageElement.textContent = 'Error: ' + result.error; // Display error
//   }
// });`}
            </code>
          </pre>
          <p className="mt-4">
            This function demonstrates the core logic. It uses <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.parse</code>
            to validate the input (it will throw an error on invalid JSON) and convert it to a JavaScript object/array.
            Then, <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">JSON.stringify</code> is used
            with the <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">null, 2</code> arguments
            to produce a human-readable, indented string representation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Putting it All Together</h2>
        <p>
          To build your PWA JSON formatter:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Create the basic HTML structure for your input and output areas.</li>
          <li>Write the client-side JavaScript for the JSON parsing and formatting logic.</li>
          <li>Style your application with CSS.</li>
          <li>Create the <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">manifest.json</code> file at the root of your project.</li>
          <li>Create the <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">sw.js</code> file at the root of your project (or a suitable location, ensuring the correct scope).</li>
          <li>Link the manifest in your HTML <code className="bg-gray-200 rounded px-1 py-0.5 text-sm dark:bg-gray-700">&lt;head&gt;</code>.</li>
          <li>Register the service worker from your main JavaScript file after the page has loaded.</li>
          <li>Host your application on a server with HTTPS enabled (PWAs require a secure context).</li>
        </ol>
        <p>
          Once deployed, users visiting your site will be prompted by their browser to install the PWA (depending on browser heuristics and the manifest properties).
          The service worker will then handle caching, allowing the app to function even offline.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a JSON formatter as a Progressive Web App is a fantastic way to demonstrate the practical benefits of PWA technology
          for simple utility tools. It enhances the user experience through speed, reliability, and installability, while critically
          preserving user privacy by keeping data processing strictly on the client side. This pattern can be applied to many
          other browser-based tools where offline access and data privacy are desirable features.
        </p>
      </div>
    </>
  );
}
