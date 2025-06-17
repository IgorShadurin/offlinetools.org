import type { Metadata } from "next";
import { Cog, FileJson2, Settings, CheckCheck, FileCode2, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Development Environment JSON Formatter Configuration",
  description:
    "Learn how to configure JSON formatters in your development environment (Editors, Formatters, Linters) for consistent and readable code.",
};

export default function JsonFormatterConfigurationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Cog size={32} /> Development Environment JSON Formatter Configuration
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used extensively in web development for APIs,
          configuration files, data storage, and more. While its structure is simple, inconsistent formatting (like
          varying indentation, spacing, or newline usage) within JSON files can quickly make them hard to read,
          difficult to compare in version control, and prone to frustrating merge conflicts.
        </p>
        <p>
          Configuring a JSON formatter in your development environment is a straightforward process that pays
          significant dividends in code consistency and developer productivity. This article will guide you through
          setting up formatting for JSON files using common tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 size={24} /> Why Configure JSON Formatting?
        </h2>
        <p>Consistent formatting isn&apos;t just about aesthetics; it has practical benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Uniform indentation and spacing make it easier to parse the structure of
            complex JSON objects and arrays at a glance.
          </li>
          <li>
            <strong>Consistency:</strong> Ensures all JSON files across a project adhere to the same style, regardless
            of who authored them.
          </li>
          <li>
            <strong>Reduced Merge Conflicts:</strong> Fewer unnecessary line changes due to formatting differences mean
            smoother merges and less time spent resolving conflicts.
          </li>{" "}
          {/* Added the missing closing </li> tag here */}
          <li>
            <strong>Easier Debugging:</strong> A well-formatted file helps quickly identify missing commas, mismatched
            braces, or other syntax errors.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings size={24} /> Tools for Formatting JSON
        </h2>
        <p>
          JSON formatting is typically handled by your code editor/IDE or dedicated code formatters. Linters can also
          play a role in validating the format or style, although they primarily focus on code quality and potential
          errors.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Code Editors/IDEs:</strong> Most modern editors like VS Code, Sublime Text, and JetBrains IDEs have
            built-in JSON formatting capabilities or extensions. These are often configured via editor-specific
            settings.
          </li>
          <li>
            <strong>Code Formatters:</strong> Tools like Prettier are designed to enforce a consistent style across
            various file types, including JSON, YAML, Markdown, and code languages. They are often integrated into
            editors or run as command-line tools.
          </li>
          <li>
            <strong>Linters (e.g., ESLint with plugins):</strong> While primarily for code analysis, some linters or
            their plugins can validate JSON syntax or enforce basic style rules, though they are less comprehensive for
            formatting than dedicated formatters.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck size={24} /> Core JSON Formatting Concepts
        </h2>
        <p>The key aspects of JSON formatting that you&apos;ll typically configure are:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Indentation:</strong> How many spaces or tabs are used for each level of nesting? Common choices are
            2 spaces, 4 spaces, or 1 tab. Spaces are generally preferred for consistency across different environments.
          </li>
          <li>
            <strong>Whitespace:</strong> Spacing around colons (`:`) separating keys and values, and after commas (`,`)
            separating items in arrays or key-value pairs in objects.
          </li>
          <li>
            <strong>Newlines:</strong> Whether objects and arrays are spread across multiple lines with indentation or
            kept on a single line if they are short (though this is less common to configure for pure JSON compared to
            code).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileCode2 size={24} /> Configuration Examples
        </h2>

        <h3 className="text-xl font-semibold mt-6">VS Code Configuration</h3>
        <p>
          VS Code has built-in JSON formatting. You can configure its behavior in your User Settings (`settings.json`)
          or Workspace Settings (`.vscode/settings.json` in your project root). Workspace settings override user
          settings and are recommended for project-specific consistency.
        </p>
        <p>
          Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type &quot;Open Workspace Settings
          (JSON)&quot;. Add or modify entries like these:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>.vscode/settings.json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  // Use default formatter for JSON files
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode", // Or VS Code's built-in formatter
    "editor.tabSize": 2,      // Use 2 spaces for tabs
    "editor.insertSpaces": true, // Insert spaces when pressing Tab
    "editor.detectIndentation": false, // Do not guess indentation based on file content
    "editor.formatOnSave": true // Format file on save
  },
  "[jsonc]": { // For JSON with comments (like tsconfig.json, launch.json)
    "editor.defaultFormatter": "esbenp.prettier-vscode", // Or VS Code's built-in formatter
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "editor.formatOnSave": true
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>Note:</em> <code>esbenp.prettier-vscode</code> is the extension ID for Prettier in VS Code. If you use
            the built-in formatter, you don&apos;t need the <code>&quot;editor.defaultFormatter&quot;</code> line or can
            set it to <code>&quot;vscode.json-language-features&quot;</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Prettier Configuration</h3>
        <p>
          Prettier is a popular opinionated code formatter that supports JSON out of the box. You can configure
          Prettier&apos;s behavior using a configuration file (e.g., <code>.prettierrc.json</code>,
          <code>.prettierrc.js</code>, <code>.prettierrc.yaml</code>) in your project root.
        </p>
        <p>
          Here&apos;s an example using a <code>.prettierrc.json</code> file:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>.prettierrc.json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "tabWidth": 2,         // Use 2 spaces for indentation
  "useTabs": false,      // Use spaces instead of tabs
  "printWidth": 80,      // Wrap lines after 80 characters (can be useful for readability)
  "trailingComma": "none", // Do not add trailing commas (JSON standard)
  "semi": true,          // Add semicolons at the end of statements (doesn't affect JSON directly)
  "singleQuote": false,  // Use double quotes for strings (JSON requires double quotes)
  "bracketSpacing": true // Add spaces inside curly braces and brackets
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>Note:</em> Prettier respects the JSON standard, which means it will always use double quotes for keys
            and string values and will not add trailing commas by default unless configured otherwise for specific file
            types (which doesn&apos;t apply to standard JSON). The <code>tabWidth</code> and
            <code>useTabs</code> are the primary settings affecting JSON indentation.
          </p>
        </div>
        <p>
          Once configured, you can integrate Prettier with your editor (like the VS Code extension mentioned above) or
          run it from the command line:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Format a specific JSON file
prettier --write path/to/your/file.json

# Format all JSON files in a directory
prettier --write "**/*.json"`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Advanced Considerations & Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Editor Defaults vs. Project Config:</strong> Relying solely on editor default settings can lead to
            inconsistency between developers. Always use project-specific configuration files (like{" "}
            <code>.vscode/settings.json</code> or <code>.prettierrc</code>) checked into version control.
          </li>
          <li>
            <strong>Format on Save:</strong> Configure your editor to automatically format JSON files when you save.
            This is the easiest way to ensure consistency without manual steps.
          </li>
          <li>
            <strong>Pre-commit Hooks:</strong> For stricter enforcement, consider using tools like Husky with linters or
            formatters to automatically check or format files before they are committed to the repository. This prevents
            improperly formatted JSON from ever entering the codebase.
          </li>
          <li>
            <strong>JSON with Comments (JSONC):</strong> Files like <code>tsconfig.json</code> or
            <code>launch.json</code> in VS Code are often JSONC, which allows comments. Ensure your formatter/editor is
            configured to handle <code>.jsonc</code> files correctly if you use them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Configuring JSON formatting in your development environment is a simple yet effective step towards maintaining
          a clean, readable, and consistent codebase. By leveraging built-in editor features or integrating dedicated
          formatters like Prettier, you can automate the process and significantly reduce potential headaches associated
          with manual formatting and merge conflicts. Take a few minutes to set this up for your projects, and your
          future self (and your teammates) will thank you.
        </p>
      </div>
    </>
  );
}
