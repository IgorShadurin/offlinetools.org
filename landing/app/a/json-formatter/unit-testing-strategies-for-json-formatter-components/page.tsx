import type { Metadata } from "next";
import {
  Camera,
  FlaskConical,
  MonitorPlay,
  Box,
  Accessibility,
  Gauge,
  Database,
  CheckCheck,
  Code,
  Bug,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Unit Testing Strategies for JSON Formatter Components | Offline Tools",
  description:
    "Explore effective strategies and techniques for unit testing React/Next.js components that display formatted JSON data.",
};

export default function JsonFormatterTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Unit Testing Strategies for JSON Formatter Components</h1>

      <div className="space-y-6">
        <p>
          JSON formatter components are essential tools for developers, providing a human-readable, often
          syntax-highlighted, view of raw JSON data. Whether it's for debugging API responses, displaying configuration,
          or building developer tools, these components need to be reliable and handle various JSON structures
          gracefully. Testing them effectively is crucial. This article explores common strategies for unit testing
          components designed to format and display JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Code className="w-7 h-7 text-blue-500" />
          <span>What is a JSON Formatter Component?</span>
        </h2>
        <p>
          At its core, a JSON formatter component takes a JSON string or a JavaScript object/array and renders it as
          structured HTML. This usually involves:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Parsing the JSON data.</li>
          <li>Recursively traversing the data structure (objects, arrays, primitives).</li>
          <li>Generating HTML elements to represent keys, values, braces, brackets, commas, etc.</li>
          <li>Applying CSS classes for syntax highlighting (strings, numbers, booleans, null, keys).</li>
          <li>Potentially adding interactive features like collapsing sections.</li>
        </ul>
        <p>The primary goal is accurate and readable representation. Our tests should verify this.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Bug className="w-7 h-7 text-red-500" />
          <span>Why is Testing Crucial?</span>
        </h2>
        <p>JSON formatters deal with potentially complex and deeply nested data. Bugs can easily hide, leading to:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Incorrect rendering (e.g., missing commas, incorrect nesting).</li>
          <li>Broken syntax highlighting.</li>
          <li>Performance issues with large datasets.</li>
          <li>Errors when encountering unexpected data types or structures.</li>
          <li>Accessibility problems.</li>
        </ul>
        <p>Robust testing ensures the component behaves correctly across a wide range of inputs.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Camera className="w-7 h-7 text-green-500" />
          <span>Strategy 1: Snapshot Testing (The Quick Win)</span>
        </h2>
        <p>
          Snapshot testing, often used with Jest, captures the rendered output of your component for a given input and
          saves it as a file. Subsequent test runs compare the current output to the saved snapshot. If they differ, the
          test fails, alerting you to a change.
        </p>
        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Easy to set up.</li>
          <li>Quickly covers the component's output for various inputs.</li>
          <li>Excellent for catching unexpected changes in rendering structure or styling classes.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Snapshots can become large and hard to review.</li>
          <li>They only tell you *what* changed, not *why* it should or shouldn't have changed.</li>
          <li>False positives can occur if intentional changes aren't carefully reviewed and updated.</li>
          <li>Doesn't test interactive behavior (like collapsing sections).</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Example (using Jest and React Testing Library):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>jsonFormatter.test.tsx</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { render, screen } from '@testing-library/react';
import JSONFormatter from './JSONFormatterComponent'; // Assume your component is here

describe('JSONFormatter Snapshot Tests', () => {
  test('renders basic object correctly', () => {
    const json = { "name": "Alice", "age": 30 };
    const { container } = render(<JSONFormatter jsonData={json} />); // Assume it takes jsonData prop
    expect(container).toMatchSnapshot();
  });

  test('renders nested array correctly', () => {
    const json = [ 1, { "nested": ["a", "b"] }, 3 ];
    const { container } = render(<JSONFormatter jsonData={json} />);
    expect(container).toMatchSnapshot();
  });

  test('renders complex data with various types', () => {
    const json = {
      id: 123,
      name: "Product",
      details: null,
      available: true,
      price: 49.99,
      tags: ["electronic", "gadget"],
      config: {
        warranty: "1 year",
        dimensions: {
          width: 10,
          height: 20
        }
      }
    };
    const { container } = render(<JSONFormatter jsonData={json} />);
    expect(container).toMatchSnapshot();
  });

  // Add tests for empty object, empty array, null, primitives directly, etc.
});`}
            </pre>
          </div>
        </div>
        <p>Snapshot testing is a great first line of defense, quickly covering a lot of ground.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <FlaskConical className="w-7 h-7 text-purple-500" />
          <span>Strategy 2: Unit Testing Formatting Logic</span>
        </h2>
        <p>
          Often, the core logic that transforms the JSON data structure into a description of the output (e.g., an array
          of token objects with types and values, or a tree structure ready for rendering) can be separated from the
          React component itself. Testing this pure logic function is highly effective.
        </p>
        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Tests pure functions, making them predictable and easy to isolate.</li>
          <li>Fast to run as it doesn't involve DOM rendering.</li>
          <li>Can test specific formatting rules or edge cases precisely.</li>
          <li>Focuses on the core transformation logic, which is the most complex part.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Doesn't test the actual rendering of the HTML or application of CSS classes.</li>
          <li>Requires the formatting logic to be extracted into a testable unit.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">
          Example (assuming a function <code>formatJsonData</code>):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>formatLogic.test.ts</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume this function exists and returns a structured representation
// e.g., [{ type: 'brace-open', value: '{' }, ...]
import { formatJsonData } from './formatLogic';

describe('formatJsonData Logic Tests', () => {
  test('correctly formats a simple object', () => {
    const data = { "key": "value" };
    const expectedOutput = [
      { type: 'brace-open', value: '{' },
      { type: 'newline' },
      { type: 'indent' },
      { type: 'key', value: '"key"' },
      { type: 'colon', value: ':' },
      { type: 'space' },
      { type: 'string', value: '"value"' },
      { type: 'newline' },
      { type: 'dedent' },
      { type: 'brace-close', value: '}' },
    ];
    expect(formatJsonData(data)).toEqual(expectedOutput);
  });

  test('correctly formats an empty array', () => {
    const data: any[] = [];
    const expectedOutput = [
      { type: 'bracket-open', value: '[' },
      { type: 'bracket-close', value: ']' },
    ];
    expect(formatJsonData(data)).toEqual(expectedOutput);
  });

  test('handles null value correctly', () => {
    const data = { "key": null };
    // ... expected output including 'null' type ...
    expect(formatJsonData(data)).toEqual(expect.arrayContaining([
      { type: 'null', value: 'null' }
    ]));
  });

  test('applies correct indentation for nested objects', () => {
    const data = { "outer": { "inner": 1 } };
    const output = formatJsonData(data);
    // Check for multiple indent/dedent tokens, or specific value positions
    // depending on the structure formatJsonData returns.
    expect(output).toEqual(expect.arrayContaining([
       { type: 'indent' },
       { type: 'key', value: '"inner"' },
       // ... more structure validation ...
    ]));
  });
});`}
            </pre>
          </div>
        </div>
        <p>This strategy provides high confidence in the core formatting rules, independent of the rendering layer.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <MonitorPlay className="w-7 h-7 text-yellow-600" />
          <span>Strategy 3: Integration Testing (Component Rendering)</span>
        </h2>
        <p>
          While snapshot tests check the full DOM tree, integration tests use React Testing Library or similar tools to
          query the rendered output and assert specific properties. This tests that your component correctly translates
          the formatted logic (or directly formats) into the expected HTML structure and applies the correct classes.
        </p>
        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Tests the component's actual rendering behavior.</li>
          <li>Can assert on specific elements, text content, and CSS classes.</li>
          <li>Closer to how a user (or developer) would perceive the output.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Can be more verbose than snapshot tests.</li>
          <li>Might miss subtle rendering issues if not specifically asserted.</li>
          <li>
            Still doesn't cover interactive behavior comprehensively (though Testing Library can help with user events).
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Example (using React Testing Library):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>jsonFormatter.render.test.tsx</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { render, screen } from '@testing-library/react';
import JSONFormatter from './JSONFormatterComponent'; // Assume your component is here

describe('JSONFormatter Rendering Tests', () => {
  test('renders string value with string class', () => {
    const json = { "message": "Hello World" };
    render(<JSONFormatter jsonData={json} />);
    const stringElement = screen.getByText('"Hello World"');
    expect(stringElement).toBeInTheDocument();
    expect(stringElement).toHaveClass('json-string'); // Assuming 'json-string' class for strings
  });

  test('renders number value with number class', () => {
    const json = { "count": 42 };
    render(<JSONFormatter jsonData={json} />);
    const numberElement = screen.getByText('42');
    expect(numberElement).toBeInTheDocument();
    expect(numberElement).toHaveClass('json-number'); // Assuming 'json-number' class for numbers
  });

  test('renders boolean value with boolean class', () => {
    const json = { "status": true };
    render(<JSONFormatter jsonData={json} />);
    const booleanElement = screen.getByText('true');
    expect(booleanElement).toBeInTheDocument();
    expect(booleanElement).toHaveClass('json-boolean'); // Assuming 'json-boolean' class
  });

  test('renders null value with null class', () => {
    const json = { "data": null };
    render(<JSONFormatter jsonData={json} />);
    const nullElement = screen.getByText('null');
    expect(nullElement).toBeInTheDocument();
    expect(nullElement).toHaveClass('json-null'); // Assuming 'json-null' class
  });

  test('renders object keys with key class', () => {
    const json = { "firstName": "John" };
    render(<JSONFormatter jsonData={json} />);
    // Keys might be rendered slightly differently, e.g., followed by colon
    // You might need a more specific selector or check the structure
    const keyElement = screen.getByText('"firstName":', { exact: false }); // Or check parent structure
    expect(keyElement).toBeInTheDocument();
    // This might require inspecting the DOM structure rendered by your component
    // e.g., screen.getByText('"firstName"').closest('.json-key')
  });

  test('renders nested structure correctly (basic check)', () => {
    const json = { "user": { "address": { "city": "Anytown" } } };
    render(<JSONFormatter jsonData={json} />);
    expect(screen.getByText('"city"')).toBeInTheDocument();
    expect(screen.getByText('"Anytown"')).toBeInTheDocument();
    // Deeper structure validation might involve checking parent/child relationships
    // using container.querySelector or more advanced Testing Library queries.
  });

  // Test presence of braces, brackets, commas, colons
  test('renders structural characters', () => {
    const json = { "list": [1, 2] };
    render(<JSONFormatter jsonData={json} />);
    expect(screen.getByText('{')).toBeInTheDocument();
    expect(screen.getByText('}')).toBeInTheDocument();
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();
    expect(screen.getAllByText(',')).toHaveLength(2); // Comma after "list" and after 1
    expect(screen.getByText(':')).toBeInTheDocument();
  });
});`}
            </pre>
          </div>
        </div>
        <p>
          This level of testing provides confidence that the component translates the data into the expected visual
          output, including styling.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Box className="w-7 h-7 text-orange-500" />
          <span>Strategy 4: Testing Edge Cases</span>
        </h2>
        <p>JSON can be simple or complex. Your formatter needs to handle the extremes.</p>
        <h3 className="text-xl font-semibold mt-6">Key Edge Cases to Test:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Empty JSON:</strong> <code>&#x7b;&#x7d;</code> (empty object) and <code>[]</code> (empty array).
          </li>
          <li>
            <strong>Primitives as root:</strong> Testing with just a string (<code>"hello"</code>), number (
            <code>123</code>), boolean (<code>true</code>), or null directly, not wrapped in an object/array.
          </li>
          <li>
            <strong>Deep Nesting:</strong> JSON with many levels of nested objects and arrays to test recursion depth.
          </li>
          <li>
            <strong>Large Objects/Arrays:</strong> Data structures with hundreds or thousands of keys/items to check
            performance and rendering limits.
          </li>
          <li>
            <strong>Special Characters:</strong> Keys or string values containing quotes (<code>&quot;</code>),
            backslashes (<code>\</code>), newlines (<code>\n</code>), unicode characters, etc., ensuring they are
            displayed correctly (often escaped).
          </li>
          <li>
            <strong>JSON with unusual key names:</strong> Keys with spaces, special characters, or starting with numbers
            (though standard JSON keys must be strings, the *string value* can be anything).
          </li>
          <li>
            <strong>Invalid JSON:</strong> While a formatter might not *parse* invalid JSON (often relying on{" "}
            <code>JSON.parse</code>), if your component handles parse errors, test that it displays an appropriate error
            message.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Testing Approach:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use either Snapshot or Integration tests with carefully crafted edge-case data samples.</li>
          <li>For deep nesting or large data, consider generating test data programmatically.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Testing Special Characters (Integration Test)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { render, screen } from '@testing-library/react';
import JSONFormatter from './JSONFormatterComponent';

test('renders special characters correctly in strings and keys', () => {
  const json = { "key with \"quotes\"": "value with \\\\ and \\n newline" };
  render(<JSONFormatter jsonData={json} />);

  // Check if keys and values are rendered including the special characters
  // Note: The actual rendered text might show escaped characters depending on implementation
  // e.g., '"key with \\"quotes\\""' or '"value with \\\\ and \\n newline"'
  expect(screen.getByText(/key with .*quotes.*:/)).toBeInTheDocument();
  expect(screen.getByText(/value with .* and .* newline/)).toBeInTheDocument();
});`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Accessibility className="w-7 h-7 text-teal-500" />
          <span>Strategy 5: Accessibility Testing</span>
        </h2>
        <p>
          For a component primarily displaying information, accessibility might seem less critical than an interactive
          one. However, ensuring good color contrast for syntax highlighting and proper semantic HTML can greatly
          benefit users with visual impairments.
        </p>
        <h3 className="text-xl font-semibold mt-6">What to Test:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Color Contrast:</strong> Use tools (like <code>jest-axe</code>) to automatically check if your
            syntax highlighting colors meet WCAG contrast ratios against the background.
          </li>
          <li>
            <strong>Semantic HTML:</strong> Ensure elements like <code>&lt;span&gt;</code>, <code>&lt;div&gt;</code>, or{" "}
            <code>&lt;pre&gt;</code> are used appropriately. If it includes interactive features (like expand/collapse),
            ensure proper ARIA attributes and keyboard navigation.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">
          Example (using <code>jest-axe</code> with React Testing Library):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>jsonFormatter.a11y.test.tsx</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import JSONFormatter from './JSONFormatterComponent';

expect.extend(toHaveNoViolations);

describe('JSONFormatter Accessibility Tests', () => {
  test('should not have accessibility violations', async () => {
    const json = {
      "name": "Test",
      "value": 123,
      "status": true,
      "list": [null, "item"]
    };
    const { container } = render(<JSONFormatter jsonData={json} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test with dark mode if applicable, or specific color combinations
});`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Gauge className="w-7 h-7 text-cyan-500" />
          <span>Strategy 6: Performance Considerations (and Testing)</span>
        </h2>
        <p>
          While strictly unit testing, performance is more of an integration/e2e concern. However, you can write unit
          tests to check if the component renders very large JSON datasets without crashing or taking excessively long.
        </p>
        <h3 className="text-xl font-semibold mt-6">Testing Approach:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Generate large JSON data structures programmatically (e.g., an array with 10,000 items, or a deeply nested
            object).
          </li>
          <li>
            Use test runners that support performance timings (like Jest's <code>--detectOpenHandles</code> or custom
            timing logic).
          </li>
          <li>
            Render the component with this large data and assert that the test completes within a reasonable time frame.
          </li>
          <li>
            Note: True performance bottlenecks (like browser rendering time) are better caught with browser-based
            performance tools or profiling.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Basic Performance Check</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { render } from '@testing-library/react';
import JSONFormatter from './JSONFormatterComponent';

// Helper to generate large data
const generateLargeArray = (size: number) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({ id: i, name: \`Item \${i}\`, value: Math.random() });
  }
  return arr;
};

describe('JSONFormatter Performance Check', () => {
  test('renders a large array within acceptable time', () => {
    const largeData = generateLargeArray(5000); // 5000 items
    const startTime = performance.now();

    render(<JSONFormatter jsonData={largeData} />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Set an expectation based on acceptable time (e.g., less than 500ms)
    // This threshold will vary based on environment and component complexity
    expect(renderTime).toBeLessThan(1000); // Example: expect rendering under 1 second
  });

  // Add tests for large nested objects, etc.
});`}
            </pre>
          </div>
        </div>
        <p>This test helps catch regressions that might significantly degrade performance for large inputs.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <Database className="w-7 h-7 text-indigo-500" />
          <span>Data Management in Tests: Mocking</span>
        </h2>
        <p>
          For consistent and predictable tests, avoid using real, external data sources. Instead, define your test JSON
          data directly within your test files or import it from dedicated test data files. This is sometimes referred
          to as mocking or stubbing the data input.
        </p>
        <h3 className="text-xl font-semibold mt-6">Tips for Test Data:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Create a dedicated <code>__tests__/data/</code> folder.
          </li>
          <li>
            Use files like <code>basic.json</code>, <code>nested.json</code>, <code>edge-case.json</code>.
          </li>
          <li>Import these JSON files into your tests.</li>
          <li>Ensure your test data covers all primitive types, nesting levels, and edge cases you identified.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-3">
          <CheckCheck className="w-7 h-7 text-green-600" />
          <span>Conclusion</span>
        </h2>
        <p>
          Testing a JSON formatter component involves verifying both the correctness of the underlying
          parsing/formatting logic and the accuracy of the rendered output, including syntax highlighting and structure.
          A combination of strategies provides the best coverage:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Snapshot tests:</strong> For broad coverage and catching unintended DOM changes.
          </li>
          <li>
            <strong>Unit tests (logic):</strong> For precise validation of formatting rules on pure data.
          </li>
          <li>
            <strong>Integration tests (rendering):</strong> To confirm data translates to expected HTML and styling.
          </li>
          <li>
            <strong>Edge case tests:</strong> To ensure robustness against unusual or complex inputs.
          </li>
          <li>
            <strong>Accessibility tests:</strong> To guarantee usability for all.
          </li>
          <li>
            <strong>Basic performance checks:</strong> To guard against significant regressions with large data.
          </li>
        </ul>
        <p>
          By implementing these strategies, you can build confidence in your JSON formatter component, ensuring it
          reliably and accurately displays JSON data for your users.
        </p>
      </div>
    </>
  );
}
