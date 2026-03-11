import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Remove Trailing Commas From JSON | Offline Tools",
  description:
    "Trailing commas make JSON invalid. Learn how to remove the extra comma from a JSON object or array, why parsers reject it, and when JSON5 or JSONC are appropriate.",
};

export default function HandlingTrailingCommasArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Handling Trailing Commas in JSON: How to Remove the Extra Comma Safely
      </h1>

      <div className="space-y-6">
        <p>
          If you are trying to remove a comma from a JSON object or array, the rule is simple: standard JSON does not
          allow a comma immediately before a closing <code>{"}"}</code> or <code>]</code>. Delete that final comma,
          then validate the document again. Most formatters and parsers will reject the payload until that syntax error
          is fixed.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Quick answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2 text-blue-900 dark:text-blue-100">
            <li>A trailing comma is an extra comma before <code>{"}"}</code> or <code>]</code>.</li>
            <li>
              In strict JSON, <code>{"{\"name\":\"Ada\",}"}</code> and <code>{'["a","b",]'}</code> are invalid.
            </li>
            <li>
              If you see an error like <code>Unexpected token {"}"}</code> or <code>Unexpected token ]</code>, check
              the character just before the closing brace or bracket.
            </li>
            <li>
              If a tool accepts trailing commas, it is usually reading a relaxed format such as JSON5 or JSONC, not
              standard JSON.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Counts as a Trailing Comma?</h2>
        <p>
          A trailing comma, also called a dangling comma, appears after the last property in an object or the last
          element in an array. That final comma is valid in many JavaScript contexts, but not in JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Ada",
  "role": "Engineer",
}

[
  "apple",
  "banana",
  "orange",
]`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In both examples, the last comma appears right before the closing character. That is the part you remove.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Valid JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Ada",
  "role": "Engineer"
}

[
  "apple",
  "banana",
  "orange"
]`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why JSON Rejects the Extra Comma</h2>
        <p>
          The current JSON standard is{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            RFC 8259
          </a>
          . Its grammar allows a comma only between members or array values, never after the last one. MDN&apos;s
          current{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            JSON.parse()
          </a>{" "}
          reference also notes that arrays and objects with trailing commas throw a <code>SyntaxError</code>.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Interoperability:</strong> Strict grammar keeps parsers aligned across languages and platforms.
          </li>
          <li>
            <strong>Predictable parsing:</strong> A comma always means another value is coming next.
          </li>
          <li>
            <strong>Clear boundaries:</strong> JSON intentionally omits some JavaScript conveniences, including
            comments and trailing commas.
          </li>
        </ul>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important distinction</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            JavaScript object literals often allow trailing commas. JSON does not. Copying a JavaScript object directly
            into a JSON file is one of the most common ways this error gets introduced.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Remove a Trailing Comma From JSON</h2>
        <p>If your goal is simply to make the JSON valid again, use this order of operations:</p>

        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>
            Find the closing <code>{"}"}</code> or <code>]</code> where parsing fails.
          </li>
          <li>Check the previous non-whitespace character.</li>
          <li>If that character is a comma, delete it.</li>
          <li>Run the JSON through a validator or formatter again to confirm there are no other syntax errors.</li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Before and after</h3>
          <div className="mt-4">
            <h4 className="text-md font-medium text-red-600 dark:text-red-400">Before</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`{
  "config": {
    "enabled": true,
    "features": ["search", "export", "import"],
  }
}`}
              </pre>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium text-green-600 dark:text-green-400">After</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`{
  "config": {
    "enabled": true,
    "features": ["search", "export", "import"]
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a JSON Formatter Should Do</h2>
        <p>A good formatter should help you fix trailing commas quickly instead of hiding the problem.</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Reject invalid JSON instead of pretty-printing it as if it were correct.</li>
          <li>Point to the exact line and column near the closing brace or bracket.</li>
          <li>Offer a cleanup step only if it is explicit about changing the input.</li>
          <li>Re-validate after cleanup so the output is strict JSON, not just nicer-looking text.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Common Ways the Problem Gets Introduced</h2>
        <p>Trailing commas usually show up for boring, fixable reasons:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Manual edits</span>
              <p className="text-sm">
                You delete the last item in a list or object member list and leave its comma behind.
              </p>
            </li>
            <li>
              <span className="font-medium">Copy-paste from JavaScript</span>
              <p className="text-sm">
                JavaScript literals often include syntax that JSON forbids, especially comments and trailing commas.
              </p>
            </li>
            <li>
              <span className="font-medium">Templating or string concatenation</span>
              <p className="text-sm">
                Hand-built JSON strings often add commas after every item instead of only between items.
              </p>
            </li>
            <li>
              <span className="font-medium">Confusing config formats with JSON</span>
              <p className="text-sm">
                Some developer tools accept relaxed formats like JSON5 or JSONC, which can make invalid JSON look
                normal.
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-5">
          <div>
            <h3 className="font-medium">1. Validate at the boundary</h3>
            <p className="text-sm">
              Validate payloads before they hit APIs, databases, queues, or config loaders. That catches trailing
              commas before they become production failures.
            </p>
          </div>

          <div>
            <h3 className="font-medium">2. Generate JSON with serializers</h3>
            <p className="text-sm">
              When your code can build a native object or array and serialize it, do that instead of hand-writing JSON
              strings.
            </p>
          </div>

          <div>
            <h3 className="font-medium">3. Keep relaxed formats out of strict JSON pipelines</h3>
            <p className="text-sm">
              JSON5 and JSONC are useful for human-edited config files, but they should be converted to strict JSON
              before they are sent to systems that expect standard JSON.
            </p>
          </div>

          <div>
            <h3 className="font-medium">4. Do not rely on naive regex cleanup</h3>
            <p className="text-sm">
              Replacing <code>,{"}"}</code> with <code>{"}"}</code> and <code>,]</code> with <code>]</code> can break
              valid string content. Fix the producer or use a parser designed for relaxed JSON syntax.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When JSON5 or JSONC Make Sense</h2>
        <p>
          If the input is a developer-facing configuration file and you intentionally want comments or trailing commas,
          use a relaxed parser first and then serialize back to strict JSON if another system needs standard output.
        </p>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Example normalization flow</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`import JSON5 from "json5";

const relaxedInput = \`{
  "name": "project",
  "features": ["search", "export",],
}\`;

const normalized = JSON.stringify(JSON5.parse(relaxedInput), null, 2);
console.log(normalized);`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            Use this only when you intentionally accept a relaxed format. For external data exchange, strict JSON is
            the safer default.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Checklist</h2>

        <div className="space-y-6">
          <p>If the trailing comma error keeps coming back, check these points:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The payload is actually JSON, not a JavaScript object literal or another config format.</li>
            <li>The parser error points near a closing brace or bracket, not somewhere earlier in the file.</li>
            <li>There are no comments in the document. Comments are also invalid in standard JSON.</li>
            <li>The JSON is being generated with a serializer rather than assembled by string concatenation.</li>
            <li>The system reading the file expects strict JSON and is not documented as accepting JSON5 or JSONC.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Trailing commas are easy to fix once you know what to look for: remove the comma directly before the closing{" "}
          <code>{"}"}</code> or <code>]</code>, then validate again.
        </p>

        <p>
          The current standard in RFC 8259 still forbids trailing commas, and current MDN documentation for{" "}
          <code>JSON.parse()</code> still documents them as a <code>SyntaxError</code>. Use relaxed formats only when
          you control the environment and explicitly need them.
        </p>
      </div>
    </>
  );
}
