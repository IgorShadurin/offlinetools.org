import type { Metadata } from "next";
import { Chrome, Code, Settings2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Building JSON Formatter Chrome Extensions | Offline Tools",
  description:
    "Learn how to build Chrome extensions to automatically format and highlight JSON data displayed in the browser.",
};

export default function JsonFormatterExtensionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Chrome className="w-8 h-8" /> Building JSON Formatter Chrome Extensions
      </h1>

      <div className="space-y-6">
        <p>
          Browsing APIs, debugging network requests, or simply viewing raw JSON data in the browser can often be
          challenging due to its unformatted, plain-text nature. A JSON Formatter Chrome Extension solves this by
          automatically detecting JSON content and presenting it in a structured, readable, and highlighted format
          directly within the browser window.
        </p>
        <p>
          Building such an extension is a great way to learn about Chrome Extension development, working with web
          content, and basic data formatting. This article will guide you through the fundamental concepts and
          approaches.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Build a JSON Formatter Extension?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Improved Readability:</strong> Raw JSON is hard to scan. Formatting adds indentation, line breaks,
            and color coding, making it much easier to understand the data structure.
          </li>
          <li>
            <strong>Error Detection:</strong> Syntax highlighting often breaks on invalid JSON, helping spot errors
            quickly.
          </li>
          <li>
            <strong>Navigation:</strong> Many formatters allow collapsing/expanding objects and arrays, simplifying
            navigation through large datasets.
          </li>
          <li>
            <strong>Learning Opportunity:</strong> It&apos;s a practical project to understand core Chrome Extension
            APIs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Extension Fundamentals <Code className="w-6 h-6" />
        </h2>
        <p>
          Chrome extensions are built using web technologies (HTML, CSS, JavaScript) and run in a sandboxed environment
          within the browser. They interact with the browser and web pages through specific APIs. Key components
          include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>manifest.json</code>: The configuration file for your extension. It defines permissions, scripts,
            icons, and other metadata. This is the entry point for the browser to understand your extension.
          </li>
          <li>
            <strong>Background Script:</strong> A script that runs in the background. It handles events, manages state,
            and coordinates communication between different parts of the extension. It doesn&apos;t have direct access
            to web page content.
          </li>
          <li>
            <strong>Content Script:</strong> A script injected into web pages. It can read and modify the DOM of the
            page the user is visiting. It runs in an isolated world but can communicate with the background script.
          </li>
          <li>
            <strong>Browser Action (Toolbar Icon):</strong> An icon in the browser toolbar. Can open a popup or trigger
            an action via the background script.
          </li>
          <li>
            <strong>Page Action (URL Bar Icon):</strong> An icon that appears only when the extension is relevant to the
            current page. Less common in Manifest V3.
          </li>
          <li>
            <strong>DevTools Page:</strong> Creates panels in the browser&apos;s developer tools. Useful for inspecting
            network requests or console output.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Manifest V3</h3>
        <p>
          As of 2023/2024, Chrome is transitioning from Manifest V2 to Manifest V3. V3 brings security and performance
          enhancements, particularly changing how background processes work (Service Workers) and networking request
          interception (Declarative Net Request API). For a JSON formatter, the V3 changes primarily affect background
          scripts and potentially how you detect/intercept JSON responses, though Content Scripts remain a primary
          method for modifying page content.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Basic Manifest V3 Structure (<code>manifest.json</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&#x7b;
  "manifest_version": 3,
  "name": "My JSON Formatter",
  "version": "1.0",
  "description": "Formats JSON in browser tabs.",
  "permissions": [
    "activeTab", // Permission to access the current tab
    "scripting"  // Required for running content scripts in V3
    // Potentially "storage" for settings, "declarativeNetRequest" for V3 request interception
  ],
  // In V3, background is a Service Worker
  "background": &#x7b;
    "service_worker": "background.js"
  &#x7d;,
  // Use content scripts to modify specific pages
  "content_scripts": [
    &#x7b;
      "matches": ["http://*/*", "https://*/*"], // Apply to all http/https pages
      "js": ["content.js"]
      // If running in pre tags, consider "run_at": "document_end" or "document_idle"
    &#x7d;
  ],
  "icons": &#x7b; // Optional icons
    "16": "images/icon-16.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  &#x7d;
  // Add "action" for a toolbar icon/popup
  // "action": &#x7b;
  //   "default_popup": "popup.html"
  // &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Approaches to Building the Formatter</h2>
        <p>There are two main ways to build a JSON formatter extension:</p>

        <h3 className="text-xl font-semibold mt-6">1. Content Script Approach (Modifying Page Content)</h3>
        <p>
          This is the most common approach for basic formatters. A content script is injected into every page (or pages
          matching specific patterns) and checks if the page content looks like raw JSON. If it does, the script
          replaces the page&apos;s body or specific elements (like <code>&lt;pre&gt;</code> tags) with the formatted
          JSON.
        </p>
        <h4 className="text-lg font-medium mt-4">How it works:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Content script runs when the page loads.</li>
          <li>
            It reads the page&apos;s content (e.g., <code>document.body.innerText</code>).
          </li>
          <li>
            It attempts to parse the content using <code>JSON.parse()</code>. If successful, it&apos;s likely JSON. Add
            checks for content type headers if possible.
          </li>
          <li>
            If parsing succeeds, apply formatting and highlighting logic. This could involve:
            <ul className="list-disc pl-6 mt-1">
              <li>Using a pre-built JavaScript formatting library.</li>
              <li>
                Manually traversing the parsed JSON object/array and building HTML elements with appropriate classes for
                CSS styling.
              </li>
            </ul>
          </li>
          <li>Replace the original page content with the generated HTML.</li>
        </ul>
        <h4 className="text-lg font-medium mt-4">Pros:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Relatively simple to implement.</li>
          <li>Works directly on the page content the user sees.</li>
        </ul>
        <h4 className="text-lg font-medium mt-4">Cons:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Might interfere with pages that contain large amounts of text that is *almost* JSON.</li>
          <li>
            Can be challenging to detect JSON returned via AJAX calls *after* the page loads, unless you hook into
            network requests (which might require background scripts and different permissions).
          </li>
          <li>Replacing the entire page body might lose other elements or context. Need careful detection.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Conceptual Content Script (<code>content.js</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// content.js

// Function to check if content is likely JSON
function isLikelyJson(text) {
  try &#x7b;
    JSON.parse(text);
    // Basic check: must be an object or array at top level
    const parsed = JSON.parse(text);
    return typeof parsed === 'object' && parsed !== null;
  &#x7d; catch (e) &#x7b;
    return false;
  &#x7d;
}

// Function to format and highlight JSON (Placeholder)
// A real implementation would use libraries or detailed DOM manipulation
function formatJson(jsonText) {
  try &#x7b;
    const parsed = JSON.parse(jsonText);
    // Example: use JSON.stringify for pretty printing initially
    const prettyString = JSON.stringify(parsed, null, 2);

    // In a real formatter, you'd generate HTML with spans for colors, etc.
    // For this example, we'll just wrap in a <pre> tag.
    // You'd also handle click-to-collapse, etc.
    const formattedHtml = \`&lt;pre&gt;&lt;code&gt;&#x24;&#x7b;prettyString&#x7d;&lt;/code&gt;&lt;/pre&gt;\`;
    // Note: Need to escape HTML special characters in prettyString
    // and apply syntax highlighting here.
    return formattedHtml;

  &#x7d; catch (e) &#x7b;
    console.error("Failed to format JSON:", e);
    return null; // Return null or original text on failure
  &#x7d;
}

// Check if the page content is JSON
const pageText = document.body.innerText.trim();
const contentType = document.contentType; // Check header info if available

// Simple heuristic: if content type is application/json OR if the text looks like JSON
if (contentType === 'application/json' || (pageText.length > 0 && isLikelyJson(pageText))) &#x7b;
  const formattedHtml = formatJson(pageText);

  if (formattedHtml) &#x7b;
    // Replace the body content with the formatted JSON
    // Style the body or the new pre tag
    document.body.innerHTML = \`&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Formatted JSON&lt;/title&gt;
  &lt;style&gt;
    body &#x7b; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; padding: 10px; &#x7d;
    /* Add styles for different JSON types (strings, numbers, booleans, null, keys) */
    .json-string &#x7b; color: green; &#x7d;
    .json-number &#x7b; color: blue; &#x7d;
    .json-boolean &#x7b; color: red; &#x7d;
    .json-null &#x7b; color: gray; &#x7d;
    .json-key &#x7b; color: purple; font-weight: bold; &#x7d;
    /* Add styles for expandable objects/arrays */
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &#x24;&#x7b;formattedHtml&#x7d;
&lt;/body&gt;
&lt;/html&gt;\`;

    // Stop here, no need to run other scripts or observe DOM
    console.log("JSON formatted by extension.");

    // You might need to add mutation observers if JSON is loaded dynamically
    // However, for simple JSON responses displayed directly, this is enough.
  &#x7d;
} else &#x7b;
  // Content is not JSON or could not be parsed. Do nothing.
&#x7d;

// For pages that display JSON inside <pre> tags (like some browsers do for API responses)
// you could instead target those specific elements:
/*
document.querySelectorAll('pre').forEach(preElement => &#x7b;
  const preText = preElement.innerText.trim();
  if (isLikelyJson(preText)) &#x7b;
    const formattedHtml = formatJson(preText);
    if (formattedHtml) &#x7b;
      // Create a new element to replace the pre tag
      const formattedContainer = document.createElement('div'); // or pre
      formattedContainer.innerHTML = formattedHtml;
      // Copy styles or add specific class
      formattedContainer.style.cssText = preElement.style.cssText; // Optional: copy original styles
      preElement.parentNode.replaceChild(formattedContainer, preElement);
      console.log("JSON pre tag formatted.");
    &#x7d;
  &#x7d;
&#x7d;);
*/
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. DevTools Panel Approach (Inspecting Network)</h3>
        <p>
          This approach involves creating a custom panel within Chrome&apos;s Developer Tools. The extension uses the{" "}
          <code>chrome.devtools.network</code> API to listen for network requests and responses. When a response with a{" "}
          <code>Content-Type: application/json</code>
          header is detected, its body is fetched and sent to the DevTools panel for display and formatting.
        </p>
        <h4 className="text-lg font-medium mt-4">How it works:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The <code>manifest.json</code> declares a <code>devtools_page</code>.
          </li>
          <li>
            The DevTools page script (e.g., <code>devtools.js</code>) uses <code>chrome.devtools.panels.create</code>
            to add a new panel.
          </li>
          <li>
            This script (or a background script it communicates with) listens to{" "}
            <code>chrome.devtools.network.onRequestFinished</code>.
          </li>
          <li>
            When a request finishes, check its response headers for <code>Content-Type: application/json</code>.
          </li>
          <li>
            If it&apos;s JSON, use <code>request.getContent()</code> to get the response body.
          </li>
          <li>
            Send this content to the DevTools panel (often involves messaging between the background/devtools script and
            the panel&apos;s HTML page script).
          </li>
          <li>The panel&apos;s script receives the JSON string, formats it, and displays it in the panel&apos;s UI.</li>
        </ul>
        <h4 className="text-lg font-medium mt-4">Pros:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Non-intrusive: Doesn&apos;t modify the visited web page.</li>
          <li>Can capture JSON from AJAX requests easily.</li>
          <li>Provides a dedicated UI within the DevTools.</li>
        </ul>
        <h4 className="text-lg font-medium mt-4">Cons:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>More complex to set up (involves multiple scripts and communication).</li>
          <li>Requires the user to open DevTools to see the formatted JSON.</li>
          <li>
            Doesn&apos;t format JSON directly displayed in a browser tab (like visiting a <code>.json</code> file URL).
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Manifest V3 for DevTools Approach (<code>manifest.json</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&#x7b;
  "manifest_version": 3,
  "name": "DevTools JSON Formatter",
  "version": "1.0",
  "description": "Formats JSON in DevTools network panel.",
  "permissions": [
    "storage" // Example: For saving settings
  ],
  "background": &#x7b;
    "service_worker": "background.js" // Handles communication/events
  &#x7d;,
  "devtools_page": "devtools.html", // The HTML page for the DevTools panel
  "icons": &#x7b; ... &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Conceptual DevTools Page (<code>devtools.html</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;JSON Formatter DevTools&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script src="devtools.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Conceptual DevTools Script (<code>devtools.js</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// devtools.js

// Create a custom panel
chrome.devtools.panels.create(
  "JSON Formatter", // Title
  "images/icon-16.png", // Icon (optional)
  "panel.html", // HTML page for the panel UI
  function(panel) &#x7b;
    // Panel is created
    console.log("JSON Formatter DevTools panel created");

    // Example: Listen for network requests and send JSON to the panel
    // This might be better handled in a background script in V3
    chrome.devtools.network.onRequestFinished.addListener(
      function(request) &#x7b;
        // Check if the response is JSON
        const isJsonResponse = request.response.content.mimeType === "application/json";

        if (isJsonResponse) &#x7b;
          request.getContent(function(body) &#x7b;
            // Send the JSON body to the panel's script
            // Need to establish communication between devtools.js and panel.html's script
            // This often involves chrome.runtime.connect or chrome.runtime.sendMessage
            // For simplicity, imagining the panel script can receive this directly:
            // panel.handleJsonContent(body); // This is conceptual!

            console.log("Detected JSON response, need to send to panel:", body);
            // A more realistic approach:
            // chrome.runtime.sendMessage(&#x7b;
            //   type: "JSON_RESPONSE",
            //   json: body,
            //   url: request.request.url
            // &#x7d;);
          &#x7d;);
        &#x7d;
      &#x7d;
    );
  &#x7d;
);`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Conceptual Panel HTML (<code>panel.html</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;JSON Panel&lt;/title&gt;
  &lt;style&gt;
    body &#x7b; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; padding: 10px; &#x7d;
    /* Add your JSON formatting CSS here */
    .json-string &#x7b; color: green; &#x7d;
    .json-number &#x7b; color: blue; &#x7d;
    .json-boolean &#x7b; color: red; &#x7d;
    .json-null &#x7b; color: gray; &#x7d;
    .json-key &#x7b; color: purple; font-weight: bold; &#x7d;
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;JSON Data&lt;/h1&gt;
  &lt;div id="jsonContent"&gt;Select a network request...&lt;/div&gt;
  &lt;script src="panel.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Conceptual Panel Script (<code>panel.js</code>):
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// panel.js

const jsonContentDiv = document.getElementById('jsonContent');

// Function to format and display JSON (Placeholder)
function displayFormattedJson(jsonString) &#x7b;
  try &#x7b;
    const parsed = JSON.parse(jsonString);
    // Use JSON.stringify or your custom formatting logic
    const prettyString = JSON.stringify(parsed, null, 2);

    // In a real formatter, generate HTML with syntax highlighting and collapse/expand
    const formattedHtml = \`&lt;pre&gt;&lt;code&gt;&#x24;&#x7b;prettyString&#x7d;&lt;/code&gt;&lt;/pre&gt;\`; // Escape HTML!

    jsonContentDiv.innerHTML = formattedHtml;

  &#x7d; catch (e) &#x7b;
    jsonContentDiv.innerText = "Error formatting JSON: " + e.message;
  &#x7d;
}

// Need to receive JSON data from devtools.js or background script.
// Example using chrome.runtime.onMessage (if sent from background/devtools):
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) &#x7b;
//   if (request.type === "JSON_RESPONSE") &#x7b;
//     console.log("Panel received JSON for", request.url);
//     displayFormattedJson(request.json);
//   &#x7d;
// &#x7d;);

// If using port connections:
// const port = chrome.runtime.connect(&#x7b; name: "devtools-panel" &#x7d;);
// port.onMessage.addListener(function(msg) &#x7b;
//   if (msg.type === "JSON_CONTENT") &#x7b;
//     displayFormattedJson(msg.json);
//   &#x7d;
// &#x7d;);
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing the Formatting Logic</h2>
        <p>
          Whether you use the Content Script or DevTools approach, the core task is taking a JSON string, parsing it
          into a JavaScript object/array, and then generating HTML that represents this structure with indentation and
          highlighting.
        </p>
        <p>
          You can use <code>JSON.parse()</code> to parse the string safely. For formatting, you have options:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>
              <code>JSON.stringify(data, null, 2)</code>:
            </strong>{" "}
            This is the simplest way to get a pretty-printed string with 2 spaces for indentation. You can then wrap
            this string in a <code>&lt;pre&gt;</code>
            tag and potentially apply basic CSS for different data types by searching and replacing or using regular
            expressions (though this can be complex and error-prone).
          </li>
          <li>
            <strong>Manual DOM Generation:</strong> Iterate through the parsed JSON object/array. For each key-value
            pair (in objects) or element (in arrays), create corresponding HTML elements (e.g.,{" "}
            <code>&lt;span&gt;</code>, <code>&lt;div&gt;</code>). Add CSS classes based on the data type (string,
            number, boolean, null, object, array, key). This gives you fine-grained control for styling, collapse/expand
            features, etc.
          </li>
          <li>
            <strong>Third-party Libraries:</strong> Libraries exist specifically for formatting and highlighting JSON in
            HTML. Integrating one might simplify the formatting part, but adds external dependencies to your extension.
            Choose carefully and consider the library&apos;s size and compatibility.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Manual Formatting Structure (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function buildJsonHtml(data, indentLevel = 0) &#x7b;
  const indent = '  '.repeat(indentLevel);
  let html = '';

  if (data === null) &#x7b;
    return \`<span class="json-null">null</span>\`;
  &#x7d;

  switch (typeof data) &#x7b;
    case 'boolean':
      return \`<span class="json-boolean">$&#x7b;data&#x7d;</span>\`;
    case 'number':
      return \`<span class="json-number">$&#x7b;data&#x7d;</span>\`;
    case 'string':
      // Escape string data to prevent XSS
      const escapedString = data.replace(/&/g, '&amp;').replace(/&lt;/g, '&lt;').replace(/&gt;/g, '&gt;').replace(/"/g, '&quot;');
      return \`<span class="json-string">"$&#x7b;escapedString&#x7d;"</span>\`;
    case 'object':
      if (Array.isArray(data)) &#x7b;
        // Handle Array
        if (data.length === 0) return '[&nbsp;]'; // Use &nbsp; for non-breaking space

        html += '[\\n';
        for (let i = 0; i &lt; data.length; i++) &#x7b;
          html += indent + '  ' + buildJsonHtml(data[i], indentLevel + 1);
          if (i &lt; data.length - 1) html += ',';
          html += '\\n';
        &#x7d;
        html += indent + ']';
        return html;

      &#x7d; else &#x7b;
        // Handle Object
        const keys = Object.keys(data);
        if (keys.length === 0) return '{&nbsp;}';

        html += '{\\n';
        for (let i = 0; i &lt; keys.length; i++) &#x7b;
          const key = keys[i];
          html += indent + '  ' + \`<span class="json-key">"$&#x7b;key&#x7d;"</span>: \` + buildJsonHtml(data[key], indentLevel + 1);
          if (i &lt; keys.length - 1) html += ',';
          html += '\\n';
        &#x7d;
        html += indent + '}';
        return html;
      &#x7d;
    default:
      return \`&lt;span class="json-error">Unsupported type&lt;/span&gt;\`;
  &#x7d;
}

// Example usage (after parsing jsonString):
// const parsedData = JSON.parse(jsonString);
// const htmlOutput = buildJsonHtml(parsedData);
// document.getElementById('output').innerHTML = htmlOutput;
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Adding Options and Customization <Settings2 className="w-6 h-6" />
        </h2>
        <p>A useful extension often provides options. For a JSON formatter, this might include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Indentation size (2 spaces, 4 spaces, tabs).</li>
          <li>Color scheme for syntax highlighting.</li>
          <li>Whether to collapse certain nodes by default.</li>
          <li>Enabling/disabling the formatter on specific websites.</li>
        </ul>
        <p>You can implement this using:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            An{" "}
            <a
              href="https://developer.chrome.com/docs/extensions/reference/optionsV2/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Options page
            </a>
            : An HTML page defined in <code>manifest.json</code> where users can configure settings.
          </li>
          <li>
            The{" "}
            <a
              href="https://developer.chrome.com/docs/extensions/reference/storage/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <code>chrome.storage</code> API
            </a>
            : Used to save user settings persistently across browser sessions.
          </li>
        </ul>
        <p>
          Your content or DevTools scripts can then read settings from <code>chrome.storage.sync</code> (synced across
          signed-in browsers) or <code>chrome.storage.local</code> (local only) and apply them to the formatting logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Packaging and Publishing</h2>
        <p>Once your extension is ready:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Packaging:</strong> Zip the extension&apos;s files (manifest.json, scripts, icons, HTML pages, CSS).
          </li>
          <li>
            <strong>Testing:</strong> Load it in Chrome via <code>chrome://extensions</code> in developer mode. Test
            thoroughly on various JSON outputs and regular web pages.
          </li>
          <li>
            <strong>Publishing:</strong> You can publish your extension to the Chrome Web Store through the{" "}
            <a
              href="https://chrome.google.com/webstore/developer/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              developer dashboard
            </a>
            . This requires a one-time fee.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a JSON Formatter Chrome Extension is a rewarding project that provides practical experience with
          browser extension development, content manipulation (or DevTools API usage), and frontend formatting
          techniques. Whether you choose the Content Script approach for direct page formatting or the DevTools approach
          for network inspection, understanding the Chrome Extension lifecycle and APIs is key. Start simple, perhaps
          using <code>JSON.stringify</code> initially, and gradually add features like syntax highlighting,
          collapse/expand, and user options to build a robust tool.
        </p>
      </div>
    </>
  );
}
