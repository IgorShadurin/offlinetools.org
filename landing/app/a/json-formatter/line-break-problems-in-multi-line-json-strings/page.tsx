import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Multiline Strings and Line Break Problems | Offline Tools",
  description:
    "Standard JSON cannot contain raw multiline strings. Learn how to add line breaks with \\n or \\r\\n, avoid parse errors, and fix common CRLF, escaping, and rendering issues.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Line Break Problems in Multi-line JSON Strings</h1>

      <div className="space-y-6">
        <p>
          Standard JSON does not support raw multi-line string literals. If you need a line break in JSON, the JSON
          text must contain an escaped newline such as <code>\n</code> or <code>\r\n</code>, or you should let a JSON
          library escape a normal multi-line string for you.
        </p>

        <p>
          That distinction is the source of most confusion: the JSON source must contain escape sequences, but after
          parsing, your application receives a normal string value with actual line breaks. Bugs usually appear when raw
          text is pasted into a JSON file, a JSON string is embedded inside another language string literal, or a UI
          renders escaped JSON text instead of the parsed value.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Quick answer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Raw Enter or Return characters are not allowed inside a quoted JSON string.</li>
            <li>
              Use <code>\n</code> for a line break, or <code>\r\n</code> if you must preserve Windows-style CRLF.
            </li>
            <li>
              Prefer <code>JSON.stringify</code>, <code>json.dumps</code>, or another serializer over hand-building
              JSON.
            </li>
            <li>
              If your UI shows <code>\n</code> literally, you are probably displaying JSON text, not the parsed string
              value.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Can JSON have multi-line strings?</h2>
        <p>
          Not as raw text. The{" "}
          <a href="https://www.rfc-editor.org/rfc/rfc8259" className="text-blue-600 hover:underline">
            JSON specification (RFC 8259)
          </a>{" "}
          says that JSON strings cannot contain unescaped control characters. That includes line feed (
          <code>\n</code>) and carriage return (<code>\r</code>), so typing a real newline directly inside the quoted
          string makes the JSON invalid.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Invalid JSON</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "message": "First line
Second line"
}`}
          </pre>
          <p className="mt-2">
            The parser sees the newline as an illegal control character inside the string, not as part of a valid
            string literal.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Valid JSON</h3>
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "message": "First line\\nSecond line"
}`}
          </pre>
          <p className="mt-2">
            This is still a single JSON string value, but it contains an escaped newline that becomes a real line break
            after parsing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How to add a line break in JSON</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. When writing JSON by hand</h3>
        <p>
          If you are editing a <code>.json</code> file directly, use <code>\n</code> where you want the line break:
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`{
  "title": "Release notes",
  "body": "Fixed line ending bug\\nAdded CRLF normalization\\nImproved validation"
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. When you already have multi-line text in code</h3>
        <p>
          Native strings in many languages can contain real newlines. The safe approach is to keep the string in its
          normal form and let a JSON serializer escape it.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// JavaScript
const body = \`Fixed line ending bug
Added CRLF normalization
Improved validation\`;

const payload = JSON.stringify({ title: "Release notes", body });

console.log(payload);
// {"title":"Release notes","body":"Fixed line ending bug\\nAdded CRLF normalization\\nImproved validation"}`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`# Python
import json

body = """Fixed line ending bug
Added CRLF normalization
Improved validation"""

payload = json.dumps({"title": "Release notes", "body": body})

print(payload)
# {"title": "Release notes", "body": "Fixed line ending bug\\nAdded CRLF normalization\\nImproved validation"}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">JSON text vs parsed string value</h2>
        <p>
          This is the key mental model: JSON text on disk or on the wire uses escape sequences, while the parsed value
          in memory contains actual newline characters.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// JavaScript
const jsonText = '{"message":"First line\\nSecond line"}';
const data = JSON.parse(jsonText);

console.log(data.message);
// First line
// Second line`}
          </pre>
        </div>
        <p>
          If you inspect <code>jsonText</code>, you will see the backslash escape. If you inspect <code>data.message</code>,
          you will get a real multi-line string.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common line break problems and fixes</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Raw multi-line text was pasted into a JSON file</h3>
        <p>
          This is the most common failure. Someone pastes a paragraph directly between double quotes, and the file
          stops parsing. Replace the real line breaks with <code>\n</code>, or rebuild the JSON with a serializer.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. One backslash or two?</h3>
        <p>
          If you are editing JSON itself, use <code>\n</code>. If you are writing JSON text inside another language
          string literal, you often need <code>\\n</code> so the host language produces JSON text that contains{" "}
          <code>\n</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// JSON file on disk
{"message":"First line\\nSecond line"}

// JavaScript source code containing that JSON text
const jsonText = '{"message":"First line\\\\nSecond line"}';`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. CRLF vs LF differences</h3>
        <p>
          JSON can represent either style. Use <code>\n</code> for the most common cross-platform form, or{" "}
          <code>\r\n</code> if you need to preserve Windows line endings exactly. When line ending differences are not
          meaningful, normalize input before serializing.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="bg-white p-3 rounded overflow-x-auto">
            {`// Normalize Windows CRLF and legacy CR to LF
const normalizedText = textInput.replace(/\\r\\n|\\r/g, "\\n");`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. The UI prints \n instead of a real new line</h3>
        <p>
          This usually means the app is showing the serialized JSON text rather than the parsed string. Parse first,
          then render the string value. In HTML or React, a safe display pattern is to preserve whitespace with CSS
          instead of injecting <code>&lt;br&gt;</code> tags into raw text.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Web UI: use <code>white-space: pre-wrap</code> when you want line breaks to remain visible.</li>
          <li>API debugging: inspect the parsed object, not just the raw response body string.</li>
          <li>Logs: remember many consoles escape characters when they stringify nested objects.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What about JSON5 or other extensions?</h2>
        <p>
          If you have seen examples of multi-line strings that appear to work without standard JSON escaping, they are
          often using{" "}
          <a href="https://spec.json5.org/" className="text-blue-600 hover:underline">
            JSON5
          </a>{" "}
          or another extension. JSON5 allows strings to span multiple lines by escaping the newline, but that is not
          valid standard JSON and should only be used when every parser in your toolchain explicitly supports JSON5.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Best practices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use a JSON serializer instead of manual string concatenation.</li>
          <li>Use <code>\n</code> for ordinary line breaks and reserve <code>\r\n</code> for exact CRLF preservation.</li>
          <li>Normalize line endings before serializing if your application does not care about platform-specific style.</li>
          <li>When debugging, check whether you are looking at raw JSON text or the parsed string value.</li>
          <li>Validate copied or generated JSON with a formatter before shipping it to clients or APIs.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Bottom line</h2>
        <p>
          JSON does not have raw multi-line string literals. To add a line break in JSON, store it as <code>\n</code>{" "}
          or <code>\r\n</code>, and let your JSON library handle escaping whenever possible. Once you separate JSON text
          from the parsed string value, most line break problems become straightforward to diagnose and fix.
        </p>
      </div>
    </>
  );
}
