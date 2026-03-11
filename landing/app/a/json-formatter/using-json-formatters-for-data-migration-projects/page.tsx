import type { Metadata } from "next";
import {
  BookOpen,
  CheckCircle,
  Code,
  Database,
  FileJson,
  RefreshCcw,
  Search,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters for Data Migration Projects | Offline Tools",
  description:
    "Learn how to use JSON formatters to validate, normalize, flatten, and batch-check data before a migration goes live.",
};

export default function JsonFormattersDataMigrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson className="text-blue-500" size={36} />
        <span>Using JSON Formatters for Data Migration Projects</span>
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          JSON formatters are useful in data migration projects for a reason that goes far beyond pretty-printing. They
          help you inspect, validate, normalize, and reshape source payloads before those records hit the target
          system. In practice, that is what separates a migration that merely loads from one that loads correctly.
        </p>
        <p>
          Most migration failures are not caused by invalid JSON syntax. They come from data that is technically valid
          JSON but semantically wrong for the destination: IDs stored as strings, timestamps in mixed time zones,
          optional fields that switch between missing and `null`, or nested arrays that do not fit the target model.
          A formatter makes those problems visible early.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} />
          <span>Where JSON Formatters Help Most</span>
        </h2>
        <p>For migration work, a useful JSON formatting step should help you answer four questions quickly:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Is the payload valid and complete?</span> Confirm the source can actually be
            parsed and contains the fields the target requires.
          </li>
          <li>
            <span className="font-medium">What needs normalization?</span> Standardize key names, enums, timestamps,
            empty strings, and placeholder values before loading.
          </li>
          <li>
            <span className="font-medium">What needs reshaping?</span> Flatten nested objects, split arrays, and remove
            source-only metadata so the data matches the target contract.
          </li>
          <li>
            <span className="font-medium">Which records should be rejected?</span> Quarantine bad records instead of
            silently forcing them into the destination.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpen size={24} />
          <span>A Practical Migration Workflow</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={20} />
          <span>1. Define the target contract first</span>
        </h3>
        <p>
          Start with the destination, not the source. Decide which fields are required, which values are allowed, how
          dates should be formatted, whether extra properties are permitted, and how `null` should behave. For
          JSON-native pipelines, JSON Schema Draft 2020-12 is the current general-use metaschema and a solid way to
          version those expectations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2 mb-2">
            <Code size={18} />
            <span>Schema Example (JSON Schema Draft 2020-12)</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["id", "fullName", "email", "createdAt"],
  "properties": {
    "id": { "type": "integer" },
    "fullName": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "createdAt": { "type": "string", "format": "date-time" },
    "status": {
      "type": "string",
      "enum": ["active", "disabled"]
    },
    "city": { "type": ["string", "null"] }
  },
  "additionalProperties": false
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Keep this contract in source control beside the transform code. If you are following older guides, watch
            for draft mismatches: newer schemas use keywords like `$defs` and `prefixItems` that differ from older
            examples.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={20} />
          <span>2. Profile real source data, not just sample payloads</span>
        </h3>
        <p>
          Inspect a representative slice of production-like records before you write mappings. This is where a JSON
          formatter earns its keep because you can expand nested objects, compare records side by side, and quickly spot
          inconsistent structure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Measure how often a field is missing versus explicitly set to `null`.</li>
          <li>Check whether IDs, amounts, or booleans arrive as strings in some records.</li>
          <li>Find legacy field names that need to map into one canonical key.</li>
          <li>Identify which nested arrays must become child rows or secondary load files.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <RefreshCcw size={20} />
          <span>3. Normalize before you reshape</span>
        </h3>
        <p>
          Simple cleanup should happen before structural transformation. Trim strings, normalize casing, convert
          timestamps to one standard format, map status codes into destination enums, and be explicit about which values
          become `null`, empty strings, or hard failures.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2 mb-2">
            <Code size={18} />
            <span>Transformation Example (TypeScript)</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`type SourceUser = {
  user_id: string | number;
  user_name?: string | null;
  email?: string | null;
  status?: "A" | "D" | null;
  created_at?: string | null;
  address?: {
    city?: string | null;
  } | null;
};

type TargetUser = {
  id: number;
  fullName: string;
  email: string;
  status: "active" | "disabled";
  createdAt: string;
  city: string | null;
};

function transformUser(source: SourceUser): TargetUser | null {
  const id = Number(source.user_id);
  if (!Number.isInteger(id)) return null;

  const fullName = source.user_name?.trim();
  const email = source.email?.trim().toLowerCase();
  if (!fullName || !email) return null;

  const createdAtValue = source.created_at ? new Date(source.created_at) : null;
  if (!createdAtValue || Number.isNaN(createdAtValue.getTime())) return null;

  return {
    id,
    fullName,
    email,
    status: source.status === "D" ? "disabled" : "active",
    createdAt: createdAtValue.toISOString(),
    city: source.address?.city?.trim() || null,
  };
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Returning `null` is deliberate. In a production migration, rejected records should go to a quarantine file
            or table with the source identifier and the exact failure reason.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Database size={20} />
          <span>4. Restructure for the target system</span>
        </h3>
        <p>
          Structural changes are where migration logic becomes easy to underestimate. A formatter helps you preview how
          a nested document will look after flattening and whether the destination needs one row, multiple child rows,
          or a raw landing column plus curated downstream models.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Nested arrays like line items, addresses, or events often need separate child tables.</li>
          <li>Source-only metadata should be dropped unless you need it for audit or replay.</li>
          <li>Reference lookups are easier to resolve before the final load than after it.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Wrench size={20} />
          <span>5. Validate, batch, and reconcile</span>
        </h3>
        <p>
          Run validation after transformation, process data in batches, and compare counts between source records,
          transformed output, quarantined rows, and successful loads. Without reconciliation, a migration can appear
          successful while still losing data silently.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Keep record-level error logs with the source identifier and failure reason.</li>
          <li>Dry-run on a representative slice before the final cutover.</li>
          <li>Diff a sample of transformed records to catch accidental field loss.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} />
          <span>Common Problems a Formatter Can Reveal</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Numeric precision issues:</strong> Large IDs and money values can change meaning if tooling silently
            treats them as floating-point numbers.
          </li>
          <li>
            <strong>`null` versus missing fields:</strong> <code>{'{"phone": null}'}</code> is not always equivalent
            to a missing `phone` key, especially when the target applies defaults.
          </li>
          <li>
            <strong>Duplicate keys:</strong> Some parsers keep only the last value, which can hide bad exports or
            broken upstream serializers.
          </li>
          <li>
            <strong>Date drift:</strong> Mixing local timestamps and UTC timestamps creates hard-to-debug cutover issues.
          </li>
          <li>
            <strong>Memory blowups:</strong> Large JSON arrays should usually be streamed or processed in chunks instead
            of parsed into one in-memory object.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Database size={24} />
          <span>Target-Specific Caveats</span>
        </h2>
        <p>
          <strong>PostgreSQL `jsonb`:</strong> PostgreSQL&apos;s `jsonb` type does not preserve whitespace, object key
          order, or duplicate object keys, and SQL `NULL` is distinct from JSON `null`. If your migration depends on
          key ordering or repeated keys, fix that before load instead of assuming the database will preserve them.
        </p>
        <p>
          <strong>Relational targets:</strong> Flexible source JSON usually becomes stricter on the way in. Arrays and
          nested objects often need separate tables, foreign keys, and load-order planning.
        </p>
        <p>
          <strong>Warehouses and analytics layers:</strong> Keeping raw JSON can be useful for landing zones, but
          reporting still depends on stable field names and consistent types.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench size={24} />
          <span>Choosing the Right Tooling</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Formatter or CLI tool:</strong> Best for inspection, quick corrections, and lightweight batch
            transforms.
          </li>
          <li>
            <strong>Scripted transforms:</strong> Best when mappings must be versioned, reviewed, tested, and rerun.
          </li>
          <li>
            <strong>ETL or orchestration layers:</strong> Best when the migration needs retries, lineage, scheduling,
            joins across systems, or idempotent reruns.
          </li>
        </ul>
        <p>
          The usual answer is a combination: use a formatter to understand and spot-check the data, then move repeatable
          transformation logic into code or your migration pipeline.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={24} />
          <span>Migration Checklist</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Freeze the target contract before writing transformation logic.</li>
          <li>Profile real records and document every known source variation.</li>
          <li>Normalize types, timestamps, and enums before structural mapping.</li>
          <li>Validate transformed output, not just raw source payloads.</li>
          <li>Batch the load and keep rejected rows with explicit failure reasons.</li>
          <li>Reconcile counts and sample diffs before sign-off.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpen size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          JSON formatters are most valuable in migration work when they are treated as inspection and normalization
          tools, not just pretty-printers. Use them to define the contract, expose source irregularities, reshape data
          deliberately, and reject bad records early. That turns flexible JSON into a dependable migration input.
        </p>
      </div>
    </>
  );
}
