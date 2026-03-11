import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Fix Timeout Errors When Formatting Extremely Large JSON Files | Offline Tools",
  description:
    "Why huge JSON formatting jobs freeze or time out, what those errors usually mean, and when to use Web Workers, jq, streaming, or server-side processing instead.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Timeout Errors When Formatting Extremely Large JSON Files</h1>

      <div className="space-y-6">
        <p>
          If a very large JSON file times out in a formatter, the real problem is usually not a special JSON timeout.
          It is usually one of three things: the browser main thread is blocked long enough to look hung, the tab runs
          out of memory, or a server or proxy times out before the work finishes. With an in-browser tool like Offline
          Tools, your data stays on your device, but the browser tab still has strict CPU and memory limits.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-4">
          <h2 className="text-xl font-semibold">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <code>JSON.parse()</code> and <code>JSON.stringify()</code> are synchronous. They do not stream a full
              JSON document a little at a time.
            </li>
            <li>
              A Web Worker can keep the UI responsive, but it does not make the parse cheaper and it does not remove
              memory limits.
            </li>
            <li>
              If you need to pretty-print hundreds of MB or more, a browser formatter is often the wrong tool. Use a
              CLI tool, a desktop app, or a server-side job instead.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">1. What "timeout" usually means here</h2>
        <p>
          Search visitors often describe any failed large-file formatting attempt as a timeout, but the symptom matters.
          The fix for a frozen tab is different from the fix for a 504 response or a truncated export.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Match the symptom to the likely cause</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Frozen page or "page is unresponsive":</strong> main-thread CPU work from parsing, stringifying,
              or rendering a huge tree.
            </li>
            <li>
              <strong>"Out of memory", tab crash, or browser kill:</strong> the raw text, parsed object, and formatted
              output together exceed available memory.
            </li>
            <li>
              <strong>504, 524, or request timeout:</strong> an upstream server, proxy, or API timed out before the
              response completed.
            </li>
            <li>
              <strong>
                <code>Unexpected end of JSON input</code>
              </strong>
              : the file is incomplete or was truncated during export, upload, or download. That is not a formatting
              timeout.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Why very large JSON is hard to format in a browser</h2>
        <p>
          Full-document pretty-printing is expensive because the browser usually needs the entire payload before it can
          finish the job. Even fetching the data can be all-or-nothing: methods like <code>response.json()</code> and{" "}
          <code>response.text()</code> read the response to completion before you get the final value.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Parsing is synchronous:</strong> once <code>JSON.parse()</code> starts, the current thread stays
            busy until it finishes or throws.
          </li>
          <li>
            <strong>Pretty-printing adds more work:</strong> <code>JSON.stringify(value, null, 2)</code> has to walk
            the whole structure again to generate the indented output.
          </li>
          <li>
            <strong>Memory usage can multiply:</strong> you may temporarily hold the original text, the parsed object
            graph, and the formatted string at the same time.
          </li>
          <li>
            <strong>Rendering can be the second bottleneck:</strong> even after formatting succeeds, dumping a massive
            result into a text area or fully expanded tree can lock up the page again.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Common Mistake</h3>
          <p className="mt-2">
            Breaking the final string into chunks after calling <code>JSON.parse()</code> does not solve the hardest
            part. The expensive parse already happened, and if you call <code>JSON.stringify()</code> repeatedly inside
            a loop, you often make the problem worse.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. What actually helps in the browser</h2>
        <p>
          Browser-side fixes are mainly about keeping the page responsive and avoiding unnecessary copies. They help for
          medium-large files, but they are not a silver bullet for truly huge documents.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Move formatting into a Web Worker</strong> so the page stays interactive while the parse runs.
          </li>
          <li>
            <strong>Transfer bytes, not giant strings, when possible.</strong> Sending an <code>ArrayBuffer</code>{" "}
            with a transfer list avoids an extra copy of the raw bytes.
          </li>
          <li>
            <strong>Render lazily.</strong> Show a preview, collapsed tree, or first N lines before offering the full
            output.
          </li>
          <li>
            <strong>Set a size threshold.</strong> If a file is above your safe browser limit, stop early and recommend
            a CLI or server-side workflow instead of letting the tab die.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">More Accurate Worker Example</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// main-thread.js
const worker = new Worker(new URL("./json-format.worker.js", import.meta.url), {
  type: "module",
});

async function formatFile(file) {
  const bytes = await file.arrayBuffer();

  return new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      if (data.error) {
        reject(new Error(data.error));
        return;
      }

      resolve(data.formatted);
    };

    worker.onerror = (event) => {
      reject(new Error(event.message));
    };

    // Transfer ownership of the buffer instead of copying it.
    worker.postMessage(bytes, [bytes]);
  });
}`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 mt-6">
          <h3 className="text-lg font-medium">json-format.worker.js</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`self.onmessage = ({ data }) => {
  try {
    const text = new TextDecoder().decode(data);
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);

    self.postMessage({ formatted });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : "Unknown worker error",
    });
  }
};`}
          </pre>
          <p className="mt-3">
            This pattern improves responsiveness, not capacity. You still read the whole file, parse the whole file,
            and generate the whole formatted result.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. When a browser formatter is the wrong tool</h2>
        <p>
          If the job is big enough to freeze a modern desktop browser, full pretty-printing inside the tab is usually
          the wrong workflow. That is especially true when the document contains one huge top-level array or nested
          objects that must all be materialized before rendering.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-4">
          <h3 className="text-lg font-medium">Better options for very large files</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Command line:</strong> good for full-file formatting when your machine has enough RAM.
            </li>
            <li>
              <strong>Streaming processors:</strong> good when you need to extract, filter, or transform parts of a
              large file without building the whole result in memory.
            </li>
            <li>
              <strong>Server-side or async jobs:</strong> good when users need a downloadable formatted file and the
              browser should not do the heavy lifting.
            </li>
            <li>
              <strong>Different export format:</strong> NDJSON or paginated exports are often easier to inspect than one
              giant JSON document.
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Useful CLI Fallbacks</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`# Pretty-print a complete JSON file
jq . large.json > large.pretty.json

# Python ships with a simple formatter too
python -m json.tool large.json > large.pretty.json

# Inspect a huge file as a token stream instead of pretty-printing the whole thing
jq --stream '.' large.json | head`}
          </pre>
          <p className="mt-3">
            <code>jq --stream</code> is useful for inspection and transformation, but it is not a drop-in replacement
            for pretty-printing the original document with normal indentation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Fix the source of the problem when you control the data</h2>
        <p>
          If you own the API or export pipeline, preventing giant monolithic JSON files is better than trying to format
          them after the fact.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Paginate large API responses</strong> instead of returning one enormous array.
          </li>
          <li>
            <strong>Offer filtered exports</strong> so users can request only the fields or date ranges they need.
          </li>
          <li>
            <strong>Use NDJSON for logs or event streams</strong> when records can be processed one line at a time.
          </li>
          <li>
            <strong>Generate formatted downloads asynchronously</strong> instead of keeping the user on a live request
            that may hit proxy timeouts.
          </li>
          <li>
            <strong>Remember that compression only helps transfer size.</strong> After download, the JSON still has to
            be decompressed, parsed, and rendered.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">6. Practical decision rule</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If the goal is <strong>quick inspection</strong>, validate the file and preview a small slice or selected
              path instead of formatting the whole document.
            </li>
            <li>
              If the goal is <strong>full pretty-printing in a web app</strong>, use a worker and a lazy viewer, then
              fail fast above a defined size threshold.
            </li>
            <li>
              If the goal is <strong>full-file formatting of very large JSON</strong>, switch to a CLI, desktop, or
              async server workflow.
            </li>
            <li>
              If the goal is <strong>continuous processing of huge data</strong>, redesign the pipeline around
              pagination, NDJSON, or streaming transforms instead of one massive JSON blob.
            </li>
          </ul>
        </div>

        <p>
          The key point is simple: when formatting extremely large JSON files, responsiveness tricks help only up to a
          point. Once the browser has to hold too much data or do too much synchronous work, the correct fix is usually
          to change the workflow, not just the formatter.
        </p>
      </div>
    </>
  );
}
