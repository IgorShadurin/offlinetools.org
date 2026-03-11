import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts for Efficient JSON Formatting in VS Code and Browser Tools | Offline Tools",
  description:
    "Use the right keyboard shortcuts to format JSON faster in VS Code, JetBrains IDEs, and browser-based JSON formatters. Includes current defaults, conflicts, and customization tips.",
};

export default function KeyboardShortcutsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Keyboard Shortcuts for Efficient JSON Formatting</h1>

      <div className="space-y-6">
        <p>
          If you are looking for a single universal shortcut to format JSON, the first thing to know is that there
          isn&apos;t one. The fastest key combination depends on where you are working: VS Code, a JetBrains IDE, or a
          browser-based formatter all behave differently.
        </p>

        <p>
          That distinction matters because a lot of shortcut lists on the web are wrong. They mix editor commands,
          browser commands, and made-up formatter hotkeys. For real productivity, learn one reliable formatting
          shortcut for your main editor, then add a small set of search and navigation shortcuts around it.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 border-l-4 border-blue-400">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Quick answer</h2>
          <p className="mt-2 text-blue-800 dark:text-blue-100">
            In current official docs, VS Code formats JSON with <strong>Shift+Alt+F</strong> on Windows,{" "}
            <strong>Shift+Option+F</strong> on macOS, and <strong>Ctrl+Shift+I</strong> on Linux. JetBrains IDEs use{" "}
            <strong>Ctrl+Alt+L</strong> on Windows and Linux, and <strong>Command+Option+L</strong> on macOS. In
            browser-based JSON formatters, there is usually <strong>no universal default format shortcut</strong>, so
            the fastest keyboard workflow is tabbing to the Format button and triggering it with Enter or Space.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Quick Reference</h2>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Where You Work With JSON</th>
                <th className="text-left py-2 px-3">Formatting Shortcut</th>
                <th className="text-left py-2 px-3">Also Worth Memorizing</th>
                <th className="text-left py-2 px-3">Important Caveat</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">VS Code</td>
                <td className="py-2 px-3">Shift+Alt+F / Shift+Option+F / Ctrl+Shift+I</td>
                <td className="py-2 px-3">Ctrl/Cmd+Shift+O, Ctrl/Cmd+F</td>
                <td className="py-2 px-3">Shown according to your keyboard layout and keymap</td>
              </tr>
              <tr>
                <td className="py-2 px-3">JetBrains IDEs</td>
                <td className="py-2 px-3">Ctrl+Alt+L / Command+Option+L</td>
                <td className="py-2 px-3">Ctrl/Cmd+Shift+A, Shift twice</td>
                <td className="py-2 px-3">OS or window-manager conflicts are common on Linux and macOS</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Browser-based JSON formatters</td>
                <td className="py-2 px-3">No standard default</td>
                <td className="py-2 px-3">Tab, Enter, Space, Ctrl/Cmd+F</td>
                <td className="py-2 px-3">The site has to expose keyboard-focusable controls</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A Fast Keyboard Workflow for Browser-Based JSON Formatters</h2>

        <p>
          On the web, keyboard efficiency usually comes from standard editing and navigation shortcuts, not from a
          built-in JSON-specific hotkey. That is especially true when you are using an online formatter for quick,
          one-off cleanup.
        </p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            Paste the payload with <strong>Ctrl+V</strong> or <strong>Command+V</strong>.
          </li>
          <li>
            Use <strong>Tab</strong> or <strong>Shift+Tab</strong> to move focus to the <em>Format</em>,{" "}
            <em>Validate</em>, or <em>Minify</em> controls.
          </li>
          <li>
            Activate the focused button with <strong>Enter</strong> or <strong>Space</strong>.
          </li>
          <li>
            Search the formatted output with <strong>Ctrl+F</strong> or <strong>Command+F</strong>.
          </li>
          <li>
            Select everything with <strong>Ctrl+A</strong> or <strong>Command+A</strong>, then copy with{" "}
            <strong>Ctrl+C</strong> or <strong>Command+C</strong>.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Practical takeaway</h3>
          <p className="mt-2">
            If your browser-based formatter does not advertise a dedicated format hotkey, do not assume that{" "}
            <code className="font-mono text-sm">Ctrl/Cmd+Shift+F</code> will work. In web apps, that kind of shortcut
            is often intercepted by the browser or reserved for a completely different action.
          </p>
          <p className="mt-2">
            For fast one-off cleanup, use{" "}
            <a className="underline font-medium" href="/tools/json-formatter">
              the Offline Tools JSON Formatter
            </a>{" "}
            with the keyboard-first flow above instead of hunting through menus.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Current VS Code JSON Shortcuts</h2>

        <p>
          VS Code is one of the most common places people format JSON, so it is worth memorizing the defaults that are
          actually documented today. These are especially useful when you jump between API responses, config files, and
          large sample payloads.
        </p>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Action</th>
                <th className="text-left py-2 px-3">Windows</th>
                <th className="text-left py-2 px-3">macOS</th>
                <th className="text-left py-2 px-3">Linux</th>
                <th className="text-left py-2 px-3">Why It Helps With JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Format Document</td>
                <td className="py-2 px-3">Shift+Alt+F</td>
                <td className="py-2 px-3">Shift+Option+F</td>
                <td className="py-2 px-3">Ctrl+Shift+I</td>
                <td className="py-2 px-3">Beautifies minified JSON instantly</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Go to Symbol in Editor</td>
                <td className="py-2 px-3">Ctrl+Shift+O</td>
                <td className="py-2 px-3">Command+Shift+O</td>
                <td className="py-2 px-3">Ctrl+Shift+O</td>
                <td className="py-2 px-3">Jump to top-level keys in large objects</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Trigger Suggestions</td>
                <td className="py-2 px-3">Ctrl+Space</td>
                <td className="py-2 px-3">Control+Space</td>
                <td className="py-2 px-3">Ctrl+Space</td>
                <td className="py-2 px-3">Useful when schema-backed completion is available</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Open Keyboard Shortcuts</td>
                <td className="py-2 px-3">Ctrl+K Ctrl+S</td>
                <td className="py-2 px-3">Command+K Command+S</td>
                <td className="py-2 px-3">Ctrl+K Ctrl+S</td>
                <td className="py-2 px-3">Lets you bind a shortcut that matches your workflow</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          If you format JSON constantly, a custom binding is often better than memorizing a generic list from the web.
          In VS Code, you can target JSON files only and avoid changing shortcuts for every language.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example VS Code binding for JSON only</h3>
          <p className="mt-2">
            Add a custom keybinding for <code className="font-mono text-sm">editor.action.formatDocument</code> if you
            want a single shortcut that only fires when a JSON editor is focused:
          </p>
          <pre className="mt-3 p-3 rounded bg-gray-900 text-gray-100 overflow-x-auto text-sm">
            <code>{`{
  "key": "ctrl+alt+j",
  "command": "editor.action.formatDocument",
  "when": "editorTextFocus && editorLangId == 'json'"
}`}</code>
          </pre>
          <p className="mt-2 text-sm">
            If you frequently edit VS Code settings or other JSON-with-comments files, use{" "}
            <code className="font-mono text-sm">jsonc</code> instead of <code className="font-mono text-sm">json</code>
            .
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JetBrains IDE Shortcuts for JSON</h2>

        <p>
          WebStorm, IntelliJ IDEA, and other JetBrains IDEs use a consistent formatting flow. The core shortcut is easy
          to remember, and the action search tools make it faster to recover when you forget a binding.
        </p>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Action</th>
                <th className="text-left py-2 px-3">Windows and Linux</th>
                <th className="text-left py-2 px-3">macOS</th>
                <th className="text-left py-2 px-3">Why It Helps With JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Reformat Code</td>
                <td className="py-2 px-3">Ctrl+Alt+L</td>
                <td className="py-2 px-3">Command+Option+L</td>
                <td className="py-2 px-3">Formats the current JSON file or selection</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Find Action</td>
                <td className="py-2 px-3">Ctrl+Shift+A</td>
                <td className="py-2 px-3">Command+Shift+A</td>
                <td className="py-2 px-3">Search for formatting and validation commands by name</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Search Everywhere</td>
                <td className="py-2 px-3">Shift twice</td>
                <td className="py-2 px-3">Shift twice</td>
                <td className="py-2 px-3">Fast way to jump to files, actions, and settings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          JetBrains also supports formatting on save through <strong>Actions on Save</strong>. If you touch JSON files
          all day, that can be more efficient than pressing the reformat shortcut manually every time.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Conflict warning</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            On some Linux desktops and macOS setups, default JetBrains shortcuts can conflict with system or
            input-method shortcuts. If <code className="font-mono text-sm">Ctrl+Alt+L</code> or{" "}
            <code className="font-mono text-sm">Ctrl/Control+Space</code> does nothing, open the keymap settings and
            rebind it instead of fighting the OS.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Usually Breaks JSON Formatting Shortcuts</h2>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Problem</th>
                <th className="text-left py-2 px-3">What Is Usually Happening</th>
                <th className="text-left py-2 px-3">Best Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Nothing happens when you press the shortcut</td>
                <td className="py-2 px-3">The editor is not focused, or the browser/OS captured the keys first</td>
                <td className="py-2 px-3">Click into the editor, then test again or rebind the command</td>
              </tr>
              <tr>
                <td className="py-2 px-3">The file does not format cleanly</td>
                <td className="py-2 px-3">The payload is invalid JSON, or you are working with JSONC rather than strict JSON</td>
                <td className="py-2 px-3">Validate first, then remove comments or trailing commas if strict JSON is required</td>
              </tr>
              <tr>
                <td className="py-2 px-3">The displayed shortcut does not match what you expected</td>
                <td className="py-2 px-3">Modern editors render shortcuts according to keyboard layout and active keymap</td>
                <td className="py-2 px-3">Check the in-app keyboard shortcut editor instead of relying on a cheat sheet</td>
              </tr>
              <tr>
                <td className="py-2 px-3">A browser-based formatter has no hotkey for Format</td>
                <td className="py-2 px-3">Many web tools expose the command only as a button</td>
                <td className="py-2 px-3">Use Tab plus Enter, or create a custom browser shortcut with an extension or userscript</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The Small Shortcut Set That Delivers the Biggest Gain</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Memorize one <strong>format</strong> shortcut for your main editor.
          </li>
          <li>
            Memorize one <strong>find</strong> shortcut so you can inspect large payloads quickly.
          </li>
          <li>
            Memorize one <strong>action search</strong> shortcut such as VS Code&apos;s shortcut editor or JetBrains
            Find Action for everything else.
          </li>
          <li>
            In browser tools, rely on <strong>Tab</strong>, <strong>Enter</strong>, and <strong>Ctrl/Cmd+F</strong>{" "}
            before you rely on any site-specific hotkey list.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>

        <p>
          Efficient JSON formatting is less about memorizing a giant table and more about using the right shortcut in
          the right environment. VS Code and JetBrains both give you dependable formatting defaults today, while
          browser-based formatters reward a simpler keyboard workflow built around focus, search, and copy.
        </p>

        <p>
          Shortcut examples in this guide were checked against the current official{" "}
          <a
            className="underline"
            href="https://code.visualstudio.com/docs/languages/json"
            rel="noreferrer"
            target="_blank"
          >
            VS Code JSON documentation
          </a>
          , the{" "}
          <a
            className="underline"
            href="https://code.visualstudio.com/docs/getstarted/keybindings"
            rel="noreferrer"
            target="_blank"
          >
            VS Code keybindings documentation
          </a>
          , and current{" "}
          <a
            className="underline"
            href="https://www.jetbrains.com/help/idea/reformat-and-rearrange-code.html"
            rel="noreferrer"
            target="_blank"
          >
            JetBrains reformatting guidance
          </a>
          .
        </p>
      </div>
    </>
  );
}
