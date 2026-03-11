import type { Metadata } from "next";
import { Container, Lock, CheckCheck, FileJson, Cog, Package, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Immutable JSON Configuration in Container Environments | Article",
  description:
    "Practical guide to immutable JSON configuration in containers, with current Kubernetes advice for ConfigMaps, Secrets, rollouts, and common pitfalls.",
};

export default function ImmutableJsonConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Container className="w-8 h-8" /> Immutable JSON Configuration in Container Environments
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          If you want every container instance to run with exactly the same settings for its entire lifetime, treat
          configuration as <strong>immutable input</strong>. In practice, that means your app reads a validated JSON
          file at startup, the file is mounted read-only, and any config change triggers a new deployment instead of an
          in-place edit on a running container.
        </p>
        <p>
          This approach is useful when configuration is too structured for a handful of environment variables: feature
          flags, service endpoints, rate limits, JSON schema settings, or nested per-tenant behavior. It is especially
          useful in Kubernetes and other orchestrated environments where reproducibility, clean rollbacks, and low
          operational surprise matter more than ad hoc runtime tweaks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cog className="w-6 h-6" /> What Immutable Configuration Actually Means
        </h2>
        <p>
          Immutable configuration does <strong>not</strong> mean the source of truth can never change. It means a
          running container should not see config drift halfway through its lifetime. When you need new settings, you
          create a new config version and replace the container or pod.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Mutable pattern:</strong> edit a live file or config object and hope the running process reloads it
            safely.
          </li>
          <li>
            <strong>Immutable pattern:</strong> publish a new config version, roll out new containers, and retire the
            old ones.
          </li>
        </ul>
        <p>
          That matches the broader container model: build artifacts are disposable, deployments are repeatable, and
          rollbacks are just a switch back to a known-good image and config combination.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> Why JSON Works Well for This
        </h2>
        <p>
          JSON is a good fit when config needs real structure. It handles nesting, arrays, booleans, and numbers
          without forcing everything into flat strings. That makes it easier to review, validate, diff, and version
          alongside deployment manifests.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Example production-oriented JSON config</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`{
  "schemaVersion": 3,
  "http": {
    "port": 8080,
    "requestTimeoutMs": 5000
  },
  "upstreams": {
    "catalogBaseUrl": "https://catalog.internal.example"
  },
  "featureFlags": {
    "auditLogging": true,
    "betaCheckout": false
  },
  "secrets": {
    "dbPasswordFile": "/var/run/secrets/myapp/db-password"
  }
}`}
          </pre>
        </div>
        <p>
          The important distinction is that the JSON file should usually contain <strong>non-secret structure</strong>
          plus references to secret locations, not raw credentials.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6" /> The Recommended Container Pattern Today
        </h2>
        <p>
          For most production workloads, the safest pattern is: keep one reusable image, store structured non-secret
          JSON outside the image, mount it read-only, keep secrets in a separate secret store, and roll out new pods
          when config changes.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Create a versioned JSON config file and validate it before deploy.</li>
          <li>Store that JSON in a ConfigMap or equivalent non-secret config object.</li>
          <li>Mark the config object immutable when your platform supports it.</li>
          <li>Mount it read-only into the container filesystem.</li>
          <li>Store passwords, tokens, and certificates in Secrets, not in the JSON document.</li>
          <li>Deploy a new pod set for every config change instead of mutating live containers.</li>
        </ol>
        <p>
          This is where current Kubernetes behavior matters: mounted ConfigMaps and Secrets can be refreshed in running
          pods when the underlying object changes, so simply mounting a file does <strong>not</strong> guarantee
          runtime immutability by itself. If you want truly immutable runtime behavior, avoid editing live config
          objects in place. Use versioned names or hash-based names, set <code>immutable: true</code> where supported,
          and trigger a rollout.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Example Kubernetes ConfigMap and Secret</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config-2026-03-11
immutable: true
data:
  application.json: |
    {
      "schemaVersion": 3,
      "http": {
        "port": 8080,
        "requestTimeoutMs": 5000
      },
      "upstreams": {
        "catalogBaseUrl": "https://catalog.internal.example"
      },
      "featureFlags": {
        "auditLogging": true,
        "betaCheckout": false
      },
      "secrets": {
        "dbPasswordFile": "/var/run/secrets/myapp/db-password"
      }
    }
---
apiVersion: v1
kind: Secret
metadata:
  name: myapp-db-credentials-2026-03-11
immutable: true
type: Opaque
stringData:
  db-password: super-secret-value`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Example Deployment</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: ghcr.io/example/myapp:1.14.2
          volumeMounts:
            - name: app-config
              mountPath: /etc/myapp
              readOnly: true
            - name: app-secrets
              mountPath: /var/run/secrets/myapp
              readOnly: true
          env:
            - name: APP_CONFIG_PATH
              value: /etc/myapp/application.json
      volumes:
        - name: app-config
          configMap:
            name: myapp-config-2026-03-11
        - name: app-secrets
          secret:
            secretName: myapp-db-credentials-2026-03-11`}
          </pre>
        </div>
        <p>
          This pattern keeps the image reusable across environments while still giving each deployment an exact,
          reviewable config version. It also makes rollback straightforward because you roll back both the image tag and
          the referenced config objects together.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database className="w-6 h-6" /> Choosing Between the Main Options
        </h2>
        <p>There is no single delivery method for every case. The practical choice usually looks like this:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON file mounted read-only:</strong> best default when config is nested, environment-specific, and
            reviewed by operators.
          </li>
          <li>
            <strong>Environment variables:</strong> best for small scalar values, feature switches, and platform-provided
            metadata. Less pleasant for large or deeply nested JSON because escaping and size become awkward quickly.
          </li>
          <li>
            <strong>Baking config into the image:</strong> acceptable for fixed defaults or fully self-contained demo
            images, but weak for normal multi-environment deployment because every config tweak requires a rebuild.
          </li>
        </ul>
        <p>
          A common compromise is to ship safe defaults in the image, mount one read-only JSON file for environment
          overrides, and use a few environment variables only for values that truly belong at deploy time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lock className="w-6 h-6" /> Secret Handling Rules
        </h2>
        <p>
          Do not put database passwords, API keys, signing keys, or certificates directly into the main JSON config
          file. Keep secrets separate and inject only references or file paths into the JSON document. That reduces the
          blast radius of accidental logging, debugging output, git history leaks, and ConfigMap exposure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use your platform&apos;s secret mechanism for secret values. In Kubernetes, Secrets can also be marked
            immutable.
          </li>
          <li>
            Prefer mounting secrets as read-only files when your app can read from file paths cleanly.
          </li>
          <li>
            Keep secret rotation and config rollout as explicit deployment events, not background surprises.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6" /> Common Mistakes and Troubleshooting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>&quot;We edited the ConfigMap and some pods changed behavior without a deploy.&quot;</strong> Mounted
            config can update in running pods. Treat config objects as versioned release artifacts instead of editing
            them in place.
          </li>
          <li>
            <strong>&quot;Our file never refreshed.&quot;</strong> If you mount a ConfigMap or Secret using{" "}
            <code>subPath</code>, Kubernetes does not update that mount automatically. Use a directory mount if you
            expect refresh behavior, or better, use an explicit rollout for immutable config.
          </li>
          <li>
            <strong>&quot;The app crashed after deploy.&quot;</strong> Validate the JSON before building the manifest or
            generating the ConfigMap. A formatter or validator catches malformed syntax before it becomes a failed
            rollout.
          </li>
          <li>
            <strong>&quot;Rollback did not restore behavior.&quot;</strong> Make sure image version and config version are
            tracked together. Rolling back only the image while leaving newer config mounted often breaks compatibility.
          </li>
          <li>
            <strong>&quot;We need live toggles without redeploying.&quot;</strong> That is a different requirement. Use a
            runtime config service or feature-flag system instead of pretending an immutable file should behave like a
            dynamic control plane.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Immutable JSON configuration works best when you treat config as a release artifact, not a shared mutable
          scratchpad. Keep structured non-secret settings in JSON, keep secrets separate, mount both read-only, and
          replace pods whenever the config changes.
        </p>
        <p>
          Before shipping, run the JSON through a formatter and validator so the file inside your container environment
          is predictable, readable, and syntactically correct. That small step prevents many avoidable rollout failures.
        </p>
      </div>
    </>
  );
}
