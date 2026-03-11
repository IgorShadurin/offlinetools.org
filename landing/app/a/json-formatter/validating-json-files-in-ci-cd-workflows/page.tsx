import type { Metadata } from "next";
import {
  Bug,
  CheckCircle,
  FileCheck,
  FileJson,
  Github,
  GitBranch,
  Gitlab,
  Settings,
  Terminal,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Validate JSON in CI/CD Workflows | GitHub Actions & GitLab Guide",
  description:
    "Fail CI on invalid JSON with Python, jq, and JSON Schema validation. Includes current GitHub Actions and GitLab examples plus practical troubleshooting tips.",
};

const repoWideScript = `set -euo pipefail

git ls-files -z -- '*.json' |
while IFS= read -r -d '' file; do
  case "$file" in
    package-lock.json|*/package-lock.json)
      continue
      ;;
  esac

  echo "Validating $file"
  python3 -m json.tool "$file" >/dev/null
done`;

const githubActionsExample = `name: validate-json

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate-json:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Validate tracked JSON files
        run: |
          set -euo pipefail
          git ls-files -z -- '*.json' |
          while IFS= read -r -d '' file; do
            case "$file" in
              package-lock.json|*/package-lock.json)
                continue
                ;;
            esac

            echo "Validating $file"
            python3 -m json.tool "$file" >/dev/null
          done`;

const gitlabCiExample = `stages:
  - validate

validate_json:
  stage: validate
  image: python:3-slim
  script:
    - |
      set -e
      find . \\
        -path './.git' -prune -o \\
        -path './node_modules' -prune -o \\
        -path './dist' -prune -o \\
        -name '*.json' ! -name 'package-lock.json' -print |
      while IFS= read -r file; do
        echo "Validating $file"
        python -m json.tool "$file" >/dev/null
      done
  rules:
    - changes:
        - "**/*.json"
        - ".gitlab-ci.yml"`;

const schemaExample = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["environment", "timeoutSeconds"],
  "properties": {
    "environment": {
      "enum": ["dev", "staging", "prod"]
    },
    "timeoutSeconds": {
      "type": "integer",
      "minimum": 1
    }
  },
  "additionalProperties": false
}`;

const ajvCommand = `npx ajv-cli validate \\
  --spec=draft2020 \\
  -s ci/config.schema.json \\
  -d ci/config.json \\
  --errors=text`;

const changedFilesScript = `git diff --name-only --diff-filter=ACMRT "$BASE_SHA" "$HEAD_SHA" -- '*.json' |
while IFS= read -r file; do
  [ -n "$file" ] || continue
  python3 -m json.tool "$file" >/dev/null
done`;

export default function ValidateJsonInCiCdArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <CheckCircle className="text-green-500" size={30} />
        <span>Validating JSON Files in CI/CD Workflows</span>
      </h1>

      <div className="space-y-6">
        <p>
          If a broken JSON file can block deploys, break application startup, or corrupt config at runtime, validate it
          before the expensive parts of your pipeline run. In practice that means two layers: a fast syntax check for
          every tracked <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.json</code> file, and schema
          validation for files whose structure matters.
        </p>
        <p>
          For most teams, the most portable CI command is{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">python3 -m json.tool</code>. If your runner
          already has <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jq</code>,{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jq . file.json &gt; /dev/null</code> is equally
          good for syntax checks. Use JSON Schema only where you need to enforce required fields, value ranges, enums,
          or disallow unknown keys.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Workflow size={24} />
          <span>Quickest Reliable Checks</span>
        </h2>
        <ul className="list-disc pl-6 space-y-4 my-4">
          <li className="flex items-start space-x-2">
            <Terminal size={20} className="text-blue-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Portable syntax validation with Python:</strong> This works on many CI images without installing
              extra packages.
              <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
                <code>python3 -m json.tool config/app.json &gt; /dev/null</code>
              </pre>
              <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">
                Python 3.14 also supports <code>python -m json</code>, but <code>json.tool</code> is the safer choice
                across older runners and container images.
              </span>
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Wrench size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Fast syntax validation with jq:</strong> Good when your job already installs or bundles{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jq</code>.
              <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
                <code>jq . config/app.json &gt; /dev/null</code>
              </pre>
              <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">
                Avoid <code>jq -e .</code> for pure syntax checks. It can fail on valid JSON whose top-level value is{" "}
                <code>false</code> or <code>null</code>.
              </span>
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <FileCheck size={20} className="text-orange-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Schema validation with Ajv:</strong> Use this when validity depends on required keys, types, or
              allowed values, not just parseability.
              <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
                <code>{ajvCommand}</code>
              </pre>
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <GitBranch size={24} />
          <span>A Good Default for Repositories</span>
        </h2>
        <p>
          The simplest reliable pattern is to validate tracked JSON files, not every file a recursive{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">find</code> happens to discover in build output,
          dependencies, or caches. That makes CI quieter and avoids false failures from generated directories like{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">node_modules</code> or{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.next</code>.
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{repoWideScript}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Skip generated files only if they are not part of the contract you care about. If your deployment actually
          depends on a tracked generated JSON file, validate it too.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Github size={24} />
          <span>Example: GitHub Actions</span>
        </h2>
        <p>
          For GitHub Actions, put JSON validation near the top of the job so bad config fails fast. The example below
          uses <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">actions/checkout@v6</code> and relies on
          the Python already available on GitHub-hosted Ubuntu runners.
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{githubActionsExample}</code>
        </pre>
        <p>
          If the repository already installs Node later in the workflow, add a separate schema-validation step with{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npx ajv-cli validate</code> for the files that
          need stronger guarantees than syntax alone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Gitlab size={24} />
          <span>Example: GitLab CI</span>
        </h2>
        <p>
          In GitLab CI, a lightweight Python image is enough for syntax checks, and{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">rules: changes</code> lets you skip the job when
          JSON files are untouched.
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{gitlabCiExample}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          One GitLab caveat: <code>rules: changes</code> can still evaluate to true for new branches and some non-push
          pipelines. If you need stricter behavior there, switch to <code>rules: changes: compare_to</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson size={24} />
          <span>When Syntax Checks Are Not Enough</span>
        </h2>
        <p>
          Syntax validation answers only one question: &quot;Can a parser read this file?&quot; It does not tell you
          whether the file has the right keys, acceptable values, or safe defaults. For CI configuration, application
          settings, API fixtures, and seed data, add a JSON Schema and fail the build when the data stops matching the
          contract.
        </p>
        <p>Example schema:</p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{schemaExample}</code>
        </pre>
        <p>Validation command:</p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{ajvCommand}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          If you keep schemas in the repo, validate the schema files too. A bad schema can make every downstream data
          check meaningless.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings size={24} />
          <span>Validating Only Changed JSON Files</span>
        </h2>
        <p>
          Large monorepos sometimes validate only changed files to keep feedback fast. That is reasonable for syntax
          checks, but full-repo validation is still safer when one JSON file can affect many services or environments.
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <code>{changedFilesScript}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Set <code>BASE_SHA</code> and <code>HEAD_SHA</code> from your CI platform, or compute them in a previous
          step. The exact variables differ between GitHub Actions, GitLab CI, Jenkins, and other systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Bug size={24} />
          <span>Common Failure Modes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Comments or trailing commas:</strong> Many tools call these files JSON, but standard validators do
              not. If the file is really JSONC, parse it with a JSONC-aware tool instead of strict JSON tooling.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Generated files causing noise:</strong> Lockfiles and build artifacts can dominate failures. Skip
              them deliberately, not accidentally.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Schema drift:</strong> A syntax-valid file can still break production if required properties were
              renamed or removed. That is the gap schema validation closes.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Using formatting as a proxy for validation:</strong> A formatter helps humans read the file, but CI
              should rely on exit codes from a parser or schema validator.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          The best CI/CD setup for JSON is usually simple: parse every tracked JSON file early, validate critical files
          against schemas, and scope the checks so generated noise does not hide real failures. That gives search users
          and engineering teams the same outcome: faster feedback and fewer config bugs escaping into deploys.
        </p>
      </div>
    </>
  );
}
