import type { Metadata } from "next";
import {
  AlertCircle,
  CheckCircle,
  Code,
  FileJson,
  FileCheck, // Replaced FormatLineSpacing with FileCheck
  Lightbulb,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Common JSON Mistakes and How Formatters Help | Offline Tools",
  description:
    "Learn about the most frequent errors developers make when writing JSON and how using a JSON formatter can help you find and fix them quickly.",
};

export default function JsonMistakesAndFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="w-8 h-8 text-blue-500" /> Common JSON Mistakes and How Formatters Help Identify Them
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and in
          countless applications. Its simplicity and human-readable format make it popular, but even simple formats can
          lead to common mistakes that cause parsing errors. Understanding these pitfalls and utilizing the right tools
          can save significant debugging time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" /> What is JSON and Why is it Picky?
        </h2>
        <p>
          JSON is a lightweight data-interchange format. It's based on a subset of the JavaScript Programming Language
          Standard ECMA-262 3rd Edition - December 1999. However, JSON is strictly a data format; it doesn't support
          executable code or complex expressions. Its structure is built upon two structures:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            A collection of name/value pairs (typically implemented as an object, record, struct, dictionary, hash
            table, keyed list, or associative array).
          </li>
          <li>An ordered list of values (typically implemented as an array, vector, list, or sequence).</li>
        </ul>
        <p>
          Because it's a strict data format designed for interoperability, it has a rigid syntax. Unlike JavaScript
          object literals, which can be more forgiving, JSON parsers strictly adhere to the{" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            official JSON specification
          </a>
          . Any deviation from this specification will result in a parsing error.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" /> Common JSON Mistakes
        </h2>
        <p>
          Here are some of the most frequent errors developers encounter when manually writing or manipulating JSON
          strings:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 1. Syntax Errors: Missing or Extra Commas and Colons
        </h3>
        <p>
          This is perhaps the most common mistake. JSON uses commas to separate items in arrays and key-value pairs in
          objects, and colons to separate keys from values.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Missing Comma):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice"
  "age": 30
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Missing Colon):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name" "Alice",
  "age": 30
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Extra Comma):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice",
  "age": 30,
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice",
  "age": 30
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 2. Unquoted or Incorrectly Quoted Keys/Strings
        </h3>
        <p>
          JSON requires object keys to be strings, and strings must be enclosed in double quotes (
          <code className="font-mono">&quot;</code>). Single quotes (<code className="font-mono">&apos;</code>) are not
          allowed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Unquoted Key):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  name: "Alice"
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Single Quotes):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  'name': 'Alice'
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 3. Invalid Data Types or Case Sensitivity
        </h3>
        <p>
          JSON has specific primitive types: strings, numbers, booleans (<code className="font-mono">true</code>,{" "}
          <code className="font-mono">false</code>), and <code className="font-mono">null</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Capitalized Boolean/Null):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "isActive": True,
  "status": Null
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Undefined/NaN):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "value": undefined
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "isActive": true,
  "status": null
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 4. Invalid Escape Sequences
        </h3>
        <p>
          Certain characters within a JSON string must be escaped with a backslash (<code className="font-mono">\</code>
          ), such as <code className="font-mono">&quot;</code>, <code className="font-mono">\</code>, and control
          characters.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Unescaped Quote):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "description": "This is a "quoted" word."
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "description": "This is a \\"quoted\\" word."
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 5. Comments
        </h3>
        <p>
          JSON does NOT support comments (neither single-line <code className="font-mono">{"//"}</code> nor multi-line{" "}
          <code className="font-mono">{"/* ... */"}</code>). This is a common source of errors when developers try to
          comment out parts of a JSON file.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Includes Comment):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice", // This is a comment
  "age": 30
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "name": "Alice",
  "age": 30
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 6. Root Element Not Object or Array
        </h3>
        <p>
          A valid JSON document must have either a single object <code className="font-mono">&#x7b;...&#x7d;</code> or a
          single array <code className="font-mono">[...]</code> as its root element. A standalone string, number,
          boolean, or null is not a complete JSON document according to the most common interpretations and parsers.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Standalone Value):</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>{`"Just a string"`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Correct:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>{`{ "message": "Just a string" }`}</pre>
          </div>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono mt-2">
            <pre>{`[ "Just a string" ]`}</pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> How JSON Formatters Help
        </h2>
        <p>
          This is where JSON formatters (also known as JSON validators or beautifiers) come in handy. They are essential
          tools for anyone working with JSON data, especially when dealing with complex or manually edited structures.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileCheck className="w-5 h-5" /> 1. Syntax Validation
        </h3>
        <p>
          The primary function of a JSON formatter/validator is to check if your JSON string conforms to the strict JSON
          specification. When you paste or type JSON into a good formatter, it immediately attempts to parse it. If
          there's a syntax error, it will:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Highlight the exact location</strong> of the error (line number and column).
          </li>
          <li>
            Provide a helpful <strong>error message</strong> explaining what went wrong (e.g., "Unexpected token",
            "Missing comma", "Invalid value").
          </li>
        </ul>
        <p>
          This is infinitely more efficient than trying to find a missing comma or mismatched brace manually in a large
          JSON string.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-5 h-5" /> 2. Beautification and Readability
        </h3>
        <p>
          Formatters can take a minified or poorly indented JSON string and format it with proper indentation and line
          breaks. While indentation doesn't affect the validity of the JSON data itself, readable JSON significantly
          reduces the chance of making manual syntax errors in the first place.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Messy/Minified:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{"user":{"id":123,"name":"Alice","address":{"city":"Wonderland","zip":"12345"}},"items":[{"id":1,"name":"Item A"},{"id":2,"name":"Item B"}]}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Formatted:</h4>
          <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto font-mono">
            <pre>
              {`{
  "user": {
    "id": 123,
    "name": "Alice",
    "address": {
      "city": "Wonderland",
      "zip": "12345"
    }
  },
  "items": [
    {
      "id": 1,
      "name": "Item A"
    },
    {
      "id": 2,
      "name": "Item B"
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> 3. Identifying Strict Compliance Issues
        </h3>
        <p>
          While some parsers (like JavaScript's <code className="font-mono">JSON.parse()</code>) might be slightly
          lenient with things like trailing commas in certain environments, relying on this is risky. A good JSON
          formatter enforces strict compliance with the JSON standard, ensuring your data is valid across different
          platforms and languages.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> Conclusion: Make Formatters Your Friend
        </h2>
        <p>
          Working with JSON is ubiquitous in modern development. While the format is simple, its strict syntax means
          that even minor mistakes can break your application. Recognizing common errors like misplaced commas,
          incorrect quotes, invalid data types, or forbidden comments is crucial. However, the most effective strategy
          is to integrate a JSON formatter or validator into your workflow. These tools instantly catch syntax errors,
          improve readability through beautification, and ensure your JSON is strictly compliant, saving you valuable
          debugging time and preventing frustrating parsing failures. Use them early and often!
        </p>
      </div>
    </>
  );
}
