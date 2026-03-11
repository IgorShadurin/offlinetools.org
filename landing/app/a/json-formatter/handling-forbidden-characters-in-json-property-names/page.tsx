import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handling Forbidden Characters in JSON Property Names | Offline Tools",
  description:
    "Learn which characters are actually invalid in JSON property names, which ones only break tooling, and how to escape, validate, and normalize keys safely.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Forbidden Characters in JSON Property Names</h1>

      <div className="space-y-6">
        <p>
          Most articles on this topic mix together two different problems: invalid JSON syntax, and valid JSON keys
          that are inconvenient in code, databases, or query tools. That distinction matters. In standard JSON, a
          property name is just a string, so spaces, dots, hyphens, emoji, and leading digits are usually allowed.
        </p>

        <p>
          The actual syntax rules are much narrower. Keys must be enclosed in double quotes, embedded quotes and
          backslashes must be escaped, and raw control characters are not allowed inside the string. If your payload
          parses correctly but still breaks later, the problem is usually not JSON itself. It is the consumer.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Short answer</p>
          <p className="mt-2">
            In JSON, the truly forbidden characters in a property name are the ones that would make the key an invalid
            JSON string. Most other "forbidden" characters are only forbidden by a specific language, database, path
            syntax, or coding convention.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What is actually forbidden in a JSON property name?</h2>

        <p>
          Per{" "}
          <a href="https://www.rfc-editor.org/rfc/rfc8259" className="text-blue-600 hover:underline">
            RFC 8259
          </a>
          , object member names are strings. That means a key becomes invalid JSON only when it breaks JSON string
          rules.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Unquoted keys are invalid. JSON requires double quotes around every property name.</li>
          <li>Single-quoted keys are invalid. Single quotes belong to JavaScript literals, not JSON syntax.</li>
          <li>
            A raw double quote or raw backslash inside the key is invalid unless it is escaped as <code>\"</code> or{" "}
            <code>\\</code>.
          </li>
          <li>
            Raw control characters from <code>U+0000</code> through <code>U+001F</code> are invalid inside the key.
            Use escapes such as <code>\t</code>, <code>\n</code>, or <code>\u0000</code> instead.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Invalid JSON keys</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  name: "Ada",               // invalid: key is not quoted
  'job-title': "Engineer",  // invalid: single quotes are not JSON
  "quote"inside": true      // invalid: quote inside key is not escaped
}`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Valid JSON keys, even if they look unusual</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "first name": "Ada",
  "job-title": "Engineer",
  "price.usd": 12.5,
  "123start": true,
  "caf\\u00E9": "valid Unicode",
  "": "empty key is valid JSON",
  "quote\\\"inside": "escaped quote",
  "line\\nbreak": "escaped newline in the key"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Characters that are valid JSON but still cause trouble</h2>

        <p>
          These characters are often described as forbidden, but the real issue is downstream compatibility rather than
          JSON syntax:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Spaces, hyphens, and leading digits are valid JSON, but they break JavaScript dot notation and many code
            generators.
          </li>
          <li>
            Dots are valid JSON, but dot-based path syntaxes may treat them as separators instead of literal key names.
          </li>
          <li>
            Empty-string keys are valid JSON, but they are hard to document and easy to mishandle in forms and UIs.
          </li>
          <li>
            Unicode is valid JSON, but normalization, fonts, and copy-paste can still create lookalike-key bugs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why JSON parses but your code still fails</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">JavaScript and TypeScript access rules</h3>
        <p>
          When a key contains spaces, dots, hyphens, or starts with a digit, use bracket notation. The JSON is valid.
          The access pattern is what changes.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`const payload = JSON.parse(
  '{"first name":"Ada","price.usd":12.5,"123start":true}'
);

// Wrong or misleading:
// payload.first name
// payload.price.usd
// payload.123start

// Correct:
console.log(payload["first name"]);
console.log(payload["price.usd"]);
console.log(payload["123start"]);

type Payload = {
  "first name": string;
  "price.usd": number;
  "123start": boolean;
};`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Duplicate names are a bigger risk than odd characters</h3>
        <p>
          RFC 8259 says object names should be unique. Duplicate keys are not always rejected, but behavior becomes
          implementation-dependent. Many parsers keep the last value, which can hide data loss.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "role": "user",
  "role": "admin"
}`}
          </pre>
          <p className="mt-2">
            If you control the producer, treat duplicate names as invalid input even when a parser accepts them.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Database and query-language caveats</h3>
        <p>
          Some systems add their own restrictions on top of JSON. For example, current{" "}
          <a
            href="https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/"
            className="text-blue-600 hover:underline"
          >
            MongoDB documentation
          </a>{" "}
          notes that support for field names containing <code>$</code> and <code>.</code> improved in MongoDB 5.0, but
          those names are still discouraged because several features and query patterns do not handle them cleanly.
        </p>

        <p>
          That is the pattern to watch for: the key is valid JSON on the wire, but a storage engine, path expression,
          ORM, analytics pipeline, or export step interprets the same character differently.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Practical handling strategies</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Keep the wire format, normalize internally</h3>
        <p>
          If an external API already uses awkward keys, preserve the original payload at the boundary and map it into a
          safer internal shape. That keeps ingestion compatible without forcing strange keys throughout your codebase.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`function normalizeKeys(input) {
  if (Array.isArray(input)) return input.map(normalizeKeys);
  if (!input || typeof input !== "object") return input;

  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      const safeKey = key
        .trim()
        .replace(/[.\\s-]+/g, "_")
        .replace(/[^a-zA-Z0-9_$]/g, "")
        .replace(/^([0-9])/, "_$1");

      return [safeKey, normalizeKeys(value)];
    })
  );
}`}
          </pre>
          <p className="mt-2">
            Watch for collisions: <code>first-name</code> and <code>first name</code> would both normalize to{" "}
            <code>first_name</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Use explicit key mapping when names matter</h3>
        <p>
          If the exact original key must be preserved for round-tripping, use an explicit mapping table instead of a
          lossy "replace special characters" rule.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`const keyMap = {
  "first name": "firstName",
  "price.usd": "priceUsd",
  "123start": "_123start"
};

function remapObject(obj, map) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [map[key] ?? key, value])
  );
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Validate key names if you control the schema</h3>
        <p>
          For your own APIs, it is usually better to forbid awkward names up front than to keep compensating for them
          later.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "type": "object",
  "propertyNames": {
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  }
}`}
          </pre>
          <p className="mt-2">
            This JSON Schema rule allows only identifier-like keys. Adjust the pattern if your naming convention allows
            hyphens or Unicode letters.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Troubleshooting checklist</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Parser error near a property name: check for missing double quotes, single quotes, or an unescaped quote or
            backslash inside the key.
          </li>
          <li>
            Valid JSON but <code>undefined</code> at runtime: switch from dot notation to bracket notation when the key
            contains spaces, dots, hyphens, or leading digits.
          </li>
          <li>Unexpected value overwrite: inspect the payload for duplicate names.</li>
          <li>
            Database or search index rejection: look for system-specific rules around <code>.</code>, <code>$</code>,
            empty names, or path separators.
          </li>
          <li>
            Invisible-character bugs: reformat the payload and inspect escape sequences with a validator before blaming
            the application code.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Bottom line</h2>

        <p>
          There are fewer forbidden characters in JSON property names than most developers think. In pure JSON, the key
          only has to be a valid JSON string. Most real-world problems come later, when another tool gives special
          meaning to dots, spaces, dollar signs, hyphens, or leading digits.
        </p>

        <p>
          Use Offline Tools&apos; JSON Formatter to catch invalid string syntax first, then decide separately whether you
          also need a naming convention, schema rule, or normalization step for the systems that consume the data.
        </p>
      </div>
    </>
  );
}
