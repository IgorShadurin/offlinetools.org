import type { Metadata } from "next";
import { BookOpenText, Puzzle, Check, FileText, Cog } from "lucide-react"; // Only using allowed icons

export const metadata: Metadata = {
  title: "JSON Schema as a Learning Tool for Data Structures",
  description:
    "Explore how JSON Schema provides a powerful and practical way to understand and define data structures.",
};

export default function JsonSchemaAsLearningTool() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <BookOpenText className="inline-block" size={32} />
        <span>JSON Schema as a Learning Tool for Data Structures</span>
      </h1>

      <div className="space-y-6">
        <p>
          Understanding data structures is fundamental to programming. Whether you're designing a database, building an
          API, or just organizing data within an application, knowing how to define and constrain the shape of your data
          is crucial. While programming languages offer types (like TypeScript interfaces or Python classes) and runtime
          checks, a language-agnostic, declarative way to describe data structures exists: <strong>JSON Schema</strong>.
        </p>
        <p>
          Often thought of purely as a validation tool, JSON Schema can also be a remarkably effective way to learn,
          document, and think about the *structure* of data independently of any specific programming language.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Puzzle className="inline-block" />
          <span>What is JSON Schema?</span>
        </h2>
        <p>
          At its core, JSON Schema is a vocabulary for annotating and validating JSON documents. It defines the expected
          structure, required properties, data types, formats, and constraints for a JSON object or value. It's written
          in JSON itself, making it machine-readable and human-readable.
        </p>
        <p>
          Think of it as a blueprint or a contract for your data. Just as a building blueprint specifies the types of
          rooms, where walls go, and the materials to use, a JSON Schema specifies the types of fields, their
          relationships, and the rules they must follow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileText className="inline-block" />
          <span>Describing Basic Data Types</span>
        </h2>
        <p>
          JSON Schema starts by letting you specify the basic type of a value using the `"type"` keyword. This is
          analogous to declaring variable types in a programming language.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Basic Types in JSON Schema:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto space-y-4">
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">String:</p>
              <pre>
                {`&#x7b;
  "type": "string"
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">Number (integers and floats):</p>
              <pre>
                {`&#x7b;
  "type": "number"
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">Integer:</p>
              <pre>
                {`&#x7b;
  "type": "integer"
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">Boolean:</p>
              <pre>
                {`&#x7b;
  "type": "boolean"
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">Null:</p>
              <pre>
                {`&#x7b;
  "type": "null"
&#x7d;`}
              </pre>
            </div>
          </div>
        </div>

        <p>Understanding these basic type keywords is the first step to defining any data structure.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cog className="inline-block" />
          <span>Defining Objects and Properties</span>
        </h2>
        <p>
          Objects are collections of key-value pairs. In JSON Schema, you define an object using `"type": "object"` and
          then describe its expected properties using the `"properties"` keyword. Each key within `"properties"`
          corresponds to a field name in the JSON object, and its value is another JSON Schema describing the expected
          type and constraints of that field.
        </p>
        <p>
          You can also specify which properties are mandatory using the `"required"` keyword, which takes an array of
          property names. This teaches the concept of nullable vs. non-nullable fields or required vs. optional
          attributes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: A Simple User Object Schema</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&#x7b;
  "type": "object",
  "properties": &#x7b;
    "id": &#x7b;
      "type": "integer",
      "description": "Unique identifier for the user"
    &#x7d;,
    "username": &#x7b;
      "type": "string",
      "minLength": 3
    &#x7d;,
    "email": &#x7b;
      "type": "string",
      "format": "email" // Uses a predefined format constraint
    &#x7d;,
    "isActive": &#x7b;
      "type": "boolean",
      "default": true
    &#x7d;,
    "registrationDate": &#x7b;
      "type": "string",
      "format": "date-time"
    &#x7d;,
    "profile": &#x7b; // Nested object example
      "type": "object",
      "properties": &#x7b;
        "firstName": &#x7b; "type": "string" &#x7d;,
        "lastName": &#x7b; "type": "string" &#x7d;,
        "age": &#x7b; "type": "integer", "minimum": 0 &#x7d;
      &#x7d;,
      "required": ["firstName", "lastName"]
    &#x7d;
  &#x7d;,
  "required": [ // These properties MUST be present
    "id",
    "username",
    "email"
  ],
  "additionalProperties": false // Disallow properties not defined above
&#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          This schema clearly defines that a User must be an object (`"type": "object"`), it must have `id`, `username`,
          and `email` properties (`"required"`). It specifies the types and minimum length for username, and even
          includes a nested `profile` object with its own required fields. The `"additionalProperties": false`
          constraint reinforces the idea of a fixed structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Puzzle className="inline-block" />
          <span>Working with Arrays</span>
        </h2>
        <p>
          Arrays are ordered lists of values. In JSON Schema, you use `"type": "array"`. The `"items"` keyword is used
          to define the schema that applies to *each* element in the array. This is a powerful way to enforce
          homogeneity or heterogeneity within a list.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Array Schemas</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto space-y-4">
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">Array of strings:</p>
              <pre>
                {`&#x7b;
  "type": "array",
  "items": &#x7b;
    "type": "string"
  &#x7d;
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                Array of numbers with constraints:
              </p>
              <pre>
                {`&#x7b;
  "type": "array",
  "items": &#x7b;
    "type": "number",
    "minimum": 0
  &#x7d;,
  "minItems": 1, // Must have at least one item
  "maxItems": 10 // Must have no more than 10 items
&#x7d;`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                Array of the User objects defined above (assuming User schema is referenced or defined elsewhere):
              </p>
              <pre>
                {`&#x7b;
  "type": "array",
  "items": &#x7b;
    "$ref": "#/definitions/User" // Referencing another schema definition
  &#x7d;
&#x7d;`}
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                (<code>"$ref"</code> is used for reusing schema parts or defining complex, self-referential structures).
              </p>
            </div>
          </div>
        </div>
        <p>
          Array schemas introduce concepts like cardinality (min/max items) and homogeneity (all items must match a
          specific sub-schema) or heterogeneity (different items can match different schemas using features like
          `prefixItems` or `items` as an array, not shown here).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cog className="inline-block" />
          <span>Adding Constraints and Validation Rules</span>
        </h2>
        <p>
          Beyond just types, JSON Schema lets you add rules that the *values* must satisfy. These constraints are where
          the "validation" aspect comes in, but they also serve to precisely define the acceptable domain of the data.
        </p>
        <p>
          Keywords like `"minimum"`, `"maximum"`, `"minLength"`, `"maxLength"`, `"pattern"` (for strings), and `"enum"`
          (for a fixed set of allowed values) directly map to common data validation requirements and help define the
          bounds of your data types.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Constraints in Schema</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&#x7b;
  "type": "object",
  "properties": &#x7b;
    "statusCode": &#x7b;
      "type": "integer",
      "enum": [200, 400, 404, 500], // Must be one of these specific integers
      "description": "HTTP status code"
    &#x7d;,
    "progress": &#x7b;
      "type": "number",
      "minimum": 0,
      "maximum": 100 // Number must be between 0 and 100 inclusive
    &#x7d;,
    "productCode": &#x7b;
      "type": "string",
      "pattern": "^[A-Z0-9]{5,10}$" // String must match this regular expression (5-10 uppercase letters or digits)
    &#x7d;,
    "tags": &#x7b;
      "type": "array",
      "items": &#x7b; "type": "string" &#x7d;,
      "uniqueItems": true // All items in the array must be unique
    &#x7d;
  &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          These keywords demonstrate how schema defines not just *what* kind of data you have, but *what specific
          values* are considered valid for that data point. This teaches about data integrity and validation rules
          upfront.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Check className="inline-block" />
          <span>Learning Benefits of Using JSON Schema</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Language-Agnostic Description:</strong> JSON Schema provides a way to describe data structures that
            is independent of any programming language. This helps in understanding the core concepts of structuring
            data without getting bogged down in language-specific syntax.
          </li>
          <li>
            <strong>Declarative Specification:</strong> Instead of writing code to *check* if data matches a structure,
            you *declare* what the structure *should be*. This clear separation helps focus on the data's shape itself.
          </li>
          <li>
            <strong>Executable Documentation:</strong> A JSON Schema is not just documentation; it's documentation that
            can be used by tools to validate data automatically. Writing schemas forces you to be precise about your
            data's expected form.
          </li>
          <li>
            <strong>Visualizing Structure:</strong> Looking at a well-formatted JSON Schema (especially for complex
            objects and arrays) provides a clear, hierarchical view of the data, much like looking at a visual
            representation of a data structure.
          </li>
          <li>
            <strong>Tooling and Ecosystem:</strong> Many tools exist for JSON Schema: validators, document generators,
            code generators (to create types/classes in various languages from a schema). Interacting with these tools
            reinforces the understanding of the defined structure.
          </li>
          <li>
            <strong>Understanding Constraints:</strong> Schema keywords like `minimum`, `maxLength`, `pattern`, `enum`,
            etc., highlight the importance of data constraints beyond just the basic type. They make you think about the
            valid *range* or *set* of values a data point can hold.
          </li>
          <li>
            <strong>Composition (oneOf, anyOf, allOf):</strong> Advanced keywords allow defining data that can match one
            of several schemas (`oneOf`), any of several schemas (`anyOf`), or all of several schemas (`allOf`). These
            concepts are directly analogous to Union Types, Intersection Types, and composition patterns seen in modern
            programming languages and type systems.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Example: Union Type with `oneOf`</h2>
        <p>Suppose a field can be either a string or a number.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&#x7b;
  "type": "object",
  "properties": &#x7b;
    "value": &#x7b;
      "oneOf": [ // The "value" property must match EXACTLY one of the following schemas
        &#x7b; "type": "string" &#x7d;,
        &#x7b; "type": "number" &#x7d;
      ]
    &#x7d;
  &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          This `oneOf` construct is a direct parallel to union types (`string | number` in TypeScript) and helps teach
          the concept of a data point potentially holding values of different, but specified, types.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While primarily designed for validation, JSON Schema serves as an excellent tool for learning and
          understanding fundamental data structure concepts. Its declarative nature, language independence, and focus on
          structure and constraints make it a powerful way to define the blueprint of your data. By writing schemas, you
          gain clarity on the expected shape, required fields, acceptable values, and relationships within your data,
          skills that are transferable to any programming language or data storage technology. Using JSON Schema as a
          learning aid can significantly improve your ability to model data effectively.
        </p>
      </div>
    </>
  );
}
