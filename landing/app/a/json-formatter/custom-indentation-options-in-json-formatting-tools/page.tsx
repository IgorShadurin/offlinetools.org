import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom JSON Indentation Options: Tabs, Spaces, Width, and Tool Limits | Offline Tools",
  description:
    "Learn how JSON indentation really works, choose between tabs and spaces, avoid compatibility traps, and pick practical defaults for editors, scripts, and teams.",
};

export default function CustomIndentationOptionsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Custom Indentation Options in JSON Formatting Tools</h1>

      <div className="space-y-6">
        <p>
          Custom indentation does not change what JSON means, but it has a major effect on how quickly people can read,
          review, and debug it. For most real-world workflows, the useful questions are straightforward: tabs or
          spaces, how wide each level should be, whether short arrays stay on one line, and whether the tool still
          outputs strict JSON that every parser accepts.
        </p>

        <p>
          If you want a safe default, use spaces with 2-space indentation, keep a final newline, and format in strict
          JSON mode. That combination is compact, readable, and broadly compatible across editors, APIs, and version
          control.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Quick answer</h2>
          <p className="mt-2 text-blue-800 dark:text-blue-100">
            The best custom indentation options in a JSON formatting tool are usually: choose tabs or spaces, set the
            indent width, control whether short arrays stay compact, and keep strict JSON output. For shared files,
            spaces plus 2-space indentation is the safest default.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What the JSON Standard Actually Says</h2>

        <p>
          Standard JSON does not require 2 spaces, 4 spaces, tabs, or any other specific formatting style. The JSON
          specification only treats whitespace as insignificant around structural characters such as commas, colons,
          braces, and brackets.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Indentation is presentation, not data:</strong> A minified document and a pretty-printed document
            represent the same JSON values.
          </li>
          <li>
            <strong>Only a few whitespace characters are valid in JSON:</strong> space, horizontal tab, line feed, and
            carriage return.
          </li>
          <li>
            <strong>Comments and trailing commas are not part of standard JSON:</strong> if a tool accepts them, it is
            using a relaxed mode such as JSONC or JSON5-style behavior, not strict JSON.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Same data, different formatting</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-sm font-medium mb-2">Minified JSON:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`{"user":{"name":"John","profile":{"age":30,"roles":["admin","editor"]},"settings":{"notifications":true,"theme":"dark"}}}`}
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Pretty-printed JSON:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`{
  "user": {
    "name": "John",
    "profile": {
      "age": 30,
      "roles": [
        "admin",
        "editor"
      ]
    },
    "settings": {
      "notifications": true,
      "theme": "dark"
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Indentation Options That Actually Matter</h2>

        <h3 className="text-xl font-semibold mt-6">1. Tabs or spaces</h3>
        <p>This is the first setting most JSON formatting tools expose, and it affects more than visual style.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Spaces:</strong> Predictable in browsers, review tools, pasted snippets, documentation, and issue
            trackers.
          </li>
          <li>
            <strong>Tabs:</strong> Smaller file size and adjustable visual width, but the rendered width depends on the
            viewer&apos;s editor settings.
          </li>
        </ul>

        <p className="mt-4">
          For shared JSON files, spaces are usually safer. Tabs are valid JSON whitespace, but they often create uneven
          alignment in Git diffs, web previews, or editors with different tab-width settings.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Indent width</h3>
        <p>The next decision is how much visual separation you want at each nesting level.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>2 spaces:</strong> Usually the best default for API payloads, config files, and mobile-sized
            screens.
          </li>
          <li>
            <strong>4 spaces:</strong> Easier to scan in deeply nested data, but it wraps earlier and creates longer
            diffs.
          </li>
          <li>
            <strong>Tabs:</strong> Useful when each developer wants a different visual width, as long as the team also
            agrees on a display convention.
          </li>
        </ul>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Consistency tip</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Choose one indentation style per project and enforce it everywhere. The biggest readability problem is not
            whether a file uses 2 or 4 spaces. It is when the formatter, editor, CLI script, and teammate preferences
            all disagree.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Compact versus multiline containers</h3>
        <p>
          Better formatters also decide when arrays and objects should stay on one line and when they should expand.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Compact small arrays:</strong> Good for short lists like feature flags or enum-like values.
          </li>
          <li>
            <strong>Multiline expansion:</strong> Better for nested objects, long strings, and reviewability.
          </li>
          <li>
            <strong>Threshold-based wrapping:</strong> Some tools switch layout based on item count or line length.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Array formatting choices</h3>

          <div className="space-y-4 mt-3">
            <div>
              <p className="text-sm font-medium mb-2">Multiline arrays:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`{
  "colors": [
    "red",
    "green",
    "blue"
  ]
}`}
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Compact arrays:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`{
  "colors": ["red", "green", "blue"]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. End-of-line details</h3>
        <p>
          Indentation settings are often bundled with line-ending and newline rules because they affect diffs just as
          much as spaces and tabs do.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Final newline:</strong> Keeping one at the end of the file makes diffs cleaner in many tools.
          </li>
          <li>
            <strong>Line endings:</strong> Normalize to LF unless your environment requires otherwise.
          </li>
          <li>
            <strong>Whitespace around separators:</strong> Most formatters standardize a single space after colons and
            commas in pretty output.
          </li>
        </ul>

        <p className="mt-4">
          These settings do not change the parsed data, but they do reduce noisy version-control churn when multiple
          people edit the same JSON files.
        </p>

        <h2 className="text-2xl font-semibold mt-8">How Real Tools Behave Today</h2>

        <h3 className="text-xl font-semibold mt-6">JavaScript-based formatters and scripts</h3>
        <p>
          A lot of JSON formatting on the web still follows JavaScript behavior similar to{" "}
          <code>JSON.stringify(value, replacer, space)</code>.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Numeric indent values are capped:</strong> JavaScript limits them to 10 spaces per nesting level.
          </li>
          <li>
            <strong>Custom indent strings are also capped:</strong> only the first 10 characters are used.
          </li>
          <li>
            <strong>Tabs are allowed:</strong> passing <code>&quot;\t&quot;</code> produces tab-indented output.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: common JavaScript indentation settings</h3>

          <div className="space-y-4 mt-3">
            <div>
              <p className="text-sm font-medium mb-2">Typical API calls:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`JSON.stringify(data, null, 2);    // 2 spaces
JSON.stringify(data, null, 4);    // 4 spaces
JSON.stringify(data, null, "\\t"); // tabs`}
                </pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Practical limitation:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`JSON.stringify(data, null, 12);      // behaves like 10 spaces
JSON.stringify(data, null, "............"); // first 10 characters only`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <p>
          If a browser-based formatter refuses a very wide indent or shortens a custom indent token, it may be
          inheriting this JavaScript limit rather than ignoring your setting.
        </p>

        <h3 className="text-xl font-semibold mt-6">Editors and IDEs</h3>
        <p>
          Editors can make JSON formatting feel inconsistent because they may support both strict JSON and relaxed
          variants.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Strict JSON mode:</strong> Best for files that will be parsed by APIs, CLIs, CI jobs, or other
            machines.
          </li>
          <li>
            <strong>Relaxed modes such as JSONC:</strong> Useful for editor settings files, but comments and trailing
            commas can break strict parsers elsewhere.
          </li>
          <li>
            <strong>Editor defaults still matter:</strong> tab width and indentation detection can change how the same
            file looks from one environment to another.
          </li>
        </ul>

        <div className="bg-red-50 p-4 rounded-lg dark:bg-red-900/30 my-6 border-l-4 border-red-400">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-200">Compatibility warning</h3>
          <p className="mt-2 text-red-800 dark:text-red-100">
            If a formatter adds comments or trailing commas, the result is no longer standard JSON. That can be fine
            for editor config files in JSONC mode, but it is not safe for API requests or strict parsers.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Team-wide settings with .editorconfig</h3>
        <p>
          When several people or tools touch the same JSON files, encode the rule once instead of relying on personal
          editor defaults.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: project-level indentation rules</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`[*.json]
indent_style = space
indent_size = 2
insert_final_newline = true`}
            </pre>
          </div>
        </div>

        <p>
          If your team prefers tabs, switch to <code>indent_style = tab</code> and agree separately on display width
          with <code>tab_width</code> or editor settings. The important part is that everyone is reading from the same
          source of truth.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choosing the Right Indentation for Your Use Case</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>API examples and documentation:</strong> Use spaces, usually 2 spaces, because the output will look
            consistent anywhere it is pasted.
          </li>
          <li>
            <strong>Human-edited config files:</strong> Use 2 spaces for compactness unless the structure is deeply
            nested and your team strongly prefers 4.
          </li>
          <li>
            <strong>Large files under active review:</strong> Favor the style that produces the smallest clean diffs,
            which is usually spaces plus a stable formatter.
          </li>
          <li>
            <strong>Personal local inspection:</strong> Tabs can work well if you control the editor and want adjustable
            visual width.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Unexpected Formatter Output</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Your 12-space indent keeps shrinking:</strong> The formatter may be using JavaScript&apos;s
            indentation limit of 10 characters.
          </li>
          <li>
            <strong>Tabs look different on another machine:</strong> That is usually an editor tab-width issue, not a
            JSON parsing issue.
          </li>
          <li>
            <strong>The tool keeps some arrays on one line:</strong> Look for a wrap threshold, print width, or compact
            array setting. Not every formatter exposes that separately.
          </li>
          <li>
            <strong>An API rejects the formatted file:</strong> Revalidate it in strict JSON mode and remove comments,
            trailing commas, and non-JSON syntax such as single-quoted keys.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Custom indentation options are useful when they solve concrete workflow problems, not when they add endless
          style knobs. The most valuable controls are still the simplest ones: tabs versus spaces, indent width,
          compact versus multiline layout, and strict output that stays valid JSON.
        </p>

        <p>
          If you are choosing defaults for a formatter today, spaces with 2-space indentation remains the safest option
          for compatibility and readability. If you choose something else, document it and enforce it consistently so
          your tooling stops fighting your team.
        </p>
      </div>
    </>
  );
}
