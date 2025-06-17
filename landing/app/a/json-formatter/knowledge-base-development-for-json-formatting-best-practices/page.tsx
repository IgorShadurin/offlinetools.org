import type { Metadata } from "next";
import { FileJson2, Check, AlertCircle, Info, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base: JSON Formatting Best Practices | Developer Guide",
  description:
    "Learn essential best practices for formatting JSON data to improve readability, maintainability, and interoperability in your development projects.",
};

export default function JsonFormattingBestPracticesArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <FileJson2 className="inline-block mr-3 h-10 w-10 text-blue-500" />
        JSON Formatting Best Practices
      </h1>

      <p className="text-lg text-center text-gray-600 mb-12">
        A Guide to Writing Readable, Maintainable, and Interoperable JSON
      </p>

      <div className="prose prose-lg max-w-none mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Introduction: Why Formatting Matters</h2>
          <p>
            JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. Its simplicity
            and human-readability are key to its popularity. However, poorly formatted JSON can quickly become difficult
            to read, debug, and maintain, especially as data structures grow more complex. Adhering to consistent
            formatting best practices ensures that your JSON is easy to work with for both humans and machines.
          </p>
          <p>
            While JSON parsers are generally flexible with whitespace, consistent formatting provides significant
            benefits in:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> <strong>Readability:</strong> Easier for
              developers to understand the structure and data.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> <strong>Maintainability:</strong>{" "}
              Simplifies debugging and modifying JSON data.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> <strong>Version Control:</strong> Makes it
              easier to see differences (diffs) in JSON files when tracked in systems like Git.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> <strong>Interoperability:</strong> Though
              parsers are lenient, some tools or manual inspections might rely on predictable formatting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Core Principles: Indentation and Spacing</h2>
          <p>
            The most fundamental aspect of JSON formatting is indentation and spacing. While not required by the JSON
            specification itself, consistent use of whitespace vastly improves readability.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Indentation</h3>
          <p>
            Use consistent indentation to represent nested structures. The most common indentation levels are 2 or 4
            spaces. Avoid using tabs as their visual representation varies across different editors and environments.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Good (2 Spaces):</h4>
            <pre>
              <code className="language-json">
                {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "courses": [
    "Math",
    "Science",
    "History"
  ]
}`}
              </code>
            </pre>
            <h4 className="text-lg font-medium mb-2 mt-4">Bad (No Indentation):</h4>
            <pre>
              <code className="language-json">
                {`{"name":"Alice","age":30,"isStudent":false,"address":{"street":"123 Main St","city":"Anytown"},"courses":["Math","Science","History"]}`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Spacing</h3>
          <p>Use spacing around colons (`:`) and commas (`,`) to separate keys, values, and elements clearly.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Place a space after the colon separating a key and its value (`"key": value`).</li>
            <li>
              Place a space after the comma separating key-value pairs in an object or elements in an array (`value1,
              value2`).
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Good Spacing:</h4>
            <pre>
              <code className="language-json">
                {`{
  "key1": "value1",
  "key2": {
    "nestedKey": 123
  },
  "array": [ "item1", "item2" ]
}`}
              </code>
            </pre>
            <h4 className="text-lg font-medium mb-2 mt-4">Bad Spacing:</h4>
            <pre>
              <code className="language-json">
                {`{
  "key1":"value1",
  "key2":{"nestedKey":123},
  "array":["item1","item2"]
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Key Naming Conventions</h2>
          <p>
            While JSON keys are always strings, consistent naming helps developers predict and understand the data
            structure. Common conventions include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" /> <strong>camelCase:</strong> Starts with a
              lowercase letter, subsequent words start with uppercase (e.g., `firstName`, `totalAmountDue`). This is
              common in JavaScript/frontend contexts.
            </li>
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" /> <strong>snake_case:</strong> All lowercase
              letters, words separated by underscores (e.g., `first_name`, `total_amount_due`). Common in Python and
              database contexts.
            </li>
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" /> <strong>PascalCase:</strong> Starts with an
              uppercase letter, subsequent words start with uppercase (e.g., `FirstName`, `TotalAmountDue`). Sometimes
              used for types or classes, less common for general JSON keys.
            </li>
          </ul>
          <p>
            Choose one convention and stick to it across your entire project or API. Avoid using hyphens (`-`) in keys
            as they can cause issues when trying to access properties directly in JavaScript using dot notation (e.g.,
            `object.first-name` is invalid).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example (camelCase):</h4>
            <pre>
              <code className="language-json">
                {`{
  "userId": "12345",
  "productDetails": {
    "productName": "Laptop",
    "priceUsd": 1200.50
  }
}`}
              </code>
            </pre>
            <h4 className="text-lg font-medium mb-2 mt-4">Example (snake_case):</h4>
            <pre>
              <code className="language-json">
                {`{
  "user_id": "12345",
  "product_details": {
    "product_name": "Laptop",
    "price_usd": 1200.50
  }
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Data Types and Their Usage</h2>
          <p>
            JSON supports six basic data types: strings, numbers, booleans, arrays, objects, and <code>null</code>.
            Using the correct type is crucial for data integrity and ease of parsing.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Strings:</strong> Must be enclosed in
              double quotes. Includes characters, dates (often represented as strings), and any text data.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Numbers:</strong> Integers or
              floating-point numbers. Do not use quotes around them.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Booleans:</strong> <code>true</code>{" "}
              or <code>false</code> (lowercase). Do not use quotes.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Arrays:</strong> Ordered collections
              of values, enclosed in square brackets <code>[ ]</code>. Values can be of any JSON type.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Objects:</strong> Unordered
              collections of key-value pairs, enclosed in curly braces <code>&#x7b; &#x7d;</code>. Keys must be strings;
              values can be of any JSON type.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" /> <strong>Null:</strong> Represents an empty or
              non-existent value. Always <code>null</code> (lowercase). Do not use quotes.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Common Pitfalls:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" /> Putting quotes around numbers or
              booleans (e.g., `"123"`, `"true"`). This makes them strings, which might require extra parsing on the
              receiving end.
            </li>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <h4 className="text-lg font-medium mb-2">Incorrect:</h4>
              <pre>
                <code className="language-json">{`{ "count": "123", "isActive": "false" }`}</code>
              </pre>
              <h4 className="text-lg font-medium mb-2 mt-4">Correct:</h4>
              <pre>
                <code className="language-json">{`{ "count": 123, "isActive": false }`}</code>
              </pre>
            </div>
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" /> Using single quotes for strings or
              keys. JSON requires double quotes.
            </li>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <h4 className="text-lg font-medium mb-2">Incorrect:</h4>
              <pre>
                <code className="language-json">{`{ 'name': 'Bob' }`}</code>
              </pre>
              <h4 className="text-lg font-medium mb-2 mt-4">Correct:</h4>
              <pre>
                <code className="language-json">{`{ "name": "Bob" }`}</code>
              </pre>
            </div>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Handling Nulls and Empty Values</h2>
          <p>How you represent missing or empty data can impact how easy the JSON is to consume.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>
                Use <code>null</code> for intentionally missing values:
              </strong>{" "}
              If a key exists but has no value, <code>null</code> is the appropriate representation.
            </li>
            <li>
              <strong>Omit keys for truly optional fields:</strong> If a field is entirely optional and no value exists,
              consider omitting the key altogether rather than including it with a <code>null</code> value, unless the
              schema specifically requires the key to be present.
            </li>
            <li>
              <strong>Use empty strings, arrays, or objects for empty collections:</strong> If a value represents a list
              or structure that is currently empty, use <code>[]</code> or <code>&#x7b;&#x7d;</code> instead of{" "}
              <code>null</code>.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example:</h4>
            <pre>
              <code className="language-json">
                {`{
  "name": "Charlie",
  "email": null,        // email exists but is not provided
  "phone": "123-456-7890",
  // "address" key is omitted if address is optional and not present

  "tags": [],           // list of tags is empty
  "preferences": {}     // preferences object is empty
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            <AlertCircle className="inline-block mr-2 h-4 w-4 text-yellow-500" /> Consistency is key here. Define and
            document your strategy for nulls and empty values.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Date and Time Formats</h2>
          <p>
            JSON does not have a built-in date or time type. Dates and times are typically represented as strings. The
            most widely accepted and recommended format is ISO 8601.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>ISO 8601:</strong> This format is unambiguous and includes timezone information (e.g.,{" "}
              <code>"2023-10-27T10:00:00Z"</code> for UTC or <code>"2023-10-27T10:00:00+01:00"</code> for a specific
              timezone).
            </li>
            <li>
              Avoid custom string formats (e.g., "MM/DD/YYYY") or timestamps (seconds/milliseconds since epoch) unless
              there's a strong reason and it's clearly documented, as they can lead to ambiguity or overflow issues.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example (ISO 8601):</h4>
            <pre>
              <code className="language-json">
                {`{
  "event_name": "Conference",
  "start_time": "2024-01-15T09:00:00Z",
  "end_time": "2024-01-17T17:00:00-05:00"
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order of Keys</h2>
          <p>
            The JSON specification states that object keys are unordered. While most parsers maintain insertion order or
            sort keys alphabetically for convenience, you should <strong>never rely</strong> on the order of keys in a
            JSON object.
          </p>
          <p>
            For human readability and predictable diffs in version control, however, consistently sorting keys (often
            alphabetically) can be helpful. Tools like linters and formatters can automate this.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Comments</h2>
          <p>
            <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" /> Standard JSON{" "}
            <strong>does not support comments</strong>. Including comments will result in a parsing error.
          </p>
          <p>If you need to add descriptive information about your JSON structure, consider these alternatives:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>External Documentation:</strong> Use accompanying documentation (like OpenAPI/Swagger specs) to
              describe the JSON structure, field meanings, types, and constraints.
            </li>
            <li>
              <strong>JSON Schema:</strong> Define a formal schema for your JSON (see next section).
            </li>
            <li>
              <strong>Wrapper Objects:</strong> If you need to add metadata to the JSON itself, wrap the data inside an
              object that includes separate keys for data and metadata.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Alternative (Wrapper Object):</h4>
            <pre>
              <code className="language-json">
                {`{
  "metadata": {
    "description": "List of users",
    "count": 3
  },
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" }
  ]
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Schema Validation</h2>
          <p>
            For APIs and complex data structures, defining and validating your JSON against a schema is a critical best
            practice. JSON Schema is a popular specification for this purpose.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> Clearly defines the structure, data types,
              required fields, and constraints.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> Allows for automated validation on both the
              sending and receiving ends.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" /> Serves as excellent documentation for the
              data format.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Simple JSON Schema Example:</h4>
            <pre>
              <code className="language-json">
                {`{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 },
    "isStudent": { "type": "boolean" }
  },
  "required": [ "name", "age" ],
  "additionalProperties": false
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            Tools are available in most programming languages to validate JSON against a JSON Schema.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Security Considerations: JSON Hijacking</h2>
          <p>
            <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" /> A historical vulnerability involved
            returning a JSON array or object literal directly as a top-level response to a GET request. Malicious pages
            on other origins could potentially hijack this data.
          </p>
          <p>
            If the sensitive data was returned as a simple JSON array (e.g.,{" "}
            <code>[&#x7b;...&#x7d;, &#x7b;...&#x7d;]</code>), this response was also a valid JavaScript array literal.
            In some scenarios (especially pre-ES5 browsers or specific execution contexts like overriding Array
            constructors), the malicious page could potentially read the values of this array. Similarly, if it was a
            simple object literal (<code>&#x7b;...&#x7d;</code>), it could potentially be assigned to a variable if the
            response was wrapped in parentheses.
          </p>
          <p>
            <strong>Best Practice Mitigation:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Always return JSON data inside a top-level object (<code>&#x7b; "data": [...] &#x7d;</code>). This is not
              a valid JavaScript literal for direct execution.
            </li>
            <li>
              Set the correct <code>Content-Type</code> header (<code>application/json</code>).
            </li>
            <li>Use CSRF tokens and strictly enforce request methods (e.g., require POST for sensitive operations).</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Safe Response Structure:</h4>
            <pre>
              <code className="language-json">
                {`{
  "status": "success",
  "data": [
    { "item": "A", "value": 10 },
    { "item": "B", "value": 20 }
  ]
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            Returning a top-level array like <code>[&#x7b; ... &#x7d;, &#x7b; ... &#x7d;]</code> is generally
            discouraged for GET requests returning sensitive data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Automated Formatting and Linting</h2>
          <p>Manually enforcing all these rules can be tedious. Leverage tools to automate the process:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Formatters:</strong> Tools like Prettier or integrated IDE formatters (VS Code, WebStorm, etc.)
              can automatically format JSON files on save or commit according to configurable rules (indentation,
              spacing, key sorting).
            </li>
            <li>
              <strong>Linters:</strong> Linters can check for potential issues beyond just formatting, although for pure
              JSON, formatters are often sufficient.
            </li>
            <li>
              <strong>Online Validators/Formatters:</strong> Websites are available to paste and validate/format JSON
              snippets for quick checks.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Conclusion</h2>
          <p>
            Consistent JSON formatting is a simple yet powerful practice that significantly improves the developer
            experience and reduces errors. By applying clear rules for indentation, spacing, key naming, data types, and
            handling nulls/empty values, you create JSON that is easy to read, write, and parse. Combined with schema
            validation and awareness of security considerations, you build more robust and maintainable systems that
            rely on JSON data exchange. Adopt automated tools to enforce these practices and make them a standard part
            of your development workflow.
          </p>
        </section>
      </div>
    </div>
  );
}
