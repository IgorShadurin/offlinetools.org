import type { Metadata } from "next";
import {
  Code,
  Sparkles,
  SlidersHorizontal,
  AlertTriangle,
  Plug,
  Send,
  Inbox, // Replaced 'Receive' with 'Inbox'
} from "lucide-react"; // Ensure lucide-react is installed

export const metadata: Metadata = {
  title: "Cross-Language JSON Formatter API Design | API Concepts",
  description:
    "Explore the design principles for a RESTful API that formats JSON data, usable from any programming language.",
};

export default function CrossLanguageJsonFormatterApiPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Plug className="mr-3" size={32} /> Cross-Language JSON Formatter API Design
      </h1>

      <div className="space-y-6">
        <p>
          In modern software development, exchanging data using JSON is ubiquitous. While native libraries exist
          in almost every language to parse and serialize JSON, ensuring consistent, readable formatting
          across different projects, teams, or even microservices can be a challenge. A dedicated API
          for formatting JSON offers a centralized, language-agnostic solution. This page explores the design considerations
          for building such a "Cross-Language" JSON formatter API.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Sparkles className="mr-3" /> Why an API for JSON Formatting?
        </h2>
        <p>
          Why build an API when client-side libraries can do the job?
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Consistency:</strong> Enforce a single formatting style across all applications, regardless of their programming language or specific library versions.
          </li>
          <li>
            <strong>Readability:</strong> Automatically format minified or poorly formatted JSON to improve developer debugging and understanding.
          </li>
          <li>
            <strong>Automation:</strong> Integrate formatting into CI/CD pipelines, code review tools, or automated documentation generators.
          </li>
          <li>
            <strong>Reduced Client Load:</strong> Offload the formatting logic from resource-constrained client applications or scripts.
          </li>
          <li>
            <strong>Centralized Updates:</strong> Update the formatting logic or options in one place instead of distributing changes to numerous client applications.
          </li>
        </ul>
        <p>
          The term "Cross-Language" here signifies that the API is designed to be consumable easily from
          any programming language capable of making HTTP requests and handling JSON responses, rather than
          formatting code written in different languages (which is the job of a code formatter).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Plug className="mr-3" /> Core API Design Principles
        </h2>
        <p>
          A simple and effective way to design this API is using RESTful principles. We'll define an endpoint
          specifically for the formatting operation.
        </p>

        <h3 className="text-xl font-semibold mt-6">Endpoint:</h3>
        <p>A single endpoint handling POST requests is suitable for submitting the JSON data.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`POST /format`}
          </pre>
        </div>
        <p>
          Using POST is appropriate because we are sending data (the JSON string and options) in the request body to be processed.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Send className="mr-2" size={20} /> Request Format:
        </h3>
        <p>
          The request body should be a JSON object containing the raw JSON string to be formatted and optionally, formatting options.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Request Body (JSON):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "jsonString": "YOUR_JSON_STRING_HERE",
  "options": {
    // Optional formatting options
    "indent": 2, // Number of spaces for indentation (default: 2)
    "indentChar": " ", // Character for indentation (' ' or '\\t') (default: ' ')
    "sortKeys": false, // Whether to sort object keys alphabetically (default: false)
    "compact": false // Output minified JSON (overrides indent/indentChar) (default: false)
    // Add other options as needed (e.g., line endings, quote style - though less common for pure JSON)
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          The <code>jsonString</code> field is mandatory. The <code>options</code> object is optional. If omitted,
          default formatting rules (e.g., 2-space indentation) would apply.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Inbox className="mr-2" size={20} /> Successful Response Format (200 OK):
        </h3>
        <p>
          The response body should contain the formatted JSON string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Response Body (JSON):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "formattedJsonString": "YOUR_FORMATTED_JSON_STRING_HERE"
}`}
            </pre>
          </div>
        </div>
        <p>
          Returning a JSON object containing the string is often more robust than returning a plain text string,
          especially if you might add metadata to the response later. The content type should be <code>application/json</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <SlidersHorizontal className="mr-3" /> Formatting Options:
        </h3>
        <p>
          Providing sensible options allows developers to customize the output to match their preferences or project standards.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Indentation:</strong>
            <ul className="list-circle pl-6 mt-1">
              <li><code>indent</code> (number): How many spaces or tabs to use per level.</li>
              <li><code>indentChar</code> (string: " " | "\\t"): Whether to use spaces or tabs.</li>
            </ul>
          </li>
          <li>
            <strong>Sorting Keys:</strong> <code>sortKeys</code> (boolean): Useful for diffing large JSON objects or ensuring deterministic output.
          </li>
          <li>
            <strong>Compact/Minified Output:</strong> <code>compact</code> (boolean): Output JSON on a single line, removing all unnecessary whitespace. This option should typically override indentation settings.
          </li>
          <li>
            <strong>Line Endings:</strong> (Advanced) Could potentially offer options for `\n` or `\r\n`, though usually standardized by the server.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-3" /> Error Handling
        </h2>
        <p>
          Robust error handling is crucial for any API.
        </p>
        <h3 className="text-xl font-semibold mt-6">Invalid JSON Input:</h3>
        <p>
          If the provided <code>jsonString</code> is not valid JSON, the API should return a client error status code (e.g., 400 Bad Request) and a clear error message.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Error Response (400 Bad Request):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "error": "Invalid JSON string provided.",
  "details": "Unexpected token 'o' at position 1." // Optional: Provide parsing error details
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Invalid Options:</h3>
        <p>
          If the <code>options</code> object is malformed or contains invalid values (e.g., negative indent), return 400 Bad Request.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Error Response (400 Bad Request):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "error": "Invalid options provided.",
  "details": "'indent' must be a non-negative number."
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Server Errors:</h3>
        <p>
          Any internal server issues should result in a 5xx status code (e.g., 500 Internal Server Error). Error response body should be generic for security reasons.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Error Response (500 Internal Server Error):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "error": "An internal server error occurred.",
  "requestId": "..." // Optional: For tracing
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Plug className="mr-3" /> Consuming the API (Examples)
        </h2>
        <p>
          Here's how developers in different languages might interact with this API. The core structure of the HTTP request (POST method, JSON body, content type) remains consistent.
        </p>

        <h3 className="text-xl font-semibold mt-6">JavaScript (using Fetch API):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4 overflow-x-auto">
          <pre>
            {`const jsonString = '{"name":"Test","age":30,"data":[1,2,3]}';
const apiUrl = 'https://your-api-url.com/format'; // Replace with actual API URL

async function formatJson(jsonString, options = {}) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonString: jsonString,
        options: options,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors (e.g., 400, 500)
      console.error('API Error:', response.status, data.error);
      return null;
    }

    return data.formattedJsonString;

  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}

// Example Usage:
formatJson(jsonString, { indent: 4, sortKeys: true })
  .then(formatted => {
    if (formatted) {
      console.log('Formatted JSON:\\n', formatted);
    } else {
      console.log('Failed to format JSON.');
    }
  });`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Python (using requests library):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4 overflow-x-auto">
          <pre>
            {`import requests
import json

json_string = '{"name":"Test","age":30,"data":[1,2,3]}'
api_url = 'https://your-api-url.com/format' # Replace with actual API URL

def format_json(json_string, options=None):
    payload = {
        "jsonString": json_string,
        "options": options if options is not None else {}
    }
    headers = {
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

        data = response.json()
        return data.get("formattedJsonString")

    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {e}")
        if response and response.content:
             try:
                 error_data = response.json()
                 print(f"API Error Details: {error_data.get('error')}")
             except json.JSONDecodeError:
                 print(f"API returned non-JSON error response: {response.text}")
        return None

# Example Usage:
formatted_json = format_json(json_string, options={"indent": 4, "sortKeys": True})

if formatted_json:
    print("Formatted JSON:\\n", formatted_json)
else:
    print("Failed to format JSON.")`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-3" /> Considerations for Implementation
        </h2>
        <p>
          When building the API backend, you'll need to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Choose a Language/Framework:</strong> Any web framework capable of handling HTTP requests and JSON parsing (Node.js with Express/Koa/Fastify, Python with Flask/Django/FastAPI, Ruby on Rails, Go with Echo/Gin, etc.) will work.
          </li>
          <li>
            <strong>Utilize a JSON Library:</strong> Use a robust JSON parsing and serializing library in your chosen language that supports controlled indentation and potentially key sorting (most standard libraries do).
          </li>
          <li>
            <strong>Input Validation:</strong> Strictly validate the incoming request body structure and the types/values of the options.
          </li>
          <li>
            <strong>Error Handling Implementation:</strong> Implement the error responses discussed earlier with appropriate HTTP status codes.
          </li>
          <li>
            <strong>Scalability:</strong> Consider how the API will scale if processing very large JSON payloads or handling high request volumes. Streaming or asynchronous processing might be needed.
          </li>
          <li>
            <strong>Security:</strong> Protect the API against abuse (e.g., large payloads causing denial of service), and ensure proper input sanitization (though less critical for pure JSON formatting than with other data types).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          A cross-language JSON formatter API provides a valuable service for maintaining consistency and improving developer workflows across diverse technology stacks. By designing a simple, RESTful interface with clear request/response formats and sensible options, you create a tool that is easy to understand, integrate, and use from virtually any programming environment. This approach centralizes a common utility function, making updates and standardization much more manageable.
        </p>
      </div>
    </>
  );
}