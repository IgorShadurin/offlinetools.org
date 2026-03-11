import type { Metadata } from "next";
import {
  Gauge,
  Watch,
  Cpu,
  MemoryStick,
  Zap,
  Flame,
  Maximize,
  Minimize,
  Settings,
  CloudDownload,
  Package,
  Code,
  SlidersHorizontal,
  ScrollText,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Parse Time Optimization Techniques",
  description:
    "Practical JSON parse optimization techniques for browsers and Node.js: reduce payload size, avoid expensive revivers, offload CPU-bound parsing to workers, and benchmark correctly.",
};

export default function JsonParseOptimizationPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Gauge className="w-8 h-8" /> JSON Parse Time Optimization Techniques
      </h1>

      <div className="space-y-8">
        <p className="text-lg">
          Most JSON performance problems are not fixed by swapping out `JSON.parse()`. In modern browsers and Node.js,
          the built-in parser is native and usually the fastest baseline for complete JSON documents. The biggest gains
          usually come from sending less JSON, avoiding expensive reviver logic, moving large parses off the main
          thread, and choosing a format that matches how you actually consume the data.{" "}
          <Watch className="inline-block w-5 h-5" />
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
          <p className="font-semibold">Quick answer</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Start with plain `JSON.parse(text)` and benchmark before adding libraries.</li>
            <li>Reduce payload size first; bytes and object count usually drive the cost.</li>
            <li>Move large parses off the browser main thread or Node.js event loop when responsiveness matters.</li>
            <li>Use streaming or NDJSON when you do not actually need one giant in-memory object.</li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Flame className="w-6 h-6" /> What Actually Makes JSON Parsing Slow
          </h2>
          <p>
            The parser itself is only part of the story. In real apps, total cost usually comes from a combination of
            input size, object allocation, follow-up transformation, and thread blocking.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>More bytes means more work:</strong> large strings take longer to download, decode, tokenize, and
              allocate into objects. <CloudDownload className="inline-block w-4 h-4" />
            </li>
            <li>
              <strong>More objects means more memory pressure:</strong> huge arrays and deeply nested structures create
              a lot of allocations, which can trigger extra garbage collection.{" "}
              <MemoryStick className="inline-block w-4 h-4" />
            </li>
            <li>
              <strong>Revivers are on the hot path:</strong> a `reviver` function runs depth-first for every parsed
              value, so heavy cleanup or validation inside it can dominate total parse time.{" "}
              <Cpu className="inline-block w-4 h-4" />
            </li>
            <li>
              <strong>`JSON.parse()` is synchronous:</strong> on a browser main thread it can block input and painting,
              and in Node.js it can monopolize the event loop for large payloads.{" "}
              <Maximize className="inline-block w-4 h-4" />
            </li>
            <li>
              <strong>“Parse time” is often mixed with other work:</strong> `response.json()` includes body reading and
              parsing, and many profiles blame parsing when the real bottleneck is normalization or rendering after the
              parse.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6" /> Optimization Techniques That Usually Matter
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <ScrollText className="w-5 h-5" /> 1. Send Less JSON
          </h3>
          <p>
            The highest-leverage fix is often outside the parser. If you can reduce the number of bytes or records, you
            usually reduce network time, parse time, memory use, and downstream processing all at once.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Remove fields the client never reads.</li>
            <li>Paginate or window large collections instead of returning everything in one response.</li>
            <li>
              If you control both ends, consider shorter repeated keys only for extremely large, repetitive payloads.
              Clarity is usually more valuable than shaving a few characters.
            </li>
            <li>
              Use HTTP compression such as Brotli or Gzip to improve transfer time, but remember that compression helps
              end-to-end latency more than raw parse CPU.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Code className="w-5 h-5" /> 2. Keep the Parse Step Simple
          </h3>
          <p>
            Prefer plain `JSON.parse(text)` unless you have a specific transformation that truly must happen during
            revival. Moving complex normalization into a second step is often faster and easier to profile.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Do schema validation after parse, or only on the branches you actually use.</li>
            <li>Avoid date parsing, number coercion, and object reshaping for every field inside a reviver.</li>
            <li>
              Use a targeted reviver when you need exact reconstruction of a few values, such as a large integer that
              would otherwise lose precision.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code>
                {`const payload = '{"gross_gdp":12345678901234567890,"country":"Example"}';

const parsed = JSON.parse(payload, (key, value, context) => {
  if (key === "gross_gdp") {
    return BigInt(context.source);
  }

  return value;
});`}
              </code>
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Modern runtimes expose `context.source` for primitive values in the reviver, which is useful for
            precision-sensitive fields. Keep the callback narrow, because it still runs for every parsed value.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5" /> 3. Offload Large Parses to Workers
          </h3>
          <p>
            If the problem is responsiveness rather than raw elapsed time, move the parse off the main execution
            thread. In browsers that means a Web Worker. In Node.js that means `node:worker_threads` for CPU-bound
            work.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              This keeps the UI responsive in the browser and keeps the event loop available in Node.js while the parse
              runs elsewhere.
            </li>
            <li>
              Use a worker pool for repeated server-side jobs. Spawning a fresh Node worker for every parse can cost
              more than it saves.
            </li>
            <li>
              Offloading does not automatically reduce total work. If you parse a huge object in a worker and then post
              the whole object back, structured cloning can become the next bottleneck.
            </li>
          </ul>
          <p className="mt-3">
            The best worker pattern is usually: parse in the worker, do the heavy aggregation there, and send back a
            smaller result that the main thread can render immediately.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> 4. Stream When You Do Not Need One Giant Object
          </h3>
          <p>
            Standard `JSON.parse()` only returns when the entire JSON text has been read and parsed. If your workload
            is naturally record-oriented, a single monolithic JSON document can force unnecessary waiting and memory
            use.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Prefer paginated APIs when users view data in chunks anyway.</li>
            <li>If you control the format, NDJSON or JSON Lines is usually easier to process incrementally than one huge array.</li>
            <li>
              On the server, streaming parsers are useful when you must process very large feeds without materializing
              the full document in memory.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Rocket className="w-5 h-5" /> 5. Avoid Re-Parsing the Same Data
          </h3>
          <p>
            Repeated parse and stringify cycles quietly add up. If the payload has not changed, reuse the parsed result
            instead of rebuilding it.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Cache parsed data behind an ETag, version, or memoized request key.</li>
            <li>Do not use `JSON.parse(JSON.stringify(value))` as a hot-path deep clone.</li>
            <li>
              Keep data in an already-parsed shape between UI updates when possible instead of serializing and parsing
              again between layers.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" /> 6. Change Formats Only After You Measure
          </h3>
          <p>
            If JSON is still the confirmed bottleneck, alternative formats such as MessagePack or Protocol Buffers can
            reduce size and decode cost. They also add schema, tooling, debugging, and interoperability overhead.
          </p>
          <p className="mt-2">
            Change the format only when benchmarks with your real payloads show a clear win and you control enough of
            the producer/consumer stack to absorb the complexity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Gauge className="w-6 h-6" /> Benchmark the Right Thing
          </h2>
          <p>
            Measure parse cost separately from fetch, decompression, validation, and rendering. Otherwise you will
            optimize the wrong step.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code>
                {`const response = await fetch("/api/report");
const jsonText = await response.text();

const parseStart = performance.now();
const data = JSON.parse(jsonText);
const parseMs = performance.now() - parseStart;

const normalizeStart = performance.now();
const rows = normalizeRows(data.items);
const normalizeMs = performance.now() - normalizeStart;

console.table({
  bytes: jsonText.length,
  parseMs,
  normalizeMs,
});`}
              </code>
            </pre>
          </div>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              Test with realistic payload sizes, not tiny fixtures that hide allocation and GC costs.{" "}
              <Watch className="inline-block w-4 h-4" />
            </li>
            <li>
              Track percentiles as well as averages, because occasional huge responses are often what users actually
              feel.
            </li>
            <li>
              In browsers, pay attention to long tasks and input delay. In Node.js, watch event loop stalls and memory
              spikes. <Minimize className="inline-block w-4 h-4" />
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6" /> Symptom-to-Fix Guide
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-3 font-semibold">If you see this</th>
                  <th className="text-left p-3 font-semibold">Try this first</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">`response.json()` freezes the UI on large responses</td>
                  <td className="p-3">Reduce payload size or move parsing and follow-up processing into a Web Worker</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">Node.js requests pause while a large payload is decoded</td>
                  <td className="p-3">Use `worker_threads` for CPU-bound parsing and reuse a worker pool</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">Memory spikes or out-of-memory errors on huge files</td>
                  <td className="p-3">Stream records, paginate, or switch to NDJSON instead of one giant document</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">Large integers lose precision after parsing</td>
                  <td className="p-3">Use a targeted reviver and reconstruct from `context.source`</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">A new parser library barely helps</td>
                  <td className="p-3">Profile downstream validation, reshaping, and rendering instead of the parser</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" /> Common Mistakes to Avoid
          </h2>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Assuming a third-party parser will beat native `JSON.parse()` without benchmarking on real data.</li>
            <li>Using a reviver to perform full validation and normalization for every field in a large payload.</li>
            <li>Counting network and rendering time as “parse time,” then tuning the wrong part of the request.</li>
            <li>Offloading parsing to a worker but immediately cloning a massive result back to the main thread.</li>
            <li>Keeping a single giant JSON endpoint when users only need one page or one slice of the data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Rocket className="w-6 h-6" /> Conclusion
          </h2>
          <p>
            The fastest practical JSON optimization is usually not “find a faster parser.” It is reducing the amount of
            JSON you send, keeping `JSON.parse()` simple, and moving heavyweight work off latency-sensitive threads when
            necessary.
          </p>
          <p className="mt-2">
            If you benchmark carefully and the parser is still the bottleneck, then consider streaming formats or a
            different serialization format. Until then, treat native `JSON.parse()` as the baseline and optimize the
            system around it.
          </p>
        </section>
      </div>
    </>
  );
}
