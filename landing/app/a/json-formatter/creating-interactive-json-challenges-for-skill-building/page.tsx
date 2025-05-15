import type { Metadata } from "next";
import {
  Code,
  ListChecks,
  ScrollText,
  Check,
  X,
  Zap,
  Brain,
  Box, // Replaced Cube with Box as Cube is not exported from lucide-react
  LayoutList,
  Lightbulb,
  Settings2,
  Target,
  Diff,
  ScanSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Interactive JSON Challenges for Skill Building",
  description:
    "Learn how to design and structure interactive coding challenges focused on JSON manipulation and understanding to build developer skills.",
};

export default function JsonChallengeArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code size={32} /> Creating Interactive JSON Challenges for Skill Building
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in modern web development, data exchange, and APIs.
          Proficiency in parsing, manipulating, validating, and understanding JSON structures is a fundamental skill for developers.
          Interactive challenges provide a practical and engaging way for developers to hone these skills.
          This article explores how to design and structure effective JSON challenges.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks size={24} /> What Skills Do JSON Challenges Build?
        </h2>
        <p>
          Well-designed JSON challenges target several key areas:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing and Serialization:</strong> Converting JSON strings to native data structures (objects, arrays) and vice-versa.
          </li>
          <li>
            <strong>Data Structure Navigation:</strong> Accessing nested properties and array elements within complex JSON.
          </li>
          <li>
            <strong>Data Manipulation:</strong> Adding, removing, updating, and transforming data within JSON objects and arrays.
          </li>
          <li>
            <strong>Filtering and Querying:</strong> Selecting data based on specific criteria.
          </li>
          <li>
            <strong>Schema Understanding:</strong> Recognizing and working with defined JSON structures (even without formal schema validation).
          </li>
          <li>
            <strong>Error Handling:</strong> Gracefully dealing with invalid or malformed JSON.
          </li>
          <li>
            <strong>Algorithmic Thinking:</strong> Developing logic to process JSON data according to requirements.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList size={24} /> Types of JSON Challenges
        </h2>
        <p>
          Challenges can range in complexity and focus. Here are some common types:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Box size={20} /> Basic Parsing & Serialization
        </h3>
        <p>
          <strong>Goal:</strong> Convert a JSON string to an object/array or vice-versa.
        </p>
        <p>
          <strong>Example:</strong>
          Given the JSON string:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`'&#x7b;"name": "Alice", "age": 30, "isStudent": true&#x7d;'`}
          </pre>
        </div>
        <p>
          Parse it into a JavaScript object and return the value of the &quot;age&quot; property.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output:</p>
          <pre className="overflow-x-auto">
            {`30`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Target size={20} /> Data Extraction and Querying
        </h3>
        <p>
          <strong>Goal:</strong> Retrieve specific pieces of data based on paths or conditions.
        </p>
        <p>
          <strong>Example:</strong>
          Given the following JSON data:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`[
  &#x7b; "id": 1, "name": "Laptop", "category": "Electronics", "price": 1200 &#x7d;,
  &#x7b; "id": 2, "name": "Keyboard", "category": "Accessories", "price": 75 &#x7d;,
  &#x7b; "id": 3, "name": "Mouse", "category": "Accessories", "price": 25 &#x7d;,
  &#x7b; "id": 4, "name": "Monitor", "category": "Electronics", "price": 300 &#x7d;
]`}
          </pre>
        </div>
        <p>
          Return an array of names of products whose &quot;category&quot; is &quot;Electronics&quot; and &quot;price&quot; is greater than 500.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output:</p>
          <pre className="overflow-x-auto">
            {`["Laptop"]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings2 size={20} /> Data Transformation
        </h3>
        <p>
          <strong>Goal:</strong> Modify the JSON structure or its values.
        </p>
        <p>
          <strong>Example:</strong>
          Given the JSON data:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`[
  &#x7b; "firstName": "John", "lastName": "Doe", "age": 30 &#x7d;,
  &#x7b; "firstName": "Jane", "lastName": "Smith", "age": 25 &#x7d;
]`}
          </pre>
        </div>
        <p>
          Transform this array of objects into a new array where each object has a single &quot;fullName&quot; key (concatenating &quot;firstName&quot; and &quot;lastName&quot;) and remove the individual &quot;firstName&quot; and &quot;lastName&quot; keys.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output:</p>
          <pre className="overflow-x-xauto">
            {`[
  &#x7b; "fullName": "John Doe", "age": 30 &#x7d;,
  &#x7b; "fullName": "Jane Smith", "age": 25 &#x7d;
]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ScanSearch size={20} /> Validation (Conceptual)
        </h3>
        <p>
          <strong>Goal:</strong> Check if a given JSON object conforms to a specific structure or set of rules.
        </p>
        <p>
          <strong>Example (Conceptual):</strong>
          Given a JSON object and a &quot;schema&quot; description (which could be implicit in the problem, or explicit JSON Schema), determine if the object is valid.
        </p>
        <p>
          Check if the following JSON is valid according to the rule: &quot;Must be an object with keys &apos;id&apos; (number), &apos;name&apos; (string), and optionally &apos;tags&apos; (array of strings)&quot;.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`&#x7b;
  "id": 123,
  "name": "Sample Item",
  "tags": ["A", "B"]
&#x7d;`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output:</p>
          <pre className="overflow-x-auto">
            {`true`}
          </pre>
        </div>
        <p>
          vs.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`&#x7b;
  "id": "abc", // Invalid type
  "name": "Another Item"
&#x7d;`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output:</p>
          <pre className="overflow-x-auto">
            {`false`}
          </pre>
        </div>


        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Diff size={20} /> Comparison and Difference
        </h3>
        <p>
          <strong>Goal:</strong> Find differences between two JSON structures.
        </p>
        <p>
          <strong>Example (Conceptual):</strong>
          Given two JSON arrays of numbers, find the numbers present in the second array but not the first.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <X size={20} /> Handling Malformed JSON
        </h3>
        <p>
          <strong>Goal:</strong> Identify syntax errors or handle invalid input gracefully.
        </p>
        <p>
          <strong>Example (Conceptual):</strong>
          Given a JSON string with a syntax error (e.g., trailing comma, missing quote), identify the error location or return a specific error code/message.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`'&#x7b;"name": "Bob", "age": 40,, "city": "London"&#x7d;' // Double comma is an error`}
          </pre>
        </div>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium mb-2">Expected Output (could be an error object/string):</p>
          <pre className="overflow-x-auto">
            {`"SyntaxError: Unexpected token , in JSON at position 21"`}
          </pre>
        </div>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ScrollText size={24} /> Structuring a Challenge
        </h2>
        <p>
          Each challenge should provide clarity to the user:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Problem Description:</strong> Clearly state the objective. What should the user&apos;s code do?
          </li>
          <li>
            <strong>Input JSON:</strong> Provide the JSON data the user&apos;s solution will receive. Use code blocks for readability.
          </li>
          <li>
            <strong>Expected Output:</strong> Show what the function should return for the given input. This can be a JSON string, object, array, primitive value, or even an error description.
          </li>
          <li>
            <strong>Constraints (Optional but Recommended):</strong> Specify any requirements like the programming language, disallowed libraries (e.g., &quot;do not use a dedicated JSONPath library&quot;), performance considerations, etc.
          </li>
          <li>
            <strong>Test Cases (Conceptual):</strong> Describe or show additional input/output pairs to cover edge cases. In an interactive platform, these would be used to automatically check the user&apos;s solution.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} /> Implementation Considerations (Backend Perspective)
        </h2>
        <p>
          While this page is static, a real interactive platform requires backend logic to receive user code/input and validate it.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Challenge Data Storage:</strong> Store challenge definitions (description, input JSON, expected output, test cases) in JSON files, a database, or markdown files.
          </li>
          <li>
            <strong>Validation Endpoint:</strong> Create a backend API endpoint that receives the user&apos;s submitted code (or the output of their code) and the challenge ID.
          </li>
          <li>
            <strong>Execution (Complex):</strong> Safely execute user code (e.g., in a sandbox environment) if the challenge requires submitting a function. Extract its output.
          </li>
          <li>
            <strong>Output Comparison:</strong> Compare the user&apos;s output against the expected output for the given test case(s). This might involve deep comparison for objects/arrays.
          </li>
          <li>
            <strong>Error Reporting:</strong> Provide meaningful feedback: success (<Check className="inline text-green-500" />), failure (<X className="inline text-red-500" />), syntax errors, runtime errors, incorrect output, timeout, etc.
          </li>
        </ul>

        <p>
          For example, a backend validation endpoint might receive something like:
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`&#x7b;
  "challengeId": "json-transformation-1",
  "userOutput": [
    &#x7b; "fullName": "John Doe", "age": 30 &#x7d;,
    &#x7b; "fullName": "Jane Smith", "age": 25 &#x7d;
  ]
&#x7d;`}
          </pre>
        </div>
        <p>
          The backend would then load the expected output for &quot;json-transformation-1&quot; and compare it to <code>userOutput</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Brain size={24} /> Benefits for Learning
        </h2>
        <p>
          Engaging with interactive JSON challenges transforms passive reading into active problem-solving.
          It reinforces theoretical knowledge with practical application, leading to deeper understanding and retention.
          Starting with simple parsing and gradually introducing complex transformations, queries, and error handling scenarios allows developers to build confidence incrementally.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} /> Conclusion
        </h2>
        <p>
          Interactive JSON challenges are a powerful tool for skill building in modern development.
          By categorizing challenge types, providing clear descriptions and examples, and designing a solid validation mechanism, you can create valuable learning experiences that help developers become more proficient in handling the ubiquitous JSON format.
        </p>
      </div>
    </>
  );
}