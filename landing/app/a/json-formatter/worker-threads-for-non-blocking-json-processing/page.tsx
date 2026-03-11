import type { Metadata } from "next";
import {
  Box,
  CheckCheck,
  Code,
  Cpu,
  FileDown,
  FileJson2,
  FileUp,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Worker Threads for Non-Blocking JSON Processing",
  description:
    "Practical guide to using Node.js worker_threads for large JSON.parse and JSON.stringify jobs, with pooling advice, Next.js runtime notes, and data-transfer trade-offs.",
};

const blockingExample = String.raw`// A single large parse still blocks the event loop.
app.post('/ingest', async (req, res) => {
  const rawJson = await readRequestBody(req);

  const parsed = JSON.parse(rawJson);
  await saveToDatabase(parsed);

  res.end('ok');
});`;

const workerSnippet = String.raw`// json-worker.js
import { parentPort } from 'node:worker_threads';

if (!parentPort) {
  throw new Error('json-worker.js must be started via Worker.');
}

parentPort.on('message', ({ id, job, payload }) => {
  try {
    let result;

    switch (job) {
      case 'parse':
        result = JSON.parse(payload);
        break;
      case 'stringify':
        result = JSON.stringify(payload);
        break;
      default:
        throw new Error(\`Unsupported job: \${job}\`);
    }

    parentPort.postMessage({ id, ok: true, result });
  } catch (error) {
    parentPort.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown worker error',
    });
  }
});`;

const clientSnippet = String.raw`// json-worker-client.js
import { Worker } from 'node:worker_threads';

const worker = new Worker(new URL('./json-worker.js', import.meta.url));
const pending = new Map();
let nextJobId = 0;

worker.on('message', ({ id, ok, result, error }) => {
  const job = pending.get(id);
  if (!job) return;

  pending.delete(id);
  if (ok) {
    job.resolve(result);
  } else {
    job.reject(new Error(error));
  }
});

worker.on('error', (error) => {
  for (const job of pending.values()) {
    job.reject(error);
  }
  pending.clear();
});

worker.on('exit', (code) => {
  if (code === 0) return;

  const error = new Error(\`JSON worker exited with code \${code}\`);
  for (const job of pending.values()) {
    job.reject(error);
  }
  pending.clear();
});

export function parseJsonOffThread(rawJson) {
  return new Promise((resolve, reject) => {
    const id = ++nextJobId;
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, job: 'parse', payload: rawJson });
  });
}

export function stringifyJsonOffThread(value) {
  return new Promise((resolve, reject) => {
    const id = ++nextJobId;
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, job: 'stringify', payload: value });
  });
}`;

const routeSnippet = String.raw`// app/api/process-large-json/route.ts
export const runtime = 'nodejs';

import { parseJsonOffThread } from '@/lib/json-worker-client';

export async function POST(request: Request) {
  const rawJson = await request.text();
  const parsed = await parseJsonOffThread(rawJson);

  return Response.json({
    received: true,
    topLevelKeys:
      parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? Object.keys(parsed).length
        : 0,
  });
}`;

export default function WorkerThreadsJsonArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <Cpu className="mr-3 h-8 w-8 text-blue-500" />
        Worker Threads for Non-Blocking JSON Processing
      </h1>

      <div className="space-y-6">
        <p>
          If large JSON payloads are pushing your Node.js latency around, worker threads can help, but only when the
          real bottleneck is CPU time on the main thread. The goal is not to make <code>JSON.parse()</code> or{" "}
          <code>JSON.stringify()</code> magically cheap. The goal is to move that synchronous work off the event loop
          so the process can keep serving other requests.
        </p>
        <p>
          That distinction matters because a bad design can erase the benefit. Spawning a fresh worker for every
          request, cloning giant objects back and forth, or running the route on an Edge runtime adds complexity
          without fixing the real problem.
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
          <h2 className="mb-3 text-xl font-semibold">Quick Answer</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use worker threads when profiling shows large JSON work blocking otherwise responsive Node.js code.</li>
            <li>Reuse a long-lived worker or a small pool. The Node.js docs recommend pooling for repeated tasks.</li>
            <li>
              Keep related CPU-heavy work in the worker when possible. Parsing a huge string and then cloning the whole
              object back can cancel out much of the gain.
            </li>
            <li>
              In Next.js, this technique only works in the Node.js runtime. The Edge runtime does not expose native
              Node APIs such as <code>worker_threads</code>.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileJson2 className="mr-2 h-6 w-6 text-green-500" />
          Why Large JSON Blocks
        </h2>
        <p>
          <code>JSON.parse()</code> and <code>JSON.stringify()</code> are synchronous. For normal API payloads that is
          usually fine. For large request bodies, exports, analytics blobs, or queue messages, that synchronous work
          can pin the event loop long enough to hurt throughput and tail latency.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Blocking example</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">{blockingExample}</pre>
        </div>
        <p>
          Reading a request body as text does not fix the expensive part. It only avoids parsing on the main thread
          before you decide what to do next.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <MessageCircle className="mr-2 h-6 w-6 text-yellow-500" />
          The Recommended Pattern
        </h2>
        <p>
          For repeated JSON work, the practical pattern is a reusable worker or a small pool, not one worker per job.
          Send jobs with <code>worker.postMessage()</code>, keep the worker alive, and reuse it for the next payload.
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6">
          <li>The main thread reads raw JSON text or receives an object to stringify.</li>
          <li>A reusable worker receives a job message.</li>
          <li>The worker runs the CPU-heavy parse or stringify operation.</li>
          <li>The worker sends back the result, or better, a smaller processed result.</li>
        </ol>
        <p>
          <code>workerData</code> is still useful, but mainly for startup-time configuration. For job queues,{" "}
          <code>postMessage()</code> maps better to real traffic.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-2 h-6 w-6 text-teal-500" />
          Reusable Worker Example
        </h2>

        <h3 className="mt-6 text-xl font-semibold">1. Worker process</h3>
        <p>
          The worker listens for parse or stringify jobs and posts either a result or an error back to the parent.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">{workerSnippet}</pre>
        </div>

        <h3 className="mt-6 text-xl font-semibold">2. Main-thread client</h3>
        <p>
          This wrapper keeps a single worker alive and maps responses back to the correct promise. For higher traffic,
          replace the single worker with a pool sized to your CPU budget.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">{clientSnippet}</pre>
        </div>
        <p>
          In TypeScript or framework builds, make sure the worker path points at emitted JavaScript, or use the
          framework&apos;s worker bundling mechanism if it has one. Path resolution after build is a common source of
          runtime failures.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileUp className="mr-2 h-6 w-6 text-blue-600" />
          Next.js Route Handler Notes
        </h2>
        <p>
          If you use this pattern in a Next.js route handler, keep the route on the Node.js runtime and read the body
          as text first when parsing itself is the bottleneck. Calling <code>request.json()</code> does the parse on
          the current runtime before your worker ever sees it.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">{routeSnippet}</pre>
        </div>
        <p>
          Next.js supports both Node.js and Edge runtimes, but <code>worker_threads</code> is a Node-only API. If your
          deployment or route configuration can run at the edge, pin the handler to <code>nodejs</code> explicitly.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Box className="mr-2 h-6 w-6 text-orange-500" />
          Data Transfer Costs Matter
        </h2>
        <p>
          Messages between the main thread and workers use the structured clone algorithm. That means strings, arrays,
          and plain objects are normally copied, not shared. The copy cost is often acceptable, but it becomes very
          visible when you move huge objects across the boundary.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Sending raw JSON text to a worker for parsing is often reasonable.</li>
          <li>Sending a huge parsed object back to the main thread may still be expensive.</li>
          <li>
            If the worker naturally produces bytes, transfer an <code>ArrayBuffer</code> instead of copying it.
          </li>
          <li>
            For large jobs, it is often better to parse, validate, filter, and reduce inside the worker, then return a
            smaller result.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <LoaderCircle className="mr-2 h-6 w-6 text-indigo-500" />
          When Worker Threads Are the Wrong Tool
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Small JSON payloads where worker startup and message passing cost more than the parse itself.</li>
          <li>I/O-bound routes where the real delay is network, disk, or database latency.</li>
          <li>Very large continuous streams where a streaming parser or chunked format is the better architecture.</li>
          <li>Edge-runtime code paths that do not have access to Node worker APIs.</li>
        </ul>
        <p>
          If you are processing many large payloads per second, a proper worker pool is usually the next step. If you
          are processing one extremely large payload, the better answer may be a streaming design that avoids building
          the entire JSON value in memory at once.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileDown className="mr-2 h-6 w-6 text-red-600" />
          Troubleshooting Checklist
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>The route still blocks:</strong> check whether you already called <code>request.json()</code> or
            did other CPU-heavy work before the worker.
          </li>
          <li>
            <strong>Latency barely improves:</strong> you may be spawning workers per request or cloning huge objects
            back from the worker.
          </li>
          <li>
            <strong>The worker cannot be found after deploy:</strong> verify the emitted worker file path in production
            output.
          </li>
          <li>
            <strong>Memory spikes:</strong> each worker has its own V8 isolate, so cap worker count and treat pool size
            as a real resource limit.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CheckCheck className="mr-2 h-6 w-6 text-green-600" />
          Conclusion
        </h2>
        <p>
          Worker threads are a solid solution for non-blocking JSON processing in Node.js when you have already
          identified parse or stringify time as a real CPU bottleneck. Use them to keep the event loop responsive, but
          design around the full cost: worker startup, message cloning, memory usage, and framework runtime
          constraints.
        </p>
        <p>
          For most production systems, the winning approach is simple: keep the route on Node.js, reuse workers instead
          of spawning them for every job, and keep as much of the heavy JSON pipeline inside the worker as possible.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current guidance in this article was checked against the{" "}
          <a
            href="https://nodejs.org/api/worker_threads.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Node.js worker_threads documentation
          </a>{" "}
          and Next.js runtime documentation for Node.js versus Edge behavior.
        </p>
      </div>
    </>
  );
}
