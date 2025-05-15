import type { Metadata } from "next";
import {
  Bug,
  FileJson,
  ScanEye,
  CircleCheck,
  Info,
  AlertTriangle,
  Zap,
  Database,
  Timer,
  Key,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Logging Patterns for JSON Processing Diagnostics | Offline Tools",
  description:
    "Learn effective logging patterns to diagnose and troubleshoot issues when processing JSON data in your applications.",
};

export default function LoggingPatternsForJsonDiagnosticsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson size={30} className="text-blue-500" />
        Logging Patterns for JSON Processing Diagnostics
      </h1>

      <div className="space-y-6">
        <p>
          Processing JSON data is a ubiquitous task in modern software development, from consuming APIs to reading configuration files. However, dealing with external, dynamic, or complex JSON inputs can often lead to unexpected issues like parsing errors, validation failures, or data transformation bugs. Effective logging is paramount for quickly identifying, diagnosing, and resolving these problems. This article explores various logging patterns specifically tailored for JSON processing diagnostics.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug size={24} className="text-red-500" />
          Why Log JSON Processing?
        </h2>
        <p>
          Logging provides visibility into the runtime behavior of your application. When processing JSON, logs can answer critical questions:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Was the input JSON received correctly?</li>
          <li>Did the parsing step succeed or fail? Why?</li>
          <li>Does the parsed data conform to the expected structure or schema?</li>
          <li>Were there issues during data extraction or transformation?</li>
          <li>What was the exact input that caused an error?</li>
        </ul>
        <p>
          Without appropriate logging, debugging JSON processing issues can be a frustrating exercise of guesswork and manual inspection, especially in production environments.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ScanEye size={24} className="text-green-500" />
          Key Stages for Logging
        </h2>
        <p>
          Consider logging at these critical points in your JSON processing pipeline:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Input Reception:</strong> Log when JSON data is received, potentially logging metadata like source, size, or an identifier.</li>
          <li><strong>Parsing Attempt:</strong> Log the start of the parsing process.</li>
          <li><strong>Parsing Success/Failure:</strong> Crucially log the outcome.</li>
          <li><strong>Validation (Schema/Type Checking):</strong> Log results of validation steps, listing specific failures.</li>
          <li><strong>Data Extraction/Transformation:</strong> Log intermediate or final results, or errors encountered during mapping.</li>
          <li><strong>Output/Usage:</strong> Log when the processed data is used or sent elsewhere.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info size={24} className="text-yellow-500" />
          Logging Levels and What to Log
        </h2>
        <p>
          Use standard logging levels (e.g., &#x60;INFO&#x60;, &#x60;WARN&#x60;, &#x60;ERROR&#x60;, &#x60;DEBUG&#x60;) to categorize the severity and verbosity of your logs.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>DEBUG:</strong> Highly verbose logs, useful during development or deep troubleshooting. Can include the full raw JSON input (be cautious with size and sensitivity!) or the fully parsed object.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                {`// Example DEBUG log (concept)
logger.debug('Received raw JSON for processing', {
  source: req.headers['user-agent'],
  contentLength: req.headers['content-length'],
  rawJson: jsonString // Use with caution!
});

logger.debug('Parsed JSON object', {
  parsedData: parsedObject // Use with caution!
});`}
              </pre>
            </div>
          </li>
          <li>
            <strong>INFO:</strong> Standard operational logs. Indicate successful processing steps or general progress.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                {`// Example INFO log
logger.info('Successfully parsed JSON data', {
  processId: 'xyz123',
  dataType: 'user_profile',
  keysCount: Object.keys(parsedObject).length
});`}
              </pre>
            </div>
          </li>
          <li>
            <strong>WARN:</strong> Indicate potential issues or non-critical failures that the application might recover from, such as optional fields missing, or data types not exactly matching but still usable.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                {`// Example WARN log
logger.warn('Optional field "address" missing in JSON data', {
  processId: 'abc456',
  userId: parsedObject.id // Log relevant context
});`}
              </pre>
            </div>
          </li>
          <li>
            <strong>ERROR:</strong> Critical failures that prevent successful processing, such as parsing errors, schema validation failures, or errors during essential data transformation.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                {`// Example ERROR log
logger.error('Failed to parse JSON input', {
  processId: 'def789',
  error: err.message,
  // Potentially log the start of the problematic input slice
  // inputSample: jsonString.substring(Math.max(0, err.position - 50), err.position + 50)
});`}
              </pre>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} className="text-purple-500" />
          Structured Logging for JSON Diagnostics
        </h2>
        <p>
          Structured logging is particularly effective for JSON processing. Instead of plain text messages, logs are output as JSON objects (or similar structured formats). This allows for easier parsing, searching, and analysis by log management systems.
        </p>
        <p>
          When processing JSON, you can include relevant pieces of the JSON data itself within your structured logs.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Plain Text Log Example:</h3>
          <pre>
            {`ERROR: [Process abc456] JSON validation failed: Field 'age' has wrong type. Expected number, got string.`}
          </pre>
          <h3 className="text-lg font-medium mb-2 mt-4">Structured Log Example (JSON):</h3>
          <pre>
            {`{
  "level": "ERROR",
  "timestamp": "...",
  "message": "JSON validation failed",
  "processId": "abc456",
  "errorDetails": {
    "type": "ValidationError",
    "field": "age",
    "issue": "WrongType",
    "expected": "number",
    "received": "string"
  },
  "inputSample": "... (if appropriate)"
}`}
          </pre>
        </div>
        <p>
          Structured logs make it simple to query, for example, all validation errors for a specific field across many log entries.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle size={24} className="text-orange-500" />
          Logging Specific Errors and Details
        </h2>
        <h3 className="text-xl font-semibold mt-6">Parsing Errors (Syntax)</h3>
        <p>
          When a JSON string is malformed, the parser will typically throw an error. Log the error message and, if available, the position in the string where the error occurred. Logging a snippet of the input around the error position is highly diagnostic.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example parsing error log
try {
  const parsed = JSON.parse(jsonString);
  // ... process parsed
} catch (err: any) {
  logger.error('Failed to parse JSON string', {
    processId: 'xyz123',
    errorType: 'JsonParseError',
    errorMessage: err.message,
    errorPosition: err.message.match(/at position (\\d+)/)?.[1], // Extract position if available
    inputSample: jsonString.substring(Math.max(0, err.message.match(/at position (\\d+)/)?.[1] - 50), parseInt(err.message.match(/at position (\\d+)/)?.[1] || '0', 10) + 50) // Log snippet
  });
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Validation Errors (Schema/Content)</h3>
        <p>
          After successful parsing, you often need to validate the structure and data types against an expected schema (e.g., using libraries like Zod, Joi, Yup). Log *each* validation failure found.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example validation error log (using a hypothetical validator)
const validationResult = mySchema.validate(parsedObject);
if (!validationResult.isValid) {
  validationResult.errors.forEach((validationErr: any) => {
    logger.error('JSON schema validation failed', {
      processId: 'abc456',
      errorType: 'JsonValidationError',
      errorMessage: validationErr.message,
      field: validationErr.path.join('.'), // Path to the field (e.g., 'user.profile.age')
      details: validationErr.details // Specific validation rule failure
    });
  });
} else {
  logger.info('JSON schema validation successful', { processId: 'abc456' });
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Data Transformation Errors</h3>
        <p>
          Mapping parsed JSON data to your internal data structures can fail if expected fields are missing (even if schema validation passed loosely) or have unexpected values.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example transformation error log
try {
  const internalUser = {
    id: parsedObject.user_id,
    name: \`\${parsedObject.first_name} \${parsedObject.last_name}\`,
    isActive: parsedObject.status === 'active' // Potential issue if status is unexpected
  };
  if (typeof internalUser.id !== 'string') { // Add checks during mapping
     throw new Error("User ID is not a string");
  }
  // ... use internalUser
} catch (err: any) {
  logger.error('Error during JSON data transformation', {
    processId: 'def789',
    errorType: 'DataTransformationError',
    errorMessage: err.message,
    // Log relevant data from the parsed object that caused the issue
    sourceDataSample: {
       user_id: parsedObject?.user_id,
       status: parsedObject?.status
    }
  });
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Timer size={24} className="text-teal-500" />
          Performance Logging
        </h2>
        <p>
          For high-volume JSON processing, logging the time taken for parsing and validation can help identify bottlenecks.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example performance log
const startTime = Date.now();
try {
  const parsed = JSON.parse(jsonString);
  const parseDuration = Date.now() - startTime;
  logger.debug('JSON parsing duration', {
    processId: 'perf101',
    durationMs: parseDuration,
    inputSizeKb: Buffer.byteLength(jsonString, 'utf8') / 1024
  });

  const validationStartTime = Date.now();
  mySchema.validate(parsed); // Assuming sync validate
  const validationDuration = Date.now() - validationStartTime;
   logger.debug('JSON validation duration', {
    processId: 'perf101',
    durationMs: validationDuration
  });

  logger.info('JSON processing completed', {
     processId: 'perf101',
     totalDurationMs: Date.now() - startTime
  });

} catch (err) {
   // Log error as shown previously
}`}
          </pre>
        </div>

         <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Key size={24} className="text-zinc-500" />
          Handling Sensitive Data
        </h2>
        <p>
          Be extremely cautious when logging raw JSON input or parsed objects, especially in production. JSON data often contains sensitive information like personal details, financial data, or authentication tokens.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Avoid Logging Full Payloads:</strong> Only log full payloads at DEBUG level and ensure DEBUG logs are disabled or restricted in production environments.</li>
          <li><strong>Sanitize/Redact:</strong> Implement logic to remove or mask sensitive fields before logging parsed objects or input snippets (e.g., replace values of fields like &#x60;password&#x60;, &#x60;token&#x60;, &#x60;ssn&#x60;, &#x60;creditCardNumber&#x60;, &#x60;email&#x60; with &#x60;***REDACTED***&#x60;).</li>
          <li><strong>Log Relevant Metadata:</strong> Instead of the full data, log metadata like field names that were present, the count of items in an array, or a hash of the input (if logging the input itself is necessary for correlation but not for inspection).</li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example sanitization before logging (concept)
function sanitizeLogData(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const sensitiveKeys = ['password', 'token', 'ssn', 'creditCardNumber', 'email']; // Define sensitive fields
  const sanitized: any = Array.isArray(data) ? [] : {};
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        sanitized[key] = '***REDACTED***';
      } else if (typeof data[key] === 'object') {
        sanitized[key] = sanitizeLogData(data[key]); // Recurse for nested objects/arrays
      } else {
        sanitized[key] = data[key];
      }
    }
  }
  return sanitized;
}

// Use it:
// logger.debug('Parsed data (sanitized)', { sanitizedData: sanitizeLogData(parsedObject) });`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} className="text-blue-500" />
          Adding Context and Correlation IDs
        </h2>
        <p>
          When processing JSON, especially as part of a larger request or job, include a unique identifier in all related log messages. This "correlation ID" allows you to trace the entire flow of a single operation through your logs, which is invaluable for debugging distributed systems or understanding the context of an error.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example with correlation ID
const correlationId = generateUniqueId(); // Or get from request header
logger.info('Starting JSON processing', { correlationId, source: 'api-request' });

try {
   const parsed = JSON.parse(jsonString);
   logger.debug('JSON parsed successfully', { correlationId, keysCount: Object.keys(parsed).length });

   // ... validation and transformation ...

   logger.info('JSON processing finished', { correlationId, status: 'success' });

} catch (err: any) {
  logger.error('JSON processing failed', { correlationId, error: err.message });
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircleCheck size={24} className="text-green-500" />
          Conclusion
        </h2>
        <p>
          Effective logging is not just about writing messages to a file; it's a deliberate diagnostic strategy. By implementing structured logging, using appropriate levels, capturing specific error details (like position and field paths), sanitizing sensitive data, and including correlation IDs, you can significantly improve your ability to understand, troubleshoot, and resolve issues related to JSON processing in your applications. Invest time in refining your logging patterns – it will pay off immensely when things go wrong.
        </p>
      </div>
    </>
  );
}