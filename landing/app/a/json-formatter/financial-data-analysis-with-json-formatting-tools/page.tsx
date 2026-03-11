import type { Metadata } from "next";
import {
  CheckCircle,
  LayoutDashboard,
  Code,
  Database,
  Inspect,
  Search,
  FileJson,
  Wand2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Financial Data Analysis with JSON Formatting Tools | Offline Tools",
  description:
    "Learn how to inspect, validate, and clean financial JSON safely, including SEC feeds, ledger exports, money fields, timestamps, and schema checks.",
};

export default function FinancialJsonToolsArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <LayoutDashboard className="mr-3 text-blue-500" size={32} /> Financial Data Analysis with JSON Formatting Tools
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          A JSON formatter is not your analysis engine. It is the intake checkpoint that shows what actually arrived
          before you load the data into Python, SQL, DuckDB, or a warehouse. That matters in finance because small
          input errors often become large reporting errors: a quantity arrives as a string, a timestamp switches format
          mid-stream, or a money field gets rounded because it was treated like a floating-point number.
        </p>

        <p>
          Formatting and validating the raw document first is also a privacy decision. If you are inspecting brokerage
          exports, payment events, or internal ledger snapshots, an offline formatter lets you review sensitive JSON
          locally instead of pasting it into a third-party online viewer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="mr-2 text-green-500" size={24} /> Where financial teams run into JSON now
        </h2>
        <p>
          JSON is now standard across regulatory, market, and internal finance workflows. The SEC&apos;s{" "}
          <code>data.sec.gov</code> endpoints expose company submissions and XBRL company facts as JSON, and those
          data files are updated throughout the day. The same document shape shows up in broker APIs, banking
          webhooks, treasury systems, and pipeline exports.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Regulatory data:</strong> SEC <code>submissions</code> and <code>companyfacts</code> JSON can be
            deeply nested and hard to inspect without formatting.
          </li>
          <li>
            <strong>Trading and market data:</strong> executions, quotes, and positions often mix numbers, strings, and
            timestamps from multiple vendors.
          </li>
          <li>
            <strong>Banking and payments:</strong> webhooks commonly include nullable fields, optional objects, and
            vendor-specific status codes.
          </li>
          <li>
            <strong>Internal finance pipelines:</strong> ledger exports, audit trails, and event logs may arrive as
            strict JSON, JSON Lines, or near-JSON that needs cleanup before analysis.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Inspect className="mr-2 text-orange-500" size={24} /> Inspect the real structure before you import anything
        </h2>
        <p>
          Pretty-printing is the fastest way to spot structural drift. In finance feeds, the problem is often not
          broken syntax. It is valid JSON with inconsistent types that will quietly corrupt aggregations later.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <h3 className="font-medium mb-2">Example payload with hidden analysis problems</h3>
          <pre className="overflow-x-auto bg-white p-3 rounded dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {`{"trades":[{"symbol":"MSFT","price":"412.55","quantity":100,"currency":"USD","executedAt":"2026-03-10T14:31:08-05:00"},{"symbol":"TLT","price":90.18,"quantity":"50","currency":"USD","executedAt":"03/10/2026 14:32:11"}]}`}
          </pre>
          <p className="mt-2">
            Once formatted, the issues are obvious: <code>price</code> switches between string and number,
            <code>quantity</code> switches between integer and string, and <code>executedAt</code> mixes ISO 8601 with
            a locale-specific timestamp.
          </p>
        </div>
        <p>
          This same inspection step is especially useful with SEC XBRL facts JSON, where values are nested by
          taxonomy, concept, unit, and period. Formatting the document first makes it much easier to find the exact
          path for the metric you want to analyze.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-teal-500" size={24} /> Validate the contract, not just the syntax
        </h2>
        <p>
          A formatter tells you whether the payload is readable. A schema tells you whether the payload is acceptable.
          For finance data, that distinction matters because valid JSON can still violate your business rules.
        </p>
        <p>
          JSON Schema&apos;s current published version is Draft 2020-12. A practical detail for financial pipelines is
          that <code>format</code> checks should be tested explicitly with your validator. Do not assume a
          <code>date-time</code> field will fail automatically unless the validator is configured to enforce it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <h3 className="font-medium mb-2">Example schema for trade intake</h3>
          <pre className="overflow-x-auto bg-white p-3 rounded dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "trades": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "symbol": { "type": "string", "minLength": 1 },
          "price": { "type": "string", "pattern": "^-?\\\\d+(\\\\.\\\\d{1,4})?$" },
          "quantity": { "type": "integer", "minimum": 1 },
          "currency": { "type": "string", "minLength": 3, "maxLength": 3 },
          "executedAt": { "type": "string", "format": "date-time" }
        },
        "required": ["symbol", "price", "quantity", "currency", "executedAt"],
        "additionalProperties": false
      }
    }
  },
  "required": ["trades"],
  "additionalProperties": false
}`}
          </pre>
        </div>
        <p>
          The goal is not to make every finance feed look identical. The goal is to reject unexpected shapes before
          they enter P&amp;L, reconciliation, or risk calculations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wand2 className="mr-2 text-purple-500" size={24} /> Normalize money, dates, and identifiers early
        </h2>
        <p>
          Most finance analysis bugs come from normalization, not formatting. After you inspect and validate the
          payload, clean it into one house contract before any joins or aggregations happen.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Money:</strong> prefer integer minor units or decimal strings when exact precision matters. Do not
            round-trip monetary values through binary floating point unless you have accepted the precision risk.
          </li>
          <li>
            <strong>Timestamps:</strong> convert all event times to a single ISO 8601 contract with timezone awareness,
            usually UTC.
          </li>
          <li>
            <strong>Codes and identifiers:</strong> normalize currency codes, account identifiers, and ticker symbols
            before grouping or matching records.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <h3 className="font-medium mb-2">Analysis-ready version of the same payload</h3>
          <pre className="overflow-x-auto bg-white p-3 rounded dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {`{
  "trades": [
    {
      "symbol": "MSFT",
      "price": "412.55",
      "quantity": 100,
      "currency": "USD",
      "executedAt": "2026-03-10T19:31:08Z",
      "notionalMinor": 4125500
    },
    {
      "symbol": "TLT",
      "price": "90.18",
      "quantity": 50,
      "currency": "USD",
      "executedAt": "2026-03-10T19:32:11Z",
      "notionalMinor": 450900
    }
  ]
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-2 text-cyan-500" size={24} /> Extract only the fields needed for analysis
        </h2>
        <p>
          Once the JSON is readable, you can decide what belongs in the analysis table. That usually means flattening
          nested arrays, keeping only stable keys, and discarding presentation-only fields.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Convert nested holdings, lots, or statement sections into row-based records.</li>
          <li>Keep the raw source payload for auditability, but analyze a cleaned derivative dataset.</li>
          <li>
            Separate numeric facts from labels and metadata so your downstream model is easier to aggregate and test.
          </li>
          <li>
            With regulatory JSON such as SEC company facts, extract the unit, period end date, form type, and filing
            date alongside the numeric value so comparisons remain meaningful.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="mr-2 text-indigo-500" size={24} /> A practical workflow for finance JSON
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Format locally first:</strong> confirm the document is valid JSON and inspect the nesting.
          </li>
          <li>
            <strong>Validate against a schema:</strong> reject type drift, unexpected keys, and missing required
            fields.
          </li>
          <li>
            <strong>Normalize critical fields:</strong> standardize money, timestamps, identifiers, and nullable
            values.
          </li>
          <li>
            <strong>Flatten for the target tool:</strong> reshape the cleaned JSON for pandas, SQL, BI, or a data
            warehouse.
          </li>
          <li>
            <strong>Keep raw plus cleaned copies:</strong> the raw payload supports audit and debugging, while the
            cleaned version supports repeatable analysis.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-600" size={24} /> Quick checklist before you trust the numbers
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Confirm you are looking at strict JSON, not JavaScript object literals or JSON Lines.</li>
          <li>Check that every monetary field follows one rule: decimal string or integer minor unit.</li>
          <li>Normalize all timestamps to one format before comparing or grouping them.</li>
          <li>Distinguish missing fields from explicit <code>null</code> values and from zero.</li>
          <li>Reject unexpected keys before they slip into rollups or reconciliation logic.</li>
          <li>Redact account numbers and customer identifiers before sharing debug samples.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LayoutDashboard className="mr-2 text-blue-500" size={24} /> Conclusion
        </h2>
        <p>
          Financial analysis gets more reliable when JSON formatting is treated as part of data quality, not as a
          cosmetic step. Use a formatter to inspect structure, pair it with schema validation, normalize the fields that
          usually break finance workflows, and only then move the data into your analysis stack. That sequence is simple
          enough for day-to-day debugging and strict enough for production pipelines.
        </p>
      </div>
    </div>
  );
}
