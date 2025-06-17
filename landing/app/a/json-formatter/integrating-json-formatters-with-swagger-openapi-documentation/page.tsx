import type { Metadata } from "next";
import { FileJson, CodeXml, ListTree, Check, Lightbulb, BookOpen } from "lucide-react"; // Importing allowed icons

export const metadata: Metadata = {
  title: "Integrating JSON Formatters with Swagger/OpenAPI Documentation | Offline Tools",
  description:
    "Learn how to effectively integrate JSON formatting into your Swagger/OpenAPI documentation for improved clarity and usability.",
};

export default function JsonFormattersSwaggerArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Integrating JSON Formatters with Swagger/OpenAPI Documentation</h1>

      <div className="space-y-6">
        <p>
          Clear and precise API documentation is crucial for developer adoption and ease of use. When documenting APIs
          that exchange data in JSON format, presenting the JSON payloads in a readable, structured way is paramount.
          Swagger (or OpenAPI Specification, OAS) is the de facto standard for describing RESTful APIs, and it provides
          powerful features for defining data structures and examples. This article explores how to leverage these
          features to integrate effective JSON formatting directly within your Swagger/OpenAPI documentation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" /> Why is JSON Formatting Important in Documentation?
        </h2>
        <p>
          Raw, unformatted JSON strings can be incredibly difficult to read, especially for complex or deeply nested
          structures. Proper formatting, which includes indentation, line breaks, and consistent spacing, offers several
          benefits:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Improved Readability:</strong> Developers can quickly scan and understand the structure of request
            and response bodies.
          </li>
          <li>
            <strong>Easier Debugging:</strong> Identifying missing commas, incorrect nesting, or other syntax errors
            becomes much simpler.
          </li>
          <li>
            <strong>Enhanced Collaboration:</strong> Clearly formatted examples help teams communicate API contracts
            effectively.
          </li>
          <li>
            <strong>Tool Compatibility:</strong> Many API tools (like Swagger UI, Postman, Insomnia) automatically
            format JSON examples, but providing pre-formatted or well-structured examples in the spec ensures
            consistency and handles cases where automatic formatting might be limited.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CodeXml className="w-6 h-6 text-blue-500" /> How Swagger/OpenAPI Defines Data Structures
        </h2>
        <p>
          Swagger/OpenAPI uses the concept of "Schemas" to describe the data structures of request bodies, response
          bodies, and parameters. These schemas are based on{" "}
          <a
            href="https://json-schema.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            JSON Schema
          </a>{" "}
          and are typically defined in the <code>components/schemas</code> section of your OpenAPI specification file.
        </p>
        <p>
          A schema defines the expected data types, properties, required fields, and constraints of a JSON object or
          array. While the schema itself defines the structure, examples are needed to show concrete instances of the
          data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-blue-500" /> Integrating JSON Examples
        </h2>
        <p>
          The primary way to show formatted JSON in Swagger/OpenAPI documentation is by providing examples. OpenAPI
          provides several ways to include examples:
        </p>

        <h3 className="text-xl font-semibold mt-6">
          1. Using the <code>example</code> Field (Simple)
        </h3>
        <p>
          The <code>example</code> field can be used directly within a schema, parameter, or response body definition to
          provide a single example value. For JSON objects or arrays, you embed the JSON structure directly. Writing it
          with proper indentation in your YAML or JSON spec file is the simplest way to format it for readability within
          the source documentation. Swagger UI will typically format this further.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">YAML Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`responses:
  '200':
    description: A list of users.
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: '#/components/schemas/User'
        example: |- # Using |- for multi-line string preservation
          [
            {
              "id": 1,
              "name": "Alice Smith",
              "email": "alice@example.com",
              "isActive": true
            },
            {
              "id": 2,
              "name": "Bob Johnson",
              "email": "bob@example.com",
              "isActive": false
            }
          ]`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Using YAML&apos;s <code>|-</code> syntax helps preserve explicit line breaks and indentation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          2. Using the <code>examples</code> Field (Multiple Examples)
        </h3>
        <p>
          When you need to show multiple examples for a single location (e.g., different response scenarios), use the{" "}
          <code>examples</code> field. This field holds a map of named examples. Each example can either have an{" "}
          <code>value</code> field (embedding the JSON) or an <code>externalValue</code> field (linking to an external
          file). Using <code>value</code> is similar to the single <code>example</code> field but allows naming and
          describing each case.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">YAML Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`responses:
  '200':
    description: User details.
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
        examples:
          userActive:
            summary: An example of an active user
            value:
              id: 1 # YAML allows omitting quotes for simple strings
              name: Alice Smith
              email: alice@example.com
              isActive: true
          userInactive:
            summary: An example of an inactive user
            value:
              id: 2
              name: Bob Johnson
              email: bob@example.com
              isActive: false`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            YAML&apos;s structure inherently provides indentation, which translates well into formatted JSON when
            rendered by tools like Swagger UI.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          3. Using <code>externalValue</code> (Linking External Files)
        </h3>
        <p>
          For very large or numerous examples, you can store the JSON in separate files (e.g.,{" "}
          <code>examples/user.json</code>) and reference them using <code>externalValue</code> within the{" "}
          <code>examples</code> field. This keeps your main OpenAPI spec clean and allows you to use standard JSON
          formatting tools on the external files.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">YAML Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`responses:
  '200':
    description: User details loaded from an external file.
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
        examples:
          singleUserExample:
            summary: Example User Object from external file
            externalValue: https://example.com/api-docs/examples/user.json # Can be a URL or relative path`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The content of <code>user.json</code> should be the raw or pre-formatted JSON payload. Swagger UI will fetch
            and display it.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          4. Defining Schemas in <code>components/schemas</code>
        </h3>
        <p>
          While not directly providing *examples*, defining clear schemas in <code>components/schemas</code> is
          fundamental. These schemas provide the necessary structure that tools like Swagger UI use to understand the
          expected JSON format. You can optionally include an <code>example</code> field within a schema definition
          itself, which serves as a default example for any part of the spec that references that schema.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">YAML Example (Schema Definition):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
          description: Unique identifier for the user.
        name:
          type: string
          description: The user's full name.
        email:
          type: string
          format: email
          description: The user's email address.
        isActive:
          type: boolean
          description: Whether the user is currently active.
      required:
        - id
        - name
        - email
        - isActive
      example: # Example within the schema definition
        id: 101
        name: Charlie Brown
        email: charlie@example.com
        isActive: true`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This schema provides structure and a default example. Specific response/request definitions can override or
            add to this example using their own <code>example</code> or <code>examples</code> fields.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6 text-blue-500" /> How Documentation Tools Render Formatted JSON
        </h2>
        <p>
          Tools like Swagger UI are designed to parse the OpenAPI specification and render it into interactive
          documentation. When they encounter JSON examples defined using <code>example</code> or <code>examples</code>{" "}
          (with the <code>value</code> field) or fetched via <code>externalValue</code>, they typically:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Automatically detect that the content type is JSON (based on the <code>application/json</code> MIME type).
          </li>
          <li>Apply syntax highlighting appropriate for JSON.</li>
          <li>
            Render the JSON with proper indentation, line breaks, and potentially collapsible sections for nested
            objects/arrays, even if the source YAML/JSON is less perfectly formatted.
          </li>
          <li>Display schema information alongside the examples.</li>
        </ul>
        <p>
          This automatic formatting by the rendering tool is the final step in presenting readable JSON to the developer
          using the documentation. Your role as the API documenter is to provide the correct JSON content within the
          appropriate fields (<code>example</code>, <code>examples</code>, or external files) and define the structure
          using schemas.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-blue-500" /> Best Practices for JSON Formatting in Swagger
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Always Use Schemas:</strong> Define your data structures in <code>components/schemas</code> and
            reference them. This provides the canonical structure and helps validation.
          </li>
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Provide Examples:</strong> Include realistic examples for both request and response bodies. Use{" "}
            <code>examples</code> for multiple scenarios (success, error, different data states).
          </li>
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Format Source YAML/JSON:</strong> Even though tools auto-format, keeping your source specification
            file clean with consistent indentation for embedded JSON improves the readability of the documentation
            source code itself. Use YAML&apos;s multi-line string indicators (<code>|</code> or <code>|-</code>) where
            helpful.
          </li>
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Keep Examples Realistic:</strong> Examples should reflect actual data structures and typical values
            returned by the API. Avoid placeholders like <code>"string"</code> or <code>0</code> where specific value
            formats (like dates, UUIDs) are expected.
          </li>
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>
              Use <code>externalValue</code> for Large Examples:
            </strong>{" "}
            Don&apos;t clutter your main spec file with massive JSON payloads.
          </li>
          <li>
            <Check className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Document Errors:</strong> Provide examples for common error responses (e.g., 400, 401, 404, 500) to
            show the expected error JSON format.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6 text-blue-500" /> Example Structure in OpenAPI YAML
        </h2>
        <p>Here&apos;s a simplified snippet showing how schemas and examples connect in a typical OpenAPI YAML file:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`openapi: 3.0.0
info:
  title: Example API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get a list of users
      responses:
        '200':
          description: Successfully retrieved list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
              examples: # Using examples for multiple scenarios if needed
                success:
                  summary: Array of users
                  value: # Embedded JSON example
                    - id: 1
                      name: Alice
                    - id: 2
                      name: Bob
        '500':
          description: Server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example: # Embedded JSON example for error
                code: 500
                message: Internal Server Error

components:
  schemas:
    User: # User Schema definition
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
      required:
        - id
        - name
      example: # Default example for User schema
        id: 99
        name: Default User

    ErrorResponse: # Error Schema definition
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
      required:
        - code
        - message
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-blue-500" /> Conclusion
        </h2>
        <p>
          Integrating well-formatted JSON examples and robust schemas into your Swagger/OpenAPI documentation
          significantly enhances its value. By clearly defining data structures and providing realistic, readable
          examples, you empower developers consuming your API, reduce potential misunderstandings, and streamline the
          integration process. Leverage the <code>schema</code>, <code>example</code>, and <code>examples</code> fields
          effectively, and remember that the rendering tools will do the final formatting magic to present your JSON
          beautifully.
        </p>
      </div>
    </>
  );
}
