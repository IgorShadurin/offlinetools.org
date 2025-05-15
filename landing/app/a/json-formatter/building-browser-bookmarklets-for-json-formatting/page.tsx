import type { Metadata } from "next";
import { Lightbulb, Code, Check, Info, Book, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Browser Bookmarklets for JSON Formatting | Offline Tools",
  description:
    "Learn how to create simple browser bookmarklets using JavaScript to quickly format raw JSON directly in your browser.",
};

export default function JsonFormatterBookmarkletArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Book size={36} className="text-blue-500" />
        Building Browser Bookmarklets for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Working with APIs, logs, or configuration files often means encountering raw, unformatted JSON data. While many online tools and browser extensions exist for formatting JSON, building a simple{" "}
          <strong>bookmarklet</strong> offers a quick, tool-independent way to clean up that data directly in your browser window. This article will guide you through creating a basic JSON formatter bookmarklet using plain JavaScript.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} className="text-green-500" /> What is a Bookmarklet?
        </h2>
        <p>
          A bookmarklet is a bookmark stored in a web browser that contains JavaScript code instead of a URL. When you click a bookmarklet, the JavaScript code is executed on the currently open page. This allows you to add custom functionality or modify the page's content dynamically.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} className="text-purple-500" /> The Core JavaScript: Parsing and Stringifying
        </h2>
        <p>
          The magic behind formatting JSON in JavaScript lies in two built-in methods:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>JSON.parse(text)</code>: Takes a JSON string and transforms it into a JavaScript object or array.
          </li>
          <li>
            <code>JSON.stringify(object, replacer, space)</code>: Takes a JavaScript object or array and converts it back into a JSON string.
          </li>
        </ul>
        <p>
          The key for formatting is the third argument of <code>JSON.stringify</code>: <code>space</code>. This argument specifies the number of spaces or the string to use for indentation. Using <code>null</code> for the <code>replacer</code> and <code>2</code> for the <code>space</code> is a common way to get human-readable, indented output.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Basic Formatting Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const rawJsonString = '{"name":"Alice","age":30,"city":"New York"}';

try {
  // Parse the raw JSON string into a JavaScript object
  const jsonObject = JSON.parse(rawJsonString);

  // Stringify the object back into a formatted JSON string
  const formattedJsonString = JSON.stringify(jsonObject, null, 2);

  console.log(formattedJsonString);
  /* Output:
{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}
  */

} catch (error) {
  console.error("Failed to parse JSON:", error);
}
`}
            </pre>
          </div>
        </div>
        <p>
          This simple pattern of parse then stringify is the foundation of our bookmarklet.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} className="text-yellow-500" /> Crafting the Bookmarklet URL
        </h2>
        <p>
          A bookmarklet URL starts with the <code>javascript:</code> pseudo-protocol, followed by the JavaScript code you want to execute.
        </p>
        <p>
          All the code must be on a single line and properly encoded for use in a URL. However, browsers are quite forgiving, and often basic minification and wrapping in an Immediately Invoked Function Expression (IIFE) is sufficient.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Bookmarklet Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`javascript:(function() { /* Your JavaScript code here */ })();`}
            </pre>
          </div>
        </div>
        <p>
          Wrapping the code in an IIFE <code>(function()&#x7b;...&#x7d;)()</code> is a good practice to prevent variables from polluting the global scope of the page you're running it on. The <code>javascript:</code> prefix tells the browser to execute the code that follows instead of navigating to a new page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} className="text-purple-500" /> Building the Basic Formatter Bookmarklet
        </h2>
        <p>
          For a straightforward bookmarklet, let's assume you are on a page where the primary content is the raw JSON text (e.g., viewing a JSON file directly in the browser, or an API response displayed as plain text). The bookmarklet will grab the text content of the page body, attempt to parse and format it, and then replace the entire page's content with the formatted result.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Info size={20} className="text-blue-500" /> Step 1: Get the Raw JSON
        </h3>
        <p>
          We can get the text content of the entire page body using <code>document.body.textContent</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const rawJsonString = document.body.textContent;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" /> Step 2: Parse and Format (with Error Handling)
        </h3>
        <p>
          It's crucial to include error handling in case the page content is not valid JSON. A <code>try...catch</code> block is perfect for this.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`let formattedJsonString;
try {
  const jsonObject = JSON.parse(rawJsonString);
  formattedJsonString = JSON.stringify(jsonObject, null, 2);
} catch (error) {
  formattedJsonString = "Error: Could not parse JSON.\\nDetails: " + error.message;
  console.error("JSON Parsing Error:", error); // Log error to console as well
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" /> Step 3: Display the Result
        </h3>
        <p>
          Replace the current page content with the formatted string or the error message. To make it look like formatted code, we can replace the entire HTML content with a simple structure containing a <code>&lt;pre&gt;</code> tag.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`document.documentElement.innerHTML = ''; // Clear existing content
const pre = document.createElement('pre');
pre.textContent = formattedJsonString;
document.body.appendChild(pre);
document.body.style.margin = '20px'; // Add some margin
document.body.style.whiteSpace = 'pre-wrap'; // Ensure wrapping for long lines`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code size={20} className="text-purple-500" /> Step 4: Combine and Minify
        </h3>
        <p>
          Now, let's put all the pieces inside the IIFE and add the <code>javascript:</code> prefix. We'll remove comments and line breaks to get a single line of code.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Raw JavaScript Code:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`(function() &#x7b;
  const rawJsonString = document.body.textContent.trim();
  let formattedJsonString;

  if (!rawJsonString) &#x7b;
    formattedJsonString = "No text content found on the page.";
  &#x7d; else &#x7b;
    try &#x7b;
      const jsonObject = JSON.parse(rawJsonString);
      formattedJsonString = JSON.stringify(jsonObject, null, 2);
    &#x7d; catch (error) &#x7b;
      formattedJsonString = "Error: Could not parse JSON.\\nDetails: " + error.message;
      console.error("JSON Parsing Error:", error);
    &#x7d;
  &#x7d;

  document.documentElement.innerHTML = '<head><title>Formatted JSON</title></head><body><pre></pre></body>';
  const pre = document.querySelector('pre');
  pre.textContent = formattedJsonString;
  document.body.style.margin = '20px';
  document.body.style.whiteSpace = 'pre-wrap';
  document.body.style.wordWrap = 'break-word'; // Added for better wrapping
})();`}
            </pre>
          </div>
        </div>
        <p>
          Minifying this (removing extra whitespace, comments) and putting it after <code>javascript:</code> gives us the bookmarklet URL.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">The Bookmarklet URL (Example, actual code minified):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm break-all">
            <code className="font-mono">
              javascript:(function()&#x7b;document.documentElement.innerHTML='';var pre=document.createElement('pre');pre.style.cssText='word-wrap: break-word; white-space: pre-wrap;';var rawJson=document.body.textContent.trim();var formattedJson='No text content found on the page.';try&#x7b;if(rawJson)&#x7b;formattedJson=JSON.stringify(JSON.parse(rawJson),null,2);&#x7d;&#x7d;catch(e)&#x7b;formattedJson='Error: Could not parse JSON.\\nDetails: '+e.message;console.error('JSON Parsing Error:',e);&#x7d;pre.textContent=formattedJson;document.body.appendChild(pre);document.body.style.margin='20px';&#x7d;)();
            </code>
          </div>
        </div>
        <p>
          <Info size={20} className="inline mr-1 text-blue-500" /> Note: The bookmarklet code shown above in the <code>&lt;code&gt;</code> block is a minified version of the raw JavaScript. You would use this single line, starting with <code>javascript:</code>, as the URL for your bookmarklet.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} className="text-yellow-500" /> How to Install and Use
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Create a new bookmark:</strong> In your browser's bookmark manager or by dragging the current page's icon to the bookmarks bar.
          </li>
          <li>
            <strong>Edit the bookmark:</strong> Right-click the new bookmark and select "Edit" (or equivalent).
          </li>
          <li>
            <strong>Name it:</strong> Give it a descriptive name like "Format JSON".
          </li>
          <li>
            <strong>Paste the code as the URL:</strong> Copy the full bookmarklet code (starting with <code>javascript:</code>) from the previous step and paste it into the URL field, replacing the existing URL.
          </li>
          <li>
            <strong>Save:</strong> Save the bookmark.
          </li>
        </ol>
        <p>
          To use it, navigate to a page containing raw JSON text. Then, simply click the "Format JSON" bookmarklet from your bookmarks bar or menu. The page content should be replaced with the formatted JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} className="text-green-500" /> Variations and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Formatting Options:</strong> You can easily change the indentation (e.g., <code>JSON.stringify(jsonObject, null, 4)</code> for 4 spaces, or <code>JSON.stringify(jsonObject, null, '\\t')</code> for tabs).
          </li>
          <li>
            <strong>Targeting Specific Elements:</strong> Instead of using <code>document.body.textContent</code>, you could modify the script to look for JSON within a specific HTML element (e.g., an element with a certain ID or class), though this makes the bookmarklet less generic.
          </li>
          <li>
            <strong>Copy to Clipboard:</strong> Instead of replacing the page content, the bookmarklet could copy the formatted JSON to the user's clipboard using the{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Clipboard API
            </a>
            (<code>navigator.clipboard.writeText(...)</code>), which might be more convenient in many cases.
          </li>
          <li>
            <strong>Handling Large JSON:</strong> For very large JSON strings, parsing and re-stringifying can be slow or even crash the tab. Bookmarklets are best suited for moderately sized data.
          </li>
          <li>
            <strong>Page Structure:</strong> This basic bookmarklet works best on pages that consist almost entirely of the raw JSON text. Running it on complex web pages with lots of HTML and other content might yield unpredictable results as <code>document.body.textContent</code> will grab everything.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Book size={24} className="text-blue-500" /> Conclusion
        </h2>
        <p>
          Building a JSON formatting bookmarklet is a great way to understand how bookmarklets work and leverage simple browser APIs like <code>JSON.parse</code> and <code>JSON.stringify</code>. It provides a handy, portable tool that you can use across different websites without needing to install extensions or paste sensitive data into third-party online formatters. While basic, the core logic can be extended to handle different scenarios and add more features.
        </p>
      </div>
    </>
  );
}
