import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unexpected End of JSON Input: Causes and Fixes | Offline Tools",
  description:
    "Fix 'Unexpected end of JSON input' fast. Learn why empty responses, truncated API payloads, and incomplete JSON break JSON.parse() and fetch().",
};

export default function UnexpectedEndOfJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Unexpected End of JSON Input: Causes and Fixes</h1>

      <div className="space-y-6">
        <p>
          The error <code>Unexpected end of JSON input</code> means the parser reached the end of a string or
          response body before it found one complete JSON value. Most of the time, that means you tried to parse an
          empty response, the payload was cut off before it finished downloading, or the JSON is missing a closing
          quote, bracket, or brace.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Quick answer</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-blue-800 dark:text-blue-100">
            <li>Log the raw input and its length before parsing so you can see whether it is empty or cut off.</li>
            <li>
              If you use <code>fetch()</code>, do not blindly call <code>response.json()</code> for <code>204</code>,{" "}
              <code>304</code>, or <code>HEAD</code> responses.
            </li>
            <li>
              If the payload ends mid-object or mid-array, the parser is not the real problem. Something upstream is
              returning incomplete JSON.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What the error actually means</h2>
        <p>
          Valid JSON must contain one complete value such as an object, an array, a string, a number, <code>true</code>
          , <code>false</code>, or <code>null</code>. When the parser reaches the end too early, JavaScript engines
          commonly surface that as <code>Unexpected end of JSON input</code>. In other runtimes the wording may vary
          slightly, but the root issue is the same: the input ended before the JSON was complete.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The most common causes</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Empty input</strong>. Parsing <code>&quot;&quot;</code>, whitespace, or an HTTP response with no body
            will fail because there is no JSON value to parse.
          </li>
          <li>
            <strong>Incomplete JSON text</strong>. A missing <code>{"}"}</code>, <code>{"]"}</code>, comma, or closing
            quote leaves the structure unfinished.
          </li>
          <li>
            <strong>Truncated API payloads</strong>. The server may start returning JSON and then stop because of a
            crash, timeout, proxy limit, failed compression, or interrupted connection.
          </li>
          <li>
            <strong>Parsing the wrong kind of response</strong>. An endpoint may return no content for some cases, or
            it may occasionally return HTML or plain text instead of JSON.
          </li>
          <li>
            <strong>Building JSON manually</strong>. String concatenation is a common source of half-finished objects
            and arrays.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Common examples</h2>

        <h3 className="text-xl font-medium mt-6">1. Parsing an empty string</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`JSON.parse("");
JSON.parse("   ");`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Both fail because the parser never sees a complete JSON value. This is one of the most common reasons for
            the error.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Truncated object or array</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": "Ana",
  "roles": ["admin", "editor"],
  "settings": {
    "theme": "dark"`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The input stops before the inner object and outer object are closed, so the parser reaches the end early.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Empty API response parsed as JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const response = await fetch("/api/session");
const data = await response.json();`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This commonly breaks when the server returns no body for a no-content case, or when the response is cut off
            before the JSON finishes.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important distinction</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If the response is HTML instead of JSON, you usually get a different error such as{" "}
            <code>Unexpected token &lt;</code>. The <code>Unexpected end</code> message is a stronger signal that the
            body is empty or incomplete.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to fix it</h2>

        <h3 className="text-xl font-medium mt-6">1. Inspect the raw input before parsing</h3>
        <p>
          Before you change anything else, log the actual string you are parsing, its length, and the last part of the
          payload. That tells you quickly whether the problem is an empty body or a truncated one.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`console.log("length:", text.length);
console.log("tail:", text.slice(-200));
const data = JSON.parse(text);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Guard against empty HTTP responses</h3>
        <p>
          If the payload comes from <code>fetch()</code>, use <code>response.text()</code> while debugging so you can
          inspect the raw body. Then parse it yourself only when there is something to parse.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Safer parsing pattern</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`async function readJsonOrNull(response) {
  if (response.status === 204 || response.status === 304) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  if (!contentType.includes("application/json")) {
    throw new Error(\`Expected JSON but received \${contentType || "unknown content type"}\`);
  }

  return JSON.parse(text);
}`}
            </pre>
          </div>
        </div>
        <p>
          For <code>HEAD</code> requests, skip JSON parsing entirely because the response body is intentionally empty.
        </p>

        <h3 className="text-xl font-medium mt-6">3. Fix truncated responses at the source</h3>
        <p>
          If the payload ends halfway through an object or array, the bug is usually not in <code>JSON.parse()</code>.
          It is in the code or infrastructure producing the response.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check the browser Network panel and compare the response preview with the raw response body.</li>
          <li>Log the serialized JSON length on the server before sending it.</li>
          <li>Look for timeouts, reverse-proxy limits, or middleware that may cut off large responses.</li>
          <li>If the response is compressed, test once without compression to rule out broken transfer or decoding.</li>
          <li>Do not build JSON by hand. Serialize plain objects with your platform&apos;s JSON encoder.</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">4. Repair incomplete JSON files or strings</h3>
        <p>
          If the JSON came from a file, clipboard, or manual edit, open it in a formatter or validator and look near
          the end of the document. The missing character is often close to the last visible line.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="mt-2">
            <h4 className="text-md font-medium text-red-600 dark:text-red-400">Before</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "items": [
    { "id": 1 },
    { "id": 2 }
`}
              </pre>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium text-green-600 dark:text-green-400">After</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "items": [
    { "id": 1 },
    { "id": 2 }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A quick debugging checklist</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Print the raw input and confirm it is not empty.</li>
          <li>Check whether the last characters look cut off mid-string, mid-object, or mid-array.</li>
          <li>Verify the HTTP status code before parsing, especially for <code>204</code> and <code>304</code>.</li>
          <li>Verify the <code>content-type</code> header really says JSON.</li>
          <li>Switch from <code>response.json()</code> to <code>response.text()</code> until you see the real payload.</li>
          <li>If it only happens on large responses, investigate truncation, streaming, or proxy limits.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Prevention strategies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Prefer <code>JSON.stringify()</code> over manual string concatenation when producing JSON.</li>
          <li>Handle empty or no-content responses explicitly in your API client.</li>
          <li>Validate user-supplied JSON before saving or parsing it.</li>
          <li>Log response status, headers, and body length around JSON parsing failures.</li>
          <li>Use a formatter when editing JSON by hand so mismatched braces are obvious.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          In most cases, <code>Unexpected end of JSON input</code> is not a mysterious parser bug. It is a clue that
          the parser received too little data. Start by checking whether the input is empty, then whether the response
          was truncated, and only then look for syntax mistakes in the JSON itself.
        </p>

        <p>
          Once you inspect the raw text instead of the parsed result, this error usually becomes straightforward to
          diagnose and fix.
        </p>
      </div>
    </>
  );
}
