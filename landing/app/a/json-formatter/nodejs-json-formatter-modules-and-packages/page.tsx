import type { Metadata } from "next";
import { Code, Package, Layers, Settings } from "lucide-react"; // Assuming lucide-react is available

export const metadata: Metadata = {
  title: "Node.js JSON Formatter Modules and Packages | Developer Tools",
  description:
    "Explore built-in and external Node.js modules and packages for formatting JSON data, including pretty-printing, sorting keys, and handling large files.",
};

export default function NodejsJsonFormattersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Code className="w-8 h-8" /> Node.js JSON Formatter Modules and Packages
      </h1>

      <div className="space-y-6">
        <p>
          Working with JSON (JavaScript Object Notation) is a cornerstone of modern web development, especially in the
          backend with Node.js. Whether you're reading configuration files, sending API responses, logging data, or
          processing external data sources, JSON is everywhere. While raw JSON is compact, it's often unreadable for
          humans. This is where JSON formatting comes in. Formatting JSON, also known as "pretty-printing," adds
          whitespace, indentation, and line breaks to make the structure clear and easy to inspect.
        </p>
        <p>
          Node.js provides built-in capabilities for handling JSON, but there are also numerous external packages
          offering more advanced or specialized formatting features. This guide explores the options available to
          Node.js developers for formatting JSON data effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers className="w-6 h-6" /> The Built-in `JSON` Object
        </h2>
        <p>
          The most fundamental way to format JSON in Node.js (and JavaScript environments in general) is by using the
          global `JSON` object, specifically its `stringify()` method.
        </p>

        <h3 className="text-xl font-semibold mt-4">`JSON.stringify()` for Pretty-Printing</h3>
        <p>
          The `JSON.stringify()` method converts a JavaScript object or value to a JSON string. It takes three
          arguments:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <code>value</code>: The JavaScript value to convert to a JSON string.
          </li>
          <li>
            <code>replacer</code> (Optional): A function or an array that alters the stringification process.
          </li>
          <li>
            <code>space</code> (Optional): A `string` or `number` value that's used to insert white space into the
            output JSON string for readability purposes.
          </li>
        </ol>
        <p>It's the third argument, `space`, that is key to formatting JSON for human readability.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Basic Pretty-Printing with `JSON.stringify`</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const myObject = {
  name: "Node.js",
  version: "latest",
  dependencies: ["npm", "yarn"],
  config: {
    timeout: 5000,
    enabled: true
  },
  data: null
};

// Without space argument (compact JSON)
const compactJson = JSON.stringify(myObject);
console.log("Compact JSON:");
console.log(compactJson);
// Output: {"name":"Node.js","version":"latest","dependencies":["npm","yarn"],"config":{"timeout":5000,"enabled":true},"data":null}

console.log("\\n---");

// With a number (number of spaces)
const prettyJsonSpaces = JSON.stringify(myObject, null, 2); // Use 2 spaces for indentation
console.log("Pretty JSON (2 spaces):");
console.log(prettyJsonSpaces);
// Output:
// {
//   "name": "Node.js",
//   "version": "latest",
//   "dependencies": [
//     "npm",
//     "yarn"
//   ],
//   "config": {
//     "timeout": 5000,
//     "enabled": true
//   },
//   "data": null
// }

console.log("\\n---");

// With a string (e.g., tab character)
const prettyJsonTabs = JSON.stringify(myObject, null, "\\t"); // Use tab for indentation
console.log("Pretty JSON (tab):");
console.log(prettyJsonTabs);
// Output:
// {
// \t"name": "Node.js",
// \t"version": "latest",
// \t"dependencies": [
// \t\t"npm",
// \t\t"yarn"
// \t],
// \t"config": {
// \t\t"timeout": 5000,
// \t\t"enabled": true
// \t},
// \t"data": null
// }`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">Using the `replacer` Argument</h3>
        <p>The `replacer` argument can be a function or an array.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Function:</strong> Called for each key/value pair. You can return the value to include it, or
            `undefined` to exclude it.
          </li>
          <li>
            <strong>Array:</strong> An array of strings or numbers that specifies which properties of the object should
            be included in the JSON string.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Using `replacer` with `JSON.stringify`</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const myObject = {
  id: 1,
  name: "Secret Config",
  apiKey: "super-secret-key-123",
  version: 1.5
};

// Replacer as an array: only include 'id' and 'version'
const filteredJsonArray = JSON.stringify(myObject, ['id', 'version'], 2);
console.log("Filtered JSON (Array Replacer):");
console.log(filteredJsonArray);
// Output:
// {
//   "id": 1,
//   "version": 1.5
// }

console.log("\\n---");

// Replacer as a function: filter out the apiKey
const filteredJsonFunction = JSON.stringify(myObject, (key, value) => {
  if (key === 'apiKey') {
    return undefined; // Exclude this key
  }
  return value; // Include other keys/values
}, 2);
console.log("Filtered JSON (Function Replacer):");
console.log(filteredJsonFunction);
// Output:
// {
//   "id": 1,
//   "name": "Secret Config",
//   "version": 1.5
// }`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">Limitations of Built-in Formatting</h3>
        <p>While `JSON.stringify` is powerful and sufficient for many basic formatting needs, it has limitations:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>No Key Sorting:</strong> It does not provide an option to sort object keys alphabetically or in any
            specific order, which can be crucial for diffing large JSON files or ensuring consistent output.
          </li>
          <li>
            <strong>Performance on Large Data:</strong> For extremely large JSON objects, `JSON.stringify` can consume
            significant memory as it needs to hold the entire object in memory before converting it to a string.
          </li>
          <li>
            <strong>Error Handling:</strong> It throws errors on circular references or other non-JSON-serializable
            values, but lacks more sophisticated validation during the process.
          </li>
          <li>
            <strong>Limited Formatting Options:</strong> Beyond indentation, there are no options for custom spacing,
            wrapping, or other complex formatting rules.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6" /> External Node.js JSON Packages
        </h2>
        <p>
          To overcome the limitations of the built-in `JSON` object and gain more control over the formatting process,
          developers often turn to third-party packages available on npm. These packages offer features like:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Sorted keys (stable stringification).</li>
          <li>Streaming capabilities for large files.</li>
          <li>Advanced validation and error reporting.</li>
          <li>More flexible formatting options.</li>
          <li>Performance optimizations.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Popular JSON Formatting Packages</h3>
        <p>Here are a few notable packages frequently used in the Node.js ecosystem:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">`json-stable-stringify`</h4>
          <p>
            This package is specifically designed to produce stable JSON output by sorting object keys alphabetically.
            This is invaluable for tasks like caching, hashing, or diffing where byte-for-byte consistency is required.
          </p>
          <h5 className="text-base font-medium mt-2">Example Usage (Conceptual):</h5>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume installation: npm install json-stable-stringify
// import stringify from 'json-stable-stringify'; // ES Module syntax
const stringify = require('json-stable-stringify'); // CommonJS syntax

const data = { z: 1, a: 2, b: { y: 3, x: 4 } };

const stableJson = stringify(data, { space: 2 });
console.log("Stable JSON Output:");
console.log(stableJson);
// Output:
// {
//   "a": 2,
//   "b": {
//     "x": 4,
//     "y": 3
//   },
//   "z": 1
// }
// Note how keys are sorted alphabetically at each level.`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">`json-beautify` / `js-beautify`</h4>
          <p>
            Part of the larger `js-beautify` library, this module offers more configurable options for formatting JSON,
            aligning values, controlling array indentation, etc.
          </p>
          <h5 className="text-base font-medium mt-2">Example Usage (Conceptual):</h5>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume installation: npm install js-beautify
// import { js_beautify } from 'js-beautify'; // ES Module syntax
const beautify = require('js-beautify').js_beautify; // CommonJS syntax

const uglyJsonString = '{"name": "Test", "data":[1,2,3],"config":{"enabled":true}}';

const prettyJson = beautify(uglyJsonString, {
  indent_size: 2,
  space_in_array: true // Example option
});
console.log("Beautified JSON Output:");
console.log(prettyJson);
// Output might look something like:
// {
//   "name": "Test",
//   "data": [
//     1,
//     2,
//     3
//   ],
//   "config": {
//     "enabled": true
//   }
// }
// (Exact output depends on version and options)`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">`prettier` (for development/tooling)</h4>
          <p>
            While primarily a code formatter, Prettier has excellent support for JSON. It's typically used as a
            development tool or pre-commit hook rather than directly formatting JSON within application logic at
            runtime, but it's the go-to tool for ensuring consistent JSON style across a project.
          </p>
          <h5 className="text-base font-medium mt-2">Usage:</h5>
          <p>
            Install Prettier (`npm install --save-dev prettier`) and run it from the command line or integrate it into
            your IDE/build process:
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`# Format a single file
prettier --write path/to/your/file.json

# Format all JSON files in a directory
prettier --write "path/to/directory/**/*.json"`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Streaming Parsers/Formatters (e.g., `jsonstream`, `clarinet`)</h4>
          <p>
            For working with extremely large JSON files that don't fit into memory, streaming libraries are essential.
            While primarily parsers, some also offer transformation or stringification capabilities that can format data
            as it's processed, avoiding the need to load the entire file. These are more complex than simple formatters
            but necessary for scale.
          </p>
          <h5 className="text-base font-medium mt-2">Usage Concept:</h5>
          <p>
            Read the JSON file as a stream, pipe it through a parser/transformer stream that applies formatting rules,
            and write the output to a new stream or file.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume installation: npm install jsonstream fs
const fs = require('fs');
const JSONStream = require('jsonstream');

const inputStream = fs.createReadStream('large_input.json');
const outputStream = fs.createWriteStream('large_output_formatted.json');

// This is a simplified example; actual formatting logic
// within a stream might involve transforming chunks
// or using a specific stringifier stream.
// JSONStream.stringify() can also be used for formatting arrays/objects as they stream.
inputStream
  .pipe(JSONStream.parse('*')) // Example: parse each item in a root array
  // Add transformation/formatting steps here
  .pipe(JSONStream.stringify(false)) // Basic stream stringifier (can take args for format)
  .pipe(outputStream);

console.log("Formatting large JSON file via streaming...");
// This approach avoids loading the entire 'large_input.json' into memory.`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: Implementing advanced formatting like deep indentation with simple streaming can be complex and might
            require buffering certain structures. Streaming is primarily for memory efficiency on large files.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Choosing the Right Approach
        </h2>
        <p>The best method for formatting JSON in your Node.js application depends on your specific needs:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simple Pretty-Printing:</strong> For basic readability, use `JSON.stringify(data, null, 2)` or
            `JSON.stringify(data, null, '\t')`. This is the most performant and requires no external dependencies.
          </li>
          <li>
            <strong>Stable Output / Diffing:</strong> If you need consistent key ordering for caching, hashing, or
            comparing JSON structures, use a package like `json-stable-stringify`.
          </li>
          <li>
            <strong>Advanced Formatting Options:</strong> If you require fine-grained control over indentation, spacing,
            or other visual styles, explore libraries like `js-beautify`.
          </li>
          <li>
            <strong>Code Style Enforcement:</strong> For maintaining consistent JSON formatting across a codebase in a
            development setting, integrate a tool like Prettier.
          </li>
          <li>
            <strong>Large Files / Memory Constraints:</strong> When dealing with JSON files that exceed available
            memory, use streaming parsers/formatters like `jsonstream`.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          Node.js provides robust built-in capabilities with `JSON.stringify` for basic JSON formatting, which is
          sufficient for many common tasks. However, when requirements extend to stable key ordering, advanced styling,
          or handling massive datasets, the rich ecosystem of npm packages offers specialized tools to meet those needs.
          Understanding the strengths and weaknesses of both the built-in method and external libraries allows
          developers to choose the most appropriate solution for efficient and readable JSON handling in their Node.js
          projects.
        </p>
      </div>
    </>
  );
}
