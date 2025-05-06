import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about recovering corrupted JSON files
 */
export const metadata: Metadata = {
  title: "When Good JSON Goes Bad: Recovering Corrupted JSON Files | Offline Tools",
  description:
    "Learn effective strategies and techniques for recovering corrupted JSON files and salvaging valuable data from damaged JSON documents.",
};

/**
 * Article page component for JSON formatter article about recovering corrupted JSON files
 */
export default function JsonFormatterCorruptedFilesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">When Good JSON Goes Bad: Recovering Corrupted JSON Files</h1>

      <div className="space-y-6">
        <p>
          JSON files can become corrupted for various reasons—network transmission errors, disk write failures,
          application crashes, or even human editing mistakes. When your once-perfect JSON breaks, it doesn&apos;t
          always mean your data is lost forever. With the right approach, you can often recover valuable information
          from corrupted JSON files.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Causes of JSON Corruption</h2>
        <p>Understanding how your JSON became corrupted can help you adopt the right recovery strategy:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Truncated Files</strong>: Sudden application termination or disk space issues can leave JSON files
            incomplete.
          </li>
          <li>
            <strong>Transmission Errors</strong>: Network interruptions can cause partial or garbled JSON reception.
          </li>
          <li>
            <strong>Encoding Problems</strong>: Character encoding mismatches can introduce invalid bytes into the
            document.
          </li>
          <li>
            <strong>Syntax Errors</strong>: Manual edits without proper validation often lead to syntax errors.
          </li>
          <li>
            <strong>Invalid Modifications</strong>: Programmatic changes that don&apos;t respect JSON structure.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Signs of JSON Corruption</h2>

        <p>Before attempting recovery, it&apos;s important to recognize the symptoms of corrupted JSON:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Error Messages</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"Unexpected end of JSON input"
"Invalid character in JSON"
"Expected property name"
"Unexpected token < in JSON"
"SyntaxError: JSON.parse: unexpected character"
"Unexpected end of file"`}
          </pre>
        </div>

        <p>
          Visual inspection may also reveal obvious issues like HTML tags in your JSON (indicating a server returned an
          error page instead of JSON), text truncation, or visible binary characters.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Essential Recovery Strategies</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">1. Check for Backups First</h3>
          <p>Before diving into repair techniques, always check for backups or version history:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Source control systems (Git, SVN)</li>
            <li>Automated backups</li>
            <li>Browser cache (for downloaded files)</li>
            <li>Application-specific recovery features</li>
          </ul>

          <h3 className="text-xl font-medium">2. Use JSON Formatters with Error Correction</h3>
          <p>Quality JSON formatters can automatically fix minor syntax issues:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Missing or extra commas</li>
            <li>Unquoted property names</li>
            <li>Single quotes instead of double quotes</li>
            <li>Trailing commas in arrays or objects</li>
          </ul>

          <h3 className="text-xl font-medium">3. Manual Repair Techniques</h3>
          <p>For more serious corruption, manual intervention is often necessary:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Identify and fix structural issues (mismatched brackets, braces)</li>
            <li>Correct property-value pair syntax</li>
            <li>Address encoding problems</li>
            <li>Reconstruct missing sections</li>
          </ul>

          <h3 className="text-xl font-medium">4. Partial Data Extraction</h3>
          <p>When complete recovery isn&apos;t possible, focus on salvaging the most critical data:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Extract valid subsections of the JSON</li>
            <li>Rebuild the document structure around recovered data</li>
            <li>Use regular expressions to extract key-value pairs from damaged sections</li>
          </ul>

          <h3 className="text-xl font-medium">5. Specialized Recovery Tools</h3>
          <p>For severe corruption, dedicated tools and libraries can help:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>JSON repair libraries</li>
            <li>Relaxed JSON parsers</li>
            <li>Binary recovery tools (for file system corruption)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Step-by-Step JSON Recovery Process</h2>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Create a Backup</strong>
            <p className="mt-1">Always work with a copy of the corrupted file to prevent further damage.</p>
          </li>

          <li>
            <strong>Visual Inspection</strong>
            <p className="mt-1">Open the file in a text editor with syntax highlighting to identify obvious issues.</p>
          </li>

          <li>
            <strong>Validate with a JSON Formatter</strong>
            <p className="mt-1">Use a JSON formatter with error detection to identify specific syntax problems.</p>
          </li>

          <li>
            <strong>Fix Structural Issues</strong>
            <p className="mt-1">Address mismatched brackets, braces, and quote marks first.</p>
          </li>

          <li>
            <strong>Correct Property-Value Syntax</strong>
            <p className="mt-1">Ensure all property names are quoted and separators (colons, commas) are correct.</p>
          </li>

          <li>
            <strong>Handle Special Characters</strong>
            <p className="mt-1">Fix escape sequences and encoding issues.</p>
          </li>

          <li>
            <strong>Incremental Testing</strong>
            <p className="mt-1">Validate after each significant change to avoid introducing new errors.</p>
          </li>
        </ol>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            For critical data, consider consulting with a data recovery specialist if these techniques don&apos;t work.
            Professional recovery services can sometimes recover data from severely corrupted files using specialized
            techniques.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Practical Recovery Examples</h2>

        <h3 className="text-xl font-medium mt-6">Example 1: Truncated JSON File</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Truncated JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Doe",`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovery Strategy:</h4>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li>Identify the structure: This is a users array with objects</li>
            <li>Complete the truncated object</li>
            <li>Close the array and main object</li>
          </ol>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovered JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Doe"
    }
  ]
}`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">Example 2: Syntax Errors from Manual Editing</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Corrupted JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  server_config: {
    'host': 'api.example.org',
    port: 443,
    timeout: 30s,
    retry: true,
    auth: {
      type: "oauth",
      credentials: {
        "client_id": "abc123",
        "client_secret": "xyz789"
      },
    }
  }
}`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Issues to Fix:</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Unquoted property names</li>
            <li>Single quotes instead of double quotes</li>
            <li>Invalid value (30s should be &quot;30s&quot; or 30)</li>
            <li>Extra comma after nested object</li>
          </ul>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovered JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "server_config": {
    "host": "api.example.org",
    "port": 443,
    "timeout": 30,
    "retry": true,
    "auth": {
      "type": "oauth",
      "credentials": {
        "client_id": "abc123",
        "client_secret": "xyz789"
      }
    }
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">Example 3: Encoding Problems</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Corrupted JSON with Encoding Issues:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "product": "Premium Café Set",
  "price": 299.99,
  "description": "Artisanal café table and chairs with genuine wood.",
  "inStock": true,
  "dimensions": {
    "table": "120cm × 80cm × 75cm",
    "chairs": "45cm × 45cm × 90cm"
  }
}`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Issues to Fix:</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Non-ASCII characters (é, ×) may cause encoding problems</li>
          </ul>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovered JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "product": "Premium Cafe Set",
  "price": 299.99,
  "description": "Artisanal cafe table and chairs with genuine wood.",
  "inStock": true,
  "dimensions": {
    "table": "120cm x 80cm x 75cm",
    "chairs": "45cm x 45cm x 90cm"
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Advanced Recovery Techniques</h2>

        <h3 className="text-xl font-medium">Using Regular Expressions for Data Extraction</h3>

        <p>When JSON is severely corrupted, you can use regular expressions to extract key-value pairs:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Regular Expression Pattern:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"([^"]+)"\\s*:\\s*"([^"]*)"  // For string values
"([^"]+)"\\s*:\\s*([0-9\\.]+)  // For numeric values`}
          </pre>
          <p className="mt-2 text-sm">
            These patterns can extract property names and values even from severely damaged JSON.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Incremental Validation</h3>

        <p>For complex JSON, validate sections incrementally:</p>

        <ol className="list-decimal pl-6 space-y-1">
          <li>Split the document into logical sections</li>
          <li>Validate and fix each section separately</li>
          <li>Recombine the fixed sections</li>
          <li>Validate the entire document</li>
        </ol>

        <h3 className="text-xl font-medium mt-6">Using Relaxed JSON Parsers</h3>

        <p>Some libraries and tools offer &quot;relaxed&quot; or &quot;forgiving&quot; JSON parsing that can handle:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Comments in JSON</li>
          <li>Trailing commas</li>
          <li>Unquoted property names</li>
          <li>Single quotes</li>
          <li>Hexadecimal numbers</li>
        </ul>

        <p className="mt-2">
          These tools can be valuable for initial recovery, though you&apos;ll need to convert back to standard JSON
          eventually.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Preventing JSON Corruption</h2>

        <p>The best recovery strategy is prevention:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Validate Before Saving</strong>: Always validate JSON before writing to disk or transmitting.
          </li>
          <li>
            <strong>Use Transaction-like Writes</strong>: Write to temporary files first, then rename/move them to the
            final location.
          </li>
          <li>
            <strong>Implement Backups</strong>: Maintain regular backups of important JSON data.
          </li>
          <li>
            <strong>Version Control</strong>: Store configuration and data files in version control systems.
          </li>
          <li>
            <strong>Schema Validation</strong>: Use JSON Schema to validate document structure before accepting it.
          </li>
          <li>
            <strong>Error Handling</strong>: Implement robust error handling for JSON parsing operations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>

        <p>
          While corrupted JSON can be frustrating, it&apos;s often recoverable with the right approach. By understanding
          common corruption patterns and applying systematic recovery techniques, you can salvage valuable data even
          from severely damaged JSON files.
        </p>

        <p>
          Remember that prevention is always better than recovery. Implementing good practices like validation, backups,
          and version control will minimize the likelihood of dealing with corrupted JSON in the first place.
        </p>

        <p>
          Whether you&apos;re dealing with truncated files, syntax errors, or encoding problems, the structured approach
          outlined in this article will help you recover your JSON data and get your applications back on track.
        </p>
      </div>
    </>
  );
}
