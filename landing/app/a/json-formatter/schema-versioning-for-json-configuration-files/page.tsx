import type { Metadata } from "next";
import { AlertTriangle, GitCommitHorizontal, Code, ArrowRight, CheckCircle, Book } from "lucide-react";

export const metadata: Metadata = {
  title: "Schema Versioning for JSON Configuration Files",
  description:
    "A practical guide to schema versioning for JSON configuration files, including schemaVersion fields, JSON Schema 2020-12 validation, migrations, and safe rollout rules.",
};

export default function JsonSchemaVersioningArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Schema Versioning for JSON Configuration Files</h1>

      <div className="space-y-6">
        <p>
          Treat a JSON config format like an API. If a file can outlive one application release, be edited by humans,
          or be shared across services and tools, its structure will eventually change. Without explicit schema
          versioning, those changes become guesswork, and guesswork is what breaks loaders, deploys, and rollback
          paths.
        </p>
        <p>
          The safest default for most teams is simple: put a `schemaVersion` field in every config, validate each
          version explicitly, and migrate older files into one latest in-memory representation before the rest of the
          application touches them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-semibold mb-2">Recommended default</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a root-level `schemaVersion` field for the document format.</li>
            <li>Keep the application version separate from the config schema version.</li>
            <li>Validate against a schema for that exact version before migration.</li>
            <li>Migrate step-by-step from older versions to one latest internal model.</li>
            <li>Deploy readers that understand the new version before writers start emitting it.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>Why Config Schemas Break Over Time</span>
        </h2>
        <p>A configuration that starts simple often grows new nesting, defaults, and validation rules.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v1</h3>
          <pre>
            {`{
  "schemaVersion": 1,
  "featureEnabled": true,
  "message": "Feature is active!"
}`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v2</h3>
          <pre>
            {`{
  "schemaVersion": 2,
  "feature": {
    "enabled": true,
    "messages": {
      "admin": "Admin feature message",
      "user": "User feature message"
    },
    "startsAt": "2026-03-10T09:00:00Z"
  }
}`}
          </pre>
        </div>
        <p>
          A v1 reader expects top-level `featureEnabled` and `message` fields. If it reads v2 without a version check,
          it can fail outright or, worse, silently misinterpret the data. Explicit versioning turns that failure into a
          controlled branch instead of an accident.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-teal-500" />
          <span>The Practical Baseline</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Version the document, not just the file name.</strong> File names and directories can help, but
            the version should travel with the JSON itself.
          </li>
          <li>
            <strong>Normalize to one internal shape.</strong> The rest of the codebase should consume one latest
            structure, not branch on every historical format.
          </li>
          <li>
            <strong>Keep migrations incremental.</strong> Prefer `v1 -&gt; v2 -&gt; v3` functions over a growing set of
            special-case conversions from every old version directly to the newest.
          </li>
          <li>
            <strong>Decide your support window.</strong> Be explicit about how many old schema versions the loader will
            still accept and when they become unsupported.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-500" />
          <span>When To Bump The Version</span>
        </h2>
        <p>
          Do not tie schema versioning to every application release. Bump the config schema version when compatibility
          changes, not just because you shipped new code.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Removing, renaming, or moving a required field is a version bump.</li>
          <li>Changing a field type or meaning is a version bump.</li>
          <li>Tightening validation rules enough to reject old valid files is a version bump.</li>
          <li>
            Adding an optional field may not need a version bump if older readers safely ignore unknown properties and
            the new field does not change existing behavior.
          </li>
          <li>Changing defaults that materially change runtime behavior should be treated as a versioned change.</li>
        </ul>
        <p>
          Integer versions such as `1`, `2`, and `3` are usually the simplest choice for configuration files. Use
          semantic versioning only when external users or tools need the extra signal that major means incompatible,
          minor means backward-compatible additions, and patch means non-structural fixes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Book className="w-6 h-6 text-green-500" />
          <span>Do Not Confuse `schemaVersion`, App Version, And `$schema`</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>`schemaVersion`</strong> is your config document format. Your loader uses it to choose validation
            and migration logic.
          </li>
          <li>
            <strong>Application version</strong> is your binary or release number. It should stay separate because one
            app version may read several config schema versions.
          </li>
          <li>
            <strong>`$schema`</strong> belongs in the JSON Schema file. It tells validators which JSON Schema dialect
            that schema file uses.
          </li>
        </ul>
        <p>
          This distinction matters because `$schema` is not a replacement for `schemaVersion`. A config file can be
          validated by a JSON Schema written in the 2020-12 dialect while still being your own document version 2 or 7.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Book className="w-6 h-6 text-green-500" />
          <span>Validate Each Version With JSON Schema</span>
        </h2>
        <p>
          If you use JSON Schema today, the published 2020-12 draft is the right default unless your validator or
          platform is pinned to an older draft. Keep one schema file per config version and make the version check part
          of the schema itself.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Example schema for config v2</h3>
          <pre>
            {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://offlinetools.org/schemas/app-config.v2.schema.json",
  "title": "AppConfig v2",
  "type": "object",
  "properties": {
    "schemaVersion": {
      "const": 2
    },
    "feature": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean" },
        "startsAt": { "type": "string", "format": "date-time" },
        "messages": {
          "type": "object",
          "properties": {
            "admin": { "type": "string" },
            "user": { "type": "string" }
          },
          "required": ["admin", "user"],
          "additionalProperties": false
        }
      },
      "required": ["enabled", "messages", "startsAt"],
      "additionalProperties": false
    }
  },
  "required": ["schemaVersion", "feature"],
  "additionalProperties": false
}`}
          </pre>
        </div>
        <p>
          A strict schema catches accidental drift early: misspelled keys, wrong types, and forgotten required fields.
          If you intentionally allow extension points, document them clearly instead of silently accepting arbitrary
          extra properties everywhere.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight className="w-6 h-6 text-purple-500" />
          <span>Migrate To One Latest Representation</span>
        </h2>
        <p>
          A good loader has a predictable pipeline: parse JSON, detect `schemaVersion`, validate against that version,
          migrate one step at a time until the latest version, then hand the normalized object to the application.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Conceptual loader</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type AnyConfig = Record<string, unknown>;

const validators: Record<number, (value: AnyConfig) => boolean> = {
  1: validateConfigV1,
  2: validateConfigV2,
  3: validateConfigV3,
};

const migrations: Record<number, (value: AnyConfig) => AnyConfig> = {
  1: migrateV1ToV2,
  2: migrateV2ToV3,
};

function loadConfig(jsonText: string): LatestConfig {
  const raw = JSON.parse(jsonText) as AnyConfig;
  const detectedVersion =
    typeof raw.schemaVersion === "number" ? raw.schemaVersion : 1;

  const validate = validators[detectedVersion];
  if (!validate) {
    throw new Error("Unsupported schemaVersion: " + detectedVersion);
  }

  if (!validate(raw)) {
    throw new Error("Config failed validation for schemaVersion " + detectedVersion);
  }

  let current = raw;
  for (let version = detectedVersion; migrations[version]; version += 1) {
    current = migrations[version](current);
  }

  return parseLatestConfig(current);
}`}
            </pre>
          </div>
        </div>
        <p>
          Runtime migration helps the newest code read older configs. Offline migration still matters for persistent
          files because it lets you rewrite them once, review the diff, and stop carrying historical formats forever.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <GitCommitHorizontal className="w-6 h-6 text-indigo-500" />
          <span>Rollout Rules That Prevent Breakage</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Deploy readers before writers.</strong> The safe order is: release code that can read the new
            schema, then start writing the new schema.
          </li>
          <li>
            <strong>Never change meaning without changing version.</strong> Reusing the same version number for a
            different interpretation creates the hardest bugs to diagnose.
          </li>
          <li>
            <strong>Log deprecation warnings early.</strong> If schema version 1 will be removed, say so long before
            the removal release.
          </li>
          <li>
            <strong>Test round trips.</strong> Parse, migrate, write, and re-read representative real configs instead
            of only synthetic fixtures.
          </li>
          <li>
            <strong>Keep human editing in mind.</strong> Good error messages matter because many config failures are
            caused by manual edits, not code generation.
          </li>
        </ul>
        <p>
          Large configuration-driven systems follow this same pattern. Kubernetes, for example, puts an explicit
          `apiVersion` in manifests because configuration often survives longer than any single binary release.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <span>Common Mistakes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Relying only on file names such as `config.v2.json` and leaving the JSON itself ambiguous.</li>
          <li>Using `version` without documenting whether it means app release, business rule set, or schema format.</li>
          <li>Copying an outdated JSON Schema example and assuming draft-07 is still the default everywhere.</li>
          <li>Letting every subsystem branch on old versions instead of normalizing once near the loader.</li>
          <li>Keeping support for old versions forever because no deprecation deadline was defined.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best schema versioning strategy for JSON configuration files is usually not elaborate. Use an explicit
          `schemaVersion`, validate with a schema for that exact version, migrate incrementally to one latest internal
          model, and roll out reader support before new writers go live. That approach stays understandable for humans,
          testable for tooling, and much safer when real deployments drift over time.
        </p>
      </div>
    </>
  );
}
