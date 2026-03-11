import type { Metadata } from "next";
import { AlertTriangle, Code, Lock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Protecting Against Prototype Pollution in JSON Parsing",
  description:
    "JSON.parse() is usually not the bug. Learn where prototype pollution actually starts, which JavaScript patterns are risky, and how to harden JSON handling in modern apps.",
};

export default function PrototypePollutionJsonParsingArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center space-x-3 text-3xl font-bold">
        <Shield size={32} />
        <span>Protecting Against Prototype Pollution in JSON Parsing</span>
      </h1>

      <div className="space-y-6">
        <p>
          Short answer: <strong>untrusted JSON does not normally pollute prototypes by itself.</strong> The real risk
          starts after parsing, when code copies, merges, or writes attacker-controlled keys into normal JavaScript
          objects.
        </p>
        <p>
          That distinction matters because many developers test a payload with <code>JSON.parse()</code>, see nothing
          happen, and assume the whole issue is overblown. In practice, the dangerous sink is usually a later step such
          as <code>Object.assign()</code>, an unsafe deep merge, or a dynamic path setter.
        </p>

        <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold">Quick Answer</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code>JSON.parse()</code> treats <code>"__proto__"</code> as data.
            </li>
            <li>
              The bug appears when parsed data is merged into ordinary objects or used as dynamic property paths.
            </li>
            <li>
              Block <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code> before recursive
              assignment.
            </li>
            <li>
              Prefer schema validation, own-key iteration, object spread for shallow copies, and null-prototype objects
              for dictionary-like data.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Code size={24} />
          <span>What `JSON.parse()` Actually Does</span>
        </h2>
        <p>
          When <code>JSON.parse()</code> encounters keys such as <code>"__proto__"</code>, <code>"constructor"</code>,
          or <code>"prototype"</code>, it creates normal own properties on the returned object. It does{" "}
          <strong>not</strong> walk the prototype chain and it does <strong>not</strong> modify{" "}
          <code>Object.prototype</code>.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Safe Parse Example</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const payload = JSON.parse(
  '{"theme":"dark","__proto__":{"isAdmin":true}}'
);

console.log(Object.prototype.hasOwnProperty.call(payload, "__proto__")); // true
console.log(payload.theme); // "dark"
console.log(({}).isAdmin); // undefined
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            If nothing bad happens during this test, that is expected. The payload becomes dangerous only when later
            code handles it unsafely.
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <AlertTriangle size={24} />
          <span>Where Prototype Pollution Actually Starts</span>
        </h2>
        <p>
          The issue appears when an application takes parsed JSON and feeds it into code that assigns properties
          recursively or trusts user-controlled keys. Common sinks include:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Shallow merges with <code>Object.assign()</code> or similar helper functions.
          </li>
          <li>Custom deep merge or clone utilities.</li>
          <li>Path-based setters such as writing to <code>obj[key1][key2][key3]</code>.</li>
          <li>
            <code>for...in</code> loops that copy properties without own-property checks.
          </li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Unsafe Shallow Merge</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const payload = JSON.parse('{"__proto__":{"isAdmin":true}}');

const options = Object.assign({ mode: "cors" }, payload);

console.log(options.mode); // "cors"
console.log(options.isAdmin); // true
console.log(Object.prototype.hasOwnProperty.call(options, "__proto__")); // false
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            In this case the target object's prototype is changed, even though <code>Object.prototype</code> is not.
            That may still be enough to bypass checks that rely on inherited defaults or option flags.
          </p>
        </div>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Unsafe Dynamic Path Assignment</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`// VULNERABLE PATTERN
function setPath(target, path, value) {
  let current = target;

  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i];
    if (current[key] == null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[path[path.length - 1]] = value;
}

const result = {};
setPath(result, ["constructor", "prototype", "polluted"], "PWNED");

console.log(({}).polluted); // "PWNED"
delete Object.prototype.polluted;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Parsed JSON often supplies the path segments or nested keys that make this kind of bug reachable.
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Lock size={24} />
          <span>Practical Defenses That Work</span>
        </h2>

        <h3 className="mt-6 text-xl font-semibold">1. Validate Shape at the Boundary</h3>
        <p>
          Validate incoming JSON before it reaches merge logic. The important goal is to reject unexpected keys and
          types, not just to coerce values. For configuration-like payloads, allow only known properties and nested
          structures.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Schema Mindset</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const allowedTopLevelKeys = new Set(["theme", "language", "features"]);

for (const key of Object.keys(parsedInput)) {
  if (!allowedTopLevelKeys.has(key)) {
    throw new Error(\`Unexpected key: \${key}\`);
  }
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            JSON Schema, Ajv, Zod, and similar validators are useful here when configured to reject unknown fields.
          </p>
        </div>

        <h3 className="mt-6 text-xl font-semibold">2. Explicitly Block Dangerous Keys</h3>
        <p>
          If your code must walk arbitrary nested objects, reject <code>__proto__</code>, <code>constructor</code>,
          and <code>prototype</code> anywhere in the structure before assigning into a target object.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Recursive Sanitizer</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const blockedKeys = new Set(["__proto__", "constructor", "prototype"]);

function sanitize(value) {
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const clean = Object.create(null);

  for (const key of Object.keys(value)) {
    if (blockedKeys.has(key)) {
      continue;
    }

    clean[key] = sanitize(value[key]);
  }

  return clean;
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Returning a null-prototype object makes the sanitized result safer for dictionary-style usage.
          </p>
        </div>

        <h3 className="mt-6 text-xl font-semibold">3. Prefer Safe Copy Patterns</h3>
        <p>
          For shallow copies of untrusted objects, object spread is usually safer than <code>Object.assign()</code>{" "}
          because it defines an own property instead of triggering the legacy <code>__proto__</code> setter on the
          target object.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Safer Shallow Copy</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const payload = JSON.parse('{"__proto__":{"test":"value"},"mode":"cors"}');

const safeCopy = { ...payload };
const safeDict = Object.assign(Object.create(null), payload);

console.log(Object.prototype.hasOwnProperty.call(safeCopy, "__proto__")); // true
console.log(safeCopy.mode); // "cors"
console.log(safeDict.__proto__); // { test: "value" }
`}
            </pre>
          </div>
        </div>

        <h3 className="mt-6 text-xl font-semibold">4. Iterate Over Own Keys Only</h3>
        <p>
          Avoid copying untrusted objects with <code>for...in</code> unless you also guard with{" "}
          <code>Object.prototype.hasOwnProperty.call()</code>. Prefer <code>Object.keys()</code>,{" "}
          <code>Object.entries()</code>, or a validator that gives you an already-trusted shape.
        </p>

        <h3 className="mt-6 text-xl font-semibold">5. Use Better Containers for Dictionary Data</h3>
        <p>
          If you are storing arbitrary user-defined keys, a plain object is often the wrong container. A{" "}
          <code>Map</code> or a null-prototype object created with <code>Object.create(null)</code> avoids the default
          prototype baggage of normal objects.
        </p>

        <h3 className="mt-6 text-xl font-semibold">6. Add Runtime Hardening in Node.js</h3>
        <p>
          In Node.js, the <code>--disable-proto=delete</code> and <code>--disable-proto=throw</code> CLI modes can
          reduce exposure to the legacy <code>Object.prototype.__proto__</code> accessor. This is useful hardening, but
          it is not a full substitute for input validation because <code>constructor.prototype</code> style attacks can
          still exist in buggy code.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <AlertTriangle size={24} />
          <span>Why Reproductions Often Confuse People</span>
        </h2>
        <p>
          Prototype pollution bugs are easy to misunderstand because different sinks have different effects:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <code>JSON.parse()</code> alone usually looks harmless.
          </li>
          <li>
            <code>Object.assign()</code> can mutate the prototype of one target object.
          </li>
          <li>
            Recursive path setters and unsafe deep merges can escalate into changes on <code>Object.prototype</code>.
          </li>
          <li>
            The visible impact may show up later, when authorization, templating, fetch options, or config defaults
            read inherited properties.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Shield size={24} />
          <span>Key Takeaways</span>
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <code>JSON.parse()</code> is usually not the vulnerable step.
          </li>
          <li>
            The dangerous part is what your code does with the parsed object afterward.
          </li>
          <li>
            Block dangerous keys, validate schema, and avoid unsafe merge or path-writing helpers.
          </li>
          <li>
            Prefer object spread, null-prototype objects, and own-key iteration when handling untrusted data.
          </li>
          <li>
            In Node.js, <code>--disable-proto</code> can add useful defense-in-depth.
          </li>
        </ul>

        <p>
          If your application accepts uploaded settings, API request bodies, imported JSON files, or feature-flag
          payloads, treat prototype pollution as a post-parse handling problem. Tight validation and careful object
          manipulation matter more than the parser itself.
        </p>
      </div>
    </>
  );
}
