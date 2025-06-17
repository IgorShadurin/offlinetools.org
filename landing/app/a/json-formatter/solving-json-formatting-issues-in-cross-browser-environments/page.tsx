import type { Metadata } from "next";
import {
  AlertTriangle, // Replaced Warning with AlertTriangle
  Check,
  FileJson,
  Code,
  RefreshCcw,
  Bug,
  Settings,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solving JSON Formatting Issues in Cross-Browser Environments",
  description:
    "Understand potential JSON formatting pitfalls and best practices for consistent behavior across different web browsers.",
};

export default function CrossBrowserJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson className="size-8" />
        <span>Solving JSON Formatting Issues in Cross-Browser Environments</span>
      </h1>

      <div className="space-y-6 text-base">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. Its
          simplicity and direct mapping to JavaScript data structures make it ideal for APIs and client-side data
          handling. However, like many web technologies, slight differences or historical quirks across browser
          JavaScript engines can occasionally lead to unexpected JSON formatting issues. While modern browsers are
          largely compliant with the ECMAScript standard that defines the <Code className="inline size-4" />
          <span className="font-mono">JSON</span>
          <Code className="inline size-4" /> global object, understanding the potential pitfalls and best practices is
          crucial for robust cross-browser applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Globe className="size-6" />
          <span>
            The Core Tools: <Code className="inline size-4" />
            <span className="font-mono">JSON.parse</span>
            <Code className="inline size-4" /> and <Code className="inline size-4" />
            <span className="font-mono">JSON.stringify</span>
            <Code className="inline size-4" />
          </span>
        </h2>
        <p>
          The standard way to handle JSON in JavaScript, available in all modern browsers, is via the built-in
          <Code className="inline size-4" />
          <span className="font-mono">JSON</span>
          <Code className="inline size-4" /> object.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Code className="inline size-4" />
            <span className="font-mono">JSON.parse(text[, reviver])</span>
            <Code className="inline size-4" />: Parses a JSON string, constructing the JavaScript value or object
            described by the string.
          </li>
          <li>
            <Code className="inline size-4" />
            <span className="font-mono">JSON.stringify(value[, replacer[, space]])</span>
            <Code className="inline size-4" />: Converts a JavaScript value to a JSON string, optionally including only
            certain properties or using a custom transformation function.
          </li>
        </ul>
        <p>
          These methods are standardized and provide consistent behavior across compliant environments. Problems
          primarily arise when dealing with non-standard inputs or relying on specific output formatting details that
          were handled inconsistently in older engines or non-standard implementations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="size-6 text-yellow-500" />
          <span>Potential Cross-Browser Formatting Issues</span>
        </h2>
        <p>
          While <Code className="inline size-4" />
          <span className="font-mono">JSON.parse</span>
          <Code className="inline size-4" /> and <Code className="inline size-4" />
          <span className="font-mono">JSON.stringify</span>
          <Code className="inline size-4" /> are highly reliable in modern browsers, here are some areas where
          historical differences or misunderstandings could lead to issues:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>1. Older Browser Implementations (e.g., IE7 and below)</span>
        </h3>
        <p>
          Before the <Code className="inline size-4" />
          <span className="font-mono">JSON</span>
          <Code className="inline size-4" /> object was standardized, developers often relied on third-party libraries
          or manual parsing/stringifying methods. These could have varying levels of compliance with the JSON
          specification. If supporting very old browsers is a requirement, polyfills like the one from{" "}
          <a
            href="https://github.com/douglascrockford/JSON-js"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            Douglas Crockford&apos;s JSON-js library
          </a>
          were necessary. However, for most modern web development targeting IE9+, this is no longer a significant
          concern.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>2. Non-Standard JSON Syntax</span>
        </h3>
        <p>
          The JSON specification is strict. It requires double quotes for string keys and values, does not allow
          trailing commas in arrays or objects, and forbids comments.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2">
            <AlertTriangle className="size-5 text-yellow-500" />
            <span>Invalid JSON (Common Mistakes):</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`{
  name: 'Alice', // <--- keys must be double-quoted
  "age": 30,
  "cities": ["London", "Paris",], // <--- trailing comma not allowed
  // This is a comment <--- comments not allowed
}`}
            </pre>
          </div>
        </div>
        <p>
          While some JavaScript parsers might be lenient (e.g., <Code className="inline size-4" />
          <span className="font-mono">eval()</span>
          <Code className="inline size-4" />
          or older custom parsers), standard <Code className="inline size-4" />
          <span className="font-mono">JSON.parse</span>
          <Code className="inline size-4" /> will throw a
          <Code className="inline size-4" />
          <span className="font-mono">SyntaxError</span>
          <Code className="inline size-4" /> for invalid JSON. Consistency comes from adhering strictly to the JSON
          standard on both the producing (server) and consuming (client) ends.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>3. Whitespace and Formatting on Stringify</span>
        </h3>
        <p>
          The <Code className="inline size-4" />
          <span className="font-mono">JSON.stringify</span>
          <Code className="inline size-4" /> method has an optional <Code className="inline size-4" />
          <span className="font-mono">space</span>
          <Code className="inline size-4" />
          argument that controls indentation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Example <Code className="inline size-4" />
            <span className="font-mono">space</span>
            <Code className="inline size-4" /> argument:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`const obj = { name: "Bob", age: 42 };

// No space (default compact format)
console.log(JSON.stringify(obj)); // Output: {"name":"Bob","age":42}

// Use 2 spaces for indentation
console.log(JSON.stringify(obj, null, 2));
/* Output:
{
  "name": "Bob",
  "age": 42
}
*/

// Use a tab character for indentation
console.log(JSON.stringify(obj, null, '\\t'));
/* Output:
{
\t"name": "Bob",
\t"age": 42
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          The specific whitespace (spaces or tabs) and newlines generated when using the{" "}
          <Code className="inline size-4" />
          <span className="font-mono">space</span>
          <Code className="inline size-4" /> argument are consistent across modern browsers according to the spec.
          Issues here are more likely related to developers *expecting* a specific format (e.g., for pretty-printing)
          and not using the <Code className="inline size-4" />
          <span className="font-mono">space</span>
          <Code className="inline size-4" />
          argument correctly, rather than true cross-browser inconsistencies in parsing valid JSON with various
          whitespace.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>4. Number Precision Issues</span>
        </h3>
        <p>
          JSON numbers are typically represented as IEEE 754 double-precision floating-point numbers in JavaScript. Very
          large integers or numbers with high decimal precision might suffer from precision loss. This is not a JSON
          *formatting* issue itself, but a limitation of JavaScript&apos;s number type that becomes apparent when
          parsing numbers from JSON. This behavior is consistent across standard JavaScript environments, but it&apos;s
          something to be aware of if your application deals with financial data or scientific calculations requiring
          exact precision beyond what doubles can provide.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>5. Character Encoding</span>
        </h3>
        <p>
          JSON text MUST be encoded in UTF-8. While browsers generally handle UTF-8 correctly, serving JSON with a
          different encoding (like Latin-1) without specifying the correct <Code className="inline size-4" />
          <span className="font-mono">Content-Type: application/json; charset=utf-8</span>
          <Code className="inline size-4" />
          header can lead to incorrect parsing of non-ASCII characters in some browser/server configurations. Always
          ensure consistent UTF-8 encoding.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug className="size-5" />
          <span>
            6. Security Concerns (<Code className="inline size-4" />
            <span className="font-mono">eval()</span>
            <Code className="inline size-4" /> is Bad)
          </span>
        </h3>
        <p>
          Historically, some developers used <Code className="inline size-4" />
          <span className="font-mono">eval()</span>
          <Code className="inline size-4" /> to parse JSON strings, especially before <Code className="inline size-4" />
          <span className="font-mono">JSON.parse</span>
          <Code className="inline size-4" /> was widely available. This is a major security vulnerability because{" "}
          <Code className="inline size-4" />
          <span className="font-mono">eval()</span>
          <Code className="inline size-4" />
          executes *any* JavaScript code within the string. If the JSON data comes from an untrusted source, it could
          contain malicious code. <Code className="inline size-4" />
          <span className="font-mono">JSON.parse</span>
          <Code className="inline size-4" /> is designed to be safe as it only parses the JSON syntax and does not
          execute code. Using <Code className="inline size-4" />
          <span className="font-mono">eval()</span>
          <Code className="inline size-4" /> for JSON parsing should be strictly avoided in all browsers.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2">
            <AlertTriangle className="size-5 text-red-500" />
            <span>NEVER do this:</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// BAD, insecure, can execute arbitrary code!
const unsafeJsonString = '{"name": "Bad Guy", "action": alert("You were hacked!")}';
try {
  const data = eval('(' + unsafeJsonString + ')'); // Wrapped in parens to force object interpretation
  console.log(data);
} catch (e) {
  console.error("Eval failed:", e);
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2">
            <Check className="size-5 text-green-500" />
            <span>ALWAYS do this:</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// GOOD, safe
const safeJsonString = '{"name": "Good Guy", "message": "Data is safe"}';
try {
  const data = JSON.parse(safeJsonString);
  console.log(data);
} catch (e) {
  console.error("Parsing failed:", e); // Handles invalid JSON gracefully
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings className="size-6" />
          <span>Strategies for Robust Cross-Browser JSON Handling</span>
        </h2>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <p className="font-semibold">
              Use <Code className="inline size-4" />
              <span className="font-mono">JSON.parse</span>
              <Code className="inline size-4" /> and <Code className="inline size-4" />
              <span className="font-mono">JSON.stringify</span>
              <Code className="inline size-4" /> Exclusively:
            </p>
            <p>
              These are the standard, safest, and most performant methods available in modern browsers. Avoid manual
              parsing or <Code className="inline size-4" />
              <span className="font-mono">eval()</span>
              <Code className="inline size-4" />.
            </p>
          </li>
          <li>
            <p className="font-semibold">Validate JSON Input:</p>
            <p>
              Always wrap <Code className="inline size-4" />
              <span className="font-mono">JSON.parse</span>
              <Code className="inline size-4" /> in a <Code className="inline size-4" />
              <span className="font-mono">try...catch</span>
              <Code className="inline size-4" /> block to handle potential <Code className="inline size-4" />
              <span className="font-mono">SyntaxError</span>
              <Code className="inline size-4" />s gracefully if the input string is not valid JSON.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
                <pre>
                  {`function safeParseJSON(jsonString: string): any | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    // Handle the error, e.g., return null, throw a custom error, etc.
    return null;
  }
}`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <p className="font-semibold">Ensure Server-Side Output is Valid JSON:</p>
            <p>
              The most common source of "JSON formatting issues" on the client-side is actually invalid JSON produced by
              the server. Use robust JSON serialization libraries on the backend and validate the output if possible.
              Set the correct <Code className="inline size-4" />
              <span className="font-mono">Content-Type: application/json; charset=utf-8</span>
              <Code className="inline size-4" /> header.
            </p>
          </li>
          <li>
            <p className="font-semibold">Be Mindful of Number Precision:</p>
            <p>
              If your application requires exact handling of large numbers, consider passing them as strings in the JSON
              and using a library like{" "}
              <a
                href="https://github.com/MikeMcl/decimal.js/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                Decimal.js
              </a>
              or{" "}
              <a
                href="https://github.com/gwilie/BigInt.js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                BigInt
              </a>
              (for integers, supported natively in newer JS) to handle them after parsing.
            </p>
          </li>
          <li>
            <p className="font-semibold">Handle Dates Appropriately:</p>
            <p>
              JSON does not have a built-in Date type. Dates are typically represented as strings (e.g., ISO 8601
              format). You will need to manually convert these strings into JavaScript{" "}
              <Code className="inline size-4" />
              <span className="font-mono">Date</span>
              <Code className="inline size-4" /> objects after parsing. The <Code className="inline size-4" />
              <span className="font-mono">reviver</span>
              <Code className="inline size-4" /> argument of <Code className="inline size-4" />
              <span className="font-mono">JSON.parse</span>
              <Code className="inline size-4" />
              is useful for this.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium flex items-center space-x-2">
                <RefreshCcw className="size-5" />
                <span>
                  Example using a <Code className="inline size-4" />
                  <span className="font-mono">reviver</span>
                  <Code className="inline size-4" /> for Dates:
                </span>
              </h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
                <pre>
                  {`const jsonWithDate = '{"name": "Event", "date": "2023-10-27T10:00:00.000Z"}';

function dateReviver(key: string, value: any): any {
  // Check if value is a string and looks like an ISO date
  if (typeof value === 'string' && /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.*Z$/.test(value)) {
    const date = new Date(value);
    // Check if Date parsing was successful and it's a valid date
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return value;
}

const parsedDataWithDate = JSON.parse(jsonWithDate, dateReviver);
console.log(parsedDataWithDate.date); // Output: Date object (e.g., Fri Oct 27 2023 ...)
console.log(parsedDataWithDate.date instanceof Date); // Output: true`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <p className="font-semibold">Use Linters and Formatters:</p>
            <p>
              Tools like ESLint and Prettier can help catch potential syntax errors in JSON literals within your
              codebase and enforce consistent formatting, although they primarily address static code files, not dynamic
              data received from servers.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Check className="size-6 text-green-500" />
          <span>Conclusion</span>
        </h2>
        <p>
          In contemporary web development, cross-browser JSON formatting issues are far less prevalent than they were in
          the past, thanks to the widespread adoption and standardization of the <Code className="inline size-4" />
          <span className="font-mono">JSON</span>
          <Code className="inline size-4" />
          object in JavaScript engines. The vast majority of &quot;formatting&quot; problems stem from invalid JSON
          syntax (often generated server-side) or developer assumptions about features not part of the core
          specification (like comments or trailing commas).
        </p>
        <p>
          By consistently using <Code className="inline size-4" />
          <span className="font-mono">JSON.parse</span>
          <Code className="inline size-4" />
          and <Code className="inline size-4" />
          <span className="font-mono">JSON.stringify</span>
          <Code className="inline size-4" />, validating input with <Code className="inline size-4" />
          <span className="font-mono">try...catch</span>
          <Code className="inline size-4" />, ensuring server-side JSON compliance (UTF-8 encoding, correct syntax), and
          handling data types like Dates and large numbers explicitly, you can ensure reliable and consistent JSON
          processing across all modern web browsers.
        </p>
      </div>
    </>
  );
}
