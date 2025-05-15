import type { Metadata } from "next";
import {
  Code,
  Settings,
  BookOpen,
  RefreshCcw,
  Shield,
  FileJson2,
  Share2,
  Cloud,
  Waypoints,
  Table,
  CircleAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter API Design for Third-Party Integration | Offline Tools",
  description:
    "Learn how to design a robust and user-friendly JSON formatter API specifically for integration by third-party developers.",
};

export default function JsonFormatterApiDesignArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 flex items-center space-x-3">
        <FileJson2 size={40} className="text-blue-600" />
        <span>JSON Formatter API Design for Third-Party Integration</span>
      </h1>

      <div className="space-y-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Designing APIs that are easy for third-party developers to integrate with is crucial for adoption and
          success. A common utility service that might be exposed as an API is a JSON formatter. This article
          explores key considerations and best practices for designing a JSON formatter API specifically
          with external developers in mind.
        </p>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <BookOpen size={28} className="text-green-600" />
            <span>Why a JSON Formatter API?</span>
          </h2>
          <p>
            JSON is the de facto standard for data exchange on the web. While most programming languages have
            built-in JSON parsing and serialization, formatting JSON for readability or consistency can still be
            a task developers might prefer to offload, especially when dealing with large, minified, or
            unstructured JSON blobs. A dedicated API can provide a reliable, standardized, and potentially
            configurable formatting service.
          </p>
          <p>
            Third-party developers might use such an API for:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Cleaning up user-provided JSON input.</li>
            <li>Standardizing JSON output from various sources.</li>
            <li>Debugging minified JSON payloads.</li>
            <li>Integrating formatting into their own tools or workflows.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Waypoints size={28} className="text-purple-600" />
            <span>API Endpoint Design (RESTful Approach)</span>
          </h2>
          <p>
            A RESTful design is often the most intuitive for third-party developers.
            A simple endpoint for formatting could look like this:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
            <code className="font-mono text-sm">
              POST /format/json
            </code>
          </div>
          <p>
            Using a <code>POST</code> request is appropriate because the API receives data (the JSON string)
            in the request body to perform an operation (formatting) and returns the result.
          </p>
          <h3 className="text-2xl font-semibold mb-3 flex items-center space-x-2">
            <Cloud size={24} className="text-blue-500" />
            <span>Base URL and Versioning</span>
          </h3>
          <p>
            Always include a version number in the API path to allow for future changes without breaking
            existing integrations.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
            <code className="font-mono text-sm">
              POST /api/v1/format/json
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Table size={28} className="text-orange-600" />
            <span>Request Body</span>
          </h2>
          <p>
            The primary input is the JSON string to be formatted. This should be sent in the request body.
            The <code>Content-Type</code> header should be set to <code>application/json</code>.
          </p>
          <p>
            The request body itself could be a JSON object containing the raw JSON string and any formatting options.
          </p>
          <h3 className="text-2xl font-semibold mb-3 flex items-center space-x-2">
            <Code size={24} className="text-gray-500" />
            <span>Example Request Body</span>
          </h3>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md my-4 overflow-x-auto">
            <pre className="font-mono text-sm">
              {`{
  "jsonString": "{\\"name\\":\\"Alice\\",\\"age\\":30,\\"city\\":\\"New York\\"}",
  "options": {
    "indent": 2,
    "sortKeys": false,
    "minify": false
  }
}`}
            </pre>
          </div>
          <p>
            Alternatively, for simplicity, especially if few options are needed, the raw JSON string could
            be the entire request body with a specific <code>Content-Type</code> like <code>application/json-string</code>
            (though this is less standard), or just sent as plain text if that's clearly documented.
            However, using <code>application/json</code> for a wrapper object is generally preferred as it allows
            including options naturally.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <RefreshCcw size={28} className="text-teal-600" />
            <span>Response Body</span>
          </h2>
          <p>
            The API should return the formatted JSON string in the response body. The <code>Content-Type</code>
            should again be <code>application/json</code>.
          </p>
          <p>
            A successful response should include the formatted string and potentially metadata.
          </p>
          <h3 className="text-2xl font-semibold mb-3 flex items-center space-x-2">
            <Code size={24} className="text-gray-500" />
            <span>Example Success Response (HTTP 200 OK)</span>
          </h3>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md my-4 overflow-x-auto">
            <pre className="font-mono text-sm">
              {`{
  "status": "success",
  "formattedJson": "{
  \\"name\\": \\"Alice\\",
  \\"age\\": 30,
  \\"city\\": \\"New York\\"
}"
}`}
            </pre>
          </div>
          <p>
            Including a <code>status</code> field is a good practice, especially for APIs that might return
            different types of results or errors.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Settings size={28} className="text-cyan-600" />
            <span>Configuration Options</span>
          </h2>
          <p>
            To make the API versatile, offer common formatting options. These could be included in the
            request body as shown above.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Indentation:</strong> Control the number of spaces or use tabs for indentation.
              Example: <code>"indent": 2</code> (spaces), <code>"indent": "\\t"</code> (tab). Default might be 2 or 4 spaces.
            </li>
            <li>
              <strong>Sort Keys:</strong> Alphabetically sort keys within JSON objects.
              Example: <code>"sortKeys": true</code>.
            </li>
            <li>
              <strong>Minify:</strong> Return the JSON as a single line with no whitespace.
              Example: <code>"minify": true</code>. Note: Minify option usually overrides indentation and sort keys.
            </li>
            <li>
              <strong>Line Endings:</strong> Specify CRLF or LF, although less common for JSON APIs.
            </li>
          </ul>
          <p>
            Clearly document default values for all options.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <CircleAlert size={28} className="text-red-600" />
            <span>Error Handling</span>
          </h2>
          <p>
            Robust error handling is critical for third-party APIs. Developers need to understand what went wrong.
          </p>
          <h3 className="text-2xl font-semibold mb-3 flex items-center space-x-2">
            <Code size={24} className="text-gray-500" />
            <span>Example Error Response (HTTP 400 Bad Request)</span>
          </h3>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md my-4 overflow-x-auto">
            <pre className="font-mono text-sm">
              {`{
  "status": "error",
  "code": "INVALID_JSON_INPUT",
  "message": "The provided string is not valid JSON.",
  "details": "Syntax error at position 5: Expected '{' or '[' but found 'a'"
}`}
            </pre>
          </div>
          <p>
            Common error types for a JSON formatter API:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <code>400 Bad Request</code>: Invalid request payload (e.g., not JSON), invalid JSON string provided,
              or invalid formatting options. The response body should clearly state the error.
            </li>
            <li>
              <code>401 Unauthorized</code>: Authentication failed.
            </li>
            <li>
              <code>403 Forbidden</code>: Authenticated but not authorized, or potentially rate limited.
            </li>
            <li>
              <code>429 Too Many Requests</code>: Rate limit exceeded. Include <code>Retry-After</code> header.
            </li>
            <li>
              <code>500 Internal Server Error</code>: Something went wrong on the server's end. Avoid exposing
              internal details; provide a generic error message and a request ID for debugging.
            </li>
          </ul>
          <p>
            Provide specific error codes or types in the JSON response body (like <code>INVALID_JSON_INPUT</code>)
            that developers can reliably check against programmatically.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Shield size={28} className="text-indigo-600" />
            <span>Security Considerations</span>
          </h2>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Input Validation:</strong> Strictly validate the input JSON string and options to prevent
              malicious payloads or unexpected behavior. Ensure the input is actual JSON.
            </li>
            <li>
              <strong>Authentication & Authorization:</strong> Use API keys, OAuth 2.0, or other standard methods
              to identify and authorize third-party developers. Don't expose the API publicly without control.
            </li>
            <li>
              <strong>Rate Limiting:</strong> Protect your service from abuse and ensure fair usage by implementing
              rate limits per API key or IP address.
            </li>
            <li>
              <strong>Input Size Limits:</strong> Set a maximum size for the input JSON string to prevent
              processing extremely large payloads that could consume excessive resources.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Share2 size={28} className="text-pink-600" />
            <span>Documentation</span>
          </h2>
          <p>
            Comprehensive and clear documentation is paramount for third-party integration. Use tools like
            Swagger/OpenAPI to define your API contract. The documentation should cover:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Endpoint URL and HTTP method.</li>
            <li>Authentication requirements.</li>
            <li>Request body format and fields (including options).</li>
            <li>Response body format for success and different error cases.</li>
            <li>Examples of requests and responses.</li>
            <li>Rate limits.</li>
            <li>Versioning policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <Code size={28} className="text-gray-600" />
            <span>Implementation Notes</span>
          </h2>
          <p>
            When implementing the API, use a robust JSON parsing library in your chosen language.
            Many languages have built-in libraries (like <code>JSON.parse()</code> and <code>JSON.stringify()</code>
            in JavaScript/Node.js) that handle basic formatting. For advanced options like sorting keys,
            you might need to implement custom logic or use more specialized libraries.
          </p>
          <p>
            Example conceptual Node.js snippet for handling a request:
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md my-4 overflow-x-auto">
            <pre className="font-mono text-sm">
              {`// Conceptual server-side handler (e.g., Express route)

// Assume request body is validated and parsed
// req.body looks like: { jsonString: "...", options: {...} }

try {
  const { jsonString, options } = req.body;

  if (typeof jsonString !== 'string') {
    // Handle invalid input type
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_INPUT_TYPE',
      message: 'jsonString must be a string.'
    });
  }

  let parsedJson;
  try {
    // Attempt to parse the input string
    parsedJson = JSON.parse(jsonString);
  } catch (parseError) {
    // Handle invalid JSON syntax
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_JSON_INPUT',
      message: 'The provided string is not valid JSON.',
      details: parseError.message
    });
  }

  // Apply formatting options
  let formattedJson;
  const indent = options?.indent ?? 2; // Default indent to 2 spaces
  const sortKeys = options?.sortKeys ?? false;
  const minify = options?.minify ?? false;

  if (minify) {
    // Minify: stringify with no space
    formattedJson = JSON.stringify(parsedJson);
  } else {
    // Format with indentation and optional sorting
    // Note: JSON.stringify only supports basic indentation and no built-in sorting.
    // Sorting keys would require a recursive function to process the parsed object.
    formattedJson = JSON.stringify(parsedJson, sortKeys ? (key, value) => {
        // Custom replacer logic for sorting if needed
        // This is a simplified example, actual sorting is more complex for nested objects/arrays
        return value; // Basic stringify without sorting
    } : null, indent);
  }


  // Send success response
  res.status(200).json({
    status: 'success',
    formattedJson: formattedJson
  });

} catch (serverError) {
  console.error("Server error during formatting:", serverError);
  // Handle unexpected server errors
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred.',
    requestId: 'abc-123' // Include a correlation ID for debugging
  });
}
`}
            </pre>
          </div>
          <p>
            Note that implementing options like key sorting requires more than just the basic <code>JSON.stringify</code>
            parameters and would involve recursively traversing and rebuilding the parsed JSON object before stringifying.
            The example above is illustrative but simplified regarding advanced options.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center space-x-2">
            <BookOpen size={28} className="text-green-600" />
            <span>Conclusion</span>
          </h2>
          <p>
            Designing a JSON formatter API for third-party integration involves more than just wrapping a
            formatting function. It requires careful consideration of endpoint design, request/response
            formats, configuration options, robust error handling, security, and clear documentation.
            By adhering to standard API design principles and focusing on the developer experience,
            you can create a useful and easily adoptable service.
          </p>
        </section>
      </div>
    </div>
  );
}
