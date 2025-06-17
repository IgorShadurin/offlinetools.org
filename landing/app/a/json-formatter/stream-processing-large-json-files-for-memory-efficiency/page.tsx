import type { Metadata } from "next";
import { File, Gauge, Waves, Cog, AlertTriangle, Check, MemoryStick } from "lucide-react";

export const metadata: Metadata = {
  title: "Stream Processing Large JSON Files for Memory Efficiency",
  description:
    "Learn how to efficiently process large JSON files without loading the entire file into memory, using streaming techniques in TypeScript/JavaScript.",
};

export default function StreamLargeJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Waves className="w-8 h-8 mr-3 text-blue-500" />
        Stream Processing Large JSON Files for Memory Efficiency
      </h1>

      <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
        <p>
          Handling large files is a common challenge in software development. When dealing with JSON data, simply using{" "}
          <code>JSON.parse()</code> is convenient but quickly becomes impractical for files exceeding the available
          memory. Attempting to load a multi-gigabyte JSON file into the heap can lead to &quot;out of memory&quot;
          errors, crashes, or severely degraded performance. This is where <strong>stream processing</strong> becomes
          essential.
        </p>
        <p>
          Instead of loading the entire file at once, streaming involves reading the file piece by piece, processing
          each piece as it arrives, and discarding it once it's no longer needed. This keeps memory usage constant and
          low, regardless of the file size.
          <Gauge className="inline-block w-5 h-5 ml-1 text-green-500" />
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <MemoryStick className="w-6 h-6 mr-2 text-purple-500" />
          Why Standard Parsing Fails with Large Files
        </h2>
        <p>
          Standard JSON parsing methods like <code>JSON.parse()</code> are &quot;batch&quot; or &quot;tree&quot;
          parsers. They read the entire input (string or buffer) and build a complete in-memory representation of the
          JSON structure (an object or array hierarchy).
        </p>
        <p>For a JSON file like this:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap text-sm">
            <code className="language-json">
              [{/* This array could contain millions of objects */}
              {/* &#x7b; "id": 1, "name": "Alice", "data": "..." &#x7d;, */}
              {/* &#x7b; "id": 2, "name": "Bob", "data": "..." &#x7d;, */}
              {/* ... */}
              {/* &#x7b; "id": 1000000, "name": "Charlie", "data": "..." &#x7d; */}]
            </code>
          </pre>
        </div>
        <p>
          <code>JSON.parse()</code> would attempt to create a giant JavaScript array containing a million objects in
          memory. If each object is even moderately sized, this quickly consumes gigabytes.
          <File className="inline-block w-5 h-5 ml-1 text-blue-500" />
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Waves className="w-6 h-6 mr-2 text-blue-500" />
          The Core Idea of JSON Streaming
        </h2>
        <p>
          Streaming JSON parsing involves reading the input data incrementally. A streaming parser doesn&apos;t build
          the whole tree. Instead, it emits events or calls callbacks as it encounters different parts of the JSON
          structure:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Start of object (`
            {`)</li>
          <li>End of object (`}
            `)
          </li>
          <li>Start of array (`[`)</li>
          <li>End of array (`]`)</li>
          <li>Object key (e.g., `"name"`)</li>
          <li>Primitive value (string, number, boolean, null)</li>
        </ul>
        <p>
          By reacting to these events, you can process data chunks without keeping everything in memory. For example,
          when parsing a large array of objects, you can process each object as it&apos;s completed and then discard it.
          <Cog className="inline-block w-5 h-5 ml-1 text-gray-600 dark:text-gray-400" />
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Cog className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400" />
          Approaches to Streaming JSON
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Event-Based (SAX-like) Parsers</h3>
        <p>
          Similar to SAX (Simple API for XML), these parsers work by notifying your code when specific syntax elements
          are found. You register handlers for events like `onValue`, `onKey`, `onStartObject`, `onEndArray`, etc.
        </p>
        <p>
          <strong>How it works:</strong>
          The parser reads the input stream byte by byte or chunk by chunk. It maintains minimal state to know whether
          it&apos;s inside an object, an array, reading a key, or a value. When it completes parsing a value (a
          primitive, a nested object, or a nested array), it triggers an event with that parsed value. For large arrays
          of objects, you&apos;d typically listen for the event that signals the completion of an object within the main
          array.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Conceptual Event-Based Stream Parsing (Node.js style stream, simplified):
          </h4>
          <pre className="whitespace-pre-wrap text-sm">
            <code className="language-typescript">
              {`
// Conceptual types - not actual imports
// type ReadableStream = any; // Represents a Node.js ReadableStream
// type JsonParser = any; // Represents a streaming JSON parser library instance

async function processLargeJsonArray(readableStream: ReadableStream): Promise&lt;void&gt; {
  // Imagine a streaming JSON parser library
  // const parser: JsonParser = createStreamingJsonParser();

  let itemCount = 0;
  let currentItem: any = null; // To build up one item at a time

  // Conceptual event listeners
  // parser.on('startObject', () => {
  //   currentItem = &#x7b;&#x7d;;
  // });

  // parser.on('endObject', (parsedObject: any) => {
  //   // This event might give you the complete object that just ended
  //   console.log('Processing item:', parsedObject.id);
  //   // Perform actions with the object (e.g., write to DB, process data)
  //   // After processing, 'parsedObject' can be garbage collected.
  //   itemCount++;
  //   currentItem = null; // Clear memory for the next item
  // });

  // parser.on('keyValue', (key: string, value: any) => {
  //    // Some parsers might provide key-value pairs as they are found
  //    if (currentItem) {
  //      currentItem[key] = value;
  //    }
  // });

  // parser.on('error', (err: Error) => {
  //   console.error('Streaming parsing error:', err);
  //   // Handle error, potentially stop processing
  // });

  // parser.on('end', () => {
  //   console.log('Finished processing stream. Total items:', itemCount);
  // });

  // // Pipe the stream to the parser (conceptual)
  // readableStream.pipe(parser);

  console.log("Conceptual example: Streaming parser events would be handled here.");
  console.log("Example: process each object found within a large array.");
  console.log("Memory usage remains low as full objects are processed and discarded.");

  // In a real async scenario, you might await a 'finish' event on the parser
  // await new Promise&lt;void&gt;((resolve, reject) => {
  //   parser.on('end', resolve);
  //   parser.on('error', reject);
  // });
}

// // Example Usage (requires a Node.js ReadableStream and a streaming JSON parser library)
// // import { createReadStream } from 'fs';
// // import { createParser } from 'jsonstream'; // Example library

// // const filePath = 'path/to/your/large.json';
// // const stream = createReadStream(filePath);
// // const parser = createParser(['*']); // This targets elements within the root array

// // parser.on('data', (item: any) => {
// //   // 'item' is a parsed object from the root array
// //   console.log('Processing item:', item.id);
// //   // Process item...
// // });

// // parser.on('end', () => {
// //   console.log('Finished streaming.');
// // });

// // parser.on('error', (err: Error) => {
// //   console.error('Streaming error:', err);
// // });

// // stream.pipe(parser);
`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>
              Note: This is a conceptual example showing the pattern. Actual implementation requires a streaming JSON
              parser library designed for Node.js streams or similar asynchronous I/O. Libraries like{" "}
              <code>jsonstream</code> or <code>clarinet</code> provide this functionality.
            </em>
          </p>
        </div>
        <p>
          This method is generally the most memory-efficient because you only ever hold one complete object/value in
          memory at a time (or parts of one value being built).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Character-by-Character or Chunk-by-Chunk Parsing</h3>
        <p>
          For ultimate control or when libraries aren't suitable, you can read the file in small chunks and manually
          scan for JSON tokens (<code>&#x7b;</code>, <code>&#x7d;</code>, <code>[</code>,<code>]</code>,{" "}
          <code>&quot;</code>, <code>,</code>, <code>:</code>, etc.). You&apos;d need to write logic to track the
          nesting level of objects and arrays and extract complete values (especially strings which can contain escaped
          characters) and then parse those smaller, extracted values using <code>JSON.parse()</code>.
        </p>
        <p>
          <strong>How it works:</strong>
          You read data in small buffers. You scan the buffer, looking for JSON syntax characters. You need to buffer
          data if a token spans across chunk boundaries. When you identify the start and end of a complete JSON value
          (like a single object in a root array), you extract that substring and parse it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Chunk-by-Chunk Processing (Manual Scan):</h4>
          <pre className="whitespace-pre-wrap text-sm">
            <code className="language-typescript">
              {`
// Conceptual types - not actual imports
// type ReadableStream = any; // Represents a Node.js ReadableStream

async function processLargeJsonManually(readableStream: ReadableStream): Promise&lt;void&gt; {
  // This is significantly more complex than using a library!
  let buffer = ''; // Buffer to hold partial data across chunks
  let arrayDepth = 0;
  let objectDepth = 0;
  let inString = false;
  let escapeNext = false;
  let currentItemString = '';
  let capturingItem = false;

  const decoder = new TextDecoder(); // Needed to handle byte streams correctly

  // Conceptual loop over stream chunks
  // for await (const chunk of readableStream) {
  //   buffer += decoder.decode(chunk, { stream: true }); // Append chunk to buffer

  //   let i = 0;
  //   while (i < buffer.length) {
  //     const char = buffer[i];

  //     if (inString) {
  //       if (escapeNext) {
  //         escapeNext = false;
  //       } else if (char === '\\\\') {
  //         escapeNext = true;
  //       } else if (char === '"') {
  //         inString = false;
  //       }
  //     } else {
  //       if (char === '"') {
  //         inString = true;
  //         escapeNext = false;
  //       } else if (char === '[') {
  //         arrayDepth++;
  //         if (arrayDepth === 1 && objectDepth === 0 && !capturingItem) {
  //            // Start capturing the first level array items
  //            capturingItem = true;
  //            currentItemString = '['; // Start building the item string (e.g., the object)
  //         }
  //       } else if (char === ']') {
  //         arrayDepth--;
  //         // Logic to handle end of item/array... complex!
  //       } else if (char === '{') {
  //         objectDepth++;
  //       } else if (char === '}') {
  //         objectDepth--;
  //         // Logic to handle end of item/object... complex!
  //         if (capturingItem && arrayDepth === 1 && objectDepth === 0) {
  //            // Found end of an object within the root array
  //            currentItemString += '}';
  //            try {
  //              const item = JSON.parse(currentItemString);
  //              console.log('Manually parsed item:', item.id);
  //              // Process 'item'...
  //            } catch (parseErr) {
  //              console.error('Failed to parse extracted item:', parseErr);
  //              // Handle error...
  //            }
  //            currentItemString = ''; // Reset for next item
  //            capturingItem = false; // Stop capturing until next item starts (after comma)
  //         }
  //       } else if (char === ',') {
  //         if (capturingItem && arrayDepth === 1 && objectDepth === 0) {
  //            // Found end of an item within the root array (could be object or primitive)
  //            // ... logic to finalize itemString and parse ...
  //            // Then reset and prepare for the next item
  //            capturingItem = true; // Start capturing the next item
  //            currentItemString = '';
  //         } else if (arrayDepth === 1 && objectDepth === 0 && !capturingItem) {
  //           // Found a comma between top-level array items
  //           capturingItem = true; // Prepare to capture the next item
  //           currentItemString = '';
  //         }
  //       }
  //       // Need to handle whitespace and other characters carefully
  //     }

  //     if (capturingItem) {
  //       currentItemString += char;
  //     }

  //     i++;
  //   }
  //   // Keep remaining buffer if any
  //   buffer = buffer.substring(i);
  // }

  // // Handle any remaining buffer after stream ends
  // buffer += decoder.decode(undefined, { stream: false });
  // // Final parsing logic for anything left... very complex.

  console.log("Conceptual example: Manual chunk processing is complex.");
  console.log("Requires careful state tracking (string, escape, depths, etc.).");
  console.log("You manually find item boundaries and then parse the item substring.");
}
`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>
              Note: This manual approach is very complex and error-prone compared to using a battle-tested library. It
              requires careful handling of string escapes, nested structures, and chunk boundaries. It's shown
              conceptually to illustrate the underlying mechanism.
            </em>
          </p>
        </div>
        <p>
          While offering fine-grained control, this approach is significantly more difficult to implement correctly
          compared to using an existing streaming parser library.
          <AlertTriangle className="inline-block w-5 h-5 ml-1 text-yellow-500" />
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Check className="w-6 h-6 mr-2 text-green-500" />
          Benefits of Streaming
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Memory Efficiency:</strong> The primary benefit. Prevents out-of-memory errors and allows processing
            files much larger than available RAM.
            <Gauge className="inline-block w-5 h-5 ml-1 text-green-500" />
          </li>
          <li>
            <strong>Faster Start Time:</strong> Processing can begin as soon as the first relevant data chunk arrives,
            without waiting for the entire file to download or load.
          </li>
          <li>
            <strong>Improved Responsiveness:</strong> For applications processing large data in the background,
            streaming prevents the process from freezing while waiting for full data load.
          </li>
          <li>
            <strong>Handling Infinite Streams:</strong> Essential for processing data from continuous sources (e.g.,
            network sockets) that never "end".
            <Waves className="inline-block w-5 h-5 ml-1 text-blue-500" />
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
          Challenges and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Complexity:</strong> Streaming code is generally more complex than simple `JSON.parse()`. You need
            to manage state and handle events or buffer data correctly.
            <Cog className="inline-block w-5 h-5 ml-1 text-gray-600 dark:text-gray-400" />
          </li>
          <li>
            <strong>Error Handling:</strong> Robust error handling for malformed JSON within a stream is harder than
            catching a single error from `JSON.parse()`. You need to decide how to recover or fail.
          </li>
          <li>
            <strong>Accessing Previous Data:</strong> If processing an item requires data from a previous item in the
            stream, you might need to manually buffer that necessary previous data.
          </li>
          <li>
            <strong>Root Level Primitives:</strong> Streaming is most effective for root-level arrays or objects where
            you can process child elements independently. A root-level primitive or a single giant object still might
            require significant memory for that one item.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Choosing the Right Tool</h2>
        <p>
          For most large JSON streaming tasks in environments with streams (like Node.js backend or modern browser
          streams), using a dedicated streaming JSON parser library is highly recommended. They handle the low-level
          complexity, buffering, state management, and error handling for you, providing a clean event-driven or
          stream-piping interface.
        </p>
        <p>Popular libraries in the Node.js ecosystem include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>jsonstream</code>: A well-known library for piping streams.
          </li>
          <li>
            <code>clarinet</code>: Another robust streaming JSON parser.
          </li>
        </ul>
        <p>Always check the documentation of your chosen library to understand its API and event model.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <File className="w-6 h-6 mr-2 text-blue-500" />
          Example Scenario: Processing User Data
        </h2>
        <p>Imagine a JSON file containing an array of a million user objects:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap text-sm">
            <code className="language-json">
              [{/* &#x7b; "id": 1, "username": "user1", "email": "user1@example.com", "details": {...} &#x7d;,... */}]
            </code>
          </pre>
        </div>
        <p>
          If you just need to iterate through users and perform an action (e.g., validate email, migrate to a database),
          streaming allows you to process each user object one by one as it's parsed, without ever holding all million
          objects in memory simultaneously.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          When faced with large JSON files, recognizing the limitations of standard batch parsing is the first step.
          Stream processing, whether through event-based libraries or careful manual implementation, provides the
          necessary memory efficiency to handle datasets that would otherwise be impossible to process within typical
          memory constraints. By processing data as a continuous flow rather than a single static block, you unlock the
          ability to work with arbitrarily large files.
        </p>
      </div>
    </>
  );
}
