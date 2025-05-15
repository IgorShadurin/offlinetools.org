import type { Metadata } from "next";
import { FileJson2, GitCommitHorizontal, Check, ShieldCheck, Settings } from "lucide-react"; // Using allowed icons and correcting icon name

export const metadata: Metadata = {
  title: "Integrating JSON Validation with Git Pre-Commit Hooks | Offline Tools",
  description:
    "Learn how to enforce JSON syntax and schema validation automatically using Git pre-commit hooks to prevent invalid configurations from entering your repository.",
};

export default function JsonValidationPreCommitHookArticle() {
  // Component should not accept any props or data and does not use useState
  // This is a server component for a Next.js backend page

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="w-8 h-8 text-blue-500" />
        Integrating JSON Validation with Git Pre-Commit Hooks
      </h1>

      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
        <p>
          Configuration files, translations, API response examples – JSON is everywhere in modern development. Keeping these files consistent and valid is crucial for project stability and developer sanity. An invalid JSON file can lead to runtime errors, deployment failures, or subtle bugs that are hard to track down.
        </p>
        <p>
          Catching these errors as early as possible in the development lifecycle is key. One of the most effective ways to do this is by integrating JSON validation directly into your Git workflow using <strong>pre-commit hooks</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <GitCommitHorizontal className="w-6 h-6 text-green-500" />
          Why Git Pre-Commit Hooks?
        </h2>
        <p>
          Git hooks are scripts that Git executes before or after events like commit, push, and receive. Pre-commit hooks run *before* the commit process finishes. If a pre-commit script exits with a non-zero status, Git aborts the commit. This provides a perfect opportunity to run automated checks on your code (or data files) and prevent commits that fail those checks.
        </p>
        <p>
          Using a pre-commit hook for JSON validation means:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <ShieldCheck className="inline-block w-5 h-5 mr-1 text-yellow-500" />
            <strong>Proactive Error Prevention:</strong> You catch validation errors before they even make it into your commit history or reach shared branches.
          </li>
          <li>
            <GitCommitHorizontal className="inline-block w-5 h-5 mr-1 text-purple-500" />
            <strong>Consistent Codebase:</strong> Ensures that all JSON files across the project adhere to defined standards and syntax rules.
          </li>
          <li>
            <Check className="inline-block w-5 h-5 mr-1 text-blue-500" />
            <strong>Faster Feedback Loop:</strong> Developers get immediate feedback if their JSON changes are invalid, without needing to wait for CI/CD pipelines.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <FileJson2 className="w-6 h-6 text-orange-500" />
          Why Validate JSON? Syntax vs. Schema
        </h2>
        <p>
          JSON validation typically falls into two categories:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Syntax Validation:</strong> This is the most basic check. It ensures that the file content follows the fundamental rules of the JSON format (correct use of braces <code>&#x7b;&#x7d;</code>, brackets <code>[</code>], commas <code>,</code>, colons <code>:</code>, string quoting, etc.). An invalid JSON file is fundamentally unreadable by JSON parsers.
          </li>
          <li>
            <strong>Schema Validation:</strong> This goes beyond basic syntax. It checks if the JSON data conforms to a predefined structure or "schema". A schema specifies things like:
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>Which keys are required?</li>
              <li>What data types should values have (string, number, boolean, array, object)?</li>
              <li>What are the valid values for a specific key (e.g., from an enum list)?</li>
              <li>How should arrays or objects be structured?</li>
            </ul>
            Schema validation is crucial for complex configuration or data files where specific structure and types are expected.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-500" /> {/* Replaced Tools with Settings */}
          Tools for the Job
        </h2>
        <p>
          You'll need a few tools:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>JSON Validator:</strong> A command-line tool to check JSON syntax. Examples include <code>jsonlint</code>, <code>jq</code> (can be used for basic validation), or built-in options in some environments (like Node.js <code>JSON.parse</code>).
          </li>
          <li>
            <strong>JSON Schema Validator (Optional but recommended):</strong> A tool that validates a JSON file against a JSON Schema. Examples include <code>ajv-cli</code> (for JavaScript/Node.js), <code>json-schema-validator</code> (Python), etc.
          </li>
          <li>
            <strong>Git Hook Manager (Recommended):</strong> While you can write shell scripts directly in the <code>.git/hooks/pre-commit</code> file, managing hooks across a team is easier with tools like <code>husky</code> (for Node.js projects), <code>pre-commit</code> (Python-based, general purpose), or <code>lefthook</code>. These tools make hooks version-controlled and shareable.
          </li>
          <li>
            <strong>Staged File Filter (with Hook Manager):</strong> Tools like <code>lint-staged</code> (often used with Husky) allow you to run commands only on the files that are currently staged for commit, which is much more efficient than checking every file in the repository.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Method 1: Simple Syntax Validation Hook
        </h2>
        <p>
          Let's start with a basic hook script that checks only the syntax of staged JSON files. We'll use <code>jsonlint</code> as an example validator.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Installation</h3>
        <p>
          Install <code>jsonlint</code> globally or as a dev dependency in your project:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`npm install -g jsonlint`}
          </pre>
        </div>
        <p>or</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`npm install --save-dev jsonlint`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Manual Hook Script (.git/hooks/pre-commit)</h3>
        <p>
          Navigate to your project's <code>.git/hooks/</code> directory. Create a file named <code>pre-commit</code> (if it doesn't exist) and make it executable (<code>chmod +x .git/hooks/pre-commit</code>). Add the following script:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`#!/bin/sh

# Get a list of staged JSON files
JSON_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\\\\.json')

# Check if any JSON files are staged
if [ -z "$JSON_FILES" ]; then
  echo "No JSON files staged. Skipping JSON syntax validation."
  exit 0 # Exit successfully if no JSON files
fi

echo "Running JSON syntax validation on staged files..."

# Loop through each staged JSON file and validate
for file in $JSON_FILES; do
  if jsonlint "$file"; then
    echo "  \${file}: PASSED"
  else
    echo "  \${file}: FAILED syntax validation!"
    echo "  Commit aborted."
    exit 1 # Exit with error if validation fails
  fi
done

echo "All staged JSON files passed syntax validation."
exit 0 # Exit successfully if all files pass`}
          </pre>
        </div>
        <p>
          Now, whenever you try to commit, this script will run, check staged <code>.json</code> files with <code>jsonlint</code>, and block the commit if any file has a syntax error.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Method 2: Adding JSON Schema Validation
        </h2>
        <p>
          To enforce structure and data types, you need schema validation. JSON Schema is a powerful standard for this. Let's use <code>ajv-cli</code> as an example.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Installation</h3>
        <p>
          Install <code>ajv-cli</code> and <code>ajv</code> (as a peer dependency):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`npm install --save-dev ajv ajv-cli`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Define Your Schema</h3>
        <p>
          Create a JSON Schema file (e.g., <code>config.schema.json</code>) that describes the structure of your data:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Configuration Settings",
  "description": "Schema for application configuration file",
  "type": "object",
  "properties": {
    "apiEndpoint": {
      "type": "string",
      "format": "url"
    },
    "timeoutSeconds": {
      "type": "integer",
      "minimum": 1,
      "maximum": 300
    },
    "features": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["featureA", "featureB", "featureC"]
      },
      "uniqueItems": true
    },
    "enableCaching": {
      "type": "boolean"
    }
  },
  "required": [
    "apiEndpoint",
    "timeoutSeconds"
  ],
  "additionalProperties": false
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Update the Hook Script</h3>
        <p>
          Modify the <code>.git/hooks/pre-commit</code> script to also run schema validation after syntax check. You'll need to map which JSON files should be validated against which schema.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`#!/bin/sh

# Mapping of JSON files to their schema files
# IMPORTANT: Define your specific file-to-schema mappings here!
declare -A SCHEMA_MAP
SCHEMA_MAP["path/to/your/config.json"]="path/to/your/config.schema.json"
# Add other mappings as needed:
# SCHEMA_MAP["path/to/another/data.json"]="path/to/another/data.schema.json"

# Get a list of staged JSON files that are in the schema map
JSON_FILES_TO_VALIDATE=""
for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\\\\.json'); do
    if [[ -n "\${SCHEMA_MAP["\$file"]}" ]]; then
        JSON_FILES_TO_VALIDATE="$JSON_FILES_TO_VALIDATE $file"
    fi
done

# Check if any relevant JSON files are staged
if [ -z "$JSON_FILES_TO_VALIDATE" ]; then
  echo "No relevant JSON files staged for schema validation. Skipping validation."
  exit 0 # Exit successfully if no relevant JSON files
fi

echo "Running JSON schema validation on staged files..."

# Loop through each relevant staged JSON file and validate against its schema
VALIDATION_FAILED=0
for file in $JSON_FILES_TO_VALIDATE; do
  schema_file="\${SCHEMA_MAP["\$file"]}"

  if [ ! -f "$schema_file" ]; then
    echo "ERROR: Schema file not found for \${file}: \${schema_file}"
    VALIDATION_FAILED=1
    continue # Continue to check other files
  fi

  # Run ajv-cli validation
  # Assumes ajv-cli is available in your PATH (e.g., installed globally or in node_modules/.bin)
  if npx ajv-cli validate -s "$schema_file" -d "$file"; then
    echo "  \${file}: PASSED schema validation."
  else
    echo "  \${file}: FAILED schema validation!"
    VALIDATION_FAILED=1 # Mark failure but continue to check other files
  fi
done

if [ "$VALIDATION_FAILED" -eq 1 ]; then
  echo "JSON schema validation failed for one or more files."
  echo "Commit aborted."
  exit 1
else
  echo "All relevant staged JSON files passed schema validation."
  exit 0
fi`}
          </pre>
        </div>
        <p>
          <strong>Note:</strong> This script assumes <code>ajv-cli</code> is available. Using <code>npx</code> is a common way to run tools installed as dev dependencies in Node.js projects. You must update the <code>SCHEMA_MAP</code> variable to list the JSON files in your project and their corresponding schema files.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Method 3: Using Hook Managers (Husky + Lint-Staged)
        </h2>
        <p>
          Directly modifying <code>.git/hooks/</code> is problematic: hooks are local to your repository clone, not version-controlled by default, and hard to keep consistent across a team. Hook managers solve this. <code>husky</code> and <code>lint-staged</code> are a popular combination for Node.js projects.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Installation</h3>
        <p>
          Install <code>husky</code> and <code>lint-staged</code> as dev dependencies:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`npm install --save-dev husky lint-staged`}
          </pre>
        </div>
        <p>
          Initialize Husky (this sets up the Git hooks pointing to Husky):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`npx husky init`}
          </pre>
        </div>
        <p>
          This creates a <code>.husky</code> directory and a <code>pre-commit</code> file inside it, managed by Husky.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Configuration (package.json)</h3>
        <p>
          Add a <code>lint-staged</code> configuration to your <code>package.json</code>. This specifies commands to run on staged files matching certain glob patterns.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`{
  "name": "your-project",
  "version": "1.0.0",
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "jsonlint": "^1.6.0",
    "ajv": "^8.0.0",
    "ajv-cli": "^5.0.0"
  },
  "scripts": {
    "prepare": "husky install"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.json": [
      "jsonlint --compact", // Basic syntax check
      // Add schema validation for specific files
      // NOTE: Schema validation with lint-staged requires careful scripting
      // as ajv-cli needs the schema path and the file path.
      // You might need a small helper script or map here.
      // Example (conceptual - requires specific implementation):
      // "node scripts/validate-json-schema.js --schema-map config.json:config.schema.json"
    ],
    "path/to/your/config.json": [
       "npx ajv-cli validate -s path/to/your/config.schema.json -d" // Validate this specific file against its schema
    ]
    // Add more specific schema validation rules for other files
    // "path/to/another/*.json": [
    //    "node scripts/validate-dynamic-schema.js --schema-dir schemas/" // Example using a helper script to find schemas
    // ]
  }
}`}
          </pre>
        </div>
        <p>
          In this setup:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>&quot;prepare&quot;: &quot;husky install&quot;</code> ensures Husky is installed when dependencies are installed.
          </li>
          <li>
            <code>&quot;husky&quot;: &#x7b;&quot;hooks&quot;: &#x7b;&quot;pre-commit&quot;: &quot;lint-staged&quot;&#x7d;&#x7d;</code> tells Husky to run <code>lint-staged</code> on pre-commit.
          </li>
          <li>
            <code>&quot;lint-staged&quot;</code> config maps file patterns (e.g., <code>&quot;*.json&quot;</code> or <code>&quot;path/to/your/config.json&quot;</code>) to commands (e.g., <code>&quot;jsonlint --compact&quot;</code> or <code>&quot;npx ajv-cli...&quot;</code>). <code>lint-staged</code> passes the list of staged files matching the pattern to the command.
          </li>
        </ul>
        <p>
          Integrating schema validation for multiple files with <code>lint-staged</code> and <code>ajv-cli</code> can be slightly complex if you have many files each requiring a different schema. You might need a small Node.js or shell script that <code>lint-staged</code> calls, which then iterates through the provided file list and runs <code>ajv-cli</code> with the correct schema for each file based on your mapping logic. The example shows validating a specific file directly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Benefits of Using a Hook Manager
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Version Controlled:</strong> The hook configuration lives in your <code>package.json</code> (or dedicated config files), which is tracked by Git.
          </li>
          <li>
            <strong>Shareable:</strong> All team members get the same hooks automatically when they clone the repository and install dependencies.
          </li>
          <li>
            <strong>Targeted Checks:</strong> <code>lint-staged</code> ensures validation only runs on the files you've modified and staged, making it fast.
          </li>
          <li>
            <strong>Easy Integration:</strong> Works well with other pre-commit checks like linters, formatters, and tests.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Tips and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Performance:</strong> Validation should be fast. Avoid complex or long-running checks in pre-commit hooks, as they can frustrate developers. Validating only staged files (via <code>lint-staged</code> or equivalent) is key for performance.
          </li>
          <li>
            <strong>Error Messages:</strong> Ensure your validation tools provide clear error messages indicating *what* is wrong and *where*. This helps developers fix issues quickly.
          </li>
          <li>
            <strong>Schema Management:</strong> Keep your JSON Schemas well-organized and version-controlled alongside your data files.
          </li>
          <li>
            <strong>Multiple JSON Files:</strong> If your project has many different types of JSON files, each requiring a different schema, careful mapping in your hook script or <code>lint-staged</code> config is needed. A dedicated helper script can simplify this.
          </li>
          <li>
            <strong>Skipping Hooks:</strong> Developers can bypass hooks using <code>git commit --no-verify</code>. While sometimes necessary, this should be discouraged for regular commits, especially on shared branches.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Integrating JSON validation into your Git pre-commit hooks is a straightforward yet powerful way to improve the quality and consistency of your codebase. Whether you opt for a simple syntax check with a bash script or a more robust setup with a hook manager like Husky and schema validation using tools like AJV, the principle is the same: catch errors early, automate checks, and ensure that only valid JSON makes it into your repository. This practice saves time, reduces bugs, and makes collaboration smoother.
        </p>
      </div>
    </>
  );
}