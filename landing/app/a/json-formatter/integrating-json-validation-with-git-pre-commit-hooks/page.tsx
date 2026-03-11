import type { Metadata } from "next";
import { Check, FileJson2, GitCommitHorizontal, Settings, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrating JSON Validation with Git Pre-Commit Hooks | Offline Tools",
  description:
    "Validate staged JSON before every Git commit with a plain hook, Husky, or pre-commit. Includes syntax checks, schema validation, and practical troubleshooting tips.",
};

export default function JsonValidationPreCommitHookArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <FileJson2 className="h-8 w-8 text-blue-500" />
        Integrating JSON Validation with Git Pre-Commit Hooks
      </h1>

      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
        <p>
          If you want Git to validate JSON before a commit lands, keep the hook simple: syntax-check every staged{" "}
          <code>.json</code> file, add schema validation only where structure matters, and run the same checks again in
          CI. That catches broken configuration early without turning pre-commit into a slow bottleneck.
        </p>
        <p>
          This page focuses on the setups that are still practical in 2026: a plain Git hook for minimal repos, Husky
          for Node.js projects, and the <code>pre-commit</code> framework for teams that want shared hooks across
          multiple languages.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/60 dark:bg-blue-950/30">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Recommended default</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-blue-900 dark:text-blue-100">
            <li>Validate only staged JSON files so commits stay fast.</li>
            <li>Use syntax validation for every JSON file and schema validation for important config files.</li>
            <li>Keep the same validation in CI because local hooks can still be skipped with <code>--no-verify</code>.</li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          <GitCommitHorizontal className="h-6 w-6 text-green-500" />
          What pre-commit hooks can and cannot guarantee
        </h2>
        <p>
          Git runs the <code>pre-commit</code> hook before it asks for the commit message. If the hook exits with a
          non-zero status, the commit stops immediately. That makes it a good place to reject malformed JSON before it
          hits shared history.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <ShieldCheck className="mr-1 inline-block h-5 w-5 text-yellow-500" />
            <strong>Great for fast local feedback:</strong> developers see JSON failures before push or CI.
          </li>
          <li>
            <GitCommitHorizontal className="mr-1 inline-block h-5 w-5 text-purple-500" />
            <strong>Not a security boundary:</strong> <code>git commit --no-verify</code> bypasses the hook.
          </li>
          <li>
            <Check className="mr-1 inline-block h-5 w-5 text-blue-500" />
            <strong>Best when paired with CI:</strong> local hooks keep people fast, CI keeps the main branch honest.
          </li>
        </ul>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          <FileJson2 className="h-6 w-6 text-orange-500" />
          Syntax validation vs. schema validation
        </h2>
        <p>Most teams need both, but not for the same files.</p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong>Syntax validation</strong> catches broken commas, quotes, braces, and other parsing errors. Apply
            it to every staged <code>.json</code> file.
          </li>
          <li>
            <strong>Schema validation</strong> checks that a valid JSON document also has the right shape, required
            keys, types, and enum values. Apply it to files like app config, content models, or machine-read settings.
          </li>
        </ol>
        <p>
          If a file is edited by humans and consumed by code, schema validation usually pays for itself. If it is
          generated or only used as test data, syntax validation is often enough.
        </p>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Settings className="h-6 w-6 text-teal-500" />
          Option 1: Plain Git hook with no extra hook manager
        </h2>
        <p>
          This is the fastest path if you just want Git to reject invalid staged JSON and your team already has Node.js
          available. The script below uses Git pathspecs instead of <code>grep</code>, so it only asks Git for staged{" "}
          <code>.json</code> files.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">Create <code>.git/hooks/pre-commit</code></h3>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`#!/usr/bin/env bash
set -euo pipefail

found_json=false

while IFS= read -r -d '' file; do
  found_json=true

  if ! node -e 'JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"))' "$file"; then
    echo "Invalid JSON: $file"
    exit 1
  fi

  echo "OK  $file"
done < <(git diff --cached --name-only -z --diff-filter=ACMR -- '*.json')

if [ "$found_json" = false ]; then
  echo "No staged JSON files."
fi`}
          </pre>
        </div>
        <p>
          Make it executable with <code>chmod +x .git/hooks/pre-commit</code>. This hook is intentionally narrow: it
          validates staged JSON files only, and it fails on the first broken file so the error is obvious.
        </p>
        <p>
          If your team already depends on <code>jq</code>, you can replace the Node command with{" "}
          <code>jq empty "$file"</code> and keep the rest of the hook the same.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Option 2: Husky + lint-staged for Node.js repositories</h2>
        <p>
          For a shared project, committing a raw file to <code>.git/hooks</code> is not enough because Git does not
          version those hooks for other contributors. Husky solves that by storing hook scripts in your repo, and{" "}
          <code>lint-staged</code> keeps the checks limited to staged files.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">Install the current Husky setup</h3>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">{`pnpm add -D husky lint-staged ajv-cli
pnpm exec husky init`}</pre>
        </div>
        <p>
          Husky&apos;s current setup flow creates <code>.husky/pre-commit</code> and updates your package scripts for
          you. Replace the generated command in <code>.husky/pre-commit</code> with this:
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">{`pnpm exec lint-staged`}</pre>
        </div>

        <h3 className="mt-6 mb-3 text-xl font-semibold">Add a focused lint-staged config</h3>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`{
  "*.json": "node scripts/validate-json-syntax.mjs",
  "config/app.json": "pnpm exec ajv validate --spec=draft2020 -s schemas/config.schema.json -d config/app.json"
}`}
          </pre>
        </div>

        <h3 className="mt-6 mb-3 text-xl font-semibold">Example syntax checker</h3>
        <p>
          <code>lint-staged</code> passes the staged file list to your command. A tiny Node script is enough for the
          syntax pass:
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`import fs from "node:fs";

for (const file of process.argv.slice(2)) {
  JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(\`OK \${file}\`);
}`}
          </pre>
        </div>
        <p>
          This pattern scales well: keep one broad syntax rule for <code>*.json</code>, then add a few precise schema
          rules for the files that truly need structure checks.
        </p>
        <p>
          If your schema uses JSON Schema draft 2019-09 or 2020-12, pass the matching Ajv CLI flag such as{" "}
          <code>--spec=draft2020</code>. If you stay on draft-07, you can omit <code>--spec</code>.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Option 3: The pre-commit framework for polyglot teams</h2>
        <p>
          If your repository is not centered on Node.js, the <code>pre-commit</code> framework is often the cleanest
          choice. It installs hooks from versioned repositories and works well across Python, Node, Go, and mixed-code
          projects.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold">Example <code>.pre-commit-config.yaml</code></h3>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm text-gray-900 dark:text-gray-100">
            {`repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v6.0.0
    hooks:
      - id: check-json

  - repo: https://github.com/python-jsonschema/check-jsonschema
    rev: 0.37.0
    hooks:
      - id: check-jsonschema
        files: ^config/.*\\.json$
        args:
          - --schemafile
          - schemas/config.schema.json`}
          </pre>
        </div>
        <p>
          After installing <code>pre-commit</code>, run <code>pre-commit install --install-hooks</code>. This gives
          you a shared, versioned way to reject malformed JSON and validate important files against a schema without
          writing your own hook runner.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Common mistakes and troubleshooting</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Relying on syntax checks alone:</strong> a file can be perfectly valid JSON and still break your app
            if required keys are missing or types are wrong.
          </li>
          <li>
            <strong>Validating the whole repository on every commit:</strong> that slows down contributors and makes
            hooks easy to resent. Limit checks to staged files whenever possible.
          </li>
          <li>
            <strong>Applying JSON rules to JSONC or JSON5:</strong> comments and trailing commas are not valid JSON.
            Treat those files separately instead of forcing them through a strict JSON parser.
          </li>
          <li>
            <strong>Forgetting CI:</strong> hooks improve local quality, but they do not replace server-side checks
            because developers can bypass them.
          </li>
          <li>
            <strong>Overcomplicating schema maps:</strong> if dozens of files use different schemas, move the mapping
            into a small script instead of trying to encode everything directly in one hook command.
          </li>
        </ul>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Which setup should you pick?</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Pick a <strong>plain Git hook</strong> if you want the smallest possible solution and your team can manage
            the local setup manually.
          </li>
          <li>
            Pick <strong>Husky + lint-staged</strong> if you already use Node.js and want versioned hooks that feel
            natural in a JavaScript repository.
          </li>
          <li>
            Pick <strong>pre-commit</strong> if your repo spans multiple languages or your team already standardizes on
            it for shared checks.
          </li>
        </ul>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Conclusion</h2>
        <p>
          The best Git JSON validation setup is usually the boring one: parse staged files quickly, add schema checks
          only where they protect real production config, and keep the exact same validation in CI. Do that, and bad
          JSON stops being a release-time surprise and becomes a fast local fix.
        </p>
      </div>
    </>
  );
}
