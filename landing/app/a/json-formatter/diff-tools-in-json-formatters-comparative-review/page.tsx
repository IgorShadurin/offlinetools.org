import type { Metadata } from "next";
import { Code, FileDiff, ListChecks, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Diff Tools in JSON Formatters: Comparative Review | Offline Tools",
  description:
    "Compare formatted text diff, semantic JSON diff, JSON Patch, and Merge Patch. Learn how current JSON diff tools handle key order, arrays, and privacy-sensitive data.",
};

export default function JsonDiffToolReview() {
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Diff Tools in JSON Formatters: Comparative Review
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 h-6 w-6 text-blue-500" />
            Start With the Job, Not the Tool Name
          </h2>
          <p>
            Most people searching for a JSON diff tool are really trying to answer one of four questions: did the data
            change, what changed semantically, can I generate a patch document, and can I do it without uploading
            sensitive payloads to someone else&apos;s website. A useful review has to separate those jobs, because the
            best tool for a Git-style review is not the best tool for an API patch or a large array comparison.
          </p>
          <p className="mt-4">
            The practical rule is simple: normalize first, then compare. Format both documents the same way, sort
            object keys when key order does not matter, and switch to a structure-aware diff when arrays or nested
            objects make line-by-line output noisy.
          </p>

          <div className="my-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
            <h3 className="mb-2 text-lg font-medium">Fast Recommendation</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use formatted text diff for quick code review when you care about the exact rendered JSON.</li>
              <li>Use semantic diff when you want logical data changes and need to ignore whitespace or key order.</li>
              <li>Use JSON Patch when a system must replay precise add, remove, replace, move, copy, or test steps.</li>
              <li>Use JSON Merge Patch for simple object updates, not for fine-grained array edits.</li>
              <li>Use local or offline tools when the JSON contains tokens, customer data, or internal configs.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <FileDiff className="mr-2 h-6 w-6 text-red-500" />
            Four Common Diff Approaches
          </h2>
          <p>
            These approaches solve different problems. Treating them as interchangeable is what creates misleading
            reviews and bad patch payloads.
          </p>

          <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Approach</th>
                  <th className="px-4 py-3 font-semibold">Best For</th>
                  <th className="px-4 py-3 font-semibold">What It Gets Right</th>
                  <th className="px-4 py-3 font-semibold">Main Weakness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">Formatted text diff</td>
                  <td className="px-4 py-3">Pull requests, fixtures, exact file review</td>
                  <td className="px-4 py-3">Works everywhere and matches editor or Git diff output</td>
                  <td className="px-4 py-3">Object key reordering and array moves still create noise</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">Semantic tree diff</td>
                  <td className="px-4 py-3">API responses, configs, nested documents</td>
                  <td className="px-4 py-3">Ignores formatting and compares actual JSON values</td>
                  <td className="px-4 py-3">Array matching strategy matters more than most users expect</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">JSON Patch (RFC 6902)</td>
                  <td className="px-4 py-3">Replayable changes, audit logs, PATCH APIs</td>
                  <td className="px-4 py-3">Explicit operations with precise paths</td>
                  <td className="px-4 py-3">Verbose and less readable for humans reviewing broad changes</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">JSON Merge Patch (RFC 7396)</td>
                  <td className="px-4 py-3">Simple object updates over HTTP PATCH</td>
                  <td className="px-4 py-3">Compact and easy to author by hand</td>
                  <td className="px-4 py-3">Arrays are replaced wholesale, and null means removal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <ListChecks className="mr-2 h-6 w-6 text-green-500" />
            What Current Tools Actually Add
          </h2>
          <p>
            A modern JSON formatter is often most useful as a prep stage, while a dedicated diff engine provides the
            comparison logic. A few current tools illustrate the difference well:
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">1. `jq` for normalization before diff</h3>
            <p>
              The `jq` manual still exposes `--sort-keys` (`-S`), which makes it a reliable first step before a normal
              line diff. That will not sort arrays, but it does reduce noise from object member reordering.
            </p>
            <pre className="mt-3 overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              {`jq -S . before.json > before.normalized.json
jq -S . after.json > after.normalized.json
diff -u before.normalized.json after.normalized.json`}
            </pre>
            <p className="mt-2 text-sm italic">
              This is often enough for config files and API snapshots when the array order is meaningful and should stay
              visible.
            </p>
          </div>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">2. `jsondiffpatch` for semantic diff and patch output</h3>
            <p>
              `jsondiffpatch` documents LCS-based array diffing and lets you define `objectHash` so arrays of objects
              can be matched by a stable identifier instead of just by index. It can also format differences as JSON
              Patch, which makes it useful when you need both a human review and a machine-consumable change set.
            </p>
            <pre className="mt-3 overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              {`const diffpatcher = jsondiffpatch.create({
  objectHash: (obj) => obj.id ?? obj.slug,
});

const delta = diffpatcher.diff(left, right);`}
            </pre>
            <p className="mt-2 text-sm italic">
              If your array items have no stable key, even a good semantic diff will eventually fall back to less
              intuitive output.
            </p>
          </div>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">3. `jd` for structural review and offline-friendly workflows</h3>
            <p>
              `jd` focuses on human-readable structural diffs and patching. Its project documents JSON and YAML support
              and also ships a local WebAssembly UI, which is useful when you want browser convenience without sending
              the document across the network.
            </p>
            <p className="mt-2 text-sm italic">
              That matters for real-world JSON such as API responses, logs, and configs that may contain secrets or
              customer data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Settings className="mr-2 h-6 w-6 text-purple-500" />
            Array Handling Is Where Diff Tools Separate
          </h2>
          <p>
            JSON objects are unordered maps semantically, but arrays are ordered sequences. That single difference is
            why users often think a tool is broken when it is only using the wrong comparison model.
          </p>

          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">Example: Position-Based vs. ID-Based Matching</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-1 font-semibold">Before</h4>
                <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                  {`[
  { "id": 101, "name": "alpha", "enabled": true },
  { "id": 102, "name": "beta", "enabled": false }
]`}
                </pre>
              </div>
              <div>
                <h4 className="mb-1 font-semibold">After</h4>
                <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                  {`[
  { "id": 102, "name": "beta", "enabled": true },
  { "id": 101, "name": "alpha", "enabled": true },
  { "id": 103, "name": "gamma", "enabled": true }
]`}
                </pre>
              </div>
            </div>
            <pre className="mt-4 overflow-x-auto rounded bg-white p-3 text-sm text-yellow-700 dark:bg-gray-900 dark:text-yellow-300">
              {`Naive index diff:
- item 0 changed completely
- item 1 changed completely
- item 2 added`}
            </pre>
            <pre className="mt-4 overflow-x-auto rounded bg-white p-3 text-sm text-blue-700 dark:bg-gray-900 dark:text-blue-300">
              {`ID-aware diff:
- id 102: enabled false -> true
- id 101: moved from index 0 -> 1
- id 103: added`}
            </pre>
            <p className="mt-2 text-sm italic">
              If your data has stable IDs, choose a tool that can match on that ID. If it does not, accept that array
              diffs will be approximate and review the output more carefully.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <FileDiff className="mr-2 h-6 w-6 text-red-500" />
            <Settings className="mr-2 h-6 w-6 text-purple-500" />
            JSON Patch vs. Merge Patch
          </h2>
          <p>
            These formats are often mentioned together, but they are not substitutes. JSON Patch is a list of
            operations with paths. JSON Merge Patch is a partial document that describes the desired end state for
            object members.
          </p>

          <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">JSON Patch</h3>
              <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                {`[
  { "op": "replace", "path": "/profile/name", "value": "Alicia" },
  { "op": "add", "path": "/tags/1", "value": "beta" }
]`}
              </pre>
              <p className="mt-2 text-sm">
                Best when you need precise, replayable operations, especially for arrays or when consumers already speak
                RFC 6902.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">JSON Merge Patch</h3>
              <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                {`{
  "profile": { "name": "Alicia" },
  "obsoleteField": null
}`}
              </pre>
              <p className="mt-2 text-sm">
                Best when a service accepts simple object patches and you do not need item-level array operations.
              </p>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>Choose JSON Patch when order, insert position, move operations, or optimistic tests matter.</li>
            <li>Choose Merge Patch when a compact document is easier for humans or clients to produce.</li>
            <li>Do not choose Merge Patch if explicit `null` is valid business data, because `null` also signals removal.</li>
            <li>Do not choose Merge Patch for array edits unless replacing the entire array is acceptable.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <ListChecks className="mr-2 h-6 w-6 text-teal-500" />
            Common Failure Modes and Buying Criteria
          </h2>
          <p>
            If you are evaluating a JSON formatter with diff features, these details matter more than a generic
            side-by-side UI.
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              <span className="font-medium">Strict JSON vs. JSONC or JSON5:</span> comments and trailing commas may be
              accepted by editors, but patch standards and most APIs expect valid JSON only.
            </li>
            <li>
              <span className="font-medium">Duplicate keys:</span> many parsers keep only the last value, which means a
              diff may hide the original ambiguity instead of warning about it.
            </li>
            <li>
              <span className="font-medium">Path ignore rules:</span> excluding timestamps, generated IDs, and version
              stamps can turn an unreadable diff into a useful one.
            </li>
            <li>
              <span className="font-medium">Large-file behavior:</span> browser tools are convenient, but very large
              payloads may require streaming or CLI-based workflows.
            </li>
            <li>
              <span className="font-medium">Offline operation:</span> if the JSON contains secrets, prefer local
              desktop, CLI, or offline browser tools instead of a remote upload service.
            </li>
            <li>
              <span className="font-medium">Export format:</span> some tools only show visual differences, while others
              can emit patch data you can store, test, or replay later.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 h-6 w-6 text-blue-500" />
            Bottom Line
          </h2>
          <p>
            The best JSON diff workflow is usually a combination, not a single button. Use a formatter to normalize the
            input, use text diff when exact file presentation matters, use semantic diff when logical data changes are
            the real question, and use JSON Patch or Merge Patch only when you actually need a patch document. If your
            documents contain arrays of objects, treat stable IDs and array matching as first-class evaluation criteria,
            because that is what determines whether a diff will be clear or misleading.
          </p>
        </section>
      </div>
    </article>
  );
}
