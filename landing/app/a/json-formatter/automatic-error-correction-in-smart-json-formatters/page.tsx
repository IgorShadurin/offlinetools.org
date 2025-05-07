import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Automatic Error Correction in Smart JSON Formatters | Offline Tools",
  description: "Explore how advanced JSON formatters can automatically detect and correct common syntax errors in your JSON documents.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Automatic Error Correction in Smart JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          Modern JSON formatters have evolved beyond simple pretty-printing. Many now include
          intelligent error correction capabilities that can automatically detect and fix common
          JSON syntax problems. This article explores how these smart formatters work and the
          techniques they use to repair malformed JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8">How Smart JSON Formatters Work</h2>
        <p>
          Smart JSON formatters typically employ a combination of techniques to identify and correct errors:
        </p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Tokenization analysis</strong> - Breaking down the JSON text into tokens to identify where
            syntax deviates from expected patterns
          </li>
          <li>
            <strong>Heuristic pattern matching</strong> - Recognizing common error patterns based on known
            coding habits and mistakes
          </li>
          <li>
            <strong>Error recovery algorithms</strong> - Applying specific recovery strategies for different
            types of syntax errors
          </li>
          <li>
            <strong>Context-aware repairs</strong> - Using surrounding context to intelligently guess the
            intended structure
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Common Automatic Corrections</h2>

        <h3 className="text-xl font-medium mt-6">1. Missing or Extra Commas</h3>
        <p>
          Perhaps the most common JSON error, comma problems can often be automatically fixed by analyzing
          the surrounding structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John"
  "age": 30,
  "city": "New York",
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Automatic Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "age": 30,
  "city": "New York"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">The formatter added the missing comma after &quot;John&quot; and removed the trailing comma after &quot;New York&quot;.</p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Quote Corrections</h3>
        <p>
          Smart formatters can fix issues with mismatched or incorrect quote types.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "product": 'MacBook Pro',
  description: "13-inch model",
  'price": 1299.99
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Automatic Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "product": "MacBook Pro",
  "description": "13-inch model",
  "price": 1299.99
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">The formatter converted single quotes to double quotes and added missing quotes around property names.</p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Bracket Completion</h3>
        <p>
          Missing closing brackets or braces can be detected and fixed by analyzing the document structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "user": {
    "name": "Alice",
    "settings": {
      "darkMode": true,
      "notifications": false
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Automatic Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "user": {
    "name": "Alice",
    "settings": {
      "darkMode": true,
      "notifications": false
    }
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">The formatter added the missing closing brace for the settings object.</p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Escape Sequence Repair</h3>
        <p>
          Proper escaping of special characters is often automatically fixed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "message": "He said "hello" to me",
  "path": "C:\Users\Documents"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Automatic Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "message": "He said \\"hello\\" to me",
  "path": "C:\\Users\\Documents"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            While auto-correction is convenient, always review the changes made by formatters, especially for 
            mission-critical data. The automatic fixes might not always match your intentions.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Error Correction Techniques</h2>

        <h3 className="text-xl font-medium mt-6">1. Recovery Points</h3>
        <p>
          Smart formatters identify &quot;recovery points&quot; in the document where parsing can resume after an error.
          These are typically well-formed structures within the malformed JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium">Example Recovery Points:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "valid": true,      // ← Recovery point 1 (valid property)
  broken-property: 1, // ← Error here
  "array": [          // ← Recovery point 2 (start of valid array)
    1, 2, 3
  ]                   // ← Recovery point 3 (end of valid array)
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Token-level Repairs</h3>
        <p>
          Some formatters make repairs at the token level, examining individual tokens and their
          relationship to surrounding tokens.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium">Token Analysis Example:</p>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Token</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Issue</th>
                <th className="px-4 py-2 text-left">Repair</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">{`name`}</td>
                <td className="px-4 py-2">Identifier</td>
                <td className="px-4 py-2">Should be string</td>
                <td className="px-4 py-2">Add quotes: <span className="font-mono">&quot;name&quot;</span></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">{`'value'`}</td>
                <td className="px-4 py-2">String (wrong quotes)</td>
                <td className="px-4 py-2">Single quotes used</td>
                <td className="px-4 py-2">Convert to: <span className="font-mono">&quot;value&quot;</span></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">{`[1, 2, 3,]`}</td>
                <td className="px-4 py-2">Array</td>
                <td className="px-4 py-2">Trailing comma</td>
                <td className="px-4 py-2">Remove comma: <span className="font-mono">[1, 2, 3]</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Structural Analysis</h3>
        <p>
          By analyzing the overall structure, formatters can make educated guesses about the intended hierarchy.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium">Structural Repair Example:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Before correction - Obvious nesting issue
{
  "user": {
    "name": "Bob",
    "email": "bob@example.com"
  "settings": {
    "theme": "dark"
  }
}

// After correction - Fixed by analyzing structure
{
  "user": {
    "name": "Bob",
    "email": "bob@example.com"
  },
  "settings": {
    "theme": "dark"
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Advanced Error Correction Features</h2>

        <h3 className="text-xl font-medium mt-6">1. JavaScript Object to JSON Conversion</h3>
        <p>
          Some formatters can recognize JavaScript object literal syntax and convert it to valid JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">JavaScript Object:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  name: "Product",
  price: 29.99,
  inStock: true,
  tags: ['electronics', 'featured']
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Converted to Valid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "Product",
  "price": 29.99,
  "inStock": true,
  "tags": ["electronics", "featured"]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Comment Handling</h3>
        <p>
          While JSON doesn&apos;t support comments, smart formatters can strip comments before validation
          or maintain them in special ways.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">JSON with Comments:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  // User configuration
  "userId": 123,
  "preferences": {
    /* These are default settings
       that can be overridden */
    "language": "en"
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Processed for Standard JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "userId": 123,
  "preferences": {
    "language": "en"
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Data Type Inference</h3>
        <p>
          Advanced formatters can infer and correct data types based on the values.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">Before Type Correction:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "id": "42",
  "active": "true",
  "ratio": "0.75"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Type Inference:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "id": 42,
  "active": true,
  "ratio": 0.75
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">The formatter recognized that these strings looked like numbers and booleans and converted them to the appropriate types.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Risks and Limitations of Automatic Correction</h2>

        <h3 className="text-xl font-medium mt-6">1. Ambiguous Repairs</h3>
        <p>
          Some errors can have multiple valid fixes, and the formatter might choose one that doesn&apos;t match your intent.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-medium">Ambiguous Example:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "items": [
    "apple"
    "banana"
    "orange"
  ]
}`}
            </pre>
          </div>
          <p className="mt-2">This could be fixed by:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Adding commas between items (most likely intended)</li>
            <li>Converting to a single string with line breaks (less likely but valid)</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Data Loss Risk</h3>
        <p>
          In some cases, automated fixes might result in data loss if the error is significant.
        </p>

        <h3 className="text-xl font-medium mt-6">3. False Sense of Correctness</h3>
        <p>
          Automatic repairs might make the JSON syntactically valid but semantically wrong
          for your specific application requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Best Practices When Using Smart Formatters</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Always review corrections</strong> - Don&apos;t blindly accept automatic fixes, especially for critical data
          </li>
          <li>
            <strong>Use diff views</strong> - Choose formatters that show you exactly what changed
          </li>
          <li>
            <strong>Validate semantically</strong> - After syntax fixes, verify the data still makes sense for your application
          </li>
          <li>
            <strong>Understand correction logic</strong> - Be familiar with how your formatter makes decisions about repairs
          </li>
          <li>
            <strong>Keep backups</strong> - Retain the original JSON before applying automatic corrections
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">When to Use Automatic Correction</h2>

        <h3 className="text-xl font-medium mt-6">Appropriate Scenarios:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>During development and debugging</li>
          <li>When working with user-generated content</li>
          <li>For quick prototyping and data exploration</li>
          <li>When the JSON structure is simple and the errors are minor</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">When to Avoid:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mission-critical production data</li>
          <li>Financial or medical records</li>
          <li>When precise data fidelity is required</li>
          <li>Complex nested structures with multiple errors</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Smart JSON formatters with automatic error correction can significantly improve productivity
          by fixing common syntax errors without manual intervention. However, it&apos;s important to
          understand how these tools work, review their corrections, and know when to rely on them versus
          when to fix errors manually. The best approach is to use these intelligent formatters as 
          helpful assistants rather than infallible authorities on your JSON data.
        </p>
      </div>
    </>
  );
} 