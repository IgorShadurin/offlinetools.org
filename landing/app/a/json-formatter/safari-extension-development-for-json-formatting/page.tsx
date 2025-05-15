import type { Metadata } from "next";
import {
  Monitor,
  FileJson,
  Code,
  Settings,
  PenLine,
  Layers,
  Paintbrush,
  AlertCircle,
  Box,
  FileText,
  CheckCheck,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Safari Extension Development for JSON Formatting | Offline Tools",
  description:
    "A guide for developers of all levels on how to create a Safari browser extension to automatically format JSON content displayed in the browser.",
};

export default function SafariJsonFormatterExtensionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Monitor className="w-8 h-8" /> Safari Extension Development for JSON Formatting
      </h1>

      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        Have you ever landed on a web page that displays raw JSON data, unformatted and difficult to read?
        As developers, we frequently encounter this. A browser extension that automatically detects and
        formats JSON can be a huge productivity booster. This guide will walk you through creating
        such an extension specifically for Safari.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="w-6 h-6" /> Why Build a JSON Formatter Extension?
          </h2>
          <p>
            Raw JSON on a page is a common sight, especially when interacting with APIs
            or viewing data directly returned by a server. Without formatting, large JSON
            objects or arrays are just long strings of text, making it impossible to quickly
            understand their structure, find specific keys, or debug responses.
          </p>
          <p className="mt-2">
            While developer tools in Safari offer network tabs where you can inspect
            JSON responses, sometimes the JSON is simply the entire content of the page
            (e.g., when you navigate directly to a JSON file URL or an API endpoint).
            An extension that formats the page content itself provides a seamless experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" /> Safari Extension Architecture Basics (Manifest V3)
          </h2>
          <p>
            Safari, like other modern browsers, has adopted the Manifest V3 standard
            for extensions. This architecture emphasizes security, performance, and
            clear separation of concerns. Key components include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Manifest File (`manifest.json`):</strong> The heart of your extension. It defines metadata (name, version),
              permissions required, and declares the various scripts and resources your extension uses.
            </li>
            <li>
              <div className="flex items-center gap-1">
                 <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" /> <strong>Content Scripts:</strong> These scripts run in the context of specific web pages
                 you define. They have access to the page&apos;s DOM but have limited access to background script APIs.
                 This is where our JSON formatting logic will live.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <Settings className="w-4 h-4 text-green-600 dark:text-green-400" /> <strong>Background Service Worker (or Persistent Background Page):</strong> Runs in the background,
                listening for browser events (like navigating to a new tab). It doesn&apos;t have direct access to the page DOM
                but can communicate with content scripts. For our simple formatter, a background script might not be strictly necessary
                if the logic is entirely within the content script, but it&apos;s crucial for more complex extensions.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <Monitor className="w-4 h-4 text-purple-600 dark:text-purple-400" /> <strong>Popup (Browser Action):</strong> An optional small UI window that appears when you click the extension&apos;s
                icon in the toolbar. We won&apos;t strictly need one for automatic formatting, but you could add controls here.
              </div>
            </li>
          </ul>
          <p className="mt-4">
            For a JSON formatter that modifies the content of the page itself, the primary focus will be on the <strong>Content Script</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" /> Step 1: The Manifest File (`manifest.json`)
          </h2>
          <p>
            This file tells Safari about your extension. Here&apos;s a basic structure for our JSON formatter:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">`manifest.json` example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`{
  "manifest_version": 3,
  "name": "JSON Formatter for Safari",
  "version": "1.0",
  "description": "Automatically formats JSON displayed directly in the browser.",
  "permissions": [
    "activeTab"
    // Or "scripting" and specify host permissions if needed for broader access
  ],
  "content_scripts": [
    {
      "matches": ["*://*/*"], // Match all http/https pages - refine this later
      "js": ["content.js"], // Your content script file
      "run_at": "document_idle" // Run after the page is mostly loaded
    }
  ]
  // Optional: Add background script if needed for more complex logic
  // "background": {
  //   "service_worker": "background.js"
  // }
}`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            <strong>Explanation:</strong>
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <code>manifest_version: 3</code>: Specifies the architecture version.
            </li>
            <li>
              <code>name</code>, <code>version</code>, <code>description</code>: Basic information.
            </li>
            <li>
              <code>permissions</code>: Defines what your extension can do. <code>"activeTab"</code> is generally safer
              as it grants permission only when the user interacts with the extension on the current tab.
              For automatic formatting on specific URLs, you might need <code>"scripting"</code> along with{" "}
              <code>"host_permissions"</code> like <code className="text-sm">&#x7b;"*://*/*"&#x7d;</code>, but be mindful of the broad scope.
              Let&apos;s stick with <code>"activeTab"</code> for a simpler case or assume we&apos;ll refine `matches`.
            </li>
            <li>
              <code>content_scripts</code>: An array defining scripts to inject into pages.
              <ul className="list-circle pl-6 mt-1 space-y-1">
                 <li><code>matches</code>: URLs where the script should run. <code>"*://*/*"</code> is a wildcard for any HTTP/HTTPS page.
                 You could refine this to specific patterns if you know the API endpoints or file types.</li>
                 <li><code>js</code>: The list of JavaScript files to inject. We&apos;ll have one: <code>content.js</code>.
                 (Note: If writing in TypeScript, you&apos;ll compile to JavaScript).</li>
                 <li><code>run_at</code>: When the script injects. <code>"document_idle"</code> is usually safe, waiting for the page to settle.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <PenLine className="w-6 h-6" /> Step 2: The Content Script (`content.ts`)
          </h2>
          <p>
            This is where the magic happens. The content script will run on matched pages.
            Its main tasks are:
          </p>
          <ol className="list-decimal pl-6 mt-4 space-y-2">
            <li>
              <strong>Detect JSON:</strong> Check if the page content is actually JSON.
            </li>
            <li>
              <strong>Parse JSON:</strong> Convert the raw text into a JavaScript object.
            </li>
            <li>
              <strong>Format & Display:</strong> Create structured HTML to represent the JSON nicely,
              optionally with collapsing/expanding sections.
            </li>
            <li>
              <strong>Replace Content:</strong> Swap the original page content with the formatted HTML.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
            <FileCode className="w-5 h-5" /> Basic Content Script Structure:
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`// content.ts or content.js (after compilation)

// Function to check if the current page's content is likely JSON
function isJsonPage(): boolean {
  // A simple check: does the body content start with '{' or '[' ?
  // This is basic; more robust checks involve checking MIME type in background script
  // or more sophisticated content inspection.
  const bodyContent = document.body.textContent?.trim();
  return bodyContent !== undefined &&
         (bodyContent.startsWith('{') || bodyContent.startsWith('['));
}

// Function to format JSON text
function formatJson(jsonString: string): string {
  try {
    const jsonObject = JSON.parse(jsonString);
    // Use JSON.stringify with indentation for pretty printing
    return JSON.stringify(jsonObject, null, 2); // 2 spaces indentation
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return "Error: Invalid JSON data.";
  }
}

// Helper to escape HTML entities in the JSON string before putting it in <pre>
function escapeHtml(unsafe: string): string {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Function to create HTML structure for the formatted JSON
function createFormattedHtml(formattedJsonString: string): string {
  // This is a very basic example. A real formatter would build nested elements
  // for objects and arrays, add classes for styling, potentially add collapse/expand buttons.
  // For simplicity, we wrap preformatted text in a styled div.
  return \`<div style="font-family: monospace; white-space: pre-wrap; word-break: break-all;">
            <pre>$\{escapeHtml(formattedJsonString)\}</pre>
          </div>\`;
}


// Main logic
if (isJsonPage()) {
  const rawJsonText = document.body.textContent?.trim();
  if (rawJsonText) {
    const formattedText = formatJson(rawJsonText);
    const formattedHtml = createFormattedHtml(formattedText);

    // Clear the original page content and insert the formatted HTML
    document.body.innerHTML = formattedHtml;

    // Optional: Inject CSS for better styling
    injectCss();
  }
}

// Function to inject basic CSS (implemented in the next step)
function injectCss() {
  // This will be implemented in Step 3
  console.log("Injecting CSS...");
}

`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            <strong>Refining JSON Detection:</strong> The <code>isJsonPage()</code> function above is very basic. A more robust approach might involve:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Checking the <code>Content-Type</code> HTTP header. This typically requires a background script or using the <code>webRequest</code> API (if allowed by Manifest V3 in Safari).</li>
            <li>Attempting a <code>JSON.parse</code> within a <code>try&#x7b;...&#x7d;catch</code> block on the page content. If it succeeds, it&apos;s likely valid JSON.</li>
            <li>Looking for specific HTML structures if the JSON is embedded within HTML (less common for raw JSON pages).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
            <Paintbrush className="w-5 h-5" /> Step 3: Adding Styling (`style.css`)
          </h3>
          <p>
            The formatted JSON will look better with some CSS. You can inject CSS in a few ways:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Directly inject a <code>&lt;style&gt;</code> tag</strong> into the head of the document from your content script.
            </li>
            <li>
              <strong>Declare CSS files in `manifest.json`</strong> within the `content_scripts` section (Safari handles this injection automatically). This is the preferred method.
            </li>
          </ul>
          <p className="mt-2">
            Let&apos;s go with the <code>manifest.json</code> approach. First, create a simple CSS file (`style.css`):
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">`style.css` example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`body {
  background-color: #f4f4f4; /* Light background */
  color: #333; /* Dark text */
  line-height: 1.6;
  padding: 20px;
}

pre {
  background-color: #fff; /* White background for code block */
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow-x: auto; /* Add horizontal scroll for long lines */
}

/* Basic syntax highlighting (conceptual - requires more complex logic) */
.json-key { color: #a52a2a; } /* Brown */
.json-string { color: #006400; } /* Dark Green */
.json-number { color: #0000cd; } /* Medium Blue */
.json-boolean { color: #8a2be2; } /* Blue Violet */
.json-null { color: #a0a0a0; } /* Grey */
.json-punctuation { color: #333; } /* Dark grey */
`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            Then, update your `manifest.json` to include this CSS file:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Updated `manifest.json` (Content Scripts section):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["content.js"],
      "css": ["style.css"],
      "run_at": "document_idle"
    }
  ],`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            For actual syntax highlighting, you would need to traverse the parsed JSON object
            and build the HTML structure with nested &lt;span&gt; elements having classes like
            `.json-key`, `.json-string`, etc., and then apply CSS rules to those classes.
            This is a more advanced step for building the HTML output in `createFormattedHtml`.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
             <AlertCircle className="w-6 h-6" /> Challenges and Considerations
           </h2>
           <ul className="list-disc pl-6 mt-4 space-y-2">
             <li>
               <strong>Single Page Applications (SPAs):</strong> If a website is a SPA, the URL might change
               or new content (including JSON) might be loaded dynamically without a full page refresh.
               Your content script, injected at <code>document_idle</code>, might only run once. You&apos;d need to
               observe DOM changes (using <code>MutationObserver</code>) or listen for messages from a background
               script triggered by URL changes to re-check for JSON content.
             </li>
             <li>
               <strong>Large JSON Data:</strong> Parsing and rendering extremely large JSON files can
               cause performance issues or even crash the tab. Consider adding limits or lazy-loading/rendering
               strategies for very large inputs.
             </li>
             <li>
               <strong>Security (XSS):</strong> If you directly insert user-provided or remote content (like
               the JSON string) into the DOM using <code>innerHTML</code>, you MUST properly escape any HTML special
               characters (`&lt;`, `&gt;`, `&amp;`, `&quot;`, `&apos;`). The <code>escapeHtml</code> helper in the example is a basic step
               towards this, but building the DOM structure programmatically using <code>document.createElement</code>
               and <code>textContent</code> is generally safer than manipulating <code>innerHTML</code> with escaped strings.
             </li>
             <li>
               <strong>MIME Type Check:</strong> Relying solely on content sniffing (<code>startsWith(&apos;&#x7b;&apos;)</code> or <code>startsWith(&apos;[&apos;)</code>)
               isn&apos;t foolproof. Checking the <code>Content-Type</code> header (like <code>application/json</code>) is the standard
               way to confirm if a page is serving JSON. This often requires a background script listening
               to <code>webRequest</code> events to inspect headers *before* the page content loads.
             </li>
             <li>
               <strong>Interfering with Websites:</strong> Your content script runs on potentially *any* website.
               Using overly broad <code>matches</code> patterns and manipulating <code>document.body.innerHTML</code> can break
               websites that aren&apos;t raw JSON pages. Refine your <code>matches</code> and add more robust checks
               in <code>isJsonPage</code>. Alternatively, consider making the formatter opt-in (e.g., via a browser action button click)
               rather than automatic.
             </li>
           </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
             <Box className="w-6 h-6" /> Packaging and Testing in Safari
           </h2>
           <p>
             Unlike Chrome or Firefox, building and installing Safari extensions typically involves Xcode.
           </p>
           <ol className="list-decimal pl-6 mt-4 space-y-2">
             <li>
               Open Xcode.
             </li>
             <li>
               Go to File &gt; New &gt; Project...
             </li>
             <li>
               Select the "macOS" tab, then choose the "Safari Extension" template.
             </li>
             <li>
               Follow the prompts to create the project.
             </li>
             <li>
               In the project navigator, you&apos;ll find a folder structure. Typically, you&apos;ll place your `manifest.json`,
               `content.js` (compiled from `content.ts`), and `style.css` files within the appropriate extension bundle
               or source directory as defined by the Xcode project setup. Xcode is the environment that bundles
               these files correctly for Safari.
             </li>
             <li>
               Write your `content.ts` and `style.css`. Use a TypeScript compiler (`tsc`) to compile `content.ts` into `content.js`.
             </li>
             <li>
               In Safari, enable "Show Develop menu in menu bar" (Safari &gt; Settings &gt; Advanced).
             </li>
             <li>
               In the Develop menu, select "Allow Unsigned Extensions".
             </li>
             <li>
               Build and run your extension project from Xcode. This should install and enable your extension in Safari.
             </li>
             <li>
               Navigate to a page that serves raw JSON (you can find examples online or create a local test file).
               If your detection and formatting logic are correct, the page content should be replaced by your
               nicely formatted JSON view.
             </li>
           </ol>
           <p className="mt-4">
             Xcode handles the complexities of signing and packaging for distribution (App Store) or for local testing.
             For development, the "Allow Unsigned Extensions" combined with running directly from Xcode is the standard workflow.
           </p>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCheck className="w-6 h-6" /> Conclusion
          </h2>
          <p>
            Building a Safari extension for JSON formatting is a practical way to learn about browser extension
            development, focusing on content scripts and interacting with page content. While this guide covers
            the core concepts and a basic implementation approach, a production-ready extension would involve more
            robust JSON detection, advanced formatting (syntax highlighting, collapse/expand features), better
            error handling, and careful consideration of performance and compatibility across various websites.
          </p>
          <p className="mt-2">
            Experiment with the content script logic, explore ways to improve the HTML structure and styling,
            and delve deeper into the Safari extension documentation and Manifest V3 specifics to enhance
            your formatter or build more complex browser tools!
          </p>
        </section>

      </div>
    </>
  );
}
