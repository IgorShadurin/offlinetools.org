import type { Metadata } from "next";

/**
 * Metadata for JSON Schema validation errors article
 */
export const metadata: Metadata = {
  title: "JSON Schema Validation Errors and Their Meaning | Offline Tools",
  description:
    "Learn how to interpret JSON Schema validation errors, understand their meaning, and fix common schema validation issues efficiently",
};

/**
 * Article page component for JSON Schema validation errors
 */
export default function JsonSchemaValidationErrorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Schema Validation Errors and Their Meaning</h1>

      <div className="space-y-6">
        <p>
          JSON Schema provides a powerful way to validate the structure and content of JSON documents. When validation
          fails, various error messages indicate what went wrong. Understanding these error messages is crucial for
          diagnosing and fixing issues in your JSON data. This article explains common JSON Schema validation errors and
          their meanings.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Introduction to JSON Schema Validation</h2>
        <p>
          JSON Schema is a vocabulary that allows you to validate JSON documents against a set of rules. These rules can
          specify:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Data types for properties</li>
          <li>Required vs. optional properties</li>
          <li>Value constraints (minimum, maximum, pattern, etc.)</li>
          <li>Object and array structure requirements</li>
          <li>Complex logical conditions using combinations of rules</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example JSON Schema</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 18,
      "maximum": 120
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    }
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JSON Schema Validation Errors</h2>

        <h3 className="text-xl font-semibold mt-6">1. Required Property Missing</h3>
        <p>This error occurs when a property specified as required in the schema is missing from the JSON document.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "required",
  "dataPath": "",
  "schemaPath": "#/required",
  "params": {
    "missingProperty": "email"
  },
  "message": "should have required property 'email'"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;email&quot; property, which is marked as required in the schema, is
            missing from the validated JSON document.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Add the missing property to your JSON document:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Type Mismatch</h3>
        <p>
          Type mismatches occur when a property in the JSON document has a different data type than what the schema
          requires.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "type",
  "dataPath": ".age",
  "schemaPath": "#/properties/age/type",
  "params": {
    "type": "integer"
  },
  "message": "should be integer"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;age&quot; property in the JSON document is not an integer as required by
            the schema. It might be a string, float, or another type.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Change the value type to match the schema requirement:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "age": "30"  // String value
}

// Correct
{
  "age": 30  // Integer value
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Minimum/Maximum Value Constraints</h3>
        <p>These errors occur when numeric values fall outside the allowed range specified in the schema.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "minimum",
  "dataPath": ".age",
  "schemaPath": "#/properties/age/minimum",
  "params": {
    "comparison": ">=",
    "limit": 18,
    "exclusive": false
  },
  "message": "should be >= 18"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the value of the &quot;age&quot; property is less than the minimum allowed value
            of 18.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Ensure the value is within the specified range:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "age": 16  // Below minimum
}

// Correct
{
  "age": 18  // Meets minimum requirement
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. String Length Constraints</h3>
        <p>These errors occur when string values don&apos;t meet the length requirements in the schema.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "minLength",
  "dataPath": ".name",
  "schemaPath": "#/properties/name/minLength",
  "params": {
    "limit": 2
  },
  "message": "should NOT be shorter than 2 characters"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;name&quot; property contains a string that is shorter than the minimum
            length of 2 characters.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Ensure the string meets the length requirements:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "name": "J"  // Too short
}

// Correct
{
  "name": "Jo"  // Meets minimum length
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Pattern Matching Errors</h3>
        <p>
          Pattern errors occur when a string value doesn&apos;t match the regular expression pattern defined in the
          schema.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "pattern",
  "dataPath": ".postal_code",
  "schemaPath": "#/properties/postal_code/pattern",
  "params": {
    "pattern": "^\\d{5}(-\\d{4})?$"
  },
  "message": "should match pattern \"^\\\\d{5}(-\\\\d{4})?$\""
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;postal_code&quot; property doesn&apos;t match the US ZIP code pattern (5
            digits, optionally followed by a hyphen and 4 more digits).
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Format the string to match the required pattern:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "postal_code": "ABC123"  // Not matching pattern
}

// Correct
{
  "postal_code": "12345"  // Matches pattern
}

// Also correct
{
  "postal_code": "12345-6789"  // Matches alternative pattern
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">6. Format Validation Errors</h3>
        <p>Format errors occur when a string does not conform to the specified format (like email, date, URI).</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "format",
  "dataPath": ".email",
  "schemaPath": "#/properties/email/format",
  "params": {
    "format": "email"
  },
  "message": "should match format \\"email\\""
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;email&quot; property doesn&apos;t conform to the email address format.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Ensure the string matches the required format:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "email": "john.example.com"  // Missing @ symbol
}

// Correct
{
  "email": "john@example.com"  // Valid email format
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">7. Enum Validation Errors</h3>
        <p>Enum errors occur when a value is not one of the allowed values specified in the schema.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "enum",
  "dataPath": ".status",
  "schemaPath": "#/properties/status/enum",
  "params": {
    "allowedValues": ["active", "pending", "inactive"]
  },
  "message": "should be equal to one of the allowed values"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;status&quot; property contains a value that is not in the list of
            allowed values.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Use one of the allowed enum values:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "status": "cancelled"  // Not in allowed values
}

// Correct
{
  "status": "inactive"  // One of the allowed values
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">8. Array Validation Errors</h3>
        <p>These errors occur when arrays in the JSON don&apos;t meet the requirements specified in the schema.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "uniqueItems",
  "dataPath": ".tags",
  "schemaPath": "#/properties/tags/uniqueItems",
  "params": {
    "i": 2,
    "j": 0
  },
  "message": "should NOT have duplicate items (items ## 0 and 2 are identical)"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the &quot;tags&quot; array contains duplicate items, which violates the
            &quot;uniqueItems&quot; constraint.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Remove duplicate items to ensure uniqueness:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Incorrect
{
  "tags": ["javascript", "react", "javascript"]  // Contains duplicates
}

// Correct
{
  "tags": ["javascript", "react", "typescript"]  // All unique
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Logical Schema Validation Errors</h2>
        <p>
          JSON Schema supports logical operators (allOf, anyOf, oneOf, not) that can result in more complex error
          messages.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. AllOf Validation Errors</h3>
        <p>These errors occur when the data fails to satisfy all the schemas in an allOf array.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "allOf",
  "dataPath": "",
  "schemaPath": "#/allOf",
  "params": {},
  "message": "should match all schemas in allOf"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the JSON document doesn&apos;t satisfy all the schemas specified in the allOf
            array. The validator usually provides more specific errors for each subschema that failed.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Ensure the JSON satisfies all the conditions in each subschema of the allOf array.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. OneOf Validation Errors</h3>
        <p>These errors occur when the data doesn&apos;t satisfy exactly one schema in a oneOf array.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error Message:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "oneOf",
  "dataPath": "",
  "schemaPath": "#/oneOf",
  "params": {
    "passingSchemas": [0, 1]  // Failed because it matched more than one schema
  },
  "message": "should match exactly one schema in oneOf"
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Explanation:</h3>
          <p className="mt-2">
            This error indicates that the JSON document matches more than one schema in the oneOf array, when it should
            match exactly one.
          </p>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h3>
          <p className="mt-2">Modify the JSON so it matches exactly one of the schemas in the oneOf array.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting JSON Schema Validation Errors</h2>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>
            <strong>Examine the error message carefully</strong> - Most validators provide detailed information about
            the location and nature of the error.
          </li>
          <li>
            <strong>Check the dataPath</strong> - This tells you exactly which part of your JSON document failed
            validation.
          </li>
          <li>
            <strong>Review the schema requirements</strong> - Compare your data against the specific requirements in the
            schema at the given schemaPath.
          </li>
          <li>
            <strong>Use a JSON Schema validator with good error reporting</strong> - Some validators provide more
            user-friendly error messages than others.
          </li>
          <li>
            <strong>For complex schemas</strong> - Break down validation into smaller parts to isolate the issue.
          </li>
        </ol>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Error messages can vary between different JSON Schema validator implementations. The examples in this
            article follow the format used by AJV, one of the most popular JSON Schema validators.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Understanding JSON Schema validation errors is essential for working effectively with schema-validated JSON.
          The error messages provide valuable clues about what&apos;s wrong with your data and how to fix it. By
          learning to interpret these messages, you can more quickly diagnose and resolve issues in your JSON documents.
        </p>
        <p className="mt-4">
          As you become more familiar with JSON Schema validation, you&apos;ll find that error messages become easier to
          interpret and fix. This knowledge will help you create more robust applications that properly validate and
          process JSON data.
        </p>
      </div>
    </>
  );
}
