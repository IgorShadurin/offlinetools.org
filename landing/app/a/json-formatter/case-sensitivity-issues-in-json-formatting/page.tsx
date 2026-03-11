import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Is JSON Case Sensitive? Keys, Values, and Literal Rules | Offline Tools",
  description:
    "Clear answer: JSON is case-sensitive for object keys and string values, while true, false, and null must be lowercase. See valid and invalid examples, API pitfalls, and safer fixes.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Case Sensitivity Issues in JSON Formatting</h1>

      <div className="space-y-6">
        <p>
          Yes. JSON is case-sensitive where most developers trip over it: object member names are matched exactly,
          string values preserve their original case, and the literal names <code>true</code>, <code>false</code>, and{" "}
          <code>null</code> must be written in lowercase. If an app or framework treats <code>userId</code> and{" "}
          <code>UserId</code> as equivalent, that is the app&apos;s behavior, not JSON&apos;s.
        </p>

        <p>
          That distinction matters when you are formatting payloads, debugging API responses, or cleaning up exported
          data. A formatter can make case problems obvious, but it cannot guess which spelling a producer or consumer
          actually intended.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-3">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Object keys are case-sensitive</strong>: <code>"name"</code> and <code>"Name"</code> are
              different members.
            </li>
            <li>
              <strong>String values are case-sensitive</strong>: <code>"ON"</code> and <code>"on"</code> are different
              strings.
            </li>
            <li>
              <strong>Literal names are lowercase only</strong>: <code>true</code>, <code>false</code>, and{" "}
              <code>null</code> are valid; <code>True</code>, <code>FALSE</code>, and <code>NULL</code> are not.
            </li>
            <li>
              <strong>Framework behavior can differ</strong>: case-insensitive model binding is an application feature,
              not part of the JSON format.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What Counts as Case-Sensitive in JSON</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Keys and String Values</h3>
        <p>
          In JSON objects, member names are strings. That means <code>"status"</code>, <code>"Status"</code>, and{" "}
          <code>"STATUS"</code> are three different names, not stylistic variations of the same field.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Valid JSON with Case-Distinct Keys</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "user": "Ava",
  "User": "Liam",
  "role": "Admin",
  "roleLabel": "admin"
}`}
          </pre>
          <p className="mt-2">
            This is valid JSON. The two user fields are distinct keys, and the two role-related strings keep their
            original case.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">The Literal Names true, false, and null</h3>
        <p>
          JSON&apos;s boolean and null literals are not flexible. They must appear exactly as lowercase{" "}
          <code>true</code>, <code>false</code>, and <code>null</code>. Any other capitalization makes the document
          invalid JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Invalid JSON</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "enabled": True,
  "archived": FALSE,
  "deletedAt": NULL
}`}
          </pre>
          <p className="mt-2">A formatter or parser should reject this because the literal names use the wrong case.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">A Small Exception People Miss</h3>
        <p>
          Not every letter inside JSON is locked to one case. Number exponents can use <code>e</code> or <code>E</code>,
          and hexadecimal digits in Unicode escapes can be upper or lower case. That does not change the rule for
          keys or for the literal names above.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "small": 1e3,
  "large": 1E3,
  "slash": "\\u002f",
  "slashAgain": "\\u002F"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What the Specs Mean in Practice</h2>
        <p>
          The JSON standards define syntax, not how every runtime should map incoming JSON onto language objects or
          database columns. In practice, that means two things:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>JSON itself does not do case folding or treat similar-looking keys as equivalent.</li>
          <li>
            A library may offer case-insensitive property binding for convenience, but that is a layer on top of JSON,
            not a rule of the format.
          </li>
        </ul>
        <p>
          This is why one system may happily deserialize <code>UserId</code> into a <code>userId</code> field while
          another leaves it unmatched. The JSON document did not change. The consumer&apos;s mapping rules did.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common Real-World Failures</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Case-Only Key Mismatches</h3>
        <p>
          This is the most common failure behind the query &quot;is JSON case sensitive&quot;. The payload is valid, but
          the receiving code looks up the wrong casing and gets <code>undefined</code>, <code>null</code>, or a missing
          field error.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`const payload = {
  "CustomerID": 42,
  "customerName": "Acme Corp"
};

payload.customerId;   // undefined
payload.CustomerID;   // 42
payload.CustomerName; // undefined`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Mixed Naming Conventions Between Systems</h3>
        <p>
          One service emits <code>snake_case</code>, another expects <code>camelCase</code>, and a third exposes{" "}
          <code>PascalCase</code>. Even when every document is valid JSON, the integration breaks if you assume keys
          will be normalized automatically.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Blind Key Normalization</h3>
        <p>
          Lowercasing every key can hide inconsistency, but it can also destroy information. If a payload contains both{" "}
          <code>userId</code> and <code>UserId</code>, a naive normalization step creates a collision.
        </p>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Why automatic lowercasing is risky</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "userId": 123,
  "UserId": 456
}`}
          </pre>
          <p className="mt-2">
            This JSON is valid because the keys are different strings. If you force every key to lowercase, one value
            will overwrite the other.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. Confusing Case-Sensitive Keys with Duplicate Keys</h3>
        <p>
          These are related but different problems. Exact duplicate names such as two <code>"userId"</code> members are
          an interoperability problem. Different-case names such as <code>"userId"</code> and <code>"UserId"</code> are
          distinct keys, but they are easy for humans to mistake as duplicates during review.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Safer Ways to Handle Inconsistent Casing</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Validate First, Map Second</h3>
        <p>
          The safest approach is to validate raw JSON as-is, then map external field names into your internal model
          explicitly. That lets you detect conflicts before data is lost.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`function mapUser(payload) {
  const aliases = ["userId", "UserId"];
  const present = aliases.filter((key) => key in payload);

  if (present.length > 1) {
    throw new Error(\`Conflicting user id keys: \${present.join(", ")}\`);
  }

  return {
    userId: payload.userId ?? payload.UserId ?? null,
  };
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Document the Exact Field Names</h3>
        <p>
          If you publish an API or a configuration format, show the precise expected spelling in examples. Saying
          &quot;send user id&quot; is not enough when <code>userId</code>, <code>UserId</code>, and <code>userid</code>{" "}
          mean different things to many consumers.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Normalize Only at the Boundary</h3>
        <p>
          If you must support multiple casings for compatibility, do it in one boundary layer with collision checks.
          Avoid spreading case-insensitive lookups throughout the rest of the codebase.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How a JSON Formatter Helps</h2>
        <p>A formatter will not magically fix wrong casing, but it is still useful because it can:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Expose near-duplicate keys that differ only by case once the structure is indented clearly.</li>
          <li>Reject invalid literals such as <code>True</code> and <code>NULL</code> during validation.</li>
          <li>Make schema review easier when you need to compare the exact spelling of nested keys.</li>
          <li>Help you spot whether the problem is in the JSON itself or in the consumer&apos;s mapping logic.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Debugging Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Validate the JSON first to rule out invalid literals such as <code>True</code> or <code>NULL</code>.</li>
          <li>Search for keys that differ only by case, especially in large payloads and merged exports.</li>
          <li>Compare the payload against the exact field names in your API docs or schema.</li>
          <li>Check whether your parser, serializer, or framework has optional case-insensitive binding enabled.</li>
          <li>Handle aliases in one mapping layer instead of lowercasing the entire document blindly.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Bottom Line</h2>
        <p>
          JSON is case-sensitive where it matters most to developers: keys and string values keep their exact case, and{" "}
          <code>true</code>, <code>false</code>, and <code>null</code> are lowercase only. That is the short answer to
          &quot;is JSON case sensitive&quot;.
        </p>
        <p>
          If your application behaves as though casing does not matter, that behavior comes from a tool or framework on
          top of JSON. Treat it as a compatibility feature, not as a property of the format itself.
        </p>
      </div>
    </>
  );
}
