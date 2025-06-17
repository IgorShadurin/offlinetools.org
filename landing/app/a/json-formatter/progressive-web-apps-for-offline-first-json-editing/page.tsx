import type { Metadata } from "next";
import {
  CloudOff,
  CloudCog, // Changed from CloudSync to CloudCog
  Database,
  FileJson,
  TabletSmartphone,
  Network,
  CheckCheck,
  Pen,
  Boxes,
  Anchor,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PWAs for Offline-First JSON Editing | Offline Tools",
  description: "Explore how to build Progressive Web Apps that prioritize offline functionality for editing JSON data.",
};

export default function PwaOfflineJsonEditorArticle() {
  return (
    <article className="container mx-auto px-4 py-8 space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Progressive Web Apps for Offline-First JSON Editing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Building robust web applications that work seamlessly, even without an internet connection.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <TabletSmartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span>What are Progressive Web Apps (PWAs)?</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Progressive Web Apps (PWAs) are a type of application delivered through the web, built using common web
          technologies like HTML, CSS, and JavaScript. They aim to combine the best of the web and mobile apps,
          providing features like offline access, push notifications, and installability on user devices, all from a
          single codebase accessible via a URL.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          The "progressive" aspect means they work for any user, regardless of browser choice or network connectivity,
          but they gain enhanced capabilities when used with modern browsers that support PWA features. Key components
          enabling these features include:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Service Workers:</strong> Scripts that run in the background, separate from the web page,
            intercepting network requests, caching assets, and enabling offline functionality and background sync.
          </li>
          <li>
            <strong>Web App Manifest:</strong> A JSON file that provides metadata about the web application (like name,
            icons, start URL, display mode) to enable installability and control its appearance when launched from the
            home screen.
          </li>
          <li>
            <strong>HTTPS:</strong> Essential for security and required for Service Workers to function, ensuring the
            connection between the user and the server is secure.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <CloudOff className="w-8 h-8 text-red-600 dark:text-red-400" />
          <span>Understanding Offline-First</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Offline-First is a design paradigm where the application is built assuming the user will spend most or all of
          their time offline. Data is stored locally on the device, and the user interface interacts directly with this
          local data. Synchronization with a remote server happens asynchronously in the background whenever a network
          connection is available.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">This approach offers several advantages:</p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Reliability:</strong> The app remains usable regardless of network conditions (no network, slow
            network, flaky network).
          </li>
          <li>
            <strong>Performance:</strong> Reading and writing to local storage is significantly faster than making
            network requests.
          </li>
          <li>
            <strong>Responsiveness:</strong> UI updates can happen immediately based on local data, providing a smooth
            user experience.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <FileJson className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <span>The Use Case: Offline JSON Editing</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Consider an application where users need to view and edit structured configuration files, notes, lists, or
          documents stored in JSON format. Examples include:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>Editing project settings or manifests (like `package.json` or similar custom formats).</li>
          <li>Managing structured notes or journal entries.</li>
          <li>Editing simple databases or datasets stored as JSON arrays.</li>
          <li>Configuring IoT devices or local software via a web interface.</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          For these use cases, ensuring the user can access and modify the JSON data even when disconnected is crucial.
          An offline-first PWA is an ideal solution.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
          <span>Technical Implementation: Storage & Sync</span>
        </h2>

        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Boxes className="w-6 h-6" />
          <span>Local Data Storage (IndexedDB)</span>
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          For storing JSON data client-side,{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            IndexedDB
          </a>{" "}
          is the most suitable Web API. It&apos;s a low-level API for client-side storage of significant amounts of
          structured data, including files/blobs. Unlike Local Storage, which is limited and synchronous, IndexedDB is
          asynchronous and works with object stores, making it perfect for storing multiple JSON documents or complex
          nested data.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          A typical IndexedDB setup involves opening a database, creating object stores (analogous to tables), and
          performing operations (add, put, get, delete) within transactions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h4 className="text-xl font-medium mb-3">Conceptual IndexedDB Interaction:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`// Pseudocode / Conceptual JavaScript
function openDatabase(): Promise<IDBDatabase> &#x7b;
  return new Promise((resolve, reject) => &#x7b;
    const request = indexedDB.open('json_editor_db', 1); // DB name, version

    request.onupgradeneeded = (event) => &#x7b;
      const db = (event.target as any).result;
      // Create an object store to hold JSON documents
      // KeyPath could be an 'id' property within the JSON objects
      db.createObjectStore('json_documents', &#x7b; keyPath: 'id' &#x7d;);
      console.log('IndexedDB upgrade complete');
    &#x7d;;

    request.onsuccess = (event) => &#x7b;
      resolve((event.target as any).result);
      console.log('IndexedDB opened successfully');
    &#x7d;;

    request.onerror = (event) => &#x7b;
      console.error('IndexedDB error:', (event.target as any).error);
      reject((event.target as any).error);
    &#x7d;;
  &#x7d;);
&#x7d;

async function saveJsonDocument(document: any): Promise<void> &#x7b;
  const db = await openDatabase();
  const transaction = db.transaction('json_documents', 'readwrite');
  const store = transaction.objectStore('json_documents');

  return new Promise((resolve, reject) => &#x7b;
    const request = store.put(document); // Use put for add/update

    request.onsuccess = () => &#x7b;
      console.log('Document saved to IndexedDB');
      resolve();
    &#x7d;;

    request.onerror = (event) => &#x7b;
      console.error('Error saving document:', (event.target as any).error);
      reject((event.target as any).error);
    &#x7d;;
  &#x7d;);
&#x7d;

async function getJsonDocument(id: string): Promise<any | undefined> &#x7b;
  const db = await openDatabase();
  const transaction = db.transaction('json_documents', 'readonly');
  const store = transaction.objectStore('json_documents');

  return new Promise((resolve, reject) => &#x7b;
    const request = store.get(id);

    request.onsuccess = (event) => &#x7b;
      resolve((event.target as any).result);
    &#x7d;;

    request.onerror = (event) => &#x7b;
      console.error('Error getting document:', (event.target as any).error);
      reject((event.target as any).error);
    &#x7d;;
  &#x7d;);
&#x7d;

// Remember to close the database connection when not actively using it for long periods,
// though browsers often manage this if not explicitly closed.
// db.close();
`}
          </pre>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Note: IndexedDB is asynchronous and uses a request-based API. Libraries like{" "}
            <a
              href="https://github.com/jakearchibald/idb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              idb
            </a>{" "}
            or{" "}
            <a
              href="https://dexie.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Dexie.js
            </a>{" "}
            can provide a more developer-friendly Promise or ORM-like interface.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <CloudCog className="w-6 h-6" />
          {/* Changed from CloudSync to CloudCog */}
          <span>Synchronization Strategy</span>
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is often the most complex part of an offline-first application. When the user comes back online, local
          changes need to be synced with the server, and server changes need to be pulled down. Potential strategies
          include:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Last Write Wins:</strong> The simplest approach. The most recent version (based on a timestamp) of a
            document overwrites older versions. This can lead to data loss if multiple users edit the same document
            offline simultaneously.
          </li>
          <li>
            <strong>Operational Transformation (OT):</strong> Records and applies individual editing operations (like
            "insert character 'A' at position 5"). This allows merging concurrent edits but is complex to implement,
            especially for structured data like JSON.
          </li>
          <li>
            <strong>Conflict Resolution:</strong> Detects conflicts (when the same data point is changed differently
            offline and on the server) and either:
            <ul className="list-circle pl-8 space-y-2 mt-1 text-base">
              <li>Automatically merges changes (if possible).</li>
              <li>Flags conflicts and asks the user to resolve them.</li>
            </ul>
          </li>
          <li>
            <strong>Event Sourcing / CRDTs (Conflict-free Replicated Data Types):</strong> More advanced techniques
            designed specifically for distributed systems and offline-first scenarios to make merging easier and
            conflict-free.
          </li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          For a simple JSON editor with a single user or infrequent conflicts, "Last Write Wins" with timestamps might
          suffice. For collaborative or more complex scenarios, conflict resolution is necessary.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h4 className="text-xl font-medium mb-3">Conceptual Sync Logic:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`// Pseudocode / Conceptual JavaScript in a Service Worker or main thread
async function syncData(): Promise<void> &#x7b;
  if (!navigator.onLine) &#x7b;
    console.log('Offline, cannot sync.');
    return;
  &#x7d;

  console.log('Online, attempting sync...');
  const db = await openDatabase(); // Open IndexedDB
  const transaction = db.transaction('json_documents', 'readwrite');
  const store = transaction.objectStore('json_documents');

  // --- Step 1: Push Local Changes to Server ---
  // Assume documents in IndexedDB have a 'status' field: 'synced', 'pending_sync', 'conflicted'
  const pendingChangesRequest = store.getAll(); // Get all documents (or just pending)

  pendingChangesRequest.onsuccess = async (event) => &#x7b;
    const documentsToSync = (event.target as any).result.filter(doc => doc.status === 'pending_sync');

    for (const doc of documentsToSync) &#x7b;
      try &#x7b;
        // Send document to server API
        const response = await fetch('/api/sync-document', &#x7b;
          method: 'POST', // Or PUT/PATCH depending on API
          headers: &#x7b; 'Content-Type': 'application/json' &#x7d;,
          body: JSON.stringify(doc) // Send the local version
        &#x7d;);

        if (response.ok) &#x7b;
          // Update local status to synced
          doc.status = 'synced';
          const updateTransaction = db.transaction('json_documents', 'readwrite');
          updateTransaction.objectStore('json_documents').put(doc); // Update in DB
          console.log(\`Synced document &#x7b;doc.id&#x7d;\`);
        &#x7d; else &#x7b;
          // Handle server errors or potential conflicts reported by server
          const errorData = await response.json();
          console.error(\`Sync failed for &#x7b;doc.id&#x7d;:\`, errorData);
          // Implement conflict handling: e.g., update status to 'conflicted'
          doc.status = 'conflicted';
          const updateTransaction = db.transaction('json_documents', 'readwrite');
          updateTransaction.objectStore('json_documents').put(doc);
        &#x7d;
      &#x7d; catch (error) &#x7b;
        console.error(\`Network error during sync for &#x7b;doc.id&#x7d;:\`, error);
        // Keep status as 'pending_sync', retry later
      &#x7d;
    &#x7d;

    // --- Step 2: Pull Server Changes ---
    // Fetch changes from server since last sync timestamp (requires server-side tracking)
    try &#x7b;
        const lastSync = localStorage.getItem('last_sync_timestamp') || '0';
        const serverResponse = await fetch(\`/api/get-changes?since=&#x7b;lastSync&#x7d;\`);
        if (serverResponse.ok) &#x7b;
            const serverChanges = await serverResponse.json(); // Array of server documents/changes

            const pullTransaction = db.transaction('json_documents', 'readwrite');
            const pullStore = pullTransaction.objectStore('json_documents');

            for (const serverDoc of serverChanges) &#x7b;
                const localDocRequest = pullStore.get(serverDoc.id);
                localDocRequest.onsuccess = (event) => &#x7b;
                    const localDoc = (event.target as any).result;

                    if (!localDoc || localDoc.status === 'synced') &#x7b;
                        // No local version or local version was already synced,
                        // simply apply the server version.
                        pullStore.put(serverDoc);
                        console.log(\`Pulled and applied server changes for &#x7b;serverDoc.id&#x7d;\`);
                    &#x7d; else if (localDoc.status === 'pending_sync') &#x7b;
                        // Local changes are pending sync, and server has a newer version.
                        // This is a conflict. Handle according to strategy.
                        console.warn(\`Conflict detected for &#x7b;serverDoc.id&#x7d;\`);
                        // For simplicity (Last Write Wins assumption for example):
                        // Compare timestamps, use the newest or mark as conflicted
                         if (serverDoc.timestamp > localDoc.timestamp) &#x7b; // Requires server/client timestamps
                             pullStore.put(serverDoc); // Server version wins
                             console.log(\`Server version won conflict for &#x7b;serverDoc.id&#x7d;\`);
                         &#x7d; else &#x7b;
                            // Local version is newer (or equal), server should handle on push.
                            // Mark local as potential conflict if not using timestamp wins server-side.
                            // Or simply do nothing, rely on push handling the conflict.
                            // For this example, we assume push handles it or local is newer.
                            console.log(\`Local version is newer for &#x7b;serverDoc.id&#x7d;, will sync later.\`);
                         &#x7d;
                    &#x7d;
                &#x7d;;
                localDocRequest.onerror = (event) => &#x7b;
                    console.error('Error getting local doc during pull:', (event.target as any).error);
                &#x7d;;
            &#x7d;
            localStorage.setItem('last_sync_timestamp', Date.now().toString()); // Update last sync time
            console.log('Pulled server changes.');
        &#x7d; else &#x7b;
            console.error('Failed to pull server changes:', await serverResponse.text());
        &#x7d;
    &#x7d; catch (error) &#x7b;
        console.error('Network error during pull:', error);
    &#x7d;

    console.log('Sync process finished.');
  &#x7d;;

  pendingChangesRequest.onerror = (event) => &#x7b;
    console.error('Error reading local documents for sync:', (event.target as any).error);
  &#x7d;;
&#x7d;

// Trigger sync when online status changes or periodically
// window.addEventListener('online', syncData);
// setInterval(syncData, 60000); // Optional: periodic sync

// Example usage when data is saved/edited:
// Assume 'editedDocument' is the updated JSON object
// editedDocument.status = 'pending_sync';
// editedDocument.timestamp = Date.now(); // Add/update timestamp
// saveJsonDocument(editedDocument).then(() => &#x7b;
//   syncData(); // Attempt sync after saving
// &#x7d;);
`}
          </pre>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            This conceptual code illustrates the push-then-pull flow. Real-world sync requires careful handling of
            timestamps, versions, deleted items, and robust conflict resolution based on the chosen strategy. Service
            Workers with the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Background Sync API
            </a>{" "}
            (though{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Periodic_Background_Sync_API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Periodic Background Sync
            </a>{" "}
            is experimental/limited) are ideal for performing these operations even when the app is closed.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Network className="w-6 h-6" />
          <span>Service Workers</span>
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Service Workers are the backbone of PWA offline capabilities. They act as a proxy between the browser and the
          network. For an offline-first JSON editor, a Service Worker would:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Cache App Shell:</strong> Store the core HTML, CSS, and JavaScript needed to run the application
            interface using the Cache API.
          </li>
          <li>
            <strong>Cache Data:</strong> Potentially cache frequently accessed JSON data or responses from sync
            endpoints.
          </li>
          <li>
            <strong>Intercept Requests:</strong> Serve cached responses when offline or on slow networks. For API
            requests related to data, it might check IndexedDB first, or queue requests for later sync.
          </li>
          <li>
            <strong>Handle Background Sync:</strong> Listen for the `sync` event (triggered by the Background Sync API
            when network is available) to initiate the synchronization process described above.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h4 className="text-xl font-medium mb-3">
            Conceptual Service Worker Registration & Basic Fetch Interception:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`// Pseudocode / Conceptual JavaScript in your main app file (e.g., index.tsx)
if ('serviceWorker' in navigator) &#x7b;
  window.addEventListener('load', () => &#x7b;
    navigator.serviceWorker.register('/service-worker.js') // Path to your service worker file
      .then(registration => &#x7b;
        console.log('Service Worker registered with scope:', registration.scope);

        // Optional: Request a background sync registration
        // if ('SyncManager' in window) &#x7b;
        //   registration.sync.register('sync-json-data')
        //     .then(() => console.log('Background sync registered'))
        //     .catch(err => console.error('Background sync registration failed:', err));
        // &#x7d;
      &#x7d;)
      .catch(error => &#x7b;
        console.error('Service Worker registration failed:', error);
      &#x7d;);
  &#x7d;);
&#x7d;

// Pseudocode / Conceptual JavaScript in your service-worker.js file
const CACHE_NAME = 'json-editor-cache-v1';
const urlsToCache = [
  '/', // Your app's entry point
  '/index.html', // Or equivalent
  '/styles.css', // Your app's CSS
  '/bundle.js'   // Your app's JavaScript bundle
  // Add other critical assets
];

self.addEventListener('install', (event: any) => &#x7b;
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => &#x7b;
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      &#x7d;)
  );
&#x7d;);

self.addEventListener('fetch', (event: any) => &#x7b;
  // Try to serve from cache first
  event.respondWith(
    caches.match(event.request)
      .then(response => &#x7b;
        // Cache hit - return response
        if (response) &#x7b;
          console.log('Serving from cache:', event.request.url);
          return response;
        &#x7d;
        // No cache hit - fetch from network
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(networkResponse => &#x7b;
            // Optional: Cache successful responses, but be careful with dynamic data
            // For GET requests not related to sync APIs, you might cache them
            // const clonedResponse = networkResponse.clone();
            // caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
            return networkResponse;
          &#x7d;)
          .catch(() => &#x7b;
             // Network failed - provide a fallback or offline page
             if (event.request.mode === 'navigate') &#x7b;
                 // Return offline page for navigation requests
                 return caches.match('/offline.html'); // You need an offline.html page
             &#x7d;
             // For other requests (e.g., API), might throw or return a specific error response
             throw new Error('Network request failed and no cache match.');
          &#x7d;);
      &#x7d;)
  );
&#x7d;);

// Conceptual Sync event listener (requires Background Sync API registration from client)
// self.addEventListener('sync', (event: any) => &#x7b;
//   if (event.tag === 'sync-json-data') &#x7b;
//     console.log('Service Worker received sync event:', event.tag);
//     event.waitUntil(syncData()); // Call the sync logic implemented elsewhere
//   &#x7d;
// &#x7d;);

self.addEventListener('activate', (event: any) => &#x7b;
  console.log('Service Worker activating...');
  // Optional: Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => &#x7b;
      return Promise.all(
        cacheNames.map(cacheName => &#x7b;
          if (cacheName !== CACHE_NAME) &#x7b;
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          &#x7d;
          return null; // Or Promise.resolve()
        &#x7d;).filter(Boolean) // Filter out nulls
      );
    &#x7d;).then(() => self.clients.claim()) // Take control of clients
  );
&#x7d;);
`}
          </pre>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            This is a simplified example. A production Service Worker needs more sophisticated caching strategies (e.g.,
            network falling back to cache, cache then network) and careful handling of API requests vs. asset requests.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Pen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <span>Building the Offline-First UI/UX</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          The user interface for an offline-first app needs to be designed with potential network issues in mind.
        </p>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Immediate Feedback:</strong> Actions like saving should update the UI instantly by writing to
            IndexedDB, without waiting for a server response.
          </li>
          <li>
            <strong>Indicate Sync Status:</strong> Show the user whether the app is online/offline and if there are
            pending changes or conflicts. A simple status indicator can help manage user expectations.
          </li>
          <li>
            <strong>Conflict Resolution UI:</strong> If using a conflict resolution strategy, provide a clear interface
            for the user to review conflicting versions and choose which changes to keep.
          </li>
          <li>
            <strong>Handle Initial Load:</strong> Ensure the app shell loads instantly from the Service Worker cache,
            providing a fast "first paint" even offline. Data is then loaded from IndexedDB.
          </li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          A JSON editor interface itself would typically involve a text area for raw JSON or a tree view/form-based
          editor built on top of the parsed JSON object. The editor must handle JSON validation locally before saving to
          IndexedDB.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h4 className="text-xl font-medium mb-3">Conceptual JSON Validation & Saving:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`// Pseudocode / Conceptual JavaScript in your UI component
async function saveEditedJson(jsonString: string, documentId: string): Promise<void> &#x7b;
  try &#x7b;
    // 1. Validate JSON string locally
    const parsedJson = JSON.parse(jsonString);

    // 2. Prepare document for storage
    const documentToSave = &#x7b;
      id: documentId,
      data: parsedJson,
      timestamp: Date.now(), // Add timestamp for sync
      status: 'pending_sync' // Mark as needing sync
    &#x7d;;

    // 3. Save to IndexedDB
    await saveJsonDocument(documentToSave); // Uses the saveJsonDocument function from the IndexedDB example

    console.log('JSON saved locally successfully.');

    // 4. Update UI to show saved state and pending sync
    updateUIStatus('Saved locally, pending sync');

    // 5. Trigger sync attempt
    syncData(); // Uses the syncData function from the Sync example

  &#x7d; catch (error: any) &#x7b;
    if (error instanceof SyntaxError) &#x7b;
      console.error('Invalid JSON syntax:', error.message);
      // Update UI to show validation error
      updateUIStatus(\`Validation error: &#x7b;error.message&#x7d;\`);
    &#x7d; else &#x7b;
      console.error('Error saving JSON:', error);
      // Update UI to show save error
      updateUIStatus(\`Error saving: &#x7b;error.message&#x7d;\`);
    &#x7d;
    throw error; // Re-throw to allow calling context to handle
  &#x7d;
&#x7d;

function updateUIStatus(message: string) &#x7b;
    // This function would update a status element in your React/UI component
    // Example: document.getElementById('status-indicator').innerText = message;
    console.log('UI Status:', message);
&#x7d;

// Example call when user clicks 'Save' button:
// const currentJson = editorTextArea.value;
// const currentDocumentId = documentId; // Assume documentId is known
// saveEditedJson(currentJson, currentDocumentId)
//   .catch(() => console.log('Save failed, check UI status for details.'));
`}
          </pre>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            The editing component itself would manage the text input or tree view, allowing the user to modify the JSON.
            When the user indicates saving, the value is retrieved, parsed, validated, and then written to IndexedDB.
            The UI should reflect the local save immediately.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <CheckCheck className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <span>Key Considerations & Best Practices</span>
        </h2>
        <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Performance:</strong> JSON parsing and stringification can be expensive for large documents.
            Optimize your editor components and data handling.
          </li>
          <li>
            <strong>Background Sync API:</strong> While powerful, its availability and behavior can vary across
            browsers. Have fallbacks (e.g., manually triggering sync on online/offline events or app open).
          </li>
          <li>
            <strong>Error Handling:</strong> Implement robust error handling for IndexedDB operations, network requests,
            JSON parsing/validation, and sync conflicts. Provide clear feedback to the user.
          </li>
          <li>
            <strong>Security (HTTPS):</strong> Absolutely essential for Service Workers and securing data in transit.
          </li>
          <li>
            <strong>Data Structure Evolution:</strong> Plan how to handle changes to the JSON schema over time, both in
            your client-side IndexedDB and during sync with the server.
          </li>
          <li>
            <strong>User Experience:</strong> Make the offline capabilities clear. Don't let the user perform actions
            they think are synced when they aren't.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Anchor className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span>Conclusion</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Building a Progressive Web App for offline-first JSON editing is a challenging but rewarding endeavor. It
          requires a solid understanding of Service Workers, client-side storage APIs like IndexedDB, and careful
          consideration of data synchronization strategies. By prioritizing offline access, you can create highly
          reliable and performant applications that meet user needs in a variety of network conditions, turning a
          standard web page into a powerful, installable tool. This pattern is applicable to many types of data-centric
          applications, not just JSON editors, paving the way for more resilient web experiences.
        </p>
      </section>
    </article>
  );
}
