import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Worker Implementation for Non-Blocking JSON Processing | Offline Tools",
  description:
    "Practical guide to parsing and formatting large JSON in a Web Worker with module workers, transferables, and Next.js-safe patterns that keep the UI responsive.",
};

export default function WebWorkerJsonProcessingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Web Worker Implementation for Non-Blocking JSON Processing</h1>

      <div className="space-y-6">
        <p>
          If parsing, validating, or pretty-printing large JSON freezes your interface, the fix is usually not a
          cleverer <code>JSON.parse()</code> call. The practical fix is moving that work off the main thread. A Web
          Worker does exactly that: it keeps typing, scrolling, clicking, and rendering responsive while the JSON work
          happens in the background.
        </p>

        <p>
          That distinction matters. A worker does not make <code>JSON.parse()</code> asynchronous or magically cheaper.
          It moves the synchronous cost onto another thread so the UI stays usable. For a JSON formatter, validator, or
          viewer handling multi-megabyte input, that is often the difference between a usable tool and a frozen tab.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950/30 my-4">
          <h2 className="text-lg font-semibold">Quick answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Use a dedicated worker when users paste large JSON, upload files, or trigger expensive validation.</li>
            <li>
              Create the worker from client-side code only, and prefer a module worker created with{" "}
              <code>new Worker(new URL(...), &#123; type: &quot;module&quot; &#125;)</code>.
            </li>
            <li>
              Remember that <code>postMessage()</code> still has a cost. Huge strings are copied, not transferred.
            </li>
            <li>
              If your JSON starts as bytes from a file or fetch response, transfer an <code>ArrayBuffer</code> to avoid
              an extra copy.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why JSON work blocks the main thread</h2>
        <p>
          Browser rendering, event handlers, React updates, and your JavaScript all compete for time on the main
          thread. Large JSON operations create long tasks: the browser cannot paint or respond to input until that work
          finishes. Even if total parse time is acceptable, the user experiences it as lag, dropped frames, and
          unresponsive controls.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Typical symptoms</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>The page stops responding while a formatter or validator runs</li>
            <li>Textarea input becomes delayed after pasting a large document</li>
            <li>Loading spinners appear but do not animate smoothly</li>
            <li>Scrolling and button clicks feel broken even though the tab has not crashed</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The modern worker pattern to use</h2>
        <p>
          For current browser apps, the safest default is a dedicated module worker. Dedicated workers are simple
          one-page-to-one-worker threads. Module workers let you use normal ESM syntax, and the{" "}
          <code>new URL(..., import.meta.url)</code> pattern works well with modern bundlers and Next.js client code.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">What to optimize for</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Keep the main thread free for input and rendering</li>
            <li>Send only the data the worker actually needs</li>
            <li>Track requests with IDs so multiple parses cannot overwrite each other</li>
            <li>Terminate the worker when the component unmounts</li>
            <li>Return smaller derived results when possible instead of echoing giant objects back to the UI</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation: parsing JSON without blocking the UI</h2>
        <p>
          The structure is straightforward: a worker receives input, parses it, and posts back either a result or an
          error. The main thread manages lifecycle, state, and rendering.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Worker file</h3>
        <p>
          Keep the worker focused on data work. It should not know about React state or UI. It should accept input,
          parse it, and send back a predictable response shape.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// json.worker.ts

type ParseRequest =
  | { id: string; kind: "parse-text"; jsonText: string }
  | { id: string; kind: "parse-bytes"; buffer: ArrayBuffer; encoding?: string };

type ParseResponse =
  | { id: string; ok: true; value: unknown }
  | { id: string; ok: false; error: string };

self.addEventListener("message", (event: MessageEvent<ParseRequest>) => {
  const request = event.data;

  try {
    const jsonText =
      request.kind === "parse-bytes"
        ? new TextDecoder(request.encoding ?? "utf-8").decode(request.buffer)
        : request.jsonText;

    const value = JSON.parse(jsonText);

    self.postMessage({
      id: request.id,
      ok: true,
      value,
    } as ParseResponse);
  } catch (error) {
    self.postMessage({
      id: request.id,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown parse error",
    } as ParseResponse);
  }
});
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Two request modes are useful in practice: plain text for pasted JSON and byte input for uploaded files or
            fetched responses. The byte path matters because buffers can be transferred instead of copied.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Create the worker from a client component</h3>
        <p>
          A worker is a browser API, so instantiate it only in client-side code. In Next.js, that means the component
          that owns the worker should be a client component.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`"use client";

import { useEffect, useRef, useState } from "react";

type ParseResponse =
  | { id: string; ok: true; value: unknown }
  | { id: string; ok: false; error: string };

export function JsonParser({ jsonText }: { jsonText: string }) {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef(
    new Map<
      string,
      {
        resolve: (value: unknown) => void;
        reject: (error: Error) => void;
      }
    >()
  );

  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("./json.worker.ts", import.meta.url), {
      type: "module",
    });

    worker.addEventListener("message", (event: MessageEvent<ParseResponse>) => {
      const message = event.data;
      const pending = pendingRef.current.get(message.id);
      if (!pending) return;

      pendingRef.current.delete(message.id);

      if (message.ok) {
        pending.resolve(message.value);
      } else {
        pending.reject(new Error(message.error));
      }
    });

    worker.addEventListener("error", (event) => {
      setIsParsing(false);
      setError(event.message || "Worker crashed");
    });

    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
      pendingRef.current.clear();
    };
  }, []);

  const parseInWorker = (value: string) =>
    new Promise<unknown>((resolve, reject) => {
      const worker = workerRef.current;
      if (!worker) {
        reject(new Error("Worker not ready"));
        return;
      }

      const id = crypto.randomUUID();
      pendingRef.current.set(id, { resolve, reject });
      worker.postMessage({ id, kind: "parse-text", jsonText: value });
    });

  const handleParse = async () => {
    setIsParsing(true);
    setError(null);

    try {
      const parsed = await parseInWorker(jsonText);
      setResult(parsed);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Parsing failed");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <button onClick={handleParse} disabled={isParsing}>
      {isParsing ? "Parsing..." : "Parse JSON"}
    </button>
  );
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The request ID prevents race conditions. If a user clicks parse twice or edits the input quickly, each
            response can be matched to the correct request instead of blindly updating state with the latest arriving
            message.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Transfer bytes instead of copying huge strings when possible</h3>
        <p>
          This is the optimization most articles skip. Worker messaging uses the structured clone algorithm. Large JSON
          strings are copied from the main thread to the worker. If the input already exists as raw bytes, transfer the
          buffer instead.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const fileBuffer = await file.arrayBuffer();
const id = crypto.randomUUID();

worker.postMessage(
  {
    id,
    kind: "parse-bytes",
    buffer: fileBuffer,
  },
  [fileBuffer]
);
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Passing <code>fileBuffer</code> in the transfer list moves ownership to the worker without a second memory
            copy. After transfer, the original buffer on the sending side becomes detached, so do not try to reuse it.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When a worker is actually worth it</h2>
        <p>
          A worker is a responsiveness tool first. It is most useful when the user can feel the cost of JSON work on
          the main thread.
        </p>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            Use one when users paste or upload large JSON documents and expect immediate feedback from a formatter,
            validator, or tree viewer.
          </li>
          <li>
            Use one when parsing is followed by extra expensive work such as schema validation, sorting, filtering,
            flattening, or syntax highlighting.
          </li>
          <li>
            Skip it for tiny payloads or rarely used admin flows where worker startup and message overhead would be more
            complexity than value.
          </li>
          <li>
            If you only need a pass/fail validation result or a formatted string, compute that inside the worker and
            return the smaller output instead of the full parsed object.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Common pitfalls and limitations</h2>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">A worker cannot touch the DOM.</span> It cannot update a textarea, spinner,
            or React state directly. Send results back and let the main thread render them.
          </li>
          <li>
            <span className="font-medium">Moving data can become the new bottleneck.</span> Sending a 20 MB JSON string
            to a worker and then sending a 20 MB parsed object back can double memory pressure and erase much of the
            benefit.
          </li>
          <li>
            <span className="font-medium">JSON parsing is still synchronous inside the worker.</span> You gain UI
            responsiveness, not incremental cancellation. If the user starts a new parse, terminate the old worker or
            ignore stale responses.
          </li>
          <li>
            <span className="font-medium">Module workers follow normal loading rules.</span> Wrong URLs, restrictive
            CSP settings, or cross-origin loading problems can prevent the worker script from starting at all.
          </li>
          <li>
            <span className="font-medium">Not every value can be messaged.</span> Functions, DOM nodes, and other
            non-cloneable values will throw a <code>DataCloneError</code> when you call <code>postMessage()</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting checklist</h2>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            If the worker never starts, verify that the component creating it runs on the client and that the worker
            URL resolves correctly in your bundler output.
          </li>
          <li>
            If memory spikes, check whether you are copying the same giant payload between threads more than once. Use
            transferables for byte buffers and return smaller derived results when possible.
          </li>
          <li>
            If errors feel opaque, add a consistent message format from the worker and log <code>event.message</code>{" "}
            from the worker <code>error</code> event on the main thread.
          </li>
          <li>
            If responsiveness still feels poor, profile what happens after parsing. Rendering a massive JSON tree on the
            main thread can be slower than the parse itself.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          A good Web Worker implementation for JSON processing is not just &quot;move <code>JSON.parse()</code> into
          another file.&quot; The useful version also minimizes message overhead, handles concurrent requests safely,
          and returns only the data the UI really needs. For JSON tools that process large user input, that pattern
          keeps the interface responsive and makes heavy operations feel reliable instead of fragile.
        </p>
      </div>
    </>
  );
}
