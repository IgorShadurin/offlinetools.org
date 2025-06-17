import type { Metadata } from "next";
import { AlertTriangle, EyeOff, Lock, Server, Shield } from "lucide-react"; // Import necessary icons
import React from "react"; // Import React for ElementType

export const metadata: Metadata = {
  title: "Secure Handling of Sensitive Data in JSON Formatters | Offline Tools",
  description:
    "Understand the risks and implement best practices for handling sensitive data when working with JSON formats in backend applications.",
};

// Define recursive JSON types for better type safety than 'any'
type JsonValue = string | number | boolean | null | JsonObject | Array<JsonValue>;
interface JsonObject {
  [key: string]: JsonValue;
}

// Helper function for rendering icons
const Icon = ({
  IconComponent,
  size = 24,
  className = "",
}: {
  IconComponent: React.ElementType;
  size?: number;
  className?: string;
}) => <IconComponent size={size} className={`inline-block align-middle mr-2 ${className}`} />;

// Example redaction function (server-side logic)
function redactSensitiveData(data: JsonValue): JsonValue {
  // Handle null or non-object/array primitives
  if (data === null || typeof data !== "object") {
    return data;
  }

  // Create a deep copy to avoid modifying the original data
  // Use explicit casting for type safety based on Array.isArray check
  const redactedData: JsonValue = Array.isArray(data) ? [...(data as Array<JsonValue>)] : { ...(data as JsonObject) };

  const sensitiveKeys = ["password", "ssn", "creditCard", "apiKey", "privateKey", "authToken", "hash"]; // Added 'hash' as passwordHash is present

  // Process objects recursively
  if (typeof redactedData === "object" && !Array.isArray(redactedData) && redactedData !== null) {
    for (const key in redactedData) {
      // Ensure property belongs to the object and is not from prototype chain
      if (Object.prototype.hasOwnProperty.call(redactedData, key)) {
        const lowerCaseKey = key.toLowerCase();

        // Check if the key (case-insensitive) contains any sensitive keywords
        if (sensitiveKeys.some((sensitiveKey) => lowerCaseKey.includes(sensitiveKey))) {
          // Redact the value
          const value = redactedData[key];
          if (typeof value === "string") {
            redactedData[key] = "********"; // Full masking for strings
          } else if (typeof value === "number") {
            redactedData[key] = 0; // Mask numbers, e.g., with 0
          } else if (typeof value === "boolean") {
            redactedData[key] = false; // Mask booleans
          } else {
            // Mask other types (objects, arrays, null) with null
            redactedData[key] = null;
          }
        } else if (typeof redactedData[key] === "object") {
          // Recursively call for nested objects and arrays
          redactedData[key] = redactSensitiveData(redactedData[key]);
        }
      }
    }
  } else if (Array.isArray(redactedData)) {
    // Process arrays recursively on their elements
    for (let i = 0; i < redactedData.length; i++) {
      redactedData[i] = redactSensitiveData(redactedData[i]);
    }
  }

  return redactedData;
}

export default function SecureJsonHandlingPage() {
  // Example usage of the redaction function (demonstration, not actual runtime execution here)
  const originalDataExample: JsonObject = {
    userId: 123,
    username: "testuser",
    email: "testuser@example.com",
    passwordHash: "some_hashed_password", // This might also be sensitive!
    ssn: "XXX-XX-1234", // Even partially shown SSN is sensitive
    address: {
      street: "123 Main St",
      zip: "12345",
    },
    paymentInfo: {
      type: "CreditCard",
      number: "************4242", // Even masked partially is sensitive
      expiry: "12/25",
    },
    preferences: {
      theme: "dark",
    },
    auditLog: [
      { action: "login", timestamp: "..." },
      { action: "view_data", sensitiveDataPreview: "User ID: 123, Password: plaintext!" }, // Ouch!
    ],
    apiKey: "a_very_secret_key_12345",
  };

  // This variable is used below to generate the displayed string output, fixing the unused variable error
  const redactedDataExample: JsonValue = redactSensitiveData(originalDataExample);

  // Calculate the string output to display *before* the JSX return
  const safeJsonOutput = JSON.stringify(redactedDataExample, null, 2);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <Icon IconComponent={Shield} size={32} />
        Secure Handling of Sensitive Data in JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON is the ubiquitous format for data exchange, especially in web APIs. While convenient, handling sensitive
          information like passwords, personal identifiers (SSN, phone numbers), financial details, or API keys within
          JSON requires careful consideration to prevent accidental exposure. This page explores the risks and best
          practices for securely dealing with sensitive data, particularly within the context of backend services like
          those built with Next.js on the server side.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Icon IconComponent={AlertTriangle} />
          Understanding the Risks
        </h2>
        <p>Sensitive data can be leaked through JSON formatters in several ways if not handled correctly:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Accidental Inclusion:</strong> Developers might inadvertently include sensitive fields (e.g., a
            user's password hash from the database object) when serializing data to JSON for an API response or a log
            file.
          </li>
          <li>
            <strong>Detailed Error Messages:</strong> Error responses formatted as JSON might expose internal details,
            including snippets of data or database query information that contain sensitive values.
          </li>
          <li>
            <strong>Logging and Monitoring:</strong> Server-side logs, application monitoring tools, or request/response
            logging middleware often capture JSON payloads. If sensitive data is included, it becomes permanently stored
            and accessible to anyone with access to the logs. <Icon IconComponent={Server} className="text-blue-500" />
          </li>
          <li>
            <strong>Client-Side Persistence (Mention):</strong> Although this is a server page, data sent from the
            server can be stored or processed insecurely on the client (browser history, local storage, console logs) if
            the server didn't redact it first.
          </li>
          <li>
            <strong>Clipboard Exposure (Mention):</strong> If a user copies JSON data (e.g., from developer tools or a
            UI element displaying raw JSON) that contains sensitive information, it sits in the clipboard and can
            potentially be accessed by other applications.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <Icon IconComponent={Lock} />
          Secure Handling Techniques (Server-Side Focus)
        </h2>
        <p>
          The most robust place to ensure sensitive data isn't exposed is on the server, before it leaves your control.
          Here are key strategies:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Data Redaction and Masking</h3>
        <p>
          <Icon IconComponent={EyeOff} className="text-green-600" /> The primary technique is to remove or mask
          sensitive fields from data objects *before* serializing them into a JSON string. This should be applied to API
          responses, data being stored in logs, or any other output format.
        </p>
        <p>
          Implement functions that take a data object and return a new object with sensitive fields either removed,
          replaced with a placeholder (like <code>"********"</code>), or partially masked (e.g., showing only the last
          four digits of a credit card number).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Icon IconComponent={EyeOff} />
            Example: Redacting an Object Before JSON Serialization
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            (Conceptual example of data transformation logic)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Define a function (like the redactSensitiveData function above)
// that takes a data object and removes/masks sensitive keys.

// Assume originalDataExample is the full data object fetched from DB/source:
${JSON.stringify(originalDataExample, null, 2)}

// Call the redaction function:
const redactedData = redactSensitiveData(originalDataExample);

// Now, serialize the redacted data to JSON:
const safeJsonOutput = JSON.stringify(redactedData, null, 2);

// This 'safeJsonOutput' is what you would send in an API response
// or store in logs. Notice sensitive fields are masked:
${safeJsonOutput}
`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Implement the <code>redactSensitiveData</code> function to handle different data types and recursive
            structures (nested objects and arrays). Maintain a list of keys considered sensitive.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Careful Selection of Data for Serialization</h3>
        <p>
          Instead of fetching a full database object and then redacting it, retrieve *only* the necessary fields from
          your data source. This is a "deny by default" approach – if a field isn't explicitly needed for the JSON
          output, don't retrieve it.
        </p>
        <p>Example (conceptual code outline):</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <pre>
            {`// BAD (fetch everything, then redact - still risks accidental serialization before redaction):
// const fullUserRecord = await db.users.findById(userId);
// const safeUserRecord = redactSensitiveData(fullUserRecord);
// return NextResponse.json(safeUserRecord);

// GOOD (select only non-sensitive fields from the start):
// const safeUserRecord = await db.users.select({
//   id: true,
//   username: true,
//   email: true,
//   address: { select: { street: true, zip: true } }, // Select only safe nested fields
//   preferences: true,
// }).findById(userId);
// return NextResponse.json(safeUserRecord); // No redaction needed here if selection was careful
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Secure Logging Practices</h3>
        <p>
          Review your logging configurations. Many logging libraries allow filtering or redacting specific fields from
          log entries, especially JSON-formatted logs. Ensure that sensitive data is not captured in plain text in logs.
          Consider using specialized logging services with built-in redaction features.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Handle Errors Securely</h3>
        <p>
          Configure your application and framework to provide minimal information in error responses sent to clients.
          Avoid sending raw exception details or database errors, which may inadvertently contain sensitive data or
          structural information about your system. Log detailed errors server-side after redacting sensitive parts, but
          send only a generic error message or a correlation ID to the client.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. Use JSON Libraries Mindfully</h3>
        <p>
          Standard JSON libraries (like <code>JSON.stringify</code> in JavaScript/TypeScript) are generally safe in
          themselves, but the security risk comes from the *data* you give them. Be aware of features that might include
          more than intended, though this is less common with basic serialization. Ensure your custom serialization
          logic (if any) respects sensitive data policies.
        </p>

        <h3 className="text-xl font-semibold mt-6">6. Encryption Considerations (Advanced)</h3>
        <p>
          For highly sensitive data, consider encrypting fields even within your database. If this encrypted data must
          be sent via JSON, you would typically send the encrypted blob, relying on the client or a specific service to
          decrypt it. However, this adds significant complexity and shifts the decryption responsibility, so it's not a
          common pattern purely for display or general API usage.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Icon IconComponent={Server} />
          Server-Side Implementation Context
        </h2>
        <p>
          In a Next.js backend route or API handler, you control the data fetching and the final output before sending
          the response. This is the ideal place to apply redaction logic.
        </p>
        <p>A common pattern in server components or API routes fetching data would be:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Fetch necessary data from the database or external service.</li>
          <li>Apply redaction/masking to the fetched data object(s), especially if fetching full records.</li>
          <li>Send the *redacted* data object as the JSON response.</li>
        </ol>
        <p>
          By performing redaction on the server, you prevent sensitive data from ever leaving your trusted environment
          in an unmasked format, significantly reducing the attack surface.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Securing sensitive data in JSON formatters is a critical aspect of backend development. By understanding the
          risks of accidental exposure and implementing robust server-side techniques like data redaction, careful data
          selection, and secure logging, developers can significantly mitigate the chances of data leaks. Always err on
          the side of caution: if data doesn't need to be exposed in JSON, remove it or mask it before serialization.{" "}
          <Icon IconComponent={Shield} className="text-blue-500" />
        </p>
      </div>
    </>
  );
}
