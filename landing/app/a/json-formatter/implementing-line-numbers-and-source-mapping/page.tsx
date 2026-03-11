import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Line Numbers and Source Mapping in a JSON Formatter | Offline Tools",
  description:
    "Build line numbers, line and column lookup, and original-to-formatted position maps for a JSON formatter, with practical examples and edge cases.",
};

export default function LineNumbersAndSourceMappingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Line Numbers and Source Mapping in a JSON Formatter</h1>

      <div className="space-y-6">
        <p>
          In a JSON formatter, line numbers are the easy part. The hard part is keeping a reliable mapping between the
          raw input, the pretty-printed output, and any parse errors or selections the user makes. Search visitors
          landing on this topic usually need a practical answer: how do you show stable line numbers, highlight the
          right line and column, and jump between minified input and formatted output without guessing?
        </p>
        <p>
          The simplest working model is to track three things at the same time: raw character offsets, a fast
          line-start index for converting offsets into line and column values, and an optional semantic path such as a{" "}
          <code className="font-mono text-sm">JSON Pointer</code> for jumping to a value even after the layout changes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">What Users Actually Expect</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>A gutter with stable line numbers in the formatted view.</li>
            <li>Parse errors that point to the correct original line and column.</li>
            <li>
              Click or selection mapping between raw JSON and formatted JSON when the tool shows both views.
            </li>
            <li>
              Enough metadata to jump to the same value after reformatting, collapsing, or re-rendering the document.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">1. Index Line Starts Once</h2>
        <p>
          Do not compute line and column values by rescanning the whole string each time the user clicks. Build an
          array of line-start offsets once, then use binary search for lookups. In JavaScript, keep the coordinate
          system consistent: string indices are based on UTF-16 code units, so your formatter and your diagnostics
          should use the same unit unless you explicitly convert later.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Line Start Index</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`function buildLineStarts(text: string): number[] {
  const starts = [0];

  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) {
      starts.push(i + 1);
    }
  }

  return starts;
}

function offsetToLineColumn(lineStarts: number[], offset: number) {
  let low = 0;
  let high = lineStarts.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lineStarts[mid] <= offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const lineIndex = Math.max(high, 0);

  return {
    line: lineIndex + 1,
    column: offset - lineStarts[lineIndex] + 1,
  };
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If your formatter normalizes newlines from <code className="font-mono text-sm">\r\n</code> to{" "}
            <code className="font-mono text-sm">\n</code>, build one index for the original input and a separate one
            for the rendered output. Do not mix them.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Preserve Offsets During Formatting</h2>
        <p>
          The biggest implementation mistake is to call <code className="font-mono text-sm">JSON.parse()</code>, throw
          away token positions, and then call <code className="font-mono text-sm">JSON.stringify(value, null, 2)</code>
          . That can produce pretty output, but it cannot tell you where a rendered token came from in the original
          text. If you need source mapping, preserve source ranges while tokenizing or parsing.
        </p>
        <p>
          A practical approach is to emit formatted output and mapping segments in the same pass. Each segment records
          the output range you just wrote and the source range it came from. Inserted whitespace is still important,
          but it should be marked as generated rather than pretending it had a real source span.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Emit Output and Position Segments Together</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`type Segment = {
  inputStart: number | null;
  inputEnd: number | null;
  outputStart: number;
  outputEnd: number;
  kind: "token" | "generated";
  pointer?: string;
};

function createMappedWriter() {
  const parts: string[] = [];
  const segments: Segment[] = [];
  let outputOffset = 0;

  function write(
    text: string,
    kind: Segment["kind"],
    inputStart: number | null,
    inputEnd: number | null,
    pointer?: string,
  ) {
    const outputStart = outputOffset;
    parts.push(text);
    outputOffset += text.length;

    segments.push({
      inputStart,
      inputEnd,
      outputStart,
      outputEnd: outputOffset,
      kind,
      pointer,
    });
  }

  return {
    writeToken(text: string, inputStart: number, inputEnd: number, pointer?: string) {
      write(text, "token", inputStart, inputEnd, pointer);
    },
    writeGenerated(text: string) {
      write(text, "generated", null, null);
    },
    toString() {
      return parts.join("");
    },
    segments,
  };
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This map can stay entirely in memory. For a formatter UI, you usually do not need the full browser
            source-map file format just to jump between raw JSON and formatted JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Store a Semantic Path Alongside the Range Map</h2>
        <p>
          Offsets are perfect for selections and error highlights, but they are fragile after transformations. If the
          user reformats the document, collapses tree nodes, or switches indent width, absolute output offsets change.
          A semantic path solves that problem.
        </p>
        <p>
          For JSON, the simplest semantic identifier is usually a <code className="font-mono text-sm">JSON Pointer</code>
          such as <code className="font-mono text-sm">/users/3/email</code>. When your parser creates a node, store
          both its source range and its pointer. Then you can support two kinds of jumps:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Offset-based jumps for exact caret placement and precise highlighting.</li>
          <li>Pointer-based jumps for resilient navigation after the document has been reformatted.</li>
        </ul>
        <p>
          This hybrid model is much more useful than line numbers alone. It also makes search results, breadcrumbs, and
          validation messages easier to keep stable in the UI.
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. Surface Parse Errors Without Trusting Error Strings</h2>
        <p>
          Built-in JSON parsing is fine for validation, but its error text is not a stable API. Current MDN
          documentation still shows browser error messages that include line and column wording for bad JSON, but the
          exact phrasing varies by engine and version. That means you should treat the human-readable message as display
          text, not as structured data to parse.
        </p>
        <p>
          If your formatter needs exact highlighting, prefer a tokenizer or parser that reports a numeric offset. Once
          you have the offset, convert it through the original input&apos;s line-start index and highlight that position in
          the raw editor or textarea.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Fallback Rule</h3>
          <p className="text-sm mt-2">
            If all you have is a <code className="font-mono text-sm">SyntaxError</code> message, show it to the user,
            but do not build navigation features that depend on scraping its wording. For reliable mapping, the parser
            must expose offsets directly.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Render Line Numbers Efficiently</h2>
        <p>
          For a read-only formatter, the cleanest UI is usually a separate gutter and content column rather than
          injecting line-number markup into the text itself. The gutter can be derived from the formatted output&apos;s line
          count and does not need to know anything about the original source map.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use a monospace font and right-align the gutter values.</li>
          <li>Keep the gutter non-editable and non-selectable so copy operations stay clean.</li>
          <li>For very large JSON files, virtualize visible lines instead of creating a DOM node for every line.</li>
          <li>Keep scroll synchronization based on visual line index, not source offsets.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">6. Edge Cases That Break Mappings</h2>
        <p>
          Most bugs in line-number and source-mapping features come from coordinate mismatches or lossy transforms. The
          following cases are worth handling up front:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Newline normalization:</span> Raw input might contain{" "}
              <code className="font-mono text-sm">\r\n</code>, while the formatter renders{" "}
              <code className="font-mono text-sm">\n</code>. Keep separate indices.
            </li>
            <li>
              <span className="font-medium">Unicode accounting:</span> JavaScript offsets are UTF-16 code units, while
              some backends report byte offsets or Unicode scalar positions. Convert at the boundary.
            </li>
            <li>
              <span className="font-medium">Escaped text:</span> The raw token{" "}
              <code className="font-mono text-sm">&quot;\\uD83D\\uDE00&quot;</code> and the rendered character count the
              user sees are not the same thing.
            </li>
            <li>
              <span className="font-medium">Lossy transforms:</span> Sorting keys, stripping comments, coercing numbers,
              or converting JSON5-style input to strict JSON destroys a clean one-to-one map.
            </li>
            <li>
              <span className="font-medium">Generated whitespace:</span> Indentation and line breaks in pretty output
              need their own mapping behavior. Mark them as generated instead of pretending they came from the input.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How This Differs from Browser Source Maps</h2>
        <p>
          The web already has a standard source-map format for JavaScript and CSS debugging. Current MDN
          documentation notes that browsers can discover those maps through a{" "}
          <code className="font-mono text-sm">SourceMap</code> response header or a{" "}
          <code className="font-mono text-sm">sourceMappingURL</code> comment, and the common format used by tooling is
          source map revision 3. That is useful context, but it solves a different problem.
        </p>
        <p>
          A JSON formatter usually needs a lightweight internal map for UI interactions, not a standalone source-map
          artifact for browser devtools. If you are only supporting highlighting, selection syncing, and jump-to-value
          behavior inside your app, an in-memory range map plus optional JSON Pointers is simpler and easier to reason
          about.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Keep the original input string unchanged for diagnostics and raw-to-formatted mapping.</li>
          <li>Build line-start indices separately for original and formatted text.</li>
          <li>Preserve token ranges while parsing or tokenizing instead of reparsing after formatting.</li>
          <li>Emit generated whitespace as its own mapping kind.</li>
          <li>Store a semantic path such as <code className="font-mono text-sm">JSON Pointer</code> on each node.</li>
          <li>Treat parser error strings as display text, not as a structured protocol.</li>
        </ul>

        <p>
          If you implement those pieces, line numbers stop being a cosmetic feature and become part of a dependable
          debugging workflow. Users can paste messy JSON, see exactly where a problem starts, and jump confidently
          between the original source and the formatted result.
        </p>
      </div>
    </>
  );
}
