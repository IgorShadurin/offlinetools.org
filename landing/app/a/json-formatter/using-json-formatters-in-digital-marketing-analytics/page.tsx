import type { Metadata } from "next";
import { FileJson, Code, Sparkles, Bug, CheckCircle, Database } from "lucide-react"; // Using lucide-react for icons

export const metadata: Metadata = {
  title: "Using JSON Formatters in Digital Marketing Analytics",
  description:
    "Understand how JSON formatters improve readability, debugging, and integration of marketing analytics data.",
};

// Define a recursive type alias for any valid JSON value
// This structure avoids the circular reference error by defining the recursive structures
// ({ [key: string]: JsonValue } and Array<JsonValue>) directly within the union.
type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | Array<JsonValue>;

// Helper function to format JSON string for display
// This is a simple utility function, not a component, and doesn't use state.
function formatJsonStringForDisplay(jsonString: string, space: number = 2): string {
  try {
    // Parse into our defined type
    const obj: JsonValue = JSON.parse(jsonString);
    return JSON.stringify(obj, null, space);
  } catch (e) {
    // Return original string or an error message if parsing fails
    console.error("Failed to parse JSON string for display:", e);
    // Basic handling for non-JSON strings
    if (typeof jsonString === "string") {
      return `// Invalid JSON format:\n${jsonString}`;
    }
    return `// Invalid input type for JSON formatting.`;
  }
}

// Example of processing JSON data programmatically (server-side or utility)
// This demonstrates how JSON data might be handled in a Next.js backend context.
interface AnalyticsEvent {
  event_name: string;
  timestamp: number;
  user_id: string;
  // Use the object type directly based on the JsonValue definition
  event_params?: { [key: string]: JsonValue };
  user_properties?: { [key: string]: JsonValue };
}

function processAnalyticsEventJson(jsonString: string): string {
  try {
    // Assuming the incoming string represents an AnalyticsEvent structure
    const event: AnalyticsEvent = JSON.parse(jsonString);

    // Example processing logic (no state needed)
    let summary = `Event: ${event.event_name} at ${new Date(event.timestamp * 1000).toISOString()}\n`;
    summary += `User ID: ${event.user_id}\n`;

    if (event.event_params) {
      summary += `Event Parameters:\n${formatJsonStringForDisplay(JSON.stringify(event.event_params))}\n`;
    }

    if (event.user_properties) {
      summary += `User Properties:\n${formatJsonStringForDisplay(JSON.stringify(event.user_properties))}\n`;
    }

    return summary;
  } catch (e) {
    console.error("Error processing analytics event JSON:", e);
    return `Error processing JSON: ${e instanceof Error ? e.message : String(e)}`;
  }
}

export default function JsonFormattersAnalyticsPage() {
  const messyJsonExample =
    '{"eventName":"page_view","timestamp":1678886400,"userId":"user123","params":{"pagePath":"/pricing","referrer":"/home","engagementTimeMsec":1500},"userProps":{"browser":"Chrome","os":"Windows","country":"US"}}';
  const formattedJsonExample = formatJsonStringForDisplay(messyJsonExample);

  const rawApiDataExample = `{
    "campaigns": [
      {
        "id": "cmp_abc123",
        "name": "Summer Sale 2023",
        "status": "active", "startDate": "2023-06-01",
        "endDate": "2023-08-31",
        "metrics": { "clicks": 5824, "impressions": 150000, "costUsd": 1250.75 }
      },
      {
        "id": "cmp_xyz789",
        "name": "Holiday Promo",
        "status": "paused",
        "startDate": "2023-11-15", "endDate": "2023-12-31",
        "metrics": null }
    ],
    "reportGenerated": "2024-01-10T10:30:00Z"
  }`;
  const formattedApiDataExample = formatJsonStringForDisplay(rawApiDataExample);

  const processedEventSummary = processAnalyticsEventJson(messyJsonExample);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="text-blue-600" size={32} /> Using JSON Formatters in Digital Marketing Analytics
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={24} /> Why JSON Formatters Matter
          </h2>
          <p className="mb-4">
            In the world of digital marketing analytics, data flows from numerous sources: tracking pixels, APIs from
            advertising platforms (Google Ads, Facebook Ads, etc.), CRM systems, analytics platforms (Google Analytics
            4, Adobe Analytics), and more. A significant portion of this data is transmitted or stored in JSON
            (JavaScript Object Notation) format due to its lightweight nature and human-readability.
          </p>
          <p className="mb-4">
            While JSON is designed to be readable, raw or unformatted JSON can often be dense, with no indentation or
            line breaks, making it incredibly difficult to parse visually. This is where JSON formatters come in.
          </p>
          <p>
            A <strong>JSON formatter</strong> is a tool or library that takes a JSON string and outputs a new string
            that is properly indented, with consistent spacing and line breaks. This simple transformation dramatically
            improves readability and aids in debugging and understanding the data structure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Common Scenarios & Benefits
          </h2>
          <p className="mb-4">
            Formatted JSON isn&apos;t just about aesthetics; it provides tangible benefits in analytical workflows:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>
                <Bug size={18} className="inline-block mr-1 text-green-600" /> Debugging & Troubleshooting:
              </strong>{" "}
              When inspecting raw data from tracking events or API responses, a formatted view makes it easy to spot
              missing fields, incorrect data types, or structural errors. Quickly navigating nested objects and arrays
              becomes possible.
            </li>
            <li>
              <strong>
                <CheckCircle size={18} className="inline-block mr-1 text-teal-600" /> Data Validation:
              </strong>{" "}
              While formatters don&apos;t validate data *content*, they help verify the structural integrity of the
              JSON. Invalid JSON syntax will often break a formatter, immediately alerting you to a fundamental parsing
              issue.
            </li>
            <li>
              <strong>
                <Database size={18} className="inline-block mr-1 text-purple-600" /> Data Inspection & Exploration:
              </strong>{" "}
              Before writing code to process unfamiliar data, formatting allows developers and analysts to quickly
              understand the schema, key names, and value types, accelerating the development of data connectors or
              transformation scripts.
            </li>
            <li>
              <strong>
                <Code size={18} className="inline-block mr-1 text-orange-600" /> Integration Development:
              </strong>{" "}
              When working with APIs that return compact JSON, formatting the response helps developers match the data
              structure against API documentation and build robust parsers for their applications or data pipelines.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson size={24} /> How JSON Formatters Work (Conceptually)
          </h2>
          <p className="mb-4">At its core, a JSON formatter involves two steps:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Parsing:</strong> The unformatted JSON string is parsed into an in-memory representation,
              typically a JavaScript object or array, depending on the root element of the JSON. This step validates the
              JSON syntax. If the syntax is invalid, parsing fails.
            </li>
            <li>
              <strong>Stringifying (with formatting options):</strong> The in-memory object/array is then converted back
              into a JSON string using a stringification method that supports indentation and spacing. Standard
              libraries in most programming languages offer this functionality.
            </li>
          </ol>
          <p className="mt-4">
            In JavaScript/TypeScript, the built-in <code>JSON</code> object provides the core methods:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <code>JSON.parse(jsonString)</code>: Parses a JSON string into a JavaScript object/array.
            </li>
            <li>
              <code>JSON.stringify(jsObject, replacer, space)</code>: Converts a JavaScript object/array into a JSON
              string. The <code>space</code> parameter (a number or string) is key for formatting, specifying the number
              of spaces or the string to use for indentation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={24} /> Practical Examples
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example 1: Improving Readability</h3>
          <p className="mb-3">Consider a raw tracking event payload. It might look like this compressed string:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 text-sm overflow-x-auto mb-4">
            <pre className="whitespace-pre-wrap break-words">{messyJsonExample}</pre>
          </div>
          <p className="mb-3">Applying a formatter makes it immediately understandable:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 text-sm overflow-x-auto mb-4">
            <pre className="whitespace-pre-wrap break-words">{formattedJsonExample}</pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example 2: Formatting API Response Data</h3>
          <p className="mb-3">Marketing APIs often return complex, nested data. Unformatted response:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 text-sm overflow-x-auto mb-4">
            <pre className="whitespace-pre-wrap break-words">{rawApiDataExample}</pre>
          </div>
          <p className="mb-3">Formatted response for easier inspection:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 text-sm overflow-x-auto mb-4">
            <pre className="whitespace-pre-wrap break-words">{formattedApiDataExample}</pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example 3: Programmatic Processing (Backend Context)</h3>
          <p className="mb-3">
            In a Next.js backend (like an API route or server component), you might receive raw JSON data. You can parse
            it, process it, and potentially format parts of it for logging or storage, all without client-side state.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 text-sm overflow-x-auto mb-4">
            <h4 className="font-medium mb-2">Input JSON (same as Example 1):</h4>
            <pre className="whitespace-pre-wrap break-words mb-4">{messyJsonExample}</pre>
            <h4 className="font-medium mb-2">Output of Processing Function:</h4>
            <pre className="whitespace-pre-wrap break-words">{processedEventSummary}</pre>
          </div>
          <p>
            This demonstrates parsing, accessing fields, and using <code>JSON.stringify</code> with formatting (via the{" "}
            <code>formatJsonStringForDisplay</code> helper) within a server-side logic flow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Integrating Formatters into Workflow
          </h2>
          <p className="mb-4">Beyond manual use of online tools, formatters can be integrated programmatically:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Logging & Monitoring:</strong> Format JSON payloads before logging them to make logs easier to
              read during debugging.
            </li>
            <li>
              <strong>Data Ingestion Pipelines:</strong> While not always necessary for machine processing, formatting
              can be added during early stages for inspection points or error reporting.
            </li>
            <li>
              <strong>Developer Tools:</strong> Building internal tools or debugging interfaces that automatically
              format any displayed JSON data.
            </li>
          </ul>
          <p className="mt-4">
            Many code editors and IDEs have built-in JSON formatting capabilities or extensions that automatically
            format JSON files or selected JSON snippets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Bug size={24} /> Challenges
          </h2>
          <p className="mb-4">While formatters are helpful, be mindful of:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Performance on Large Data:</strong> Formatting extremely large JSON strings (tens or hundreds of
              megabytes) can consume significant memory and processing time.
            </li>
            <li>
              <strong>Source of Truth:</strong> Always refer to the original, raw JSON when debugging
              serialization/deserialization issues, as formatting is a display layer.
            </li>
            <li>
              <strong>Strictness:</strong> Most formatters require valid JSON syntax. They won&apos;t fix fundamental
              parsing errors, but they will highlight them by failing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={24} /> Conclusion
          </h2>
          <p>
            JSON formatters are simple yet powerful tools in the digital marketing analytics toolkit, particularly for
            developers and analysts working directly with raw data feeds. By transforming dense, unreadable JSON into a
            structured, indented format, they significantly enhance debugging, data inspection, and the overall
            efficiency of working with marketing data APIs and event payloads. Integrating formatting into your
            workflow, whether through editor extensions, online tools, or simple programmatic steps like using{" "}
            <code>JSON.stringify(..., null, 2)</code>, is a valuable practice for anyone handling JSON data in this
            domain.
          </p>
        </section>
      </div>
    </>
  );
}
