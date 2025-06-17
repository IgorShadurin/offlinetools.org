import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Worker Implementation for Non-Blocking JSON Processing | Offline Tools",
  description:
    "Learn how to use Web Workers to process large JSON data without blocking the main browser thread, ensuring a responsive user interface.",
};

export default function WebWorkerJsonProcessingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Web Worker Implementation for Non-Blocking JSON Processing</h1>

      <div className="space-y-6">
        <p>
          Processing large amounts of data, such as parsing complex JSON structures, can be a computationally intensive
          task. When this processing happens on the main browser thread, it can cause the user interface to freeze,
          leading to a poor user experience. Web Workers provide a solution by allowing scripts to run in background
          threads, completely separate from the main thread. This enables you to perform heavy operations like JSON
          parsing without blocking the UI.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding the Problem: The Blocking Main Thread</h2>
        <p>
          The browser's main thread is responsible for handling user interactions, updating the DOM, running JavaScript,
          and managing paints and layouts. When a long-running script executes on this single thread, it prevents other
          tasks from happening, making the UI unresponsive. This is often noticeable when parsing large JSON files or
          performing complex calculations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Impact of Blocking Operations:</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>UI freezes (buttons don't respond, scrolling is jerky)</li>
            <li>Animations stop</li>
            <li>Perceived application slowness</li>
            <li>Poor user satisfaction</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Introducing Web Workers</h2>
        <p>
          Web Workers are a simple means for web content to run scripts in background threads. Once created, a worker
          can send messages to the main thread and vice versa. They have limited access to browser APIs and the DOM but
          can perform computations, make network requests (via `fetch` or `XMLHttpRequest`), and process data like JSON
          independently.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key Characteristics of Web Workers:</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Run in separate threads</li>
            <li>Cannot access the DOM</li>
            <li>Communicate with the main thread via messages (`postMessage` and `onmessage`)</li>
            <li>
              Have access to `navigator`, `location`, `XMLHttpRequest`/`fetch`, `setTimeout`/`setInterval`, `self`
              (representing the worker's global scope)
            </li>
            <li>Support structured cloning for passing complex data types</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Non-Blocking JSON Parsing with Workers</h2>
        <p>
          To process JSON in a Web Worker, you create a separate JavaScript file for the worker script. The main thread
          initializes the worker, sends the JSON data (usually as a string), and listens for the worker to send the
          parsed data back.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          1. The Worker Script (e.g., <code>json.worker.ts</code>)
        </h3>
        <p>
          This script runs in the background thread. It listens for messages from the main thread, performs the JSON
          parsing, and posts the result or any errors back.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// json.worker.ts (or .js)

self.onmessage = function(event) {
  const { jsonData } = event.data; // Receive data from main thread

  if (typeof jsonData !== 'string') {
    // Send error back if data is not a string
    self.postMessage({ error: 'Invalid data type received. Expected string.' });
    return;
  }

  try {
    // Perform the potentially heavy operation: JSON parsing
    const parsedData = JSON.parse(jsonData);

    // Send the result back to the main thread
    self.postMessage({ result: parsedData });

  } catch (e: any) {
    // Handle parsing errors and send error back
    self.postMessage({ error: \`JSON parsing failed: \${e.message}\` });
  }
};

// Optional: Add error handling for the worker itself
self.onerror = function(errorEvent) {
    self.postMessage({ error: \`Worker error: \${errorEvent.message}\` });
};
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The worker script uses <code>self</code> to refer to its global scope. It listens for the{" "}
            <code>message</code> event, parses the received <code>jsonData</code>, and sends back either the{" "}
            <code>result</code> or an <code>error</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. The Main Thread Script (e.g., within a React component)</h3>
        <p>
          This script creates the worker instance, sends the data to be processed, and handles the messages received
          from the worker.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Inside your React/Next.js component (e.g., in a .tsx file)
// Assuming you have a state variable to store the parsed data or error message

import React, { useState, useEffect } from 'react';

// Define the worker URL using new URL and import.meta.url
// Next.js handles bundling the worker script correctly with this pattern
const jsonWorker = new Worker(new URL('./json.worker.ts', import.meta.url));

function JsonProcessorComponent() {
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Example large JSON string (in a real app, this would be fetched or large input)
  const largeJsonString = \`{\
  "users": [\
    {\
      "id": 1,\
      "name": "Alice",\
      "details": {"age": 30, "city": "New York"}\
    },\
    {\
      "id": 2,\
      "name": "Bob",\
      "details": {"age": 25, "city": "Los Angeles"}\
    }\
    // ... imagine thousands more entries ...
  ]\
}\`; // A simplified example; real large JSON would be much bigger

  useEffect(() => {
    // Listen for messages from the worker
    jsonWorker.onmessage = (event) => {
      setIsLoading(false); // Processing finished

      if (event.data.error) {
        setError(event.data.error);
        setParsedJson(null);
      } else if (event.data.result) {
        setParsedJson(event.data.result);
        setError(null);
      }
    };

    // Listen for errors from the worker itself (e.g., script loading issues)
    jsonWorker.onerror = (err) => {
        setIsLoading(false);
        setError(\`Worker initialization error: \${err.message}\`);
        setParsedJson(null);
        console.error('Worker error:', err);
    };


    // Clean up the worker when the component unmounts
    return () => {
      jsonWorker.terminate(); // Stop the worker thread
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const processJson = () => {
    setIsLoading(true);
    setError(null);
    setParsedJson(null);

    // Send the large JSON string to the worker for processing
    jsonWorker.postMessage({ jsonData: largeJsonString });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={processJson}
        disabled={isLoading}
        className={\`px-4 py-2 rounded \${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold\`}
      >
        {isLoading ? 'Processing...' : 'Process JSON with Web Worker'}
      </button>

      {isLoading && <p>Processing JSON in background... UI is responsive.</p>}

      {error && (
        <div className="text-red-600 dark:text-red-400">
          <h3 className="font-medium">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {parsedJson && (
        <div className="bg-green-100 p-3 rounded dark:bg-green-800 dark:text-white overflow-x-auto">
          <h3 className="font-medium text-green-800 dark:text-green-200">Parsed Data:</h3>
          <pre className="text-sm">{JSON.stringify(parsedJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default JsonProcessorComponent; // Export this component for your page
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The main component creates a <code>new Worker</code> instance, sends the data using{" "}
            <code>worker.postMessage()</code>, and listens for the response using <code>worker.onmessage</code>. It also
            includes cleanup using <code>worker.terminate()</code>
            in the <code>useEffect</code> hook's cleanup function.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Benefits of Using Web Workers for JSON Parsing</h2>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Improved Responsiveness:</span> The most significant benefit is keeping the UI
            smooth and responsive while heavy processing occurs in the background.
          </li>
          <li>
            <span className="font-medium">Better Performance (Perceived and Actual):</span> By offloading work, the main
            thread is free to handle animations, scrolling, and user input, making the application feel faster. In
            multi-core environments, parallel execution can also provide actual performance gains for compute-bound
            tasks.
          </li>
          <li>
            <span className="font-medium">Resource Utilization:</span> Tasks that previously monopolized the main thread
            can now utilize separate CPU cores more effectively where available.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Considerations and Limitations</h2>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Communication Overhead:</span> Passing data between the main thread and a
            worker involves copying the data using the structured clone algorithm. For extremely large datasets or very
            frequent small messages, this overhead might be non-trivial. Transferable objects can help reduce this cost
            for certain data types (like ArrayBuffers).
          </li>
          <li>
            <span className="font-medium">No DOM Access:</span> Workers cannot directly manipulate the DOM. Results must
            be sent back to the main thread for UI updates.
          </li>
          <li>
            <span className="font-medium">Limited API Access:</span> Workers have a restricted set of APIs available
            compared to the main window context.
          </li>
          <li>
            <span className="font-medium">Debugging:</span> Debugging code running in a worker thread can sometimes be
            slightly more involved than debugging code on the main thread, although browser developer tools have good
            support for it.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Web Workers offer a powerful and effective way to handle computationally expensive tasks like parsing large
          JSON datasets without freezing the user interface. By moving JSON processing to a separate thread, you ensure
          your application remains responsive, providing a much better experience for your users. While there is a
          slight learning curve and some communication overhead, the benefits of a non-blocking UI for heavy processing
          tasks often far outweigh these considerations. Implement Web Workers strategically for tasks that require
          significant processing power to unlock the full potential of multi-threaded JavaScript in the browser.
        </p>
      </div>
    </>
  );
}
