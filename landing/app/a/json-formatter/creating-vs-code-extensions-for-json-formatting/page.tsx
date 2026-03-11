import type { Metadata } from "next";
import {
  CodeXml,
  Check,
  FileJson,
  Github,
  ListTodo,
  Package,
  Palette,
  Settings,
  TestTube,
  Upload,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating a VS Code JSON Formatter Extension",
  description:
    "Build a VS Code JSON formatter extension with the current generator flow, JSONC-safe formatting, activation events, testing, and Marketplace publishing.",
};

export default function JsonFormattingExtensionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <CodeXml className="w-8 h-8" /> Creating VS Code Extensions for JSON Formatting
      </h1>

      <div className="space-y-8">
        <p>
          If you only need to format JSON in VS Code, the built-in formatter is often enough. Build a custom extension
          when you need team-specific behavior such as formatting JSON with comments, enforcing project rules, adding
          commands, or pairing formatting with a dedicated viewer. This guide uses the current VS Code extension
          workflow as of March 10, 2026, so it reflects today&apos;s generator, activation, and publishing flow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> Quick Answer: Do You Need an Extension?
        </h2>
        <p>A search for a VS Code JSON formatter often mixes three different jobs. Separate them before you write code:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use VS Code&apos;s built-in JSON support if you just want to pretty-print a file with{" "}
            <code>Format Document</code> or format on save.
          </li>
          <li>
            Build a formatter extension if you want JSON or JSONC files to follow custom indentation, newline, or
            project-specific normalization rules.
          </li>
          <li>
            Build a JSON viewer or custom editor if users need a tree view, form UI, schema-aware editing, or a
            non-text experience for specific JSON files.
          </li>
        </ul>
        <p>
          For users who simply want to format JSON in VS Code, start with <code>Format Document</code>, then use{" "}
          <code>Format Document With...</code> if multiple formatters are installed and you need to choose a default.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6" /> Pick the Right Extension Shape
        </h2>
        <p>
          A formatter extension and a custom editor solve different problems, and the distinction matters for search
          intent around &quot;JSON formatter extension VS Code&quot; versus &quot;JSON viewer extension&quot;:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Formatter provider:</strong> Best when the file stays plain text and should respond to{" "}
            <code>Format Document</code>, format-on-save, and default formatter selection.
          </li>
          <li>
            <strong>Custom editor:</strong> Best when the value is in a tree, inspector, or form-based UI. VS Code
            exposes this through the <code>customEditors</code> contribution point.
          </li>
          <li>
            <strong>Hybrid approach:</strong> Many good JSON tools ship both: a formatter for any <code>.json</code>{" "}
            file and a custom editor only for narrow filename patterns where a viewer adds real value.
          </li>
        </ul>
        <p>
          If you are building a JSON viewer, avoid claiming every <code>*.json</code> file by default. It is usually
          better to target specific files or keep the custom editor optional so users can still reopen the file in the
          normal text editor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6" /> Setting up Your Development Environment
        </h2>
        <p>The current official starting point is still the VS Code Yeoman generator:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Install a current Node.js release and Git.</li>
          <li>
            Scaffold the project without installing Yeoman globally:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>npx --package yo --package generator-code -- yo code</code>
            </pre>
          </li>
          <li>
            Choose <strong>New Extension (TypeScript)</strong>. If you know you will depend on modern ESM-only
            packages, choosing a bundled template usually makes life easier.
          </li>
          <li>Give the extension a clear name such as <code>json-tools</code> or <code>json-formatter-pro</code>.</li>
          <li>Open the generated folder in VS Code and press <code>F5</code> later to launch an Extension Development Host.</li>
        </ol>
        <p>
          The generated project includes the extension manifest, TypeScript entry point, debug launch config, and test
          scaffolding. That gets you to a working formatter much faster than building the manifest from scratch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTodo className="w-6 h-6" /> package.json: What Matters and What to Skip
        </h2>
        <p>
          The biggest mistake in older tutorials is inventing a <code>contributes.formatters</code> block. That is not
          how VS Code formatter extensions are registered. Your formatter is discovered when your extension activates
          and calls <code>registerDocumentFormattingEditProvider(...)</code>.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`package.json` (Relevant Excerpt)</h3>
          <code className="language-json">
            {`{
  "categories": ["Formatters"],
  "activationEvents": [
    "onLanguage:json",
    "onLanguage:jsonc"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "jsonTools.formatActiveDocument",
        "title": "JSON Tools: Format Active Document"
      }
    ],
    "configuration": {
      "title": "JSON Tools",
      "properties": {
        "jsonTools.insertFinalNewline": {
          "type": "boolean",
          "default": true,
          "description": "Insert a trailing newline after formatting."
        }
      }
    }
  }
}`}
          </code>
        </pre>
        <p>
          A small JSON formatter usually activates on <code>json</code> and <code>jsonc</code> so the provider is ready
          as soon as those files open. If you add a custom editor later, that lives under{" "}
          <code>contributes.customEditors</code>, not in the formatter registration path.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette className="w-6 h-6" /> Implement a Formatter That Handles JSONC
        </h2>
        <p>
          Many JSON files opened in VS Code are actually JSON with comments. A raw <code>JSON.parse</code> plus{" "}
          <code>JSON.stringify</code> approach breaks on comments, trailing commas, and other JSONC cases. A better
          baseline is <code>jsonc-parser</code>, which Microsoft lists among useful extension modules and which exposes
          a <code>format</code> API that returns precise text edits.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Install the dependency:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>npm install jsonc-parser</code>
            </pre>
          </li>
          <li>
            Register a <code>DocumentFormattingEditProvider</code> for both <code>json</code> and <code>jsonc</code>.
          </li>
          <li>Translate the parser&apos;s offset-based edits into VS Code <code>TextEdit</code> instances.</li>
          <li>Reuse the normal editor formatting command for any command-palette shortcut you expose.</li>
        </ol>
        <p>
          The example below assumes a modern TypeScript extension setup. If your project is still unbundled CommonJS,
          confirm any helper library you add is compatible with that runtime shape.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`src/extension.ts`</h3>
          <code className="language-typescript">
            {`import * as vscode from "vscode";
import { format } from "jsonc-parser";

function toTextEdits(
  document: vscode.TextDocument,
  edits: Array<{ offset: number; length: number; content: string }>
): vscode.TextEdit[] {
  return edits.map((edit) =>
    vscode.TextEdit.replace(
      new vscode.Range(
        document.positionAt(edit.offset),
        document.positionAt(edit.offset + edit.length)
      ),
      edit.content
    )
  );
}

class JsonDocumentFormatter implements vscode.DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    _token: vscode.CancellationToken
  ): vscode.TextEdit[] {
    const config = vscode.workspace.getConfiguration("jsonTools", document.uri);
    const insertFinalNewline = config.get<boolean>("insertFinalNewline", true);

    const edits = format(document.getText(), undefined, {
      insertSpaces: options.insertSpaces,
      tabSize: options.tabSize,
      eol: document.eol === vscode.EndOfLine.LF ? "\\n" : "\\r\\n",
      finalNewline: insertFinalNewline,
      keepLines: false,
    });

    return toTextEdits(document, edits);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const selector: vscode.DocumentSelector = [{ language: "json" }, { language: "jsonc" }];

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(selector, new JsonDocumentFormatter()),
    vscode.commands.registerCommand("jsonTools.formatActiveDocument", async () => {
      await vscode.commands.executeCommand("editor.action.formatDocument");
    })
  );
}
`}
          </code>
        </pre>
        <p>
          This is better than replacing the entire document with one giant edit. VS Code&apos;s language feature docs
          recommend returning the smallest possible edits so diagnostics, markers, and selections stay stable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6" /> Add Rules Without Breaking Real JSON Files
        </h2>
        <p>
          Configuration is where a JSON formatter extension becomes useful instead of redundant. Keep the first version
          small and predictable:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Indentation and end-of-line handling should usually follow VS Code&apos;s formatting options.</li>
          <li>
            Final newline insertion is a safe project-level toggle and easy to expose through{" "}
            <code>contributes.configuration</code>.
          </li>
          <li>
            Key sorting is useful, but treat it as an advanced opt-in rule. It is straightforward for strict JSON and
            much trickier if you need to preserve comments and formatting in JSONC files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TestTube className="w-6 h-6" /> Testing and Debugging
        </h2>
        <p>VS Code&apos;s Extension Development Host is still the fastest way to verify a JSON formatter extension:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open your extension project folder in VS Code.</li>
          <li>Press <code>F5</code> or start the generated <code>Run Extension</code> launch config.</li>
          <li>In the new window, open both a strict <code>.json</code> file and a <code>jsonc</code> file such as a settings file.</li>
          <li>Run <code>Format Document With...</code> the first time so you can verify your formatter is actually selected.</li>
        </ol>
        <p>Check these cases before you publish:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comments and trailing commas in JSONC inputs.</li>
          <li>Mixed line endings and final newline behavior.</li>
          <li>Large files, where full-document rewrites feel sluggish.</li>
          <li>Conflicts with other installed formatters, especially if users already rely on Prettier or language packs.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Upload className="w-6 h-6" /> Publishing Your Extension
        </h2>
        <p>
          The current Marketplace CLI package is <code>@vscode/vsce</code>. A compact publish flow looks like this:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Install the publishing tool:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>npm install -g @vscode/vsce</code>
            </pre>
          </li>
          <li>
            Create a Marketplace publisher if you do not already have one, then authenticate:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce login &lt;publisher-id&gt;</code>
            </pre>
          </li>
          <li>
            Package the extension:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce package</code>
            </pre>
          </li>
          <li>
            Publish it:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce publish</code>
            </pre>
          </li>
        </ol>
        <p>
          The most common publishing failure is authentication. The current docs still require an Azure DevOps Personal
          Access Token with Marketplace manage scope, and the token should usually be created for{" "}
          <strong>All accessible organizations</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Troubleshooting and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>The formatter never appears:</strong> Check the file&apos;s language mode and confirm your{" "}
            <code>activationEvents</code> include <code>onLanguage:json</code> and <code>onLanguage:jsonc</code>.
          </li>
          <li>
            <strong>JSONC files break:</strong> Avoid raw <code>JSON.parse</code> if you expect comments or trailing
            commas. That is exactly where a JSON-specific extension should be better than a generic snippet.
          </li>
          <li>
            <strong>Diagnostics jump after formatting:</strong> Prefer minimal edit sets over replacing the entire
            document. This keeps markers stable and feels more native.
          </li>
          <li>
            <strong>Viewer features start taking over:</strong> If you add a JSON tree viewer later, keep it optional
            or narrow its filename selector so users do not lose normal text editing for every JSON file.
          </li>
          <li>
            <strong>Publishing fails with 401/403:</strong> Re-check PAT scope and organization selection before
            debugging anything else.
          </li>
          <li>
            <strong>README quality matters:</strong> Show one before/after example, explain JSON versus JSONC support,
            and document how to set your extension as the default formatter for JSON files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Github className="w-6 h-6" /> Further Exploration
        </h2>
        <p>The official docs worth keeping open while you build are:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://code.visualstudio.com/api/get-started/your-first-extension"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Your First Extension
            </a>{" "}
            for the current generator flow.
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/api/language-extensions/programmatic-language-features"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Programmatic Language Features
            </a>{" "}
            for formatter provider APIs and the &quot;smallest possible edits&quot; recommendation.
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/api/references/activation-events"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Activation Events
            </a>{" "}
            for <code>onLanguage</code> behavior.
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/api/extension-guides/custom-editors"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Custom Editor API
            </a>{" "}
            if your JSON tool needs a viewer instead of just formatting.
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/api/working-with-extensions/publishing-extension"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Publishing Extensions
            </a>{" "}
            for the current <code>@vscode/vsce</code> flow.
          </li>
          <li>
            <a
              href="https://github.com/microsoft/node-jsonc-parser"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              jsonc-parser
            </a>{" "}
            for JSONC-aware parsing and formatting helpers.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          A good VS Code JSON formatter extension is usually small: activate only for JSON languages, return precise
          edits, support JSONC from day one, and avoid turning a formatter into an overbearing custom editor. If you
          keep those boundaries clear, your extension will serve both users searching for a JSON formatter and teams who
          need stricter project-specific behavior.
        </p>
      </div>
    </>
  );
}
