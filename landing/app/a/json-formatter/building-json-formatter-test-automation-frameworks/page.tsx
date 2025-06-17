import type { Metadata } from "next";
import {
  Braces,
  CodeXml,
  Diff,
  CheckCheck,
  X,
  FlaskConical,
  Layers,
  TestTube,
  FileText,
  FileInput,
  FileOutput,
  ArrowUpDown, // Corrected import from ArrowsUpDown
  Cog,
  Lightbulb,
  Info,
  TriangleAlert,
  SplitSquareVertical, // Added SplitSquareVertical
} from "lucide-react";

export const metadata: Metadata = {
  title: "Building JSON Formatter Test Automation Frameworks",
  description: "Learn the principles and components of building an automated test framework for JSON formatters.",
};

export default function JsonFormatterTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <CodeXml size={32} /> Building JSON Formatter Test Automation Frameworks
      </h1>

      <div className="space-y-8">
        <section>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            JSON formatters are essential tools for developers working with structured data. They take unformatted or
            minified JSON strings and produce human-readable, indented output. Ensuring the correctness and consistency
            of a JSON formatter is crucial, especially if it&apos;s part of a larger system or library. While manual
            checks suffice for small changes, an automated test framework provides reliability, speed, and
            repeatability. This article explores how to build such a framework.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Lightbulb size={24} /> Why Automate Testing for JSON Formatters?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Consistency:</span> Ensure the formatter always produces the same output for
              the same input, regardless of execution environment or minor code changes.
            </li>
            <li>
              <span className="font-medium">Correctness:</span> Verify that the output is valid JSON and adheres to
              standard formatting rules (indentation, spacing).
            </li>
            <li>
              <span className="font-medium">Regression Prevention:</span> Catch unintended side effects when code is
              modified or updated.
            </li>
            <li>
              <span className="font-medium">Efficiency:</span> Quickly test a wide range of inputs and edge cases that
              would be time-consuming to check manually.
            </li>
            <li>
              <span className="font-medium">Support for Variations:</span> Easily test different formatting options
              (indentation size, sort keys, etc.).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Layers size={24} /> Core Components of the Framework
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            A robust test automation framework for a JSON formatter typically consists of several key parts:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileInput size={20} /> Test Input Generation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">This involves creating a diverse set of JSON inputs.</p>
              <ul className="list-disc pl-6 mt-3 text-gray-700 dark:text-gray-300">
                <li>Valid JSON (simple objects/arrays, nested structures, various data types)</li>
                <li>Invalid JSON (syntax errors, unclosed brackets, missing commas, etc.)</li>
                <li>Edge cases (empty objects/arrays, null values, large numbers, long strings, unicode characters)</li>
                <li>JSON with varying initial whitespace/indentation</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileOutput size={20} /> Expected Output Definition
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                For each valid input, you need to define what the correctly formatted output should look like according
                to the formatter&apos;s rules.
              </p>
              <ul className="list-disc pl-6 mt-3 text-gray-700 dark:text-gray-300">
                <li>Pre-defined strings for smaller cases</li>
                <li>Canonical formatting function (if available and trusted)</li>
                <li>Manual creation of expected outputs for specific tricky cases</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Cog size={20} /> Formatter Under Test Integration
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                A way to programmatically call the formatter function or tool that you want to test, providing the input
                and capturing the output.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Diff size={20} /> Comparison Logic
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The core of the test: comparing the actual output from the formatter with the expected output. This
                requires careful consideration.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow col-span-full">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <TestTube size={20} /> Test Runner and Reporting
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                A system to orchestrate the tests, run them, handle errors (especially for invalid inputs), and report
                results (pass/fail, diffs).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <ArrowUpDown size={24} /> Input Generation Strategies
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Creating varied inputs is key to comprehensive testing.</p>
          <ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Manual Samples:</span> Create a directory of <code>.json</code> files
              representing typical and edge cases. This is simple and effective for specific scenarios.
            </li>
            <li>
              <span className="font-medium">Generated Samples:</span> Use libraries or custom code to generate random or
              structured JSON data, controlling depth, type distribution, and size.
            </li>
            <li>
              <span className="font-medium">Real-world Samples:</span> Use anonymized JSON data from actual applications
              or APIs.
            </li>
            <li>
              <span className="font-medium">Mutation Testing Inputs:</span> Take valid JSON and introduce small,
              controlled errors to test invalid input handling.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Info size={18} /> Example: Basic Test Case Structure (Conceptual)
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-typescript">
                  {`interface TestCase {
  name: string;
  input: string;
  expectedOutput: string;
  isExpectedToFail?: boolean; // For testing invalid inputs
}

const testCases: TestCase[] = [
  {
    name: "Simple Object",
    input: '{"a":1,"b":[2,3]}',
    expectedOutput: \`{
  "a": 1,
  "b": [
    2,
    3
  ]
}\`, // Assuming 2-space indentation
  },
  {
    name: "Empty Array",
    input: '[]',
    expectedOutput: '[]',
  },
  {
    name: "Invalid JSON",
    input: '{"a":',
    expectedOutput: "SyntaxError", // Or specific error message/type
    isExpectedToFail: true,
  },
  // ... more test cases
];`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Diff size={24} /> Comparison Logic: String vs. Structure
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Comparing the actual and expected output strings directly might seem sufficient, but it has limitations. A
            more robust approach compares the underlying data structure (Abstract Syntax Tree or parsed object).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Braces size={20} /> String Comparison
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The simplest method: compare the actual output string character by character with the expected output
            string.
          </p>
          <p className="text-gray-700 dark:text-gray-300 italic">
            <code>actualOutput === expectedOutput</code>
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Pros:</span> Easy to implement. Highlights *exact* differences, including
              whitespace and indentation.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Extremely brittle. A single extra space or newline anywhere
              will cause a test failure, even if the JSON structure is correct. Requires the expected output string to
              be pixel-perfect.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <SplitSquareVertical size={20} /> Structural (Parsed Object) Comparison
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Parse both the actual output string and the expected output string into their native language data
            structures (e.g., JavaScript objects/arrays) and compare these structures recursively.
          </p>
          <p className="text-gray-700 dark:text-gray-300 italic">
            <code>JSON.parse(actualOutput) === JSON.parse(expectedOutput)</code> (conceptually, requires deep
            comparison)
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Pros:</span> Ignores differences in whitespace, indentation, and object key
              order (though JSON formatters often fix key order). Tests if the *content* and *structure* of the
              formatted JSON are correct. Much less brittle than string comparison.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Doesn&apos;t verify the specific formatting (indentation,
              spacing). If the formatter outputs valid JSON but with incorrect indentation, this test might pass
              incorrectly. Requires a trusted JSON parser.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Lightbulb size={20} /> Recommended Approach: Combine Both
          </h3>
          <p className="text-gray-700 dark:text-gray-300">For comprehensive testing, use both methods:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              First, parse both actual and expected outputs and compare the structures. If this fails, the formatter
              produced structurally invalid or incorrect JSON.{" "}
              <CheckCheck size={16} className="inline text-green-500" /> Pass if structures match.
            </li>
            <li>
              If the structures match, then compare the strings directly. This verifies the specific formatting.{" "}
              <CheckCheck size={16} className="inline text-green-500" /> Pass only if strings also match.
            </li>
            <li>
              For invalid inputs, verify that the formatter throws an error and potentially check the error type or
              message. <TriangleAlert size={16} className="inline text-yellow-500" /> Pass if expected error occurs.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <TestTube size={24} /> Implementing the Test Runner
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            A simple test runner can iterate through test cases, execute the formatter, perform comparisons, and report
            results.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileText size={18} /> Example: Conceptual Test Runner Logic
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-typescript">
                  {`// Assuming 'formatJson' is the function being tested
// Assuming 'testCases' array exists from previous example

function runTests(formatJson: (jsonString: string, options?: any) => string): void {
  let passed = 0;
  let failed = 0;

  testCases.forEach(test => {
    console.log(\`\nRunning test: \${test.name}\`);
    try {
      const actualOutput = formatJson(test.input);

      if (test.isExpectedToFail) {
        console.error(\`\u274C FAILED: Test was expected to fail but succeeded.\`);
        failed++;
        return; // Skip comparison for unexpected success
      }

      // 1. Structural Comparison
      let actualParsed, expectedParsed;
      try {
        actualParsed = JSON.parse(actualOutput);
        expectedParsed = JSON.parse(test.expectedOutput);
      } catch (parseError: any) {
        console.error(\`\u274C FAILED (Parse): Could not parse actual or expected output.\`, parseError.message);
        console.log(\`Actual output:\n\${actualOutput}\`);
        console.log(\`Expected output:\n\${test.expectedOutput}\`);
        failed++;
        return;
      }

      // Simple deep comparison (requires helper or library for real world)
      const structuralMatch = JSON.stringify(actualParsed) === JSON.stringify(expectedParsed);

      if (!structuralMatch) {
         console.error(\`\u274C FAILED (Structural): Outputs have different structure.\`);
         console.log(\`Actual parsed:\`, actualParsed);
         console.log(\`Expected parsed:\`, expectedParsed);
         failed++;
         return;
      }

      // 2. String Comparison (if structural match)
      if (actualOutput !== test.expectedOutput) {
        console.error(\`\u274C FAILED (String): Outputs match structurally but not exactly.\`);
        // Implement a diffing utility here for better reporting
        console.log(\`Actual output:\n---\n\${actualOutput}\n---\`);
        console.log(\`Expected output:\n---\n\${test.expectedOutput}\n---\`);
        // A basic diff indicator (conceptual)
        // console.log(getDiff(test.expectedOutput, actualOutput));
        failed++;
      } else {
        console.log(\`\u2705 PASSED.\`);
        passed++;
      }

    } catch (error: any) {
      if (test.isExpectedToFail) {
        console.log(\`\u2705 PASSED (Expected Error): Caught error as expected: \${error.message}\`);
        passed++;
      } else {
        console.error(\`\u274C FAILED (Unexpected Error): \${error.message}\`);
        failed++;
      }
    }
  });

  console.log(\`\n--- Test Summary ---\`);
  console.log(\`Passed: \${passed} \u2705\`);
  console.log(\`Failed: \${failed} \u274C\`);
}

// To run:
// runTests(yourFormatterFunction);`}
                </code>
              </pre>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            This conceptual example uses basic comparisons. A real framework would use a testing library (like Jest,
            Mocha) for structure, assertions, and reporting, and potentially a dedicated diffing library for string
            comparison failures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <TriangleAlert size={24} /> Handling Invalid JSON
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            A robust formatter should handle invalid JSON gracefully, typically by throwing a syntax error. Your tests
            should specifically cover these cases.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Info size={18} /> Example Invalid Input Test Cases
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-typescript">
                  {`// Added to the testCases array
{
  name: "Unclosed Bracket",
  input: '[1, 2, 3',
  expectedOutput: 'SyntaxError', // Expecting an error
  isExpectedToFail: true,
},
{
  name: "Trailing Comma",
  input: '{"a": 1,}', // Invalid in strict JSON
  expectedOutput: 'SyntaxError',
  isExpectedToFail: true,
},
{
  name: "Invalid Escape Sequence",
  input: '"Hello \\uZZZZ"',
  expectedOutput: 'SyntaxError',
  isExpectedToFail: true,
},
// ... more invalid cases
`}
                </code>
              </pre>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            When testing invalid inputs, the assertion is that calling the formatter *throws an error* rather than
            returning a string. You might want to assert the type of error or check if the error message contains
            specific keywords.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <CheckCheck size={24} /> Benefits Beyond Catching Bugs
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Building this framework offers several advantages:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Documentation:</span> The test cases themselves serve as examples of how the
              formatter behaves with various inputs.
            </li>
            <li>
              <span className="font-medium">Refactoring Confidence:</span> You can make significant changes to the
              formatter&apos;s internal logic with confidence, knowing the tests will alert you to regressions.
            </li>
            <li>
              <span className="font-medium">Feature Development:</span> When adding new formatting options (e.g.,
              sorting keys, compact output), you can add specific tests for those features.
            </li>
            <li>
              <span className="font-medium">Performance Testing:</span> The framework can be extended to measure
              formatting time for large inputs.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <X size={24} /> Potential Challenges
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Be aware of potential hurdles:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Defining Expected Output:</span> Manually creating and maintaining expected
              output strings for complex cases can be tedious. Using a trusted reference formatter or a canonical
              generation function helps.
            </li>
            <li>
              <span className="font-medium">Diffing Complexity:</span> Simple string diffs can be hard to read for large
              outputs. Implementing or integrating a sophisticated diffing tool is beneficial.
            </li>
            <li>
              <span className="font-medium">Floating Point Precision:</span> Comparing numbers after parsing can
              sometimes hit floating-point issues if not handled carefully (though less common with standard JSON
              numbers).
            </li>
            <li>
              <span className="font-medium">Performance:</span> Parsing and comparing very large JSON structures can be
              slow; consider performance implications for your test suite.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <FlaskConical size={24} /> Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Building an automated test framework for a JSON formatter is a valuable investment. It ensures the quality,
            consistency, and reliability of your formatter and provides confidence when making changes. By focusing on
            generating diverse inputs, defining clear expected outputs, and using appropriate comparison strategies
            (structural + string), you can create a robust system that saves time and prevents bugs in the long run.
            While the initial setup requires effort, the benefits for maintaining a high-quality formatter are
            significant.
          </p>
        </section>
      </div>
    </>
  );
}
