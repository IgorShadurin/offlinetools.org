import type { Metadata } from "next";
import {
  Code,
  CheckSquare,
  Info,
  LayoutList,
  Diff,
  Eye,
  Wrench, // Changed 'Tool' to 'Wrench'
  MousePointerClick,
  Zap,
  ListChecks,
  Terminal,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching API Testing with JSON Formatters",
  description:
    "Learn how JSON formatters are essential tools for efficient API testing, both manual and automated, with practical examples.",
};

export default function ApiTestingJsonFormattersArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Teaching API Testing with JSON Formatters</h1>

      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
        <p>
          Application Programming Interfaces (APIs) are the backbone of modern software systems, enabling different
          components and services to communicate. A vast majority of web APIs today exchange data using the{" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            JSON (JavaScript Object Notation)
          </a>{" "}
          format. Testing these APIs is crucial to ensure they function correctly, handle data as expected, and maintain
          reliability.
        </p>

        <p>
          While the core concepts of API testing involve sending requests and receiving responses, the format of the
          data—especially JSON—can be complex. This is where <strong className="font-semibold">JSON formatters</strong>{" "}
          become invaluable tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Info className="inline-block text-blue-500" size={24} />
          <span>What is a JSON Formatter?</span>
        </h2>
        <p>
          At its simplest, a JSON formatter (or prettifier) takes raw, often minified or unformatted, JSON text and
          presents it in a structured, human-readable way. This typically involves:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Indenting nested objects and arrays.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Adding line breaks after commas and colons.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Highlighting syntax (keys, strings, numbers, booleans, null).</span>
          </li>
        </ul>

        <p className="mt-4">
          Many formatters also offer features like collapsing sections, filtering data, or even comparing two JSON
          structures (JSON diffing).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="inline-block text-purple-500" size={24} />
          <span>The Problem: Unformatted JSON</span>
        </h2>
        <p>Imagine an API response that looks like this:</p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap">
            {`{"id":"usr_123","name":"Alice","isActive":true,"address":{"street":"123 Main St","city":"Anytown"},"roles":["user","editor"],"lastLogin":null,"preferences":{"theme":"dark","notificationsEnabled":false}}`}
          </pre>
        </div>
        <p>While perfectly valid JSON, this is hard for a human to quickly parse and verify during manual testing.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <LayoutList className="inline-block text-teal-500" size={24} />
          <span>The Solution: Formatted JSON</span>
        </h2>
        <p>A JSON formatter transforms that same response into something like this:</p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap">
            {`{
  "id": "usr_123",
  "name": "Alice",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "roles": [
    "user",
    "editor"
  ],
  "lastLogin": null,
  "preferences": {
    "theme": "dark",
    "notificationsEnabled": false
  }
}`}
          </pre>
        </div>
        <p>
          This structure makes it immediately clear what the data contains, how it's organized, and allows testers to
          quickly spot missing fields, incorrect data types, or unexpected values.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench className="inline-block text-orange-500" size={24} /> {/* Changed 'Tool' to 'Wrench' */}
          <span>Formatters in Manual API Testing</span>
        </h2>
        <p>
          Manual API testing often involves using tools like browser developer consoles, dedicated API testing clients
          (e.g., Postman, Insomnia), or browser extensions.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li className="flex items-start space-x-2">
            <MousePointerClick className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Browser Extensions:</strong> Many browser extensions specifically format
              JSON responses directly in the browser window, making it the simplest way to inspect responses from a
              browser.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Terminal className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">API Clients:</strong> Tools like Postman or Insomnia have built-in
              response viewers that automatically format JSON, providing a clear view for manual verification.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Eye className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Online Formatters:</strong> Copying and pasting JSON into an online
              formatter is useful when dealing with raw JSON from logs or other sources.
            </span>
          </li>
        </ul>

        <p className="mt-4">Using formatters during manual testing helps testers:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Quickly understand the response structure.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Easily locate specific data points.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Identify malformed JSON responses.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>Visually compare a response to expected output.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap className="inline-block text-yellow-500" size={24} />
          <span>Formatters in Automated API Testing</span>
        </h2>
        <p>
          While automated tests work with the raw JSON data programmatically, formatters still play a crucial role,
          particularly in:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li className="flex items-start space-x-2">
            <ClipboardCheck className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Debugging:</strong> When a test fails due to an unexpected response
              body, formatting the received JSON in the test report or console output makes debugging significantly
              faster.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <ListChecks className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Creating Assertions:</strong> Before writing assertions in code,
              inspecting a formatted response helps testers understand the paths to access specific data (e.g.,
              `response.data.address.city`).
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Diff className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Comparing Payloads:</strong> When comparing complex expected vs. actual
              JSON payloads in test failures, a JSON diff tool (often integrated into formatters or available
              separately) visually highlights the differences, which is much easier to read than a raw text diff.
            </span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Diff className="inline-block text-blue-500" size={20} />
          <span>Example: JSON Diffing</span>
        </h3>
        <p>Consider two JSON objects you want to compare:</p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800 my-4">
          <h4 className="font-medium">Expected:</h4>
          <pre className="whitespace-pre-wrap">{`{ "name": "Alice", "age": 30, "tags": ["user", "beta"] }`}</pre>
          <h4 className="font-medium mt-4">Actual:</h4>
          <pre className="whitespace-pre-wrap">{`{ "name": "Alice", "age": 31, "tags": ["user", "admin"], "city": "Anytown" }`}</pre>
        </div>
        <p>A JSON diff tool would show something like:</p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap">
            {`{
  "name": "Alice",
- "age": 30,      // Removed
+ "age": 31,      // Added
  "tags": [
    "user",
-   "beta"        // Removed
+   "admin"       // Added
  ],
+ "city": "Anytown" // Added
}`}
          </pre>
        </div>
        <p>
          This visual representation of additions, deletions, and changes is significantly more helpful than just seeing
          a failed assertion in your test runner's output.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListChecks className="inline-block text-green-500" size={24} />
          <span>Benefits of Using JSON Formatters</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Improved Readability:</strong> Makes complex JSON easy to scan and
              understand.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Faster Debugging:</strong> Quickly identify discrepancies in API
              responses or requests.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Easier Verification:</strong> Simplifies the process of manually
              verifying response data against requirements.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Reduced Errors:</strong> Helps catch subtle formatting or syntax errors
              in manually crafted JSON payloads.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye className="inline-block text-cyan-500" size={24} />
          <span>Beyond Basic Formatting</span>
        </h2>
        <p>Advanced formatters and JSON tools can offer features like:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Tree view or collapsible sections.</li>
          <li>Filtering data based on keys or values.</li>
          <li>Schema validation (checking if JSON conforms to a defined schema).</li>
          <li>Conversion between JSON and other formats (like YAML or XML).</li>
          <li>Querying JSON using languages like JSONPath.</li>
        </ul>
        <p className="mt-4">
          These features further enhance a tester's ability to interact with and validate JSON data efficiently.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON formatters are simple yet powerful tools that significantly improve the efficiency and effectiveness of
          API testing. Whether you're performing manual exploratory testing or debugging failing automated tests, having
          a clear, structured view of the JSON data is essential.
        </p>
        <p>
          Encouraging developers and QAs to use browser extensions, API clients with built-in formatters, or dedicated
          online/desktop tools for JSON formatting should be a standard part of teaching API testing practices in
          today's JSON-centric development world. They transform a potentially tedious task of data inspection into a
          quick and insightful process.
        </p>
      </div>
    </div>
  );
}
