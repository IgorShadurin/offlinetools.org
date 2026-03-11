import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Can Regex Parse JSON? The Role of Regular Expressions in JSON Parsing | Offline Tools",
  description:
    "Learn why regular expressions break on real JSON, where regex is still useful, and how to parse safely with standard JSON parsers.",
};

export default function RegexJsonParsingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">The Role of Regular Expressions in JSON Parsing</h1>

      <div className="space-y-6">
        <p>
          If your goal is to parse JSON reliably, regular expressions are the wrong tool. JSON is a structured format
          with nested objects and arrays, escaped characters inside strings, and strict rules for numbers, booleans,
          <code className="font-mono"> null</code>, and whitespace. Regex can still help with search, filtering, or
          value validation, but it should not be responsible for understanding JSON structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 space-y-3">
          <h2 className="text-2xl font-semibold">Short Answer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a JSON parser to read JSON structure.</li>
            <li>Use regex only around JSON, not instead of a parser.</li>
            <li>Regex is acceptable for post-parse validation of string values.</li>
            <li>
              If you need querying or extraction, use parsed object access, JSONPath, or parser-based tools such as{" "}
              <code className="font-mono">jq</code>, not brace-matching regex.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Regex Breaks on Real JSON</h2>
        <p>
          JSON is not just arbitrary text with commas and braces. It is a grammar. RFC 8259 defines strings with
          escapes, nested arrays and objects, numeric formats, and literal values. A regex that seems fine on one
          sample usually fails as soon as the data becomes even slightly more realistic.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <span className="font-semibold">Escaped quotes:</span> a string may contain{" "}
            <code className="font-mono">\&quot;</code>, so a naive pattern that stops at the next quote will cut the
            value short.
          </li>
          <li>
            <span className="font-semibold">Arbitrary nesting:</span> objects and arrays can nest indefinitely, which
            breaks simple patterns such as <code className="font-mono">{"{...}"}</code> or{" "}
            <code className="font-mono">{"[...]"}</code>.
          </li>
          <li>
            <span className="font-semibold">Multiple valid value types:</span> JSON values can be objects, arrays,
            strings, numbers, <code className="font-mono">true</code>, <code className="font-mono">false</code>, or{" "}
            <code className="font-mono">null</code>. Regex treats all of them as plain text.
          </li>
          <li>
            <span className="font-semibold">Error handling:</span> a real parser tells you when JSON is malformed.
            Regex usually just produces a partial or misleading match.
          </li>
          <li>
            <span className="font-semibold">Engine-specific tricks:</span> some regex engines expose recursion or
            balancing features, but those patterns are not portable and still do not give you normal parser behavior,
            typed values, or useful syntax errors.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Example 1: Escaped Quotes Break a Common Pattern</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const jsonString = '{"message":"He said \\"hello\\" to everyone"}';
const messageRegex = /"message"\\s*:\\s*"([^"]*)"/;

console.log(jsonString.match(messageRegex)?.[1]);
// He said \\`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The JSON is valid, but the regex stops at the first escaped quote because it only knows about characters,
            not JSON string escaping rules.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Example 2: Nested Objects Break Naive Brace Matching</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const jsonString = '{"user":{"profile":{"id":7},"name":"Ada"}}';
const userRegex = /"user"\\s*:\\s*(\\{[^}]*\\})/;

console.log(jsonString.match(userRegex)?.[1]);
// {"profile":{"id":7}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The match is incomplete because the regex grabs characters until the first closing brace. It does not know
            that the inner brace belongs to a nested object.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What to Use Instead</h2>
        <p>
          Parse first, then inspect the result. That gives you correct structure, typed values, and proper syntax
          errors. Once JSON is parsed, extracting a field is simpler and safer than trying to write a complex regex.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Safer JavaScript Example with <code className="font-mono">JSON.parse</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const jsonString = '{
  "user": {
    "profile": {
      "name": "Bob \\"The Builder\\"",
      "active": true,
      "tags": ["tooling", "construction"]
    }
  }
}';

try {
  const data = JSON.parse(jsonString);

  console.log(data.user.profile.name);   // Bob "The Builder"
  console.log(data.user.profile.active); // true
  console.log(data.user.profile.tags[0]); // tooling
} catch (error) {
  console.error("Invalid JSON:", error);
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The parser handles escaping, nesting, booleans, arrays, and errors in one place. That is exactly what you
            want from JSON processing code.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Current Parser Details Worth Knowing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A valid JSON text can be an object, an array, a string, a number, <code className="font-mono">true</code>,{" "}
            <code className="font-mono">false</code>, or <code className="font-mono">null</code>. It is not limited to
            top-level objects.
          </li>
          <li>
            Object member names are expected to be unique. If duplicate keys appear, parser behavior can vary, which is
            another reason not to depend on regex for meaning.
          </li>
          <li>
            <code className="font-mono">JSON.parse</code> rejects common JavaScript-style mistakes such as trailing
            commas, comments, and single-quoted strings because those are not valid JSON.
          </li>
          <li>
            Modern JavaScript documentation also covers a reviver <code className="font-mono">context.source</code>{" "}
            parameter for primitive values. When supported by your runtime, it can help recover the original source
            text for high-precision numbers instead of using regex hacks.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Large Integer Example Without Structural Regex</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const payload = '{"invoiceId":12345678901234567890}';

const data = JSON.parse(payload, (key, value, context) => {
  if (key === "invoiceId" && context) {
    return BigInt(context.source);
  }

  return value;
});

console.log(data.invoiceId); // 12345678901234567890n`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If your runtime does not yet support the reviver context parameter, a safer fallback is to encode
            high-precision identifiers as strings and convert them after parsing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Where Regex Is Still Useful</h2>
        <p>
          Regex still has a role in JSON-related workflows, just not as the parser itself.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Finding log lines that probably contain a JSON fragment before you hand them to a parser.</li>
          <li>
            Validating a parsed string field such as an order number, date-like token, or email address after the JSON
            structure has already been decoded.
          </li>
          <li>Performing targeted cleanup on surrounding text outside the JSON payload.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Reasonable Post-Parse Regex Use</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const jsonString = '{"contact":{"email":"test@example.com"}}';
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

const data = JSON.parse(jsonString);
const email = data.contact.email;

console.log(emailRegex.test(email)); // true`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is the right order: parse the JSON first, then apply regex to a normal string value.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Regular expressions are useful for matching patterns in linear text, but full JSON parsing requires a real
          parser that understands nesting, escaping, data types, and syntax errors. If you only remember one rule,
          make it this: parse JSON with a JSON parser, then use regex only for search or validation around the parsed
          data.
        </p>
      </div>
    </>
  );
}
