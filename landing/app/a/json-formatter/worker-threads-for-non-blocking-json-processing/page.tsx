import type { Metadata } from "next";
import { Cpu, MessageCircle, Code, FileJson2, LoaderCircle, CheckCheck, FileUp, FileDown, Box } from 'lucide-react';


export const metadata: Metadata = {
  title: "Worker Threads for Non-Blocking JSON Processing",
  description: "Learn how to use Node.js Worker Threads to parse and stringify large JSON data without blocking the main event loop, keeping your applications responsive.",
};

// The unused function 'processJsonInWorker' has been removed.


export default function WorkerThreadsJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Cpu className="w-8 h-8 mr-3 text-blue-500" />
        Worker Threads for Non-Blocking JSON Processing
      </h1>

      <div className="space-y-6">
        <p>
          In Node.js, the single-threaded nature of the event loop is generally efficient for I/O-bound tasks.
          However, when faced with heavy, CPU-bound computations like parsing or stringifying very large JSON
          objects, the event loop can become blocked. This means your server cannot handle other incoming requests
          or events until the operation completes, leading to unresponsive applications and potential timeouts.
        </p>
        <p>
          This is where Node.js <strong>Worker Threads</strong> come to the rescue. Worker Threads allow you
          to execute JavaScript code in separate threads, effectively moving CPU-intensive tasks off the main
          event loop. This keeps your application responsive and able to handle concurrent operations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson2 className="w-6 h-6 mr-2 text-green-500" />
          The Blocking Problem with Large JSON
        </h2>
        <p>
          Consider the standard JavaScript built-in methods <code>JSON.parse()</code> and <code>JSON.stringify()</code>.
          While extremely fast for small to moderately sized data, their synchronous nature means that for very
          large strings (tens or hundreds of megabytes), they can take a significant amount of time to complete.
          During this time, the main Node.js thread is busy, unable to process other tasks.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Conceptual Blocking Scenario:</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// Main thread processing requests...
// ... incoming request ...

// Synchronously parse a HUGE JSON string
const hugeJsonString = getHugeJson(); // Imagine this is many MB
console.log("Starting parse (this might block the main thread)...");
const parsedData = JSON.parse(hugeJsonString); // ⚠️ Blocking operation for large data
console.log("Parse finished.");

// ... process parsedData ...

// ... more incoming requests are waiting ...`}
            </pre>
          </div>
        <p>
          If this happens frequently or with sufficiently large data, your application's performance will suffer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Cpu className="w-6 h-6 mr-2 text-purple-500" />
          Introducing Worker Threads
        </h2>
        <p>
          Node.js provides the <code>worker_threads</code> module specifically for this purpose. It allows you
          to spawn new threads, each with its own V8 isolate, capable of running JavaScript code independently
          of the main thread. Communication between the main thread and worker threads happens via a message-passing
          mechanism.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-yellow-500" />
            How Workers Process JSON Non-Blockingly
        </h2>
        <p>
            The strategy is to offload the <code>JSON.parse</code> or <code>JSON.stringify</code> call
            to a worker thread.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>
                The main thread receives the task (e.g., needs to parse large JSON).
            </li>
            <li>
                It creates a new Worker thread.
            </li>
            <li>
                It sends the data (the large JSON string to parse, or the large object to stringify) and the desired operation ('parse' or 'stringify') to the worker using <code>worker.postMessage()</code>. The main thread is now free.
            </li>
            <li>
                The worker thread receives the message via its <code>parentPort.on('message', ...)</code> listener.
            </li>
            <li>
                The worker performs the CPU-intensive task (<code>JSON.parse()</code> or <code>JSON.stringify()</code>) in its own thread. This does not block the main thread.
            </li>
            <li>
                Once the worker finishes, it sends the result (the parsed object or the stringified string) back to the main thread using <code>parentPort.postMessage()</code>.
            </li>
            <li>
                The main thread receives the result via its <code>worker.on('message', ...)</code> listener and continues processing.
            </li>
        </ol>
        <p>
          This pattern effectively moves the heavy computation off the main thread, maintaining application responsiveness.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-teal-500" />
          Basic Worker Thread Example for JSON
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. The Worker File (<code className="break-all">workers/json.worker.ts</code>)</h3>
        <p>
          This file contains the code that runs inside the worker thread. It listens for messages from the main thread, performs the JSON operation, and sends the result back.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// workers/json.worker.ts
import { parentPort, workerData } from 'worker_threads';

// Ensure this script is not run directly without worker_threads context
if (!parentPort) {
  throw new Error('This script must be run as a worker thread.');
}

const { data, operation } = workerData as { data: any; operation: 'parse' | 'stringify' };

try {
  let result;
  if (operation === 'parse') {
    // Perform the potentially blocking parse operation
    result = JSON.parse(data);
  } else if (operation === 'stringify') {
    // Perform the potentially blocking stringify operation
    result = JSON.stringify(data);
  } else {
    throw new Error(\`Unknown operation: \${operation}\`);
  }
  // Send the result back to the main thread
  parentPort.postMessage({ status: 'success', result });
} catch (error: any) {
  // Send any errors back to the main thread
  parentPort.postMessage({ status: 'error', message: error.message, stack: error.stack });
}
`}
            </pre>
          </div>

        <h3 className="text-xl font-semibold mt-6">2. Using the Worker in the Main Thread</h3>
         <p>
           This is the code that would run in your Node.js application or Next.js API route. It creates the worker, sends the data, and waits for the result.
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// In your main Node.js file or Next.js API route handler (e.g., app/api/process/route.ts)
import { Worker } from 'worker_threads';
import path from 'path';

// IMPORTANT: Resolve the worker file path correctly based on your project structure
// and Next.js build output. This might vary.
// For demonstration, assume 'workers' directory at project root.
// In Next.js app router, consider placing workers inside the 'app' directory or using a build step to copy.
// Example using require.resolve (might be more robust in some setups):
// const workerPath = require.resolve('../workers/json.worker');
// Simple path.resolve example:
const workerPath = path.resolve(process.cwd(), 'workers', 'json.worker.js');


async function processLargeJsonNonBlocking(largeJsonString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { data: largeJsonString, operation: 'parse' },
    });

    worker.on('message', (message) => {
      if (message.status === 'success') {
        resolve(message.result);
      } else {
        reject(new Error(\`Worker Error: \${message.message}\n\${message.stack}\`));
      }
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(\`Worker stopped with exit code \${code}\`));
      }
    });
  });
}

async function stringifyLargeObjectNonBlocking(largeObject: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: { data: largeObject, operation: 'stringify' },
      });

      worker.on('message', (message) => {
        if (message.status === 'success') {
          resolve(message.result);
        } else {
          reject(new Error(\`Worker Error: \${message.message}\n\${message.stack}\`));
        }
      });

      worker.on('error', (err) => {
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(\`Worker stopped with exit code \${code}\`));
        }
      });
    });
  }


// Example usage (e.g., inside a Next.js API route handler):
// async function handler(req: Request) {
//   try {
//     // Assume req.json() can handle large bodies or you stream it
//     const largeJsonObject = await req.json();
//
//     console.log("Received large object, starting stringify in worker...");
//     // Simulate processing time or other tasks while worker is busy
//     const responsePromise = stringifyLargeObjectNonBlocking(largeJsonObject);
//     console.log("Main thread is free to do other things while worker stringifies.");
//
//     const largeJsonStringResponse = await responsePromise;
//     console.log("Stringify finished in worker.");
//
//     return new Response(largeJsonStringResponse, {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//
//   } catch (error: any) {
//     console.error("API Error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
//
// export { handler as POST }; // Export for Next.js App Router
`}
            </pre>
          </div>
           <p>
             In this setup, the <code>JSON.parse()</code> or <code>JSON.stringify()</code> calls happen entirely within the worker thread, keeping your main application thread responsive.
           </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Box className="w-6 h-6 mr-2 text-orange-500" />
          Message Passing and Data Transfer
        </h2>
        <p>
          Data is passed between the main thread and workers using <code>postMessage()</code>. This uses the
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Structured Clone Algorithm</a>.
          Essentially, the data is copied between threads, not shared. This is why modifying an object in a worker
          does not affect the original object in the main thread (unless using SharedArrayBuffer, which is more
          advanced). For JSON strings and standard JavaScript objects/arrays, this copying is usually fine,
          though it adds a small overhead for very large messages.
        </p>
        <p>
          For extremely large binary data (like Buffers or TypedArrays), <code>postMessage()</code> supports a
          <code>transferList</code> argument to transfer ownership of memory without copying. This is less common
          for typical JSON parsing/stringifying unless your data structure contains such types, but it's a powerful
          optimization for other worker use cases.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileUp className="w-6 h-6 mr-2 text-blue-600" />
          Example 1: Parsing Large Incoming JSON
        </h2>
        <p>
          Imagine you receive a large JSON payload in an API request body. Instead of blocking your API route
          while parsing, offload it to a worker.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Conceptual API Route (Server Side):</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// app/api/parse-large-json/route.ts
import { Worker } from 'worker_threads';
import path from 'path'; // Needed to resolve worker file path

// IMPORTANT: Adjust path as necessary for your project structure
const workerPath = path.resolve(process.cwd(), 'workers', 'json.worker.js');

async function parseJsonInWorker(jsonString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { data: jsonString, operation: 'parse' },
    });

    worker.on('message', (message) => {
      if (message.status === 'success') {
        resolve(message.result);
      } else {
        reject(new Error(\`Worker Parse Error: \${message.message}\`));
      }
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(\`Worker stopped with exit code \${code}\`);
        reject(new Error(\`Worker stopped unexpectedly.\`));
      }
    });
  });
}

export async function POST(request: Request) {
  try {
    // Read the request body as text first, as JSON.parse might be the bottleneck
    const largeJsonString = await request.text(); // or read from a stream for truly huge data

    console.log("Received large JSON string, sending to worker for parsing...");

    // Spawn worker and wait for result - Main thread is free during this wait
    const parsedData = await parseJsonInWorker(largeJsonString);

    console.log("Parsing finished in worker.");

    // Send back a response (maybe a confirmation or processed data)
    return new Response(JSON.stringify({ status: 'success', data: parsedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("API Error processing JSON:", error);
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
`}
            </pre>
          </div>
           <p>
             The <code>request.text()</code> might still involve some I/O, but the CPU-bound parsing is
             delegated, keeping your API responsive to other requests while the parsing occurs.
           </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileDown className="w-6 h-6 mr-2 text-red-600" />
          Example 2: Stringifying Large Data for Response
        </h2>
        <p>
          Similarly, if you need to generate a massive JSON string from a large data structure in memory to send
          as an API response, stringifying can also block. Offload it to a worker.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Conceptual API Route (Server Side):</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// app/api/generate-large-json/route.ts
import { Worker } from 'worker_threads';
import path from 'path'; // Needed to resolve worker file path

// IMPORTANT: Adjust path as necessary for your project structure
const workerPath = path.resolve(process.cwd(), 'workers', 'json.worker.js');

async function stringifyObjectInWorker(dataObject: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { data: dataObject, operation: 'stringify' },
    });

    worker.on('message', (message) => {
      if (message.status === 'success') {
        resolve(message.result);
      } else {
        reject(new Error(\`Worker Stringify Error: \${message.message}\`));
      }
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
         console.error(\`Worker stopped with exit code \${code}\`);
         reject(new Error(\`Worker stopped unexpectedly.\`));
      }
    });
  });
}

export async function GET(request: Request) {
  try {
    // Imagine fetching or generating a very large data object
    const largeDataObject = generateOrFetchLargeData(); // This part might still take time depending on data source

    console.log("Large object generated, sending to worker for stringifying...");

    // Spawn worker and wait for result - Main thread is free during this wait
    const largeJsonStringResponse = await stringifyObjectInWorker(largeDataObject);

    console.log("Stringifying finished in worker.");

    // Send back the JSON string response
    return new Response(largeJsonStringResponse, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("API Error generating JSON:", error);
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Placeholder for generating large data
function generateOrFetchLargeData(): any {
    console.log("Generating simulated large data...");
    const data = {
        id: 1,
        name: "Example Dataset",
        items: [] as any[]
    };
    // Create a large array of objects
    for (let i = 0; i < 100000; i++) {
        data.items.push({
            index: i,
            value: Math.random(),
            timestamp: new Date().toISOString(),
            metadata: {
                source: "simulation",
                tags: ["a", "b", "c"].filter(() => Math.random() > 0.5),
                nested: { level: 2, data: [1, 2, 3] }
            },
            description: \`This is item number \${i}\`.repeat(5) // Make strings longer
        });
    }
    console.log(\`Generated \${data.items.length} items.\`);
    return data;
}
`}
            </pre>
          </div>
          <p>
            Again, the potentially blocking <code>JSON.stringify()</code> call is handled in a separate thread,
            keeping the main thread responsive.
          </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LoaderCircle className="w-6 h-6 mr-2 text-indigo-500" />
          Considerations and Trade-offs
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Overhead:</strong> Creating a new worker thread has startup overhead. This technique is most beneficial for tasks that take significantly longer than the worker creation time. For small JSON data, the standard synchronous methods are faster.
          </li>
          <li>
            <strong>Complexity:</strong> Using workers adds complexity to your code compared to simple synchronous calls. You need to manage worker lifecycles, message passing, and error handling across threads.
          </li>
          <li>
            <strong>Memory Usage:</strong> Each worker thread uses its own V8 isolate and memory. While this isolation is key to preventing blocking, spawning too many workers can consume significant system resources. Consider using a worker pool for managing a fixed number of workers for recurrent tasks.
          </li>
          <li>
            <strong>Data Copying:</strong> Data sent via <code>postMessage</code> is copied (unless using <code>transferList</code>). For extremely large messages, this copy operation itself can introduce some overhead. However, for the typical object/string structures of parsed/stringified JSON, this is often acceptable compared to blocking the main thread.
          </li>
          <li>
            <strong>Error Handling:</strong> Robustly catching errors within the worker and propagating them back to the main thread is crucial.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-green-600" />
          Conclusion
        </h2>
        <p>
          For Node.js applications, especially backend services or API routes handling potentially large data
          payloads, using Worker Threads for CPU-bound tasks like heavy JSON parsing or stringifying is a
          powerful pattern to ensure responsiveness and scalability. By moving these operations off the main
          thread, you prevent bottlenecks and keep your event loop free to handle other incoming requests.
          While it adds a layer of complexity, the benefit of a non-blocking architecture for performance-critical
          applications dealing with large data makes it a worthwhile technique to employ.
        </p>
      </div>
    </>
  );
}