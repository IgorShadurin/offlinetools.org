import type { Metadata } from "next";
import {
  Code,
  CheckCircle2,
  XCircle,
  Bug,
  FileText,
  FileCheck,
  TestTube,
  Lightbulb,
  Gavel,
  Briefcase,
  CodeXml,
  Search,
  Share2,
  Settings2,
  Component,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learning JSON Formatter Integration with Test-Driven Development",
  description:
    "A comprehensive guide to integrating JSON formatting capabilities into your application using Test-Driven Development (TDD). Learn best practices, testing strategies, and implementation details.",
};

export default function JsonFormatterTddArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Learning JSON Formatter Integration with{" "}
        <span className="text-blue-600 dark:text-blue-400">Test-Driven Development</span>
      </h1>

      <div className="space-y-6">
        <p>
          In modern web development, handling JSON data is a ubiquitous task. Whether fetching data from APIs,
          configuring applications, or storing user preferences, JSON is the de facto standard. Ensuring this JSON is
          well-formatted, readable, and valid is crucial for debugging and maintainability. Integrating a robust JSON
          formatter into an application can significantly improve developer experience. This article explores how to
          achieve this integration effectively, leveraging the power of <strong>Test-Driven Development (TDD)</strong>.
        </p>

        <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
          <Lightbulb className="flex-shrink-0 text-yellow-500 mt-1" size={20} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>What is JSON Formatting?</strong> At its core, JSON formatting involves taking a JSON string and
            restructuring it for improved readability. This often means adding whitespace (indentation, newlines) to
            represent the hierarchical structure clearly. It can also involve validating the JSON syntax or providing
            error feedback.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <TestTube size={24} className="text-green-600 dark:text-green-400" /> Why TDD for Formatter Integration?
        </h2>
        <p>
          TDD is a software development process where you write tests for new functionality before you write the code
          itself. It follows a "Red-Green-Refactor" cycle:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Red:</strong> Write a test that fails (because the feature doesn't exist yet).
          </li>
          <li>
            <strong>Green:</strong> Write the minimum code necessary to make the test pass.
          </li>
          <li>
            <strong>Refactor:</strong> Clean up the code, improve its design, and ensure tests still pass.
          </li>
        </ul>
        <p>Applying TDD to JSON formatter integration offers several benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clear Requirements:</strong> Writing tests first forces you to define exactly what the formatter
            should do for various inputs (valid, invalid, edge cases).
          </li>
          <li>
            <strong>Robustness:</strong> Ensures the formatter handles a wide range of JSON structures and potential
            syntax errors gracefully.
          </li>
          <li>
            <strong>Maintainability:</strong> A comprehensive test suite makes it safer to refactor or update the
            formatter logic later.
          </li>
          <li>
            <strong>Confidence:</strong> Passing tests provide high confidence that the integration works as expected.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CodeXml size={24} className="text-gray-600 dark:text-gray-400" /> Understanding JSON Formatters
        </h2>
        <p>A typical JSON formatter might perform several functions:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing:</strong> Converts a JSON string into a native JavaScript object/array structure.
          </li>
          <li>
            <strong>Stringifying (Beautification):</strong> Converts a JavaScript object/array back into a JSON string,
            adding indentation and newlines for readability.
          </li>
          <li>
            <strong>Minification:</strong> Removes unnecessary whitespace to create a compact JSON string.
          </li>
          <li>
            <strong>Validation:</strong> Checks if a string is syntactically valid JSON.
          </li>
        </ul>
        <p>
          While JavaScript's built-in <code>JSON.parse()</code> and <code>JSON.stringify()</code> handle the core
          parsing and stringifying, a formatter often adds a user interface layer, error handling, and specific
          formatting options (like indentation size). TDD will help us build the integration layer around these core
          functions, ensuring our application correctly uses and presents the results.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <TestTube size={24} className="text-blue-600 dark:text-blue-400" /> Setting Up the TDD Workflow
        </h2>
        <p>
          Let's assume you have a component or function responsible for taking a raw JSON string input and producing a
          formatted output or an error message. Using TDD, you'd start by creating a test file.
        </p>
        <p>
          You'll need a testing framework (like Jest, Vitest, Mocha) and possibly a testing utility for React components
          if you're testing the UI integration (like React Testing Library).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <FileCheck size={22} className="text-green-600 dark:text-green-400" /> Step 1: Write a Failing Test (Red)
        </h3>
        <p>Start with the simplest valid case: formatting a basic object.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>formatter.test.ts</code> (Initial - Red)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { formatJson } from './formatter'; // This function doesn't exist yet!

describe('JSON Formatter', () => {
  test('should format a simple valid JSON object', () => {
    const rawJson = '&#x7b;"name":"Alice","age":30&#x7d;';
    const expectedFormattedJson = \`&#x7b;
  "name": "Alice",
  "age": 30
&#x7d;\`; // Assuming 2-space indentation

    const result = formatJson(rawJson);

    expect(result.formattedString).toBe(expectedFormattedJson);
    expect(result.error).toBeNull(); // Expecting no error
  });
});`}
            </pre>
          </div>
        </div>
        <p>
          Running this test will fail because the <code>formatJson</code> function doesn't exist, or if it exists, it
          won't return the expected structure or formatted string. This is the "Red" phase.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code size={22} className="text-purple-600 dark:text-purple-400" /> Step 2: Write Minimum Code to Pass (Green)
        </h3>
        <p>
          Now, write just enough code in <code>formatter.ts</code> to make that first test pass.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>formatter.ts</code> (Minimum Code - Green)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Basic implementation
export function formatJson(jsonString: string): &#x7b; formattedString: string | null; error: string | null &#x7d; {
  try {
    // Use built-in JSON.parse and stringify for core logic
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, 2); // 2-space indentation
    return &#x7b; formattedString: formatted, error: null &#x7d;;
  } catch (e: any) {
    // Minimal error handling for now
    return &#x7b; formattedString: null, error: e.message &#x7d;;
  }
}`}
            </pre>
          </div>
        </div>
        <p>Run the test again. It should now pass. You've reached the "Green" phase.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Settings2 size={22} className="text-blue-600 dark:text-blue-400" /> Step 3: Refactor (Optional but
          Recommended)
        </h3>
        <p>
          For this simple case, not much refactoring is needed immediately. However, as you add more tests and the
          function grows, you might refactor to improve readability, error handling structure, or add options.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <TestTube size={24} className="text-blue-600 dark:text-blue-400" /> Writing More Tests: Covering Edge Cases
        </h2>
        <p>
          Now, continue the Red-Green-Refactor cycle by adding tests for various scenarios your formatter should handle.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <XCircle size={22} className="text-red-600 dark:text-red-400" /> Testing Invalid JSON
        </h3>
        <p>The formatter should detect and report invalid JSON.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>formatter.test.ts</code> (Adding Invalid JSON Test - Red)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ... previous tests ...

  test('should return an error for invalid JSON', () => {
    const rawJson = '&#x7b;"name":"Alice",age:30&#x7d;'; // Missing quotes around age key

    const result = formatJson(rawJson);

    expect(result.formattedString).toBeNull(); // Expecting no formatted output
    expect(result.error).not.toBeNull();    // Expecting an error message
    // You might add more specific error message checks depending on your requirement
    expect(result.error).toContain('Unexpected token'); // Example check
  });`}
            </pre>
          </div>
        </div>
        <p>
          Our current <code>formatJson</code> already includes a basic try-catch, so this test might immediately pass
          (Green). If it didn't, we'd add the necessary error handling.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle2 size={22} className="text-green-600 dark:text-green-400" /> Testing Different JSON Types
        </h3>
        <p>Test arrays, nested objects, values like null, boolean, numbers, strings with special characters, etc.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>formatter.test.ts</code> (Adding More Valid Cases - Red)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ... previous tests ...

  test('should format a simple valid JSON array', () => {
    const rawJson = '[1,true,null,"test"]';
    const expectedFormattedJson = \`[
  1,
  true,
  null,
  "test"
]\`;
    const result = formatJson(rawJson);
    expect(result.formattedString).toBe(expectedFormattedJson);
    expect(result.error).toBeNull();
  });

  test('should format nested JSON structures', () => {
    const rawJson = '&#x7b;"user":&#x7b;"name":"Bob","address":&#x7b;"city":"London"&#x7d;&#x7d;&#x7d;';
    const expectedFormattedJson = \`&#x7b;
  "user": &#x7b;
    "name": "Bob",
    "address": &#x7b;
      "city": "London"
    &#x7d;
  &#x7d;
&#x7d;\`;
    const result = formatJson(rawJson);
    expect(result.formattedString).toBe(expectedFormattedJson);
    expect(result.error).toBeNull();
  });

  test('should handle empty object and array', () => {
    const emptyObject = '{}';
    const emptyArray = '[]';
    expect(formatJson(emptyObject).formattedString).toBe('{}');
    expect(formatJson(emptyArray).formattedString).toBe('[]');
  });

  // Add tests for numbers, booleans, null, strings with escapes, etc.
});`}
            </pre>
          </div>
        </div>
        <p>
          For each new test that fails (Red), add just enough code to make it pass (Green), and then Refactor. Using{" "}
          <code>JSON.stringify(parsed, null, 2)</code> correctly handles most standard formatting, so many of these
          tests might pass directly. The value of TDD here is ensuring your <em>wrapper function</em>
          correctly uses <code>JSON.parse</code> and <code>JSON.stringify</code> and handles their outputs/errors as
          expected by your application's requirements.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Bug size={22} className="text-red-600 dark:text-red-400" /> Testing Edge Cases
        </h3>
        <p>What about:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Empty string input?</li>
          <li>Whitespace-only string input?</li>
          <li>JSON with very deep nesting (potential stack overflow, though less likely with built-in JSON)?</li>
          <li>JSON with unusually large numbers or long strings?</li>
        </ul>
        <p>Add tests for these to see how your formatter behaves and adjust if necessary.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Briefcase size={24} className="text-teal-600 dark:text-teal-400" /> Integrating into the Application
        </h2>
        <p>
          Once your core formatting function is robust (backed by tests), integrate it into your UI or backend logic.
          Again, TDD is beneficial here. Identify the component or function that will call <code>formatJson</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <TestTube size={22} className="text-green-600 dark:text-green-400" /> Testing the Integration Logic (Red)
        </h3>
        <p>
          Let's imagine a simple function that takes a raw string, formats it, and returns an object with either the
          formatted string or an error message for display.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>jsonDisplayHelper.test.ts</code> (Integration Test - Red)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { processAndFormatJson } from './jsonDisplayHelper'; // New helper function

describe('JSON Display Helper', () => {
  test('should return formatted string for valid JSON', () => {
    const rawInput = '&#x7b;"status":"ok"&#x7d;';
    // Assuming formatJson is mocked or already thoroughly tested
    // and we expect the helper to just pass its result through
    const expectedFormatted = \`&#x7b;
  "status": "ok"
&#x7d;\`;

    const result = processAndFormatJson(rawInput);

    expect(result.displayString).toBe(expectedFormatted);
    expect(result.isError).toBe(false);
    expect(result.errorMessage).toBeNull();
  });

  test('should return error details for invalid JSON', () => {
    const rawInput = '&#x7b;"status":"ok"'; // Incomplete JSON

    const result = processAndFormatJson(rawInput);

    expect(result.displayString).toBeNull();
    expect(result.isError).toBe(true);
    expect(result.errorMessage).not.toBeNull();
    expect(result.errorMessage).toContain('Unexpected end of JSON input'); // Or specific error
  });

  // Add tests for empty string, etc.
});`}
            </pre>
          </div>
        </div>
        <p>
          These tests define the expected output structure for your application's display layer. They will fail because{" "}
          <code>processAndFormatJson</code> doesn't exist or work correctly yet.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code size={22} className="text-purple-600 dark:text-purple-400" /> Writing Integration Code (Green)
        </h3>
        <p>
          Now, write the <code>processAndFormatJson</code> function using your previously tested <code>formatJson</code>
          .
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            <code>jsonDisplayHelper.ts</code> (Integration Code - Green)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { formatJson } from './formatter';

export function processAndFormatJson(rawInput: string): &#x7b; displayString: string | null; isError: boolean; errorMessage: string | null &#x7d; {
  if (!rawInput.trim()) {
    // Handle empty/whitespace input specifically if needed
    return &#x7b; displayString: '', isError: false, errorMessage: null &#x7d;;
  }

  const &#x7b; formattedString, error &#x7d; = formatJson(rawInput);

  if (error) &#x7b;
    return &#x7b; displayString: null, isError: true, errorMessage: error &#x7d;;
  &#x7d; else &#x7b;
    // Check if formattedString is null for some reason (though formatJson should return string or null)
    return &#x7b; displayString: formattedString, isError: false, errorMessage: null &#x7d;;
  &#x7d;
}`}
            </pre>
          </div>
        </div>
        <p>
          Run the integration tests. They should now pass. You've successfully integrated your tested formatter function
          into a higher-level helper function, driven by tests.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Share2 size={22} className="text-green-600 dark:text-green-400" /> Integrating into a Component/Page
        </h3>
        <p>
          Finally, in your TSX page component (like this one, conceptually), you would call{" "}
          <code>processAndFormatJson</code>. Since this example page must be static and cannot use <code>useState</code>{" "}
          or dynamic data, a real interactive application would typically manage the input string and the result object
          (<code>displayString</code>, <code>isError</code>, <code>errorMessage</code>) in component state or a data
          management solution.
        </p>
        <p>
          For a static page like this article, we can only demonstrate the concept using static code blocks and
          descriptions. In a dynamic Next.js application with client-side features enabled, you'd have an input area and
          display area, using state to update the output based on user input and the formatter's result.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} className="text-purple-600 dark:text-purple-400" /> Benefits in Review
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle2 size={18} className="inline mr-2 text-green-500" />
            Each part of the logic (core formatting, input handling, error presentation) is tested in isolation and in
            combination.
          </li>
          <li>
            <CheckCircle2 size={18} className="inline mr-2 text-green-500" />
            You have clear, executable documentation (the tests) of how the formatter should behave.
          </li>
          <li>
            <CheckCircle2 size={18} className="inline mr-2 text-green-500" />
            Refactoring the formatting logic or changing libraries becomes less risky because the test suite will
            immediately highlight any breaking changes.
          </li>
          <li>
            <CheckCircle2 size={18} className="inline mr-2 text-green-500" />
            Helps define the API/interface of your formatting module clearly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileText size={24} className="text-gray-600 dark:text-gray-400" /> Beyond Basic Formatting
        </h2>
        <p>As your requirements grow, TDD helps you add complexity predictably:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Options:</strong> Add tests for formatting with different indentation sizes (2 spaces, 4 spaces,
            tabs), sorting keys, etc. Modify <code>formatJson</code> to accept an options object, driven by tests for
            each option.
          </li>
          <li>
            <strong>Error Highlighting:</strong> If you need to show *where* in the string the JSON is invalid, you
            might use a more advanced parser or library. Tests would define the expected structure of the error output
            (e.g., line number, column number).
          </li>
          <li>
            <strong>Minification:</strong> Add a separate test suite and function for minification using{" "}
            <code>JSON.stringify(parsed)</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Gavel size={24} className="text-yellow-600 dark:text-yellow-400" /> Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Library Choice:</strong> For production applications, you'll likely use battle-tested libraries
            (like the native <code>JSON</code> object or potentially more feature-rich ones if needed). TDD helps ensure
            you use the library correctly and integrate it into your application's flow, rather than reinventing the
            core parsing/stringifying.
          </li>
          <li>
            <strong>Performance:</strong> For extremely large JSON inputs, formatting can be computationally expensive.
            While TDD helps with correctness, you might need separate performance testing or profiling if this becomes
            an issue.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component size={24} className="text-teal-600 dark:text-teal-400" /> Conclusion
        </h2>
        <p>
          Integrating a JSON formatter is a common development task. By adopting Test-Driven Development, you approach
          this task systematically, building a robust, well-tested, and maintainable part of your application. Starting
          with failing tests for core functionality, then edge cases, and finally the integration points, ensures high
          quality and confidence in your JSON handling code. The resulting test suite serves as a living document of
          your formatter's capabilities and limitations.
        </p>
      </div>
    </>
  );
}
