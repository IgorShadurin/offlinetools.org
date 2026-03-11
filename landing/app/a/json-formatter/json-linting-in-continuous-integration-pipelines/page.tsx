import type { Metadata } from "next";
import {
  AlertTriangle,
  CheckCircle,
  Code,
  FileJson2,
  GitBranch,
  RefreshCcw,
  Settings,
  Terminal,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Linting in CI Pipelines: GitHub Actions, GitLab, and Schema Checks | Offline Tools",
  description:
    "Learn how to lint JSON in CI with strict parse checks, Prettier formatting checks, and JSON Schema validation. Includes practical GitHub Actions and GitLab CI examples.",
};

export default function JsonLintingInCiArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="size-8 text-blue-500" /> JSON Linting in Continuous Integration Pipelines
      </h1>

      <div className="space-y-6">
        <p>
          A useful JSON linting step in CI does more than answer "is this file parseable?" It should reject malformed
          JSON, enforce a consistent format, and validate important files against a schema when syntax alone is not
          enough. That combination catches the failures that actually break deployments: invalid config files, drift in
          committed JSON, and structurally wrong data that still happens to parse.
        </p>
        <p>
          The mistake many teams make is treating all of those checks as the same thing. They are not. A formatter like
          Prettier is great for consistency, but it will not replace schema validation. A parser check catches broken
          commas and quotes, but it will not tell you whether a feature-flag file is missing a required field. The most
          reliable CI pipeline keeps those checks separate so failures are easy to understand and fast to fix.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="size-6 text-teal-500" /> What JSON Linting In CI Should Cover
        </h2>
        <div className="grid gap-4 md:grid-cols-3 my-6">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Terminal className="size-5" /> 1. Parse Validity
            </h3>
            <p className="mt-2">
              Fail the job if a file is not strict JSON. This catches missing commas, invalid quotes, trailing commas,
              bad escape sequences, and comments in files that are supposed to be plain JSON.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Good for every repository that commits JSON.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <RefreshCcw className="size-5" /> 2. Formatting
            </h3>
            <p className="mt-2">
              Keep indentation, whitespace, and line wrapping predictable. That makes diffs smaller and avoids noisy
              pull requests where machine-generated JSON gets reformatted differently on each branch.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Best when your team already standardizes on Prettier or another formatter.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Code className="size-5" /> 3. Schema Validation
            </h3>
            <p className="mt-2">
              Validate the shape of critical JSON such as app config, deployment manifests, fixtures, feature flags, or
              contract-test payloads. This is the check that catches "valid JSON, wrong data".
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Add this where bad structure would cause a release, runtime, or migration failure.
            </p>
          </div>
        </div>
        <p>
          For most teams, the minimum reliable setup is parse checks plus formatting checks on every pull request, then
          schema validation for a short list of important files. That gives good coverage without turning the pipeline
          into a slow all-or-nothing gate.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="size-6 text-orange-500" /> Tool Choices That Hold Up In CI
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Terminal className="size-5" /> `jq empty` or `jsonlint` for syntax
            </h3>
            <p className="mt-2">
              If all you need is a strict parser check, `jq empty file.json` is easy to script and exits non-zero on
              invalid input. If your team already uses `jsonlint`, that is fine too. The important part is that the CI
              step fails immediately on malformed JSON.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <RefreshCcw className="size-5" /> Prettier for formatting drift
            </h3>
            <p className="mt-2">
              Prettier&apos;s{" "}
              <a
                href="https://prettier.io/docs/cli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                CLI `--check`
              </a>{" "}
              mode is a good CI fit because it returns a failing exit code when files are not formatted, without
              rewriting them in the pipeline. Quote the glob pattern in shell commands so Prettier expands it instead of
              your shell.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Code className="size-5" /> Ajv CLI for JSON Schema
            </h3>
            <p className="mt-2">
              If you keep schemas in the repo,{" "}
              <a
                href="https://ajv.js.org/packages/ajv-cli.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ajv CLI
              </a>{" "}
              is a practical choice for CI. It supports modern JSON Schema drafts and makes it clear which file failed
              and why. Use schema validation for files whose structure matters, not for every incidental JSON file in
              the repo.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitBranch className="size-6 text-blue-500" /> GitHub Actions Example
        </h2>
        <p>
          GitHub stores workflow files in `.github/workflows`, and the{" "}
          <a
            href="https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            workflow syntax
          </a>{" "}
          supports `paths` filters. That makes JSON checks cheap enough to run on every pull request without rerunning
          them for unrelated changes.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`name: JSON checks

on:
  pull_request:
    paths:
      - "**/*.json"
      - "schemas/**/*.json"
      - ".github/workflows/json-checks.yml"
  push:
    branches:
      - main
    paths:
      - "**/*.json"
      - "schemas/**/*.json"

jobs:
  json:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
      - name: Install jq
        run: sudo apt-get update && sudo apt-get install -y jq
      - name: Install repo dependencies
        run: npm ci
      - name: Parse strict JSON files
        run: |
          find . \\
            -path './node_modules' -prune -o \\
            -path './.next' -prune -o \\
            -name '*.json' -exec jq empty {} +
      - name: Check formatting
        run: npx prettier --check "**/*.json"
      - name: Validate critical config against schema
        run: npx ajv validate --spec=draft2020 --all-errors -s schemas/app-config.schema.json -d config/app-config.json`}
              </code>
            </pre>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Replace `npm ci` with your project&apos;s package-manager install command. If you do not keep schemas in the
          repository, drop the Ajv step instead of forcing schema validation onto files that do not need it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="size-6 text-cyan-500" /> GitLab CI Example
        </h2>
        <p>
          GitLab pipelines start from a repository-root{" "}
          <a
            href="https://docs.gitlab.com/ee/ci/yaml/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            `.gitlab-ci.yml`
          </a>{" "}
          file. A single JSON job is usually enough: install the parser and project dependencies, run a strict parse
          check, then run formatting and schema validation in sequence.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`stages:
  - lint

json_lint:
  stage: lint
  image: node:22
  before_script:
    - apt-get update
    - apt-get install -y jq
    - npm ci
  script:
    - find . -path './node_modules' -prune -o -name '*.json' -exec jq empty {} +
    - npx prettier --check "**/*.json"
    - npx ajv validate --spec=draft2020 --all-errors -s schemas/app-config.schema.json -d config/app-config.json`}
              </code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="size-6 text-yellow-500" /> Common Failure Modes In Real Pipelines
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Linting JSONC or JSON5 as strict JSON:</strong> files like `tsconfig.json` may allow comments or
            trailing commas even though plain JSON does not. Exclude them or use tooling that matches the real file
            format.
          </li>
          <li>
            <strong>Checking too many files:</strong> generated snapshots, lockfiles, vendored JSON, and build output
            often create noise. Scope the job to the directories that matter.
          </li>
          <li>
            <strong>Using formatting as a proxy for validation:</strong> a formatter can tell you a file needs cleanup,
            but it cannot tell you whether a config object is missing `environment`, `version`, or another required
            field.
          </li>
          <li>
            <strong>Only validating on deploy:</strong> JSON checks belong on pull requests and branch pushes, not just
            release pipelines. Waiting until deploy makes the feedback loop too expensive.
          </li>
          <li>
            <strong>Ignoring duplicate-key risk:</strong> many parsers accept duplicate keys and keep the last one,
            which can hide mistakes in hand-edited config files. If duplicate keys are a realistic risk in your repo,
            add a specialized check instead of assuming a normal parser will catch them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="size-6 text-green-500" /> A Simple Decision Rule
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            If the repository only stores occasional JSON config, start with a strict parser plus Prettier `--check`.
          </li>
          <li>
            If JSON drives runtime behavior, deployments, or test fixtures, add schema validation for those files.
          </li>
          <li>
            If the job is noisy or slow, narrow the file set before removing validation depth.
          </li>
          <li>
            If developers keep getting surprised by CI failures, add the same commands to a pre-commit hook or local
            `lint:json` script so the feedback happens earlier.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON linting in continuous integration pipelines works best when it is treated as a small stack of checks, not
          a single command. Parse validity protects you from broken syntax. Formatting checks keep diffs stable.
          Schema validation protects the files that can break production even when they are technically valid JSON. Put
          those pieces together and your CI job becomes a reliable guardrail instead of a vague "JSON check" that only
          catches the easiest mistakes.
        </p>
      </div>
    </>
  );
}
