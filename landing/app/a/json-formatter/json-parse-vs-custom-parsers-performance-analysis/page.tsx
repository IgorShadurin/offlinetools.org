import type { Metadata } from "next";
import {
  Activity,
  Binary,
  Bolt,
  CheckCheck,
  Code,
  Cpu,
  DatabaseZap,
  Filter,
  Layers,
  MemoryStick,
  Package,
  ScrollText,
  Timer,
  Workflow,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON.parse() vs. Custom Parsers: Performance Analysis | Offline Tools",
  description:
    "A practical performance guide to JSON.parse() vs streaming or custom parsers, including memory tradeoffs, reviver costs, and when a worker is the better fix.",
};

export default function JsonParserPerformanceArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <Activity className="h-8 w-8" /> JSON.parse() vs. Custom Parsers: Performance Analysis
      </h1>

      <div className="space-y-6">
        <p>
          If your goal is to turn a complete JSON string into a normal JavaScript object graph,
          <code className="font-mono"> JSON.parse()</code> is still the default winner. It is native, heavily
          optimized inside the engine, and extremely hard to beat with a parser written in JavaScript.
        </p>
        <p>
          The cases where a &quot;custom parser&quot; wins are usually different problems: processing a very large file
          without loading all of it at once, extracting only a few values, handling JSON as a stream, or supporting
          non-standard input. That is less about out-running <code className="font-mono">JSON.parse()</code> at the same
          job and more about changing the job to reduce blocking, memory pressure, or total work.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Bolt className="h-5 w-5" /> Short Answer
          </h2>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Need the whole payload as objects or arrays?</strong> Use{" "}
              <code className="font-mono">JSON.parse()</code>.
            </li>
            <li>
              <strong>Need the whole payload, but cannot block the UI or event loop?</strong> Keep{" "}
              <code className="font-mono">JSON.parse()</code> and move the work to a worker or worker thread.
            </li>
            <li>
              <strong>Need partial extraction, incremental processing, or multi-GB safety?</strong> Use a streaming or
              event-based parser instead of a full custom object-building parser.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Workflow className="h-6 w-6" /> What <code className="font-mono">JSON.parse()</code> Still Does Best
        </h2>
        <p>
          <code className="font-mono">JSON.parse(text[, reviver])</code> is strict, predictable, and optimized for the
          common case: take valid JSON and materialize the full JavaScript value tree immediately.
        </p>

        <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
          <CheckCheck className="h-5 w-5 text-green-500" /> Strengths
        </h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Fast for full parsing:</strong> If you need the whole document as normal JavaScript data, the
            built-in parser is almost always the fastest option available in that runtime.
          </li>
          <li>
            <strong>Spec compliance:</strong> It handles escape sequences, Unicode, numbers, booleans, arrays, objects,
            and syntax errors according to the JSON standard.
          </li>
          <li>
            <strong>Minimal application code:</strong> There is no parser state machine to maintain, debug, or audit.
          </li>
          <li>
            <strong>Good ergonomics:</strong> It integrates naturally with existing app logic, validation, and typing
            layers.
          </li>
        </ul>

        <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
          <X className="h-5 w-5 text-red-500" /> Costs
        </h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Synchronous:</strong> Large parses block the browser main thread or the Node.js event loop while the
            parse is happening.
          </li>
          <li>
            <strong>All-or-nothing:</strong> You must wait for the entire input to be present and syntactically valid.
          </li>
          <li>
            <strong>High peak memory for large payloads:</strong> You keep the original JSON text plus the resulting
            object graph alive during parsing.
          </li>
          <li>
            <strong>
              <code className="font-mono">reviver</code> adds work:
            </strong>{" "}
            the reviver runs after parsing and visits parsed values, so it can be useful, but it is not a shortcut
            around the cost of building the structure.
          </li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            <Code className="h-5 w-5" /> Practical Example: Recovering Large Integers with the Reviver Context
          </h3>
          <p className="mt-2">
            Current MDN documentation shows the reviver receiving a third <code className="font-mono">context</code>{" "}
            argument for primitive values. That lets you read the original source text when numeric precision matters.
          </p>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const payload = '{"id": 12345678901234567890}';

const data = JSON.parse(payload, (key, value, context) => {
  if (key === "id" && context) {
    return BigInt(context.source);
  }

  return value;
});

console.log(typeof data.id); // "bigint"`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This is useful for correctness, but it does not change the fundamental performance model: the payload is
            still parsed first, then the reviver runs.
          </p>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Binary className="h-6 w-6" /> What &quot;Custom Parser&quot; Usually Means in Real Systems
        </h2>
        <p>
          In performance discussions, a custom parser usually does <strong>not</strong> mean &quot;rewrite
          <code className="font-mono"> JSON.parse()</code> in JavaScript and hope it is faster.&quot; That almost never
          pays off if the end result is the same fully materialized object tree.
        </p>
        <p>
          It usually means one of these approaches instead:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Streaming parser:</strong> Consume the input chunk by chunk and emit tokens or events.
          </li>
          <li>
            <strong>Partial extractor:</strong> Read until the fields or records you care about are found, then ignore
            the rest.
          </li>
          <li>
            <strong>Specialized parser:</strong> Handle JSON-like or tolerant formats with custom validation rules.
          </li>
          <li>
            <strong>Line-oriented parsing:</strong> If the input is really JSON Lines or NDJSON, parse one record at a
            time instead of treating the whole file as one JSON document.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Cpu className="h-6 w-6" /> Performance Analysis by Scenario
        </h2>
        <p>
          The useful comparison is not &quot;native parser vs clever parser&quot; in the abstract. It is &quot;which
          approach does the least total work for the result I actually need?&quot;
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Scenario 1: Small or Medium API Responses</h3>
            <p className="mt-2">
              For ordinary API payloads, config blobs, cached application state, and most JSON files measured in KB or
              a few MB, <code className="font-mono">JSON.parse()</code> is the correct default. A custom parser adds
              complexity without giving you a useful performance return.
            </p>
            <p className="mt-2 flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" /> Recommendation: use{" "}
              <code className="font-mono">JSON.parse()</code>.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Scenario 2: Large Payload, Full Object Still Required</h3>
            <p className="mt-2">
              If you still need the entire parsed structure, a custom JavaScript parser usually does not improve total
              CPU time. The better move is to keep <code className="font-mono">JSON.parse()</code> and move that work
              off the main execution path with a browser worker or a Node.js worker thread.
            </p>
            <p className="mt-2">
              This does not make parsing free, but it protects responsiveness. The user interface can stay interactive,
              and a Node.js server can avoid stalling unrelated requests on the main thread.
            </p>
            <p className="mt-2 flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" /> Recommendation: keep{" "}
              <code className="font-mono">JSON.parse()</code>, change <em>where</em> it runs.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Scenario 3: Huge Files or Streams</h3>
            <p className="mt-2">
              Once the input gets large enough that buffering it all is uncomfortable, a streaming parser can win
              decisively on peak memory and operational safety. This is where custom parsing earns its keep.
            </p>
            <p className="mt-2">
              Even if the tokenization itself is not faster per byte, you avoid building and retaining an enormous
              object graph all at once. That often matters more than raw parser speed.
            </p>
            <p className="mt-2 flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" /> Recommendation: use a streaming parser or library.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Scenario 4: You Only Need a Fraction of the Data</h3>
            <p className="mt-2">
              If you only need a few fields from a large payload, parsing the entire document is wasted work.
              Event-based or token-based parsing can stop early, ignore unused branches, and keep much less data in
              memory.
            </p>
            <p className="mt-2 flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" /> Recommendation: use partial extraction instead of full
              parsing.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Scenario 5: Non-Standard or Tolerant Input</h3>
            <p className="mt-2">
              If the source is not strict JSON, the performance question is secondary. A custom parser may be necessary
              simply because <code className="font-mono">JSON.parse()</code> is required to reject invalid syntax.
            </p>
            <p className="mt-2 flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" /> Recommendation: use a specialized parser only when the
              format demands it.
            </p>
          </div>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Layers className="h-6 w-6" /> Why Streaming Can Win Even If It Is Slower Per Byte
        </h2>
        <p>
          This is the point many comparisons miss. A streaming parser may have slower token processing than the
          engine&apos;s native parser, yet still produce the better system-level result because it changes the memory and
          scheduling profile of the work.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Lower peak memory:</strong> You process chunks instead of holding the full source and full result at
            once.
          </li>
          <li>
            <strong>Less object creation:</strong> If you only keep a subset of the data, you skip allocations that
            <code className="font-mono"> JSON.parse()</code> must perform.
          </li>
          <li>
            <strong>Earlier useful work:</strong> Downstream processing can begin before the final byte arrives.
          </li>
          <li>
            <strong>Early exit:</strong> If the values you need appear near the start, you can stop before reading the
            rest.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ScrollText className="h-6 w-6" /> Realistic Streaming Example
        </h2>
        <p>
          In Node.js, libraries such as <code className="font-mono">stream-json</code> are useful when you want to pull
          records out of a huge JSON file without materializing everything.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`import fs from "node:fs";
import { chain } from "stream-chain";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick";
import { streamValues } from "stream-json/streamers/StreamValues";

const pipeline = chain([
  fs.createReadStream("large-report.json"),
  parser(),
  pick({ filter: "rows" }),
  streamValues(),
]);

pipeline.on("data", ({ value }) => {
  // Process each row incrementally.
  // No giant in-memory object graph required.
});

pipeline.on("end", () => {
  console.log("done");
});`}
            </pre>
          </div>
        </div>
        <p>
          This kind of approach is where custom or library-based parsing has a clear advantage. It solves a different
          operational problem than <code className="font-mono">JSON.parse()</code>.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <DatabaseZap className="h-6 w-6" /> Memory Reality Check
        </h2>
        <p>
          Peak memory usually decides the architecture before parser throughput does. If you parse a very large JSON
          string with <code className="font-mono">JSON.parse()</code>, you need room for the source text, parse
          bookkeeping, and the resulting objects. That can be fine for ordinary payloads and completely unacceptable for
          giant files.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            <MemoryStick className="h-5 w-5" /> Conceptual Memory Footprint
          </h3>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              <code className="font-mono">JSON.parse()</code>: best when the payload is reasonably sized and you really
              need the whole object graph.
            </li>
            <li>
              Streaming parser: best when the source is too large to hold comfortably or when only part of the data has
              long-term value.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Filter className="h-6 w-6" /> Library Choices Before &quot;Build It Yourself&quot;
        </h2>
        <p>
          If you need streaming behavior, reach for a library before writing a parser from scratch. Two common
          strategies are:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>
              <code className="font-mono">stream-json</code>
            </strong>
            : good when you want composable Node.js stream pipelines and selective extraction from large documents.
          </li>
          <li>
            <strong>
              <code className="font-mono">clarinet</code>
            </strong>
            : good when you want a lighter SAX-style event stream and are comfortable reconstructing state yourself.
          </li>
        </ul>
        <p>
          Writing a fully correct JSON tokenizer and parser is harder than it looks. Escapes, surrogate pairs, numeric
          edge cases, and error recovery are where hand-written parsers get expensive.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Timer className="h-6 w-6" /> Benchmark What Actually Matters
        </h2>
        <p>
          If performance is important, benchmark with representative inputs. Do not compare toy examples and assume the
          result will hold under production load.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Measure elapsed time for the full operation, not just tokenization.</li>
          <li>Measure peak memory, not only average memory.</li>
          <li>Test with and without a reviver if you use one.</li>
          <li>Separate &quot;main-thread responsiveness&quot; from &quot;total CPU consumed.&quot;</li>
          <li>Use the same payload shapes you actually ship: many small objects, a few huge arrays, deeply nested data,
            or mixed primitives can behave differently.</li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Package className="h-6 w-6" /> Conclusion: Which Should You Choose?
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Choose <code className="font-mono">JSON.parse()</code></strong> when you need the whole JSON
            document as JavaScript data and the payload is within reasonable memory limits.
          </li>
          <li>
            <strong>Choose a worker or worker thread</strong> when the real problem is responsiveness, not parser
            correctness or parser throughput.
          </li>
          <li>
            <strong>Choose a streaming or custom parser</strong> when the input is too large to buffer comfortably, when
            you only need part of it, or when the source is not strict JSON.
          </li>
        </ul>
        <p>
          The short version is simple: for full-document parsing, <code className="font-mono">JSON.parse()</code> is
          still the benchmark to beat. Custom parsers are valuable when they let you avoid full-document parsing in the
          first place.
        </p>
      </div>
    </>
  );
}
