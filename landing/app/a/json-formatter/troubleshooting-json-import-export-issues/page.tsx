import type { Metadata } from "next";
import {
  AlertCircle,
  Code,
  FileJson,
  Import,
  Download, // Corrected: Changed Export to Download
  Bug,
  CheckCircle,
  XCircle,
  Settings,
  CloudDrizzle,
  Anchor,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting JSON Import/Export Issues | Developer Guide",
  description:
    "A comprehensive guide to identifying and resolving common issues when importing or exporting JSON data in various development contexts.",
};

export default function JsonTroubleshootingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson size={36} /> Troubleshooting JSON Import/Export Issues
      </h1>

      <div className="space-y-8 text-lg">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange
           format that is easy for humans to read and write and easy for machines
           to parse and generate. It&apos;s ubiquitous in web development, used
            extensively for API communication, configuration files, data storage,
           and more. However, working with JSON, especially when importing or
           exporting data, can sometimes lead to frustrating issues. This guide
           covers common problems and provides actionable troubleshooting steps
           for developers of all levels.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Import size={28} /> Common Import Issues
        </h2>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Bug size={24} /> 1. Syntax Errors
          </h3>
          <p>
            This is perhaps the most common issue. JSON has a strict syntax. A
            missing comma, an extra quote, incorrect bracing, or a trailing
            comma in an object or array can break the entire parsing process.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example of common syntax errors:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`// Incorrect: Missing comma after "name"
{
  "name": "Alice"
  "age": 30 // Syntax Error: Comma required before this line
}`}
              </pre>
              <pre className="mt-3">
                {`// Incorrect: Trailing comma (not allowed in strict JSON)
[
  1,
  2,
  3, // Syntax Error: Trailing comma not allowed here
]`}
              </pre>
              <pre className="mt-3">
                {`// Incorrect: Unquoted key
{
  status: "active" // Syntax Error: Key "status" must be quoted
}`}
              </pre>
            </div>
          </div>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a JSON validator (online tools or IDE extensions) to pinpoint the exact location of the error.</li>
            <li>Check commas between key-value pairs in objects and elements in arrays.</li>
            <li>Ensure all keys (property names) are enclosed in double quotes.</li>
            <li>Verify that strings are enclosed in double quotes and that special characters like `"` are properly escaped (`\"`).</li>
            <li>Check for correct matching of `&#x7b;`, `&#x7d;`, `[`, and `]`.</li>
            <li>Look for trailing commas - they are not allowed in standard JSON.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <AlertCircle size={24} /> 2. Encoding Issues (BOM, non-UTF-8)
          </h3>
          <p>
            JSON files should ideally be encoded in UTF-8 without a Byte Order Mark (BOM). Files saved with a BOM or a different encoding might cause parsing errors.
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ensure your text editor or script saves the JSON file with UTF-8 encoding.</li>
            <li>Check if a BOM is present (some editors add it by default) and configure the editor or use a script to remove it.</li>
            <li>If receiving data from an external source, ensure the Content-Type header specifies `application/json; charset=utf-8`.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Settings size={24} /> 3. Data Type Mismatches or Unexpected Values
          </h3>
          <p>
            JSON supports specific data types: String, Number, Boolean (`true`/`false`), Null, Object, and Array. Issues arise when data doesn&apos;t conform to the expected type, or contains values like `undefined`, `NaN`, or `Infinity` which are valid in JavaScript but not in standard JSON.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example of invalid JSON values:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`// Incorrect: Invalid JSON values
{
  "status": undefined, // undefined is not valid JSON
  "value": NaN,       // NaN is not valid JSON
  "inf": Infinity     // Infinity is not valid JSON
}`}
              </pre>
            </div>
          </div>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Before serializing (exporting) data to JSON, ensure all values are of valid JSON types. Convert `undefined`, `NaN`, and `Infinity` to `null` or handle them appropriately.</li>
            <li>When parsing (importing), validate the structure and types of the parsed data against your expectations (e.g., using schema validation libraries).</li>
            <li>If consuming an API, check the API documentation for expected data types and formats.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Code size={24} /> 4. Extra Characters or Malformed Response
          </h3>
          <p>
            Sometimes, extra characters (like whitespace, newline characters, or even HTML) can appear before or after the main JSON structure, especially when fetching from an endpoint that might accidentally output debug information or is not strictly returning JSON.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example of malformed response:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`// Malformed: Extra newline and HTML before JSON
\\n
<br/>
{ "data": "..." }`}
              </pre>
            </div>
          </div>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>If receiving data from a server, inspect the raw response body to see if anything unexpected is included.</li>
            <li>Ensure the server correctly sets the `Content-Type` header to `application/json`.</li>
            <li>In server-side code, ensure that only the JSON output is being sent in the response, without any preceding or trailing characters or debugging output.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Anchor size={24} /> 5. Large File Size / Performance
          </h3>
          <p>
            Importing very large JSON files (hundreds of MBs or Gigabytes) can consume excessive memory and cause applications to freeze or crash, especially in browsers or environments with limited resources.
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consider streaming the JSON data rather than loading it all into memory at once.</li>
            <li>If possible, process the file in chunks.</li>
            <li>For web applications, consider using browser APIs like `FileReader` with chunking or specialized libraries for large file processing.</li>
            <li>If the data is coming from an API, implement pagination to retrieve data in smaller, manageable batches.</li>
            <li>Compress the JSON data during transfer (e.g., using Gzip).</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Download size={28} /> Common Export Issues
        </h2>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <XCircle size={24} /> 1. Non-JSON Data Types
          </h3>
          <p>
            As mentioned above, JavaScript objects can contain values like `undefined`, functions, `BigInt` (depending on JS engine and JSON.stringify implementation), circular references, etc., that are not valid in standard JSON. Serializing these can lead to errors or unexpected output (e.g., `JSON.stringify` skips `undefined` and function properties).
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cleanse your data object before calling `JSON.stringify`. Remove or convert unsupported types. For instance, convert `undefined` to `null`.</li>
            <li>Be mindful of circular references in objects, which will cause `JSON.stringify` to throw an error. Implement a replacer function for `JSON.stringify` or restructure your data to break circular references.</li>
            <li>Handle `BigInt` explicitly if targeting environments that don&apos;t support it in `JSON.stringify` or if specific numerical precision is required (they might be converted to strings or cause errors).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Code size={24} /> 2. Improper String Escaping
          </h3>
          <p>
            JSON string values must properly escape certain characters, including double quotes (`"`), backslashes (`\`), and control characters (like newline `\n`, carriage return `\r`, tab `\t`). Most built-in JSON serialization functions handle this automatically, but custom implementations or manual string manipulation can introduce errors.
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Always use the built-in `JSON.stringify()` function or a robust library for serializing JavaScript objects to JSON strings. Avoid manually constructing JSON strings through concatenation.</li>
            <li>If receiving strings that will be embedded within JSON values, ensure they are properly escaped *before* serialization if they might contain problematic characters.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <FileJson size={24} /> 3. Incorrect File Handling / Output
          </h3>
          <p>
            When exporting to a file, issues can arise from incorrect file paths, insufficient permissions, writing invalid content, or not properly closing the file handle.
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify the file path is correct and accessible by the process running your code. Check file system permissions.</li>
            <li>Ensure the serialized JSON string is correctly written to the file without modification.</li>
            <li>Make sure the file stream or handle is properly closed after writing is complete.</li>
            <li>Specify the correct MIME type (`application/json`) if serving the file via HTTP.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <CloudDrizzle size={24} /> 4. Network or Permission Issues
          </h3>
          <p>
            If exporting by sending JSON data over a network (e.g., an API request), network connectivity problems, server-side processing errors, or incorrect request headers/body can cause the export to fail.
          </p>
          <p>
            <strong>Troubleshooting:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Check network connectivity between the client and server.</li>
            <li>Inspect the HTTP request and response using browser developer tools or network monitoring tools. Look at status codes and response bodies for errors.</li>
            <li>Ensure correct HTTP method (e.g., POST, PUT) and headers (especially `Content-Type: application/json`).</li>
            <li>Verify that the server endpoint is correctly configured to receive and process JSON data.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle size={28} /> General Best Practices
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-lg">
          <li>
            <strong>Validate:</strong> Always validate incoming JSON data, especially from external or untrusted sources. Use schema validation (like JSON Schema) when possible.
          </li>
          <li>
            <strong>Use Built-in Functions:</strong> Rely on `JSON.parse()` and `JSON.stringify()` or well-established libraries (like `lodash.clonedeep` for deep cloning before stringifying, or specific JSON streaming parsers for large data).
          </li>
          <li>
            <strong>Check Encoding:</strong> Ensure consistent UTF-8 encoding without BOM for all JSON files and data transfers.
          </li>
          <li>
            <strong>Error Handling:</strong> Wrap parsing and serialization calls in try...catch blocks to gracefully handle errors. Provide informative error messages.
          </li>
          <li>
            <strong>Logging:</strong> Log the JSON data or relevant parts of it during debugging to inspect its exact structure and content when issues occur.
          </li>
          <li>
            <strong>Use Linting & Formatting:</strong> Use linters (like ESLint with JSON plugins) and formatters (like Prettier) to catch common syntax errors automatically during development.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={28} /> Example Code Snippets
        </h2>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold mt-6">Handling invalid JavaScript values before `JSON.stringify`:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`const data = {
  id: 1,
  name: "Test Item",
  description: undefined, // Invalid in JSON
  value: NaN,           // Invalid in JSON
  config: {
    settingA: true,
    settingB: Infinity  // Invalid in JSON
  },
  list: [1, 2, undefined, 4] // Invalid in JSON
};

// Clean data before stringifying
function cleanForJson(obj: any): any {
  if (obj === undefined || obj === null || typeof obj === 'function' || Number.isNaN(obj) || obj === Infinity || obj === -Infinity) {
    return null; // Convert invalid JSON values to null
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanForJson);
  }
  const cleanedObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const cleanedValue = cleanForJson(obj[key]);
      // Optionally skip properties that become null after cleaning
      // if (cleanedValue !== null) {
         cleanedObj[key] = cleanedValue;
      // }
    }
  }
  return cleanedObj;
}

const cleanedData = cleanForJson(data);
const jsonString = JSON.stringify(cleanedData, null, 2); // Use null, 2 for pretty printing

console.log(jsonString);
// Output:
/*
{
  "id": 1,
  "name": "Test Item",
  "description": null,
  "value": null,
  "config": {
    "settingA": true,
    "settingB": null
  },
  "list": [
    1,
    2,
    null,
    4
  ]
}
*/
`}
              </pre>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">Basic `try...catch` for `JSON.parse`:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`const potentiallyInvalidJson = '{ "name": "Bob", "age": 25, }'; // Trailing comma

try {
  const parsedData = JSON.parse(potentiallyInvalidJson);
  console.log("Successfully parsed:", parsedData);
} catch (error) {
  console.error("Failed to parse JSON:", error instanceof Error ? error.message : error);
  // Handle the error - maybe log the invalid string, show a user message, etc.
}
`}
              </pre>
            </div>
          </div>
        </div>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle size={28} /> Conclusion
        </h2>
        <p>
          Troubleshooting JSON import and export issues primarily involves
          understanding JSON&apos;s strict syntax and limited data types compared
          to JavaScript. By carefully checking for syntax errors, handling data
          types correctly, ensuring proper encoding, and using robust built-in
          methods or libraries, you can resolve most common problems. Effective
          validation and error handling are key to building applications that
          reliably process JSON data.
        </p>
      </div>
    </>
  );
}
