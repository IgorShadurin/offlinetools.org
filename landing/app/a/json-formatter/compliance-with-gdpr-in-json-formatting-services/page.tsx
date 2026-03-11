import type { Metadata } from "next";
import {
  ShieldCheck,
  FileJson,
  Scale,
  CheckCircle,
  Lock,
  ScrollText,
  User,
  Eraser,
  Key,
  Users,
  Database,
  Code,
  BookOpen,
  Upload,
  EyeOff,
  Server,
  Timer,
  Trash2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance with GDPR in JSON Formatting Services | Practical Guide",
  description:
    "Learn how GDPR applies to online JSON formatting services, including browser-only processing, DPAs, logging, retention, international transfers, and user-rights handling.",
};

export default function GdprJsonComplianceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ShieldCheck className="text-green-600" size={36} /> Compliance with GDPR in JSON Formatting Services
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <FileJson size={24} /> The Short Answer
          </h2>
          <p>
            A JSON formatting service can be GDPR-compliant, but only if its real data flow matches its privacy claims.
            The safest model is local, browser-only processing where raw JSON never leaves the user&apos;s device. Once
            a tool uploads payloads to an app server, AI API, log pipeline, analytics tool, or session replay script,
            it is processing personal data and must meet the GDPR obligations that follow from that design.
          </p>
          <p>
            For most search users, the practical question is not &quot;does GDPR apply at all?&quot; but &quot;what
            would make this formatter safe enough for personal data?&quot; In 2026, the answer still comes down to a
            small set of issues: data minimization, privacy by default, security, retention, processor terms,
            international transfers, and the ability to support user rights if any data is stored.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Scale size={24} /> Which GDPR Rules Matter Most Here
          </h2>
          <p>
            The most relevant GDPR touchpoints for a JSON formatter are still the same official provisions developers
            and procurement teams should look at first:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Article 5:</strong> process only what is necessary, for a clear purpose, and keep it no longer
              than needed.
            </li>
            <li>
              <strong>Article 25:</strong> build privacy into the product and keep the default configuration
              conservative.
            </li>
            <li>
              <strong>Article 28:</strong> if the service processes customer data on the customer&apos;s behalf, a Data
              Processing Agreement (DPA) is normally required.
            </li>
            <li>
              <strong>Article 32:</strong> apply appropriate security controls such as encryption, access restriction,
              and tested operational safeguards.
            </li>
            <li>
              <strong>Article 33:</strong> a processor must notify the controller without undue delay after becoming
              aware of a personal-data breach, while the controller may have a 72-hour regulator deadline.
            </li>
            <li>
              <strong>Articles 44 to 46:</strong> if data leaves the EEA, the transfer needs a lawful mechanism such
              as an adequacy decision or appropriate safeguards.
            </li>
            <li>
              <strong>Article 83:</strong> weak compliance is not a paperwork issue only; enforcement risk can be
              material.
            </li>
          </ul>
          <p className="mt-4">
            That means an online formatter is not &quot;GDPR-safe&quot; just because it performs a simple technical task.
            If the service can see the payload, store it, or leak it through logs and vendors, GDPR analysis becomes
            very real very quickly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <ScrollText size={24} /> Where Personal Data Shows Up in JSON
          </h2>
          <p>
            JSON often contains obvious identifiers, but the higher-risk problem is that it also contains hidden or
            indirect identifiers that teams forget about during testing.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Direct identifiers: names, email addresses, phone numbers, postal addresses, account numbers.</li>
            <li>Online identifiers: IP addresses, cookie IDs, device IDs, session IDs, advertising IDs.</li>
            <li>Operational records: order history, support tickets, webhook payloads, audit events, CRM exports.</li>
            <li>Special-category or high-sensitivity fields: health data, biometric data, political or religious data.</li>
            <li>
              Combinations of fields that identify someone when joined together, even if no single field looks
              sensitive on its own.
            </li>
          </ul>
          <p className="mt-4">A small example shows why JSON formatters are often handling real personal data:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "customerId": "cus_98421",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "deviceIp": "203.0.113.15",
  "supportTicket": {
    "topic": "medical reimbursement",
    "notes": "Contains invoice and diagnosis details"
  }
}`}
            </pre>
          </div>
          <p>
            Even if the formatter &quot;only reformats whitespace,&quot; the service may still be exposed to the full
            payload. That is enough to trigger GDPR obligations if the data reaches infrastructure you control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <User size={24} />
            <Server size={24} className="ml-[-0.5rem]" /> Controller and Processor Roles Are Often Split
          </h2>
          <p>
            The old shortcut of saying &quot;the user is the controller and the formatter is the processor&quot; is
            often incomplete. In practice, a JSON service can play different roles for different data flows.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <User size={18} className="inline-block mr-1 text-blue-500" />
              The customer using the formatter is usually the <strong>controller</strong> for the JSON payload they
              choose to paste or upload.
            </li>
            <li>
              <Server size={18} className="inline-block mr-1 text-blue-500" />
              The service provider is usually a <strong>processor</strong> for that payload if the payload is handled
              only on the customer&apos;s instructions.
            </li>
            <li>
              <Database size={18} className="inline-block mr-1 text-blue-500" />
              The same provider may still be a <strong>controller</strong> for separate data such as account records,
              billing data, abuse-prevention logs, or aggregate service analytics.
            </li>
          </ul>
          <p className="mt-4">
            This distinction matters because a vendor can reduce processor exposure with browser-only formatting, but it
            cannot claim to be outside GDPR entirely if it still collects account, support, security, or telemetry data
            for its own purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <CheckCircle size={24} /> What a GDPR-Ready JSON Formatter Should Offer
          </h2>
          <p>
            If you are evaluating a formatter for real-world use, these are the features and commitments that matter
            most:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Browser-only processing by default:</strong> formatting and validation happen locally, without
              sending raw payloads to the provider.
            </li>
            <li>
              <strong>No raw-payload logging:</strong> request bodies, editor contents, and parse errors are not copied
              into logs, analytics events, crash reports, or support tools.
            </li>
            <li>
              <strong>Clear retention rules:</strong> if snippets, history, or shared links exist, the retention window
              is explicit and short enough to defend.
            </li>
            <li>
              <strong>DPA and subprocessor transparency:</strong> if server-side processing exists, the provider can
              sign a DPA and disclose the vendors involved.
            </li>
            <li>
              <strong>Transfer coverage:</strong> the provider can explain where data is processed and what transfer
              mechanism applies for non-EEA access.
            </li>
            <li>
              <strong>Security controls:</strong> TLS in transit, encryption at rest where data is stored, access
              control, and incident response procedures.
            </li>
            <li>
              <strong>No secondary use by default:</strong> uploaded JSON is not reused for model training, marketing,
              or product analytics unless there is a clear lawful basis and explicit disclosure.
            </li>
            <li>
              <strong>User-rights support:</strong> if the service stores any user data, it can export, correct, and
              delete it within a reasonable operational process.
            </li>
          </ul>
          <p className="mt-4">
            If a provider cannot answer these points in writing, do not paste production personal data into the tool.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <EyeOff size={24} /> Common Red Flags
          </h2>
          <p>Most GDPR failures in formatter-style tools are not cryptography failures. They are ordinary product choices.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>JSON sent to an AI or remote validation API when a local parse would have been enough.</li>
            <li>Full request bodies copied into error trackers, reverse-proxy logs, or support chat transcripts.</li>
            <li>Shareable snippet URLs enabled by default, with no expiry or access control.</li>
            <li>Third-party analytics or session replay running on the page where users paste payloads.</li>
            <li>Large payloads accepted through URL parameters, which can leak through browser history or referrers.</li>
            <li>No visible retention limit, no deletion workflow, and no answer about backup handling.</li>
            <li>No subprocessor list, no hosting region disclosure, and no explanation of non-EEA transfers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Lock size={24} /> Engineering Controls That Matter Most
          </h2>
          <p>
            For developers building or maintaining a formatter, GDPR-friendly architecture is usually straightforward:
            keep data local when possible, keep logs clean, and make storage an explicit opt-in feature rather than a
            hidden default.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Server size={20} /> Prefer Local Processing
          </h3>
          <p>
            Formatting, minifying, sorting keys, and JSON syntax validation can usually happen entirely in the browser.
            That is the cleanest privacy-by-design choice because it avoids transmitting raw payloads to your
            infrastructure in the first place.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Users size={20} /> Keep Logs Metadata-Only
          </h3>
          <p>
            If you need observability, record metadata such as payload size, operation type, latency, and result code.
            Avoid storing the raw JSON, especially in parse-failure logs where sensitive fields are often dumped during
            debugging.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Key size={20} /> Limit Access and Persistence
          </h3>
          <p>
            If users can save snippets or collaborate, encrypt stored records, restrict staff access, expire dormant
            data, and separate production secrets from content storage. Do not keep &quot;temporary&quot; payloads
            forever just because storage is cheap.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Upload size={20} /> Treat Subprocessors and Transfers as Product Dependencies
          </h3>
          <p>
            Hosting, CDN, monitoring, analytics, customer support, and AI vendors can all become part of the data path.
            If the formatter is not truly local, each dependency needs review for processor terms, region, retention,
            and transfer mechanism.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Code size={24} /> Example: Redact Before Logging or Escalation
          </h2>
          <p>
            If engineers ever need to capture a failing payload for debugging, the first step should be redaction, not
            copying the whole JSON into a log or ticket.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-sm">
              {`const SENSITIVE_KEYS = new Set([
  "name",
  "email",
  "phone",
  "address",
  "ip",
  "token",
  "authorization",
  "ssn",
]);

function scrubForLogs(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(scrubForLogs);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, inner]) => [
        key,
        SENSITIVE_KEYS.has(key.toLowerCase()) ? "[REDACTED]" : scrubForLogs(inner),
      ]),
    );
  }

  return value;
}`}
            </pre>
          </div>
          <p className="mt-4">
            <Eraser size={18} className="inline-block mr-1 text-blue-500" />
            This is still only a safety net. It does not replace proper data classification, field-level rules, or a
            deliberate policy on when engineers may inspect payloads at all.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Database size={24} /> Data Subject Rights, Retention, and Breach Readiness
          </h2>
          <p>
            Rights handling becomes much easier when the service does not store payloads. But if you offer accounts,
            snippet history, saved examples, team workspaces, or support uploads, you need a workable response model.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <Database size={18} className="inline-block mr-1 text-blue-500" />
              Provide a way to locate stored records for access or export requests.
            </li>
            <li>
              <Trash2 size={18} className="inline-block mr-1 text-red-500" />
              Support deletion and define what happens to backups, replicas, and expired shared links.
            </li>
            <li>
              <Timer size={18} className="inline-block mr-1 text-yellow-500" />
              Maintain an escalation path for incidents so processors can notify controllers without undue delay.
            </li>
          </ul>
          <p className="mt-4">
            A browser-only formatter dramatically reduces the scope of user-rights work for the JSON payload itself, but
            it does not eliminate GDPR obligations for account, support, billing, or security-log data that the service
            still collects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <BookOpen size={24} /> Practical Decision Rule
          </h2>
          <p>
            If the JSON may contain personal data, the safest default is simple: use a formatter that works entirely in
            the browser and does not send payloads to remote services. If server-side processing is unavoidable, expect
            the same compliance basics you would require from any other processor: DPA coverage, security controls,
            transfer clarity, limited retention, and a credible deletion and incident process.
          </p>
          <p>
            GDPR compliance for JSON formatting services is therefore less about the fact that the data is JSON and more
            about the operational choices around that JSON. The more local, temporary, and transparent the processing
            model is, the easier the service is to trust and defend.
          </p>
        </section>
      </div>
    </>
  );
}
