import type { Metadata } from "next";
import { Check, BugOff, Layers, FlaskConical, Code, Lightbulb, Wrench, TestTube, AlertCircle } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Test-Driven Development for JSON Formatter Features | Offline Tools",
  description:
    "Explore how Test-Driven Development (TDD) can be applied effectively to build robust and reliable JSON formatter features.",
};

export default function TddJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <TestTube className="mr-3 text-blue-500" size={32} /> Test-Driven Development for JSON Formatter Features
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          Building a reliable JSON formatter isn't just about pretty-printing. It's about correctly handling various
          data types, nested structures, whitespace, edge cases, and crucially, invalid input without crashing. This is
          where Test-Driven Development (TDD) shines. TDD provides a structured approach to ensure that each feature of
          your formatter works exactly as expected, preventing bugs before they even appear.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="mr-2 text-yellow-500" /> What is TDD? (The Red-Green-Refactor Cycle)
        </h2>
        <p>
          TDD is a software development process where you write automated tests *before* writing the code they are meant
          to test. The process follows a simple cycle:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold text-red-600 dark:text-red-400">Red:</span> Write a small test that fails
            because the feature it tests doesn't exist yet or doesn't work correctly.
          </li>
          <li>
            <span className="font-semibold text-green-600 dark:text-green-400">Green:</span> Write the minimum amount of
            code required to make the failing test pass. The goal here is just to pass the test, not perfect code.
          </li>
          <li>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Refactor:</span> Improve the code you just
            wrote. Clean it up, make it more efficient, readable, and maintainable, while ensuring all tests (including
            the new one) still pass.
          </li>
        </ul>
        <p>You repeat this cycle for each small piece of functionality until the formatter is complete.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="mr-2 text-teal-500" /> Why TDD for a JSON Formatter?
        </h2>
        <p>JSON seems simple, but formatting involves many subtle details:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Handling various data types (&#x60;string&#x60;, &#x60;number&#x60;, &#x60;boolean&#x60;, &#x60;null&#x60;).
          </li>
          <li>Correctly indenting nested objects (&#x60;&#x7b;&#x7d;&#x60;) and arrays (&#x60;[]&#x60;).</li>
          <li>Placing commas correctly after elements.</li>
          <li>Formatting keys and values (e.g., ensuring string keys are quoted).</li>
          <li>Dealing with empty objects, empty arrays, and nested empty structures.</li>
          <li>Handling whitespace within the original input (which should often be ignored).</li>
          <li>Validating input and providing clear error messages for invalid JSON.</li>
          <li>Optional features like sorting keys alphabetically.</li>
        </ul>
        <p>
          Each of these is a potential source of bugs. TDD forces you to consider these cases upfront and build a robust
          solution incrementally, with a safety net of tests.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FlaskConical className="mr-2 text-purple-500" /> TDD Cycle: Examples for a JSON Formatter
        </h2>

        <h3 className="text-xl font-semibold mt-6">Feature 1: Basic Indentation (Level 1)</h3>
        <p>Let's start simple: formatting a flat object with two key-value pairs.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-red-600 dark:text-red-400">Red:</span> Write the failing test
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`describe('JSON Formatter - Basic Indentation', () => {
  it('should format a simple flat object with 2-space indentation', () => {
    const input = '{"name":"Alice","age":30}';
    const expectedOutput = \`{
  "name": "Alice",
  "age": 30
}\`;
    expect(formatJson(input, 2)).toBe(expectedOutput);
  });
});`}
            </code>
          </pre>
          <p className="mt-2">
            Running this test now will fail, as &#x60;formatJson&#x60; likely doesn't exist or doesn't produce the
            expected output yet.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-green-600 dark:text-green-400">Green:</span> Write just enough code
          </h4>
          <p>
            Implement a basic parser and formatter that can handle a simple flat object, focusing *only* on making the
            above test pass. Don't worry about nested structures, arrays, or other types yet. Your initial
            &#x60;formatJson&#x60; might be very crude.
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`// In formatter.ts
function formatJson(jsonString: string, indentSpaces: number): string {
  // A very basic implementation just to pass the first test
  // This needs a proper parser ideally, but for GREEN phase,
  // a simple string manipulation might suffice temporarily IF it passes the test.
  // A real implementation would parse first. Let's assume a basic parse function exists.
  try {
    const obj = JSON.parse(jsonString); // Use built-in parser for simplicity in example
    return JSON.stringify(obj, null, indentSpaces); // Built-in stringify with indentation
  } catch (e) {
    throw new Error("Invalid JSON input");
  }
}

// This function is now enough to make the specific test above pass.
// (Note: Using built-in JSON.parse/stringify is cheating for building a *custom* formatter,
// but illustrates the GREEN step conceptually - write *anything* that makes the test pass).
// A true custom formatter would replace JSON.parse/stringify with its own logic.`}
            </code>
          </pre>
          <p className="mt-2">
            Run the test again. It should now pass. <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Refactor:</span> Improve the code
          </h4>
          <p>
            The current implementation uses &#x60;JSON.parse&#x60; and &#x60;JSON.stringify&#x60;, which isn't what
            you'd do if building a formatter from scratch. In a real scenario, the refactor phase might involve:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Structuring the formatter logic (e.g., using a tokenizer and a recursive formatter function).</li>
            <li>Improving variable names or code clarity.</li>
            <li>Preparing the code structure for handling more complex cases easily.</li>
          </ul>
          <p className="mt-2">
            After refactoring, run the test again to ensure you haven't broken anything.
            <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Feature 2: Handling Nested Objects</h3>
        <p>Now, add a test for a slightly more complex structure.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-red-600 dark:text-red-400">Red:</span> New failing test
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`describe('JSON Formatter - Nested Structures', () => {
  it('should format a nested object correctly', () => {
    const input = '{"user":{"name":"Bob","address":{"city":"London"}}}';
    const expectedOutput = \`{
  "user": {
    "name": "Bob",
    "address": {
      "city": "London"
    }
  }
}\`;
    expect(formatJson(input, 2)).toBe(expectedOutput);
  });
});`}
            </code>
          </pre>
          <p className="mt-2">This new test will fail if your formatter only handled flat structures.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-green-600 dark:text-green-400">Green:</span> Implement nesting logic
          </h4>
          <p>
            Modify your &#x60;formatJson&#x60; (or the underlying formatting functions) to recursively handle nested
            objects, increasing the indentation level for each nested level. Write *just enough* code to make this
            specific test pass.
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`// Inside formatJson or a helper formatter function...
// You'd add logic to detect nested objects/arrays and call
// the formatting logic recursively with an increased indent level.
// e.g., a function like formatValue(value, currentIndentLevel)`}
            </code>
          </pre>
          <p className="mt-2">
            Run *all* tests. The new nested test should pass, and the previous flat object test must still pass.{" "}
            <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Refactor:</span> Clean up nesting code
          </h4>
          <p>
            Refine the recursive formatting logic. Ensure indentation is calculated correctly. Make sure it handles
            commas properly for the last element in a nested object. Run all tests again.{" "}
            <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Feature 3: Handling Arrays and Mixed Types</h3>
        <p>Add tests for arrays, nested arrays, and objects containing arrays, and different data types.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-red-600 dark:text-red-400">Red:</span> Add array and type tests
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`describe('JSON Formatter - Arrays and Types', () => {
  it('should format a simple array', () => {
    const input = '[1,"two",true,null]';
    const expectedOutput = \`[
  1,
  "two",
  true,
  null
]\`;
    expect(formatJson(input, 2)).toBe(expectedOutput);
  });

  it('should format an object containing an array', () => {
    const input = '{"list":[1,2,{"item":3}]}';
    const expectedOutput = \`{
  "list": [
    1,
    2,
    {
      "item": 3
    }
  ]
}\`;
    expect(formatJson(input, 2)).toBe(expectedOutput);
  });

  it('should handle different data types correctly', () => {
    const input = '{"num":123.45,"bool":false,"nil":null,"str":"hello"}';
    const expectedOutput = \`{
  "num": 123.45,
  "bool": false,
  "nil": null,
  "str": "hello"
}\`;
    expect(formatJson(input, 2)).toBe(expectedOutput);
  });
});`}
            </code>
          </pre>
          <p className="mt-2">These new tests will fail.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-green-600 dark:text-green-400">Green:</span> Implement array and type
            handling
          </h4>
          <p>
            Update your formatter to recognize arrays (&#x60;[]&#x60;), iterate through their elements, handle commas,
            and apply correct indentation. Ensure it can distinguish and format numbers, booleans, and null correctly
            (they don't need quotes like strings).
          </p>
          <p className="mt-2">
            Run all tests. They should all pass now. <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Refactor:</span> Refine array and type
            logic
          </h4>
          <p>
            Review the array formatting code. Is the comma logic clean? Is the type detection robust? Can the value
            formatting be improved? Run all tests to confirm. <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Feature 4: Handling Invalid JSON</h3>
        <p>A formatter must gracefully handle bad input.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-red-600 dark:text-red-400">Red:</span> Test for invalid input
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`describe('JSON Formatter - Error Handling', () => {
  it('should throw an error for invalid JSON', () => {
    const input = '{"name":"Alice", age:30}'; // Missing quotes around 'age'
    expect(() => formatJson(input, 2)).toThrow('Invalid JSON input'); // Or a more specific error message
  });

  it('should throw an error for non-JSON string', () => {
    const input = 'just plain text';
    expect(() => formatJson(input, 2)).toThrow('Invalid JSON input');
  });
});`}
            </code>
          </pre>
          <p className="mt-2">
            These tests should fail if your formatter doesn't have input validation, or if it crashes instead of
            throwing a controlled error.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-green-600 dark:text-green-400">Green:</span> Add validation
          </h4>
          <p>
            Add validation at the beginning of your &#x60;formatJson&#x60; function. A simple approach is to use a
            &#x60;try...catch&#x60; block around the parsing step.
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`function formatJson(jsonString: string, indentSpaces: number): string {
  try {
    // Attempt to parse the string first
    const parsed = JSON.parse(jsonString); // Or use your custom parser
    // If parsing succeeds, proceed to format the parsed object/array
    return myCustomFormatLogic(parsed, indentSpaces);
  } catch (e) {
    // If parsing fails, throw a user-friendly error
    throw new Error("Invalid JSON input");
  }
}`}
            </code>
          </pre>
          <p className="mt-2">
            Run all tests. The new error tests should pass, and existing tests should still pass (as valid JSON is
            handled). <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Refactor:</span> Improve error reporting
          </h4>
          <p>
            Can you make the error message more specific? Include the line or column number where the parsing failed?
            This would require integrating error reporting into your custom parser (if not using
            &#x60;JSON.parse&#x60;). Run tests again. <Check className="inline text-green-500 ml-1" size={18} />
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-orange-500" /> More Test Ideas (Edge Cases & Features)
        </h2>
        <p>As you continue, consider writing tests for:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Empty objects: &#x7b;&#x7d;</li>
          <li>Empty arrays: []</li>
          <li>Nested empty objects/arrays: &#x7b;"a":&#x7b;&#x7d;,"b":[]&#x7d;</li>
          <li>
            JSON that is just a primitive (number, string, boolean, null): &#x60;"hello"&#x60;, &#x60;123&#x60;,
            &#x60;true&#x60;, &#x60;null&#x60;
          </li>
          <li>Different indentation levels (e.g., 4 spaces, tabs) - parameterize your tests.</li>
          <li>
            JSON strings containing escaped characters (&#x60;\n&#x60;, &#x60;\"&#x60;, &#x60;\\&#x60;,
            &#x60;\uXXXX&#x60;).
          </li>
          <li>Very large numbers or numbers with high precision.</li>
          <li>
            Extremely deeply nested structures (might require adjusting recursion limits if not using a stack-based
            approach).
          </li>
          <li>Input with leading/trailing whitespace.</li>
          <li>Optional features like sorting object keys alphabetically.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2 text-gray-500" /> Benefits of this TDD Approach
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">Forces Clear Requirements:</span> Writing the test first makes you define
            exactly what the code should do.
          </li>
          <li>
            <span className="font-semibold">Reduces Bugs:</span> You catch issues early, especially edge cases you might
            otherwise miss. <BugOff className="inline ml-1" size={18} />
          </li>
          <li>
            <span className="font-semibold">Provides a Safety Net:</span> When you refactor or add new features, you can
            run all previous tests to ensure nothing is broken.
          </li>
          <li>
            <span className="font-semibold">Improves Design:</span> Code written with testability in mind often has a
            cleaner, more modular design.
          </li>
          <li>
            <span className="font-semibold">Increases Confidence:</span> A comprehensive suite of passing tests gives
            you confidence that your formatter works correctly. <Check className="inline ml-1" size={18} />
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="mr-2 text-red-500" /> Potential Pitfalls
        </h2>
        <p>While beneficial, be mindful of:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">Testing Implementation vs. Behavior:</span> Focus tests on *what* the
            formatter outputs for a given input, not *how* it generates the output (e.g., don't test internal private
            methods unless necessary).
          </li>
          <li>
            <span className="font-semibold">Test Granularity:</span> Keep tests small and focused on a single aspect or
            feature.
          </li>
          <li>
            <span className="font-semibold">Over-testing Trivial Code:</span> Sometimes simple code doesn't need a
            complex test, but for something with many interactions and edge cases like a formatter, testing is high
            value.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Applying Test-Driven Development to building a JSON formatter is an excellent way to approach a problem with
          numerous small requirements and potential edge cases. By following the Red-Green-Refactor cycle and
          systematically adding tests for each feature and data type, you can build a robust, reliable, and maintainable
          formatting tool with confidence. The test suite becomes living documentation of your formatter's capabilities.
        </p>
      </div>
    </>
  );
}
