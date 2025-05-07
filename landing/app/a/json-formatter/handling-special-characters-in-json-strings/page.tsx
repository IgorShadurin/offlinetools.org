import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Handling Special Characters in JSON Strings | Offline Tools",
  description:
    "Learn best practices for correctly escaping and handling special characters in JSON strings to prevent parsing errors.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Special Characters in JSON Strings</h1>

      <div className="space-y-6">
        <p>
          One of the most common sources of JSON parsing errors involves the incorrect handling of special characters in
          string values. This article explores the rules for properly escaping characters in JSON strings and provides
          practical examples for handling different scenarios.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON String Escaping Rules</h2>
        <p>
          In JSON, strings must be enclosed in double quotes, and certain characters need to be escaped with a backslash
          to avoid parsing errors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Required Escape Sequences in JSON:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Character</th>
                <th className="px-4 py-2 text-left">Escape Sequence</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;</td>
                <td className="px-4 py-2 font-mono">\&quot;</td>
                <td className="px-4 py-2">Double quote</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\</td>
                <td className="px-4 py-2 font-mono">\\</td>
                <td className="px-4 py-2">Backslash</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">/</td>
                <td className="px-4 py-2 font-mono">\/</td>
                <td className="px-4 py-2">Forward slash (optional but recommended)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\b</td>
                <td className="px-4 py-2 font-mono">\\b</td>
                <td className="px-4 py-2">Backspace</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\f</td>
                <td className="px-4 py-2 font-mono">\\f</td>
                <td className="px-4 py-2">Form feed</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\n</td>
                <td className="px-4 py-2 font-mono">\\n</td>
                <td className="px-4 py-2">Line feed/newline</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\r</td>
                <td className="px-4 py-2 font-mono">\\r</td>
                <td className="px-4 py-2">Carriage return</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\t</td>
                <td className="px-4 py-2 font-mono">\\t</td>
                <td className="px-4 py-2">Tab</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Non-ASCII/Unicode</td>
                <td className="px-4 py-2 font-mono">\\uXXXX</td>
                <td className="px-4 py-2">Unicode character (4-digit hex)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Special Character Issues</h2>

        <h3 className="text-xl font-medium mt-6">1. Quotes Within Strings</h3>
        <p>Double quotes must be escaped within JSON strings to avoid prematurely terminating the string.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "message": "He said "hello" to me"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "message": "He said \\"hello\\" to me"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The double quotes around &quot;hello&quot; are escaped with backslashes to prevent them from terminating the
            JSON string.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Backslashes in File Paths</h3>
        <p>Backslashes (common in Windows file paths) must be doubled to be properly escaped in JSON.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "filePath": "C:\\Users\\John\\Documents\\file.txt"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "filePath": "C:\\\\Users\\\\John\\\\Documents\\\\file.txt"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Notice the double backslashes. In JSON, each backslash must be escaped with another backslash.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            When working with file paths in JSON, consider using forward slashes (/) even for Windows paths. Most
            Windows applications accept forward slashes in file paths, and they don&apos;t require escaping in JSON.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Multi-line Strings</h3>
        <p>JSON doesn&apos;t directly support multi-line strings. Newline characters must be escaped.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "description": "This is a
  multi-line
  description"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "description": "This is a\\nmulti-line\\ndescription"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The newlines are replaced with \\n escape sequences to create a valid JSON string.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. HTML and XML Content</h3>
        <p>When storing HTML or XML in JSON strings, angle brackets and quotes need special attention.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">HTML in JSON Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "htmlContent": "<div class=\\"container\\">\\n  <span>User's profile</span>\\n  <a href=\\"https://example.com\\">Link</a>\\n</div>"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Notice how the double quotes within the HTML are escaped with backslashes.</p>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Unicode Characters</h3>
        <p>Unicode characters can be included directly in JSON strings or using escape sequences.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Unicode Examples:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "directUnicode": "こんにちは世界", 
  "escapedUnicode": "\\u3053\\u3093\\u306B\\u3061\\u306F\\u4E16\\u754C"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">Both strings represent the same text: &quot;Hello World&quot; in Japanese.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Emoji Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "directEmoji": "I ❤️ JSON!",
  "escapedEmoji": "I \\u2764\\uFE0F JSON!"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">6. Control Characters</h3>
        <p>Control characters (ASCII codes 0-31) must be escaped in JSON.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Control Character Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "formattedText": "First line\\nSecond line\\tIndented",
  "rawBinaryData": "\\u0000\\u0001\\u0002"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The first string contains newline (\\n) and tab (\\t) control characters, while the second contains NULL,
            SOH, and STX characters.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Special Character Handling Techniques</h2>

        <h3 className="text-xl font-medium mt-6">1. Manual Escaping</h3>
        <p>
          While you can manually escape characters according to JSON rules, this approach is error-prone for complex
          strings.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Manual Escaping Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const rawString = 'He said "Hello" and \\ was used';
const manuallyEscaped = '{"message": "He said \\\\"Hello\\\\" and \\\\\\\\ was used"}';`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Notice the multiple levels of escaping required, which makes this approach error-prone.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Using JSON.stringify()</h3>
        <p>
          In JavaScript, the <code>JSON.stringify()</code> method properly escapes special characters automatically.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Let JavaScript handle the escaping
const data = {
  message: 'He said "Hello" and \\ was used',
  path: 'C:\\Users\\Documents'
};

const jsonString = JSON.stringify(data);
// Results in: {"message":"He said \\"Hello\\" and \\\\ was used","path":"C:\\\\Users\\\\Documents"}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Base64 Encoding</h3>
        <p>For binary data or strings with many special characters, Base64 encoding can be a practical solution.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
const binaryData = new Uint8Array([0, 1, 2, 3, 255]);

// Convert to Base64
const base64Data = btoa(String.fromCharCode.apply(null, binaryData));

const jsonObject = {
  binaryContent: base64Data
};

// Results in something like: {"binaryContent":"AAECAwECAw=="}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">When to Use Base64:</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-yellow-700 dark:text-yellow-200">
            <li>For binary data that might contain unprintable characters</li>
            <li>When working with images or files embedded in JSON</li>
            <li>If the string contains an unpredictable mix of special characters</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Language-Specific Considerations</h2>

        <h3 className="text-xl font-medium mt-6">1. JavaScript</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript has built-in JSON methods
const obj = {
  text: 'Special characters: " \\ / \\b \\f \\n \\r \\t',
  html: '<div class="example">Content</div>'
};

// Proper escaping happens automatically
const jsonString = JSON.stringify(obj);

// To parse with reviver function that handles special cases
const parsed = JSON.parse(jsonString, (key, value) => {
  // Handle special cases during parsing
  if (key === 'date' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Python</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Python example
import json
import base64

# String with special characters
special_text = 'Line 1\\nLine 2\\tTabbed "Quoted"'

# Binary data
binary_data = bytes([0, 1, 2, 3, 255])
base64_data = base64.b64encode(binary_data).decode('ascii')

data = {
    'text': special_text,
    'binary': base64_data
}

# Proper escaping with json.dumps()
json_string = json.dumps(data)

# Result: {"text": "Line 1\\nLine 2\\tTabbed \\"Quoted\\"", "binary": "AAECAf8="}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Java</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Java example using Jackson
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;

// Create a map with special characters
Map<String, Object> data = new HashMap<>();
data.put("text", "Special: \" \\ / \\b \\f \\n \\r \\t");
data.put("binary", Base64.getEncoder().encodeToString(new byte[]{0, 1, 2, 3}));

// Convert to JSON string
ObjectMapper mapper = new ObjectMapper();
String jsonString = mapper.writeValueAsString(data);`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Special Characters in JSON</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Use language-specific JSON libraries</strong> - Don&apos;t manually construct JSON strings; let
            libraries handle the escaping
          </li>
          <li>
            <strong>Validate JSON after generation</strong> - Verify that your JSON is valid before using it
          </li>
          <li>
            <strong>Consider Base64 for binary data</strong> - Especially for files, images, or binary content
          </li>
          <li>
            <strong>Use forward slashes in paths</strong> - Replace backslashes with forward slashes where possible
          </li>
          <li>
            <strong>Be consistent with Unicode</strong> - Either use direct Unicode characters or escape sequences, but
            be consistent
          </li>
          <li>
            <strong>Document your encoding choices</strong> - Especially if you use Base64 or other encoding schemes
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium mb-2">Quick Reference: Common Special Character Patterns</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Pattern</th>
                <th className="px-4 py-2 text-left">JSON Representation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Windows path</td>
                <td className="px-4 py-2 font-mono">&quot;C:\\\\Program Files\\\\App&quot;</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Multi-line text</td>
                <td className="px-4 py-2 font-mono">&quot;Line 1\\nLine 2\\nLine 3&quot;</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">HTML/XML</td>
                <td className="px-4 py-2 font-mono">
                  &quot;&lt;div id=\\&quot;main\\&quot;&gt;Content&lt;/div&gt;&quot;
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Quotes within quotes</td>
                <td className="px-4 py-2 font-mono">&quot;She said, \\&quot;Hello!\\&quot;&quot; </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Handling special characters in JSON strings correctly is essential for creating valid JSON documents that
          parse correctly across different platforms and languages. By understanding the escaping rules and using the
          appropriate tools and techniques, you can avoid common parsing errors related to special characters.
        </p>
        <p className="mt-4">
          Remember that most modern programming languages provide built-in JSON libraries that handle the complexities
          of character escaping automatically. Whenever possible, use these libraries instead of manually constructing
          JSON strings to minimize the risk of syntax errors.
        </p>
      </div>
    </>
  );
}
