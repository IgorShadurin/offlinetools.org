import type { Metadata } from "next";
import {
  AlertCircle,
  Bug,
  ClipboardList,
  Code,
  FileWarning,
  Hammer,
  Lightbulb,
  ListChecks,
  Rocket,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Root Cause Analysis of Common JSON Processing Errors | JSON Formatter Guide",
  description:
    "Diagnose common JSON failures faster with a practical guide to syntax errors, HTML returned instead of JSON, empty or truncated payloads, schema drift, UTF-8 issues, duplicate keys, and number precision problems.",
};

export default function RootCauseAnalysisJsonErrors() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <Bug className="text-red-500" size={32} /> Root Cause Analysis of Common JSON Processing Errors
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Most JSON failures are not random. They usually break at one of five layers: transport, decoding, parsing,
          schema validation, or application logic. If you classify the failure first, you can stop guessing and get to
          the actual producer bug, contract mismatch, or malformed payload much faster.
        </p>

        <p>
          This guide focuses on the errors people hit most often in real systems: strict JSON syntax violations, HTML
          error pages accidentally parsed as JSON, empty or cut-off responses, schema drift between services, and
          interoperability traps such as duplicate keys or numbers that lose precision in JavaScript.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Lightbulb size={24} /> Start With the Failure Stage
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6">
            <li>
              Check the raw input first: HTTP status, `Content-Type`, response body, or file bytes before any parsing.
            </li>
            <li>
              Classify the failure: decode problem, syntax problem, shape/type problem, or business-rule problem.
            </li>
            <li>Reduce the payload to the smallest example that still fails.</li>
            <li>Compare the failing payload to the contract you actually consume, not the one you assume.</li>
            <li>Fix the producer when possible; defensive consumer code should be a safety net, not the only fix.</li>
          </ol>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <FileWarning size={24} /> Symptom to Root Cause Map
        </h2>
        <p>
          Parser wording varies by runtime and library, but the same symptoms usually point to the same underlying
          class of problem.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">`Unexpected token &lt;` or another non-JSON character near byte 0</h3>
            <p className="mt-2">
              The body is usually HTML, plain text, or a login/error page instead of JSON. Common causes are the wrong
              endpoint, a proxy or CDN error document, an auth redirect, or a server that returned a framework error
              page while the client still called `JSON.parse` or `response.json()`.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">`Unexpected end of JSON input` or another premature EOF message</h3>
            <p className="mt-2">
              The payload was empty or cut off. Typical root causes are `204 No Content`, an empty file, a truncated
              network response, a broken upstream proxy, or code that assumed every successful response has a JSON body.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">Parser complains about commas, quotes, or property names</h3>
            <p className="mt-2">
              The input is JSON-like, not JSON. Trailing commas, comments, single quotes, and unquoted keys often come
              from hand-edited config files or JavaScript object literals being mistaken for valid JSON.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">Parsing succeeds, but the app crashes later</h3>
            <p className="mt-2">
              This is usually schema drift or nullability drift: a field disappeared, changed type, moved into a nested
              wrapper, or is `null` where the consumer assumed a real value.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">Same JSON behaves differently across tools</h3>
            <p className="mt-2">
              Look for duplicate object keys, invalid Unicode, byte-order-mark issues, or numbers larger than the safe
              integer range supported by common JavaScript implementations.
            </p>
          </div>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <XCircle className="text-red-500" size={24} /> Strict JSON Syntax Errors
        </h2>
        <p>
          JSON is stricter than JavaScript object literal syntax. `JSON.parse` and standards-compliant parsers reject
          comments, trailing commas, single-quoted strings, and unquoted property names.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Common Invalid Patterns</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold">Trailing comma or comment</p>
              <div className="my-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
                <pre>
                  <code className="language-json">
                    {`{
  "name": "Alice",
  "age": 30, // invalid in JSON
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <p className="font-semibold">Single quotes or unquoted keys</p>
              <div className="my-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
                <pre>
                  <code className="language-json">
                    {`{
  name: 'Alice'
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <p className="font-semibold">Unsupported values copied from JavaScript</p>
              <div className="my-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
                <pre>
                  <code className="language-json">
                    {`{
  "value": undefined,
  "other": NaN
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-medium">Root Causes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>A JSON file was edited like JavaScript, JSON5, or JSONC.</li>
            <li>Code built JSON through string concatenation instead of real serialization.</li>
            <li>User input was injected without proper escaping.</li>
            <li>A tool exported a relaxed format, but the consumer expected strict JSON.</li>
          </ul>

          <h3 className="mt-6 text-lg font-medium">What Fixes It</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Serialize objects with a real library instead of hand-building strings.</li>
            <li>Validate the exact raw payload, not the object you expected to produce.</li>
            <li>Convert JSON5/JSONC-style configs before passing them to strict parsers.</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code size={24} /> The Response Was Never JSON
        </h2>
        <p>
          One of the most common production failures is trying to parse a response that only looked like an API call.
          The backend may have returned HTML, plain text, or a redirect page instead.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">High-Probability Causes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>The request hit the wrong route or environment.</li>
            <li>An auth gateway returned a sign-in page or `401`/`403` HTML body.</li>
            <li>A reverse proxy, CDN, or framework rendered an error document.</li>
            <li>The server returned text like `OK`, but the client always assumed JSON.</li>
          </ul>

          <div className="my-4 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code className="language-typescript">
                {`const response = await fetch(url);
const contentType = response.headers.get("content-type") ?? "";

if (response.status === 204) {
  return null;
}

const raw = await response.text();

if (!contentType.includes("application/json")) {
  throw new Error(
    \`Expected JSON but received \${contentType || "unknown content type"}: \${raw.slice(0, 200)}\`,
  );
}

const data = JSON.parse(raw);`}
              </code>
            </pre>
          </div>

          <p className="text-sm italic">
            Checking status, headers, and the first part of the raw body usually resolves this class of problem faster
            than staring at the parser message.
          </p>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <AlertCircle className="text-orange-500" size={24} /> Empty, Truncated, or Undecodable Bodies
        </h2>
        <p>
          If the parser reaches the end of the payload too soon, the real issue is often transport or decoding, not
          JSON syntax.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">What Usually Went Wrong</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>The response legitimately had no body, such as `204 No Content` or `HEAD`.</li>
            <li>A file read returned zero bytes or partial bytes.</li>
            <li>A network hop cut the response short before the closing brace or bracket arrived.</li>
            <li>The server declared compression incorrectly, so decoding failed before parsing.</li>
            <li>The response body was already consumed by another reader before `response.json()` ran.</li>
          </ul>

          <h3 className="mt-6 text-lg font-medium">Fast Checks</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Log body length before parsing.</li>
            <li>Handle empty-response status codes explicitly.</li>
            <li>Store the raw body once during debugging so you can inspect exactly what arrived.</li>
            <li>Verify compression and transfer settings at the server or proxy layer.</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ClipboardList size={24} /> Schema Drift and Type Mismatches
        </h2>
        <p>
          Many teams call these "JSON errors," but the JSON is often perfectly valid. The real failure is that the data
          contract changed and the consumer code did not.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Common Drift Patterns</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>A required field was removed or renamed.</li>
            <li>A scalar became an object, or an object became an array.</li>
            <li>A value changed from number to string, often for IDs or timestamps.</li>
            <li>`null` started appearing where the consumer assumed non-null data.</li>
            <li>The payload was wrapped in `data`, `result`, or another top-level envelope.</li>
          </ul>

          <div className="my-4 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code className="language-typescript">
                {`type User = {
  id: string;
  email: string;
  displayName?: string | null;
};

function parseUser(input: unknown): User {
  if (!input || typeof input !== "object") {
    throw new Error("Expected an object");
  }

  const user = input as Record<string, unknown>;

  if (typeof user.id !== "string" || typeof user.email !== "string") {
    throw new Error("Invalid user payload");
  }

  if (user.displayName != null && typeof user.displayName !== "string") {
    throw new Error("displayName must be string, null, or omitted");
  }

  return {
    id: user.id,
    email: user.email,
    displayName: (user.displayName as string | null | undefined) ?? null,
  };
}`}
              </code>
            </pre>
          </div>

          <p className="text-sm italic">
            Runtime validation is what turns a vague downstream crash into an actionable contract error close to the
            boundary.
          </p>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Bug size={24} /> Interoperability Traps That Look Random
        </h2>
        <p>
          Some payloads are technically parseable in one place and still dangerous in another. These issues often waste
          time because they do not fail consistently across languages, libraries, or environments.
        </p>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Duplicate Keys</h3>
          <div className="my-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code className="language-json">
                {`{
  "id": 1,
  "id": 2
}`}
              </code>
            </pre>
          </div>
          <p>
            Different parsers handle duplicate names differently. Many keep only the last value, which means the input
            may parse without an obvious error while silently discarding data.
          </p>

          <h3 className="mt-6 text-lg font-medium">Large Numbers and Precision Loss</h3>
          <div className="my-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code className="language-json">
                {`{
  "invoiceId": 9223372036854775807
}`}
              </code>
            </pre>
          </div>
          <p>
            That value is valid JSON, but many JavaScript environments cannot represent every integer beyond the safe
            range exactly. If an ID, money amount, or hash-like value must be preserved exactly, send it as a string or
            use a lossless parsing strategy.
          </p>

          <h3 className="mt-6 text-lg font-medium">Encoding Problems</h3>
          <p>
            JSON exchanged across open systems should be UTF-8. Mis-encoded files, invalid Unicode, or byte-order-mark
            edge cases can surface as replacement characters, decode failures, or inconsistent parser behavior.
          </p>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ShieldCheck size={24} /> Prevention Checklist
        </h2>
        <p>Most recurring JSON bugs disappear once you add a few boundaries and habits.</p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <Hammer size={18} />
            </span>
            <span>
              <strong>Serialize and parse with real libraries:</strong> avoid manual string concatenation for anything
              non-trivial.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <ListChecks size={18} />
            </span>
            <span>
              <strong>Validate at the boundary:</strong> check shape, types, and nullability before the rest of the app
              touches the data.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <Wrench size={18} />
            </span>
            <span>
              <strong>Log raw failure context:</strong> status code, `Content-Type`, body length, and a safe preview of
              the body are usually more useful than the exception alone.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <ClipboardList size={18} />
            </span>
            <span>
              <strong>Treat empty responses as a separate case:</strong> do not blindly call `response.json()` on every
              success status.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <Lightbulb size={18} />
            </span>
            <span>
              <strong>Use strings for exact identifiers and precise decimals:</strong> especially when JavaScript is one
              of the consumers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <ShieldCheck size={18} />
            </span>
            <span>
              <strong>Fix producer-side contract drift quickly:</strong> consumer workarounds reduce blast radius, but
              the long-term fix is to restore a stable contract.
            </span>
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Rocket size={24} /> Bottom Line
        </h2>
        <p>
          Root cause analysis for JSON errors gets easier when you stop treating every failure as "bad JSON." First ask
          whether the problem is the bytes you received, the syntax of the document, the contract you expected, or the
          business rules you apply after parsing. That framing usually reveals the fix within a few minutes instead of a
          few hours.
        </p>
      </div>
    </>
  );
}
