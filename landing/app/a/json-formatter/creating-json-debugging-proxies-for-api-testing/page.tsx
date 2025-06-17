import type { Metadata } from "next";
import {
  Bug,
  Layers,
  FileJson,
  ArrowRight,
  Search,
  FileEdit,
  CloudOff,
  LogOut,
  Inspect,
  Cog,
  Laptop,
  Smartphone,
  Server,
  Code,
  Book,
  Database,
  CloudDownload,
  CircuitBoard,
  LockKeyhole,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating JSON Debugging Proxies for API Testing | Offline Tools",
  description:
    "Learn how to create and use JSON debugging proxies to inspect, modify, and test API requests and responses effectively.",
};

export default function JsonDebuggingProxiesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bug className="w-8 h-8" />
        Creating JSON Debugging Proxies for API Testing
      </h1>

      <div className="space-y-6">
        <p>
          When developing or integrating with APIs, understanding exactly what data is being sent and received is
          crucial for debugging. While browser developer tools and logging are helpful, sometimes you need more control:
          to inspect requests *before* they leave your client, inspect responses *before* they hit your client code, or
          even modify data on the fly to test different scenarios. This is where a JSON debugging proxy becomes
          invaluable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search className="w-6 h-6" /> What is a Debugging Proxy?
        </h2>
        <p>
          At its core, a debugging proxy acts as an intermediary between your client (like a web browser, mobile app, or
          another service) and the API server it's communicating with.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Laptop className="w-8 h-8 text-blue-500" />
            <ArrowRight className="w-6 h-6" />
            <Layers className="w-8 h-8 text-green-500" /> Proxy
            <ArrowRight className="w-6 h-6" />
            <Server className="w-8 h-8 text-red-500" /> API Server
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Without a proxy: Client &rarr; Server</p>
          <div className="flex items-center gap-4 mt-4">
            <Laptop className="w-8 h-8 text-blue-500" />
            <ArrowRight className="w-6 h-6" />
            <Layers className="w-8 h-8 text-green-500" /> Proxy
            <ArrowRight className="w-6 h-6" />
            <Server className="w-8 h-8 text-red-500" /> API Server
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Server className="w-8 h-8 text-red-500" /> API Server
            <ArrowRight className="w-6 h-6 rotate-180" /> &#x7b; Represents response back &#x7d;
            <Layers className="w-8 h-8 text-green-500" /> Proxy
            <ArrowRight className="w-6 h-6 rotate-180" /> &#x7b; Represents response back &#x7d;
            <Laptop className="w-8 h-8 text-blue-500" />
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            With a proxy: Client &harr; Proxy &harr; Server
          </p>
        </div>
        <p>
          Every request from the client goes through the proxy, and every response from the server comes back through
          the proxy. This allows the proxy to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Inspect className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" /> <strong>Inspect Data:</strong> View the
            raw request (headers, body) and the raw response (headers, body), particularly the JSON payload, in a
            readable format.
          </li>
          <li className="flex items-start gap-2">
            <FileEdit className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" /> <strong>Modify Data:</strong> Change the
            request before it reaches the server or the response before it reaches the client. This is powerful for
            testing edge cases or simulating server behavior.
          </li>
          <li className="flex items-start gap-2">
            <LogOut className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" /> <strong>Log & Analyze:</strong> Log
            requests and responses for later analysis, performance testing, or documentation.
          </li>
          <li className="flex items-start gap-2">
            <CloudOff className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" /> <strong>Simulate Conditions:</strong>{" "}
            Introduce delays, bandwidth limits, or specific error responses (like 500 errors or malformed JSON) to test
            client resilience.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Why Specifically for JSON?</h2>
        <p>
          While proxies can debug any HTTP traffic, JSON is the most common data format for modern APIs. JSON's
          structured nature makes it ideal for programmatic inspection and modification. A debugging proxy focused on
          JSON will typically offer features like:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <FileJson className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" /> Automatic JSON parsing and
            pretty-printing.
          </li>
          <li className="flex items-start gap-2">
            <Search className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" /> Search capabilities within the JSON
            structure.
          </li>
          <li className="flex items-start gap-2">
            <FileEdit className="w-5 h-5 text-lime-500 mt-1 flex-shrink-0" /> Easy inline editing of JSON payloads.
          </li>
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" /> Syntax highlighting for readability.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Laptop className="w-6 h-6" /> Approaches to Creating/Using a Debugging Proxy
        </h2>
        <p>
          There are several ways to leverage debugging proxies, ranging from off-the-shelf tools to custom-built
          solutions.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">Using Dedicated Proxy Applications</h3>
        <p>
          These are software applications installed on your machine that you configure your client (browser, OS network
          settings, or application) to use as its HTTP proxy.
        </p>
        <p>Examples include Charles Proxy, Fiddler, Proxyman, and mitmproxy.</p>
        <p>
          <strong>Pros:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Feature-rich GUI for inspecting, filtering, and modifying traffic.</li>
          <li>Handle HTTPS traffic (requires installing a trusted certificate).</li>
          <li>Advanced features like throttling, repeat requests, breakpoint setting.</li>
        </ul>
        <p>
          <strong>Cons:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Can be complex to set up, especially for mobile or specific application traffic.</li>
          <li>May require licenses for advanced features or commercial use.</li>
        </ul>
        <p>
          While powerful, this article focuses more on understanding the underlying mechanism by building a simple,
          code-based proxy.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">Building a Simple Code-Based Proxy</h3>
        <p>
          For specific testing needs or to gain deeper insight, building a simple proxy script can be very effective.
          This is typically done using a server-side language or environment like Node.js.
        </p>
        <p>
          The basic idea is to create an HTTP server that listens on a local port. The client is configured to send
          requests to this local port. When the proxy server receives a request, it forwards it to the intended target
          API server, waits for the response, and then forwards the response back to the client. In between, it can log,
          inspect, or alter the data.
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center gap-2">
          <CircuitBoard className="w-5 h-5" /> Conceptual Implementation Steps (using Node.js/TypeScript)
        </h4>

        <p>
          Let's outline the core logic using simplified examples. A real-world proxy would need more robust error
          handling, streaming support, and handling of various HTTP nuances.
        </p>

        <h5 className="text-base font-semibold mt-3">1. Create an HTTP Server</h5>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Imports (conceptual - actual Node.js modules needed)
// import http from 'http';
// import https from 'https'; // for forwarding to HTTPS
// import { URL } from 'url';

// Define the target API server URL
const TARGET_API_URL = new URL('https://api.example.com/'); // Replace with your API base URL
const PROXY_PORT = 8080;

// Create the proxy server
// http.createServer((clientReq, clientRes) => {
//   console.log(\`[PROXY] Received request: \${clientReq.method} \${clientReq.url}\`);

//   // Process the request... (See next steps)

//   // Eventually, forward response back to client
//   // serverRes.pipe(clientRes);
// }).listen(PROXY_PORT, () => {
//   console.log(\`[PROXY] Listening on port \${PROXY_PORT}\`);
//   console.log(\`Configure your client to use http://localhost:\${PROXY_PORT}\`);
// });
`}
            </pre>
          </div>
        </div>
        <p>
          This sets up a simple HTTP server listening on a specified port (e.g., 8080). You would then configure your
          client (like a browser's proxy settings) to send requests targeting <code>api.example.com</code> to{" "}
          <code>localhost:8080</code> instead.
        </p>

        <h5 className="text-base font-semibold mt-3">2. Handle Incoming Request & Forward to Target</h5>
        <p>
          Inside the server's request handler, you need to construct a new request to the target API server based on the
          incoming client request.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ... inside http.createServer callback ...

// const targetOptions = {
//   hostname: TARGET_API_URL.hostname,
//   port: TARGET_API_URL.port || (TARGET_API_URL.protocol === 'https:' ? 443 : 80),
//   path: clientReq.url, // Use the original requested path
//   method: clientReq.method,
//   headers: clientReq.headers, // Forward original headers (be cautious with some headers)
// };

// const forwardReq = (TARGET_API_URL.protocol === 'https:' ? https : http).request(targetOptions, (serverRes) => {
//   console.log(\`[PROXY] Received response from target: \${serverRes.statusCode}\`);

//   // Process response... (See next step)
//   // For now, just pipe it back
//   // serverRes.pipe(clientRes);
// });

// Handle potential errors during forwarding
// forwardReq.on('error', (e) => {
//   console.error(\`[PROXY] Error forwarding request: \${e.message}\`);
//   clientRes.writeHead(500);
//   clientRes.end('Proxy Error');
// });

// If the client request has a body (POST, PUT, etc.), pipe it to the forwarded request
// clientReq.pipe(forwardReq);

// End the forwarded request (important for requests without bodies like GET)
// clientReq.on('end', () => {
//   if (!clientReq.complete) { // Ensure piping is complete if there was a body
//      // No-op, pipe handles end
//    } else {
//      // forwardReq.end(); // For requests without body
//    }
// });
`}
            </pre>
          </div>
        </div>
        <p>
          Here, we create a new request using Node.js's built-in <code>http</code> or <code>https</code> modules,
          pointing it to the actual API server. We copy the method, path, and headers from the client's request. We also
          handle streaming the request body if present (important for POST/PUT requests with JSON payloads).
        </p>

        <h5 className="text-base font-semibold mt-3">3. Intercept and Inspect the JSON Response</h5>
        <p>
          The core debugging happens when the proxy receives the response from the target API server. This is where you
          can intercept the data stream, buffer it, parse it as JSON, and log it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ... inside the forwardReq callback (when serverRes is received) ...

// Check if the response is likely JSON
// const contentType = serverRes.headers['content-type'];
// const isJsonResponse = contentType && contentType.includes('application/json');

// if (isJsonResponse) {
//   let rawData = '';
//   serverRes.on('data', (chunk) => {
//     rawData += chunk; // Buffer the data
//   });

//   serverRes.on('end', () => {
//     try {
//       // Try to parse the buffered data as JSON
//       const parsedJson = JSON.parse(rawData);

//       console.log('[PROXY] Intercepted JSON Response:');
//       // Use JSON.stringify for pretty-printing in logs
//       console.log(JSON.stringify(parsedJson, null, 2)); // Pretty print JSON!

//       // *** Modification point ***
//       // Example: Modify the JSON before sending it back
//       // parsedJson.debugField = 'added by proxy';
//       // const modifiedJson = JSON.stringify(parsedJson);

//       // Send the (potentially modified) JSON back to the client
//       // clientRes.writeHead(serverRes.statusCode, {
//       //   ...serverRes.headers, // Copy headers (be careful with Content-Length if modifying body)
//       //   'Content-Length': Buffer.byteLength(modifiedJson), // Update length if modified
//       // });
//       // clientRes.end(modifiedJson); // Send modified data

//        // --- If NOT modifying, just send original buffered data ---
//        clientRes.writeHead(serverRes.statusCode, serverRes.headers);
//        clientRes.end(rawData); // Send original data
//        // -----------------------------------------------------

//     } catch (e) {
//       console.error('[PROXY] Failed to parse JSON response:', e.message);
//       // If parsing fails, just forward the original response
//       clientRes.writeHead(serverRes.statusCode, serverRes.headers);
//       clientRes.end(rawData);
//     }
//   });
// } else {
//   // If not JSON, just pipe the response directly
//   console.log(\`[PROXY] Forwarding non-JSON response (\${contentType})\`);
//   serverRes.pipe(clientRes);
// }
`}
            </pre>
          </div>
        </div>
        <p>
          This snippet shows how to listen for the <code>'data'</code> and <code>'end'</code> events on the response
          stream to collect the entire response body. Once collected, we attempt to parse it as JSON. If successful, we
          log the pretty-printed JSON. This is also the point where you could modify the <code>parsedJson</code> object
          before converting it back to a string and sending it to the client. Remember to handle the case where the
          response isn't JSON (e.g., HTML, images, errors).
        </p>

        <h5 className="text-base font-semibold mt-3">4. Handle Request Body Inspection (for POST/PUT)</h5>
        <p>
          Similarly, if the client sends a request with a body (like a POST request with a JSON payload), you might want
          to intercept and inspect that too. This involves buffering the <code>clientReq</code> stream.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ... inside http.createServer callback, before piping to forwardReq ...

// if (clientReq.method === 'POST' || clientReq.method === 'PUT') {
//   let requestBody = '';
//   clientReq.on('data', (chunk) => {
//     requestBody += chunk;
//   });

//   clientReq.on('end', () => {
//     try {
//       const parsedRequestBody = JSON.parse(requestBody);
//       console.log('[PROXY] Intercepted Request Body (JSON):');
//       console.log(JSON.stringify(parsedRequestBody, null, 2));

//       // *** Modification point ***
//       // Example: Modify request body before forwarding
//       // parsedRequestBody.token = 'fake-token-for-testing';
//       // const modifiedRequestBody = JSON.stringify(parsedRequestBody);

//       // Now forward the (potentially modified) body to the target
//       // forwardReq.write(modifiedRequestBody);
//       // forwardReq.end(); // End the forwarded request after writing body

//       // --- If NOT modifying, just write original buffered data ---
//       forwardReq.write(requestBody);
//       forwardReq.end();
//       // -------------------------------------------------------

//     } catch (e) {
//       console.error('[PROXY] Failed to parse JSON request body:', e.message);
//       // If parsing fails, just forward the original body
//       forwardReq.write(requestBody);
//       forwardReq.end();
//     }
//   });
// } else {
//   // For requests without bodies (GET, DELETE, etc.), just end the forwarded request immediately
//   // forwardReq.end();
// }
`}
            </pre>
          </div>
        </div>
        <p>
          This pattern is similar to handling the response body. We buffer the incoming request data stream before
          forwarding it. This allows us to inspect or modify the JSON payload of POST or PUT requests. Note that
          handling both request and response bodies adds complexity to the overall proxy logic.
        </p>

        <h4 className="text-lg font-semibold mt-4 flex items-center gap-2">
          <Cog className="w-5 h-5" /> Challenges and Considerations
        </h4>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <LockKeyhole className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /> <strong>HTTPS:</strong> Directly
            proxying HTTPS traffic programmatically is complex because the traffic is encrypted. Dedicated proxy tools
            handle this by acting as a "man-in-the-middle" (MITM), requiring you to trust their generated certificate. A
            simple HTTP proxy cannot easily intercept HTTPS without additional libraries or changes to the client's
            trust store. For simplicity, your code-based proxy might only work for HTTP traffic unless you implement or
            use a library for MITM HTTPS proxying.
          </li>
          <li className="flex items-start gap-2">
            <CloudDownload className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" /> <strong>Streaming:</strong> The
            simple buffering approach shown above works for smaller payloads. For very large JSON responses or requests,
            buffering the entire content in memory is inefficient and can cause memory issues. A production-grade proxy
            would process data streams incrementally.
          </li>
          <li className="flex items-start gap-2">
            <Database className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> <strong>Headers:</strong> Be careful when
            forwarding headers. Some headers, like <code>Host</code>, <code>Content-Length</code>, or
            connection-specific headers, might need adjustment or removal. If you modify the request or response body,
            you *must* update the <code>Content-Length</code> header.
          </li>
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" /> <strong>JSON Parsing Robustness:</strong>{" "}
            Real-world APIs might return malformed JSON or different content types. Your proxy needs robust error
            handling around JSON parsing.
          </li>
          <li className="flex items-start gap-2">
            <CircuitBoard className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" /> <strong>Performance:</strong> A
            simple Node.js script might not handle high-throughput traffic as efficiently as optimized dedicated proxy
            software. This is fine for local debugging but not for production use.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Book className="w-6 h-6" /> When to Use Which Approach?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Inspect className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" /> Use **dedicated proxy applications**
            (Charles, Fiddler) for general web debugging, mobile app testing, performance analysis, and when you need a
            rich GUI and advanced features like throttling and breakpoints, especially for HTTPS.
          </li>
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" /> Build a **simple code-based proxy** when you
            have a very specific debugging or modification task that's easier to script than configure in a GUI tool, or
            when you want to integrate the proxy logic directly into a testing framework. It's also a great way to learn
            about HTTP and proxying.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Smartphone className="w-6 h-6" /> Application to Mobile & Other Clients
        </h2>
        <p>
          Debugging proxies aren't limited to web browsers. You can configure mobile devices, desktop applications, or
          backend services to route their API traffic through your proxy server. This is often done by setting the
          system's HTTP proxy environment variables or network settings to point to the machine running the proxy. For
          HTTPS, remember the certificate installation step required by dedicated proxy tools or necessary if you
          implement MITM logic in your custom proxy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          JSON debugging proxies are a powerful tool in an API developer's toolkit. Whether you use a sophisticated
          off-the-shelf application or build a simple script tailored to your needs, having the ability to intercept,
          inspect, and manipulate JSON data flowing between your client and server provides invaluable insight into API
          behavior, helping you squash bugs faster and build more robust applications. Understanding the principles
          behind how they work, especially the request/response interception and data processing steps, is key to
          leveraging them effectively for testing JSON-based APIs.
        </p>
      </div>
    </>
  );
}
