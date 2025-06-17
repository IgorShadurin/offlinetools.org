import type { Metadata } from "next";
import {
  Code,
  Settings,
  Package,
  Wrench, // Corrected: Tool is not exported, using Wrench instead
  FileJson2,
  Command,
  Keyboard,
  Play,
  Info,
  Brain,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Sublime Text Packages for JSON Formatting | Sublime Text",
  description:
    "Learn how to create Sublime Text packages (plugins, build systems, keybindings) to automatically format JSON data.",
};

export default function SublimeTextJsonFormatterPackageArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Creating Sublime Text Packages for JSON Formatting</h1>

      <div className="space-y-6 text-lg">
        <p>
          Sublime Text is a powerful and highly customizable text editor widely used by developers. One of its greatest
          strengths lies in its extensive package system, allowing users to extend its functionality with plugins, color
          schemes, syntax definitions, and more. For developers working frequently with JSON data, having a quick and
          reliable way to format ugly, unreadable JSON is essential. This guide will walk you through creating your own
          Sublime Text package specifically for JSON formatting.
        </p>
        <p>
          We'll explore two main approaches: using an external formatter tool and building a simple Python plugin that
          leverages Sublime Text's built-in capabilities and Python's standard library.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="inline-block mr-2 text-blue-500" /> What is a Sublime Text Package?
        </h2>
        <p>
          A Sublime Text package is essentially a collection of files organized in a specific directory structure that
          Sublime Text recognizes. These files can include Python scripts (.py) for plugins, JSON files for settings,
          key bindings, and commands, XML files for syntax definitions, and more. Packages are installed in the
          "Packages" directory of your Sublime Text installation. They can be installed as loose files (recommended for
          development) or as compressed `.sublime-package` files (recommended for distribution).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="inline-block mr-2 text-green-500" /> Prerequisites &#x20;(Corrected: Used Wrench icon)
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Sublime Text installed (version 3 or 4 recommended).</li>
          <li>Basic familiarity with JSON structure.</li>
          <li>
            For Method 1 (External Formatter): An external JSON formatting tool (like <code>jq</code>,{" "}
            <code>prettier</code>, or even Python's
            <code>json.tool</code> module via the command line) installed and available in your system's PATH.
          </li>
          <li>
            For Method 2 (Python Plugin): Basic understanding of Python (Sublime Text plugins are written in Python).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="inline-block mr-2 text-purple-500" /> Package Structure
        </h2>
        <p>
          To start, open Sublime Text and go to <code>Preferences &gt; Browse Packages...</code>. This will open the
          "Packages" directory in your file explorer. Create a new folder inside this directory for your package. Let's
          call it <code>JsonFormatter</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code>
              Packages/ <br />
              ├── User/ (Existing folder for your personal settings) <br />
              └── JsonFormatter/ (New folder for your package) <br />
              &nbsp;&nbsp;&nbsp;&nbsp;├── Default.sublime-commands (Command Palette entries) <br />
              &nbsp;&nbsp;&nbsp;&nbsp;├── Default.sublime-keymap (Keyboard shortcuts) <br />
              &nbsp;&nbsp;&nbsp;&nbsp;└── ... other package files will go here ...
            </code>
          </pre>
        </div>
        <p>
          We'll add more files to the <code>JsonFormatter</code> folder depending on the method we choose.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FlaskConical className="inline-block mr-2 text-orange-500" /> Method 1: Using an External Formatter
        </h2>
        <p>
          This method is simpler if you already have a preferred command-line JSON formatter. Sublime Text can be
          configured to send the current buffer's content to an external command and replace the buffer content with the
          command's output. This is typically done using a "Build System" or directly via a Python plugin that uses the
          `subprocess` module. We'll use a Build System as it's a common and relatively easy way to achieve this.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson2 className="inline-block mr-2 text-yellow-600" /> Creating a Build System
        </h3>
        <p>
          Inside your <code>JsonFormatter</code> package folder, create a new file named{" "}
          <code>JsonFormatter.sublime-build</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">JsonFormatter.sublime-build:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                &#x7b; <br />
                &nbsp;&nbsp;&quot;name&quot;: &quot;JSON Formatter (External)&quot;, <br />
                &nbsp;&nbsp;&quot;cmd&quot;: [&quot;python&quot;, &quot;-m&quot;, &quot;json.tool&quot;], <br />
                &nbsp;&nbsp;&quot;file_regex&quot;: &quot;^...<em>(.</em>?):([0-9]+):?([0-9]+)?&quot;, <br />
                &nbsp;&nbsp;&quot;selector&quot;: &quot;source.json&quot;, <br />
                &nbsp;&nbsp;&quot;shell&quot;: true, <br />
                &nbsp;&nbsp;&quot;working_dir&quot;: &quot;$file_path&quot;, <br />
                &nbsp;&nbsp;&quot;input_regex&quot;: &quot;&quot;, <br />
                &nbsp;&nbsp;&quot;target&quot;: &quot;pipe_build&quot;, <br />
                &nbsp;&nbsp;&quot;pipe_input&quot;: &quot;$contents&quot; <br />
                &#x7d;
              </code>
            </pre>
          </div>
        </div>
        <p>Let's break down this JSON file:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>"name"</code>: The name that appears in the Build System menu.
          </li>
          <li>
            <code>"cmd"</code>: The command to execute. Here, we use Python's built-in <code>json.tool</code> module.
            You could replace this with
            <code>[&quot;jq&quot;]</code> or <code>[&quot;prettier&quot;, &quot;--parser&quot;, &quot;json&quot;]</code>
            or any other command-line JSON formatter.
          </li>
          <li>
            <code>"selector"</code>: This build system will only be available when editing files with the `source.json`
            syntax (i.e., JSON files).
          </li>
          <li>
            <code>"shell"</code>: Set to true if your command needs to run in a shell (e.g., for piping).
          </li>
          <li>
            <code>"target": "pipe_build"</code>: This special target allows piping input to the command and replacing
            the buffer with the output.
          </li>
          <li>
            <code>"pipe_input": "$contents"</code>: This tells Sublime Text to pipe the entire content of the current
            buffer (`$contents`) as input to the command specified in <code>"cmd"</code>.
          </li>
          <li>
            <code>"file_regex"</code>, <code>"working_dir"</code>,<code>"input_regex"</code>: Standard build system
            keys; adjusted for piping but less critical for simple formatting.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Command className="inline-block mr-2 text-red-500" /> Adding Command Palette Entry
        </h3>
        <p>
          To make this easily accessible via the Command Palette (<code>Ctrl+Shift+P</code> or <code>Cmd+Shift+P</code>
          ), create a file named <code>Default.sublime-commands</code> in your
          <code>JsonFormatter</code> folder.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Default.sublime-commands:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                [ <br />
                &nbsp;&nbsp;&#x7b; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;caption&quot;: &quot;JsonFormatter: Format JSON (External)&quot;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;build&quot;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: &#x7b; &quot;build_system&quot;:
                &quot;Packages/JsonFormatter/JsonFormatter.sublime-build&quot; &#x7d; <br />
                &nbsp;&nbsp;&#x7d; <br />]
              </code>
            </pre>
          </div>
        </div>
        <p>
          Now you can open a JSON file, press <code>Ctrl+Shift+P</code>, type "JsonFormatter", and select
          "JsonFormatter: Format JSON (External)" to format the current file.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Keyboard className="inline-block mr-2 text-teal-500" /> Adding a Keyboard Shortcut
        </h3>
        <p>
          For even faster access, add a keyboard shortcut. Create or edit the
          <code>Default.sublime-keymap</code> file in your <code>JsonFormatter</code>
          folder.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Default.sublime-keymap:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                [ <br />
                &nbsp;&nbsp;&#x7b; &quot;keys&quot;: [&quot;ctrl+alt+f&quot;], &quot;command&quot;: &quot;build&quot;,
                &quot;args&quot;: &#x7b; &quot;build_system&quot;:
                &quot;Packages/JsonFormatter/JsonFormatter.sublime-build&quot; &#x7d; &#x7d;, <br />
                &nbsp;&nbsp; {/* Add other keybindings here if needed */} <br />]
              </code>
            </pre>
          </div>
        </div>
        <p>
          This example assigns <code>Ctrl+Alt+F</code> (or <code>Cmd+Alt+F</code> on macOS) to run the build system when
          a key combination is pressed. Choose a key combination that doesn't conflict with existing shortcuts.
        </p>
        <p className="flex items-center">
          <Play className="inline-block mr-2 text-blue-500" />
          <strong>To use this method:</strong> Open a JSON file, ensure its syntax is set to JSON, and either run the
          build system manually (<code>Tools &gt; Build System &gt; JSON Formatter (External)</code> then{" "}
          <code>Tools &gt; Build</code> or press <code>F7</code>), use the Command Palette entry, or press your defined
          keyboard shortcut.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Brain className="inline-block mr-2 text-blue-500" /> Method 2: Using a Python Plugin
        </h2>
        <p>
          For more control, or if you don't want to rely on external command-line tools, you can write a Python plugin.
          Sublime Text provides an API that allows plugins to interact with views (editor tabs), selections, settings,
          and more.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson2 className="inline-block mr-2 text-yellow-600" /> Creating the Plugin File
        </h3>
        <p>
          Inside your <code>JsonFormatter</code> package folder, create a new file named{" "}
          <code>json_formatter_plugin.py</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">json_formatter_plugin.py:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                import sublime <br />
                import sublime_plugin <br />
                import json <br />
                <br />
                class FormatJsonCommand(sublime_plugin.TextCommand): <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Sublime Text Command to format the current view&apos;s JSON content. <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;def run(self, edit): <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view = self.view <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Get the entire content of the buffer <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; region = sublime.Region(0, view.size()) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; content = view.substr(region) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; try: <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Parse the JSON content <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; data = json.loads(content){" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Format the JSON <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Use indent=4 for readability,
                separators=(', ', ': ') for standard formatting <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; formatted_json =
                json.dumps(data, indent=4, separators=(&apos;, &apos;, &apos;: &apos;)) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Replace the original content
                with the formatted JSON <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; view.replace(edit, region,
                formatted_json) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Optional: show a status
                message <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                sublime.status_message(&quot;JSON formatted successfully!&quot;) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; except json.JSONDecodeError as e: <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Handle JSON parsing errors{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                sublime.error_message(f&quot;JSON Formatting Error: &#x7b;e&#x7d;&quot;) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; except Exception as e: <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # Handle any other potential
                errors <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sublime.error_message(f&quot;An
                unexpected error occurred: &#x7b;e&#x7d;&quot;) <br />
              </code>
            </pre>
          </div>
        </div>
        <p>Explanation of the Python code:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>import sublime, sublime_plugin, json</code>: Imports the necessary Sublime Text modules and Python's
            built-in JSON library.
          </li>
          <li>
            <code>class FormatJsonCommand(...)</code>: Defines a custom Sublime Text command. The class name implicitly
            defines the command name (lowercase and underscores): <code>format_json</code>.
          </li>
          <li>
            <code>def run(self, edit):</code>: This is the method Sublime Text calls when the command is executed. The{" "}
            <code>edit</code> object is required for making modifications to the buffer.
          </li>
          <li>
            <code>view = self.view</code>: Gets the current editor view object.
          </li>
          <li>
            <code>region = sublime.Region(0, view.size())</code>: Creates a region that covers the entire buffer
            content.
          </li>
          <li>
            <code>content = view.substr(region)</code>: Reads the text content within the defined region (the whole
            file).
          </li>
          <li>
            <code>json.loads(content)</code>: Parses the string content into a Python dictionary or list.
          </li>
          <li>
            <code>json.dumps(data, indent=4, separators=...)</code>: Converts the Python object back into a JSON string,
            using 4-space indentation and standard separators for pretty-printing.
          </li>
          <li>
            <code>view.replace(edit, region, formatted_json)</code>: Replaces the original content (covered by the{" "}
            <code>region</code>) with the
            <code>formatted_json</code> string. This requires the <code>edit</code>
            object obtained in the <code>run</code> method.
          </li>
          <li>
            <code>try...except json.JSONDecodeError</code>: Basic error handling to catch invalid JSON input. Sublime
            Text's <code>error_message</code>
            is used to display a popup.
          </li>
          <li>
            <code>sublime.status_message(...)</code>: Displays a temporary message in the status bar.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Command className="inline-block mr-2 text-red-500" /> Adding Command Palette Entry (for Plugin)
        </h3>
        <p>
          Edit your <code>Default.sublime-commands</code> file in the <code>JsonFormatter</code> folder to add an entry
          for the new plugin command.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Default.sublime-commands:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                [ <br />
                &nbsp;&nbsp;&#x7b; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;caption&quot;: &quot;JsonFormatter: Format JSON (Plugin)&quot;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;format_json&quot; <br />
                &nbsp;&nbsp;&#x7d; <br />
                &nbsp;&nbsp;, <br />
                &nbsp;&nbsp; {/* Optional: Keep the external formatter command if you want */} <br />
                &nbsp;&nbsp;&#x7b; <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;caption&quot;: &quot;JsonFormatter: Format JSON (External)&quot;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;build&quot;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: &#x7b; &quot;build_system&quot;:
                &quot;Packages/JsonFormatter/JsonFormatter.sublime-build&quot; &#x7d; <br />
                &nbsp;&nbsp;&#x7d; <br />]
              </code>
            </pre>
          </div>
        </div>
        <p>
          Notice the <code>"command": "format_json"</code> matches the lowercase, underscore version of your Python
          class name <code>FormatJsonCommand</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Keyboard className="inline-block mr-2 text-teal-500" /> Adding a Keyboard Shortcut (for Plugin)
        </h3>
        <p>
          Edit your <code>Default.sublime-keymap</code> file to add a shortcut for the plugin command.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Default.sublime-keymap:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                [ <br />
                &nbsp;&nbsp;&#x7b; &quot;keys&quot;: [&quot;ctrl+alt+j&quot;], &quot;command&quot;:
                &quot;format_json&quot;, &quot;context&quot;: <br />
                &nbsp;&nbsp;&nbsp;&nbsp;[ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7b; &quot;key&quot;: &quot;selector&quot;, &quot;operator&quot;:
                &quot;equal&quot;, &quot;operand&quot;: &quot;source.json&quot; &#x7d;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7b; &quot;key&quot;: &quot;setting.json&quot;,
                &quot;operator&quot;: &quot;equal&quot;, &quot;operand&quot;: true &#x7d;, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;] <br />
                &nbsp;&nbsp;&#x7d;, <br />
                &nbsp;&nbsp; {/* Optional: Keep the external formatter shortcut if you want */} <br />
                &nbsp;&nbsp;&#x7b; &quot;keys&quot;: [&quot;ctrl+alt+f&quot;], &quot;command&quot;: &quot;build&quot;,
                &quot;args&quot;: &#x7b; &quot;build_system&quot;:
                &quot;Packages/JsonFormatter/JsonFormatter.sublime-build&quot; &#x7d; &#x7d; <br />
                &nbsp;&nbsp; {/* Add other keybindings here if needed */} <br />]
              </code>
            </pre>
          </div>
        </div>
        <p>
          This example assigns <code>Ctrl+Alt+J</code> (or <code>Cmd+Alt+J</code>) to run the <code>format_json</code>{" "}
          command. We've also added a<code>"context"</code> key to ensure this shortcut only activates when editing a
          JSON file (`source.json` syntax).
        </p>
        <p className="flex items-center">
          <Play className="inline-block mr-2 text-blue-500" />
          <strong>To use this method:</strong> Open a JSON file, ensure its syntax is set to JSON, and either use the
          Command Palette entry ("JsonFormatter: Format JSON (Plugin)") or press your defined keyboard shortcut (e.g.,{" "}
          <code>Ctrl+Alt+J</code>). Sublime Text automatically loads and reloads plugin files ending in <code>.py</code>{" "}
          in the Packages directory.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="inline-block mr-2 text-purple-500" /> Customization and Settings
        </h2>
        <p>
          For the Python plugin method, you might want to make the indentation level or other <code>json.dumps</code>{" "}
          parameters configurable. You can do this by adding a settings file.
        </p>
        <p>
          Create a file named <code>JsonFormatter.sublime-settings</code> in your
          <code>JsonFormatter</code> folder.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">JsonFormatter.sublime-settings:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                &#x7b; <br />
                &nbsp;&nbsp;// The number of spaces to use for indentation when formatting JSON <br />
                &nbsp;&nbsp;&quot;json_indent_spaces&quot;: 4 <br />
                &#x7d;
              </code>
            </pre>
          </div>
        </div>
        <p>
          Then, in your <code>json_formatter_plugin.py</code>, you can read this setting:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Reading settings in json_formatter_plugin.py:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
                # Inside the run method: <br />
                settings = sublime.load_settings(&apos;JsonFormatter.sublime-settings&apos;) <br />
                indent_spaces = settings.get(&apos;json_indent_spaces&apos;, 4) # Default to 4 if setting not found{" "}
                <br />
                <br />
                # Then use it in json.dumps: <br />
                formatted_json = json.dumps(data, indent=indent_spaces, separators=(&apos;, &apos;, &apos;: &apos;)){" "}
                <br />
              </code>
            </pre>
          </div>
        </div>
        <p>
          Users can override this setting by creating a file with the same name in their <code>User</code> package
          folder (<code>Packages/User/JsonFormatter.sublime-settings</code>).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="inline-block mr-2 text-indigo-500" /> Installing the Package
        </h2>
        <p>
          If you followed the steps above and placed the files in a new folder (e.g.,{" "}
          <code>Packages/JsonFormatter</code>), your package is already "installed" in development mode. Sublime Text
          automatically picks up changes to <code>.py</code>, <code>.sublime-commands</code>, and{" "}
          <code>.sublime-keymap</code> files. You might need to restart Sublime Text for build systems
          (`.sublime-build`) to appear in the menu, but the Command Palette and keybindings should work immediately
          after saving the files.
        </p>
        <p>
          For distributing your package, you would typically zip the contents of the <code>JsonFormatter</code> folder
          and rename the zip file to
          <code>JsonFormatter.sublime-package</code>. Users can then install this by dragging it into the "Installed
          Packages" directory (<code>Preferences &gt; Browse Packages...</code> and navigate up one level to find
          "Installed Packages").
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Creating Sublime Text packages for JSON formatting is a practical way to automate a common development task
          and tailor your editor workflow. Whether you prefer leveraging existing external tools via a build system or
          crafting a custom solution with a Python plugin, Sublime Text's flexible package system provides the necessary
          tools.
        </p>
        <p>
          By following the steps outlined above, you've not only created a useful utility but also gained insight into
          how Sublime Text packages work, which opens the door to further customization and development of more complex
          tools within your favorite text editor.
        </p>
      </div>
    </>
  );
}
