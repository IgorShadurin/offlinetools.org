import type { Metadata } from "next";
import { Cloud, Server, Code, Zap, MemoryStick, Filter, LayoutGrid, CheckCircle, AlertTriangle, FileJson, Settings2 } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters in Serverless Computing Environments | Backend Dev",
  description: "Explore techniques and considerations for formatting and processing JSON data efficiently within serverless functions.",
};

export default function ServerlessJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson size={36} />
        <span>JSON Formatters in Serverless Computing</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Processing and transforming data is a core task in many applications, and JSON is the de facto standard for data interchange, especially in web APIs.
            In the world of serverless computing (like AWS Lambda, Azure Functions, Google Cloud Functions), where functions are ephemeral, stateless, and triggered by events,
            efficiently handling JSON data becomes crucial. This page explores why JSON formatting is important in serverless contexts and how to approach it effectively.
          </p>
          <div className="flex items-start space-x-4 bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-800 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-200">
            <Settings2 size={24} className="flex-shrink-0" />
            <p className="flex-grow">
              <strong>What do we mean by &apos;Formatting JSON&apos;?</strong> It&apos;s not just about pretty-printing! In this context, it refers to reading existing JSON data,
              potentially modifying or restructuring it, filtering fields, adding new ones, validating, and then outputting new JSON. This is a common task in API Gateways, data pipelines,
              and event handlers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2"><Cloud size={28} /> <span>Why Serverless? Why care about JSON?</span></h2>
          <p className="mb-4">
            Serverless environments offer fantastic benefits:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Scalability:</strong> Functions scale automatically based on demand.</span></li>
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Cost-Efficiency:</strong> You pay only for the compute time used.</span></li>
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Reduced Operational Overhead:</strong> No servers to manage.</span></li>
          </ul>
          <p className="mb-4">
            However, they also introduce unique considerations, especially when processing data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start"><AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Cold Starts:</strong> The first invocation might have latency as the environment initializes. Heavy parsing/processing adds to this.</span></li>
            <li className="flex items-start"><AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Resource Limits:</strong> Functions have memory and execution time limits. Inefficient JSON handling can hit these limits.</span></li>
            <li className="flex items-start"><AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Statelessness:</strong> Each invocation is independent. State must be managed externally.</span></li>
          </ul>
          <p className="mt-4">
            JSON is the most common payload format for HTTP APIs, event messages, and data storage in modern architectures. Serverless functions frequently act as middleware,
            receiving JSON, processing it, and sending JSON responses or triggering other services with formatted JSON data. Efficient JSON handling directly impacts
            performance, cost, and reliability in this environment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2"><LayoutGrid size={28} /> <span>Common Use Cases</span></h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>API Gateway Request/Response Transformations:</strong> Modify incoming request bodies or outgoing response bodies (e.g., changing field names, flattening structures) before they reach or leave your function. While some gateways offer built-in tools (like AWS API Gateway&apos;s Velocity Templates), complex transformations are often handled within the function code itself.</span></li>
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Data Processing Pipelines:</strong> Functions triggered by database changes, file uploads (S3, Blob Storage), or message queues (SQS, Kafka) often receive JSON data that needs parsing, transformation, validation, and re-formatting before being stored or passed to the next stage.</span></li>
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Logging and Monitoring:</strong> Incoming log events or metrics might arrive as JSON, requiring parsing and re-formatting for ingestion into logging/monitoring systems.</span></li>
            <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Webhook Handlers:</strong> Receiving data from third-party services via webhooks typically involves processing JSON payloads that might have inconsistent structures or unnecessary data.</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2"><Code size={28} /> <span>Implementation Techniques (Code-Based)</span></h2>
          <p className="mb-4">
            The most common and flexible way to handle JSON formatting in serverless functions is directly within your function&apos;s code using the programming language&apos;s built-in JSON capabilities. For JavaScript/TypeScript, this means using <code>JSON.parse()</code> to convert JSON strings to JavaScript objects/arrays, and <code>JSON.stringify()</code> to convert JavaScript objects/arrays back to JSON strings.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Basic Pretty-Printing / Indentation</h3>
          <p className="mb-3">
            Making JSON human-readable is simple with <code>JSON.stringify()</code>&apos;s third argument.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example: Pretty-printing JSON</h4>
            <pre className="text-sm">
              {`// Assume 'event.body' is the incoming JSON string from an API Gateway request
// const rawJsonString = event.body;

// Example input JSON string
const rawJsonString = '{"name":"Alice","age":30,"city":"New York"}';

try {
  // Parse the incoming JSON string into a JavaScript object
  const dataObject = JSON.parse(rawJsonString);

  // Stringify the object back into a JSON string with 2-space indentation
  const prettyJsonString = JSON.stringify(dataObject, null, 2);

  console.log(prettyJsonString);
  /* Output:
  {
    "name": "Alice",
    "age": 30,
    "city": "New York"
  }
  */

  // In a serverless function, you might return this:
  // return {
  //   statusCode: 200,
  //   headers: { "Content-Type": "application/json" },
  //   body: prettyJsonString // Return the formatted string
  // };

} catch (error) {
  console.error("Failed to parse or stringify JSON:", error);
  // Handle parsing errors, maybe return a 400 status code
  // return {
  //   statusCode: 400,
  //   body: JSON.stringify({ message: "Invalid JSON format" })
  // };
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center space-x-2"><Filter size={24} /> <span>2. Selecting and Filtering Fields</span></h3>
          <p className="mb-3">
            Often you only need a subset of the data from the incoming JSON, or you need to remove sensitive fields before passing it on.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example: Filtering Fields</h4>
            <pre className="text-sm">
              {`// Assume this is the parsed JavaScript object from incoming JSON
const userData = {
  id: "user-123",
  name: "Bob Smith",
  email: "bob.smith@example.com",
  passwordHash: "...", // Sensitive field
  lastLogin: "2023-10-27T10:00:00Z",
  isActive: true
};

// Create a new object with only the desired fields
const publicProfile = {
  name: userData.name,
  lastLogin: userData.lastLogin,
  isActive: userData.isActive
  // Exclude id, email, passwordHash
};

// Convert the new object back to a JSON string
const publicProfileJson = JSON.stringify(publicProfile, null, 2);

console.log(publicProfileJson);
/* Output:
{
  "name": "Bob Smith",
  "lastLogin": "2023-10-27T10:00:00Z",
  "isActive": true
}
*/`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center space-x-2"><LayoutGrid size={24} /> <span>3. Transforming Data Structure</span></h3>
          <p className="mb-3">
            You might need to rename fields, nest data differently, combine fields, or flatten nested structures.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example: Restructuring JSON</h4>
            <pre className="text-sm">
              {`// Assume this is the parsed JavaScript object
const productData = {
  product_id: "prod-abc",
  product_name: "Gadget Pro",
  product_price_usd: 199.99,
  product_stock_count: 50,
  warehouse_location: {
    city: "Seattle",
    zip: "98101"
  }
};

// Transform into a different structure
const apiOutput = {
  id: productData.product_id, // Renaming
  name: productData.product_name, // Renaming
  price: productData.product_price_usd, // Renaming
  inventory: { // Nesting data
    stock: productData.product_stock_count,
    location: \`\${productData.warehouse_location.city}, \${productData.warehouse_location.zip}\` // Combining fields
  }
};

const apiOutputJson = JSON.stringify(apiOutput, null, 2);

console.log(apiOutputJson);
/* Output:
{
  "id": "prod-abc",
  "name": "Gadget Pro",
  "price": 199.99,
  "inventory": {
    "stock": 50,
    "location": "Seattle, 98101"
  }
}
*/`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Handling Arrays</h3>
          <p className="mb-3">
            Processing lists of JSON objects is common, often involving iterating through arrays and applying transformations to each item.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="text-lg font-medium mb-2">Example: Transforming an Array of Objects</h4>
            <pre className="text-sm">
              {`// Assume this is the parsed JavaScript array
const usersData = [
  { id: 1, first_name: "Alice", last_name: "Wonder", age: 28, public: true },
  { id: 2, first_name: "Bob", last_name: "Builder", age: 45, public: false },
  { id: 3, first_name: "Charlie", last_name: "Chaplin", age: 88, public: true },
];

// Filter for public profiles and transform each object
const publicUsers = usersData
  .filter(user => user.public) // Filter condition
  .map(user => ({ // Map to new structure
    fullName: \`\${user.first_name} \${user.last_name}\`, // Combine names
    yearsOld: user.age // Rename field
  }));

const publicUsersJson = JSON.stringify(publicUsers, null, 2);

console.log(publicUsersJson);
/* Output:
[
  {
    "fullName": "Alice Wonder",
    "yearsOld": 28
  },
  {
    "fullName": "Charlie Chaplin",
    "yearsOld": 88
  }
]
*/`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2"><AlertTriangle size={28} /> <span>Serverless Specific Considerations</span></h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="flex items-start"><Zap size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Performance & Latency:</strong> For large JSON payloads, <code>JSON.parse()</code> and <code>JSON.stringify()</code> can be CPU intensive. Design your functions to process only the necessary data. Consider streaming or partial parsing for extremely large files if the serverless environment supports it (less common for typical function triggers).</span></li>
            <li className="flex items-start"><MemoryStick size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Memory Usage:</strong> Parsing large JSON creates large in-memory objects. Ensure your function&apos;s memory allocation is sufficient, but avoid excessive memory usage to keep costs down. Inefficient data structures or holding onto unnecessary data can quickly consume memory.</span></li>
            <li className="flex items-start"><Code size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Dependencies:</strong> While this guide focuses on built-in methods, adding external JSON processing libraries increases deployment package size and cold start times. Use them judiciously only if built-in methods are insufficient.</span></li>
            <li className="flex items-start"><Server size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Error Handling:</strong> Always wrap <code>JSON.parse()</code> in a try-catch block to handle invalid incoming JSON gracefully. Provide informative error responses or logging.</span></li>
            <li className="flex items-start"><Filter size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" /> <span><strong>Input Validation:</strong> Before attempting complex transformations, validate the structure and types of the parsed data to prevent runtime errors. Libraries like Zod or Joi can be used for this, but again, consider the overhead of dependencies. Simple checks in code might suffice for less complex needs.</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
          <p>
            Efficient JSON formatting is a fundamental skill for developers working with serverless architectures. By understanding the constraints and capabilities of serverless environments and leveraging the powerful built-in JSON handling features of languages like JavaScript/TypeScript, you can build robust, cost-effective, and performant data processing workflows. Always prioritize parsing only what you need, handling errors gracefully, and being mindful of resource limits, especially for large payloads.
          </p>
        </section>
      </div>
    </>
  );
}
