import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter Compliance with W3C Standards | Offline Tools",
  description:
    "Explore how JSON formatters comply with W3C standards, the importance of validation, and ensuring data integrity.",
};

export default function JsonFormatterComplianceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        JSON Formatter Compliance with W3C Standards
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. While its
          syntax is relatively simple, ensuring that JSON data is valid and compliant with official standards is crucial
          for interoperability and preventing parsing errors. A compliant JSON formatter plays a vital role in this process,
          helping users create, validate, and understand JSON data that adheres to the rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What are the Relevant JSON Standards?</h2>
        <p>
          JSON is defined by several standards and specifications. The most prominent include:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">RFC 8259 (and its predecessors RFC 4627, RFC 7159)</h3>
          <p className="text-sm mt-1">
            Published by the Internet Engineering Task Force (IETF), this is the primary standard defining the JSON
            data interchange format.
          </p>

          <h3 className="text-lg font-medium mt-3">ECMA-404</h3>
          <p className="text-sm mt-1">
            Published by Ecma International, this standard provides an identical definition of the JSON data format.
            It's often referenced by the W3C.
          </p>

          <h3 className="text-lg font-medium mt-3">W3C Involvement</h3>
          <p className="text-sm mt-1">
            While W3C (World Wide Web Consortium) doesn&apos;t own the JSON specification itself, they endorse and
            recommend the use of JSON based on these standards in various web technologies (like XMLHttpRequest,
            Fetch API, Web APIs). Compliance with W3C-related recommendations often implies adherence to the underlying
            JSON standards.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why JSON Formatter Compliance Matters</h2>
        <p>
          A compliant JSON formatter does more than just indent your JSON string. It should:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Validate Syntax:</span> Check if the input string strictly follows the JSON
            grammar defined in the standards (e.g., RFC 8259).
          </li>
          <li>
            <span className="font-medium">Apply Standard Formatting:</span> Present the valid JSON data in a consistent,
            readable structure using indentation and line breaks, without altering the data itself.
          </li>
          <li>
            <span className="font-medium">Identify Errors Clearly:</span> Pinpoint exactly where the input deviates from
            the standard, helping users correct invalid JSON.
          </li>
          <li>
            <span className="font-medium">Ensure Interoperability:</span> Guarantee that the formatted output can be
            parsed correctly by any standard-compliant JSON parser in any programming language.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Key Compliance Aspects for Formatters</h2>
        <p>
          A formatter claiming compliance with W3C recommendations (by adhering to RFC 8259/ECMA-404) must enforce
          specific syntax rules. Here are some common points where non-compliant formatters or invalid JSON might fail:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">1. String Quotes:</h3>
          <p className="text-sm">
            Strings MUST be enclosed in double quotes. Single quotes are not allowed for strings or keys.
          </p>
          <p className="text-sm mt-2">Invalid JSON (single quotes):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  'name': 'John Doe'
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Valid JSON (double quotes):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "name": "John Doe"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">2. Object Keys:</h3>
          <p className="text-sm">
            Object keys MUST be strings enclosed in double quotes. Unquoted keys or keys using single quotes are invalid.
          </p>
          <p className="text-sm mt-2">Invalid JSON (unquoted key):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  age: 30
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Invalid JSON (single-quoted key):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  'city': 'New York'
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Valid JSON (double-quoted key):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "country": "USA"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">3. Trailing Commas:</h3>
          <p className="text-sm">
            Trailing commas are NOT allowed after the last element in an array or the last key-value pair in an object.
          </p>
          <p className="text-sm mt-2">Invalid JSON (trailing comma in array):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "items": [
    "apple",
    "banana",
  ]
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Invalid JSON (trailing comma in object):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "settings": {
    "enabled": true,
    "timeout": 100,
  }
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Valid JSON:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "items": [
    "apple",
    "banana"
  ],
  "settings": {
    "enabled": true,
    "timeout": 100
  }
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">4. Comments:</h3>
          <p className="text-sm">
            JSON does NOT support comments (neither single-line <code>&quot;//&quot;</code> nor multi-line <code>&quot;/* ... */&quot;</code>).
            Any characters intended as comments will result in a parsing error.
          </p>
          <p className="text-sm mt-2">Here's an example of valid JSON - no comments are supported:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "data": [
    1,
    2
  ]
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">Note: Comment indicators like &apos;//&apos; or &apos;/*...*/&apos; will cause JSON validation errors if included.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">5. Data Types:</h3>
          <p className="text-sm">
            JSON supports a specific set of primitive types: strings, numbers, booleans (<code>true</code>,{" "}
            <code>false</code>), <code>null</code>. Functions, <code>undefined</code>, <code>NaN</code>,{" "}
            <code>Infinity</code>, dates (as objects), or regular expressions are NOT valid JSON values. Numbers
            must adhere to standard decimal or exponential format; octal or hexadecimal literals are not allowed.
          </p>
          <p className="text-sm mt-2">Invalid JSON (contains various unsupported data types):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-1">
            <pre>
              {`{
  "timestamp": "new Date()",
  "value": "NaN",
  "id": "0xFF",
  "user": "undefined"
}`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            The above example would be invalid with actual JavaScript values (without quotes). JSON does not support:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-1 text-sm">
            <li>JavaScript expressions like &quot;new Date()&quot;</li>
            <li>Special number values like &quot;NaN&quot;</li> 
            <li>Hexadecimal numbers like &quot;0xFF&quot;</li>
            <li>The &quot;undefined&quot; value</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How a Compliant Formatter Helps You</h2>
        <p>
          A good, standard-compliant JSON formatter serves as your first line of defense against invalid JSON.
          It typically provides:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Real-time Validation:</span> As you type or paste JSON, it immediately flags
            syntax errors with visual indicators (like red highlighting).
          </li>
          <li>
            <span className="font-medium">Clear Error Messages:</span> It often provides specific messages explaining
            what went wrong and at which line/character.
          </li>
          <li>
            <span className="font-medium">Consistent Output:</span> It takes potentially messy but valid JSON and formats
            it according to standard indentation practices, making it highly readable.
          </li>
          <li>
            <span className="font-medium">Prevention of Subtle Errors:</span> It helps catch issues like missing commas,
            incorrectly escaped characters, or invalid number formats that might be hard to spot manually.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Example: Using a Compliant Formatter</h2>
        <p>
          Imagine you receive a JSON string that looks like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"users":[{name:'Alice', age:25,},{name:"Bob", "age": 30,}]}`}
            </pre>
          </div>
        </div>

        <p>Pasting this into a compliant JSON formatter will result in error messages and highlighting, pointing out:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Single quotes around <code>Alice</code> and <code>Bob</code>.</li>
          <li>Unquoted key <code>name</code> in the first object.</li>
          <li>Unquoted key <code>age</code> in the first object.</li>
          <li>Trailing comma after <code>25,</code> in the first object.</li>
          <li>Trailing comma after <code>30,</code> in the second object.</li>
        </ul>

        <p>The formatter would likely indicate errors around these non-compliant parts. After correcting these issues,
          a compliant formatter would format it cleanly like this:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "users": [
    {
      "name": "Alice",
      "age": 25
    },
    {
      "name": "Bob",
      "age": 30
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Adhering to W3C-endorsed JSON standards (RFC 8259, ECMA-404) is fundamental for reliable data exchange
          on the web. A compliant JSON formatter is an indispensable tool for developers, data analysts, and anyone
          working with JSON. It ensures that the data you produce or consume is syntactically correct, readable,
          and compatible with standard parsers across different platforms and applications. Always choose and utilize
          formatters that strictly enforce these standards to maintain data integrity and avoid potential runtime
          errors down the line.
        </p>
      </div>
    </>
  );
}