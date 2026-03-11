import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Quoting Styles and Formatting Preferences | Offline Tools",
  description:
    "Learn the actual JSON quoting rules, why single quotes fail, how JSON differs from JavaScript object literals and JSON5, and which formatting defaults keep JSON readable and valid.",
};

export default function JsonQuotingFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Quoting Styles and Formatting Preferences</h1>

      <div className="space-y-6">
        <p>
          If you only need the short answer, here it is: standard JSON always uses double quotes for object keys and
          string values. Single quotes, comments, and trailing commas may look familiar from JavaScript, but they make
          the data invalid for normal JSON parsers.
        </p>

        <p>
          The formatting part is more flexible. Indentation, line breaks, and key ordering are style choices, not JSON
          syntax rules. The best preference is the one your team can apply automatically and consistently.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-xl font-semibold">Quick Guidance</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use double quotes everywhere JSON expects a name or string.</li>
            <li>Escape inner double quotes with <code>\&quot;</code> and backslashes with <code>\\</code>.</li>
            <li>Do not use comments, trailing commas, or bare identifiers in standard JSON.</li>
            <li>Prefer 2-space indentation unless an existing project already uses 4 spaces or tabs.</li>
            <li>Use JSON5 only when your exact parser or toolchain explicitly supports it.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Standard JSON Actually Requires</h2>
        <p>
          In standard JSON, an object member name is a string, and strings are written with double quotes. That means
          both the key and any text value must use <code>&quot;...&quot;</code>, not <code>&apos;...&apos;</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Valid JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Alice",
  "role": "Editor",
  "active": true,
  "tags": ["json", "formatting"]
}`}
            </pre>
          </div>
        </div>

        <p>
          Numbers, booleans, arrays, objects, and <code>null</code> are not quoted unless they are meant to be strings.
          For example, <code>"30"</code> and <code>30</code> are different values.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Single Quotes Break JSON</h2>
        <p>
          Many developers run into this after copying a JavaScript object literal, a config snippet, or an API example
          that is not actually JSON. A normal JSON parser rejects single-quoted strings and keys.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  'name': 'Bob',
  "city": "London",
  "enabled": true,
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            This fails for two separate reasons: single quotes are not valid JSON string delimiters, and the trailing
            comma after <code>true</code> is not allowed in standard JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON vs JavaScript Object Literals vs JSON5</h2>
        <p>
          Searchers often ask about JSON quoting styles when they are really comparing three different syntaxes. They
          look similar, but they are not interchangeable.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 border border-gray-300 dark:border-gray-700">Format</th>
                <th className="text-left p-3 border border-gray-300 dark:border-gray-700">Quotes</th>
                <th className="text-left p-3 border border-gray-300 dark:border-gray-700">Comments / Trailing Commas</th>
                <th className="text-left p-3 border border-gray-300 dark:border-gray-700">Best Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium">Standard JSON</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  Double quotes required for keys and strings
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">Not allowed</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  APIs, data exchange, storage, interoperability
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium">JavaScript Object Literal</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  More permissive, depending on JavaScript syntax
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">Allowed in many cases</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  Source code, not cross-language data interchange
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium">JSON5</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  Single quotes and unquoted keys may be allowed
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">Allowed</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  Human-edited config files when tooling explicitly supports JSON5
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The practical rule is simple: if another system, API, validator, or parser expects JSON, assume it means
          strict JSON unless the documentation clearly says otherwise.
        </p>

        <h2 className="text-2xl font-semibold mt-8">How to Quote and Escape Strings Correctly</h2>
        <p>
          Double quotes are required around every JSON string, but double quotes can still appear inside the value as
          long as they are escaped. The same applies to backslashes and control characters such as newlines and tabs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Escaping Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "message": "She said, \\"Ship it.\\"",
  "path": "C:\\\\Users\\\\alex\\\\Downloads",
  "note": "Line one\\nLine two"
}`}
            </pre>
          </div>
        </div>

        <p>
          A common mistake is pasting text that already contains raw quotes or Windows-style paths and forgetting to
          escape them. A formatter can re-indent valid JSON, but it cannot guess your intent if the string itself is
          malformed.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Recommended Formatting Preferences</h2>
        <p>
          JSON has only a few hard syntax rules. Most formatting preferences are about readability, review quality, and
          stable diffs in version control.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Indent with 2 spaces by default.</span> It is compact, widely understood,
              and works well for nested data. Use a different width only when a project already has an established
              convention.
            </li>
            <li>
              <span className="font-medium">Put a space after each colon.</span> <code>"name": "Alice"</code> is much
              easier to scan than <code>"name":"Alice"</code>.
            </li>
            <li>
              <span className="font-medium">Break nested objects and long arrays across lines.</span> Inline JSON is
              fine for tiny payloads, but multi-line formatting is easier to review and debug.
            </li>
            <li>
              <span className="font-medium">Treat key order as a style choice, not a semantic guarantee.</span> Some
              teams sort keys for stable diffs, but consumers should not rely on object member order unless the
              application defines that behavior separately.
            </li>
            <li>
              <span className="font-medium">Apply the style automatically.</span> A formatter is better than manual
              alignment, especially when multiple people edit the same file.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When JSON5 Is Fine and When It Is a Bad Idea</h2>
        <p>
          JSON5 can be a good fit for local configuration files that humans edit by hand. Comments, trailing commas, and
          less strict quoting make those files more pleasant to maintain.
        </p>
        <p>
          It is usually the wrong choice for APIs, exported data, third-party integrations, browser <code>JSON.parse</code>,
          or anything that needs maximum compatibility. If you are sending data across systems, convert it to strict
          JSON before it leaves your app or build step.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Validation Failures</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Unexpected token &apos;</span>: You used single quotes around a key or
              string.
            </li>
            <li>
              <span className="font-medium">Unexpected token /</span>: A comment was pasted into standard JSON.
            </li>
            <li>
              <span className="font-medium">Unexpected token ] or {"}"}</span>: A trailing comma is present before the
              closing bracket or brace.
            </li>
            <li>
              <span className="font-medium">Bad control character in string literal</span>: A newline, tab, or
              backslash inside a string was not escaped correctly.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Working Preference for Most Teams</h2>
        <p>
          If you need a default policy, this one is hard to regret: strict JSON, double quotes only, UTF-8 text,
          2-space indentation, one formatter, and no hand-written style exceptions. It is compatible with essentially
          every JSON parser and keeps diffs readable.
        </p>

        <p>
          If your input does not parse, fix validity first, then format it. A formatter helps with layout. It does not
          make invalid JSON valid unless the tool explicitly performs a cleanup or conversion step.
        </p>
      </div>
    </>
  );
}
