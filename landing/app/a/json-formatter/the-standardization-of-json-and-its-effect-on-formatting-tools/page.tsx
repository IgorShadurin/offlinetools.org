import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Standardization: RFC 8259, ECMA-404, and What Formatters Enforce | Offline Tools",
  description:
    "Learn how RFC 8259, ECMA-404, and I-JSON affect JSON formatting tools, validation rules, duplicate keys, number precision, UTF-8 handling, and JSON5 compatibility.",
};

export default function JsonStandardizationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">The Standardization of JSON and Its Effect on Formatting Tools</h1>

      <div className="space-y-6">
        <p>
          JSON looks simple, but the difference between data that merely resembles JSON and data that is safe to
          exchange across browsers, servers, CLIs, and APIs comes from standardization. For a formatter, that matters
          more than indentation style. A trustworthy tool needs to know which rules are fixed, which edge cases are
          technically valid but risky, and which relaxed inputs belong to JSON5 rather than standard JSON.
        </p>

        <p>
          Today, the most important references are RFC 8259, which defines the current IETF JSON standard, ECMA-404,
          which stays aligned with the core grammar, and RFC 7493 (I-JSON), which defines a stricter interoperability
          profile. Together, they explain why one formatter accepts a payload, another rejects it, and a third
          prettifies it while still leaving portability problems behind.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Which JSON standards matter now?</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">RFC 8259:</span> The current IETF standard for JSON. It defines the grammar
              for valid JSON text and adds interoperability guidance for parsers, generators, encoding, numbers, and
              object member names.
            </li>
            <li>
              <span className="font-medium">ECMA-404:</span> A companion JSON specification focused on the syntax
              itself. RFC 8259 explicitly says the two documents are intended to stay aligned.
            </li>
            <li>
              <span className="font-medium">RFC 7493 (I-JSON):</span> A stricter profile for internet-facing use. It
              tightens expectations around UTF-8, duplicate member names, and safe number handling.
            </li>
          </ul>
        </div>

        <p>
          That distinction matters because not every tool marketed as a JSON formatter is equally strict. Some tools
          target standard JSON only. Others accept extensions such as comments or trailing commas on input, then output
          clean RFC 8259 JSON. Both behaviors can be useful, but they solve different problems.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What standardization requires from formatting tools</h2>
        <p>
          At a minimum, a standard-compliant formatter is a parser plus a serializer. It reads input according to JSON
          grammar, builds an internal representation, and writes it back out without changing the meaning of the data.
          Standardization gives that workflow hard boundaries.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">What a strict formatter should enforce</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Only valid JSON tokens are accepted: objects, arrays, strings, numbers, <code>true</code>,{" "}
              <code>false</code>, and <code>null</code>.
            </li>
            <li>
              Strings use double quotes, with proper escaping for control characters and backslashes.
            </li>
            <li>
              Numbers cannot use leading zeros, <code>NaN</code>, or <code>Infinity</code>.
            </li>
            <li>Comments and trailing commas are rejected in strict mode because they are not part of standard JSON.</li>
            <li>
              Output remains valid JSON after reserialization. The formatter may change whitespace, but it should not
              silently invent non-standard syntax.
            </li>
          </ul>
        </div>

        <p>
          One subtle point from RFC 8259 is especially useful in practice: parsers may choose to accept non-standard
          extensions, but generators are expected to produce strict JSON. That is why some tools can clean up
          comment-heavy config files and still emit valid JSON for downstream systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Where compliant tools can still disagree</h2>
        <p>
          Standardization reduces ambiguity, but it does not erase every interoperability trap. Several areas still
          matter when you compare formatters, validators, and parsers.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">1. Duplicate object keys</h3>
          <p className="mt-2">
            RFC 8259 says object member names <span className="font-medium">should</span> be unique, not that parsers
            must reject duplicates. As a result, one implementation may keep the last value, another may keep the
            first, and another may report an error. A pretty-printer can make duplicated keys look neat while still
            leaving the payload semantically unsafe.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">2. Top-level scalars</h3>
          <p className="mt-2">
            Modern JSON allows any serialized value at the top level, not only an object or array. That means
            <code className="ml-1">"ok"</code>, <code>42</code>, and <code>null</code> are valid JSON texts. Older
            libraries and older API expectations still sometimes reject them, so a formatter may accept input that a
            legacy consumer later refuses.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">3. Large numbers and precision</h3>
          <p className="mt-2">
            JSON grammar allows very large numeric literals, but RFC 8259 notes that interoperability is best when
            numbers stay within the exact integer range of IEEE 754 double precision, roughly{" "}
            <code>-(2**53)+1</code> through <code>(2**53)-1</code>. A formatter can preserve the text of a number, but
            once another system parses it into a native number type, precision may already be gone. For identifiers,
            money subunits, or 64-bit database keys, strings are often safer than numeric JSON values.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">4. Encoding and Unicode edge cases</h3>
          <p className="mt-2">
            For systems that are not part of a closed ecosystem, JSON exchanged over the network should be UTF-8.
            Formatters also need to handle escape sequences correctly and avoid introducing invalid Unicode data. In
            real workflows, this matters when files arrive with a BOM, mixed encodings, or broken surrogate pairs from
            copy-paste or legacy exports.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">5. Member ordering and stable output</h3>
          <p className="mt-2">
            JSON objects are not defined by a mandatory key order, so the standard does not prescribe one canonical
            pretty-printed form. One formatter may preserve source order, another may sort keys if asked, and both can
            still be standards-compliant. If you need byte-for-byte stable output for hashing, signatures, golden
            files, or deterministic diffs, pretty-printing alone is not enough. You need an explicit canonicalization
            or stable-sort strategy.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Examples that reveal real formatter behavior</h2>
        <p>
          These examples are useful because they separate syntax validity from interoperability. A good JSON formatter
          should help you spot both.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-amber-700 dark:text-amber-300">
              Valid JSON that can still be unsafe
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "invoiceId": 9007199254740993,
  "status": "draft",
  "status": "final"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              This is syntactically valid JSON, but it contains both a precision-risk number and a duplicate key. A
              basic pretty-printer may format it without complaint. A better validator should warn that different
              consumers may interpret it differently.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
              Valid JSON text that older tooling may reject
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>{`"ok"`}</pre>
            </div>
            <p className="mt-2 text-sm">
              A top-level string is valid JSON under modern standards, but some older validators and integrations still
              assume the top level must be an object or array.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Not standard JSON</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  // comment
  user: 'alice',
  limit: Infinity,
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              Comments, unquoted keys, single-quoted strings, trailing commas, and <code>Infinity</code> belong to
              relaxed formats such as JSON5, not to standard JSON.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON vs. JSON5: why many tools seem inconsistent</h2>
        <p>
          A lot of confusion around JSON formatters is really confusion between standard JSON and JSON5-style input.
          JSON5 is intentionally more human-friendly for hand-edited files. It allows features such as comments,
          trailing commas, identifier-style keys, single-quoted strings, hexadecimal numbers, and values like{" "}
          <code>Infinity</code> or <code>NaN</code>.
        </p>

        <p>
          That does not make JSON5 wrong. It simply makes it a different format with a different compatibility target.
          If your destination is an API, database import, browser fetch response, or a strict parser in another
          language, output needs to be standard JSON. When choosing a formatter, check whether it is:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>strict on input and strict on output, or</li>
          <li>relaxed on input but strict on output after cleanup.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">A practical checklist for JSON formatting tools</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Reject or clearly flag duplicate keys instead of prettifying them silently.</li>
            <li>Report exact line and column for invalid tokens, missing commas, and broken strings.</li>
            <li>State whether top-level scalars are accepted and whether output is always RFC 8259-compliant.</li>
            <li>Handle UTF-8 cleanly and make BOM behavior explicit.</li>
            <li>Preserve member order by default unless the user explicitly asks to sort keys.</li>
            <li>Warn about precision risks when numeric values exceed safe integer range.</li>
            <li>Separate normal pretty-printing from any canonicalization or stable serialization mode.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Bottom line</h2>
        <p>
          JSON standardization did not just make parsers possible. It made formatter behavior testable and comparable.
          RFC 8259 defines what valid JSON is, ECMA-404 keeps the core syntax aligned, and I-JSON shows what a safer
          interoperability baseline looks like. The best formatting tools use those rules to do more than add
          indentation: they help you catch duplicate names, non-standard extensions, encoding problems, and portability
          bugs before those problems escape into production.
        </p>
      </div>
    </>
  );
}
