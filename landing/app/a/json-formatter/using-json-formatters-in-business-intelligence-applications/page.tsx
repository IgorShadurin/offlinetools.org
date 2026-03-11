import type { Metadata } from "next";
import { Code, Braces, FileJson, Search, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters in Business Intelligence Applications",
  description:
    "Practical guide to using JSON formatters in BI workflows, including Power BI and Tableau use cases, import checks, privacy tips, and nested JSON troubleshooting.",
};

export default function JsonFormattersInBiPage() {
  return (
    <div className="container mx-auto px-4 py-8 prose dark:prose-invert max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">Using JSON Formatters in Business Intelligence Applications</h1>

      <p className="text-lg mb-8">
        JSON formatters are most useful in BI before data ever reaches a chart. They help analysts, analytics
        engineers, and dashboard developers inspect API payloads, understand nested structures, and catch schema issues
        before those issues turn into broken joins, wrong aggregates, or confusing refresh failures.
      </p>
      <p>
        That is not a niche workflow. Current{" "}
        <a
          href="https://learn.microsoft.com/en-us/power-query/connectors/json"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
        >
          Microsoft Power Query documentation
        </a>{" "}
        lists JSON import across Excel, Power BI semantic models, Power BI dataflows, Fabric Dataflow Gen2, and other
        Microsoft data products, while Tableau&apos;s supported{" "}
        <a
          href="https://www.tableau.com/developer/tools/web-data-connector"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
        >
          Web Data Connector
        </a>{" "}
        still supports pulling JSON over HTTP when no native connector exists. In other words, formatted JSON is part
        of everyday analytics operations, not just developer debugging.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <FileJson className="mr-3 text-blue-500" size={28} />
        Why Format JSON Before Modeling It
      </h2>

      <p>
        BI tools can ingest JSON, but they do not remove the need to understand it first. A formatter turns a compressed
        payload into something you can reason about quickly, which matters when you need to decide what becomes a fact
        table, what should stay as metadata, and which nested objects need to be expanded or normalized elsewhere.
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>
          <strong>See the real shape of the payload:</strong> root object, nested arrays, repeated records, optional
          fields, and mixed value types become obvious.
        </li>
        <li>
          <strong>Catch modeling problems early:</strong> numbers stored as strings, missing keys, null-heavy fields,
          and timestamps with inconsistent offsets are easier to spot before import.
        </li>
        <li>
          <strong>Debug connector failures faster:</strong> invalid JSON, truncated API responses, or unexpected schema
          changes are easier to isolate in a formatted sample than in a raw single-line response.
        </li>
        <li>
          <strong>Document transformations clearly:</strong> formatted samples are much better than screenshots when you
          need to explain a flattening rule or a field-mapping decision to another teammate.
        </li>
        <li>
          <strong>Share safer examples:</strong> a formatter plus a small redaction step makes it easier to strip out
          tokens, customer emails, or internal IDs before sending examples to coworkers or vendors.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <Search className="mr-3 text-green-500" size={28} />
        Where This Shows Up in Real BI Workflows
      </h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">1. API and SaaS Connector Validation</h3>
      <p>
        A large share of BI data still arrives from REST APIs, webhook archives, and SaaS exports. Before building a
        report on top of that data, format a representative sample and answer a few basic questions: where is the array
        of business records, which fields are truly numeric, which keys appear only sometimes, and which nested objects
        should be expanded into separate columns or tables.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h4 className="text-lg font-medium mb-2">Example: A BI Payload Worth Formatting First</h4>
        <div className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
          <pre>
            {`{
  "reportRunId": "bi-2026-03-11-001",
  "generatedAt": "2026-03-11T08:15:00Z",
  "account": {
    "id": "acme-emea",
    "tier": "enterprise"
  },
  "rows": [
    {
      "region": "North",
      "sales": "15000.25",
      "profit": 3500,
      "rep": {
        "id": 17,
        "name": "Ali"
      }
    },
    {
      "region": "South",
      "sales": "12750.00",
      "profit": null,
      "rep": {
        "id": 29,
        "name": "Sam"
      }
    }
  ],
  "totals": {
    "currency": "USD",
    "sales": 27750.25
  }
}`}
          </pre>
        </div>
      </div>
      <p>
        One glance at the formatted version tells you what the BI model must handle: the analytical rows live in
        <code>rows</code>, <code>sales</code> is arriving as text instead of a number, <code>profit</code> can be null,
        and the nested <code>rep</code> object needs expansion before it becomes a usable report field.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">2. Power Query, Power BI, and Fabric Imports</h3>
      <p>
        Microsoft&apos;s current JSON connector documentation is a useful signal for BI teams: JSON import is now a normal
        part of the Power Query stack, and Power Query applies automatic table detection to flatten common JSON
        structures. That speeds up simple imports, but it does not remove the need for inspection. If the payload mixes
        arrays, nested records, or inconsistent data types, a formatter still helps you decide what Power Query should
        expand, split, or cast.
      </p>
      <p>
        The same documentation also calls out a practical edge case: JSON Lines often needs separate handling. If a
        source emits one JSON object per line instead of one complete JSON document, formatting a sample quickly reveals
        why a connector import fails or why pre-processing is required.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">3. Tableau and Custom Web Data Connectors</h3>
      <p>
        Tableau&apos;s Web Data Connector remains relevant when an organization needs to consume JSON from an HTTP endpoint
        that does not have a native connector. In that workflow, formatted samples help define the connector schema,
        confirm field names, and detect drift when an upstream service adds or renames keys.
      </p>
      <p>
        The broader lesson applies across BI platforms: the more custom the ingestion path, the more valuable a clean,
        formatted sample becomes during connector design, QA, and refresh troubleshooting.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <Code className="mr-3 text-purple-500" size={28} />
        A Practical Formatter-First Workflow
      </h2>

      <ol className="list-decimal pl-6 space-y-3 my-4">
        <li>
          <strong>Start with a representative sample, not the full export.</strong> You want enough rows to reveal
          nesting, optional fields, and type inconsistencies without dragging a huge payload through every debugging
          session.
        </li>
        <li>
          <strong>Format and validate it immediately.</strong> If the sample does not parse, you may be dealing with
          malformed JSON, concatenated documents, or JSON Lines rather than a standard JSON object or array.
        </li>
        <li>
          <strong>Mark table boundaries.</strong> Separate metadata from analytical rows. A root object often contains
          refresh metadata, paging information, or account details that should not be repeated across every fact row.
        </li>
        <li>
          <strong>Normalize data types before modeling.</strong> Strings that look numeric, timestamps with mixed
          formats, and null-or-missing fields should be handled intentionally instead of left to implicit connector
          guesses.
        </li>
        <li>
          <strong>Save a redacted golden sample.</strong> Keeping one sanitized, formatted example for each critical
          integration makes future break-fix work much faster when the upstream API changes.
        </li>
      </ol>

      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h4 className="text-lg font-medium mb-2">Example: Format and Redact a BI Payload Before Sharing It</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          The formatter step is often combined with a small redaction pass so analysts can share samples without leaking
          tokens, personal data, or tenant identifiers.
        </p>
        <div className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
          <pre>
            {`const sensitiveKeys = new Set([
  "access_token",
  "apiKey",
  "authorization",
  "email",
  "customerId",
]);

function formatBiJson(rawJson: string) {
  const parsed = JSON.parse(rawJson);

  return JSON.stringify(
    parsed,
    (key, value) => (sensitiveKeys.has(key) ? "[REDACTED]" : value),
    2
  );
}

try {
  const prettySample = formatBiJson(rawJsonFromApi);
  console.log(prettySample);
} catch (error) {
  console.error("Invalid JSON payload", error);
}
`}
          </pre>
        </div>
      </div>

      <p className="mt-4">
        The built-in <code>JSON.stringify(value, replacer, space)</code> pattern is still the standard way to
        pretty-print JSON in application code. In BI support workflows, the replacer function is especially useful for
        masking confidential fields while keeping the overall structure intact.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <CheckCircle className="mr-3 text-teal-500" size={28} />
        What a Formatter Helps You Catch Before Import
      </h2>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>
          <strong>Array explosions:</strong> one nested array can multiply rows and distort totals if you expand it too
          early.
        </li>
        <li>
          <strong>Type mismatches:</strong> fields like <code>"15000.25"</code> look numeric but arrive as strings.
        </li>
        <li>
          <strong>Missing versus null values:</strong> those are different cases and should be modeled differently.
        </li>
        <li>
          <strong>Schema drift:</strong> new keys, renamed fields, and shape changes are easy to compare between two
          formatted samples.
        </li>
        <li>
          <strong>Timezone issues:</strong> ISO timestamps, local timestamps, and offset timestamps should not be mixed
          blindly in reporting pipelines.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <Braces className="mr-3 text-orange-500" size={28} />
        Security and Scale Considerations
      </h2>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>
          <strong>Prefer local formatting for sensitive payloads.</strong> BI samples often contain revenue figures,
          customer identifiers, access tokens, or internal URLs. If the data is confidential, use an offline formatter
          or sanitize the sample before sharing it anywhere.
        </li>
        <li>
          <strong>Pretty-printing increases size.</strong> That is fine for inspection, but avoid storing massive
          prettified payloads in logs or shipping them through performance-sensitive systems.
        </li>
        <li>
          <strong>Formatting is not the same as validation.</strong> A nicely indented document can still violate your
          expected schema, omit required keys, or mix incompatible data types.
        </li>
        <li>
          <strong>Large exports should be sampled first.</strong> When the source returns hundreds of thousands of rows,
          format a small slice to understand the structure before you try to flatten the entire dataset.
        </li>
      </ul>

      <p className="mt-8 text-lg">
        In BI, JSON formatters are less about cosmetics and more about control. They give you a fast way to understand
        source structure, plan flattening, catch drift, and share clean examples safely. That makes them useful whether
        you are importing JSON into Power Query, debugging a Tableau web connector, or validating an API payload before
        it becomes part of a production dashboard.
      </p>
    </div>
  );
}
