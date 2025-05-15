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
} from "lucide-react"; // Only using allowed icons

export const metadata: Metadata = {
  title: "Chunking Strategies for Large JSON Processing | Offline Tools",
  description:
    "Explore different strategies like streaming and line-by-line processing to handle large JSON files efficiently and avoid excessive memory consumption.",
};

export default function LargeJsonChunkingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Chunking Strategies for Large JSON Processing
      </h1>

      <div className="space-y-6">
        <p>
          Processing large JSON files or streams can quickly exhaust available
          memory, leading to application crashes or poor performance. The
          default method, <code>JSON.parse()</code>, is designed to load the
          entire JSON structure into memory before you can access any part of
          it. This works perfectly for small to medium-sized data, but becomes
          a significant bottleneck with files that are gigabytes in size.
        </p>
        <p>
          <MemoryStick className="inline-block mr-2" /> The problem arises
          because the in-memory representation of a large JSON object or array
          can be many times larger than the file size itself. To handle this
          efficiently, we need strategies that process the data in smaller,
          manageable pieces or "chunks," without loading the whole structure at
          once.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="mr-2" /> Why Standard JSON.parse() Fails
        </h2>
        <p>
          When you call <code>JSON.parse(largeJsonString)</code>, the JavaScript
          engine reads the entire string, parses its syntax, and builds the
          corresponding JavaScript object or array in RAM.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2" /> Typical (Problematic) Approach:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Imagine 'largeJsonString' is a giant string from a file or network
try {
  const data = JSON.parse(largeJsonString);
  // Process 'data' here
  console.log(\`Successfully parsed data with \${data.length} items.\`);
} catch (error) {
  console.error("Failed to parse JSON:", error);
  // Likely an out-of-memory error for large files
}`}
            </pre>
          </div>
          <p className="mt-2">
            For large inputs, this approach is doomed to fail due to memory
            limits.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="mr-2" /> Chunking Strategies
        </h2>
        <p>
          Chunking involves processing the input data incrementally. Instead of
          waiting for the entire JSON string, we process it as it arrives or as
          we read it from disk, often focusing on identifying and processing
          individual elements (like objects in an array, or key-value pairs in
          an object) one at a time.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Workflow className="mr-2" /> 1. Streaming Parsers
        </h3>
        <p>
          Streaming parsers don't build the entire JSON structure in memory.
          Instead, they read the input character by character or byte by byte,
          emitting events as specific JSON elements (like the start of an
          object, the end of an array, a key, a value, etc.) are
          identified. You subscribe to these events and process the data as it's
          parsed.
        </p>
        <p>
          This is the most robust approach for arbitrarily structured large
          JSON. Libraries like <code>streamparser/json</code> (Node.js) or
          <code>jsonstream</code> (Python) implement this.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <FileCode className="mr-2" /> Conceptual Streaming Example (Node.js)
          </h3>
          <p className="text-sm italic mb-3">
            (Illustrates the event-driven concept; requires a streaming library)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { createReadStream } from 'fs';
// import { parser } from '@streamparser/json'; // Conceptual import

// Assume large_data.json is a large file like:
// [ { "id": 1, "value": "A" }, { "id": 2, "value": "B" }, ... ]

async function processLargeJsonFile(filePath: string) {
  const stream = createReadStream(filePath);
  // const jsonParser = parser(); // Instantiate a streaming parser

  let itemCount = 0;

  // Conceptual Event Handlers:
  // jsonParser.on('data', (value: any) => {
  //   // This event fires for each *complete* value found at a specified path,
  //   // e.g., each object within the root array.
  //   console.log('Processing item:', value);
  //   itemCount++;
  //   // Process the 'value' object here - save to DB, aggregate, etc.
  //   // The 'value' itself should be small enough to hold in memory.
  // });

  // jsonParser.on('end', () => {
  //   console.log(\`Finished processing. Total items: \${itemCount}\`);
  // });

  // jsonParser.on('error', (err: Error) => {
  //   console.error('Streaming parser error:', err);
  // });

  // Pipe the file stream into the JSON parser stream
  // stream.pipe(jsonParser);

  // In a real implementation, you would await the stream completion or handle events
  // await new Promise((resolve, reject) => {
  //   stream.on('end', resolve);
  //   stream.on('error', reject);
  // });
}

// Example usage (requires a large file and streaming library):
// processLargeJsonFile('large_data.json').catch(console.error);
`}
            </pre>
          </div>
          <p className="mt-2">
            This approach is highly memory efficient because only the current
            small chunk (the individual item being processed) is in memory at
            any given time.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="mr-2" /> 2. Line-by-Line Processing (for JSON Lines / NDJSON)
        </h3>
        <p>
          A common format for large datasets is{" "}
          <a
            href="http://jsonlines.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            JSON Lines (or Newline Delimited JSON - NDJSON)
          </a>
          . In this format, each line is a complete, valid JSON value (typically
          an object).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example NDJSON structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
{"name": "Charlie", "age": 35}`}
            </pre>
          </div>
          <p className="mt-2">
            This format is incredibly easy to process chunk by chunk. You can
            read the file line by line, and simply call
            <code>JSON.parse()</code> on each individual line. Since each line is
            a small, complete JSON object, <code>JSON.parse()</code> is fast and
            doesn't consume excessive memory per line.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2" /> Conceptual NDJSON Processing Example (Node.js)
          </h3>
          <p className="text-sm italic mb-3">
            (Illustrates line-by-line processing; requires Node.js streams and a readline utility)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processNdjsonFile(filePath: string) {
  const fileStream = createReadStream(filePath);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity // Handle all line endings
  });

  let itemCount = 0;

  // Read the file line by line
  for await (const line of rl) {
    if (line.trim() === '') {
      continue; // Skip empty lines
    }
    try {
      const item = JSON.parse(line);
      // Process the parsed item (which is one JSON object)
      console.log('Processing item:', item);
      itemCount++;
      // The 'item' object is small and fits in memory.
    } catch (error) {
      console.error(\`Error parsing line \${itemCount + 1}: \${line}\`, error);
      // Decide whether to continue or stop on error
    }
  }

  console.log(\`Finished processing. Total items: \${itemCount}\`);
}

// Example usage (requires a large NDJSON file):
// processNdjsonFile('large_data.ndjson').catch(console.error);
`}
            </pre>
          </div>
          <p className="mt-2">
            This is often the simplest and most efficient method if you have
            control over the data format or can convert the large JSON array
            into NDJSON beforehand.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Bug className="mr-2" /> 3. Manual Byte/Character Chunking (Generally Discouraged)
        </h3>
        <p>
          Attempting to manually read a large JSON file in arbitrary byte or
          character chunks (e.g., reading 1MB at a time) and trying to find JSON
          delimiters (like <code>,</code>, <code>&#x7d;</code>,
          <code>]</code>) to split the data is extremely complex and error-prone.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Code className="inline-block mr-2 w-4 h-4" /> A simple comma <code>,</code> might be
            inside a string value (<code>&quot;address&quot;: &quot;123 Main St, Apt 4B&quot;</code>)
            and not a delimiter between objects.
          </li>
          <li>
            <ListTree className="inline-block mr-2 w-4 h-4" /> Nested structures
            (objects within objects, arrays within arrays) make it impossible
            to simply split on delimiters without tracking the parsing state.
          </li>
          <li>
            <BookOpen className="inline-block mr-2 w-4 h-4" /> Multi-byte characters
            (like emojis or characters from non-Latin alphabets) can be split
            across byte chunks, corrupting the data.
          </li>
        </ul>
        <p className="mt-2">
          Unless you are writing a low-level parser library yourself, avoid
          this method. Streaming parsers (Strategy 1) handle these complexities
          for you.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <HandCoins className="mr-2" /> Considerations When Choosing a Strategy
        </h2>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <HardDrive className="inline-block mr-2 w-4 h-4" />{" "}
            <strong>Input Format:</strong> Is the data a single large JSON object/array, or is it
            in a line-delimited format like NDJSON? If it's NDJSON, line-by-line
            processing is easiest. If it's a single large structure, a streaming
            parser is necessary.
          </li>
          <li>
            <Cpu className="inline-block mr-2 w-4 h-4" />{" "}
            <strong>Source of Data:</strong> Are you reading from a file on disk or receiving
            data over a network stream? Streaming parsers work naturally with
            streams.
          </li>
          <li>
            <Folder className="inline-block mr-2 w-4 h-4" />{" "}
            <strong>JSON Structure:</strong> Are you processing a large array of objects
            (common for streaming)? Or a deeply nested structure? Streaming parsers
            can often target specific paths within the JSON to extract only the
            data you need, ignoring irrelevant parts.
          </li>
          <li>
            <Bug className="inline-block mr-2 w-4 h-4" />{" "}
            <strong>Error Handling:</strong> How should errors (like malformed JSON) be handled?
            Streaming parsers provide error events. Line-by-line processing
            allows you to handle errors per line.
          </li>
          <li>
            <CloudDownload className="inline-block mr-2 w-4 h-4" />{" "}
            <strong>Partial Processing:</strong> Do you need to reconstruct parts of the JSON
            structure, or can you process individual values and discard them
            immediately? Streaming parsers allow processing and discarding
            chunks as they are encountered.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Processing large JSON data requires moving beyond the simple
          <code>JSON.parse()</code> approach. Streaming parsers are the most
          flexible and memory-efficient solution for standard large JSON
          structures, processing data piece by piece as it becomes available. If
          your data is or can be converted to the JSON Lines (NDJSON) format,
          a simple line-by-line approach using standard stream/file reading
          utilities is often the easiest and very efficient. Avoid manual
          byte/character chunking unless you are building a parser yourself, as
          it's prone to errors. By choosing the right strategy, you can handle
          datasets far larger than your available memory.
        </p>
      </div>
    </>
  );
}
