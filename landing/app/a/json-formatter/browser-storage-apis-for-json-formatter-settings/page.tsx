import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Storage APIs for JSON Formatter Settings | Offline Tools",
  description:
    "Explore how to use browser storage APIs like Local Storage and Session Storage to save and load user settings for a JSON formatter tool.",
};

export default function BrowserStorageApiArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Browser Storage APIs for JSON Formatter Settings</h1>

      <div className="space-y-6">
        <p>
          Building online tools like a JSON formatter often involves user preferences. Settings such as indentation
          size, theme, or sorting options enhance the user experience. But how do you make these settings persist so
          users don&apos;t have to reconfigure them every time they visit? Browser storage APIs provide the perfect
          solution for storing such data directly in the user&apos;s browser.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Store Settings in the Browser?</h2>
        <p>Storing user preferences directly in the browser offers several advantages for client-side tools:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Persistence:</strong> Settings are remembered across browser sessions.
          </li>
          <li>
            <strong>Speed:</strong> Data is accessed locally, resulting in fast loading of preferences.
          </li>
          <li>
            <strong>Offline Access:</strong> Data is available even if the user is offline.
          </li>
          <li>
            <strong>Server Load Reduction:</strong> No need to store or fetch simple preferences from your server.
          </li>
          <li>
            <strong>Simplicity:</strong> For small amounts of data like settings, the APIs are easy to use.
          </li>
        </ul>
        <p>
          For JSON formatter settings, where the data is typically small and simple (e.g., a few configuration values),
          browser storage is an ideal fit.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Available Browser Storage APIs</h2>
        <p>
          Modern web browsers offer several APIs for client-side data storage. The most relevant for application
          settings are:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Local Storage</h3>
          <p className="text-sm mt-1">
            Stores data with no expiration date. The data persists even after the browser is closed and reopened. Data
            is stored as key/value pairs, and values are always strings. Limited storage capacity (typically 5-10 MB per
            origin). Ideal for user preferences that should last.
          </p>
          <p className="text-sm mt-1 font-bold">Pros:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Data persists indefinitely (until cleared by user or script).</li>
            <li>Simple key-value API.</li>
            <li>Good browser support.</li>
          </ul>
          <p className="text-sm mt-1 font-bold">Cons:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Stores only strings (requires serialization/deserialization for objects).</li>
            <li>Synchronous API (can block the main thread for large operations).</li>
            <li>Limited storage.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Session Storage</h3>
          <p className="text-sm mt-1">
            Stores data for the duration of a single session. The data is cleared when the browser tab or window is
            closed. Like Local Storage, it uses key/value pairs where values are strings. Suitable for temporary
            session-specific preferences.
          </p>
          <p className="text-sm mt-1 font-bold">Pros:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Data isolated to the session.</li>
            <li>Simple key-value API.</li>
          </ul>
          <p className="text-sm mt-1 font-bold">Cons:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Data is lost when the session ends (tab/window closes).</li>
            <li>Stores only strings.</li>
            <li>Synchronous API.</li>
            <li>Limited storage.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">IndexedDB</h3>
          <p className="text-sm mt-1">
            A low-level API for client-side storage of significant amounts of structured data. It uses a database-like
            approach with object stores and indexes. Suitable for complex data or large datasets. Overkill for simple
            application settings but powerful for more advanced use cases.
          </p>
          <p className="text-sm mt-1 font-bold">Pros:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Can store large amounts of structured data.</li>
            <li>Asynchronous API (non-blocking).</li>
            <li>Supports transactions and indexing.</li>
          </ul>
          <p className="text-sm mt-1 font-bold">Cons:</p>
          <ul className="list-disc pl-6 text-sm">
            <li>More complex API compared to Local/Session Storage.</li>
            <li>Requires more setup.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Choosing the Right API for Settings</h2>
        <p>
          For persistent user settings in a JSON formatter (like indentation, theme, etc.),{" "}
          <strong>Local Storage</strong>
          is the most suitable choice. It&apos;s simple to use and retains data across browser sessions, which is
          exactly what you want for settings that users don&apos;t want to enter repeatedly. Session Storage might be
          used for temporary settings relevant only during the current visit. IndexedDB is generally unnecessary for
          simple key-value settings unless you plan to store complex user data structures or very large configuration
          objects.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementing Settings with Local Storage</h2>
        <p>
          Here&apos;s how you can implement saving and loading JSON formatter settings using Local Storage. Remember
          that Local Storage only stores strings, so you&apos;ll need to use <code>JSON.stringify()</code> to save
          objects/arrays and <code>JSON.parse()</code> to load them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Example: Saving Settings</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const settings = {
  indentSpaces: 2,
  theme: "dark",
  sortKeys: true,
};

try {
  // Convert the settings object to a JSON string
  const settingsString = JSON.stringify(settings);

  // Store the string in Local Storage under a specific key
  localStorage.setItem("jsonFormatterSettings", settingsString);

  console.log("Settings saved successfully!");
} catch (error) {
  console.error("Failed to save settings:", error);
  // Handle potential quota exceeded errors, etc.
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Example: Loading Settings</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const defaultSettings = {
  indentSpaces: 4,
  theme: "light",
  sortKeys: false,
};

let currentSettings = defaultSettings;

try {
  // Retrieve the settings string from Local Storage
  const settingsString = localStorage.getItem("jsonFormatterSettings");

  if (settingsString) {
    // Parse the JSON string back into an object
    currentSettings = JSON.parse(settingsString);
    console.log("Settings loaded successfully:", currentSettings);
  } else {
    console.log("No saved settings found, using default settings.");
  }
} catch (error) {
  console.error("Failed to load or parse settings:", error);
  // Fallback to default settings if parsing fails
  currentSettings = defaultSettings;
}

// Now 'currentSettings' holds either the loaded or default settings
// console.log("Active settings:", currentSettings);`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example: Removing Settings</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`try {
  // Remove the item from Local Storage
  localStorage.removeItem("jsonFormatterSettings");
  console.log("Settings removed successfully!");
} catch (error) {
  console.error("Failed to remove settings:", error);
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Error Handling:</strong> Always wrap Local Storage operations (especially <code>getItem</code> and
            <code>parse</code>) in try...catch blocks. Parsing invalid JSON or exceeding storage quotas can throw
            errors.
          </li>
          <li>
            <strong>Key Naming:</strong> Use a unique and descriptive key (like &quot;jsonFormatterSettings&quot;) to
            avoid conflicts with other applications or scripts running on the same origin.
          </li>
          <li>
            <strong>Data Structure Evolution:</strong> If your settings structure changes over time, add versioning or
            checks during the loading process to handle older stored formats gracefully.
          </li>
          <li>
            <strong>Privacy:</strong> Local Storage is accessible via client-side JavaScript. Do not store sensitive or
            confidential information here.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Leveraging browser storage APIs is a powerful and simple way to make your web-based tools more user-friendly
          by remembering preferences. For application settings in tools like a JSON formatter, Local Storage provides
          the right balance of persistence and ease of use. By understanding its capabilities and limitations, and
          implementing robust saving and loading logic, you can significantly enhance the user experience of your
          offline tools.
        </p>
      </div>
    </>
  );
}
