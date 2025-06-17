import type { Metadata } from "next";
import {
  CodeXml,
  Sparkles,
  Eye,
  Paintbrush,
  Wrench,
  Package,
  List,
  Check,
  X,
  Info,
  Search,
  Columns2,
} from "lucide-react";
import Image from "next/image"; // Only allowed icons

export const metadata: Metadata = {
  title: "JSON Formatter Plugins for Popular Web Frameworks",
  description:
    "Explore how JSON formatter plugins enhance developer experience and readability in popular web frameworks like React, Vue, and Angular.",
};

export default function JsonFormatterPluginsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Formatter Plugins for Popular Web Frameworks</h1>

      <div className="space-y-6 text-lg">
        <p>
          In web development, dealing with JSON data is ubiquitous. Whether it's fetching API responses, debugging data
          structures, or simply displaying configuration, presenting JSON in a readable, structured format is crucial.
          While browsers have built-in JSON viewers, integrating this functionality directly into your application's UI,
          especially within complex web frameworks, often requires dedicated tools. This is where JSON formatter plugins
          and components shine.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="inline-block" /> The Need for Readable JSON in UIs
        </h2>
        <p>
          Raw JSON strings, especially large or deeply nested ones, are notoriously difficult for humans to read. Key
          issues include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Lack of Indentation:</strong> Without proper spacing, the hierarchical structure is lost.
          </li>
          <li>
            <strong>Monochromatic Text:</strong> Everything looks the same, making it hard to distinguish keys, values,
            arrays, or objects.
          </li>
          <li>
            <strong>Long Lines:</strong> Unformatted JSON is often a single, sprawling line.
          </li>
        </ul>
        <p>
          A good JSON formatter in the UI addresses these problems, making debugging, development, and data inspection
          much more efficient and less error-prone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Paintbrush className="inline-block" /> What JSON Formatters Do
        </h2>
        <p>
          JSON formatters take a JSON string or object and render it in a structured, easy-to-read format. Common
          features include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Columns2 className="inline-block mr-1 text-blue-500" /> <strong>Indentation:</strong> Adding whitespace to
            reflect nesting depth. A common standard is 2 or 4 spaces per level.
          </li>
          <li>
            <Sparkles className="inline-block mr-1 text-yellow-500" /> <strong>Syntax Highlighting:</strong> Coloring
            different parts of the JSON (keys, strings, numbers, booleans, null, punctuation) to improve readability.
          </li>
          <li>
            <List className="inline-block mr-1 text-green-500" /> <strong>Collapsible Sections:</strong> Allowing users
            to collapse and expand objects (<code>&#x7b;...&#x7d;</code>) and arrays (<code>[...]</code>) to navigate
            large data structures.
          </li>
          <li>
            <Search className="inline-block mr-1 text-purple-500" /> <strong>Search Functionality:</strong> Enabling
            quick searching for keys or values within the formatted data.
          </li>
          <li>
            <strong>Copying:</strong> Providing easy ways to copy parts of or the whole formatted JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="inline-block" /> Basic Formatting with Pure JavaScript
        </h2>
        <p>
          Before diving into framework-specific solutions, it's worth noting that the core formatting (indentation) can
          be achieved with the built-in <code>JSON.stringify()</code> method:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const rawJsonString = '{"name":"Alice","age":30,"city":"New York","isStudent":false,"courses":["Math","Science"],"address":{"street":"123 Main St","zip":"10001"}}';

const jsonObject = JSON.parse(rawJsonString);

// Format with 2 spaces indentation
const formattedJson = JSON.stringify(jsonObject, null, 2);

console.log(formattedJson);
/* Output:
{
  "name": "Alice",
  "age": 30,
  "city": "New York",
  "isStudent": false,
  "courses": [
    "Math",
    "Science"
  ],
  "address": {
    "street": "123 Main St",
    "zip": "10001"
  }
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          The third argument to <code>JSON.stringify()</code> controls the indentation. <code>null</code> is used for
          the replacer argument (which we don't need here). While this gives basic indentation, it doesn't provide
          syntax highlighting, collapsing, or other advanced UI features needed in a typical application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="inline-block" /> Plugins & Components in Popular Frameworks
        </h2>
        <p>
          Frameworks like React, Vue, and Angular encourage component-based architectures. JSON formatters are often
          provided as reusable components that accept JSON data (either as an object or a string) as a prop and render
          the formatted output. These components encapsulate the formatting logic, syntax highlighting engine, and
          potentially collapsible/search features.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React logo"
            className="inline-block w-6 h-6"
          />{" "}
          React
        </h3>
        <p>
          In React, JSON formatter functionality is typically provided as a React component. Developers install a
          library that provides a component (e.g., <code>&lt;ReactJson /&gt;</code> from <code>react-json-view</code>,
          or components from other libraries) and simply pass the JSON data to it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual React Usage:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import React from 'react';
// Assume a component like 'JsonViewer' from an installed library
// import JsonViewer from 'some-json-viewer-library';

interface DataItem {
  id: number;
  name: string;
  details: { value: any }[];
}

const myComplexData: DataItem = {
  id: 1,
  name: "Sample Item",
  details: [
    { value: 100 },
    { value: "hello" },
    { value: true },
    { value: null },
    { value: [1, 2, 3] }
  ]
};

function MyComponent() {
  return (
    <div className="json-container">
      {/* How you would typically use such a component */}
      {/* <JsonViewer
        src={myComplexData} // Pass the JS object
        theme="solarized" // Configure appearance
        collapsed={1} // Collapse objects/arrays at depth 1
        enableClipboard={true} // Allow copying
        displayObjectSize={true} // Show size of arrays/objects
        displayDataTypes={false} // Hide data types
      /> */}
       {/* Placeholder for the concept */}
      <p>
        &lt;JsonViewer src=&#x7b;myComplexData&#x7d; ... /&gt;
      </p>
    </div>
  );
}

// export default MyComponent;
`}
            </pre>
          </div>
        </div>
        <p>
          These components abstract away the rendering complexities, providing a clean, declarative way to display
          formatted JSON.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
            alt="Vue logo"
            className="inline-block w-6 h-6"
          />{" "}
          Vue.js
        </h3>
        <p>
          Vue also leverages components for this task. You would install a Vue-specific JSON viewer component (e.g.,
          from libraries like <code>vue-json-viewer</code>) and use it directly in your templates.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Vue Usage:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`<template>
  <div class="json-container">
    <!-- How you would typically use such a component -->
    <!-- <json-viewer
      :value="myJsonData" // Pass the data
      :expand-depth="5" // Expand up to a certain depth
      copyable // Enable copy feature
      boxed // Add a border/box
      sort // Sort keys alphabetically
    /> -->
     <!-- Placeholder for the concept -->
    <p>
      &lt;json-viewer :value="myJsonData" ... /&gt;
    </p>
  </div>
</template>

<script>
// Assume this is within a Vue component script section
// import JsonViewer from 'vue-json-viewer';

export default {
  // components: {
  //   JsonViewer
  // },
  data() {
    return {
      myJsonData: {
        status: "success",
        code: 200,
        data: {
          user: {
            id: "user-123",
            username: "jdoe",
            isActive: true
          },
          permissions: ["read", "write", "delete"],
          lastLogin: "2023-10-27T10:00:00Z"
        },
        message: null
      }
    };
  }
};
</script>

<style scoped>
/* Optional styles */
/* .json-container { margin-top: 20px; } */
</style>
`}
            </pre>
          </div>
        </div>
        <p>
          Similar to React, the component handles the rendering logic based on the provided data and configuration
          props.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Image
            src="https://angular.io/assets/images/logos/angular/angular.svg"
            alt="Angular logo"
            className="inline-block w-6 h-6"
          />{" "}
          Angular
        </h3>
        <p>
          In Angular, JSON formatting can be done via a component or a pipe. A component provides a rich UI with
          collapsing/searching, while a pipe is simpler and mainly for formatting a string for display (often without
          syntax highlighting or interaction). Libraries might offer both.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Angular Usage (Component):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`<!-- Assuming an installed JsonFormatterComponent -->
<!-- import { JsonFormatterComponent } from 'angular-json-formatter'; -->

<div class="json-container">
  <!-- How you would typically use such a component -->
  <!-- <app-json-formatter
    [json]="apiResponseData" // Pass the data
    [expanded]="false" // Start collapsed
    [depth]="2" // Expand up to depth 2 initially
    [theme]="'dark'" // Use a dark theme
  ></app-json-formatter> -->
   <!-- Placeholder for the concept -->
  <p>
    &lt;app-json-formatter [json]="apiResponseData" ...&gt;&lt;/app-json-formatter&gt;
  </p>
</div>
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Angular Usage (Pipe - often uses JSON.stringify):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`<!-- Using Angular's built-in JsonPipe -->
<!-- This primarily provides indentation -->

<pre>{{ simpleObject | json }}</pre>

<!-- Output (similar to JSON.stringify(simpleObject, null, 2)):
{
  "id": 1,
  "value": "example"
}
-->

<!-- For pipes with custom formatting/highlighting, you'd use a custom pipe -->
<!-- <pre [innerHTML]="complexObject | customJsonFormatPipe"></pre> -->
`}
            </pre>
          </div>
        </div>
        <p>
          Angular components provide rich features similar to React/Vue components, while pipes are useful for simpler,
          non-interactive formatting within templates.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">Other Frameworks / Libraries</h3>
        <p>
          Similar component-based or utility-based JSON formatters exist for virtually all modern web frameworks and
          even vanilla JavaScript libraries. Popular standalone libraries like <code>json-formatter-js</code> can also
          be integrated into applications, although framework-specific wrappers often make integration smoother.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="inline-block" /> Considerations When Choosing a Plugin/Component
        </h2>
        <p>When selecting a JSON formatter plugin for your framework, consider:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Check className="inline-block mr-1 text-green-500" /> <strong>Framework Compatibility:</strong> Is it
            specifically built for or compatible with your framework version?
          </li>
          <li>
            <Columns2 className="inline-block mr-1 text-blue-500" /> <strong>Features:</strong> Does it offer
            indentation, syntax highlighting, collapsing, searching, copying, etc., as needed?
          </li>
          <li>
            <Paintbrush className="inline-block mr-1 text-yellow-500" /> <strong>Customization:</strong> Can you
            customize themes, indentation levels, initial collapse state, etc.?
          </li>
          <li>
            <Package className="inline-block mr-1 text-green-500" /> <strong>Bundle Size:</strong> How much does it add
            to your application's final bundle size?
          </li>
          <li>
            <X className="inline-block mr-1 text-red-500" /> <strong>Dependencies:</strong> Does it rely on many other
            libraries?
          </li>
          <li>
            <strong>Maintenance:</strong> Is the library actively maintained and well-documented?
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CodeXml className="inline-block" /> Core Logic Behind the Scenes
        </h2>
        <p>
          Most formatter plugins internally process the JSON data (often after parsing the string into a JavaScript
          object using <code>JSON.parse()</code>). They then recursively traverse the object/array structure. For each
          key-value pair or array element, they generate corresponding HTML elements (like <code>&lt;div&gt;</code>,{" "}
          <code>&lt;span&gt;</code>) and apply CSS classes for indentation and syntax highlighting based on the data
          type (string, number, boolean, object, array, null). Collapsible features typically involve rendering toggle
          icons and managing the visibility of child elements.
        </p>
        <p>
          Libraries often use techniques similar to code editors for efficient syntax highlighting, and clever
          CSS/JavaScript for managing the expand/collapse state without re-rendering the entire structure every time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          JSON formatter plugins and components are valuable additions to web applications that deal heavily with JSON
          data. They significantly improve the developer and user experience by presenting complex data structures in a
          human-readable format with indentation, syntax highlighting, and interactive features like collapsing. By
          leveraging framework-specific components, developers can easily integrate this functionality with minimal
          effort, focusing on displaying the data rather than reinventing the formatting logic. Choosing the right
          plugin involves considering features, performance, and compatibility with your project's specific requirements
          and framework.
        </p>
      </div>
    </>
  );
}
