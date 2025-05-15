import type { Metadata } from "next";
import {
  CloudOff,
  Code,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ListTree,
  ListChecks,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Testing JSON Formatter Offline Functionality | Offline Tools",
  description:
    "A guide for developers on how to test the offline functionality of a JSON formatter tool, covering various test cases and strategies.",
};

const jsonExampleNested = `{
  "user": {
    "id": 1,
    "name": "Alice",
    "roles": ["admin", "editor"],
    "details": {
      "age": 30,
      "isActive": true
    }
  },
  "products": [
    { "name": "Laptop", "price": 1200 },
    { "name": "Mouse", "price": 25 }
  ]
}`;

const jsonExampleDataTypes = `{
  "string": "Hello, World!",
  "numberInt": 42,
  "numberFloat": 3.14,
  "numberScientific": 1.23e-4,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullable": null
}`;

const jsonExampleEscapes = `{
  "escapedString": "This string has a \\"quote\\" and a newline\\nand a tab\\t and unicode \\u20AC (Euro sign)."
}`;

const jsonExampleInvalidMissingComma = `{
  "key1": "value1"
  "key2": "value2"
}`;

const jsonExampleInvalidBrackets = `[
  { "item": 1
]`;

const jsonExampleInvalidUnquotedKey = `{
  key: "value"
}`;

const jsonExampleInvalidSingleQuotes = `{
  "key": 'value'
}`;

const jsonExampleInvalidTrailingComma = `{
  "key1": "value1",
  "key2": "value2",
}`;

const jsonExampleInvalidKeyword = `{
  "status": True
}`;

const jsonExampleInvalidEscape = `{
  "key": "String with invalid escape \\x"
}`;

const jsonExampleWithComments = `{
  /* This is a comment */
  "data": 123 // This is another comment
}`;


export default function JsonFormatterOfflineTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="w-8 h-8 text-blue-500" /> Testing JSON Formatter Offline Functionality
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web and beyond. JSON formatters are essential tools that help developers read, write, and debug JSON data by providing syntax highlighting, proper indentation, and structural views. A crucial feature for many developers is the ability of these formatters to work <strong>offline</strong>.
        </p>
        <p>
          An offline JSON formatter processes and formats JSON data directly within your browser or application without sending the data to a remote server. This document explores how to effectively test the offline functionality of such a tool.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CloudOff className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Why is Offline Functionality Important?
        </h2>
        <p>
          Testing the offline capability is vital for several reasons:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <strong>Privacy and Security:</strong> Sensitive data doesn&apos;t leave the user&apos;s machine. This is paramount when dealing with confidential or proprietary information.
          </li>
          <li className="flex items-start gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer w-5 h-5 text-blue-600 flex-shrink-0 mt-1"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M12 2v2"/><path d="M12 8v4l3 3"/></svg>
            <strong>Speed and Performance:</strong> Processing data locally is often much faster than sending it over a network and waiting for a response.
          </li>
          <li className="flex items-start gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-signal-high w-5 h-5 text-purple-600 flex-shrink-0 mt-1"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20v-12"/><path d="M22 20V4"/></svg>
            <strong>Reliability:</strong> The tool works consistently regardless of network connectivity or server status.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Code className="w-6 h-6 text-gray-600 dark:text-gray-400" /> How Offline Formatting Works
        </h2>
        <p>
          Offline JSON formatters typically rely on the browser&apos;s built-in JavaScript capabilities, primarily:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>JSON.parse()</code>: This function parses a JSON string, constructing the JavaScript value or object described by the string. This step validates the JSON structure.
          </li>
          <li>
            <code>JSON.stringify()</code>: This function converts a JavaScript value (usually the object/array obtained from <code>JSON.parse</code>) to a JSON string. It can accept optional arguments for controlling the indentation (spacing) and how properties are stringified (replacer).
          </li>
        </ul>
        <p>
          The process is usually: Input String &rarr; <code>JSON.parse()</code> &rarr; JavaScript Object &rarr; <code>JSON.stringify()</code> (with spacing/replacer) &rarr; Formatted JSON String.
        </p>
        <p>
          Since these are native browser functions, they work without a network connection, making the core formatting process inherently offline.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Testing Strategy
        </h2>
        <p>
          Testing an offline JSON formatter involves ensuring it correctly handles a wide range of inputs without requiring network access. A comprehensive strategy includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Functional Testing:</strong> Does it produce the correct output for valid JSON? Does it correctly identify and report errors for invalid JSON?</li>
          <li><strong>Edge Case Testing:</strong> How does it handle large inputs, empty inputs, or inputs with unusual characters/structures?</li>
          <li><strong>Performance Testing:</strong> Is it reasonably fast, especially for larger JSON payloads? (Though less critical for pure offline logic vs. complex UIs).</li>
          <li><strong>Error Reporting Testing:</strong> Are the error messages helpful? Do they indicate the location of the error?</li>
          <li><strong>Offline Simulation:</strong> Explicitly test the tool while the device has no network connection.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <ListTree className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Key Areas and Test Cases
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
           <CheckCircle className="w-5 h-5 text-green-500" /> Testing Valid JSON
        </h3>
        <p>
          The most basic test is formatting valid JSON. You should test various structures and data types:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Simple Objects:</strong> <code>&#x7b; &quot;key&quot;: &quot;value&quot; &#x7d;</code>, <code>&#x7b; &quot;number&quot;: 123, &quot;boolean&quot;: true &#x7d;</code></li>
          <li><strong>Simple Arrays:</strong> <code>[1, 2, 3]</code>, <code>[&quot;a&quot;, &quot;b&quot;]</code>, <code>[null, false]</code></li>
          <li><strong>Nested Structures:</strong> Objects containing arrays, arrays containing objects, deeply nested combinations.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleNested}</pre>
            </div>
          </li>
          <li><strong>Various Data Types:</strong> Test strings, numbers (integers, floats, scientific notation), booleans (<code>true</code>, <code>false</code>), <code>null</code>.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleDataTypes}</pre>
            </div>
          </li>
          <li><strong>Strings with Escapes:</strong> Test strings containing quotes (<code>\&quot;</code>), backslashes (<code>\\\\</code>), newlines (<code>\\n</code>), tabs (<code>\\t</code>), Unicode escapes (<code>\\uXXXX</code>).
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleEscapes}</pre>
            </div>
          </li>
          <li><strong>Empty Structures:</strong> <code>&#x7b;&#x7d;</code> (empty object), <code>[]</code> (empty array).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
           <XCircle className="w-5 h-5 text-red-500" /> Testing Invalid JSON
        </h3>
        <p>
          A good formatter should not just format valid JSON but also clearly report errors for invalid input. Test common syntax errors:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Missing Commas:</strong>
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidMissingComma}</pre>
            </div>
          </li>
          <li><strong>Incorrect Braces/Brackets:</strong> Mismatched or missing delimiters.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidBrackets}</pre>
            </div>
          </li>
          <li><strong>Unquoted Keys:</strong> JSON requires keys to be double-quoted strings.
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleInvalidUnquotedKey}</pre>
            </div>
          </li>
          <li><strong>Single Quoted Strings:</strong> JSON requires double quotes.
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleInvalidSingleQuotes}</pre>
            </div>
          </li>
          <li><strong>Trailing Commas:</strong> Commas after the last element in an object or array are invalid JSON (though allowed in modern JavaScript).
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleInvalidTrailingComma}</pre>
            </div>
          </li>
           <li><strong>Incorrect Keywords:</strong> Using JavaScript keywords like <code>undefined</code> or <code>NaN</code>, or incorrect casing like <code>True</code> instead of <code>true</code>.
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleInvalidKeyword}</pre>
            </div>
          </li>
           <li><strong>Invalid String Escapes:</strong> Backslashes not followed by a valid escape character.
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleInvalidEscape}</pre>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" /> Testing Edge Cases
        </h3>
        <p>
          Consider inputs that might push the boundaries:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Very Large JSON:</strong> Test with MBs of JSON data to check performance and potential browser memory limits.</li>
          <li><strong>Minimal JSON:</strong> Single value JSON like <code>&quot;hello&quot;</code>, <code>123</code>, <code>true</code>, <code>null</code> (though the JSON standard primarily expects an object or array as the top level, <code>JSON.parse</code> handles primitive values).</li>
          <li><strong>JSON with only Whitespace:</strong> What happens if the input is just spaces, tabs, and newlines?</li>
          {/* eslint-disable react/jsx-no-comment-textnodes */}
          <li><strong>JSON with Comments:</strong> While not part of the strict JSON standard, some tools might support comments (usually <code>//</code> or <code>/* */</code>). Test if these are handled gracefully (either stripped or cause an error depending on expected behavior).
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
               <pre>{jsonExampleWithComments}</pre>
            </div>
          </li>
          {/* eslint-enable react/jsx-no-comment-textnodes */}
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
           <XCircle className="w-5 h-5 text-red-500" /> Testing Error Reporting
        </h3>
        <p>
          When invalid JSON is provided, the formatter should provide clear feedback.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
           <li>Does it indicate that an error occurred?</li>
           <li>Is the error message understandable to a developer?</li>
           <li>Does it provide the line number and potentially the column number where the parsing failed?</li>
           <li>Is the problematic part of the input highlighted?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CloudOff className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Simulating Offline Conditions
        </h2>
        <p>
          To truly test the offline functionality, you must simulate being offline. Most modern browsers offer developer tools that allow you to throttle or completely disable network requests:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Chrome/Edge:</strong> Open Developer Tools (F12), go to the &quot;Network&quot; tab, and find the &quot;Online&quot; dropdown (usually next to the disable cache checkbox). Select &quot;Offline&quot;.</li>
          <li><strong>Firefox:</strong> Open Developer Tools (F12), go to the &quot;Network&quot; tab, and find the &quot;No Throttling&quot; dropdown. Select &quot;Offline&quot;.</li>
        </ul>
        <p>
          With the network disabled, perform all the test cases mentioned above. Ensure the formatting and error reporting work exactly as they do when online, with no errors related to network requests.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <ListChecks className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Automated vs. Manual Testing
        </h2>
        <p>
          While the core parsing and stringifying logic can be covered with automated unit tests using frameworks like Jest or Vitest (testing the functions that wrap <code>JSON.parse</code> and <code>JSON.stringify</code>), manual testing is crucial for the user interface part:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
           <li>Checking indentation rendering.</li>
           <li>Verifying syntax highlighting colors.</li>
           <li>Interacting with the error messages and location indicators.</li>
           <li>Testing usability with large inputs where scrolling is involved.</li>
           <li>Explicitly testing in offline mode via browser developer tools.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> Conclusion
        </h2>
        <p>
          Testing the offline functionality of a JSON formatter is straightforward but requires covering a diverse set of inputs and scenarios. By systematically testing valid JSON, invalid JSON, and edge cases while simulating offline conditions, developers can ensure their tool is robust, reliable, and protects user privacy by keeping data processing local. The reliance on native browser APIs like <code>JSON.parse</code> and <code>JSON.stringify</code> makes the core offline capability relatively easy to achieve and verify.
        </p>
      </div>
    </>
  );
}