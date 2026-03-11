import type { Metadata } from "next";
import {
  AlertCircle,
  Bug,
  CheckCircle,
  CloudDrizzle,
  Code,
  Download,
  FileJson,
  Import,
  Settings,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting JSON Import/Export Issues | Fix Parse and Export Errors",
  description:
    "Fix JSON import and export problems fast. Learn how to diagnose parse errors, HTML responses, UTF-8 and BOM issues, duplicate keys, circular references, BigInt failures, and double-encoded payloads.",
};

export default function JsonTroubleshootingPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <FileJson size={36} /> Troubleshooting JSON Import/Export Issues
      </h1>

      <div className="space-y-8 text-lg">
        <p>
          Most JSON import and export failures come down to one of a few causes: the input is not valid JSON, the
          server returned something other than JSON, the file encoding is wrong, or the data being exported contains
          JavaScript values that JSON cannot represent. This guide is designed to help you diagnose the exact failure
          quickly instead of guessing.
        </p>

        <p>
          If you are debugging a file or API response, start by validating the raw text first. Do not assume the
          problem is in your app code until you confirm the payload is real JSON.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <AlertCircle size={28} /> Start With the Exact Symptom
        </h2>

        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>`Unexpected token &lt;` near the start:</strong> you probably received HTML, often a login page,
            CDN error page, proxy error, or framework error document instead of JSON.
          </li>
          <li>
            <strong>`Unexpected token` around a comma, quote, or key name:</strong> the input looks like a JavaScript
            object literal, not strict JSON. Common causes are trailing commas, single quotes, comments, or unquoted
            keys.
          </li>
          <li>
            <strong>The data parses but values look wrong:</strong> check for duplicate keys, stringified numbers and
            booleans, unexpected nesting, or a JSON string stored inside JSON.
          </li>
          <li>
            <strong>`Converting circular structure to JSON`:</strong> your export contains self-references or repeated
            references that `JSON.stringify()` cannot serialize by default.
          </li>
          <li>
            <strong>`Do not know how to serialize a BigInt`:</strong> you must convert `BigInt` values before export,
            usually to strings.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Import size={28} /> Common JSON Import Problems
        </h2>

        <div className="space-y-6">
          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <Bug size={24} /> 1. The input is not actually valid JSON
          </h3>
          <p>
            JSON is stricter than JavaScript object syntax. It does not allow comments, trailing commas, single-quoted
            strings, or bare property names. If you copied data from source code, documentation, or a config format
            like JSON5, that is often the real problem.
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 text-lg font-medium">Common examples that look close to JSON but fail:</h4>
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`// Invalid: single quotes, trailing comma, and a comment
{
  'name': 'Alice',
  "age": 30,
}

// Invalid: unquoted key
{
  status: "active"
}`}
              </pre>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>Make sure every property name uses double quotes.</li>
            <li>Remove trailing commas from objects and arrays.</li>
            <li>Remove comments. JSON has no comment syntax.</li>
            <li>Escape embedded quotes and control characters inside strings.</li>
            <li>Validate the raw text before you start debugging the parser call.</li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <CloudDrizzle size={24} /> 2. The server returned HTML, not JSON
          </h3>
          <p>
            The most common real-world import issue is not malformed JSON. It is hitting the wrong URL or receiving an
            HTML response from a redirect, auth wall, proxy, rate limit, or server error page. This usually surfaces as
            `Unexpected token &lt;` because the response starts with `&lt;!doctype html&gt;` or another HTML tag.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Inspect the raw response body, not just the exception message.</li>
            <li>Check the HTTP status first. A `200` is not enough if the body is still an HTML page.</li>
            <li>Verify the response `Content-Type` is compatible with JSON, typically `application/json`.</li>
            <li>Confirm you are not being redirected to a login page or anti-bot challenge.</li>
            <li>When using `fetch`, read `response.text()` once while debugging so you can see the real payload.</li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <Settings size={24} /> 3. UTF-8 and BOM problems
          </h3>
          <p>
            Current JSON guidance is clear: interoperable JSON exchanged across systems should use UTF-8. The JSON spec
            also says generators must not add a byte order mark (BOM), although parsers may choose to ignore one. In
            practice, BOM-prefixed files still break some tools and pipelines, especially when the file came from an
            editor or export process on Windows.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Save JSON files as UTF-8.</li>
            <li>Strip a leading BOM if the first character is `\uFEFF`.</li>
            <li>Avoid manual transcoding between UTF-8, UTF-16, and legacy code pages unless required.</li>
            <li>
              If imported text starts with strange invisible characters or parsing fails at position `0`, inspect the
              file bytes or reopen the file in a hex-capable editor.
            </li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <Code size={24} /> 4. Duplicate keys or unexpected structure
          </h3>
          <p>
            A document can be syntactically valid JSON and still behave badly. One example is duplicate object keys.
            The JSON spec warns that duplicate names make behavior unpredictable because different parsers may keep the
            last value, reject the payload, or expose the duplicates differently.
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`{
  "mode": "safe",
  "mode": "fast"
}`}
              </pre>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>Reject duplicate keys during validation if your parser can detect them.</li>
            <li>Verify whether numbers, booleans, and nulls arrived as strings instead of their real types.</li>
            <li>Check whether the API changed from returning an object to returning an array, or vice versa.</li>
            <li>
              Watch for nested JSON strings like <code>{'{"payload":"{\\"id\\":1}"}'}</code> that require an extra
              parse step.
            </li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <FileJson size={24} /> 5. The file format is JSON Lines, not one JSON document
          </h3>
          <p>
            Many exports from data tools are newline-delimited JSON, also called JSON Lines or NDJSON. That format is
            valid as a sequence of JSON objects, but it is not a single JSON document, so `JSON.parse()` on the entire
            file will fail.
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`{"id":1}
{"id":2}
{"id":3}`}
              </pre>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>Parse JSON Lines one line at a time.</li>
            <li>Do not wrap line-delimited records in `JSON.parse()` as one string unless you first convert them.</li>
            <li>If the file is huge, stream it instead of reading the whole thing into memory.</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Download size={28} /> Common JSON Export Problems
        </h2>

        <div className="space-y-6">
          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <XCircle size={24} /> 1. JavaScript values do not map cleanly to JSON
          </h3>
          <p>
            Export failures often happen because the source data is a JavaScript object, not pure JSON data. The
            differences matter:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 font-semibold">Value</th>
                  <th className="px-3 py-2 font-semibold">What `JSON.stringify()` does</th>
                  <th className="px-3 py-2 font-semibold">Why it causes trouble</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-3 py-2">`undefined`, functions, symbols</td>
                  <td className="px-3 py-2">Dropped from objects; become `null` in arrays</td>
                  <td className="px-3 py-2">Fields silently disappear or change shape</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-3 py-2">`NaN`, `Infinity`, `-Infinity`</td>
                  <td className="px-3 py-2">Serialized as `null`</td>
                  <td className="px-3 py-2">Numeric meaning is lost without an error</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-3 py-2">`BigInt`</td>
                  <td className="px-3 py-2">Throws</td>
                  <td className="px-3 py-2">Export fails unless you convert the value first</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">`Date`</td>
                  <td className="px-3 py-2">Serialized to an ISO string</td>
                  <td className="px-3 py-2">Consumers may expect a timestamp or timezone-free value instead</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>Normalize the data shape before export instead of trusting raw app state.</li>
            <li>Convert `BigInt` intentionally, usually to strings, so precision is preserved.</li>
            <li>Decide whether non-finite numbers should become `null`, strings, or trigger a validation error.</li>
            <li>Do not assume dates round-trip exactly unless the consumer expects ISO 8601 strings.</li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <Bug size={24} /> 2. Circular references break serialization
          </h3>
          <p>
            Objects that reference themselves, directly or indirectly, cause `JSON.stringify()` to throw. This is
            common with ORM entities, DOM-related objects, caches, graph structures, and application state trees.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Export only the fields you actually need instead of serializing rich runtime objects.</li>
            <li>Use a replacer if you need to prune cycles or replace them with a marker.</li>
            <li>For debugging, serialize a projected copy rather than mutating the original object.</li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <Code size={24} /> 3. Double-encoded payloads
          </h3>
          <p>
            A frequent export bug is serializing an already serialized string. That creates JSON that contains a JSON
            string instead of the original object.
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`// Wrong: payload becomes a quoted JSON string
const body = JSON.stringify(JSON.stringify(payload));

// Right: payload becomes one JSON document
const body = JSON.stringify(payload);`}
              </pre>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>If an API receives strings where it expects objects, check for accidental double stringification.</li>
            <li>
              If imported data looks like <code>{'"{\\"id\\":1}"'}</code>, you probably need one parse step before
              normal use.
            </li>
            <li>When storing JSON in a database, be clear whether the column contains structured JSON or plain text.</li>
          </ul>

          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
            <CloudDrizzle size={24} /> 4. File download or API transport issues
          </h3>
          <p>
            Sometimes the JSON string itself is fine, but the handoff is wrong. The file may be saved with the wrong
            extension, served with the wrong MIME type, truncated mid-write, or sent to an API without the expected
            request headers.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>For HTTP requests, send `Content-Type: application/json` when the body is JSON.</li>
            <li>For downloads, use a `.json` filename and a JSON-compatible MIME type.</li>
            <li>Check for partial writes when files are generated on the server or in background jobs.</li>
            <li>Inspect the exact bytes if the file opens incorrectly after download.</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code size={28} /> Practical Code Snippets
        </h2>

        <div className="space-y-6">
          <h3 className="mt-6 text-xl font-semibold">Parse imported text more defensively</h3>
          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`function parseJsonSafely(raw: string) {
  const withoutBom = raw.replace(/^\\uFEFF/, "");
  const trimmed = withoutBom.trimStart();

  if (trimmed.startsWith("<")) {
    throw new Error("Expected JSON but received HTML or another non-JSON response.");
  }

  try {
    return JSON.parse(withoutBom);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(\`Invalid JSON: \${message}\`);
  }
}`}
              </pre>
            </div>
          </div>

          <h3 className="mt-6 text-xl font-semibold">Stringify data without crashing on common export issues</h3>
          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <pre>
                {`function safeStringify(value: unknown) {
  const seen = new WeakSet<object>();

  return JSON.stringify(
    value,
    (_key, current) => {
      if (typeof current === "bigint") {
        return current.toString();
      }

      if (typeof current === "number" && !Number.isFinite(current)) {
        return null;
      }

      if (
        current === undefined ||
        typeof current === "function" ||
        typeof current === "symbol"
      ) {
        return null;
      }

      if (current && typeof current === "object") {
        if (seen.has(current)) {
          return "[Circular]";
        }

        seen.add(current);
      }

      return current;
    },
    2,
  );
}`}
              </pre>
            </div>
          </div>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <CheckCircle size={28} /> Recommended Troubleshooting Order
        </h2>

        <ol className="list-decimal space-y-3 pl-6">
          <li>Look at the raw input or raw HTTP response before parsing.</li>
          <li>Validate that the text is strict JSON, not a JavaScript literal or HTML page.</li>
          <li>Check encoding, especially BOM and non-UTF-8 source files.</li>
          <li>Confirm the data shape matches what your code expects.</li>
          <li>Before export, normalize unsupported JavaScript values and remove circular references.</li>
          <li>Verify the final transport step: headers, MIME type, filename, and whether you accidentally stringified twice.</li>
        </ol>

        <p>
          If you are using an offline JSON formatter or validator, paste the raw payload into it before changing
          application code. A validator will usually tell you faster whether the problem is syntax, structure, or a
          non-JSON response masquerading as JSON.
        </p>
      </div>
    </>
  );
}
