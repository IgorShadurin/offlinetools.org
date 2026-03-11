import type { Metadata } from "next";
import { Binary, Code, Wrench, Info, AlertCircle, CheckCircle, Database, FileJson } from "lucide-react";

export const metadata: Metadata = {
  title: "Using Typed Arrays for JSON Buffer Manipulation: UTF-8, Uint8Array, and Safe Buffer Workflows | Offline Tools",
  description:
    "Learn when to use Uint8Array for JSON buffer manipulation, how UTF-8 affects byte handling, and how to encode, decode, stream, and frame JSON safely in browsers and Node.js.",
};

export default function TypedArraysJsonBufferArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Binary className="w-8 h-8" /> Using Typed Arrays for JSON Buffer Manipulation
      </h1>

      <div className="space-y-6">
        <p>
          Typed arrays help when JSON is already moving through your app as bytes rather than plain strings, such as a{" "}
          <code>fetch()</code> response, a file read, a WebSocket frame, a worker message, or a Node.js stream. In
          those cases, a <code>Uint8Array</code> is the right container for the UTF-8 bytes that represent the JSON
          text.
        </p>
        <p>
          The important boundary is this: typed arrays are excellent for <em>transport, framing, slicing, reusing
          buffers, and interop with binary APIs</em>. They do not replace JSON parsing. In almost every real workflow,
          you still move between <code>object -&gt; JSON string -&gt; UTF-8 bytes</code> on the way out and{" "}
          <code>UTF-8 bytes -&gt; JSON string -&gt; object</code> on the way back in.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> When Typed Arrays Are Actually Useful for JSON
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" /> JSON arrives from an API or socket as raw
            bytes and you need to decode it yourself.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" /> You are packaging JSON next to binary data,
            such as a length prefix, checksum, or custom protocol header.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" /> You want to reuse buffers and reduce extra
            allocations in tight loops.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" /> You need the same payload to work across
            browser APIs, Web Workers, WebAssembly boundaries, and Node.js.
          </li>
        </ul>
        <p>
          If you only need to inspect, format, or parse JSON already held in a JavaScript string, typed arrays are
          usually unnecessary overhead. In that case, <code>JSON.parse()</code>, <code>JSON.stringify()</code>, and a
          formatter are the simpler tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> JSON on the Wire Is UTF-8 Bytes
        </h2>
        <p>
          JSON is text, but network and file APIs move it around as bytes. The current JSON standard,{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            RFC 8259
          </a>
          , says that JSON exchanged between systems outside a closed ecosystem <em>must</em> be encoded as UTF-8. It
          also says senders must not prepend a byte order mark (BOM) to network JSON.
        </p>
        <p>
          That matters because JavaScript string length is <em>not</em> the same thing as UTF-8 byte length. For JSON
          containing non-ASCII characters, the byte count can be larger than <code>json.length</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const json = JSON.stringify({ city: "Minsk", currency: "€" });
const encoder = new TextEncoder();
const bytes = encoder.encode(json);

console.log(json.length);  // UTF-16 code units, not UTF-8 bytes
console.log(bytes.length); // Actual byte size on the wire`}
            </pre>
          </div>
        </div>
        <p>
          The WHATWG{" "}
          <a
            href="https://encoding.spec.whatwg.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            Encoding Standard
          </a>{" "}
          defines <code>TextEncoder</code> as UTF-8 only, which matches how JSON should be transmitted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Encode JSON into a <code>Uint8Array</code>
        </h2>
        <p>
          The default outbound path is straightforward: stringify first, then encode the string into a byte buffer.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const payload = {
  id: 123,
  name: "Test Item",
  tags: ["json", "typed-array"]
};

const jsonString = JSON.stringify(payload);
const encoder = new TextEncoder();
const jsonBytes = encoder.encode(jsonString);

console.log(jsonBytes instanceof Uint8Array); // true
console.log(jsonBytes.byteLength);            // number of UTF-8 bytes`}
            </pre>
          </div>
        </div>
        <p>
          Use this when an API expects bytes, for example <code>WebSocket.send()</code>, <code>postMessage()</code>, a
          file API, or a Node.js socket or stream.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="inline w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" /> Reuse a Destination Buffer with{" "}
          <code>encodeInto()</code>
        </h3>
        <p>
          When you already have a reusable output buffer, <code>TextEncoder.encodeInto()</code> can avoid an extra
          allocation. The Encoding Standard defines it to return how many source code units were read and how many bytes
          were written.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const payload = { ok: true, message: "Hello €" };
const jsonString = JSON.stringify(payload);
const target = new Uint8Array(1024);

const encoder = new TextEncoder();
const { read, written } = encoder.encodeInto(jsonString, target);

if (read !== jsonString.length) {
  throw new Error("Target buffer is too small");
}

const exactBytes = target.subarray(0, written);
console.log(exactBytes.byteLength);`}
            </pre>
          </div>
        </div>
        <p>
          This is most useful in high-throughput or allocation-sensitive code. The detail to remember is that{" "}
          <code>written</code> is measured in bytes, while <code>read</code> is measured against the source string.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Decode Bytes Back into JSON Safely
        </h2>
        <p>
          The reverse path is decode first, parse second. If the bytes are supposed to be valid UTF-8 JSON, it is often
          better to fail loudly on bad input instead of silently replacing broken byte sequences.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const decoder = new TextDecoder("utf-8", { fatal: true });

const jsonString = decoder.decode(jsonBytes);
const payload = JSON.parse(jsonString);

console.log(payload);`}
            </pre>
          </div>
        </div>
        <p>
          With <code>fatal: true</code>, invalid UTF-8 throws a <code>TypeError</code> during decoding. Without it,
          bad input is typically replaced with the Unicode replacement character, which can hide corruption until later.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database className="w-6 h-6" /> Buffer Manipulation That Actually Makes Sense
        </h2>
        <p>
          The strongest use case for typed arrays is usually not &quot;editing JSON bytes directly&quot;. It is
          manipulating the surrounding buffer layout: prepending a header, extracting a payload, concatenating chunks, or
          copying the JSON bytes into a larger binary message.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const payload = { type: "event", ok: true };
const jsonBytes = new TextEncoder().encode(JSON.stringify(payload));

// 4-byte big-endian length prefix + JSON payload
const packet = new Uint8Array(4 + jsonBytes.length);
const header = new DataView(packet.buffer, packet.byteOffset, packet.byteLength);

header.setUint32(0, jsonBytes.length, false);
packet.set(jsonBytes, 4);

// Read it back
const length = header.getUint32(0, false);
const body = packet.subarray(4, 4 + length);
const decoded = JSON.parse(new TextDecoder().decode(body));`}
            </pre>
          </div>
        </div>
        <p>
          This kind of framing is exactly where <code>Uint8Array</code> shines: the JSON stays standard, while the
          surrounding protocol remains binary and efficient.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="w-6 h-6" /> Handling Chunked Input Without Corrupting Characters
        </h2>
        <p>
          If JSON arrives in multiple chunks, decode incrementally so multi-byte UTF-8 characters are preserved across
          chunk boundaries. Only call <code>JSON.parse()</code> once you have the complete JSON text.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const decoder = new TextDecoder("utf-8", { fatal: true });
let jsonText = "";

for (const chunk of incomingChunks) {
  jsonText += decoder.decode(chunk, { stream: true });
}

jsonText += decoder.decode(); // flush the final partial code point
const payload = JSON.parse(jsonText);`}
            </pre>
          </div>
        </div>
        <p>
          This streaming decode pattern is useful for chunked fetch bodies, sockets, and custom transports. If your
          stream is newline-delimited JSON rather than one complete JSON document, split on newlines and parse record by
          record instead.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" /> Common Mistakes and Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" /> <strong>In-place edits are fragile:</strong>{" "}
            changing a value from <code>1</code> to <code>1000</code> or from <code>&quot;a&quot;</code> to{" "}
            <code>&quot;longer text&quot;</code> changes the byte length and shifts the rest of the document. In most
            cases, it is safer to parse, modify the object, and re-serialize.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" />{" "}
            <strong>Byte length and string length are different:</strong> if buffer size matters, measure the encoded
            bytes, not <code>string.length</code>.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" /> <strong>Typed arrays do not parse JSON:</strong>{" "}
            access to bytes does not remove the need for <code>JSON.parse()</code>. Byte-level parsing of full JSON
            grammar is complex and rarely worth doing by hand.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" /> <strong>Node.js has one sharp edge:</strong>{" "}
            in Node.js, the{" "}
            <a
              href="https://nodejs.org/api/buffer.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline dark:text-blue-400"
            >
              <code>Buffer</code>
            </a>{" "}
            class extends <code>Uint8Array</code>, but <code>Buffer.slice()</code> returns a view while ordinary typed
            array <code>slice()</code> returns a copy. Prefer <code>subarray()</code> when you want consistent
            cross-runtime behavior.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" /> <strong>Manual decoding is optional:</strong>{" "}
            if you simply want parsed JSON from a normal HTTP response, <code>response.json()</code> is usually clearer
            than <code>response.arrayBuffer()</code> plus manual decoding.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Browser and Node.js Interoperability Notes
        </h2>
        <p>
          The browser-friendly type for JSON bytes is <code>Uint8Array</code>. In Node.js, <code>Buffer</code> is a
          subclass of <code>Uint8Array</code>, and the current Node.js docs explicitly note that many APIs accept plain{" "}
          <code>Uint8Array</code> instances wherever <code>Buffer</code> is supported. That means you can often keep one
          byte-oriented code path across environments.
        </p>
        <p>
          When you need Node-specific helpers, you can still convert freely between the two. The main reason to stay
          with <code>Uint8Array</code> in shared code is predictability: it matches the standard web APIs and avoids
          accidental reliance on Buffer-only methods.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Using typed arrays for JSON buffer manipulation makes sense when you are solving a byte-level problem, not a
          formatting problem. Treat JSON as UTF-8, use <code>TextEncoder</code> and <code>TextDecoder</code> for the
          boundary between text and bytes, reserve direct buffer work for framing and transport, and prefer parsing,
          editing, and re-serializing over risky in-place mutations. That gives you the performance and interoperability
          benefits of buffers without turning simple JSON handling into brittle low-level code.
        </p>
      </div>
    </>
  );
}
