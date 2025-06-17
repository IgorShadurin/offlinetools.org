import type { Metadata } from "next";
import { Code, FileJson2, Wrench, Eye, Boxes } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Embedding JSON Formatters in Custom Applications",
  description: "Learn how to integrate JSON formatting capabilities into your custom web or desktop applications.",
};

export default function EmbedJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="w-8 h-8 text-blue-500" />
        Embedding JSON Formatters in Custom Applications
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and in many
          other applications. While developers often interact with JSON via APIs or configuration files, there are many
          scenarios where presenting JSON data in a human-readable, formatted way directly within a custom application
          is highly beneficial. This article explores the concepts and approaches to embedding JSON formatters into your
          own software.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="w-6 h-6 text-green-500" />
          Why Embed a JSON Formatter?
        </h2>
        <p>
          Embedding a JSON formatter allows you to display raw JSON data cleanly and structure within your
          application&apos;s user interface. This is particularly useful for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Debugging and Inspection:</strong> Allowing users or developers to view the exact structure and
            content of JSON payloads received from APIs or generated internally.
          </li>
          <li>
            <strong>Configuration Editors:</strong> Providing a user-friendly way to edit application settings stored in
            JSON format.
          </li>
          <li>
            <strong>Data Visualization Prep:</strong> Displaying complex data structures before processing or
            visualization.
          </li>
          <li>
            <strong>Educational Tools:</strong> Helping users understand the structure of JSON.
          </li>
        </ul>
        <p>
          A well-formatted JSON string includes indentation, line breaks, and consistent spacing, making nested objects
          and arrays easy to follow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="w-6 h-6 text-purple-500" />
          What Does "Formatting" Involve?
        </h2>
        <p>
          At its core, JSON formatting involves taking a raw JSON string and producing a new string that represents the
          same data but with added whitespace (spaces, tabs, newlines) to improve readability. The standard
          pretty-printing typically follows rules like:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Each key-value pair in an object is on a new line.</li>
          <li>Each element in an array is on a new line.</li>
          <li>Nested objects and arrays are indented further than their parent.</li>
          <li>A colon (`:`) separating a key and value is followed by a space.</li>
          <li>Commas (`,`) separating items are followed by a newline.</li>
        </ul>
        <p>Optionally, formatting can also include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Syntax highlighting (coloring keys, strings, numbers, booleans, etc.).</li>
          <li>Collapsible sections for objects and arrays.</li>
          <li>Line numbers.</li>
        </ul>
        <p>
          While the advanced features often require parsing the JSON into a data structure and then recursively
          rendering elements, basic indentation can sometimes be achieved directly via string manipulation or built-in
          functions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-orange-500" />
          Approaches to Embedding a Formatter
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Using Built-in Functions (`JSON.stringify`)</h3>
        <p>
          The simplest approach in JavaScript environments (including browsers and Node.js) is to leverage the native
          `JSON.stringify()` method, which includes optional parameters for formatting.
        </p>
        <p>
          The signature is typically `JSON.stringify(value, replacer, space)`. The `space` parameter is key for
          formatting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using JSON.stringify for Basic Formatting</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`const rawJsonString = '&#x7b;"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"],"address":null&#x7d;';

try {
  // First, parse the string into a JavaScript object/array
  const jsonObj = JSON.parse(rawJsonString);

  // Then, stringify it back with formatting
  // The third argument (2) is the number of spaces for indentation
  const formattedJsonString = JSON.stringify(jsonObj, null, 2);

  console.log("--- Raw JSON ---");
  console.log(rawJsonString);
  console.log("\\n--- Formatted JSON (2 spaces) ---");
  console.log(formattedJsonString);

  // You can also use a string for indentation, e.g., '\\t' for tabs
  const formattedJsonStringWithTabs = JSON.stringify(jsonObj, null, '\\t');
  console.log("\\n--- Formatted JSON (Tabs) ---");
  console.log(formattedJsonStringWithTabs);

} catch (error) {
  console.error("Error parsing or stringifying JSON:", error.message);
}`}
            </pre>
          </div>
        </div>
        <p>
          This method is excellent for basic indentation and is built-in, requiring no external code. However, it
          doesn&apos;t provide features like syntax highlighting or collapsibility out of the box. To display this
          formatted string in a web page, you would typically put it inside a `&lt;pre&gt;` tag to preserve whitespace.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Building a Custom Formatter</h3>
        <p>
          If you need more advanced features like syntax highlighting, collapsibility, or specific handling of data
          types, you&apos;ll need to build a custom formatter. This involves:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing:</strong> Use `JSON.parse()` to convert the raw JSON string into a JavaScript object or
            array.
          </li>
          <li>
            <strong>Traversing:</strong> Recursively walk through the parsed data structure (objects and arrays).
          </li>
          <li>
            <strong>Rendering/Formatting:</strong> As you traverse, build the output string or a structure that
            represents the formatted JSON. This is where you apply indentation, add syntax highlighting classes (if
            rendering HTML), and potentially add markers for collapsibility.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Custom Formatter Logic (Pseudo-Code/Structure)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`function formatValue(value, indentLevel) {
  const indent = '  '.repeat(indentLevel); // Using 2 spaces for example

  if (value === null) {
    return \`\${indent}null\`; // Add class for 'null' highlighting
  }

  const type = typeof value;

  if (type === 'number' || type === 'boolean') {
    return \`\${indent}\${value}\`; // Add class for number/boolean highlighting
  }

  if (type === 'string') {
    // Escape quotes and backslashes in the string itself
    const escapedString = JSON.stringify(value);
    return \`\${indent}\${escapedString}\`; // Add class for string highlighting
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
        return \`\${indent}[\` + /* optional collapse icon */ + \`]\`;
    }
    const elements = value.map(item =>
      formatValue(item, indentLevel + 1).trimStart() // Format element, then remove its leading indent
    );
    return \`\${indent}[\` + /* optional collapse icon */ + \`\\n\${elements.join(',\\n')}\\n\${indent}]\`;
  }

  if (type === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
        return \`\${indent}{\` + /* optional collapse icon */ + \`}\`;
    }
    const entries = keys.map(key => {
      const formattedKey = JSON.stringify(key); // Keys are always strings in JSON
      const formattedValue = formatValue(value[key], indentLevel + 1);
      return \`\${indent}  \${formattedKey}: \${formattedValue.trimStart()}\`; // Add class for key highlighting
    });
    return \`\${indent}{\` + /* optional collapse icon */ + \`\\n\${entries.join(',\\n')}\\n\${indent}}\`;
  }

  // Should not happen with valid JSON, but handle other types
  return \`\${indent}UnsupportedType\`;
}

function customJsonFormatter(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        // Start formatting from the root value with indent level 0
        return formatValue(data, 0);
    } catch (error) {
        return \`Error parsing JSON: \${error.message}\`;
    }
}

// Example Usage (Conceptual):
// const jsonInput = '&#x7b;"user":&#x7b;"name":"Bob","age":25&#x7d;,"items":[10,true,null],"active":true&#x7d;';
// const formattedOutput = customJsonFormatter(jsonInput);
// console.log(formattedOutput); // Output the manually formatted string`}
            </pre>
          </div>
        </div>
        <p>
          This conceptual example shows the recursive nature of traversing the structure and building the output string
          with indentation. In a real application displaying HTML, instead of returning a string, you might return JSX
          elements, applying CSS classes for colors and adding elements like `&lt;span&gt;` with click handlers for
          collapsing sections.
        </p>
        <p>
          Implementing syntax highlighting involves wrapping different parts of the output (keys, strings, numbers,
          booleans, null, punctuation like &#x7b;, &#x7d;, [, ], :, ,) in HTML elements (like `&lt;span&gt;`) with
          specific CSS classes (e.g., `.json-key`, `.json-string`, `.json-number`).
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Leveraging Existing Libraries (Conceptually)</h3>
        <p>
          While this article focuses on embedding *without* external libraries (except Lucide for icons), it&apos;s
          important to know that many robust, feature-rich JSON viewer/formatter libraries exist for various frameworks
          (React, Vue, Angular) and vanilla JavaScript. These libraries handle parsing, traversal, rendering, syntax
          highlighting, collapsibility, search, and large file performance complexities for you.
        </p>
        <p>
          If you were allowed to use them, integrating such a library would typically involve installing it and passing
          your JSON data (either as a string or parsed object) to a component or function provided by the library. This
          saves significant development time but adds an external dependency.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Boxes className="w-6 h-6 text-blue-500" />
          Displaying the Output
        </h2>
        <p>
          Once you have the formatted JSON string (either from `JSON.stringify` or your custom formatter), displaying it
          in your application interface is crucial.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>For simple formatting:</strong> Use the `&lt;pre&gt;` tag to preserve whitespace and line breaks.
            Inside `&lt;pre&gt;`, use a `&lt;code&gt;` tag.
          </li>
          <li>
            <strong>For custom formatting with HTML/JSX:</strong> The custom formatter would directly generate JSX
            elements (e.g., nested `&lt;div&gt;`s, `&lt;span&gt;`s with classes). Render these elements directly in your
            component. You&apos;d likely need CSS to style the indentation and syntax highlighting colors.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Displaying Formatted JSON in JSX</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// Assume formattedJsonString contains the output from JSON.stringify(..., 2)
// or a string from a custom formatter that produces plain text output with newlines/spaces

&lt;div className="json-container bg-neutral-50 dark:bg-neutral-800 p-4 rounded"&gt;
  &lt;pre className="text-sm overflow-x-auto"&gt;
    &lt;code&gt;
      {/* Render the pre-formatted string */}
      {\`&#x7b;\\n  "name": "Alice",\\n  "age": 30,\\n  "isStudent": false,\\n  "courses": [\\n    "Math",\\n    "Science"\\n  ],\\n  "address": null\\n&#x7d;\`}
    &lt;/code&gt;
  &lt;/pre&gt;
&lt;/div&gt;

{/* Example if your custom formatter produced JSX directly */}
{/* This would require a different structure where formatValue returns JSX, not a string */}
{/*
&lt;div className="json-container"&gt;
  &lt;div style=&#x7b;{ marginLeft: '0px' }&#x7d;&gt;
    &lt;span className="json-punctuation"&gt;&#x7b;&lt;/span&gt;
    &lt;br/&gt;
    &lt;div style=&#x7b;{ marginLeft: '20px' }&#x7d;&gt;
      &lt;span className="json-key"&gt;"name"&lt;/span&gt;
      &lt;span className="json-punctuation"&gt;: &lt;/span&gt;
      &lt;span className="json-string"&gt;"Alice"&lt;/span&gt;
      &lt;span className="json-punctuation"&gt;,&lt;/span&gt;
      &lt;br/&gt;
      &lt;span className="json-key"&gt;"age"&lt;/span&gt;
      &lt;span className="json-punctuation"&gt;: &lt;/span&gt;
      &lt;span className="json-number"&gt;30&lt;/span&gt;
      &lt;span className="json-punctuation"&gt;,&lt;/span&gt;
      &lt;br/&gt;
      // ... more elements ...
    &lt;/div&gt;
    &lt;span className="json-punctuation"&gt;&#x7d;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
*/}
`}
            </pre>
          </div>
        </div>
        <p>
          When building a custom formatter that outputs JSX, you need to carefully manage indentation using CSS (like
          `marginLeft`) and apply different classes for different JSON data types to style them visually. Handling large
          JSON can become a performance consideration with custom formatters, potentially requiring virtualization or
          lazy rendering techniques.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Embedding a JSON formatter into your custom application can significantly enhance the user or developer
          experience when dealing with JSON data. For basic needs, the built-in `JSON.stringify` with the `space`
          parameter offers a simple and effective solution. For more advanced features like syntax highlighting and
          collapsibility, a custom formatter built by parsing and recursively traversing the JSON structure is
          necessary. While building a custom formatter requires more effort, it gives you complete control over the
          presentation. Understanding these approaches allows you to choose the right method based on the complexity and
          features required for your specific application&apos;s needs.
        </p>
      </div>
    </>
  );
}
