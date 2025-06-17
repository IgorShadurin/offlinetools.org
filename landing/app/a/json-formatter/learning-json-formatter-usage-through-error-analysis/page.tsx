import type { Metadata } from "next";
import { CircleAlert, CircleCheck, FileJson, Bug, Wrench, Info, Lightbulb } from "lucide-react"; // Import only allowed icons

export const metadata: Metadata = {
  title: "Learning JSON Formatter Usage Through Error Analysis | Offline Tools",
  description:
    "Learn how to debug and fix common JSON errors by understanding the output of JSON formatters and validators.",
};

export default function LearnJsonFormatterErrorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileJson className="w-8 h-8" /> Learning JSON Formatter Usage Through Error Analysis
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is everywhere. From API responses and configuration files to data storage
          and communication protocols, it's the de facto standard for structured data exchange. While its structure is
          simple and human-readable, even small syntax errors can cause parsing failures, leading to frustrating
          debugging sessions.
        </p>
        <p>
          This article explores how leveraging JSON formatters and validators, particularly by analyzing the errors they
          report, can significantly speed up the process of identifying and fixing issues in your JSON data. It's a
          powerful way to learn the nuances of correct JSON syntax.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" /> Why JSON Parsing Fails
        </h2>
        <p>
          JSON parsers are strict. Unlike some other data formats or programming languages that might tolerate minor
          inconsistencies, a JSON parser will typically halt and report an error upon encountering anything that doesn't
          strictly adhere to the JSON specification (
          <a
            href="https://www.json.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            json.org
          </a>
          ).
        </p>
        <p>Common culprits for parsing failures include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Incorrect punctuation (missing commas, colons).</li>
          <li>Using single quotes instead of double quotes for strings and keys.</li>
          <li>Trailing commas in arrays or objects.</li>
          <li>Unquoted object keys.</li>
          <li>
            Incorrect capitalization of literals (<code>true</code>, <code>false</code>, <code>null</code>).
          </li>
          <li>Syntax errors within strings (e.g., unescaped double quotes).</li>
          <li>Extra characters outside the main JSON structure.</li>
          <li>Comments (JSON strictly disallows comments).</li>
        </ul>
        <p>
          Manually sifting through a large, unformatted JSON string to find these errors can be time-consuming and
          error-prone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6" /> The JSON Formatter as a Debugging Tool
        </h2>
        <p>A JSON formatter serves two primary functions:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Pretty-Printing:</strong> It takes a compact or poorly indented JSON string and outputs a
            human-readable, indented version. This reveals the structure of the data, making it easier to visually
            inspect.
          </li>
          <li>
            <strong>Validation:</strong> Crucially, before formatting, a good formatter attempts to parse the JSON. If
            the parsing fails, it will typically report the location and nature of the syntax error.
          </li>
        </ol>
        <p>
          It's this validation step and the resulting error message that provides a powerful learning opportunity. Each
          error points to a specific violation of the JSON syntax rules. By understanding the error message and the
          location it indicates, you learn exactly which rule was broken.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug className="w-6 h-6" /> Learning Through Common Error Messages
        </h2>
        <p>Let's look at some common JSON errors and how a formatter might help you understand and fix them.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Unexpected token '&#x7d;' (or similar)
        </h3>
        <p>This often indicates a missing comma before an object property or array element, or a trailing comma.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Missing Comma):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "name": "Alice"
  "age": 30 // <-- Missing comma here
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Expected comma or closing brace at line 3, column 3. Found string "age".
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            The formatter tells you it expected a comma (<code>,</code>) or the closing brace (<code>&#x7d;</code>)
            after parsing the <code>"name"</code> property but found the start of the next property (<code>"age"</code>)
            instead.
            <br />
            <strong>Fix:</strong> Add a comma after the value of <code>"name"</code>.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "name": "Alice", // Added comma
  "age": 30
}`}
            </pre>
          </div>

          <h4 className="text-lg font-medium mt-6 mb-2">Invalid JSON (Trailing Comma):</h4>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre className="text-sm">
                {`{
  "item1": 1,
  "item2": 2, // <-- Trailing comma here
}`}
              </pre>
            </div>
            <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
            <p className="text-sm italic text-red-600 dark:text-red-400">
              Error: Unexpected token '&#x7d;' at line 4, column 1. Expected property key (string).
            </p>
            <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
            <p className="text-sm">
              After the last item's value and comma, the formatter expects another key-value pair but encounters the
              closing brace instead. JSON does not allow a comma after the last element in an array or the last property
              in an object.
              <br />
              <strong>Fix:</strong> Remove the comma after the last item/property.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
              <pre className="text-sm">
                {`{
  "item1": 1,
  "item2": 2 // Removed comma
}`}
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Expected string or '&#x7d;' (or similar related to
          keys)
        </h3>
        <p>
          This typically means you've used an unquoted key or used single quotes instead of double quotes for a key.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Unquoted Key):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  name: "Bob" // <-- Key not quoted
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Expected string token for object key at line 2, column 3. Found identifier "name".
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            JSON requires all object keys to be strings, enclosed in double quotes.
            <br />
            <strong>Fix:</strong> Enclose the key in double quotes.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "name": "Bob" // Added double quotes
}`}
            </pre>
          </div>

          <h4 className="text-lg font-medium mt-6 mb-2">Invalid JSON (Single-quoted Key):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  'city': "London" // <-- Single quotes used
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Expected string token for object key at line 2, column 3. Found single-quoted string.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            Similar to unquoted keys, single quotes are not valid string delimiters in JSON.
            <br />
            <strong>Fix:</strong> Replace single quotes with double quotes.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "city": "London" // Replaced single quotes with double quotes
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Expected string or primitive value (or similar related
          to values)
        </h3>
        <p>This could mean a value is missing, or an incorrect type is used, or a string value uses single quotes.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Single-quoted Value):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "status": 'active' // <-- Single quotes for value
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Expected value (string, number, boolean, null, object, or array) at line 2, column 12. Found
            single-quoted string.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            Just like keys, all string values in JSON must be enclosed in double quotes.
            <br />
            <strong>Fix:</strong> Replace single quotes with double quotes for the string value.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "status": "active" // Replaced single quotes with double quotes
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Expected ':' after property name (or similar)
        </h3>
        <p>This happens when the colon separator between a key and its value is missing or incorrect.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Missing Colon):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "count" 5 // <-- Missing colon
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Expected ':' after object key "count" at line 2, column 10. Found number 5.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            In JSON objects, keys and values must be separated by a colon (<code>:</code>).
            <br />
            <strong>Fix:</strong> Add a colon between the key and the value.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "count": 5 // Added colon
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Bad escaping in string (or similar)
        </h3>
        <p>
          JSON strings have specific rules for escaping special characters like double quotes, backslashes, and control
          characters.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Unescaped Double Quote):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "description": "This is a "quote"." // <-- Unescaped quote inside string
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Unexpected token 'q' at line 2, column 26. Bad string literal.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            A double quote character (<code>"</code>) inside a string value must be escaped with a backslash (
            <code>\</code>). Other characters requiring escaping include <code>\</code>, <code>/</code>, backspace (
            <code>\b</code>), form feed (<code>\f</code>), newline (<code>\n</code>), carriage return (<code>\r</code>),
            and tab (<code>\t</code>). Unicode characters can be escaped using <code>\uXXXX</code>.
            <br />
            <strong>Fix:</strong> Escape the inner double quote.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "description": "This is a \\"quote\\"." // Escaped inner quotes
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Unexpected character 't' (or 'f', 'n')
        </h3>
        <p>
          This often happens when boolean (<code>true</code>, <code>false</code>) or null (<code>null</code>) values are
          incorrectly capitalized.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Incorrect Capitalization):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "isEnabled": True // <-- Capital 'T'
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Unexpected character 'T' at line 2, column 15. Expected 't', 'f', 'n', '[', '&#x7b;', '"', or a
            digit.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            The JSON literals for boolean and null values are strictly lowercase: <code>true</code>, <code>false</code>,
            and <code>null</code>.
            <br />
            <strong>Fix:</strong> Use lowercase letters for these literals.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "isEnabled": true // Correct lowercase 'true'
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Unexpected end of input (or similar)
        </h3>
        <p>
          This usually means a closing brace (<code>&#x7d;</code>) or bracket (<code>]</code>) is missing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Missing Closing Brace):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "data": [1, 2, 3] // <-- Missing closing brace for the object
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Unexpected end of input. Expected &#x7d;.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            The formatter reached the end of the input string while still expecting a token necessary to complete the
            structure it was parsing (in this case, the closing brace for the root object).
            <br />
            <strong>Fix:</strong> Add the missing closing brace or bracket at the appropriate location.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">
              {`{
  "data": [1, 2, 3]
} // Added closing brace
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-red-500" /> Error: Trailing characters after JSON root (or similar)
        </h3>
        <p>
          A valid JSON document must consist of a single root element, which is either an object or an array. Any
          content after the closing brace/bracket of the root is an error.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Invalid JSON (Extra Content):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`[1, 2, 3]
// This is not allowed after the array`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Formatter Output (Conceptual):</h4>
          <p className="text-sm italic text-red-600 dark:text-red-400">
            Error: Unexpected token '/' at line 2, column 1. Expected end of input.
          </p>
          <h4 className="text-lg font-medium mt-4 mb-2">Explanation & Fix:</h4>
          <p className="text-sm">
            The formatter successfully parsed the array <code>[1, 2, 3]</code> but then found additional characters
            (which it correctly identified as the start of a comment, which is also invalid in JSON). Once the root
            element is closed, the input should end.
            <br />
            <strong>Fix:</strong> Remove any characters or content that appear after the main JSON object or array
            closes.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-sm">{`[1, 2, 3]`}</pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Tips for Using Formatters Effectively
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Input Carefully:</strong> Copy and paste your JSON into the formatter exactly as it appears.
          </li>
          <li>
            <strong>Locate the Error:</strong> Pay close attention to the line and column numbers provided in the error
            message. Most formatters highlight the exact location.
          </li>
          <li>
            <strong>Understand the Expectation:</strong> The error message often says what the parser *expected* to find
            but didn't. This is the key to identifying the missing or incorrect character.
          </li>
          <li>
            <strong>Fix One Error at a Time:</strong> Sometimes one syntax error can confuse the parser and lead to
            cascading, misleading error messages. Fix the first reported error, then re-validate.
          </li>
          <li>
            <strong>Use Reliable Tools:</strong> Use well-known online formatters or integrated IDE tools.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircleCheck className="w-6 h-6 text-green-500" /> Conclusion
        </h2>
        <p>
          Learning to effectively use a JSON formatter by analyzing its error output is an invaluable skill for any
          developer working with JSON. It transforms the frustration of "invalid JSON" errors into concrete lessons
          about correct syntax. By understanding what each error message signifies in relation to the JSON
          specification, you not only fix the current problem faster but also build a stronger intuition for writing
          correct JSON from the start. Treat your formatter's error messages as a guide, and you'll master JSON syntax
          through practical experience.
        </p>
      </div>
    </>
  );
}
