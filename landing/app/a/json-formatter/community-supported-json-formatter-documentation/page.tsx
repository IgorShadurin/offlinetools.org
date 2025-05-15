import type { Metadata } from "next";
import {
  CodeXml,
  CheckCheck,
  X,
  Minimize2,
  Maximize2,
  ListOrdered,
  Users,
  BookText,
  Feather,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community-Supported JSON Formatter Documentation",
  description:
    "Comprehensive guide to using and understanding a community-supported JSON formatter, covering beautify, minify, validation, and more.",
};

export default function JsonFormatterDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        <CodeXml className="inline-block mr-2" size={36} /> Community-Supported JSON Formatter Documentation
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookText className="mr-2" /> Introduction
        </h2>
        <p className="text-lg mb-4">
          Welcome to the documentation for the Community-Supported JSON Formatter. In the world of web development, APIs, and data exchange, JSON (JavaScript Object Notation) is ubiquitous. While its structure is simple, working with large or unformatted JSON can be challenging. A JSON formatter is an essential tool for developers, making JSON data readable, validatable, and easier to manipulate.
        </p>
        <p className="text-lg mb-4">
          This documentation covers the features, usage, and benefits of a formatter built and maintained by a community of developers. Community support often leads to rapid feature development, robust bug fixing, and adaptability to diverse use cases.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Feather className="mr-2" /> Core Functionalities
        </h2>
        <p className="text-lg mb-4">
          A JSON formatter typically provides several core functions to help developers work with JSON data effectively.
        </p>

        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Maximize2 className="mr-2" /> Beautify (Pretty Print)
        </h3>
        <p className="mb-4">
          Beautifying takes a JSON string and adds whitespace (indentation, newlines) to make its hierarchical structure clear and human-readable. This is crucial when dealing with minified JSON received from APIs or generated programmatically.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Example: Before Beautify</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
          </pre>
          <h4 className="font-medium mb-2 mt-4">Example: After Beautify (with 2-space indentation)</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    "Math",
    "Science"
  ]
}`}
          </pre>
        </div>
        <p className="mb-4">
          The formatter allows configuring the indentation level (e.g., 2 spaces, 4 spaces, tabs).
        </p>

        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Minimize2 className="mr-2" /> Minify
        </h3>
        <p className="mb-4">
          Minifying removes all unnecessary whitespace from a JSON string (spaces, tabs, newlines). This results in a smaller file size, which is beneficial for data transmission over networks, such as in API responses.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Example: Before Minify</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    "Math",
    "Science"
  ]
}`}
          </pre>
          <h4 className="font-medium mb-2 mt-4">Example: After Minify</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <CheckCheck className="mr-2" /> Validation
        </h3>
        <p className="mb-4">
          Validation checks if the input string conforms to the strict JSON specification ({" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ECMA-404
          </a>
          ). A good validator pinpoints errors like misplaced commas, unquoted keys, incorrect data types, or invalid escapes.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Example: Valid JSON</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "status": "success",
  "data": null
}`}
          </pre>
          <p className="text-green-600 dark:text-green-400 flex items-center mt-2">
            <CheckCheck className="mr-1" size={18} /> This is valid JSON.
          </p>
          <h4 className="font-medium mb-2 mt-4">Example: Invalid JSON</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  name: "Bob",
  "age": 25,
  "city": 'New York', // Using single quotes
  "topics": ["JS", "HTML", "CSS",] // Trailing comma
}`}
          </pre>
          <p className="text-red-600 dark:text-red-400 flex items-center mt-2">
            <X className="mr-1" size={18} /> This is invalid JSON. Keys must be double-quoted strings, strings must use double quotes, and trailing commas are not allowed in objects or arrays.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <ListOrdered className="mr-2" /> Sort Keys
        </h3>
        <p className="mb-4">
          This feature allows sorting keys within JSON objects, usually alphabetically. This helps standardize JSON output, making it easier to compare different JSON objects or maintain consistency.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Example: Before Sorting Keys</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "zip": "10001",
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
          </pre>
          <h4 className="font-medium mb-2 mt-4">Example: After Sorting Keys</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "age": 30,
  "city": "New York",
  "name": "Alice",
  "zip": "10001"
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Search className="mr-2" /> JSON Diff (Conceptual)
        </h3>
        <p className="mb-4">
          While not always a core &quot;formatting&quot; feature, some tools include the ability to compare two JSON structures and highlight the differences. This is invaluable for debugging API changes or tracking modifications in configuration files.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="mr-2" /> The Community Aspect
        </h2>
        <p className="text-lg mb-4">
          Being community-supported means the formatter benefits from the collective knowledge and efforts of many developers.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            <strong>Faster Iteration:</strong> New features and improvements can be added more quickly.
          </li>
          <li>
            <strong>Robustness:</strong> A wider range of test cases and bug reports from real-world usage contribute to stability.
          </li>
          <li>
            <strong>Adaptability:</strong> The tool evolves based on the diverse needs and suggestions of its users.
          </li>
          <li>
            <strong>Transparency:</strong> The open-source nature allows anyone to inspect the code and understand how it works.
          </li>
        </ul>
        <p className="text-lg mt-4">
          You can typically contribute by reporting bugs, suggesting features, improving documentation, or submitting code changes (pull requests). Check the project&apos;s repository for specific contribution guidelines.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <CodeXml className="mr-2" /> How it Works (Simplified)
        </h2>
        <p className="text-lg mb-4">
          At its core, a JSON formatter follows a few steps:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-lg">
          <li>
            <strong>Parsing:</strong> The input JSON string is parsed into an in-memory data structure (like a JavaScript object or array). This step also performs validation – if the string isn&apos;t valid JSON, the parser fails.
          </li>
          <li>
            <strong>Manipulation (Optional):</strong> Depending on the requested operation (like sorting keys), the in-memory structure might be modified.
          </li>
          <li>
            <strong>Stringification:</strong> The in-memory data structure is converted back into a JSON string. This is where beautifying (adding whitespace) or minifying (removing whitespace) occurs based on the specified options.
          </li>
        </ol>
        <p className="text-lg mt-4">
          Libraries in various programming languages (JavaScript&apos;s built-in `JSON.parse()` and `JSON.stringify()`, Python&apos;s `json`, etc.) provide the fundamental tools for parsing and stringification, upon which formatter tools are built.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Conceptual Code Flow (JavaScript/TypeScript):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`function formatJson(jsonString, options) &lbrace;
  try &lbrace;
    // Step 1: Parse (and Validate)
    const data = JSON.parse(jsonString);

    // Step 2: Manipulation (Example: Sort Keys)
    if (options.sortKeys) &lbrace;
      sortObjectKeysRecursively(data); // Requires a helper function
    &rbrace;

    // Step 3: Stringify (with indentation or minification)
    if (options.minify) &lbrace;
      return JSON.stringify(data); // No extra arguments for minify
    &rbrace; else &lbrace;
      const indent = typeof options.indent === 'number' ? options.indent : 2; // Default to 2 spaces
      return JSON.stringify(data, null, indent); // Use null replacer, specify indent
    &rbrace;
  &rbrace; catch (error) &lbrace;
    // Handle parsing or other errors
    console.error("JSON formatting error:", error.message);
    return null; // Or throw the error
  &rbrace;
&rbrace;

// Conceptual helper for recursive key sorting
function sortObjectKeysRecursively(obj) &lbrace;
  if (obj !== null && typeof obj === 'object') &lbrace;
    if (Array.isArray(obj)) &lbrace;
      for (const item of obj) &lbrace;
        sortObjectKeysRecursively(item);
      &rbrace;
    &rbrace; else &lbrace;
      const keys = Object.keys(obj).sort();
      const sortedObj = &lbrace;&rbrace;;
      for (const key of keys) &lbrace;
        sortedObj[key] = obj[key];
        sortObjectKeysRecursively(sortedObj[key]);
      &rbrace;
      // Replace original object's properties with sorted ones
      Object.keys(obj).forEach(key => delete obj[key]);
      Object.assign(obj, sortedObj);
    &rbrace;
  &rbrace;
&rbrace;
`}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookText className="mr-2" /> Using the Formatter (Interfaces)
        </h2>
        <p className="text-lg mb-4">
          Community-supported JSON formatters are typically available through various interfaces:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            <strong>Web Interface:</strong> A common way to use formatters via a simple copy-paste input field and output area in a web browser.
          </li>
          <li>
            <strong>Command Line Interface (CLI):</strong> For scripting and automating formatting tasks, often used in build pipelines or for processing local files.
          </li>
          <li>
            <strong>API:</strong> Some formatters provide a programmatic API that developers can integrate into their own applications or services.
          </li>
          <li>
            <strong>Editor/IDE Extensions:</strong> Many code editors have plugins or built-in features that utilize JSON formatting libraries.
          </li>
        </ul>
        <p className="text-lg mt-4">
          Refer to the specific project&apos;s README or documentation for installation and usage instructions for your preferred interface.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <CheckCheck className="mr-2" /> Tips for Effective Use
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            Always validate JSON received from external sources before processing it in your application.
          </li>
          <li>
            Use beautifiers with consistent indentation settings across your team for better code readability.
          </li>
          <li>
            Minify JSON for production API responses or stored data to reduce bandwidth and storage space.
          </li>
          <li>
            When debugging, use beautify and validation to quickly understand the structure and identify errors in large JSON payloads.
          </li>
          <li>
            If you encounter issues or have ideas, check if they are already reported in the community project&apos;s issue tracker before creating a new one.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookText className="mr-2" /> Conclusion
        </h2>
        <p className="text-lg">
          A community-supported JSON formatter is a powerful and flexible tool for anyone working with JSON. By leveraging features like beautifying, minifying, validation, and key sorting, developers can save significant time and avoid errors when dealing with structured data. The open nature of community projects ensures continuous improvement and adaptation, making these tools an invaluable part of the developer toolkit.
        </p>
      </section>
    </div>
  );
}
