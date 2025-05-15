import type { Metadata } from "next";
import {
  FileJson2,
  Settings,
  Diff,
  ListTree,
  CheckCheck,
  ArrowRight,
  Copy as CopyIcon, // Alias to avoid conflict with potential 'Copy' component
  Plus,
  Minus,
  Replace,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Patch Operations for Configuration Updates | Offline Tools",
  description:
    "Learn how to use JSON Patch (RFC 6902) for efficiently updating JSON configuration documents.",
};

export default function JsonPatchForConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Settings className="w-8 h-8" /> JSON Patch Operations for Configuration Updates
      </h1>

      <div className="space-y-6">
        <p>
          Updating configuration stored as JSON can sometimes be cumbersome. Sending the entire new configuration,
          even for small changes, can be inefficient, especially over slow networks or when configurations are large.
          It can also lead to race conditions if multiple updates happen concurrently.
          <a href="https://datatracker.ietf.org/doc/html/rfc6902" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">JSON Patch (RFC 6902)</a>
          provides a standard method for applying partial updates to a JSON document, making configuration changes more efficient and robust.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="w-6 h-6" /> What is JSON Patch?
        </h2>
        <p>
          JSON Patch is a format for describing changes to a JSON document. It&apos;s defined as an array of operation objects. Each operation object specifies a single change to be made to the target JSON document.
        </p>
        <p>
          Instead of sending the complete new version of a configuration, you send a small array of operations that describe exactly how to transform the old configuration into the new one.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Diff className="w-6 h-6" /> Why Use JSON Patch for Configurations?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Efficiency:</strong> Sends only the changes, not the entire document, saving bandwidth and processing time.
          </li>
          <li>
            <strong>Atomicity:</strong> A patch document represents a single set of changes. Applying the patch is often done transactionally.
          </li>
          <li>
            <strong>Reduced Race Conditions:</strong> When applying a patch server-side, you can often use a &quot;test&quot; operation (see below) to verify the current state before making changes, mitigating race conditions.
          </li>
          <li>
            <strong>Auditability:</strong> A sequence of patches provides a clear history of how a configuration evolved.
          </li>
          <li>
            <strong>Standardization:</strong> It&apos;s an IETF standard, meaning libraries exist for many programming languages.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6" /> JSON Pointer (RFC 6901) for Paths
        </h2>
        <p>
          JSON Patch operations use <a href="https://datatracker.ietf.org/doc/html/rfc6901" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">JSON Pointer (RFC 6901)</a> to identify the specific part of the JSON document being operated on. A JSON Pointer is a string starting with <code>/</code> that navigates through the JSON structure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><code>/foo/bar</code>: Points to the value of the &quot;bar&quot; key inside the &quot;foo&quot; object.</li>
          <li><code>/foo/0</code>: Points to the first element (index 0) of the array that is the value of the &quot;foo&quot; key.</li>
          <li><code>/</code>: Points to the root of the document.</li>
          <li><code>/a~1b/c~0d</code>: JSON Pointer requires escaping <code>~</code> as <code>~0</code> and <code>/</code> as <code>~1</code>.</li>
          <li>To add to an array, use <code>/-</code> as the last segment to append to the end.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example JSON Pointer Paths:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "application": {
    "name": "My App",
    "version": "1.0",
    "settings": {
      "theme": "dark",
      "timeout": 30000
    },
    "features": [
      "featureA",
      "featureB"
    ],
    "special/key~name": "value"
  }
}

Path /application points to: { "name": "My App", ... }
Path /application/name points to: "My App"
Path /application/settings/theme points to: "dark"
Path /application/features/0 points to: "featureA"
Path /application/features/1 points to: "featureB"
Path /application/features/- points to: (the position *after* the last element)
Path /application/special~1key~0name points to: "value"
Path / points to the whole document.`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON Patch Operations</h2>
        <p>
          There are six standard operations. Each operation object must have an <code>"op"</code> key specifying the type of operation.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Plus className="w-5 h-5" /> 1. add
        </h3>
        <p>
          The &quot;add&quot; operation inserts a new value into an object or array.
          <br />
          Structure: <code>&#x7b; "op": "add", "path": "/...", "value": "..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If the target is an object, it adds a new key-value pair. If the key exists, it behaves like &quot;replace&quot;.</li>
          <li>If the target is an array, it inserts the value at the specified index (shifting subsequent elements). Using <code>/-</code> appends the value to the end.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Add Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "logging": {
    "level": "info"
  },
  "features": ["analytics"]
}`}
            </pre>
            <p><strong>Patch:</strong> Add a &quot;format&quot; key to logging and a new feature:</p>
            <pre>
              {`[
  &#x7b; "op": "add", "path": "/logging/format", "value": "json" &#x7d;,
  &#x7b; "op": "add", "path": "/features/-", "value": "notifications" &#x7d;
]`}
            </pre>
            <p><strong>Resulting Configuration:</strong></p>
            <pre>
              {`{
  "logging": {
    "level": "info",
    "format": "json"
  },
  "features": ["analytics", "notifications"]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Minus className="w-5 h-5" /> 2. remove
        </h3>
        <p>
          The &quot;remove&quot; operation removes a value from an object or array.
          <br />
          Structure: <code>&#x7b; "op": "remove", "path": "/..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If the target is an object, it removes the key-value pair.</li>
          <li>If the target is an array, it removes the element at the specified index (shifting subsequent elements).</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Remove Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "features": ["analytics", "notifications"]
}`}
            </pre>
            <p><strong>Patch:</strong> Remove the &quot;port&quot; and the &quot;analytics&quot; feature:</p>
            <pre>
              {`[
  &#x7b; "op": "remove", "path": "/database/port" &#x7d;,
  &#x7b; "op": "remove", "path": "/features/0" &#x7d; // Remove first element
]`}
            </pre>
            <p><strong>Resulting Configuration:</strong></p>
            <pre>
              {`{
  "database": {
    "host": "localhost"
  },
  "features": ["notifications"] // Index 1 shifted to 0
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Replace className="w-5 h-5" /> 3. replace
        </h3>
        <p>
          The &quot;replace&quot; operation replaces a value at a specific path. This is the most common operation for simple property updates.
          <br />
          Structure: <code>&#x7b; "op": "replace", "path": "/...", "value": "..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>The path must point to an existing value.</li>
          <li>If the path points to a non-existent location, the operation fails.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Replace Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "application": {
    "version": "1.0"
  },
  "settings": {
    "timeout": 30000
  }
}`}
            </pre>
            <p><strong>Patch:</strong> Update the version and timeout:</p>
            <pre>
              {`[
  &#x7b; "op": "replace", "path": "/application/version", "value": "1.1" &#x7d;,
  &#x7b; "op": "replace", "path": "/settings/timeout", "value": 60000 &#x7d;
]`}
            </pre>
            <p><strong>Resulting Configuration:</strong></p>
            <pre>
              {`{
  "application": {
    "version": "1.1"
  },
  "settings": {
    "timeout": 60000
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" /> 4. move
        </h3>
        <p>
          The &quot;move&quot; operation moves a value from one location in the document to another.
          <br />
          Structure: <code>&#x7b; "op": "move", "from": "/...", "path": "/..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Both <code>from</code> and <code>path</code> are JSON Pointers.</li>
          <li>The value is removed from the <code>from</code> location and added at the <code>path</code> location.</li>
          <li>This is useful for restructuring the configuration.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Move Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "old_settings": {
    "theme": "dark",
    "legacy": true
  },
  "new_settings": {}
}`}
            </pre>
            <p><strong>Patch:</strong> Move &quot;theme&quot; from &quot;old_settings&quot; to &quot;new_settings&quot;:</p>
            <pre>
              {`[
  &#x7b; "op": "move", "from": "/old_settings/theme", "path": "/new_settings/theme" &#x7d;
]`}
            </pre>
            <p><strong>Resulting Configuration:</strong></p>
            <pre>
              {`{
  "old_settings": {
    "legacy": true
  },
  "new_settings": {
    "theme": "dark"
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CopyIcon className="w-5 h-5" /> 5. copy
        </h3>
        <p>
          The &quot;copy&quot; operation copies a value from one location to another. It&apos;s similar to &quot;move&quot; but the original value remains.
          <br />
          Structure: <code>&#x7b; "op": "copy", "from": "/...", "path": "/..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Both <code>from</code> and <code>path</code> are JSON Pointers.</li>
          <li>A duplicate of the value at <code>from</code> is created at the <code>path</code> location.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Copy Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "default_settings": {
    "timeout": 30000,
    "retries": 3
  },
  "user_settings": {}
}`}
            </pre>
            <p><strong>Patch:</strong> Copy the default timeout to user settings:</p>
            <pre>
              {`[
  &#x7b; "op": "copy", "from": "/default_settings/timeout", "path": "/user_settings/timeout" &#x7d;
]`}
            </pre>
            <p><strong>Resulting Configuration:</strong></p>
            <pre>
              {`{
  "default_settings": {
    "timeout": 30000,
    "retries": 3
  },
  "user_settings": {
    "timeout": 30000
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCheck className="w-5 h-5" /> 6. test
        </h3>
        <p>
          The &quot;test&quot; operation verifies that the value at a specified location is equal to a given value.
          <br />
          Structure: <code>&#x7b; "op": "test", "path": "/...", "value": "..." &#x7d;</code>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If the value at <code>path</code> is not exactly equal to the provided <code>value</code>, the entire patch application should fail.</li>
          <li>This is crucial for preventing race conditions. You can test that a configuration value is what you expect it to be before applying changes based on that assumption.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Test Example (Success Scenario):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "status": "active",
  "count": 5
}`}
            </pre>
            <p><strong>Patch:</strong> Test status and update count (assuming status is &quot;active&quot;):</p>
            <pre>
              {`[
  &#x7b; "op": "test", "path": "/status", "value": "active" &#x7d;,
  &#x7b; "op": "replace", "path": "/count", "value": 6 &#x7d;
]`}
            </pre>
            <p><strong>Result:</strong> Patch succeeds, resulting in:</p>
            <pre>
              {`{
  "status": "active",
  "count": 6
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Test Example (Failure Scenario):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-90- text-sm">
            <p><strong>Initial Configuration:</strong></p>
            <pre>
              {`{
  "status": "inactive",
  "count": 5
}`}
            </pre>
            <p><strong>Patch:</strong> Test status and update count (same patch as above):</p>
            <pre>
              {`[
  &#x7b; "op": "test", "path": "/status", "value": "active" &#x7d;,
  &#x7b; "op": "replace", "path": "/count", "value": 6 &#x7d;
]`}
            </pre>
            <p><strong>Result:</strong> The &quot;test&quot; operation fails because <code>"status"</code> is <code>"inactive"</code>, not <code>"active"</code>. The entire patch is rejected, and the configuration remains unchanged.</p>
            <pre>
              {`{
  "status": "inactive",
  "count": 5
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing JSON Patch</h2>
        <p>
          You don&apos;t typically write the patch application logic yourself. Libraries that implement RFC 6902 and RFC 6901 are available in most languages.
        </p>
        <p>
          To use JSON Patch for configuration updates:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Retrieve the current configuration (JSON document).</li>
          <li>Determine the difference between the current configuration and the desired new configuration. This step often requires a JSON Diff algorithm or library that can generate a patch from two documents.</li>
          <li>Send the generated JSON Patch (array of operations) to the service responsible for updating the configuration.</li>
          <li>The service uses a JSON Patch library to apply the patch to its current version of the configuration. It should perform all operations atomically. If any operation (especially &quot;test&quot;) fails, the entire patch application should be rolled back or aborted.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Beyond Configuration Updates</h2>
        <p>
          JSON Patch is useful in many scenarios beyond just configuration:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>REST APIs:</strong> Supporting <code>PATCH</code> requests where clients send a JSON Patch document to partially update a resource.</li>
          <li><strong>Real-time Collaboration:</strong> Sharing patches between clients to synchronize document states (similar to how diff/patch works in version control).</li>
          <li><strong>Database Updates:</strong> Using JSON Patch to describe changes to JSON fields in databases that support the JSON type.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON Patch provides a standardized, efficient, and robust way to apply granular updates to JSON documents. For managing configuration updates, it offers significant advantages in terms of bandwidth, clarity, and safety (especially with the &quot;test&quot; operation). By leveraging existing libraries, developers can easily incorporate JSON Patch into their systems for more sophisticated configuration management and data synchronization.
        </p>
      </div>
    </>
  );
}