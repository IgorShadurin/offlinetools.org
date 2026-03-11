import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copy-to-Clipboard Functionality in JSON Formatters | Offline Tools",
  description:
    "Learn what a reliable JSON copy button should do: copy formatted or minified JSON, handle browser clipboard limits, and help you copy JSON from DevTools.",
};

export default function CopyToClipboardFunctionalityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Copy-to-Clipboard Functionality in JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          If you search for a way to copy JSON to the clipboard, you usually want something simple: paste raw data,
          clean it up, and copy back a valid result without selecting text by hand. A good JSON formatter should make
          that a one-click action, but it also has to work within current browser clipboard rules. That means secure
          pages, user-triggered actions, and clear fallback behavior when copying is blocked.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              The most useful copy actions are <strong>Copy formatted JSON</strong> and <strong>Copy minified JSON</strong>.
            </li>
            <li>
              On the web, text copy should use <code>navigator.clipboard.writeText()</code> from a click or tap on an
              HTTPS page.
            </li>
            <li>
              If copy fails, the usual causes are blocked clipboard permissions, a missing user gesture, an embedded
              iframe policy, or invalid JSON that never serialized cleanly.
            </li>
            <li>
              To identify JSON in the browser Network tab, narrow to <strong>Fetch/XHR</strong>, inspect the{" "}
              <code>Content-Type</code> response header, then copy the response body.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Users Expect When They Click &quot;Copy JSON&quot;</h2>
        <p>
          A copy button in a formatter is not just a convenience feature. It is the handoff point between your JSON
          tool and everything else: API clients, issue trackers, editors, CI logs, and browser DevTools. For that
          reason, the expected behavior is stricter than a generic &quot;copy text&quot; button.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>The copied text should match the visible output.</strong> If the UI shows pretty-printed JSON, the
            clipboard should contain that version, not the raw unformatted input.
          </li>
          <li>
            <strong>The tool should copy only valid output.</strong> If parsing fails, the user needs an error state,
            not broken text silently copied to the clipboard.
          </li>
          <li>
            <strong>It should be obvious what was copied.</strong> Users should know whether they copied formatted
            JSON, minified JSON, a selected value, or a path.
          </li>
          <li>
            <strong>Success and failure need feedback.</strong> A toast, inline message, or live region announcement is
            better than making the user guess.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Current Browser Rules That Affect Copy Buttons</h2>
        <p>
          Modern browsers support text copying well, but clipboard access is intentionally restricted. In practice,
          these rules explain most &quot;copy button does nothing&quot; bug reports.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Use the modern Clipboard API for plain text</h3>
        <p>
          For JSON text, the standard approach is <code>navigator.clipboard.writeText()</code>. It is asynchronous,
          simple to reason about, and a better default than old hidden-textarea patterns.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Copy actions must run in a secure context</h3>
        <p>
          Web clipboard APIs are restricted to secure contexts. For a JSON formatter, that generally means the user is
          on HTTPS. If the same code works locally but fails on a plain HTTP deployment, this is one of the first
          things to check.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Browsers can require a direct user action</h3>
        <p>
          A clipboard write usually needs a recent click, tap, or keyboard action. If the app waits too long, moves
          the copy call into a background timer, or triggers it automatically after formatting, browsers may reject the
          request. When that happens, developers often see a <code>NotAllowedError</code> instead of a clipboard write.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Old fallback methods are still around, but deprecated</h3>
        <p>
          Some tools still fall back to <code>document.execCommand(&quot;copy&quot;)</code> for older browsers, but it is a deprecated
          API and should not be the primary implementation in a new formatter. It is best treated as a last-resort
          compatibility layer, not the main path.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Practical Note</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If your formatter is embedded inside another site, clipboard writes may also be blocked by iframe policy.
            When the UI is correct but copy only fails in the embedded version, check host-page permissions and
            embedding restrictions before rewriting the feature.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The Copy Modes That Matter Most</h2>
        <p>
          Many formatter articles overcomplicate this topic. In real usage, a small set of copy actions covers most
          needs.
        </p>

        <h3 className="text-xl font-semibold mt-6">Copy formatted JSON</h3>
        <p>
          This is the default action most users want. It preserves indentation and line breaks so the result is easy
          to paste into code reviews, issue reports, docs, or test fixtures.
        </p>

        <h3 className="text-xl font-semibold mt-6">Copy minified JSON</h3>
        <p>
          This is useful when the destination expects compact payloads, such as request bodies, config fields, or
          logging systems where whitespace just adds noise.
        </p>

        <h3 className="text-xl font-semibold mt-6">Copy selected value or selected object</h3>
        <p>
          If the formatter supports a tree view, copying only the selected node is often faster than copying the whole
          document. This helps when you are debugging a nested response and only need one object or array.
        </p>

        <h3 className="text-xl font-semibold mt-6">Copy path</h3>
        <p>
          For debugging and documentation, copying a property path is often as useful as copying the JSON itself. It
          lets you tell someone exactly where a value lives inside a large payload.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A Reliable Copy Flow for a JSON Formatter</h2>
        <p>
          The cleanest implementation is to parse once, serialize the exact variant you want, and copy that string.
          Avoid copying directly from the DOM when the page can generate a trusted output string in code.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Minimal Example</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 mt-3 overflow-x-auto text-sm">
            <code>{`async function copyJson(value: unknown, pretty = true) {
  const text = JSON.stringify(value, null, pretty ? 2 : 0);
  await navigator.clipboard.writeText(text);
  return text;
}`}</code>
          </pre>
          <p className="mt-3">
            In a real tool, you would catch errors, surface a clear message, and keep a manual select-and-copy option
            available when the browser refuses clipboard access.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why JSON Copy Actions Fail</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Problem</th>
                  <th className="text-left py-2 px-3">Likely Cause</th>
                  <th className="text-left py-2 px-3">What To Do</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 px-3">Copy button does nothing</td>
                  <td className="py-2 px-3">Clipboard call ran without a user gesture</td>
                  <td className="py-2 px-3">Trigger copy directly from the button click or key command</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Copy works locally but not on a deployed site</td>
                  <td className="py-2 px-3">The page is not a secure context</td>
                  <td className="py-2 px-3">Serve the formatter over HTTPS</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Copied text is ugly or inconsistent</td>
                  <td className="py-2 px-3">The tool copied the original input, not the formatted output</td>
                  <td className="py-2 px-3">Serialize the parsed JSON explicitly before copying</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Large payloads freeze the page</td>
                  <td className="py-2 px-3">Formatting and copying happen synchronously on the main thread</td>
                  <td className="py-2 px-3">Precompute output or defer heavy work until after parsing</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Embedded formatter cannot copy</td>
                  <td className="py-2 px-3">The host page blocks clipboard access in an iframe</td>
                  <td className="py-2 px-3">Check iframe permissions and host-page policy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How To Identify JSON in the Network Tab and Copy It</h2>
        <p>
          Some searchers land on this topic because they are trying to pull JSON out of browser DevTools before
          formatting it. The workflow is straightforward once you know what signals to look for.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Open DevTools and go to the Network panel.</li>
          <li>
            Use the Fetch/XHR filter first if you are hunting for API traffic. If the list is still noisy, the filter
            box also supports <code>mime-type:application/json</code>.
          </li>
          <li>
            Click a request and inspect its response headers. The strongest signal is{" "}
            <code>Content-Type: application/json</code> or another <code>+json</code> media type.
          </li>
          <li>Open the Response tab to inspect the body itself.</li>
          <li>When you have the right request, use the request context menu to copy the response body.</li>
          <li>Paste that response into a formatter, validate it, then copy back the formatted or minified version you need.</li>
        </ol>

        <p>
          This matters because not every JSON response is labeled perfectly. In real debugging work, you will
          occasionally see JSON delivered with the wrong MIME type. If the response body still parses cleanly, a JSON
          formatter can still normalize it for you.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What a Good JSON Formatter Should Surface After Copy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>A visible success state.</strong> Users should see confirmation immediately after copying.
          </li>
          <li>
            <strong>The output mode.</strong> Saying &quot;Copied formatted JSON&quot; is better than saying only &quot;Copied&quot;.
          </li>
          <li>
            <strong>Error detail when blocked.</strong> A helpful message beats silent failure, especially for secure
            context and permission issues.
          </li>
          <li>
            <strong>Accessible announcements.</strong> Screen-reader users need the same success or failure feedback as
            visual users.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          The best copy-to-clipboard experience in a JSON formatter is simple for users and strict in implementation:
          validate the JSON, serialize the exact output the user expects, copy with the modern Clipboard API, and show
          clear feedback if the browser blocks the action. If you are pulling JSON out of DevTools, identify the right
          response by its headers and response body first, then let the formatter handle cleanup and copying.
        </p>
      </div>
    </>
  );
}
