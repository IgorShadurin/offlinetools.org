import type { Metadata } from "next";
import {
  MemoryStick,
  Zap,
  CloudDownload,
  Code,
  Layers,
  FileText,
  ListTree,
  FileCode,
  Workflow,
  HandCoins,
  Cpu,
  HardDrive,
  Bug,
  Folder,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chunking Strategies for Large JSON Processing | Offline Tools",
  description:
    "Choose the right JSON chunking strategy for large files: streaming parsers for huge arrays, NDJSON for line-by-line processing, and browser or Node stream patterns that avoid loading everything into memory.",
};

export default function LargeJsonChunkingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Chunking Strategies for Large JSON Processing</h1>

      <div className="space-y-6">
        <p>
          Need a practical JSON chunking strategy for large files? The safe answer is: chunk by <em>complete JSON
          values</em>, not by arbitrary byte counts. If you have one huge JSON array or object, use a streaming parser.
          If you control the format, prefer NDJSON so each line can be parsed independently. What you should not do is
          read 1 MB at a time and call <code>JSON.parse()</code> on every raw chunk.
        </p>
        <p>
          <MemoryStick className="inline-block mr-2" /> Large JSON usually fails for memory reasons long before it
          fails for disk size. <code>JSON.parse()</code> needs the entire JSON text as one complete string, and the
          resulting in-memory object can be much larger than the source file. That is why multi-GB exports, logs, and
          API responses need an incremental strategy.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Zap className="mr-2" /> Quick Decision Guide
          </h2>
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <div className="bg-white p-4 rounded dark:bg-gray-900">
              <h3 className="font-medium">One huge array or object</h3>
              <p className="mt-2 text-sm">
                Use a streaming parser that emits tokens or complete items from the structure without materializing the
                whole document.
              </p>
            </div>
            <div className="bg-white p-4 rounded dark:bg-gray-900">
              <h3 className="font-medium">You control the format</h3>
              <p className="mt-2 text-sm">
                Emit NDJSON or JSON Lines so you can read one line, parse one record, and move on.
              </p>
            </div>
            <div className="bg-white p-4 rounded dark:bg-gray-900">
              <h3 className="font-medium">Streaming over HTTP</h3>
              <p className="mt-2 text-sm">
                Read the response body as a stream, decode incrementally, and only parse complete records that you have
                fully assembled.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="mr-2" /> What Counts as a Safe JSON Chunk?
        </h2>
        <p>
          This is the part many “large data JSON chunking” guides skip. A chunk is only safe to parse when it is a
          complete JSON value.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <FileText className="inline-block mr-2 w-4 h-4" /> One full line in an NDJSON file is a safe chunk because
            that line is already a complete JSON object or value.
          </li>
          <li>
            <Workflow className="inline-block mr-2 w-4 h-4" /> One object emitted by a streaming parser from a root
            array is a safe chunk because the parser already tracked braces, strings, escapes, and nesting for you.
          </li>
          <li>
            <Code className="inline-block mr-2 w-4 h-4" /> A random byte slice like “the next 1 MB of text” is not a
            safe chunk because it may end in the middle of a string, escape sequence, or nested object.
          </li>
        </ul>
        <p>
          If you searched for a JSON chunking method, that is the core rule: split on record boundaries, not storage
          boundaries.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MemoryStick className="mr-2" /> Why Standard JSON.parse() Breaks Down
        </h2>
        <p>
          <code>JSON.parse()</code> is all-or-nothing. It expects one complete JSON document and only returns after it
          has built the result in memory.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2" /> Problematic Pattern
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const raw = await readEntireFile("huge-export.json");
const data = JSON.parse(raw); // Requires the whole document in memory

for (const item of data) {
  await processItem(item);
}`}
            </pre>
          </div>
          <p className="mt-2">
            This is fine for small or moderate payloads. It is a bad fit for giant arrays, long-running exports, and
            vendor dumps that exceed comfortable memory limits.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Workflow className="mr-2" /> 1. Use a Streaming Parser for Monolithic JSON
        </h3>
        <p>
          If the input is a single large array or object and you cannot change that format, a streaming parser is the
          right strategy. It reads incrementally and emits tokens or matched values as soon as they are complete.
        </p>
        <p>
          In practice, this is the right choice for files shaped like <code>[&#123;...&#125;, &#123;...&#125;, ...]</code>{" "}
          where each array item can be processed independently. Good streaming parsers can also ignore branches you do
          not care about, which is valuable when only one nested path matters.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <FileCode className="mr-2" /> Conceptual Streaming Example
          </h3>
          <p className="text-sm italic mb-3">
            This is intentionally library-agnostic. Parser APIs differ, but the processing pattern stays the same.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { createReadStream } from "node:fs";
// import { createArrayItemStream } from "your-streaming-parser";

async function processHugeArray(filePath: string) {
  const input = createReadStream(filePath);
  const items = createArrayItemStream(input); // Emits one root-array item at a time

  let processed = 0;

  for await (const item of items) {
    await processItem(item);
    processed++;
  }

  console.log(\`Processed \${processed} items\`);
}`}
            </pre>
          </div>
          <p className="mt-2">
            The important part is not the exact library. It is that the parser, not your code, keeps track of nesting,
            quotes, escapes, and chunk boundaries.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="mr-2" /> 2. Prefer NDJSON When You Can Control the Format
        </h3>
        <p>
          If you own the producer, NDJSON is usually the simplest and most reliable chunking strategy. Each line is a
          complete JSON value, so line-by-line processing becomes trivial.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example NDJSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
{"id":3,"name":"Charlie"}`}
            </pre>
          </div>
          <p className="mt-2">
            This is why NDJSON is common for logs, exports, queue payloads, and large ingestion pipelines: one bad line
            can be isolated without invalidating an entire multi-GB document.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2" /> Node.js Example: Read and Parse One Line at a Time
          </h3>
          <p className="text-sm italic mb-3">
            This matches the current line-by-line stream pattern documented by Node.js.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

async function processNdjsonFile(filePath: string) {
  const rl = createInterface({
    input: createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let itemCount = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;

    const item = JSON.parse(line);
    await processItem(item);
    itemCount++;
  }

  console.log(\`Finished \${itemCount} items\`);
}`}
            </pre>
          </div>
          <p className="mt-2">
            Here <code>JSON.parse()</code> is still useful. The trick is that you only call it on one complete record
            at a time, not on the entire dataset.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CloudDownload className="mr-2" /> 3. Stream HTTP Responses Instead of Buffering Them
        </h3>
        <p>
          For browser-based processing, current MDN guidance is to work directly with <code>response.body</code> when
          you need incremental handling. If you call <code>response.json()</code> or <code>response.text()</code>, you
          give up the chance to process the data as it arrives.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <FileCode className="mr-2" /> Browser Example: Assemble and Parse NDJSON Records
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`async function processNdjsonResponse(url: string) {
  const response = await fetch(url);
  if (!response.body) throw new Error("ReadableStream not available");

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let buffer = "";
  let itemCount = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += value;

    let newlineIndex = buffer.indexOf("\\n");
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);

      if (line) {
        const item = JSON.parse(line);
        await processItem(item);
        itemCount++;
      }

      newlineIndex = buffer.indexOf("\\n");
    }
  }

  if (buffer.trim()) {
    const item = JSON.parse(buffer);
    await processItem(item);
    itemCount++;
  }

  return itemCount;
}`}
            </pre>
          </div>
          <p className="mt-2">
            Notice that the code buffers text until it has a full line. It never tries to parse the raw stream chunk
            itself, because stream chunks are transport boundaries, not JSON record boundaries.
          </p>
        </div>
        <p>
          One more operational detail: once you start reading <code>response.body</code>, that body is considered
          consumed. Do not plan to read it once as a stream and then call <code>response.json()</code> afterward.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Bug className="mr-2" /> 4. Why Manual Byte Chunking Is Usually the Wrong Method
        </h3>
        <p>
          Manual “read 1 MB, split, repeat” chunking sounds easy, but it breaks on real-world JSON almost immediately.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Code className="inline-block mr-2 w-4 h-4" /> Commas are not reliable separators because they can appear
            inside strings.
          </li>
          <li>
            <ListTree className="inline-block mr-2 w-4 h-4" /> Nested arrays and objects mean you must track parser
            state, not just delimiters.
          </li>
          <li>
            <BookOpen className="inline-block mr-2 w-4 h-4" /> UTF-8 characters can span multiple bytes, so raw byte
            splitting can corrupt text unless decoding is done as a stream.
          </li>
        </ul>
        <p>
          Unless you are building a parser yourself, manual byte chunking is just re-implementing a parser badly. Use a
          real streaming parser or switch the format to NDJSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <HandCoins className="mr-2" /> Choosing the Right Strategy
        </h2>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <HardDrive className="inline-block mr-2 w-4 h-4" /> <strong>You receive a giant vendor dump as one JSON
            array:</strong> Use a streaming parser and process each item as it is emitted.
          </li>
          <li>
            <Folder className="inline-block mr-2 w-4 h-4" /> <strong>You own the export format:</strong> Prefer NDJSON
            so downstream consumers can read, parse, retry, and recover record by record.
          </li>
          <li>
            <Cpu className="inline-block mr-2 w-4 h-4" /> <strong>You still run out of memory while
            streaming:</strong> Check whether you are accumulating processed results in arrays, caching too much, or
            using large concurrency limits that defeat the benefit of chunking.
          </li>
          <li>
            <CloudDownload className="inline-block mr-2 w-4 h-4" /> <strong>You are consuming compressed network
            payloads:</strong> Decompress as a stream first, then parse the decompressed text incrementally.
          </li>
          <li>
            <Bug className="inline-block mr-2 w-4 h-4" /> <strong>You need selective extraction from deeply nested
            JSON:</strong> Pick a streaming parser that can filter by path instead of materializing the entire document.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-2" /> Troubleshooting Large JSON Chunking
        </h2>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <Code className="inline-block mr-2 w-4 h-4" /> <strong>&quot;Unexpected end of JSON input&quot;:</strong>{" "}
            You are parsing an incomplete chunk. Buffer until you have a full record, or let a streaming parser manage
            boundaries.
          </li>
          <li>
            <MemoryStick className="inline-block mr-2 w-4 h-4" /> <strong>Memory is still spiking:</strong> Streaming
            input is not enough if you also keep every parsed item in memory after processing it.
          </li>
          <li>
            <BookOpen className="inline-block mr-2 w-4 h-4" /> <strong>Text becomes garbled:</strong> Use streaming
            decode tools such as <code>TextDecoderStream</code> so multibyte characters are reconstructed correctly
            across chunk boundaries.
          </li>
          <li>
            <FileText className="inline-block mr-2 w-4 h-4" /> <strong>Bad record handling matters:</strong> NDJSON lets
            you quarantine a single broken line. One syntax error inside a monolithic JSON document usually invalidates
            the whole file.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best JSON chunking strategy depends on the shape of the data, but the rule stays the same: process
          complete records, not arbitrary slices. Use a streaming parser for large monolithic JSON, use NDJSON when you
          can control the format, and use browser or Node streams to avoid buffering entire payloads. That approach is
          simpler, safer, and much more scalable than trying to split raw JSON by hand.
        </p>
        <p>
          For current runtime guidance, see the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            MDN Fetch streaming documentation
          </a>{" "}
          and the{" "}
          <a
            href="https://nodejs.org/api/readline.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            Node.js readline documentation
          </a>
          .
        </p>
      </div>
    </>
  );
}
