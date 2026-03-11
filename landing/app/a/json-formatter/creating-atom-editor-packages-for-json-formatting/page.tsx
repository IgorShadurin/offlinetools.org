import type { Metadata } from "next";
import { AlertTriangle, Atom, Code, FileJson, Package, Settings, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Atom Editor Packages for JSON Formatting | Atom and Pulsar Guide",
  description:
    "Build a JSON formatter package for Atom-compatible editors with current guidance on Atom's archived status, package structure, testing, and Pulsar publishing.",
};

export default function AtomJsonFormatterPackageArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Atom size={32} />
        Creating Atom Editor Packages for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          If you still maintain an Atom workflow, a JSON formatter package is one of the fastest useful extensions you
          can build: one command, one parser pass, and an immediate quality-of-life improvement for minified API
          payloads or hand-edited config files. The important 2026 caveat is that GitHub sunset Atom on December 15,
          2022, and the official <a
            href="https://github.com/atom/atom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            atom/atom repository
          </a>{" "}
          is now archived and read-only. The package API is still worth learning for local tools, but if you want a
          maintained editor and a live package registry, build with{" "}
          <a
            href="https://docs.pulsar-edit.dev/developing-for-pulsar/developing-a-package/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Pulsar&apos;s package docs
          </a>{" "}
          in mind because Pulsar keeps the Atom-compatible ecosystem alive.
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle size={20} />
            Current Reality First
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use Atom if you are maintaining an existing internal workflow or a legacy package.</li>
            <li>Use Pulsar if you are starting a new public package or want current documentation and publishing.</li>
            <li>
              Keep the package itself simple and Atom-compatible: the same command-based formatter pattern works in both
              editors.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package size={24} />
          Pick the Right Starting Point
        </h2>
        <p>
          For strict compatibility, write your package using the classic Atom package shape: a top-level{" "}
          <code>package.json</code>, a main module in <code>lib/</code>, and optional <code>keymaps/</code>,{" "}
          <code>menus/</code>, and <code>spec/</code> folders. In Atom you can still create that skeleton from{" "}
          <code>Edit &gt; Developer &gt; Generate New Package...</code>. In Pulsar, the official generator is available
          through the Command Palette as <code>Generate Package</code>.
        </p>
        <p>
          The generated scaffold is often noisier than a formatter package needs. For a JSON formatter, the minimal
          structure usually looks like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`json-formatter-package/
├─ keymaps/
│  └─ json-formatter-package.json
├─ lib/
│  └─ json-formatter-package.js
├─ menus/
│  └─ json-formatter-package.json
├─ spec/
│  └─ json-formatter-package-spec.js
└─ package.json`}
          </pre>
        </div>
        <p>
          If your generator creates view files, modal panels, or starter styles you do not need, delete them early.
          Formatter packages are command-driven and should stay small.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} />
          Use a Practical <code>package.json</code>
        </h2>
        <p>
          The generated metadata needs cleanup before the package is actually useful. Fill in the package name,
          description, repository URL, and a couple of formatter settings immediately so you do not forget later.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            Recommended <code>package.json</code>
          </h3>
          <pre>
            {`{
  "name": "json-formatter-package",
  "main": "./lib/json-formatter-package",
  "version": "0.0.0",
  "description": "Format strict JSON in Atom and Pulsar",
  "keywords": ["json", "formatter", "atom", "pulsar"],
  "activationCommands": {
    "atom-workspace": "json-formatter-package:format"
  },
  "repository": "https://github.com/your-name/json-formatter-package",
  "license": "MIT",
  "engines": {
    "atom": ">=1.0.0 <2.0.0"
  },
  "config": {
    "indentation": {
      "title": "Indentation Spaces",
      "description": "Number of spaces to use when pretty-printing JSON.",
      "type": "integer",
      "default": 2,
      "minimum": 0,
      "maximum": 8
    },
    "sortKeys": {
      "title": "Sort Object Keys",
      "description": "Alphabetically sort keys before writing formatted output.",
      "type": "boolean",
      "default": false
    }
  },
  "dependencies": {}
}`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>activationCommands</code> keeps startup lightweight. The package is activated only when the command is
            invoked.
          </li>
          <li>
            The Atom-compatible <code>engines.atom</code> field is still what Pulsar expects for package compatibility.
          </li>
          <li>
            For a JSON formatter, configuration usually only needs indentation and an optional key-sorting toggle.
          </li>
        </ul>
        <p>
          If you publish to Pulsar later, the official docs also support delayed activation via{" "}
          <code>activationHooks</code>, but <code>activationCommands</code> is the simplest starting point for a
          command-driven formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} />
          Build the Formatter Around a Single Command
        </h2>
        <p>
          For this kind of package, the safest pattern is a single command registered from <code>activate()</code>,
          plus a formatter method that works on either one selection or the entire buffer. Use the generated CommonJS
          style unless you already have a build step; that is still the most direct path for Atom-compatible packages.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            <code>lib/json-formatter-package.js</code>
          </h3>
          <pre>
            {`const { CompositeDisposable } = require("atom");

function sortObjectKeys(value) {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObjectKeys(value[key]);
        return result;
      }, {});
  }

  return value;
}

module.exports = {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "json-formatter-package:format": () => this.formatJson(),
      })
    );
  },

  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose();
      this.subscriptions = null;
    }
  },

  formatJson() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      atom.notifications.addWarning("JSON Formatter: No active editor.");
      return;
    }

    const grammar = editor.getGrammar();
    const scopeName = grammar ? grammar.scopeName : "";
    if (scopeName !== "source.json") {
      atom.notifications.addInfo(
        "JSON Formatter: This example targets strict JSON files only."
      );
      return;
    }

    const selections = editor.getSelections().filter((selection) => !selection.isEmpty());
    if (selections.length > 1) {
      atom.notifications.addInfo(
        "JSON Formatter: Use one selection or format the entire file."
      );
      return;
    }

    const selection = selections[0] || null;
    const sourceText = selection ? selection.getText() : editor.getText();

    if (!sourceText.trim()) {
      atom.notifications.addInfo("JSON Formatter: Nothing to format.");
      return;
    }

    const indentation = atom.config.get("json-formatter-package.indentation");
    const sortKeys = atom.config.get("json-formatter-package.sortKeys");

    let formattedJson;
    try {
      const parsed = JSON.parse(sourceText);
      const normalized = sortKeys ? sortObjectKeys(parsed) : parsed;
      formattedJson = JSON.stringify(normalized, null, indentation);
    } catch (error) {
      atom.notifications.addError("JSON Formatter: Invalid JSON.", {
        detail: error.message,
        dismissable: true,
      });
      return;
    }

    editor.transact(() => {
      if (selection) {
        editor.setTextInBufferRange(selection.getBufferRange(), formattedJson);
      } else {
        editor.setText(formattedJson);
      }
    });

    atom.notifications.addSuccess("JSON Formatter: JSON formatted successfully.");
  },
};`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>CompositeDisposable</code> is the standard way to clean up registered commands on deactivation.
          </li>
          <li>
            Register the command on <code>atom-workspace</code> so it appears in the command palette anywhere in the
            editor.
          </li>
          <li>
            Use <code>editor.transact()</code> so a full format operation becomes one undo step instead of several.
          </li>
          <li>
            Use <code>setTextInBufferRange()</code> for a single selection. That is clearer than relying on{" "}
            <code>insertText()</code> behavior when multiple cursors or selections are involved.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson size={24} />
          Keep the JSON Rules Explicit
        </h2>
        <p>
          The example above is intentionally strict: it only accepts data that <code>JSON.parse()</code> accepts. That
          means no comments, no trailing commas, and no JSON5-style syntax. This matters because many developers think
          they need a “JSON formatter” when what they really have is JSONC or JSON5.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            If your users edit API payloads, exported data, or minified production JSON, strict JSON is usually the
            right choice.
          </li>
          <li>
            If they edit config files with comments, swap the parser for something like <code>jsonc-parser</code> and
            adjust the grammar checks accordingly.
          </li>
          <li>
            If key order matters for readability, offer a <code>sortKeys</code> option, but make it opt-in because it
            changes output beyond whitespace formatting.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings size={24} />
          Add Keymaps, Menus, and Testing
        </h2>
        <p>
          Your package becomes discoverable when the command is easy to trigger. Start with one key binding and one menu
          item, then test in development mode before thinking about publishing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            Example <code>keymaps/json-formatter-package.json</code>
          </h3>
          <pre>
            {`{
  "atom-text-editor": {
    "ctrl-alt-j": "json-formatter-package:format"
  }
}`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            Example <code>menus/json-formatter-package.json</code>
          </h3>
          <pre>
            {`{
  "menu": [
    {
      "label": "Packages",
      "submenu": [
        {
          "label": "JSON Formatter Package",
          "submenu": [
            {
              "label": "Format JSON",
              "command": "json-formatter-package:format"
            }
          ]
        }
      ]
    }
  ],
  "context-menu": {
    "atom-text-editor": [
      {
        "label": "Format JSON",
        "command": "json-formatter-package:format"
      }
    ]
  }
}`}
          </pre>
        </div>
        <p>For testing, use the smallest loop possible:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            In Atom, open the package with <code>Edit &gt; Developer &gt; Open in Dev Mode...</code>.
          </li>
          <li>
            In Pulsar, you can also launch a package directly with <code>pulsar --dev /path/to/package</code>.
          </li>
          <li>
            Reload after edits with <code>Window: Reload</code>, then run your command from the Command Palette.
          </li>
          <li>
            Open developer tools if something is not registering; package activation errors usually surface there
            immediately.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} />
          Troubleshooting the Common Failures
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Command does not appear: make sure <code>activationCommands</code> contains the exact command name and then
            reload the window.
          </li>
          <li>
            Package loads but formatting does nothing: confirm you have an active text editor and the open file is using
            the expected JSON grammar.
          </li>
          <li>
            “Invalid JSON” on a config file: you probably have comments or trailing commas, which means you need JSONC
            support rather than strict JSON.
          </li>
          <li>
            Pulsar will not load the package after generation: the package name may collide with an existing bundled or
            published package name.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package size={24} />
          Publishing in 2026
        </h2>
        <p>
          This is where the Atom sunset matters most. For public distribution, do not plan around the original Atom
          package ecosystem. The maintained path is the{" "}
          <a
            href="https://docs.pulsar-edit.dev/developing-for-pulsar/publishing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Pulsar package registry
          </a>
          .
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`cd json-formatter-package
pulsar -p publish minor`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Check that the package name is available before publishing.</li>
          <li>Make sure the repository URL in <code>package.json</code> is real and matches the GitHub repo.</li>
          <li>
            Keep the <code>engines.atom</code> field even for Pulsar publishing; that is still the compatibility marker
            the docs require.
          </li>
          <li>
            If this formatter is only for your team, skip registry publishing entirely and keep it as a local linked
            package.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Creating an Atom editor package for JSON formatting still makes sense when you treat it as a small,
          command-driven extension and stay honest about the platform state. Build the formatter with strict JSON rules,
          a clear command, and a minimal package surface area. If the package needs a future beyond your own machine or
          team, target Pulsar for testing and publishing while keeping the package code Atom-compatible.
        </p>
      </div>
    </>
  );
}
