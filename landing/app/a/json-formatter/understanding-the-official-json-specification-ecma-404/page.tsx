import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding the Official JSON Specification (ECMA-404) | Offline Tools",
  description:
    "Dive deep into the ECMA-404 specification, the official definition of JSON, and understand its syntax rules and structure for robust data exchange.",
};

export default function UnderstandingJsonSpecArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Understanding the Official JSON Specification (ECMA-404)</h1>

      <div className="space-y-6">
        <p>
          JSON, or JavaScript Object Notation, has become the de facto standard for data interchange on the web and
          beyond. While seemingly simple, understanding its precise definition is crucial for building interoperable
          systems. The official standard for JSON is defined by ECMA-404. Let&apos;s explore what this specification
          entails and why adhering to it is important.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is ECMA-404?</h2>
        <p>
          ECMA-404, formally titled &quot;The JSON Data Interchange Format&quot;, is a technical standard published by
          Ecma International. It provides a concise and precise definition of the JSON syntax, ensuring that JSON data
          can be reliably parsed and generated across different programming languages and systems.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key aspects defined by ECMA-404:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The basic structure of JSON data (objects and arrays).</li>
            <li>
              The set of allowed primitive values (strings, numbers, boolean literals `true`, `false`, and `null`).
            </li>
            <li>Strict rules for string representation (using double quotes).</li>
            <li>Strict rules for number representation.</li>
            <li>Rules for whitespace handling.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Adhere to the Specification?</h2>
        <p>
          While many JSON parsers are lenient and may accept slightly malformed JSON (sometimes referred to as
          &quot;JSON-like&quot; data), strictly following ECMA-404 ensures maximum compatibility and prevents unexpected
          parsing issues.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Benefits of adhering to ECMA-404:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Interoperability:</span> Data produced according to the spec can be reliably
              consumed by any spec-compliant parser.
            </li>
            <li>
              <span className="font-medium">Predictability:</span> You know exactly how your data will be interpreted.
            </li>
            <li>
              <span className="font-medium">Error Prevention:</span> Avoids subtle bugs caused by parsers handling
              non-standard syntax differently.
            </li>
            <li>
              <span className="font-medium">Security:</span> Lenient parsers can sometimes be exploited. Strict parsing
              is generally safer.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Core Components Defined by ECMA-404</h2>
        <p>
          The specification defines JSON data as one of two structures: an object or an array. These structures can be
          nested.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Objects</h3>
        <p>An object is an unordered collection of zero or more key/value pairs.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Syntax Rules:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Starts with an opening curly brace {`{`} and ends with a closing curly brace {`}`}.
            </li>
            <li>Key/value pairs are separated by commas {`,`}.</li>
            <li>Each key/value pair is separated by a colon {`:`}.</li>
            <li>Keys must be strings (enclosed in double quotes).</li>
            <li>
              Values can be a string, number, object, array, boolean ({`true`} or {`false`}), or {`null`}.
            </li>
            <li>
              Whitespace can appear before or after {`{`} {`}`}, {`,`} and {`:`}.
            </li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Physics"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "spouse": null
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Arrays</h3>
        <p>An array is an ordered sequence of zero or more values.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Syntax Rules:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Starts with an opening square bracket {`[`} and ends with a closing square bracket {`]`}.
            </li>
            <li>Values are separated by commas {`,`}.</li>
            <li>
              Values can be a string, number, object, array, boolean ({`true`} or {`false`}), or {`null`}.
            </li>
            <li>
              Whitespace can appear before or after {`[`} {`]`}, and {`,`}.
            </li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[
  "apple",
  123,
  true,
  { "id": 1 },
  [5, 6],
  null
]`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Values</h3>
        <p>A value must be one of the following types:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">string:</span> A sequence of zero or more Unicode characters, enclosed in
              double quotes. Specific characters (like double quote, backslash, control characters) must be escaped
              using a backslash {`\\`}.
            </li>
            <li>
              <span className="font-medium">number:</span> A double-precision floating-point number in the IEEE 754
              standard. Includes integers, decimals, and optionally an exponent. Does *not* include {`NaN`} or{" "}
              {`Infinity`}.
            </li>
            <li>
              <span className="font-medium">object:</span> As defined above.
            </li>
            <li>
              <span className="font-medium">array:</span> As defined above.
            </li>
            <li>
              <span className="font-medium">{`true`}:</span> The boolean true literal.
            </li>
            <li>
              <span className="font-medium">{`false`}:</span> The boolean false literal.
            </li>
            <li>
              <span className="font-medium">{`null`}:</span> The null literal.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Pitfalls (Non-Standard JSON)</h2>
        <p>
          Many issues arise from using features common in JavaScript object literals but not allowed in strict JSON
          (ECMA-404).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            What is NOT valid JSON according to ECMA-404:
          </h3>
          <ul className="list-disc pl-6 space-y-3 mt-2">
            <li>
              <span className="font-medium">Comments:</span> Single-line (`//`) or multi-line (`/* ... */`) comments are
              not allowed.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  "name": "Test", // This comment is invalid
  "value": 123
}`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Trailing Commas:</span> A comma after the last element in an object or array
              is not allowed.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  "item1": 1,
  "item2": 2, // Trailing comma invalid
}`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Single Quotes:</span> Both keys and string values must be enclosed in double
              quotes `"` NOT single quotes `'`.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  'name': 'Charlie' // Single quotes invalid for key and value
}`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Unquoted Keys:</span> Object keys must always be strings (quoted).
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  name: "David" // Unquoted key invalid
}`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Undefined or NaN/Infinity:</span> These JavaScript specific values are not
              valid JSON numbers or literals. Only `null`, `true`, `false` are allowed literals beyond strings and
              numbers.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  "value1": undefined, // Invalid
  "value2": NaN,       // Invalid
  "value3": Infinity   // Invalid
}`}
                </pre>
              </div>
            </li>
          </ul>
          <p className="mt-4 text-sm italic">
            Note: While ECMA-404 does not specify a maximum nesting depth or size, practical limitations exist based on
            parser implementations and available memory.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Tools for Validation</h2>
        <p>To ensure your JSON strictly adheres to the ECMA-404 specification, you can use various tools.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3 mt-2">
            <li>
              <span className="font-medium">Online JSON Validators:</span> Many websites provide tools to paste your
              JSON and check its validity against the standard.
            </li>
            <li>
              <span className="font-medium">Programming Language Parsers:</span> Standard JSON parsing libraries in most
              languages (e.g., Python&apos;s `json`, JavaScript&apos;s `JSON.parse`) are designed to be spec-compliant
              and will throw errors on invalid JSON.
            </li>
            <li>
              <span className="font-medium">Command-line Tools:</span> Utilities like `jq` or others specifically
              designed for JSON manipulation and validation can check syntax.
            </li>
            <li>
              <span className="font-medium">IDEs and Text Editors:</span> Many modern editors have built-in JSON syntax
              highlighting and validation based on the standard.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">ECMA-404 vs. JSON Schema</h2>
        <p>It&apos;s important to distinguish between the JSON specification (ECMA-404) and JSON Schema.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">ECMA-404:</span> Defines the *syntax* of a valid JSON document. It tells you
              *if* a string of text is structurally correct JSON.
            </li>
            <li>
              <span className="font-medium">JSON Schema:</span> Defines the *structure and data types* of a JSON
              document. It tells you *if* a valid JSON document conforms to a specific model or contract (e.g.,
              &quot;this object must have a key &apos;age&apos; whose value is an integer&quot;).
            </li>
          </ul>
          <p className="mt-2">
            Think of ECMA-404 as grammar rules for sentences, while JSON Schema defines the expected content and types
            within those sentences for a specific purpose. You need a document that is syntactically valid JSON (per
            ECMA-404) before you can validate it against a JSON Schema.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While you might encounter JSON variations in the wild that deviate from the official standard, ECMA-404
          remains the definitive source for what constitutes valid JSON. Understanding and adhering to this
          specification is fundamental for reliable data parsing, generation, and exchange in any development
          environment. By sticking to the clear rules for objects, arrays, values, strings, and numbers, you ensure your
          JSON data is truly universal.
        </p>
      </div>
    </>
  );
}
