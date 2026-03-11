import type { Metadata } from "next";
import {
  AlertTriangle,
  Bot,
  CheckCircle,
  Code,
  FileJson,
  Search,
  ShieldAlert,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Assisted JSON Error Detection and Correction Guide | Offline Tools",
  description:
    "A practical guide to using AI for malformed JSON repair, schema-aware fixes, safer prompts, and validation-first workflows.",
};

export default function AiJsonErrorCorrectionArticle() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        AI-Assisted JSON Error Detection and Correction
        <Bot className="h-8 w-8 text-blue-600" />
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          AI can help repair malformed JSON, but it works best as a fallback layer instead of your first parser. For
          most real-world problems, the reliable order is: strict parsing, schema validation, deterministic cleanup,
          then AI suggestions for ambiguous cases that need human-style reasoning.
        </p>

        <p>
          That matters even more now. As of March 2026, major model APIs increasingly support schema-constrained
          outputs, so the best fix for AI-generated bad JSON is often preventing invalid output upstream and using AI
          repair only for dirty payloads you already have.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold">
            Quick Answer
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use a normal JSON parser first for syntax errors such as missing commas, braces, or quotes.</li>
            <li>Use schema validation next for required fields, wrong types, and unexpected keys.</li>
            <li>Use AI when the input is messy, mixed with prose, partially broken, or semantically ambiguous.</li>
            <li>Always re-parse and re-validate AI output before saving, executing, or sending it downstream.</li>
          </ul>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          What AI Actually Does Well
          <Search className="h-6 w-6 text-green-600" />
        </h2>

        <p>
          Plain validators usually stop at the first syntax failure. AI-assisted JSON error detection is useful when
          you need a fuller explanation, a best-effort repair plan, or help matching malformed data to the structure
          you expected.
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Translating parser failures into plain English:</strong> Instead of only reporting an unexpected
            token, AI can explain what probably broke and where the structure drifted.
          </li>
          <li>
            <strong>Finding multiple likely issues in one pass:</strong> Missing commas, bad booleans, trailing commas,
            and broken nesting often appear together.
          </li>
          <li>
            <strong>Comparing data against expected shape:</strong> AI can notice that a field looks like an email, ID,
            timestamp, or array item even when the syntax is damaged.
          </li>
          <li>
            <strong>Repairing JSON-like input:</strong> Copied JavaScript object literals, logs, or LLM output often
            contain comments, single quotes, or prose mixed into the payload.
          </li>
        </ul>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          What Changed In Current Workflows
          <FileJson className="h-6 w-6 text-purple-600" />
        </h2>

        <p>
          Current model APIs are better at prevention than older “please return JSON” prompting. OpenAI’s{" "}
          <a
            href="https://platform.openai.com/docs/guides/structured-outputs"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline underline-offset-4"
          >
            Structured Outputs
          </a>{" "}
          documentation distinguishes schema-matching structured output from older JSON mode, and Anthropic’s{" "}
          <a
            href="https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline underline-offset-4"
          >
            tool-use documentation
          </a>{" "}
          explicitly positions tools as a way to make the model return JSON that follows a provided schema. The
          practical takeaway is simple: if you control generation, constrain it at generation time. If you do not
          control the input, repair it conservatively and validate again.
        </p>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          Recommended Repair Pipeline
          <Wrench className="h-6 w-6 text-blue-600" />
        </h2>

        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong>Parse strictly first.</strong> Let a real JSON parser fail fast so you know whether you have a
            syntax problem or a data-quality problem.
          </li>
          <li>
            <strong>Validate against a schema.</strong> A JSON Schema or equivalent contract catches wrong types,
            missing required fields, and unexpected properties.
          </li>
          <li>
            <strong>Apply deterministic normalization only when it is explicitly allowed.</strong> If your pipeline
            accepts JSON5-like input, convert it intentionally. Do not silently guess around comments or single quotes
            in systems that require strict JSON.
          </li>
          <li>
            <strong>Ask AI for minimal edits, not free-form rewrites.</strong> Require a repair report, explicit
            assumptions, and a flag for human review when the payload looks truncated or ambiguous.
          </li>
          <li>
            <strong>Re-parse, re-validate, and diff.</strong> Treat AI output as untrusted until it passes the same
            checks as hand-written data.
          </li>
        </ol>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          Example: Error Detection And Minimal Repair
          <Code className="h-6 w-6 text-gray-600" />
        </h2>

        <p>Here is a small malformed payload that contains several common mistakes:</p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
          <pre>
            <code>
              {`{
  "userId": 42,
  "active": tru,
  "tags": ["alpha", "beta",],
  "profile": {
    "email": "ana@example.com"
    "plan": "pro"
  }
  "lastSeen": "2026-03-10T18:22:11Z"
}`}
            </code>
          </pre>
        </div>

        <p>
          A basic parser will stop early on <code>tru</code>. A stronger AI-assisted workflow can still summarize the
          whole error cluster before proposing a repair:
        </p>

        <div className="my-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200">
          <p className="flex items-center gap-2 font-bold">
            <AlertTriangle className="h-5 w-5" />
            Likely Issues
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <XCircle className="mr-2 inline h-4 w-4 text-red-600" />
              Invalid boolean token <code>tru</code>; likely intended value is <code>true</code>.
            </li>
            <li>
              <XCircle className="mr-2 inline h-4 w-4 text-red-600" />
              Trailing comma after <code>"beta"</code>; strict JSON does not allow it.
            </li>
            <li>
              <XCircle className="mr-2 inline h-4 w-4 text-red-600" />
              Missing comma after <code>"email"</code> field inside <code>profile</code>.
            </li>
            <li>
              <XCircle className="mr-2 inline h-4 w-4 text-red-600" />
              Missing comma after the closing <code>profile</code> object.
            </li>
          </ul>
          <p className="mt-4">
            <CheckCircle className="mr-2 inline h-4 w-4 text-green-600" />
            Minimal repair should change punctuation and the invalid boolean token, but should not rename fields or
            invent new values.
          </p>
        </div>

        <p>After review, the corrected JSON should look like this:</p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
          <pre>
            <code>
              {`{
  "userId": 42,
  "active": true,
  "tags": ["alpha", "beta"],
  "profile": {
    "email": "ana@example.com",
    "plan": "pro"
  },
  "lastSeen": "2026-03-10T18:22:11Z"
}`}
            </code>
          </pre>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          A Better Prompt Than “Fix This JSON”
          <Bot className="h-6 w-6 text-blue-600" />
        </h2>

        <p>
          If you do use AI, ask for a constrained repair report. That makes the output easier to validate and much
          easier to review.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
          <pre>
            <code>
              {`Repair the following malformed JSON with the smallest possible changes.

Return strict JSON with this shape:
{
  "correctedJson": "string",
  "issues": [
    { "path": "string", "problem": "string", "fix": "string" }
  ],
  "assumptions": ["string"],
  "needsHumanReview": true
}

Rules:
- Output strict JSON, not JSON5.
- Preserve field names and values unless a token is clearly invalid.
- Do not invent missing values.
- If the payload looks truncated or multiple repairs are plausible, set needsHumanReview to true.
- Keep fixes minimal and explain each one.`}
            </code>
          </pre>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          Conceptual Programmatic Flow
          <Code className="h-6 w-6 text-gray-600" />
        </h2>

        <p>
          In an application, the AI step should be surrounded by ordinary validation code rather than replacing it.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
          <pre>
            <code>
              {`async function parseOrRepairJson(input, validate, repairWithAi) {
  try {
    const parsed = JSON.parse(input);
    return validate(parsed)
      ? { ok: true, source: "parser", data: parsed }
      : { ok: false, stage: "schema", message: "Valid JSON, invalid shape" };
  } catch (parseError) {
    const repair = await repairWithAi(input);

    if (repair.needsHumanReview) {
      return { ok: false, stage: "review", issues: repair.issues };
    }

    const corrected = JSON.parse(repair.correctedJson);

    if (!validate(corrected)) {
      return { ok: false, stage: "schema", issues: repair.issues };
    }

    return { ok: true, source: "ai-repair", data: corrected, issues: repair.issues };
  }
}`}
            </code>
          </pre>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          When AI Makes Things Worse
          <ShieldAlert className="h-6 w-6 text-orange-600" />
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Duplicate keys:</strong> AI may quietly keep one value and discard another, even though the real
            issue is business ambiguity.
          </li>
          <li>
            <strong>Truncated payloads:</strong> If the document is cut off, the model may invent a plausible ending.
            That is repair theater, not reliable recovery.
          </li>
          <li>
            <strong>Type guessing:</strong> Converting <code>"42"</code> to <code>42</code> or <code>"false"</code> to{" "}
            <code>false</code> can be wrong if the original system treats those as strings.
          </li>
          <li>
            <strong>Sensitive data:</strong> Logs, tokens, personal data, or customer records should stay local unless
            you have an approved processing path.
          </li>
          <li>
            <strong>Upstream generation bugs:</strong> If an LLM keeps producing malformed JSON, fix the schema or tool
            contract upstream instead of normalizing bad output forever.
          </li>
        </ul>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/40">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Use A Formatter Or Validator First
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-base">
              <li>The problem is a straightforward syntax error.</li>
              <li>You need deterministic behavior in CI or production pipelines.</li>
              <li>The data is sensitive and should not leave the device or network boundary.</li>
              <li>You already know the exact schema and just need confirmation.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-900 dark:bg-yellow-950/40">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              Use AI When It Adds Real Value
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-base">
              <li>The payload is messy, mixed with prose, or copied from logs or chat output.</li>
              <li>You want a human-readable explanation of what likely broke.</li>
              <li>The parser error is too shallow to explain the full damage.</li>
              <li>You need candidate fixes mapped to an expected schema, followed by review.</li>
            </ul>
          </div>
        </div>

        <h2 className="mt-8 mb-4 flex items-center gap-2 text-2xl font-semibold">
          Conclusion
          <CheckCircle className="h-6 w-6 text-green-600" />
        </h2>

        <p>
          AI-assisted JSON error detection and correction is most useful when it sits inside a strict validation
          pipeline. Let parsers and schemas handle the deterministic work, use AI for explanation and conservative
          repair, and treat every AI fix as untrusted until it parses cleanly and passes your schema checks.
        </p>
      </div>
    </article>
  );
}
