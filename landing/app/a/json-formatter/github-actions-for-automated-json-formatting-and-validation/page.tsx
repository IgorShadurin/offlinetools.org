import type { Metadata } from "next";
import { CircleCheck, CircleX, Cog, FileJson2, Github, GitPullRequest, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "GitHub Actions for Automated JSON Formatting and Validation | Offline Tools",
  description:
    "Set up GitHub Actions to validate JSON syntax, enforce Prettier formatting, and add schema checks to pull requests.",
};

export default function GithubActionsJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Cog className="w-8 h-8 mr-3 text-blue-600" />
        GitHub Actions for Automated JSON Formatting and Validation
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          If you want GitHub to block broken or badly formatted JSON before merge, the best default is a small workflow
          that runs on pull requests, watches only JSON-related files, and fails fast when a file is malformed or does
          not match your formatting rules. That gives contributors immediate feedback and keeps bad JSON out of{" "}
          <code>main</code>.
        </p>
        <p>
          The important distinction is that &quot;JSON validation&quot; can mean three different things: syntax
          validation, formatting enforcement, and schema validation. Most repositories need the first two. Repositories
          with machine-read configuration or content files often need the third as well.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson2 className="w-7 h-7 mr-2 text-green-600" />
          What To Automate
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Syntax validation:</span> catches broken commas, quotes, or trailing
            characters. A formatter such as Prettier will fail on invalid JSON, so many teams get this for free.
          </li>
          <li>
            <span className="font-medium">Formatting enforcement:</span> keeps indentation, spacing, and line wrapping
            consistent so reviews focus on content instead of whitespace noise.
          </li>
          <li>
            <span className="font-medium">Schema validation:</span> checks required keys, value types, enums, and
            other structural rules that a parser or formatter does not understand.
          </li>
        </ul>
        <p>
          If you only add one workflow, start with formatting plus parse validation. That covers the common search
          intent behind &quot;JSON validation in GitHub Actions&quot; without adding much maintenance overhead.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Github className="w-7 h-7 mr-2 text-gray-700 dark:text-gray-300" />
          Recommended Baseline Workflow
        </h2>
        <p>
          In 2026, the cleanest default is still to keep{" "}
          <a href="https://prettier.io/docs/cli/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Prettier
          </a>{" "}
          in your repository, run it in check mode on pull requests, and scope the workflow with <code>paths</code> so
          it only runs when JSON-related files change. Older <code>jsonlint</code> plus <code>diff</code> pipelines can
          work, but they are usually more brittle than a single formatter check.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            <code>.github/workflows/json-check.yml</code>
          </h3>
          <pre>
            {`name: JSON checks

on:
  pull_request:
    branches: [main]
    paths:
      - "**/*.json"
      - ".prettierrc*"
      - ".prettierignore"
      - "package.json"
      - "package-lock.json"
  push:
    branches: [main]
    paths:
      - "**/*.json"
      - ".prettierrc*"
      - ".prettierignore"
      - "package.json"
      - "package-lock.json"

permissions:
  contents: read

jobs:
  json-check:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v6

      - name: Set up Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Check JSON formatting and syntax
        run: npx prettier --check "**/*.json"`}
          </pre>
        </div>
        <p>
          This assumes Prettier is already in <code>devDependencies</code>. In CI, <code>prettier --check</code> gives
          you both signals most teams want: invalid JSON fails the step <CircleX className="inline w-5 h-5 text-red-600" />{" "}
          and valid JSON that does not match your formatting rules also fails{" "}
          <CircleX className="inline w-5 h-5 text-red-600" />. A clean pull request passes without bot commits or
          write access <CircleCheck className="inline w-5 h-5 text-green-600" />.
        </p>
        <p>
          Pin the Node major version your repository already uses. The <code>24</code> above is only an example of a
          current major. If your repo is pinned to a different version, or uses <code>pnpm</code> or <code>yarn</code>,
          match that instead of copying the sample blindly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Cog className="w-7 h-7 mr-2 text-blue-600" />
          When Syntax Validation Is Not Enough
        </h2>
        <p>
          A formatter only tells you whether the JSON parses and whether it is styled correctly. It does not tell you
          whether your file has the keys or value types your application expects. If your repository depends on config
          files, content bundles, or deployment manifests, add a schema validation step after installation.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">
            <code>Additional step for structured JSON</code>
          </h3>
          <pre>
            {`- name: Validate JSON against a schema
  run: |
    npx ajv-cli validate \
      -s schema/config.schema.json \
      -d "config/**/*.json" \
      --all-errors`}
          </pre>
        </div>
        <p>
          This is what catches missing keys, invalid enum values, or the wrong data type for a field. Use it when
          &quot;valid JSON&quot; is not the same thing as &quot;usable JSON&quot; in your application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <GitPullRequest className="w-7 h-7 mr-2 text-purple-600" />
          Pull Request Enforcement and Auto-Fix
        </h2>
        <p>
          For most teams, check-only workflows are the better default. They work cleanly with branch protection, keep
          permissions minimal, and make the contributor fix the file in the same branch that introduced the change. If
          the check fails on a pull request, require that status check before merge.
        </p>
        <p>
          If you want the action to rewrite files and commit them back, switch to <code>prettier --write</code>, grant{" "}
          <code>contents: write</code>, and commit only when the working tree changed. Keep that pattern for trusted
          branches or internal repositories. For fork-based pull requests, read-only validation is usually simpler and
          safer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="w-7 h-7 mr-2 text-yellow-600" />
          Common Failures and Fixes
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">The workflow never starts:</span> If you use both branch filters and{" "}
            <code>paths</code> filters, both conditions must match. A JSON-only workflow will not run when a pull
            request changes only Markdown or TypeScript.
          </li>
          <li>
            <span className="font-medium">Prettier says a file is wrong even though it parses:</span> That is expected.
            Parsing and formatting are different checks. Run <code>prettier --write</code> locally, then commit the
            formatted result.
          </li>
          <li>
            <span className="font-medium">You want reproducible CI:</span> Keep Prettier pinned in{" "}
            <code>devDependencies</code> and commit your lockfile. That avoids downloading a floating formatter version
            on every run.
          </li>
          <li>
            <span className="font-medium">Your cache behavior changed after updating setup-node:</span>{" "}
            <code>actions/setup-node@v6</code> can automatically enable npm caching when your <code>package.json</code>{" "}
            declares npm as the package manager. If you do not want that behavior, set{" "}
            <code>package-manager-cache: false</code>.
          </li>
          <li>
            <span className="font-medium">You only want to validate part of the repo:</span> Narrow both the workflow{" "}
            <code>paths</code> filter and the CLI glob, for example <code>config/**/*.json</code> or{" "}
            <code>content/**/*.json</code>.
          </li>
          <li>
            <span className="font-medium">The repo contains generated JSON:</span> Exclude generated directories with{" "}
            <code>.prettierignore</code> so CI does not fail on files no human is expected to edit.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Cog className="w-7 h-7 mr-2 text-blue-600" />
          Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Run the job on pull requests and on pushes to your protected branch so bad JSON cannot slip through.</li>
          <li>Use read-only permissions unless the workflow truly needs to push changes back to the repository.</li>
          <li>
            Prefer one obvious formatter workflow over a chain of ad hoc shell commands. It is easier for contributors
            to debug.
          </li>
          <li>
            Add schema validation only where structure matters. Not every JSON file deserves the overhead of maintaining
            a schema.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CircleCheck className="w-7 h-7 mr-2 text-green-600" />
          Conclusion
        </h2>
        <p>
          If your goal is reliable JSON validation in GitHub Actions, start with a small Prettier check scoped to JSON
          files, then add schema validation only for structured config or content. That setup is simple, current, and
          easy to enforce with pull request status checks.
        </p>
      </div>
    </>
  );
}
