import type { Metadata } from "next";
import { AlertCircle, Bug, CheckCircle, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatting Issues During Server-Client Communication",
  description:
    "Understanding and troubleshooting common JSON formatting problems that occur when sending and receiving data between servers and clients.",
};

export default function JsonFormattingIssuesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Bug size={32} /> JSON Formatting Issues During Server-Client Communication
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. Its
          lightweight, human-readable format makes it ideal for transmitting structured data between servers and
          clients. However, like any standard, strict adherence to its rules is crucial for smooth communication.
          Even small deviations in formatting can lead to parsing errors, unexpected behavior, and debugging headaches.
        </p>
        <p>
          This page explores common JSON formatting issues encountered in server-client communication and provides
          insights on how to identify, prevent, and resolve them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle size={24} /> Common JSON Formatting Mistakes
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Trailing Commas</h3>
        <p>
          JSON syntax does not allow trailing commas in object properties or array elements. This is a common
          mistake, especially for developers familiar with JavaScript literal syntax where trailing commas are
          often permitted.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "city": "New York",
}`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`[
  "apple",
  "banana",
  "cherry",
]`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`[
  "apple",
  "banana",
  "cherry"
]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Comments</h3>
        <p>
          {"JSON is purely a data format and does not support comments (neither single-line "}<code>{" //"}</code>{" nor multi-line "}<code>{" /* ... */"}</code>{"). Including comments will result in a parsing error."}
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "username": "coder123", // This is a comment
  "isActive": true /* Another comment */
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <p>
            Comments should be handled in the code that generates or consumes the JSON, not within the JSON itself.
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "username": "coder123",
  "isActive": true
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Incorrect Quotes</h3>
        <p>
          JSON requires all string values and object keys to be enclosed in double quotes (<code>&quot;</code>).
          Single quotes (<code>&apos;</code>) are not allowed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  'item': 'value',
  "description": "It's a 'test'"
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "item": "value",
  "description": "It's a 'test'"
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Malformed Structure (Missing Braces/Brackets/Colons)</h3>
        <p>
          JSON relies on strict pairing of braces &#x7b;&#x7d; for objects and brackets &#x5b;&#x5d;
          for arrays, and colons <code>:</code> to separate keys from values in objects. Missing or misplaced structural
          characters will break the format.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "user": "Bob"
  "id": 456
}`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`[
  "one", "two"
`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`{
  "status" "active"
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "user": "Bob",
  "id": 456
}`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`[
  "one", "two"
]`}
          </pre>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            {`{
  "status": "active"
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Unescaped Special Characters in Strings</h3>
        <p>
          Certain characters within a string must be escaped with a backslash (<code>\</code>), such as double quotes
          (<code>\"</code>), backslashes (<code>\\</code>), newlines (<code>\n</code>), carriage returns (<code>\r</code>),
          tabs (<code>\t</code>), form feeds (<code>\f</code>), and backspaces (<code>\b</code>).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "message": "She said, "Hello!""
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "message": "She said, \\"Hello!\\""
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">6. Invalid Data Types or Formats</h3>
        <p>
          JSON has specific rules for numbers, booleans (<code>true</code>, <code>false</code>), and null (<code>null</code>).
          These values must be lowercase and not quoted. Invalid number formats (like leading zeros on non-zero numbers)
          or using JavaScript's <code>undefined</code> are also errors.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Incorrect JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "isEnabled": TRUE,
  "count": "10",
  "status": NULL,
  "price": 015,
  "data": undefined
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Correct JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "isEnabled": true,
  "count": 10,
  "status": null,
  "price": 15,
  "data": null
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">7. Encoding Issues</h3>
        <p>
          JSON text MUST be encoded in UTF-8. Using other encodings without proper headers or conversion
          can lead to parsing errors or corrupted data, especially with non-ASCII characters.
        </p>

        <h3 className="text-xl font-semibold mt-6">8. Large Payloads / Deeply Nested Structures</h3>
        <p>
          While technically valid JSON, extremely large files or deeply nested structures can cause performance
          issues or even stack overflows during parsing on either the server or the client side, depending on
          the parser implementation and available memory/stack size.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Causes of JSON Formatting Issues
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Manual JSON Construction:</strong> Typing JSON strings manually or concatenating strings instead of using built-in JSON serialization functions.</li>
          <li><strong>Outdated or Non-Compliant Libraries:</strong> Using libraries that generate or parse JSON incorrectly according to the latest standard.</li>
          <li><strong>Encoding Mismatches:</strong> Server and client expecting different character encodings.</li>
          <li><strong>Handling User Input Directly:</strong> Allowing unvalidated user input to form part of a JSON structure without proper sanitization and escaping.</li>
          <li><strong>Debugging Output:</strong> Copy-pasting debug output (which might include comments or trailing commas for readability) into production code or requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle size={24} /> Prevention and Debugging
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Use Standard Libraries:</strong> Always use the built-in <code>JSON.parse()</code> and <code>JSON.stringify()</code> in JavaScript/TypeScript, or their equivalents in other programming languages (e.g., <code>json_encode()</code>/<code>json_decode()</code> in PHP, <code>json.dumps()</code>/<code>json.loads()</code> in Python, <code>ObjectMapper</code> in Java). These functions handle escaping and formatting correctly.
          </li>
          <li>
            <strong>Validate JSON:</strong> Use online or offline JSON validators/linters during development. Many IDEs also have built-in JSON validation. This catches syntax errors before deployment.
          </li>
          <li>
            <strong>Specify Content-Type:</strong> Ensure your server response includes the <code>Content-Type: application/json</code> header. This tells the client how to interpret the payload.
          </li>
          <li>
            <strong>Consistent Encoding:</strong> Configure both server and client to use UTF-8 consistently.
          </li>
          <li>
            <strong>Error Handling:</strong> Implement proper error handling around <code>JSON.parse()</code> on the client and server sides. Catch parsing errors and return informative responses (e.g., HTTP 400 Bad Request with a message indicating a JSON parsing failure).
          </li>
          <li>
            <strong>Logging:</strong> Log the raw request/response body when encountering parsing errors during debugging. This allows you to inspect the actual data being sent.
          </li>
          <li>
            <strong>Schema Validation:</strong> For complex data, consider using JSON Schema to define the expected structure and data types, and validate incoming/outgoing JSON against the schema.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON's simplicity is its strength, but it relies on strict adherence to its specification.
          Understanding common formatting pitfalls like trailing commas, comments, and incorrect quotes, and
          consistently using standard serialization/parsing libraries are key to preventing frustrating
          communication errors between your server and client applications. Validating your JSON during
          development and implementing robust error handling at runtime will significantly improve the
          reliability of your data exchange.
        </p>
      </div>
    </>
  );
}
