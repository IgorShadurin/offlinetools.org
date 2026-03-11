import type { Metadata } from "next";
import {
  Settings,
  GitBranch,
  FileJson,
  Lock,
  Cloud,
  CheckCheck,
  Workflow,
  Package,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Configuration Management in DevOps Pipelines Guide | Offline Tools",
  description:
    "Learn a practical pattern for JSON configuration in CI/CD: validate structure, separate secrets, promote one artifact across environments, and deploy safely.",
};

export default function JsonConfigInDevOpsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Settings className="w-8 h-8" /> JSON Configuration Management in DevOps Pipelines
      </h1>

      <div className="space-y-6">
        <p>
          For most teams, the safest pattern is simple: keep a base JSON config and its schema in source control, keep
          environment-specific values outside the build artifact, inject secrets at deploy or runtime, and validate the
          final JSON before rollout. The common failure mode is the opposite approach: separate hand-edited{" "}
          <code>dev</code>, <code>staging</code>, and <code>prod</code> files that slowly drift apart.
        </p>
        <p>
          If a search visitor lands here looking for a JSON configuration management guide for DevOps pipelines, the key
          decision is not whether JSON is readable. It is where configuration should live, when it should be rendered,
          and how to keep secrets, validation, and environment promotion under control.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitBranch className="w-6 h-6" /> Why JSON Config Breaks in Pipelines
        </h2>
        <p>JSON itself is not the problem. Pipeline behavior is. These are the mistakes that usually create outages:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Configuration drift:</strong> Prod and staging files evolve independently, so the deployed shape no
            longer matches what developers tested.
          </li>
          <li>
            <strong>Secret sprawl:</strong> Passwords and tokens leak into committed JSON, build artifacts, logs, or
            copied deployment manifests.
          </li>
          <li>
            <strong>Late validation:</strong> Teams pretty-print JSON but never verify required keys, types, ranges, or
            whether a rendered file is actually deployable.
          </li>
          <li>
            <strong>Environment-specific builds:</strong> The pipeline creates a different artifact per environment,
            which makes promotion, rollback, and audit trails harder.
          </li>
          <li>
            <strong>False assumptions about hot reload:</strong> File mounts, environment variables, sidecars, and
            platform-specific config sources all update differently.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> A Reliable JSON Configuration Model
        </h2>
        <p>
          A good default model separates JSON configuration into three categories and treats each one differently:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Base structure in Git:</strong> Keep defaults, key names, nesting, and a JSON Schema file next to
            the application code.
          </li>
          <li>
            <strong>Non-secret environment values outside the artifact:</strong> Hostnames, feature flags, or log
            levels belong in CI/CD variables, a config service, or a small environment overlay.
          </li>
          <li>
            <strong>Secrets in a secret store:</strong> Keep credentials out of committed JSON and inject them only
            during deployment or at runtime.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Recommended Repository Shape</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`config/
  base.json
  schema.json
  environments/
    staging.nonsecret.json
    production.nonsecret.json

deploy/
  render-config.sh
  smoke-test.sh`}
            </pre>
          </div>
        </div>
        <p>
          If you do keep per-environment JSON overlays in the repo, keep them small and non-sensitive. They should be
          deltas, not full copies of the base file.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Workflow className="w-5 h-5" /> Validate and Render JSON in the Pipeline
        </h3>
        <p>
          The pipeline should fail before deployment if the base file is invalid, if required keys are missing, or if
          render-time values produce the wrong shape. Pretty output alone is not enough; you want syntax validation and
          schema validation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">
            Example: Render a Final JSON File with <code>jq</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <h5 className="font-semibold mb-2">config/base.json</h5>
            <pre className="mb-4">
              {`{
  "api": {
    "baseUrl": "https://placeholder.invalid",
    "timeoutMs": 5000
  },
  "logging": {
    "level": "info"
  },
  "features": {
    "auditTrail": false
  }
}`}
            </pre>
            <h5 className="font-semibold mb-2">Pipeline step</h5>
            <pre className="mb-4">
              {`jq empty config/base.json

jq \\
  --arg apiBaseUrl "$API_BASE_URL" \\
  --arg logLevel "$LOG_LEVEL" \\
  --argjson auditTrail "$AUDIT_TRAIL" \\
  '.api.baseUrl = $apiBaseUrl
   | .logging.level = $logLevel
   | .features.auditTrail = $auditTrail' \\
  config/base.json > config/runtime.json

jq empty config/runtime.json
npx ajv-cli validate -s config/schema.json -d config/runtime.json`}
            </pre>
            <h5 className="font-semibold mb-2">What this catches</h5>
            <pre>
              {`- Invalid JSON syntax
- Missing required keys
- String/number/boolean type mismatches
- Empty variables that silently render bad config
- Drift between intended config shape and actual deploy-time config`}
            </pre>
          </div>
        </div>
        <p>
          If the final rendered file contains secrets, treat it as ephemeral. Do not upload it as a reusable artifact
          or commit it back into the repo after the pipeline succeeds.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Lock className="w-5 h-5" /> GitHub Actions: Use Variables, Secrets, and Short-Lived Credentials
        </h3>
        <p>
          In current GitHub Actions workflows, non-sensitive values fit well in repository, environment, or
          organization variables, while sensitive values belong in Actions secrets. For cloud access, prefer OIDC-based
          federation over long-lived access keys when your provider supports it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Deploy-Time Rendering in GitHub Actions</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - name: Render runtime JSON
        env:
          API_BASE_URL: \${{ vars.API_BASE_URL }}
          LOG_LEVEL: \${{ vars.LOG_LEVEL }}
          DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
        run: |
          jq \\
            --arg apiBaseUrl "$API_BASE_URL" \\
            --arg logLevel "$LOG_LEVEL" \\
            --arg dbPassword "$DB_PASSWORD" \\
            '.api.baseUrl = $apiBaseUrl
             | .logging.level = $logLevel
             | .database.password = $dbPassword' \\
            config/base.json > config/runtime.json

          jq empty config/runtime.json`}
            </pre>
          </div>
        </div>
        <p>Keep a few platform-specific caveats in mind:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use environment-scoped values for deployments:</strong> Production should not share the same secret
            set as staging.
          </li>
          <li>
            <strong>Avoid long-lived cloud credentials:</strong> If you can use OIDC, let the workflow obtain
            short-lived credentials instead of storing permanent keys as JSON or secrets.
          </li>
          <li>
            <strong>Mask non-secret sensitive output:</strong> If a value did not come from the GitHub secrets store,
            you may still need <code>::add-mask::</code> to prevent log exposure.
          </li>
          <li>
            <strong>Do not branch logic on secrets directly:</strong> If workflow conditions depend on a secret-derived
            value, map it to an environment variable first.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Cloud className="w-5 h-5" /> Kubernetes: ConfigMap for JSON Structure, Secret for Sensitive Values
        </h3>
        <p>
          Kubernetes is where many teams end up deploying rendered JSON. Here the details matter. ConfigMaps are for
          non-confidential data, Secrets are for confidential data, and the two should not be treated as interchangeable
          just because both can surface values to a Pod.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Split File-Based JSON and Credentials</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
immutable: true
data:
  settings.json: |
    {
      "api": {
        "baseUrl": "https://api.example.com",
        "timeoutMs": 5000
      },
      "logging": {
        "level": "info"
      }
    }
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  databasePassword: REPLACE_AT_DEPLOY_TIME`}
            </pre>
          </div>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>ConfigMaps are not secret storage:</strong> They are intended for non-confidential data, and they
            are capped at 1 MiB.
          </li>
          <li>
            <strong>Kubernetes Secrets are not magically encrypted:</strong> By default they are only base64-encoded in
            manifests and are stored unencrypted in etcd unless you enable encryption at rest.
          </li>
          <li>
            <strong>Mounted files and environment variables behave differently:</strong> Mounted ConfigMaps eventually
            update, but values consumed as environment variables do not auto-refresh and usually require a Pod restart.
          </li>
          <li>
            <strong>Immutable ConfigMaps reduce accidental mid-release changes:</strong> They are a strong fit when you
            want config to move with a specific application release.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> Choosing the Right Delivery Pattern
        </h3>
        <p>No single pattern fits every application. Use the one that matches how your application reads config.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Environment variables:</strong> Best for flat or moderately sized settings and twelve-factor style
            services that already read from the environment.
          </li>
          <li>
            <strong>Rendered JSON file at deploy time:</strong> Best when the application expects a nested file such as{" "}
            <code>settings.json</code> or when third-party software only supports file-based config.
          </li>
          <li>
            <strong>ConfigMap or Secret mounts:</strong> Best on Kubernetes when the container reads config files from a
            known path.
          </li>
          <li>
            <strong>External config service:</strong> Best when configuration changes independently of app releases and
            needs centralized rollout controls.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6" /> Common Mistakes to Remove from Your Pipeline
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Committing example credentials that look real:</strong> Even placeholders tend to get copied into
            production habits.
          </li>
          <li>
            <strong>Building a different artifact per environment:</strong> Build once, then inject configuration per
            environment at deploy time.
          </li>
          <li>
            <strong>Using comments inside JSON:</strong> Standard JSON does not support comments, so commented examples
            can mislead teams into shipping invalid files.
          </li>
          <li>
            <strong>Skipping schema checks:</strong> A syntactically valid file can still be operationally wrong.
          </li>
          <li>
            <strong>Assuming config changes automatically reload:</strong> Your app may need a restart, a reload hook,
            or file watching support.
          </li>
          <li>
            <strong>Keeping secrets inside merged base files:</strong> Put secret references in JSON if necessary, but
            fetch the actual secret values from a dedicated store.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6" /> Recommended Release Workflow
        </h2>
        <p>A practical CI/CD flow for JSON configuration management looks like this:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Commit base config and schema:</strong> Version the structure, defaults, and documentation with the
            app.
          </li>
          <li>
            <strong>Validate in CI:</strong> Check JSON syntax, schema compliance, and any custom policy rules before
            the artifact is built.
          </li>
          <li>
            <strong>Build one environment-agnostic artifact:</strong> Do not bake production values into the image or
            package.
          </li>
          <li>
            <strong>Resolve environment values during deployment:</strong> Pull non-secrets from variables or config
            services and secrets from a secret manager or platform secret store.
          </li>
          <li>
            <strong>Render or inject config just in time:</strong> Generate the final JSON file only where it is needed.
          </li>
          <li>
            <strong>Validate again after rendering:</strong> Catch empty substitutions, type mismatches, and malformed
            JSON before rollout.
          </li>
          <li>
            <strong>Run smoke tests against the deployed environment:</strong> Confirm that the app can actually use the
            rendered configuration.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Good JSON configuration management in DevOps pipelines is mostly about boundaries: what belongs in Git, what
          belongs in the deployment system, and what should never appear outside a secret store. If you keep one base
          shape, validate early, inject environment data late, and promote the same build artifact across environments,
          JSON stops being a source of pipeline drift and becomes a predictable deployment contract.
        </p>
        <p>
          Use your formatter or validation tooling as a gate, not just as a cleanup step. A formatted file that was
          rendered from the wrong values is still the wrong deployment.
        </p>
      </div>
    </>
  );
}
