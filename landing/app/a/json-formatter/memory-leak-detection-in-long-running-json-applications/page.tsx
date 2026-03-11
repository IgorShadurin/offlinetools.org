import type { Metadata } from "next";
import { MemoryStick, Bug, Search, CheckCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Memory Leak Detection in Long-Running JSON Applications",
  description:
    "Detect memory leaks in long-running JSON services with Node heap snapshots, process.memoryUsage(), Buffer checks, and safer parsing patterns.",
};

export default function MemoryLeakDetectionJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <MemoryStick className="mr-4 w-8 h-8 text-blue-500" />
        Memory Leak Detection in Long-Running JSON Applications
      </h1>

      <div className="space-y-6">
        <p>
          Long-running JSON services rarely fail because `JSON.parse()` is inherently unsafe. They fail because parsed
          payloads, raw request bodies, `Buffer`s, caches, and listener closures stay reachable longer than the team
          expects. In a server, worker, or daemon that runs for days, even a small retention bug per request becomes a
          real outage.
        </p>

        <p>
          The practical goal is to answer two questions quickly: <strong>which memory bucket is growing</strong> and{" "}
          <strong>what is retaining it</strong>. This guide focuses on Node.js applications that parse, validate,
          transform, cache, or forward JSON at high volume, because that is where leak diagnosis usually gets blurry.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-3 w-6 h-6 text-red-500" />
          Where JSON Workloads Leak in Practice
        </h2>
        <p>
          JSON is usually just the carrier. The leak comes from how the application keeps references to JSON-related
          data after the request, job, or stream should have been finished:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Retaining both the raw payload and the parsed object:</strong> body parsers often hold a request as
            a string or `Buffer`, then the app also stores the parsed object in a queue, retry record, or audit log.
            That doubles memory pressure immediately.
          </li>
          <li>
            <strong>Unbounded caches keyed by request-specific data:</strong> memoized validation results, schema
            lookups, or transformed payloads stored in plain `Map`s are a classic leak path in JSON APIs.
          </li>
          <li>
            <strong>Listener, timer, or closure retention:</strong> a long-lived callback captures a parsed payload or a
            service instance that points to it, so the object graph never becomes collectible.
          </li>
          <li>
            <strong>`Buffer` and typed-array growth:</strong> large HTTP bodies, compression, streaming adapters, and
            binary transforms frequently raise `external` or `arrayBuffers` memory even when the JavaScript heap looks
            mostly flat.
          </li>
          <li>
            <strong>Keeping too much error context:</strong> it is common to store entire bad payloads in dead-letter
            queues, validation error objects, and logs when a small excerpt or hash would have been enough.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-3 w-6 h-6 text-yellow-600" />
          First Identify Which Memory Bucket Is Growing
        </h2>
        <p>
          Start with `process.memoryUsage()` and track it during a repeatable workload. This is the fastest way to stop
          guessing. For JSON-heavy services, the distinction between V8 heap growth and `Buffer` growth matters a lot.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>`heapUsed` keeps rising:</strong> you are likely retaining JavaScript objects such as parsed JSON,
            arrays, strings, schema results, or closures that reference them.
          </li>
          <li>
            <strong>`external` and `arrayBuffers` climb faster than `heapUsed`:</strong> look for retained
            `Buffer`s, typed arrays, request-body copies, decompression buffers, or native modules. In Node&apos;s
            memory counters, `arrayBuffers` includes `Buffer` memory.
          </li>
          <li>
            <strong>`rss` rises while heap counters are flatter:</strong> that can still be real memory pressure. Check
            for `Buffer` retention first, then fragmentation, native add-ons, or libraries that allocate outside the JS
            heap.
          </li>
          <li>
            <strong>A stable sawtooth is normal:</strong> memory often rises between garbage-collection cycles and then
            falls. A leak shows up when the post-GC floor keeps drifting upward under the same workload.
          </li>
        </ul>
        <p>
          For a controlled test, warm the service up first, then run the same JSON workload in batches and log memory
          after each batch. In staging, many teams also run with `--expose-gc` and trigger `global.gc()` between
          batches so they can separate temporary pressure from truly retained memory.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <h3 className="text-lg font-medium mb-2">Example: Log the Right Counters</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function logMemory(label: string) {
  const memory = process.memoryUsage();
  const toMB = (value: number) => (value / 1024 / 1024).toFixed(1);

  console.log(JSON.stringify({
    label,
    rssMB: toMB(memory.rss),
    heapUsedMB: toMB(memory.heapUsed),
    heapTotalMB: toMB(memory.heapTotal),
    externalMB: toMB(memory.external),
    arrayBuffersMB: toMB(memory.arrayBuffers),
  }));
}

async function runBatch(batchNumber: number, payloads: string[]) {
  for (const payload of payloads) {
    const parsed = JSON.parse(payload);
    // validateTransformAndSend(parsed);
  }

  logMemory(\`after-batch-\${batchNumber}\`);
}

// Compare these numbers after the same workload repeats.
// If heapUsed settles but arrayBuffers keeps growing,
// your leak is probably not just plain JS objects.`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-3 w-6 h-6 text-green-600" />
          Leak-Hunting Workflow for Long-Running JSON Services
        </h2>
        <h3 className="text-xl font-semibold mt-6">1. Reproduce the Growth Under a Repeatable Workload</h3>
        <p>
          Use the same payload shapes and sizes each run. Warm up the application first so one-time allocations do not
          confuse the result. A leak diagnosis is much easier when each batch does the same amount of JSON parsing,
          validation, caching, and response serialization.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Capture Before/After Heap Snapshots</h3>
        <p>
          Heap snapshots remain the most direct way to find what is being retained. On current Node.js releases you can
          still use `--inspect`, but you also have practical server-side options such as
          `--heapsnapshot-signal=SIGUSR2` or `writeHeapSnapshot()` from `node:v8`.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Take one snapshot after warm-up, run only the suspect JSON workflow for a while, then take a second
            snapshot and compare them.
          </li>
          <li>
            In Chrome DevTools&apos; Memory panel, load the newer snapshot and switch to <strong>Comparison</strong> view
            so growth stands out as object-count and size deltas.
          </li>
          <li>
            Snapshot capture pauses the main thread and can temporarily consume enough memory to crash the process, so
            do this on a staging box, canary, or disposable replica rather than your only production instance.
          </li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <h3 className="text-lg font-medium mb-2">Current Snapshot Options in Node.js</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`# Local debugging with DevTools
node --inspect service.js

# Write a heap snapshot from a running process when it receives SIGUSR2
node --heapsnapshot-signal=SIGUSR2 service.js
kill -USR2 <pid>`}</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Use Allocation Sampling When the Leak Source Is Still Fuzzy</h3>
        <p>
          Comparison view tells you <em>what stayed alive</em>. Allocation sampling helps you find <em>where growth is
          coming from</em> when the snapshot mostly shows generic `Object`, `Array`, or string entries. This is useful
          for JSON validation pipelines that allocate heavily across helper functions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-3 w-6 h-6 text-blue-600" />
          Fixes That Actually Remove Leaks
        </h2>
        <p>Once you know what is growing, the fixes are usually straightforward and boring. That is a good sign.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stop keeping two copies of the same data:</strong> once you have parsed and validated a body, avoid
            retaining the original raw string or `Buffer` unless you truly need it for replay.
          </li>
          <li>
            <strong>Bound caches by size and lifetime:</strong> a cache limited only by entry count is risky if some
            JSON documents are huge. Prefer LRU or TTL eviction and size-aware limits when the payload size varies.
          </li>
          <li>
            <strong>Detach listeners and clear timers:</strong> long-lived emitters, intervals, and retry loops often
            pin entire processor instances.
          </li>
          <li>
            <strong>Stream or chunk large inputs:</strong> if the workload is large exports, imports, or analytics
            feeds, avoid building the whole document in memory if a streaming parser or NDJSON format will do.
          </li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <h3 className="text-lg font-medium mb-2">Example: Correct Listener Cleanup</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`class MessageProcessor {
  private readonly onMessage: (message: { id: string; data: string }) => void;
  private latestParsedJson: unknown = null;
  private queue: any;

  constructor(queue: any) {
    this.queue = queue;
    this.onMessage = this.handleMessage.bind(this);
    this.queue.on("message", this.onMessage);
  }

  private handleMessage(message: { id: string; data: string }) {
    if (message.id === "store_this") {
      this.latestParsedJson = JSON.parse(message.data);
    }

    // Process message.data...
  }

  dispose() {
    this.queue.off("message", this.onMessage);
    this.latestParsedJson = null;
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Practical Prevention Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Log `heapUsed`, `external`, `arrayBuffers`, and `rss` together instead of only watching one number.</li>
          <li>Load-test with a fixed JSON workload and compare the post-GC floor between batches or over time.</li>
          <li>Store truncated payload excerpts, IDs, or hashes in logs instead of full request bodies by default.</li>
          <li>Put explicit bounds on caches, retry queues, dead-letter queues, and in-memory deduplication maps.</li>
          <li>Review code that keeps parsed payloads in closures, singleton services, background jobs, or event listeners.</li>
          <li>For very large documents, redesign around streaming rather than hoping the garbage collector saves you.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Effective memory leak detection in JSON applications is mostly disciplined triage. First identify whether the
          heap, `Buffer` memory, or overall RSS is growing. Then reproduce the issue under a steady workload, compare
          heap snapshots, and remove the retention path with tighter cache bounds, better cleanup, and less duplicate
          payload storage. That workflow is far more reliable than guessing from a single graph in production.
        </p>
      </div>
    </>
  );
}
