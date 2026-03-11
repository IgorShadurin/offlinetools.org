import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handling Incomplete JSON Data Streams Safely | Offline Tools",
  description:
    "Learn when to buffer a full JSON document, when to switch to NDJSON or JSON text sequences, and how to recover safely from truncated streams.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Incomplete JSON Data Streams</h1>

      <div className="space-y-6">
        <p>
          Incomplete JSON is usually a protocol problem, not a parsing trick. A normal JSON document becomes valid only
          when the full serialized value arrives, so cutting a stream in the middle of an object or array leaves you
          with invalid JSON. The practical fix is to decide whether you are receiving one complete document, or a stream
          of many smaller JSON records that needs explicit framing.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h2 className="text-xl font-semibold">Start With The Right Mental Model</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Single JSON document:</strong> HTTP chunking does not change the payload shape. Buffer until the
              response is complete, then parse once.
            </li>
            <li>
              <strong>Many records over time:</strong> Use a framed format such as NDJSON/JSONL, server-sent events, or
              RFC 7464 JSON text sequences so the client can detect record boundaries.
            </li>
            <li>
              <strong>Arbitrary fragments of one object:</strong> Treat this as a broken producer unless you have a
              runtime-specific incremental parser and no control over the source.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">1. Why Plain JSON Breaks In Streams</h2>
        <p>
          Plain JSON does not tell the reader where one logical record ends unless the entire value is already complete.
          That is why naive brace counting is fragile: braces can appear inside strings, top-level values can be arrays,
          numbers, booleans, or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">null</code>, and a
          truncated escape sequence can make the remaining buffer ambiguous.
        </p>
        <p>
          If you control the producer, the safest improvement is usually to stop streaming one massive JSON array and
          instead emit self-contained records.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Prefer Framed Records For Long-Lived Streams</h2>
        <p>
          Two formats are especially useful when a connection may pause, break, or reconnect:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common framing choices</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>NDJSON / JSONL:</strong> one JSON value per line. This is simple to debug and works well for logs,
              job output, and streaming API responses.
            </li>
            <li>
              <strong>JSON text sequences:</strong> RFC 7464 defines{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">application/json-seq</code>, where each JSON
              text is prefixed with the ASCII record separator (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">\u001E</code>). The RFC is designed so
              parsers can keep going after a truncated or malformed element.
            </li>
            <li>
              <strong>Server-sent events:</strong> the event stream is already framed. Parse each event first, then
              parse the JSON carried in its <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">data:</code>{" "}
              field.
            </li>
          </ul>
        </div>

        <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
          {`NDJSON
{"id":1,"type":"login"}
{"id":2,"type":"view"}

RFC 7464 JSON text sequence
\\u001E{"id":1,"type":"login"}
\\u001E{"id":2,"type":"view"}`}
        </pre>

        <h2 className="text-2xl font-semibold mt-8">3. Safe Browser Pattern For NDJSON</h2>
        <p>
          In current browsers, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">fetch()</code> exposes the
          body as a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ReadableStream</code>, and{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">TextDecoderStream</code> is widely available. A
          safe reader keeps a text buffer, splits on newlines, parses only complete lines, and treats any leftover tail
          at end-of-stream as truncated data.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`async function consumeNdjson(url, { onItem, signal } = {}) {
  const response = await fetch(url, {
    headers: { Accept: "application/x-ndjson, application/json" },
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(\`Request failed: \${response.status}\`);
  }

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let buffer = "";
  let lineNumber = 0;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += value;
      const lines = buffer.split(/\\r?\\n/);
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;
        lineNumber += 1;

        try {
          onItem?.(JSON.parse(line));
        } catch (error) {
          throw new Error(
            \`Invalid JSON record on line \${lineNumber}: \${error.message}\`
          );
        }
      }
    }

    if (buffer.trim()) {
      throw new Error(
        "Stream ended with a partial JSON record. Retry from the last confirmed offset."
      );
    }
  } finally {
    reader.releaseLock();
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Recovery Strategy When The Stream Cuts Off</h2>
        <p>
          The recovery path should be explicit. Do not silently invent closing braces or brackets unless you are doing a
          one-off repair by hand and already know the missing content.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Keep the unparsed tail separate from confirmed records.</li>
          <li>Checkpoint a cursor, byte offset, sequence number, or last event ID as you process each record.</li>
          <li>Retry from the last confirmed checkpoint instead of replaying from the beginning when possible.</li>
          <li>Make downstream processing idempotent so duplicates are safe after reconnects.</li>
          <li>Log the raw fragment, response headers, and checkpoint metadata for debugging.</li>
        </ol>

        <div className="bg-amber-50 p-4 rounded-lg dark:bg-amber-950 my-6">
          <h3 className="text-lg font-medium">What usually goes wrong</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Trying to call <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">JSON.parse()</code> on each transport chunk.</li>
            <li>Assuming balanced braces prove that a JSON value is complete.</li>
            <li>
              Auto-appending <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"}"}</code> or{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"]"}</code> to "fix" truncated payloads in
              production.
            </li>
            <li>Dropping sequence metadata, which makes resume and deduplication much harder.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. If You Cannot Change The Producer</h2>
        <p>
          Sometimes a third-party service sends one huge JSON document and you still need early results. In that case,
          use a real incremental parser for your runtime rather than writing a homegrown state machine. Node.js,
          Python, Java, Go, and Rust all have mature streaming parser options that can emit tokens or objects as the
          buffer grows.
        </p>
        <p>
          Even then, the goal is usually to <strong>read one valid value safely</strong>, not to guess the missing tail
          of a broken one. If you need to inspect the fragment manually, validate the recovered piece in the Offline
          Tools JSON Formatter before replaying it or storing it permanently.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Practical Decision Guide</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>If the API returns one document, buffer the full response and parse once.</li>
          <li>If the API emits many records, switch to NDJSON, JSON text sequences, or SSE.</li>
          <li>If the connection may resume, attach sequence IDs and build around checkpoints.</li>
          <li>If truncation is common, fix the producer contract before tuning the parser.</li>
        </ul>
      </div>
    </>
  );
}
