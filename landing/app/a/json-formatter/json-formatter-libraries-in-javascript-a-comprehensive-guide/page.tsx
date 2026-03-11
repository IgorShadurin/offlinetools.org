import type { Metadata } from "next";
import { AlertTriangle, CheckCircle, Code, FileText, Layers, ListOrdered, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter Libraries in JavaScript: A Comprehensive Guide | Offline Tools",
  description:
    "Compare JSON.stringify(), stable serializers, circular-safe stringifiers, and UI JSON viewers in modern JavaScript so you can choose the right formatter for your use case.",
};

const libraryOptions = [
  {
    name: "JSON.stringify()",
    bestFor: "Pretty-printing parsed JSON in scripts, APIs, CLIs, and simple debugging views.",
    strengths: "Built in, zero dependencies, supports replacer and space arguments.",
    caveats: "Throws on circular references and BigInt values, does not give you stable key ordering, and turns Map/Set into plain objects unless you transform them first.",
  },
  {
    name: "fast-json-stable-stringify",
    bestFor: "Deterministic output for cache keys, snapshot tests, hashing, signing, and object comparison.",
    strengths: "Stable key ordering and custom key comparison without writing your own sorter.",
    caveats: "This is about canonical output, not an interactive viewer. It is most useful when identical data must serialize the same way every time.",
  },
  {
    name: "fast-safe-stringify",
    bestFor: "Logging or debugging objects that may contain circular references.",
    strengths: "API is close to JSON.stringify() and it can replace cycles with [Circular] instead of throwing.",
    caveats: "Useful for logs, but it is still a serializer, not a tree viewer. Its stable variant also trades off some replacer behavior to stay safe.",
  },
  {
    name: "json-formatter-js",
    bestFor: "Vanilla browser apps that need a collapsible HTML tree view for JSON objects.",
    strengths: "Renders expandable JSON in the DOM, supports open-depth control, sorting, hover previews, and array grouping.",
    caveats: "It expects an object or array, not a raw JSON string. Parse the input first and handle syntax errors separately.",
  },
  {
    name: "@uiw/react-json-view",
    bestFor: "React apps that need themed, interactive JSON display or inline editing.",
    strengths: "Built for React, ships multiple themes, supports editor mode, customization hooks, and richer rendering for values such as URLs.",
    caveats: "Heavier than plain text formatting, so it is best for user-facing inspection tools rather than routine server-side serialization.",
  },
];

const quickChoiceItems = [
  "Use JSON.stringify(value, null, 2) when you only need readable output.",
  "Use fast-json-stable-stringify when the same object must always serialize to the same string.",
  "Use fast-safe-stringify when cycles would otherwise crash your logs.",
  "Use json-formatter-js or @uiw/react-json-view when humans need to browse large nested objects.",
];

export default function JsonFormatterLibrariesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-8 h-8" /> JSON Formatter Libraries in JavaScript: A Comprehensive Guide
      </h1>

      <div className="space-y-6">
        <p>
          Most JavaScript projects do not need a generic JSON formatter library. They need one of four specific things:
          readable pretty-printing, deterministic key order, safe serialization of circular data, or an interactive tree
          view for people. The best choice depends on which problem you actually have.
        </p>
        <p>
          For many cases, the built-in <code>JSON.stringify()</code> is still the right answer. Reach for a library only
          when you need behavior that the platform does not give you cleanly, such as stable output for hashing,
          circular-safe logging, collapsible inspection, or React-friendly editing.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5" /> Quick Answer
          </h2>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            {quickChoiceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> What The Built-In Still Does Well
        </h2>
        <p>
          <code>JSON.stringify()</code> remains the default formatter for JavaScript because it is fast enough for most
          apps, universally available, and already gives you indentation through the <code>space</code> argument.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Pretty-printing with the built-in serializer</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const payload = {
  user: "alice",
  roles: ["admin", "editor"],
  settings: { darkMode: true, locale: "en-US" },
};

const pretty = JSON.stringify(payload, null, 2);

console.log(pretty);
/*
{
  "user": "alice",
  "roles": [
    "admin",
    "editor"
  ],
  "settings": {
    "darkMode": true,
    "locale": "en-US"
  }
}
*/`}
          </pre>
        </div>
        <p>
          It is also worth knowing the real limits. Current MDN documentation notes that <code>JSON.stringify()</code>{" "}
          throws on circular references and <code>BigInt</code> values, clamps indentation to 10 characters, and omits{" "}
          <code>undefined</code>, functions, and symbols from object output. Those details matter when you are building
          a formatter into a production tool instead of a quick demo.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use the built-in method for API payload inspection, CLI output, fixtures, and simple pretty-print buttons.
          </li>
          <li>
            Do not use it when object key order must be deterministic across logically equivalent objects.
          </li>
          <li>
            Do not rely on it for invalid JSON input. Parsing and error reporting are separate concerns.
          </li>
          <li>
            Modern docs also mention <code>JSON.rawJSON()</code>, but you should still verify runtime support before
            making it part of shipped application behavior.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers className="w-6 h-6" /> Libraries Worth Knowing
        </h2>
        <p>
          The most useful way to think about JavaScript JSON formatter libraries is by job category. Some are
          serializers, some are stable stringifiers, and some are visual inspectors. Mixing those categories leads to
          bad tool choices.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 font-semibold">Option</th>
                <th className="text-left p-3 font-semibold">Best For</th>
                <th className="text-left p-3 font-semibold">Strengths</th>
                <th className="text-left p-3 font-semibold">Watch Outs</th>
              </tr>
            </thead>
            <tbody>
              {libraryOptions.map((option) => (
                <tr key={option.name} className="border-t border-gray-200 dark:border-gray-700 align-top">
                  <td className="p-3 font-medium">{option.name}</td>
                  <td className="p-3">{option.bestFor}</td>
                  <td className="p-3">{option.strengths}</td>
                  <td className="p-3">{option.caveats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListOrdered className="w-6 h-6" /> Practical Examples
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Stable output for tests, signatures, or cache keys</h3>
        <p>
          If two objects contain the same data but their keys were inserted in different orders, plain{" "}
          <code>JSON.stringify()</code> can produce different strings. A stable serializer fixes that.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`import stringify from "fast-json-stable-stringify";

const filtersA = { sort: "date", page: 1 };
const filtersB = { page: 1, sort: "date" };

const keyA = stringify(filtersA);
const keyB = stringify(filtersB);

console.log(keyA === keyB); // true`}
          </pre>
        </div>
        <p>
          This category is about deterministic serialization, not prettier visuals. It is ideal when output must stay
          canonical across runs.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Safe logging when objects may contain cycles</h3>
        <p>
          Debugging data from frameworks, request objects, or state graphs often hits circular references. The built-in
          serializer throws immediately; a safe stringifier lets the log survive.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`import safeStringify from "fast-safe-stringify";

const requestContext = { route: "/api/users" };
requestContext.self = requestContext;

console.log(safeStringify(requestContext, null, 2));
/*
{
  "route": "/api/users",
  "self": "[Circular]"
}
*/`}
          </pre>
        </div>
        <p>
          This is usually the right choice for logging pipelines, crash reports, or developer tooling where losing the
          entire output would be worse than marking the cycle.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. A collapsible viewer in the browser without React</h3>
        <p>
          If users need to explore nested JSON in the browser, plain text formatting stops being enough. A tree viewer
          gives you collapsing, previews, and better scanning.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`import JSONFormatter from "json-formatter-js";

const raw = '{"user":{"name":"Alice","roles":["admin","editor"]}}';
const parsed = JSON.parse(raw);
const formatter = new JSONFormatter(parsed, 1, {
  hoverPreviewEnabled: true,
  maxArrayItems: 100,
});

document.getElementById("output")?.appendChild(formatter.render());`}
          </pre>
        </div>
        <p>
          Notice the parse step. Viewer libraries like this operate on JavaScript data structures, so invalid JSON still
          needs separate parse-error handling.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. A React JSON inspector for dashboards and internal tools</h3>
        <p>
          In React projects, a dedicated component saves time because theming, collapse state, inline editing, and
          custom rendering are already solved.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";

export function DebugPanel({ value }: { value: unknown }) {
  return (
    <JsonView
      value={value}
      collapsed={1}
      displayObjectSize={false}
      style={githubLightTheme}
    />
  );
}`}
          </pre>
        </div>
        <p>
          This kind of component is a better fit for admin tools, request inspectors, and debugging panes than building
          a formatter from scratch around <code>&lt;pre&gt;</code> tags.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" /> Common Mistakes And Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            A formatter library usually does not validate broken JSON text. If users paste invalid input, you still need
            <code>JSON.parse()</code> error handling or a richer code editor.
          </li>
          <li>
            Pretty-printing and deterministic output are different goals. Readable indentation does not guarantee stable
            key order.
          </li>
          <li>
            Very large payloads are often a rendering problem, not a stringification problem. Collapsed trees and lazy
            inspection matter more than adding more whitespace.
          </li>
          <li>
            If you only need a deep copy, do not use JSON formatting as a cloning strategy. <code>structuredClone()</code>{" "}
            is usually the better fit for JSON-like data.
          </li>
          <li>
            Non-JSON values such as <code>Map</code>, <code>Set</code>, functions, and symbols need explicit
            transformation if you want meaningful output.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Bottom Line
        </h2>
        <p>
          Start with <code>JSON.stringify()</code>. It is still the correct answer for ordinary pretty-printing in both
          browsers and Node.js.
        </p>
        <p>
          Add a library only when the requirement is specific: stable output with{" "}
          <code>fast-json-stable-stringify</code>, cycle-safe logging with <code>fast-safe-stringify</code>, a DOM tree
          with <code>json-formatter-js</code>, or a React inspector with <code>@uiw/react-json-view</code>. Once you
          choose by use case instead of by package popularity, the decision gets much simpler.
        </p>
      </div>
    </>
  );
}
