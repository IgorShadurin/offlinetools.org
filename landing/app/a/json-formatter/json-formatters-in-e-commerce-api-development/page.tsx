import type { Metadata } from "next";
import { PackageOpen, Wrench, CheckCircle, Gauge, Code } from "lucide-react"; // Changed Speedometer to Gauge

export const metadata: Metadata = {
  title: "JSON Formatters in E-commerce API Development | API Guides",
  description: "Explore the role and importance of JSON formatters in building robust and consistent e-commerce APIs.",
};

export default function JsonFormattersArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        JSON Formatters in E-commerce API Development
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          In the world of e-commerce, APIs are the backbone connecting frontends, mobile apps, third-party services, and
          internal systems. Data flows through these APIs in various formats, but JSON (JavaScript Object Notation) is
          arguably the most ubiquitous due to its simplicity and readability. However, merely sending data as JSON isn't
          enough. To ensure reliability, maintainability, and a great developer experience, applying consistent and
          well-defined JSON formatting is crucial.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white flex items-center">
          <PackageOpen className="mr-2 text-blue-500" /> Why JSON Formatting Matters in E-commerce
        </h2>

        <p>
          E-commerce APIs deal with sensitive and complex data like product details, pricing, customer information,
          orders, and payment statuses. Inconsistencies in how this data is represented in JSON can lead to numerous
          issues:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Inconsistencies:</strong> A product price might be sent as a string in one endpoint and a
            number in another. A date could be an ISO string here, a Unix timestamp there.
          </li>
          <li>
            <strong>Client-Side Errors:</strong> Frontend developers have to write complex, error-prone code to handle
            various possible data formats from the API.
          </li>
          <li>
            <strong>Integration Headaches:</strong> Connecting third-party services (payment gateways, shipping
            providers, analytics platforms) becomes difficult if data doesn't conform to expected structures.
          </li>
          <li>
            <strong>Poor Developer Experience:</strong> Developers consuming the API waste time debugging formatting
            issues instead of building features.
          </li>
          <li>
            <strong>Maintenance Nightmares:</strong> As the API evolves, inconsistencies multiply, making changes risky
            and difficult.
          </li>
        </ul>

        <p>
          JSON formatters (or serializers/transformers, as they are sometimes called) provide a structured way to ensure
          that the data sent in API responses is always consistent, predictable, and adheres to a defined standard.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white flex items-center">
          <Wrench className="mr-2 text-green-500" /> Common Formatting Concerns
        </h2>

        <p>Here are some typical formatting issues that formatters address:</p>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Case Sensitivity for Keys</h3>
        <p>
          Should keys be <code>camelCase</code>, <code>snake_case</code>, or <code>PascalCase</code>? Consistency is
          key. For example, product price could be <code>productPrice</code> or <code>product_price</code>. Pick one
          style and stick to it across all endpoints.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Consistent Case:</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`{
  "productId": "SKU123",
  "productName": "Laptop",
  "price": 1200.50,
  "inStock": true
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Handling Null vs. Missing Fields</h3>
        <p>
          When a piece of data doesn't exist or isn't applicable, should the key be omitted entirely, or should its
          value be <code>null</code>?
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Option A: Omit Field (if no value):</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`{
  "orderId": "ORD456",
  "shippingAddress": { /* ... address details ... */ },
  // billingAddress is omitted if it's the same as shipping
}`}
          </pre>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
            Option B: Use `null` (explicitly no value):
          </h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`{
  "orderId": "ORD789",
  "shippingAddress": { /* ... address details ... */ },
  "billingAddress": null // explicitly indicates no separate billing address
}`}
          </pre>
        </div>
        <p>
          Using <code>null</code> is often preferred as it makes the schema more explicit and easier for consumers to
          work with, especially in strongly typed languages.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Data Types and Formats</h3>
        <p>
          Ensuring that numbers are numbers, booleans are booleans, and strings are strings is fundamental. Special
          attention is needed for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Numbers:</strong> Are prices always floats? Quantities always integers? Avoid sending numbers as
            strings.
          </li>
          <li>
            <strong>Booleans:</strong> Use the JSON boolean primitives (<code>true</code>, <code>false</code>), not
            strings like `"true"` or `"false"`, or numbers like <code>1</code> or <code>0</code>.
          </li>
          <li>
            <strong>Dates and Timestamps:</strong> The{" "}
            <a
              href="https://en.wikipedia.org/wiki/ISO_8601"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              ISO 8601 format
            </a>{" "}
            (e.g., <code>"2023-10-27T10:00:00Z"</code>) is a widely accepted standard for datetimes and is highly
            recommended.
          </li>
          <li>
            <strong>Money/Currency:</strong> Representing monetary values precisely is critical. While numbers (like
            decimals or floats) can be used, it's often safer to send currency values as a string (e.g.,{" "}
            <code>"1200.50"</code>) along with a separate currency code (e.g., <code>"USD"</code>) or use an integer
            representation of the smallest unit (e.g., cents: <code>120050</code> for $1200.50).
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Date and Money Example:</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`{
  "orderPlacedAt": "2023-10-27T14:30:00.000Z",
  "totalAmount": {
    "value": "55.99",
    "currency": "EUR"
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">
          Nested Structures and Relationships
        </h3>
        <p>
          E-commerce data is often nested (e.g., an order containing multiple items, each with product details) or
          related (e.g., an order linked to a customer ID). Formatters help structure these relationships consistently.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Nested Order Items:</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`{
  "orderId": "ORD001",
  "customer": {
    "customerId": "CUST007",
    "name": "James Bond"
    // ... other customer details ...
  },
  "items": [
    {
      "orderItemId": "OI001",
      "product": {
        "productId": "PROD42",
        "name": "Gadget Pen"
        // ... product details ...
      },
      "quantity": 2,
      "unitPrice": "15.00",
      "lineTotal": "30.00"
    }
    // ... more items ...
  ]
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white flex items-center">
          <Code className="mr-2 text-purple-500" /> Implementing JSON Formatters
        </h2>

        <p>How do you implement this? There are several approaches:</p>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Manual Formatting</h3>
        <p>
          The simplest approach is to manually construct the desired JSON object before sending the response. This
          involves creating new objects and mapping data from your internal models to the API's output format.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Manual Formatting Example (TypeScript/JavaScript):
          </h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`// Assume 'dbProduct' is the data from your database
interface DbProduct {
  id: string;
  name: string;
  price_cents: number; // Price stored as cents
  is_available: boolean;
  created_at: Date;
}

interface ApiProduct {
  productId: string;
  productName: string;
  price: {
    value: string; // Price as string with decimal
    currency: string;
  };
  inStock: boolean;
  createdAt: string; // Date as ISO string
}

function formatProductForApi(dbProduct: DbProduct): ApiProduct {
  return {
    productId: dbProduct.id,
    productName: dbProduct.name,
    price: {
      value: (dbProduct.price_cents / 100).toFixed(2), // Convert cents to decimal string
      currency: "USD", // Assuming USD
    },
    inStock: dbProduct.is_available,
    createdAt: dbProduct.created_at.toISOString(), // Format date
  };
}

// In your API handler:
// const dbProduct = await fetchProductFromDb(productId);
// const apiResponseData = formatProductForApi(dbProduct);
// return NextResponse.json(apiResponseData); // Using Next.js API route response`}
          </pre>
        </div>
        <p>
          This approach is straightforward for small APIs but can become repetitive and hard to manage as the API grows
          and more complex data structures need formatting.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">
          Using Libraries or Dedicated Transformer Classes
        </h3>
        <p>
          Many frameworks and languages offer libraries or patterns for data transformation or serialization. In
          TypeScript/JavaScript, you might create dedicated classes or functions that serve as "transformers" or
          "formatters" for specific resource types (e.g., <code>ProductTransformer</code>, <code>OrderFormatter</code>).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Transformer Class Pattern (Conceptual):</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`class ProductTransformer {
  transform(dbProduct: DbProduct): ApiProduct {
    return {
      productId: dbProduct.id,
      productName: dbProduct.name,
      price: {
        value: (dbProduct.price_cents / 100).toFixed(2),
        currency: "USD",
      },
      inStock: dbProduct.is_available,
      createdAt: dbProduct.created_at.toISOString(),
    };
  }

  // Optional: Handle collections
  transformCollection(dbProducts: DbProduct[]): ApiProduct[] {
    return dbProducts.map(product => this.transform(product));
  }
}

// In your API handler:
// const dbProducts = await fetchProductsFromDb();
// const transformer = new ProductTransformer();
// const apiResponseData = transformer.transformCollection(dbProducts);
// return NextResponse.json(apiResponseData);`}
          </pre>
        </div>
        <p>
          This pattern centralizes the formatting logic, making it more reusable and testable. It separates the concerns
          of fetching data from formatting it for the API response.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Schema Definition and Validation</h3>
        <p>
          Defining your API's JSON schema using standards like{" "}
          <a
            href="https://json-schema.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            JSON Schema
          </a>{" "}
          and implementing validation on both the input (request body) and output (response body) sides is a powerful
          way to enforce formatting rules automatically.
        </p>
        <p>
          Libraries exist (e.g., Zod, Yup, Joi in JavaScript/TypeScript) that allow you to define schemas
          programmatically and validate data against them. While primarily used for input validation, they can also be
          used to define the expected output structure and types.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Schema Definition Example (using Zod):</h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {`import { z } from 'zod'; // Assuming Zod is used for schema validation

// Define the schema for the API Product format
const ApiProductSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  price: z.object({
    value: z.string().regex(/^\\d+(\.\\d{2})?$/), // Basic regex for decimal string
    currency: z.string().length(3), // e.g., "USD"
  }),
  inStock: z.boolean(),
  createdAt: z.string().datetime(), // Expects ISO 8601 datetime string
});

type ApiProduct = z.infer<typeof ApiProductSchema>;

function formatProductForApiWithValidation(dbProduct: DbProduct): ApiProduct {
  const formattedData = {
    productId: dbProduct.id,
    productName: dbProduct.name,
    price: {
      value: (dbProduct.price_cents / 100).toFixed(2),
      currency: "USD",
    },
    inStock: dbProduct.is_available,
    createdAt: dbProduct.created_at.toISOString(),
  };

  // Validate the formatted data against the schema
  const validationResult = ApiProductSchema.safeParse(formattedData);

  if (!validationResult.success) {
    // Handle validation errors (log, throw, etc.) - indicates a bug in the formatter
    console.error("Output JSON validation failed:", validationResult.error);
    throw new Error("Failed to format product data correctly.");
  }

  return validationResult.data;
}

// In your API handler:
// try {
//   const dbProduct = await fetchProductFromDb(productId);
//   const apiResponseData = formatProductForApiWithValidation(dbProduct);
//   return NextResponse.json(apiResponseData);
// } catch (error) {
//   // Handle formatter or other errors
//   return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
// }`}
          </pre>
        </div>
        <p>
          Using schema validation adds an extra layer of safety, catching formatting bugs before they reach API
          consumers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white flex items-center">
          <CheckCircle className="mr-2 text-teal-500" /> Benefits of Consistent Formatting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Improved Reliability:</strong> Predictable data formats reduce errors on the client side and in
            integrations.
          </li>
          <li>
            <strong>Enhanced Developer Experience:</strong> Clear documentation (often generated from schemas) and
            consistent responses make the API a pleasure to work with.
          </li>
          <li>
            <strong>Easier Maintenance:</strong> Centralized formatting logic simplifies updates and reduces the risk of
            introducing inconsistencies.
          </li>
          <li>
            <strong>Standardization:</strong> Enforces API design principles and promotes best practices across the
            development team.
          </li>
          <li>
            <strong>Potential Performance Gains:</strong> While direct performance impact might be minimal, clear
            structure can sometimes allow for more efficient parsing on the client side.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white flex items-center">
          <Gauge className="mr-2 text-orange-500" /> Formatting and Performance {/* Changed Speedometer to Gauge */}
        </h2>
        <p>
          While formatting adds a processing step, its impact on performance is usually negligible compared to network
          latency or database query times, especially for typical JSON payloads in e-commerce. The benefits in terms of
          reduced bugs and development time far outweigh this small overhead.
        </p>
        <p>
          However, be mindful of formatting large lists or deeply nested data. Transforming thousands of complex objects
          can consume CPU resources. In such cases, consider pagination or optimizing the transformation logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Conclusion</h2>
        <p>
          Adopting a deliberate and consistent strategy for JSON formatting is not an optional step but a fundamental
          requirement for building high-quality e-commerce APIs. It's an investment that pays off by reducing bugs,
          improving integration capabilities, and providing a superior experience for the developers who rely on your
          API. Whether you choose manual formatting, dedicated transformers, or schema-based validation, establishing
          clear formatting rules and enforcing them is key to the success of your e-commerce platform.
        </p>
      </div>
    </div>
  );
}
