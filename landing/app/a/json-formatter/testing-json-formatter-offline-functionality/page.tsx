import type { Metadata } from "next";
import { AlertTriangle, CheckCircle, CloudOff, Code, ListChecks, ListTree, Lock, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Testing JSON Formatter Offline Functionality | Offline JSON Formatter Guide",
  description:
    "Learn how to verify that a JSON formatter really works offline, keeps data in the browser, and still formats and validates JSON with no network connection.",
};

const jsonExampleMinified = `{"env":"prod","retryCount":3,"features":{"offline":true,"prettyPrint":true},"items":[1,2,3,4]}`;

const jsonExampleNested = `{
  "user": {
    "id": 1,
    "name": "Alice",
    "roles": ["admin", "editor"],
    "details": {
      "age": 30,
      "isActive": true
    }
  },
  "products": [
    { "name": "Laptop", "price": 1200 },
    { "name": "Mouse", "price": 25 }
  ]
}`;

const jsonExampleDataTypes = `{
  "string": "Hello, World!",
  "numberInt": 42,
  "numberFloat": 3.14,
  "numberScientific": 1.23e-4,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullable": null
}`;

const jsonExampleEscapes = `{
  "escapedString": "This string has a \\"quote\\" and a newline\\nand a tab\\t and unicode \\u20AC (Euro sign)."
}`;

const jsonExampleSensitive = `{
  "customerEmail": "alice@example.com",
  "apiKey": "sk_test_REDACTED",
  "internalNote": "Use fake secrets when testing privacy boundaries."
}`;

const jsonExampleInvalidMissingComma = `{
  "key1": "value1"
  "key2": "value2"
}`;

const jsonExampleInvalidBrackets = `[
  { "item": 1
]`;

const jsonExampleInvalidUnquotedKey = `{
  key: "value"
}`;

const jsonExampleInvalidSingleQuotes = `{
  "key": 'value'
}`;

const jsonExampleInvalidTrailingComma = `{
  "key1": "value1",
  "key2": "value2",
}`;

const jsonExampleInvalidKeyword = `{
  "status": True
}`;

const jsonExampleInvalidEscape = `{
  "key": "String with invalid escape \\x"
}`;

const jsonExampleWithComments = `{
  /* This is a comment */
  "data": 123 // This is another comment
}`;

export default function JsonFormatterOfflineTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="w-8 h-8 text-blue-500" /> Testing JSON Formatter Offline Functionality
      </h1>

      <div className="space-y-6">
        <p>
          If you want a JSON formatter that works offline, the important question is not just whether it can pretty-print
          JSON. It is whether parsing, validation, and formatting happen locally in the browser after the page has
          loaded, without sending your payload to a server.
        </p>
        <p>
          For most browser-based formatters, the core logic is local because it relies on native JavaScript APIs such as{" "}
          <code>JSON.parse()</code> and <code>JSON.stringify()</code>. What you actually need to test is everything
          around that core: whether the page still works when the network is disabled, whether any request is made while
          you paste data, and whether errors stay readable when the connection disappears.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CloudOff className="w-6 h-6 text-gray-600 dark:text-gray-400" /> What &quot;Offline JSON Formatter&quot;
          Should Mean
        </h2>
        <p>A credible offline claim should hold up under all of these checks:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span>
              <strong>Local-only processing:</strong> The JSON payload stays on the device while you format, validate,
              expand tree views, or copy output.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-timer w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M12 2v2" />
              <path d="M12 8v4l3 3" />
            </svg>
            <span>
              <strong>Formatting still works with no connection:</strong> Once the page is open, valid JSON should still
              pretty-print and invalid JSON should still produce local error messages.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucude-signal-high w-5 h-5 text-purple-600 flex-shrink-0 mt-1"
            >
              <path d="M2 20h.01" />
              <path d="M7 20v-4" />
              <path d="M12 20v-8" />
              <path d="M17 20v-12" />
              <path d="M22 20V4" />
            </svg>
            <span>
              <strong>Fresh reload behavior is honest:</strong> If the app shell is cached, it should reopen offline. If
              it is not cached, the tool should at least avoid pretending it is fully offline-capable.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Status indicators are not enough:</strong> <code>navigator.onLine</code> is only a hint. A real
              offline test checks actual network requests, not just an &quot;offline&quot; badge in the UI.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Fast Verification Checklist
        </h2>
        <p>
          A search visitor usually wants a quick answer: &quot;Can I trust this formatter offline?&quot; This workflow gets
          you there quickly.
        </p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>Open the formatter while online, then open the browser&apos;s Network panel and clear the request log.</li>
          <li>
            Paste a known valid sample and confirm the expected output first. A tiny minified payload is enough:
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleMinified}</pre>
            </div>
          </li>
          <li>Switch browser network throttling to <strong>Offline</strong>.</li>
          <li>
            Repeat the same actions with valid JSON, invalid JSON, and a fake sensitive sample. Formatting and validation
            should still work.
          </li>
          <li>
            Watch for any new <code>fetch</code>, XHR, WebSocket, analytics, or logging requests when you paste, format,
            or view the parsed tree.
          </li>
          <li>
            While still offline, do a hard reload. If the page fails to reopen, that does <em>not</em> necessarily mean
            the formatter logic is remote. It usually means the app shell is not cached for full offline reopening.
          </li>
        </ol>
        <p>
          That distinction matters. There are really two different promises: <strong>works offline after loading</strong>{" "}
          and <strong>can be reopened offline from a fresh load</strong>. A good test separates them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CloudOff className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Current Browser Workflow
        </h2>
        <p>Current desktop browsers make offline testing straightforward:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Chrome and Edge:</strong> Open DevTools, go to the <strong>Network</strong> panel, then choose{" "}
            <strong>Offline</strong> from the throttling dropdown next to <strong>Disable cache</strong>.
          </li>
          <li>
            <strong>Firefox:</strong> Open the <strong>Network Monitor</strong> and use the <strong>Throttling</strong>{" "}
            dropdown. Current Firefox builds still include an <strong>Offline</strong> preset there.
          </li>
        </ul>
        <p>
          When you do this, prefer the network log over any in-app connectivity flag. Browser vendors explicitly note
          that <code>navigator.onLine</code> uses heuristics and can report misleading positives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Key Areas and Test Cases
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" /> Testing Valid JSON
        </h3>
        <p>
          Start with normal formatting behavior. If the tool cannot handle everyday payloads locally, the offline claim
          is irrelevant.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Minified payloads:</strong> A real formatter should turn one-line JSON into readable output without
            touching the network.
          </li>
          <li>
            <strong>Simple objects and arrays:</strong> <code>&#x7b; &quot;key&quot;: &quot;value&quot; &#x7d;</code>,{" "}
            <code>[1, 2, 3]</code>, <code>[null, false]</code>
          </li>
          <li>
            <strong>Nested structures:</strong> Objects containing arrays, arrays containing objects, and deeper
            combinations.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleNested}</pre>
            </div>
          </li>
          <li>
            <strong>Various data types:</strong> Strings, numbers, scientific notation, booleans, and <code>null</code>.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleDataTypes}</pre>
            </div>
          </li>
          <li>
            <strong>Strings with escapes:</strong> Quotes, backslashes, newlines, tabs, and Unicode escapes should all
            survive a format round-trip.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleEscapes}</pre>
            </div>
          </li>
          <li>
            <strong>Top-level primitive JSON values:</strong> <code>&quot;hello&quot;</code>, <code>123</code>,{" "}
            <code>true</code>, and <code>null</code> are valid JSON values and should parse correctly.
          </li>
          <li>
            <strong>Empty structures:</strong> <code>&#x7b;&#x7d;</code> and <code>[]</code> should format cleanly.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" /> Testing Invalid JSON
        </h3>
        <p>
          A good formatter should not just format valid JSON. It should reject invalid input locally and explain why.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Missing commas:</strong>
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidMissingComma}</pre>
            </div>
          </li>
          <li>
            <strong>Incorrect braces or brackets:</strong> Mismatched or missing delimiters.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidBrackets}</pre>
            </div>
          </li>
          <li>
            <strong>Unquoted keys:</strong> JSON requires keys to be double-quoted strings.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidUnquotedKey}</pre>
            </div>
          </li>
          <li>
            <strong>Single-quoted strings:</strong> JSON requires double quotes.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidSingleQuotes}</pre>
            </div>
          </li>
          <li>
            <strong>Trailing commas:</strong> They are valid in modern JavaScript literals, but invalid in strict JSON.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidTrailingComma}</pre>
            </div>
          </li>
          <li>
            <strong>Incorrect keywords:</strong> Using <code>True</code>, <code>undefined</code>, or <code>NaN</code>{" "}
            should fail immediately.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidKeyword}</pre>
            </div>
          </li>
          <li>
            <strong>Invalid string escapes:</strong> Backslashes not followed by a valid escape character.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleInvalidEscape}</pre>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" /> Testing Edge Cases
        </h3>
        <p>These cases usually expose hidden dependencies, poor performance, or confusing UX:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Very large JSON:</strong> Test with MBs of data to check browser memory pressure and editor
            responsiveness.
          </li>
          <li>
            <strong>Whitespace-only input:</strong> The tool should fail clearly, not silently clear the editor or show a
            misleading success state.
          </li>
          <li>
            <strong>Pasted text from other tools:</strong> Smart quotes, hidden characters, and editor-added line endings
            should produce understandable errors.
          </li>
          {/* eslint-disable react/jsx-no-comment-textnodes */}
          <li>
            <strong>JSON with comments:</strong> While not part of strict JSON, users paste it often. The tool should
            either reject it clearly or support a documented cleanup path.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleWithComments}</pre>
            </div>
          </li>
          {/* eslint-enable react/jsx-no-comment-textnodes */}
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" /> Testing Privacy and Network Leakage
        </h3>
        <p>
          This is the part many &quot;offline&quot; tools skip. Use obviously fake sensitive data and confirm that nothing is
          transmitted while you work.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Paste a sample like the one below while offline and while the Network panel is recording.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>{jsonExampleSensitive}</pre>
            </div>
          </li>
          <li>Confirm there is no new request to an API, logging endpoint, or analytics collector after paste.</li>
          <li>
            Confirm secondary actions also stay local, including tree expansion, copy helpers, and validation buttons.
          </li>
          <li>
            If the tool surfaces parse errors, make sure the error UI is generated locally instead of depending on a
            remote service.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" /> Testing Error Reporting
        </h3>
        <p>When invalid JSON is provided, the formatter should provide clear feedback.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Does it clearly indicate that an error occurred?</li>
          <li>Is the message understandable to a developer reading raw JSON?</li>
          <li>Does it provide the line number and ideally the column number where parsing failed?</li>
          <li>Is the problematic part of the input highlighted or otherwise easy to find?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Common False Positives
        </h2>
        <p>
          A formatter can appear offline-friendly while still depending on the network in subtle ways. Watch for these
          traps:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Already-open tab passes, fresh reload fails:</strong> The formatting engine is local, but the page is
            not cached for true reopen-offline use.
          </li>
          <li>
            <strong>The UI says offline, but requests still fire:</strong> This usually happens when the app trusts{" "}
            <code>navigator.onLine</code> too much.
          </li>
          <li>
            <strong>Formatting works, but extras break:</strong> Remote fonts, icon sets, telemetry, or bug-reporting
            hooks can still fail noisily when the connection is gone.
          </li>
          <li>
            <strong>Cached assets hide a network dependency:</strong> A second visit may look fully offline only because
            JavaScript and CSS were cached earlier. Clear cache and repeat the test if you need the strict answer.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Automated vs. Manual Testing
        </h2>
        <p>
          The parsing logic is easy to unit test. The offline claim is not. You usually need both automated coverage and
          a browser-level manual pass.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Automated:</strong> Test wrapper functions around <code>JSON.parse</code> and{" "}
            <code>JSON.stringify</code>, indentation options, line and column extraction, and large-input handling.
          </li>
          <li>
            <strong>Manual:</strong> Test offline mode in real browsers, inspect the request log, and verify the editor,
            tree view, copy buttons, and error UI still work without connectivity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> Conclusion
        </h2>
        <p>
          Testing a JSON formatter offline is less about indentation and more about trust. A real offline formatter keeps
          parsing local, stays usable with the network disabled, exposes clear errors, and does not leak payloads through
          background requests. If you separate <strong>works after load</strong> from{" "}
          <strong>can reopen from a fresh offline load</strong>, you will get a much more honest answer about how
          offline the tool really is.
        </p>
      </div>
    </>
  );
}
