import type { Metadata } from "next";
import { Check, X, AlertCircle, FileJson2, ListChecks, BookOpenText, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Test Fixtures for JSON Formatter Validation | Offline Tools",
  description:
    "Learn how to create comprehensive test fixtures for validating JSON formatters and parsers, covering valid and invalid cases.",
};

export default function JsonFormatterTestFixturesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ListChecks className="size-8" /> Creating Test Fixtures for JSON Formatter Validation
      </h1>

      <div className="space-y-6">
        <p>
          When building or using a JSON formatter or validator, ensuring its accuracy is paramount. A poorly implemented tool can silently corrupt data or incorrectly reject valid JSON. The most effective way to guarantee correctness is through rigorous testing, and the cornerstone of such testing is a well-structured set of <strong>test fixtures</strong>.
        </p>
        <p>
          This article explores what test fixtures are in this context, why they are crucial, and how to create a comprehensive suite covering various scenarios for validating your JSON processing logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpenText className="size-6" /> What are Test Fixtures?
        </h2>
        <p>
          In software testing, a fixture is a fixed, known state or set of data used as a baseline for running tests. For JSON formatter or validator testing, test fixtures are specific JSON strings or files, paired with their expected outcomes.
        </p>
        <p>
          These outcomes typically include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Whether the JSON is valid or invalid.</li>
          <li>If valid, the expected formatted output (e.g., with consistent indentation, spacing).</li>
          <li>If invalid, the expected error type and potentially the location (line/column number) of the error.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="size-6" /> Why Are Comprehensive Fixtures Important?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Ensure Correctness:</strong> Verify that the formatter correctly handles all valid JSON constructs according to the JSON specification (RFC 8259).</li>
          <li><strong>Catch Errors Accurately:</strong> Confirm that the validator correctly identifies and reports invalid JSON, including subtle syntax or structural errors.</li>
          <li><strong>Identify Edge Cases:</strong> Test how the tool behaves with complex nesting, empty structures, special characters, large inputs, and boundary conditions.</li>
          <li><strong>Regression Prevention:</strong> Provide a safety net when refactoring or adding new features, ensuring that existing functionality remains unbroken.</li>
          <li><strong>Specification Compliance:</strong> Help verify that the implementation strictly adheres to the official JSON standard.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Boxes className="size-6" /> Types of JSON Fixtures to Create
        </h2>
        <p>
          To achieve good test coverage, your fixtures should span both valid and invalid JSON examples.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check className="size-5 text-green-600" /> Valid JSON Fixtures
        </h3>
        <p>
          These fixtures should cover all fundamental JSON data types and structures, both simple and complex.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Examples of Valid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
{`{ "name": "Alice", "age": 30 }

[ 1, 2, 3, false, null, "hello" ]

{
  "person": {
    "name": "Bob",
    "address": {
      "street": "123 Main St",
      "city": "Anytown"
    }
  },
  "items": [
    { "id": 1, "quantity": 10 },
    { "id": 2, "quantity": 5 }
  ]
}

{ "emptyObject": {}, "emptyArray": [] }

{
  "string": "a string with \\"quotes\\" and newlines\\n",
  "numberInt": 123,
  "numberFloat": -45.67e+8,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullValue": null
}

{
  "key-with-hyphen": "value/with/slashes",
  "key with spaces": "\\u0041 \\u0042",
  "Русский ключ": "简体中文的值"
}

[ [1, 2], [3, 4], [] ]

{ "list1": [1, 2], "list2": ["a", "b"] }

{
  "level1": {
    "level2": {
      "level3": {
        "level4": "deep value"
      }
    }
  }
}

"just a string"
12345
true
null`}
            </pre>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
             <FileJson2 className="size-4" /> For each valid fixture, you should define its expected *formatted* output.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <X className="size-5 text-red-600" /> Invalid JSON Fixtures
        </h3>
        <p>
          These fixtures are critical for testing the validator's ability to detect errors and the formatter's behavior when given bad input (it should typically throw an error). Cover common syntax errors and structural issues.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Examples of Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
{`{ "a": 1, "b": 2, }

[ 1, 2, 3, ]

{ "a" 1 }

{ "a": 1 "b": 2 }

{ "a": 1

[ 1, 2

{ key: 1 }

{ 'a': 1 }

{ "a": "hello\\x" }

[, 1, 2]

{ , "a": 1 }

{
  "a": 1
}

{ "a": 1.2.3 }
{ "b": 1e+ }

{ "a": "hello\\" }

{ "a": "line1\\nline2\t" }
{ "a": "line1
line2" }

{} []

{ "a": 1 } extra_text

{ "value": NaN }
{ "value": Infinity }

{ "value": undefined }`}
            </pre>
          </div>
           <p className="mt-2 flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
             <AlertCircle className="size-4" /> For each invalid fixture, you should define that it is invalid and, ideally, the expected error message or error location.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <FileJson2 className="size-6" /> Organizing Your Fixtures
        </h2>
        <p>
          How you organize your fixtures depends on the scale and complexity of your tests.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>In-code Objects:</strong> For smaller sets of fixtures, you can define them directly within your test files using JavaScript/TypeScript objects. Each object could contain the raw JSON string, a boolean indicating validity, and perhaps the expected formatted output or error details.
             <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
               <h4 className="text-lg font-medium mb-2">In-code Fixture Example:</h4>
               <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                 <pre>
{`interface JsonFixture &#x7b;
  name: string;
  input: string;
  isValid: boolean;
  expectedOutput?: string; // For valid cases
  expectedError?: &#x7b; type: string; line?: number; col?: number &#x7d;; // For invalid cases
&#x7d;

const jsonFixtures: JsonFixture[] = [
  &#x7b;
    name: "valid_simple_object",
    input: \`{"a":1, "b": "hello"}\`,
    isValid: true,
    expectedOutput: \`&#x7b;\\n  "a": 1,\\n  "b": "hello"\\n&#x7d;\` // Assuming 2-space indent
  &#x7d;,
  &#x7b;
    name: "invalid_trailing_comma",
    input: \`[1, 2,]\`,
    isValid: false,
    expectedError: &#x7b; type: "SyntaxError", line: 1, col: 6 &#x7d; // Example error detail
  &#x7d;,
  // ... more fixtures
];`}
                 </pre>
               </div>
             </div>
          </li>
          <li><strong>Separate Files:</strong> For larger suites, keeping each fixture (or groups of related fixtures) in separate <code>.json</code>, <code>.jsonc</code> (JSON with comments, if your tools support reading it this way), or plain text files is more manageable. You would then have a corresponding file (or metadata) describing the expected outcome for each input file.
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
               <h4 className="text-lg font-medium mb-2">File-based Fixture Example:</h4>
               <p className="text-sm">
                 Directory structure:
                 <br/>
                 <code>/test/fixtures/</code>
                 <br/>
                 <code>├─ /valid/</code>
                 <br/>
                 <code>│  ├─ simple_object.json</code>
                 <br/>
                 <code>│  ├─ nested.json</code>
                 <br/>
                 <code>│  └─ ...</code>
                 <br/>
                 <code>├─ /invalid/</code>
                 <br/>
                 <code>│  ├─ trailing_comma.json</code>
                 <br/>
                 <code>│  ├─ unquoted_key.json</code>
                 <br/>
                 <code>│  └─ ...</code>
                 <br/>
                 <code>/test/fixtures/expected/</code>
                 <br/>
                 <code>├─ /formatted/</code>
                 <br/>
                 <code>│  ├─ simple_object.formatted.json</code>
                 <br/>
                 <code>│  └─ nested.formatted.json</code>
                 <br/>
                 <code>├─ /errors/</code>
                 <br/>
                 <code>│  └─ errors.json (maps invalid file names to expected error details)</code>
               </p>
             </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="size-6" /> Using Fixtures in Your Tests
        </h2>
        <p>
          With your fixtures defined, you can write automated tests using a testing framework (like Jest, Mocha, etc.):
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Iterate through your collection of fixtures.</li>
          <li>For each fixture:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>If <code>isValid</code> is true:
                <ul className="list-circle pl-6 mt-1 space-y-1">
                   <li>Pass the <code>input</code> string to your formatter/validator.</li>
                   <li>Assert that no error is thrown.</li>
                   <li>Assert that the output matches the <code>expectedOutput</code> (e.g., compare strings or parsed objects).</li>
                </ul>
              </li>
              <li>If <code>isValid</code> is false:
                 <ul className="list-circle pl-6 mt-1 space-y-1">
                   <li>Pass the <code>input</code> string to your formatter/validator.</li>
                   <li>Assert that an error *is* thrown.</li>
                   <li>Optionally, assert that the error type, message, line number, or column number matches the <code>expectedError</code> details.</li>
                 </ul>
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Check className="size-6" /> Sources for Fixtures & Tips
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>JSON Specification (RFC 8259):</strong> Read the specification carefully to understand all valid and invalid cases.</li>
          <li><strong>Existing Test Suites:</strong> Look for test suites developed for other JSON parsers in different languages. Projects often open-source their test data.</li>
          <li><strong>JSON Linter/Validator Tools:</strong> Use online or command-line tools to validate various JSON snippets and observe how they behave and report errors.
          </li>
          <li><strong>Generate Edge Cases:</strong> Manually construct JSON that tests boundaries (maximum nesting depth your tool supports, very long strings/numbers, objects/arrays with thousands of items).</li>
          <li><strong>Incremental Creation:</strong> Add new fixtures whenever you encounter a bug or an edge case that wasn't previously covered.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <BookOpenText className="size-6" /> Conclusion
        </h2>
        <p>
          Creating a robust set of test fixtures is an indispensable step in building reliable JSON formatting and validation tools. By systematically covering a wide range of valid and invalid JSON structures, types, and edge cases, you can build confidence in your tool's correctness and maintain its quality over time. This investment in comprehensive fixtures pays off by catching bugs early and ensuring compliance with the JSON standard.
        </p>
      </div>
    </>
  );
}