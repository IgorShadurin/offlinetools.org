import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about string delimiter issues in JSON
 */
export const metadata: Metadata = {
  title: "String Delimiter Issues in JSON: Single vs. Double Quotes | Offline Tools",
  description:
    "Learn why JSON only supports double quotes as string delimiters, common errors when using single quotes, and how to fix them.",
};

/**
 * Article page component for string delimiter issues in JSON
 */
export default function StringDelimiterIssuesInJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">String Delimiter Issues in JSON: Single vs. Double Quotes</h1>

      <div className="space-y-6">
        <p>
          One of the most common errors when working with JSON is using the wrong type of quotes for strings. Unlike
          many programming languages that accept either single or double quotes, JSON has a strict requirement: strings
          must be enclosed in double quotes only. This article explains why this restriction exists, how it causes
          problems, and how to avoid or fix these issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The JSON Specification and Quotes</h2>
        <p>
          According to the official JSON specification, strings in JSON must be enclosed in double quotes. This is a
          non-negotiable rule that affects both keys and values:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Valid JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "John Doe",
  "age": 30,
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Errors with String Delimiters</h2>

        <h3 className="text-xl font-semibold mt-6">1. Using Single Quotes for Keys or Values</h3>
        <p>
          Developers familiar with JavaScript, Python, or other languages often mistakenly use single quotes in JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON with single quotes:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  'name': 'John Doe',
  'age': 30
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">This will trigger a JSON parse error: Expected property name or {"}"}</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Mixing Quote Types</h3>
        <p>Another common mistake is mixing quote types within the same JSON document.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON with mixed quotes:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": 'John Doe',
  'age': 30
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This will result in a syntax error since all strings must use double quotes consistently.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Only Double Quotes?</h2>
        <p>The JSON specification chose double quotes for several reasons:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Simplicity: Having one way to represent strings eliminates ambiguity</li>
            <li>Compatibility: Double quotes are recognized across virtually all programming languages</li>
            <li>
              Historical reasons: JSON was derived from JavaScript object notation, which supports double quotes for
              strings
            </li>
            <li>Readability: Double quotes provide clear visual boundaries for string content</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Fix Quote Delimiter Issues</h2>

        <h3 className="text-xl font-semibold mt-6">1. Manual Replacement</h3>
        <p>
          The simplest approach is to replace all single quotes with double quotes. Most text editors support
          find-and-replace operations with regular expressions:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Find: <code>&apos;([^&apos;]*)&apos;</code>
            </li>
            <li>
              Replace with: <code>&quot;$1&quot;</code>
            </li>
          </ul>
          <p className="mt-2 text-sm">
            This regular expression finds text between single quotes and replaces the single quotes with double quotes.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Using JSON Formatter Tools</h3>
        <p>
          JSON formatter tools like the one provided by Offline Tools can automatically detect and repair quote
          delimiter issues. Simply paste your JSON with incorrect quotes, and the tool will attempt to fix the
          formatting.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Escaping Quotes in Strings</h3>
        <p>
          When you need to include double quotes inside a string in valid JSON, they must be escaped with a backslash:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Correct escaping of quotes:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "message": "He said, \\"Hello world!\\"",
  "code": "console.log(\\"testing\\");"
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Language-Specific Considerations</h2>

        <h3 className="text-xl font-semibold mt-6">JavaScript</h3>
        <p>JavaScript allows single quotes for strings in code, but not when parsing JSON:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// This works in JavaScript
const obj = {
  'name': 'John'
};

// But this fails
const jsonString = '{"name": "John"}'; // Valid JSON string
const jsonString2 = "{'name': 'John'}"; // Invalid JSON string

// This will work
JSON.parse(jsonString); 

// This will throw an error
JSON.parse(jsonString2);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Python</h3>
        <p>
          Python developers need to be especially careful, as Python&apos;s dictionaries commonly use single quotes:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Python dictionary with single quotes
python_dict = {
    'name': 'John',
    'age': 30
}

# Converting to valid JSON requires double quotes
import json
json_string = json.dumps(python_dict)  # Results in {"name": "John", "age": 30}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            When programmatically generating JSON, use your language&apos;s built-in JSON serialization functions rather
            than constructing JSON strings manually. This helps avoid quote delimiter issues and other syntax errors.
          </p>
        </div>
      </div>
    </>
  );
}
