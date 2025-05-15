import type { Metadata } from "next";
import {
  Book,
  CodeXml,
  Target,
  Check,
  X,
  Lightbulb,
  RefreshCw,
  Wrench,
  Share2,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Learning Paths: From JSON Basics to Advanced Formatting | Your Site Name",
  description:
    "Explore a comprehensive learning path for developers to master JSON, from its fundamental syntax to advanced formatting techniques and real-world applications.",
};

export default function JsonLearningPathArticle() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Learning Paths: From JSON Basics to Advanced Formatting
        </h1>

        <div className="space-y-10">
          {/* Introduction */}
          <section className="flex items-start space-x-4">
            <Book className="mt-1 flex-shrink-0 text-blue-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Introduction: Why JSON Matters</h2>
              <p>
                JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and beyond. Its simplicity, human-readability, and native support in many programming languages make it incredibly versatile. Whether you're building APIs, configuring applications, or storing structured data, understanding JSON is fundamental. This guide outlines a learning path to take you from the absolute basics to more advanced concepts and techniques.
              </p>
            </div>
          </section>

          {/* Section 1: JSON Basics - Syntax and Data Types */}
          <section className="flex items-start space-x-4">
            <CodeXml className="mt-1 flex-shrink-0 text-green-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Section 1: JSON Basics - Syntax and Data Types</h2>
              <p>
                Start by mastering the core structure of JSON. It's surprisingly simple!
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">The Two Structures: Objects and Arrays</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Objects (&#x7b; &#x7d;):</strong> Unordered collections of key-value pairs. Keys must be strings, and values can be any valid JSON data type. Keys are separated from values by a colon (<code>:</code>), and pairs are separated by commas (<code>,</code>).
                </li>
                <li>
                  <strong>Arrays ([ ]):</strong> Ordered sequences of values. Values are separated by commas (<code>,</code>).
                </li>
              </ul>
              <h3 className="text-xl font-medium mt-4 mb-2">The Six Data Types</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>String:</strong> Text enclosed in double quotes (<code>&quot;</code>). Uses backslash escapes for special characters (like <code>\&quot;</code>, <code>\\</code>, <code>\n</code>, <code>\t</code>, etc.).
                </li>
                <li>
                  <strong>Number:</strong> Integer or floating-point numbers. No distinction between integers and floats. Standard decimal and exponent notation is supported.
                </li>
                <li>
                  <strong>Boolean:</strong> Either <code>true</code> or <code>false</code> (lowercase).
                </li>
                <li>
                  <strong>Null:</strong> The value representing 'nothing' or 'empty'. Written as <code>null</code> (lowercase).
                </li>
                <li>
                  <strong>Object:</strong> Nested JSON objects.
                </li>
                <li>
                  <strong>Array:</strong> Nested JSON arrays.
                </li>
              </ul>
              <p className="mt-4">
                Understanding how these structures and types can be nested within each other is key.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: Basic JSON Structure</h4>
                <pre className="text-sm">
                  {`{
  "name": "Learning JSON",
  "version": 1.0,
  "isDraft": false,
  "tags": ["syntax", "basics", "types"],
  "author": {
    "name": "A. Developer",
    "id": null
  },
  "chapters": [
    {
      "title": "Introduction",
      "pages": 5
    },
    {
      "title": "Syntax",
      "pages": 10
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section 2: Working with JSON in Programming Languages */}
          <section className="flex items-start space-x-4">
            <RefreshCw className="mt-1 flex-shrink-0 text-yellow-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Section 2: Working with JSON in Programming Languages</h2>
              <p>
                Once you know the structure, learn how to interact with JSON in your chosen programming language (e.g., JavaScript, Python, Java, C#). The core operations are parsing and stringifying.
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">Parsing (JSON String &#x2192; Native Data Structure)</h3>
              <p>
                Converting a JSON string into your language's native data structures (like objects, arrays, dictionaries, lists, etc.). This is typically done by a built-in function or library.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: Parsing in JavaScript</h4>
                <pre className="text-sm">
                  {`const jsonString = '{"id": 1, "active": true, "data": [10, 20]}';
const dataObject = JSON.parse(jsonString);

console.log(dataObject.id);      // Output: 1
console.log(dataObject.active);  // Output: true
console.log(dataObject.data[0]); // Output: 10`}
                </pre>
              </div>
              <h3 className="text-xl font-medium mt-4 mb-2">Stringifying (Native Data Structure &#x2192; JSON String)</h3>
              <p>
                Converting your language's native data structures back into a JSON string.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: Stringifying in JavaScript</h4>
                <pre className="text-sm">
                  {`const dataObject = {
  product: "Laptop",
  price: 1200,
  features: ["SSD", "16GB RAM"]
};

const jsonString = JSON.stringify(dataObject);

console.log(jsonString);
// Output: '{"product":"Laptop","price":1200,"features":["SSD","16GB RAM"]}'`}
                </pre>
              </div>
              <p className="mt-4">
                Familiarize yourself with the specific functions and potential error handling (e.g., handling invalid JSON strings) in your language.
              </p>
            </div>
          </section>

          {/* Section 3: Advanced JSON Formatting and Techniques */}
          <section className="flex items-start space-x-4">
            <Lightbulb className="mt-1 flex-shrink-0 text-purple-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Section 3: Advanced JSON Formatting and Techniques</h2>
              <p>
                Beyond basic parsing and stringifying, several techniques allow for more control and address common challenges.
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">Indentation for Readability</h3>
              <p>
                Most stringify functions allow specifying indentation for pretty-printing. This is crucial for debugging and human inspection.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: Indentation in JavaScript</h4>
                <pre className="text-sm">
                  {`const dataObject = { item: "Book", quantity: 3 };

// No indentation
const flatJson = JSON.stringify(dataObject);
// Output: '{"item":"Book","quantity":3}'

// Indented with 2 spaces
const prettyJson = JSON.stringify(dataObject, null, 2);
/* Output:
{
  "item": "Book",
  "quantity": 3
}
*/`}
                </pre>
              </div>
              <h3 className="text-xl font-medium mt-4 mb-2">Using Replacer and Reviver Functions</h3>
              <p>
                <code>JSON.stringify</code> and <code>JSON.parse</code> often accept optional arguments (replacer and reviver) to customize the process.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Replacer (<code>JSON.stringify</code>):</strong> A function or an array that filters or transforms the data before stringifying. Useful for excluding sensitive data or handling special types (like Dates).
                </li>
                <li>
                  <strong>Reviver (<code>JSON.parse</code>):</strong> A function that transforms the data after parsing, during the traversal of the resulting object. Useful for converting strings back into specific data types (like Date objects).
                </li>
              </ul>
              <h3 className="text-xl font-medium mt-4 mb-2">Handling Circular References</h3>
              <p>
                JSON cannot represent objects with circular references (where an object directly or indirectly contains itself). Attempting to stringify such an object will usually result in an error. Custom replacer functions are one way to handle this, often by omitting the problematic reference or replacing it with a placeholder. Libraries might offer more sophisticated solutions.
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">JSON Schema: Defining and Validating Structure</h3>
              <p>
                For applications where the structure of JSON data is critical, JSON Schema provides a powerful way to define what a JSON document <em>should</em> look like. You can specify required properties, data types, formats, ranges, and more. Libraries are available in many languages to validate JSON data against a schema.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: Simple JSON Schema (Conceptual)</h4>
                <pre className="text-sm">
                  {`{
  "type": "object",
  "properties": {
    "id": { "type": "integer", "minimum": 1 },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "isActive": { "type": "boolean" }
  },
  "required": ["id", "name", "isActive"]
}`}
                </pre>
              </div>
              <p className="mt-4 flex items-center space-x-2">
                <Check className="flex-shrink-0 text-green-600" size={20} />
                <span>Validates data structure and types.</span>
              </p>
              <p className="mt-2 flex items-center space-x-2">
                <X className="flex-shrink-0 text-red-600" size={20} />
                <span>Can prevent processing of malformed or incomplete data.</span>
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">JSON Pointer and JSONPatch</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>JSON Pointer (<a href="https://datatracker.ietf.org/doc/html/rfc6901" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">RFC 6901</a>):</strong> A standard syntax for identifying a specific value within a JSON document. Looks like a URI fragment (e.g., <code>/chapters/1/title</code>). Useful for referring to parts of a document without transmitting the whole thing.
                </li>
                <li>
                  <strong>JSONPatch (<a href="https://datatracker.ietf.org/doc/html/rfc6902" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">RFC 6902</a>):</strong> A format for describing changes to a JSON document. It's an array of operations (add, remove, replace, move, copy, test) applied using JSON Pointer. Useful for efficiently updating only parts of a large JSON document, especially over a network.
                </li>
              </ul>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: JSON Patch (Conceptual)</h4>
                <pre className="text-sm">
                  {`// Patch to change the second chapter title and add a "draft" property
[
  { "op": "replace", "path": "/chapters/1/title", "value": "Advanced Concepts" },
  { "op": "add", "path": "/isDraft", "value": false }
]`}
                </pre>
              </div>

              <h3 className="text-xl font-medium mt-4 mb-2">JSON Lines (NDJSON): Streaming and Large Data</h3>
              <p>
                Newline Delimited JSON (NDJSON) or JSON Lines is a format where each line of a file or stream is a separate, valid JSON object. This is not standard JSON (which must be a single value), but it's incredibly useful for processing large datasets line by line without loading the entire document into memory.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-gray-800 overflow-x-auto">
                <h4 className="font-semibold mb-2">Example: JSON Lines</h4>
                <pre className="text-sm">
                  {`{"id": 1, "name": "Item A"}
{"id": 2, "name": "Item B"}
{"id": 3, "name": "Item C"}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section 4: Real-World Applications and Use Cases */}
          <section className="flex items-start space-x-4">
            <Share2 className="mt-1 flex-shrink-0 text-indigo-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Section 4: Real-World Applications and Use Cases</h2>
              <p>Apply your JSON knowledge in practical scenarios:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Web APIs:</strong> Sending and receiving data between client and server. Most RESTful APIs use JSON.
                </li>
                <li>
                  <strong>Configuration Files:</strong> Storing application settings (e.g., <code>package.json</code> in Node.js, configuration in many frontend frameworks).
                </li>
                <li>
                  <strong>Data Storage:</strong> Used in NoSQL databases (like MongoDB) and increasingly in relational databases (JSON columns).
                </li>
                <li>
                  <strong>Logging and Messaging:</strong> Structured logging and data formats for message queues.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Tools and Libraries */}
          <section className="flex items-start space-x-4">
            <Wrench className="mt-1 flex-shrink-0 text-teal-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Section 5: Tools and Libraries</h2>
              <p>Leverage existing tools to work with JSON efficiently:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Online Validators/Formatters:</strong> Websites to check syntax and pretty-print JSON.
                </li>
                <li>
                  <strong>Code Editors/IDEs:</strong> Built-in JSON syntax highlighting and formatting.
                </li>
                <li>
                  <strong>Libraries:</strong> Language-specific libraries for advanced tasks like JSON Schema validation, JSON Pointer/Patch, and working with streams (like NDJSON).
                </li>
                <li>
                  <strong>Command-line tools:</strong> Tools like <code>jq</code> for processing JSON from the command line.
                </li>
              </ul>
            </div>
          </section>


          {/* Conclusion */}
          <section className="flex items-start space-x-4">
            <Target className="mt-1 flex-shrink-0 text-red-500" size={28} />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Conclusion: Continuous Learning</h2>
              <p>
                Understanding JSON is a foundational skill. Start with the syntax and data types, practice parsing and stringifying in your language, and then explore advanced topics like validation, patching, and streaming as your needs grow. By mastering JSON, you'll significantly enhance your ability to work with data in modern software development.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
