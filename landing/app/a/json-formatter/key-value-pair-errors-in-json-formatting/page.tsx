import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about fixing key-value pair errors
 */
export const metadata: Metadata = {
  title: "Key-Value Pair Errors in JSON Formatting: How to Fix Them | Offline Tools",
  description:
    "Fix JSON key-value pair errors fast. Learn how to correct unquoted keys, missing colons, missing commas, trailing commas, and duplicate keys.",
};

/**
 * Article page component for key-value pair errors in JSON formatting
 */
export default function KeyValuePairErrorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Key-Value Pair Errors in JSON Formatting</h1>

      <div className="space-y-6">
        <p>
          If a file such as <code>key-value.json</code> refuses to parse, the problem is usually not the whole
          document. It is usually one broken object member: a key without double quotes, a missing colon, a missing
          comma, or a trailing comma left behind during editing. Fixing that first broken pair normally makes the rest
          of the file readable again.
        </p>

        <p>
          JSON objects are strict. RFC 8259 defines an object as a set of name/value pairs, with the name written as a
          string, a colon between the name and value, and commas between members. That is why JavaScript-style shortcuts
          that feel familiar in config files often break valid JSON immediately.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300">Quick Fix Checklist</h2>
          <ul className="mt-2 list-disc ml-6 space-y-1 text-blue-700 dark:text-blue-200">
            <li>Every key must be inside double quotes.</li>
            <li>Every key must be followed by a colon.</li>
            <li>Every pair except the last one must end with a comma.</li>
            <li>The last pair must not have a trailing comma.</li>
            <li>Each key in the same object should appear only once.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a Valid Key-Value Pair Looks Like</h2>
        <p>
          A JSON object member always follows the same shape: <code>&quot;key&quot;: value</code>. The key is always a
          string. The value can be a string, number, object, array, boolean, or <code>null</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Valid JSON Object</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Ada Lovelace",
  "active": true,
  "projects": 3,
  "tags": ["math", "computing"],
  "profile": {
    "country": "UK"
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The Most Common Key-Value Pair Errors</h2>

        <h3 className="text-xl font-medium mt-6">1. Keys are not wrapped in double quotes</h3>
        <p>
          This is the most common mistake when someone pastes a JavaScript object into a JSON file. In JSON, keys are
          strings, so they must use double quotes. Unquoted keys and single-quoted keys are invalid.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Broken</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  user: "Mina",
  'role': "admin"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": "Mina",
  "role": "admin"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. The colon between key and value is missing</h3>
        <p>
          A key and its value are a pair only when a colon separates them. If the colon is missing, most parsers stop
          at that point and report an error near the key name.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Broken</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user" "Mina",
  "role" = "admin"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": "Mina",
  "role": "admin"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Commas between pairs are missing</h3>
        <p>
          Inside an object, commas separate one member from the next. If one comma is missing, the parser often points
          at the next key because that is where the structure becomes impossible to read.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Broken</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": 12
  "status": "ok"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": 12,
  "status": "ok"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. There is a trailing comma after the last pair</h3>
        <p>
          Trailing commas are allowed in many programming languages, but not in JSON. This is a common source of
          confusion when editing config snippets by hand.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Broken</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": 12,
  "status": "ok",
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": 12,
  "status": "ok"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5. The same key appears more than once</h3>
        <p>
          Duplicate keys are especially dangerous because some parsers do not reject them. RFC 8259 says object names
          should be unique, and if they are not, behavior becomes unpredictable. Many implementations keep only the
          last value, which can silently overwrite earlier data.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Risky</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "mode": "safe",
  "retries": 2,
  "mode": "fast"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "mode": "fast",
  "retries": 2
}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Distinction</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            JSON is not the same as a JavaScript object literal. Comments, single quotes, unquoted keys, trailing
            commas, <code>undefined</code>, <code>NaN</code>, and <code>Infinity</code> are common in JavaScript but are
            not valid JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Parser Errors Usually Mean</h2>
        <p>
          Exact wording varies by runtime, but current parser references such as MDN map most object-member failures to
          a small set of messages. If your formatter highlights one of these, inspect the pair immediately before the
          reported position.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">
              Expected property name or <code>{"}"}</code>
            </h3>
            <p className="mt-2 text-sm">
              Common cause: trailing comma, single-quoted key, or another character where the next key should begin.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Expected &quot;:&quot; after property name</h3>
            <p className="mt-2 text-sm">
              Common cause: the key is present, but the colon between the key and the value is missing or replaced.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">
              Expected <code>&quot;,&quot;</code> or <code>{"}"}</code> after property value
            </h3>
            <p className="mt-2 text-sm">
              Common cause: a missing comma after a finished pair, or extra text after a value.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A Fast Workflow to Fix a Broken JSON File</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Start with the first reported error, not the last one. One broken pair often triggers many later errors.</li>
          <li>Look one token to the left of the reported column and confirm the key is inside double quotes.</li>
          <li>Check that the key is followed immediately by a colon, not whitespace plus another token.</li>
          <li>After the value ends, check whether a comma is required or whether the object should close with <code>{"}"}</code>.</li>
          <li>Search the surrounding object for duplicate keys before you trust the parsed result.</li>
          <li>Once syntax is valid, run schema validation for missing required fields or wrong value types.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Worked Example</h2>
        <p>
          This kind of example is typical when someone manually edits a response body, a settings file, or a copied code
          snippet and then tries to format it as JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Broken JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "project": {
    name: "offline-tools",
    "owner" "Mina",
    "status": "active",
    "status": "draft",
    "tags": ["json", "debugging",],
    "private": false
  }
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fixed JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "project": {
    "name": "offline-tools",
    "owner": "Mina",
    "status": "active",
    "tags": ["json", "debugging"],
    "private": false
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Fixes applied: added quotes around <code>name</code>, inserted the missing colon after
            <code>&quot;owner&quot;</code>, removed the duplicate <code>&quot;status&quot;</code> key, and deleted the
            trailing comma in the array.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Avoid These Errors</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Generate JSON with a serializer such as <code>JSON.stringify()</code> instead of hand-writing large objects.</li>
          <li>Use a formatter that points to the exact line and column of the first syntax failure.</li>
          <li>Keep one property per line while debugging so missing commas and duplicate keys are easier to spot.</li>
          <li>Treat duplicate keys as a bug even if your parser accepts them.</li>
          <li>Validate syntax first, then validate structure and types with JSON Schema or application-level checks.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          Most key-value pair errors in JSON come from mixing JSON with JavaScript habits. If you verify quotes, colons,
          commas, and duplicate keys in that order, you can usually repair a broken JSON object in a minute or two.
        </p>

        <p>
          Use the formatter to catch the first failing pair, repair the syntax there, and re-run validation before you
          move on. That approach is faster than scanning the entire file and avoids chasing errors that disappear once
          the first broken member is fixed.
        </p>
      </div>
    </>
  );
}
