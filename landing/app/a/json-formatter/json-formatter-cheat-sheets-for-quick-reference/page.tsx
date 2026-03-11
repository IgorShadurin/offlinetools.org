import type { Metadata } from "next";
import { Code, FileJson2, Check, X, Info } from "lucide-react";

const quickReferenceRows = [
  {
    rule: "Top-level JSON can be any single JSON value",
    valid: `"hello"`,
    invalid: `"hello" "world"`,
    note: "Objects and arrays are common, but a JSON document can also be a string, number, boolean, or null.",
  },
  {
    rule: "Object keys must be double-quoted strings",
    valid: `{ "name": "Ada" }`,
    invalid: `{ name: "Ada" }`,
    note: "Unquoted keys are valid in JavaScript object literals, not in JSON.",
  },
  {
    rule: "Strings use double quotes and escapes",
    valid: `{ "line": "A\\nB" }`,
    invalid: `{ "line": 'A\nB' }`,
    note: "Use escapes like \\\" \\\\ \\n \\t and \\uXXXX when needed.",
  },
  {
    rule: "Numbers cannot use leading zeroes, NaN, or Infinity",
    valid: `{ "count": 10, "ratio": 0.25 }`,
    invalid: `{ "count": 01, "ratio": NaN }`,
    note: "JSON numbers are decimal only. Hex, octal, Infinity, and NaN are not valid JSON values.",
  },
  {
    rule: "Commas only separate items, never trail",
    valid: `{ "a": 1, "b": 2 }`,
    invalid: `{ "a": 1, "b": 2, }`,
    note: "A formatter cannot recover from trailing commas until the JSON parses successfully.",
  },
  {
    rule: "Comments are not part of JSON",
    valid: `{ "enabled": true }`,
    invalid: `{ "enabled": true // comment }`,
    note: "If you need comments in a config file, use the tool's supported format such as JSONC, YAML, or TOML instead.",
  },
  {
    rule: "Whitespace is optional and ignored by parsers",
    valid: `{"a":1}`,
    invalid: "None",
    note: "Pretty-printed and minified JSON represent the same data if the token order and values are unchanged.",
  },
  {
    rule: "Duplicate keys are technically legal text but unsafe",
    valid: `{ "id": 1, "name": "Ada" }`,
    invalid: `{ "id": 1, "id": 2 }`,
    note: "Different parsers may handle duplicate names differently. Avoid them if you want predictable results.",
  },
] as const;

const repairExamples = [
  {
    issue: "JavaScript object literal pasted into a JSON formatter",
    bad: `{ user: 'Ada', active: true }`,
    good: `{ "user": "Ada", "active": true }`,
  },
  {
    issue: "Trailing commas in objects or arrays",
    bad: `{ "tags": ["json", "formatting",], }`,
    good: `{ "tags": ["json", "formatting"] }`,
  },
  {
    issue: "Comments left in API payloads or config",
    bad: `{
  "timeout": 30 // seconds
}`,
    good: `{
  "timeout": 30
}`,
  },
  {
    issue: "Invalid numbers",
    bad: `{ "count": 01, "speed": Infinity }`,
    good: `{ "count": 1, "speed": 999999 }`,
  },
  {
    issue: "JavaScript-only values",
    bad: `{ "missing": undefined, "id": 9007199254740993n }`,
    good: `{ "missing": null, "id": "9007199254740993" }`,
  },
] as const;

const stringifyRows = [
  {
    pattern: `JSON.stringify(value)`,
    result: "Minified JSON string",
    example: `JSON.stringify({ name: "Ada", admin: false })`,
  },
  {
    pattern: `JSON.stringify(value, null, 2)`,
    result: "Pretty-printed with 2 spaces",
    example: `JSON.stringify({ name: "Ada" }, null, 2)`,
  },
  {
    pattern: `JSON.stringify(value, ["id", "name"], 2)`,
    result: "Keeps only listed object keys",
    example: `JSON.stringify(user, ["id", "name"], 2)`,
  },
  {
    pattern: `JSON.stringify(value, replacerFn, 2)`,
    result: "Transforms or drops values during serialization",
    example: `JSON.stringify(data, (key, value) => (key === "secret" ? undefined : value), 2)`,
  },
] as const;

const gotchas = [
  {
    title: "undefined, functions, and symbols are dropped from objects",
    code: `JSON.stringify({ a: undefined, b: () => {}, c: Symbol("x") })`,
    outcome: "`{}`. In arrays, those same values become `null` instead.",
  },
  {
    title: "BigInt throws instead of serializing",
    code: `JSON.stringify({ id: 2n })`,
    outcome: "Throws `TypeError` unless you convert the value yourself, typically to a string.",
  },
  {
    title: "NaN and Infinity become null",
    code: `JSON.stringify({ score: NaN, limit: Infinity })`,
    outcome: '`{"score":null,"limit":null}`.',
  },
  {
    title: "Date uses its JSON representation",
    code: `JSON.stringify({ createdAt: new Date("2026-03-10T12:00:00Z") })`,
    outcome: 'Dates serialize as ISO strings such as `{"createdAt":"2026-03-10T12:00:00.000Z"}`.',
  },
  {
    title: "Map and Set are not serialized the way many people expect",
    code: `JSON.stringify({ map: new Map([["x", 1]]), set: new Set([1, 2]) })`,
    outcome: 'Usually `{"map":{},"set":{}}` unless you convert them first.',
  },
  {
    title: "Indentation is capped",
    code: `JSON.stringify(data, null, 20)`,
    outcome: "The indentation width is capped at 10 spaces. String indentation is truncated to its first 10 characters.",
  },
  {
    title: "Circular references still fail",
    code: `const obj: { self?: unknown } = {}; obj.self = obj; JSON.stringify(obj);`,
    outcome: "Throws because plain JSON cannot represent a circular structure.",
  },
] as const;

export const metadata: Metadata = {
  title: "JSON Formatter Cheat Sheets for Quick Reference | Offline Tools",
  description:
    "A practical JSON formatter cheat sheet with valid syntax, invalid-to-valid fixes, JSON.stringify examples, and troubleshooting tips for common formatter errors.",
};

export default function JsonFormatterCheatSheetPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="w-8 h-8" /> JSON Formatter Cheat Sheets for Quick Reference
      </h1>

      <div className="space-y-6">
        <p>
          Need a fast way to check whether your JSON should format cleanly? This cheat sheet focuses on the rules that
          break formatters most often, shows quick invalid-to-valid fixes, and highlights the current{" "}
          <code>JSON.stringify()</code> behaviors that matter in real debugging.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/30 dark:border-blue-900">
          <p className="font-medium flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" /> Fast mental model
          </p>
          <p className="mt-2">
            A JSON formatter can only pretty-print input that already parses as valid JSON. It will not automatically
            convert JavaScript object literals, comments, trailing commas, <code>undefined</code>, or <code>BigInt</code>{" "}
            into valid JSON for you.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> One-Screen JSON Cheat Sheet
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="text-left p-3 font-semibold">Rule</th>
                <th className="text-left p-3 font-semibold">Valid</th>
                <th className="text-left p-3 font-semibold">Invalid</th>
                <th className="text-left p-3 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {quickReferenceRows.map((row) => (
                <tr key={row.rule} className="border-t border-gray-200 align-top dark:border-gray-800">
                  <td className="p-3 font-medium">{row.rule}</td>
                  <td className="p-3">
                    <code>{row.valid}</code>
                  </td>
                  <td className="p-3">
                    {row.invalid === "None" ? "None" : <code>{row.invalid}</code>}
                  </td>
                  <td className="p-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-green-500" /> Copy-Paste Starter Snippets
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium">Valid object template</h3>
            <pre className="mt-3">{`{
  "id": 123,
  "name": "Ada Lovelace",
  "active": true,
  "tags": ["math", "programming"],
  "profile": {
    "city": "London"
  },
  "notes": null
}`}</pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium">Valid array template</h3>
            <pre className="mt-3">{`[
  {
    "id": 1,
    "name": "Ada"
  },
  {
    "id": 2,
    "name": "Grace"
  }
]`}</pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium">Pretty-printed JSON</h3>
            <pre className="mt-3">{`{
  "ok": true,
  "items": [
    1,
    2,
    3
  ]
}`}</pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h3 className="text-lg font-medium">Minified JSON</h3>
            <pre className="mt-3">{`{"ok":true,"items":[1,2,3]}`}</pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <X className="w-6 h-6 text-red-500" /> Common Inputs That Break JSON Formatters
        </h2>
        <p>
          These are the cases that most often cause a formatter to fail immediately. Fix the syntax first, then format
          the result.
        </p>

        <div className="space-y-4">
          {repairExamples.map((example) => (
            <div key={example.issue} className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <h3 className="text-lg font-medium">{example.issue}</h3>
              <div className="grid gap-4 md:grid-cols-2 mt-3">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Invalid input</p>
                  <pre className="mt-2 bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <code>{example.bad}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Valid JSON</p>
                  <pre className="mt-2 bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <code>{example.good}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6">JSON vs. JavaScript object literals</h3>
        <p>
          Many formatter errors come from pasting JavaScript instead of JSON. JavaScript may allow unquoted keys,
          single quotes, trailing commas, comments, <code>undefined</code>, and <code>123n</code> BigInt literals.
          JSON does not. If the source came from application code, convert it to real JSON before running it through a
          formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Using <code>JSON.stringify()</code> for Formatting <Code className="w-6 h-6" />
        </h2>
        <p>
          In browsers and Node.js, <code>JSON.stringify(value, replacer, space)</code> is the fastest way to generate
          formatted JSON from an already-valid JavaScript value.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="text-left p-3 font-semibold">Pattern</th>
                <th className="text-left p-3 font-semibold">What it does</th>
                <th className="text-left p-3 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              {stringifyRows.map((row) => (
                <tr key={row.pattern} className="border-t border-gray-200 align-top dark:border-gray-800">
                  <td className="p-3">
                    <code>{row.pattern}</code>
                  </td>
                  <td className="p-3">{row.result}</td>
                  <td className="p-3">
                    <code>{row.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Pretty-print with two spaces</h3>
          <pre className="mt-3">{`const data = {
  name: "Ada",
  languages: ["Analytical Engine notes", "Mathematics"]
};

const formatted = JSON.stringify(data, null, 2);
/*
{
  "name": "Ada",
  "languages": [
    "Analytical Engine notes",
    "Mathematics"
  ]
}
*/`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Current <code>JSON.stringify()</code> gotchas</h3>
        <p>
          These behaviors are the ones developers most often forget when a formatter output looks different from the
          original JavaScript data.
        </p>
        <ul className="space-y-4">
          {gotchas.map((item) => (
            <li key={item.title} className="list-none bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <p className="font-medium">{item.title}</p>
              <pre className="mt-3 bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <code>{item.code}</code>
              </pre>
              <p className="mt-3">{item.outcome}</p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> Troubleshooting Checklist
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Start with the first parse error. Later errors are often side effects of the first broken token.</li>
          <li>Replace single quotes with double quotes only where they are part of JSON syntax, not inside the data.</li>
          <li>Remove comments and trailing commas before trying to format.</li>
          <li>Check number literals for leading zeroes, missing digits after decimal points, and JavaScript-only values.</li>
          <li>
            If you are serializing JavaScript, decide how to handle <code>undefined</code>, <code>Date</code>,{" "}
            <code>Map</code>, <code>Set</code>, <code>NaN</code>, <code>Infinity</code>, and <code>BigInt</code>{" "}
            before calling <code>JSON.stringify()</code>.
          </li>
          <li>
            If the data is newline-delimited JSON (JSON Lines / NDJSON), format each line as its own JSON document.
          </li>
        </ul>

        <p>
          Use this page as a quick reference when a formatter rejects your input or when you need a reminder of how
          JavaScript values turn into JSON text. The shorter the feedback loop, the faster you can fix invalid payloads
          and move on.
        </p>
      </div>
    </>
  );
}
