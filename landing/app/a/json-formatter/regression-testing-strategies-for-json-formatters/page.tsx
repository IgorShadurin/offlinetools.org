import type { Metadata } from "next";
import {
  Repeat,
  Brush,
  AlertTriangle,
  FileInput,
  GitCompare,
  CheckCheck,
  Layers,
  Code,
  Atom,
  InspectionPanel,
  Workflow,
  Rocket,
  Wrench,
  CircleAlert,
  ClipboardCheck,
  Check,
  X,
  Infinity,
  Lightbulb,
  LayoutGrid,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Regression Testing Strategies for JSON Formatters",
  description:
    "Comprehensive guide to regression testing strategies for validating JSON formatter implementations, covering input generation, output comparison, mutation testing, and CI/CD integration.",
};

export default function RegressionTestingJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Repeat className="mr-2 text-blue-500" size={32} />
        Regression Testing Strategies for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the ubiquitous data interchange format. Many applications and libraries
          include components responsible for taking raw JSON data and producing a nicely formatted (pretty-printed)
          string representation. This formatting often involves adding whitespace, indentation, and line breaks to make
          the JSON human-readable. Ensuring that these formatters consistently produce correct and predictable output
          across updates is crucial. This is where <strong>Regression Testing</strong> comes in.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Brush className="mr-2 text-green-500" size={24} />
          What is a JSON Formatter?
        </h2>
        <p>
          A JSON formatter, also known as a pretty-printer, takes a compact JSON string and transforms it into a more
          structured, indented string. For example, transforming:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`&#x7b;&quot;name&quot;:&quot;Alice&quot;,&quot;age&quot;:30,&quot;isStudent&quot;:false,&quot;courses&quot;:[&quot;Math&quot;,&quot;Science&quot;]&#x7d;`}
          </pre>
        </div>
        <p>Into something like:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`&#x7b;
  &quot;name&quot;: &quot;Alice&quot;,
  &quot;age&quot;: 30,
  &quot;isStudent&quot;: false,
  &quot;courses&quot;: [
    &quot;Math&quot;,
    &quot;Science&quot;
  ]
&#x7d;`}
          </pre>
        </div>
        <p>
          The key requirement is that the *parsed* structure of the output must be identical to the *parsed* structure
          of the input. The formatting (whitespace, newlines) can change, but the data and its hierarchy must be
          preserved.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" size={24} />
          Why Regression Test JSON Formatters?
        </h2>
        <p>
          Even seemingly simple formatting logic can break. Changes to the codebase (refactoring, feature additions,
          library updates) can inadvertently introduce bugs that:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Corrupt the output JSON (making it invalid).</li>
          <li>Change the formatting in unexpected ways (e.g., incorrect indentation, extra newlines).</li>
          <li>Fail to handle specific valid JSON structures.</li>
          <li>Cause crashes or performance issues on certain inputs.</li>
        </ul>
        <p>Regression testing ensures that recent changes haven't broken existing, expected behavior.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LayoutGrid className="mr-2 text-purple-500" size={24} />
          Core Regression Testing Strategies
        </h2>
        <p>
          Effective regression testing for formatters involves a combination of strategies focusing on input diversity
          and robust output validation.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileInput className="mr-2 text-orange-500" size={20} />
          1. Input Generation
        </h3>
        <p>The quality of your test suite heavily depends on the variety and complexity of your input JSON strings.</p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <Check className="mr-2 text-green-500" size={18} />
          Standard & Valid JSON
        </h4>
        <p>Start with representative examples of typical JSON structures your formatter will encounter:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Simple key-value pairs.</li>
          <li>Nested objects.</li>
          <li>Arrays with various value types (strings, numbers, booleans, null, nested objects/arrays).</li>
          <li>Empty objects (&#x7b;&#x7d;) and arrays ([]).</li>
          <li>
            JSON with escaped characters in strings (e.g., `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`, `\uXXXX`).
          </li>
          <li>
            Numbers with decimals, exponents, and leading zeros (though JSON standard disallows leading zeros except for
            0 itself).
          </li>
          <li>Long strings or large numbers.</li>
        </ul>
        <p className="flex items-center italic text-sm text-gray-600 dark:text-gray-400">
          <Lightbulb className="mr-1" size={14} />
          Tip: Gather real-world JSON data samples from your application's usage if possible.
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <X className="mr-2 text-red-500" size={18} />
          Invalid JSON
        </h4>
        <p>
          A robust formatter should ideally fail gracefully or handle invalid input according to its specification
          (e.g., throw an error). Test cases should include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Trailing commas in objects or arrays ('[1, 2,]', '&#x7b;&quot;a&quot;: 1,&#x7d;').</li>
          <li>Missing commas between items/pairs.</li>
          <li>Unquoted keys (&#x7b;key: 1&#x7d;).</li>
          <li>Single-quoted strings (&#x7b;&quot;a&quot;: 'value'&#x7d;).</li>
          <li>Invalid escape sequences (`\z;`).</li>
          <li>JSONP wrappers (`callback(&#x7b;&quot;data&quot;: 1&#x7d;);`).</li>
          <li>Unterminated strings, objects, or arrays.</li>
          <li>Non-JSON content.</li>
        </ul>
        <p>
          Verify that the formatter correctly identifies these as errors and doesn't produce invalid or unexpected
          output.
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <Infinity className="mr-2 text-blue-500" size={18} />
          Edge Cases & Stress Tests
        </h4>
        <p>Push the boundaries of your formatter:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Very deeply nested JSON structures (potential stack overflow).</li>
          <li>Very large JSON strings (performance and memory usage).</li>
          <li>JSON with extensive whitespace or lack thereof.</li>
          <li>JSON containing characters from various encodings (UTF-8, etc.).</li>
          <li>
            JSON with duplicate keys in objects (behavior is implementation-defined in the standard, but common
            libraries handle the last one).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <GitCompare className="mr-2 text-orange-500" size={20} />
          2. Output Comparison
        </h3>
        <p>Once the formatter produces output, you need to verify its correctness against an expected output.</p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <CheckCheck className="mr-2 text-green-500" size={18} />
          Exact String Match
        </h4>
        <p>
          The simplest approach is to compare the formatter's output string character-by-character with a pre-defined,
          expected output string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h5 className="text-md font-medium">Example (Conceptual):</h5>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const input = '&#x7b;&quot;a&quot;:1,&quot;b&quot;:[2,&#x7b;&quot;c&quot;:3&#x7d;]&#x7d;';
const expectedOutput = \`&#x7b;
  &quot;a&quot;: 1,
  &quot;b&quot;: [
    2,
    &#x7b;
      &quot;c&quot;: 3
    &#x7d;
  ]
&#x7d;\`;

const actualOutput = yourFormatter(input); // Assume yourFormatter exists

// In test framework (e.g., Jest)
// expect(actualOutput).toBe(expectedOutput);
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Straightforward to implement. Can catch exact formatting regressions (e.g., wrong
          number of spaces).
          <br />
          <strong>Cons:</strong> Very brittle. Any minor, potentially acceptable formatting change (like an extra
          newline at the end) will cause the test to fail. Requires maintaining exact expected output strings for every
          input.
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <Layers className="mr-2 text-blue-500" size={18} />
          Structural Comparison
        </h4>
        <p>
          Instead of comparing strings, parse both the original input and the formatter's output back into data
          structures (like JavaScript objects/arrays) and compare the structures recursively.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h5 className="text-md font-medium">Example (Conceptual):</h5>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const input = '&#x7b;&quot;a&quot;:1,&quot;b&quot;:[2,&#x7b;&quot;c&quot;:3&#x7d;]&#x7d;';
const output = yourFormatter(input);

const parsedInput = JSON.parse(input);
const parsedOutput = JSON.parse(output);

// In test framework (e.g., Jest)
// expect(parsedOutput).toEqual(parsedInput); // Deep comparison of structures`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Much more robust to formatting changes. Tests the core requirement: preservation of
          data structure.
          <br />
          <strong>Cons:</strong> Doesn't test the *formatting* aspect at all. It only verifies that the output is valid
          JSON and represents the same data. You might miss bugs where formatting is incorrect but the data is preserved
          (e.g., wrong indentation levels).
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <Code className="mr-2 text-purple-500" size={18} />
          Canonicalization
        </h4>
        <p>
          A hybrid approach. Define a single, strict "canonical" formatting style (e.g., specific indentation, no
          trailing newlines, sorted keys). After formatting the input using your formatter, re-format its output using a
          trusted, standard formatter (or a known-good version of your own formatter in canonical mode). Then, compare
          the resulting string with the expected canonical string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h5 className="text-md font-medium">Example (Conceptual):</h5>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const input = '&#x7b;&quot;b&quot;:[2,&#x7b;&quot;c&quot;:3&#x7d;],&quot;a&quot;:1&#x7d;'; // Note 'b' before 'a'
const trustedFormatter = (jsonString) => &#x7b; /* ...standard formatting logic, maybe sorts keys... */ return canonicalString; &#x7d;;
const expectedCanonicalOutput = trustedFormatter(input); // Canonical version of the input

const actualFormattedOutput = yourFormatter(input);
const actualCanonicalOutput = trustedFormatter(actualFormattedOutput); // Re-format using the trusted formatter

// In test framework (e.g., Jest)
// expect(actualCanonicalOutput).toBe(expectedCanonicalOutput);
`}
            </pre>
          </div>
        </div>
        <p>
          This verifies that your formatter's output, when standardized, matches the expected standardized output. It's
          a good balance between exact matching and structural checking. A variation is to parse the input, format it
          with your formatter, parse the output, and then format the parsed output again with a *trusted* formatter,
          comparing the two trusted outputs.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Atom className="mr-2 text-orange-500" size={20} />
          3. Mutation & Property-Based Testing
        </h3>
        <p>These advanced techniques can help uncover edge cases you didn't think of.</p>
        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <Atom className="mr-2 text-blue-500" size={18} />
          Mutation Testing
        </h4>
        <p>
          Mutation testing involves making small, targeted changes (mutations) to your *formatter's source code*. For
          each mutation, the test suite is run. If a test *fails* for the mutated code, it means the test was strong
          enough to catch that specific change (the "mutant was killed"). If a test *passes* despite the mutation, it
          indicates a potential gap in your test coverage – your tests didn't detect that the code's behavior changed.
          This helps identify areas of the formatter logic that are insufficiently tested.
        </p>
        <h4 className="text-lg font-semibold mt-4 flex items-center">
          <InspectionPanel className="mr-2 text-blue-500" size={18} />
          Property-Based Testing
        </h4>
        <p>
          Instead of testing specific input-output examples, property-based testing defines *properties* that the
          formatter's output must satisfy for *any* valid JSON input. A testing library (like `jsverify` or `fast-check`
          in JavaScript/TypeScript) generates a large number of diverse, complex JSON inputs automatically. For each
          generated input, the test verifies that the properties hold true for the formatter's output.
        </p>
        <p>Examples of properties for a JSON formatter:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>The output string must be valid JSON.</li>
          <li>Parsing the output must yield a data structure deep-equal to parsing the input.</li>
          <li>
            The output must not contain sequences like `,,`, `[&#x7b;`, `&#x7d;&quot;`, etc. (depending on your specific
            formatting rules).
          </li>
          <li>For valid JSON input, the formatter must not throw an error.</li>
        </ul>
        <p>This can reveal bugs on inputs you would never manually create.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Workflow className="mr-2 text-orange-500" size={20} />
          4. Integration into CI/CD
        </h3>
        <p>To be effective, your regression tests must be run automatically and frequently.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Run tests on every code commit or pull request.</li>
          <li>
            Integrate with CI platforms (GitHub Actions, GitLab CI, Jenkins, etc.) to catch regressions before changes
            are merged.
          </li>
          <li>Consider running performance tests on large inputs as part of CI to detect performance regressions.</li>
        </ul>
        <p className="flex items-center italic text-sm text-gray-600 dark:text-gray-400">
          <Rocket className="mr-1" size={14} />
          Automating tests in CI is key to maintaining formatter quality over time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2 text-cyan-500" size={24} />
          Tools and Libraries
        </h2>
        <p>Leverage existing tools to make testing easier:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Test Runners:</strong> Jest, Mocha, Vitest.
          </li>
          <li>
            <strong>Assertion Libraries:</strong> Built into test runners or separate like Chai.
          </li>
          <li>
            <strong>JSON Parsers:</strong> `JSON.parse()` (built-in), specialized libraries for performance or error
            handling.
          </li>
          <li>
            <strong>Deep Equality Checkers:</strong> Libraries like `lodash.isEqual` or built-in assertions in test
            runners (`toEqual`).
          </li>
          <li>
            <strong>Property-Based Testing Libraries:</strong> `jsverify`, `fast-check`.
          </li>
          <li>
            <strong>Mutation Testing Tools:</strong> Stryker Mutator.
          </li>
          <li>
            <strong>JSON Schema Validators:</strong> To verify output against a schema if applicable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CircleAlert className="mr-2 text-yellow-500" size={24} />
          Challenges
        </h2>
        <p>Testing formatters isn't without its difficulties:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Defining "Correct" Formatting:</strong> If there isn't a strict, single canonical output, exact
            string matching is difficult.
          </li>
          <li>
            <strong>Handling Vendor Extensions:</strong> Some JSON implementations might support non-standard features
            (like comments), which complicates testing.
          </li>
          <li>
            <strong>Performance:</strong> Testing with extremely large or complex JSON can be slow.
          </li>
          <li>
            <strong>Generating Invalid JSON:</strong> Creating a diverse set of invalid JSON inputs that cover all
            possible syntax errors is tricky.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ClipboardCheck className="mr-2 text-green-500" size={24} />
          Conclusion
        </h2>
        <p>
          A robust JSON formatter is a valuable component, and maintaining its correctness requires a solid regression
          testing strategy. By combining diverse input generation (valid, invalid, edge cases), smart output comparison
          techniques (structural, canonicalization), and potentially advanced methods like property-based testing, you
          can build confidence that your formatter remains reliable even as your codebase evolves. Automating these
          tests in your CI/CD pipeline is the final step to ensuring long-term stability and preventing regressions.
        </p>
      </div>
    </>
  );
}
