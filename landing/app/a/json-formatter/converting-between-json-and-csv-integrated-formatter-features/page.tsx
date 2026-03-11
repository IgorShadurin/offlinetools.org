import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV and CSV to JSON: Integrated Formatter Features | Offline Tools",
  description:
    "Practical guide to converting JSON to CSV and CSV to JSON. Learn how good formatters handle nested objects, arrays, missing fields, delimiters, quotes, type inference, spreadsheet imports, and common errors.",
};

export default function JsonCsvConversionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Converting Between JSON and CSV: Integrated Formatter Features</h1>

      <div className="space-y-6">
        <p>
          Converting JSON and CSV is easy only when the data is already flat and consistent. Real files usually contain
          nested objects, missing keys, mixed types, embedded commas, or spreadsheet-specific surprises. A useful
          integrated formatter does more than just flip formats: it validates the input, previews the resulting schema,
          and lets you control how headers, nulls, quotes, and nested values are handled before export.
        </p>

        <p>
          Use JSON to CSV when you need rows for spreadsheets, reporting, or bulk imports. Use CSV to JSON when
          spreadsheet or database exports need to move into APIs, scripts, or app configuration. The conversion itself
          is rarely the hard part. The important part is choosing sane rules for data that does not map perfectly from a
          tree structure to a table and back again.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Converts Cleanly and What Needs Extra Decisions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-semibold">Usually Safe</h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>JSON arrays of objects where every item has the same flat keys.</li>
              <li>CSV files with one clear header row and the same number of fields on every row.</li>
              <li>Values that can stay as plain strings without type inference.</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-semibold">Needs Choices</h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Nested objects and arrays in JSON.</li>
              <li>Rows with missing fields or objects with inconsistent keys.</li>
              <li>Duplicate CSV headers, locale-specific delimiters, and mixed data types.</li>
              <li>IDs, ZIP codes, dates, or leading-zero values that must not be auto-converted.</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON to CSV: Rules a Formatter Should Make Explicit</h2>
        <p>
          CSV is a flat table. JSON is often hierarchical. That means a formatter has to decide what the columns are,
          what to do with missing keys, and how to represent nested content without losing meaning.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Build a Stable Column Set</h3>
        <p>
          For arrays of objects, the safest behavior is to build columns from the union of keys across all rows, keep a
          predictable column order, and leave empty cells where a key is missing. If the tool only looks at the first
          object, later fields can disappear from the export.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Decide How to Handle Nested Data</h3>
        <p>Good formatters typically offer one of three strategies:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            <strong>Flatten nested objects</strong> into dot-path columns such as <code>customer.city</code>.
          </li>
          <li>
            <strong>Stringify arrays or objects</strong> into a single CSV cell as JSON text.
          </li>
          <li>
            <strong>Reject or warn on nested data</strong> when the export is meant to stay strictly tabular.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Input (JSON):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`[
  {
    "id": 1,
    "customer": { "name": "Ana", "city": "Riga" },
    "tags": ["vip", "beta"]
  },
  {
    "id": 2,
    "customer": { "name": "Ben" },
    "tags": []
  }
]`}</pre>
          </div>

          <h4 className="text-lg font-medium mt-4">Example Output (CSV with flattened objects and stringified arrays):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`id,customer.name,customer.city,tags
1,Ana,Riga,"[""vip"",""beta""]"
2,Ben,,"[]"`}</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Keep Empty, Missing, and Null Values Straight</h3>
        <p>
          These values often collapse into the same blank CSV cell, but they are not identical. A robust formatter
          should make the rule clear: does an empty cell mean an empty string, a missing property, or JSON{" "}
          <code>null</code>? That choice matters when you later re-import the file.
        </p>

        <h2 className="text-2xl font-semibold mt-8">CSV to JSON: Where Ambiguity Starts</h2>
        <p>
          CSV looks simple, but it carries much less structure than JSON. A formatter has to infer or ask about
          headers, delimiters, quotes, and data types before it can safely produce JSON.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Confirm the Header Row</h3>
        <p>
          If the first row is not really a header, the output keys will be wrong. Duplicate headers are another common
          problem. A formatter should warn instead of silently overwriting repeated names.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Treat Type Inference as a Choice, Not a Guarantee</h3>
        <p>
          CSV itself does not define numbers, booleans, dates, or null values. Safe tools let you keep everything as a
          string by default and opt into inference only when you trust the column content.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Input (CSV):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`sku,qty,active,zip
00123,10,true,02108`}</pre>
          </div>

          <h4 className="text-lg font-medium mt-4">Safer Output (JSON, strings preserved):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`[
  {
    "sku": "00123",
    "qty": "10",
    "active": "true",
    "zip": "02108"
  }
]`}</pre>
          </div>

          <h4 className="text-lg font-medium mt-4">Possible Output (JSON, with inference enabled):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`[
  {
    "sku": "00123",
    "qty": 10,
    "active": true,
    "zip": "02108"
  }
]`}</pre>
          </div>
        </div>

        <p>
          In many real datasets, identifiers, postal codes, account numbers, and version-like values should remain
          strings even when they look numeric.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Verify Delimiter and Quote Handling</h3>
        <p>
          Auto-detection is helpful, but it is still a heuristic. Files may use commas, semicolons, or tabs, and
          quoted fields can legally contain commas, quotes, and even line breaks. If the preview looks misaligned, the
          parser settings are probably wrong.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Interoperability Details That Still Trip People Up</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Quoted CSV fields are allowed to contain commas, double quotes, and line breaks.</span>{" "}
              If a tool splits rows inside quoted cells, the parser is not respecting CSV rules.
            </li>
            <li>
              <span className="font-medium">UTF-8 is the safest modern default for interchange.</span> If strange
              characters appear after conversion, check the source encoding before blaming the formatter.
            </li>
            <li>
              <span className="font-medium">Spreadsheet apps often reinterpret raw CSV values.</span> Dates, long
              numbers, and leading zeros are especially vulnerable when a CSV file is opened directly instead of being
              imported with explicit column types.
            </li>
            <li>
              <span className="font-medium">CSV exported for spreadsheets can create security issues.</span> If cells
              start with <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code>, some spreadsheet apps may
              treat them as formulas. Integrated tools aimed at business exports should consider a safe-export option.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What to Look for in an Integrated Formatter</h2>
        <p>The most useful JSON and CSV tools expose the conversion rules instead of hiding them.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Format preview and validation:</span> Show syntax errors before conversion
              and preview the resulting table or object structure.
            </li>
            <li>
              <span className="font-medium">Manual overrides:</span> Let you set delimiters, header presence, quote
              behavior, and escape rules instead of relying entirely on auto-detection.
            </li>
            <li>
              <span className="font-medium">Schema controls:</span> Choose column order, flatten nested paths, or
              stringify complex values intentionally.
            </li>
            <li>
              <span className="font-medium">Type controls:</span> Keep everything as strings, infer types globally, or
              apply rules only to selected columns.
            </li>
            <li>
              <span className="font-medium">Error reporting:</span> Surface the row, field, or key that caused a
              malformed result instead of failing with a vague parse message.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Quick Troubleshooting Guide</h2>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            <strong>Columns are missing after JSON to CSV conversion:</strong> The tool may have inferred headers from
            only the first object instead of the full dataset.
          </li>
          <li>
            <strong>Rows split unexpectedly:</strong> The CSV likely contains embedded line breaks inside quoted fields,
            and the parser settings are wrong.
          </li>
          <li>
            <strong>Leading zeros disappeared:</strong> The data was probably opened in a spreadsheet that auto-cast the
            column. Re-import it as text.
          </li>
          <li>
            <strong>Nested JSON became unreadable:</strong> Switch from flattening to stringifying, or export multiple
            tables instead of forcing a single CSV.
          </li>
          <li>
            <strong>Booleans or numbers converted incorrectly:</strong> Disable inference and inspect the raw strings
            first.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">A Practical Default Workflow</h2>
        <ol className="list-decimal pl-6 my-4 space-y-2">
          <li>Inspect a small sample first instead of converting the full dataset blindly.</li>
          <li>Confirm whether the target is a spreadsheet, an API payload, or a machine-to-machine export.</li>
          <li>Choose how to handle nested values before conversion: flatten, stringify, or reject.</li>
          <li>Decide whether blanks should map to empty strings, missing keys, or nulls.</li>
          <li>For CSV imports, verify delimiter, header row, and whether type inference should stay off.</li>
          <li>Preview the output before export, especially for dates, IDs, and long numeric strings.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrated JSON and CSV formatters are most valuable when they make conversion rules visible. The best tools
          do not just produce output quickly; they help you preserve structure, keep identifiers intact, handle nested
          data deliberately, and catch parsing issues before the file reaches a spreadsheet or API.
        </p>
        <p>
          If your data is already row-shaped, conversion is straightforward. If it is not, the right formatter still
          helps, but only if it gives you control over schema, quoting, delimiters, and type handling.
        </p>
      </div>
    </>
  );
}
