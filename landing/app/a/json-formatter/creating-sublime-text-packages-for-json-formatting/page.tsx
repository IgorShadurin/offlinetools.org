import type { Metadata } from "next";
import {
  Code,
  Command,
  FileJson2,
  Info,
  Keyboard,
  Package,
  Settings,
  Wrench,
} from "lucide-react";

const packageStructure = String.raw`JsonFormatter/
├── .python-version
├── json_formatter.py
├── Default.sublime-commands
└── JsonFormatter.sublime-settings`;

const pythonVersionFile = String.raw`3.8`;

const pluginCode = String.raw`import json

import sublime
import sublime_plugin


def normalized_regions(view, whole_file_if_no_selection):
    selections = [region for region in view.sel() if not region.empty()]
    if selections:
        return selections
    if whole_file_if_no_selection:
        return [sublime.Region(0, view.size())]
    return []


def line_ending_for_view(view):
    line_endings = view.line_endings()
    if line_endings == "Windows":
        return "\r\n"
    if line_endings == "CR":
        return "\r"
    return "\n"


class JsonFormatterCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        settings = sublime.load_settings("JsonFormatter.sublime-settings")
        indent = settings.get("indent", 2)
        sort_keys = settings.get("sort_keys", False)
        ensure_ascii = settings.get("ensure_ascii", False)
        whole_file_if_no_selection = settings.get("whole_file_if_no_selection", True)

        regions = normalized_regions(self.view, whole_file_if_no_selection)
        if not regions:
            sublime.status_message("Select JSON first")
            return

        replacements = []
        line_ending = line_ending_for_view(self.view)

        for region in regions:
            source = self.view.substr(region)
            try:
                parsed = json.loads(source)
            except json.JSONDecodeError as exc:
                sublime.error_message(
                    "Invalid JSON at line {}, column {}: {}".format(
                        exc.lineno,
                        exc.colno,
                        exc.msg,
                    )
                )
                return

            formatted = json.dumps(
                parsed,
                indent=indent,
                sort_keys=sort_keys,
                ensure_ascii=ensure_ascii,
            ).replace("\n", line_ending)

            replacements.append((region, formatted))

        for region, formatted in reversed(replacements):
            self.view.replace(edit, region, formatted)

        sublime.status_message("JSON formatted")`;

const commandsFile = String.raw`[
  {
    "caption": "JSON Formatter: Format JSON",
    "command": "json_formatter"
  }
]`;

const settingsFile = String.raw`{
  "indent": 2,
  "sort_keys": false,
  "ensure_ascii": false,
  "whole_file_if_no_selection": true
}`;

const keymapFile = String.raw`[
  {
    "keys": ["primary+alt+j"],
    "command": "json_formatter",
    "context": [
      { "key": "selector", "operator": "equal", "operand": "source.json" }
    ]
  }
]`;

export const metadata: Metadata = {
  title: "Creating Sublime Text Packages for JSON Formatting | Offline Tools",
  description:
    "Format JSON in Sublime Text with Package Control or build a small custom package with a command palette entry, settings, and an optional keybinding.",
};

export default function SublimeTextJsonFormatterPackageArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Creating Sublime Text Packages for JSON Formatting</h1>

      <div className="space-y-6 text-lg">
        <p>
          If your only goal is to format JSON in Sublime Text, the quickest path in March 2026 is still to install a
          formatter package through{" "}
          <a
            href="https://packagecontrol.io/docs/usage"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline decoration-blue-300 underline-offset-2 dark:text-blue-400"
          >
            Package Control
          </a>{" "}
          and use an existing command such as{" "}
          <a
            href="https://packagecontrol.io/packages/Pretty%20JSON"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline decoration-blue-300 underline-offset-2 dark:text-blue-400"
          >
            Pretty JSON
          </a>
          . Build your own package when you want a fixed team workflow, custom indentation rules, selection-aware
          formatting, or an offline-friendly command with no third-party formatter dependency.
        </p>
        <p>
          This guide focuses on the custom-package route, but it starts with the shortest answer for search visitors:
          how to format JSON in Sublime Text today, and then how to package that behavior cleanly for reuse.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Wrench className="mr-2 inline-block text-green-500" /> Fastest Option if You Just Want a JSON Formatter
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Open the Command Palette with <code>Ctrl+Shift+P</code> on Windows/Linux or <code>Cmd+Shift+P</code> on macOS.</li>
          <li>Run <code>Package Control: Install Package</code>.</li>
          <li>Install <code>Pretty JSON</code>.</li>
          <li>Use the package command to format the active JSON buffer, validate JSON, or minify it when needed.</li>
        </ul>
        <p>
          That is usually enough for the search intent behind queries like &quot;format json in sublime text&quot; or
          &quot;sublime text json formatter&quot;. A custom package is the better choice when you want your own command
          name, settings file, and predictable behavior across machines.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Info className="mr-2 inline-block text-blue-500" /> When a Custom Package Is Worth It
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>You want one command that formats either the current selection or the whole file.</li>
          <li>You need package-specific settings such as <code>indent</code>, <code>sort_keys</code>, or ASCII escaping.</li>
          <li>You want to avoid shipping a default keybinding that may collide with another package.</li>
          <li>You need a formatter that still works in locked-down or offline environments.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Package className="mr-2 inline-block text-indigo-500" /> Create the Package Folder
        </h2>
        <p>
          Start in <code>Preferences &gt; Browse Packages...</code>. Create a folder named <code>JsonFormatter</code>{" "}
          and put your package files at that folder&apos;s root.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre>
            <code>{packageStructure}</code>
          </pre>
        </div>
        <p>
          For a new package, add a <code>.python-version</code> file as well. The current Sublime Text API docs still
          describe package-level opt-in to Python <code>3.8</code>, and Sublime HQ&apos;s May 21, 2025 build notes
          explicitly said Python 3.3 is being phased out. Starting with <code>3.8</code> now saves migration work.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">.python-version</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code>{pythonVersionFile}</code>
            </pre>
          </div>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-2 inline-block text-purple-500" /> Add the Formatter Command
        </h2>
        <p>
          Put the core logic in <code>json_formatter.py</code>. This example formats either the current selection or,
          if nothing is selected, the whole file. It also preserves the view&apos;s line endings and stops on invalid
          JSON instead of silently rewriting broken data.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">json_formatter.py</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code>{pluginCode}</code>
            </pre>
          </div>
        </div>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <code>JsonFormatterCommand</code> becomes the command name <code>json_formatter</code> inside Sublime
            Text.
          </li>
          <li>
            Selection support is useful when the JSON you need to clean up is embedded inside a larger file or log.
          </li>
          <li>
            <code>ensure_ascii</code> is left configurable because many teams prefer readable UTF-8 output instead of
            escaped Unicode sequences.
          </li>
        </ul>
        <p>
          If your team standardizes on <code>jq</code> or <code>prettier</code>, keep the same package skeleton and
          swap the <code>json.dumps</code> call for a <code>subprocess.run(...)</code> wrapper. For editor formatting, a{" "}
          <code>TextCommand</code> is usually a better fit than a build system because it can update the current
          buffer directly.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Command className="mr-2 inline-block text-red-500" /> Add a Command Palette Entry
        </h2>
        <p>
          Create <code>Default.sublime-commands</code> so the formatter is discoverable without remembering a
          keybinding.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Default.sublime-commands</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code>{commandsFile}</code>
            </pre>
          </div>
        </div>
        <p>
          After saving the file, open the Command Palette and run <code>JSON Formatter: Format JSON</code>. For a
          package you intend to share, this is often enough on its own.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Settings className="mr-2 inline-block text-purple-500" /> Add Package Settings
        </h2>
        <p>
          Keep formatting choices in a dedicated settings file instead of hard-coding them into the plugin. That makes
          the package easier to reuse and easier for users to override in their <code>User</code> package.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">JsonFormatter.sublime-settings</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code>{settingsFile}</code>
            </pre>
          </div>
        </div>
        <p>
          Put user-specific overrides in <code>Packages/User/JsonFormatter.sublime-settings</code>. For example, you
          might keep the package default at two spaces while a personal override sets <code>indent</code> to{" "}
          <code>4</code> or <code>&quot;\t&quot;</code>.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Keyboard className="mr-2 inline-block text-teal-500" /> Add a Keybinding Only if You Want One
        </h2>
        <p>
          Current formatter packages increasingly avoid shipping default shortcuts because collisions are common. For a
          local workflow, add the keybinding in <code>Packages/User/Default.sublime-keymap</code> instead of baking it
          into the package.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Packages/User/Default.sublime-keymap</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              <code>{keymapFile}</code>
            </pre>
          </div>
        </div>
        <p>
          The <code>primary</code> modifier maps to <code>Ctrl</code> on Windows/Linux and <code>Cmd</code> on macOS,
          so one keybinding works across platforms. The selector guard keeps the shortcut limited to JSON buffers.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileJson2 className="mr-2 inline-block text-yellow-600" /> Package It for Reuse
        </h2>
        <p>
          For personal use, the loose package inside the folder opened by <code>Browse Packages...</code> is enough.
          Sublime Text will load the command from there.
        </p>
        <p>
          If you want to hand the package to someone else, use <code>Package Control: Create Package File</code>{" "}
          instead of manually zipping the folder. That produces a <code>.sublime-package</code> archive in the format
          Sublime expects.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Troubleshooting</h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            If the command does not appear, confirm that <code>json_formatter.py</code> is at the root of the package
            folder and that the package folder name matches the paths used by your settings file.
          </li>
          <li>
            If formatting fails, check whether the buffer contains comments or trailing commas. Standard JSON does not
            allow either of those.
          </li>
          <li>
            If the keybinding never fires, remove it and test the Command Palette entry first. Shortcut conflicts are
            more common than plugin loading problems.
          </li>
          <li>
            If you only want a maintained formatter and not a custom workflow, go back to Package Control and install
            an existing package instead of maintaining code yourself.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          The simplest way to format JSON in Sublime Text is to install a formatter package. The simplest way to own
          the behavior is a tiny package built around one <code>TextCommand</code>, one commands file, and one settings
          file.
        </p>
        <p>
          That gives you a reusable Sublime Text JSON formatter without turning a small editor convenience into a large
          plugin project.
        </p>
      </div>
    </>
  );
}
