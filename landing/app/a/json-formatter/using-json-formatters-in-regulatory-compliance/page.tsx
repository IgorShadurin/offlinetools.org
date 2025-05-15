import type { Metadata } from "next";
import {
  Scale,
  FileCheck,
  Code,
  Braces,
  ListFilter,
  FunctionSquare,
  CheckCircle,
  Award,
  Book,
  ArrowLeftRight,
  Shield,
} from "lucide-react"; // Only lucide-react is allowed

export const metadata: Metadata = {
  title: "Using JSON Formatters in Regulatory Compliance | Offline Tools",
  description:
    "Explore how JSON formatters enhance regulatory compliance by ensuring data consistency, readability, and auditability. Learn practical techniques with JavaScript examples.",
};

export default function JsonFormattersCompliancePage() {
  return (
    <>
      {/* Header Section */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Scale size={30} />
        Using JSON Formatters in Regulatory Compliance
      </h1>

      {/* Introduction */}
      <div className="space-y-6">
        <p>
          In today&apos;s data-driven world, managing information accurately,
          consistently, and transparently is paramount, especially under the
          scrutiny of regulatory bodies. While often seen as just a way to make
          JSON human-readable,{" "}
          <strong>JSON formatters</strong> and the principles behind structured
          JSON output play a crucial role in meeting various regulatory
          compliance requirements.
        </p>
        <p>
          This page explores how standardized and formatted JSON outputs contribute
          to auditability, data privacy, and interoperability, offering insights
          and practical examples for developers working in regulated industries.
        </p>

        {/* Why Compliance Cares Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileCheck size={24} />
          Why Regulatory Compliance Demands Structured Data
        </h2>
        <p>
          Regulatory frameworks like GDPR (General Data Protection Regulation),
          HIPAA (Health Insurance Portability and Accountability Act), CCPA
          (California Consumer Privacy Act), SOX (Sarbanes-Oxley Act), and
          industry-specific standards (like financial or pharmaceutical
          regulations) impose strict requirements on how data is collected,
          stored, processed, exchanged, and audited.
        </p>
        <p>Key requirements often include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Auditability:</strong> The ability to track data origins,
            modifications, and access over time. Logs and audit trails must be
            clear and immutable.
          </li>
          <li>
            <strong>Data Accuracy & Consistency:</strong> Data must be reliable
            and uniformly structured across systems.
          </li>
          <li>
            <strong>Data Privacy & Security:</strong> Sensitive information must
            be protected, potentially requiring masking, redaction, or
            anonymization for certain use cases.
          </li>
          <li>
            <strong>Interoperability:</strong> Systems often need to exchange
            data reliably with partners, regulators, or other internal systems.
          </li>
          <li>
            <strong>Transparency:</strong> Understanding what data is held and
            how it&apos;s structured is essential for reporting and subject
            access requests.
          </li>
        </ul>
        <p>
          Well-formatted and consistently structured JSON directly supports
          these requirements by making data easier to parse, validate, audit,
          and process automatically or manually.
        </p>

        {/* How JSON Formatters Help Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} />
          How JSON Formatters Contribute to Compliance
        </h2>
        <p>
          While JSON itself provides a standard structure, its raw string
          representation can vary in whitespace, key order, and indentation.
          JSON formatters (or pretty-printers) and structured output techniques
          address these variations.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Book size={20} />
          1. Enhanced Readability and Auditability
        </h3>
        <p>
          Raw JSON strings, especially for complex or deeply nested data, can be
          almost impossible for humans to read and verify. Formatting adds
          indentation and line breaks, making the structure clear.
        </p>
        <p>
          This is crucial for manual audits, debugging logs, and reviewing
          configurations where engineers or compliance officers need to quickly
          understand the data payload.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Raw vs. Formatted JSON</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-mono text-sm mb-1">Raw JSON</h5>
              <div className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
                <pre>
                  {`{"user":{"id":"abc123","name":"Alice","email":"alice@example.com","address":{"city":"Wonderland","zip":"98765"},"active":true,"roles":["user","auditor"]}}`}
                </pre>
              </div>
            </div>
            <div>
              <h5 className="font-mono text-sm mb-1">Formatted JSON</h5>
              <div className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
                <pre>
                  {`{
  "user": {
    "id": "abc123",
    "name": "Alice",
    "email": "alice@example.com",
    "address": {
      "city": "Wonderland",
      "zip": "98765"
    },
    "active": true,
    "roles": [
      "user",
      "auditor"
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The formatted version is significantly easier to read and verify
            against expected structures.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ArrowLeftRight size={20} />
          2. Standardization and Interoperability
        </h3>
        <p>
          Consistent formatting, including predictable key ordering (though not
          guaranteed by standard JSON unless specific tools are used) and
          indentation, ensures that JSON outputs from different systems or
          different runs of the same system are comparable and parsable without
          ambiguity.
        </p>
        <p>
          For data exchange with regulators or external partners, providing JSON
          in a clearly defined and consistently formatted structure minimizes
          errors and facilitates automated processing on the receiving end.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Shield size={20} />
          3. Data Privacy and Redaction
        </h3>
        <p>
          Regulations often require masking or redacting sensitive information
          before it is logged, shared, or displayed in certain contexts (e.g.,
          removing customer emails from public logs). JSON formatting tools,
          especially programmatically via a &quot;replacer&quot; function, can
          selectively modify or omit data fields.
        </p>
        <p>
          Using a custom replacer function allows dynamic inspection of keys
          and values during the stringification process, enabling conditional
          redaction based on the field name, data type, or even the context of
          the operation.
        </p>

        {/* Practical Techniques Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Braces size={24} />
          Practical Techniques Using JavaScript/TypeScript
        </h2>
        <p>
          The built-in <code>JSON.stringify()</code> method in JavaScript is a
          powerful tool for controlling JSON output format for compliance
          purposes. It accepts two optional arguments: <code>replacer</code>
          and <code>space</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Braces size={20} />
          Basic Formatting (Pretty-Printing)
        </h3>
        <p>
          The <code>space</code> argument controls indentation and whitespace.
          Using <code>null</code> for the replacer and a number (like 2 or 4)
          or a string (like &quot; &nbsp;&nbsp;&quot;) for <code>space</code>
          produces human-readable output.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
            <pre>
              {`const complianceLog = {
  timestamp: new Date().toISOString(),
  eventType: "UserLogin",
  userId: "user-123",
  details: {
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0...", // Potentially sensitive
  },
  status: "Success",
  relatedTransactionId: null,
};

// Format with 2 spaces indentation for readability
const formattedLog = JSON.stringify(complianceLog, null, 2);

console.log(formattedLog);
/* Output:
{
  "timestamp": "...",
  "eventType": "UserLogin",
  "userId": "user-123",
  "details": {
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  },
  "status": "Success",
  "relatedTransactionId": null
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          This is the most common use case for improving the readability of
          logs, configuration files, or audit trails.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListFilter size={20} />
          Controlling Output with a Replacer Array
        </h3>
        <p>
          The <code>replacer</code> argument can be an array of strings or numbers.
          When it&apos;s an array of strings, only the properties with names
          matching one of the strings in the array will be included in the
          output. This is useful for omitting specific fields for privacy or
          relevance.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
            <pre>
              {`const patientRecord = {
  patientId: "p-456",
  name: "Jane Doe", // Sensitive
  dateOfBirth: "1990-01-01", // Sensitive
  diagnosis: "Hypertension",
  medications: ["Lisinopril"],
  billingInfo: { // Sensitive structure
    accountNumber: "xxxx",
    insurance: "yyyy"
  }
};

// Only include non-sensitive fields for a report summary
const allowedFields = [
  "patientId",
  "diagnosis",
  "medications",
  "timestamp", // Example of a field added later
  "eventType",
  "userId",
  "status",
  "relatedTransactionId"
]; // Note: billingInfo and its sub-fields are implicitly excluded

const redactedRecord = JSON.stringify(patientRecord, allowedFields, 2);

console.log(redactedRecord);
/* Output:
{
  "patientId": "p-456",
  "diagnosis": "Hypertension",
  "medications": [
    "Lisinopril"
  ]
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          Using an array replacer is straightforward but provides limited
          control; it can only include/exclude top-level properties or properties
          within nested objects if their names are explicitly listed (which isn&apos;t
          always practical for deep structures). It doesn&apos;t allow for
          conditional logic based on value or deeper paths.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FunctionSquare size={20} />
          Dynamic Redaction with a Replacer Function
        </h3>
        <p>
          The <code>replacer</code> can also be a function. This function is
          called for each key-value pair in the object/array being stringified,
          including the root object itself. It receives the key and the value as
          arguments.
        </p>
        <p>
          The function&apos;s return value determines what is included in the output:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Return the <code>value</code>: The property is included as is.
          </li>
          <li>
            Return a modified <code>value</code>: The property is included with
            the new value.
          </li>
          <li>
            Return <code>undefined</code>: The property is omitted from the output.
          </li>
        </ul>
        <p>
          This provides the most flexibility for conditional redaction, data
          masking (e.g., replacing part of a credit card number), or even
          transforming data types before stringification.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
            <pre>
              {`const userData = {
  id: "user-789",
  username: "alpha",
  email: "alpha@secret.com", // Sensitive
  passwordHash: "...", // Highly Sensitive
  address: {
    street: "123 Main St", // Sensitive
    city: "Anytown",
    zip: "11111",
    country: "USA"
  },
  loginAttempts: 5,
  lastLogin: new Date().toISOString(),
  isActive: true,
  preferences: ["email_promo", "sms_alerts"] // sms_alerts could imply phone number existence
};

// Replacer function for redaction based on key name
const privacyReplacer = (key: string, value: any): any => {
  // Redact specific sensitive keys
  if (key === 'email' || key === 'passwordHash' || key === 'street') {
    return '[REDACTED]';
  }
  // Redact preferences that imply contact methods
  if (key === 'preferences' && Array.isArray(value)) {
      return value.filter(pref => !pref.includes('sms') && !pref.includes('phone'));
  }
  // Omit entire sensitive structures (alternative to redacting keys)
  // if (key === 'address') {
  //     return undefined; // This would remove the entire address object
  // }

  // For the root object (key is empty string), return the value as is
  if (key === '') {
    return value;
  }

  // Include all other keys and values as they are
  return value;
};

const redactedUserData = JSON.stringify(userData, privacyReplacer, 2);

console.log(redactedUserData);
/* Output:
{
  "id": "user-789",
  "username": "alpha",
  "email": "[REDACTED]",
  "passwordHash": "[REDACTED]",
  "address": {
    "street": "[REDACTED]",
    "city": "Anytown",
    "zip": "11111",
    "country": "USA"
  },
  "loginAttempts": 5,
  "lastLogin": "...", // Actual timestamp
  "isActive": true,
  "preferences": [
    "email_promo"
  ]
}
*/`}
            </pre>
          </div>
        </div>
        <p>
          This function-based approach is highly flexible and can implement
          complex redaction logic required by data privacy regulations.
        </p>

        {/* Tools and Approaches Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} />
          Tools and Approaches Beyond `JSON.stringify`
        </h2>
        <p>
          While <code>JSON.stringify</code> is fundamental, more sophisticated
          needs might involve other tools or libraries:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Schema Validation:</strong> While not strictly formatters,
            tools like Zod, Joi, or libraries implementing JSON Schema validation
            ensure that JSON data conforms to a predefined structure and data
            types. This is a critical compliance step to ensure data consistency
            and prevent errors. Formatters help present data for easier validation
            debugging.
          </li>
          <li>
            <strong>Canonical JSON Libraries:</strong> For scenarios where byte-for-byte
            comparability is required (e.g., digital signatures, deterministic
            hashing for audit trails), libraries that produce Canonical JSON
            (RFC 8785) ensure consistent key ordering and formatting regardless
            of input order.
          </li>
          <li>
            <strong>Specialized Redaction Libraries:</strong> For complex
            redaction rules (e.g., partial masking of numbers, redaction based
            on data classification tags), dedicated libraries might offer more
            features than a simple replacer function.
          </li>
        </ul>
        <p>
          Choosing the right tool depends on the specific compliance requirement,
          the complexity of the data, and the required level of formatting
          and control.
        </p>

        {/* Best Practices Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle size={24} />
          Best Practices for Compliance-Focused JSON Formatting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Define Standards:</strong> Establish clear guidelines for
            JSON structure and formatting within your organization. Document
            expected keys, data types, and formatting rules (indentation, etc.).
          </li>
          <li>
            <strong>Use Schemas:</strong> Implement JSON schema validation for
            critical data flows (APIs, database storage) to ensure data
            consistency at the structural level.
          </li>
          <li>
            <strong>Consistent Formatting for Logging/Auditing:</strong> Use a
            standard indentation (e.g., 2 spaces) for all logs and audit trails
            to make them uniformly readable.
          </li>
          <li>
            <strong>Centralize Redaction Logic:</strong> Implement data redaction
            logic in reusable functions or modules. Avoid ad-hoc redaction scattered
            throughout the codebase to ensure consistency and maintainability.
          </li>
          <li>
            <strong>Test Redaction Thoroughly:</strong> Verify that sensitive data
            is correctly masked or omitted in all required output contexts (logs,
            APIs, reports).
          </li>
          <li>
            <strong>Document Redaction Rules:</strong> Keep clear documentation of
            what data is considered sensitive and how it is handled (redacted,
            masked) in different scenarios.
          </li>
          <li>
            <strong>Consider Performance:</strong> For very large JSON objects,
            extensive formatting or complex replacer functions can impact performance.
            Optimize or consider streaming approaches if needed.
          </li>
        </ul>

        {/* Conclusion Section */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Award size={24} />
          Conclusion
        </h2>
        <p>
          JSON formatters are more than just developer conveniences; they are
          essential tools in the compliance toolkit. By ensuring data is
          readable, consistently structured, and capable of incorporating
          privacy-preserving transformations, they directly support the
          requirements of modern regulatory frameworks.
        </p>
        <p>
          Implementing standard formatting and utilizing features like the
          <code>replacer</code> function are practical steps developers can take
          to improve the auditability, privacy, and interoperability of the
          data they handle, contributing significantly to meeting regulatory
          obligations. Understanding and applying these techniques is vital
          for building robust and compliant systems.
        </p>
      </div>
    </>
  );
}