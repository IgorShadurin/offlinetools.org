import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Line Numbers and Gutter Displays in JSON Formatters | Offline Tools",
  description:
    "Learn about the importance and functionality of line numbers and gutter displays in JSON formatters for better debugging and navigation.",
};

export default function LineNumbersGutterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Line Numbers and Gutter Displays in JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          When working with JSON data, especially complex or large structures, readability and navigability are crucial.
          Most modern JSON formatters and editors include features like line numbers and a "gutter" area. While
          seemingly minor, these elements play a significant role in debugging, understanding, and efficiently managing
          your JSON. Let&apos;s dive into why they are essential tools in any JSON workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What are Line Numbers and the Gutter?</h2>
        <p>In the context of a text editor or formatter, these features provide structural and navigational context:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Line Numbers:</h3>
          <p className="mt-2 text-sm">
            These are sequential numbers displayed typically to the left of each line of code or text. They provide a
            simple, precise way to reference specific parts of the document.
          </p>

          <h3 className="text-lg font-medium mt-4">The Gutter:</h3>
          <p className="mt-2 text-sm">
            The gutter is the vertical area between the line numbers (or left edge of the editor) and the main text
            editing area. It&apos;s a dedicated space used for various visual indicators and interactive elements
            associated with the lines.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Are They Important for JSON?</h2>
        <p>
          JSON documents can become lengthy and deeply nested. Line numbers and gutter displays transform a flat text
          document into a structured, navigable interface.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key Benefits:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Precise Error Location:</span> JSON parsers and formatters often report
              errors referencing a specific line number. This feature immediately tells you *where* to look.
            </li>
            <li>
              <span className="font-medium">Navigation and Referencing:</span> It&apos;s easy to tell someone "look at
              line 42" rather than trying to describe the content of that line.
            </li>
            <li>
              <span className="font-medium">Contextual Indicators:</span> The gutter is used to show syntax errors,
              warnings, code folding options, or other metadata directly next to the relevant line.
            </li>
            <li>
              <span className="font-medium">Readability and Structure:</span> Visually breaking the document into
              numbered lines makes it easier to scan and understand the flow.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Line Numbers in Detail</h2>
        <p>
          The primary function of line numbers is pinpoint accuracy. When your JSON formatter detects a syntax error or
          a linter flags a potential issue, the error message will almost always include a line number (and sometimes a
          column number).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example Error Message (Hypothetical):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`Parse error on line 7:
  "price": 19.99
  } <--- ERROR
Expected comma or closing bracket`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This message directly points you to line 7, indicating the problem is located near the closing brace there.
          </p>
        </div>

        <p>
          Without line numbers, you would have to manually count lines or scan the entire document trying to visually
          locate the error based on its description, which is significantly harder in large files.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Gutter and Its Indicators</h2>
        <p>
          The gutter area is more than just a space for line numbers; it&apos;s a dynamic display area for line-specific
          information. In a typical JSON formatter or code editor with JSON support, the gutter might display:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Error Markers:</span> Often a red dot or icon indicating a syntax error on
            that line.
          </li>
          <li>
            <span className="font-medium">Warning Markers:</span> A yellow or orange indicator for non-critical issues
            or style warnings.
          </li>
          <li>
            <span className="font-medium">Folding Arrows:</span> Small triangles or arrows that allow collapsing or
            expanding JSON objects or arrays to hide nested content, improving readability.
          </li>
          <li>
            <span className="font-medium">Other Icons:</span> Depending on the tool, could include markers for saved
            changes, breakpoints (though less common in simple formatters), or other annotations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Practical Example</h2>
        <p>Consider this slightly problematic JSON snippet:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JSON with an Issue:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto relative">
            <pre>
              {`{
  "user": {
    "id": 101,
    "name": "Alice",
    "isActive": true
    "roles": ["admin", "editor"] // Missing comma here
  },
  "timestamp": "2023-10-27T10:00:00Z"
}`}
            </pre>
            {/* This is a conceptual marker, real formatters would draw in the gutter */}
            <div className="absolute left-1 top-[108px] h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold dark:bg-red-700">
              !
            </div>
          </div>
          <p className="mt-2 text-sm">In a JSON formatter with line numbers and a gutter, you would see:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
            <li>Line numbers 1 through 8 displayed on the left.</li>
            <li>A red error indicator in the gutter next to line 6, where the missing comma is located or detected.</li>
            <li>
              An error message mentioning a syntax error, often pointing to line 6 or the line after it (line 7)
              depending on the parser&apos;s specific behavior.
            </li>
          </ul>
          <p className="mt-2">
            The visual cue in the gutter and the referenced line number allow you to instantly identify the problem
            line, making debugging far more efficient than just reading a general error message.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Utilizing Gutter for Folding</h2>
        <p>
          One of the most useful features in the gutter for large JSON files is code folding. Folding allows you to
          collapse complex objects or arrays into a single line, showing only the first few characters (like{" "}
          <code>{`{...}`}</code> or <code>{`[...]`}</code>). This dramatically reduces the vertical space occupied by
          data, allowing you to focus on the overall structure and navigate between top-level elements easily.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example of Folding (Conceptual):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "config": { ... }, // Folded object
  "data": [ // Folded array
    { ... },
    { ... },
    { ... }
  ],
  "status": "ok"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Folding icons (often -/+ signs or arrows) appear in the gutter next to the lines containing the opening
            bracket/brace of a foldable block. Clicking them collapses or expands the content.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Line numbers and gutter displays are fundamental features in quality JSON formatters and editors. They provide
          essential context, improve readability, facilitate navigation, and are indispensable for quickly locating and
          fixing syntax errors. Don&apos;t underestimate their value; they transform the process of working with JSON
          from a potentially frustrating search for errors into a streamlined and efficient workflow. Always prefer
          using tools that offer these basic but powerful features.
        </p>
      </div>
    </>
  );
}
