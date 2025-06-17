import type { Metadata } from "next";
import { FileJson, Search, Database, Eye, Code } from "lucide-react"; // Changed FormatJson to FileJson

export const metadata: Metadata = {
  title: "JSON Formatters for Log Analysis and Management | Offline Tools",
  description:
    "Explore how JSON formatters enhance log analysis and management, improving readability, searchability, and structure for developers.",
};

export default function JsonLogFormattersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <FileJson className="inline-block mr-2 h-8 w-8 text-blue-500" /> JSON Formatters for Log Analysis and Management{" "}
        {/* Changed FormatJson to FileJson */}
      </h1>

      <div className="space-y-6">
        <p>
          In modern application development, logs are indispensable for debugging, monitoring, and understanding system
          behavior. As applications grow in complexity and scale, dealing with large volumes of unstructured or
          inconsistently formatted logs becomes a significant challenge. This is where{" "}
          <strong>JSON formatting for logs</strong> becomes a powerful technique.
        </p>
        <p>
          Instead of logging simple strings, many developers and logging libraries now adopt structured logging, often
          using JSON. This transforms log messages into machine-readable, key-value pairs. JSON formatters, in this
          context, are tools or processes that help in generating, standardizing, or pretty-printing these JSON logs,
          making them easier for both machines and humans to process and understand.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Eye className="inline-block mr-2 h-6 w-6 text-green-500" /> Why Use JSON for Logging?
        </h2>
        <p>Logging in JSON offers several advantages over traditional plain text or custom formats:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Structure:</strong> JSON provides a clear, hierarchical structure. Each log entry is a discrete
            object with defined fields (e.g., <code>timestamp</code>, <code>level</code>, <code>message</code>,{" "}
            <code>userId</code>, <code>requestId</code>).
          </li>
          <li>
            <strong>Machine Readability:</strong> Structured data is easily parsed by log analysis tools, monitoring
            systems, and scripts. This enables automated ingestion, indexing, filtering, and analysis.
          </li>
          <li>
            <strong>Searchability:</strong> With key-value pairs, you can perform precise searches based on specific
            fields (e.g., find all logs with <code>level: "ERROR"</code> and <code>userId: "123"</code>). This is far
            more efficient than regex matching on unstructured text.
          </li>
          <li>
            <strong>Context:</strong> Additional contextual data (like user IDs, transaction IDs, request details,
            specific application state) can be easily included as fields within the JSON object, providing richer
            information without complex parsing logic.
          </li>
          <li>
            <strong>Interoperability:</strong> JSON is a standard, widely supported format. Many logging frameworks, log
            aggregators (like Elasticsearch, Splunk), and cloud logging services natively support JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="inline-block mr-2 h-6 w-6 text-purple-500" /> Role of JSON Formatters
        </h2>
        <p>
          While logging libraries handle the conversion of log data into a JSON object, JSON formatters often refer to
          the process or tools that:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Pretty-Printing:</strong> Add indentation and line breaks to flat JSON strings, making them
            human-readable in terminals or log viewers.
          </li>
          <li>
            <strong>Standardization:</strong> Ensure consistency across different parts of an application or even
            different services. This might involve enforcing required fields, renaming fields, or reordering keys.
          </li>
          <li>
            <strong>Enrichment:</strong> Add common fields like timestamps, hostnames, process IDs, or source file
            information automatically.
          </li>
          <li>
            <strong>Filtering/Projection:</strong> Select only specific fields to include in the final log output to
            reduce noise and volume.
          </li>
          <li>
            <strong>Transformation:</strong> Modify values, redact sensitive data, or convert data types before
            outputting the final log line.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="inline-block mr-2 h-6 w-6 text-orange-500" /> Simple Formatting Example (Pretty-Printing){" "}
          {/* Changed FormatJson to FileJson */}
        </h2>
        <p>
          The most basic form of JSON formatting is pretty-printing for readability. Most programming languages and
          environments provide built-in ways to do this. In JavaScript/TypeScript, <code>JSON.stringify()</code> with
          additional arguments is commonly used.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">TypeScript/JavaScript Pretty-Printing:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Example log data object
const logData = {
  timestamp: new Date().toISOString(),
  level: "INFO",
  message: "User logged in successfully",
  userId: "user_abc",
  ipAddress: "192.168.1.100",
  details: {
    method: "POST",
    path: "/api/login"
  }
};

// Original flat JSON string (often how systems log by default)
const flatJsonString = JSON.stringify(logData);
console.log("Flat JSON:");
console.log(flatJsonString);
// Output: {"timestamp":"...","level":"INFO","message":"...","userId":"user_abc","ipAddress":"192.168.1.100","details":{"method":"POST","path":"/api/login"}}

// Pretty-printed JSON string (for human readability)
const prettyJsonString = JSON.stringify(logData, null, 2); // null for replacer, 2 for spaces
console.log("\\nPretty-Printed JSON:");
console.log(prettyJsonString);
/* Output:
Pretty-Printed JSON:
{
  "timestamp": "...",
  "level": "INFO",
  "message": "User logged in successfully",
  "userId": "user_abc",
  "ipAddress": "192.168.1.100",
  "details": {
    "method": "POST",
    "path": "/api/login"
  }
}
*/

// Using a replacer function (e.g., to filter or modify)
const filteredJsonString = JSON.stringify(logData, (key, value) => {
  // Example: Exclude ipAddress field
  if (key === 'ipAddress') {
    return undefined; // undefined means the key is excluded
  }
  // Example: Redact sensitive data (simple example)
  if (key === 'userId' && typeof value === 'string') {
      return \`redacted_\${value.substring(0, 3)}...\`; // Corrected template literal
  }
  return value; // Include other keys and values
}, 2);
console.log("\\nFiltered/Modified JSON:");
console.log(filteredJsonString);
/* Output:
Filtered/Modified JSON:
{
  "timestamp": "...",
  "level": "INFO",
  "message": "User logged in successfully",
  "userId": "redacted_use...",
  "details": {
    "method": "POST",
    "path": "/api/login"
  }
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          While <code>JSON.stringify()</code> is great for basic pretty-printing and simple transformations, dedicated
          logging libraries and formatters offer more sophisticated features for structuring and enriching logs
          consistently.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="inline-block mr-2 h-6 w-6 text-blue-500" /> Standardizing Log Structure
        </h2>
        <p>
          Beyond just pretty-printing, a key aspect of JSON log formatting is standardizing the structure across an
          application or microservices. This involves agreeing on a schema for log entries.
        </p>
        <p>A common standard might include fields like:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>timestamp</code> (ISO 8601 format recommended)
          </li>
          <li>
            <code>level</code> (e.g., DEBUG, INFO, WARN, ERROR, FATAL)
          </li>
          <li>
            <code>message</code> (the primary human-readable log message)
          </li>
          <li>
            <code>service</code> (the name of the service/application)
          </li>
          <li>
            <code>version</code> (version of the service)
          </li>
          <li>
            <code>hostname</code> (where the log originated)
          </li>
          <li>
            <code>traceId</code> / <code>spanId</code> (for distributed tracing)
          </li>
          <li>
            <code>userId</code> / <code>accountId</code> (if applicable)
          </li>
          <li>
            <code>error</code> (structured error details if level is WARN or higher)
          </li>
          <li>
            Arbitrary <code>context</code> or additional data object
          </li>
        </ul>

        <p>
          Using a formatter provided by a logging library (like Pino, Bunyan, Winston in Node.js) helps enforce this
          standard schema automatically for every log call.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Logging Library Usage:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Conceptual example (syntax depends on the library, e.g., Pino)

// Configure logger with JSON output
// const logger = require('pino')({
//   level: process.env.LOG_LEVEL || 'info',
//   formatters: {
//     level: (label) => {
//       return { level: label.toUpperCase() }; // Ensure level is uppercase
//     }
//   },
//   messageKey: 'message', // Use 'message' key for the primary string
//   timestamp: () => \`,"timestamp":"\${new Date().toISOString()}"\`, // Add ISO timestamp
//   // Add hooks or transforms for standardization/enrichment
// });

// Example log calls
// logger.info({ userId: 'user123' }, 'User registration started');
// logger.error({ error: err.message, stack: err.stack, transactionId: 'txn_abc' }, 'Database transaction failed');

// The library's "formatter" (often called a serializer or transport)
// would automatically add timestamp, level, service name, etc.,
// resulting in consistent JSON objects like:
/*
{
  "level": "INFO",
  "timestamp": "2023-10-27T10:30:00.123Z",
  "service": "auth-service",
  "message": "User registration started",
  "userId": "user123"
}
{
  "level": "ERROR",
  "timestamp": "2023-10-27T10:30:05.456Z",
  "service": "auth-service",
  "message": "Database transaction failed",
  "error": "...",
  "stack": "...",
  "transactionId": "txn_abc"
}
*/
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="inline-block mr-2 h-6 w-6 text-teal-500" /> JSON Formatters for Log Analysis Tools
        </h2>
        <p>
          While application-side formatters create the JSON log lines, other tools often act as formatters in the
          analysis pipeline:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Log Agents (e.g., Filebeat, Fluentd):</strong> These agents read log files, parse structured logs
            (like JSON), and forward them to central logging systems. They can sometimes apply transformations or add
            metadata during this process.
          </li>
          <li>
            <strong>Log Aggregators/Analyzers (e.g., Elasticsearch/Kibana, Splunk):</strong> These platforms are
            designed to ingest, index, and query structured data like JSON logs. Their ingestion pipelines often include
            formatting steps, such as parsing the JSON string, extracting fields, converting data types, and adding
            system-level metadata (like ingest time, source file).
          </li>
          <li>
            <strong>Command-Line Tools:</strong> Utilities like <code>jq</code> are powerful JSON processors that can
            format (pretty-print), filter, and transform JSON log streams directly in the terminal, which is invaluable
            for quick analysis.
          </li>
          <li>
            <strong>Online JSON Formatters/Viewers:</strong> Web-based tools allow you to paste raw JSON log lines and
            view them in a structured, collapsible, and syntax-highlighted format for easier debugging.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="inline-block mr-2 h-6 w-6 text-red-500" /> Best Practices for JSON Logging
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Adopt a Schema:</strong> Define and document a standard set of fields for your log entries. This is
            crucial for consistent analysis.
          </li>
          <li>
            <strong>Log Contextual Data:</strong> Include relevant information like user IDs, request IDs, session IDs,
            etc., in log entries.
          </li>
          <li>
            <strong>Handle Errors as Structured Data:</strong> Instead of just logging an error message string, include
            error type, stack trace, and relevant variables in a dedicated <code>error</code> field object.
          </li>
          <li>
            <strong>Avoid Nested JSON in Messages:</strong> If your log message itself contains data that looks like
            JSON, put that data into a separate structured field rather than embedding a JSON string inside the main{" "}
            <code>message</code> string.
          </li>
          <li>
            <strong>Use Standard Data Types:</strong> Log numbers as numbers, booleans as booleans, and timestamps in a
            standard format (like ISO 8601) to facilitate easier querying.
          </li>
          <li>
            <strong>Consider Log Volume and Cost:</strong> While structured logs are verbose, their benefits for
            analysis usually outweigh the increased storage cost. However, be mindful of logging excessive,
            high-cardinality data if your log analysis tool charges per data volume.
          </li>
          <li>
            <strong>Use Dedicated Logging Libraries:</strong> Rely on established libraries that provide robust JSON
            formatting, transports (output destinations), and features like sampling or redaction.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="inline-block mr-2 h-6 w-6 text-pink-500" /> Log Analysis with Structured JSON
        </h2>
        <p>
          Once logs are consistently formatted as JSON, analysis becomes significantly more powerful. You can leverage
          the querying capabilities of log management systems:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Find all "ERROR" logs for a specific <code>service</code> within a time range.
          </li>
          <li>
            Filter logs by <code>userId</code> to see all actions performed by a user.
          </li>
          <li>
            Aggregate logs by <code>requestId</code> to trace a request through multiple services.
          </li>
          <li>
            Create dashboards showing error rates per <code>version</code> or latency based on custom timing fields.
          </li>
          <li>Set up alerts based on specific field values or patterns.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="inline-block mr-2 h-6 w-6 text-yellow-500" /> Conclusion{" "}
          {/* Changed FormatJson to FileJson */}
        </h2>
        <p>
          Adopting JSON formatting for application logs is a fundamental step towards effective log analysis and
          management. It transforms raw text streams into structured data assets that are easily consumed by machines
          and, when pretty-printed, remain understandable to humans. By standardizing log formats and leveraging the
          power of JSON, developers and operations teams can gain deeper insights into system behavior, troubleshoot
          issues faster, and build more robust and observable applications. While the formatting itself might seem like
          a small step, it unlocks the full potential of modern log analysis tools and practices.
        </p>
      </div>
    </>
  );
}
