import type { Metadata } from "next";
import { AlertTriangle, Check, Code, FileJson, GitBranch, Hammer, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Automated JSON Formatting in Git Hooks | Offline Tools",
  description:
    "Set up automated JSON formatting in Git hooks with Husky, lint-staged, Prettier, or pre-commit. Includes current examples, partial-staging caveats, and troubleshooting tips.",
};

export default function AutomatedJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 text-blue-500" size={32} />
        Automated JSON Formatting in Git Hooks
      </h1>

      <div className="space-y-6">
        <p>
          If JSON files keep showing up in pull requests with mixed indentation, inconsistent spacing, or accidental
          reordering, a Git pre-commit hook is the right place to fix it. The hook can format staged JSON files before
          the commit is created, which keeps diffs smaller and avoids style debates in code review.
        </p>

        <p>
          For most JavaScript and TypeScript repositories today, the best default is{" "}
          <code>Prettier + lint-staged + Husky</code>. That setup formats only staged files, works well with{" "}
          <code>git add --patch</code>, and shares the hook configuration with the rest of the team. If you want fewer
          Node-specific dependencies, a raw Git hook or Python&apos;s <code>pre-commit</code> framework can do the same
          job.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>Husky + lint-staged + Prettier</code> if your repo already has a Node toolchain.
          </li>
          <li>
            Use <code>pre-commit</code> if you want language-agnostic hooks that are easy to pin and update.
          </li>
          <li>
            Use a raw shell hook only if you want the simplest possible setup and understand the staging caveats.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <GitBranch className="mr-2 text-green-500" />
          How Git Hooks Fit In
        </h2>
        <p>
          Git runs hook programs from <code>.git/hooks</code> by default, or from another directory if you configure{" "}
          <code>core.hooksPath</code>. The <code>pre-commit</code> hook runs before the commit object is created. If
          the hook exits with a non-zero status, Git aborts the commit. Developers can still bypass it with{" "}
          <code>git commit --no-verify</code>, so hooks should be treated as fast local guardrails, not your only
          enforcement layer.
        </p>

        <p>
          That matters for JSON because formatting is deterministic and cheap. A hook can pretty-print files, reject
          invalid JSON, and re-stage the corrected version before the commit lands in history.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-2 text-teal-500" />
          Recommended Setup: Husky + lint-staged + Prettier
        </h2>
        <p>
          This is the most practical setup for modern web repos. Prettier&apos;s own documentation recommends a
          pre-commit tool, and specifically calls out <code>lint-staged</code> when you need support for partially
          staged files.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">1. Install the formatter and hook tools</h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">{`pnpm add -D prettier husky lint-staged
pnpm exec husky init`}</pre>
        </div>

        <p>
          If you use <code>npm</code>, <code>yarn</code>, or <code>bun</code>, use the equivalent install and exec
          commands. <code>husky init</code> creates a <code>.husky/pre-commit</code> hook and wires Husky into your
          project setup.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">2. Add a lint-staged rule for JSON files</h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">{`{
  "lint-staged": {
    "*.json": "prettier --write --ignore-unknown"
  }
}`}</pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">3. Run lint-staged from the pre-commit hook</h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">{`# .husky/pre-commit
pnpm exec lint-staged`}</pre>
        </div>

        <p>
          This gives you the behavior most teams want: only staged JSON files are formatted, the updated files are
          staged again automatically, and partially staged files are handled much more safely than a hand-rolled{" "}
          <code>git add</code> loop.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Why Prettier is a good default:</strong> it formats JSON consistently without sorting keys.
          </li>
          <li>
            <strong>Why lint-staged matters:</strong> it targets staged files instead of running on the whole
            repository.
          </li>
          <li>
            <strong>Why Husky is useful:</strong> the hook lives in the repository, so the setup is easy to share.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Hammer className="mr-2 text-yellow-500" />
          Minimal Shell Hook for Small Repos
        </h2>
        <p>
          If you do not want extra tooling, a plain shell hook still works well for simple repositories. A good pattern
          is to keep the hook in a committed directory such as <code>.githooks/</code> and point Git at it with{" "}
          <code>git config core.hooksPath .githooks</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">
            <code>.githooks/pre-commit</code>
          </h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">{`#!/bin/sh
files=$(git diff --cached --name-only --diff-filter=ACMR -- '*.json')
[ -z "$files" ] && exit 0

old_ifs=$IFS
IFS='
'
for file in $files; do
  prettier --write --ignore-unknown "$file" || exit 1
  git add "$file" || exit 1
done
IFS=$old_ifs

exit 0`}</pre>
        </div>

        <p>
          Swap <code>prettier</code> for <code>jq</code> or another formatter if your project is not Node-based. Just
          be careful with tools that sort keys automatically. For example, <code>jq -S</code> and the default behavior
          of some hook formatters can reorder object keys, which may create noisy diffs if your team prefers the
          original logical order.
        </p>

        <p>
          The tradeoff is staging behavior: a manual hook usually reformats the entire file and re-adds it. That is
          acceptable for simple workflows, but it is not the safest choice if contributors frequently use{" "}
          <code>git add --patch</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" />
          Python pre-commit Alternative
        </h2>
        <p>
          If your team already uses the <code>pre-commit</code> framework, the built-in JSON hooks are a solid option.
          This keeps formatter versions pinned in one file and works well across polyglot repositories.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">
            <code>.pre-commit-config.yaml</code>
          </h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">{`repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v6.0.0
    hooks:
      - id: check-json
      - id: pretty-format-json
        args: [--autofix, --no-sort-keys]`}</pre>
        </div>

        <p>
          In this setup, <code>check-json</code> rejects invalid files and <code>pretty-format-json</code> rewrites
          them in place. The explicit <code>--no-sort-keys</code> flag avoids surprise key reordering. After adding the
          file, run <code>pre-commit install</code>, and use <code>pre-commit autoupdate</code> occasionally to refresh
          pinned hook versions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Common Pitfalls and Current Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Partially staged files:</strong> this is the main reason to prefer <code>lint-staged</code> or, in
            more advanced cases, <code>git-format-staged</code>. Raw hooks that run a formatter and then{" "}
            <code>git add</code> can stage changes the developer did not mean to include.
          </li>
          <li>
            <strong>Invalid JSON:</strong> the formatter should fail the commit cleanly. That is useful signal, not
            friction. Fix the syntax, re-stage the file, and commit again.
          </li>
          <li>
            <strong>Generated or huge JSON files:</strong> skip files that are machine-generated, vendored, or so large
            that formatting them on every commit becomes slow and noisy.
          </li>
          <li>
            <strong>Shared config:</strong> keep your formatting rules in one committed place such as{" "}
            <code>.prettierrc</code>, <code>package.json</code>, or <code>.pre-commit-config.yaml</code>.
          </li>
          <li>
            <strong>CI still matters:</strong> because hooks can be bypassed with <code>--no-verify</code>, add a
            formatter or validation check in CI if JSON consistency is important for the repository.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Check className="mr-2 text-green-500" />
          Bottom Line
        </h2>
        <p>
          If you want the least surprising setup, use <code>Prettier + lint-staged + Husky</code>. If you want a
          language-agnostic workflow, use <code>pre-commit</code> with <code>check-json</code> and{" "}
          <code>pretty-format-json</code>. Reserve raw shell hooks for smaller repos where you control the workflow and
          understand the tradeoffs.
        </p>

        <p>
          The important part is not the specific tool. It is making JSON formatting automatic, predictable, and fast
          enough that contributors stop thinking about it.
        </p>
      </div>
    </>
  );
}
