import type { Metadata } from "next";
import { BookOpen, Code, FileJson, LayoutList, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters for Frontend Web Developers",
  description:
    "Practical guide for frontend web developers: format and validate JSON in browser DevTools, VS Code, and JavaScript, with current JSON.stringify caveats.",
};

export default function JsonFormattersPage() {
  return (
    <>
      <div className="mb-8 flex items-center">
        <FileJson size={40} className="mr-4 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">JSON Formatters for Frontend Web Developers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            How to format, validate, inspect, and safely share JSON during everyday frontend work.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <BookOpen size={24} className="mr-2 text-purple-600" /> What Frontend Developers Need From a JSON Formatter
          </h2>
          <p>
            Frontend developers usually reach for a JSON formatter when an API response is collapsed into one line, a
            fixture file becomes hard to scan, or a console dump hides the field that actually matters. The job is not
            just to “make JSON pretty.” A useful formatter helps you validate syntax, understand structure quickly, and
            inspect data without changing what the payload means.
          </p>
          <p className="mt-4">
            In practice, the best option depends on where the JSON lives. Live responses are easiest to inspect in the
            browser network panel. Checked-in files and mock data belong in your editor. Sensitive production payloads
            are safer in an offline tool or local script. And when you need formatted output inside your app or logs,
            <code> JSON.stringify()</code> is still the core primitive.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Zap size={24} className="mr-2 text-yellow-600" /> Best Places to Format JSON in a Frontend Workflow
          </h2>

          <h3 className="mb-3 mt-6 text-xl font-semibold">1. Browser DevTools for live API responses</h3>
          <p>
            Start in the Network panel when you are debugging a fetch call, GraphQL request, or REST response. Modern
            browsers usually show valid JSON in a readable tree or structured preview when the response is served as
            JSON. If the server sends the right body with the wrong <code>Content-Type</code>, you may only see raw
            text, which is often the first clue that the backend response headers are off.
          </p>
          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Use this when:</strong> you need to inspect the actual payload your UI received, not a copied
              sample from somewhere else.
            </p>
          </div>

          <h3 className="mb-3 mt-6 text-xl font-semibold">2. VS Code for files, fixtures, and mock payloads</h3>
          <p>
            VS Code remains the most practical place to format JSON files in day-to-day frontend work. Format the
            document when you are cleaning up fixture data, editing translation files, or reviewing large config
            changes in a pull request. VS Code also distinguishes between strict JSON and <code>jsonc</code>, which is
            important because comments and trailing commas are accepted in JSONC-based files like some editor settings,
            but they are not valid in real JSON sent over the wire.
          </p>
          <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 text-lg font-medium">Practical default</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Use “Format Document” for <code>.json</code> files, then let schema validation and linting tell you
              whether the payload shape still matches expectations.
            </p>
          </div>

          <h3 className="mb-3 mt-6 text-xl font-semibold">3. Offline tools for pasted snippets and sensitive data</h3>
          <p>
            A standalone or offline JSON formatter is the right choice when you want quick validation without opening a
            project file, especially if the payload includes auth tokens, customer records, or internal IDs. Public web
            formatters are convenient, but production payloads should be treated as potentially sensitive even if you
            think they are “just debug data.”
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">4. JavaScript or TypeScript for logs and UI debugging</h3>
          <p>
            Use <code>JSON.stringify(value, replacer, 2)</code> when you need formatted output inside your own code:
            debug logging, downloadable exports, snapshot fixtures, or a temporary debug panel in a React app.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code size={24} className="mr-2 text-green-600" /> Practical Examples for Frontend Teams
          </h2>

          <h3 className="mb-2 text-lg font-medium">Pretty-print a fetched response during debugging</h3>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">
              {`const response = await fetch("/api/profile");
const data = await response.json();

console.log(JSON.stringify(data, null, 2));`}
            </pre>
          </div>
          <p>
            This is the fastest way to confirm nesting, missing properties, or unexpected types after a request
            succeeds but your UI still renders the wrong thing.
          </p>

          <h3 className="mb-2 mt-6 text-lg font-medium">Redact secrets before copying JSON into a ticket or chat</h3>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">
              {`const scrubbed = JSON.stringify(payload, (key, value) => {
  if (["token", "authorization", "password"].includes(key.toLowerCase())) {
    return "[redacted]";
  }

  return value;
}, 2);`}
            </pre>
          </div>
          <p>
            The <code>replacer</code> argument is easy to overlook, but it is the safest way to preserve structure
            while stripping values you should not share.
          </p>

          <h3 className="mb-2 mt-6 text-lg font-medium">Render readable debug JSON in a React component</h3>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">
              {`{debugMode && data ? (
  <pre className="overflow-auto rounded bg-slate-950 p-4 text-xs text-white">
    {JSON.stringify(data, null, 2)}
  </pre>
) : null}`}
            </pre>
          </div>
          <p>
            Keep this behind a debug flag or developer-only route. Pretty-printing a very large object on every render
            can create unnecessary main-thread work.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <LayoutList size={24} className="mr-2 text-blue-600" /> Current JSON.stringify Rules Worth Remembering
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Indentation is capped:</strong> the <code>space</code> argument is limited to 10 spaces, or the
              first 10 characters of a string.
            </li>
            <li>
              <strong>BigInt is not JSON-safe by default:</strong> serializing a raw <code>BigInt</code> throws unless
              you convert it first.
            </li>
            <li>
              <strong>Some values disappear or change shape:</strong> <code>undefined</code>, functions, and symbols
              are omitted from objects; in arrays they become <code>null</code>.
            </li>
            <li>
              <strong>Date values serialize to strings:</strong> if you inspect formatted JSON, what you see is usually
              an ISO date string, not a live <code>Date</code> instance.
            </li>
            <li>
              <strong>Map and Set are not preserved as JSON structures:</strong> they do not stringify into a useful
              keyed collection unless you transform them first.
            </li>
            <li>
              <strong>Repeated output for the same plain object is stable:</strong> property enumeration follows the
              same rules as <code>Object.keys()</code>, which makes diffs more predictable even though JSON itself is
              still just data, not a sorting guarantee for your UI.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Zap size={24} className="mr-2 text-red-600" /> Common Mistakes and Troubleshooting
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Confusing JavaScript objects with JSON:</strong> valid JSON requires double-quoted keys and
              strings, with no comments or trailing commas.
            </li>
            <li>
              <strong>Assuming a formatter will fix invalid data:</strong> formatters improve layout, but they do not
              correct a broken schema or an API that returns the wrong types.
            </li>
            <li>
              <strong>Ignoring circular references:</strong> <code>JSON.stringify()</code> throws when objects refer
              back to themselves.
            </li>
            <li>
              <strong>Formatting giant payloads in the render path:</strong> if a response is huge, stringify on demand
              instead of every render or every keystroke.
            </li>
            <li>
              <strong>Pasting private payloads into public tools:</strong> API responses often include tokens,
              identifiers, and customer data even when the screen looks harmless.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <BookOpen size={24} className="mr-2 text-purple-600" /> Recommended Default Workflow
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use the browser network panel first when the JSON came from a real request.</li>
            <li>Use your editor formatter for fixture files, config, and anything committed to the repo.</li>
            <li>Use an offline formatter when the snippet contains sensitive or production data.</li>
            <li>
              Use <code>JSON.stringify(..., null, 2)</code> for app-level debugging, and add a replacer when you need
              to redact fields.
            </li>
          </ul>
          <p className="mt-4">
            For frontend web developers, the right JSON formatter is usually the one closest to the problem you are
            solving. The goal is not only readable output. It is faster debugging, safer sharing, and fewer mistakes
            when moving data between the browser, your editor, and application code.
          </p>
        </section>
      </div>
    </>
  );
}
