import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Export Functionality for Multiple Formats: JSON, CSV, XLSX, and PDF | Offline Tools",
  description:
    "A practical guide to exporting structured data into JSON, CSV, XLSX, and PDF with flattening strategies, safer CSV output, browser save flows, and large-file handling tips.",
};

export default function BuildingExportFunctionalityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Building Export Functionality for Multiple Formats</h1>

      <div className="space-y-6">
        <p>
          If your app already works with structured JSON, export is not just a download button. It is a data contract:
          one canonical dataset, a clear transformation for each output format, and a delivery path that still works
          when files get large. This article focuses on the practical implementation choices behind JSON, CSV, XLSX,
          and PDF exports.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start with an Export Contract</h2>
        <p>
          Before writing serializers, decide what users are actually exporting. For a JSON formatter or any structured
          data tool, that usually means separating the raw data from the presentation layer.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Canonical payload:</span> Keep one source object for export, rather than
            rebuilding data separately for CSV, PDF, and JSON.
          </li>
          <li>
            <span className="font-medium">Raw vs. flattened output:</span> JSON should preserve nesting, while CSV/XLSX
            usually need a tabular representation with stable columns.
          </li>
          <li>
            <span className="font-medium">Filenames and versioning:</span> Include the dataset name and date, such as{" "}
            <code>orders-2026-03-11.csv</code>, and add a schema version if downstream systems depend on it.
          </li>
          <li>
            <span className="font-medium">Permissions:</span> Export authorization should match what the user can see,
            especially for admin reports and account data.
          </li>
          <li>
            <span className="font-medium">Sync vs. async:</span> Small files can download immediately; large reports
            often need a queued export job and a later download link.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Which Formats Are Worth Offering?</h2>
        <p>
          Most products do not need every possible format. Ship the formats that map to real user workflows instead of
          adding options just because the format exists.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">JSON:</span> Best when users need the original structure, nested objects, and
            machine-readable data for APIs or automation.
          </li>
          <li>
            <span className="font-medium">CSV:</span> Best for spreadsheets and simple imports. Use it when the export
            can be represented as rows and columns.
          </li>
          <li>
            <span className="font-medium">XLSX:</span> Prefer this over CSV when users need multiple sheets, typed
            cells, formulas, frozen headers, or better spreadsheet fidelity.
          </li>
          <li>
            <span className="font-medium">PDF:</span> Good for printing, approvals, and fixed-layout sharing. It is a
            presentation export, not the best raw data format.
          </li>
          <li>
            <span className="font-medium">NDJSON:</span> Useful when exporting logs or event streams because each line
            is an independent JSON object and can be processed incrementally.
          </li>
        </ul>
        <p>
          XML is still valid for enterprise integrations, but it should usually be driven by a specific partner or
          legacy requirement rather than offered by default.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choose Client-Side or Server-Side Export</h2>
        <p>
          The correct implementation path depends more on dataset size and format complexity than on personal
          preference.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Client-side export works well when:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The user is exporting data that is already loaded in the browser.</li>
            <li>The file is small enough to fit comfortably in memory.</li>
            <li>You are generating JSON, CSV, or a small text-based report.</li>
            <li>You want the feature to keep working in an offline-capable web app.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Server-side export is safer when:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The export requires database access beyond what is visible on screen.</li>
            <li>The file may be large enough to stress the browser.</li>
            <li>You need reliable PDF rendering or full XLSX generation.</li>
            <li>The export should run in the background and finish later.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Use One Download Helper in the Browser</h2>
        <p>
          Even if each format has its own serializer, the browser download step should usually be centralized in one
          helper. That keeps your UI code simple and makes format additions less error-prone.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Browser download helper:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function downloadBlob(filename, mimeType, contents) {
  const blob =
    contents instanceof Blob
      ? contents
      : new Blob([contents], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.click();

  queueMicrotask(() => URL.revokeObjectURL(url));
}

// Example:
// downloadBlob("users.json", "application/json;charset=utf-8", jsonText);
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is enough for most JSON and CSV downloads. Save format-specific complexity for the serializer, not the
            button component.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON Export Should Preserve Structure</h2>
        <p>
          JSON is the easiest format to get right because it matches the original data model. Offer pretty-printed JSON
          for humans and minified JSON when file size matters. If the export is a stream of independent records, consider
          newline-delimited JSON as a second option instead of forcing everything into one large array.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JSON export example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function exportJson(filename, data, { pretty = true } = {}) {
  const json = JSON.stringify(data, null, pretty ? 2 : 0);
  downloadBlob(filename, "application/json;charset=utf-8", json);
}

function exportNdjson(filename, records) {
  const body = records.map((record) => JSON.stringify(record)).join("\\n");
  downloadBlob(filename, "text/plain;charset=utf-8", body);
}
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Flatten Nested Data Before CSV or XLSX</h2>
        <p>
          The hardest part of building export functionality for multiple formats is usually not file generation. It is
          deciding how nested JSON becomes a table. Pick one strategy and document it so users do not get surprised by
          missing or reshaped data.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Dot-path columns:</span> Convert nested properties to keys like{" "}
            <code>user.email</code> or <code>address.city</code>.
          </li>
          <li>
            <span className="font-medium">Array stringification:</span> Store arrays as JSON strings when preserving
            one row per record matters more than spreadsheet friendliness.
          </li>
          <li>
            <span className="font-medium">Row expansion:</span> Duplicate parent fields when each array item should
            become its own row.
          </li>
          <li>
            <span className="font-medium">Multi-sheet XLSX:</span> Put parent and child collections on separate sheets
            when users need both readability and relational detail.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Simple object flattener:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function flattenRecord(input, prefix = "", output = {}) {
  if (Array.isArray(input)) {
    output[prefix] = JSON.stringify(input);
    return output;
  }

  if (input && typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      const nextKey = prefix ? \`\${prefix}.\${key}\` : key;
      flattenRecord(value, nextKey, output);
    }
    return output;
  }

  output[prefix] = input ?? "";
  return output;
}

// flattenRecord({ user: { email: "a@b.com" }, tags: ["red", "blue"] })
// => { "user.email": "a@b.com", "tags": "[\\"red\\",\\"blue\\"]" }
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">CSV Needs More Care Than It Looks</h2>
        <p>
          CSV is deceptively simple. In practice you need correct quoting, consistent line endings, predictable column
          order, and a decision about how to handle spreadsheet formula injection. If humans mainly open the file in
          Excel or Google Sheets, that safety decision matters as much as escaping commas.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Safer CSV serializer:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const spreadsheetFormulaPrefix = /^[=+\\-@]/;

function toSpreadsheetCell(value, mode = "spreadsheet") {
  const text = value == null ? "" : String(value);

  if (mode === "spreadsheet" && spreadsheetFormulaPrefix.test(text)) {
    return \`\\t\${text}\`;
  }

  return text;
}

function escapeCsvCell(value, mode) {
  const text = toSpreadsheetCell(value, mode).replace(/"/g, '""');
  return /[",\\r\\n]/.test(text) ? \`"\${text}"\` : text;
}

function serializeCsv(rows, mode = "spreadsheet") {
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const lines = [
    headers.map((header) => escapeCsvCell(header, "data")).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsvCell(row[header], mode)).join(",")
    ),
  ];

  return lines.join("\\r\\n");
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Use <code>text/csv; charset=utf-8</code> when serving CSV. If spreadsheet compatibility matters, many teams
            also prepend a UTF-8 BOM before download so Excel opens non-ASCII text cleanly.
          </p>
        </div>
        <p>
          There is no universal CSV injection mitigation that fits every product. Prefixing dangerous cells with a tab
          or similar character can protect spreadsheet users, but it also changes the exported value. If the file is
          meant for machine import, validation or explicit rejection of dangerous leading characters may be the better
          choice.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Stream Large Exports on the Server</h2>
        <p>
          Once exports get big, generating the whole file in memory becomes wasteful. A server route can stream rows as
          they are produced and still return a normal file download to the browser.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Next.js route example for streaming CSV:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// app/api/export-users/route.ts
const spreadsheetFormulaPrefix = /^[=+\\-@]/;

function escapeCsvCell(value) {
  const text = value == null ? "" : String(value);
  const safe = spreadsheetFormulaPrefix.test(text) ? \`\\t\${text}\` : text;
  const escaped = safe.replace(/"/g, '""');
  return /[",\\r\\n]/.test(escaped) ? \`"\${escaped}"\` : escaped;
}

const encodeRow = (values) =>
  values.map((value) => escapeCsvCell(value)).join(",") + "\\r\\n";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(encodeRow(["id", "email", "plan"])));

      for await (const user of streamUsersFromDatabase()) {
        controller.enqueue(
          encoder.encode(encodeRow([user.id, user.email, user.plan]))
        );
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="users-export.csv"',
      "Cache-Control": "no-store",
    },
  });
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This pattern is a better fit than client-side export when the data is large, permissioned, or fetched a
            page at a time from the database.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Use the File System Access API as Progressive Enhancement</h2>
        <p>
          Modern Chromium-based browsers can let users choose an exact save location and overwrite an existing file with
          the File System Access API. That is useful for power-user workflows, but it is not a universal replacement for
          regular downloads because browser support is still limited.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Progressive save flow:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`async function saveExport({ filename, mimeType, contents }) {
  if (!("showSaveFilePicker" in window)) {
    downloadBlob(filename, mimeType, contents);
    return;
  }

  const extension = filename.split(".").pop();
  const handle = await window.showSaveFilePicker({
    suggestedName: filename,
    types: [
      {
        description: "Export file",
        accept: { [mimeType]: [\`.\${extension}\`] },
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write(contents);
  await writable.close();
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Call this from a direct user action such as a button click, use it only on HTTPS pages, and keep the
            regular download fallback for browsers that do not support the API.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">PDF and XLSX Are Usually Server Concerns</h2>
        <p>
          Teams often underestimate how different PDF and XLSX are from JSON and CSV. If the output needs layout,
          typography, multiple sheets, formulas, or exact print rendering, the server usually gives you more predictable
          results than browser-only generation.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">PDF:</span> Treat it like a report template. Separate the printable layout
            from the JSON source data so you can change the design without breaking the export contract.
          </li>
          <li>
            <span className="font-medium">XLSX:</span> Use it when you need typed dates, number formats, frozen header
            rows, formulas, or multiple related tables in one file.
          </li>
          <li>
            <span className="font-medium">Very large exports:</span> Queue the job, store the file temporarily, and let
            the user download it later instead of holding an HTTP request open for minutes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Practical Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Keep one canonical export model and write separate serializers for each format.</li>
          <li>Document how nested JSON becomes rows, columns, or multiple sheets.</li>
          <li>Use stable column order so repeated exports compare cleanly.</li>
          <li>Set correct response headers, especially MIME type and <code>Content-Disposition</code>.</li>
          <li>Decide explicitly how you will handle CSV formula injection.</li>
          <li>Prefer server-side export for large files, PDF generation, and rich XLSX output.</li>
          <li>Offer a normal download fallback even if you add a File System Access save flow.</li>
          <li>Test with non-ASCII text, embedded quotes, commas, line breaks, and large arrays.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building export functionality for multiple formats goes well when you treat it as a pipeline: canonical data
          first, a deliberate transformation for each format second, and the delivery mechanism last. JSON preserves the
          source of truth, CSV and XLSX serve spreadsheet workflows, PDF serves presentation, and server-side streaming
          keeps large exports reliable. That combination is far more useful than a long list of format buttons with vague
          behavior behind them.
        </p>
      </div>
    </>
  );
}
