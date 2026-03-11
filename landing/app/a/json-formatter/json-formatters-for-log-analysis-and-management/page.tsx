import type { Metadata } from "next";
import { FileJson, Search, Database, Eye, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters for Log Analysis and Management | Offline Tools",
  description:
    "Practical guide to JSON formatters for log analysis and management, covering schema design, trace IDs, redaction, pipeline compatibility, and troubleshooting.",
};

export default function JsonLogFormattersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <FileJson className="inline-block mr-2 h-8 w-8 text-blue-500" /> JSON Formatters for Log Analysis and
        Management
      </h1>

      <div className="space-y-6">
        <p>
          JSON formatters are most useful when they turn every log event into a consistent object that both humans and
          log platforms can understand. For log analysis and management, the real benefit is not indentation alone. It
          is stable field names, predictable data types, and enough context to filter, aggregate, and correlate events
          without brittle regex parsing.
        </p>
        <p>
          The practical rule is simple: emit compact JSON in production, pretty-print only when a person is reading the
          logs, and keep the same schema across services. A formatter sits between your application code and your log
          pipeline, making sure each record has the fields and shape your tools expect.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-xl font-semibold flex items-center">
            <Eye className="inline-block mr-2 h-6 w-6 text-green-500" /> What Good JSON Logging Looks Like
          </h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              One JSON object per event, with no guessing about where one log entry ends and the next begins.
            </li>
            <li>
              Required fields like <code>timestamp</code>, <code>severity</code>, <code>message</code>,{" "}
              <code>service</code>, and <code>environment</code>.
            </li>
            <li>
              Correlation fields such as <code>requestId</code>, <code>traceId</code>, and <code>spanId</code> when a
              request crosses services.
            </li>
            <li>
              Real data types: numbers stay numbers, booleans stay booleans, and timestamps use a standard string
              format such as ISO 8601.
            </li>
            <li>
              Sensitive values are redacted before the log is written, not after it has already spread through the
              pipeline.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="inline-block mr-2 h-6 w-6 text-teal-500" /> Why JSON Formatters Matter for Analysis
        </h2>
        <p>Structured JSON logging improves day-to-day analysis in ways plain text usually cannot:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Field-based filtering:</strong> Find all failed requests for one customer or one service without
            text parsing hacks.
          </li>
          <li>
            <strong>Reliable aggregation:</strong> Build dashboards for error rate, duration, status code, or release
            version because those values are already separated into fields.
          </li>
          <li>
            <strong>Trace correlation:</strong> Join logs to traces and spans during incident response instead of
            hunting through unrelated messages.
          </li>
          <li>
            <strong>Cleaner ingestion:</strong> Log shippers and managed platforms can parse JSON directly, preserve
            types, and attach metadata with less custom pipeline work.
          </li>
          <li>
            <strong>Safer governance:</strong> Formatters are a useful place to redact secrets, normalize keys, and
            prevent accidental leakage of raw request bodies or credentials.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="inline-block mr-2 h-6 w-6 text-purple-500" /> Human-Readable vs Pipeline-Friendly Output
        </h2>
        <p>
          Pretty JSON is useful in terminals, offline inspection, and postmortems. Centralized log pipelines usually
          work best when each event is emitted as a single compact JSON line so collectors can forward it without
          guessing record boundaries.
        </p>
        <p>
          The safest approach is to keep one event shape and switch only the presentation mode. Compact output is for
          production ingestion. Pretty output is for local reading and debugging.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="inline-block mr-2 h-6 w-6 text-orange-500" /> TypeScript Formatter Example
        </h2>
        <p>
          This example keeps one structured shape, removes a couple of sensitive fields, and lets you choose compact or
          pretty output with the same function.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Compact for production, indented for local debugging:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type LogEvent = {
  timestamp: string;
  severity: "DEBUG" | "INFO" | "WARN" | "ERROR";
  message: string;
  service: string;
  environment: string;
  requestId?: string;
  traceId?: string;
  spanId?: string;
  durationMs?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  context?: Record<string, unknown>;
};

function formatLog(event: LogEvent, pretty = false) {
  const safeContext = event.context
    ? {
        ...event.context,
        authorization: undefined,
        password: undefined,
      }
    : undefined;

  return JSON.stringify(
    {
      ...event,
      context: safeContext,
    },
    null,
    pretty ? 2 : 0
  );
}

const event: LogEvent = {
  timestamp: new Date().toISOString(),
  severity: "ERROR",
  message: "Charge creation failed",
  service: "billing-api",
  environment: "production",
  requestId: "req_7d2b7b",
  traceId: "4bf92f3577b34da6a3ce929d0e0e4736",
  spanId: "00f067aa0ba902b7",
  durationMs: 1287,
  error: {
    name: "StripeTimeoutError",
    message: "Upstream timeout after 3 retries",
  },
  context: {
    customerId: "cust_12345",
    authorization: "Bearer secret-token",
  },
};

const productionLine = formatLog(event);
const debugView = formatLog(event, true);

console.log(productionLine);
console.log(debugView);`}
            </pre>
          </div>
        </div>
        <p>
          The most important part is not the indentation flag. It is the deliberate shape of the event: consistent
          keys, preserved number fields like <code>durationMs</code>, and redaction before the record leaves the
          application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="inline-block mr-2 h-6 w-6 text-blue-500" /> Schema Choices That Age Well
        </h2>
        <p>
          If you want logs to stay useful as systems grow, pick a schema and keep it stable. You do not need a perfect
          enterprise taxonomy, but you do need names that will still make sense when several teams are querying the same
          data.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>OpenTelemetry conventions:</strong> The current OpenTelemetry log data model uses fields such as{" "}
            <code>Timestamp</code>, <code>TraceId</code>, <code>SpanId</code>, <code>SeverityText</code>, and{" "}
            <code>SeverityNumber</code>. That makes trace correlation and severity handling more predictable.
          </li>
          <li>
            <strong>Elastic Common Schema:</strong> ECS offers durable naming like <code>log.level</code>,{" "}
            <code>log.logger</code>, and <code>log.file.path</code>. Even partial adoption can reduce schema drift.
          </li>
          <li>
            <strong>Managed platform mapping:</strong> Current cloud log platforms often promote a few top-level JSON
            fields into first-class indexed fields. For example, Google Cloud Logging treats keys such as{" "}
            <code>severity</code>, <code>message</code>, and <code>httpRequest</code> specially.
          </li>
        </ul>
        <p>
          A useful compromise is to keep your application schema simple, then align names and special fields with the
          log backend you actually use for search, alerting, and retention.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="inline-block mr-2 h-6 w-6 text-yellow-500" /> A Production-Friendly Log Entry
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "timestamp": "2026-03-11T10:15:24.182Z",
  "severity": "ERROR",
  "service": "billing-api",
  "environment": "production",
  "version": "2026.03.11",
  "requestId": "req_7d2b7b",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "message": "Charge creation failed",
  "error": {
    "name": "StripeTimeoutError",
    "message": "Upstream timeout after 3 retries"
  },
  "customerId": "cust_12345",
  "durationMs": 1287,
  "statusCode": 504
}`}
            </pre>
          </div>
        </div>
        <p>
          This single record supports the most common operational questions immediately: what failed, where it failed,
          how severe it is, how long it took, and how to follow the same request into traces or neighboring services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="inline-block mr-2 h-6 w-6 text-pink-500" /> Quick Offline Analysis Patterns
        </h2>
        <p>
          If your app emits one JSON object per line, you can do useful triage before the logs ever reach a dashboard.
          Tools like <code>jq</code> become much more effective when the formatter has already normalized keys and
          types.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Examples with newline-delimited JSON logs:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Show the fields humans care about for recent errors
jq -r 'select(.severity == "ERROR") | [.timestamp, .service, .requestId, .message] | @tsv' app.log

# Follow one distributed request across services
jq 'select(.traceId == "4bf92f3577b34da6a3ce929d0e0e4736")' app.log

# Find slow requests
jq 'select(.durationMs and .durationMs > 1000)' app.log`}
            </pre>
          </div>
        </div>
        <p>
          If the same logs are emitted as multi-line pretty JSON in production, or if extra data is hidden inside an
          escaped JSON string in <code>message</code>, these workflows become much harder.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="inline-block mr-2 h-6 w-6 text-red-500" /> Common Formatting Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Mixing types for the same field:</strong> If <code>userId</code> is sometimes a number and
            sometimes a string, indexing and filtering become unreliable.
          </li>
          <li>
            <strong>Embedding JSON inside the message text:</strong> Do not make downstream tools parse structured data
            twice. Put it in fields.
          </li>
          <li>
            <strong>Shipping multi-line pretty JSON in production:</strong> It is readable, but line-oriented
            collectors can split or merge events incorrectly.
          </li>
          <li>
            <strong>Logging high-cardinality noise:</strong> Raw request bodies, random labels, and per-user blobs make
            search slower and storage more expensive.
          </li>
          <li>
            <strong>Forgetting redaction:</strong> Authorization headers, API keys, cookies, and personal identifiers
            should be removed or masked before write time.
          </li>
          <li>
            <strong>Flattening blindly:</strong> A little structure for <code>error</code> or <code>http</code> data
            is fine. Just keep it predictable and shallow enough to query.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Eye className="inline-block mr-2 h-6 w-6 text-green-500" /> Choosing the Right Formatter Strategy
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>For local debugging:</strong> Pretty-print the same structured event shape that production emits.
          </li>
          <li>
            <strong>For centralized management:</strong> Emit compact JSON with fixed keys, stable severity values, and
            numeric durations.
          </li>
          <li>
            <strong>For distributed systems:</strong> Include <code>requestId</code> plus <code>traceId</code> and{" "}
            <code>spanId</code> so logs and traces can meet in one investigation.
          </li>
          <li>
            <strong>For compliance-sensitive systems:</strong> Prefer logger hooks or formatters that support
            field-level redaction before output.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="inline-block mr-2 h-6 w-6 text-yellow-500" /> Conclusion
        </h2>
        <p>
          A JSON formatter improves log analysis only when it makes logs easier to parse, search, correlate, and
          govern. Use one object per event, standardize the schema, keep types consistent, and reserve pretty-printing
          for human reading. That gives you logs that work well in a terminal, in an offline JSON formatter, and in a
          modern observability platform.
        </p>
      </div>
    </>
  );
}
