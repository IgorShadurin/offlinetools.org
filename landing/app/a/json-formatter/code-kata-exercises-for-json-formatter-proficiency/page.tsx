import type { Metadata } from "next";
import { Code, Star, Lightbulb, ListTree, Shrink, MoveVertical, Search, GitCompare, Check, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: "Code Kata Exercises for JSON Formatter Proficiency",
  description:
    "Improve your JSON formatting skills through practical coding exercises (katas). Learn to parse, format, and manipulate JSON data.",
};

export default function JsonFormatterKataArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code size={32} />
        Code Kata Exercises for JSON Formatter Proficiency
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in modern web development, serving as a primary format for data exchange. While built-in functions like <code>JSON.stringify(&#x7b;...&#x7d;, null, 2)</code> handle basic formatting, truly mastering JSON formatting involves understanding its structure deeply and being able to manipulate it programmatically.
        </p>
        <p>
          Code katas are small, repeatable coding exercises designed to improve skills through practice and repetition. Applying the kata approach to JSON formatting can significantly enhance your ability to parse, transform, and generate JSON strings correctly and efficiently.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Star size={24} />
          Why Practice JSON Formatting?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Improved Debugging:</strong> Nicely formatted JSON is much easier to read and debug than minified strings.</li>
          <li><strong>Data Transformation:</strong> You might need to reformat JSON for specific APIs, reports, or storage requirements.</li>
          <li><strong>Deep Understanding:</strong> Implementing formatters forces you to understand the nuances of JSON syntax (commas, colons, nesting, string escaping).</li>
          <li><strong>Custom Requirements:</strong> Sometimes standard formatters don't meet specific needs, like sorting keys or filtering properties.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree size={24} />
          Kata 1: Basic Pretty Print
        </h2>
        <p>
          <strong>Goal:</strong> Given a minified JSON string, produce a human-readable, indented string.
        </p>
        <p>
          This is the most fundamental exercise. It involves parsing the JSON into an in-memory structure and then stringifying it with proper indentation. While standard library functions exist, the kata is to understand *how* this is done. A manual implementation might involve tokenizing the string and adding newlines and spaces based on structural elements like <code>&#x7b;</code>, <code>&#x7d;</code>, <code>[</code>, <code>]</code>, and <code>,</code>.
        </p>
        <p>
          <strong>Input Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}</pre>
        </div>
        <p>
          <strong>Output Example (with 2-space indentation):</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
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
        <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> Think about maintaining an indentation level as you iterate through the string or traverse the parsed structure. Add newlines after `&#x7b;`, `[`, and after elements followed by `,`. Decrease indent after `&#x7d;` and `]`.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Shrink size={24} />
          Kata 2: Minify JSON
        </h2>
        <p>
          <strong>Goal:</strong> Given a pretty-printed JSON string, remove all non-essential whitespace (spaces, tabs, newlines) while keeping the JSON valid.
        </p>
        <p>
          This is often simpler than pretty-printing if you parse first. Parse the input string into a data structure, then stringify it without any indentation arguments. Manually, this involves iterating through the string and removing whitespace unless it's inside a quoted string.
        </p>
        <p>
          <strong>Input Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
{`{
  "key": "value",
  "nested": {
    "list": [
      1,
      2,
      3
    ]
  }
}`}
          </pre>
        </div>
        <p>
          <strong>Output Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`{"key":"value","nested":{"list":[1,2,3]}}`}</pre>
        </div>
         <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> Be careful not to remove whitespace *within* JSON string values (e.g., <code>"hello world"</code>). A simple approach is to parse and then stringify without formatting. A manual approach needs state to track if you are currently inside a string literal.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <MoveVertical size={24} />
          Kata 3: Sort Object Keys
        </h2>
        <p>
          <strong>Goal:</strong> Given a JSON string representing an object (or containing nested objects), produce a pretty-printed JSON string where all object keys are sorted alphabetically.
        </p>
        <p>
          Standard <code>JSON.stringify</code> does not guarantee key order. This kata requires parsing the JSON, recursively traversing the structure, sorting the keys of any objects encountered, and then stringifying the sorted structure.
        </p>
        <p>
          <strong>Input Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`{"b": 2, "a": 1, "c": {"z": true, "y": false}}`}</pre>
        </div>
        <p>
          <strong>Output Example (sorted and pretty-printed):</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
{`{
  "a": 1,
  "b": 2,
  "c": {
    "y": false,
    "z": true
  }
}`}
          </pre>
        </div>
        <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> You'll likely need a recursive function that processes values. If the value is an object, get its keys, sort them, create a new object with keys in sorted order, and recursively process the corresponding values. If it's an array, recursively process each element.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search size={24} />
          Kata 4: Get Value by Path
        </h2>
        <p>
          <strong>Goal:</strong> Given a JSON string and a "path" string (similar to lodash or JavaScript accessors, e.g., <code>"user.address.city"</code> or <code>"items[0].name"</code>), return the value at that path. Handle cases where the path doesn't exist.
        </p>
        <p>
          This kata focuses on navigating the parsed JSON data structure. It requires parsing the input JSON and then implementing logic to traverse the resulting object/array based on the segments of the path string.
        </p>
        <p>
          <strong>Input Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`{"data":[{"id":1,"name":"Item A"},{"id":2,"name":"Item B"}], "metadata": {"count": 2}}`}</pre>
        </div>
        <p>
          <strong>Path Examples:</strong>
        </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
             <li><code>"data[1].name"</code></li>
             <li><code>"metadata.count"</code></li>
             <li><code>"data[2].id"</code> (path does not exist)</li>
         </ul>
        <p>
          <strong>Output Example:</strong>
        </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
             <li>For <code>"data[1].name"</code>: <code>"Item B"</code></li>
             <li>For <code>"metadata.count"</code>: <code>2</code></li>
             <li>For <code>"data[2].id"</code>: (e.g., <code>undefined</code> or throw an error)</li>
         </ul>
         <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> Parse the path string into segments (e.g., <code>"data[1].name"</code> becomes <code>["data", "1", "name"]</code>, handling the array index carefully). Then, traverse the parsed JSON data structure step by step using these segments. Check if each segment exists before proceeding.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitCompare size={24} />
          Kata 5: JSON Diff
        </h2>
         <p>
          <strong>Goal:</strong> Given two JSON strings, identify the differences between them. The output could be a list of changes (additions, deletions, modifications) or a new structure highlighting the differences.
        </p>
        <p>
          This is a more advanced kata requiring deep structural comparison. Parse both JSON strings into data structures. Then, recursively compare the structures element by element. Objects require comparing keys and their corresponding values. Arrays require comparing elements by index, considering additions, deletions, or changes in order (though JSON doesn't guarantee array order, typical diff assumes ordered arrays).
        </p>
        <p>
          <strong>Input Example:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JSON 1:</h3>
          <pre>
{`{
  "name": "Product A",
  "price": 100,
  "tags": ["electronic", "gadget"],
  "details": {
    "weight": "1kg"
  }
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">JSON 2:</h3>
          <pre>
{`{
  "name": "Product B",
  "price": 120,
  "tags": ["electronic", "new-tag", "gadget"],
  "color": "black",
  "details": {
    "weight": "1.2kg",
    "dimensions": "10x10x10"
  }
}`}
          </pre>
        </div>
        <p>
          <strong>Output Example (Conceptual Diff):</strong>
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre>
{`[
  { "path": "name", "change": "modified", "oldValue": "Product A", "newValue": "Product B" },
  { "path": "price", "change": "modified", "oldValue": 100, "newValue": 120 },
  { "path": "tags[1]", "change": "added", "newValue": "new-tag" },
  { "path": "color", "change": "added", "newValue": "black" },
  { "path": "details.weight", "change": "modified", "oldValue": "1kg", "newValue": "1.2kg" },
  { "path": "details.dimensions", "change": "added", "newValue": "10x10x10" }
]`}
            </pre>
         </div>
         <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> This requires careful recursive comparison. For objects, iterate through keys in both objects. If a key exists in one but not the other, it's added/deleted. If it exists in both, recursively compare the values. For arrays, you might compare elements pairwise or use dynamic programming approaches (like the diff algorithm used in text editors) if order changes or elements are added/removed in the middle.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check size={24} />
          Kata 6: Basic JSON Validation
        </h2>
        <p>
          <strong>Goal:</strong> Given a string, determine if it is a syntactically valid JSON string.
        </p>
         <p>
          While simple checks exist, a full validator requires implementing (or simulating) a JSON parser. The kata is to write code that can correctly identify whether a string follows the JSON grammar rules. This involves handling nested structures, correctly quoted strings (with escaped characters), numbers, booleans, and null.
        </p>
        <p>
          <strong>Input Examples:</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Valid JSON:</h3>
          <pre>{`{"valid": true, "array": [1, "two", null]}`}</pre>
          <h3 className="text-lg font-medium mt-4">Invalid JSON:</h3>
          <pre>{`{"missing_brace": true`}</pre>
           <pre>{`{"extra_comma": [1, 2,]}`}</pre>
           <pre>{`{unquoted_key: "value"}`}</pre>
        </div>
        <p>
          <strong>Output Example:</strong>
        </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
             <li>For valid JSON: <code>true</code> (or success)</li>
             <li>For invalid JSON: <code>false</code> (or an error indicating the syntax issue)</li>
         </ul>
         <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Lightbulb size={18} className="flex-shrink-0 mt-1" />
           <strong>Hint:</strong> You can attempt to use <code>JSON.parse</code> inside a try-catch block as a simple validation. However, for the kata challenge, try to implement a basic parser that throws an error on invalid syntax. Consider using a state machine or recursive functions based on the JSON grammar.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Trophy size={24} />
          Benefits of These Katas
        </h2>
        <p>
          Working through these exercises will solidify your understanding of:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>JSON syntax rules.</li>
          <li>Parsing techniques (even if simplified).</li>
          <li>Recursive data structure traversal.</li>
          <li>String manipulation and whitespace handling.</li>
          <li>Error handling in data processing.</li>
        </ul>
        <p>
          Start with the basics like Pretty Print and Minify using built-in functions first, then challenge yourself to implement them manually. Gradually move to sorting keys and path finding, which require more complex data structure manipulation. The Diff kata is a significant challenge, perfect for solidifying advanced recursive logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
            <Code size={24} />
            Conclusion
        </h2>
        <p>
          Improving proficiency with data formats like JSON is crucial for any developer. These katas provide a structured way to practice essential skills beyond just calling library functions. By tackling these challenges, you'll gain a deeper appreciation for how JSON works and become more capable of handling complex data manipulation tasks in your projects. Happy coding!
        </p>

      </div>
    </>
  );
}