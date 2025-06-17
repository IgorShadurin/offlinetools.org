import type { Metadata } from "next";
import {
  CheckCircle,
  Code,
  GitBranch,
  Rocket,
  Terminal,
  FileText,
  Workflow,
  Zap,
  Columns,
  UserCheck,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters in CI/CD Pipelines",
  description:
    "Learn how to integrate JSON formatters into your CI/CD pipelines for code consistency, readability, and automated checks.",
};

export default function JsonFormattersCiCdArticle() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">Using JSON Formatters in CI/CD Pipelines</h1>

      <p>
        JSON (JavaScript Object Notation) is ubiquitous in modern software development. It's used for API responses,
        configuration files, data storage, and much more. As projects grow and teams expand, maintaining consistent code
        style becomes challenging, especially for data formats like JSON. This is where integrating JSON formatters into
        your Continuous Integration/Continuous Deployment (CI/CD) pipelines becomes invaluable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Code className="inline-block" /> What are JSON Formatters?
      </h2>
      <p>
        A JSON formatter, also known as a JSON linter or beautifier, is a tool that automatically adjusts the
        whitespace, indentation, and structure of a JSON file according to a predefined set of rules. Its primary goal
        is to make JSON data human-readable and consistently formatted across a project.
      </p>
      <p>Examples include:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href="https://prettier.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Prettier
          </a>{" "}
          (supports JSON along with many other formats)
        </li>
        <li>
          <a
            href="https://stedolan.github.io/jq/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            jq
          </a>{" "}
          (a command-line JSON processor that can also format)
        </li>
        <li>Built-in formatters in IDEs (though CI/CD needs a command-line tool)</li>
        <li>Various language-specific or dedicated command-line JSON tools.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Workflow className="inline-block" /> Why Use Formatters in CI/CD?
      </h2>
      <p>Integrating JSON formatting into your CI/CD pipeline offers several key benefits:</p>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <Columns className="inline-block text-green-600" /> Consistency and Readability
      </h3>
      <p>
        Ensures all JSON files in your codebase adhere to the same style guidelines. This makes the code easier to read
        and understand for everyone on the team, regardless of their preferred editor settings.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <GitBranch className="inline-block text-blue-600" /> Stable Diffs in Version Control
      </h3>
      <p>
        When everyone's editor automatically formats JSON differently, commits often include significant whitespace
        changes alongside actual content changes. Standardized formatting minimizes these noisy diffs, making code
        reviews quicker and less error-prone. You see only the *meaningful* changes.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <p className="font-medium mb-2">Example: Before Formatting</p>
        <pre>
          <code className="language-json">{`{
    "name": "Product A",
  "price": 10.99,
"tags": ["electronics", "gadget" ]
}`}</code>
        </pre>
        <p className="font-medium mt-4 mb-2">Example: After Consistent Formatting</p>
        <pre>
          <code className="language-json">{`{
  "name": "Product A",
  "price": 10.99,
  "tags": [
    "electronics",
    "gadget"
  ]
}`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          A formatter ensures everyone's code looks like the second example.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <CheckCircle className="inline-block text-emerald-600" /> Automated Validation and Error Detection
      </h3>
      <p>
        Many formatters will fail if the JSON is syntactically incorrect. Running the formatter in CI/CD acts as an
        automatic linter, catching syntax errors before they are merged or deployed.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <Zap className="inline-block text-amber-600" /> Enforcing Standards Automatically
      </h3>
      <p>
        Instead of relying on developers to remember to run formatters locally or hoping reviewers catch formatting
        issues, the pipeline automatically checks and potentially enforces the standard. This saves time and avoids
        friction during code reviews.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Rocket className="inline-block" /> Where to Integrate Formatters in CI/CD
      </h2>
      <p>You can integrate JSON formatting checks at various stages of your development workflow and CI/CD pipeline:</p>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <UserCheck className="inline-block text-indigo-600" /> Pre-commit Hooks
      </h3>
      <p>
        <strong>Purpose:</strong> Catch formatting issues *before* the code is even committed. This is the earliest
        point and saves CI/CD time.
      </p>
      <p>
        <strong>How:</strong> Use tools like{" "}
        <a
          href="https://pre-commit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          pre-commit
        </a>{" "}
        (a framework) or configure Git hooks manually. The hook runs the formatter on staged files, either fixing them
        automatically or failing the commit if they are not formatted correctly.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h4 className="font-semibold mb-2">
          Example <code>.pre-commit-config.yaml</code> (using Prettier):
        </h4>
        <pre>
          <code className="language-yaml">{`repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0 # Use the latest version
    hooks:
      - id: check-added-large-files
      - id: check-yaml
      - id: end-of-file-fixer
      - id: trailing-whitespace
  - repo: https://github.com/prettier/prettier
    rev: 3.2.5 # Use the latest version
    hooks:
      - id: prettier
        # Only run on relevant file types
        files: "\\.(json|json5|jsonc|yml|yaml|md|css|scss|less|html|jsx?|tsx?|vue|svelte)$"
`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This configuration runs Prettier on specified file types, including JSON, before allowing a commit.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <Terminal className="inline-block text-purple-600" /> CI Build/Test Stage
      </h3>
      <p>
        <strong>Purpose:</strong> Ensure that no unformatted code makes it past the CI pipeline, even if pre-commit
        hooks were bypassed or misconfigured. This acts as the final gate before merging.
      </p>
      <p>
        <strong>How:</strong> Add a step in your CI configuration (e.g., GitHub Actions, GitLab CI, Jenkins) that runs
        the formatter in "check" or "diff" mode. This mode exits with a non-zero status if files are not formatted
        correctly, causing the CI build to fail.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h4 className="font-semibold mb-2">Example CI Step (using Prettier check mode):</h4>
        <pre>
          <code className="language-yaml">{`name: CI Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20' # Or your preferred Node.js version

    - name: Install dependencies
      run: npm ci # or yarn install, pnpm install

    - name: Check JSON and other files formatting with Prettier
      # The --check flag makes Prettier exit with a non-zero code
      # if any files are not formatted correctly.
      run: npx prettier --check "**/*.json" "**/*.{yml,yaml}" "**/*.md" # Add other relevant file types

    # ... other build/test steps
`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This GitHub Actions step will fail the build if <code>prettier --check</code> finds any formatting
          inconsistencies in JSON or YAML files.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
        <FileText className="inline-block text-red-600" /> Release/Deployment Stage (Less Common for Formatting)
      </h3>
      <p>
        <strong>Purpose:</strong> Ensure final build artifacts or configuration files are formatted correctly before
        deployment.
      </p>
      <p>
        <strong>How:</strong> Typically, formatting is a development/build concern. Running a formatter at the release
        stage might be necessary if files are generated or modified during the build in a way that could mess up
        formatting. However, it's usually better to ensure files are formatted earlier. You might use tools like{" "}
        <code>jq</code> here to process/format generated JSON config files.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h4 className="font-semibold mb-2">Example: Formatting a Generated Config with jq</h4>
        <pre>
          <code className="language-bash">{`# Assume config.json was generated or modified
cat config.json | jq . > config_formatted.json
# Replace original or use the formatted version
mv config_formatted.json config.json
`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Using <code>jq .</code> is a common way to re-indent and format JSON from the command line.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <HeartHandshake className="inline-block text-pink-600" /> Benefits for Different Roles
      </h2>
      <p>Integrating formatters benefits various stakeholders:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Developers:</strong> Don't have to manually format or argue about style. They can configure their IDEs
          to format on save, and trust the CI/CD check as a safety net.
        </li>
        <li>
          <strong>Code Reviewers:</strong> Reviews focus on logic and content, not whitespace or style issues, leading
          to faster, more effective reviews.
        </li>
        <li>
          <strong>Operations/DevOps:</strong> Ensures configuration files or data artifacts used in deployment are
          consistent and easy to read/debug if necessary.
        </li>
        <li>
          <strong>Project Managers:</strong> Reduced friction and time spent on style arguments, leading to smoother
          development cycles.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Zap className="inline-block text-red-600" /> Challenges and Considerations
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Tool Selection:</strong> Choose a formatter that supports JSON well and ideally other formats you use.
          Prettier is a popular choice for its multi-format support and opinionated style.
        </li>
        <li>
          <strong>Configuration:</strong> Agree on formatting rules (indentation size, etc.) and configure the formatter
          and CI/CD steps consistently. Store configuration files (e.g., <code>.prettierrc</code>) in the repository.
        </li>
        <li>
          <strong>Legacy Code:</strong> Applying formatting to a large existing codebase might result in a single,
          massive commit with only formatting changes. It's often best to do this as a dedicated effort or apply
          formatters incrementally if possible.
        </li>
        <li>
          <strong>Educating the Team:</strong> Ensure all developers understand why formatting is important and how to
          use pre-commit hooks and IDE integrations to avoid CI failures.
        </li>
        <li>
          <strong>Performance:</strong> For extremely large repositories, running a formatter on every file on every
          commit/push might take time. Configure tools to run only on changed files (like pre-commit hooks do) or target
          specific directories/file patterns in CI.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <CheckCircle className="inline-block text-blue-600" /> Conclusion
      </h2>
      <p>
        Integrating JSON formatters into your CI/CD pipeline is a straightforward and effective way to improve code
        quality, maintainability, and team collaboration. By automating style checks, you free up developers and
        reviewers to focus on more important aspects of the code, reduce merge conflicts caused by inconsistent
        formatting, and catch potential syntax errors early. It's a small investment in pipeline setup that pays
        significant dividends in development efficiency and code health.
      </p>
    </article>
  );
}
