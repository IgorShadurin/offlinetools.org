import type { Metadata } from "next";
import {
  CheckSquare,
  XCircle,
  Code,
  FlaskConical,
  ListChecks,
  GitCompare,
  FileJson,
  FileJson2,
  CopyCheck,
  CopyX,
} from "lucide-react"; // Importing allowed icons

export const metadata: Metadata = {
  title: "Compatibility Testing with Various JSON Schemas | Article",
  description:
    "Learn why and how to perform compatibility testing when dealing with evolving JSON schemas in your applications and APIs.",
};

export default function JsonSchemaCompatibilityTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <GitCompare className="w-8 h-8" /> Compatibility Testing with JSON Schemas
      </h1>

      <div className="space-y-6">
        <p>
          In modern software development, data exchange is often facilitated using structured formats like JSON. As
          applications evolve, so too do their data structures, frequently defined and enforced using JSON Schemas.
          Ensuring that different versions of a schema, or data produced against one schema version, remain compatible
          with systems expecting another version is critical for maintaining stability and preventing unexpected runtime
          errors. This is where <strong>JSON Schema compatibility testing</strong> comes in.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> What is a JSON Schema?
        </h2>
        <p>
          JSON Schema is a powerful tool for defining the structure, content, and format of JSON data. Think of it as a
          blueprint or contract for your JSON documents. It allows you to specify:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Which properties an object should have</li>
          <li>The data types of values (string, number, boolean, array, object, null)</li>
          <li>Required vs. optional properties</li>
          <li>Patterns for strings (regex)</li>
          <li>Ranges for numbers</li>
          <li>Minimum/maximum items for arrays</li>
          <li>And much more...</li>
        </ul>
        <p>
          Using JSON Schema provides a standardized way to validate data, automatically document APIs, and generate
          code, but it also introduces the challenge of managing schema evolution.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6" /> Why Test Schema Compatibility?
        </h2>
        <p>
          Schema changes are inevitable as features are added or modified. Without proper compatibility testing,
          evolving your schema can break systems that rely on the old structure. Key reasons to test include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>API Evolution:</strong> Ensure clients using an older API version can still understand responses
            from a newer version, and vice versa.
          </li>
          <li>
            <strong>Data Validation:</strong> Verify that data conforms to the expected structure before processing,
            catching errors early.
          </li>
          <li>
            <strong>Preventing Runtime Errors:</strong> Avoid application crashes caused by unexpected or missing data
            fields.
          </li>
          <li>
            <strong>Reliable Integrations:</strong> Guarantee smooth data exchange between different services or
            microservices using JSON.
          </li>
          <li>
            <strong>Clear Data Contracts:</strong> Reinforce the agreed-upon format between producers and consumers of
            data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitCompare className="w-6 h-6" /> Types of Compatibility
        </h2>
        <p>When discussing schema changes, we often talk about two main types of compatibility:</p>

        <h3 className="text-xl font-semibold mt-6">Backward Compatibility</h3>
        <p>
          A new schema version is <strong>backward compatible</strong> with an old version if data that is valid
          according to the <em>old</em> schema is also valid according to the <em>new</em> schema.
        </p>
        <p>
          This is crucial for evolving a producer (like an API) while ensuring existing consumers (using the old schema)
          can still process the data without breaking. Examples of backward-compatible changes include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Adding an optional property.</li>
          <li>
            Adding a new value to an <code>enum</code>.
          </li>
          <li>Making a required property optional.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Forward Compatibility</h3>
        <p>
          A new schema version is <strong>forward compatible</strong> with an old version if data that is valid
          according to the <em>new</em> schema is also valid according to the <em>old</em> schema.
        </p>
        <p>
          This is less common in practice but can be relevant if you need to roll back a producer to an older version
          while newer consumers might still be sending data validated against the new schema. Examples of
          forward-compatible changes are often limited and stricter:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Potentially, some very minor constraint relaxations, but it's tricky.</li>
          <li>Generally, forward compatibility is hard to guarantee with significant changes.</li>
        </ul>
        <p>
          The most common and often required compatibility is <strong>backward compatibility</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FlaskConical className="w-6 h-6" /> Methods for Testing Compatibility
        </h2>
        <p>
          Testing compatibility involves verifying that data validated by one schema can be handled by a system designed
          for another. Here are common approaches:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Data Validation Against Schemas</h3>
        <p>
          The most practical way to test compatibility is to use JSON Schema validation libraries. You can take a set of
          JSON documents and validate them against different schema versions.
        </p>
        <p>To check backward compatibility between Schema A (old) and Schema B (new):</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Take data known to be valid against <strong>Schema A</strong>.
          </li>
          <li>
            Validate this data against <strong>Schema B</strong>.
          </li>
          <li>
            If <em>all</em> such data is valid against Schema B, then Schema B is backward compatible with Schema A.
          </li>
        </ul>
        <p>Similarly, for forward compatibility between Schema A (old) and Schema B (new):</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Take data known to be valid against <strong>Schema B</strong>.
          </li>
          <li>
            Validate this data against <strong>Schema A</strong>.
          </li>
          <li>
            If <em>all</em> such data is valid against Schema A, then Schema B is forward compatible with Schema A.
          </li>
        </ul>
        <p>
          This requires having a comprehensive suite of test data that covers various valid cases for each schema
          version.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Automated Schema Comparison</h3>
        <p>
          Some tools and libraries exist specifically to compare two JSON Schemas and report on the types of changes
          made (e.g., field added, field removed, type changed, constraint added/removed). These tools can often analyze
          the changes structurally and determine compatibility types (backward, forward, or breaking) without needing
          test data.
        </p>
        <p>
          While powerful, these tools might not catch all subtle issues that validation with real data might reveal,
          especially with complex schemas involving conditional logic or custom keywords.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Practical Example: Schema Evolution
        </h2>
        <p>Let&apos;s consider a simple user schema and how changes affect compatibility.</p>

        <h3 className="text-lg font-medium mt-6">Schema V1:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "username": { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["id", "username", "email"],
  "additionalProperties": false
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-lg font-medium mt-6">Schema V2 (Backward Compatible Change - Adding Optional Field):</h3>
        <p>
          We add an optional <code>fullName</code> field.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "username": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "fullName": { "type": "string" } // Added optional field
  },
  "required": ["id", "username", "email"], // 'required' list didn't change
  "additionalProperties": false
}`}
            </pre>
          </div>
        </div>
        <p>
          Data valid under V1 (without <code>fullName</code>) is still valid under V2 because the new field is optional.
          <CheckSquare className="inline w-4 h-4 text-green-500" /> V2 is backward compatible with V1.
        </p>
        <p>
          Data valid under V2 (with or without <code>fullName</code>) might *not* be valid under V1 if it includes{" "}
          <code>fullName</code> and V1 has <code>"additionalProperties": false</code> (as shown above).
          <XCircle className="inline w-4 h-4 text-red-500" /> V2 is NOT forward compatible with V1 (due to{" "}
          <code>additionalProperties: false</code>). If <code>additionalProperties</code> were `true` or omitted, it
          would be forward compatible for adding optional fields.
        </p>

        <h3 className="text-lg font-medium mt-6">Schema V3 (Breaking Change - Removing Required Field):</h3>
        <p>
          We remove the <code>email</code> field and make <code>username</code> optional.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "username": { "type": "string" },
    // "email" field removed
    "fullName": { "type": "string" }
  },
  "required": ["id"], // "username" and "email" removed from required
  "additionalProperties": false
}`}
            </pre>
          </div>
        </div>
        <p>
          Data valid under V1 (which requires <code>email</code> and <code>username</code>) will NOT be valid under V3
          if <code>email</code> is missing or <code>username</code> is missing (though V1 data will have{" "}
          <code>username</code>). The removal of a required field is a breaking change.
          <XCircle className="inline w-4 h-4 text-red-500" /> V3 is NOT backward compatible with V1.
        </p>

        <h3 className="text-lg font-medium mt-6">Schema V4 (Breaking Change - Changing Type):</h3>
        <p>
          We change the type of <code>id</code> from <code>integer</code> to <code>string</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "type": "object",
  "properties": {
    "id": { "type": "string" }, // Changed type from integer
    "username": { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["id", "username", "email"],
  "additionalProperties": false
}`}
            </pre>
          </div>
        </div>
        <p>
          Data valid under V1 (where <code>id</code> is an integer) will NOT be valid under V4 (which expects a string).
          <XCircle className="inline w-4 h-4 text-red-500" /> V4 is NOT backward compatible with V1.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6" /> Implementing the Tests
        </h2>
        <p>In a real-world scenario, you would automate these checks. This typically involves:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Defining your schemas (e.g., in <code>.json</code> or <code>.yaml</code> files).
          </li>
          <li>Creating test data files for each schema version that cover various valid instances.</li>
          <li>Using a JSON Schema validation library in your test suite (e.g., Jest, Mocha).</li>
          <li>Writing tests that load old data and validate it against the new schema.</li>
        </ol>

        <h3 className="text-lg font-medium mt-6">Conceptual Validation Test (TypeScript):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume you have JSON schema objects loaded as constants
const schemaV1 = {...}; // JSON schema object for V1
const schemaV2 = {...}; // JSON schema object for V2 (e.g., adding optional field)

// Assume you have test data loaded as constants
const validDataV1 = {...}; // JSON object valid against V1
const anotherValidDataV1 = {...}; // Another JSON object valid against V1

// Assume you have a validation function (e.g., from a library like 'ajv')
// import Ajv from 'ajv';
// const ajv = new Ajv();
// const validateV2 = ajv.compile(schemaV2);
function isValid(schema: any, data: any): boolean {
  // This is where a real validation library would be used
  // For concept: return some_validation_library.validate(schema, data);
  // Placeholder logic (DO NOT USE IN PRODUCTION):
  try {
     // Simplified check: just stringify and compare basic structure/fields
     // This is NOT real schema validation!
     JSON.stringify(data); // Check if it's valid JSON
     if (schema.required && schema.required.some(field => data[field] === undefined)) return false;
     // ... more complex checks needed for types, formats, etc.
     console.warn("Using simplified placeholder validation.");
     return true; // Assume valid for conceptual example
  } catch (e) {
     return false;
  }
}


// --- Test for Backward Compatibility (V2 with V1) ---
// Test if data valid under V1 is still valid under V2
const test1Result = isValid(schemaV2, validDataV1);
const test2Result = isValid(schemaV2, anotherValidDataV1);

if (test1Result && test2Result) {
  console.log("Schema V2 is likely backward compatible with V1 (based on test data).");
  // In a test suite: expect(test1Result).toBe(true); expect(test2Result).toBe(true);
} else {
  console.error("Schema V2 is NOT backward compatible with V1 (at least one test failed).");
  // In a test suite: fail("Backward compatibility test failed");
}

// --- Test for Forward Compatibility (V2 with V1) ---
// This would require data valid under V2 (e.g., with the new optional field)
const validDataV2 = { ...validDataV1, fullName: "Test User" };

const test3Result = isValid(schemaV1, validDataV2);

if (test3Result) {
    console.log("Schema V2 is likely forward compatible with V1 (based on test data).");
    // In a test suite: expect(test3Result).toBe(true);
} else {
    console.error("Schema V2 is NOT forward compatible with V1 (at least one test failed).");
    // In a test suite: fail("Forward compatibility test failed");
}

// Note: Real tests use actual validation library methods like validate(data) or ajv.compile(schema)(data)
// which return boolean or include errors array.
`}
            </pre>
          </div>
        </div>
        <p className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-green-600" /> A successful backward compatibility test means your data
          producer can safely upgrade its schema without breaking older consumers.
        </p>
        <p className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" /> A failed backward compatibility test indicates a breaking change;
          you might need to support multiple schema versions or implement a migration strategy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CopyCheck className="w-6 h-6" /> Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Version Your Schemas:</strong> Clearly label schema versions (e.g.,{" "}
            <code>/schemas/user/v1.json</code>, <code>/schemas/user/v2.json</code>).
          </li>
          <li>
            <strong>Automate Tests:</strong> Integrate compatibility tests into your Continuous Integration (CI/CD)
            pipeline. Every schema change should automatically trigger these checks.
          </li>
          <li>
            <strong>Maintain Comprehensive Test Data:</strong> Build a rich suite of valid JSON examples for each schema
            version, covering edge cases and all defined constraints.
          </li>
          <li>
            <strong>Prefer Backward Compatible Changes:</strong> Design schema evolutions to be backward compatible
            whenever possible (e.g., adding optional fields instead of removing required ones).
          </li>
          <li>
            <strong>Document Changes:</strong> Clearly document schema changes and their compatibility implications for
            consumers.
          </li>
          <li>
            <strong>Use Schema Comparison Tools:</strong> Augment data validation tests with structural schema
            comparison tools for a more complete picture.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="w-6 h-6" /> Tools and Libraries
        </h2>
        <p>Popular libraries for JSON Schema validation in JavaScript/TypeScript include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <a
              href="https://ajv.js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              AJV (Another JSON Schema Validator)
            </a>
            : Fast and comprehensive validator.
          </li>
          <li>
            <a
              href="https://github.com/button/json-schema-validator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              json-schema-validator
            </a>
            : A lightweight alternative.
          </li>
          <li>For schema comparison tools, search for "JSON schema diff" or "JSON schema compatibility checker".</li>
        </ul>
        <p>
          Note that while libraries like{" "}
          <a
            href="https://zod.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Zod
          </a>{" "}
          or{" "}
          <a
            href="https://github.com/colinhacks/valibot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Valibot
          </a>{" "}
          are excellent for defining and validating data shapes in TypeScript, they often use their own DSLs rather than
          standard JSON Schema. Ensure the tool/library you choose supports the standard JSON Schema specification if
          that is your requirement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CopyX className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Compatibility testing is not an optional step but a fundamental practice when managing evolving JSON schemas,
          especially in API development and distributed systems. By proactively testing backward and forward
          compatibility using a combination of data validation and schema comparison tools, you can significantly reduce
          the risk of introducing breaking changes, ensure smoother deployments, and build more robust applications.
        </p>
        <p>
          Embrace schema versioning and automated compatibility checks in your development workflow to maintain reliable
          data contracts between different parts of your system and external consumers.
        </p>
      </div>
    </>
  );
}
