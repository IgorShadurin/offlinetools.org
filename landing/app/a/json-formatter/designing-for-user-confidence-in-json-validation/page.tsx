import type { Metadata } from "next";
import { CircleCheck, TriangleAlert, Search, Pen, CircleUser, Braces, Code, List, RefreshCcw, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Designing for User Confidence in JSON Validation | JSON Schema Guide",
  description:
    "Design JSON validation that users trust with clear parse errors, JSON Schema 2020-12 pointers, actionable fixes, and API-friendly problem details.",
};

export default function JsonValidationConfidenceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Designing for User Confidence in JSON Validation</h1>

      <div className="space-y-6">
        <p>
          Users do not trust a validator because it says &quot;invalid JSON.&quot; They trust it when it answers four
          questions immediately: what failed, where it failed, why it failed, and what to do next. If your validator
          cannot answer those clearly, people assume the tool is unreliable even when the rules are technically correct.
        </p>
        <p>
          For JSON tools, admin panels, import flows, and APIs, confidence comes from predictable structure. Good
          validation separates syntax problems from schema problems, uses stable locations such as JSON Pointers, and
          turns raw library output into instructions a human can act on quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          What Confident Validation Feels Like
          <CircleUser className="text-blue-500" size={24} />
        </h2>
        <p>Search visitors landing on a JSON validation guide usually want a system that feels predictable under stress.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Syntax errors are called out differently from business-rule failures.</li>
          <li>The failing value can be located instantly in the payload or UI.</li>
          <li>Error copy explains the rule in plain language, not validator jargon.</li>
          <li>The next step is obvious: edit a field, add a missing property, or change a type.</li>
        </ul>
        <p>
          That is the real design goal. Validation is not just a gate; it is a correction workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Start With Three Different Failure Types
          <TriangleAlert className="text-yellow-500" size={24} />
        </h2>
        <p>
          One of the biggest reasons users lose confidence is that applications lump every failure into a single
          &quot;validation error&quot; bucket. Separate these cases in both your code and your UI.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Syntax Errors
          <Braces className="text-cyan-500" size={20} />
        </h3>
        <p>
          These happen before schema validation even starts: trailing commas, missing quotes, invalid escapes, or broken
          brackets. Syntax messages should emphasize line and column, plus a short fix.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Schema Errors
          <Code className="text-gray-500" size={20} />
        </h3>
        <p>
          The JSON parses correctly, but it breaks structural rules such as missing required fields, wrong types,
          additional properties, or invalid formats.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Business-Rule Errors
          <RefreshCcw className="text-gray-500" size={20} />
        </h3>
        <p>
          The JSON is structurally valid, but the content is still not acceptable: end dates before start dates,
          duplicated IDs, unsupported feature combinations, or plan limits. Users need to know this is a domain rule,
          not a broken document.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            Example Separation:
            <CircleCheck className="text-green-500" size={20} />
          </h4>
          <p>
            Syntax: &quot;Line 14, column 9: trailing comma after <code>timeout</code>. Remove the comma before{" "}
            <code>&rbrace;</code>.&quot;
          </p>
          <p>
            Schema: &quot;<code>/timeout</code> is required and must be a number in milliseconds.&quot;
          </p>
          <p>
            Business rule: &quot;<code>/startDate</code> must be earlier than <code>/endDate</code>.&quot;
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Use Current Standards to Make Errors Predictable
          <Search className="text-gray-500" size={24} />
        </h2>
        <p>
          Current standards can remove guesswork. As of March 11, 2026, the current JSON Schema version and latest
          meta-schema is Draft 2020-12, published on June 16, 2022. Its recommended validation output includes
          `instanceLocation` for the failing data and `keywordLocation` for the rule that failed. That structure is far
          easier to normalize than ad hoc library messages.
        </p>
        <p>
          Draft 2020-12 also split `format` into annotation and assertion vocabularies. That matters in practice:
          users lose trust when one environment rejects `format: "email"` and another accepts it. If format checks are
          important, document that they are enforced and enable assertion behavior in the validator you ship.
        </p>
        <p>
          For HTTP APIs, RFC 9457, published in July 2023, is the current Problem Details standard and obsoletes RFC
          7807. It defines the `application/problem+json` envelope with fields such as `type`, `title`, `status`,
          `detail`, and `instance`, plus extension members for application-specific validation details.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          A Message Template Users Can Trust
          <Pen className="text-indigo-500" size={24} />
        </h2>
        <p>Whether you validate in a UI, an import tool, or an API, each error should answer the same small set of questions.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>`message`: the plain-language explanation.</li>
          <li>`pointer`: the stable JSON Pointer, such as `/users/1/email`.</li>
          <li>`location`: a friendlier label, such as &quot;User 2, email&quot;.</li>
          <li>`expected`: the rule or shape the user should satisfy.</li>
          <li>`received`: the offending value or type when safe to show.</li>
          <li>`suggestion`: one concrete fix or example value.</li>
          <li>`code`: a stable machine-readable identifier for logging and automation.</li>
        </ul>
        <p>
          In text editors, add line and column. In forms, map the pointer to the visible field. In APIs, keep the
          machine-readable structure stable even if you later rewrite the human copy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Practical Example: Weak vs. Strong API Feedback
          <Braces className="text-cyan-500" size={24} />
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                Weak Response
                <TriangleAlert className="text-yellow-500" size={20} />
              </h3>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <code>
                  {`{
  "error": "Validation failed"
}`}
                </code>
              </pre>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This tells the user nothing about location, cause, or the next action.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                Strong Response
                <CircleCheck className="text-green-500" size={20} />
              </h3>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <code>
                  {`{
  "type": "https://offlinetools.org/problems/json-validation",
  "title": "Request body failed validation",
  "status": 400,
  "detail": "Fix the highlighted fields and retry.",
  "instance": "/api/imports/req_01JX8Y3N9Q",
  "errors": [
    {
      "code": "format",
      "pointer": "/users/1/email",
      "location": "User 2, email",
      "message": "The email address is not in a valid format.",
      "received": "invalid-email",
      "suggestion": "Use a value such as user@example.com."
    },
    {
      "code": "required",
      "pointer": "/timeout",
      "location": "Root object",
      "message": "The timeout field is required.",
      "expected": "Number of milliseconds",
      "suggestion": "Add a value such as 5000."
    }
  ]
}`}
                </code>
              </pre>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                `errors` is an extension member, but the response still follows the RFC 9457 problem-details shape.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          UI Patterns That Increase Confidence
          <Eye className="text-purple-500" size={24} />
        </h2>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Show the Exact Location
          <Search className="text-gray-500" size={20} />
        </h3>
        <p>
          JSON Pointer is ideal for machine precision. Pair it with a human label and, when possible, a line/column
          highlight in the editor. Users should never have to manually scan a large payload to find the problem.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Prioritize Root-Cause Errors
          <List className="text-gray-500" size={20} />
        </h3>
        <p>
          If parsing fails, stop there. If a parent object is missing, suppress the flood of child errors it causes.
          Showing the first few actionable errors builds more confidence than dumping fifty secondary failures.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Preserve the User&apos;s Work
          <CircleUser className="text-blue-500" size={20} />
        </h3>
        <p>
          Never clear the JSON after a failed validation. Keep the input, scroll to the error, and make the correction
          cycle fast. Confidence collapses when users think the tool might destroy their work.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Keep Frontend and Backend in Sync
          <RefreshCcw className="text-gray-500" size={20} />
        </h3>
        <p>
          Frontend validation is useful for speed, but the server must re-validate. The best experience comes from one
          shared schema or one normalized error contract so the same input does not pass in one place and fail in
          another.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Edge Cases That Quietly Break Trust
          <TriangleAlert className="text-yellow-500" size={24} />
        </h2>
        <p>
          Some problems are easy to miss because they do not look like ordinary validation copy issues.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Duplicate object keys: JSON Schema notes that behavior is undefined when the same key appears twice in one
            object. Treat this as a parser or import warning, not a normal schema result.
          </li>
          <li>
            Format ambiguity: if one runtime treats `format` as annotation-only and another treats it as assertion, you
            get inconsistent outcomes. State your validator behavior clearly.
          </li>
          <li>
            Localization drift: RFC 9457 allows human-readable strings such as `title` and `detail` to vary by
            language, so keep `code` and `pointer` stable across locales.
          </li>
          <li>
            Huge payloads: large JSON documents can generate overwhelming output. Summarize, then let advanced users
            expand to see the full set.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Implementation Checklist
          <Code className="text-gray-500" size={24} />
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Parse first and return syntax errors with line and column before any schema checks.</li>
          <li>Validate against a defined schema, ideally JSON Schema Draft 2020-12 or one internal equivalent.</li>
          <li>Normalize raw validator output into a stable shape before showing it to users.</li>
          <li>Map each pointer to an editor highlight, field label, or import row number.</li>
          <li>Provide one concrete suggestion or example value for every common error class.</li>
          <li>Log technical details internally, but keep end-user copy short and plain.</li>
          <li>Test malformed JSON, missing fields, wrong types, bad formats, duplicate keys, and large arrays.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Conclusion
          <CircleCheck className="text-green-500" size={24} />
        </h2>
        <p>
          Designing for user confidence in JSON validation means turning a failure into a guided correction path. Use
          current standards where they help, separate failure types clearly, keep locations precise, and make every
          message actionable. When users can see exactly what broke and how to fix it, validation stops feeling like a
          black box and starts feeling dependable.
        </p>
      </div>
    </>
  );
}
