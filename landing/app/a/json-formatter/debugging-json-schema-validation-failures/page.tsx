import type { Metadata } from "next";
import { AlertTriangle, Search, Bug, HelpCircle, ListX, Code, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging JSON Schema Validation Failures | Offline Tools",
  description:
    "Learn how to effectively debug issues when your data fails JSON Schema validation, with common errors and practical tips.",
};

export default function DebuggingJsonSchemaValidationFailuresArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bug className="size-8 text-red-500" />
        Debugging JSON Schema Validation Failures
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          JSON Schema is a powerful tool for describing the structure and constraints of JSON data. It allows you to
          define what your JSON should look like, including data types, required fields, patterns, and relationships.
          However, like any validation system, using JSON Schema often leads to validation failures when the incoming
          data doesn't conform to the defined schema. Debugging these failures efficiently is crucial for building
          robust applications and APIs.
        </p>
        <p>
          This guide will walk you through understanding why validation fails occur, how to interpret error messages,
          and practical techniques for quickly identifying and fixing the issues in your data or your schema.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="size-6 text-amber-500" />
          Why Does JSON Schema Validation Fail? Common Causes
        </h2>
        <p>
          Validation failures typically happen because the data being validated does not meet one or more of the
          requirements specified in the JSON Schema. Here are some of the most frequent culprits:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Data Type Mismatches</h3>
        <p>
          The data submitted has a different type than expected by the schema (e.g., a string when a number is
          required).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Expected Number, Got String</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Schema Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "type": "object",
  "properties": {
    "age": { "type": "number" }
  }
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-medium">Invalid Data Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "age": "thirty" // Should be a number
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Missing Required Properties</h3>
        <p>The schema specifies certain properties as required, but they are absent in the data.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Missing Required Field</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Schema Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" }
  },
  "required": ["name", "email"] // Both are needed
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-medium">Invalid Data Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "name": "Alice" // 'email' is missing
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Format or Pattern Violations</h3>
        <p>
          Data doesn't match a specified format (like <code className="font-mono">"email"</code>,{" "}
          <code className="font-mono">"date-time"</code>, or <code className="font-mono">"uuid"</code>) or a regular
          expression pattern (<code className="font-mono">pattern</code> keyword).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Invalid Email Format</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Schema Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "type": "object",
  "properties": {
    "contact": { "type": "string", "format": "email" }
  }
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-medium">Invalid Data Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "contact": "invalid-email" // Not a valid email format
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Enum Violations</h3>
        <p>
          The data's value is not one of the allowed values specified in the <code className="font-mono">enum</code>{" "}
          array.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Value Not in Enum</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Schema Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "type": "object",
  "properties": {
    "status": { "type": "string", "enum": ["active", "inactive"] }
  }
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-medium">Invalid Data Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "status": "pending" // Not allowed; must be "active" or "inactive"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Array Structure/Item Issues</h3>
        <p>
          Problems with arrays, such as incorrect number of items (<code className="font-mono">minItems</code>,{" "}
          <code className="font-mono">maxItems</code>), unique items constraint violation (
          <code className="font-mono">uniqueItems</code>), or items not matching the specified item schema (
          <code className="font-mono">items</code> keyword).
        </p>

        <h3 className="text-xl font-semibold mt-6">6. Object Property Issues</h3>
        <p>
          Violations related to object properties, like having too many properties (
          <code className="font-mono">maxProperties</code>), too few (<code className="font-mono">minProperties</code>),
          property names not matching a pattern (<code className="font-mono">propertyNames</code>), or having properties
          not defined in the schema when <code className="font-mono">additionalProperties: false</code> is set.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Additional Properties Not Allowed</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Schema Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "value": { "type": "number" }
  },
  "additionalProperties": false // Only 'id' and 'value' are allowed
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-medium">Invalid Data Snippet:</p>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
                <code>
                  {`{
  "id": "abc",
  "value": 123,
  "extra": "data" // This is not allowed by the schema
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ScrollText className="size-6 text-blue-500" />
          Understanding Validation Error Messages
        </h2>
        <p>
          The key to debugging is learning how to read and interpret the error messages provided by your JSON Schema
          validator library (like Ajv, Z-schema, etc.). While the exact output format varies, most validators provide
          similar crucial pieces of information for each failure:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono">keyword</code>: The JSON Schema keyword that the data failed to satisfy (e.g.,{" "}
            <code className="font-mono">type</code>, <code className="font-mono">required</code>,{" "}
            <code className="font-mono">pattern</code>, <code className="font-mono">enum</code>,{" "}
            <code className="font-mono">additionalProperties</code>).
          </li>
          <li>
            <code className="font-mono">dataPath</code> or <code className="font-mono">instancePath</code>: A pointer
            (often using JSON Pointer syntax) indicating the location within the <strong>data</strong> that caused the
            error. This is extremely helpful for pinpointing the problematic value or missing property.
          </li>
          <li>
            <code className="font-mono">schemaPath</code>: A pointer indicating the location within the{" "}
            <strong>schema</strong> that defined the failed constraint. Useful for understanding which part of your
            schema was violated.
          </li>
          <li>
            <code className="font-mono">message</code>: A human-readable description of the error. This often tells you
            *what* went wrong (e.g., "Expected number, received string", "Must have required property 'age'").
          </li>
          <li>
            <code className="font-mono">params</code>: Additional information specific to the failed keyword (e.g., the
            expected type for a <code className="font-mono">type</code> error, the missing property name for a{" "}
            <code className="font-mono">required</code> error, the allowed values for an{" "}
            <code className="font-mono">enum</code> error).
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Error Output (from Ajv, a common validator):</h4>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
            <code>
              {`[
  {
    "keyword": "type",
    "instancePath": "/user/age",
    "schemaPath": "#/properties/user/properties/age/type",
    "params": {
      "type": "number"
    },
    "message": "Expected number, received string"
  },
  {
    "keyword": "required",
    "instancePath": "/user",
    "schemaPath": "#/properties/user/required",
    "params": {
      "missingProperty": "email"
    },
    "message": "Must have required property 'email'"
  }
]`}
            </code>
          </pre>
          <p className="text-sm italic mt-2">
            This shows two errors for an object located at <code className="font-mono">/user</code> in the data: one for
            an incorrect type at <code className="font-mono">/user/age</code> and one for a missing required property{" "}
            <code className="font-mono">email</code> at <code className="font-mono">/user</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search className="size-6 text-green-500" />
          Practical Debugging Steps
        </h2>
        <p>Follow these steps to systematically debug JSON Schema validation failures:</p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>
            <strong className="font-semibold">Examine the Full Error List:</strong> Most validators return an array of
            errors. Look through all of them, but often the first error is the root cause of subsequent issues.
          </li>
          <li>
            <strong className="font-semibold">
              Read the <code className="font-mono">message</code> and <code className="font-mono">keyword</code>:
            </strong>{" "}
            The message tells you what's conceptually wrong (e.g., "missing property", "wrong type"), and the keyword
            tells you which schema constraint was violated.
          </li>
          <li>
            <strong className="font-semibold">
              Use <code className="font-mono">dataPath</code> or <code className="font-mono">instancePath</code> to
              Locate the Problematic Data:
            </strong>{" "}
            This is the most critical step. The path tells you exactly where in your JSON data the validation failed.
            Navigate through your data structure following this path to find the non-conforming value or missing field.
            Remember <code className="font-mono">/</code> indicates the root,{" "}
            <code className="font-mono">/propertyName</code> indicates a property, and{" "}
            <code className="font-mono">/arrayIndex</code> indicates an element in an array. An empty path{" "}
            <code className="font-mono">""</code> or <code className="font-mono">/</code> refers to the root data
            itself.
          </li>
          <li>
            <strong className="font-semibold">Compare Data and Schema:</strong> Once you've located the offending piece
            of data using <code className="font-mono">dataPath</code>, look at the corresponding part of your JSON
            Schema (potentially using <code className="font-mono">schemaPath</code> if provided, though{" "}
            <code className="font-mono">dataPath</code> is usually sufficient to find the relevant schema section). Does
            the data's value, type, format, or presence match what the schema requires at that location?
          </li>
          <li>
            <strong className="font-semibold">Check for Typos and Case Sensitivity:</strong> Both in your data (property
            names) and potentially in your schema. JSON property names are case-sensitive.
          </li>
          <li>
            <strong className="font-semibold">Verify Data Types Carefully:</strong> Is{" "}
            <code className="font-mono">null</code> being sent when the schema doesn't allow it? Is a numeric string (
            <code className="font-mono">"123"</code>) being sent instead of a number (
            <code className="font-mono">123</code>)? JSON Schema distinguishes clearly between these.
          </li>
          <li>
            <strong className="font-semibold">Use Online Validators or Tools:</strong> Many online tools allow you to
            paste your schema and data side-by-side and run validation, often providing clearer or interactive error
            reporting. Some IDE extensions also offer this functionality.
          </li>
          <li>
            <strong className="font-semibold">Validate Your Schema Itself:</strong> Ensure your JSON Schema is valid
            according to the JSON Schema specification. An invalid schema can lead to unexpected validation results or
            errors.
          </li>
          <li>
            <strong className="font-semibold">Break Down Complex Cases:</strong> If you have deeply nested data or a
            very complex schema, try validating smaller parts of the data against relevant sub-schemas if your library
            supports it, or simplify the schema temporarily during debugging.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListX className="size-6 text-red-500" />
          Example Walkthrough: Debugging a Combined Failure
        </h2>
        <p>Let's look at a slightly more complex example with multiple potential issues.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Schema:</h4>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
            <code>
              {`{
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "settings": {
      "type": "object",
      "properties": {
        "theme": { "type": "string", "enum": ["dark", "light"] },
        "notifications": { "type": "boolean" }
      },
      "required": ["theme", "notifications"],
      "additionalProperties": false
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    }
  },
  "required": ["id", "settings", "tags"],
  "additionalProperties": false
}`}
            </code>
          </pre>

          <h4 className="text-lg font-medium mb-2 mt-6">Invalid Data:</h4>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
            <code>
              {`{
  "id": "12345", // Invalid UUID format
  "settings": {
    "theme": "blue", // Not in enum
    "notificationStatus": true // Wrong property name
  },
  "extraField": "should not be here" // Additional property
}`}
            </code>
          </pre>

          <h4 className="text-lg font-medium mb-2 mt-6">Potential Error Output (Simplified):</h4>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto dark:bg-gray-900">
            <code>
              {`[
  {
    "keyword": "format",
    "instancePath": "/id",
    "message": "Must match format 'uuid'"
  },
  {
    "keyword": "enum",
    "instancePath": "/settings/theme",
    "message": "Must be one of [\\"dark\\", \\"light\\"]"
  },
  {
    "keyword": "required",
    "instancePath": "/settings",
    "message": "Must have required property 'notifications'"
  },
  {
    "keyword": "additionalProperties",
    "instancePath": "/settings/notificationStatus",
    "message": "Additional properties not allowed"
  },
  {
    "keyword": "additionalProperties",
    "instancePath": "/extraField",
    "message": "Additional properties not allowed"
  },
  {
    "keyword": "required",
    "instancePath": "", // Refers to the root object
    "message": "Must have required property 'tags'"
  }
]`}
            </code>
          </pre>

          <h4 className="text-lg font-medium mb-2 mt-6">Debugging Interpretation:</h4>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <code className="font-mono">/id</code>, <code className="font-mono">format</code>: The value "12345" at
              the root property <code className="font-mono">id</code> failed the UUID format check. Fix: Provide a valid
              UUID string.
            </li>
            <li>
              <code className="font-mono">/settings/theme</code>, <code className="font-mono">enum</code>: The value
              "blue" at <code className="font-mono">settings.theme</code> is not one of the allowed enum values. Fix:
              Change "blue" to "dark" or "light".
            </li>
            <li>
              <code className="font-mono">/settings</code>, <code className="font-mono">required</code>, missing
              'notifications': The object at <code className="font-mono">settings</code> is missing the required
              property <code className="font-mono">notifications</code>. Fix: Add the{" "}
              <code className="font-mono">notifications</code> property.
            </li>
            <li>
              <code className="font-mono">/settings/notificationStatus</code>,{" "}
              <code className="font-mono">additionalProperties</code>: The property{" "}
              <code className="font-mono">notificationStatus</code> exists within{" "}
              <code className="font-mono">settings</code> but is not defined in the schema for{" "}
              <code className="font-mono">settings</code> and <code className="font-mono">additionalProperties</code> is
              false. This might be a typo for <code className="font-mono">notifications</code>. Fix: Rename{" "}
              <code className="font-mono">notificationStatus</code> to <code className="font-mono">notifications</code>.
            </li>
            <li>
              <code className="font-mono">/extraField</code>, <code className="font-mono">additionalProperties</code>:
              The property <code className="font-mono">extraField</code> exists at the root level but is not defined in
              the root schema and <code className="font-mono">additionalProperties</code> is false. Fix: Remove the{" "}
              <code className="font-mono">extraField</code> property.
            </li>
            <li>
              <code className="font-mono">""</code>, <code className="font-mono">required</code>, missing 'tags': The
              root object is missing the required property <code className="font-mono">tags</code>. Fix: Add the{" "}
              <code className="font-mono">tags</code> property (remembering it must be an array with at least one string
              item based on the schema).
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6 text-purple-500" />
          Preventing Validation Failures
        </h2>
        <p>Debugging is essential, but prevention is better. Consider these practices:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="font-semibold">Document Your Schema:</strong> Clearly describe what each property is for,
            its expected type, format, and constraints. Use the <code className="font-mono">description</code> keyword
            in your schema.
          </li>
          <li>
            <strong className="font-semibold">Write Unit Tests for Your Schema:</strong> Test your schema with various
            valid and invalid data examples to ensure it behaves as expected before deploying.
          </li>
          <li>
            <strong className="font-semibold">Validate Data Early:</strong> Validate incoming data as early as possible
            in your application lifecycle (e.g., at API boundaries).
          </li>
          <li>
            <strong className="font-semibold">Incremental Development:</strong> When developing new features involving
            schema changes or new data structures, build and validate incrementally.
          </li>
          <li>
            <strong className="font-semibold">Use Specific Error Handling:</strong> If your validator allows, customize
            error reporting to be even more developer- or user-friendly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <HelpCircle className="size-6 text-gray-500" />
          Conclusion
        </h2>
        <p>
          JSON Schema validation is a powerful tool for data integrity. While validation failures can be frustrating,
          understanding the common causes and knowing how to effectively interpret the error messages, particularly the{" "}
          <code className="font-mono">keyword</code> and <code className="font-mono">dataPath</code>/
          <code className="font-mono">instancePath</code>, will turn debugging from a chore into a systematic process.
          By combining careful error message reading with preventative measures, you can significantly reduce the time
          spent troubleshooting validation issues and build more reliable systems.
        </p>
      </div>
    </>
  );
}
