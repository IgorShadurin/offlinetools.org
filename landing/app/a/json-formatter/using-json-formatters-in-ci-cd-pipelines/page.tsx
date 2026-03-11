import type { Metadata } from "next";
import {
  CheckCircle,
  Code,
  FileText,
  GitBranch,
  Terminal,
  UserCheck,
  Workflow,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters in CI/CD Pipelines",
  description:
    "A practical guide to running JSON formatting checks in CI/CD with Prettier, jq, pre-commit hooks, and GitHub Actions.",
};

export default function JsonFormattersCiCdArticle() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">Using JSON Formatters in CI/CD Pipelines</h1>

      <p>
        The most reliable pattern is simple: format JSON locally, then fail CI if anything reaches the pipeline
        unformatted. In practice that usually means running{" "}
        <a
          href="https://prettier.io/docs/cli"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Prettier
        </a>{" "}
        with <code>--write</code> on developer machines and <code>--check</code> in CI. If you only need syntax
        validation or want to re-indent generated JSON in a shell step,{" "}
        <a
          href="https://jqlang.org/manual/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          jq
        </a>{" "}
        is still a useful option.
      </p>
      <p>
        This guide focuses on what a search visitor usually needs: which command to run, where it belongs in the
        pipeline, what to ignore, and how to avoid common CI failures.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Workflow className="inline-block" /> Recommended Setup
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Install a formatter in the repository so every developer and CI job uses the same version.</li>
        <li>Run <code>prettier --write</code> locally or in a pre-commit hook to fix files before they are pushed.</li>
        <li>Run <code>prettier --check</code> in CI so pull requests fail instead of silently reformatting code.</li>
        <li>Commit a <code>.prettierignore</code> file so generated, vendored, or snapshot JSON does not create noise.</li>
        <li>Use <code>jq</code> for generated artifacts or validation-only shell steps, not as a replacement for repo-wide style policy.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Code className="inline-block" /> Pick the Right Tool
      </h2>
      <p>
        For most application repositories, Prettier is the better default because it gives you one consistent style for
        JSON and other text formats in the same codebase. It is especially useful when your repository already contains
        JavaScript, TypeScript, Markdown, YAML, or JSON configuration.
      </p>
      <p>
        <code>jq</code> is better suited to shell-heavy workflows: validating incoming JSON, reformatting machine-made
        files during builds, or inspecting pipeline output while debugging. It pretty-prints JSON by default, but it is
        not a team-wide formatting policy tool in the same way Prettier is.
      </p>
      <p>
        Whichever tool you choose, remember the boundary: formatting catches syntax and layout problems, but it does not
        replace schema validation or application tests.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Terminal className="inline-block text-purple-600" /> Check Mode vs Write Mode
      </h2>
      <p>
        This is the core distinction to get right. Use <code>--write</code> where it is safe to modify files. Use{" "}
        <code>--check</code> where you want the job to fail and force the change back into the branch.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h3 className="font-semibold mb-2">Typical commands</h3>
        <pre>
          <code className="language-bash">{`# Fix files locally
npx prettier . --write

# Fail CI if formatting drift is found
npx prettier . --check

# Target JSON-family files only
npx prettier "**/*.{json,jsonc,json5}" --check`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Prettier recommends quoting globs so the command behaves consistently across shells and operating systems.
        </p>
      </div>
      <p>
        If your pipeline uses <code>npm</code>, <code>pnpm</code>, or <code>yarn</code>, prefer the project-local
        binary rather than downloading a transient formatter version during the build. That keeps local runs and CI
        results aligned.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <UserCheck className="inline-block text-indigo-600" /> Pre-Commit Hooks Keep CI Quiet
      </h2>
      <p>
        CI should be the enforcement layer, not the first place developers discover formatting issues. A pre-commit hook
        fixes the easy cases before they become failed pull requests.
      </p>
      <p>
        If you use{" "}
        <a
          href="https://pre-commit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          pre-commit
        </a>
        , a local hook is a clean way to run the formatter already installed in your repository:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h3 className="font-semibold mb-2">
          Example <code>.pre-commit-config.yaml</code>
        </h3>
        <pre>
          <code className="language-yaml">{`repos:
  - repo: local
    hooks:
      - id: prettier-json
        name: prettier json
        language: system
        entry: npx prettier --write
        files: \\.(json|jsonc|json5)$`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This relies on the project&apos;s installed Prettier version and only rewrites matching JSON files before the commit is created.
        </p>
      </div>
      <p>
        If your team does not use pre-commit, the same idea works with Husky, lefthook, or any other Git-hook manager:
        run <code>--write</code> before the commit, then keep <code>--check</code> in CI as the hard gate.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <GitBranch className="inline-block text-blue-600" /> Minimal GitHub Actions Job
      </h2>
      <p>
        The exact CI provider matters less than the command. GitHub Actions is a common example, and the same pattern
        maps directly to GitLab CI, CircleCI, Jenkins, or Buildkite: install dependencies, then run the formatter in
        check mode.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h3 className="font-semibold mb-2">Example workflow</h3>
        <pre>
          <code className="language-yaml">{`name: json-format-check

on:
  pull_request:
  push:
    branches: [main]
    paths:
      - "**/*.json"
      - "**/*.jsonc"
      - "**/*.json5"
      - ".prettier*"
      - "package.json"
      - "package-lock.json"

jobs:
  prettier:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Check JSON formatting
        run: npx prettier "**/*.{json,jsonc,json5}" --check`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          The <code>paths</code> filter keeps unrelated pushes from running the job, which matters in larger repositories.
        </p>
      </div>
      <p>
        For non-GitHub systems, keep the shell commands and drop the provider-specific YAML. That gives you the same
        enforcement behavior without changing the underlying workflow design.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <FileText className="inline-block text-red-600" /> When jq Is the Better Fit
      </h2>
      <p>
        <code>jq</code> is ideal when a build step produces JSON and you want to validate or normalize it immediately.
        It also works well in slim environments where adding the full JavaScript toolchain would be excessive.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <h3 className="font-semibold mb-2">Useful jq patterns</h3>
        <pre>
          <code className="language-bash">{`# Validate JSON syntax in a CI step
jq . build/output.json > /dev/null

# Reformat a generated file safely
tmp_file="$(mktemp)"
jq . build/output.json > "$tmp_file" && mv "$tmp_file" build/output.json`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Write to a temporary file and move it into place. Redirecting output back into the same file will truncate it.
        </p>
      </div>
      <p>
        The main limitation is that <code>jq</code> only knows about JSON structure. It will not apply the same
        repository-wide style rules you use for other files, and it will not decide which generated directories should
        be excluded from checks.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <Zap className="inline-block text-amber-600" /> Common CI/CD Mistakes
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Auto-fixing in CI:</strong> A formatter that rewrites files during CI hides the problem. For pull
          requests, failing fast with <code>--check</code> is usually cleaner.
        </li>
        <li>
          <strong>Formatting generated output:</strong> Exclude build artifacts, vendored content, and snapshots with{" "}
          <code>.prettierignore</code> unless they are intentionally committed and reviewed.
        </li>
        <li>
          <strong>Unquoted globs:</strong> Shell expansion differs across environments. Quote file patterns to avoid
          "works on my machine" failures.
        </li>
        <li>
          <strong>Expecting formatting to validate meaning:</strong> A formatter can catch malformed JSON, but it will
          not tell you whether the keys, types, or values are correct for your application.
        </li>
        <li>
          <strong>Running on the whole monorepo by default:</strong> Scope the job to relevant directories or changed
          paths if runtime becomes noticeable.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
        <CheckCircle className="inline-block text-blue-600" /> Conclusion
      </h2>
      <p>
        A good JSON formatting pipeline is deliberately boring: fix locally, check in CI, ignore the files that should
        stay out of scope, and use <code>jq</code> only where shell-oriented JSON handling is actually the goal. That
        setup keeps diffs clean, catches broken JSON early, and removes format arguments from code review without
        overcomplicating the pipeline.
      </p>
    </article>
  );
}
