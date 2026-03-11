import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deep Nesting Errors: When Your JSON Is Too Complex | Offline Tools",
  description:
    "Learn when to avoid deep nesting in JSON, what current depth limits look like, and how to redesign overly complex payloads.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Deep Nesting Errors: When Your JSON Is Too Complex</h1>

      <div className="space-y-6">
        <p>
          Deep nesting is not automatically invalid JSON. The real problem is interoperability and maintainability:
          the JSON standard allows implementations to enforce their own maximum nesting depth, so a payload that works
          in one tool can still fail in another.
        </p>

        <p>
          If you are wondering when nesting should be avoided in JSON, the short answer is this: avoid it when the
          structure is no longer expressing real hierarchy and is instead making reads, updates, search, indexing, or
          validation harder than they need to be.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">When should you avoid nesting in JSON?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>When consumers have to traverse long property chains just to reach routine fields.</li>
          <li>When the same entity gets embedded in multiple branches and starts drifting out of sync.</li>
          <li>When depth can grow with user data, such as comments, category trees, menus, or org charts.</li>
          <li>When you need partial updates, filtering, or indexing on deeply buried fields.</li>
          <li>When the payload crosses parser, database, or framework depth limits.</li>
          <li>When a response would be easier to understand as a list plus references instead of a giant tree.</li>
        </ul>

        <p>
          As a rule of thumb, nesting deeper than about 3 to 5 levels in an API response or config file is usually a
          design smell, not because JSON forbids it, but because the data shape becomes harder to consume safely.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What the standard and common tooling say</h2>
        <p>
          RFC 8259 does not define one universal maximum nesting depth for JSON. Instead, it explicitly allows
          implementations to set their own limits. That means there is no single safe number that works everywhere.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>JSON itself</strong>: no fixed global depth limit in the specification.
            </li>
            <li>
              <strong>PHP</strong>: <code>json_decode()</code> still defaults to a maximum depth of <code>512</code>.
            </li>
            <li>
              <strong>Python stdlib</strong>: the <code>json</code> module does not impose its own depth cap beyond
              Python datatype and interpreter limits.
            </li>
            <li>
              <strong>MongoDB</strong>: BSON documents can be nested no more than <code>100</code> levels deep.
            </li>
            <li>
              <strong>JavaScript runtimes</strong>: there is no standards-based fixed number to rely on, so test your
              actual runtime and libraries instead of assuming a universal browser or Node.js limit.
            </li>
          </ul>
        </div>

        <p>
          In practice, this is why deeply nested JSON is risky even when it parses today. Your next consumer might be a
          different language runtime, a mobile client, a search indexer, a database import, or a validation pipeline
          with stricter limits.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why deep nesting causes trouble before hard limits</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Traversal gets fragile</strong>: every read needs long access paths and more null-checking.
          </li>
          <li>
            <strong>Updates get expensive</strong>: changing one nested branch often means rebuilding large sections of
            the document.
          </li>
          <li>
            <strong>Payloads grow faster</strong>: repeated embedding creates larger responses and more duplicated data.
          </li>
          <li>
            <strong>Validation gets harder</strong>: schema rules become verbose, especially for recursive structures.
          </li>
          <li>
            <strong>UI rendering slows down</strong>: tree viewers, editors, and recursive components all pay the
            complexity cost.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Example: when a nested tree should become a flat model</h2>
        <p>
          Trees are legitimate JSON, but they stop being a good transport format when each level only wraps the next
          level and clients need to search or update nodes independently.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-semibold mb-3">Deeply nested version</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "category": {
    "id": "cat-1",
    "name": "Electronics",
    "child": {
      "id": "cat-2",
      "name": "Computers",
      "child": {
        "id": "cat-3",
        "name": "Laptops",
        "child": {
          "id": "cat-4",
          "name": "Gaming Laptops"
        }
      }
    }
  }
}`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-3">Safer transport shape</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "categories": [
    { "id": "cat-1", "name": "Electronics", "parentId": null },
    { "id": "cat-2", "name": "Computers", "parentId": "cat-1" },
    { "id": "cat-3", "name": "Laptops", "parentId": "cat-2" },
    { "id": "cat-4", "name": "Gaming Laptops", "parentId": "cat-3" }
  ]
}`}
          </pre>
        </div>

        <p>
          The flattened version is usually easier to paginate, index, cache, diff, and partially update. It also keeps
          depth stable even when the hierarchy grows.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How to check whether your JSON is too deep</h2>
        <p>
          Start with the actual payload, not a guess. Measure the maximum object/array depth and inspect the branches
          that keep extending. An iterative walk is safer than a recursive helper because the checker itself should not
          fail on very deep input.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`function maxJsonDepth(value) {
  if (value === null || typeof value !== "object") {
    return 0;
  }

  let maxDepth = 0;
  const stack = [[value, 1]];

  while (stack.length > 0) {
    const [current, depth] = stack.pop();
    maxDepth = Math.max(maxDepth, depth);

    const children = Array.isArray(current) ? current : Object.values(current);

    for (const child of children) {
      if (child !== null && typeof child === "object") {
        stack.push([child, depth + 1]);
      }
    }
  }

  return maxDepth;
}`}
          </pre>
        </div>

        <p>Once you know the depth, ask three practical questions:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Is the depth inherent to the domain, or is it just serialization convenience?</li>
          <li>Can any branch grow without a predictable bound?</li>
          <li>Do downstream systems need this whole tree at once, or just references to related records?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What to do instead of deep nesting</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Normalize repeated entities</strong>: send IDs and separate collections instead of re-embedding the
            same objects.
          </li>
          <li>
            <strong>Split large graphs</strong>: fetch child resources separately when clients do not always need them.
          </li>
          <li>
            <strong>Cap accepted depth</strong>: reject or transform payloads that exceed a limit you can support.
          </li>
          <li>
            <strong>Paginate recursive content</strong>: especially for comments, descendants, and tree search results.
          </li>
          <li>
            <strong>Model hierarchies explicitly</strong>: parent IDs, path arrays, or adjacency lists are often better
            transport formats than nested wrappers.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`const depth = maxJsonDepth(payload);

if (depth > 8) {
  throw new Error("Rejecting payload: JSON is too deeply nested for this API.");
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Bottom line</h2>
        <p>
          Nest JSON when the hierarchy is real, bounded, and useful to consumers. Avoid deep nesting when it creates
          long access paths, duplicates data, grows unpredictably, or pushes against the limits of parsers and storage
          systems.
        </p>

        <p>
          If you are debugging a suspicious payload, run it through Offline Tools&apos; JSON Formatter first. A formatted
          view makes it much easier to spot runaway branches, repeated wrappers, and structures that should be flattened
          before they become production bugs.
        </p>
      </div>
    </>
  );
}
