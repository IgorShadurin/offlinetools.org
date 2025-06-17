import type { Metadata } from "next";
import { FileJson, Package, CheckCircle, XCircle, Wrench, Lightbulb } from "lucide-react"; // Replaced Tool with Wrench

export const metadata: Metadata = {
  title: "Using JSON Formatters & Validators for Schema Development | Data Tools",
  description:
    "Learn how JSON formatters and validators are essential tools for developing and refining JSON schemas like JSON Schema.",
};

export default function JsonSchemaFormatterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Using JSON Formatters & Validators for Schema Development</h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          In the world of data exchange and API design, JSON (JavaScript Object Notation) has become the de facto
          standard. Ensuring that the JSON data you produce or consume conforms to a specific structure and set of rules
          is crucial for building robust and predictable systems. This is where schemas come into play, and tools like
          JSON formatters and validators become invaluable allies in their development and maintenance.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Package className="mr-3 text-blue-500" /> What is a Schema?
        </h2>
        <p>
          A schema, in the context of data formats like JSON, is a formal description of the structure, content, and
          constraints of a data document. It defines:
        </p>
        <ul className="list-disc pl-8 space-y-2 my-4">
          <li>The expected data types (string, number, boolean, object, array, null).</li>
          <li>Required fields.</li>
          <li>Optional fields.</li>
          <li>The structure of objects (which keys they must or can contain).</li>
          <li>The structure of arrays (what types of items they contain).</li>
          <li>Constraints on values (e.g., minimum/maximum number, string patterns, enum values).</li>
        </ul>
        <p>
          The most widely used schema language for JSON is{" "}
          <a
            href="https://json-schema.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            JSON Schema
          </a>
          . It's a declarative language that allows you to define the "shape" of your JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Wrench className="mr-3 text-green-500" /> How Formatters & Validators Help
        </h2>
        <p>
          While "formatter" often implies pretty-printing or standardizing JSON indentation, in the context of schema
          development, the term often includes or is used alongside "validator". JSON validators are tools or libraries
          that take a JSON document and a corresponding schema, and check if the document adheres to the rules defined
          in the schema.
        </p>
        <p>Here's how they assist in schema development:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <CheckCircle className="mr-2 text-green-500" /> 1. Validation: Testing Your Schema Against Data
        </h3>
        <p>
          The primary use case. As you design or modify a schema, you need to test it against various examples of your
          JSON data (both valid and invalid) to ensure it correctly captures the desired structure and rules. A
          validator automates this check.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Simple Validation</h4>
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            JSON Data (<FileJson className="inline-block w-4 h-4 mr-1" />
            ):
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": true
}`}
          </pre>
          <p className="my-2 text-sm text-gray-700 dark:text-gray-300">
            JSON Schema (<Package className="inline-block w-4 h-4 mr-1" />
            ):
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number", "minimum": 0 },
    "isStudent": { "type": "boolean" }
  },
  "required": ["name", "age"]
}`}
          </pre>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <Wrench className="inline-block w-4 h-4 mr-1" /> Using a validator with this data and schema would result
            in:{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              <CheckCircle className="inline-block w-4 h-4 mr-1" /> Validation Successful.
            </span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <XCircle className="mr-2 text-red-500" /> 2. Identifying Schema Errors and Gaps
        </h3>
        <p>
          Validators don't just say "yes" or "no". Crucially, when validation fails, they provide detailed error
          messages explaining *why* it failed. This points directly to discrepancies between your data and your schema,
          helping you pinpoint errors in your schema logic or identify rules you forgot to include.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Validation Failure</h4>
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            JSON Data (<FileJson className="inline-block w-4 h-4 mr-1" />
            ):
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Bob",
  "age": -5 // Age cannot be negative according to schema
}`}
          </pre>
          <p className="my-2 text-sm text-gray-700 dark:text-gray-300">
            Using the same JSON Schema as above (<Package className="inline-block w-4 h-4 mr-1" />
            ):
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number", "minimum": 0 },
    "isStudent": { "type": "boolean" }
  },
  "required": ["name", "age"]
}`}
          </pre>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <Wrench className="inline-block w-4 h-4 mr-1" /> A validator would report:{" "}
            <span className="text-red-600 dark:text-red-400 font-semibold">
              <XCircle className="inline-block w-4 h-4 mr-1" /> Validation Failed:
            </span>
            <br />
            - Property 'age' (-5) is less than the minimum allowed value (0).
            <br />
            <Lightbulb className="inline-block w-4 h-4 mr-1" /> This tells you the data is invalid according to the
            current schema, or perhaps your schema needs adjustment if negative ages are actually allowed in some cases.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <FileJson className="mr-2 text-purple-500" /> 3. Visualization and Understanding Complex Structures
        </h3>
        <p>
          Some advanced formatters or IDE extensions can visualize both the JSON data and the schema in a more
          human-readable format (e.g., tree views). This helps developers understand complex nested structures and how
          the schema rules apply to different parts of the data, making it easier to write or debug the schema itself.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Wrench className="mr-2 text-yellow-500" /> 4. Iterative Refinement
        </h3>
        <p>
          Schema development is often an iterative process. You start with a draft, test it against data using a
          validator, identify issues, refine the schema, and repeat. Validators provide rapid feedback crucial for this
          cycle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Lightbulb className="mr-3 text-orange-500" /> Workflow Example: Developing a User Profile Schema
        </h2>
        <p>Let's walk through a typical process:</p>
        <ol className="list-decimal pl-8 space-y-4 my-4">
          <li>
            <strong>Start with Data Examples:</strong> Collect various examples of user profile data you expect to
            handle, including edge cases (missing fields, incorrect types, invalid values).
            <pre className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto text-sm mt-2">
              {`// Example 1: Complete profile
{ "userId": "abc123", "username": "coder1", "email": "c@example.com", "age": 25, "interests": ["coding", "music"] }

// Example 2: Minimal profile
{ "userId": "def456", "username": "minimalist" }

// Example 3: Invalid data
{ "userId": 789, "username": "seveneightnine", "age": "twenty" }`}
            </pre>
          </li>
          <li>
            <strong>Draft Initial Schema:</strong> Based on the examples, write a preliminary JSON Schema.
            <pre className="bg-gray-100 p-3 rounded dark:bg-gray-800 overflow-x-auto text-sm mt-2">
              {`{
  "type": "object",
  "properties": {
    "userId": { "type": "string" },
    "username": { "type": "string" },
    "email": { "type": "string", "format": "email" }, // Add email format validation
    "age": { "type": "number", "minimum": 0 },
    "interests": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["userId", "username"], // userId and username are mandatory
  "additionalProperties": false // Reject properties not defined in the schema
}`}
            </pre>
          </li>
          <li>
            <strong>Validate with a Tool:</strong> Use an online validator, a CLI tool, or an IDE extension. Input your
            schema and each data example one by one.
          </li>
          <li>
            <strong>Analyze Results:</strong>
            <ul className="list-disc pl-6 space-y-2 my-2">
              <li>
                Example 1: Should pass validation. <CheckCircle className="inline-block w-4 h-4 text-green-500" />
              </li>
              <li>
                Example 2: Should pass validation because email, age, and interests are not in the <code>required</code>{" "}
                list. <CheckCircle className="inline-block w-4 h-4 text-green-500" />
              </li>
              <li>
                Example 3: Should fail validation. <XCircle className="inline-block w-4 h-4 text-red-500" /> Errors
                reported:
                <ul className="list-circle pl-6 text-sm italic">
                  <li>
                    <code>/userId</code>: Expected type string but got number.
                  </li>
                  <li>
                    <code>/age</code>: Expected type number but got string.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Refine Schema:</strong> Based on the validation failures, you might realize you need to add more
            constraints (e.g., minimum length for username, maximum length for interests array) or correct type
            definitions if they were wrong. You might also remove constraints if they are too strict.
          </li>
          <li>
            <strong>Repeat:</strong> Go back to step 3 with the refined schema and re-test against all data examples
            until all valid data passes and all invalid data fails with appropriate errors.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Wrench className="mr-3 text-indigo-500" /> Types of Tools Available
        </h2>
        <ul className="list-disc pl-8 space-y-2 my-4">
          <li>
            <strong>Online Validators:</strong> Websites where you can paste JSON and Schema and get instant validation
            results. Great for quick checks.
          </li>
          <li>
            <strong>Command-Line Interface (CLI) Tools:</strong> Scripts or programs you run from your terminal. Useful
            for automating validation in build pipelines or for validating many files.
          </li>
          <li>
            <strong>Integrated Development Environment (IDE) Extensions:</strong> Plugins for VS Code, Atom, etc., that
            provide syntax highlighting, auto-completion for schemas, and inline validation feedback as you type JSON or
            schema.
          </li>
          <li>
            <strong>Libraries:</strong> Packages for various programming languages (JavaScript, Python, Java, etc.) that
            allow you to programmatically validate JSON within your applications. Essential for runtime validation of
            incoming data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Lightbulb className="mr-3 text-teal-500" /> Benefits for Different Developer Levels
        </h2>
        <ul className="list-disc pl-8 space-y-4 my-4">
          <li>
            <strong>Beginner:</strong>
            <p className="mt-1">
              Helps understand JSON structure and the concept of data types and basic constraints. Provides clear
              feedback when JSON is malformed or doesn't meet simple rules.
            </p>
          </li>
          <li>
            <strong>Intermediate:</strong>
            <p className="mt-1">
              Assists in writing and testing more complex schemas involving nested objects, arrays, conditional logic
              (like <code>oneOf</code>, <code>anyOf</code>), and advanced keywords. Speeds up debugging data issues
              against a defined contract.
            </p>
          </li>
          <li>
            <strong>Advanced:</strong>
            <p className="mt-1">
              Enables the definition of rigorous data contracts for APIs and data pipelines. Facilitates data quality
              checks in CI/CD workflows. Supports complex data modeling and ensures consistency across large systems.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          JSON formatters and, more importantly, JSON validators are indispensable tools throughout the software
          development lifecycle, particularly when working with structured data and schemas. They provide essential
          feedback during schema design, help maintain data quality, and serve as a clear contract between different
          parts of a system or between different systems communicating via JSON. Integrating these tools into your
          development workflow ensures that your data conforms to expectations, leading to more robust, predictable, and
          maintainable applications.
        </p>
      </div>
    </>
  );
}
