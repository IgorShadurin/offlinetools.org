import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Handling When Converting Between JSON and Other Formats | Offline Tools",
  description:
    "Prevent data loss when converting JSON to CSV, YAML, TOML, XML, or CBOR. Learn which format fits the job, where conversions fail, and how to recover cleanly.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Error Handling When Converting Between JSON and Other Formats</h1>

      <div className="space-y-6">
        <p>
          Most JSON conversion bugs are not parser bugs. They happen because the target format cannot represent
          something JSON can represent, or it represents the same data with different rules for types, nesting,
          quoting, duplicate keys, or character encoding.
        </p>

        <p>
          That means the first error-handling decision is often not how to recover after a failed conversion. It is
          whether JSON is even the right format to leave behind. If a search visitor lands here wondering whether they
          should use CSV, YAML, TOML, XML, or a binary format instead, that is the right question to ask before
          writing more conversion code.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300">Short Answer</h2>
          <ul className="mt-2 list-disc pl-6 space-y-2 text-blue-900 dark:text-blue-100">
            <li>Use CSV only for flat, row-based exports where type loss is acceptable.</li>
            <li>Use YAML when humans need to edit the file, but pin parser behavior and quote ambiguous values.</li>
            <li>Use TOML for configuration data where strict structure and duplicate-key errors are helpful.</li>
            <li>Use XML when namespaces, attributes, or mixed document structure matter.</li>
            <li>Use CBOR or another binary format when machines exchange the data and compact transport matters.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Choose the Target Format Before You Debug the Converter</h2>

        <h3 className="text-xl font-medium mt-6">CSV: best for tables, worst for nested data</h3>
        <p>
          CSV is a transport format for rows and columns. It does not preserve JSON object nesting, arrays, booleans,
          nulls, or numbers on its own. If each JSON object maps cleanly to one row, CSV is fine. If not, conversion
          errors usually show up later during import because the structure was already flattened or serialized into one
          cell.
        </p>

        <h3 className="text-xl font-medium mt-6">YAML: more editable, but parser behavior matters</h3>
        <p>
          YAML is often easier for humans to read and supports comments and multi-line text. The tradeoff is that YAML
          loaders are not as uniform as JSON parsers. Ambiguous scalars, duplicate keys, and older YAML 1.1-style
          boolean handling can all change how the same file is interpreted unless you keep the emitting and parsing
          rules consistent.
        </p>

        <h3 className="text-xl font-medium mt-6">TOML: strong choice for config files</h3>
        <p>
          TOML is intentionally strict. That is useful for configuration because duplicate keys fail fast and date/time
          values have first-class syntax. It is less suitable as a drop-in replacement for arbitrary JSON documents,
          especially when you are trying to round-trip data from APIs without adding format-specific rules.
        </p>

        <h3 className="text-xl font-medium mt-6">XML: good when document semantics matter</h3>
        <p>
          XML can represent hierarchies, but it models them differently. Attributes, repeated elements, namespaces, and
          mixed content all need explicit mapping rules when you convert from JSON. Without that mapping, the hard part
          is not producing valid XML. It is producing XML that can later be converted back without surprise losses.
        </p>

        <h3 className="text-xl font-medium mt-6">CBOR: safer than text when machines talk to machines</h3>
        <p>
          If both ends are software and you want something more compact than JSON, CBOR is often a better target than a
          human-readable text format. It preserves richer types than JSON, but that also means converting back to JSON
          can still lose information unless you decide how to encode byte strings, non-string map keys, and very large
          integers.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Where Conversions Fail in Practice</h2>

        <h3 className="text-xl font-medium mt-6">1. Duplicate keys get lost before you notice</h3>
        <p>
          JSON object member names are supposed to be unique for interoperable behavior. If a source object repeats the
          same key, some parsers keep the last value, others fail, and some preserve order in custom ways. By the time
          you run your JSON-to-anything converter, the earlier value may already be gone.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Problem Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "role": "user",
  "role": "admin"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If your parser keeps only the last entry, the converter never gets a chance to warn about the data loss.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Numbers, dates, and times drift across formats</h3>
        <p>
          JSON has one number type. CSV effectively has none. TOML has explicit date/time values. CBOR can preserve
          richer numeric types than a JavaScript-based JSON pipeline can safely round-trip. Large identifiers,
          timestamps without timezone context, and decimals used for money are common sources of silent corruption.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">Precision Drift Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "invoiceId": 9007199254740993,
  "createdAt": "2026-03-11T09:00:00",
  "total": 19.99
}`}
            </pre>
          </div>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>`invoiceId` is not a safe integer in many JavaScript stacks.</li>
            <li>`createdAt` is a string until you assign timezone and type semantics.</li>
            <li>`total` may not survive float conversions cleanly in every target pipeline.</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Flat exports hide structural loss</h3>
        <p>
          JSON arrays and nested objects do not map naturally to CSV. Teams often flatten some fields, join arrays with
          a separator, and JSON-stringify the rest. That can be a valid strategy, but it is a lossy contract unless the
          importer knows exactly how each column was encoded.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">JSON to CSV Loss Point</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON input
{
  "user": {
    "name": "Alicia",
    "roles": ["admin", "billing"]
  },
  "notes": ["paid", "priority"]
}

// One possible CSV row
// user.name,user.roles,notes
// Alicia,"admin|billing","paid|priority"`}
            </pre>
          </div>
          <p className="mt-2 text-sm">That row is only reversible if the importer also knows that `|` is the array separator.</p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Escaping and encoding rules differ</h3>
        <p>
          CSV fields containing commas, quotes, or line breaks need quoting rules. XML requires entity escaping for
          markup-sensitive characters. YAML block strings can preserve line breaks differently than JSON strings. Errors
          in this layer often look random because the content is valid in the source format but invalid only after
          conversion.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Escaping Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "title": "Senior \"Platform\" Engineer",
  "summary": "Line 1\nLine 2, with a comma",
  "html": "<p>ready & waiting</p>"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            That one object needs different escaping decisions for CSV, XML, YAML, and any HTML-aware downstream
            system.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">5. YAML and TOML can fail for opposite reasons</h3>
        <p>
          YAML is permissive enough that unquoted values can be interpreted differently by different loaders. TOML is
          strict enough that an invalid key layout or repeated key stops parsing immediately. Both are useful behaviors,
          but your error handling needs to reflect which side of that tradeoff you are choosing.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">Ambiguous Scalar Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`featureFlag: on
buildNumber: 010
releaseDate: 2026-03-11`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Keep values like these quoted when their meaning must stay string-only across different YAML parsers or when
            moving them into TOML or JSON later.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A Practical Error-Handling Workflow</h2>

        <h3 className="text-xl font-medium mt-6">1. Validate the source before choosing a target</h3>
        <p>
          Start with syntax validation, then check conversion-specific rules such as safe integers, required keys,
          timestamp format, and whether nested objects are allowed. If duplicate-key rejection matters, detect it at the
          parser level instead of after `JSON.parse`.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Validation Example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function validateForExport(rawJson) {
  const issues = [];
  let data;

  try {
    data = JSON.parse(rawJson);
  } catch (error) {
    return { ok: false, data: null, issues: [\`Invalid JSON: \${error.message}\`] };
  }

  if (typeof data.invoiceId === "number" && !Number.isSafeInteger(data.invoiceId)) {
    issues.push("invoiceId exceeds Number.MAX_SAFE_INTEGER; export it as a string");
  }

  if (Array.isArray(data.notes) && data.notes.some((value) => value.includes("|"))) {
    issues.push("notes already contains the chosen CSV separator '|'");
  }

  return { ok: issues.length === 0, data, issues };
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Make your conversion contract explicit</h3>
        <p>
          Do not hide mapping rules inside the converter. Decide up front how arrays, nested objects, nulls, dates, and
          special numeric values should be emitted. If a round-trip is required, document how the importer reverses each
          rule.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Explicit Mapping Contract</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const exportContract = {
  csv: {
    arrays: "join-with-pipe",
    nestedObjects: "json-stringify",
    nulls: "empty-string",
    dates: "iso-8601-string"
  },
  toml: {
    duplicateKeys: "error",
    timestamps: "emit-as-datetime-when-semantic-type-is-known"
  },
  xml: {
    rootElement: "record",
    arrays: "repeat-sibling-elements",
    attributes: "never-infer-without-a-schema"
  }
};`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Return data and warnings together</h3>
        <p>
          A converter that only returns success or failure is too coarse for real data. Collect warnings for lossy but
          acceptable transforms so callers can decide whether to continue, show a banner, or reject the export.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JSON to CSV with Warnings</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function jsonRecordToCsvRow(record) {
  const issues = [];

  const row = {
    id: String(record.id ?? ""),
    active: String(record.active ?? ""),
    tags: Array.isArray(record.tags) ? record.tags.join("|") : "",
    metadata_json: ""
  };

  if (record.metadata && typeof record.metadata === "object") {
    row.metadata_json = JSON.stringify(record.metadata);
    issues.push("metadata was packed into metadata_json and must be parsed during import");
  }

  if (Array.isArray(record.tags) && record.tags.some((tag) => tag.includes("|"))) {
    issues.push("tag values include '|'; pick a different separator or escape strategy");
  }

  return { row, issues };
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Re-parse the output whenever possible</h3>
        <p>
          The fastest way to catch conversion bugs is to parse the generated output with the same class of parser your
          downstream system uses. If you emit YAML, load it with the exact YAML library used in production. If you emit
          CSV, import it with the same delimiter, quote, and newline settings your consumer expects.
        </p>

        <h3 className="text-xl font-medium mt-6">5. Preserve the original when the mapping is lossy</h3>
        <p>
          If fidelity matters, store the original JSON alongside the converted representation or keep a checksum and
          warning log with the export. This is especially useful for CSV downloads, spreadsheet integrations, and legacy
          XML feeds where the target format cannot represent the full source structure.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Practical Rule</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If you need exact round-trip fidelity, JSON to YAML or JSON to CBOR is usually safer than JSON to CSV or
            JSON to XML. If you need human editing, YAML or TOML may be worth the tradeoff. If you need spreadsheet
            compatibility, accept that CSV is an export view, not a faithful storage format.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting by Symptom</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All values came back as strings: your pipeline likely passed through CSV or a schema-free import step.</li>
          <li>One field vanished without an error: check for duplicate keys before JSON parsing.</li>
          <li>Boolean values changed unexpectedly: check YAML parser version and quote ambiguous scalars.</li>
          <li>Large IDs changed value: stop treating identifiers as generic JSON numbers.</li>
          <li>Date or time shifted: distinguish plain strings from timezone-aware timestamps before conversion.</li>
          <li>Round-trip import fails only on some records: inspect escaping, delimiter, and newline handling first.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Good error handling for JSON conversion starts with format selection, not just exception handling. Once you
          know whether the target is CSV, YAML, TOML, XML, or CBOR, define the loss points up front, return warnings
          with the converted output, and test with the same parser behavior your downstream system actually uses.
        </p>

        <p className="mt-4">
          If a conversion rule cannot be explained in one sentence, it probably needs to be written down as part of the
          contract. That is usually the difference between a converter that merely produces output and one that produces
          reliable data.
        </p>
      </div>
    </>
  );
}
