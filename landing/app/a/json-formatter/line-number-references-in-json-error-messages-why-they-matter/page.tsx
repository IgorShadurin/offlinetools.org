import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Line Number References in JSON Error Messages: Why They Matter | Offline Tools",
  description:
    "Why line and column references make JSON errors faster to fix, how they differ from character positions, and how to turn offsets into useful debugging context.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Line Number References in JSON Error Messages: Why They Matter</h1>

      <div className="space-y-6">
        <p>
          A JSON error only becomes useful when it tells you where to look. If all you get is a generic parse failure,
          you still have to hunt through the document. If you get a line number, column number, or character offset,
          you can usually find the problem in seconds instead of minutes.
        </p>

        <p>
          That matters because JSON syntax errors are often simple but easy to miss: a comma left off on the previous
          line, a trailing comma near the end of an object, or a missing closing brace higher up in the structure. A
          precise location turns debugging from guesswork into inspection.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">What a useful JSON error looks like</h2>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre className="text-red-600 dark:text-red-400">
              {`Less useful:
SyntaxError: Unexpected token } in JSON at position 392

More useful:
SyntaxError: Expected ',' or '}' after property value at line 15, column 22

Best:
14 |   "name": "Ada"
15 |   "age": 37
   |   ^`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Position, line, column, and a short code frame each answer a different question: where parsing stopped,
            which row is affected, which character is suspicious, and what the surrounding structure looks like.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What line numbers, columns, and positions actually mean</h2>
        <p>
          These terms get mixed together, but they are not interchangeable:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <strong>Line</strong> tells you which row of the document to inspect.
          </li>
          <li>
            <strong>Column</strong> points to the character within that line.
          </li>
          <li>
            <strong>Position</strong> or <strong>offset</strong> is the absolute character count from the start of the
            text.
          </li>
          <li>
            <strong>Code frame</strong> shows the nearby lines and usually a caret marking the detected location.
          </li>
        </ul>

        <p>
          For humans, line and column are easiest to act on. For programs, position is often easier to calculate and
          store. Good JSON tools expose both.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why line references matter in practice</h2>
        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>They shorten the search space.</strong> In a 5,000-line payload, knowing the error is near line
            842 is the difference between a quick fix and a slow scan.
          </li>
          <li>
            <strong>They reveal parser behavior.</strong> Parsers often report where they became confused, which is
            usually near the true cause even if not exactly on it.
          </li>
          <li>
            <strong>They improve handoff.</strong> A bug report that says &quot;invalid JSON near line 73, column
            18&quot; is actionable for another developer or support engineer.
          </li>
          <li>
            <strong>They make tooling better.</strong> Editors, validators, and APIs can highlight the right spot,
            show context, and guide the user to the next fix.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Current behavior across common JSON parsers</h2>
        <p>
          Today, there is still no single human-readable JSON parse message format across all runtimes. The practical
          difference is important:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>JavaScript <code>JSON.parse()</code>:</strong> the exception type is consistently{" "}
              <code>SyntaxError</code>, but the message wording varies by engine. In V8-based environments such as
              Node.js and Chromium-based browsers, developers commonly see messages with a character position. MDN also
              documents Firefox-style messages that include line and column wording.
            </li>
            <li>
              <strong>Python&apos;s <code>json</code> module:</strong> <code>JSONDecodeError</code> exposes structured
              location data including <code>pos</code>, <code>lineno</code>, and <code>colno</code>, which is much
              easier to surface in logs and UIs.
            </li>
            <li>
              <strong>Editors and validators:</strong> most tools layer line numbers, highlighting, and inline context
              on top of the parser result, which is why they feel much easier to use than a raw exception string.
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important caveat</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Do not build production logic around the exact text of <code>error.message</code> from{" "}
            <code>JSON.parse()</code>. Treat that string as human-facing output. If you need reliable location data,
            compute it yourself from an offset or use a parser that returns structured fields.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">If you only have a position, convert it to line and column</h2>
        <p>
          A position-only error is still useful. You can map the reported offset back to a line, a column, and the
          exact source line for display in your app or logs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`function getJsonErrorLocation(source, position) {
  const safePosition = Math.max(0, Math.min(position, source.length));
  const beforeError = source.slice(0, safePosition);
  const previousLines = beforeError.split(/\\r\\n|\\r|\\n/);
  const line = previousLines.length;
  const column = previousLines[previousLines.length - 1].length + 1;

  const allLines = source.split(/\\r\\n|\\r|\\n/);
  const lineText = allLines[line - 1] ?? "";
  const caret = " ".repeat(Math.max(column - 1, 0)) + "^";

  return { line, column, lineText, caret };
}

function parseJsonWithLocation(source) {
  try {
    return { value: JSON.parse(source) };
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;

    const match = /\\bposition (\\d+)\\b/i.exec(error.message);
    if (!match) {
      return { error: error.message };
    }

    const position = Number(match[1]);
    return {
      error: error.message,
      position,
      ...getJsonErrorLocation(source, position),
    };
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The line-splitting regex handles Unix and Windows line endings, which keeps the reported location correct
            for pasted files from different environments.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JSON mistakes where line numbers save time</h2>

        <h3 className="text-xl font-medium mt-6">Missing comma</h3>
        <p>
          This is one of the most common cases. The parser often flags the next line, because that is where the missing
          separator finally becomes impossible to ignore.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "John"
  "age": 30
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If the error points at line 3, check the end of line 2 first. The reported location is where parsing
            breaks, not always where the typo started.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Trailing comma</h3>
        <p>
          JSON does not allow trailing commas, even though JavaScript object literals do in many contexts.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "name": "John",
  "age": 30,
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Here the line number usually lands very close to the real issue, which makes the fix fast once the parser
            tells you where to look.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Unclosed objects or arrays</h3>
        <p>
          Nesting errors are where code frames become most valuable, because the true cause may be several lines above
          the reported point.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "person": {
    "name": "Alice",
    "details": {
      "age": 28,
      "occupation": "Developer"
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            When the parser reports a later line, scan upward for the object or array that was never properly closed.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Fast workflow for using a JSON line number well</h2>
        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>Jump to the reported line and inspect the previous token before changing anything.</li>
          <li>Check nearby commas, quotes, braces, and brackets before assuming the marked character is wrong.</li>
          <li>Use formatting or indentation to expose structural problems after the first fix.</li>
          <li>If you only have a position, convert it once and show users a line, column, and code frame.</li>
          <li>After each fix, validate again because one syntax error can hide the next one.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">If you build JSON tooling, return these fields</h2>
        <p>
          If you are designing a formatter, validator, API, or import screen, a good error payload should contain more
          than a sentence.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Message:</strong> a readable explanation of what failed.
            </li>
            <li>
              <strong>Line and column:</strong> the fastest way for a person to navigate.
            </li>
            <li>
              <strong>Offset:</strong> useful for logs, APIs, and editor integrations.
            </li>
            <li>
              <strong>Code frame:</strong> one or two surrounding lines plus a caret.
            </li>
            <li>
              <strong>Cause note:</strong> a hint that the real mistake may be on the previous line or in the parent
              structure.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Line number references in JSON error messages matter because they turn an opaque parse failure into a fixable
          task. Even when a runtime only gives you a character position, you can still convert that offset into
          line-and-column data and show users something much more actionable.
        </p>
        <p className="mt-4">
          For real debugging work, the best experience is simple: report the exact location, show a short code frame,
          and remember that the reported point is where the parser stopped, not always where the original mistake was
          introduced.
        </p>
      </div>
    </>
  );
}
