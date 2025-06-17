import type { Metadata } from "next";
import { Link, FileUp, Clipboard, Globe, TextCursorInput } from "lucide-react";

// Check if icons are in the allowed list:
// Link - Yes
// FileUp - Yes
// Clipboard - Yes
// Globe - Yes
// TextCursorInput - Yes
// All good.

export const metadata: Metadata = {
  title: "Alternative Input Methods for JSON Formatters | JSON Tools",
  description: "Explore different ways users can provide JSON data to a formatter tool, beyond simple copy-paste.",
};

export default function AlternativeJsonInputMethodsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Alternative Input Methods for JSON Formatters</h1>

      <div className="space-y-6 text-base">
        <p>
          JSON formatters are essential tools for developers, making raw, unformatted JSON data readable and structured.
          While the most common way to input data is by pasting it directly into a text area, offering alternative input
          methods can significantly improve the user experience and tool versatility. This article explores various
          input strategies you can implement in a JSON formatter application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Clipboard size={24} />
          1. Direct Text Input (The Standard)
        </h2>
        <p>
          This is the ubiquitous method: a large text area where users can paste their JSON string. It's simple,
          immediate, and works for small to medium-sized JSON snippets.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic Text Area:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;label for="jsonInput" class="sr-only"&gt;Enter JSON&lt;/label&gt;
&lt;textarea
  id="jsonInput"
  rows={10}
  cols={50}
  placeholder='Paste your JSON here, like: {"name": "value"}'
  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
&gt;
&lt;/textarea&gt;`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Universal, easy to implement, quick for small data.
          <br />
          <strong>Cons:</strong> Can become slow or crash the browser for very large JSON files, manual copy-paste can
          be tedious, prone to errors if not copying the full valid JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileUp size={24} />
          2. File Upload
        </h2>
        <p>
          Allowing users to upload a JSON file directly is crucial for handling larger datasets or when the JSON is
          already saved locally.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic File Input:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;label for="jsonFile" class="block text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
  Upload JSON File
&lt;/label&gt;
&lt;input
  type="file"
  id="jsonFile"
  accept=".json"
  className="mt-1 block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100"
/&gt;`}
            </pre>
          </div>
        </div>
        <p>
          Implementing this requires handling the file input event, reading the file content (usually as text using
          `FileReader`), and then processing the text. You should add validation to ensure the uploaded file is indeed a
          `.json` file or at least contains valid JSON content.
        </p>
        <p>
          <strong>Pros:</strong> Handles large files more gracefully than text area (by not loading everything at once
          into a single element), convenient when data is in a file, allows drag-and-drop onto the file input area.
          <br />
          <strong>Cons:</strong> Requires user interaction with file picker, needs server-side processing or client-side
          file reading API.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Link size={24} />
          3. Fetch from URL
        </h2>
        <p>
          For developers working with APIs or remote JSON resources, fetching data directly from a URL is a powerful
          alternative. The user simply provides a URL, and the formatter fetches the content.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic URL Input:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;label for="jsonUrl" class="sr-only"&gt;Fetch from URL&lt;/label&gt;
&lt;input
  type="url"
  id="jsonUrl"
  placeholder="Or fetch JSON from a URL (e.g., https://example.com/data.json)"
  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/&gt;
&lt;button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"&gt;
  Fetch JSON
&lt;/button&gt;`}
            </pre>
          </div>
        </div>
        <p>
          This method involves making an HTTP request (e.g., using `fetch` in the browser or a server-side request) to
          the provided URL. You'll need to handle potential CORS issues (Cross-Origin Resource Sharing) if fetching
          client-side from a different domain, or make the fetch request server-side to avoid this limitation.
        </p>
        <p>
          <strong>Pros:</strong> Very convenient for API responses or publicly available JSON data, avoids manual
          copy-pasting large responses.
          <br />
          <strong>Cons:</strong> Requires handling network requests and potential errors (network issues, invalid URLs,
          non-JSON responses), CORS limitations for client-side fetches, privacy concerns if the URL contains sensitive
          information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe size={24} />
          4. URL Parameter
        </h2>
        <p>
          While less common for large JSON payloads, passing small JSON snippets directly in the URL query string can be
          useful for sharing or deep linking to pre-filled formatters. The JSON data would be URL-encoded.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example URL:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`https://your-formatter.com/?json=%7B%22name%22%3A%22value%22%7D`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Corresponding Decoded JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`{"name":"value"}`}</pre>
          </div>
        </div>
        <p>
          This is typically handled by reading the query parameters when the page loads. You'd look for a specific
          parameter name (e.g., `json`) and decode its value.
        </p>
        <p>
          <strong>Pros:</strong> Allows deep linking and sharing, useful for small, static examples.
          <br />
          <strong>Cons:</strong> Severe limitations on data size due to URL length limits, requires URL
          encoding/decoding, not suitable for user-provided dynamic data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TextCursorInput size={24} />
          5. Built-in Editor with Features
        </h2>
        <p>
          Instead of a plain text area, provide a more sophisticated code editor component (like those based on
          CodeMirror or Monaco Editor). These editors can offer syntax highlighting, basic validation, bracket matching,
          and even auto-completion, making it easier to type or edit JSON directly.
        </p>
        <p>
          While this method still falls under "Direct Text Input," the enhanced editor capabilities elevate it
          significantly, reducing syntax errors before the data is even sent for formatting.
        </p>
        <p>
          <strong>Pros:</strong> Improved user experience for direct input/editing, helps prevent basic syntax errors,
          visually appealing.
          <br />
          <strong>Cons:</strong> Requires integrating a third-party editor library (which might have its own
          complexities and dependencies), can still struggle with extremely large files depending on implementation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileUp size={24} /> {/* Using FileUp again as drag-and-drop is related to file input */}
          6. Drag and Drop
        </h2>
        <p>
          Build upon the file upload method by adding a dedicated drag-and-drop zone. Users can drag a JSON file from
          their file system directly onto the page or a specific area. This provides a more fluid interaction than
          clicking a file input button.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Drag Zone:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div
  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
  // Add event listeners for dragover, dragleave, drop
&gt;
  Drag and drop your JSON file here, or click to upload.
&lt;/div&gt;
&lt;input type="file" accept=".json" class="hidden" /&gt; &lt;!-- Link to hidden file input --&gt;`}
            </pre>
          </div>
        </div>
        <p>
          Implementing drag and drop involves handling browser drag events (`dragover`, `dragleave`, `drop`) and
          accessing the file data from the event object (`event.dataTransfer.files`).
        </p>
        <p>
          <strong>Pros:</strong> Highly intuitive user interaction, convenient for users with files, visually appealing.
          <br />
          <strong>Cons:</strong> More complex event handling compared to a simple file input, needs clear visual cues.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choosing the Right Methods</h2>
        <p>The best approach is often to combine multiple methods. For example, a formatter might offer:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A prominent text area (with or without editor features) for quick pastes.</li>
          <li>A "Upload File" button or drag-and-drop zone for local files.</li>
          <li>A "Fetch from URL" option for remote data.</li>
        </ul>
        <p>
          Providing these options caters to different user workflows and data sources, making the tool more flexible and
          user-friendly. Consider your target audience and the typical size and source of the JSON data they will be
          working with when deciding which input methods to implement.
        </p>
        <p>By moving beyond just a simple text area, you can create a more robust and helpful JSON formatting tool.</p>
      </div>
    </>
  );
}
