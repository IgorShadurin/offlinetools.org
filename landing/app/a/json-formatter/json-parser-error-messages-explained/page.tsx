import type { Metadata } from "next";
import { AlertTriangle, Bug, Code, Inspect, Lightbulb, ListChecks, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Parser Error Messages Explained: Fix Common Parse Failures | Offline Tools",
  description:
    "Understand what JSON parser errors really mean, including Unexpected token, Extra data, Unterminated string, invalid numbers, empty responses, and HTML-instead-of-JSON failures.",
};

const quickLookup = [
  {
    message: "Unexpected token '<' in JSON at position 0",
    meaning: "You usually received HTML or plain text instead of JSON.",
    firstCheck: "Inspect the raw response body, HTTP status, and Content-Type header.",
  },
  {
    message: "Expected property name / property name enclosed in double quotes",
    meaning: "Object keys are malformed, or a trailing comma/comment confused the parser.",
    firstCheck: "Use double quotes for keys and remove comments or trailing commas.",
  },
  {
    message: "Unexpected non-whitespace character after JSON / Extra data",
    meaning: "The parser finished one valid JSON value and then found more content.",
    firstCheck: "Look for concatenated objects, JSONL/NDJSON input, or stray text after the closing } or ].",
  },
  {
    message: "Unterminated string / bad control character / Invalid control character",
    meaning: "A string is missing a closing quote or contains an unescaped newline, tab, quote, or backslash.",
    firstCheck: "Check the nearest string literal and escape special characters.",
  },
  {
    message: "Unexpected end of JSON input / unexpected end of data",
    meaning: "The payload is truncated, incomplete, or empty.",
    firstCheck: "Verify the full payload arrived and that you are not parsing an empty response.",
  },
  {
    message: "Unexpected number / missing digits after decimal point",
    meaning: "A number format is invalid for JSON.",
    firstCheck: "Remove leading zeros and reject NaN, Infinity, and unfinished decimals like 1.",
  },
];

const errorFamilies = [
  {
    heading: "1. Property names, quotes, and object syntax",
    messages: [
      "Expected property name or '}'",
      "Expected double-quoted property name in JSON",
      "Expecting property name enclosed in double quotes",
    ],
    why: "This family usually means the parser reached an object member where strict JSON syntax was broken.",
    likelyCauses: [
      "Single quotes around keys or string values",
      "Unquoted keys such as name: \"Alice\"",
      "Trailing commas inside objects",
      "Comments copied from JavaScript, JSONC, or JSON5",
    ],
    fixSteps: [
      "Wrap every key and every string value in double quotes.",
      "Remove comments and trailing commas.",
      "If the source is a config format that allows comments, convert it to strict JSON before parsing.",
    ],
    badJson: `{
  'name': "Alice",
  age: 30,
}`,
    goodJson: `{
  "name": "Alice",
  "age": 30
}`,
    note: "The exact wording varies by parser. Firefox often reports a more specific property-name error, while V8-based runtimes may report a broader unexpected-token style message for the same root cause.",
  },
  {
    heading: "2. Missing commas, trailing commas, and array separators",
    messages: [
      "Expected ',' or ']' after array element",
      "Expected ',' or '}' after property value in object",
      "Unexpected token ] / } in JSON",
    ],
    why: "JSON separators are minimal and strict: commas go between elements or members, never after the last one.",
    likelyCauses: [
      "Missing a comma between array elements",
      "Missing a comma between object members",
      "Trailing commas copied from JavaScript object literals",
    ],
    fixSteps: [
      "Insert commas only between items, not after the last item.",
      "Check one character before the reported location. The parser often notices the problem only when it reaches the next token.",
    ],
    badJson: `[
  1
  2,
  3,
]`,
    goodJson: `[
  1,
  2,
  3
]`,
    note: "RFC 8259 defines comma as a value separator, but JSON has no grammar rule for a trailing comma.",
  },
  {
    heading: "3. Strings, escapes, and control characters",
    messages: [
      "Unterminated string",
      "bad control character in string literal",
      "Invalid control character",
      "bad escape character",
      "bad Unicode escape",
    ],
    why: "A JSON string started correctly but contains characters that must be escaped, or it never closed.",
    likelyCauses: [
      "A missing closing double quote",
      "A raw newline or tab inside a string",
      "An unescaped quote or backslash",
      "A malformed Unicode escape such as \\u12G4",
    ],
    fixSteps: [
      "Escape quotes as \\\" and backslashes as \\\\.",
      "Replace raw newlines with \\n and tabs with \\t.",
      "Validate every \\u escape uses exactly four hexadecimal digits.",
    ],
    badJson: `{
  "message": "Line 1
Line 2"
}`,
    goodJson: `{
  "message": "Line 1\\nLine 2"
}`,
    note: "Many parsers report the position where they finally give up, not necessarily the first character that was wrong.",
  },
  {
    heading: "4. Extra data after a complete JSON value",
    messages: [
      "Unexpected non-whitespace character after JSON",
      "Extra data",
    ],
    why: "A valid JSON text is one serialized value with optional surrounding whitespace. After that, the parser expects nothing else.",
    likelyCauses: [
      "Two objects or arrays concatenated together",
      "Debug text or a stack trace appended after valid JSON",
      "Trying to parse JSON Lines or NDJSON as one normal JSON document",
    ],
    fixSteps: [
      "Wrap multiple values in an array if you need one JSON document.",
      "If the source is NDJSON or JSONL, parse it line by line with the right tool.",
      "Trim any accidental banner text or logging output after the closing brace or bracket.",
    ],
    badJson: `{"a": 1}{"b": 2}`,
    goodJson: `[
  { "a": 1 },
  { "b": 2 }
]`,
    note: "RFC 8259 defines a JSON text as ws value ws, so extra non-whitespace content after the first value is invalid.",
  },
  {
    heading: "5. Unexpected end of input or truncated payloads",
    messages: [
      "Unexpected end of JSON input",
      "unexpected end of data",
      "Unterminated string starting at",
    ],
    why: "The parser reached the end of the string before the JSON structure was complete.",
    likelyCauses: [
      "A missing closing brace, bracket, or quote",
      "A network response that was cut off or partially written",
      "Trying to parse an empty response body",
      "Calling response.json() on a 204 No Content response",
    ],
    fixSteps: [
      "Confirm the source payload is complete before parsing.",
      "If this came from HTTP, check for 204 responses, proxy errors, or truncated downloads.",
      "If the body may be empty, guard for that before calling the parser.",
    ],
    badJson: `{
  "user": {
    "id": 1,
    "name": "Ana"
  }`,
    goodJson: `{
  "user": {
    "id": 1,
    "name": "Ana"
  }
}`,
    note: "An empty string is not valid JSON. If you expect \"no data\", represent it as null, [] or {} depending on your contract.",
  },
  {
    heading: "6. Invalid numbers and non-standard literals",
    messages: [
      "Unexpected number in JSON",
      "missing digits after decimal point",
      "no number after minus sign",
      "unexpected keyword",
    ],
    why: "JSON numbers are stricter than JavaScript literals and many hand-written formats.",
    likelyCauses: [
      "Leading zeros such as 01",
      "Unfinished decimals such as 1.",
      "Broken exponents such as 1e or 1e+",
      "Using NaN, Infinity, or -Infinity in strict JSON",
    ],
    fixSteps: [
      "Use plain decimal numbers like 0, 1, or 1.0.",
      "Replace NaN and Infinity with a real value, null, or a string based on your schema.",
      "Generate numbers with a serializer instead of string concatenation.",
    ],
    badJson: `{
  "count": 01,
  "ratio": 1.,
  "value": NaN
}`,
    goodJson: `{
  "count": 1,
  "ratio": 1.0,
  "value": null
}`,
    note: "RFC 8259 does not permit NaN or Infinity. Python's standard library can accept those values by default, so cross-language behavior may differ unless you tighten the decoder.",
  },
];

const fetchChecklist = [
  "If the first character is <, you probably got an HTML error page, login page, or CDN/proxy response instead of JSON.",
  "If the body is empty, the parse failure may be correct: an empty string is not JSON.",
  "MDN notes that Response.json() throws SyntaxError when the body cannot be parsed as JSON, but it can also throw TypeError when body decoding fails, for example because Content-Encoding is wrong.",
  "If the payload came from a human-edited config file, confirm whether it is strict JSON or a looser format such as JSONC or JSON5.",
];

const preventionTips = [
  "Serialize native data structures with JSON.stringify, json.dumps, or equivalent instead of hand-building strings.",
  "Log the raw payload in development before parsing, but redact secrets and tokens.",
  "Validate Content-Type and HTTP status before assuming a response body is JSON.",
  "Use a JSON-aware formatter or validator to pinpoint the first syntax break quickly.",
  "Use the right parser for the format you actually have: JSON, NDJSON/JSONL, JSON5, or JSONC are not interchangeable.",
];

export default function JsonParserErrorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <AlertTriangle className="w-8 h-8 mr-3 text-red-500" /> JSON Parser Error Messages Explained
      </h1>

      <div className="space-y-6">
        <p>
          Most JSON parser errors boil down to a short list of problems: broken punctuation, broken strings, broken
          numbers, extra content after a valid JSON value, or content that was never JSON in the first place. The hard
          part is that different runtimes phrase those failures differently.
        </p>

        <p>
          This guide translates the message you see into the fastest likely fix, with examples from JavaScript and
          Python and a few current parser notes from{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            MDN&apos;s JSON.parse error reference
          </a>
          , the{" "}
          <a
            href="https://docs.python.org/3/library/json.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Python json docs
          </a>
          , and{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            RFC 8259
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Inspect className="w-6 h-6 mr-2 text-blue-500" /> Quick Lookup
        </h2>
        <p>
          If you landed here with a specific error message, start with the category below and then jump to the matching
          section.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 font-semibold">Message</th>
                <th className="p-3 font-semibold">Usually means</th>
                <th className="p-3 font-semibold">Check first</th>
              </tr>
            </thead>
            <tbody>
              {quickLookup.map((item) => (
                <tr key={item.message} className="border-t border-gray-200 dark:border-gray-700 align-top">
                  <td className="p-3 font-mono text-sm">{item.message}</td>
                  <td className="p-3">{item.meaning}</td>
                  <td className="p-3">{item.firstCheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" /> How to Read the Location Info
        </h2>
        <p>
          The reported location is your best clue. In JavaScript you often get a character position. In Python,
          <code className="mx-1">JSONDecodeError</code> exposes the message plus <code className="mx-1">pos</code>,
          <code className="mx-1">lineno</code>, and <code className="mx-1">colno</code>. The parser usually detects the
          problem when it reaches the next impossible character, so the real mistake is often one character before the
          reported position.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-md font-medium mb-2">Fast debugging rule</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Look at the reported character, then inspect 10 to 20 characters before it. Most JSON bugs are either
            missing punctuation, a broken string escape, or extra text after a valid closing brace or bracket.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="w-6 h-6 mr-2 text-blue-500" /> Common JSON Error Families
        </h2>
        <p>
          Exact wording changes across engines. The category is what matters: once you know whether the failure is about
          object syntax, separators, strings, extra data, incomplete input, or numbers, the fix gets much faster.
        </p>

        {errorFamilies.map((item) => (
          <section key={item.heading} className="space-y-4">
            <h3 className="text-xl font-semibold mt-6">{item.heading}</h3>
            <p>{item.why}</p>

            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <h4 className="text-md font-medium mb-2">Message variants you may see</h4>
              <ul className="list-disc pl-6 space-y-1">
                {item.messages.map((message) => (
                  <li key={message}>
                    <code>{message}</code>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Likely causes</h4>
              <ul className="list-disc pl-6 space-y-2">
                {item.likelyCauses.map((cause) => (
                  <li key={cause}>{cause}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">How to fix it</h4>
              <ul className="list-disc pl-6 space-y-2">
                {item.fixSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
                <h4 className="text-md font-medium mb-2">Problematic JSON</h4>
                <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">{item.badJson}</pre>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
                <h4 className="text-md font-medium mb-2">Valid JSON</h4>
                <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">{item.goodJson}</pre>
              </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              <AlertTriangle className="inline w-4 h-4 mr-1" />
              {item.note}
            </p>
          </section>
        ))}

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ListChecks className="w-6 h-6 mr-2 text-blue-500" /> When the Payload Is Not Actually JSON
        </h2>
        <p>
          Many real-world parse failures are upstream response problems, not syntax mistakes inside a valid JSON
          document.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          {fetchChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-md font-medium mb-2">Useful fetch debugging pattern</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">{`const response = await fetch(url);
const text = await response.text();

console.log(response.status, response.headers.get("content-type"));
console.log(text.slice(0, 200));

const data = JSON.parse(text);`}</pre>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            This is often the fastest way to confirm whether the server returned JSON, HTML, an empty body, or a
            truncated payload.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-blue-500" /> Compatibility Notes That Matter
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Message text is not standardized. The same invalid input can produce different wording in Firefox, Chrome,
            Node.js, Python, and backend libraries.
          </li>
          <li>
            JSON itself is standardized. RFC 8259 allows one JSON value at the top level, not just objects or arrays.
          </li>
          <li>
            Python&apos;s standard library documents some intentionally non-strict behavior, such as accepting
            <code className="mx-1">NaN</code> and <code className="mx-1">Infinity</code> unless you override the
            decoder. That can hide invalid JSON that a stricter parser will reject later.
          </li>
          <li>
            A byte order mark at the start of a payload can also create interoperability problems. RFC 8259 says it
            must not be added to transmitted JSON, and parser behavior varies when it appears anyway.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-blue-500" /> Preventing Parse Errors
        </h2>
        <p>
          The fastest fix is usually upstream: generate valid JSON automatically and verify the raw payload before it
          reaches your parser.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          {preventionTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        <p>
          If you treat the error message as a category plus a location hint, most JSON failures become routine to fix.
          Start with the character position, inspect the raw payload, and verify that the content is strict JSON rather
          than a nearby format or an upstream error page.
        </p>
      </div>
    </>
  );
}
