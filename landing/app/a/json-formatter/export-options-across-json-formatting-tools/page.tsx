import type { Metadata } from "next";
import { Maximize, Minimize, Code, Indent, List, FileText, Settings, FileJson } from "lucide-react"; // Import required icons

export const metadata: Metadata = {
  title: "Export Options Across JSON Formatting Tools | Understanding JSON Output",
  description:
    "Explore the various export options offered by JSON formatting and manipulation tools, from standard pretty-printing to JSON Lines and custom formats.",
};

export default function JsonExportOptionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <FileJson className="inline-block mr-3 h-8 w-8 text-blue-600" />
        Export Options Across JSON Formatting Tools
      </h1>

      <div className="space-y-6">
        <p>
          When working with JSON data using online tools, command-line utilities, or libraries, the way you output or
          export the data can vary significantly beyond just getting a basic JSON string. Understanding these export
          options is crucial for integrating formatted JSON into different workflows, scripts, or applications. This
          page explores common and some less common export formats and options you might encounter.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Code className="inline-block mr-2 h-6 w-6 text-green-600" />
          Standard JSON Output
        </h2>

        <p>
          The most fundamental export options revolve around standard JSON itself, as defined by RFC 8259. The primary
          difference here is usually around whitespace.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Minimize className="inline-block mr-2 h-5 w-5 text-yellow-600" />
          Minified JSON
        </h3>
        <p>
          This format removes all non-essential whitespace (spaces, tabs, newlines) to reduce file size. It's ideal for
          data transmission where bandwidth is a concern, but makes the JSON nearly unreadable by humans.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Minified Example:</h4>
          <pre className="text-sm whitespace-pre-wrap">
            {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Maximize className="inline-block mr-2 h-5 w-5 text-blue-600" />
          Pretty-Printed (Formatted) JSON
        </h3>
        <p>
          This option adds whitespace (indentation and newlines) to make the JSON structure clear and easy to read for
          developers. Tools often allow you to customize the indentation style (e.g., 2 spaces, 4 spaces, tabs).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Pretty-Printed (4 Spaces) Example:</h4>
          <pre className="text-sm">
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
        <p>
          Look for options like "Indent with:" followed by "2 Spaces", "4 Spaces", "Tabs", etc. This is one of the most
          common formatting controls.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <List className="inline-block mr-2 h-6 w-6 text-purple-600" />
          JSON Lines (Newline-Delimited JSON - NDJSON)
        </h2>
        <p>
          Exporting as JSON Lines (`.jsonl` or `.ndjson`) is useful when dealing with a stream or list of independent
          JSON objects. Instead of wrapping the entire dataset in a single JSON array `[...]`, each line in the output
          file is a complete, valid JSON object, separated by a newline character.
        </p>
        <p>
          This format is particularly beneficial for processing large datasets line by line without loading the entire
          structure into memory, and for streaming data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">JSON Lines Example:</h4>
          <pre className="text-sm">
            {`{"id": 1, "item": "Apple", "price": 0.5}
{"id": 2, "item": "Banana", "price": 0.3}
{"id": 3, "item": "Cherry", "price": 0.1}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          <FileText className="inline-block mr-2 h-6 w-6 text-teal-600" />
          JavaScript/TypeScript Variable Export
        </h2>
        <p>
          Some tools offer to wrap the JSON data in a JavaScript or TypeScript variable declaration. This is convenient
          if you plan to directly import the data into a frontend or backend script without needing to parse a separate
          JSON file at runtime.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">JavaScript Variable Example:</h4>
          <pre className="text-sm">
            {`export const jsonData = {
    "users": [
        { "name": "Alice", "id": 1 },
        { "name": "Bob", "id": 2 }
    ],
    "count": 2
};`}
          </pre>
        </div>
        <p>
          This format often includes a variable name option, allowing you to specify the desired variable identifier
          (`jsonData` in the example above).
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Settings className="inline-block mr-2 h-6 w-6 text-orange-600" />
          Advanced & Tool-Specific Options
        </h2>
        <p>
          Beyond the common formats, powerful JSON tools may offer options that manipulate the data structure itself
          during export:
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Indent className="inline-block mr-2 h-5 w-5 text-cyan-600" />
          Controlling Indentation Style & Characters
        </h3>
        <p>
          As mentioned, customizing indentation (e.g., using 2 spaces vs. 4 spaces, or tabs) is standard. Some tools
          might even let you specify the exact characters for indentation.
        </p>

        <h3 className="text-xl font-semibold mt-6">Preserving Key Order</h3>
        <p>
          While the JSON specification{" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:no-underline"
          >
            does not guarantee object key order
          </a>
          , many parsers and tools *do* maintain insertion order. Some tools may offer an option to ensure that the
          original key order from the input is preserved in the output, which can be important for specific use cases
          (though relying on order is generally discouraged in standard JSON practice).
        </p>

        <h3 className="text-xl font-semibold mt-6">Filtering/Selecting Data</h3>
        <p>
          Advanced tools might allow you to specify paths or queries (like{" "}
          <a
            href="https://jmespath.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:no-underline"
          >
            JMESPath
          </a>{" "}
          or{" "}
          <a
            href="https://goessner.net/articles/JsonPath/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:no-underline"
          >
            JSONPath
          </a>
          ) to export only a subset of the data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Filtering Example (Exporting only user names):</h4>
          <pre className="text-sm">
            {`[
    "Alice",
    "Bob"
]`}
          </pre>
        </div>
        <p>This transforms the structure based on your criteria before exporting.</p>

        <h3 className="text-xl font-semibold mt-6">Flattening Nested Structures</h3>
        <p>
          For complex, deeply nested JSON, some tools can export a "flattened" version, often represented as key-value
          pairs where keys use dot notation (e.g., <code>user.address.city</code>). This can make data easier to import
          into spreadsheet software or simple key-value stores.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Flattened Example:</h4>
          <pre className="text-sm">
            {`{
    "user.name": "Alice",
    "user.age": 30,
    "user.address.street": "123 Main St",
    "user.address.city": "Anytown",
    "roles[0]": "admin",
    "roles[1]": "editor"
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Exporting Specific Components (e.g., Keys, Values)</h3>
        <p>
          Some tools might have options to export just the list of all keys found in the JSON, or just a list of all
          primitive values, etc., depending on the tool's purpose.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choosing the Right Option</h2>
        <p>The best export option depends entirely on your use case:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>For human readability during development: Pretty-printed JSON with a comfortable indentation level.</li>
          <li>For efficient data transfer or storage: Minified JSON.</li>
          <li>For processing large lists or streams of objects: JSON Lines (NDJSON).</li>
          <li>For direct inclusion in JavaScript/TypeScript codebases: Variable export.</li>
          <li>For analysis or migration to simpler formats: Filtering or Flattening.</li>
        </ul>

        <p>
          Familiarizing yourself with the export capabilities of your preferred JSON tools can significantly streamline
          your data handling workflows. Always check the options panel or documentation of the tool you are using to see
          what specific export formats and configurations are available.
        </p>
      </div>
    </>
  );
}
