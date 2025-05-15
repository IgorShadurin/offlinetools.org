import type { Metadata } from "next";
import { Code, Check, X, BookOpen, Wrench, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: "Self-Directed Learning Resources for JSON Formatting | Offline Tools",
  description:
    "A comprehensive guide and resource collection for developers of all levels to learn about proper JSON formatting.",
};

export default function JsonFormattingResources() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          <Sparkles className="inline-block mr-2 h-8 w-8 text-yellow-500" />
          Self-Directed Learning Resources: JSON Formatting
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-blue-500" />
              Understanding JSON Formatting
            </h2>
            <p className="mb-4">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans
              to read and write and easy for machines to parse and generate. While seemingly simple, correct
              formatting is crucial for data to be valid and usable by applications. This page guides you
              through essential concepts and points you to resources for self-directed learning.
            </p>
            <p>
              Think of JSON as a way to represent structured data using only two structures:
              <strong>objects</strong> (key-value pairs) and <strong>arrays</strong> (ordered lists).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-6 w-6 text-green-500" />
              Core JSON Syntax Rules
            </h2>
            <p className="mb-4">
              Adhering strictly to the syntax is non-negotiable for JSON parsing. Here are the fundamental rules:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Data is in name/value pairs.</strong>
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">{`"name": "value"`}</code></pre>
                </div>
              </li>
              <li>
                <strong>Data is separated by commas.</strong> This applies to elements in an array and key-value pairs in an object.
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">{`[ "apple", "banana", "cherry" ]`}</code></pre>
                  <pre><code className="language-json">{`{ "city": "New York", "zip": "10001" }`}</code></pre>
                </div>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <X className="mr-1 h-4 w-4" />
                  <span className="font-semibold">Error: Trailing comma!</span> This is invalid JSON, though some parsers might tolerate it (don't rely on it).
                  <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                    <pre><code className="language-json">{`[ "apple", "banana", "cherry", ] // INVALID JSON`}</code></pre>
                  </div>
                </p>
              </li>
              <li>
                <strong>Objects are enclosed in curly braces.</strong> Keys *must* be strings enclosed in double quotes. Values can be any valid JSON data type.
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">
{`{
  "firstName": "John",
  "lastName": "Doe",
  "isStudent": false
}`}
                  </code></pre>
                </div>
              </li>
              <li>
                <strong>Arrays are enclosed in square brackets.</strong> Elements are separated by commas and can be of different types (though often they are homogeneous).
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">
{`[
  "a string",
  123,
  true,
  null,
  { "nested": "object" },
  [ 1, 2, 3 ]
]`}
                  </code></pre>
                </div>
              </li>
              <li>
                <strong>Values can be:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>A string (in double quotes, must use HTML entities for special chars like `\"`, `\\`, etc.)</li>
                  <li>A number (integer or floating point, no leading zeros unless value is 0)</li>
                  <li>A boolean (`true` or `false`)</li>
                  <li>`null`</li>
                  <li>An object</li>
                  <li>An array</li>
                </ul>
              </li>
              <li>
                <strong>Keys *must* be strings in double quotes (`"key"`).</strong> Single quotes (`'key'`) or unquoted keys are invalid.
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">
{`{
  "validKey": "value",
  // 'invalidKey': "value", // INVALID
  // invalidKey: "value"    // INVALID
}`}
                  </code></pre>
                </div>
              </li>
              <li>
                <strong>Strings must use double quotes (`"`).</strong> Special characters like double quotes, backslashes, newlines, etc., must be escaped using a backslash (`\`).
                <div className="bg-gray-100 p-3 rounded-md my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre><code className="language-json">{`"A string with \\"quotes\\" and a \\nnewline."`}</code></pre>
                </div>
              </li>
              <li>
                <strong>Whitespace</strong> (spaces, tabs, newlines) is generally ignored between elements and values, but *not* within strings. Consistent indentation and spacing improve readability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <X className="mr-2 h-6 w-6 text-red-500" />
              Common Formatting Pitfalls
            </h2>
            <p className="mb-4">
              Many errors stem from minor syntax deviations. Watch out for:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold">Using single quotes (`'`) instead of double quotes (`"`).</span>
                <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`{ 'key': 'value' }`}</code></pre>
                   <p className="text-sm">Use double quotes: <code>{`{ "key": "value" }`}</code></p>
                </div>
              </li>
              <li>
                <span className="font-semibold">Trailing commas.</span>
                 <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`[1, 2, 3,]`}</code></pre>
                   <p className="text-sm">Remove the last comma: <code>{`[1, 2, 3]`}</code></p>
                </div>
              </li>
              <li>
                <span className="font-semibold">Forgetting commas between items in arrays or key-value pairs in objects.</span>
                <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`{ "name": "Alice" "age": 30 }`}</code></pre>
                   <p className="text-sm">Add the comma: <code>{`{ "name": "Alice", "age": 30 }`}</code></p>
                </div>
              </li>
               <li>
                <span className="font-semibold">Missing quotes around keys.</span>
                <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`{ name: "Alice" }`}</code></pre>
                   <p className="text-sm">Quote the key: <code>{`{ "name": "Alice" }`}</code></p>
                </div>
              </li>
              <li>
                <span className="font-semibold">Using comments (`//` or `/* */`).</span> JSON does not support comments.
                <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`{ "name": "Alice" // this is a name }`}</code></pre>
                   <p className="text-sm">Remove comments.</p>
                </div>
              </li>
              <li>
                <span className="font-semibold">Incorrectly escaping special characters in strings.</span>
                <div className="bg-red-100 p-3 rounded-md my-2 dark:bg-red-900 overflow-x-auto text-red-800 dark:text-red-200">
                   <pre><code className="language-json">{`"Path: C:\Users\Data"`}</code></pre>
                   <p className="text-sm">Escape the backslashes: <code>{`"Path: C:\\Users\\Data"`}</code></p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Wrench className="mr-2 h-6 w-6 text-purple-500" />
              Formatting & Validation Tools
            </h2>
            <p className="mb-4">
              The best way to ensure your JSON is correct and well-formatted is to use automated tools.
              These tools can validate syntax and automatically format your JSON for readability.
            </p>
            <p className="font-semibold mb-2">Types of tools:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Online JSON Validators/Formatters:</strong> Websites where you can paste JSON text to validate and format it instantly. Examples include JSONLint, JSONFormatter, etc. (Search for "online JSON validator" or "online JSON formatter").
              </li>
              <li>
                <strong>IDE/Code Editor Extensions:</strong> Most modern code editors (VS Code, Sublime Text, Atom, etc.) have built-in support or plugins for JSON syntax highlighting, validation, and auto-formatting on save.
              </li>
              <li>
                <strong>Command-Line Tools:</strong> Utilities like <code>jq</code> allow parsing, manipulating, and formatting JSON from the command line.
              </li>
              <li>
                <strong>Programming Language Libraries:</strong> Standard libraries in most languages (Python's <code>json</code>, Node.js's built-in <code>JSON</code> object, Java's Jackson/Gson, etc.) provide robust parsing and generation, inherently producing valid JSON. Using these libraries to generate JSON is generally safer than manually constructing strings.
              </li>
            </ul>
            <div className="bg-green-100 p-3 rounded-md my-4 dark:bg-green-900 overflow-x-auto text-green-800 dark:text-green-200 flex items-center">
              <Check className="mr-2 h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">Best Practice:</span> Always validate JSON from external sources or manually constructed JSON using a validator. Use your code editor's built-in formatter.
              </p>
            </div>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-orange-500" />
              Resources for Deeper Learning
            </h2>
            <p className="mb-4">
              To solidify your understanding and explore advanced topics (like JSON Schema for validation rules or JSONPath for querying), refer to these resource types:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold">The Official JSON Website:</span> While brief, json.org provides the core syntax diagrams. Understanding these diagrams is key.
              </li>
              <li>
                <span className="font-semibold">MDN Web Docs:</span> Search for "JSON" on the Mozilla Developer Network. They have excellent, accessible explanations of `JSON.parse()` and `JSON.stringify()` in JavaScript, which are fundamental concepts.
              </li>
              <li>
                <span className="font-semibold">Wikipedia:</span> The JSON page on Wikipedia often provides historical context and details on specifications like RFCs.
              </li>
              <li>
                <span className="font-semibold">Online Tutorials & Courses:</span> Platforms like freeCodeCamp, Coursera, Udemy, and many developer blogs offer specific lessons on JSON syntax and usage in various programming languages. Search for "JSON tutorial" on your preferred platform.
              </li>
              <li>
                <span className="font-semibold">Documentation for Language-Specific JSON Libraries:</span> Whatever language you use (Python, Node.js, Java, C#, PHP, Ruby, Go, etc.), read the documentation for its standard or popular JSON handling libraries. This is where you'll learn practical usage patterns.
              </li>
            </ul>
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-indigo-500" />
              Summary & Key Takeaways
            </h2>
            <p className="mb-4">
              Mastering JSON formatting is essential for any developer working with data interchange. Remember the core rules:
            </p>
             <ul className="list-disc pl-6 space-y-2">
              <li>Data is key-value pairs or ordered lists.</li>
              <li>Use curly braces for objects, square brackets for arrays.</li>
              <li>Always use double quotes for keys and string values.</li>
              <li>Separate items with commas (no trailing commas!).</li>
              <li>Values are strings, numbers, booleans, null, objects, or arrays.</li>
              <li>No comments allowed in JSON.</li>
              <li>Escape special characters within strings.</li>
            </ul>
            <p className="mt-4">
              Leverage automated tools for validation and formatting. Dedicate time to practicing by writing and parsing JSON examples, and consult the official specifications and trusted resources linked above when in doubt. Self-directed learning with real-world data and consistent validation is the most effective path to mastery.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}