import type { Metadata } from "next";
import { Code, Package, ListTree, CheckCircle, Diff, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatter NPM Packages in JavaScript Projects",
  description:
    "Choose the right JSON formatter npm package for modern JS and TS projects, including JSON.stringify, Prettier, json-stable-stringify, prettier-plugin-sort-json, and prettier-package-json.",
};

export default function JsonFormatterPackagesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Package className="size-8 text-blue-500" />
        Using JSON Formatter NPM Packages in JavaScript Projects
      </h1>

      <div className="space-y-6">
        <p>
          If you are searching for a JSON formatter npm package, the first question is what you actually need to
          format: a JavaScript object in memory, a raw JSON string, checked-in <code>.json</code> files, or{" "}
          <code>package.json</code>. Those are related jobs, but the best tool is different for each one.
        </p>
        <p>
          In most JavaScript projects, the right answer is one of four options: built-in{" "}
          <code>JSON.stringify()</code> for simple pretty-printing, <code>prettier</code> for formatting JSON text and
          files, <code>json-stable-stringify</code> for deterministic key order, and specialized formatters like{" "}
          <code>prettier-package-json</code> when you want package-specific ordering rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6 text-green-500" />
          Start with <code>JSON.stringify()</code>
        </h2>
        <p>
          If you already have a JavaScript object and only need readable output, you usually do not need an extra npm
          package. The native <code>JSON.stringify(value, replacer, space)</code> API is still the fastest path.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Pretty-print an object you already have in memory</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const payload = {
  name: "OfflineTools",
  enabled: true,
  features: ["format", "validate", "diff"],
  settings: { indent: 2, sortKeys: false }
};

const pretty = JSON.stringify(payload, null, 2);

console.log(pretty);
/*
{
  "name": "OfflineTools",
  "enabled": true,
  "features": [
    "format",
    "validate",
    "diff"
  ],
  "settings": {
    "indent": 2,
    "sortKeys": false
  }
}
*/
`}
            </pre>
          </div>
        </div>

        <p>
          This is ideal for logging, downloads, test fixtures, and quick debugging. What it does not do is sort keys,
          enforce formatting across files, or rescue invalid JSON text before parsing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="size-6 text-blue-500" />
          The Best JSON Formatter NPM Packages for Common Jobs
        </h2>
        <p>For most searchers, the practical short list looks like this:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use <code>prettier</code></strong> when you want to format JSON strings, JSON files, or JSONC
            config files in editors, scripts, and CI.
          </li>
          <li>
            <strong>Use <code>json-stable-stringify</code></strong> when your app or test suite needs deterministic
            key ordering from a JavaScript object.
          </li>
          <li>
            <strong>Use <code>prettier-plugin-sort-json</code></strong> when you want checked-in JSON files sorted by
            key under Prettier.
          </li>
          <li>
            <strong>Use <code>prettier-package-json</code></strong> when the target file is specifically{" "}
            <code>package.json</code>.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Wrench className="size-5 text-purple-500" />
          1. <code>prettier</code> for JSON strings and files
        </h3>
        <p>
          For most real projects, <code>prettier</code> is the default JSON formatter package to install. It handles
          editor integration, command-line formatting, and programmatic formatting from Node scripts. Current Prettier
          releases expose an async API, so use <code>await prettier.format(...)</code> rather than older synchronous
          examples.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Install and format JSON with Prettier</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`npm install --save-dev prettier

// format-json.mjs
import * as prettier from "prettier";

const rawJson = '{"z":1,"a":{"second":2,"first":1}}';

const formatted = await prettier.format(rawJson, {
  parser: "json"
});

console.log(formatted);
/*
{
  "z": 1,
  "a": {
    "second": 2,
    "first": 1
  }
}
*/
`}
            </pre>
          </div>
        </div>
        <p>
          Prettier is especially useful when the source is text rather than an in-memory object. If you are formatting
          a real file, pass <code>filepath</code> so Prettier can infer the parser from the filename.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Use JSONC for config files with comments or trailing commas</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import * as prettier from "prettier";

const tsconfigLikeJson = ` + "`" + `{
  // comments are valid in JSONC
  "compilerOptions": {
    "strict": true,
  },
}` + "`" + `;

const formatted = await prettier.format(tsconfigLikeJson, {
  parser: "jsonc"
});

console.log(formatted);
`}
            </pre>
          </div>
        </div>
        <p>
          That <code>json</code> versus <code>jsonc</code> distinction matters. A strict JSON formatter should reject
          comments and trailing commas; many config files that look like JSON are actually JSONC.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Package className="size-5 text-orange-500" />
          2. <code>json-stable-stringify</code> for deterministic output
        </h3>
        <p>
          If your goal is stable key ordering rather than just indentation, <code>json-stable-stringify</code> is the
          classic package to reach for. It is useful for snapshot tests, content hashing, cache keys, and places where
          two equivalent objects should always serialize to the same string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Stable JSON with sorted keys</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`npm install json-stable-stringify

const stringify = require("json-stable-stringify");

const payload = {
  z: 1,
  a: 2,
  nested: {
    second: 2,
    first: 1
  }
};

const stableJson = stringify(payload, { space: 2 });

console.log(stableJson);
/*
{
  "a": 2,
  "nested": {
    "first": 1,
    "second": 2
  },
  "z": 1
}
*/
`}
            </pre>
          </div>
        </div>
        <p>
          This solves a different problem than Prettier. Prettier formats text; <code>json-stable-stringify</code>{" "}
          creates deterministic JSON from JavaScript values.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListTree className="size-5 text-blue-500" />
          3. <code>prettier-plugin-sort-json</code> for alphabetized JSON files
        </h3>
        <p>
          If your team wants checked-in JSON files sorted by key, a Prettier plugin is usually cleaner than writing a
          one-off script. The current published <code>prettier-plugin-sort-json</code> release is for Prettier 3 and
          declares Node 18+.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Sort JSON files during normal Prettier runs</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`npm install --save-dev prettier prettier-plugin-sort-json

// .prettierrc.json
{
  "plugins": ["prettier-plugin-sort-json"],
  "jsonRecursiveSort": true
}

// then run
npx prettier --write data.json
`}
            </pre>
          </div>
        </div>
        <p>
          One important caveat: this plugin only affects files Prettier parses as regular <code>json</code>. It does
          not sort <code>package.json</code>, <code>package-lock.json</code>, or <code>composer.json</code>, because
          Prettier uses a different parser for those files.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Package className="size-5 text-orange-500" />
          4. <code>prettier-package-json</code> for <code>package.json</code>
        </h3>
        <p>
          For <code>package.json</code>, alphabetical sorting is often the wrong rule.{" "}
          <code>prettier-package-json</code> applies package-specific ordering instead, keeping important fields like{" "}
          <code>name</code>, <code>version</code>, scripts, and metadata in predictable positions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Format package.json with a package-aware formatter</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`npm install --save-dev prettier-package-json

npx prettier-package-json --write package.json
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="size-6 text-green-500" />
          Which Package Should You Install?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            If you already have a JavaScript object and just want readable output, use{" "}
            <code>JSON.stringify(obj, null, 2)</code>.
          </li>
          <li>
            If you want a general JSON formatter npm package for files, editors, scripts, and CI, install{" "}
            <code>prettier</code>.
          </li>
          <li>
            If you need deterministic serialization for tests, hashing, or cache keys, install{" "}
            <code>json-stable-stringify</code>.
          </li>
          <li>
            If you want repository JSON files sorted alphabetically by key, add{" "}
            <code>prettier-plugin-sort-json</code> on top of Prettier.
          </li>
          <li>
            If the file is <code>package.json</code>, prefer <code>prettier-package-json</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Diff className="size-6 text-teal-500" />
          Common Mistakes and Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Formatting does not repair broken JSON.</strong> If the input is invalid, parse errors still need
            to be handled first.
          </li>
          <li>
            <strong>JSON and JSONC are not the same.</strong> Config files like <code>tsconfig.json</code> often need
            a JSONC-aware formatter.
          </li>
          <li>
            <strong>Sorted keys are not always desirable.</strong> Some APIs, fixtures, or hand-maintained config files
            are easier to read when order stays intentional rather than alphabetical.
          </li>
          <li>
            <strong>Validation is a separate concern.</strong> If you need schema validation, use a validator such as{" "}
            <code>ajv</code>; formatters only control layout and ordering.
          </li>
          <li>
            <strong>Do not add a runtime dependency if a dev tool is enough.</strong> For file formatting in CI or an
            editor, Prettier should usually stay in <code>devDependencies</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best JSON formatter npm package depends on where formatting happens. Use built-in{" "}
          <code>JSON.stringify()</code> for simple object output, <code>prettier</code> for general JSON file and text
          formatting, <code>json-stable-stringify</code> for deterministic serialization, and package-specific tools
          when file conventions matter. That gives search users a practical answer instead of a long list of vaguely
          related JSON utilities.
        </p>
      </div>
    </>
  );
}
