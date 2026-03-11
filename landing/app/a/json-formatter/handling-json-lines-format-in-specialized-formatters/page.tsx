import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handling JSON Lines (JSONL and NDJSON) in Specialized Formatters | Offline Tools",
  description:
    "Learn how specialized formatters handle JSON Lines, JSONL, and NDJSON files, including line-by-line parsing, validation, blank lines, UTF-8 rules, and when to convert to standard JSON.",
};

export default function JsonLinesFormatArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling JSON Lines Format in Specialized Formatters</h1>

      <div className="space-y-6">
        <p>
          JSON Lines is not a single pretty-printed JSON document. It is a sequence of separate JSON values written one
          per line, usually for logs, exports, and streaming pipelines. That is why a normal JSON formatter often fails
          on line 2, while a formatter with JSONL or NDJSON support can validate and normalize the file correctly.
        </p>

        <p>
          For search users landing here directly, the key idea is simple: a specialized formatter should treat each
          physical line as its own JSON payload, report errors by line number, and avoid reformatting records into
          multi-line blocks unless it is explicitly converting the file into standard JSON first.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON Lines, JSONL, and NDJSON</h2>
        <p>
          In practice, people often use <code>JSON Lines</code>, <code>JSONL</code>, and <code>NDJSON</code>{" "}
          interchangeably. They all describe line-delimited JSON data, but the naming conventions you see in tools and
          APIs can differ.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Current conventions worth knowing</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>JSON Lines documentation uses the <code>.jsonl</code> extension and requires UTF-8 with no BOM.</li>
            <li>JSON Lines allows any valid JSON value on a line, not only objects.</li>
            <li>
              The NDJSON spec recommends the <code>.ndjson</code> extension and the media type{" "}
              <code>application/x-ndjson</code>.
            </li>
            <li>
              You may also encounter <code>application/jsonl</code>, but it is not broadly standardized.
            </li>
          </ul>
        </div>

        <p>
          That means a capable formatter should not care whether the file is called <code>events.jsonl</code> or{" "}
          <code>events.ndjson</code>. It should care about whether the content actually follows the one-value-per-line
          rule.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Makes a JSON Lines File Valid</h2>
        <p>
          The rules are stricter than many articles suggest. A valid JSON Lines or NDJSON file is not just “lots of
          JSON objects separated by Enter.”
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Core rules</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Use UTF-8 encoding.</li>
            <li>Do not include a byte order mark (BOM).</li>
            <li>Each line must be one complete JSON value.</li>
            <li>
              A line can hold an object, array, string, number, boolean, or <code>null</code>.
            </li>
            <li>Blank lines are not valid JSON values unless a parser explicitly chooses to ignore them.</li>
            <li>
              The delimiter is a newline. Parsers commonly accept both <code>\n</code> and <code>\r\n</code>.
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Valid JSON Lines example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"id":1,"name":"Apple"}
{"id":2,"name":"Banana"}
null
[1,2,3]`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Objects are the most common case, but they are not the only allowed values.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON Lines example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": 1,
  "name": "Apple"
}
{"id":2,"name":"Banana"}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The first record is valid JSON, but it spans multiple physical lines. That makes the file invalid as JSON
            Lines or NDJSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Standard JSON Formatters Fail</h2>
        <p>
          A standard formatter expects one JSON document from the first byte to the last. JSON Lines gives it multiple
          top-level JSON values back to back, so the parser usually accepts the first line and then throws an “extra
          data” or “unexpected token” style error when it encounters the second line.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Standard JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`[
  {"id":1,"name":"Apple"},
  {"id":2,"name":"Banana"}
]`}
            </pre>
          </div>
          <p className="mt-2 text-sm">One root array. A normal formatter can parse and indent it.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">JSON Lines</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"id":1,"name":"Apple"}
{"id":2,"name":"Banana"}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Two valid JSON values, but not one valid JSON document. A JSONL-aware formatter must switch to line mode.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a Specialized Formatter Should Actually Do</h2>
        <p>
          The useful behavior is not “pretend this is normal JSON.” It is to parse, validate, and rewrite records
          safely without destroying the line-delimited structure.
        </p>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>Split the input on newlines and inspect each non-empty line independently.</li>
          <li>Parse each line as a complete JSON value.</li>
          <li>Report exact line numbers for failures instead of stopping with a generic document-level error.</li>
          <li>Normalize whitespace inside each record and usually write it back as one compact line.</li>
          <li>Preserve record order so log streams and exports remain meaningful.</li>
          <li>Offer a separate “convert to array” view when a human wants classic multi-line pretty-printing.</li>
        </ul>

        <p>
          That last point matters. If a formatter expands one record into several physical lines and saves it as-is, the
          result is no longer valid JSON Lines. Pretty display mode is fine in an interface, but the exported file
          still needs one complete JSON value per line.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Best Formatting Modes for JSONL and NDJSON</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Validate in place:</span>
              <p className="text-sm">
                Keep the file as JSON Lines, flag bad records, and rewrite each valid line in compact canonical form.
              </p>
            </li>
            <li>
              <span className="font-medium">Inspect as an array:</span>
              <p className="text-sm">
                Wrap the records in a temporary array for reading, searching, or visual diffing, then export back to
                JSONL when finished.
              </p>
            </li>
            <li>
              <span className="font-medium">Stream large files:</span>
              <p className="text-sm">
                Process record by record instead of loading a huge array into memory. This is one of the main reasons
                JSON Lines exists in the first place.
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Problems and How to Fix Them</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Error after the first line:</span>
              <p className="text-sm">
                You are probably using a normal JSON parser instead of a line-aware formatter.
              </p>
            </li>
            <li>
              <span className="font-medium">Blank line in the middle of the file:</span>
              <p className="text-sm">
                Some tools reject it, while others ignore it only when configured to do so. Remove blank lines if you
                need predictable cross-tool behavior.
              </p>
            </li>
            <li>
              <span className="font-medium">Pretty-printed object pasted into a JSONL file:</span>
              <p className="text-sm">
                Collapse it back to one line before saving. Multi-line records break the delimiter model.
              </p>
            </li>
            <li>
              <span className="font-medium">Encoding issues or strange first-character errors:</span>
              <p className="text-sm">
                Check for UTF-8 encoding and remove any BOM at the start of the file.
              </p>
            </li>
            <li>
              <span className="font-medium">Confusion around newline characters inside strings:</span>
              <p className="text-sm">
                Escaped sequences like <code>{"\\n"}</code> inside a JSON string are fine. Literal line breaks inside a
                record are not.
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When to Keep JSON Lines vs Convert to Standard JSON</h2>
        <p>
          Keep the data as JSON Lines when you are handling logs, event streams, append-only datasets, or very large
          exports that benefit from record-by-record processing. Convert it to a standard JSON array when you need
          human-friendly pretty-printing, schema inspection, or a downstream tool that only accepts one root document.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Practical rule of thumb</h3>
          <p className="mt-2 text-sm">
            If the file needs to stay streamable, preserve one value per line. If the file needs to be easy for humans
            to browse and edit, convert it to a standard JSON array first, then convert it back when exporting.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What to Look for in a Formatter</h2>
        <p>
          A good JSONL formatter should explicitly mention <code>JSON Lines</code>, <code>JSONL</code>, or{" "}
          <code>NDJSON</code> support. It should validate each line independently, tell you which line failed, accept{" "}
          <code>.jsonl</code> and <code>.ndjson</code> inputs, and avoid saving multi-line records unless it is
          deliberately converting the data into standard JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Handling JSON Lines correctly is mostly about respecting the delimiter model. Each line is its own JSON value,
          the file is usually UTF-8, blank lines are risky, and classic whole-document pretty-printing is the wrong
          output mode unless you first convert to ordinary JSON. Specialized formatters succeed because they understand
          those rules instead of forcing line-delimited data through a normal JSON parser.
        </p>
      </div>
    </>
  );
}
