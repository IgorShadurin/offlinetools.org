import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about reserved words as keys in JSON
 */
export const metadata: Metadata = {
  title: "Reserved Words as Keys in JSON: Why They Cause Problems | Offline Tools",
  description:
    "Learn why using reserved words as keys in JSON can cause problems during parsing and how to avoid these issues in your applications.",
};

/**
 * Article page component for reserved words as keys in JSON
 */
export default function ReservedWordsAsKeysInJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Reserved Words as Keys in JSON: Why They Cause Problems</h1>

      <div className="space-y-6">
        <p>
          While JSON itself is relatively forgiving about what names you can use for keys, the programming languages and
          environments that process JSON often have limitations. Using reserved words as keys in JSON can lead to
          unexpected errors and complications when this data is parsed and used in different programming languages. This
          article explains what reserved words are, why they cause problems, and how to avoid these issues in your JSON
          data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Are Reserved Words?</h2>
        <p>
          Reserved words (also called keywords) are identifiers that have special meaning in a programming language.
          They cannot be used as variable names, function names, or in other contexts where identifiers are expected,
          because they are part of the language&apos;s syntax.
        </p>

        <p>
          For example, words like <code>if</code>, <code>else</code>, <code>for</code>, <code>function</code>,
          <code>return</code>, <code>class</code>, and <code>this</code> are reserved in many programming languages.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON and Reserved Words</h2>

        <p>
          According to the JSON specification (RFC 8259), there are no restrictions on what strings can be used as
          object keys. Technically, this means that in pure JSON, you can use any string as a key, including reserved
          words from programming languages:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            Valid JSON with potentially problematic keys:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "class": "admin",
  "if": true,
  "function": "calculateTotal",
  "return": 42,
  "this": "refers to the current object"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This JSON is perfectly valid according to the specification, but it may cause problems when used in specific
            programming environments.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Reserved Words Cause Problems</h2>

        <p>The complications arise not in the JSON format itself but when the JSON data is:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Parsed into native objects</strong>: When JSON is converted to objects in programming languages
            </li>
            <li>
              <strong>Accessed using dot notation</strong>: Languages that use dot notation to access object properties
              can have conflicts
            </li>
            <li>
              <strong>Used in generated code</strong>: Auto-generated code might fail to compile if it includes reserved
              words
            </li>
            <li>
              <strong>Processed by certain frameworks</strong>: Some frameworks and libraries apply additional
              restrictions
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">1. Problems with Dot Notation</h3>
        <p>One of the most common issues occurs when using dot notation to access properties:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">JavaScript example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Parse valid JSON with reserved words as keys
const data = JSON.parse('{"class": "admin", "if": true, "function": "calculateTotal"}');

// This will cause a syntax error!
console.log(data.class);     // Error: unexpected token: class
console.log(data.if);        // Error: unexpected token: if
console.log(data.function);  // Error: unexpected token: function`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Framework and Library Restrictions</h3>
        <p>Many frameworks and libraries that work with JSON impose additional restrictions:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>GraphQL</strong>: Field names cannot start with double underscores (__) as these are reserved for
              internal use
            </li>
            <li>
              <strong>MongoDB</strong>: Field names cannot contain dollar signs ($) or dots (.)
            </li>
            <li>
              <strong>Database ORMs</strong>: Many ORMs have restrictions on field names that map to database columns
            </li>
            <li>
              <strong>Template engines</strong>: Various template engines may have reserved words for their own syntax
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Language-Specific Issues</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="mb-4">
            <h4 className="font-medium">JavaScript:</h4>
            <ul className="list-disc ml-6">
              <li>
                Cannot use dot notation with reserved words like <code>class</code>, <code>for</code>, <code>if</code>
              </li>
              <li>
                Must use bracket notation: <code>data[&quot;class&quot;]</code> instead of <code>data.class</code>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium">Python:</h4>
            <ul className="list-disc ml-6">
              <li>
                Reserved words like <code>class</code>, <code>if</code>, <code>else</code> as keys require dictionary
                access (<code>data[&quot;class&quot;]</code>)
              </li>
              <li>
                When creating objects with these keys, attribute access (<code>data.class</code>) won&apos;t work
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium">Java:</h4>
            <ul className="list-disc ml-6">
              <li>When deserializing JSON to Java objects, reserved words can&apos;t be used as field names</li>
              <li>Requires special annotations or naming strategies to handle such fields</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">TypeScript:</h4>
            <ul className="list-disc ml-6">
              <li>When defining interfaces for JSON objects, reserved words require special syntax</li>
              <li>
                Must use string literals in interface definitions: <code>{'{ "class": string }'}</code>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices to Avoid Problems</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Avoid using reserved words as keys</strong>: The simplest solution is to not use reserved words
              from major programming languages
            </li>
            <li>
              <strong>Use alternative naming conventions</strong>: Instead of <code>&quot;class&quot;</code>, use{" "}
              <code>&quot;className&quot;</code> or <code>&quot;classType&quot;</code>
            </li>
            <li>
              <strong>Follow camelCase or snake_case consistently</strong>: This helps avoid many reserved words
            </li>
            <li>
              <strong>Use prefixes</strong>: Add descriptive prefixes like <code>&quot;user_class&quot;</code> instead
              of just <code>&quot;class&quot;</code>
            </li>
            <li>
              <strong>Know your target languages</strong>: Be aware of reserved words in the languages that will process
              your JSON
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Reserved Words to Avoid</h2>

        <p>
          Here&apos;s a list of common reserved words across multiple programming languages that are best avoided as
          JSON keys:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 grid grid-cols-3 gap-4">
          <div>
            <ul className="list-disc ml-6">
              <li>
                <code>abstract</code>
              </li>
              <li>
                <code>await</code>
              </li>
              <li>
                <code>break</code>
              </li>
              <li>
                <code>case</code>
              </li>
              <li>
                <code>catch</code>
              </li>
              <li>
                <code>class</code>
              </li>
              <li>
                <code>const</code>
              </li>
              <li>
                <code>continue</code>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-disc ml-6">
              <li>
                <code>debugger</code>
              </li>
              <li>
                <code>default</code>
              </li>
              <li>
                <code>delete</code>
              </li>
              <li>
                <code>do</code>
              </li>
              <li>
                <code>else</code>
              </li>
              <li>
                <code>enum</code>
              </li>
              <li>
                <code>export</code>
              </li>
              <li>
                <code>extends</code>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-disc ml-6">
              <li>
                <code>false</code>
              </li>
              <li>
                <code>finally</code>
              </li>
              <li>
                <code>for</code>
              </li>
              <li>
                <code>function</code>
              </li>
              <li>
                <code>if</code>
              </li>
              <li>
                <code>implements</code>
              </li>
              <li>
                <code>import</code>
              </li>
              <li>
                <code>in</code>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Working with Reserved Words When Necessary</h2>

        <p>
          Sometimes you might need to work with JSON that already contains reserved words as keys. Here are techniques
          to handle this:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Use Bracket Notation</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
const data = JSON.parse('{"class": "admin", "if": true}');

// Use bracket notation instead of dot notation
console.log(data["class"]); // Works: "admin"
console.log(data["if"]);    // Works: true`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Property Mapping</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Map problematic property names to safe names
function safeObject(jsonObject) {
  const mappings = {
    "class": "className",
    "if": "condition",
    "function": "functionName"
  };
  
  const result = {};
  for (const key in jsonObject) {
    const safeKey = mappings[key] || key;
    result[safeKey] = jsonObject[key];
  }
  
  return result;
}

// Usage
const safeData = safeObject(data);
console.log(safeData.className);  // "admin"
console.log(safeData.condition);  // true`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            While JSON itself allows any string as a key, it&apos;s best to design your JSON with the destination
            language and framework in mind. This preventative approach saves troubleshooting time and makes your JSON
            more universally usable across different programming environments.
          </p>
        </div>
      </div>
    </>
  );
}
