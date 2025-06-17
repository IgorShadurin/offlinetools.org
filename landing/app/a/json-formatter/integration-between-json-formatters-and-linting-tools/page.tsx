import type { Metadata } from "next";
import {
  FileCode,
  Wrench,
  CheckCheck,
  Settings,
  RefreshCcw,
  GitCommit,
  Shell,
  Code,
  Hammer,
  BookOpenText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integration Between JSON Formatters and Linting Tools | Offline Tools",
  description:
    "Understand how to integrate JSON formatters like Prettier with linting tools like ESLint and Stylelint for consistent code style and error prevention.",
};

export default function JsonFormatterLintingIntegrationArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileCode className="mr-3 w-8 h-8 text-blue-500" />
        Integration Between JSON Formatters and Linting Tools
      </h1>

      <div className="space-y-6">
        <p>
          In modern software development, maintaining consistent code style and preventing errors are crucial for team
          collaboration and project health. While often associated with programming languages like JavaScript,
          TypeScript, or CSS, these principles are equally important when working with data formats like JSON. JSON
          files, commonly used for configuration, data exchange, and APIs, can also suffer from inconsistent formatting
          and subtle syntax issues.
        </p>
        <p>
          This is where the integration of JSON formatters and linting tools becomes invaluable. By combining their
          powers, you can ensure your JSON data is not only syntactically correct but also beautifully and consistently
          formatted across your entire project.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2 w-6 h-6 text-green-500" />
          What are JSON Formatters?
        </h2>
        <p>
          JSON formatters are tools designed to automatically reformat JSON text according to a set of rules. Their
          primary goal is to ensure consistency in indentation, spacing, line breaks, and quoting. This makes JSON files
          easier to read and reduces visual inconsistencies between different developers&apos; contributions.
        </p>
        <p>Common tasks performed by formatters include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Adding or removing whitespace around keys and values.</li>
          <li>Enforcing consistent indentation (e.g., 2 spaces, 4 spaces, tabs).</li>
          <li>Sorting keys (though not all formatters do this by default).</li>
          <li>Ensuring consistent quoting (e.g., using double quotes for keys).</li>
        </ul>
        <p>
          Popular examples include Prettier (which supports JSON), &#x60;jq&#x60; (often used for formatting), and
          built-in features in many IDEs/editors.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Hammer className="mr-2 w-6 h-6 text-red-500" />
          What are Linting Tools for JSON?
        </h2>
        <p>
          Linting tools analyze JSON code for potential errors, stylistic issues, and adherence to specific standards or
          schemas. Unlike formatters that focus purely on appearance, linters check for semantic or structural problems
          beyond basic syntax validation.
        </p>
        <p>For JSON, linters can check for:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Syntax errors (missing commas, extra commas, incorrect delimiters).</li>
          <li>Duplicate keys within an object.</li>
          <li>Adherence to a JSON Schema.</li>
          <li>Specific value constraints or types.</li>
          <li>Stylistic preferences (though this is where conflict with formatters can arise).</li>
        </ul>
        <p>
          Examples include &#x60;jsonlint&#x60;, linters built into tools like ESLint (with plugins), and validation
          libraries used programmatically.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 w-6 h-6 text-yellow-500" />
          Why Integrate? The Problem and the Solution
        </h2>
        <p>
          Using a formatter and a linter independently might seem sufficient, but it often leads to conflicts. A linter
          might complain about formatting style (e.g., require single quotes or specific spacing) while a formatter
          automatically changes it to its preferred style (e.g., double quotes or different spacing). This results in:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Wasted developer time fixing lint errors that the formatter will just reintroduce.</li>
          <li>Constant back-and-forth changes in version control.</li>
          <li>Frustration and inconsistency.</li>
        </ul>
        <p>
          The solution is integration. By configuring your linter to *not* check for formatting rules that your
          formatter already handles, or by having the linter run the formatter as part of its fix process, you achieve a
          harmonious workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-2 w-6 h-6 text-purple-500" />
          Benefits of Integration
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Consistent Formatting:</strong> Every JSON file adheres to the same style rules, regardless of who
            formatted it.
          </li>
          <li>
            <strong>Reduced Conflicts:</strong> Linter and formatter rules don&apos;t fight each other.
          </li>
          <li>
            <strong>Automated Fixes:</strong> Many linters can automatically fix formatting issues delegated to the
            formatter.
          </li>
          <li>
            <strong>Improved Readability:</strong> Consistent style makes codebases easier to navigate and understand.
          </li>
          <li>
            <strong>Prevents Errors:</strong> Linters catch syntax and structural errors before runtime.
          </li>
          <li>
            <strong>Faster Code Reviews:</strong> Reviewers can focus on logic and data structure rather than style
            arguments.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 w-6 h-6 text-orange-500" />
          Common Integration Strategies and Examples
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 w-5 h-5 text-orange-500" />
          1. Using a Formatter that Integrates with Linters (e.g., Prettier with ESLint)
        </h3>
        <p>
          Prettier is a popular code formatter that has excellent integration with linters like ESLint and Stylelint.
          The strategy is to use Prettier for formatting and ESLint/Stylelint for code quality and potential errors,
          disabling any formatting rules within the linter that conflict with Prettier.
        </p>
        <p>Steps:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Install Prettier and relevant plugins (like &#x60;eslint-config-prettier&#x60;).</li>
          <li>Configure Prettier (e.g., &#x60;.prettierrc&#x60;).</li>
          <li>
            Configure ESLint (e.g., &#x60;.eslintrc&#x60;) to extend &#x60;prettier&#x60;, which disables conflicting
            rules.
          </li>
          <li>Use Prettier to format files (manually, on save, or via a script).</li>
          <li>Use ESLint to lint files for non-formatting issues.</li>
        </ol>
        <p>
          Example &#x60;.eslintrc.js&#x60; snippet for integrating with Prettier (assuming you have an existing ESLint
          config):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">.eslintrc.js</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`module.exports = {
  // ... other ESLint configurations
  extends: [
    'eslint:recommended',
    // ... other extends
    'prettier' // Ensures Prettier rules override/disable conflicting ESLint rules
  ],
  plugins: [
    // ... other plugins
    // You might need an eslint plugin for JSON if using ESLint for JSON linting
    // e.g., '@next/eslint-plugin-next' often handles package.json implicitly
    // Or a dedicated JSON plugin: 'json' or 'jsonc'
  ],
  // Optional: Add specific configurations for JSON files
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      parser: 'jsonc-eslint-parser', // Requires jsonc-eslint-parser
      rules: {
        // Add JSON-specific linting rules here that Prettier doesn't handle
        // For example, disallowing duplicate keys (often handled by the parser)
        // Or custom rules based on JSON Schema if using a plugin for that
        // 'json/*': ['error', &#x7b; ... &#x7d;] if using eslint-plugin-json
      }
    }
  ],
  rules: {
    // ... your specific ESLint rules for code
    // Formatting rules are now handled by Prettier via 'extends: ["prettier"]'
  }
};`}
            </pre>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Note: You might need plugins like &#x60;eslint-plugin-json&#x60; or &#x60;eslint-plugin-jsonc&#x60; and
            parser &#x60;jsonc-eslint-parser&#x60; for comprehensive JSON linting with ESLint.
          </p>
        </div>
        <p>
          With this setup, you run &#x60;prettier --write .&#x60; to format all files (including JSON), and &#x60;eslint
          .&#x60; to find errors.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Shell className="mr-2 w-5 h-5 text-orange-500" />
          2. Using Dedicated JSON Tools in a Script or Workflow
        </h3>
        <p>
          For projects that don&apos;t use a general code linter like ESLint, or for specific JSON validation needs
          (like against a schema), you might use dedicated JSON tools.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            &#x60;jsonlint&#x60;: A simple command-line tool for validating JSON syntax. It doesn&apos;t format but
            catches errors.
          </li>
          <li>
            &#x60;jq&#x60;: A powerful command-line JSON processor. Can be used for formatting (&#x60;jq .
            file.json&#x60;), but also for querying and manipulating JSON data.
          </li>
          <li>Tools for JSON Schema validation (e.g., &#x60;ajv&#x60; or command-line wrappers).</li>
        </ul>
        <p>Integration here usually involves scripting. You might have a script that first validates, then formats.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Script (&#x60;check-json.sh&#x60;)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`#!/bin/bash

JSON_FILES=$(find . -name "*.json" -not -path "./node_modules/*")

echo "Validating JSON syntax..."
for f in $JSON_FILES; do
  echo "Checking syntax: $f"
  jsonlint "$f" || exit 1
done
echo "Syntax validation complete."

echo "Formatting JSON files with jq..."
# Use a temporary file to avoid issues with in-place formatting
for f in $JSON_FILES; do
  echo "Formatting: $f"
  if jq . "$f" > "&\#x7b;f&\#x7d;.tmp"; then
    mv "&\#x7b;f&\#x7d;.tmp" "$f"
  else
    echo "Error formatting $f with jq."
    rm -f "&\#x7b;f&\#x7d;.tmp" # Clean up temp file
    exit 1
  fi
done
echo "Formatting complete."

# Add commands here for schema validation if needed
# e.g., run a script that uses ajv or another validator

echo "JSON checks passed."`}
            </pre>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            This script first checks syntax using &#x60;jsonlint&#x60;, then formats using &#x60;jq&#x60;. It exits
            early if any step fails.
          </p>
        </div>
        <p>This approach gives you fine-grained control but requires more manual setup and scripting.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <BookOpenText className="mr-2 w-5 h-5 text-orange-500" />
          3. Using IDE/Editor Extensions
        </h3>
        <p>
          Most modern IDEs and text editors (VS Code, WebStorm, etc.) have extensions that integrate formatters and
          linters directly into your workflow. You can often configure them to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Format JSON on save using Prettier or a built-in formatter.</li>
          <li>Show linter errors directly in the editor.</li>
          <li>Automatically fix certain lint issues on save.</li>
        </ul>
        <p>
          This provides immediate feedback and automation as you type, which is highly efficient. Ensure your
          editor&apos;s configuration aligns with your project&apos;s config files (&#x60;.prettierrc&#x60;,
          &#x60;.eslintrc&#x60;, etc.) to avoid inconsistencies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <RefreshCcw className="mr-2 w-6 h-6 text-blue-500" />
          Automating the Workflow (Pre-commit Hooks)
        </h2>
        <p>
          To ensure that no unformatted or invalid JSON makes it into your version control (like Git), you can automate
          these checks using pre-commit hooks. Tools like Husky and &#x60;lint-staged&#x60; are excellent for this.
        </p>
        <p>
          <span className="font-semibold">Husky</span> allows you to run scripts at various Git hook stages (like
          &#x60;pre-commit&#x60;). <span className="font-semibold">lint-staged</span> allows you to run commands
          specifically on the files staged for commit.
        </p>
        <p>Steps:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Install Husky and &#x60;lint-staged&#x60;.</li>
          <li>Configure Husky to run &#x60;lint-staged&#x60; on &#x60;pre-commit&#x60;.</li>
          <li>
            Configure &#x60;lint-staged&#x60; in your &#x60;package.json&#x60; to run your formatter (e.g.,
            &#x60;prettier --write&#x60;) and linter (e.g., &#x60;eslint --fix&#x60;) on staged JSON files.
          </li>
        </ol>
        <p>Example &#x60;package.json&#x60; snippet:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">package.json</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "my-project",
  "version": "1.0.0",
  // ... other fields
  "scripts": {
    "format": "prettier --write \\"**/*.&\#x7b;js,jsx,ts,tsx,json,css,md&\#x7d;\\"",
    "lint": "eslint \\"**/*.&\#x7b;js,jsx,ts,tsx&\#x7d;\\" --ignore-path .gitignore",
    "lint:json": "eslint \\"**/*.json\\" --ignore-path .gitignore"
    // Or if using jsonlint/jq:
    // "lint:json": "./scripts/check-json.sh"
  },
  "devDependencies": {
    "prettier": "^3.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "jsonc-eslint-parser": "^3.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^14.0.0",
    // potentially jsonlint, jq if needed for scripts
    "jsonlint": "^1.6.3"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    // Run Prettier on all staged files that it handles
    "**/*.&\#x7b;js,jsx,ts,tsx,css,md&\#x7d;": [
      "eslint --fix --max-warnings=0", // Only lint/fix code files with ESLint
      "prettier --write"
    ],
    // Specifically handle JSON files
    "**/*.json": [
      "eslint --fix --max-warnings=0", // Or use your dedicated JSON lint command
      "prettier --write"               // Ensure JSON is formatted
    ]
    // If using jsonlint/jq, it might look like this:
    // "**/*.json": [
    //  "./scripts/check-json.sh" // Runs validation and formatting
    // ]
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          This setup ensures that when a developer attempts to commit changes, &#x60;lint-staged&#x60; runs the
          specified commands only on the files they&apos;ve staged. Prettier formats the JSON (and other files), and the
          linter checks for other issues. If any lint error is found (that wasn&apos;t fixed by &#x60;--fix&#x60;), the
          commit is blocked, preventing malformed JSON from entering the repository.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <GitCommit className="mr-2 w-6 h-6 text-teal-500" />
          Conclusion
        </h2>
        <p>
          Integrating JSON formatters and linting tools is a powerful practice for any project that deals with JSON
          data. It moves the focus from manual style adherence and basic error hunting to automated consistency and
          validation. By leveraging tools like Prettier, ESLint (with appropriate plugins/configs), or dedicated JSON
          utilities within automated workflows like pre-commit hooks, teams can save time, reduce friction, and maintain
          a cleaner, more reliable codebase. Embrace this integration to make working with JSON a smoother experience
          for everyone involved.
        </p>
      </div>
    </div>
  );
}
