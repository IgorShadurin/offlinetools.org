import type { Metadata } from "next";
import {
  Bug,
  Code,
  Search,
  Info,
  CheckCheck,
  Columns,
  MessageCircleQuestion,
  SquareFunction,
  Files,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "IntelliJ IDEA JSON Formatter: Format Files and Debug JSON Strings",
  description:
    "Learn how to format a JSON file in IntelliJ IDEA, troubleshoot formatter issues, validate with schemas, and inspect JSON strings while debugging.",
};

export default function IntellijJsonDebuggingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3 h-8 w-8 text-red-500" />
        IntelliJ IDEA JSON Formatter and Debugging Capabilities
      </h1>

      <div className="space-y-6">
        <p>
          If you searched for how to format JSON in IntelliJ IDEA, the short answer is simple: open the{" "}
          <code>.json</code> file and run <code>Code &gt; Reformat Code</code>. IntelliJ&apos;s built-in formatter
          handles indentation, spacing, wrapping, folding, schema-aware validation, and large-file navigation well for
          valid JSON.
        </p>
        <p>
          Where IntelliJ becomes more useful than a basic pretty-printer is the rest of the workflow: it flags invalid
          JSON while you type, can validate files against JSON Schema, supports JSON5, lets you test JSONPath queries,
          and can show JSON strings in a structured debugger view when you stop at a breakpoint.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-2 h-6 w-6 text-green-500" />
          Quick Answer: How To Format a JSON File in IntelliJ IDEA
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open the JSON file in the editor.</li>
          <li>
            Run <code>Code &gt; Reformat Code</code>.
          </li>
          <li>
            If you only want part of the file formatted, select that block first and then run reformat.
          </li>
          <li>
            If you want formatting applied automatically, enable <code>Tools &gt; Actions on Save</code> and turn on
            reformat for the file types you care about.
          </li>
        </ol>
        <p>
          IntelliJ formats JSON using the current code style rules, including relevant <code>.editorconfig</code>{" "}
          settings when present. If the formatter does not change anything, the most common reason is that the file is
          already compliant with the active style rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-500" />
          What IntelliJ&apos;s JSON Formatter Actually Helps With
        </h2>
        <p>
          For searchers looking for an IntelliJ JSON formatter, the built-in formatter is usually enough for everyday
          work: cleaning up API fixtures, normalizing config files, or re-indenting pasted payloads. You do not need a
          plugin for standard JSON formatting.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Pretty-print a minified JSON file so nested objects and arrays become readable.</li>
          <li>Format only the current selection when you want to leave surrounding text untouched.</li>
          <li>Reformat on save if you want JSON files normalized automatically during edits.</li>
          <li>
            Keep style consistent across a project by combining IntelliJ&apos;s formatter with shared code-style or{" "}
            <code>.editorconfig</code> rules.
          </li>
        </ul>
        <p>
          The important limitation is that formatting is not repair. If the file has a missing quote, a missing comma,
          or another syntax error, the formatter will not magically fix the data. IntelliJ will highlight the problem,
          but you still need to correct the invalid JSON first.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Columns className="mr-2 h-6 w-6 text-purple-500" />
          Validation, JSON5, and Schema Support
        </h2>
        <p>
          Current IntelliJ IDEA documentation is stronger on validation than many older articles suggest. The editor
          supports JSON Schema out of the box, including bundled schemas from SchemaStore and custom schema mappings for
          your own project files.
        </p>
        <p>
          That matters because formatting alone does not tell you whether a file is valid for the tool that will read
          it. A schema-backed file can show enum errors, missing required keys, invalid value types, and other
          structural issues before runtime.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use schema mappings when your team has custom config files that are JSON-shaped but have strict rules.
          </li>
          <li>Check the status bar if IntelliJ seems to validate against the wrong schema.</li>
          <li>
            If your file contains comments or trailing commas, confirm whether you are editing strict JSON or JSON5,
            because IntelliJ supports both but they are not interchangeable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Terminal className="mr-2 h-6 w-6 text-red-500" />
          Debugging JSON Strings at a Breakpoint
        </h2>
        <p>
          This is where the article&apos;s original topic still matters. JetBrains documents a structured viewer for
          string expressions in the debugger: when a stopped value contains JSON or XML, IntelliJ can display it in a
          formatted document view instead of forcing you to inspect one long escaped string.
        </p>
        <p>
          In practice, that helps most when you are debugging API clients, serializers, queue consumers, or config
          loaders and want to inspect the exact payload before parsing. It is far faster than copying the value into a
          temporary file every time you hit a breakpoint.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <SquareFunction className="mr-2 h-5 w-5 text-orange-500" />
          Evaluate Expressions for Parsed Data
        </h3>
        <p>
          If the JSON has already been parsed into native objects, IntelliJ&apos;s Evaluate Expression feature is the
          better tool. You can inspect nested fields, array items, or transformed values using the language you are
          debugging rather than working from raw text.
        </p>
        <p>
          A useful split is:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use the structured string viewer when the payload is still raw JSON text.</li>
          <li>Use Evaluate Expression when the payload is already mapped into objects, dictionaries, or arrays.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-2 h-6 w-6 text-indigo-500" />
          JSONPath Is Better Than Manual Scrolling
        </h2>
        <p>
          IntelliJ IDEA also supports evaluating JSONPath expressions against open JSON content. For large payloads,
          this is usually the fastest way to answer practical questions like &quot;which item has this ID?&quot; or
          &quot;what value did this nested flag resolve to?&quot;
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Info className="mr-2 h-5 w-5 text-yellow-500" />
            Useful JSONPath examples
          </h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <code>$.items[0]</code> returns the first item in an array.
            </li>
            <li>
              <code>$..id</code> finds every <code>id</code> key anywhere in the document.
            </li>
            <li>
              <code>$.users[?(@.active == true)]</code> filters users down to active entries.
            </li>
            <li>
              <code>$.config.features[*].name</code> extracts all feature names from a nested config object.
            </li>
          </ul>
        </div>
        <p>
          If you regularly inspect large REST responses, JSONPath is the part of IntelliJ&apos;s JSON tooling most
          people underuse.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Files className="mr-2 h-6 w-6 text-teal-500" />
          Scratch Files Are Still the Fastest Safe Workspace
        </h2>
        <p>
          Scratch files remain a good place to paste a payload from logs, reformat it, attach the right schema, and run
          JSONPath queries without creating noise inside your repository. For quick investigation work, this is usually
          cleaner than adding temporary files to the project tree.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MessageCircleQuestion className="mr-2 h-6 w-6 text-blue-500" />
          When Reformat Code Does Not Work
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The file is invalid JSON, so IntelliJ highlights the error but cannot cleanly reformat the broken
            structure.
          </li>
          <li>
            The content is not actually treated as JSON. This happens with the wrong file extension or when JSON is
            embedded in a plain-text file.
          </li>
          <li>
            You expect Prettier to handle JSON automatically, but its configured file pattern does not include JSON in
            your project.
          </li>
          <li>
            You are editing JSON5 features such as comments or trailing commas while the file is meant to stay strict
            JSON.
          </li>
        </ul>
        <p>
          If the goal is simply to clean up malformed pasted data before bringing it back into IntelliJ, a standalone
          JSON formatter can be the faster first step. IntelliJ is strongest once the file is valid and part of a real
          editing or debugging workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For most developers, the answer to &quot;How do I format JSON in IntelliJ IDEA?&quot; is just{" "}
          <code>Reformat Code</code>. The reason to stay in IntelliJ instead of using a one-off formatter is everything
          around that action: schema validation, JSON5 awareness, JSONPath queries, scratch files, and structured JSON
          inspection in the debugger. That combination is what makes IntelliJ IDEA genuinely useful for JSON-heavy
          debugging work rather than just decent at indentation.
        </p>
      </div>
    </>
  );
}
