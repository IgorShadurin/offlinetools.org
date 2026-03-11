import type { Metadata } from "next";
import {
  Binary,
  Bolt,
  ClipboardCheck,
  Code,
  Construction,
  FileText,
  FlaskConical,
  Gauge,
  LayoutGrid,
  Layers,
  List,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Precompiled Templates for JSON Rendering Performance | Offline Tools",
  description:
    "Learn when precompiled templates actually improve JSON rendering performance, where they do not, and how current Handlebars and EJS workflows fit in.",
};

export default function PrecompiledJsonTemplatesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Zap className="w-8 h-8" /> Precompiled Templates for JSON Rendering Performance
      </h1>

      <div className="space-y-6">
        <p>
          Precompiling turns a JSON-to-HTML template into a JavaScript render function during build time instead of
          parsing template syntax during the request or browser render. That still matters when the same JSON shape is
          rendered repeatedly, such as server-side HTML fragments, transactional emails, reports, dashboards, and large
          lists with stable markup.
        </p>

        <p>
          It is not a blanket performance fix. Precompilation removes template parsing and compilation from the hot
          path, but it does not eliminate `JSON.parse`, DOM insertion, layout, paint, hydration, or the cost of
          rendering thousands of nodes that should have been paginated or virtualized.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Bolt className="w-5 h-5" /> Quick Answer
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use precompiled templates when one template renders many times with different JSON data.</li>
            <li>Expect the biggest wins in SSR, email generation, edge rendering, and repeated partials.</li>
            <li>
              If your app already uses React, Vue, or Svelte, the main bottleneck is often DOM and hydration work, not
              template parsing.
            </li>
            <li>Measure parse time, render time, and DOM update time separately before claiming a win.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileText className="w-6 h-6" /> What Precompiled Rendering Actually Removes
        </h2>
        <p>
          The expensive step you are avoiding is repeated template compilation. Instead of reading a template string,
          parsing helpers and control flow, generating executable code, and then rendering, the build step produces the
          executable function once.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Binary className="w-5 h-5" /> Runtime Compilation on the Hot Path
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`const source = "&lt;li&gt;{{name}}: {{value}}&lt;/li&gt;";

// Avoid doing this inside request handlers or repeated UI updates
const template = Handlebars.compile(source);
const html = data.items.map((item) => template(item)).join("");
list.innerHTML = html;`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> Build Once, Render Many Times
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// Build step emits a render function ahead of time
import renderRow from "./row.precompiled.js";

const html = data.items.map((item) => renderRow(item)).join("");
list.innerHTML = html;`}
            </pre>
          </div>
        </div>

        <p>
          In current official docs, Handlebars still recommends precompilation because it saves client-side compile
          time and lets you ship the smaller runtime-only build. EJS likewise still supports compiling reusable client
          functions and caching compiled templates instead of reparsing the same template source repeatedly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Rocket className="w-6 h-6" /> Where Precompiled Templates Help Most
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <RefreshCw className="inline-block mr-2" /> <strong>Repeated renders of the same shape:</strong> Stable
            item cards, table rows, report sections, or email bodies are ideal because the engine does less work each
            time new JSON arrives.
          </li>
          <li>
            <Layers className="inline-block mr-2" /> <strong>Server-side rendering:</strong> CPU time saved on every
            request matters more when one worker renders the same template for many users.
          </li>
          <li>
            <Gauge className="inline-block mr-2" /> <strong>Edge and serverless paths:</strong> Smaller runtime code
            and less repeated compilation reduce wasted work in short-lived execution environments.
          </li>
          <li>
            <ClipboardCheck className="inline-block mr-2" /> <strong>Build-time validation:</strong> Template syntax
            errors fail earlier, before traffic hits the broken path.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Construction className="w-6 h-6" /> Where It Helps Less Than People Expect
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            One render per page load. If a template is compiled once and rendered once, the savings may be too small to
            matter.
          </li>
          <li>
            Huge DOM commits. Precompiled HTML strings do not make inserting 20,000 rows cheap; layout and paint still
            dominate.
          </li>
          <li>
            Reactive component apps. Modern UI frameworks already compile templates or components ahead of time, so
            template parsing is often not the main bottleneck anymore.
          </li>
          <li>
            Rapidly changing template structure. If the markup itself is user-defined or frequently edited at runtime,
            a compile-once pipeline is less useful.
          </li>
        </ul>
        <p>
          This is one reason current Handlebars docs position it as a pure rendering layer rather than a full reactive
          UI system. Precompilation helps string generation. It does not replace incremental DOM updates, event
          handling, or list virtualization.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6" /> Current Implementation Patterns
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> Handlebars
          </h3>
          <p>
            Handlebars still has a straightforward precompiler workflow. The practical win is that the browser can load
            the smaller runtime-only bundle instead of the full compiler, and precompiled functions skip compilation
            work on the client.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto my-3">
            <pre className="text-sm">
              {`handlebars row.handlebars -f row.precompiled.js -k each -k if --knownOnly`}
            </pre>
          </div>
          <p>
            If every helper is known at build time, Handlebars documents `--knownOnly` as producing the smallest and
            fastest generated output. Keep the precompiler and runtime versions aligned so generated code matches the
            runtime you ship.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Code className="w-5 h-5" /> EJS
          </h3>
          <p>
            EJS takes a more JavaScript-heavy approach. Its current docs still expose `client: true` for emitting a
            browser-usable function, and `cache: true` for reusing compiled functions when you render the same template
            many times.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto my-3">
            <pre className="text-sm">
              {`const render = ejs.compile(templateString, {
  client: true,
  compileDebug: false,
  _with: false,
  strict: true,
});

const html = render({ items }, escapeFn);`}
            </pre>
          </div>
          <p>
            Use EJS only when you intentionally want JavaScript inside templates. It is flexible, but the same power
            makes it a poor choice for untrusted template input.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FlaskConical className="w-6 h-6" /> Benchmark the Right Stages
        </h2>
        <p>
          A useful benchmark separates the stages that developers often blur together under "rendering performance."
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Measure JSON parsing or deserialization time.</li>
          <li>Measure template execution time with a warmed cache.</li>
          <li>Measure HTML insertion or DOM construction time separately.</li>
          <li>Measure layout and paint after the nodes land in the document.</li>
          <li>Repeat in production mode, not development mode.</li>
        </ol>
        <p>
          If template execution is only 5 percent of the total, precompilation will not rescue the page. If execution
          time dominates because the same template runs thousands of times, it usually will.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6" /> Security and Correctness Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Keep auto-escaping on by default when JSON values can contain user-generated strings.</li>
          <li>Do not confuse precompiled output with sanitized output; escaping still matters.</li>
          <li>Do not compile or execute untrusted EJS templates, because template code can run JavaScript.</li>
          <li>Cache compiled functions by template identity, not by request, to avoid silent recompilation.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <List className="w-6 h-6" /> Common Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Benchmarking the first cold render only and ignoring steady-state throughput.</li>
          <li>Recompiling the template inside a loop or request handler.</li>
          <li>Assuming faster HTML string generation also means faster browser painting.</li>
          <li>Skipping pagination or windowing for large JSON arrays because the template got faster.</li>
          <li>Using a full JS template engine when a simpler escaped string template would be safer and cheaper.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutGrid className="w-6 h-6" /> Bottom Line
        </h2>
        <p>
          Precompiled templates are still a solid optimization for JSON rendering performance when the same markup shape
          is rendered repeatedly and template compilation would otherwise sit on the hot path. They are most valuable in
          SSR, email generation, reports, and repeated partial rendering. They are much less magical when the real cost
          is DOM size, hydration, or poor list rendering strategy.
        </p>
        <p>
          The practical rule is simple: precompile if you render often, cache aggressively, escape by default, and
          benchmark beyond the template engine itself.
        </p>
      </div>
    </>
  );
}
