import type { Metadata } from "next";
import {
  Binary,
  Code,
  Wrench,
  Info,
  AlertCircle,
  CheckCircle,
  Database,
  FileJson,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using Typed Arrays for JSON Buffer Manipulation | Offline Tools",
  description:
    "Learn how to work with JSON data as byte buffers using JavaScript Typed Arrays (Uint8Array) for performance and specific I/O scenarios.",
};

export default function TypedArraysJsonBufferArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Binary className="w-8 h-8" /> Using Typed Arrays for JSON Buffer
        Manipulation
      </h1>

      <div className="space-y-6">
        <p>
          JSON is the ubiquitous data interchange format on the web and beyond.
          Typically, we interact with JSON as strings using{" "}
          <code>JSON.parse()</code> and <code>JSON.stringify()</code>. However,
          when dealing with data transmission, file I/O, or performance-critical
          applications, JSON data often exists as raw bytes in a buffer. This is
          where JavaScript&apos;s{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            Typed Arrays
          </a>{" "}
          become incredibly useful for direct manipulation of these binary JSON
          representations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> What are Typed Arrays?
        </h2>
        <p>
          Unlike standard JavaScript arrays, Typed Arrays are designed to hold
          binary data of a specific numerical type, providing efficient access to
          raw binary data. They are built on top of{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>ArrayBuffer</code>
          </a>
          s, which are raw fixed-length binary data buffers.
        </p>
        <p>
          A Typed Array is essentially a &quot;view&quot; into an{" "}
          <code>ArrayBuffer</code>, allowing you to read and write data to it in
          specified formats (like 8-bit unsigned integers, 32-bit signed integers,
          etc.). For text-based data like JSON strings represented as bytes, the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>Uint8Array</code>
          </a>{" "}
          is the most relevant, as it treats the buffer as a sequence of 8-bit
          unsigned integers (bytes).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> JSON as a Sequence of Bytes
        </h2>
        <p>
          Although we think of JSON as text, when it&apos;s stored in memory, sent
          over a network, or read from a file, it exists as a sequence of bytes.
          The mapping from characters to bytes depends on the character encoding,
          with{" "}
          <a
            href="https://en.wikipedia.org/wiki/UTF-8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            UTF-8
          </a>{" "}
          being the standard and most common encoding for JSON.
        </p>
        <p>
          A JSON string like <code>&#x7b;&quot;name&quot;: &quot;Alice&quot;&#x7d;</code>,
          when encoded in UTF-8, becomes a specific sequence of byte values. A{" "}
          <code>Uint8Array</code> is the perfect Typed Array to represent this
          sequence of bytes directly in JavaScript.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          {/* Removed Speedometer as it's not in lucide-react */}Why Manipulate JSON Buffers Directly
          with Typed Arrays?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Performance:</strong> Direct access to raw bytes can be
            faster for certain operations compared to working with JavaScript
            strings, especially in contexts like WebAssembly or Node.js streams.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Integration with Binary Data:</strong> Many I/O APIs (like
            <code>fetch</code> with `response.arrayBuffer()`, Node.js `fs`
            read/write, WebSockets, WebGL, WebAudio) work directly with{" "}
            <code>ArrayBuffer</code> or Typed Arrays. Representing JSON as a
            <code>Uint8Array</code> fits seamlessly into these workflows.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Memory Efficiency:</strong> Typed Arrays can be more memory
            efficient for large datasets compared to standard JavaScript arrays.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Specific Protocols:</strong> Some network protocols might
            interleave JSON metadata with other binary data in a single buffer.
            Typed Arrays allow you to work with the entire buffer efficiently.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Core Operations: Encoding and Decoding
        </h2>
        <p>
          The most common task when dealing with JSON buffers is converting
          between JavaScript strings (what <code>JSON.stringify()</code> produces)
          and the byte representation (a <code>Uint8Array</code>). The standard
          web APIs for this are{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>TextEncoder</code>
          </a>{" "}
          and{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>TextDecoder</code>
          </a>
          . They primarily support UTF-8 encoding.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="inline w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />{" "}
          Converting JSON String to Uint8Array (Encoding)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// A simple JSON string
const jsonString = '&#x7b;&quot;id&quot;: 123, &quot;name&quot;: &quot;Test Item&quot;&#x7d;';

// Create a TextEncoder instance (defaults to UTF-8)
const encoder = new TextEncoder();

// Encode the string into a Uint8Array
const jsonBuffer: Uint8Array = encoder.encode(jsonString);

console.log(jsonBuffer);
// Output will be a Uint8Array showing the byte values,
// e.g., Uint8Array [ 123, 34, 105, 100, ..., 125 ]`}
            </pre>
          </div>
        </div>
        <p>
          This <code>jsonBuffer</code> is now a Typed Array containing the UTF-8
          byte representation of your JSON string. This buffer can be sent over a
          network connection that expects binary data, saved to a file, or passed
          to APIs that operate on buffers.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="inline w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />{" "}
          Converting Uint8Array to JSON String (Decoding)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume jsonBuffer is a Uint8Array containing JSON bytes
// (e.g., the one created in the previous example)

// Create a TextDecoder instance (defaults to UTF-8)
const decoder = new TextDecoder();

// Decode the Uint8Array back into a string
const decodedString: string = decoder.decode(jsonBuffer);

console.log(decodedString);
// Output: '{"id": 123, "name": "Test Item"}'

// Now you can parse the string back into a JavaScript object
const jsonObject = JSON.parse(decodedString);

console.log(jsonObject);
// Output: { id: 123, name: 'Test Item' }`}
            </pre>
          </div>
        </div>
        <p>
          This sequence (buffer to string via <code>TextDecoder</code>, then string
          to object via <code>JSON.parse</code>) is the standard way to process
          received JSON data that arrives as a byte buffer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" /> Advanced Considerations and
          Limitations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" />{" "}
            <strong>Character Encoding:</strong> <code>TextEncoder</code> and{" "}
            <code>TextDecoder</code> default to UTF-8, which is correct for standard
            JSON. Be mindful of encoding if dealing with legacy systems or different
            standards (though rare for JSON).
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" />{" "}
            <strong>Direct Byte-Level JSON Parsing:</strong> Typed Arrays give you
            access to bytes, but they do <em>not</em> replace a JSON parser. Parsing
            JSON involves understanding its grammar (handling nested structures,
            string escapes, number formats, etc.), which is complex to do manually
            at the byte level. You will almost always decode the buffer to a string
            first and then use <code>JSON.parse()</code>.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" />{" "}
            <strong>Node.js Buffer:</strong> In Node.js, the{" "}
            <a
              href="https://nodejs.org/api/buffer.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline dark:text-blue-400"
            >
              <code>Buffer</code>
            </a>{" "}
            class is similar to <code>Uint8Array</code> but with more Node.js-specific
            methods for handling binary data, including built-in string conversion
            with encoding support. Buffers are instances of{" "}
            <code>Uint8Array</code>, so they are interoperable.
          </li>
          <li>
            <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-500" />{" "}
            <strong>Performance Nuances:</strong> While direct byte access can be
            fast, the encoding/decoding steps themselves have costs. The performance
            benefit of using buffers vs. strings depends heavily on the use case,
            data size, and specific operations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database className="w-6 h-6" /> Typical Use Cases
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Network Communication:</strong> Sending or receiving JSON data
            via WebSockets or Fetch API where data is handled as{" "}
            <code>ArrayBuffer</code>s.
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>File Processing:</strong> Reading or writing JSON data from/to
            files using APIs that deal with binary data (e.g., in Electron or Node.js).
          </li>
          <li>
            <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />{" "}
            <strong>Working with IndexedDB or Cache API:</strong> Storing or retrieving
            data that might be more efficiently handled as binary.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Typed Arrays, particularly <code>Uint8Array</code>, provide a powerful
          way to interact with the raw byte representation of JSON data. While you
          won&apos;t typically build a JSON parser directly on bytes yourself, understanding
          how to encode JSON strings into buffers and decode buffers back into
          strings using <code>TextEncoder</code> and <code>TextDecoder</code> is
          essential when working with binary I/O APIs. This approach allows your
          application to handle data efficiently at a lower level, integrating
          JSON seamlessly into binary data pipelines.
        </p>
      </div>
    </>
  );
}