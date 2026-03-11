import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formatting Large JSON Files: Pagination and Performance | Offline Tools",
  description:
    "Learn when pagination works for large JSON, when it does not, and how streaming, Web Workers, and virtual rendering keep formatting responsive.",
};

export default function LargeJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Formatting Large JSON Files: Pagination and Performance</h1>

      <div className="space-y-6">
        <p>
          Formatting large JSON is rarely slow because of indentation alone. The real bottlenecks are reading the file,
          parsing it into memory, and rendering a huge tree or text view without freezing the UI. Pagination helps, but
          only when the JSON can be split into sensible records.
        </p>
        <p>
          For search visitors landing here directly, the key distinction is simple: pagination works well for top-level
          arrays and JSON Lines style data, but a single giant JSON document still needs full parsing or an index before
          you can jump around efficiently.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">Short Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Pagination is strongest when the file is a top-level array of records.</li>
            <li>JSON Lines or NDJSON is even better because each line is already an independent JSON value.</li>
            <li>For a single huge object, the biggest wins usually come from background parsing and virtual rendering.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Large JSON Files Become Slow</h2>
        <p>
          A basic formatter often creates several expensive copies of the same data: the raw file contents, the parsed
          JavaScript object, and the formatted output string or DOM tree. On large inputs, that combination causes most
          performance failures.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Issues with Large Files:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>High memory use from keeping the raw text, parsed object, and formatted view at the same time</li>
            <li>Slow initial parse for minified exports and very large arrays</li>
            <li>Main-thread jank when `JSON.parse` or rendering happens in the UI thread</li>
            <li>Scroll lag caused by trying to render thousands of lines or nodes at once</li>
            <li>Browser crashes when the tool expects the entire document to fit comfortably in memory</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When Pagination Actually Works</h2>
        <p>
          Pagination is not a magic property of JSON itself. It is a strategy that depends on the shape of the data and
          whether your tool can identify stable record boundaries.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Top-level array: best fit for pagination</h3>
            <p className="text-sm">
              If the document is one large array of objects, a formatter can index or stream the array items and show
              records 1-100, then 101-200, and so on. This is the most natural form of JSON pagination.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">JSON Lines or NDJSON: best fit for streaming</h3>
            <p className="text-sm">
              Line-delimited JSON is even easier to page because each line is already a complete JSON value. That makes
              it a practical format for logs, exports, and bulk processing where you need one-record-at-a-time
              handling.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Single giant object: pagination is harder</h3>
            <p className="text-sm">
              If the file is one huge object or a deeply nested document, you usually cannot jump straight to
              &quot;page 5&quot; without first parsing enough of the file to understand its structure. In that case,
              pagination is mostly a UI technique layered on top of indexing or lazy expansion.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Conceptual Example: Paginating a Massive Array</h3>
        <p>Imagine a file containing a top-level array of user objects:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`[
  { "id": 1, "name": "Alice", ... },
  { "id": 2, "name": "Bob", ... },
  // ... potentially millions of entries ...
  { "id": 1000000, "name": "Eve", ... }
]`}
          </pre>
        </div>
        <p>
          A formatter optimized for large files would avoid rendering every record immediately. Instead, it would index
          the array boundaries, load the first page, and keep the rest off-screen until needed:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`Array [
  { "id": 1, "name": "Alice", ... },
  { "id": 2, "name": "Bob", ... },
  // ... items 3 through 100 ...
  { "id": 100, "name": "Charlie", ... }
]
Total items: 1,000,000
Showing items 1-100. [ Next Page ] [ Go to Page ... ]`}
          </pre>
        </div>
        <p>
          Clicking &quot;Next Page&quot; should only fetch or materialize the next chunk of records, not rebuild the
          entire view from scratch. The same principle applies to nested objects: collapse everything by default and
          expand branches only when the user asks for them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Performance Techniques That Matter Most</h2>
        <p>
          Current browsers provide useful primitives for large local files. `Blob.slice()` lets you read byte ranges,
          `Blob.stream()` gives you a readable stream for sequential processing, and both are available inside Web
          Workers. Those APIs matter because they let you reduce memory pressure and keep parsing off the main thread.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Chunked file reads</h3>
            <p className="text-sm">
              Reading a file in slices or as a stream is better than copying the entire payload into a text area first.
              It also makes it possible to build an index incrementally instead of allocating one huge string up front.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Background parsing with Web Workers</h3>
            <p className="text-sm">
              If parsing happens in the main thread, the interface will feel frozen even before rendering begins.
              Workers let you parse, scan, or index in a background thread while the UI stays interactive.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Indexed access for jump-to-page</h3>
            <p className="text-sm">
              True random access usually requires an index. For top-level arrays, that can be a map from record number
              to byte offset or token boundary. Without that index, jumping to a later page often means rescanning a
              large part of the file.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Virtual rendering</h3>
            <p className="text-sm">
              Even after parsing succeeds, rendering too many rows or tree nodes can make scrolling unusable. Windowing
              the visible rows and lazily expanding nested branches usually matters as much as faster parsing.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Important Caveat: You Cannot Parse Arbitrary JSON by Random Chunk</h2>
        <p>
          One common mistake is assuming you can cut a normal JSON document into 1 MB pieces and call `JSON.parse()` on
          each piece independently. That only works when each chunk is already a valid JSON value, such as JSON Lines.
          For standard JSON, chunking is useful for scanning, indexing, and transport, but not for blindly parsing at
          arbitrary byte boundaries.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Conceptual Browser Example</h3>
          <p className="text-sm">
            This pseudo-code shows the high-level browser pattern for large files: read in chunks, work in a worker,
            and send only the current page back to the main thread.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`// main thread
const worker = new Worker(new URL("./json-worker.js", import.meta.url));

worker.postMessage({ file, pageSize: 100 });

worker.onmessage = ({ data }) => {
  if (data.type === "page") {
    renderPage(data.items);
  }

  if (data.type === "progress") {
    updateProgress(data.loadedBytes, data.totalBytes);
  }
};

// worker thread
self.onmessage = async ({ data }) => {
  const { file, pageSize } = data;

  // Use file.slice() for byte-range reads or file.stream() for sequential scans.
  // If the input is JSON Lines, emit records as they arrive.
  // If the input is a top-level array, first build a lightweight index.
  // Only post the requested page back to the UI.
};`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            The exact parser varies by stack, but the architecture is consistent: avoid main-thread parsing and avoid
            rendering everything at once.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Choosing the Right Approach</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>If you control the export format, prefer top-level arrays or JSON Lines for large record sets.</li>
            <li>If you only need to inspect records, page them and collapse nested content by default.</li>
            <li>If you need a full pretty-printed version of one huge document, do the heavy parse outside the UI thread.</li>
            <li>If scrolling is still slow after parsing, the next bottleneck is usually DOM rendering, not JSON parsing.</li>
            <li>If users need random page jumps, build and reuse an index instead of rescanning the file each time.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Large JSON Viewers</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">The page freezes before anything renders</h3>
            <p className="text-sm">
              The parse is probably happening on the main thread. Move file scanning and parsing into a worker.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Scrolling is slow after load</h3>
            <p className="text-sm">
              The formatter is likely rendering too many DOM nodes. Add virtualization or collapse the tree more
              aggressively.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Jumping to later pages is still slow</h3>
            <p className="text-sm">
              That usually means the tool is rescanning from the beginning. Build offsets once, then reuse them for
              direct access.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Chunking breaks the JSON</h3>
            <p className="text-sm">
              Arbitrary byte slices are not valid JSON values. Use chunking for indexing, or switch the source format to
              JSON Lines when one-record-at-a-time processing is more important than a single monolithic document.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Large JSON formatting works best when you separate three concerns: how the file is read, where parsing occurs,
          and how much of the result is rendered at one time. Pagination is useful, but it is most effective when the
          JSON shape supports record boundaries. For everything else, indexing, workers, and virtual rendering are what
          keep large-file inspection practical.
        </p>
      </div>
    </>
  );
}
