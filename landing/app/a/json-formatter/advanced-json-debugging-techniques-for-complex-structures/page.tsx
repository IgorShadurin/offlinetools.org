import type { Metadata } from "next";
import {
  Search,
  FileJson,
  Check,
  GitCompare,
  Network,
  Code,
  Eye,
  Printer,
  ListTree,
  Scale,
  ArrowRightLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Advanced JSON Debugging Techniques for Complex Structures | Developer Article",
  description:
    "Go beyond basic console logging to effectively debug large and complex JSON data structures using advanced tools and techniques.",
};

export default function AdvancedJsonDebuggingArticle() {
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Search className="w-8 h-8" />
        <span>Advanced JSON Debugging Techniques for Complex Structures</span>
      </h1>

      <section className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Working with APIs, databases, and configurations often involves handling JSON data. While simple JSON
          structures are easy to inspect, debugging issues with large, deeply nested, or inconsistent JSON can quickly
          become a tedious task using just basic methods. This article explores advanced techniques to help developers
          of all levels efficiently debug complex JSON structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <FileJson className="w-6 h-6" />
          <span>Why Basic Debugging Falls Short with Complex JSON</span>
        </h2>
        <p>
          The go-to method for many is <code>console.log()</code> or pausing execution in a debugger and inspecting a
          variable. This works well for small, predictable JSON. However, when dealing with:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Deeply nested objects and arrays.</li>
          <li>Large volumes of data.</li>
          <li>Inconsistent or missing fields.</li>
          <li>Data format variations (e.g., a field is sometimes a string, sometimes an array).</li>
          <li>Errors occurring within loops or complex data processing logic.</li>
        </ul>
        <p>
          Simply printing the entire object can clutter your console and make it nearly impossible to find the specific
          piece of data causing the problem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Printer className="w-6 h-6" />
          <span>Technique 1: Pretty-Printing and Formatting</span>
        </h2>
        <p>
          Raw, unformatted JSON can be a single, long line of text, especially if it comes from an API response.
          Pretty-printing adds whitespace (indentation and newlines) to make the structure clear and readable.
        </p>

        <h3 className="text-xl font-semibold mt-6">Browser Developer Tools</h3>
        <p>
          Most modern browser developer tools automatically pretty-print JSON responses in the "Network" tab and JSON
          objects logged to the console. Use the Network tab to inspect the actual response body of API calls.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Using <code>JSON.stringify()</code> for Console Output
        </h3>
        <p>
          When logging objects in your code, use the third argument of <code>JSON.stringify()</code> to control
          indentation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Pretty-Printing in Console</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`const complexData = {
  user: {
    id: 101,
    name: "Alice",
    address: {
      street: "123 Main St",
      city: "Anytown",
      zip: "12345",
    },
    orders: [
      { id: "A1", items: ["item1", "item2"], total: 45.50 },
      { id: "A2", items: ["item3"], total: 10.00 },
    ],
  },
  settings: {
    theme: "dark",
    notifications: { email: true, sms: false },
  },
};

// Basic log (might be one line or poorly formatted)
console.log("Raw:", complexData);

// Pretty-printed log with 2 spaces indentation
console.log("Pretty:", JSON.stringify(complexData, null, 2));

// Pretty-printed log with tab indentation
console.log("Pretty Tabs:", JSON.stringify(complexData, null, '\\t'));`}
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Using <code>JSON.stringify(data, null, 2)</code> makes the console output much easier to read for nested
            structures.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Online Formatters/Viewers</h3>
        <p>
          For very large JSON blobs or API responses, copy the JSON string into an online JSON formatter or viewer.
          These tools often provide syntax highlighting, collapsible sections, and tree views. Be cautious with
          sensitive data on public online tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Scale className="w-6 h-6" />
          <span>Technique 2: Schema Validation</span>
        </h2>
        <p>
          Inconsistent data is a common source of bugs. JSON Schema is a powerful tool to define the structure, data
          types, and constraints of your JSON. Validating your JSON against a schema can pinpoint exactly where the data
          deviates from the expected format.
        </p>
        <p>
          Libraries exist in most languages (like <code>ajv</code> in JavaScript/TypeScript) to perform this validation
          programmatically.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Simple JSON Schema</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User Profile",
  "description": "Schema for a basic user profile object",
  "type": "object",
  "properties": {
    "id": {
      "description": "Unique identifier for the user",
      "type": "integer",
      "minimum": 1
    },
    "name": {
      "description": "Name of the user",
      "type": "string"
    },
    "address": {
      "description": "User's address details",
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zip": { "type": "string", "pattern": "^\\d{5}(?:[-\\s]\\d{4})?$" }
      },
      "required": ["street", "city", "zip"]
    },
    "orders": {
      "description": "List of user's orders",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "items": { "type": "array", "items": { "type": "string" } },
          "total": { "type": "number" }
        },
        "required": ["id", "items", "total"]
      }
    },
    "settings": {
      "type": "object",
      "properties": {
        "theme": { "type": "string", "enum": ["light", "dark", "system"] },
        "notifications": {
          "type": "object",
          "properties": {
            "email": { "type": "boolean" },
            "sms": { "type": "boolean" }
          },
          "required": ["email", "sms"]
        }
      },
      "required": ["theme", "notifications"]
    }
  },
  "required": ["id", "name", "address", "orders", "settings"]
}`}
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Validating against such a schema immediately tells you if <code>address.zip</code> is missing or if{" "}
            <code>orders</code> is not an array, pointing you directly to the data issue.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>Technique 3: Path-Based Querying (JSONPath)</span>
        </h2>
        <p>
          When you need to inspect a specific value or a subset of data within a large JSON, traversing nested objects
          and arrays manually in the debugger is inefficient. JSONPath is a query language for JSON, similar to XPath
          for XML. It allows you to select elements using path expressions.
        </p>
        <p>
          Many online JSON viewers and command-line tools (like <code>jq</code>, though not allowed here) support
          JSONPath.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: JSONPath Expressions</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`Assuming the complexData from the previous example:

$.user.name               // Selects the value of the 'name' field within 'user' -> "Alice"
$.user.orders[0]          // Selects the first element in the 'orders' array
$.user.orders[*].total    // Selects the 'total' field for all elements in the 'orders' array -> [45.50, 10.00]
$.user.address.zip        // Selects the user's zip code -> "12345"
$.settings.notifications.* // Selects all values within the 'notifications' object -> [true, false]
$..id                     // Selects all fields named 'id' anywhere in the structure -> [101, "A1", "A2"]
`}
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Use JSONPath queries in compatible tools to quickly extract the data you need to examine without manual
            traversal.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <GitCompare className="w-6 h-6" />
          <span>Technique 4: Comparing JSON Objects (Diffing)</span>
        </h2>
        <p>
          Debugging often involves understanding *what changed* between two versions of a JSON structure – perhaps
          between an expected value and an actual value, or between two different API responses. JSON diff tools
          highlight the differences, making it easy to spot unexpected modifications or missing data.
        </p>
        <p>
          Many online JSON diff tools are available, or you can use command-line utilities (like <code>diff</code> with
          JSON-aware plugins or <code>jq</code>) or even code libraries designed for object comparison.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Diff Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`// Original JSON
{ "name": "Bob", "age": 25, "roles": ["user"] }

// Modified JSON
{ "name": "Bob", "age": 26, "roles": ["user", "admin"] }

// Conceptual Diff Output (varies by tool)
--- original
+++ modified
@@ -1,3 +1,4 @@
 {
   "name": "Bob",
-  "age": 25,
+  "age": 26,        // Age changed from 25 to 26
   "roles": [
     "user",
+    "admin"       // Added 'admin' role
   ]
 }
`}
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Diffing helps you focus only on the parts of the JSON that are different.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <ListTree className="w-6 h-6" />
          <span>Technique 5: Visualizers and Tree Views</span>
        </h2>
        <p>
          For very large or deeply nested JSON, a visual tree representation is invaluable. These tools display the JSON
          structure as an expandable/collapsible tree, allowing you to navigate and inspect specific branches without
          being overwhelmed by the entire document.
        </p>
        <p>
          Browser developer tools (especially for objects in the console), many IDEs (like VS Code with extensions), and
          online JSON viewers provide this functionality.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Benefit of Tree Views</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Instead of scanning lines of text, you can collapse irrelevant sections (like a large array) and expand only
            the specific object or array you suspect contains the bug. This hierarchical view mirrors the data's
            structure and improves navigation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Network className="w-6 h-6" />
          <span>Technique 6: Debugging API Responses in the Network Tab</span>
        </h2>
        <p>
          When debugging frontend issues related to data from a backend API, the browser's Network tab is your best
          friend.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Inspect the Response Body:</strong> Look at the "Response" or "Preview" tab for the specific API
            call. Browsers usually pretty-print the JSON and often provide a tree view. This shows you the *exact* data
            received from the server, ruling out client-side parsing or processing errors.
          </li>
          <li>
            <strong>Check Headers and Status Codes:</strong> Ensure the <code>Content-Type</code> header is{" "}
            <code>application/json</code> and the status code is as expected (e.g., <code>200 OK</code>, not{" "}
            <code>400 Bad Request</code> or <code>500 Internal Server Error</code>).
          </li>
          <li>
            <strong>View Request Payload:</strong> If debugging a POST/PUT request, check the "Request" or "Payload" tab
            to see the JSON data sent to the server.
          </li>
          <li>
            <strong>Copy as cURL:</strong> Most browsers allow you to "Copy as cURL". You can then run this command in
            your terminal to replicate the API request outside your application, which is useful for isolating whether
            the issue is in the client code or the server response.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Check className="w-6 h-6" />
          <span>Technique 7: Leveraging Types and Interfaces (TypeScript)</span>
        </h2>
        <p>
          If you're using TypeScript, defining interfaces or types that accurately represent your JSON structure can
          catch many data-related bugs *before* you even run your code. The compiler will alert you if you try to access
          properties that might not exist or have the wrong type according to your definitions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: TypeScript Interface</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`interface Address {
  street: string;
  city: string;
  zip: string; // Or maybe number depending on strictness
}

interface Order {
  id: string;
  items: string[];
  total: number;
}

interface Notifications {
  email: boolean;
  sms: boolean;
}

interface Settings {
  theme: "light" | "dark" | "system";
  notifications: Notifications;
}

interface User {
  id: number;
  name: string;
  address: Address;
  orders: Order[];
  settings: Settings;
}

// If you try to access user.addresses (typo) or user.id.toFixed() (incorrect type),
// TypeScript will give a compile-time error.
function processUser(user: User) {
  console.log("User name:", user.name);
  console.log("First order total:", user.orders[0].total);
  // This would cause a TypeScript error if user.address was undefined or null:
  console.log("User city:", user.address.city);
}

// You might need runtime checks if the JSON comes from an untrusted source (like an API)
// const rawData: any = ... // data from API
// if (isValidUser(rawData)) { // isValidUser would use schema validation or manual checks
//   processUser(rawData);
// } else {
//   console.error("Invalid user data structure");
// }
`}
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            While types don't replace runtime validation for external data, they provide strong compile-time checks
            within your codebase, significantly reducing data structure-related bugs.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <ArrowRightLeft className="w-6 h-6" />
          <span>Technique 8: Handling Very Large JSON Files</span>
        </h2>
        <p>
          Sometimes the JSON you need to debug is enormous (hundreds of MB or GB). Standard tools and methods might
          struggle to load or process these files.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Streaming Parsers:</strong> Instead of loading the whole file into memory, use libraries that can
            parse JSON as a stream (e.g., <code>jsonstream</code> or <code>clarinet</code> in Node.js). This allows you
            to process data chunk by chunk or listen for specific events (like finding an object in an array), reducing
            memory usage.
          </li>
          <li>
            <strong>Sampling:</strong> If you only need to understand the structure or debug logic applied to individual
            items in a large array, process only the first N items or a random sample.
          </li>
          <li>
            <strong>Command-line Tools:</strong> Tools like <code>jq</code> (if your environment allows) are highly
            optimized for processing large JSON files from the command line.
          </li>
          <li>
            <strong>Specialized Editors:</strong> Some text editors or IDEs are better equipped to handle very large
            files than standard web browsers or simple text editors.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Eye className="w-6 h-6" />
          <span>Conclusion</span>
        </h2>
        <p>
          Debugging complex JSON doesn't have to be a frustrating experience. By moving beyond simple console logging
          and utilizing techniques like pretty-printing, schema validation, path-based querying, diffing, visualizers,
          network tab inspection, and leveraging strong typing, you can gain much better insight into your data. Choose
          the right tool or technique based on the complexity and size of the JSON and the nature of the bug you're
          trying to find. Mastering these methods will save you significant time and effort when working with real-world
          data structures.
        </p>
      </section>
    </article>
  );
}
