import type { Metadata } from "next";
import { Book, CheckCheck, Code, FileJson, Info, Lightbulb, Users, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Self-Documenting JSON Configuration Best Practices | Offline Tools",
  description:
    "Write clearer JSON config with better naming, structure, JSONC comments, JSON Schema validation, versioning, and secret-handling practices.",
};

const namingExample = `{
  "rt": 5,
  "lg": "d",
  "ff": "1"
}

{
  "requestTimeoutMs": 5000,
  "logLevel": "debug",
  "newCheckoutEnabled": true
}`;

const structuredConfigExample = `{
  "schemaVersion": 2,
  "http": {
    "baseUrl": "https://api.example.com",
    "requestTimeoutMs": 5000,
    "retry": {
      "maxAttempts": 3,
      "backoffMs": 250
    }
  },
  "features": {
    "newCheckout": {
      "enabled": true
    }
  },
  "logging": {
    "level": "info",
    "destination": "stdout"
  }
}`;

const jsoncExample = `{
  // Human notes belong in JSONC, not strict JSON
  "requestTimeoutMs": 5000,
  "logLevel": "info",
  /* Keep secrets out of the file itself */
  "databasePasswordFromEnv": "DB_PASSWORD"
}`;

const jsonSchemaExample = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/app-config.schema.json",
  "title": "App configuration",
  "description": "Human-edited runtime settings for the web app.",
  "$comment": "Use description for user-facing docs and $comment for maintainer notes.",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "schemaVersion": {
      "type": "integer",
      "const": 2,
      "description": "Configuration schema version expected by the loader."
    },
    "requestTimeoutMs": {
      "type": "integer",
      "minimum": 100,
      "default": 5000,
      "examples": [1000, 5000, 10000],
      "description": "Outbound HTTP timeout in milliseconds."
    },
    "logLevel": {
      "type": "string",
      "enum": ["debug", "info", "warn", "error"],
      "default": "info",
      "description": "Minimum log severity to emit."
    },
    "featureFlags": {
      "$ref": "#/$defs/featureFlags"
    },
    "legacyApiBaseUrl": {
      "type": "string",
      "format": "uri",
      "deprecated": true,
      "description": "Old endpoint kept temporarily during migration."
    }
  },
  "required": ["schemaVersion", "requestTimeoutMs", "logLevel"],
  "$defs": {
    "featureFlags": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "newCheckout": {
          "type": "boolean",
          "default": false,
          "description": "Enable the new checkout flow."
        }
      }
    }
  }
}`;

export default function SelfDocumentingJsonArticlePage() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <FileJson className="mr-3 h-8 w-8 text-blue-500" />
        Self-Documenting JSON Configuration Best Practices
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Self-documenting JSON configuration should answer the questions a reader actually has while editing or
          reviewing a file: what a setting controls, which values are allowed, what units apply, what the default is,
          and whether the key is still safe to use.
        </p>
        <p>
          In practice, that means combining readable JSON structure with the right supporting format. Use strict JSON
          when machines own the file, JSONC when humans edit it and your toolchain explicitly supports comments, and
          JSON Schema when you want validation, hover text, safer migrations, and fewer configuration mistakes.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/70 dark:bg-blue-950/30">
          <h2 className="flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
            <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
            Quick Rules
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Name keys for meaning, not shorthand.</li>
            <li>Encode units and formats in the key when it removes ambiguity.</li>
            <li>Group settings by domain so readers can predict where things live.</li>
            <li>Prefer JSON Schema over fake comment fields for durable documentation.</li>
            <li>Version the config format and fail fast on unknown keys in stable sections.</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-3 h-6 w-6 text-green-500" />
          Start with Names and Structure
        </h2>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
          1. Name keys for meaning, unit, and intent
        </h3>
        <p>
          Short keys only help the author who already knows the system. Everyone else needs names that reveal the
          subject, the unit, and the kind of value being set. That is why <code>requestTimeoutMs</code> is better than{" "}
          <code>rt</code>, and <code>newCheckoutEnabled</code> is better than <code>ff</code>.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Ambiguous vs self-explanatory</h4>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <pre>{namingExample}</pre>
          </div>
        </div>
        <p>
          Good names remove the need for side notes. A reader should not have to guess whether <code>5</code> means
          seconds, milliseconds, retries, or severity.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
          2. Group by domain, not by parser convenience
        </h3>
        <p>
          Put related settings together the way an operator thinks about the system: network settings together,
          logging together, feature flags together. Keep nesting intentional rather than deep for its own sake.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">A predictable shape for a shared config file</h4>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <pre>{structuredConfigExample}</pre>
          </div>
        </div>
        <p>
          A top-level <code>schemaVersion</code> or <code>configVersion</code> field is small, but it gives migrations a
          clear anchor when the format evolves.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
          3. Let data types carry meaning
        </h3>
        <p>
          Use booleans for toggles, numbers for numeric thresholds, arrays for ordered lists, and constrained strings
          only when the domain really is an enum like <code>debug</code>, <code>info</code>, <code>warn</code>, and{" "}
          <code>error</code>. Avoid stringly typed settings like <code>"true"</code>, <code>"1"</code>, or{" "}
          <code>"yes"</code> unless a legacy interface forces them.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Info className="mr-3 h-6 w-6 text-blue-500" />
          Decide Up Front: JSON or JSONC?
        </h2>
        <p>
          Strict JSON does not allow comments. If a configuration file is mostly machine-generated or consumed by
          multiple unknown tools, keep it strict JSON. If humans regularly edit it and your parser plus editor
          explicitly support JSONC, comments can make the file easier to maintain.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Human-edited JSONC example</h4>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <pre>{jsoncExample}</pre>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-6">
          <li>Choose JSONC only when your runtime loader, CI checks, and editor flow all agree on it.</li>
          <li>
            Avoid trailing commas if portability matters. They are easy to add by habit, but support is less
            predictable across tools than plain comments.
          </li>
          <li>
            Treat fake comment keys like <code>_comment</code> or <code>__description</code> as a last resort. They
            pollute the data model and can leak into runtime behavior if a consumer forgets to ignore them.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Book className="mr-3 h-6 w-6 text-purple-500" />
          Use JSON Schema as Executable Documentation
        </h2>
        <p>
          For long-lived or shared configuration, JSON Schema is the strongest self-documenting layer because it
          explains the shape of the data and validates it at the same time. It is where you describe allowed values,
          defaults, examples, deprecated keys, required fields, and typo protection.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Modern schema example</h4>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <pre>{jsonSchemaExample}</pre>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <code>description</code> and <code>title</code> help humans and editors understand a field quickly.
          </li>
          <li>
            <code>default</code> documents the intended fallback, but your loader still needs to apply it if you want
            missing values to be materialized at runtime.
          </li>
          <li>
            <code>examples</code> make edge cases clearer than prose alone.
          </li>
          <li>
            <code>deprecated</code> is useful when you need a migration window instead of a hard break.
          </li>
          <li>
            <code>additionalProperties: false</code> is often worth using on stable config objects so misspelled keys
            fail fast.
          </li>
        </ul>
        <p>
          Modern schemas commonly use Draft 2020-12 and <code>$defs</code>. That is a good default for new work, but
          editor support is not identical everywhere. Before you standardize on newer keywords, confirm that your
          validator and your team&apos;s editor actually support the draft you choose.
        </p>
        <p>
          If you want editor assistance in a JSON instance file, associate the file with a schema. Some tools let you do
          that with a <code>$schema</code> property in the document, while others use workspace settings or file-pattern
          mappings. If adding a <code>$schema</code> field would break consumers, prefer the editor mapping approach.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Users className="mr-3 h-6 w-6 text-indigo-500" />
          Design for Change, Not Just Readability
        </h2>
        <p>
          A configuration file is only truly self-documenting if it stays understandable during migrations and partial
          rollouts. That requires a few rules beyond naming.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Version the format so loaders can migrate or reject unsupported files cleanly.</li>
          <li>Reject unknown keys in stable sections to catch typos before they become production bugs.</li>
          <li>Keep deprecated keys for a defined window, mark them in the schema, and log a clear warning.</li>
          <li>Validate sample configs in CI so your examples stay correct instead of becoming stale documentation.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Wrench className="mr-3 h-6 w-6 text-red-500" />
          Operational Guardrails
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Keep secrets out of checked-in JSON. Store environment variable names, secret-manager references, or file
            paths instead of raw API keys and passwords.
          </li>
          <li>Pick one casing convention for keys and keep it consistent across the whole repository.</li>
          <li>
            Make formats obvious in names: <code>cacheTtlSeconds</code>, <code>backupWindowCron</code>,{" "}
            <code>apiBaseUrl</code>, <code>releaseDateIso8601</code>.
          </li>
          <li>
            Format files with one formatter so key order, indentation, and trailing whitespace do not create review
            noise.
          </li>
        </ul>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Review Checklist</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Can a new teammate understand each key without opening a separate doc first?</li>
            <li>Are units, allowed values, and defaults obvious from the key name or schema?</li>
            <li>Will a typo or unknown key fail validation instead of being silently ignored?</li>
            <li>Are deprecated settings clearly marked and migration-safe?</li>
            <li>Are comments handled intentionally through JSONC or schema, not by invalid JSON tricks?</li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileJson className="mr-3 h-6 w-6 text-blue-500" />
          Bottom Line
        </h2>
        <p>
          The best self-documenting JSON configuration is not just pretty JSON. It uses clear names, a predictable
          shape, strict typing, explicit versioning, and schema-backed validation so the file explains itself while your
          tooling enforces the rules. That combination is what keeps a config understandable after the original author
          moves on.
        </p>
      </div>
    </>
  );
}
