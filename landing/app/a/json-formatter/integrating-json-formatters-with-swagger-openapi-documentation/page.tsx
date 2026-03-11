import type { Metadata } from "next";
import { AlertTriangle, BookOpen, Check, CodeXml, FileJson, Lightbulb, ListTree } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrating JSON Formatters with Swagger/OpenAPI Documentation | Offline Tools",
  description:
    "Learn where JSON examples belong in Swagger/OpenAPI docs, how Swagger UI renders them, and how to use example, examples, and externalValue correctly.",
};

export default function JsonFormattersSwaggerArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Integrating JSON Formatters with Swagger/OpenAPI Documentation</h1>

      <div className="space-y-6">
        <p>
          If you want clean, readable JSON in Swagger or OpenAPI docs, the important step is not pasting pretty JSON
          into markdown. It is attaching valid examples to the correct OpenAPI object so tools like Swagger UI can
          render and pretty-print them automatically. In most cases, that means putting your sample payload under{" "}
          <code>content.application/json</code> for the request or response you are documenting.
        </p>

        <p>
          For searchers looking for the practical "swagger json" answer: use <code>example</code> for one payload, use{" "}
          <code>examples</code> for several named payloads, keep schema-level examples for reusable model hints, and run
          every sample through a JSON formatter before it goes into the spec.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/30 dark:border-blue-900">
          <p className="font-medium">Short version</p>
          <p className="mt-2">
            The most reliable place for formatted JSON in Swagger docs is the media type object:
            <code> requestBody.content.application/json </code>
            or
            <code> responses.[status].content.application/json</code>.
            Swagger UI renders those examples as formatted JSON and uses them in the interactive docs.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" /> Where Formatted JSON Actually Goes
        </h2>
        <p>
          OpenAPI separates structure from examples. Your schema describes what the JSON should look like. Your request
          or response content describes concrete payloads that documentation tools can display. That distinction matters
          because the most visible examples in Swagger UI usually come from the media type level, not just the schema.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>schema</code> to define the shape, required fields, enums, formats, and constraints.
          </li>
          <li>
            Use <code>content.application/json.example</code> when you want one sample body.
          </li>
          <li>
            Use <code>content.application/json.examples</code> when you want multiple named request or response bodies.
          </li>
          <li>
            Use schema examples for reusable model-level guidance, not as your only documentation strategy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-blue-500" /> A Working Swagger/OpenAPI Pattern
        </h2>
        <p>
          This is the pattern that stays readable in the spec and renders well in Swagger UI: define the model in{" "}
          <code>components/schemas</code>, then attach realistic JSON bodies to the specific operation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">OpenAPI YAML example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`openapi: 3.1.1
info:
  title: Orders API
  version: 1.0.0
paths:
  /orders:
    post:
      summary: Create an order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderCreate'
            examples:
              standard:
                summary: Standard delivery order
                value:
                  customerId: "cus_123"
                  currency: "USD"
                  items:
                    - sku: "notebook-a5"
                      quantity: 2
              express:
                summary: Express order
                value:
                  customerId: "cus_456"
                  currency: "USD"
                  shippingMethod: "express"
                  items:
                    - sku: "pen-black"
                      quantity: 10
      responses:
        '201':
          description: Order created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
              example:
                id: "ord_789"
                status: "created"
                total: 42.5
                currency: "USD"

components:
  schemas:
    OrderCreate:
      type: object
      required: [customerId, currency, items]
      properties:
        customerId:
          type: string
        currency:
          type: string
        shippingMethod:
          type: string
          enum: [standard, express]
        items:
          type: array
          minItems: 1
          items:
            type: object
            required: [sku, quantity]
            properties:
              sku:
                type: string
              quantity:
                type: integer
                minimum: 1
    Order:
      type: object
      required: [id, status, total, currency]
      properties:
        id:
          type: string
        status:
          type: string
        total:
          type: number
        currency:
          type: string`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This keeps JSON as structured data. Swagger UI can then render it as formatted JSON without guessing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CodeXml className="w-6 h-6 text-blue-500" /> Choosing Between <code>example</code>, <code>examples</code>,
          and Schema Examples
        </h2>
        <p>These fields look similar, but they solve different problems.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Media type <code>example</code>:</strong> best when one request or response body is enough.
          </li>
          <li>
            <strong>Media type <code>examples</code>:</strong> best when you want named cases such as success, partial
            data, validation error, or different business scenarios.
          </li>
          <li>
            <strong>Schema <code>examples</code>:</strong> in OpenAPI 3.1, this is the preferred schema-level way to
            attach sample values to the model itself.
          </li>
          <li>
            <strong>Schema <code>example</code>:</strong> common in OpenAPI 3.0 documents and still useful when you
            need compatibility with older tooling.
          </li>
        </ul>
        <p>
          There is one important rule from the specification: <code>example</code> and <code>examples</code> are
          mutually exclusive at the same location, and an example defined on the media type overrides an example defined
          on the referenced schema for that request or response.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Schema-level example in OpenAPI 3.1</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`components:
  schemas:
    Address:
      type: object
      required: [street, city, postalCode]
      properties:
        street:
          type: string
        city:
          type: string
        postalCode:
          type: string
      examples:
        - street: "100 Market St"
          city: "San Francisco"
          postalCode: "94105"`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            If you still publish OpenAPI 3.0 specs, use singular <code>example</code> on the schema instead.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6 text-blue-500" /> Reusing JSON Examples Across Endpoints
        </h2>
        <p>
          If the same JSON response appears in several places, move it into <code>components/examples</code> and refer
          to it with <code>$ref</code>. This keeps large specs easier to maintain and avoids drift between endpoints.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Reusable example object</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`components:
  examples:
    OrderCreated:
      summary: Minimal order response
      value:
        id: "ord_789"
        status: "created"
        total: 42.5
        currency: "USD"

paths:
  /orders/{id}:
    get:
      responses:
        '200':
          description: Order details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
              examples:
                default:
                  $ref: '#/components/examples/OrderCreated'`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-blue-500" /> When <code>externalValue</code> Is the Better Option
        </h2>
        <p>
          For huge payloads, event samples, or examples shared across documentation systems, storing raw JSON in a
          standalone file can be cleaner than embedding it in YAML. In that case, use an Example Object with{" "}
          <code>externalValue</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">External JSON example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`responses:
  '200':
    description: Full order export
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Order'
        examples:
          export:
            summary: Large order export example
            externalValue: https://docs.example.com/examples/order-export.json`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            In practice, browser-rendered docs only show external examples when that URL is reachable from the docs page.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-blue-500" /> Common Mistakes That Make Swagger JSON Look Wrong
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Using YAML block strings for object payloads.</strong> A pattern like <code>example: |</code> or{" "}
            <code>example: |-</code> turns the example into a string. That is only correct if your actual payload is a
            string, not a JSON object or array.
          </li>
          <li>
            <strong>Declaring both <code>example</code> and <code>examples</code> in the same place.</strong> Pick one.
          </li>
          <li>
            <strong>Copying invalid JSON into the spec.</strong> Trailing commas, comments, single-quoted keys, and
            mismatched braces break examples fast.
          </li>
          <li>
            <strong>Letting examples drift away from the schema.</strong> If the example does not match the model, docs
            become misleading and validators may flag the spec.
          </li>
          <li>
            <strong>Using fake placeholder data everywhere.</strong> Samples like <code>"string"</code> or{" "}
            <code>0</code> do not help developers understand the real contract.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-blue-500" /> A Practical JSON Formatter Workflow
        </h2>
        <p>
          A JSON formatter is most useful before the example reaches your OpenAPI file. Take the real payload from a
          response log, contract test, or SDK fixture, then clean it up before you paste it into the spec.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Format and validate the JSON first so you catch syntax issues immediately.</li>
          <li>Remove unstable values that create noise, such as timestamps or generated IDs, unless they matter.</li>
          <li>Keep values realistic so the sample teaches format, casing, and nesting conventions.</li>
          <li>
            If your OpenAPI file is YAML, translate the formatted JSON into native YAML objects instead of storing the
            whole object as a quoted string.
          </li>
          <li>
            Add separate named examples for success, validation errors, and edge cases rather than forcing one payload
            to do everything.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" /> Current Swagger/OpenAPI Notes
        </h2>
        <p>
          Current Swagger guidance still documents the familiar OpenAPI 3.0 example patterns, while the OpenAPI 3.1
          specification aligns schema behavior more closely with JSON Schema and prefers schema-level{" "}
          <code>examples</code> over the older singular schema <code>example</code>. The practical takeaway is simple:
          for the broadest compatibility in generated docs, keep your main request and response payloads on the media
          type object, and treat schema examples as supporting context.
        </p>
        <p>
          If you want to confirm exact behavior, check the{" "}
          <a
            href="https://swagger.io/docs/specification/v3_0/adding-examples/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Swagger documentation on adding examples
          </a>{" "}
          and the{" "}
          <a
            href="https://spec.openapis.org/oas/v3.1.1.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            OpenAPI 3.1.1 specification
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-blue-500" /> Conclusion
        </h2>
        <p>
          The cleanest way to integrate JSON formatting with Swagger/OpenAPI documentation is to pair solid schemas with
          explicit, validated examples at <code>content.application/json</code>. Format the payload first, keep it as
          structured data, use named examples when the operation has multiple valid outcomes, and reserve schema
          examples and <code>externalValue</code> for reuse and scale. That approach produces better Swagger docs and
          makes the underlying API contract easier to trust.
        </p>
      </div>
    </>
  );
}
