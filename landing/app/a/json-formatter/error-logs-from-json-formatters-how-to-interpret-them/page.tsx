import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Error Logs from JSON Formatters: How to Interpret Them | Offline Tools",
  description: "Decipher complex error logs from JSON formatters and learn how to quickly resolve the underlying issues in your JSON documents.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Error Logs from JSON Formatters: How to Interpret Them</h1>

      <div className="space-y-6">
        <p>
          When working with JSON data, encountering error messages from JSON formatters and validators
          is common. These error logs might initially seem cryptic, but they contain valuable information
          that can help you quickly identify and fix issues in your JSON documents. This article will help you
          interpret these error messages and resolve the underlying problems efficiently.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common JSON Error Log Formats</h2>
        <p>
          Different JSON formatters and parsers generate error messages in various formats, but most include similar key pieces of information.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Typical Error Log Components:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-left">Example</th>
                <th className="px-4 py-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Error Type</td>
                <td className="px-4 py-2 font-mono">SyntaxError</td>
                <td className="px-4 py-2">Categorizes the nature of the error</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Error Message</td>
                <td className="px-4 py-2 font-mono">Unexpected token {'}'}' in JSON at position 42</td>
                <td className="px-4 py-2">Describes what went wrong</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Position/Line Number</td>
                <td className="px-4 py-2 font-mono">Line 3, column 15</td>
                <td className="px-4 py-2">Pinpoints the error location</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Context Snippet</td>
                <td className="px-4 py-2 font-mono">&quot;name&quot;: &quot;value&quot;,}</td>
                <td className="px-4 py-2">Shows the problematic section of code</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Expected/Found</td>
                <td className="px-4 py-2 font-mono">Expected &apos;,&apos; or &apos;]&apos; but found &apos;}&apos;</td>
                <td className="px-4 py-2">Explains what the parser expected versus what it found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Decoding Common Error Messages</h2>

        <h3 className="text-xl font-medium mt-6">1. Unexpected Token Errors</h3>
        <p>
          One of the most common error types, &quot;unexpected token&quot; errors, occur when the parser finds a character it wasn&apos;t expecting at a particular position.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400 font-mono">
{`SyntaxError: Unexpected token '}' in JSON at position 42`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "age": 30,
}  // <-- Extra comma before closing brace`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Interpretation:</h4>
          <p>
            This error tells you that the parser found a closing brace (&apos;{`}`}&apos;) at position 42 when it was expecting something else.
            In JSON, trailing commas are not allowed. The parser expected a new key-value pair after the comma but found the closing brace instead.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "age": 30
}  // Removed the trailing comma`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Unexpected End of Input</h3>
        <p>
          This error occurs when the JSON string ends prematurely, often due to unclosed brackets, braces, or quotes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400 font-mono">
{`SyntaxError: Unexpected end of JSON input`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  // Missing closing brace`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Interpretation:</h4>
          <p>
            The parser reached the end of the input but was still expecting more characters to complete 
            the JSON structure. In this case, the document is missing the closing brace for the outer object.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  }
}  // Added two closing braces`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Expected Property Name or &lsquo;}&rsquo;</h3>
        <p>
          This error often occurs when there&apos;s an issue with a property name or a missing closing brace.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400 font-mono">
{`SyntaxError: Expected property name or '}' at line 4, column 3`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "age": 30,
  , // <-- Extra comma
  "city": "New York"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Interpretation:</h4>
          <p>
            The parser found a comma at line 4, column 3, but what should follow a comma is either a property name (for an object) 
            or a closing brace (for an empty object). Instead, it found another comma, which is not valid in JSON syntax.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "age": 30,
  "city": "New York"
}  // Removed the extra comma`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            When you see position numbers in error messages (e.g., &quot;at position 42&quot;), remember that these 
            are zero-indexed character counts from the start of the document. Line and column numbers are typically 
            more intuitive for locating errors in larger JSON files.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Unterminated String</h3>
        <p>
          This error occurs when a string is not properly closed with a matching quotation mark.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400 font-mono">
{`SyntaxError: Unterminated string at line 3, column 24`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "message": "Hello world  // <-- Missing closing quote
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Interpretation:</h4>
          <p>
            The parser reached the end of the line (or file) while processing a string but never found the closing quotation mark.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "message": "Hello world"  // Added closing quote
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Unescaped Control Characters</h3>
        <p>
          JSON has specific rules for including control characters, which must be properly escaped.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400 font-mono">
{`SyntaxError: Bad control character in string literal at line 3, column 21`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Invalid JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "note": "Meeting at
  2pm tomorrow"  // <-- Literal newline in string
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Interpretation:</h4>
          <p>
            In JSON, control characters like newlines must be escaped with a backslash followed by a specific character code.
            Here, a literal newline appears in the string, which is not allowed.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Fix:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "name": "John",
  "note": "Meeting at\\n  2pm tomorrow"  // Used \\n escape sequence
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Error Logs in Different Environments</h2>

        <h3 className="text-xl font-medium mt-6">1. Browser Console</h3>
        <p>
          Browser development tools provide detailed error information when parsing JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Chrome Developer Console Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
{`Uncaught SyntaxError: Unexpected token , in JSON at position 39
    at JSON.parse (<anonymous>)
    at parseJSON (script.js:15:23)
    at processData (script.js:24:12)
    at HTMLButtonElement.onClick (script.js:32:5)`}
            </pre>
          </div>
          <p className="mt-2">
            Browser errors often include a stack trace showing where the error occurred in your code. This helps you trace back to which function or event handler triggered the JSON parsing.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Node.js</h3>
        <p>
          Node.js provides detailed error information similar to browsers but with some differences in formatting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Node.js Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
{`SyntaxError: Unexpected token } in JSON at position 42
    at JSON.parse (<anonymous>)
    at Object.<anonymous> (/path/to/script.js:5:19)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. JSON Validation Tools</h3>
        <p>
          Dedicated JSON validation tools often provide more user-friendly error messages with visual indicators.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">JSON Validator Tool Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`Error: Parse error on line 4:
{
  "name": "John",
  "age": 30,
---------^
Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got ','`}
            </pre>
          </div>
          <p className="mt-2">
            Many JSON validators provide visual indicators like the caret (^) pointing to the exact position of the error,
            making it easier to identify the problem.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Advanced Debugging Techniques</h2>

        <h3 className="text-xl font-medium mt-6">1. Using Diff Views</h3>
        <p>
          When working with large JSON files, using a diff view to compare valid and invalid versions can help identify subtle issues.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Diff View Technique:</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Save a backup of your original JSON</li>
            <li>Make incremental changes and validate after each change</li>
            <li>When you find a working version, compare it with the original using a diff tool</li>
            <li>The highlighted differences will pinpoint the exact issues</li>
          </ol>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Binary Search Method</h3>
        <p>
          For very large JSON files, use a binary search approach to locate errors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Binary Search Approach:</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Split the JSON in half</li>
            <li>Add closing brackets/braces to make each half valid JSON syntax (if needed)</li>
            <li>Validate each half separately</li>
            <li>Continue dividing the invalid section until you isolate the error</li>
          </ol>
          <p className="mt-2">
            This approach can quickly narrow down the location of an error in large JSON files, making it easier to fix.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Incremental Building</h3>
        <p>
          Instead of fixing a broken JSON document, sometimes it&apos;s more efficient to rebuild it from scratch.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Incremental Building Process:</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Start with a minimal valid JSON structure (e.g., {`{}`} or {`[]`})</li>
            <li>Add one section at a time, validating after each addition</li>
            <li>If an error occurs, you&apos;ll know exactly which section caused it</li>
            <li>Continue until you&apos;ve rebuilt the entire document</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Error Patterns and Solutions</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium mb-2">Quick Reference: Common Errors and Fixes</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Error Message Pattern</th>
                <th className="px-4 py-2 text-left">Likely Cause</th>
                <th className="px-4 py-2 text-left">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Unexpected token {`}`}</td>
                <td className="px-4 py-2">Trailing comma</td>
                <td className="px-4 py-2">Remove the trailing comma before closing bracket/brace</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Expected property name or {`}`}</td>
                <td className="px-4 py-2">Malformed property name or extra comma</td>
                <td className="px-4 py-2">Ensure property names are in quotes; check for extra commas</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Unexpected end of input</td>
                <td className="px-4 py-2">Missing closing bracket/brace/quote</td>
                <td className="px-4 py-2">Add the missing closing character</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Unterminated string</td>
                <td className="px-4 py-2">Missing closing quote</td>
                <td className="px-4 py-2">Add the missing quote; check for unescaped quotes inside strings</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Bad control character</td>
                <td className="px-4 py-2">Unescaped newline or other control character</td>
                <td className="px-4 py-2">Use escape sequences (\\n, \\t, etc.) instead of literal control characters</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Duplicate key</td>
                <td className="px-4 py-2">The same property name appears multiple times in an object</td>
                <td className="px-4 py-2">Rename or remove the duplicate keys</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Expected &apos;:&apos; after property name</td>
                <td className="px-4 py-2">Missing colon between property name and value</td>
                <td className="px-4 py-2">Add the missing colon</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Preventing JSON Errors</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Use a linter or validator</strong> during development to catch errors early
          </li>
          <li>
            <strong>Format your JSON properly</strong> with consistent indentation to make it more readable
          </li>
          <li>
            <strong>Generate JSON programmatically</strong> instead of writing it by hand when possible
          </li>
          <li>
            <strong>Use language-specific JSON libraries</strong> (like <code>JSON.stringify()</code> in JavaScript) that handle proper escaping
          </li>
          <li>
            <strong>Implement validation before parsing</strong> in production applications to provide better error messages
          </li>
          <li>
            <strong>Comment your complex JSON structures</strong> (in development versions only, remove for production)
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">JSON Validation Code Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JavaScript example of user-friendly JSON validation
function parseJSON(jsonString) {
  try {
    return {
      data: JSON.parse(jsonString),
      error: null
    };
  } catch (error) {
    let errorMessage = 'Invalid JSON';
    let errorLine = null;
    let errorColumn = null;
    
    // Check if we can extract line/column information
    if (error instanceof SyntaxError) {
      // Example message: "Unexpected token } in JSON at position 42"
      const posMatch = error.message.match(/at position (\\d+)/);
      
      if (posMatch) {
        const pos = Number(posMatch[1]);
        
        // Calculate line and column number from character position
        const upToError = jsonString.substring(0, pos);
        const lines = upToError.split('\\n');
        errorLine = lines.length;
        errorColumn = lines[lines.length - 1].length + 1;
        
        // Extract context around the error for better readability
        const errorContext = jsonString.substring(
          Math.max(0, pos - 20),
          Math.min(jsonString.length, pos + 20)
        );
        
        errorMessage = \`\${error.message}
Line: \${errorLine}, Column: \${errorColumn}
Context: "...\${errorContext}..."\`;
      } else {
        errorMessage = error.message;
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

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Understanding and interpreting error logs from JSON formatters is an essential skill for anyone working
          with JSON data. While the error messages might initially seem cryptic, they provide valuable information
          about the nature and location of syntax issues in your JSON documents.
        </p>
        <p className="mt-4">
          By learning to read these error messages and applying the appropriate fixes, you can quickly resolve
          JSON syntax problems and ensure your data is correctly formatted. As you gain experience, you&apos;ll find
          that most JSON errors fall into predictable patterns with straightforward solutions.
        </p>
        <p className="mt-4">
          Remember that prevention is often easier than cure—using tools like linters, formatters, and
          programmatic JSON generation can help you avoid many common JSON syntax errors before they occur.
        </p>
      </div>
    </>
  );
} 