import type { Metadata } from "next";
import React from "react";
import { AlertTriangle, Code, CheckCircle, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "TypeScript Type Safety in JSON Formatting | Your App", // Customize title
  description: "Learn how to handle JSON data safely in TypeScript applications using type definitions and runtime validation.",
};

export default function TypeScriptJsonSafetyPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        TypeScript Type Safety in JSON Formatting
      </h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-500" /> The Challenge: Bridging Dynamic JSON and Static TypeScript
        </h2>
        <p>
          JSON (JavaScript Object Notation) is a common data interchange format used extensively in web development, particularly when communicating with APIs. It's flexible and language-agnostic, but fundamentally <strong>untyped</strong>. Data retrieved from a JSON source could potentially be anything.
        </p>
        <p>
          TypeScript, on the other hand, is a <strong>statically typed</strong> language. It requires you to define the shape and type of your data structures at compile time, offering significant benefits like early error detection, improved code readability, and better tooling support.
        </p>
        <p>
          The challenge arises when you need to consume dynamic, untyped JSON data within your statically typed TypeScript application. Simply parsing JSON and hoping it matches an expected type can lead to runtime errors that TypeScript cannot catch during development.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" /> The Problem with `JSON.parse` and Type Assertions
        </h2>
        <p>
          The standard JavaScript function to parse a JSON string is `JSON.parse()`. In TypeScript, `JSON.parse()` by default returns a value of type `any`. While you can immediately assert or cast this `any` value to your desired type using `as`, this only tells the TypeScript compiler to *trust* you about the shape of the data; it provides no actual runtime guarantee.
        </p>
        <p>
          Consider this example:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">Unsafe Parsing with Type Assertion:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const jsonString = \`
{
  "id": 123,
  "username": "alice", // <-- Note: "username" instead of "name"
  "isActive": "true"   // <-- Note: "true" as string instead of boolean
}\`;

// This tells TypeScript the result is a User, but doesn't check at runtime
const unsafeUser = JSON.parse(jsonString) as User;

// TypeScript thinks this is safe...
console.log(unsafeUser.id); // Output: 123 (Correct)
console.log(unsafeUser.name); // Output: undefined (Runtime Error potential if accessed later!)
console.log(unsafeUser.isActive); // Output: "true" (Runtime Error potential if boolean logic is applied!)

// At runtime, unsafeUser might look like:
// { id: 123, username: "alice", isActive: "true" }
// Accessing unsafeUser.name would yield undefined.
// Using unsafeUser.isActive in an if statement or strict boolean context would fail.
`}
          </pre>
        </div>
        <p>
          In this scenario, TypeScript compiled successfully because you asserted the type. However, at runtime, accessing `unsafeUser.name` would result in `undefined`, and using `unsafeUser.isActive` as a boolean would likely cause unexpected behavior or errors, because the actual data structure did not match the `User` interface definition.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> The Solution: Runtime Validation
        </h2>
        <p>
          To truly achieve type safety when dealing with JSON, you need to perform checks at runtime to ensure the parsed data conforms to the expected structure and types defined by your TypeScript interfaces. Only after successful validation can you safely treat the data as your defined type.
        </p>
        <p>
          This process typically involves:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Parse the JSON string using `JSON.parse()`. The result is initially treated as `any` (or `unknown` for stricter safety).</li>
          <li>Validate the structure and types of the parsed data against your expected interface.</li>
          <li>If validation passes, you can now safely use the data, potentially casting it to your desired type.</li>
          <li>If validation fails, handle the error appropriately (e.g., log, return default data, throw an exception).</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-500" /> Approach 1: Manual Type Guards
        </h2>
        <p>
          A fundamental TypeScript pattern for runtime checks is the <strong>type guard</strong>. A type guard is a function that returns a boolean and has a return type predicate (e.g., `data is MyType`). When TypeScript sees a type guard function return `true` within a conditional block, it narrows the type of the variable being checked within that block.
        </p>
        <p>
          You can write manual type guard functions to check the structure and types of your parsed JSON data step-by-step.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">Manual Type Guard Example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`interface User {
  id: number;
  name: string;
  isActive: boolean;
}

// A type guard function to check if data conforms to the User interface
function isUser(data: any): data is User {
  // First, check if data is an object and not null
  if (typeof data !== 'object' || data === null) {
    console.error("Validation failed: data is not an object");
    return false;
  }

  // Check if required properties exist and have the correct primitive types
  if (typeof data.id !== 'number') {
    console.error("Validation failed: data.id is not a number");
    return false;
  }
  if (typeof data.name !== 'string') {
    console.error("Validation failed: data.name is not a string");
    return false;
  }
  if (typeof data.isActive !== 'boolean') {
    console.error("Validation failed: data.isActive is not a boolean");
    return false;
  }

  // If all checks pass, it's likely a User
  return true;
}

const jsonStringValid = \`
{
  "id": 456,
  "name": "Bob",
  "isActive": true
}\`;

const jsonStringInvalid = \`
{
  "id": "789", // Wrong type
  "name": null, // Wrong type
  "status": "active" // Wrong property name
}\`;

const parsedValid: unknown = JSON.parse(jsonStringValid);
const parsedInvalid: unknown = JSON.parse(jsonStringInvalid);

// Use the type guard in conditional logic
if (isUser(parsedValid)) {
  // Inside this block, parsedValid is narrowed to type User
  console.log("Valid User Data:", parsedValid.id, parsedValid.name, parsedValid.isActive);
  // Now it's safe to access parsedValid.id, parsedValid.name, etc.
} else {
  console.error("Parsed data is NOT a valid User!");
}

if (isUser(parsedInvalid)) {
  // This block will not be entered
  console.log("Valid User Data (should not happen):", parsedInvalid);
} else {
  // Inside this block, parsedInvalid remains 'unknown'
  console.error("Parsed data is NOT a valid User!"); // This will print
  // Cannot safely access parsedInvalid.id here without another check or cast
}
`}
          </pre>
        </div>
        <p>
          Manual type guards are excellent for simple data structures or when you want full control without external dependencies. For complex or deeply nested JSON structures, however, writing and maintaining these manual checks can become verbose and error-prone.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-500" /> Approach 2: Using Validation Libraries (Conceptual)
        </h2>
        <p>
          To handle more complex validation scenarios efficiently, developers often turn to dedicated runtime validation libraries. These libraries allow you to define validation schemas (often mirroring your TypeScript types) and then use these schemas to check parsed JSON data.
        </p>
        <p>
          Examples of such libraries in the TypeScript ecosystem include Zod, Yup, io-ts, Superstruct, etc. While we cannot use or demonstrate their specific code here due to the constraints, it's important to understand their role.
        </p>
        <p>
          The general pattern looks something like this (conceptual code, not using a real library):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">Conceptual Library Validation Pattern:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`interface Product {
  id: string;
  name: string;
  price: number;
  tags?: string[]; // Optional array of strings
}

// Imagine a validation schema defined using a library's API
// This schema mirrors the Product interface
const ProductSchema = conceptualValidationLibrary.object({
  id: conceptualValidationLibrary.string(),
  name: conceptualValidationLibrary.string(),
  price: conceptualValidationLibrary.number(),
  tags: conceptualValidationLibrary.optional(conceptualValidationLibrary.array(conceptualValidationLibrary.string()))
});

const jsonProductString = \`{"id": "abc", "name": "Gadget", "price": 99.99, "tags": ["electronic", "new"]}\`;
const jsonInvalidProductString = \`{"id": "def", "name": 123, "price": "free"}\`; // Invalid data

const parsedProduct: unknown = JSON.parse(jsonProductString);
const parsedInvalidProduct: unknown = JSON.parse(jsonInvalidProductString);

// Use the schema to validate the parsed data
// The library handles the detailed checks
const validationResult1 = ProductSchema.safeParse(parsedProduct);
const validationResult2 = ProductSchema.safeParse(parsedInvalidProduct);

if (validationResult1.success) {
  // If successful, the validated data is guaranteed to match the schema/interface
  const product: Product = validationResult1.data; // 'data' is now typed as Product
  console.log("Validated Product:", product.id, product.name, product.price);
} else {
  // If validation fails, the result contains detailed error information
  console.error("Validation Failed:", validationResult1.error);
}

if (validationResult2.success) {
   // This block will not be entered
   const product: Product = validationResult2.data;
   console.log("Validated Product (should not happen):", product);
} else {
   // The error object explains why it failed (name should be string, price number)
   console.error("Validation Failed:", validationResult2.error); // This will print validation errors
}

// The key takeaway: Validation libraries automate the detailed checks
// you would otherwise write manually in a type guard function.
`}
          </pre>
        </div>
        <p>
          Validation libraries are powerful tools for ensuring data integrity when consuming external JSON. They provide a structured and often more concise way to define and apply complex validation rules compared to writing manual type guards for every interface.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-500" /> Formatting JSON: `JSON.stringify` and Type Safety
        </h2>
        <p>
          On the flip side, generating a JSON string from a TypeScript object using `JSON.stringify()` is generally safer from a type perspective, provided the object you are stringifying already conforms to your desired structure.
        </p>
        <p>
          If you have a TypeScript object that is correctly typed according to an interface, `JSON.stringify` will convert it into a JSON string. The type safety here comes from the fact that you are starting with data that TypeScript already knows the shape of.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">Using `JSON.stringify` with Typed Data:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`interface Config {
  apiKey: string;
  retryCount: number;
  enabled: boolean;
}

// Create an object that conforms to the Config interface
const appConfig: Config = {
  apiKey: "abcdef12345",
  retryCount: 3,
  enabled: true,
};

// TypeScript ensures appConfig has the correct structure and types
// JSON.stringify will produce a string reflecting this structure
const configJsonString = JSON.stringify(appConfig, null, 2); // null, 2 for pretty printing

console.log("Generated JSON string:");
console.log(configJsonString);
/*
Output:
{
  "apiKey": "abcdef12345",
  "retryCount": 3,
  "enabled": true
}
*/

// If you accidentally create an object that doesn't match the type...
// TypeScript will catch this error *before* you even stringify it.
/*
const invalidConfig: Config = {
  apiKey: 123, // Type error!
  retryCount: "five", // Type error!
  enabled: "yes" // Type error!
};
// The line above would cause a TypeScript compilation error, preventing runtime issues.
*/
`}
          </pre>
        </div>
        <p>
          The primary risk when using `JSON.stringify` comes if you are starting with `any` or `unknown` data that doesn't actually match the structure you expect, or if you are stringifying complex objects with circular references or non-standard types (like functions or class instances, which `JSON.stringify` handles in specific ways or omits). But when stringifying objects derived from well-defined TypeScript types, it's a safe operation regarding the basic data structure and primitive types.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> Best Practices for JSON Type Safety
        </h2>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Define Interfaces/Types:</strong> Always define TypeScript interfaces or types for the expected shape of your JSON data. This is the foundation of type safety.
          </li>
          <li>
            <strong>Avoid Blind Casting (`as Type`):</strong> Never cast the result of `JSON.parse()` directly to your expected type without runtime validation. Use `unknown` as an intermediate type if necessary, as it requires checks before you can use the data.
          </li>
          <li>
            <strong>Implement Runtime Validation:</strong> Choose an approach for runtime validation (manual type guards or a validation library) and apply it consistently whenever you parse external or untrusted JSON data.
          </li>
          <li>
            <strong>Use Type Guards for Narrowing:</strong> If writing manual validation, leverage TypeScript's type guard functions (`variable is MyType`) to inform the compiler about the validated type within conditional blocks.
          </li>
          <li>
            <strong>Handle Validation Errors:</strong> Design how your application will react if JSON validation fails. This might involve logging the error, showing a user message, returning a default value, or throwing a specific error.
          </li>
          <li>
            <strong>Consider `unknown` over `any`:</strong> When dealing with data of uncertain origin (like parsed JSON before validation), using `unknown` is safer than `any` because it forces you to perform type checks or assertions before you can access properties or call methods on the variable.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-500" /> Combining Approaches: Type Definitions and Validation
        </h2>
        <p>
          The most robust approach involves defining your types/interfaces <strong>once</strong> and using a validation mechanism that can either derive validation logic from those types or be easily kept in sync with them. Some advanced validation libraries (like Zod or io-ts) allow you to define the validation schema first, and then *derive* the TypeScript type from the schema, guaranteeing they are always aligned.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
          Conclusion
        </h2>
        <p>
          Working with JSON in a TypeScript environment requires more than just defining interfaces. While interfaces provide compile-time type checking for data you control, consuming external JSON mandates runtime validation to bridge the gap between dynamic data and static types. By implementing robust validation checks using manual type guards or dedicated libraries, you can ensure the data you work with at runtime truly matches the shape and types your TypeScript code expects, significantly reducing the risk of unexpected errors in production.
        </p>
      </section>
    </div>
  );
}