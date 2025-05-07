import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about timeout errors with large files
 */
export const metadata: Metadata = {
  title: "Timeout Errors When Formatting Extremely Large JSON Files | Offline Tools",
  description: "Learn strategies to overcome timeout errors when formatting extremely large JSON files and optimize your JSON processing workflow",
};

/**
 * Article page component for JSON formatter article about timeout errors with large files
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Timeout Errors When Formatting Extremely Large JSON Files</h1>

      <div className="space-y-6">
        <p>
          Working with extremely large JSON files can quickly push browsers, formatters, and parsers to their limits,
          resulting in frustrating timeout errors. Whether you're dealing with data exports, configuration files, or API
          responses, these timeouts can significantly disrupt your workflow. This article explores why these timeouts
          occur and provides practical solutions to overcome them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Understanding JSON Timeout Errors</h2>
        <p>
          When working with large JSON files, you might encounter several types of timeout errors:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Timeout Errors:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Browser Script Timeouts:</strong> "Script took too long to execute"</li>
            <li><strong>Server-Side Timeouts:</strong> "504 Gateway Timeout" or "Request timed out"</li>
            <li><strong>Memory Limits:</strong> "Out of memory" or "JavaScript heap out of memory"</li>
            <li><strong>Parser Failures:</strong> "JSON.parse: unexpected end of data"</li>
            <li><strong>UI Freezing:</strong> Browser becomes unresponsive during parsing/formatting</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Why JSON Formatting Can Time Out</h2>
        <p>
          JSON formatting operations can time out for several reasons:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Single-Threaded JavaScript:</strong> In browsers, JSON parsing runs on the main thread, blocking other operations
          </li>
          <li>
            <strong>Memory Consumption:</strong> Large JSON objects can consume significant memory during parsing
          </li>
          <li>
            <strong>Pretty-Printing Overhead:</strong> Adding indentation and spacing increases processing time
          </li>
          <li>
            <strong>Deep Nesting:</strong> Deeply nested structures require more recursive processing
          </li>
          <li>
            <strong>Browser Limitations:</strong> Browsers often have built-in timeouts for scripts
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example Timeout Scenario:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Attempting to format a 50MB JSON file in browser
const rawJson = await fetch('/api/large-dataset');
const jsonText = await rawJson.text();

// This line may cause a timeout
const formattedJson = JSON.stringify(JSON.parse(jsonText), null, 2);

// Browser might show: "A script on this page is taking a long time to respond"`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Chunked Processing Approach</h2>
        <p>
          One of the most effective ways to handle large JSON files is to break the processing into smaller chunks
          and yield control back to the browser between chunks.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Chunked JSON Processing:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Format large JSON string with chunked processing
 * @param {string} jsonString - Raw JSON string to format
 * @param {number} chunkSize - Number of characters to process per chunk
 * @returns {Promise<string>} Formatted JSON string
 */
async function chunkFormatJson(jsonString, chunkSize = 100000) {
  // Parse in one step (still necessary)
  const parsed = JSON.parse(jsonString);
  
  // But stringify in chunks
  return new Promise((resolve) => {
    // Use the replacer to track progress
    let result = '';
    let index = 0;
    
    function processChunk() {
      const startTime = Date.now();
      
      // Process until we hit the time limit or complete the task
      while (index < jsonString.length) {
        // Get a chunk of the parsed object
        const chunk = JSON.stringify(
          parsed, 
          null, 
          2
        ).slice(index, index + chunkSize);
        
        result += chunk;
        index += chunk.length;
        
        // Check if we've been processing for too long
        if (Date.now() - startTime > 50) {
          // Yield control back to the browser and continue later
          setTimeout(processChunk, 0);
          return;
        }
      }
      
      // We've processed everything
      resolve(result);
    }
    
    // Start processing
    processChunk();
  });
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Web Workers for Background Processing</h2>
        <p>
          Web Workers allow you to move JSON processing off the main thread, keeping your UI responsive.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Main Script (app.js):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Format large JSON using a Web Worker
 * @param {string} jsonString - The JSON string to format
 * @returns {Promise<string>} Formatted JSON
 */
function formatLargeJsonWithWorker(jsonString) {
  return new Promise((resolve, reject) => {
    // Create a new worker
    const worker = new Worker('json-formatter-worker.js');
    
    // Set up event handlers
    worker.onmessage = function(e) {
      // Worker sent back the formatted result
      resolve(e.data.formattedJson);
      
      // Terminate the worker
      worker.terminate();
    };
    
    worker.onerror = function(error) {
      reject(new Error('Worker error: ' + error.message));
      worker.terminate();
    };
    
    // Send the JSON string to the worker
    worker.postMessage({ jsonString });
  });
}

// Usage
document.getElementById('formatButton').addEventListener('click', async () => {
  const jsonInput = document.getElementById('jsonInput').value;
  
  try {
    // Show loading indicator
    document.getElementById('status').textContent = 'Processing...';
    
    // Format using worker
    const formattedJson = await formatLargeJsonWithWorker(jsonInput);
    
    // Display result
    document.getElementById('jsonOutput').textContent = formattedJson;
    document.getElementById('status').textContent = 'Complete!';
  } catch (error) {
    document.getElementById('status').textContent = 'Error: ' + error.message;
  }
});`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 mt-6">
          <h3 className="text-lg font-medium">Worker Script (json-formatter-worker.js):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Web Worker for formatting JSON
 * This runs in a separate thread from the main UI
 */
self.onmessage = function(e) {
  try {
    const { jsonString } = e.data;
    
    // Parse and format
    const parsedJson = JSON.parse(jsonString);
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    
    // Send the result back to the main thread
    self.postMessage({ formattedJson });
  } catch (error) {
    // Report any errors
    self.postMessage({ error: error.message });
  }
};`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Streaming JSON Parser Approach</h2>
        <p>
          For extremely large files, using a streaming JSON parser can help avoid loading the entire file into memory.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Using a Streaming Parser:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Using a library like 'stream-json' for Node.js
import { parser } from 'stream-json';
import { pick } from 'stream-json/filters/Pick';
import { streamValues } from 'stream-json/streamers/StreamValues';
import * as fs from 'fs';

/**
 * Format parts of a large JSON file without loading the entire file
 * @param {string} filePath - Path to the large JSON file
 * @param {string} targetPath - Property path to extract (e.g., 'data.users')
 */
function processLargeJsonFile(filePath, targetPath) {
  let count = 0;
  
  // Create a readable stream from the file
  const pipeline = fs.createReadStream(filePath)
    .pipe(parser())
    .pipe(pick({ filter: targetPath }))
    .pipe(streamValues());
  
  // Process each value as it comes in
  pipeline.on('data', (data) => {
    // Process this piece of data
    const value = data.value;
    console.log(\`Processing item \${++count}: \${JSON.stringify(value).substring(0, 50)}...\`);
    
    // Perform any needed operations on this value
    // Without loading the entire file
  });
  
  pipeline.on('end', () => {
    console.log(\`Finished processing \${count} items\`);
  });
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Server-Side Processing Solutions</h2>
        <p>
          When browser-based solutions aren't enough, consider server-side processing for large JSON files.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example Node.js Server Endpoint:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json({ limit: '100mb' }));  // Increase payload limit

/**
 * Endpoint to format large JSON files
 */
app.post('/api/format-json', (req, res) => {
  try {
    // Get JSON text from request body
    const rawJson = req.body.json;
    
    // Set a longer timeout for this request (10 minutes)
    req.setTimeout(600000);
    
    // Parse and format with a high space allocation
    // Node.js handles large objects better than browsers
    const parsed = JSON.parse(rawJson);
    const formatted = JSON.stringify(parsed, null, 2);
    
    // Return the formatted JSON
    res.json({ formatted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For even larger files, use a file upload approach
app.post('/api/format-json-file', (req, res) => {
  // Process the uploaded file and return download link
  // Implementation would use file streaming
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Offline Tools for Large Files</h2>
        <p>
          For extremely large JSON files, dedicated offline tools often outperform browser-based solutions.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-4">
          <h3 className="text-lg font-medium">Recommended Tools:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Offline Desktop JSON Formatters:</strong> Process files locally without browser limitations</li>
            <li><strong>Command-Line Tools:</strong> jq, fx, or json_pp for terminal-based formatting</li>
            <li><strong>IDE Extensions:</strong> Use VS Code or other editor extensions with optimized JSON handling</li>
            <li><strong>Specialized Big Data Tools:</strong> For JSON files in the gigabyte range</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Using jq (Command Line):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`# Format a large JSON file with jq
cat large-file.json | jq . > formatted-file.json

# Format and extract only a specific part to reduce size
cat large-file.json | jq '.data.users' > users.json

# Format without loading the entire file into memory
jq --stream -c . large-file.json`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">8. Preventative Strategies</h2>
        <p>
          The best approach to handling timeout errors is to prevent them from occurring in the first place.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Paginate API Responses:</strong> Design APIs to deliver large datasets in manageable pages
          </li>
          <li>
            <strong>Implement Streaming Endpoints:</strong> Use HTTP streaming responses for large data transfers
          </li>
          <li>
            <strong>Selective Property Loading:</strong> Only load the properties you need, not the entire object
          </li>
          <li>
            <strong>Progressive Enhancement:</strong> Start with minimal formatting and add details on demand
          </li>
          <li>
            <strong>Lazy Loading:</strong> Load and format data only as the user scrolls or expands nodes
          </li>
          <li>
            <strong>Compressed Formats:</strong> Consider alternatives like BSON or MessagePack for large datasets
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Implementing Progressive JSON Viewer:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Create a collapsible JSON viewer that only formats visible nodes
 * @param {Object} json - The parsed JSON object
 * @param {HTMLElement} container - The container element
 */
function createProgressiveJsonViewer(json, container) {
  // Initial rendering with collapsed nodes
  const rootElement = document.createElement('div');
  rootElement.className = 'json-tree';
  
  // Render root level
  if (Array.isArray(json)) {
    renderArray(json, rootElement, 'root', true);
  } else if (typeof json === 'object' && json !== null) {
    renderObject(json, rootElement, 'root', true);
  } else {
    renderPrimitive(json, rootElement, 'root');
  }
  
  container.appendChild(rootElement);
  
  // Helper function to render an object
  function renderObject(obj, parent, key, collapsed = false) {
    const objElement = document.createElement('div');
    objElement.className = 'json-object';
    
    const keyElement = document.createElement('span');
    keyElement.className = 'json-key';
    keyElement.textContent = key + ': ';
    
    const bracketElement = document.createElement('span');
    bracketElement.className = 'json-bracket';
    bracketElement.textContent = collapsed ? '{ ... }' : '{';
    
    // Add toggle behavior
    bracketElement.addEventListener('click', () => {
      if (collapsed) {
        // Expand this node (lazy formatting)
        bracketElement.textContent = '{';
        collapsed = false;
        
        // Only format children when expanded
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'json-children';
        childrenContainer.style.marginLeft = '20px';
        
        Object.keys(obj).forEach(childKey => {
          const value = obj[childKey];
          if (Array.isArray(value)) {
            renderArray(value, childrenContainer, childKey, true);
          } else if (typeof value === 'object' && value !== null) {
            renderObject(value, childrenContainer, childKey, true);
          } else {
            renderPrimitive(value, childrenContainer, childKey);
          }
        });
        
        const closingBracket = document.createElement('span');
        closingBracket.className = 'json-bracket';
        closingBracket.textContent = '}';
        
        objElement.appendChild(childrenContainer);
        objElement.appendChild(closingBracket);
      } else {
        // Collapse this node
        bracketElement.textContent = '{ ... }';
        collapsed = true;
        
        // Remove children to save memory
        while (objElement.childNodes.length > 2) {
          objElement.removeChild(objElement.childNodes[2]);
        }
      }
    });
    
    objElement.appendChild(keyElement);
    objElement.appendChild(bracketElement);
    parent.appendChild(objElement);
  }
  
  // Similarly implement renderArray and renderPrimitive functions
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">9. Best Practices Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Split processing</strong> into manageable chunks using requestAnimationFrame or setTimeout
          </li>
          <li>
            <strong>Use Web Workers</strong> for CPU-intensive operations
          </li>
          <li>
            <strong>Implement streaming</strong> parsers for extremely large files
          </li>
          <li>
            <strong>Consider server-side processing</strong> when browser-based solutions fail
          </li>
          <li>
            <strong>Use specialized offline tools</strong> for the largest files
          </li>
          <li>
            <strong>Design for progressive loading</strong> instead of loading everything at once
          </li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            For production applications dealing with large JSON files regularly, consider implementing a 
            hybrid approach: use quick client-side formatting for smaller files, but automatically offload 
            to server-side processing when file size exceeds a certain threshold.
          </p>
        </div>
      </div>
    </>
  );
} 