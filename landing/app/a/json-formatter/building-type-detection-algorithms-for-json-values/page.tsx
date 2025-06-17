import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Type Detection Algorithms for JSON Values | Offline Tools",
  description:
    "Learn how to build algorithms to detect the data types of values within a JSON structure, essential for validation and processing.",
};

export default function JsonTypeDetectionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Building Type Detection Algorithms for JSON Values</h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and
          write and easy for machines to parse and generate. Understanding the data types of the values within a JSON
          structure is crucial for processing, validating, and interacting with the data correctly. While most
          programming languages parse JSON into native data structures (like objects, arrays, strings, numbers),
          sometimes you need to explicitly detect the type of a value programmatically. This article explores how to
          build algorithms for this purpose.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Detect JSON Types?</h2>
        <p>Explicitly detecting types within a parsed JSON structure can be necessary for several reasons:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Validation:</span> Ensuring data conforms to an expected structure and type
            definition (like a JSON Schema).
          </li>
          <li>
            <span className="font-medium">Dynamic Processing:</span> Writing logic that behaves differently based on the
            type of data encountered (e.g., formatting a number, iterating over an array, accessing object properties).
          </li>
          <li>
            <span className="font-medium">Conversion:</span> Handling conversions or transformations based on the
            original JSON type.
          </li>
          <li>
            <span className="font-medium">Schema Inference:</span> Building tools that analyze JSON data to suggest a
            schema based on detected types.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Understanding JSON Data Types</h2>
        <p>JSON defines a small set of primitive types and two structural types:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JSON Types:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">String:</span> Sequence of Unicode characters, enclosed in double quotes.
            </li>
            <li>
              <span className="font-medium">Number:</span> Integer or floating-point numbers (no octal, hex, or
              NaN/Infinity).
            </li>
            <li>
              <span className="font-medium">Boolean:</span> Either <code>true</code> or <code>false</code>.
            </li>
            <li>
              <span className="font-medium">Null:</span> An empty value, represented by <code>null</code>.
            </li>
            <li>
              <span className="font-medium">Object:</span> An unordered collection of key/value pairs, enclosed in curly
              braces <code>{}</code>. Keys are strings.
            </li>
            <li>
              <span className="font-medium">Array:</span> An ordered sequence of values, enclosed in square brackets{" "}
              <code>[]</code>. Values can be of any JSON type.
            </li>
          </ul>
          <p className="mt-2 text-sm italic">
            Note: JSON types map directly to JavaScript/TypeScript primitive types and objects/arrays after parsing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Algorithm Approaches</h2>
        <p>You can detect the type of a parsed JSON value using a few different approaches:</p>

        <h3 className="text-xl font-semibold mt-6">1. Manual Checks (Using `typeof` and `Array.isArray`)</h3>
        <p>
          In JavaScript/TypeScript, after parsing a JSON string using <code>JSON.parse()</code>, the JSON values are
          represented by native JS/TS types. You can use built-in operators and functions to determine the type.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">How `typeof` works:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`typeof "hello"      // returns "string"
typeof 123          // returns "number"
typeof true         // returns "boolean"
typeof null         // returns "object" (historical bug, needs special handling)
typeof {}           // returns "object"
typeof []           // returns "object" (needs special handling)`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            As shown, <code>typeof</code> can be misleading for <code>null</code> and arrays.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Checking for arrays:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`Array.isArray([]) // returns true`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Checking for null:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`value === null // returns true if value is null`}</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Using Libraries</h3>
        <p>
          Various libraries provide utility functions for type checking, often handling edge cases and providing more
          semantic type names. Examples include Lodash (`_.isString`, `_.isNumber`, etc.) or validation libraries.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Building a Manual Type Detection Function</h2>
        <p>
          Let&apos;s create a function in TypeScript that takes a parsed JSON value and returns a string indicating its
          JSON type.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
            TypeScript Type Detection Function:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type JsonType = "string" | "number" | "boolean" | "null" | "object" | "array";

function getJsonType(value: any): JsonType {
  // Handle null first, as typeof null === "object"
  if (value === null) {
    return "null";
  }

  const type = typeof value;

  // Handle primitives using typeof
  if (type === "string") {
    return "string";
  }
  if (type === "number") {
    // Check for NaN/Infinity which are numbers in JS but not valid JSON numbers
    if (!Number.isFinite(value)) {
        // Depending on strictness, you might throw an error or return a special type
        // For a simple type detection algorithm, we might just return "number"
        // but strict JSON numbers must be finite. Let's treat them as "number" here.
        // A validator would catch these.
        return "number";
    }
    return "number";
  }
  if (type === "boolean") {
    return "boolean";
  }

  // Handle objects and arrays using specific checks
  if (type === "object") {
    // Use Array.isArray to distinguish arrays from other objects
    if (Array.isArray(value)) {
      return "array";
    }
    // Check if it's a plain object (optional, but useful for distinguishing dates, etc.)
    // A simple check: ensure it's not null and its constructor is Object
    if (Object.getPrototypeOf(value) === Object.prototype) {
        return "object";
    }
    // If it's an object but not a plain object or array (e.g., Date, RegExp),
    // it's generally not a valid JSON value in the first place.
    // We could return "object" or throw an error, depending on requirements.
    // For simplicity in JSON type detection, we'll return "object".
    return "object";
  }

  // Function type is not a valid JSON type, but typeof function returns "function"
  // We can ignore this as JSON.parse won't produce functions.
  // Any other types returned by typeof (like 'undefined', 'symbol', 'bigint')
  // are also not valid JSON types produced by JSON.parse.
  // So, we only need to handle the types JSON can produce.

  // Fallback or error handling if unexpected type is encountered (shouldn't happen with valid JSON parse result)
  return "object"; // Defaulting unexpected objects to 'object'
}

// Example Usage:
const jsonParsedData = JSON.parse(\`{
  "name": "Json Example",
  "version": 1.5,
  "isActive": true,
  "data": null,
  "tags": ["example", "json", "data"],
  "details": {
    "author": "Offline Tools",
    "createdAt": "2023-10-27T10:00:00Z"
  }
}\`);

console.log(getJsonType(jsonParsedData)); // Output: object
console.log(getJsonType(jsonParsedData.name)); // Output: string
console.log(getJsonType(jsonParsedData.version)); // Output: number
console.log(getJsonType(jsonParsedData.isActive)); // Output: boolean
console.log(getJsonType(jsonParsedData.data)); // Output: null
console.log(getJsonType(jsonParsedData.tags)); // Output: array
console.log(getJsonType(jsonParsedData.details)); // Output: object
console.log(getJsonType(jsonParsedData.tags[0])); // Output: string
console.log(getJsonType({})); // Output: object
console.log(getJsonType([])); // Output: array
console.log(getJsonType(null)); // Output: null
console.log(getJsonType("any string")); // Output: string
console.log(getJsonType(123)); // Output: number
console.log(getJsonType(true)); // Output: boolean
`}
            </pre>
          </div>
        </div>
        <p>
          This function covers the standard JSON types by leveraging JavaScript&apos;s built-in type checking
          mechanisms, specifically handling the quirks of <code>typeof null</code> and distinguishing arrays from other
          objects.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Handling Nested Structures</h2>
        <p>
          The `getJsonType` function above only checks the type of a single value. If you need to traverse a JSON
          structure and detect types at each level, you would typically use recursion or iteration.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
            Recursive Type Detection Example:
          </h3>
          <p className="text-sm mb-2">
            This example doesn&apos;t just return a single type, but could build a type structure or perform actions
            based on the type at each node.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type DetailedJsonType =
  | { type: "string"; value: string }
  | { type: "number"; value: number }
  | { type: "boolean"; value: boolean }
  | { type: "null"; value: null }
  | { type: "object"; properties: { [key: string]: DetailedJsonType } }
  | { type: "array"; items: DetailedJsonType[] };

function getDetailedJsonStructure(value: any): DetailedJsonType {
  if (value === null) {
    return { type: "null", value: null };
  }

  const type = typeof value;

  if (type === "string") {
    return { type: "string", value: value };
  }
  if (type === "number") {
     if (!Number.isFinite(value)) {
        // Handle non-finite numbers if necessary, e.g., return a specific type or throw
     }
    return { type: "number", value: value };
  }
  if (type === "boolean") {
    return { type: "boolean", value: value };
  }

  if (type === "object") {
    if (Array.isArray(value)) {
      return {
        type: "array",
        items: value.map(item => getDetailedJsonStructure(item)) // Recurse for array items
      };
    } else {
      // Check if it's a plain object
      if (Object.getPrototypeOf(value) === Object.prototype) {
           const properties: { [key: string]: DetailedJsonType } = {};
           for (const key in value) {
             // Ensure it's a direct property, not inherited
             if (Object.prototype.hasOwnProperty.call(value, key)) {
               properties[key] = getDetailedJsonStructure(value[key]); // Recurse for object properties
             }
           }
           return { type: "object", properties: properties };
      }
    }
  }

  // Fallback for unexpected types (should not occur with valid JSON.parse input)
  // Or throw an error if strict type adherence is required
   throw new Error(\`Unexpected type encountered: \${type}\`);
}

// Example Usage with the same data:
const structure = getDetailedJsonStructure(jsonParsedData);
console.log(structure);
/*
Output will be a complex object representing the structure:
{
  type: 'object',
  properties: {
    name: { type: 'string', value: 'Json Example' },
    version: { type: 'number', value: 1.5 },
    isActive: { type: 'boolean', value: true },
    data: { type: 'null', value: null },
    tags: {
      type: 'array',
      items: [
        { type: 'string', value: 'example' },
        { type: 'string', value: 'json' },
        { type: 'string', value: 'data' }
      ]
    },
    details: {
      type: 'object',
      properties: {
        author: { type: 'string', value: 'Offline Tools' },
        createdAt: { type: 'string', value: '2023-10-27T10:00:00Z' } // Dates are strings in JSON
      }
    }
  }
}
*/
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This recursive approach allows you to build a representation of the entire JSON structure, capturing the
            type of every nested value.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Edge Cases and Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Null vs. Undefined:</span> JSON has <code>null</code>, but not{" "}
            <code>undefined</code>. <code>JSON.parse</code> will never produce <code>undefined</code> values.
          </li>
          <li>
            <span className="font-medium">NaN and Infinity:</span> Standard JSON numbers cannot be <code>NaN</code> or{" "}
            <code>Infinity</code>. However, <code>JSON.parse</code> in JavaScript *will* produce these if the input
            string literally contains "NaN", "Infinity", or "-Infinity" (though this is non-standard and not universally
            supported). The `Number.isFinite()` check helps identify these.
          </li>
          <li>
            <span className="font-medium">Dates:</span> JSON does not have a specific "Date" type. Dates are typically
            represented as strings (often in ISO 8601 format) or sometimes as numbers (timestamps). A type detection
            algorithm will correctly identify these as "string" or "number". If you need to detect if a string{" "}
            <em>represents</em> a date, that requires additional parsing and validation logic beyond basic JSON type
            detection.
          </li>
          <li>
            <span className="font-medium">Empty Objects/Arrays:</span> <code>{}</code> is an object, <code>[]</code> is
            an array. Their emptiness doesn&apos;t change their fundamental type.
          </li>
          <li>
            <span className="font-medium">Order in Objects:</span> While JavaScript objects *do* maintain insertion
            order for string keys (mostly), JSON objects are defined as unordered. This doesn&apos;t affect type
            detection but is important for general JSON handling.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Using Libraries vs. Manual Implementation</h2>
        <p>Choosing between manual implementation and using a library depends on your needs:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Manual Implementation:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Pros:</span> Lightweight, no external dependencies, full control.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Need to handle edge cases (like <code>null</code>, arrays,
              potentially non-finite numbers) yourself, might be less readable for complex scenarios.
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Using Libraries (e.g., Lodash):</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Pros:</span> Concise syntax (`_.isString(value)`), handles many common
              checks and edge cases consistently, well-tested.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Adds a dependency to your project, might include more
              functionality than you need, slightly larger code footprint.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a type detection algorithm for JSON values in JavaScript/TypeScript involves leveraging the results
          of <code>JSON.parse()</code> and using native language features like <code>typeof</code> and{" "}
          <code>Array.isArray()</code>. By carefully handling the specific behaviors of <code>null</code> and arrays,
          you can accurately determine the JSON type of any parsed value. For nested structures, recursion is a natural
          fit for traversing objects and arrays. While libraries offer convenience, a manual implementation provides
          control and avoids external dependencies for this relatively straightforward task. Understanding these
          algorithms is a fundamental step in working effectively with dynamic JSON data.
        </p>
      </div>
    </>
  );
}
