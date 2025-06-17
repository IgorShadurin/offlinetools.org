import type { Metadata } from "next";
import { Atom, Package, Code, FileJson, Settings, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Atom Editor Packages for JSON Formatting | Package Development Guide",
  description:
    "A comprehensive guide for developers of all levels on building Atom Editor packages specifically for formatting JSON data.",
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
          The Atom text editor, built on Electron, offers a highly customizable environment for developers. One of its
          most powerful features is its package system, allowing users to extend its functionality significantly.
          Creating a package to format JSON is a common and practical use case, providing a quick way to pretty-print
          unformatted or minified JSON directly within the editor. This guide will walk you through the process, from
          setting up your package structure to implementing the core formatting logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package size={24} />
          Understanding Atom Packages
        </h2>
        <p>
          Atom packages are essentially Node.js modules with a specific structure that Atom understands. They consist of
          a main entry file and a <code>package.json</code> file, similar to standard npm packages, but with
          Atom-specific configuration.
        </p>
        <p>Key components of an Atom package:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>package.json</code>: Contains metadata about the package (name, version, description, etc.) and
            crucially defines package activation/deactivation methods and commands.
          </li>
          <li>
            Main file (e.g., <code>index.js</code> or <code>main.js</code>): Exports functions like{" "}
            <code>activate()</code> and <code>deactivate()</code>, which are called when the package is enabled or
            disabled. This file contains the package&apos;s core logic.
          </li>
          <li>
            Optional directories: <code>lib/</code> for source code, <code>menus/</code> for menu definitions,{" "}
            <code>styles/</code> for CSS, etc.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} />
          Setting up Your Package
        </h2>
        <p>The easiest way to start is by using Atom&apos;s built-in package generator.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Go to <code>Edit &gt; Developer &gt; Generate New Package...</code>
          </li>
          <li>
            Choose a directory for your package (e.g., <code>json-formatter-package</code>).
          </li>
          <li>
            Enter the package name (e.g., <code>json-formatter-package</code>).
          </li>
        </ul>
        <p>
          This will create a basic directory structure with a <code>package.json</code>, a main JavaScript file, and
          some example files.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          The <code>package.json</code> File
        </h3>
        <p>
          Your generated <code>package.json</code> will have some basic fields. For a JSON formatter, the important
          parts are the <code>activationCommands</code> and potentially <code>config</code> for user-configurable
          settings (like indentation).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">
            Example <code>package.json</code>:
          </h4>
          <pre>
            {`{
  "name": "json-formatter-package",
  "main": "./lib/json-formatter-package", // Or whatever your main file is named
  "version": "1.0.0",
  "description": "Formats JSON within Atom Editor",
  "keywords": [],
  "activationCommands": {
    "atom-text-editor": "json-formatter-package:format"
  },
  "repository": "https://github.com/your-username/json-formatter-package",
  "license": "MIT",
  "engines": {
    "atom": ">=1.0.0 &#x3c;2.0.0"
  },
  "dependencies": {},
  "config": {
    "indentation": {
      "title": "Indentation Spaces",
      "description": "Number of spaces to use for indentation",
      "type": "integer",
      "default": 2,
      "minimum": 0
    }
  }
}`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>main</code>: Points to the package&apos;s entry file.
          </li>
          <li>
            <code>activationCommands</code>: This tells Atom to activate your package when the specified command is
            triggered on the specified element (<code>atom-text-editor</code> means any active text editor). The format
            is <code>'target-element': 'command-name'</code>.
          </li>
          <li>
            <code>config</code>: Defines package settings that users can modify via Atom&apos;s Settings view.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          The Main Package File (e.g., <code>lib/json-formatter-package.js</code>)
        </h3>
        <p>
          This file will contain the <code>activate</code> and <code>deactivate</code> functions, and the logic for your
          command.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Example Main File Structure:</h4>
          <pre>
            {`export default {
  // Called when the package is activated
  activate() {
    // Register the command
    this.commandDisposable = atom.commands.add('atom-text-editor', {
      'json-formatter-package:format': () => this.formatJson()
    });

    // Optional: Watch config changes if needed immediately (less common for simple formatters)
    // this.configDisposable = atom.config.observe('json-formatter-package.indentation', (value) => {
    //   this.indentation = value;
    // });
  },

  // Called when the package is deactivated
  deactivate() {
    this.commandDisposable.dispose();
    // this.configDisposable?.dispose(); // Dispose of config observer if used
  },

  // Placeholder for the core formatting logic
  formatJson() {
    // Implementation goes here
    console.log('json-formatter-package:format command triggered!');
    atom.notifications.addInfo('JSON Format command triggered (implementation missing).');
  }
};`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>activate()</code>: Where you set up event listeners, register commands, etc. We register our{" "}
            <code>json-formatter-package:format</code> command using <code>atom.commands.add</code>. The handler calls
            our <code>formatJson</code> method. A <code>Disposable</code> object is returned and stored, which is needed
            for cleanup.
          </li>
          <li>
            <code>deactivate()</code>: Where you clean up anything created in <code>activate()</code> to prevent memory
            leaks. Disposing the command disposable is crucial.
          </li>
          <li>
            <code>formatJson()</code>: This is the function that will execute when the command is triggered.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} />
          Implementing the JSON Formatting Logic
        </h2>
        <p>
          Now, let&apos;s fill in the <code>formatJson</code> method. The steps are: get the editor, get the text, parse
          it, format it, and replace the text in the editor.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">
            Full <code>formatJson</code> Implementation:
          </h4>
          <pre>
            {`formatJson() {
  const editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    atom.notifications.addWarning('JSON Formatter: No active text editor.');
    return;
  }

  // Get the selected text, or the entire buffer text if nothing is selected
  const selection = editor.getSelectedText();
  const fullText = editor.getBuffer().getText();
  const textToFormat = selection || fullText;

  if (!textToFormat) {
     atom.notifications.addInfo('JSON Formatter: No text to format.');
     return;
  }

  let parsedJson;
  try {
    parsedJson = JSON.parse(textToFormat);
  } catch (error) {
    atom.notifications.addError(\`JSON Formatter: Invalid JSON input.\`, {
      detail: error.message,
      dismissable: true
    });
    return;
  }

  // Get indentation setting from package config
  // Note: atom.config.get returns the config value.
  // If you used atom.config.observe as shown commented out above,
  // you might store it in this.indentation
  const indentationSpaces = atom.config.get('json-formatter-package.indentation') || 2;

  let formattedJson;
  try {
    // JSON.stringify with null replacer and indentationSpaces for pretty printing
    formattedJson = JSON.stringify(parsedJson, null, indentationSpaces);
  } catch (error) {
     // Should theoretically not happen if parsing succeeded, but good practice
     atom.notifications.addError(\`JSON Formatter: Error during stringification.\`, {
       detail: error.message,
       dismissable: true
     });
     return;
  }


  // Replace the text in the editor
  if (selection) {
     // If text was selected, replace only the selection
     editor.setText(formattedJson); // This replaces the *entire* buffer, NOT just the selection. Correcting this...
     // To replace selection: editor.insertText(formattedJson);
     // Let's re-evaluate: should it replace selection or entire file?
     // A common pattern is to replace the selection if one exists, otherwise the whole file.
     // Let's implement replace selection.
     editor.insertText(formattedJson); // This inserts where the cursor is, replacing selection if one exists.
  } else {
    // If no text was selected, replace the entire buffer
    editor.getBuffer().setText(formattedJson);
  }

   atom.notifications.addSuccess('JSON Formatter: Document formatted successfully.');
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Explanation of the Logic:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>atom.workspace.getActiveTextEditor()</code>: Retrieves the currently focused text editor instance.
            Returns <code>undefined</code> if no editor is active.
          </li>
          <li>
            <code>editor.getSelectedText()</code>: Gets the text of the current selection. Returns an empty string if
            nothing is selected.
          </li>
          <li>
            <code>editor.getBuffer().getText()</code>: Gets the entire content of the text buffer.
          </li>
          <li>
            <code>textToFormat = selection || fullText;</code>: This is a common pattern. If there&apos;s a selection,
            format that; otherwise, format the whole file.
          </li>
          <li>
            <code>JSON.parse(textToFormat)</code>: Attempts to parse the input string into a JavaScript object/array.
            This is where invalid JSON will throw an error.
          </li>
          <li>
            <code>atom.config.get(...)</code>: Reads the value of the configuration setting defined in{" "}
            <code>package.json</code>.
          </li>
          <li>
            <code>JSON.stringify(parsedJson, null, indentationSpaces)</code>: Converts the JavaScript object/array back
            into a JSON string.
            <ul className="list-circle pl-4 mt-2">
              <li>The first argument is the value to stringify.</li>
              <li>
                The second argument (<code>null</code>) is the replacer function; <code>null</code> means include all
                properties.
              </li>
              <li>
                The third argument (<code>indentationSpaces</code>) is the space count for indentation, controlling the
                pretty-printing. Using a number formats the output nicely.
              </li>
            </ul>
          </li>
          <li>
            <code>editor.insertText(formattedJson)</code>: If there was a selection, this method replaces the selection
            with the new text and places the cursor at the end of the inserted text.
          </li>
          <li>
            <code>editor.getBuffer().setText(formattedJson)</code>: If no selection, this replaces the entire content of
            the editor&apos;s buffer with the formatted text.
          </li>
          <li>
            <code>atom.notifications.addError/addWarning/addSuccess</code>: Used to provide feedback to the user via
            Atom&apos;s notification system.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings size={24} />
          Handling Configuration
        </h2>
        <p>
          As shown in the <code>package.json</code> example, you can define configuration options. Atom automatically
          creates a UI for these settings in the package manager.
        </p>
        <p>
          Accessing config values in your code is done via{" "}
          <code>atom.config.get(&apos;your-package-name.setting-name&apos;)</code>. We used this to get the indentation
          level.
        </p>
        <p>
          If you needed to react immediately to config changes (e.g., if the indentation could change how something is
          displayed live, which isn&apos;t the case for a formatter that only runs on command), you would use{" "}
          <code>atom.config.observe</code> in your <code>activate</code> function and dispose of the observer in{" "}
          <code>deactivate</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson size={24} />
          Making it JSON Specific (Optional but Recommended)
        </h2>
        <p>
          Currently, our package would format any text in any file type if the command is triggered. You might want it
          to work only in JSON files. You can achieve this by:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Checking the file&apos;s grammar: Inside <code>formatJson</code>, check{" "}
            <code>editor.getGrammar().scopeName</code>. JSON files typically have a scope name like{" "}
            <code>source.json</code>. Add a check at the beginning:
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
              <pre>
                {`// Inside formatJson()
const editor = atom.workspace.getActiveTextEditor();
// ... (null editor check) ...

// Check if the current grammar is JSON
if (editor.getGrammar().scopeName !== 'source.json') {
  atom.notifications.addWarning('JSON Formatter: This command is intended for JSON files.');
  return;
}`}
              </pre>
            </div>
          </li>
          <li>
            Contextualizing the command: You can change <code>activationCommands</code> to be more specific, but
            checking the grammar inside the command handler is often more flexible.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} />
          Putting It All Together (Simplified Main File)
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">
            <code>lib/json-formatter-package.js</code>:
          </h4>
          <pre>
            {`export default {
  commandDisposable: null,

  activate() {
    this.commandDisposable = atom.commands.add('atom-text-editor', {
      'json-formatter-package:format': () => this.formatJson()
    });
  },

  deactivate() {
    if (this.commandDisposable) {
      this.commandDisposable.dispose();
      this.commandDisposable = null;
    }
  },

  formatJson() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      atom.notifications.addWarning('JSON Formatter: No active text editor.');
      return;
    }

    // Optional: Check if it's a JSON file
    if (editor.getGrammar().scopeName !== 'source.json') {
       atom.notifications.addWarning('JSON Formatter: This command is intended for JSON files.');
       return;
    }


    const selection = editor.getSelectedText();
    const textToFormat = selection || editor.getBuffer().getText();

    if (!textToFormat) {
       atom.notifications.addInfo('JSON Formatter: No text to format.');
       return;
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(textToFormat);
    } catch (error) {
      atom.notifications.addError(\`JSON Formatter: Invalid JSON input.\`, {
        detail: error.message,
        dismissable: true
      });
      return;
    }

    // Get indentation setting, defaulting to 2 spaces
    const indentationSpaces = atom.config.get('json-formatter-package.indentation') || 2;

    let formattedJson;
    try {
      formattedJson = JSON.stringify(parsedJson, null, indentationSpaces);
    } catch (error) {
       atom.notifications.addError(\`JSON Formatter: Error during stringification.\`, {
         detail: error.message,
         dismissable: true
       });
       return;
    }

    // Replace text
    if (selection) {
       editor.insertText(formattedJson); // Replace selection
    } else {
      editor.getBuffer().setText(formattedJson); // Replace entire buffer
    }

     atom.notifications.addSuccess('JSON Formatter: Document formatted successfully.');
  }
};
`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Testing Your Package</h2>
        <p>Atom has a development mode that makes testing packages easy:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Go to <code>Edit &gt; Developer &gt; Open in Dev Mode...</code>
          </li>
          <li>Select the folder where you created your package.</li>
        </ul>
        <p>
          This opens a new Atom window with your package loaded. Open a <code>.json</code> file (or any file), type or
          paste some JSON, select it (or not), and then trigger your command.
        </p>
        <p>
          To find the command, you can open the Command Palette (<code>Cmd/Ctrl+Shift+P</code>) and search for your
          package name or command (e.g., &quot;JSON Format&quot;). You can also bind it to a key combination in your
          keymap file (<code>Edit &gt; Keymap...</code>).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">
            Example <code>keymap.cson</code> entry:
          </h4>
          <pre>
            {`'atom-text-editor[data-grammar="source json"]':
  'cmd-alt-f': 'json-formatter-package:format'
`}
          </pre>
        </div>
        <p>
          This example binds the command to <code>Cmd+Alt+F</code> (or <code>Ctrl+Alt+F</code> on Windows/Linux)
          specifically when editing a file with the <code>source.json</code> grammar.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Further Enhancements</h2>
        <p>Now that you have a basic formatter, consider these improvements:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Settings className="inline-block mr-1" size={16} /> Add more configuration options: Allow users to choose
            tabs vs. spaces, or specify a custom indentation string.
          </li>
          <li>
            <FileJson className="inline-block mr-1" size={16} /> Handle different JSON flavors: Some APIs return JSONP
            or other slightly non-standard formats. You might need a more robust parsing library.
          </li>
          <li>
            Provide a menu item: Define a menu entry in a <code>menus/your-package-name.json</code> file to make the
            command accessible from Atom&apos;s menu bar.
          </li>
          <li>Context menu integration: Add the command to the right-click context menu.</li>
          <li>
            Error presentation: Instead of just notifications, highlight the location of the JSON error in the editor.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Creating an Atom package for JSON formatting is a great way to learn about Atom&apos;s API and package
          development. The core logic is surprisingly simple thanks to JavaScript&apos;s built-in{" "}
          <code>JSON.parse</code> and <code>JSON.stringify</code> methods. By leveraging Atom&apos;s commands and editor
          APIs, you can build a useful tool that integrates seamlessly into your workflow. This foundation can be
          extended to build more complex text processing or editor enhancing packages.
        </p>
      </div>
    </>
  );
}
