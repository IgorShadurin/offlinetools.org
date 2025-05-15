import type { Metadata } from 'next';
import { FileJson, BookText, GitBranch, Settings, CheckCircle, Zap, Link, Code, Sparkles, CircleX } from 'lucide-react';

export const metadata: Metadata = {
  title: "JSON Formatter Integration with Continuous Documentation Tools",
  description: "Learn how to automatically format JSON code examples within your documentation using Git hooks, CI/CD pipelines, and documentation tooling integrations.",
};

export default function JsonFormatterDocsIntegrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson size={32} className="text-blue-500" />
        JSON Formatter Integration with Continuous Documentation Tools
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed">
        <p>
          In modern software development, APIs and configurations often rely heavily on JSON. Providing clear, accurate, and consistently formatted JSON examples in your documentation is crucial for developers consuming your tools or services. However, manually maintaining the format and accuracy of JSON snippets across potentially hundreds or thousands of documentation files can quickly become a burden and a source of errors.
        </p>
        <p>
          Integrating JSON formatters directly into your documentation workflow, especially within a "Continuous Documentation" approach, can automate this process, ensuring examples are always clean, readable, and syntactically correct. This article explores why this integration is valuable and how you can achieve it using various tools and techniques.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Sparkles size={24} className="text-yellow-500" />
          Why Integrate JSON Formatting into Docs?
        </h2>
        <p>
          Documentation serves as the primary interface between your code and its users (other developers). Inconsistent or poorly formatted code examples can significantly hinder understanding and developer experience. Specifically for JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Readability:</strong> Unformatted JSON (e.g., a single long line) is difficult to parse visually. Proper indentation, spacing, and line breaks make it easy to read nested structures.
          </li>
          <li>
            <strong>Consistency:</strong> Different contributors might use different formatting styles (e.g., spaces vs. tabs, quote styles). Automation enforces a single, consistent style.
          </li>
          <li>
            <strong>Accuracy:</strong> While formatting doesn't guarantee semantic correctness, validating and formatting often catches basic syntax errors before they are published.
          </li>
          <li>
            <strong>Maintainability:</strong> Automating formatting reduces the manual effort required during documentation updates.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <BookText size={24} className="text-green-500" />
          Continuous Documentation &amp; JSON
        </h2>
        <p>
          Continuous Documentation treats documentation as an integral part of the software development lifecycle. It's version-controlled alongside code, built and deployed automatically, and reviewed through standard processes (like pull requests). Tools commonly used in this space include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Static Site Generators (e.g., Hugo, Jekyll, Next.js, VuePress, MkDocs) for building documentation websites from Markdown or other source files.</li>
          <li>API Documentation Generators (e.g., Swagger UI, OpenAPI Generator, Postman documentation).</li>
          <li>Git repositories (GitHub, GitLab, Bitbucket) for version control and collaboration.</li>
          <li>CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, CircleCI) for automation.</li>
        </ul>
        <p>
          Within this ecosystem, JSON examples often live inside code blocks within Markdown files (or similar formats). Integrating a JSON formatter means these code blocks are automatically processed at some point in the workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Settings size={24} className="text-gray-500" />
          Integration Methods
        </h2>
        <p>
          There are several points in the documentation workflow where JSON formatting can be integrated:
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
          <GitBranch size={20} className="text-purple-500" />
          1. Git Hooks (Pre-commit or Pre-push)
        </h3>
        <p>
          This is one of the most effective methods for maintaining code style, including JSON formatting. You can set up scripts that run automatically before a commit is created or before code is pushed to the remote repository.
        </p>
        <p>
          Popular tools for managing Git hooks in JavaScript/TypeScript projects include <a href="https://typicode.github.io/husky/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Husky</a> and <a href="https://github.com/okonet/lint-staged" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">lint-staged</a>. `lint-staged` allows you to run formatters/linters only on the files staged for commit, making the hooks fast.
        </p>
        <p>
          You can configure tools like <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Prettier</a> (which supports JSON out-of-the-box) or ESLint (with plugins) to automatically format or check JSON files (`.json`) and potentially JSON code blocks within documentation files (e.g., Markdown).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Example: `package.json` with Husky and lint-staged</h4>
          <pre><code className="language-json">{`{
  "name": "my-docs-repo",
  "version": "1.0.0",
  "scripts": {
    "format": "prettier --write \\"**/*.{js,ts,json,md}\\"",
    "lint": "eslint \\"**/*.{js,ts}\\" --fix",
    "lint:json": "eslint \\"**/*.json\\" --fix"
    // Add script to format/lint JSON in markdown if needed
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "prettier": "^2.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-json": "^2.1.2" // Example JSON plugin
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.json": [
      "eslint --fix", // Uses eslint-plugin-json if configured
      "prettier --write"
    ],
    "*.md": [
      "prettier --write" // Prettier formats code blocks in markdown
    ]
  }
}`}
          </code></pre>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            <em>
              Note: You would typically install these dependencies (`npm install --save-dev husky lint-staged prettier eslint eslint-plugin-json`) and set up Husky (`npx husky install`). Prettier automatically formats JSON files and code blocks within markdown.
            </em>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
          <Zap size={20} className="text-orange-500" />
          2. CI/CD Pipelines
        </h3>
        <p>
          Even if Git hooks are used, integrating formatting and linting checks into your CI pipeline provides a safety net. If any unformatted or invalid JSON makes it past the local checks, the CI build can fail, preventing it from being merged or deployed.
        </p>
        <p>
          In your CI configuration (e.g., `.github/workflows/docs.yml` for GitHub Actions, `.gitlab-ci.yml` for GitLab CI), you can add steps to run formatters and linters across your documentation source files.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Example: GitHub Actions step</h4>
          <pre><code className="language-yaml">{`name: Documentation CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install # Or yarn install

      - name: Check JSON formatting and linting
        # Use the check command instead of write to fail on errors
        run: |
          npx prettier --check "**/*.{js,ts,json,md}"
          npx eslint "**/*.{js,ts}"
          npx eslint "**/*.json"

      - name: Build Documentation (Example)
        run: npm run docs:build # Replace with your doc build command

      # Add deployment steps if applicable
`}
          </code></pre>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            <em>
              This CI step runs `prettier --check` and ESLint, which will exit with a non-zero code if formatting/linting issues are found, causing the job to fail.
            </em>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
          <Link size={20} className="text-blue-500" />
          3. Documentation Generator Plugins or Custom Scripts
        </h3>
        <p>
          Some documentation tools might offer plugins that can process code blocks during the documentation build process. For example, a Markdown renderer might be extended to pipe `json` code blocks through a formatter.
        </p>
        <p>
          Alternatively, you could write a custom script that:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Finds all documentation files (e.g., `.md`, `.adoc`).</li>
          <li>Parses each file to locate JSON code blocks (e.g., lines starting with ` ```json ` and ending with ` ``` `).</li>
          <li>Extracts the JSON content from the block.</li>
          <li>Uses a JSON formatter (like a programmatic Prettier API, or a command-line tool like `jq`) to reformat the content.</li>
          <li>Replaces the original content in the code block with the formatted version.</li>
        </ol>
        <p>
          This script could be run manually, as part of a Git hook, or as a step in your CI pipeline before the documentation build starts.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Example: Using `jq` in a script</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <em>
              (This is a simplified illustration; a real script would need careful parsing of the markdown file)
            </em>
          </p>
          <pre><code className="language-bash">{`#!/bin/bash

DOC_FILE="path/to/your/doc.md"
TEMP_JSON_FILE="/tmp/temp.json"

# A very basic example: extract JSON from a specific block, format, and replace
# NOTE: This requires advanced text manipulation (sed/awk) or a proper parser
# This example is illustrative only, not a robust solution.

# Example: Find a line containing '\\\`\\\`\\\`json', assume the next lines until '\\\`\\\`\\\`' are JSON
# Extract JSON content (highly simplified)
# sed -n '/\\\`\\\`\\\`json/{:a;n;/^\\\`\\\`\\\`/!{p;ba}}' "$DOC_FILE" > "$TEMP_JSON_FILE"

# If JSON extraction was successful, format it
# if [ -s "$TEMP_JSON_FILE" ]; then
#   jq '.' "$TEMP_JSON_FILE" > "$TEMP_JSON_FILE.formatted"
  # Now, somehow replace the original JSON block in DOC_FILE with the content of $TEMP_JSON_FILE.formatted
  # This replacement step is complex and error-prone with simple shell tools.
  # A Node.js script with a markdown parser would be more robust.
# fi

echo "Conceptual script ran. A real implementation needs robust parsing and replacement."
echo "Using Prettier for .md files is often simpler as it handles code blocks automatically."

# Clean up temp file
# rm "$TEMP_JSON_FILE" "$TEMP_JSON_FILE.formatted" 2>/dev/null
`}
          </code></pre>
        </div>


        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <CheckCircle size={24} className="text-emerald-500" />
          Benefits of Automation
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Improved Developer Experience:</span> Users of your documentation find examples easier to read and copy.</li>
          <li><span className="font-semibold">Reduced Errors:</span> Automated checks catch syntax issues early.</li>
          <li><span className="font-semibold">Faster Writing/Review Cycles:</span> Authors don't spend time manually formatting; reviewers focus on content accuracy, not style.</li>
          <li><span className="font-semibold">Guaranteed Consistency:</span> All JSON examples adhere to the same style rules.</li>
          <li><span className="font-semibold">"Source of Truth" Sync:</span> If your JSON examples are generated or derived from code/schemas, formatting keeps them clean.</li>
        </ul>

         <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <CircleX size={24} className="text-red-500" />
          Potential Challenges
        </h2>
         <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Tooling Complexity:</span> Setting up Git hooks or CI can have a learning curve.</li>
          <li><span className="font-semibold">Documentation Format Parsing:</span> Correctly identifying and extracting JSON from various documentation formats (Markdown, AsciiDoc, etc.) requires careful implementation if not using a tool like Prettier that supports it.</li>
          <li><span className="font-semibold">Ignoring Specific Blocks:</span> You might need ways to mark certain JSON blocks to be excluded from formatting (e.g., if they intentionally demonstrate malformed JSON).</li>
          <li><span className="font-semibold">Large Repositories:</span> Running formatters on every file on every commit can be slow if not optimized (hence `lint-staged` for Git hooks).</li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Code size={24} className="text-cyan-500" />
          Choosing the Right Tool(s)
        </h2>
        <p>
          The best approach often involves a combination of tools:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Prettier:</span> Excellent for automatic formatting of `.json` files and JSON code blocks within Markdown. Easy to set up via CLI or API.</li>
          <li><span className="font-semibold">ESLint:</span> Powerful for linting and finding syntactic/semantic issues. Can be extended with plugins for JSON-specific rules.</li>
          <li><span className="font-semibold">`jq` / `jsonlint`:</span> Command-line tools useful for basic validation and reformatting in scripts, though less flexible than Prettier for complex scenarios or embedding in files.</li>
          <li><span className="font-semibold">Husky &amp; lint-staged:</span> Standard tools for integrating formatters/linters into Git workflow.</li>
          <li><span className="font-semibold">CI Provider Tools:</span> Leverage GitHub Actions, GitLab CI, etc., to enforce checks remotely.</li>
        </ul>
        <p>
          For most modern documentation projects using Markdown or similar text formats in a Git repository, integrating Prettier with Husky and a CI check provides a robust and relatively simple solution for ensuring JSON examples are consistently formatted.
        </p>


        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <BookText size={24} className="text-blue-500" />
          Conclusion
        </h2>
        <p>
          Integrating JSON formatters into your continuous documentation workflow transforms a tedious manual task into an automated, reliable process. By leveraging tools like Prettier, Git hooks, and CI pipelines, you can significantly improve the quality, consistency, and maintainability of your documentation's JSON examples, ultimately leading to a better experience for the developers who rely on your work. Start by choosing a formatter that supports your documentation file types and integrate it at the most appropriate point in your existing development and documentation pipeline.
        </p>
      </div>
    </>
  );
}