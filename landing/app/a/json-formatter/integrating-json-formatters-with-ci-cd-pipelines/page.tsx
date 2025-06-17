import type { Metadata } from "next";
import {
  Code,
  CheckCircle2,
  XCircle,
  Settings,
  Workflow,
  Github,
  Gitlab,
  Hammer,
  FileJson,
  Container,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrating JSON Formatters with CI/CD Pipelines | Offline Tools",
  description:
    "Learn how to integrate JSON formatters into your CI/CD pipelines to ensure consistent code style and prevent merge conflicts.",
};

export default function JsonFormatterCICDArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Integrating JSON Formatters with CI/CD Pipelines</h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in modern web development, used for configuration files, API
          responses, data storage, and more. As projects grow and involve multiple contributors, maintaining consistent
          formatting across all JSON files becomes crucial. Inconsistent formatting leads to noisy diffs, increased
          merge conflict potential, and reduced readability. This is where integrating JSON formatters into your CI/CD
          (Continuous Integration/Continuous Delivery) pipeline becomes invaluable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Why Integrate Formatting into CI/CD?
          <CheckCircle2 className="text-green-500" size={24} />
        </h2>
        <p>
          While using formatters locally (via editor extensions or pre-commit hooks) is the first line of defense,
          relying solely on individual developer workflows can still lead to inconsistencies. CI/CD provides a
          centralized, automated check that ensures *every* change adheres to the project&apos;s defined formatting
          standards before it&apos;s merged or deployed.
        </p>
        <p>Key benefits include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Consistency:</strong> Guarantees that all JSON files in the repository follow the same style rules,
            regardless of who committed the change.
          </li>
          <li>
            <strong>Reduced Merge Conflicts:</strong> Standardized formatting minimizes cosmetic changes that can cause
            conflicts when merging branches.
          </li>
          <li>
            <strong>Improved Readability:</strong> Consistently formatted code is easier to read and understand.
          </li>
          <li>
            <strong>Early Error Detection:</strong> Catches formatting errors automatically during the build process,
            preventing them from reaching the main branch.
          </li>
          <li>
            <strong>Focus on Logic:</strong> Developers can focus on the code&apos;s functionality rather than manual
            formatting adjustments.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Choosing a JSON Formatter
          <Code size={24} />
        </h2>
        <p>Several tools can format JSON. Some popular options include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Prettier:</strong> A widely-used opinionated code formatter supporting many languages, including
            JSON. It integrates well with editors and has a CLI suitable for CI.
          </li>
          <li>
            <strong>
              <Code size={16} className="inline mr-1" />
              jq:
            </strong>{" "}
            A command-line JSON processor. While primarily for querying/manipulating JSON, it can also pretty-print and
            format. Useful for simple formatting tasks in shell scripts.
          </li>
          <li>
            <strong>Language-specific tools:</strong> Many programming language ecosystems have built-in or standard
            libraries/tools for JSON handling and formatting (e.g., Python&apos;s `json.tool`, Node.js libraries, etc.).
          </li>
          <li>
            <strong>Linters (ESLint, Stylelint, etc.):</strong> Often have rules that enforce formatting, although
            dedicated formatters like Prettier are often preferred for automatic fixing.
          </li>
        </ul>
        <p>
          For most web projects, Prettier is a strong choice due to its widespread adoption, configuration options, and
          integration capabilities. We&apos;ll use Prettier in the examples below, but the principles apply to other
          tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Integration Strategy: Checking vs. Fixing
          <Workflow size={24} />
        </h2>
        <p>When integrating formatters into CI, you generally have two main strategies:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Check Mode (Recommended):</strong> The CI job runs the formatter to check if files are *already*
            correctly formatted. If not, the job fails, indicating a formatting issue that the developer must fix
            locally and re-commit. This is the most common and generally preferred approach.
          </li>
          <li>
            <strong>Fix Mode (Less Common in CI):</strong> The CI job runs the formatter to *automatically* fix
            formatting issues. This usually involves committing the changes back to the branch or artifacting the
            corrected files. This can complicate the CI flow and is often discouraged for main build/test pipelines,
            though it might be used in separate automation workflows.
          </li>
        </ol>
        <p>
          We will focus on the <strong>Check Mode</strong> as it enforces developer responsibility while providing a
          safety net.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Implementing the Check in CI
          <Container size={24} />
        </h2>
        <p>
          The core idea is to add a step in your CI pipeline that executes the formatter with a &quot;check&quot; or
          &quot;diff&quot; flag. If the formatter finds any files that don&apos;t conform to the configuration, it will
          typically exit with a non-zero status code, causing the CI job to fail.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Using Prettier CLI
          <Code size={20} />
        </h3>
        <p>
          Prettier&apos;s CLI has a <Code size={16} className="inline mr-1" />
          --check flag specifically for this purpose. It finds files that are formatted incorrectly but does not
          overwrite them.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">Prettier Check Command:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`npx prettier --check "path/to/your/**/*.json"`}</pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Replace <Code size={14} className="inline mr-1" />
            "path/to/your/**/*.json" with the glob pattern matching your JSON files.
          </p>
        </div>
        <p>
          You&apos;ll likely want to check other file types too. A common pattern is to define a script in your{" "}
          <Code size={14} className="inline mr-1" />
          package.json:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">package.json scripts:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`"scripts": {
  "format": "prettier --write .",
  "check-format": "prettier --check ."
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This assumes a <Code size={14} className="inline mr-1" />
            .prettierrc config file exists at the root.
          </p>
        </div>
        <p>
          Your CI pipeline can then simply run <Code size={14} className="inline mr-1" />
          npm run check-format or <Code size={14} className="inline mr-1" />
          yarn check-format.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Configuration Files
          <Settings size={20} />
        </h3>
        <p>
          Formatters are configured via files like <Code size={14} className="inline mr-1" />
          .prettierrc (or variants), <Code size={14} className="inline mr-1" />
          .editorconfig, etc. Ensure these configuration files are present in your repository and committed to version
          control so that both local formatters and the CI job use the same rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Examples in Popular CI Platforms
          <Hammer size={24} />
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          GitHub Actions
          <Github size={20} />
        </h3>
        <p>Add a step to your workflow YAML file. This step will typically run after dependencies are installed.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Example <Code size={14} className="inline mr-1" />
            .github/workflows/ci.yml step:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20' # Or your preferred version

    - name: Install dependencies
      run: npm ci # Or yarn install --frozen-lockfile, pnpm install --frozen-lockfile

    - name: Check Code Formatting (includes JSON)
      run: npm run check-format # Runs the script defined in package.json
`}
            </pre>
          </div>
        </div>
        <p>
          If the <Code size={14} className="inline mr-1" />
          npm run check-format command exits with a non-zero status (meaning formatting issues were found), the
          &quot;Check Code Formatting&quot; step will fail, causing the entire CI job to fail.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          GitLab CI
          <Gitlab size={20} />
        </h3>
        <p>
          Similar to GitHub Actions, add a job or a step within an existing job in your{" "}
          <Code size={14} className="inline mr-1" />
          .gitlab-ci.yml file.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Example <Code size={14} className="inline mr-1" />
            .gitlab-ci.yml job:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`image: node:latest # Or your preferred image with Node.js

stages:
  - build
  - test

cache:
  paths:
    - node_modules/

install_deps:
  stage: build
  script:
    - npm ci # Or yarn install --frozen-lockfile, pnpm install --frozen-lockfile

check_formatting:
  stage: test # Often placed in a 'test' or 'lint' stage
  dependencies:
    - install_deps # Ensure dependencies are installed
  script:
    - npm run check-format # Runs the script defined in package.json
`}
            </pre>
          </div>
        </div>
        <p>
          Again, the CI job <Code size={14} className="inline mr-1" />
          check_formatting will fail if <Code size={14} className="inline mr-1" />
          npm run check-format returns a non-zero exit code.
        </p>

        <h3 className="text-xl font-semibold mt-6">Jenkins (Scripted Pipeline Example)</h3>
        <p>In a Jenkinsfile (Groovy syntax), you would add a stage or a step within a stage.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">Example Jenkinsfile stage:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // ... build steps like npm ci ...
                sh 'npm ci'
            }
        }
        stage('Check Formatting') {
            steps {
                // Assumes Node.js is available in the agent environment
                // and dependencies (including prettier) are installed
                sh 'npm run check-format'
            }
        }
        // ... other stages like test, deploy ...
    }
}`}
            </pre>
          </div>
        </div>
        <p>
          The <Code size={14} className="inline mr-1" />
          sh step will fail the stage if the command exits with a non-zero status.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Handling Failure
          <XCircle className="text-red-500" size={24} />
        </h2>
        <p>
          When the formatting check fails in CI, the build will stop. The CI system will report the failure, and the
          logs will show which files caused the formatter to complain. The developer then needs to:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Pull the latest changes from the main branch (if working on a feature branch).</li>
          <li>
            Run the formatter locally (<Code size={14} className="inline mr-1" />
            npm run format or <Code size={14} className="inline mr-1" />
            npx prettier --write .) in their development environment.
          </li>
          <li>Commit the formatting changes.</li>
          <li>Push the updated branch.</li>
        </ol>
        <p>
          The CI pipeline will automatically trigger again on the new commit. This time, the formatting check should
          pass.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Beyond Basic Checking: Advanced Scenarios
          <Settings size={24} />
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Targeting Changed Files:</strong> For large repositories, checking *all* files on every commit might
            be slow. CI systems can often be configured to only run checks on files changed in the current commit or
            pull request. Prettier can sometimes work with this by integrating with Git commands to get changed files,
            though configuring this in CI can add complexity.
          </li>
          <li>
            <strong>Monorepos:</strong> In a monorepo, you might only want to check files within the specific package or
            application being changed. Tools like Nx or Lerna can help manage this by running commands only in affected
            projects.
          </li>
          <li>
            <strong>Ignoring Files:</strong> Use standard ignore files (<Code size={14} className="inline mr-1" />
            .prettierignore, <Code size={14} className="inline mr-1" />
            .gitignore) to exclude generated files, vendor code, or other specific paths from formatting checks.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Conclusion
          <FileJson size={24} />
        </h2>
        <p>
          Integrating JSON formatters like Prettier into your CI/CD pipeline is a straightforward yet powerful way to
          ensure code consistency, improve collaboration, and prevent headaches caused by formatting discrepancies. By
          automating the formatting check, you establish a reliable guardrail that helps maintain a clean and readable
          codebase over time. Start by adding a simple check step to your CI configuration and enjoy the benefits of
          consistently formatted JSON across your project.
        </p>
      </div>
    </>
  );
}
