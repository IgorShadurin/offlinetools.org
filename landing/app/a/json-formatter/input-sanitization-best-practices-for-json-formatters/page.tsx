import type { Metadata } from "next";
import { Shield, AlertTriangle, Code, FileJson, ScanSearch, KeyRound, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Input Sanitization Best Practices for JSON Formatters | Offline Tools",
  description:
    "A practical guide to safer JSON formatter input handling: strict parsing, size and depth limits, duplicate-key checks, secret redaction, and XSS-safe rendering.",
};

export default function JsonFormatterSanitizationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="w-8 h-8 mr-3 text-green-600 dark:text-green-500" />
        Input Sanitization Best Practices for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          If your JSON formatter accepts pasted API responses, uploaded files, or any other untrusted payload, the goal
          is not to &quot;clean up&quot; JSON until it parses. The goal is to reject malformed input, control resource
          usage, protect secrets, and render valid data without turning user content into executable HTML or
          JavaScript.
        </p>
        <p>
          For JSON formatters, <strong>sanitization</strong> usually means four separate things: strict validation,
          structural limits, safe output encoding, and optional redaction. Keeping those concerns separate leads to
          safer tools and fewer confusing edge cases.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-500" />
          What a Search User Usually Needs
        </h2>
        <p>A useful JSON formatter guide should answer these questions directly:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>How do I validate JSON safely?</strong> Parse strictly and fail closed instead of repairing input
            with regexes.
          </li>
          <li>
            <strong>How do I prevent XSS in a web formatter?</strong> Treat formatted JSON as text unless you have a
            fully escaped token renderer.
          </li>
          <li>
            <strong>How do I stop large payloads from freezing the browser?</strong> Enforce byte, depth, and node
            limits before pretty-printing.
          </li>
          <li>
            <strong>What about secrets and duplicate keys?</strong> Redact sensitive values and decide whether
            duplicate object keys are warnings or hard failures.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ScanSearch className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500" />
          The Practical Workflow
        </h2>
        <p>
          A robust JSON formatter pipeline is simple: accept raw text, parse it strictly, inspect the parsed structure,
          optionally redact, then render the result through a safe sink.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          1. Parse Strictly and Fail Closed
        </h3>
        <p>
          Start with a real JSON parser, not string replacement. If the payload contains comments, trailing commas, or
          invalid quotes, reject it or label the mode clearly as non-standard JSON. Quietly auto-fixing malformed input
          can hide upstream bugs and create interoperability problems later.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Strict parse with a byte limit:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function parseJsonInput(input: string, maxBytes = 1_000_000) {
  const bytes = new TextEncoder().encode(input).length;
  if (bytes > maxBytes) {
    throw new Error("Input is too large to format safely.");
  }

  try {
    return JSON.parse(input);
  } catch {
    throw new Error("Input is not valid JSON.");
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Do not sanitize JSON by stripping characters until it parses. A formatter should reject invalid JSON unless
            it explicitly supports a separate lenient mode.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <KeyRound className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          2. Enforce Depth and Node Limits
        </h3>
        <p>
          Valid JSON can still be operationally unsafe. Extremely large arrays, deeply nested objects, and huge string
          values can lock up the main thread or exhaust memory during formatting and syntax highlighting.
        </p>
        <p>Inspect structure after parsing and stop early when the payload crosses the limits your UI can handle.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Iterative shape inspection:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

function inspectJsonShape(
  root: JsonValue,
  limits = { maxDepth: 40, maxNodes: 50_000 }
) {
  const stack = [{ value: root, depth: 1 }];
  let nodes = 0;

  while (stack.length > 0) {
    const current = stack.pop()!;
    nodes += 1;

    if (nodes > limits.maxNodes) {
      throw new Error("JSON contains too many values to format safely.");
    }

    if (current.depth > limits.maxDepth) {
      throw new Error("JSON nesting is too deep to format safely.");
    }

    if (Array.isArray(current.value)) {
      for (const item of current.value) {
        stack.push({ value: item, depth: current.depth + 1 });
      }
      continue;
    }

    if (current.value && typeof current.value === "object") {
      for (const value of Object.values(current.value)) {
        stack.push({ value, depth: current.depth + 1 });
      }
    }
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Pick limits based on your UI and hardware budget, then make them explicit in product copy so users know why
            a payload was rejected.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          3. Decide How to Handle Duplicate Keys and Non-standard JSON
        </h3>
        <p>
          Duplicate keys are not a harmless formatting detail. The JSON specification says object member names{" "}
          <strong>should be unique</strong>, and different parsers can behave differently when they are not. Many
          implementations keep only the last value, which means a formatter can accidentally hide earlier data.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>If duplicate keys matter, detect them before data becomes a plain object.</strong> Once{" "}
            <code>JSON.parse</code> collapses duplicates, you cannot reliably recover them afterward.
          </li>
          <li>
            <strong>Be explicit about comments and trailing commas.</strong> Those belong to JSON5-like modes, not
            standard JSON.
          </li>
          <li>
            <strong>Show warnings in the UI.</strong> A formatter that silently accepts ambiguous input makes debugging
            harder.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Rule of thumb:</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Strict JSON formatters should reject ambiguous input. Helpful repair modes are fine only when they are
            clearly labeled and never confused with standards-compliant validation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <EyeOff className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          4. Render JSON as Text, Not HTML
        </h3>
        <p>
          The biggest security mistake in web-based JSON formatters is treating formatted output as trusted HTML.
          Strings inside valid JSON can still contain <code>&lt;script&gt;</code>, event handlers, or markup
          fragments. Parsing JSON safely does <strong>not</strong> make those strings safe to inject into the DOM as
          HTML.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Safe React rendering:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function SafeJsonPreview({ input }: { input: string }) {
  const parsed = parseJsonInput(input);
  inspectJsonShape(parsed);
  const formatted = JSON.stringify(parsed, null, 2);

  return <pre className="overflow-x-auto">{formatted}</pre>;
}

// Avoid building highlighted HTML from untrusted JSON and then doing this:
// <pre dangerouslySetInnerHTML={{ __html: highlightedHtml }} />`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            In React, string children are escaped by default, which is exactly what you want. If you must add syntax
            highlighting, escape token text before it becomes HTML and keep a strict Content Security Policy. If your
            formatter exposes an API, return raw JSON with <code>application/json</code>, not <code>text/html</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Redact Sensitive Fields Before Display or Logging</h3>
        <p>
          Pretty-printing can accidentally expose secrets in screenshots, browser history, error telemetry, and support
          logs. If your formatter is used for debugging production payloads, add an optional redaction step before
          display and before any server-side logging.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Simple recursive redaction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function redactSensitiveFields(
  value: unknown,
  hiddenKeys = ["password", "token", "secret", "authorization", "apiKey"]
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => redactSensitiveFields(item, hiddenKeys));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => {
      const shouldHide = hiddenKeys.includes(key.toLowerCase());
      return [key, shouldHide ? "[REDACTED]" : redactSensitiveFields(child, hiddenKeys)];
    })
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Redaction rules should be configurable. A strict allowlist is even better when you know exactly which
            fields are safe to reveal.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-500" />
          Common Pitfalls
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Using regex as a parser:</strong> Stripping comments, commas, or quotes until input parses creates
            surprising behavior and can conceal bad upstream data.
          </li>
          <li>
            <strong>Assuming `JSON.parse` solves XSS:</strong> It validates syntax, but it does not make string content
            safe for HTML sinks.
          </li>
          <li>
            <strong>Ignoring duplicate keys:</strong> Ambiguous objects can display one value while another parser
            keeps a different one.
          </li>
          <li>
            <strong>Logging raw user payloads:</strong> Parse failures often end up in logs with secrets intact.
          </li>
          <li>
            <strong>Formatting huge payloads on the main thread:</strong> Even valid JSON can freeze the UI if size and
            structure limits are missing.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-green-600 dark:text-green-500" />
          Quick Checklist
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Parse with a strict JSON parser and fail closed.</li>
          <li>Set maximum byte size, depth, and node-count limits.</li>
          <li>Decide whether duplicate keys are warnings or errors.</li>
          <li>Render formatted JSON as text, not raw HTML.</li>
          <li>Use a strict CSP if any highlighted HTML is generated.</li>
          <li>Redact sensitive fields before display, telemetry, and logs.</li>
          <li>Label any JSON5 or repair mode clearly so users do not confuse it with standard JSON validation.</li>
        </ul>
        <p>
          The best input sanitization strategy for JSON formatters is simple: validate strictly, apply resource limits,
          keep rendering in safe text contexts, and redact secrets when needed. That gives users a formatter that is
          genuinely helpful without silently changing their data or creating an avoidable XSS risk.
        </p>
      </div>
    </>
  );
}
