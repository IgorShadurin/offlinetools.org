import type { Metadata } from "next";
import {
  Sparkles,
  Layers,
  Workflow,
  CheckCheck,
  BookOpen,
  Target,
  Code,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Building JSON Knowledge Through Incremental Challenges | Developer Guide",
  description:
    "An incremental approach to mastering JSON: start with basics, handle nesting, validation, and transformations through structured challenges.",
};

export default function IncrementalJsonChallengesArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Building JSON Knowledge Through Incremental Challenges
      </h1>

      <div className="space-y-8">
        <p className="text-lg text-center text-gray-700 dark:text-gray-300">
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. Mastering it is essential for any developer. But instead of just reading specifications, how about building your knowledge piece by piece through practical challenges? This article outlines an incremental approach designed to solidify your understanding, from basic parsing to complex transformations.
        </p>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <BookOpen className="mr-3 text-blue-500" size={28} />
            Why an Incremental Approach?
          </h2>
          <p>
            Learning by doing, starting simple, and gradually increasing complexity helps build a strong foundation. Each challenge focuses on specific JSON concepts and techniques, allowing you to absorb them effectively before moving on. This mirrors real-world development where you often encounter JSON in varying degrees of complexity.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Target className="mr-3 text-green-500" size={28} />
            The Challenges
          </h2>

          <div className="space-y-8">

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <Sparkles className="mr-2 text-yellow-500" size={24} />
                Challenge 1: Basic Parsing & Data Types
              </h3>
              <p className="mb-2">
                <strong>Goal:</strong> Understand fundamental JSON structure and primitive data types.
              </p>
              <p className="mb-2">
                <strong>Description:</strong> Work with simple JSON strings representing basic values (string, number, boolean, null) and flat objects/arrays containing only these primitives.
              </p>
              <p className="mb-2">
                <strong>Concepts:</strong> JSON syntax (&#x7b;&#x7d;, &#x5b;&#x5d;, `":"`, `,`), primitive types (`string`, `number`, `boolean`, `null`).
              </p>
              <p className="mb-2">
                <strong>Example JSON:</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
                <pre>
{`{
  "name": "Basic Item",
  "id": 101,
  "isAvailable": true,
  "notes": null
}`}
                </pre>
              </div>
              <p>
                <strong>Approach:</strong> Use your language's built-in JSON parser (e.g., `JSON.parse()` in JavaScript) to convert the string into a native data structure. Access and print the values. Focus on handling potential parsing errors.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <Layers className="mr-2 text-purple-500" size={24} />
                Challenge 2: Arrays & Simple Nesting
              </h3>
              <p className="mb-2">
                <strong>Goal:</strong> Handle JSON arrays and objects nested one level deep.
              </p>
              <p className="mb-2">
                <strong>Description:</strong> Parse JSON containing arrays of simple objects or objects with properties that are themselves simple objects or arrays.
              </p>
              <p className="mb-2">
                <strong>Concepts:</strong> Arrays of objects, objects within objects, iterating over arrays, accessing nested properties.
              </p>
              <p className="mb-2">
                <strong>Example JSON:</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
                <pre>
{`{
  "user": {
    "id": "user-xyz",
    "profile": {
      "firstName": "Jane",
      "lastName": "Doe"
    }
  },
  "orders": [
    { "orderId": "A1", "amount": 10.5 },
    { "orderId": "B2", "amount": 25.0 }
  ]
}`}
                </pre>
              </div>
              <p>
                <strong>Approach:</strong> After parsing, navigate the nested structure using dot notation or bracket notation (e.g., `data.user.profile.firstName`). Use loops (like `for` or `forEach`) to process items within arrays.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <Workflow className="mr-2 text-red-500" size={24} />
                Challenge 3: Complex Nesting & Mixed Types
              </h3>
              <p className="mb-2">
                <strong>Goal:</strong> Confidently navigate and extract data from deeply nested JSON with varied data types at multiple levels.
              </p>
              <p className="mb-2">
                <strong>Description:</strong> Tackle JSON that includes arrays of arrays, objects containing complex objects/arrays, and structures where different properties have fundamentally different types.
              </p>
              <p className="mb-2">
                <strong>Concepts:</strong> Recursive data structures (JSON values can contain other JSON values), handling potential `undefined` or `null` values when navigating deep paths, complex type checking.
              </p>
              <p className="mb-2">
                <strong>Example JSON:</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
                <pre>
{`{
  "company": {
    "name": "Tech Corp",
    "departments": [
      {
        "name": "Engineering",
        "teams": [
          {
            "id": "eng-a",
            "members": [
              { "name": "Alice", "skills": ["JS", "React"] },
              { "name": "Bob", "skills": ["Python"] }
            ],
            "project": { "name": "Project X", "status": "Active" }
          },
          {
            "id": "eng-b",
            "members": [],
            "project": null
          }
        ]
      },
      {
        "name": "Marketing",
        "teams": []
      }
    ]
  },
  "metadata": { "version": 2.1 }
}`}
                </pre>
              </div>
              <p>
                <strong>Approach:</strong> Practice accessing specific elements deep within the structure (e.g., the name of Bob's first skill). Use optional chaining (`?.`) or null checks to safely access properties that might not exist. Consider writing helper functions for common navigation patterns if the structure is repetitive.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <CheckCheck className="mr-2 text-teal-500" size={24} />
                Challenge 4: Validation & Error Handling
              </h3>
              <p className="mb-2">
                <strong>Goal:</strong> Verify if a JSON structure matches an expected format and handle invalid input gracefully.
              </p>
              <p className="mb-2">
                <strong>Description:</strong> Given a desired JSON structure (implicitly or explicitly defined, like a TypeScript interface or a JSON schema), check if an arbitrary JSON input conforms to it. Implement robust error handling for parsing errors and structural mismatches.
              </p>
              <p className="mb-2">
                <strong>Concepts:</strong> Type checking, required properties, schema validation (conceptual), `try...catch` blocks for parsing, custom validation logic.
              </p>
              <p className="mb-2">
                <strong>Example Schema (Conceptual):</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
                <pre>
{`// Expected structure:
interface Product {
  id: number; // Must be number
  name: string; // Must be string
  price: number; // Must be number
  tags?: string[]; // Optional array of strings
}`}
                </pre>
              </div>
              <p>
                <strong>Approach:</strong> Beyond simple `JSON.parse()` error handling, write functions that check the type and presence of properties. For complex scenarios, explore JSON schema validation libraries (though the *challenge* itself is the conceptual understanding and basic implementation). Handle errors by providing informative feedback.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <SlidersHorizontal className="mr-2 text-orange-500" size={24} />
                Challenge 5: Transformation & Querying
              </h3>
              <p className="mb-2">
                <strong>Goal:</strong> Extract, filter, and reshape JSON data into a different structure.
              </p>
              <p className="mb-2">
                <strong>Description:</strong> Take a source JSON object or array and transform it into a new JSON structure based on specific rules. This could involve selecting specific fields, renaming keys, filtering elements in arrays, or restructuring nested data.
              </p>
              <p className="mb-2">
                <strong>Concepts:</strong> Mapping arrays, filtering arrays, reducing arrays/objects, object transformation, conceptual introduction to JSON querying languages (like JSONPath or JMESPath - no need to implement, just understand the goal they solve).
              </p>
              <p className="mb-2">
                <strong>Example Transformation:</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
                <pre>
{`// Input JSON (from Challenge 3):
// { "company": { "departments": [ ... ] } }

// Desired Output: List of all member names from all teams across all departments
// [ "Alice", "Bob" ]`}
                </pre>
              </div>
              <p>
                <strong>Approach:</strong> Use array methods like `map`, `filter`, and `reduce`. Combine these methods to flatten nested arrays or pick/transform data. For querying specific paths, manual navigation is the first step; later, understanding tools like JSONPath helps appreciate more declarative approaches.
              </p>
            </div>

          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Code className="mr-3 text-blue-500" size={28} />
            Beyond the Challenges
          </h2>
          <p>
            Once you are comfortable with these challenges, you can explore more advanced topics:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>JSON Schema:</strong> A powerful standard for defining the structure of JSON data.</li>
            <li><strong>JSONPath / JMESPath:</strong> Query languages specifically designed for navigating and extracting data from JSON.</li>
            <li><strong>Streaming Parsers:</strong> For very large JSON files that don't fit into memory.</li>
            <li><strong>Performance Optimization:</strong> Techniques for faster JSON parsing and processing.</li>
          </ul>
          <p>
            By taking this structured, challenge-based approach, you build practical skills and a deeper intuition for working with JSON, preparing you for a wide range of development tasks.
          </p>
        </section>

        <footer className="text-center text-gray-600 dark:text-gray-400 mt-10">
          <p>&copy; 2023 Developer Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}