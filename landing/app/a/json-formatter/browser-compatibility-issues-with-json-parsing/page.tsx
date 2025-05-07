import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Browser Compatibility Issues with JSON Parsing | Offline Tools",
  description:
    "Understand JSON parsing differences across browsers and how to ensure your JSON documents work correctly in all environments.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Browser Compatibility Issues with JSON Parsing</h1>

      <div className="space-y-6">
        <p>
          While JSON is a standardized format, its implementation in browsers can vary, leading to inconsistent parsing
          behavior across different environments. This article examines common browser compatibility issues with JSON
          parsing and offers strategies to ensure consistent results across platforms.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Evolving JSON Standard</h2>
        <p>
          JSON was first formalized by Douglas Crockford in the early 2000s and later standardized as ECMA-404 and RFC
          8259. However, browser implementations have evolved over time, leading to disparities in how JSON is handled
          across different browsers and versions.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Browser-Specific JSON Parsing Issues</h2>

        <h3 className="text-xl font-medium mt-6">1. Large Number Handling</h3>
        <p>
          JavaScript has limitations with large integers, as all numbers are represented as 64-bit floating point
          values. This causes issues with numbers that exceed 2^53-1 (9,007,199,254,740,991).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Large Integer Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON with large number
{
  "id": 9007199254740993
}

// In older browsers, this might be parsed as:
{
  "id": 9007199254740992
}

// Note the different last digit due to precision loss`}
            </pre>
          </div>
          <table className="min-w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Browser</th>
                <th className="px-4 py-2 text-left">Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Modern Chrome/Firefox/Safari</td>
                <td className="px-4 py-2">Precision loss occurs for integers {">"}2^53-1</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Internet Explorer</td>
                <td className="px-4 py-2">More severe precision issues</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Node.js</td>
                <td className="px-4 py-2">Same precision issues, but BigInt support in newer versions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Unicode Character Handling</h3>
        <p>
          Different browsers handle escaped Unicode sequences and surrogate pairs differently, especially in older
          versions.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Unicode Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON with Unicode escape sequences
{
  "text": "\\u2728 Star \\uD83D\\uDE00 Emoji"
}

// Older browsers might not correctly parse surrogate pairs
// or might require specific encoding`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Date Parsing Inconsistencies</h3>
        <p>
          JSON doesn&apos;t have a native date type, so dates are typically represented as strings. Different browsers
          parse date strings differently.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Date Handling Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON with a date
{
  "created": "2023-04-15T14:30:00Z"
}

// Different browsers handle parsing differently:
var dateStr = "2023-04-15T14:30:00Z";
var date = new Date(dateStr);`}
            </pre>
          </div>
          <table className="min-w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Browser</th>
                <th className="px-4 py-2 text-left">Date Parsing Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Modern Chrome/Firefox</td>
                <td className="px-4 py-2">Correctly parses ISO 8601 strings to local time</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Internet Explorer 8</td>
                <td className="px-4 py-2">May not correctly parse ISO 8601 dates</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Safari (older versions)</td>
                <td className="px-4 py-2">Had issues with timezone handling</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Trailing Commas</h3>
        <p>Standard JSON doesn&apos;t allow trailing commas, but some environments are more forgiving.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">
            Non-standard JSON with trailing commas:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "Product",
  "categories": [
    "Electronics",
    "Computers",
  ],
}

// This is invalid JSON according to the standard`}
            </pre>
          </div>
          <table className="min-w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Environment</th>
                <th className="px-4 py-2 text-left">Trailing Comma Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">JSON.parse() (all browsers)</td>
                <td className="px-4 py-2">Throws SyntaxError</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">JavaScript Object Literals</td>
                <td className="px-4 py-2">Accepted in modern browsers</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Some JSON parsers</td>
                <td className="px-4 py-2">May allow them with relaxed mode</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Error Reporting Differences</h3>
        <p>Different browsers provide very different error messages for the same JSON parsing errors.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Error Reporting Example:</h4>
          <p>
            For the invalid JSON: <code>{`{"name": "Test", "value": 123,}`}</code>
          </p>
          <table className="min-w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Browser</th>
                <th className="px-4 py-2 text-left">Error Message</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Chrome</td>
                <td className="px-4 py-2">&quot;Unexpected token {"}"} in JSON at position 27&quot;</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Firefox</td>
                <td className="px-4 py-2">
                  &quot;JSON.parse: unexpected character at line 1 column 28 of the JSON data&quot;
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Internet Explorer</td>
                <td className="px-4 py-2">&quot;Invalid character&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Browser-specific JSON parsing issues can be particularly challenging because they may only appear in certain
            environments, making them difficult to reproduce and debug. Always test your JSON handling in all target
            browsers.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON.parse() vs eval()</h2>
        <p>
          In older code, you might encounter <code>eval()</code> being used to parse JSON, which has both security and
          compatibility implications.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Comparison:</h4>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Approach</th>
                <th className="px-4 py-2 text-left">Compatibility</th>
                <th className="px-4 py-2 text-left">Security</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <code>JSON.parse()</code>
                </td>
                <td className="px-4 py-2">IE 8+, all modern browsers</td>
                <td className="px-4 py-2">Safe, validates input</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <code>eval()</code>
                </td>
                <td className="px-4 py-2">All browsers</td>
                <td className="px-4 py-2">Dangerous, executes any JavaScript</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JSON Browser Polyfills</h2>
        <p>
          For supporting older browsers, several polyfills have been developed. Here&apos;s a summary of common ones:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">JSON Polyfills:</h4>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Polyfill</th>
                <th className="px-4 py-2 text-left">Purpose</th>
                <th className="px-4 py-2 text-left">Target Browsers</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">json2.js</td>
                <td className="px-4 py-2">Adds JSON object to browsers that lack it</td>
                <td className="px-4 py-2">IE7 and older</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">json3.js</td>
                <td className="px-4 py-2">Modern JSON polyfill with better compliance</td>
                <td className="px-4 py-2">IE6+, older browsers</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">core-js</td>
                <td className="px-4 py-2">Comprehensive polyfill including JSON</td>
                <td className="px-4 py-2">All browsers needing polyfills</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Cross-Browser JSON Best Practices</h2>

        <h3 className="text-xl font-medium mt-6">1. Use Native JSON Methods When Available</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Check for native JSON support and fall back to a polyfill
if (typeof JSON === 'undefined') {
  // Load JSON polyfill
  loadScript('path/to/json-polyfill.js');
}

// Then use JSON methods
var obj = JSON.parse(jsonString);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Handle Large Numbers Safely</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// For modern browsers that support BigInt
const jsonString = '{"id": 9007199254740993}';

// Option 1: Parse as string
const jsonWithBigInt = jsonString.replace(/"id": (\d+)/g, '"id": "$1"');
const obj = JSON.parse(jsonWithBigInt);
// Now obj.id is "9007199254740993" (string)

// Option 2: Use a reviver function (ES2020+)
const obj2 = JSON.parse(jsonString, (key, value) => {
  // Check if value is a large integer that would lose precision
  if (typeof value === 'number' && value {'>'} Number.MAX_SAFE_INTEGER) {
    return BigInt(value);
  }
  return value;
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Consistent Date Handling</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Serialize dates consistently
const data = {
  timestamp: new Date()
};

// Option 1: Use ISO strings
const json = JSON.stringify(data, (key, value) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
});

// Option 2: Use numeric timestamps for maximum compatibility
const json2 = JSON.stringify(data, (key, value) => {
  if (value instanceof Date) {
    return value.getTime(); // Returns milliseconds since epoch
  }
  return value;
});

// When parsing
const parsedData = JSON.parse(json, (key, value) => {
  // Detect ISO date strings
  if (typeof value === 'string' && 
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    return new Date(value);
  }
  return value;
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Use Schema Validation</h3>
        <p>
          Validate JSON against a schema to ensure it meets your application&apos;s requirements, regardless of browser
          quirks.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Using a library like Ajv for validation
const validate = ajv.compile({
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    created: { type: "string", format: "date-time" }
  },
  required: ["id", "name"]
});

try {
  const data = JSON.parse(jsonString);
  const valid = validate(data);
  
  if (!valid) {
    console.error("Validation errors:", validate.errors);
  }
} catch (error) {
  console.error("JSON parsing error:", error.message);
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Comprehensive Error Handling</h3>
        <p>Given the differences in error reporting, implement comprehensive error handling.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function safeJsonParse(jsonString) {
  try {
    return {
      data: JSON.parse(jsonString),
      error: null
    };
  } catch (error) {
    // Normalize error message across browsers
    let errorMessage = "Invalid JSON";
    
    if (error instanceof SyntaxError) {
      // Extract position information if available
      const posMatch = error.message.match(/position (\d+)/i) || 
                       error.message.match(/column (\d+)/i);
      
      if (posMatch) {
        const position = parseInt(posMatch[1], 10);
        // Generate context around the error
        const context = jsonString.substring(
          Math.max(0, position - 10),
          Math.min(jsonString.length, position + 10)
        );
        
        errorMessage = \`JSON syntax error near: ...\${context}...\`;
      } else {
        errorMessage = \`JSON syntax error: \${error.message}\`;
      }
    }
    
    return {
      data: null,
      error: errorMessage
    };
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Testing JSON Across Browsers</h2>
        <p>To ensure your JSON handling works consistently across browsers, implement a testing strategy:</p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Automated tests with different browsers</strong> - Use tools like Karma, Cypress, or Selenium to
            test JSON parsing in different browsers
          </li>
          <li>
            <strong>Test edge cases</strong> - Large numbers, Unicode characters, dates, deeply nested structures
          </li>
          <li>
            <strong>Test error scenarios</strong> - Ensure your error handling works across browsers
          </li>
          <li>
            <strong>Browser compatibility libraries</strong> - Consider using libraries like Browserstack to test in a
            wide range of browsers
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While JSON itself is a standardized format, browser implementations can introduce inconsistencies in how JSON
          is parsed and handled. By understanding these differences and implementing the best practices outlined in this
          article, you can ensure your applications handle JSON data reliably across all browsers and environments.
        </p>

        <p className="mt-4">
          Remember that JSON parsing is just one aspect of browser compatibility. For complete cross-browser
          compatibility, also consider differences in JavaScript engines, DOM implementations, and CSS rendering. Using
          modern formatters and validators can help identify potential issues before they affect users.
        </p>
      </div>
    </>
  );
}
