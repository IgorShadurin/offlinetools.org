import type { Metadata } from "next";
import { Beaker, Bug, ShieldCheck, FileJson2, TestTube } from "lucide-react";

export const metadata: Metadata = {
  title: "Mutation Testing for JSON Formatter Robustness | Offline Tools",
  description:
    "Practical guide to mutation testing a JSON formatter: define better test oracles, cover RFC 8259 edge cases, and catch crashes, bad output, and parser surprises.",
};

export default function MutationTestingJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShieldCheck className="mr-3" size={32} /> Mutation Testing for JSON Formatter Robustness
      </h1>

      <div className="space-y-6">
        <p>
          A robust JSON formatter is really two tools working together: a parser that must reject bad input
          predictably, and a serializer that must emit stable, readable output for good input. If you want confidence
          in both halves, normal unit tests are not enough. You need adversarial inputs, clear test oracles, and a way
          to keep adding edge cases as you discover them.
        </p>
        <p>
          That is where mutation-style testing helps. In classic mutation testing, you mutate the formatter&apos;s code
          and check whether your tests catch the change. For formatter <em>robustness</em>, you should also mutate the
          JSON input itself. In practice this overlaps with fuzzing and property-based testing, and it is one of the
          fastest ways to find crashes, parser inconsistencies, and output that changes data unexpectedly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson2 className="mr-3" size={24} /> What Robustness Means for a JSON Formatter
        </h2>
        <p>
          At its core, a formatter parses JSON and then serializes the same data back with consistent indentation and
          spacing. A robust formatter does more than &quot;pretty print&quot; without throwing.
        </p>
        <p>A robust formatter should:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Format valid JSON without changing its meaning.</li>
          <li>Reject invalid JSON with a deterministic parse error instead of crashing, hanging, or returning junk.</li>
          <li>Be stable on repeat runs, so formatting already formatted output does not keep changing it.</li>
          <li>Handle size, nesting, and Unicode edge cases without excessive memory use or stack overflows.</li>
          <li>
            Document how it behaves on ambiguous inputs such as duplicate object keys or any non-standard syntax it
            chooses to support.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Beaker className="mr-3" size={24} /> The Right Oracle Matters More Than the Mutator
        </h2>
        <p>
          The common mistake is generating many mutated inputs without defining what counts as success. For a formatter,
          the best oracle is usually not string equality against one hard-coded output. It is a small set of invariants
          that should hold for every valid input.
        </p>
        <p>
          For strict JSON inputs, these invariants are usually enough:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Round-trip equivalence:</strong> parsing the original input and parsing the formatted output should
            produce the same data model.
          </li>
          <li>
            <strong>Idempotence:</strong> formatting the formatter&apos;s own output a second time should produce the same
            string.
          </li>
          <li>
            <strong>Fail-fast invalid handling:</strong> malformed input should always return an error, never partial
            output.
          </li>
          <li>
            <strong>Bounded behavior:</strong> very deep or very large inputs should complete within your documented
            limits.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Minimal oracle for valid JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`function assertRobustFormatting(format, input) {
  const once = format(input);
  const twice = format(once);

  expect(twice).toBe(once);
  expect(JSON.parse(once)).toEqual(JSON.parse(input));
}`}</pre>
          </div>
          <p className="mt-4 text-sm italic">
            This catches unstable whitespace decisions and many semantic regressions. Add separate assertions for error
            messages, timeouts, or duplicate-key behavior.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">How Input Mutation Testing Works for Formatters:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Start with a seed corpus:</strong> include minified JSON, already formatted JSON, deeply nested
            data, long strings, escaped Unicode, large arrays, empty values, big numbers, and real API payloads.
          </li>
          <li>
            <strong>Define mutation operators:</strong> mix syntax-breaking mutations with structure-aware mutations so
            you generate both invalid JSON and valid-but-surprising JSON.
          </li>
          <li>
            <strong>Classify each mutant:</strong> decide whether it should be valid strict JSON, valid only in a
            lenient mode, or invalid everywhere.
          </li>
          <li>
            <strong>Feed it to the formatter:</strong> record output, error type, execution time, and memory spikes if
            those matter for your environment.
          </li>
          <li>
            <strong>Apply the oracle:</strong> round-trip and idempotence checks for valid inputs, deterministic errors
            for invalid inputs, and mode-specific assertions for any extensions you intentionally support.
          </li>
          <li>
            <strong>Shrink failures into regression tests:</strong> save the smallest crashing or surprising mutant so
            it becomes a permanent fixture in your suite.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <TestTube className="mr-3" size={24} /> High-Value Mutation Operators
        </h2>
        <p>
          Random character edits still find crashes, but formatter bugs show up faster when you group mutations by the
          kind of guarantee they challenge.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Syntax breakers:</strong> remove quotes, colons, commas, or closing brackets; truncate the
            document; replace escape sequences; inject lone backslashes.
          </li>
          <li>
            <strong>Structurally valid changes:</strong> reorder object members, duplicate keys, replace values with
            other JSON types, or change a scalar to an array or object.
          </li>
          <li>
            <strong>Whitespace stress:</strong> collapse all whitespace, add extreme indentation, or mix line endings to
            catch unstable pretty-printing.
          </li>
          <li>
            <strong>String and Unicode edge cases:</strong> long strings, escaped quotes, escape-heavy content, emoji,
            surrogate pairs, and malformed escape sequences.
          </li>
          <li>
            <strong>Numeric edge cases:</strong> exponent notation, negative zero, very large integers, and values near
            the runtime&apos;s precision limits.
          </li>
          <li>
            <strong>Depth and size stress:</strong> thousands of nested arrays or objects, or large repeated payloads
            that expose recursion and memory problems.
          </li>
          <li>
            <strong>Extension probes:</strong> comments, trailing commas, single quotes, or unquoted keys if you need
            to prove the tool is strict JSON only.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: useful mutants from one small seed</h3>
          <p className="mb-2 text-sm">Original Valid JSON:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mb-4">
            <pre>{`{
  "name": "Alice",
  "age": 30
}`}</pre>
          </div>
          <p className="mb-2 text-sm">Possible Mutants:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`{
  "name": "Alice"
  "age": 30
}`}</pre>
            <pre>{`{
  "name": "Alice",
  "age": 30,
}`}</pre>
            <pre>{`{
  "name": "Alice",
  "name": "Bob",
  "age": 30
}`}</pre>
            <pre>{`{
  "name": "Ali\\u12G4ce",
  "age": 30
}`}</pre>
            <pre>{`[
  "name": "Alice",
  "age": 30
}`}</pre>
          </div>
          <p className="mt-4 text-sm italic">
            In strict JSON mode, the missing comma, trailing comma, broken container type, and malformed Unicode escape
            should all be rejected. Duplicate keys deserve their own assertion because different parsers may keep the
            first value, keep the last value, or expose duplicates separately.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-3" size={24} /> Strict JSON vs Lenient JSON Is a Real Test Boundary
        </h2>
        <p>
          This is the compatibility decision most articles skip. RFC 8259 defines strict JSON: object members are
          separated by commas, arrays are separated by commas, and object names <em>should</em> be unique for
          interoperability. It does not define comments, trailing commas, or single-quoted strings.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If your formatter promises strict JSON, mutated inputs with comments or trailing commas should be hard
            failures, not &quot;best effort&quot; parsing.
          </li>
          <li>
            If your formatter intentionally accepts JSON5 or JSONC-like syntax, treat that as a separate mode with its
            own fixtures and expected output normalization.
          </li>
          <li>
            Duplicate keys need explicit documentation because parser behavior differs across ecosystems even when the
            input is otherwise accepted.
          </li>
          <li>
            A search visitor cares less about what your parser accepts in theory and more about whether your tool fails
            clearly and consistently on the input they pasted.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Where Classical Mutation Testing Still Helps</h2>
        <p>
          Traditional mutation testing is still useful here. Tools such as Stryker mutate your formatter&apos;s source
          code and report whether your test suite kills those mutants. That catches weak assertions around indentation
          width, escaping rules, branch coverage in error paths, and &quot;golden string&quot; tests that miss meaningful
          behavior.
        </p>
        <p>
          The combination is stronger than either approach alone: code mutation shows whether tests are sensitive enough
          to implementation changes, while input mutation shows whether the formatter survives hostile or weird data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Failure Patterns to Look For</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Partial output before failure:</strong> the formatter writes some formatted text and only then throws
            an error.
          </li>
          <li>
            <strong>Mode confusion:</strong> strict mode silently accepts comments, trailing commas, or single quotes.
          </li>
          <li>
            <strong>Unstable formatting:</strong> formatting the same document twice produces different whitespace or
            key ordering.
          </li>
          <li>
            <strong>Unicode bugs:</strong> escape handling corrupts non-ASCII characters or rejects valid sequences.
          </li>
          <li>
            <strong>Depth and size blowups:</strong> nested inputs trigger recursion errors, timeouts, or excessive
            memory use.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          To harden a JSON formatter, do not stop at a handful of pretty-print snapshots. Define invariants, separate
          strict JSON from extensions, mutate real inputs aggressively, and keep every minimized failure as a regression
          test. That gives search users and downstream developers what they actually need from a formatter: predictable
          output, predictable errors, and no surprises under messy real-world input.
        </p>
      </div>
    </>
  );
}
