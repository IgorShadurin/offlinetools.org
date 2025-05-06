import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resolving Unicode Character Issues in JSON Documents | Offline Tools",
  description:
    "Learn how to identify, troubleshoot, and fix Unicode character problems in your JSON data for error-free parsing and display.",
};

export default function ResolvingUnicodeIssuesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Resolving Unicode Character Issues in JSON Documents</h1>

      <div className="space-y-6">
        <p>
          JSON documents frequently contain text in multiple languages, symbols, emojis, and special characters.
          Handling these Unicode characters correctly is essential for data integrity, but it&apos;s also a common
          source of parsing errors and display problems. This article explores how to identify, troubleshoot, and
          resolve Unicode-related issues in your JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding Unicode in JSON</h2>
        <p>
          The JSON specification (RFC 8259) requires that JSON text be encoded in Unicode, with UTF-8 being the default
          encoding. Here&apos;s what you need to know about Unicode in JSON:
        </p>

        <h3 className="text-xl font-medium mt-6">Unicode Basics</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unicode assigns a unique code point to every character, regardless of language or symbol system</li>
          <li>Code points are typically written as U+XXXX (e.g., U+00A9 for the copyright symbol ©)</li>
          <li>UTF-8 is a variable-width encoding that represents each Unicode code point as 1-4 bytes</li>
          <li>JSON strings may contain any Unicode character except for a few control characters</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">Unicode Escape Sequences</h3>
        <p>JSON allows two ways to represent Unicode characters:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Direct embedding</strong> - Including the actual character directly in the string
          </li>
          <li>
            <strong>Escape sequences</strong> - Using the <code>\uXXXX</code> notation to represent a character by its
            code point
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example of Unicode in JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "direct": "Hello, 世界! 😊",
  "escaped": "Hello, \\u4e16\\u754c! \\ud83d\\ude0a"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Both &quot;direct&quot; and &quot;escaped&quot; strings are identical when parsed.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Unicode Issues in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Encoding Mismatches</h3>
        <p>
          One of the most common issues occurs when the character encoding of the JSON document doesn&apos;t match what
          the parser expects:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problem Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON saved in Windows-1252 encoding but parsed as UTF-8
{
  "name": "François Müller"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Result: Characters like &quot;ç&quot; and &quot;ü&quot; may appear as &quot;Ã§&quot; and &quot;Ã¼&quot; or
            cause parsing errors.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Invalid Escape Sequences</h3>
        <p>Improperly formatted Unicode escape sequences will cause parsing errors:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problem Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "text": "Star symbol: \\u2605"   // Valid
  "text2": "Star symbol: \\u26"     // Invalid - incomplete
  "text3": "Star symbol: \\u260G"   // Invalid - not a hex sequence
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Error: Invalid Unicode escape sequence</p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Surrogate Pair Issues</h3>
        <p>Some Unicode characters (like many emojis) require two \u escape sequences called surrogate pairs:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problem Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "correct": "Thumbs up: \\ud83d\\udc4d",  // Complete surrogate pair
  "incorrect": "Thumbs up: \\ud83d"         // Incomplete surrogate pair
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Error: Incomplete Unicode surrogate pair</p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Byte Order Mark (BOM)</h3>
        <p>Some text editors add an invisible BOM character at the beginning of UTF-8 files:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problem:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// File begins with an invisible BOM (U+FEFF)
{
  "key": "value"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Error: Unexpected token at the start of the JSON file</p>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Control Characters</h3>
        <p>JSON doesn&apos;t allow unescaped control characters (U+0000 through U+001F):</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problem Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "text": "Line 1↵Line 2"  // Where ↵ is the actual newline character
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Error: Control characters must be escaped</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            While JSON requires control characters to be escaped, it allows for newlines, tabs, and other whitespace
            characters to appear unescaped outside string values, i.e., for formatting the JSON itself.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Diagnosing Unicode Issues</h2>

        <h3 className="text-xl font-medium mt-6">1. Recognizing Unicode-Related Errors</h3>
        <p>Look for these common error messages, which often indicate Unicode problems:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>&quot;Invalid UTF-8 character&quot; or &quot;Invalid UTF-8 sequence&quot;</li>
          <li>&quot;Invalid Unicode escape sequence&quot;</li>
          <li>&quot;Unexpected token&quot; at the beginning of the file (possible BOM issue)</li>
          <li>&quot;Unterminated string&quot; (when a multi-byte character is corrupted mid-sequence)</li>
          <li>&quot;Invalid control character&quot; (for unescaped control characters)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">2. Examining the Raw Data</h3>
        <p>To diagnose Unicode issues, sometimes you need to look at the raw bytes:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Tools for Examining Raw Data:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a hex editor to view the actual bytes</li>
            <li>
              Command-line tools like <code>xxd</code> or <code>hexdump</code>
            </li>
            <li>Encoding detection tools that analyze file contents</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Finding Character Encoding Issues</h3>
        <p>Look for these telltale signs of encoding problems:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Characters displaying as two or more incorrect characters</li>
          <li>Question marks or replacement characters () appearing</li>
          <li>Asian, Cyrillic or other non-Latin scripts appearing as gibberish</li>
          <li>Latin characters with accents displaying incorrectly</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Solving Unicode Issues in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Fixing Encoding Mismatches</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Solution Steps:</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Identify the current encoding of your JSON file</li>
            <li>Use a text editor or tool that supports encoding conversion</li>
            <li>Save or convert the file to UTF-8 without BOM</li>
            <li>Verify the conversion by checking special characters</li>
          </ol>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre>
              {`# Using iconv to convert encoding (Linux/Mac)
iconv -f ISO-8859-1 -t UTF-8 input.json > output.json

# Using PowerShell (Windows)
Get-Content -Encoding Latin1 -Path input.json | Set-Content -Encoding UTF8 -Path output.json`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Properly Escaping Unicode Characters</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Solution:</h3>
          <p className="mt-2">When manually creating JSON with Unicode characters, ensure proper escaping:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre>
              {`// JavaScript example
const data = {
  message: "Hello, 世界! 😊"
};

// Properly escaped JSON
const json = JSON.stringify(data);
console.log(json);
// eslint-disable-next-line react/no-unescaped-entities
// Output: {&quot;message&quot;:&quot;Hello, 世界!&quot;}

// With forced escaping for transport/debugging
const escapedJson = JSON.stringify(data, null, 2).replace(
  /[\u007F-\uFFFF]/g, 
  char => '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4)
);
// eslint-disable-next-line react/no-unescaped-entities
console.log(escapedJson);
/* Output:
{
  &#34;message&#34;: &#34;Hello, \\u4e16\\u754c! \\ud83d\\ude0a&#34;
}
*/`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Removing the BOM</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Solution:</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Save files as &quot;UTF-8 without BOM&quot; in your text editor</li>
            <li>Or use tools to strip the BOM from existing files</li>
          </ol>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre>
              {`# Using sed to remove BOM (Linux/Mac)
sed '1s/^\\xEF\\xBB\\xBF//' input.json > output.json

# Using PowerShell (Windows)
(Get-Content input.json -Raw).Replace("\\ufeff", "") | Set-Content output.json -NoNewline`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Handling Control Characters</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Solution:</h3>
          <p className="mt-2">Always escape control characters in JSON strings:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre>
              {`// Common escaped control characters
"\\n"    // Line feed
"\\r"    // Carriage return
"\\t"    // Tab
"\\b"    // Backspace
"\\f"    // Form feed

// Example of properly escaped multi-line text in JSON
{
  "multilineText": "Line 1\\nLine 2\\nLine 3"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Ensuring Proper Surrogate Pairs</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Solution:</h3>
          <p className="mt-2">
            When manually creating JSON with characters outside the Basic Multilingual Plane (BMP), ensure surrogate
            pairs are complete:
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-4">
            <pre>
              {`// Using a proper JSON serializer handles surrogate pairs automatically
const data = { emoji: "🚀" };
const json = JSON.stringify(data);
console.log(json);  // {&quot;emoji&quot;:&quot;an emoji&quot;}

// Manual inspection of the escaped sequence:
console.log(JSON.stringify(data.emoji).slice(1, -1));  // &#34;\\ud83d\\ude80&#34;`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Unicode in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Always Use UTF-8 Encoding</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Configure your editor to default to UTF-8 without BOM</li>
          <li>
            Specify UTF-8 in HTTP Content-Type headers (<code>application/json; charset=utf-8</code>)
          </li>
          <li>Add encoding declarations in HTML/XML files that embed JSON</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">2. Use JSON Libraries Instead of Manual Escaping</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Let language-standard JSON libraries handle Unicode escaping</li>
          <li>Avoid manual string concatenation to build JSON</li>
          <li>Use proper JSON serializers/deserializers in your programming language</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">3. Validate Before Transmitting or Storing</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Validate JSON syntax including Unicode handling</li>
          <li>Consider normalizing text using Unicode normalization (NFC or NFD)</li>
          <li>Test with full international character sets if your application is multilingual</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">4. Sanitize User Input</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be cautious with user-provided strings that may contain control characters</li>
          <li>Consider normalizing or sanitizing text before encoding to JSON</li>
          <li>Be especially careful with data coming from legacy systems with different encodings</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Table for Common Unicode Issues</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 text-left">Symptom</th>
                <th className="p-2 text-left">Likely Cause</th>
                <th className="p-2 text-left">Solution</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Accented characters appear as multiple characters</td>
                <td className="p-2">UTF-8 interpreted as different encoding</td>
                <td className="p-2">Convert the document to UTF-8 correctly</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Error at start of file with no visible problem</td>
                <td className="p-2">Byte Order Mark (BOM) present</td>
                <td className="p-2">Remove the BOM or save as &quot;UTF-8 without BOM&quot;</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Invalid Unicode escape sequence</td>
                <td className="p-2">Malformed \u escape sequence</td>
                <td className="p-2">Ensure each \u is followed by exactly 4 hex digits</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Emojis or certain characters broken in output</td>
                <td className="p-2">Incomplete surrogate pairs</td>
                <td className="p-2">Let JSON libraries handle encoding or ensure complete pairs</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Control character errors</td>
                <td className="p-2">Unescaped newlines/tabs in strings</td>
                <td className="p-2">Use \n, \t, etc. for control characters in strings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Unicode support in JSON is robust, but encoding issues, escape sequence errors, and improper handling of
          special characters can lead to frustrating parsing problems. By understanding how Unicode works in JSON,
          recognizing common issues, and implementing the solutions outlined in this article, you can ensure your JSON
          documents handle international text correctly and reliably.
        </p>

        <p>
          Remember that prevention is key—using the right tools, consistently applying UTF-8 encoding, and letting
          established JSON libraries handle the serialization will help you avoid most Unicode-related issues. When
          problems do occur, a methodical approach to diagnosis and the targeted solutions provided here will help you
          resolve them quickly.
        </p>
      </div>
    </>
  );
}
