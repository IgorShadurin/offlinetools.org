import type { Metadata } from "next";
import { Code, CheckCheck, X, Info, Play, Columns2, ListChecks, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Code Playgrounds for JSON Formatting Practice",
  description:
    "Learn when to use a JSON formatter, browser DevTools, CodePen, or StackBlitz for JSON formatting practice, debugging, and shareable demos.",
};

export default function JsonPlaygroundsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code size={36} /> Interactive Code Playgrounds for JSON Formatting Practice
      </h1>

      <div className="space-y-6">
        <p>
          Most people searching for a JSON playground want one of three things: a fast place to validate and beautify
          raw JSON, a way to practice <code>JSON.parse()</code> and <code>JSON.stringify()</code>, or a shareable demo
          where JSON feeds a real UI. Those are different jobs, and the best tool changes with the job. If your input
          is just JSON text, a dedicated formatter or validator is usually faster than a full coding sandbox. Move to a
          broader playground only when you need JavaScript, npm packages, or a reproducible example for somebody else.
        </p>

        <p>
          That distinction matters because search visitors often land on an article like this expecting a list of
          playgrounds, but the real win is choosing the lightest tool that still gives you immediate, accurate
          feedback.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb /> Choose the Right Playground First
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Dedicated JSON formatter</h3>
            <p className="text-sm">
              Best for raw payloads. You want line-level syntax errors, pretty-print, minify, tree views, and quick
              copy-paste work without the overhead of a full app sandbox.
            </p>
          </div>
          <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Browser DevTools console</h3>
            <p className="text-sm">
              Best for practicing <code>JSON.parse()</code>, <code>JSON.stringify()</code>, replacers, revivers, and
              quick inspection of real API responses that are already open in the browser.
            </p>
          </div>
          <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">General code sandbox</h3>
            <p className="text-sm">
              Best when JSON is only part of the task, such as rendering a UI, testing fetch logic, or sharing a
              minimal repro that needs JavaScript, frameworks, or npm packages.
            </p>
          </div>
        </div>

        <p>
          In practice, this usually means using a JSON-specific formatter for raw data, then switching to a playground
          like CodePen or StackBlitz only if you need live code around that JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks /> What a Good JSON Playground Should Do Immediately
        </h2>
        <p>
          A useful playground for JSON formatting practice should shorten the feedback loop to seconds. Look for these
          basics:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Precise parse errors:</strong> line and column details beat generic "invalid JSON" messages.
          </li>
          <li>
            <strong>Pretty-print and minify:</strong> you should be able to bounce between readable and compact forms
            without losing data.
          </li>
          <li>
            <strong>Visual structure help:</strong> syntax highlighting, folding, or a tree view make nested payloads
            much easier to inspect.
          </li>
          <li>
            <strong>Fast reset and retry:</strong> practice works best when breaking and fixing examples is frictionless.
          </li>
          <li>
            <strong>Safe sharing:</strong> if you are collaborating, a shareable link is useful, but avoid public
            playgrounds for sensitive payloads.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Play /> Practice with Real JavaScript, Not Just Static JSON
        </h2>
        <p>
          The fastest way to improve is to pair a formatter with a tiny JavaScript snippet. That shows the difference
          between valid JSON text and JavaScript values that only look similar.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`const raw = '{"user":"Ada","roles":["admin","editor"]}';

const parsed = JSON.parse(raw);
console.log(parsed.roles[0]);

console.log(JSON.stringify(parsed, null, 2));`}
          </pre>
        </div>
        <p>
          After that works, deliberately break the input. Replace double quotes with single quotes, remove a comma, add
          a trailing comma, or paste in a <code>// comment</code>. A good playground should fail fast and show you
          exactly where the JSON stopped being JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Columns2 /> JSON vs. JavaScript Object Literals
        </h2>
        <p>
          This is the mistake that trips people up most often in playgrounds: JavaScript object literals are more
          permissive than JSON text.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-1">
              <CheckCheck className="text-green-600" /> Valid JSON
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <pre className="overflow-x-auto">
                {`{
  "user": {
    "id": 42,
    "name": "Ada"
  },
  "roles": ["admin", "editor"],
  "active": true
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-1">
              <X className="text-red-600" /> Valid JavaScript, Invalid JSON
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <pre className="overflow-x-auto">
                {`{
  user: {
    id: 42,
    name: 'Ada',
  },
  roles: ["admin", "editor",],
  active: true,
}`}
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <em>
                  Unquoted keys, single quotes, and trailing commas are common in JavaScript, but they are not valid
                  JSON.
                </em>
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info /> Current JSON.stringify Behaviors Worth Practicing
        </h2>
        <p>
          MDN&apos;s current <code>JSON.stringify()</code> reference is still the best short checklist for real-world
          practice, because serializer behavior surprises people even after they learn the syntax rules.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`const payload = {
  user: "Ada",
  skipped: undefined,
  ids: [1, undefined, 3]
};

console.log(JSON.stringify(payload, null, 2));`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Object properties with</strong> <code>undefined</code>, functions, or symbols are omitted.
          </li>
          <li>
            <strong>Array entries with unsupported values</strong> become <code>null</code>.
          </li>
          <li>
            <strong>Circular references and</strong> <code>BigInt</code> <strong>throw</strong>, which is easy to miss
            until a playground lets you test it directly.
          </li>
          <li>
            <strong>The indentation argument is capped:</strong> the <code>space</code> parameter uses at most 10
            spaces or 10 characters.
          </li>
        </ul>
        <p>
          Reference:{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 underline underline-offset-2 dark:text-sky-400"
          >
            MDN JSON.stringify()
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <X /> Mistakes a Playground Should Catch Fast
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Comments and trailing commas:</strong> allowed in some JavaScript contexts, invalid in strict JSON.
          </li>
          <li>
            <strong>Single quotes and unquoted keys:</strong> common when copying object literals into a JSON tool.
          </li>
          <li>
            <strong>JavaScript-only values:</strong> <code>undefined</code>, <code>NaN</code>, and{" "}
            <code>Infinity</code> are not valid JSON text.
          </li>
          <li>
            <strong>Mismatched braces or missing commas:</strong> the classic reason a minified payload becomes painful
            to debug by eye.
          </li>
          <li>
            <strong>Smart quotes from docs or chat tools:</strong> pasted curly quotes can look right and still fail.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info /> Current Tool Notes That Actually Matter
        </h2>
        <p>
          If you are comparing general playgrounds instead of pure JSON formatters, the current platform details matter
          more than feature checklists.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>CodePen</strong> is useful for quick frontend demos, and its current docs explain that npm package
            support is handled through generated import maps and package metadata backed by <code>esm.sh</code>.
          </li>
          <li>
            <strong>StackBlitz</strong> is better when you need a fuller project with npm and Node-style workflows, but
            its current browser support docs still favor recent Chromium desktop browsers, with Firefox and Safari in
            beta and tighter limitations on mobile devices.
          </li>
          <li>
            <strong>Browser DevTools</strong> remain the fastest zero-setup playground for practicing parsing and
            formatting behavior against real responses you already have open.
          </li>
        </ul>
        <p>
          References:{" "}
          <a
            href="https://blog.codepen.io/documentation/packages/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 underline underline-offset-2 dark:text-sky-400"
          >
            CodePen Packages
          </a>
          {" | "}
          <a
            href="https://developer.stackblitz.com/platform/webcontainers/browser-support"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 underline underline-offset-2 dark:text-sky-400"
          >
            StackBlitz browser support
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Play /> A Practice Routine That Builds Real Skill
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Start with a minified but valid payload and beautify it so you can read the structure.
          </li>
          <li>
            Break one rule at a time: remove a comma, change quotes, add a comment, or unquote a key.
          </li>
          <li>
            Paste the same payload into JavaScript and compare what <code>JSON.parse()</code> accepts versus what a JS
            object literal accepts.
          </li>
          <li>
            Practice with a real API response, then remove secrets before sharing anything publicly.
          </li>
          <li>
            Once syntax is clean, move on to schema validation, querying, or diffing only if your work actually needs
            those steps.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck /> When an Offline Formatter Is the Better Playground
        </h2>
        <p>
          Public playgrounds are fine for sample data, tutorials, and reproducible bugs. They are a poor default for
          customer exports, tokens, internal logs, or anything covered by security or compliance rules. They are also
          not ideal for very large payloads that can freeze a tab before you learn anything useful. In those cases, use
          a local or offline formatter first, then move to a browser playground only when you need live code around the
          JSON.
        </p>

        <p>
          The practical takeaway is simple: for JSON formatting practice, the best playground is often the smallest
          possible one. Use a dedicated formatter to learn the syntax, use DevTools to learn serializer behavior, and
          use CodePen or StackBlitz only when your exercise genuinely needs an application around the JSON.
        </p>
      </div>
    </>
  );
}
