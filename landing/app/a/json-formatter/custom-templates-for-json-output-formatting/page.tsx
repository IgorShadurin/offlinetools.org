import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Templates for JSON Output Formatting: Practical Guide | Offline Tools",
  description:
    "Learn how to build custom JSON output templates with jq, JSONata, or code. Includes field selection, key renaming, flattening, defaults, and troubleshooting.",
};

export default function CustomJsonTemplatesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Custom Templates for JSON Output Formatting</h1>

      <div className="space-y-6">
        <p>
          If you need JSON to come out in a very specific shape, what you usually want is not just pretty-printing. You
          want a custom output template: a rule that says which fields to keep, what to rename, how to flatten nested
          data, what defaults to use, and which computed values should appear in the final result.
        </p>

        <p>
          That can be as simple as mapping a few keys or as strict as generating a contract-ready payload for another
          API. The important distinction is this: a formatter improves readability, while a template or transformation
          changes the structure itself. For search visitors landing here directly, the fastest path is to define the
          exact output you want first, then choose the lightest tool that can produce it reliably.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Counts as a JSON Output Template?</h2>
        <p>
          In practice, a JSON template is any repeatable rule that turns input JSON into a different output shape. That
          usually includes one or more of these actions:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Whitelisting fields:</span> keep only the properties the receiving system
              actually needs.
            </li>
            <li>
              <span className="font-medium">Renaming keys:</span> convert names like `userId` to `user_id` or `id`.
            </li>
            <li>
              <span className="font-medium">Flattening nested data:</span> pull values from deep objects into a simpler
              top-level shape.
            </li>
            <li>
              <span className="font-medium">Adding defaults:</span> output `null`, `[]`, or a fallback string when a
              field is missing.
            </li>
            <li>
              <span className="font-medium">Computing new values:</span> combine fields, calculate labels, or emit
              counts.
            </li>
            <li>
              <span className="font-medium">Reshaping arrays:</span> turn large objects into compact lists of records.
            </li>
          </ul>
        </div>

        <p>
          The cleanest custom templates are declarative: they describe the output structure directly. Once the logic
          becomes highly conditional, code is usually easier to test and maintain than a dense expression.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choose the Right Approach</h2>
        <p>
          Different tools fit different jobs. If your current workflow is unclear, use this rule of thumb:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Use jq for CLI work, scripts, and pipelines</h3>
            <p className="text-sm">
              jq is strong when you are transforming JSON in shell scripts, CI jobs, exports, or log-processing flows.
              It is concise, composable, and built around constructing new JSON objects from existing input.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Use JSONata for declarative templates inside apps or integrations</h3>
            <p className="text-sm">
              JSONata is a good fit when you want expressions that look close to the target output shape and need a
              reusable transformation language rather than custom application code.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Use JavaScript or Python when logic needs tests and branching</h3>
            <p className="text-sm">
              If you need validation, multiple fallback rules, date parsing, schema checks, or business rules, regular
              code is usually the most maintainable option.
            </p>
          </div>
        </div>

        <p>
          Version differences matter. As of March 11, 2026, the jq site lists binary downloads for jq 1.8.1, and the
          JSONata documentation is published as version 2.1.0. If you are working inside a hosted integration platform
          or an embedded library, check its exact runtime before copying expressions from the latest docs.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start With the Output Sample</h2>
        <p>
          The easiest way to avoid messy templates is to write the desired output first. This removes ambiguity and
          makes the mapping obvious.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Write a realistic example of the exact JSON you want to emit.</li>
            <li>Annotate where each output field comes from in the input.</li>
            <li>Decide how missing values should behave: fail, drop, or default.</li>
            <li>Only then choose jq, JSONata, or code.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Example Input</h2>
        <p>
          This sample includes common template tasks: nested fields, arrays, a boolean flag, and a value you may want
          to rename before sending elsewhere.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "id": 42,
  "profile": {
    "firstName": "Ava",
    "lastName": "Lopez",
    "city": "Madrid"
  },
  "plan": {
    "name": "Pro",
    "renewal": "2026-04-01"
  },
  "active": true,
  "tags": ["beta", "team-admin"]
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Example 1: jq Template-Style Filter</h2>
        <p>
          jq is often the fastest way to define a custom JSON output format on the command line. The filter below builds
          a new object explicitly, which makes it read like a lightweight template.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">jq Filter</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  user_id: .id,
  full_name: (.profile.firstName + " " + .profile.lastName),
  city: .profile.city,
  plan: .plan.name,
  renews_on: .plan.renewal,
  status: (if .active then "active" else "inactive" end),
  tags: (.tags // [])
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-6">Output</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "user_id": 42,
  "full_name": "Ava Lopez",
  "city": "Madrid",
  "plan": "Pro",
  "renews_on": "2026-04-01",
  "status": "active",
  "tags": ["beta", "team-admin"]
}`}
            </pre>
          </div>
        </div>

        <p>
          This pattern covers the majority of real-world template needs: selection, renaming, flattening, defaults, and
          a computed label. If your team works in shell scripts or CI, jq is hard to beat for this kind of transformation.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Example 2: JSONata Expression</h2>
        <p>
          JSONata is useful when you want the expression itself to resemble the final JSON structure. The official docs
          describe JSONata as a lightweight query and transformation language for JSON, and that is exactly why it works
          well for template-like output mapping.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JSONata Expression</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "user_id": id,
  "full_name": profile.firstName & " " & profile.lastName,
  "city": profile.city,
  "plan": plan.name,
  "renews_on": plan.renewal,
  "status": active ? "active" : "inactive",
  "tag_count": $count(tags)
}`}
            </pre>
          </div>
        </div>

        <p>
          JSONata is especially attractive when non-developers need to review or adjust mappings, because the output
          object is visible right in the expression. For deeply custom validation or side effects, application code is
          still the safer long-term choice.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Example 3: JavaScript Mapping Function</h2>
        <p>
          If the template needs branching, validation, or unit tests, a small function is often clearer than a dense
          query expression.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function formatUser(input) {
  return {
    user_id: input.id,
    full_name: \`\${input.profile?.firstName ?? ""} \${input.profile?.lastName ?? ""}\`.trim(),
    city: input.profile?.city ?? null,
    plan: input.plan?.name ?? "free",
    renews_on: input.plan?.renewal ?? null,
    status: input.active ? "active" : "inactive",
    tags: Array.isArray(input.tags) ? input.tags : []
  };
}`}
            </pre>
          </div>
        </div>

        <p>
          The advantage here is maintainability. You can validate input types, reuse helpers, write tests for edge
          cases, and evolve the transformation without forcing complex business logic into a template language.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Template Patterns to Reuse</h2>
        <p>
          Most custom JSON output rules are combinations of a few recurring patterns:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Field whitelist:</span> emit only the contract fields and nothing else.
            </li>
            <li>
              <span className="font-medium">Rename map:</span> keep values but translate key names to the target
              convention.
            </li>
            <li>
              <span className="font-medium">Flatten nested objects:</span> move deeply nested properties to the top
              level when the consumer expects a compact payload.
            </li>
            <li>
              <span className="font-medium">Default missing values:</span> output consistent types so downstream code
              does not guess.
            </li>
            <li>
              <span className="font-medium">Derived fields:</span> combine multiple inputs into a display label, slug,
              or status value.
            </li>
            <li>
              <span className="font-medium">Array mapping:</span> transform each record into a smaller or standardized
              object before exporting.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Custom JSON Templates</h2>
        <p>
          The failures are usually predictable. Build for them early instead of treating them as cleanup work.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Missing fields:</span> decide explicitly whether to omit, default, or fail
              when input paths are absent.
            </li>
            <li>
              <span className="font-medium">Array surprises:</span> confirm whether you should transform one record or
              every item in a list. Many template bugs come from accidentally applying an object rule to an array.
            </li>
            <li>
              <span className="font-medium">Type drift:</span> keep output types stable. A field that is sometimes a
              string and sometimes an object will create downstream bugs quickly.
            </li>
            <li>
              <span className="font-medium">Unsafe string templating:</span> do not hand-build JSON text when you can
              create native objects and serialize them safely.
            </li>
            <li>
              <span className="font-medium">Large payloads:</span> for very large files, prefer streaming or CLI-based
              transformations over copying everything into a browser tab.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Practical Rule of Thumb</h2>
        <p>
          If your mapping fits on one screen and mostly renames or reshapes fields, a declarative template is usually
          the right answer. If you need business rules, validation, retries, date math, or extensive branching, switch
          to application code early. That keeps the transformation understandable for the next person who has to debug it.
        </p>

        <p>
          Once you have the template in place, validate both the source JSON and the transformed output with a JSON
          formatter so you can catch syntax issues, missing commas, or accidental type changes before the payload moves
          downstream.
        </p>
      </div>
    </>
  );
}
