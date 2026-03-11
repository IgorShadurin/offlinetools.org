import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Special Characters: What Must Be Escaped and What Is Invalid | Offline Tools",
  description:
    "See which characters JSON strings accept, which must be escaped, and the common invalid cases that cause bad control character or bad escape errors.",
};

const invalidQuoteExample = String.raw`{
  "message": "He said "hello" to me"
}`;

const validQuoteExample = String.raw`{
  "message": "He said \"hello\" to me"
}`;

const invalidPathExample = String.raw`{
  "path": "C:\Users\sam\Documents\report.json"
}`;

const accidentalEscapeExample = String.raw`{
  "path": "C:\new\test"
}`;

const validPathExample = String.raw`{
  "path": "C:\\Users\\sam\\Documents\\report.json"
}`;

const invalidMultilineExample = String.raw`{
  "description": "Line one
Line two"
}`;

const validMultilineExample = String.raw`{
  "description": "Line one\nLine two"
}`;

const unicodeExample = String.raw`{
  "greeting": "こんにちは",
  "heartDirect": "I ❤️ JSON",
  "heartEscaped": "I \u2764\uFE0F JSON",
  "rocketEscaped": "\uD83D\uDE80"
}`;

const serializerExample = String.raw`const payload = {
  message: 'He said "hello" to me',
  path: "C:\\Users\\sam\\Documents\\report.json",
  description: "Line one\nLine two"
};

const json = JSON.stringify(payload);`;

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Special Characters in JSON Strings</h1>

      <div className="space-y-6">
        <p>
          If you are asking what special characters JSON does not accept, the practical answer is short: inside a JSON
          string, raw double quotes, raw backslashes, and ASCII control characters from{" "}
          <code className="font-mono">U+0000</code> through <code className="font-mono">U+001F</code> are not allowed
          as-is. They must be escaped. JSON also rejects made-up escape sequences such as{" "}
          <code className="font-mono">\&apos;</code>, <code className="font-mono">\x41</code>, or{" "}
          <code className="font-mono">\v</code>.
        </p>

        <p>
          Everything else is less mysterious than it looks. Most punctuation is fine, single quotes are fine as data,
          forward slashes do not need escaping, and Unicode text such as accented letters, CJK characters, and emoji
          can appear directly in a valid JSON string.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Short Answer</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-blue-800 dark:text-blue-100">
            <li>
              JSON strings must use double quotes. Single quotes are ordinary characters inside the data, not valid
              string delimiters.
            </li>
            <li>
              The only built-in short escapes are <code className="font-mono">\&quot;</code>,{" "}
              <code className="font-mono">\\</code>, <code className="font-mono">\/</code>,{" "}
              <code className="font-mono">\b</code>, <code className="font-mono">\f</code>,{" "}
              <code className="font-mono">\n</code>, <code className="font-mono">\r</code>, and{" "}
              <code className="font-mono">\t</code>, plus Unicode escapes in the form{" "}
              <code className="font-mono">\uXXXX</code>.
            </li>
            <li>
              A raw newline or tab inside a JSON string is invalid, but <code className="font-mono">\n</code> and{" "}
              <code className="font-mono">\t</code> are valid escaped forms.
            </li>
            <li>
              A forward slash <code className="font-mono">/</code> is valid as-is. Escaping it as{" "}
              <code className="font-mono">\/</code> is optional.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Which characters are valid in JSON strings?</h2>
        <p>
          Per the current JSON specification, a string can contain any Unicode character except an unescaped double
          quote, an unescaped backslash, or characters in the <code className="font-mono">U+0000</code> to{" "}
          <code className="font-mono">U+001F</code> range. That means most symbols people worry about, including{" "}
          <code className="font-mono">@</code>, <code className="font-mono">#</code>,{" "}
          <code className="font-mono">% </code>, <code className="font-mono">&amp;</code>,{" "}
          <code className="font-mono">*</code>, <code className="font-mono">&lt;</code>,{" "}
          <code className="font-mono">&gt;</code>, and <code className="font-mono">&apos;</code>, are fine in string
          values without extra escaping.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Character or Case</th>
                <th className="px-4 py-2 text-left">Valid As-Is?</th>
                <th className="px-4 py-2 text-left">Correct Form</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">A-Z, a-z, 0-9, most punctuation</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2 font-mono">"name@example.com #1"</td>
                <td className="px-4 py-2">No special escaping needed.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&quot;</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2 font-mono">\&quot;</td>
                <td className="px-4 py-2">Must be escaped inside the string.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2 font-mono">\\</td>
                <td className="px-4 py-2">Must be escaped inside the string.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">/</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2 font-mono">/ or \/</td>
                <td className="px-4 py-2">Escaping the slash is optional.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Actual newline, tab, carriage return</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2 font-mono">\n, \t, \r</td>
                <td className="px-4 py-2">Raw control characters are invalid in JSON strings.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">ASCII control chars U+0000-U+001F</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2 font-mono">\u0000 to \u001F</td>
                <td className="px-4 py-2">Must be escaped if you need to preserve them.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">Unicode text and emoji</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2 font-mono">"こんにちは" or "\uD83D\uDE80"</td>
                <td className="px-4 py-2">Direct Unicode is allowed. Escaped Unicode is also valid.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Valid escape sequences in JSON</h2>
        <p>
          JSON has a small, fixed escape set. If you put a backslash before some other character, the parser should
          reject it as a bad escape. This is one of the biggest differences between JSON and language string literals.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Escape</th>
                <th className="px-4 py-2 text-left">Meaning</th>
                <th className="px-4 py-2 text-left">Accepted?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\&quot;</td>
                <td className="px-4 py-2">Double quote</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\\</td>
                <td className="px-4 py-2">Backslash</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\/</td>
                <td className="px-4 py-2">Forward slash</td>
                <td className="px-4 py-2">Yes, but optional</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\b</td>
                <td className="px-4 py-2">Backspace</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\f</td>
                <td className="px-4 py-2">Form feed</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\n</td>
                <td className="px-4 py-2">Line feed</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\r</td>
                <td className="px-4 py-2">Carriage return</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\t</td>
                <td className="px-4 py-2">Tab</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\uXXXX</td>
                <td className="px-4 py-2">Unicode escape with exactly 4 hex digits</td>
                <td className="px-4 py-2">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\&apos;, \x41, \v, \0</td>
                <td className="px-4 py-2">Non-JSON escape sequences</td>
                <td className="px-4 py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common mistakes and how to fix them</h2>

        <h3 className="text-xl font-medium mt-6">1. Unescaped quotes inside a string</h3>
        <p>A raw double quote ends the JSON string early, so it must be escaped as <code className="font-mono">\&quot;</code>.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{invalidQuoteExample}</pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Valid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{validQuoteExample}</pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Backslashes in paths and regular expressions</h3>
        <p>
          A backslash is always special in JSON. If you want a literal backslash in the resulting value, write it as{" "}
          <code className="font-mono">\\</code>. This is why Windows paths often break when copied into JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{invalidPathExample}</pre>
          </div>
          <h4 className="text-lg font-medium text-yellow-700 dark:text-yellow-300 mt-4">Valid JSON, wrong value</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{accidentalEscapeExample}</pre>
          </div>
          <p className="mt-2 text-sm">
            That second example parses, but <code className="font-mono">\n</code> becomes a newline and{" "}
            <code className="font-mono">\t</code> becomes a tab, so the path is no longer what you meant.
          </p>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Valid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{validPathExample}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Path Tip</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If your application accepts it, using forward slashes can make paths easier to read in JSON because{" "}
            <code className="font-mono">/</code> does not need escaping.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Raw line breaks and tabs</h3>
        <p>
          JSON does not support multiline strings with literal line breaks inside the quotes. Use escaped control
          characters instead.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{invalidMultilineExample}</pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Valid JSON</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{validMultilineExample}</pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Escaping characters that JSON never asked you to escape</h3>
        <p>
          This is where many developers mix up JSON with JavaScript, Python, or shell escaping. In JSON, an apostrophe
          does not need escaping because strings are delimited by double quotes. Writing{" "}
          <code className="font-mono">\&apos;</code> creates a bad escape. The same applies to{" "}
          <code className="font-mono">\x41</code>, <code className="font-mono">\v</code>, and{" "}
          <code className="font-mono">\0</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">If You Wrote</th>
                <th className="px-4 py-2 text-left">Why It Fails</th>
                <th className="px-4 py-2 text-left">Use Instead</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\&apos;</td>
                <td className="px-4 py-2">Apostrophe is not a JSON escape sequence.</td>
                <td className="px-4 py-2 font-mono">&apos; or \u0027</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\x41</td>
                <td className="px-4 py-2">JSON does not support hex escapes in this form.</td>
                <td className="px-4 py-2 font-mono">A or \u0041</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\v</td>
                <td className="px-4 py-2">Vertical tab is not one of JSON&apos;s short escapes.</td>
                <td className="px-4 py-2 font-mono">\u000B</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">\0</td>
                <td className="px-4 py-2">Null must use a Unicode escape in JSON.</td>
                <td className="px-4 py-2 font-mono">\u0000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">5. Single quotes around strings or object keys</h3>
        <p>
          JSON is stricter than JavaScript object literal syntax. Both string values and property names must use double
          quotes. This is invalid JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`{
  'message': 'hello'
}`}</pre>
          </div>
          <p className="mt-2 text-sm">
            Correct JSON would be <code className="font-mono">{`{"message":"hello"}`}</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Does JSON accept Unicode, accented characters, and emoji?</h2>
        <p>
          Yes. Direct Unicode characters are valid in JSON strings, and escaped Unicode is also valid. If you escape a
          character outside the basic multilingual plane, use a surrogate pair such as{" "}
          <code className="font-mono">\uD83D\uDE80</code> for the rocket emoji.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{unicodeExample}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Unicode Interoperability Note</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            JSON exchanged between systems should normally be encoded as UTF-8. Also avoid lone surrogate code units
            such as <code className="font-mono">\uDEAD</code>; some software will accept them, but behavior can be
            inconsistent across parsers.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common parser errors and what they usually mean</h2>
        <p>
          Different parsers phrase errors differently, but the same patterns show up again and again. If your formatter
          or parser reports one of the following, check the matching issue first.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Typical Error</th>
                <th className="px-4 py-2 text-left">What to Check</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">bad control character in string literal</td>
                <td className="px-4 py-2">A raw newline, tab, or another character in the U+0000-U+001F range is inside the string.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">bad escape character</td>
                <td className="px-4 py-2">A backslash is followed by a character JSON does not recognize, such as &apos;, x, v, or 0.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">bad Unicode escape</td>
                <td className="px-4 py-2">The <code className="font-mono">\u</code> sequence is malformed or not followed by exactly four hex digits.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">expected property name or &apos;&rbrace;&apos;</td>
                <td className="px-4 py-2">A key is unquoted or single-quoted instead of wrapped in double quotes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The safest way to avoid escaping mistakes</h2>
        <p>
          The best fix is usually not to hand-edit JSON at all. Build a normal data structure in your language and let
          a JSON serializer escape the string content for you.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{serializerExample}</pre>
          </div>
        </div>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>Use a real JSON library or serializer instead of concatenating strings by hand.</li>
          <li>Validate copied JSON before shipping it, especially when it contains paths, HTML, or multiline content.</li>
          <li>Remember that a backslash can make JSON invalid or silently change the value you meant to store.</li>
          <li>Prefer UTF-8 JSON for interchange and keep binary data out of strings unless you intentionally encode it.</li>
        </ol>

        <p className="mt-6">
          For search users landing here directly, the main rule to remember is simple: JSON accepts almost all visible
          characters in strings, but it is very strict about quotes, backslashes, and low-value control characters.
          Once you know that small rule set, most &quot;special character&quot; bugs become easy to spot.
        </p>
      </div>
    </>
  );
}
