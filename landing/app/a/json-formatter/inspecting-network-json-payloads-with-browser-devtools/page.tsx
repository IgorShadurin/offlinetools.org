import type { Metadata } from "next";
import { Network, Eye, FileJson2, Search, Info, Code, Clipboard } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Inspecting Network JSON Payloads with Browser DevTools",
  description:
    "Learn how to use browser developer tools to inspect, debug, and understand JSON data transmitted over the network.",
};

export default function InspectingJsonPayloadsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Network className="size-8" /> Inspecting Network JSON Payloads with Browser DevTools
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          As web developers, we frequently work with data exchanged between the browser and servers. A very common
          format for this data is JSON (JavaScript Object Notation). When developing or debugging web applications,
          being able to inspect the JSON data being sent and received over the network is an essential skill. Browser
          Developer Tools ("DevTools") provide powerful capabilities for this. This guide will walk you through using
          the Network tab in DevTools to examine JSON payloads effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="size-6" /> Why Inspect Network JSON Payloads?
        </h2>
        <p>Inspecting network requests and their payloads can help you:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Debug API Issues:</strong> See exactly what data your application is sending to the server and what
            data the server is sending back. This helps identify if the problem is in the request data, the server
            processing, or the client-side handling of the response.
          </li>
          <li>
            <strong>Understand Data Structures:</strong> Learn the exact structure and format of the JSON data an API
            returns, which is crucial for correctly parsing and using it in your application.
          </li>
          <li>
            <strong>Check Request Headers:</strong> Verify that your application is sending the correct headers (like
            authentication tokens, content types, etc.).
          </li>
          <li>
            <strong>Monitor Performance:</strong> See how long network requests take.
          </li>
          <li>
            <strong>Identify Security Concerns:</strong> Understand what data is being transmitted, ensuring sensitive
            information isn&apos;t exposed unintentionally.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6" /> Opening Browser Developer Tools
        </h2>
        <p>
          The first step is to open the Developer Tools in your browser. The exact method varies slightly between
          browsers, but the common ways are:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Right-click</strong> anywhere on the web page and select "Inspect", "Inspect Element", or "Inspect
            (Q)".
          </li>
          <li>
            Use keyboard shortcuts:
            <ul className="list-circle pl-6 mt-2">
              <li>
                Chrome, Edge, Firefox: <code>F12</code> or <code>Ctrl + Shift + I</code> (Windows/Linux),
                <code>Cmd + Option + I</code> (macOS)
              </li>
              <li>
                Safari: <code>Cmd + Option + I</code> (macOS). You might need to enable the "Develop" menu in
                Safari&apos;s preferences first (Preferences &gt; Advanced &gt; Show Develop menu in menu bar).
              </li>
            </ul>
          </li>
        </ul>
        <p>Once DevTools are open, look for the "Network" tab and click on it.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="size-6" /> Navigating the Network Tab
        </h2>
        <p>
          The Network tab logs all network activity made by the page since the tab was opened or the last time the list
          was cleared. You&apos;ll see a list of requests, typically ordered by the time they occurred. Each row
          represents a single network request and includes information like:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Name:</strong> The file or endpoint name.
          </li>
          <li>
            <strong>Status:</strong> HTTP status code (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).
          </li>
          <li>
            <strong>Type:</strong> The resource type (e.g., document, stylesheet, script, XHR, fetch, img).
          </li>
          <li>
            <strong>Initiator:</strong> What caused the request.
          </li>
          <li>
            <strong>Size:</strong> The size of the response.
          </li>
          <li>
            <strong>Time:</strong> How long the request took.
          </li>
          <li>
            <strong>Waterfall:</strong> A visual breakdown of the request timing phases.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">Filtering for JSON Payloads</h3>
        <p>To focus specifically on requests that likely contain JSON data, you can use the filtering options:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Filter Bar:</strong> Most DevTools have a filter bar at the top of the network requests list. You
            can type text here to filter by URL or other properties.
          </li>{" "}
          {/* Added closing li tag here */}
          <li>
            <strong>Type Filters:</strong> Below the filter bar, there are usually buttons to filter by resource type
            (e.g., All, Fetch/XHR, JS, CSS, Img, Media, Font, Doc, WS, Manifest). Click on "Fetch/XHR" to show requests
            made by JavaScript using <code>fetch</code> or <code>XMLHttpRequest</code>, as these are the most common
            types used for API calls returning JSON.
          </li>
          <li>
            <Search className="inline-block size-5 mr-1" />
            You can often further refine filters. For instance, searching for
            <code>.json</code> or filtering by "Type" based on the response
            <code>Content-Type</code> header (which should ideally be <code>application/json</code>).
          </li>
        </ul>
        <p>
          Make sure the page performs the actions that trigger the network requests you want to inspect (e.g., clicking
          a button that loads data). You might need to reload the page with the Network tab open to capture requests
          made during page load.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search className="size-6" /> Inspecting a Specific Request
        </h2>
        <p>
          Once you see a request in the list that you suspect contains the JSON payload you need, click on it. This will
          open a detailed panel on the right or bottom of the Network tab. This panel typically has several sub-tabs:
        </p>

        <h3 className="text-xl font-semibold mt-6">Headers Tab</h3>
        <p>
          Shows the request URL, method (GET, POST, etc.), status code, and both the request headers (sent by the
          browser) and the response headers (sent by the server). Checking response headers like
          <code>Content-Type: application/json</code> can confirm that the response is indeed JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Response Headers:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 150
Connection: keep-alive
Date: Tue, 23 Jul 2024 10:00:00 GMT
Server: MyAwesomeServer`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Preview Tab</h3>
        <p>
          This is often the most useful tab for JSON. DevTools automatically parse the JSON response and display it in a
          collapsible tree structure. This makes it easy to navigate nested objects and arrays, expand or collapse
          sections, and quickly understand the data hierarchy.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Preview Display:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "user": {
    "id": 101,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "address": {
      "street": "123 Main St",
      "city": "Anytown"
    },
    "orders": [
      {
        "orderId": "A123",
        "amount": 55.75
      },
      {
        "orderId": "B456",
        "amount": 120.00
      }
    ]
  },
  "status": "success"
}`}
          </pre>
          <p className="text-sm italic mt-2">
            <Info className="inline-block size-4 mr-1" />
            In the actual DevTools Preview tab, you can click arrows next to objects and arrays to expand/collapse them.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Response Tab</h3>
        <p>
          This tab shows the raw, unformatted response data exactly as it was received from the server. For JSON, this
          will be a raw string. While the Preview tab is better for exploring the structure, the Response tab is useful
          for copying the raw data or if the Preview tab fails to parse it (e.g., due to invalid JSON).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Raw Response Data:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{"user":{"id":101,"name":"Alice Smith","email":"alice@example.com","address":{"street":"123 Main St","city":"Anytown"},"orders":[{"orderId":"A123","amount":55.75},{"orderId":"B456","amount":120.00}]},"status":"success"}`}
          </pre>
          <p className="text-sm italic mt-2">
            <Clipboard className="inline-block size-4 mr-1" />
            You can typically right-click the raw response data to copy it.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Timing Tab</h3>
        <p>
          Provides a detailed breakdown of the request lifecycle (DNS lookup, connection, SSL, waiting, receiving).
          Useful for diagnosing performance issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Tips for Efficient JSON Inspection</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clear the Log:</strong> The clear button (often a circle with a slash through it) clears the list of
            requests. Useful for isolating requests triggered by a specific action.
          </li>
          <li>
            <strong>Preserve Log:</strong> A checkbox (often labeled "Preserve log") keeps the network log even when you
            navigate to another page or reload. Handy for debugging redirects or multi-step workflows.
          </li>
          <li>
            <strong>Search the Response:</strong> In the Preview or Response tab, you can usually press{" "}
            <code>Ctrl + F</code>
            (Windows/Linux) or <code>Cmd + F</code> (macOS) to open a search bar and search for specific keys or values
            within the JSON data.
          </li>
          <li>
            <strong>Copy Value/Path:</strong> In the Preview tab, right-clicking on a specific key or value often
            provides options to "Copy value" or "Copy property path" (e.g., <code>user.address.city</code>).
          </li>
          <li>
            <strong>Format/Pretty Print:</strong> Some DevTools might have an option to automatically pretty-print the
            raw JSON in the Response tab if it&apos;s not already formatted.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="size-6" /> Common Scenarios and Troubleshooting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Request Pending or Stalled:</strong> If a request shows "Pending" or "Stalled" for a long time, it
            could indicate a network issue, a server problem, or the browser blocking the request (e.g., CORS issue).
          </li>
          <li>
            <strong>Non-JSON Response:</strong> If you expect JSON but the Preview tab is empty or shows raw text, check
            the "Type" column and the "Content-Type" header in the Headers tab. The server might be returning a
            different format (like HTML for an error page) or has the wrong Content-Type header.
          </li>
          <li>
            <strong>Invalid JSON:</strong> If the Preview tab fails to parse the data, it might be invalid JSON. Look at
            the raw data in the Response tab for syntax errors (missing commas, extra braces, unescaped characters,
            etc.).
          </li>
          <li>
            <strong>Large Payloads:</strong> For very large JSON responses, the DevTools might take a moment to parse
            and display them in the Preview tab.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          Mastering the Network tab in your browser&apos;s Developer Tools is indispensable for anyone working with web
          APIs and JSON data. It provides deep visibility into the communication between your frontend and backend,
          allowing you to quickly diagnose issues, understand data structures, and ensure your application is behaving
          as expected. Spend time exploring the different tabs and options available in your preferred browser&apos;s
          DevTools to become proficient in this crucial debugging technique.
        </p>
      </div>
    </>
  );
}
