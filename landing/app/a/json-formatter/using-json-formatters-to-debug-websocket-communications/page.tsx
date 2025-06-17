import type { Metadata } from "next";
import { Bug, Code, MessageSquare, LayoutList } from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging WebSocket JSON with Formatters | Offline Tools",
  description: "Learn how to use JSON formatters to effectively debug the data exchanged over WebSocket connections.",
};

export default function DebuggingWebSocketJsonWithFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3" size={32} /> Using JSON Formatters to Debug WebSocket Communications
      </h1>

      <div className="space-y-6">
        <p>
          WebSocket connections are powerful for real-time bidirectional communication between a client and a server.
          Often, the data exchanged over WebSockets is formatted as JSON. However, when debugging these communications,
          especially with high-volume or complex messages, the raw JSON can be difficult to read. This is where JSON
          formatters become invaluable tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MessageSquare className="mr-2" size={24} /> The Challenge: Raw WebSocket JSON
        </h2>
        <p>
          When you inspect network traffic, WebSocket messages often appear as long, unformatted strings of text.
          Consider this example of a raw JSON message you might receive:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{"eventType":"userUpdate","payload":{"id":"user123","name":"Alice","status":"online","lastSeen":1678886400000,"settings":{"theme":"dark","notifications":true}}}`}
          </pre>
        </div>
        <p>
          Reading this monolithic string to find specific fields, understand the structure, or identify nested data is
          cumbersome and error-prone. Without proper indentation and line breaks, it's easy to miss details.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} /> The Solution: JSON Formatters
        </h2>
        <p>
          JSON formatters take a raw JSON string and re-output it with indentation, line breaks, and often syntax
          highlighting, making the structure immediately clear. The example above, when formatted, looks like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "eventType": "userUpdate",
  "payload": {
    "id": "user123",
    "name": "Alice",
    "status": "online",
    "lastSeen": 1678886400000,
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  }
}`}
          </pre>
        </div>
        <p>
          This formatted version clearly shows the object structure, the nested `payload` object, and its fields,
          including the further nested `settings` object. Debugging becomes much more intuitive.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          Methods and Tools for Formatting WebSocket JSON
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <LayoutList className="mr-2" size={20} /> 1. Browser Developer Tools
        </h3>
        <p>
          Modern browser developer tools (like Chrome DevTools, Firefox Developer Edition, Safari Web Inspector) have
          excellent built-in support for WebSockets.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Go to the "Network" tab.</li>
          <li>Filter for "WS" (WebSockets).</li>
          <li>Click on your WebSocket connection.</li>
          <li>Go to the "Messages" tab.</li>
        </ul>
        <p>
          The dev tools often automatically detect JSON messages and display them in a tree view or a pretty-printed
          format, allowing you to expand/collapse objects and arrays. This is usually the first place to look.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" size={20} /> 2. Online/Offline JSON Formatters
        </h3>
        <p>
          Sometimes you need to inspect a message outside the browser or from a different client (like a server-side
          process).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Copy the raw JSON string from your log or network capture.</li>
          <li>
            Paste it into an online JSON formatter website (e.g., `jsonformatter.curiousconcept.com`, `jsonlint.com`,
            etc.) or a desktop application.
          </li>
          <li>The tool will instantly format and validate the JSON.</li>
        </ul>
        <p>
          <strong>Tip:</strong> Be mindful of pasting sensitive data into online tools. For production debugging or
          sensitive information, prefer offline tools or your browser's built-in capabilities.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <LayoutList className="mr-2" size={20} /> 3. Browser Extensions
        </h3>
        <p>
          Several browser extensions are available specifically for formatting and syntax highlighting JSON content
          directly in the browser window or within the developer tools, adding extra features beyond the built-in ones.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          4. Integrating Formatting into Your Debugging UI (Conceptual)
        </h3>
        <p>
          For complex WebSocket applications or when building custom debugging interfaces, you might want to display
          incoming/outgoing messages in a formatted way directly within your application's debug console or UI.
        </p>
        <p>
          In JavaScript/TypeScript, you can use the built-in <code>JSON</code> object:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Formatting JSON Programmatically:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const rawJsonString = '{"id":1,"name":"Test Item","details":{"price":100,"inStock":true}}';

try {
  // Step 1: Parse the string into a JavaScript object
  const jsonObj = JSON.parse(rawJsonString);

  // Step 2: Stringify the object back into a JSON string,
  // this time with indentation.
  // The third argument (2) specifies the number of spaces for indentation.
  const formattedJsonString = JSON.stringify(jsonObj, null, 2);

  console.log(formattedJsonString);
  // Output will be:
  // {
  //   "id": 1,
  //   "name": "Test Item",
  //   "details": {
  //     "price": 100,
  //     "inStock": true
  //   }
  // }

} catch (error: any) {
  console.error("Failed to parse JSON:", error.message);
  // Handle invalid JSON errors
}`}
            </pre>
          </div>
        </div>
        <p>
          This code snippet shows the core logic: <code>JSON.parse()</code> converts the string to a JavaScript object,
          and <code>JSON.stringify()</code> with the <code>null, 2</code> arguments converts it back to a nicely
          indented string. You could use this logic within a UI component that receives WebSocket messages and displays
          them in a <code>&lt;pre&gt;&lt;code&gt;</code> block.
        </p>
        <p>
          For display with syntax highlighting in a web UI, you would typically use this formatted string along with a
          client-side library designed for code or JSON highlighting (like `highlight.js` or `prism.js`). Since this
          page is for a Next.js backend context without client-side interactivity state, we focus on the formatting
          principle itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">Practical Debugging Tips</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Look for Message Type:</strong> Formatted JSON makes it easy to spot the `eventType` or similar
            fields at the root level to quickly understand the message's purpose.
          </li>
          <li>
            <strong>Inspect Payloads:</strong> Drill down into nested `payload` objects to find the specific data you
            need to verify.
          </li>
          <li>
            <strong>Compare Messages:</strong> Copy formatted messages to a diff tool to see exactly what changed
            between two subsequent messages.
          </li>
          <li>
            <strong>Validate Syntax:</strong> Many formatters also act as validators, catching syntax errors in the
            JSON. This is crucial for identifying issues with the sending client or server.
          </li>
          <li>
            <strong>Handle Errors:</strong> Be prepared for non-JSON messages (like plain text errors or malformed data)
            and handle them gracefully in any custom formatting logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">Conclusion</h2>
        <p>
          Debugging WebSocket communications involving JSON doesn't have to be a struggle with raw, unreadable strings.
          By leveraging browser developer tools, online/offline formatters, browser extensions, or even integrating
          programmatic formatting using <code>JSON.stringify(obj, null, 2)</code> into your debugging workflow, you can
          quickly transform opaque messages into clear, structured, and easily inspectable data. This significantly
          speeds up the process of understanding message content, identifying data discrepancies, and resolving issues
          in your real-time applications.
        </p>
      </div>
    </>
  );
}
