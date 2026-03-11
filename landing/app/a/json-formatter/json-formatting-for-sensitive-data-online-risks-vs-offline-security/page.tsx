import type { Metadata } from "next";
import {
  Bug,
  Cloud,
  FileJson,
  HardDrive,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  WifiOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatting for Sensitive Data: Online vs Offline Security Guide | Developer Article",
  description:
    "Learn when an online JSON formatter is safe, when offline formatting is the better choice, and how to reduce risks from uploads, caching, logs, retention, and local storage.",
};

export default function JsonSecurityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Formatting for Sensitive Data: Online vs Offline Security</h1>

      <div className="space-y-6">
        <p>
          If you need to pretty-print JSON that contains API keys, customer records, auth tokens, incident logs, or
          production configuration, the main security question is not whether JSON itself is safe. The real question is{" "}
          <strong>where copies of that data will exist after you paste it into a formatter</strong>.
        </p>

        <p>
          For most sensitive payloads, an offline or verifiably local-only formatter is the safer default. An online
          formatter can still be acceptable for public or heavily redacted data, but only if you understand whether the
          tool uploads the payload, how long it is retained, and what other systems can see it.
        </p>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <p className="font-semibold">Short answer</p>
          <p className="mt-2">
            Use offline formatting for secrets, regulated data, production exports, or anything you would not email to
            a third party. Use online formatting only for public, disposable, or redacted JSON, or for tools you can
            verify process everything locally in the browser.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-2xl font-semibold mt-8">
          <Cloud className="w-6 h-6 text-blue-500" />
          <h2>What Makes Online JSON Formatting Risky Today</h2>
        </div>

        <p>
          Older security discussions often focused on JSON hijacking and array-wrapping tricks. That history still
          matters for understanding legacy APIs, but it is not the main reason sensitive JSON leaks in 2026. The
          bigger, more practical risks come from <strong>transmission, retention, logging, and endpoint exposure</strong>.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">
              <ShieldAlert className="inline w-4 h-4 mr-2 text-yellow-500" />
              HTTPS Is Necessary, Not Sufficient
            </h3>
            <p className="mt-2">
              TLS protects data in transit, but it does not stop an online formatter from storing the request, logging
              it, or sending it to internal services after it reaches the server.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">
              <Lock className="inline w-4 h-4 mr-2 text-purple-500" />
              Backends Create Extra Copies
            </h3>
            <p className="mt-2">
              Uploaded JSON may end up in access logs, WAF logs, APM traces, crash reports, backups, queues, or support
              tooling. Pretty-printing can become accidental data distribution.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">
              <Bug className="inline w-4 h-4 mr-2 text-red-500" />
              The Browser Is Still Part of the Threat Model
            </h3>
            <p className="mt-2">
              Browser extensions, shared machines, developer tools, screenshots, and clipboard history can expose
              pasted payloads even if the formatter never sends them anywhere.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">The Most Common Online Failure Mode: Trusting “Web Tool” to Mean “Local-Only”</h3>
        <p>
          Many people assume a formatter is harmless because it looks simple. That assumption is unsafe. A page can
          validate, lint, beautify, and still post the full input to a backend for processing, abuse detection,
          analytics, or error handling.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Assume the payload is uploaded unless the tool clearly says processing stays in your browser.</li>
          <li>
            For truly sensitive data, verify that claim yourself by checking the browser network panel while pasting a
            sample payload.
          </li>
          <li>Prefer open-source, self-hosted, desktop, or CLI tooling if the data is confidential or regulated.</li>
          <li>
            Do not paste bearer tokens, session cookies, passwords, private keys, or customer exports into a third-party
            site just because it uses HTTPS.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">If You Build or Operate an Online Formatter</h3>
        <p>
          If sensitive JSON ever crosses a network boundary, transport and caching controls matter. Current security
          guidance still points to the same basics: enforce HTTPS, enable HSTS, and avoid storing sensitive responses in
          caches.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Typical headers for sensitive JSON responses</h4>
          <pre>{`Content-Type: application/json; charset=utf-8
Cache-Control: no-store
Pragma: no-cache
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff`}</pre>
        </div>
        <p>
          Those headers do not make sensitive data safe to hand to an untrusted service. They reduce exposure when you
          already control the service and need to move protected JSON through a browser or API.
        </p>

        <div className="flex items-center space-x-2 text-2xl font-semibold mt-8">
          <HardDrive className="w-6 h-6 text-green-500" />
          <h2>Why Offline Formatting Is Usually Safer</h2>
        </div>

        <p>
          Offline formatting removes one of the biggest unknowns: whether your payload is being copied to someone else&apos;s
          infrastructure. That is why local formatting is the better default for production dumps, internal exports,
          secrets, incident evidence, and regulated datasets.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">
              <ShieldCheck className="inline w-4 h-4 mr-2 text-teal-500" />
              Main Advantage
            </h3>
            <p className="mt-2">
              A local tool keeps formatting inside systems you already administer, approve, or audit. That sharply
              reduces exposure from third-party logging and retention.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-semibold">
              <WifiOff className="inline w-4 h-4 mr-2 text-pink-500" />
              Main Limitation
            </h3>
            <p className="mt-2">
              Offline does not mean invulnerable. Local files, temp directories, shell history, endpoint malware, and
              copied text can still leak the same secrets.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Offline Risks People Still Miss</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Disk exposure:</strong> Full-disk encryption and OS access controls still matter. A formatter that
            writes temp files creates data at rest.
          </li>
          <li>
            <strong>Command history:</strong> Avoid placing secrets directly on the command line. Inline JSON often ends
            up in shell history or process listings.
          </li>
          <li>
            <strong>Logging and crash reporting:</strong> Redact tokens, passwords, account numbers, health data, and
            other identifiers before running tools that may emit logs or diagnostics.
          </li>
          <li>
            <strong>Untrusted payloads:</strong> Even offline, massive or deeply nested JSON can consume memory or CPU.
            Use maintained parsers, apply size limits, and isolate processing when the source is untrusted.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Safer Local Formatting Workflow</h3>
        <p>
          Local CLI tools are often the cleanest choice because they are easy to audit and do not require a browser tab.
          Just avoid copying raw secrets into shell commands.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Better: format a file without putting JSON in shell history</h4>
          <pre>{`jq . payload.json
python -m json.tool payload.json`}</pre>
        </div>
        <p>
          If you need a GUI, prefer a local desktop app or a browser-based tool you can run offline, self-host, or
          inspect easily.
        </p>

        <div className="flex items-center space-x-2 text-2xl font-semibold mt-8">
          <Terminal className="w-6 h-6 text-gray-500" />
          <h2>How To Decide: Online or Offline?</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
            <h3 className="text-lg font-semibold">Choose offline formatting when the JSON includes:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>API keys, bearer tokens, passwords, certificates, or private keys</li>
              <li>Customer records, support exports, billing data, or regulated personal information</li>
              <li>Production configs, incident response evidence, or internal-only infrastructure details</li>
              <li>Anything covered by a contract, compliance rule, or internal data-handling policy</li>
            </ul>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <h3 className="text-lg font-semibold">Online formatting can be reasonable when the JSON is:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Already public, synthetic, demo-only, or fully redacted</li>
              <li>Small enough to inspect manually before sharing</li>
              <li>Processed by a tool you have verified is local-only, or by infrastructure you control</li>
              <li>Low impact if it appears in logs, screenshots, browser history, or temporary storage</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">A Simple Redaction Rule</h3>
        <p>
          If you would not paste the value into a chat message, ticket, or email, do not paste it into a random online
          formatter. Replace secrets and identifiers first, then format the redacted copy.
        </p>

        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Practical checklist before formatting sensitive JSON</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Classify the data: public, internal, confidential, or regulated.</li>
            <li>Remove secrets, tokens, personal data, and unnecessary identifiers before formatting.</li>
            <li>Prefer offline, self-hosted, or browser-local tools for anything non-public.</li>
            <li>Verify whether the tool sends network requests instead of trusting a marketing claim.</li>
            <li>Clean up local files, clipboard contents, and temporary artifacts after you finish.</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2 text-2xl font-semibold mt-8">
          <FileJson className="w-6 h-6 text-orange-500" />
          <h2>Conclusion</h2>
        </div>

        <p>
          The safest way to format sensitive JSON is usually to keep it off the network entirely. Online formatting is
          convenient, but convenience is not a security property. If the payload contains secrets or real user data,
          format it offline or with a tool you can verify stays local. If the data must move over the web, use strong
          transport, disable caching where appropriate, and treat logs and retention as first-class risks rather than an
          afterthought.
        </p>
      </div>
    </>
  );
}
