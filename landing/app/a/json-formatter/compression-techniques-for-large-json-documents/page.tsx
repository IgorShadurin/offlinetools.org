import type { Metadata } from "next";
import {
  ArrowDownToLine,
  HardDrive,
  Minimize,
  Code,
  Bolt,
  Settings,
  Scale,
  Cpu,
  Network,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compression Techniques for Large JSON Documents Compared | Offline Tools",
  description:
    "Compare gzip, Brotli, Zstandard, binary formats, and streaming strategies for large JSON documents. Learn which option fits browser delivery, APIs, storage, and uploads.",
};

export default function JsonCompressionArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center space-x-3 text-3xl font-bold">
        <Minimize className="h-8 w-8" />
        <span>Compression Techniques for Large JSON Documents</span>
      </h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            If you need a practical comparison of JSON compression techniques, start with this rule: for most browser
            downloads, minified JSON plus Brotli with gzip fallback is the best default. Move beyond that only when you
            have a specific bottleneck such as CPU cost, storage footprint, slow uploads, or very large documents that
            should not be shipped as one giant JSON blob in the first place.
          </p>
          <p>
            Large JSON hurts in four places at once: it takes more space to store, more bandwidth to transfer, more
            time to reach the client, and more memory and CPU to parse after download. Compression helps with the first
            three. If your main problem is parse time or memory spikes, you often need streaming, pagination, or a
            binary format rather than just a stronger compressor.
          </p>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Quick comparison of JSON compression techniques</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900/40">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Technique</th>
                  <th className="px-4 py-3 font-semibold">Best when</th>
                  <th className="px-4 py-3 font-semibold">Strengths</th>
                  <th className="px-4 py-3 font-semibold">Trade-offs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-4 py-3 font-medium">Minify only</td>
                  <td className="px-4 py-3">You want the simplest size reduction with zero protocol changes.</td>
                  <td className="px-4 py-3">Easy, safe, keeps plain JSON.</td>
                  <td className="px-4 py-3">Only removes whitespace, so gains are modest.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Gzip</td>
                  <td className="px-4 py-3">You need broad compatibility across browsers, servers, and tools.</td>
                  <td className="px-4 py-3">Safe default, mature, widely supported.</td>
                  <td className="px-4 py-3">Usually larger than Brotli for text payloads.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Brotli</td>
                  <td className="px-4 py-3">You serve JSON over HTTP to browsers and care about transfer size.</td>
                  <td className="px-4 py-3">Often beats gzip on text-heavy payloads such as JSON.</td>
                  <td className="px-4 py-3">Higher compression levels cost more CPU time.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Zstandard (zstd)</td>
                  <td className="px-4 py-3">You control both ends, especially internal APIs or storage pipelines.</td>
                  <td className="px-4 py-3">Excellent speed/ratio balance and strong dictionary support.</td>
                  <td className="px-4 py-3">Web edge support is less uniform than gzip or Brotli.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">MessagePack or CBOR</td>
                  <td className="px-4 py-3">You want a compact binary format without a heavy schema workflow.</td>
                  <td className="px-4 py-3">Smaller payloads and less text parsing overhead.</td>
                  <td className="px-4 py-3">Not human-readable and needs decoder support on both sides.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Protobuf or schema-aware encoding</td>
                  <td className="px-4 py-3">The document shape is stable and performance matters a lot.</td>
                  <td className="px-4 py-3">Very efficient size and parsing, strong contracts.</td>
                  <td className="px-4 py-3">Adds schema management and moves you away from plain JSON.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">NDJSON or streaming</td>
                  <td className="px-4 py-3">The real problem is latency, memory, or giant top-level arrays.</td>
                  <td className="px-4 py-3">Improves time-to-first-record and reduces peak memory.</td>
                  <td className="px-4 py-3">Client code gets more complex than a single JSON parse call.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Best first step for most teams</h2>
          <p>
            Start by minifying the JSON, then negotiate HTTP compression with Brotli first and gzip as the fallback.
            This gives you better transfer size without changing your payload format or adding a decoding library. In
            practice, this is the highest-value and lowest-risk improvement for public JSON endpoints.
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li className="flex items-start space-x-2">
              <Network className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <span>
                Send a proper <code>Vary: Accept-Encoding</code> header so caches keep the compressed and
                uncompressed variants straight.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <span>
                Precompress or cache repeated responses when possible. Current{" "}
                <a
                  href="https://nodejs.org/api/zlib.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Node.js zlib docs
                </a>{" "}
                explicitly note that on-the-fly encoding is expensive and compressed results should be cached.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <HardDrive className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <span>
                Minification helps the raw file size, but once you also apply gzip or Brotli the extra gain from
                removing whitespace is usually smaller than people expect.
              </span>
            </li>
          </ul>
          <div className="my-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-medium">Node.js example: prefer Brotli, fall back to gzip</h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Keep the example simple. In production, cache compressed buffers instead of recompressing the same
              payload for every request.
            </p>
            <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
              <pre>
                {`import express from "express";
import zlib from "node:zlib";

const app = express();
const rawJson = JSON.stringify(largeJsonData);

app.get("/data", (req, res) => {
  const accept = req.headers["accept-encoding"] ?? "";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Vary", "Accept-Encoding");

  if (accept.includes("br")) {
    return zlib.brotliCompress(rawJson, (err, body) => {
      if (err) return res.send(rawJson);
      res.setHeader("Content-Encoding", "br");
      res.send(body);
    });
  }

  if (accept.includes("gzip")) {
    return zlib.gzip(rawJson, (err, body) => {
      if (err) return res.send(rawJson);
      res.setHeader("Content-Encoding", "gzip");
      res.send(body);
    });
  }

  res.send(rawJson);
});`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">What each option looks like in practice</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
              <h3 className="mb-2 text-xl font-semibold">Gzip</h3>
              <p>
                Gzip is still the interoperability baseline. If you need one answer that works almost everywhere,
                choose gzip. It is especially useful for APIs that sit behind multiple reverse proxies, older
                infrastructure, or third-party clients you do not fully control.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
              <h3 className="mb-2 text-xl font-semibold">Brotli</h3>
              <p>
                Brotli is usually the better choice for browser-facing JSON because JSON is repetitive text: keys,
                punctuation, and common values repeat a lot. That makes Brotli a strong default for static JSON files,
                cacheable API responses, and documentation payloads where transfer size matters more than compression
                latency on the server.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
              <h3 className="mb-2 text-xl font-semibold">Zstandard</h3>
              <p>
                Zstandard is often the most interesting upgrade for internal systems. It is fast, works well across a
                broad range of compression levels, and supports dictionaries for families of similar JSON documents. For
                large batches, logs, exports, or service-to-service traffic you control, it is often a better fit than
                squeezing every last byte out of Brotli.
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Current browser HTTP docs on{" "}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN
                </a>{" "}
                include <code>zstd</code> in <code>Accept-Encoding</code>, but support through frameworks, CDNs, and
                proxies is still less predictable end-to-end than <code>gzip</code> or <code>br</code>. Current{" "}
                <a
                  href="https://nodejs.org/api/zlib.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Node.js docs
                </a>{" "}
                also expose built-in Zstd APIs while still marking them experimental, so treat Zstd as something to
                verify in your exact stack rather than your first universal web default.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
              <h3 className="mb-2 text-xl font-semibold">Binary and schema-aware formats</h3>
              <p>
                MessagePack and CBOR keep a JSON-like data model while avoiding verbose text encoding. Protobuf goes
                further by making the schema first-class. These options help when repeated keys dominate payload size or
                when parse speed matters as much as transfer size.
              </p>
              <p className="mt-3">
                The main caution is protocol ownership. If you shorten keys or invent a custom schema-based JSON
                encoding, you are effectively creating a private wire format. At that point, an established binary
                format is often easier to version and maintain than a homegrown shortcut.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Compression does not fix giant-document design problems</h2>
          <ul className="my-4 list-disc space-y-3 pl-6">
            <li className="flex items-start space-x-2">
              <Cpu className="mt-1 h-5 w-5 flex-shrink-0 text-purple-500" />
              <span>
                If the client freezes when parsing the response, a stronger compressor is not enough. Smaller pages,
                streaming, or a binary format can matter more than raw byte savings.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <ArrowDownToLine className="mt-1 h-5 w-5 flex-shrink-0 text-purple-500" />
              <span>
                If you return one huge array, consider NDJSON or chunked delivery so the receiver can start processing
                records before the full export finishes.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Code className="mt-1 h-5 w-5 flex-shrink-0 text-purple-500" />
              <span>
                If your JSON includes already-compressed assets like base64 images or archives, compression ratios will
                drop sharply because the expensive bytes are no longer easy to compress.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Settings className="mt-1 h-5 w-5 flex-shrink-0 text-purple-500" />
              <span>
                If the same large JSON shape appears again and again, dictionary-based approaches such as Zstd can make
                more sense than pushing Brotli to very high compression levels.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Client-side and upload notes</h2>
          <p>
            Browsers automatically decompress normal HTTP responses when the server sends a supported{" "}
            <code>Content-Encoding</code>, so you do not write custom client code for standard gzip or Brotli download
            handling. The custom work starts when you compress application data yourself before upload, or when you move
            away from plain JSON into MessagePack, Protobuf, or another binary format.
          </p>
          <p className="mt-4">
            For upload workflows, the browser{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream/CompressionStream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              CompressionStream constructor docs
            </a>{" "}
            currently list <code>gzip</code>, <code>deflate</code>, <code>deflate-raw</code>, <code>brotli</code>,
            and <code>zstd</code> formats. That is useful, but format support still needs real browser testing before
            you rely on non-gzip uploads in production. If you need the safest built-in path today, gzip remains the
            conservative choice.
          </p>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Decision guide</h2>
          <p className="mb-4">Use this shortcut if you want a fast answer instead of a full evaluation:</p>
          <ul className="my-4 list-disc space-y-3 pl-6">
            <li className="flex items-start space-x-2">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <span>
                Public browser API or downloadable JSON file: minify, serve Brotli when available, and keep gzip as
                the fallback.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Bolt className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <span>
                Internal API, data lake, export pipeline, or backup format: evaluate Zstandard first, especially when
                you can reuse dictionaries and control both endpoints.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Network className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <span>
                Stable schema and high traffic volume: use Protobuf or another schema-aware binary format instead of
                inventing your own shortened-key JSON dialect.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Cpu className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <span>
                Slow first paint, memory spikes, or long waits before the first record appears: redesign delivery with
                pagination or streaming instead of only tuning compression level.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Conclusion</h2>
          <p>
            For most large JSON documents, the winning sequence is simple: keep the payload as JSON, minify it, use
            Brotli or gzip over HTTP, and cache compressed results. Reach for Zstandard when you control the full path,
            and move to MessagePack, CBOR, Protobuf, or streaming only when your bottleneck is bigger than transfer
            size alone. The right comparison is not just compression ratio. It is size, CPU, compatibility, and how
            much protocol complexity your system can afford.
          </p>
        </section>
      </div>
    </>
  );
}
