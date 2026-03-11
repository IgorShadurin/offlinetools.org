import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Common JSON Syntax Errors and How to Fix Them | Offline Tools",
  description:
    "Fix common JSON syntax errors fast, including commas, quotes, escapes, comments, trailing commas, and VS Code JSON versus JSONC issues.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Common JSON Syntax Errors and How to Fix Them</h1>

      <div className="space-y-6">
        <p>
          Most invalid JSON comes down to a short list of problems: missing commas, unmatched braces, wrong quotes,
          broken escape sequences, or JavaScript-style extras such as comments and trailing commas. If your parser says
          the file is invalid, the fastest path is to validate the structure first, then check whether you are working
          with strict JSON or a more forgiving format like JSON with Comments.
        </p>

        <p>
          This guide focuses on the errors people hit most often when pasting API payloads, config files, and copied
          snippets into a formatter, editor, or build pipeline. It also includes practical tips for troubleshooting JSON
          in VS Code and for displaying highlighted JSON on a web page without confusing presentation with valid data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start Here: Find the Error Faster</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste the content into a validator or formatter so the parser can point to the first broken token.</li>
          <li>Check one line above the reported line, because a missing comma or quote often breaks the next line.</li>
          <li>Make sure the file is really strict JSON and not JSONC, JavaScript, or a template fragment.</li>
          <li>After each fix, validate again immediately instead of changing multiple things at once.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">1. Missing or Extra Commas</h2>
        <p>
          Every object member and array element is separated by a comma, but the final item does not get one. A missing
          comma usually produces an error on the following line, which is why it can feel like the parser is pointing to
          the wrong place.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "John",
  "age": 30, 
  "city": "New York" 
  "country": "USA"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "John",
  "age": 30, 
  "city": "New York", 
  "country": "USA"
}`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "fruits": [
    "apple",
    "banana",
    "orange",
  ]
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "fruits": [
    "apple",
    "banana",
    "orange"
  ]
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Comments and Trailing Commas Copied from JSONC</h2>
        <p>
          A very common source of confusion is copying content from tools that allow comments or trailing commas. Those
          files may look like JSON, but strict parsers reject them. This happens often with editor settings and config
          files that use JSON with Comments.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  // Local development override
  "host": "localhost",
  "port": 3000,
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "host": "localhost",
  "port": 3000
}`}
          </pre>
        </div>

        <p>
          If VS Code seems happy with comments or trailing commas, check the language mode in the status bar. You may
          be editing the file as <code>JSON with Comments</code> instead of strict <code>JSON</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">3. Unclosed Brackets and Braces</h2>
        <p>
          Every opening bracket or brace must have a matching closing character. One missing <code>]</code> or{" "}
          <code>{"}"}</code> can make the rest of the document look invalid.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "hiking"
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "hiking"]
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Strings and Property Names Must Use Double Quotes</h2>
        <p>
          JSON is stricter than JavaScript object literals. Property names must be quoted, and both keys and string
          values must use double quotes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  name: 'Bob',
  "email": 'bob@example.com'
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Bob",
  "email": "bob@example.com"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Invalid Escape Sequences and Broken Strings</h2>
        <p>
          JSON strings cannot contain unescaped double quotes, raw backslashes in Windows paths, or literal line breaks.
          If a string contains special characters, escape them explicitly.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "message": "He said "Hello" to me",
  "path": "C:\\Users\\Documents"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "message": "He said \\"Hello\\" to me",
  "path": "C:\\\\Users\\\\Documents"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Invalid Numbers and Non-JSON Values</h2>
        <p>
          JSON supports numbers, booleans, and <code>null</code>, but the grammar is narrower than JavaScript. Leading
          plus signs, leading zeros, trailing decimal points, and values like <code>undefined</code>,{" "}
          <code>NaN</code>, and <code>Infinity</code> are not valid JSON.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No leading + sign</li>
          <li>No leading zeros (except for decimal numbers less than 1)</li>
          <li>No trailing decimal point</li>
          <li>
            Use lowercase <code>true</code>, <code>false</code>, and <code>null</code>
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "price": +42.00,
  "quantity": 007,
  "discount": 10.,
  "active": True,
  "fallback": undefined
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "price": 42.00,
  "quantity": 7,
  "discount": 10.0,
  "active": true,
  "fallback": null
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Duplicate Keys Are Not a Syntax Error, but Still a Bug</h2>
        <p>
          Some parsers accept duplicate object keys, but the result is unreliable because different systems may keep the
          last value, the first value, or reject the object entirely. Even if the file parses, duplicated keys are a
          data quality problem worth fixing immediately.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "timeout": 15,
  "timeout": 30,
  "baseUrl": "https://api.example.com"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "timeout": 30,
  "baseUrl": "https://api.example.com"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting JSON Syntax in VS Code</h2>
        <p>
          VS Code has strong built-in JSON support, but a few editor details matter when you are chasing syntax errors.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Check the language mode in the status bar. Use <code>JSON</code> for strict data and{" "}
            <code>JSON with Comments</code> only for files that intentionally allow comments and trailing commas.
          </li>
          <li>
            Run <code>Format Document</code>. Broken indentation often makes the missing bracket, quote, or comma easy
            to spot.
          </li>
          <li>
            Open the Problems panel and hover the red squiggles. VS Code reports both structural issues and schema-based
            validation problems.
          </li>
          <li>
            If a custom file extension is not being checked as JSON, map it with <code>files.associations</code>.
          </li>
          <li>
            If you expect validation but see nothing, confirm that <code>json.validate.enable</code> is turned on.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Can CSS Syntax-Highlight Raw JSON by Itself?</h2>
        <p>
          Not really. CSS can color already-marked-up tokens, but it does not parse raw JSON text into keys, strings,
          numbers, and punctuation on its own. If you want syntax-highlighted JSON on a web page, you usually need one
          of these approaches:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Render the JSON through a syntax highlighter that wraps tokens in HTML elements with classes.</li>
          <li>Show plain JSON in a code block and let the user rely on their editor, browser extension, or devtools.</li>
          <li>Store the raw JSON as data, then generate separate presentation markup so users can still copy valid JSON.</li>
        </ul>

        <p>
          If your goal is readability instead of decorative coloring, formatting the indentation and validating the JSON
          first usually delivers more value than adding CSS alone.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON Fix Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Every object key is wrapped in double quotes.</li>
          <li>Every item except the last has a comma after it.</li>
          <li>All opening braces and brackets have matching closing characters.</li>
          <li>Strings escape quotes, backslashes, and control characters correctly.</li>
          <li>No comments, trailing commas, <code>undefined</code>, <code>NaN</code>, or <code>Infinity</code>.</li>
          <li>Boolean and null literals are lowercase: <code>true</code>, <code>false</code>, and <code>null</code>.</li>
          <li>Object keys are unique before you ship or save the payload.</li>
        </ol>

        <p>
          When in doubt, paste the payload into our JSON formatter, fix the first reported issue, and re-run validation
          after each change. Small, sequential fixes are much faster than trying to repair a broken document by eye.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why These Rules Matter</h2>
        <p>
          JSON parsers follow a strict grammar so data can move predictably between tools, languages, and APIs. That is
          why small-looking differences, such as single quotes, comments, or duplicate keys, can break imports, cause
          rejected API requests, or create subtle bugs across different environments.
        </p>

        <p>
          If you are bouncing between browser payloads, config files, and editor settings, assume nothing. Validate the
          content as strict JSON first, then decide whether the file actually belongs in JSONC or another format.
        </p>
      </div>
    </>
  );
}
