import type { Metadata } from "next";
import { Check, X, AlertCircle, FileJson2, ListChecks, BookOpenText, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating JSON Fixtures for Formatter Validation | Offline Tools",
  description:
    "Build better JSON fixtures for formatter validation with valid, invalid, and interoperability cases, plus a practical test structure.",
};

export default function JsonFormatterTestFixturesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ListChecks className="size-8" /> Creating Test Fixtures for JSON Formatter Validation
      </h1>

      <div className="space-y-6">
        <p>
          If you are testing a JSON formatter, you need more than a handful of pretty examples. A useful fixture set
          proves three things: valid JSON is accepted, invalid JSON fails for the right reason, and awkward edge cases
          do not quietly corrupt output.
        </p>
        <p>
          The fastest way to get there is to build a small, named JSON fixture catalog with clear expectations for
          formatting, parsing, and failure behavior. That matters because{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            RFC 8259
          </a>{" "}
          allows any JSON value at the top level, recommends unique object member names, and notes that some parsers
          ignore a UTF-8 BOM. Those details shape which fixtures should be strict pass/fail cases and which belong in
          an interoperability bucket.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Boxes className="size-6" /> Start with a Fixture Contract
        </h2>
        <p>
          Before you collect examples, decide what every fixture must declare. That keeps your tests readable and stops
          ad hoc edge cases from turning into brittle snapshots.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Recommended minimum shape</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`type JsonFixture = {
  id: string;
  bucket: "valid" | "invalid" | "interop";
  input: string;
  expectedFormatted?: string;
  expectedValue?: unknown;
  expectedError?: {
    type: "SyntaxError";
    line?: number;
    column?: number;
    messageIncludes?: string;
  };
  notes?: string;
};`}
            </pre>
          </div>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use exact formatted output</strong> when your formatter guarantees a canonical style such as
            2-space indentation and trailing newline behavior.
          </li>
          <li>
            <strong>Store parsed value expectations</strong> when semantic equality matters more than whitespace.
          </li>
          <li>
            <strong>Avoid pinning full runtime error messages</strong> unless your own library guarantees them. Error
            wording varies across engines and versions.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="size-6" /> Use Three Fixture Buckets
        </h2>
        <p>
          A strong JSON fixture collection is easier to maintain when you separate normal success cases from clear
          failures and parser-specific gray areas.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check className="size-5 text-green-600" /> 1. Valid Fixtures
        </h3>
        <p>
          These should succeed in every standards-compliant parser and formatter. Include both common application data
          and spec-level coverage.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Useful valid fixtures</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{ "name": "Alice", "age": 30 }

[1, 2, 3, false, null, "hello"]

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
  "escaped": "quote: \\" slash: \\\\ newline: \\n tab: \\t",
  "unicode": "\\u0041\\u0042\\u2603",
  "numberInt": 123,
  "numberFloat": -45.67e+8
}

"top-level string"
12345
true
null`}
            </pre>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <FileJson2 className="size-4" /> Top-level primitives are valid JSON text under RFC 8259, so include them
            in your passing fixtures.
          </p>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Include empty objects, empty arrays, nested arrays, and deep nesting that reflects your real limits.</li>
          <li>Cover control-character escapes, Unicode escapes, and mixed whitespace around commas and colons.</li>
          <li>Prefer unique object member names in strict success fixtures so the expected output stays unambiguous.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <X className="size-5 text-red-600" /> 2. Invalid Fixtures
        </h3>
        <p>
          These should fail cleanly. They are the fixtures that catch accidental support for JavaScript object literals,
          comments, or lossy number handling.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Useful invalid fixtures</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{ "a": 1, "b": 2, }

[1, 2, 3,]

{ "a" 1 }

{ "a": 1 "b": 2 }

{ key: 1 }

{ 'a': 1 }

{ "a": 01 }

{ "value": NaN }

{ "value": Infinity }

{ "a": "hello\\x" }

{ "a": "line1
line2" }

[1 2]

{ "a": 1 } extra_text`}
            </pre>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <AlertCircle className="size-4" /> Raw newlines inside strings, leading zeroes, <code>NaN</code>,
            <code>Infinity</code>, single quotes, and unquoted keys are not valid JSON.
          </p>
        </div>
        <p>
          Keep invalid fixtures as raw text files instead of importing them as JSON modules. That lets you preserve
          broken syntax exactly as the formatter will receive it.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertCircle className="size-5 text-amber-600" /> 3. Interoperability Fixtures
        </h3>
        <p>
          Some inputs matter because real parsers disagree. Treat these as their own bucket so you can document the
          behavior you want instead of pretending the specification settles every detail.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Examples to isolate</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{ "dup": 1, "dup": 2 }

\\uFEFF{ "bomPrefixed": true }

{ "hugeExponent": 1E400 }

{ "surrogatePair": "\\uD834\\uDD1E" }`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Duplicate keys are discouraged by RFC 8259 because receiver behavior is unpredictable, and BOM-prefixed
            input may be ignored by some parsers. Large-number handling is another common source of cross-runtime
            surprises.
          </p>
        </div>
        <p>
          The open-source{" "}
          <a
            href="https://github.com/nst/JSONTestSuite"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSONTestSuite
          </a>{" "}
          is useful here because it groups cases into <code>y_</code> (must parse), <code>n_</code> (must fail), and{" "}
          <code>i_</code> (implementation-dependent) files. That naming scheme works well for your own JSON fixtures
          too.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="size-6" /> Organize Fixtures for Raw Input and Expected Output
        </h2>
        <p>
          Separate the raw input from the expectation metadata. That avoids accidental cleanup by editors and makes it
          obvious which files are safe to pretty-print.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Suggested layout</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`test/fixtures/
  valid/
    simple-object.input.json
    simple-object.expected.json
    top-level-string.input.json
    top-level-string.expected.txt
  invalid/
    trailing-comma.input.txt
    trailing-comma.error.json
    unquoted-key.input.txt
    unquoted-key.error.json
  interop/
    duplicate-keys.input.txt
    duplicate-keys.notes.json
    utf8-bom.input.bin
    utf8-bom.notes.json`}
            </pre>
          </div>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use <code>.input.txt</code> for invalid fixtures</strong> so tools do not try to parse or reformat
            them.
          </li>
          <li>
            <strong>Store formatted expectations separately</strong> when your formatter normalizes whitespace or adds a
            trailing newline.
          </li>
          <li>
            <strong>Keep notes for interop fixtures</strong> so the reason for each parser-specific case is preserved.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpenText className="size-6" /> Example Test Structure
        </h2>
        <p>
          You do not need a complicated harness. Start with one loop that runs every fixture and branches by bucket.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Vitest example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import { describe, expect, it } from "vitest";

type JsonFixture = {
  id: string;
  bucket: "valid" | "invalid" | "interop";
  input: string;
  expectedFormatted?: string;
};

const fixtures: JsonFixture[] = [
  {
    id: "valid_simple_object",
    bucket: "valid",
    input: '{"b":2,"a":1}',
    expectedFormatted: '{\\n  "b": 2,\\n  "a": 1\\n}',
  },
  {
    id: "invalid_trailing_comma",
    bucket: "invalid",
    input: '{"a":1,}',
  },
];

function formatJson(input: string) {
  return JSON.stringify(JSON.parse(input), null, 2);
}

describe("json formatter fixtures", () => {
  for (const fixture of fixtures) {
    it(fixture.id, () => {
      if (fixture.bucket === "invalid") {
        expect(() => formatJson(fixture.input)).toThrow(SyntaxError);
        return;
      }

      const formatted = formatJson(fixture.input);
      expect(formatted).toBe(fixture.expectedFormatted);
      expect(JSON.parse(formatted)).toStrictEqual(JSON.parse(fixture.input));
    });
  }
});`}
            </pre>
          </div>
        </div>
        <p>
          If your formatter preserves object key order, compare exact strings. If it sorts keys or normalizes line
          endings, normalize both sides before comparing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="size-6" /> Common Mistakes That Make JSON Fixtures Weak
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Testing only objects and arrays.</strong> A JSON text can also be a string, number, boolean, or
            <code>null</code>.
          </li>
          <li>
            <strong>Mixing strict and interop cases.</strong> Duplicate keys and BOM-prefixed input should not be mixed
            into ordinary pass/fail assertions without an explicit policy.
          </li>
          <li>
            <strong>Asserting full engine error text.</strong> Syntax messages often change between browsers, Node
            versions, and libraries.
          </li>
          <li>
            <strong>Skipping regression fixtures.</strong> Every production bug should add one new fixture so the same
            parser or formatter failure cannot reappear silently.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="size-6" /> Practical Checklist
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Create separate <code>valid</code>, <code>invalid</code>, and <code>interop</code> fixture buckets.</li>
          <li>Include top-level primitives, nested structures, escapes, numbers, and empty containers.</li>
          <li>Store broken JSON as raw text so editor tooling does not “fix” it.</li>
          <li>Assert exact formatted output only where your formatter promises canonical output.</li>
          <li>Add one new fixture whenever you fix a parsing or formatting bug.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpenText className="size-6" /> Conclusion
        </h2>
        <p>
          Good JSON fixtures are small, explicit, and grouped by intent. When you combine strict valid cases, clear
          invalid cases, and a separate interoperability bucket, your formatter tests become easier to trust and easier
          to expand as new bugs appear.
        </p>
      </div>
    </>
  );
}
