import type { Metadata } from "next";
import {
  Shield,
  Cloud,
  Server,
  Cpu,
  Database,
  Clock,
  ListTree,
  AlertTriangle,
  Network,
  Scaling,
  Blocks,
  GitFork,
  BoxSelect,
  MessageSquareWarning,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Protecting Against DDoS Attacks on JSON Formatting Services",
  description:
    "Practical DDoS protection guidance for JSON formatter and validation services, including edge filtering, body limits, depth caps, rate limiting, and response planning.",
};

export default function DdosProtectionJsonFormatting() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Protecting Against DDoS Attacks on JSON Formatting Services</h1>

      <div className="space-y-6">
        <p>
          Public JSON formatter endpoints are attractive denial-of-service targets because a single anonymous request can
          trigger expensive parsing, validation, and pretty-printing work. A resilient service does more than put a CDN
          in front of an origin. It rejects bad traffic cheaply, keeps JSON processing bounded, and prevents a burst of
          expensive requests from starving normal users.
        </p>
        <p>
          This guide focuses on public JSON beautifier, validator, and minifier services, plus API endpoints that accept
          raw JSON input. The goal is to keep small legitimate requests fast while making it hard for a botnet or a few
          abusive clients to turn parsing into an availability problem.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <AlertTriangle className="mr-3 text-red-500" size={24} />
          Why JSON Formatting Endpoints Are Easy to Abuse
        </h2>
        <p>
          DDoS pressure against a JSON tool usually lands at multiple layers at once: the network edge, the HTTP stack,
          and the parser or formatter itself.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Cloud className="mr-2 text-blue-600" size={20} />
          Edge and Protocol Floods Still Matter
        </h3>
        <p>
          Even if your parser is efficient, protocol-level floods can overwhelm proxies or load balancers before the
          application sees a request. That includes ordinary HTTP request floods and protocol abuse such as{" "}
          <code>HTTP/2</code> Rapid Reset. In October 2023, Google documented mitigation of an attack peaking above 398
          million requests per second, which is why keeping your front door patched and using an always-on edge
          mitigation provider still matters in 2026.
        </p>
        <p>
          Managed DDoS protection is therefore table stakes, not an optional hardening layer for a public formatter.
          Your origin should never be the first place malicious traffic gets filtered.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Server className="mr-2 text-purple-600" size={20} />
          Large, Slow, and Repeated Request Bodies
        </h3>
        <p>
          JSON formatting services usually accept <code>POST</code> bodies, which makes them vulnerable to oversized
          uploads, slow body delivery, and repeated replays of expensive payloads. If the service buffers the entire
          body before checking size, the attacker has already forced memory allocation and connection time.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Cpu className="mr-2 text-yellow-600" size={20} />
          Parser-Expensive Payloads
        </h3>
        <p>
          Application-layer attacks on JSON services do not need huge bandwidth. They work by sending payloads that are
          cheap to transmit but expensive to process.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-center">
            <ListTree className="mr-2 text-green-500" size={18} />
            <strong>Deep nesting:</strong> deeply nested arrays or objects can trigger stack pressure, high traversal
            cost, or formatter slowdowns.
          </li>
          <li className="flex items-center">
            <GitFork className="mr-2 text-red-500" size={18} />
            <strong>Huge object or array fan-out:</strong> a massive number of keys or elements can make traversal,
            sorting, indentation, or validation expensive.
          </li>
          <li className="flex items-center">
            <Blocks className="mr-2 text-orange-500" size={18} />
            <strong>Very long strings and keys:</strong> even valid JSON can create high memory pressure and large
            formatted output.
          </li>
          <li className="flex items-center">
            <BoxSelect className="mr-2 text-blue-500" size={18} />
            <strong>Schema validation abuse:</strong> if you offer JSON Schema validation, complex schemas or remote
            reference resolution can turn one request into much more work than simple formatting.
          </li>
          <li className="flex items-center">
            <MessageSquareWarning className="mr-2 text-purple-500" size={18} />
            <strong>Malformed JSON floods:</strong> invalid bodies should fail fast, but repeated malformed requests can
            still consume CPU and connections if admission control is weak.
          </li>
        </ul>

        <div className="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-950/30">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Current edge caveat</p>
          <p className="mt-2">
            Managed WAFs help with HTTP floods, but they do not inspect unlimited request bodies. Cloudflare documents
            truncated request-body inspection depending on plan, and AWS WAF inspects only the first part of the body
            depending on integration and configuration. Treat WAF inspection as one layer, not your only JSON safety
            control.
          </p>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Shield className="mr-3 text-green-600" size={24} />
          Recommended Defense Stack
        </h2>
        <p>
          The right model is layered admission control: block floods at the edge, reject oversized or slow requests
          before parsing, and keep the actual JSON work isolated and bounded.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Cloud className="mr-2 text-blue-600" size={20} />
          1. Put an Edge Service in Front and Hide the Origin
        </h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Use a CDN or DDoS provider with always-on <code>L3/L4/L7</code> mitigation, not just on-demand scrubbing.
          </li>
          <li>
            Ensure the origin is not directly reachable from the public internet except through the provider or a
            private network path.
          </li>
          <li>
            Keep reverse proxies, ingress controllers, and load balancers current so protocol-level fixes such as
            <code>HTTP/2</code> Rapid Reset mitigation are in place.
          </li>
          <li>
            Separate the human-facing web page from the expensive formatting endpoint so different caching and rate
            controls can apply.
          </li>
        </ul>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Blocks className="mr-2 text-green-600" size={20} />
          2. Reject Oversized or Slow Requests Before Parsing
        </h3>
        <p>
          Your cheapest protection is to decide quickly whether a request deserves parser time at all.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Accept only the methods you need, usually <code>POST</code> for formatting and <code>GET</code> for the UI
            and health checks.
          </li>
          <li>
            Enforce a small maximum request size at the edge and again in the application. For a public browser-based
            formatter, <code>100 KB</code> to <code>256 KB</code> is a reasonable anonymous default.
          </li>
          <li>
            Set low header and body read timeouts so slow uploads cannot pin connections for long periods.
          </li>
          <li>
            Reject unexpected content types and disable unnecessary content encodings or decompression paths.
          </li>
        </ul>

        <div className="my-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
          <h4 className="mb-2 font-medium">Example: Reverse Proxy Limits for a Public Formatter</h4>
          <pre>
            {`limit_req_zone $binary_remote_addr zone=jsonfmt:10m rate=30r/m;

server {
  client_max_body_size 256k;
  client_body_timeout 5s;
  keepalive_timeout 10s;

  location /api/format {
    limit_req zone=jsonfmt burst=20 nodelay;
    proxy_connect_timeout 2s;
    proxy_read_timeout 10s;
    proxy_pass http://json_formatter_upstream;
  }
}
`}
          </pre>
        </div>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Cpu className="mr-2 text-yellow-600" size={20} />
          3. Keep JSON Processing Bounded
        </h3>
        <p>
          A safe JSON service does not accept arbitrary structural complexity. It defines explicit resource ceilings for
          the shapes it will process.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Cap total bytes, nesting depth, total nodes, per-object key count, key length, string length, and output
            size.
          </li>
          <li>
            Fail fast on malformed JSON and do not run formatting or schema validation after a parse failure.
          </li>
          <li>
            Prefer iterative walkers for post-parse inspection so your own safety checks do not add recursion risk.
          </li>
          <li>
            Keep schema validation off anonymous hot paths when possible. If you must offer it, block remote reference
            fetching and give it stricter quotas than plain formatting.
          </li>
        </ul>

        <div className="my-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
          <h4 className="mb-2 font-medium">Example: Admission Checks in a Route Handler</h4>
          <pre>
            {`const MAX_BYTES = 256 * 1024;
const MAX_DEPTH = 40;
const MAX_NODES = 50_000;
const MAX_KEYS_PER_OBJECT = 10_000;
const MAX_KEY_LENGTH = 256;
const MAX_STRING_LENGTH = 100_000;

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BYTES) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BYTES) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 422 });
  }

  const verdict = inspectJson(parsed);
  if (!verdict.ok) {
    return Response.json({ error: verdict.reason }, { status: 413 });
  }

  return Response.json({ formatted: JSON.stringify(parsed, null, 2) });
}

function inspectJson(root: unknown) {
  const stack = [{ value: root, depth: 1 }];
  let nodes = 0;

  while (stack.length > 0) {
    const item = stack.pop();
    if (!item) break;

    nodes += 1;
    if (nodes > MAX_NODES) {
      return { ok: false, reason: "JSON structure too large" } as const;
    }
    if (item.depth > MAX_DEPTH) {
      return { ok: false, reason: "JSON nesting too deep" } as const;
    }

    if (typeof item.value === "string" && item.value.length > MAX_STRING_LENGTH) {
      return { ok: false, reason: "String value too long" } as const;
    }

    if (Array.isArray(item.value)) {
      for (const child of item.value) {
        stack.push({ value: child, depth: item.depth + 1 });
      }
      continue;
    }

    if (item.value && typeof item.value === "object") {
      const entries = Object.entries(item.value as Record<string, unknown>);
      if (entries.length > MAX_KEYS_PER_OBJECT) {
        return { ok: false, reason: "Too many object keys" } as const;
      }
      for (const [key, child] of entries) {
        if (key.length > MAX_KEY_LENGTH) {
          return { ok: false, reason: "Object key too long" } as const;
        }
        stack.push({ value: child, depth: item.depth + 1 });
      }
    }
  }

  return { ok: true } as const;
}
`}
          </pre>
        </div>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Network className="mr-2 text-cyan-600" size={20} />
          4. Rate Limit by Actor and by Operation Cost
        </h3>
        <p>
          IP-based rate limiting helps, but it is not enough against distributed botnets or shared corporate NATs.
          Public JSON services should use different thresholds for different actors and endpoints.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Use one limit for anonymous browser traffic, another for authenticated users or API keys, and a much lower
            ceiling for expensive operations such as validation.
          </li>
          <li>
            Rate-limit the formatter endpoint separately from the landing page, documentation, and status endpoints.
          </li>
          <li>
            Escalate from soft controls such as challenge pages or token checks to hard <code>429</code> blocks when a
            client continues abusive behavior.
          </li>
          <li>
            Prefer a cost-aware model if you expose multiple tools. Formatting <code>5 KB</code> is not equivalent to
            validating <code>500 KB</code> with schema checks.
          </li>
        </ul>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Database className="mr-2 text-red-600" size={20} />
          5. Isolate Expensive Work from the Web Tier
        </h3>
        <p>
          Do not let untrusted JSON parsing monopolize the same worker pool that serves your home page and health
          checks.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Run expensive parsing, formatting, or schema validation in a bounded worker pool or separate service.
          </li>
          <li>
            Set hard concurrency caps, queue limits, and memory ceilings so overload degrades predictably instead of
            crashing the whole app.
          </li>
          <li>
            Treat queue saturation as a normal protective condition and return <code>503</code> quickly rather than
            letting latency spiral.
          </li>
          <li>
            Remember that <code>JSON.parse</code> is synchronous. If you need hard CPU-time ceilings, move that work
            into an isolated process or worker that you can terminate.
          </li>
        </ul>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Scaling className="mr-2 text-teal-600" size={20} />
          6. Monitor the Signals That Show Abuse Early
        </h3>
        <p>
          DDoS response gets easier when you can tell whether the problem is bandwidth, edge request rate, parser CPU,
          or queue saturation.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Track request rate, body size distribution, parse failures, <code>413</code>, <code>422</code>,{" "}
            <code>429</code>, <code>503</code>, queue depth, active workers, and <code>p95/p99</code> latency.
          </li>
          <li>
            Alert when the percentage of invalid or oversized JSON spikes, not only when overall traffic spikes.
          </li>
          <li>
            Keep sanitized request metadata so you can identify abusive patterns without storing sensitive payloads.
          </li>
          <li>
            Maintain a runbook for switching to stricter limits during an active attack.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Clock className="mr-3 text-indigo-600" size={24} />
          Practical Baseline for a Public JSON Formatter
        </h2>
        <p>
          Exact limits depend on your audience, but this is a defensible starting point for a public browser-based
          formatter that is free and anonymous:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Anonymous max body size: <code>100 KB</code> to <code>256 KB</code>.
          </li>
          <li>
            Request body timeout: about <code>5</code> seconds, with low header and idle timeouts.
          </li>
          <li>
            JSON nesting depth: roughly <code>30</code> to <code>40</code>.
          </li>
          <li>
            Expensive features such as schema validation, format conversion, or large-document processing: authenticated
            only, stricter quotas, separate workers.
          </li>
          <li>
            Response codes: <code>413</code> for too large, <code>415</code> for wrong content type, <code>422</code>{" "}
            for invalid JSON, <code>429</code> for rate limit, <code>503</code> when the protected queue is full.
          </li>
        </ul>
        <p>
          If you offer an authenticated API tier, you can raise those ceilings, but do it intentionally and keep the
          public anonymous path conservative.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <MessageSquareWarning className="mr-3 text-orange-500" size={24} />
          Common Mistakes
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Assuming the CDN or WAF will fully inspect every byte of a large JSON body.</li>
          <li>Allowing direct origin access that bypasses edge mitigation and rate limiting.</li>
          <li>Using recursive safety checks with no depth cap, which creates a second parser problem in your own code.</li>
          <li>Running schema validation, remote reference fetching, or large-document formatting in the same pool as web requests.</li>
          <li>Using one global rate limit instead of separate limits for anonymous UI traffic, API traffic, and expensive operations.</li>
        </ul>

        <h2 className="mt-8">Conclusion</h2>
        <p>
          Protecting a JSON formatting service from DDoS attacks is mostly about refusing unnecessary work. Put an edge
          mitigation layer in front, keep origins private, enforce tight body and time limits before parsing, cap JSON
          structural complexity, and isolate expensive work behind quotas and concurrency controls. That combination
          protects far better than generic rate limiting alone and is the right baseline for a public formatter in 2026.
        </p>
      </div>
    </>
  );
}
