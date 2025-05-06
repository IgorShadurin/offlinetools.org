import type { Metadata } from "next";

/**
 * Metadata for the article
 */
export const metadata: Metadata = {
  title: "Parsing Large JSON Files: Error Handling and Performance | Offline Tools",
  description:
    "Learn effective strategies for handling errors and optimizing performance when parsing large JSON files across different programming environments.",
};

/**
 * Article page component
 */
export default function ParsingLargeJsonFilesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Parsing Large JSON Files: Error Handling and Performance</h1>

      <div className="space-y-6">
        <p>
          While JSON is an excellent format for data interchange, handling large JSON files presents unique challenges.
          As file sizes grow into megabytes or even gigabytes, standard parsing approaches can lead to memory issues,
          timeouts, and hard-to-debug errors. This article explores practical strategies for efficiently parsing large
          JSON files, handling common errors, and optimizing performance across different programming environments.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Challenges with Large JSON Files</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Memory limitations</strong>: Loading the entire file into memory can cause out-of-memory errors
            </li>
            <li>
              <strong>Parsing timeouts</strong>: Processing large amounts of data can exceed timeout limits
            </li>
            <li>
              <strong>Error location identification</strong>: Finding syntax errors in large files can be difficult
            </li>
            <li>
              <strong>Browser limitations</strong>: Web browsers have stricter memory constraints than server
              environments
            </li>
            <li>
              <strong>Network bottlenecks</strong>: Transferring large JSON files can cause latency and timeout issues
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Errors When Parsing Large JSON</h2>

        <h3 className="text-xl font-semibold mt-6">1. Memory-Related Errors</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript
// "JavaScript heap out of memory"
const largeJsonString = fs.readFileSync('large-file.json', 'utf8');
const parsedData = JSON.parse(largeJsonString); // May crash with large files

// Python
# "MemoryError: Unable to allocate X MiB for an array with shape (Y,) and data type Z"
with open('large-file.json', 'r') as file:
    data = json.load(file)  // Can exhaust available memory

// Java
// "java.lang.OutOfMemoryError: Java heap space"
String jsonString = new String(Files.readAllBytes(Paths.get("large-file.json")));
JSONObject jsonObject = new JSONObject(jsonString);  // May exceed heap size`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Timeout Errors</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Web API timeout
// "Error: Request timed out after 30000ms"
const response = await fetch('/api/large-json-data');
const data = await response.json();  // May time out with large responses

// Server timeout
// "Error: ETIMEDOUT: Connection timed out"
app.get('/large-data', (req, res) => {
  const largeData = processVeryLargeJson();  // May exceed server timeout
  res.json(largeData);
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Syntax Errors in Large Files</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript
// "SyntaxError: Unexpected token } in JSON at position 10485760"
try {
  const data = JSON.parse(largeJsonString);
} catch (error) {
  console.error("Error parsing JSON:", error);
  // Hard to identify exactly where the error occurred in a large file
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Strategies for Handling Large JSON Files</h2>

        <h3 className="text-xl font-semibold mt-6">1. Streaming Parsers</h3>

        <p>Streaming parsers process JSON incrementally without loading the entire file into memory:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JavaScript with stream-json:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const fs = require('fs');
const { parser } = require('stream-json');
const { streamValues } = require('stream-json/streamers/StreamValues');

const pipeline = fs.createReadStream('large-file.json')
  .pipe(parser())
  .pipe(streamValues());

let count = 0;
pipeline.on('data', data => {
  // Process each value as it arrives
  count++;
  // You can filter, transform, or store specific parts here
});

pipeline.on('end', () => console.log(\`Processed \${count} items\`));`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Python with ijson:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import ijson

with open('large-file.json', 'rb') as f:
    # Process items as they're parsed from the stream
    for item in ijson.items(f, 'item'):
        # For an array of objects, 'item' would be each object
        process_item(item)
        
    # Or extract specific fields using paths
    for email in ijson.items(f, 'users.item.email'):
        # Just process the email fields from each user
        add_to_mailing_list(email)`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Chunked Processing</h3>

        <p>Breaking down large files into manageable chunks:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Node.js example of reading and processing in chunks
const fs = require('fs');
const readline = require('readline');

// For a JSON file with one object per line (JSON Lines format)
async function processLargeJsonLines(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      // Parse and process each line independently
      const jsonObj = JSON.parse(line);
      processObject(jsonObj);
    } catch (error) {
      console.error(\`Error processing line: \${error.message}\`);
      // Continue with next line
    }
  }
}

processLargeJsonLines('large-data.jsonl');`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Pagination for API Responses</h3>

        <p>When serving large JSON data through APIs, implement pagination:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Express.js API with pagination
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const offset = (page - 1) * limit;
  
  // Example with database query
  db.query('SELECT * FROM users LIMIT ? OFFSET ?', 
    [limit, offset], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      db.query('SELECT COUNT(*) AS total FROM users', (err, countResult) => {
        const total = countResult[0].total;
        
        res.json({
          data: results,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            current: page,
            perPage: limit
          }
        });
      });
  });
});`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Error Handling Strategies</h2>

        <h3 className="text-xl font-semibold mt-6">1. Incremental Validation</h3>

        <p>Validate JSON data in smaller chunks to pinpoint errors more easily:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript function to find JSON syntax errors with line numbers
function findJsonErrorLocation(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    // Extract position from error message
    const match = /position\\s+(\\d+)/.exec(error.message);
    if (!match) {
      return { valid: false, error: error.message };
    }
    
    const position = parseInt(match[1]);
    let lineNumber = 1;
    let charInLine = 1;
    
    // Count lines until position
    for (let i = 0; i < position; i++) {
      if (jsonString[i] === '\\n') {
        lineNumber++;
        charInLine = 1;
      } else {
        charInLine++;
      }
    }
    
    // Extract the problematic line
    const lines = jsonString.split('\\n');
    const errorLine = lines[lineNumber - 1];
    
    return {
      valid: false,
      error: error.message,
      lineNumber,
      charInLine,
      errorLine,
      preview: errorLine.substring(0, charInLine) + ' << ERROR >> ' + 
               errorLine.substring(charInLine)
    };
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Try-Parse Pattern</h3>

        <p>Implement robust error handling with fallback mechanisms:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// TypeScript example with strong error handling
interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    line?: number;
    position?: number;
  };
}

function tryParseJson<T>(jsonString: string): ParseResult<T> {
  try {
    const data = JSON.parse(jsonString) as T;
    return { success: true, data };
  } catch (error) {
    // Extract error details
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    const posMatch = /position\\s+(\\d+)/.exec(errorMsg);
    const position = posMatch ? parseInt(posMatch[1]) : undefined;
    
    // Calculate line number if position is available
    let line: number | undefined = undefined;
    if (position !== undefined) {
      line = (jsonString.substring(0, position).match(/\\n/g) || []).length + 1;
    }
    
    return { 
      success: false, 
      error: { 
        message: errorMsg,
        line,
        position 
      }
    };
  }
}

// Usage with automatic error handling
const result = tryParseJson<UserData>(jsonString);
if (result.success) {
  processUserData(result.data);
} else {
  console.error(\`JSON parsing failed: \${result.error?.message}\`);
  if (result.error?.line) {
    console.error(\`Error on line \${result.error.line}\`);
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Performance Optimization Techniques</h2>

        <h3 className="text-xl font-semibold mt-6">1. JSON Streaming vs. DOM Parsing</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 text-left">Approach</th>
                <th className="p-2 text-left">Pros</th>
                <th className="p-2 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-300 dark:border-gray-600">
                <td className="p-2 font-medium">
                  DOM Parsing
                  <br />
                  (e.g., JSON.parse)
                </td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    <li>Simple API</li>
                    <li>Random access to data</li>
                    <li>Easier to work with</li>
                  </ul>
                </td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    <li>High memory usage</li>
                    <li>Slow for large files</li>
                    <li>All-or-nothing parsing</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-300 dark:border-gray-600">
                <td className="p-2 font-medium">
                  Streaming
                  <br />
                  (e.g., stream-json, ijson)
                </td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    <li>Low memory usage</li>
                    <li>Faster processing start</li>
                    <li>Works with any size file</li>
                  </ul>
                </td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    <li>More complex API</li>
                    <li>Sequential access only</li>
                    <li>Harder to handle references</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Using Specialized Libraries</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-4">
            <li>
              <strong>JavaScript/Node.js:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>
                  <code>stream-json</code> - Streaming JSON parser with low memory footprint
                </li>
                <li>
                  <code>JSONStream</code> - Streaming JSON.parse and stringify
                </li>
                <li>
                  <code>big-json</code> - Transform streams for very large JSON objects
                </li>
              </ul>
            </li>
            <li>
              <strong>Python:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>
                  <code>ijson</code> - Iterative JSON parser with multiple backends
                </li>
                <li>
                  <code>jsonlines</code> - Library for handling JSON Lines format
                </li>
                <li>
                  <code>orjson</code> - Fast JSON library with optimized parsing
                </li>
              </ul>
            </li>
            <li>
              <strong>Java:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>
                  <code>Jackson</code> with streaming API - Incremental parsing
                </li>
                <li>
                  <code>Gson</code> with JsonReader - Streaming mode for large files
                </li>
                <li>
                  <code>json-iterator</code> - High-performance alternative to standard parsers
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. JSON Lines Format</h3>

        <p>Consider using the JSON Lines format (JSONL) for large datasets, where each line is a valid JSON object:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"name": "Alice", "age": 30, "email": "alice@example.com"}
{"name": "Bob", "age": 25, "email": "bob@example.com"}
{"name": "Charlie", "age": 35, "email": "charlie@example.com"}
{"name": "Diana", "age": 28, "email": "diana@example.com"}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">This format is easier to process incrementally and allows for partial parsing.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Browser-Specific Considerations</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Challenges in browser environments:</h3>
          <ul className="list-disc ml-6 space-y-2 mt-2">
            <li>Stricter memory limitations compared to server environments</li>
            <li>Single-threaded execution model can block the UI</li>
            <li>Different browser implementations with varying performance</li>
          </ul>

          <h3 className="text-lg font-medium mt-4">Solutions:</h3>
          <ul className="list-disc ml-6 space-y-2 mt-2">
            <li>
              <strong>Web Workers</strong>: Offload JSON parsing to background threads
            </li>
            <li>
              <strong>Chunked Loading</strong>: Load data in smaller batches via pagination
            </li>
            <li>
              <strong>Progressive Rendering</strong>: Display results as they become available
            </li>
            <li>
              <strong>IndexedDB</strong>: Store portions of large datasets locally for faster access
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Using Web Worker for JSON parsing
// main.js
const worker = new Worker('json-parser-worker.js');

worker.onmessage = function(e) {
  if (e.data.error) {
    console.error('Parsing error:', e.data.error);
    showErrorMessage(e.data.error);
  } else {
    console.log('Parsing complete:', e.data.stats);
    displayResults(e.data.results);
  }
};

// Start parsing
function parseJsonFile(file) {
  worker.postMessage({ action: 'parse', file });
  showLoadingIndicator();
}

// json-parser-worker.js
self.onmessage = async function(e) {
  if (e.data.action === 'parse') {
    try {
      const file = e.data.file;
      const text = await file.text();
      
      // Parse in chunks to avoid blocking
      const chunkSize = 1000; // items per chunk
      const allData = JSON.parse(text);
      
      if (Array.isArray(allData)) {
        // Process and send back results in batches
        for (let i = 0; i < allData.length; i += chunkSize) {
          const chunk = allData.slice(i, i + chunkSize);
          
          // Process each chunk
          const processedChunk = processData(chunk);
          
          // Send progress update
          self.postMessage({ 
            progress: Math.min(100, Math.round((i + chunk.length) / allData.length * 100)),
            results: processedChunk,
            stats: { processed: i + chunk.length, total: allData.length }
          });
          
          // Allow other operations to proceed
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      } else {
        // Handle non-array data
        const processed = processData(allData);
        self.postMessage({ results: processed, stats: { type: 'object' } });
      }
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  }
};

function processData(data) {
  // Apply transformations, filtering, etc.
  return data;
}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Performance Tips:</h3>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 dark:text-yellow-200">
            <li>Consider using binary formats (like MessagePack, BSON, or Protocol Buffers) for very large datasets</li>
            <li>Implement server-side filtering to reduce the amount of data sent to clients</li>
            <li>Use compression (gzip/deflate) for JSON data transferred over networks</li>
            <li>Profile your JSON parsing performance with realistic data samples</li>
            <li>For frequently accessed data structures, consider pre-parsing and caching</li>
          </ul>
        </div>
      </div>
    </>
  );
}
