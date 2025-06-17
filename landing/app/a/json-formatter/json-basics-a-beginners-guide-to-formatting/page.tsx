import type { Metadata } from "next";
import { FileJson } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Basics: A Beginner's Guide to Formatting",
  description:
    "A comprehensive guide for beginners to understand JSON data format, its syntax rules, data types, and common usage examples.",
};

export default function JsonBasicsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 w-8 h-8 text-blue-500" />
        JSON Basics: A Beginner&apos;s Guide to Formatting
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          In the world of web development and data exchange, you&apos;ll constantly encounter a format called JSON. It
          stands for <strong>JavaScript Object Notation</strong>, and despite its name, it&apos;s used far beyond just
          JavaScript. It&apos;s the lingua franca for APIs, configuration files, and data storage in many modern
          applications.
        </p>
        <p>
          This guide will walk you through the fundamental rules of JSON formatting, making it easy to read, write, and
          understand.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What is JSON?</h2>
        <p>
          At its core, JSON is a lightweight data-interchange format. It is easy for humans to read and write and easy
          for machines to parse and generate. It&apos;s based on a subset of the JavaScript programming language
          Standard ECMA-262 3rd Edition - December 1999. However, its syntax is independent of any programming language,
          making it a perfect choice for exchanging data between different systems or languages.
        </p>
        <p>
          Think of JSON as a structured way to represent data, much like how you&apos;d write down notes or lists with
          clear labels and organization.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">JSON Syntax Rules</h2>
        <p>JSON is built on two structures:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A collection of name/value pairs. In various languages, this is realized as an object, record, struct,
            dictionary, hash table, keyed list, or associative array. In JSON, this is an <strong>Object</strong>.
          </li>
          <li>
            An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence. In
            JSON, this is an <strong>Array</strong>.
          </li>
        </ul>

        <p>Let&apos;s break down the specific formatting rules:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Data is in Name/Value Pairs</h3>
        <p>
          JSON data is written as key/value pairs, just like properties in JavaScript objects. The key must be a string
          (enclosed in double quotes), followed by a colon (:), followed by the value.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">{`"firstName": "John"`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Objects Hold Key/Value Pairs</h3>
        <p>
          A JSON <strong>Object</strong> is enclosed in curly braces <code>&#x7b; &#x7d;</code>. Key/value pairs within
          an object are separated by commas (,).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Arrays Hold Lists of Values</h3>
        <p>
          A JSON <strong>Array</strong> is enclosed in square brackets <code>[ ]</code>. Values within an array are
          separated by commas (,). Array values can be any valid JSON data type (strings, numbers, objects, other
          arrays, booleans, null).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`[
  "apple",
  "banana",
  "cherry"
]`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`[
  { "id": 1, "name": "Item A" },
  { "id": 2, "name": "Item B" }
]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. JSON Data Types</h3>
        <p>A JSON value must be one of the following data types:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>String:</strong> A sequence of Unicode characters enclosed in double quotes. Escape special
            characters like `"` and `\`.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm">{`"Hello, world!"`}</pre>
              <pre className="text-sm mt-1">{`"This is a string with a \\"quote\\" inside."`}</pre>
            </div>
          </li>
          <li>
            <strong>Number:</strong> An integer or a floating-point number. Scientific notation is allowed. Must NOT
            have leading zeros (unless it&apos;s just `0`) or trailing decimal points.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm">{`123`}</pre>
              <pre className="text-sm mt-1">{`-45.67`}</pre>
              <pre className="text-sm mt-1">{`1.2e+10`}</pre>
            </div>
          </li>
          <li>
            <strong>Boolean:</strong> Either <code>true</code> or <code>false</code>. Must be lowercase.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm">{`true`}</pre>
              <pre className="text-sm mt-1">{`false`}</pre>
            </div>
          </li>
          <li>
            <strong>Null:</strong> An empty value, denoted by <code>null</code>. Must be lowercase.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm">{`null`}</pre>
            </div>
          </li>
          <li>
            <strong>Object:</strong> As described above, <code>&#x7b; &#x7d;</code>.
          </li>
          <li>
            <strong>Array:</strong> As described above, <code>[ ]</code>.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. Whitespace</h3>
        <p>
          Whitespace between JSON elements (like spaces, tabs, and newlines) is ignored. This allows for
          &quot;pretty-printing&quot; JSON with indentation to make it more readable.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "a": 1,
  "b": 2
}`}
          </pre>
        </div>
        <p>is functionally the same as:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">{`{"a":1,"b":2}`}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Putting it Together: Examples</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Simple Object:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "bookTitle": "The Hitchhiker's Guide to the Galaxy",
  "author": "Douglas Adams",
  "publishedYear": 1979,
  "isAvailable": true
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Object with Nested Object:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "person": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "age": 25
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Object with Array:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "fruits": ["apple", "banana", "cherry"],
  "count": 3
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Array of Objects:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`[
  { "name": "Item 1", "value": 10 },
  { "name": "Item 2", "value": 20 },
  { "name": "Item 3", "value": 30 }
]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Complex Example (Nested Objects and Arrays):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "company": "Tech Solutions Inc.",
  "employees": [
    {
      "id": 101,
      "name": "Alice Smith",
      "department": "Engineering",
      "skills": ["Java", "Python", "SQL"],
      "manager": null
    },
    {
      "id": 102,
      "name": "Bob Johnson",
      "department": "Marketing",
      "skills": ["SEO", "Content Creation"],
      "manager": {
         "id": 103,
         "name": "Charlie Brown"
      }
    }
  ],
  "location": {
    "city": "San Francisco",
    "country": "USA"
  },
  "isActive": true
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common Pitfalls (What NOT to do)</h2>
        <p>
          JSON has strict formatting rules. Unlike JavaScript object literals, these things will cause a JSON parser to
          fail:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Using single quotes for strings or keys:</strong> Always use double quotes{" "}
            <code>&quot; &quot;</code>.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`{ 'name': 'Alice' }`}</pre>
              <p className="text-xs italic">Incorrect - keys and strings must use double quotes.</p>
              <pre className="text-sm text-green-500 mt-2">{`{ "name": "Alice" }`}</pre>
              <p className="text-xs italic">Correct.</p>
            </div>
          </li>
          <li>
            <strong>Having trailing commas:</strong> The last item in an object or array must NOT have a comma after it.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`{ "a": 1, "b": 2, }`}</pre>
              <p className="text-xs italic">Incorrect - trailing comma after `2`.</p>
              <pre className="text-sm text-green-500 mt-2">{`{ "a": 1, "b": 2 }`}</pre>
              <p className="text-xs italic">Correct.</p>
            </div>
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`[ 1, 2, 3, ]`}</pre>
              <p className="text-xs italic">Incorrect - trailing comma after `3`.</p>
              <pre className="text-sm text-green-500 mt-2">{`[ 1, 2, 3 ]`}</pre>
              <p className="text-xs italic">Correct.</p>
            </div>
          </li>
          <li>
            <strong>Not quoting keys:</strong> Keys must always be strings (quoted with double quotes).
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`{ name: "Alice" }`}</pre>
              <p className="text-xs italic">Incorrect - key `name` is not quoted.</p>
              <pre className="text-sm text-green-500 mt-2">{`{ "name": "Alice" }`}</pre>
              <p className="text-xs italic">Correct.</p>
            </div>
          </li>
          <li>
            <strong>Using comments:</strong> JSON does NOT support comments.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`{ "name": "Alice", // This is a comment\n  "age": 30\n}`}</pre>
              <p className="text-xs italic">Incorrect - JSON does not allow comments.</p>
              <pre className="text-sm text-green-500 mt-2">{`{ "name": "Alice",\n  "age": 30\n}`}</pre>
              <p className="text-xs italic">Correct.</p>
            </div>
          </li>
          <li>
            <strong>Using non-standard values:</strong> Things like <code>undefined</code>, JavaScript functions, or{" "}
            <code>NaN</code> are not valid JSON values.
            <div className="bg-gray-100 p-3 rounded my-2 dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-red-500">{`{ "value": undefined }`}</pre>
              <pre className="text-sm text-red-500 mt-1">{`{ "value": NaN }`}</pre>
              <p className="text-xs italic">Incorrect - `undefined` and `NaN` are not standard JSON values.</p>
              <pre className="text-sm text-green-500 mt-2">{`{ "value": null }`}</pre>
              <p className="text-xs italic">Correct - use `null` for missing or unknown values.</p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Validating JSON</h2>
        <p>
          Because the rules are strict, it&apos;s easy to make formatting mistakes. Fortunately, many online tools
          (search for &quot;JSON validator&quot;) can help you check if your JSON is correctly formatted and highlight
          any errors. Most code editors also provide syntax highlighting and formatting for JSON files, which can catch
          simple errors quickly.
        </p>
        <p>
          In programming languages, built-in functions (like <code>JSON.parse()</code> in JavaScript or equivalent
          functions in Python, Java, etc.) will throw an error if the input string is not valid JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why is JSON So Popular?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Simplicity:</strong> The syntax is minimal and easy to grasp.
          </li>
          <li>
            <strong>Readability:</strong> Compared to formats like XML, JSON is much less verbose.
          </li>
          <li>
            <strong>Language Agnostic:</strong> Parsers and generators exist for virtually every programming language.
          </li>
          <li>
            <strong>Efficiency:</strong> It&apos;s generally fast to parse and generate, which is crucial for web APIs.
          </li>
          <li>
            <strong>Direct Mapping to Data Structures:</strong> JSON objects map naturally to dictionaries/hash maps,
            and JSON arrays map to lists/arrays in most languages.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Understanding JSON formatting is a fundamental skill for any modern developer. By sticking to its simple rules
          – using double quotes for keys and strings, separating pairs and values with commas, and enclosing objects in
          braces and arrays in brackets – you can effectively exchange data with APIs, configure applications, and store
          structured information. Remember to validate your JSON if you encounter parsing errors, as even small syntax
          mistakes can cause issues.
        </p>
      </div>
    </>
  );
}
