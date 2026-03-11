import type { Metadata } from "next";
import {
  AlertCircle,
  Clock,
  Code,
  MemoryStick,
  Microscope,
  ScrollText,
  Target,
  Zap,
  Bug,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Parser Tracing and Profiling Techniques | Offline Tools",
  description:
    "Practical JSON parser tracing and profiling for JavaScript and Node.js, including structured trace events, performance.mark(), Chrome DevTools, and node --cpu-prof.",
};

export default function JsonParserTracingProfilingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Parser Tracing and Profiling Techniques</h1>

      <div className="space-y-6">
        <p>
          If you came here looking for JSON tracing, the practical goal is simple: see what the parser was doing at the
          moment it failed or slowed down. In real projects that usually means combining a lightweight parser trace with
          real timing data and a CPU profile, not just scattering <code>console.log()</code> calls through the code.
        </p>
        <p>
          That distinction matters because many &quot;JSON parsing&quot; issues are not parser issues at all. Time can be
          spent reading bytes, decoding text, parsing, validating the result, normalizing fields, or mapping the parsed
          object into app-specific structures. If you do not separate those phases, you can easily optimize the wrong
          thing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Microscope className="w-6 h-6" />
          What to Capture in a JSON Trace
        </h2>
        <p>
          A useful trace is small, structured, and tied to exact parser state. For a custom parser, that means logging
          parser rules and token boundaries. For built-in <code>JSON.parse()</code>, you normally trace the code around
          the parse call because the native parser internals are not exposed as JavaScript frames.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Input position: character offset, and line or column if you surface syntax errors to users.</li>
          <li>Current rule or phase: tokenization, parseObject, parseArray, parseValue, validation, transform.</li>
          <li>Nesting depth and parent container so deep-object failures are obvious.</li>
          <li>Token or lookahead type rather than the full raw value when payloads are large or sensitive.</li>
          <li>Timestamp or sequence number so the trace can be aligned with a profile later.</li>
        </ul>
        <p>
          Do not dump the full parsed value by default. Logging large strings and objects changes the workload you are
          trying to measure and can leak private data into traces.
        </p>

        <h3 className="text-xl font-semibold mt-6">Structured tracing beats console spam</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Code className="w-5 h-5" />
            Minimal trace event model
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`type TraceEvent = {
  phase: "enter" | "exit" | "token" | "error";
  rule: string;
  offset: number;
  depth: number;
  token?: string;
  note?: string;
  t: number;
};

const trace: TraceEvent[] = [];

function pushTrace(event: Omit<TraceEvent, "t">) {
  if (!process.env.JSON_TRACE) return;
  trace.push({ ...event, t: performance.now() });
}

class Parser {
  parseValue() {
    pushTrace({
      phase: "enter",
      rule: "parseValue",
      offset: this.pos,
      depth: this.depth,
      token: this.peek().type,
    });

    // ... parse current token ...

    pushTrace({
      phase: "exit",
      rule: "parseValue",
      offset: this.pos,
      depth: this.depth,
    });
  }
}
`}
            </pre>
          </div>
          <p className="mt-4">
            Keep tracing behind a flag and prefer a ring buffer or sampling when the input can be large. A short,
            sortable event stream is far more useful than thousands of ad-hoc log lines.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug className="w-6 h-6" />
          Debugging a Single Failing Payload
        </h2>
        <p>
          If one JSON document fails and the others work, start with correctness before performance. Reproduce the exact
          failure with a saved payload, then capture enough parser state to explain the error.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Persist the original bytes or string so retries are identical.</li>
          <li>Log the last successful token and the next small slice of input around the failure offset.</li>
          <li>Include depth, current rule, and expected token in the error path.</li>
          <li>Minimize the payload after you reproduce the failure so the trace stays readable.</li>
        </ul>
        <p>
          This gives you a much faster route to the root cause than opening a profiler too early.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Measure Parse Cost with High-Resolution Timers
        </h2>
        <p>
          For a quick spot check, <code>console.time()</code> is fine. For repeatable work, use{" "}
          <code>performance.mark()</code> and <code>performance.measure()</code> so the results can be inspected in
          tooling instead of copied out of logs. In browsers, those marks appear on the Timings track in Chrome
          DevTools. In Node.js, the same API is available via{" "}
          <a
            href="https://nodejs.org/api/perf_hooks.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            <code>node:perf_hooks</code>
          </a>
          .
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Measure parse-only time in Node.js
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import { performance, PerformanceObserver } from "node:perf_hooks";

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntriesByType("measure")) {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)} ms\`);
  }
});

observer.observe({ entryTypes: ["measure"] });

export function parseJson(text: string) {
  performance.mark("json-parse:start", { detail: { bytes: text.length } });
  const value = JSON.parse(text);
  performance.mark("json-parse:end");
  performance.measure("json-parse", "json-parse:start", "json-parse:end");
  performance.clearMarks("json-parse:start");
  performance.clearMarks("json-parse:end");
  return value;
}
`}
            </pre>
          </div>
          <p className="mt-4">
            Once parse time is isolated, add separate marks for validation, coercion, or downstream transforms. That is
            often where the real hotspot turns up.
          </p>
        </div>

        <p>
          If your parser pipeline is split across helpers, wrapping selected functions with Node&apos;s{" "}
          <code>performance.timerify()</code> can be cleaner than hand-writing timers around every call site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Use a CPU Profile When Logs Stop Being Useful
        </h2>
        <p>
          Timing tells you how long a phase took. A CPU profile tells you where the time went. That distinction matters
          because <code>JSON.parse()</code> itself is native code, so flame charts often show the parse boundary plus
          the JavaScript work right before or after it.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">In Chrome DevTools:</span> record a Performance trace, then inspect the Main
            track, Call tree, and Bottom-up views. Your custom <code>performance.mark()</code> and{" "}
            <code>performance.measure()</code> entries show up on the Timings track, which makes it much easier to
            align code-level phases with actual CPU work.
          </li>
          <li>
            <span className="font-medium">In Node.js:</span> current Node documentation marks{" "}
            <code>--cpu-prof</code> and the related output flags as stable starting in v20.16.0 and v22.4.0, which
            makes them the clean default for app-level CPU profiling.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Code className="w-5 h-5" />
            Current Node.js CPU profile workflow
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`node --cpu-prof --cpu-prof-name 'json-parse.cpuprofile' script.mjs`}</pre>
          </div>
          <p className="mt-4">
            Open the generated <code>.cpuprofile</code> in Chrome DevTools or another compatible viewer. If the trace
            is noisy, use DevTools ignore-list features to collapse framework or third-party scripts and keep the focus
            on your parser path.
          </p>
        </div>

        <p>
          Useful references:{" "}
          <a
            href="https://nodejs.org/api/cli.html#--cpu-prof"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Node.js CLI profiling flags
          </a>{" "}
          and{" "}
          <a
            href="https://developer.chrome.com/docs/devtools/performance/reference/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Chrome DevTools Performance reference
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <MemoryStick className="w-6 h-6" />
          Large Payload and Memory Checks
        </h2>
        <p>
          Large JSON payloads are often limited by allocation pressure rather than pure parser CPU time. When the input
          is big, track memory separately from time.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Record payload size in bytes alongside every timing measurement.</li>
          <li>Benchmark parse-only and parse-plus-transform separately.</li>
          <li>Watch for many small parses that trigger frequent minor garbage collection.</li>
          <li>For streaming or chunked workflows, trace chunk boundaries and partial object assembly explicitly.</li>
        </ul>
        <p>
          If retained memory keeps growing after parsing finishes, switch from CPU profiling to heap investigation.
          Otherwise you can waste time optimizing parse code that is not the leak.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Common Mistakes That Create Bad Data
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Tracing every token in production:</span> the logging overhead can be larger
            than the parser cost you are trying to measure.
          </li>
          <li>
            <span className="font-medium">Mixing I/O with parse time:</span> decompression, file reads, network waits,
            and UTF-8 decoding should be separated unless that broader pipeline is the thing you are measuring.
          </li>
          <li>
            <span className="font-medium">Comparing unlike payloads:</span> depth, key length, escape sequences, and
            array widths all change the cost profile.
          </li>
          <li>
            <span className="font-medium">Optimizing the wrong phase:</span> many slow &quot;JSON parsing&quot; reports
            are really validation, coercion, or object-mapping problems.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ScrollText className="w-6 h-6" />
          Practical Checklist
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Reproduce with a saved payload instead of live traffic.</li>
            <li>Warm up once, then measure multiple runs.</li>
            <li>Mark parse, validate, and transform as separate phases.</li>
            <li>Capture one CPU profile for the slow case and one for a normal case.</li>
            <li>Keep detailed parser traces only for failing or suspicious inputs.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Use tracing when you need correctness: unexpected tokens, wrong nesting, or one payload that breaks the
          parser. Use profiling when parsing succeeds but is too slow or memory-heavy. In most real investigations you
          need both: tracing explains the path, profiling explains the cost.
        </p>
      </div>
    </>
  );
}
