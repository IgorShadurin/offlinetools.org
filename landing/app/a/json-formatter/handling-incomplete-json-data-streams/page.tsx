import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about handling incomplete JSON data streams
 */
export const metadata: Metadata = {
  title: "Handling Incomplete JSON Data Streams | Offline Tools",
  description:
    "Learn effective strategies to handle incomplete JSON data streams and maintain data integrity in your applications",
};

/**
 * Article page component for JSON formatter article about handling incomplete JSON data streams
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Incomplete JSON Data Streams</h1>

      <div className="space-y-6">
        <p>
          Working with streaming JSON data presents unique challenges, especially when dealing with incomplete or
          partial data streams. Whether you're building real-time applications, processing large datasets, or consuming
          server-sent events, properly handling incomplete JSON is crucial for maintaining data integrity and
          application stability.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. The Challenge of Incomplete JSON Streams</h2>
        <p>JSON data streams can become incomplete due to various reasons:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Network interruptions during data transmission</li>
          <li>Server timeouts or crashes during data generation</li>
          <li>Rate limiting or bandwidth restrictions</li>
          <li>Chunked transfer encoding with interrupted connections</li>
          <li>Websocket disconnections during streaming</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example of an Incomplete JSON Stream:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "events": [
    {"id": 1, "type": "login", "timestamp": 1625097600},
    {"id": 2, "type": "view_page", "timestamp": 1625097605},
    {"id": 3, "type": "cli`}
          </pre>
          <p className="mt-2">
            <em>The stream was cut off mid-way through the third event, resulting in invalid JSON.</em>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Implementing a Robust JSON Stream Parser</h2>
        <p>
          To handle incomplete JSON streams effectively, you need a more sophisticated approach than simple
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">JSON.parse()</code>. Here's a strategy using a
          buffer-based approach:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            Buffer-Based JSON Stream Processing:
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`class JsonStreamParser {
  constructor() {
    this.buffer = "";
    this.parsedObjects = [];
  }

  // Add new data to the buffer
  feed(chunk) {
    this.buffer += chunk;
    this.tryParse();
  }

  // Try to parse complete JSON objects from the buffer
  tryParse() {
    let startPos = 0;
    let depth = 0;
    let inString = false;
    let escaped = false;
    
    for (let i = 0; i < this.buffer.length; i++) {
      const char = this.buffer[i];
      
      // Handle string state
      if (char === '"' && !escaped) {
        inString = !inString;
      }
      
      // Only count braces when not in a string
      if (!inString) {
        if (char === '{') {
          depth++;
        } else if (char === '}') {
          depth--;
          
          // If depth returns to 0, we have a complete object
          if (depth === 0) {
            const jsonStr = this.buffer.substring(startPos, i + 1);
            try {
              const parsed = JSON.parse(jsonStr);
              this.parsedObjects.push(parsed);
              
              // Move the start position forward
              startPos = i + 1;
            } catch (error) {
              // If parsing fails, just continue
            }
          }
        }
      }
      
      // Track escape characters in strings
      escaped = inString && char === '\\' && !escaped;
    }
    
    // Remove processed data from buffer
    if (startPos > 0) {
      this.buffer = this.buffer.substring(startPos);
    }
  }

  // Get all successfully parsed objects
  getParsedObjects() {
    const objects = [...this.parsedObjects];
    this.parsedObjects = [];
    return objects;
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Using JSON Streaming Libraries</h2>
        <p>
          Rather than implementing your own parser, you can leverage specialized libraries designed for handling JSON
          streams:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Using Streaming Libraries:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Example with the 'oboe.js' library
import oboe from 'oboe';

oboe('/api/events-stream')
  // This triggers when a node matching the pattern is found
  .node('events[*]', (event) => {
    // Process each event as soon as it's parsed
    processEvent(event);
    
    // Return false to release the event from memory
    return false;
  })
  .done((fullResponse) => {
    console.log('Stream complete');
  })
  .fail((error) => {
    // Handle errors, including incomplete streams
    console.error('Stream error:', error);
    
    // Implement recovery strategy
    handleStreamError(error);
  });`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Popular JSON Streaming Libraries</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>JavaScript:</strong> oboe.js, JSONStream, stream-json
            </li>
            <li>
              <strong>Python:</strong> ijson, yajl-py
            </li>
            <li>
              <strong>Java:</strong> Jackson's streaming API, Gson Streams
            </li>
            <li>
              <strong>Go:</strong> json.Decoder with token streaming
            </li>
            <li>
              <strong>Rust:</strong> serde_json streaming parsers
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Implementing Chunk-Based Processing</h2>
        <p>For handling large JSON streams, a chunk-based approach allows you to process elements incrementally:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`async function processJsonStream(readableStream) {
  // Create a reader from the stream
  const reader = readableStream.getReader();
  const decoder = new TextDecoder();
  const parser = new JsonStreamParser();
  
  try {
    while (true) {
      const { value, done } = await reader.read();
      
      if (done) {
        break;
      }
      
      // Convert the chunk to text and feed it to the parser
      const chunk = decoder.decode(value, { stream: true });
      parser.feed(chunk);
      
      // Process any complete objects
      const objects = parser.getParsedObjects();
      for (const obj of objects) {
        await processObject(obj);
      }
    }
    
    // Handle any remaining data in the buffer
    if (parser.buffer.length > 0) {
      console.warn('Stream ended with incomplete data in buffer');
      handleIncompleteData(parser.buffer);
    }
  } catch (error) {
    console.error('Error processing stream:', error);
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Recovery Strategies for Incomplete JSON</h2>
        <p>When you encounter incomplete JSON, there are several recovery strategies:</p>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">5.1 Graceful Degradation</h3>
          <p>Process whatever complete objects you have and acknowledge the incomplete nature of the data.</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`function handleIncompleteStream(parsedObjects, incompleteBuffer) {
  // Work with what we have
  if (parsedObjects.length > 0) {
    processValidObjects(parsedObjects);
  }
  
  // Log the incomplete portion for debugging
  logIncompleteData(incompleteBuffer);
  
  // Inform the user
  notifyUser({
    message: "Some data could not be processed due to an incomplete transmission",
    recoveredItems: parsedObjects.length
  });
}`}
          </pre>

          <h3 className="text-xl font-medium mt-4">5.2 Automatic Completion Attempts</h3>
          <p>For simple cases, you might attempt to complete the JSON structure:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`function attemptJsonCompletion(incompleteJson) {
  // Count opening and closing braces/brackets
  const openBraces = (incompleteJson.match(/{/g) || []).length;
  const closeBraces = (incompleteJson.match(/}/g) || []).length;
  const openBrackets = (incompleteJson.match(/\\[/g) || []).length;
  const closeBrackets = (incompleteJson.match(/\\]/g) || []).length;
  
  // Add missing closing braces/brackets
  let completedJson = incompleteJson;
  for (let i = 0; i < openBraces - closeBraces; i++) {
    completedJson += '}';
  }
  
  for (let i = 0; i < openBrackets - closeBrackets; i++) {
    completedJson += ']';
  }
  
  // Try to parse the completed JSON
  try {
    return JSON.parse(completedJson);
  } catch (error) {
    // If it still fails, return null
    return null;
  }
}`}
          </pre>

          <h3 className="text-xl font-medium mt-4">5.3 Retry Mechanisms</h3>
          <p>Implement retry logic with exponential backoff to attempt retrieving the complete data:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`async function fetchWithRetry(url, maxRetries = 3) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      retries++;
      
      if (retries >= maxRetries) {
        throw new Error(\`Failed after \${maxRetries} attempts: \${error.message}\`);
      }
      
      // Exponential backoff with jitter
      const delay = Math.min(1000 * 2 ** retries + Math.random() * 1000, 10000);
      console.log(\`Retry \${retries} after \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Best Practices for JSON Stream Processing</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Use streaming parsers for large datasets:</strong> Always prefer specialized JSON streaming
            libraries over loading everything into memory.
          </li>
          <li>
            <strong>Implement proper error handling:</strong> Capture and respond to stream interruptions and parser
            errors.
          </li>
          <li>
            <strong>Apply backpressure:</strong> Control the rate of data consumption to prevent memory issues with very
            large streams.
          </li>
          <li>
            <strong>Keep state minimal:</strong> Process objects incrementally rather than accumulating everything
            before processing.
          </li>
          <li>
            <strong>Design for resilience:</strong> Your system should handle partial data gracefully rather than
            failing completely.
          </li>
          <li>
            <strong>Log incomplete segments:</strong> Store problematic JSON fragments for later analysis and debugging.
          </li>
          <li>
            <strong>Consider checkpoints:</strong> For long-running streams, implement checkpointing to resume from the
            last successful position.
          </li>
        </ol>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Server-Side Considerations</h3>
          <p className="mt-2">When designing APIs that stream JSON data, implement these server-side practices:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Send valid JSON objects in each chunk</li>
            <li>Implement proper content-length headers for complete responses</li>
            <li>Use chunked transfer encoding correctly</li>
            <li>Include sequence IDs to help clients detect missing chunks</li>
            <li>Provide resumption tokens for interrupted streams</li>
          </ul>
        </div>
      </div>
    </>
  );
}
