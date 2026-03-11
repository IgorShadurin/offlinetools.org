import type { Metadata } from "next";
import { AlertTriangle, CircleCheck, Database, FileJson, Key, ScanEye, Timer, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Logging Patterns for JSON Processing Diagnostics Guide | Offline Tools",
  description:
    "Practical JSON logging patterns for parse failures, validation errors, redaction, payload fingerprints, and trace correlation in production.",
};

export default function LoggingPatternsForJsonDiagnosticsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson size={30} className="text-blue-500" />
        Logging Patterns for JSON Processing Diagnostics
      </h1>

      <div className="space-y-6">
        <p>
          If a JSON pipeline is failing in production, the fastest path to an answer is usually not "log more". It is
          logging the right fields at the right stage: payload size and source on receipt, parser position on syntax
          failure, schema path on validation failure, and a stable correlation ID across every related event. Good JSON
          diagnostics make failures searchable without dumping entire payloads into your logs.
        </p>
        <p>
          A practical baseline is to emit structured JSON logs, capture a small amount of payload metadata early, log
          field paths instead of whole objects, and aggressively redact secrets and personal data. That gives you logs
          that are useful for direct debugging, safe enough for production, and easy to query in systems such as
          Datadog, Elasticsearch, Loki, or OpenTelemetry-based pipelines.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ScanEye size={24} className="text-green-500" />
          The Minimum Useful Log Record
        </h2>
        <p>
          For JSON processing, the most useful logs share a small common envelope. Even if the message text changes,
          keep the machine-readable fields consistent.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>What happened:</strong> an event name such as <code>json_parse_failed</code> or{" "}
            <code>json_validation_failed</code>.
          </li>
          <li>
            <strong>Where it happened:</strong> a stage such as <code>receive</code>, <code>parse</code>,{" "}
            <code>validate</code>, or <code>transform</code>.
          </li>
          <li>
            <strong>Which input:</strong> source system, content type, payload byte size, and a payload fingerprint or
            request ID.
          </li>
          <li>
            <strong>How severe:</strong> a level such as <code>INFO</code>, <code>WARN</code>, or <code>ERROR</code>.
          </li>
          <li>
            <strong>How to correlate:</strong> request ID, job ID, and if you use distributed tracing,{" "}
            <code>trace_id</code> and <code>span_id</code>.
          </li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "level": "error",
  "event": "json_validation_failed",
  "stage": "validate",
  "timestamp": "2026-03-11T09:18:42.511Z",
  "source": "partner-import-api",
  "schema": "customer-import@2026-03",
  "payload_bytes": 18214,
  "payload_sha256": "0e7a...9d2f",
  "path": "/customers/3/email",
  "expected": "email string",
  "received_type": "number",
  "message": "invalid type at schema path",
  "request_id": "req_7f4b4d7c",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "span_id": "00f067aa0ba902b7"
}`}
          </pre>
        </div>
        <p>
          The fingerprint is important when you cannot safely store the full payload. A hash lets you correlate
          repeated failures without exposing the raw document.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle size={24} className="text-orange-500" />
          What to Log at Each Stage
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Input received</h3>
        <p>
          Log enough to prove that the right JSON arrived before parsing starts. This is where source, content type,
          byte size, schema version, and correlation IDs matter most.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`logger.info("json_processing_started", {
  event: "json_processing_started",
  stage: "receive",
  source: "webhook",
  content_type: req.headers["content-type"],
  payload_bytes: Buffer.byteLength(jsonString, "utf8"),
  payload_sha256: sha256(jsonString),
  schema: "invoice@v4",
  request_id,
  trace_id,
  span_id
});`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Parse failures</h3>
        <p>
          A syntax error log should answer three questions immediately: what parser failed, where it failed, and what
          the nearby input looked like after sanitization. If your runtime exposes a character offset, log it. If it
          does not, log the parser message verbatim and a short safe sample.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`try {
  const parsed = JSON.parse(jsonString);
  logger.info("json_parse_succeeded", {
    event: "json_parse_succeeded",
    stage: "parse",
    payload_bytes: Buffer.byteLength(jsonString, "utf8"),
    request_id,
    trace_id
  });
} catch (error: any) {
  const offset = /position (\\d+)/i.exec(String(error?.message ?? ""))?.[1];

  logger.error("json_parse_failed", {
    event: "json_parse_failed",
    stage: "parse",
    parser: "JSON.parse",
    error_message: error?.message,
    error_offset: offset ? Number(offset) : undefined,
    input_sample: safeSnippet(jsonString, offset ? Number(offset) : undefined, 80),
    payload_bytes: Buffer.byteLength(jsonString, "utf8"),
    payload_sha256: sha256(jsonString),
    request_id,
    trace_id
  });
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Validation failures</h3>
        <p>
          Validation logs are most useful when they point to a field path rather than saying only that validation
          failed. For JSON Schema validators that often means a JSON Pointer such as <code>/items/2/id</code>. For
          type-safe validators it might be a dot path such as <code>items.2.id</code>. Log the failing path, the rule,
          the expected value or type, and the schema version.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`for (const issue of validationIssues) {
  logger.warn("json_validation_failed", {
    event: "json_validation_failed",
    stage: "validate",
    schema: "invoice@v4",
    path: issue.path,
    rule: issue.rule,
    expected: issue.expected,
    received_type: issue.receivedType,
    message: issue.message,
    request_id,
    trace_id
  });
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Transformation and business-rule failures</h3>
        <p>
          These failures happen after the JSON is valid but still not usable. Examples include unsupported enum values,
          missing upstream reference data, or conflicting timestamps. At this stage, log the transformation step and a
          narrow subset of the data that drove the decision.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`logger.error("json_transform_failed", {
  event: "json_transform_failed",
  stage: "transform",
  transform: "invoice_to_ledger_entry",
  message: "currency code is not supported",
  source_fields: {
    invoice_id: parsed.invoiceId,
    currency: parsed.currency,
    issued_at: parsed.issuedAt
  },
  request_id,
  trace_id
});`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Successful completion</h3>
        <p>
          Success logs should be compact. In high-volume paths, do not emit a full success record for every document
          unless you need a complete audit trail. Prefer summary fields such as counts, duration, and destination.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>INFO</code> for start and finish events with a small, stable field set.
          </li>
          <li>
            Use <code>WARN</code> for recoverable issues, partial acceptance, or non-blocking schema drift.
          </li>
          <li>
            Use <code>ERROR</code> when the record or batch cannot proceed.
          </li>
          <li>
            Keep <code>DEBUG</code> for short-lived investigations, not permanent payload dumping.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} className="text-purple-500" />
          Prefer Field Paths Over Full Payloads
        </h2>
        <p>
          The fastest way to drown a logging system is to serialize full request bodies on every failure. The better
          pattern is to log identifiers, schema information, and the precise failing location. That keeps log volume
          predictable and makes searches more accurate.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Log a path such as <code>/orders/12/items/3/sku</code> instead of the entire object.
          </li>
          <li>
            Log <code>payload_bytes</code>, <code>item_count</code>, or <code>top_level_keys</code> instead of raw
            arrays.
          </li>
          <li>
            Log a fingerprint such as <code>payload_sha256</code> when you need repeat-failure correlation.
          </li>
          <li>
            If a sample is necessary, cap it aggressively and sanitize it before writing it anywhere.
          </li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

function safeSnippet(source: string, offset?: number, radius = 80) {
  const start = Math.max(0, (offset ?? 0) - radius);
  const end = Math.min(source.length, (offset ?? 0) + radius);

  return source
    .slice(start, end)
    .replace(/[\\r\\n\\t]/g, " ")
    .slice(0, 200);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Key size={24} className="text-zinc-500" />
          Redaction, Truncation, and Log Safety
        </h2>
        <p>
          Current production guidance is consistent on one point: logs are a data handling surface, not a safe dumping
          ground. Secrets, tokens, session identifiers, payment data, and personal data should be removed, masked, or
          transformed before they are written. If you must preserve joinability, log a hash or surrogate ID instead of
          the raw value.
        </p>
        <p>
          Treat user-controlled values as untrusted input even when they are heading into your logs. Newlines,
          delimiters, and terminal control characters can make plain-text logs misleading or harder to parse
          downstream, so sanitize them before emitting snippets or message fragments.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`const SENSITIVE_KEY = /pass(word)?|token|secret|authorization|cookie|session|ssn|email|card/i;

function sanitizeForLogs(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\\r\\n\\t]/g, " ").slice(0, 200);
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map(sanitizeForLogs);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, inner]) => [
      key,
      SENSITIVE_KEY.test(key) ? "[REDACTED]" : sanitizeForLogs(inner)
    ])
  );
}`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Redact by key name and by location in the payload, not just by exact field spelling.</li>
          <li>Truncate long strings and cap array sizes before serializing to logs.</li>
          <li>Keep logging failures non-fatal so a broken sink does not break JSON processing itself.</li>
          <li>Emit timestamps in UTC and also log durations such as <code>parse_ms</code> or <code>total_ms</code>.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} className="text-blue-500" />
          Correlate Logs With Traces
        </h2>
        <p>
          If your app already uses distributed tracing, connect the JSON diagnostics to that trace instead of inventing
          a separate debugging story. Current OpenTelemetry guidance uses top-level trace context fields such as{" "}
          <code>trace_id</code>, <code>span_id</code>, and <code>trace_flags</code>. Putting those fields directly in
          your structured logs makes it easy to jump from a parser failure to the exact request or background job that
          produced it.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`logger.error("json_parse_failed", {
  event: "json_parse_failed",
  stage: "parse",
  trace_id,
  span_id,
  trace_flags,
  request_id,
  job_id,
  parser: "JSON.parse",
  error_message: error.message
});`}
          </pre>
        </div>
        <p>
          If tracing is not available, a request ID or batch ID is still mandatory. Use the same ID in every event from
          receipt through completion.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Timer size={24} className="text-teal-500" />
          Performance and Noise Control
        </h2>
        <p>
          Diagnostic logging should help explain latency spikes, not cause them. Measure parse, validate, and transform
          timings separately so you know which step is slow. At the same time, control volume so hot paths do not flood
          your logging system.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Always log failures. Sample high-volume success events if full auditing is not required.</li>
          <li>Record <code>payload_bytes</code> next to <code>parse_ms</code> and <code>validate_ms</code>.</li>
          <li>Aggregate batch-level counts such as accepted, rejected, and retried items.</li>
          <li>Prefer stable field names so dashboards and alerts do not break during refactors.</li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`const startedAt = performance.now();

const parsed = JSON.parse(jsonString);
const parseMs = performance.now() - startedAt;

const validateStartedAt = performance.now();
validate(parsed);
const validateMs = performance.now() - validateStartedAt;

logger.info("json_processing_finished", {
  event: "json_processing_finished",
  stage: "complete",
  payload_bytes: Buffer.byteLength(jsonString, "utf8"),
  parse_ms: Number(parseMs.toFixed(2)),
  validate_ms: Number(validateMs.toFixed(2)),
  total_ms: Number((performance.now() - startedAt).toFixed(2)),
  request_id,
  trace_id
});`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircleCheck size={24} className="text-green-500" />
          Production Checklist
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use structured logs with stable fields, not ad-hoc string messages.</li>
          <li>Emit a common envelope for every JSON event: stage, source, severity, correlation ID, and timestamp.</li>
          <li>On parse failure, log the parser, error message, offset if available, and a sanitized short snippet.</li>
          <li>On validation failure, log the schema version, field path, failing rule, and expected versus received.</li>
          <li>Prefer payload fingerprints, counts, and key lists over raw bodies.</li>
          <li>Redact secrets and personal data before serialization and sanitize user-controlled strings.</li>
          <li>Include <code>trace_id</code> and <code>span_id</code> when traces exist.</li>
          <li>Measure parse, validation, and transform durations separately.</li>
          <li>Keep log sink failures from breaking the main processing path.</li>
        </ul>
        <p>
          The best logging pattern for JSON processing diagnostics is the one that answers "what failed, where, and for
          which payload?" in a single search. If your logs can do that without exposing sensitive data or producing
          unbounded noise, they are doing their job.
        </p>
      </div>
    </>
  );
}
