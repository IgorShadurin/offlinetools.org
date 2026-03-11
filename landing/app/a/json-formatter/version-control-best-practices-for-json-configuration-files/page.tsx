import type { Metadata } from "next";
import {
  CheckCheck,
  ClipboardList,
  CodeXml,
  FileCode,
  FileDiff,
  FolderTree,
  GitCommitHorizontal,
  GitPullRequest,
  GripVertical,
  LockKeyhole,
  RefreshCw,
  Settings,
  Shield,
  Waypoints,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Version Control Best Practices for JSON Configuration Files | Offline Tools",
  description:
    "Practical Git best practices for JSON config files, including deterministic formatting, schema validation, cleaner diffs, safer merges, and secret handling.",
};

const canonicalJsonExample = `{
  "api": {
    "baseUrl": "https://api.example.com",
    "timeoutMs": 5000
  },
  "features": {
    "newCheckout": true,
    "searchV2": false
  }
}`;

const arrayBasedConfigExample = `{
  "services": [
    {
      "name": "billing",
      "timeoutMs": 2000
    },
    {
      "name": "search",
      "timeoutMs": 1000
    }
  ]
}`;

const keyedConfigExample = `{
  "services": {
    "billing": {
      "timeoutMs": 2000
    },
    "search": {
      "timeoutMs": 1000
    }
  }
}`;

const configLayoutExample = `config/
  base.json
  production.json
  staging.json
config.local.json   # gitignored`;

const schemaExample = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "api": {
      "type": "object",
      "properties": {
        "baseUrl": { "type": "string" },
        "timeoutMs": { "type": "integer", "minimum": 0 }
      },
      "required": ["baseUrl", "timeoutMs"],
      "additionalProperties": false
    }
  },
  "required": ["api"],
  "additionalProperties": false
}`;

const gitDiffExample = `# .gitattributes
*.json diff=json

# .git/config or ~/.gitconfig
[diff "json"]
  algorithm = minimal`;

const mergeDriverExample = `# .gitattributes
*.json merge=json

# .git/config
[merge "json"]
  name = json-aware merge
  driver = your-json-merge %O %A %B %L %P`;

const secretExample = `{
  "database": {
    "host": "db.internal",
    "passwordEnv": "DB_PASSWORD"
  }
}`;

export default function JsonConfigVersionControl() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Version Control Best Practices for JSON Configuration Files</h1>

      <div className="space-y-6">
        <p>
          JSON configuration files become hard to manage when every editor rewrites them differently, arrays get
          reordered for no semantic reason, and production-only values or secrets live next to safe defaults. Good
          version control practice is really about making each JSON change deterministic, reviewable, and easy to
          validate before it reaches your main branch.
        </p>
        <p>
          The workflow that scales is simple: normalize formatting before commit, structure config so unrelated teams do
          not edit the same lines, validate shape and types automatically, and keep sensitive values out of Git. If you
          do those four things consistently, Git becomes much better at showing real intent instead of formatting noise.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileDiff className="mr-2" size={24} />
          What Usually Goes Wrong
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>One logical change is mixed with a whole-file reformat, so reviewers cannot see what actually changed.</li>
          <li>Large arrays are used for items that really have stable IDs, which makes inserts and reordering conflict-prone.</li>
          <li>Base config, environment overrides, and developer-local values are all committed in the same file.</li>
          <li>Broken JSON or wrong value types are only discovered after deployment because validation is manual.</li>
          <li>Secrets or machine-specific values leak into history and are painful to rotate later.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CheckCheck className="mr-2" size={24} />
          The Short Answer
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Commit one config change at a time and keep formatting-only rewrites in their own commit.</li>
          <li>Use one canonical JSON style so diffs stay small and predictable.</li>
          <li>Prefer keyed objects over arrays when item order is not meaningful.</li>
          <li>Validate config with JSON Schema in CI before merge and before deploy.</li>
          <li>Store defaults in Git, store secrets elsewhere, and review config diffs as carefully as code.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <ClipboardList className="mr-2" size={24} />
          Best Practices in Detail
        </h2>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <GitCommitHorizontal className="mr-2" size={20} />
          1. Make Every Config Commit Atomic and Reversible
        </h3>
        <p>
          A good config commit answers one clear question: what behavior changed? Updating a timeout, enabling a
          feature flag, or introducing a new service endpoint should each be separate commits. If you also need to
          reformat the file, do that in a dedicated formatter-only commit so the semantic change stays obvious and easy
          to revert.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <FileCode className="mr-2" size={20} />
          2. Canonicalize Formatting Before Every Commit
        </h3>
        <p>
          JSON diffs are only readable when every file is serialized the same way every time. Use the same indentation,
          line endings, final newline behavior, and property layout for the whole repo. Keep one property per line in
          objects that humans review often, and only sort keys if your application does not attach meaning to display
          order.
        </p>
        <p>
          Most importantly, keep the file valid JSON. JSON does not allow comments, so do not put inline notes inside
          the config itself. If reviewers need context, put it in a schema, README, or adjacent documentation file.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Recommended serialized style</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{canonicalJsonExample}</pre>
        </div>
        <p>
          A JSON formatter is the easiest place to enforce this. Run it locally before commit and again in CI so the
          branch cannot drift into multiple serialization styles.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <GripVertical className="mr-2" size={20} />
          3. Prefer Keyed Objects Over Arrays When Order Does Not Matter
        </h3>
        <p>
          Arrays are fine when order is part of the meaning, such as middleware order or a priority list. They are a
          poor fit for collections of named items like feature flags, services, tenants, or per-market settings.
          Turning those collections into objects keyed by a stable identifier dramatically reduces insert and reorder
          conflicts.
        </p>
        <div className="my-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 text-lg font-medium">Conflict-prone array</h4>
            <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              {arrayBasedConfigExample}
            </pre>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 text-lg font-medium">Stable object keyed by ID</h4>
            <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              {keyedConfigExample}
            </pre>
          </div>
        </div>
        <p>
          This one change often does more for merge quality than any Git setting, because Git is working with smaller,
          more localized line edits.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <FolderTree className="mr-2" size={20} />
          4. Split Base Config, Environment Overrides, and Local Secrets
        </h3>
        <p>
          Teams run into trouble when every environment is encoded in one giant file. A cleaner pattern is to commit a
          safe base file, add small environment-specific override files for non-secret differences, and keep
          developer-local overrides or secrets out of version control entirely.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Typical repo layout</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{configLayoutExample}</pre>
        </div>
        <p>
          This keeps production changes narrow and lets local development stay flexible without polluting shared config
          history.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <CodeXml className="mr-2" size={20} />
          5. Validate With JSON Schema in CI
        </h3>
        <p>
          Formatting solves readability, not correctness. To catch missing keys, wrong types, and unexpected fields,
          validate your config in automation. The current JSON Schema specification is Draft 2020-12, and even a small
          schema gives reviewers a much stronger safety net than manual eyeballing.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Minimal schema for a config file</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{schemaExample}</pre>
        </div>
        <p>
          Run schema validation in pre-commit hooks if you want quick local feedback, but always enforce it again in CI
          so the main branch cannot accept invalid JSON.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Wrench className="mr-2" size={20} />
          6. Use Git Settings That Improve Review, Not Just Silence Conflicts
        </h3>
        <p>
          Git supports path-specific diff behavior through <code>.gitattributes</code>. For JSON files, a dedicated
          diff driver with a minimal diff algorithm can make reviews cleaner by shrinking noisy hunks around nearby
          changes.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Simple JSON diff setup</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{gitDiffExample}</pre>
        </div>
        <p>
          That helps diff output, but it does not magically make merges safe. Avoid using <code>merge=union</code> for
          JSON just to get fewer conflict markers. For structured data, a silent but incorrect merge is worse than an
          explicit conflict.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Advanced: custom JSON-aware merge driver</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{mergeDriverExample}</pre>
        </div>
        <p>
          Only do this if the merge driver actually parses JSON and re-serializes it deterministically. If it just
          concatenates text, you are trading visible conflicts for broken config.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <RefreshCw className="mr-2" size={20} />
          7. If You Introduce Normalization Later, Roll It Out Deliberately
        </h3>
        <p>
          Adding a formatter, line-ending normalization, or a clean/smudge filter to an existing repo can create noisy
          three-way merges for a while. The safest rollout is a dedicated normalization commit, followed by regular
          semantic commits. During that transition, Git&apos;s <code>merge.renormalize</code> setting can reduce
          spurious conflicts caused by the serialization change itself.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <LockKeyhole className="mr-2" size={20} />
          8. Keep Secrets and Machine-Specific Values Out of Git
        </h3>
        <p>
          JSON config in version control should describe safe defaults and references, not live credentials. Use
          environment variables, a secrets manager, or deployment-time injection for sensitive values. If developers
          need a template, commit a sample that points to the secret name rather than the secret itself.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Commit a reference, not the secret</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">{secretExample}</pre>
        </div>
        <p>
          Secret scanning in CI is worth adding as a backstop, but the better practice is to keep the secret out of the
          tracked file in the first place.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <GitPullRequest className="mr-2" size={20} />
          9. Review Config Pull Requests Like Deployment Changes
        </h3>
        <p>When JSON controls runtime behavior, the review bar should look closer to an infrastructure change than a typo fix.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Is the diff mostly semantic, or is it hiding inside a formatting rewrite?</li>
          <li>Does the new value have the right unit, range, and environment scope?</li>
          <li>Will the change behave safely for existing users or only for fresh deployments?</li>
          <li>Did schema validation, tests, and secret checks pass on the pull request?</li>
          <li>Is rollback obvious if the config change needs to be reversed quickly?</li>
        </ul>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Settings className="mr-2" size={20} />
          10. Document Generated JSON and Human Authoring Rules
        </h3>
        <p>
          Some JSON files are hand-edited. Others are generated from a higher-level source. Mixing those workflows
          without documentation creates churn. If a file is generated, document the source of truth and the exact
          regeneration command. If humans need comments or richer authoring features, consider maintaining JSONC, TOML,
          or YAML as source and emitting stable JSON as build output.
        </p>
        <p>
          The important part is determinism: whether humans or tools edit the source, the committed JSON should be
          reproducible and serialized the same way every time.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Waypoints className="mr-2" size={24} />
          When a Merge Conflict Happens Anyway
        </h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Reformat both sides to the canonical style first so you are resolving intent, not whitespace.</li>
          <li>Check whether the conflict is really caused by an unnecessary array or mixed environment values.</li>
          <li>Resolve the JSON, then run schema validation and any config-related tests before committing.</li>
          <li>Write a commit message that explains the behavior you kept, not just that you fixed a conflict.</li>
        </ol>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Shield className="mr-2" size={24} />
          Bottom Line
        </h2>
        <p>
          The best version control strategy for JSON configuration files is to reduce ambiguity before Git ever has to
          help you. Canonical formatting, conflict-resistant structure, schema validation, and strict secret handling
          produce smaller diffs, safer reviews, and fewer merge surprises. Add Git-specific diff and merge tuning on top
          of that foundation, and JSON config stops feeling fragile.
        </p>
      </div>
    </>
  );
}
