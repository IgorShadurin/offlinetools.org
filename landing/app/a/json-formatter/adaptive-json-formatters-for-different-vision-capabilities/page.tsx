import type { Metadata } from "next";
import {
  Eye,
  Cog,
  LayoutList,
  Filter,
  CodeXml,
  Users,
  Palette,
  Settings,
} from "lucide-react"; // Only import allowed icons

export const metadata: Metadata = {
  title: "Adaptive JSON Formatters for Different Vision Capabilities | Article",
  description:
    "Explore techniques for formatting JSON data to suit various consumption 'vision' capabilities, from human readability to machine processing.",
};

export default function AdaptiveJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Eye className="w-8 h-8" /> Adaptive JSON Formatters for Different
        Vision Capabilities
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          In modern web development and data exchange, JSON (JavaScript Object
          Notation) is the de facto standard. Its simplicity and widespread
          support make it ideal for APIs, configuration files, and data
          storage. However, not all consumers of JSON data are created equal.
          What works well for a human developer inspecting a response might be
          inefficient for an automated system or inaccessible for a user
          relying on assistive technologies.
        </p>
        <p>
          This is where the concept of "Adaptive JSON Formatting for Different
          Vision Capabilities" comes into play. It's about intelligently
          structuring and presenting JSON data based on the specific needs and
          capabilities of the entity consuming it – whether that entity is a
          human user with specific accessibility requirements, a backend microservice,
          a mobile application, or a frontend visualization tool.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cog className="w-6 h-6" /> Understanding "Vision Capabilities"
        </h2>
        <p>
          The term "Vision Capabilities" in this context refers to the diverse ways
          different systems or users interact with and process JSON data. These
          capabilities dictate the optimal format. Consider these angles:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Human Vision / Debugging:</strong> Developers or technical users
            inspecting data for development or troubleshooting. They need
            readability, clarity, potentially pretty-printed JSON with
            indentation, sorted keys, and perhaps inclusion of all fields for
            completeness.
          </li>
          <li>
            <strong>Automated System Vision / Processing:</strong> Backend services,
            scripts, or APIs consuming data programmatically. They prioritize
            efficiency, predictable structure, minimal data (only necessary
            fields), compact formatting (no unnecessary whitespace), and potentially
            specific data types or field names required by their parsers.
          </li>
          <li>
            <strong>UI Vision / Presentation:</strong> Frontend applications
            (web, mobile) displaying data to end-users. The JSON might need to
            be structured to match UI components, include metadata for
            rendering (like data types, display labels), or even be simplified
            / pre-processed to reduce client-side logic.
          </li>
          <li>
            <strong>Accessibility Vision:</strong> Users interacting with UIs via
            assistive technologies (screen readers, magnifiers). While accessibility
            primarily concerns the UI layer, providing JSON with clearer data types,
            consistent structures, or even including simplified summaries could
            potentially aid the accessibility implementation.
          </li>
          <li>
            <strong>Performance/Bandwidth Vision:</strong> Consumers on limited
            bandwidth or devices with low processing power. They require the
            most compact format possible, potentially omitting nulls, empty
            arrays/objects, or default values.
          </li>
        </ul>
        <p>
          Each "vision" implies different requirements for the JSON structure,
          verbosity, and formatting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList className="w-6 h-6" /> Common Adaptation Strategies
        </h2>
        <p>
          To cater to these different capabilities, we can employ several
          strategies when generating JSON output:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Field Filtering/Selection:</strong> Include only the fields
            relevant to the specific consumer. This reduces payload size and
            avoids exposing unnecessary or sensitive data.
          </li>
          <li>
            <strong>Structure Transformation (Flattening/Nesting):</strong> Adjust
            the depth and relationships of objects and arrays. Some consumers
            might prefer a flat structure, while others need deeply nested data.
          </li>
          <li>
            <strong>Conditional Formatting:</strong> Provide pretty-printed
            (indented) JSON for human consumption and compact JSON for machine
            processing.
          </li>
          <li>
            <strong>Data Simplification/Aggregation:</strong> For certain visions
            (e.g., UI summary views, accessibility), the JSON might contain
            pre-calculated summaries or simplified representations derived from
            the raw data.
          </li>
          <li>
            <strong>Adding Metadata/Hints:</strong> Include additional fields
            or a separate metadata object within the JSON to provide context,
            data type hints, or display instructions for UI consumers.
          </li>
          <li>
            <strong>Renaming Fields:</strong> Map internal field names to names
            preferred by specific consumers.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Filter className="w-6 h-6" /> Implementing Adaptivity
        </h2>
        <p>
          Adaptive JSON formatting is typically implemented server-side or within
          an API gateway, where the system generating the JSON can determine
          the consumer's capabilities or requirements. Common approaches include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Request Parameters:</strong> Allowing the client to specify
            the desired format, fields, or level of detail via query parameters
            (e.g., <code>/api/data?view=summary</code>,{" "}
            <code>/api/data?fields=id,name,price</code>,{" "}
            <code>/api/data?format=pretty</code>).
          </li>
          <li>
            <strong>Request Headers:</strong> Using standard or custom HTTP
            headers to indicate preferences (e.g., <code>Accept</code> header
            for media type variations, or a custom header like{" "}
            <code>X-Data-View: verbose</code>).
          </li>
          <li>
            <strong>Authentication/Authorization Context:</strong> Adapting the
            format based on the authenticated user's role or the authorized
            application's profile.
          </li>
          <li>
            <strong>Content Negotiation:</strong> Using the <code>Accept</code>{" "}
            header to serve different representations, although this is more
            common for different data formats (JSON, XML) rather than JSON
            structure variations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CodeXml className="w-6 h-6" /> Code Examples (Conceptual)
        </h2>
        <p>
          Below are conceptual examples illustrating some adaptation strategies
          in a hypothetical backend TypeScript environment.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Filter className="w-5 h-5" /> Example 1: Filtering Fields Based on View Parameter
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume this is your raw data object
const productData = {
  id: "prod_123",
  name: "Wireless Mouse",
  description: "Ergonomic wireless mouse with long battery life.",
  price: 29.99,
  currency: "USD",
  stock: 150,
  supplierId: "sup_abc",
  internalCode: "WMX-987-AZ", // Internal field
  createdAt: "2023-01-15T10:00:00Z"
};

// Assume 'view' parameter comes from the request (e.g., query string)
type ProductView = "summary" | "detail" | "internal";

function formatProductJson(data: any, view: ProductView): any {
  switch (view) {
    case "summary":
      // Return a simplified view for lists or cards
      return {
        id: data.id,
        name: data.name,
        price: \`\${data.price} \${data.currency}\` // Simple transformation
      };
    case "detail":
      // Return a more detailed view for product pages
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        currency: data.currency,
        stock: data.stock
      };
    case "internal":
      // Return all fields for internal systems or debugging
      return data; // Return the raw data as is
    default:
      // Default view, maybe equivalent to 'detail' or 'summary'
      return formatProductJson(data, "detail");
  }
}

// Example Usage (conceptual):
// const requestedView = req.query.view || "detail";
// const formattedJson = formatProductJson(productData, requestedView as ProductView);
// res.status(200).json(formattedJson);
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <LayoutList className="w-5 h-5" /> Example 2: Structure Transformation (Flattening)
          </h3>
          <p>
            Converting a nested structure into a flatter one for easier table display or specific parsers.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const userDataNested = {
  id: "user_456",
  name: {
    first: "Alice",
    last: "Smith"
  },
  contact: {
    email: "alice.s@example.com",
    phone: null // Example with null
  },
  address: {
      street: "123 Main St",
      city: "Anytown",
      zip: "98765"
  }
};

function flattenUserData(data: any): any {
  return {
    id: data.id,
    firstName: data.name.first,
    lastName: data.name.last,
    email: data.contact.email,
    phone: data.contact.phone, // Keeping null, could also omit
    street: data.address.street,
    city: data.address.city,
    zip: data.address.zip
    // Could also omit address object and promote fields
  };
}

// Example Usage (conceptual):
// const flattenedJson = flattenUserData(userDataNested);
// console.log(JSON.stringify(flattenedJson, null, 2));
/*
// Output:
{
  "id": "user_456",
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.s@example.com",
  "phone": null,
  "street": "123 Main St",
  "city": "Anytown",
  "zip": "98765"
}
*/
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Palette className="w-5 h-5" /> Example 3: Adding Metadata for UI Hints
          </h3>
          <p>
            Embedding information about how data fields should be presented in a user interface.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const reportData = {
  reportId: "rpt_789",
  title: "Quarterly Sales Summary",
  period: "Q3 2023",
  totalSales: 150000.75,
  status: "Final",
  lastUpdated: "2023-10-25T14:30:00Z"
};

function addReportMetadata(data: any): any {
  return {
    data: data, // The actual data payload
    metadata: {
      reportId: { type: "string", label: "Report ID" },
      title: { type: "string", label: "Report Title" },
      period: { type: "string", label: "Reporting Period" },
      totalSales: { type: "currency", label: "Total Sales", format: "USD" },
      status: { type: "string", label: "Status", enum: ["Draft", "Review", "Final"] },
      lastUpdated: { type: "datetime", label: "Last Updated", format: "YYYY-MM-DD HH:mm" }
    },
    uiHints: {
        layout: "two-column", // Hint for UI layout
        highlightField: "status" // Hint to highlight the status field
    }
  };
}

// Example Usage (conceptual):
// const dataWithMetadata = addReportMetadata(reportData);
// console.log(JSON.stringify(dataWithMetadata, null, 2));
/*
// Output (partial):
{
  "data": {
    "reportId": "rpt_789",
    "title": "Quarterly Sales Summary",
    ...
  },
  "metadata": {
    "reportId": {
      "type": "string",
      "label": "Report ID"
    },
    ...
    "totalSales": {
      "type": "currency",
      "label": "Total Sales",
      "format": "USD"
    },
    ...
  },
  "uiHints": {
    "layout": "two-column",
    "highlightField": "status"
  }
}
*/
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <CodeXml className="w-5 h-5" /> Example 4: Conditional Pretty-Printing
          </h3>
          <p>
            Serving compact JSON by default, but pretty-printing if a specific parameter is present.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const sampleData = { name: "Test Item", values: [1, 2, 3], nested: { a: 1, b: 2 } };

// Assume 'pretty' parameter comes from the request (e.g., query string)
function serializeJson(data: any, isPretty: boolean): string {
  if (isPretty) {
    // Use 2 spaces for indentation
    return JSON.stringify(data, null, 2);
  } else {
    // Compact output (no extra whitespace)
    return JSON.stringify(data);
  }
}

// Example Usage (conceptual):
// const queryParams = req.query;
// const needsPretty = queryParams.format === 'pretty';
// const jsonOutput = serializeJson(sampleData, needsPretty);
// res.setHeader('Content-Type', 'application/json');
// res.status(200).send(jsonOutput);
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Challenges and Considerations
        </h2>
        <p>
          While adaptive formatting offers significant benefits, it's important
          to be mindful of potential challenges:
        - <strong>Complexity:</strong> Managing multiple formatting logic paths
          can increase backend complexity.
        - <strong>Consistency:</strong> Ensuring different views of the same
          data remain consistent where necessary (e.g., unique identifiers
          should be present in all relevant views).
        - <strong>Versioning:</strong> As requirements or data structures
          change, maintaining compatibility across different formatting
          views for potentially older clients is crucial.
        - <strong>Performance:</strong> Complex transformations can add
          processing overhead server-side.
        - <strong>Documentation:</strong> Clearly documenting the available
          views, parameters, and the structure of each is vital for consumers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Users className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Designing APIs and data services with different "vision capabilities"
          in mind allows for more flexible, efficient, and user-friendly
          systems. By implementing adaptive JSON formatting strategies –
          whether it's filtering fields, transforming structures, or adding
          metadata – developers can tailor data delivery to meet the specific
          needs of diverse consumers, improving performance for machines and
          readability/accessibility for humans. This requires careful design
          and clear communication of the available data representations.
        </p>
      </div>
    </>
  );
}