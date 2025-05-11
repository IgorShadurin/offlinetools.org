import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robust Error Handling Patterns in JSON Parsers | Offline Tools",
  description:
    "Learn about effective patterns and strategies for implementing robust error handling in JSON parsers to improve application resilience.",
};

export default function JsonParserErrorHandlingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Robust Error Handling Patterns in JSON Parsers
      </h1>

      <div className="space-y-6">
        <p>
          Parsing JSON data is a fundamental task in modern applications, from consuming APIs to reading
          configuration files. However, dealing with malformed, incomplete, or unexpected JSON structures
          is a common challenge. Implementing robust error handling in your JSON parsing logic is crucial for
          building resilient applications that don't crash or produce incorrect results when faced with
          imperfect data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding Common JSON Parsing Errors</h2>
        <p>
          Before diving into handling strategies, let's identify the types of errors you might encounter
          when parsing JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Types of JSON Parsing Errors:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Syntax Errors:</span> The input string is not valid JSON
              according to the specification (e.g., missing commas, mismatched quotes, invalid characters).
            </li>
            <li>
              <span className="font-medium">Structure/Schema Errors:</span> The JSON is syntactically
              valid but does not match the expected structure or data types (e.g., a field is missing, a number
              is expected but a string is received).
            </li>
            <li>
              <span className="font-medium">Semantic Errors:</span> The JSON is syntactically and
              structurally valid, but the values are outside an expected range or have unexpected meaning
              in the application context (less common for the parser itself, more for post-parsing logic).
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pattern 1: Basic Try...Catch for Syntax Errors</h2>
        <p>
          The most fundamental approach in many programming languages is to wrap the parsing operation in a
          <code>try...catch</code> block. Standard JSON parsers (like JavaScript's
          <code>JSON.parse</code>) typically throw an exception when they encounter a syntax error.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4">
          <h3 className="text-lg font-medium">Example: Handling Syntax Errors</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre>
              {`function safelyParseJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    console.log("Successfully parsed:", data);
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error.message);
    // Handle the error, e.g., return null, throw a custom error,
    // provide a default value, or show a user message.
    return null; // Or throw new Error("Invalid JSON format");
  }
}

// Example Usage:
safelyParseJson('{"name": "Alice", "age": 30}'); // Works
safelyParseJson('{"name": "Bob", age: 25}'); // Syntax error: age not quoted
safelyParseJson('{"items": ["apple", "banana",]}'); // Syntax error: trailing comma`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This pattern is essential for catching basic parsing failures but doesn't help if the JSON is
            syntactically valid but structurally incorrect.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pattern 2: Post-Parsing Validation for Structure and Types</h2>
        <p>
          Once the JSON string is successfully parsed into a data structure (like a JavaScript object or array),
          you need to validate if that structure matches your expectations. This involves checking for the
          presence of required keys, the data types of values, and potentially value constraints.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4">
          <h3 className="text-lg font-medium">Example: Basic Manual Validation</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre>
              {`function processUserData(userData) {
  // 1. Basic type check for the top level
  if (typeof userData !== 'object' || userData === null) {
    throw new Error("Invalid data format: Expected an object.");
  }

  // 2. Check for required properties and types
  if (!('name' in userData) || typeof userData.name !== 'string') {
    throw new Error("Invalid data format: Missing or invalid 'name'.");
  }

  if (!('age' in userData) || typeof userData.age !== 'number') {
    throw new Error("Invalid data format: Missing or invalid 'age'.");
  }

  // Optional: Check value constraints
  if (userData.age <= 0 || userData.age > 120) {
     throw new Error("Invalid data format: 'age' out of range.");
  }

  console.log("Validated user:", userData.name, userData.age);
  return userData;
}

function safelyParseAndProcessUser(jsonString) {
  try {
    const data = JSON.parse(jsonString); // Handles syntax errors
    return processUserData(data);       // Handles structure/type errors
  } catch (error) {
    console.error("Processing failed:", error.message);
    return null;
  }
}

// Example Usage:
safelyParseAndProcessUser('{"name": "Charlie", "age": 40}'); // Works
safelyParseAndProcessUser('{"name": "David"}'); // Structure error: Missing age
safelyParseAndProcessUser('{"name": "Eve", "age": "thirty"}'); // Type error: age is string
safelyParseAndProcessUser('{"name": "Frank", "age": -5}'); // Value constraint error`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This manual approach can become complex and error-prone for larger or more nested structures.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pattern 3: Using Schema Validation Libraries</h2>
        <p>
          For complex data structures, using a dedicated schema validation library is the most robust approach.
          These libraries allow you to define the expected structure and types using a clear schema, and they
          provide functions to validate your parsed data against that schema. Common examples include JSON Schema,
          Zod, Yup, Joi, etc.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4">
          <h3 className="text-lg font-medium">Concept: Schema Definition (Simplified)</h3>
          <p className="text-sm mb-2">
            While libraries vary, the core idea is defining the expected shape:
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre>
              {`// Conceptual Schema for User Data
const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number', minimum: 1, maximum: 120 },
    isStudent: { type: 'boolean', optional: true } // Optional field
  },
  required: ['name', 'age']
};`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-4">Concept: Validation Logic</h3>
          <p className="text-sm mb-2">
            Libraries provide functions to run validation:
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre>
              {`// Conceptual Validation Function
function validateData(data, schema) {
  // ... library validation logic ...
  if (validationFailed) {
    // Library typically provides detailed error reports
    throw new Error("Validation failed: " + validationReport);
  }
  return data; // Or library might return a parsed/transformed object
}

function safelyParseAndValidateUser(jsonString) {
  try {
    const parsedData = JSON.parse(jsonString); // Handles syntax
    const validatedData = validateData(parsedData, userSchema); // Handles structure/type/value
    console.log("Validated data using schema:", validatedData);
    return validatedData;
  } catch (error) {
    console.error("Validation error:", error.message);
    return null;
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Using libraries significantly reduces boilerplate and provides more detailed error reporting.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pattern 4: Handling Partial or Optional Data</h2>
        <p>
          Sometimes you don't need *all* data to be present and valid. Your handling might need to account for
          optional fields or provide default values if data is missing. Schema validation libraries often support
          defining optional fields and default values. Manually, this involves checking for property existence
          before accessing it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-900 my-4">
          <h3 className="text-lg font-medium">Example: Handling Optional Data (Manual)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-800 overflow-x-auto">
            <pre>
              {`function processProductData(productData) {
  if (typeof productData !== 'object' || productData === null) {
    throw new Error("Invalid product data format.");
  }

  // Required fields
  if (typeof productData.id !== 'number') throw new Error("Missing or invalid product id.");
  if (typeof productData.name !== 'string') throw new Error("Missing or invalid product name.");

  // Optional fields with default values
  const price = typeof productData.price === 'number' ? productData.price : 0; // Default to 0
  const tags = Array.isArray(productData.tags) ? productData.tags : []; // Default to empty array

  console.log(\`Product ID: \${productData.id}, Name: \${productData.name}, Price: \${price}, Tags: \${tags.join(', ')}\`);

  return {
    id: productData.id,
    name: productData.name,
    price: price,
    tags: tags
  };
}

function safelyParseAndProcessProduct(jsonString) {
  try {
    const parsedData = JSON.parse(jsonString);
    return processProductData(parsedData);
  } catch (error) {
    console.error("Product processing failed:", error.message);
    return null;
  }
}

// Example Usage:
safelyParseAndProcessProduct('{"id": 101, "name": "Laptop", "price": 1200, "tags": ["electronics", "computer"]}'); // All fields
safelyParseAndProcessProduct('{"id": 102, "name": "Book"}'); // Missing optional fields`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Using operators like <code>??</code> (nullish coalescing) or checking <code>typeof</code>
            and <code>Array.isArray</code> are common techniques for handling optional data manually.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Robust Handling</h2>
        <p>Combine these patterns and consider the following practices:</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Never trust external data:</strong> Always assume JSON received from external sources (APIs, user input, files) can be malformed or incomplete.</li>
          <li><strong>Combine Syntax Handling and Validation:</strong> Use <code>try...catch</code> for the initial parse and then validate the resulting object/array.</li>
          <li><strong>Use Schema Validation for Complexity:</strong> For non-trivial data structures, invest in a schema validation library.</li>
          <li><strong>Provide Clear Error Messages:</strong> When an error occurs, log detailed technical information (e.g., validation reports) but provide simple, actionable feedback to the user or calling code.</li>
          <li><strong>Define a Failure Strategy:</strong> Decide how your application should behave when parsing fails – should it use default data, skip the data, log the error and continue, or halt execution?</li>
          <li><strong>Test with Invalid Data:</strong> Actively test your parsing and validation logic with various forms of invalid or unexpected JSON.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Key Takeaway:</h3>
          <p className="mt-2">
            Robust JSON parsing isn't just about calling <code>JSON.parse</code>. It's about anticipating
            potential issues with the input data's syntax and structure, and implementing layers of defense
            (<code>try...catch</code>, manual checks, or schema validation) to handle these issues gracefully.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Effective error handling in JSON parsing is a critical aspect of building reliable software. By
          understanding the types of errors that can occur and applying patterns like <code>try...catch</code>
          for syntax, and validation (manual or schema-based) for structure and type, you can significantly
          enhance your application's ability to process potentially faulty JSON data without compromising
          stability or correctness. Always prioritize validation, especially for data from external sources,
          and provide clear feedback when errors occur.
        </p>
      </div>
    </>
  );
}
