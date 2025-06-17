import type { Metadata } from "next";
import {
  AlertTriangle,
  Code,
  FileText,
  Layers,
  Scale,
  CheckCheck,
  X,
  TestTube,
  Braces,
  Database,
  Bug,
  ListTree,
} from "lucide-react"; // Only allowed icons are imported

export const metadata: Metadata = {
  title: "Testing JSON Formatters with Edge Case Documents | Offline Tools",
  description:
    "Learn about common and obscure JSON edge cases and how to effectively test JSON formatters for robustness and correctness.",
};

export default function JsonFormatterEdgeCaseArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="w-8 h-8 mr-3 text-blue-500" />
        Testing JSON Formatters with Edge Case Documents
      </h1>

      <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web and beyond. While
          its structure seems simple, building or using tools that handle JSON &mdash; especially{" "}
          <strong>JSON formatters</strong> or pretty-printers &mdash; requires careful consideration of various edge
          cases. A formatter&apos;s job is to take a JSON string and output a new string with consistent indentation and
          spacing, often for readability. However, a robust formatter must also handle invalid or unusual JSON inputs
          gracefully.
        </p>

        <p>
          This article explores common and obscure JSON edge cases and discusses strategies for testing formatters to
          ensure they are reliable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-green-500" />
          What is a JSON Formatter?
        </h2>
        <p>
          A JSON formatter, or pretty-printer, is a tool that takes a JSON string and re-outputs it with indentation and
          line breaks to make the structure clearer and easier for humans to read. For example:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Input JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
            </pre>
          </div>
          <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100">Formatted Output:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    "Math",
    "Science"
  ]
}`}
            </pre>
          </div>
        </div>
        <p>
          Behind the scenes, a formatter usually involves parsing the input JSON string into an in-memory data structure
          (like a JavaScript object or array) and then serializing that structure back into a string with the desired
          formatting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
          Why Test with Edge Cases?
        </h2>
        <p>
          While formatting valid, standard JSON is straightforward, real-world data often contains peculiarities. Edge
          cases can reveal bugs in the parser or the serializer components of the formatter, leading to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start">
            <Bug className="w-5 h-5 mr-2 mt-1 text-red-500 flex-shrink-0" />
            Incorrectly formatted output (e.g., wrong indentation, missing commas).
          </li>
          <li className="flex items-start">
            <X className="w-5 h-5 mr-2 mt-1 text-red-500 flex-shrink-0" />
            Failure to process valid JSON.
          </li>
          <li className="flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
            Lack of proper error handling for invalid JSON (e.g., crashing instead of reporting a syntax error).
          </li>
          <li className="flex items-start">
            <Scale className="w-5 h-5 mr-2 mt-1 text-blue-500 flex-shrink-0" />
            Performance issues with large or deeply nested data.
          </li>
        </ul>
        <p>Comprehensive testing with edge cases is crucial for building reliable JSON tools.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <ListTree className="w-6 h-6 mr-2 text-purple-500" />
          Common JSON Edge Cases
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <X className="w-5 h-5 mr-2 text-red-500" />
          Invalid Syntax
        </h3>
        <p>
          These are documents that violate the JSON specification. A good formatter should ideally detect these early
          and report an error, rather than producing malformed output or crashing.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Trailing commas:</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "a": 1, }`}</pre>
            or
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ 1, 2, ]`}</pre>
          </li>
          <li>
            <span className="font-medium">Missing commas between elements:</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "a": 1 "b": 2 }`}</pre>
            or
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ 1 2 ]`}</pre>
          </li>
          <li>
            <span className="font-medium">Unquoted keys:</span> JSON requires keys to be strings.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ a: 1 }`}</pre>
          </li>
          <li>
            <span className="font-medium">Invalid escape sequences in strings:</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "key": "String with bad escape \\z" }`}
            </pre>
          </li>
          <li>
            <span className="font-medium">Comments:</span> JSON does not support comments.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "a": 1 // This is a comment }`}
            </pre>
          </li>
          <li>
            <span className="font-medium">Using single quotes for strings:</span> JSON requires double quotes.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ 'key': 'value' }`}</pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-500" />
          Valid but Challenging Structures
        </h3>
        <p>
          These are documents that are syntactically valid JSON according to RFC 8259, but might pose challenges for
          formatting or performance.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Empty documents (not strictly JSON, but common):</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{``}</pre>
          </li>
          <li>
            <span className="font-medium">Empty object or array:</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{}`}</pre>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[]`}</pre>
          </li>
          <li>
            <span className="font-medium">JSON values that are not objects or arrays:</span> A valid JSON document can
            be just a string, number, boolean, or null.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`"just a string"`}</pre>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`123.45`}</pre>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`true`}</pre>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`null`}</pre>
          </li>
          <li>
            <span className="font-medium">Deeply nested structures:</span>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "a": { "b": { "c": { "d": { "e": { "f": 1 } } } } } }`}
            </pre>
            Deep nesting can stress recursive formatting logic and potentially cause stack overflows if not handled
            carefully (though less common in modern runtimes).
            <Layers className="w-5 h-5 ml-2 inline-block text-purple-500" />
          </li>
          <li>
            <span className="font-medium">Very large arrays or objects:</span> Documents with thousands or millions of
            elements/keys.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[1, 2, 3, ..., 1000000]`}</pre>
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "key1": "value1", "key2": "value2", ..., "keyN": "valueN" }`}
            </pre>
            This tests performance and memory usage. <Database className="w-5 h-5 ml-2 inline-block text-blue-500" />
          </li>
          <li>
            <span className="font-medium">Mix of different types:</span> An array or object containing a variety of
            value types.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`[ null, 123, "string", true, {}, [] ]`}
            </pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-500" />
          String Edge Cases
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Strings with escaped characters:</span> Quotes (`"`), backslashes (`\`),
            control characters (`\n`, `\r`, `\t`, `\f`, `\b`), and Unicode escapes (`\uXXXX`).
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "text": "hello\\nworld\\twith \\"quotes\\" and a backslash \\\\" }`}
            </pre>
          </li>
          <li>
            <span className="font-medium">Strings with actual Unicode characters (non-ASCII):</span> Emojis, characters
            from other languages.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "greeting": "Привет 👋" }`}</pre>
          </li>
          <li>
            <span className="font-medium">Empty strings:</span> A valid string value.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "empty": "" }`}</pre>
          </li>
          <li>
            <span className="font-medium">Very long strings:</span> Strings that are kilobytes or megabytes in size.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-green-500" />
          Number Edge Cases
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Integers:</span> Zero, positive, negative numbers.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ 0, 1, -100 ]`}</pre>
          </li>
          <li>
            <span className="font-medium">Floating-point numbers:</span> With and without decimal parts, exponential
            notation.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ 1.0, -0.5, 1e+2, 1E-3 ]`}</pre>
          </li>
          <li>
            <span className="font-medium">Large/Small numbers:</span> Numbers exceeding standard 64-bit float precision
            (should ideally be handled as strings or specific large number types internally if precision is critical,
            but JSON spec is flexible).
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "large": 9223372036854775807, "small": 1e-20 }`}
            </pre>
          </li>
          <li>
            <span className="font-medium">Numbers with leading zeros:</span> Invalid syntax (except for `0`).
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ 01, 0.5 ]`}</pre>
          </li>
          <li>
            <span className="font-medium">Invalid JSON numbers:</span> `NaN`, `Infinity`, `-Infinity`. These are not
            valid JSON number literals.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`[ NaN, Infinity ]`}</pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Braces className="w-5 h-5 mr-2 text-orange-500" />
          Key Edge Cases
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Empty keys:</span> A valid string key can be empty.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "": "value" }`}</pre>
          </li>
          <li>
            <span className="font-medium">Keys with special characters:</span> Spaces, punctuation, escaped characters,
            Unicode.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">
              {`{ "key with spaces": 1, "key/with\\/slash": 2, "ключ": 3 }`}
            </pre>
          </li>
          <li>
            <span className="font-medium">Duplicate keys:</span> The JSON specification says "The names within an object
            SHOULD be unique." Parsers/formatters might handle this differently (e.g., keep the first, keep the last, or
            error).
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{`{ "a": 1, "a": 2 }`}</pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Whitespace and Encoding
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Excessive whitespace:</span> Leading/trailing, between tokens. A formatter
            should typically ignore and replace this with consistent spacing.
            <pre className="bg-gray-200 p-2 rounded text-sm my-2 dark:bg-gray-700">{` { "a" : 1 } `}</pre>
          </li>
          <li>
            <span className="font-medium">Different types of whitespace:</span> Spaces, tabs, newlines, carriage
            returns.
          </li>
          <li>
            <span className="font-medium">Byte Order Mark (BOM):</span> Some files encoded in UTF-8 may start with a
            BOM. A robust parser/formatter should handle this.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <TestTube className="w-6 h-6 mr-2 text-teal-500" />
          Testing Strategies
        </h2>

        <p>
          Testing JSON formatters involves ensuring correctness for valid inputs and graceful failure for invalid
          inputs.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-500" />
          1. Test Suite of Edge Cases
        </h3>
        <p>
          Create a collection of JSON strings representing all the edge cases discussed above. For valid JSON inputs,
          define the expected formatted output string. For invalid inputs, define the expected error type or message.
          Automate these tests using a testing framework.
        </p>
        <pre className="bg-gray-100 p-3 rounded text-sm my-4 dark:bg-gray-800 overflow-x-auto">
          {`// Example test structure (conceptual)
test('formats empty object', () => {
  const input = '{}';
  const expected = '{\\n}'; // Assuming 2-space indent
  expect(formatJson(input)).toBe(expected);
});

test('formats deeply nested array', () => {
  const input = '[[[[1]]]]';
  const expected = '[\\n  [\\n    [\\n      [\\n        1\\n      ]\\n    ]\\n  ]\\n]';
  expect(formatJson(input)).toBe(expected);
});

test('throws error for trailing comma', () => {
  const input = '[1, 2,]';
  expect(() => formatJson(input)).toThrow(/trailing comma/i);
});`}
        </pre>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Braces className="w-5 h-5 mr-2 text-orange-500" />
          2. Round-Trip Testing
        </h3>
        <p>
          For valid JSON, a common technique is to ensure that parsing the formatted output yields the original data
          structure.
        </p>
        <p className="flex items-center">
          Original String &rarr; Formatter &rarr; Formatted String &rarr; Parser &rarr; Data Structure{" "}
          <span className="ml-2">
            <CheckCheck className="w-5 h-5 text-green-500" />
          </span>
        </p>
        <p>
          The final data structure should be identical to the structure you would get from parsing the original input
          string. This validates both the formatter&apos;s serialization and a standard parser&apos;s deserialization.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Bug className="w-5 h-5 mr-2 text-red-500" />
          3. Fuzz Testing
        </h3>
        <p>
          Generate semi-random or completely random strings, including potentially malformed JSON, and feed them to the
          formatter. Monitor for crashes, infinite loops, or unexpected output. Fuzzing can uncover edge cases you
          didn&apos;t think to include in your manual test suite.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-blue-500" />
          4. Performance Testing
        </h3>
        <p>
          Measure the time and memory usage when formatting very large or deeply nested JSON documents. Ensure the
          formatter scales reasonably and doesn&apos;t exhaust resources for typical large inputs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-purple-500" />
          Beyond Formatting: Parser Interaction
        </h2>
        <p>
          Since formatters typically rely on an underlying JSON parser, the behavior of the formatter for invalid input
          is heavily dependent on the parser&apos;s robustness. Some parsers might be more lenient (e.g., accept
          trailing commas), while others are strict. When testing a formatter, you are implicitly testing its parser
          component as well. Using a standard, well-tested parser library is often the first step to a robust formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Conclusion
        </h2>
        <p>
          Testing JSON formatters thoroughly with a wide range of edge case documents is essential for delivering a
          reliable tool. Covering invalid syntax, challenging valid structures (empty, nested, large, mixed types),
          string peculiarities, number representations, and key variations will help identify and fix bugs, ensuring the
          formatter works correctly and predictably even with the messiest real-world JSON data. A combination of
          dedicated edge case tests, round-trip checks, and fuzzing provides strong confidence in the formatter&apos;s
          robustness.
        </p>
      </div>
    </div>
  );
}
