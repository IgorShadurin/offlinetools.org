import type { Metadata } from "next";
import {
  AlertTriangle,
  Box,
  CheckCircle,
  Cloud,
  FileJson,
  Info,
  Settings,
  Terminal,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON-based Configuration for Kubernetes Deployments: Practical Guide",
  description:
    "Learn when JSON is the right format for Kubernetes Deployments, how to structure a production-ready apps/v1 manifest, validate it with kubectl, and avoid selector and config mistakes.",
};

export default function JsonKubernetesDeploymentArticle() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <article>
        <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
          <FileJson className="h-8 w-8" /> JSON-based Configuration for Kubernetes Deployments
        </h1>

        <section className="mb-8 space-y-6">
          <p>
            Yes, you can deploy Kubernetes workloads from JSON files directly. <code>kubectl apply</code> accepts JSON
            and YAML, and the Kubernetes API ultimately works with JSON over HTTP. The practical rule is simple:
            JSON is excellent when manifests are generated, transformed, or validated by tooling; YAML is usually
            easier when humans are hand-editing files every day.
          </p>
          <p>
            For most searchers, the real question is not whether JSON works, but how to use it without creating brittle
            Deployments. That means choosing the right labels, keeping runtime configuration out of the Deployment
            itself, validating against the API server before rollout, and avoiding stale guidance such as treating
            <code>kubectl convert</code> like a built-in command on every machine.
          </p>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5" /> Quick Takeaways
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Use <code>apps/v1</code> for Deployments and set <code>.spec.selector</code> explicitly.
              </li>
              <li>
                Make sure <code>.spec.selector.matchLabels</code> matches <code>.spec.template.metadata.labels</code>,
                because Kubernetes rejects mismatches and the selector is immutable after creation in <code>apps/v1</code>.
              </li>
              <li>
                Put environment-specific values in ConfigMaps and Secrets, then reference them from the Deployment.
              </li>
              <li>
                Validate with <code>kubectl apply --dry-run=server --validate=strict</code> before a real apply.
              </li>
              <li>
                Keep JSON for automation and APIs; keep YAML for manual authoring unless your team has a strong reason
                to standardize on JSON.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <Box className="h-6 w-6" /> A Practical Deployment JSON Example
          </h2>
          <p>
            The example below is closer to what a real application Deployment looks like today. It uses stable labels,
            explicit selector matching, resource requests and limits, health probes, and references to external
            configuration instead of hard-coding everything into the manifest.
          </p>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              {`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "payments-api",
    "namespace": "production",
    "labels": {
      "app.kubernetes.io/name": "payments-api",
      "app.kubernetes.io/instance": "payments-api-prod",
      "app.kubernetes.io/component": "api",
      "app.kubernetes.io/managed-by": "kubectl"
    }
  },
  "spec": {
    "replicas": 3,
    "revisionHistoryLimit": 10,
    "selector": {
      "matchLabels": {
        "app.kubernetes.io/name": "payments-api"
      }
    },
    "strategy": {
      "type": "RollingUpdate",
      "rollingUpdate": {
        "maxUnavailable": "25%",
        "maxSurge": "25%"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app.kubernetes.io/name": "payments-api",
          "app.kubernetes.io/instance": "payments-api-prod",
          "app.kubernetes.io/component": "api"
        }
      },
      "spec": {
        "securityContext": {
          "runAsNonRoot": true,
          "seccompProfile": {
            "type": "RuntimeDefault"
          }
        },
        "containers": [
          {
            "name": "api",
            "image": "ghcr.io/example/payments-api:v2.3.1",
            "imagePullPolicy": "IfNotPresent",
            "ports": [
              {
                "name": "http",
                "containerPort": 8080
              }
            ],
            "envFrom": [
              {
                "configMapRef": {
                  "name": "payments-api-config"
                }
              },
              {
                "secretRef": {
                  "name": "payments-api-secrets"
                }
              }
            ],
            "resources": {
              "requests": {
                "cpu": "100m",
                "memory": "128Mi"
              },
              "limits": {
                "cpu": "500m",
                "memory": "512Mi"
              }
            },
            "readinessProbe": {
              "httpGet": {
                "path": "/ready",
                "port": 8080
              },
              "initialDelaySeconds": 5,
              "periodSeconds": 10
            },
            "livenessProbe": {
              "httpGet": {
                "path": "/health",
                "port": 8080
              },
              "initialDelaySeconds": 15,
              "periodSeconds": 20
            },
            "securityContext": {
              "allowPrivilegeEscalation": false,
              "readOnlyRootFilesystem": true
            }
          }
        ]
      }
    }
  }
}`}
            </pre>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">Why these fields matter</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <code>apiVersion: apps/v1</code> is the current stable Deployment API you should author directly.
              </li>
              <li>
                <code>.spec.selector.matchLabels</code> and the Pod template labels must line up exactly. If they do
                not, the API rejects the Deployment.
              </li>
              <li>
                The selector should be treated as permanent. In <code>apps/v1</code>, changing it later is not a safe
                refactor path.
              </li>
              <li>
                Shared labels under <code>app.kubernetes.io/*</code> improve discoverability in dashboards, CLIs, and
                automation without changing how the Deployment works.
              </li>
              <li>
                Resource requests and limits make scheduling and capacity behavior predictable instead of leaving it to
                cluster defaults.
              </li>
              <li>
                Readiness and liveness probes help Kubernetes distinguish between a Pod that is starting up and a Pod
                that is unhealthy.
              </li>
              <li>
                The image is pinned to a version tag instead of <code>:latest</code>, which makes rollouts and
                rollbacks auditable.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <Settings className="h-6 w-6" /> Put App Configuration in ConfigMaps and Secrets
          </h2>
          <p>
            A Deployment should describe how Pods run, not carry every environment-specific value inline. In practice,
            JSON-based configuration for Kubernetes deployments works best when the Deployment references separate
            ConfigMaps for non-secret settings and Secrets for credentials or tokens.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">ConfigMap Reference</h3>
              <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                {`{
  "configMapRef": {
    "name": "payments-api-config"
  }
}`}
              </pre>
            </div>

            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">Secret Reference</h3>
              <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
                {`{
  "secretRef": {
    "name": "payments-api-secrets"
  }
}`}
              </pre>
            </div>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              Use ConfigMaps for ports, feature flags, log levels, and other non-sensitive runtime settings.
            </li>
            <li>
              Use Secrets for database passwords, API keys, and tokens. Do not hard-code them inside the Deployment
              JSON.
            </li>
            <li>
              If your deployment pipeline generates JSON, generate these references too, rather than flattening all
              configuration into a single giant Deployment object.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <Terminal className="h-6 w-6" /> Validate and Apply JSON Safely
          </h2>
          <p>
            The most useful <code>kubectl</code> workflow is to validate first, then apply, then inspect the live
            object in JSON if you need to debug exactly what the API accepted.
          </p>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
              <code className="language-bash">{`kubectl apply --dry-run=server --validate=strict -f deployment.json
kubectl apply --server-side -f deployment.json
kubectl get deployment payments-api -n production -o json`}</code>
            </pre>
          </div>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code>kubectl apply -f deployment.json</code> works natively because <code>kubectl apply</code> accepts
              JSON and YAML.
            </li>
            <li>
              <code>--dry-run=server</code> sends the request to the API server without persisting it, which catches
              schema and admission problems that client-only checks can miss.
            </li>
            <li>
              <code>--validate=strict</code> helps catch unknown or duplicate fields before they quietly turn into
              confusing rollout bugs.
            </li>
            <li>
              <code>--server-side</code> is worth considering when multiple tools or controllers may touch the same
              object, because field ownership is tracked on the server.
            </li>
            <li>
              <code>-o json</code> is the easiest way to compare your intended manifest with the live object that
              Kubernetes is actually running.
            </li>
          </ul>

          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-medium">
              <AlertTriangle className="h-5 w-5" /> About <code>kubectl convert</code>
            </h3>
            <p>
              Older guides often mention <code>kubectl convert</code> as if it ships with every <code>kubectl</code>
              install. Current Kubernetes documentation explicitly notes that the tool is not installed by default.
              For most teams, the better path is to author new Deployment manifests directly in <code>apps/v1</code>
              instead of building a workflow around conversion.
            </p>
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <XCircle className="h-6 w-6 text-red-500" /> Common JSON Deployment Mistakes
          </h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Selector mismatch:</strong> if <code>.spec.selector.matchLabels</code> does not match the Pod
              template labels, the API rejects the object.
            </li>
            <li>
              <strong>Trying to rename the selector later:</strong> in <code>apps/v1</code>, the Deployment selector is
              immutable after creation, so treat it as part of the object&apos;s identity.
            </li>
            <li>
              <strong>Using live output as source without cleanup:</strong> JSON from <code>kubectl get -o json</code>
              includes fields such as <code>status</code>, <code>resourceVersion</code>, and <code>managedFields</code>
              that do not belong in clean desired-state manifests.
            </li>
            <li>
              <strong>Embedding secrets directly in the Deployment:</strong> it makes rotation harder and increases the
              blast radius of every manifest consumer.
            </li>
            <li>
              <strong>Relying on JSON by hand without formatting:</strong> missing commas, unquoted keys, or trailing
              characters break the entire document. Format and validate JSON before the apply step.
            </li>
            <li>
              <strong>Using floating image tags:</strong> <code>:latest</code> makes rollbacks and incident analysis
              harder than pinned versions or digests.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <CheckCircle className="h-6 w-6 text-green-500" /> When JSON Is the Right Choice
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">Good fit for JSON</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Code-generated manifests in CI/CD pipelines</li>
                <li>Direct Kubernetes API integrations and client libraries</li>
                <li>Systems that already store configuration as JSON</li>
                <li>Debugging with exact live object output from the cluster</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">Usually better in YAML</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Hand-maintained app manifests in Git</li>
                <li>Reviews where humans need to scan nested objects quickly</li>
                <li>Files that benefit from inline comments and lighter syntax</li>
                <li>Teams without a strong tooling reason to standardize on JSON</li>
              </ul>
            </div>
          </div>

          <p>
            If you do keep Deployment manifests in JSON, a formatter becomes part of the workflow, not an optional
            cleanup step. Consistent indentation and ordering make code review easier and reduce trivial syntax mistakes
            before <code>kubectl</code> ever sees the file.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <Cloud className="h-6 w-6" /> Conclusion
          </h2>
          <p>
            JSON-based configuration for Kubernetes Deployments is fully supported and genuinely useful when manifests
            come from software instead of a human text editor. The safe pattern is to author Deployments in
            <code>apps/v1</code>, keep selectors stable, reference ConfigMaps and Secrets for runtime data, and validate
            against the API server before rollout.
          </p>
          <p>
            If you only remember one thing, remember this: JSON is the machine-friendly format Kubernetes already
            speaks, but the quality of the Deployment still depends on structure, validation, and operational habits,
            not on the braces alone.
          </p>
        </section>
      </article>
    </main>
  );
}
