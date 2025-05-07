import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Troubleshooting JSON.parse() Failures | Offline Tools",
  description: "Learn how to diagnose and fix common JSON.parse() errors with practical examples and step-by-step troubleshooting techniques.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Troubleshooting JSON.parse() Failures</h1>

      <div className="space-y-6">
        <p>
          The <code>JSON.parse()</code> method is a fundamental JavaScript function used to convert JSON text into a JavaScript object. While it may seem straightforward, developers frequently encounter parsing failures that can be challenging to diagnose. This article explores common causes of <code>JSON.parse()</code> failures and provides practical troubleshooting techniques.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common Causes of JSON.parse() Failures</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">1. Syntactically Invalid JSON</h3>
        <p>
          The most common reason for <code>JSON.parse()</code> failures is simply that the input string isn&apos;t valid JSON. This can happen for several reasons:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Missing or mismatched braces, brackets, or quotes</li>
          <li>Missing or extra commas between elements</li>
          <li>Unquoted property names (JSON requires double quotes)</li>
          <li>Trailing commas (not allowed in JSON)</li>
          <li>Use of single quotes instead of double quotes</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Example of Invalid JSON:</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  name: "John", // Missing quotes around property name
  'age': 30,    // Single quotes instead of double
  "isActive": true,
  "hobbies": ["reading", "cycling",] // Trailing comma
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Control Characters and Invisible Characters</h3>
        <p>
          JSON is sensitive to invisible characters like line breaks, tabs, and special control characters. When copying JSON from various sources, invisible characters can sneak in and cause parsing errors.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Common Error:</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`SyntaxError: Unexpected token � in JSON at position 42`}
          </pre>
          <p className="mt-2">
            This typically indicates the presence of non-ASCII characters or byte-order marks (BOM) in the JSON string.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Numeric Precision Issues</h3>
        <p>
          JavaScript has limitations in handling very large numbers. When parsing JSON with large integers (beyond the safe integer range of ±2^53), precision can be lost.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Example:</h4>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// Large number in JSON
const jsonString = '{"id": 9007199254740993}';
const parsed = JSON.parse(jsonString);
console.log(parsed.id); // May not represent the exact number`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Step-by-Step Troubleshooting Techniques</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Use JSON Validators</h3>
        <p>
          Before attempting to debug code, use online JSON validators or the JSON formatter in Offline Tools to check if your JSON is structurally valid. These tools usually provide detailed error messages with line and column references.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Examine Error Messages Carefully</h3>
        <p>
          JSON.parse() errors typically include position information that can help identify the issue:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`SyntaxError: Unexpected token , in JSON at position 28`}
          </pre>
          <p className="mt-2">
            This indicates a syntax error at character position 28, possibly a comma in the wrong place.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Try/Catch for Graceful Handling</h3>
        <p>
          Always wrap <code>JSON.parse()</code> calls in try/catch blocks to handle parsing errors gracefully:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`try {
  const data = JSON.parse(jsonString);
  // Process data
} catch (error) {
  console.error("JSON parsing failed:", error.message);
  // Handle the error or provide feedback to the user
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. Log the Raw JSON</h3>
        <p>
          When debugging, log the actual string being parsed. This can help identify if the JSON is getting corrupted before reaching <code>JSON.parse()</code>:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`console.log("Raw JSON:", jsonString);
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error("Parsing error:", error);
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. Use JSON.parse() with Reviver Function</h3>
        <p>
          The <code>JSON.parse()</code> method accepts a second parameter called a reviver function that can help handle special cases:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`const data = JSON.parse(jsonString, (key, value) => {
  // Handle large integers as strings
  if (typeof value === 'number' && !Number.isSafeInteger(value)) {
    return value.toString();
  }
  return value;
});`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common Scenarios and Solutions</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">API Response Parsing Failures</h3>
        <p>
          When working with APIs, sometimes the response isn&apos;t valid JSON despite the Content-Type header suggesting it is. Common issues include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Error responses with HTML instead of JSON</li>
          <li>Mixed content types in the response</li>
          <li>JSON with JavaScript comments</li>
        </ul>
        <p className="mt-2">
          Solution: Inspect the raw response before parsing. Some HTTP clients allow you to examine the exact content received from the server.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">LocalStorage Parsing Issues</h3>
        <p>
          When retrieving JSON from localStorage or sessionStorage, ensure the data was properly serialized when stored:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// Storing data
localStorage.setItem('user', JSON.stringify(userObject));

// Retrieving data
try {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    // Handle case where item doesn't exist
  }
} catch (error) {
  // Handle parsing error
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Advanced Troubleshooting Techniques</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Using JSON5 for More Lenient Parsing</h3>
        <p>
          For development purposes, you might consider using the JSON5 library, which is more forgiving than standard JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Allows comments</li>
          <li>Permits trailing commas</li>
          <li>Accepts single quotes</li>
          <li>Supports unquoted property names</li>
        </ul>
        <p className="mt-2">
          However, remember that JSON5 should only be used in development, not for production data exchange.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Creating Custom JSON Sanitizers</h3>
        <p>
          For consistently problematic JSON, you might create a sanitization function:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`function sanitizeJson(jsonString) {
  // Remove potential control characters
  const sanitized = jsonString.replace(/[\\u0000-\\u001F]/g, '');
  
  // Try to parse
  try {
    return JSON.parse(sanitized);
  } catch (error) {
    console.error("Sanitization couldn't fix JSON:", error);
    throw error;
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Troubleshooting <code>JSON.parse()</code> failures is a common task for developers working with JSON data. By understanding the common causes and applying systematic debugging techniques, most parsing issues can be quickly identified and resolved. Remember that prevention is better than cure—validating JSON before attempting to parse it can save considerable debugging time.
        </p>
        <p>
          For complex JSON documents, consider using a specialized JSON formatter tool that helps identify and fix errors automatically, making the debugging process much more efficient.
        </p>
      </div>
    </>
  );
} 