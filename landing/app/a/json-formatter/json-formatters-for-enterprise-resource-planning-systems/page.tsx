import type { Metadata } from "next";
import {
  Server,
  Link,
  CheckCircle,
  ArrowRightLeft, // Corrected import name
  FileJson,
  Network, // Corrected import name
  Database,
  Code,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters for Enterprise Resource Planning Systems | ERP Integration",
  description:
    "Explore the crucial role of JSON formatters in integrating, validating, and transforming data within and between Enterprise Resource Planning (ERP) systems.",
};

export default function JsonFormattersForErpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        JSON Formatters for Enterprise Resource Planning Systems
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Enterprise Resource Planning (ERP) systems are the backbone of many businesses, managing crucial processes
          from finance and human resources to supply chain and customer relationships. In today's interconnected digital
          landscape, ERPs rarely operate in isolation. They need to exchange data with other internal modules, external
          services (like e-commerce platforms, CRMs, WMSs), and partners. JSON (JavaScript Object Notation) has emerged
          as a dominant format for this data exchange due to its human readability, versatility, and widespread support
          across various programming languages and platforms.
        </p>

        <p>
          While simply having data in JSON format is a start, ensuring its correct structure, integrity, and
          compatibility between different systems requires more than just parsing. This is where **JSON Formatters**, in
          the broader sense of tools and logic for handling JSON data, become indispensable components in the ERP
          integration architecture.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          <span className="inline-block mr-2 align-middle">
            <Server size={24} />
          </span>
          What is a JSON Formatter in the ERP Context?
        </h2>
        <p>
          Beyond mere "pretty printing," a JSON formatter in the context of ERP integration refers to the set of
          processes, tools, and code responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold flex items-center">
              <CheckCircle size={18} className="mr-2 text-green-500" /> Validation:
            </span>
            Ensuring incoming or outgoing JSON data conforms to an expected structure (schema) and data types.
          </li>
          <li>
            <span className="font-semibold flex items-center">
              <ArrowRightLeft size={18} className="mr-2 text-blue-500" /> Transformation/Mapping:{" "}
              {/* Corrected component name */}
            </span>
            Converting JSON data from one structure or naming convention to another to match the requirements of the
            target system (e.g., converting `customer_id` to `CustomerId`, or nesting address details differently).
          </li>
          <li>
            <span className="font-semibold flex items-center">
              <Link size={18} className="mr-2 text-purple-500" /> Structuring for APIs:
            </span>
            Building JSON payloads that precisely match the API specifications of integrated systems.
          </li>
          <li>
            <span className="font-semibold flex items-center">
              <Code size={18} className="mr-2 text-yellow-500" /> Serialization/Deserialization:
            </span>
            Converting internal ERP data structures into JSON strings (serialization) and converting incoming JSON
            strings back into usable internal data structures (deserialization).
          </li>
          <li>
            <span className="font-semibold flex items-center">
              <Wrench size={18} className="mr-2 text-orange-500" /> Error Handling & Logging:
            </span>
            Catching malformed JSON, validation failures, or transformation errors and logging them for debugging.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          <span className="inline-block mr-2 align-middle">
            <Link size={24} />
          </span>
          Why Formatters are Crucial for ERP Integrations
        </h2>
        <p>
          The success of any ERP integration hinges on the accurate and reliable exchange of data. Formatters play a
          vital role by:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Ensuring Data Quality:</strong> Validation steps prevent malformed or incomplete data from entering
            the ERP, maintaining data integrity.
          </li>
          <li>
            <strong>Bridging System Differences:</strong> Different systems have different data models and naming
            conventions. Transformation logic maps data between these models, making integration possible without
            altering core ERP structures unnecessarily.
          </li>
          <li>
            <strong>Reducing Development Effort:</strong> Well-defined formatting and transformation rules make
            integration logic clearer and easier to maintain compared to ad-hoc parsing and manipulation.
          </li>
          <li>
            <strong>Improving Debugging:</strong> Structured, validated JSON is easier to read and debug, speeding up
            troubleshooting when integration issues arise.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          <span className="inline-block mr-2 align-middle">
            <Network size={24} /> {/* Corrected component name */}
          </span>
          Common Use Cases
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">API Integrations:</span> Exposing ERP data via APIs or consuming external
            APIs (e.g., getting order details from an e-commerce platform, sending shipping updates to a carrier
            service).
          </li>
          <li>
            <span className="font-semibold">Data Migration:</span> Preparing data extracted from legacy systems in JSON
            format before importing into a new ERP, or vice versa.
          </li>
          <li>
            <span className="font-semibold">Inter-Module Communication:</span> In microservices or service-oriented ERP
            architectures, modules might exchange data in JSON format.
          </li>
          <li>
            <span className="font-semibold">Reporting & Analytics:</span> Exporting ERP data in a structured JSON format
            for consumption by business intelligence tools.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          <span className="inline-block mr-2 align-middle">
            <Wrench size={24} />
          </span>
          Implementation Angles & Technical Considerations
        </h2>
        <p>Implementing robust JSON handling in an ERP integration involves several technical steps:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white flex items-center">
          <FileJson size={20} className="mr-2" /> Parsing and Serialization
        </h3>
        <p>
          Most languages have built-in JSON parsing (`JSON.parse` in JavaScript/TypeScript) and serialization
          (`JSON.stringify`). These are the foundational steps.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-sm overflow-x-auto">
          <pre>
            {`// Example: Deserializing an incoming JSON string
const jsonString = '{ "orderId": "12345", "totalAmount": 150.75 }';
try {
  const orderData = JSON.parse(jsonString);
  console.log(orderData.orderId); // Accessing parsed data
} catch (error) {
  console.error("Failed to parse JSON:", error);
}

// Example: Serializing an internal data structure to JSON
const productDetails = {
  productId: "SKU789",
  name: "Widget",
  price: 25.00,
  isInStock: true,
};
const productJsonString = JSON.stringify(productDetails, null, 2); // null, 2 for pretty printing
console.log(productJsonString);`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white flex items-center">
          <CheckCircle size={20} className="mr-2" /> Validation (Using JSON Schema)
        </h3>
        <p>
          Simply parsing JSON doesn't guarantee it has the expected fields or data types. JSON Schema is a powerful
          standard for describing the structure of JSON data. Libraries like `ajv` (Another JSON Schema Validator) in
          Node.js (which Next.js runs on) are commonly used to validate JSON payloads against a predefined schema.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-sm overflow-x-auto">
          <h4 className="font-medium mb-2">Conceptual Validation Flow:</h4>
          <pre>
            {`// Example JSON Schema for a simple order item
const orderItemSchema = {
  type: "object",
  properties: {
    itemId: { type: "string" },
    quantity: { type: "integer", minimum: 1 },
    unitPrice: { type: "number", minimum: 0 },
  },
  required: ["itemId", "quantity", "unitPrice"],
  additionalProperties: false // Reject properties not defined in schema
};

// Assume 'ajv' library is imported/required
// const Ajv = require("ajv");
// const ajv = new Ajv();
// const validate = ajv.compile(orderItemSchema);

// Example: Validating received data
const receivedItemData = {
  itemId: "ITEM001",
  quantity: 5,
  unitPrice: 10.99,
  // Note: No extra properties
};

const receivedInvalidItemData = {
  itemId: "ITEM002",
  quantity: "not a number", // Invalid type
};

// In a real scenario:
// const isValid = validate(receivedItemData);
// if (!isValid) {
//   console.error("Validation errors:", validate.errors);
//   // Handle error (e.g., reject request, log issue)
// } else {
//   console.log("Data is valid.");
//   // Proceed with processing data
// }

// const isInvalid = validate(receivedInvalidItemData);
// if (!isInvalid) {
//    console.error("Validation errors for invalid data:", validate.errors);
// }`}
          </pre>
        </div>
        <p>Using JSON Schema makes your API contracts explicit and helps catch data issues early.</p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white flex items-center">
          <ArrowRightLeft size={20} className="mr-2" /> Transformation and Mapping {/* Corrected component name */}
        </h3>
        <p>
          This is often the most complex part. You need to map fields from the source JSON structure to the target
          structure expected by the ERP (or vice versa). This can involve:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Renaming fields.</li>
          <li>Changing data types (e.g., string to number, string to date object).</li>
          <li>Restructuring (e.g., flattening nested objects, creating nested objects).</li>
          <li>Applying business logic (e.g., calculating a value based on other fields).</li>
          <li>Handling missing or optional fields.</li>
        </ul>
        <p>
          Manual mapping with basic object manipulation is feasible for simple cases, but libraries like `lodash/fp`
          (for functional programming style transformations) or dedicated data mapping tools/languages (like JSONata, JQ
          syntax implemented in libraries) can be invaluable for complex transformations.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-sm overflow-x-auto">
          <h4 className="font-medium mb-2">Simple Transformation Example (Conceptual TS):</h4>
          <pre>
            {`interface ExternalOrder {
  id: string;
  customer_info: {
    name: string;
    address: string; // Simple address string
  };
  items: Array<{ item_id: string; qty: number; price: number }>;
  order_date: string;
  total: number;
}

interface ErpSalesOrder {
  SalesOrderId: string;
  CustomerId: string; // Assuming we map customer_info.name to CustomerId for simplicity
  OrderDate: Date;
  Lines: Array<{ ProductCode: string; Quantity: number; UnitPrice: number; LineTotal: number }>;
  TotalAmount: number;
}

function transformExternalOrderToErpSalesOrder(externalOrder: ExternalOrder): ErpSalesOrder {
  // Basic transformation - ignores address, simplifies customer mapping
  return {
    SalesOrderId: externalOrder.id,
    CustomerId: externalOrder.customer_info.name, // Simple mapping, might need lookup in real ERP
    OrderDate: new Date(externalOrder.order_date), // Assuming date string is parseable
    Lines: externalOrder.items.map(item => ({
      ProductCode: item.item_id,
      Quantity: item.qty,
      UnitPrice: item.price,
      LineTotal: item.qty * item.price, // Calculate line total
    })),
    TotalAmount: externalOrder.total,
  };
}

// Example Usage:
// const sampleExternalOrder: ExternalOrder = { ... }; // Your source data
// const erpOrder = transformExternalOrderToErpSalesOrder(sampleExternalOrder);
// console.log(erpOrder); // The transformed object ready for ERP processing`}
          </pre>
        </div>
        <p>
          Complex transformations might involve conditional logic, lookups against ERP data, or combining data from
          multiple parts of the source JSON.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white flex items-center">
          <Database size={20} className="mr-2" /> Handling Large Data & Performance
        </h3>
        <p>
          For very large JSON payloads (e.g., bulk data imports), parsing the entire string into memory might be
          inefficient or impossible. Streaming parsers can process JSON chunk by chunk, which is more memory-efficient
          for large datasets. Performance of transformation logic is also key, especially in high-throughput scenarios.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Conclusion</h2>
        <p>
          JSON formatters, understood as the comprehensive logic for parsing, validating, transforming, and serializing
          JSON data, are critical components in modern ERP architectures. They enable seamless data exchange, ensure
          data quality, and bridge the gaps between disparate systems. While built-in language features provide the
          basic parsing and serialization, integrators must leverage additional tools and well-structured code, often
          including schema validation and sophisticated mapping logic, to build robust and maintainable ERP integrations
          powered by JSON.
        </p>
      </div>
    </div>
  );
}
