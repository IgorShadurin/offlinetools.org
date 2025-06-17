import type { Metadata } from "next";
import {
  CodeXml,
  Palette,
  Settings,
  Package,
  Check,
  Sparkles,
  FileJson,
  Wrench,
  TestTube,
  Upload,
  ListTodo,
  Github,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating VS Code Extensions for JSON Formatting",
  description:
    "A comprehensive guide for developers of all levels on how to build Visual Studio Code extensions for formatting JSON documents.",
};

export default function JsonFormattingExtensionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <CodeXml className="w-8 h-8" /> Creating VS Code Extensions for JSON Formatting
      </h1>

      <div className="space-y-8">
        <p>
          Visual Studio Code is a powerful and popular editor, extensible in many ways. One common task developers need
          assistance with is formatting structured data like JSON. While VS Code includes a built-in JSON formatter, you
          might encounter scenarios where you need custom formatting rules, integration with specific tools, or
          different default settings. This guide will walk you through the process of building your own VS Code
          extension specifically for formatting JSON documents.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6" /> Understanding VS Code Extensions
        </h2>
        <p>
          A VS Code extension is essentially a Node.js application that runs in a separate process, called the Extension
          Host. It communicates with the main VS Code window (the Renderer process) via a well-defined API. The core of
          any extension is:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>package.json</code>: This is the extension manifest. It declares its name, version, description,
            dependencies, and most importantly, its &quot;contribution points&quot; - how the extension integrates with
            VS Code features (like commands, keybindings, settings, language support, and formatters).
          </li>
          <li>
            <code>extension.ts</code> (or <code>extension.js</code>): This is the main code file containing the
            extension&apos;s logic. It exports an <code>activate</code> function which is called when the extension is
            enabled and ready to run, and an optional <code>deactivate</code> function called when the extension is
            disabled.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> JSON Formatting in VS Code
        </h2>
        <p>
          VS Code allows extensions to register as formatters for specific languages. When a user triggers the format
          action (e.g., Save with format, Shift+Alt+F, or the &quot;Format Document&quot; command), VS Code asks
          registered formatters for the active document&apos;s language if they can handle the request. If multiple
          formatters exist for the same language, the user can choose or configure a default.
        </p>
        <p>
          To provide formatting, your extension needs to implement the{" "}
          <code>vscode.DocumentFormattingEditProvider</code> interface (or <code>RangeFormattingEditProvider</code> for
          formatting selections). The core method you&apos;ll implement is <code>provideDocumentFormattingEdits</code>{" "}
          (or <code>provideDocumentRangeFormattingEdits</code>). This method receives the text document and returns an
          array of <code>vscode.TextEdit</code> objects, which describe the changes to be applied to the document
          (insertions, deletions, or replacements of text).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6" /> Setting up Your Development Environment
        </h2>
        <p>The easiest way to start is by using the Yeoman extension generator for VS Code:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Ensure you have Node.js and npm installed.</li>
          <li>
            Install Yeoman and the VS Code Extension generator globally:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>npm install -g yo generator-code</code>
            </pre>
          </li>
          <li>
            Run the generator:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>yo code</code>
            </pre>
          </li>
          <li>
            Choose &quot;New Extension (TypeScript)&quot; or &quot;New Extension (JavaScript)&quot;. TypeScript is
            recommended for better type safety.
          </li>
          <li>Fill in the project details (name, identifier, description).</li>
          <li>Open the generated folder in VS Code.</li>
        </ol>
        <p>
          The generator creates a basic project structure, including `package.json`, `src/extension.ts`, and
          `tsconfig.json` (if using TypeScript).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTodo className="w-6 h-6" /> Declaring the Formatter in `package.json`
        </h2>
        <p>
          Your extension needs to tell VS Code that it provides formatting capabilities for JSON files. You do this in
          the <code>package.json</code> file under the <code>contributes</code> section. Add a <code>formatters</code>{" "}
          entry like this:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`package.json` (Snippet)</h3>
          <code className="language-json">
            {`{
  "name": "my-json-formatter",
  "displayName": "My JSON Formatter",
  "description": "A custom JSON formatter extension",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": [
    "Formatters"
  ],
  "contributes": {
    "formatters": [
      {
        "language": "json",
        "displayName": "My Custom JSON Formatter"
      },
      {
        "language": "jsonc",
        "displayName": "My Custom JSON Formatter"
      }
    ],
    // ... other contributions like commands, settings, etc.
  },
  "main": "./out/extension.js", // Entry point for JS (if using TS, compile creates out/extension.js)
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "lint": "eslint src --ext ts",
    "test": "jest"
  },
  "devDependencies": {
    // ... dev dependencies
  }
}`}
          </code>
        </pre>
        <p>
          The <code>language</code> property specifies the language identifier (<code>json</code> and <code>jsonc</code>{" "}
          for JSON with comments). The <code>displayName</code> is what appears in the &quot;Format Document
          With...&quot; menu.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette className="w-6 h-6" /> Implementing the Formatter Logic (`extension.ts`)
        </h2>
        <p>
          Now, write the code that performs the formatting in your <code>extension.ts</code> file. You&apos;ll need to:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Import the <code>vscode</code> module.
          </li>
          <li>
            Define a class or object that implements <code>vscode.DocumentFormattingEditProvider</code>.
          </li>
          <li>
            Implement the <code>provideDocumentFormattingEdits</code> method.
          </li>
          <li>
            Inside <code>activate</code>, register your provider using{" "}
            <code>vscode.languages.registerDocumentFormattingEditProvider</code>.
          </li>
        </ol>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`src/extension.ts` (Basic Structure)</h3>
          <code className="language-typescript">
            {`import * as vscode from 'vscode';

// Implement the formatting provider
class JsonFormatter implements vscode.DocumentFormattingEditProvider {
  // This method is called when the document is formatted
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions, // Contains info like indentation (spaces or tabs, size)
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {

    const text = document.getText();
    let formattedText: string;

    try {
      // --- Formatting Logic Goes Here ---
      // A simple example: parse and stringify to re-indent
      const parsed = JSON.parse(text);
      // Use options.tabSize and options.insertSpaces for indentation
      const indent = options.insertSpaces ? ' '.repeat(options.tabSize) : '\\t';
      formattedText = JSON.stringify(parsed, null, indent);
      // --- End Formatting Logic ---

    } catch (e: any) {
      // Handle parsing errors gracefully
      console.error("JSON formatting error:", e.message);
      vscode.window.showErrorMessage(\`Failed to format JSON: \${e.message}\`);
      return []; // Return empty array if formatting fails
    }


    // Create a TextEdit to replace the entire document content with the formatted text
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );

    return [vscode.TextEdit.replace(fullRange, formattedText)];
  }
}

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, "my-json-formatter" is now active!');

  // Create an instance of your formatter
  const formatter = new JsonFormatter();

  // Register the formatter for JSON and JSONC languages
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('json', formatter)
  );
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('jsonc', formatter)
  );

  // You can also register range formatters if needed
  // context.subscriptions.push(
  //   vscode.languages.registerDocumentRangeFormattingEditProvider('json', formatter)
  // );
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('"my-json-formatter" is now deactivated!');
}
`}
          </code>
        </pre>
        <p>
          <Sparkles className="inline-block mr-1" /> In the example above, the formatting logic is very basic: it uses{" "}
          <code>JSON.parse</code> and <code>JSON.stringify</code>. For a real-world extension, you would likely use a
          more robust library like{" "}
          <a href="https://prettier.io/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Prettier
          </a>
          ,{" "}
          <a
            href="https://github.com/HookyQR/VSCode-JS-CSS-HTML-Formatter"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            js-beautify
          </a>
          , or a custom parser/formatter to handle specific requirements not covered by the built-in{" "}
          <code>JSON.stringify</code> (like sorting keys, specific line breaks, etc.).
        </p>
        <p>
          The <code>vscode.TextEdit.replace(fullRange, formattedText)</code> part is crucial. It tells VS Code to
          replace the entire content of the document (from start to end) with the new <code>formattedText</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TestTube className="w-6 h-6" /> Testing and Debugging
        </h2>
        <p>VS Code provides an &quot;Extension Host Development&quot; window to test your extension.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open your extension project folder in VS Code.</li>
          <li>Go to the &quot;Run and Debug&quot; view (Ctrl+Shift+D or Cmd+Shift+D).</li>
          <li>Select the &quot;Run Extension&quot; launch configuration (usually created by the generator).</li>
          <li>Click the green play button.</li>
        </ol>
        <p>This will open a new VS Code window (the Extension Host). In this new window:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Open a JSON file.</li>
          <li>
            The <code>console.log</code> messages from your extension will appear in the &quot;Debug Console&quot; back
            in your original VS Code window.
          </li>
          <li>
            Trigger the format action (e.g., right-click in the editor and select &quot;Format Document&quot;, or use
            the keybinding). If multiple formatters are registered, you might be prompted to choose or can select
            &quot;Format Document With...&quot; to pick yours.
          </li>
          <li>
            Set breakpoints in your <code>extension.ts</code> code in the original window to step through the logic when
            formatting is triggered.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Adding Configuration
        </h2>
        <p>
          A good formatter often provides configuration options (e.g., indentation style, quote style, sorting keys).
          You can add settings to your extension by defining them in <code>package.json</code> under the{" "}
          <code>contributes.configuration</code> section.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`package.json` (Adding Configuration)</h3>
          <code className="language-json">
            {`{
  // ... existing package.json content
  "contributes": {
    "formatters": [
      // ... formatter declaration
    ],
    "configuration": {
      "title": "My JSON Formatter Configuration",
      "properties": {
        "myJsonFormatter.spaceIndentation": {
          "type": "number",
          "default": 2,
          "description": "Number of spaces for indentation. Set to 0 for tabs."
        },
        "myJsonFormatter.sortKeys": {
          "type": "boolean",
          "default": false,
          "description": "Sort object keys alphabetically."
        }
      }
    }
  },
  // ... rest of package.json
}`}
          </code>
        </pre>
        <p>
          Then, in your <code>extension.ts</code>, you can read these settings using{" "}
          <code>vscode.workspace.getConfiguration(&apos;myJsonFormatter&apos;)</code>.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">`src/extension.ts` (Reading Configuration)</h3>
          <code className="language-typescript">
            {`// Inside JsonFormatter class or provideDocumentFormattingEdits method:
const config = vscode.workspace.getConfiguration('myJsonFormatter');
const spaceIndentation = config.get<number>('spaceIndentation', 2); // Get setting, default to 2
const sortKeys = config.get<boolean>('sortKeys', false); // Get setting, default to false

// Use spaceIndentation and sortKeys in your formatting logic
let indent = ' '.repeat(spaceIndentation);
if (spaceIndentation <= 0) {
    indent = '\\t'; // Use tab if 0 or less spaces configured
}

// If sortKeys is true, you'd need a custom stringify function or library
// JSON.stringify doesn't sort keys by default.
// const parsed = JSON.parse(text);
// ... your logic here potentially sorting keys before stringify ...
// const formattedText = JSON.stringify(parsed, null, indent);
`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Upload className="w-6 h-6" /> Publishing Your Extension
        </h2>
        <p>
          Once your extension is ready, you can publish it to the VS Code Marketplace using the <code>vsce</code> tool.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Install <code>vsce</code> globally:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>npm install -g vsce</code>
            </pre>
          </li>
          <li>Get a Personal Access Token (PAT) from Azure DevOps with permissions to manage VS Code extensions.</li>
          <li>
            Create a publisher:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce create-publisher &lt;publisher-name&gt;</code>
            </pre>
            (You&apos;ll be prompted for your PAT).
          </li>
          <li>
            Package your extension from your project root:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce package</code>
            </pre>
            This creates a <code>.vsix</code> file.
          </li>
          <li>
            Publish the extension:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce publish</code>
            </pre>
            Or to publish a specific vsix file:
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto my-2">
              <code>vsce publish -p &lt;your-pat&gt;</code>
            </pre>
            (Replace <code>&lt;your-pat&gt;</code> with your actual token or set the <code>VSCE_PAT</code> environment
            variable).
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6" /> Best Practices and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Performance:</strong> For very large JSON files, standard <code>JSON.parse</code> and{" "}
            <code>JSON.stringify</code> might be slow. Consider streaming parsers/formatters if performance is critical.
            Formatting should be fast enough not to block the UI.
          </li>
          <li>
            <strong>Error Handling:</strong> Robustly handle invalid JSON input. Your formatter should catch parsing
            errors and ideally report them to the user without crashing the extension host. Returning an empty array of
            edits on error is a common pattern.
          </li>
          <li>
            <strong>Configuration:</strong> Provide clear and intuitive settings. Use the configuration contribution
            point in <code>package.json</code> and document them in your extension&apos;s README.
          </li>
          <li>
            <strong>Dependencies:</strong> If using external formatting libraries, be mindful of their size and
            potential compatibility issues.
          </li>
          <li>
            <strong>Localization:</strong> If you plan for international users, consider using VS Code&apos;s
            localization features.
          </li>
          <li>
            <strong>README:</strong> Write a clear README.md file explaining what your extension does, how to install
            and use it, configuration options, and any known issues.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Github className="w-6 h-6" /> Further Exploration
        </h2>
        <p>The VS Code API is extensive. You could enhance your formatter extension by adding:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Commands to format specific selections or apply different formatting styles.</li>
          <li>Code Actions to fix minor JSON issues before formatting.</li>
          <li>Integration with task runners or build systems.</li>
          <li>Status bar items to show formatter status.</li>
        </ul>
        <p>
          Exploring the{" "}
          <a href="https://code.visualstudio.com/api" className="text-blue-600 dark:text-blue-400 hover:underline">
            VS Code Extension API documentation
          </a>{" "}
          and looking at the source code of other formatter extensions (like Prettier or specific language formatters)
          on{" "}
          <a href="https://github.com/" className="text-blue-600 dark:text-blue-400 hover:underline">
            GitHub
          </a>{" "}
          can provide deeper insights and examples.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a VS Code extension for JSON formatting is a practical way to learn about VS Code extensibility and
          provide a useful tool for yourself and the community. By understanding the core concepts of contribution
          points and API providers, you can tailor the editor&apos;s behavior to your specific JSON formatting needs,
          moving beyond the default capabilities. Happy coding and formatting!
        </p>
      </div>
    </>
  );
}
