import type { Metadata } from "next";
import {
  GitBranch,
  CheckCheck,
  Settings,
  FileJson,
  Workflow,
  Search,
  Layers,
  Cpu,
  BellRing,
  Rocket,
  Diff,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Implementing JSON Diff Tools in Deployment Workflows",
  description:
    "A practical guide to implementing JSON diff checks in CI/CD and deployment workflows, including normalization, JSON Patch vs Merge Patch, GitHub Actions gates, and live drift checks.",
};

export default function JsonDiffInDeploymentArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Diff className="w-8 h-8 text-blue-600" /> Implementing JSON Diff Tools in Deployment Workflows
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          JSON diffing is most useful right before a release, when your team needs to answer one question quickly:
          what actually changed, and should that change block deployment? For configuration files, rendered
          infrastructure manifests, API snapshots, and feature-flag payloads, a plain text diff is usually too noisy to
          trust. A deployment workflow needs a structural comparison that understands JSON data, ignores cosmetic
          formatting, and surfaces only meaningful changes.
        </p>
        <p>
          The reliable pattern is simple: normalize the JSON first, remove volatile fields, compare against the right
          baseline, and wire the result into an approval or failure gate. Once you do that consistently, JSON diffing
          becomes a practical control for preventing configuration drift, catching API contract breaks, and making
          deployment reviews much faster.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-green-600" /> What Deployment-Ready JSON Diffing Looks Like
        </h2>
        <p>
          Teams usually run into trouble not because they forgot to diff, but because they diff the wrong data. A
          deploy-ready JSON diff step should do four things before it decides whether a rollout is safe:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Normalize input:</strong> sort keys, format consistently, and compare parsed JSON instead of raw
            text so whitespace and key ordering do not create noise.
          </li>
          <li>
            <strong>Strip unstable fields:</strong> remove timestamps, generated IDs, resource versions,
            last-applied-config annotations, and other values that change every deployment.
          </li>
          <li>
            <strong>Choose the right baseline:</strong> compare against the last production release, a checked-in
            golden file, or a contract snapshot from the currently deployed service.
          </li>
          <li>
            <strong>Return a useful signal:</strong> produce a reviewer-friendly diff and an exit code the pipeline can
            use to pass, fail, or require manual approval.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-purple-600" /> Choose the Right Diff Output
        </h2>
        <p>
          Not every diff format is suited to the same deployment decision. In practice, most teams need one format for
          humans and one format for automation.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Unified or structural diffs:</strong> best for pull requests, release reviews, and approval steps
            because they show exactly which paths and values changed.
          </li>
          <li>
            <strong>JSON Patch (RFC 6902):</strong> best when you need machine-readable operations such as
            &#x60;add&#x60;, &#x60;remove&#x60;, &#x60;replace&#x60;, &#x60;move&#x60;, &#x60;copy&#x60;, and
            &#x60;test&#x60;. This is useful when a deployment gate needs to assert that a field still has an expected
            value before rollout continues.
          </li>
          <li>
            <strong>JSON Merge Patch (RFC 7386):</strong> useful for object-heavy documents when you want a patch body
            that resembles the target JSON. It is much less expressive for arrays, and &#x60;null&#x60; means
            &quot;remove this field,&quot; so it is a poor fit when explicit null values matter semantically.
          </li>
        </ul>
        <p>
          A practical rule: use a readable diff for review, then use JSON Patch only when the pipeline needs
          path-level enforcement or downstream automation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-orange-600" /> Reference GitHub Actions Gate
        </h2>
        <p>
          A good CI implementation does not compare raw deployment payloads directly. It first turns both files into a
          stable representation, removes known-noisy keys, then fails the workflow only when the remaining diff is
          meaningful.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">
            <FileJson className="w-5 h-5 text-gray-600" /> Example Workflow
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`name: json-diff-gate
on:
  pull_request:
    paths:
      - "snapshots/**/*.json"
      - "rendered/**/*.json"

jobs:
  diff-json:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Normalize baseline and candidate
        shell: bash
        run: |
          set -euo pipefail

          jq -S 'del(
            .buildTimestamp,
            .metadata.resourceVersion,
            .metadata.uid,
            .metadata.managedFields,
            .metadata.annotations."kubectl.kubernetes.io/last-applied-configuration"
          )' snapshots/production.json > baseline.json

          jq -S 'del(
            .buildTimestamp,
            .metadata.resourceVersion,
            .metadata.uid,
            .metadata.managedFields,
            .metadata.annotations."kubectl.kubernetes.io/last-applied-configuration"
          )' rendered/config.json > candidate.json

      - name: Fail on unexpected JSON changes
        shell: bash
        run: |
          set -euo pipefail

          if diff -u baseline.json candidate.json > json.diff; then
            echo "No meaningful JSON differences detected." >> "$GITHUB_STEP_SUMMARY"
            exit 0
          fi

          echo "### JSON differences detected" >> "$GITHUB_STEP_SUMMARY"
          echo "" >> "$GITHUB_STEP_SUMMARY"
          echo '\`\`\`diff' >> "$GITHUB_STEP_SUMMARY"
          sed -n '1,200p' json.diff >> "$GITHUB_STEP_SUMMARY"
          echo '\`\`\`' >> "$GITHUB_STEP_SUMMARY"
          echo "::error file=rendered/config.json,title=Unexpected JSON change::Review json.diff before deployment."
          exit 1`}
          </pre>
        </div>
        <p>
          This pattern works well for application config, rendered Helm or Kustomize output converted to JSON,
          deployment descriptors, and API snapshot tests. If your runner image does not already include
          &#x60;jq&#x60;, add an installation step before normalization.
        </p>

        <div className="bg-blue-100 p-4 rounded-lg dark:bg-blue-900 my-4 text-blue-800 dark:text-blue-200 flex items-start gap-3">
          <BellRing className="w-5 h-5 flex-shrink-0 mt-1" />
          <p>
            <strong>Current GitHub Actions caveat:</strong> job summaries are limited to 1 MiB per step. Put the
            headline diff or the first chunk of output in &#x60;GITHUB_STEP_SUMMARY&#x60;, and keep the full diff in
            logs or a build artifact when files are large.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-teal-600" /> Where to Place the Gate
        </h2>
        <p>The most effective pipelines usually run JSON diffs in more than one place:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Pre-merge:</strong> compare the candidate artifact or API snapshot to the approved baseline so
            reviewers see meaningful changes before the code lands.
          </li>
          <li>
            <strong>Pre-deploy:</strong> compare what you are about to apply against the current live environment to
            catch drift that accumulated outside Git.
          </li>
          <li>
            <strong>Post-deploy:</strong> fetch the live JSON again and compare it with the expected result to verify
            that mutating admission, defaults, or rollout scripts did not introduce an unexpected shape change.
          </li>
          <li>
            <strong>Scheduled drift checks:</strong> run the same comparison daily or hourly against production
            snapshots so unexpected edits raise an alert before the next release window.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gray-600" /> Live Cluster Checks with &#x60;kubectl diff&#x60;
        </h3>
        <p>
          For Kubernetes deployments, the built-in &#x60;kubectl diff&#x60; command is useful as a final gate because
          it compares the current online configuration with the result of applying your manifests. Its output is always
          YAML, even when your source files are JSON, and it follows predictable exit codes you can wire into a
          deployment script.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" /> Pre-deploy Drift Check
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`export KUBECTL_EXTERNAL_DIFF="diff -u"

kubectl diff -f k8s/ --server-side

# Exit code guide:
# 0 = no differences
# 1 = differences found
# >1 = kubectl or diff command failed`}
          </pre>
        </div>
        <p>
          Use this near the deploy step, not as a replacement for earlier JSON normalization. Early CI should tell you
          whether the payload changed in a meaningful way; &#x60;kubectl diff&#x60; tells you whether the live cluster
          will change if you apply it now.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600" /> Challenges and Considerations
        </h2>
        <p>Most broken implementations fail for operational reasons rather than library quality:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Array order:</strong> if array position is not meaningful, use a diff mode that can match items by
            identity or sort them before comparison. If array order is meaningful, do not normalize it away.
          </li>
          <li>
            <strong>Generated metadata:</strong> Kubernetes manifests, cloud control plane exports, and generated build
            payloads often include fields like resource versions, UIDs, hashes, or timestamps that must be removed
            first.
          </li>
          <li>
            <strong>Sensitive data:</strong> never dump secrets, access tokens, or PII into pipeline logs just because
            a diff step found a change. Redact or omit those paths before writing any report.
          </li>
          <li>
            <strong>Large payloads:</strong> summarize the top-level paths that changed and store the full diff
            separately. A reviewer should not have to scroll through megabytes of JSON to make a release decision.
          </li>
          <li>
            <strong>Schema versus snapshot:</strong> diffing tells you what changed, not whether the new payload is
            valid. Pair diff checks with JSON Schema, OpenAPI contract tests, or typed decoding in the service itself.
          </li>
          <li>
            <strong>Approval fatigue:</strong> if your gate fails on every harmless field, people will learn to ignore
            it. Keep an allowlist for expected environment-specific differences and review that policy regularly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <CheckCheck className="w-6 h-6 text-blue-600" /> Deployment Checklist
        </h2>
        <p>If you are implementing JSON diff tools in deployment workflows for the first time, start with this order:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>1.</strong> Pick one high-impact JSON asset, such as rendered config, a public API response, or a
            generated infrastructure document.
          </li>
          <li>
            <strong>2.</strong> Define the baseline source of truth and write down which fields are expected to differ
            by environment.
          </li>
          <li>
            <strong>3.</strong> Normalize both files before comparison and redact unstable or sensitive paths.
          </li>
          <li>
            <strong>4.</strong> Fail the pipeline on unexpected changes, but show a concise summary so the reviewer can
            act quickly.
          </li>
          <li>
            <strong>5.</strong> Add a live pre-deploy or post-deploy drift check once the basic CI gate is trusted.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-gray-600" /> Conclusion
        </h2>
        <p>
          The best JSON diff workflow is not the most sophisticated one. It is the one that reliably answers whether a
          release changed something important, shows that change in a format humans can review, and turns the result
          into a clear deployment decision. Normalize first, keep the baseline honest, and let the pipeline enforce the
          same rules every release.
        </p>
      </div>
    </div>
  );
}
