import type { Metadata } from "next";
import {
  Check,
  IndentIncrease,
  Search,
  FolderTree,
  Code,
  AlertCircle,
  Diff,
  FileJson,
  ListTodo,
  Maximize,
  Minimize,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Microlearning Modules for JSON Formatter Features | Offline Tools",
  description:
    "Explore key features of JSON formatters through microlearning modules, covering formatting, validation, tree view, search, and more.",
};

export default function JsonFormatterFeaturesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Microlearning Modules: Unpacking JSON Formatter Features
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the ubiquitous data interchange format in web development
          and beyond. While simple in structure, reading and writing large or complex JSON can be challenging.
          This is where <strong className="font-semibold">JSON Formatters</strong> come in.
          They are essential tools for developers, providing features that make working with JSON easier,
          more efficient, and less error-prone.
        </p>
        <p>
          This article breaks down the key features of a typical JSON formatter into small, digestible
          "microlearning modules." Whether you&apos;re a beginner or an experienced developer, understanding
          these features will significantly enhance your productivity when handling JSON data.
        </p>

        {/* Module 1: Core Formatting */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Code className="text-blue-500" /> Module 1: Core Formatting &amp; Indentation
          </h2>
          <p>
            The most fundamental task of a JSON formatter is taking raw, often
            unreadable JSON strings and presenting them in a structured, indented format.
            This makes the hierarchical nature of JSON immediately visible.
          </p>
          <h3 className="text-xl font-medium">What it does:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Adds appropriate whitespace, line breaks, and indentation.</li>
            <li>Aligns keys and values for readability.</li>
            <li>Handles various indentation levels (e.g., 2 spaces, 4 spaces, tabs).</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Why it&apos;s useful:</h3>
          <p>
            Human readability is drastically improved, making it easy to trace nested objects and arrays,
            identify data structures, and spot missing commas or brackets.
          </p>
          <h3 className="text-xl font-medium mt-4">Example:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Consider this unformatted JSON:
          </p>
          <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Formatted (e.g., 2-space indentation):
          </p>
          <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
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
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <IndentIncrease size={18} /> Key takeaway: Good formatting reveals structure.
            </div>
        </div>

        {/* Module 2: Syntax Validation */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <AlertCircle className="text-yellow-500" /> Module 2: Syntax Validation
          </h2>
          <p>
            Beyond just formatting, a good tool validates if the JSON is actually syntactically correct
            according to the JSON specification.
          </p>
          <h3 className="text-xl font-medium">What it does:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Checks for missing commas between key-value pairs or array elements.</li>
            <li>Ensures keys are double-quoted strings.</li>
            <li>Verifies correct usage of brackets <code>[</code>, <code>]</code>, braces <code>&#x7b;</code>, <code>&#x7d;</code>, and colons <code>:</code>.</li>
            <li>Identifies incorrect value types (e.g., unquoted strings, trailing commas - though some parsers are lenient, formatters often flag these).</li>
            <li>Points out where the syntax error occurred (line number, position).</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Why it&apos;s useful:</h3>
          <p>
            Catching syntax errors early is crucial for debugging APIs, configuration files,
            or data exchange issues. It prevents runtime errors in applications that consume the JSON.
          </p>
          <h3 className="text-xl font-medium mt-4">Example:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Consider this JSON with errors:
          </p>
          <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`{
  name: "Bob", // Error: Key "name" not quoted
  "age": 25,
  "city": "Paris" // Error: Missing comma here
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A validator would typically report errors like:
          </p>
          <div className="bg-red-100 text-red-800 p-3 rounded dark:bg-red-900 dark:text-red-200 overflow-x-auto">
            <pre className="text-sm">
              {`Error: Expected string literal or '}' at line 2, column 3 (character 4)
Error: Expected comma or '}' at line 4, column 1 (character 31)`}
            </pre>
          </div>
           <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check size={18} className="text-green-500"/> Key takeaway: Validation ensures your JSON is parseable.
            </div>
        </div>

        {/* Module 3: Tree/Hierarchical View */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FolderTree className="text-green-500" /> Module 3: Tree View &amp; Visualization
          </h2>
          <p>
            Formatted text is great, but for deeply nested or complex JSON, a visual tree representation
            can be even more intuitive.
          </p>
          <h3 className="text-xl font-medium">What it does:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Renders the JSON structure as a collapsible tree.</li>
            <li>Displays keys and values in a nested format.</li>
            <li>Allows expanding and collapsing sections to hide/show details.</li>
            <li>Often shows data types (string, number, boolean, object, array, null).</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Why it&apos;s useful:</h3>
          <p>
            Quickly grasp the overall structure, navigate deep into the data, find specific nested values,
            and understand the relationship between different parts of the JSON.
          </p>
          <h3 className="text-xl font-medium mt-4">Example (Conceptual):</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">
            JSON:
          </p>
          <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "user": {
    "id": 123,
    "name": "Charlie",
    "address": {
      "street": "123 Main St",
      "city": "Anytown"
    },
    "orders": [
      { "orderId": "A1", "amount": 50 },
      { "orderId": "B2", "amount": 120 }
    ]
  }
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tree View representation:
          </p>
           <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`▼ user (Object)
  ├─ id (Number): 123
  ├─ name (String): "Charlie"
  ├─ ▼ address (Object)
  │  ├─ street (String): "123 Main St"
  │  └─ city (String): "Anytown"
  └─ ▼ orders (Array [2])
     ├─ ▼ [0] (Object)
     │  ├─ orderId (String): "A1"
     │  └─ amount (Number): 50
     └─ ▼ [1] (Object)
        ├─ orderId (String): "B2"
        └─ amount (Number): 120`}
            </pre>
          </div>
           <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Maximize size={18} /><Minimize size={18} /> Key takeaway: Tree view simplifies navigation and understanding complex structures.
            </div>
        </div>

         {/* Module 4: Search & Filter */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Search className="text-purple-500" /> Module 4: Search &amp; Filter
          </h2>
          <p>
            Finding specific data points within a large JSON payload can be tedious without search capabilities.
          </p>
          <h3 className="text-xl font-medium">What it does:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Allows searching for keys or values.</li>
            <li>Highlights matching results in the formatted text or tree view.</li>
            <li>Advanced formatters might support filtering based on JSONPath or other query languages.</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Why it&apos;s useful:</h3>
          <p>
            Quickly locate specific information (e.g., an API endpoint URL in a config, a user ID in a response),
            especially useful for debugging or data exploration.
          </p>
          <h3 className="text-xl font-medium mt-4">Example:</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">
            Searching for "Anytown" in the previous JSON example would highlight that specific value within the <code>address</code> object.
          </p>
           <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <ListTodo size={18} /> Key takeaway: Search saves time when dealing with large datasets.
            </div>
        </div>

         {/* Module 5: Diffing */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Diff className="text-orange-500" /> Module 5: Diffing JSON
          </h2>
          <p>
            Comparing two versions of a JSON document can be challenging line by line.
            JSON diffing tools analyze the structural and value differences.
          </p>
          <h3 className="text-xl font-medium">What it does:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Compares two JSON inputs.</li>
            <li>Identifies added, removed, or modified keys/values.</li>
            <li>Often visualizes differences side-by-side or inline.</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Why it&apos;s useful:</h3>
          <p>
            Crucial for debugging API changes, tracking configuration file modifications,
            or understanding how data structures evolve.
          </p>
          <h3 className="text-xl font-medium mt-4">Example (Conceptual):</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">
            Comparing <code>{`{"a": 1, "b": 2, "c": 3}`}</code> and <code>{`{"a": 1, "b": 5, "d": 4}`}</code>:
          </p>
           <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`// Input 1:
{
  "a": 1,
  "b": 2,
  "c": 3 // Deleted
}

// Input 2:
{
  "a": 1,
  "b": 5, // Changed (was 2)
  "d": 4 // Added
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A diff tool would show that <code>"c"</code> was deleted, <code>"b"</code> changed from 2 to 5, and <code>"d"</code> was added.
          </p>
           <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <FileJson size={18} /> Key takeaway: Diffing helps pinpoint changes in JSON data.
            </div>
        </div>

        {/* Conclusion */}
        <div className="border p-4 rounded-lg dark:border-gray-700 space-y-4">
           <h2 className="text-2xl font-semibold">Conclusion</h2>
           <p>
            JSON formatters are more than just pretty printers. They offer a suite of features
            that significantly improve the developer experience when working with JSON data.
            Mastering core formatting, validation, tree views, searching, and diffing will
            make you much more efficient in tasks involving APIs, configuration management,
            and data inspection.
           </p>
            <p>
            Think of these features as essential tools in your development toolkit,
            much like an IDE helps you write code. They empower you to quickly understand,
            validate, and manipulate JSON, saving valuable debugging time.
           </p>
        </div>

      </div>
    </>
  );
}