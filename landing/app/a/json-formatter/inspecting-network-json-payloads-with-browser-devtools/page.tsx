import type { Metadata } from "next";
import { Network, Eye, FileJson2, Search, Info, Code, Clipboard } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Inspect JSON Responses in Edge and Chrome DevTools",
  description:
    "Use the Network panel to find, inspect, format, copy, and troubleshoot JSON request and response bodies in Edge, Chrome, and similar browser DevTools.",
};

export default function InspectingJsonPayloadsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Network className="size-8" /> Inspecting Network JSON Payloads with Browser DevTools
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          If you need to inspect a JSON API response in Microsoft Edge, Chrome, or another Chromium-based browser, the
          fastest path is: open DevTools, go to <strong>Network</strong>, filter to <strong>Fetch/XHR</strong>, click
          the request, then use <strong>Preview</strong> for a formatted tree, <strong>Response</strong> for the raw
          body, and <strong>Payload</strong> for the JSON your app sent. This page focuses on that real workflow so a
          search visitor can get from "where is the JSON?" to the actual data quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="size-6" /> Quick Answer for Edge and Chrome
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Open DevTools with <code>F12</code> or <code>Ctrl + Shift + I</code> on Windows/Linux, or{" "}
            <code>Cmd + Option + I</code> on macOS.
          </li>
          <li>
            Select the <strong>Network</strong> tab and reload the page or repeat the action that triggers the API call.
          </li>
          <li>
            Click <strong>Fetch/XHR</strong> to narrow the list to most API requests.
          </li>
          <li>
            If the list is still noisy, use the filter box with <code>mime-type:application/json</code>.
          </li>
          <li>
            Select the request you care about.
          </li>
          <li>
            Use <strong>Preview</strong> for formatted JSON, <strong>Response</strong> for the raw response text, and
            <strong>Payload</strong> when you need to inspect the request body that was sent to the server.
          </li>
          <li>
            In current Microsoft Edge DevTools, you can right-click the first line in <strong>Preview</strong> and
            choose <strong>Copy value</strong> to copy formatted response JSON to your clipboard.
          </li>
        </ol>
        <p>
          If you are using Edge, the labels and tabs are very close to Chrome because both browsers use the same general
          Chromium DevTools workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6" /> Capture the Right Request
        </h2>
        <p>
          The biggest beginner mistake is opening DevTools too late. The Network panel only shows what it recorded while
          it was open, so start here before reproducing the problem.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Turn on Preserve log</strong> if the page reloads, redirects, or moves between routes.
          </li>
          <li>
            <strong>Clear the list</strong> before you retry the action so the request table only shows what matters.
          </li>
          <li>
            <strong>Watch Status and Type</strong> first. A <code>200</code> with type or MIME indicating JSON is very
            different from a <code>302</code>, <code>401</code>, or HTML error page.
          </li>
          <li>
            <strong>Keep Disable cache</strong> in mind if request headers look incomplete or you are chasing a stale
            response.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="size-6" /> Filter Down to JSON Quickly
        </h2>
        <p>
          <strong>Fetch/XHR</strong> is usually enough for app APIs, but current Edge and Chrome DevTools also support
          property filters in the Network filter box. This is the fastest way to find the exact JSON response you want.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use a resource-type filter:</strong> click <strong>Fetch/XHR</strong> for most API calls triggered
            by <code>fetch</code> or <code>XMLHttpRequest</code>.
          </li>
          <li>
            <strong>Filter by MIME type:</strong> <code>mime-type:application/json</code> is the cleanest filter for
            actual JSON responses.
          </li>
          <li>
            <strong>Filter by method when needed:</strong> for writes or form submissions, try <code>method:POST</code>
            or <code>method:PUT</code>.
          </li>
          <li>
            <strong>Filter by endpoint text:</strong> typing part of the URL, route, or query string is often enough
            when you already know the backend path.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Useful filter examples</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`mime-type:application/json
method:POST
api/users
mime-type:application/json method:POST`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search className="size-6" /> What Each Request Tab Is For
        </h2>
        <p>
          Once you click a request, the sidebar is where the real debugging starts. The most important improvement for
          most people is understanding that <strong>Payload</strong> and <strong>Response</strong> answer different
          questions.
        </p>

        <h3 className="text-xl font-semibold mt-6">Headers Tab</h3>
        <p>
          Use <strong>Headers</strong> to confirm the basics: URL, HTTP method, status code, request headers, and
          response headers. If you are expecting JSON, this is where you verify{" "}
          <code>Content-Type: application/json</code> or spot that the server actually returned something else.
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

        <h3 className="text-xl font-semibold mt-6">Payload Tab</h3>
        <p>
          <strong>Payload</strong> shows what your browser sent. In current Edge DevTools, this can include{" "}
          <strong>Request payload (JSON)</strong>, form data, and query string parameters. If you are debugging a POST
          or PUT request, this is the tab that answers "what data did my frontend actually submit?"
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Request JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "email": "alice@example.com",
  "plan": "pro",
  "newsletter": true
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Preview Tab</h3>
        <p>
          <strong>Preview</strong> is usually the best tab for valid JSON responses. When DevTools can parse the body as
          JSON, it renders it as an expandable tree so you can open nested objects and arrays without scanning a long
          minified line.
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
            In the actual Preview tab, you can expand objects, inspect array items, and right-click values to copy them.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Response Tab</h3>
        <p>
          <strong>Response</strong> shows the body as text. This is the tab to check when Preview does not look right,
          when the server returned HTML instead of JSON, or when you want to inspect the exact raw response content
          before formatting it elsewhere.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Raw Response Data:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{"user":{"id":101,"name":"Alice Smith","email":"alice@example.com","address":{"street":"123 Main St","city":"Anytown"},"orders":[{"orderId":"A123","amount":55.75},{"orderId":"B456","amount":120.00}]},"status":"success"}`}
          </pre>
          <p className="text-sm italic mt-2">
            <Clipboard className="inline-block size-4 mr-1" />
            If the response is one long line, copy it into an external formatter or use Preview when DevTools can parse it.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Timing Tab</h3>
        <p>
          Use <strong>Timing</strong> when the JSON is correct but slow. It breaks the request into waiting,
          connection, and download phases so you can tell whether the bottleneck is server time or transport time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Clipboard className="size-6" /> Copy and Search the Data Faster
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Copy formatted JSON from Edge:</strong> select the request, open <strong>Preview</strong>, right-click
            the first line, then choose <strong>Copy value</strong>.
          </li>
          <li>
            <strong>Search across many requests:</strong> in current Edge and Chrome DevTools, <code>Ctrl + F</code> or{" "}
            <code>Cmd + F</code> in the Network panel opens a search that checks request headers, payloads, and responses.
          </li>
          <li>
            <strong>Copy request details for reproduction:</strong> the Network context menu can also copy a request as
            <code>fetch</code> or cURL, which is useful when you want to replay the call outside the browser.
          </li>
          <li>
            <strong>Copy a single nested value:</strong> in parsed views, right-clicking a property is often faster than
            manually selecting text from the raw response.
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
            <strong>Preview is blank or not formatted:</strong> check the <strong>Headers</strong> tab for the response
            {" "}
            <code>Content-Type</code>. Many "JSON" bugs are actually HTML login pages, plain-text error messages, or a
            backend sending the wrong MIME type.
          </li>
          <li>
            <strong>Payload tab is empty:</strong> that is normal for many GET requests. GET calls often send data in the
            URL query string instead of a request body.
          </li>
          <li>
            <strong>Invalid JSON:</strong> if Preview cannot parse the response, switch to <strong>Response</strong> and
            look for a malformed body such as missing commas, unescaped quotes, or a truncated response.
          </li>
          <li>
            <strong>The request never appears:</strong> open DevTools before the action, keep recording enabled, and use
            {" "}
            <strong>Preserve log</strong> if the page navigates away.
          </li>
          <li>
            <strong>You only need to pretty-print a direct JSON URL:</strong> Edge can also format a JSON file or a JSON
            server response in a normal browser tab with its <strong>Pretty-print</strong> checkbox. That is useful for a
            standalone endpoint, but Network is better when you also need headers, timing, status, or the originating
            request payload.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">A simple rule of thumb</h3>
          <p className="text-base leading-relaxed">
            If you want to know what your app <strong>sent</strong>, open <strong>Payload</strong>. If you want to know
            what the server <strong>returned</strong>, open <strong>Preview</strong> or <strong>Response</strong>. That
            distinction solves a large share of DevTools JSON confusion.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          For most JSON debugging sessions, you do not need a complicated workflow. Capture the request, filter the list
          down, verify headers, then use <strong>Payload</strong>, <strong>Preview</strong>, and <strong>Response</strong>
          deliberately instead of guessing. In Edge especially, the built-in filters, search, and copy actions are
          enough to inspect and format most API traffic without leaving DevTools.
        </p>
      </div>
    </>
  );
}
