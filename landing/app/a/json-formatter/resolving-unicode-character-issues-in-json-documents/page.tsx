import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Resolving Unicode Character Issues in JSON Documents | Offline Tools",
  description: "Learn how to identify, troubleshoot, and fix Unicode character problems in your JSON data for error-free parsing and display.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Resolving Unicode Character Issues in JSON Documents</h1>

      <div className="space-y-6">
        <p>
          Unicode characters in JSON documents can create subtle and challenging issues that are difficult to debug. 
          From encoding problems to improper escaping, Unicode-related errors often cause JSON parsing failures that 
          can be frustrating to resolve. This article explores common Unicode issues in JSON and provides practical 
          strategies for identifying and fixing them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding Unicode in JSON</h2>
        <p>
          The JSON specification (ECMA-404 and RFC 8259) fully supports Unicode. However, there are specific rules for 
          how Unicode characters should be represented in JSON strings.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Unicode Representation in JSON:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Direct representation</strong> - Unicode characters can be included directly in JSON strings (e.g., "Hello, 世界")
            </li>
            <li>
              <strong>Escape sequences</strong> - Unicode characters can be represented with escape sequences (e.g., "\u4E16\u754C" for "世界")
            </li>
            <li>
              <strong>Control characters</strong> - Control characters (U+0000 to U+001F) must always be escaped in JSON
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">JSON Encoding Requirements:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            JSON documents must be encoded in UTF-8, UTF-16, or UTF-32. While the specification allows all three, 
            UTF-8 is by far the most commonly used encoding for JSON in practice.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Unicode Issues in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Incorrect Encoding</h3>
        <p>
          Using the wrong character encoding is one of the most common sources of Unicode issues in JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Encoding Problem Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JSON saved with ISO-8859-1 (Latin-1) encoding instead of UTF-8
{
  "name": "Café" // 'é' is encoded differently in ISO-8859-1 vs UTF-8
}

// When parsed with UTF-8 expectation, this can result in:
// SyntaxError: Unexpected token 'C' at position 10`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            When JSON containing non-ASCII characters is saved with the wrong encoding, those characters get misinterpreted during parsing.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Unpaired Surrogate Characters</h3>
        <p>
          Surrogate pairs are used to represent characters outside the Basic Multilingual Plane (BMP) in UTF-16.
          Issues occur when these pairs are improperly split or handled.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Surrogate Pair Issue:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Incorrect: Unpaired high surrogate
{
  "emoji": "\\uD83D"
}

// Correct: Complete surrogate pair for '😀' (U+1F600)
{
  "emoji": "\\uD83D\\uDE00"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Certain characters like emoji require surrogate pairs in UTF-16. Incomplete pairs cause parsing errors.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Byte Order Mark (BOM) Issues</h3>
        <p>
          The Byte Order Mark (BOM) is a special Unicode character that can appear at the beginning of a file to indicate its encoding.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">BOM Issue Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// File starts with a UTF-8 BOM (not visible here, but present in the file)
﻿{
  "property": "value"
}

// This can cause errors like:
// SyntaxError: Unexpected token '' in JSON at position 0`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            While some parsers handle BOMs correctly, others interpret them as part of the JSON content, causing syntax errors.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Escape Sequence Errors</h3>
        <p>
          Improper formatting of Unicode escape sequences is another common issue.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Escape Sequence Errors:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Incorrect: Missing leading zeros (must be 4 hex digits)
{
  "symbol": "\\u3A"
}

// Correct:
{
  "symbol": "\\u003A"
}

// Incorrect: Invalid hexadecimal character
{
  "value": "\\uGHIJ"
}

// Correct (if intended as text): 
{
  "value": "\\\\uGHIJ"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Unicode escape sequences in JSON must be exactly 4 hexadecimal digits. If you want to represent the literal sequence &quot;\uGHIJ&quot;, the backslash itself must be escaped.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Control Characters</h3>
        <p>
          JSON requires that all control characters (U+0000 to U+001F) be escaped with special sequences.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Control Character Issue:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Incorrect: Contains literal newline and tab characters
{
  "description": "First line
  Second line	indented"
}

// Correct: Using escape sequences
{
  "description": "First line\\nSecond line\\tindented"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Literal control characters in JSON strings cause syntax errors. They must be represented with their escape sequences.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Detecting Unicode Issues in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Check Error Messages</h3>
        <p>
          Parse errors related to Unicode issues often have specific characteristics:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Typical Unicode-Related Error Messages:</h4>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Error Message Pattern</th>
                <th className="px-4 py-2 text-left">Likely Unicode Issue</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;Unexpected token &apos;&apos; at position 0&quot;</td>
                <td className="px-4 py-2">BOM or encoding mismatch</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;Invalid Unicode escape sequence&quot;</td>
                <td className="px-4 py-2">Malformed \u escape</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;Unexpected token at position X&quot;</td>
                <td className="px-4 py-2">Character encoding issue</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;Unexpected end of input&quot;</td>
                <td className="px-4 py-2">Unpaired surrogate character</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;Invalid character&quot;</td>
                <td className="px-4 py-2">Control character or invalid byte</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Visual Inspection</h3>
        <p>
          Sometimes, Unicode issues are visible when you examine the JSON:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Look for question marks, boxes, or other placeholder characters that indicate encoding problems</li>
          <li>Watch for &quot;mojibake&quot; (garbled text) where characters don&apos;t display as expected</li>
          <li>Check for unexpected characters at the beginning of the file (potential BOM)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">3. Use Specialized Tools</h3>
        <p>
          Various tools can help identify Unicode issues in JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Helpful Tools:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Hex editors</strong> - Show the actual byte values, revealing encoding issues
            </li>
            <li>
              <strong>Encoding detectors</strong> - Tools like chardet (Python) can identify the actual encoding used
            </li>
            <li>
              <strong>Unicode inspectors</strong> - Display detailed information about each character
            </li>
            <li>
              <strong>JSON validators</strong> - Many provide specific Unicode-related error messages
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Resolving Unicode Issues in JSON</h2>

        <h3 className="text-xl font-medium mt-6">1. Fix Encoding Issues</h3>
        <p>
          Ensure your JSON is saved with the correct encoding:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Node.js example to read and save with explicit UTF-8 encoding
const fs = require('fs');

// Reading with explicit encoding
const jsonString = fs.readFileSync('data.json', 'utf8');

// Process the JSON...
const data = JSON.parse(jsonString);

// Save with explicit UTF-8 encoding
fs.writeFileSync('fixed.json', JSON.stringify(data, null, 2), 'utf8');`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Handle BOMs Correctly</h3>
        <p>
          If your JSON files have a BOM, you can either remove it or ensure your parser handles it:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">BOM Removal Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JavaScript: Remove BOM if present
function removeBOM(str) {
  if (str.charCodeAt(0) === 0xFEFF) {
    return str.slice(1);
  }
  return str;
}

// Read JSON from file
const jsonWithBOM = fs.readFileSync('data.json', 'utf8');
const jsonWithoutBOM = removeBOM(jsonWithBOM);

// Now parse
const data = JSON.parse(jsonWithoutBOM);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Properly Escape Unicode Characters</h3>
        <p>
          For maximum compatibility, consider escaping non-ASCII characters:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Unicode Escaping Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JavaScript function to escape all non-ASCII characters
function escapeNonAscii(str) {
  return str.replace(/[^\\x00-\\x7F]/g, function(char) {
    const code = char.charCodeAt(0);
    // For characters outside BMP (needs surrogate pairs)
    if (code > 0xFFFF) {
      const highSurrogate = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      const lowSurrogate = ((code - 0x10000) % 0x400) + 0xDC00;
      return '\\\\u' + highSurrogate.toString(16).toUpperCase() + 
             '\\\\u' + lowSurrogate.toString(16).toUpperCase();
    }
    // Simple case for BMP characters
    return '\\\\u' + ('0000' + code.toString(16).toUpperCase()).slice(-4);
  });
}

// Convert an object with Unicode characters to escaped JSON
function safeStringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'string') {
      return escapeNonAscii(value);
    }
    return value;
  });
}

// Example
const data = { message: "Hello, 世界!" };
const safeJson = safeStringify(data);
// Result: {"message":"Hello, \\u4E16\\u754C!"}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Fix Surrogate Pair Issues</h3>
        <p>
          If you need to handle surrogate pairs manually:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Surrogate Pair Validation:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JavaScript function to check for unpaired surrogates in JSON strings
function detectUnpairedSurrogates(str) {
  const issues = [];
  
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    
    // Check for high surrogates (0xD800 to 0xDBFF)
    if (code >= 0xD800 && code <= 0xDBFF) {
      // A high surrogate should be followed by a low surrogate
      if (i + 1 >= str.length || 
          str.charCodeAt(i + 1) < 0xDC00 || 
          str.charCodeAt(i + 1) > 0xDFFF) {
        issues.push({
          position: i,
          issue: 'Unpaired high surrogate',
          code: code.toString(16)
        });
      } else {
        // Skip the next character as it's a valid low surrogate
        i++;
      }
    }
    
    // Check for isolated low surrogates (0xDC00 to 0xDFFF)
    else if (code >= 0xDC00 && code <= 0xDFFF) {
      issues.push({
        position: i,
        issue: 'Isolated low surrogate',
        code: code.toString(16)
      });
    }
  }
  
  return issues;
}

// Example usage
const jsonString = '{"emoji": "\\uD83D"}'; // Incomplete surrogate pair
const obj = JSON.parse(jsonString);
const issues = detectUnpairedSurrogates(obj.emoji);
console.log(issues);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Normalize Unicode Representations</h3>
        <p>
          Some Unicode characters can be represented in multiple ways, which can cause comparison issues:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Unicode Normalization:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// JavaScript example using Unicode Normalization Form C (NFC)
function normalizeJson(jsonString) {
  const obj = JSON.parse(jsonString);
  
  // Recursively normalize all string values
  function normalizeObject(obj) {
    if (typeof obj === 'string') {
      return obj.normalize('NFC');
    } else if (Array.isArray(obj)) {
      return obj.map(normalizeObject);
    } else if (obj !== null && typeof obj === 'object') {
      const result = {};
      for (const key of Object.keys(obj)) {
        // Normalize both keys and values
        const normalizedKey = typeof key === 'string' ? key.normalize('NFC') : key;
        result[normalizedKey] = normalizeObject(obj[key]);
      }
      return result;
    }
    return obj;
  }
  
  const normalizedObj = normalizeObject(obj);
  return JSON.stringify(normalizedObj);
}

// Example with accent characters
const json = '{"café": "résumé"}';
const normalized = normalizeJson(json);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Unicode normalization ensures consistent representation of characters that can be written in multiple ways (like accented characters).
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Prevention Strategies</h2>
        <p>
          Follow these best practices to prevent Unicode issues in your JSON:
        </p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Always specify encoding explicitly</strong> when reading or writing JSON files
          </li>
          <li>
            <strong>Use UTF-8 without BOM</strong> as your standard encoding for JSON files
          </li>
          <li>
            <strong>Validate JSON after generation</strong>, especially if it contains non-ASCII characters
          </li>
          <li>
            <strong>Consider escaping all non-ASCII characters</strong> for maximum compatibility
          </li>
          <li>
            <strong>Use a library that handles Unicode correctly</strong> rather than manually constructing JSON
          </li>
          <li>
            <strong>Include charset=utf-8 in Content-Type headers</strong> when serving JSON over HTTP
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">HTTP Header Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`Content-Type: application/json; charset=utf-8`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Always specify the character encoding when serving JSON via HTTP to ensure proper interpretation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Language-Specific Considerations</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Unicode Handling by Language:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Language</th>
                <th className="px-4 py-2 text-left">Unicode Handling in JSON</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">JavaScript</td>
                <td className="px-4 py-2">Good native support, but surrogate pair issues can occur with <code>String.fromCharCode</code></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Python</td>
                <td className="px-4 py-2">Excellent Unicode support; specify encoding with <code>open(file, encoding='utf-8')</code></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Java</td>
                <td className="px-4 py-2">Good support; use <code>InputStreamReader</code> with correct charset</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Ruby</td>
                <td className="px-4 py-2">Strong Unicode handling; specify <code>File.read(file, encoding: 'utf-8')</code></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">PHP</td>
                <td className="px-4 py-2">Uneven support; use <code>json_encode</code> with <code>JSON_UNESCAPED_UNICODE</code> flag</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">C#</td>
                <td className="px-4 py-2">Good native support; prefer <code>Encoding.UTF8</code> for file operations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Unicode character issues in JSON documents can be complex to diagnose and fix, but understanding 
          the common problems and their solutions will help you handle these situations effectively. 
          By following encoding best practices, properly escaping characters when needed, and using the right 
          tools for detection and validation, you can prevent most Unicode-related JSON errors.
        </p>
        
        <p className="mt-4">
          Remember that JSON&apos;s simplicity as a data format depends on correct handling of Unicode. 
          Taking the time to ensure your JSON is properly encoded and formatted will save you from 
          difficult debugging sessions and ensure your data flows smoothly between systems, regardless 
          of what languages or special characters it contains.
        </p>
      </div>
    </>
  );
}
