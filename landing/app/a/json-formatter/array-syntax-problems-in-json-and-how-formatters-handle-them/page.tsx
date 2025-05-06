import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about array syntax problems
 */
export const metadata: Metadata = {
  title: "Array Syntax Problems in JSON and How Formatters Handle Them | Offline Tools",
  description:
    "Explore common JSON array syntax problems and understand how formatters identify and correct these issues for valid JSON output.",
};

/**
 * Article page component for array syntax problems in JSON
 */
export default function ArraySyntaxProblemsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Array Syntax Problems in JSON and How Formatters Handle Them</h1>

      <div className="space-y-6">
        <p>
          Arrays are fundamental structures in JSON that allow for the representation of ordered collections of values.
          However, they can also be a source of common syntax errors that break JSON validation. In this article,
          we&apos;ll explore typical array syntax problems and how JSON formatters help identify and resolve these
          issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Basic JSON Array Structure</h2>
        <p>
          Before diving into common problems, let&apos;s review the correct syntax for JSON arrays. Arrays in JSON are
          ordered collections of values enclosed in square brackets <code>[]</code>. Values within an array are
          separated by commas.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Valid JSON Array Examples:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Simple array of strings
["apple", "banana", "cherry"]

// Array of numbers
[1, 2, 3, 4, 5]

// Mixed array with different value types
[42, "hello", true, null, {"key": "value"}]

// Nested arrays
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

// Empty array
[]`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Array Syntax Problems</h2>

        <h3 className="text-xl font-medium mt-6">1. Missing or Extra Commas</h3>
        <p>
          One of the most frequent array syntax errors is related to commas. Either missing a comma between elements or
          including a trailing comma after the last element will cause JSON validation to fail.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Missing comma between elements
["red" "green", "blue"]

// Trailing comma after last element
["Monday", "Tuesday", "Wednesday", ]`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Proper comma usage
["red", "green", "blue"]

// No trailing comma
["Monday", "Tuesday", "Wednesday"]`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Unlike some programming languages like JavaScript, JSON does not allow trailing commas. This is a common
            source of errors when copying data from code into JSON.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Mismatched Brackets</h3>
        <p>
          Arrays must begin with an opening square bracket <code>[</code> and end with a closing square bracket{" "}
          <code>]</code>. Missing or mismatched brackets will cause JSON parsing to fail.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Missing closing bracket
[1, 2, 3, 4

// Missing opening bracket
1, 2, 3, 4]

// Mixed bracket types
[1, 2, 3, 4)`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Properly matched brackets
[1, 2, 3, 4]`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Invalid Array Elements</h3>
        <p>
          Each element in a JSON array must be a valid JSON value: a string, number, object, array, boolean (
          <code>true</code>/<code>false</code>), or <code>null</code>. Using undefined values or functions is not
          allowed in JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Undefined is not valid in JSON
[1, undefined, 3]

// Functions are not valid in JSON
[
  "name",
  function() { return "Hello"; },
  42
]

// Single quotes are not valid for strings in JSON
['apple', 'orange', 'banana']`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Use null instead of undefined
[1, null, 3]

// Remove functions or convert to strings
[
  "name",
  "function() { return \"Hello\"; }",
  42
]

// Use double quotes for strings
["apple", "orange", "banana"]`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Inconsistent Formatting in Large Arrays</h3>
        <p>
          For large arrays, inconsistent formatting can make it difficult to spot syntax errors. This is especially true
          for multi-dimensional arrays or arrays of objects.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Formatting:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[{"id":1,"name":"Product A","price":29.99},
{"id":2,"name":"Product B","price":19.99,"inStock":true},{"id":3,
"name":"Product C","price":39.99,"inStock":false}]`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Improved Formatting:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[
  {
    "id": 1,
    "name": "Product A",
    "price": 29.99
  },
  {
    "id": 2,
    "name": "Product B",
    "price": 19.99,
    "inStock": true
  },
  {
    "id": 3,
    "name": "Product C",
    "price": 39.99,
    "inStock": false
  }
]`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How JSON Formatters Handle Array Problems</h2>

        <h3 className="text-xl font-medium mt-6">1. Visual Bracket Matching</h3>
        <p>
          Many JSON formatters provide visual cues to help identify matching brackets. This feature is especially
          helpful for nested arrays and complex structures.
        </p>

        <h3 className="text-xl font-medium mt-6">2. Automatic Comma Correction</h3>
        <p>
          Some advanced JSON formatters can automatically detect and fix common comma issues, such as adding missing
          commas between elements or removing trailing commas.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Formatter Feature:</h3>
          <p className="mt-2 text-blue-700 dark:text-blue-200">
            Our JSON Formatter automatically highlights syntax errors, including comma problems, and provides clear
            visual indication of where the issues occur in your arrays.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Structural Validation</h3>
        <p>
          JSON formatters typically perform structural validation to ensure that arrays are properly formed according to
          the JSON specification.
        </p>

        <h3 className="text-xl font-medium mt-6">4. Consistent Indentation</h3>
        <p>
          Formatters apply consistent indentation to arrays, making it easier to visually inspect the structure and
          identify potential issues.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Formatter Transformation Example:</h3>
          <p className="mb-2">Before formatting (difficult to read and spot errors):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[{"users":[{"id":1,"name":"John","roles":["admin","editor"]},{"id":2,"name":"Jane","roles":["user"]}],"settings":{"darkMode":true,"notifications":[{"type":"email","enabled":true},{"type":"push","enabled":false}]}}]`}
            </pre>
          </div>

          <p className="mb-2 mt-4">After formatting (clear structure, easy to validate):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[
  {
    "users": [
      {
        "id": 1,
        "name": "John",
        "roles": [
          "admin",
          "editor"
        ]
      },
      {
        "id": 2,
        "name": "Jane",
        "roles": [
          "user"
        ]
      }
    ],
    "settings": {
      "darkMode": true,
      "notifications": [
        {
          "type": "email",
          "enabled": true
        },
        {
          "type": "push",
          "enabled": false
        }
      ]
    }
  }
]`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Real-world Complex Array Example</h2>
        <p>
          Let&apos;s examine a real-world example with various array syntax issues and see how a formatter would
          identify and correct them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Array Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "apiResponse": {
    "results": [
      {"id": 101, "status": "active", "tags": ["featured", "new",]},
      {"id": 102, "status": "inactive" "tags": ["sale", "clearance"]},
      {"id": 103, "status": "pending", "meta": [
        12.5 45.8, 33.2
      ]},
      {"id": 104, "status": "active", "tags": ["featured", "sale"},
    ],
    "pagination": {
      "pages": [1, 2, 3 4, 5],
      "pageSize": 10,
    }
  }
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "apiResponse": {
    "results": [
      {"id": 101, "status": "active", "tags": ["featured", "new"]},
      {"id": 102, "status": "inactive", "tags": ["sale", "clearance"]},
      {"id": 103, "status": "pending", "meta": [
        12.5, 45.8, 33.2
      ]},
      {"id": 104, "status": "active", "tags": ["featured", "sale"]}
    ],
    "pagination": {
      "pages": [1, 2, 3, 4, 5],
      "pageSize": 10
    }
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Issues fixed: Removed trailing comma after &quot;new&quot;, added missing comma after &quot;inactive&quot;,
            added comma between numbers 12.5 and 45.8, added missing closing bracket for the &quot;tags&quot; array in
            the fourth object, added comma between 3 and 4 in the &quot;pages&quot; array, and removed trailing comma
            after &quot;pageSize&quot;.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Avoiding Array Syntax Problems</h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>Use a JSON formatter/validator</strong> to automatically catch and fix array syntax issues.
          </li>
          <li>
            <strong>Be careful when copying arrays from programming languages</strong> that allow features not supported
            in JSON (like trailing commas).
          </li>
          <li>
            <strong>Maintain consistent indentation</strong> for complex nested arrays to make the structure visually
            clear.
          </li>
          <li>
            <strong>Double-check bracket pairs</strong> in large arrays, especially when adding or removing elements.
          </li>
          <li>
            <strong>Use automatic JSON serialization functions</strong> in your programming language rather than
            manually constructing JSON strings.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Array syntax problems are among the most common issues when working with JSON data. Understanding these
          problems and how formatters address them can save you valuable debugging time and help ensure your JSON data
          is valid and properly structured.
        </p>

        <p>
          A good JSON formatter not only beautifies your JSON but also provides valuable feedback about syntax errors,
          making it an essential tool for anyone working with JSON data structures. Whether you&apos;re developing APIs,
          configuring applications, or exchanging data, proper array formatting is crucial for reliable JSON processing.
        </p>
      </div>
    </>
  );
}
