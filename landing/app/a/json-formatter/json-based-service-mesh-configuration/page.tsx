import type { Metadata } from "next";
import {
  Settings,
  FileJson,
  GitBranch,
  ShieldCheck,
  Activity,
  Workflow,
  Wrench,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON-based Service Mesh Configuration Guide | Istio, Envoy, Kubernetes",
  description:
    "Learn where JSON fits in modern service mesh configuration, with current Istio and Envoy examples, validation steps, and common mistakes to avoid.",
};

export default function JsonServiceMeshConfigArticle() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">JSON-based Service Mesh Configuration</h1>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Settings className="inline-block" /> What Searchers Usually Need to Know First
        </h2>
        <p>
          If you are looking for a JSON-based service mesh configuration guide, the most important practical detail is
          this: <strong className="font-semibold">JSON is valid, but it is usually not the format humans hand-author</strong>.
          In modern Kubernetes-based meshes, people often write YAML, while automation, APIs, patches, and generated
          manifests frequently use JSON.
        </p>
        <p>
          That makes JSON most useful when you want machine-generated configuration, strict formatting, easy diffing in
          CI pipelines, or a clean way to move service mesh rules between tools. It is also directly relevant for
          Envoy, which can load bootstrap configuration from JSON, YAML, or proto3.
        </p>
        <p>
          So the real question is not “can a service mesh use JSON?” It can. The better question is{" "}
          <strong className="font-semibold">where JSON fits best in today&apos;s mesh workflow</strong>, and how to
          validate it before it reaches production.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <FileJson className="inline-block" /> What JSON Means in a Real Mesh in 2026
        </h2>
        <p>
          In current Kubernetes workflows, the platform accepts full object definitions in either YAML or JSON. At the
          same time, Kubernetes configuration guidance recommends YAML for files people edit directly because it is less
          noisy. That leads to a common pattern:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Humans review and discuss YAML manifests.</li>
          <li>Automation emits JSON manifests, JSON patches, or JSON payloads for APIs and policy engines.</li>
          <li>Mesh proxies such as Envoy can consume JSON configuration directly.</li>
        </ul>
        <p>
          For Istio specifically, the current reference docs use stable <code>v1</code> APIs such as{" "}
          <code>networking.istio.io/v1</code> for <code>VirtualService</code> and{" "}
          <code>security.istio.io/v1</code> for <code>PeerAuthentication</code>. Those resources are still Kubernetes
          objects, so they can be represented as JSON as well as YAML.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Bottom Line</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Use JSON when the configuration is generated, transformed, patched, or validated by tools. Use YAML when
            operators need to read and maintain the file by hand.
          </p>
        </div>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <GitBranch className="inline-block" /> Real JSON Example: Traffic Routing, Retries, and Timeouts
        </h2>
        <p>
          A practical mesh example is progressive delivery. The JSON below represents an Istio{" "}
          <code>VirtualService</code> that routes most traffic to <code>v1</code>, sends a small slice to{" "}
          <code>v2</code>, and applies retry and timeout policy in the same rule.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Istio VirtualService as JSON</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`{
  "apiVersion": "networking.istio.io/v1",
  "kind": "VirtualService",
  "metadata": {
    "name": "checkout-route",
    "namespace": "store"
  },
  "spec": {
    "hosts": ["checkout.store.svc.cluster.local"],
    "http": [
      {
        "route": [
          {
            "destination": {
              "host": "checkout.store.svc.cluster.local",
              "subset": "v1"
            },
            "weight": 90
          },
          {
            "destination": {
              "host": "checkout.store.svc.cluster.local",
              "subset": "v2"
            },
            "weight": 10
          }
        ],
        "retries": {
          "attempts": 3,
          "perTryTimeout": "2s",
          "retryOn": "gateway-error,connect-failure,refused-stream,5xx"
        },
        "timeout": "5s"
      }
    ]
  }
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This only works as intended if the matching <code>DestinationRule</code> defines the <code>v1</code> and{" "}
            <code>v2</code> subsets.
          </p>
        </div>
        <p>
          This is a better mental model than a hypothetical “mesh route” schema because it mirrors how real Kubernetes
          meshes are configured today: you declare routing policy as an API object, then the control plane translates it
          into proxy config for the data plane.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <ShieldCheck className="inline-block" /> Real JSON Example: Namespace mTLS Policy
        </h2>
        <p>
          Security policy is another place where JSON works cleanly, especially when policies are generated from a
          higher-level platform or security workflow.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Istio PeerAuthentication as JSON</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`{
  "apiVersion": "security.istio.io/v1",
  "kind": "PeerAuthentication",
  "metadata": {
    "name": "default",
    "namespace": "payments"
  },
  "spec": {
    "mtls": {
      "mode": "STRICT"
    }
  }
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This requires mTLS for workloads in the <code>payments</code> namespace. In current Istio docs, ambient
            mode does not support <code>DISABLE</code>, and <code>portLevelMtls</code> uses the workload port, not the
            Kubernetes Service port.
          </p>
        </div>
        <p>
          That last detail matters in real environments. A policy can look correct in code review and still be wrong if
          the port number came from the Service object instead of the container workload.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Activity className="inline-block" /> Where Envoy JSON Fits
        </h2>
        <p>
          Many service meshes push their rules into Envoy or Envoy-compatible proxies. That makes Envoy the most direct
          example of JSON-native mesh configuration. Current Envoy CLI docs state that the bootstrap config path can be
          JSON, YAML, or proto3, and that <code>--mode validate</code> can validate config without serving traffic.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Typical Envoy Validation Step</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>{`envoy --mode validate -c bootstrap.json`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This is useful when you generate proxy bootstrap JSON in CI and want a hard fail before rollout.
          </p>
        </div>
        <p>
          In other words, JSON is not just an interchange format here. It can be the exact proxy configuration that the
          mesh eventually relies on.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Workflow className="inline-block" /> A Practical JSON Mesh Workflow
        </h2>
        <p>
          The safest way to use JSON for service mesh configuration is to treat it as part of a reviewable pipeline,
          not as a blob that gets copied into production.
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong className="font-semibold">Generate or edit the JSON manifest.</strong> Keep it small and focused per
            resource when possible.
          </li>
          <li>
            <strong className="font-semibold">Format it before review.</strong> Pretty-printed JSON makes hosts,
            selectors, retries, and weights much easier to audit.
          </li>
          <li>
            <strong className="font-semibold">Run platform validation.</strong> For Kubernetes resources, a server-side
            dry run catches schema and admission issues early.
          </li>
          <li>
            <strong className="font-semibold">Run mesh-aware validation.</strong> For Istio, use{" "}
            <code>istioctl analyze</code> on the manifest set you intend to deploy so missing hosts, selectors, and
            other semantic mistakes show up before rollout.
          </li>
          <li>
            <strong className="font-semibold">Deploy gradually.</strong> Start with a canary route or namespace-scoped
            security policy instead of a mesh-wide change.
          </li>
        </ol>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Validation Commands</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`kubectl apply --dry-run=server -f mesh-config.json
istioctl analyze manifests/
envoy --mode validate -c bootstrap.json`}
            </code>
          </pre>
        </div>
        <p>
          The exact files and directories will differ in your setup, but the pattern is stable: syntax first, platform
          validation second, mesh semantics third.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Wrench className="inline-block" /> When JSON Is the Right Choice
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="font-semibold">Generated manifests:</strong> platform APIs, internal control planes, or
            GitOps tooling emitting mesh resources.
          </li>
          <li>
            <strong className="font-semibold">JSON patch workflows:</strong> targeted changes in CI/CD or Kustomize
            overlays.
          </li>
          <li>
            <strong className="font-semibold">Policy APIs:</strong> when another system stores routing or security rules
            as structured JSON and renders mesh resources from them.
          </li>
          <li>
            <strong className="font-semibold">Proxy bootstrap:</strong> direct Envoy configuration or debug output from
            the data plane.
          </li>
        </ul>
        <p>
          If a team is manually maintaining large mesh manifests in Git, YAML is often the easier default. If a system
          is producing those manifests automatically, JSON is often the cleaner transport format.
        </p>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <AlertTriangle className="inline-block" /> Common Mistakes
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Treating JSON as a universal mesh schema. In practice, the schema is mesh-specific, often Kubernetes API
            objects backed by a control plane.
          </li>
          <li>
            Defining route subsets in a <code>VirtualService</code> without the matching <code>DestinationRule</code>.
          </li>
          <li>
            Using the Service port instead of the workload port in <code>portLevelMtls</code>.
          </li>
          <li>
            Storing giant minified JSON documents that nobody can review safely.
          </li>
          <li>
            Validating only JSON syntax and skipping semantic mesh validation.
          </li>
        </ul>
      </section>

      <section className="mb-10 space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <BadgeCheck className="inline-block" /> Current Docs Worth Checking
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/"
              rel="noreferrer"
              target="_blank"
            >
              Kubernetes object management
            </a>{" "}
            for the current rule that full object definitions can be supplied in YAML or JSON.
          </li>
          <li>
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://kubernetes.io/blog/2025/11/25/configuration-good-practices/"
              rel="noreferrer"
              target="_blank"
            >
              Kubernetes configuration good practices
            </a>{" "}
            for current guidance that YAML is usually better for human-authored config.
          </li>
          <li>
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://www.envoyproxy.io/docs/envoy/latest/operations/cli"
              rel="noreferrer"
              target="_blank"
            >
              Envoy CLI documentation
            </a>{" "}
            for supported config formats and validation mode.
          </li>
          <li>
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://istio.io/latest/docs/reference/config/networking/virtual-service/"
              rel="noreferrer"
              target="_blank"
            >
              Istio VirtualService reference
            </a>{" "}
            and{" "}
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://istio.io/latest/docs/reference/config/security/peer_authentication/"
              rel="noreferrer"
              target="_blank"
            >
              PeerAuthentication reference
            </a>{" "}
            for current `v1` traffic and security APIs.
          </li>
          <li>
            <a
              className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
              href="https://istio.io/latest/docs/ops/diagnostic-tools/istioctl-analyze/"
              rel="noreferrer"
              target="_blank"
            >
              Istio analyze documentation
            </a>{" "}
            for pre-deploy semantic checks.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <BadgeCheck className="inline-block" /> Conclusion
        </h2>
        <p>
          JSON-based service mesh configuration is real and useful, but the high-value use case is usually{" "}
          <strong className="font-semibold">structured automation</strong>, not handwritten day-to-day editing. If you
          treat JSON as the transport or generated form of mesh policy, validate it like any other production config,
          and ground it in real mesh APIs such as Istio and Envoy, it becomes a strong fit for reliable routing and
          security workflows.
        </p>
      </section>
    </div>
  );
}
