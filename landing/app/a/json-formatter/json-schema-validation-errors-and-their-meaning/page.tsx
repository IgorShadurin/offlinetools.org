import type { Metadata } from "next";

/**
 * Metadata for JSON Schema validation errors article
 */
export const metadata: Metadata = {
  title: "JSON Schema Validation Errors and Their Meaning | Offline Tools",
  description:
    "Learn how to read JSON Schema validation errors using keyword, instancePath, schemaPath, and params, with practical fixes for required, type, format, oneOf, and more.",
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
          A JSON Schema validation error is a map back to the rule your data broke. The fastest way to fix one is to
          ignore the vague human wording for a moment and read four fields instead: the failing <code>keyword</code>,
          the JSON location in <code>instancePath</code>, the rule location in <code>schemaPath</code>, and the extra
          details in <code>params</code>.
        </p>

        <p>
          That matters because examples online are often outdated. Many older articles show draft-07 schemas and Ajv
          errors with <code>dataPath</code>. Modern tooling commonly validates newer drafts such as 2020-12, and Ajv v8
          reports <code>instancePath</code> instead. The exact text can vary, but the meaning stays the same.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A Typical Error, Decoded</h2>
        <p>
          Here is a current-style validation error object you may see from a validator such as Ajv v8:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "required",
  "instancePath": "",
  "schemaPath": "#/required",
  "params": {
    "missingProperty": "email"
  },
  "message": "must have required property 'email'"
}`}
          </pre>
        </div>

        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <strong>keyword</strong>: the schema rule that failed. Here it is <code>required</code>.
          </li>
          <li>
            <strong>instancePath</strong>: where the failing value lives in your JSON document. An empty string means
            the root object.
          </li>
          <li>
            <strong>schemaPath</strong>: where the broken rule lives in the schema, usually as a JSON Pointer.
          </li>
          <li>
            <strong>params</strong>: validator-supplied details that make the error actionable.
          </li>
          <li>
            <strong>message</strong>: a readable summary. Useful for humans, but not stable enough to parse in code.
          </li>
        </ul>

        <p>
          In this example, the empty <code>instancePath</code> tells you the error is on the top-level object, and{" "}
          <code>params.missingProperty</code> tells you exactly which key is missing.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Example Schema</h2>
        <p>
          This schema uses the current 2020-12 meta-schema and a few keywords that commonly produce validation errors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["name", "email", "age"],
  "additionalProperties": false,
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
    "status": {
      "enum": ["active", "pending", "inactive"]
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "uniqueItems": true,
      "minItems": 1
    }
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JSON Schema Validation Errors</h2>

        <h3 className="text-xl font-semibold mt-6">1. Required Property Missing</h3>
        <p>
          This happens when an object is missing a property listed under <code>required</code>. With this keyword, the
          path usually points to the parent object, not the missing child.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "required",
  "instancePath": "",
  "schemaPath": "#/required",
  "params": {
    "missingProperty": "email"
  },
  "message": "must have required property 'email'"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The object being validated is missing the <code>email</code> key.
        </p>
        <p>
          <strong>Fix:</strong> Add the property, or remove it from <code>required</code> if it is genuinely optional.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Type Mismatch</h3>
        <p>
          Type errors are among the most common failures. They mean the data exists, but its JSON type does not match
          the schema.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "type",
  "instancePath": "/age",
  "schemaPath": "#/properties/age/type",
  "params": {
    "type": "integer"
  },
  "message": "must be integer"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The value at <code>/age</code> is present, but it is not an integer.
        </p>
        <p>
          <strong>Fix:</strong> Change the JSON value to the right type. A quoted number like <code>&quot;30&quot;</code>{" "}
          is still a string, not a number.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Additional Properties Not Allowed</h3>
        <p>
          When a schema sets <code>additionalProperties</code> to <code>false</code>, any unexpected key will fail
          validation.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "additionalProperties",
  "instancePath": "",
  "schemaPath": "#/additionalProperties",
  "params": {
    "additionalProperty": "nickname"
  },
  "message": "must NOT have additional properties"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> Your JSON includes a key the schema does not allow.
        </p>
        <p>
          <strong>Fix:</strong> Remove the extra property, add it under <code>properties</code>, or relax the schema if
          unknown keys are acceptable.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Enum or Const Failure</h3>
        <p>
          These errors mean a value is structurally valid but not one of the exact values allowed by the schema.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "enum",
  "instancePath": "/status",
  "schemaPath": "#/properties/status/enum",
  "params": {
    "allowedValues": ["active", "pending", "inactive"]
  },
  "message": "must be equal to one of the allowed values"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The value does not exactly match one of the allowed literals.
        </p>
        <p>
          <strong>Fix:</strong> Check spelling, case, and whether the API expects a stable internal code instead of a
          display label.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. Numeric, Length, and Count Constraints</h3>
        <p>
          Keywords such as <code>minimum</code>, <code>maximum</code>, <code>minLength</code>, <code>maxLength</code>,
          <code>minItems</code>, and <code>maxItems</code> all mean the same general thing: the value is the right
          type, but outside the allowed boundary.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "minimum",
  "instancePath": "/age",
  "schemaPath": "#/properties/age/minimum",
  "params": {
    "comparison": ">=",
    "limit": 18
  },
  "message": "must be >= 18"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The value exists and has the expected type, but it falls outside the accepted
          range.
        </p>
        <p>
          <strong>Fix:</strong> Compare the failing value directly with the limit in <code>params</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">6. Pattern Errors</h3>
        <p>
          Pattern failures come from the <code>pattern</code> keyword and mean a string did not match the required
          regular expression.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "pattern",
  "instancePath": "/postalCode",
  "schemaPath": "#/properties/postalCode/pattern",
  "params": {
    "pattern": "^\\\\d{5}(-\\\\d{4})?$"
  },
  "message": "must match pattern \\"^\\\\d{5}(-\\\\d{4})?$\\""
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The input is a string, but it does not satisfy the regex rule.
        </p>
        <p>
          <strong>Fix:</strong> Test the regex independently and make sure it matches the entire intended value, not
          just part of it.
        </p>

        <h3 className="text-xl font-semibold mt-6">7. Format Validation Errors</h3>
        <p>
          A <code>format</code> error often looks simple, but it is one of the most misunderstood validation failures.
          The important caveat is that format behavior depends on the validator.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "format",
  "instancePath": "/email",
  "schemaPath": "#/properties/email/format",
  "params": {
    "format": "email"
  },
  "message": "must match format \\"email\\""
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The string failed a validator&apos;s implementation of a known format such as{" "}
          <code>email</code>, <code>uri</code>, or <code>date-time</code>.
        </p>
        <p>
          <strong>Fix:</strong> Confirm that format assertions are actually enabled in your validator. If you expected a
          format error and did not get one, that is often a validator configuration issue rather than a schema issue.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Format Caveat</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            In modern JSON Schema, <code>format</code> is not guaranteed to behave like a hard assertion in every
            validator. Some tools treat it as annotation-only unless you explicitly enable format validation or install
            extra format support.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">8. Array Errors Such as uniqueItems or minItems</h3>
        <p>
          Array keywords tell you whether the list shape is acceptable: how many items it contains, whether duplicates
          are allowed, and whether each item matches the declared schema.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "uniqueItems",
  "instancePath": "/tags",
  "schemaPath": "#/properties/tags/uniqueItems",
  "params": {
    "i": 2,
    "j": 0
  },
  "message": "must NOT have duplicate items"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The array itself exists, but its contents break one of the array rules.
        </p>
        <p>
          <strong>Fix:</strong> Check whether the failure is about count, duplicates, or an invalid item type at a more
          specific nested path.
        </p>

        <h3 className="text-xl font-semibold mt-6">9. oneOf, anyOf, and allOf Errors</h3>
        <p>
          Combination keywords are where validation errors become noisy. The top-level message is often less useful than
          the nested branch errors that come with it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "keyword": "oneOf",
  "instancePath": "",
  "schemaPath": "#/oneOf",
  "params": {
    "passingSchemas": [0, 1]
  },
  "message": "must match exactly one schema in oneOf"
}`}
          </pre>
        </div>

        <p>
          <strong>Meaning:</strong> The data either matched none of the candidate schemas, or matched too many of them.
        </p>
        <p>
          <strong>Fix:</strong> Inspect the branch-level errors and make the alternatives more clearly distinct. When
          possible, use a discriminator field such as <code>type</code> or <code>kind</code> so each branch is easier
          to identify.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Your Errors May Look Different</h2>
        <p>
          If your validator output does not match the examples above exactly, that is normal. There are three common
          reasons:
        </p>

        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>
            <strong>Different draft support:</strong> the current published JSON Schema draft is 2020-12, but many code
            bases still use draft-07 or 2019-09.
          </li>
          <li>
            <strong>Different validator output formats:</strong> some tools expose their own error objects, while others
            follow the JSON Schema recommended output shapes.
          </li>
          <li>
            <strong>Different validator versions:</strong> older Ajv examples use <code>dataPath</code>; newer ones use{" "}
            <code>instancePath</code>.
          </li>
        </ol>

        <p>
          When you are debugging, treat the human message as a hint and rely on the structural fields first. Those are
          what survive across validator versions, localization, and UI wrappers.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A Practical Troubleshooting Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>
            Start with <code>keyword</code>. It tells you which schema rule to inspect first.
          </li>
          <li>
            Follow <code>instancePath</code> into the JSON document to find the exact failing value.
          </li>
          <li>
            Follow <code>schemaPath</code> into the schema to see the rule in context.
          </li>
          <li>
            Read <code>params</code> for specifics such as <code>missingProperty</code>, <code>allowedValues</code>, or
            numeric limits.
          </li>
          <li>
            If the error is <code>required</code>, remember the path usually points to the parent object.
          </li>
          <li>
            If the error is <code>oneOf</code> or <code>anyOf</code>, inspect branch errors instead of stopping at the
            summary line.
          </li>
          <li>
            If <code>format</code> behaves strangely, verify validator configuration before rewriting your schema.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON Schema validation errors are much easier to interpret once you stop reading them as prose and start
          reading them as structured diagnostics. Focus on the keyword, the instance path, the schema path, and the
          params object. Those four pieces usually tell you exactly what failed and how to fix it.
        </p>

        <p className="mt-4">
          If you keep seeing examples with older field names or different wording, do not assume your validator is
          wrong. Compare the error shape, the schema draft, and whether optional features like format assertions are
          enabled, then debug from the structure rather than the wording.
        </p>
      </div>
    </>
  );
}
