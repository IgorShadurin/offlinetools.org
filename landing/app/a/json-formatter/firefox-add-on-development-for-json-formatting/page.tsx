import type { Metadata } from "next";
import { FileJson, Code, Settings, Check, Info } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Firefox Add-on Development for JSON Formatting",
  description:
    "A guide to creating a Firefox browser extension to automatically format and display JSON data beautifully in the browser.",
};

export default function FirefoxJsonFormatterAddonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="w-8 h-8 text-blue-600" /> Firefox Add-on Development for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          As developers, we often encounter raw JSON data displayed directly in the browser &mdash; whether it&apos;s an
          API response, a configuration file, or data from a web service. The browser&apos;s default display is
          typically a single, unformatted block of text, making it difficult to read, understand, and debug. This is
          where a simple browser add-on can be incredibly useful.
        </p>
        <p>
          This article guides you through the process of creating a basic Firefox add-on that automatically formats JSON
          content displayed in a browser tab, making it structured, readable, and perhaps even syntax-highlighted.
          We&apos;ll focus on the modern Manifest V3 specification.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> Why Build a JSON Formatter Add-on?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Improved Readability:</strong> Turn a single line of JSON into a structured, indented format.
          </li>
          <li>
            <strong>Easier Debugging:</strong> Quickly spot errors or understand the data structure.
          </li>
          <li>
            <strong>Time Saving:</strong> Avoid copying and pasting JSON into external formatters or editors.
          </li>
          <li>
            <strong>Customization:</strong> Tailor the formatting or add features like collapsing sections.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" /> Firefox Add-on Fundamentals (Manifest V3)
        </h2>
        <p>
          Firefox add-ons are built using Web Extensions APIs, which are largely compatible with Chrome Extensions APIs.
          Manifest V3 is the current standard, focusing on security and performance by shifting away from some
          background script capabilities towards service workers and stricter permissions.
        </p>
        <p>Key components for our JSON formatter add-on will include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Manifest File (`manifest.json`):</strong> This is the blueprint of your add-on. It contains metadata
            (name, version, description), permissions, and defines which scripts or pages the add-on uses.
          </li>
          <li>
            <strong>Content Scripts:</strong> JavaScript files that run in the context of a specific web page. They can
            read and modify the DOM of the pages they are injected into. This is our primary tool for finding and
            formatting the JSON displayed on a page.
          </li>
          <li>
            <strong>Permissions:</strong> Declared in the manifest, these grant the add-on the ability to perform
            certain actions (e.g., access tabs, modify pages).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-500" /> Core Strategy: Injecting a Content Script
        </h2>
        <p>
          How do we detect if a page is displaying raw JSON and then modify it? The most straightforward approach for
          simply formatting JSON that&apos;s already *displayed* in the browser (typically within a{" "}
          <code>&lt;pre&gt;</code> tag or as the sole content of the body) is to use a <strong>Content Script</strong>.
        </p>
        <p>
          The content script will be configured to run on pages that match certain URL patterns (e.g., URLs ending in
          `.json` or specific API endpoints). Once injected into a page, the script will:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Examine the page&apos;s content (the DOM).</li>
          <li>
            Identify elements that likely contain the raw JSON text (like the <code>&lt;body&gt;</code> or{" "}
            <code>&lt;pre&gt;</code> tag).
          </li>
          <li>Extract the text content.</li>
          <li>Attempt to parse the text as JSON.</li>
          <li>If successful, format the parsed JSON data.</li>
          <li>Replace the original unformatted content in the DOM with the new formatted content.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" /> The Manifest File (`manifest.json`)
        </h2>
        <p>
          This file tells Firefox about your add-on. For our formatter, we need to declare the add-on&apos;s name,
          version, manifest version, and crucially, the content scripts and necessary permissions.
        </p>
        <p>Here&apos;s a basic example:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-json">
              {`{
  "manifest_version": 3,
  "name": "Simple JSON Formatter",
  "version": "1.0",
  "description": "Formats raw JSON displayed in browser tabs.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "content-script.js"
      ],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "48": "icons/json-48.png",
    "96": "icons/json-96.png"
  }
}`}
            </code>
          </pre>
        </div>
        <p>Let&apos;s break down the key parts:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>&quot;manifest_version&quot;: 3</code>: Specifies the add-on manifest standard.
          </li>
          <li>
            <code>&quot;name&quot;</code>, <code>&quot;version&quot;</code>, <code>&quot;description&quot;</code>:
            Standard add-on metadata.
          </li>
          <li>
            <code>&quot;permissions&quot;</code>:
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>
                <code>&quot;activeTab&quot;</code>: Grants temporary access to the currently active tab when the user
                interacts with the add-on (like clicking a browser action icon), although not strictly needed if the
                script runs automatically on page load.
              </li>
              <li>
                <code>&quot;scripting&quot;</code>: Required in MV3 to inject content scripts programmatically or
                declare them statically in the manifest.
              </li>
            </ul>
          </li>
          <li>
            <code>&quot;content_scripts&quot;</code>: Defines the scripts to inject into web pages.
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>
                <code>&quot;matches&quot;: ["&lt;all_urls&gt;"]</code>: This is a broad pattern, injecting the script
                into all HTTP and HTTPS pages. You might want to narrow this down (e.g., to URLs ending in `.json`)
                depending on your needs, but starting broad allows checking more pages.
              </li>
              <li>
                <code>&quot;js&quot;: ["content-script.js"]</code>: The path to your content script file(s).
              </li>
              <li>
                <code>&quot;run_at&quot;: &quot;document_idle&quot;</code>: Injects the script after the DOM is ready
                and resources are loaded. Other options include `document_start` and `document_end`.
              </li>
            </ul>
          </li>
          <li>
            <code>&quot;icons&quot;</code>: Paths to icons for your add-on.
          </li>
        </ul>
        <p>
          <Info className="inline w-4 h-4 mr-1 text-blue-500" /> Note: Using <code>&lt;all_urls&gt;</code> requires
          careful content script implementation to avoid interfering with normal web pages that do *not* contain JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-500" /> The Content Script (`content-script.js`)
        </h2>
        <p>This script will contain the logic to find, parse, and format the JSON.</p>
        <p>
          A simple script might look for a <code>&lt;pre&gt;</code> element (which browsers often use to display raw
          response bodies) or check the entire document body.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-javascript">
              {`// content-script.js

function formatJson() {
  let jsonText = null;
  let targetElement = null;

  // Check if the page content is just plain text, likely JSON
  // This often appears inside a PRE tag, or as the only content in the BODY
  const preElement = document.querySelector('body > pre');

  if (preElement) {
    jsonText = preElement.textContent;
    targetElement = preElement;
  } else if (document.body && document.body.children.length === 0 && document.body.textContent.trim().startsWith('{') || document.body.textContent.trim().startsWith('[')) {
    // Check if body has no children and looks like JSON
     jsonText = document.body.textContent;
     targetElement = document.body;
  } else {
    // If it's not a raw JSON page displayed simply, don't do anything
    return;
  }


  if (!jsonText) {
    return; // No text found
  }

  try {
    const jsonObj = JSON.parse(jsonText);

    // Use JSON.stringify for basic indentation
    // The third argument (2 here) is the number of spaces for indentation
    const formattedJson = JSON.stringify(jsonObj, null, 2);

    // Create a new PRE element to hold the formatted JSON
    const formattedPre = document.createElement('pre');
    formattedPre.textContent = formattedJson; // Set the formatted text

    // Optional: Add some basic styling or a class for CSS
    formattedPre.style.cssText = 'outline: 1px solid #ccc; padding: 10px; margin: 10px; background-color: #f4f4f4;';
    formattedPre.className = 'json-formatter'; // Add a class for potential external CSS

    // Replace the original content with the formatted content
    // This is a simple replacement; a more complex formatter might build a DOM tree
    if (targetElement) {
        // Clear existing content
        while (targetElement.firstChild) {
            targetElement.removeChild(targetElement.firstChild);
        }
        // Append the new formatted content
        targetElement.appendChild(formattedPre);
    } else {
        // Fallback if targetElement is null (shouldn't happen with checks above)
        document.body.innerHTML = ''; // Clear body
        document.body.appendChild(formattedPre); // Add formatted
    }


    console.log('JSON formatted successfully.');

  } catch (e) {
    console.error('Failed to parse or format JSON:', e);
    // Optional: Display an error message on the page
    // Or revert the content if it was modified before catching the error
  }
}

// Run the formatter when the script is loaded
formatJson();
`}
            </code>
          </pre>
        </div>
        <p>
          This script performs a basic check for <code>&lt;pre&gt;</code> tags or a body that looks like raw JSON,
          attempts parsing, and replaces the content with a nicely indented string using{" "}
          <code>JSON.stringify(obj, null, 2)</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">Enhancements for the Content Script</h3>
        <p>
          A simple <code>JSON.stringify</code> is functional, but you can go further:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax Highlighting:</strong> Integrate a small client-side syntax highlighter library (be mindful
            of add-on size). You would parse the JSON, then pass the resulting object/string to the highlighter library,
            and inject its generated HTML into the page.
          </li>
          <li>
            <strong>Collapsible Sections:</strong> For large JSON objects/arrays, create a DOM structure that allows
            users to collapse and expand sections. This requires building the HTML tree manually based on the parsed
            JSON object, rather than just using <code>JSON.stringify</code>.
          </li>
          <li>
            <strong>Error Display:</strong> If <code>JSON.parse</code> fails, clearly indicate on the page that the
            content is not valid JSON and show the error.
          </li>
          <li>
            <strong>Handling MIME Types:</strong> Instead of <code>&lt;all_urls&gt;</code>, you could try to detect the{" "}
            <code>Content-Type</code> header using the
            <code>webRequest</code> API (in a background script) and only inject the content script if the type is
            `application/json`. However, the `webRequest` API has limitations in MV3 regarding blocking/modifying
            requests, so modifying the DOM via content scripts after the page loads is often simpler for display
            purposes.
          </li>
        </ul>
        <p>
          <Info className="inline w-4 h-4 mr-1 text-blue-500" /> Be cautious about using large external libraries in
          content scripts as they can impact page performance and add-on size. Lightweight, specialized libraries are
          best.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-blue-500" /> Development and Debugging
        </h2>
        <p>Developing Firefox add-ons is straightforward:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Save your <code>manifest.json</code> and <code>content-script.js</code> files (and any icons) in a folder.
          </li>
          <li>
            Open Firefox. Navigate to <code>about:debugging#/runtime/this-firefox</code>.
          </li>
          <li>
            Click &quot;Load Temporary Add-on...&quot; and select any file inside your add-on&apos;s folder (like{" "}
            <code>manifest.json</code>).
          </li>
          <li>Your add-on will be installed temporarily until you close Firefox.</li>
          <li>
            Open a new tab and navigate to a URL that displays raw JSON (e.g., a public API endpoint like{" "}
            <a
              href="https://jsonplaceholder.typicode.com/todos/1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              https://jsonplaceholder.typicode.com/todos/1
            </a>
            ).
          </li>
          <li>
            Check if the JSON is formatted. You can use the Browser Console (F12 or Cmd+Option+J) and switch to the
            &quot;Extensions&quot; tab to see console logs from your content script.
          </li>
        </ol>
        <p>This temporary loading method is essential for rapid iteration and debugging.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> Understanding Permissions
        </h2>
        <p>
          The <code>&quot;permissions&quot;</code> field in the manifest is crucial.
          <code>&quot;scripting&quot;</code> is needed to inject scripts. <code>&quot;activeTab&quot;</code>
          is a common permission that grants access to the current tab only when the user invokes the extension (like
          clicking a browser action). If your script should run automatically on matching pages without user interaction
          (as in our example using `content_scripts` declared in the manifest), <code>&quot;scripting&quot;</code>
          along with <code>&quot;matches&quot;</code> in the `content_scripts` section is sufficient and more
          appropriate than relying solely on `activeTab`.
        </p>
        <p>
          Always request the minimum permissions necessary for your add-on to function. Broad permissions like{" "}
          <code>&lt;all_urls&gt;</code> or access to sensitive APIs require careful consideration and clear
          justification to users.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-blue-500" /> Conclusion
        </h2>
        <p>
          Building a Firefox add-on to format JSON is a practical introduction to browser extension development using
          the modern Manifest V3 standard. It involves defining the add-on&apos;s capabilities in the manifest file and
          writing content scripts to interact with web page content. While a basic formatter is relatively simple, the
          functionality can be significantly enhanced with syntax highlighting, collapsible sections, and more robust
          content detection. This project provides a solid foundation for developing more complex browser tools.
        </p>
      </div>
    </>
  );
}
