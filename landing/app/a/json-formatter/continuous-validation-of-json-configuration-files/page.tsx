import type { Metadata } from "next";
import {
  CheckCircle,
  AlertCircle,
  Settings,
  FileJson,
  Code,
  Layers,
  Workflow,
  Hammer,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Continuous Validation of JSON Configuration Files | Offline Tools",
  description:
    "Set up continuous validation for JSON configuration files with JSON Schema, Ajv, editor feedback, CI checks, and runtime safeguards.",
};

const exampleConfig = `{
  "serviceName": "auth-api",
  "port": 8080,
  "logLevel": "info",
  "featureFlags": {
    "selfServiceSignup": true
  },
  "auth": {
    "enabled": true,
    "issuer": "https://login.example.com/",
    "audience": "auth-api"
  }
}`;

const schemaExample = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "serviceName": { "type": "string", "minLength": 1 },
    "port": { "type": "integer", "minimum": 1, "maximum": 65535 },
    "logLevel": { "enum": ["debug", "info", "warn", "error"] },
    "featureFlags": {
      "type": "object",
      "additionalProperties": { "type": "boolean" }
    },
    "auth": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "enabled": { "type": "boolean" },
        "issuer": { "type": "string", "format": "uri" },
        "audience": { "type": "string", "minLength": 1 }
      },
      "required": ["enabled", "issuer"]
    }
  },
  "required": ["serviceName", "port", "logLevel", "auth"]
}`;

const validateScriptExample = `{
  "scripts": {
    "validate:config": "ajv validate -s config/schema.json -d \\"config/*.json\\" --spec=draft2020 && node scripts/validate-config-semantics.mjs"
  }
}`;

const runtimeValidationExample = `import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import schema from "./config.schema.json";

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validate = ajv.compile(schema);

export function loadConfig(configPath: string) {
  const text = fs.readFileSync(configPath, "utf8");
  const config = JSON.parse(text);

  if (!validate(config)) {
    throw new Error(ajv.errorsText(validate.errors, { separator: "\\n" }));
  }

  if (config.auth.enabled && !config.auth.audience) {
    throw new Error("auth.audience is required when auth.enabled is true");
  }

  return config;
}`;

export default function JsonConfigValidationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Settings className="w-8 h-8 mr-3 text-gray-600" />
        Continuous Validation of JSON Configuration Files
      </h1>

      <div className="space-y-6">
        <p>
          Continuous validation means your JSON configuration files are checked automatically in the editor, before
          commit, in CI, and again when the app starts. The goal is simple: a broken config should fail fast long
          before it becomes a production incident.
        </p>
        <p>
          The most effective setup is layered. Parse the file to catch invalid JSON, validate it against a schema to
          catch missing or mistyped fields, then run a small set of semantic checks for rules your schema cannot express
          cleanly, such as cross-field dependencies or environment-specific constraints.
        </p>
        <p>
          <AlertCircle className="w-5 h-5 inline-block mr-1 text-yellow-600" />
          If humans edit these files directly, the biggest reliability gains usually come from two rules: make the
          schema strict and run the exact same validation command locally and in CI.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="w-7 h-7 mr-2 text-gray-600" /> What to Validate Continuously
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax:</strong> Catch malformed JSON immediately. A missing comma, trailing comma, or unescaped
            quote should never make it into a branch.
          </li>
          <li>
            <strong>Schema:</strong> Enforce required fields, correct types, enum values, and disallow stray keys that
            often come from typos.
          </li>
          <li>
            <strong>Semantic rules:</strong> Check things like allowed hostnames, file-path existence, mutually
            exclusive options, or feature-flag dependencies.
          </li>
          <li>
            <strong>Runtime loading:</strong> Validate on startup so environment-specific overrides and deployment-time
            mistakes still fail safely.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldCheck className="w-7 h-7 mr-2 text-gray-600" /> Choose Your JSON Schema Dialect Deliberately
        </h2>
        <p>
          JSON Schema draft <code>2020-12</code> is the current specification release, so it is the right choice when
          you need modern keywords such as <code>prefixItems</code>, <code>unevaluatedProperties</code>, or{" "}
          <code>$dynamicRef</code>.
        </p>
        <p>
          But tooling compatibility still matters. VS Code&apos;s built-in JSON support fully covers older drafts more
          consistently and only has limited support for <code>2019-09</code> and <code>2020-12</code>. Ajv also
          treats <code>draft-07</code> as its default and requires a separate <code>2020</code> entry point if you
          adopt the newer draft. In practice, teams often choose:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Draft 2020-12:</strong> Best when you need newer schema features and your validators are already
            standardized in CI.
          </li>
          <li>
            <strong>Draft-07:</strong> Best when broad editor compatibility and simpler validator setup matter more
            than the newest keywords.
          </li>
        </ul>
        <p>
          The important part is consistency. Do not mix schema drafts casually across the same validation path or you
          will end up debugging the tooling instead of the config.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-7 h-7 mr-2 text-gray-600" /> Start with a Strict Contract
        </h2>
        <p>
          Treat the configuration file as an API contract. Most weak validation setups fail because the schema is too
          permissive. A good baseline is to require the keys you actually need and set{" "}
          <code>additionalProperties: false</code> at every object boundary where stray keys should be rejected.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example config:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{exampleConfig}</code>
            </pre>
          </div>
          <h3 className="text-lg font-medium mb-2 mt-4">Matching schema:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{schemaExample}</code>
            </pre>
          </div>
        </div>
        <p>
          This already catches several common mistakes: unknown top-level keys, a string where a port number should be,
          a bad log level, or an invalid authentication issuer URL. If your team uses commented JSON or trailing commas,
          remember that plain <code>JSON.parse()</code> rejects them; use a JSONC-aware parser only if that format is
          intentional.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Workflow className="w-7 h-7 mr-2 text-gray-600" /> Run One Validation Command Everywhere
        </h2>
        <p>
          The cleanest continuous validation setup is a single command that developers can run locally and CI can run
          unchanged. Keep syntax, schema, and semantic checks behind one script so the result is reproducible.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example package script:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{validateScriptExample}</code>
            </pre>
          </div>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Editor:</strong> Associate your config files with the schema so developers see errors while typing.
          </li>
          <li>
            <strong>Pre-commit hook:</strong> Run the validation script before invalid config changes are committed.
          </li>
          <li>
            <strong>CI:</strong> Run the same command on every pull request and fail the build on any validation error.
          </li>
          <li>
            <strong>Release pipeline:</strong> Re-run validation for the environment-specific config bundle that will
            actually be deployed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Hammer className="w-7 h-7 mr-2 text-gray-600" /> Keep a Runtime Guard
        </h2>
        <p>
          CI reduces risk, but it does not eliminate it. Runtime validation still matters when configs are assembled
          from secrets managers, environment overrides, mounted files, or generated deployment artifacts.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Runtime validation with Ajv:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{runtimeValidationExample}</code>
            </pre>
          </div>
        </div>
        <p>
          This pattern gives you four separate protections: JSON syntax parsing, schema validation, readable error
          output, and a final semantic check for business rules that do not belong in the schema.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-7 h-7 mr-2 text-gray-600" /> Practical Rules That Prevent Most Failures
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Reject unknown keys with <code>additionalProperties: false</code> unless the object is intentionally
            extensible.
          </li>
          <li>
            Keep the schema next to the config or loader code so changes happen together in the same review.
          </li>
          <li>
            Validate example config files in the repository, not just production overrides.
          </li>
          <li>
            Fail on startup with a clear message instead of continuing with a partially valid configuration.
          </li>
          <li>
            Use semantic checks for rules involving the filesystem, network destinations, secret names, or cross-field
            dependencies.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <XCircle className="w-7 h-7 mr-2 text-red-600" /> Common Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Only validating syntax:</strong> A file can be valid JSON and still be unusable by the
            application.
          </li>
          <li>
            <strong>Only validating in CI:</strong> Developers get slower feedback and runtime-only overrides can still
            break production.
          </li>
          <li>
            <strong>Using a loose schema:</strong> Optional-everything schemas create false confidence.
          </li>
          <li>
            <strong>Ignoring draft compatibility:</strong> Newer schema keywords are useful, but only when your editor
            and validator stack support them consistently.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="w-7 h-7 mr-2 text-green-600" /> Recommended Baseline
        </h2>
        <p>
          For most teams, the baseline that delivers the best return is straightforward: define a strict schema, wire
          it into editor feedback, run one validation command in pre-commit and CI, and validate again on application
          startup. That is the practical meaning of continuous validation for JSON configuration files.
        </p>
        <p>
          If you need the newest JSON Schema features, adopt <code>2020-12</code> intentionally and standardize the
          validator path. If you mainly want broad tooling support and low friction, <code>draft-07</code> is still a
          reasonable operational choice. Either way, consistent enforcement matters more than theoretical schema power.
        </p>
      </div>
    </>
  );
}
