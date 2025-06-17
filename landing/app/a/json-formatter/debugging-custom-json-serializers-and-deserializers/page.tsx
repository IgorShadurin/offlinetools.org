import type { Metadata } from "next";
import {
  Bug,
  Code,
  FileText,
  CheckCheck,
  Search,
  Binary,
  Boxes,
  CircleAlert,
  Wrench,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging Custom JSON Serializers and Deserializers | Your Site Name",
  description:
    "A comprehensive guide to identifying and fixing common issues when implementing custom JSON serialization and deserialization logic in TypeScript.",
};

export default function DebuggingJsonArticle() {
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3" size={36} /> Debugging Custom JSON Serializers and Deserializers
      </h1>

      <section className="space-y-6">
        <p>
          Working with JSON is fundamental in modern web development, especially when building APIs or storing
          structured data. While the built-in <code>JSON.stringify</code> and <code>JSON.parse</code> methods handle
          most basic cases, you often encounter scenarios requiring custom logic. This might involve serializing complex
          objects with methods, handling specific data types like <code>Date</code> or <code>BigInt</code>, dealing with
          circular references, or implementing specific data formats.
        </p>
        <p>
          Implementing custom serialization (converting an object to a JSON string) and deserialization (converting a
          JSON string back to an object) can introduce subtle bugs. This article explores common issues and effective
          strategies for debugging them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Binary className="mr-2" size={24} /> Why Custom Logic?
        </h2>
        <p>You might need custom JSON handling for reasons like:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Serializing instances of custom classes (methods are lost by default).</li>
          <li>
            Handling data types not natively supported by JSON (e.g., <code>Date</code>, <code>Set</code>,{" "}
            <code>Map</code>, <code>BigInt</code>).
          </li>
          <li>Controlling which properties are included or excluded.</li>
          <li>Formatting output (indentation, sorting keys).</li>
          <li>Implementing specific data format versions or transformations.</li>
          <li>Preventing circular reference errors.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CircleAlert className="mr-2" size={24} /> Common Serialization Debugging Challenges
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <FileText className="mr-2 inline-block" size={20} /> 1. Data Type Mismatches &amp; Loss
        </h3>
        <p>
          By default, <code>JSON.stringify</code> transforms certain types:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>Date</code> objects become ISO 8601 strings.
          </li>
          <li>
            <code>Set</code> and <code>Map</code> become empty objects &#x7b;&#x7d;.
          </li>
          <li>
            <code>BigInt</code> throws a <code>TypeError</code>.
          </li>
          <li>
            <code>undefined</code>, functions, and Symbols in objects are omitted.
          </li>
          <li>
            <code>undefined</code>, functions, and Symbols in arrays become <code>null</code>.
          </li>
        </ul>
        <p>
          If your custom logic doesn't handle these transformations explicitly, you might lose data or encounter
          unexpected formats.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: BigInt Error</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const data = {
  id: 1n, // BigInt
  name: "Example"
};

try {
  // This will throw a TypeError
  JSON.stringify(data);
} catch (error: any) {
  console.error("Serialization error:", error.message);
  // Output: Serialization error: Do not know how to serialize a BigInt
}

// Custom serialization needed for BigInt
const customData = {
  id: 1n,
  value: 123,
};

const customJsonString = JSON.stringify(customData, (key, value) => {
  if (typeof value === 'bigint') {
    // Convert BigInt to string (or number if within safe range)
    return value.toString();
  }
  return value; // Return everything else unchanged
});

console.log(customJsonString);
// Output: {"id":"1","value":123}
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> Use <code>console.log</code> on the object *before* serialization and inspect
          the resulting JSON string. Pay close attention to the types and presence of properties.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Boxes className="mr-2 inline-block" size={20} /> 2. Circular References
        </h3>
        <p>
          If an object contains a reference back to itself, directly or indirectly, <code>JSON.stringify</code> will
          throw a <code>TypeError</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Circular Reference Error</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const parent: any = { name: "Parent" };
const child: any = { name: "Child", parent: parent };
parent.child = child; // Create circular reference

try {
  // This will throw a TypeError
  JSON.stringify(parent);
} catch (error: any) {
  console.error("Serialization error:", error.message);
  // Output: Serialization error: Converting circular structure to JSON...
}

// Custom serialization needed to handle circular references
const visited = new Set(); // Keep track of visited objects

const safeJsonString = JSON.stringify(parent, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (visited.has(value)) {
      // Circular reference found, discard it
      return; // Return undefined to omit the property
    }
    // Otherwise, add to the set and continue traversal
    visited.add(value);
  }
  return value;
});

console.log(safeJsonString);
// Output might vary slightly but will omit the circular part: {"name":"Parent","child":{"name":"Child"}}
// Note: The 'parent' property on 'child' is dropped because 'parent' was already visited.
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> The error message "Converting circular structure to JSON" is a dead giveaway.
          Analyze your object graph to find the loop. Logging object structures can help visualize relationships.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="mr-2 inline-block" size={20} /> 3. Handling <code>undefined</code> vs <code>null</code>
        </h3>
        <p>
          <code>JSON.stringify</code> treats <code>undefined</code> and <code>null</code> differently depending on
          whether they are object properties or array elements.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Undefined/Null Differences</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const data = {
  prop1: "hello",
  prop2: undefined, // Will be omitted
  prop3: null       // Will be included as null
};

const arrayData = ["item1", undefined, null, "item2"]; // undefined becomes null

console.log("Object:", JSON.stringify(data));
// Output: {"prop1":"hello","prop3":null}

console.log("Array:", JSON.stringify(arrayData));
// Output: ["item1",null,null,"item2"]
            `}
            </code>
          </pre>
        </div>
        <p>
          If your deserialization logic expects a specific structure (e.g., a field to be present even if its value is
          "empty"), the omission of <code>undefined</code> properties can cause issues. Custom logic using a replacer
          function might be needed to explicitly include or transform <code>undefined</code> values if required.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CircleAlert className="mr-2" size={24} /> Common Deserialization Debugging Challenges
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <FileText className="mr-2 inline-block" size={20} /> 1. Missing or Unexpected Fields/Types
        </h3>
        <p>
          When deserializing JSON, the input might not match the expected structure or data types. This is especially
          common when dealing with external APIs or evolving data schemas.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A required field might be missing.</li>
          <li>A field might have an unexpected data type (e.g., a string instead of a number).</li>
          <li>Extra, unexpected fields might be present.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Handling Unexpected Input</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
interface ExpectedData {
  id: number;
  name: string;
  createdAt: Date;
}

const jsonStringGood = '{"id": 123, "name": "Test", "createdAt": "2023-10-27T10:00:00.000Z"}';
const jsonStringBadMissing = '{"id": 456, "createdAt": "2023-10-27T10:00:00.000Z"}'; // missing name
const jsonStringBadType = '{"id": "789", "name": "Another", "createdAt": "2023-10-27T10:00:00.000Z"}'; // id is string

// Basic parse - doesn't validate or convert Date
const parsedGood = JSON.parse(jsonStringGood);
console.log("Parsed Good (no Date conversion):", parsedGood);
console.log("Parsed Good Type of createdAt:", typeof parsedGood.createdAt); // string

try {
  // Missing field - accessing name will be 'undefined' but no parse error
  const parsedBadMissing: ExpectedData = JSON.parse(jsonStringBadMissing);
  console.log("Parsed Bad Missing (no error):", parsedBadMissing);
  console.log("Accessing missing name:", parsedBadMissing.name); // undefined
} catch (error: any) {
   console.error("This won't catch missing fields directly:", error.message);
}

try {
  // Wrong type - accessing id will be a string, no parse error
  const parsedBadType: ExpectedData = JSON.parse(jsonStringBadType);
   console.log("Parsed Bad Type (no error):", parsedBadType);
  console.log("Accessing wrong type id:", parsedBadType.id); // "789" (string)
} catch (error: any) {
   console.error("This won't catch type mismatches directly:", error.message);
}

// Using a reviver to handle Date and check types (basic)
const parsedWithReviver: ExpectedData = JSON.parse(jsonStringGood, (key, value) => {
  if (key === 'createdAt' && typeof value === 'string') {
    const date = new Date(value);
    // Basic check if it's a valid date
    if (!isNaN(date.getTime())) {
        return date;
    }
  }
  // More robust checks would be needed for other types/missing fields
  return value;
});

console.log("Parsed with Reviver (Date converted):", parsedWithReviver);
console.log("Parsed with Reviver Type of createdAt:", typeof parsedWithReviver.createdAt); // object (Date)
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> Check the structure and types of the incoming JSON string carefully. Use
          logging after <code>JSON.parse</code> to see the resulting object's structure and values. Schema validation
          libraries are highly recommended for robust deserialization.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="mr-2 inline-block" size={20} /> 2. Security (Prototype Pollution)
        </h3>
        <p>
          Directly deserializing untrusted user input into object structures without validation can be a security risk,
          particularly related to prototype pollution attacks. If your custom deserialization logic (or a library you
          use) isn't careful, an attacker could inject properties like <code>__proto__</code> or{" "}
          <code>constructor.prototype</code> to modify the prototype of core JavaScript objects, potentially leading to
          arbitrary code execution or denial-of-service.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Example: Prototype Pollution Risk</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
// !!! WARNING: This is a simplified example of the *vulnerability pattern*
// Do NOT use simple recursive assignment for deserialization from untrusted sources.
function unsafeAssign(obj: any, path: string[], value: any) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}

// Attacker controlled input might look like this:
// { "__proto__": { "isAdmin": true } }
// Or if using a library that processes dotted paths:
// { "constructor.prototype.isAdmin": true }

// If a function like unsafeAssign is used recursively to build an object
// from untrusted JSON without sanitization, it could potentially set
// 'isAdmin' on Object.prototype, affecting ALL objects.
// Example JSON payload (conceptual): { "user": { "__proto__": { "isAdmin": true } } }

/*
// Example of potential exploit if vulnerable assignment is used after parse:
const maliciousJson = \`{"__proto__": {"isAdmin": true}}\`;
const parsed = JSON.parse(maliciousJson);

// If parsed object is then processed by vulnerable assignment logic:
// unsafeAssign({}, Object.keys(parsed)[0].split('.'), Object.values(parsed)[0]); // Conceptual

// Now, any object might inherit isAdmin = true:
// const user = {};
// console.log(user.isAdmin); // Could output 'true' if prototype is polluted
*/

// Safe deserialization requires careful handling:
// - Avoid recursive merging/assignment logic if not explicitly sanitizing keys.
// - Use libraries specifically designed for safe data transformation (e.g., deepmerge with options to prevent __proto__).
// - Validate schema *before* using the data.
// - Sanitize input keys (e.g., disallow keys like __proto__).
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> Always treat external JSON as untrusted. If you are implementing custom
          deserialization logic (beyond a simple <code>JSON.parse</code> with a reviver), be extremely cautious about
          how keys and values are assigned, especially in nested structures. Rely on established, security-audited
          libraries for complex transformations from untrusted sources.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="mr-2 inline-block" size={20} /> 3. Versioning and Backward Compatibility
        </h3>
        <p>
          Over time, your data structure might change. Older JSON strings might not conform to the latest object
          structure expected by your code. Deserialization logic needs to handle these variations gracefully.
        </p>
        <p>
          <strong>Debugging Tip:</strong> Test your deserialization logic with various versions of your JSON schema.
          Implement conditional logic in your reviver or post-processing steps to handle older formats (e.g., providing
          default values for missing fields, converting deprecated field names).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-2" size={24} /> Effective Debugging Strategies
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="mr-2 inline-block" size={20} /> 1. Liberal Logging
        </h3>
        <p>
          Log the input object before serialization and the resulting string. Log the input string before
          deserialization and the resulting object. This helps pinpoint where the data transformation goes wrong. Inside
          custom replacer or reviver functions, log the <code>key</code> and <code>value</code> being processed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Logging in Reviver</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const jsonString = '{"id": 123, "date": "2023-10-27T10:00:00.000Z", "value": 456}';

JSON.parse(jsonString, (key, value) => {
  console.log(\`Processing key: "\${key}", value: \`, value);
  // Add your custom logic here
  if (key === 'date' && typeof value === 'string') {
      console.log("Converting date string...");
      return new Date(value);
  }
  return value;
});

/*
Expected console output:
Processing key: "", value: { id: 123, date: '2023-10-27T10:00:00.000Z', value: 456 } // Initial call with root object
Processing key: "id", value: 123
Processing key: "date", value: 2023-10-27T10:00:00.000Z
Converting date string...
Processing key: "value", value: 456
*/
            `}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="mr-2 inline-block" size={20} /> 2. Leverage <code>JSON.stringify</code> Options
        </h3>
        <p>
          The <code>replacer</code> argument (a function or array of strings/numbers) allows you to control which
          properties are included and how their values are transformed during serialization. The <code>space</code>{" "}
          argument (a string or number) helps format the output for readability, making it easier to inspect.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Replacer and Space</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const complexData = {
  id: 123,
  name: "Complex Item",
  details: { price: 99.99, stock: 50 },
  privateInfo: "secret", // Want to omit
  createdAt: new Date(),
  items: [ { code: "A" }, { code: "B" } ]
};

// Using a replacer function
const serializedWithReplacer = JSON.stringify(complexData, (key, value) => {
  if (key === 'privateInfo') {
    return; // Omit this property
  }
  if (value instanceof Date) {
    return value.toISOString(); // Explicitly format Date
  }
  return value;
}, 2); // Use 2 spaces for indentation

console.log(serializedWithReplacer);
/*
Expected output (approximately):
{
  "id": 123,
  "name": "Complex Item",
  "details": {
    "price": 99.99,
    "stock": 50
  },
  "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ", // ISO string
  "items": [
    {
      "code": "A"
    },
    {
      "code": "B"
    }
  ]
}
*/

// Using an array replacer to only include specific keys
const serializedWithKeyArray = JSON.stringify(complexData, ['id', 'name', 'items'], 2);

console.log(serializedWithKeyArray);
/*
Expected output:
{
  "id": 123,
  "name": "Complex Item",
  "items": [
    {
      "code": "A"
    },
    {
      "code": "B"
    }
  ]
}
*/
            `}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Wrench className="mr-2 inline-block" size={20} /> 3. Leverage <code>JSON.parse</code> Reviver
        </h3>
        <p>
          The <code>reviver</code> function passed to <code>JSON.parse</code> is called for every key-value pair in the
          parsed object (starting from the innermost nested levels and working outwards), including the root object
          itself. This is the primary mechanism for performing custom transformations during deserialization, such as
          converting date strings back to <code>Date</code> objects.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Reviver for Date Conversion</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
const jsonString = '{"name": "Event", "eventDate": "2024-01-15T09:30:00.000Z", "details": {"reportedAt": "2024-01-14T20:00:00.000Z"}}';

const parsedObject = JSON.parse(jsonString, (key, value) => {
  // Check if the value is a string and looks like an ISO date string
  if (typeof value === 'string') {
    const dateMatch = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$/.exec(value);
    if (dateMatch) {
      const date = new Date(value);
      // Optional: check if the date is valid
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  }
  return value; // Return the value unchanged if not a date string
});

console.log("Parsed object:", parsedObject);
console.log("Type of eventDate:", typeof parsedObject.eventDate); // object (Date)
console.log("Type of details.reportedAt:", typeof parsedObject.details.reportedAt); // object (Date)
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> Use the reviver to intercept values. Log the <code>key</code> and{" "}
          <code>value</code> to understand the parsing flow. If a value isn't converting as expected, check its type and
          format within the reviver function.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <CheckCheck className="mr-2 inline-block" size={20} /> 4. Schema Validation
        </h3>
        <p>
          For robust applications, especially when dealing with external data, validate the structure and types of the
          parsed JSON against a predefined schema. Libraries like Zod, Yup, or Joi provide powerful and expressive ways
          to define schemas and validate data. They offer clear error reporting when validation fails.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Example: Zod Validation</h4>
          <pre className="text-sm bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`
// import { z } from 'zod'; // Requires zod library

/*
// Define your expected schema
const DataSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string().datetime().transform((str) => new Date(str)), // Validate and transform
  optionalField: z.string().optional().nullable(), // Handle optional/nullable
});

const jsonStringGood = '{"id": 123, "name": "Test", "createdAt": "2023-10-27T10:00:00.000Z", "optionalField": null}';
const jsonStringBadMissing = '{"id": 456, "createdAt": "2023-10-27T10:00:00.000Z"}'; // missing name
const jsonStringBadType = '{"id": "789", "name": "Another", "createdAt": "2023-10-27T10:00:00.000Z"}'; // id is string

try {
  const parsed = JSON.parse(jsonStringGood);
  const validatedData = DataSchema.parse(parsed); // Validate and transform
  console.log("Validated good data:", validatedData);
  console.log("Type of validatedData.createdAt:", typeof validatedData.createdAt); // object (Date)
} catch (error: any) {
  console.error("Validation error (good data unexpected):", error.message); // Should not happen for good data
}

try {
  const parsed = JSON.parse(jsonStringBadMissing);
  const validatedData = DataSchema.parse(parsed); // Will throw ZodError
  console.log("Validated bad data (missing):", validatedData);
} catch (error: any) {
  console.error("Validation error (missing field):", error.errors); // Zod provides detailed errors
}

try {
  const parsed = JSON.parse(jsonStringBadType);
  const validatedData = DataSchema.parse(parsed); // Will throw ZodError
   console.log("Validated bad data (type):", validatedData);
} catch (error: any) {
  console.error("Validation error (wrong type):", error.errors); // Zod provides detailed errors
}
*/
// Note: Actual Zod/Yup usage requires installation. This is conceptual.
            `}
            </code>
          </pre>
        </div>
        <p>
          <strong>Debugging Tip:</strong> Implement schema validation early in your deserialization pipeline. The
          detailed error messages from validation libraries are invaluable for identifying exactly what part of the
          input JSON doesn't match the expected structure or type.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <ClipboardCheck className="mr-2 inline-block" size={20} /> 5. Write Unit Tests
        </h3>
        <p>
          Write tests for your serialization and deserialization functions with various inputs: typical data, edge cases
          (empty arrays/objects, null values), incorrect data types, missing fields, circular references (if you handle
          them), and old versions of your data structure. Automated tests catch regressions as your code evolves.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Bug className="mr-2 inline-block" size={20} /> 6. Step-Through Debugging
        </h3>
        <p>
          Use your IDE's debugger to step through your custom serialization or deserialization logic (especially within
          replacer or reviver functions). This allows you to inspect the state of variables, the value of{" "}
          <code>key</code> and <code>value</code> at each step, and the execution flow.
        </p>
      </section>

      <section className="space-y-6 mt-8">
        <h2 className="text-2xl font-semibold flex items-center">
          <FileText className="mr-2" size={24} /> Conclusion
        </h2>
        <p>
          Debugging custom JSON serializers and deserializers often boils down to carefully inspecting the data at
          different stages of the conversion process. Understanding how <code>JSON.stringify</code> and{" "}
          <code>JSON.parse</code> handle different data types by default is crucial. Leveraging the{" "}
          <code>replacer</code> and <code>reviver</code> functions, coupled with liberal logging, step-through
          debugging, and robust schema validation, provides a powerful toolkit for identifying and resolving issues,
          ensuring your data is correctly transformed and your application remains secure and reliable.
        </p>
      </section>
    </article>
  );
}
