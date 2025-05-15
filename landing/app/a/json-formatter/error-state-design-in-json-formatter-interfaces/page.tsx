import type { Metadata } from "next";
import {
  AlertTriangle,
  XCircle,
  Info,
  Code,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Error State Design in JSON Formatter Interfaces | Offline Tools",
  description:
    "Explore best practices for designing clear, helpful error states in JSON formatter and validator interfaces.",
};

export default function ErrorStateDesignArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Error State Design in JSON Formatter Interfaces
      </h1>

      <div className="space-y-6">
        <p>
          JSON formatter and validator interfaces are essential tools for developers working with data.
          While displaying perfectly formatted JSON is their primary function, how they handle and
          communicate errors is equally critical for a positive user experience and efficient debugging.
          A well-designed error state can save significant time and frustration. This article explores
          principles and techniques for effective error state design in these tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <span className="inline-block align-middle mr-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </span>
          Why Good Error Design Matters
        </h2>
        <p>
          JSON formatters deal with text input that must conform to a strict syntax. When the input
          doesn't follow the rules, errors occur. Simply saying "Invalid JSON" is rarely helpful.
          Good error design is crucial because it:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Pinpoints the Problem:</strong> Helps users quickly identify *what* is wrong.
          </li>
          <li>
            <strong>Suggests Solutions:</strong> Guides users on *how* to fix the error.
          </li>
          <li>
            <strong>Reduces Cognitive Load:</strong> Presents information clearly without overwhelming the user.
          </li>
          <li>
            <strong>Builds Trust:</strong> A tool that gives clear feedback feels more reliable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <span className="inline-block align-middle mr-2">
            <XCircle className="w-6 h-6 text-red-500" />
          </span>
          Common Types of JSON Errors
        </h2>
        <p>
          Errors in JSON input typically fall into a few categories:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax Errors:</strong> Violations of the fundamental JSON grammar. This is the
            most common type. Examples include:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Missing commas between array elements or object properties.</li>
              <li>Missing colons between object keys and values.</li>
              <li>Unquoted object keys.</li>
              <li>Using single quotes instead of double quotes for strings.</li>
              <li>Trailing commas (not allowed in strict JSON).</li>
              <li>Missing opening or closing braces &#x7b; &#x7d; or brackets [ ].</li>
              <li>Invalid escape sequences in strings.</li>
            </ul>
          </li>
          <li>
            <strong>Structural Errors:</strong> While syntactically valid in parts, the overall
            structure might be unexpected (less common for simple formatters, more for validators
            with schemas).
          </li>
          <li>
            <strong>Encoding Errors:</strong> Issues with character encoding (e.g., invalid UTF-8 sequences).
          </li>
          <li>
            <strong>Parser Limits:</strong> Extremely deep nesting or very large files might hit
            parser limitations (less an "input error", more a system limit).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <span className="inline-block align-middle mr-2">
            <Info className="w-6 h-6 text-blue-500" />
          </span>
          Principles of Effective Error Design
        </h2>
        <p>When designing how errors are presented, consider these principles:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Visibility:</strong> Errors should be immediately noticeable. Don't hide them in a console or a small status bar.
          </li>
          <li>
            <strong>Clarity:</strong> The language should be simple and direct. Avoid jargon where possible. Explain *what* is wrong.
          </li>
          <li>
            <strong>Location:</strong> Show *where* the error occurred, ideally with line and column numbers. Highlight the offending text if possible.
          </li>
          <li>
            <strong>Actionability:</strong> Suggest *how* the user can fix it. "Expected ',' or '&#x7d;'" is more helpful than "Syntax Error".
          </li>
          <li>
            <strong>Concurrency:</strong> If possible, show multiple errors at once, but manage complexity for large numbers of errors.
          </li>
          <li>
            <strong>Persistence:</strong> Errors should remain visible until the user takes action or the input is corrected.
          </li>
          <li>
            <strong>Consistency:</strong> Error messages and presentation should be consistent throughout the interface.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Displaying Errors: Techniques and Examples</h2>
        <p>There are several ways to visually represent errors in a JSON interface:</p>

        <h3 className="text-xl font-semibold mt-6">1. Inline Error Messages</h3>
        <p>
          Displaying the error message directly next to the problematic line or character is highly
          effective because it ties the explanation directly to the location.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-gray-500 dark:text-gray-400">1:</span> &#x7b;<br/>
            <span className="text-gray-500 dark:text-gray-400">2:</span> &nbsp;&nbsp;"name": "Alice"<br/>
            <span className="text-gray-500 dark:text-gray-400">3:</span> &nbsp;&nbsp;"age"<span className="text-red-500 border-b-2 border-red-500 cursor-pointer" title="Expected ':'. Did you mean &quot;age&quot;: 30?"> 30</span><span className="inline-block align-middle ml-1"><XCircle className="w-4 h-4 text-red-500" /></span> <span className="text-red-500 text-xs italic">Error: Expected ':' after key on line 3</span><br/>
            <span className="text-gray-500 dark:text-gray-400">4:</span> &#x7d;<br/>
          </p>
        </div>
        <p>
          <strong>Pros:</strong> Immediately clear where the error is and what it is.
          <br />
          <strong>Cons:</strong> Can clutter the interface, especially with many errors. May push content down.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Error List/Summary</h3>
        <p>
          A separate panel or list that summarizes all errors, often with clickable links to jump
          to the specific line in the editor.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="flex items-center text-red-500 font-semibold mb-2">
            <XCircle className="w-5 h-5 mr-2" /> 2 Errors Found
          </div>
          <ul className="list-none p-0 m-0 space-y-1 text-sm">
            <li className="text-red-500 cursor-pointer hover:underline" title="Click to jump to error">
              Line 3, Column 8: Expected ':' after object key.
            </li>
            <li className="text-red-500 cursor-pointer hover:underline" title="Click to jump to error">
              Line 4: Unexpected end of input. Missing '&#x7d;'.
            </li>
          </ul>
        </div>
        <p>
          <strong>Pros:</strong> Keeps the main editor clean. Provides an overview of all issues.
          <br />
          <strong>Cons:</strong> Requires an extra step to see the error in context (clicking the link).
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Visual Indicators (Highlighting & Squiggles)</h3>
        <p>
          Using colors, underlines ("squiggles"), or background highlights directly within the text area
          to mark problematic sections. This is often combined with hovers (tooltips) or inline messages
          for details.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p className="font-mono text-sm">
            <span className="text-gray-500 dark:text-gray-400">1:</span> &#x7b;<br/>
            <span className="text-gray-500 dark:text-gray-400">2:</span> &nbsp;&nbsp;"items": [<br/>
            <span className="text-gray-500 dark:text-gray-400">3:</span> &nbsp;&nbsp;&nbsp;&nbsp;&#x7b;<br/>
            <span className="text-gray-500 dark:text-gray-400">4:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1<span className="text-red-500 border-b-2 border-red-500 cursor-pointer" title="Expected ',' or ']'. Trailing comma not allowed.">,</span> <span className="inline-block align-middle ml-1"><XCircle className="w-4 h-4 text-red-500" /></span><br/>
            <span className="text-gray-500 dark:text-gray-400">5:</span> &nbsp;&nbsp;&nbsp;&nbsp;&#x7d;<br/>
            <span className="text-gray-500 dark:text-gray-400">6:</span> &nbsp;&nbsp;]<br/>
            <span className="text-gray-500 dark:text-gray-400">7:</span> &#x7d;<br/>
          </p>
        </div>
        <p>
          <strong>Pros:</strong> Less disruptive than full inline messages, integrates well with text editors.
          <br />
          <strong>Cons:</strong> Requires an additional interaction (hover, click) to get details. Less accessible for screen readers on their own.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Status Indicators</h3>
        <p>
          A simple visual indicator (like an icon or color change in a status bar) to show whether
          the JSON is valid or invalid. Clicking it might reveal the error details.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">JSON Status:</span>
            <span className="flex items-center text-red-500 font-semibold">
              <XCircle className="w-4 h-4 mr-1" /> Invalid JSON
            </span>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Minimal interface clutter. Good for a quick status check.
          <br />
          <strong>Cons:</strong> Gives no details or location without further interaction.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Designing Specific Error Messages</h2>
        <p>
          The text of the error message itself is crucial. It should be:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Precise:</strong> "Unexpected token '&#x7d;'" is better than "Syntax Error".
          </li>
          <li>
            <strong>Location-aware:</strong> Include line and column numbers if available.
          </li>
          <li>
            <strong>Suggestive:</strong> Indicate what was expected. "Expected ',' or '&#x7d;'" is much better than just "Unexpected token".
          </li>
          <li>
            <strong>Contextual:</strong> If possible, hint at the structure. "Expected object key (string) or '&#x7d;'" provides more context than just "Expected string or '&#x7d;'".
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-semibold">Bad Error Message:</p>
          <p className="font-mono text-sm text-red-600 mb-2">
            Syntax Error
          </p>

          <p className="font-semibold">Better Error Message:</p>
          <p className="font-mono text-sm text-yellow-600 mb-2">
            Line 5: Unexpected token ']'
          </p>

          <p className="font-semibold">Good Error Message:</p>
          <p className="font-mono text-sm text-green-600">
            Line 5, Column 10: Expected ',' or '&#x7d;' after object property value.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Handling Multiple Errors</h2>
        <p>
          Real-world JSON often has more than one error. A good interface should:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>List all identifiable errors:</strong> Don't stop at the first one.
          </li>
          <li>
            <strong>Limit the display if too many:</strong> If hundreds of errors are found, show the first N and provide a count. A cascade of errors might occur from a single mistake (e.g., missing a final <code>&#x7d;</code>), so helping the user focus on the first few is often most productive.
          </li>
          <li>
            <strong>Allow navigation:</strong> Let users click on an error in the summary to jump to its location.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Accessibility Considerations</h2>
        <p>
          Ensure error states are accessible:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Color Blindness:</strong> Don't rely solely on color to indicate an error. Use icons (<XCircle className="inline-block w-4 h-4 text-red-500" />), text labels, or patterns.
          </li>
          <li>
            <strong>Screen Readers:</strong> Ensure error messages and their locations are programmatically accessible to screen readers. ARIA attributes can help link error messages to the relevant input area.
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Users should be able to navigate through errors using a keyboard, especially in an error list/summary view.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <span className="inline-block align-middle mr-2">
            <Code className="w-6 h-6 text-gray-500" />
          </span>
          Implementation Considerations (Static View)
        </h2>
        <p>
          Since this page is static and doesn't involve a live formatter, we demonstrate the *output*
          of good error design rather than the implementation logic itself. A real formatter would
          involve parsing the input string (potentially using libraries like <code>JSON.parse</code>
          within a <code>try...catch</code> block for basic errors, or a more robust parser library
          like <code>jsonlint</code> or a custom parser for detailed error reporting), identifying
          error locations (line/column), and then rendering the input text with added visual cues and messages based on the parser's output.
        </p>
        <p>
          Key parts of a formatter's error reporting would include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A robust parser/validator library that provides detailed error information (type, message, line, column, index).</li>
          <li>A mechanism to map these error locations back to the rendered text area.</li>
          <li>UI components to display inline messages, highlights, or manage an error list.</li>
          <li>Accessibility features for users with disabilities.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Designing effective error states in JSON formatter interfaces is not an afterthought;
          it's a core part of the user experience. By adhering to principles of clarity, location,
          and actionability, and by using appropriate visual techniques, developers can create tools
          that not only format JSON but also empower users to quickly understand and fix issues
          when invalid input is provided. This transforms a potentially frustrating experience
          into an efficient debugging workflow.
        </p>
      </div>
    </>
  );
}