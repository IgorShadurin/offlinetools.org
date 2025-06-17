import type { Metadata } from "next";
import {
  ArrowDownToLine,
  HardDrive,
  Minimize, // Changed from Compress
  Code,
  Bolt,
  Settings,
  Scale,
  Cpu,
  Network,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compression Techniques for Large JSON Documents | Offline Tools",
  description:
    "Explore various compression techniques for handling large JSON payloads, including general-purpose algorithms and binary JSON formats, with practical considerations.",
};

export default function JsonCompressionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Minimize className="w-8 h-8" /> {/* Changed from Compress */}
        <span>Compression Techniques for Large JSON Documents</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Compress Large JSON?</h2>
          <p>
            JSON (JavaScript Object Notation) is a ubiquitous data format, prized for its human-readability and
            simplicity. However, as datasets grow, JSON documents can become very large, leading to several issues:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li className="flex items-start space-x-2">
              <HardDrive className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
              <span>
                <strong>Increased Storage Costs:</strong> Large files consume more disk space on servers and client
                devices.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Network className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
              <span>
                <strong>Higher Bandwidth Usage:</strong> Transferring large JSON documents across networks costs money
                and takes time.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
              <span>
                <strong>Slower Transfer Speeds:</strong> Users experience delays waiting for large payloads to download.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Cpu className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
              <span>
                <strong>Increased Parsing Overhead:</strong> While not directly reduced by general compression, the time
                to download the file impacts the overall time-to-parse. Efficient formats or streaming might help here.
              </span>
            </li>
          </ul>
          <p>
            Compression offers a solution by reducing the byte size of the data being stored or transferred. This
            article explores common techniques developers can use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">General-Purpose Compression</h2>
          <p>
            These algorithms work on raw bytes and are not specific to JSON. They look for repeating patterns in the
            byte stream and replace them with shorter representations (dictionary matching) or use variable-length
            encoding (like Huffman coding) to represent frequent bytes with fewer bits.
          </p>
          <ul className="list-disc pl-6 space-y-4 my-4">
            <li>
              <strong>Gzip (GNU Zip):</strong>
              <p>
                A widely supported standard (RFC 1952, based on DEFLATE RFC 1951). Uses a combination of LZ77 and
                Huffman coding. It's a good balance between compression ratio and speed, and is supported by virtually
                all web browsers and servers.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-3">
                <h3 className="text-lg font-medium mb-2">Server-Side Example (Node.js with Express):</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Using the built-in &#x60;zlib&#x60; module.
                </p>
                <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                  <pre>
                    {`import express from 'express';
import zlib from 'zlib';

const app = express();
const largeJsonData = { /* ... your large JSON object ... */ };
const jsonString = JSON.stringify(largeJsonData);
const jsonBuffer = Buffer.from(jsonString);

app.get('/data', (req, res) => {
  // Check if client supports gzip
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.includes('gzip')) {
    // If client doesn't support, send uncompressed
    res.setHeader('Content-Type', 'application/json');
    return res.send(jsonString);
  }

  // Compress the data
  zlib.gzip(jsonBuffer, (err, buffer) => {
    if (err) {
      // Handle error, maybe send uncompressed
      console.error("Gzip compression failed:", err);
      res.setHeader('Content-Type', 'application/json');
      return res.send(jsonString);
    }

    // Send compressed data
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    res.send(buffer);
  });
});

`}
                  </pre>
                </div>
              </div>
            </li>
            <li>
              <strong>Brotli:</strong>
              <p>
                Developed by Google, Brotli (RFC 7932) often achieves better compression ratios than Gzip, especially
                for text data. It uses a combination of LZ77, Huffman coding, and 2nd order context modelling. It also
                uses a pre-defined dictionary of common words and phrases, which is particularly effective for web
                content like JSON. Support is growing but not as universal as Gzip yet (though modern browsers support
                it). It can be slower to compress but faster to decompress than Gzip.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-3">
                <h3 className="text-lg font-medium mb-2">Server-Side Example (Node.js with Express):</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Using the built-in &#x60;zlib&#x60; module.
                </p>
                <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                  <pre>
                    {`import express from 'express';
import zlib from 'zlib';

const app = express();
const largeJsonData = { /* ... your large JSON object ... */ };
const jsonString = JSON.stringify(largeJsonData);
const jsonBuffer = Buffer.from(jsonString);

app.get('/data', (req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];

  // Prefer brotli if supported, then gzip, then uncompressed
  if (acceptEncoding && acceptEncoding.includes('br')) {
    zlib.brotliCompress(jsonBuffer, (err, buffer) => {
      if (err) {
         console.error("Brotli compression failed:", err);
         // Fallback to gzip or uncompressed
         return handleGzipOrUncompressed(req, res, jsonBuffer);
      }
      res.setHeader('Content-Encoding', 'br');
      res.setHeader('Content-Type', 'application/json');
      res.send(buffer);
    });
  } else {
    handleGzipOrUncompressed(req, res, jsonBuffer);
  }
});

function handleGzipOrUncompressed(req, res, buffer) {
    const acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding && acceptEncoding.includes('gzip')) {
        zlib.gzip(buffer, (err, gzipBuffer) => {
            if (err) {
                console.error("Gzip compression failed:", err);
                // Fallback to uncompressed
                res.setHeader('Content-Type', 'application/json');
                return res.send(buffer); // Send original buffer/string
            }
            res.setHeader('Content-Encoding', 'gzip');
            res.setHeader('Content-Type', 'application/json');
            res.send(gzipBuffer);
        });
    } else {
        // Send uncompressed
        res.setHeader('Content-Type', 'application/json');
        res.send(buffer); // Send original buffer/string
    }
}
`}
                  </pre>
                </div>
              </div>
            </li>
            <li>
              <strong>Zstandard (Zstd):</strong>
              <p>
                Developed by Facebook, Zstd is known for its high compression speeds while maintaining good compression
                ratios. It's often significantly faster for both compression and decompression than Gzip and Brotli,
                though Brotli might achieve slightly better compression on certain text types. It's gaining popularity
                but browser support isn't native; typically used for server-to-server communication or storage.
              </p>
            </li>
          </ul>
          <p className="flex items-center space-x-2 italic text-sm text-gray-600 dark:text-gray-400 mt-4">
            <Scale className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Pros:</strong> Widely supported (Gzip/Brotli), easy to implement on the server and handled
              transparently by browsers via &#x60;Accept-Encoding&#x60;/&#x60;Content-Encoding&#x60; headers. Improves
              transfer speed and reduces bandwidth/storage.
            </span>
          </p>
          <p className="flex items-center space-x-2 italic text-sm text-gray-600 dark:text-gray-400">
            <Bolt className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Cons:</strong> Compression ratio limited by the repetitive nature of text-based JSON (keys repeat,
              whitespace, etc.). Doesn't reduce JSON parsing time on the client (client still gets text JSON after
              decompression).
            </span>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">JSON-Specific & Binary Compression</h2>
          <p>
            These techniques leverage the inherent structure of JSON to achieve better compression or more efficient
            processing.
          </p>
          <ul className="list-disc pl-6 space-y-4 my-4">
            <li>
              <strong>Schema-Based Compression:</strong>
              <p>
                If you know the structure of your JSON data (i.e., you have a schema), you can compress it more
                effectively. Techniques include:
              </p>
              <ul className="list-circle pl-6 space-y-2 my-2">
                <li>
                  <strong>Key Removal/Shortening:</strong> Instead of sending verbose keys like
                  &#x60;"userProfileDetails"&#x60; repeatedly, you could send an index or a shorter key like
                  &#x60;"u0"&#x60; or even omit keys if the order is fixed based on the schema.
                </li>
                <li>
                  <strong>Value Encoding:</strong> Represent common string values with integers, or use more efficient
                  numeric or date formats than JSON's default string representations.
                </li>
              </ul>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-3">
                <h3 className="text-lg font-medium mb-2">Conceptual Schema-Based Example:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Original JSON vs. a simplified compressed version based on a known schema.
                </p>
                <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                  <pre>
                    {`// Original JSON (verbose keys)
{
  "userDetails": {
    "userId": 123,
    "userName": "Alice",
    "isActive": true
  },
  "orderHistory": [
    { "orderId": "A456", "amount": 100.50, "currency": "USD" } ,
    { "orderId": "B789", "amount": 25.00, "currency": "EUR" }
  ]
}

// Schema mapping:
// userDetails -> u
// userId -> ui
// userName -> un
// isActive -> ia
// orderHistory -> oh
// orderId -> oi
// amount -> am
// currency -> cu
// USD -> 1
// EUR -> 2

// Compressed JSON (using schema mapping and integer for currency)
{
  "u": {
    "ui": 123,
    "un": "Alice",
    "ia": true
  },
  "oh": [
    { "oi": "A456", "am": 100.50, "cu": 1 } ,
    { "oi": "B789", "am": 25.00, "cu": 2 }
  ]
}
`}
                  </pre>
                </div>
              </div>
            </li>
            <li>
              <strong>Binary JSON Formats:</strong>
              <p>
                These formats abandon the human-readable text format of JSON entirely and encode the data into a compact
                binary representation. They often include type information directly in the byte stream.
              </p>
              <ul className="list-circle pl-6 space-y-2 my-2">
                <li>
                  <a
                    href="https://msgpack.org/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    MessagePack
                  </a>
                  : Designed to be efficient and interoperable. Often smaller and faster to parse than JSON.
                </li>
                <li>
                  <a
                    href="https://developers.google.com/protocol-buffers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Protocol Buffers (Protobuf)
                  </a>
                  : Requires defining a schema (.proto file) beforehand. Extremely efficient in terms of size and
                  parsing speed.
                </li>
                <li>
                  <a
                    href="https://cbor.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    CBOR (Concise Binary Object Representation)
                  </a>
                  : Based on the JSON data model, designed for small code size and message size, suitable for
                  constrained environments.
                </li>
                <li>
                  <a
                    href="https://bsonspec.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    BSON (Binary JSON)
                  </a>
                  : Used by MongoDB. Designed for efficient traversal and update, not necessarily maximum space
                  efficiency compared to others.
                </li>
              </ul>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-3">
                <h3 className="text-lg font-medium mb-2">Conceptual Binary Format Benefit:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Comparing a boolean value in JSON vs. a typical binary format.
                </p>
                <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                  <pre>
                    {`// JSON representation of 'true':
// 4 bytes: 't', 'r', 'u', 'e'

// Typical Binary format representation of boolean true:
// 1 byte: (e.g., 0xC3 in CBOR)
`}
                  </pre>
                </div>
              </div>
            </li>
          </ul>
          <p className="flex items-center space-x-2 italic text-sm text-gray-600 dark:text-gray-400 mt-4">
            <Scale className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Pros:</strong> Can achieve significantly better compression ratios than general methods,
              especially for highly structured or repetitive JSON. Parsing can be much faster as there's no text to
              tokenize/parse. Reduces both transfer size and potentially parsing time.
            </span>
          </p>
          <p className="flex items-center space-x-2 italic text-sm text-gray-600 dark:text-gray-400">
            <Bolt className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Cons:</strong> Requires explicit support on both the server and client (browsers don't natively
              understand these formats). Lose human-readability. Schema-based methods require schema management. Adds
              complexity to the development workflow.
            </span>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Choosing the Right Technique</h2>
          <p>The best approach depends on your specific needs and constraints:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li className="flex items-start space-x-2">
              <ArrowDownToLine className="w-5 h-5 flex-shrink-0 mt-1 text-purple-500" />
              <span>
                <strong>Primarily focused on reducing transfer size over HTTP to browsers:</strong> Start with Gzip and
                Brotli. They are easy to implement and widely supported. Ensure your server is configured correctly
                (e.g., using compression middleware in Express, or server-level settings in Nginx/Apache).
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Cpu className="w-5 h-5 flex-shrink-0 mt-1 text-purple-500" />
              <span>
                <strong>Working with server-to-server communication or offline data storage:</strong> Consider Zstd for
                speed or binary formats (MessagePack, Protobuf, CBOR) for maximum efficiency in size and parsing,
                especially if data structure is consistent.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Code className="w-5 h-5 flex-shrink-0 mt-1 text-purple-500" />
              <span>
                <strong>
                  Dealing with highly repetitive data and need significant gains beyond general compression:
                </strong>{" "}
                Schema-based techniques or binary formats like Protobuf (which require a schema) might be necessary.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Settings className="w-5 h-5 flex-shrink-0 mt-1 text-purple-500" />
              <span>
                <strong>Prioritizing ease of implementation and debugging:</strong> General-purpose compression is
                simpler. Binary formats make inspection harder.
              </span>
            </li>
          </ul>
          <p>
            Often, you can combine techniques. For instance, you could compress a binary JSON payload (like MessagePack)
            using Gzip or Brotli for transfer over HTTP, achieving even better results, although this adds another layer
            of processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Client-Side Considerations</h2>
          <p>
            While server-side compression is common, you might also consider client-side processing, especially in
            Node.js environments or for specific application needs.
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Browser Decompression:</strong> Browsers automatically handle Gzip and Brotli decompression based
              on the &#x60;Content-Encoding&#x60; header. No client-side code is needed for this.
            </li>
            <li>
              <strong>Custom Decompression:</strong> For binary formats or custom schema-based compression, you will
              need client-side code (e.g., JavaScript libraries for MessagePack or Protobuf) to decompress and parse the
              data after it's downloaded.
            </li>
            <li>
              <strong>Compression before Upload:</strong> If clients are uploading large JSON data, you could compress
              it on the client-side before sending it to the server to reduce upload bandwidth/time. This requires
              client-side code (e.g., using the{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Compression Streams API
              </a>{" "}
              or libraries).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            Large JSON documents pose challenges for storage, bandwidth, and transfer speed. General-purpose compression
            like Gzip and Brotli offer a transparent and effective first line of defense for web applications. For
            scenarios requiring maximum efficiency or structured data processing (server-to-server, specific
            applications), binary JSON formats or schema-based compression provide more advanced solutions, albeit with
            increased implementation complexity. Understanding the trade-offs between compression ratio, speed,
            compatibility, and complexity is key to choosing the right technique for your project.
          </p>
        </section>
      </div>
    </>
  );
}
