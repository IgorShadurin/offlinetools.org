import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Resolving Unicode Character Issues in JSON Documents | Offline Tools",
  description:
    "Learn what \\u0001 means in JSON, why raw control bytes, BOMs, and bad Unicode escapes break parsing, and how to clean or preserve them safely.",
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
          If your JSON contains a value like <code>\u0001</code>, the first question is whether you are looking at a
          valid JSON escape or an invalid raw control byte in the file. That distinction explains most real-world
          Unicode problems in JSON, including parser failures, mojibake, and confusing output after decoding.
        </p>

        <p>
          In current JSON guidance from RFC 8259, Unicode text is fully allowed, but control characters U+0000 through
          U+001F must be escaped inside strings, and interoperable JSON exchanged between systems should be UTF-8. That
          means a page or tool that shows <code>\u0001</code> is often working correctly, while the broken input is
          usually a file that contains the raw byte <code>0x01</code>, a BOM, or malformed escape data.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Quick answer for \u0001 in JSON</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3 text-blue-900 dark:text-blue-100">
            <li>
              <strong>\u0001 means code point U+0001</strong>, a non-printable control character named Start of
              Heading.
            </li>
            <li>
              <strong>An escaped sequence like</strong> <code>&quot;A\u0001B&quot;</code> <strong>is valid JSON</strong>
              , and after parsing the string really contains that control character.
            </li>
            <li>
              <strong>A raw control byte in the file is not valid JSON</strong>. That is what usually triggers parse
              errors such as bad control character or invalid character.
            </li>
            <li>
              <strong>If you want the literal six-character text</strong> <code>\u0001</code>{" "}
              <strong>after parsing</strong>, write <code>&quot;A\\u0001B&quot;</code> in the JSON source.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Usually Goes Wrong</h2>
        <p>
          JSON Unicode issues are rarely about normal letters such as <code>é</code>, <code>ß</code>, or{" "}
          <code>世界</code>. They usually come from one of these failures:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>A producer writes binary or device data into a JSON string without escaping control bytes.</li>
          <li>A file is saved as something other than UTF-8 and then decoded as UTF-8 later.</li>
          <li>A UTF-8 BOM appears at the start of the file and a parser does not ignore it.</li>
          <li>A Unicode escape is malformed, such as <code>\u3A</code> or <code>\uGHIJ</code>.</li>
          <li>A non-BMP character is represented with a broken surrogate pair such as <code>\uD83D</code>.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Valid, invalid, and literal-text examples</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Valid JSON: the parsed string contains U+0001
{"marker":"A\\u0001B"}

// Invalid JSON: the file contains a literal 0x01 byte between A and B
{"marker":"A<0x01>B"}

// Valid JSON: the parsed string contains the visible text \\u0001
{"marker":"A\\\\u0001B"}

// Invalid Unicode escape: exactly four hex digits are required
{"marker":"\\u3A"}

// Broken surrogate pair: incomplete UTF-16 escape data
{"emoji":"\\uD83D"}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Current JSON Rules That Matter</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Rule</th>
                <th className="px-4 py-2 text-left">Why it matters in practice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Control characters U+0000 through U+001F must be escaped in strings</td>
                <td className="px-4 py-2">
                  A literal byte like <code>0x01</code> inside a quoted JSON string makes the document invalid.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Interoperable JSON exchanged between systems should be UTF-8</td>
                <td className="px-4 py-2">
                  If a file was written as Latin-1 or Windows-1252, non-ASCII text may decode incorrectly or fail to
                  parse.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Generators must not add a BOM, though parsers may ignore one</td>
                <td className="px-4 py-2">
                  A BOM at byte zero still breaks some toolchains, especially when the JSON is embedded or manually
                  parsed.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Unicode text can appear directly in JSON strings</td>
                <td className="px-4 py-2">
                  You do not need to escape every non-ASCII character just to make JSON valid.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">A Unicode escape must be <code>\u</code> followed by four hex digits</td>
                <td className="px-4 py-2">Short, truncated, or non-hex escapes are invalid JSON syntax.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Diagnose the File You Actually Have</h2>
        <p>
          A formatter or validator tells you whether the JSON is structurally valid. If it parses and still shows{" "}
          <code>\u0001</code>, that is usually an escaped control character that survived decoding correctly. If it
          fails before parsing, inspect the raw source.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Diagnostic checklist</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Look at the first bytes of the file</strong> to see whether a BOM is present.
            </li>
            <li>
              <strong>Check whether the bad character is written as text or stored as a raw byte.</strong> The visible
              sequence <code>\u0001</code> is not the same thing as byte <code>0x01</code>.
            </li>
            <li>
              <strong>Watch for mojibake</strong> such as <code>CafÃ©</code>, which usually signals an encoding mismatch
              rather than a JSON syntax problem.
            </li>
            <li>
              <strong>Check the escape itself.</strong> <code>\u003A</code> is valid. <code>\u3A</code> is not.
            </li>
            <li>
              <strong>If parsing fails only in one environment, compare parser behavior.</strong> Some tools quietly
              ignore a BOM, while others do not.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Fix It Safely</h2>

        <h3 className="text-xl font-medium mt-6">1. Keep the control character if it is real data</h3>
        <p>
          If the downstream system truly needs U+0001, keep it escaped in JSON and let a serializer generate the output
          instead of hand-writing the string.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const marker = "A" + String.fromCharCode(1) + "B";
const json = JSON.stringify({ marker });

console.log(json);
// {"marker":"A\\u0001B"}

const parsed = JSON.parse(json);
console.log(parsed.marker.charCodeAt(1));
// 1`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Keep the visible text \u0001 instead of the control character</h3>
        <p>
          If you want the literal characters backslash-u-zero-zero-zero-one to appear after parsing, escape the
          backslash itself.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const parsed = JSON.parse('{"marker":"A\\\\u0001B"}');

console.log(parsed.marker);
// A\\u0001B`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Clean a dirty file before parsing</h3>
        <p>
          When a producer emits invalid JSON with raw control bytes, your safest fix is upstream. If you must salvage
          the file, treat cleanup as a repair step that may change the data.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Best-effort cleanup</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function stripBomAndInvalidControls(source) {
  return source
    .replace(/^\\uFEFF/, "")
    .replace(/[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F]/g, "");
}

const cleaned = stripBomAndInvalidControls(rawText);
const data = JSON.parse(cleaned);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This strips non-whitespace C0 controls globally. It is useful for emergency recovery, not as a substitute
            for fixing the generator that created the bad JSON.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Fix encoding at the file boundary</h3>
        <p>
          A valid JSON document can still look broken if the bytes were decoded with the wrong charset. Read and write
          JSON as UTF-8 unless you control a closed system with stricter legacy rules.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">File handling example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import fs from "node:fs";

const text = fs.readFileSync("data.json", "utf8").replace(/^\\uFEFF/, "");
const data = JSON.parse(text);

fs.writeFileSync("clean.json", JSON.stringify(data, null, 2), "utf8");`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JavaScript and Python Notes</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Environment</th>
                <th className="px-4 py-2 text-left">Practical behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">JavaScript</td>
                <td className="px-4 py-2">
                  <code>JSON.parse()</code> rejects malformed escapes and raw control characters in invalid input. MDN
                  documents error families such as bad control character and bad Unicode escape.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Python</td>
                <td className="px-4 py-2">
                  <code>json.loads()</code> is strict by default and rejects control characters in invalid JSON.
                  Python also exposes <code>strict=False</code> for non-compliant inputs, which can help salvage bad
                  data but does not make the source valid JSON.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Prevention Checklist</h2>
        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Emit UTF-8 JSON without a BOM</strong> when data leaves one system for another.
          </li>
          <li>
            <strong>Use a serializer</strong> such as <code>JSON.stringify()</code> or <code>json.dumps()</code> to
            generate escapes correctly.
          </li>
          <li>
            <strong>Do not escape all non-ASCII text by default</strong>. Normal Unicode characters are valid JSON and
            are usually easier to read unescaped.
          </li>
          <li>
            <strong>Decide what should happen to control characters</strong>: preserve them, convert them to visible
            text, or strip them before storage and display.
          </li>
          <li>
            <strong>Validate raw files before deployment</strong> so you catch BOMs, bad escapes, and encoding errors
            before users do.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Most Unicode-related JSON bugs come down to a small set of root causes: raw control bytes, wrong file
          encoding, BOMs, or malformed escape sequences. Once you distinguish between a visible escape like{" "}
          <code>\u0001</code> and an actual byte in the file, the correct fix becomes much clearer.
        </p>

        <p className="mt-4">
          For search visitors landing on this page with a file that will not parse, the practical rule is simple: make
          the source valid UTF-8 JSON first, then decide whether the control character should stay as data, become
          visible text, or be removed.
        </p>
      </div>
    </>
  );
}
