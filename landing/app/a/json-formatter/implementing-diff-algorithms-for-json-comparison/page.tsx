import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Diff Algorithms for JSON Comparison | Offline Tools",
  description:
    "Learn practical JSON diff implementation strategies, from recursive comparison and array handling to JSON Patch, Merge Patch, and CI-friendly workflows.",
};

export default function ImplementingJsonDiffAlgorithmsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Diff Algorithms for JSON Comparison</h1>

      <div className="space-y-6">
        <p>
          A useful JSON diff is not just &ldquo;find every value that changed.&rdquo; In practice, you usually need one
          of four outputs: a readable review diff, an exact equality check, a machine-applicable patch, or a
          CI-friendly pass/fail signal. The implementation changes depending on that goal, especially once arrays enter
          the picture.
        </p>
        <p>
          That is why robust JSON comparison starts with semantics first: should object key order be ignored, should
          arrays be matched by position or by <code>id</code>, and do you need a custom change list or a standards-based
          patch format? Once those rules are explicit, the recursive comparison itself becomes much simpler.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choose the Output Before the Algorithm</h2>
        <p>
          Start by deciding what the caller or user actually needs from the diff. Different outputs favor different
          algorithms and tradeoffs:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Exact equality check:</strong> Best for regression tests and CI. Canonicalize both documents, then
            compare the normalized output.
          </li>
          <li>
            <strong>Human review diff:</strong> Return a path plus before and after values so developers can inspect the
            change quickly.
          </li>
          <li>
            <strong>Machine-applicable patch:</strong> Use{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc6902"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              RFC 6902 JSON Patch
            </a>{" "}
            if consumers need operations like <code>add</code>, <code>remove</code>, <code>replace</code>,{" "}
            <code>move</code>, or <code>test</code>.
          </li>
          <li>
            <strong>Object-heavy partial update:</strong> Use{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc7396"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              RFC 7396 JSON Merge Patch
            </a>{" "}
            when you want a patch document that looks like the target JSON, with <code>null</code> meaning removal.
          </li>
        </ul>
        <p>
          A common mistake is trying to force one diff format to solve every problem. JSON Patch is precise and good for
          arrays, while Merge Patch is simple and excellent for object-shaped API payloads. They are not interchangeable.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Core Rules for Each JSON Type</h2>
        <p>
          At a high level, a JSON diff walks both values recursively and emits changes when their structure or content
          diverges:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Primitives:</strong> Compare strings, numbers, booleans, and <code>null</code> directly. If the
            values differ, emit a replace-style change.
          </li>
          <li>
            <strong>Objects:</strong> Compare by key set, not by source order. Keys only present on one side are adds
            or removes; shared keys recurse.
          </li>
          <li>
            <strong>Arrays:</strong> This is where most implementations fail. Index-by-index comparison is only correct
            for truly ordered lists. If elements have stable identifiers, match them by key first; if order does not
            matter, compare them as sets after normalization.
          </li>
          <li>
            <strong>Type changes:</strong> If a value changes type, such as object to string or array to number, treat
            it as a replacement of the whole subtree.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Object Key Order vs. Canonicalization</h3>
          <p className="text-sm">
            Object member order is not a reliable semantic signal in JSON. Diff objects by key presence and value, not
            by the order properties appeared in the original text. If you need deterministic text output for hashing,
            signing, or baseline files, canonicalize first.{" "}
            <a
              href="https://www.ietf.org/ietf-ftp/rfc/rfc8785.pdf"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              RFC 8785 JSON Canonicalization Scheme
            </a>{" "}
            defines a deterministic representation for exactly that use case.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implement for the Data Type, Not Just the JSON Syntax</h2>
        <p>
          A search query like &ldquo;implementing diff for a data type&rdquo; points to the real problem: JSON gives you
          syntax, but your domain decides the correct matching rules. The same JSON array can represent very different
          logical data types.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Ordered sequences:</strong> Steps in a workflow, log entries, or playlist items should usually be
            diffed by position.
          </li>
          <li>
            <strong>Entity collections:</strong> Arrays of records with stable keys like <code>id</code> or{" "}
            <code>slug</code> should usually be indexed by that key before diffing.
          </li>
          <li>
            <strong>Set-like values:</strong> Tags, feature flags, or permissions should often be normalized and
            compared as unordered values.
          </li>
          <li>
            <strong>Moves:</strong> Only emit explicit move operations if the consumer understands them. Otherwise,
            delete-plus-add is simpler and often safer.
          </li>
        </ul>
        <p>
          There is no universally correct array diff. A robust implementation chooses the strategy from the business
          meaning of the data, not from the fact that the container happens to be JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A Practical TypeScript Diff Skeleton</h2>
        <p>
          The following example is intentionally small, but it fixes a common mistake in simplified tutorials: arrays
          must be detected with <code>Array.isArray()</code>, not <code>typeof value === &quot;array&quot;</code>. This
          version emits JSON Patch-like operations and keeps object and array handling separate.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type DiffOp = {
  op: "add" | "remove" | "replace";
  path: string;
  value?: unknown;
};

function diffJson(before: unknown, after: unknown, path = ""): DiffOp[] {
  if (Object.is(before, after)) {
    return [];
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    return diffArray(before, after, path);
  }

  if (isJsonObject(before) && isJsonObject(after)) {
    const ops: DiffOp[] = [];
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);

    for (const key of keys) {
      const nextPath = \`\${path}/\${escapePointerToken(key)}\`;

      if (!(key in after)) {
        ops.push({ op: "remove", path: nextPath });
        continue;
      }

      if (!(key in before)) {
        ops.push({ op: "add", path: nextPath, value: after[key] });
        continue;
      }

      ops.push(...diffJson(before[key], after[key], nextPath));
    }

    return ops;
  }

  return [{ op: "replace", path, value: after }];
}

function diffArray(before: unknown[], after: unknown[], path: string): DiffOp[] {
  const ops: DiffOp[] = [];
  const maxLength = Math.max(before.length, after.length);

  for (let index = 0; index < maxLength; index += 1) {
    const nextPath = \`\${path}/\${index}\`;

    if (index >= before.length) {
      ops.push({ op: "add", path: nextPath, value: after[index] });
      continue;
    }

    if (index >= after.length) {
      ops.push({ op: "remove", path: nextPath });
      continue;
    }

    ops.push(...diffJson(before[index], after[index], nextPath));
  }

  return ops;
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapePointerToken(token: string) {
  return token.replaceAll("~", "~0").replaceAll("/", "~1");
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This uses a positional array strategy. For arrays of records, replace <code>diffArray()</code> with keyed
            matching by a stable field like <code>id</code>. If you need a minimal edit script, add an LCS or Myers
            step instead of treating each index independently.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON Patch vs. Merge Patch</h2>
        <p>
          Standards matter if your diff output leaves your process and gets applied elsewhere. The two most common
          choices solve different problems:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Patch (RFC 6902):</strong> Expresses a sequence of explicit operations. It can target specific
            array positions and supports precondition checks with <code>test</code>. Use it when you need precise,
            replayable edits.
          </li>
          <li>
            <strong>JSON Merge Patch (RFC 7396):</strong> Describes the desired shape by example. It is easy to read
            and ideal for object-centric updates, but arrays are replaced wholesale and <code>null</code> means
            deletion.
          </li>
        </ul>
        <p>
          A good rule of thumb is simple: if your consumer cares about individual array edits, choose JSON Patch. If
          your payload is mostly nested objects and you want concise PATCH requests, Merge Patch is often easier.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON Diff in a CI Runner</h2>
        <p>
          For CI, a full custom diff engine is often unnecessary. Normalize object key order first, then diff the
          normalized files. The current jq documentation supports <code>-S</code> to sort object keys and{" "}
          <code>-e</code> for exit-status-based checks, and the jq project currently distributes standalone binaries,
          which makes it a practical fit for ephemeral CI runners.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`jq -S . before.json > before.normalized.json
jq -S . after.json > after.normalized.json

if diff -u before.normalized.json after.normalized.json; then
  echo "No semantic JSON changes"
else
  echo "JSON changed"
  exit 1
fi`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            If your arrays are logically unordered, normalize them too before diffing, for example by sorting objects
            with a stable key such as <code>id</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Failure Modes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Confusing missing and null:</strong> A missing property and a property explicitly set to{" "}
            <code>null</code> are different states in many APIs.
          </li>
          <li>
            <strong>Generating invalid paths:</strong> If you emit JSON Patch, path segments must be escaped correctly
            before you join them.
          </li>
          <li>
            <strong>Index-based array diff everywhere:</strong> It creates noisy and misleading output for keyed or
            reorderable collections.
          </li>
          <li>
            <strong>Loading huge documents into memory:</strong> For very large JSON, use a streaming parser or a{" "}
            <code>--stream</code>-style path/value pipeline instead of diffing the entire parsed tree at once.
          </li>
          <li>
            <strong>Assuming canonical text equals business equality:</strong> Stable formatting is useful for CI and
            hashing, but it does not replace domain-specific rules for timestamps, IDs, or unordered collections.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing JSON diffing well is less about one clever recursive function and more about choosing the right
          semantics for the data you have. Objects should usually ignore key order, arrays need an explicit matching
          strategy, and the output format should match the consumer.
        </p>
        <p>
          If you only need CI verification, canonicalize and compare. If you need interoperable patches, target JSON
          Patch or Merge Patch deliberately. And if your domain data has real identity rules, encode those rules in the
          diff instead of pretending every JSON array is just a positional list.
        </p>
      </div>
    </>
  );
}
