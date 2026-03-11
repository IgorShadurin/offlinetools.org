import type { Metadata } from "next";
import {
  Bug,
  ClipboardList,
  Code,
  Copy,
  Eye,
  FileJson,
  Hammer,
  Info,
  LayoutPanelLeft,
  ListChecks,
  Package,
  Plug,
  Settings,
  Watch,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Studio Code JSON Debugger Extensions and Tools | Offline Tools",
  description:
    "A current guide to debugging JSON in Visual Studio Code, including built-in debugger features, JSONC and launch.json caveats, useful extensions, and practical troubleshooting.",
};

export default function VsCodeJsonDebuggerArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3 h-8 w-8 text-red-500" />
        Visual Studio Code JSON Debugger Extensions and Tools
      </h1>

      <div className="space-y-6">
        <p>
          Most people searching for a Visual Studio Code JSON debugger are really trying to solve one of three
          problems: inspect JSON returned by running code, fix a broken JSON-based config file such as{" "}
          <code>launch.json</code>, or test an API payload without leaving the editor. VS Code handles all three well,
          but not through a single dedicated &quot;JSON debugger&quot; extension.
        </p>
        <p>
          The practical setup in 2026 is usually smaller than people expect: use VS Code&apos;s built-in JSON language
          features for files, use your runtime debugger to inspect parsed objects and raw JSON strings, and add one
          HTTP/testing extension only if you need to reproduce requests outside the app. That is faster and cleaner
          than installing several overlapping JSON viewers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="mr-2 h-6 w-6 text-blue-500" />
          What JSON Debugging Means In VS Code
        </h2>
        <p>Separate JSON work into these cases first, because VS Code treats them differently:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Strict JSON files:</strong> Regular <code>.json</code> files get built-in formatting, folding,
            IntelliSense, hovers, and schema-based validation.
          </li>
          <li>
            <strong>VS Code config files:</strong> Files such as <code>settings.json</code>, <code>tasks.json</code>,
            and <code>launch.json</code> use <code>jsonc</code>, which allows comments and trailing commas. That is
            convenient inside VS Code, but it is not the same as strict JSON accepted by most APIs.
          </li>
          <li>
            <strong>Runtime JSON data:</strong> When your code pauses on a breakpoint, JSON is inspected as an object,
            array, or string in VARIABLES, WATCH, hover tooltips, or the Debug Console. That is where most real JSON
            debugging happens.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Info className="mr-2 h-5 w-5 text-blue-500" />
            Important Distinction
          </h3>
          <p>
            VS Code does not have one universal Microsoft JSON debugger that you install separately. For JavaScript,
            TypeScript, and Node.js, debugging support is built in. For Python, Go, Java, C#, and other runtimes, you
            normally install that runtime&apos;s debugger extension and inspect JSON through it.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LayoutPanelLeft className="mr-2 h-6 w-6 text-green-500" />
          Built-In Features That Matter Most
        </h2>
        <p>
          Before adding extensions, make sure you are using the core editor and debugger features properly. For many
          teams, the built-in stack is already enough.
        </p>

        <h3 className="text-xl font-semibold mt-6">JSON File Editing And Validation</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Format Document:</strong> The fastest first step when a payload is unreadable or a bracket mismatch
            is hiding in plain sight.
          </li>
          <li>
            <strong>Schema-aware validation:</strong> Use <code>$schema</code> or <code>json.schemas</code> mapping for
            custom files so VS Code can show completion, hover docs, and validation errors.
          </li>
          <li>
            <strong>Folding and structure:</strong> Large objects and arrays are easier to scan when you collapse
            branches instead of reading raw text top to bottom.
          </li>
          <li>
            <strong>JSONC awareness:</strong> Comments in <code>launch.json</code> or <code>settings.json</code> are
            valid there, but the same content will fail if you paste it into a strict JSON parser or API request body.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Inspecting JSON During A Debug Session</h3>
        <p>When execution pauses, the Run and Debug view is where JSON becomes readable again:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>VARIABLES:</strong> Expand parsed objects and arrays node by node instead of logging the entire
            payload repeatedly.
          </li>
          <li>
            <strong>WATCH:</strong> Add the one or two nested properties you actually care about, such as
            {" "}
            <code>response.data.user.id</code> or <code>payload.errors[0]</code>.
          </li>
          <li>
            <strong>Copy Value and Copy as Expression:</strong> Useful when a payload is too large for comfortable tree
            browsing.
          </li>
          <li>
            <strong>Variable filtering:</strong> If the object is huge, filter the VARIABLES view by property name or
            value instead of manually expanding every branch.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Watch className="mr-2 h-6 w-6 text-purple-500" />
          Using Watch And The Debug Console Well
        </h3>
        <p>The Debug Console is still the fastest place to reshape JSON while you investigate a bug.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Evaluate raw expressions:</strong> The console understands the active debugger context, so you can
            inspect exactly the branch that looks suspicious.
          </li>
          <li>
            <strong>Use multi-line evaluation:</strong> VS Code supports <code>Shift+Enter</code> for multi-line input
            in the Debug Console, which is useful for quick parsing or formatting expressions.
          </li>
          <li>
            <strong>Pretty-print raw JSON strings:</strong> If the variable is a string and not yet parsed, format it
            directly in the console:
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-js">{`JSON.stringify(JSON.parse(rawJson), null, 2)`}</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Normalize uncertain payloads:</strong> If a value is parsed in some code paths but still a string in
            others, handle both cases:
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-js">{`const normalized =
  typeof payload === "string" ? JSON.parse(payload) : payload;

JSON.stringify(normalized, null, 2)`}</code>
              </pre>
            </div>
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Copy className="mr-2 h-5 w-5 text-blue-500" />
            Tip: Copy Out Large Payloads Early
          </h4>
          <p>
            If the debugger truncates a large response or the tree view is slow, copy the value into a scratch{" "}
            <code>.json</code> file or a formatter so you can search, fold, diff, and isolate the broken branch
            faster.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-2 h-6 w-6 text-orange-500" />
          The Most Useful Extensions And Tools
        </h2>
        <p>
          If you install tools deliberately instead of collecting every JSON helper in the Marketplace, you get a
          cleaner workflow and fewer overlapping commands.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Wrench className="mr-2 h-6 w-6 text-red-400" />
          1. Your Runtime Debugger
        </h3>
        <p>
          This is the real debugger extension category that matters. VS Code already includes debugging support for
          JavaScript, TypeScript, and Node.js. For Python, Go, Java, C#, PHP, Ruby, and others, install the debugger
          for that runtime and inspect JSON through its VARIABLES, WATCH, and console integration.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Best for:</strong> Breakpoints inside the code that receives, parses, mutates, or serializes JSON.
          </li>
          <li>
            <strong>Not for:</strong> Editing standalone JSON documents. Built-in JSON support already covers that well.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Plug className="mr-2 h-6 w-6 text-yellow-500" />
          2. REST Client For Reproducible API Payloads
        </h3>
        <p>
          If your bug starts with an API response, a dedicated HTTP tool inside VS Code is more useful than a generic
          JSON viewer. REST Client remains a strong option because it lets you send requests from <code>.http</code>{" "}
          or <code>.rest</code> files, inspect syntax-highlighted responses, keep multiple requests in one file, and
          preview the response in an untitled document when you want normal editor search and selection behavior.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Best for:</strong> Reproducing the failing request outside your app before you attach a debugger.
          </li>
          <li>
            <strong>Useful detail:</strong> You can keep several related requests in a single file separated by{" "}
            <code>###</code>, which is excellent for regression checks.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Eye className="mr-2 h-5 w-5 text-blue-400" />
            Example <code>.http</code> File
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              <code className="language-http">{`### Reproduce the endpoint before debugging app code
GET https://api.example.com/users/42
Accept: application/json
Authorization: Bearer {{token}}`}</code>
            </pre>
          </div>
        </div>

        <h4 className="text-lg font-medium mt-4 flex items-center">
          <ListChecks className="mr-2 h-5 w-5 text-green-400" />
          3. Schema Support For Configuration Debugging
        </h4>
        <p>
          Many people install extra schema extensions when VS Code already has solid built-in support. If a config file
          is your problem, start with schema mapping before you add more tooling.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Map a schema with <code>$schema</code> or <code>json.schemas</code> for custom files.</li>
          <li>Use hover text and completion to spot wrong enum values or missing properties quickly.</li>
          <li>
            If validation suddenly disappears, check whether the schema is remote and unavailable in your current
            environment.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-indigo-500" />
          Practical Debugging Tips With JSON
        </h2>
        <p>These workflows save the most time when JSON is involved in a real bug investigation.</p>

        <h3 className="text-xl font-semibold mt-6">When An API Response Looks Wrong</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Reproduce the request in a <code>.http</code> file first so you know whether the backend or the app layer
            is responsible.
          </li>
          <li>
            Set a breakpoint immediately after the response is received and again after any normalization or mapping
            step. Many &quot;JSON bugs&quot; are actually transformation bugs.
          </li>
          <li>
            Put only the properties you care about into WATCH so you can see them change while stepping through code.
          </li>
          <li>
            Add a logpoint if the payload is repeated in a loop and you want signal without stopping execution:
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                <code className="language-js">{`item {{JSON.stringify(item)}}`}</code>
              </pre>
            </div>
          </li>
          <li>
            If your debugger supports it, use a data breakpoint when a value changes unexpectedly after parsing.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          When <code>launch.json</code> Or Another Config File Breaks
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Remember that <code>launch.json</code> is <code>jsonc</code>, not strict JSON. Comments are allowed there.
          </li>
          <li>
            Format the file first, then look for schema warnings and hover documentation before editing random keys.
          </li>
          <li>
            If you copied a snippet from an API document or another tool, remove comments and trailing commas if the
            destination expects strict JSON.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">When A Payload Is Too Large To Read Comfortably</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Copy the value out of the debugger instead of expanding dozens of nested nodes manually.</li>
          <li>Pretty-print the string in the Debug Console if the value is still serialized JSON.</li>
          <li>Move it into a formatter or temporary JSON file so you can search, fold, and compare versions safely.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Hammer className="mr-2 h-6 w-6 text-gray-500" />
          Common Problems And Fixes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>The JSON looks valid in VS Code but fails in an API or script:</strong> You probably copied
            {" "}
            <code>jsonc</code> content with comments or trailing commas into a strict JSON context.
          </li>
          <li>
            <strong>The response is one unreadable line:</strong> Pretty-print the string in the Debug Console with{" "}
            <code>JSON.stringify(JSON.parse(value), null, 2)</code>.
          </li>
          <li>
            <strong>The VARIABLES tree is painful to navigate:</strong> filter it, copy the value out, or watch only
            the specific nested fields that matter.
          </li>
          <li>
            <strong>Logpoints or data breakpoints are missing:</strong> those features depend on the debugger
            extension; not every runtime implements them.
          </li>
          <li>
            <strong>Schema validation vanished:</strong> the schema may be remote and unavailable, or schema download
            may be disabled in your environment.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 h-6 w-6 text-pink-500" />
          Compatibility Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            VS Code&apos;s built-in JSON language support covers JSON Schema draft 4 through draft 7 well, with more
            limited support for 2019-09 and 2020-12 features. If a schema keyword seems ignored, check the draft level
            before blaming the payload.
          </li>
          <li>
            Remote schemas are convenient, but they are not guaranteed to be available in every environment. If a team
            works offline often, local schema mapping is more dependable.
          </li>
          <li>
            For JavaScript, TypeScript, and Node.js, the debugger is built in. For most other runtimes, the debugger
            experience depends on the language extension you install.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 h-6 w-6 text-cyan-500" />
          Bottom Line
        </h2>
        <p>
          The best Visual Studio Code JSON debugging stack is usually small: built-in JSON editing and schema support,
          the debugger for your actual runtime, and one request tool such as REST Client when you need to reproduce API
          responses outside the app. If you keep the strict JSON versus <code>jsonc</code> distinction in mind and use
          the Debug Console aggressively, you can solve most JSON issues without adding much tooling at all.
        </p>
      </div>
    </>
  );
}
