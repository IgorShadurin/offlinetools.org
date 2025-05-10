import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Quoting Styles and Formatting Preferences | Offline Tools",
  description:
    "Explore the strict quoting rules of standard JSON (always double quotes) and common formatting preferences like indentation. Learn about JSON5 and how consistent formatting improves readability and maintainability.",
};

export default function JsonQuotingFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        JSON Quoting Styles and Formatting Preferences
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange
          format that is easy for humans to read and write and easy for machines
          to parse and generate. While its structure is simple, adhering to its
          strict syntax rules, particularly regarding quoting, and maintaining
          consistent formatting are crucial for valid and readable JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Strict Rule: Double Quotes Only</h2>
        <p>
          One of the most common sources of JSON errors is the incorrect use of
          quotes. Standard JSON specifies that both object keys (property names)
          and string values *must* be enclosed in double quotes (`"`).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Correct (Standard JSON) Quoting:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"]
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Keys ("name", "age", "isStudent", "courses") and string values
            ("Alice", "Math", "Science") are enclosed in double quotes.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Single Quotes Are Invalid in Standard JSON</h2>
        <p>
          Unlike many programming languages (including JavaScript itself),
          standard JSON does not allow single quotes (`'`) for keys or string
          values. Using single quotes will cause a JSON parser to fail.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            Incorrect (Invalid Standard JSON) Quoting:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  'name': 'Bob', // Invalid: single quotes used for key and value
  "city": "London"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            The single quotes around <code>'name'</code> and <code>'Bob'</code>{" "}
            make this invalid JSON according to the specification.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON5: A More Permissive Alternative</h2>
        <p>
          Sometimes, when dealing with configuration files or data that is
          primarily hand-edited, developers might encounter JSON5. JSON5 is a
          superset of JSON that aims to be easier for humans to write and
          maintain. It allows:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Comments (single-line and multi-line)</li>
          <li>Trailing commas in objects and arrays</li>
          <li>Unquoted object keys (if they are valid identifiers)</li>
          <li>
            Single quotes for strings
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">
            Valid JSON5 Example:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  // Configuration settings
  name: 'Charlie', // Unquoted key, single quoted value
  age: 25,
  items: [
    "apple",
    'banana', // Single quoted string in array
    // Comment inside array
  ], // Trailing comma
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
            This is valid JSON5 but invalid standard JSON. Always check if the
            parser you are using supports JSON5 or only standard JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Formatting Preferences: Readability and Consistency</h2>
        <p>
          Beyond the strict syntax, how JSON is formatted significantly impacts
          its readability. Common formatting preferences include:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">1. Indentation</h3>
          <p className="text-sm mt-2">
            Using indentation (spaces or tabs) to show the hierarchical structure
            of the data. Common practices are 2 or 4 spaces per level, or a single
            tab.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`// 2 Spaces
{
  "user": {
    "id": 1,
    "name": "Dave"
  }
}`}
            </pre>
          </div>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`// 4 Spaces
{
    "user": {
        "id": 1,
        "name": "Dave"
    }
}`}
            </pre>
          </div>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`// Tabs
{
\t"user": {
\t\t"id": 1,
\t\t"name": "Dave"
\t}
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">2. Whitespace Around Colons and Commas</h3>
          <p className="text-sm mt-2">
            Adding spaces after colons (`:`) and commas (`,`) is standard
            practice for better readability.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`// Good whitespace
{
  "key1": "value1",
  "key2": 123
}`}
            </pre>
          </div>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`// Poor whitespace (valid but hard to read)
{"key1":"value1","key2":123}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">3. Order of Keys (Less Common)</h3>
          <p className="text-sm mt-2">
            While JSON object key order is not guaranteed by the specification
            (parsers may or may not preserve it), some teams prefer to alphabetize
            keys in their source JSON files for consistency when reading and
            comparing different versions.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Consistent Formatting Matters</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Readability:</span> Well-formatted JSON
            is much easier for humans to read and understand, reducing the chance
            of manual errors.
          </li>
          <li>
            <span className="font-medium">Maintainability:</span> Consistent
            style makes it easier for multiple people to work on the same JSON
            files.
          </li>
          <li>
            <span className="font-medium">Version Control:</span> Standardized
            formatting minimizes unnecessary changes in version control systems
            (like Git), making diffs clearer and focusing on actual data changes,
            not just formatting shifts.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Tools for Formatting JSON</h2>
        <p>
          Fortunately, you don&apos;t have to manually format JSON. Many tools
          and editors offer automatic formatting:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Code Editors:</span> VS Code, Sublime
              Text, Atom, and most modern editors have built-in or plugin-based
              JSON formatters.
            </li>
            <li>
              <span className="font-medium">Online JSON Formatters:</span> Many
              web-based tools allow you to paste JSON and get a formatted output.
              Look for offline-capable options if you work with sensitive data.
            </li>
            <li>
              <span className="font-medium">Command-Line Tools:</span> Tools like
              `jq` (for processing JSON) or even Python&apos;s `json.tool` can
              be used to validate and format JSON from the command line.
            </li>
            <li>
              <span className="font-medium">Prettier/ESLint:</span> Code formatters
              and linters used in software development projects often include JSON
              formatting capabilities.
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Pro Tip:</h3>
          <p className="mt-2">
            When collaborating, agree on a standard JSON formatting style
            (e.g., 2 spaces for indentation) and use automated tools to apply
            it consistently across your project. This avoids disputes and messy
            version control histories.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While JSON&apos;s syntax is minimal, understanding and applying its
          strict rules, especially the requirement for double quotes, is
          fundamental. Beyond syntax, consistent formatting through indentation
          and whitespace significantly enhances readability and ease of
          maintenance.
        </p>
        <p>
          Leverage available tools to automate formatting and validation. Whether
          you stick to standard JSON or use a more permissive format like JSON5
          where appropriate, prioritizing valid syntax and consistent style will
          make working with JSON much smoother.
        </p>
      </div>
    </>
  );
}