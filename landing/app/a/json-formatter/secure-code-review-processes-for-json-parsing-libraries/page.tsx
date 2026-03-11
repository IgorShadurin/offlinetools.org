import type { Metadata } from "next";
import {
  AlertTriangle,
  CheckCircle,
  Code,
  ExternalLink,
  ListChecks,
  Lock,
  Server,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Secure Code Review for JSON Parsing Libraries | Offline Tools",
  description:
    "Practical secure code review checklist for JSON parsing libraries: strict parsing, duplicate-key handling, size and depth limits, numeric precision, schema validation, and modern Next.js review points.",
};

export default function SecureJsonParsingReview() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Lock className="w-8 h-8 text-primary" />
        <span>Secure Code Review for JSON Parsing Libraries</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span>What A Secure Review Should Prove</span>
          </h2>
          <p>
            A strong review is not just &quot;does parsing fail cleanly?&quot; It should prove that untrusted JSON is
            handled with predictable parser behavior, bounded resource usage, strict post-parse validation, and safe
            downstream use. That matters because current interoperability guidance still calls out edge cases many teams
            miss: duplicate object names are ambiguous, parsers may impose their own limits, and exact integers above{" "}
            <code>2^53 - 1</code> are not reliably portable across common JSON stacks.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Reject or explicitly define ambiguous input such as duplicate keys and non-standard syntax.</li>
            <li>Bound cost before business logic with request-size, nesting-depth, and collection-size limits.</li>
            <li>Validate structure and allowed fields after parsing instead of trusting parser success.</li>
            <li>Review how parsed values reach logs, templates, queries, merges, and authorization logic.</li>
          </ul>
          <p className="mt-4">
            The standards worth checking against are{" "}
            <a
              href="https://www.rfc-editor.org/rfc/rfc8259"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              RFC 8259 <ExternalLink className="inline w-4 h-4" />
            </a>{" "}
            for JSON itself,{" "}
            <a
              href="https://www.rfc-editor.org/rfc/rfc7493"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              RFC 7493 (I-JSON) <ExternalLink className="inline w-4 h-4" />
            </a>{" "}
            for safer interoperability rules, and{" "}
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              OWASP Input Validation guidance <ExternalLink className="inline w-4 h-4" />
            </a>{" "}
            for application-layer validation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <ListChecks className="w-6 h-6 text-primary" />
            <span>Fast Review Workflow</span>
          </h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Map every trust boundary where JSON enters the system: HTTP bodies, queues, cache blobs, config files,
              and third-party webhooks.
            </li>
            <li>
              Identify the exact parser and mode in use. Reviewers should flag permissive modes that allow comments,
              trailing commas, <code>NaN</code>, <code>Infinity</code>, or other non-standard extensions at a security
              boundary.
            </li>
            <li>
              Check pre-parse and parse-time limits. Request size, depth, key count, string length, and total element
              count should be bounded somewhere explicit.
            </li>
            <li>
              Inspect post-parse validation. The code should reject unknown fields, wrong types, and out-of-range
              values before any authorization, persistence, or templating step.
            </li>
            <li>
              Review maintenance signals for third-party libraries: recent releases, security advisories, supported
              versions, and tests for malformed inputs.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <span>High-Risk Findings Reviewers Commonly Miss</span>
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Duplicate Keys And Other Ambiguous Input</h3>
          <p>
            RFC 8259 notes that duplicate member names make behavior unpredictable because implementations differ. In
            JavaScript, plain object materialization typically keeps the last value, which means a schema validator
            running after <code>JSON.parse</code> may never see the discarded key. If duplicate names could change
            meaning, privilege, routing, or signing behavior, block the change until the boundary rejects them.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Ask whether the parser can reject duplicates before building a normal object.</li>
            <li>Make sure non-standard JSON features are off unless the protocol explicitly requires them.</li>
            <li>Document exact behavior when interoperability with other languages or services matters.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Numbers, Unicode, And Cross-Language Drift</h3>
          <p>
            I-JSON recommends avoiding exact numeric values outside the IEEE 754 safe integer range. A secure review
            should verify whether identifiers, timestamps, counters, or monetary values can overflow or lose precision
            when parsed by JavaScript or mixed-language systems. The same review should check how invalid Unicode
            sequences are handled and whether the library accepts malformed escapes or surrogate pairs.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Encode very large integers as strings if exact value matters across systems.</li>
            <li>Verify whether the parser is strict about invalid escape sequences and malformed Unicode.</li>
            <li>Review comparisons, hashing, and signatures that depend on exact textual or numeric representation.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Resource Exhaustion And Parser Cost</h3>
          <p>
            RFC 8259 explicitly allows implementations to limit input size, nesting depth, number range, and string
            contents. Reviewers should expect those limits to be intentional, not accidental. Large arrays, deep
            nesting, and gigantic strings can still turn safe parsing code into a denial-of-service issue.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Enforce request-body limits before parsing when possible.</li>
            <li>Check depth and structure size limits if the parser does not provide them natively.</li>
            <li>Prefer streaming parsers for very large or unbounded inputs instead of loading everything at once.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Validation Gaps After Parsing</h3>
          <p>
            Parsing only proves the input is syntactically valid JSON. OWASP guidance still applies: validate as early
            as possible, and validate semantics, not just syntax. The review should confirm allowed fields, required
            fields, type constraints, length limits, formats, and business rules.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Reject unexpected fields instead of silently ignoring them.</li>
            <li>Do not merge parsed objects into live config or defaults without key allowlists.</li>
            <li>
              Treat <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code> as dangerous when
              recursively merging or cloning parsed objects.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5. Error Handling, Logging, And Observability</h3>
          <p>
            Parsing failures should be easy for operators to debug but unhelpful to attackers. The review should ensure
            clients receive generic parse errors while internal logs capture enough context to investigate malformed
            payloads, rate spikes, or recurring attack patterns.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Return a generic <code>400</code> or <code>422</code> response for invalid JSON.</li>
            <li>Avoid reflecting raw payloads into logs when they may contain secrets or attacker-controlled content.</li>
            <li>Record limit breaches separately from ordinary syntax failures so abuse is visible.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Code className="w-6 h-6 text-primary" />
            <span>What To Inspect In The Parser Library Itself</span>
          </h2>
          <p>
            If the review includes approving or upgrading a third-party parser, focus less on marketing and more on
            behavior, defaults, and maintenance discipline.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <span className="font-medium">Strictness defaults:</span> Does the library default to standard JSON, or
              does it silently enable comments, trailing commas, or permissive number parsing?
            </li>
            <li>
              <span className="font-medium">Duplicate-key policy:</span> Is behavior documented, configurable, and
              test-covered?
            </li>
            <li>
              <span className="font-medium">Limits:</span> Are depth, token, string, object-member, and total-input
              limits available and documented?
            </li>
            <li>
              <span className="font-medium">Unicode and number handling:</span> Are malformed escapes rejected, and is
              numeric precision behavior clear for big integers and exponents?
            </li>
            <li>
              <span className="font-medium">Security process:</span> Check recent releases, advisories, issue response
              time, and whether malformed-input tests or fuzz cases are visible in the repository.
            </li>
            <li>
              <span className="font-medium">Dependency surface:</span> Fewer transitive dependencies usually means less
              supply-chain risk and a smaller review burden.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Server className="w-6 h-6 text-primary" />
            <span>Modern Next.js Review Example</span>
          </h2>
          <p>
            In current Next.js applications, the practical review target is usually an App Router route handler such as{" "}
            <code>app/api/example/route.ts</code>. The example below keeps the review points explicit: raw-size check,
            parse failure handling, depth control, strict shape validation, and a note about duplicate keys and large
            integers.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-xs">
              {`type CreateUserPayload = {
  id: string;
  email: string;
  role: "viewer" | "editor";
};

const MAX_BODY_BYTES = 64 * 1024;
const MAX_DEPTH = 20;

export async function POST(request: Request) {
  const raw = await request.text();

  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return Response.json({ error: "Request body too large" }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (getDepth(parsed) > MAX_DEPTH) {
    return Response.json({ error: "JSON is too deeply nested" }, { status: 400 });
  }

  if (!isCreateUserPayload(parsed)) {
    return Response.json({ error: "JSON shape is not allowed" }, { status: 422 });
  }

  // If duplicate-key rejection or exact big-integer handling matters,
  // enforce that before materializing into plain JS objects.

  return Response.json({ ok: true });
}

function isCreateUserPayload(value: unknown): value is CreateUserPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length !== 3) return false;
  if (!keys.every((key) => ["id", "email", "role"].includes(key))) return false;

  return (
    typeof record.id === "string" &&
    typeof record.email === "string" &&
    (record.role === "viewer" || record.role === "editor")
  );
}

function getDepth(value: unknown, depth = 0): number {
  if (!value || typeof value !== "object") return depth;

  const entries = Array.isArray(value) ? value : Object.values(value);
  return entries.reduce((max, entry) => Math.max(max, getDepth(entry, depth + 1)), depth);
}`}
            </pre>
          </div>
          <p className="mt-4">
            If you do not need raw body inspection, <code>await request.json()</code> is the standard Next.js path.
            For security reviews, the important part is not the helper you choose but whether size limits, strict
            validation, and ambiguous-input handling are explicit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span>Block Approval If You See Any Of These</span>
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>The code accepts non-standard JSON at a public trust boundary without a documented reason.</li>
            <li>Duplicate keys can change meaning, but the boundary never rejects or normalizes them explicitly.</li>
            <li>No request-size or structure-size limits exist for untrusted JSON.</li>
            <li>Validation only checks a few fields while silently allowing unexpected properties.</li>
            <li>Parsed objects are recursively merged into defaults, config, or auth context without key allowlists.</li>
            <li>Large integer handling is unspecified even though IDs or financial values require exactness.</li>
            <li>Raw parser errors or attacker-controlled payloads are exposed to clients or unsafe logs.</li>
            <li>The selected parser has weak maintenance signals or unresolved security advisories.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
