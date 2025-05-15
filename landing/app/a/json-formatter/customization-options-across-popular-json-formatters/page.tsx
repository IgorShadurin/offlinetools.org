import type { Metadata } from "next";
import { Indent, SortAsc, Filter, Key, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Customization Options Across Popular JSON Formatters | Offline Tools",
  description:
    "Explore the various customization options available in popular JSON formatters and how they help developers control output for readability, standardization, and specific data handling.",
};

export default function JsonFormatterCustomizationPage() {
  // Representing the large number as a string in the source object
  // to avoid BigInt literal errors in environments targeting lower than ES2020.
  const sampleJson = {
    name: "Example Object",
    version: 1.5,
    isActive: true,
    tags: ["data", "json", "formatting"],
    details: {
      id: "abc-123",
      created: "2023-10-27T10:00:00Z", // Dates often need special handling
      lastUpdated: null, // Nulls might need filtering
      value: "12345678901234567890", // Represent large number as string
      config: {
        optionA: true,
        optionB: false,
      },
    },
    count: 42,
  };

  const formattedJsonDefault = JSON.stringify(sampleJson);
  const formattedJsonPretty = JSON.stringify(sampleJson, null, 2); // Default pretty print

  // Manually create the string output to show how a BigInt *would* be handled by a replacer
  // if the source data actually contained a BigInt. This avoids using a BigInt literal in the code.
  const formattedJsonWithBigIntConceptOutput = JSON.stringify(
    {
      name: "Example Object",
      version: 1.5,
      isActive: true,
      tags: ["data", "json", "formatting"],
      details: {
        id: "abc-123",
        created: "2023-10-27T10:00:00Z",
        lastUpdated: null,
        value: "12345678901234567890", // This is the string output from a BigInt
        config: {
          optionA: true,
          optionB: false,
        },
      },
      count: 42,
    },
    null,
    2 // Indentation for the example output
  );


  const formattedJsonFiltered = JSON.stringify(
    sampleJson,
    (key, value) => {
      if (value === null || value === undefined) {
        return undefined; // Exclude null/undefined keys
      }
      // Example to exclude a specific key
      if (key === "count") {
        return undefined;
      }
      return value;
    },
    2
  );


  // Conceptual example of sorting (JSON.stringify doesn't do this natively)
  // A real library would likely take an option like { sortKeys: true }
  const conceptualSortedJson = `{
  "count": 42,
  "details": {
    "config": {
      "optionA": true,
      "optionB": false
    },
    "created": "2023-10-27T10:00:00Z",
    "id": "abc-123",
    "lastUpdated": null,
    "value": "12345678901234567890"
  },
  "isActive": true,
  "name": "Example Object",
  "tags": [
    "data",
    "json",
    "formatting"
  ],
  "version": 1.5
}`; // Manually sorted for demonstration


  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Customization Options Across Popular JSON Formatters
      </h1>

      <div className="space-y-8">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for
          humans to read and write and easy for machines to parse and generate. While the format itself
          is standardized, how it is *formatted* can vary significantly. JSON formatters are tools or libraries
          that take raw JSON data and output it in a structured, often more readable, form. Understanding
          the customization options they offer is crucial for developers dealing with data readability,
          standardization, debugging, and integration.
        </p>
        <p>
          Whether you're using built-in language functions like JavaScript's{" "}
          <code>JSON.stringify()</code>, command-line tools like <code>jq</code>, or popular code
          formatters like Prettier, these tools provide options to control the output. This page explores
          some of the most common and useful customization options you'll encounter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-3 text-blue-500" /> Why Customize JSON Output?
        </h2>
        <p>
          Customizing JSON output serves several purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Pretty-printing with indentation makes nested structures easier to follow.
          </li>
          <li>
            <strong>Standardization:</strong> Ensuring consistent formatting across a project or team simplifies code reviews and debugging.
          </li>
          <li>
            <strong>Debugging:</strong> Formatting can highlight structural issues or unexpected data within the JSON.
          </li>
          <li>
            <strong>Data Processing:</strong> Filtering keys or handling specific data types (like BigInts or dates) can be necessary before data consumption or transfer.
          </li>
          <li>
            <strong>Minification:</strong> Producing compact JSON without whitespace reduces file size for network transfer or storage.
          </li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Indent className="mr-3 text-green-500" /> Indentation & Whitespace
        </h2>
        <p>
          This is perhaps the most common customization. JSON is often transferred in a compact,
          whitespace-free form to save bandwidth. However, this makes it difficult for humans to read.
          Formatters can "pretty-print" JSON by adding indentation and newlines.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Enable/Disable Pretty-Printing:</strong> The most basic option is turning pretty-printing on or off.
          </li>
          <li>
            <strong>Indent Style (Spaces vs. Tabs):</strong> Choose between using space characters or tab characters for indentation.
          </li>
          <li>
            <strong>Indent Size:</strong> Specify the number of spaces per indentation level (commonly 2 or 4) or the width of a tab character.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Indentation with <code>JSON.stringify</code></h3>
          <p className="mb-2">Without indentation (default):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre><code className="language-json">{formattedJsonDefault}</code></pre>
          </div>
          <p className="mt-4 mb-2">With 2 spaces indentation:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre><code className="language-json">{formattedJsonPretty}</code></pre>
          </div>
          <p className="mt-4 mb-2">Conceptual 4 spaces indentation:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">{JSON.stringify(sampleJson, null, 4)}</code></pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <SortAsc className="mr-3 text-purple-500" /> Key Sorting
        </h2>
        <p>
          By default, the order of keys within a JSON object is not guaranteed or standardized.
          However, for purposes like generating consistent diffs between JSON files, improving
          readability by grouping related keys, or ensuring deterministic output, sorting keys
          alphabetically is a common requirement.
        </p>
        <p>
          Many formatters provide an option to sort keys either alphabetically or sometimes based
          on a custom comparison function. Note that <code>JSON.stringify</code> in JavaScript
          does not natively support sorting keys. Libraries or custom replacer functions are needed for this.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Conceptual Sorted Keys</h3>
           <p className="mb-2">Original order (as in <code>sampleJson</code>):</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">{formattedJsonPretty}</code></pre>
           </div>
           <p className="mt-4 mb-2">Conceptual sorted order:</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">{conceptualSortedJson}</code></pre>
           </div>
        </div>

         <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Filter className="mr-3 text-red-500" /> Filtering & Transformation (Replacer)
        </h2>
        <p>
          Beyond just structural formatting, many tools allow you to control which data makes it into
          the final JSON output or how certain data types are represented.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Excluding Keys/Values:</strong> Remove specific keys, or remove keys whose values are <code>null</code>, <code>undefined</code>, empty strings, etc.
          </li>
          <li>
            <strong>Handling Special Data Types:</strong> Convert types like <code>BigInt</code>, <code>Date</code> objects, or other custom objects into standard JSON types (string, number, boolean, object, array, null).
          </li>
          <li>
            <strong>Mapping/Transforming Values:</strong> Modify values before they are serialized (e.g., rounding numbers, formatting dates).
          </li>
        </ul>
         <p>
           In JavaScript, the second argument of <code>JSON.stringify</code> is a "replacer"
           function or array that allows for powerful filtering and transformation.
         </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Filtering & BigInt Handling Concept with <code>JSON.stringify</code> Replacer</h3>
           <p className="mb-2">Handling BigInt (conceptually, output shown):</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">{formattedJsonWithBigIntConceptOutput}</code></pre>
           </div>
           <p className="mt-4 mb-2">Filtering <code>null</code>, <code>undefined</code>, and the <code>count</code> key:</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">{formattedJsonFiltered}</code></pre>
           </div>
           <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
             <em>Note: The replacer function is called for each key/value pair, including nested ones. Returning <code>undefined</code> from the replacer excludes the key from the output. The BigInt example demonstrates how you would handle a BigInt value if your source data contained one, converting it to a string for valid JSON output.</em>
           </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Key className="mr-3 text-orange-500" /> Key Quoting
        </h2>
        <p>
          According to the JSON standard, object keys must always be strings enclosed in double quotes.
          However, some non-standard variants or tools might allow unquoted keys for simple identifiers
          (like in JavaScript object literals). Standard JSON formatters strictly adhere to quoting keys.
          Some tools might offer options related to this, though it's less common for strict JSON output.
        </p>
        <p>
           More relevant might be options around <em>when</em> to quote string values if they are
           allowed to be unquoted in certain contexts (not standard JSON). For standard JSON, all keys and
           string values are always quoted.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Standard Key Quoting</h3>
           <p className="mb-2">Keys are always double-quoted in valid JSON:</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
             <pre><code className="language-json">
{`{
  "standardKey": "value",
  "another-key": 123
}`}
             </code></pre>
           </div>
           <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
             <em>A standard JSON formatter ensures keys are always quoted correctly.</em>
           </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Filter className="mr-3 text-cyan-500" /> Handling Empty Structures or Specific Values
        </h2>
        <p>
           Some formatters provide explicit options for handling specific scenarios:
        </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Empty Objects/Arrays:</strong> How empty <code>{}</code> or <code>[]</code> are formatted (e.g., on a single line or with newlines).
          </li>
          <li>
            <strong>Null/Undefined Handling:</strong> Explicit options to drop keys with <code>null</code> or <code>undefined</code> values (as shown with the replacer, but sometimes a simple flag).
          </li>
          <li>
            <strong>Maximum Depth:</strong> Limit the depth of nested objects/arrays to prevent infinite recursion or overly large output for deep structures.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-3 text-yellow-500" /> Conclusion
        </h2>
        <p>
          The customization options offered by JSON formatters are powerful tools for developers.
          From improving human readability through indentation and sorting to controlling the
          data payload via filtering and type transformation, these options ensure JSON is
          not just a data format but one that can be tailored to specific use cases and
          environments. Understanding how to leverage options like indentation, key sorting,
          and replacer functions (like in <code>JSON.stringify</code>) or flags in command-line
          tools allows for more efficient development, debugging, and data management workflows.
        </p>
      </div>
    </>
  );
}
