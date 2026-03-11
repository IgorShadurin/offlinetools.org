import type { Metadata } from "next";
import { Rocket, Scale, Code, Zap, TriangleAlert, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Incremental Parsing for Responsive JSON Formatting | Offline Tools",
  description:
    "Learn when incremental JSON parsing helps, where JSON.parse() and Response.json() still block, and how streams, workers, and record-oriented JSON keep formatting responsive.",
};

export default function IncrementalJsonParsingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Rocket className="mr-3 text-blue-500" size={32} />
        Incremental Parsing for Responsive JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          If a JSON formatter freezes on a large payload, the slow part usually is not indentation itself. The real
          cost is decoding raw bytes, validating the document, and building enough structure to render it safely.
          Responsive JSON formatting is about keeping that work off the critical path so the interface stays usable
          while parsing is still in progress.
        </p>
        <p>
          Incremental parsing helps by reading input in smaller chunks and emitting progress, tokens, or completed
          records as soon as they are available. That lowers peak memory, improves time to first useful output, and
          avoids the blank-screen feeling that comes from waiting for one giant <code>JSON.parse()</code> call to
          finish.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg dark:bg-blue-950/30 dark:border-blue-900">
          <p className="font-semibold">Short answer for search visitors:</p>
          <p className="mt-2">
            Yes, JSON can be handled incrementally, but not with plain <code>JSON.parse()</code> alone. For a
            responsive formatter, stream the bytes yourself, keep parser state across chunks, and prefer
            record-oriented inputs when you control the data format.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Scale className="mr-2 text-green-500" />
          What the Platform Gives You Today
        </h2>
        <p>
          Modern web APIs give you streaming input, but the built-in JSON convenience methods are still whole-document
          operations. That distinction matters when you are designing a responsive JSON viewer or formatter.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>Response.json()</code> is convenient, but it resolves only after the full response body has been read
            and parsed.
          </li>
          <li>
            <code>response.body</code> exposes a <code>ReadableStream</code>, so you can process network bytes as they
            arrive.
          </li>
          <li>
            <code>TextDecoderStream</code> lets you decode UTF-8 incrementally instead of waiting for the entire byte
            sequence.
          </li>
          <li>
            <code>JSON.parse()</code> still expects a complete JSON string, which means it does not by itself provide
            progressive formatting or partial rendering.
          </li>
        </ul>
        <p>
          In practice, that means responsive formatting requires either a real streaming parser or an input shape where
          each unit can be parsed independently.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" />
          Traditional vs. Incremental Parsing
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium">Traditional Parsing (`JSON.parse` or `Response.json`)</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Best when the document is small enough to parse and render in one pass.</li>
            <li>Simple code path and often the fastest total runtime for ordinary payload sizes.</li>
            <li>Requires the complete JSON text before you can do anything useful with the result.</li>
            <li>Can cause long pauses, high memory spikes, or both on multi-megabyte inputs.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium">Incremental Parsing (Streaming or Event-Based)</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Reads chunks from a stream or file and keeps parser state across chunk boundaries.</li>
            <li>Can report progress immediately and emit completed records before the full payload finishes loading.</li>
            <li>Reduces peak memory because you do not have to materialize everything at once.</li>
            <li>Costs more engineering effort because strings, escapes, nesting, and errors must be tracked carefully.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="mr-2 text-yellow-500" />
          What "Responsive JSON Formatting" Really Means
        </h2>
        <p>
          For large inputs, responsive formatting usually means improving the user experience around parsing, not
          magically producing final pretty-printed output from arbitrary middle chunks of an unfinished document.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Show progress while scanning or validating the input.</li>
          <li>Keep typing, scrolling, and cancel buttons responsive by moving parsing into a worker.</li>
          <li>Render completed records one by one when the input format makes that safe.</li>
          <li>Collapse deep nodes or virtualize large trees so rendering does not become the new bottleneck.</li>
        </ul>
        <p>
          A single minified JSON object is still the hardest case. You cannot safely pretty-print the middle of it by
          counting braces alone, because braces inside strings, escape sequences, and partially received tokens all
          affect correctness.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <TriangleAlert className="mr-2 text-red-500" />
          Choose a Stream-Friendly Shape When You Can
        </h2>
        <p>
          If you control the producer, the data format matters as much as the parser. Some JSON shapes are far easier
          to present progressively.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>One huge JSON document:</strong> hardest to format incrementally. You need a real state machine and
            careful carry-over handling between chunks.
          </li>
          <li>
            <strong>A top-level array of objects:</strong> better. A streaming parser can emit each completed item once
            its closing brace is reached at the expected depth.
          </li>
          <li>
            <strong>Line-delimited records:</strong> often the easiest practical option. If each line is its own JSON
            value, you can parse one record at a time with normal <code>JSON.parse()</code>.
          </li>
          <li>
            <strong>JSON text sequences:</strong> if you need an official streaming format, RFC 7464 defines JSON texts
            separated by a record separator and the media type <code>application/json-seq</code>.
          </li>
        </ul>
        <p>
          That is the key design decision for a responsive JSON tool: if you can switch the payload shape, do that
          before building a more complicated parser.
        </p>

        <p>Here is a simple browser pattern for line-delimited JSON:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`async function consumeLineDelimitedJson(url) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error("Stream unavailable");
  }

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let buffer = "";

  while (true) {
    const { value = "", done } = await reader.read();
    buffer += value;

    let newlineIndex = buffer.indexOf("\\n");
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);

      if (line) {
        const record = JSON.parse(line);
        appendFormattedRecord(record);
      }

      newlineIndex = buffer.indexOf("\\n");
    }

    if (done) break;
  }

  if (buffer.trim()) {
    appendFormattedRecord(JSON.parse(buffer));
  }
}`}
          </pre>
        </div>
        <p>
          The important detail is the carry-over buffer. A chunk boundary can split a token or a whole record, so you
          keep incomplete text until the next chunk arrives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-500" />
          Practical Checklist for an Offline Formatter
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Read from a stream or process large pasted input in slices instead of one giant synchronous pass.</li>
          <li>
            Track parser state explicitly: nesting depth, whether you are inside a string, escape status, and current
            line or column for good errors.
          </li>
          <li>
            Move heavy parsing and pretty-printing work into a Web Worker so the main thread only handles UI updates.
          </li>
          <li>Batch DOM updates and render a compact preview first instead of expanding every node immediately.</li>
          <li>
            If the payload is fixed and monolithic, use incremental parsing for progress and cancellation, but accept
            that the final pretty output may still require the document to be structurally complete.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Common Failure Points</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Chunk-boundary bugs:</strong> if parsing fails randomly, you are probably dropping partial tokens or
            partial lines between reads.
          </li>
          <li>
            <strong>Brace counting only:</strong> this breaks as soon as braces appear inside quoted strings.
          </li>
          <li>
            <strong>Parser is fast but UI is still slow:</strong> rendering a huge expanded tree can cost more than
            parsing. Virtualization and collapsed nodes matter.
          </li>
          <li>
            <strong>Need results immediately:</strong> if you own the API, emitting discrete records is usually a better
            fix than trying to stream a single giant JSON blob.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Incremental parsing is the right strategy when you need a JSON formatter to stay responsive under large or
          continuous input. The main tradeoff is complexity: you trade one simple parse call for chunk management,
          parser state, worker messaging, and smarter rendering. If you control the format, choose record-oriented JSON
          and the problem becomes much easier. If you do not, incremental parsing still helps with progress,
          cancellation, and memory pressure, even when the final pretty-printed view must wait for the full document to
          be structurally complete.
        </p>
      </div>
    </>
  );
}
