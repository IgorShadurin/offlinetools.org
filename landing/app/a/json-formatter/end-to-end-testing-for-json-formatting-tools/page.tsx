import type { Metadata } from "next";
import {
  FileJson2,
  CheckCheck,
  Wrench,
  Diff,
  TestTubes,
  Code,
  AlertCircle,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "End-to-End Testing for JSON Formatting Tools | Offline Tools",
  description: "A comprehensive guide to implementing End-to-End testing for JSON formatting and validation tools.",
};

export default function E2eJsonFormattingTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <TestTubes className="w-8 h-8" />
        End-to-End Testing for JSON Formatting Tools
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          Building reliable developer tools, especially those that handle critical data formats like JSON, requires
          rigorous testing. JSON formatting tools, which ensure data consistency, readability, and adherence to the
          standard, are no exception. While unit tests cover individual functions and components,{" "}
          <strong>End-to-End (E2E) testing</strong> provides a holistic approach, verifying that the entire process,
          from input to output, works as expected in a real-world scenario.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ClipboardCheck className="w-7 h-7" />
          Understanding JSON Formatting Tools
        </h2>
        <p>
          A JSON formatting tool typically takes a JSON string as input and outputs a new JSON string, often with
          consistent indentation, spacing, and sorted keys. Some tools also perform validation, checking if the input
          string is valid JSON according to{" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            the JSON standard
          </a>
          .
        </p>
        <p>
          The core function is transforming potentially messy or minified JSON into a pretty-printed, human-readable
          format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-7 h-7" />
          Why E2E Testing is Essential
        </h2>
        <p>
          Unit tests might verify the parser handles various data types correctly, or that the pretty-printer applies
          the correct indentation level. However, they don&apos;t guarantee that the parser feeds the correct structure
          to the pretty-printer, or that the final string output is valid JSON after re-serialization.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Full Flow Verification:</strong> E2E tests cover the entire pipeline: Input Handling{" "}
            <ArrowRight className="inline-block w-4 h-4" /> Parsing <ArrowRight className="inline-block w-4 h-4" />{" "}
            Internal Representation <ArrowRight className="inline-block w-4 h-4" /> Formatting Logic{" "}
            <ArrowRight className="inline-block w-4 h-4" /> Serialization{" "}
            <ArrowRight className="inline-block w-4 h-4" /> Output.
          </li>
          <li>
            <strong>Catch Integration Issues:</strong> Problems often arise when different modules interact. E2E tests
            expose these.
          </li>
          <li>
            <strong>Validate Final Output:</strong> Ensures the final output string is syntactically correct JSON and
            matches the expected format.
          </li>
          <li>
            <strong>User Perspective:</strong> Simulates how a user would interact with the tool (provides input,
            expects output).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TestTubes className="w-7 h-7" />
          Key Aspects to Test E2E
        </h2>
        <p>To provide comprehensive coverage, E2E tests for a JSON formatter should cover various scenarios:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Valid JSON Input:</strong>
            <ul className="list-circle pl-6 mt-2">
              <li>Simple objects and arrays.</li>
              <li>Complex, nested structures.</li>
              <li>JSON containing all standard data types (strings, numbers, booleans, null, objects, arrays).</li>
              <li>JSON with special characters and escaped sequences in strings.</li>
              <li>Large JSON documents.</li>
              <li>Minified JSON.</li>
            </ul>
          </li>
          <li>
            <strong>Invalid JSON Input:</strong>
            <ul className="list-circle pl-6 mt-2">
              <li>Syntax errors (e.g., trailing commas, missing quotes, incorrect nesting).</li>
              <li>Invalid data types according to the JSON spec (though less common).</li>
              <li>Empty input.</li>
              <li>Input that is not JSON at all.</li>
            </ul>
          </li>
          <li>
            <strong>Formatting Options:</strong> If the tool supports options (e.g., specific indentation
            characters/levels, sorting keys, compact output), each combination should be tested.
          </li>
          <li>
            <strong>Edge Cases:</strong> JSON strings containing only empty objects <code>&#x7b;&#x7d;</code>, empty
            arrays <code>[]</code>, single values (like <code>&quot;hello&quot;</code> or <code>123</code>) which are
            valid JSON roots.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-7 h-7" />
          The E2E Testing Process
        </h2>
        <p>The fundamental process for E2E testing a JSON formatting tool can be simplified to these steps:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileJson2 className="w-6 h-6" />
          1. Prepare Test Data
        </h3>
        <p>
          Create pairs of input JSON and the corresponding *expected* formatted output JSON. This is the most crucial
          step. The expected output must be carefully crafted and considered the &quot;single source of truth&quot; for
          what the formatting tool *should* produce for a given input.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Test Pair:</h4>
          <div className="space-y-3">
            <div>
              <p className="font-mono text-sm mb-1">input.json:</p>
              <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                <code>
                  &#x7b;&quot;name&quot;:&quot;Alice&quot;, &quot;age&quot;:30,
                  &quot;city&quot;:&quot;Wonderland&quot;&#x7d;
                </code>
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm mb-1">expected_output.json (e.g., with 2-space indentation):</p>
              <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                <code>
                  &#x7b;
                  <br />
                  &nbsp;&nbsp;&quot;name&quot;: &quot;Alice&quot;,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;age&quot;: 30,
                  <br />
                  &nbsp;&nbsp;&quot;city&quot;: &quot;Wonderland&quot;
                  <br />
                  &#x7d;
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-6 h-6" />
          2. Execute the Tool
        </h3>
        <p>Programmatically run the JSON formatting tool with the input JSON. This might involve:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Calling a function if it&apos;s a library.</li>
          <li>Executing a command-line interface (CLI) tool, piping the input and capturing the output.</li>
          <li>
            Interacting with a web interface via automation tools (e.g., typing into a textarea, clicking a button,
            reading the output).
          </li>
        </ul>
        <p>Capture the tool&apos;s actual output and any error messages.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Diff className="w-6 h-6" />
          3. Verify the Output
        </h3>
        <p>Compare the *actual* output from the tool with the *expected* output.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>For Valid Input:</strong> The actual formatted JSON string should exactly match the expected
            formatted JSON string. Case, whitespace, and order (if sorting is an option) must align. A simple string
            comparison or a line-by-line comparison after normalizing line endings is often sufficient.
          </li>
          <li>
            <strong>For Invalid Input:</strong> The tool should ideally indicate an error. The test should verify that
            an error occurred and potentially check the error message content (though this can be brittle). Some tools
            might return the original input or an empty string; the expected behavior needs to be defined and checked.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="w-7 h-7" />
          Handling Invalid JSON
        </h2>
        <p>Testing with invalid JSON is crucial. An E2E test for an invalid input should verify:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The tool signals an error (e.g., returns a non-zero exit code for CLI, throws an exception for a library,
            displays an error message in a UI).
          </li>
          <li>
            The output is *not* valid JSON (unless the tool&apos;s behavior is to return the original invalid input).
          </li>
          <li>
            The output, if any, matches the expected output for invalid input (e.g., an empty string, the original
            string).
          </li>
        </ul>
        <div className="bg-yellow-100 p-4 rounded-lg dark:bg-yellow-900 dark:text-yellow-100 my-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-700 dark:text-yellow-300 mt-1 flex-shrink-0" />
          <p className="flex-grow">
            <strong>Important:</strong> How your tool handles invalid JSON must be clearly defined. An E2E test verifies
            this defined behavior, not necessarily that it <em>must</em> throw a specific error type or message.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-7 h-7" />
          Conceptual Test Script Structure
        </h2>
        <p>
          You don&apos;t necessarily need complex frameworks for this kind of E2E test. A simple script reading test
          files and comparing outputs can work.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Node.js Test Script Logic:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
// Assume 'formatJson' is the function/module from your tool
// import { formatJson } from '../src/jsonFormatter'; // Or similar
// Or assume 'executeToolCli' function runs the CLI tool

const testCasesDir = join(__dirname, 'e2e-tests'); // Directory with input.json and expected_output.json files

const testCaseDirs = readdirSync(testCasesDir, &#x7b; withFileTypes: true &#x7d;)
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let allTestsPassed = true;

for (const testCaseName of testCaseDirs) &#x7b;
  const testCasePath = join(testCasesDir, testCaseName);
  const inputPath = join(testCasePath, 'input.json');
  const expectedOutputPath = join(testCasePath, 'expected_output.json');
  const isInvalidInputTest = readFileSync(join(testCasePath, 'config.json'), 'utf8') // Read config
     .includes('"type": "invalid"'); // Simple check for 'invalid' test type

  console.log(\`Running test case: &#x7b;testCaseName&#x7d;\`);

  try &#x7b;
    const inputJson = readFileSync(inputPath, 'utf8');
    let actualOutput = '';
    let toolErrored = false;

    // --- Execution Step ---
    // Replace with how you run your tool:
    // Example 1: Calling a function/library
    // actualOutput = formatJson(inputJson, &#x7b; indent: 2, sortKeys: false &#x7d;);
    // Example 2: Executing a CLI process (requires child_process module)
    // try &#x7b;
    //   actualOutput = executeToolCli(inputJson); // Your function to run CLI
    // &#x7d; catch (cliError) &#x7b;
    //   toolErrored = true;
    //   // Optionally capture cliError.stderr or exit code
    // &#x7d;
    // Example using placeholder:
    actualOutput = \`Simulated formatted output for: &#x7b;inputJson.substring(0, 20)}...\`;


    // --- Verification Step ---
    if (isInvalidInputTest) &#x7b;
      // For invalid input, expect an error signal from the tool
      if (toolErrored /* || actualOutput has specific error format */) &#x7b;
        console.log(\`  &#x2705; Passed (Invalid Input correctly signaled error)\`);
      &#x7d; else &#x7b;
        console.error(\`  &#x274c; Failed (Invalid Input did NOT signal error)\`);
        allTestsPassed = false;
      &#x7d;
    &#x7d; else &#x7b;
      // For valid input, compare output strings
      const expectedOutput = readFileSync(expectedOutputPath, 'utf8');

      if (actualOutput.trim() === expectedOutput.trim()) &#x7b;
        console.log(\`  &#x2705; Passed\`);
      &#x7d; else &#x7b;
        console.error(\`  &#x274c; Failed\`);
        console.error(\`    Expected:\\n---\\n&#x7b;expectedOutput&#x7d;\\n---\`);
        console.error(\`    Actual:\\n---\\n&#x7b;actualOutput&#x7d;\\n---\`);
        // Use a diff library for better comparison in real code
        allTestsPassed = false;
      &#x7d;
    &#x7d;

  &#x7d; catch (error) &#x7b;
    console.error(\`  &#x274c; Failed (Exception during test execution): &#x7b;error.message&#x7d;\`);
    allTestsPassed = false;
  &#x7d;
}

if (allTestsPassed) &#x7b;
  console.log('\\nAll E2E tests passed! &#x1f389;');
&#x7d; else &#x7b;
  console.error('\\nSome E2E tests failed &#x274c;');
  process.exit(1); // Indicate failure
&#x7d;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            This script outline reads test cases from a directory structure (each subdirectory being a test case),
            simulates running the tool, and compares the output. For real-world use, replace the simulation with actual
            tool execution and potentially use a dedicated diffing library.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TestTubes className="w-7 h-7" />
          Setting up Test Cases
        </h2>
        <p>
          Organize your test cases logically. A common approach is to have a directory for E2E tests, with
          subdirectories for each specific test scenario.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <pre>
            <code>
              e2e-tests/
              <br />
              ├── test-case-01-simple-object/
              <br />
              │&nbsp;&nbsp; ├── input.json
              <br />
              │&nbsp;&nbsp; ├── expected_output.json
              <br />
              │&nbsp;&nbsp; └── config.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* Optional: for test metadata/options */}
              <br />
              ├── test-case-02-nested-array/
              <br />
              │&nbsp;&nbsp; ├── input.json
              <br />
              │&nbsp;&nbsp; ├── expected_output.json
              <br />
              │&nbsp;&nbsp; └── config.json
              <br />
              ├── test-case-03-invalid-syntax/
              <br />
              │&nbsp;&nbsp; ├── input.json
              <br />
              │&nbsp;&nbsp; ├── expected_output.json &nbsp;&nbsp;{/* Or expected error message/output if invalid */}
              <br />
              │&nbsp;&nbsp; └── config.json
              <br />
              └── run-e2e-tests.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/* The script to automate tests */}
            </code>
          </pre>
        </div>
        <p>
          The <code>config.json</code> can be used to specify formatting options for that test case or to mark it as an
          &quot;invalid input&quot; test.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-7 h-7" />
          Challenges and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Maintaining Expected Outputs:</strong> As your tool evolves or you add new formatting options,
            updating the <code>expected_output.json</code> files can be tedious but is critical. Ensure this process is
            part of your development workflow.
          </li>
          <li>
            <strong>Non-Deterministic Output:</strong> If your tool&apos;s output order isn&apos;t guaranteed (e.g.,
            object key order in older JavaScript versions, although the JSON spec doesn&apos;t mandate order, formatters
            usually do), your comparison logic needs to handle this (e.g., parse both outputs and deep-compare the
            resulting structures). However, good formatters usually produce deterministic output.
          </li>
          <li>
            <strong>Performance:</strong> For very large JSON files, E2E tests might take significant time. Consider
            having a subset of tests for quick runs and a more comprehensive suite for CI/CD.
          </li>
          <li>
            <strong>Tooling Specifics:</strong> The execution step depends heavily on whether your tool is a library,
            CLI, web app, etc. Adapt your test runner accordingly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-7 h-7" />
          Conclusion
        </h2>
        <p>
          End-to-End testing is an indispensable practice for ensuring the reliability and correctness of JSON
          formatting tools. By simulating the full journey of data through the tool and comparing the final output
          against meticulously prepared expected results, you can catch integration bugs and guarantee that your tool
          delivers on its core promise: producing valid, consistently formatted JSON. While it requires effort in
          setting up and maintaining test data, the confidence gained in your tool&apos;s quality is well worth the
          investment.
        </p>
      </div>
    </>
  );
}
