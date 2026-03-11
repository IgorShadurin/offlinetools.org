import type { Metadata } from "next";
import { Bug, CircuitBoard, Lightbulb, Check, X, Code, Braces, Wrench, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting JSON Circular Reference Errors | Fix JSON.stringify Cycles",
  description:
    "Learn why 'Converting circular structure to JSON' happens, how to find the offending reference, and when to use DTOs, a replacer, util.inspect(), or structuredClone().",
};

export default function JsonCircularReferenceErrorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Bug size={32} className="text-red-500" />
        Troubleshooting JSON Circular Reference Errors
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          If <code>JSON.stringify()</code> throws <code>TypeError: Converting circular structure to JSON</code>, the
          value you are serializing contains a reference loop. One object points back to itself directly, or a chain of
          properties eventually points back to an earlier object. JSON has no built-in way to represent that graph, so
          serialization stops with an error instead of recursing forever.
        </p>

        <p>
          The fastest way to fix it is to decide what you actually need:
          {" "}
          return a plain JSON-safe object for an API response, use a cycle-aware replacer for lossy export, use{" "}
          <code>util.inspect()</code> if you only need debug output, or use <code>structuredClone()</code> if you were
          trying to deep-copy data rather than serialize it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircuitBoard size={24} />
          What the Error Actually Means
        </h2>
        <p>
          A circular reference exists when an object property leads back to an object that is already in the current
          traversal path.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Direct cycle
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const user = { name: "Ava" };
user.self = user;

JSON.stringify(user);
// TypeError: Converting circular structure to JSON`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Indirect cycle
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const team = { name: "Core" };
const member = { name: "Lee" };

team.member = member;
member.team = team;

JSON.stringify(team);
// TypeError: Converting circular structure to JSON`}
            </pre>
          </div>
        </div>

        <p>
          Current engines do not all format the message the same way. MDN documents examples such as Chrome and Node.js
          reporting <code>Converting circular structure to JSON</code>, Firefox reporting{" "}
          <code>cyclic object value</code>, and Safari reporting a message that references a circular structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <X size={24} />
          Circular Reference vs Repeated Reference
        </h2>
        <p>
          This distinction matters because a lot of "safe stringify" snippets on the web get it wrong. Reusing the same
          object twice is not automatically a circular reference.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Shared object: valid JSON, no cycle</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const shared = { id: 42 };
const payload = {
  first: shared,
  second: shared,
};

JSON.stringify(payload, null, 2);
// Works.
// The same data is duplicated in the output JSON.`}
            </pre>
          </div>
        </div>

        <p>
          A replacer based only on a global <code>WeakSet</code> or <code>WeakMap</code> will often remove repeated
          references even when there is no cycle. That can silently change the data. For a true troubleshooting guide,
          the safer rule is: track the current ancestor chain, not every object ever seen.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} />
          Common Real-World Causes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>ORM entities with two-way relations:</strong> a user contains posts and each post contains the
            same user.
          </li>
          <li>
            <strong>Express, request, or response objects:</strong> framework objects often contain large internal
            graphs and parent links.
          </li>
          <li>
            <strong>DOM nodes and browser events:</strong> many browser objects contain internal references that are not
            JSON-safe.
          </li>
          <li>
            <strong>Application state with parent pointers:</strong> trees that store both children and parent
            references create cycles by design.
          </li>
          <li>
            <strong>Debug logging helpers:</strong> the failure often appears inside a logger, network helper, or cache
            layer rather than at the original data-construction site.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search size={24} />
          How to Find the Offending Reference Fast
        </h2>
        <p>
          Do not start by trying random stringify helpers. First identify whether the value should be serialized at
          all, then locate the back-reference.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Reproduce the error with the smallest possible object, not the full app state or framework object.</li>
          <li>
            If you are in Node.js, inspect the value with <code>{"util.inspect(obj, { depth: null })"}</code> instead
            of stringifying it. That prints circular references safely for debugging.
          </li>
          <li>Check for obvious back-links like <code>parent</code>, <code>owner</code>, or framework internals.</li>
          <li>
            Confirm whether you have a real cycle or only a repeated reference that appears in multiple branches.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Small helper to locate the first cycle path</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function findFirstCyclePath(value) {
  function visit(node, path, ancestors) {
    if (!node || typeof node !== "object") {
      return null;
    }

    const existing = ancestors.find((entry) => entry.node === node);
    if (existing) {
      return \`\${path} points back to \${existing.path}\`;
    }

    const nextAncestors = [...ancestors, { node, path }];

    for (const [key, child] of Object.entries(node)) {
      const result = visit(child, \`\${path}.\${key}\`, nextAncestors);
      if (result) {
        return result;
      }
    }

    return null;
  }

  return visit(value, "$", []);
}

const team = { name: "Core" };
const member = { name: "Lee", team };
team.member = member;

console.log(findFirstCyclePath(team));
// $.member.team points back to $`}
            </pre>
          </div>
        </div>

        <p>
          That helper is intentionally simple. It is useful for your own plain objects and arrays, but framework
          objects may still require inspecting a reduced copy because some properties are non-enumerable or extremely
          large.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} />
          Fix Options That Match the Job
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          1. Return a plain JSON-safe shape
        </h3>
        <p>
          This is usually the right fix for APIs, server actions, logs sent to external systems, and anything else that
          must become real JSON. Build a DTO or plain response object instead of serializing a rich domain object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: remove the back-reference</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const user = {
  id: 1,
  name: "Ava",
  posts: [
    { id: 101, title: "Hello" },
    { id: 102, title: "World" },
  ],
};

const response = {
  id: user.id,
  name: user.name,
  posts: user.posts.map((post) => ({
    id: post.id,
    title: post.title,
  })),
};

JSON.stringify(response, null, 2); // Safe`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          2. Use a cycle-aware replacer when lossy JSON is acceptable
        </h3>
        <p>
          If you only need a best-effort export or readable log line, you can replace circular branches with a marker
          such as <code>"[Circular]"</code>. The key detail is using the current ancestor stack so shared non-circular
          objects are preserved.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: safer replacer pattern</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function getCircularReplacer() {
  const ancestors = [];

  return function replacer(key, value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }

    if (ancestors.includes(value)) {
      return "[Circular]";
    }

    ancestors.push(value);
    return value;
  };
}

const team = { name: "Core" };
const member = { name: "Lee", team };
team.member = member;

console.log(JSON.stringify(team, getCircularReplacer(), 2));`}
            </pre>
          </div>
        </div>

        <p>
          This produces usable JSON, but it is a lossy representation. You have removed graph information, so do not
          use it for round-tripping business data unless that tradeoff is intentional.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          3. Use <code>util.inspect()</code> for debugging in Node.js
        </h3>
        <p>
          If your goal is just to log or inspect the value, JSON is the wrong tool. Node&apos;s{" "}
          <code>util.inspect()</code> prints complex objects safely and marks circular references instead of throwing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: debug safely without JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import util from "node:util";

const team = { name: "Core" };
const member = { name: "Lee", team };
team.member = member;

console.log(util.inspect(team, { depth: null, colors: false }));`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          4. Use <code>structuredClone()</code> when you wanted a deep copy
        </h3>
        <p>
          Developers often hit this error because they are using <code>JSON.parse(JSON.stringify(value))</code> as a
          cloning trick. That approach was always limited and it fails on cycles. If you need a deep copy of supported
          data, <code>structuredClone()</code> is the better built-in option and it can handle circular references.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Braces size={24} />
          Common Mistakes to Avoid
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stringifying framework objects directly:</strong> serialize only the data you own, not the full
            request, response, event, or element object.
          </li>
          <li>
            <strong>Using a global seen-set replacer blindly:</strong> that often removes valid repeated references,
            not just cycles.
          </li>
          <li>
            <strong>Treating debug output as transport data:</strong> <code>util.inspect()</code> output is for humans,
            not APIs.
          </li>
          <li>
            <strong>Keeping bidirectional links in response payloads:</strong> use IDs or flattened shapes at the
            boundary instead.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} />
          Bottom Line
        </h2>
        <p>
          Troubleshooting JSON circular reference errors gets easier once you separate three questions: is this value
          actually supposed to become JSON, where does the back-reference appear, and do you need a real transport
          format or only readable debug output? For production data boundaries, reshape the object. For lossy export,
          use a cycle-aware replacer. For debugging, inspect instead of stringifying. For cloning, use{" "}
          <code>structuredClone()</code>.
        </p>
      </div>
    </>
  );
}
