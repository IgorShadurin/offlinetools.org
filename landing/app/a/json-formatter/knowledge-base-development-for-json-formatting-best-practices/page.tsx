import type { Metadata } from "next";
import { FileJson2, Check, AlertCircle, Info, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base: JSON Formatting Best Practices | Offline Tools",
  description:
    "Practical JSON formatting best practices for valid, readable, interoperable data: indentation, duplicate keys, timestamps, number safety, and JSON Schema 2020-12.",
};

export default function JsonFormattingBestPracticesArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <FileJson2 className="inline-block mr-3 h-10 w-10 text-blue-500" />
        Knowledge Base: JSON Formatting Best Practices
      </h1>

      <p className="text-lg text-center text-gray-600 mb-12">
        Current guidance for writing clean JSON that stays readable for humans and predictable for parsers.
      </p>

      <div className="prose prose-lg max-w-none mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Start Here: What Good JSON Looks Like</h2>
          <p>
            Good JSON is not just pretty-printed. It is valid according to the JSON specification, easy to scan in code
            review, and safe to exchange across languages and tools. The highest-value habits are simple: emit strict
            JSON, format it consistently, keep object keys unique, and validate important payloads against a schema.
          </p>
          <p>
            If you want the short version, use this checklist:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Use double quotes for every key and string value.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Use consistent indentation, usually 2 spaces for web and API JSON.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Do not ship comments, trailing commas, <code>undefined</code>, <code>NaN</code>, or <code>Infinity</code>.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Keep object member names unique and do not rely on key order for meaning.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Use explicit conventions for nulls, empty arrays, timestamps, and large numeric identifiers.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Pin your JSON Schema draft when validation matters.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Use Strict JSON, Not JSON-Like Syntax</h2>
          <p>
            Many editors and libraries accept relaxed formats such as JSONC or JSON5, but a formatter should output
            strict JSON when the file or response is meant to be consumed as JSON. That means:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" />
              Strings and keys use double quotes only.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" />
              Comments are not allowed.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" />
              Trailing commas are not allowed.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" />
              Object member names should be unique for predictable interoperability.
            </li>
            <li>
              <Info className="inline-block mr-2 h-4 w-4 text-blue-500" />
              JSON numbers are finite only. <code>NaN</code> and <code>Infinity</code> are not valid JSON values.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Common Invalid Input</h3>
            <pre>
              <code className="language-text">
                {`{
  // invalid comment
  'userId': 42,
  "roles": ["admin",],
  "score": NaN,
  "userId": 99
}`}
              </code>
            </pre>

            <h3 className="text-lg font-medium mb-2 mt-4">Strict JSON Version</h3>
            <pre>
              <code className="language-json">
                {`{
  "userId": 42,
  "roles": [
    "admin"
  ],
  "score": null
}`}
              </code>
            </pre>
          </div>

          <p className="mt-4">
            <AlertCircle className="inline-block mr-2 h-4 w-4 text-yellow-500" />
            A parser may accept extensions, but generators and published examples should stay strict. That is the safest
            way to avoid cross-language surprises.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Pick a Formatting Convention and Keep It Stable</h2>
          <p>
            Whitespace is insignificant to JSON parsers, but it matters a lot to human readers. Consistent formatting
            makes reviews faster and diffs smaller.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Recommended Defaults</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" />
              Prefer 2-space indentation for general web development and API payload examples.
            </li>
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" />
              Put each property on its own line once an object stops being trivially short.
            </li>
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" />
              Keep very short arrays inline only when they remain easy to scan.
            </li>
            <li>
              <Code className="inline-block mr-2 h-4 w-4 text-gray-500" />
              If a file is reviewed in Git, use a stable key order for readability, but never treat that order as part
              of the data contract.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Readable, Diff-Friendly JSON</h3>
            <pre>
              <code className="language-json">
                {`{
  "accountId": "acct_1042",
  "createdAt": "2026-03-11T14:30:00Z",
  "displayName": "Northwind Labs",
  "features": [
    "exports",
    "history",
    "sso"
  ],
  "isActive": true,
  "plan": "pro"
}`}
              </code>
            </pre>
          </div>

          <p className="mt-4">
            Pretty-print for source control, logs meant for people, and documentation. Minify when payload size matters
            in transit or storage. The content stays the same; only the whitespace changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Design Values for Interoperability, Not Just Appearance</h2>
          <p>
            A formatter can make JSON look clean, but teams still need consistent rules for names, missing values,
            dates, and numbers. Those choices determine whether the JSON is easy to consume in real systems.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Key Names</h3>
          <p>
            Pick one naming style per API or dataset, usually <code>camelCase</code> or <code>snake_case</code>, and
            apply it everywhere. Avoid hyphens in keys unless you have a strong compatibility reason, because they are
            awkward in many programming languages.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Null, Omitted, and Empty Values</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use <code>null</code> when a field exists conceptually but has no value.
            </li>
            <li>
              Omit a key when the field is optional and absent.
            </li>
            <li>
              Use <code>[]</code> or <code>&#x7b;&#x7d;</code> for an empty collection, not <code>null</code>, if the
              client can still iterate or read it as a collection.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Dates and Times</h3>
          <p>
            JSON has no built-in date type. Use full timestamp strings with a timezone, such as{" "}
            <code>2026-03-11T14:30:00Z</code>. That keeps values portable and easier to validate. Avoid locale-specific
            formats like <code>03/11/2026</code>, which are ambiguous across regions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Numbers, IDs, and Money</h3>
          <p>
            Large integers are a common source of bugs because many parsers map JSON numbers to IEEE 754 doubles.
            Treat identifiers as strings if they may exceed safe integer precision. For money, prefer a documented
            convention such as integer minor units (<code>1099</code> cents) or a decimal string, instead of leaving
            rounding behavior implicit.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Interoperable Payload Example</h3>
            <pre>
              <code className="language-json">
                {`{
  "invoiceId": "9007199254740993",
  "issuedAt": "2026-03-11T14:30:00Z",
  "customerName": "Avery Chen",
  "discountCode": null,
  "lineItems": [],
  "totalCents": 2599
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Validate Important JSON With a Pinned Schema</h2>
          <p>
            If JSON matters to an API, config file, import pipeline, or knowledge base export, formatting alone is not
            enough. Add schema validation. The current general-use JSON Schema draft is 2020-12, and it is worth
            pinning explicitly so your examples and validators agree on the same rules.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Declare <code>$schema</code> so validators do not guess the draft.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Mark required properties and reject unexpected fields where the contract should stay tight.
            </li>
            <li>
              <Check className="inline-block mr-2 h-4 w-4 text-green-500" />
              Treat <code>format</code> as helpful, but do not rely on it alone for critical business rules.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">JSON Schema 2020-12 Example</h3>
            <pre>
              <code className="language-json">
                {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "invoiceId": { "type": "string" },
    "issuedAt": { "type": "string", "format": "date-time" },
    "totalCents": { "type": "integer", "minimum": 0 },
    "lineItems": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["invoiceId", "issuedAt", "totalCents", "lineItems"],
  "additionalProperties": false
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Common Problems a JSON Formatter Will Not Fix for You</h2>
          <p>
            Pretty-printing can expose problems, but it cannot decide the meaning of broken or ambiguous data. Watch for
            these issues during review:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" />
              <strong>Duplicate keys:</strong> some parsers keep the last value, others behave differently. Do not rely
              on duplicates being resolved the way you expect.
            </li>
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" />
              <strong>Encoding issues:</strong> JSON exchanged across systems should be UTF-8. Unexpected byte-order
              marks or bad character encoding can break imports.
            </li>
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" />
              <strong>Top-level primitives:</strong> valid JSON can be a single string or number, but objects and arrays
              are usually a better choice for APIs and data files because they are easier to extend.
            </li>
            <li>
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" />
              <strong>JSONC/JSON5 leakage:</strong> editor-friendly config syntax often breaks when copied into a strict
              JSON parser, linter, or API request.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Best-Practice Workflow</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Write or generate strict JSON only.</li>
            <li>Apply one formatting convention automatically across the project.</li>
            <li>Review naming, timestamps, null handling, and numeric precision rules.</li>
            <li>Validate with a pinned JSON Schema before storing, importing, or publishing the data.</li>
            <li>Pretty-print for humans, minify for transport where size matters.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Conclusion</h2>
          <p>
            JSON formatting best practices are really about reducing ambiguity. Clean indentation helps humans, but the
            bigger wins come from strict syntax, unique keys, safe number handling, explicit timestamp conventions, and
            schema-backed validation. If your formatter and your contract rules agree, your JSON will stay readable,
            valid, and far more portable across tools and languages.
          </p>
        </section>
      </div>
    </div>
  );
}
