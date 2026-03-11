import type { Metadata } from "next";
import { AlertTriangle, Bug, Code, Database, Lock, Shield, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Memory Safety in JSON Formatter Implementations: Practical Guide | Offline Tools",
  description:
    "A practical guide to memory safety in JSON formatter implementations, covering size limits, worker isolation, streaming, and native-code hardening.",
};

export default function MemorySafetyJsonFormatterArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <Database className="mr-3 text-blue-500" size={32} /> Memory Safety in JSON Formatter Implementations
      </h1>

      <div className="space-y-6">
        <p>
          If someone searches for memory safety in a JSON formatter, they usually want a practical answer:{" "}
          <strong>what can actually go wrong when untrusted JSON hits a formatter, parser, or pretty-printer?</strong>{" "}
          In modern JavaScript and browser-based tools, the biggest risks are usually not classic buffer overflows.
          They are memory spikes, frozen tabs, blocked event loops, and denial-of-service conditions caused by large or
          hostile input. In native or WebAssembly-backed formatters, classic memory-corruption bugs can still matter.
        </p>

        <p>
          That distinction is important. A formatter often keeps more than one copy of the same data alive at once: the
          original text, the parsed object graph, the pretty-printed output, and sometimes a syntax-highlighted tree for
          the UI. A payload that looks manageable on disk can therefore produce a much larger transient memory footprint
          in the formatter itself.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="text-sm leading-6">
            <strong>Short version:</strong> in pure JS/TS, memory safety mostly means keeping parsing and formatting{" "}
            <strong>bounded, isolated, and interruptible</strong>. In native or WASM implementations, it also means
            preventing real memory-corruption bugs through safer languages, fuzzing, and runtime hardening.
          </p>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Lock className="mr-3 text-green-500" /> What Memory Safety Means for a JSON Formatter
        </h2>
        <p>A robust formatter should protect against four separate failure modes:</p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Unbounded RAM use:</strong> large inputs, duplicated buffers, and fully materialized parse trees can
            exhaust memory or trigger OOM failures.
          </li>
          <li>
            <strong>Call-stack or recursion problems:</strong> deeply nested arrays and objects can still break
            recursive parsers or tree-rendering logic.
          </li>
          <li>
            <strong>Main-thread or event-loop blocking:</strong> even when memory is not exhausted, synchronous parsing
            can freeze a browser UI or stall a Node.js service.
          </li>
          <li>
            <strong>Native memory-corruption bugs:</strong> these are mainly relevant when the formatter depends on
            C/C++ extensions, custom parsers, or WASM modules with unsafe internals.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <AlertTriangle className="mr-3 text-red-500" /> Where Implementations Commonly Fail
        </h2>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Database className="mr-2 text-orange-500" /> Full-Buffer Parsing Creates Hidden Multipliers
        </h3>
        <p>
          The most common design is still `JSON.parse(input)` followed by `JSON.stringify(value, null, 2)`. That is
          fine for small trusted payloads, but it scales poorly for untrusted or arbitrarily large inputs because the
          formatter may temporarily hold several versions of the data in memory. Pretty-printing also expands the output
          by adding whitespace and line breaks.
        </p>
        <p>
          This is one reason users experience a formatter as &quot;unsafe&quot; even when there is no exploit. The page
          locks up, the process is killed, or the browser tab becomes unresponsive.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Workflow className="mr-2 text-yellow-600" /> Deep Nesting Breaks Parsers and Tree Views
        </h3>
        <p>
          Many JSON parsers and UI renderers still use recursion somewhere in the pipeline. Extremely deep nesting can
          blow the call stack, trigger depth guards, or create a UI tree that is expensive to render and expand. The
          parser may succeed while the formatter UI still fails when it tries to visualize the result.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Code className="mr-2 text-cyan-600" /> Synchronous JSON Work Still Blocks Modern Runtimes
        </h3>
        <p>
          This is not just theory. Node.js&apos;s official guidance on avoiding event-loop blocking explicitly calls out{" "}
          <a
            href="https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
            className="text-blue-600 underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            JSON operations as a notable exception
          </a>{" "}
          to the usual &quot;V8 is fast&quot; rule. If your formatter runs on the main thread in a browser, the same
          problem shows up as jank or a frozen tab.
        </p>
        <p>
          For an offline browser formatter, this is usually the real risk profile in 2026: privacy is better because
          the data stays local, but large or adversarial input can still consume enough CPU and memory to degrade the
          session.
        </p>

        <h3 className="mt-6 flex items-center text-xl font-semibold">
          <Bug className="mr-2 text-gray-500" /> Native and WASM Paths Need Extra Scrutiny
        </h3>
        <p>
          If the formatter uses a native parser, a C/C++ addon, or a WASM port of a native library, you have a second
          category of risk: buffer overflows, out-of-bounds reads and writes, use-after-free, and integer-overflow bugs
          in the implementation itself. These are the cases where &quot;memory safety&quot; means more than resource
          exhaustion.
        </p>
        <p>
          WASM reduces some classes of host compromise, but it does not remove denial-of-service problems. A hostile
          input can still force heavy allocation, trap the module, or stall the UI if the host runs it synchronously.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Shield className="mr-3 text-indigo-500" /> Current Guardrails That Matter
        </h2>
        <p>
          The safest JSON formatter implementations use a few simple controls consistently instead of relying on one
          &quot;secure parser&quot; claim.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Reject oversized input before parsing:</strong> cap request-body size, file size, and record count
            early. OWASP&apos;s{" "}
            <a
              href="https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
              className="text-blue-600 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              API Security Top 10 2023
            </a>{" "}
            treats missing resource limits as an API4 issue because they enable resource-consumption attacks.
          </li>
          <li>
            <strong>Move expensive work off the main execution path:</strong> use Web Workers in the browser or worker
            threads/background jobs on the server so one large JSON payload cannot freeze the interface or stall every
            request.
          </li>
          <li>
            <strong>Prefer streaming or incremental parsing when size is unbounded:</strong> full materialization is
            the wrong default for logs, exports, or multi-megabyte API responses.
          </li>
          <li>
            <strong>Set explicit depth and token limits:</strong> size limits alone do not stop deeply nested but still
            relatively small documents.
          </li>
          <li>
            <strong>Avoid regex-based &quot;JSON parsers&quot;:</strong> JSON is not a safe format to parse with a few
            regular expressions, and regex-heavy validators can introduce catastrophic backtracking problems.
          </li>
          <li>
            <strong>Harden native code paths:</strong> prefer memory-safe implementation languages where possible, and
            otherwise require fuzzing, sanitizers, bounds checks, and dependency patching.
          </li>
          <li>
            <strong>Fail closed with clear errors:</strong> report &quot;input too large&quot;, &quot;nesting too
            deep&quot;, or &quot;formatting timed out&quot; instead of crashing or spinning forever.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Workflow className="mr-3 text-blue-500" /> Choosing the Right Architecture
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Small, trusted payloads:</strong> `JSON.parse` and `JSON.stringify` are usually fine.
          </li>
          <li>
            <strong>Untrusted web input:</strong> enforce byte limits before parsing and isolate work from the main
            request or UI thread.
          </li>
          <li>
            <strong>Large files or exports:</strong> use streaming, chunked processing, or a tool designed for large
            documents instead of a DOM-style parse-and-render flow.
          </li>
          <li>
            <strong>Security-sensitive native tooling:</strong> use mature libraries, continuous fuzzing, and compiler
            hardening instead of hand-rolled parsers.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-3 text-cyan-600" /> Minimal Hardened Baseline
        </h2>
        <p>
          For a typical browser or Node.js formatter, a reasonable minimum is: validate size first, parse in an
          isolated worker when input is user-controlled, and only pretty-print once the input passes those checks.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            {`const MAX_BYTES = 1_000_000;

export function formatJsonSafely(input: string) {
  const bytes = new TextEncoder().encode(input).byteLength;

  if (bytes > MAX_BYTES) {
    throw new Error("Input too large to format safely");
  }

  let value: unknown;
  try {
    value = JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON");
  }

  return JSON.stringify(value, null, 2);
}`}
          </pre>
        </div>
        <p>
          This is only a baseline. It does not solve very deep nesting, worker isolation, cancellation, or huge-file
          handling. Those need architecture decisions, not just a helper function.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Lock className="mr-3 text-blue-500" /> Conclusion
        </h2>
        <p>
          A memory-safe JSON formatter is not simply one that avoids classic C-style bugs. In most web tooling, it is
          one that keeps parsing and formatting within predictable resource bounds, avoids blocking critical execution
          paths, and degrades safely when the input is too large or too complex.
        </p>
        <p>
          If your implementation touches native code, raise the bar further: safer languages, mature parser libraries,
          fuzzing, sanitizers, and aggressive input limits are what turn JSON formatting from &quot;works on normal
          files&quot; into something resilient against hostile input.
        </p>
      </div>
    </>
  );
}
