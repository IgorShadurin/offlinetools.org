import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Search Functionality in Large JSON Documents | Offline Tools",
  description:
    "A practical guide to searching large JSON files locally with in-memory search, streaming, NDJSON, Web Workers, jq --stream, and reusable indexes.",
};

export default function LargeJsonSearchArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Search Functionality in Large JSON Documents</h1>

      <div className="space-y-6">
        <p>
          Search in a huge JSON file stops being a simple <code>JSON.parse()</code> problem very quickly. For a 20 MB
          config dump, in-memory search is fine. For a 4 GB export, it can freeze the UI, exhaust memory, or make each
          query take a full-file scan. The right implementation depends on three things: file size, file shape, and how
          often users search the same data.
        </p>
        <p>
          The practical rule is simple: load smaller files fully, stream larger ones, prefer record-oriented formats
          such as NDJSON when you control the export, and build an index when repeated searches matter more than
          one-time setup cost.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start by Defining What &quot;Search&quot; Means</h2>
        <p>
          Before choosing an algorithm, pin down the exact query behavior you need. Different search modes lead to very
          different implementations:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Value search:</span> Find objects where any string field contains
            &quot;alice&quot;.
          </li>
          <li>
            <span className="font-medium">Path-restricted search:</span> Search only inside fields such as{" "}
            <code>title</code>, <code>email</code>, or <code>description</code>.
          </li>
          <li>
            <span className="font-medium">Key search:</span> Match property names, not just values.
          </li>
          <li>
            <span className="font-medium">Exact vs. partial matching:</span> Decide whether you need substring search,
            exact equality, prefixes, or regular expressions.
          </li>
          <li>
            <span className="font-medium">Single query vs. repeated queries:</span> If the same large file will be
            searched many times, indexing usually beats scanning.
          </li>
        </ul>
        <p>
          This sounds obvious, but it is the difference between a fast targeted scan and an expensive &quot;search
          everything in every field&quot; fallback.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choose the Right Strategy Early</h2>
        <p>
          A lot of large-JSON search problems become much easier once you choose the correct storage and parsing model:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Small to moderate files:</span> Parse once, recursively search, and cap the
            number of matches returned.
          </li>
          <li>
            <span className="font-medium">Huge single JSON documents:</span> Use a tokenizing or streaming parser and
            inspect values as they are emitted.
          </li>
          <li>
            <span className="font-medium">Many independent records:</span> Convert to or export as NDJSON / JSON Lines
            and process one record per line.
          </li>
          <li>
            <span className="font-medium">Repeated searches on mostly static data:</span> Build a lightweight index
            once, then resolve queries against the index instead of rescanning the whole file.
          </li>
        </ul>
        <p>
          If you control the data producer, changing the format often delivers a bigger speedup than tweaking the
          search code.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Bounded In-Memory Search</h3>
          <p className="text-sm mb-2">
            Use this when the parsed document comfortably fits in memory and you want predictable UX.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function searchJson(root, query, options = {}) {
  const {
    fields = null,
    caseSensitive = false,
    maxResults = 100,
  } = options;

  const needle = caseSensitive ? query : query.toLowerCase();
  const results = [];

  function matches(value) {
    const text = String(value);
    const haystack = caseSensitive ? text : text.toLowerCase();
    return haystack.includes(needle);
  }

  function visit(node, path = "$") {
    if (results.length >= maxResults || node == null) return;

    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, \`\${path}[\${index}]\`));
      return;
    }

    if (typeof node !== "object") return;

    for (const [key, value] of Object.entries(node)) {
      const nextPath = \`\${path}.\${key}\`;
      const fieldAllowed = !fields || fields.includes(key);

      if (fieldAllowed && (typeof value === "string" || typeof value === "number")) {
        if (matches(value)) {
          results.push({ path: nextPath, value });
          if (results.length >= maxResults) return;
        }
      }

      visit(value, nextPath);
      if (results.length >= maxResults) return;
    }
  }

  visit(root);
  return results;
}

// Example:
// const searchResults = searchJson(jsonData, "alice", {
//   fields: ["name", "email"],
//   maxResults: 50,
// });
// console.log(searchResults);
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Three details matter here: restrict searchable fields, stop after a sensible result limit, and debounce the
            query input so you do not rescan the full object tree on every keystroke.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">For Browser-Based Offline Search, Use Streams and a Worker</h2>
        <p>
          Modern browsers can stream bytes from a local file and decode them incrementally, which is enough to build a
          responsive offline search flow. The important caveat is that generic JSON is still not line-delimited, so
          incremental search works best when the input is record-oriented, especially NDJSON / JSON Lines.
        </p>
        <p>
          In practice, keep the scanning logic inside a Web Worker so large searches do not block typing, scrolling, or
          result rendering in the main UI thread.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Streaming NDJSON Search in the Browser</h3>
          <p className="text-sm mb-2">
            This pattern is safe for newline-delimited records, not for arbitrary pretty-printed JSON.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`async function searchNdjsonFile(file, query, { fields = null, onMatch }) {
  const needle = query.toLowerCase();
  const reader = file
    .stream()
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let buffer = "";
  let lineNumber = 0;

  const inspectObject = (obj) => {
    const entries = fields
      ? fields.map((field) => [field, obj[field]])
      : Object.entries(obj);

    for (const [key, value] of entries) {
      if (typeof value === "string" && value.toLowerCase().includes(needle)) {
        onMatch({ lineNumber, key, value, object: obj });
        return;
      }
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\\n")) !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      lineNumber += 1;

      if (!line) continue;
      inspectObject(JSON.parse(line));
    }
  }

  if (buffer.trim()) {
    lineNumber += 1;
    inspectObject(JSON.parse(buffer));
  }
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is one of the cleanest offline implementations because the file is consumed as a stream, decoding is
            incremental, and each record can be parsed independently. It also maps well to progress reporting and
            cancelable searches.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Searching a Single Huge JSON Document</h2>
        <p>
          Plain JSON arrays and nested objects do not have safe record boundaries, so line-by-line parsing is usually
          incorrect unless the file is already NDJSON. For truly large single-document JSON, use a streaming parser or
          tokenizer that emits paths and scalar values as it walks the document.
        </p>
        <p>
          The implementation pattern is to maintain the current path, inspect only relevant scalar values, and skip
          expensive object reconstruction unless a candidate match is found.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Practical CLI Option: jq Streaming Mode</h3>
          <p className="text-sm mb-2">
            Useful when you need to inspect a massive JSON file locally without writing a full parser first.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`jq --stream '
  select(
    length == 2 and
    (.[1] | type) == "string" and
    (.[1] | test("alice"; "i"))
  )
  | { path: .[0], value: .[1] }
' large.json
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Streaming mode emits path/value pairs instead of reconstructing the entire JSON tree first. That makes it a
            good fit for large local files, but it also means your search logic has to think in terms of paths and
            tokens rather than full objects.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Use NDJSON or JSON Lines When You Can</h2>
        <p>
          If you control the export format, NDJSON is often the best answer. Each line is its own JSON value, so you
          can stream, parse, search, retry failed records, and shard work across workers without worrying about nested
          delimiter state from one giant array.
        </p>
        <p>
          This is especially effective for logs, analytics events, row-oriented exports, and search results that should
          link back to a single record rather than a deep path inside one monolithic document.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            One line equals one record, so partial reads are straightforward.
          </li>
          <li>
            Appending new data is simple because you do not need to rewrite a closing <code>]</code>.
          </li>
          <li>
            Search pipelines become much easier to parallelize and resume.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">When to Build an Index</h3>
          <p className="text-sm mb-2">
            Indexing is the right move when the same large file is searched again and again.
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Preprocess once:</span> Scan the file with a streaming parser and extract
              the fields you actually want searchable.
            </li>
            <li>
              <span className="font-medium">Normalize terms:</span> Lowercase, fold accents if needed, and tokenize
              consistently so query behavior is stable.
            </li>
            <li>
              <span className="font-medium">Store compact references:</span> Save byte offsets, line numbers, object
              ids, or path references instead of whole objects.
            </li>
            <li>
              <span className="font-medium">Resolve matches lazily:</span> When a query hits the index, read only the
              relevant records from the original file.
            </li>
          </ol>
        </div>
        <p>
          Indexing adds preprocessing time and extra storage, but it is often the only way to make repeated search feel
          instant on files that are too large to hold in memory.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Details That Matter in Practice</h2>
        <p>
          Most large-file search bugs come from UX and data-shape issues rather than the matching function itself.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Move work off the main thread:</span> In browser tools, run heavy scans in a
            Web Worker and stream partial results back to the UI.
          </li>
          <li>
            <span className="font-medium">Cancel stale searches:</span> If the user changes the query, abort the old
            scan instead of letting two full-file passes compete.
          </li>
          <li>
            <span className="font-medium">Cap and paginate results:</span> Returning the first 100 useful matches is
            usually better than trying to materialize 250,000 hits.
          </li>
          <li>
            <span className="font-medium">Be explicit about normalization:</span> Decide on case sensitivity, trimming,
            accent folding, and regex support up front.
          </li>
          <li>
            <span className="font-medium">Track location metadata:</span> Line numbers are enough for NDJSON; byte
            offsets or JSON paths are more useful for monolithic JSON.
          </li>
          <li>
            <span className="font-medium">Treat compressed files differently:</span> Random access by byte offset is
            much harder on <code>.gz</code> or <code>.zip</code> input than on raw JSON.
          </li>
          <li>
            <span className="font-medium">Handle malformed input gracefully:</span> Report the failing line, path, or
            approximate byte position instead of a generic parse failure.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Parsing a giant file on every keystroke instead of parsing once or indexing.
          </li>
          <li>
            Treating pretty-printed JSON as if it were safe to parse one line at a time.
          </li>
          <li>
            Searching every field when only two or three fields matter to the user.
          </li>
          <li>
            Building an index with character offsets, then trying to seek by byte position in UTF-8 text.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Tooling Notes</h2>
        <p>
          The platform choices are better now than they used to be. In the browser, local files can be streamed and
          decoded incrementally, and that work can run inside a Web Worker. On the command line, tools such as{" "}
          <code>jq --stream</code> let you inspect very large JSON inputs without waiting for a full parse first.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Good Defaults</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">One-off search:</span> Stream the file and stop early after enough matches.
            </li>
            <li>
              <span className="font-medium">Interactive product search:</span> Restrict the search scope, debounce
              input, and run work in a worker or background process.
            </li>
            <li>
              <span className="font-medium">Operational exports:</span> Prefer NDJSON if the source system can emit it.
            </li>
            <li>
              <span className="font-medium">Heavy repeat usage:</span> Build an index and refresh it only when the file
              changes.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing search functionality in large JSON documents is mostly a problem of choosing the correct data
          flow. If the file is small enough, recursive in-memory search is still the simplest answer. If it is large,
          stream it. If it is record-oriented, make it NDJSON. If users will search it repeatedly, index it.
        </p>
        <p>
          That decision tree produces better performance than trying to force every workload through one generic JSON
          search routine, and it leads to tooling that stays responsive even when the underlying document is very large.
        </p>
      </div>
    </>
  );
}
