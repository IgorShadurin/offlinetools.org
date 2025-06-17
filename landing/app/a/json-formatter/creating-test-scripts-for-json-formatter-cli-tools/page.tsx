import type { Metadata } from "next";
import { Code, Check, X, Terminal, FlaskConical, Diff, ListChecks, FolderCode, ArrowRight } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Creating Test Scripts for JSON Formatter CLI Tools | Offline Tools",
  description:
    "A guide on designing and implementing test scripts for Command Line Interface (CLI) tools that format JSON data.",
};

export default function JsonFormatterCliTestingArticle() {
  const bashScript = `
# Assuming your formatter CLI is built and available as './dist/formatter'
# Adjust the command based on your build process and tool name

FORMATTER="./dist/formatter"
INPUT_DIR="tests/fixtures/inputs"
EXPECTED_DIR="tests/fixtures/expected"
TEMP_DIR="tests/temp" # Temporary directory for actual outputs

mkdir -p "$TEMP_DIR"
EXIT_CODE=0 # Track overall test status

run_test() {
    local input_file="$1"
    local expected_file="$2"
    local options="$3"
    local test_name="$4"
    local expect_error="$5" # "true" if an error is expected

    echo "Running test: $test_name"

    local actual_output="$TEMP_DIR/$(basename "\${expected_file:-\${input_file/.json/.actual}}")"
    local actual_stderr="$TEMP_DIR/$(basename "\${expected_file:-\${input_file/.json/.actual}}").stderr"

    if [ "$expect_error" = "true" ]; then
        # Test case expecting an error
        # Run the command, capture stderr, and check exit code
        "$FORMATTER" $options < "$input_file" > /dev/null 2> "$actual_stderr"
        local command_exit_code=$?

        if [ $command_exit_code -eq 0 ]; then
            echo "  FAILURE: Expected error for '$input_file', but command exited with 0."
            EXIT_CODE=1
        else
            # Optionally compare stderr output if expected stderr file exists
            if [ -f "$expected_file" ]; then
                 diff "$actual_stderr" "$expected_file" > /dev/null
                 if [ $? -ne 0 ]; then
                     echo "  FAILURE: Stderr output mismatch for '$input_file'."
                     diff "$actual_stderr" "$expected_file"
                     EXIT_CODE=1
                 else
                     echo "  SUCCESS (Error Handled)."
                 fi
            else
                echo "  SUCCESS (Error Handled)." # No specific stderr comparison file
            fi
        fi
    else
        # Standard test case expecting successful output
        # Run the command, capture stdout
        "$FORMATTER" $options < "$input_file" > "$actual_output" 2> /dev/null
        local command_exit_code=$?

        if [ $command_exit_code -ne 0 ]; then
            echo "  FAILURE: Command exited with non-zero code $command_exit_code for '$input_file'."
            EXIT_CODE=1
        else
            # Compare actual output with expected output
            diff "$actual_output" "$expected_file" > /dev/null
            if [ $? -ne 0 ]; then
                echo "  FAILURE: Output mismatch for '$input_file'."
                diff "$actual_output" "$expected_file"
                EXIT_CODE=1
            else
                echo "  SUCCESS."
            fi
        fi
    fi
}

# --- Run Tests ---

# Happy Path
run_test "$INPUT_DIR/simple.json" "$EXPECTED_DIR/simple.formatted.json" "" "Simple Formatting"
run_test "$INPUT_DIR/nested.json" "$EXPECTED_DIR/nested.formatted.json" "" "Nested Formatting"

# Edge Cases
run_test "$INPUT_DIR/empty_object.json" "$EXPECTED_DIR/empty_object.formatted.json" "" "Empty Object"

# Invalid Input
run_test "$INPUT_DIR/invalid_syntax.json" "$EXPECTED_DIR/invalid_syntax.stderr" "" "Invalid Syntax" "true"

# Options Testing
run_test "$INPUT_DIR/nested.json" "$EXPECTED_DIR/nested.compact.json" "--compact" "Nested Compact"
# Add more tests for different options and inputs

# --- Summary ---
echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "All tests passed!"
else
    echo "Some tests failed!"
fi

# Clean up temporary files
# rm -rf "$TEMP_DIR" # Keep temp files for debugging if tests fail

exit $EXIT_CODE
`;

  const nodeScript = `
const { spawn } = require('child_process');
const { readFile } = require('fs/promises');
const path = require('path');

const FORMATTER = path.join(__dirname, '../dist/formatter'); // Adjust path
const INPUT_DIR = path.join(__dirname, './fixtures/inputs');
const EXPECTED_DIR = path.join(__dirname, './fixtures/expected');

let testsFailed = 0;

async function runTest(inputFile, expectedFile, options = [], testName, expectError = false) {
    console.log('Running test: ' + testName);

    const inputPath = path.join(INPUT_DIR, inputFile);
    const expectedPath = path.join(EXPECTED_DIR, expectedFile);

    try {
        // Read input file content
        const inputContent = await readFile(inputPath, 'utf-8');

        // Spawn the formatter process
        const formatterProcess = spawn(FORMATTER, options, { stdio: ['pipe', 'pipe', 'pipe'] });

        let stdout = '';
        let stderr = '';

        formatterProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        formatterProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        // Write input content to stdin of the formatter process
        formatterProcess.stdin.write(inputContent);
        formatterProcess.stdin.end();

        const exitCode = await new Promise((resolve, reject) => {
            formatterProcess.on('error', reject);
            formatterProcess.on('close', resolve);
        });

        if (expectError) {
            // Test case expecting an error
            if (exitCode === 0) {
                console.error('  FAILURE: Expected error for \\'' + inputFile + '\\', but command exited with 0.');
                testsFailed++;
            } else {
                // Optionally compare stderr output if expected stderr file exists
                if (await fileExists(expectedPath)) {
                    const expectedStderr = await readFile(expectedPath, 'utf-8');
                    // Basic comparison, might need trimming or more robust diffing
                    if (stderr.trim() !== expectedStderr.trim()) {
                        console.error('  FAILURE: Stderr output mismatch for \\'' + inputFile + '\\'.');
                        console.log('--- Expected Stderr ---');
                        console.log(expectedStderr);
                        console.log('--- Actual Stderr ---');
                        console.log(stderr);
                        console.log('---------------------');
                        testsFailed++;
                    } else {
                        console.log('  SUCCESS (Error Handled).');
                    }
                } else {
                    console.log('  SUCCESS (Error Handled).'); // No specific stderr comparison file
                }
            }
        } else {
            // Standard test case expecting successful output
            if (exitCode !== 0) {
                console.error('  FAILURE: Command exited with non-zero code ' + exitCode + ' for \\'' + inputFile + '\\'. Stderr:\\n' + stderr);
                testsFailed++;
            } else {
                const expectedOutput = await readFile(expectedPath, 'utf-8');
                 // Basic comparison, might need trimming or more robust diffing
                if (stdout.trim() !== expectedOutput.trim()) {
                    console.error('  FAILURE: Output mismatch for \\'' + inputFile + '\\'.');
                    console.log('--- Expected Output ---');
                    console.log(expectedOutput);
                    console.log('--- Actual Output ---');
                    console.log(stdout);
                    console.log('---------------------');
                    testsFailed++;
                } else {
                    console.log('  SUCCESS.');
                }
            }
        }

    } catch (error) {
        console.error('  FAILURE: Error running test for \\'' + inputFile + '\\': ' + error.message);
        testsFailed++;
    }
}

// Helper to check if a file exists
async function fileExists(filePath) {
    try {
        await readFile(filePath);
        return true;
    } catch (e) {
        // Check for specific error code if needed (e.g., 'ENOENT')
        return false;
    }
}

// --- Run Tests ---
(async () => {
    await runTest('simple.json', 'simple.formatted.json', [], 'Simple Formatting');
    await runTest('nested.json', 'nested.formatted.json', [], 'Nested Formatting');
    await runTest('empty_object.json', 'empty_object.formatted.json', [], 'Empty Object');
    await runTest('invalid_syntax.json', 'invalid_syntax.stderr', [], 'Invalid Syntax', true);
    await runTest('nested.json', 'nested.compact.json', ['--compact'], 'Nested Compact');
    // Add more tests here...

    // --- Summary ---
    console.log('');
    if (testsFailed === 0) {
        console.log('All tests passed!');
    } else {
        console.error(testsFailed + ' test(s) failed!');
        process.exit(1); // Exit with non-zero code on failure
    }
})();
`;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FlaskConical className="mr-3 h-8 w-8" /> Creating Test Scripts for JSON Formatter CLI Tools
      </h1>

      <div className="space-y-6">
        <p>
          Command Line Interface (CLI) tools are powerful utilities for developers, enabling automation and integration
          into workflows. A common task is formatting data, and JSON formatters are particularly useful for
          pretty-printing, minimizing, or standardizing JSON output. Ensuring these tools work correctly and
          consistently across various inputs is crucial. This article explores how to create effective test scripts for
          your JSON formatter CLI tool.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ListChecks className="mr-2 h-6 w-6" /> Why Test Your CLI Formatter?
        </h2>
        <p>Testing CLI tools, especially formatters, is essential for several reasons:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Correctness:</strong> Verify that the tool produces valid JSON output according to the
            specification, and that formatting rules (indentation, spacing, key order, etc.) are applied as expected.
          </li>
          <li>
            <strong>Consistency:</strong> Ensure the same input consistently produces the same output.
          </li>
          <li>
            <strong>Robustness:</strong> Check how the tool handles edge cases and invalid inputs without crashing or
            producing incorrect results.
          </li>
          <li>
            <strong>Regression Prevention:</strong> Catch bugs introduced when adding new features or refactoring code.
          </li>
          <li>
            <strong>Documentation:</strong> Test cases can serve as executable examples of how the tool is supposed to
            behave.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ListChecks className="mr-2 h-6 w-6" /> Types of Test Cases
        </h2>
        <p>A comprehensive test suite should cover various scenarios. Here are some categories of test cases:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Check className="mr-2 h-5 w-5 text-green-600" /> Happy Path / Basic Functionality
        </h3>
        <p>
          These tests cover typical, valid JSON inputs and verify that the tool produces the expected formatted output.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Simple objects and arrays.</li>
          <li>Nested structures.</li>
          <li>Various data types (strings, numbers, booleans, null).</li>
          <li>JSON with comments (if your tool supports/ignores them).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 h-5 w-5" /> Edge Cases
        </h3>
        <p>Test inputs that might reveal subtle bugs or unexpected behavior.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Empty objects &#x7b;&#x7d; and arrays &#x5b;&#x5d;.</li>
          <li>JSON with large numbers or very long strings.</li>
          <li>Deeply nested JSON structures.</li>
          <li>JSON containing special characters or Unicode.</li>
          <li>JSON with unusual whitespace or line endings.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <X className="mr-2 h-5 w-5 text-red-600" /> Invalid Input / Error Handling
        </h3>
        <p>
          Ensure the formatter correctly identifies invalid JSON and exits with a non-zero status code, ideally
          providing a helpful error message.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Missing commas, colons, brackets, braces, or quotes.</li>
          <li>Trailing commas (depending on JSON standard compliance).</li>
          <li>Incorrectly escaped characters in strings.</li>
          <li>Non-JSON content.</li>
          <li>Empty input file or stdin.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 h-5 w-5" /> Options Testing
        </h3>
        <p>
          If your formatter supports command-line options (e.g., indentation level, sorting keys, compact output), test
          each option and combinations.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>--indent 2</code>, <code>--indent 4</code>, <code>--indent &apos;\t&apos;</code>
          </li>
          <li>
            <code>--compact</code> / <code>--minify</code>
          </li>
          <li>
            <code>--sort-keys</code>
          </li>
          <li>
            Combinations like <code>--sort-keys --indent 2</code>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FolderCode className="mr-2 h-6 w-6" /> Setting up the Test Environment
        </h2>
        <p>
          A common and effective approach for testing CLI tools is using &quot;snapshot&quot; or &quot;golden file&quot;
          testing. You create pairs of input and expected output files.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Input Files:</strong> Create files containing various JSON inputs (valid, invalid, edge cases,
            etc.).
          </li>
          <li>
            <strong>Expected Output Files:</strong> For each valid input file and set of options, create a corresponding
            file containing the *exact* output you expect the CLI tool to produce. For invalid inputs, document the
            expected error message or exit code.
          </li>
          <li>
            <strong>Test Script:</strong> Write a script (e.g., in Bash, Python, Node.js) that automates running your
            CLI tool with different inputs and options, captures its output (stdout and stderr), and compares it against
            the expected output files.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <FolderCode className="mr-2 h-5 w-5" /> Example Test Directory Structure:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`tests/
  fixtures/
    inputs/
      simple.json
      nested.json
      empty_object.json
      invalid_syntax.json
      large_file.json
    expected/
      simple.formatted.json
      nested.formatted.json
      nested.compact.json
      empty_object.formatted.json
      invalid_syntax.stderr
  test_formatter.sh  # Or test_formatter.js / test_formatter.py
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Terminal className="mr-2 h-6 w-6" /> Writing Test Scripts (Shell Example)
        </h2>
        <p>
          Shell scripts (like Bash) are straightforward for running CLI commands and comparing file outputs using
          standard utilities like <code>diff</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2 h-5 w-5" /> Simple Bash Test Script (<code>test_formatter.sh</code>):
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{bashScript}</pre>
          </div>
          <p className="mt-4">
            This script defines a helper function <code>run_test</code> to encapsulate the logic for running the
            formatter, capturing output, and comparing. It handles both successful runs (checking stdout) and expected
            failures (checking exit code and optionally stderr). The <code>diff</code> command is a standard Unix
            utility that shows line-by-line differences between files.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 h-6 w-6" /> Writing Test Scripts (Node.js Example)
        </h2>
        <p>
          If your CLI tool is built with Node.js, you might prefer writing tests in Node.js itself. This allows for more
          programmatic control and potentially more detailed comparisons.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2 h-5 w-5" /> Simple Node.js Test Script (<code>test_formatter.js</code>):
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{nodeScript}</pre>
          </div>
          <p className="mt-4">
            This Node.js script uses <code>child_process.spawn</code> to run the CLI tool and pipes input/output. It
            reads expected results from files and performs string comparisons. For more complex diffing, you might use a
            dedicated library. Added error handling for <code>readFile</code> in <code>fileExists</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Diff className="mr-2 h-6 w-6" /> Comparing Output
        </h2>
        <p>
          The core of these tests is comparing the actual output of your CLI tool with the predefined expected output.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Exact String Match:</strong> For simple cases or compact output, a direct string comparison might
            suffice. However, be mindful of trailing newlines or whitespace differences.
          </li>
          <li>
            <strong>Line-by-Line Diff:</strong> Tools like <code>diff</code> are excellent for pretty-printed JSON,
            highlighting exactly where the actual output deviates from the expected.
          </li>
          <li>
            <strong>JSON Comparison Libraries:</strong> For more flexible comparisons (e.g., ignoring key order in
            pretty-printed output unless <code>--sort-keys</code> is used), you could parse both the actual and expected
            output JSON strings into data structures and compare the structures programmatically. Libraries exist for
            this purpose. However, for testing a *formatter* specifically, comparing the *formatted string* output is
            often the most direct way to verify the formatting rules themselves are applied correctly.
          </li>
        </ul>
        <p>
          For the golden file approach, storing the expected output files in version control (like Git) is crucial. When
          the formatter&apos;s output changes (intentionally due to updates or bug fixes), you&apos;ll need to review
          the differences and update the expected files.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Terminal className="mr-2 h-6 w-6" /> Running Tests
        </h2>
        <p>Integrate your test script into your project&apos;s development workflow:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Run tests before committing changes.</li>
          <li>
            Include tests in your Continuous Integration (CI) pipeline to automatically check every push or pull
            request.
          </li>
          <li>
            Add a script command to your <code>package.json</code> (if using Node.js) for easy execution, e.g.,{" "}
            <code>&quot;test&quot;: &quot;./tests/test_formatter.sh&quot;</code> or{" "}
            <code>&quot;test&quot;: &quot;node ./tests/test_formatter.js&quot;</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRight className="mr-2 h-6 w-6" /> Next Steps
        </h2>
        <p>
          Start by creating tests for the basic functionality, then gradually add edge cases, error tests, and option
          tests. Maintaining the expected output files requires discipline, but it provides a robust safety net for your
          CLI tool&apos;s correctness. Consider using a testing framework if your test suite grows very large or
          complex, but for many CLI tools, a simple script with golden files is sufficient and easy to understand.
        </p>
      </div>
    </>
  );
}
