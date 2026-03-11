import type { Metadata } from "next";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  Code,
  Command,
  FileText,
  FlaskConical,
  Laptop,
  Library,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Python JSON Formatting Tools and Libraries: Built-in CLI, json.dumps(), and Faster Options | Offline Tools",
  description:
    "Choose the right Python JSON formatter for scripts, the terminal, JSON Lines, Unicode output, and high-throughput apps with practical examples and current CLI notes.",
};

export default function PythonJsonFormattingPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <Braces className="mr-3" size={32} /> Python JSON Formatting Tools and Libraries
      </h1>

      <div className="space-y-6">
        <p>
          If you need to pretty-print JSON in Python today, start with the built-in <code>json</code> module. It is
          available everywhere, it handles both scripts and terminal use, and in current Python releases the command
          line interface is available as <code>python -m json</code> as well as the older
          <code> python -m json.tool</code> form.
        </p>
        <p>
          The real decisions are not about syntax. They are about output quality and workflow: whether you want UTF-8
          characters instead of escaped Unicode, whether you need strict JSON instead of JavaScript-style
          <code> NaN</code> values, whether your data is JSON Lines, and whether faster third-party serialization is
          worth giving up some flexibility.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CheckCircle2 className="mr-2" /> What Should You Use?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-3 pr-4 font-semibold">Task</th>
                <th className="py-3 pr-4 font-semibold">Best option</th>
                <th className="py-3 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="py-3 pr-4">Format JSON inside Python code</td>
                <td className="py-3 pr-4">
                  <code>json.dumps()</code>
                </td>
                <td className="py-3">Portable, flexible, and supports custom indent width, key sorting, and strict-output settings.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="py-3 pr-4">Validate or pretty-print from the terminal</td>
                <td className="py-3 pr-4">
                  <code>python -m json</code>
                </td>
                <td className="py-3">Fastest zero-dependency option for files, pipes, and quick debugging.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="py-3 pr-4">Format JSON Lines or NDJSON</td>
                <td className="py-3 pr-4">
                  <code>python -m json --json-lines</code>
                </td>
                <td className="py-3">Treats each line as its own JSON document instead of failing on multi-record files.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="py-3 pr-4">High-throughput serialization in app code</td>
                <td className="py-3 pr-4">
                  <code>orjson</code>
                </td>
                <td className="py-3">Very fast and popular, but it returns bytes and offers fewer formatting choices.</td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4">One-off inspection in a browser</td>
                <td className="py-3 pr-4">An offline formatter</td>
                <td className="py-3">Useful when you want readable output without uploading sensitive JSON to a third-party service.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Library className="mr-2" /> The Default Choice: Python&apos;s <code>json</code> Module
        </h2>
        <p>
          The standard library remains the best starting point for most developers. It works for API responses,
          configuration files, test fixtures, and debug output, and it gives you more control over formatting than many
          faster alternatives.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          <Code className="mr-2 inline-block" size={20} /> Format with <code>json.dumps()</code>
        </h3>
        <p>These options matter most in real projects:</p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <code>indent</code>: Use an integer such as <code>2</code> or <code>4</code> for normal pretty-printing,
            or pass a string such as <code>&quot;\t&quot;</code> if your team prefers tabs.
          </li>
          <li>
            <code>ensure_ascii=False</code>: Keeps UTF-8 characters readable instead of escaping everything above ASCII.
            This is usually the better choice for logs, fixtures, and user-facing output.
          </li>
          <li>
            <code>sort_keys=True</code>: Makes diffs easier to review and helps stabilize snapshots in tests.
          </li>
          <li>
            <code>allow_nan=False</code>: Raises an error for <code>NaN</code>, <code>Infinity</code>, and
            <code> -Infinity</code> so the output stays strict JSON.
          </li>
          <li>
            <code>separators=(&quot;,&quot;, &quot;:&quot;)</code>: Useful when you want compact JSON instead of human-readable output.
          </li>
        </ul>

        <h4 className="mt-4 text-lg font-medium">Example: readable JSON with Unicode preserved</h4>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre>
            <code className="language-python">
              {`import json

payload = {
    "user": "Marina",
    "city": "Minsk",
    "message": "Привет",
    "roles": ["admin", "editor"]
}

pretty_json = json.dumps(
    payload,
    indent=2,
    ensure_ascii=False,
    sort_keys=True,
    allow_nan=False,
)

print(pretty_json)
`}
            </code>
          </pre>
        </div>
        <p>
          That combination is a strong default for developer-facing output: it stays readable, produces predictable key
          order, and fails fast if the data is not valid JSON.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <FileText className="mr-2" size={20} /> Write formatted files with <code>json.dump()</code>
        </h3>
        <p>
          Use <code>json.dump()</code> when you want to write directly to disk. For text files, explicitly opening with
          <code> encoding=&quot;utf-8&quot;</code> avoids platform-default surprises.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre>
            <code className="language-python">
              {`import json

config = {
    "api_url": "https://example.com/v1",
    "timeout_seconds": 30,
    "features": {
        "pretty_logging": True,
        "strict_mode": True
    }
}

with open("config.json", "w", encoding="utf-8") as handle:
    json.dump(
        config,
        handle,
        indent=2,
        ensure_ascii=False,
        sort_keys=True,
    )
`}
            </code>
          </pre>
        </div>
        <p>
          One easy mistake: JSON is not a framed format, so repeated calls to <code>json.dump()</code> on the same file
          do not create a valid stream of separate documents. If you need one object per line, use JSON Lines instead.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Terminal className="mr-2" /> Command-Line Formatting with <code>python -m json</code>
        </h2>
        <p>
          For shell use, Python&apos;s built-in CLI is still the most practical formatter when you already have Python
          installed. In Python 3.14, the documentation exposes the command as <code>python -m json</code>; the older
          <code> python -m json.tool</code> entry point remains useful for compatibility and behaves the same way for
          most workflows.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          <Command className="mr-2 inline-block" size={20} /> Useful CLI patterns
        </h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Pretty-print a file:
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json payload.json</code>
              </pre>
            </div>
          </li>
          <li>
            Validate and sort keys:
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json --sort-keys payload.json</code>
              </pre>
            </div>
          </li>
          <li>
            Preserve Unicode characters:
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">cat payload.json | python -m json --no-ensure-ascii</code>
              </pre>
            </div>
          </li>
          <li>
            Handle JSON Lines or NDJSON correctly:
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json --json-lines records.jsonl</code>
              </pre>
            </div>
          </li>
          <li>
            Switch formatting style:
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json --indent 2 payload.json</code>
              </pre>
            </div>
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json --tab payload.json</code>
              </pre>
            </div>
            <div className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <pre>
                <code className="language-bash">python -m json --compact payload.json</code>
              </pre>
            </div>
          </li>
        </ul>
        <p>
          The CLI also validates input. If the JSON is malformed, it exits with an error and points to the problem
          location, which makes it handy in shell scripts and CI checks.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Laptop className="mr-2" /> Third-Party Libraries Worth Knowing
        </h2>
        <p>
          Most articles list a long catalog of JSON libraries. For formatting work, that usually adds noise. The main
          alternative worth evaluating is <code>orjson</code>, especially when formatting is part of a larger
          serialization path that needs to be fast.
        </p>

        <h3 className="mt-6 text-xl font-semibold">When <code>orjson</code> is a better fit</h3>
        <p>
          <code>orjson</code> is designed for speed and produces UTF-8 bytes instead of Python strings. It supports
          pretty-printing with <code>OPT_INDENT_2</code> and key sorting with <code>OPT_SORT_KEYS</code>, so it can
          work well in APIs and services where JSON serialization is on the hot path.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre>
            <code className="language-python">
              {`import orjson

payload = {
    "message": "Привет",
    "ok": True,
    "items": [1, 2, 3]
}

pretty_bytes = orjson.dumps(
    payload,
    option=orjson.OPT_INDENT_2 | orjson.OPT_SORT_KEYS,
)

print(pretty_bytes.decode("utf-8"))
`}
            </code>
          </pre>
        </div>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Choose <code>orjson</code> when throughput matters and you are already comfortable handling bytes.
          </li>
          <li>
            Stay with the standard library when you need arbitrary indent widths, direct file writing with
            <code> json.dump()</code>, or the least surprising behavior for scripts and tooling.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <AlertTriangle className="mr-2" /> Common Formatting Mistakes
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Treating JSON Lines like one big JSON document. A file with one object per line needs
            <code> --json-lines</code> or custom line-by-line handling.
          </li>
          <li>
            Forgetting that <code>ensure_ascii=True</code> is the default. If your output suddenly contains
            <code> \\uXXXX</code> escapes, set <code>ensure_ascii=False</code>.
          </li>
          <li>
            Assuming <code>NaN</code> and <code>Infinity</code> are always valid JSON. They are allowed by Python&apos;s
            default encoder, but not by strict JSON parsers.
          </li>
          <li>
            Assuming non-string dictionary keys round-trip cleanly. JSON object keys are strings, so
            <code> loads(dumps(x))</code> can change the shape of your data.
          </li>
          <li>
            Pretty-printing huge payloads in memory during debugging. Indentation increases size, and converting a very
            large object to a single formatted string can be expensive.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FlaskConical className="mr-2" /> Practical Recommendations
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            For application code, use <code>json.dumps(..., indent=2, ensure_ascii=False)</code> unless you have a
            measured reason to do something else.
          </li>
          <li>
            For fixtures, config files, and snapshots, add <code>sort_keys=True</code> so diffs stay readable.
          </li>
          <li>
            For pipelines and quick validation, keep <code>python -m json</code> in your shell toolbox.
          </li>
          <li>
            For strict interoperability with external systems, add <code>allow_nan=False</code> and test with real
            payloads instead of assuming the defaults are portable.
          </li>
          <li>
            For sensitive one-off inspection, prefer a local or offline formatter over a random web app.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          Python already gives you excellent JSON formatting tools. The standard <code>json</code> module is still the
          right default, the CLI covers day-to-day validation and terminal formatting, and <code>orjson</code> is worth
          considering when serialization speed matters more than formatting flexibility. If you understand Unicode,
          strict JSON, and JSON Lines, you will avoid most of the issues that make JSON formatting feel harder than it
          should.
        </p>
      </div>
    </>
  );
}
