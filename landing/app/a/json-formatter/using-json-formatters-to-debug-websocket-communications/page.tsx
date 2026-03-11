import type { Metadata } from "next";
import { Bug, Code, MessageSquare, LayoutList } from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging WebSocket JSON with Formatters | Offline Tools",
  description:
    "Inspect WebSocket JSON faster with current browser devtools, offline formatters, and fixes for escaped, invalid, or binary payloads.",
};

export default function DebuggingWebSocketJsonWithFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3" size={32} /> Debugging WebSocket JSON with Formatters
      </h1>

      <div className="space-y-6">
        <p>
          When a WebSocket bug only appears in real time, the hardest part is often reading the payload fast enough to
          spot the wrong field, missing property, or malformed nested object. A JSON formatter turns dense one-line
          frames into something you can scan, validate, and compare in seconds.
        </p>
        <p>
          Start with the browser inspector, then move the suspicious frame into an offline formatter when you need
          cleaner diffs, stronger validation, or safer handling of production data. That is usually faster and safer
          than pasting sensitive payloads into random online tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MessageSquare className="mr-2" size={24} /> Start with the WebSocket Inspector
        </h2>
        <p>
          Current browser devtools already expose a lot of WebSocket detail. Use that first so you can see message
          order, direction, and timing before you isolate a specific JSON payload.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <LayoutList className="mr-2" size={20} /> 1. Chrome and Chromium-based browsers
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Open DevTools, go to the Network panel, and filter to <code>WS</code>.</li>
          <li>Select the socket connection and open the <code>Messages</code> tab.</li>
          <li>
            Use the message list to pair the outbound frame with the inbound response or broadcast that follows it.
          </li>
          <li>
            Chrome keeps the last 100 messages in that table, so reproduce the smallest failing sequence you can when
            the socket is noisy.
          </li>
        </ul>
        <p>
          This is usually enough to spot bad message ordering, duplicate sends, or a payload that is clearly missing a
          field before you do any deeper formatting.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <LayoutList className="mr-2" size={20} /> 2. Firefox
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Open the Network panel, filter to <code>WS</code>, and select the active connection.</li>
          <li>Inspect the live-updating response view as frames arrive.</li>
          <li>Filter sent, received, and control frames so heartbeat traffic does not hide the real issue.</li>
          <li>
            Firefox can expand several structured protocols, including plain JSON, which helps when your app uses a
            wrapper such as Socket.IO or SignalR around the business payload.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} /> When a JSON Formatter Helps More
        </h2>
        <p>
          Browser inspectors are good for capture. A formatter becomes more useful when the frame is valid JSON but not
          easy to reason about.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Large nested payloads:</strong> Indentation makes it easier to scan IDs, flags, and arrays without
            missing one field in a long line.
          </li>
          <li>
            <strong>Validation:</strong> A formatter immediately tells you whether the copied frame is valid JSON or a
            truncated log line.
          </li>
          <li>
            <strong>Diffing:</strong> Pretty-printed JSON is much easier to compare against a known-good frame.
          </li>
          <li>
            <strong>Privacy-sensitive debugging:</strong> An offline formatter is the better default for tokens, email
            addresses, customer IDs, and internal payloads because the data stays on your machine.
          </li>
        </ul>
        <p>Here is the same WebSocket message as raw text and as formatted JSON:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{"type":"presence.update","requestId":"req_42","payload":{"userId":"user123","status":"online","rooms":["ops","sales"],"meta":{"traceId":"8f0ac1","retry":false}}}`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "type": "presence.update",
  "requestId": "req_42",
  "payload": {
    "userId": "user123",
    "status": "online",
    "rooms": ["ops", "sales"],
    "meta": {
      "traceId": "8f0ac1",
      "retry": false
    }
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LayoutList className="mr-2" size={24} /> A Fast Workflow for Real Bugs
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Reproduce one action at a time so the socket log stays readable.</li>
          <li>Find the outbound frame that triggered the problem, then the next inbound frame that should answer it.</li>
          <li>Copy the suspicious JSON into an offline formatter and validate it before changing code.</li>
          <li>
            Compare it with a working frame from the same endpoint or event type, paying attention to types as well as
            values.
          </li>
          <li>
            Check correlation fields like <code>requestId</code>, <code>traceId</code>, message type, timestamps,
            booleans, and nullable properties.
          </li>
        </ol>
        <p>
          This workflow catches a large share of real issues: a number serialized as a string, a missing nested key, an
          unexpected <code>null</code>, or a payload envelope that changed shape during a deploy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-2" size={24} /> Common WebSocket JSON Problems
        </h2>
        <p>
          The formatter only helps after you know what kind of frame you actually have. These are the cases that
          usually waste the most time.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON wrapped inside a string:</strong> Many backends send an envelope where the outer frame is JSON
            but the inner <code>payload</code> field is another JSON string. You may need to parse twice.
          </li>
          <li>
            <strong>Heartbeat and control frames:</strong> Ping, pong, and protocol control messages are not business
            payloads. Filter them out before comparing JSON.
          </li>
          <li>
            <strong>Binary frames:</strong> If the socket sends <code>ArrayBuffer</code>, <code>Blob</code>, protobuf,
            or compressed data, a JSON formatter is not the right tool until you decode the bytes first.
          </li>
          <li>
            <strong>Invalid JSON copied from logs:</strong> Truncated log lines, extra commas, or broken escaping make a
            valid message look like a server bug when it is really a logging problem.
          </li>
        </ul>
        <p>A small helper like this is more practical than a bare <code>JSON.parse()</code> during debugging:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Formatting a WebSocket Frame Safely</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function formatWebSocketFrame(frame: string | ArrayBuffer | Blob) {
  if (frame instanceof ArrayBuffer) {
    return \`Binary frame (\${frame.byteLength} bytes). Decode it before treating it as JSON.\`;
  }

  if (frame instanceof Blob) {
    return \`Blob frame (\${frame.size} bytes). Read it as text before parsing.\`;
  }

  try {
    const parsed = JSON.parse(frame);

    if (
      parsed &&
      typeof parsed === "object" &&
      "payload" in parsed &&
      typeof parsed.payload === "string"
    ) {
      try {
        return JSON.stringify(
          { ...parsed, payload: JSON.parse(parsed.payload) },
          null,
          2
        );
      } catch {
        // payload was ordinary text, not nested JSON
      }
    }

    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    return \`Not valid JSON: \${(error as Error).message}\\n\\n\${frame}\`;
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          The important part is not the indentation itself. It is the branching: strings get parsed, nested JSON gets a
          second pass when needed, and binary frames get called out immediately instead of silently failing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">What to Check in the Formatted Output</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Message type:</strong> Verify the top-level event name before reading the payload details.
          </li>
          <li>
            <strong>Correlation fields:</strong> Check <code>requestId</code>, <code>traceId</code>, room IDs, and
            user IDs so you know the response belongs to the request you are investigating.
          </li>
          <li>
            <strong>Type mismatches:</strong> Bugs often come from <code>"42"</code> versus <code>42</code> or
            <code>"false"</code> versus <code>false</code>.
          </li>
          <li>
            <strong>Nullable and optional fields:</strong> Confirm whether the server omitted a key entirely or sent it
            as <code>null</code>.
          </li>
          <li>
            <strong>Timestamps and ordering:</strong> A valid payload can still be wrong if messages arrive in the
            wrong sequence.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">Conclusion</h2>
        <p>
          Debugging WebSocket JSON gets much easier once you separate capture from inspection. Use the browser network
          tools to find the right frame, then run that payload through an offline formatter to validate it, expand it,
          and compare it with a known-good message. That combination is simple, current, and reliable enough to catch
          most real production issues without adding new tooling to your app.
        </p>
      </div>
    </>
  );
}
