import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about error patterns in minified vs. pretty-printed JSON
 */
export const metadata: Metadata = {
  title: "Error Patterns in Minified vs. Pretty-Printed JSON | Offline Tools",
  description: "Discover key differences in error patterns between minified and pretty-printed JSON and learn how to effectively troubleshoot each format",
};

/**
 * Article page component for JSON formatter article about error patterns in minified vs. pretty-printed JSON
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Error Patterns in Minified vs. Pretty-Printed JSON</h1>

      <div className="space-y-6">
        <p>
          JSON files exist in two primary formats: minified (compact with no whitespace) and pretty-printed
          (formatted with indentation and line breaks). While both contain identical data, they present vastly 
          different challenges when errors occur. This article examines the key differences in error patterns 
          between these formats and provides strategies for effective troubleshooting.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. The Fundamental Difference</h2>
        <p>
          Let's start with a simple comparison to understand the fundamental difference between minified 
          and pretty-printed JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Pretty-Printed JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "active": true
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "active": false
    }
  ],
  "total": 2
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Minified JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{"users":[{"id":1,"name":"John Doe","active":true},{"id":2,"name":"Jane Smith","active":false}],"total":2}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Error Identification Challenges</h2>
        <p>
          The primary difference in troubleshooting these formats lies in error identification:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Pretty-Printed JSON:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Visual pattern recognition</strong> makes errors easier to spot</li>
              <li><strong>Line numbers</strong> in error messages directly correspond to visible lines</li>
              <li><strong>Indentation patterns</strong> help identify structure issues</li>
              <li><strong>Key-value pairs</strong> are clearly separated</li>
              <li>Errors often <strong>isolated to specific lines</strong></li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Minified JSON:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Visual inspection</strong> is extremely difficult</li>
              <li><strong>Line/column offsets</strong> are critical but hard to follow</li>
              <li><strong>Character position</strong> is the primary error locator</li>
              <li><strong>Structure</strong> is not visually apparent</li>
              <li>Errors can feel like <strong>finding a needle in a haystack</strong></li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Common Error Patterns and Their Manifestation</h2>
        <p>
          Let's examine how common JSON errors manifest differently in each format:
        </p>

        <h3 className="text-xl font-medium mt-6">3.1 Missing Commas</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Pretty-Printed Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Product"
  "price": 19.99   <- Error is visually obvious here
}`}
          </pre>
          <h4 className="text-md font-medium text-red-600 dark:text-red-400 mt-3">Minified Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{"name":"Product""price":19.99}`}
          </pre>
          <p className="mt-2 text-sm">
            Error location: Character 18 - Missing comma after "Product"
          </p>
          <p className="mt-2">
            <strong>Different experience:</strong> In pretty-printed JSON, you can visually scan for missing commas at the end of lines.
            In minified JSON, you need to carefully count characters or rely on error messages that reference character positions.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3.2 Unbalanced Brackets and Braces</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Pretty-Printed Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "items": [
    {"id": 1},
    {"id": 2}
  ]
  "count": 2
}   <- Missing closing bracket for the array`}
          </pre>
          <h4 className="text-md font-medium text-red-600 dark:text-red-400 mt-3">Minified Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{"items":[{"id":1},{"id":2}]"count":2}`}
          </pre>
          <p className="mt-2 text-sm">
            Error location: Character 31 - Missing comma after the array
          </p>
          <p className="mt-2">
            <strong>Different experience:</strong> In pretty-printed JSON, indentation helps you match opening and closing brackets.
            In minified JSON, you need to carefully track nested structures or use a bracket-matching tool.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3.3 Invalid Property Names</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Pretty-Printed Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  status: "active",   <- Missing quotes around property name
  "updated": true
}`}
          </pre>
          <h4 className="text-md font-medium text-red-600 dark:text-red-400 mt-3">Minified Error:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{status:"active","updated":true}`}
          </pre>
          <p className="mt-2 text-sm">
            Error location: Character 1 - Expected property name enclosed in double quotes
          </p>
          <p className="mt-2">
            <strong>Different experience:</strong> In pretty-printed JSON, inconsistent formatting of property names stands out visually.
            In minified JSON, you need to ensure each key is properly quoted in a dense string.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Error Messages and Debugging Tools</h2>
        <p>
          Parser error messages differ significantly in how they reference issues in each format:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error Message Comparison:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium">Pretty-Printed JSON Error:</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                {`Unexpected token 'p' at line 3, column 3
  "price": 19.99
  ^`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Minified JSON Error:</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                {`Unexpected token 'p' at position 18
{"name":"Product""price":19.99}
                  ^`}
              </pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Time-to-Resolution Differences</h2>
        <p>
          The format of your JSON significantly impacts how quickly you can identify and fix errors:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Troubleshooting Efficiency:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium">Pretty-Printed JSON:</h4>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Errors typically localized to specific formatted lines</li>
                <li>Visual patterns help identify structural issues</li>
                <li>Nested structures are clear through indentation</li>
                <li>Line numbering makes error messages directly actionable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Minified JSON:</h4>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Character position is the primary navigation tool</li>
                <li>Finding exact error location requires careful counting</li>
                <li>Error context is often lost in the dense format</li>
                <li>Pretty-printing is often required as a first debug step</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Real-World Comparative Example</h2>
        <p>
          Let's look at a more complex example to highlight the difference in error identification:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Complex Error in Pretty-Printed JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "api_config": {
    "endpoints": [
      {
        "name": "users",
        "methods": ["GET", "POST"]
      },
      {
        "name": "products",
        "methods": ["GET", "PUT", "DELETE"
      },
      {
        "name": "orders",
        "methods": ["GET"]
      }
    ],
    "version": "1.2.0"
  }
}`}
          </pre>
          <p className="mt-2 text-sm">
            Error: Missing closing bracket after "DELETE" at line 10, column 44
          </p>

          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mt-6">Same Error in Minified JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{"api_config":{"endpoints":[{"name":"users","methods":["GET","POST"]},{"name":"products","methods":["GET","PUT","DELETE"},{"name":"orders","methods":["GET"]}],"version":"1.2.0"}}`}
          </pre>
          <p className="mt-2 text-sm">
            Error: Unexpected token ',' at position 111
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Strategic Approaches By Format</h2>
        <p>
          Each format requires a different debugging strategy:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Debugging Pretty-Printed JSON:</h3>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><strong>Follow line numbers</strong> directly to the problematic area</li>
            <li><strong>Check indentation patterns</strong> to verify structure</li>
            <li><strong>Scan for missing commas</strong> at the end of lines</li>
            <li><strong>Match opening/closing brackets</strong> by indentation level</li>
            <li><strong>Verify property name formatting</strong> is consistent</li>
          </ol>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 mt-6">
          <h3 className="text-lg font-medium">Debugging Minified JSON:</h3>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><strong>Pretty-print first</strong> before attempting serious debugging</li>
            <li>If pretty-printing isn't possible, <strong>use character position</strong> to locate errors</li>
            <li><strong>Use specialized JSON validators</strong> with character highlighting</li>
            <li><strong>Validate small sections</strong> if the overall JSON is too large</li>
            <li><strong>Count opening and closing brackets</strong> to check for balance</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-8">8. Parser Error Reporting Differences</h2>
        <p>
          Different JSON parsers handle error reporting differently based on format:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Browser Console (Chrome):</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium">Pretty-Printed Error:</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`VM1234:4 Uncaught SyntaxError: 
Expected ',' after property value in 
JSON at position 37
    at JSON.parse (<anonymous>)
    at <anonymous>:1:6`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Minified Error:</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`VM1234:1 Uncaught SyntaxError: 
Expected ',' after property value in 
JSON at position 19
    at JSON.parse (<anonymous>)
    at <anonymous>:1:6`}
              </pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">9. Tools and Techniques for Each Format</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Best Tools for Pretty-Printed JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>IDE syntax highlighting</strong> to visualize structure</li>
            <li><strong>Line-based diff tools</strong> to compare with valid versions</li>
            <li><strong>JSON schema validators</strong> to verify structure and types</li>
            <li><strong>Code folding</strong> to collapse irrelevant sections</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 mt-6">
          <h3 className="text-lg font-medium">Best Tools for Minified JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>JSON formatters</strong> to convert to pretty-printed format</li>
            <li><strong>Character-based error highlighters</strong> that show exact position</li>
            <li><strong>Structure validators</strong> that check nested bracket/brace balance</li>
            <li><strong>Online JSON visualizers</strong> that show the structure graphically</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">10. Best Practices for Development and Production</h2>
        <p>
          Each format has its appropriate use cases:
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-4">
          <h3 className="text-lg font-medium">When to Use Pretty-Printed JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Development environments</strong> for readability and debugging</li>
            <li><strong>Configuration files</strong> that humans need to edit</li>
            <li><strong>Documentation examples</strong> for clear structure illustration</li>
            <li><strong>Logs and debugging output</strong> for easier troubleshooting</li>
            <li><strong>Version control</strong> for readable diffs</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-4 mt-6">
          <h3 className="text-lg font-medium">When to Use Minified JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Production API responses</strong> to reduce bandwidth</li>
            <li><strong>Data storage</strong> to save space</li>
            <li><strong>Network transfers</strong> to improve performance</li>
            <li><strong>Browser storage</strong> (localStorage, sessionStorage) for efficiency</li>
            <li><strong>Embedded systems</strong> with limited memory</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">11. Error Prevention Strategies</h2>
        <div className="space-y-3">
          <p>
            The best way to handle errors is to prevent them. Here are format-specific strategies:
          </p>

          <h3 className="text-xl font-medium">For Pretty-Printed JSON:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use an editor with <strong>real-time syntax validation</strong></li>
            <li>Implement <strong>code formatting rules</strong> in your team</li>
            <li>Utilize <strong>linters</strong> to catch structural issues early</li>
            <li>Set up <strong>pre-commit hooks</strong> that validate JSON files</li>
          </ul>

          <h3 className="text-xl font-medium mt-4">For Minified JSON:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Never write minified JSON by hand</strong> - always generate it from pretty-printed version</li>
            <li>Use <strong>standardized minification tools</strong> rather than custom solutions</li>
            <li>Implement <strong>validation before minification</strong> in your build pipeline</li>
            <li>Add <strong>automated tests</strong> that parse minified output</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            For critical systems, consider implementing a <strong>format conversion checkpoint</strong>: prettify minified JSON,
            validate it, then re-minify if needed. This can catch subtle corruption issues that might otherwise go undetected.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">12. Conclusion: Choosing the Right Strategy</h2>
        <p>
          Understanding the different error patterns between minified and pretty-printed JSON is essential for efficient debugging.
          While pretty-printed JSON is generally easier to troubleshoot, minified JSON has its place in production environments.
          The key is using the right format for the right context and having appropriate tools for each situation.
        </p>

        <p className="mt-4">
          Remember: when faced with a minified JSON error, pretty-printing should typically be your first debugging step.
          Conversely, when preparing JSON for production, proper validation before minification can save hours of troubleshooting.
        </p>
      </div>
    </>
  );
} 