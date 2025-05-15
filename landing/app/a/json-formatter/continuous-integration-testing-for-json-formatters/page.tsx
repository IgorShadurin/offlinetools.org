import type { Metadata } from "next";
import {
  CheckCheck,
  CloudCog,
  Code,
  FileJson,
  AlertTriangle,
  Ruler,
  Gauge, // Replaced Speedometer with Gauge
  GitFork,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Continuous Integration Testing for JSON Formatters | Offline Tools",
  description:
    "Learn how to integrate robust testing for JSON formatting tools into your Continuous Integration pipelines.",
};

export default function CiJsonFormatterTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <CloudCog className="w-8 h-8 text-blue-500" /> Continuous Integration Testing for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used extensively in web development, APIs, configuration files, and data exchange. Ensuring JSON data is correctly formatted, valid, and consistent is crucial for the reliability and maintainability of software systems. While manual checking or local scripts are useful, integrating tests for JSON formatters into your Continuous Integration (CI) pipeline provides an automated safety net that catches issues early in the development cycle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-green-500" /> Why Test JSON Formatters in CI?
        </h2>
        <p>
          JSON formatters (sometimes called linters, validators, or pretty-printers) are tools that parse JSON data and output it in a standardized, often human-readable, format. When you build or use a custom JSON formatter, or even rely on standard libraries, you need confidence that it behaves as expected across different scenarios.
        </p>
        <p>
          Integrating these tests into CI means:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <CheckCheck className="inline-block w-4 h-4 mr-1 text-green-600" /> **Early Detection:** Catch formatting or validation errors with commits or pull requests before they merge.
          </li>
          <li>
            <GitFork className="inline-block w-4 h-4 mr-1 text-purple-600" /> **Consistency:** Ensure all contributors adhere to the same formatting standards automatically.
          </li>
          <li>
            <Ruler className="inline-block w-4 h-4 mr-1 text-yellow-600" /> **Reliability:** Verify the formatter handles edge cases, malformed input, and large files correctly.
          </li>
          <li>
            <Code className="inline-block w-4 h-4 mr-1 text-gray-600" /> **Prevent Regressions:** Stop new code changes from breaking existing, correct formatting or validation logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-gray-600" /> Types of Tests for JSON Formatters
        </h2>
        <p>
          A comprehensive test suite for a JSON formatter should cover various aspects:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileJson className="w-5 h-5 text-blue-500" /> 1. Syntax Validation
        </h3>
        <p>
          The most basic test is ensuring that the output of your formatter is syntactically valid JSON according to the{" "}
          <a
            href="https://www.json.org/json-en.html"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSON specification
          </a>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Basic Validation Test</h4>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">Using a standard JSON parser to validate output.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// conceptual test using Node.js built-in JSON
import assert from 'assert';
import { formatJsonString } from './your-formatter-library'; // Assume this formats JSON

const inputJson = '{"a":1,"b":[2,{"c":3}]}';
const formattedJson = formatJsonString(inputJson);

try {
  JSON.parse(formattedJson);
  console.log('Syntax validation passed!');
} catch (e: any) {
  assert.fail(\`Syntax validation failed: \${e.message}\`);
}

// Test with invalid input (formatter should handle it gracefully, maybe throw or return error)
const invalidInput = '{ "a": 1, "b": }';
try {
    formatJsonString(invalidInput);
    // Depending on formatter design, expect an error here
    assert.fail("Formatter did not throw error on invalid input");
} catch (e) {
    console.log("Formatter correctly handled invalid input.");
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-purple-500" /> 2. Formatting Consistency
        </h3>
        <p>
          A key purpose of a formatter is to produce consistent output for the same logical input. This includes checking:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Consistent indentation and spacing.</li>
          <li>Consistent handling of trailing commas (or lack thereof).</li>
          <li>Consistent key ordering (alphabetical, insertion order, etc. - if your formatter specifies this).</li>
        </ul>
        <p>
          Snapshot testing is a powerful technique here. You format a known input and compare the output against a saved "snapshot" file.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Conceptual Snapshot Test</h4>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">Comparing formatter output to a baseline (snapshot) file.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// conceptual test using a snapshot testing approach
import { formatJsonString } from './your-formatter-library';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

const inputJson = fs.readFileSync(path.join(__dirname, 'input.json'), 'utf8');
const expectedOutput = fs.readFileSync(path.join(__dirname, 'input.json.snapshot'), 'utf8');

const actualOutput = formatJsonString(inputJson);

// In a real snapshot test runner (like Jest), this would be handled automatically
// but conceptually, it's a string comparison.
assert.strictEqual(actualOutput, expectedOutput, 'Formatted output does not match snapshot!');

console.log('Formatting consistency test passed!');

// __tests__/input.json
// {"z":3,"a":1,"b":[2,{"c":3}]}

// __tests__/input.json.snapshot (generated by running the test once and approving)
// {
//   "a": 1,
//   "b": [
//     2,
//     {
//       "c": 3
//     }
//   ],
//   "z": 3
// }
`}
            </pre>
          </div>
        </div>
        <p>
          Diffing tools (`diff` command, or libraries) can also be used in CI to compare the formatted output of two versions of your formatter on the same input file.
        </p>


        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" /> 3. Error Handling
        </h3>
        <p>
          Your formatter should gracefully handle invalid or malformed JSON input. Tests should verify that it throws appropriate errors, returns specific error objects, or otherwise indicates failure clearly when given bad data.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Testing Error Handling</h4>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">Ensuring the formatter fails predictably on invalid input.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// conceptual test
import assert from 'assert';
import { formatJsonString } from './your-formatter-library';

const invalidJsonInputs = [
  '{ "a": 1, "b": }', // Trailing comma/missing value
  '{ "key": "value", "another": "value" }', // Duplicate key (spec violation in some contexts)
  '[1, 2, 3,]', // Trailing comma in array (often allowed, but depends on spec/strictness)
  '{"unterminated_string": "value}' // Unterminated string
];

invalidJsonInputs.forEach(input => {
    try {
        formatJsonString(input);
        // If we reach here, the test failed
        assert.fail(\`Formatter did not throw error for invalid input: \${input}\`);
    } catch (e) {
        // We expect an error, check if it's the right type/message if possible
        console.log(\`Formatter correctly threw error for input: \${input}\`);
        // assert(e instanceof ExpectedErrorType, 'Threw wrong error type');
    }
});
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-teal-500" /> 4. Performance
        </h3>
        <p>
          For formatters handling potentially large JSON files, performance is key. While performance testing is often separate, you can include basic checks in CI for regressions, such as timing how long it takes to format a large, representative sample file.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Basic Performance Check</h4>
           <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">Measuring formatting time for a large file.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// conceptual test
import { formatJsonString } from './your-formatter-library';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

const largeJson = fs.readFileSync(path.join(__dirname, 'large-sample.json'), 'utf8');
const maxDurationMs = 500; // Define your acceptable threshold

const startTime = Date.now();
formatJsonString(largeJson);
const endTime = Date.now();
const duration = endTime - startTime;

console.log(\`Formatting took \${duration}ms\`);

assert(duration < maxDurationMs, \`Formatting took too long! \${duration}ms > \${maxDurationMs}ms\`);

console.log('Performance test passed!');

// Note: Performance in CI can be noisy. Consider dedicated performance testing
// or using CI features that track build performance over time.
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
         <CloudCog className="w-6 h-6 text-blue-500" /> Integrating Tests into CI
        </h2>
        <p>
          The specifics of integrating your tests depend on your CI platform (GitHub Actions, GitLab CI, Jenkins, etc.) and your project's build setup (npm scripts, makefiles, etc.). The general steps are:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>**Write Tests:** Implement the types of tests described above using your preferred language and testing framework (Jest, Mocha, Node's built-in `assert`, etc.).</li>
          <li>**Define a Test Script:** Create a command that runs all your tests (e.g., `npm test`, `yarn test`, `./run_tests.sh`).</li>
          <li>**Configure CI Workflow:** Add a step in your CI configuration file that checks out your code, installs dependencies, and runs the test script.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Conceptual CI Configuration (e.g., GitHub Actions `.yml`)</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`# .github/workflows/ci.yml
name: Build and Test JSON Formatter

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest # or your preferred OS

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20' # Use your desired Node.js version

    - name: Install dependencies
      run: npm install # Or yarn install, pnpm install

    - name: Run JSON formatter tests
      run: npm test # This command should execute your test suite

    # Optional: If using snapshot tests, you might need to handle updating them
    # This is often done locally, but some workflows might update in CI on a specific branch/condition
`}
            </pre>
          </div>
        </div>
        <p>
          When a commit or pull request is made, the CI server will execute this workflow. If the `npm test` command exits with a non-zero status code (indicating test failures), the CI build will fail, providing immediate feedback.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6 text-green-600" /> Benefits Beyond Bug Catching
        </h2>
        <p>
          Beyond merely catching bugs, integrating formatter tests into CI promotes good development practices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
           <li>**Documentation:** The tests themselves serve as executable documentation for how the formatter is expected to behave.</li>
           <li>**Refactoring Confidence:** You can refactor the formatter's internal logic with more confidence, knowing the test suite in CI will catch any unintended changes in output.</li>
           <li>**Collaboration:** It sets a clear, automated standard for code contributions, reducing debates about formatting style in code reviews.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For any tool or library that handles JSON data, especially custom formatters, linters, or parsers, incorporating a robust test suite and running it within your Continuous Integration pipeline is a highly effective practice. It ensures syntactic validity, formatting consistency, correct error handling, and helps maintain performance, ultimately leading to more reliable software and a smoother development workflow. Start by adding basic syntax and consistency tests, and expand your test suite as your formatter evolves and handles more complex scenarios.
        </p>
      </div>
    </>
  );
}