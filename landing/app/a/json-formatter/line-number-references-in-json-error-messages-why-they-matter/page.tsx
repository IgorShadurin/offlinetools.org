import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Line Number References in JSON Error Messages: Why They Matter | Offline Tools",
  description:
    "Learn why line number references in JSON error messages are crucial for efficient debugging and how to use them to quickly fix syntax errors.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Line Number References in JSON Error Messages: Why They Matter</h1>

      <div className="space-y-6">
        <p>
          When working with JSON data, encountering syntax errors is inevitable. What distinguishes a frustrating
          debugging experience from an efficient one often comes down to the quality of error messages—specifically
          whether they include accurate line number references. This article explores why line number references in JSON
          error messages are so valuable and how to leverage them to quickly resolve syntax issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Line Numbers Are Critical for JSON Debugging</h2>
        <p>
          JSON files can range from a few lines to thousands of lines of structured data. When an error occurs, knowing
          exactly where to look can save considerable time and effort.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Consider these two error messages:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
              {`// Without line numbers:
SyntaxError: Unexpected token , in JSON at position 392`}
            </pre>
          </div>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre className="text-red-600 dark:text-red-400">
              {`// With line numbers:
SyntaxError: Unexpected token ',' at line 15, column 22 in JSON`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The second error message immediately directs you to line 15, drastically reducing search time in a large
            file.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How JSON Parsers Calculate Line Numbers</h2>
        <p>Different JSON parsers use various approaches to track line and column information during parsing:</p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Tokenization with position tracking</strong> - As the parser reads through the JSON text, it keeps
            track of line breaks and calculates current line and column positions
          </li>
          <li>
            <strong>Character counting</strong> - Some parsers count characters from the start and then calculate lines
            and columns when an error occurs
          </li>
          <li>
            <strong>Pre-scanning</strong> - Some advanced parsers pre-scan the document to build an index of line
            positions before actual parsing begins
          </li>
        </ol>

        <h3 className="text-xl font-medium mt-6">How Position Gets Converted to Line Numbers</h3>
        <p>
          When a parser reports an error at a specific character position (e.g., "at position 392"), you can convert
          this to a line number:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">
            Position to Line Number Conversion:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example to convert character position to line/column
function positionToLineColumn(jsonString, position) {
  const lines = jsonString.substring(0, position).split('\\n');
  const lineNumber = lines.length;
  const columnNumber = lines[lines.length - 1].length + 1;
  
  return { line: lineNumber, column: columnNumber };
}

// Usage
const json = '{"name": "John",\\n"age": 30,\\n"city": "New York"}';
const errorPosition = 24; // Example error position
const location = positionToLineColumn(json, errorPosition);
console.log(\`Error at line \${location.line}, column \${location.column}\`);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This function counts newlines before the error position to determine the line number, and then calculates
            the column number within that line.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Line Number References Across Different Environments</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error Message Formats by Environment:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Environment</th>
                <th className="px-4 py-2 text-left">Typical Error Format</th>
                <th className="px-4 py-2 text-left">Line Number Included?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Modern Browsers</td>
                <td className="px-4 py-2 font-mono">SyntaxError: Unexpected token in JSON at position 392</td>
                <td className="px-4 py-2">No, only position</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Node.js</td>
                <td className="px-4 py-2 font-mono">SyntaxError: Unexpected token in JSON at position 392</td>
                <td className="px-4 py-2">No, only position</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Python (json)</td>
                <td className="px-4 py-2 font-mono">JSONDecodeError: Expecting ',' delimiter: line 15 column 22</td>
                <td className="px-4 py-2">Yes, line and column</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">JSON Linters</td>
                <td className="px-4 py-2 font-mono">Error: Parse error on line 15: Unexpected ','</td>
                <td className="px-4 py-2">Yes, typically with visual indicators</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">IDEs/Code Editors</td>
                <td className="px-4 py-2 font-mono">
                  JSON validation: Expected ',' or '&rbrace;' at line 15, column 22
                </td>
                <td className="px-4 py-2">Yes, with in-editor highlighting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Even when parsers report only character positions, you can still derive line numbers using the code example
            above. For critical JSON processing, consider using tools that provide line number references natively.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JSON Errors and Their Line References</h2>

        <h3 className="text-xl font-medium mt-6">1. Missing Commas</h3>
        <p>A frequent JSON syntax error is a missing comma between elements.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "John"  // Missing comma here
  "age": 30,
  "city": "New York"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Typical Error Message:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
              {`SyntaxError: Expected ',' or '}' after property value in JSON at line 2, column 16`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The line number points to where the comma should be (end of line 2), making it easy to locate and fix.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Unmatched Brackets/Braces</h3>
        <p>
          Mismatched or missing brackets and braces are common but can be difficult to locate without line references.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "person": {
    "name": "Alice",
    "details": {
      "age": 28,
      "occupation": "Developer"
    // Missing closing brace for "details" object
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Typical Error Message:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
              {`SyntaxError: Expected ',' or '}' after property value in JSON at line 7, column 4`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The line number reference helps identify where the closing brace is missing, though the error might be
            reported at a different location than where the brace should be.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Invalid Property Names</h3>
        <p>Property names in JSON must be strings, enclosed in double quotes.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  name: "Sarah",  // Missing quotes around property name
  "age": 35,
  "city": "Boston"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Typical Error Message:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
              {`SyntaxError: Expected property name enclosed in double quotes at line 2, column 3`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The line and column references point directly to where quotes are missing, making the error easy to fix.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Enhancing JSON Error Messages with Line Numbers</h2>

        <h3 className="text-xl font-medium mt-6">1. Creating User-Friendly Error Messages</h3>
        <p>If you&apos;re developing tools that process JSON, consider enhancing error messages with context:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Enhanced Error Handling:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function parseJSONWithEnhancedErrors(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Extract position if available
      const posMatch = error.message.match(/position (\\d+)/);
      
      if (posMatch) {
        const pos = Number(posMatch[1]);
        const { line, column } = positionToLineColumn(jsonString, pos);
        
        // Get context around the error (showing a few lines)
        const lines = jsonString.split('\\n');
        const contextStart = Math.max(0, line - 2);
        const contextEnd = Math.min(lines.length, line + 2);
        const contextLines = lines.slice(contextStart, contextEnd);
        
        // Add line numbers and highlight the error line
        const contextWithNumbers = contextLines.map((lineText, i) => {
          const lineNumber = contextStart + i + 1;
          const prefix = lineNumber === line ? '> ' : '  ';
          return \`\${prefix}\${lineNumber} | \${lineText}\`;
        }).join('\\n');
        
        // Create enhanced error message
        const enhancedMessage = \`
JSON Syntax Error: \${error.message}
Location: Line \${line}, Column \${column}

\${contextWithNumbers}
\`;
        
        // Create a new error with enhanced message
        const enhancedError = new SyntaxError(enhancedMessage);
        enhancedError.line = line;
        enhancedError.column = column;
        throw enhancedError;
      }
    }
    
    // If we couldn't enhance the error, just rethrow it
    throw error;
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Visual Error Indicators</h3>
        <p>Advanced JSON formatters and linters often provide visual cues to help pinpoint errors:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Visual Error Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Line 8, Column 3: Expected ',' or '}' after property value

  6 |   "details": {
  7 |     "age": 28
> 8 |     "occupation": "Developer"
    |     ^
  9 |   }
 10 | }`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The caret (^) points directly to where the error was detected, making it immediately obvious what needs to
            be fixed.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Strategies for Debugging JSON Using Line Numbers</h2>

        <h3 className="text-xl font-medium mt-6">1. Incremental Validation</h3>
        <p>When working with large JSON files, use line number references to divide and conquer:</p>

        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>Note the line number from the error message</li>
          <li>Extract a small section of JSON around that line</li>
          <li>Validate the small section in isolation</li>
          <li>Fix the issue and reinsert the corrected section</li>
          <li>Validate the full JSON again</li>
        </ol>

        <h3 className="text-xl font-medium mt-6">2. Using Line Numbers for Structural Analysis</h3>
        <p>Line numbers can help identify structural issues in JSON documents:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Structural Analysis Technique:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>If an error occurs at line N, look at the indentation pattern</li>
            <li>Check the opening and closing delimiters ({`{}, [], ""`}) at the same level of indentation</li>
            <li>Follow the structure both forward and backward from the error line</li>
            <li>Pay attention to parent objects and arrays that contain the error location</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Line-by-Line Linting</h3>
        <p>Modern IDEs and specialized JSON tools provide line-by-line linting with real-time feedback:</p>

        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>VS Code, IntelliJ, and other editors highlight JSON errors with squiggly lines</li>
          <li>Hovering over errors shows the full error message with line/column information</li>
          <li>JSON linters can be integrated into CI/CD pipelines to catch errors early</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for JSON Error Handling with Line Numbers</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Always use tools that provide line number references</strong> for JSON validation and formatting
          </li>
          <li>
            <strong>Document line number formats</strong> in your error handling guide for developers
          </li>
          <li>
            <strong>Implement error recovery strategies</strong> based on error locations
          </li>
          <li>
            <strong>Consider parsing in strict mode</strong> where available to get more precise error locations
          </li>
          <li>
            <strong>Maintain proper indentation and formatting</strong> to make line numbers more useful
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">JSON Tools with Excellent Line Number References:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>JSONLint</strong> - Online validator with clear line and column references
            </li>
            <li>
              <strong>jq</strong> - Command-line JSON processor with detailed error locations
            </li>
            <li>
              <strong>VS Code with JSON Language Server</strong> - Real-time validation with hover details
            </li>
            <li>
              <strong>Python&apos;s json module</strong> - Provides both line and column in error messages
            </li>
            <li>
              <strong>Offline JSON Formatter tool</strong> - Our tool provides precise error locations with visual
              indicators
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Line number references in JSON error messages are more than just a convenience—they are essential for
          efficient debugging and error resolution. By understanding how to interpret these references and using tools
          that provide detailed location information, you can dramatically reduce the time spent tracking down syntax
          errors in your JSON documents.
        </p>
        <p className="mt-4">
          When selecting JSON processing tools for your workflow, prioritize those that provide clear, actionable error
          messages with precise line and column references. This small detail can make a significant difference in
          development efficiency, especially when working with complex or large JSON structures.
        </p>
      </div>
    </>
  );
}
