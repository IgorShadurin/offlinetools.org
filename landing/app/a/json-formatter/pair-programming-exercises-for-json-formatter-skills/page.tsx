import type { Metadata } from "next";
import { Code, Users, CheckCheck, Bug, Compass } from "lucide-react"; // Import only necessary icons

export const metadata: Metadata = {
  title: "Pair Programming Exercises for JSON Formatter Skills | Developer Tools",
  description:
    "Enhance your JSON formatting skills through collaborative pair programming exercises. Learn indentation, structure, and edge cases.",
};

export default function JsonFormatterPairProgrammingArticle() {
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Pair Programming Exercises for JSON Formatter Skills
      </h1>

      <p className="text-lg mb-8 text-center text-gray-600 dark:text-gray-400">
        Mastering JSON formatting isn&apos;t just about making it pretty; it&apos;s about ensuring readability and correctness. Practice with a partner to level up your skills!
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Compass className="mr-2 text-blue-500" size={24} />
            Why Focus on JSON Formatting?
          </h2>
          <p>
            JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web and in many applications. While parsing libraries handle the conversion from text to data, understanding and manipulating the text format itself is crucial for:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Debugging API responses or configuration files.</li>
            <li>Writing tests.</li>
            <li>Manually constructing data payloads.</li>
            <li>Troubleshooting serialization/deserialization issues.</li>
            <li>Maintaining readable codebases that include embedded JSON strings.</li>
          </ul>
          <p className="mt-4">
            Good JSON formatting (consistent indentation, spacing, and ordering) significantly improves readability, making it easier to spot errors and understand data structures.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 text-green-500" size={24} />
            Pair Programming for Formatting Skills
          </h2>
          <p>
            Pair programming involves two developers working together at one workstation. One is the &quot;driver&quot; (writing code), and the other is the &quot;navigator&quot; (guiding and reviewing). This approach is excellent for learning formatting skills because:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Immediate Feedback:</strong> The navigator can catch formatting inconsistencies or errors as the driver types.</li>
            <li><strong>Shared Knowledge:</strong> You learn each other&apos;s mental models for structuring JSON.</li>
            <li><strong>Different Perspectives:</strong> One might see a clearer way to indent a complex structure than the other.</li>
            <li><strong>Reinforces Rules:</strong> Articulating *why* you format something a certain way helps solidify your understanding.</li>
            <li><strong>Handling Edge Cases:</strong> Two pairs of eyes are better at spotting tricky cases like empty objects/arrays or escaped characters.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-purple-500" size={24} />
            The Core JSON Formatting Rules
          </h2>
          <p>Recall the basic rules of well-formatted JSON:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Objects <code>&#x7b; &#x7d;</code> contain key-value pairs. Keys are strings in double quotes.</li>
            <li>Arrays <code>[ ]</code> contain ordered lists of values.</li>
            <li>Values can be: strings, numbers, booleans (`true`, `false`), `null`, objects, or arrays.</li>
            <li>Key-value pairs in objects are separated by commas <code>,</code>.</li>
            <li>Elements in arrays are separated by commas <code>,</code>.</li>
            <li>Keys and values are separated by a colon <code>:</code>.</li>
            <li>Whitespace (spaces, tabs, newlines) is used for indentation to show structure.</li>
            <li>Typically, a consistent indentation level (e.g., 2 or 4 spaces) is used for nested structures.</li>
            <li>A space is usually placed after the colon (<code>:</code>) separating a key and its value.</li>
          </ul>
        </div>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCheck className="mr-2 text-teal-500" size={24} />
            Pair Programming Exercises
          </h2>

          {/* Exercise 1 */}
          <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3">Exercise 1: Basic Object and Array</h3>
            <p className="mb-3">
              <strong>Objective:</strong> Format a simple object containing primitives and a flat array. Focus on correct indentation, spacing around colons, and commas.
            </p>
            <p className="font-medium mb-2">Input (Unformatted):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto mb-4">
              <pre>
                {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Physics","Chemistry"]}`}
              </pre>
            </div>
            <p className="font-medium mb-2">Expected Output (Formatted with 2-space indentation):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              <pre>
                {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    "Math",
    "Physics",
    "Chemistry"
  ]
}`}
              </pre>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>Pairing Tip:</strong> Navigator watches for missing commas, incorrect spacing after colons, and consistent indentation level. Driver focuses on typing quickly and accurately.
            </p>
          </div>

          {/* Exercise 2 */}
          <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3">Exercise 2: Nested Structures</h3>
            <p className="mb-3">
              <strong>Objective:</strong> Format JSON with objects nested within objects, and objects within arrays. Pay close attention to increasing indentation levels correctly.
            </p>
            <p className="font-medium mb-2">Input (Unformatted):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto mb-4">
              <pre>
                {`{"company":{"name":"TechCorp","address":{"street":"123 Main St","city":"Anytown"}},"employees":[{"id":1,"name":"Bob"},{"id":2,"name":"Charlie"}]}`}
              </pre>
            </div>
            <p className="font-medium mb-2">Expected Output (Formatted with 4-space indentation):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              <pre>
                {`{
    "company": {
        "name": "TechCorp",
        "address": {
            "street": "123 Main St",
            "city": "Anytown"
        }
    },
    "employees": [
        {
            "id": 1,
            "name": "Bob"
        },
        {
            "id": 2,
            "name": "Charlie"
        }
    ]
}`}
              </pre>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>Pairing Tip:</strong> Discuss the indentation strategy before starting. Navigator should guide the driver on when to increase/decrease indentation based on <code>&#x7b;</code>, <code>&#x7d;</code>, <code>[</code>, and <code>]</code> characters.
            </p>
          </div>

          {/* Exercise 3 */}
          <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3">Exercise 3: Edge Cases and Special Characters</h3>
            <p className="mb-3">
              <strong>Objective:</strong> Format JSON containing empty objects, empty arrays, `null` values, and strings with escaped characters.
            </p>
            <p className="font-medium mb-2">Input (Unformatted):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto mb-4">
              <pre>
                {`{"emptyObj":{},"emptyArr":[],"nullableValue":null,"description":"This is a string with \"quotes\" and a \\n newline.","status":true}`}
              </pre>
            </div>
            <p className="font-medium mb-2">Expected Output (Formatted with 2-space indentation):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              <pre>
                {`{
  "emptyObj": {},
  "emptyArr": [],
  "nullableValue": null,
  "description": "This is a string with \\"quotes\\" and a \\n newline.",
  "status": true
}`}
              </pre>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>Pairing Tip:</strong> Pay attention to the formatting of empty structures (<code>&#x7b;&#x7d;</code> and <code>[]</code> often stay on one line if empty) and ensure escaped characters within strings are preserved correctly (`\"` for `"` and `\\n` for newline). Navigator checks for the correct representation of boolean and null literals.
            </p>
          </div>

           {/* Exercise 4 (Optional) */}
           <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Bug className="mr-2 text-red-500" size={24} />
              Exercise 4: Identify and Fix Malformed JSON
            </h3>
            <p className="mb-3">
              <strong>Objective:</strong> Given malformed JSON, identify the syntax errors (missing commas, incorrect quotes, missing brackets/braces, trailing commas, etc.) and format the corrected version.
            </p>
            <p className="font-medium mb-2">Input (Malformed & Unformatted):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto mb-4">
              <pre>
                {`{name:"David", age: 42, "interests":["coding", "hiking",], city: "London" }`}
              </pre>
            </div>
            <p className="font-medium mb-2">Expected Output (Corrected & Formatted with 2-space indentation):</p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              <pre>
                {`{
  "name": "David",
  "age": 42,
  "interests": [
    "coding",
    "hiking"
  ],
  "city": "London"
}`}
              </pre>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>Pairing Tip:</strong> This is a great exercise for active navigation. The pair should read the input carefully, point out potential errors based on JSON rules, agree on the fix, and then apply the formatting. Errors in the input: key `name` and `city` not in double quotes, `age` value is not a string, trailing comma after &quot;hiking&quot;, extra space before closing brace.
            </p>
          </div>

        </section>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
             <Code className="mr-2 text-blue-500" size={24} />
             Beyond Manual Formatting: Tools
          </h2>
          <p>
            While manual formatting exercises are excellent for learning the rules, in practice, you&apos;ll often use tools:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>`JSON.stringify()`:</strong> JavaScript&apos;s built-in method. It takes an optional `space` argument for indentation (e.g., `JSON.stringify(obj, null, 2)` for 2 spaces).
            </li>
            <li>
              <strong>IDE/Editor Extensions:</strong> Many code editors (VS Code, Sublime Text, etc.) have plugins that automatically format JSON files.
            </li>
            <li>
              <strong>Online Formatters:</strong> Websites dedicated to validating and formatting JSON are readily available.
            </li>
            <li>
              <strong>Command-Line Tools:</strong> Tools like `jq` can process and pretty-print JSON from the command line.
            </li>
          </ul>
          <p className="mt-4">
            However, understanding the underlying structure and rules gained from manual practice makes you much more effective when using these tools or debugging issues they might miss or misinterpret.
          </p>
        </div>

        <div>
           <h2 className="text-2xl font-semibold mb-4 flex items-center">
             <CheckCheck className="mr-2 text-green-500" size={24} />
             Conclusion
           </h2>
           <p>
             Practicing JSON formatting, especially through pair programming, is a valuable exercise for any developer. It reinforces fundamental data structure concepts, improves attention to detail, and directly contributes to writing cleaner, more readable code and easier debugging. Grab a partner, pick an exercise, and start formatting!
           </p>
         </div>

      </section>
    </article>
  );
}