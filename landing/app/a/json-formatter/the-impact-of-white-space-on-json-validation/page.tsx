import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Impact of White Space on JSON Validation | Offline Tools",
  description:
    "JSON whitespace usually does not matter outside strings, but hidden Unicode characters, BOMs, and unescaped line breaks can still break validation. Learn the exact rules and fixes.",
};

export default function WhiteSpaceInJsonValidationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">The Impact of White Space on JSON Validation</h1>

      <div className="space-y-6">
        <p>
          White space, often written as whitespace, affects JSON validation less than many people think, but the few
          places where it does matter are important. In standard JSON, ordinary spacing outside of values is mostly
          ignored. Validation breaks when the white space is the wrong character, appears inside a token such as a
          number or keyword, or shows up literally inside a string instead of as an escape sequence.
        </p>

        <p>
          The practical takeaway is simple: indentation and line breaks are fine, but invisible characters copied from
          rich text editors, spreadsheets, email, or web pages are a common reason that seemingly valid JSON fails to
          parse.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Short Answer</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Spaces, tabs, carriage returns, and line feeds are the only insignificant white space characters.</li>
            <li>They are allowed around JSON punctuation such as braces, brackets, commas, and colons.</li>
            <li>They are not allowed inside numbers, keywords, or unescaped inside string values.</li>
            <li>Lookalike characters such as non-breaking spaces and zero-width spaces are not JSON white space.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Counts as White Space in JSON?</h2>
        <p>
          RFC 8259 defines JSON white space very narrowly. Only these four code points count as insignificant white
          space:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Space: <code>U+0020</code>
            </li>
            <li>
              Horizontal tab: <code>U+0009</code>
            </li>
            <li>
              Line feed: <code>U+000A</code>
            </li>
            <li>
              Carriage return: <code>U+000D</code>
            </li>
          </ul>
        </div>

        <p>
          That list is stricter than many developers expect. A non-breaking space, thin space, zero-width space, or
          form feed may look like harmless formatting, but a strict parser does not treat it as legal JSON white space.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Where White Space Is Allowed</h2>
        <p>White space is ignored when it appears around structural characters and around the root value.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap break-words text-sm">
            <code>{`{
  "user": "Ada",
  "active": true,
  "roles": [ "admin", "editor" ]
}`}</code>
          </pre>
        </div>

        <p>All of the following are valid for the same reason:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Leading and trailing spaces around the entire document</li>
            <li>New lines between object members or array items</li>
            <li>Tabs and spaces before or after commas and colons</li>
            <li>Pretty-printed or minified formatting</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Where White Space Breaks Validation</h2>
        <p>JSON becomes invalid when white space appears inside a token that must stay contiguous.</p>

        <h3 className="text-xl font-semibold mt-6">1. Inside strings as literal control characters</h3>
        <p>
          A line break or tab inside a JSON string must be escaped. If you insert the character literally, validation
          fails.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <p className="font-semibold mb-2">Invalid</p>
            <pre className="whitespace-pre-wrap break-words text-sm">
              <code>{`{
  "message": "line one
line two"
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <p className="font-semibold mb-2">Valid</p>
            <pre className="whitespace-pre-wrap break-words text-sm">
              <code>{`{
  "message": "line one\\nline two"
}`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Inside numbers or keywords</h3>
        <p>
          White space cannot split tokens such as numbers, <code>true</code>, <code>false</code>, or <code>null</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap break-words text-sm">
            <code>{`{ "count": 1 000 }
{ "flag": tr ue }
{ "price": 3 .14 }`}</code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. After the document ends</h3>
        <p>
          Parsers allow trailing white space after the root value, but not extra non-white-space data. This is the
          situation behind errors such as <code>unexpected non-whitespace character after JSON data</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="whitespace-pre-wrap break-words text-sm">
            <code>{`{"ok": true} extra`}</code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Hidden Characters That Look Like White Space</h2>
        <p>
          This is where most real-world validation confusion starts. A file can look correctly spaced and still fail
          because the blank-looking character is not one of JSON&apos;s four legal white space characters.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <code>U+00A0</code> non-breaking space copied from HTML or rich text
            </li>
            <li>
              <code>U+200B</code> zero-width space inserted by messaging or editing tools
            </li>
            <li>
              <code>U+FEFF</code> byte order mark at the start of a file
            </li>
          </ul>
        </div>

        <p>
          The BOM case is especially subtle. The JSON RFC says generators must not add a BOM to networked JSON, but
          parsers may choose to ignore one for interoperability. That means BOM handling can differ between tools even
          when the payload looks identical.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Does White Space Affect Schema Validation?</h2>
        <p>
          In practice, schema validation happens after parsing. First the parser decides whether the raw text is valid
          JSON. Only then can a validator check types, required properties, formats, or other schema rules.
        </p>

        <p>
          So white space usually affects the parsing stage, not the schema stage. If the JSON parses successfully,
          different indentation or line breaks outside strings do not change the data model being validated.
        </p>

        <p>
          If you want to verify the exact grammar, the authoritative rule set is in{" "}
          <a
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
            href="https://www.rfc-editor.org/rfc/rfc8259"
          >
            RFC 8259
          </a>
          . For browser-side parser error wording, MDN&apos;s{" "}
          <a
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse"
          >
            JSON.parse error reference
          </a>{" "}
          is a useful companion.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Formatter and Debugging Tips</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Use a formatter to normalize ordinary spacing only after the text parses successfully.</li>
            <li>Turn on invisible character display in your editor when a file looks valid but still fails.</li>
            <li>Re-type suspicious spaces around commas, colons, or braces if the JSON was pasted from the web.</li>
            <li>Escape intended tabs and line breaks inside strings as <code>\\t</code>, <code>\\n</code>, and <code>\\r</code>.</li>
            <li>Save JSON as UTF-8 and watch for BOM insertion when moving files between tools.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          White space almost never changes whether JSON is valid when it is ordinary spacing between tokens. Validation
          problems come from illegal white space characters, literal control characters inside strings, or extra text
          after the JSON value. If a JSON document looks correct but will not validate, hidden Unicode characters are
          one of the first things to check.
        </p>
      </div>
    </>
  );
}
