import type { Metadata } from "next";
import { FileJson, Cog, Search, BookOpen, ListOrdered, Code, FileText, FileCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Webinars and Workshops on Advanced JSON Formatting | Developer Resources",
  description:
    "Explore webinars and workshops covering advanced techniques for JSON formatting, including consistent styling, handling complex data, and custom serialization.",
};

export default function AdvancedJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-600" />
        Webinars and Workshops on Advanced JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          While seemingly simple, JSON (
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            JavaScript Object Notation
          </a>
          ) has nuances that become critical in large-scale projects, data exchange between diverse systems, or when
          optimizing for specific use cases. Going beyond basic serialization requires understanding "advanced"
          formatting techniques. This page outlines the value of learning these techniques, often taught in dedicated
          webinars and workshops, and covers key concepts.
        </p>
        <p>
          Advanced JSON formatting isn't just about making JSON look pretty; it's about ensuring consistency, improving
          maintainability, enabling efficient processing, and sometimes meeting specific API or tooling requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Cog className="w-6 h-6 mr-2 text-green-600" />
          Why Advanced Formatting Matters
        </h2>
        <p>
          Basic JSON serialization (`JSON.stringify()`) is sufficient for many tasks, but more complex scenarios benefit
          from careful formatting:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability & Maintainability:</strong> Consistent indentation, spacing, and key ordering make JSON
            easier for humans to read and understand, which is crucial during debugging and code reviews.
          </li>
          <li>
            <strong>Efficient Diffing and Version Control:</strong> Predictable formatting (especially key order)
            minimizes spurious changes in version control systems when files are modified, leading to cleaner diffs.
          </li>
          <li>
            <strong>Interoperability:</strong> Some systems or APIs might have strict requirements on how JSON data is
            structured or formatted.
          </li>
          <li>
            <strong>Handling Complex Data Types:</strong> Dealing with dates, binary data, large numbers, or custom
            objects requires specific serialization strategies.
          </li>
          <li>
            <strong>Performance and Size:</strong> While advanced formatting often adds whitespace (increasing size),
            techniques like omitting nulls or using custom concise representations can impact performance or size.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-yellow-600" />
          Key Advanced JSON Formatting Techniques
        </h2>
        <p>Webinars and workshops often dive deep into practical application of these techniques:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ListOrdered className="w-5 h-5 mr-2 text-indigo-600" /> Consistent Key Ordering
        </h3>
        <p>
          JSON object keys are officially unordered. However, most parsers maintain the order they encounter keys.
          Consistently sorting keys (e.g., alphabetically) provides predictable diffs and can sometimes aid debugging or
          processing flows.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Unordered vs. Sorted Keys</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <h5 className="font-semibold mb-2">Unordered (Default `JSON.stringify`)</h5>
              <pre>
                {`{
  "age": 30,
  "name": "Alice",
  "city": "New York"
}`}
              </pre>
            </div>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <h5 className="font-semibold mb-2">Sorted Keys (A-Z)</h5>
              <pre>
                {`{
  "age": 30,
  "city": "New York",
  "name": "Alice"
}`}
              </pre>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Sorting keys programmatically ensures this consistency, crucial for tooling that compares JSON outputs.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-600" /> Custom Serialization & Deserialization
        </h3>
        <p>
          Standard `JSON.stringify` and `JSON.parse` have limitations, especially with non-native types like `Date`,
          `RegExp`, `Set`, `Map`, or custom class instances. Advanced techniques involve providing custom `toJSON`
          methods on objects or using the `replacer` and `reviver` arguments of `JSON.stringify`/`JSON.parse`.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Custom Date Serialization/Deserialization</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Custom object with a Date
const event = {
  name: "Meeting",
  startTime: new Date('2023-10-27T10:00:00.000Z')
};

// Default stringify (Date becomes ISO string)
const defaultJson = JSON.stringify(event);
console.log(defaultJson); // {"name":"Meeting","startTime":"2023-10-27T10:00:00.000Z"}

// Using reviver to parse Date back
const parsedEvent = JSON.parse(defaultJson, (key, value) => {
  // Check if the value is a string that looks like an ISO date
  if (key === 'startTime' && typeof value === 'string' && /\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z/.test(value)) {
    return new Date(value);
  }
  return value;
});

console.log(parsedEvent.startTime instanceof Date); // true
`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            This pattern allows preserving or transforming data types that JSON doesn't natively support. Libraries
            often provide more robust solutions for complex types.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileCode className="w-5 h-5 mr-2 text-red-600" /> Handling Large Numbers (BigInt)
        </h3>
        <p>
          JavaScript's standard `Number` type uses IEEE 754 double-precision floating-point format, which can only
          safely represent integers between `Number.MIN_SAFE_INTEGER` (-2^53 + 1) and `Number.MAX_SAFE_INTEGER` (2^53 -
          1). Large integer IDs or timestamps might exceed this, leading to precision loss. `BigInt` is the solution in
          modern JavaScript, but `JSON.stringify` doesn't handle it by default.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Serializing BigInt</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const largeId = 9007199254740993n; // BigInt
const data = { id: largeId, value: "some data" };

// JSON.stringify fails on BigInt by default
// try {
//   JSON.stringify(data);
// } catch (e) {
//   console.error(e.message); // "Do not know how to serialize a BigInt"
// }

// Custom replacer to handle BigInt
const jsonWithBigInt = JSON.stringify(data, (key, value) => {
  if (typeof value === 'bigint') {
    return value.toString(); // Serialize BigInt as string
  }
  return value;
});

console.log(jsonWithBigInt); // {"id":"9007199254740993","value":"some data"}

// To parse it back, you would need a custom reviver:
// JSON.parse(jsonWithBigInt, (key, value) => {
//   if (key === 'id' && typeof value === 'string' && /^-?\\d+$/.test(value)) {
//     try {
//       return BigInt(value); // Attempt to parse string back to BigInt
//     } catch (e) {
//       // Handle potential errors if string isn't a valid BigInt
//     }
//   }
//   return value;
// });
`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Serializing `BigInt` as strings is a common pattern, requiring coordinated parsing on the receiving end.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Search className="w-5 h-5 mr-2 text-cyan-600" /> Working with Libraries and Tools
        </h3>
        <p>Beyond native methods, numerous libraries and tools offer advanced JSON capabilities:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Schema:</strong> Defining structure and validation rules for JSON data.
          </li>
          <li>
            <strong>JSONPath/JQ:</strong> Querying and manipulating JSON data structures.
          </li>
          <li>
            <strong>Specific Serialization Libraries:</strong> Handling complex types, enabling comments
            (non-standard!), sorting keys, pretty-printing with fine-grained control, and streaming large JSON data.
            Examples include libraries like `json-stable-stringify`, `json5` (allowing comments), or data-specific
            serializers.
          </li>
        </ul>
        <p>
          Webinars and workshops often showcase practical demonstrations using popular libraries and tools relevant to
          the audience's technology stack.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-orange-600" /> The Value of Webinars and Workshops
        </h2>
        <p>
          While documentation and articles are valuable, interactive sessions like webinars and workshops offer unique
          benefits for learning advanced JSON formatting:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Live Demonstrations:</strong> See techniques applied in real-time coding examples.
          </li>
          <li>
            <strong>Q&A:</strong> Get immediate answers to specific questions from experts.
          </li>
          <li>
            <strong>Hands-on Practice:</strong> Workshops often include exercises to solidify understanding.
          </li>
          <li>
            <strong>Specific Use Cases:</strong> Sessions might focus on advanced JSON for specific domains (e.g., APIs,
            configuration files, data pipelines, specific languages like Node.js, Python, Java).
          </li>
          <li>
            <strong>Tooling Insights:</strong> Learn about useful external tools and libraries.
          </li>
          <li>
            <strong>Best Practices:</strong> Understand idiomatic and efficient ways to handle complex JSON scenarios.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Mastering advanced JSON formatting goes beyond knowing `JSON.stringify`. It involves understanding
          consistency, custom data handling, and leveraging appropriate tools and libraries. Investing time in learning
          these techniques through resources like specialized webinars and workshops can significantly improve the
          quality, maintainability, and interoperability of the data structures you work with daily. Keep an eye out for
          sessions covering JSON schema, custom serialization, and best practices for your specific development
          environment.
        </p>
      </div>
    </>
  );
}
